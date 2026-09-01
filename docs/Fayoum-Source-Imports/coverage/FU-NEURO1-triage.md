# FU-NEURO1 (Neuroscience I) — S3 first-module triage

First module triaged per S2's ranking: 3 of `FU-NEURO1`'s 4 sources are bank/paper-shaped
(only 1 of 4 is a plain department book), the most of any Fayoum Year 1 module.

**This is a sampled, not exhaustive, triage** — disclosed explicitly per source below. Every
number here traces to pages actually read in this session (via `pagetext.mjs show`), not to
an extrapolation. Where a source's full extent was not read, the unread remainder is named
and left out of the counted totals.

## Per-source

| Source | Pages read | Questions triaged | Keys recovered | Method |
|---|--:|--:|--:|---|
| `7- Physiology MCQ of Autonomic Nervous System.pdf` | 5/5 (100%) | 34 | 0 | text — no answer key printed anywhere in the file |
| `10 Anatomy MCQs Head & neck.pdf` | 7/50 (14%, sampled: pp1–5, 20, 30) | 31 read, of which **10 in-scope** (Head & Neck) and **21 out of scope** (Abdomen/GI-autonomic content on sampled pp1–3, plus a "GROSS ANATOMY: THORAX" chapter-header page — a different anatomical system, not counted toward this module) | 10/10 of the in-scope sample | text — garbled word-spacing but the single-letter key survives inline on every sampled question |
| `امتحانات فارما عملي.pdf` | 0/15 readable | 0 | 0 | ocr attempted, failed (see manifest note) — blocked |
| `Neuroscience 1 theoritical 2023.pdf` | not read for questions (0 MCQ-pattern grep hits across all 436 pages) | 0 (teaching text, not a question source) | — | — |

**Totals counted toward this module: 44 questions triaged (34 + 10), 10 keys recovered.**
The Anatomy bank's full in-scope Head & Neck range (estimated roughly pp5–48, ~44 pages) is
**not yet fully read** — this triage covers 2 sample pages of it (pp20, 30) plus the first 5
pages, which turned out to be a different chapter. A full read of that range is needed before
any concept in it is minted, and before the module's true total-question figure is known.

## Distinct concepts tested (27 searched via `find-existing.mjs`, collapsing near-duplicates)

Search method per 00-START-HERE.md §4: shortest distinctive word first, live state + every
`docs/*-Source-Imports` + `docs/import-ready` searched via
`node "Instruction Manual for Content Creation/tools/find-existing.mjs" "<term>"`.

### From `7- Physiology MCQ of Autonomic Nervous System.pdf` (19 concepts)

| # | Concept (search term) | Disposition | Where |
|--:|---|---|---|
| 1 | Muscarinic receptor locations/effects | Pending | `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` (+glossary, +question) |
| 2 | Nicotinic receptor at autonomic ganglia | New | — |
| 3 | Adrenal medulla as a modified ganglion | Pending | `docs/Kasr-Source-Imports/{concept,glossary,question,written}/102-INT-*` |
| 4 | Acetylcholine termination (cholinesterase) | Pending | `docs/Kasr-Source-Imports/{concept,glossary,question,written}/102-INT-*`, `103-BMS-*` |
| 5 | Atropine's selective blockade | New | — |
| 6 | Paravertebral sympathetic chain | Pending | `docs/Kasr-Source-Imports/{concept,glossary,written}/102-INT-*`, `104-CPS-anatomy-concepts.md` |
| 7 | Beta-1 adrenergic receptor effects (cardiac) | New | — |
| 8 | Collateral (prevertebral) ganglia | Pending | `docs/Kasr-Source-Imports/{concept,written}/102-INT-*` |
| 9 | Preganglionic sympathetic fibers to head & neck | Pending | `docs/import-ready/question/102-INT-mcq.md`, `docs/Kasr-Source-Imports/question/102-INT-mcq.md` |
| 10 | Thoracolumbar (sympathetic) outflow | Pending | `docs/Alexandria-Source-Imports/concept/AU-MED-102-physiology-concepts.md` (+import-ready) |
| 11 | Cholinergic-fibre naming rule (all preganglionic + postganglionic parasympathetic + 2 sympathetic exceptions) | Pending | `docs/Kasr-Source-Imports/concept/102-INT-{concepts,mcq-concepts}.md`, `docs/Alexandria-Source-Imports/pending-live/AU-MED-102-physiology.md` |
| 12 | Sympathetic vasoconstrictor fibres | New | — |
| 13 | Beta receptor mediating bronchodilation | New (a related but distinct live claim exists — `CLM-REN-613F9151E4D17D`, adrenaline/histamine antagonism — not the same tested fact) | — |
| 14 | Sympathetic pupillary effect | New | — |
| 15 | Sympathetic effect on GI sphincters | New | — |
| 16 | Sympathetic cholinergic exception (sweat glands) | New | — |
| 17 | Craniosacral (parasympathetic) outflow | Pending | `docs/Kasr-Source-Imports/glossary/102-INT-glossary.md` |
| 18 | Vagus nerve as parasympathetic outflow | New | — |
| 19 | Splanchnic nerve (sympathetic relay to viscera) | Pending | `docs/Kasr-Source-Imports/{question,written}/102-INT-*` |

