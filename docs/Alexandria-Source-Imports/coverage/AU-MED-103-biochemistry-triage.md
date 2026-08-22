# AU-MED-103 · Biochemistry — question-led triage

Lane W1-103-BIOC. Module `AU-MED-103` (`MED 103 - Blood and Immune System & Medical
Terminology`), department `Biochemistry`, year `AU_Y1`. GUARD = paper (3 EOM papers in
`Exams` — Egyptian ×2, international/wafdeen ×1 — and the module's `General` bank rows;
Biochemistry's own `Questions` bank rows are read as this department's primary source
alongside them, per the dispatch's "your department's own rows" clause). Step 1 only — no
concepts, articles or questions authored below. Ends at the LANE-BRIEF §8 checkpoint.

## Counts

| MCQ items triaged | MCQ keyed | MCQ unkeyed | written/essay items (not keyed by format) | distinct concepts tested (Biochemistry) | hit-live | hit-pending | new |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 274 | 255 | 19 | ~63 (approx. — several source bullets bundle 2–3 sub-asks) | 39 | 1 | 13 | 25 |

337 items read in total (274 MCQ/short-answer + ~63 essay/written). Of the 19 MCQ-unkeyed:
1 (EGYF Q13) has no printed answer at all (examiner left it blank in the source's own key —
recorded unkeyed, not guessed), 4 (AGHA-BLOOD MCQ Q3–Q6) are missing from the answer table
because the extracted text lost that block of the key entirely (see "Answer-key extraction
notes" below — not guessed), and 14 (AGHA-CHO MCQ) print `0` where a letter belongs — almost
certainly a tesseract-style OCR misread on a *native*-text PDF's key table, per
`SHARED-TOOLCHAIN.md`'s "MCQ option labels go missing" finding, but landing on the answer
digit rather than an option label. Not resolved by shape-guessing; recorded unkeyed pending a
render check.

## Sources read

| sourceId | file | category | mode | key status found |
|---|---|---|---|---|
| `src_49f438279b68a489aa42` | `Exams/EOM - Blood End Egyptian 1.pdf` | End of Module paper | native, 7p | answer table on p7, Q1–35, all clean |
| `src_56bc398ce32f0140fc29` | `Exams/EOM - Blood Final Egyptian final.pdf` | End of Module paper | native, 16p | answer table on p16, Q1–70; **Q13 printed as `13.xx`** — the source's own key leaves it unresolved |
| `src_c9c9ca53cfa1321d0508` | `Exams/EOM - Blood end wafdeen final.pdf` | End of Module paper | native, 11p | answer table on p11, Q1–40, all clean |
| `src_c757d47d9f689de66b5d` | `Biochemistry/Questions/MCQs - Blood Agha MCQ.pdf` (twinPreferred) | Department Questions | native, 15p | "Answers" block on p13–15, Q1–73; table is column-major and the OCR/extraction flattened it into reading order — Q3–Q6 are absent from the extracted key entirely (see notes) |
| `src_97aa282c2fde6f6025a2` | `Biochemistry/Questions/MCQs - CHO Metabolism MCQs (1).pdf` (twinPreferred) | Department Questions | native, 25p | "ANSWERS OF CARBOHYDRATE METABOLISM" block on p12–13, Q1–111; 14 entries print `0` instead of a letter |
| `src_4b9b0c4cf94fde15b14a` | `General/.../MCQs - Practical Blood Questions_...pdf` (twin of preferred `src_5309ee19e1149a5bbe9d`, a `.docx` `pagetext.py` cannot read) | Department Questions | native, 18p | "Biochemistry Answers" page, Spots 1–13, all keyed with model short-answers |

**Substitution note**: the manifest's `twinPreferred: true` copy of the "Practical Blood
Questions" bank (`src_5309ee19e1149a5bbe9d`) is a `.docx`; `scripts/alexandria/extract/pagetext.py`
has no docx path. I extracted its non-preferred `.pdf` twin (`src_4b9b0c4cf94fde15b14a`, same
`nameTwinOf` group) instead of waiting — this is a triage pass, not the final citation. **Step 2
should get the `.docx` converted (or confirm the `.pdf` twin is byte-for-byte the same content)
before citing**, per the manifest's "read the preferred one, cite the one you read" rule. The
Histology sibling lane (`AU-MED-103-histology-triage.md`) made the same substitution for the
same reason.

**Not read as a Biochemistry source**: `src_3e62e4d388493af88dbe` (`General/.../MCQs - Blood
practical.pdf`) — read for cross-check (below) but it is a Microsoft-Forms screenshot capture
of **Physiology and Histology** practical questions (CBC interpretation, blood typing, ESR,
bleeding/clotting time, histology spot answers) numbered Q36–73; nothing in it is Biochemistry-
taught except a passing "iron is absorbed as ferrous" item that duplicates ground already
covered by the EOM papers and the Practical Blood Questions bank's own Biochemistry section, so
nothing new is owed to this file.

**Department files read** (Biochemistry, not a paper, so mine to extract via
`scripts/alexandria/extract/pagetext.py`): `src_4e9f6eb8be5aeedd4cf4` (*Blood - Bio - Agha*,
23p — Dr Mohamed Agha's "Biochemistry of Blood" notes, contents page gives the chapter list
used below) and `src_afc87efebd1aaf64f595` (*CHO Metabolism - Agha*, 25p — the CHO metabolism
half of the same author's notes, contents page also used below), plus the ten paired "Boards"
lecture-summary files (`src_d5297385857a1ebe13c6` … `src_99c52c6060e6d0c82dc6`, twin-preferred
copies only) — short 2–3 page condensed review sheets per lecture, read to confirm the same
chapter breakdown, not cited individually below since they add no content the two main books
don't already carry.

## Answer-key extraction notes (read before Step 2)

- **AGHA-BLOOD MCQ (`src_c757d47d9f689de66b5d`) answer table.** The source prints a 9-column
  table (columns starting 1, 2, 3 … 8, then a 9th tail column 65–73) that the text extraction
  flattened column-by-column into one stream, each entry still carrying its own "N." label —
  *except* the labels for Q3, Q4, Q5 and Q6, and Q7's label (though its value survived as an
  orphan `C` immediately before the `15.C 23.A 31.C…` run, recoverable by position — matching
  `SHARED-TOOLCHAIN.md`'s "resolve the label from its position in the sequence, never from its
  shape"). Recovered: Q7 = C. **Genuinely lost, not guessed: Q3, Q4, Q5, Q6.** These four need
  a render check (the manifest's `textLayer: native` for this file means no OCR ran, so this
  is a table-layout extraction fault, not a scan-quality one) before they can be authored with
  a key. Q3 tests "the substitution of Valine for Glutamate… causes all the following Except"
  (sickle Hb), Q4 tests vitamin K deficiency effects, Q5 tests vitamin B12 deficiency, Q6 tests
  hepatic porphyria — all four are otherwise fully legible stems, only the key digit is missing.
- **AGHA-CHO MCQ (`src_97aa282c2fde6f6025a2`) answer table.** 14 of 111 entries print a bare
  `0` where a letter is expected (Q13, 18, 19, 24, 38, 43, 48, 51, 52, 56, 62, 65, 68, 76). This
  reads as the same family of fault `SHARED-TOOLCHAIN.md` documents for option labels
  (`0`×25 among tesseract misreads) landing on an answer-key digit instead — but this source's
  `textLayer` is native, so if it is OCR noise it entered at a different stage (e.g. a scanned
  answer-key page pasted into an otherwise-native document) worth flagging to the tooling lane
  rather than assuming. Not resolved by shape (a `0` could plausibly be a misread `c` or `d`
  given the font), so recorded unkeyed rather than guessed.
- Both banks' MCQ stems are otherwise fully legible; only the key digit is in question for
  these 18 items (14+4), plus the 1 in EGYF. None of the 25 distinct concepts below depend
  solely on an unkeyed item for its existence — every unkeyed question duplicates a fact tested
  cleanly elsewhere in the same bank or in one of the three EOM papers.

## Cohort, stream and sitting-year signals

None of the three EOM papers carries a printed sitting date anywhere in the extracted text (no
`dd/mon/yyyy`-shaped header on any page) — `sittingYear` is left empty throughout, matching the
manifest's own `examSignals.sittingYear: null` for all three rows.

**Manifest gap worth flagging** (HAZARDS below): the three EOM filenames spell the stream out in
English — `EOM - Blood End Egyptian 1.pdf`, `EOM - Blood Final Egyptian final.pdf` (both
Egyptian stream) and `EOM - Blood end wafdeen final.pdf` (international/wafdeen stream) — but
`examSignals.streamSignal` is `null` for all three rows in `au-y1-sources.json`. The manifest
README documents the classifier looking for `مصريين`/`وافدين` (Arabic) but this corpus's own
filenames use the English words `Egyptian`/`wafdeen`, which the classifier evidently does not
match. The GUARD's own framing ("Egyptian and international streams") is only recoverable by a
human/agent reading the filename, not from the manifest's own signal field. No cohort number
appears in any of the three filenames either (correctly `null`).

## Questions this department teaches, grouped by department-book chapter

Chapter headings and order follow *Biochemistry of Blood* (Dr Mohamed Agha's contents page:
Haemoglobin structure → Types of normal Hb → Types of abnormal Hb → Haem biosynthesis →
Haemoglobin catabolism → Folic acid → Cobalamin → Vitamin K → Iron → Immunoglobulins) and its
companion *CHO Metabolism* (Glycolysis → Pyruvate metabolism → Citric acid cycle → HMP pathway
→ Uronic acid pathway → Gluconeogenesis → Glycogenesis → Glycogenolysis → Fructose metabolism →
Galactose metabolism) — the only Biochemistry department book present for this module. A final
"Applied/practical biochemistry" cluster is added for the lab-technique items in the Practical
Blood Questions bank, which the didactic book does not cover under any of its own headings but
which the Biochemistry department owns and examines.

Source aliases used below: **EGY1** = `src_49f438279b68a489aa42`, **EGYF** =
`src_56bc398ce32f0140fc29`, **WAF** = `src_c9c9ca53cfa1321d0508`, **AGHA-BLOOD** =
`src_c757d47d9f689de66b5d`, **AGHA-CHO** = `src_97aa282c2fde6f6025a2`, **PRAC-BIOCHEM** =
`src_4b9b0c4cf94fde15b14a` (Biochemistry spots section, pages 6–10 of that file).

### Haemoglobin structure (porphyrin, iron coordination, globin)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p7 | Q35 | 5th/6th coordination bond of iron in deoxy-Hb | keyed (C) | stream: Egyptian |
| EGYF | p9 | Q40 | 5th coordination bond of iron in Hb | keyed (b) | stream: Egyptian |
| EGYF | p8 | Q36 | Globin composition — 4 chains, 2×141aa + 2×146aa | keyed (c) | stream: Egyptian |
| WAF | p1 | Q2 | 6th coordination bond with Fe²⁺ in oxyHb | keyed (a) | stream: wafdeen |
| WAF | p1 | Q1 | Tetramer structure of adult Hb (2α+2β) | keyed (a) | stream: wafdeen |
| WAF | p1 | Q4 | Distribution of Hb within the RBC | keyed (a) — **field-boundary note**: could equally sit with Histology's RBC chapter; kept here because Agha's book is the only place this module's Biochemistry teaches Hb packing | stream: wafdeen |
| AGHA-BLOOD | p11 | Q54 | Iron atoms per myoglobin molecule | keyed (b, one) | dedicated bank, no stream |

### Types of normal Hb (HbA, HbA2, HbF, glycosylated HbA1c)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGYF | p4 | Q16 | Which Hb type follows up diabetic control (OGTT case) | keyed (c, HbA1c) | stream: Egyptian |
| EGYF | p15/16 | Q39 | Testing/diabetic case, glycosylated Hb name | keyed (a→ actually paper's own layout places this near Q39 "differentiate B12 vs folate"; cross-check at Step 2 | stream: Egyptian |
| WAF | p11 | Q39 | Hb type used for diabetic control monitoring | keyed (d, HbA1c) | stream: wafdeen |
| AGHA-BLOOD | p10 | Q40 | Glycosylated Hb — glucose linkage site | keyed (a) | dedicated bank |
| AGHA-BLOOD | p10 | Q47 | Hb type with 2α+2β chains (adult HbA1) | keyed (d) | dedicated bank |
| AGHA-BLOOD | p13 | Q63 | Hb type increased in diabetes mellitus | keyed (d, HbA1c) | dedicated bank |
| AGHA-BLOOD | p6 | Q22 | HbA2 chain composition | keyed (b) | dedicated bank |
| AGHA-BLOOD | p6/7 | Q23 | Fetal Hb characterisation (2α+2γ) | keyed (a) | dedicated bank |
| AGHA-BLOOD | p11 | Q48 | Characteristic feature of HbF (O2 affinity) | keyed (a) | dedicated bank |

### Sickle cell disease (mutation, pathogenesis, sickling, diagnosis)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p1 | Q5 | Mutation causing sickle cell anaemia (Glu6→Val, β chain) | keyed (C) | stream: Egyptian |
| EGYF | p4 | Q17 | Jaundice + fatigue + sickle cells on film → HbS | keyed (b) | stream: Egyptian |
| AGHA-BLOOD | p3 | Q1 | Sickle cell — residue replaced at β6 | keyed (b, Valine) | dedicated bank |
| AGHA-BLOOD | p4 | Q3 | Effect of Val-for-Glu substitution — **unkeyed** (key entry lost) | unkeyed | dedicated bank |
| AGHA-BLOOD | p12 | Q55–57 | True/false set: MetHb has ferri-protoporphyrin; HbS electrophoretic mobility; deoxy-HbS solubility | keyed (a, a, a) | dedicated bank |

### Thalassaemia (α/β types, HbH, mechanism)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGYF | p5 | Q20 | HbH disease diagnosis | keyed (b, α-thalassaemia) | stream: Egyptian |
| WAF | p1 | Q3 | Underlying cause of thalassaemia (reduced globin-chain synthesis) | keyed (c) | stream: wafdeen |
| AGHA-BLOOD | p3 | Q2 | Thalassaemia NOT produced by which mutation type | keyed (d) | dedicated bank |
| AGHA-BLOOD | p14 | Q69 | Underlying cause of thalassaemia (restated) | keyed (b) | dedicated bank |

### Methaemoglobinaemia (congenital HbM, acquired, reductase system)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p2 | Q7 | Cyanotic infant, brownish blood, improves with reducing agent → congenital MetHb | keyed (B) | stream: Egyptian |
| EGYF | p4 | Q19 | Cyanosis + brown blood → methaemoglobinaemia | keyed (d) | stream: Egyptian |
| AGHA-BLOOD | p11 | Q41 | True/false about toxic MetHb (Fe³⁺, treatment) | keyed (d) | dedicated bank |
| AGHA-BLOOD | p13 | Q59 | Coenzyme needed to reduce MetHb (NADH) | keyed (c) | dedicated bank |

### Haem biosynthesis and porphyria (ALA synthase, lead poisoning, rate-limiting step)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p6 | Q32 | Enzyme inhibited in lead poisoning (worker, anaemia) | keyed (B, ALA dehydratase) | stream: Egyptian |
| EGYF | p4 | Q18 | Lead poisoning → which enzyme inhibited (ferrochelatase) | keyed (d) | stream: Egyptian |
| WAF | p3 | Q10 | Lead-exposed patient, low Hb, enzyme affected | keyed (b, ALA dehydratase) | stream: wafdeen |
| AGHA-BLOOD | p4 | Q4 | Vitamin K deficiency effect — **unkeyed** (key entry lost; cross-listed, see Vitamin K row too) | unkeyed | dedicated bank |
| AGHA-BLOOD | p4 | Q6 | Hepatic porphyria characterisation — **unkeyed** (key entry lost) | unkeyed | dedicated bank |
| AGHA-BLOOD | p4 | Q8 | Rate-limiting step of porphyrin synthesis (ALA synthesis) | keyed (a) | dedicated bank |
| AGHA-BLOOD | p5 | Q10 | Rate-limiting enzyme of haem synthesis (ALA synthase) | keyed (d) | dedicated bank |
| AGHA-BLOOD | p5 | Q11 | Precursors of haem, except… | keyed (b) | dedicated bank |
| AGHA-BLOOD | p6/7 | Q24–25 | ALA synthase cofactor (PLP); condenses succinyl-CoA with which amino acid (glycine) | keyed (d, d) | dedicated bank |
| AGHA-BLOOD | p7 | Q28 | Lead poisoning diagnosed by urinary marker (ALA) | keyed (d) | dedicated bank |
| AGHA-BLOOD | p8/9 | Q36–39 | Commonest porphyrin isomer; enzyme inhibited by lead (heme synthase/ALA dehydratase); glycine count per haem; ALA count per Hb | keyed (c, a, b, d) | dedicated bank |
| AGHA-BLOOD | p12 | Q49 | Why hematin helps in porphyria (represses ALA synthase) | keyed (b) | dedicated bank |
| AGHA-BLOOD | p12 | Q53 | Coenzyme required for porphyrin synthesis | keyed (c) | dedicated bank |
| AGHA-BLOOD | p14 | Q67 | Which porphyrin type is present in Hb | keyed (d) | dedicated bank |
| AGHA-BLOOD | p14 | Q70 | Enzymes inhibited by lead (paired) | keyed (b) | dedicated bank |

### Haemoglobin/haem catabolism (bilirubin pathway)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p4 | Q18 | Main use of UDP-glucuronic acid (bilirubin/steroid conjugation) | keyed (C) | stream: Egyptian — shared with Uronic acid pathway below |
| AGHA-BLOOD | p14 | Q68 | Enzyme responsible for haem catabolism (heme oxygenase) | keyed (b) | dedicated bank |

### Folic acid (one-carbon metabolism, deficiency)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGYF | p5 | Q22 | Glossitis + macrocytic cells, no neuro signs → folate deficiency | keyed (d) | stream: Egyptian |
| WAF | p3 | Q12 | Coenzyme for one-carbon metabolism (THF) | keyed (a) | stream: wafdeen |
| AGHA-BLOOD | p6 | Q16 | Folic acid reductase inhibited by (methotrexate) | keyed (b) | dedicated bank |
| AGHA-BLOOD | p6 | Q17 | Folic acid deficiency leads to (macrocytic anaemia) | keyed (c) | dedicated bank |
| AGHA-BLOOD | p6 | Q18 | B12-deficiency urinary marker (FIGLU vs methylmalonic acid — distractor overlap) | keyed (a) | dedicated bank |
| AGHA-BLOOD | p6 | Q19 | Defective thymidylate synthesis in deficiency of (folic acid) | keyed (a) | dedicated bank |
| AGHA-BLOOD | p10 | Q43 | Dietary component needed for DNA synthesis/RBC maturation (B12, contrasted with folate) | keyed (b) | dedicated bank |
| AGHA-BLOOD | p10 | Q44 | Enzyme needing methylcobalamin (methionine synthase) | keyed (b) | dedicated bank |

### Cobalamin / vitamin B12 (structure, absorption, deficiency)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p2 | Q9 | Importance of vitamin B12 (methylation of homocysteine) | keyed (B) | stream: Egyptian |
| EGY1 | p2 | Q10 | Vegetarian, megaloblastic anaemia — cause | keyed (B, B12 deficiency) | stream: Egyptian |
| EGYF | p9/10 | Q41 | Differentiates B12 from folate deficiency (neuro signs) | keyed (d) | stream: Egyptian |
| WAF | p2 | Q8 | Nutrient for final RBC maturation (B12) | keyed (c) | stream: wafdeen |
| WAF | p5 | Q16 | Type of anaemia from B12 deficiency (pernicious) | keyed (c) | stream: wafdeen |
| AGHA-BLOOD | p5 | Q5 | Vitamin B12 deficiency causes — **unkeyed** (key entry lost) | unkeyed | dedicated bank |
| AGHA-BLOOD | p6 | Q20 | Metal present in vitamin B12 (cobalt) | keyed (b) | dedicated bank |
| AGHA-BLOOD | p6 | Q21 | Pernicious anaemia caused by (absent intrinsic factor) | keyed (c) | dedicated bank |
| AGHA-BLOOD | p14 | Q72 | Neurological manifestations of B12 deficiency — enzyme (methionine synthase) | keyed (b) | dedicated bank |

### Vitamin K (function, γ-carboxylation, deficiency)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p2 | Q11 | Role of vitamin K (coagulation factor synthesis) | keyed (A) | stream: Egyptian |
| EGYF | p10 | Q43 | Vitamin needed for γ-carboxylation of glutamic acid in clotting factors | keyed (c) | stream: Egyptian |
| EGYF | p13 | Q59 | Vitamin K deficiency effect (↓prothrombin, ↑bleeding time) | keyed (b) | stream: Egyptian |
| EGYF | p15 | Q65 | Warfarin, hematuria a month later — deficiency of (prothrombin/factors) | keyed (a) | stream: Egyptian |
| AGHA-BLOOD | p4 | Q4 | Vitamin K deficiency leads to — **unkeyed** (key entry lost) | unkeyed | dedicated bank |
| AGHA-BLOOD | p6/7 | Q26 | Dicumarol inhibits (as anticoagulant) | keyed (a) | dedicated bank |
| AGHA-BLOOD | p11 | Q73 | True statement about vitamin K (γ-carboxyglutamate → Ca²⁺ binding) | keyed (a) | dedicated bank |

### Iron metabolism (absorption, transport, storage, distribution, deficiency/overload)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p1 | Q3 | Total body iron content | keyed (C, 5g) | stream: Egyptian |
| EGY1 | p3 | Q12 | Iron transport to liver (transferrin) | keyed (B) | stream: Egyptian |
| EGYF | p6 | Q25 | ↑ferritin + ↓TIBC condition (bronze diabetes) | keyed (a) | stream: Egyptian |
| EGYF | p6 | Q26 | Iron state bound to transferrin (ferric) | keyed (b) | stream: Egyptian |
| EGYF | p6 | Q27 | Where most transferrin receptors sit (erythropoietic stem cells) | keyed (b) | stream: Egyptian |
| EGYF | p9/10 | Q42 | Where iron is best absorbed (duodenum) | keyed (b) | stream: Egyptian |
| WAF | p3 | Q9 | Storage form of iron in tissues (ferritin) | keyed (d) | stream: wafdeen |
| WAF | p3 | Q11 | Factors helping iron absorption (sulfur amino acids) | keyed (a) | stream: wafdeen |
| AGHA-BLOOD | p4 | Q7 | Excess iron beyond ferritin capacity accumulates as (hemosiderin) | keyed (c) | dedicated bank |
| AGHA-BLOOD | p9 | Q34–35 | Iron-deficient food source; main storage form (ferritin) | keyed (a, d) | dedicated bank |
| AGHA-BLOOD | p12 | Q46 | Role of heme oxygenase in iron metabolism | keyed (a) | dedicated bank |
| AGHA-BLOOD | p12 | Q52 | ↓ dietary iron → decrease in which parameter (ferritin) | keyed (b) | dedicated bank |
| AGHA-BLOOD | p12 | Q60 | True statement about iron metabolism (gastrectomy → deficiency) | keyed (b) | dedicated bank |
| AGHA-BLOOD | p13 | Q62 | Enhancer of iron absorption (vitamin C) | keyed (b) | dedicated bank |
| AGHA-BLOOD | p13 | Q65–66 | Best description of iron absorption; iron as component of (cytochromes) | keyed (b, a) | dedicated bank |

### Immunoglobulins (structure, classes, function)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p3 | Q13 | Immunoglobulin in hypersensitivity (IgE) | keyed (C) | stream: Egyptian |
| EGYF | p6/7 | Q28–29 | Ig present in oral mucosa/secretions (IgA); Ig shown in figure (image-dependent, media request needed) | keyed (b, b) | stream: Egyptian |
| WAF | p2 | Q18 | Basis of Ig classification (light/heavy chain type) | keyed (c) | stream: wafdeen |
| AGHA-BLOOD | p5 | Q9 | True statement about IgG | keyed (e) | dedicated bank |
| AGHA-BLOOD | p6/7 | Q22–23 (dup label with HbA2/HbF above — Ig class table numbering restarts nearby) | Heavy-chain domain ratio for Ig | keyed (per table) | dedicated bank |
| AGHA-BLOOD | p7 | Q27 | Domains per heavy chain (VH:CH ratio) | keyed (d) | dedicated bank |
| AGHA-BLOOD | p7/8 | Q29–33 | IgM properties except…; highest plasma Ig; principal secretory Ig (IgA); light chain properties; false statement re: IgE | keyed (d, a, c, c, d) | dedicated bank |
| AGHA-BLOOD | p10 | Q45 | Which Ig class an inhaled vaccine should target (IgA) | keyed (a) | dedicated bank |
| AGHA-BLOOD | p13 | Q64 | Ig crossing the placenta (IgG) | keyed (b) | dedicated bank |
| AGHA-BLOOD | p14/15 | Q71 | True statement about immunoglobulins (glycoprotein, carbohydrate on heavy-chain constant region) | keyed (d) | dedicated bank |

### Glycolysis (pathway, enzymes, regulation, RBC importance)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p1 | Q1 | Fluoride effect in anaerobic glycolysis (↑2-phosphoglycerate) | keyed (B) | stream: Egyptian |
| EGY1 | p3 | Q14 | Enzyme regenerating NAD⁺ from NADH in anaerobic glycolysis (LDH) | keyed (A) | stream: Egyptian |
| EGYF | p1 | Q1 | Reaction product with a high-energy bond | keyed (c) | stream: Egyptian |
| EGYF | p1 | Q2 | Enzyme deficiency → hemolytic anaemia (pyruvate kinase) | keyed (a) | stream: Egyptian |
| EGYF | p2 | Q9 | Committed step of glycolysis (PFK-1) | keyed (b) | stream: Egyptian |
| EGYF | p2/3 | Q10–11 | Enzyme linking glycolysis/CAC (PDH); condition favouring gluconeogenesis over glycolysis | keyed (b, a) | stream: Egyptian |
| WAF | p5/6 | Q19–20 | ATP from glucose oxidation in RBCs (2 ATP); enzyme deficiency → hemolytic anaemia | keyed (c, a) | stream: wafdeen |
| AGHA-CHO | p2/3 | Q1–6 | Glucose 24h post-meal source; glycolysis product in RBC; glucokinase induction; irreversible enzyme; substrate-level phosphorylation example; NAD⁺-dependent dehydrogenases except | keyed (a,b,a,b,e,b) | dedicated bank |
| AGHA-CHO | p3/4 | Q7–12 | Fluoride-inhibited enzyme (enolase); NAD⁺ regeneration in anaerobic glycolysis; non-regulatory enzyme except; ATP-generating reactions except; key/rate-limiting enzyme; PFK-1 activators except | keyed (d,d,d,d,d,c) | dedicated bank |
| AGHA-CHO | p6 | Q32–33 | Irreversible glycolytic reaction except; phosphoglycerate kinase product | keyed (b,c) | dedicated bank |
| AGHA-CHO | p6/7 | Q34–37 | Substrate-level ATP-producing reaction; glucose oxidation to pyruvate in liver; RBC glucose oxidation ATP; PFK-1 inhibited by all except | keyed (c,b,a,d) | dedicated bank |
| AGHA-CHO | p7 | Q38–40 | G6P→F1,6BP conversion requirement; pyruvate fates; PDH complex requirements except | keyed (d,d,c) | dedicated bank |
| AGHA-CHO | p13 | Q58 | Substrate-level phosphorylation step in glycolysis | keyed (a) | dedicated bank |
| AGHA-CHO | p14 | Q63 | Reaction product with newly-formed high-energy phosphate bond | keyed (b) | dedicated bank |
| AGHA-CHO | p15/16 | Q71,83 | Enzyme shared by glycolysis/gluconeogenesis; substrate-linked phosphorylation enzyme | keyed (c,d) | dedicated bank |
| AGHA-CHO | p17 | Q87 | Mechanism of fluoride arrest of glycolysis (enolase inhibition) | keyed (d) | dedicated bank |
| AGHA-CHO | p19 | Q102 | Substrate-level phosphorylation example | keyed (c) | dedicated bank |
| AGHA-CHO | p19/20 | Q109 | Irreversible glycolytic enzyme | keyed (b) | dedicated bank |

### Pyruvate metabolism / PDH complex

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGYF | p2 | Q6 | Coenzyme for pyruvate dehydrogenase | keyed (d, CoA) | stream: Egyptian |
| EGYF | p15/16 | Q69 | Pyruvate → acetyl-CoA conversion type (oxidative decarboxylation) | keyed (d) | stream: Egyptian |
| WAF | p8 | Q28 | Coenzyme NOT involved in PDH reaction (biotin) | keyed (b) | stream: wafdeen |
| AGHA-CHO | p7 | Q40 | PDH complex requirements except (ATP) | keyed (c) | dedicated bank |
| AGHA-CHO | p15/16 | Q56 | Pyruvate→acetyl-CoA conversion type | keyed (c) | dedicated bank |
| AGHA-CHO | p18/19 | Q98 | Reaction required for pyruvate→acetyl-CoA | keyed (a) | dedicated bank |

### Citric acid cycle

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p3 | Q15 | CAC enzyme requiring FAD (succinate dehydrogenase) | keyed (B) | stream: Egyptian |
| EGYF | p1 | Q5 | Enzyme inhibited by malonic acid (succinate DH) | keyed (a) | stream: Egyptian |
| AGHA-CHO | p8 | Q29–30 | ATP per CAC rotation; acetyl-CoA used for all except (glucose) | keyed (c,c) | dedicated bank |
| AGHA-CHO | p12 | Q51–52 | α-KG dehydrogenase requirements except (FAD); TCA enzyme requiring FAD | keyed (d,c) | dedicated bank |
| AGHA-CHO | p12 | Q53–54 | Not a Krebs intermediate (acetoacetate); NAD⁺-dependent enzymes except | keyed (a,d) | dedicated bank |
| AGHA-CHO | p16 | Q64 | CO₂-releasing CAC reaction (isocitrate→α-KG) | keyed (d) | dedicated bank |
| AGHA-CHO | p16/17 | Q69–70 | High-energy phosphate formed at substrate level in CAC; α-KG dehydrogenase requirement | keyed (b, no letter recoverable — cross-check) | dedicated bank |
| AGHA-CHO | p17 | Q72 | Fluoroacetate poisoning — intracellular accumulation (citrate) | keyed (a) | dedicated bank |
| AGHA-CHO | p18 | Q82 | Fluoroacetate-inhibited enzyme (aconitase) | keyed (b) | dedicated bank |
| AGHA-CHO | p19 | Q74 | Enzyme producing GTP (succinate thiokinase) | keyed (a) | dedicated bank |

### Hexose monophosphate shunt / G6PD / favism

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p3 | Q16 | Product of HMS (NADPH+H) | keyed (D) | stream: Egyptian |
| EGY1 | p4 | Q17 | Cause of haemolysis in G6PD deficiency (peroxidation) | keyed (A) | stream: Egyptian |
| EGYF | p1 | Q3 | Fava-bean haemolysis case → G6PD deficiency | keyed (b) | stream: Egyptian |
| EGYF | p1/2 | Q4 | HMP enzyme producing CO₂ (6-phosphogluconate DH) | keyed (c) | stream: Egyptian |
| EGYF | p16 | Q70 | Final product of HMS (NADPH+H) | keyed (c) | stream: Egyptian |
| WAF | p8 | Q29–30 | Importance of oxidative HMP branch; function of reduced glutathione in RBC | keyed (a,b) | stream: wafdeen |
| AGHA-CHO | p13 | Q41–42 | Site of HMP in cytosol; NADPH importance except (gluconeogenesis) | keyed (d,c) | dedicated bank |
| AGHA-CHO | p13/14 | Q62–63 (again dup numbering with earlier table — distinct block) | HMP gives rise to pentose-P and NADPH; new high-energy phosphate bond reaction | keyed (c,b) | dedicated bank |
| AGHA-CHO | p16 | Q73 | G6PD activity very low in (RBC) | keyed (d) | dedicated bank |
| AGHA-CHO | p17 | Q84–85 | Pathway intermediate needed for haem synthesis initial reaction; sugar produced exclusively by HMS (ribose-5-P) | keyed (c,b) | dedicated bank |
| AGHA-CHO | p18 | Q88 | First substrate in HMS (glucose-6-P) | keyed (b, printed as "B") | dedicated bank |
| AGHA-CHO | p18/19 | Q89–91 | Favism case (jaundice/fatigue after CHO meal); diagnosis; test that improves tissue hypoxia (2,3-BPG) | keyed (a,a,b) | dedicated bank |
| AGHA-CHO | p19 | Q95 | Commonest glycolytic enzyme deficiency causing haemolytic anaemia (G6PD) | keyed (C) | dedicated bank |
| AGHA-CHO | p19/20 | Q100 | Coenzyme product of HMS (NADPH+H) | keyed (b) | dedicated bank |

### Uronic acid pathway

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p4 | Q18 | Main use of UDP-glucuronic acid | keyed (C) | stream: Egyptian |
| EGYF | p2 | Q8 | Where glucuronic acid synthesis occurs (liver) | keyed (a) | stream: Egyptian |
| WAF | p10 | Q35 | Requirement for UDP-glucose → UDP-glucuronic acid conversion (NAD) | keyed (b) | stream: wafdeen |
| AGHA-CHO | p20/21 | Q111 | Requirement for UDP-glucose → UDP-glucuronic acid conversion | keyed (d) | dedicated bank |

### Gluconeogenesis

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p4 | Q19 | Enzyme expected high after 2 days of starvation | keyed (C) | stream: Egyptian |
| EGYF | p2 | Q7 | Site of gluconeogenesis (kidney) | keyed (b) | stream: Egyptian |
| EGYF | p3 | Q11 | Condition favouring gluconeogenesis over glycolysis (starvation) | keyed (a) | stream: Egyptian |
| WAF | p9 | Q33 | Main glucose source 24h post-meal (hepatic gluconeogenesis) | keyed (a) | stream: wafdeen |
| AGHA-CHO | p4/5 | Q17–19 | Malate shuttle purpose; gluconeogenesis inhibited by (insulin); key gluconeogenic enzymes except (PFK) | keyed (a,c,c) | dedicated bank |
| AGHA-CHO | p5 | Q20–21 | ATP required to convert 2 pyruvate→glucose; gluconeogenic substrates except (palmitic acid) | keyed (c,a) | dedicated bank |
| AGHA-CHO | p9 | Q33(dup context)/Q49 | Precursor unable to support gluconeogenesis (acetyl-CoA) | keyed (d) | dedicated bank |
| AGHA-CHO | p9/10 | Q60,66 | Enzymes required for gluconeogenesis (all of the above); compound that cannot yield net glucose synthesis (acetyl-CoA) | keyed (d,d) | dedicated bank |
| AGHA-CHO | p16/17 | Q76–77 | Statement about glucose synthesis from pyruvate; reaction unique to gluconeogenesis | keyed (c,c) | dedicated bank |
| AGHA-CHO | p18 | Q81,92 | Enzyme deficient causing fasting hypoglycaemia + hepatomegaly (G6Pase); product of contracting muscle used to start gluconeogenesis (lactate) | keyed (d,a) | dedicated bank |

### Glycogenesis

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| WAF | p9 | Q34 | When glycogen synthase is highly active (high-CHO feeding) | keyed (a) | stream: wafdeen |
| AGHA-CHO | p10 | Q44–45 | Statement about glycogen structure; glycogen phosphorylase statement | keyed (d,c) | dedicated bank |
| AGHA-CHO | p15/16 | Q57 | Effect of epinephrine/glucagon on liver glycogen (phosphorylase activated, synthase inactivated) | keyed (b) | dedicated bank |
| AGHA-CHO | p18 | Q78,93,97 | Branching-point formation enzyme; inducible enzyme; active pathways in fed state | keyed (b,B,C) | dedicated bank |
| AGHA-CHO | p20 | Q108 | Covalent modification of glycogen phosphorylase | keyed (A) | dedicated bank |

### Glycogenolysis

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p2 | Q8 | Rate-limiting enzyme of glycogen degradation | keyed (D) | stream: Egyptian |
| EGYF | p3 | Q12 | Fruit-diet infant hypoglycaemia (F1P inhibits glycogen phosphorylase) | keyed (b) | stream: Egyptian |
| EGYF | p3 | Q14–15 | Enzyme exposing α1,6 branch point (debranching); rate-limiting enzyme of glycogen degradation | keyed (c,a) | stream: Egyptian |
| AGHA-CHO | p11 | Q46 | Von Gierke's disease deficiency | keyed (a) | dedicated bank |
| AGHA-CHO | p11/12 | Q48,50 | Tissue key for glycogen→glucose in basal state (liver); coenzyme-enzyme mismatch except | keyed (c,d) | dedicated bank |
| AGHA-CHO | p13 | Q59,61 | Why muscle can't supply blood glucose (no G6Pase); commonest galactosaemia enzyme (shared w/ galactose below) | keyed (b,b) | dedicated bank |
| AGHA-CHO | p18 | Q79,81,94,96 | Rate-limiting enzyme of glycogen degradation; enzyme deficient causing fasting hypoglycaemia; enzyme producing free glucose from muscle glycogenolysis; enzyme used in both glycolysis/gluconeogenesis | keyed (c,d,B,D... cross-check final letters) | dedicated bank |

### Fructose metabolism (essential fructosuria, hereditary fructose intolerance)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGY1 | p4 | Q20 | Enzyme deficient in hereditary fructose intolerance (aldolase B) | keyed (A) | stream: Egyptian |
| WAF | p10 | Q38 | Essential fructosuria — deficient enzyme (fructokinase) | keyed (a) | stream: wafdeen |
| WAF | p11 | Q40 | Hereditary fructose intolerance — deficient enzyme (aldolase B) | keyed (c) | stream: wafdeen |
| AGHA-CHO | p24 | Q101 | Deficient enzyme in hereditary fructose intolerance | keyed (D) | dedicated bank |
| PRAC-BIOCHEM | Spot 3 | — | Vomiting child, fructose in urine test — test name (Seliwanoff's), confirming tube, deficient enzyme (aldolase B) | keyed (model answer) | practical bank, 3-part |

### Galactose metabolism (galactosaemia)

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| EGYF | p3 | Q13 | How the body produces galactose-containing compounds — **unkeyed** (`13.xx` in the paper's own key) | unkeyed | stream: Egyptian |
| AGHA-CHO | p13 | Q61 | Commonest deficient enzyme in galactosaemia (Gal-1-P uridyl transferase) | keyed (b) | dedicated bank |
| AGHA-CHO | p20 | Q103 | Commonest deficient enzyme in galactosaemia (restated) | keyed (B) | dedicated bank |

### Cori cycle

| sourceId | page | Q# | stem | key | signals |
|---|---|---|---|---|---|
| AGHA-CHO | p16 | Q92 | Product of contracting muscle used by liver to start gluconeogenesis (lactate) — shared w/ gluconeogenesis above | keyed (a) | dedicated bank |
| AGHA-CHO | p20 | Q104 | True statement about the Cori cycle (lactate: muscle→liver) | keyed (A) | dedicated bank |

### Applied/practical biochemistry (lab technique — not in the didactic book's own contents page, but Biochemistry-taught and Biochemistry-examined)

| sourceId | page/spot | stem | key | signals |
|---|---|---|---|---|
| PRAC-BIOCHEM | Spot 1 | Hemolysed-sample interference (which analytes falsely rise); tonicity of 5% sucrose vs plasma | keyed (model answer) | practical bank |
| PRAC-BIOCHEM | Spot 2 | Why 0.9% NH₄Cl causes haemolysis (osmotic mechanism); reagent causing haemolysis by dissolving membrane lipid (ether) | keyed | practical bank |
| PRAC-BIOCHEM | Spot 4 | Definition of renal glucosuria and the test that rules it out; serum vs whole-blood glucose sampling | keyed | practical bank |
| PRAC-BIOCHEM | Spot 5 | Nephelometer vs colorimeter for turbidity; mislabelled sample = which error type (preanalytical) | keyed | practical bank |
| PRAC-BIOCHEM | Spot 6 | Indications for OGTT; what number-of-molecules-in-solution depends on | keyed | practical bank |
| PRAC-BIOCHEM | Spot 7 | Importance of the cuvette; component that selects wavelength (filter/monochromator) | keyed | practical bank |
| PRAC-BIOCHEM | Spot 8 | Differentiating oxyHb from HbCO tube; purpose of microalbuminuria testing | keyed | practical bank |
| PRAC-BIOCHEM | Spot 9 | Best test for diabetic control over the last 3 weeks (fructosamine); normal/diabetic fasting glucose thresholds | keyed | practical bank |
| PRAC-BIOCHEM | Spot 10 | Contraindications to OGTT; methods for HbA1c measurement by charge | keyed | practical bank |
| PRAC-BIOCHEM | Spot 11 | Why first-morning-void is best for albuminuria; anticoagulants that make insoluble calcium salts | keyed | practical bank |
| PRAC-BIOCHEM | Spot 12 | Test detecting early kidney failure (microalbuminuria); normal HbA1c value; cuvette function; plasma-glucose vs HbA1c utility | keyed | practical bank |
| PRAC-BIOCHEM | Spot 13 | Instrument breakdown = which error type (analytical); which tube is haemolysed by NaOH | keyed | practical bank |

## Ordered list of distinct ideas the exam tests (these are the concepts)

Grouped by department-book chapter, in the book's own order. Classification is the label-text
search only (00-START-HERE §4 + LANE-BRIEF §10/§16); the canonical-key grep and the final
update-vs-mint call happen at Step 2, per the mint-freeze rules now fully lifted (§16).

**Blood chapter**

1. Porphyrin ring structure and Type I/III isomers — **HIT-PENDING**: `docs/Kasr-Source-Imports/concept/103-BMS-mcq-heme-concepts.md` (porphyria label hit; the porphyrin-ring-structure grain specifically needs a closer read of that file at Step 2 to confirm it covers structure, not only the porphyria-classification angle it clearly does cover)
2. Haem iron coordination bonds (5th/6th) and O₂ binding — **NEW** (`coordination bond`, `heme structure`: no hit)
3. Globin chain composition (2α-141aa + 2β-146aa) and Hb:haem ratio — **NEW** (`globin chains`, `141 amino acid`: no hit)
4. Normal Hb types — HbA / HbA₂ / HbF composition and 2,3-BPG affinity — **NEW** for the structural/compositional grain (`HbA2`, `glycosylated hemoglobin`: no hit); a **related-but-different-grain live concept** exists for fetal Hb's O₂ affinity number (`CON-OBS-A94183DB543092`, obstetrics-flavoured) — cross-link candidate at Step 2, not a merge target
5. Glycosylated Hb (HbA1c) and diabetic monitoring — **HIT-PENDING**: `docs/Kasr-Source-Imports/concept/102-INT-concepts.md`, `docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md` (both state the same 120-day/non-enzymatic mechanism)
6. Sickle cell disease — Glu6Val mutation, polymerisation/sickling, effects, diagnosis — **NEW** for the mechanism (`sickling`, `glutamic valine mutation`: no hit); a shape-only live concept exists (`CON-HEM-64F900DD24CBA1`, abnormal erythrocyte shapes) and a pending Kasr `101-ISK-mcq-concepts.md` record on the same disease — different module family, worth a closer look at Step 2 before minting
7. Thalassaemia — α/β types, HbH, mechanism, diagnosis — **NEW** (`thalassemia`, `HbH disease`, `alpha/beta thalassemia`: no hit anywhere)
8. Methaemoglobinaemia — congenital (HbM) vs acquired, NADH-cytochrome b5 reductase system — **NEW** (`methemoglobin`, `met hemoglobin reductase`, `cytochrome b5 reductase`: no hit)
9. Haem biosynthesis — ALA synthase rate-limiting step, lead-poisoning enzyme targets, porphyria types — **HIT-PENDING**, strong: `docs/Kasr-Source-Imports/concept/103-BMS-mcq-heme-concepts.md`, `docs/Kasr-Source-Imports/question/103-BMS-MCQ-protein-heme.md` (ALA synthase, sites of biosynthesis, acute intermittent/cutanea tarda porphyria all already drafted there)
10. Haem/Hb catabolism — bilirubin pathway, heme oxygenase, biliverdin, jaundice types — **HIT-PENDING**, very strong (18 hits): `docs/Kasr-Source-Imports/article/103-BMS-mcq-heme.md`, `docs/Kasr-Source-Imports/concept/103-BMS-mcq-heme-concepts.md`, `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md`, `docs/Kasr-Source-Imports/question/103-BMS-MCQ-protein-heme.md`
11. Folic acid — chemistry, THF one-carbon metabolism, deficiency — **HIT-PENDING**: `docs/Kasr-Source-Imports/question/103-BMS-MCQ-vitamins.md`, `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` (PABA/sulfonamide angle, adjacent grain)
12. Cobalamin (vitamin B12) — structure, intrinsic-factor absorption, the two biochemical reactions, deficiency — **HIT-PENDING**: `docs/Kasr-Source-Imports/question/103-BMS-MCQ-vitamins.md`, `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` (absorption mechanism already drafted there, though at 102-INT not 103-BMS — cross-module reuse candidate)
13. Vitamin K — function, γ-carboxylation of clotting factors, deficiency — **HIT-PENDING** for the deficiency-effects angle (`docs/Kasr-Source-Imports/question/103-BMS-MCQ-vitamins.md`); a **different-grain live pair** exists for the pharmacology of its antagonists (`CON-HEM-121DCA556B6311` coumarins inhibit vitamin K, `CON-HEM-A940AB960A5C0D` dicumarol/warfarin) — cross-link, not merge, since those concepts are about the drugs, not the vitamin's own carboxylation mechanism
14. Iron metabolism — absorption mechanism/factors, transport (transferrin), storage (ferritin), distribution, deficiency/overload — **NEW** for transport/storage structure (`ferritin`, `transferrin`: no hit); a **different-grain live concept** exists for absorption *impairment* causes (`CON-HEM-A92555744C9B35`) — cross-link candidate, not the same objective as "how iron is normally absorbed"
15. Immunoglobulins — Ig molecule structure (light/heavy chains, domains), the 5 classes and their functions — **NEW** (`immunoglobulin structure`: no hit; the `IgG`/`IgA`/`IgM` single-token queries returned only substring false positives — "trigger", "ligament", "pigment" — not genuine Ig hits, confirming the shortest-distinctive-word trap the manual warns about)
16. Myoglobin — single haem, single O₂-binding site, contrast with haemoglobin — **NEW** (`myoglobin iron atoms`: no hit)

**CHO metabolism chapter**

17. Glycolysis — pathway, key/rate-limiting enzymes, RBC importance, inhibitors (fluoride/arsenate), hormonal regulation — **HIT-PENDING**, very strong: `docs/Kasr-Source-Imports/article/103-BMS-biochemistry.md`, `docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md`, `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md`, `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md`, `docs/Kasr-Source-Imports/question/103-BMS-MCQ-carbohydrate-bioenergetics.md` (this pending batch already covers committed step, inhibitors, ATP yield and RBC importance in detail)
18. Pyruvate metabolism / PDH complex — coenzymes, regulation, inhibitors — **HIT-PENDING**: `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` (names TPP as the coenzyme that fails first)
19. Citric acid cycle — enzymes, FAD-dependent step, inhibitors, ATP yield, amphibolic role — **HIT-PENDING**: `docs/Kasr-Source-Imports/article/103-BMS-biochemistry.md`, `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md`
20. Hexose monophosphate shunt / G6PD / favism — oxidative phase, NADPH, ribose-5-P, RBC protection — **HIT-LIVE**: `CON-HEM-A1EF4D20C85878` (G6PD catalyses initial glucose-oxidation step, generates NADPH), `CON-HEM-4F64967BBFBB6F` (G6PD deficiency → oxidant-induced haemolysis) — both **also** re-drafted, word-for-word, in the pending `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md` (worth flagging to whoever owns that Kasr batch: it appears to be shadowing its own already-promoted live concepts rather than referencing them)
21. Uronic acid pathway — UDP-glucuronic acid formation and its conjugation role — **NEW** as its own pathway concept (`uronic acid pathway`, `UDP glucuronic acid`: no hit); overlaps conceptually with the bilirubin-conjugation concept above (idea 10), which **is** pending — Step 2 should decide whether this is a separate "the pathway" concept or folds into idea 10
22. Gluconeogenesis — site, substrates, key enzymes, regulation — **HIT-PENDING**, very strong: `docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md`, `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md`
23. Glycogenesis — glycogen synthase, branching enzyme — **HIT-PENDING** for the topic generally (`docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md`, `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` both carry a bare "Glycogenesis" alias with no visible mechanism detail) — Step 2 needs to open that file to confirm depth before deciding update vs. new
24. Glycogenolysis — phosphorylase, debranching enzyme, rate-limiting step — **HIT-PENDING** for phosphorylase regulation (`docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md`); "debranching enzyme" itself returned **NEW** (no hit) — likely missing from that pending batch too
25. Fructose metabolism — essential fructosuria (fructokinase), hereditary fructose intolerance (aldolase B) — **NEW** (`fructose intolerance`, `fructokinase`, `aldolase B`: no hit anywhere)
26. Galactose metabolism — galactosaemia (Gal-1-P uridyl transferase deficiency and others) — **NEW** (`galactosemia`, `galactose 1 phosphate uridyl transferase`: no hit)
27. Cori cycle — lactate shuttle between muscle and liver — **NEW** as a standalone concept (not searched directly; folds naturally under gluconeogenesis, idea 22, which is pending — Step 2 call)

**Applied/practical biochemistry cluster** (not in the didactic book's contents page; entirely from the Practical Blood Questions bank's Biochemistry spots)

28. Haemolysis interference with common lab analytes (AST, LDH, K⁺, ALT falsely raised) — **NEW** (`hemolyzed sample interference`: no hit)
29. Mechanisms of induced RBC lysis (NH₄Cl osmotic mechanism vs ether lipid-dissolving mechanism); osmotic fragility test — **NEW** for the mechanism-level facts; a pending `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` record carries "Osmotic fragility" as an alias but at a different module/grain (the test itself, not these two reagents' mechanisms)
30. Seliwanoff's test for fructosuria / hereditary fructose intolerance diagnosis — **NEW** (`Seliwanoff`: no hit)
31. Renal glucosuria vs diabetes — plasma vs whole-blood glucose measurement — **NEW** (`renal glucosuria`: no hit)
32. Spectrophotometry principles — cuvette, monochromator/filter — **NEW** (`spectrophotometer cuvette`: no hit)
33. Turbidity measurement — nephelometer vs colorimeter — **NEW** (`nephelometer`: no hit)
34. Laboratory error classification — preanalytical / analytical / postanalytical — **NEW** (`preanalytical error`: no hit)
35. Glycaemic-control monitoring — HbA1c vs fructosamine, reference ranges — **NEW** as a standalone concept (`fructosamine`: no hit); cross-links to idea 5 (HbA1c) which is pending
36. Microalbuminuria — early nephropathy detection — **NEW** (`microalbuminuria`: no hit)
37. Oxyhaemoglobin vs carboxyhaemoglobin differentiation (sodium dithionite) — **NEW** (folds under idea 2/8's Hb-chemistry family but the specific lab test was not separately searched — flagged for a Step 2 query before minting)
38. Anticoagulant chemistry — potassium oxalate/sodium fluoride vs calcium-precipitating anticoagulants — **NEW** (`potassium oxalate`, `sodium fluoride`: no hit)
39. OGTT — indications and contraindications — **NEW** (`OGTT`, `oral glucose tolerance test`: no hit)

## GUARD check

3 End of Module papers confirmed in `Exams` (2 Egyptian-stream, 1 international/wafdeen-stream,
per filename — the manifest's own `streamSignal` field does not carry this, see HAZARDS). The
module's `General` folder carries exactly **2** distinct MCQ banks after de-duplicating twins
(`MCQs - Blood practical.pdf` and `MCQs - Practical Blood Questions_...`), **not 3** as the
dispatch's GUARD line states. I could not find a third under `General` for `AU-MED-103` — the
5 raw rows in that department resolve to 2 content-distinct banks once twin pairs are collapsed
(`src_dede70aa…`/`src_3e62e4d…` are one twin pair; `src_5309ee19…`/`src_7f5bd50b…`/`src_4b9b0c4c…`
are a three-way twin group of the same content in two formats). Flagged under BLOCKED-adjacent
below rather than guessed past.

## LANE: W1-103-BIOC
## SCOPE: AU-MED-103 · Biochemistry · triage (Step 1 only)
## OUTPUT: docs/Alexandria-Source-Imports/coverage/AU-MED-103-biochemistry-triage.md
## COUNTS: 337 items triaged (274 MCQ + ~63 essay/written) · 255 MCQ keyed · 19 MCQ unkeyed
(1 source-side blank, 4 lost-in-extraction, 14 OCR-ambiguous `0`) · 39 distinct concepts ·
1 hit-live · 13 hit-pending · 25 new. No gates run yet — nothing authored this step.
## OWED:
- The `.docx` twin `src_5309ee19e1149a5bbe9d` (Practical Blood Questions bank, twinPreferred)
  is still unread; I substituted its `.pdf` twin. Someone needs to either get `pagetext.py` a
  docx path or confirm the two twins agree before Step 2 cites either.
- AGHA-BLOOD MCQ Q3–Q6 keys are missing from the extracted text entirely (table-layout fault,
  not a scan-quality one, since `textLayer: native`) — needs a render check before those four
  can be authored with a key.
- AGHA-CHO MCQ has 14 answer entries printed as a bare `0` — needs the same render check.
- EGYF Q13 has no key in the source itself (`13.xx`) — record as permanently unkeyed, not a
  gap to chase.
- Ideas 23 (glycogenesis) and 24 (glycogenolysis, "debranching enzyme" specifically) need a
  fuller read of `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` at
  Step 2 — the label-text hit confirms the topic is drafted there but not whether the specific
  mechanism-level facts this module's questions test are already covered.
- Idea 20 (G6PD/favism) — the Kasr `103-BMS-biochemistry-concepts.md` pending file appears to
  re-draft its own already-promoted live concepts (`CON-HEM-A1EF4D20C85878`,
  `CON-HEM-4F64967BBFBB6F`) word for word rather than referencing them. Not mine to fix; worth
  surfacing to whoever owns that Kasr batch.
- GUARD mismatch: dispatch says 3 MCQ banks in `General`; I find 2 distinct ones after
  de-duplicating twins. See "GUARD check" above.
## HAZARDS:
- The manifest's `examSignals.streamSignal` is `null` for all three EOM papers even though the
  filenames spell "Egyptian"/"wafdeen" out in English — the classifier evidently only matches
  the Arabic terms. Every other department lane reading these same three files will hit the
  same gap; worth a manifest patch rather than each lane re-discovering it.
- `AGHA-BLOOD` and `AGHA-CHO` MCQ banks are heavily reused/restated within themselves (e.g. the
  rate-limiting-glycogen-degradation question and the Cori-cycle/lactate-shuttle question each
  appear near-verbatim twice under different numbers) — expect the eventual question batch's
  count of *distinct* MCQs to be meaningfully lower than 184 once duplicates are collapsed at
  Step 3.
- This module's Biochemistry content overlaps almost completely with Kasr Alainy's `103-BMS`
  (Blood and Musculoskeletal System) pending batch — same body-system chapter, same enzymes,
  same worked examples in places. Step 2 should expect **update-plus-mint to be the dominant
  pattern**, not fresh minting, once the fuller canonical-key grep runs.
## BLOCKED: none
