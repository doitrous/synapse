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

A question batch validates only if every `main_concept` is covered by an article in the
question's `library_ids`.

**Author the link on the ARTICLE, not on the concept.** I had this backwards and told four
lanes to edit the wrong record. An article's **`related_concepts`** is what puts its ID onto
the concept (`validate-content-batch.mjs:120-131`); the check at `:280` then reads
`concept.articleIds`, which was *derived* from that. A sibling concept folded in with `--with`
starts at `articleIds: []` (`:110`) and is filled from the article side. So both halves are
true — the check reads the concept, the link is written on the article.

**And you must write both.** `articleIds` is on the audit's `conceptPopulated` list
(`audit-medical-content-fields.mjs:46`), so the concept has to carry it in its own right as
well. The article's `related_concepts` satisfies the **validator's coverage check**; the
concept's own `articleIds` satisfies the **audit**. §7's "every back-link exists in both
directions, and you write both" is load-bearing rather than tidy — write only the concept side
and coverage fails; write only the article side and the audit does. One MCQ batch is red on **59 errors** — 14 of the form `library_ids
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

### Three format bugs in shared code — ALL THREE NOW LANDED

All three are the same bug in different files: a format-aware check that only ever learned
about one family of formats.

**`questionFormat.ts:232` — `PART_HEADING` matched integer marks only. Landed.** A paper
printing `{0.5 Mark}` or `{1.5 Marks}` did not fail to *score* the part — **the whole heading
failed to match and the part vanished**, and the question came back "no written_parts" with
nothing saying a mark scheme had been dropped on the floor. Now `(\d+(?:\.\d+)?)`. Found
independently by two lanes, which suggests more of it in the corpus than either saw.

**`bulkImport.ts` — `matching` missing from the `correct_answer` exemption. LANDED.**
(Historic. `:795-802` is now a **comment describing the past failure**, and `:854` branches on
`format === 'matching'`.) A matching batch is refused with "Correct answer is required" for a column matching
questions do not have. `main` still reads:

```js
.filter((field) => !((written || format === 'mcq_multi' || format === 'labeling'
  || format === 'completion') && field.key === 'correct_answer'))
