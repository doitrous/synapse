#!/usr/bin/env python3
"""Per-page text for any Alexandria manifest source, native or OCR, cached on disk.

Copied from `scripts/kasr/extract/pagetext.py` at commit `cb82847` (see
`git log -1 --format=%h -- scripts/kasr/extract/pagetext.py`) and parametrised for the
Alexandria corpus per LANE-BRIEF.md §4. Do not edit `scripts/kasr/`; this is the Alexandria
copy and it is the only one this lane touches.

Differences from the Kasr original:
  - MANIFEST is not one file. It resolves a sourceId over all four Alexandria manifests
    (`docs/Alexandria-Source-Imports/manifest/au-{y1,y2,y3,general}-sources.json`), because a
    lane only knows a sourceId or a moduleId, never which of the four files it lives in.
  - CACHE is `scripts/alexandria/pagetext/` (gitignored — confirmed with
    `git check-ignore scripts/alexandria/pagetext/`, matches the existing pattern
    `scripts/alexandria/pagetext/` in .gitignore for `scripts/alexandria/intake/`'s cache).
  - `--module "AU-MED-102"` filters on the manifest's `moduleId` (not `secondaryModule` —
    this corpus's departments are reliable per the manifest README, so there is no secondary-
    module concept here).
  - `--category <name>` filters on the manifest's `category` (e.g. "End of Module paper").
  - `--department <folder>` filters on the manifest's `departmentFolder`.
  - Twin handling: this corpus's `[from Alexandria University Updated]` twins are NOT
    byte-identical (manifest README, "Deduplication reality") and must not both be read as if
    they were independent sources. When sources are selected via `--module`/`--category`/
    `--department`, a source with `nameTwinOf` set and `twinPreferred` false is skipped (its
    preferred twin will be extracted instead, or already has been). A sourceId named
    explicitly on the command line is always extracted, preferred or not — the brief's "unless
    named explicitly" clause.

  - `--layout`: a second, explicit `pdftotext -layout` extraction, cached beside — never
    over — the plain `<sourceId>.json`, as `<sourceId>.layout.json` with `mode:
    "native-layout"`. Added for a failure the terminology lane found: on some native-text
    banks (two AU-MED-102 "Terminology MCQ" files), the answer block's letters extract in
    the wrong column order. `native_page` below has always passed `-layout` already, so
    this flag's own extraction is mechanically the same call — what it adds is a recorded,
    diffable answer to "does `-layout` change anything for this file", via
    `identicalToPlainCache` in the written JSON, instead of a lane re-deriving that by eye
    each time. For the two files that motivated this flag, the honest answer is no: every
    `pdftotext` invocation tried (`-layout`, `-raw`, `-fixed`, `-colspacing`) produced
    byte-identical output, because `pdftotext -bbox-layout` on the affected pages shows the
    embedded text layer's own bounding boxes collapsed into a sliver near the page origin,
    regardless of the true page size — a baked-in prior OCR (CamScanner, per the
    terminology lane's own note) with corrupted position metadata that no `pdftotext` flag
    can reflow, because the flag only rearranges words using coordinates that are already
    wrong. See `scripts/alexandria/extract/README.md`'s "Scrambled answer-key columns"
    section for the full finding and what a lane does instead.

Usage:
    python3 scripts/alexandria/extract/pagetext.py <sourceId> [<sourceId> ...]
    python3 scripts/alexandria/extract/pagetext.py --module "AU-MED-102" [--category "End of Module paper"] [--department Anatomy] [--tier-max 5]
    python3 scripts/alexandria/extract/pagetext.py --layout <sourceId> [<sourceId> ...]   # diagnostic -layout re-extraction, see above
    python3 scripts/alexandria/extract/pagetext.py --reprobe        # audit what is already cached

A page that OCRs to nothing is written as an empty string and counted, because a paper that
extracted to nothing is not a paper without questions — the count is what tells a later reader
the difference.

Each cache file records `mode` and `modeReason`, so which files fell back to OCR and why is
auditable across lanes rather than re-derived by each of them.
"""
import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
MANIFEST_DIR = os.path.join(REPO, "docs/Alexandria-Source-Imports/manifest")
MANIFESTS = [
    os.path.join(MANIFEST_DIR, "au-y1-sources.json"),
    os.path.join(MANIFEST_DIR, "au-y2-sources.json"),
    os.path.join(MANIFEST_DIR, "au-y3-sources.json"),
    os.path.join(MANIFEST_DIR, "au-general-sources.json"),
]
CACHE = os.path.join(HERE, "..", "pagetext")
CACHE = os.path.normpath(CACHE)


