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
for build in build-article-links build-batches build-coverage; do
  node --experimental-strip-types "scripts/kasr/$build.ts" >/dev/null
done

git add -- "${GENERATED[@]}" 2>/dev/null || true
if ! git diff --cached --quiet; then
  git commit -q -m "Regenerate the 101 ISK batches after merging

Generated from the seeds rather than merged: two lanes regenerating one
file conflict on every line, and a hand-resolved merge of generated
output is a file no generator would have written."
fi

git push -q origin HEAD:main && echo "pushed $(git rev-parse --short HEAD)"
