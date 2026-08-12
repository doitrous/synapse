# Import-ready — files waiting to be applied through Bulk Import

Everything in this folder is finished, validated, and waiting for a human to
apply it on the **Bulk Import** page. Nothing here has been imported yet.

**This is the folder to work from.** Every report names it.

## How to import one

1. Admin console → the content type's page → **Bulk import**
   (or go straight to `/admin/import/practical`, `/admin/import/question`, …).
2. Choose the file. The wizard reads it directly — no conversion needed.
3. Step through: confirm worksheet → map columns (they map themselves) →
   full preview → skipped rows → import options.
4. Tick the acknowledgement, then **Import**.

Everything imports as `Draft`. Nothing reaches a student until it is promoted,
so importing is safe to do in any order and safe to repeat — an item carrying an
`id` updates in place rather than creating a duplicate.

## Waiting now

| Order | File | Applies to | Contents |
|---:|---|---|---|
| 1 | `SYS-CVS-PRACTICAL-010.md` | Practical | 5 clinical cases · 25 questions |
| 2 | `SYS-CVS-PRACTICAL-011.md` | Practical | 4 clinical cases · 20 questions |
| 3 | `SYS-CVS-PRACTICAL-012.md` | Practical | 4 lab interpretation sets · 20 questions |
| 4 | `SYS-CVS-PRACTICAL-013.md` | Practical | 4 imaging interpretation sets · 20 questions |
| 5 | `SYS-CVS-PRACTICAL-014.md` | Practical | 2 OSCE stations · 22 mark-scheme items |

**19 items, 85 questions, 27 media requests.** Intended difficulty across the
85: Easy 21 (24.7%), Moderate 47 (55.3%), Hard 13 (15.3%), Challenging 4 (4.7%).

This is wave 2 of the cardiovascular practical bank. Its purpose is depth: after
it is imported, every one of the 98 concepts in `SYS-CVS-T01` is taught by at
least two questions, and the highest-yield ones by three to five. Before it, five
concepts were tested by nothing and 54 by a single question.

Order does not matter for these — practicals reference concepts that already
exist in the library, and nothing in this batch depends on anything else in it.

## Also unimported, and still in the batches folder

Wave 1 of the cardiovascular practical bank was authored before this folder
existed and has never been applied either. Those nine files are in
`docs/medical-library-program/batches/` as `SYS-CVS-PRACTICAL-001.md` through
`SYS-CVS-PRACTICAL-009.md` — 46 items, 140 questions. Import them the same way.

## After importing

Each file's items land in the content ledger as `Draft`. To see one running,
open it in the admin practical list, set it to `Published`, and it appears on the
student Practical page under its type.

Media flagged in `media_needed` is deliberately **not** attached — those entries
are a worklist for you to fulfil from the admin media surface. No placeholder URL
is ever written, so a flagged item still runs cleanly with nothing broken on screen.
