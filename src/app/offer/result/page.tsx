import { ClaimOfferForm } from "@/components/ClaimOfferForm";

export const metadata = { title: "Claim your offer" };

export default async function ClaimPage({
  searchParams,
}: {
  searchParams: Promise<{ address?: string }>;
}) {
  const { address } = await searchParams;
  return (
    <div className="bg-gradient-to-b from-brand-50 to-white py-12">
      <div className="section">
        <header className="mx-auto mb-8 max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Step 3 of 3
          </div>
          <h1 className="mt-2 font-display text-4xl text-ink">Lock your cash offer</h1>
          <p className="mt-2 text-ink-soft">
            Drop your contact info. Tarek's team will reach out within an hour to confirm and pick a close
            date.
          </p>
        </header>
        <ClaimOfferForm address={address ?? ""} />
      </div>
    </div>
  );
}
