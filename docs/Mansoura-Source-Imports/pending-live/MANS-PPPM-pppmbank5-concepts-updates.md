<!--
  Sparse updates only. Every ## id below targets a concept that already exists in another university's pending batch -- none of these ids are in server/data/medical-library-v1.json yet. Apply each record ONLY after its target file (named per record) is live.

  Per this lane's own precedent (MANS-PPPM-pppmbank2/3/4-concepts-updates.md): `## label` is restated verbatim (a blank label on an update row would blank the live concept's real label on merge). `## canonical_key` is written too, as the discriminator. `## module_subject` is deliberately NOT written here -- it is not an append-safe column (a bare value replaces wholesale), and every target record below already carries its own real module_subject naming its home module; writing one here would silently erase that placement on merge. The Mansoura module attachment survives on `## modules` (append-safe) instead, and the Mansoura exam appearance (source, page, cluster) is recorded in `field_notes` `universityNotes:` prose, where it cannot collide with anything.

  `## universities`, `## modules` and `## learner_years` are append-safe list columns: `+mans`, `+MANS-PPPM` and `+1` add without disturbing the target record's existing tags.

  Lane mans-pppm-author5 (cluster pppmbank5, Parasitology p.37-44 of PPPM Exam Bank ( 61, 60, 59, 58).pdf, src_111bbd078054dc30d3af). Gate is `medical:batch` with every target file named via --with -- run once without --with (expect the "does not exist" refusal) and once with (expect a clean pass); these `## id`s are not live, so `medical:simulate` cannot resolve them yet and is not the gate here:

    node scripts/content/gate.mjs batch "docs/Mansoura-Source-Imports/pending-live/MANS-PPPM-pppmbank5-concepts-updates.md" \
      --with docs/FOMSCU-Source-Imports/concept/SCU-FBS103-concepts-3.md \
      --with docs/Menoufia-Source-Imports/concept/MU-MED102-concepts.md \
      --with docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md
-->

# Item

## id
CON-INF-85B8A95618EA94

## canonical_key
parasitology.protozoa-old-classification.sarcodina-pseudopodia

## label
Sarcodina is the old taxonomic group of protozoa that move by pseudopodia

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Parasitology p., cluster pppmbank5 tests this record -- Protozoa classified by organ of locomotion (pppmbank5-q03, p.37) and Amoeba belongs to Sarcodina (pppmbank5-q05, p.37, matches the concept's own Entamoeba worked example) -- exact match, no new fact added. (target file: docs/FOMSCU-Source-Imports/concept/SCU-FBS103-concepts-3.md)

---

# Item

## id
CON-INF-6BAFAF7430C005

## canonical_key
anopheles.human-malaria-vector

## label
Anopheles mosquitoes are the exclusive vector of human malaria

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Parasitology p., cluster pppmbank5 tests this record -- Disease transmitted by female Anopheles mosquito: Human malaria (pppmbank5-q09, p.38, repeated at q15 held) -- exact match, no new fact added. (target file: docs/Menoufia-Source-Imports/concept/MU-MED102-concepts.md)

---

# Item

## id
CON-INF-6E41B8C3F902AD

## canonical_key
parasitology.foundations.obligatory-parasite

## label
Obligatory parasite depends on a host

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Parasitology p., cluster pppmbank5 tests this record -- Obligatory parasites described by: host dependent (pppmbank5-q11, p.39, repeated at q20 held) -- exact match, no new fact added. (target file: docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md)

---

# Item

## id
CON-INF-F58CE242AA1B1E

## canonical_key
parasitology.helminths.trematode-leaf-like-unsegmented

## label
Trematodes are leaf-like unsegmented flatworms

## universities
+mans

## modules
+MANS-PPPM

## learner_years
+1

## field_notes
universityNotes: mans: PPPM Exam Bank ( 61, 60, 59, 58).pdf (src_111bbd078054dc30d3af), Parasitology p., cluster pppmbank5 tests this record -- Leaf-shaped and dorsoventrally flattened worms: Trematodes (pppmbank5-q27, p.42) -- exact match, no new fact added. (target file: docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md)
