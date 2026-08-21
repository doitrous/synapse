# Module 102 INT — library articles, round 2

Six articles appended to the two existing 102 INT article batches. Nothing already in
those files was rewritten, reordered or reformatted; every new record was appended after
the last one, separated by a `---` line, in the field order and the whitespace style each
file already used. The two files use different whitespace conventions — the biochemistry
file sets values immediately under their `## key`, the physiology file leaves a blank line
between records' fields — and each new record follows the convention of the file it joins.

---

## 1. Counts and validation

Both files validate clean. Commands run exactly as given:

```
node --experimental-strip-types scripts/validate-content-batch.mjs "docs/Kasr-Source-Imports/article/102-INT-biochemistry.md"
node --experimental-strip-types scripts/validate-content-batch.mjs "docs/Kasr-Source-Imports/article/102-INT-physiology.md"
```

| File | Items | `fieldsUsed` | Errors | Annotations | Media requests |
|---|---|---|---|---|---|
| `docs/Kasr-Source-Imports/article/102-INT-biochemistry.md` | **13** (was 11) | **51** | **0** | 40 | 44 |
| `docs/Kasr-Source-Imports/article/102-INT-physiology.md` | **8** (was 4) | **52** | **0** | 19 | 27 |

Floor is 49 of 53. The biochemistry file omits `body` and `image_recommendations`, both
legacy aliases, which is why it scores 51; the physiology file also carries
`callout_evidence`, which is why it scores 52. Both figures are unchanged from before this
pass, because `fieldsUsed` is the union of keys across the file and the new records use the
same key set as their siblings.

The existing records were checked byte for byte after appending: the first 2552 lines of
the biochemistry file and the first 1249 lines of the physiology file are identical to the
copies taken before the append.

### The six articles

| Article ID | File | Concepts listed in `related_concepts` |
|---|---|---|
| `ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS` | biochemistry | `CON-FND-5BAF472E54A764`, `CON-FND-87DC8A5CE668F7` |
| `ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX` | biochemistry | `CON-FND-14647EC60106E1` |
| `ART-102-PHY-PLASMA-PROTEINS` | physiology | `CON-HEM-005D132395BF2F` |
| `ART-102-PHY-PLATELETS-AND-HAEMOSTASIS` | physiology | `CON-HEM-543C749CEB67BF`, `CON-FND-4C1A1DFB1C6FA2` |
| `ART-102-PHY-SYMPATHETIC-NERVOUS-SYSTEM` | physiology | `CON-NEU-DCDACCB179C2A5` |
| `ART-102-PHY-CHEMICAL-TRANSMISSION-AT-AUTONOMIC-JUNCTIONS-AND-AUTONOMIC-RECEPTORS` | physiology | `CON-NEU-F16D60268905BC`, `CON-NEU-1DB903AAE3D02A` |

All nine concept IDs come from the plan entries and every one was confirmed to exist in
`docs/Kasr-Source-Imports/concept/102-INT-concepts.md`. All nine also appear in
`docs/Kasr-Source-Imports/written/102-INT-EOY-2024-written.md`: **every concept in this
round came from the 2024 paper**, `EOY (INT - 102) 198`, `src_dbe1da0da0b7f94a618f`, not
the 2025 one. The four articles written in the previous round were all driven by the 2025
paper, so between the two rounds the two sittings are covered without overlap.

All 59 annotation `Quote:` lines in both files were checked programmatically against the
joined body block of their own record. All 59 match verbatim, including the 40 that were
already there.

### Placement

Every canonical node written was verified present in
`src/data/medicalLibraryTaxonomy.generated.ts` before use.

| Article | `primary_node_id` | `secondary_node_ids` |
|---|---|---|
| Nucleic acids | `DIS-BIO-T06` Molecular biology | `SYS-FND-T02-S01-M03` Mitochondrial inheritance |
| Extracellular matrix | `DIS-BIO-T05` Amino acids and proteins | `[clear]` |
| Plasma proteins | `DIS-PHY-T02` Cardiovascular | `SYS-HEM-T01` Hematopoiesis and blood science |
| Platelets and haemostasis | `DIS-PHY-T02` Cardiovascular | `SYS-HEM-T03` Hemostasis and thrombosis |
| Sympathetic nervous system | `DIS-PHY-T07` Neurophysiology | `SYS-NEU-T01-S02` |
| Chemical transmission | `DIS-PHY-T07` Neurophysiology | `SYS-NEU-T01-S02` |

