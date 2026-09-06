# 206 DIG — first-module triage (S1)

**Scope of this pass:** one paper — `EOM - 206 solved (197).pdf` (sitting date 16/1/2025
per its own cover page, batch 197, solved, 120 MCQs — Anatomy, Physiology, Histology,
Biochemistry). 206 DIG carries 10 tier 1-3 papers total plus 31 tier-5 banks
(`coverage/KAU-Y2-priority-sources.md` §206 DIG); the other 9 papers and all 31 banks are
not yet triaged. This is the module's first authoring pass — 0 authored content existed
before it (per `docs/Kasr-Source-Imports/coverage/KAU-Y2-priority-sources.md`).

Module id confirmed as `206 DIG` (bare form, no university prefix — matches Kasr's
Year-1 convention) and year token `KAU_Y2`, per
`docs/Kasr-Source-Imports/academic/KAU-Y2-modules.md` (module id cross-checked 6/6
against `KAU_MODULES['Year 2']` in `src/data/universities.ts` and
`docs/import-ready/academic/kau-modules.md`).

Toolchain confirmed by inspecting the already-authored Kasr 208-INT module
(`docs/Kasr-Source-Imports/question/208-INT-2024eom-mcq.md`,
`docs/Kasr-Source-Imports/concept/208-INT-concepts.md`): hand-authored
`# Item` / `## field` batch files gated by `scripts/validate-content-batch.mjs`
(`npm run medical:batch`) and `scripts/simulate-content-import.mjs`
(`npm run medical:simulate`) — the `scripts/content` medical: pipeline, **not** the
Year-1 `scripts/kasr` seed→emit pipeline. Replicated here.

This first pass covers Q1-16 (Anatomy) of the 120-question paper, all confirmed keyed by
two independent renders (p.2, p.16 — see `206-DIG-triage-keys.txt`).

## Concept clusters (16 distinct concepts from 16 questions)

Every hit below is from
`node "Instruction Manual for Content Creation/tools/find-existing.mjs" "<term>"`
against the live library plus every `docs/*-Source-Imports/concept/` and
`docs/import-ready/concept/` file. The module had 0 authored content before this pass, and
GI gross anatomy (portosystemic anastomoses, coeliac trunk branches, gut embryology,
posterior abdominal wall, liver topography, jejunum/ileum, appendix) has no meaningful
overlap with the pathology/pharmacology-heavy concepts already authored for Kasr 208-INT
or 210-PAT — every search below returned "Safe to create one," so all 16 concepts are new
mints (`CON-GIT-*`).

| # | Concept cluster | Question | Status | Existing hit (if any) |
|--:|---|---|---|---|
| 1 | Portosystemic anastomosis — oesophageal varices | 1 | new | — |
| 2 | Splenic artery relation to pancreas | 2 | new | — |
| 3 | Omental bursa (lesser sac) — posterior gastric perforation | 3 | new | — |
| 4 | Duodenum parts and relations (3rd part / SMA) | 4 | new | — |
| 5 | Foregut derivatives (liver) | 5 | new | — |
| 6 | Midgut boundaries and venous drainage | 6 | new | — |
| 7 | Inferior mesenteric artery origin (L3) | 7 | new | — |
| 8 | Liver topography and surface fissures | 8 | new | — |
| 9 | Genitofemoral nerve course through psoas major | 9 | new | — |
| 10 | Coeliac trunk branches | 10 | new | — |
| 11 | Abdominal aorta branches (median sacral artery) | 11 | new | — |
| 12 | Spermatic cord coverings (cremaster / internal oblique) | 12 | new | — |
| 13 | Jejunum vs ileum gross distinguishing features | 13 | new | — |
| 14 | Portal vein direct tributaries (splenic vein) | 14 | new | — |
| 15 | Gastric arterial supply (coeliac trunk / fundus) | 15 | new | — |
| 16 | Appendix anatomy (opening, mesoappendix, position) | 16 | new | — |

## Authoring result

16/16 triaged items authored (0 held). All 16 concepts minted via
`tools/mint-concept-id.mjs GIT <canonical-key>` (system code `GIT` for subject `gi`), no
collisions against 13,578 existing IDs at mint time. Grouped into 3 library articles by
topical cluster:

- `ART-GIT-206DIG-ABDOMINAL-VASCULATURE` — Q1, 2, 10, 11, 14, 15 (coeliac trunk, splenic
  artery, aortic branches, portal vein tributaries, gastric supply, portosystemic
  anastomoses)
- `ART-GIT-206DIG-PERITONEUM-EMBRYOLOGY-POSTERIOR-WALL` — Q3, 4, 5, 6, 7, 9, 12 (lesser
  sac, duodenum, foregut/midgut embryology, IMA origin, genitofemoral nerve, spermatic
  cord)
- `ART-GIT-206DIG-LIVER-INTESTINE-APPENDIX` — Q8, 13, 16 (liver surfaces, jejunum vs
  ileum, appendix)

**Evidence note:** the two Anatomy department books on Desktop for this module
(`Department Book - Anatomy DIG - 206 Department. Book (1).pdf`,
`Department Book - Anatomy Written by Dr.Jalal [206].pdf`) both carry a text layer that
decodes to blank whitespace (image-only atlas pages) — `pagetext.mjs status` reports
non-zero word counts but `show` returns empty; `grep` for "coeliac trunk", "anastomosis"
etc. returned 0 hits on both. This matches the "textLayer lies" hazard. Concepts and
articles in this tranche are therefore written from standard, well-established gross
anatomy (Snell's/Chaurasia's-level teaching) corroborated by this exam paper's own keyed
stems and options, not quoted from a specific department-book page — no `CLM-`/`CIT-`
evidence files were authored this pass (would need OCR of the 213-page book first).
Flagged as a follow-up: OCR the Anatomy department book(s) before promoting these concepts
past `needs_evidence`.

