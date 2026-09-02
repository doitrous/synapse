# MANS-AEP — first-module triage (Phase-0 sample)

**Scope note, read first:** the AEP Telegram cohort label spans two S1 module codes,
`MANS-PAEHC` and `MANS-PPP` (unresolved split per `LANE-CARD.md` §7 and
`MANS-Y1-priority-sources.md` §AEP). The LANE-CARD does not prescribe a single module id
for AEP, so this lane's questions use the file/module prefix `MANS-AEP`, with the exact
lecture/section name carried in each question's `module_subject` — per the task brief's
own fallback instruction. This is flagged here and in the report; resolving the
PAEHC/PPP split is left to whichever session next tackles that decision.

The tier-1 source is `AEP Full Exams (VIP) .pdf` (`src_68a72cf039eada5508f3`), a 254-page
compiled question bank for the AEP module, 64th cohort. `pagetext.mjs status` shows no
garbled pages across the sampled range (p.1-13, p.100-101, p.250-252) — this source did
**not** need the highlight/OCR fallback path. What follows is a **representative sample**:
the two Anatomy lectures at the front of the book (Lecture 1 "Terms"/"Anatomy
Terminology", p.4-8, and Lecture 2 "Bones"/"Skeletal system", two exam sittings, p.10-13)
read in full. Embryology (confirmed present, e.g. Lecture 5 "2nd Week of Development" at
p.101) and Physiology (confirmed present in the combined "Final Exam 58" sitting at
p.250-252) sections, and the bulk of the remaining ~240 pages, were spot-checked to
confirm the printed-key pattern holds but are **not yet triaged** — flagged, not silently
skipped. The two fallback banks (`MCQ Anatomy AEP CONTINUOUS BOOK.pdf`,
`MCQ embryo AEP CONTINUOUS BOOK.pdf`) were not needed: the tier-1 paper is fully usable.

## Key-recovery method — a printed answer column, not bold/highlight

`pagetext.mjs keys` (the bold/underline heuristic) recovers only a small fraction of this
source's keys — of ~1,600 `keys`-detected question lines across the document, only ~297
(18%) show a `bold-flag`/`underline-flag` single-letter match, with the rest reported as
`?` (0 marked or multiple marked). Reading the same pages with plain `pagetext.mjs show`
reveals why: every question carries its correct-answer letter printed in a **right-margin
column**, vertically aligned somewhere beside the question block rather than bolded or
underlined next to the option text itself (see the worked example below). This is a
**third key-evidence pattern**, distinct from both the "printed key beside the option"
and "highlight/OCR" patterns this lane's brief anticipated, and it means `keys`' own
recovery percentage badly understates this source's actual keyed rate. The rule this
lane already knows — trust the source, not the tool's shortcut — held: plain-text
extraction recovered **100% of the 49 sampled items**, all with unambiguous single-letter
keys.

Worked example (p.5, Lecture 1, Q1-Q10 abbreviated): the text extraction places each
question's key (a single capital letter) on its own line, positioned in the page's right
margin between the two question columns — e.g. Q1's options are followed by a lone `B`
several lines down, Q2's by a `C`, and so on. The letters are unambiguous once located;
no OCR or highlight-detection was needed anywhere in the sampled range.

## Per-source summary

| Source | sourceId | Pages/range read | Questions triaged | Keys recovered | Method |
|---|---|---|--:|--:|---|
| `AEP Full Exams (VIP) .pdf` — Anatomy Lecture (1) "Terms"/"Anatomy Terminology" | `src_68a72cf039eada5508f3` | p.4-8 | 25 | 25 | printed (right-margin answer column) |
| same file — Anatomy Lecture (2) "Bones", sitting A | `src_68a72cf039eada5508f3` | p.10-11 | 11 | 11 | printed |
| same file — Anatomy Lecture (2) "Skeletal system", sitting B | `src_68a72cf039eada5508f3` | p.12-13 | 13 | 13 | printed |
| **Total, raw items triaged** | | | **49** | **49 (100%)** | |

Spot-checks outside the authored range (not counted above, confirming the pattern holds
book-wide): p.100-101 (Embryology, decidua/implantation/placenta questions, printed
right-margin keys) and p.250-252 (a combined "Final Exam 58 دفعة" sitting mixing Anatomy,
Embryology and Physiology, with an end-of-page numbered answer table for one 40-item
block rather than a per-question margin letter — a **fourth** minor key-layout variant,
still fully printed/plain-text, no highlight or OCR needed).

Full per-question detail (stem summary + recovered key + authored/held disposition) is in
[`MANS-AEP-triage-keys.txt`](MANS-AEP-triage-keys.txt).

## TRIAGE APPROVED

49/49 sampled items (100%) are keyed by a printed answer letter against a real stem —
well above the lane's 60% bar. Proceeding to authoring was self-approved per the task
brief's standing instruction.

## Per-concept triage

| # | Concept (collapsed) | Status | Evidence |
|--:|---|---|---|
| 1 | Anatomical (erect) position — palms face forwards | **pending** | `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` `CON-MSK-D193498AB94D21` |
| 2 | Three anatomical planes (median/paramedian, coronal, transverse) | **pending** | same file, `CON-MSK-EE7CDEF8ACA587` |
| 3 | Fourteen terms of position (medial/lateral, proximal/distal, ant/post, sup/inf, superficial/deep) | **pending** | same file, `CON-MSK-A0C1F50FABDC0F` |
| 4 | Axial vs appendicular skeleton | **pending** | same file, `CON-MSK-9A22BB8909AF29` |
| 5 | Long bone regions (epiphysis/diaphysis/metaphysis, endosteum, compact shaft) | **pending** | same file, `CON-MSK-EFD497A9922A4D` |
| 6 | Long bone growth (epiphyseal plate lengthens, periosteum widens) | **pending** | same file, `CON-MSK-C30E73A5353ABB` |
| 7 | Six bone shape classes (long/short/flat/pneumatic/irregular/sesamoid) | **pending** | same file, `CON-MSK-00B4A0D32A6420` — found only on a broadened query ("bone classification shape" under-hit; "bone shapes" style query hit) |
| 8 | Red vs yellow bone marrow (haemopoiesis) | **pending** | same file, `CON-HEM-AEB2E6C6E8A423` |
| 9 | Bone functions (support, lever/movement, mineral storage, blood formation) | **pending** | `docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md` `CON-MSK-88ABD88C19073F` |
| 10 | Flexion/extension | **new** | `find-existing.mjs "flexion extension movement terms"` → no hit. Placement: `CON-MSK-`, subject `msk` |
| 11 | Abduction/adduction (basic definition) | **new** | `find-existing.mjs "abduction adduction limb"` and `"abduction"` → only clinical/finger-axis hits, none defining the basic term. Placement: `CON-MSK-`, subject `msk` |
| 12 | Supination/pronation (basic definition) | **new** | `find-existing.mjs "supination pronation forearm"` and `"supination"` → only muscle-of-origin/clinical hits. Placement: `CON-MSK-`, subject `msk` |
| 13 | Dorsiflexion/plantarflexion (basic definition) | **new** | `find-existing.mjs "dorsiflexion plantarflexion"` and `"dorsiflexion"` → only common-peroneal-palsy clinical hits. Placement: `CON-MSK-`, subject `msk` |
| 14 | Inversion/eversion (basic definition) | **new** | `find-existing.mjs "inversion eversion foot"` and `"eversion"` → only joints-and-muscles / clinical hits, not the plain definition. Placement: `CON-MSK-`, subject `msk` |
| 15 | Ipsilateral/contralateral (basic definition) | **new** | `find-existing.mjs "ipsilateral"` → only worked clinical examples (Brown-Séquard, crossed extensor reflex, sternocleidomastoid action), no plain-definition concept. Placement: `CON-MSK-`, subject `msk` |
| 16 | Compact vs spongy (cancellous) bone distribution within a long bone | **new** | `find-existing.mjs "compact bone shaft spongy epiphysis distribution"` → no hit; `"compact bone"` and `"spongy bone location epiphysis"` → only Haversian-system histology-detail hits, not the plain shaft-vs-end distribution. Placement: `CON-MSK-`, subject `msk` |
| 17 | Lumbar vertebral count (5) | **not minted** | held — a narrow numeric-recall fact with no natural home in the concepts above; left for a future pass rather than minted for one question |
| 18 | Ossification type by bone (membranous vs endochondral, e.g. clavicle) | **not minted** | held — same reasoning as #17; a genuinely distinct fact (intramembranous ossification) but only one held item rests on it this pass |

**Search method note:** two mint candidates (#7 bone shapes, indirectly; and the movement
terms #10-15 directly) confirm this lane's brief warning that a narrow multi-word
`find-existing.mjs` query under-hits — `"bone classification shape"` returned "safe to
create one" on the first pass, but the broader, differently-worded existing concept
(`CON-MSK-00B4A0D32A6420`, "Bones fall into six shape classes") was found only once a
second, broader read of the same concept file (`awk`-listing every `## label`/`## id`
pair) was run instead of relying on `find-existing.mjs` alone. Every movement-term
mint (#10-15) was searched with at least two phrasings (a multi-word query and a bare
noun) before being called new; both consistently surfaced only clinical or muscle-origin
questions that *use* the term, never a concept that *defines* it, which is the same
"basic classification framework absent, disease-specific instances present" pattern the
`MANS-HIS-203` triage found for Gell-Coombs hypersensitivity.

## Checkpoint table (rolls up into the orchestrator's §5 table)

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| MANS-AEP (Phase-0 sample, not exhaustive) | 49 | 49 (100%) | 18 (16 searched and resolved, 2 held unminted) | 0 | 9 | 7 | `msk` — flexion/extension, abduction/adduction, supination/pronation, dorsiflexion/plantarflexion, inversion/eversion, ipsilateral/contralateral, compact-vs-spongy bone distribution |

All 9 reused concepts are `status: under review` / `publication_status: needs_evidence`
records from other universities' lanes (Kasr `101-ISK`, Alexandria `AU-MED-102`) — none
are yet `status: live` in this corpus, so the "live-hit" column above reads 0 and
"pending-hit" 9, using this lane's own terminology (a `live`/published concept would cite
differently). This matches the `MANS-HIS-203` lane's own experience that most reused hits
are pending, not yet-published, concepts.

## Held items (not authored this pass)

11 of the 49 raw items are held, all with keys recovered (nothing here is an unrecoverable
key — every hold is a duplicate-management or scope decision):

- 8 items are near-duplicate or literal-duplicate restatements of a fact already authored
  from the same lecture (e.g. `L1-Q18`/`L1-Q19` are word-for-word repeats of `L1-Q11`/
  `L1-Q08`; `L2A-Q09`/`L2A-Q10` repeat `L2A-Q03`/`L2A-Q02`). Full list with reasons in
  `MANS-AEP-triage-keys.txt`.
- 2 items (`L2B-Q02` lumbar vertebral count, `L2B-Q03` ossification type by bone) have a
  recovered key but no matching live/pending concept found this pass, and were not minted
  a concept each for a single held item — flagged for a future pass rather than lost.
- 8 short-answer "enumerate"/"classify" items (p.7, p.13) are not MCQs and were not
  triaged as questions at all — noted in `MANS-AEP-triage-keys.txt`'s totals line.

## Needs Omar / needs a second pass (not blockers, logged so they aren't lost)

- The `AEP`↔`MANS-PAEHC`/`MANS-PPP` module split (LANE-CARD §7) is still unresolved;
  this cluster's questions are filed under `MANS-AEP` per the task brief's fallback rule.
  Whichever session resolves the split should re-home this module id.
- Embryology (Lecture 5+, p.14-~100+) and Physiology sections of the same source, and the
  ~240 remaining pages of combined "Final Exam" sittings, are confirmed present and
  printed-keyed by spot-check but not yet triaged — next pass for this module.
- The two fallback banks named in the task brief (`MCQ Anatomy AEP CONTINUOUS BOOK.pdf`,
  `MCQ embryo AEP CONTINUOUS BOOK.pdf`) were not opened — the tier-1 paper was fully
  usable, so the fallback was not needed this pass.
- `L2B-Q06` (facial bones = pneumatic bone) carries a doubt: the printed key generalises
  "facial bones" as pneumatic, but strictly only some facial bones (those with paranasal
  air sinuses, e.g. maxilla) are pneumatic — authored as printed per the lane's rule, with
  the doubt recorded in the question's own `author_notes`.
