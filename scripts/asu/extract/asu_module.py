#!/usr/bin/env python3
"""Module selection and output paths, shared by the Ain Shams extractors.

Copied from `scripts/kasr/extract/kasr_module.py`. Two real differences:

1. **No default module.** Kasr's copy defaults to `101 ISK` because that
   module's results are already committed to the unprefixed paths and no
   Python extractor here has legacy output to preserve — LANE-BRIEF.md §2 is
   explicit that every Ain Shams result is module-namespaced from day one.
   So `--module` is required and every extractor refuses without it, per the
   lane brief's own instruction ("Python --module arguments stay; default
   must NOT be a Kasr module — require --module explicitly").
2. **The manifest is one of several, not one file.** Ain Shams has a manifest
   per year (`asu-y1-sources.json`, `asu-y2-…`, `asu-y3-…`), all under the
   same `manifest/` directory, so `manifest_sources()` reads every one that
   matches `asu-y<N>-sources.json` and merges them.
"""
import glob
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
MANIFEST_DIR = os.environ.get(
    "ASU_TOOLCHAIN_MANIFEST_DIR",
    os.path.join(REPO, "docs/Ain-Shams-Source-Imports/manifest"),
)


def module_slug(module):
    """`ASU-CNS-2` -> `ASU-CNS-2` (already hyphenated); spaces removed if a future module has any."""
    return module.replace(" ", "-")


def out_dir(module):
    """The directory this module's results and caches belong in. Always module-namespaced — no unprefixed fallback."""
    return os.path.join(HERE, module_slug(module))


def out_path(module, *parts):
    """Path to one of this module's outputs, creating the directory it lives in."""
    path = os.path.join(out_dir(module), *parts)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    return path


def parse_module(argv, default=None):
    """Pull `--module X` (or `--module=X`) out of argv.

    Unlike Kasr's copy, `default` is `None` and absence is fatal: this
    toolchain has no module a bare run should silently fall back to, and a
    fallback here is exactly the kind of "plausible but wrong" default the
    shared manual warns about repeatedly (see `TIER_PREFIX` in
    `build-batches.ts` for the TypeScript side of the same rule).
    """
    module, rest, i = default, [], 0
    while i < len(argv):
        arg = argv[i]
        if arg == "--module":
            if i + 1 >= len(argv):
                raise SystemExit('--module needs a module id, e.g. --module "ASU-CVS"')
            module, i = argv[i + 1], i + 2
            continue
        if arg.startswith("--module="):
            module, i = arg.split("=", 1)[1], i + 1
            continue
        rest.append(arg)
        i += 1
    if not module:
        raise SystemExit(
            "--module is required — Ain Shams has no default module. "
            'Pass one explicitly, e.g. --module "ASU-CVS".'
        )
    return module, rest


def manifest_sources():
    """Every source row across every `asu-y<N>-sources.json` manifest present."""
    pattern = os.path.join(MANIFEST_DIR, "asu-y*-sources.json")
    files = sorted(f for f in glob.glob(pattern) if re.match(r"^asu-y\d+-sources\.json$", os.path.basename(f)))
    if not files:
        raise SystemExit(
            'no "asu-y<N>-sources.json" manifest found under %s — the intake lane writes '
            "these; wait for at least one, or set ASU_TOOLCHAIN_MANIFEST_DIR for a test." % MANIFEST_DIR
        )
    sources = []
    for path in files:
        with open(path, encoding="utf-8") as fh:
            sources.extend(json.load(fh)["sources"])
    return sources


def module_sources(module, category=None, file_type=None, tier_max=9):
    """Manifest rows belonging to `module`, by pagetext.py's membership rule.

    A file can serve two modules, so membership is `moduleId` OR
    `secondaryModule`; rows the manifest has already ruled out are skipped.
    """
    rows = []
    for source in manifest_sources():
        if source.get("moduleId") != module and source.get("secondaryModule") != module:
            continue
        if source.get("exclusionReason"):
            continue
        if (source.get("sourceTier") or 9) > tier_max:
            continue
        if category is not None and source.get("sourceCategory") != category:
            continue
        if file_type is not None and source.get("fileType") != file_type:
            continue
        rows.append(source)
    return rows


def report_textlayer_fallback(source, used):
    """Print a source whose extraction disagreed with the manifest's `textLayer`.

    See Kasr's `kasr_module.py` for the fuller rationale — unchanged here.
    `used` is "native" or "ocr".
    """
    declared = source.get("textLayer")
    expected = "native" if declared == "native" else "ocr"
    if used != expected:
        print("TEXTLAYER  %s manifest textLayer=%r, extraction used %s  %s"
              % (source.get("sourceId"), declared, used, source.get("fileName")),
              flush=True)
