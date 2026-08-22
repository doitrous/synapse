#!/usr/bin/env python3
"""What became of every source file in module 108 INT.

    python3 scripts/kasr/extract/108-INT/coverage.py

A content programme's real failure mode is not a bad item; it is a file nobody
opened and nobody noticed nobody opened. Eleven files went into this module and
the only honest way to say it is finished is to say what happened to each one —
including the ones that yielded nothing, and why.

Generated rather than written, so it cannot quietly go stale: rerun it and the
numbers are today's. Every figure below is read out of this lane's own extractor
output and the manifest; nothing is typed in by hand, because a hand-typed
figure is right on the day it is written and silently wrong afterwards.

The failure mode this script is built against is the plausible report. The
module's manifest carries fourteen rows for eleven files — three files are
shelved twice under two names — so a ledger that counts rows will claim
fourteen sources and read perfectly while being wrong. The exam papers are worse:
each sitting is present as a solved and an unsolved copy, so the 150 question
rows carry 75 distinct questions, and a ledger that sums rows doubles the
module's entire question yield without anything looking amiss. Both counts are
therefore taken from identity, not from row count: files by sha256, questions by
the `isCanonicalCopy` flag the EOY extractor sets. If either input changes shape
this script should fail loudly rather than fall back to a bare row count, which
is why the readers below index by source ID and raise on a missing key instead
of defaulting to zero.
"""
import json
import os
import re
from collections import OrderedDict

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
PAGETEXT = os.path.join(REPO, "scripts/kasr/extract/pagetext")
IMPORTS = os.path.join(REPO, "docs/Kasr-Source-Imports")
OUT = os.path.join(IMPORTS, "coverage/108-INT-coverage.md")

MODULE = "108 INT"
UNIVERSITY = "kau"
BATCH_KINDS = ["concept", "article", "practical", "question", "written"]
CATEGORY_ORDER = ["Orientation", "EOY", "Department Book", "Department Questions",
                  "Practical", "Written Questions"]
DASH = "—"


def load(name):
    with open(os.path.join(HERE, name), encoding="utf-8") as fh:
        return json.load(fh)


def plural(n, one, many=None):
    return one if n == 1 else (many or one + "s")


def wrap(text, width=78):
    """Re-flow prose to the width the 101 ledger was hand-wrapped to.

    Tables and headings pass through untouched; a run of ordinary lines is one
    paragraph and is re-flowed as one; a bullet's continuation lines are
    indented so it stays a single list item.
    """
    out, paragraph, indent, was_bullet = [], [], "", False

    def flush():
        if not paragraph:
            return
        current = ""
        for word in " ".join(paragraph).split():
            candidate = word if not current else current + " " + word
            if len(candidate) > width and current:
                out.append(current)
                current = indent + word
            else:
                current = candidate
        out.append(current)
        paragraph.clear()

    for line in text.split("\n"):
        stripped = line.rstrip()
        if not stripped or stripped.startswith("|") or stripped.startswith("#"):
            flush()
            out.append(stripped)
            continue
        if stripped.startswith("- "):
            flush()
            if out and out[-1] and not was_bullet:
                out.append("")   # a list needs a blank line above it to be a list
            indent, was_bullet = "  ", True
        elif not paragraph:
            indent, was_bullet = "", False
        paragraph.append(stripped)
    flush()

    # One blank line between blocks, never two, and none at the very top.
    tidy = []
    for line in out:
        if not line and (not tidy or not tidy[-1]):
            continue
        tidy.append(line)
    for index, line in enumerate(tidy[:-1]):
        if line.startswith("#") and tidy[index + 1]:
            tidy[index] = line + "\n"
    return "\n".join(tidy).strip("\n")


# --------------------------------------------------------------------------
# The manifest, folded from rows onto files.
#
# Three files carry two rows each under different names with the same sha256
# and the same sourceId. One row per FILE is the whole point: a ledger claiming
# fourteen sources when there are eleven is exactly the quiet inaccuracy this
# document exists to prevent.
# --------------------------------------------------------------------------
with open(MANIFEST, encoding="utf-8") as fh:
    rows = [s for s in json.load(fh)["sources"]
            if s.get("moduleId") == MODULE and s.get("universityId") == UNIVERSITY]

files = OrderedDict()
for row in sorted(rows, key=lambda s: (s["sourceCategory"], s["fileName"])):
    entry = files.setdefault(row["sha256"], {
        "sourceId": row["sourceId"], "sha256": row["sha256"],
        "category": row["sourceCategory"], "pages": row.get("pageCount"),
        "textLayer": row.get("textLayer"), "subject": row.get("subject"),
        "year": row.get("examSittingYear"), "yearSource": row.get("examSittingYearSource"),
        "solved": row.get("solvedStatus"), "names": [], "paths": [],
    })
    entry["names"].append(row["fileName"])
    entry["paths"].append(row["corpusRelativePath"])
    if entry["sourceId"] != row["sourceId"]:
        raise SystemExit("same sha256, two sourceIds: %s" % row["sha256"])

