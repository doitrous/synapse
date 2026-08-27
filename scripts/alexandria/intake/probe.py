#!/usr/bin/env python3
"""Read the front of every file, extracting whatever format it actually is.

Adapted from scripts/corpus-intake/probe.py (commit 5d26054). Kasr's version
only had to handle pdf/jpeg/png/rtf, because Kasr's loose files were almost all
scanned pdf. Alexandria's corpus additionally carries ~186 pptx, ~23 legacy
ppt, a handful of docx/doc and apkg — inventory.py already told us the *real*
type of every file (by magic bytes, not extension), so this script dispatches
on that.

This script does NOT run OCR itself. OCR (tesseract eng+ara, first 2 pages,
only for pdfs with no native text layer) is slow enough on ~3275 pdfs that
running it inline would block the manifest for hours, so the brief calls for
it to run in the background with its own log instead. This script:
  1. extracts native pdf text (already read by inventory.py — reused here),
  2. extracts pptx / docx text directly (python-pptx / python-docx — both
     `pip install`ed for this run since neither was already on the machine;
     see README.md "Tooling" for what happens if a machine doesn't have them),
  3. extracts legacy .doc via macOS `textutil`,
  4. extracts legacy .ppt via `soffice --headless --convert-to pdf` IF soffice
     is present on PATH by the time this runs — else records
     textLayer="unprobed" and says so on the row, per the brief,
  5. reads an apkg's note/deck count via its embedded sqlite (`collection.anki2`),
  6. writes ocr_queue.json: every pdf row with no native text layer, for the
     separate background OCR worker (ocr_worker.py) to consume.

Cache: rendered/converted intermediates go under scripts/alexandria/pagetext/
(gitignored), never under the corpus.
"""
import json
import os
import shutil
import sqlite3
import subprocess
import sys
import tempfile
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
INV = os.path.join(HERE, "inventory.json")
OUT = os.path.join(HERE, "probe.json")
QUEUE_OUT = os.path.join(HERE, "ocr_queue.json")
PAGETEXT = os.path.join(HERE, "..", "pagetext")
os.makedirs(PAGETEXT, exist_ok=True)

HAVE_SOFFICE = shutil.which("soffice") is not None


def _ppsx_as_presentation(path):
    """python-pptx refuses a .ppsx (PowerPoint Slideshow) outright: its
    [Content_Types].xml declares the main part as
    'presentationml.slideshow.main+xml' rather than
    'presentationml.presentation.main+xml', and python-pptx's opener checks
    that string literally. The slideshow is otherwise a normal OOXML
    presentation package (confirmed: same ppt/ member layout as a .pptx), so
    rewrite just that declaration in memory and open the patched bytes."""
    import io
    import zipfile as zf
    with zf.ZipFile(path) as z:
        data = {n: z.read(n) for n in z.namelist()}
    ct_name = "[Content_Types].xml"
    if ct_name not in data:
        raise ValueError("no [Content_Types].xml in package")
    xml = data[ct_name].decode("utf-8")
    patched = xml.replace(
        "presentationml.slideshow.main+xml",
        "presentationml.presentation.main+xml",
    )
    if patched == xml:
        raise ValueError("no slideshow content-type declaration found to patch")
    data[ct_name] = patched.encode("utf-8")
    buf = io.BytesIO()
    with zf.ZipFile(buf, "w") as out:
        for n, b in data.items():
            out.writestr(n, b)
    buf.seek(0)
    return buf


def pptx_text(path):
    try:
        from pptx import Presentation
    except ImportError:
        return None, "python-pptx not installed"
    try:
        prs = Presentation(path)
    except Exception as e:
        if path.lower().endswith(".ppsx"):
            try:
                prs = Presentation(_ppsx_as_presentation(path))
            except Exception as e2:
                return None, f"python-pptx failed to open (ppsx retry also failed): {e2}"
        else:
            return None, f"python-pptx failed to open: {e}"
    parts = []
    for slide in prs.slides:
        for shape in slide.shapes:
            if shape.has_text_frame:
                for para in shape.text_frame.paragraphs:
                    for run in para.runs:
                        if run.text:
                            parts.append(run.text)
            if shape.has_table:
                for row in shape.table.rows:
                    for cell in row.cells:
                        if cell.text:
                            parts.append(cell.text)
        if slide.has_notes_slide and slide.notes_slide.notes_text_frame:
            t = slide.notes_slide.notes_text_frame.text
            if t:
                parts.append(t)
    return " ".join(" ".join(parts).split()), None


