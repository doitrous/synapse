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

# The module as a filename fragment: "101 ISK" -> "101-ISK". `build-batches.ts`
# derives its own output names the same way (`fileSlug`), so this has to match
# it exactly or the array below points at files the build never writes.
SLUG="${MODULE// /-}"

# Written by scripts/kasr/build-*.ts, and by nothing else.
#
# Not a "101 ISK" constant. Six lanes share this script, one per module, and a
# hardcoded 101 filename list here regenerated and committed only 101's
# batches no matter which module `sync.sh` was called for — exactly the
# neighbour-clobbering failure the required `$MODULE` argument above exists to
# stop, arriving by the back door. Derived from `$SLUG` so a module gets its
# own five files without this script needing to learn its name.
#
# `article-links.json` is module-agnostic — `build-article-links.ts` reads
# every module's articles and concepts in one pass — so it stays a constant.
# `coverage/101-ISK-untaught-concepts.md` is genuinely 101-only today:
# `build-article-links.ts` hardcodes that one ledger path and does not yet
# take a module argument. Widening it to one ledger per module is that
# script's change to make, not this one's to fake.
GENERATED=(
  "docs/Kasr-Source-Imports/concept/${SLUG}-concepts.md"
  "docs/Kasr-Source-Imports/concept/${SLUG}-mcq-concepts.md"
  "docs/Kasr-Source-Imports/question/${SLUG}-mcq.md"
  "docs/Kasr-Source-Imports/coverage/${SLUG}-coverage.md"
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
# `build-batches` and `build-coverage` both take the module; `build-article-links`
# does not, because it reads every module's articles and concepts in one pass.
# A bare run of `build-batches` used to regenerate every registered module, so
# one lane regenerating its own work silently rewrote a neighbour's committed
# batches — which is why it now refuses to run without being told which module
# it is building. `build-coverage` defaults to 101 ISK when `--module` is
# omitted, so leaving it bare here would regenerate 101's coverage file no
# matter which module `$MODULE` names, while `$GENERATED` above expects this
# module's own — silently stale for everyone but 101.
node --experimental-strip-types scripts/kasr/build-article-links.ts >/dev/null
node --experimental-strip-types scripts/kasr/build-batches.ts "$MODULE" >/dev/null
node --experimental-strip-types scripts/kasr/build-coverage.ts --module "$MODULE" >/dev/null

# Only what this run actually produced. `build-batches` skips the MCQ route
# entirely for a module with no question-book seeds or bank yet (see `mcq()`
# in build-batches.ts), so `${SLUG}-mcq.md` and `${SLUG}-mcq-concepts.md` may
# not exist — and `git add` fails its whole argument list, staging nothing at
# all, the moment one pathspec in it matches no file.
existing=()
for file in "${GENERATED[@]}"; do
  [ -e "$file" ] && existing+=("$file")
done
git add -- "${existing[@]}" 2>/dev/null || true
if ! git diff --cached --quiet; then
  git commit -q -m "Regenerate the $MODULE batches after merging

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
  node --experimental-strip-types scripts/kasr/build-coverage.ts --module "$MODULE" >/dev/null
  existing=()
  for file in "${GENERATED[@]}"; do
    [ -e "$file" ] && existing+=("$file")
  done
  git add -- "${existing[@]}" 2>/dev/null || true
  git diff --cached --quiet || git commit -q -m "Regenerate the $MODULE batches after merging"
done

echo "could not push after three attempts — origin is moving faster than this script" >&2
exit 1