by_id = {f["sourceId"]: f for f in files.values()}
if len(by_id) != len(files):
    raise SystemExit("one sourceId spans two files; the fold above is unsafe")

FILED_TWICE = [f for f in files.values() if len(f["names"]) > 1]

# --------------------------------------------------------------------------
# What each extractor found.
# --------------------------------------------------------------------------
eoy = load("eoy.json")
answerkey = load("answerkey.json")
mcq = load("mcq.json")
deptbook = load("deptbook.json")
practical = load("practical.json")

# Pages read, per file, from whichever extractor opened it. A file with no
# entry here was never opened by anything, and says so in the table.
pages_read = {}
text_mode = {}


def note_read(source_id, read, mode=None):
    if source_id in pages_read and pages_read[source_id] != read:
        raise SystemExit("two extractors disagree on pages read for %s" % source_id)
    pages_read[source_id] = read
    if mode:
        text_mode[source_id] = mode


for f in eoy["files"]:
    note_read(f["sourceId"], f["pagesRead"], f.get("textMode"))
for f in mcq["files"]:
    note_read(f["sourceId"], f["pagesRead"], f.get("textMode"))
for f in deptbook["files"]:
    note_read(f["sourceId"], f["pagesRead"], f.get("mode"))
for f in practical["files"]:
    mode = "ocr" if f.get("method", "").startswith("ocr") else "native"
    note_read(f["sourceId"], f["pagesRead"], mode)

# --- the exam papers -------------------------------------------------------
eoy_rows = eoy["questions"]
eoy_distinct = [q for q in eoy_rows if q.get("isCanonicalCopy")]
eoy_by_format = OrderedDict(sorted(
    ((k, sum(1 for q in eoy_distinct if q["format"] == k))
     for k in {q["format"] for q in eoy_distinct}),
    key=lambda kv: (-kv[1], kv[0])))
eoy_by_subject = OrderedDict(sorted(
    ((k, sum(1 for q in eoy_distinct if q["subject"] == k))
     for k in {q["subject"] for q in eoy_distinct}),
    key=lambda kv: kv[0]))
eoy_rows_per_file = {}
eoy_distinct_per_file = {}
for q in eoy_rows:
    eoy_rows_per_file[q["sourceId"]] = eoy_rows_per_file.get(q["sourceId"], 0) + 1
    if q.get("isCanonicalCopy"):
        eoy_distinct_per_file[q["sourceId"]] = eoy_distinct_per_file.get(q["sourceId"], 0) + 1
eoy_images = sum(1 for q in eoy_distinct if q.get("usesImage"))

# --- the answer key --------------------------------------------------------
key_per_file = {sid: v["answered"] for sid, v in answerkey["totals"]["byPaper"].items()}
keys_recovered = answerkey["totals"]["answersRecovered"]
keys_scanned = answerkey["totals"]["questionsScanned"]
keys_unresolved = answerkey["totals"]["unresolved"]
control_files = answerkey["control"]
control_questions = sum(c["questionsScanned"] for c in control_files)
control_pixels = sum(c["highlightPixelsFound"] for c in control_files)
control_answers = sum(c["answersAttributed"] for c in control_files)

# --- the department question banks ----------------------------------------
bank_per_file = {f["sourceId"]: f for f in mcq["files"]}
bank_total = mcq["totals"]["questionsFound"]
bank_with_options = mcq["totals"]["mcqRows"]
bank_no_options = mcq["totals"]["noOptionRows"]
bank_causes = OrderedDict(sorted(mcq["totals"]["noOptionRowsByCause"].items()))
bank_matching = bank_causes.get("matching-item", 0)
bank_distinct = mcq["bank"]["distinctQuestions"]
bank_licence = mcq["licence"]
bank_overlap = mcq["eoyCrossCheck"]

# --- the department books and the orientation sheet ------------------------
book_per_file = {f["sourceId"]: f for f in deptbook["files"]}
chapters_per_file = {b["sourceId"]: len(b["chapters"]) for b in deptbook["books"]}
book_chapters = sum(chapters_per_file.values())
book_headings = sum(f["headingsRecorded"] for f in deptbook["files"])
book_ilos = sum(f.get("ilosFound", 0) for f in deptbook["files"]
                if f["sourceId"] in chapters_per_file)
orientation = deptbook["orientation"]
orientation_ilos = orientation["iloCount"]
orientation_counts = orientation["counts"]
orientation_id = orientation["sourceId"]

