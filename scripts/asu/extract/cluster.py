#!/usr/bin/env python3
"""
Cluster scripts/asu/extract/<module-slug>/questions.json into distinct assessable objectives.

WHAT IS MECHANICAL IN HERE
  - normalising whitespace in question text
  - counting occurrences, years, marks ranges
  - picking `canonicalAsked` (a legibility score over the verbatim texts of a
    cluster's occurrences -- it never composes new wording, it only chooses
    which existing occurrence reads cleanest)
  - parsing the subject tree out of the structure markdown and reporting
    coverage per leaf, including the leaves with zero objectives
  - integrity checks: every index assigned exactly once, nothing dropped

WHAT IS JUDGEMENT (mine, from reading all 704 rows)
  - the OBJECTIVES table below: which indices belong to the same assessable
    objective, what that objective is (`label`), where it sits in the subject
    tree, and the confidence
  - the UNCLUSTERED table: rows I could not confidently assign, with why

Usage:  python3 scripts/asu/extract/cluster.py --module "ASU-CVS"
Writes: scripts/asu/extract/<module-slug>/clusters.json
        scripts/asu/extract/<module-slug>/clusters-report.md

Copied from `scripts/kasr/extract/cluster.py`, retrofitted for `--module`:
that file hardcodes `scripts/kasr/questions.json` and
`101-isk-structure.md`, both bare/unprefixed 101-specific paths.
"""

import json
import os
import re
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import asu_module  # noqa: E402

MODULE, _ = asu_module.parse_module(sys.argv[1:])
SLUG = asu_module.module_slug(MODULE)
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
QUESTIONS = asu_module.out_path(MODULE, "questions.json")
OUT_ROOT_DOCS = os.environ.get("ASU_TOOLCHAIN_OUT") or os.path.join(ROOT, "docs", "Ain-Shams-Source-Imports")
STRUCTURE = os.path.join(OUT_ROOT_DOCS, "academic", f"{SLUG.lower()}-structure.md")
OUT_JSON = asu_module.out_path(MODULE, "clusters.json")
OUT_MD = asu_module.out_path(MODULE, "clusters-report.md")

# >>> FILL IN PER MODULE, once its own questions.json has been read <<<
# The section-code constants (A, H, BASIS, ... — Kasr's own subject-tree
# shorthand for "101 ISK > Anatomy", "101 ISK > Histology > Cytology", etc.)
# and the OBJECTIVES / UNCLUSTERED tables below are Kasr's own judgement,
# read by hand from its own questions.json rows — a hand-curated seed, not
# mechanical code, and specific to that corpus's own row indices. Emptied
# here per LANE-BRIEF.md's "as shape, emptied of Kasr's seeds" rule; see
# `scripts/kasr/extract/cluster.py` for the shape a filled-in table takes.
#
# `main()` below still runs its integrity check with these empty — for a
# module with any rows in QUESTIONS it will correctly refuse with
# "unaccounted indices", which is not a bug: it is the honest statement that
# nothing has been clustered for this module yet.

OFF = "OFF-TREE"

# (key, label, subjectPath, confidence, indices)
OBJECTIVES: list[tuple[str, str, str, str, list[int]]] = []

# index -> why it could not be confidently assigned
UNCLUSTERED: dict[int, str] = {}

def norm(text):
    return re.sub(r"\s+", " ", text).strip()


CLEAN_RE = re.compile(r"[A-Za-z0-9 .,;:()\[\]{}&/'\"?%+\-]")


def legibility(text):
    """Mechanical score for choosing which verbatim occurrence to quote."""
    if not text:
        return -1e9
    clean = sum(1 for ch in text if CLEAN_RE.match(ch)) / len(text)
    score = clean * 100
    n = len(text)
    if n < 15:
        score -= 40
    if n > 340:
        score -= (n - 340) / 12.0
    # a real question usually opens with an instruction verb
    if re.match(r"^\s*(mention|describe|discuss|compare|explain|enumerate|give|"
                r"outline|summari[sz]e|regarding|concerning|point out|name|what|which|list)",
                text, re.I):
        score += 12
    # penalise rows that are clearly several questions welded together by OCR
    score -= 4 * len(re.findall(r"\b\d{1,3}\s*[-.]\s+[A-Z]", text))
    return score


def load_tree(path):
    """Leaf paths of the module subject tree, in document order."""
    leaves = []
    stack = {}
    subject = None
    chapter = None
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            m = re.match(r"^(\s*)- (.+)$", line.rstrip("\n"))
            if not m:
                continue
            indent = len(m.group(1))
            name = re.sub(r"\s*[\[(].*$", "", m.group(2)).strip()
            if indent == 0:
                continue  # the module line itself
            if indent == 2:
                subject, chapter = name, None
            elif indent == 4:
                chapter = name
            elif indent == 6 and subject and chapter:
                leaves.append("101 ISK > %s > %s > %s" % (subject, chapter, name))
    del stack
    return leaves