```

**Do not confuse this with `:806`**, four lines below, which is the A–F **range** check and has
used `isChoiceFormat` for a while. Both mention `isChoiceFormat`, both sit in the same
function, and grepping for it finds the wrong one — the bug is in the `.filter()`, not the
range check. The fix expresses the exemption as *what needs the column* —
`isChoiceFormat(format) && format !== 'mcq_multi'` — rather than a list, so it cannot go
stale when a thirteenth format arrives.

**`validate-content-batch.mjs` — matching/completion/labeling falling through to the
lettered-options branch. LANDED.** (`:238-246` is the comment recording it; the contracts are
checked by `matchingErrors`/`completionErrors`/`labelingErrors` through `validateImportRow`.) They come back "0 options — the contract is 4
to 5" and "correct answer A is not one of the filled options", for questions that are
entirely well formed. **Before this is fixed a matching question cannot be validated at
all.** The fix branches three ways — written → parts, choice → options, everything else →
neither — since `matchingErrors` / `completionErrors` / `labelingErrors` already check those
contracts through `validateImportRow`.

`questionFormat.ts`'s own header notes one EPE paper is **twenty matching items out of
thirty-two**, so any lane holding EPE material hits all three.

### `build-batches.ts` now refuses a bare run

```
$ node --experimental-strip-types scripts/kasr/build-batches.ts
Error: name the module to build — one of "101 ISK", "102 INT". There is no
build-everything mode: five lanes share this script, and a bare run rewrote
every module's batches including ones another lane had already finished.
```

`PAPERS` is `{ module, load: () => Paper }[]` and the module filter runs **before** anything
loads, so a scoped build no longer dies on a neighbour's missing JSON. Registration also
**throws if a paper's registered module disagrees with its `source.module`** — closing a
failure mode lazy filtering introduces that the eager version could not have: a mis-registered
paper skipped by the module that owns it and built by one that does not, silently.

### Manifest `textLayer` patch list

Sources declared `native` that carry no usable text. All caught by the extractor's fallback
except where noted — this is the list the manifest should be corrected against:

| sourceId | file | pages |
|---|---|--:|
| `src_af30e4191cb4087f8d3f` | `Dpt book general pharma 108-2026.pdf` | 34 |
| `src_a2ffe25e8362fe840ceb` | `DPT BOOK Pathology Practical [INT-108].pdf` | 12 |
| `src_f484fc791ec45d8dc7c5` | `PHYSIO MCQ ELSHERIF … Dr. Elsherif` | 73 |
| `src_b20e110f83747d655396` | `VASC important_compressed (1).pdf` | 26 |

`src_a2ffe25e8362fe840ceb` is the one the fallback **missed** — 6,075 glyphs all `U+0001`,
which is why the guard needed the control-character test rather than a length check.

### A ledger must name its units

`build-coverage.ts:249-255` prints `ocr.length` — a count of **files** — into a sentence
promising **pages**: *"1554 pages, 33 of them by OCR"*, where the truth was **750 pages
across 32 files**. A reader takes 33/1554 as "OCR was negligible here" when OCR was **half
that corpus**, which inverts the reliability judgement they should make about every figure
below it. A wrong unit in a summary line is worse than a missing one.

### Proving a validator fix: use a probe batch, not a grep

The `bulkImport.ts` error above was mine — I grepped for a phrase, found it four lines from
the bug, and reported the fix as landed when it was not. **Check the file, not the symptom**,
and prove a format fix end to end with a minimal batch built to earn exactly two known
errors:

```
main_concept CON-FND-0000000000000 is not a concept that exists
library_ids ART-FND-PROBE is not an article that exists
```

Deliberately fake IDs, so anything *else* the validator says is the bug under test. Before the
fixes the same file also returned "Correct answer is required", "0 options — the contract is 4
to 5" and "correct answer A is not one of the filled options". A matching question could not
be validated at all.

### A diagram question must not be rewritten into prose

§6 says never invent a URL and never describe an image as though it were there. There is a
third move to refuse, and it is the tempting one: **rewriting the question so the missing
figure stops mattering.**

"Name the enzyme that converts arachidonic acid to PGH2" is answerable without the diagram —
and it hands the student the pathway position the original made them read off the figure. The
question is no longer the question. **Leave it unchanged and let it wait for the asset.**

How much of a numbered diagram is recoverable differs per figure, and the request should say
which. One paper's Diagram (2) has its numbering fully determined by its own sub-questions;
Diagram (3)'s third blank is fixed by its mark value, but blanks 1 and 2 carry identical
sub-questions and **cannot** be told apart from the text — so that ordering is recorded as
unverified rather than asserted.

### A concept must not point at a claim the evidence pass could not support

Compute `articleIds` / `resourceIds` / `atomicClaimIds` from a per-chapter plan, not by hand
in the seed — a seed should say what the paper asked and nothing about who teaches it.

Carry an `unsupportedClaims` list alongside: **a claim with no verbatim span found is never
written, and the concept must not reference it.** Otherwise the audit fails with `references
unknown claim` — and worse, the concept would *look* supported. Not hypothetical: some
concepts come off exam questions the department book never states.

### `--with` siblings vanish when the shell does not word-split

**Not an npm bug — I recorded that and it was wrong.** Two lanes failed to reproduce it and
a direct probe passes all five arguments through `npm run -s … --` unchanged. There is one
mechanism, and it is in the script:

```js
// validate-content-batch.mjs:40-43
const alongside = process.argv.slice(3).reduce((files, arg, index, argv) => {
  if (arg === '--with' && argv[index + 1]) files.push(argv[index + 1])
  return files
}, [])
```

If a shell hands `" --with a.md --with b.md"` across as **one** argument, `arg === '--with'`
is false for it and **every sibling is dropped with no warning and no unknown-argument
error**:

```
argc=5  siblings found: 2   ["a.md","b.md"]
argc=2  siblings found: 0   []          <- one joined string, silent
```

So it fires wherever the shell does not word-split an unquoted expansion — **zsh** — and not
otherwise. That is why one lane measured 156-against-67 and two others measured 40-against-40
and 0-against-0.

**Do not detect it by comparing error counts.** A count that matches another count proves
nothing about either. **Check positively:** grep the output for `is not a concept that exists`
and expect **0** — a direct observation that the sibling batch was folded in.

**The real fix belongs in the script, not in how people call it.** An argument the parser does
not recognise should be an **error**, not a silent no-op — today, `--with` taking a value that
is never used is indistinguishable from not passing it. Two lines, and it retires the class
rather than documenting around it. Note `.github/workflows/content.yml` builds exactly such a
variable and passes it unquoted: safe because CI runs bash, but one shell away from silently
validating nothing.

### The subject rule is enforced, not just agreed

`subjectForPath` in `seeds/types.ts` maps a curriculum path to its subject, and
`build-batches.ts` refuses a concept whose subject disagrees with where it sits. It returns
**null outside the four branches rather than defaulting** — a path the rule does not cover is
a question for a person, not a value to guess.

Every seed already in the tree passed unchanged, from both 101 lanes, so the rule **describes
what was already being done** rather than imposing something new. Negative-tested by filing
`bone-marrow-red-and-yellow` under `fnd`: the build stops and names the key, both subjects and
the file.

That is the pattern worth copying — an agreement that cannot be forgotten beats one written
down, and a rule that already matches practice costs nothing to adopt.

### `repair-options.py`'s watermark stripping does not travel — it deletes real content

**Two halves, and only one is portable.** Label resolution by sequence position is format
logic and is sound everywhere. **Watermark stripping is specific to one publisher and is
destructive when misapplied.** `repair-options.py:45`:

```python
WATERMARK = re.compile(r"(?<![A-Za-z])(?:ViP|VIP|Vi|Ac|AC|ad|AD|em|[Py])(?![A-Za-z])")
```

Correct for the 101 question books. Reproduced against a cardiopulmonary corpus:

```
"It is initiated by the P wave of the ECG"  ->  "It is initiated by the  wave of the ECG"
"d- The normal P50 for human is 27 mmHg"    ->  "d- The normal 50 for human is 27 mmHg"
"The y descent follows the v wave"          ->  "The  descent follows the v wave"
"a- P-wave."                                ->  "a- -wave."
```

**Every result still parses and still reads as English.** No error, no warning, and the
damage is indistinguishable from a source that never said it — so it defeats review as well
as tooling. One lane measured its 46 sources: **0 real watermark tokens, 146 fragment
matches** — `P`×89, `y`×41, `ad`×13, `em`×2, `Ac`×1, every one a false positive. `P` is the P
wave, P50 and PaO2; `y` is the y descent and the y axis.

**The fix: a watermark is a property of a publisher, not of a format.** Put it in a
per-module table with **`None` as a real value** meaning *this corpus has no watermark, pass
the line through untouched*. One implementation; the dangerous half opt-in per corpus.

**Before running it on a new corpus**, check whether `P`, `y`, `ad`, `em`, `Ac` or `Vi` occur
as standalone tokens in your subject matter, and whether a rendered page actually shows a
watermark. Assume `None` until you have seen one.

### Answer keys that exist only as highlights

A solved paper can be **byte-identical to its unsolved twin** under `pdftotext` while carrying
every correct option as a pink highlight. An OCR pass banks all of them as unanswered. Two
mechanisms, needing different handling:

- **Real `/Annot` `/Highlight` objects** — exact and cheap: read the quad geometry, no
  rasterising. 31 recovered from one handout this way.
- **Drawn or flattened overlays** — invisible to `qpdf`'s subtype listing; rasterise and
  intersect highlight rectangles with text bounding boxes. One lane got **48 of 48, zero false
  positives on two unsolved control copies, and 11/11 against hand-read ground truth**. The
  end-of-module papers are this kind.

**If a past-paper extraction reports "no answers marked", check the render before believing
it.**

### A year sourced from the filename is not the examiner's date

Three manifest years were wrong, found by rendering the covers of files with no text layer:

| File | Manifest | The document |
|---|---|---|
| `EOM ISK 101 - 2023.pdf` | 2023 | **10/12/2022** |
| `EOM first 2021 101 INT end of module.pdf` | 2021 | **24/12/2020** |
| `EOM ISK 101 195 Answers.pdf` | flagged solved | **carries no answers** — it is the unsolved copy |

Anything whose `examSittingYearSource` is *"the calendar label on the file"* is a **filename**,
not a date the examiner wrote.

**Four instances now, and in every one the filename was wrong and the document said so** — the
fourth being a pharmacology department book whose OCR carries `2025 للعام الجامعي` on physical
page 34 against a manifest `2026` taken from its name. So the rule is not "check years". It is:

> **A year sourced from a filename has not been read.** Treat any row whose
> `examSittingYearSource` names the file rather than the page as **unverified** until someone
> opens it. **A wrong year is not cosmetic — the blueprint weights
recency.** Corrections carry a `correction` field saying what was read and where, and the
manifest note warns that regenerating years from filenames silently undoes them.

### The limit of taking a file by path

The cross-worktree read works for a file **one** lane owns. It does **not** when two lanes
have both edited it: a byte-identical copy regresses whichever change came later. One lane
could not take another's validator wholesale — doing so would have reverted its own
`foldInSiblings` fix — so it **ported the two hunks verbatim, comments included**. Behaviour
identical, file not.

**Diff before copying.** If both lanes have touched it, port the change, not the file.

### A subagent's edit to a shared file is a silent revert waiting to happen

**When a subagent reports editing a shared script, diff that file against `origin/main`
before accepting the change.** Do not read the agent's account of what it did.

A subagent's `Write` is a **whole-file write against whatever it last read**. In a checkout
that moves under it, that silently reverts everything landed in between. One lane's agent
fixed the evidence branch from a pre-merge copy and, in the same write, undid **main's
format fix** — the `isChoiceFormat` change that stops `matching`/`completion`/`labeling`
falling through to the lettered-option check. It was caught only by diffing. The commit would
have fixed one thing and quietly broken another, and that lane's own biochemistry section
ends in a matching question.

Nothing about the agent's report would have revealed it. The account was accurate about what
it *changed*; it said nothing about what it *overwrote*.

### `--with` did not reach the evidence branch either

It was wired into the question branch only. The evidence branch resolved references by reading
its own directory — which finds the **claim** a citation names (both live in `evidence/`) and
**cannot** find the **concept** a claim names, because concepts are one directory over.

So a claim batch authored alongside its concepts — exactly what the import order
`resource → article → concept → claim → citation` requires — failed with `Concept CON-… does
not exist` for concepts sitting correctly in the same batch. The only green route was to
import the concepts first, which is the thing being validated.

Fixed: the evidence branch folds in `--with` on the same terms as the question branch, same
parser and same kind detector, so a file that is not what it claims still contributes nothing.
**29 errors without the flag, zero with it** — and nothing is suppressed, because the
un-flagged run still reports all 29.

```bash
git checkout claude/content-creation-task-103-315a10 -- scripts/validate-content-batch.mjs
```

### `fieldsUsed` has a per-format ceiling — do not pad to reach a floor

A written batch came in at **41 with zero errors**, and 41 is the **ceiling** for that format,
not a shortfall: **20 of the question schema's columns are format-exclusive to choice
questions.** Reaching 46 would have meant emitting empty `answer_a` blocks — declaring that a
written question has lettered options.

**The manual's 46-of-50 floor is stated for the single-best-answer contract and should say
so.** A metric that can only be reached by asserting something false is the wrong gate for
that format. Report the ceiling and why, rather than padding to the number.

**The ceiling measured exactly:** the question schema has **61** columns, of which **16 are
choice-only** (`answer_a…f`, `explanation_a…f`, `correct_answer`, `correct_answers`,
`attached_image`, `randomise_answers`) and **4 belong to other non-written formats**. So **41
is the ceiling for a written batch**, and a written batch at 41 is a perfect score.

**But do not read your own number as finished until you have measured the ceiling.** The lane
that measured it found itself at **31**, ten short — and most of those were fillable:
`concept_ids`, `contextual_concept_ids`, `cognitive_effort_score`, `inferred_difficulty`,
`exam_weight_by_year`, and `media_recommendations` on its diagram questions. It reached 37;
the remaining four genuinely do not apply. **"41 is the ceiling" and "check what you left
fillable" are both true.**

Note on `media_recommendations`: requests attach to articles, questions and practicals, and
**importing is the only way one comes into existence**. A separate hand-apply file is a
convenience for an already-imported question, not the mechanism.

### Three ways an answer key hides, and the two-second test for which

**Test first, then pick a technique.** Compare extracted character counts between a
solved/unsolved pair:

```
EOY 104 FINALS (answered)   94620 vs 60598   x1.56   answers in text
EOY Final 104, 199 solved   11507 vs  2538   x4.53   answers in text
EOM 196 104 - 2023          28218 vs 26991   x1.05   ** SUSPECT **
```

**A ratio near 1.0 between a copy called "answered" and one called "no answers" means the
answers are not in the text layer.** Two seconds, works on any pair, and it would have caught
the highlight case too.

**Run it per page, not per file.** A whole-file ratio hides the answer:

```
pages 1-4, 7     ratio 1.7-1.9    answers in the text layer
pages 5, 6, 8    ratio 1.02-1.06  NOT in the text layer
pages 9-19, 21   ratio 1.00       NOT in the text layer
whole file       ratio 1.118      looks "mostly solved"
```

**Fourteen of twenty-one pages of a paper labelled "[Solved]" carry no answers in their text
layer at all**, while four clean pages carry the entire difference. A file-level check passes
it. Per page tells you exactly which pages need the render.

**It does not apply to a paper with no text layer at all.** The 101 EOM set yields **0
characters** from `pdftotext`, so the ratio is `0/0`, not `1.0` — the test is undefined rather
than negative. Worse for the recovery step: `pdftotext -bbox-layout` yields **no word boxes
either**, so option boxes must come from OCR *before* any highlight-to-option intersection can
run. Check that the denominator exists before reading the ratio.

| Variant | Found by | Not found by |
|---|---|---|
| Answers in the text | extraction | — |
| Pink highlight over the option | rasterise, intersect highlight rects with text bboxes — 48/48, 0 false positives | `pdftotext` |
| **Handwritten grey biro, X through wrong options** | **reading the render** | text extraction **and** a colour check — 177 coloured pixels on a page, 0.02% |

**A fourth case sits above all three: the key as PDF annotation objects over a clean scan.**
Exact vector data, not pixels. `pdfimages` shows the base scan has no colour at all, and
`gs -dShowAnnots=false` makes every mark vanish.

**A grep keyed on `/Subtype /Highlight` misses these** — iPad ink lands as **`/Stamp`** and
Preview's rectangle tool as **`/Square`**. The 2021 and 2022 solved EOM copies are one of each.

The clean read is to **render annots-on and annots-off and diff**: no colour thresholding, and
the unsolved-control test passes by construction. Prefer it whenever annotations are present —
it is exact where the raster route is statistical.

Hand-circles need a different shape rule from filled highlights: a hollow annulus may group as
two thin regions, or none.

### A second watermark publisher, which is the argument for the table

One corpus carries `DOCTOR HOUSE`, reaching the text as 8 `DOCTOR` and 7 `HOUSE` tokens —
neither in the other publisher's fragment list. So the 101 stripper **removes exactly the
tokens that corpus needs (`P`, `y`) and keeps exactly the ones it should remove.** Per module,
defaulting to `None`, and **list a checked corpus explicitly** — a corpus checked and found
clean is a different fact from one nobody has looked at.

### A null result that could not have shown the damage is not a clean bill of health

Validating a destructive transform: **state what a passing test would look like if the damage
were present, and check your test can tell the two apart.**

The worked case. Everyone reached "the watermark half does not travel" from the false-positive
side — 146 false positives, the P wave. Nobody had tested the other direction: whether the
corpus the tool *is* trusted for was ever actually checked. "Safe for the 101 question books"
was an assumption with a plausible story attached.

The first check was for surviving `P face` and `E face` — freeze-fracture membrane
terminology, real first-year histology, and `P` is in the strip list. **Zero of each.** That
looks like a hit. It is not: `E` is **not** in the strip list, so if the books used that
terminology the E-face half would have survived untouched. Zero of both means the books simply
do not use it — **the test could not have shown damage, so its passing proved nothing.**

The evidence that did the work was what *survived*: `cis face`, `trans face`, `entry face`,
`exit face` — correct Golgi terminology the stripper cannot touch. Result: no damage across
all 2,704 questions. Not the zeros.

### Guard a collision on the resolved output path, not on the field that caused it

A fix prompted by a resit-versus-EOM collision can easily end up keyed on **tier**, which
leaves two formatives in one year colliding exactly the same way. Key on the **resolved
filename** instead, so any two records landing on one name are caught whatever produced the
clash:

```
Error: 1 batch filename(s) claimed by more than one paper — one would overwrite the other:
  101-ISK-EOY-2025: EOY (ISK - 101) 199 (1).pdf and EOY (ISK - 101) 198 (1).pdf