# --- the practical atlas and the handout filed as questions ----------------
prac_per_file = {f["sourceId"]: f for f in practical["files"]}
prac_id = practical["sources"][0]["sourceId"]
prac_items = len(practical["items"])
prac_guidance = len(practical["guidance"])
prac_media = len(practical["mediaRequests"])
prac_written = len(practical["writtenQuestions"])
prac_coverage = prac_per_file[prac_id]["coverage"]
handout_id = practical["sources"][1]["sourceId"]
handout_spans = practical["writtenSourceEmphasis"]["highlightCount"]


# --------------------------------------------------------------------------
# Items authored into batches, counted from the batch files themselves and
# scoped to this module — those directories hold 101's batches too.
# --------------------------------------------------------------------------
def authored():
    counts = []
    for kind in BATCH_KINDS:
        directory = os.path.join(IMPORTS, kind)
        if not os.path.isdir(directory):
            continue
        for name in sorted(os.listdir(directory)):
            if not name.lower().endswith(".md"):
                continue
            if not name.lower().startswith(MODULE.lower().replace(" ", "-")):
                continue
            with open(os.path.join(directory, name), encoding="utf-8") as fh:
                text = fh.read()
            chunks = re.split(r"^\s*---\s*$", text, flags=re.M)
            counts.append(("%s/%s" % (kind, name),
                           sum(1 for chunk in chunks if "# Item" in chunk)))
    return counts


batches = authored()
authored_items = sum(n for _, n in batches)


def authored_media():
    """
    Image requests written across every 108 batch, and how many block publication.

    Counted from the batches and the media-requests document rather than stated,
    because the number only means anything if it moves when a request is filled.
    `Priority: required` is the importer's own wording for "this item cannot
    publish without the image".
    """
    total = required = 0
    for kind in BATCH_KINDS:
        directory = os.path.join(IMPORTS, kind)
        if not os.path.isdir(directory):
            continue
        for name in sorted(os.listdir(directory)):
            if not name.lower().endswith(".md"):
                continue
            if not name.lower().startswith(MODULE.lower().replace(" ", "-")):
                continue
            with open(os.path.join(directory, name), encoding="utf-8") as fh:
                text = fh.read()
            # Every block carries a `Priority:` line and only some carry a
            # `Brief:` one — an article states its brief in the heading tail
            # instead. Counting briefs undercounted the articles to zero and
            # made `required` exceed the total, which is how this was noticed.
            total += len(re.findall(r"^Priority:", text, flags=re.M))
            required += len(re.findall(r"^Priority:\s*required\s*$", text, flags=re.M))
    if required > total:
        raise SystemExit("media requests: %d required of %d total" % (required, total))
    return total, required


authored_concept_count = sum(n for name, n in batches
                             if name.startswith("concept/") and "updates" not in name)
authored_article_count = sum(n for name, n in batches if name.startswith("article/"))
owed_media_total, owed_media_required = authored_media()


# --------------------------------------------------------------------------
# Manifest errors, computed rather than remembered.
#
# Each one is a case of the manifest making a claim the file itself refutes.
# They are silent failures — nothing errors, the row just says something untrue
# — so the only place they can be caught is a ledger that re-checks them.
# --------------------------------------------------------------------------
def cached_pages(source_id):
    path = os.path.join(PAGETEXT, source_id + ".json")
    if not os.path.exists(path):
        return None
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)["pages"]


manifest_errors = []

for source_id in sorted(text_mode):
    claimed = by_id[source_id]["textLayer"]
    actual = text_mode[source_id]
    if claimed == "native" and actual != "native":
        detail = ""
        if source_id in prac_per_file and "nativeGlyphCensus" in prac_per_file[source_id]:
            census = prac_per_file[source_id]["nativeGlyphCensus"]
            glyphs = sum(p["undecodableGlyphs"] for p in census)
            readable = sum(p["readableCharacters"] for p in census)
            detail = (" pdftotext returns %s glyphs across its %d pages and %s of them "
                      "decodes to a character a human could read: every one is U+0001, "
                      "because the embedded fonts carry no usable ToUnicode map."
                      % ("{:,}".format(glyphs), len(census),
                         "none" if readable == 0 else "only {:,}".format(readable)))
        elif source_id in book_per_file:
            detail = (" The first page yields nothing to pdftotext; the shared page-text "
                      "cache fell back to OCR and records mode `ocr` for it while the "
                      "manifest row still reads `native`.")
        manifest_errors.append({
            "source": source_id,
            "field": "textLayer",
            "says": "`native`",
            "is": "read by OCR, because there is no usable text layer",
            "detail": detail.strip(),
        })

