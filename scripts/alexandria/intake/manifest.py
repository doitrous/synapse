#!/usr/bin/env python3
"""Build the Alexandria University source manifest — one file per year, plus
General Resources.

Adapted from scripts/corpus-intake/manifest.py (commit 6b32fa6). Kept from the
Kasr version: batch/calendar-year signals are recorded rather than merged
(here: cohortSignal vs sittingYear — see below), and an excluded row is kept
with a reason rather than dropped. Genuinely new here, because this corpus
made it necessary:

  * Kasr moved files into a canonical layout first (move.py) and then wrote a
    single manifest describing that layout. Alexandria's tree must never be
    moved, so this script reads the *existing* organisation directly and
    writes four manifests (au-y1/y2/y3/general-sources.json) instead of one —
    matching the brief's four output files.
  * Kasr's manifest is one row per file. Here the unit of a row is a
    **content hash**: one row per distinct sha256, carrying every corpus path
    that hash appears under (`sourceRelativePaths`), never one row per path.
    See "Deduplication reality" below and in README.md — this corpus's
    near-duplicate pairs turned out NOT to be byte-identical, so hash-dedup
    alone only collapses a small fraction of the corpus, and a second,
    explicitly-fuzzy mechanism (`nameTwinOf`) handles the rest without ever
    merging two different hashes into one row.
  * `moduleId` is `AU-<CODE>` (uppercase, hyphenated, no spaces) per the
    2026-08-22 chief-of-staff ruling recorded in LANE-BRIEF.md §1: module ids
    are global bare strings with no university cross-check in the importer,
    so a bare "MED 102" would collide with any other university printing the
    same code. `rawModuleShorthand` keeps the faculty's own printed code
    (e.g. "MED 102") — never the id.
  * `containerKind` marks the four top-level things in this corpus that are
    not a module folder at all (y2/EOY Exams, y3/EOY Exams, y3/Additional
    Curriculum, General Resources) per the 2026-08-22 orchestrator decision:
    these get `moduleId: null` — an EOY paper spans modules, and whatever is
    later extracted from it carries the module it actually teaches, not the
    container it was filed in.
  * `moduleMismatch` / `moduleMismatchEvidence` come from classify.py's header
    read, per the brief: folders are reliable here, but still checked.
  * **2026-08-22 orchestrator fix**: classify.py's `stream_signal()` only
    matched the Arabic tokens (مصريين / وافدين), so an English-labelled file
    like "EOM - Blood End Egyptian 1.pdf" or "EOM - GIT FINAL 23-24
    (wafdeen).pdf" got `streamSignal: null`. Rather than require a
    classify.py + probe.py rerun (probe is expensive; the fix must be
    mergeable from `manifest.py` alone), stream and cohort detection are now
    done fresh, here, directly from `sourceRelativePaths` (every filename this
    hash is known under) plus whatever text is already sitting in
    `probe.json`/`ocr_results.json` — no re-probing. This is additive: it
    widens what counts as a signal, never narrows classify.py's own findings,
    and it does not touch `sourceId`, row order, or any other field.
"""
import collections
import hashlib
import json
import os
import re
from datetime import date

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/Users/doitrous/Desktop/Alexandria University"
REPO = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
OUTDIR = os.path.join(REPO, "docs", "Alexandria-Source-Imports", "manifest")
PAGETEXT_DIR = os.path.join(HERE, "..", "pagetext")

UNIVERSITY = "au"
YEAR_ID_OF_TOP = {"y1": "AU_Y1", "y2": "AU_Y2", "y3": "AU_Y3", "General Resources": None}
OUT_FILE_OF_TOP = {
    "y1": "au-y1-sources.json", "y2": "au-y2-sources.json",
    "y3": "au-y3-sources.json", "General Resources": "au-general-sources.json",
}