def sources():
    """Resolve every sourceId over all four Alexandria manifests.

    sourceId is content-addressed (sha256-derived) and each of the four manifests covers a
    disjoint top-level corpus folder (y1/y2/y3/General Resources), so a collision would mean
    the exact same file content was filed under two different top-level folders. None is
    expected; if one shows up, the later manifest in the MANIFESTS list wins and a warning is
    printed so a lane can notice rather than silently extract the wrong entry.
    """
    by_id = {}
    for path in MANIFESTS:
        if not os.path.exists(path):
            print("WARN  manifest missing: %s" % path, file=sys.stderr)
            continue
        with open(path, encoding="utf-8") as fh:
            data = json.load(fh)
        for s in data["sources"]:
            sid = s["sourceId"]
            if sid in by_id and by_id[sid]["absolutePath"] != s["absolutePath"]:
                print("WARN  sourceId collision across manifests: %s (%s vs %s)"
                      % (sid, by_id[sid]["absolutePath"], s["absolutePath"]), file=sys.stderr)
            by_id[sid] = s
    return by_id


# A word: three or more letters in a row. Counting these rather than counting
# characters is the whole point — see `readability`.
WORD = re.compile(r"[^\W\d_]{3,}", re.UNICODE)


def readability(text):
    """How much of this looks like language, rather than merely like bytes.

    The first version of this guard asked whether page 1 held at least twenty
    non-whitespace characters. That is a test of length, and a broken font
    encoding passes it comfortably: a pathology practical book in the Kasr corpus
    extracts 6,075 non-whitespace characters that are *every one* U+0001, so a
    page measures 144 characters and reads as healthy native text. Nothing
    downstream could tell that from a real page — `emptyPages` stays empty,
    because no page is empty — and a lane reading the shared cache concludes
    the book is 12 pages of unusable text and skips it. OCR of the same pages
    returns the captions; the content was there all along.

    So the question is the ratio, and whether there are words at all.
    """
    stripped = [c for c in text if not c.isspace()]
    if not stripped:
        return {"chars": 0, "wordChars": 0.0, "control": 0.0, "words": 0}
    word_chars = sum(1 for c in stripped
                     if not unicodedata.category(c).startswith(("C", "S")))
    control = sum(1 for c in stripped if unicodedata.category(c) == "Cc")
    return {
        "chars": len(stripped),
        "wordChars": round(word_chars / len(stripped), 3),
        "control": round(control / len(stripped), 3),
        "words": len(WORD.findall(text)),
    }


def native_page(pdf, page):
    r = subprocess.run(["pdftotext", "-layout", "-f", str(page), "-l", str(page), pdf, "-"],
                       capture_output=True, timeout=180)
    return r.stdout.decode("utf-8", "replace")


def native_page_layout(pdf, page):
    """Explicit `pdftotext -layout` invocation for the `--layout` diagnostic mode.

    Mechanically identical to `native_page` above (which already always passes `-layout`)
    — kept as its own function, rather than an alias, so `--layout` keeps meaning "the
    -layout invocation" even if a future change to `native_page`'s default flags diverges
    from it.
    """
    r = subprocess.run(["pdftotext", "-layout", "-f", str(page), "-l", str(page), pdf, "-"],
                       capture_output=True, timeout=180)
    return r.stdout.decode("utf-8", "replace")


def ocr_page(pdf, page, dpi=200, psm="6"):
    with tempfile.TemporaryDirectory() as td:
        stub = os.path.join(td, "p")
        try:
            r = subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(dpi),
                                "-png", "-singlefile", pdf, stub],
                               capture_output=True, timeout=300)
            png = stub + ".png"
            if r.returncode != 0 or not os.path.exists(png):
                return ""
            r = subprocess.run(["tesseract", png, "stdout", "-l", "eng+ara", "--psm", psm],
                               capture_output=True, timeout=420)
            return r.stdout.decode("utf-8", "replace")
        except subprocess.TimeoutExpired:
            return ""


