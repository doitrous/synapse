# AU-MED-105 · Physiology · question-led triage

Lane W1-105-PHYS. `GUARD = bank` — no End of Module or End of Year paper exists for
AU-MED-105. Per the no-paper guard, the MCQ banks are the triage source and
`exam_signal` tier is the **bank** tier, never a paper's, for every concept below.

## Bank inventory checked (all four named in the dispatch)

| Bank | sourceId | Department | Manifest `category` | Physiology-relevant items |
|---|---|---|---|---|
| Day 1 revision physiology MSK | `src_e7b919a3156f8ce9f946` | Physiology | Department Questions | **13 of 13** |
| MCQs - أسئلة جواد (Gawad) | `src_56eb2eda1bb51e4c2fdc` | Physiology | Department Questions | **11 of 11** |
| lec 1&2 physiology MSK | `src_9a15ce25096e8cb32def` | Physiology | Department Questions | **12 of 12 items, 11 distinct** (one question is printed twice, verbatim, with the same key both times — see hazard) |
| lec 3 physiology MSK | `src_2a6d84d64deab5570e57` | Physiology | Department Questions | **5 of 5** |
| Module's "EOM MCQs -" file | `src_6bb87147b493350691fc` (preferred twin of `src_9484e81af0b173505ec4`) | Anatomy | Department Questions — filename carries "EOM MCQs -" but the manifest does **not** classify it "End of Module paper"; content-judged below per the orchestrator's addendum | **0 of 120** — pure Upper Limb gross anatomy (nerve injuries, joints, vessels, lymphatics); checked by full read plus a keyword sweep (membrane, potential, conduct-, excitab-, muscle spindle, EMG, reflex, synap-, physiol- — zero hits) |
| General bank 1 | `src_37ce166b69d2c0a0f0ab` ("MCQs - امتحان تجريبي 1") | General | Department Questions | **0** — written practical (labelling) mock exam, Anatomy upper/lower-limb muscles, nerves and vessels only |
| General bank 2 | `src_f52b688229ba15f4b183` ("MCQs - امتحان تجريبي 2") | General | Department Questions | **0** — same format, same department |

Only the four Physiology-owned banks contribute items to this department. The other
three (the misfiled "EOM MCQs -" file and the two General banks) were read in full
(pagetext cache, native extraction, 0 empty/unreadable pages) to confirm zero relevance,
not skipped or assumed from the department folder alone.

### Content judgement on the "EOM MCQs -" file — bank, not a sitting paper

Per the orchestrator's addendum, read in full (25 pages, native text) and judged from the
document's own content rather than the filename or manifest category alone. Evidence:

