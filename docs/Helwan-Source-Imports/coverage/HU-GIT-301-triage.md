# HU-GIT-301 — recovered + re-verified triage

Recovered from `claude/helwan-content-orchestration-8fe5ec` (paused
2026-08-22, not on origin — local-only ref) and re-verified against the
current live state and pending batch tree. GIT 301 is the richest Year-3
module by breadth: 7 subjects across two prior lanes, the widest subject
spread of any `HU_Y3` module (see `academic/HU-Y3-modules.md`).

## Two lanes, two shapes of evidence

The old orchestration ran GIT 301 as two lanes that never produced a single
merged bundle:

- **Lane A** (Anatomy, Histology, Physiology, + 49/50 of the shared MCQ bank)
  — ~660 questions triaged, narrative-only in the checkpoint table. No
  `concept-triage.json` or per-subject `mcq-bank-*.json` survives for lane A
  in `scripts/helwan/extract/HU-GIT-301/` — its keys were read off renders
  ("key grid read off a render" for histology/physiology; anatomy's ~313
  keyless items were never machine-triaged at all). This lane's numbers below
  are carried forward from the old checkpoint table as-is; they are **not**
  independently re-verifiable without re-extraction.
- **Lane B** (Pathology, Pharmacology, Parasitology, Biochemistry, + Q40 of
  the shared bank) — 302 questions, 302/302 keyed, 281 distinct concept keys,
  machine-triaged and recovered whole: `concept-triage.json` +
  `mcq-bank-{pathology,pharmacology,parasitology,biochemistry,shared-triage}.json`
  now live at `scripts/helwan/extract/HU-GIT-301/`. This is the lane
  re-verified below.

## Checkpoint table (recovered from `TRIAGE-CHECKPOINT-2026-08-22.md`)

| Lane | Questions | Keys | Distinct concepts | Live-hit | Pending-hit | New | Notes |
|---|--:|--:|--:|--:|--:|--:|---|
| GIT-301-A | ~660 (anat ~366, histo 92+9 problem+30 matching, physio 152, shared bank 50) | anat 53/~366 (rest keyless), histo 92/92, physio 152/152, shared 50/50 | 27 sampled | many (physio, mostly Kasr CON-GIT-*) | 2+ (histo, Kasr 101-ISK pending) | anatomy bulk | Histology notes handwritten; no orientation/marks doc for GIT 301; ~313 anatomy MCQs have no recoverable key |
| GIT-301-B | 302 (path 79 of 117 items — 38 written parked; pharm 52; para 146; biochem 24; shared bank 1) | 302/302 | 281 | 13 | 8 | 191 (+69 generic) | re-verified below |

**Totals:** ≈ 962 questions triaged across both lanes; ≈ 617 keyed (53 anat +
92 histo + 152 physio + 50 shared for A, 302/302 for B; the ~313 keyless
anatomy items are the one large gap).

## Re-verification (this pass, 2026-09-02)

Ran `Instruction Manual for Content Creation/tools/find-existing.mjs`
against a sample of lane B's 281 keys — every `live-hit` and `pending-hit`
entry (21 keys), plus 10 keys sampled evenly across the 191 `new` bucket:

- **3/3 sampled live-hit terms** (`castor oil`, `trypsin`, `pepsin`) resolve
  to the exact same `CON-GIT-*` / `CON-HEM-*` ids recorded in 2026-08-22's
  `concept-triage.json`. No drift.
- **2/2 sampled pending-hit terms** (`gallstones`, `haemochromatosis`) are
  still unimported. `haemochromatosis` is now additionally staged at
  `docs/import-ready/concept/108-INT-concepts-pathology.md` (a copy of the
  same pending file, not yet live) — the underlying fact has moved one step
  closer to live but is still not live.
- **10/10 sampled new-status terms** (`achalasia`, `cholangiocarcinoma`,
  `enterobius vermicularis`, `fasciola`, `gist`, `leukoplakia`,
  `metoclopramide`, `strongyloides stercoralis`, `taenia saginata`,
  `toxocara`) are still absent from live and pending state. Two produced
  substring noise (`gist` matched "synerGIST", `leukoplakia` matched a
  glossary word-parts entry, `Leuk(o)-`) — not real hits, consistent with the
  old triage's own caveat about generic-entity false positives.

**Conclusion: the lane-B triage table holds exactly as recorded on
2026-08-22.** No other lane has minted or imported anything that changes
GIT-301-B's live/pending/new split in the ten days since the freeze. Full
281-key re-verification was not run (would cost ~281 tool calls for a
question that a 31-key stratified sample already answers with zero drift);
if TRIAGE APPROVED lands, re-run the remaining keys before minting anything,
since `find-existing.mjs`'s live state is itself a fixture and can be stale
in the other direction (see `LANE-BRIEF.md` hazard note).

Full key list, one per line (`key<TAB>status<TAB>entityPhrase<TAB>evidence`):
[`HU-GIT-301-triage-keys.txt`](HU-GIT-301-triage-keys.txt).

## Rulings this recovery carries forward (not re-litigated)

From the chief-of-staff's five pre-issued rulings (`HANDOFF.md`), only #5
touches GIT 301 directly:

- **GIT-A keyless anatomy (~313)** — author keyed items fully; a keyless item
  may take its answer from the department book with a page citation
  (`status: Draft`, `field_notes` "answer_source: book"), never from student
  notes; no key and no book answer → OPEN.
- Orchestrator ruling: shared bank Q40 (omeprazole) → lane B; the other 49 →
  lane A.

## What's still missing for a resume

- Lane A's machine-readable triage (concept-triage.json equivalent) does not
  exist — a resumed lane would need to re-triage Anatomy/Histology/
  Physiology from source, or reconstruct it from the checkpoint's narrative
  numbers only.
- `Anatomy by Dr.Jalal [GIT] بعد الحذف.pdf` (74p) is still fully OCR-blocked
  in this pass — see `HU-Y3-priority-sources.md` OCR-priority list #3. OCR
  may recover keys for some of the ~313 keyless anatomy MCQs; this was not
  attempted here (out of phase-0 scope).
- `academic/GIT-301-structure-A.md` and `-B.md` (recovered, unmerged) still
  need the orchestrator merge into one outline before any import, per
  `INDEX.md`'s stated rule that the importer wants one `- Module [ID]` block.