def _valid_cache(path, entry):
    """Is this cache file actually one of ours, for this source, at this page count?

    Found necessary the hard way: on 2026-08-22 something else — not this tool, not
    `ocr_worker.py` (checked; that one only uses this directory as OCR scratch space) —
    bulk-wrote 3,397 files under `scripts/alexandria/pagetext/*.json` in a four-second
    window with an entirely different, incompatible shape: `{sourceId, sha256, text}`,
    one flat string per document, no `pages`, no `mode`. Every one of this lane's own
    151 real extractions for its four priority modules was silently replaced. Before this
    check existed, `extract()`/`extract_layout()` would `json.load` a file like that and
    hand it back as if it were a real cache hit — no error, just a `KeyError` two calls
    later for whoever tried `doc["pages"]`, or worse, no error at all for a caller that
    only reads `doc["sourceId"]`. This is the guard: a cache hit must actually look like
    ours (has `pages`, and the right number of them) before it is trusted; anything else
    is treated as no cache at all, and rebuilt.
    """
    try:
        doc = json.load(open(path, encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None
    n = entry.get("pageCount") or 0
    if not isinstance(doc.get("pages"), list) or (n and len(doc["pages"]) != n):
        return None
    return doc


def extract(entry, force=False, workers=6):
    sid, pdf = entry["sourceId"], entry["absolutePath"]
    out = os.path.join(CACHE, sid + ".json")
    if os.path.exists(out) and not force:
        cached = _valid_cache(out, entry)
        if cached is not None:
            return cached
        print("WARN  %s: cache file exists but is not in this tool's shape "
              "(or wrong page count) — rebuilding" % sid, file=sys.stderr)
    n = entry.get("pageCount") or 0
    if not n or not os.path.exists(pdf):
        return None

    # The manifest's textLayer is a claim about the file, and the file wins.
    #
    # Probed on three pages rather than one, spread through the document: page 1
    # is often a cover or a scanned title page even where the body is native,
    # and judging a 167-page book on it gets the answer wrong in both
    # directions.
    mode = "native" if entry.get("textLayer") == "native" else "ocr"
    reason = "manifest textLayer=%s" % entry.get("textLayer")
    if mode == "native":
        probes = sorted({1, max(1, n // 2), max(1, n - 1)})
        best = max((readability(native_page(pdf, p)) for p in probes),
                   key=lambda r: (r["words"], r["wordChars"]))
        # Twelve words is deliberately low: a legitimately sparse page — a
        # section divider, a full-page plate — should not condemn the file.
        # What it catches is a page with no words at all, which is what a
        # broken encoding produces and what a length test cannot see.
        if best["words"] < 12 or best["wordChars"] < 0.5:
            mode, reason = "ocr", (
                "manifest said native, but the best of pages %s has %d words and "
                "%.0f%% word-forming characters (%.0f%% control) — not readable text"
                % (probes, best["words"], best["wordChars"] * 100, best["control"] * 100))
        else:
            reason = ("manifest textLayer=native, confirmed: %d words on the best of pages %s"
                      % (best["words"], probes))

    fn = native_page if mode == "native" else ocr_page
    with ThreadPoolExecutor(max_workers=1 if mode == "native" else workers) as pool:
        pages = list(pool.map(lambda p: fn(pdf, p), range(1, n + 1)))

    whole = readability("".join(pages))
    doc = {
        "sourceId": sid,
        "file": entry["corpusRelativePath"],
        "moduleId": entry.get("moduleId"),
        "category": entry.get("category"),
        "departmentFolder": entry.get("departmentFolder"),
        "mode": mode,
        "modeReason": reason,
        "manifestTextLayer": entry.get("textLayer"),
        "readability": whole,
        "pages": pages,
        "emptyPages": [i + 1 for i, t in enumerate(pages) if not t.strip()],
        # A page holding characters but no words. Distinct from an empty page:
        # empty means nothing extracted, this means something did and it is not
        # language. Both are findings; conflating them hides the second one.
        "unreadablePages": [i + 1 for i, t in enumerate(pages)
                            if t.strip() and readability(t)["words"] < 3],
    }
    os.makedirs(CACHE, exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False)
    return doc


def extract_layout(entry, force=False):
    """The `--layout` diagnostic: a second `pdftotext -layout` pass, cached separately.

    Never overwrites `<sourceId>.json` — this writes `<sourceId>.layout.json` and records
    `identicalToPlainCache` against whatever plain cache already exists, so the question
    "did -layout change anything here" has a written, diffable answer rather than one a
    lane has to re-derive by reading both files.
    """
    sid, pdf = entry["sourceId"], entry["absolutePath"]
    out = os.path.join(CACHE, sid + ".layout.json")
    if os.path.exists(out) and not force:
        cached = _valid_cache(out, entry)
        if cached is not None:
            return cached
    n = entry.get("pageCount") or 0
    if not n or not os.path.exists(pdf):
        return None

    with ThreadPoolExecutor(max_workers=1) as pool:
        pages = list(pool.map(lambda p: native_page_layout(pdf, p), range(1, n + 1)))

    # Compare against a *validated* plain cache only — an alien-shaped or wrong-page-count
    # file at <sourceId>.json is not "the plain cache", it is noise, and diffing against it
    # would report a meaningless "DIFFERS" (see `_valid_cache`'s docstring for exactly this
    # failure, hit for real while building this flag).
    plain_path = os.path.join(CACHE, sid + ".json")
    plain = _valid_cache(plain_path, entry) if os.path.exists(plain_path) else None
    identical = (plain["pages"] == pages) if plain is not None else None

    whole = readability("".join(pages))
    doc = {
        "sourceId": sid,
        "file": entry["corpusRelativePath"],
        "moduleId": entry.get("moduleId"),
        "category": entry.get("category"),
        "departmentFolder": entry.get("departmentFolder"),
        "mode": "native-layout",
        "modeReason": ("explicit `pdftotext -layout` re-extraction, requested to check "
                       "whether -layout reorders a scrambled answer-key column against the "
                       "plain cache"),
        "manifestTextLayer": entry.get("textLayer"),
        "readability": whole,
        "pages": pages,
        "emptyPages": [i + 1 for i, t in enumerate(pages) if not t.strip()],
        "unreadablePages": [i + 1 for i, t in enumerate(pages)
                            if t.strip() and readability(t)["words"] < 3],
        # None = no plain cache existed yet to compare against. True/False = it did.
        "identicalToPlainCache": identical,
    }
    os.makedirs(CACHE, exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False)
    return doc


def reprobe():
    """Audit every cached file for the failure the length guard used to miss."""
    names = [n for n in sorted(os.listdir(CACHE)) if n.endswith(".json")]
    suspect = 0
    for name in names:
        doc = json.load(open(os.path.join(CACHE, name), encoding="utf-8"))
        r = doc.get("readability") or readability("".join(doc["pages"]))
        broken = r["words"] < 12 or r["control"] > 0.2
        suspect += broken
        print("%-8s %-6s words=%-7d word-chars=%-6s control=%-6s %s%s"
              % ("SUSPECT" if broken else "ok", doc["mode"], r["words"], r["wordChars"],
                 r["control"], doc["file"],
                 "  <-- re-extract with --force" if broken else ""), flush=True)
    print("\n%d suspect of %d cached." % (suspect, len(names)))
    return suspect


def main(argv):
    if "--reprobe" in argv:
        sys.exit(1 if reprobe() else 0)
    by_id = sources()
    force = "--force" in argv
    layout = "--layout" in argv
    argv = [a for a in argv if a not in ("--force", "--layout")]

    def opt(name):
        return argv[argv.index(name) + 1] if name in argv else None

    if argv and argv[0] == "--module":
        module = opt("--module")
        category = opt("--category")
        department = opt("--department")
        tier_max = int(opt("--tier-max")) if "--tier-max" in argv else 9
        wanted = [s for s in by_id.values()
                  if s.get("moduleId") == module
                  and not s.get("exclusionReason")
                  and (s.get("sourceTier") or 9) <= tier_max
                  and s.get("fileType") == "pdf"]
        if category:
            wanted = [s for s in wanted if s.get("category") == category]
        if department:
            wanted = [s for s in wanted if s.get("departmentFolder") == department]
        # Twin handling: skip a non-preferred twin when the selection came from
        # --module/--category/--department (bulk), not from explicit sourceIds.
        before = len(wanted)
        wanted = [s for s in wanted
                  if s.get("twinPreferred", True) is not False or not s.get("nameTwinOf")]
        skipped_twins = before - len(wanted)
        if skipped_twins:
            print("SKIP  %d non-preferred twin(s) — read with an explicit sourceId if you need them"
                  % skipped_twins, flush=True)
        # Smallest first: a fast pass over the short papers tells you the
        # extractor is working before a 200-page book has finished.
        wanted.sort(key=lambda s: s.get("pageCount") or 0)
    else:
        wanted = [by_id[a] for a in argv if a in by_id]
        missing = [a for a in argv if a not in by_id]
        for m in missing:
            print("SKIP  %s (not found in any Alexandria manifest)" % m, flush=True)

    for entry in wanted:
        doc = extract_layout(entry, force=force) if layout else extract(entry, force=force)
        if doc is None:
            print("SKIP  %s (no pages or missing file) %s" % (entry["sourceId"], entry["fileName"]),
                  flush=True)
            continue
        suffix = ""
        if layout:
            same = doc.get("identicalToPlainCache")
            suffix = ("  [identical to plain cache — -layout changes nothing here]" if same
                       else "  [no plain cache to compare against]" if same is None
                       else "  [DIFFERS from plain cache]")
        print("%-6s %s %3dp %2d empty %2d unreadable  %s\n         %s%s"
              % (doc["mode"], doc["sourceId"], len(doc["pages"]), len(doc["emptyPages"]),
                 len(doc.get("unreadablePages", [])), entry["corpusRelativePath"],
                 doc.get("modeReason", ""), suffix), flush=True)


if __name__ == "__main__":
    main(sys.argv[1:])
