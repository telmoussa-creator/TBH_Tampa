#!/usr/bin/env bash
# Pulls every winner image from MANIFEST.md into its target path under
# assets/ai-images/. Idempotent — already-present files are skipped.
# Run from the repo root: `bash assets/ai-images/fetch.sh`.

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

# A. Distressed exteriors
fetch A_exteriors/A1_butter-yellow.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215726_99d44192-2add-48e1-ade3-06340d2a7e3e.png
fetch A_exteriors/A2_light-blue.png           https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215728_af464d74-f9c0-4d86-9254-0275c69cc922.png
fetch A_exteriors/A3_tan-1980s.png            https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215731_03dc2758-23bd-4931-a428-8fa617d88324.png

# B. Distressed kitchens
fetch B_kitchens/B1_honey-oak.png             https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215734_8b784aef-75e4-4d27-a2b0-6e7f0ac6b7a8.png
fetch B_kitchens/B2_70s-light-wood.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215737_d0492dfc-2c98-42d6-81b0-dde187bcfa6a.png
fetch B_kitchens/B3_90s-maple.png             https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215740_2a790da7-6e9e-4eae-a993-7f59efc2d635.png

# C. Distressed living rooms / bedrooms
fetch C_living-bedrooms/C1_living-beige-carpet.png   https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215743_358ab66d-68d0-4a59-830b-339d692291bd.png
fetch C_living-bedrooms/C2_living-recliner.png       https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215746_368f842b-fbab-4f00-8c3b-d55330766f28.png
fetch C_living-bedrooms/C3_bedroom-full-size.png     https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215748_e82b254d-0eac-4251-a0c4-665dc6bed98c.png

# D. Before / after pairs
fetch D_before-after/D1a_before_off-white.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215751_2a34b42f-7bc8-4c43-9a2d-39da9f1f7d8e.png
fetch D_before-after/D1b_after_off-white.png         https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215754_caa993c7-fffe-428c-bf8d-a4470a03e249.png
fetch D_before-after/D2a_before_light-blue.png       https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215757_6a913eb5-e4f1-4ea7-8e7d-b6724b27b149.png
fetch D_before-after/D2b_after_light-blue.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215800_ad483327-19c3-43f8-8c9a-4c7efe5c1aff.png
fetch D_before-after/D3a_before_sage-green.png       https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215803_5ce04c4a-7f99-4951-888c-0440c90623f1.png
fetch D_before-after/D3b_after_sage-green.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215805_ecdaa86d-4296-4d17-8856-d1c794db7d09.png

# E. Seller relief
fetch E_seller-relief/E1_white-woman-40s.png         https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215808_70cd1c7e-6b48-4a33-9cf1-a367d4c0240f.png
fetch E_seller-relief/E2_black-man-60s.png           https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215811_c1cd0821-1fc8-4f85-97eb-b0f9a70c7c18.png
fetch E_seller-relief/E3_white-woman-70s.png         https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215814_6b219ec8-d207-45c2-bcff-a4dae81b3c6c.png

# F. Trusted local buyer
fetch F_local-buyer/F1_white-man-30s.png             https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215817_591d82cb-73c1-4f48-b480-516252600e9d.png
fetch F_local-buyer/F2_latino-man-40s.png            https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215819_4d241df2-f621-4630-805c-cbb1300f3be9.png
fetch F_local-buyer/F3_black-woman-30s.png           https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215822_a756783b-799a-4ddf-abea-121b85282b44.png

echo "done."
