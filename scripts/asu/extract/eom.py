#!/usr/bin/env python3
"""Read the six end-of-module papers properly.

These are the highest-priority multiple-choice source in the corpus — sat
papers, which outrank the question books — and they were never in the bank at
all. The first pass rendered them at 150 dpi and recovered 359 questions of a
stated 120 per paper. At 300 dpi with `--psm 6` the same pages give clean
stems, lettered options and, on the cover, the paper's own account of itself:
how many questions it has, how many marks, and the date it was sat.

That cover matters twice over. `EOM ISK 101 - 2023.pdf` states `Date:
10/12/2022`, so the year in its filename is not the year it was sat, and a
blueprint built on the filename would date a whole sitting wrong.

Writes eom.json: the cover facts per paper, every question with its options,
and — deliberately — a count of how many of the paper's stated total we
actually recovered. A paper that says it has 120 questions and yields 96 is not
a 96-question paper.
"""
import json
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import asu_module  # noqa: E402

MODULE, _ARGV = asu_module.parse_module(sys.argv[1:])
OUT = asu_module.out_path(MODULE, "eom.json")
CACHE = asu_module.out_path(MODULE, "pagetext-eom")

# `1- stem`, `12. stem`, `3) stem`. The papers number every question this way.
QUESTION = re.compile(r"^\s*[|\[]?\s*(\d{1,3})\s*[-.)]\s*(.{6,})$")
# `a. option`, `b) option`, and the OCR's habit of reading `a.` as `a,`.
OPTION = re.compile(r"^\s*[|\[]?\s*([a-eA-E])\s*[.,)]\s*(.{2,})$")
# Every option marker anywhere in a line. These papers set four options across
# one printed line — `a. Plasma cell. b. Macrophages c. Mast cell. d. Pericyte.`
# — so matching only at the start of a line captured option (a) and swallowed
# the other three into its text. Four hundred and ninety-five of five hundred
# and eighty-seven rows came out with fewer than four options that way.
MARKER = re.compile(r"(?:^|\s)([a-eA-E])\s*[.,)]\s+")


def tidy(text):
    """Strip the marks a scanner leaves behind, and nothing else.

    Handwriting crosses these papers — students ring their answers — and the
    stray strokes come through as runs of punctuation at the ends of lines.
    Only leading and trailing noise is removed. Nothing inside the text is
    touched: `metachromati¢ally` stays misread rather than being guessed at,
    because a transcription that quietly corrects itself cannot be checked.
    """
    text = re.sub(r"^[\s|_\-—=~.,'`\"\\/\[\]{}()*#]+", "", text)
    text = re.sub(r"[\s|_\-—=~'`\"\\/\[\]{}*#]+$", "", text)
    return re.sub(r"\s{2,}", " ", text).strip()


def split_options(line):
    """The lettered options on one line, in the order the paper prints them."""
    found = []
    for match in MARKER.finditer(line):
        letter = match.group(1).lower()
        # Ascending only. A stray `d.` inside an option's own text would
        # otherwise open a fifth option and truncate the fourth.
        if found and letter <= found[-1][0]:
            continue
        found.append((letter, match.end()))
    out = {}
    for index, (letter, start) in enumerate(found):
        stop = found[index + 1][1] if index + 1 < len(found) else len(line)
        text = line[start:stop]
        # Trim the next marker's own letter and punctuation off the tail.
        text = re.sub(r"(?:^|\s)[a-eA-E]\s*[.,)]\s*$", "", text)
        text = tidy(text)
        if text:
            out[letter] = text
    return out