# The mapping table LANE-BRIEF.md §1 calls for: faculty-printed shorthand (what
# inventory.py parses out of the folder name, before the dash) -> the global
# module id every other university-tagged row in the system must not collide
# with. This is the only place a "MED 102"-shaped string is allowed to become
# an id; everywhere else it stays in rawModuleShorthand / moduleName.
MODULE_ID_MAP = {
    "MED 101": "AU-MED-101", "MED 102": "AU-MED-102", "MED 103": "AU-MED-103",
    "MED 105": "AU-MED-105", "MED 106": "AU-MED-106",
    "UNI 104": "AU-UNI-104", "UNI 107": "AU-UNI-107",
    "MED 201": "AU-MED-201", "MED 202": "AU-MED-202", "MED 203": "AU-MED-203",
    "MED 204": "AU-MED-204", "MED 205": "AU-MED-205",
    "MED 301": "AU-MED-301", "MED 302": "AU-MED-302", "MED 303": "AU-MED-303",
    "MED 305": "AU-MED-305", "MED 307": "AU-MED-307", "MED 308": "AU-MED-308",
    "MED 309": "AU-MED-309",
    "UNI 310": "AU-UNI-310", "UNI 311": "AU-UNI-311",
    "E 304": "AU-E-304", "E 306": "AU-E-306",
}

# Top-level folders (or, for y2/y3, a module-shaped folder that is not
# actually a module) that hold material spanning more than one module. These
# never get a moduleId — see the class docstring above.
def container_kind(top, module_folder):
    if top == "General Resources":
        return "general-resources"
    if module_folder == "EOY Exams":
        return "year-eoy"
    if module_folder == "Additional Curriculum":
        return "additional-curriculum"
    return None


UPDATED_MARKER_RX = re.compile(r"\s*\[from Alexandria University Updated\]", re.I)
BRACKET_RX = re.compile(r"\[[^\]]*\]")
# Everything that isn't a letter (incl. Arabic) or digit collapses to a single
# space: this is what turns "Board Aliaa lec.5" and "Board lec [from ... " and
# "Board_Aliaa_Lec" into the same normalised stem, which the orchestrator's
# gap-ledger sample needed to resolve the 92 pairs that the literal "[from
# Alexandria University Updated]" substring-strip alone could not match.
PUNCT_RX = re.compile(r"[^0-9A-Za-z؀-ۿ]+")

# Stream tokens, case-insensitive, English and Arabic (two Arabic spellings of
# "Egyptian" are both in circulation in this corpus's filenames: مصريين and the
# shorter مصرين). classify.py's own stream_signal() only had the Arabic pair;
# this list is a strict superset of it.
STREAM_PATTERNS = [
    ("egyptian", re.compile(r"Egyptian|مصريين|مصرين", re.I)),
    ("international", re.compile(r"wafdeen|wafdin|وافدين", re.I)),
]

# A graduating-cohort label, four-digit (2027-2030, per the brief) or the
# matching two-digit academic-year shorthand this corpus also uses ("23-24",
# "24-25" — first two digits, a dash, the next consecutive two digits).
# Restricted to filenames only (not extracted body text): a body-text
# "23-24"-shaped string is far more likely to be an unrelated page range or
# question range than a cohort label, but a filename rarely contains one by
# coincidence.
COHORT_4DIGIT_RX = re.compile(r"\b(202[7-9]|2030)\b")
COHORT_2DIGIT_RX = re.compile(r"\b(\d{2})-(\d{2})\b")


def stream_signal_and_token(files, pr, oc):
    """Fresh stream detection across every filename this hash is known under,
    plus whatever text probe.py/ocr_worker.py already extracted (no
    re-probing — that text is just read from what is already on disk)."""
    hay_parts = [f["name"] for f in files]
    if pr and pr.get("text"):
        hay_parts.append(pr["text"])
    if oc and oc.get("ocrText"):
        hay_parts.append(oc["ocrText"])
    hay = " ".join(hay_parts)
    for label, rx in STREAM_PATTERNS:
        m = rx.search(hay)
        if m:
            return label, m.group(0)
    return None, None


def cohort_signal_tokens(files):
    """Every cohort-shaped token found across this hash's filenames — four
    digit (2027-2030) or two-digit academic-year (NN-(N+1)) — de-duplicated,
    sorted, or None."""
    hay = " ".join(f["name"] for f in files)
    tokens = set(COHORT_4DIGIT_RX.findall(hay))
    for a, b in COHORT_2DIGIT_RX.findall(hay):
        if int(b) == (int(a) + 1) % 100:
            tokens.add(f"{a}-{b}")
    return sorted(tokens) or None


