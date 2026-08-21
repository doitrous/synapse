#!/usr/bin/env python3
"""Check every exam year against what the paper itself prints.

    python3 scripts/kasr/verify-years.py [--module "101 ISK"]

Four years in this corpus have turned out wrong, and in all four the manifest
had taken them from the filename while the document said otherwise. So the rule
is not "check the years" — it is that **a year sourced from a filename has not
been read**, and anything whose `examSittingYearSource` names the file rather
than the page is unverified until someone opens it.

This opens them. Text layer where there is one, a rendered first page where
there is not, looking for a printed date. It reports three outcomes and does not
change the manifest:

  agrees      the paper prints a date and it matches
  DISAGREES   the paper prints a date and it does not — the paper wins
  silent      the paper prints no date, so the filename is all there is

`silent` is not a failure. It is the honest state of a student-collected copy
with no cover, and saying so is the point: it distinguishes a year nobody can
check from one nobody has checked.
"""
import json
import os
import re
import subprocess
import sys
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")

# `10/12/2022`, `24/12 /2020`, `2025-2026`, and the Arabic academic-year line
# another module found on an inside page: `2025 للعام الجامعي`.
DATES = [
    re.compile(r"\b(\d{1,2})\s*/\s*(\d{1,2})\s*/\s*(20\d{2})\b"),
    re.compile(r"\b(20\d{2})\s*[-–/]\s*(20\d{2})\b"),
    re.compile(r"للعام\s+الجامعي\s*(20\d{2})"),
    re.compile(r"(20\d{2})\s*للعام\s+الجامعي"),
]

# A year on its own is too weak on a page that also carries a batch code, a
# question count and a mark total. Only taken when it sits next to a date word.
NEAR_DATE = re.compile(r"(?:date|تاريخ|academic year|العام الجامعي)\D{0,24}(20\d{2})", re.I)


def years_in(text):
    """Every year the page states as a date, in the order it states them."""
    found = []
    for pattern in DATES:
        for match in pattern.finditer(text):
            for group in match.groups():
                if group and len(group) == 4 and group.startswith("20"):
                    found.append(int(group))
    for match in NEAR_DATE.finditer(text):
        found.append(int(match.group(1)))
    return found


def first_pages(path, pages=2):
    """The paper's own words, from the text layer or from a render."""
    try:
        text = subprocess.run(["pdftotext", "-layout", "-f", "1", "-l", str(pages), "-q", path, "-"],
                              capture_output=True, text=True, timeout=90).stdout
    except Exception:
        text = ""
    if len(text.strip()) >= 60:
        return text, "text layer"

    with tempfile.TemporaryDirectory() as tmp:
        try:
            subprocess.run(["pdftoppm", "-r", "170", "-f", "1", "-l", str(pages), "-png",
                            path, os.path.join(tmp, "pg")], capture_output=True, timeout=240)
            out = []
            for name in sorted(os.listdir(tmp)):
                result = subprocess.run(["tesseract", os.path.join(tmp, name), "stdout",
                                         "-l", "eng+ara", "--psm", "4"],
                                        capture_output=True, text=True, timeout=180)
                out.append(result.stdout)
            return "\n".join(out), "rendered"
        except Exception:
            return "", "unreadable"


def main():
    module = "101 ISK"
    if "--module" in sys.argv:
        module = sys.argv[sys.argv.index("--module") + 1]

    manifest = json.load(open(MANIFEST))
    rows = [s for s in manifest["sources"]
            if s["moduleId"] == module and s.get("examSittingYear")
            and "printed on the paper" not in (s.get("examSittingYearSource") or "")]

    seen = set()
    verdicts = {"agrees": 0, "DISAGREES": 0, "silent": 0, "unreadable": 0}
    print(f"{len(rows)} {module} rows carry a year taken from a filename\n")

    for row in sorted(rows, key=lambda s: s["fileName"]):
        if row["sourceId"] in seen:
            continue
        seen.add(row["sourceId"])
        path = row["absolutePath"]
        if row["fileType"] != "pdf" or not os.path.exists(path):
            continue

        text, how = first_pages(path)
        found = years_in(text)
        claimed = row["examSittingYear"]

        if not text.strip():
            verdict = "unreadable"
        elif not found:
            verdict = "silent"
        elif claimed in found:
            verdict = "agrees"
        else:
            verdict = "DISAGREES"

        verdicts[verdict] += 1
        note = f" prints {sorted(set(found))}" if found else ""
        print(f"  {verdict:<10} manifest {claimed}{note:<22} [{how}] {row['fileName'][:52]}")

    print()
    print(", ".join(f"{count} {name}" for name, count in verdicts.items() if count))
    print("\n`silent` means the paper prints no date at all — the filename is all there is,\n"
          "which is a different fact from a year nobody has checked.")
    return 1 if verdicts["DISAGREES"] else 0


if __name__ == "__main__":
    sys.exit(main())
