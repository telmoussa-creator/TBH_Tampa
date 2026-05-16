export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="section py-16">
      <h1 className="font-display text-3xl text-ink">Operator dashboard</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Coming soon: live lead feed with AI scores, photo assessments, draft follow-up messages, pipeline
        Kanban (new → walkthrough → contract → closed), and Twilio-powered SMS replies.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Hot leads (24h)", "—"],
          ["Walkthroughs this week", "—"],
          ["In contract", "—"],
        ].map(([label, value]) => (
          <div key={label} className="card">
            <div className="text-xs uppercase tracking-wide text-ink-muted">{label}</div>
            <div className="mt-2 font-display text-3xl text-ink">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
