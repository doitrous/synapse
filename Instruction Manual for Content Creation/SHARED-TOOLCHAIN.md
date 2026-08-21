# Shared toolchain

[`CLAIMS.md`](CLAIMS.md) keeps **output files** apart, one row per
`(canonical node, content type)`. It does not keep the **extractor** apart, and that is
where the collisions are actually landing. This file covers the shared surface.

Six module lanes are live at once: `101 ISK`, `102 INT`, `103 BMS`, `104 CPS`, `108 INT`,
each in its own worktree and branch, all writing into one `scripts/kasr/`.

---

## 1. Results are not module-namespaced

Every path below is **tracked**, is rewritten by a module run, and carries no module in
its name. Two lanes running the same step overwrite each other, and the second to merge
wins.

| Path | Why it collides |
|---|---|
| `scripts/kasr/extract/deptbook.json` | one department book per run, fixed path |
| `scripts/kasr/extract/mcq.json`, `mcq-bank.json`, `mcq-report.md` | one question bank per run, fixed path |
| `scripts/kasr/extract/practical.json` | carries a top-level `moduleId` — one module only |
| `scripts/kasr/extract/notes.json`, `retry-silent-pages.json` | per-run extraction state |
| `scripts/kasr/questions.json` | per-run question dump |
| `scripts/kasr/seeds/articles.ts` | one registry every module appends to |

**Rule.** Write results to `scripts/kasr/extract/<module-slug>/` — for example
`scripts/kasr/extract/102-INT/mcq.json`. Leave the existing unprefixed files alone; they
are 101's, and `101-isk` moves them when it lands.

## 2. Do not edit a hardcoded script in place

Every `.py` and `.ts` under `scripts/kasr/` hardcodes `101`/`ISK`. Five lanes editing the
same file five ways is five conflicts.

**Rule.** Give the script a `--module` argument, defaulting to `101 ISK` so nothing that
already works breaks. Change it **once**, in one branch, and post a **Wanted** row in
`CLAIMS.md` so the other lanes rebase onto it instead of each writing their own copy.

`scripts/kasr/extract/pagetext.py` is the worked example and is already correct:

```
python3 scripts/kasr/extract/pagetext.py --module "102 INT" [--tier-max 5]
```

It takes manifest source IDs, decides native-vs-OCR from the manifest's own `textLayer`,
and caches to the gitignored `pagetext/`. **Use it rather than writing a sixth text
extractor.** It currently exists, byte-identical, untracked in two lanes — whoever commits
it first owns it; the rest delete their copy and take that one.

## 3. Output directories are already named — match them

The 101 pass set the shape. A lane that invents a neighbour splits the corpus in two.

- `docs/Kasr-Source-Imports/media-requests/` — **not** `media/`
- `docs/Kasr-Source-Imports/written/` holds written and essay questions; `question/` holds
  everything else. 101 moved its EOY paper from `question/` to `written/`; claim the one
  that matches what you are extracting.

Module-name every file inside them, including the ones 101 left bare:
`102-INT-media-audit.md`, not `media-audit.md`.

## 4. Nobody edits `package.json`

Five lanes each adding an npm script conflicts on every merge. Invoke by path until the
lanes have merged.

## 5. `CLAIMS.md` conflicts on its own anchor

Every lane inserts at the same line — the `| — | — | — | — | — |` placeholder in **Open**.
Three lanes did exactly that today. **Append your rows to the bottom of the table**, and
leave the placeholder row alone until the last lane removes it.

## 6. Rebase on `main` before every push

Other sessions land mid-task. Re-fetch first, every time.

---

## Who owns what — settled 2026-08-21

Agreed with each lane directly. Do not re-take a claimed item; rebase onto it.

| Item | Owner | Note |
|---|---|---|
| `scripts/kasr/extract/pagetext.py` | `102-int` | Authored it; existed byte-identical and untracked in three lanes. 104 and 108 rebase and delete their copies. |
| `--module` retrofit, TypeScript | `102-int` | `seeds/types.ts`, `emit.ts`, `build-batches.ts` |
| `--module` retrofit, Python | `104-cps` | `mcq.py`, `deptbook.py`, `practical.py`, `build_notes.py`, `build_practical.py` |
| `build-coverage.ts` | `103-bms` | Reassigned from 104 — 103 had it retrofitted and tested first. |
| `build-source-index.ts` | `103-bms` | New. Emits all 401 manifest sources; identical bytes per lane, so it cannot conflict. |
| Subject union in `seeds/types.ts` | `102-int` | Widening to the runtime's 20. 103 and 108 file Wanted rows rather than editing. |
| Unprefixed `scripts/kasr/extract/*.json` | `101-isk` | Stay put until 101 moves them to `101-ISK/` as its last commit. Nobody else assumes those paths. |

