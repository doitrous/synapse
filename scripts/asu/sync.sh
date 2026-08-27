#!/usr/bin/env bash
# Merge origin/main and land this lane's work.
#
# Copied from `scripts/kasr/sync.sh`. Same reasoning throughout — generated
# files (the batches, the article-link map, the coverage ledgers) are never
# merged, only regenerated from the seeds after taking either side; hand-
# authored files that conflict stop the script for a person to read both
# sides.
#
# Two real fixes relative to Kasr's copy:
#
# 1. **The build's stdout is no longer swallowed.** Kasr's copy runs every
#    regeneration step with `>/dev/null`. `build-batches.ts`'s orphan report —
#    which written batches were left in place, or removed under `--sweep` —
#    is a `console.log`/`console.error`, and routing it to `/dev/null` means
#    a lane never sees it: safe (nothing is deleted without `--sweep`) and
#    useless (the one signal that argues for leaving orphans alone is the
#    report being seen, and this script hid it). Every build step below
#    prints to the terminal.
# 2. **`medical:concept-ids` runs as the final gate**, unswallowed. It scans
#    every `docs/*-Source-Imports/concept/` directory — Kasr's, this one's,
#    and any other university's — for two IDs meaning one concept, which is
#    now a live risk this toolchain did not have before: concept IDs carry no
#    module or university (see `seeds/types.ts`'s `mintConceptId`), so a
#    rival ID for one idea is exactly the failure this checks for. Scoped to
#    this run's own files via its own file-naming convention, so another
#    lane's pre-existing problem does not fail this lane's push — see
#    `scripts/kasr/check-concept-ids.ts`'s own "Whose problems are these?"
#    for why.
set -euo pipefail

# The module this lane owns, named by the caller. Required — Ain Shams has no
# default module, unlike Kasr's implicit "101 ISK" — see build-batches.ts's
# own refusal to run bare for the same reasoning.
MODULE="${1:-}"
if [ -z "$MODULE" ]; then
  echo "usage: scripts/asu/sync.sh \"<module>\"   e.g. \"ASU-CVS\"" >&2
  echo "  the module whose batches this run should regenerate before pushing" >&2
  exit 2
fi
cd "$(dirname "$0")/../.."

SLUG="${MODULE// /-}"

# Written by scripts/asu/build-*.ts, and by nothing else. `pending-live/` is
# deliberately absent — see build-batches.ts's header — those files must
# never be applied automatically, so this script leaves them for a person to
# reconcile rather than regenerating and committing them blind.
GENERATED=(
  "docs/Ain-Shams-Source-Imports/concept/${SLUG}-concepts.md"
  "docs/Ain-Shams-Source-Imports/concept/${SLUG}-mcq-concepts.md"
  "docs/Ain-Shams-Source-Imports/question/${SLUG}-mcq.md"
  "docs/Ain-Shams-Source-Imports/coverage/${SLUG}-coverage.md"
  "docs/Ain-Shams-Source-Imports/coverage/asu-untaught-concepts.md"
  "scripts/asu/seeds/article-links.json"
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
# stdout intentionally NOT swallowed — see the header. Every one of these can
# print an orphan report, a "left alone" note, or a refusal a person needs to
# see before this script commits anything.
node --experimental-strip-types scripts/asu/build-article-links.ts
node --experimental-strip-types scripts/asu/build-batches.ts "$MODULE"
node --experimental-strip-types scripts/asu/build-coverage.ts --module "$MODULE"

git add -- "${GENERATED[@]}" 2>/dev/null || true
if ! git diff --cached --quiet; then
  git commit -q -m "Regenerate the ${MODULE} batches after merging

Generated from the seeds rather than merged: two lanes regenerating one
file conflict on every line, and a hand-resolved merge of generated
output is a file no generator would have written."
fi

echo "checking concept IDs…"
# Scoped to this run's own generated files, so a pre-existing problem
# elsewhere in the tree does not block this push — see
# scripts/kasr/check-concept-ids.ts's own file-scoping for the reasoning.
# Not swallowed: a red result here means a rival ID for one concept, which is
# exactly the failure the shared minting law (mintConceptId, no module or
# university salt) exists to prevent.
if ! node --experimental-strip-types scripts/kasr/check-concept-ids.ts "${GENERATED[@]}"; then
  echo "medical:concept-ids found a problem involving this run's own files — see above. Not pushing." >&2
  exit 1
fi

# Push, and if another lane landed something between the fetch above and now,
# merge that too and try again.
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
  node --experimental-strip-types scripts/asu/build-article-links.ts
  node --experimental-strip-types scripts/asu/build-batches.ts "$MODULE"
  node --experimental-strip-types scripts/asu/build-coverage.ts --module "$MODULE"
  git add -- "${GENERATED[@]}" 2>/dev/null || true
  git diff --cached --quiet || git commit -q -m "Regenerate the ${MODULE} batches after merging"
done

echo "could not push after three attempts — origin is moving faster than this script" >&2
exit 1
