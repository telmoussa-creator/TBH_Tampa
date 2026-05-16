import { NextResponse } from "next/server";
import { z } from "zod";
import { generateOffer } from "@/lib/avm";

export const runtime = "nodejs";

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
    const offer = await generateOffer(parsed.data);
    return NextResponse.json({ offer });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