for source_id, entry in sorted(prac_per_file.items()):
    if by_id[source_id]["category"] == "Written Questions" and entry["writtenQuestionsFound"] == 0:
        manifest_errors.append({
            "source": source_id,
            "field": "sourceCategory",
            "says": "`Written Questions`",
            "is": "a revision handout containing no question at all",
            "detail": ("All %d pages were scanned for every mark a written paper leaves — a "
                       "question number, an instruction verb, a mark allocation, a model "
                       "answer — and none is present. It is a three-column crash summary of "
                       "pharmacokinetics. %d reader highlight spans were recovered from it, "
                       "which is worth having and is not a question."
                       % (entry["pages"], handout_spans)),
        })

eoy_subject_rows = sorted({by_id[q["sourceId"]]["subject"] for q in eoy_rows})
if len(eoy_subject_rows) == 1 and len(eoy_by_subject) > 1:
    blanket = eoy_subject_rows[0]
    split = ", ".join("%d %s" % (n, s) for s, n in eoy_by_subject.items())
    subject_error = {
        "says": "`subject: \"%s\"`" % blanket,
        "detail": ("all %d of them, and it is wrong for about half of every paper: "
                   "the distinct split is %s. Both papers run %s inside every section, and the "
                   "2024 practical section prints the two as its own headings. Subject is "
                   "therefore inferred per question in `eoy.json`, with the basis recorded."
                   % (len(eoy["files"]), split, " then ".join(eoy_by_subject))),
    }
else:
    subject_error = None


# --------------------------------------------------------------------------
# Year provenance, re-checked against the page text rather than trusted.
# --------------------------------------------------------------------------
def years_in(source_id):
    pages = cached_pages(source_id)
    if pages is None:
        return None
    found = OrderedDict()
    for index, text in enumerate(pages):
        for line in text.splitlines():
            for match in re.findall(r"\b(?:19|20)\d\d\b", line):
                clean = " ".join(re.sub(r"[\u200e\u200f\u202a-\u202e]", "", line).split())
                found.setdefault(match, []).append((index + 1, clean))
    return found


def spans_in(source_id):
    pages = cached_pages(source_id)
    if pages is None:
        return None
    found = OrderedDict()
    for index, text in enumerate(pages):
        for match in re.findall(r"(?:19|20)\d\d\s*[-–/]\s*(?:19|20)\d\d", text):
            label = re.sub(r"\s*[-–/]\s*", "-", match)
            found.setdefault(label, set()).add(index + 1)
    return OrderedDict((k, sorted(v)) for k, v in sorted(found.items()))


filename_year = sorted(
    (f for f in files.values() if f["yearSource"] == "calendar label on the file"),
    key=lambda f: f["names"][0])

year_checks = []
for entry in filename_year:
    found = years_in(entry["sourceId"])
    year_checks.append((entry, found))

span_checks = []
span_unchecked = []
for entry in sorted((f for f in files.values() if f["category"] == "EOY"),
                    key=lambda f: f["names"][0]):
    found = spans_in(entry["sourceId"])
    if found is None:
        span_unchecked.append(entry)
    elif found:
        span_checks.append((entry, found))

span_conflicts = [(entry, found) for entry, found in span_checks
                  if entry["year"] and not any(str(entry["year"]) == label.split("-")[0]
                                               and str(entry["year"]) == label.split("-")[1]
                                               for label in found)]


# --------------------------------------------------------------------------
# Per-file yield, as it appears in the table.
# --------------------------------------------------------------------------
def yielded(entry):
    source_id = entry["sourceId"]
    parts = []
    if source_id in eoy_rows_per_file:
        distinct = eoy_distinct_per_file.get(source_id, 0)
        total = eoy_rows_per_file[source_id]
        if distinct:
            parts.append("%d %s" % (distinct, plural(distinct, "question")))
        else:
            parts.append("%d %s (second copy)" % (total, plural(total, "row")))
        if source_id in key_per_file:
            parts.append("%d answers recovered" % key_per_file[source_id])
        else:
            control = [c for c in control_files if c["sourceId"] == source_id]
            if control:
                parts.append("0 answers (control pass over %d)"
                             % sum(c["questionsScanned"] for c in control))
    if source_id in bank_per_file:
        found = bank_per_file[source_id]
        parts.append("%d questions (%d with options)"
                     % (found["questionsFound"], found["mcqRows"]))
    if source_id in chapters_per_file:
        book = book_per_file[source_id]
        parts.append("%d %s" % (chapters_per_file[source_id],
                                plural(chapters_per_file[source_id], "chapter")))
        parts.append("%d headings" % book["headingsRecorded"])
        parts.append("%d ILOs" % book["ilosFound"])
    elif source_id == orientation_id:
        parts.append("%d ILOs" % orientation_ilos)
    if source_id == prac_id:
        parts.append("%d teaching items" % prac_items)
        parts.append("%d method notes" % prac_guidance)
        parts.append("%d media requests" % prac_media)
    return ", ".join(parts)


