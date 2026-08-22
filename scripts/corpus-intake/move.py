#!/usr/bin/env python3
"""Put every loose file where the plan says it belongs.

Rules that make this safe to run:

  * Nothing is ever deleted and nothing is ever overwritten. If a file of the
    same name is already at the target, the two are compared by checksum: an
    identical twin is left where it is and recorded as a duplicate, and a
    genuine collision gets a suffix rather than clobbering either side.
  * Every move is written to a ledger with both paths and the checksum, so the
    whole run can be reversed exactly.
  * Existing folders are reused, including the ones whose names are not what
    you would guess — this corpus has a `HISTOLOGY ` with a trailing space and
    a lower-case `pharmacology`, and creating tidy-looking siblings for them
    would split subjects in two.

`--apply` performs the moves; without it this prints what it would do.

**Year 1 only.** Every later intake year (Year 2 onward) arrives already
organised by the owner — there is no loose pile for this script to place,
and running it against one would try to reorganise a corpus this repo has
been told never to move, rename or delete. `--year` therefore only accepts
`y1` (the default); anything else refuses before touching a single file
rather than silently walking `ROOT` (Year 1's `PLAN`/`LEDGER`) against
another year's folders.
"""
import argparse
import hashlib
import json
import os
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/Users/doitrous/Desktop/Kasr Alainy"
PLAN = os.path.join(HERE, "plan.json")
LEDGER = os.path.join(HERE, "move-ledger.json")


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def existing_dirs():
    """Every directory that already exists, by casefolded name, so an existing
    folder is reused rather than shadowed by a differently-cased twin."""
    found = {}
    for dirpath, dirnames, _ in os.walk(ROOT):
        for d in dirnames:
            full = os.path.join(dirpath, d)
            rel = os.path.relpath(full, ROOT)
            found[rel.casefold().rstrip()] = rel
    return found


def resolve_target(target_rel, known):
    """Map a planned folder onto one that already exists, if there is one."""
    key = target_rel.casefold().rstrip()
    return known.get(key, target_rel)


def main():
    ap = argparse.ArgumentParser(add_help=False)
    ap.add_argument("--year", default="y1")
    ap.add_argument("--apply", action="store_true")
    args, _unknown = ap.parse_known_args()
    if args.year != "y1":
        raise SystemExit(
            f'move.py is Year-1-only — refusing --year "{args.year}". Year 2 onward arrived '
            f'already organised by the owner; there is no plan for this script to apply, and '
            f'nothing under those years is ever moved, renamed or deleted. See this file\'s '
            f'module docstring.')

    apply = args.apply
    plan = json.load(open(PLAN))
    known = existing_dirs()

    moves, duplicates, collisions, skipped = [], [], [], []

    for row in plan:
        src_rel = row["rel"]
        src = os.path.join(ROOT, src_rel)
        if not os.path.exists(src):
            skipped.append((src_rel, "source is gone"))
            continue

        target_dir_rel = resolve_target(row["target_dir"], known)
        if os.path.dirname(src_rel) == target_dir_rel:
            skipped.append((src_rel, "already in place"))
            continue

        dst_dir = os.path.join(ROOT, target_dir_rel)
        dst = os.path.join(dst_dir, row["name"])
        dst_rel = os.path.join(target_dir_rel, row["name"])

        if os.path.exists(dst):
            if sha256(dst) == row["sha256"]:
                duplicates.append((src_rel, dst_rel))
                continue
            stem, ext = os.path.splitext(row["name"])
            dst = os.path.join(dst_dir, f"{stem} [{row['sha256'][:8]}]{ext}")
            dst_rel = os.path.relpath(dst, ROOT)
            collisions.append((src_rel, dst_rel))

        moves.append({
            "from": src_rel, "to": dst_rel, "sha256": row["sha256"],
            "type": row["type"], "module": row.get("module"),
            "confidence": row["confidence"], "evidence": row["evidence"],
        })

        if apply:
            os.makedirs(dst_dir, exist_ok=True)
            shutil.move(src, dst)

    print(f"{'MOVED' if apply else 'would move'}: {len(moves)}")
    print(f"identical twin already at target (left alone): {len(duplicates)}")
    print(f"name collision, different bytes (suffixed):    {len(collisions)}")
    print(f"skipped:                                       {len(skipped)}")
    for rel, why in skipped[:10]:
        print(f"   - {rel} ({why})")
    for a, b in duplicates:
        print(f"   dup: {a}\n     == {b}")
    for a, b in collisions:
        print(f"   collision: {a}\n           -> {b}")

    if apply:
        json.dump({"root": ROOT, "moves": moves, "duplicates": duplicates,
                   "collisions": collisions, "skipped": skipped},
                  open(LEDGER, "w"), indent=1)
        print(f"\nledger -> {LEDGER}")


if __name__ == "__main__":
    main()
