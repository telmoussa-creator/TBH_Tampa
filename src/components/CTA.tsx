import { AddressSearch } from "./AddressSearch";

export function CTA() {
  return (
    <section className="bg-ink text-white">
      <div className="section py-16 text-center">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Ready to see your number?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">
          Enter your address. Our AI runs in 30 seconds. No signup, no obligation.
        </p>
        <div className="mx-auto mt-7 max-w-xl">
          <AddressSearch />
        </div>
      </div>
    </section>
  );
}