Both retrofit halves default to `101 ISK`. `mintConceptId` hashes `kau:<module>:<key>`, so
that default reproduces every existing 101 concept ID byte-for-byte and nothing already
authored moves. **Keep that property.**

### Field semantics are decided once

`emit.ts` + `seeds/types.ts` are where a field's meaning is fixed: a paper is a seed file
plus a line in a registry. Five lanes each inventing a field set fails **silently** — five
modules that each mean something slightly different by `exam_relevance` cannot be compared
afterwards. Copy the pattern; do not fork it.

## Cross-module sources

Only **2 of 415** manifest rows are genuinely cross-module. A filename that names several
modules is not evidence — the manifest row decides ownership.

| Source | Rows | Owner |
|---|---|---|
| `src_701b6db49a7c01d79428` — PHYSIOLOGY 102, 103 orientation | `102 INT` **and** `103 BMS` | both — one row each |
| `src_177a341938732f599a47` — XRAY orientation, radiology | `101 ISK` + one with no module | `101-isk` |

The orientation above carries each module's excluded-topic list on a **different page**;
read your own, and emit only your own module's exclusion record. Nothing is minted from
it, so there is no double-mint risk.

These two are **not** cross-module, despite their filenames — each has exactly one row,
`102 INT`, and `102-int` extracts both once:

- `src_07f0a0ff41addf826c7f` — `DPT BOOK MCQ D book bio 102&103 mcq (1).pdf`
- `src_34deb8ce27268cb7e890` — `DPT BOOK 102, 103, 104 physiology question &answer (1).pdf`

Both are `textLayer: none`. Extracting them per-lane would mint the same question two or
three times under different IDs *and* repeat the OCR. **103 and 104 file a Wanted row for
their slice.** Items carry the module they *teach*, not the module that owns the file —
one label, one home.