def main():
    with open(QUESTIONS, encoding="utf-8") as fh:
        rows = json.load(fh)["questions"]
    total = len(rows)

    # ---- integrity: every index assigned exactly once ----
    seen = {}
    for key, _, _, _, idxs in OBJECTIVES:
        for i in idxs:
            if i in seen:
                sys.exit("index %d assigned to both %s and %s" % (i, seen[i], key))
            seen[i] = key
    for i in UNCLUSTERED:
        if i in seen:
            sys.exit("index %d is both clustered (%s) and unclustered" % (i, seen[i]))
        seen[i] = "<unclustered>"
    missing = [i for i in range(total) if i not in seen]
    if missing:
        sys.exit("unaccounted indices: %r" % (missing[:40],))
    if len(seen) != total:
        sys.exit("assigned %d indices for %d rows" % (len(seen), total))

    objectives = []
    for key, label, path, conf, idxs in OBJECTIVES:
        occ = []
        for i in idxs:
            r = rows[i]
            occ.append({
                "index": i,
                "sourceId": r["sourceId"],
                "file": r["file"],
                "category": r.get("category"),
                "year": r.get("year"),
                "page": r.get("page"),
                "number": r.get("number"),
                "marks": r.get("marks"),
                "asked": norm(r["text"]),
            })
        canonical = max(occ, key=lambda o: legibility(o["asked"]))["asked"]
        years = sorted({o["year"] for o in occ if o["year"] is not None})
        marks = sorted({o["marks"] for o in occ if o["marks"] is not None})
        section = "Histology" if "Histology" in path else "Anatomy"
        objectives.append({
            "key": key,
            "label": label,
            "canonicalAsked": canonical,
            "subjectPath": path,
            "section": section,
            "occurrences": occ,
            "timesAsked": len(occ),
            "yearsAsked": years,
            "marksRange": [marks[0], marks[-1]] if marks else [],
            "confidence": conf,
        })

    objectives.sort(key=lambda o: (-o["timesAsked"], o["key"]))

    unclustered = [{"index": i, "sourceId": rows[i]["sourceId"], "file": rows[i]["file"],
                    "text": norm(rows[i]["text"])[:200], "why": why}
                   for i, why in sorted(UNCLUSTERED.items())]

    doc = {
        "totalQuestions": total,
        "clusters": len(objectives),
        "unclustered": unclustered,
        "objectives": objectives,
    }
    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, indent=1, ensure_ascii=False)
        fh.write("\n")

    write_report(rows, objectives, unclustered, total)
    print("clusters=%d  clustered_rows=%d  unclustered=%d"
          % (len(objectives), total - len(unclustered), len(unclustered)))



