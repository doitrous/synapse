# Validator lane — handoff

Everything this lane has landed, what is still open, and the traps that cost time.
Written so a fresh session can pick the lane up from this file plus `13-orchestration.md`.

**Lane scope:** `scripts/validate-content-batch.mjs`, `scripts/simulate-content-import.mjs`,
`scripts/kasr/check-concept-ids.ts`, `scripts/kasr/check-id-stability.ts`,
`scripts/report-duplicate-keys.ts`, `scripts/snapshot-*.mjs`, and their tests.
Content batches only when a shared gate is blocking every lane.

---

## Landed

| Hash | What |
|---|---|
| `f0eb4df` | Tests pinning the evidence branch's `--with` sibling scope |
| `f27e276` | Evidence branch says which siblings it read; dedupes a `--with` file already in the directory |
| `60c898a` | `[clear]` in a `parseSections` column refused — it reached students as visible text |
| `067f57c` | Relation branch resolves concepts, claims and citations across directories |
| `37572ec` `2a8220d` | `103-BMS-OWED.md`, then split into the three jobs it actually was |
| `61ea624` | 13 keyless 103 BMS concepts given canonical keys; `medical:concept-ids` to exit 0 |
| `454fdc4` | `check-id-stability` pins one committed ID per module; wired into npm + CI |
| `fa72ec4` | `check-concept-ids` scans every `docs/*-Source-Imports/concept`, not only Kasr |
| `5c28167` | `medical:duplicate-keys` — tree-wide duplicate scan → `duplicate-keys.md` |
| `57ef0d4` | Catalogue check: universities, empty-universities, module prefix, `module_subject`, subject ∈ 20 |
| `99865d3` | `medical:snapshot-live` and `medical:snapshot-staleness` |
| `9dba8ca` | CI runs for every university, not only Kasr |
| `470fdde` | Update row for a record nothing authors → error naming the id |
| `312777b` | `+A \| +B` stored `+B` literally — fixed in `splitList` |
| `b3cad82` | `find-existing.mjs` reads `canonical_key` |
| `daf0d4d` | Concept-resolution failures say to try `--with` |
| `4286b26` | An update may restate the candidate ids its live record carries |
| `6d3f597` | Per-record completeness warnings (concept/question/article) |
| `ed87a85` | Practicals can carry `universities`, `years`, `module` |
| `d82dd36` | `+` on a non-list column refused; `simulate` fails on an id-bearing untypeable file |
| `dcc6929` | Practical completeness per format |
| `2d3c6c6` | Authoring fields asked of creates only; `103-BMS-OWED.md` correction |
| `3f4ea7a` | This handoff |
| `c255322` | Blank `label` no longer blanks a live concept's label on import |
| `7ec2ef4` | A record's universities, years and modules must agree |
| `2edea35` | A sparse update no longer wipes `module_subject` on four kinds |

---

## Open queue

In order. Each is specified enough to start from; the investigation behind I is already done.

**1 · H2 — `module_subject` cannot hold two universities' paths.**
`conceptImport.ts:194` and the four kinds in `bulkImport.ts` call
`parseModuleSubjectPaths` directly, so the cell **replaces**: two universities each
supplying a path for one shared concept overwrite each other, last import wins. A leading
`+` does not append — it is stored inside the path, which `d82dd36` now refuses. Route it
through `listDirective`/`applyListDirective` like the id-list columns so `+<path>` appends
and a bare value replaces, on every kind that carries the column.
*The D1 check needs no edit:* it asks the importer whether a `+` survives into storage
rather than consulting a list, so it stops flagging `module_subject` the moment the column
honours one. That was the point of building it that way.
*Fixture:* Kasr path live, update row with `+AU path` → both stored.

**2 · H3 — `university_notes` exists only on the article kind** (`bulkImport.ts:117`, `:1183`).
Not on concept (absent from `conceptImport.ts` and the `Concept` interface), not on question
or practical. Omar's requirement is that every record traces per university, and
`author_notes` is not that. Add it to concept, question and practical: `key: value` per
line, **merged by key** on update so each university's line survives.

**3 · I — the resource detector. Verdict already reached, do not re-investigate.**
`IMPORT_SCHEMAS.resource` holds **19** columns (`id, title, subject, status, owner, type,
source, url, year, topics, chapter, module_ids, module_subject, included_concepts,
included_articles, concept_locations, universities, years, description`) and is what
"Bulk import → resource" uses. `EVIDENCE_IMPORT_FIELDS.resource` holds 17 (`institution`,
`processing_status`, …). **Both shapes are real; the detector is missing a branch**, and
`detectBatchKind` returns `unknown` for the catalogue shape — confirmed by feeding it every
`IMPORT_SCHEMAS.resource` key. So a catalogue resource can never be checked by
`medical:batch` or `simulate`.
*Do:* add a detector branch and a validation branch for the catalogue shape, keeping the
evidence-source branch. `included_concepts`, `concept_locations`, `included_articles` and
`module_ids` are catalogue-only and none appear on any other kind, so any of them
discriminates. *Also tell the manual writer:* `12-resources.md` says "`IMPORT_SCHEMAS.resource`,
18 columns" and "the catalogue resource — 18 columns". It is **19**. The shape is right and
the count is stale.
*Fixture:* both shapes, each detected as its own kind.