Twelve further sourceIds have duplicate rows *within* one module (three of them 108's).
Same file reached by two paths, not two files. Extract once.

## What no lane owns

**156 of 415 rows — 2,658 pages — carry no `moduleId` and no lane.** Their
`extractionDisposition` is unset, so the manifest has not decided either.

| Folder | Rows | What |
|---|--:|---|
| `PRACTICAL FIRST YEAR/` | 96 | flagged `crossModulePractical` |
| `2ry Modules/` | 55 | Critical Thinking, Communication Skills (MPC 126), EPE 130 Family Medicine, Medical Terminology |
| `Term 1/` | 5 | `Administrative (student marks)` — personal data, likely excludable |

By category: 54 instructor material, 42 practical, 22 exams, 21 notes, 7 questions,
5 administrative. 51 need OCR.

No lane should absorb these unilaterally — the five module lanes cover the other 259 rows.
Awaiting Omar's call.

---

## Findings every lane needs

Each of these was found by one lane and costs another lane real work to rediscover.

### MCQ option labels go missing — two faults, one remedy

**Native text (101's books): watermark bleed.** A rotated "ViP Academy" watermark lands
glyphs on an option's own line, ahead of its label — `Vi    a- Subclavian vein.` An
anchored `^\s*([a-e])[-.]` skips the line and never errors. Whichever option the watermark
lands on vanishes, so options go missing from *every* position: 277 lack D, 128 C, 90 A,
83 B. There is **no answer-key skew** (A 346, B 337, C 337, D 333 across 1,353 intact
questions). **The text was never lost** — it is in the page cache, and repair needs no
re-render and no re-OCR.

**OCR'd text (104's books): tesseract misreads the glyph.** 66 corrupted labels across 18
files, 6.7% of all option labels — `6`×29, `0`×25, `©`×8, `¢`×3, `@`×1. There is no text
layer to bleed, so this is a different fault with a different cause.

**The remedy is shared because both leave a label present-but-unmatchable at a known
position: resolve the label from its position in the sequence, never from its shape.**
Labels run in order, so a mangled label after `c` is `d`. A shape map (`0`→`d`) files an
option under the **wrong letter**, and the answer key is by letter — wrong-letter is worse
than absent.

`scripts/kasr/extract/repair-options.py` is the one implementation. It advances its cursor
per label whether or not it recognised one, so runs of corruption resolve correctly, and
`--self-test` covers clean, single, double `c`+`d`, first-mangled, triple run, all-mangled
and repeated letters. Four-option questions went 1,874 → 2,259; the usable bank ~1,200 →
1,610. **Add a failing case to that file rather than patching locally.**

### The manifest's `textLayer` is wrong at least once

`src_af30e4191cb4087f8d3f` (`Dpt book general pharma 108-2026.pdf`) is declared `native`
and is not. `pagetext.py`'s fallback — a row claiming `native` whose page 1 returns under
20 characters gets OCR'd anyway — is therefore load-bearing, not defensive. **Log which
sources take the fallback.** Across the lanes that set is a manifest patch list, and the
manifest should be corrected rather than worked around.

### Kasr sources are missing from the corpus source index

`corpus-source-index.json` holds 267 sources from `corpus/01-explicitly-taught/` and
**zero** from `y1/`. So a citation naming a Kasr `src_…` fails as *"not a source the corpus
contains"* — for a file that is real and checksummed. That blocks the whole
`resource → claim → citation → concept` chain, and `atomic_claim_ids` is must-carry-a-value
with no `field_notes` escape. Fixed by `scripts/kasr/build-source-index.ts`.

### `pdftotext` output can look complete while subparts sit below the fold

A case question printed with four lettered subparts under one total can extract as a
single clean-looking prompt. 101 flattened two cases this way and recorded one concept
that was simply wrong — a case asking for the boundaries, contents, floor and roof of the
anatomical snuff box was logged as being about scaphoid fracture. A plausible clinical
inference; not the question. **If a paper has cases, read past the answer rules.** Keeping
`original_wording` and a page number on every item is the only reason it was catchable.

### Check the orientation sheet's arithmetic

101's declares Module 101 at 60 marks and describes 8 SAQ at 6 and 7 marks "total 54";
four sixes and four sevens are 52, and the paper's printed marks total 58. Recorded, not
resolved — which figure is wrong is the department's call. Any lane holding an orientation
sheet should check its arithmetic rather than trusting the declared total.

### Author to the manual's floor, not to 101's shape

`101-ISK-concepts.md` scores `fieldsUsed: 23` against the concepts manual's floor of **50
of 52** — it passes `medical:batch` and would fail `medical:audit`. Five lanes copying it
verbatim would put five modules under the audit bar at once.

Copy the **field semantics** from `emit.ts` + `seeds/types.ts` — a field's meaning fixed
exactly once, so `exam_relevance` means the same thing in every module. Do **not** copy
101's current field coverage. Those are separable and only the first should propagate.

### Pathology and pharmacology: subject and system code are decoupled

`curriculumCatalog.ts` carries **20** subjects, not the manuals' eight. There is no
pathology subject and no `PAT` body-system code — that is deliberate, but the reason is
not "pathology is a per-system topic". Both models exist and the year decides which:

- **Clinical years** — `Cardiovascular pathology`, `Renal pathology` and so on are real
  topics inside each body system.
- **Year 1 introductory pathology** — cell injury, necrosis, apoptosis — belongs to
  **`fnd` (Foundations)**. `fnd` carries `General pathology` (`SYS-FND-T03`) and `General
  pharmacology` (`SYS-FND-T04`) as sibling topics, with real nodes to microtopic depth.
  Filing "the earliest change in reversible cell injury" under `SYS-CVS-T03` would be
  arbitrary — there is no system it affects.

**Subject and body-system code are decoupled, and the live graph proves it.** Of 1,718
concepts, **206 carry `subjectId: 'pharm'` — and their `CON-` codes are `FND` × 85 and
`INF` × 121. `CON-MUL-*` concepts in existence: zero.**

```
CON-FND-3CC86CC26BF549  subjectId='pharm'  SYS-FND-T04-S01  secondary=['DIS-PHA-T01','DIS-PHA']
```

So the code follows where a concept is taught or what a drug acts on, **not** its subject.
`seeds/types.ts` couples them through `SYSTEM[subject]`; that is a default needing an
override, not a mapping to trust. Passing `pharm` through it mints `CON-MUL-…` — a second
namespace for concepts that already exist under `CON-FND-…`, which is the mastery-splitting
failure `mintConceptId` exists to prevent. Mint with `tools/mint-concept-id.mjs <CODE>
<canonical_key>` and set `subject` separately.

**Open:** `pharm › Pharmacokinetics` (`DIS-PHA-T01`) and `fnd › General pharmacology ›
Pharmacokinetics` (`SYS-FND-T04-S01`) both describe ADME — a genuine *one label, one home*
violation in the catalogue. Year 1 places primary on `SYS-FND-T04-*`, secondary on
`DIS-PHA-*`. Whoever runs a clinical-years lane should settle it.

### Filter on university, not just module

`108 II` and `108 III` are `PAT 108 I/II/III` from **MTI University**, sitting elsewhere in
the corpus tree — they are not `kau` modules. Filter on `moduleId` **and**
`universityId == "kau"`.

### Concepts, articles and questions are one authoring set

`validate-content-batch.mjs:260-267` checks article coverage **from the concept's side**:
`library_ids` must be non-empty, every ID must be an existing article, and every
`main_concept` must list that article in its own `articleIds`. An article that merely
mentions the concept is not enough — the concept must link back.

So "concepts now, questions next, articles later" is not a phasing choice; it is a plan for
a batch that cannot validate. A `--with` sibling concept is a **stub with no `articleIds`**
(`:153`), so the check fires unless the article batch is passed with `--with` *and* the
concept carries the link. Both siblings, both directions.

### Every live concept has an empty `moduleIds`

All **1,718** of them, no exceptions. The canonical library does not know which university
module teaches any of its concepts. So the most valuable thing a module lane produces may
not be new concepts at all — it is the **module attachment** on concepts that already
exist: `modules`, `module_subject`, `exam_signal`, `original_wording`, `learner_years`.

A lane landing on a populated zone should be doing **update-plus-mint**, not mint-only.
101's zone was genuinely empty so minting 16 risked nothing; a lane on `SYS-CVS-T01` /
`SYS-RES-T01` meets 210 existing concepts and 19 live articles.

**An update batch validates with `medical:simulate`, not `medical:batch`** — the latter
judges every record as new and fails an update on every field you did not re-type.
Expect `created: 0, updated: N, delta: 0`.

### A `field_notes` line must use the camelCase property name

`modules` → `moduleIds`, `nanotopic` → `nanotopicId`. A note written with the import
column name is **invisible to the audit**, and you get "blank without an explicit reason"
for a field you carefully explained. `conceptPopulated` is 28 fields, `conceptPresent`
another 22 — that is the 50-of-52 floor.

### Verifying an extractor by re-running it destroys what it verifies

The committed extract JSON **cannot be rebuilt from this repository**: the page cache is
gitignored and the source PDFs are not in the repo. `mcq.json` records `pagesRead: 79` on a
79-page file while `ocrPageCap` is 40, so it came from an earlier uncapped pass. A lane
regenerating it in default mode to prove byte-identity found no usable cache entry,
re-extracted, hit the cap, and wrote the 40-page result back over the cache — output came
back 3,204 against a committed 3,590.

**Re-running an extractor to check a committed file replaces it rather than checking it,
and can replace it with less.** Prove parameterisation statically: read the code, show the
default resolves to `101 ISK` and to the pre-existing unprefixed path, and never invoke
default mode. If you must diff, run old and new against the same inputs and diff the two
outputs — never against the committed file.

### Fixing the `pagetext.py` guard: a ratio test alone is wrong

The bug is real — the guard tests `len(page1.strip()) < 20`, which is **length, not
readability**. One source has a text layer of 6,075 non-whitespace characters that are
**all `U+0001`**, 0% alphanumeric; page 1 measures 144 characters and sails through, and it
caches as `native` with zero readable content and no empty pages. Silent, and worse than a
loud failure: any lane reading the shared cache concludes the book is unusable and skips it.

But **an alphanumeric-ratio test alone condemns every exam paper in the corpus.** Exam
papers are mostly dotted answer space (`……………`), so the ratio measures leader dots.
A lane's audit flagged five of its files — including the paper its module is authored from
— all clean once `.…·_-` are stripped. Across two lanes' full caches there were **zero**
control characters and **zero** sources below 35% alphanumeric, so the `U+0001` case is
narrow.

Test for **control characters** as the primary guard; if you also want a ratio, strip
leaders first. And **record per source which mode was chosen and why** — the manifest's
`textLayer` is wrong for 2 of one lane's 11 sources (18%), and an auditable fallback set is
what turns that into a manifest patch list.

### An unfinished batch must not sit in the import root

`content.yml` validates **every** batch under the import root on **every** PR touching
`docs/Kasr-Source-Imports/**` or `scripts/kasr/**` — it does not scope to changed files, and
the loop sets `failed=1` regardless of which file failed. So one lane's broken batch turns
every other lane's PR red.

That scope is deliberate and stays: the alternative is a broken batch merging because
nobody's PR happened to touch it, into a catalogue imported by hand for live students. The
obligation it creates is the other way round — **main must never be red.** A file cut off
mid-run with a header and no items cannot be classified by the kind detector, fails, and
takes every lane down with it. Keep it out of the import root until it has items.

### Search by label text, never by `subjectId`

**A subject-scoped search hides 43% of the library.**

**12 of the 20 runtime subjects have zero live concepts** — `fnd dev haem imm inf obs gyn
androl psy derm mul pop`. And **736 of 1,718 concepts carry `subjectId: 'medical'`**, which
`00-START-HERE.md:170` names as "legacy data, not a subject you may use". Those legacy
records populate exactly the code namespaces Year 1 mints into:

```
CON-HEM-*  122   all 'medical'      CON-DEV-*  111   all 'medical'
CON-IMM-*  133   all 'medical'      CON-MUL-*    0    CON-POP-*  0
```

So a lane searching `haem` or `imm` for an existing blood concept gets **zero** and concludes
the zone is virgin. A label-text search over the same ground returns 15 platelet records, 15
erythrocyte, 4 leukocyte, 2 eosinophil, 19 epithelium.

§4 calls duplicated concepts the most expensive mistake in this repo, "because nothing
detects them at import time and a student ends up with two half-covered versions of one
idea". The search that catches one is **label text across all subjects**.

101's seventeen Year-1 concepts were checked individually against the legacy set and are
clean — its histological *identification* criteria are a different grain from the legacy
*function* records. That is grain luck, not method.

Two consequences for whoever mints next:

- `CON-FND-*` is **not** an empty namespace — 85 records, all `subjectId: 'pharm'`. General
  pathology will share the code with general pharmacology. Correct under decoupling, not obvious.
- A Year-1 `CON-HEM-*` concept will be the **first non-legacy member** of that namespace.
  Whoever mints it is establishing the `haem` convention, not conforming to one. Worth being
  a decision rather than a coincidence.

### The `pharm` fix: refuse, don't default

`seeds/types.ts` no longer maps `pharm` to a body-system code. `SYSTEM` became
`DEFAULT_SYSTEM` (`Partial<Record<KasrSubject, BodySystem>>`) with **`pharm` deliberately
absent**, and `systemFor(subject, override?)` **throws** on `pharm` with no override,
naming the live counts in the message. `Seed.system?: BodySystem` is a per-seed override, so
a cardiac drug mints `CON-CVS-…` while `subject` stays `pharm`.

`check-id-stability.ts` asserts the **refusal**. That is the assertion that matters: a
default merely *changed* to `FND` passes every other check and is still wrong for the 121
`CON-INF-*` anti-infectives.

### Probing readability: count words, not characters

The shipped guard counts **words** — `[^\W\d_]{3,}`, runs of three or more letters — over
three pages (first, middle, last-but-one) taking the best, not page 1 alone. Leader dots
are not letters, so dotted exam papers need no stripping. `…` is category `Po`, so a
*character* ratio scores a dotted page 100% while a word count correctly finds none.

```
all U+0001 x6000      words=0   wordChars=0.0   control=1.0
real prose            words=8   wordChars=1.0   control=0.0
dotted answer lines   words=0   wordChars=1.0   control=0.0
```

Each cache file records `mode`, `modeReason` (pages probed, word count, percentages),
`manifestTextLayer`, `readability`, and **`unreadablePages`** — pages with characters but no
words, kept distinct from `emptyPages`, because conflating "nothing extracted" with
"something did and it isn't language" is how a whole book got skipped. `--reprobe` audits an
existing cache **without re-extracting** and exits non-zero, so a lane can check inherited
cache before trusting it.

The manifest's `textLayer` was correct for all 69 sources in one lane and all 51 in another;
the two known errors are concentrated in a third lane's set, not corpus-wide.

### The `haem` convention — settled, so nobody re-decides it

Set by the 101 lane as the first to mint non-legacy concepts into `CON-HEM-*`:

> **The `CON-` code is a taxonomy-namespace label. The subject is a separate field.**

So `CON-HEM-*` holding both legacy `subjectId: 'medical'` records and new `subjectId:
'haem'` ones is **correct and not a collision**. What would be wrong is **inferring subject
from code** — which is the same error `systemFor` now refuses for `pharm`. Conform to this
rather than re-deciding it.

### What the label search actually catches

Running it across all 1,718 live records for 60 Year-1 concepts found no duplicates — but
it found a **contradiction**, which is the failure mode a subject search can never reach:

- new: `megakaryocyte-and-bone-marrow-identification` — "…the megakaryocyte, the largest
  cell with a single multilobed nucleus"
- live: `CON-HEM-7EBD069E615270` — "Fat cells are the largest cells in bone marrow"

The new concept's *definition* is right (fat cells largest of the **stroma**; megakaryocyte
50–70 µm) but its **label alone reads as contradicting a record already in the graph**.
Resolved with a `conflicts` line naming the record. A subject-scoped search returns nothing
for `haem`; the label search found it in one pass.