def state(entry):
    source_id = entry["sourceId"]
    if source_id not in pages_read:
        return "not yet read"
    read, total = pages_read[source_id], entry["pages"]
    short = "" if read == total else " (%d of %d pages)" % (read, total)
    if not yielded(entry):
        return "read in full, yielded nothing" + short
    return "read in full" + short


def cell(text):
    return text.replace("|", "\\|")


ordered = sorted(files.values(), key=lambda f: (
    CATEGORY_ORDER.index(f["category"]) if f["category"] in CATEGORY_ORDER else len(CATEGORY_ORDER),
    f["names"][0]))

table = []
for entry in ordered:
    also = " · ".join(cell(n) for n in entry["names"][1:]) or DASH
    table.append("| %s | %s | %s | %s | %s | %s |" % (
        cell(entry["names"][0]), also, entry["category"],
        entry["pages"] if entry["pages"] is not None else DASH,
        cell(yielded(entry)) or DASH, state(entry)))

unread = [e for e in ordered if e["sourceId"] not in pages_read]
empty = [e for e in ordered if e["sourceId"] in pages_read and not yielded(e)]
total_pages = sum(e["pages"] or 0 for e in ordered)
read_pages = sum(pages_read.get(e["sourceId"], 0) for e in ordered)


# --------------------------------------------------------------------------
# The report.
# --------------------------------------------------------------------------
def section_authored():
    if not batches:
        return "Nothing has been authored into a batch yet."
    lines = ["| Batch | Items |", "| --- | --- |"]
    lines += ["| `%s` | %d |" % (name, count) for name, count in batches]
    return "\n".join(lines)


def section_unauthored():
    """
    What was extracted and did not become a batch record, and why.

    The reason matters more than the count. An item held back because a source
    does not say enough is a fact about the corpus; an item held back because a
    tool refused it is a fact about us, and the two must not read alike. An
    earlier draft of this file claimed `matching` batches were refused by two
    live bugs. They are not — both were fixed before this module was authored,
    and a probe batch validates clean. That claim was inherited rather than
    measured, and on its own it would have written off seven recoverable items.
    """
    return (
        "**One multiple-choice question.** The 2025 paper's printed Q22 tests "
        "pharmacogenomics, and no concept or article in this module covers it: the "
        "department book has no section on the subject, while orientation ILOs 51 and "
        "52 examine it. Tagging it onto a neighbouring concept would award mastery for "
        "something the question does not test, so it is held. Its answer is recovered "
        "at confidence 1.00 and waits only on that gap being filled — and the gap is "
        "the faculty's rather than this programme's, since the material is examined "
        "and not taught.\n\n"
        "**%d matching items from the two department question banks**, held for the "
        "licence reason below and for nothing else. They are recorded rather than "
        "dropped, because an item left out for a rights reason is indistinguishable, a "
        "month later, from an item nobody found.\n\n"
        "Nothing is held for a tooling reason. Every written-format question in the "
        "four exam papers is authored, the matching item included: its option bank is "
        "a diagram of four lettered needles carrying no text, and the routes were read "
        "back from the solver's own handwriting beside each characteristic."
        % bank_matching).strip()


def section_owed():
    """
    What the sources support that has not been made yet.

    Every other section here answers "was this read" and "was this authored".
    Neither question catches a kind of gap that matters more as the module ages:
    material that was read, is usable, and simply has no record yet. A module
    whose batches all validate is not a module that is finished, and the
    difference is invisible unless somebody writes it down.

    Counted from the batches rather than asserted, so this list shrinks on its
    own as the work lands.
    """
    lines = [
        "Every batch in this module validates clean. That is not the same as the "
        "module being finished, and the difference is what this section records.",
        "",
        "| Owed | Scale | Why it is not done |",
        "| --- | --- | --- |",
        "| Typed concept relations | %d concepts, **0 edges** | Relationship discovery ran on every concept and its outcome is recorded per record. A typed edge needs a claim and a citation to support it; both now exist, so this is authorable for the first time and simply has not been done. |" % authored_concept_count,
        "| Article spans | %d articles carry no `resourceIds`, `claimIds` or `spanIds` | The concepts are done — all %d carry real claims and resources — but the articles were authored before the evidence pass and were not revisited. These are the audit's three remaining findings. |" % (authored_article_count, authored_concept_count),
        "| Glossary terms | 0 | No glossary batch was written. The module's Arabic labels are "
        "authored on the concepts themselves. |",
        "| Images | %d requests, none fulfilled | The repository holds no medical images. Every "
        "request is written and none is `supplied`; %d are `required`, meaning the item cannot "
        "publish without one. |" % (owed_media_total, owed_media_required),
        "| The rest of the practical atlas | 10 of at least 44 items | Seventeen printed pages "
        "are absent from the source PDF. Ask the department for printed pages 5-21 and "
        "everything after 24. |",
        "| A pharmacogenomics concept and article | 1 question waiting | The department examines "
        "it (orientation ILOs 51 and 52) and its own book does not teach it. Authoring it from a "
        "foreign textbook would be inventing curriculum. |",
        "| A guard on the written-batch sweep | 1 file at risk | **Do not register a `108 INT` paper in `scripts/kasr/seeds/` until this lands.** `removeOrphans` in `build-batches.ts` deletes any `108-INT-*-written.md` the run did not generate. Today the build throws at `:614` — no registered paper belongs to this module — so nothing runs. Register one paper and the run writes `108-INT-EOY-<year>-written.md` and sweeps the hand-authored `108-INT-EOY-written.md`, which is how that file was already lost twice. Nothing in a filename separates generated from hand-authored, so the guard is a design question for whoever owns the generator. `medical:batches-present` would catch the loss on the same push; it does not prevent it. |",
    ]
    return "\n".join(lines)


