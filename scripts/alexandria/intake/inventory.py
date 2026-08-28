#!/usr/bin/env python3
"""Walk the Alexandria University corpus and record what every file physically is.

Adapted from scripts/corpus-intake/inventory.py (commit 5d26054). That file is
Kasr Alainy's and is not edited; this is Alexandria's own copy, parametrised for
this corpus's root, folder shape and file-type mess (see README.md in this
directory for the full list of differences).

Read-only. Never touches the corpus. Produces inventory.json: one row per file
with identity (sha256), shape (pages, for PDFs), whether a text layer exists at
all, and — because this corpus carries several hundred files whose extension
lies — the file's *actual* type as read from its own magic bytes.

Differences from the Kasr version, all forced by this corpus:
  * Kasr walks one loose top level; this walks y1/, y2/, y3/ and
    General Resources/, all of which are already organised into module folders
    (`<CODE> - <Name>`) that must never be moved, so this script only reads.
  * Kasr assumes ext == real type. Here ~120 files disagree: `.pdf_` files,
    files with a bare numeric suffix (`.1` .. `.15`) instead of an extension,
    one `.pptx_`, and one file ("CNS Anki") with no extension at all. Every one
    of those was checked by hand: they are complete, independently-valid
    documents (magic bytes confirm whole PDF/OOXML/zip structures, and for the
    numbered ones, `pdfinfo` reports a sane, self-consistent page count on
    each) — not fragments of a split archive. `sniff_type()` below reads the
    first bytes (and, for zip containers, the internal member list) so the
    manifest carries the true type regardless of what the filename claims.
  * Kasr only extracts pdf text here in inventory.py; ppt/pptx/docx text
    extraction happens in probe.py (python-pptx / python-docx), so inventory.py
    only records identity + pdf shape.
"""
import hashlib
import json
import os
import subprocess
import sys
import zipfile

ROOT = "/Users/doitrous/Desktop/Alexandria University"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "inventory.json")

TOP_FOLDERS = {"y1", "y2", "y3", "General Resources"}


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def sniff_type(path, claimed_ext):
    """Read magic bytes (and, for zip containers, member names) to find the
    file's real type, independent of what its extension claims.

    Returns (realType, note). realType is one of:
      pdf, pptx, docx, xlsx, apkg, ppt-ole, doc-ole, zip-unknown, image, unknown
    """
    try:
        with open(path, "rb") as fh:
            head = fh.read(8)
    except OSError:
        return "unknown", "could not open file to read magic bytes"

    if head.startswith(b"%PDF"):
        note = None
        if claimed_ext not in (".pdf", ".PDF"):
            note = f"named {claimed_ext or '(no extension)'} but magic bytes are a standard PDF header"
        return "pdf", note
    if head.startswith(b"PK\x03\x04") or head.startswith(b"PK\x05\x06"):
        # OOXML / zip family: look inside to tell pptx from docx from xlsx from apkg.
        try:
            with zipfile.ZipFile(path) as z:
                names = z.namelist()
        except Exception:
            return "zip-unknown", "zip signature but could not list members"
        if any(n.startswith("ppt/") for n in names):
            real = "pptx"
        elif any(n.startswith("word/") for n in names):
            real = "docx"
        elif any(n.startswith("xl/") for n in names):
            real = "xlsx"
        elif "collection.anki2" in names or "collection.anki21" in names:
            real = "apkg"
        else:
            real = "zip-unknown"
        note = None
        expect = {"pptx": ".pptx", "docx": ".docx", "xlsx": ".xlsx", "apkg": ".apkg"}.get(real)
        if expect and claimed_ext.lower() != expect:
            note = f"named {claimed_ext or '(no extension)'} but is a real {real} (zip member check)"
        return real, note
    if head.startswith(b"\xd0\xcf\x11\xe0"):
        # Legacy OLE2 compound file: old-format .ppt or .doc. Extension usually
        # tells them apart correctly in this corpus (checked by hand), so trust
        # it; record which family the bytes confirm either way.
        if claimed_ext == ".ppt":
            return "ppt-ole", None
        if claimed_ext == ".doc":
            return "doc-ole", None
        return "ole-unknown", f"OLE2 compound file named {claimed_ext or '(no extension)'}"
    if head[:3] == b"\xff\xd8\xff" or head[:8] == b"\x89PNG\r\n\x1a\n":
        return "image", None
    return "unknown", f"unrecognised magic bytes {head.hex()} for {claimed_ext or '(no extension)'}"


