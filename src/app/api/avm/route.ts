import { NextResponse } from "next/server";
import { z } from "zod";
import { generateOffer } from "@/lib/avm";
import { enrichFromRentCast, mergeFacts } from "@/lib/property-data";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const maxDuration = 60;

const Body = z.object({
  address: z.string().min(3),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  property_type: z
    .enum(["single_family", "townhome", "condo", "multi_2_4", "mobile", "land"])
    .optional(),
  beds: z.number().optional(),
  baths: z.number().optional(),
  sqft: z.number().optional(),
  lot_sqft: z.number().optional(),
  year_built: z.number().optional(),
  condition: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional(),
  roof_age: z.number().optional(),
  hvac_age: z.number().optional(),
  has_pool: z.boolean().optional(),
  flood_zone: z.enum(["X", "AE", "VE", "unknown"]).optional(),
  construction: z.enum(["block", "frame", "other"]).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const enriched = await enrichFromRentCast(parsed.data.address);
    const facts = mergeFacts(parsed.data, enriched);
    const offer = await generateOffer(facts);

    let offerId: string | null = null;
    if (supabaseConfigured()) {
      const { data, error } = await supabaseAdmin()
        .from("offers")
        .insert({ address: facts.address, facts, avm: offer })
        .select("id")
        .single();
      if (error) console.error("offer insert failed", error);
      else offerId = (data?.id as string) ?? null;
    }

    return NextResponse.json({ offer, facts, offerId, enriched_fields: Object.keys(enriched) });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