def source_id(sha):
    return "src_" + sha[:20]


def normalized_stem(name):
    stem = os.path.splitext(name)[0]
    stem = BRACKET_RX.sub(" ", stem)
    stem = PUNCT_RX.sub(" ", stem.lower())
    return " ".join(stem.split())


def pick_representative(paths):
    """Prefer a path with no 'Updated' marker (the marker names itself as a
    copy of something else); alphabetically first among those, or among all
    paths if every copy carries the marker."""
    unmarked = [p for p in paths if not UPDATED_MARKER_RX.search(p)]
    pool = unmarked or paths
    return sorted(pool)[0]


def best_text(pr, oc):
    """The best text already extracted for this hash — whatever probe.py or
    ocr_worker.py already found, read from probe.json/ocr_results.json. Never
    re-probes or re-OCRs anything."""
    return (pr or {}).get("text") or (oc or {}).get("ocrText") or ""


def row_word_count(pr, oc):
    """Best available extracted-text word count for this hash, used only to
    rank name-twins against each other (never to pick which one 'is' the
    source — both stay on the manifest)."""
    return len(best_text(pr, oc).split())


# --- Content-twin detection (2026-08-22 orchestrator follow-up) -----------
# Two rows can be the same exam paper under unrelated filenames — a
# cohort-labelled name and a stream-labelled name, different bytes (re-saved,
# rescanned, whatever), no nameTwinOf link possible because the names don't
# resemble each other at all. Restricted to the categories where this
# actually matters: a paper, its answers, or a question bank. Computed from
# the pagetext cache (scripts/alexandria/pagetext/<sourceId>.json — written
# by this same run of manifest.py from whatever probe.json/ocr_results.json
# already holds, since none existed as standalone files before this fix; see
# README.md "Content twins" for why that's an honest description of what
# happened here, not a re-probe).
CONTENT_TWIN_CATEGORIES = {
    "End of Module paper", "End of Module answers", "End of Year paper",
    "Department Questions",
}
CONTENT_TWIN_THRESHOLD = 0.95
SHINGLE_K = 8
DIGITS_ONLY_RX = re.compile(r"^\d+$")
# Scanner-app watermark boilerplate. Found by hand: two AU-MED-202 rows
# ("AFM book histo questions GIT" and "MCQs - 2 be doc (Physiology)" —
# unrelated subjects) matched at 100% before this fix, because both scanned
# pdfs' entire "native" text layer is nothing but this watermark repeated
# once per page — 9 files corpus-wide have no other extractable text at all.
# Stripped like a page-number line, not treated as content.
WATERMARK_RX = re.compile(r"scanned by camscanner", re.I)
# Below this many words, normalised text is not distinctive enough to trust a
# shingle/Jaccard match on — it is the difference between "these two papers
# share their questions" and "these two mostly-blank scans share a stamp".
MIN_CONTENT_WORDS = 25


def normalize_content_text(text):
    """Lowercase, drop page-number-only lines and scanner watermarks, collapse
    whitespace. Only meaningfully strips digit-only *lines* for text that
    still has line breaks (native pdf extracts do; pptx/docx/xlsx/OCR text was
    already space-joined at extraction time and has none left to strip —
    documented in README.md, not silently papered over)."""
    text = WATERMARK_RX.sub(" ", text or "")
    lines = [ln.strip() for ln in text.splitlines()]
    lines = [ln for ln in lines if ln and not DIGITS_ONLY_RX.match(ln)]
    joined = " ".join(lines).lower() if lines else text.lower()
    return " ".join(joined.split())


def shingles(normalized_text, k=SHINGLE_K):
    words = normalized_text.split()
    if not words:
        return set()
    if len(words) < k:
        return {tuple(words)}
    return {tuple(words[i:i + k]) for i in range(len(words) - k + 1)}


def jaccard(a, b):
    if not a or not b:
        return 0.0
    inter = len(a & b)
    union = len(a | b)
    return inter / union if union else 0.0


