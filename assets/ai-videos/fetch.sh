#!/usr/bin/env bash
# Pulls every completed video from the Higgsfield generation history into
# assets/ai-videos/. Idempotent — already-present files are skipped.
# Run from the repo root: `bash assets/ai-videos/fetch.sh`.
#
# The Claude Code remote sandbox blocks the Higgsfield CDN host
# (x-deny-reason: host_not_allowed), so these have to be fetched from a
# machine with normal internet access.

set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

fetch() {
  local path="$1"
  local url="$2"
  if [[ -f "$path" ]]; then
    echo "skip   $path"
    return 0
  fi
  mkdir -p "$(dirname "$path")"
  echo "fetch  $path"
  curl -fsSL --retry 4 --retry-delay 2 -o "$path" "$url"
}

BASE=https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII

# ─────────────────────────────────────────────────────────────────────────────
# Adriana cuts — Seedance 1.5, 9:16, "Request an offer. Quick review…" line
# ─────────────────────────────────────────────────────────────────────────────
fetch adriana/01_arc_8s_f53d15d4.mp4                   "$BASE/hf_20260519_001051_f53d15d4-0aa8-442e-9629-80199b2a1da5.mp4"
fetch adriana/02_arc_4s_be3f3cfc.mp4                   "$BASE/hf_20260519_001044_be3f3cfc-fe44-4a43-9895-82f8a3b17e22.mp4"
fetch adriana/03_arc-hair_4s_961dd034.mp4              "$BASE/hf_20260519_001032_961dd034-9063-4962-9668-6888ae91afde.mp4"
fetch adriana/04_arc-hair_8s_9f00eeec.mp4              "$BASE/hf_20260519_000641_9f00eeec-7130-4490-83f5-277acad9f434.mp4"
fetch adriana/05_arc-hair_8s_1ebcb1eb.mp4              "$BASE/hf_20260519_000201_1ebcb1eb-d724-4f3d-b982-3117ce579d4d.mp4"
fetch adriana/06_arc-hair_4s_97c1239b.mp4              "$BASE/hf_20260519_000157_97c1239b-324b-4ede-97a3-52d8c072482c.mp4"
fetch adriana/07_hair_4s_b6f775ba.mp4                  "$BASE/hf_20260518_235603_b6f775ba-19ff-4b02-92c8-9e696c1177b5.mp4"
fetch adriana/08_hair_8s_a61092b5.mp4                  "$BASE/hf_20260518_235558_a61092b5-0ac7-4f58-af54-c82f064741f5.mp4"
fetch adriana/09_intro-pan_8s_4b491187.mp4             "$BASE/hf_20260518_235256_4b491187-c9c9-4ef6-a601-b1d11fde60e2.mp4"
fetch adriana/10_hair-zoom_8s_01c76cf8.mp4             "$BASE/hf_20260518_235245_01c76cf8-99e3-460c-86e6-9a36ca79a24b.mp4"
fetch adriana/11_intro-pan_8s_28327228.mp4             "$BASE/hf_20260518_234722_28327228-cf62-40bf-b58e-216a66de33aa.mp4"
fetch adriana/12_rates-spouse_c4431aeb.mp4             "$BASE/hf_20260518_233914_c4431aeb-ec4e-4a97-9f5f-d1f6065bb51e.mp4"

