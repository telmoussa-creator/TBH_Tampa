"use client";

import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="section py-20 text-center">
      <h1 className="font-display text-3xl text-ink">Something went sideways.</h1>
      <p className="mx-auto mt-2 max-w-lg text-ink-soft">
        Sorry about that. Try again, or just text Tarek's team at (813) 555-0100.
      </p>
      <pre className="mx-auto mt-4 max-w-lg overflow-x-auto rounded-xl bg-gray-50 p-3 text-left text-xs text-ink-muted">
        {error.message}
      </pre>
      <div className="mt-6 flex justify-center gap-3">
        <button onClick={reset} className="btn-primary">Try again</button>
        <Link href="/" className="btn-secondary">Home</Link>
      </div>
    </div>
  );
}
