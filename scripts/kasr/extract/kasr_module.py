#!/usr/bin/env python3
"""Module selection and output paths, shared by the Kasr extractors.

Five Cairo University modules are being extracted at once through one
`scripts/kasr/` directory, so every extractor takes `--module` and defaults to
`101 ISK`.

The default keeps writing to the unprefixed paths, because 101's results are
already committed there and moving them is the 101 lane's job, not this one's.
Every other module writes into `extract/<module-slug>/`, so two lanes running at
the same time cannot overwrite each other's results — or, worse, each other's
resumable caches, where a half-mixed `parts/` directory would not error, it
would just quietly produce a corpus that is two modules glued together.
"""
import json
import os

DEFAULT_MODULE = "101 ISK"

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")

# Which manifest JSON a module's sources live in.
#
# One docs/Kasr-Source-Imports/manifest/kasr-y<N>-sources.json per intake year,
# covering every catalogue module across all five years (src/data/universities.ts,
# KAU_MODULES) — not only the years that currently have a manifest on disk, so
# this table does not need editing again on every new year's first script run.
#
# `manifest_for` is a pure lookup and does no I/O: it returns Year 3/4/5 paths
# just as readily as Year 1/2's, whether or not that year's manifest has been
# built yet. The existence check — and the loud failure — live in
# `manifest_sources`, which is where a path actually gets opened. That is a
# deliberate split: resolving *which* manifest a module belongs to and
# *whether that manifest exists yet* are different questions, and collapsing
# them here would make `manifest_for('205 NEU')` fail before a caller ever
# tries to read anything.
MODULE_YEAR = {
    "101 ISK": "y1", "102 INT": "y1", "103 BMS": "y1", "104 CPS": "y1", "108 INT": "y1",
    "205 NEU": "y2", "206 DIG": "y2", "207 END": "y2", "208 INT": "y2", "210 PAT": "y2", "213 PSY": "y2",
    "309 INF": "y3", "310 PAT": "y3", "314": "y3", "319": "y3", "327 MPE": "y3",
    "CLIN 3": "y3", "COMM 3": "y3", "ELEC 3": "y3",
    "PEDS 4": "y4", "OBGYN 4": "y4", "SURG 4": "y4", "IM 4": "y4", "PSY 4": "y4",
    "FM 4": "y4", "CM 4": "y4", "PALL 4": "y4", "RSCH 4": "y4",
    "SURG 5": "y5", "IM 5": "y5", "FM 5": "y5",
}


def manifest_for(module):
    """The manifest JSON this module's sources live in.

    A pure lookup — raises only if `module` is not a catalogue module at all.
    Does not check whether that year's manifest has actually been built;
    `manifest_sources` is what opens the file and is where that failure lives.
    """
    year = MODULE_YEAR.get(module)
    if year is None:
        raise SystemExit(f'"{module}" has no manifest year — add it to MODULE_YEAR in kasr_module.py')
    return os.path.join(REPO, "docs", "Kasr-Source-Imports", "manifest", f"kasr-{year}-sources.json")


def module_slug(module):
    """`104 CPS` -> `104-CPS`."""
    return module.replace(" ", "-")


def out_dir(module):
    """The directory this module's results and caches belong in."""
    return HERE if module == DEFAULT_MODULE else os.path.join(HERE, module_slug(module))


def out_path(module, *parts):
    """Path to one of this module's outputs, creating the directory it lives in."""
    path = os.path.join(out_dir(module), *parts)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    return path


def parse_module(argv, default=DEFAULT_MODULE):
    """Pull `--module X` (or `--module=X`) out of argv.

    Returns (module, remaining argv). Absent, the module is `101 ISK`, so every
    command that worked before this argument existed still works unchanged.
    """
    module, rest, i = default, [], 0
    while i < len(argv):
        arg = argv[i]
        if arg == "--module":
            if i + 1 >= len(argv):
                raise SystemExit('--module needs a module id, e.g. --module "104 CPS"')
            module, i = argv[i + 1], i + 2
            continue
        if arg.startswith("--module="):
            module, i = arg.split("=", 1)[1], i + 1
            continue
        rest.append(arg)
        i += 1
    return module, rest


def manifest_sources(module=None):
    """Rows from a manifest's `sources` array.

    With no `module`, reads the hardcoded `MANIFEST` constant — today's
    behaviour, for any caller that relies on the no-arg form. With a `module`,
    resolves the manifest that module's sources actually live in via
    `manifest_for`, so a Year 2 module's rows come from `kasr-y2-sources.json`
    rather than always from Year 1's.

    This is where a resolved path is actually opened, so it is also where a
    module whose year is real but whose manifest has not been generated yet
    fails — loudly, naming the module and the missing path, rather than a bare
    `FileNotFoundError` several frames from anything that named the module.
    """
    path = MANIFEST if module is None else manifest_for(module)
    if not os.path.exists(path):
        raise SystemExit(
            f'"{module}" maps to {path}, which does not exist yet. '
            "Build it from scripts/corpus-intake/ "
            "(see docs/Kasr-Source-Imports/manifest/README.md) before running this.")
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)["sources"]


def module_sources(module, category=None, file_type=None, tier_max=9):
    """Manifest rows belonging to `module`, by pagetext.py's membership rule.

    A file can serve two modules, so membership is `moduleId` OR
    `secondaryModule`; rows the manifest has already ruled out are skipped.
    """
    rows = []
    for source in manifest_sources(module):
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

    At least one manifest row claims `native` for a file that yields nothing to
    pdftotext, so the fallback is not belt-and-braces — it is covering for a
    wrong row. `used` is "native" or "ocr". Across the five lanes the printed
    set becomes a manifest patch list; patching the manifest is a separate job.
    """
    declared = source.get("textLayer")
    expected = "native" if declared == "native" else "ocr"
    if used != expected:
        print("TEXTLAYER  %s manifest textLayer=%r, extraction used %s  %s"
              % (source.get("sourceId"), declared, used, source.get("fileName")),
              flush=True)