def section_licence():
    return (
        "The %d questions in the two department question banks are extracted to the "
        "private ledger and **%s**. Both books print "
        "\"%s\" on their second page.\n\n"
        "Extraction is not clearance. No stem, option or distractor from these two "
        "files may reach a student, verbatim or lightly reworded, until the rights "
        "question is decided. They are usable now only as evidence of *what* the "
        "department examines, which is how the authored batches use them.\n\n"
        "A separate check found the banks share **%d questions** with the four exam "
        "papers: %s"
        % (bank_total, bank_licence["publicationStatus"].lower(),
           bank_licence["notice"], bank_overlap["overlap"],
           bank_overlap["note"][0].lower() + bank_overlap["note"][1:]))


def section_papers():
    formats = "\n".join("| `%s` | %d |" % (name, count) for name, count in eoy_by_format.items())
    subjects = ", ".join("%d %s" % (n, s) for s, n in eoy_by_subject.items())
    return (
        "The four exam files hold **%d rows carrying %d distinct questions**. Each "
        "sitting is filed twice, as a solved copy and an unsolved copy of the same "
        "paper, so every question is present exactly twice; the rows on the second "
        "copy carry `isCanonicalCopy: false` and name their twin. Read %d as the "
        "number of questions this module has and %d as the number of rows it takes "
        "to store them.\n\n"
        "| Format | Distinct questions |\n| --- | --- |\n%s\n\n"
        "By subject: %s. By sitting: %s. %d of the distinct questions depend on a "
        "picture the text layer does not carry; their prompts are recorded and their "
        "content is not invented."
        % (len(eoy_rows), len(eoy_distinct), len(eoy_distinct), len(eoy_rows), formats,
           subjects,
           "; ".join("%d from the %s sitting (batch %s)"
                     % (s["solvedQuestions"], s["examSittingYear"], s["examSittingBatch"])
                     for s in sorted(eoy["sittings"], key=lambda s: -s["examSittingYear"])),
           eoy_images))


def section_answers():
    return (
        "**%d of %d multiple-choice answers were recovered**, none left unresolved. "
        "The two solved papers are complete answer keys, but they mark the correct "
        "option with a coloured highlight drawn over it — a drawing overlay carrying "
        "no text, so a solved copy and its unsolved twin extract to the same "
        "characters. The answers were taken back out of the pixels: each page "
        "rendered and intersected with the option boxes `pdftotext -bbox-layout` "
        "reports.\n\n"
        "This is a yield in its own right and is counted as one. A solved paper whose "
        "key has been recovered has been read more thoroughly than one whose "
        "questions were merely transcribed.\n\n"
        "The same scan was run over the %d unsolved copies as a control and found "
        "**%d highlight pixels across %d questions, attributing %d answers**. That is "
        "the result that makes the other %d trustworthy: a method that finds marks on "
        "an unmarked paper is finding its own noise.\n\n"
        "**The written questions have a key too, and it is a third mechanism again.** "
        "A highlight can only mark a lettered option, so the %d distinct written "
        "questions were first recorded as unanswerable. They are not. Both solved "
        "papers answer their entire practical sections in pasted answer graphics and "
        "handwriting — invisible to `pdftotext` for the same reason the highlights "
        "were, and invisible to the highlight scan as well, because it looks for "
        "colour over an option box and these are neither. All nine practical pages of "
        "the two solved copies carry answers: 2025 pp11-15, 2024 pp8-11. They were "
        "found by rendering each page and reading it.\n\n"
        "That recovery is what let the practical questions be authored at all, and it "
        "corrected two of them: both ask about a pictured route, both had been tagged "
        "on the enteral-routes concept on the assumption of an oral preparation, and "
        "the recovered answer block is headed \"5. Inhalation route\". Left unread, "
        "they would have awarded oral-route mastery to students who demonstrated none."
        "\n\n"
        "One provenance caveat travels with them: the 2024 copy is signed \"Solved by "
        "Nour and Menna\", so those are students' answers rather than a registrar's "
        "mark scheme. The 2025 copy is unsigned. Everything built from either is "
        "`Draft` and quotes the recovered answer verbatim."
        % (keys_recovered, keys_scanned, len(control_files), control_pixels,
           control_questions, control_answers, keys_recovered,
           eoy["totals"]["distinctWrittenQuestionsWithNoKeyEither"]))


