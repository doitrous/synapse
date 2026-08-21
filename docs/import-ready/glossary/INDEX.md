# Glossary — import-ready

**297 bilingual terms**, in five files. Imports at **Admin › Glossary › Import**
(`/admin/glossary/import`). Nothing here has been imported.

| File | Items | Categories |
|---|---:|---|
| `GLOSSARY-WORD-PARTS-001.md` | 65 | Word parts |
| `GLOSSARY-ANATOMY-001.md` | 53 | Directional & anatomy |
| `GLOSSARY-SYSTEMS-001.md` | 58 | Directional & anatomy |
| `GLOSSARY-CLINICAL-001.md` | 52 | Signs & symptoms 24 · Examination 14 · Investigations 14 |
| `GLOSSARY-CLINICAL-002.md` | 69 | Common conditions 36 · Examination 8 · Pharmacology 25 |

By category across the whole set: Directional & anatomy 111 · Word parts 65 ·
Common conditions 36 · Pharmacology 25 · Signs & symptoms 24 · Examination 22 ·
Investigations 14. All seven categories are used, and every row carries all six
content fields — nothing will import as **Incomplete**.

Order does not matter; the five files are independent.

---

## Where the terms came from

The English–Arabic pairs in the Egyptian medical-terminology course on the desktop
(`Medical Taxonomy Egypt` — cardiovascular, digestive, endocrine, renal,
respiratory, psychiatry, the ten numbered episodes, and `total.pdf`) are the spine
of this set. Terms that were not medical vocabulary — `unicorn`, `bilingual`,
`chlorophyll`, `cyanobacteria` — were left out.

The rest was added around that spine so a student can decode words the course did
not list: the suffixes `-oma -osis -algia -megaly -scopy -graphy -penia -plegia
-trophy -rrhoea -ology`, the prefixes `peri- endo- epi- sub- inter- intra- poly-
oligo- a-/an- anti-`, clinical-reasoning words (`diagnosis`, `differential
diagnosis`, `prognosis`, `aetiology`, `idiopathic`, `relapse`, `remission`,
`incidence/prevalence`), the examination and investigation vocabulary of a real
ward round, and the drug **classes** — never a dose or a brand.

---

## One word family, one item

Per the request behind this batch: a word and its own endings and beginnings are
**never two items**. `psychology`, `psychiatry`, `psychologist`, `psychiatrist`,
`psychotherapy` and `psychoanalysis` are one row headed `Psych-`, and the
definition says what each ending does to the meaning. The same holds for
`nephron / nephritis / nephrology / nephrologist`, `artery / arterial /
arteriole`, `secretion / secretory / hypersecretion / hyposecretion`, and about
sixty other families.

Two consequences worth knowing before you import:

- **The `term` cell lists the whole family**, separated by `·`. Student search
  covers `term`, `ar`, `def` and `defAr`, so searching `psychiatrist` finds the
  `Psych-` card.
- **No English word form appears in two items** — verified, 722 distinct forms,
  zero repeats. A compound built from two roots is filed under the one that
  teaches it best (`nephritis` sits with `Nephr(o)-`, `gastritis` with `-itis`).

---

## It will not collide with the starter set

`GLOSSARY_SEED` (54 terms, `src/data/glossary.ts`) has never been loaded, and
`starterGlossary()` is only offered while the glossary is empty. Both orders are
safe:

- **14 rows deliberately reuse a seed `id`** — `p-hyper`, `p-hypo`, `p-tachy`,
  `p-brady`, `p-dys`, `s-itis`, `s-pathy`, `s-emia`, `s-uria`, `s-ectomy`,
  `s-otomy`, `s-ostomy`, `pyrexia`, `infarction`. Each is the seed term with its
  family added (`Pyrexia` → `Fever · pyrexia · febrile · afebrile`). Import after
  the starter set and they update in place; import without it and they are simply
  created.
- **The other 283 ids are new**, and no row repeats a seed term under a different
  id. The 40 seed terms this batch does not touch — `Anterior`, `Hypertension`,
  `Cyanosis`, `Auscultation`, `Analgesic` and so on — stay exactly as they are.

---

## Format: `# Item` blocks, not a pipe table

`11-glossary-terms.md` says the glossary imports as a markdown **pipe table**.
The wizard cannot read one. `parseMarkdown` in
[`src/components/admin/ImportWizard.tsx`](../../../src/components/admin/ImportWizard.tsx)
only understands `# Item` / `## field` blocks, so a pipe-table `.md` yields no
headers and the upload is rejected with *"No header row and data rows were
detected in this file."* — the manual's own worked example included.

These files therefore use the `# Item` block format every other importer uses.
The column names are chosen so the wizard's **Map columns** step auto-fills all
seven: `term`, `ar`, `category`, `def`, `definition_ar` (its alias for `defAr`),
`example`, `id`. Check the mapping screen anyway; do not change it.

---

## Checking a file

None of the four `medical:*` validators has a glossary branch — running
`npm run medical:batch` on these crashes with a `TypeError`. Use the checker in
this folder instead; it mirrors the wizard's parser, mapping and row validation,
and it fails on a missing field, a category typo, a duplicate id, and a
definition that uses its own term.

```bash
node docs/import-ready/glossary/check-glossary.mjs docs/import-ready/glossary/*.md
```

Expected today: `297 ids, 0 problems`.
