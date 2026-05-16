import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase-admin";
import { LeadsBoard } from "@/components/LeadsBoard";
import type { LeadScore } from "@/types";

export const metadata = { title: "Operator dashboard" };
export const dynamic = "force-dynamic";

export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  reason: string | null;
  timeline: string | null;
  notes: string | null;
  tier: "hot" | "warm" | "cool" | "cold" | null;
  status: string;
  ai_score: LeadScore | null;
};

export default async function DashboardPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  let leads: LeadRow[] = [];
  let configError: string | null = null;

  if (!supabaseConfigured()) {
    configError =
      "Supabase isn't configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.";
  } else {
    const { data, error } = await supabaseAdmin()
      .from("leads")
      .select("id,created_at,name,phone,email,address,reason,timeline,notes,tier,status,ai_score")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) configError = error.message;
    else leads = (data ?? []) as LeadRow[];
  }

  const stats = {
    hot24: leads.filter(
      (l) => l.tier === "hot" && Date.now() - new Date(l.created_at).getTime() < 86_400_000
    ).length,
    walkthrough: leads.filter((l) => l.status === "walkthrough").length,
    contract: leads.filter((l) => l.status === "contract").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  return (
    <div className="section py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">Operator dashboard</h1>
          <p className="text-sm text-ink-muted">Signed in as {admin.email}</p>
        </div>
      </header>

      {configError && (
        <div className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-100">
          {configError}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Hot leads (24h)" value={stats.hot24} accent />
        <StatCard label="Walkthroughs" value={stats.walkthrough} />
        <StatCard label="In contract" value={stats.contract} />
        <StatCard label="Closed" value={stats.closed} />
      </div>

      <div className="mt-10">
        <LeadsBoard initialLeads={leads} />
      </div>
    </div>
  );
}

function StatCard({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`card ${accent ? "ring-2 ring-brand-300" : ""}`}>
      <div className="text-xs uppercase tracking-wide text-ink-muted">{label}</div>
      <div className="mt-2 font-display text-3xl text-ink">{value}</div>
    </div>
  );
}