# The cover's own statement of what the paper is.
COVER = {
    "questionCount": re.compile(r"consists\s+of\s+(\d{2,3})\s+MCQ", re.I),
    "totalMarks": re.compile(r"Total\s+Marks?\s*:?\s*(\d{1,3})", re.I),
    "pageCount": re.compile(r"Number\s+of\s+pages\s*:?\s*(\d{1,3})", re.I),
    "satOn": re.compile(r"Date\s*:?\s*(\d{1,2}\s*/\s*\d{1,2}\s*/\s*\d{2,4})", re.I),
    "timeAllowed": re.compile(r"Time\s+allowed\s*:?\s*(\d{1,3})\s*min", re.I),
}
# The four sittings these six files are.
#
# Read off each cover, because the filenames disagree with the papers. Three of
# the six are misdated by their own name:
#
#   `EOM ISK 101 - 2023.pdf`               states Date: 10/12/2022
#   `EOM first 2021 101 INT end of module` states Date: 24/12/2020
#   `EOM ISK 101 195 Answers.pdf`          states Date: 18/12/2021
#
# and the corpus holds no end-of-module paper for 2023 at all. A blueprint built
# on filenames would date three sittings wrong and invent a fourth.
#
# Two pairs are one paper scanned twice. The 2021 pair shares 116 of 118 stems;
# the 2022 pair shares fewer, but both covers read `Date: 10/12/2022` and both
# state 120 questions, so the difference is OCR variance between two scans of
# one paper rather than two papers. Counting them separately would double the
# blueprint weight of every question on those two sittings.
# >>> FILL IN PER MODULE, once a module's end-of-module papers' covers have
# been read by eye — see the discussion above for why the filename cannot be
# trusted for the date. Kasr's four entries name specific Kasr files by exact
# filename and mean nothing for this corpus. `SITTINGS` starts empty, so a
# module with no entry here reports 0 sittings and 0 stated questions
# honestly, rather than the garbage a filter-by-filename produces against a
# table for a different corpus (measured: a first draft that kept Kasr's
# table reported "4 sittings, 360 stated" for a module with zero matching
# files, because the SITTINGS loop below is not filtered by module at all —
# only the file-matching inside it is, and against Kasr's filenames every
# other module's file list matches nothing while the sitting entries
# themselves still print).
SITTINGS: dict[str, dict] = {}

# A line that is only marks, marginalia or an Arabic header is not content.
NOISE = re.compile(r"^[\s|_\-—=~.,'`\"\\/\[\]{}()*#]+$")


def pages(path, count):
    """Render at 300 dpi and read each page, caching so a re-parse is free."""
    slug = re.sub(r"[^a-z0-9]+", "-", os.path.basename(path).lower()).strip("-")
    out = []
    for page in range(1, count + 1):
        cached = os.path.join(CACHE, f"{slug}-{page:03d}.txt")
        if os.path.exists(cached):
            out.append(open(cached, encoding="utf-8").read())
            continue
        with tempfile.TemporaryDirectory() as td:
            stem = os.path.join(td, "pg")
            subprocess.run(["pdftoppm", "-r", "300", "-f", str(page), "-l", str(page),
                            "-png", path, stem], capture_output=True, timeout=600)
            png = next((os.path.join(td, n) for n in sorted(os.listdir(td))
                        if n.endswith(".png")), None)
            if not png:
                out.append("")
                continue
            # `--psm 6` — one uniform block. These papers are a single column of
            # numbered questions, and the layout-detecting modes break the
            # option lines away from their stems.
            text = subprocess.run(["tesseract", png, "stdout", "-l", "eng", "--psm", "6"],
                                  capture_output=True, text=True, timeout=600).stdout
        os.makedirs(CACHE, exist_ok=True)
        open(cached, "w", encoding="utf-8").write(text)
        out.append(text)
        print(f"    page {page}/{count}", file=sys.stderr, flush=True)
    return out


def parse(page_texts, source):
    """Numbered stems with their lettered options beneath."""
    cover, rows, current = {}, [], None

    for page_no, text in enumerate(page_texts, start=1):
        for raw in text.split("\n"):
            line = raw.strip().strip("|").strip()
            if not line or NOISE.match(line):
                continue

            if page_no == 1:
                for field, pattern in COVER.items():
                    if field not in cover:
                        found = pattern.search(line)
                        if found:
                            cover[field] = found.group(1).replace(" ", "")

            option = OPTION.match(line)
            if option and current:
                # The whole line, not just the first marker: they share a line.
                for letter, text in split_options(line).items():
                    current["options"].setdefault(letter, text)
                continue

            question = QUESTION.match(line)
            if question:
                # An option line can look like a question when OCR reads `a.` as
                # `4.`; a number that jumps backwards is the giveaway.
                number = int(question.group(1))
                if current and number <= current["number"] and number < 6:
                    continue
                if current:
                    rows.append(current)
                current = {
                    "sourceId": source["sourceId"], "file": source["fileName"],
                    "page": page_no, "number": number,
                    "stem": question.group(2).strip(), "options": {},
                }
                continue

            # A continuation of the stem, before any option has been seen.
            if current and not current["options"] and len(current["stem"]) < 300:
                current["stem"] += " " + line

    if current:
        rows.append(current)

    for row in rows:
        row["stem"] = tidy(row["stem"])
        filled = {k: v for k, v in row["options"].items() if len(v.strip()) > 1}
        row["options"] = filled
        # An honest confidence, from what the row actually has rather than from
        # how hard it was to read.
        row["confidence"] = ("high" if len(filled) >= 4
                             else "medium" if len(filled) >= 2 else "low")
    return cover, rows


