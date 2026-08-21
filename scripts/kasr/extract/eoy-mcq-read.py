#!/usr/bin/env python3
"""The multiple-choice sections of the end-of-YEAR papers, read off the images.

Three of the seeded end-of-year papers say in their own `incomplete` note that
they carry a multiple-choice section which is not seeded, on the grounds that
"the multiple-choice bank is authored separately under seeds/mcq/". That was
true of where such questions belong and false about what happened next: the bank
was built from the thirty question books and later the six end-of-module papers,
and nobody ever went back for these. Sixty-eight questions this faculty actually
set, on papers already transcribed for their written half, were in no batch at
all.

They are legible — cleanly typeset, and in the 2022 paper's case printed with
the faculty's own `CMD0QP180000` process header — but the pages carry no text
layer, so `pdftotext` returns nothing and the OCR pass never reached them.
Read off the rendered images instead.

`EOY 195 first 2022` Section B, pp. 14–16: 29 questions at ½ mark each.
`EOY (ISK - 101) 198` Section 2 part II, p. 9: 10 questions at 1 mark each.

Its part III — two extended-matching tables on p. 10, 1 mark each — is NOT here.
A matching question is neither a written question nor a question-book MCQ;
`seeds/types.ts` says it belongs to the paper it was sat on, which means to that
paper's `Paper` seed, and that is where those two tables should go.

No answers, for the same reason as the 2024 script: these are blank papers with
no key. Answers come from the department book at authoring.

    python3 scripts/kasr/extract/eoy-mcq-read.py
"""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "eoy-mcq-read.json")

PAPERS = {
    "eoy-195-2022": {
        "sourceId": "src_51fef9b6234c5d381f59",
        "file": "EOY 195 first 2022 101 ISK final (1).pdf",
        "section": "Section B: Multiple Choices questions",
        "marksEach": 0.5, "satYear": 2022, "tier": "end_of_year",
    },
    "eoy-198-2024": {
        "sourceId": "src_e2593cfba37af83a33ad",
        "file": "EOY (ISK - 101) 198 (1).pdf",
        "section": "Section 2 part II: MCQ questions",
        "marksEach": 1.0, "satYear": 2024, "tier": "end_of_year",
    },
}

