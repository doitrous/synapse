# LANE-CARD — Alexandria University Year 1 (au)
Read this card first. Open `LANE-BRIEF.md` (§1–§24) or the full manual only when you hit a wall; name the wall in your report.

## 1. Identity and ids
University id `au`. Years `AU_Y1`–`AU_Y3` (Year 1 only is active — Years 2–3 stay frozen until Omar says RESUME). Module ids `AU-<CODE>` — uppercase, hyphens, no spaces: `AU-MED-102`, `AU-MED-105`, `AU-UNI-104`. Concepts are minted university-blind (§4 below) — most Alexandria ideas already exist as Kasr concepts; only genuinely new ones mint `CON-<SYSTEM>-<14hex>` fresh. Files: `docs/Alexandria-Source-Imports/{concept,article,question,evidence,coverage,pending-live,academic,manifest}/`.

## 2. The ten rules that cannot bend
Same ten as every lane, plus (§3 LANE-BRIEF): never `git commit`/`push`/import — a batch is finished when it validates clean, the orchestrator lands it. Floors: concept ≥ 50/52, article ≥ 49/53, MCQ ≥ 46/50. One (module, subject, kind) per file, named `<MODULE-SLUG>-<subject>-<kind>.md`.

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages/call), `status` first. **Duplicate files are common**: roughly half the corpus exists twice, `X.pdf` and `X [from Alexandria University Updated].pdf` — these twins are **not byte-identical** (1,334 pairs share no hash; 1,424/2,163 disagree on `textLayer`). The manifest records `nameTwinOf` / `twinPreferred` / `contentTwinOf` — read and cite the preferred one, never the twin blind. Answer keys hide in highlights, a separate `answers` file, or a mock's second half — read `SHARED-TOOLCHAIN.md` → *Recovering an answer key* before recording one.

## 4. Author: seed → emit → gate
seed dir: `docs/Alexandria-Source-Imports/coverage/seeds/<module>/` (create if new) · `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <the module's concept + article files>` · `node scripts/content/gate.mjs simulate <files, apply order>` (no `--with`) · never read the `.gates/` log unless the summary shows errors. Labelling/spot-id questions: leave `labeling_image` blank, `media_recommendations: Priority: required` — `medical:batch`'s "a labelling question needs an image" error on those rows is expected, not a defect (see `question/AU-MED-105-anatomy-practical-mcq.md`, 29 of 32 items).

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<module>-triage-keys.txt --out coverage/<module>-LEDGER.md` after every commit. `pending-live/INDEX.md` is **append-only** — one lane overwrote it wholesale and dropped three lanes' rows; add your row with an Edit at the end, never rewrite the file.

## 6. Commit rhythm
First commit within minutes; commit + push every 5–10 questions. Report ≤ 20 lines to the chief-of-staff session (Alexandria has no separate orchestrator any more), ends `HANDOFF: <branch>@<sha> · resume-first: <next>`.

## 7. This lane's known traps
- **A four-digit number in a filename is a graduating cohort, not a sitting year** (`Final CNS 2027`). The sitting year comes only from the paper's own printed header.
- **`مصريين`/Egyptian and `وافدين`/wafdeen** are two streams of the same sitting — record the stream, not a second year.
- Six per-university tags on every record: `+au`; the AU year (concepts use `learner_years`, not `years`); `+AU-MED-xxx` in `modules`/`module`; `module_subject` **REPLACES** — restate the full union (Kasr's paths + ours), never `+`; `exam_weight_by_year` with the exact `AU_Yn` key (a wrong id hides the record from that year's blueprint entirely); `university_notes` (article kind only — concepts put `au: <src, page>` in `field_notes`; questions/practicals in `coverage/00-university-notes-ledger.md`).
- A question testing a HIT-PENDING (Kasr) concept is authored **now**, filed in `pending-live/<slug>-questions.md` with an apply-after line naming the Kasr concept+article files — never deferred.
- Two-sided coverage: a tested concept is covered only when an article **names it in `related_concepts` AND teaches it** — a concept-side `article_ids` alone (Kasr's heuristic `build-article-links.ts` output) is not coverage; some of those links are wrong on their face.
- Convention clash (e.g. 38 vs 30–32 ATP/glucose): keep the bank's printed key, name the convention in one sentence in `explanation_<correct>` — never sparse-update the Kasr concept's `definition` (Kasr Y1 owns that record).
- `related_articles` is a prose-list column: `[clear]` there stores a literal broken reference — write real content or omit the key with a `field_notes` reason.

## 8. Walls → where the answer lives
Everything §-numbered above is `LANE-BRIEF.md` §<n>. Gate/tool shape → SHARED-TOOLCHAIN §Content CLI. Id/search/overlay law → `00-START-HERE.md` §3–4. Explanation/coverage bar → `05-questions.md`. Owed lanes and current state → `HANDOFF.md`.
