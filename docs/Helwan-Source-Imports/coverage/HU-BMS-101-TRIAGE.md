# HU-BMS-101 S1 triage — evidence checkpoint

Status: `S1 TRIAGE — NOT APPROVED`. This file records assessment evidence only. It creates
no content records, IDs, or student-facing material.

## Sources read and duplicate treatment

| Source ID | File / manifest pages | Extraction result | Treatment |
|---|---|---|---|
| `src_03cc8b051c09473d48be` | `EOM - 101 final 2025 modified.pdf`, 50 pp | Native text; 130 printed questions/prompts recovered | Exact text twin of `src_aa8…`; retained as provenance only |
| `src_aa8bb730fbccdbf7d6e0` | `EOM - 101 final 2025.pdf`, 50 pp | Native text; 115 MCQs and 15 written prompts; printed key at pp. 45–50 | Canonical 2025 question source |
| `src_b7c0eb8f1cafb9f6c9d7` | `EOM - Batch 10 BMS1 FINAL EXAM.pdf`, 30 pp | Native text; 103 MCQs and 12 written prompts | Canonical Batch-10 question source |
| `src_f5f3ba808a5eb4afa3a0` | `…FINAL EXAM answer.pdf`, 32 pp | Native text plus visually highlighted option keys; written answers printed | Key overlay for `src_b7c…`, not a second paper |
| `src_86786ce382d463dc3036` | `Answers of formative assessment-main stream-26.pdf`, 38 pp | Native text; 16 physiology MCQs with printed answers/explanations | Stand-alone formative-answer source |

Extraction was run with `pdftotext -layout` against the five manifest paths. The two
2025 text layers compare byte-for-byte. For Batch-10 the solved PDF was rendered and checked
against its highlighted choices; the page-level printed-option evidence below is therefore
not inferred from medical knowledge.

## Complete printed-question inventory and department hand-off split

Question references are `source-short: department / printed number (source PDF page range)`.
`W` denotes a printed written prompt. Every number in a printed sequence is included; the
paired/twin sources above do not duplicate a question entry.

| Department for later authoring | 2025 official EOM inventory | Batch-10 official EOM inventory | Formative inventory | Raw printed prompts | Exact repeat removed | Retained question records |
|---|---|---|---|---:|---:|---:|
| Anatomy and embryology | `03cc/aa8: A MCQ 1–16 (pp. 3–8); A-W 1–4 (pp. 9–10)` | `b7c/f5: A MCQ 1–26 (pp. 2–7); A-W 1–2 (pp. 27–28)` | — | 48 | 0 | 48 |
| Biochemistry and molecular biology | `03cc/aa8: B MCQ 1–51 (pp. 11–25); B-W 1–5 (pp. 26–27)` | `b7c/f5: B MCQ 27–52 (pp. 7–13); B-W 1–3 (pp. 26–27)` | — | 85 | 0 | 85 |
| Histology and cell biology | `03cc/aa8: H MCQ 1–22 (pp. 28–34); H-W 1–4 (pp. 34–35)` | `b7c/f5: H MCQ 53–77 (pp. 13–18); H-W 1–6 (pp. 28–30)` | — | 57 | 0 | 57 |
| Physiology | `03cc/aa8: P MCQ 1–26 (pp. 36–44); P-W 1–2 (p. 45)` | `b7c/f5: P MCQ 78–103 (pp. 19–25); P-W 1 (p. 26)` | `867: P MCQ 1–16 (pp. 2–33)` | 71 | `b7c P103` repeats `b7c P86` exactly | 70 |
| **Total** | **130** | **115** | **16** | **261** | **1** | **260** |

The Batch-10 source has a second, exact printing of “Speed of conduction increase in which
type of nerve fibres?” as P103 after P86. It is one retained question with two evidence
locations (`b7c/f5 pp. 20 and 25`). Near-duplicate questions across different papers are
retained as separate question records but mapped to one tested concept during authoring.

## Tested-concept assignment register

The labels below are triage handles, not proposed IDs or final labels. A semicolon means
separate printed questions in that source sequence, in order; a slash denotes one question
whose prompt explicitly combines the two named elements.

### Anatomy and embryology

