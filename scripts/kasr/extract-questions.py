#!/usr/bin/env python3
"""Pull every question off a Kasr Al Ainy module's exam papers.

    python3 scripts/kasr/extract-questions.py [--module "104 CPS"]

Defaults to 101 ISK, whose questions.json is committed at the unprefixed path;
any other module writes into extract/<module-slug>/.

Text layer where there is one, OCR where there is not. A scanned paper that
extracts to nothing is not a paper without questions, and treating it as one is
how a module ends up with four years of exams missing and nothing saying so.

Writes questions.json: one row per question, with the file, page and marks, so
a concept minted from it can point back at where it came from.
"""
import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "extract"))
from kasr_module import module_sources, out_path, parse_module  # noqa: E402

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")

# Set in main(). `101 ISK` keeps the unprefixed questions.json it has committed.
MODULE = "101 ISK"
OUT = out_path(MODULE, "questions.json")

# The page text every other extractor already produced. Re-OCRing a paper this
# cache already holds is not a second opinion, it is a second bill — and, for a
# scanned paper, a worse one, because the shared pass reads every page while the
# fallback here stops at forty.
PAGETEXT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "extract", "pagetext")

WANTED = {"EOY", "EOM", "Baqoon", "Written Questions"}

# `1)`, `1-`, `Q1.`, `Question 1` — the ways these papers number a question.
NUMBERED = re.compile(r"^\s*(?:Q(?:uestion)?\s*)?(\d{1,2})\s*[).\-–]\s*(.+)$", re.I)
MARKS = re.compile(r"[\[({]\s*(\d+(?:\.\d+)?)\s*(?:marks?|degree)s?\s*[\])}]", re.I)
SECTION = re.compile(r"\[?\s*Section\s*\d?\s*[:\-]?\s*(Histology|Anatomy|Embryology|Basis)\s*\]?", re.I)
# A line that is only dots is an answer rule, not content.
RULE = re.compile(r"^[\s…\.·_]+$")


def native(path, pages=None):
    cmd = ["pdftotext", "-layout"]
    if pages:
        cmd += ["-f", str(pages[0]), "-l", str(pages[1])]
    cmd += ["-q", path, "-"]
    try:
        return subprocess.run(cmd, capture_output=True, text=True, timeout=300).stdout
    except Exception:
        return ""


def ocr(path, last):
    """Render and read. Capped, because a 89-page compilation is not worth an hour."""
    out = []
    with tempfile.TemporaryDirectory() as td:
        try:
            subprocess.run(["pdftoppm", "-r", "150", "-f", "1", "-l", str(last),
                            "-png", path, os.path.join(td, "pg")],
                           capture_output=True, timeout=1800)
        except Exception:
            return ""
        for png in sorted(os.listdir(td)):
            if not png.endswith(".png"):
                continue
            try:
                r = subprocess.run(["tesseract", os.path.join(td, png), "stdout",
                                    "-l", "eng+ara", "--psm", "6"],
                                   capture_output=True, text=True, timeout=300)
                out.append(f"\n<<<PAGE {png}>>>\n" + r.stdout)
            except Exception:
                pass
    return "\n".join(out)


def questions_from(text, source):
    """Numbered questions, with their wrapped continuation lines joined back on."""
    rows = []
    section = None
    page = 1
    current = None

    for raw in text.split("\n"):
        line = unicodedata.normalize("NFKC", raw).strip()
        if not line:
            continue
        if line.startswith("<<<PAGE"):
            m = re.search(r"pg-?(\d+)", line)
            if m:
                page = int(m.group(1))
            continue
        if RULE.match(line):
            continue
        if re.fullmatch(r"\d{1,3}", line):     # a bare page number
            page = int(line) if int(line) < 400 else page
            continue

        sec = SECTION.search(line)
        if sec:
            section = sec.group(1).title()
            continue

        m = NUMBERED.match(line)
        if m and len(m.group(2)) > 12:
            if current:
                rows.append(current)
            current = {
                "sourceId": source["sourceId"], "file": source["fileName"],
                "category": source["sourceCategory"], "year": source["examSittingYear"],
                "section": section, "page": page,
                "number": int(m.group(1)), "text": m.group(2).strip(), "marks": None,
            }
            continue

        if current and len(current["text"]) < 400:
            current["text"] += " " + line

    if current:
        rows.append(current)

    for row in rows:
        row["text"] = re.sub(r"\s{2,}", " ", row["text"]).strip()
        mk = MARKS.search(row["text"])
        if mk:
            row["marks"] = float(mk.group(1))
    return rows


def cached_text(source):
    """Page text from the shared cache, in either schema, or None."""
    path = os.path.join(PAGETEXT, source["sourceId"] + ".json")
    if not os.path.exists(path):
        return None
    doc = json.load(open(path, encoding="utf-8"))
    pages = doc.get("pages")
    if not pages:
        return None
    # `mode` is pagetext.py's; `method` is mcq.py's. Both hold a page list.
    how = doc.get("mode") or doc.get("method") or "cached"
    return "\f".join(pages), ("cached-" + how)


def main(argv):
    global MODULE, OUT
    MODULE, _rest = parse_module(argv)
    OUT = out_path(MODULE, "questions.json")

    # One row per file, not per manifest row: fourteen source IDs in this corpus
    # are indexed twice, and a paper counted twice is a paper whose questions are
    # all duplicated.
    seen, papers = set(), []
    for source in module_sources(MODULE):
        if source["sourceCategory"] not in WANTED or source["sourceId"] in seen:
            continue
        seen.add(source["sourceId"])
        papers.append(source)
    papers.sort(key=lambda x: (x["sourceTier"], -(x["examSittingYear"] or 0)))

    all_rows = []
    report = []
    for paper in papers:
        path = paper["absolutePath"]
        if not os.path.exists(path) or paper["fileType"] != "pdf":
            report.append((paper["fileName"], "skipped", paper["fileType"], 0))
            continue

        pages = paper["pageCount"] or 0
        cached = cached_text(paper)
        if cached:
            text, how = cached
        else:
            text = native(path)
            how = "native"
        if not cached and len(text.strip()) < 200:
            # Cap the OCR: a 89-page compilation of many papers is worth its
            # first 40 pages now and a second pass later, not an hour today.
            text = ocr(path, min(pages, 40))
            how = f"ocr({min(pages, 40)}p)"

        rows = questions_from(text, paper)
        all_rows.extend(rows)
        report.append((paper["fileName"], how, pages, len(rows)))
        print(f"  {len(rows):>3} questions  {how:<10} {paper['fileName'][:56]}",
              file=sys.stderr, flush=True)

    json.dump({"count": len(all_rows), "questions": all_rows}, open(OUT, "w"),
              indent=1, ensure_ascii=False)
    print(f"\n{len(all_rows)} questions from {len(papers)} papers -> {OUT}")


if __name__ == "__main__":
    main(sys.argv[1:])