Each `primary_node_id` is the plan entry's own `concepts[0].primary`, verified rather than
chosen. The two blood articles sit on `DIS-PHY-T02` Cardiovascular, which is not where
blood belongs, for the reason the previous round already recorded and noted again in each
new record's `field_notes`: the discipline view has no haematology topic — `DIS-PHY` runs
T01 to T08 with no blood node — and the concepts already sit there, so moving one without
the other would split them. The honest systems home is carried as the secondary. **Adding
a haematology topic to `DIS-PHY` is a taxonomy change and is not made here.**

---

## 2. The autonomic-transmission conflict, recorded not resolved

`ART-102-PHY-CHEMICAL-TRANSMISSION-AT-AUTONOMIC-JUNCTIONS-AND-AUTONOMIC-RECEPTORS`
carries four entries in `conflicts`. The first is conflict 7 of
`scripts/kasr/extract/102-INT/physio-chapters-report.md`, restated on the article rather
than smoothed away:

- **The module book has one chapter; the physiology department's year book has three, with
  two different exam statuses.** In `src_bfeed7a91f343a86b255`, `Chemical transmission at
  autonomic junctions` (physical 66–69) is excluded from the written exam, `Receptors of
  the effector organs` (physical 69–73) is **not** excluded, and `Drugs that affect the
  autonomic activity` (physical 73–74) is excluded. The module book prints one
  contents-listed chapter covering all three, printed 49–54, so cancelled and examinable
  material share one node.
- The extraction record therefore carries `excludedFromWrittenExam: false` with a note
  beginning `PARTIAL.`, because the adrenergic-receptor material on printed 51–53 is
  examinable. Flagging the chapter `true` would cancel the very material the 2024 paper
  put a 9-mark question on.
- The article teaches the whole chapter and says section by section which part is which.
  `university_notes` states the split in the student-facing register; `conflicts` states it
  with the page ranges and the year-book chapter names.
- The article does **not** resolve it. Splitting the module chapter to match the year book
  would invent boundaries the module book does not print; merging silently would hide that
  most of it is off the paper.

Three further conflicts are recorded on the same article:

- **`AGENTS` against `DRUGS`.** The orientation and the year book say `DRUGS THAT AFFECT
  THE AUTONOMIC ACTIVITY`; the module book prints `AGENTS THAT AFFECT THE AUTONOMIC
  ACTIVITY` on physical p167. §7.5 of the chapter report lists this as undetermined. Both
  words are given in the article so a student recognises either.
- **The heading omits the receptors.** The Part II contents lists the chapter as `Chemical
  transmission at autonomic junctions & autonomic receptors`; the body heading on physical
  p162 reads only `CHEMICAL TRANSMISSION AT AUTONOMIC JUNCTIONS`. That is part of why the
  orientation's exclusion of a heading with that name does not obviously reach the
  receptors — which is the whole reason the exam status is split.
- **The chapter is wider than its two concepts.** The transmitter synthesis, release and
  removal, the cholinergic receptors and the agents table belong to no concept in the plan.
  They are taught because the book prints them there, and are flagged as unattached.

---

## 3. The cancelled extracellular-matrix chapter

`ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX` was **written in full**, and the
cancellation is stated in four places rather than encoded in an absence.

The announcement, quoted exactly: `BIO ORIENTATION 102` (`src_64d31fe6569b4ff499c6`),
"Module 102 biochemistry orientation for final written exam 2025/2026", section
**"A-Cancelled Items for Final Exam -Module 102/2026"**, entry **"Proteins Of
Extracellular Matrix From page 44 to page 49"**. Printed 44–49 is exactly this chapter
(physical 48–53), so the whole chapter is off the 2026 written paper.

