#!/usr/bin/env python3
"""Index the department book's own words, page by page.

A citation's `support_span` has to be the source's words, quoted and not
paraphrased — that is the whole point of the field, and it is why
`deptbook.json` cannot supply one: the chapter extraction was deliberately a
tight paraphrase, to avoid reproducing a copyrighted textbook wholesale.

A short span quoted to evidence a specific claim is a different thing from
reproducing the book, and it is what the evidence chain needs. So this pulls
the book's text a page at a time, splits it into candidate spans, and records
where each one sits. Nothing is summarised and nothing is rewritten; a span is
either the book's line or it is not in here.

The book has a clean native text layer, so no OCR is involved and the spans are
the page rather than a transcription of it.

Writes deptbook-spans.json: `{ page, printedPage, spans: [{ text, kind }] }`.
"""
import json
import os
import re
import subprocess

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "deptbook-spans.json")

# A heading is a line the book sets on its own, often in title case with no
# terminal stop. Worth keeping separately: a heading locates a claim but does
# not support one.
HEADING = re.compile(r"^[A-Z][A-Za-z .,'\-/&()]{2,60}:?$")
# The book states many facts as `Label: value` — `Percentage: 60 – 70%`,
# `Diameter: 10 - 12 µm`. These are the most citable lines in it.
LABELLED = re.compile(r"^\s*[-–]?\s*([A-Z][A-Za-z .'\-/&()]{2,40})\s*:\s*(.+)$")
# Page furniture: a bare number, or a number with the book's running head.
FURNITURE = re.compile(r"^\s*\d{1,3}\s*$")


def spans_on(text):
    """Every citable line on a page, with what kind of line it is."""
    out = []
    for raw in text.split("\n"):
        line = re.sub(r"\s{2,}", " ", raw).strip()
        if len(line) < 8 or FURNITURE.match(line):
            continue
        # Drop a line that is mostly figure-label debris rather than prose.
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


def main():
    manifest = json.load(open(MANIFEST, encoding="utf-8"))
    book = next(s for s in manifest["sources"]
                if "Department Book Module 101" in s["fileName"])
    path, pages = book["absolutePath"], book["pageCount"] or 291

    out = []
    for page in range(1, pages + 1):
        text = subprocess.run(
            ["pdftotext", "-layout", "-f", str(page), "-l", str(page), "-q", path, "-"],
            capture_output=True, text=True, timeout=120).stdout
        spans = spans_on(text)
        # The printed page number, which is what a reader turns to. It is not
        # the PDF page: the book's front matter is unnumbered, so the two run
        # about one apart, and a citation that gives the wrong one sends a
        # reviewer to the wrong page to check.
        printed = None
        for line in text.split("\n"):
            stripped = line.strip()
            if FURNITURE.match(stripped):
                printed = int(stripped)
                break
        out.append({"page": page, "printedPage": printed, "spans": spans})

    json.dump({"sourceId": book["sourceId"], "file": book["fileName"],
               "pages": pages, "pageSpans": out},
              open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    total = sum(len(p["spans"]) for p in out)
    print(f"{total} spans across {pages} pages -> {OUT}")


if __name__ == "__main__":
    main()
