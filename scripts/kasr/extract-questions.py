#!/usr/bin/env python3
"""Pull every question off every 101 ISK exam paper.

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

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CORPUS = "/Users/doitrous/Desktop/Kasr Alainy"
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "questions.json")

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


def main():
    manifest = json.load(open(MANIFEST))
    papers = [x for x in manifest["sources"]
              if x["moduleId"] == "101 ISK" and x["sourceCategory"] in WANTED]
    papers.sort(key=lambda x: (x["sourceTier"], -(x["examSittingYear"] or 0)))

    all_rows = []
    report = []
    for paper in papers:
        path = paper["absolutePath"]
        if not os.path.exists(path) or paper["fileType"] != "pdf":
            report.append((paper["fileName"], "skipped", paper["fileType"], 0))
            continue

        pages = paper["pageCount"] or 0
        text = native(path)
        how = "native"
        if len(text.strip()) < 200:
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
    main()
