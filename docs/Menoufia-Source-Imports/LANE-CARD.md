# LANE-CARD — Menoufia University Year 1 (mu)
Read this card first; open the full manual only at a wall, and name the wall in your report. **Phase-0 triage lane** reporting to the chief of staff — mint nothing, author nothing until the chief of staff replies the literal phrase **"TRIAGE APPROVED"**.

## 1. Identity and ids
University id `mu` (already an empty shell in `src/data/universities.ts` — do not edit that file from this lane). Year id `MU_Y1`. Module id prefix `MU-<CODE>`, bare, no hyphen inside the code (`MU-MED101`… `MU-E101`, `MU-UNI101`) — eleven Year-1 shells, five with no local sources (`MU-E101`, `MU-UNI101`, `MU-MED107`, `MU-UNI102`, `MU-E102`). Concept/article/question ids: standard shapes (00-START-HERE.md §3), nothing lane-specific yet since nothing is minted. Files: `docs/Menoufia-Source-Imports/{manifest,academic,coverage}/` (concept/article/question/evidence dirs created at S2, post-approval).

## 2. The ten rules that cannot bend
1. Printed keys stand as printed; a conflict is a hold, never an inference.
2. `explanation_<correct>` ≥ 3 sentences; one explanation per distractor.
3. Law of voice: state the medicine; provenance only in field_notes / citations.
4. Search before mint: `Instruction Manual for Content Creation/tools/find-existing.mjs` + `grep -ril <canonical_key> docs/*-Source-Imports/concept/`; a hit → sparse overlay, never a full-record overwrite.
5. Teach before test: a question's main concept must have an article that names it in `related_concepts` and teaches it.
6. Six per-university tags on every record: `universities` (+mu), `learner_years` (+MU_Y1), `modules` (+MU-<CODE>), `module_subject`, `exam_weight_by_year` (`MU_Y1=<weight>`), `university_notes` (article-only).
7. Reviewer/publisher = "Medical team, Admin team" / "Admin team".
8. Never hand-edit a generated batch; fix the seed and re-emit.
9. Media: describe nothing in prose that the image shows; `media_recommendations: required` → record imports as Draft; labelling questions HARD-reject without an image.
10. Missing key (nothing printed, nothing recoverable) → key editorially + field note; garbled key → hold + mark the page garbled.

## 3. Read text, don't look at pictures
Source root: `/Users/doitrous/Desktop/Universities/Menoufia University/Faculty of Medicine/Current Basic 5-Year M.B.B.Ch/Year 1/`. `node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3/call). `status` first. Only a garbled page may be rendered (`mark-garbled` then `render`) — **except this lane's own trap (§7)**: several "Answers" PDFs have a clean text layer but a visual-only key. `render --force` one page per source to check its convention first. Readability index: `coverage/MU-Y1-readability-index.md` (S1b, backgrounded — confirm it landed before relying on it).

## 4. Author: seed → emit → gate (not reached — Phase-0 only)
When S2 starts: seed dir `docs/Menoufia-Source-Imports/seeds/<module>/` (create it) · `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <sibling concept/article files>` · `node scripts/content/gate.mjs simulate <files in apply order>` (positional only, no `--with`) · don't read `.gates/` unless the summary shows errors.

## 5. Progress ledger (not reached)
When S2 starts: `node scripts/content/ledger.mjs <seed dir> --triage coverage/MU-<module>-triage-keys.txt --out coverage/MU-<module>-LEDGER.md` after every commit.

## 6. Commit rhythm
First commit within minutes (S0 + S1). Commit each deliverable as it lands, push after every commit (branch `menoufia-y1-phase0`, tracks `origin`). Report ≤ 20 lines, ends `HANDOFF: <branch>@<sha> · awaiting TRIAGE APPROVED`. **STOP at the checkpoint** — no S2 without the literal phrase from the chief of staff.

## 7. This lane's known traps
- **Visual-only answer keys** — confirmed on 4 files, 3 conventions (red text / underline / grey highlight), none in the text layer; assume every "Answers" source needs a rendered page. Some scans are also angled phone photos with a "Make Watermark" stamp that defeats default OCR (<20 words/page) but still render fine — "fully garbled" doesn't mean unusable.
- `CLAUDE-HANDOVER.md` on `codex/review-existing-work` is **superseded**: its "STOPPED"/"after Mansoura" lines no longer apply (Omar ordered Menoufia now, 2026-09-02) — read it only for source paths and the "1,089 vs 1,093" question (answered: 1,093 is correct, see `manifest/y1-sources.md`).
- The corpus's own folder taxonomy (`01 University Material` … `08 Resit and Baqoon`) already encodes kind/tier — trust the folder, don't re-guess kind from the filename.
- Zero exact-duplicate (sha256) files across all 1,093 — but many **near-duplicate variants** of the same real exam recur under different "group"/"support batch" filenames (MED104's MSK1/MSK2 end-module exams ~4–6× each); not caught by the sha256 twin check, dedupe by content when reading a module in full.
- MED106's official marks conflict between two faculty sources (30 vs 45) — printed as found in `academic/MU-Y1-modules.md`, not resolved.
- Five modules (E101, UNI101, MED107, UNI102, E102) have zero local sources; official marks exist, no content — never invent it.
- Telegram is retired here; a genuine Telegram-only gap gets logged "needs Omar sources", never chased.

## 8. Walls → where the answer lives
Id/search/overlay law → `00-START-HERE.md` §3–4. Gate/tool shape, `pagetext.mjs` render/OCR contract → `SHARED-TOOLCHAIN.md` §Content CLI. Pipeline stages, triage-checkpoint table shape → `13-orchestration.md` §4–5. Explanation/coverage bar → `05-questions.md`. Academic import-batch format → precedent `docs/Alexandria-Source-Imports/academic/au-modules.md` header. This lane's state → `manifest/y1-sources.md` (S0), `academic/MU-Y1-modules.md` (S1), `coverage/MU-Y1-priority-sources.md` (S2), `coverage/MU-MED104-triage.md` (S3).