def main():
    probe = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, "probe.json")))}
    plan = {x["sha256"]: x for x in json.load(open(os.path.join(HERE, "plan.json")))}
    ocr_path = os.path.join(HERE, "ocr_results.json")
    ocr = {x["sha256"]: x for x in json.load(open(ocr_path))} if os.path.exists(ocr_path) else {}

    # Group every path onto its content hash first — this is the dedup step.
    # A hash can legitimately have more than one file row (same bytes, several
    # paths), so this must be built from the raw list, not from a dict keyed
    # by sha256 (which would silently keep only the last path per hash).
    raw_files = json.load(open(os.path.join(HERE, "inventory.json")))["files"]
    by_hash = collections.defaultdict(list)
    for f in raw_files:
        by_hash[f["sha256"]].append(f)

    total_paths = len(raw_files)
    total_hashes = len(by_hash)

    # --- Deduplication reality --------------------------------------------
    # The brief's hazard note says a plain-named file and its "[from
    # Alexandria University Updated]" sibling are "usually byte-identical".
    # The orchestrator's gap-ledger lane checked 20 such pairs by hand and
    # this script checked all 1,334 found side by side in the same folder:
    # **zero** share a sha256 either way. The Updated copy is consistently a
    # little *smaller* (same page count, in sampled pairs) and at least one
    # sampled pair lost its native pdftotext-extractable text in the process
    # — this looks like a re-save/re-flatten, not a duplicate upload. So this
    # corpus cannot be deduped by filename pattern; sha256 is the only thing
    # trusted for that (the brief's other, still-correct instruction), and
    # that is what by_hash above does.
    #
    # What the name pattern still buys us, per the orchestrator's follow-up
    # ruling: a *soft* link between near-duplicate hashes that share a
    # normalised name in the same folder — `nameTwinOf` — plus
    # `twinPreferred` marking whichever twin has more extracted text, so a
    # content lane reads and cites one twin instead of rediscovering the pair
    # or double-counting it. Neither field ever merges two sourceIds.
    slot_hashes = collections.defaultdict(set)
    for f in raw_files:
        slot = (os.path.dirname(f["rel"]), normalized_stem(f["name"]))
        slot_hashes[slot].add(f["sha256"])

    rows_by_top = collections.defaultdict(list)
    unexpected_modules = set()
    word_count_of = {}
    gained_stream_by_top = collections.Counter()
    gained_cohort_by_top = collections.Counter()

    for sha, files in by_hash.items():
        pr = probe.get(sha, {})
        oc = ocr.get(sha)
        word_count_of[sha] = row_word_count(pr, oc)

    for sha, files in by_hash.items():
        rep = pick_representative([f["rel"] for f in files])
        rep_file = next(f for f in files if f["rel"] == rep)
        pr = probe.get(sha, {})
        pl = plan.get(sha, {})
        oc = ocr.get(sha)

        twin_hashes = set()
        for f in files:
            slot = (os.path.dirname(f["rel"]), normalized_stem(f["name"]))
            twin_hashes |= slot_hashes.get(slot, set())
        twin_hashes.discard(sha)
        name_twin_of = sorted(source_id(v) for v in twin_hashes) or None

        twin_preferred = None
        if twin_hashes:
            my_wc = word_count_of[sha]
            best = max(twin_hashes | {sha}, key=lambda h: word_count_of.get(h, 0))
            best_wc = word_count_of.get(best, 0)
            tied = [h for h in (twin_hashes | {sha}) if word_count_of.get(h, 0) == best_wc]
            if len(tied) > 1:
                # Tie: prefer the hash whose representative path carries the
                # "Updated" marker, per the orchestrator's ruling.
                updated_tied = [h for h in tied if any(
                    UPDATED_MARKER_RX.search(g["rel"]) for g in by_hash[h])]
                best = updated_tied[0] if updated_tied else tied[0]
            twin_preferred = (best == sha)

        top = rep_file["topFolder"]
        year_id = YEAR_ID_OF_TOP.get(top)
        raw_shorthand = rep_file["moduleId"]
        c_kind = container_kind(top, rep_file["moduleFolder"])
        if c_kind:
            module_id = None
            raw_shorthand = None
        else:
            module_id = MODULE_ID_MAP.get(raw_shorthand) if raw_shorthand else None
            if raw_shorthand and raw_shorthand.upper() not in MODULE_ID_MAP:
                unexpected_modules.add(raw_shorthand)
                module_id = "AU-" + raw_shorthand.upper().replace(" ", "-")

        # textLayer describes the document's own structure — whether it has an
        # extractable text layer at all — and stays "none" for a scanned pdf
        # whether or not OCR later managed to read it; OCR is a derived read,
        # not a text layer, and the two must not be conflated (a later stage
        # asking "does this pdf have a text layer" needs the honest answer).
        # What the probe *found* (OCR ran / is queued / errored) goes on
        # probeStatus instead, per the brief.
        text_layer = pr.get("textLayer")
        probe_status = pr.get("probeStatus")
        if rep_file["realType"] == "pdf" and text_layer == "none":
            if oc is not None:
                chars = oc.get("ocrChars") or 0
                if oc.get("ocrError"):
                    probe_status = f"ocr-ran-no-text: {oc['ocrError']}"
                elif chars >= 40:
                    probe_status = f"ocr-ran: {chars} chars read from first 2 pages"
                else:
                    probe_status = f"ocr-ran-negligible-text: {chars} chars from first 2 pages"
            else:
                probe_status = "ocr-queued-not-yet-run"

        # Fresh stream/cohort detection (2026-08-22 orchestrator fix — see the
        # class docstring). Computed here, from data already on disk, and
        # merged additively with whatever classify.py's plan.json already
        # found: this only ever widens a signal, never narrows or removes one.
        old_stream = pl.get("streamSignal")
        fresh_stream, fresh_stream_token = stream_signal_and_token(files, pr, oc)
        final_stream = fresh_stream or old_stream
        old_cohort = pl.get("cohortSignal")
        fresh_cohort = cohort_signal_tokens(files)
        final_cohort = sorted(set((old_cohort or []) + (fresh_cohort or []))) or None
        if old_stream is None and final_stream is not None:
            gained_stream_by_top[top] += 1
        if not old_cohort and final_cohort:
            gained_cohort_by_top[top] += 1

        row = {
            "sourceId": source_id(sha),
            "sha256": sha,
            "corpusRelativePath": rep,
            "sourceRelativePaths": sorted(f["rel"] for f in files),
            "duplicatePathCount": len(files),
            "nameTwinOf": name_twin_of,
            "twinPreferred": twin_preferred,
            "fileName": rep_file["name"],
            "universityId": UNIVERSITY,
            "yearId": year_id,
            "generalResources": top == "General Resources",
            "containerKind": c_kind,
            "moduleFolder": rep_file["moduleFolder"],
            "moduleId": module_id,
            "moduleName": None if c_kind else rep_file["moduleName"],
            "rawModuleShorthand": raw_shorthand,
            "departmentFolder": rep_file["departmentFolder"],
            "departmentFolderRaw": rep_file["departmentFolderRaw"],
            "category": pl.get("category", "Unknown"),
            "categoryEvidence": pl.get("categoryEvidence"),
            "moduleMismatch": pl.get("moduleMismatch", False),
            "moduleMismatchEvidence": pl.get("moduleMismatchEvidence"),
            "moduleNamedInText": pl.get("moduleNamedInText"),
            "fileType": rep_file["realType"],
            "claimedExtension": rep_file["claimedExt"],
            "extensionNote": rep_file["typeNote"],
            "size": rep_file["size"],
            "pageCount": rep_file["pages"],
            "textLayer": text_layer,
            "probeStatus": probe_status,
            "examSignals": {
                "cohortSignal": final_cohort,
                "streamSignal": final_stream,
                "streamSignalToken": fresh_stream_token,
                "sittingYear": pl.get("sittingYear"),
                "sittingYearEvidence": pl.get("sittingYearEvidence"),
            },
            "exclusionReason": None,
            "absolutePath": os.path.join(ROOT, rep),
        }
        rows_by_top[top].append(row)

    # --- Content-twin cache + detection (2026-08-22 orchestrator follow-up) -
    # Materialise the pagetext cache: one file per sourceId, from whatever
    # text probe.py/ocr_worker.py already extracted. This did not exist as
    # standalone files before this fix (pagetext/ was only ever used for
    # ephemeral render temp-dirs); writing it now is not a re-probe — every
    # byte in it was already sitting in probe.json/ocr_results.json.
    os.makedirs(PAGETEXT_DIR, exist_ok=True)
    all_rows = [r for rows in rows_by_top.values() for r in rows]
    text_of = {}
    for r in all_rows:
        sha = r["sha256"]
        if sha in text_of:
            continue
        text = best_text(probe.get(sha, {}), ocr.get(sha))
        text_of[sha] = text
        if text:
            cache_path = os.path.join(PAGETEXT_DIR, f"{r['sourceId']}.json")
            json.dump({"sourceId": r["sourceId"], "sha256": sha, "text": text},
                      open(cache_path, "w"), ensure_ascii=False)

    for r in all_rows:
        r["contentTwinOf"] = None
        r["contentTwinPreferred"] = None

    candidates = [r for r in all_rows if r["category"] in CONTENT_TWIN_CATEGORIES]
    # "Has usable cache text" means normalised text clears MIN_CONTENT_WORDS,
    # not just "the field is non-empty" — a handful of scanned pdfs extract to
    # nothing but a scanner-app watermark (see WATERMARK_RX above), which is
    # non-empty text but has zero content to compare on.
    usable_word_count = {
        r["sha256"]: len(normalize_content_text(text_of.get(r["sha256"], "")).split())
        for r in candidates
    }
    no_cache_text = [r for r in candidates if usable_word_count[r["sha256"]] < MIN_CONTENT_WORDS]
    groups = collections.defaultdict(list)
    for r in candidates:
        if usable_word_count[r["sha256"]] >= MIN_CONTENT_WORDS:
            groups[r["moduleId"] or r["containerKind"] or "NO_MODULE"].append(r)

    content_twin_report = []  # (module, fileA, fileB, similarity)
    for group_key, group_rows in groups.items():
        shingle_of = {r["sourceId"]: shingles(normalize_content_text(text_of[r["sha256"]]))
                      for r in group_rows}
        hash_of = {r["sourceId"]: hashlib.sha256(
            normalize_content_text(text_of[r["sha256"]]).encode("utf-8")).hexdigest()
            for r in group_rows}
        links = collections.defaultdict(set)
        for i, ra in enumerate(group_rows):
            for rb in group_rows[i + 1:]:
                if ra["sha256"] == rb["sha256"]:
                    continue  # already the same source, not a "twin"
                sim = 1.0 if hash_of[ra["sourceId"]] == hash_of[rb["sourceId"]] else \
                    jaccard(shingle_of[ra["sourceId"]], shingle_of[rb["sourceId"]])
                if sim >= CONTENT_TWIN_THRESHOLD:
                    links[ra["sourceId"]].add(rb["sourceId"])
                    links[rb["sourceId"]].add(ra["sourceId"])
                    content_twin_report.append((group_key, ra["fileName"], rb["fileName"], sim))

        for r in group_rows:
            linked = links.get(r["sourceId"])
            if linked:
                r["contentTwinOf"] = sorted(linked)

        # Preference within each connected cluster: the row carrying the
        # answer key (an "... answers" category) wins; otherwise the larger
        # extracted-text word count; ties keep the existing twinPreferred
        # tie-break (Updated copy) for determinism.
        seen = set()
        for r in group_rows:
            if not r["contentTwinOf"] or r["sourceId"] in seen:
                continue
            cluster_ids = {r["sourceId"]} | set(r["contentTwinOf"])
            cluster = [x for x in group_rows if x["sourceId"] in cluster_ids]
            seen |= cluster_ids
            with_key = [x for x in cluster if x["category"] == "End of Module answers"]
            pool = with_key or cluster
            best = max(pool, key=lambda x: (word_count_of.get(x["sha256"], 0),
                                             UPDATED_MARKER_RX.search(x["corpusRelativePath"]) is not None))
            for x in cluster:
                x["contentTwinPreferred"] = (x["sourceId"] == best["sourceId"])

    os.makedirs(OUTDIR, exist_ok=True)
    written = {}
    for top, out_name in OUT_FILE_OF_TOP.items():
        rows = sorted(rows_by_top.get(top, []), key=lambda r: r["corpusRelativePath"])
        doc = {
            "schemaVersion": "au-source-manifest/1.0.0",
            "generatedOn": date.today().isoformat(),
            "universityId": UNIVERSITY,
            "yearId": YEAR_ID_OF_TOP[top],
            "corpusRoot": ROOT,
            "corpusSubfolder": top,
            "note": ("One row per distinct sha256, not per path. corpusRelativePath "
                     "is a representative path (the copy without the '[from Alexandria "
                     "University Updated]' marker when one exists); sourceRelativePaths "
                     "carries every path that hash appears under. The corpus tree was "
                     "never moved, renamed or deleted to build this manifest. See "
                     "README.md 'Deduplication reality' for nameTwinOf/twinPreferred."),
            "moduleSubjectDeclarations": [],
            "moduleSubjectDeclarationsNote": ("This corpus carries no 'NOTE ... NOTE' folder "
                                               "convention (checked: zero matches) — Alexandria's "
                                               "module/subject/department folders are already "
                                               "explicit, so there is nothing to declare here."),
            "count": len(rows),
            "sources": rows,
        }
        out_path = os.path.join(OUTDIR, out_name)
        json.dump(doc, open(out_path, "w"), indent=1, ensure_ascii=False)
        written[top] = (out_path, len(rows))
        print(f"{top}: {len(rows)} sources -> {out_path}")

    all_rows = [r for rows in rows_by_top.values() for r in rows]
    twins = [r for r in all_rows if r["nameTwinOf"]]
    twin_pairs_checked = set()
    disagree = 0
    for r in twins:
        for other in r["nameTwinOf"]:
            key = tuple(sorted([r["sourceId"], other]))
            if key in twin_pairs_checked:
                continue
            twin_pairs_checked.add(key)
            other_row = next((x for x in all_rows if x["sourceId"] == other), None)
            if other_row and other_row["textLayer"] != r["textLayer"]:
                disagree += 1

    print(f"\n{total_paths} corpus paths -> {total_hashes} distinct sha256 hashes "
          f"({total_paths - total_hashes} duplicate paths)")
    print(f"{len(twins)} rows have a nameTwinOf link across {len(twin_pairs_checked)} "
          f"distinct twin pairs; {disagree} of those pairs disagree on textLayer")
    if unexpected_modules:
        print(f"WARNING: module codes found that are not in MODULE_ID_MAP: "
              f"{sorted(unexpected_modules)}")

    print("\n--- streamSignal / cohortSignal fix (2026-08-22) ---")
    for top in ("y1", "y2", "y3", "General Resources"):
        print(f"{top}: +{gained_stream_by_top.get(top, 0)} rows gained a streamSignal, "
              f"+{gained_cohort_by_top.get(top, 0)} rows gained a cohortSignal")

    print("\n--- contentTwinOf (2026-08-22 follow-up) ---")
    print(f"{len(candidates)} rows in scope (category in {sorted(CONTENT_TWIN_CATEGORIES)}); "
          f"{len(no_cache_text)} of those have no cache text (contentTwinOf left null; "
          "counted, not guessed at)")
    by_module_pairs = collections.defaultdict(list)
    for mod, fa, fb, sim in content_twin_report:
        by_module_pairs[mod].append((fa, fb, sim))
    print(f"{len(content_twin_report)} content-twin pairs found across "
          f"{len(by_module_pairs)} modules/containers:")
    for mod, pairs in sorted(by_module_pairs.items()):
        print(f"  {mod}:")
        for fa, fb, sim in pairs:
            print(f"    {sim:.0%}  {fa!r}  <->  {fb!r}")

    return written


if __name__ == "__main__":
    main()
