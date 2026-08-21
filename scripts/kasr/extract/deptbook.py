#!/usr/bin/env python3
"""Helper for extracting the teaching content of `Department Book Module 101.pdf`.

The summarisation judgement is human/model work; this script only does the
mechanical parts:

  map            - print the physical-page -> chapter map (LIST OF CONTENTS for
                   Part I Histology, running heads for Part II Anatomy)
  text A B       - print `pdftotext -layout` for physical PDF pages A..B
  figures A B    - print lines from A..B that look like figure/table captions
  add FILE.json  - merge a JSON list of chapter records into deptbook.json,
                   replacing any record with the same subjectPath. Written
                   incrementally so a late failure keeps the early chapters.
  validate       - check deptbook.json against the 43 leaf nodes of the tree

All page numbers are PHYSICAL PDF pages (1-based). The book's own printed
numbers differ: Part I printed = physical - 1; Part II restarts at 1 on
physical 66 and the Basis-of-Anatomy section carries a further offset.
"""
import json
import os
import re
import subprocess
import sys

PDF = ("/Users/doitrous/Desktop/Kasr Alainy/y1/101 ISK/"
       "Department Book/Department Book Module 101.pdf")
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "deptbook.json")

# Physical page ranges, derived from Part I's LIST OF CONTENTS (physical 3)
# and Part II's running heads. subjectPath -> (bookTitle, start, end)
CHAPTERS = [
    ("101 ISK > Histology > Introduction > Microscopes", "MICROSCOPES", 4, 5),
    ("101 ISK > Histology > Introduction > Microtechniques",
     "Tissue Processing Methods (Microtechniques) for L.M. examination", 5, 6),
    ("101 ISK > Histology > Cytology > The cell", "The cell", 7, 7),
    ("101 ISK > Histology > Cytology > Cytoplasm", "The Cytoplasm", 7, 21),
    ("101 ISK > Histology > Cytology > Nucleus", "THE NUCLEUS", 22, 25),
    ("101 ISK > Histology > Blood > Red Blood Corpuscles",
     "RED BLOOD CORPUSCLES (ERYTHROCYTES)", 26, 28),
    ("101 ISK > Histology > Blood > Blood Platelets",
     "BLOOD PLATELETS (THROMBOCYTES)", 29, 31),
    ("101 ISK > Histology > Blood > Granular leukocytes",
     "GRANULAR LEUKOCYTES (GRANULOCYTES)", 32, 35),
    ("101 ISK > Histology > Blood > Non granular leukocytes",
     "NON GRANULAR LEUKOCYTES (AGRANULOCYTES)", 36, 38),
    ("101 ISK > Histology > Blood > Haemopoiesis", "HAEMOPOIESIS", 39, 40),
    ("101 ISK > Histology > Connective Tissue > Connective Tissue Cells",
     "CONNECTIVE TISSUE CELLS", 41, 46),
    ("101 ISK > Histology > Connective Tissue > Connective Tissue Fibres",
     "CONNECTIVE TISSUE FIBRES", 47, 47),
    ("101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper",
     "TYPES OF CONNECTIVE TISSUE PROPER", 48, 51),
    ("101 ISK > Histology > Epithelial Tissues > Surface Epithelium",
     "I- SURFACE EPITHELIUM", 52, 56),
    ("101 ISK > Histology > Epithelial Tissues > Glandular Epithelium",
     "II- GLANDULAR EPITHELIUM", 57, 58),
    ("101 ISK > Histology > Epithelial Tissues > Neuro Epithelium",
     "III- NEURO-EPITHELIUM", 59, 59),
    ("101 ISK > Histology > Epithelial Tissues > Myo Epithelium",
     "IV- MYO-EPITHELIUM", 59, 59),
    ("101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations",
     "Cell Polarity and Membranous Specializations", 60, 62),
    ("101 ISK > Anatomy > General Embryology > Gametes", "Gametes", 66, 67),
    ("101 ISK > Anatomy > General Embryology > First Week of Development",
     "First Week of Development", 68, 71),
    ("101 ISK > Anatomy > General Embryology > Second Week of Development",
     "Second Week of Development", 72, 79),
    ("101 ISK > Anatomy > General Embryology > Third Week of Development",
     "Third Week of Development", 80, 86),
    ("101 ISK > Anatomy > General Embryology > Embryonic Period",
     "Embryonic Period", 87, 93),
    ("101 ISK > Anatomy > General Embryology > Fetal Membranes",
     "Fetal Membranes", 94, 105),
    ("101 ISK > Anatomy > General Embryology > Fetal Period",
     "Fetal Period", 106, 107),
    ("101 ISK > Anatomy > Basis of Anatomy > Introduction", "Introduction", 109, 111),
    ("101 ISK > Anatomy > Basis of Anatomy > Fascia", "Fascia", 112, 114),
    ("101 ISK > Anatomy > Basis of Anatomy > Skeletal system", "Skeletal system", 115, 121),
    ("101 ISK > Anatomy > Basis of Anatomy > Articular system", "Articular system", 122, 131),
    ("101 ISK > Anatomy > Basis of Anatomy > Muscular system", "Muscular system", 132, 136),
    ("101 ISK > Anatomy > Basis of Anatomy > Nervous system", "Nervous system", 137, 139),
    ("101 ISK > Anatomy > Basis of Anatomy > Cardiovascular system",
     "Cardiovascular system", 140, 147),
    ("101 ISK > Anatomy > Basis of Anatomy > Lymphatic system", "Lymphatic system", 148, 151),
    ("101 ISK > Anatomy > Upper Limb > Pectoral Region", "Pectoral Region", 153, 162),
    ("101 ISK > Anatomy > Upper Limb > Muscles of the Back", "Muscles of the Back", 163, 168),
    ("101 ISK > Anatomy > Upper Limb > Shoulder Region", "Shoulder Region", 169, 177),
    ("101 ISK > Anatomy > Upper Limb > Axilla", "Axilla", 178, 193),
    ("101 ISK > Anatomy > Upper Limb > Arm", "Arm", 194, 204),
    ("101 ISK > Anatomy > Upper Limb > Forearm", "Forearm", 205, 234),
    ("101 ISK > Anatomy > Upper Limb > Hand", "Hand", 235, 252),
    ("101 ISK > Anatomy > Upper Limb > Veins of the Upper Limb",
     "Veins of the Upper Limb", 253, 256),
    ("101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries",
     "Nerve Supply of Upper Limb & Nerve Injuries", 257, 269),
    ("101 ISK > Anatomy > Upper Limb > Joints of Upper Limb",
     "Joints of Upper Limb", 270, 291),
]

