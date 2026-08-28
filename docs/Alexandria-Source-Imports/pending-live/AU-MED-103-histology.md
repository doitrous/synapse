<!--
  Sparse updates only. Every ## id below targets a concept that exists ONLY in an
  unimported Kasr Year 1 batch -- none of these ids are in
  server/data/medical-library-v1.json yet. Apply each record ONLY after its target
  file (named per record and rolled up in pending-live/INDEX.md) is live.

  Per LANE-BRIEF Sec16 rule 1/2, Sec18 correction 2, and superseded twice since:
  first the chief-of-staff's 2026-08-22-night ruling on Sec19 said `## canonical_key`
  alone (no `## label`) was the correct discriminator, because a filled `label`
  made the batch validator's stub-create check (`isUpdateShaped`/`stubCreateErrors`)
  treat the row as a full authoring attempt and skip the existence refusal --with is
  meant to clear. That advice also matched a real bug this lane found independently:
  `conceptFromRow` (src/data/conceptImport.ts:148) defaults `label` to '' rather than
  undefined when a row is silent on it, and `mergeAuthoringData` only skips
  `undefined` -- so omitting `## label` on a LIVE concept update silently blanks its
  real label on merge (confirmed by simulating; see
  concept/AU-MED-103-histology-concepts.md's header). The merged validator fix
  (d82dd36, relayed by the first lane to finish) now requires `## label` on every
  concept row regardless, closing both problems from the label side: every record
  below carries the Kasr record's exact label, retyped, alongside `## canonical_key`.
  `module_subject` and `exam_signal` are dropped from every sparse-update row
  below, not merely left un-`+`ed: `d82dd36` (Refuse a + on a column that cannot
  take one) confirms neither column implements list-append, so a bare value on
  either would be a full replacement -- and every one of these 20 Kasr target
  records already carries its own real module_subject and exam_signal (checked
  directly: '101 ISK > Anatomy > Upper Limb > Arm', '104 CPS' rows with real
  src_ ids and pages). Writing either field here would silently erase that
  lane's own placement and exam evidence on merge. The AU module attachment
  survives on `modules` (a genuine append-safe ID-list column, confirmed by
  simulate); the AU exam appearance (source, tier, page) is recorded in
  `field_notes` `universityNotes:` prose instead, where it cannot collide with
  anything.
  `+` additions are one value per line. No field is restated from the target record -- in particular, nothing here repeats
  `source_candidate_ids`, `atomic_claim_ids` or any other field the target record
  already carries. Concepts have no `university_notes` column (that is an article
  field), so the Alexandria-specific note for each record is folded into
  `field_notes` as `universityNotes:` instead.

  Lane W1-103-HIST. Targets span four Kasr files across two modules (101 ISK and
  104 CPS both teach Year-1 blood/immune histology; Alexandria's MED 103 overlays
  onto whichever of the two already authored a given idea). Gate is `medical:batch`
  with every target file named via --with -- run once without --with (expect the
  "does not exist" refusal) and once with (expect a clean pass); this file's
  `## id`s are not live, so `medical:simulate` cannot resolve them yet and is not
  the gate here:

  npm run medical:batch -- "docs/Alexandria-Source-Imports/pending-live/AU-MED-103-histology.md" \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-practical-concepts.md
-->

# Item

## id
CON-FND-C75600D3D3B546

## canonical_key
reticular-cell-forms-the-stroma-and-turns-phagocytic

## label
The reticular cell is a stellate cell of an organ's stroma that secretes the reticular fibres it lies on and becomes phagocytic when antigen arrives

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: Alexandria's own Histology notes (Dr Iman Nabil, "Structure of myeloid tissue") and the Practical Blood Questions bank (Spot 7b) test this same reticular cell as the fixed stromal-cell population of bone marrow, adding a function this record's definition does not carry — secreting growth factors that stimulate hemopoiesis. That function is bone-marrow-specific and not asserted here; flagging it rather than rewriting the shared definition.

---

# Item

## id
CON-HEM-3899015C5024C0

## canonical_key
neutrophil-granules-and-first-line-defence

## label
The neutrophil carries two granule populations and is the first line of non-specific defence

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood Final Egyptian final, Q23) tests the neutrophil's function directly — "converted to macrophage and engulf invaded organism" is the keyed distractor rejected in favour of phagocytosis of the invading organism itself, the same first-line-defence idea this record already carries.

---

# Item

## id
CON-HEM-77B701F6105076

## canonical_key
eosinophil-features-granules-function

