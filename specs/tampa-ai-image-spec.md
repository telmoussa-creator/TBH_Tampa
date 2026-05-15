# Tampa AI Image Spec

AI-only image pack for Tampa "we buy houses" ads + landing pages. Use these formulas in Higgsfield (or any image model). Goal: **3–5 final winners per ad group**.

---

## 1. Global settings (apply to every prompt)

- **Aspect ratio:** 16:9
- **Style:** photorealistic, natural lighting, no HDR, no filters
- **Quality:** high resolution, sharp focus
- **People:** realistic, diverse, not model-perfect, everyday homeowners
- **Location anchor:** Tampa, Florida, suburban neighborhood, Gulf Coast light
- **Negative block (append to every prompt):** `no text, no logos, no watermarks, no exaggerated damage, no horror, no cartoon, no 3D render`

---

## 2. Prompts

### A. Distressed Tampa exterior (4–6 variants)

> Photorealistic exterior of a small single-story Tampa, Florida house, 1960s–1990s style, stucco walls, shingle roof, slightly overgrown grass, a few weeds in the yard, cracked driveway, palm trees and Florida vegetation in the background, cloudy but bright daytime lighting, realistic, subtle distress, not destroyed, 16:9, high resolution, sharp focus, no text, no logos, no watermarks, no horror, no cartoon, no 3D render.

**Vary:** paint color (faded yellow / off-white stucco / light blue) · fence (chain-link / none) · driveway (older car / empty).

### B. Distressed interior — kitchen (3–4 variants)

> Photorealistic interior of an older Tampa, Florida kitchen in a small single-family home, dated cabinets, old laminate countertops, mismatched appliances, slightly worn floor, some clutter on counters, soft natural window light, realistic and lived-in, subtle distress like minor stains or wear, not disgusting, 16:9, high resolution, sharp focus, no text, no logos, no watermarks, no horror, no cartoon, no 3D render.

**Vary:** floor (old tile / worn vinyl) · appliances (white / off-white) · ceiling fan (yes / no).

### C. Distressed interior — living room / bedroom

**Living room:**
> Photorealistic living room in an older Tampa, Florida house, slightly worn carpet, dated sofa, old blinds, a few boxes and clutter, scuffed walls, soft afternoon light coming through the window, realistic and lived-in, subtle distress, not filthy, 16:9, high resolution, sharp focus, no text, no logos, no watermarks, no horror, no cartoon, no 3D render.

**Bedroom:**
> Photorealistic small bedroom in an older Tampa, Florida house, simple bed, mismatched furniture, slightly worn carpet or tile, a few clothes or boxes visible, scuffed baseboards, soft daylight, realistic and lived-in, subtle distress, not filthy, 16:9, high resolution, sharp focus, no text, no logos, no watermarks, no horror, no cartoon, no 3D render.

### D. Before / After cleanup (two separate images, paired in ad)

**Before:**
> Photorealistic exterior of a small Tampa, Florida house with slightly overgrown grass, weeds along the walkway, a few scattered items on the porch, stucco walls, shingle roof, palm trees in background, realistic and slightly neglected, 16:9, high resolution, sharp focus, no text, no logos, no watermarks, no horror, no cartoon, no 3D render.

**After:**
> Photorealistic exterior of the same style small Tampa, Florida house but with freshly cut grass, cleaned walkway, no clutter on the porch, same stucco and shingle style, palm trees in background, bright and tidy, realistic, 16:9, high resolution, sharp focus, no text, no logos, no watermarks, no horror, no cartoon, no 3D render.

Doesn't need pixel-match — just "clearly same type of house, now cleaned."

### E. Seller relief / paperwork moment (3–5 variants)

> Photorealistic scene of a Tampa, Florida homeowner standing outside a small house, smiling with visible relief while holding a stack of paperwork or a folder, another person in casual business clothing standing nearby in a friendly, supportive way, subtle handshake or gesture of agreement, palm trees and Florida neighborhood in the background, warm late afternoon light, realistic, diverse everyday people, 16:9, high resolution, sharp focus, no text, no logos, no watermarks, no brand names, no horror, no cartoon, no 3D render.

**Vary:** age (40s / 60s) · ethnicity · crop (closer / wider).

### F. "Trusted local buyer" archetype (stand-in for founder shot)

> Photorealistic scene of a friendly real estate buyer standing in front of a small Tampa, Florida house, casual but professional clothing, smiling and approachable, one hand slightly gesturing toward the house, palm trees and Florida neighborhood in the background, bright daytime light, realistic, 16:9, high resolution, sharp focus, no text, no logos, no watermarks, no horror, no cartoon, no 3D render.

Later A/B test this vs a real founder photo.

---

## 3. Workflow

1. Ask Claude: *"Generate 10 prompts for distressed Tampa house exteriors based on this template: [paste A]. Vary colors and small details. Keep Tampa, distress subtle, 16:9, photorealistic."*
2. Repeat for B, C, D, E, F.
3. Paste prompts straight into Higgsfield with 16:9 + high-quality settings.
4. Review and pick winners (see filter below).

---

## 4. Filter — kill any image that is

- Too destroyed, post-apocalyptic, or horror-movie
- Obviously fake, plasticky, 3D-rendered, or cartoonish
- Contains text, logos, watermarks, or brand names
- Model-perfect/stock-looking people
- Outside Tampa / Florida visual cues (snow, mountains, dense urban)

**Target output per ad group:** 3–5 winners.