Against that, the 2024 paper asked question 13, four marks: *"Explain in biochemical basis:
Collagen has a strong structure"*.

How it is handled:

1. **`summary`** — the first sentence tells the student the chapter is off the 2025/2026
   written paper and was a four-mark question on the 2024 one.
2. **`university_notes`** — three lines: the announcement quoted with its section title,
   the 2024 question quoted with its marks, and the point that a cancellation from the
   written exam is not a cancellation from the course.
3. **`conflicts`** — the exam status against the teaching status, and the fact that the
   2024 paper and the 2025/2026 orientation are both current documents in this corpus that
   disagree because a syllabus changed. Neither is called wrong and neither is said to
   govern a student whose year is unknown.
4. **`notes`** — why the article exists at all: withholding it would leave a 2024 question
   with no explanation and give a 2026 student no way to learn the chapter is off their
   paper.

`high_yield` is set to **`Supplementary`** rather than `Core`, and that is the only field
the cancellation changes. The article is written to the same standard as the examinable
chapters.

**A second, unasked-for cancellation turned up and is handled the same way.**
`ART-102-PHY-SYMPATHETIC-NERVOUS-SYSTEM` carries the concept
`CON-NEU-DCDACCB179C2A5`, the alarm or stress response — and the 1st year physiology exam
orientation (`src_701b6db49a7c01d79428`) excludes **`- ALARM or "STRESS" Response of
Sympathetic Nervous System`** from the final theoretical exam by name. That is printed page
45, the last heading of the chapter; printed 41–44 stay examinable. The 2024 paper tested
exactly that cancelled section, with the multiple-choice item about braking to avoid a car
accident. The article teaches the whole chapter, states the partial exclusion in
`university_notes` and `conflicts`, and keeps `high_yield: Core` because only one heading of
the chapter is affected. This is conflict 5 of the chapter report and is recorded, not
resolved: the two books also place the alarm response at opposite ends of the ANS material.

A third partial cancellation was found and recorded on
`ART-102-BIO-CHEMISTRY-OF-NUCLEIC-ACIDS`: the same biochemistry orientation cancels
**"Genetic Terminology Page 76"**, the last section of that chapter. The article teaches
the chapter, omits the cancelled section, and names the five terms as existing rather than
reproducing them.

---

## 4. Every place the book was silent

Each of these is written into the relevant article's `evidence_gaps`. Nothing below was
filled in from another textbook.

**Nucleic acids** (physical 73–80)
- No form name for the double helix. "The most common physiological form" is as far as it
  goes; A, B and Z forms are absent.
- No melting temperature, no GC-content-to-stability relationship, no Chargaff's rules. The
  third hydrogen bond in G–C is stated; its thermal consequence is not.
- No base pairs per helical turn and no helical pitch. Only the 2 nm width and the 2.2 nm
  and 1.2 nm groove widths.
- No size in base pairs for human mitochondrial DNA, no copy number, no use of the word
  heteroplasmy, and no named myopathy — only "certain types of myopathies".
- No reason why the extra arm is the major site of tRNA variation.

**Extracellular matrix** (physical 48–53)
- **No disease at all.** Vitamin C is named as the hydroxylase cofactor and scurvy is never
  mentioned; osteogenesis imperfecta, Ehlers–Danlos, Marfan and emphysema are all absent.
  Every one of them is the standard clinical partner of a fact this chapter states, and
  none was added.
- Fibrillin, fibronectin and laminin are listed once and never returned to.
- No length, diameter or molecular weight for tropocollagen. The `50 nm` on the fibril
  figure is a label on a drawing and is not quoted as a stated value.
- No function for the minor collagen types V, VI, IX, X and XI that it names.
- No proportion of body protein for elastin, no turnover rate, and no serum reference range
  for osteocalcin even though it calls the serum level a marker of bone formation.

**Plasma proteins** (physical 121–123)
- **The book never uses the word oedema** and never says hypoproteinaemia causes it. The
  concept record's pitfall ends with that inference; it is recorded as a difference and is
  not written into the prose as this book's.
