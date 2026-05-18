import type { PropertyFacts } from "@/types";

/**
 * Property enrichment via RentCast (https://api.rentcast.io/v1).
 * Falls back gracefully if no API key is set, or if the address can't be resolved.
 *
 * RentCast returns one of the richest free-tier datasets for US residential:
 * beds, baths, sqft, lot, year_built, property_type, last_sale_*, AVM.
 */
export async function enrichFromRentCast(address: string): Promise<Partial<PropertyFacts>> {
  const key = process.env.RENTCAST_API_KEY;
  if (!key) return {};

  const url = `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(address)}`;
  try {
    const res = await fetch(url, {
      headers: { "X-Api-Key": key, Accept: "application/json" },
      // Cache property lookups for an hour — Tampa house data doesn't change minute-to-minute.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return {};
    const data = (await res.json()) as RentCastProperty[] | RentCastProperty;
    const p = Array.isArray(data) ? data[0] : data;
    if (!p) return {};

    return {
      address: p.formattedAddress ?? address,
      city: p.city,
      state: p.state,
      zip: p.zipCode,
      beds: p.bedrooms,
      baths: p.bathrooms,
      sqft: p.squareFootage,
      lot_sqft: p.lotSize,
      year_built: p.yearBuilt,
      property_type: mapRentCastType(p.propertyType),
      has_pool: p.features?.pool ?? undefined,
      construction:
        p.features?.exteriorType?.toLowerCase().includes("concrete") || p.features?.exteriorType?.toLowerCase().includes("block")
          ? "block"
          : p.features?.exteriorType
          ? "frame"
          : undefined,
    };
  } catch {
    return {};
  }
}

function mapRentCastType(t?: string): PropertyFacts["property_type"] | undefined {
  if (!t) return undefined;
  const x = t.toLowerCase();
  if (x.includes("single")) return "single_family";
  if (x.includes("town")) return "townhome";
  if (x.includes("condo")) return "condo";
  if (x.includes("multi") || x.includes("duplex") || x.includes("triplex") || x.includes("fourplex")) return "multi_2_4";
  if (x.includes("manufactured") || x.includes("mobile")) return "mobile";
  if (x.includes("land") || x.includes("lot")) return "land";
  return undefined;
}

type RentCastProperty = {
  formattedAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  lotSize?: number;
  yearBuilt?: number;
  propertyType?: string;
  features?: {
    pool?: boolean;
    exteriorType?: string;
  };
};

/**
 * Merge enriched data over user-provided facts. User data wins where present
 * (the homeowner knows their roof age better than a database does), but we fill
 * blanks from RentCast.
 */
export function mergeFacts(user: PropertyFacts, enriched: Partial<PropertyFacts>): PropertyFacts {
  const merged: PropertyFacts = { ...enriched, ...user, address: user.address || enriched.address || "" };
  return merged;
}