# ─────────────────────────────────────────────────────────────────────────────
# B-roll — Seedance 2.0, distressed Florida exteriors + interiors
# ─────────────────────────────────────────────────────────────────────────────
fetch broll/01_abandoned-bungalow-drift_9458fb44.mp4   "$BASE/hf_20260518_065337_9458fb44-4e41-4472-9d51-6950ce35fda4.mp4"
fetch broll/02_70s-living-room-pan_b0d5c5f8.mp4        "$BASE/hf_20260518_063834_b0d5c5f8-515d-42d0-9b23-da45d42823a6.mp4"
fetch broll/03_foreclosure-notice-pushin_17c51d58.mp4  "$BASE/hf_20260517_074016_17c51d58-fec0-4eae-a370-45f7fca09131.mp4"
fetch broll/04_kitchen-table-handoff_5afbd62d.mp4      "$BASE/hf_20260516_074351_5afbd62d-103e-442f-a798-11a7f93264d5.mp4"
fetch broll/05_cluttered-interior-drift_2e27dcfa.mp4   "$BASE/hf_20260516_074347_2e27dcfa-700f-46fe-ae41-5e3e0f5e6d7c.mp4"
fetch broll/06_block-bungalow-pushin_97e84824.mp4      "$BASE/hf_20260516_074343_97e84824-fff1-4c17-9c29-d45256ef0013.mp4"

# ─────────────────────────────────────────────────────────────────────────────
# Tarek selfie-cam — Kling 3.0, 9:16 4K, "I lost $700,000…" walking POV
# (vmerge = voice_change_merge audio-swapped variant of the immediately
#  preceding take)
# ─────────────────────────────────────────────────────────────────────────────
fetch tarek-selfie/01_take_5701814d.mp4                "$BASE/hf_20260515_233758_5701814d-0d7e-4693-91b8-f23a57f2edfb.mp4"
fetch tarek-selfie/01_take_3ef76528_vmerge.mp4         "$BASE/hf_20260515_235044_3ef76528-717f-42d7-aab3-ea07e2fafec2.mp4"
fetch tarek-selfie/02_take_c0f520c3.mp4                "$BASE/hf_20260515_233543_c0f520c3-b125-462c-b5c2-0d00cbded7d2.mp4"
fetch tarek-selfie/02_take_98e0adae_vmerge.mp4         "$BASE/hf_20260515_234944_98e0adae-9f5e-49c6-ab86-214472f1953f.mp4"
fetch tarek-selfie/03_take_c4e0f3c8.mp4                "$BASE/hf_20260515_183915_c4e0f3c8-5c8a-468d-981e-def6f8391083.mp4"
fetch tarek-selfie/03_take_ea45d43e_vmerge.mp4         "$BASE/hf_20260515_184403_ea45d43e-2d16-443e-b7c8-139548286379.mp4"
fetch tarek-selfie/04_take_571e5638.mp4                "$BASE/hf_20260515_183726_571e5638-cc2a-4907-b4da-09c4350c2689.mp4"
fetch tarek-selfie/05_take_5ef0535d.mp4                "$BASE/hf_20260515_182939_5ef0535d-e382-42f7-b4e9-21773eb6736c.mp4"
fetch tarek-selfie/05_take_17535fbb_vmerge.mp4         "$BASE/hf_20260515_183849_17535fbb-f392-4062-ac15-4316083880ef.mp4"
fetch tarek-selfie/06_take_c550fa94.mp4                "$BASE/hf_20260515_181221_c550fa94-2cbf-4961-a6f2-c4ed5d9a201b.mp4"
fetch tarek-selfie/07_take_v01ref_ca00fb3c.mp4         "$BASE/hf_20260515_175144_ca00fb3c-572b-425b-9d37-053d17d99c30.mp4"
fetch tarek-selfie/08_take_8b82029c.mp4                "$BASE/hf_20260514_045452_8b82029c-c0fc-4012-ab5b-c955601e8ab8.mp4"
fetch tarek-selfie/08_take_536d2ad7_vmerge.mp4         "$BASE/hf_20260514_045842_536d2ad7-5a6b-4c60-aa71-ef6fc6f2bce1.mp4"
fetch tarek-selfie/09_take_a4179673.mp4                "$BASE/hf_20260514_043412_a4179673-8919-4124-b6aa-6608c2053261.mp4"
fetch tarek-selfie/09_take_10339ad9_vmerge.mp4         "$BASE/hf_20260514_043813_10339ad9-ef64-4b9f-ae96-f0f698d020bb.mp4"
fetch tarek-selfie/10_take_7bb84bee.mp4                "$BASE/hf_20260514_043337_7bb84bee-d0cd-4c34-af4a-f7b0a3949a2f.mp4"
fetch tarek-selfie/10_take_3b06a8ae_vmerge.mp4         "$BASE/hf_20260514_043829_3b06a8ae-e51e-4ad4-ad92-f62559108c2e.mp4"
fetch tarek-selfie/11_we-did-nothing_284e2ded.mp4      "$BASE/hf_20260514_042737_284e2ded-04e4-4497-a55b-fc6779267a92.mp4"
fetch tarek-selfie/12_we-did-nothing_ba6829dc.mp4      "$BASE/hf_20260514_042649_ba6829dc-e349-48e5-9ddd-0ed6a26bf9da.mp4"
fetch tarek-selfie/13_long-i-know-the-pain_04da199e.mp4 "$BASE/hf_20260514_042332_04da199e-8f4f-4a8c-ba0e-28e0722c2c35.mp4"
fetch tarek-selfie/13_long_6abb1aad_vmerge.mp4         "$BASE/hf_20260514_042814_6abb1aad-05ea-4f07-ac82-393d2f6a8478.mp4"
fetch tarek-selfie/14_long-alt_4ba3b1a3.mp4            "$BASE/hf_20260514_042315_4ba3b1a3-99d6-4400-ba42-2a1507d81d86.mp4"

