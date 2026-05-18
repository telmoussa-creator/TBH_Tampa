import Link from "next/link";

export const metadata = { title: "About Tarek" };

export default function Page() {
  return (
    <div className="bg-white">
      <div className="section grid items-start gap-12 py-16 md:grid-cols-2">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-600">About</div>
          <h1 className="mt-2 font-display text-4xl text-ink">Built by Tarek. Backed by AI.</h1>
          <div className="mt-6 space-y-4 text-ink-soft">
            <p>
              I'm Tarek. I've been buying houses in the Tampa Bay area for over a decade — long enough to
              see the iBuyer wave roll in, lowball thousands of homeowners, charge them 5% in service
              fees, then pull back when the market got hard.
            </p>
            <p>
              I built Tarek Buys Houses because Tampa sellers deserve better than an algorithm in San
              Francisco deciding what their house is worth. We're local. We answer the phone. We close on
              time. And we use AI to give you a faster, smarter, more transparent offer — not as a
              gimmick, but because it actually works.
            </p>
            <p>
              When you sell to us, you're selling to a real person in Tampa with a real check, not a
              corporation running a spread trade. Whether your house is gorgeous or falling apart,
              inherited or just tired — let's talk.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/offer" className="btn-primary">Get my offer</Link>
            <Link href="/reviews" className="btn-secondary">Read reviews</Link>
          </div>
        </div>

        <div className="card">
          <div className="font-semibold text-ink">By the numbers</div>
          <dl className="mt-4 divide-y divide-gray-100">
            <Row label="Tampa homes purchased" value="500+" />
            <Row label="Years in Tampa Bay" value="10+" />
            <Row label="Average days to close" value="11" />
            <Row label="Google rating" value="4.9 / 5.0" />
            <Row label="Service fees" value="$0" />
          </dl>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}