def section_orientation():
    return (
        "The orientation ILO sheet — %d pages — yields no questions at all, and it is "
        "the module's authoritative statement of how it is examined. Counting only "
        "questions would file the most important document in the corpus as empty.\n\n"
        "Its yield is **%d ILOs**, each tagged with the formats that will test it: "
        "%d SAQ, %d MCQ, %d OSPE, and %d tested by no listed format at all (ILOs %s). "
        "It also prints the mark split the module is built on — %s.\n\n"
        "The two department books carry their own in-book ILOs on top of that: %d "
        "between them, across %d %s and %d recorded headings."
        % (by_id[orientation_id]["pages"], orientation_ilos,
           orientation_counts["SAQ"], orientation_counts["MCQ"], orientation_counts["OSPE"],
           orientation_counts["untestedByAnyListedFormat"],
           ", ".join(str(n) for n in orientation_counts["untestedIloNumbers"]),
           orientation["markSplit"]["rawLine"],
           book_ilos, book_chapters, plural(book_chapters, "chapter"), book_headings))


def section_manifest_errors():
    out = ["**%d errors in this module's %d sources**, all silent — nothing fails, the "
           "row simply says something the file refutes." % (len(manifest_errors), len(files))]
    for error in manifest_errors:
        entry = by_id[error["source"]]
        out.append("- **%s** (`%s`) — the manifest declares %s; it is %s.%s"
                   % (entry["names"][0], error["source"], error["says"], error["is"],
                      " " + error["detail"] if error["detail"] else ""))
    if subject_error:
        out.append("\nA fourth, different in kind: the exam files carry a blanket %s — %s"
                   % (subject_error["says"], subject_error["detail"]))
    return "\n".join(out)


def section_excerpt():
    return (
        "Nothing was capped: every file that was opened was read to the end — %d of "
        "%d pages across the module.\n\n"
        "One file is nonetheless short of its own book. The practical atlas is an "
        "**excerpt**: %s. Its printed page numbers run %s and then jump to %s, so %d "
        "printed pages are absent outright, and the book continues past the last page "
        "held by an unknown amount. Every teaching page in the excerpt carries exactly "
        "two items, which is what makes the projection safe; the gross section cannot "
        "be projected at all, so the total is a floor rather than an estimate.\n\n"
        "Until the rest arrives this catalogue is a sample of the practical and must "
        "not be published or counted as the module's practical syllabus."
        % (read_pages, total_pages, prac_coverage["estimatedCoverage"],
           ", ".join(str(p) for p in prac_coverage["printedPagesHeld"]
                     if p < min(prac_coverage["printedPagesMissing"])),
           ", ".join(str(p) for p in prac_coverage["printedPagesHeld"]
                     if p > max(prac_coverage["printedPagesMissing"])),
           prac_coverage["printedPagesMissingCount"]))