def xlsx_text(path):
    try:
        import openpyxl
    except ImportError:
        return None, "openpyxl not installed"
    try:
        wb = openpyxl.load_workbook(path, data_only=True, read_only=True)
    except Exception as e:
        return None, f"openpyxl failed to open: {e}"
    parts = []
    for ws in wb.worksheets:
        for row in ws.iter_rows():
            for cell in row:
                if cell.value is not None:
                    parts.append(str(cell.value))
    return " ".join(" ".join(parts).split()), None


def docx_text(path):
    try:
        import docx
    except ImportError:
        return None, "python-docx not installed"
    try:
        d = docx.Document(path)
    except Exception as e:
        return None, f"python-docx failed to open: {e}"
    parts = [p.text for p in d.paragraphs if p.text]
    for table in d.tables:
        for row in table.rows:
            for cell in row.cells:
                if cell.text:
                    parts.append(cell.text)
    return " ".join(" ".join(parts).split()), None


def doc_text_textutil(path):
    """Legacy .doc via macOS's built-in textutil. No install needed."""
    if not shutil.which("textutil"):
        return None, "textutil not on PATH"
    try:
        r = subprocess.run(["textutil", "-convert", "txt", "-stdout", path],
                            capture_output=True, text=True, timeout=120)
        if r.returncode != 0:
            return None, f"textutil exited {r.returncode}: {r.stderr[:200]}"
        return " ".join(r.stdout.split()), None
    except Exception as e:
        return None, f"textutil failed: {e}"


def ppt_text_soffice(path):
    """Legacy .ppt via LibreOffice headless conversion to pdf, then pdftotext.
    Only attempted if `soffice` is on PATH."""
    if not HAVE_SOFFICE:
        return None, "soffice not installed on this machine — see README Tooling note"
    with tempfile.TemporaryDirectory(dir=PAGETEXT) as td:
        try:
            r = subprocess.run(
                ["soffice", "--headless", "--convert-to", "pdf", "--outdir", td, path],
                capture_output=True, text=True, timeout=180,
            )
        except Exception as e:
            return None, f"soffice failed: {e}"
        stem = os.path.splitext(os.path.basename(path))[0]
        pdf_path = os.path.join(td, stem + ".pdf")
        if not os.path.exists(pdf_path):
            return None, f"soffice did not produce a pdf (rc={r.returncode}): {r.stderr[:200]}"
        try:
            rr = subprocess.run(["pdftotext", "-l", "3", "-q", pdf_path, "-"],
                                capture_output=True, text=True, timeout=120)
            return " ".join(rr.stdout.split()), None
        except Exception as e:
            return None, f"pdftotext on converted file failed: {e}"


def apkg_summary(path):
    """Anki packages are a zip containing a sqlite db. We don't need to teach
    from these directly (the corpus's authored medical content is the pdf/pptx
    material); recording the deck names and note count is enough evidence for
    classification and for the gap ledger."""
    try:
        with zipfile.ZipFile(path) as z:
            db_name = "collection.anki21" if "collection.anki21" in z.namelist() else "collection.anki2"
            if db_name not in z.namelist():
                return None, "apkg has no collection.anki2/anki21 inside"
            with tempfile.TemporaryDirectory(dir=PAGETEXT) as td:
                dbp = z.extract(db_name, td)
                con = sqlite3.connect(dbp)
                cur = con.cursor()
                try:
                    cur.execute("select count(*) from notes")
                    note_count = cur.fetchone()[0]
                except Exception:
                    note_count = None
                try:
                    cur.execute("select decks from col limit 1")
                    decks_raw = cur.fetchone()
                    deck_names = list(json.loads(decks_raw[0]).values()) if decks_raw else []
                    deck_names = [d.get("name") for d in deck_names if isinstance(d, dict)]
                except Exception:
                    deck_names = []
                con.close()
        return {"noteCount": note_count, "deckNames": deck_names}, None
    except Exception as e:
        return None, f"apkg read failed: {e}"


