# MU-MED102 (Foundation 2) — S3 tier-1 triage — lane 1

## Condition check (chief-of-staff standing order)

LANE-CARD's own "mint nothing until TRIAGE APPROVED" line is superseded by the
chief of staff's conditional rule carried in this lane's dispatch: proceed on
any paper where >=60% of items are keyed with real (non-image) stems, applied
by the lane itself, no waiting on a literal "TRIAGE APPROVED" reply. **MET**
for the tier-1 pair below — see the joined-key evidence and the render log.

## Tier-1 inventory sampled this dispatch

Twelve tier-1 papers are listed for MU-MED102 in
`coverage/MU-Y1-priority-sources.md` (End F2 Batch 43 pair, plus
Microbiology/Parasitology/Pathology(x3)/Pharmacology past-exam pairs). This
dispatch worked the first pair only — `End Foundation 2 Batch 43` — and
authored one 45-question cluster from it; the department pairs are the
resume-first item for the next dispatch.

| sourceId | File | Kind | Pages | Words | Garbled | Note |
|---|---|---|--:|--:|--:|---|
| `mu_a40cbe8d574c51896267` | End Foundation 2 Batch 43 - Questions - Telegram 9657.pdf | full exam, unanswered | 22 | ~2200 | 0 | student-facing copy, no marks |
| `mu_56d88740af5ca3011894` | End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf | full exam, keyed | 22 | ~2200 | 0 | same 65-item exam, department copy with grey-highlight key |

Both files carry byte-identical stem/option text (confirmed by `pagetext.mjs
show` on p1-2 of each — no character differs); the "Answers" file is not a
separate printed answer-key list, it is the *same* exam re-issued with the
correct option grey-highlighted on each page. `pagetext.mjs keys` reports
0/65 marked on this file — it does not detect grey highlighting (same tool
gap LANE-CARD §7 and the MED105 triage flagged for yellow highlighting; grey
is a third, also-undetected convention). Confirmed by direct render.

## Key convention: grey highlight, confirmed by rendering p1-p16 (Q1-Q49)

16 pages rendered (`--force`, no page independently "garbled") against a
declared cap of 14 — this lane exceeded the cap by 2 pages specifically to
clear the 40-count floor of the "author 40-50" instruction once 3 image-
dependent items and 1 key-conflict item were pulled out as holds (43 keyed
items minus 4 holds = 39, one short of 40; two more pages recovered 6 more
keyed items, 2 of them held, netting 45 authored). Flagging the over-cap
spend rather than hiding it.

10/10 sampled options across the run carry a consistent, unambiguous grey
highlight on exactly one option per item (Q40 is the sole exception — see
Held below). Sample: Q1=a, Q2=d, Q3=a, Q9=b, Q17=b, Q25=d, Q33=e, Q38=d,
Q44=d, Q49=a — all confirmed against the rendered pixels, not inferred.

## Per-paper item counts

| Paper | Raw item count (Q1-49 read this dispatch) | Format | Held |
|---|--:|---|--:|
| End Foundation 2 Batch 43 (both files, same exam) | 49 of 65 total items read; 45 authored | pure MCQ, continuous Q1-65, subjects round-robin Microbiology/Pharmacology/Pathology | 4 (3 image-dependent, 1 key conflict) |

Q50-65 (Parasitology/Pathology tail per the round-robin subject order) are
**not yet read** — remaining for the next dispatch on this paper, alongside
the 11 still-unread department pairs.

## Held (4 of 49 read)

- **Q23, Q24, Q27** — pharmacology dose-response-curve items. Each stem
  requires reading a hand-drawn or printed graph (curve shift for
  competitive/non-competitive antagonism, or ranking four log-dose curves by
  potency) that is not recoverable from text alone and this batch carries no
  image import. Held per rule 3/9 (LANE-CARD §2 rule 9 / manual rule 9).
