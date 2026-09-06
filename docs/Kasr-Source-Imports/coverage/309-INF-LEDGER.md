# 309 INF — coverage ledger (Year 3, Infectious Diseases: Microbiology & Parasitology)

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| bank Introduction + Trematoda MCQ (Q1-19, `8_Bank_of_Questions,_MCQs,_Cases_&_Formative_assesment_+_Collection.pdf`) | 18 | 1 | 0 | 0 | 19 |
| bank Cestoda MCQ (Q1-28, answer table p.6) | 25 | 3 | 0 | 0 | 28 |
| **bank Trematoda + Cestoda clusters total** | **43** | **4** | **0** | 0 | — |
| 309 INF module (Microbiology + Parasitology sub-corpora) | 43 | 4 | 0 | Nematoda p.7-12, Protozoology p.14-20, Entomology p.22 | — |

## Module opened

This is the FIRST authored content in Kasr Al Ainy **Year 3**, module **309 INF**
(Infectious Diseases: Microbiology & Parasitology). Best solved paper picked from the 309
sources: the department/faculty **Parasitology question bank**
`8_Bank_of_Questions,_MCQs,_Cases_&_Formative_assesment_+_Collection.pdf` (manifest sourceId
`src_10f1a669aa2eeedf3cd9`, sha256
`10f1a669aa2eeedf3cd95f73664022018e901f6af879c1be9c9afe6276502365`; native text layer, 56
pages). It was chosen because it is the ONLY 309 source that is both genuine 4-option MCQ AND
keyed: each parasite-class section (Trematoda, Cestoda, Nematoda, Protozoology, Entomology) ends
with a printed answer table. The large sibling `Para MCQ & Match PY V2.0.pdf` (272 pp) is the
same question series but UNSOLVED (0 marked answers); the "solved" files are either written /
Give-Reasons banks (`Para ABC solved.pdf`), essay + matching exams (`EOY - 309 EOY 197 1st.pdf`)
or image-only (`EOM - 309 197.pdf`, `FA Para BookAnswered.pdf`). **Sitting year: none** — a
compiled "Collection" bank grouped by parasite class, not a single dated sitting; no printed
calendar year on the answer pages, so `examSittingYear`=null. Field contract mirrors the opened
Year 3 modules 310 PAT and 317 FMT.

## Answer-key method

Native text layer (no OCR, no colour-key). The correct answer is read from the section's PRINTED
ANSWER-KEY TABLE — e.g. p.3 "Answers of Introduction + Trematoda" reads `1 C 2 C 3 D ...`. The key
is machine-readable native text, not a colour/highlight, so no render was needed:
`pagetext.mjs render` refused p.3 as "not garbled", confirming the text layer is authoritative.
Keys transcribed directly from the answer table and sample-cross-checked against known
parasitology (Q2 Fasciola metacercaria=C, Q3 Pirenella→Heterophyiasis=D, Q6 Fasciola via
metacercaria on plants=B, Q9 sheep liver fluke=A) — all consistent. Recovered keys:
`coverage/309-INF-triage-keys.txt`.

## Paper structure (MCQ sections, each with its own printed answer table)

- MCQs of **Introduction + Trematoda** — **Q1-19** (pp.2-3, answers p.3) — **this tranche**.
- MCQs of Cestoda (pp.4-5, answers p.6) — next slice.
- MCQs of Nematoda (pp.7-12, answers p.13).
- MCQs of Protozoology (pp.14-20, answers p.21).
- MCQs of Entomology (p.22, answers p.23).
- Cross matching Questions (pp.24-28, answers p.29) — matching, not 4-option MCQ.
- Clinical Cases Questions (pp.30-32, answers p.33) — case/essay, not MCQ.

## Cluster — bank Introduction + Trematoda (Q1-19)

**18/19 questions authored, 1 held, 0 excluded.** Q12 is held as an **in-source exact duplicate**
of Q15 (identical stem "Spurious infection is related to:", same options, same printed key B); Q15
is authored, Q12 held to avoid a duplicate item. **16 concepts** minted university-blind
(`CON-INF-` + first 14 hex of SHA-256 of the canonical key, uppercased): one atomic fact per
question, with **two deliberate in-batch reuses** where two MCQs test one reciprocal fact —
Q2+Q6 share the Fasciola infective-stage concept (`CON-INF-D8B5E96BCF9A16`) and Q4+Q18 share the
Linguatula→halzoun concept (`CON-INF-3EE3B9E2CE37B8`). Collision-checked against the corpus
concept IDs — **no collisions, no unintended in-batch duplicates**. No reusable parasitology
concept existed in the corpus to adopt (searched trematode/Fasciola/Schistosoma/Heterophyes
canonical keys — none present), so all 16 are new. Parasitology has no single body-system home,
so the concept system prefix is `INF` and the `## subject` is `inf` (matching the existing
`CON-INF-`/subject `inf` convention of the ASU-INF microbiology concepts — concept ids are
university-blind). Concepts filed under the parasitology discipline nodes `DIS-PAR` (general
parasitology, 2), `DIS-PAR-T02` (Helminthology, 13) and `DIS-PAR-T03` (Arthropods/pentastomes:
Linguatula, 1). Grouped into two cross-linked library articles: `ART-INF-309-PARA-GENERAL`
(host-parasite general principles, 2 concepts) and `ART-INF-309-PARA-TREMATODA` (flukes and
food-borne trematodes, 14 concepts). Written from standard parasitology teaching corroborated by
this bank's own printed-answer-key stems and options; no department book PDF was read this pass.
All records carry `publication_status=needs_evidence` / `status=Draft` pending attachment of a
department source.