```

It throws **at generation time, before anything is written** — existing batch files keep their
timestamps through the refusal, so there is no partial write to clean up. Loud, not a skip.
Verified by forcing a year collision rather than by reading the code.

### A duplicate scan is not a duplicate file, and nothing catches it for you

Three of the six 101 EOM papers are duplicate pairs — **~4 distinct sittings, not 6.** Neither
existing defence sees them:

- **The byte dedup misses them**: each pair has a **distinct sha256**, because they are
  separate scans of the same sitting.
- **`bank.py` will not collapse them**: the same question scanned twice **OCRs differently**
  and lands in different clusters.

Bank the 18/12/2021 sitting from `src_17bf088a37f1ab6540a3` and the 10/12/2022 sitting from
`src_a54bbf7a625ba2b172fc`; drop `src_9e6aad6c6af097e473d6` and `src_ce4292e31edea7517e7b`.

The general rule: **content-addressed identity answers "is this the same file", never "is this
the same exam".** A sitting can arrive twice under two hashes, and only reading the covers
tells you.

### Manifest defects: five more, one generator

All from `scripts/corpus-intake/manifest.py:287`, all found by reading cover pages by hand:

- a wrong `solvedStatus`
- two wrong `examSittingYear`s
- a probable wrong `moduleId` — a paper whose cover reads *"END Module: INT-101"* filed under
  `101 ISK`
- `src_415d10984252678d4a7a` *"Anatomy Formative Assessment [Upper Limb].pdf"* categorised
  **`Written Questions`** and **100% MCQ** — a written lane will draw a blank on it

That is now **four defect families** across `textLayer`, `subject`, `sourceCategory`,
`examSittingYear`, `solvedStatus` and `moduleId`. Every one was found by looking at the
document; none by any check the pipeline runs.

### `--with` is now wired on every branch — and the bar it was proved against

`question`, `evidence` and `relation` all honour it; `concept` and `article` fold siblings
through `foldInSiblings`, which already took `alongside`. Closed, not closed-so-far.

**`relation` was the worst case.** A relation names **two concepts, a claim and a citation** —
four references, each kind in its own folder (`concept/`, `evidence/`, `relations/`) — and the
branch read only its own directory, so it found **none** of the four.

**The standard every future `--with` wiring should meet**, because it proves the flag widens
what counts as existing rather than letting a batch pass by naming its dependencies:

```
without --with   6 errors — source concept, target concept and claim "does not exist", for records that do
with --with      3 errors — those three gone; a deliberately wrong citation ID still refused
```

The **surviving refusal** is the point. An invented `CIT-ANA-SCIATIC-BRANCHES-01` stayed
refused while the real `CIT-KA-ANAT-SCIATIC-BRANCHES-01` beside it resolved. Prove both
directions or the flag is indistinguishable from a suppression.

### If the page is blank, say so — do not reconstruct the mark scheme

When a solved copy turns out to have no answer written on a page, the honest record is **"the
mark scheme was never printed"**. Do not rebuild one from the department book and present it
as the examiner's: it reads identically to a real key and no later reviewer can tell the
difference.

This is the same refusal as not rewriting a diagram question into prose, and not filling
`atomic_claim_ids` to clear an audit. The pattern in all three: **a plausible reconstruction is
worse than an admitted gap, because the gap is visible and the reconstruction is not.**

### A live bug in `repair-options.py`: a mangled leading label steals the next question's stem

Found by porting one lane's line-level cases onto main's copy. `options_after` reads a mangled
glyph at the **head** of a block as this question's option A, so **the next question's stem is
filed as an option of the previous question**:

```
FAIL  a mangled label leading the block is declined, not guessed
        wanted {'A': 'The first.', 'B': 'The seventh.'}
        got    {'A': 'Which of the following is a typical intercostal nerve:', 'B': 'The seventh.'}