CAPTION = re.compile(
    r"(fig(ure)?\.?\s*\(?\d|plate\s*\d|table\s*\(?\d|^\s*[A-Z][^.]{4,70}$)", re.I)


def text(a, b):
    return subprocess.run(
        ["pdftotext", "-layout", "-f", str(a), "-l", str(b), PDF, "-"],
        capture_output=True, text=True, check=True).stdout


def cmd_map():
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
        "sourceId": "src_b1e6dc481eaf337268d0",
        "manifestSourceId": "src_b1e6dc481eaf337268d0",
        "sourceIdNote": ("The subject-tree note and the extraction request both cite "
                         "src_b1e6dc481eaf337268d0, but kasr-y1-sources.json records this "
                         "PDF (291 pages, sha256 b1e6dc48...) as src_b1e6dc481eaf337268d0. "
                         "Both are recorded here; the manifest one is authoritative."),
        "pages": 291,
        "pageNumbering": ("All startPage/endPage/figure page values are PHYSICAL PDF pages "
                          "(1-based). The book's printed numbers differ: Part I printed = "
                          "physical - 1; Part II restarts its own numbering."),
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


if __name__ == "__main__":
    cmds = {"map": cmd_map, "text": cmd_text, "figures": cmd_figures,
            "add": cmd_add, "validate": cmd_validate}
    cmds[sys.argv[1]](*sys.argv[2:])
