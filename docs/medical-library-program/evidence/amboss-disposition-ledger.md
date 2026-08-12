# AMBOSS disposition ledger

`TAX-COMPARE-001`. Regenerate with
`node --experimental-strip-types scripts/build-amboss-disposition-ledger.mjs`.

AMBOSS is a **structural comparator only** (LD-08, LD-11). Nothing here proposes
copying its prose, tables, media or hierarchy, and no node in this ledger is a
taxonomy change — a candidate needs evidence beyond AMBOSS before it becomes one.

**644 in-scope nodes** across 4 branches.
The five out-of-scope roots are not walked at all:
- **Osteopathic medicine** — US osteopathic branch with no Egyptian undergraduate analogue.
- **On-call survival guide** — Practice-orientation material for US residents.
- **Clerkship survival guide** — Practice-orientation material for US clerkships.
- **Transition to residency** — Post-graduate career material.
- **CME-eligible articles** — Continuing-education packaging, not undergraduate subject matter.

## Dispositions

| Disposition | Nodes |
|---|---:|
| already covered under a different Synapse label | 307 |
| secondary placement or cross-reference | 251 |
| metadata/filter, not a node | 64 |
| alias/spelling variant | 9 |
| useful rename or split | 6 |
| merge/de-duplication | 5 |
| outside Years 1–4 scope | 2 |

**No node was left undisposed, and none is proposed as a gap.** Every AMBOSS
branch either maps to an existing Synapse node, is a presentation facet, or is
out of scope. That is the headline finding: the canonical taxonomy already
covers the comparator at undergraduate depth.

## How each was decided

| Rule | Nodes | What it means |
|---|---:|---|
| `rule:token-elsewhere` | 200 | Same subject, covered in another Synapse view |
| `rule:token-in-anchor` | 126 | Same subject under a broader or narrower label, inside the mapped branch |
| `rule:below-floor` | 91 | Inside the right Synapse root, finer than its floor — granularity is an LD-04 call |
| `rule:facet` | 63 | A discipline lens AMBOSS repeats under many systems, not subject matter |
| `hand` | 55 | Decided by hand (every depth-1 branch) |
| `rule:exact-elsewhere` | 49 | Exact title match, but in another Synapse view |
| `rule:exact-in-anchor` | 43 | Exact title match inside the mapped Synapse branch |
| `rule:spelling` | 9 | US spelling or plural of a Synapse node |
| `rule:runtime` | 8 | Already declared in the runtime curriculum tree |

## Confidence

| Confidence | Nodes | Meaning |
|---|---:|---|
| high | 211 | Decided by hand, by exact match, or as a known facet |
| medium | 342 | Matched by label overlap; the root is right, the exact node is worth a check |
| low | 91 | Placed in the right root, but finer than the Synapse floor — the granularity call belongs to LD-04 |

All 91 low-confidence rows are listed in `taxonomy-gap-list.json` for
`TAX-GAP-001`. They are **not** proposed gaps: each already has a Synapse root,
and what remains is a granularity judgement under LD-04 — whether the subject
earns its own article, an overview, or nothing beyond its parent.

The 342 medium-confidence rows are decided, but their exact target node is
worth a check when the owning system reaches its `INVENTORY-001` task.

## The 19-vs-19 finding

AMBOSS's `By system` branch has 19 children and Synapse has 19 system roots, but
they are not the same 19, and aligning the counts would be a mistake:

- AMBOSS keeps **Biostatistics and epidemiology** and **Social sciences** as two
  separate system roots, and repeats the first under Clinical knowledge. Synapse
  merges all three into `SYS-POP`.
- AMBOSS has **no infection root**; it distributes infection across organ systems
  and Microbiology. `SYS-INF` is a deliberate Synapse addition for Egyptian
  tropical-medicine teaching, and it under-weights schistosomiasis, leishmaniasis
  and hydatid disease relative to local curricula. This is the one place where
  following the comparator would actively narrow the product.
- AMBOSS bundles **nutrition** into the GI system and **anatomy, histology and
  embryology** into one discipline. Synapse splits both, matching how Egyptian
  faculties examine them.

## Depth-1 branches, decided by hand