**4 · Sweep for the third concrete-empty default.**
Twice now a field defaulted to a concrete empty where every other optional field defaults to
`undefined`, and the merge faithfully wrote it over live data: `label` in `conceptFromRow`
(`c255322`) and `module_subject` on four kinds (`2edea35`). Two in one file family is a
pattern. Grep the importers for `?? ''`, `|| []` and direct parser calls that are not guarded
by `values.x === undefined`, and check each against what the merge does with the result.

**5 · Rule on the shape of the `years` column** — a content decision, not a validator one.
Three shapes are in production today: `KAU_Y1` (539), `kau_y3` — the same id lower-cased
(114), and `Year 1` — a bare label (**2,469, across 41 files, and by far the commonest**).
The scope check in `7ec2ef4` resolves rather than pattern-matches and judges ids only,
because a label names no university and so can never contradict a record. Nothing can be
made stricter here until somebody decides which form is canonical; failing the labels today
would redden 41 files over a convention nobody has ruled on.

**Checked while closing G, so nobody re-opens it:** `label` was the only field in
`conceptFromRow` defaulting to `''`; every other prose field already used `text()`.
The other kinds cannot have the same defect — `importRowToContent` *throws* on a missing
`title` rather than defaulting, so an article, question or practical update without one
fails loudly instead of blanking. `source`/`target` on a relation default to `''` and that
is correct: they are lookup keys, and a relation missing either is refused.
- **`tools/mint-concept-id.mjs` is unsalted** — `sha256(key)`, no module, no university,
  against `scripts/kasr`'s `sha256("kau:<module>:<key>")`. It minted 237 of the ids in the
  tree. Ruled "keep as-is and pin" by the chief-of-staff, so this is a standing property,
  not a bug to fix — but two modules or two universities minting one key collide.
- **`scripts/corpus-intake/manifest.py` hardcodes the main-checkout path.** Not this lane's;
  Years 2–5 have a fix.
- **`medical:presence`** is the only red content gate, and it is 103 BMS content.

---

## Hazards proven, with evidence

**The instrument is wrong more often than the code.** Three times in one day:
a sweep regex that matched pre-existing errors rather than the new ones; a "clean" sweep
that was every run crashing on a TDZ reference and producing no JSON; `$(basename …)`
resetting `$?` so every case printed exit 0. **Always test the positive case before
trusting a zero,** and prefer enumerating both sets to reading a tool's printed sample —
`medical:presence` names only the first two ids per field, and comparing against that
sample made two overlapping sets look disjoint.

**A rule true of one corpus applied to another.** Five instances: the two-parser
`[clear]` classification; the directory-only sibling scan; `removeOrphans`; `subjectForPath`
mapping all histology to `fnd`; and my own "update-shaped = missing a required field",
which flagged every matching, written, completion and labelling question because
`correct_answer` is required and only single-best-answer has one. All were invisible until
a second module existed.

**A gate red for a known reason stops being read.** Why `check-id-stability` pins
"this ID has not moved" rather than "equals the mint": 237 ids do not satisfy the mint and
the gate would have been red on day one. Same reason completeness is warnings.

**Empty means unrestricted.** `scopeMatches` returns true on an empty list, so a record with
no `universities` reaches every university. Silent in the dangerous direction.

**The fixture is not live.** `server/data/medical-library-v1.json` is a build artefact of
`full-catalog.json`. `medical:build` rebuilds it *from the bundle*, so it moves away from
production, not toward it. `medical:snapshot-live` is the other direction and needs an AAL2
super-admin token. Its universities are seeded `courses: []`, so no rebuild ever gives it
modules.

---

## Test harness notes

- **`spawnSync` deadlocks against an in-process stub server.** It blocks the event loop, so
  the server never accepts the child's connection. Use async `spawn`. Cost four minutes and
  a killed run.
- **`execFileSync` returns stdout only on success.** These scripts say their most important
  things on stderr, including verdicts that accompany a *zero* exit. Use `spawnSync`/`spawn`
  and concatenate both.
- **Temporal dead zone, three times.** A `const` used by a function called earlier in module
  order throws at runtime and tsc does not catch it: `SUBSTANCE`, `errors` in
  `simulate-content-import.mjs`, and the live-state block. Declare before first use, and run
  the script once — the tests will not always reach it.
- Process tests over unit tests where the behaviour under test is *which files a script
  decides to read*: that lives in the script, not in an importable module. Drive them with
  `cwd` set to a throwaway tree.
- Never call production. Stub on `127.0.0.1` and point `MEDICAL_API_BASE` at it.

---

## Working rules that earned their place

1. Reproduce before fixing; measure the blast radius before reporting it.
2. Check a peer's premise. Three were wrong: `find-existing` was already fixed; `medical:batch`
   already caught the untypeable file; the 8 "definition-less" 103 rows owed nothing.
3. Prefer asking the code to describing it. The `+`-on-a-non-list-column check parses the row
   twice and watches whether the `+` survives, rather than hardcoding the manual's list —
   which ends "and every other list of identifiers" and would drift.
4. Discover by shape, not by name: `docs/*-Source-Imports/**` everywhere, so a new university
   needs no edit.
5. Warnings for incompleteness, errors for invalidity.
