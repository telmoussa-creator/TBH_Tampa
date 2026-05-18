import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzePhotos } from "@/lib/photo-analysis";

export const runtime = "nodejs";
export const maxDuration = 60;

const Photo = z.union([
  z.object({ type: z.literal("url"), url: z.string().url() }),
  z.object({
    type: z.literal("base64"),
    media_type: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
    data: z.string().min(1),
  }),
]);

const Body = z.object({
  photos: z.array(Photo).min(1).max(12),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Body.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const assessment = await analyzePhotos(parsed.data.photos);
    return NextResponse.json({ assessment });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
