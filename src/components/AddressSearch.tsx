"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Load the Google Maps Places script exactly once.
let mapsLoader: Promise<void> | null = null;
function loadMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!MAPS_KEY) return Promise.reject(new Error("no maps key"));
  if (mapsLoader) return mapsLoader;
  if ((window as any).google?.maps?.places) return Promise.resolve();

  mapsLoader = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places&loading=async`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("maps load failed"));
    document.head.appendChild(s);
  });
  return mapsLoader;
}

export function AddressSearch({ size = "lg" }: { size?: "lg" | "md" }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!MAPS_KEY || !inputRef.current) return;
    let cancelled = false;
    loadMaps()
      .then(() => {
        if (cancelled || !inputRef.current) return;
        const google = (window as any).google;
        const ac = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "us" },
          fields: ["formatted_address", "address_components", "geometry"],
          types: ["address"],
        });
        ac.addListener("place_changed", () => {
          const p = ac.getPlace();
          if (p?.formatted_address) setValue(p.formatted_address);
        });
      })
      .catch(() => {
        // No maps key configured — input still works as plain text.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    router.push(`/offer?address=${encodeURIComponent(v)}`);
  }

  const pad = size === "lg" ? "py-5 text-lg" : "py-3 text-base";

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full items-stretch overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-brand-400"
    >
      <span className="grid place-items-center pl-5 text-ink-muted">
        <MapPin size={20} />
      </span>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your Tampa-area address"
        className={`flex-1 bg-transparent px-4 ${pad} placeholder:text-gray-400 focus:outline-none`}
        autoComplete="street-address"
      />
      <button
        type="submit"
        className="m-2 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 font-semibold text-white hover:bg-brand-700"
      >
        Get cash offer <ArrowRight size={18} />
      </button>
    </form>
  );
}
