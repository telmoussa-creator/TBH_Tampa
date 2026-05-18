const QUOTES = [
  {
    name: "Maria G.",
    where: "Seminole Heights",
    body: "We inherited my dad's house and had no idea what to do with it. Tarek made an offer in two days and closed in nine. Zero drama.",
  },
  {
    name: "Devon R.",
    where: "Riverview",
    body: "Tried Opendoor first — their offer dropped $22k after the walkthrough. TBH gave me a straight number and held it.",
  },
  {
    name: "Janet & Phil",
    where: "Carrollwood",
    body: "Our roof was a nightmare and we couldn't afford repairs to list. Tarek's team walked us through everything and we closed in 14 days.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="section py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-600">Reviews</div>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Tampa families, real outcomes.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.name} className="card">
              <blockquote className="text-ink-soft">"{q.body}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-semibold text-ink">{q.name}</div>
                <div className="text-ink-muted">{q.where}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
