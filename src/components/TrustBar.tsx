import { Star } from "lucide-react";

export function TrustBar() {
  return (
    <section className="border-y border-gray-100 bg-white">
      <div className="section grid grid-cols-2 items-center gap-6 py-8 text-center md:grid-cols-4">
        <Item top="500+" bottom="Tampa homes purchased" />
        <Item top="< 24 hrs" bottom="Average offer time" />
        <Item top="7 days" bottom="Fastest close" />
        <Item
          top={
            <span className="inline-flex items-center gap-1">
              4.9
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-500 text-brand-500" />
                ))}
              </span>
            </span>
          }
          bottom="Google reviews"
        />
      </div>
    </section>
  );
}

function Item({ top, bottom }: { top: React.ReactNode; bottom: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-ink">{top}</div>
      <div className="mt-0.5 text-xs uppercase tracking-wide text-ink-muted">{bottom}</div>
    </div>
  );
}
