#!/usr/bin/env python3
"""Helper for extracting the teaching content of a module's Department Book.

    python3 scripts/asu/extract/deptbook.py --module "ASU-CVS" [--source-id ID] <command> [args]

Copied from `scripts/kasr/extract/deptbook.py`. Kasr's copy defaults to
module `101 ISK` and a hardcoded absolute path + a 43-entry `CHAPTERS_101`
physical-page map read off that one book's table of contents. Ain Shams has
no such legacy: `--module` is required, the book is always resolved from the
manifest (`resolve_book()` — already how Kasr's copy handles every module
that is not its default), and `CHAPTERS_BY_MODULE` starts empty. Fill a
module's entry in once its department book's own table of contents / running
heads have been read — see Kasr's `CHAPTERS_101` for the shape.

The summarisation judgement is human/model work; this script only does the
mechanical parts:

  map            - print the physical-page -> chapter map
  text A B       - print `pdftotext -layout` for physical PDF pages A..B
  figures A B    - print lines from A..B that look like figure/table captions
  add FILE.json  - merge a JSON list of chapter records into deptbook.json,
                   replacing any record with the same subjectPath.
  validate       - check deptbook.json against the module's chapter map

All page numbers are PHYSICAL PDF pages (1-based); a book's own printed
numbers may differ and are a per-book fact to record, not assume.
"""
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import asu_module  # noqa: E402

# subjectPath -> (bookTitle, start, end), one list per module.
# >>> FILL IN PER MODULE, once its department book's table of contents is read <<<
CHAPTERS_BY_MODULE: dict[str, list[tuple[str, str, int, int]]] = {}

# Set from --module in main().
MODULE = None
PDF = None
SOURCE_ID = None
PAGES = None
CHAPTERS: list[tuple[str, str, int, int]] = []
OUT = None

CAPTION = re.compile(
    r"(fig(ure)?\.?\s*\(?\d|plate\s*\d|table\s*\(?\d|^\s*[A-Z][^.]{4,70}$)", re.I)


def text(a, b):
    return subprocess.run(
        ["pdftotext", "-layout", "-f", str(a), "-l", str(b), PDF, "-"],
        capture_output=True, text=True, check=True).stdout


def cmd_map():
    if not CHAPTERS:
        print(f"no chapter map for {MODULE} yet — fill CHAPTERS_BY_MODULE[{MODULE!r}] in.")
        return
    for path, title, a, b in CHAPTERS:
        print(f"{a:>3}-{b:<3} {title}   <<  {path}")
    print(f"\n{len(CHAPTERS)} leaf chapters mapped")


def cmd_text(a, b):
    sys.stdout.write(text(int(a), int(b)))


def cmd_figures(a, b):
    a, b = int(a), int(b)
    for i, page in enumerate(text(a, b).split("\f"), a):
        for line in page.split("\n"):
            s = line.strip()
            if re.search(r"fig(ure)?\.?\s*\(?\s*\d|plate\s*\d|table\s*\(?\s*\d", s, re.I):
                print(f"p{i}: {s[:160]}")


def load():
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as fh:
            return json.load(fh)
    return {
        "file": PDF,
        "sourceId": SOURCE_ID,
        "manifestSourceId": SOURCE_ID,
        "moduleId": MODULE,
        "pages": PAGES,
        "pageNumbering": ("All startPage/endPage/figure page values are PHYSICAL PDF pages "
                          "(1-based); the book's own printed numbers may differ."),
        "chapters": [],
    }


def cmd_add(path):
    with open(path, encoding="utf-8") as fh:
        records = json.load(fh)
    if isinstance(records, dict):
        records = [records]
    doc = load()
    by_path = {c["subjectPath"]: c for c in doc["chapters"]}
    for rec in records:
        by_path[rec["subjectPath"]] = rec
    order = {p: i for i, (p, _, _, _) in enumerate(CHAPTERS)}
    doc["chapters"] = sorted(by_path.values(),
                             key=lambda c: order.get(c["subjectPath"], 999))
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False, indent=1)
        fh.write("\n")
    print(f"deptbook.json now holds {len(doc['chapters'])}/{len(CHAPTERS)} chapters")


def cmd_validate():
    doc = load()
    have = {c["subjectPath"] for c in doc["chapters"]}
    want = {p for p, _, _, _ in CHAPTERS}
    for p in sorted(want - have):
        print("MISSING:", p)
    for p in sorted(have - want):
        print("EXTRA  :", p)
    nfig = sum(len(c.get("figures", [])) for c in doc["chapters"])
    print(f"{len(have)}/{len(want)} chapters, {nfig} figures")


def resolve_book(module, source_id=None):
    """The module's Department Book, from the manifest. Never a hardcoded path."""
    books = asu_module.module_sources(module, category="Department Book", file_type="pdf")
    if source_id:
        book = next((b for b in books if b["sourceId"] == source_id), None)
        if not book:
            raise SystemExit("no Department Book %r in module %r" % (source_id, module))
        return book
    if not books:
        raise SystemExit("no Department Book in the manifest for module %r" % module)
    if len(books) > 1:
        names = "\n".join("  %s  %s" % (b["sourceId"], b["fileName"]) for b in books)
        raise SystemExit("module %r has %d Department Book files; name one with "
                         "--source-id:\n%s" % (module, len(books), names))
    return books[0]


def main(argv):
    global MODULE, PDF, SOURCE_ID, PAGES, CHAPTERS, OUT
    if not argv or "--help" in argv or "-h" in argv:
        print(__doc__)
        return
    MODULE, argv = asu_module.parse_module(argv)
    source_id = None
    if "--source-id" in argv:
        i = argv.index("--source-id")
        source_id, argv = argv[i + 1], argv[:i] + argv[i + 2:]

    book = resolve_book(MODULE, source_id)
    PDF, SOURCE_ID = book["absolutePath"], book["sourceId"]
    PAGES = book.get("pageCount")
    CHAPTERS = CHAPTERS_BY_MODULE.get(MODULE, [])
    OUT = asu_module.out_path(MODULE, "deptbook.json")

    cmds = {"map": cmd_map, "text": cmd_text, "figures": cmd_figures,
            "add": cmd_add, "validate": cmd_validate}
    if not argv or argv[0] not in cmds:
        raise SystemExit("unknown command %r\n%s" % (argv[0] if argv else "", __doc__))
    print("# module %s | %s" % (MODULE, os.path.basename(PDF)), file=sys.stderr)
    cmds[argv[0]](*argv[1:])


if __name__ == "__main__":
    main(sys.argv[1:])
