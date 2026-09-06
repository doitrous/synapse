# 309 INF — coverage ledger (Year 3, Infectious Diseases: Microbiology & Parasitology)

| cluster | authored | held | excluded | remaining | total |
|---|---:|---:|---:|---:|---:|
| bank Introduction + Trematoda MCQ (Q1-19, `8_Bank_of_Questions,_MCQs,_Cases_&_Formative_assesment_+_Collection.pdf`) | 18 | 1 | 0 | 0 | 19 |
| bank Cestoda MCQ (Q1-28, answer table p.6) | 25 | 3 | 0 | 0 | 28 |
| bank Nematoda MCQ (Q1-67, answer table p.13) | 59 | 8 | 0 | 0 | 67 |
| bank Protozoology MCQ (Q1-16 of 84, answer table p.21) | 15 | 0 | 0 | Q6 + Q17-84 | 84 |
| **bank Trematoda + Cestoda + Nematoda + Protozoology clusters total** | **117** | **12** | **0** | Protozoology Q6/Q17-84 + Entomology | — |
| 309 INF module (Microbiology + Parasitology sub-corpora) | 117 | 12 | 0 | Protozoology Q6 + Q17-84 p.14-20, Entomology p.22 | — |

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

## Cluster — bank Nematoda (Q1-20 of 67)

**18/20 authored, 2 held, 0 excluded** (this tranche covers Q1-20, pp.7-8; Q21-67 remain untriaged). The
Nematoda section is large — **67 questions**, all keyed by the single printed answer table **'Answers of
Nematoda' p.13** (native text; no OCR). Keys for Q1-20 read from that table:
`1 C 2 B 3 C 4 B 5 D | 6 B 7 B 8 A 9 B 10 C | 11 A 12 A 13 A 14 C 15 D | 16 B 17 C 18 A 19 C 20 B`.
Sample cross-checked against parasitology (Q2 Strongyloides via skin penetration=B, Q4 pruritus ani→
Enterobius=B, Q5 rectal prolapse→Trichuris=D, Q6 Strongyloides stool rhabditiform larva=B, Q17 iron-
deficiency anaemia→Ancylostoma=C, Q20 hookworm infective filariform larva=B — all consistent).

**Q8 HELD (stem/parasitology mismatch):** the table gives Q8 = A (Ascaris) but the stem is *'The following
**adult** helminth may cause pulmonary manifestations'* — Ascaris pulmonary manifestations (Loeffler
syndrome) are produced by the migrating **larvae**, not the adult worm. Held for human adjudication rather
than authored to an off-target stem. **Q11 HELD (misassigned triad):** the stem *'Peri-orbital oedema,
fever, eosinophilia'* is the classic diagnostic triad of **Trichinella spiralis**, which is not among the
four options; the printed key B (Toxocara cati) is the best-of-offered eosinophilic tissue nematode but the
periorbital-oedema triad is misassigned, so the item is held. Held items never authored to a wrong fact.

**18 concepts minted** university-blind (`CON-INF-` + first 14 hex of SHA-256 of the canonical key,
uppercased; collision-checked corpus-wide incl. `docs/import-ready` — no collisions, no in-batch
duplicates). One atomic fact per question, no reuse needed — even the five Strongyloides items test distinct
facts (anaemia types, skin-penetration route, rhabditiform stool stage, internal+external autoinfection,
larva currens). All filed under `DIS-PAR-T02` (Helminthology) and grouped into a new article
`ART-INF-309-NEMATODA` (intestinal and tissue roundworms), cross-linked bidirectionally to
`ART-INF-309-PARA-GENERAL`. All records `publication_status=needs_evidence` / `status=Draft`. Generated by
the `scripts/content` seed→emit pipeline (`coverage/seeds/309-INF/bank-nematoda.json` →
`question/309-INF-nematoda-mcq.md`).

