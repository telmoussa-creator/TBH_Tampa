"use client";

import { useState } from "react";
import { Loader2, Upload, AlertCircle } from "lucide-react";
import { formatUSD } from "@/lib/utils";
import type { PhotoAssessment } from "@/types";

export function PhotoUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [assessment, setAssessment] = useState<PhotoAssessment | null>(null);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? []).slice(0, 12);
    setFiles(list);
  }

  async function analyze() {
    if (files.length === 0) {
      setError("Pick at least one photo.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const photos = await Promise.all(
        files.map(
          (f) =>
            new Promise<{ type: "base64"; media_type: "image/jpeg" | "image/png" | "image/webp"; data: string }>((res, rej) => {
              const r = new FileReader();
              r.onload = () => {
                const dataUrl = r.result as string;
                const [, b64] = dataUrl.split(",");
                const media = (f.type as "image/jpeg" | "image/png" | "image/webp") || "image/jpeg";
                res({ type: "base64", media_type: media, data: b64 });
              };
              r.onerror = () => rej(new Error("read failed"));
              r.readAsDataURL(f);
            })
        )
      );

      const res = await fetch("/api/photo-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "analysis failed");
      setAssessment(data.assessment);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="card">
        <h2 className="font-display text-2xl text-ink">Upload photos for a tighter offer</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Inside, outside, kitchen, baths, roof, any problem areas. Our vision AI estimates real repair
          costs and adjusts your offer accordingly.
        </p>

        <label className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center hover:border-brand-400">
          <Upload className="text-brand-600" />
          <div className="text-sm font-medium text-ink">Click to upload up to 12 photos</div>
          <div className="text-xs text-ink-muted">JPG, PNG, or WebP</div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={onPick}
            className="sr-only"
          />
        </label>

        {files.length > 0 && (
          <div className="mt-4 text-sm text-ink-muted">
            Selected: <strong>{files.length}</strong> photo{files.length === 1 ? "" : "s"}
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button onClick={analyze} disabled={busy} className="btn-primary">
            {busy ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Analyzing…
              </>
            ) : (
              "Analyze photos"
            )}
          </button>
        </div>
      </div>

      {assessment && (
        <div className="card">
          <div className="text-xs uppercase tracking-wide text-ink-muted">AI condition assessment</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="font-display text-3xl text-ink">{assessment.overall_condition}/5</div>
            <div className="text-ink-muted">condition rating</div>
          </div>
          <div className="mt-2 text-sm text-ink-soft">
            Estimated repairs:{" "}
            <strong className="text-ink">{formatUSD(assessment.estimated_repair_cost_usd)}</strong>
          </div>

          <p className="mt-4 text-sm text-ink-soft">{assessment.summary}</p>

          {assessment.flags?.length > 0 && (
            <div className="mt-4 space-y-2">
              {assessment.flags.map((f, i) => (
                <div
                  key={i}
                  className={`rounded-xl px-3 py-2 text-sm ring-1 ${
                    f.severity === "major"
                      ? "bg-red-50 text-red-900 ring-red-100"
                      : f.severity === "moderate"
                      ? "bg-amber-50 text-amber-900 ring-amber-100"
                      : "bg-gray-50 text-ink-soft ring-gray-100"
                  }`}
                >
                  <span className="font-semibold capitalize">{f.area}</span> — {f.note}{" "}
                  <span className="ml-1 text-xs uppercase opacity-70">[{f.severity}]</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
