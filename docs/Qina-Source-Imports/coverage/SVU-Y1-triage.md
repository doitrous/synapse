# SVU Year 1 — S3 triage checkpoint

## The wall

The lane brief asks for "S3 first-module triage of the module with the richest KEYED
exam material." **No module in this corpus has any keyed exam material — there is no
exam material of any kind.** Every one of the 19 Year 1 sources is a lecture PDF or
slide deck (`manifest/y1-sources.json`, `kind: "lecture"` on all 19; confirmed by direct
file listing, not just the Desktop catalog note that first flagged this). There are no
printed questions to triage, so the triage table below is filled with zeros rather than
naming a module and faking a source table.

This matches a note already left by a prior Desktop curation pass
(`Year 1/_Catalog/Year 1 Priority 4.md`): "The bot exposes a first-semester Year 1
branch with Anatomy, Embryology, Histology, Biochemistry, and Physiology. It does not
expose an exam, department-book, or question-bank branch for these subjects." This lane
re-confirmed it directly against the file tree rather than trusting the note.

## Triage checkpoint table

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| SVU-PMM101 | 0 | 0 | 0 | 0 | 0 | 0 | n/a — no questions to place |
| SVU-CBF101 | 0 | 0 | 0 | 0 | 0 | 0 | n/a — no questions to place |

`coverage/SVU-Y1-triage-keys.txt` is empty for the same reason — nothing to list.

## What exists instead

`coverage/SVU-Y1-priority-sources.md` names `SVU-PMM101` (Anatomy + Histology +
Embryology) as the strongest **readable lecture-text** module — 262 native-text pages
across Anatomy and Histology, ~13,900 words, only 22 garbled pages — should this lane be
directed to author from department lecture material alone (concept + article authoring,
no question authoring against a local key) rather than wait for exam sources. That is a
scope decision for the chief of staff, not a default this lane took on its own.

## Options for the chief of staff

1. **Needs Omar sources** — request an actual SVU Year 1 exam paper, department MCQ
   book, or question bank be added to
   `/Users/doitrous/Desktop/Universities/Qina University/Faculty of Medicine/`. Telegram
   fetching is retired (per standing order), so this lane cannot pull further from
   `@FAS1_bot` itself even though the Desktop catalog note names it as the only known
   source with an exam/bank branch potentially still ungathered.
2. **Redirect S2 to concept/article-only authoring** against `SVU-PMM101`'s lecture
   corpus (teach-before-test groundwork, no questions minted, since Year-1 basic-science
   concepts here should mostly land as live/pending hits against existing Kasr/Alexandria
   concepts per the concept-mint-is-university-blind rule) — still requires **TRIAGE
   APPROVED** in spirit even though the triage table is empty, since concept minting is
   gated the same way.
3. **Pause this lane** until source material improves, same as other lanes paused
   pending Omar rulings.

This lane mints nothing and authors nothing until told which of the above (or another
option) applies, per its standing instructions.