Gates (all from `.gates/`): **batch** items=18 errors=0 (~0.7s, with concept + article + resource `--with`
siblings); **simulate** batches=4 created=79 rejected=0 errors=0 (~0.7s); **audit** 483 findings (~0.2s),
category-neutral vs the 309-INF baseline (only the module-wide needs_evidence/Draft placeholder families —
evidenceBasis/claimIds/spanIds/notes, blank aliases/questionIds/microtopicId/nanotopicId/media/lastReviewed/
reviewDue/arabicLabel; no NEW category type; the count scales from the Cestoda run's 332 with the added 18
concepts + 1 article, ~+8 blank-field findings per new record).

## Cluster — bank Nematoda (Q21-50 of 67)

**28/30 authored, 2 held, 0 excluded** (this slice covers Q21-50, pp.9-11; Q51-67 remain untriaged). Keys read
from the single printed 'Answers of Nematoda' table p.13 (native text; no OCR): `21 D 22 C 23 D 24 D 25 D |
26 B 27 C 28 D 29 A 30 B | 31 C 32 A 33 B 34 D 35 C | 36 C 37 B 38 C 39 C 40 A | 41 C 42 A 43 B 44 B 45 C |
46 B 47 C 48 B 49 C 50 B`. Sample cross-checked against parasitology (Q22 barefoot→hookworm C, Q24 skin
penetration→Strongyloides D, Q32 depigmentation→Onchocerca A, Q37 transient pulmonary→Ascaris/Loeffler B,
Q45 dwarf threadworm→Strongyloides C, Q48 tropical pulmonary eosinophilia→high eosinophil count B — all
consistent). This slice extends the section from intestinal roundworms into the tissue/filarial nematodes
(Wuchereria, Brugia, Onchocerca, Loa, Trichinella).