**So the search is not only a duplicate check.** Two records that disagree are worse than
two that overlap: a student meets both and neither is marked as contested.

### A label hit is not a merge instruction

The search above finds records worth reading. It does not tell you what to do with one, and
the wrong reflex — merge on a hit — is its own expensive mistake.

§4 is explicit: two subjects meaning different things by the same words get **disambiguated
labels**, not a merge. Three outcomes, and only the first removes a record:

| What you found | What to do |
|---|---|
| Same idea, same grain | Do not mint. Reference the live ID; update it with the module attachment. |
| Same words, different subject or grain | Mint yours with a disambiguated label. Cross-link, and record the live ID in `rejected_merge_candidate_ids` so the next lane does not re-litigate it. |
| Two records that **disagree** | Neither is a duplicate. Add a `conflicts` line naming the record. |

The worked cases:

- `action potential` and `depolariz` return seven hits each, **mostly cardiac**
  (`CON-CVS-*`). A physiology lane merging a nerve action potential into a myocyte one
  makes both worse. Cross-link; do not merge.
- `CON-MSK-*` holds one module's upper limb beside another's lower limb. Same namespace,
  different content, no overlap.
- An *identification* concept and a *function* concept are different grains — but "bone
  cells include osteoblasts, osteocytes…" against "compare osteoblast and osteoclast by
  origin, site, LM and EM" is close enough to need a **human decision**, not a rule.