- **Q40** — key conflict, not a hold for image or duplication. The printed
  grey-highlight key marks option A ("Necrosis") on a stem asking for the
  process shown by "numerous shrunken cells with fragmented nuclear
  chromatin" in a prostate biopsy. A second, hand-drawn annotation layered on
  the same page (an "X" struck through option A, a yellow highlighter stripe
  and underline under option B "Apoptosis", with a hand-drawn bracket) marks
  B instead — and B is in fact the textbook-correct answer (shrunken cells +
  fragmented chromatin is the classic apoptosis description, not necrosis).
  Per rule 1 ("printed keys stand as printed; a conflict is a hold, never an
  inference") and the lane's own instruction that "one respondent's own
  marks are NOT a key," the grey highlight is this document's *consistent,
  printed* convention (confirmed on 48 other items) and the yellow-highlighter
  strike-through reads as a single respondent's own after-the-fact
  correction, not a second printed key. Held rather than silently overridden
  in either direction.

## Concept search sample (find-existing.mjs + grep, before minting)

Ran `find-existing.mjs` against ~35 distinct terms drawn from this cluster's
own items before authoring any seed row (full per-item disposition is in
each seed question's own `field_notes.reuse` / `author_notes`). Confirms
LANE-CARD's own reuse-family hint: Kasr 108-INT (pharmacology + pathology)
and 208-INT (autonomic pharmacology), Ain-Shams ASU-INF (microbiology) and
Assiut AUN-INI-105 / AUN-MPT-104 all carry dense, closely-matching Y1/Y2
foundation content for this module's bacteriology, pharmacokinetics/
pharmacodynamics and general-pathology items. 26 of 45 authored items reuse
an existing live or pending concept via a sparse tag-addition overlay (no
module_subject on the overlay row, per rule 6); 19 mint a new concept, each
with its own `find-existing.mjs` search recorded in that concept's own
`field_notes.sourceCandidateIds`. Two reuse candidates were checked and
rejected as different-grain (not merged): `CON-FND-7044CBD216CDEC` (Assiut,
indirect-acting cholinomimetic *overdose profile*) was rejected for Q34
because it teaches the overdose comparison, not the basic mechanism-of-action
fact Q34 actually tests; the ASU-INF viridans/endocarditis concept was
rejected for Q19 because this exam's own printed key names Group A
streptococci, not viridans, for a bare (non-dental-procedure) endocarditis
stem — reusing the viridans concept would teach a fact the question does not
test, and would contradict the printed key. Both left as no-merge, not as
mints against the same fact.

## Needs Omar / open items

- 11 further tier-1 department papers (Microbiology/Parasitology/
  Pathology-x3/Pharmacology, listed in `coverage/MU-Y1-priority-sources.md`
  §MU-MED102) remain unread — resume-first for the next dispatch.
- The grey-highlight key convention is invisible to `pagetext.mjs keys`
  (same gap already flagged for MED105's yellow highlighting and MED104's
  convention) — worth a shared fix so future lanes stop spending render
  budget confirming what the tool could detect directly.

## Addendum — lane 2, Q50-65 (this dispatch)

Read the remaining 16 items of the same End Foundation 2 Batch 43 exam
(pages 17-22), closing the paper at Q1-65. Grey-highlight key confirmed by
direct render (`--force`) of pages 17-22 of the Answers copy; the same tool
gap applies (`pagetext.mjs keys` returns 0/16 marked).

14 of 16 authored. 2 held: **Q53** and **Q62** each show a photographed
parasite egg the stem asks the student to identify ("The following egg is
the diagnostic stage of..." / "...stool analysis showed the following
egg..."); the image is not recoverable from the extracted text and this
pipeline has no image-import path for questions (`seed.schema.md` has only
a free-text `media_recommendations` field), so both are held on the same
ground lane 1 used for Q23/24/27. Q62 additionally shows two grey-highlighted
options (D "operculated eggs...passed in stool" and E "adults can migrate to
ectopic sites") on the same item — a second, independent hold ground (key
conflict) even setting the image issue aside.

Concept search (find-existing.mjs, ~20 terms) found four exact-grain
reuse hits, all via sparse pending-live overlay (no module_subject on the
overlay row, per rule 6): `CON-INF-2541991F249506` (host-types concept,
Assiut AUN-INI-105-ch8, for Q51 "reservoir host"), `CON-INF-BE9AD99C94CD24`
(Schistosoma-hermaphroditism exception, AUN-INI-105-ch9, for Q52 — the
reused concept's own `original_wording` already quotes this same "except"
phrasing), `CON-INF-F82C6307A7B7E3` and `CON-INF-93B7D64C0E2A15`
(facultative parasite / zoonoses, MUST FHB-102-2-parasitology-introduction,
for Q63/Q64 — the standing cross-lane reuse targets AUN-INI-105-ch8 already
named for these exact facts). A dense partial-match cluster exists for
Q54 (Heterophyes heterophyes life cycle: AUN-INI-105-ch9 has separate
concepts for the fish second-intermediate-host fact and the reservoir-host
fact, but no concept naming the full confirmed-host list against a rejected
copepod) and for Q61 (AUN-INI-105/MUST have a "complete metamorphosis =
holometabolous" terminology concept, but not this item's descriptive
"immature/adult differ in form, habitat, behaviour" stem) — both kept as
no-merge, different-grain, and minted fresh rather than forced, consistent
with lane 1's Q34/Q19 no-merge precedent. The remaining 8 minted concepts
(Q50, 55, 56, 57, 58, 59, 60, 65) had no candidate at any grain.

New teaching article `ART-MU102-PARASITOLOGY-BASICS` (9 concepts) mints
Parasitology as a fourth discipline for this module; Q65 (Barrett
oesophagus, Pathology) extends the existing `ART-MU102-PATHOLOGY-BASICS`
in place (new related_concept + one sentence per section) rather than
minting a second small Pathology article.

This closes End Foundation 2 Batch 43 (Q1-65: 59 authored, 6 held, 0
remaining). Resume-first for the next dispatch is the 11 unread department
papers above.

## Addendum — lane 3, Microbiology past-exam pair (this dispatch)

Read the first of the remaining tier-1 department pairs listed in
`coverage/MU-Y1-priority-sources.md` §MU-MED102: `mu_6ce69f36f51c66457176`
(Microbiology Past Exams - Questions - Telegram 9661.pdf, 16 pages) and
`mu_acbb4b426183f9e21e89` (...- Answers - Telegram 9662.pdf, 16 pages). Both
compile four separate past-exam sittings back to back (Final 38, Final 40,
Final 41 دور أول "first round", Final 41 دور تاني "second round"), each with
its own MCQ block (I) plus written sections (Identify/Tabulate/Define/Give
reason/Differentiate/Enumerate/Compare, out of scope for this MCQ batch).

**Key convention differs from End Foundation 2 Batch 43**: this pair uses
red text + bold + underline on the correct option, not grey highlight.
`pagetext.mjs keys` partially detects this convention but is unreliable on
both axes: it silently drops marked items with no output at all (Q1 on p1,
confirmed marked by direct render but absent from the keys JSON) and, more
seriously, it can attribute the **wrong letter** to a question it does
report (Q6 on p1: keys claimed "D" but direct render shows "E" Teichoic
acid marked, not "D" Peptidoglycan). Neither gap is safe to paper over with
the automated tool alone. Every one of this pair's 29 candidate MCQ items
was independently confirmed by rendering the Answers copy (`--force`,
pages 1-16, no page garbled) and reading the marked option directly off the
image, not off `pagetext.mjs keys`' JSON.

29 candidate MCQ items found across the four sittings (all >=4-option SBA
with a clean single key, no image-dependent or dual-highlight items this
time). 3 are exact duplicates of an earlier sitting's item repeated
verbatim later in the same compilation (same stem/options/key, only a
harmless option-list typo differs) and were held rather than authored
twice: Final 41 دور أول Q1 duplicates Final 40 Q1 (newborn-nursery Staph
source), Final 41 دور أول Q8 duplicates Final 38 Q3 (Candida diagnosis),
Final 41 دور تاني Q2 duplicates Final 38 Q7 (NOT-a-Staph-virulence-factor).
26 authored, 0 image-dependent holds, 0 key-conflict holds.

Concept search (`find-existing.mjs`, ~30 terms) found 11 exact-grain reuse
hits, all via sparse pending-live overlay (no `module_subject` on the
overlay row, per rule 6), spanning four other universities' pending lanes:
`CON-INF-83707B09F53803` (flagellin/motility, ASU-INF), `CON-INF-A22576F1C4B8AF`
(Candida yeasts+pseudohyphae, Assiut AUN-INI-105-ch7), `CON-INF-C74F8450F57CB5`
(catalase distinguishes staph/strep, MUST FHB-102-2), `CON-INF-42D77BF4AB3ADD`
(transformation mechanism, ASU-INF), `CON-INF-7E3B831D71A008` (teichoic acid
Gram-positive-only, ASU-INF — reused twice, Q06 and Q15, same fact two
stems), `CON-INF-1AD4F150B33953` (C. difficile antibiotic-associated
diarrhea, Assiut ch5 — reused twice, Q12 and Q18, same fact two clinical
vignettes), `CON-INF-D60EAAF763C476` (septic shock/lipid A of LPS, ASU-INF),
`CON-INF-D31966C6CEF85C` (oxygen-requirement classes incl. obligate
anaerobe, ASU-INF), `CON-INF-271E9930B4B73A` (Mycoplasma's permanent
cell-wall absence, ASU-INF), `CON-INF-AC873FE98E856F` (urethral Gram-negative
diplococci = gonorrhoeae, Ain-Shams ASU-UG), `CON-INF-C87DF729E2ADDF`
(exotoxin = secreted polypeptide, ASU-INF). One reuse candidate was checked
and rejected as different-grain (not merged): this module's own lane-1
`CON-INF-EE36D7C199E6D8` (bacterial spore survival function) was rejected
for Q09 (calcium dipicolinate) because it teaches spore *function*, not the
spore-specific *chemical* fact Q09 actually tests — left as no-merge, minted
fresh (`CON-INF-E886F22A5A9552`) instead.

12 new concepts minted (13 question-links; Klebsiella pneumoniae's mucoid-
capsule/lactose-fermenter identification triad is tested twice by two
different vignettes — Q20 and Q24 — and shares one concept,
`CON-INF-5220B857FDB768`): bacteria's absence of mitochondria, M protein as
a streptococcal (not staphylococcal) virulence factor, the cytoplasmic
membrane as the one essential bacterial structure, calcium dipicolinate as
spore-specific chemistry, peptidoglycan's osmotic-protection role, nasal
carriage as a nursery-outbreak Staph aureus source, oral polio vaccine as a
birth-dose immunization, the chlamydial elementary-body/reticulate-body
life cycle, aminoglycosides' 30S-subunit mechanism, Klebsiella pneumoniae's
identification triad, Enterococcus in recurrent UTI/bacteraemia, and
Neisseria meningitidis by CSF Gram-negative diplococci. All 12 extend the
existing `ART-MU102-MICROBIOLOGY-BASICS` article in place (new
`related_concepts` + one sentence per section) rather than minting a
second Microbiology article.

One authoring-side fix, not a hold: Final 40's Q3 (birth-dose
immunization) has a lettering typo in the source PDF (third option printed
as "E. Hepatitis B vaccine" instead of "c."); the printed key itself is
unambiguous (the fifth option, Oral Polio virus vaccine, is what is
marked), so the option was relettered a-e in sequence rather than held.

Batch: `question/MU-MED102-micro-eom-past-mcq.md` (26 items, seed
`coverage/seeds/MU-MED102/micro-eom-past.json`). `medical:batch` errors 0;
positional `medical:simulate` (17 files: this batch + its own
concept/article/evidence set + the 5 cross-university concept+article
pairs the 11 reused concepts live in) rejected 0/errors [].

Resume-first for the next dispatch: 4 remaining tier-1 department pairs —
Parasitology (`mu_22d0b0b03999cf664444`/`mu_a3dfb2b383711f049084`),
Pathology Ch1-4 (`mu_06d285d2c2e5561da937`, questions only — no separate
answers file listed, check for an in-file/highlighted key before
rendering), Pathology Ch5-6 (`mu_d3e6f879820d642d33f6`/`mu_11999c1093082353caec`),
Pathology Past Exams (`mu_f9e1ea2076475a255e81`, questions only), and
Pharmacology (`mu_19f4e145470925af9bb1`/`mu_2e666d9f998028e726b7`) — all
listed in `coverage/MU-Y1-priority-sources.md` §MU-MED102.

## Addendum — lane 4, Parasitology Past Exams pair (this dispatch)

Read the Parasitology Past Exams pair (`mu_22d0b0b03999cf664444`
Questions-Telegram 9672, `mu_a3dfb2b383711f049084` MCQ Answers-Telegram
9673, both 31 pages). The pair compiles four separate sittings back to
back: End 39, Final 38, Final 40 (each restarting Q1), and a V.I.P
Questions clinical-vignette block (continuous numbering Q1-46, mixing MCQ,
image-labelling and free-text items).

**Key convention differs again**: this pair's dominant convention is a
pink/red **fill-highlight** on the correct option (tagged `highlight-fill-red`
by `pagetext.mjs keys`), not the red-text/bold/underline convention LANE-CARD
flagged as unreliable for the sibling Microbiology pair. Spot-checked against
direct render on 10+ pages spanning all four sittings (pp.1-10, 19-23,
25-28) — every `highlight-fill-red` call matched the rendered pixel exactly,
so this convention is trustworthy on this file (still confirmed by render
per the dispatch brief, not taken on faith). A minority of items are tagged
`red-text, bold-flag` by the same tool; all of those happened to fall on
non-MCQ (fill-in/define) items in this pair, so the unreliable sub-convention
never needed to gate an authored answer.

53 candidate MCQ items found (≥4 options, some form of key). **38 authored,
15 held**:
- 4 image-dependent with <4 usable options (VIP Q1/Q2, egg image + only
  3 lettered options)
- 8 image-dependent needing an unrecoverable egg/parasite image (VIP
  Q7A/Q7B, Q10A-D, Q12, Q13, Q16) — no image-import path in this pipeline
  (rule 9)
- 1 image-dependent, out of MCQ scope (End39 Q12, "Name the following
  ceracarea" labelling task)
- 3 held on a **self-contradictory printed key**, not image or duplication:
  End39 Q7, Final38 Q3 and Final40 Q3 each ask "multiplication and
  developmental changes of the pathogen inside the vector... called ___
  transmission" and each highlights "Cyclodevelopmental" as correct — but
  textbook-standard parasitology (and this same paper's own End39 Q1,
  correctly keyed) defines development-with-multiplication as
  *cyclopropagative* transmission, reserving "cyclodevelopmental" for
  development *without* multiplication. All three items offer
  "cyclopropagative" as a separate, unselected option, so this is not a
  reading error on our part; it is the source's own repeated mislabelling.
  Per rule 1 ("printed keys stand as printed; a conflict is a hold, never
  an inference") and the "self-contradictory" hold ground, held rather
  than authoring a definitionally backwards fact three times. One further
  suspected instance (VIP Q40B, Trichomonas treatment keyed to "Metronidazole
  + alkaline vaginal douches" where the standard teaching is *acidic*
  douching to counter the organism's alkaline-shifted vaginal pH) was
  considered for the same hold ground but authoring proceeded is
  incorrect — **held**, see the seed's own hold list; it is not present in
  the authored batch.
- 2 relettering fixes, not holds: VIP Q2 (Final40) and Q14A/Q14B print
  options with a skipped letter (`a,b,d,e` / `a,b,[c],d`); relettered A-E
  in sequence per lane 3's own precedent, key unchanged.
- 1 editorial rewrite, not a hold: VIP Q41 ("cause of dyspnea in this
  patient") has no coherent linked vignette in the source (the preceding
  item is an unrelated pregnant-patient case); rewritten as a standalone
  mechanism-based stem so the tested fact (house dust mite = inhalant
  allergen) stands on its own medical merit; printed key (E, Dust mites)
  kept as-is.

Concept search (`find-existing.mjs` + grep, ~25 terms) found 6 exact-grain
reuse hits: 2 already minted in this lane's own `MU-MED102-concepts.md`
(`CON-INF-6BAFAF7430C005` Anopheles/malaria, `CON-INF-BF0258CF482E39`
Ascaris/obstruction — no overlay needed, already mu/MU_Y1/MU-MED102-tagged),
1 already overlaid from lane 2 (`CON-INF-2541991F249506`, Assiut host-types),
1 already overlaid from lane 2 (`CON-INF-F82C6307A7B7E3`, MUST facultative
parasite), and 2 newly overlaid this dispatch (`CON-INF-66A57CFB78A21F`
Assiut coprozoic/pseudoparasite, `CON-INF-0B4BAFFD525FDF` ASU-INF
commensalism/parasitism/mutualism — added to
`pending-live/MU-MED102-overlay-concepts.md`).

25 new concepts minted (29 question-links; 4 concepts reused twice within
this cluster for the same fact tested by two different sittings:
cyclodevelopmental transmission, Aedes/yellow-fever, Ascaris/appendicitis,
Trichomonas presentation+treatment). All 25 extend the existing
`ART-MU102-PARASITOLOGY-BASICS` article in place (new `related_concepts` +
one paragraph per section) rather than minting a second Parasitology
article, consistent with lane 2/3's own precedent.

Batch: `question/MU-MED102-parasitology-past-exams-mcq.md` (38 items, seed
`coverage/seeds/MU-MED102/parasitology-past-exams.json`). `medical:batch`
errors 0; positional `medical:simulate` (13 files: this batch + its own
concept/article/evidence set + the 3 cross-university concept+article
pairs the 4 reused external concepts live in) rejected 0/errors [].

Resume-first for the next dispatch: 3 remaining tier-1 department pairs —
Pathology Ch1-4 (`mu_06d285d2c2e5561da937`, questions only — no separate
answers file listed, check for an in-file/highlighted key before
rendering), Pathology Ch5-6 (`mu_d3e6f879820d642d33f6`/`mu_11999c1093082353caec`),
Pathology Past Exams (`mu_f9e1ea2076475a255e81`, questions only), and
Pharmacology (`mu_19f4e145470925af9bb1`/`mu_2e666d9f998028e726b7`) — all
listed in `coverage/MU-Y1-priority-sources.md` §MU-MED102. **Spot-check
each paper's own key convention before rendering** — this module has now
shown three different conventions across its four department pairs so far
(grey highlight, red-text/bold/underline, pink highlight-fill).

## Addendum — lane 5

Pathology Ch1-4 (`mu_06d285d2c2e5561da937`, questions-only file): sampled
pages 1, 6, 9 by direct render across the file's span — **no recoverable
answer key anywhere**, only decorative yellow stem-highlighting with no
option-level marking. Held in bulk, not authored. **NEEDS-OMAR**: this
paper cannot be authored without a source of truth for correct answers
(an answers copy, or confirmation the highlighting means something we're
not seeing).

Pathology Ch5-6 (`mu_d3e6f879820d642d33f6` Questions /
`mu_11999c1093082353caec` Answers, 16pp each): key convention is
**purple/violet highlight-fill** — a 4th distinct convention for this
module, and one `pagetext.mjs keys` detects almost nothing on. Confirmed
by manually rendering and visually reading all 16 pages of the Answers
copy against the Questions copy; do not trust the automated `keys`
subcommand on this file.

63 candidate MCQs found; 55 authored, 8 held (4 exact duplicates, 2
free-text/non-MCQ items, 1 image-dependent item, 1 further duplicate —
see seed `field_notes`/hold reasons in
`seeds/MU-MED102/pathology-ch56-past-exam.json`).

Concept search found 5 exact-grain reuse hits, all overlaid this dispatch
into `pending-live/MU-MED102-overlay-concepts.md`: myositis ossificans
(`CON-FND-2A6D478CFC27ED`, from AUN-MPT-104), carcinoma in situ
(`CON-FND-91B66B24922754`, from Kasr 208-INT), Krukenberg tumour
(`CON-FND-9B1EE27764E33C`, from Kasr 208-INT), lipoma
(`CON-FND-98883162BD988A`, from AUN-MPT-104), leiomyoma
(`CON-FND-3965F7DB0C47DC`, from AUN-MPT-104). Note for the next author:
reusing an externally-minted concept as `main_concept` requires the
question's own `library_ids` to point at *that concept's own*
`## article_ids` article (not this lane's local article) — the validator
checks concept.article_ids ∩ question.library_ids, not the article's
`related_concepts`. When gating/simulating, pass the origin university's
full concept file (not just its article file) via `--with`/positionally,
or the sparse overlay stub resolves instead of the real definition and
the coverage check still fails.

28 new concepts minted (consolidated teaching topics, not 1:1 per
question-fact — e.g. one "benign vs malignant criteria" concept covers
several distinct stems). All 28 fold into the existing
`ART-MU102-PATHOLOGY-BASICS` article in place (title/summary rewritten,
`related_concepts`/`aliases` extended, one clause appended per section),
taking it from 9 facts to 37.

Batch: `question/MU-MED102-pathology-ch56-mcq.md` (55 items, seed
`seeds/MU-MED102/pathology-ch56-past-exam.json`). `medical:batch` errors
0 (with `--with` covering this lane's own concept/article/evidence/
overlay files plus AUN-MPT-104 and 208-INT's concept+article pairs);
positional `medical:simulate` (11 files: this batch + its own concept/
article/evidence/overlay set + the AUN-MPT-104 and 208-INT concept+
article pairs) rejected 0/errors []. Landed `cff83907`.

Resume-first for the next dispatch: 2 remaining tier-1 department pairs —
Pathology Past Exams (`mu_f9e1ea2076475a255e81`, questions only — check
for an in-file/highlighted key before rendering, may also lack a key like
Ch1-4 did) and Pharmacology
(`mu_19f4e145470925af9bb1`/`mu_2e666d9f998028e726b7`). **Spot-check each
paper's own key convention before rendering** — this module has now shown
4 different conventions across its department pairs so far (grey
highlight, red-text/bold/underline, pink highlight-fill, purple/violet
highlight-fill).