- It says most of the 5000 mmHg is crystalloid and that the capillary membrane is
  impermeable to proteins. It never states the converse — that crystalloids cross freely
  and therefore exert no net pull — although that is what makes the argument work.
- No normal value for any individual globulin fraction; Table 2 gives globulin as a whole.
- No half-life for any plasma protein, no hepatic synthesis rate, no measurement method
  (electrophoresis is not mentioned), and no named disease beyond the three causes of a low
  A/G ratio.

**Platelets and haemostasis** (physical 134–140)
- **No aspirin dose anywhere.** "Small amounts for prolonged periods" is the whole of it,
  and no milligram figure was imported.
- No COX-1 against COX-2 distinction — one cyclooxygenase in both cells.
- It never joins the platelet's inability to make the enzyme to the 8-day platelet lifespan
  it states in the same chapter. The join was not made here.
- No bleeding disorder: von Willebrand factor without von Willebrand disease, factor VIII
  without haemophilia, no thrombocytopenia.
- No bleeding time, clotting time, prothrombin time or INR, and no test of any kind.

**Sympathetic nervous system** (physical 154–158)
- No transmitter and no receptor for any effect — that is four pages later and separately
  examined, so it was not imported.
- No mechanism for enhanced clotting; the effect is a single line under Metabolism and
  Blood.
- No quantity except the up-to-100% rise in basal metabolism and the 8% of spinal nerve
  fibres. No figure for the rise in rate, pressure or glucose, and no time course.
- Muller's muscle produces exophthalmos "in some animals" — which animals is not said, and
  what it does in humans is not said.
- No cause of Horner's syndrome beyond a lesion of the cervical sympathetic chain, and no
  test for it.

**Chemical transmission** (physical 162–167)
- **No drug is named at all.** Six classes by mechanism, not one member, no dose, no
  indication.
- No second messenger for beta-3; mechanisms are given for alpha-1, alpha-2, beta-1 and
  beta-2 only.
- No muscarinic subtypes — M1 to M5 are not in this book.
- No receptor structure and no use of the term G protein; the account stops at adenyl
  cyclase, cAMP and intracellular calcium.
- Only the re-uptake share of noradrenaline removal is quantified (50–80%); diffusion and
  enzymatic destruction carry no figures.
- Dopamine appears only as a synthesis intermediate, never as a transmitter, and adrenaline
  synthesis from noradrenaline in the adrenal medulla is not described.
- No clinical condition: no myasthenia gravis, no organophosphate poisoning, no
  phaeochromocytoma.

Across all six: **no claim, citation or evidence span exists yet for module 102**, so
`claim_ids` and `span_ids` are `[clear]` on every record and `callout_evidence` is empty,
each with a `field_notes` line saying so.

---

## 5. Media requested

Twenty-four new requests, all `## media_recommendations` blocks with a `Purpose:` line.
**No URL was invented and no `## media` block was written** — the repository holds no
medical image and the corpus is a private university collection cleared for nothing.

| Article | Requests | Required | Strongly helpful |
|---|---|---|---|
| Nucleic acids | 5 | 3 | 2 |
| Extracellular matrix | 4 | 3 | 1 |
| Plasma proteins | 3 | 2 | 1 |
| Platelets and haemostasis | 4 | 3 | 1 |
| Sympathetic nervous system | 4 | 2 | 2 |
| Chemical transmission | 4 | 3 | 1 |

File totals after the append: biochemistry 44 requests, physiology 27.

Two are worth flagging to whoever fulfils them:

- The **Horner's syndrome clinical photograph** (sympathetic article) is the only request in
  either file that needs a real patient. Its `Rights:` line requires documented consent, and
  it offers redrawing the book's own Fig 11 as the fallback if no consented photograph
  exists.
- Every "purpose-drawn, following the department book's Fig N" request says **redrawn rather
  than reproduced**. None of them licenses copying a page out of the department book.

---

## 6. What I could not determine, named rather than guessed