That last one is the honest limit of this protocol: the search surfaces the candidate
reliably, and the call on grain is a judgement. Make it explicitly and record which way you
went, so the next lane inherits a decision rather than a coincidence.

### The zones that are legacy-populated

Namespaces are populated where their subjects are not, so this is where a label search pays:

```
CON-IMM- 133   CON-HEM- 122   CON-INF- 121   CON-AND- 115
CON-DEV- 111   CON-GYN- 111   CON-OBS-  87   CON-FND-  85   CON-DER-  57
```

A lane authoring biochemistry, histology, physiology or embryology is working over these
whether or not its subject search says so. Three of one module's four subjects author
directly into them, with direct hits rather than near-misses — G6PD and favism already live
as `CON-HEM-A1EF4D20C85878`, bone cells as `CON-MSK-967E873EEEACE0`, sarcomere banding on
contraction as `CON-MSK-70448A9B07D24A`.

### The mint is not stable across history — look an ID up, never re-derive it

`tools/mint-concept-id.mjs` does **not** reproduce a live concept's ID from its canonical
key, and it does not tell you so:

```
$ node "Instruction Manual for Content Creation/tools/mint-concept-id.mjs" FND teaching.pharma.loading.definition
CON-FND-92FC0CBAED15B8
ok — CON-FND- from canonical key "…", checked against 2353 existing IDs.
```

