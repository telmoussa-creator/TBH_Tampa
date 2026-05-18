import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminUser } from "@/lib/auth";
import { sendSMS, twilioConfigured } from "@/lib/twilio";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const Body = z.object({
  to: z.string().min(7),
  body: z.string().min(1).max(1500),
  leadId: z.string().uuid().optional(),
});

export async function POST(req: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!twilioConfigured()) return NextResponse.json({ error: "twilio not configured" }, { status: 500 });

  const json = await req.json();
  const parsed = Body.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  try {
    const result = await sendSMS(parsed.data.to, parsed.data.body);
    if (parsed.data.leadId && supabaseConfigured()) {
      await supabaseAdmin()
        .from("leads")
        .update({ notes: `Outbound SMS by ${admin.email}: ${parsed.data.body.slice(0, 300)}` })
        .eq("id", parsed.data.leadId);
    }
    return NextResponse.json({ ok: true, sid: result?.sid });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "send failed" }, { status: 500 });
  }
}