## label
The eosinophil is a bilobed nucleus behind large acidophilic granules

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood end wafdeen final, Q22) tests the EM appearance of the eosinophil's specific granule directly against four distractors on granule size and electron density; this record's internum/externum description is the correct answer.

---

# Item

## id
CON-HEM-FDAC2D5F64032E

## canonical_key
lymphocyte-types-t-b-and-nk-and-the-immunity-each-mediates

## label
The three lymphocytes look identical and differ only in their surface receptors: T mediates cell-mediated immunity, B mediates humoral immunity, NK acts without either

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood Final Egyptian final) tests two separate functional facts already inside this one record's definition as two separate questions on the same paper — Q50 asks the helper T cell's function (this record: "activates the B cell"; the keyed option is "secretes lymphokines", a wording gap noted below) and Q51 asks the natural killer cell's function (this record: "act in innate early immunity... without any helper T stimulation"; keyed as "nonspecific immune response"). Both are the same functional-classification concept tested twice, not two concepts.
conflicts: This record's own wording for the helper T cell's role ("activates the B cell") does not use the word "lymphokines" that MED 103's Q50 key selects. A live concept elsewhere (CON-IMM-37793AE332D7E6, "cytokines produced by lymphocytes are called lymphokines") supplies that term; the two are complementary, not contradictory — recorded here rather than silently reconciled.

---

# Item

## id
CON-HEM-719FA556594454

## canonical_key
monocyte-is-the-largest-leukocyte-and-becomes-the-macrophage

## label
The monocyte is the largest leukocyte and the precursor of every phagocytic cell of the tissues

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood End Egyptian 1, Q6) tests "which of the following is an antigen presenting cell" against T- and B-lymphocyte distractors; this record's own definition already states "it is an antigen-presenting cell, and it is the precursor of all the phagocytic cells of the body", which is the tested fact.

---

# Item

## id
CON-HEM-A2BE134E34EB83

## canonical_key
platelet-two-zones-on-light-microscopy

## label
A platelet is a non-nucleated fragment with a pale peripheral hyalomere and a dark central granulomere

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood Final Egyptian final, Q48) asks which statement about platelet structure is correct against distractors describing a nucleated or acidophilic-centred cell; this record's two-zone description is the keyed answer.

---

# Item

## id
CON-HEM-CC292B4D6CC61E

## canonical_key
platelet-hyalomere-structure-function

## label
The hyalomere's microtubules and canalicular system carry out the platelet's shape change and release

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: Tested twice on two different MED 103 papers — EOM - Blood End Egyptian 1 Q29 asks the function of the circumferential microtubules directly ("maintenance of the discoid shape"), and EOM - Blood end wafdeen final Q5 asks the histological feature of the granulomere and keys "circumferential bundle of microtubules" — which this record itself places in the hyalomere, not the granulomere. Recorded as a paper-vs-record zone mismatch rather than silently corrected; the mechanism tested (microtubule bundle maintains discoid shape) is the same either way.

---

# Item

## id
CON-HEM-B000CE18F93F83

## canonical_key
platelet-granule-types-and-contents

## label
Platelets carry three granule types — alpha, delta and lambda — each with different contents

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: The Practical Blood Questions bank's Histology Spot 9 asks a student to identify "alpha granules" on a platelet EM diagram; this record's classification of the three granule types is what that spot tests.

---

# Item

## id
CON-HEM-10B2E783E164FD

## canonical_key
thymus.hassalls-corpuscle-structure-and-location

## label
A Hassall's corpuscle is a concentric epithelial body with a degenerating acidophilic centre, found only in the thymic medulla

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood End Egyptian 1, Q28) asks what is in the medulla of the thymus; Hassall's corpuscles are the keyed answer this record already describes.

---

# Item

## id
CON-HEM-02424D1AF8A169

## canonical_key
thymus.epithelial-reticular-cells-endodermal-and-fibre-free

## label
Thymic epithelial reticular cells are endodermal, joined into a cellular reticulum, and produce no reticular fibres

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood Final Egyptian final, Q63) asks the function of the thymus's epithelial reticular cells against a phagocytosis distractor; this record's "nursing cell" / supporting role is the keyed answer.

---

# Item

## id
CON-HEM-BB5A071CEEB78F

## canonical_key
thymus.blood-thymic-barrier-four-layers-and-cortical-location

## label
The blood-thymic barrier is four layers around a cortical capillary, and it exists in the cortex and not in the medulla

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood end wafdeen final, Q14) asks which components make up the blood-thymic barrier; this record's four-layer, cortex-only description is what the question tests.

---

# Item

## id
CON-HEM-BA8773E5D84286

