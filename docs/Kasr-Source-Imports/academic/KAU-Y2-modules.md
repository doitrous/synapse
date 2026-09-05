# Kasr Alainy Year 2 — module list (S0)

Six modules, read off the corpus's own folder names and subject breakdown (no Year-2
curriculum/bylaws document was found in the tree — see "Gaps" below). Cross-checked
against `KAU_MODULES['Year 2']` in `src/data/universities.ts` and
`docs/import-ready/academic/kau-modules.md`.

| Module id | Folder name in corpus | Subjects (from folder evidence) | In `KAU_MODULES`? | In `kau-modules.md`? |
|---|---|---|---|---|
| `205 NEU` | `205 NEU` | Anatomy, Histology, Pharmacology, Physiology | yes | yes |
| `206 DIG` | `206 DIG` | Anatomy, Biochemistry, Histology, Physiology | yes | yes |
| `207 END` | `207 END` | Anatomy, Histology, Physiology | yes | yes |
| `208 INT` | `208 INT` | Pathology, Pharmacology | yes | yes |
| `210 PAT` | `210 PAT` | Pathology, Pharmacology | yes | yes |
| `213 PSY` | `213 Psychology` | Psychology | yes | yes |

**Match: 6/6, no mismatches.** `KAU_MODULES['Year 2']` and `kau-modules.md` both list
exactly these six ids, bare form, no university prefix — same convention as Year 1.
`213 Psychology` (corpus folder) vs `213 PSY` (catalogue id) is a label difference only,
already resolved the same way the catalogue resolves it — folder name, not id.

## Secondary / cross-module material (not in `KAU_MODULES`, own folders in the corpus)

`2ry Modules/`: `Computer` (2 files), `EPE-230` (Evidence-based Practice/Epidemiology,
17 files), `Entrepreneurship` (4), `Health Economics` (3), `MPE-227` (Medical
Psychology/Ethics, 9), `RES-234 Research` (21). None of these six carry a `KAU_Y2`
catalogue entry — they read as secondary/elective courses the catalogue doesn't track
per-module the way it tracks the six numbered system modules. Not a mismatch to fix;
flagged for Omar's call on whether any should get a catalogue id.

`Practical 2nd Year/` (82 files: Anatomy, Histology, Pathology, Pharmacology,
Physiology, General, Orientation, EOY) is cross-module by construction — no single
module owns it, same shape as Year 1's `PRACTICAL FIRST YEAR/` in
`SHARED-TOOLCHAIN.md` §"What no lane owns". Awaiting the same kind of ruling.

## The board's open ruling on 315/316/317 (noted, not this year's problem)

The brief flags an open ruling that `315` Ophthalmology / `316` ENT / `317` Forensic &
Toxicology map to one module `CLIN 3` or three — per `KAU_MODULES`, `CLIN 3` sits under
**Year 3**, not Year 2. Noted here only because the HANDOFF that resumed this lane
carries it in "Open questions for Omar"; it does not touch any Year-2 id and needs no
action from this lane.

## Gaps

- **No Year-2 marks/allocation document found in the corpus.** The only faculty-authored
  marks-distribution sheet on Desktop is `Kasr Alainy/Marks/Term 1/Marks/*.jpeg`
  (5 photos), and all five are **Year 1** modules (`ISK 101`, `INT 102`, `BMS 103`,
  `CPS 104`, `INT 108` — allocated marks, written/practical exam split by topic). No
  equivalent photo set or document exists for `205`/`206`/`207`/`208`/`210`/`213`.
  Needs Omar: either the marks sheet was never captured for Year 2, or it exists
  somewhere outside this tree.
- No standalone document in the corpus states each module's full official title (e.g.
  spelling out what "NEU"/"DIG"/"END"/"INT"/"PAT"/"PSY" abbreviate to) — the codes above
  are read directly off folder names and are already what `KAU_MODULES` uses, so this
  does not block triage, but a reader wanting the long-form name needs Omar or the
  faculty bylaws (not present here).

---

## AUTHORITATIVE UPDATE — Omar 2026-09-03 (supersedes the 6-module read above)

Year 2 is **11 modules** (number-first convention). The five below beyond the six
numbered system modules were previously flagged "secondary / no catalogue id" — Omar
confirms they ARE Year-2 modules:

| Module id | Notes |
|---|---|
| 205 NEU | system module (Anatomy/Histology/Pharm/Physiology) |
| 206 DIG | system module |
| 207 END | system module |
| 208 INT | system module (Pathology/Pharmacology) |
| 210 PAT | system module (Pathology/Pharmacology) |
| 213 PSY | Psychology — NEEDS-OMAR exam source (no exam material in corpus) |
| 227 MPE | Medical Psychology / Ethics (was `2ry Modules/MPE-227`, 9 files) |
| 230 EPE | Evidence-based Practice / Epidemiology (was `EPE-230`, 17 files) |
| 234 RES | Research (was `RES-234 Research`, 21 files) |
| 235 CMP | Computer / Computing (was `2ry Modules/Computer`, 2 files) |
| SSC 1 | Student-Selected Component 1 |

**Priority (Omar): EOM / EOY / department sources first.** The six system modules
(205/206/207/208/210 + 213-when-sourced) hold the exam banks and lead. 227/230/234/235/SSC1
are covered after, prioritising any EOM/EOY/dept material they contain (mostly
instructor/revision files — triage for real exam sittings first). Health Economics &
Entrepreneurship folders remain uncatalogued — flag for Omar if they need ids.
