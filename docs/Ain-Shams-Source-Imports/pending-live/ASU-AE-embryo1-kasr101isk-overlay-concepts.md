<!--
  ASU-AE · Embryo 1 MCQ cluster (src_5d3b735488d8c321d5bd, "MCQs - Embryo 1.pdf")
  — pending-live sparse CONCEPT overlay.

  The ## id below targets concepts that exist ONLY in Kasr's unimported
  101-ISK batch — not yet in server/data/medical-library-v1.json. Per
  LANE-CARD §4/§7, `101-ISK-mcq-concepts.md` carries the gametogenesis and
  fertilisation concepts most likely to overlap ASU-AE embryology, searched
  first: find-existing.mjs "haploid" and "diploid" plus a direct grep of that
  file for gamete/spermatogenesis-timing labels surfaced these two exact
  facts already minted there. One canonical key, one id, university-blind —
  these rows overlay ASU's own tags onto them rather than re-minting.

  Apply this file ONLY after the named source file is live:
    A. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md —
       university `kasr`, module `101-ISK` (Anatomy, General Embryology > Gametes).

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject`
  fully replaces on every write (no `+` form) — the rows below restate the
  source's existing line plus ASU's own. `## universities`, `## learner_years`
  and `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-AE`.

  Simulate together with the source file this block targets:
  node scripts/content/gate.mjs simulate \
    docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo1-kasr101isk-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-embryo1-mcq.md
-->

# Item

## id
CON-DEV-0BA870DF2C2E13

## label
Each gamete nucleus carries 22 autosomes and one sex chromosome — always X in the ovum, X or Y in the sperm

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Gametes
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: The broadest single reuse target in this cluster — this record's own definition already states the haploid gamete formula (22 autosomes + X or Y in sperm, 22 autosomes + X in the ovum), the acrosomal cap, and the ovum's zona pellucida/corona radiata coverings, so eight ASU-AE Embryo 1 items draw on it as `main_concept`: the 23-chromosome-cell identification (Q4), all five items of the Q19-23 chromosomal-pattern matching set (oogonium/primary spermatocyte/secondary spermatocyte/secondary oocyte/sperm), the 1st-polar-body formula (Q24), the secondary-oocyte formula (Q29), and the general haploid-formula item (Q40). "MCQs - Embryo 1.pdf" pp.1,4,5,7, printed answer table pp.8-9 rows 3,19-24,29,40.

---

# Item

## id
CON-DEV-623698E111AA4B

## label
Spermatogenesis runs continuously from puberty to old age, while oogenesis starts before birth, arrests, and resumes from puberty to the menopause

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
101 ISK > Anatomy > General Embryology > Gametes
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE Embryo 1 MCQ bank — "Differentiation of the primordial germ cells in the male begins at:" with the correct option "Puberty". "MCQs - Embryo 1.pdf" p.7 Q41, printed answer table p.9 row 41 (d/puberty). This record's own definition already states "In the male it begins at puberty and continues without interruption into old age", matching the ASU bank's convention of testing active male gametogenesis onset as puberty rather than the earlier intrauterine primordial-germ-cell migration step (see the question's own `author_notes`).