# ---------------------------------------------------------------------------
# The Anatomy Department's own orientation sheet (notes.json -> orientation),
# broken into its declared items and mapped -- by my reading -- onto the
# cluster keys above. Empty list means: declared, and no cluster corresponds.
# ---------------------------------------------------------------------------
DECLARED = [
    ("Basis", "Fascia -- superficial", ["superficial-fascia-features"]),
    ("Basis", "Fascia -- deep", ["deep-fascia-parts-functions"]),
    ("Basis", "Bones", ["bone-classification-types", "bone-functions-types-pneumatic",
                        "bone-growth-epiphyseal-plate", "bone-blood-supply-arteries"]),
    ("Basis", "Joints -- fibrous", ["fibrous-joints-types-definition"]),
    ("Basis", "Joints -- cartilaginous", ["cartilaginous-joints-primary-vs-secondary"]),
    ("Basis", "Joints -- synovial", ["synovial-joint-structure-characters",
                                     "synovial-joint-types-examples", "articular-cartilage-function"]),
    ("Basis", "Muscles", ["muscle-attachment-types", "muscle-classification-by-action-prime-mover"]),

    ("Embryology", "Fertilization", ["fertilization-site-mechanism-results"]),
    ("Embryology", "Implantation", ["implantation-normal-site", "implantation-abnormal-sites",
                                    "blastocyst-structure-inner-cell-mass",
                                    "second-week-development-events",
                                    "trophoblast-syncytio-cytotrophoblast"]),
    ("Embryology", "Decidua", ["decidua-definition-parts-fates"]),
    ("Embryology", "Notochord", ["notochord-formation-fate"]),
    ("Embryology", "Intra-embryonic mesoderm", ["paraxial-mesoderm-somite-derivatives",
                                                "neurulation-neural-tube-formation"]),
    ("Embryology", "Folding", ["embryonic-disc-folding-types-causes-results"]),
    ("Embryology", "Fetal membranes -- chorion", ["chorionic-villi-types-development"]),
    ("Embryology", "Fetal membranes -- amnion", ["amnion-amniotic-cavity-formation",
                                                 "amniotic-fluid-functions"]),
    ("Embryology", "Fetal membranes -- placenta", ["placenta-formation-fetal-maternal-parts",
                                                   "placenta-anomalies",
                                                   "placenta-gross-features-full-term"]),
    ("Embryology", "Fetal membranes -- umbilical cord", ["umbilical-cord-structure-at-birth",
                                                         "umbilical-cord-anomalies"]),

    ("Upper Limb", "Muscles -- all except hand (attachment, nerve supply, action)",
     ["pectoralis-major-attachment-nerve-action", "deltoid-attachment-nerve-action",
      "rotator-cuff-muscles-attachments-actions", "trapezius-attachments-nerve-action",
      "latissimus-dorsi-attachments-action-nerve", "serratus-anterior-attachments-nerve-action",
      "biceps-brachii-attachments-action-nerve", "triceps-brachii-attachments-action-nerve",
      "brachialis-muscle-attachments-nerve-action",
      "flexor-digitorum-superficialis-profundus-attachments-nerve",
      "forearm-muscles-attachments-nerve-supply", "forearm-anterior-compartment-muscles-groups",
      "forearm-extensor-compartment-muscles", "supination-pronation-muscles-attachments-nerve",
      "shoulder-abduction-muscles-attachments-nerve-action",
      "scapular-rotation-abduction-beyond-90-muscles", "shoulder-abduction-muscle-sequence"]),
    ("Upper Limb", "Nerves -- brachial plexus", ["brachial-plexus-formation-branches",
                                                 "erb-palsy-upper-trunk-injury",
                                                 "case-klumpke-lower-trunk-avulsion"]),
    ("Upper Limb", "Nerves -- median", ["median-nerve-origin-course-relations-branches",
                                        "carpal-tunnel-median-nerve-compression"]),
    ("Upper Limb", "Nerves -- radial", ["radial-nerve-origin-root-branches",
                                        "radial-nerve-injury-spiral-groove-wrist-drop"]),
    ("Upper Limb", "Nerves -- ulnar", ["ulnar-nerve-origin-course-branches",
                                       "ulnar-nerve-injury-claw-hand"]),
    ("Upper Limb", "Nerves -- axillary",
     ["axillary-nerve-injury-shoulder-dislocation",
      "surgical-neck-humerus-fracture-axillary-nerve-posterior-circumflex"]),
    ("Upper Limb", "Nerves -- musculocutaneous", ["musculocutaneous-nerve-origin-course-branches"]),
    ("Upper Limb", "Cutaneous nerve supply of the upper limb", ["upper-limb-cutaneous-nerve-supply"]),
    ("Upper Limb", "Arteries -- all, with anastomoses and arches",
     ["axillary-artery-parts-branches", "brachial-artery-origin-course-end-branches",
      "radial-artery-course-branches", "ulnar-artery-course-relations-branches",
      "palmar-arterial-arches-site-formation-branches",
      "carpal-arches-anterior-posterior-comparison", "scapular-anastomosis-arteries"]),
    ("Upper Limb", "Veins -- all (beginning, course, end, tributaries, areas drained)",
     ["upper-limb-superficial-veins-cephalic-basilic"]),
    ("Upper Limb", "Spaces -- intermuscular spaces of shoulder",
     ["intermuscular-spaces-quadrangular-triangular-boundaries-contents"]),
    ("Upper Limb", "Spaces -- axilla", ["axilla-boundaries-walls-contents"]),
    ("Upper Limb", "Spaces -- cubital fossa", ["cubital-fossa-boundaries-contents"]),
    ("Upper Limb", "Spaces -- snuff box", ["anatomical-snuff-box-site-boundaries-contents"]),
    ("Upper Limb", "Spaces -- carpal tunnel", ["flexor-retinaculum-attachments-relations-carpal-tunnel"]),
    ("Upper Limb", "Fasciae -- clavipectoral fascia",
     ["clavipectoral-fascia-attachments-structures-piercing"]),
    ("Upper Limb", "Fasciae -- flexor retinaculum",
     ["flexor-retinaculum-attachments-relations-carpal-tunnel"]),
    ("Upper Limb", "Fasciae -- extensor retinaculum", ["extensor-retinaculum-attachments-compartments"]),
    ("Upper Limb", "Joints -- sternoclavicular", ["sternoclavicular-joint-type-surfaces-ligaments"]),
    ("Upper Limb", "Joints -- acromioclavicular", []),
    ("Upper Limb", "Joints -- shoulder", ["shoulder-joint-type-ligaments-movements",
                                          "shoulder-joint-movements-muscles"]),
    ("Upper Limb", "Joints -- elbow", ["elbow-joint-type-ligaments-movements"]),
    ("Upper Limb", "Joints -- superior & inferior radio-ulnar", []),
    ("Upper Limb", "Joints -- wrist", ["wrist-joint-movements-muscles-ligaments"]),
]