# (paper, page, number, stem, a, b, c, d)
Q = [
 ("eoy-195-2022", 14, 1, "Rough endoplasmic reticulum is involved in:", "Protein synthesis", "Steroid synthesis", "Energy production", "Cell recognition"),
 ("eoy-195-2022", 14, 2, "Microtubules, microfilaments, and intermediate filaments are components of:", "cell membrane", "Nucleus", "Golgi apparatus", "Cytoskeleton"),
 ("eoy-195-2022", 14, 3, "The smooth endoplasmic reticulum is concerned with:", "Calcium pumping in muscle contraction", "Protein synthesis", "Energy production", "Packaging of proteins"),
 ("eoy-195-2022", 14, 4, "Peripheral chromatin:", "Is a part of euchromatin", "Is attached to inner nuclear membrane", "Surrounds the nucleolus", "Is scattered in the nuclear sap"),
 ("eoy-195-2022", 14, 5, "In nerve cells, the Golgi body is located:", "Apical", "Perinuclear", "Basal", "Eccentric"),
 ("eoy-195-2022", 14, 6, "Silver staining is used to demonstrate:", "Mitochondria & cell membrane", "Golgi apparatus & cell membrane", "Lysosomes & Golgi apparatus", "Mitochondria & sER"),
 ("eoy-195-2022", 14, 7, "Maintenance of the cell membrane is the function of:", "Golgi apparatus", "Mitochondria", "Rough endoplasmic reticulum", "Smooth endoplasmic reticulum"),
 ("eoy-195-2022", 14, 8, "The axoneme of the cilia is composed of:", "27 microtubules", "9 microtubules", "20 microtubules", "18 microtubules"),
 ("eoy-195-2022", 14, 9, "Fibroblasts have:", "Few organelles", "Dark nucleus", "Well-developed Golgi apparatus", "Pale basophilic cytoplasm"),
 ("eoy-195-2022", 15, 10, "Connective tissue cell that shows a signet ring appearance with H&E stain is:", "Lymphocyte", "Multilocular fat cell", "Fibroblast", "Unilocular fat cell"),
 ("eoy-195-2022", 15, 11, "Connective tissue cell that can be stained vitally with the India ink stain is:", "Mast cell", "Macrophage", "Reticular cell", "Plasma cell"),
 ("eoy-195-2022", 15, 12, "Mucoid connective tissue is found in one of the following sites:", "Cornea", "Aorta", "Stroma of organs", "Umbilical cord"),
 ("eoy-195-2022", 15, 13, "The type of connective tissue proper (C.T.) forming the tendons is:", "White adipose C.T.", "Regular white fibrous C.T.", "Loose areolar C.T.", "Reticular C.T."),
 ("eoy-195-2022", 15, 14, "Reticular fibers can be stained brown with:", "H&E", "Silver", "Sudan III", "Orcein"),
 ("eoy-195-2022", 15, 15, "Histiocytes (macrophage) originate from:", "B-lymphocytes", "Pericytes", "Monocytes", "Adipocytes"),
 ("eoy-195-2022", 15, 16, "Choose the correct answer about function of loose areolar connective tissue:", "Heat generation", "Forms stroma of the glands", "Binds structures together", "Withstands stress in one direction"),
 ("eoy-195-2022", 15, 17, "One of the epithelial tissue characters is:", "Low power of regeneration", "Consists of cells & excess intercellular space", "Penetrated by blood vessels", "Clear or non-clear basement membrane"),
 ("eoy-195-2022", 15, 18, "Simple squamous epithelium is formed of one layer of:", "Cube-like cells with flat nuclei", "Flat cells with rounded nuclei.", "Flat cells with flat nuclei", "Cube-like cells with rounded nuclei"),
 ("eoy-195-2022", 15, 19, "Simple cubical epithelium is concerned with:", "Secretion", "Gas exchange", "Contraction", "Protection"),
 ("eoy-195-2022", 16, 20, "Regarding the exocrine gland:", "It is only unicellular", "It is only merocrine", "Its secretion is carried by blood", "Its secretion is carried by duct system"),
 ("eoy-195-2022", 16, 21, "Stereocilia are composed of:", "Intermediate filaments", "Long microvilli", "Microtubules", "Short microvilli"),
 ("eoy-195-2022", 16, 22, "One character for macula adhererns (desmosome) is:", "Encircles the apex of the cell", "Permitting exchange of ions", "Formed of attachment plaque anchoring intermediate filaments", "Formed of condensed protein anchoring microfilaments"),
 ("eoy-195-2022", 16, 23, "Anchoring fibrils attaching the basement membrane to underlying C.T. is:", "Collagen type IV", "Collagen type III", "Collagen type VII", "Collagen type II"),
 ("eoy-195-2022", 16, 24, "Regarding the hemidesmosomes:", "Like gap junctions", "Include membrane infoldings and mitochondria", "Located at apex of the cell", "Present at basal parts of the basal cells"),
 ("eoy-195-2022", 16, 25, "The largest cell in the bone marrow is:", "Pericyte", "Osteogenic cell", "Fat cell", "Fibroblast"),
 ("eoy-195-2022", 16, 26, "Neutrophils:", "Increase in parasitic disease", "Increase in acute pyogenic infection", "Terminate allergy", "Result in the humoral immunity"),
 ("eoy-195-2022", 16, 27, "Concerning Reticulocytes:", "Number decreases in hemorrhage", "Can be stained by supravital stain", "Percentage in normal blood is more than 7%", "Smaller than RBCs"),
 ("eoy-195-2022", 16, 28, "Granulomere of blood platelets contains:", "Dense tubular system", "Actin microfilaments", "Delta granules", "Open canalicular system"),
 ("eoy-195-2022", 16, 29, "Cell membrane of basophils has receptors for:", "Immunoglobulin D", "Immunoglobulin E", "Immunoglobulin A", "Immunoglobulin M"),

 ("eoy-198-2024", 9, 1, "The silver (Ag) & PAS stains are used to demonstrate:", "Cell membrane", "Nucleolus", "Ribosomes", "Lysosomes"),
 ("eoy-198-2024", 9, 2, "The functions of Golgi apparatus include:", "Pinocytosis", "Phagocytosis", "Energy production", "Lysosomes"),
 ("eoy-198-2024", 9, 3, "Pars Granulosa is present in:", "Cytoplasm", "Nuclear membrane", "Nucleolus", "DNA"),
 ("eoy-198-2024", 9, 4, "The organelle that can divide by simple division:", "Mitochondria", "Golgi apparatus", "Endoplasmic reticulum", "Lysosomes"),
 ("eoy-198-2024", 9, 5, "The rootlet of the cilia is composed of ........ microtubules:", "27", "20", "9", "18"),
 ("eoy-198-2024", 9, 6, "Pericytes have:", "Actin & Myosin", "Dark nucleus", "Many lysosomes", "Negative Golgi image"),
 ("eoy-198-2024", 9, 7, "Connective tissue cell responsible for wound healing:", "Fat cell", "Lymphocyte", "Mast cell", "Fibroblast"),
 ("eoy-198-2024", 9, 8, "Connective tissue cell that can be stained with Toluidine blue stain is:", "Reticular cell", "Macrophage", "Mast cell", "Plasma cell"),
 ("eoy-198-2024", 9, 9, "Type of connective tissue proper forming sclera is ....... C.T. :", "Irregular white fibrous", "Loose areolar", "Mucoid", "Reticular"),
 ("eoy-198-2024", 9, 10, "collagen fibers can be stained with :", "Hematoxylin & Eosin", "Silver (Ag)", "Sudan III", "Orcein"),
]


def main():
    rows = []
    for paper, page, number, stem, a, b, c, d in Q:
        meta = PAPERS[paper]
        rows.append({
            "sourceId": meta["sourceId"], "file": meta["file"],
            "paper": paper, "section": meta["section"], "marks": meta["marksEach"],
            "satYear": meta["satYear"], "tier": meta["tier"],
            "page": page, "number": number, "stem": stem,
            "options": {"a": a, "b": b, "c": c, "d": d},
            # Blank papers: no key printed and no candidate's marks either.
            "answer": None, "answerConfidence": "none",
            "confidence": "high", "readBy": "image",
        })

    counts = {}
    for row in rows:
        counts[row["paper"]] = counts.get(row["paper"], 0) + 1
    json.dump({"readBy": "page images at 150 dpi, transcribed by eye",
               "papers": PAPERS, "count": len(rows), "byPaper": counts,
               "notSeededHere": {
                   "eoy-198-2024": "Section 2 part III, two extended-matching tables on p10 at 1 mark "
                                   "each. A matching question belongs to its paper's seed, not the "
                                   "MCQ bank — see seeds/types.ts on WrittenFormat 'matching'.",
                   "eoy-2022-second": "Its Section B, 29 questions on pp11-13, is legible and still "
                                      "unread. Same treatment as the 2022 first sitting above.",
               },
               "questions": rows}, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"{len(rows)} end-of-year MCQs -> {OUT}")
    for paper, n in sorted(counts.items()):
        print(f"  {n:>3}  {paper}  ({PAPERS[paper]['marksEach']} mark each)")


if __name__ == "__main__":
    main()
