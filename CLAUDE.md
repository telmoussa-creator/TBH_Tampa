# TBH_Tampa — Claude Project Brief

This repo is Tarek Buys Houses (TBH) seller-facing script and shotlist content for paid video ads. Read this file before touching anything in `scripts/`. The project ships creative — not code — so "correct" means on-voice, on-format, and compliant, not green tests.

## What's here

- `scripts/ambassador-scripts.md` — the master modular library: 12 emotional-state buckets (Overwhelmed, Ashamed, Afraid, Avoidant, Angry, Confused, Urgent, Hopeless, Embarrassed, Stuck, Tired Landlord, Just Want Out) × Hook + Middle + CTA fragments, assigned across 3 ambassadors (Sofia, Luke, Valeria). Any hook + any middle + any CTA in the same state combines into a working spot.
- `scripts/sofia-foreclosure-longform-shotlist.md` — a worked-out long-form (~3:00) assembly plan: beat-by-beat timeline, Higgsfield clip IDs, audio/caption/export spec.
- `.gitignore` — `ads_v1/`, `*.mp4`, `.DS_Store`. Rendered video and staging artifacts never get committed.

New script work goes in `scripts/`. New ad assembly plans follow the shotlist format (master timeline table + audio bed + captions + export notes).

## Load these skills before writing or judging anything

- `business-context` — the TBH + HRE Beauty product-marketing bible: who Tarek is, hard copy rules, verified ad-cost numbers, tracking state. **Always load first.** Everything else sits on top of it.
- `script-compliance-check` — load before judging or writing TBH ad copy or scripts. It enforces the hard rules below.
- `tbh-seller-conversations` — for anything in the seller-facing voice (ambassador middles, CTAs, inbound SMS tone).
- `tbh-video-ad` — for shotlist, beat, aspect-ratio, and ad-format decisions.
- `ad-creative` — for generating or iterating headlines, hooks, and primary text at volume.
- `copy-editing` / `copywriting` — only after the three above are considered. Restore Tarek's voice; do not rewrite it from scratch.

If a task touches ad spend decisions (kill rules, CPL, pixel wiring), stop and read `business-context` first — those numbers are hard-coded there and change weekly.

## Hard compliance rules (these come from Tarek, not preference)

These are blanket statements TBH may NOT make, because they are not true on every deal:

- ❌ "Cash offer" promised to everyone
- ❌ "No showings"
- ❌ "Just a couple of questions"
- ❌ Any fixed closing timeline (no "14 days" as a blanket promise — it is brand-standard, not a universal guarantee; use "fast / cash / as-is" phrasing, and keep "14 days" only in the brand closer where it already appears)

Also:

- Never state or imply Tarek is not an agent. He holds a California real estate license. On a TBH deal he acts as principal (cash buyer), not as the seller's agent. Both facts coexist — do not collapse them.
- Never put `eXp` (his brokerage) next to the Tarek Buys Houses brand in TBH ads. Confusing to sellers.
- Ambassadors (Sofia, Luke, Valeria) do NOT identify as Tarek. "Tarek and our team" / "Tarek Buys Houses has helped thousands" — never "I've helped thousands" in ambassador voice.
- "Helped thousands" is attributed to brand/team, not the on-camera talent personally.
- No guaranteed outcomes. No specific dollar promises.

## Voice

**TBH is Tarek's own voice: direct, plain, earned, human.** First person when Tarek himself speaks. Ambassador voice when Sofia/Luke/Valeria speak — same values, delivered on behalf of the team.

**Banned words / constructions** (both brands, always):
- leverage, navigate, delve, robust, ensure, streamline, synergy, circle back, ecosystem
- No em dashes
- No "it's not X, it's Y" constructions
- No AI-tells: "no X, no Y, no Z" lists, sentences that trail into extra comma clauses, "in a world where…"

**Restore, don't replace.** If a script already carries Tarek's real voice, the job is to diagnose that and preserve it — not write over it.

## Format conventions

Ambassador-script entries follow:

```
# STATE N — <LABEL>  ·  *<Ambassador>*

### HOOKS (6–10 sec)
1. "..."
### MIDDLES (10–15 sec)
1. "..."
### CTAs (6–10 sec)
1. "..."
```

Durations:
- **Short (15–20s):** Hook + CTA
- **Medium (25–35s):** Hook + Middle + CTA
- **Long (40–60s):** Hook + 2 Middles + CTA

Shotlists follow the sofia-foreclosure template: top matter (format, talent, source prefix, model), master-timeline table (Beat | In | Out | Dur | Clip ID | File | Line), then Audio / Captions / Export sections. 9:16 vertical, 1080×1920, Reels/TikTok/Shorts.

Universal closer (optional, long-form only):
> *"Tarek Buys Houses. We close in 14 days. Cash. As-is."*

## Workflow (how to use Claude in this repo)

- **Plan mode first.** For any new state, new ambassador, new ad angle, or shotlist: enter plan mode (Shift+Tab), iterate the plan until it's tight, then one-shot. Boris Cherny's rule applies here too.
- **Branch per task.** Branch names: `claude/<short-topic>` or whatever the task spec hands you. One task, one branch, one PR.
- **Parallel sessions welcome.** Different ambassadors / states / shotlists can be worked in parallel checkouts without collisions — the files are modular.
- **Never commit rendered video.** `*.mp4` is gitignored for a reason. Shotlists reference Higgsfield CDN URLs; the binary stays off git.
- **Media generation.** Images and video go through Higgsfield (`generate_image`, `generate_video`); predict virality with `virality_predictor` on long-form before shipping. All seedance_2_0 clips are 8s max (B-roll 4–5s) per the current shotlist convention.

## What "done" looks like for a new script

1. Hits the Hook/Middle/CTA format for its state
2. Passes `script-compliance-check` (no banned claims, no banned phrasing, correct voice attribution)
3. Matches the assigned ambassador's tone (Sofia warm, Luke direct, Valeria clarifying)
4. Reads out loud at the stated duration
5. Does not contradict any `business-context` learning dated newer than this file

## What "done" looks like for a new shotlist

1. Master-timeline table complete, runtimes sum correctly
2. Every clip ID / file referenced actually exists (do not fabricate Higgsfield IDs — pull from existing generations or state they're pending)
3. Audio bed + caption spec + export spec present
4. Caption highlight phrases chosen (one per clip, gold)
5. Phone / CTA matches the current TBH short code — ask if unsure, do not guess

## Not in scope here

- No HRE Beauty content lives in this repo. HRE copy, Klaviyo work, and Shopify data belong elsewhere.
- No lead-follow-up logic, CRM wiring, or call-center scripts. This repo is paid-video creative only.
- No ad-account changes. Launching, pausing, or budgeting Meta ads is done via the ads MCP tools in a different session, not from here.