| AMBOSS branch | Synapse | Disposition | Why |
|---|---|---|---|
| Anatomy, histology, and embryology | `DIS-ANA` | useful rename or split | AMBOSS bundles three disciplines. Synapse separates DIS-ANA, DIS-HIS and DIS-EMB, which matches how Egyptian faculties actually examine them. Keep the split. |
| Behavioral sciences | `SYS-PSY` | secondary placement or cross-reference | Behavioural science sits in SYS-PSY in the system route and DIS-PST in the discipline route. Social science sits in SYS-POP. Record the two-way mapping rather than a new discipline root. |
| Biochemistry | `DIS-BIO` | already covered under a different Synapse label | Maps to DIS-BIO Biochemistry & Molecular Medicine. |
| Biostatistics and epidemiology | `SYS-POP` | merge/de-duplication | AMBOSS keeps this as a separate system root, and repeats it under Clinical knowledge. Synapse has one home: SYS-POP-T01 Epidemiology and SYS-POP-T02 Biostatistics. Keep the merge. |
| Chemistry | — | outside Years 1–4 scope | Same as Physics. |
| Genetics | `DIS-GEN` | already covered under a different Synapse label | Direct match. |
| Immunology | `DIS-IMU` | already covered under a different Synapse label | Direct match. The system-route view is SYS-IMM. |
| Microbiology | `DIS-MIC` | already covered under a different Synapse label | Direct match. Synapse additionally separates DIS-PAR Parasitology, which AMBOSS folds in here and under-weights. |
| Pathology | `DIS-PAT` | already covered under a different Synapse label | Direct match. |
| Pharmacology | `DIS-PHA` | already covered under a different Synapse label | Maps to DIS-PHA Pharmacology & Therapeutics, which owns drug classes under the 2026-08-12 de-duplication. |
| Physics | — | outside Years 1–4 scope | Carried by AMBOSS for USMLE Step 1 pre-medical recall. Egyptian curricula teach it in a pre-clinical year outside this library's remit. Reject unless local curriculum evidence surfaces (LD-14). |
| Physiology | `DIS-PHY` | already covered under a different Synapse label | Direct match. |
| Social sciences | `SYS-POP` | merge/de-duplication | A second AMBOSS system root that Synapse folds into SYS-POP, alongside DIS-PEC for professionalism and ethics. Keep the merge. |
| Biostatistics and epidemiology | `SYS-POP` | merge/de-duplication | AMBOSS keeps this as a separate system root, and repeats it under Clinical knowledge. Synapse has one home: SYS-POP-T01 Epidemiology and SYS-POP-T02 Biostatistics. Keep the merge. |
| Blood and lymphoreticular system | `SYS-HEM` | already covered under a different Synapse label | Maps to SYS-HEM Blood & Lymphoreticular System. |
| Cardiovascular system | `SYS-CVS` | already covered under a different Synapse label | Direct match. |
| Endocrine system | `SYS-END` | already covered under a different Synapse label | Maps to SYS-END Endocrine & Metabolic System. |
| Female and transgender reproductive system and breast | `SYS-GYN` | already covered under a different Synapse label | Maps to SYS-GYN. The Synapse label is "Female reproductive system" (DEC-007); the comparator's wording is not adopted. |
| Gastrointestinal system and nutrition | `SYS-GIT` | useful rename or split | AMBOSS bundles nutrition into the GI system. Synapse splits it: nutrition across the life course sits in SYS-DEV-T03 and nutritional disease in SYS-GIT-T04. Keep the Synapse split; record the mapping. |
| General principles of foundational science | `SYS-FND` | already covered under a different Synapse label | Maps to SYS-FND Foundations & General Principles. |
| Human development | `SYS-DEV` | already covered under a different Synapse label | Maps to SYS-DEV Human Development & Life Stages. |
| Immune system | `SYS-IMM` | already covered under a different Synapse label | Direct match. |
| Male and transgender reproductive system | `SYS-AND` | already covered under a different Synapse label | Maps to SYS-AND. Same naming decision as SYS-GYN (DEC-007). |
| Multisystem processes and disorders | `SYS-MUL` | useful rename or split | Synapse extends this to Multisystem Processes, Emergencies & Critical Care, adding perioperative, critical and palliative care — justified against the GMC MLA content map in the taxonomy review. Keep the extension. |
| Musculoskeletal system | `SYS-MSK` | already covered under a different Synapse label | Direct match. |
| Nervous system and special senses | `SYS-NEU` | already covered under a different Synapse label | Direct match, including the special-senses bundling. |
| Pregnancy, childbirth, and the puerperium | `SYS-OBS` | already covered under a different Synapse label | Direct match. |
| Psychiatry and behavorial sciences | `SYS-PSY` | already covered under a different Synapse label | Maps to SYS-PSY Behavioral Health. The comparator misspells "behavioral"; that is not a label to copy. |
| Renal and urinary system | `SYS-REN` | already covered under a different Synapse label | Direct match. |
| Respiratory system | `SYS-RES` | already covered under a different Synapse label | Direct match. |
| Skin and subcutaneous tissue | `SYS-DER` | already covered under a different Synapse label | Direct match. |
| Social sciences | `SYS-POP` | merge/de-duplication | A second AMBOSS system root that Synapse folds into SYS-POP, alongside DIS-PEC for professionalism and ethics. Keep the merge. |
| Anesthesiology | `DIS-ANE` | already covered under a different Synapse label | Maps to DIS-ANE Anaesthesiology & Perioperative Medicine, an explicit taxonomy-review addition. The system route is SYS-MUL-T06. |
| Dermatology | `DIS-DRM` | already covered under a different Synapse label | Discipline route DIS-DRM; system route SYS-DER. |
| Ear, nose, and throat | `DIS-ENT` | already covered under a different Synapse label | Discipline route DIS-ENT; system route SYS-NEU-T08. |
| Emergency medicine | `DIS-EMC` | already covered under a different Synapse label | Maps to DIS-EMC Emergency Medicine & Critical Care; the system route is SYS-MUL and the task route is KNW-EMG. |
| Epidemiology and biostatistics | `SYS-POP` | merge/de-duplication | AMBOSS's second location for the same material. Synapse has one home. |
| Family medicine | `DIS-FCM` | already covered under a different Synapse label | Maps to DIS-FCM Family & Community Medicine. |
| Genetics | `DIS-GEN` | already covered under a different Synapse label | Direct match. |
| Internal medicine | `DIS-MED` | already covered under a different Synapse label | Direct match. Synapse adds Oncology, Medicine of the older adult, and Rehabilitation under it. |
| Legal medicine and professionalism | `DIS-FOR` | useful rename or split | Synapse separates DIS-FOR Forensic Medicine & Toxicology from DIS-PEC Professionalism, Ethics & Communication, and places the population view in SYS-POP-T06. Egyptian medical law is jurisdiction-specific and cannot be inherited from a US comparator. |
| Neurology | `DIS-MED` | secondary placement or cross-reference | Synapse has no separate neurology discipline root: the system route is SYS-NEU and the discipline route is DIS-MED. Adding one would duplicate SYS-NEU. |
| Obstetrics/gynecology | `DIS-OBG` | already covered under a different Synapse label | DIS-OBG is the discipline route over both SYS-OBS and SYS-GYN. |
| Ophthalmology | `DIS-OPH` | already covered under a different Synapse label | Discipline route DIS-OPH; system route SYS-NEU-T07. Deliberately not a separate system root. |
| Pediatrics | `DIS-PED` | already covered under a different Synapse label | Direct match as a discipline. Paediatric *disease* is distributed into the organ systems by design; only life-stage material sits in SYS-DEV. Each child node is disposed of individually below. |
| Pharmacology | `DIS-PHA` | already covered under a different Synapse label | Maps to DIS-PHA Pharmacology & Therapeutics, which owns drug classes under the 2026-08-12 de-duplication. |
| Psychiatry | `DIS-PST` | already covered under a different Synapse label | Direct match. The system route is SYS-PSY. |
| Radiology | `DIS-RAD` | already covered under a different Synapse label | Maps to DIS-RAD Radiology & Imaging. |
| Surgery | `DIS-SUR` | already covered under a different Synapse label | Direct match. |
| Urology | `SYS-REN` | useful rename or split | Synapse splits urology deliberately: the urinary tract sits in SYS-REN-T06 and the male reproductive organs in SYS-AND. Neither system claims the whole of urology. Record the split so it is not re-merged. |
| Clinical cases | — | metadata/filter, not a node | A delivery format, not subject matter. Synapse models cases as practical items against existing taxonomy nodes. |
| Differential diagnoses | `KNW-PRS` | already covered under a different Synapse label | The differential view is generated from presentations; it is not a parallel branch. |
| History and physical examination | `SKL-HIS` | useful rename or split | Synapse separates SKL-HIS History taking from SKL-EXM Clinical examination, because they are examined as separate OSCE stations. |
| Procedures | `SKL-PRC` | already covered under a different Synapse label | Maps to SKL-PRC Practical procedures. A same-named CVS subtopic exists but is not the comparable node. |
| Undifferentiated symptoms and clinical problems | `KNW-PRS` | already covered under a different Synapse label | Maps to KNW-PRS Presentations & differential diagnosis. |