The live record whose `canonicalKey` is exactly that string is **`CON-FND-3CC86CC26BF549`**
("Loading dose"). The tool reports **`ok`** because it checks *ID* collision, not
*canonical-key* collision. It mints a second ID for a concept that already exists and
affirmatively confirms it. There is no warning to miss — there is a green light to trust.

**It reproduces none of them. Measured across the whole graph:**

```
live concepts: 1718 | with a canonicalKey: 1718
mint reproduces the live ID:      0
mint produces a DIFFERENT id:  1718
```

**The reason is not a collision-check gap — the two never agreed.** `mint-concept-id.mjs:55`
hashes `sha256(canonicalKey)` **alone**. `seeds/types.ts:134` hashes
`sha256("kau:<module>:" + key)`. Different inputs, so they cannot agree on any input, and the
live IDs were never minted from the canonical key in the first place.

Say it as **"reproduces none of them"**, never as "sometimes collides". The weaker phrasing
invites an agent to derive-and-verify — a check that fails 100% of the time and prints `ok`
every time.

**For an existing concept, look the ID up in the graph by canonical key or label. Never
compute it.** A lane that assumes the mint is stable across history will silently fork every
concept it touches, and the tool will confirm each fork.

**The fix already exists in the next tool along.** `find-existing.mjs:59` tests
`concept.canonicalKey` alongside label, aliases and definition — the exact check
`mint-concept-id.mjs` lacks. The two tools disagree about what a collision is, **and the one
that mints has the weaker test.** Until that is fixed, run `find-existing.mjs` before
minting rather than trusting the mint's `ok`.

