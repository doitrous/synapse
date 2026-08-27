#!/usr/bin/env python3
"""Reuse `pagetext.py`'s OCR in `mcq.py`, instead of paying for it twice.

    python3 scripts/asu/extract/adopt_pagetext.py --module "ASU-CVS"

Copied from `scripts/kasr/extract/adopt_pagetext.py`. Both scripts cache page
text, and do not agree on what a record looks like: `pagetext.py` writes
`{mode, pages, emptyPages}`; `mcq.py` writes `{method, pagesRead, capped}`. A
run that loaded the other's records would not fail — it would mislabel every
page it read, which is worse. This translates one into the other, and never
overwrites a record `mcq.py` produced itself.

Simpler than Kasr's copy in one respect: Kasr's `101 ISK` writes both
scripts' caches to the *same* unprefixed `extract/pagetext/` directory, which
is why that file needs a `--in-place` guard against `--force` silently
rewriting `pagetext.py`'s own shared cache into a shape it can no longer
read. Every Ain Shams module writes to its own namespaced directory
(`out_path(module, ...)`), so source and destination are never the same
file and that guard does not apply here.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import asu_module  # noqa: E402


def main(argv):
    module, rest = asu_module.parse_module(argv)
    force = "--force" in rest
    shared = os.path.join(HERE, "pagetext")

    adopted = skipped = missing = 0

    for entry in asu_module.module_sources(module):
        sid = entry["sourceId"]
        src = os.path.join(shared, sid + ".json")
        if not os.path.exists(src):
            missing += 1
            continue

        doc = json.load(open(src, encoding="utf-8"))
        if "mode" not in doc or "pages" not in doc:
            skipped += 1
            continue

        dest = asu_module.out_path(module, "pagetext", sid + ".json")
        if os.path.exists(dest) and not force:
            skipped += 1
            continue

        pages = doc["pages"]
        with open(dest, "w", encoding="utf-8") as fh:
            json.dump({
                "pages": pages,
                "method": "ocr" if doc["mode"] == "ocr" else "text",
                "pagesRead": len(pages),
                "capped": False,
                "adoptedFrom": "pagetext.py",
            }, fh, ensure_ascii=False)
        adopted += 1

    excluded = sum(1 for s in asu_module.manifest_sources()
                   if (s.get("moduleId") == module or s.get("secondaryModule") == module)
                   and s.get("exclusionReason"))

    print(json.dumps({"module": module, "adopted": adopted, "skipped": skipped,
                      "notCached": missing, "excludedFromManifest": excluded}, indent=1))


if __name__ == "__main__":
    main(sys.argv[1:])
