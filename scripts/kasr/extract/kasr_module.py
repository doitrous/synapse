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


def manifest_sources():
    with open(MANIFEST, encoding="utf-8") as fh:
        return json.load(fh)["sources"]


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
