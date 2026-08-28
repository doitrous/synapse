#!/usr/bin/env python3
"""Reuse `pagetext.py`'s OCR in `mcq.py`, instead of paying for it twice.

    python3 scripts/kasr/extract/adopt_pagetext.py --module "104 CPS"

Both scripts cache page text, and both used to cache it in `extract/pagetext/`,
but they do not agree on what a record looks like. `pagetext.py` writes
`{mode, pages, emptyPages}`; `mcq.py` writes `{method, pagesRead, capped}`. A
run that loaded the other's records would not fail — it would mislabel every
page it read, which is worse.

`mcq.py` now caches per module, so the shapes no longer collide. The cost is
that a module whose pages `pagetext.py` has already OCR'd would OCR them again:
for `104 CPS` that is 665 pages of tesseract for text already sitting on disk.

This translates one into the other. It copies nothing it cannot map, and it
never overwrites a record `mcq.py` produced itself, because `mcq.py`'s own
extraction is the more specific of the two — it knows about page caps and
answer-key files, and this does not.

For the default module the source and destination are the **same file**:
`101 ISK` writes to the unprefixed `extract/pagetext/`, which is also the shared
directory this reads. Converting there is a real operation — it is how a record
`pagetext.py` produced becomes one `mcq.py` can read — but it is destructive and
cannot be undone, so it takes `--in-place` as well as `--force`. Without it, a
`--force` run aimed at the default module would rewrite every `pagetext.py`
record in the shared cache into a shape `pagetext.py` itself then fails on.
"""
import json
import os
import sys

from kasr_module import DEFAULT_MODULE, manifest_sources, module_sources, \
    out_path, parse_module


def main(argv):
    module, rest = parse_module(argv)
    force = "--force" in rest
    in_place = "--in-place" in rest
    shared = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pagetext")

    # The default module reads and writes one directory. Overwriting there is
    # sometimes what you want, but never by accident.
    if module == DEFAULT_MODULE and force and not in_place:
        raise SystemExit(
            'refusing: --force on %s rewrites the shared cache in place, because\n'
            'the default module has no namespaced directory to write into. Every\n'
            'pagetext.py record it touches becomes one pagetext.py can no longer\n'
            'read. Pass --in-place as well if that is genuinely what you mean.'
            % DEFAULT_MODULE)

    adopted = skipped = missing = 0
    excluded = 0

    for entry in module_sources(module):
        sid = entry["sourceId"]
        src = os.path.join(shared, sid + ".json")
        if not os.path.exists(src):
            missing += 1
            continue

        doc = json.load(open(src, encoding="utf-8"))
        # Only a pagetext.py record can be translated. Anything else in that
        # directory is already in mcq.py's shape and needs no help.
        if "mode" not in doc or "pages" not in doc:
            skipped += 1
            continue

        dest = out_path(module, "pagetext", sid + ".json")
        if os.path.exists(dest) and not force:
            skipped += 1
            continue

        pages = doc["pages"]
        with open(dest, "w", encoding="utf-8") as fh:
            json.dump({
                "pages": pages,
                # `mode` is native|ocr; mcq.py calls the native case `text`,
                # and grades an `ocr` page more suspiciously. Preserve which
                # one it was: dropping that would silently upgrade the
                # confidence of every OCR'd question.
                "method": "ocr" if doc["mode"] == "ocr" else "text",
                "pagesRead": len(pages),
                # pagetext.py reads every page; it has no cap to report.
                "capped": False,
                "adoptedFrom": "pagetext.py",
            }, fh, ensure_ascii=False)
        adopted += 1

    # `module_sources` drops rows carrying an exclusionReason. Report how many,
    # so a source that was deliberately excluded does not look like one nobody
    # got round to caching.
    excluded = sum(1 for s in manifest_sources()
                   if (s.get("moduleId") == module or s.get("secondaryModule") == module)
                   and s.get("exclusionReason"))

    print(json.dumps({"module": module, "adopted": adopted, "skipped": skipped,
                      "notCached": missing, "excludedFromManifest": excluded}, indent=1))


if __name__ == "__main__":
    main(sys.argv[1:])