## canonical_key
thymus.lobules-dark-cortex-and-continuous-pale-medulla

## label
The thymus is incompletely lobulated, with a dark cortex, a pale medulla continuous between lobules, and no lymphatic nodules

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood end wafdeen final, Q13) asks what describes the cells of the thymic inner cortex; this record's cortex description ("thymocytes in its inner part") is what the question turns on.

---

# Item

## id
CON-HEM-3E38A04641F73C

## canonical_key
thymus.special-features-and-absent-afferent-lymphatics

## label
The thymus has no lymphoid nodules, no B lymphocytes, no plasma cells and no afferent lymph vessels, and it is that last absence that keeps antigen out

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood End Egyptian 1, Q34) asks how the thymus differs histologically from the lymph node against distractors on nodule distribution and cortex/medulla division; this record's list of absences is what the keyed option ("supportive network of epithelial reticular cells") turns on.

---

# Item

## id
CON-HEM-D2143156B30A8A

## canonical_key
lymphnode.capsule-septa-cortex-paracortex-and-medulla

## label
A lymph node is read from the capsule inwards: thin capsule, septa from its deep surface, a cortex of follicles bounded by lymph sinuses, a paracortex, and a medulla of cords and sinuses

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: The Practical Blood Questions bank's Histology Spot 1a asks for a lymph-node slide identification and Spot 9c asks for the medullary lymph sinuses on a lymph-node H&E slide; both are this record's own capsule-to-medulla structure.

---

# Item

## id
CON-HEM-748293D5DA5D92

## canonical_key
paracortex.thymus-dependent-zone-and-post-capillary-venules

## label
The paracortex is the thymus-dependent zone, and its T lymphocytes arrive from the blood through cubical-lined post-capillary venules

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood Final Egyptian final, Q53) asks the main cell population of the paracortical area of the lymph node, and the Practical Blood Questions bank's Histology Spot 5b asks the same zone by name on a palatine-tonsil-adjacent slide set; both are this record's T-lymphocyte zone.

---

# Item

## id
CON-HEM-2F3CB0082551D1

## canonical_key
spleen.capsule-trabeculae-white-pulp-and-red-pulp

## label
The spleen is a thick muscular capsule with thick trabeculae radiating from the hilum, and white pulp scattered irregularly in red pulp

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: The Practical Blood Questions bank's Histology Spot 6a asks for a spleen (silver stain) slide identification, which is this record's own capsule/trabeculae/parenchyma description.

---

# Item

## id
CON-HEM-7B050DE7FE2B80

## canonical_key
splenic-white-pulp.zones-and-cellular-composition

## label
Splenic white pulp is four zones arranged concentrically around the central arteriole

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood Final Egyptian final, Q52) asks the thymus-dependent area of the spleen, and the Practical Blood Questions bank's Histology Spot 3 asks for the germinal centre and the marginal zone on a spleen diagram; all three are zones this one record already names in order.

---

# Item

## id
CON-HEM-594B1725902DAD

## canonical_key
spleen.red-pulp-billroth-cords-and-stave-cell-sinusoids

## label
Red pulp is Billroth cords and stave-cell sinusoids whose intercellular gaps let blood cells pass back into the circulation

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: The Practical Blood Questions bank's Histology Spot 8b asks for the splenic cords of the red pulp on a spleen diagram, which is this record's own Billroth-cord description.

---

# Item

## id
CON-HEM-4D47090A0B7561

## canonical_key
spleen.open-closed-and-open-and-closed-circulation-theories

## label
Open, closed and open-and-closed theories describe how blood crosses from the terminal capillaries into the splenic sinusoids

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: The Practical Blood Questions bank's Histology Spot 8c asks for the central (follicular) artery on the same spleen diagram as Spot 8b; this record's circulation route is what identifies that vessel.

---

# Item

## id
CON-HEM-093013026B640A

## canonical_key
tonsil.palatine-epithelium-crypts-and-deep-capsule

## label
The palatine tonsil is stratified squamous epithelium dipping in as crypts, nodules arranged around them, and dense connective tissue on the deep aspect only

## universities
+au

## modules
+AU-MED-103


## learner_years
+1

## field_notes
universityNotes: au: MED 103's EOM paper (EOM - Blood end wafdeen final, Q21) asks which histological structures relate to the palatine tonsil's capsule and keys "mucous acini" — this record's mucous-gland-on-the-deep-aspect fact. The Practical Blood Questions bank's Histology Spot 5a (identification) and Spot 6b/6c (secondary tonsillar crypt, mucous acini) test the same slide.