```

That is a **wrong** answer rather than a missing one — precisely the failure mode
position-resolution exists to prevent, and the same objection that killed shape-mapping
`0`→`d`. The guard declines a mangled label with nothing before it, and returns early when one
carries a stem's terminal `:` or `?` and runs past 40 characters. **18 self-tests pass**,
including main's originals and the five destructive-sentence assertions.

Also worth taking: the widened `OPTION`/`INLINE` accepting a **comma** separator — **78 option
lines in one physiology book** that were previously invisible rather than mislabelled.

### An overlay is only worth removing where it breaks a parse

One corpus registers its watermark entry as an explicit `None` **with a reason**, rather than
leaving it blank: `ViP`/`VIP`/`Vi` appear zero times across its 46 sources, and the
`DOCTOR HOUSE` overlay found there is deliberately **not** stripped — 15 tokens in one file,
never landing on an option label, and stripping `DOCTOR` or `HOUSE` as whole tokens would
delete those words wherever a paper legitimately uses them.

So the table's entries are not "watermark or not" but "does this overlay break a parse". A
checked-and-declined entry carries more information than an empty one, and stops the next lane
re-deriving it.

### Asymmetry between the two `foldInSiblings` call sites

`:194` (question) passes `concepts, articles, resources`. `:338` (practical) passes
**`concepts` alone**, so `articles` and `resources` stay undefined on that path — a practical
referencing an article cannot resolve it from a sibling batch. Concepts do fold in, so a
practical batch **can** ship alongside concepts authored in the same pass.

### A question's `resource_ids` cannot be filled at all — do not try

Filling it with a manifest source ID returns `resource_ids src_… is not a resource that
exists`, because a question's `resource_ids` resolves against the **catalogue** store —
something a student opens — not the evidence store the manifest feeds.

And the catalogue batch **cannot be imported**: `medical:batch` has no contract for a
catalogue resource and reports the file `kind: "unknown"`, which fails CI for every lane.
`detectBatchKind` has no catalogue-resource branch.

**So leave the column out and write the reason into `author_notes`.** One lane's 69-record
catalogue batch is staged outside the import root waiting on that branch. **This gap has no
owner.**

### Plans are not stable the way IDs are — read them back, don't re-derive

The mint rule has a second home. Re-running a plan generator **re-slugs**: a renamed chapter or
a reworded canonical key mints a **second** article for a page that already has one, and
nothing notices.

One lane went 21 → 38 concepts on reading a second paper (7 examined on both sittings, which
is what lifts `weight_confidence` 0.7 → 0.9), which meant regenerating its article and claim
assignment sheets. Its generator now **reads existing IDs back out of the batches** — article
by `module_subject`, claim by `concept_id` — and reuses them. Verified: **all 15 article IDs
and all 21 claim IDs preserved, none lost.**

Same rule, different derived value: **for a record that already exists, look the ID up.**

### `related_article_ids` has an honest source — derive it, don't invent it

It is on `conceptPopulated`, so `[clear]` fails the audit. The honest source is the
`related_articles` cross-references the article authors actually wrote: if the Enzymes article
says Nucleic Acids is related, then a concept Enzymes teaches is genuinely discussed by Nucleic
Acids — and the author already wrote a sentence saying why.

**This makes `related_articles` mechanically load-bearing.** It is a prose list, one
`ART-…: why` per line. **A line separated by `|` or `;` silently loses the link.**

### The written ceiling, cross-checked from both directions

Two lanes reached **37 filled + 4 deliberately empty** independently — one by adding six
columns to 31, the other by decomposing a total of 41. Same position, opposite directions,
which is better evidence than either measurement alone.

```
present but EMPTY in every record:  attached_image  attachments  derived_from  resource_ids
filled in some records:             concept_ids  contextual_concept_ids
                                    media_recommendations  vignette