# Anatomy clusters that no line of the orientation sheet covers. Judgement.
UNDECLARED_NOTE = {
    "anatomical-planes-terms-of-position": "the declared Basis list is Fascia, Bones, Joints, Muscles -- planes and terms of position are not on it",
    "lymph-vessels-structure-function": "no lymphatics anywhere on the sheet",
    "lymphatic-ducts-right-thoracic-drainage": "no lymphatics anywhere on the sheet",
    "axillary-lymph-nodes-groups-drainage": "no lymphatics anywhere on the sheet",
    "breast-lymphatic-drainage": "no lymphatics, and no breast, anywhere on the sheet",
    "breast-structure-blood-supply-bed": "the breast is not named on the sheet",
    "case-breast-carcinoma-mastectomy-axillary-nodes": "the breast is not named on the sheet",
    "case-clavicle-fracture-middle-third": "the clavicle is not named on the sheet",
    "deltopectoral-groove-contents": "not among the five declared spaces",
    "palmar-spaces-thenar-midpalmar": "not among the five declared spaces",
    "interosseous-membrane-attachments": "not among the declared fasciae",
    "thumb-movements-muscles": "the sheet explicitly excludes muscles of the hand",
    "extensor-expansion-formation": "the sheet explicitly excludes muscles of the hand",
    "case-wrist-laceration-vessels-nerves": "covered obliquely by the arteries and nerves lines, but set as a case rather than an SAQ",
    "upper-limb-superficial-veins-cephalic-basilic": None,  # declared; handled above
}

# Muscles the sheet's blanket "all muscles" covers but which never head a
# question in questions.json -- they appear only as MCQ distractors.
NEVER_HEADED_MUSCLES = ["coracobrachialis", "pectoralis minor", "subclavius",
                        "rhomboid major and minor", "levator scapulae",
                        "teres major", "teres minor (alone)"]

# The real end-of-year sittings that print per-question marks. Duplicate
# "solved"/recollection copies of the same paper are deliberately excluded.
CANONICAL_PAPERS = [
    (2025, "EOY (ISK - 101) 199 (1).pdf", True),
    (2024, "EOY (ISK - 101) 198 (1).pdf", True),
    # The two 2022 sittings are one combined Histology+Anatomy paper each and the
    # extractor caught only part of the Anatomy section, so their counts are not
    # comparable with the two above.
    (2022, "EOY 195 first 2022 101 ISK final (1).pdf", False),
    (2022, "EOY 195 first 2022  101 ISK  final module (1).pdf", False),
]

CASE_RE = re.compile(
    r"^\s*(case\s*\(?\d|(a|an|during|following|after)\b.{0,90}?"
    r"(year|man|woman|boy|girl|patient|lady|student|wife|labor|labour|game|accident|climb))",
    re.I | re.S)


def area_of(path):
    """Basis / Embryology / Upper Limb / Histology / off-tree, from a subject path."""
    if path.startswith(OFF):
        return "off-tree"
    if "Histology" in path:
        return "Histology"
    for a in ("Basis of Anatomy", "General Embryology", "Upper Limb"):
        if a in path:
            return {"Basis of Anatomy": "Basis", "General Embryology": "Embryology",
                    "Upper Limb": "Upper Limb"}[a]
    return "other"


