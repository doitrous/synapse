# AU-MED-105 · Histology · question-led triage

Lane W1-105-HIST. `GUARD = bank` — no End of Module or End of Year paper exists for
AU-MED-105. Per the no-paper guard, the MCQ banks are the triage source and
`exam_signal` tier is the **bank** tier, never a paper's, for every concept below.

## Bank inventory checked (all four named in the dispatch)

| Bank | sourceId | Department | Manifest `category` | Histology-relevant items |
|---|---|---|---|---|
| Histology's own bank | `src_fc2b7922f6377d572f37` | Histology | Department Questions | **47 of 47** |
| Module's "EOM MCQs -" file | `src_6bb87147b493350691fc` (preferred twin of `src_9484e81af0b173505ec4`) | Anatomy | **Department Questions** — filename carries "EOM MCQs -" but the manifest does **not** classify it "End of Module paper"; under the no-paper guard it stays bank-tier regardless of the filename | 0 — Upper Limb gross anatomy only, checked by keyword sweep (chondro-, osteo-, periosteum, myofibril, sarcomere, neuroglia, Schwann, Nissl, myelin, sarcolemma, Z-line, histolog-, microscop-, lacuna, trabecul- — zero hits in 25 pages / 25,626 chars); see content judgement below |
| General bank 1 | `src_37ce166b69d2c0a0f0ab` ("MCQs - امتحان تجريبي 1") | General | Department Questions | 0 — a written practical (labelling) mock exam, Anatomy upper/lower-limb muscles, nerves and vessels only |
| General bank 2 | `src_f52b688229ba15f4b183` ("MCQs - امتحان تجريبي 2") | General | Department Questions | 0 — same format, same department, no histology content |

**Record for the orchestrator, per the note on resume:** the "EOM MCQs -" file
(`EOM MCQs - Upper limp final MCQ Dr_ Ibrahim.pdf`) is classified `Department Questions`
in the AU-Y1 manifest, not `End of Module paper` — confirmed directly against
`au-y1-sources.json`. There are zero rows anywhere in AU-MED-105 carrying category
`End of Module paper`, `End of Module answers` or `End of Year paper` (P0-E's own
extraction log for this module says the same). So every AU-MED-105 bank, including the
one with "EOM" in its filename, is bank-tier under the no-paper guard, and Histology's
`exam_signal` entries below are all tagged `bank`, never `paper`.

Only the Histology bank contributes items to this department. The other three were read
in full (pagetext cache, native extraction, 0 empty/unreadable pages) to confirm that,
not skipped.

### Content judgement on the "EOM MCQs -" file — bank, not a sitting paper

Read in full (25 pages, native text) rather than judged from the filename or the
manifest category alone, per the orchestrator's addendum. Evidence, all from the
document's own text:

- **Header (p1):** "أسئلة المراجعة النهائية" ("final revision questions") · "Upper Limb"
  · "**Artist Of Anatomy**" · "120 سؤال شامل على المنهج الكامل" ("120 comprehensive
  questions covering the whole curriculum") · "DR/ IBRAHIM AMR". No faculty letterhead,
  no "Alexandria University" institutional seal, no exam code, no date, no declared time
  limit or total marks — none of the header furniture a faculty-set sitting paper in this
  corpus otherwise carries.
- **"Artist Of Anatomy" is this lecturer's own tutoring brand**, not the faculty's — the
  same masthead appears verbatim on the two General-folder "امتحان تجريبي" ("mock exam")
  files triaged above (`src_37ce166b69d2c0a0f0ab`, `src_f52b688229ba15f4b183`), which are
  explicitly self-labelled *تجريبي* (mock/trial). Same author, same house style, same
  "comprehensive revision" framing — this file reads as a companion revision bank from
  the same source, not a different kind of document.
- **Numbering and answer key:** continuous 1–120 (never restarts, unlike the Histology
  bank's per-topic 1–N blocks that mirror separate practical sittings), with the key
  printed as a single compact grid on the last page — consistent with a personally
  compiled question set, not a scanned/transcribed institutional paper.
- **No cohort, no stream, no sitting-year marker anywhere** — manifest `examSignals` are
  null/null/null (confirmed already above), and no dated header, no مصريين/وافدين split,
  no "Time allowed" / "Total mark" line appears in the extracted text.

**Judgement: lecturer's own revision/practice bank, not a faculty-set sitting paper.**
`exam_signal` tier stays **bank**, consistent with every other source in this module —
the "EOM" in the filename names what the questions are *for* (End-of-Module revision),
not that the document *is* an End-of-Module paper. This does not change the count above
(still 0 Histology-relevant items either way).

## Top summary

| Questions triaged | Keyed | Unkeyed | Distinct concepts tested | Hit-live | Hit-pending | New |
|---|---|---|---|---|---|---|
| 47 | 47 | 0 | 30 | 5 | 6 | 19 |

- **Key status:** *answer block* — a clean, typed "Answer key" section on page 17 of the
  same PDF, organised by lecture topic, question numbers restarting at 1 per topic. Not a
  separate file, not a highlight, not a mark on the page. Sanity-checked: section sizes in
  the key (6, 5, 6, 7, 5, 7, 6, 5 = 47) match the question count on the corresponding pages
  exactly.
- **Cohort / stream / sitting year (manifest `examSignals`):** null / null / null on
  `src_fc2b7922f6377d572f37` and on all three other banks checked. No cohort number, no
  مصريين/وافدين marker, no dated header anywhere in this set — nothing to record beyond
  "none stated".
- All 47 questions are **diagram-dependent** — every stem references "the opposite
  photo/diagram" with lettered or numbered structures that do not exist as text. Per
  brief: these stay diagram questions and each will need a media request at authoring
  time; none can be answered from the extracted text alone, only cross-checked against
  the printed key.

## Hazard: the key's own section boundaries do not track content exactly

The key groups the 47 questions into 8 named blocks matching the 8 lecture-slide PDFs
(Cartilage 6, Bone components and bone cells 5, Types of bones 6, Histogenesis of bone
and healing of a fracture 7, Nervous 1 5, Nervous II 7, Skeletal muscles 6, Smooth
muscles 5 — sums to 47). But content inside two of those blocks does not match the block
header: the first two questions printed under "Bone components and bone cells" (p3, Q1–2)
test elastic-cartilage fibre composition and lack of a perichondrium — cartilage content,
not bone — and the first two questions printed under "Smooth muscles" (p15, Q1–2) test
tropomyosin covering myosin-binding sites and epimysium identification — both skeletal
muscle, not smooth muscle. Grouping below is by **content**, not by the key's printed
header, with the mismatch flagged inline. This does not affect which answer belongs to
which question — the key's per-block numbering and the page numbering agree — only which
lecture chapter should own each concept.

## Department-book chapter note

Histology carries **no** `Department Book` — category rows in this folder are Lecture
Slides (8, one PPT-turned-PDF per topic below), Practical (13: 5 "Faculty PPT" .pptx
decks + 4 distinct slide-image sets, each with an "Updated" twin), 1 Department
Questions (the bank triaged here), and 3 `Unknown` notebook/revision PDFs under
`Dr_ Iman Nabil/` (`Musculoskeletal مذكرة`, `Nervous tissue2023`, `Revision
Musculoskeletal`) that read as the closest thing to a department book this corpus has
for this subject. Chapters below are named for the 8 lecture-slide PDFs; the `Unknown`
notes cover the same 8 topics in summary/revision form and are candidate article sources
at Step 2, not a separate chapter.

## Questions by chapter, grouped by tested idea

Page numbers are 1-indexed within `src_fc2b7922f6377d572f37`. "Key" is the option number
printed in the source (1–4), not a re-lettering.

### 1 · Cartilage (`src_7034aaa06bf7503eeab9`)

| p | Stem | Key |
|---|---|---|
| 1 Q1 | Match cartilage type to site (hyaline/fibrocartilage options) | 4 |
| 1 Q2 | Statement describing the cartilage type in the diagram (matrix, perichondrium, distribution) | 3 |
| 1 Q3 | Statement describing the structure at 3 (perichondrium parts a/b) | 2 |
| 2 Q4 | Cell A resides in space *: perichondrium layer / growth role | 3 |
| 2 Q5 | Where is this cartilage type found (site) | 2 |
| 2 Q6 | Vignette: perforated nasal septum, poor spontaneous healing — why | 4 |
| 3 Q1 | Which fibres predominate this cartilage type (mislabelled under "Bone components" in the key — content is elastic cartilage) | 4 |
| 3 Q2 | Statement describing the tissue in the diagram (bluish translucent / perichondrium absence) — same mislabel | 2 |

Concepts tested: **(1)** cartilage types (hyaline/fibrocartilage/elastic) told apart by
matrix and site — p1Q1, p2Q5, p3Q1, p3Q2; **(2)** perichondrium structure, two layers and
their vascularity/cellularity — p1Q2, p1Q3; **(3)** growth of cartilage — chondrogenic
cells, interstitial vs appositional growth — p2Q4; **(4)** cartilage avascularity and its
clinical healing consequence — p2Q6.

### 2 · Bone components and bone cells (`src_0eafb20c7901f75f4a2b`)

| p | Stem | Key |
|---|---|---|
| 3 Q3 | Which cell is the bone-forming cell (labelled options) | 3 |
| 4 Q4 | Where are these cells located (periosteum/endosteum/Haversian canal/matrix) | 4 |
| 4 Q5 | Characteristic feature of structure 4 | 4 |
| 5 Q1 | Statement describing cell at A (protein-synthesising / lacuna / lining / epithelium-like) | 2 |
| 5 Q2 | Function of the cell in the photo (maintenance/division/secretion/resorption) | 1 |
| 5 Q3 | Statement describing the tissue in the photo (osteon / shaft of long bone) | 2 |

Concepts tested: **(5)** the four bone cell types and their functional differentiation
(osteoprogenitor / osteoblast / osteocyte / osteoclast) — p3Q3, p5Q2; **(6)** osteocyte
location within lacunae, and Haversian-system (osteon) structure — p4Q4, p5Q1, p5Q3;
**(7)** periosteum structure and vascularity (outer fibrous vs inner cellular layer) —
p4Q5.

### 3 · Types of bones (`src_aaf7a0cec220b28dffef`)

| p | Stem | Key |
|---|---|---|
| 6 Q4 | True statement about pointed structures (osteon lamellae / tendon attachment) | 3 |
| 6 Q5 | Correct statement about the tissue (nourishment, trabeculae, flat-bone diploe, old osteons) | 4 |
| 6 Q6 | LS compact bone, structures A & B (periosteum connection vs osteon lamellae) | 3 |
| 7 Q1 | Differentiate cancellous vs compact bone histologically | 4 |

Concepts tested: **(6, shared with chapter 2)** osteon/Haversian-system components —
p6Q4, p6Q6; **(8)** Volkmann's (perforating) canals as distinct from Haversian canals —
p6Q6; **(9)** cancellous/spongy bone structure, trabeculae and nutrition by diffusion —
p6Q5; **(10)** histological features distinguishing compact from cancellous bone — p7Q1.

### 4 · Bone histogenesis, growth and healing of a fracture (`src_f5b593db0fcb8f456e5a`)

| p | Stem | Key |
|---|---|---|
| 7 Q2 | Which structure prevents periosteum separating from bone | 2 |
| 7 Q3 | Vignette: fractured distal tibia, cast, X-ray at 1 month — which healing stage | 2 |
| 8 Q4 | Which letter is calcium-ion deposition on the matrix | 4 |
| 8 Q5 | Correct sequence of the four stages of flat-bone (intramembranous) formation | 4 |
| 8 Q6 | Alkaline phosphatase secretion occurs at which stage | 4 |
| 8 Q7 | Which statement does NOT apply to adult bone remodelling | 3 |

Concepts tested: **(11)** Sharpey's/perforating fibres anchoring periosteum — p7Q2;
**(12)** fracture-healing stages/timeline — p7Q3; **(13)** intramembranous ossification,
the sequence of stages — p8Q5; **(14)** mineralisation/calcification of the matrix —
p8Q4; **(15)** osteoblast alkaline phosphatase in mineralisation — p8Q6; **(16)** adult
bone remodelling as a balance of deposition and resorption — p8Q7.

### 5 · Nervous tissue 1 — neurons and nerve fibres (`src_d92917abb1d986fb273d`)

| p | Stem | Key |
|---|---|---|
| 9 Q1 | True statement re structure B (Golgi/Nissl/sheath in the neuron) | 4 |
| 9 Q2 | Where are these nerve fibres located (sympathetic NS / white matter / median nerve / grey matter) | 1 |
| 9 Q3 | Statement NOT true of the cell in the photo (Schwann cell vs oligodendrocyte traits) | 2 |
| 10 Q4 | Which numbers are structures never covered by a sheath | 2 |
| 10 Q5 | Where are the cells at (1) located (cerebral cortex/autonomic ganglia/olfactory mucosa/cerebellar cortex) | 4 |

Concepts tested: **(17)** neuron perikaryon features — Nissl bodies, Golgi apparatus,
distinguishing cell body from process — p9Q1; **(18)** nerve-fibre types by location and
myelination — p9Q2, p10Q4; **(19)** Schwann cell vs oligodendrocyte — myelination pattern
and regeneration capacity — p9Q3; **(20)** neuron classification by shape and location
(unipolar/pseudounipolar/bipolar/multipolar; ganglia, retina, cerebellum, olfactory
mucosa) — p10Q5.

### 6 · Nervous II — peripheral nerves, neuroglia, degeneration & regeneration (`src_23b11b8a5d80e8591a15`)

| p | Stem | Key |
|---|---|---|
| 11 Q1 | Where is this nerve-cell type located (olfactory mucosa/cortex/retina/sensory ganglia) | 4 |
| 11 Q2 | Statement NOT a character of the pointed structure (Nissl/Golgi in axon vs cell body) | 3 |
| 11 Q3 | Function of the cell at (1) (phagocytosis/myelin/BBB/CSF — which neuroglial cell) | 3 |
| 12 Q4 | Right sequence for nerve-fibre regeneration after injury | 4 |
| 12 Q5 | Which letter forms the blood–nerve barrier | 3 |
| 12 Q6 | Where are these fibres located (optic/parasympathetic/ulnar/sympathetic) | 3 |
| 12 Q7 | Which neuroglial cell is a member of the mononuclear phagocytic system | 2 |

Concepts tested: **(20, shared)** neuron classification by shape/location — p11Q1;
**(17, shared)** neuron perikaryon/process distinguishing features — p11Q2; **(21)**
neuroglial cell functions — astrocyte (BBB), microglia (phagocytosis, monocyte lineage),
oligodendrocyte (CNS myelin), ependymal cell (CSF-related lining) — p11Q3, p12Q7;
**(22)** Wallerian degeneration and the sequence of peripheral nerve regeneration —
p12Q4; **(23)** perineurium as the blood–nerve barrier — p12Q5; **(18, shared)**
myelinated vs unmyelinated fibre distribution by location — p12Q6.

### 7 · Skeletal muscles and motor end plate (`src_a96e2a50798977e2cc3c`)

| p | Stem | Key |
|---|---|---|
| 13 Q1 | Components of the marked band (A band/I band/H band filament content) | 3 |
| 13 Q2 | Function of structure A (T-tubule/SR/mitochondria/sarcolemma) | 4 |
| 13 Q3 | Histopathology after severe skeletal-muscle injury — expected finding | 3 |
| 14 Q4 | Which diagram is the relaxed sarcomere | 3 |
| 14 Q5 | Which letters (bands) shorten during contraction | 4 |
| 14 Q6 | Where is choline esterase found | 2 |

Concepts tested: **(24)** sarcomere band composition and the shortening mechanism (A/I/H
bands, thick/thin filaments) — p13Q1, p14Q4, p14Q5; **(25)** T-tubule / sarcoplasmic
reticulum roles in excitation–contraction coupling — p13Q2; **(26)** skeletal muscle's
limited regenerative capacity and fibrosis after severe injury — p13Q3; **(27)** motor
end plate / neuromuscular junction, acetylcholinesterase location — p14Q6.

### 8 · Smooth muscles (`src_a0af78a838b4203340ba`)

| p | Stem | Key |
|---|---|---|
| 15 Q1 | Which letter directly covers the myosin-binding sites (mislabelled under "Smooth muscles" — content is skeletal thin-filament regulation) | 3 |
| 15 Q2 | Which letter is the epimysium (same mislabel — skeletal muscle covering) | 1 |
| 15 Q3 | Statement NOT describing the fibres in the diagram (rounded/troponin/desmin/epimysium) | 4 |
| 16 Q4 | Why are smooth muscles unstriated | 3 |
| 16 Q5 | Correct statement describing caveolae | 2 |

Concepts tested: **(28, shared with chapter 7)** muscle connective-tissue coverings —
epimysium / perimysium / endomysium — p15Q2; **(29)** troponin–tropomyosin thin-filament
regulation (tropomyosin covers the myosin-binding site) — p15Q1; **(30)** smooth-muscle
ultrastructure — spindle shape, absence of troponin/sarcomeres, desmin filaments, no
epimysium, irregular filament arrangement giving no striations, caveolae as the
T-tubule equivalent — p15Q3, p16Q4, p16Q5.

## Distinct ideas → key-search classification

Search run: `find-existing.mjs`, ≥4 queries per idea (73 queries total, log kept in the
lane's scratchpad), plus the mandatory sweep — `find-existing.mjs` already globs every
`docs/*-Source-Imports/**` batch per §12/§16, so the separate
`grep -ril "<key>" docs/*-Source-Imports/concept/` is redundant with it for every hit
found below; no canonical key is minted yet (mint freeze is lifted per §16, but Step 1
does not mint — this is triage only).

| # | Idea (chapter) | Status | Evidence |
|---|---|---|---|
| 1 | Cartilage types by matrix & site (Ch.1) | **HIT-PENDING** | `CON-MSK-AEB62E99182AEE` · key `cartilage-three-types-and-their-sites` · `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` |
| 2 | Perichondrium structure, two layers (Ch.1) | **NEW** | no hit: "perichondrium", "chondrogenic layer", "perichondrium layer" |
| 3 | Growth of cartilage — chondrogenic cells, interstitial/appositional (Ch.1) | **NEW** | no hit: "chondroblast", "interstitial growth cartilage", "appositional growth", "growth of cartilage" |
| 4 | Cartilage avascularity & healing (Ch.1) | **NEW** | no hit: "avascular cartilage", "cartilage healing" |
| 5 | Bone-cell functional differentiation, 4 types (Ch.2) | **HIT-LIVE** | `CON-MSK-967E873EEEACE0` "Bone cells include osteogenic cells, osteoblasts, osteocytes, and osteoclasts" (live); detail also pending as separate osteoblast/osteoclast records in `103-BMS-histology-concepts.md` |
| 6 | Osteocyte in lacunae + Haversian system/osteon structure (Ch.2, Ch.3) | **HIT-LIVE** | `CON-MSK-5DF0AED914A81E` "A Haversian canal is surrounded by 5–20 concentric circular bony lamellae with osteocytes in lacunae" |
| 7 | Periosteum structure & vascularity (Ch.2) | **NEW** | "periosteum" only hits `CON-MSK-C30E73A5353ABB` (bone growth in length at the epiphyseal plate) — a different objective, not periosteal histology; recorded as a near-miss, not merged |
| 8 | Volkmann's (perforating) canals (Ch.3) | **NEW** | no hit: "Volkmann", "Volkmann canal", "perforating canal" |
| 9 | Cancellous/spongy bone, trabeculae, diffusion nutrition (Ch.3) | **NEW** | no hit: "cancellous bone", "spongy bone"; "trabeculae" hits only a splenic-capsule concept (`104-CPS-practical-concepts.md`) — unrelated |
| 10 | Compact vs cancellous distinguishing features (Ch.3) | **NEW** | no direct hit beyond #6/#9 above |
| 11 | Sharpey's fibres anchoring periosteum (Ch.4) | **NEW** | no hit: "Sharpey" |
| 12 | Fracture-healing stages/timeline (Ch.4) | **NEW** | no hit: "fracture healing", "callus" |
| 13 | Intramembranous ossification — sequence of stages (Ch.4) | **NEW** | related-not-identical to `CON-MSK-2C78EFB16CA67F` "A bone forms either directly in a connective tissue membrane or by replacing a cartilage model" (`ossification-membranous-versus-cartilaginous`, 101-ISK) — that concept classifies *which* ossification type a bone uses, mine tests the *stage sequence* within intramembranous ossification; different objective, cross-link candidate |
| 14 | Mineralisation/calcification of matrix (Ch.4) | **NEW** | no hit: "bone mineralization", "calcification bone" |
| 15 | Osteoblast alkaline phosphatase in mineralisation (Ch.4) | **NEW** | no hit: "alkaline phosphatase" |
| 16 | Adult bone remodelling balance (Ch.4) | **NEW** | no hit: "bone remodelling", "bone remodeling", "remodeling adult bone", "resorption deposition bone" |
| 17 | Neuron perikaryon — Nissl bodies (Ch.5, Ch.6) | **HIT-PENDING** | `CON-FND-4AE74C678A6F64` "Nissl's granules are the basophilic clumps of rough endoplasmic reticulum seen in a nerve cell body" · key `nissl-granules-identification` · `101-ISK-practical-concepts.md` |
| 18 | Nerve-fibre types by location/myelination (Ch.5, Ch.6) | **HIT-LIVE** | `CON-NEU-EBD57894496834` (spinal white matter, myelinated) + `CON-NEU-B4D6D846D1CE2D` (spinal grey matter, unmyelinated) — narrower scope (spinal cord only) than the question set (autonomic/CNS/PNS generally); overlapping, not identical, cross-link candidate |
| 19 | Schwann cell vs oligodendrocyte — myelination & regeneration (Ch.5) | **NEW** | only hit is `CON-NEU-D4F0E159BFE0FB` / `CON-NEU-257D04C406D649`, both Schwannoma (tumour pathology) — different grain, recorded as a rejected-merge candidate, not a hit |
| 20 | Neuron classification by shape/location (Ch.5, Ch.6) | **HIT-PENDING** | `CON-FND-14D80DE53DE835` "Nerve cells are classed by how many processes leave the cell body" · key `neuron-shape-classes-unipolar-bipolar-and-multipolar` · `101-ISK-mcq-concepts.md` |
| 21 | Neuroglial cell functions — astrocyte/microglia/oligodendrocyte/ependymal (Ch.6) | **NEW** (partial) | ependymal-lining fact only is live (`CON-NEU-C45F198095AD06`); astrocyte/microglia/oligodendrocyte functions have no hit at all |
| 22 | Wallerian degeneration & nerve regeneration sequence (Ch.6) | **NEW** | no hit: "Wallerian degeneration", "nerve regeneration", "regeneration axon", "nerve fiber degeneration" |
| 23 | Perineurium / blood–nerve barrier (Ch.6) | **NEW** | no hit: "perineurium", "epineurium", "blood-nerve barrier" |
| 24 | Sarcomere bands & contraction shortening (Ch.7) | **HIT-LIVE** | `CON-MSK-70448A9B07D24A` (live) "Contraction shortens I band, abolishes H zone, preserves A band…"; also pending `CON-MSK-E36936D62038BF` `skeletal.myofibril.a-and-i-bands` in `103-BMS-histology-concepts.md` — possible near-duplicate between live and pending, flagged for Step 2, not resolved here |
| 25 | T-tubule/SR in excitation–contraction coupling (Ch.7) | **HIT-PENDING** (different grain) | `CON-MSK-3013AA61E917B7` `muscle.excitation-contraction-coupling.calcium-troponin` (103-BMS) is a physiology mechanism concept; mine is the histological ultrastructure identification of T-tubule/SR — overlapping, cross-link candidate |
| 26 | Skeletal-muscle regeneration/fibrosis after injury (Ch.7) | **NEW** | no hit: "skeletal muscle regeneration", "muscle fibrosis" |
| 27 | Motor end plate / NMJ — acetylcholinesterase (Ch.7) | **HIT-PENDING** (different grain) | `CON-MSK-77D955AAB4D0FA` `muscle.neuromuscular-transmission.sequence` (103-BMS) is the physiology sequence; several pending *questions* in `103-BMS-MCQ-nerve-muscle.md` also name AChE — no dedicated histology-identification concept exists yet |
| 28 | Muscle connective-tissue coverings — epimysium/perimysium/endomysium (Ch.7, Ch.8) | **HIT-LIVE** | `CON-MSK-DA9D9E8758B3FF` (epimysium, live) + `CON-MSK-0E3AE8E79060E1` (endomysium, live); perimysium alone has no hit anywhere |
| 29 | Troponin–tropomyosin thin-filament regulation (Ch.8, actually skeletal) | **NEW** (histology framing) | only hit is `CON-MSK-3013AA61E917B7` (103-BMS, physiology EC-coupling mechanism) — no dedicated ultrastructure/identification concept for "tropomyosin covers the myosin-binding site" |
| 30 | Smooth-muscle ultrastructure — caveolae, dense bodies, unstriated (Ch.8) | **HIT-PENDING** | `CON-MSK-888DFA3AA4E974` "Smooth muscle has caveolae instead of T-tubules and dense bodies instead of Z lines, and its irregular myofilaments leave it unstriated" · key `smooth.muscle-ultrastructure.em-picture` · `103-BMS-histology-concepts.md` — covers all three of p15Q3/p16Q4/p16Q5 in one record |

**Totals:** 5 hit-live, 6 hit-pending, 19 new — matching the top table. (Idea #29 is
counted as `NEW` despite one overlapping physiology concept, because no existing record —
live or pending — states the histological fact this bank tests: that tropomyosin covers
the myosin-binding site. The overlap is noted for cross-linking, not counted as a hit.)

## OWED

- Every `NEW` idea above still needs the ≥4-query search re-confirmed at mint time (Step
  2) per §16 rule 4 — this triage's searches are the first pass, not a substitute for the
  pre-mint check on the exact label finally chosen.
- Three near-miss / different-grain pairs are flagged for a deliberate decision at Step
  2, not resolved here: **#7** periosteum (existing concept is about bone growth, not
  periosteum histology), **#13** intramembranous ossification stages vs the existing
  ossification-type-classification concept, **#25/#27/#29** the three EC-coupling/NMJ
  physiology concepts in `103-BMS-mcq-vitamins-nerve-concepts.md` vs the histology
  ultrastructure identifications this bank actually tests.
- **#24** sarcomere bands has both a live concept and a pending 103-BMS concept that may
  be a near-duplicate of each other (not of mine) — worth the next lane checking before
  either is updated twice.
- The module's practical materials are **not** triaged here — Step 1 is question-led and
  GUARD=bank gives no practical exam to triage from. The folder holds 5 "Faculty PPT"
  `.pptx` decks (Cartilage, Bone, Nervous tissue 1, Nervous tissue 2, Muscle — one per
  practical session) plus 4 distinct histology-slide image sets (each with a
  non-byte-identical "Updated" twin per the manifest's dedup findings), 9 distinct
  sources in total across the 13 `Practical`-category rows. None of the `.pptx` files
  were read — `pagetext.py` is PDF-only (`fileType == "pdf"` filter) and reading them
  would need `python-pptx`, which is outside this triage's scope. Flagging for the later
  practical lane per the dispatch's own note.
- The 3 `Unknown`-category notebook/revision PDFs (`Musculoskeletal مذكرة`, `Nervous
  tissue2023`, `Revision Musculoskeletal`) were extracted (pagetext cache present) but
  not read in detail for this triage — they are candidate article sources at Step 2,
  named here so the next step does not have to rediscover them.

## HAZARDS

- All 47 questions are diagram/image-based; every one will need a media request at
  authoring time (Step 3) since the actual histology photomicrographs/diagrams are not
  in the extracted text.
- The key's printed section boundaries do not reliably track content — see the hazard
  section above. Do not assume a question belongs to the chapter its printed header
  names; four questions (p3 Q1–2, p15 Q1–2) test a different chapter's content than the
  block they are printed under.
- The three other module banks (the "EOM MCQs -" file and the two General banks) all
  read cleanly and all contain zero Histology content — confirmed by full-text keyword
  sweep and by reading the practical mock exams in full, not assumed from department
  folder alone. Recording this here so no later lane re-opens these three files looking
  for Histology questions.
- `find-existing.mjs` needed both a broad and a narrow query for several ideas — e.g.
  "trabeculae" alone returns an unrelated splenic-capsule concept; the narrow terms
  ("Volkmann", "Sharpey", "caveolae") are what actually separate a real hit from noise.

BLOCKED: none.