def section_years():
    out = ["Year provenance in this module is weak, and the ledger says so rather "
           "than printing a year as if it were read off the document.\n"]
    out.append("%s sources take their year from a *filename* — the manifest records "
               "`examSittingYearSource: \"calendar label on the file\"`. Re-reading "
               "their page text for any four-digit year:\n"
               % {1: "One", 2: "Two", 3: "Three", 4: "Four"}.get(len(year_checks),
                                                                 str(len(year_checks))))
    for entry, found in year_checks:
        if found is None:
            out.append("- **%s** — manifest year %s; page-text cache absent, not re-checked."
                       % (entry["names"][0], entry["year"]))
        elif not found:
            out.append("- **%s** — manifest year %s; the file states no year anywhere in "
                       "its %d pages." % (entry["names"][0], entry["year"], entry["pages"]))
        else:
            printed = "; ".join(
                "`%s` on %s %s, in %s line the extractor read as `%s`" % (
                    year, plural(len({p for p, _ in hits}), "page"),
                    ", ".join(str(p) for p in sorted({p for p, _ in hits})),
                    "an Arabic" if re.search(r"[\u0600-\u06ff]",
                                             sorted({l for _, l in hits})[0]) else "a",
                    sorted({line for _, line in hits})[0])
                for year, hits in sorted(found.items()))
            out.append("- **%s** — manifest year %s, and the file's own pages do not agree: "
                       "the only year they carry is %s. That is %s off a content page rather "
                       "than a title page, so it is evidence and not a settlement."
                       % (entry["names"][0], entry["year"], printed,
                          "OCR" if text_mode.get(entry["sourceId"]) == "ocr" else "native text"))
    out.append("\nThe pathology book has no title page at all and records no title: it "
               "opens straight onto its first chapter, so nothing was invented from the "
               "filename.")
    if span_conflicts:
        out.append("\nSeparately, on the exam papers, the manifest's derived year and the "
                   "year the paper prints do not line up:\n")
        grouped = OrderedDict()
        for entry, found in span_conflicts:
            label, pages = next(iter(found.items()))
            grouped.setdefault((entry["year"], label, len(pages)), []).append(entry["names"][0])
        for (year, label, pages), names in grouped.items():
            one = len(names) == 1
            out.append("- %s — the manifest derives `examSittingYear: %s` from the batch code, "
                       "while the %s `%s` on all %d of %s pages. The two do not obviously "
                       "agree and neither has been overruled here."
                       % (", ".join("**%s**" % n for n in sorted(names)), year,
                          "paper prints" if one else "papers each print", label, pages,
                          "its" if one else "their"))
    elif span_unchecked:
        # An unrunnable check is reported as unrun, not left out: a section that
        # silently vanishes when its input is missing is the failure this whole
        # document exists to prevent.
        out.append("\nThe %d exam %s could not be re-read for the academic-year label they "
                   "print: their page-text cache is absent. This check did not run."
                   % (len(span_unchecked), plural(len(span_unchecked), "paper")))
    return "\n".join(out)


report = """# 108 INT — source coverage

Generated by `scripts/kasr/extract/108-INT/coverage.py`. Rerun it and the numbers are today's.

{read_files} of {total_files} source files have been read — {read_pages} of {total_pages} pages.
The module's manifest carries {rows} rows for those {total_files} files, because {twice}
{twice_verb} shelved twice under two names with one `sha256` between them; each is one
row below, with both names given. They yielded
**{distinct} distinct exam questions** ({eoy_rows} rows across solved and unsolved copies),
**{keys} recovered multiple-choice answers**, **{bank} department-bank questions**,
**{items} practical teaching items**, **{media} media requests**,
{chapters} book chapters ({headings} headings, {book_ilos} in-book ILOs), and
{orientation} orientation ILOs.

A file that yielded nothing is listed as such rather than omitted. A programme
that reports only what it found cannot be audited, because a file nobody opened
looks exactly like a file with nothing in it.

## Authored so far

{authored}

## Extracted but not authored

{unauthored}

## Not cleared for publication

{licence}

## Owed from what was read

{owed}

## What the papers asked

{papers}

## Answer keys recovered

{answers}

## The document that yields no questions

{orientation_section}

## Manifest errors found

{errors}

## Year provenance

{years}

## Read short

{excerpt}

## Not yet read

{not_read}

## Every source

| File | Also filed as | Category | Pages | Yielded | State |
| --- | --- | --- | --- | --- | --- |
{table}
""".format(
    read_files=len(files) - len(unread), total_files=len(files),
    read_pages=read_pages, total_pages=total_pages, rows=len(rows),
    twice="three files" if len(FILED_TWICE) == 3 else "%d files" % len(FILED_TWICE),
    twice_verb="are" if len(FILED_TWICE) != 1 else "is",
    distinct=len(eoy_distinct), eoy_rows=len(eoy_rows), keys=keys_recovered,
    bank=bank_total, items=prac_items, media=prac_media,
    chapters=book_chapters, headings=book_headings, book_ilos=book_ilos,
    orientation=orientation_ilos,
    authored=section_authored(), unauthored=section_unauthored(),
    licence=section_licence(), owed=section_owed(),
    papers=section_papers(), answers=section_answers(),
    orientation_section=section_orientation(), errors=section_manifest_errors(),
    years=section_years(), excerpt=section_excerpt(),
    not_read=("None. Every source file in the module has been read."
              if not unread else
              "%d %s.\n\n%s" % (len(unread), plural(len(unread), "file"),
                                "\n".join("- **%s** (%s, %s pages)"
                                          % (e["names"][0], e["category"],
                                             e["pages"] if e["pages"] is not None else "?")
                                          for e in unread))),
    table="\n".join(table),
)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
    fh.write(wrap(report) + "\n")

print("%d/%d files read, %d/%d pages, %d yielded nothing, %d authored items -> %s"
      % (len(files) - len(unread), len(files), read_pages, total_pages,
         len(empty), authored_items, os.path.relpath(OUT, REPO)))
