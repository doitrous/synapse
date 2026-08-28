#!/usr/bin/env python3
"""Module selection and output paths, shared by the Helwan extractors.

Copied from `scripts/kasr/extract/kasr_module.py` at commit
09494c324529a1b68a57cdf662d81890d7d72397, then changed for this corpus:

Twelve Helwan modules will eventually be extracted through this one
`scripts/helwan/` directory, so every extractor here takes `--module` — and,
unlike the Kasr version, there is **no default**. Kasr's default kept writing
101 ISK's results to the unprefixed paths because they were already committed
there; nothing here has been extracted yet, so there is no first module that
gets to own the bare directory. Omitting `--module` is a mistake, not a
convenience, and this raises rather than silently picking one.

Every module writes into `extract/<module-slug>/`, always, so two lanes running
at the same time cannot overwrite each other's results — or, worse, each
other's resumable caches, where a half-mixed `parts/` directory would not
error, it would just quietly produce a corpus that is two modules glued
together.
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Helwan-Source-Imports/manifest/helwan-y1-3-sources.json")


def module_slug(module):
    """`GIT 301` -> `GIT-301`."""
    return module.replace(" ", "-")


def out_dir(module):
    """The directory this module's results and caches belong in.

    Always `extract/<module-slug>/` — there is no unprefixed default here, so
    no module can accidentally write into `scripts/helwan/extract/` itself.
    """
    return os.path.join(HERE, module_slug(module))


def out_path(module, *parts):
    """Path to one of this module's outputs, creating the directory it lives in."""
    path = os.path.join(out_dir(module), *parts)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    return path


def parse_module(argv, default=None):
    """Pull `--module X` (or `--module=X`) out of argv.

    Unlike the Kasr version, `default` is `None` and staying `None` is a
    `SystemExit`: every Helwan extraction names its module explicitly, because
    there is no module here entitled to be the unstated one.
    """
    module, rest, i = default, [], 0
    while i < len(argv):
        arg = argv[i]
        if arg == "--module":
            if i + 1 >= len(argv):
                raise SystemExit('--module needs a module id, e.g. --module "GIT 301"')
            module, i = argv[i + 1], i + 2
            continue
        if arg.startswith("--module="):
            module, i = arg.split("=", 1)[1], i + 1
            continue
        rest.append(arg)
        i += 1
    if module is None:
        raise SystemExit('--module is required, e.g. --module "GIT 301" — there is no default module here')
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

    Kasr found at least one manifest row claiming `native` for a file that
    yields nothing to pdftotext, so the fallback is not belt-and-braces — it is
    covering for a wrong row. `used` is "native" or "ocr". Across lanes the
    printed set becomes a manifest patch list; patching the manifest is a
    separate job.
    """
    declared = source.get("textLayer")
    expected = "native" if declared == "native" else "ocr"
    if used != expected:
        print("TEXTLAYER  %s manifest textLayer=%r, extraction used %s  %s"
              % (source.get("sourceId"), declared, used, source.get("fileName")),
              flush=True)