def main():
    root = json.load(open(INV))["root"]
    inv = json.load(open(INV))["files"]
    results = []
    queue = []
    n = 0
    counts = {}
    for row in inv:
        rt = row["realType"]
        rel = row["rel"]
        out_row = {
            "rel": rel, "sha256": row["sha256"], "realType": rt,
            "textLayer": None, "probeStatus": None, "text": "", "extra": None,
        }
        if rt == "pdf":
            chars = row.get("text_chars") or 0
            if chars >= 60:
                out_row["textLayer"] = "native"
                out_row["probeStatus"] = "native-text-extracted"
                out_row["text"] = row.get("head", "")[:4000]
            else:
                out_row["textLayer"] = "none"
                out_row["probeStatus"] = "queued-for-background-ocr"
                queue.append({"rel": rel, "sha256": row["sha256"]})
        elif rt == "pptx":
            full_path = os.path.join(root, rel)
            text, err = pptx_text(full_path)
            if text is not None:
                out_row["textLayer"] = "native" if text.strip() else "none"
                out_row["probeStatus"] = "pptx-extracted" if text.strip() else "pptx-extracted-empty"
                out_row["text"] = text[:6000]
            else:
                out_row["textLayer"] = "unprobed"
                out_row["probeStatus"] = f"pptx-unprobed: {err}"
        elif rt == "docx":
            full_path = os.path.join(root, rel)
            text, err = docx_text(full_path)
            if text is not None:
                out_row["textLayer"] = "native" if text.strip() else "none"
                out_row["probeStatus"] = "docx-extracted" if text.strip() else "docx-extracted-empty"
                out_row["text"] = text[:6000]
            else:
                out_row["textLayer"] = "unprobed"
                out_row["probeStatus"] = f"docx-unprobed: {err}"
        elif rt == "doc-ole":
            full_path = os.path.join(root, rel)
            text, err = doc_text_textutil(full_path)
            if text is not None:
                out_row["textLayer"] = "native" if text.strip() else "none"
                out_row["probeStatus"] = "doc-textutil-extracted"
                out_row["text"] = text[:6000]
            else:
                out_row["textLayer"] = "unprobed"
                out_row["probeStatus"] = f"doc-unprobed: {err}"
        elif rt == "ppt-ole":
            full_path = os.path.join(root, rel)
            text, err = ppt_text_soffice(full_path)
            if text is not None:
                out_row["textLayer"] = "native" if text.strip() else "none"
                out_row["probeStatus"] = "ppt-soffice-extracted"
                out_row["text"] = text[:6000]
            else:
                out_row["textLayer"] = "unprobed"
                out_row["probeStatus"] = f"ppt-unprobed: {err}"
        elif rt == "apkg":
            full_path = os.path.join(root, rel)
            summary, err = apkg_summary(full_path)
            if summary is not None:
                out_row["textLayer"] = "n/a"
                out_row["probeStatus"] = "apkg-deck-metadata-read"
                out_row["extra"] = summary
            else:
                out_row["textLayer"] = "unprobed"
                out_row["probeStatus"] = f"apkg-unprobed: {err}"
        elif rt == "xlsx":
            full_path = os.path.join(root, rel)
            text, err = xlsx_text(full_path)
            if text is not None:
                out_row["textLayer"] = "native" if text.strip() else "none"
                out_row["probeStatus"] = "xlsx-extracted" if text.strip() else "xlsx-extracted-empty"
                out_row["text"] = text[:6000]
            else:
                out_row["textLayer"] = "unprobed"
                out_row["probeStatus"] = f"xlsx-unprobed: {err}"
        elif rt == "zip-unknown":
            out_row["textLayer"] = "unprobed"
            out_row["probeStatus"] = ("zip-unknown-unprobed: zip signature present but the "
                                       "container is truncated/corrupted (no valid central "
                                       "directory) — verified by hand, not a format we lack a tool for")
        else:
            out_row["textLayer"] = "unprobed"
            out_row["probeStatus"] = f"no handler for realType={rt}"

        results.append(out_row)
        counts[out_row["probeStatus"].split(":")[0]] = counts.get(out_row["probeStatus"].split(":")[0], 0) + 1
        n += 1
        if n % 300 == 0:
            print(f"  [{n}/{len(inv)}] {rel}", file=sys.stderr, flush=True)

    json.dump(results, open(OUT, "w"), indent=1, ensure_ascii=False)
    json.dump(queue, open(QUEUE_OUT, "w"), indent=1, ensure_ascii=False)
    print(f"\n{len(results)} probed -> {OUT}")
    print(f"{len(queue)} pdfs with no native text queued for OCR -> {QUEUE_OUT}")
    print("counts:", json.dumps(counts, indent=1))


if __name__ == "__main__":
    main()
