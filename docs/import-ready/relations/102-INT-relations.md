<!--
  Typed concept relations for module 102 INT (Biochemistry + Physiology),
  Kasr Al Ainy Year 1.

  Sources: docs/Kasr-Source-Imports/concept/102-INT-concepts.md (biochemistry,
  57 records incl. update rows) and 102-INT-physiology-concepts.md (physiology,
  57 records: 27 full concepts on Introduction/Blood/Autonomic nervous system,
  plus 30 hand-authored atomic "teaching.*" update rows on erythrocytes,
  erythropoiesis, anaemia and anticoagulants).

  Evidence: evidence/102-INT-claims.md (38 curated) + generated-claims.md (100),
  evidence/102-INT-citations.md (38 curated) + generated-citations.md (75), all
  citing evidence/102-INT-sources.md's single department-book resource
  src_a488633802ec053c6325.

  Coverage: biochemistry classification/structure hierarchies (enzyme
  inhibition, eicosanoid pathway, nucleotide coenzymes/second messengers),
  the replication -> transcription -> translation mechanism chain (following
  the book's own chapter order), haemoglobin/globin structure; physiology
  blood (erythropoiesis -> iron -> hepcidin -> anaemia/polycythemia,
  coagulation limitation -> anticoagulants -> screening tests, ABO/Rh ->
  transfusion -> erythroblastosis fetalis) and the autonomic nervous system
  (ganglia types, cholinergic/adrenergic transmitters, sympathetic/
  parasympathetic contrast).

  Every relation reuses an existing claim from the two claims files above —
  no claim or citation was authored by this batch. `verification_status:
  verified` only where the reused claim(s) also carry a citation in the
  citations files; the rest are `needs_evidence` honestly, not because the
  book doesn't support them but because no citation has been written for
  that specific claim yet.

  Concepts left with zero edges, and why (no claim anywhere states the fact,
  or no other concept's claim genuinely overlaps it): CON-FND-38F8E2264D46B1
  (mannitol), CON-FND-3D6B24CAA42AC2 (sulfur amino acids), CON-FND-
  57DC83CE4A718B (basic amino acids), CON-FND-2AA1E4F3853330 is linked but
  CON-FND-E50700FFFCF367 (dna-vs-rna comparison) and CON-FND-DD3EE5EC8C07D1
  (LDH/CK isoenzymes, whose own label says the department book does not cover
  the topic) are not, nor are most of the biconcavity/free-haemoglobin/
  heparin-pharmacokinetic "teaching.*" rows (CON-HEM-DC720AB51077EE,
  CON-HEM-22EA160E4CADF3, CON-HEM-23E454BD997B29, CON-HEM-4D81B00010EB88,
  CON-HEM-19F1320464EC3B, CON-HEM-B71DE46C254775, CON-HEM-B70E44482E6095,
  CON-HEM-09F3E7013DEF40, CON-HEM-F0B1AE47105A5B, CON-HEM-881E8EA781D8E2,
  CON-HEM-8B4F811AE09E0F, CON-HEM-A940AB960A5C0D's pharmacokinetic detail,
  CON-HEM-09A2A0430050D6's citrate/oxalate mechanism, CON-HEM-1975918ED45C76's
  cellular origin) — see the relations report for the full list.

  Hand-authored. No `## id` on any record (all derive as
  `rel-<source>-<type>-<target>`). No `## field_notes` (relations have no
  such column).
-->

# Item

## source
CON-FND-F29934C070A94C

## type
prerequisite_of

## target
CON-FND-CB8584ED2F3C49

## evidence_claim_ids
CLM-FND-FACTORS-AFFECTING-ENZYME-REACTION-RATE-01

## citation_ids
CIT-FACTORS-AFFECTING-ENZYME-REACTION-RATE-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-CB8584ED2F3C49

## type
prerequisite_of

## target
CON-FND-C04259379794DA

## evidence_claim_ids
CLM-FND-COMPETITIVE-ENZYME-INHIBITION-MECHANISM-01

## citation_ids
CIT-COMPETITIVE-ENZYME-INHIBITION-MECHANISM-01

## verification_status
verified

## confidence
0.8

## reviewed_at
2026-08-22

---

# Item

## source
CON-INF-5A15540CA80809

## type
is_a

## target
CON-FND-CB8584ED2F3C49

## evidence_claim_ids
CLM-INF-SULFONAMIDE-COMPETITIVE-INHIBITION-OF-FO-01

## citation_ids
CIT-SULFONAMIDE-COMPETITIVE-INHIBITION-OF-FO-01

## verification_status
verified

## confidence
0.85

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-534286EBBAC239

## type
part_of

## target
CON-FND-D6DFABFBA0BA5E

## evidence_claim_ids
CLM-FND-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01

## citation_ids
CIT-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-12CE1BF1D6C77C

## type
part_of

## target
CON-FND-D6DFABFBA0BA5E

## evidence_claim_ids
CLM-FND-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01

## citation_ids
CIT-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-F16D60268905BC

## type
mechanism_step_before

## target
CON-FND-12CE1BF1D6C77C

## evidence_claim_ids
CLM-NEU-ADRENERGIC-RECEPTOR-DISTRIBUTION-AND-ACT-01

## citation_ids
CIT-ADRENERGIC-RECEPTOR-DISTRIBUTION-AND-ACT-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-5BAF472E54A764

## type
prerequisite_of

## target
CON-FND-81A17C5BF7ED85

## evidence_claim_ids
CLM-FND-DNA-DOUBLE-HELIX-ANTIPARALLEL-STRANDS-01

## citation_ids
CIT-DNA-DOUBLE-HELIX-ANTIPARALLEL-STRANDS-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-81A17C5BF7ED85

## type
mechanism_step_before

## target
CON-FND-A73C06E0EC3C1D

## evidence_claim_ids
CLM-FND-REPLICATION-FORK-STRAND-SEPARATION-01

## citation_ids
CIT-REPLICATION-FORK-STRAND-SEPARATION-01

## verification_status
verified

## confidence
0.85

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-A73C06E0EC3C1D

## type
associated_with

## target
CON-FND-DEE7732AEC0F74

## evidence_claim_ids
CLM-FND-EUKARYOTIC-DNA-POLYMERASES-AND-ROLES-01

## citation_ids
CIT-EUKARYOTIC-DNA-POLYMERASES-AND-ROLES-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-A73C06E0EC3C1D

## type
mechanism_step_before

## target
CON-FND-CC55F157021237

## evidence_claim_ids
CLM-FND-EUKARYOTIC-DNA-POLYMERASES-AND-ROLES-01

## citation_ids
CIT-EUKARYOTIC-DNA-POLYMERASES-AND-ROLES-01

## verification_status
verified

## confidence
0.55

## qualifiers
scope: department book chapter sequence, DNA Synthesis then RNA Synthesis

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-CC55F157021237

## type
mechanism_step_before

## target
CON-FND-27013C64915C7E

## evidence_claim_ids
CLM-FND-EUKARYOTIC-TRANSCRIPTION-ELEMENTS-AND-MR-01

## citation_ids
CIT-EUKARYOTIC-TRANSCRIPTION-ELEMENTS-AND-MR-01

## verification_status
verified

## confidence
0.8

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-27013C64915C7E

## type
mechanism_step_before

## target
CON-FND-D23183EAACF5B7

## evidence_claim_ids
CLM-FND-MRNA-SPLICING-AND-ALTERNATIVE-SPLICING-01

## citation_ids
CIT-MRNA-SPLICING-AND-ALTERNATIVE-SPLICING-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-D23183EAACF5B7

## type
mechanism_step_before

## target
CON-FND-344140D2457FBB

## evidence_claim_ids
CLM-FND-POST-TRANSLATIONAL-COVALENT-MODIFICATION-01

## citation_ids
CIT-POST-TRANSLATIONAL-COVALENT-MODIFICATION-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-3BF934540F73CD

## type
mechanism_step_before

## target
CON-FND-4508AC0EA86F86

## evidence_claim_ids
CLM-FND-POINT-MUTATION-TYPES-AND-CONSEQUENCES-01

## citation_ids
CIT-POINT-MUTATION-TYPES-AND-CONSEQUENCES-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-D23183EAACF5B7

## type
prerequisite_of

## target
CON-FND-4508AC0EA86F86

## evidence_claim_ids
CLM-FND-POINT-MUTATION-TYPES-AND-CONSEQUENCES-01

## citation_ids
CIT-POINT-MUTATION-TYPES-AND-CONSEQUENCES-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-4508AC0EA86F86

## type
mechanism_step_before

## target
CON-FND-344140D2457FBB

## evidence_claim_ids
CLM-FND-POST-TRANSLATIONAL-COVALENT-MODIFICATION-01

## citation_ids
CIT-POST-TRANSLATIONAL-COVALENT-MODIFICATION-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-87DC8A5CE668F7

## type
contrasts_with

## target
CON-FND-5BAF472E54A764

## evidence_claim_ids
CLM-FND-MITOCHONDRIAL-DNA-CHARACTERISTICS-01

## citation_ids
CIT-MITOCHONDRIAL-DNA-CHARACTERISTICS-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-5BAF472E54A764

## type
contrasts_with

## target
CON-FND-87DC8A5CE668F7

## evidence_claim_ids
CLM-FND-MITOCHONDRIAL-DNA-CHARACTERISTICS-01

## citation_ids
CIT-MITOCHONDRIAL-DNA-CHARACTERISTICS-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-1F66060A9C2625

## type
prerequisite_of

## target
CON-FND-A73C06E0EC3C1D

## evidence_claim_ids
CLM-FND-CELL-CYCLE-AND-APOPTOSIS-REGULATORY-PROT-01

## citation_ids
CIT-CELL-CYCLE-AND-APOPTOSIS-REGULATORY-PROT-01

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-2414B3639FD4D3

## type
prerequisite_of

## target
CON-FND-14647EC60106E1

## evidence_claim_ids
CLM-FND-PROTEIN-DENATURATION-EFFECTS-01

## citation_ids
CIT-PROTEIN-DENATURATION-EFFECTS-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-D0EDFFF1477094

## type
prerequisite_of

## target
CON-FND-2414B3639FD4D3

## evidence_claim_ids
CLM-FND-PROTEIN-DENATURATION-EFFECTS-01

## citation_ids
CIT-PROTEIN-DENATURATION-EFFECTS-01

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-D1FDD52629718C

## type
prerequisite_of

## target
CON-FND-588CA87354B099

## evidence_claim_ids
CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01

## citation_ids
CIT-MEMBRANE-FLUIDITY-DETERMINANTS-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-588CA87354B099

## type
mechanism_step_before

## target
CON-FND-445EEBE58E1F25

## evidence_claim_ids
CLM-FND-EICOSANOID-SYNTHESIS-PATHWAY-ENZYMES-01

## citation_ids
CIT-EICOSANOID-SYNTHESIS-PATHWAY-ENZYMES-01

## verification_status
verified

## confidence
0.85

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-445EEBE58E1F25

## type
prerequisite_of

## target
CON-FND-4C1A1DFB1C6FA2

## evidence_claim_ids
CLM-FND-EICOSANOID-PATHWAY-DRUG-TARGETS-01

## citation_ids
CIT-EICOSANOID-PATHWAY-DRUG-TARGETS-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-588CA87354B099

## type
prerequisite_of

## target
CON-HEM-543C749CEB67BF

## evidence_claim_ids
CLM-FND-EICOSANOID-SYNTHESIS-PATHWAY-ENZYMES-01

## citation_ids
CIT-EICOSANOID-SYNTHESIS-PATHWAY-ENZYMES-01

## verification_status
verified

## confidence
0.8

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-543C749CEB67BF

## type
prerequisite_of

## target
CON-FND-4C1A1DFB1C6FA2

## evidence_claim_ids
CLM-HEM-THROMBOXANE-A2-AND-PROSTACYCLIN-BALANCE-01

## citation_ids
CIT-THROMBOXANE-A2-AND-PROSTACYCLIN-BALANCE-01

## verification_status
verified

## confidence
0.8

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-E77FD4A4D78884

## type
associated_with

## target
CON-FND-D1FDD52629718C

## evidence_claim_ids
CLM-FND-CHOLESTEROL-IMPORTANCE-AND-DERIVATIVES-01

## citation_ids
CIT-CHOLESTEROL-IMPORTANCE-AND-DERIVATIVES-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-D1FDD52629718C

## type
associated_with

## target
CON-FND-E77FD4A4D78884

## evidence_claim_ids
CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01

## citation_ids
CIT-MEMBRANE-FLUIDITY-DETERMINANTS-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-D1FDD52629718C

## type
prerequisite_of

## target
CON-MUL-4749CA1B14B669

## evidence_claim_ids
CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01

## citation_ids
CIT-MEMBRANE-FLUIDITY-DETERMINANTS-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-D1FDD52629718C

## type
associated_with

## target
CON-FND-2AA1E4F3853330

## evidence_claim_ids
CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01

## citation_ids
CIT-MEMBRANE-FLUIDITY-DETERMINANTS-01

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-2AA1E4F3853330

## type
associated_with

## target
CON-FND-D1FDD52629718C

## evidence_claim_ids
CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01

## citation_ids
CIT-MEMBRANE-FLUIDITY-DETERMINANTS-01

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-0E5FE994670D4A

## type
prerequisite_of

## target
CON-HEM-741FE61E6062DB

## evidence_claim_ids
CLM-HEM-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## citation_ids
CIT-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-0E5FE994670D4A

## type
prerequisite_of

## target
CON-HEM-3B1C5DBC2DB666

## evidence_claim_ids
CLM-HEM-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## citation_ids
CIT-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-620F7B36ACAA16

## type
composed_of

## target
CON-HEM-0E5FE994670D4A

## evidence_claim_ids
CLM-HEM-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## citation_ids
CIT-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-END-47313D5F26B03A

## type
is_a

## target
CON-HEM-620F7B36ACAA16

## evidence_claim_ids
CLM-END-HBA1C-THREE-MONTH-GLYCAEMIC-WINDOW-01

## citation_ids
CIT-HBA1C-THREE-MONTH-GLYCAEMIC-WINDOW-01

## verification_status
verified

## confidence
0.85

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-620F7B36ACAA16

## type
prerequisite_of

## target
CON-HEM-CA5D4380823112

## evidence_claim_ids
CLM-7640D27720C0

## verification_status
needs_evidence

## confidence
0.7

---

# Item

## source
CON-HEM-60C24B6F5C0EC2

## type
prerequisite_of

## target
CON-END-47313D5F26B03A

## evidence_claim_ids
CLM-END-HBA1C-THREE-MONTH-GLYCAEMIC-WINDOW-01

## citation_ids
CIT-HBA1C-THREE-MONTH-GLYCAEMIC-WINDOW-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-428F8B432AF540

## type
prerequisite_of

## target
CON-HEM-3BA196A0474CA7

## evidence_claim_ids
CLM-4FD7C67EF9D1

## citation_ids
CIT-4D2A689E3FE8

## verification_status
verified

## confidence
0.8

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-CAB75A4AE56C30

## type
prerequisite_of

## target
CON-HEM-ECAAD731BC13D7

## evidence_claim_ids
CLM-7B23D599A775

## verification_status
needs_evidence

## confidence
0.7

---

# Item

## source
CON-HEM-58D4AD4945A1DF

## type
prerequisite_of

## target
CON-HEM-ECAAD731BC13D7

## evidence_claim_ids
CLM-69065E8580AA

## citation_ids
CIT-ABDB630D9288

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-58D4AD4945A1DF

## type
part_of

## target
CON-HEM-428F8B432AF540

## evidence_claim_ids
CLM-94EF973346B8

## citation_ids
CIT-C493219F7173

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-58D4AD4945A1DF

## type
prerequisite_of

## target
CON-HEM-620F7B36ACAA16

## evidence_claim_ids
CLM-08B41CC250BF

## citation_ids
CIT-76BC2C4A826F

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-620F7B36ACAA16

## type
prerequisite_of

## target
CON-HEM-6DBD73A50D2AD4

## evidence_claim_ids
CLM-7640D27720C0

## verification_status
needs_evidence

## confidence
0.55

## qualifiers
scope: department book chapter sequence, RBCs then Erythropoiesis

---

# Item

## source
CON-HEM-6DBD73A50D2AD4

## type
prerequisite_of

## target
CON-HEM-A3B0CEA5DFA83E

## evidence_claim_ids
CLM-57917D58DF1B

## citation_ids
CIT-2A79431E18EE

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A3B0CEA5DFA83E

## type
prerequisite_of

## target
CON-HEM-47DFF88A145F5E

## evidence_claim_ids
CLM-F202C01B3CAE

## citation_ids
CIT-4A2DEFCAFFDF

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-6DBD73A50D2AD4

## type
causes

## target
CON-HEM-3FDA659AB5822B

## evidence_claim_ids
CLM-CA81DB0ACF78

## citation_ids
CIT-88270F563FA0

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-3FDA659AB5822B

## type
contrasts_with

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-9CD275B2463C

## citation_ids
CIT-3140A770FC38

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-D99354F69912CD

## type
contrasts_with

## target
CON-HEM-3FDA659AB5822B

## evidence_claim_ids
CLM-2E477C8FE558

## verification_status
needs_evidence

## confidence
0.65

---

# Item

## source
CON-HEM-A858B859CA693E

## type
prerequisite_of

## target
CON-HEM-A6420C4B3B3D9A

## evidence_claim_ids
CLM-948C8828937E

## citation_ids
CIT-674291F567DB

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A858B859CA693E

## type
prerequisite_of

## target
CON-HEM-E0B694DE0AF467

## evidence_claim_ids
CLM-948C8828937E

## citation_ids
CIT-674291F567DB

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-E0B694DE0AF467

## type
causes

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-97737DAD6A37

## citation_ids
CIT-72E081A45F11

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A6420C4B3B3D9A

## type
prerequisite_of

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-2E477C8FE558

## verification_status
needs_evidence

## confidence
0.65

---

# Item

## source
CON-HEM-A6420C4B3B3D9A

## type
prerequisite_of

## target
CON-HEM-A92555744C9B35

## evidence_claim_ids
CLM-FF076E88EDC5

## verification_status
needs_evidence

## confidence
0.7

---

# Item

## source
CON-HEM-A92555744C9B35

## type
causes

## target
CON-HEM-7F0EF6B0D6F2FB

## evidence_claim_ids
CLM-FF076E88EDC5

## verification_status
needs_evidence

## confidence
0.6

---

# Item

## source
CON-HEM-BDED630BBC87A3

## type
causes

## target
CON-HEM-7F0EF6B0D6F2FB

## evidence_claim_ids
CLM-FF076E88EDC5

## verification_status
needs_evidence

## confidence
0.55

---

# Item

## source
CON-HEM-7F0EF6B0D6F2FB

## type
is_a

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-2E477C8FE558

## verification_status
needs_evidence

## confidence
0.75

---

# Item

## source
CON-HEM-47DFF88A145F5E

## type
causes

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-2E477C8FE558

## verification_status
needs_evidence

## confidence
0.7

---

# Item

## source
CON-HEM-9BDC2EB39840B4

## type
causes

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-2E477C8FE558

## verification_status
needs_evidence

## confidence
0.7

---

# Item

## source
CON-HEM-CDF561308A4D25

## type
is_a

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-2E477C8FE558

## verification_status
needs_evidence

## confidence
0.55

---

# Item

## source
CON-HEM-D76C58506E52B7

## type
mechanism_step_before

## target
CON-HEM-DDAAF125FD2EBE

## evidence_claim_ids
CLM-HEM-VITAMIN-B12-IMPORTANCE-AND-DEFICIENCY-01

## citation_ids
CIT-VITAMIN-B12-IMPORTANCE-AND-DEFICIENCY-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-D76C58506E52B7

## type
prerequisite_of

## target
CON-HEM-AA67D0E4B516BF

## evidence_claim_ids
CLM-HEM-VITAMIN-B12-ABSORPTION-INTRINSIC-FACTOR-01

## citation_ids
CIT-VITAMIN-B12-ABSORPTION-INTRINSIC-FACTOR-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-AA67D0E4B516BF

## type
mechanism_step_before

## target
CON-HEM-DDAAF125FD2EBE

## evidence_claim_ids
CLM-HEM-VITAMIN-B12-IMPORTANCE-AND-DEFICIENCY-01

## citation_ids
CIT-VITAMIN-B12-IMPORTANCE-AND-DEFICIENCY-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-005D132395BF2F

## type
prerequisite_of

## target
CON-HEM-87280E690F877F

## evidence_claim_ids
CLM-HEM-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01

## citation_ids
CIT-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-005D132395BF2F

## type
prerequisite_of

## target
CON-HEM-BC9F1F59205EC7

## evidence_claim_ids
CLM-HEM-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01

## citation_ids
CIT-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-87280E690F877F

## type
prerequisite_of

## target
CON-HEM-543C749CEB67BF

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-543C749CEB67BF

## type
prerequisite_of

## target
CON-HEM-E20402B19F5D30

## evidence_claim_ids
CLM-HEM-THROMBOXANE-A2-AND-PROSTACYCLIN-BALANCE-01

## citation_ids
CIT-THROMBOXANE-A2-AND-PROSTACYCLIN-BALANCE-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-87280E690F877F

## type
prerequisite_of

## target
CON-HEM-365C9EF32A0003

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-87280E690F877F

## type
prerequisite_of

## target
CON-HEM-FF26A3D7EE6DB7

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-FF26A3D7EE6DB7

## type
is_a

## target
CON-HEM-365C9EF32A0003

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-BC9F1F59205EC7

## type
prerequisite_of

## target
CON-HEM-121DCA556B6311

## evidence_claim_ids
CLM-E21046ABB924

## citation_ids
CIT-EDC69230BE08

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-121DCA556B6311

## type
is_a

## target
CON-HEM-365C9EF32A0003

## evidence_claim_ids
CLM-E21046ABB924

## citation_ids
CIT-EDC69230BE08

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-BC9F1F59205EC7

## type
diagnosed_by

## target
CON-HEM-C15EB1D9B62C8B

## evidence_claim_ids
CLM-430E42887700

## citation_ids
CIT-A499A6F532C2

## verification_status
verified

## confidence
0.8

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-54B08B015D5498

## type
diagnosed_by

## target
CON-HEM-C15EB1D9B62C8B

## evidence_claim_ids
CLM-979D71A9E9ED

## citation_ids
CIT-A00F812C8200

## verification_status
verified

## confidence
0.8

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-33CFB175D5114C

## type
causes

## target
CON-HEM-E55B5F7BA5CD04

## evidence_claim_ids
CLM-2EF7F05D1544

## citation_ids
CIT-0EBE9B092256

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-9160359ACB982D

## type
prerequisite_of

## target
CON-HEM-190088073C5F5E

## evidence_claim_ids
CLM-53615D4D963A

## citation_ids
CIT-177595D246CD

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-190088073C5F5E

## type
prerequisite_of

## target
CON-HEM-6C81E4B3EB30DE

## evidence_claim_ids
CLM-8460B6A09A75

## citation_ids
CIT-25E900DFDC9D

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-6C81E4B3EB30DE

## type
treated_by

## target
CON-HEM-1AFD5256338BA6

## evidence_claim_ids
CLM-BB1DEFF0B57B

## citation_ids
CIT-37CC08F5D37B

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-9160359ACB982D

## type
prerequisite_of

## target
CON-HEM-1AFD5256338BA6

## evidence_claim_ids
CLM-3A6C61FFB299

## citation_ids
CIT-16840755D9C5

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-190088073C5F5E

## type
prerequisite_of

## target
CON-HEM-1AFD5256338BA6

## evidence_claim_ids
CLM-3A6C61FFB299

## citation_ids
CIT-16840755D9C5

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-5CCFCC7E8DD150

## type
part_of

## target
CON-HEM-1AFD5256338BA6

## evidence_claim_ids
CLM-00846990E194

## verification_status
needs_evidence

## confidence
0.7

---

# Item

## source
CON-HEM-1AFD5256338BA6

## type
causes

## target
CON-HEM-2F0FB0B040A268

## evidence_claim_ids
CLM-00846990E194

## verification_status
needs_evidence

## confidence
0.6

---

# Item

## source
CON-HEM-9D43F05669BB37

## type
part_of

## target
CON-HEM-9160359ACB982D

## evidence_claim_ids
CLM-53615D4D963A

## citation_ids
CIT-177595D246CD

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-1F023F6441DF6A

## type
prerequisite_of

## target
CON-NEU-449C26E1F64F74

## evidence_claim_ids
CLM-7AF4800E4F02

## citation_ids
CIT-056FF7C17255

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-449C26E1F64F74

## type
prerequisite_of

## target
CON-NEU-D28EA156B57AB0

## evidence_claim_ids
CLM-E734566D932C

## citation_ids
CIT-5A9DC9B1B42A

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-D28EA156B57AB0

## type
prerequisite_of

## target
CON-NEU-A78CC0816E3824

## evidence_claim_ids
CLM-1CCF7A68E5A0

## citation_ids
CIT-26E0309D8479

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-D28EA156B57AB0

## type
prerequisite_of

## target
CON-NEU-FCFD384A1011F8

## evidence_claim_ids
CLM-1CCF7A68E5A0

## citation_ids
CIT-26E0309D8479

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-FCFD384A1011F8

## type
prerequisite_of

## target
CON-NEU-C3D7B209FB3260

## evidence_claim_ids
CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01

## citation_ids
CIT-AUTONOMIC-GANGLIA-TYPES-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-FCFD384A1011F8

## type
prerequisite_of

## target
CON-NEU-EF92EEB546EA99

## evidence_claim_ids
CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01

## citation_ids
CIT-AUTONOMIC-GANGLIA-TYPES-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-FCFD384A1011F8

## type
prerequisite_of

## target
CON-NEU-1B57CDAD7DEBCF

## evidence_claim_ids
CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01

## citation_ids
CIT-AUTONOMIC-GANGLIA-TYPES-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-1DB903AAE3D02A

## type
prerequisite_of

## target
CON-NEU-C3D7B209FB3260

## evidence_claim_ids
CLM-NEU-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01

## citation_ids
CIT-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-1DB903AAE3D02A

## type
prerequisite_of

## target
CON-NEU-DCDACCB179C2A5

## evidence_claim_ids
CLM-NEU-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01

## citation_ids
CIT-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-1DB903AAE3D02A

## type
prerequisite_of

## target
CON-NEU-F16D60268905BC

## evidence_claim_ids
CLM-NEU-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01

## citation_ids
CIT-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-F16D60268905BC

## type
prerequisite_of

## target
CON-NEU-DCDACCB179C2A5

## evidence_claim_ids
CLM-NEU-ADRENERGIC-RECEPTOR-DISTRIBUTION-AND-ACT-01

## citation_ids
CIT-ADRENERGIC-RECEPTOR-DISTRIBUTION-AND-ACT-01

## verification_status
verified

## confidence
0.8

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-1DB903AAE3D02A

## type
mechanism_step_before

## target
CON-NEU-ACE8344E6D9D43

## evidence_claim_ids
CLM-NEU-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01

## citation_ids
CIT-CHOLINERGIC-AND-ADRENERGIC-FIBRE-TRANSMI-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-F16D60268905BC

## type
mechanism_step_before

## target
CON-NEU-ACE8344E6D9D43

## evidence_claim_ids
CLM-NEU-ADRENERGIC-RECEPTOR-DISTRIBUTION-AND-ACT-01

## citation_ids
CIT-ADRENERGIC-RECEPTOR-DISTRIBUTION-AND-ACT-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-DCDACCB179C2A5

## type
contrasts_with

## target
CON-NEU-C3D7B209FB3260

## evidence_claim_ids
CLM-NEU-SYMPATHETIC-ALARM-STRESS-RESPONSE-01

## citation_ids
CIT-SYMPATHETIC-ALARM-STRESS-RESPONSE-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-C3D7B209FB3260

## type
contrasts_with

## target
CON-NEU-DCDACCB179C2A5

## evidence_claim_ids
CLM-NEU-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01

## citation_ids
CIT-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-EF92EEB546EA99

## type
associated_with

## target
CON-NEU-C3D7B209FB3260

## evidence_claim_ids
CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01

## citation_ids
CIT-AUTONOMIC-GANGLIA-TYPES-01

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-C3D7B209FB3260

## type
associated_with

## target
CON-NEU-EF92EEB546EA99

## evidence_claim_ids
CLM-NEU-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01

## citation_ids
CIT-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-1F023F6441DF6A

## type
prerequisite_of

## target
CON-NEU-D28EA156B57AB0

## evidence_claim_ids
CLM-08C98E8B0192

## verification_status
needs_evidence

## confidence
0.6

---

# Item

## source
CON-NEU-1F023F6441DF6A

## type
prerequisite_of

## target
CON-NEU-1DB903AAE3D02A

## evidence_claim_ids
CLM-5B59F4074737

## verification_status
needs_evidence

## confidence
0.6

---

# Item

## source
CON-NEU-1DB903AAE3D02A

## type
prerequisite_of

## target
CON-NEU-A78CC0816E3824

## evidence_claim_ids
CLM-D2E245363338

## citation_ids
CIT-CBB188E2E13C

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-FCFD384A1011F8

## type
prerequisite_of

## target
CON-NEU-F16D60268905BC

## evidence_claim_ids
CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01

## citation_ids
CIT-AUTONOMIC-GANGLIA-TYPES-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-A73C06E0EC3C1D

## type
prerequisite_of

## target
CON-FND-87DC8A5CE668F7

## evidence_claim_ids
CLM-FND-EUKARYOTIC-DNA-POLYMERASES-AND-ROLES-01

## citation_ids
CIT-EUKARYOTIC-DNA-POLYMERASES-AND-ROLES-01

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-E0B694DE0AF467

## type
regulates

## target
CON-HEM-A6420C4B3B3D9A

## evidence_claim_ids
CLM-29BFF2DADAA5

## citation_ids
CIT-CFF1F5367AB9

## verification_status
verified

## confidence
0.75

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-DDAAF125FD2EBE

## type
causes

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-2E477C8FE558

## verification_status
needs_evidence

## confidence
0.75

---

# Item

## source
CON-HEM-9D43F05669BB37

## type
part_of

## target
CON-HEM-190088073C5F5E

## evidence_claim_ids
CLM-B7AF44BEF005

## citation_ids
CIT-B91B25105539

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-532BFAEE98CC39

## type
is_a

## target
CON-HEM-365C9EF32A0003

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-2BF99442385474

## type
is_a

## target
CON-HEM-365C9EF32A0003

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A940AB960A5C0D

## type
is_a

## target
CON-HEM-365C9EF32A0003

## evidence_claim_ids
CLM-E21046ABB924

## citation_ids
CIT-EDC69230BE08

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-09A2A0430050D6

## type
is_a

## target
CON-HEM-365C9EF32A0003

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-121DCA556B6311

## type
mechanism_step_before

## target
CON-HEM-A940AB960A5C0D

## evidence_claim_ids
CLM-E21046ABB924

## citation_ids
CIT-EDC69230BE08

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-FF26A3D7EE6DB7

## type
mechanism_step_before

## target
CON-HEM-532BFAEE98CC39

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-2BF99442385474

## type
associated_with

## target
CON-HEM-1975918ED45C76

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-1975918ED45C76

## type
associated_with

## target
CON-HEM-2BF99442385474

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-6C81E4B3EB30DE

## type
contrasts_with

## target
CON-HEM-9160359ACB982D

## evidence_claim_ids
CLM-186884BE317E

## citation_ids
CIT-CFD14E044E1C

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-9160359ACB982D

## type
contrasts_with

## target
CON-HEM-6C81E4B3EB30DE

## evidence_claim_ids
CLM-53615D4D963A

## citation_ids
CIT-177595D246CD

## verification_status
verified

## confidence
0.7

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-D99354F69912CD

## type
treated_by

## target
CON-HEM-6DBD73A50D2AD4

## evidence_claim_ids
CLM-FCDFAD62B26A

## citation_ids
CIT-E9543AF570ED

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-58D4AD4945A1DF

## type
prerequisite_of

## target
CON-HEM-E55B5F7BA5CD04

## evidence_claim_ids
CLM-08B41CC250BF

## citation_ids
CIT-76BC2C4A826F

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-58D4AD4945A1DF

## type
prerequisite_of

## target
CON-HEM-87280E690F877F

## evidence_claim_ids
CLM-08B41CC250BF

## citation_ids
CIT-76BC2C4A826F

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-14647EC60106E1

## type
associated_with

## target
CON-FND-F32B7A523D305A

## evidence_claim_ids
CLM-FND-COLLAGEN-STRUCTURAL-STRENGTH-BASIS-01

## citation_ids
CIT-COLLAGEN-STRUCTURAL-STRENGTH-BASIS-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-F32B7A523D305A

## type
associated_with

## target
CON-FND-14647EC60106E1

## evidence_claim_ids
CLM-FND-GAG-SHOCK-ABSORPTION-MECHANISM-01

## citation_ids
CIT-GAG-SHOCK-ABSORPTION-MECHANISM-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-B4916A9B4C980C

## type
prerequisite_of

## target
CON-NEU-DCDACCB179C2A5

## evidence_claim_ids
CLM-NEU-SYMPATHETIC-ALARM-STRESS-RESPONSE-01

## citation_ids
CIT-SYMPATHETIC-ALARM-STRESS-RESPONSE-01

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-449C26E1F64F74

## type
prerequisite_of

## target
CON-NEU-A78CC0816E3824

## evidence_claim_ids
CLM-E734566D932C

## citation_ids
CIT-5A9DC9B1B42A

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-9160359ACB982D

## type
prerequisite_of

## target
CON-HEM-2F0FB0B040A268

## evidence_claim_ids
CLM-0391E9F3745D

## citation_ids
CIT-FE542C77313A

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-33CFB175D5114C

## type
treated_by

## target
CON-HEM-1AFD5256338BA6

## evidence_claim_ids
CLM-BB1DEFF0B57B

## citation_ids
CIT-37CC08F5D37B

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-54B08B015D5498

## type
treated_by

## target
CON-HEM-1AFD5256338BA6

## evidence_claim_ids
CLM-BB1DEFF0B57B

## citation_ids
CIT-37CC08F5D37B

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-EF92EEB546EA99

## type
associated_with

## target
CON-NEU-DCDACCB179C2A5

## evidence_claim_ids
CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01

## citation_ids
CIT-AUTONOMIC-GANGLIA-TYPES-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-DCDACCB179C2A5

## type
associated_with

## target
CON-NEU-EF92EEB546EA99

## evidence_claim_ids
CLM-NEU-SYMPATHETIC-ALARM-STRESS-RESPONSE-01

## citation_ids
CIT-SYMPATHETIC-ALARM-STRESS-RESPONSE-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-1B57CDAD7DEBCF

## type
associated_with

## target
CON-NEU-C3D7B209FB3260

## evidence_claim_ids
CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01

## citation_ids
CIT-AUTONOMIC-GANGLIA-TYPES-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-NEU-C3D7B209FB3260

## type
associated_with

## target
CON-NEU-1B57CDAD7DEBCF

## evidence_claim_ids
CLM-NEU-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01

## citation_ids
CIT-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-620F7B36ACAA16

## type
prerequisite_of

## target
CON-HEM-D99354F69912CD

## evidence_claim_ids
CLM-6DDF30856B30

## citation_ids
CIT-72AF6B4A0DB4

## verification_status
verified

## confidence
0.65

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-CAB75A4AE56C30

## type
prerequisite_of

## target
CON-HEM-87280E690F877F

## evidence_claim_ids
CLM-2CC2C4A1817F

## verification_status
needs_evidence

## confidence
0.6

---

# Item

## source
CON-FND-D6DFABFBA0BA5E

## type
prerequisite_of

## target
CON-FND-5BAF472E54A764

## evidence_claim_ids
CLM-FND-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01

## citation_ids
CIT-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-FND-D6DFABFBA0BA5E

## type
prerequisite_of

## target
CON-FND-CC55F157021237

## evidence_claim_ids
CLM-FND-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01

## citation_ids
CIT-FREE-NUCLEOTIDE-BIOLOGICAL-FUNCTIONS-01

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A858B859CA693E

## type
associated_with

## target
CON-HEM-0E5FE994670D4A

## evidence_claim_ids
CLM-A6E19C6F39E7

## citation_ids
CIT-5E3AAFAAFE1A

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-0E5FE994670D4A

## type
associated_with

## target
CON-HEM-A858B859CA693E

## evidence_claim_ids
CLM-HEM-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## citation_ids
CIT-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## verification_status
verified

## confidence
0.45

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A858B859CA693E

## type
associated_with

## target
CON-HEM-A3B0CEA5DFA83E

## evidence_claim_ids
CLM-948C8828937E

## citation_ids
CIT-674291F567DB

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A3B0CEA5DFA83E

## type
associated_with

## target
CON-HEM-A858B859CA693E

## evidence_claim_ids
CLM-B2CAC01D46BF

## verification_status
needs_evidence

## confidence
0.5

---

# Item

## source
CON-FND-27013C64915C7E

## type
mechanism_step_before

## target
CON-FND-344140D2457FBB

## evidence_claim_ids
CLM-FND-MRNA-SPLICING-AND-ALTERNATIVE-SPLICING-01

## citation_ids
CIT-MRNA-SPLICING-AND-ALTERNATIVE-SPLICING-01

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-87280E690F877F

## type
prerequisite_of

## target
CON-HEM-C15EB1D9B62C8B

## evidence_claim_ids
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## citation_ids
CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A858B859CA693E

## type
prerequisite_of

## target
CON-HEM-A3B0CEA5DFA83E

## evidence_claim_ids
CLM-948C8828937E

## citation_ids
CIT-674291F567DB

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-E20402B19F5D30

## type
prerequisite_of

## target
CON-HEM-E55B5F7BA5CD04

## evidence_claim_ids
CLM-67525DA69524

## citation_ids
CIT-1ED9722631A6

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-58D4AD4945A1DF

## type
prerequisite_of

## target
CON-HEM-9160359ACB982D

## evidence_claim_ids
CLM-08B41CC250BF

## citation_ids
CIT-76BC2C4A826F

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-0E5FE994670D4A

## type
prerequisite_of

## target
CON-HEM-CA5D4380823112

## evidence_claim_ids
CLM-HEM-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## citation_ids
CIT-GLOBIN-PROTEIN-PART-FUNCTIONS-01

## verification_status
verified

## confidence
0.6

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A6420C4B3B3D9A

## type
prerequisite_of

## target
CON-HEM-BDED630BBC87A3

## evidence_claim_ids
CLM-FF076E88EDC5

## verification_status
needs_evidence

## confidence
0.55

---

# Item

## source
CON-HEM-58D4AD4945A1DF

## type
prerequisite_of

## target
CON-HEM-A858B859CA693E

## evidence_claim_ids
CLM-08B41CC250BF

## citation_ids
CIT-76BC2C4A826F

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-005D132395BF2F

## type
prerequisite_of

## target
CON-HEM-6DBD73A50D2AD4

## evidence_claim_ids
CLM-HEM-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01

## citation_ids
CIT-PLASMA-PROTEINS-FORMATION-AND-FUNCTIONS-01

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-A3B0CEA5DFA83E

## type
prerequisite_of

## target
CON-HEM-9BDC2EB39840B4

## evidence_claim_ids
CLM-F202C01B3CAE

## citation_ids
CIT-4A2DEFCAFFDF

## verification_status
verified

## confidence
0.5

## reviewed_at
2026-08-22

---

# Item

## source
CON-HEM-58D4AD4945A1DF

## type
prerequisite_of

## target
CON-HEM-005D132395BF2F

## evidence_claim_ids
CLM-08B41CC250BF

## citation_ids
CIT-76BC2C4A826F

## verification_status
verified

## confidence
0.55

## reviewed_at
2026-08-22