| Evidence references | Tested concept(s), in printed order |
|---|---|
| `aa8 A1–4, pp. 3–4` | morula timing; brachioradialis insertion; allantois origin; subscapularis attachment |
| `aa8 A5–8, pp. 4–5` | ulnar nerve at medial epicondyle; polyhydramnios threshold; cleavage timing; thenar innervation |
| `aa8 A9–12, pp. 5–6` | coracobrachialis innervation; flexor carpi radialis innervation; anatomical snuffbox border; ulnar artery course |
| `aa8 A13–16, pp. 6–8` | gastrulation/germ-layer formation; fourth-month placental barrier; fetal placenta; hypothenar innervation |
| `aa8 A-W1–4, pp. 9–10` | axillary-artery branches; paraxial-mesoderm derivatives; radial-artery branches; lateral-plate-mesoderm derivatives |
| `b7c A1–4, p. 2` | epiblast germ-layer source; syncytiotrophoblast features; implantation timing; fertilisation phase-2 events |
| `b7c A5–9, pp. 3–4` | uteroplacental circulation onset; posterior-cord branches; anterior axillary wall; shoulder-joint class; somite formation rate |
| `b7c A10–14, pp. 4–5` | fourth-month placental barrier; musculocutaneous course; triceps action; lumbrical MCP action; abductor-pollicis-longus insertion |
| `b7c A15–19, pp. 5–6` | carpal-tunnel median nerve; brachial-artery termination; ulnar collateral-ligament attachment; blind-ended lymphatic capillaries; cloacal membrane |
| `b7c A20–26, pp. 6–7` | neurenteric canal; cubital-fossa artery/roof; embryonic folding; maternal placenta; amniotic-fluid definitions; somite derivatives |
| `b7c A-W1–2, pp. 27–28` | ectoderm derivatives; pronator-teres OINA |

### Biochemistry and molecular biology

| Evidence references | Tested concept family and printed coverage |
|---|---|
| `aa8 B1–13, pp. 11–14` | ubiquitin-mediated protein degradation; elastin/collagen; sickle-cell mutation; translation initiation; haemoglobinopathy; quinolones/topoisomerase; osteogenesis imperfecta; prokaryotic transcription; biotin carboxylation; ferroportin; topoisomerase-II inhibition; histone modification; prokaryotic DNA termination |
| `aa8 B14–26, pp. 14–18` | oxygen-dissociation shifts; linker histone; GC base pairing; CYP polymorphism; urease class; mismatch repair/HNPCC; tRNA; competitive inhibition; tissue hypoxia; vitamin-A visual cycle; allosteric kinetics; CK isoenzymes; promoter mutation |
| `aa8 B27–39, pp. 18–21` | niacin deficiency; chromatin transcription regulation; vitamin-C collagen hydroxylation; vitamin-D/rickets; aminoacyl-tRNA synthetase; prokaryotic/eukaryotic translation; primase; 2,3-BPG; rho termination; competitive-inhibitor reversal; collagen/vitamin C; aminoacyl tRNA; copper enzyme |
| `aa8 B40–51, pp. 21–25` | pharmacogenetic polymorphism; niacin; LDH isoenzymes; lyase; Z-DNA; nucleosome function; chromatin activation; DNA-pol-III proofreading; etoposide; sigma factor; non-homologous end joining; glycolytic 2,3-BPG |
| `aa8 B-W1–5, pp. 26–27` | complex-IV inhibitors; ETC complexes; enzyme regulation; ETC uncouplers; folate-deficiency consequences |
| `b7c B27–39, pp. 7–10` | RNA-polymerase-III product; AUG; codon degeneracy; lipid class; collagen disorder; diphtheria-toxin EF-2; rotenone/complex I; DNA methylation; collagen amino acids; DNA-repair recognition; competitive-inhibition Vmax; HNPCC repair; xeroderma-pigmentosum repair |
| `b7c B40–52, pp. 10–13` | alternative splicing; urease class; ETC uncoupling; mitochondrial DNA polymerase; thymine dimer; 5S RNA polymerase; aminoacyl-tRNA site; stress/starvation regulation; deoxy sugars; nitrogenous-base image; cytokinesis; cell-division tetrads |
| `b7c B-W1–3, pp. 26–27` | complex-IV composition/protons/acceptor; Michaelis constant; topoisomerase I versus II |

### Histology and cell biology

