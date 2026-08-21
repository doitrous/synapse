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

### OCR corrupts MCQ option labels, and it is not random

`d.` reads as `0.`; `c.` reads as `¢.` or `6.`. A parser keyed on a clean `[a-d]\.`
silently drops roughly the **last option of many questions** and never errors. Because it
is specifically *d* that goes, the answer-key distribution **skews** rather than visibly
breaking. Found in 104's run; it applies to any OCR'd bank, including 101's 2,704 MCQs and
102's two shared department banks. Normalisation belongs in `mcq.py` — one shared parser,
not five local fixes.

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

### Pathology is a topic, not a subject

`curriculumCatalog.ts` carries **20** subjects, not the manuals' eight. `pharm` is among
them; pathology is not, and that is deliberate — pathology is modelled as a topic *within*
each body system (`Cardiovascular pathology`, `Respiratory pathology`, `Renal pathology`,
and so on already ship). A pathology concept files under the body system it affects. The
body-system code list has no `PAT` either. **Do not mint a subject or a system code for
it** — that would move the tree every lane places into.

### Filter on university, not just module

`108 II` and `108 III` are `PAT 108 I/II/III` from **MTI University**, sitting elsewhere in
the corpus tree — they are not `kau` modules. Filter on `moduleId` **and**
`universityId == "kau"`.