This lands hardest on the update-plus-mint workflow every lane has now adopted: an update
row carrying a re-derived ID does not update anything — it creates a rival.

Note this does **not** invalidate the `--module` retrofit's byte-identity checks. Hash
stability *within* the current implementation is real and was verified. What is not stable
is the relationship between a canonical key and an ID **minted at a different time**.

### Reproducing `content.yml` locally: use bash, not zsh

The workflow's loop is `npm run -s medical:batch -- "$file" $siblings`. This shell is
**zsh**, which does not word-split unquoted expansions, so `$siblings` arrives as a single
argument and every `--with` after the first is lost. The result is phantom
`is not a concept that exists` errors on a batch that is fine — two lanes each lost time
concluding a batch was broken when it wasn't. Run it under `bash -c`, or from a script.

### Manifest defects found so far

The manifest is generated, so a defect in it is systematic rather than a one-off. Three
families, all from one lane's eleven sources, which suggests nobody else has looked:

| Field | Defect |
|---|---|
| `textLayer` | `src_af30e4191cb4087f8d3f` and `src_a2ffe25e8362fe840ceb` claim `native`; neither has usable text. 2 of 11. Not corpus-wide — two other lanes' 69 and 51 sources were correct throughout. |
| `subject` | All four `108 INT` EOY files carry a blanket `subject: "Pathology"`, but every one runs Pathology **and** Pharmacology, 35/40 on the distinct-question split. **Filtering sources by `subject` silently drops half a module.** |
| `sourceCategory` | `src_9aecfa4812d20259fe5a` is categorised `Written Questions` but appears to be a revision handout, not a question set. |

`--reprobe` turns the `textLayer` family into an auditable list for free. The `subject`
family has no such check — treat that field as unreliable and route work by `moduleId`.

### Two highlight mechanisms, and one of them reads as "no answers"

- **Real `/Annot` `/Highlight` objects** — exact and cheap, read the quad geometry, no
  rasterising. 31 recovered from one handout this way.
- **Drawn or flattened overlays** — invisible to `qpdf`'s subtype listing; need rasterising
  and colour detection.

One lane's solved and unsolved 2025 papers are **byte-identical under `pdftotext` across all
15 pages**, yet the solved one has every correct option highlighted in pink. **Any lane whose
past-paper extraction reports zero answers should check the render before believing it.**

### Two different mints — do not confuse them

The warning above is about **`tools/mint-concept-id.mjs`** and about **records already in the
live graph**. It does **not** apply to concepts this pipeline generates.

`scripts/kasr/seeds/types.ts:mintConceptId` is `sha256("kau:<module>:" + canonical_key)`,
first 14 hex, behind `CON-<SYS>-`. It is a **pure function of the canonical key**, so two
sessions minting a concept for the same material produce the **same ID by construction**.
Measured across the 101 concept batches on `main`: **0 keys with more than one ID, 0 IDs
shared by more than one key.**

Two keys deliberately appear in two batch files — `platelet-hyalomere-structure-function`
and `elbow-joint-type-bones-ligaments`. Same key, same ID, so importing the second is an
**update** to the first rather than a duplicate. That is the designed reuse path.

| | applies to | risk |
|---|---|---|
| `tools/mint-concept-id.mjs` | a record already in the live graph | mints a rival and prints `ok` |
| `seeds/types.ts:mintConceptId` | concepts this pipeline generates | none — deterministic on the key |

One narrow exception: the hash ignores `subject`, which only selects the `CON-<SYS>-`
prefix. So the *same key under two different subjects* yields the same hash behind two
prefixes. Two lanes that disagree about a concept's subject still diverge — **agree the
subject, and the key takes care of itself.**

### Generated files are the wrong thing to conflict over

When two lanes conflict on a generated batch, **discard both sides and regenerate from the
union of the seeds.** The seeds are the source; the batch is output. Resolving the batch
by hand picks a winner and loses the other side's work.

Done once already on the 101 MCQ batches: the regenerated result validated at 0 errors, and
four concepts came back carrying occurrences from **more than one sitting** — which is the
occurrence dedup working, and is only visible *because* both lanes' seeds were present.
Hand-resolving would have hidden it.