| Evidence references | Tested concept family and printed coverage |
|---|---|
| `aa8 H1–11, pp. 28–31` | connective-tissue sensory ending; traumatic-brain oedema; vinca alkaloids; crossing-over; vascular tissue; basic histology; elastic laminae; nucleolar disappearance; Down syndrome; Turner syndrome; dorsal-root ganglion |
| `aa8 H12–22, pp. 31–34` | avascular tissue; muscle intermediate filament; mast-cell histamine; blind-ended lymphatic capillaries; coronary arteries; keratin; pancreatic/salivary ducts; Purkinje fibres; haemosiderin; chromosome morphology; lipofuscin macrophages |
| `aa8 H-W1–4, pp. 34–35` | epidermal layers; capillary types/sites; medium-artery/vein comparison; euchromatin/heterochromatin |
| `b7c H53–64, pp. 13–15` | neuron/glial morphology; collagen fibres; Purkinje fibres; proteasomes; skin ageing; Marfan/fibrillin; sex-chromosome karyotype; venous smooth muscle; spinal ganglion; brown adipose tissue; macrophage inclusion; muscle intermediate filament |
| `b7c H65–77, pp. 16–18` | cell-cycle competence; epicardium; trigeminal nucleus; coronary circulation; elastic fibres; umbilical-cord connective tissue; marrow capillaries; hair-follicle receptor; vincristine; lymphatic capillaries; thermoregulation/AV shunts; adherens junction |
| `b7c H-W1–6, pp. 28–30` | ureter/bladder/oral epithelium; internal/external elastic laminae; vasa vasorum; connective-tissue receptors; fenestrated-capillary sites; euchromatin/heterochromatin |

### Physiology

| Evidence references | Tested concept family and printed coverage |
|---|---|
| `aa8 P1–13, pp. 36–39` | barbiturate neurotransmission; synaptic fatigue; skin ageing; thermoregulation; temporal summation; hypokalaemia; hyperkalaemia; myelinated conduction; resting membrane potential; potassium permeability; calcium-dependent transmitter release; ECF/ICF osmolarity; heat loss |
| `aa8 P14–26, pp. 39–44` | chemical-synapse sequence; ICF potassium; IPSP; incision/cleavage lines; diarrhoeal fluid balance; calcium homeostasis; diffusion; convergence; energy-independent transport; dehydration; vomiting/hypokalaemia; steady-state osmolarity; diarrhoeal muscle weakness |
| `aa8 P-W1–2, p. 45` | neural pathway types; long-term synaptic effects |
| `b7c P78–89, pp. 19–21` | inhibitory neurotransmitter; membrane permeability; ICF potassium; heat loss; epinephrine actions; simple/facilitated diffusion; ICF/ECF osmolarity; passive transport; myelinated conduction; temporal summation; heat loss; incision/cleavage lines |
| `b7c P90–103, pp. 21–25` | osmosis; carrier stereospecificity; carrier saturation; fluid shifts after solute load; resting membrane potential; convergence; skin ageing; IPSP; calcium-channel blockade; hypokalaemia/RMP; potassium-determined RMP; saltatory conduction; melanocyte photoprotection; myelinated conduction (repeat of P86) |
| `b7c P-W1, p. 26` | chemical-synapse characteristics and sequence |
| `867 P1–6, pp. 2–13` | AP upstroke; potassium equilibrium on AP diagram; sodium influx/upstroke; potassium efflux/repolarisation; myelination/conduction; sodium-channel block |
| `867 P7–16, pp. 14–33` | SIADH compartments; hypertonic saline compartments; hypotonic saline compartments; ICF-volume calculation; plasma volume; interstitial-fluid volume; sodium Nernst potential; Na/K-ATPase inhibition; hyperkalaemic weakness; potassium-current driving force |

## Printed-key recovery

| Question set | Key evidence | Recovery result |
|---|---|---|
| 2025 EOM MCQs and written prompts | `aa8` printed “Key Answers”, pp. 45–50 | All 130 retained prompts have a printed answer/model answer. |
| Batch-10 MCQs | `f5` same printed question pages with highlighted option backgrounds, pp. 2–25 | All 103 printed MCQ keys are visibly marked; P103 is the duplicate noted above. |
| Batch-10 written prompts | `f5`, pp. 26–30 | All 12 written prompts have printed model-answer material. |
| Formative physiology MCQs | `867`, answer immediately follows each prompt, pp. 3–33 | All 16 keys are printed. |

Two MCQs depend on a printed diagram/image rather than prose alone: `867 P2–4` (action-
potential diagram) and `b7c B49` (nitrogenous-base image). Their printed option keys were
recovered, but the diagram/image must remain an evidence/media dependency; it was not
converted into an inferred prose item.

## Search-before-mint evidence and dispositions

The live snapshot was present at `server/data/medical-library-v1.json`. The manual command
searches live state plus `docs/import-ready`, `docs/questions-import-ready`, and each
`docs/*-Source-Imports` root, including pending `canonical_key`s. The following completed
four-query passes establish the non-new classifications below (queries are shortest
distinctive term, alias, synonym, and mechanism/structure respectively):

