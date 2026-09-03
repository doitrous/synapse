<!--
  Sparse updates only. Both ## id rows below target a concept that exists ONLY in
  Kasr's 101-ISK-mcq-concepts.md (checked directly against every docs/*/concept and
  docs/*/pending-live tree; already reused cross-university by Ain Shams, Alexandria
  and Assiut's own pending-live overlays, confirming both ids are real, live-track
  Kasr concepts). Apply each record ONLY after 101-ISK-mcq-concepts.md is live.

  Same gate-clean sparse form as pending-live/MANS-HBG-histoprev2-overlay-concepts.md
  and histoprev4-overlay-concepts.md: `## label` and `## canonical_key` are written on
  every row (a filled label makes the batch validator's stub-create check treat the
  row as a full authoring attempt rather than an update; an update row silent on
  `## label` blanks the live concept's real label on merge). `## module_subject` is
  OMITTED on every row deliberately — an append row's `## modules` is just
  `+MANS-HBG` (the delta), and validate-content-batch.mjs's catalogueErrors requires
  module_subject's first segment to name a module the row carries, so any restated
  base path reads as a module the row does not declare. MANS-HBG's own placement for
  each reused concept lives on the question records (question/MANS-HBG-histoprev5-
  mcq.md), which carry their own full module_subject. `## universities`, `## modules`
  and `## learner_years` are the genuine append-safe deltas. Labels/keys copied
  verbatim from docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

  Lane mans-hbg-author4, cluster histoprev5.

  node scripts/content/gate.mjs batch "docs/Mansoura-Source-Imports/pending-live/MANS-HBG-histoprev5-overlay-concepts.md" \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
-->

# Item

## id
CON-FND-D9E83D81037173

## canonical_key
exocrine-gland-modes-of-secretion

## label
By mode of secretion an exocrine gland is merocrine, apocrine or holocrine

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q36 (merocrine secretion leaves the secretory cell intact, p9), cluster histoprev5.

---

# Item

## id
CON-FND-F2650956ED1A0C

## canonical_key
centriole-structure-and-role-in-cell-division

## label
A centriole is a short cylindrical structure whose wall is nine bundles of three microtubules each

## universities
+mans

## modules
+MANS-HBG

## learner_years
+1

## field_notes
mans: Tested as q67 (centriole acts as the basal body of a cilium, p15), cluster histoprev5.