1. **What the numbered list on page 2 of `BIO ORIENTATION 102` is a list of.** Its section
   heading did not survive the OCR. Items 9, 10 and 11 are three figures from the nucleic
   acids chapter — Structure of Polynucleotide Chain, Structure of tRNA, Structure of mRNA
   — and page 3 of the same announcement is headed "Example on diagram question", so the
   list is very probably the diagram-question list. The article says "very probably" and
   records the inference in `evidence_gaps`. **The page numbers printed beside those items
   did not OCR reliably** — the polynucleotide entry returns the characters `fie` where a
   page number should be — so no page number is quoted from that list.
2. **Whether `CON-FND-4C1A1DFB1C6FA2` is filed under the right subject.** The plan gives it
   `subject: pharm` under a `CON-FND-` ID, for material the book teaches as physiology
   inside a haematology chapter. The ID is used exactly as given, because a reference ID is
   never rewritten. The mismatch is recorded in the platelets article's `conflicts` for the
   concept pass to rule on.
3. **Whether the plasma proteins article should carry the oedema inference.** The concept's
   pitfall states it; the book does not. Left out of the prose, recorded in `conflicts` and
   `evidence_gaps`. A faculty reviewer should say whether the department teaches it.
4. **Whether `ART-102-PHY-PLATELETS-AND-HAEMOSTASIS` and
   `ART-102-PHY-PHYSIOLOGICAL-LIMITATIONS-OF-BLOOD-COAGULATION` should both carry the
   thromboxane/prostacyclin description.** The limitations article was written first and
   borrowed it, correctly attributed, to make its fifth mechanism readable; this chapter is
   where the book prints it and where the 2024 paper examined it. Both keep it and they
   cross-link. Recorded in `conflicts` rather than silently deduplicated.
5. **`AGENTS` or `DRUGS`** — unchanged from §7.5 of the chapter report. Both are given.
6. **No secondary systems node exists for connective tissue or extracellular matrix.**
   `SYS-MSK` runs regional anatomy, presentations, trauma, arthritis and metabolic bone
   disease; `SYS-FND-T01` is cell and molecular biology. `secondary_node_ids` is `[clear]`
   with the reasoning in `field_notes`, rather than a guess dressed as a placement.
   Similarly, the systems view has **no node for nucleic acid structure**: the nucleic acids
   article takes `SYS-FND-T02-S01-M03` Mitochondrial inheritance, which is a true home for
   only half the chapter, and says so.
7. **Three live articles are near-misses and none was merged.** `ART-HEM-TOP-37142FFF1F`
   "Plasma Proteins", `ART-HEM-TOP-FD61B0A3D0` "Platelet Physiology" and
   `ART-HEM-TOP-CC03030BEE` "Coagulation Physiology", all `In review`, all
   pipeline-generated reading workspaces carrying `subjectId: "medical"`. Each is recorded
   in the `notes` of the article that found it, because **an article batch has no
   `rejected_merge_candidate_ids` field**. A human should decide whether those workspaces
   are eventually retired in favour of the chapter articles.
8. **Reciprocal links are owed and were not made.** Every one of the nine concepts still
   carries the `articleIds` field note reading that a concept with no article is an orphan.
   Adding these six article IDs back to
   `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` is owed on the concept batch,
   which another pass owns and which this pass did not touch. The same is true of the
   `library_ids` on the 2024 written questions.
9. **The two batch files' header comments are now stale.** The biochemistry header says
   "Eleven articles" and the physiology header says "Four articles"; they are now thirteen
   and eight. The comments were deliberately **not** edited: another agent is reading these
   files, and inserting lines into a header shifts every line number below it, where an
   append shifts nothing. Whoever next edits those files should correct the two counts.

---

## Housekeeping

- Files changed: `docs/Kasr-Source-Imports/article/102-INT-biochemistry.md`,
  `docs/Kasr-Source-Imports/article/102-INT-physiology.md`, and this report.
- `article-plan.json`, `claim-plan.json`, the `*-chapters.json` files, the concept batch,
  the claims and citations batches and `102-INT-spans.md` were read where needed and not
  written to.
- No commit, no push, no import.