```

The inapplicable sets differ by exactly one, for a good reason: one lane lists `vignette` as
inapplicable, the other has it filled on a **single** record — the one question whose scenario
is stated separately from the ask. That is the column behaving as documented, not a
disagreement.

**A documented empty is a statement, not a gap.** `derived_from` empty says these questions
were **transcribed, not derived** — real provenance. `attachments`/`attached_image` empty says
there are no rights-cleared assets and the needs are filed as `media_recommendations` instead.
Neither is `answer_a`-style padding in reverse; both are claims a reader can rely on.

**Circulate the mechanism, not just the instruction.** One lane left `resource_ids` empty for
the right reason but the wrong model — "no manifest source exists as a live resource record"
rather than "it resolves against the catalogue store". *"Leave it empty"* without the mechanism
invites the next author to fill it the moment a catalogue record appears to exist.

### The look-it-up rule points both ways

The mint rule and the re-slug rule are the same rule seen from the producing side. It also
runs the other way, on the **consuming** side: one lane's concepts name **33 `CLM-*` IDs**
inline, and a separate agent must now author exactly those claims. The IDs are already written
down, so the claims must **match** them — not be minted afresh from the same canonical keys.

**Wherever an ID crosses between two authors, one of them looks it up and neither derives it
twice.**

A lane that authored directly rather than generating has no re-slug exposure at all — there is
no second run to re-mint anything. The hazard is a property of generation, not of authoring.

---

## Recovering an answer key: one decision procedure

Four variants have turned up. Do not pick a technique before running the test.

**1. Ratio test, per page, on every solved/unsolved pair.** Two seconds, no PDF opened.

| Ratio | Meaning | Next step |
|---|---|---|
| **≥ 1.3** | answers are in the text layer | extract normally |
| **near 1.0** | they are not | render a page and look |
| **0 / 0** | no text layer at all | OCR for word boxes before any intersection |

**2. Once you are looking at a render:**

- **Annotation objects** (`/Stamp`, `/Square`, `/Highlight`) — exact vector data. Render
  annots-on and annots-off and **diff**. A grep keyed on `/Subtype /Highlight` alone misses
  iPad ink and Preview rectangles.
- **Pink highlight burned into the page** — rasterise, intersect highlight rectangles with
  text bounding boxes. Recovers in bulk: 48/48, zero false positives on unsolved controls.
- **Grey pen on a greyscale scan** — only the eye works. 177 coloured pixels on a whole page
  (0.02%) means no colour check will find it.

**3. Confirm any suspected mark at 200 dpi, not 150.** This is the near-miss that would have
cost most. `EOM 198 CPS 198 no` looks pen-marked at 150 dpi — every option appears to carry a
mark. At **200 dpi with a crop** it is the *same hook before all four letters of every
question*: a print or bleed artifact carrying no answer information. Recorded as **unmarked**
rather than as 120 unreadable questions.

> **150 dpi is enough to read a real mark and not enough to tell a real mark from an
> artifact.** Confirm at 200 before recording either an answer **or** a gap.

**4. Expect more than one mark convention in the same paper.** X-strikes on wrong options
usually — but on *"select the **false**"* stems one examiner **ticks the true distractors and
rings the odd one out**. Ten questions did that. A recovery keyed on *"the marked option is the
answer"* inverts all ten. **The ring is the thing to trust**: both conventions agree with it
everywhere.

**5. Sanity-check the recovered key before believing it.** A plausible distribution
(a:26 b:26 c:39 d:29) is evidence; a degenerate run is not. Cross-check the numbering against
cached stems at several points across the paper, or an off-by-one silently mislabels
everything after the page it starts on.

**6. The marginalia are content, not just a key.** 48 questions carried examiner working that
exists nowhere in the text — `VR = (MSFP − RAP) / TPR`, a hand-drawn jugular trace labelled
A, C, X, V, Y, per-option pressures `25 / 120 / 37 / 17`. That is teaching material.

**7. Record disagreement rather than resolving it.** One ring disagreeing with its own
marginalia is recorded with both and flagged; a faint second ring is flagged, not resolved; an
illegible note is `null`, not transcribed.

Result on the hardest variant: **120 questions, 120 answers, zero unreadable** — 119 high
confidence, 1 medium — verified 8/8 against answers a human had read off a page independently
beforehand.

---

## Retraction: matching questions are NOT blocked. Author them.

**I told lanes both matching fixes were outstanding and that matching items should be left
unauthored. That was wrong, and it is the most costly kind of wrong** — a "this format is
broken, skip it" instruction quietly costs a module its content, and no later reader can see
what was never written.

Both fixes are on `main`. A probe batch settles it — two `matching_options`, two
`matching_prompts`, a real concept, a real article:

```
kind question  items 1  errors 0
```

**How I got it wrong: I read a comment describing the past failure as live code.**
`bulkImport.ts:795-802` narrates the bug in the past tense and `:854` branches on
`format === 'matching'`. `validate-content-batch.mjs:238-246` likewise *records* that the
earlier fix was "half a fix" and that the contracts are now checked through
`validateImportRow`. Both files document their own history at the site of the fix — which is
good practice and reads exactly like an open bug to a grep.

**Two rules from this:**

1. **A probe batch beats reading the source.** Every mistaken claim in this file came from
   reading code; every correction came from running something. Where a claim is "format X
   cannot validate", the cost of checking is one file and one command.

   **And the specific trap: a comment narrating a fixed bug lives at the site of the fix.**
   That is good practice — the comment is *why the code looks the way it does* — and it is
   **unreadable to a grep**. Both files that misled me do it, and so do several written by the
   lanes. Nobody should stop. It means only this: **"I found a comment describing this bug" is
   never evidence the bug is live.**
2. **Never relay "skip this" without a reproduction.** A false *blocker* is worse than a false
   *bug report*: a bug report gets checked by whoever tries to fix it, while a blocker is
   obeyed and leaves no trace. There is no red validator, no failing test, no gap in a ledger.
   **It is the only failure mode in this programme that is invisible by construction.**

3. **An instruction to every subagent, not just to coordinators: test any part of your brief
   that says something cannot be done — including the parts your own lane wrote.** This one
   was caught because a subagent read `05-questions.md`, found the manual says every format has
   a runner and *"nothing is currently refused"*, and told its lane the claim was unsupported
   by anything in the repo. The lane that caught this did so because **its own subagent
   read `05-questions.md`, found the manual says every format has a runner and "nothing is
   currently refused", and challenged its instructions.**

### `--with` on a practical needs `e595b33` — a branch behind fails confusingly

Before that commit siblings were folded in **inside the question branch only**, so a practical
validated with `--with` produced phantom `is not a concept that exists` errors and **no**
`N concept rows treated as pending import` note. One lane saw **31 invented errors on a clean
batch**; after rebasing, **10 items, 0 errors**, note present.

That is a **third** cause the sibling-note check distinguishes, alongside shell quoting and
argument passing: **being behind on the validator itself.** The note's absence means the
sibling never loaded, whatever the reason — which is why a positive check beats comparing
error counts.

The right response to it was the one taken: diagnose the cause, prove the batch is fine by
running `main`'s validator from a scratchpad shim, confirm the merge is clean with
`git merge-tree` — and **change nothing**, rather than "fixing" work that was already correct.

### A probe tells you the shape it wants, not just whether it works

The third argument for probing over reading. A first matching probe returned **six** errors —
and crucially **not** "Correct answer is required", which is what a real block would have
looked like. The errors were grammar, and they handed over the exact contract:

```
A matching question needs at least two options, written as "A | text"
A matching question needs at least one prompt, written as "prompt = A"
```

**The matching grammar, verbatim, so no lane has to guess it:**

```
## matching_options
A | Has afferent lymphatics and a subcapsular sinus
B | Has Hassall's corpuscles and no afferent lymphatics
## matching_prompts
Lymph node = A
Thymus = B
```

Options are `LETTER | text`, prompts are `text = LETTER`, and **`matching` needs no
`correct_answer`.** A lane that guesses gets six errors reading like a broken format rather
than a mistyped field. Reading the source would not have produced this.

### A category list that decides which files an extractor opens is a silent filter

`mcq.py`'s per-module categories gave one lane `Instructor material` and `Department
Questions` — correct for the department books, and it **silently excluded the exam papers**.
`EOM 196 104 - 2023` is a **120-question MCQ paper**. It was invisible to the MCQ extractor,
while the *written* extractor took 36 rows out of it because it is not a written paper.
**Miscategorised in both directions, and nothing errored.**

Those 120 questions are a **37% increase** on a bank of 328 answered — and they are *exam*
questions, which outrank department-book questions for blueprint weight.

**Check yours: cross-tabulate the manifest by `sourceCategory` and ask whether every file that
*contains* MCQs sits in a category the MCQ extractor reads.** That lane's were spread across
three categories and it was reading two. **The symptom is not an error — it is a smaller
bank.**

Flag recovered answers distinctly (`handwritten-recovered`) so a reviewer can always tell an
answer read off a scan from one the paper printed.

### `content.yml` cannot express an update batch — and update-plus-mint makes that everyone's problem

`medical:batch` judges every row as a **new** record, so an update row that reuses a live ID
and adds a module fails on fields that exist on the live record:

```
Item 1 (Loading dose): no definition
Item 1 (Loading dose): no explicit objective — a concept without one cannot be assessed
```

The batch is correct — `medical:simulate` reports `created 0, updated 9, 0 errors`, and a diff
against live state showed **138 fields changed, 0 emptied**. **A correct batch fails the
gate**, and the workflow has no way to say "this one is an update".

**The interim workaround, and its limits.** Restate the required fields on each update row,
taking the values **verbatim from live state programmatically** — never by hand. The row then
asserts what is already true and both gates pass. But it is redundant data, it does not scale
(200 records would restate two paragraphs 200 times), and later drift between batch and live
state becomes a **silent revert**. **A mistyped restatement is a silent overwrite of live
content.**

**The real fix needs an owner — one of:**
1. `content.yml` routes files matching an update convention (filename suffix, or a
   front-matter marker) to `medical:simulate` instead of `medical:batch`; or
2. `medical:batch` grows a `--update` flag that relaxes the new-record required-field set and
   resolves IDs against live state.

### Too narrow gives you less; too broad gives you the wrong kind — and that is worse

> **A filter that is too narrow gives a smaller bank. One that is too broad gives evidence of
> the wrong kind — and the second is worse, because it looks like more.**

Both were found in one day, in opposite directions.

**Too narrow.** A per-module category list gave the MCQ extractor two categories where the
papers sat across three, so a **120-question MCQ exam paper was invisible** while the *written*
extractor pulled 36 rows out of the same file. Symptom: a smaller bank. Nothing errored.

**Too broad.** The end-of-module papers are **100% MCQ**, the *written* extractor matched their
numbered stems, and the clustering was built on the result. **344 of 673 clustered occurrences
— 51% — come from all-MCQ papers, and 61 of 177 objectives rest on multiple-choice evidence
alone.**

Nothing was wrong with the objectives; they are real. What was wrong was the implied claim that
they are examined **in writing**. The orientation says the written paper is eight SAQs and two
cases — so an objective only ever asked as an MCQ **will never be an SAQ**, and weighting the
two alike overstates it for exactly the student the blueprint is for.

**The fix is not to delete, it is to label.** Every occurrence now carries `askedAs`, every
objective `askedAsWritten` and `askedAsMcq`. Evidence of the wrong kind is still evidence — it
just must not be counted as the other kind.

`scripts/kasr/verify-years.py` opens every paper whose year came from a filename and reports
agree / no-date / disagree. For one module: **6 agree, 22 print no date at all, 0 disagree.**
Reusable with `--module`.

### A red check is not automatically a batch to withdraw

An **unfinished** batch — a header with no items — must not sit in the import root: it cannot
be classified, it fails, and it takes every lane's PR down. That is not the same as a batch
that is **complete and honestly red**.

Five written batches hold **99 correctly transcribed questions from six sittings** and fail
only on `no library_ids` / `main concept … is not covered by any article` — 30 concepts across
14 leaves whose articles are not yet written. The questions are right; the **library** is
incomplete, and the validator is reporting that accurately.

**Deleting real content to make a check green is worse than the red check** — and where the
batch is generated, the seeds regenerate it anyway. Finish the articles; do not withdraw the
questions.

### Authoring the articles is necessary and not sufficient

Closing `no library_ids` / `main concept … not covered` takes **three** steps, and only the
first is obvious. Every lane authoring questions needs all three.

**1. Write the articles.** Necessary. Not enough on its own.

**2. Get the mapping to the generator.** `writtenBlock` **omits `library_ids` entirely** when
the article lookup returns undefined — so articles can exist and the generated batch still
carries zero of them. The route is `loadLinks(module)` →
`scripts/kasr/extract/<slug>/article-plan.json`, and **that file does not exist for any module
yet.**

Generate it **from the article batch itself**, from each article's own `related_concepts`,
rather than typing the mapping twice — then the plan and the articles cannot drift. One lane's
is 13 entries and 22 concept links, derived that way.

**3. Create resource records for the papers being cited.** A question citing the paper it came
from needs that paper to exist as a **resource record**, not only as a manifest row. Otherwise:
`resource_ids src_… is not a resource that exists`. Eight records closed the last 15 errors in
one lane. **No claim row anywhere mentions this step.**

### `source_relative_path` comes from the corpus index, not the manifest row

Stated as the rule rather than the workaround, because the reason generalises:

> **The corpus index holds one path per content-addressed ID by construction, so it agrees with
> the validator automatically. The manifest holds one row per *path* and cannot.**

The predicted failure fired exactly as expected — a generator took the path from the manifest
row, picked the `… (2) copy.pdf` of a duplicate pair, and got:

```
src_078450096f7b08eb1284 is "y1/104 CPS/EOY/EOY Final 104, 199 (2).pdf" in the corpus,
not "y1/104 CPS/EOY/EOY Final 104, 199 (2) copy.pdf"
```

### The coverage check was reading half the evidence — 247 errors to 14

Two bugs in one function, and both are the kind that report a content problem where there
is none.

**1. Only one direction of the link was counted.** The check built concept→article from an
article's `related_concepts` and **ignored the concept's own `article_ids`** — even though
`conceptImport.ts:166` reads that column straight into `articleIds`. Both directions are links
the importer makes; one was counted. **247 → 14.**

This is the same both-directions point from the other side: earlier the risk was a lane
*writing* only one direction. Here the tooling was *reading* only one.

**2. Sibling concepts were overwritten rather than merged.** When a concept is authored in two
batches, **whichever file was listed last decided what taught it.** So the fix for a batch's
errors could be to reorder its `--with` arguments, which is not a fix at all. Closed the last
14.

**A batch's error count is evidence about the batch only once the checker is known good.** Both
of these presented as "your questions have no article", which is exactly what a genuine content
gap looks like.

### `build-article-links.ts` — the mapping, derived rather than typed

On `main`, with `scripts/kasr/seeds/article-links.json` beside it. Derives the concept↔article
map from the articles and concepts themselves, **in both directions**.

Measured against the hand-written `ARTICLE_FOR_CONCEPT`:

- **reproduces it exactly — 17 of 17**, no misses, no disagreements
- **finds 133 further links it lacks** — that is the gap emitting written questions with no
  `library_ids`
- **names 47 concepts that no article teaches** — the other half of the problem, and nobody had
  a list of it before

Reproducing the hand-written map exactly before adding to it is what makes the 133 credible: a
generator that disagreed with the 17 would be proposing a rewrite, not an extension.

`articles.ts` is **deliberately not rewritten** — wiring it is a one-line change and the file
belongs to another lane. The generator and its JSON stand alone until ownership is agreed.

---

## Two rules that sit above the specific fixes

### A parser that skips what it does not recognise loses content quietly

Three instances in one lane, all the same shape:

- `PART_HEADING` matched integer marks only — `{0.5 Mark}` made the **whole heading** fail and
  the part **vanish**.
- `PART_HEADING` allowed only alphanumeric labels — a 2022 paper setting two cases and lettering
  the parts within each prints `I-a`, `I-b`, `II-a`. Every part dropped; the question arrived
  unmarkable.
- The option checks ran on formats that have no options, reporting "0 options" for well-formed
  matching questions.

> **Anything that parses a heading, a label or a format must either error on what it cannot
> read, or be paired with a check that counts what should have been there.**

And the downstream check has to say the right thing. It fired here — but reported *"no
written_parts"* about a column **containing four headings**, which sends an author to look at
the content rather than the parser. It now distinguishes an empty column from one whose
headings did not parse, and names how many it found.

### The coverage check asks whether an article *claims* a concept, never whether it *teaches* it

**No validator can catch a wrong wiring, and nothing later will surface it.**

A lane nearly wired the notochord concept to the paraxial-mesoderm article: same subject-tree
leaf, mentions the notochord twelve times. It never says the notochord becomes the nucleus
pulposus — **which is the concept.** Coverage would have gone green and the student would have
been sent to an article that does not answer the question. It wrote the article instead.

> **Read the article before declaring the concept. Do not grep it.**

**This qualifies `build-article-links.ts` rather than contradicting it.** Deriving the map
beats a hand-typed parallel table — a mapping typed in two places drifts, and reproducing all
17 hand-written entries exactly is what makes its 133 additions credible. But derivation reads
`related_concepts`, and *a mention is not a teaching*. So:

- the **17 it reproduces** are as sound as they were;
- the **47 concepts no article teaches** are a real work list and safe to trust — an absence
  cannot be a wrong wiring;
- the **133 it adds** are *candidates*. Each was written by an author who thought the two were
  related; that is good evidence and not the same as having read the article for the concept.

Accept the list, then read. Under time pressure this is the corner that will be cut, and it is
the one that produces content that looks right and is wrong.

### A buggy check that reports a content gap will always be believed

> **A check that reports a content gap while having a bug of its own will always be believed,
> because the reported cause is plausible.**

Both coverage bugs — counting one direction of a bidirectional link, and overwriting rather
than merging sibling concepts — presented as *"your questions have no article"*. That is
exactly what a genuine content gap looks like, so nobody questions it; they go and write
articles. 247 phantom errors survived on that plausibility alone.

**The tell was order-dependence.** Reordering the `--with` arguments changed the result.

> **Anything order-dependent in a set operation is a bug in the check, not in the content.**

That is a cheap thing to try whenever a batch reports gaps you did not expect: shuffle the
sibling list. A real gap does not move.

### Deriving the article map: two conditions before wiring it

Both come from the lane whose hand-written table it replaces, and both are load-bearing:

1. **Derive from both directions.** `conceptImport.ts:166` reads `article_ids` on the concept
   as well as `related_concepts` on the article. **A generator reading only `related_concepts`
   rebuilds the exact bug that produced 247 phantom errors.**
2. **Diff against the current file, do not overwrite it.** The hand-written
   `ARTICLE_FOR_CONCEPT` moved from 17 entries to **71** while the handover was being
   discussed. Any disagreement should be **shown**, not resolved silently — a generator that
   overwrites a hand-maintained table is indistinguishable from one that is wrong.

And the 47 concepts no article teaches **belongs in the repo as a file, beside the coverage
ledger** — not in a message. It is the definition of what is left to write.

### A hand-maintained table can be a record of decisions a generator cannot reproduce

**This reverses the go-ahead I gave to wire `build-article-links.ts`, and the lane that had
asked for the go-ahead is the one that reversed it.** Its reason is better than mine.

Reading the current `ARTICLE_FOR_CONCEPT` changed what it is. It is no longer a mapping — it
is a record of **decisions with reasons attached**:

> *"The notochord goes to its own article and not to the paraxial-mesoderm one, which says a
> great deal about where the notochord lies and nothing about the four steps or the nucleus
> pulposus — declaring it there would have been a lie the validator cannot catch."*

and a monocyte declared on the connective-tissue article with the reason recorded, because its
leaf-correct home sat in a file that pass could not edit.

**Deriving the table would keep the links and throw away the *why* — and the why is what stops
the next author re-making the wrong call.** A generator reproduces the conclusion, never the
judgement.

So the generator stays **unwired, with `--diff`**. Current state: **71 of 71 agree, 0
unmatched, 0 contradicted**, deriving 201 links in total. Those numbers are for the owning lane
to act on, not for the generator to apply.

**The half that needs no judgement did land:**
`docs/Kasr-Source-Imports/coverage/101-ISK-untaught-concepts.md` — **15 concepts no article
teaches**, grouped by curriculum position, regenerated on each run, down from 47 as articles
land. An absence cannot be a wrong wiring, so that half is safe to automate. **Derive what
cannot be wrong; leave what requires a reason to a person.**

### Resolving a conflict: name the files, and run the thing you changed

`scripts/kasr/seeds/articles.ts` reached `main` carrying `<<<<<<<` and `>>>>>>>`. It does not
parse, so `build-batches.ts` failed on import **for every lane**. Fixed in `8779e9e`.

Two causes, both avoidable:

1. **`git add -A && git commit --no-edit` chained in one command stages the conflict.** A
   commit resolving a conflict should **name its files**.
2. **The changed file was never run.** `build-batches.ts` would have caught it in one second.
   **Anything that has to parse should be run once before it is pushed.**

The conflict itself was predictable: one lane rewrote that file to read from `article-links.json`
while the owning lane was extending the hand table it replaces. **Same lines, by construction** —
which is what a handover in progress looks like, and a reason to finish the ownership question
before editing.

### The `--with` trap is now refused rather than documented

The validator **rejects a sibling list the shell handed over as one argument**, naming the
cause. That is the fix that belonged in the parser rather than in a rule.

It had given three lanes a wrong measurement — most recently **481 errors read on a batch that
has none**, half an hour after that lane had warned two others about the same trap. zsh does
not word-split an unquoted expansion; bash does. **CI was always right; the people checking it
by hand were not.**

### Deriving a statement of intent is not the same as inferring one

A refinement to *derive what cannot be wrong*. The two article maps are not the same kind of
object, and the difference decides whether derivation is safe:

| | What it is | Derivable? |
|---|---|---|
| A map over a **large existing corpus** | a record of **decisions with reasons** — why the notochord gets its own article rather than one that mentions it twelve times | **No.** Deriving keeps the links and discards the reasoning. |
| A map over articles **authored in the same pass, by the same author, to teach these concepts** | a **statement of intent**, written deliberately as *"this article teaches these"* | **Yes**, once. |

In the second case the derivation is not inferring intent from proximity — it is **reading an
intent that was stated**. The check that matters (all 22 concepts covered, 0 strays) was done
by the author, not by the deriver.

**And the boundary is sharp.** The moment a fourteenth article arrives, or one of those
concepts is taught by an article from another module, *related* and *teaches* can diverge and
nothing records which was meant. So treat such a map as **generated once from a deliberate
statement, not as a standing generator** — if the module gains articles, write the map rather
than re-derive it.

### Before recording an answer, check the mark is not on every option

Two instances now, different corpora and different causes, both of which would have produced
fabricated data:

- a **candidate's working copy** — at 1200 dpi the stroke is on *every* option letter;
- a **print or bleed artifact** — the same hook before all four letters of every question.

> **If a mark appears on options that cannot all be correct, the marks are not a key.**

Both were recorded as **findings** rather than as failures or as unreadable questions. That is
the right disposition: the paper is telling you what it is.

### A `field_notes` reason without the key is half the contract

The audit asks **two different questions**, and answering one does not answer the other:

- **`conceptPopulated`** — does this field **carry a value**?
- **`conceptPresent`** — does **the key exist at all**? Reports `X absent for <id>` when it does not.

An emitter that writes a `field_notes` reason for a field but **never emits the key itself**
satisfies the first and fails the second. That is exactly what happened: `conceptTail` wrote
reasons for nineteen fields and emitted none of them.

**And §5 makes it worse quietly:** an empty `## key` block parses as **untouched**, so the key
ends up *absent* rather than present-and-empty. **`[clear]` is what says "present and
deliberately empty".**