| Tested concept / evidence | Queries run | Result | Disposition |
|---|---|---|---|
| morula timing — `aa8 A1` | `morula`; `cleavage`; `zygote`; `fertilization` | Pending Kasr 101 concept/article/question hits, including canonical key `cleavage-morula-and-migration-to-the-uterine-cavity`; no live hit | pending |
| ubiquitin protein marking — `aa8 B1` | `ubiquitin`; `proteasome`; `protein degradation`; `ubiquitination` | Pending Kasr 101 concept hit | pending |
| myelinated conduction — `aa8 P8; b7c P86/P103; 867 P5` | `myelination`; `myelinated`; `nerve fibres`; `saltatory` | Pending Kasr 103 and Alexandria 105 content hits | pending |
| blind-ended lymphatic capillaries — `aa8 H15; b7c A18/H74` | `lymphatic`; `blind-ended`; `lymph capillaries`; `lymphatic capillaries` | Pending Kasr 104 histology concept hit | pending |

No `new` classification is made for the remaining assignments in this checkpoint: their
required four-query passes have not yet been run. Treating a missing transcript as “new”
would violate the S1 search rule. The next triage worker must continue from the register
above, record all four queries per assignment, then count `live` / `pending` / `new` from
the completed search ledger.

## Consolidated S1 checkpoint (completed subset)

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| HU-BMS-101 — source inventory and key recovery | 260 | 260 | Not counted — full dedupe/search register incomplete | 0 confirmed | 4 confirmed | 0 designated | Not applicable until all searches finish |

## Reproducible count command

The source counts are derived from the four department rows in this file, not an estimate:

```bash
node -e "const raw=[48,85,57,71]; console.log(JSON.stringify({raw:raw.reduce((a,b)=>a+b,0),exactRepeats:1,retained:raw.reduce((a,b)=>a+b,0)-1}))"
# {"raw":261,"exactRepeats":1,"retained":260}
```

## Required next action

Continue the multi-query ledger for every remaining tested-concept assignment, consolidate
near-duplicate questions to their authoring concepts, and only then issue a complete
`live` / `pending` / `new` table to `/root`. No S2 activity is authorised pending a fresh
`TRIAGE APPROVED`.

## Continuation checkpoint — 2026-08-29

The tested-concept collapse has now been made explicit as the 180-row deterministic register
in `scripts/helwan/triage-bms101-search.mjs`. It includes the four previously completed
assignments and 176 remaining assignments, each with precisely four manual-required queries:
distinctive term, alias, synonym and mechanism/structure. This is a concept register, not an
ID list; its slugs are triage handles only.

The runner invokes the prescribed `find-existing.mjs` command for each query, whose scope is
live state, `docs/import-ready`, `docs/questions-import-ready` and every
`docs/*-Source-Imports` root. It has no write/import/mint path. A completed execution over
the original 178 new register rows ran 712 queries (four per row); the two already-proven
rows added afterwards are the existing `myelinated-conduction` and
`blind-ended-lymphatic-capillaries` entries above.

Runner output is deliberately neutral: every transcript row is marked
`UNADJUDICATED` and contains only its four queries plus raw matching lines. It emits no
`live`, `pending` or `new` disposition field or count; those labels require the subsequent
same-idea/same-scope review and are not inferred from substring output.

**Do not convert the raw runner's substring matches into dispositions.** The raw output is a
search transcript, not semantic evidence: for example, a query for `radius` returns an airway
resistance concept, and a query for `AUG` returns a pancreatic secretion record. Calling those
`live` would fabricate a merge. The only completed, scope-adjudicated subset remains the four
rows in the evidence table above (`morula-timing`, `ubiquitin-protein-degradation`,
`myelinated-conduction`, `blind-ended-lymphatic-capillaries`): 0 live, 4 pending, 0 new.

### Exact remaining register

There are exactly 176 undisposed handles: every row in the helper's `register` constant except
the four named completed handles immediately above. The continuation worker must read each
row's four-query evidence, retain only same-idea/same-scope live IDs or pending paths, and
record a `new` result only when all four are absent or demonstrated near-misses. This is an
exact remaining register by executable source, not an estimate; it deliberately records no
unproven live/pending ID or path.

Reproduce the query transcript and its structural count with:

```bash
HU_TRIAGE_WORKERS=8 node scripts/helwan/triage-bms101-search.mjs > /private/tmp/hu-bms101-search.json
node -e "const r=require('/private/tmp/hu-bms101-search.json'); console.log(JSON.stringify({concepts:r.concepts.length,queries:r.concepts.reduce((n,x)=>n+x.queryHits.length,0)}))"
```

The last command must report `{"concepts":180,"queries":720}` before semantic
adjudication begins. It does not author or alter source content.
