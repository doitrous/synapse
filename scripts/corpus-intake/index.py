#!/usr/bin/env python3
"""Render a year's manifest as something a person can read and check.

    python3 scripts/corpus-intake/index.py            # y1, unchanged -> manifest/README.md
    python3 scripts/corpus-intake/index.py --year y2  # -> manifest/README-y2.md
"""
import argparse
import collections
import json
import os

from year_config import REPO, OUTDIR, year_cfg

HERE = os.path.dirname(os.path.abspath(__file__))


def render_y1(cfg):
    d = json.load(open(os.path.join(OUTDIR, cfg["manifestName"])))
    s = d["sources"]
    L = []
    w = L.append

    w("# Kasr Alainy — Year 1 source manifest\n")
    w(f"Generated {d['generatedOn']} from `{d['corpusRoot']}`. "
      f"**{d['count']} files.** Machine-readable copy: [`{cfg['manifestName']}`]({cfg['manifestName']}).\n")
    w("Every file in the corpus has a row. A row is the only place a later stage should\n"
      "learn a file's module, exam type, priority or year — so that two stages cannot\n"
      "quietly disagree about the same paper.\n")

    w("## The owner's declarations\n")
    w("`NOTE … NOTE` text on a folder is an instruction, not a filename. Empty\n"
      "subject folders say the same thing implicitly.\n")
    w("| Module | How it is stated | What it says |")
    w("|---|---|---|")
    for x in d["moduleSubjectDeclarations"]:
        w(f"| `{x['moduleId'] or '—'}` | {x['kind']} | {x['instruction']} |")

    w("\n## By module\n")
    w("| Module | Files | Orientation | EOM | EOY | Baqoon | Dept book | Dept questions | Practical |")
    w("|---|--:|--:|--:|--:|--:|--:|--:|--:|")
    for mod in ["101 ISK", "102 INT", "103 BMS", "104 CPS", "108 INT"]:
        rows = [x for x in s if x["moduleId"] == mod]
        c = collections.Counter(x["sourceCategory"] for x in rows)
        w(f"| `{mod}` | {len(rows)} | {c['Orientation']} | {c['EOM']} | {c['EOY']} | {c['Baqoon']} "
          f"| {c['Department Book']} | {c['Department Questions']} | {c['Practical']} |")

    sec = [x for x in s if x["secondaryModule"]]
    w(f"\nSecondary modules: {len(sec)} files across "
      + ", ".join(f"`{k}` ({v})" for k, v in sorted(collections.Counter(x['secondaryModule'] for x in sec).items()))
      + ".")
    w(f"\nCross-module practical folder: {sum(1 for x in s if x['crossModulePractical'])} files.")

    w("\n## Processing state\n")
    c = collections.Counter(x["processingStatus"] for x in s)
    w(f"- **{c['ocr_required']}** files have no text layer and must be read by OCR or vision. "
      "A scanned paper that extracts to nothing is not an empty paper.")
    w(f"- **{c['pending']}** files have a native text layer.")
    w(f"- **{sum(1 for x in s if x.get('duplicateOf'))}** files share their bytes with another path.")

    w("\n## Excluded\n")
    w("| File | Reason |")
    w("|---|---|")
    for x in s:
        if x["exclusionReason"]:
            w(f"| `{x['fileName']}` | `{x['exclusionReason']}` |")

    w("\n## Which year a paper was sat\n")
    conf = [x for x in s if x["yearConflict"]]
    w(f"{len(conf)} filenames carry both a batch code and a calendar year and disagree. Five of\n"
      "those print an exam date in their own header, and in **all five** the calendar label\n"
      "matches the document while the batch code does not:\n")
    w("| Batch code | Label on the file | What the document itself says |")
    w("|--:|--:|---|")
    w("| 197 | 2024 | 14 July 2024 |")
    w("| 196 | 2021 | 26/12/2021 |")
    w("| 195 | 2022 | 22/09/2022 and 24/9/2022 |")
    w("\nSo **the batch code names the cohort, not a year**, and the calendar label is the\n"
      "sitting. `examSittingYear` carries that decision and `examSittingYearSource` says how it\n"
      "was reached, so a later reader can disagree with the call without re-deriving it. The\n"
      "batch code is kept — which cohort sat a paper is a real question — and is used to derive\n"
      "a year only when nothing better is on the file.\n")

    by_year = collections.Counter(x["examSittingYear"] for x in s if x["examType"])
    w("| Sitting year | Exam papers | How the year was known |")
    w("|--:|--:|---|")
    for year in sorted((y for y in by_year if y), reverse=True):
        srcs = collections.Counter(
            x["examSittingYearSource"] for x in s if x["examType"] and x["examSittingYear"] == year)
        w(f"| {year} | {by_year[year]} | {', '.join(f'{v} {k}' for k, v in srcs.items())} |")
    if by_year.get(None):
        w(f"| — | {by_year[None]} | no year on the file |")

    latest = sorted((y for y in by_year if y), reverse=True)[:3]
    w(f"\n**The latest three years** are {', '.join(str(y) for y in latest)} — "
      f"{sum(by_year[y] for y in latest)} exam papers.")

    out = os.path.join(OUTDIR, cfg["readmeName"])
    open(out, "w").write("\n".join(L) + "\n")
    print("wrote", out)


