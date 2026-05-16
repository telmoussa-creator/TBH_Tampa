import { NextResponse } from "next/server";
import { z } from "zod";
import { scoreLead } from "@/lib/lead-score";

export const runtime = "nodejs";

const Body = z.object({
  name: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email().optional(),
  address: z.string().min(3),
  reason: z.string().optional(),
  timeline: z.enum(["asap", "30_days", "60_days", "90_plus", "just_looking"]).optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    // Fire scoring in parallel with persistence (persistence to be wired to Supabase).
    const [score] = await Promise.all([
      scoreLead(parsed.data).catch((e) => ({ error: e instanceof Error ? e.message : "scoring failed" })),
      // TODO: insert into supabase `leads` table here
    ]);

    return NextResponse.json({ ok: true, score });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
