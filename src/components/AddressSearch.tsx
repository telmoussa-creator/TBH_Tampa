"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

export function AddressSearch({ size = "lg" }: { size?: "lg" | "md" }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    router.push(`/offer?address=${encodeURIComponent(v)}`);
  }

  const pad = size === "lg" ? "py-5 text-lg" : "py-3 text-base";

  return (
    <form onSubmit={onSubmit} className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-brand-400">
      <span className="grid place-items-center pl-5 text-ink-muted">
        <MapPin size={20} />
      </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your Tampa-area address"
        className={`flex-1 bg-transparent px-4 ${pad} placeholder:text-gray-400 focus:outline-none`}
        autoComplete="street-address"
      />
      <button type="submit" className="m-2 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 font-semibold text-white hover:bg-brand-700">
        Get cash offer <ArrowRight size={18} />
      </button>
    </form>
  );
}
