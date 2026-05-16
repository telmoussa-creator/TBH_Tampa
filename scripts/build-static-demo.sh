#!/usr/bin/env bash
# Build the static GitHub Pages demo.
# Server-only routes (API, auth callback, login, dashboard) are temporarily
# moved aside, the static export runs, then the routes are restored.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

STASH=".static-stash"
mkdir -p "$STASH"

cleanup() {
  for d in api auth login dashboard; do
    if [ -d "$STASH/$d" ]; then
      mkdir -p "src/app"
      mv "$STASH/$d" "src/app/$d"
    fi
  done
  rmdir "$STASH" 2>/dev/null || true
}
trap cleanup EXIT

for d in api auth login dashboard; do
  if [ -d "src/app/$d" ]; then
    mv "src/app/$d" "$STASH/$d"
  fi
done

echo ">>> Building static demo (DEMO_STATIC=true)"
DEMO_STATIC=true npx next build

# GitHub Pages skips folders starting with _ unless .nojekyll exists
touch out/.nojekyll
echo ">>> Static demo ready in ./out"
