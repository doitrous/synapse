# AU-MED-202 · Gastrointestinal System and Nutrition & Clinical Skills (4) — question-led triage

Module `AU-MED-202`, Year `AU_Y2`. Had **zero authored content** before this pass — first
triage of this module — per `coverage/AU-Y2-priority-sources.md` §202 (10 real EOM/EOY
papers, ~99 banks after papers are pulled out, "0 (not yet read this pass)").

## Scope of this pass

Six candidate keyed/claimed-keyed papers were checked with `pagetext.mjs status`/`keys`/
`show` before one was selected for full triage:

| File | Pages | Result |
|---|--:|---|
| `EOM - GIT formative alex with answers.pdf` | 23 | Scanned (TapScanner), image-dependent (labelled diagrams A/B/C), bullet-glyph key — same visual-key trap flagged AU-MED-203-wide. Not usable via text extraction alone. |
| `EOM MCQs - Dr_ Agha GIT Exam With Answers.pdf` | 22 | Not MCQs — a "GIT Practical Exam" of short-answer/essay prompts (biochemistry). Wrong format. |
| `EOM MCQs - GIT Exam Model Workshop.pdf` | 33 | 105 native-text MCQs, no printed answer key anywhere in the file. Unusable without a key. |
| `EOM - Mock with answers.pdf` | 19 | `pagetext.mjs keys` found 0 keyed/0 unmarked across 19 pages — no MCQ-pattern text detected (likely scanned/image). Not triaged. |
| `EOM MCQs - Mock & Previos years.pdf` | 25 | 96 questions detected, 0 keyed by `pagetext.mjs keys` — no recovered answer key. Not triaged. |
| **`EOM MCQs - GIT Final.pdf`** (`src_9e20cef26baccba1d5e7`) | 23 | **Selected.** Native-text, multi-department compiled bank (Anatomy p2-8, Histology p10-12, Physiology p14, Biochemistry p16-20), each block of 4-5 questions followed by its own printed answer line (e.g. `1. b 2. c 3. b 4. a 5. d`) — the same reliable in-page key format used across the corpus. |

## This pass: the Anatomy section (Q1-34, pages 2-8)

Read in full via `pagetext.mjs show`, keys transcribed from each page's own printed answer
line (6 blocks: p3, p4, p5, p6, p7, p8). Covers pancreas peritoneal relations/blood supply/
ducts, the portal venous system and its three portosystemic anastomoses (oesophageal,
umbilical, anorectal), jejunum-vs-ileum and the root of the mesentery, caecum/appendix
clinical anatomy, and large-intestine peritoneal covering.

**34 questions read → 28 authored, 1 held, 5 collapsed as duplicate angles on an
already-authored question** (not separately counted concepts, but each still emitted as
its own question item reusing the first question's `main_concept`):

- Q5 (posterior wall of the lesser sac) / Q16 (what separates stomach from pancreas) — same fact.
- Q9 (IMV terminates in splenic vein) / Q14 (same, reworded) — same fact.
- Q10 (anorectal portosystemic anastomosis partners) / Q34 (same anastomosis, "except" framing) — same fact.
- Q22 (root of mesentery does NOT cross left ureter) / Q29 (root of mesentery DOES cross right gonadal vessels) — same fact, complementary framing.
- Q24 (umbilical referred appendiceal pain, case) / Q32 (same fact, direct question) — same fact.

**Held (1):** Q28 — "All of the following are considered characteristic feature of large
intestine ... Except: B" where B ("teniae coli are shorter than the length of large
intestine") is itself the accepted anatomical fact (why sacculations form), leaving no
internally consistent false option among A-D. Likely OCR-garbled ("The length of of tenia
coli...") or a genuinely ambiguous source item. Not authored — see
`coverage/seeds/AU-MED-202/gitfinal-anatomy.json` question `gitfinal-q28` and
`coverage/AU-MED-202-LEDGER.md`.

## Concept reuse check

All 28 canonical keys were checked via
`Instruction Manual for Content Creation/tools/find-existing.mjs` against live state and
every `docs/*-Source-Imports` pending batch before minting (celiac trunk, paraumbilical
vein, portal vein, lesser omentum, gastroduodenal junction, head of pancreas, coeliac
trunk, inferior mesenteric vein, portosystemic anastomosis, jejunum, tenia coli, root of
mesentery, caecum, McBurney, appendicitis, psoas test, appendectomy, large intestine,
sigmoid colon and more). No live or pending hit for any of them — GIT facts already live
from Kasr's module 206/Year 1 pass cover secretion/motility/biochemistry topics, not this
bank's gross-anatomy relations, so no reuse applied. All 28 concepts minted fresh under
`CON-GIT-*` (system code GIT, per
`Instruction Manual for Content Creation/tools/mint-concept-id.mjs`).

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts | Live-hit | Pending-hit | New (minted) | Held |
|---|--:|--:|--:|--:|--:|--:|--:|
| AU-MED-202 (GIT Final, Anatomy section only) | 34 | 34 | 28 | 0 | 0 | 28 | 1 |

## What was NOT triaged this pass

Only the Anatomy section (Q1-34) of `EOM MCQs - GIT Final.pdf` was read question-by-question
and authored. The same file's Histology (p10-12, 15 Qs), Physiology (p14, 5 Qs) and
Biochemistry (p16-20, ~25 Qs) sections carry their own printed answer keys in the same
reliable format and are the natural next-frontier target — see `pagetext.mjs show
"…/EOM MCQs - GIT Final.pdf" --pages 10-20` for the extracted text already confirmed
readable. The module's other 9 papers and ~99 banks (per `AU-Y2-priority-sources.md` §202)
remain untriaged, including the once-checked-and-rejected papers listed above (three of
which may still be recoverable with a rendered-page/visual-key read rather than plain-text
extraction: `EOM - GIT formative alex with answers.pdf`, `EOM - Mock with answers.pdf`,
`EOM MCQs - Mock & Previos years.pdf`).
