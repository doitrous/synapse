<!--
  Sparse updates only, this lane's Urinary cluster (aepuri, Lecture (10)
  "Urinary System", AEP Full Exams (VIP).pdf p.52-55). Every ## id below
  targets a concept that exists ONLY in an unimported Assiut (AUN-PMS-102)
  batch -- none of these ids are in server/data/medical-library-v1.json yet
  (checked directly). Apply each record ONLY after AUN-PMS-102-concepts.md
  is live.

  Same conventions as this lane's own lane-3 MANS-AEP-cns-concepts.md
  precedent: `## label` and `## canonical_key` restated in full on every row
  (a filled label makes the batch validator's stub-create check treat the
  row as a full update rather than a silent stub-create); `## module_subject`
  DELIBERATELY OMITTED (append-unsafe -- would either fail validation
  against this row's own `## modules` or silently erase the source
  university's placement on merge); `## universities` / `## modules` /
  `## learner_years` are append-safe list columns (+mans / +MANS-AEP / +1).

  Gate is `medical:batch` with the target file (and this module's own new
  concept/article files) named via --with:

  node scripts/validate-content-batch.mjs "docs/Mansoura-Source-Imports/pending-live/MANS-AEP-uri-reuse-concepts.md" \
    --with docs/Assiut-Source-Imports/concept/AUN-PMS-102-concepts.md \
    --with docs/Assiut-Source-Imports/article/AUN-PMS-102-articles.md
-->

# Item

## id
CON-REN-3995B4987178E0

## canonical_key
urethra.male.intramural-part-internal-sphincter

## label
The intramural (preprostatic) part of the male urethra is surrounded by the internal urethral sphincter

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf tests the same fact via the bladder-neck framing three times — p.53's "the neck of the urinary bladder is surrounded by" (keyed C, internal urethral sphincter, authored) and p.55's "the internal urethral sphincter surrounds" / "which one is surrounded by the internal urethral sphincter" (both keyed E, neck of the urinary bladder, held as near-duplicate/literal-duplicate). The bladder neck and the intramural/preprostatic urethra are the same anatomical region under two different reference points, so this record's own "intramural (preprostatic) part" framing and the source's "neck of the urinary bladder" framing describe the same fact.

---

# Item

## id
CON-REN-50D97BAC2FE0D6

## canonical_key
urethra.male.membranous-part-narrowest

## label
The membranous part is the narrowest part of the male urethra

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf p.53 tests a complementary fact from the same four-part male-urethra classification this concept's own definition already states — "the longest part of male urethra" (keyed C, Penile/spongy) rather than the narrowest part this record's own label names. Reused as the main concept for that question since it is the same classification framework (preprostatic/intramural, prostatic, membranous, penile), tested from a different angle.

---

# Item

## id
CON-REN-C5A7E3203D2EA4

## canonical_key
ureter.anatomy.continuous-with-renal-pelvis

## label
The ureters are continuous superiorly with the renal pelvis

## universities
+mans

## modules
+MANS-AEP

## learner_years
+1

## field_notes
universityNotes: mans: AEP Full Exams (VIP).pdf tests two facts already carried by this concept's own definition — p.53's "the renal pelvis is formed by the union of" (keyed A, major calyces, a step in the calyces-to-pelvis collecting chain this record's definition already describes) and p.53's "the length of the ureter is usually" (keyed C, 25 cm, matching this record's own pitfall about the ureter's exact length) — a third p.55 repeat of the length fact (keyed D, 25 cm) is held as a literal duplicate.