Gates (all from `.gates/`): **batch** items=18 errors=0; **simulate** batches=4 created=37
rejected=0 errors=0; **audit** category-neutral vs the 317 FMT baseline — no NEW category, only the
module-wide `needs_evidence` Draft placeholders (blank optional fields, missing
evidenceBasis/claimIds) that the 317 opener also carries (309: 149 findings vs 317: 268).

## Cluster — bank Cestoda (Q1-21 of 28)

**20/21 authored, 1 held, 0 excluded** (this slice covers Q1-21; Q22-28 remain untriaged). Keys read
from the printed answer table **'Answers of Cestoda' p.6** (native text; no OCR):
`1 B 2 C 3 C 4 D 5 D | 6 B 7 D 8 C 9 C 10 D | 11 B 12 D 13 B 14 B 15 C | 16 C 17 C 18 B 19 D 20 C |
21 D 22 D 23 C 24 C 25 B | 26 C 27 C 28 D`. All 28 keys recovered from the table; sample
cross-checked against parasitology (Q1 Cysticercus bovis→beef tapeworm B, Q2 operculated egg→
Diphyllobothrium C, Q5 man-only-intermediate→Echinococcus D, Q13 blind IH→cysticercosis B,
Q21 dog→Echinococcus D — all consistent).

**Q8 HELD (unreliable key):** the answer table gives Q8 = **C (Heterophyes heterophyes)** but the stem
is *'Undercooked **meat** is the source of infection with'* — Heterophyes is fish-borne, and undercooked
meat/beef is the source of **Taenia saginata (option D)**. The printed key contradicts the stem and
established parasitology, so the item is held for human adjudication rather than authored to a wrong
fact (never guess a key). Note Q17 and Q26 are in-source exact duplicates ('Corticosteroids are used in
cysticercosis treatment to:', same options, both key C); Q26 is in the untriaged Q22-28 range and will be
held when that range is authored.

**17 concepts minted** university-blind (`CON-INF-` + first 14 hex of SHA-256 of the canonical key,
uppercased; collision-checked corpus-wide — no collisions), with two deliberate in-batch reuses
(Q4+Q15 share the Taenia-solium-cysticercosis concept `CON-INF-61F78E487864E9`; Q12+Q16 share the
Diphyllobothrium-B12-deficiency concept `CON-INF-E1BFD3D459FA76`) and one cross-cluster reuse
(Q18, 'Heterophyes not transmitted via vegetables', reuses the Trematoda concept
`CON-INF-FFB06468007C2B` and points its library at `ART-INF-309-PARA-TREMATODA`). All new cestode
concepts filed under `DIS-PAR-T02` (Helminthology) and grouped into a new article
`ART-INF-309-CESTODA` (tapeworms of Taenia, Diphyllobothrium, Echinococcus, Hymenolepis),
cross-linked bidirectionally to `ART-INF-309-PARA-GENERAL` and `ART-INF-309-PARA-TREMATODA`. All
records `publication_status=needs_evidence` / `status=Draft`.

Gates (all from `.gates/`): **batch** items=20 errors=0 (with concept + article + resource `--with`
siblings); **simulate** batches=4 created=57 rejected=0 errors=0; **audit** category-neutral vs the 309-INF
baseline — 292 findings, all the module-wide `needs_evidence`/Draft placeholders (blank optional fields:
evidenceBasis/claimIds/spanIds/notes, aliases, reviewDue, arabicLabel, microtopicId, approved*ResourceIds),
no NEW category type (the count scales with the whole simulated module, not a new defect class).

## Cluster — bank Cestoda tail (Q22-28)

**5/7 authored, 2 held, 0 excluded** (Q22 D indirect cycle=Hymenolepis nana; Q23 C Casoni=immediate
hypersensitivity; Q24 C anaphylaxis in hydatidosis; Q25 B coenurosis=Taenia multiceps; Q27 C helminths
by ingestion of flea). Keys read from the printed 'Answers of Cestoda' table p.6. **Q26 HELD** (in-source
exact duplicate of Q17, corticosteroids-in-cysticercosis, same key C). **Q28 HELD** (unreliable key): the
table gives Q28 = D (Hymenolepis nana) but the stem 'Cyclops is involved in the life cycle of' points to
Diphyllobothrium latum (option B) — Cyclops is the copepod first intermediate host of D. latum, not of
H. nana; a Q8-style key/stem contradiction, held for human adjudication. **5 new concepts minted**
university-blind under DIS-PAR-T02 (`CON-INF-8EF99977712B01` H. nana indirect cycle, `CON-INF-1AB1AFB917678E`
Casoni test, `CON-INF-25F2060F654366` hydatid-rupture anaphylaxis, `CON-INF-95155ACD58617A` coenurosis/
T. multiceps, `CON-INF-6CCC3CAEC2A24F` cestode transmission by flea ingestion), all added to
`ART-INF-309-CESTODA`. Gates (`.gates/`): **batch** items=25 errors=0; **simulate** batches=4 created=67
rejected=0 errors=0; **audit** 332 findings, category-neutral vs the 309-INF baseline (only the module-wide
needs_evidence/Draft placeholder families; no NEW category type — count scales with the added records).

## Next cluster

Author the **Nematoda MCQ** slice (p.7-12, answer table p.13); then Protozoology (answers p.21) and
Entomology (answers p.23). Recover each section's keys from its own printed answer table before authoring.
