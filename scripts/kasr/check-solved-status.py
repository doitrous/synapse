#!/usr/bin/env python3
"""Check the manifest's `solvedStatus` against what the files actually carry.

`solvedStatus` is read off filenames at intake, and filenames lie. `EOM ISK 101
195 Answers.pdf` is flagged solved and carries no answers at all — it is the
unsolved twin of the sitting, and an extraction lane that trusted the flag would
have banked 120 questions as answered when not one of them is.

There is a free and exact oracle for it. A paper whose answers were marked
electronically carries annotation objects — `/Stamp` for Apple ink, `/Square`
for a drawn box, `/Highlight` for a real highlight — and a paper with no marks
carries none. `qpdf` lists them without rendering anything.

The oracle is one-directional, and saying so is the point of this script:

  * annotations present  -> the file has marks on it. Certain.
  * annotations absent   -> the file has no *electronic* marks. It may still be
                            a scan of a page somebody marked in pen, which is
                            exactly what two of these papers are. So absence is
                            a question, never a verdict.

So a row flagged solved with no annotations is reported as needing an eye on the
render, and a row flagged unsolved WITH annotations is reported as simply wrong.
Only the second is an assertion.

    python3 scripts/kasr/check-solved-status.py [--module "101 ISK"]
"""
import argparse
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = os.path.join(HERE, "..", "..", "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")

# The subtypes that mean somebody marked this file, as opposed to the ones every
# PDF has. `/Image`, `/Form` and font subtypes say nothing about marking —
# `/Form` in particular is only the appearance stream a real annotation points
# at, so counting it would flag every file that has one.
MARK_SUBTYPES = {"Highlight", "Stamp", "Square", "Circle", "Ink", "StrikeOut", "Underline", "FreeText", "Popup", "Text"}

SUBTYPE = re.compile(rb"/Subtype\s*/([A-Za-z]+)")


def marks_in(path: str) -> dict[str, int] | None:
    """Annotation subtypes that indicate marking, by count. None if unreadable."""
    try:
        out = subprocess.run(
            ["qpdf", "--qdf", "--object-streams=disable", path, "-"],
            capture_output=True, timeout=120).stdout
    except Exception:
        return None
    found: dict[str, int] = {}
    for match in SUBTYPE.finditer(out):
        name = match.group(1).decode()
        if name in MARK_SUBTYPES:
            found[name] = found.get(name, 0) + 1
    return found


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--module", default=None, help="restrict to one moduleId")
    args = parser.parse_args()

    manifest = json.load(open(MANIFEST))
    rows = [row for row in manifest["sources"] if row.get("fileType") == "pdf"]
    if args.module:
        rows = [row for row in rows if row.get("moduleId") == args.module]

    wrong, unclear, checked = [], [], 0
    for row in rows:
        path = row.get("absolutePath")
        if not path or not os.path.exists(path):
            continue
        found = marks_in(path)
        if found is None:
            continue
        checked += 1
        status = (row.get("solvedStatus") or "").lower()
        marked = bool(found)
        summary = ", ".join(f"{count} /{name}" for name, count in sorted(found.items())) or "none"

        if marked and status not in ("solved", "partially_solved"):
            wrong.append((row, summary, f"flagged {status or 'unset'} but carries marks"))
        elif not marked and status == "solved":
            unclear.append((row, summary, "flagged solved and carries no electronic marks"))

    print(f"{checked} PDFs read"
          + (f" for {args.module}" if args.module else "")
          + f"; {len(wrong)} contradicted, {len(unclear)} to check by eye\n")

    if wrong:
        print("Contradicted — the file carries marks and the manifest says it does not:")
        for row, summary, why in wrong:
            print(f"  {row['sourceId']}  {row['fileName'][:56]}")
            print(f"      {why}: {summary}")
        print()

    if unclear:
        print("Worth an eye on the render — absence of annotations is not absence of answers,")
        print("because a scan of a page marked in pen carries none:")
        for row, summary, why in unclear:
            print(f"  {row['sourceId']}  {row['fileName'][:56]}")
            print(f"      {why}")
        print()

    # Only the contradicted set is an assertion, so only it fails the run.
    return 1 if wrong else 0


if __name__ == "__main__":
    sys.exit(main())
