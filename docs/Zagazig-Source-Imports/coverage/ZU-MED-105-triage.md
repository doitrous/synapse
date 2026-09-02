# ZU-MED-105 (Professional Practice I) — S3 first-pass triage

Four sources named in `coverage/ZU-Y1-priority-sources.md` §ZU-MED-105, all under
`_Staging/Telegram Year 1/Fakous Medical Data/Professional Practice I/`. Three tier-1
papers fully triaged this pass; the tier-2 bank (`mcq شامل.pdf`) is status-checked
only (native text, not garbled) and catalogued for a follow-up pass — the three tier-1
papers already yield 77 keyed SBA items, comfortably over this dispatch's ~35-50
authoring target.

## Source: `Zag P.P1 Final 2024.pdf` (Zagazig main-campus Final, 3 pages)

Native PDF text, not garbled (`pagetext.mjs status`: 102/133/120 words/page). 12 SBA
questions, **printed answer key line at the bottom of every page** (e.g. page 1: "1) D
2) B 3) C 4) C"), read directly via `pagetext.mjs show --pages 1-3` — no OCR or render
needed. **12/12 keyed (100%).** Topics: checklist tool/self-assessment, physician-patient
trust, accountability model, team-development stages (storming), justice principle,
professionalism/feedback, compassion, early professionalism education, emergency consent
exception, conflict-resolution strategy (compromising), professionalism's role in public
trust, self-assessment method.

## Source: `Fakous P.P1 Final 2024.pdf` (Fakous-campus Final, 2 pages)

`pagetext.mjs status` reported page 1 `words=0 garbled=yes` (Microsoft-Lens-style scan)
and page 2 `words=4` (near-empty — most of the page's content turned out to be the
fill-in-the-blank answers themselves, printed as short isolated words with no visible
question stems in plain extraction). `pagetext.mjs ocr --pages 1-1` recovered 269 words;
page 2's native text was legible as-is. Header: "Professionalism – Final Written Exam",
18 marks total, mixed format — definitions (2), list/enumerate items (not MCQ), and
**7 SBA items (i–vii, "Choose the correct answer", 7 marks)** plus a 4-blank
fill-in-the-blank section (not MCQ, not authored).

**Key-recovery method:** no native text layer on page 1 (OCR-only) and pdftotext's
plain extraction on both pages shows no key markers, so `pagetext.mjs keys` cannot be
trusted here either (same underlying "no native text layer to check" class of trap
documented for MSK's Fakous scans in `coverage/ZU-MED-104-triage.md`). **Confirmed by
`render --force`, one render per page (2 renders, both pages)**: every one of the 7 SBA
items carries a light-blue background highlight over the correct option letter/text —
a clean, unambiguous mark type, distinct from both the MSK/CPS ink-corruption trap and
this same lane's own third source below. **7/7 keyed (100%).** Keys: i) d, ii) c, iii) d,
iv) b, v) c, vi) c, vii) d. Topics: physician-patient relationship onset, vertical equity,
justice (organ allocation), mental-capacity consent proxy, checklist tool use, leadership/
conflict-resolution, team-development stages (storming). The fill-in-the-blank section
(negligence/trust/accountability/responsibility) is legible and printed but not SBA — not
authored this pass, logged for a possible future short-answer format.

## Source: `امتحانات سابقه.pdf` ("Past exams" compilation bank, 13 pages)

Native PDF text, not garbled, 70 SBA questions (numbered 1–76 with source-side gaps at
6–10 and 18) across topics that duplicate and extend both Final papers' own material:
self-awareness, emotional intelligence, goal-setting, time management, stress, team
development, leadership styles, core-team composition, consent/confidentiality ethics,
justice/equity, professionalism duties.

**New trap this lane found, not yet documented elsewhere in this corpus: a gray/silver
cell-shading answer-key mark that `pagetext.mjs keys` cannot see at all.** `keys` reported
**1 keyed (Q16, red-text) / 0 ambiguous / 69 unmarked across 13 pages** — not because the
marks are invisible, but because `pdf_visual_keys.py` checks span text-color, bold, thin
underline-height drawings and PDF annotation objects (Highlight/Underline/StrikeOut/
Square/Ink), and this source's mark is none of those: it is a **filled gray rectangle
drawn behind the option's text** (a table-cell-style shading, RGB ≈(0.66,0.66,0.66) on
pages 1-8, ≈(0.5,0.5,0.5) on pages 9-13 — two shades, same mechanism), which the shared
tool's drawing-check only looks at for thin underline rules (≤3pt tall), not fills.

Recovered with an ad hoc, read-only PyMuPDF script (not added to the shared toolchain —
`scripts/content/` is shared across the sibling Zagazig lanes and this trap is source-
specific) that walks `page.get_drawings()` for filled rectangles and matches them against
each option line's bounding box. **Confirmed against 4 full-page renders (`render --force`,
pages 1, 2, 4, 7 — 6 renders total this dispatch combined with the two Fakous Final pages,
within the ≤8 budget), 0 mismatches** across marked, unmarked and two-mark-conflict
questions: every fill the script reported matched the rendered image's gray highlight
exactly; the two genuinely-unmarked questions checked by render (Q43, Q44) showed no mark
of any kind on any option; and page 2's render caught a genuine two-mark conflict on Q14
(see Held items below) that the script itself had also reported as two fills — the render
confirmed it as a real source-side conflict, not a detection artifact.

