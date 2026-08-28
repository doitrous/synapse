# MUST FHB 101 — S1 read-only triage checkpoint

## Scope and decision

This is an incomplete S1 checkpoint, not `TRIAGE APPROVED`.  It records only questions read from the completed deduplicated source family and does not mint IDs, author content, or choose module placement.  Every proposed new item has placement **TBD**.

## Evidence / reproducibility

The readiness selection is exactly the 115 inventory rows where `module=FHB 101` and category is `05 MCQs`, `06 EOM Exams`, `07 EOY Exams`, or `08 Midterm Exams`; it is 106 unique SHA-256s (nine duplicate rows).  Department split: Anatomy 27, Histology 57, Physiology 31; category split: MCQs 48, EOM 21, EOY 0, Midterm 46.

Run the following read-only ledger to obtain the exact selected path, SHA-256, size, page count, audit error, and current text-layer result for every one of the 115 rows (and thereby the exact remaining-file list below):

```text
node scripts/must/fhb101-triage.mjs --root='/Users/doitrous/Desktop/MUST' --inventory='/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.codex/library_audit/must/inventory.tsv' --inspected='/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.codex/library_audit/must/inspected-text.json' --text
```

The run returned 70 substantive-text, 6 sparse-text, and 39 empty-text source rows: Anatomy 22/1/4; Histology 28/3/26; Physiology 20/2/9.  `pdftotext` also reported malformed-flate warnings for `Anatomy/05 MCQs/MCQs - VIP Embryo MCQS ️▪️.pdf` and `Histology/05 MCQs/MCQs - Histo FHB101 Exam Night Questions & Notes.pdf`; sparse/empty extraction is not treated as an unread question or a missing key.

## Completed source subset (three inventory paths, one exact document)

| Inventory paths (all `05 MCQs`) | SHA-256 | pages | Printed questions read | Printed/official keys recovered |
|---|---|---:|---:|---:|
| `Year 1/Semester 101/FHB 101/Anatomy/05 MCQs/MCQs - Fhb exam 2026.pdf`; `Year 1/Semester 101/FHB 101/Histology/05 MCQs/MCQs - Fhb exam 2026.pdf`; `Year 1/Semester 101/FHB 101/Physiology/05 MCQs/MCQs - FHB101 Exam 2026.pdf` | `a87b09c5f33157263fb623fcfbc2eeb315f90633fdd1a5a8f9244a67c6313e95` | 14 | 36 | 8 |

The document has 28 MCQs without a printed MCQ key and eight written prompts with printed answers: Anatomy 9/2, Physiology 13/3, Histology 14/3 (questions/keys).  Repeated Anatomy and Physiology pages were collapsed before counting.

## Consolidated S1 table — completed subset only

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 101 (2026 duplicate family only) | 36 | 8 | 36 | 12 | 12 | 12 | TBD |

## Tested-concept search ledger

Each row was searched with the manual tool using both phrases shown (`node "Instruction Manual for Content Creation/tools/find-existing.mjs"`): its normal hit classification is deliberately not a proposed identifier.

| Department | Tested concept (search pair) | Result |
|---|---|---|
| Anatomy | amniotic fluid / amniotic volume | live-hit |
| Anatomy | gametogenesis / gamete chromosomes | pending-hit |
| Anatomy | endoderm / gastrointestinal epithelial lining | live-hit |
| Anatomy | fertilization ampulla / site fertilization | new — TBD |
| Anatomy | ectopic pregnancy / tubal implantation | live-hit |
| Anatomy | decidua basalis / maternal placenta | live-hit |
| Anatomy | primitive streak / gastrulation first sign | live-hit |
| Anatomy | surface ectoderm / ectoderm derivatives | new — TBD |
| Anatomy | sclerotome / vertebrae ribs | pending-hit |
| Physiology | macrocytic anaemia / gastrectomy anaemia | live-hit |
| Physiology | megakaryocyte / platelet formation | live-hit |
| Physiology | extrinsic pathway / factor VII | live-hit |
| Physiology | deep-vein thrombosis / postoperative thrombosis | pending-hit |
| Physiology | overhydration / iatrogenic fluid overload | new — TBD |
| Physiology | purpura / thrombocytopenia bleeding | pending-hit |
| Physiology | vitamin B12 / B12 nuclear division | live-hit |
| Physiology | erythropoiesis hypoxia / hypoxia red cells | new — TBD |
| Physiology | microcytic anaemia / hypochromic anaemia | pending-hit |
| Physiology | erythrocyte biconcavity / red-cell deformability | new — TBD |
| Physiology | fibrinogen factors / fibrinogen group | new — TBD |
| Physiology | polycythaemia / primary secondary polycythaemia | pending-hit |
| Physiology | anaemia classification / RBC-size anaemia | live-hit |
| Histology | FISH / fluorescence in-situ hybridisation | pending-hit |
| Histology | apocrine secretion / lactating mammary gland | live-hit |
| Histology | organ of Corti / sensory neuroepithelium | pending-hit |
| Histology | desmosome / pemphigus antibody | pending-hit |
| Histology | gap junction / smooth-muscle communication | live-hit |
| Histology | Barr body / sex chromatin | pending-hit |
| Histology | formalin fixation / 10% formal saline | new — TBD |
| Histology | bronchus epithelium / ciliated pseudostratified bronchus | new — TBD |
| Histology | vas deferens epithelium / vas deferens stereocilia | new — TBD |
| Histology | basal lamina collagen IV / type-IV collagen | pending-hit |
| Histology | chromosome aberration / structural chromosomal abnormality | new — TBD |
| Histology | mitosis phases / stages of mitosis | new — TBD |
| Histology | lysosome–peroxisome comparison / peroxisome lysosome difference | new — TBD |
| Histology | myoepithelial cell / myoepithelial secretion | pending-hit |

## Department hand-off split

Completed subset only: Anatomy 9 concepts (live 5, pending 2, new 2); Physiology 13 (5, 4, 4); Histology 14 (2, 6, 6).  This is a future authoring split, not permission to author or allocate canonical module IDs.

## Remaining sources / blocker

**Remaining file list:** all selected ledger rows except the three paths in the completed family above — 112 inventory paths / 105 further SHA-256s, including 39 empty-text and six sparse-text rows.  The command in Evidence is the authoritative exact, path-and-hash-bearing list and must be re-run against the root/Desktop evidence before a continuation claims any question count; no count for those unread sources is estimated here.

**BLOCKED — S1 cannot be approved:** the remaining 112 selected source paths have not had every printed question read, their official/printed keys have not been recovered, and their concepts have not been searched.  The durable evidence snapshot and literal `TRIAGE APPROVED` gate remain absent.  Next: render-and-read each remaining source family, beginning with the 70 substantive-text rows, then update this table from observed questions only.
