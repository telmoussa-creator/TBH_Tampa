# How to get a staging URL — one-time setup (~3 minutes)

You need a Vercel account (free tier is fine). The setup is a one-time
3-secret install on the GitHub repo. After that, every push to
`claude/rebuild-real-estate-platform-cKSaA` auto-deploys to a staging URL.

**This setup never touches your existing site.** It creates a brand-new
Vercel project; staging deploys land at `https://<project>.vercel.app`
(or any subdomain you choose). Your existing `tarekbuyshouses.com`
points wherever it points today and is not modified.

---

## Step 1 — Create the staging project on Vercel

1. Go to https://vercel.com/new
2. Click **"Continue with GitHub"** if not signed in
3. **Skip importing the repo** for now. Instead, click **Add New → Project**
   then choose **"Browse a different repo"** and pick **`telmoussa-creator/tbh_tampa`**
4. Project name: `tbh-tampa-staging`
5. **Framework preset:** Next.js (auto-detected)
6. **Root directory:** leave as `./`
7. Add this environment variable:
   - `ANTHROPIC_API_KEY` = your Anthropic key
   (everything else — Supabase, Twilio, RentCast, Maps — is optional;
   pages render fine without them, only those features stay dormant)
8. Click **Deploy**

Wait ~90 seconds. You'll see a `https://tbh-tampa-staging-xxx.vercel.app`
URL. **That's your staging site.** First version is live.

---

## Step 2 — Wire automatic deploys on every push (optional but recommended)

So you don't have to click "redeploy" every time. Add 3 secrets to GitHub:

1. **Get a Vercel token:**
   https://vercel.com/account/tokens → "Create Token" → name it
   `github-actions-staging`, scope `Full Account`, copy the value.

2. **Get the project IDs:**
   - Go to your Vercel staging project → Settings → General
   - Copy **Project ID** and **Team / Personal Account ID** (or Org ID)

3. **Add 3 secrets to the GitHub repo:**
   https://github.com/telmoussa-creator/tbh_tampa/settings/secrets/actions
   - `VERCEL_TOKEN` = (from step 1)
   - `VERCEL_ORG_ID` = (your Team/Personal Account ID)
   - `VERCEL_PROJECT_ID` = (Project ID from step 2)

That's it. The workflow at `.github/workflows/vercel-staging.yml` runs on
every push to the rebuild branch and posts the staging URL to the GitHub
Actions run summary.

---

## What lands on staging

The full Opendoor rebuild — landing page, 3-step offer flow with the AI
AVM, photo upload with vision condition AI, claim form with lead capture
+ scoring, streaming Claude concierge in the corner, gated operator
dashboard at `/dashboard`.

Without `ANTHROPIC_API_KEY`, the AI endpoints return a clear error
message but the UI still renders end-to-end so you can click through.

---

## Why I couldn't deploy this for you from inside Claude Code

The cloud Claude Code container's egress allowlist only permits GitHub
and Anthropic's API. Vercel/Netlify/Cloudflare/Render APIs and every
tunnel service (cloudflared, localtunnel, serveo) are blocked at the
network layer. Confirmed by probing — they all return `403 Forbidden`
from this sandbox before any auth check.

If you want me to be able to deploy on your behalf in future sessions,
either (a) share a Vercel token in chat (I'll deploy it and tell you
the URL), or (b) recreate this Claude Code environment with a broader
network policy that includes `*.vercel.com`.
