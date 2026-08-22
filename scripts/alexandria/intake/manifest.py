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
"""
import collections
import json
import os
import re
from datetime import date

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/Users/doitrous/Desktop/Alexandria University"
REPO = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
OUTDIR = os.path.join(REPO, "docs", "Alexandria-Source-Imports", "manifest")

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


def row_word_count(pr, oc):
    """Best available extracted-text word count for this hash, used only to
    rank name-twins against each other (never to pick which one 'is' the
    source — both stay on the manifest)."""
    text = (pr or {}).get("text") or (oc or {}).get("ocrText") or ""
    return len(text.split())


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
                "cohortSignal": pl.get("cohortSignal"),
                "streamSignal": pl.get("streamSignal"),
                "sittingYear": pl.get("sittingYear"),
                "sittingYearEvidence": pl.get("sittingYearEvidence"),
            },
            "exclusionReason": None,
            "absolutePath": os.path.join(ROOT, rep),
        }
        rows_by_top[top].append(row)

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
    return written


if __name__ == "__main__":
    main()
