import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminUser } from "@/lib/auth";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const Patch = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "walkthrough", "contract", "closed", "dead"]).optional(),
});

export async function PATCH(req: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!supabaseConfigured()) return NextResponse.json({ error: "supabase not configured" }, { status: 500 });

  const json = await req.json();
  const parsed = Patch.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { id, ...rest } = parsed.data;
  const { error } = await supabaseAdmin().from("leads").update(rest).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
