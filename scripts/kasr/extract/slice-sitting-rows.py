#!/usr/bin/env python3
"""Split the unauthored sat-paper questions into one small file per leaf.

163 questions came off the end-of-module papers that are in no question book,
and three attempts to author them from the bank died: `mcq-bank.json` is 2,867
rows and several megabytes, and an agent that opens it to find forty rows has
spent its context before it starts reading them.

That is a mechanical problem with a mechanical answer. The grouping — which leaf
a question belongs to — is keyword work; the authoring is judgement. This does
the first so the second is possible.

A row whose leaf cannot be told from its words goes to `unassigned.json` rather
than to a guess. Filing a question under the wrong leaf puts it in front of a
student revising something else, and hides it from the one revising the right
thing.

Writes to `scripts/kasr/extract/sitting-rows/<leaf-slug>.json`.
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
BANK = os.path.join(HERE, "mcq-bank.json")
SEEDS = os.path.join(REPO, "scripts/kasr/seeds/mcq")
OUT = os.path.join(HERE, "sitting-rows")

# What each leaf is about, in the words these papers use. Ordered: the first
# leaf whose terms appear wins, so the specific ones come before the general.
# Drawn from the subject tree in docs/Kasr-Source-Imports/academic/101-isk-structure.md.
LEAVES = [
    ("nerve-supply-of-upper-limb-nerve-injuries", ["brachial plexus", "radial nerve", "ulnar nerve",
        "median nerve", "musculocutaneous", "axillary nerve", "nerve injur", "claw hand",
        "wrist drop", "erb", "klumpke", "root value"]),
    ("joints-of-upper-limb", ["shoulder joint", "elbow joint", "wrist joint", "radio-ulnar",
        "radioulnar", "glenohumeral", "sternoclavicular", "acromioclavicular"]),
    ("hand", ["palmar arch", "carpal", "scaphoid", "thenar", "hypothenar", "lumbrical",
        "palmar aponeurosis", "snuff box", "metacarpal", "finger"]),
    ("forearm", ["forearm", "pronator", "supinator", "flexor digitorum", "brachioradialis",
        "cubital fossa", "interosseous membrane"]),
    ("arm", ["biceps", "triceps", "brachialis", "profunda brachii", "spiral groove", "arm "]),
    ("axilla", ["axilla", "axillary artery", "axillary vein", "breast", "mammary"]),
    ("pectoral-region", ["pectoralis", "pectoral", "clavipectoral", "deltopectoral"]),
    ("shoulder-region", ["deltoid", "rotator cuff", "supraspinatus", "infraspinatus",
        "teres", "subscapularis", "scapula"]),
    ("muscles-of-the-back", ["latissimus", "trapezius", "rhomboid", "levator scapulae"]),
    ("veins-of-the-upper-limb", ["cephalic vein", "basilic", "median cubital", "venous"]),
    ("gametes", ["spermatozo", "oocyte", "oogenesis", "spermatogenesis", "gamete", "meiosis"]),
    ("first-week-of-development", ["fertilis", "fertiliz", "zygote", "cleavage", "morula",
        "blastocyst", "implantation"]),
    ("second-week-of-development", ["bilaminar", "amniotic cavity", "trophoblast",
        "syncytiotrophoblast", "cytotrophoblast", "yolk sac"]),
    ("third-week-of-development", ["gastrulation", "primitive streak", "notochord",
        "trilaminar", "neural tube", "somite", "mesoderm"]),
    ("embryonic-period", ["organogenesis", "embryonic period", "folding", "branchial", "pharyngeal arch"]),
    ("fetal-period", ["fetal period", "fetus", "crown-rump", "gestational age"]),
    ("fetal-membranes", ["placenta", "decidua", "chorion", "amnion", "umbilical", "amniotic fluid"]),
    ("microscopes", ["microscope", "electron microscop", "resolution", "magnificat", "objective lens"]),
    ("microtechniques", ["fixation", "fixative", "paraffin", "microtome", "section", "staining technique",
        "haematoxylin", "hematoxylin", "eosin", "histochemi"]),
    ("the-cell", ["cell membrane", "plasmalemma", "unit membrane", "glycocalyx"]),
    ("cytoplasm", ["mitochondri", "golgi", "endoplasmic reticulum", "ribosome", "lysosome",
        "peroxisome", "centriole", "microtubule", "microfilament", "cytoskeleton", "organelle"]),
    ("nucleus", ["nucleus", "nucleol", "chromatin", "nuclear envelope", "heterochromatin",
        "euchromatin", "barr body"]),
    ("red-blood-corpuscles", ["red blood", "erythrocyte", "corpuscle", "haemoglobin", "hemoglobin",
        "reticulocyte", "crenat"]),
    ("granular-leukocytes", ["neutrophil", "eosinophil", "basophil", "granulocyte", "granular leuco"]),
    ("non-granular-leukocytes", ["lymphocyte", "monocyte", "agranulocyte", "non granular"]),
    ("blood-platelets", ["platelet", "thrombocyte", "hyalomere", "granulomere", "megakaryocyte"]),
    ("haemopoiesis", ["haemopoie", "hemopoie", "bone marrow", "stem cell", "erythropoie"]),
    ("connective-tissue-cells", ["fibroblast", "macrophage", "mast cell", "plasma cell", "pericyte",
        "adipocyte", "fat cell", "histiocyte"]),
    ("connective-tissue-fibres", ["collagen", "elastic fibre", "elastic fiber", "reticular fibre",
        "reticular fiber"]),
    ("types-of-connective-tissue-proper", ["areolar", "adipose", "mucoid", "loose connective",
        "dense connective", "irregular connective"]),
    ("surface-epithelium", ["epithelium", "squamous", "cuboidal", "columnar", "transitional",
        "pseudostratified", "urothelium"]),
    ("glandular-epithelium", ["gland", "secretor", "merocrine", "apocrine", "holocrine", "acinus"]),
    ("neuro-epithelium", ["neuroepitheli", "neuro epitheli", "taste bud", "olfactor"]),
    ("myo-epithelium", ["myoepitheli", "myo epitheli"]),
    ("polarity-and-membranous-specializations", ["microvill", "cilia", "cilium", "stereocili",
        "desmosome", "tight junction", "junctional complex", "basement membrane", "terminal bar"]),
    ("introduction", ["anatomical position", "planes of the body", "terms of relation", "sagittal", "coronal"]),
    ("fascia", ["superficial fascia", "deep fascia", "fascia"]),
    ("skeletal-system", ["bone", "ossificat", "epiphys", "diaphys", "periosteum", "cartilage", "skeleton"]),
    ("articular-system", ["joint", "synovial", "fibrous joint", "cartilaginous joint", "symphysis", "suture"]),
    ("muscular-system", ["muscle", "tendon", "aponeurosis", "origin and insertion", "pennate"]),
    ("cardiovascular-system", ["artery", "arteries", "vein", "capillar", "anastomos", "end artery"]),
    ("lymphatic-system", ["lymph", "lymphatic", "thoracic duct", "spleen", "thymus"]),
    ("nervous-system", ["neuron", "nerve fibre", "nerve fiber", "ganglion", "spinal cord",
        "brain", "central nervous", "autonomic"]),
]


def leaf_for(text):
    """The leaf whose vocabulary this question uses, or None."""
    low = text.lower()
    for slug, words in LEAVES:
        if any(word in low for word in words):
            return slug
    return None


def main():
    bank = json.load(open(BANK, encoding="utf-8"))
    rows = bank.get("questions") or bank.get("rows")

    authored = set()
    for name in os.listdir(SEEDS):
        if name.endswith(".ts"):
            authored.update(re.findall(r"key:\s*'([^']+)'", open(os.path.join(SEEDS, name), encoding="utf-8").read()))

    todo = [r for r in rows if r.get("fromSitting") and r["key"] not in authored]
    grouped, unassigned = {}, []
    for row in todo:
        slug = leaf_for(row["stem"] + " " + " ".join((row.get("options") or {}).values()))
        slim = {k: row[k] for k in ("key", "stem", "options", "answer", "answerConfidence",
                                    "satOn", "confidence", "optionsInStem") if k in row}
        slim["occurrences"] = row.get("occurrences", [])
        if slug: grouped.setdefault(slug, []).append(slim)
        else: unassigned.append(slim)

    os.makedirs(OUT, exist_ok=True)
    for slug, items in sorted(grouped.items()):
        json.dump({"leaf": slug, "count": len(items), "questions": items},
                  open(os.path.join(OUT, f"{slug}.json"), "w", encoding="utf-8"),
                  indent=1, ensure_ascii=False)
    json.dump({"count": len(unassigned), "questions": unassigned},
              open(os.path.join(OUT, "unassigned.json"), "w", encoding="utf-8"),
              indent=1, ensure_ascii=False)

    print(f"{len(todo)} unauthored sat-paper rows")
    for slug, items in sorted(grouped.items(), key=lambda kv: -len(kv[1])):
        full = sum(1 for q in items if len(q.get("options") or {}) >= 4)
        print(f"  {len(items):>3} ({full} with 4 options)  {slug}")
    print(f"  {len(unassigned):>3} unassigned — no leaf's vocabulary matched")


if __name__ == "__main__":
    main()
