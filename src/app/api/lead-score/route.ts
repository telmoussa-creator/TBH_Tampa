import { NextResponse } from "next/server";
import { z } from "zod";
import { scoreLead } from "@/lib/lead-score";

export const runtime = "nodejs";

const Body = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().min(3),
  timeline: z.enum(["asap", "30_days", "60_days", "90_plus", "just_looking"]).optional(),
  reason: z.string().optional(),
  condition_self_rating: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
    .optional(),
  mortgage_balance: z.number().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const score = await scoreLead(parsed.data);
    return NextResponse.json({ score });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
