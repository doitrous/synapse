#!/usr/bin/env python3
"""Index a department book's own words, page by page.

    python3 scripts/asu/extract/deptbook-spans.py --module "ASU-CVS"

Copied from `scripts/kasr/extract/deptbook-spans.py`, retrofitted for
`--module`: that file finds "the" department book by matching
`"Department Book Module 101" in fileName`, a filename Ain Shams's corpus
does not have. This version takes `--module` and picks the first manifest
row for that module whose `sourceCategory` is `"Department Book"` — pass
`--file "<exact fileName>"` when a module has more than one and a specific
one is wanted.

A citation's `support_span` has to be the source's own words, quoted and not
paraphrased. See Kasr's original for the fuller rationale on why the chapter
extraction (`deptbook.json`) cannot supply that itself.

Writes `<module-slug>/deptbook-spans.json`: `{ page, printedPage, spans: [{ text, kind }] }`.
"""
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import asu_module  # noqa: E402

HEADING = re.compile(r"^[A-Z][A-Za-z .,'\-/&()]{2,60}:?$")
LABELLED = re.compile(r"^\s*[-–]?\s*([A-Z][A-Za-z .'\-/&()]{2,40})\s*:\s*(.+)$")
FURNITURE = re.compile(r"^\s*\d{1,3}\s*$")


def spans_on(text):
    """Every citable line on a page, with what kind of line it is."""
    out = []
    for raw in text.split("\n"):
        line = re.sub(r"\s{2,}", " ", raw).strip()
        if len(line) < 8 or FURNITURE.match(line):
            continue
        letters = sum(character.isalpha() for character in line)
        if letters < len(line) * 0.5:
            continue

        labelled = LABELLED.match(line)
        if labelled:
            out.append({"text": line, "kind": "labelled", "label": labelled.group(1).strip()})
        elif HEADING.match(line):
            out.append({"text": line, "kind": "heading"})
        else:
            out.append({"text": line, "kind": "prose"})
    return out


def main(argv):
    module, rest = asu_module.parse_module(argv)
    file_name = rest[rest.index("--file") + 1] if "--file" in rest else None

    candidates = [s for s in asu_module.module_sources(module) if s.get("sourceCategory") == "Department Book"]
    if file_name:
        candidates = [s for s in candidates if s["fileName"] == file_name]
    if not candidates:
        raise SystemExit(f'no "Department Book" source found for module "{module}"'
                          + (f' matching --file "{file_name}"' if file_name else ''))
    book = candidates[0]
    if len(candidates) > 1 and not file_name:
        print(f"warning: {len(candidates)} department books for {module}; using "
              f"{book['fileName']!r}. Pass --file to pick another.", file=sys.stderr)

    path, pages = book["absolutePath"], book["pageCount"] or 0

    out = []
    for page in range(1, pages + 1):
        text = subprocess.run(
            ["pdftotext", "-layout", "-f", str(page), "-l", str(page), "-q", path, "-"],
            capture_output=True, text=True, timeout=120).stdout
        spans = spans_on(text)
        printed = None
        for line in text.split("\n"):
            stripped = line.strip()
            if FURNITURE.match(stripped):
                printed = int(stripped)
                break
        out.append({"page": page, "printedPage": printed, "spans": spans})

    out_path = asu_module.out_path(module, "deptbook-spans.json")
    json.dump({"sourceId": book["sourceId"], "file": book["fileName"],
               "pages": pages, "pageSpans": out},
              open(out_path, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    total = sum(len(p["spans"]) for p in out)
    print(f"{total} spans across {pages} pages -> {out_path}")


if __name__ == "__main__":
    main(sys.argv[1:])