def pdf_pages(path):
    try:
        out = subprocess.run(["pdfinfo", path], capture_output=True, text=True, timeout=60)
        for line in out.stdout.splitlines():
            if line.startswith("Pages:"):
                return int(line.split(":", 1)[1].strip())
    except Exception:
        pass
    return None


def text_probe(path, pages=4):
    try:
        out = subprocess.run(
            ["pdftotext", "-f", "1", "-l", str(pages), "-q", path, "-"],
            capture_output=True, text=True, timeout=120,
        )
        txt = out.stdout
        return len(txt.strip()), txt[:4000]
    except Exception:
        return 0, ""


def module_from_folder(name):
    """'MED 102 - Foundation of Basic Medical Sciences & Medical Terminology'
    -> ('MED 102', 'Foundation of Basic Medical Sciences & Medical Terminology').
    Folders with no ' - ' (EOY Exams, Additional Curriculum) are not modules."""
    if " - " not in name:
        return None, None
    code, _, rest = name.partition(" - ")
    return code.strip(), rest.strip()


DEPARTMENTS = [
    "Anatomy and Embryology", "Forensics and Toxicology", "Forensic and Toxicology",
    "Pathology (Genetics)", "Clinical Pathology", "Tropical Medicine",
    "Community Medicine", "Internal Medicine", "Clinical Skills",
    "Anatomy", "Histology", "Physiology", "Biochemistry", "Embryology",
    "Pathology", "Pharmacology", "Microbiology", "Parasitology", "Genetics",
    "Communication", "Radiology", "Surgery", "Professionalism", "English",
    "Terminology", "Research", "Exams",
]
DEPT_CANON = {d.lower(): d for d in DEPARTMENTS}


def department_folder(parts_after_module):
    """First path component (walking from the module folder outward) that
    names a known department. Falls back to 'General' — which is what most of
    the corpus's own catch-all folders are literally called — or 'Unknown'."""
    for part in parts_after_module:
        key = part.strip().lower()
        if key in DEPT_CANON:
            return DEPT_CANON[key], part
        for k, canon in DEPT_CANON.items():
            if k in key:
                return canon, part
    for part in parts_after_module:
        if part.strip().lower() == "general":
            return "General", part
    return "Unknown", None


def main():
    rows = []
    n = 0
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames.sort()
        for name in sorted(filenames):
            if name == ".DS_Store":
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, ROOT)
            parts = rel.split(os.sep)
            top = parts[0]
            claimed_ext = os.path.splitext(name)[1]

            module_folder = None
            module_id, module_name = None, None
            rest_parts = parts[1:-1]
            if top in ("y1", "y2", "y3") and len(parts) > 1:
                module_folder = parts[1]
                module_id, module_name = module_from_folder(module_folder)
                rest_parts = parts[2:-1]

            dept, dept_raw = department_folder(rest_parts)

            try:
                size = os.path.getsize(full)
            except OSError:
                continue

            real_type, type_note = sniff_type(full, claimed_ext)

            row = {
                "rel": rel,
                "topFolder": top,
                "moduleFolder": module_folder,
                "moduleId": module_id,
                "moduleName": module_name,
                "departmentFolder": dept,
                "departmentFolderRaw": dept_raw,
                "pathParts": parts,
                "name": name,
                "claimedExt": claimed_ext,
                "realType": real_type,
                "typeNote": type_note,
                "size": size,
                "sha256": sha256(full),
                "pages": None,
                "text_chars": None,
                "head": "",
            }
            if real_type == "pdf":
                row["pages"] = pdf_pages(full)
                chars, head = text_probe(full)
                row["text_chars"] = chars
                row["head"] = head
            rows.append(row)
            n += 1
            if n % 200 == 0:
                print(f"  [{n}] {rel}", file=sys.stderr, flush=True)

    with open(OUT, "w") as fh:
        json.dump({"root": ROOT, "count": len(rows), "files": rows}, fh, indent=1, ensure_ascii=False)
    print(f"\n{len(rows)} files -> {OUT}")


if __name__ == "__main__":
    main()