**57/70 keyed (~81%)** via this method. 11 unmarked (`held-no-printed-key`): Q31, Q33,
Q35, Q36, Q43, Q44, Q65, Q66, Q67, Q68, Q73, Q76. 1 held for a source defect
(`held-malformed-source`): **Q24** genuinely prints only 2 options (A/B — "Equity" /
"Confidentiality"), confirmed by both plain text and render, no C/D exists to complete a
4-option SBA. 1 held for a genuine two-mark conflict (`held-indefensible-key`): **Q14**
("stages of team development EXCEPT") has both C "Adjuring" and D "Co-coordination"
gray-filled, render-confirmed on page 2 — Adjuring is a real Tuckman stage so C is not
independently defensible as the "not a stage" answer either, but the rule applied is
two-disagreeing-marks-hold, not pick-the-more-defensible-option.

This pass authors only **pages 1–4 (Q1–Q29, 21 keyed + Q14 + Q24 held)** of this source —
pages 5–13 (Q30–Q76, ~36 more keyed items) are triaged (keys recovered, method validated)
but not yet authored, real remaining scope for the next pass.

## Source: `mcq شامل.pdf` (tier-2 bank, 44 pages) — status-checked, not triaged

`pagetext.mjs status`: native text, not garbled, 44 pages (2 near-empty divider pages).
Not read or keyed this pass — the three tier-1 papers already exceed the ~35-50
authoring target for this dispatch. Catalogued for a future pass.

## Checkpoint table

| Source | Items | Keyed | Method | Renders |
|---|--:|--:|---|--:|
| `Zag P.P1 Final 2024.pdf` | 12 SBA | 12 (100%) | printed key line, native text | 0 |
| `Fakous P.P1 Final 2024.pdf` | 7 SBA (+ non-MCQ items, not authored) | 7 (100%) | light-blue highlight, OCR p1 + render-confirmed both pages | 2 |
| `امتحانات سابقه.pdf` | 70 SBA | 57 (~81%) | gray fill-rectangle behind option text, ad hoc PyMuPDF detection, render-confirmed pp.1/2/4/7 | 4 |
| `mcq شامل.pdf` | ~44 pages, uncounted | — | status only | 0 |

**Condition:** best paper (`امتحانات سابقه.pdf`, largest tier-1 source) is 81% keyed,
comfortably over the dispatch's 60% bar; the two Final papers are both 100% keyed.
**TRIAGE APPROVED condition met.**

## Subject-code check (LANE-CARD requirement)

`src/data/curriculumCatalog.ts` has **no dedicated professionalism/ethics/communication
subject code** — the closest and only defensible fit is `pop` (Population health) >
topic "Ethics, law and professionalism" (subtopics "Ethical practice", "Professional
duties"), which exists and is used for every question in this module's seed. `topic`/
`subtopic` fields on individual questions are free text (as in the ZU-MED-106 worked
example, where `topic: "Head and neck anatomy"` under `subject: resp` doesn't match any
literal catalog node either) — only the `subject` id itself must be a real code, and
`pop` is real, checked directly in the source file.

## Concept search sample

`find-existing.mjs` run with short, literal single-word queries (per the corpus-wide
quirk documented in `coverage/ZU-MED-104-triage.md`) for this module's core terms:
`consent`, `confidentiality`, `justice`, `autonomy`, `leadership`, `professionalism`,
`trust`, `stigmatization`, `equity`, `checklist`, `thyrocervical trunk` (control query,
known to hit) — the control query returned 7 real hits (confirming the tool itself
works), every professionalism/ethics/soft-skills query returned **0 hits**. Direct greps
of `docs/Kasr-Source-Imports/`, `docs/Helwan-Source-Imports/` (including `HU-LCS-103`,
which turned out to be bone/muscle physiology, not professionalism, despite the id
prefix), `docs/MUST-Source-Imports/`, `docs/FOMSCU-Source-Imports/` and
`docs/Mansoura-Source-Imports/` for `consent|confidentiality|professionalism|autonomy|
beneficence|non-maleficence` found only incidental one-off mentions inside large
anatomy/biochemistry articles (e.g. `101-ISK-anatomy.md` using "autonomy" in an
unrelated sentence), never a dedicated concept or question record. **This module's
professionalism/ethics/soft-skills content is genuinely new territory in this corpus —
expect the authored cluster to be almost entirely fresh mints, not overlays.**

## Needs Omar / next-pass flags

- The gray-fill-rectangle key convention (`امتحانات سابقه.pdf`) is a new trap for this
  corpus; flagging here in case a sibling lane (103, or a later ZU-MED-105 pass) meets
  the same source family — the ad hoc detection script is not in the shared toolchain,
  described above in enough detail to reproduce if needed.
- 36 more keyed SBA remain untouched in `امتحانات سابقه.pdf` (pages 5-13, Q30-Q76,
  minus the 11 already-flagged unmarked items) — real remaining scope for a follow-up
  pass on this same module.
- `mcq شامل.pdf` (tier 2, 44 pages) not opened this pass.
- Fakous P.P1's 4-blank fill-in-the-blank section is legible and keyed (printed answers)
  but not single-best-answer format — not authored, flagged in case a future pass wants
  a short-answer question type for it.