# ─────────────────────────────────────────────────────────────────────────────
# Ambassador state pilots — Seedance 2.0, 9:16
# ─────────────────────────────────────────────────────────────────────────────
fetch state-pilots/state6-confused-diego-porch_12s_7bddf282.mp4   "$BASE/hf_20260512_061038_7bddf282-49a3-47da-914c-168c1a98b9f3.mp4"
fetch state-pilots/state1-overwhelmed-sofia-v2_12s_9a275a8e.mp4    "$BASE/hf_20260512_055930_9a275a8e-5130-4e90-9ac0-34743a2aa007.mp4"
fetch state-pilots/state6-confused-valeria-desk_8s_f405ac65.mp4    "$BASE/hf_20260512_054023_f405ac65-ac71-447d-b12e-83580471f8c2.mp4"
fetch state-pilots/state4-avoidant-luke-porch_8s_748547c5.mp4      "$BASE/hf_20260512_054020_748547c5-6b6a-4548-a08b-46970f950302.mp4"
fetch state-pilots/state1-overwhelmed-sofia-v1_8s_bca31c9d.mp4     "$BASE/hf_20260512_054002_bca31c9d-75f6-4c37-b079-1a60af716c25.mp4"

# ─────────────────────────────────────────────────────────────────────────────
# Cinema Studio (May 10) — older establishing shots
# ─────────────────────────────────────────────────────────────────────────────
fetch cinema-studio/01_latina-tracking_c8b8c9b6.mp4    "$BASE/hf_20260510_080659_c8b8c9b6-822a-48f9-8fe7-072b52af933a.mp4"
fetch cinema-studio/02_latina-tracking-alt_8b8a280e.mp4 "$BASE/hf_20260510_080644_8b8a280e-e753-47b8-aae5-8504fccfd9e1.mp4"
fetch cinema-studio/03_cash-handoff_f0f2a45a.mp4       "$BASE/hf_20260510_080500_f0f2a45a-e8b9-40e4-9ccf-054cd519b47d.mp4"
fetch cinema-studio/04_stressed-foreclosure_382ba813.mp4 "$BASE/hf_20260510_080423_382ba813-c993-4394-8b82-425438ad9235.mp4"

# ─────────────────────────────────────────────────────────────────────────────
# Older reel
# ─────────────────────────────────────────────────────────────────────────────
fetch reel/15s_tah-rek-2008-with-end-card_fb2f8b95.mp4 "$BASE/hf_20260509_233105_fb2f8b95-910d-4c63-a251-9c202cb15905.mp4"

echo "done."