**Q40 HELD (incomplete source):** the printed bank lists only three options for Q40 ('Brugia malayi differs
from Wuchereria bancrofti in...': a reservoir hosts, b hydrocoele, c diurnal periodicity); no fourth option is
printed in the native text (confirmed by `pagetext grep` across all 56 pages). The key A (Brugia has animal
reservoir hosts) is correct parasitology, but a valid 4-option MCQ cannot be authored without fabricating a
distractor, so held. **Q50 HELD (ambiguous key):** the table gives Q50 = B ('Onchocerca nodule develops over
bony prominences'), which is correct, but option a ('It is a granulomatous reaction') is also a defensible true
statement about an onchocercoma; with two arguably-correct options and one printed key, held for human
adjudication rather than authored with a defensible distractor.

**21 concepts minted** university-blind (`CON-INF-` + first 14 hex of SHA-256 of the canonical key, uppercased;
collision-checked corpus-wide incl. `docs/import-ready` — no collisions), with **7 cross-question reuses** where
the atomic fact was already covered: Q21 reuses the Capillaria-fish concept `CON-INF-5FE99BA373F17F` (Q18);
Q22 and Q46 reuse the hookworm filariform-skin-penetration concept `CON-INF-1AAC26110CD919` (Q20); Q24 reuses
the Strongyloides skin-penetration concept `CON-INF-C40504A90D83F9` (Q2); Q29 reuses the hookworm blood-loss
concept `CON-INF-621A94B9409492` (Q17); Q44 reuses the Trichuris rectal-prolapse concept `CON-INF-B11783ED1FC082`
(Q5); Q47 reuses the Capillaria internal-autoinfection concept `CON-INF-848175DB22D158` (Q7). All 21 new concepts
filed under `DIS-PAR-T02` (Helminthology) and added to `ART-INF-309-NEMATODA` (title/summary extended to name the
filarial/tissue worms). All records `publication_status=needs_evidence` / `status=Draft`. Generated by the
`scripts/content` seed→emit pipeline (`coverage/seeds/309-INF/bank-nematoda.json` → `question/309-INF-nematoda-mcq.md`).

Gates (all from `.gates/`), committed per ~10-MCQ slice (Q21-30, Q31-39, Q41-49): **batch** items=46 errors=0;
**simulate** batches=4 created=128 rejected=0 errors=0; **audit** 651 findings, category-neutral vs the 309-INF
baseline (only the module-wide needs_evidence/Draft placeholder families — aliases, approvedFile/VideoResourceIds,
arabicLabel, atomicClaimIds/claimIds, evidenceBasis, lastReviewed, media, microtopicId, nanotopicId, notes,
originalWording, questionIds, relatedArticleIds, reviewDue, spanIds; no NEW category type — count scales from the
Q1-20 run's 483 with the added 28 questions + 21 concepts).

## Cluster — bank Nematoda tail (Q51-67 of 67)

**13/17 authored, 4 held, 0 excluded** (this slice covers Q51-67, pp.12-13; the Nematoda section is now complete at
59/67 authored, 8 held). Keys read from the single printed 'Answers of Nematoda' table p.13 (native text; no OCR):
`51 B 52 B 53 B 54 B 55 B | 56 A 57 D 58 B 59 B 60 C | 61 B 62 C 63 D 64 A 65 C | 66 B 67 B`. Authored Q51 (Strongyloides
skin-penetration filariform), Q52 (Capillaria fish-eating-bird reservoir), Q53 (Enterobius ectopic female-genital
granuloma), Q55 (Toxocara/VLM chronic eosinophilia), Q57 (Ascaris pathology by both adults+larvae), Q58 (corticosteroids
in neurotoxocariasis), Q59 (Ascaris fatal complications = adult-worm migration), Q60 (Ascaris cylindrical barium filling
defects), Q63 (Onchocerca hanging groin), Q64 (Chrysops control difficult = vegetated breeding sites), Q65 (Onchocerca
skin-snip not blood diagnosis), Q66 (Wuchereria vectors Culex+Aedes), Q67 (encysted Trichinella = no type I hypersensitivity).

**4 held:** **Q54** (ambiguous key — the printed key B 'Trichostrongylus & Capillaria' is correct but option D 'Trichinella
& Capillaria' is ALSO acquired by ingestion of infective larvae; two defensible correct pairs, held). **Q56** (printed key A
Ascaris but the stem is 'the following ADULT helminth may cause pulmonary manifestations' — Ascaris pulmonary/Loeffler is
caused by the migrating LARVAE not the adult; same adult-vs-larvae mismatch as the held Q8, identical stem/key). **Q61**
(ambiguous — creeping eruption is caused by animal-hookworm larvae; the keyed B 'non-human schistosomes' → swimmer's itch,
but option D 'A. duodenale' also fails to produce classic creeping eruption per our own concept CON-INF-4AF960D3F63C6F which
records A. duodenale as brief ground itch; two defensible 'not seen' options, held). **Q62** (in-source EXACT duplicate of the
authored Q39, trichinellosis, identical options, both key C; held per brief).

**11 concepts minted** university-blind (`CON-INF-` + first 14 hex of SHA-256 of the canonical key, uppercased;
collision-checked corpus-wide incl. `docs/import-ready` — no collisions), with **3 cross-question reuses**: Q51 reuses the
Strongyloides skin-penetration concept `CON-INF-C40504A90D83F9` (Q2); Q55 reuses the VLM chronic-eosinophilia concept
`CON-INF-AE2341B790B16E`; and the held Q61 would have reused the creeping-eruption concept `CON-INF-4AF960D3F63C6F`. All 11
new concepts filed under `DIS-PAR-T02` (Helminthology) and added to `ART-INF-309-NEMATODA` (summary bumped to Q1-67). All
records `publication_status=needs_evidence` / `status=Draft`. Generated by the `scripts/content` seed→emit pipeline
(`coverage/seeds/309-INF/bank-nematoda.json` → `question/309-INF-nematoda-mcq.md`).

Gates (all from `.gates/`): **batch** items=59 errors=0 (question) + 88 errors=0 (concept) + 4 errors=0 (article), with
concept/article/resource `--with` siblings; **simulate**/**audit** below — category-neutral vs the 309-INF baseline (no NEW
category type; count scales with the added 13 questions + 11 concepts).

## Cluster — bank Protozoology (Q1-16 of 84)

**15/16 authored, 0 held, Q6 deferred** (this slice covers Q1-16, pp.14-15; the Protozoology section has **84 questions**,
all keyed by the single printed answer table **'Answers of Protozoology' p.21**, native text, no OCR). Opened a NEW question
file `question/309-INF-protozoa-mcq.md` (seed `coverage/seeds/309-INF/bank-protozoa.json`) and a NEW article
**`ART-INF-309-PROTOZOA`** cross-linked to `ART-INF-309-PARA-GENERAL`. **Protozoa node chosen: `DIS-PAR-T01`** — the
protozoa node under DIS-PAR (sibling to DIS-PAR-T02 Helminthology used by the trematode/cestode/nematode articles, and
DIS-PAR-T03 Arthropods); this matches the ASU-LOCO parasitology precedent that files protozoan flagellate concepts under
DIS-PAR-T01. Keys read from the p.21 table: `1 B 2 C 3 A 4 B 5 B | 6 B 7 D 8 B 9 A 10 D | 11 D 12 B 13 B 14 A 15 C | 16 D …`.
Sample cross-checked against parasitology (Q1 conjugation=nuclear exchange B, Q4 Trichomonas has no cyst B, Q10 nasal
cartilage→L. braziliensis D, Q12 Maltese cross→Babesia B, Q13 nephrotic→P. malariae B, Q15 swimming→Naegleria C — all
consistent). Authored Q1-5 and Q7-16.

**Q6 deferred** (not held, left in Remaining): its immunology (IgA dating of toxoplasma seroconversion vs IgG-avidity
claims) warrants closer scrutiny than a first pass; parked for a later Protozoology slice rather than authored quickly.

**15 concepts minted** university-blind (`CON-INF-` + first 14 hex of SHA-256 of the canonical key, uppercased;
collision-checked corpus-wide incl. `docs/import-ready` — no collisions), one atomic fact per question, filed under
`DIS-PAR-T01` (Protozoology) and grouped into `ART-INF-309-PROTOZOA`. Canonical keys follow the module's own
`parasitology.<genus>.<fact>` convention (consistent with the 88 existing 309-INF concepts). All records
`publication_status=needs_evidence` / `status=Draft`.

**In-source duplicates flagged for later holds** (seen while recovering the p.21 keys, to hold when Q17-84 are authored):
Q52=Q41 ('man is intermediate host only…', key A), Q54=Q48 ('not a parasite found in muscles', key C), Q57=Q50 ('cats may
be a source of…', key C), Q58=Q51 ('man acts as both final and intermediate hosts…', key D), Q59=Q8 ('high IgM in T.
brucei…', key B), Q84=Q11 ('fine pigment in RBCs…', vivax). Q78 also re-tests the Q2 granuloma fact.

Gates (all from `.gates/`): **batch** items=15 errors=0 (question) + 103 errors=0 (concept) + 5 errors=0 (article), with
concept/article/resource `--with` siblings; **simulate**/**audit** below — category-neutral vs the 309-INF baseline (no NEW
category type; count scales with the added 15 questions + 15 concepts + 1 article).

## Next cluster

**Protozoology remainder** (Q6 + Q17-84, pp.15-21; same 'Answers of Protozoology' table p.21), appending to
`question/309-INF-protozoa-mcq.md` and `ART-INF-309-PROTOZOA` — hold the in-source duplicates listed above (Q52/Q54/Q57/Q58/
Q59/Q84 and Q78) as their originals are authored. Then **Entomology** (p.22, answers p.23) as a new section. Recover each
section's keys from its own printed answer table before authoring.