def render_y2(cfg):
    d = json.load(open(os.path.join(OUTDIR, cfg["manifestName"])))
    s = d["sources"]
    modules = list(cfg["modules"].values())
    L = []
    w = L.append

    yr = cfg["yearId"][-2:]  # "Y2"
    w(f"# Kasr Alainy — Year {cfg['yearNum']} source manifest\n")
    w(f"Generated {d['generatedOn']} from `{d['corpusRoot']}`. "
      f"**{d['count']} files.** Machine-readable copy: [`{cfg['manifestName']}`]({cfg['manifestName']}).\n")
    w("Every file has a row: module, subject (folder vs. filename, and which won), instructor,\n"
      "priority, exam-type evidence and year signals — see\n"
      f"`docs/Kasr-Source-Imports/manifest/{cfg['manifestName']}`. The corpus arrived already\n"
      "organised by the owner (see the corpus's own README.md and `_Catalog/`); this manifest\n"
      "records what that organisation says and where a filename overrides it, rather than\n"
      "re-deriving placement from content the way Year 1 had to.\n")

    CATS = ["Orientation", "EOM", "EOY", "EOM & EOY", "Baqoon", "Department Book",
            "Department Questions", "Instructor material", "Important & Summaries",
            "Exam-section revision material"]

    w("## By module\n")
    header = "| Module | Files | " + " | ".join(CATS) + " | Excluded |"
    w(header)
    w("|" + "---|" * (len(CATS) + 3))
    for mod in modules:
        rows = [x for x in s if x["moduleId"] == mod]
        c = collections.Counter(x["sourceCategory"] for x in rows)
        excl = sum(1 for x in rows if x["exclusionReason"])
        w(f"| `{mod}` | {len(rows)} | " + " | ".join(str(c[cat]) for cat in CATS) + f" | {excl} |")

    sec = [x for x in s if x["secondaryModule"]]
    w(f"\nSecondary modules: {len(sec)} files across "
      + ", ".join(f"`{k}` ({v})" for k, v in sorted(collections.Counter(x['secondaryModule'] for x in sec).items()))
      + ".")
    prac = [x for x in s if x["crossModulePractical"]]
    w(f"\nCross-module practical folder (`{cfg['practicalFolder']}`): {len(prac)} files.")
    cat = [x for x in s if x["exclusionReason"] and x["sourceCategory"] == "Catalogue (not a source)"]
    w(f"\nCatalogue rows (`{cfg.get('catalogFolder')}` — the owner's own extraction notes, not corpus sources): {len(cat)}.")

    w("\n## Processing state\n")
    c = collections.Counter(x["processingStatus"] for x in s)
    w(f"- **{c['ocr_required']}** files have no usable text layer (below the character-count "
      "floor, or the word-forming-ratio guard) and were read by OCR.")
    w(f"- **{c['pending']}** files have a usable native text layer.")
    w(f"- **{sum(1 for x in s if x.get('duplicateOf'))}** files share their bytes with another path "
      f"(190 of these are the archived `Exact Duplicates`).")
    w(f"- **{sum((x['pageCount'] or 0) for x in s if not x['exclusionReason'])}** total pages across "
      "non-excluded sources.")

    w("\n## Excluded\n")
    w("| Reason | Files |")
    w("|---|--:|")
    reasons = collections.Counter(x["exclusionReason"] for x in s if x["exclusionReason"])
    for reason, n in sorted(reasons.items()):
        w(f"| `{reason}` | {n} |")

    w("\n## Department-authored vs. instructor material\n")
    dept_folder_rows = [x for x in s if x.get("folderPriorityLabel") and x.get("departmentAuthored") is not None]
    not_dept = [x for x in dept_folder_rows if x.get("tierEvidence", "").startswith("sits in a department priority folder, but")]
    w(f"{len(not_dept)} files sit inside a `Dpt` priority folder but were **not** counted as "
      "department-authored, because their filename names a doctor, team, textbook or commercial "
      "product — a doctor's bank inside a Dpt folder is still a doctor's bank. Full list in the "
      "engineering report.\n")

    w("## Which year a paper was sat\n")
    w("The academic year straddles the calendar year (EOM in December, EOY in June/July, a resit\n"
      "in September), so a batch code only implies a single calendar year for the sittings anchored\n"
      "to the *end* of the academic year — EOY, Baqoon and combined EOM & EOY compilations. An EOM\n"
      "paper with no calendar label printed on it is left with `examSittingYear: null` rather than\n"
      "guessed, because its academic year began the previous December. A calendar label actually\n"
      f"printed on the file always wins, for any exam type. The batch-to-year formula for Year "
      f"{cfg['yearNum']} is `batch + 1826 + {cfg['yearNum']}` — see `year_config.batch_year`'s "
      "docstring for the filename evidence this was read off.\n")
    w("**Note for the Year 1 lanes:** the same evidence puts Year 1's own hardcoded `BATCH_YEAR` "
      "table one year early for every entry versus this formula (`batch + 1826 + 1`). Year 1's "
      "committed manifest is untouched by this — that table is not read by anything this deliverable "
      "changes — but the Year 1 audit lane may want to replace it with the validated formula.\n")

    conf = [x for x in s if x["yearConflict"]]
    w(f"{len(conf)} filenames carry both a batch code and a calendar year and disagree.\n")

    by_year = collections.Counter(x["examSittingYear"] for x in s if x["examType"] and x["examSittingYear"])
    w("| Sitting year | Exam papers | How the year was known |")
    w("|--:|--:|---|")
    for year in sorted(by_year, reverse=True):
        srcs = collections.Counter(
            x["examSittingYearSource"] for x in s if x["examType"] and x["examSittingYear"] == year)
        w(f"| {year} | {by_year[year]} | {', '.join(f'{v} {k}' for k, v in srcs.items())} |")
    no_year = sum(1 for x in s if x["examType"] and not x["examSittingYear"])
    if no_year:
        w(f"| — | {no_year} | no calendar label, and either no batch code or an EOM paper withheld "
          "by the straddle rule above |")

    # Text-only sources — six Telegram posts with no downloadable file.
    text_only_path = os.path.join(cfg["corpusRoot"], "_Catalog", "Past Exams and Text-Only Questions.md")
    if os.path.exists(text_only_path):
        w("\n## Text-only sources\n")
        w("`_Catalog/Past Exams and Text-Only Questions.md` holds Telegram posts with no attached\n"
          "file — the content is the message text itself. No file is manufactured for these; they\n"
          "are named here so a reader looking for (say) the histology slide scheme for 207 knows it\n"
          "exists and where the words live.\n")
        heading, source_url = None, None
        for line in open(text_only_path, encoding="utf-8"):
            line = line.rstrip("\n")
            if line.startswith("## "):
                heading = line[3:].strip()
            elif line.startswith("Source:") and heading:
                source_url = line[len("Source:"):].strip()
                w(f"- **{heading}** — {source_url}")
                heading = None

    out = os.path.join(OUTDIR, cfg["readmeName"])
    open(out, "w").write("\n".join(L) + "\n")
    print("wrote", out)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--year", default="y1", help="y1 (default) | y2 | y3 | y4 | y5")
    ap.add_argument("--university", default="kau", help="kau (default)")
    args = ap.parse_args()
    cfg = year_cfg(args.year, args.university)
    if cfg["grammar"] == "y1-legacy":
        render_y1(cfg)
    else:
        render_y2(cfg)


if __name__ == "__main__":
    main()