def write_report(rows, objectives, unclustered, total):
    leaves = load_tree(STRUCTURE)
    by_key = {o["key"]: o for o in objectives}
    by_leaf = defaultdict(list)
    for o in objectives:
        by_leaf[o["subjectPath"]].append(o)

    L = []
    w = L.append
    w("# What module 101 ISK actually examines")
    w("")
    w("Built from `scripts/asu/extract/<module-slug>/questions.json` -- %d questions machine-extracted from 22 Kasr Al Ainy "
      "papers, 2021-2025 -- by `scripts/asu/extract/cluster.py`. The %d rows reduce to **%d distinct "
      "assessable objectives**. %d rows could not be assigned and are listed in the appendix."
      % (total, total, len(objectives), len(unclustered)))
    w("")
    w("**Mechanical, and therefore reproducible:** whitespace normalisation; occurrence, year and marks "
      "counting; the legibility score that picks which verbatim occurrence to quote as `canonicalAsked`; "
      "parsing the subject tree; testing each declared syllabus item against the cluster set; and the "
      "check that every one of the %d indices is assigned exactly once.")
    L[-1] = L[-1] % total
    w("")
    w("**Judgement, from reading all %d rows end to end:** which rows are the same assessable objective, "
      "what that objective is, where it sits in the tree, which declared syllabus item each cluster "
      "answers to, and which rows are too broken to place. No string-similarity matching was used to "
      "form a cluster. The papers reword one objective freely -- \"Describe Decidua regarding "
      "definition, parts and fates\" and \"Mention parts and fates of decidua\" share almost no words -- "
      "and they also reuse near-identical wording for objectives that are genuinely different, so "
      "similarity would have both split and merged the wrong things." % total)
    w("")
    w("Corroborating sources, used only to check conclusions and never to form a cluster: "
      "`scripts/asu/extract/notes.json` (the Anatomy Department orientation sheet, 150 teaching topics, "
      "153 past questions 2016-2024) and `scripts/asu/extract/mcq-bank.json` (2,704 distinct MCQs with "
      "repetition counts).")
    w("")

    # ------------------------------------------------------------------ 1
    w("## 1. The blueprint -- the top 40 objectives by how often they recur")
    w("")
    w("| # | Objective | Times | Years | Marks | Subject path |")
    w("|---|---|---|---|---|---|")
    for n, o in enumerate(objectives[:40], 1):
        yrs = ", ".join(str(y) for y in o["yearsAsked"]) or "undated"
        mr = o["marksRange"]
        mk = "-" if not mr else ("%g" % mr[0] if mr[0] == mr[1] else "%g-%g" % tuple(mr))
        w("| %d | %s | %d | %s | %s | %s |"
          % (n, o["label"], o["timesAsked"], yrs, mk, o["subjectPath"].replace("101 ISK > ", "")))
    w("")
    w("Independent corroboration: the most-repeated stems in the 2,704-question MCQ bank are wrist drop "
      "from nerve injury (x5), the lateral intermuscular septum (x5), branches of the ulnar artery, "
      "pronation and supination, cutaneous innervation of the palm, lateral rotation at the shoulder, "
      "loss of finger abduction, and carpal tunnel motor loss (all x4) -- the same nerve-injury and "
      "nerve-supply territory that dominates the table above.")
    w("")

    # ------------------------------------------------------------------ 2
    w("## 2. Coverage against the declared syllabus")
    w("")
    w("The Anatomy Department's orientation sheet (`notes.json` -> `orientation`, signed by the head of "
      "the department board) states the examinable syllabus for the 60-mark end-of-year Anatomy written "
      "paper. Each declared item is tested against the cluster set below. Note the sheet governs the "
      "**Anatomy** paper only -- Histology is set by a different department, so Histology clusters are "
      "not \"undeclared\", they are simply outside this sheet's remit.")
    w("")
    w("### 2a. Every declared item, and whether it has ever been examined")
    w("")
    w("| Declared item | Objectives | Total askings | Verdict |")
    w("|---|---|---|---|")
    never, thin = [], []
    for sec, item, keys in DECLARED:
        objs = [by_key[k] for k in keys if k in by_key]
        asks = sum(o["timesAsked"] for o in objs)
        if not objs:
            verdict = "**NEVER EXAMINED**"
            never.append((sec, item))
        elif asks <= 1:
            verdict = "**barely examined**"
            thin.append((sec, item, asks))
        else:
            verdict = "examined"
        w("| %s: %s | %d | %d | %s |" % (sec, item, len(objs), asks, verdict))
    w("")
    w("### 2b. Declared but never examined")
    w("")
    w("This is the most useful single fact here: material the department tells students to learn, and "
      "which no paper in the corpus has ever asked.")
    w("")
    NEVER_EVIDENCE = {
        "Joints -- acromioclavicular":
            "the words \"acromioclavicular\" and \"acromio-clavicular\" do not occur in any of the "
            "%d rows, in any spelling -- not as a question, not even as a wrong option" % total,
        "Joints -- superior & inferior radio-ulnar":
            "the radio-ulnar joints occur in five rows, every one of them as a wrong option inside a "
            "question about something else (which joint is a gomphosis; which is the biaxial ellipsoid "
            "joint) -- never as the subject of a question",
    }
    for sec, item in never:
        w("- **%s: %s** -- no cluster corresponds; %s."
          % (sec, item, NEVER_EVIDENCE.get(item, "no occurrence in the corpus")))
    w("")
    w("Both are declared twice over: the sheet says \"All joints except joints of the hand\", and the "
      "subject tree carries a `Joints of Upper Limb` leaf. Corroboration from the other two corpora "
      "shows this is a genuine examining habit and not an artefact of the 22 papers sampled: across the "
      "2,704-MCQ bank the acromioclavicular joint heads five one-off stems and the radio-ulnar joints "
      "three, against x4-x5 repetition for the favoured topics; across the 153 past questions of "
      "2016-2024 the acromioclavicular joint appears exactly once, as a 2024 *case*, and never as a "
      "short-answer question.")
    w("")
    for sec, item, asks in thin:
        w("- **%s: %s** -- %d asking in the whole corpus." % (sec, item, asks))
    w("")
    w("The veins deserve their own line. The sheet devotes a full clause to them -- \"all veins of the "
      "upper limb (beginning, course, end and name of the tributaries and areas drained by these "
      "tributaries)\" -- and in %d rows they are the subject of exactly one question, an MCQ in the 2024 "
      "end-of-module paper. Every other mention of the cephalic or basilic vein in the corpus is a "
      "distractor inside a question about the deltopectoral groove, the axillary lymph nodes or the "
      "brachial artery. In the wider 2016-2024 past-question set veins surface seven times, again only "
      "as MCQs or as one 2017 dialysis case -- never once as a short-answer question. Since the current "
      "paper is eight SAQs and two cases, a clause of the syllabus written in SAQ language has never "
      "been set as an SAQ." % total)
    w("")
    w("One more gap sits inside a declared item rather than replacing it. \"All muscles (attachment, "
      "nerve supply and action)\" is examined heavily, but only for a subset: the following muscles never "
      "head a question anywhere in the corpus and appear solely as MCQ distractors -- %s."
      % ", ".join(NEVER_HEADED_MUSCLES))
    w("")

    w("### 2c. Examined but not declared")
    w("")
    w("Anatomy clusters that no line of the orientation sheet covers. Either the syllabus has changed "
      "since these were set, or the paper overran it.")
    w("")
    w("| Objective | Times | Years | Why it is undeclared |")
    w("|---|---|---|---|")
    declared_keys = {k for _, _, ks in DECLARED for k in ks}
    undeclared = []
    for o in objectives:
        if o["key"] in declared_keys:
            continue
        a = area_of(o["subjectPath"])
        if a in ("Histology",):
            continue
        note = UNDECLARED_NOTE.get(o["key"])
        if a == "off-tree":
            note = note or ("outside the module entirely -- %s"
                            % o["subjectPath"].replace(OFF + ": ", ""))
        if note is None:
            continue
        undeclared.append((o, note))
    undeclared.sort(key=lambda t: -t[0]["timesAsked"])
    for o, note in undeclared:
        yrs = ", ".join(str(y) for y in o["yearsAsked"]) or "undated"
        w("| %s | %d | %s | %s |" % (o["label"][:110], o["timesAsked"], yrs, note))
    w("")
    off_objs = [o for o in objectives if "Lower Limb" in o["subjectPath"]
                or "Thorax" in o["subjectPath"]]
    off_asks = sum(o["timesAsked"] for o in off_objs)
    w("The largest single block of undeclared material is the 2025 case bank, which examines **lower "
      "limb and thorax**: %d objectives across %d askings -- common peroneal nerve, femoral neck "
      "fracture, femoral hernia, knee meniscus, sciatic nerve, coronary arteries, pleural effusion, "
      "haemopericardium, the cardiac conducting system, inhaled foreign body and aortic aneurysm. None "
      "of this is on the orientation sheet and none of it exists anywhere in the 101 subject tree, whose "
      "only regional chapter is Upper Limb. A student revising module 101 from either document would not "
      "know these were coming." % (len(off_objs), off_asks))
    w("")
    w("Two smaller overruns are worth naming. The sheet excludes muscles of the hand and joints of the "
      "hand, yet thumb movements and the extensor expansion are both examined. And lymphatics appear "
      "nowhere on the sheet, yet the groups of axillary lymph nodes and the lymphatic drainage of the "
      "breast are asked repeatedly -- including as the mastectomy case, which is the single most "
      "repeated case in the corpus.")
    w("")

    w("### 2d. Does the paper obey its own declared structure?")
    w("")
    w("The sheet states a fixed shape: 8 SAQs -- 2 basis, 2 embryology, 4 upper limb -- plus 2 cases. "
      "Counted from the Anatomy section of each real sitting that prints its marks (duplicate "
      "\"solved\" and recollection copies of the same paper excluded):")
    w("")
    w("| Year | Paper | Basis | Embryology | Upper limb SAQ | Cases | Obeys? |")
    w("|---|---|---|---|---|---|---|")
    idx_key = {}
    for o in objectives:
        for oc in o["occurrences"]:
            idx_key[oc["index"]] = o
    for year, fname, complete in CANONICAL_PAPERS:
        counts = defaultdict(int)
        cases = 0
        for i, r in enumerate(rows):
            if r["file"] != fname:
                continue
            if r.get("section") == "Histology":
                continue
            o = idx_key.get(i)
            if not o:
                continue
            if o["key"].startswith("case-") or CASE_RE.match(r["text"]):
                cases += 1
                continue
            counts[area_of(o["subjectPath"])] += 1
        ok = (counts["Basis"] == 2 and counts["Embryology"] == 2
              and counts["Upper Limb"] == 4 and cases == 2)
        verdict = ("**yes, exactly**" if ok else "no") if complete \
            else "partial extraction -- not comparable"
        w("| %d | %s | %d | %d | %d | %d | %s |"
          % (year, fname[:40], counts["Basis"], counts["Embryology"], counts["Upper Limb"],
             cases, verdict))
    w("")
    w("Only the 2025 paper obeys the declared structure, and it obeys it exactly: two basis questions "
      "(types of muscle attachment; primary against secondary cartilaginous joints), two embryology "
      "(decidua; folding), four upper limb (pectoralis major; radial nerve; deep palmar arch; elbow "
      "joint) and two cases. **2024** ran ten SAQs, not eight -- two basis, *three* embryology and "
      "*five* upper limb -- all at a flat 5 marks. **2022** is a different architecture again: a single "
      "combined Histology-and-Anatomy paper of fourteen short essays, twenty-nine MCQs and three "
      "extended-matching questions -- the two 2022 rows above are partial extractions, so the counts "
      "in them are not the paper's shape. This is not a paper drifting from its orientation: the sheet is "
      "headed \"End of Year, 2025-2026\", so it describes the format that 2025 introduced, and the "
      "earlier papers predate it.")
    w("")

    w("### 2e. Coverage by subject-tree leaf")
    w("")
    w("| Leaf | Distinct objectives | Total askings |")
    w("|---|---|---|")
    zero = []
    for leaf in leaves:
        objs = by_leaf.get(leaf, [])
        if not objs:
            zero.append(leaf)
        w("| %s | %d | %d |" % (leaf.replace("101 ISK > ", ""), len(objs),
                                sum(o["timesAsked"] for o in objs)))
    w("")
    w("**Leaves never examined once:**")
    w("")
    for leaf in zero:
        w("- %s" % leaf.replace("101 ISK > ", ""))
    w("")
    w("Three of these six are real gaps a student can act on: **Gametes** (no question on "
      "gametogenesis, spermatogenesis or oogenesis in eleven years), **Fetal Period**, and "
      "**Neuro Epithelium**. The other three are artefacts of how the tree was drawn -- Basis of "
      "Anatomy's Cardiovascular system and Nervous system leaves and Histology's Microscopes leaf carry "
      "content the papers do examine, but always inside a question filed elsewhere. Note also that "
      "Gametes and Fetal Period are absent from the orientation sheet too, so on that evidence they are "
      "genuinely not examinable and the tree, not the faculty, is what is out of step.")
    w("")
    off = sorted(p for p in by_leaf if p.startswith(OFF))
    if off:
        w("**Examined, but nowhere in the 101 subject tree:**")
        w("")
        for p in off:
            objs = by_leaf[p]
            w("- %s -- %d objectives, %d askings"
              % (p.replace(OFF + ": ", ""), len(objs), sum(o["timesAsked"] for o in objs)))
        w("")

    # ------------------------------------------------------------------ 3
    w("## 3. Drift")
    w("")
    w("A caution before the lists: the corpus is not a clean year-by-year sample. 2021 and 2022 are "
      "represented mostly by end-of-module MCQ papers, 2023 largely by a recollection list, and 2025 by "
      "one end-of-year paper plus a case bank. An objective \"disappearing\" after 2022 usually means "
      "the later MCQ papers are missing, not that the faculty stopped asking. The drift worth trusting "
      "is structural, and there are four movements.")
    w("")
    w("**The paper changed shape twice.** 2022 was one combined paper with fourteen short essays, "
      "twenty-nine MCQs and three extended-matching questions. By 2024 the MCQs and matching survive but "
      "the Anatomy section is ten flat 5-mark SAQs. By 2025 the MCQs have collapsed to twenty-six at "
      "half a mark, and Anatomy is the eight-SAQ, two-case structure the orientation sheet describes. "
      "The direction is consistent: fewer, heavier written questions, and MCQs falling from a full mark "
      "to a half.")
    w("")
    w("**Clinical cases arrived and then expanded past the module.** Cases appear in 2022 (one, the "
      "mastectomy), in 2024 (two) and in 2025 (two on the paper) -- but the 2025 case bank carries "
      "twenty-two, of which eleven are lower limb and thorax. Whatever the 2025 paper itself did, the "
      "material students were told to prepare stopped being an upper-limb module.")
    w("")
    w("**The end-of-module MCQ paper is substantially recycled year to year.** The 2023 end-of-module "
      "paper shares 45 of its 58 objectives with the 2022 one -- the same questions, often the same "
      "wording and the same distractors. The 2024 paper is a bigger break, sharing only 16-18 "
      "objectives with either.")
    w("")
    w("**A small stable core spans everything.** Two objectives are asked in all five years: the types "
      "and fates of secondary lysosomes, and ulnar nerve injury and claw hand. Sixteen more span four of "
      "the five.")
    w("")
    years = sorted({y for o in objectives for y in o["yearsAsked"]})
    w("Years present: %s. %d rows carry no year at all -- the compiled question banks, the Baqoon "
      "(third-sitting) lists and the upper-limb formative assessment."
      % (", ".join(str(y) for y in years),
         sum(1 for r in rows if not r.get("year"))))
    w("")

    # ------------------------------------------------------------------ 4
    w("## 4. Marks")
    w("")
    w("| Year | Questions printing a mark | Mark values used | Mean marks/question |")
    w("|---|---|---|---|")
    per_year = defaultdict(list)
    for r in rows:
        if r.get("marks") is not None and r.get("year"):
            per_year[r["year"]].append(r["marks"])
    for y in sorted(per_year):
        v = per_year[y]
        w("| %d | %d | %s | %.2f |"
          % (y, len(v), ", ".join("%g" % m for m in sorted(set(v))), sum(v) / len(v)))
    w("")
    w("2021 and 2023 print no per-question marks anywhere in the corpus -- the 2021 papers are "
      "MCQ answer keys and 2023 survives only as a recollection list -- so they cannot be included.")
    w("")
    w("The trend is steady inflation of the individual written question: mean 4.00 in 2022 across "
      "values of 2 to 5, 4.71 in 2024 with everything flattened to 4 or 5, and 5.06 in 2025 across 3 to "
      "7. Against that, MCQs move the other way. The 2024 paper marks its MCQ section \"{1 Mark each}\"; "
      "the 2025 paper marks its twenty-six MCQs \"{1/2 Mark each}\". Written answers are worth "
      "progressively more and recognition questions progressively less.")
    w("")
    w("### The orientation sheet's arithmetic is wrong, and the papers show which half to trust")
    w("")
    w("The sheet states: *8 SAQ (2 basis-2 embryology) 6 marks each and (4 upper) 7 marks each with "
      "total 54 mark* plus *2 cases, 3 marks each with total 6 mark*, under a heading of 60 marks.")
    w("")
    w("Four questions at 6 and four at 7 is 24 + 28 = **52**, not the 54 the sheet claims. Settling it "
      "from the paper rather than the sheet: the 2025 end-of-year Anatomy section prints its marks, and "
      "they are 6, 6, 6, 6, 7, 7, 7, 7 for the SAQs and 3, 3 for the two cases.")
    w("")
    w("So the **per-question figures on the sheet are exactly right** and the paper follows them "
      "question for question. It is the **stated subtotal that is wrong**: 52, not 54. The real Anatomy "
      "written paper therefore totals **58 marks, not the 60** the sheet is headed with. The two-mark "
      "discrepancy in the subtotal is the whole of the shortfall -- 52 + 6 = 58, while the sheet's "
      "54 + 6 = 60 only reaches the headline total because of the error. A student allocating revision "
      "time by marks should use 6/6/6/6/7/7/7/7/3/3, which is what the paper actually pays.")
    w("")

    # ------------------------------------------------------------------ 5
    w("## 5. What surprised me")
    w("")
    w("**The papers are recycled far more than the file count suggests.** Twenty-two PDFs are not "
      "twenty-two papers. Eight pairs are the same sitting twice -- an unsolved and a solved copy, or a "
      "student's recollection of the paper they had just sat. Once those are collapsed the corpus is "
      "about thirteen distinct sittings. And the recycling continues between sittings: the 2023 "
      "end-of-module paper is three-quarters the 2022 one.")
    w("")
    w("**The single most repeated thing in the corpus is not a topic but a question format.** Kasr "
      "examines by comparison table -- eosinophil against neutrophil, mast cell against plasma cell, "
      "unilocular against multilocular fat, plasma cell against macrophage, oesophagus against urinary "
      "bladder, primary against secondary cartilaginous joint, superficial against deep palmar arch, "
      "anterior against posterior carpal arch. These are not eight instances of \"know your cells\"; each "
      "is a distinct objective with its own printed answer grid, and a student who has revised the two "
      "entities separately can still fail the comparison.")
    w("")
    w("**Nerve injury outweighs nerve anatomy.** Across the blueprint, the MCQ bank and the case bank, "
      "the recurring winners are lesions, not descriptions: wrist drop, claw hand, winged scapula, Erb's "
      "palsy, carpal tunnel, flat shoulder. The orientation sheet anticipates this precisely -- its "
      "nerves clause ends \"and the effect of injury\" -- which makes it the one place where the sheet is "
      "a better guide to the paper than the subject tree is.")
    w("")
    w("**The corpus quietly stopped being an upper-limb module.** Eleven objectives and twenty-two rows "
      "examine the lower limb and thorax, all through the 2025 case bank, and neither the orientation "
      "sheet nor the subject tree contains a word about either region.")
    w("")
    w("**The extraction's own duplicates are informative rather than noise.** Where the same paper "
      "exists as both an unsolved and a solved copy, the solved copy sometimes settles an OCR ambiguity "
      "in the other -- the 2025 MCQ weighting reads as \"{2 Mark each}\" in the unsolved scan and "
      "\"{1/2 Mark each}\" in the solved one, and the half-mark is what makes the section total work.")
    w("")

    # ------------------------------------------------------------------ appendix
    w("## Appendix -- rows that could not be clustered")
    w("")
    w("%d of %d rows. Every one is an OCR casualty rather than a judgement call: the extractor split "
      "an MCQ across two rows and these are the halves carrying answer options but no question stem. "
      "They are listed rather than dropped so the count reconciles." % (len(unclustered), total))
    w("")
    w("| Index | File | Why |")
    w("|---|---|---|")
    for u in unclustered:
        w("| %d | %s | %s |" % (u["index"], u["file"][:38], u["why"]))
    w("")

    with open(OUT_MD, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L) + "\n")


if __name__ == "__main__":
    main()