### From `10 Anatomy MCQs Head & neck.pdf` — in-scope sample only (8 concepts)

| # | Concept (search term) | Disposition | Where |
|--:|---|---|---|
| 20 | Auriculotemporal nerve course | New | — |
| 21 | Chorda tympani → submandibular/sublingual glands | **Live** | `CON-NEU-AB0BD1B1A254F5` "Chorda tympani course" |
| 22 | Otic ganglion → parotid gland pathway | Pending | `docs/import-ready/concept/102-INT-mcq-concepts.md`, `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` |
| 23 | Facial nerve (CN VII) at/after the stylomastoid foramen | New | — |
| 24 | Thyrocervical trunk branches / subclavian supply territory | New | — |
| 25 | Infratemporal fossa contents (as a region) | New — a related live concept exists in the same area (`CON-NEU-AB0BD1B1A254F5`, chorda tympani's course through the fossa) but the actual tested fact here (what the fossa contains: pterygoid venous plexus, buccal nerve, middle meningeal artery, deep parotid, auriculotemporal nerve) is distinct | `CON-NEU-AB0BD1B1A254F5` (related, not identical) |
| 26 | Bony orbit (orbital floor / lacrimal bone / maxillary sinus relation) | New | — |
| 27 | Central retinal vessels and the optic nerve/subarachnoid space | New | — |

## Checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| `FU-NEURO1` | 44 | 10 | 27 | 1 | 11 | 15 | TBD — see field_notes below |

**Placement for the 15 new concepts** (all fit existing subject ids from `00-START-HERE.md` §3
— `neuro` for cranial-nerve/ANS-anatomy items, `fnd`/`pharm`-adjacent for the pure-pharmacology
receptor items):
- Autonomic-pharmacology items (#2, 5, 7, 12–16, 18) → `neuro` (autonomic physiology is taught
  as part of Neuroscience I here, not a standalone pharmacology subject in this corpus).
- Head & Neck anatomy items (#20, 23, 24, 26, 27) → `neuro`.
- #25 (infratemporal fossa contents) → `neuro`, sibling/related to the live `CON-NEU-…`
  chorda-tympani concept — link via `related_concept_ids` rather than minted in isolation, per
  00-START-HERE.md §4's "overlapping but genuinely distinct" rule.

## What this triage flags for the checkpoint reply

1. **`10 Anatomy MCQs Head & neck.pdf` is a third-party commercial bank** (Biotest Inc.,
   copyright 1999) reused via the Telegram bot — not Fayoum-authored, and mixes at least two
   chapters (Abdomen/Thorax alongside the in-scope Head & Neck material). No authoring should
   touch it until Omar rules on the copyright question and the exact in-scope page range is
   confirmed.
2. **`7- Physiology MCQ of Autonomic Nervous System.pdf` has zero printed keys.** All 34
   questions would need editorial keying (manual rule 10) before any could be authored as an
   MCQ — a real cost this module carries that `Important Q.pdf` (Disease Mechanism,
   39/39 keyed) does not.
3. **`امتحانات فارما عملي.pdf` (the module's one real-exam-paper candidate) is currently
   unreadable** — blocked pending a cleaner source from Omar.
4. **11 of 27 sampled concepts are pending-hits, concentrated in `docs/Kasr-Source-Imports/…/102-INT-*`
   and `docs/Alexandria-Source-Imports/…/AU-MED-102-*`** — this module's autonomic-physiology
   content strongly overlaps Kasr's 102 module and Alexandria's AU-MED-102, consistent with the
   university-blind concept-mint rule (00-START-HERE.md §3, "one medical idea gets one concept
   id, across every university").