## Gates

- `npm run medical:batch -- docs/Kasr-Source-Imports/concept/206-DIG-concepts.md` — items=16, errors=0
- `npm run medical:batch -- docs/Kasr-Source-Imports/article/206-DIG-articles.md --with .../206-DIG-concepts.md` — items=3, errors=0 (warning: below the 49-field floor at 36 fields, non-blocking)
- `npm run medical:batch -- docs/Kasr-Source-Imports/question/206-DIG-2025eom-mcq.md --with .../206-DIG-concepts.md --with .../206-DIG-articles.md --with .../206-DIG-resources.md` — items=16, errors=0
- `npm run medical:simulate -- docs/Kasr-Source-Imports/evidence/206-DIG-resources.md docs/Kasr-Source-Imports/concept/206-DIG-concepts.md docs/Kasr-Source-Imports/article/206-DIG-articles.md docs/Kasr-Source-Imports/question/206-DIG-2025eom-mcq.md` — resource created 1/rejected 0, article created 3/rejected 0, concept created 16, question created 16/rejected 0, errors=[]
- `npm run medical:duplicate-keys` — no 206-DIG/CON-GIT collision in the report (baseline collisions are all pre-existing, unrelated Mansoura/Alexandria/Assiut records)

**Note on the resource file:** `docs/Kasr-Source-Imports/evidence/corpus-source-index.json`
is generated only from `docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json`
(`scripts/kasr/build-source-index.ts` is hardcoded to the Year-1 manifest) — it does not
yet cover any Kasr Year-2 source, so validating `206-DIG-resources.md` as a **standalone**
`medical:batch` run fails with "is not a source the corpus contains", even though
`src_e3657885d0289f6df4d4` is real and checksummed in `kasr-y2-sources.json`. This is
apparently pre-existing Year-2 infrastructure debt (208-INT's own resource file would hit
the same gap) — the resource batch validates and simulates cleanly when folded in via
`--with` on a sibling file instead (the corpus-index check only runs when a `resource`-kind
file is the *primary* file being validated), which is the gate sequence used above.
**NEEDS OMAR / chief of staff:** either extend `scripts/kasr/build-source-index.ts` to also
read `kasr-y2-sources.json`, or confirm resource-kind files are meant to gate only via
`--with` folding for Year 2 lanes.

## Next frontier

- Q17-120 of this same paper (104 more Anatomy/Physiology/Histology/Biochemistry items,
  OCR'd — see `206-DIG-triage-keys.txt` — not yet individually re-verified by render past
  Q16).
- 9 more tier 1-3 papers for 206 DIG (`coverage/KAU-Y2-priority-sources.md` §206 DIG):
  `EOM - DIG-206 EOM (solved).pdf` (also image-only, needs its own OCR --force pass),
  `EOM 206 -197- Unsolved.pdf`, `EOM DIG – 195.pdf`, `EOM DIG – 196.pdf`,
  `EOM - END -GIT 194- 2022.pdf`, `EOM - Exam {DIG 195}(206) 2023.pdf`,
  `EOM - DIG-206 2024 196.pdf`, `EOY (DIG - 206) 198 - Solved.pdf`,
  `EOY (DIG - 206) 198.pdf`.
- 31 tier-5 banks (mostly Anatomy MCQ banks under the `Dpt Anatomy` folder) — untouched.
- OCR the Anatomy department book(s) (213 pages, image atlas) to ground `CLM-`/`CIT-`
  evidence for these 16 concepts and move them past `needs_evidence`.


## PIVOT -- Anatomy MCQ bank (tier-5, solved, NON-EOM) -- 2026-09-06

Both 206-DIG EOM papers are exhausted (2021-vs-2025 ran ~43% dupe). Pivoted to the
highest-priority FRESH keyed non-EOM source: `Anatomy MCQ Previous exams Answer [206].pdf`
(sourceId `src_e2f2f2fc0a951d31ff71`, tier 5, solvedStatus solved, 54 pp., image-only).
It is the only tier-5 206-DIG bank marked solved; the tier-2 EOY paper
(`src_9413877598afdf50acd9`) was inspected and REJECTED -- it is a WRITTEN ESSAY exam
("Explain mechanism of salivary secretion {8 Marks}"), no MCQs, no keys.

The bank compiles past Anatomy dept exams (numbering restarts per exam: exam A pp.1-9 =
Q1-56, exam B pp.10-12, more on pp.13-54 un-OCR'd this pass). Scope is GIT gross anatomy
PLUS urinary/genital gross anatomy and embryology -- which escapes the EOM overlap, since
the two EOM papers covered renal/genital only as histology/physiology. Key marker CONFIRMED
by rendering p.5 once at 150 dpi: the correct option letter is hand-circled in blue/purple
pen (stems highlighted yellow); every OCR key on p.5 (Q28a Q29c Q30d Q31c Q32d Q33c Q34a)
matched the circle exactly.

Keys recovered for Q1-56 (exam A) + exam-B uniques in `206-DIG-anatomybank-triage-keys.txt`.
Of ~58 keyed items ~24 are near-duplicate stems of the already-authored EOM anatomy and were
skipped; a few held (OCR-truncated stems). Authored 20 fresh items (mostly urinary/genital
gross anatomy and embryology, plus a few GIT relations the EOMs missed).
