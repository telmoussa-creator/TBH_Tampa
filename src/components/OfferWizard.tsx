"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { formatUSD } from "@/lib/utils";
import { IS_DEMO, demoOffer } from "@/lib/demo";
import type { AVMResult, PropertyFacts } from "@/types";

type Step = "facts" | "loading" | "result" | "error";

export function OfferWizard({ initialAddress = "" }: { initialAddress?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("facts");
  const [error, setError] = useState<string>("");
  const [offer, setOffer] = useState<AVMResult | null>(null);
  const [facts, setFacts] = useState<PropertyFacts>({
    address: initialAddress,
    property_type: "single_family",
    beds: 3,
    baths: 2,
    sqft: 1600,
    year_built: 1985,
    condition: 3,
    flood_zone: "X",
    construction: "block",
  });

  function update<K extends keyof PropertyFacts>(k: K, v: PropertyFacts[K]) {
    setFacts((f) => ({ ...f, [k]: v }));
  }

  async function submit() {
    if (!facts.address?.trim()) {
      setError("Address is required.");
      return;
    }
    setStep("loading");
    setError("");
    try {
      if (IS_DEMO) {
        setOffer(await demoOffer(facts.address));
        setStep("result");
        return;
      }
      const res = await fetch("/api/avm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(facts),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to generate offer");
      setOffer(data.offer);
      setStep("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setStep("error");
    }
  }

  if (step === "loading") return <Loading />;
  if (step === "result" && offer) {
    return (
      <OfferResult
        offer={offer}
        address={facts.address}
        onAddPhotos={() => router.push(`/offer/photos?address=${encodeURIComponent(facts.address)}`)}
        onClaim={() => router.push(`/offer/result?address=${encodeURIComponent(facts.address)}`)}
      />
    );
  }

  return (
    <div className="card mx-auto max-w-2xl">
      <h2 className="font-display text-2xl text-ink">Tell us about your house</h2>
      <p className="mt-1 text-sm text-ink-muted">
        The more you share, the tighter our AI's number gets. You can also skip and upload photos next.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">Address</label>
          <input
            value={facts.address}
            onChange={(e) => update("address", e.target.value)}
            className="input"
            placeholder="2412 W Cleveland St, Tampa, FL"
            autoFocus
          />
        </div>

        <div>
          <label className="label">Property type</label>
          <select
            className="input"
            value={facts.property_type}
            onChange={(e) => update("property_type", e.target.value as PropertyFacts["property_type"])}
          >
            <option value="single_family">Single-family</option>
            <option value="townhome">Townhome</option>
            <option value="condo">Condo</option>
            <option value="multi_2_4">Multi-family (2–4)</option>
            <option value="mobile">Mobile / manufactured</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div>
          <label className="label">Year built</label>
          <input
            type="number"
            className="input"
            value={facts.year_built ?? ""}
            onChange={(e) => update("year_built", Number(e.target.value) || undefined)}
          />
        </div>

        <div>
          <label className="label">Beds</label>
          <input
            type="number"
            className="input"
            value={facts.beds ?? ""}
            onChange={(e) => update("beds", Number(e.target.value) || undefined)}
          />
        </div>

        <div>
          <label className="label">Baths</label>
          <input
            type="number"
            step="0.5"
            className="input"
            value={facts.baths ?? ""}
            onChange={(e) => update("baths", Number(e.target.value) || undefined)}
          />
        </div>

        <div>
          <label className="label">Living sqft</label>
          <input
            type="number"
            className="input"
            value={facts.sqft ?? ""}
            onChange={(e) => update("sqft", Number(e.target.value) || undefined)}
          />
        </div>

        <div>
          <label className="label">Lot sqft</label>
          <input
            type="number"
            className="input"
            value={facts.lot_sqft ?? ""}
            onChange={(e) => update("lot_sqft", Number(e.target.value) || undefined)}
          />
        </div>

        <div>
          <label className="label">Overall condition</label>
          <select
            className="input"
            value={facts.condition}
            onChange={(e) => update("condition", Number(e.target.value) as PropertyFacts["condition"])}
          >
            <option value={5}>5 — Move-in ready</option>
            <option value={4}>4 — Minor cosmetics</option>
            <option value={3}>3 — Some updating needed</option>
            <option value={2}>2 — Heavy work needed</option>
            <option value={1}>1 — Major rehab / teardown</option>
          </select>
        </div>

        <div>
          <label className="label">Flood zone</label>
          <select
            className="input"
            value={facts.flood_zone}
            onChange={(e) => update("flood_zone", e.target.value as PropertyFacts["flood_zone"])}
          >
            <option value="X">X (not flood)</option>
            <option value="AE">AE</option>
            <option value="VE">VE</option>
            <option value="unknown">Not sure</option>
          </select>
        </div>

        <div>
          <label className="label">Construction</label>
          <select
            className="input"
            value={facts.construction}
            onChange={(e) => update("construction", e.target.value as PropertyFacts["construction"])}
          >
            <option value="block">Concrete block</option>
            <option value="frame">Wood frame</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="pool"
            type="checkbox"
            checked={!!facts.has_pool}
            onChange={(e) => update("has_pool", e.target.checked)}
          />
          <label htmlFor="pool" className="text-sm text-ink-soft">Has a pool</label>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="mt-7 flex items-center justify-between">
        <div className="text-xs text-ink-muted">Takes ~30 seconds. No signup.</div>
        <button onClick={submit} className="btn-primary">
          <Sparkles size={16} /> Generate AI offer
        </button>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="card mx-auto flex max-w-2xl flex-col items-center text-center">
      <Loader2 className="animate-spin text-brand-600" size={36} />
      <h2 className="mt-4 font-display text-2xl text-ink">Our AI is working on your offer…</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Pulling comps, applying the cash-buyer formula, factoring in Tampa-specific risk. Usually 10–20 seconds.
      </p>
    </div>
  );
}

function OfferResult({
  offer,
  address,
  onAddPhotos,
  onClaim,
}: {
  offer: AVMResult;
  address: string;
  onAddPhotos: () => void;
  onClaim: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="card">
        <div className="text-xs uppercase tracking-wide text-ink-muted">Estimated cash offer</div>
        <div className="text-sm text-ink-muted">{address}</div>
        <div className="mt-3 flex items-baseline gap-3">
          <div className="font-display text-5xl font-semibold text-ink">
            {formatUSD(offer.cash_offer_low)}
          </div>
          <div className="text-xl text-ink-muted">– {formatUSD(offer.cash_offer_high)}</div>
        </div>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          Confidence: {offer.confidence.toUpperCase()}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Estimated ARV" value={`${formatUSD(offer.arv_low)} – ${formatUSD(offer.arv_high)}`} />
          <Stat label="Estimated repairs" value={formatUSD(offer.estimated_repairs)} />
          <Stat label="Closing cost" value="$0 (we cover)" />
        </div>

        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm text-ink-soft ring-1 ring-gray-100">
          <div className="font-semibold text-ink">AI rationale</div>
          <p className="mt-1">{offer.rationale}</p>
        </div>

        {offer.key_risks?.length > 0 && (
          <div className="mt-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-100">
            <div className="font-semibold">Key risks the AI flagged</div>
            <ul className="mt-1 list-inside list-disc">
              {offer.key_risks.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button onClick={onAddPhotos} className="card text-left transition hover:ring-brand-200">
          <div className="font-semibold text-ink">📷 Tighten this offer with photos</div>
          <p className="mt-1 text-sm text-ink-muted">
            Our vision AI estimates real repairs from photos — usually moves the offer up.
          </p>
        </button>
        <button onClick={onClaim} className="card bg-brand-600 text-left text-white ring-brand-700 transition hover:bg-brand-700">
          <div className="font-semibold">✅ Claim this offer</div>
          <p className="mt-1 text-sm text-brand-100">
            We'll text you to confirm details and lock the price.
          </p>
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100">
      <div className="text-xs uppercase tracking-wide text-ink-muted">{label}</div>
      <div className="mt-1 font-semibold text-ink">{value}</div>
    </div>
  );
}
