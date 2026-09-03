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

## Lane 3 (mans-aep-author3) — Anatomy Lectures 4-5, "CNS" / "Nervous System"

**Scope correction, read first:** the task brief assigned pp.23-77 for this cluster. Reading
the entire range (`pagetext.mjs status` confirmed 0 garbled pages p.23-77; `pagetext.mjs show`
read in full) found CNS/Nervous-System content confined to **p.23-29 (7 pages)** — p.30 is a
divider page and p.31 begins a new lecture, "Lecture (6) – GIT", followed by further unrelated
lectures within the assigned range (Lecture (10) "Urinary System" p.52, Lecture (11) "Lymphatic
System" p.57, Lectures (13-14-15) "Scalp & Face" p.68-77). This is logged in
`resource/MANS-AEP-resources.md` for whichever session next tackles this module's GIT/Urinary/
Lymphatic/Scalp&Face lectures.

Three compiled sittings cover the same CNS/Nervous-System territory: `p.23-24` and `p.28-29`
both titled "Lectures (4&5) – CNS", and `p.25` titled "Lectures (4 & 5): Nervous System" — the
same repeated-sitting pattern lanes 1-2 already documented for this source. `p.26-27` is a
fourth, non-MCQ sitting: 18 "enumerate"/"compare" short-answer items, skipped per the lane's
own rule (not counted in the totals below), though several of their printed model answers
(e.g. the tract/bundle definitions, the sympathetic/parasympathetic comparison table) were
used to cross-check and to write concept `definition` fields for facts also tested by MCQs.

Two items carry an unresolved doubt severe enough to hold rather than author with a caveat,
a stricter case than `L2B-Q06`'s precedent because the printed key directly contradicts the
*same source's own* stated definition elsewhere, not merely an imprecise generalisation:
- `B5` ("what is the meaning of a bundle") prints key B ("collection of nerve fibers which
  have the same origin, termination, and function"), but the department's own p.27 enumerate
  answer defines *tract* as exactly that phrase and *bundle* as its opposite ("do not all have
  the same origin, termination or function", option D). Held rather than authored with a wrong
  or contradictory fact; the concept minted for this item's twin question (`C3`, ganglion
  definition, unambiguous key E) still carries the correct tract/bundle facts in its own
  `definition` field, sourced from p.27's own answer rather than from the flawed MCQ.
- `B9` ("direction of an impulse carrying information TO the CNS FROM the PNS") prints key B
  ("an efferent neuron, impulse moving distally"), but a neuron carrying information *to* the
  CNS *from* the PNS is by definition afferent, not efferent — option C ("an afferent neuron,
  impulse moving proximally") is the biologically correct pairing. Held rather than authored.

Search-before-mint ran broad greps for neuroanatomy basics per the brief's specific warning
(`brainstem`, `medulla oblongata`, `ventricle`, `synapse`, `ganglion`, `satellite cell`, etc.)
across every university's `concept/`, `pending-live/` and `import-ready/concept/` directories,
confirming the same "basic classification framework absent, disease-specific/clinical
instances present in bulk" pattern this lane's own Lecture 1-2 triage and `MANS-HIS-203`'s
Gell-Coombs triage both already found: Kasr 101-ISK, Assiut AUN-PMS-102 and Alexandria
AU-MED-105 hold enough basic neuron/neuroglia facts to reuse (7 concepts reused), but the
brainstem's three-part stacking order, the four ventricles, the four major sulci, the
nucleus/ganglion/tract/bundle terminology, the three synapse types, the sympathetic/
parasympathetic functional-effects pairing, the dorsal/ventral root-versus-rami distinction,
the CNS/PNS composition, cerebellar function, and the axillary-block vignette were all absent
and minted new (16 concepts). One near-miss is logged in the new concepts' own `field_notes`:
Kasr 102-INT's "three cranial nerves — III, VII and IX — carry the parasympathetic supply to
the head and neck" record was read in full and rejected as a merge candidate for the
brainstem-level cranial-outflow concept (`CON-NEU-5A28C40CF465E7`) — a materially different
fact (head-and-neck-specific nerve set, omitting X/vagus) from this source's brainstem-level
framing (midbrain/pons/medulla, including X).

**Checkpoint table**

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Reused | New | Held |
|---|--:|--:|--:|--:|--:|--:|
| MANS-AEP Lectures 4-5 "CNS"/"Nervous System" (p.23-29, full range) | 43 raw MCQ items | 43/43 (100%) | 23 (7 reused, 16 new) | 7 | 16 | 15 |

**Held items (15 of 43 raw MCQ items)** — all with keys recovered, no unrecoverable keys:
- 13 near-duplicate or literal-duplicate restatements of a fact already authored from an
  earlier sitting of the same three-sitting cluster (`A6`, `A13`, `B1`, `B3`, `C1`, `C6`, `C7`,
  `C8`, `C9`, `C12`, `C15`, `C18`, `C19` — full list with reasons in `MANS-AEP-triage-keys.txt`).
- 2 items (`B5`, `B9`) held for the printed-key-versus-source-contradiction doubt described
  above.
- 18 short-answer "enumerate"/"compare" items on p.26-27 are not MCQs and were not triaged as
  questions at all — noted in `MANS-AEP-triage-keys.txt`'s totals line, not counted in the 43.

**Simulate/lane-1-rejection check:** lane 2's 13-file simulate reported `rejected=2` on lane 1's
own rows (`ART-101-HIS-HAEMOPOIESIS` "missing", `CON-MSK-88ABD88C19073F` "missing"). A 26-file
simulate run this pass, in apply order (Kasr 101-ISK/103-BMS-anatomy/103-BMS-physiology
concepts+articles, Assiut AUN-PMS-102, Alexandria AU-MED-105/AU-MED-102 concepts+articles,
Ain Shams ASU-AE-embryo2, then this module's own concept/article/resource/pending-live/
question files), returned `rejected=0 errors=0`: both original rejections clear once their
dependency-class files (Kasr 101-ISK for the article, Alexandria AU-MED-102 for the concept)
are included in the chain — a **dependency-class outcome, not a real defect**, per the task
brief's own framing. Three further "missing" ids surfaced on the first attempt at this fuller
chain (`ART-MSK-BONE-FUNCTIONS-PROPERTIES` in Alexandria `AU-MED-102-anatomy-articles.md`,
`CON-MSK-C4AD88B60ADDB8` in Kasr `103-BMS-anatomy-concepts.md`, `CON-OBS-754F3A920D996F` in
Ain Shams `ASU-AE-embryo2-new-concepts.md`) — these are additional, previously-untested
dependency-class gaps in lane 1/2's own `MANS-AEP-vip-2-mcq.md` and
`MANS-AEP-anatomy-terms-osteology-mcq.md` files (not this lane's own rows), and all three
also cleared once their source files were added to the chain.

## Lane 4 (mans-aep-author4) — Anatomy Lecture (6) "GIT" + Lecture (10) "Urinary System"

**Scope correction, read first:** the task brief assigned pp.30-51 for Lecture (6) "GIT",
with a fallback to continue into the Urinary lecture (pp.52-56) if GIT yielded fewer than 40
distinct keyed items. Reading the entire p.30-51 range (`pagetext.mjs status` confirmed 0
garbled pages; `pagetext.mjs show` read in full) found GIT content confined to **p.31-34 (4
pages)** — p.30 is a divider page (Arabic "Lecture (6) ANATOMY" cover) and p.35 begins a new
divider for Lecture (7) "Muscle & Fascia" (p.36-40), followed by Lecture (8) "Respiratory
System" (p.42-45) and Lecture (9) "CVS" (p.47-50) — three lectures unrelated to GIT that fall
inside the originally-estimated page range but are outside this module's assigned scope. This
is the same pattern lane 3 documented for CNS (assigned p.23-77, actual content p.23-29), one
lecture further into the source. GIT's 21 raw MCQ items (2 intro + 15 sitting A + 4 sitting B,
p.31-34) fell well short of the 40-item threshold, so this lane continued into the Urinary
fallback per the task brief's own instruction.

Urinary content (Lecture (10) "Urinary System") was likewise thinner than the assigned p.52-56
range suggested: p.51 is a divider, p.52 states outright "لا يوجد أي أسئلة" (no questions), real
MCQ content is confined to **p.53 (9 items) and p.55 (5 items, mostly duplicates of p.53)**,
p.54 is short-answer/enumerate only, and p.56 begins the Lecture (11) "Lymphatic System"
divider. Urinary's 14 raw MCQ items brought the combined GIT+Urinary total to 35 raw items,
28 of them authored — short of the 45-55 target, but this reflects the source's genuinely thin
coverage of these two lectures, not skipped pages. The full assigned range (GIT p.30-51 plus
the Urinary p.52-56 fallback) has now been read in its entirety; this lane stopped at the end
of p.55 (end of Lecture 10) without opening Lecture (11) "Lymphatic System" (p.57+), left for a
later lane per the task brief's own designation of Lymphatic, Great Vessels of the Neck and
Scalp & Face as "untriaged, for later lanes." Lectures (7-9) "Muscle & Fascia"/"Respiratory
System"/"CVS" (p.35-50) are logged in `resource/MANS-AEP-resources.md` for whichever session
next tackles this module, alongside Lymphatic/Great Vessels/Scalp & Face.

Search-before-mint ran broad searches per the brief's specific warning (`find-existing.mjs` on
~19 short literal terms, plus `grep -ril` root-word searches for `esophagus`, `duodenum`,
`trigone`, `nephron`, `ureter`, `urethra`, `vermiform appendix`, `salivary gland`, `descending
colon`/`colic flexure`/`large intestine`, `pharynx`, `bile duct`, `largest gland`, `stomach`
across every university's `concept/`, `pending-live/` and `import-ready/concept/` directories),
confirming this lane's own prior pattern and lane 3's "basic classification framework absent,
disease-specific/clinical instances present in bulk" finding: Kasr 102-INT, Zagazig
ZU-MED-107-git and Alexandria AU-MED-102/203 hold plenty of Year-2/3 GIT physiology,
biochemistry and clinical-vignette concepts, but none state the plain gross-anatomy facts this
lecture tests (duct terminations, organ locations, segment lengths, classification facts).
Three near-misses were read in full and rejected as merge candidates, logged on their
`rejected_merge_candidate_ids`: Zagazig `CON-GIT-2DABACF50C7E47` (right colic flexure's
relation to the liver's quadrate lobe — a different, surgical-relations fact from the
quadrant-location classification tested here) and 6October `CON-GIT-656A82EE65513B` (the
appendix's exclusion from the small intestine — a different fact from its narrow calibre).
Two apparent "trigone" hits (Kasr 104-CPS-anatomy's cardiac fibrous trigones, Alexandria
AU-MED-203's dural oculomotor trigone) were read and confirmed to be unrelated structures
sharing only the word "trigone", not logged as rejected merge candidates. 12 new concepts
were minted for GIT and 3 for Urinary (all `docs/Mansoura-Source-Imports/concept/MANS-AEP-
concepts-4.md`), each with a matching article in `MANS-AEP-git-uri-articles.md`.

Three Urinary questions reuse concepts from Assiut's unimported `AUN-PMS-102-concepts.md`
(`CON-REN-3995B4987178E0` internal urethral sphincter/intramural urethra, `CON-REN-
50D97BAC2FE0D6` male urethra's four parts, `CON-REN-C5A7E3203D2EA4` ureter/renal-pelvis
continuity), all citing that record's own article `ART-REN-AUN-PMS102-URINARY-SYSTEM-ANATOMY`
on `library_ids`; sparse tag-only overlay rows are in `pending-live/MANS-AEP-uri-reuse-
concepts.md`, gated `--with` `AUN-PMS-102-concepts.md` and `AUN-PMS-102-articles.md`.

**Checkpoint table**

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Reused | New | Held |
|---|--:|--:|--:|--:|--:|--:|
| MANS-AEP Lecture 6 "GIT" (p.31-34, full range) | 21 raw MCQ items | 21/21 (100%) | 12 (all new) | 0 | 12 | 2 |
| MANS-AEP Lecture 10 "Urinary System" (p.53, p.55, full range) | 14 raw MCQ items | 14/14 (100%) | 6 (3 reused, 3 new) | 3 | 3 | 5 |
| **Lane 4 total** | **35** | **35/35 (100%)** | **18** | **3** | **15** | **7** |

**Held items (7 of 35 raw MCQ items)** — all with keys recovered, no unrecoverable keys:
- 2 GIT items (`GB-Q3`, `GB-Q4`) are literal duplicates of an earlier sitting's item within the
  same lecture.
- 5 Urinary items (`U-Q7`, `U2-Q1`, `U2-Q3`, `U2-Q4`, `U2-Q5`) are near- or literal-duplicate
  restatements of an earlier sitting's item. Full list with reasons in
  `MANS-AEP-triage-keys.txt`.
- One GIT item (`GA-Q14`, "proximal part of the small intestine") carries a milder doubt than
  the lane's B5/B9 precedent — the printed key names the jejunum, though the duodenum is in
  fact the small intestine's overall most-proximal segment — but was authored per the lane's
  rule (no other page of this source states duodenum-first explicitly), with the doubt recorded
  on the question's own `author_notes` rather than held.
- 7 GIT and 7 Urinary short-answer "enumerate"/"compare" items (p.33-34 and p.54) are not MCQs
  and were not triaged as questions — noted in `MANS-AEP-triage-keys.txt`'s totals lines, not
  counted in the 35.

**Gate results:** `validate-content-batch.mjs` on both question files (`MANS-AEP-git-mcq.md`
19 items, `MANS-AEP-uri-mcq.md` 9 items) against their concept/article/resource siblings
returned `errors: []` (only expected `needs_evidence` notes on Draft main concepts). The
concept file (`MANS-AEP-concepts-4.md`) validated clean against its article/resource siblings
once an initial `SYS-GI` placement typo was corrected to the canonical `SYS-GIT` node
(discovered by this lane; `SYS-REN` for the Urinary concepts was already correct). The
`pending-live` overlay validated clean (`errors: []`) against `AUN-PMS-102-concepts.md`/
`-articles.md`. `gate.mjs batch` on both question files returned `errors=0`. An 8-file
`gate.mjs simulate`, in apply order (Assiut `AUN-PMS-102-concepts.md`/`-articles.md`, this
lane's own `concepts-4.md`/`git-uri-articles.md`/`resources.md`/`uri-reuse-concepts.md`, then
both question files), returned `created=115 updated=3 rejected=0 errors=0` — the 3 `updated`
rows are the sparse pending-live overlay's tag-only updates to the 3 reused Assiut concepts,
and every question in both files carries a populated `library_ids`.

**A pre-existing, not-lane-4-specific finding, flagged for the next cleanup pass rather than
fixed here:** running `validate-content-batch.mjs` directly against the article file itself
(rather than the question file, this lane's required gate target) surfaces 15 "missing required
sections for TPL-CONCEPT: Definition, Mechanism, Key determinants, Clinical significance"
errors — this lane's articles use lane 1-3's own established freeform `### <heading>` section
style (e.g. lane 3's `### The three parts, bottom to top`) rather than those four canonical
headings. Re-running the identical direct-article validate against lane 3's own already-landed
`MANS-AEP-cns-articles.md` reproduces the same 15-per-batch pattern (24 total errors there, 8
records), confirming this is a systemic gap shared by every article authored under this
convention across all four lanes, not something this lane introduced — `module_subject`'s
mismatched-prefix half of the same error (a "MANS-AEP (Anatomy/Embryology/Physiology)" parent
segment against a bare "MANS-AEP" `module` field) was cheap to fix and has been corrected in
this lane's own file, but the section-heading structural issue was left as-is to keep this
lane's layout consistent with the three lanes that precede it, per the task brief's "copy the
layout exactly" instruction.
