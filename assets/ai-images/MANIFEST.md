# Tampa AI Image Asset Manifest

Generated against `specs/tampa-ai-image-spec.md` and `specs/tampa-ai-image-prompt-pack.md`. Images live on the Higgsfield CDN; the sandbox blocks that host, so the actual PNGs are not committed. Run `assets/ai-images/fetch.sh` from a machine with normal internet access to materialize all files under their final paths.

**Models used:**
- Exteriors / interiors / before-after — `nano_banana_flash` (Google Nano Banana 2), 16:9, 1k.
- People (seller relief / local-buyer archetype) — `soul_2` (Higgsfield Soul 2.0), 16:9, 2k.

All prompts include the spec's negative block (no text/logos/watermarks/exaggerated damage/horror/cartoon/3D render).

---

## A. Distressed Tampa exterior — 3 winners

| File | Subject |
|---|---|
| `A_exteriors/A1_butter-yellow.png` | 1970s butter-yellow stucco, chain-link fence, sabal palms, overcast |
| `A_exteriors/A2_light-blue.png` | 1960s light-blue ranch, queen palms, soft afternoon Gulf light |
| `A_exteriors/A3_tan-1980s.png` | 1980s tan stucco, maroon minivan, satellite dish, cloudy daylight |

## B. Distressed interior — kitchen — 3 winners

| File | Subject |
|---|---|
| `B_kitchens/B1_honey-oak.png` | Honey-oak cabinets, beige laminate, mismatched appliances |
| `B_kitchens/B2_70s-light-wood.png` | 1970s light wood + brass pulls, ceiling fan, tired vinyl |
| `B_kitchens/B3_90s-maple.png` | 1990s light maple, off-white tile counters, stainless mix |

## C. Distressed interior — living room / bedroom — 3 winners

| File | Subject |
|---|---|
| `C_living-bedrooms/C1_living-beige-carpet.png` | Living room, beige carpet, microfiber sofa, moving boxes |
| `C_living-bedrooms/C2_living-recliner.png` | 1980s living room, tan carpet, brown leather recliner |
| `C_living-bedrooms/C3_bedroom-full-size.png` | Small bedroom, mismatched bedding, shadeless lamp |

## D. Before / After cleanup — 3 paired sets

| Pair | Before | After |
|---|---|---|
| **1 — off-white stucco** | `D_before-after/D1a_before_off-white.png` | `D_before-after/D1b_after_off-white.png` |
| **2 — light-blue stucco** | `D_before-after/D2a_before_light-blue.png` | `D_before-after/D2b_after_light-blue.png` |
| **3 — sage-green stucco** | `D_before-after/D3a_before_sage-green.png` | `D_before-after/D3b_after_sage-green.png` |

## E. Seller relief / paperwork moment — 3 winners

| File | Subject |
|---|---|
| `E_seller-relief/E1_white-woman-40s.png` | White woman, early 40s, with friendly buyer outside stucco home |
| `E_seller-relief/E2_black-man-60s.png` | Black man, 60s, walkway, handshake with woman buyer |
| `E_seller-relief/E3_white-woman-70s.png` | White woman, 70s with gray hair, porch, paperwork in hands |

## F. "Trusted local buyer" archetype — 3 winners

| File | Subject |
|---|---|
| `F_local-buyer/F1_white-man-30s.png` | White man, late 30s, light-blue oxford, midday |
| `F_local-buyer/F2_latino-man-40s.png` | Latino man, 40s, navy polo, late-afternoon light |
| `F_local-buyer/F3_black-woman-30s.png` | Black woman, 30s, white button-down, clipboard, soft light |

---

## Source URLs

(Raw URLs feed `fetch.sh`. Keep this synced if you regenerate.)

```
# A
A_exteriors/A1_butter-yellow.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215726_99d44192-2add-48e1-ade3-06340d2a7e3e.png
A_exteriors/A2_light-blue.png           https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215728_af464d74-f9c0-4d86-9254-0275c69cc922.png
A_exteriors/A3_tan-1980s.png            https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215731_03dc2758-23bd-4931-a428-8fa617d88324.png
# B
B_kitchens/B1_honey-oak.png             https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215734_8b784aef-75e4-4d27-a2b0-6e7f0ac6b7a8.png
B_kitchens/B2_70s-light-wood.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215737_d0492dfc-2c98-42d6-81b0-dde187bcfa6a.png
B_kitchens/B3_90s-maple.png             https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215740_2a790da7-6e9e-4eae-a993-7f59efc2d635.png
# C
C_living-bedrooms/C1_living-beige-carpet.png   https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215743_358ab66d-68d0-4a59-830b-339d692291bd.png
C_living-bedrooms/C2_living-recliner.png       https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215746_368f842b-fbab-4f00-8c3b-d55330766f28.png
C_living-bedrooms/C3_bedroom-full-size.png     https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215748_e82b254d-0eac-4251-a0c4-665dc6bed98c.png
# D
D_before-after/D1a_before_off-white.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215751_2a34b42f-7bc8-4c43-9a2d-39da9f1f7d8e.png
D_before-after/D1b_after_off-white.png         https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215754_caa993c7-fffe-428c-bf8d-a4470a03e249.png
D_before-after/D2a_before_light-blue.png       https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215757_6a913eb5-e4f1-4ea7-8e7d-b6724b27b149.png
D_before-after/D2b_after_light-blue.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215800_ad483327-19c3-43f8-8c9a-4c7efe5c1aff.png
D_before-after/D3a_before_sage-green.png       https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215803_5ce04c4a-7f99-4951-888c-0440c90623f1.png
D_before-after/D3b_after_sage-green.png        https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215805_ecdaa86d-4296-4d17-8856-d1c794db7d09.png
# E
E_seller-relief/E1_white-woman-40s.png         https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215808_70cd1c7e-6b48-4a33-9cf1-a367d4c0240f.png
E_seller-relief/E2_black-man-60s.png           https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215811_c1cd0821-1fc8-4f85-97eb-b0f9a70c7c18.png
E_seller-relief/E3_white-woman-70s.png         https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215814_6b219ec8-d207-45c2-bcff-a4dae81b3c6c.png
# F
F_local-buyer/F1_white-man-30s.png             https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215817_591d82cb-73c1-4f48-b480-516252600e9d.png
F_local-buyer/F2_latino-man-40s.png            https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215819_4d241df2-f621-4630-805c-cbb1300f3be9.png
F_local-buyer/F3_black-woman-30s.png           https://d8j0ntlcm91z4.cloudfront.net/user_36Mo1Mlc9jhRsmMEjBc0BgoyEII/hf_20260518_215822_a756783b-799a-4ddf-abea-121b85282b44.png
```

## How to materialize the PNGs

From the repo root on any machine with open internet:

```sh
bash assets/ai-images/fetch.sh
```

This pulls every image listed above into its target path. Files already present are skipped.
