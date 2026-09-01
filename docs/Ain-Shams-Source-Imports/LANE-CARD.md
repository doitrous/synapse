# LANE-CARD — Ain Shams University Year 1 (asu)
**No separate LANE-BRIEF.md exists for this lane — this card is the brief.** Read this card first; open the full manual only at a wall named in your report. **Years 2–3 have their own companion card, `LANE-CARD-Y2-3.md`** (this file was already near the 6 KB cap) — read that one alongside this one for any Y2/Y3 work.

## 1. Identity and ids
University id `asu`. Years `ASU_Y1`–`ASU_Y3`. Module ids `ASU-<CODE>` — uppercase, hyphens: `ASU-IBM` (Introduction to Medical Biochemistry), `ASU-HCB`, `ASU-GPHARM`, `ASU-BLOOD`, `ASU-CVS`, `ASU-AE`, `ASU-IMM`, `ASU-RESP`, `ASU-RES-METH-3`, `ASU-COMM`. Concept ids mint university-blind — one canonical key gives one id regardless of who mints it, so ASU biochemistry overlaps heavily with existing Kasr/Alexandria concepts (§7). Files: `docs/Ain-Shams-Source-Imports/{concept,article,question,evidence,coverage,pending-live,manifest,resource}/`.

## 2. The ten rules that cannot bend
Same ten as every lane. Corpus root `/Users/doitrous/Desktop/ain shams`. Claims here are labelled `needs_evidence`, citations non-counting local-curriculum support — never describe them as verified or publication-ready until an evidence pass runs.

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages/call), `status` first. ASU-IBM's one MCQ source is a CamScanner-style low-contrast scan: `pdftotext` returns 0 words on many pages AND `tesseract` fails too (near-0 words despite legible-to-the-eye text) even after grayscale/autocontrast/300dpi re-render — mark those pages garbled and render-and-read by eye; do not assume OCR failure means the page is unrecoverable. Rule: `status` → `show`; `words=0` → `pagetext.mjs ocr`; `render` ONLY that one page if the OCR text is unreadable (as with ASU-IBM above). Cite by grep: search the cache for the fact's key words, read only the hit page.

## 4. Author: seed → emit → gate
seed dir: `docs/Ain-Shams-Source-Imports/coverage/seeds/<module>/` (create if new) · `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <the module's concept + article files>`. **ASU-IBM biochemistry specifically**: most Protein/Carbohydrate/Lipid concepts already exist as pending Kasr or Alexandria records — gate with `--with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md` (and `101-ISK-mcq-concepts.md` for any cytology/membrane fact) named alongside your own files, and file the overlay as `pending-live/<slug>-overlay-concepts.md` with an apply-after line naming which source file it targets (A/B/C — see `pending-live/ASU-IBM-biochem-mcq-overlay-concepts.md` for the worked pattern). `node scripts/content/gate.mjs simulate <files, apply order>` (positional only, no `--with`).

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-triage-keys.txt --out coverage/<module>-LEDGER.md` after every commit. `coverage/ASU-IBM-triage.md` is the worked example of a triage doc: papers read, answer-key recovery method, block-level concept table, live-hit spot-checks, totals.

## 6. Commit rhythm
First commit within minutes; commit + push every 5–10 questions. Report ≤ 20 lines to the chief-of-staff session, ends `HANDOFF: <branch>@<sha> · resume-first: <next>`.

## 7. This lane's known traps
- **Search before mint is not optional here**: ASU-IBM spot-checks found real live/pending overlap on general biochemistry building blocks (`peptide bond` 19 hits, `sphingomyelin` 29 hits, `glycosidic bond` 7 hits, `alpha helix` 2 hits) but zero hits on clinically-flavoured or terminology-specific facts (isoelectric point behaviour, chaperone function, denaturation mechanism) — run the four-query search (§4 of `00-START-HERE.md`) per concept, do not assume the whole cluster is new or the whole cluster is a duplicate.
- **Lecture-only topics with no matching MCQ/written/practical file are "needs Omar sources"**, not an invitation to author from the lecture PDF alone (ASU-IBM: 5 enzyme lectures, 2 glycolysis, 2 "Introduction to Metabolism", one orientation lecture — none have any assessment file in the manifest).
- Subject placement for ASU biochemistry-of-metabolism concepts with no body-system anchor: `fnd` (open question, flagged in ASU-IBM/ASU-HCB/ASU-AE triage files alike — do not invent a different subject).
- `pharm` concepts still need an explicit body-system (`FND` or `INF`) per the manual — ASU inherits this from the shared mint, it is not Kasr-only.
- A branded external question bank (e.g. "Biochemistry Academy") can appear verbatim across multiple universities' corpora — treat a suspiciously familiar bank as a search-first case, not a fresh source.

- **ASU-MBG cluster 6 (Gene Expression)**: the scan's answer keys are blacked out — a real printed key that is unreadable, so HOLD every row (never key editorially); logged as needs-Omar.

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3–4. Gate/tool shape → `SHARED-TOOLCHAIN.md` §Content CLI. Explanation/coverage bar → `05-questions.md`. Reviewer/publisher and answer-key rulings → `docs/chief-of-staff/HANDOFF.md` "Standing orders". No ASU-specific hazards register exists yet — if you find one, start `docs/Ain-Shams-Source-Imports/LANE-BRIEF.md` rather than letting it live only in a report.
