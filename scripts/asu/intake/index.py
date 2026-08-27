#!/usr/bin/env python3
"""Render the three Ain Shams year manifests as one human-readable README.

Unlike Kasr's index.py (one year, one README), this covers Years 1-3 in one
document, per docs/Ain-Shams-Source-Imports/LANE-BRIEF.md deliverable #3:
a per-year x module table, assessments by exam type, department books,
text-layer vs scanned, duplicates within and across years (the Year 2 Term 2
/ Year 3 twins), the exclusions, and a Gaps section per module.

Usage: python3 index.py   (reads all three asu-y*-sources.json; run after
manifest.py --year y1/y2/y3 have all produced their output)
"""
import collections
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from asu_config import OUTDIR, YEARS, MODULE_FOLDERS, KNOWN_KIND_FOLDERS

OUT = os.path.join(OUTDIR, "README.md")

EXAM_TYPES = ["EOM", "Final", "Formative", "Essay", "MCQ bank", "Practical exam", "Checklist"]


def load_all():
    docs = {}
    for yk, cfg in YEARS.items():
        p = os.path.join(OUTDIR, cfg["outName"])
        if os.path.exists(p):
            docs[yk] = json.load(open(p))
    return docs


def main():
    docs = load_all()
    if not docs:
        print("no asu-y*-sources.json found in " + OUTDIR, file=sys.stderr)
        sys.exit(1)

    L = []
    w = L.append
    total = sum(d["count"] for d in docs.values())

    w("# Ain Shams — Years 1-3 source manifest\n")
    gens = sorted(set(d["generatedOn"] for d in docs.values()))
    w(f"Generated {', '.join(gens)}. **{total} files** across "
      f"{len(docs)} year manifest(s). Machine-readable copies: "
      + ", ".join(f"[`{YEARS[yk]['outName']}`]({YEARS[yk]['outName']})" for yk in docs) + ".\n")
    w("Every file in the corpus has exactly one row. moduleId is filled where the catalogue lane\n"
      "has minted an ID (`scripts/asu/intake/asu_config.py:MODULE_FOLDERS`); a null moduleId means\n"
      "the folder has not been assigned one yet, not that the file is unclassified.\n")

    # ---- By year x module ----
    w("## By year x module\n")
    w("| Year | Module folder | moduleId | Files | Lectures | Practical | Questions | Assessments "
      "| Dept Books | Native text | No text layer | n/a |")
    w("|---|---|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|")
    for yk, d in docs.items():
        by_mod = collections.defaultdict(list)
        for r in d["sources"]:
            by_mod[r["moduleFolder"]].append(r)
        for mf in sorted(by_mod, key=lambda x: (x or "")):
            rows = by_mod[mf]
            if mf == "Administration":
                continue
            kc = collections.Counter(r["kindFolder"] for r in rows)
            tl = collections.Counter(r["textLayer"] for r in rows)
            mod_id = rows[0]["moduleId"] or "—"
            w(f"| {d['yearId']} | {mf} | `{mod_id}` | {len(rows)} | {kc['Lectures']} | {kc['Practical']} "
              f"| {kc['Questions']} | {kc['Assessments']} | {kc['Department Books']} "
              f"| {tl['native']} | {tl['none']} | {tl['n/a']} |")

    # ---- Assessments by exam type ----
    w("\n## Assessments by exam type, per module\n")
    w("Exam type is derived from filename/folder tokens only (EOM, MCQs -, Formative, essay, final,\n"
      "assessment, Checklist) — see `classify.py`. A row with no exam type is not necessarily wrong;\n"
      "it may be a lecture, note, or unlabelled question set.\n")
    w("| Year | Module folder | " + " | ".join(EXAM_TYPES) + " | (none) |")
    w("|---|---|" + "--:|" * (len(EXAM_TYPES) + 1))
    for yk, d in docs.items():
        by_mod = collections.defaultdict(list)
        for r in d["sources"]:
            if r["moduleFolder"] == "Administration":
                continue
            by_mod[r["moduleFolder"]].append(r)
        for mf in sorted(by_mod, key=lambda x: (x or "")):
            rows = by_mod[mf]
            c = collections.Counter(r["examType"] for r in rows)
            w(f"| {d['yearId']} | {mf} | " + " | ".join(str(c[t]) for t in EXAM_TYPES) + f" | {c[None]} |")

    # ---- Processing state ----
    w("\n## Text layer and OCR probing\n")
    for yk, d in docs.items():
        rows = d["sources"]
        tl = collections.Counter(r["textLayer"] for r in rows)
        ps = collections.Counter(r["processingStatus"] for r in rows)
        probe_status = collections.Counter(r["probeStatus"] for r in rows if r["probeStatus"])
        w(f"- **{d['yearId']}**: {tl['native']} native, {tl['none']} no text layer (`ocr_required`), "
          f"{tl['n/a']} n/a (non-PDF). `ocr_required`+images: {ps['ocr_required']}. "
          f"Page-1 OCR probe outcomes: "
          + (", ".join(f"{v} {k}" for k, v in probe_status.items()) if probe_status else "none probed") + ".")
    timeouts = [(d["yearId"], r["corpusRelativePath"]) for d in docs.values() for r in d["sources"]
                if r["probeStatus"] == "skipped_timeout"]
    if timeouts:
        w("\nProbe timeouts (30s cap, left for a later full OCR pass):\n")
        for yid, p in timeouts:
            w(f"- `{yid}` — `{p}`")
    ctrl = [(d["yearId"], r["corpusRelativePath"]) for d in docs.values() for r in d["sources"]
            if r["controlCharDetected"]]
    if ctrl:
        w(f"\n**{len(ctrl)} files carry a U+0001 control-character run in their extracted text** "
          "(the false-native case SHARED-TOOLCHAIN.md warns about) — all were correctly kept out of "
          "`native` by the word-forming-ratio guard, not by character count:\n")
        for yid, p in ctrl:
            w(f"- `{yid}` — `{p}`")

    # ---- Duplicates and cross-year twins ----
    w("\n## Duplicates within and across years\n")
    w("Two different kinds, kept separate because they need different handling: **exact** "
      "duplicates share bytes (`duplicateOf`/`twinOf`, sha256); **name twins** share a "
      "normalised title and page count but NOT bytes (`nameTwinOf`) — a re-scan, a "
      "CamScanner copy, or a \"Copy of ...\" re-export. Name twins are flagged only; "
      "nothing is dropped or excluded on that basis, per the orchestrator's instruction "
      "(citing the Alexandria lane's finding that 0/20 sampled re-exports were byte-identical) "
      "— the extraction lane decides which copy to read.\n")
    all_rows = [(d["yearId"], r) for d in docs.values() for r in d["sources"]]
    dup_rows = [(y, r) for y, r in all_rows if r.get("duplicateOf")]
    twin_rows = [(y, r) for y, r in all_rows if r.get("twinOf")]
    near_rows = [(y, r) for y, r in all_rows if r.get("nameTwinOf")]
    w(f"{len(dup_rows)} rows share their sha256 with at least one other file (any year, **exact** "
      f"duplicate); {len(twin_rows)} of those are specifically **cross-year twins** (`twinOf` "
      f"populated). Separately, {len(near_rows)} rows have a **name twin** — different bytes, "
      "matching normalised title and page count.\n")
    w("| Year | Exact duplicates | Cross-year twins | Name twins |")
    w("|---|--:|--:|--:|")
    for yk, d in docs.items():
        rows = d["sources"]
        w(f"| {d['yearId']} | {sum(1 for r in rows if r['duplicateOf'])} "
          f"| {sum(1 for r in rows if r['twinOf'])} | {sum(1 for r in rows if r['nameTwinOf'])} |")
    twin_by_pair = collections.Counter()
    for y, r in twin_rows:
        for t in r["twinOf"]:
            pair = tuple(sorted([y, t["yearId"]]))
            twin_by_pair[pair] += 1
    if twin_by_pair:
        w("| Year pair | Twin rows (row-count, each side counted) |")
        w("|---|--:|")
        for pair, n in sorted(twin_by_pair.items()):
            w(f"| {pair[0]} <-> {pair[1]} | {n} |")
    focus_modules = {"Central Nervous System", "Endocrine System", "Special Senses", "Research Methodology"}
    focus_twins = [(y, r) for y, r in twin_rows if r["moduleFolder"] in focus_modules]
    w(f"\nOf those, **{len(focus_twins)} rows** are in the four modules LANE-BRIEF.md §3 names as the "
      "Year 2 Term 2 / Year 3 curriculum-move candidates (CNS, Endocrine, Special Senses, Research "
      "Methodology):\n")
    by_mod_focus = collections.Counter(r["moduleFolder"] for y, r in focus_twins)
    for mf, n in sorted(by_mod_focus.items()):
        w(f"- `{mf}`: {n} rows")

    # ---- Name-twin groups: preferred copy vs the obvious-by-filename choice ----
    w("\n### Name twins: where the readable copy is not the obvious one\n")
    w("`twinPreferred` ranks native text layer over none, then larger page count, then no "
      "\"Copy of\"/`(1)`/CamScanner marker in the filename — chosen for readability, not looks. "
      "Below: every name-twin group where that pick differs from the file a human would grab "
      "just going by the cleanest-looking filename (no copy marker). This is exactly the shape "
      "of the Alexandria finding — the re-exported, cleaner-looking copy is often the one that "
      "lost its text layer.\n")
    groups = {}
    for y, r in near_rows:
        key = tuple(sorted([r["sourceId"]] + [t["sourceId"] for t in r["nameTwinOf"]]))
        groups.setdefault(key, {})[r["sourceId"]] = (y, r)
    mismatches = []
    for key, members in groups.items():
        no_marker = [sid for sid, (_, r) in members.items()
                     if not re.search(r"copy\s+of|\(\s*\d+\s*\)|camscanner", r["fileName"], re.I)]
        human_pick = sorted(no_marker or members.keys(),
                             key=lambda sid: members[sid][1]["corpusRelativePath"])[0]
        preferred = next(sid for sid, (_, r) in members.items() if r["twinPreferred"])
        if preferred != human_pick:
            mismatches.append((key, members, human_pick, preferred))
    if mismatches:
        w(f"**{len(mismatches)} of {len(groups)} name-twin groups disagree.**\n")
        for key, members, human_pick, preferred in mismatches:
            w("")
            for sid, (y, r) in sorted(members.items(), key=lambda kv: kv[0] != preferred):
                tag = []
                if sid == preferred:
                    tag.append("**preferred**")
                if sid == human_pick:
                    tag.append("*looks right by filename*")
                tagstr = f" ({', '.join(tag)})" if tag else ""
                w(f"- `{y}` `{r['corpusRelativePath']}` — textLayer={r['textLayer']}, "
                  f"pages={r['pageCount']}{tagstr}")
    else:
        w(f"All {len(groups)} name-twin groups agree — the cleanest-looking filename is also the "
          "more readable copy in this corpus.\n")

    # ---- Exclusions ----
    w("\n## Exclusions\n")
    exc = collections.Counter((d["yearId"], r["exclusionReason"]) for d in docs.values() for r in d["sources"]
                               if r["exclusionReason"])
    w("| Year | Reason | Rows |")
    w("|---|---|--:|")
    for (yid, reason), n in sorted(exc.items()):
        w(f"| {yid} | `{reason}` | {n} |")
    old_kept = [(d["yearId"], r["corpusRelativePath"]) for d in docs.values() for r in d["sources"]
                if r["oldSystemExcluded"]]
    w(f"\n**{len(old_kept)} files carry an `[old]` tag and are recorded (`oldSystemExcluded: true`) but "
      "NOT excluded** — LANE-BRIEF.md: record, do not exclude. They remain normal rows with whatever "
      "exclusionReason (if any) their kind/module would otherwise carry; a later authoring lane decides "
      "whether the tag means superseded or simply an earlier revision of the same material.\n")

    # ---- Vocabulary check ----
    w("\n## Folder-name vocabulary check\n")
    unknown_kinds = collections.Counter((d["yearId"], r["kindFolder"]) for d in docs.values() for r in d["sources"]
                                         if r["kindFolder"] and r["kindFolder"] not in KNOWN_KIND_FOLDERS)
    if unknown_kinds:
        w("Kind folders seen that are not in `KNOWN_KIND_FOLDERS` (still recorded verbatim on every row, "
          "just flagged here for review):\n")
        for (yid, kf), n in sorted(unknown_kinds.items()):
            w(f"- {yid} `{kf}`: {n} files")
    else:
        w("No kind folder outside `KNOWN_KIND_FOLDERS` was seen.\n")
    unmapped_mods = collections.Counter((d["yearId"], r["moduleFolder"]) for d in docs.values() for r in d["sources"]
                                         if r["moduleFolder"] and r["moduleId"] is None
                                         and r["moduleFolder"] != "Administration")
    if unmapped_mods:
        w("\nModule folders with no `moduleId` in `MODULE_FOLDERS` (should be empty once the catalogue "
          "table is fully applied):\n")
        for (yid, mf), n in sorted(unmapped_mods.items()):
            w(f"- {yid} `{mf}`: {n} files")

    # ---- Gaps, per module ----
    w("\n## Gaps\n")
    w("What the Telegram fetch lane should go looking for: modules with no assessment paper at all, no "
      "MCQ bank, no department book, or no practical material.\n")
    w("| Year | Module folder | Has assessment | Has MCQ bank | Has dept book | Has practical |")
    w("|---|---|:--:|:--:|:--:|:--:|")
    gap_lines = []
    for yk, d in docs.items():
        by_mod = collections.defaultdict(list)
        for r in d["sources"]:
            if r["moduleFolder"] == "Administration":
                continue
            by_mod[r["moduleFolder"]].append(r)
        for mf in sorted(by_mod, key=lambda x: (x or "")):
            rows = by_mod[mf]
            has_assess = any(r["kindFolder"] == "Assessments" or r["examType"] for r in rows)
            has_mcq = any(r["examType"] == "MCQ bank" for r in rows)
            has_book = any(r["kindFolder"] == "Department Books" for r in rows)
            has_prac = any(r["kindFolder"] == "Practical" or r["examType"] == "Practical exam" for r in rows)
            mark = lambda b: "yes" if b else "**NO**"
            w(f"| {d['yearId']} | {mf} | {mark(has_assess)} | {mark(has_mcq)} | {mark(has_book)} | {mark(has_prac)} |")
            if not (has_assess and has_mcq and has_book and has_prac):
                missing = [n for n, b in (("assessment", has_assess), ("MCQ bank", has_mcq),
                                          ("department book", has_book), ("practical material", has_prac)) if not b]
                gap_lines.append(f"- **{d['yearId']} / {mf}**: missing " + ", ".join(missing))
    if gap_lines:
        w("\nModules with at least one gap:\n")
        for line in gap_lines:
            w(line)

    open(OUT, "w").write("\n".join(L) + "\n")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
