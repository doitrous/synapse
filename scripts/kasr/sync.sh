#!/usr/bin/env bash
# Merge origin/main and land this lane's work.
#
# Several sessions author into `docs/Kasr-Source-Imports` at once, and most of
# what they touch is generated: the batches, the link map and the two coverage
# ledgers are all written by scripts from the seeds. Git cannot merge those
# usefully — two lanes each regenerate the whole file, so every regenerated line
# conflicts — and a hand-resolved merge of generated output is worse than
# useless, because it produces a file no generator would ever have written.
#
# So generated files are not merged. They are taken from whichever side, then
# regenerated from the seeds, which are the thing actually being authored.
#
# Hand-authored files — the articles, the practical concepts, the manifest —
# are NOT in that list and will stop this script if they conflict. They need a
# person to read both sides.
set -euo pipefail

# The module this lane owns, named by the caller.
#
# Not a constant. Six lanes share this script, and a hardcoded "101 ISK" here is
# the same shape as the hardcoded prefix that was just taken out of the orphan
# sweep: it works for whoever wrote it and silently regenerates the wrong
# module's batches for everyone else. `build-batches` refuses a bare run for
# exactly this reason, so this refuses one too.
MODULE="${1:-}"
if [ -z "$MODULE" ]; then
  echo "usage: scripts/kasr/sync.sh \"<module>\"   e.g. \"101 ISK\"" >&2
  echo "  the module whose batches this run should regenerate before pushing" >&2
  exit 2
fi
cd "$(dirname "$0")/../.."

# Written by scripts/kasr/build-*.ts, and by nothing else.
GENERATED=(
  docs/Kasr-Source-Imports/concept/101-ISK-concepts.md
  docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
  docs/Kasr-Source-Imports/question/101-ISK-mcq.md
  docs/Kasr-Source-Imports/coverage/101-ISK-coverage.md
  docs/Kasr-Source-Imports/coverage/101-ISK-untaught-concepts.md
  scripts/kasr/seeds/article-links.json
)

git fetch -q origin
if git merge-base --is-ancestor origin/main HEAD; then
  echo "already up to date with origin/main"
else
  echo "merging origin/main…"
  if ! git merge --no-edit origin/main >/dev/null 2>&1; then
    for file in "${GENERATED[@]}"; do
      git checkout --theirs -- "$file" 2>/dev/null && git add -- "$file" || true
    done
    # Anything still conflicted is hand-authored and is not this script's to
    # decide. Stop, and say which files need reading.
    if git diff --name-only --diff-filter=U | grep -q .; then
      echo "hand-authored conflicts — resolve these by reading both sides:" >&2
      git diff --name-only --diff-filter=U >&2
      exit 1
    fi
    git commit -q --no-edit
  fi
fi

echo "regenerating…"
# `build-batches` takes the module now; the other two do not. A bare run of it
# used to rewrite every module's batches, which is why it refuses one.
node --experimental-strip-types scripts/kasr/build-article-links.ts >/dev/null
node --experimental-strip-types scripts/kasr/build-batches.ts "$MODULE" >/dev/null
node --experimental-strip-types scripts/kasr/build-coverage.ts >/dev/null

git add -- "${GENERATED[@]}" 2>/dev/null || true
if ! git diff --cached --quiet; then
  git commit -q -m "Regenerate the 101 ISK batches after merging

Generated from the seeds rather than merged: two lanes regenerating one
file conflict on every line, and a hand-resolved merge of generated
output is a file no generator would have written."
fi

# Push, and if another lane landed something between the fetch above and now,
# merge that too and try again. With several sessions authoring this module the
# window is small but it is hit often, and a failed push that leaves the work
# committed-but-unpushed is easy to walk away from without noticing.
for attempt in 1 2 3; do
  if git push -q origin HEAD:main 2>/dev/null; then
    echo "pushed $(git rev-parse --short HEAD)"
    exit 0
  fi
  echo "origin moved under us — merging again (attempt $attempt)"
  git fetch -q origin
  if ! git merge --no-edit origin/main >/dev/null 2>&1; then
    for file in "${GENERATED[@]}"; do
      git checkout --theirs -- "$file" 2>/dev/null && git add -- "$file" || true
    done
    if git diff --name-only --diff-filter=U | grep -q .; then
      echo "hand-authored conflicts — resolve these by reading both sides:" >&2
      git diff --name-only --diff-filter=U >&2
      exit 1
    fi
    git commit -q --no-edit
  fi
  node --experimental-strip-types scripts/kasr/build-article-links.ts >/dev/null
  node --experimental-strip-types scripts/kasr/build-batches.ts "$MODULE" >/dev/null
  node --experimental-strip-types scripts/kasr/build-coverage.ts >/dev/null
  git add -- "${GENERATED[@]}" 2>/dev/null || true
  git diff --cached --quiet || git commit -q -m "Regenerate the 101 ISK batches after merging"
done

echo "could not push after three attempts — origin is moving faster than this script" >&2
exit 1
