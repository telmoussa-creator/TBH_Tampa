import { NextResponse } from "next/server";
import { z } from "zod";
import { scoreLead } from "@/lib/lead-score";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";
import { sendSMS, twilioConfigured } from "@/lib/twilio";

export const runtime = "nodejs";
export const maxDuration = 30;

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

    const score = await scoreLead(parsed.data).catch(() => null);

    let leadId: string | null = null;
    if (supabaseConfigured()) {
      const { data, error } = await supabaseAdmin()
        .from("leads")
        .insert({
          name: parsed.data.name,
          phone: parsed.data.phone,
          email: parsed.data.email,
          address: parsed.data.address,
          reason: parsed.data.reason,
          timeline: parsed.data.timeline,
          notes: parsed.data.notes,
          source: "web",
          ai_score: score,
          tier: score?.tier ?? null,
          status: "new",
        })
        .select("id")
        .single();
      if (error) {
        console.error("supabase insert failed", error);
      } else {
        leadId = (data?.id as string) ?? null;
      }
    }

    // Fire-and-forget: SMS the hot leads to Tarek's team immediately.
    if (score?.tier === "hot" && twilioConfigured()) {
      const opsNumber = process.env.OPS_NOTIFY_NUMBER;
      if (opsNumber) {
        const msg = `🔥 HOT LEAD — ${parsed.data.name} (${parsed.data.phone})\n${parsed.data.address}\nReason: ${parsed.data.reason ?? "—"}\nTimeline: ${parsed.data.timeline ?? "—"}\n\nDraft reply: ${score.suggested_follow_up.draft_message}`;
        sendSMS(opsNumber, msg).catch((e) => console.error("ops sms failed", e));
      }
    }

    return NextResponse.json({ ok: true, leadId, score });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
