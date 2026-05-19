# Tampa AI Video Asset Manifest

Generated content from the Higgsfield account. The sandbox blocks the Higgsfield CDN host, so the `.mp4` binaries are not committed — run `bash assets/ai-videos/fetch.sh` from a laptop/desktop with normal internet to materialize every file under its target subdirectory.

This manifest covers the 50 most-recent completed videos returned by `show_generations`. Older pages exist; ask for them and I'll extend this file.

## Index

| Group | Count | Folder | What it is |
|---|---|---|---|
| Adriana ambassador | 12 | `adriana/` | Seedance 1.5, 9:16, vertical. "Request an offer. Quick review. No pressure. You decide." + "I'm Adriana, with Tarek Buys Houses…" intro, plus a "When rates are high…" line. Mix of 4s/8s and arc-shot / hair-fix variants. |
| Distressed B-roll | 6 | `broll/` | Seedance 2.0. Abandoned bungalow drift-back, 70s living-room pan, foreclosure-notice push-in, kitchen-table hand-off, cluttered interior drift, concrete-block bungalow push-in. |
| Tarek selfie-cam | ~22 | `tarek-selfie/` | Kling 3.0, 9:16 4K. "I lost $700,000 on a house on a hill in Laguna…" walking-and-talking selfie POV — multiple takes, including longer "I know the pain" version, "we did nothing" cuts, and voice_change_merge audio-swap variants (suffix `_vmerge.mp4`). |
| Ambassador state pilots | 5 | `state-pilots/` | Seedance 2.0, 9:16. STATE 1 Overwhelmed (Sofia v1 + v2), STATE 4 Avoidant (Luke), STATE 6 Confused (Valeria desk and Diego porch). |
| Cinema Studio (older) | 4 | `cinema-studio/` | May 10 batch — Latina realtor tracking shot ×2, cash hand-off close-up, stressed homeowner with foreclosure letter. |
| Older multi-shot reel | 1 | `reel/` | 15-sec "Tah-rek lost everything in 2008" with gold end card. |

## How to materialize the mp4s

```sh
bash assets/ai-videos/fetch.sh
```

Already-present files are skipped, so the script is safe to re-run after partial pulls or after the manifest is extended.

## Notes on the Tarek selfie takes

The Kling 3.0 selfie group has the most variants — they were take-after-take iterations on the same script. The `_vmerge.mp4` siblings are the same visual take with the audio swapped via Higgsfield's `voice_change_merge` step, so pair them with their numbered take when picking finals. Pickup candidates by line:

- "I lost $700,000 on a house on a hill in Laguna. Just because we couldn't decide if we wanted to tear it down or remodel it." — takes 01–10.
- "…We did nothing." — takes 11–12.
- "…We did nothing. Hundreds of thousands in carrying costs. If you have a house you're sitting on and you know you've gotta do something — I know the pain. And I know how to fix it." — long-form takes 13–14.