def merge_scans(rows):
    """One row per question on the paper, from however many scans there are.

    Two scans of one paper give two readings of each question, and neither is
    reliably the better one — a stem the first scan mangled the second often
    has clean, and the other way round. So they are merged by the paper's own
    question number: the reading with the most complete option set wins, and
    the loser is kept as a `variant` rather than discarded.

    Keeping it matters. The winner is chosen on option count, which is a proxy
    for legibility and not for correctness, and an author reading a doubtful
    stem needs the second reading to compare against. Discarding it would leave
    them with one bad transcription and no way of knowing it was bad.
    """
    by_number = {}
    for row in rows:
        by_number.setdefault(row["number"], []).append(row)

    merged = []
    for number in sorted(by_number):
        readings = sorted(by_number[number],
                          key=lambda r: (len(r["options"]), len(r["stem"])), reverse=True)
        best, rest = readings[0], readings[1:]
        # Options the winner missed and a loser caught. Same question, same
        # paper, so a letter absent from one scan and present in another is a
        # scanning failure, not a difference between the papers.
        for other in rest:
            for letter, text in other["options"].items():
                best["options"].setdefault(letter, text)
        best["scans"] = len(readings)
        # Where the option letters were written over.
        #
        # The 5/12/2024 paper is a sat script a student answered by ringing
        # their choice, and the rings land on the option letters. OCR reads
        # `a. Toluidine blue` as `PE Toluidine blue`, so the markers this
        # parser needs are the very characters the pen destroyed — every one of
        # that paper's 77 recovered questions comes back with no options at all,
        # while its stems are clean.
        #
        # Flagged rather than silently left empty: the option text IS in the
        # stem, in the paper's own order, and an author reading it can separate
        # the four. A row that merely looks empty would be read as a question
        # with no options, which is not what this is.
        if not best["options"]:
            best["optionsInStem"] = True
        best["variants"] = [{"file": o["file"], "stem": o["stem"], "options": o["options"]}
                            for o in rest if o["stem"] != best["stem"]]
        merged.append(best)
    return merged


def main():
    papers = [s for s in asu_module.manifest_sources()
              if s["moduleId"] == MODULE and s["sourceCategory"] == "EOM"]
    papers.sort(key=lambda s: s["fileName"])

    files, everything = [], []
    for paper in papers:
        path = paper["absolutePath"]
        if not os.path.exists(path):
            files.append({"file": paper["fileName"], "sourceId": paper["sourceId"],
                          "error": "not found at its manifest path"})
            continue
        print(f"  {paper['fileName']}", file=sys.stderr, flush=True)
        cover, rows = parse(pages(path, paper["pageCount"] or 11), paper)
        everything.extend(rows)

        stated = int(cover.get("questionCount", 0) or 0)
        files.append({
            "file": paper["fileName"], "sourceId": paper["sourceId"],
            "pages": paper["pageCount"], "cover": cover,
            "recovered": len(rows), "statedQuestions": stated or None,
            # The gap between what the paper says it holds and what we read off
            # it. Reporting only the recovered count would make a half-read
            # paper indistinguishable from a complete one.
            "missing": (stated - len(rows)) if stated else None,
            "withFourOptions": sum(1 for r in rows if len(r["options"]) >= 4),
        })
        print(f"    {len(rows)} recovered of {stated or '?'} stated",
              file=sys.stderr, flush=True)

    # Group the files into the sittings they are, so a reader sees four papers
    # rather than six, and sees which two names are the same exam.
    sittings, questions = [], []
    for date, sitting in sorted(SITTINGS.items()):
        rows = merge_scans([q for q in everything if q["file"] in sitting["files"]])
        for row in rows:
            row["satOn"] = date
        questions.extend(rows)
        stated = sitting["statedQuestions"]
        sittings.append({
            "satOn": date, **sitting,
            "recovered": len(rows),
            "missing": (stated - len(rows)) if stated else None,
            "scannedTwice": len(sitting["files"]) > 1,
            "withFourOptions": sum(1 for r in rows if len(r["options"]) >= 4),
        })

    json.dump({"sittings": sittings, "files": files, "questions": questions},
              open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    total = len(questions)
    stated = sum(s["statedQuestions"] or 0 for s in sittings)
    print(f"\n{total} questions across {len(sittings)} sittings "
          f"({len(files)} files, {stated} stated) -> {OUT}")


if __name__ == "__main__":
    main()