So the shape is: **emit the key, with a real value where the module has one and `[clear]` where
it does not, with the reason still standing behind it.** Nineteen keys, and the concept batches
went **35 → 54 fields, 0 errors**.

**How the wrong conclusion was reached from a correct measurement** — worth more than the fix.
An agent measured main at 35 columns and the widened emitter at 54, and reported that nineteen
of the difference were **redefinitions** of columns main already computes, concluding that
byte-identity for one module and the 50-field floor were **mutually exclusive** without
branching per module. It chose byte-identity and left the other module failing the floor.

**All nineteen were pure additions. Main emits none of them. There was no conflict.** The count
was right; the interpretation was invented. **Listing the columns took a minute and dissolved a
constraint that would otherwise have shaped the emitter permanently.**

> Before designing around a conflict, enumerate the things said to be in conflict.

### A stale registry deletes; it does not merely omit

Second instance in one merge. Main had added a **seventh** 101 paper (`BAQOON_2023`) after the
registry snapshot I circulated. Using the six from that snapshot verbatim would have **deleted
`101-ISK-BAQOON-2023-written.md` as an orphan** — caught by the byte-identity gate, not by
reading.

A registry listing fewer papers does not error. Depending on the generator it builds less
**or removes what it no longer knows about**. Re-read the registry at merge time; a list quoted
from a message is stale the moment it is sent.