Corollary: **never hand-edit a generated batch.** The edit is lost on the next build, and
silently.

### Taking the retrofitted emitter: the whole import set, or it will not resolve

Six files, as one change — `emit.ts` will not compile against the old `types.ts`:

```
scripts/kasr/seeds/types.ts        scripts/kasr/seeds/from-json.ts
scripts/kasr/emit.ts               scripts/kasr/seeds/articles.ts
scripts/kasr/build-batches.ts      scripts/kasr/seeds/101-eoy-2025.ts
```

Verify with `node --experimental-strip-types scripts/kasr/check-id-stability.ts` — two lines,
exit 0. It asserts 101's concept and question IDs mint unchanged and that `pharm` refuses
without an explicit code, and it passes from another lane's worktree, so the byte-identity
property survives the move.

**Always pass your module: `build-batches.ts "104 CPS"`.** A bare run rebuilds every
registered module, and the retrofitted `conceptBlock` emits **54 columns** where the
committed 101 batches have 23. That is an improvement — 23 cannot pass `medical:audit` and
54 clears the 50-of-52 floor — but it is 101's file and 101's decision when to take it.

**Known bug: a scoped build still fails outside the owning worktree.** `PAPERS` is a
module-level array whose entries call `paperFromJson(...)` **eagerly**, so every registered
paper loads at import time — before `process.argv[2]` is read, and long before the `only`
filter:

```
$ node --experimental-strip-types scripts/kasr/build-batches.ts "104 CPS"
Error: ENOENT: … 'scripts/kasr/extract/102-INT/eoy-2025-199.json'
```

The single eager registry is what makes a bare build dangerous *and* a scoped build
impossible. The fix is lazy registration — hold `{module, path}` records and call
`paperFromJson` only on entries surviving the filter. Tolerating a missing file is weaker: a
paper missing from **your own** module should still be loud.

### 101 ISK is split between two sessions

Agreed by both, 2026-08-21. Each writes its **own** `CLAIMS.md` row — one agent, one row.

| Holder | Scope |
|---|---|
| `101-isk` (`claude/synapse-content-extraction-plan-1ae3e0`) | sat papers, their concepts, articles, practical |
| `101-isk-mcq` (`claude/sad-solomon-4bb999`) | `scripts/kasr/seeds/mcq/**`, `question/101-ISK-mcq.md`, `concept/101-ISK-mcq-concepts.md` |

`101-isk` holds exactly one MCQ leaf — **`granular-leukocytes`** — and will add no more.
Every other leaf is `101-isk-mcq`'s. 37 leaves and ~2,600 questions remain.

**Subject per leaf**, since the hash ignores `subject` and only the prefix would diverge:

> `haem` for anything under *Histology > Blood*; `fnd` for the rest of Histology; `dev` for
> General Embryology; `msk` for Basis of Anatomy and Upper Limb.

That is what the paper concepts already use, so it keeps one subject per objective across
both halves.

**Neither side hand-edits a generated batch.** Both MCQ outputs are built from the seeds.

### An article is part of a leaf, not a later phase

A question batch validates only if every `main_concept` is covered by an article the concept
itself links back to. One MCQ batch is red on **59 errors** — 14 of the form `library_ids
ART-… is not an article that exists`, the rest `main concept … is not covered by any article
in library_ids`. That is the check working.

**A leaf is not done until its article exists** — a question a student gets wrong with
nowhere to read is a dead end.

### Two article defects every lane will hit

- **`## media` written as `[clear]`** is reported as *"media block with no URL and would be
  dropped"*. For that one field the manual wants **present-but-empty plus a `field_notes`
  reason** — the single place `[clear]` is the wrong value.
- **An annotation's `Quote:` must match the body character for character.** One failed on
  *fiber* against *fibre*. A single letter, and the error message does not name the cause.

### A canonical key can move — check before you reference one

Three keys moved in a merge, and anything referencing the old ones dangles:

```
deep-palmar-arch-site-formation-branches        → palmar-arterial-arches-site-formation-branches
anatomical-snuff-box-boundaries-contents-floor-roof → anatomical-snuff-box-site-boundaries-contents
lysosome-types-electron-microscopy              → lysosome-types-secondary-fates
```

They now match `clusters.json`, which is the canonical dedup source for the remaining papers.
The lysosome concept also **broadened** — it carries the three secondary subtypes, because
five papers and the department's own model answer ask for them where an EM-only reading
omitted them. So an MCQ about heterolysosomes or multivesicular bodies belongs to **that**
concept rather than a new one.