- **Header (p1):** "أسئلة المراجعة النهائية" ("final revision questions") · "Upper Limb" ·
  "**Artist Of Anatomy**" · "120 سؤال شامل ع المنهج الكامل" ("120 comprehensive questions
  covering the whole curriculum") · "DR/ IBRAHIM AMR". No faculty letterhead, no
  institutional seal, no exam code, no date, no declared time limit or total marks.
- **"Artist Of Anatomy" is a private-tutoring brand**, not the faculty's — the same
  masthead appears on the two General-folder "امتحان تجريبي" (mock exam) files, all by the
  same author, same "comprehensive revision" framing.
- **Numbering and key:** continuous 1–120, never restarting by topic, with the key printed
  as a single compact grid on the last page (p25) — consistent with a personally compiled
  revision bank, not a transcribed institutional paper.
- **No cohort, no stream, no sitting-year marker anywhere** — manifest `examSignals` are
  null/null/null (`cohortSignal`, `streamSignal`, `sittingYear` all confirmed null directly
  against `au-y1-sources.json`), and no dated header, no مصريين/وافدين split, no "Time
  allowed" / "Total mark" line appears anywhere in the extracted text.

**Judgement: lecturer's own revision/practice bank, not a faculty-set sitting paper.**
`exam_signal` tier stays **bank**, consistent with every other source in this module. Zero
physiology content either way (confirmed by full read plus keyword sweep), so this
judgement does not change the counts above, but it is recorded because every department
lane of this module reads this same file and needed the same answer.

## Top summary

| Questions triaged | Keyed | Unkeyed | Distinct concepts tested | Hit-live | Hit-pending | New |
|---|---|---|---|---|---|---|
| 40 distinct (41 items; one item in `lec 1&2` is a verbatim repeat) | 40 | 0 | 23 | 2 | 9 | 12 |

Plus 152 items read in the three non-Physiology-owned banks (120 + 16 + 16) and confirmed
to test zero Physiology content — not counted in "questions triaged" above, but fully read,
not assumed.

## Key status — three mechanisms, all recovered by rendering, none by OCR

None of the four Physiology banks carry a printed answer-key section or a separate answers
file. All are screenshot exports (CamScanner-flattened) of a quiz app or an LMS review
screen, and every one carries a **repeat-then-reveal** structure: each question appears
once unmarked, then again with the correct option visually marked. Per
`SHARED-TOOLCHAIN.md`'s "Recovering an answer key" procedure, every mark was confirmed by
rendering the page at 150–220 dpi and reading the colour directly — **no bank's key was
guessed from the unmarked half, and none was OCR'd.**

- **`Day 1 revision physiology MSK`** (13 Q) is a Moodle quiz-review export. A wrong
  selection shows a **red ✗** next to the student's choice plus explicit text: "Your answer
  is incorrect. The correct answer is: …". A right selection shows only the filled radio
  button, no ✗, no extra text — confirmed correct by the *absence* of the incorrect marker
  on 11 of 13 items (spot-checked by rendering every "revealed" page, not inferred). The
  last two items (Q12, Q13) switch to a **red box drawn around the correct option** instead
  of a filled radio — a second convention inside the same file, exactly the kind of
  within-paper mixing `SHARED-TOOLCHAIN.md` warns to expect.
- **`MCQs - أسئلة جواد`** (11 Q) marks the correct option with a **red rectangle box** drawn
  around it on the second (repeated) instance of each question — confirmed on all 11 by
  rendering. Two items (Q7, Q8) present as plain lettered prose `(A)…(E)` rather than the
  app's button UI, and there the correct letter is in **red text** instead of a boxed
  button — a third convention, again inside one file.
- **`lec 1&2 physiology MSK`** (12 items, 11 distinct) and **`lec 3 physiology MSK`** (5 Q)
  are the same quiz-app export style: correct option marked with a **solid green bar** and
  a white check-circle on the repeated half. Confirmed on all 16 rendered pages.

**One item's key is genuinely truncated, not unclear from my rendering.** `lec 3` Q1
("Which of the following is NOT a membrane stabilizer: Procaine / Hypoxia / Alkalosis /
Novocaine") has its green highlight bar beginning right at the bottom edge of the source
page — the option label itself is cropped off in the original screenshot, confirmed at 220
dpi, not a rendering artefact on this end. By position (third option) and physiology
(alkalinity increases excitability, so it is the one **not** a stabilizer), the answer is
almost certainly **Alkalosis**, but the source page itself does not print the label under
the highlight. Recorded as **keyed by inference from position + physiology, source text
truncated** — flag for the next reader in case a cleaner copy of this file turns up.

## Distinct ideas → key-search classification

Search run: `find-existing.mjs`, 5 batches / 40 queries total (log kept in the lane's
scratchpad), covering every idea below at least once and most with 3–4 phrasings (shortest
distinctive word first, then a synonym, then the mechanism). No canonical key is minted yet
— Step 1 is triage only, per §16.

| # | Idea | Status | Evidence |
|---|---|---|---|
| 1 | Resting membrane potential — definition, ionic basis, value | **HIT-LIVE** | `CON-NEU-763D2F7A1571C9` "Diffusion is the principal determinant of resting membrane potential" |
| 2 | Na⁺–K⁺ pump — electrogenic active transport, importance | **HIT-PENDING** | `CON-NEU-1E66BE533E894C` · key `membrane.sodium-potassium-pump.electrogenic` · `103-BMS-mcq-vitamins-nerve-concepts.md` |
| 3 | Nerve AP depolarisation/ascending limb (Na influx, voltage-gated channels) + reversal of polarity/overshoot | **HIT-PENDING** | `CON-NEU-7A30FECF042995` · key `nerve.action-potential.depolarization-ionic-basis` · `103-BMS-physiology-concepts.md`; related `CON-NEU-157E05FAF3B100` (Na-channel gating states) — neither record's text explicitly states the +35 mV overshoot magnitude fact; check at Step 2 before treating this as full coverage |
| 4 | Nerve AP repolarisation (K efflux) + after-hyperpolarisation (delayed K-channel closure) | **HIT-PENDING** | `CON-NEU-DD9033DCA3AAF1` · key `nerve.repolarisation.potassium-efflux` · `103-BMS-mcq-vitamins-nerve-concepts.md` — label explicitly covers both facts |
| 5 | Compound action potential (fibre-group diameter/velocity/duration) | **HIT-PENDING** | `CON-NEU-18D07BA4202CDA` · key `nerve.compound-action-potential.graded` · same file |
| 6 | All-or-none rule (which tissues obey it / exceptions) | **NEW** | no hit: "all or none rule", "all or none" (both tried; genuinely absent, not under-searched) |
| 7 | Local response / local excitatory state | **HIT-PENDING** | `CON-NEU-7E784A50D2BBAF` · key `nerve.local-response.graded-summation` · same file |
| 8 | Strength-duration curve — rheobase, utilisation time, chronaxie | **HIT-LIVE** | `CON-NEU-105A7842809DC1` "Chronaxie is the duration required for a stimulus at twice rheobase to evoke a response" |
| 9 | Factors affecting nerve excitability / membrane stabilisers (Ca²⁺, K⁺, Na⁺, chemical, thermal) | **HIT-PENDING** | `CON-NEU-77596C8A899A7E` · key `nerve.excitability.factors` · same file — label names Na permeability, K⁺ and local anaesthetics explicitly; check at Step 2 whether alkalosis/hypoxia are covered by name |
| 10 | Refractory periods — absolute and relative, channel states | **HIT-PENDING** | `CON-NEU-2235199E9F4373` (absolute) + `CON-NEU-F119674A8DFD8D` (relative) · `103-BMS-physiology-concepts.md` |
| 11 | Conduction in unmyelinated fibres — continuous conduction | **NEW** | no hit: "continuous conduction"; overlaps `CON-NEU-5664D7AB68AD8D` (idea 12) which defines myelinated *vs* unmyelinated by structure, not by conduction mechanism — near-miss, not counted as a hit, flag for Step 2 |
| 12 | Conduction in myelinated fibres — saltatory conduction, nodes of Ranvier | **HIT-PENDING** | `CON-NEU-A0C8307D2825A6` · key `nerve.saltatory-conduction.velocity` + `CON-NEU-5664D7AB68AD8D` · key `nerve.myelination.schwann-cells` · same file |
| 13 | Skeletal muscle fibre types — slow/red/Type I vs fast/pale/Type II | **HIT-PENDING** | `CON-MSK-3E5F54D8D58E9C` · key `muscle.fibre-types.red-slow-pale-fast` · same file. Near-miss, not merged: live `CON-MSK-FF570EA5120D41` / `CON-MSK-C693745576251C` (endurance-training fast/slow-twitch adaptation) test a different objective (training response, not baseline classification) |
| 14 | SA node is the normal cardiac pacemaker (fastest intrinsic discharge) | **NEW** | near-miss, not a hit: live `CON-CVS-C9E53B5A691D19` "Automaticity and rhythmicity of pacemaker cells" states *that* pacemaker cells are automatic, not *why the SAN specifically* outpaces the AVN — different objective, flag for Step 2 |
| 15 | Pacemaker potential instability (mechanism) | **NEW** | no hit: "pacemaker potential"; "funny current" hits only `CON-CVS-A87E8F7EE8DC58` (parasympathetic modulation of funny current) — a different objective, not merged |
| 16 | Intrinsic heart rate (definition) | **NEW** | no hit: "intrinsic heart rate" |
| 17 | Cardiac muscle action potential — plateau mechanism and repolarisation phases | **NEW** | no hit: "cardiac action potential plateau", "plateau phase" |
| 18 | Pacemaker vs cardiac-muscle action potential — key differences | **NEW** | no dedicated hit; overlaps ideas 15/17, not a substitute for either |
| 19 | Cardiac conduction velocity across tissue types (fastest = Purkinje) | **NEW** | "purkinje fiber" and "purkinje" both return only *cerebellar* Purkinje cells (`CON-NEU-*`) — a homonym, not a hit; "atrioventricular node conduction" also empty |
| 20 | Cardiac conductivity comparison (slowest tissue; effect of vagal stimulation) | **NEW** | no hit |
| 21 | Purkinje system function (synchronises ventricular contraction) | **NEW** | same homonym trap as idea 19 |
| 22 | Cardiac contractility (actin–myosin, Ca²⁺-dependence, ATPase, serum K⁺ effect) | **NEW** | near-miss, not a hit: live `CON-CVS-BD9C1C359D7284` "Adenosine inhibits cAMP production and reduces cardiac contractility" tests a modulator's effect, not the base mechanism this bank tests |
| 23 | Frank–Starling law / EDV–force relationship | **NEW** | "frank starling", "starling law heart" and "starling" alone all return only `Starling forces in oedema` (capillary fluid exchange) — a homonym, not a hit |

**Totals: 2 hit-live, 9 hit-pending, 12 new** — matching the top table.

### The scope-defining surprise: half this bank's ideas are not in this module's own books

Ideas 14–23 (10 of 23, all from `MCQs - أسئلة جواد`) are cardiac electrophysiology —
SA-node pacemaking, pacemaker-potential instability, intrinsic heart rate, the cardiac
action potential's plateau, the Purkinje system, cardiac contractility, and the
Frank–Starling relationship. **Neither of this department's two teaching books teaches any
of this.** `Dr_ Gawad book.pdf` (40 pages) and `Dr_ Aliaa book.pdf` (27 pages) are both
titled "Musculo-Skeletal System (Excitable Tissues)" and cover, in full: nerve physiology
(RMP → action potential → excitability → conduction), skeletal-muscle physiology (fibre
types → motor unit → neuromuscular junction → excitation–contraction coupling →
contraction types → fatigue), and smooth-muscle physiology. Cardiac muscle is not
mentioned once in either book, nor in the five Gawad handouts or eight Aliaa lecture
boards — all read in full for this triage (see the department-book chapter note below).

Per the brief's scope rule (§10/§16), the question decides scope: these ten ideas still
need a concept and an article at Step 2, because a question in this department's own bank
tests them — but the department's own book cannot be the source for them. They read as
core CVS-system physiology (the same territory the Kasr CVS module and the manual's own
worked example — Frank–Starling — already stake out), most likely set by the same
lecturer from a general/CVS physiology course rather than from this module's MSK material.
None of the ten resolved to a hit above, which is itself worth flagging upward: this is
foundational cardiac electrophysiology that would be expected to already exist somewhere
in 1,718 live concepts, and it does not (only tangential neighbours were found, all
recorded as near-misses above, not merged).

## Department-book chapter note

Physiology carries **two** Department Books (`Dr_ Aliaa book.pdf`, 27p, and
`Dr_ Gawad book.pdf`, 40p — near-duplicate content, same author's own two write-ups of the
same course) plus **5** Gawad handouts (Lectures 1–5, dated 6–13 March 2023) and **8**
Aliaa lecture-slide "Boards" (1–8, `Boards/Board N ( MSK Aliaa )`), all read in full for
this triage. All three sources agree on one chapter sequence:

1. **Nerve physiology** (RMP, action potential, compound action potential, all-or-none
   rule, local response, excitability factors, refractory periods, continuous vs saltatory
   conduction) — Gawad Lectures 1–3, Aliaa Boards 1–6 (by content, not 1:1 by board number —
   the boards are scanned lecture slides and several are two-page fragments of one topic).
2. **Skeletal-muscle physiology** (fibre types, motor unit, neuromuscular junction/EPP,
   myasthenia gravis, excitation–contraction coupling/sliding filament, contraction types,
   fatigue) — Gawad Lecture 4, Aliaa Boards 7–8 (partial).
3. **Smooth-muscle physiology** (innervation, unitary vs multi-unit, electrical properties,
   contractile mechanism via calmodulin/MLCK) — Gawad Lecture 5 (Handout 5 is a 1-page OCR
   scrap, near-illegible; the book chapter is the readable source).

Every idea this triage's own banks test from chapter 1 and the one idea from chapter 2
(fibre types) is covered by this reading. **Nothing from chapter 3 (smooth muscle) or the
untested parts of chapter 2 (NMJ, EPP, EC-coupling, sliding filament, contraction types,
fatigue) is tested by any bank question** — per the scope rule, none of that is authored at
Step 2 even though the department book teaches it.

## Practicals — noted, not triaged (later lane)

5 distinct Practical-category sources, none read in detail for this triage:
`Dr_ Eslam MSK practical.pdf` (34p), `Dr_ Gawad MSK Practical.pdf` (50p), `MSK Practical
physiology.pdf` (4p, OCR), and two Faculty PPT decks (`1. SMT -Nerve conduction-.pptx`,
`2. Tetanus-EMG.pptx`) — the two `.pptx` files were not extracted at all; `pagetext.py`'s
`--module` bulk mode is PDF-only (`fileType == "pdf"` filter) and reading them needs
`python-pptx`, out of scope for this triage. GUARD=bank gives no practical exam to triage
from at Step 1 regardless. Flagging for the later practical lane per the dispatch's own
note ("your folder has 24 distinct files including 3 practical" — the manifest's own
`Practical` category count for this folder is actually **5**, not 3; see hazard below).

## OWED

- Every `NEW` idea above needs the ≥4-query search re-confirmed at mint time (Step 2) on
  the exact label finally chosen — this triage's searches are the first pass.
- **Ideas 14–23 (the cardiac block) are the main open question for the orchestrator.**
  They are real bank content under the no-paper guard's scope rule, but this department's
  own corpus teaches none of it. Recommend confirming with the orchestrator whether these
  ten concepts should be authored here (sourced from a general/CVS physiology reference,
  since "never invent a fact" forecloses writing them from nothing) or flagged upward as a
  corpus gap for a CVS-system lane to own instead, before Step 2 begins on them.
- Three near-miss pairs flagged for a deliberate decision at Step 2, not resolved here:
  **idea 11** (continuous conduction) vs the myelination concept that already exists;
  **idea 13** (fibre types) vs the live twitch-fibre training concepts; **idea 14** (SAN as
  pacemaker) vs the live automaticity concept.
- **Idea 3**'s pending concept may not name the +35 mV overshoot/reversal-of-polarity fact
  explicitly — worth a direct read of `103-BMS-physiology-concepts.md`'s full record before
  deciding it is full coverage rather than a partial one needing an addition.
- `lec 3` Q1's correct option text is truncated on the source page itself (see Key status
  above) — record the inferred answer (Alkalosis) with a `field_notes` line saying so if
  authored before a cleaner copy of the file surfaces.
- The 2 practical `.pptx` decks were not extracted (tooling is PDF-only); flagged for
  whichever lane picks up practicals next.

## HAZARDS

- **The dispatch's practical count is off.** It states "3 practical" for this folder; the
  manifest's own `Practical`-category count for the 24 preferred Physiology rows is **5**
  (`Dr_ Eslam MSK practical.pdf`, `Dr_ Gawad MSK Practical.pdf`, `MSK Practical
  physiology.pdf`, and two `.pptx` Faculty PPT decks). Recording this so the practical lane
  does not undercount its own inventory.
- **`lec 1&2 physiology MSK` prints one question twice, verbatim, both times keyed the same
  way** ("Repolarization of nerve coincides with" — Out flux of K, confirmed on both the
  page-5/page-17 pair and the page-9/page-21 pair). Not a corruption — both instances are
  intact and agree — but a lane authoring from this file should write one question, not
  two, or the bank's own duplication becomes a duplicate MCQ record.
- **Three different highlight conventions inside one file** (`MCQs - أسئلة جواد`): a red box
  around a button-style option, red text on a plain-prose option, and (in `Day 1 revision`)
  a red box that replaces the usual filled-radio-plus-✗ convention on its last two items.
  Confirming a key by rendering every page, not assuming one convention holds for a whole
  file, is what caught this — consistent with `SHARED-TOOLCHAIN.md`'s warning to expect
  more than one marking convention per source.
- **The "EOM MCQs -" file and both General banks all read cleanly and all contain zero
  Physiology content** — confirmed by full read plus keyword sweep, not assumed from
  department folder alone. Recording this so no later Physiology-adjacent lane re-opens
  these three files looking for physiology questions.
- **Homonym traps in `find-existing.mjs`:** "purkinje" alone returns cerebellar Purkinje
  cells, not cardiac Purkinje fibres; "starling" alone returns capillary Starling forces
  (oedema), not the cardiac Frank–Starling relationship. Both look like hits and are not —
  read the returned label before counting a match.
- Handout 5 (`Dr_ Gawad/Handout/Handout Lec 5 [...Updated].pdf`) OCR'd to a single
  near-illegible page; the book's own smooth-muscle chapter is the usable source for that
  topic, not this handout.

BLOCKED: none.
