import { supabaseServer } from "./supabase";

/** Returns the signed-in user's email if they're allowlisted for the dashboard. */
export async function getAdminUser(): Promise<{ email: string } | null> {
  const allowed = (process.env.DASHBOARD_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length === 0) return null;

  try {
    const sb = await supabaseServer();
    const { data } = await sb.auth.getUser();
    const email = data.user?.email?.toLowerCase();
    if (!email) return null;
    if (!allowed.includes(email)) return null;
    return { email };
  } catch {
    return null;
  }
}
