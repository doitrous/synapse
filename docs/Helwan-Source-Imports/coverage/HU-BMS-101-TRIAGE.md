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
| `aa8 P1–13, pp. 36–39` | barbiturate neurotransmission; synaptic fatigue; age-related sweating/thermoregulation; thermoregulation; temporal summation; hypokalaemia; hyperkalaemia; myelinated conduction; resting membrane potential; potassium permeability; calcium-dependent transmitter release; ECF/ICF osmolarity; heat loss |
| `aa8 P14–26, pp. 39–44` | chemical-synapse sequence; ICF potassium; IPSP; incision/cleavage lines; diarrhoeal hypokalaemic hyperpolarisation; calcium homeostasis; diffusion; convergence; energy-independent transport; uncompensated-water-loss ECF-volume loss; vomiting/hypokalaemic hyperpolarisation; steady-state osmolarity; diarrhoeal muscle weakness |
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

## Consolidated S1 checkpoint (complete module triage)

| Module | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| HU-BMS-101 — all subjects | 260 | 260 | 179 | 10 | 126 | 43 | Per-handle evidence and disposition are recorded below; no record is minted or placed at S1. |

## Reproducible count command

The source counts are derived from the four department rows in this file, not an estimate:

```bash
node -e "const raw=[48,85,57,71]; console.log(JSON.stringify({raw:raw.reduce((a,b)=>a+b,0),exactRepeats:1,retained:raw.reduce((a,b)=>a+b,0)-1}))"
# {"raw":261,"exactRepeats":1,"retained":260}
```

## Required next action

Send this complete module table to `/root` for the consolidated Helwan Year-1 S1 view. No S2
activity is authorised unless `/root` gives a fresh literal `TRIAGE APPROVED` for Helwan Year
1; completion of this module's S1 evidence checkpoint is not that approval.

## Continuation checkpoint — 2026-08-29

The tested-concept collapse is now explicit as the 179-row deterministic register in
`scripts/helwan/triage-bms101-search.mjs`. It includes the four previously completed
assignments and 175 remaining assignments, each with precisely four manual-required queries:
distinctive term, alias, synonym and mechanism/structure. This is a concept register, not an
ID list; its slugs are triage handles only.

The runner invokes the prescribed `find-existing.mjs` command for each query, whose scope is
live state, `docs/import-ready`, `docs/questions-import-ready` and every
`docs/*-Source-Imports` root. It has no write/import/mint path. A completed execution over
the original 178 new register rows ran 712 queries (four per row); the two already-proven
rows added afterwards are the existing `myelinated-conduction` and
`blind-ended-lymphatic-capillaries` entries above. The repaired register restores the
omitted `thin-versus-thick-skin` handle for `b7c H65`. The later source-first collapse of the
duplicate diarrhoeal/vomiting potassium relation reduces the current register to 179 handles.

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

There are exactly 175 undisposed handles: every row in the helper's `register` constant except
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

The last command must report `{"concepts":179,"queries":716}` before semantic
adjudication begins. It does not author or alter source content.

### Semantic adjudication batch 1 — first 20 unadjudicated handles

The deterministic selection excludes the four already-completed handles named above and is
the first 20 remaining rows in `triage-bms101-search.mjs`. The runner transcript was made
with `--limit=23` (the three leading completed rows plus these 20): 92 queries in that
partial transcript, with these rows contributing exactly 80. `pending` below means an
unimported same-idea/same-scope record was read; it is not inferred from an incidental
substring hit. In particular, the live airway-radius hit for `brachioradialis-insertion`
and the live amniotic-fluid-function hits for `polyhydramnios` are near-misses, not merges.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| brachioradialis-insertion — `aa8 A2, p. 3` | `brachioradialis`; `brachioradial`; `elbow flexor`; `radius` | Pending `docs/Kasr-Source-Imports/question/101-ISK-mcq.md` explicitly states that brachioradialis inserts on the lower radius; no live airway-radius merge. | pending |
| allantois-origin — `aa8 A3, p. 3` | `allantois`; `allantoic`; `umbilical`; `yolk sac` | Pending `CON-DEV-1D10DF3B716A70` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` says the allantois extends from the caudal wall of the secondary yolk sac. | pending |
| subscapularis-attachment — `aa8 A4, p. 3` | `subscapularis`; `subscapular`; `lesser tubercle`; `scapula` | Pending `CON-MSK-38A32E79B1412F` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` assigns subscapularis alone to the lesser tuberosity. | pending |
| ulnar-nerve-medial-epicondyle — `aa8 A5, p. 4` | `ulnar nerve`; `ulnar`; `medial epicondyle`; `cubital tunnel` | Pending `CON-MSK-F0F2BDF778A2DD` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` describes its course behind the medial epicondyle. | pending |
| polyhydramnios — `aa8 A6, p. 4` | `polyhydramnios`; `amniotic fluid`; `hydramnios`; `fetal swallowing` | Pending `ART-101-ANA-AMNIOTIC-FLUID` in `docs/Kasr-Source-Imports/article/101-ISK-anatomy.md` gives the >2 L full-term threshold and swallowing-related causes. | pending |
| thenar-innervation — `aa8 A8, p. 5` | `thenar`; `thenar muscles`; `recurrent median`; `median nerve` | Pending `CON-MSK-8FB16415EFF905` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` assigns all three thenar muscles to the recurrent median branch. | pending |
| coracobrachialis-innervation — `aa8 A9, p. 5` | `coracobrachialis`; `coracobrachial`; `musculocutaneous`; `anterior arm` | Pending `CON-MSK-F125616F7ED37A` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` names the musculocutaneous muscular branch to coracobrachialis. | pending |
| flexor-carpi-radialis-innervation — `aa8 A10, p. 5` | `flexor carpi`; `FCR`; `median nerve`; `forearm flexor` | Pending `CON-MSK-46C40109E7D957` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` names FCR among the anterior-compartment muscles supplied by median nerve. | pending |
| anatomical-snuffbox-border — `aa8 A11, p. 6` | `snuffbox`; `anatomical snuffbox`; `radial border`; `extensor pollicis` | Pending `CON-MSK-1424177E093253` in `docs/Kasr-Source-Imports/concept/101-ISK-concepts.md` gives the APL/EPB anterior and EPL posterior boundaries. | pending |
| ulnar-artery-course — `aa8 A12, p. 6` | `ulnar artery`; `ulnar`; `palmar arch`; `forearm artery` | Pending `CON-MSK-25C6698A72A982` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` gives its forearm course, wrist relations and superficial-arch termination. | pending |
| gastrulation-germ-layers — `aa8 A13; b7c A1, pp. 6/2` | `gastrulation`; `germ layer`; `trilaminar`; `epiblast` | Pending `CON-DEV-215BD7E9E58872` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` defines gastrulation and makes all three germ layers epiblast-derived. | pending |
| placental-barrier-fourth-month — `aa8 A14; b7c A10, pp. 6/4` | `placental barrier`; `placenta barrier`; `fourth month`; `trophoblast` | Pending `CON-DEV-2D15CFF44F825F` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` distinguishes the early four-layer from late two-layer barrier. | pending |
| fetal-placenta — `aa8 A15, p. 7` | `fetal placenta`; `chorionic plate`; `fetal surface`; `chorion` | Pending `CON-DEV-D870770450E17D` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` identifies chorionic plate/chorion frondosum as the fetal part and describes its surface. | pending |
| hypothenar-innervation — `aa8 A16, p. 8` | `hypothenar`; `hypothenar muscles`; `deep ulnar`; `ulnar nerve` | Pending `CON-MSK-8FB16415EFF905` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` assigns the three hypothenar muscles to the deep ulnar branch. | pending |
| axillary-artery-branches — `aa8 A-W1, p. 9` | `axillary artery`; `axillary`; `thoracoacromial`; `subscapular artery` | Pending `CON-MSK-C608D59631E713` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` enumerates branches by all three artery parts. | pending |
| paraxial-mesoderm-derivatives — `aa8 A-W2, p. 9` | `paraxial`; `somite`; `sclerotome`; `dermomyotome` | Pending `CON-DEV-5E63C211DEEE00` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` maps somite divisions to vertebrae/discs, dermis and skeletal muscle. | pending |
| radial-artery-branches — `aa8 A-W3, p. 10` | `radial artery`; `radial`; `deep palmar`; `dorsal carpal` | Pending `CON-MSK-58D5F74E9595C3` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` gives superficial palmar, first dorsal metacarpal, princeps pollicis and radialis indicis branches. | pending |
| lateral-plate-mesoderm-derivatives — `aa8 A-W4, p. 10` | `lateral plate`; `splanchnic mesoderm`; `somatic mesoderm`; `intraembryonic coelom` | Pending `CON-DEV-2E3E3098D90C0C` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` gives somatopleuric and splanchnopleuric derivatives. | pending |
| syncytiotrophoblast-features — `b7c A2, p. 2` | `syncytiotrophoblast`; `syncytio`; `trophoblast`; `hCG` | Live `CON-OBS-D7FC4AD8756594`, “Syncytiotrophoblast is persistent multinucleated dark layer with microvilli and age-increasing syncytial knots”, has the same feature scope; pending implantation records are not needed for this merge. | live |
| implantation-timing — `b7c A3, p. 2` | `implantation`; `implant`; `blastocyst`; `endometrium` | Pending `CON-DEV-E08715FEB6438D` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` gives day-7 onset, day-9 embedding and day-11 completion. | pending |

Batch delta: `live +1`, `pending +19`, `new +0`; no concept ID is minted by this ledger.

### Semantic adjudication batch 2 — next 20 unadjudicated handles

The deterministic selection continues after batch 1: rows 24–43 of the runner register,
after the three leading completed rows. The partial runner transcript uses `--limit=43`:
172 total queries, of which the 20 rows below contribute exactly 80. Every disposition
below was made from the named record's text, rather than from a substring hit. In
particular, the live shoulder-joint article does not state its ball-and-socket class, and
the live folding article does not supply the complete scope of the folding item; both have
therefore remained pending where the precise pending record does.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| fertilisation-second-week-events — `b7c A4, p. 2` | `fertilisation`; `fertilization`; `acrosome`; `zona pellucida` | Live `CON-DEV-ACAE4CE4C3EA57`, “Function of acrosomal enzymes”, explicitly states that acrosomal-cap enzymes facilitate penetration of the ovum coverings during fertilization: the asked phase-II zona-pellucida event. | live |
| uteroplacental-circulation-onset — `b7c A5, p. 3` | `uteroplacental`; `placental circulation`; `intervillous`; `spiral artery` | Pending `CON-DEV-22C6EB6EB88448` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` states that on days 11–12 lacunae fill with maternal blood as uteroplacental circulation is established. | pending |
| posterior-cord-branches — `b7c A6, p. 3` | `posterior cord`; `posterior cord branches`; `thoracodorsal`; `subscapular nerve` | Pending `CON-MSK-CF723B5FB24D70` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` enumerates radial, axillary, upper/lower subscapular and thoracodorsal branches of the posterior cord. | pending |
| anterior-axillary-wall — `b7c A7, p. 3` | `anterior axillary`; `axillary wall`; `pectoralis minor`; `clavipectoral` | Pending `CON-MSK-F602D13792F66F` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` gives the anterior wall as pectoralis major with deep subclavius, clavipectoral fascia and pectoralis minor. | pending |
| shoulder-joint-class — `b7c A8, p. 3` | `shoulder joint`; `glenohumeral`; `ball and socket`; `synovial joint` | Pending `CON-MSK-EA4C451C8749B9` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` explicitly classifies the shoulder as a synovial polyaxial ball-and-socket joint. | pending |
| somite-formation-rate — `b7c A9, p. 3` | `somite`; `somitogenesis`; `paraxial`; `segmentation` | Pending `CON-DEV-3AB7E19B99F387` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` states that three somite pairs are added each day during the regular somite period. | pending |
| musculocutaneous-nerve-course — `b7c A11, p. 4` | `musculocutaneous`; `musculocutaneous nerve`; `coracobrachialis`; `lateral cutaneous forearm` | Live `CON-DER-8387EA6B89BC45`, “Musculocutaneous nerve through coracobrachialis”, explicitly states that the nerve pierces coracobrachialis — the full scope of the asked relation. | live |
| triceps-action — `b7c A12, p. 4` | `triceps`; `triceps brachii`; `elbow extension`; `radial nerve` | Pending `CON-MSK-34E34E10280236` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` explicitly identifies triceps as the extensor of the elbow. | pending |
| lumbrical-mcp-action — `b7c A13, p. 4` | `lumbrical`; `lumbricals`; `MCP flexion`; `interphalangeal extension` | Pending `CON-MSK-24A0858459A59D` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` explicitly states that lumbricals flex the metacarpophalangeal joints and extend the interphalangeal joints. | pending |
| abductor-pollicis-longus-insertion — `b7c A14, p. 4` | `abductor pollicis`; `APL`; `first metacarpal`; `thumb abductor` | Pending `docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md` states that abductor pollicis longus runs to the lateral side of the base of the first metacarpal. | pending |
| median-nerve-carpal-tunnel — `b7c A15, p. 5` | `carpal tunnel`; `median nerve`; `flexor retinaculum`; `thenar` | Pending `CON-MSK-9B52018C4649BD` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` defines carpal-tunnel syndrome as median-nerve compression beneath the flexor retinaculum. | pending |
| brachial-artery-termination — `b7c A16, p. 5` | `brachial artery`; `brachial`; `radial artery`; `ulnar artery` | Pending `CON-MSK-798DE81B6EE665` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` places terminal division into radial and ulnar arteries at the neck of the radius. | pending |
| ulnar-collateral-ligament-attachment — `b7c A17, p. 5` | `ulnar collateral ligament`; `UCL`; `medial epicondyle`; `coronoid process` | Pending `CON-MSK-782A87EC05EF74` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` gives the ulnar collateral ligament from the medial epicondyle to the coronoid process and olecranon. | pending |
| cloacal-membrane — `b7c A19, p. 6` | `cloacal membrane`; `cloaca`; `urorectal`; `endoderm` | No same-scope record exists. Pending `CON-DEV-44A219B862FFD5` only gives the membrane's post-folding position, and pending `CON-DEV-C84AD85AB265CC` gives generic endoderm derivatives; neither establishes what the cloacal membrane forms. | new |
| neurenteric-canal — `b7c A20, p. 6` | `neurenteric`; `neurenteric canal`; `primitive node`; `notochord` | Pending `CON-DEV-1BCF37C48AF307` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` states that degeneration of the notochordal-canal floor opens the neurenteric canal. | pending |
| cubital-fossa-contents-and-roof — `b7c A22, p. 6` | `cubital fossa`; `cubital`; `bicipital aponeurosis`; `brachial artery` | Pending `CON-MSK-74BFAB9385B955` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` puts the cephalic vein in the cubital-fossa roof and distinguishes the floor and contents. | pending |
| embryonic-folding — `b7c A23, p. 6` | `embryonic folding`; `folding`; `lateral fold`; `cephalocaudal` | Pending `CON-DEV-44A219B862FFD5` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` covers folding's causes and results, including the closed ventral body wall and changed allantois position. | pending |
| maternal-placenta — `b7c A24, p. 6` | `maternal placenta`; `decidua basalis`; `maternal surface`; `placental cotyledon` | Live `CON-OBS-7AB2BBC84F3D9B`, “Decidua basalis between embryo and myometrium forms maternal placenta”, has the exact queried scope. | live |
| amniotic-fluid-definitions — `b7c A25, p. 7` | `amniotic fluid`; `amniotic`; `liquor`; `amniotic cavity` | Pending `CON-DEV-3D26C14BF0AA28` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md` defines oligohydramnios as amniotic fluid under 400 mL at term, the exact threshold tested. | pending |
| somite-derivatives — `b7c A26, p. 7` | `somite derivatives`; `sclerotome`; `myotome`; `dermatome` | Pending `CON-DEV-5E63C211DEEE00` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` states that the myotome forms the skeletal muscles of the body, including body wall and limbs. | pending |

Batch delta: `live +3`, `pending +16`, `new +1`; no concept ID is minted by this ledger.

### Semantic adjudication batch 3 — next 20 unadjudicated handles

The deterministic selection continues after batch 2, excluding the earlier-adjudicated
`ubiquitin-protein-degradation` row: register rows 44–64 therefore yield the 20 handles
below. The reproduced `--limit=64` transcript establishes the 64-concept/256-query
structural slice; the source correction for `aa8 B13` replaces its erroneous rho queries
with the four Tus/replication-termination queries recorded below, preserving this batch's
80-query total. Every pending disposition names a record read for the same idea and scope.
Generic or partial matches remain new: the pronator-teres record
does not cover insertion/action, generic topoisomerase content does not establish
etoposide/topoisomerase-II inhibition, and generic mismatch repair does not establish its
HNPCC association.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| ectoderm-derivatives — `b7c A-W1, p. 27` | `ectoderm`; `ectoderm derivatives`; `neural crest`; `epidermis` | Pending `CON-DEV-C84AD85AB265CC` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` explicitly lists ectodermal nervous-system, neural-crest and epidermal derivatives. | pending |
| pronator-teres-OINA — `b7c A-W2, p. 28` | `pronator teres`; `pronator`; `median nerve`; `coronoid process` | The pending AU-MED-105 pronator-teres article/concept gives its two origins and median-nerve relation, but not its insertion and action; it is a partial near-match, not the OINA scope. | new |
| elastin-collagen-comparison — `aa8 B2, p. 11` | `elastin`; `elastic fibre`; `collagen`; `connective tissue` | Pending `CON-FND-31F96EC2F609C9` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` contrasts the shared hydroxyproline, chain number, glycoprotein status and cross-links. | pending |
| sickle-cell-mutation — `aa8 B3, p. 11` | `sickle`; `sickle cell`; `beta globin`; `glutamate valine` | Pending `CON-HEM-BEF9577989EAF4` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` states the beta-globin Glu6Val point mutation. | pending |
| translation-initiation — `aa8 B4, p. 11` | `translation initiation`; `initiation`; `AUG`; `ribosome` | Pending `CON-FND-09FACBDCBBF8FD` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md` states that AUG starts translation with methionyl-tRNA. | pending |
| haemoglobinopathy — `aa8 B5, p. 12` | `haemoglobinopathy`; `hemoglobinopathy`; `globin`; `haemoglobin` | Pending `CON-HEM-3B1C5DBC2DB666` in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` distinguishes abnormal globin structure (HbS) from reduced globin-chain production (thalassaemia). | pending |
| quinolone-topoisomerase — `aa8 B6, p. 12` | `quinolone`; `fluoroquinolone`; `topoisomerase`; `DNA gyrase` | Pending `CON-FND-014D200ED96498` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md` identifies ciprofloxacin as a fluoroquinolone that inhibits bacterial DNA gyrase. | pending |
| osteogenesis-imperfecta — `aa8 B7, p. 12` | `osteogenesis`; `osteogenesis imperfecta`; `type I collagen`; `brittle bone` | The four queries return only generic type-I-collagen records and an unrelated question option; no record ties osteogenesis imperfecta to its type-I-collagen brittle-bone scope. | new |
| prokaryotic-transcription — `aa8 B8, p. 12` | `prokaryotic transcription`; `prokaryotic`; `RNA polymerase`; `sigma factor` | No query returns a same-scope bacterial transcription/sigma-factor record; eukaryotic and viral RNA-polymerase hits are near-misses. | new |
| biotin-carboxylation — `aa8 B9, p. 13` | `biotin`; `carboxylation`; `carboxylase`; `CO2` | Pending `docs/Kasr-Source-Imports/question/103-BMS-MCQ-vitamins.md` explicitly gives biotin as the coenzyme for carboxylation/CO2-fixation reactions and names the three carboxylases. | pending |
| ferroportin — `aa8 B10, p. 13` | `ferroportin`; `iron export`; `hepcidin`; `enterocyte` | Pending `CON-HEM-A6420C4B3B3D9A` in `docs/Kasr-Source-Imports/concept/102-INT-physiology-concepts.md` gives enterocyte iron export through ferroportin and hepcidin's degradation of it. | pending |
| topoisomerase-ii-inhibition — `aa8 B11, p. 13` | `topoisomerase II`; `etoposide`; `topoisomerase`; `DNA strand` | The pending topoisomerase record only treats replication supercoil relief, and its ciprofloxacin record treats bacterial DNA gyrase; neither names etoposide or type-II inhibition. | new |
| histone-chromatin-regulation — `aa8 B12, p. 14` | `histone`; `chromatin`; `histone modification`; `acetylation` | Pending `CON-FND-4C59A8FA82E031` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` explains histone acetylation/deacetylation as chromatin and transcription regulation. | pending |
| tus-replication-termination — `aa8 B13, p. 14` | `Tus`; `replication termination`; `Ter site`; `prokaryotic DNA replication` | The printed question asks which protein terminates prokaryotic DNA replication: Tus. `Tus` returns only incidental substrings; the other three queries have no same-scope record, including no Ter-site or prokaryotic-replication result. | new |
| oxygen-dissociation-curve — `aa8 B14, p. 14` | `oxygen dissociation`; `oxyhaemoglobin`; `2,3-BPG`; `haemoglobin affinity` | Pending `ART-104-PHY-OXYGEN-DISSOCIATION-CURVE` in `docs/Kasr-Source-Imports/article/104-CPS-articles.md` covers haemoglobin-oxygen curve shifts and affinity. | pending |
| linker-histone — `aa8 B15, p. 15` | `linker histone`; `histone H1`; `nucleosome`; `chromatin` | Pending `CON-FND-3660CDEFA054C3` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` specifies H1 on linker DNA between nucleosomes. | pending |
| gc-base-pairing — `aa8 B16, p. 15` | `guanine cytosine`; `GC`; `base pairing`; `hydrogen bonds` | Pending `CON-FND-5BAF472E54A764` in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` states three G-C versus two A-T hydrogen bonds. | pending |
| cyp-polymorphism — `aa8 B17, p. 15` | `CYP`; `cytochrome P450`; `polymorphism`; `pharmacogenetics` | CYP hits concern fungal-azole targets and a glossary term; the polymorphism/pharmacogenetics queries return no same-scope record. | new |
| urease-enzyme-class — `aa8 B18; b7c B40, pp. 16/10` | `urease`; `urea`; `hydrolase`; `enzyme class` | The pending Proteus record states urease hydrolysis and the pending IUBMB record lists hydrolases, but neither assigns urease to the hydrolase class; no single same-scope record exists. | new |
| mismatch-repair-hnpcc — `aa8 B19; b7c B38, pp. 16/10` | `mismatch repair`; `HNPCC`; `Lynch`; `DNA repair` | Pending repair records define mismatch repair after proofreading failure, but neither HNPCC nor Lynch yields a hit; the disease-association scope is absent. | new |

Batch delta: `live +0`, `pending +12`, `new +8`; no concept ID is minted by this ledger.

### Semantic adjudication batch 4 — next 20 unadjudicated handles

The deterministic selection continues after batch 3: the next twenty undisposed rows of
`triage-bms101-search.mjs` are rows 65–84 of its then-180-row register. They contribute exactly
80 searches, four per handle. Every disposition below follows the named record's text and
scope, rather than a substring hit: a generic visual/retinal fact does not cover the visual
cycle, generic allosteric regulation does not establish sigmoidality/cooperativity, and
generic proofreading does not establish bacterial DNA-polymerase-III proofreading.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| trna-and-aminoacylation — `aa8 B20, p. 16` | `tRNA`; `aminoacyl`; `aminoacyl tRNA synthetase`; `anticodon` | Pending `CON-FND-89278C7DEE1C9C` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` states that aminoacyl-tRNA synthetases activate amino acids and load each onto its matching tRNA in the ATP-consuming two-step reaction. | pending |
| competitive-inhibition — `aa8 B21, p. 16` | `competitive inhibition`; `competitive inhibitor`; `Vmax`; `Michaelis` | Pending `CON-FND-CB8584ED2F3C49` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` gives active-site competition, increased apparent Km with unchanged Vmax, and reversal by excess substrate. | pending |
| tissue-hypoxia — `aa8 B22, p. 17` | `tissue hypoxia`; `hypoxia`; `oxygen delivery`; `cyanide` | Pending `CON-FND-CFB54F33867C57` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-metabolism-concepts.md` explains cyanide's Complex-IV block and failed oxidative phosphorylation despite normal oxygen delivery: the histotoxic-tissue-hypoxia mechanism tested. | pending |
| vitamin-a-visual-cycle — `aa8 B23, p. 17` | `vitamin A`; `retinal`; `visual cycle`; `rhodopsin` | Live `CON-NEU-C5F79F69D989D4` only states 11-cis retinol-to-retinal conversion; the pending vitamin-A and rhodopsin records are respectively broad vision facts and a glossary label. None gives the vitamin-A visual-cycle/rhodopsin scope. | new |
| allosteric-kinetics — `aa8 B24, p. 17` | `allosteric`; `allosteric enzyme`; `sigmoidal`; `cooperativity` | Pending `CON-FND-6BBAC69900B22F` gives distinct-site conformational regulation, but the `sigmoidal` and `cooperativity` queries return no record; it is not the kinetic-curve scope. | new |
| creatine-kinase-isoenzymes — `aa8 B25, p. 17` | `creatine kinase`; `CK`; `isoenzyme`; `CK-MB` | Pending `CON-FND-DD3EE5EC8C07D1` in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` identifies CK as M/B dimers forming three tissue isoenzymes and contrasts them with LDH isoenzymes. | pending |
| promoter-mutation — `aa8 B26, p. 18` | `promoter`; `promoter mutation`; `transcription`; `RNA polymerase` | The live promoter-DNA-methylation record and pending TATA/CAAT/GC promoter records treat epigenetic silencing or normal promoter elements, not the effect of a promoter mutation on transcription. | new |
| niacin-deficiency — `aa8 B27; B42, pp. 18/21` | `niacin`; `pellagra`; `vitamin B3`; `NAD` | Pending `CON-FND-C9E5128193029E` in `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md` identifies niacin as the NAD+/NADP+ precursor and directly gives pellagra as its deficiency. | pending |
| vitamin-c-collagen-hydroxylation — `aa8 B29; B37, pp. 18/20` | `vitamin C`; `ascorbic`; `collagen hydroxylation`; `proline` | Pending `CON-FND-96FF52D15F67AE` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` states vitamin-C-dependent hydroxylation of proline and lysine during collagen synthesis. | pending |
| vitamin-d-rickets — `aa8 B30, p. 19` | `vitamin D`; `rickets`; `calcitriol`; `bone mineralization` | Pending `CON-FND-46B9F239340ED9` in `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md` gives renal 1-hydroxylase activation to calcitriol, bone calcification and deficiency rickets. | pending |
| prokaryotic-eukaryotic-translation — `aa8 B32, p. 19` | `translation`; `prokaryotic`; `eukaryotic`; `ribosome` | Pending records separately cover eukaryotic initiation and bacterial 70S ribosomes, but none compares prokaryotic with eukaryotic translation; the broad live bacterial-ribosome fact is a near-match. | new |
| primase — `aa8 B33, p. 19` | `primase`; `RNA primer`; `DNA replication`; `Okazaki` | Pending `CON-FND-75C487BD0973FA` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` states that primase lays the required short RNA primer before DNA polymerase can synthesize a new strand. | pending |
| two-three-bpg — `aa8 B34; B51, pp. 19/25` | `2,3-BPG`; `BPG`; `haemoglobin`; `oxygen affinity` | Pending `CON-HEM-6B557A065A8D90` in `docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md` explicitly states that 2,3-BPG binds haemoglobin and lowers oxygen affinity. | pending |
| copper-dependent-enzymes — `aa8 B39, p. 21` | `copper`; `copper enzyme`; `lysyl oxidase`; `ceruloplasmin` | Pending `docs/Alexandria-Source-Imports/question/AU-MED-102-biochem-nitrogen-blood-mcq.md` (Q11) explicitly states that copper is a cofactor for cytochrome oxidase and ceruloplasmin, covering the copper-dependent-enzyme scope. | pending |
| ldh-isoenzymes — `aa8 B43, p. 21` | `LDH`; `lactate dehydrogenase`; `isoenzyme`; `lactate` | Pending `CON-FND-DD3EE5EC8C07D1` in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` identifies five H/M-subunit LDH tissue isoenzymes and their diagnostic distribution. | pending |
| lyase-enzyme-class — `aa8 B44, p. 22` | `lyase`; `enzyme class`; `cleavage`; `synthase` | ATP-citrate lyase and HMG-CoA lyase records name individual enzymes only; none states the lyase enzyme-class cleavage mechanism. | new |
| z-dna — `aa8 B45, p. 22` | `Z-DNA`; `Z DNA`; `left handed`; `DNA conformation` | All four queries return no same-scope record. | new |
| nucleosome-function — `aa8 B46, p. 22` | `nucleosome`; `histone octamer`; `chromatin`; `DNA packaging` | Pending `CON-FND-3660CDEFA054C3` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` describes the H2A/H2B/H3/H4 octamer and its DNA-packaging role. | pending |
| dna-polymerase-iii-proofreading — `aa8 B47, p. 23` | `DNA polymerase III`; `polymerase III`; `proofreading`; `exonuclease` | Pending `CON-FND-7302601EA492D2` covers generic replication proofreading, but both polymerase-III queries return no record; it does not establish the bacterial polymerase-III scope. | new |
| complex-iv — `aa8 B-W1, p. 26` | `complex IV`; `cytochrome c oxidase`; `ETC`; `oxygen acceptor` | Pending `CON-FND-CFB54F33867C57` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-metabolism-concepts.md` identifies cytochrome oxidase as Complex IV and directly covers its cyanide inhibition, the examined Complex-IV inhibitor scope. | pending |

Batch delta: `live +0`, `pending +13`, `new +7`; no concept ID is minted by this ledger.

### Semantic adjudication batch 5 — next 20 unadjudicated handles

The deterministic selection continues after batch 4: register rows 85–104 of
`triage-bms101-search.mjs`. They contribute exactly 80 searches, four per handle. The
records below were read for same-idea/same-scope coverage; incidental hits such as the
diphtheria toxoid, generic topoisomerase, and collagen-versus-elastin comparison records are not
merges. `b7c B49` remains an image/media dependency even though its underlying base-classification
idea is already pending.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| etc-complexes — `aa8 B-W2, p. 26` | `electron transport`; `ETC`; `mitochondrial complex`; `oxidative phosphorylation` | Pending `CON-FND-A3BC299ED2C7C9` in `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` identifies the four complexes, CoQ/cytochrome-c carriers, and the distinct NADH/FADH2 entry routes. | pending |
| etc-uncoupling — `aa8 B-W4, p. 27; b7c B42, p. 10` | `uncoupling`; `uncoupler`; `proton gradient`; `oxidative phosphorylation` | Pending `CON-FND-C3CB859E560A18` in `docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md` states proton-gradient dissipation, continued oxidation, lost ATP synthesis and heat release. | pending |
| folate-deficiency — `aa8 B-W5, p. 27` | `folate`; `folic acid`; `megaloblastic`; `one carbon` | Pending `CON-HEM-EF9B70874983FB` in `docs/Alexandria-Source-Imports/concept/AU-MED-103-biochemistry-concepts.md` gives one-carbon failure, macrocytic/megaloblastic anaemia, and the absence of neurological signs. | pending |
| rna-polymerase-iii — `b7c B27, p. 7` | `RNA polymerase III`; `polymerase III`; `5S RNA`; `RNA polymerase` | Pending `CON-FND-412F3EDF118F44` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md` assigns polymerase III to tRNA, 5S rRNA and snRNA. | pending |
| start-codon-aug — `b7c B28, p. 7` | `AUG`; `start codon`; `methionine`; `translation initiation` | Pending `CON-FND-09FACBDCBBF8FD` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md` states AUG initiation and methionyl-tRNA recognition. | pending |
| codon-degeneracy — `b7c B29, p. 8` | `codon degeneracy`; `degenerate code`; `genetic code`; `codon` | Pending `CON-FND-F7408686F4736E` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` defines degeneracy as several synonymous codons for one amino acid. | pending |
| lipid-classification — `b7c B30, p. 8` | `lipid`; `lipid class`; `phospholipid`; `triglyceride` | Pending `CON-FND-30D2E317144DDF` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` classifies simple, compound and derived lipids by composition. | pending |
| diphtheria-ef2 — `b7c B32, p. 8` | `diphtheria`; `EF-2`; `elongation factor`; `ADP ribosylation` | The pending diphtheria record covers formalin conversion of toxin to toxoid; no record names EF-2 ADP-ribosylation or translational arrest. | new |
| rotenone-complex-i — `b7c B33, p. 9` | `rotenone`; `complex I`; `NADH dehydrogenase`; `ETC` | No record states rotenone inhibition of Complex I/NADH dehydrogenase; Complex-II and cyanide/Complex-IV records are near-misses. | new |
| dna-methylation — `b7c B34, p. 9` | `DNA methylation`; `methylation`; `epigenetic`; `CpG` | Live `CON-FND-2447F778E94F18`, “Promoter DNA methylation and transcription”, states methyltransferase methylation of cytosine at CpG-rich promoters and associated gene silencing. | live |
| elastin-elasticity-amino-acids — `b7c B35, p. 9` | `elastin`; `elasticity`; `alanine`; `glycine` | Pending `CON-FND-31F96EC2F609C9` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` describes elastin's one-chain, non-glycoprotein fibre, desmosine cross-links and elasticity, but not its alanine/glycine composition; no same-scope record exists. | new |
| xeroderma-pigmentosum-repair — `b7c B39, p. 10` | `xeroderma`; `xeroderma pigmentosum`; `nucleotide excision`; `thymine dimer` | Pending `CON-FND-E8CD7F7F690B14` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md` identifies nucleotide-excision repair failure of UV pyrimidine-dimer damage. | pending |
| alternative-splicing — `b7c B40, p. 10` | `alternative splicing`; `splicing`; `RNA processing`; `introns` | Pending `CON-FND-27013C64915C7E` in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` gives intron removal/exon joining and alternative production of proteins from one transcript. | pending |
| mitochondrial-dna-polymerase — `b7c B43, p. 11` | `mitochondrial DNA`; `DNA polymerase gamma`; `polymerase gamma`; `mitochondria` | Pending `CON-FND-A73C06E0EC3C1D` in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` assigns DNA polymerase γ to mitochondrial-DNA synthesis. | pending |
| deoxy-sugars — `b7c B48, p. 12` | `deoxy sugar`; `deoxyribose`; `sugar`; `nucleotide` | Pending `CON-FND-2BD334DFDAE34C` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` defines deoxy sugars by replacement of C2 hydroxyl with hydrogen and names 2-deoxyribose. | pending |
| nitrogenous-base-structure — `b7c B49, p. 12` | `nitrogenous base`; `purine`; `pyrimidine`; `nucleotide` | Pending `CON-FND-21029C98FEA19F` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` classifies purine/pyrimidine bases and their nucleotide/nucleoside relations; the source image itself remains a media dependency. | pending |
| cytokinesis — `b7c B50, p. 12` | `cytokinesis`; `cell division`; `cleavage furrow`; `actin ring` | Pending `CON-FND-6DEB5A4F0F1675` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` states actin-filament cleavage-furrow division of the cytoplasm in telophase. | pending |
| meiosis-tetrads — `b7c B52, p. 13` | `tetrad`; `tetrads`; `meiosis`; `crossing over` | Pending `CON-FND-685D573458A6D7` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` describes prophase-I tetrads of four chromatids and crossing over at chiasmata, matching B52's homologous-tetramer stage question. | pending |
| topoisomerase-i-vs-ii — `b7c B-W3, p. 27` | `topoisomerase I`; `topoisomerase II`; `topoisomerase`; `DNA topology` | Existing pending topoisomerase content only describes generic relief of replication supercoils; no record distinguishes type I from type II. | new |
| connective-tissue-receptors — `aa8 H1, p. 28` | `connective tissue receptor`; `mechanoreceptor`; `Pacinian`; `Ruffini` | Pending `CON-DER-56784AB396C13E` in `docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md` locates Meissner corpuscles in papillary dermis and Pacinian/Ruffini/Krause receptors in reticular dermis. | pending |

Batch delta: `live +1`, `pending +15`, `new +4`; no concept ID is minted by this ledger.

### Semantic adjudication batch 6 — next 20 unadjudicated handles

This deterministic slice is unadjudicated ordinals 105–124 and contributes exactly 80
searches. Re-reading the printed prompts and key corrected seven misassigned handles.
`aa8 H7` and `H16` are one same-idea/same-scope proposition — coronary arteries have
both internal and external elastic laminae — so the duplicate register row was collapsed.
The register then had 180 handles / 720 queries; the later source-first collapse documented in
batch 8 leaves 179 / 716. Ordinal 124 is now `capillary-types-and-sites`. This is a documented
true collapse, not a new record.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| astrocyte-blood-brain-barrier-maintenance — `aa8 H2` | `astrocyte`; `astrocytes`; `blood brain barrier`; `BBB` | The printed stem asks the cell maintaining BBB integrity after traumatic injury (key C, astrocytes). Live `CON-NEU-93CD087BDE3F7B` assigns astrocytes to BBB formation and maintenance, the exact scope. | live |
| vinca-alkaloids — `aa8 H3` | `vinca`; `vincristine`; `vinblastine`; `microtubule` | No same-scope record states vinca-alkaloid microtubule action. | new |
| crossing-over — `aa8 H4` | `crossing over`; `crossing-over`; `meiosis`; `chiasma` | Pending `CON-FND-FD0B2BBE1B5120` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-histology-concepts.md` explicitly places exchange of non-sister chromatid segments in prophase I. | pending |
| sympathetic-ganglion-vascularity — `aa8 H5` | `sympathetic ganglion`; `sympathetic ganglia`; `ganglion vascularity`; `blood supply` | The printed question asks which listed structure is vascular (key A, sympathetic ganglia). Ganglion-type and sympathetic-injury records do not establish relative ganglionic vascularity. | new |
| purkinje-fibre-size — `aa8 H6` | `Purkinje fibre`; `Purkinje fibers`; `ventricular muscle cells`; `contractile ventricular cells` | The true statement is that Purkinje fibres are larger than contractile ventricular cells (key A). Pending `CON-MSK-5EA95D36121EF8` in `docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md` explicitly states that they are larger than ordinary cardiac muscle fibres. | pending |
| coronary-artery-elastic-laminae — `aa8 H7; H16` | `coronary artery`; `internal elastic`; `external elastic`; `elastic lamina` | H7 identifies coronary artery as the vessel with prominent internal and external laminae (key C); H16 asks the same proposition directly (key C). Live muscular-artery lamina records do not state the coronary-artery application, so they are not same-scope merges. | new |
| nucleolar-disappearance — `aa8 H8` | `nucleolus`; `nucleolar`; `mitosis`; `prophase` | Nuclear-envelope and generic mitosis records do not state nucleolar disappearance during prophase. | new |
| down-syndrome — `aa8 H9` | `Down syndrome`; `trisomy 21`; `Down`; `chromosome` | Live `CON-DEV-243DD717D2FDA3`, “Down syndrome and extra chromosome 21”, has the exact syndrome/chromosome scope. | live |
| turner-syndrome — `aa8 H10` | `Turner syndrome`; `45,X`; `Turner`; `sex chromosome` | Pending `CON-DEV-451A64C9445CAB` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` identifies Turner syndrome as monosomy with 45 chromosomes. | pending |
| dorsal-root-ganglion — `aa8 H11` | `dorsal root ganglion`; `spinal ganglion`; `DRG`; `pseudounipolar` | No same-scope dorsal-root/spinal-ganglion morphology record exists. | new |
| spinal-ganglion-blood-supply — `aa8 H12` | `spinal ganglion`; `dorsal root ganglion`; `ganglion blood supply`; `poor blood supply` | The question asks which ganglion is poorly supplied with blood (key B, spinal ganglion). Epithelial avascularity and non-vascular ganglion records are near-misses; no same-scope record exists. | new |
| desmin-intermediate-filament — `aa8 H13` | `desmin`; `intermediate filament`; `muscle filament`; `cytoskeleton` | Pending `CON-FND-6268E97A4A9F26` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` explicitly names desmin as the intermediate filament of muscle. | pending |
| mast-cell-histamine — `aa8 H14` | `mast cell`; `histamine`; `mast`; `granule` | Pending `CON-FND-7D406E91EA3BF2` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` states mast-cell storage and IgE-triggered release of histamine. | pending |
| keratin — `aa8 H17` | `keratin`; `keratinization`; `keratinocyte`; `epidermis` | Pending `CON-FND-6268E97A4A9F26` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` identifies cytokeratin as epithelium's intermediate filament; protein-classification hits are near-misses. | pending |
| pancreatic-salivary-ducts — `aa8 H18` | `pancreatic duct`; `salivary duct`; `duct epithelium`; `stratified cuboidal` | Main-pancreatic-duct and generic large-gland-duct records do not establish the pancreatic-versus-salivary duct epithelium comparison. | new |
| purkinje-fibre-subendocardial-location — `aa8 H19` | `Purkinje fibre`; `Purkinje fibers`; `subendocardial`; `endocardium` | The printed question asks their site (key A, subendocardial space). Pending `CON-CVS-6799821893D6D2` in `docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md` places the Purkinje network beneath the endocardium. | pending |
| cellular-pigments — `aa8 H20; H22` | `haemosiderin`; `hemosiderin`; `lipofuscin`; `macrophage pigment` | Pending `CON-HEM-A858B859CA693E` in `docs/Kasr-Source-Imports/concept/102-INT-physiology-concepts.md` establishes ferritin/haemosiderin storage in liver cells and spleen; pending `CON-FND-5DBC795B58DC74` establishes macrophage RBC breakdown into haemosiderin. Together they cover the two printed pigment contexts. | pending |
| isochromosome-transverse-centromere-division — `aa8 H21` | `isochromosome`; `transverse centromere`; `centromere division`; `identical arms` | The printed stem describes transverse centromere division producing identical arms (key B, isochromosome). Pending `CON-DEV-D2BA4082190B3F` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` explicitly states this mechanism. | pending |
| epidermal-layers — `aa8 H-W1` | `epidermal layers`; `epidermis`; `stratum`; `keratinocyte` | Pending `docs/Kasr-Source-Imports/article/103-BMS-histology.md` and its epidermal-layer concepts (`CON-DER-743AA0CD69B8A4`, `CON-DER-AB2A559A79ACB3`) cover the layer sequence and terminal-layer morphology. | pending |
| capillary-types-and-sites — `aa8 H-W2` | `fenestrated capillary`; `capillary`; `sinusoid`; `continuous capillary` | Pending `CON-CVS-132A76916FEC05` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` gives fenestrated-capillary sites; its linked live continuous/sinusoidal record completes the requested types-and-sites scope. | pending |

Batch delta: `live +2`, `pending +11`, `new +7`; no concept ID is minted by this ledger.

### Semantic adjudication batch 7 — next 20 unadjudicated handles

This deterministic slice is unadjudicated ordinals 125–144 and contributes exactly 80
searches. Candidate records below were read for the asserted proposition, not accepted from
substring output. In particular, generic elastic-fibre material does not establish the
Marfan/fibrillin association; hair-follicle and arrector-pili records do not establish the
root-hair plexus; and generic GABA records do not establish a barbiturate mechanism.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| medium-artery-vein-comparison — `aa8 H-W3, p. 35` | `medium artery`; `medium vein`; `artery vein`; `tunica media` | Pending `CON-CVS-3C04F2DED454C9` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` contrasts the two vessels across wall/lumen/valves and all three tunics. | pending |
| euchromatin-heterochromatin — `aa8 H-W4, p. 35` | `euchromatin`; `heterochromatin`; `chromatin`; `transcription` | Pending `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` states the exact active/extended versus inactive/condensed chromatin comparison, including nuclear appearance. | pending |
| neuron-glial-morphology — `b7c H53, p. 13` | `glia`; `neuron`; `neuroglia`; `nervous tissue` | Pending `CIT-5DF92ED48582` in `docs/Alexandria-Source-Imports/evidence/AU-MED-105-histology-citations.md`, attached to `CON-NEU-93CD087BDE3F7B`, explicitly describes oligodendrocytes as small cells with few short processes compared with astrocytes. | pending |
| collagen-fibres — `b7c H54, p. 13` | `collagen fibre`; `collagen`; `type I collagen`; `connective tissue` | Pending `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` has the same-scope connective-tissue fibre record, including collagen type/site and distinction from elastic and reticular fibres. | pending |
| marfan-fibrillin — `b7c H58, p. 14` | `Marfan`; `fibrillin`; `elastic fibre`; `connective tissue` | Elastic-fibre records describe fibrillin as a scaffold but none names the Marfan/fibrillin association; they are near-misses, not a merge. | new |
| sex-chromosome-karyotype — `b7c H59, p. 14` | `karyotype`; `sex chromosome`; `Barr body`; `chromosome` | Pending `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` covers karyotyping and sex-chromosome classification; its linked sex-chromosome-aberration record gives the relevant karyotype context. | pending |
| venous-smooth-muscle — `b7c H60, p. 14` | `vein smooth muscle`; `venous`; `smooth muscle`; `tunica media` | Pending `CON-CVS-B29610035B568D` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` specifies smooth muscle in the media of medium veins and longitudinal smooth muscle in large-vein adventitia. | pending |
| brown-adipose-tissue — `b7c H62, p. 15` | `brown adipose`; `brown fat`; `adipose`; `thermogenesis` | Pending `CON-FND-86543DB2855310` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` distinguishes brown from white adipose tissue by multilocularity, mitochondria and thermogenesis. | pending |
| thin-versus-thick-skin — `b7c H65, p. 16` | `thin skin`; `thick skin`; `epidermal layers`; `sweat glands` | Pending `CON-DER-ACDEAF318B290B` in `docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md` compares sites, layers, papillae, hair appendages and sweat-gland density. | pending |
| cell-cycle-competence — `b7c H75, p. 18` | `cell cycle`; `cell cycle competence`; `G0`; `proliferation` | Pending `CON-FND-A2E40256517389` in `docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md` distinguishes permanent, potentially renewable and continuously renewing cells, including liver-cell re-entry from G0. | pending |
| epicardium — `b7c H66, p. 16` | `epicardium`; `pericardium`; `heart wall`; `mesothelium` | Pending `CON-CVS-CC8835108F512C` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` identifies epicardium as the outer heart-wall layer and describes its mesothelium, connective tissue, vessels and nerves. | pending |
| trigeminal-nucleus — `b7c H67, p. 16` | `trigeminal nucleus`; `trigeminal`; `cranial nerve`; `brainstem` | The cranial-nerve and generic neuron records do not identify the tested trigeminal-nucleus site or its neuronal morphology. | new |
| elastic-fibres — `b7c H69, p. 16` | `elastic fibre`; `elastin`; `fibrillin`; `connective tissue` | Pending `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` defines elastic fibres by elastin/fibrillin composition, staining, recoil and named sites. | pending |
| umbilical-cord-connective-tissue — `b7c H70, p. 17` | `umbilical cord`; `Wharton`; `mucoid connective`; `umbilical` | Pending `CON-FND-EA4034F1E87235` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` identifies Wharton's jelly as hyaluronic-acid-rich mucoid connective tissue of the umbilical cord. | pending |
| hair-follicle-receptor — `b7c H72, p. 17` | `hair follicle`; `root hair plexus`; `hair receptor`; `mechanoreceptor` | Hair-follicle, arrector-pili and dermal-mechanoreceptor records do not name the root-hair plexus sensory receptor; they are near-misses. | new |
| thermoregulatory-av-shunts — `b7c H76, p. 18` | `arteriovenous shunt`; `AV shunt`; `thermoregulation`; `skin blood flow` | Pending `docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md` gives the shunt's sites, sympathetic muscular control and local-heat/body-temperature regulation. | pending |
| adherens-junction — `b7c H77, p. 18` | `adherens junction`; `adherens`; `cadherin`; `cell junction` | Pending `CON-FND-59E3FDA20F54AD` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` distinguishes zonula from macula adherens by shape, anchored filament and strength. | pending |
| urinary-oral-epithelia — `b7c H-W1, p. 28` | `urothelium`; `transitional epithelium`; `oral epithelium`; `stratified squamous` | Pending urothelium record and `CON-FND-8FEBD5195DCED2` in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` together distinguish urinary transitional epithelium from oral non-keratinised stratified squamous epithelium. | pending |
| vasa-vasorum — `b7c H-W3, p. 29` | `vasa vasorum`; `vasorum`; `large artery`; `blood vessel wall` | Pending `CON-CVS-30053920BDC07F` in `docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md` places vasa vasorum in adventitia and states their vessel-wall nutrition role. | pending |
| barbiturate-neurotransmission — `aa8 P1, p. 36` | `barbiturate`; `GABA`; `neurotransmission`; `chloride channel` | GABA precursor records do not state the barbiturate receptor/chloride-channel effect; no same-scope live or pending record exists. | new |

Batch delta: `live +0`, `pending +16`, `new +4`; no concept ID is minted by this ledger.

### Semantic adjudication batch 8 — next 20 unadjudicated handles

Source-first correction: `aa8 P3` tests reduced thermoregulation with ageing and `b7c P96`
tests reduced sweat-gland activity, so they are one age-related sweating/thermoregulation
scope, not the wrinkle-only skin-ageing record. `aa8 P18` (diarrhoea) and `P24` (vomiting)
both test hypokalaemic membrane hyperpolarisation and are source references for the earlier
potassium/resting-potential handle, not separate concepts. `aa8 P23` is instead the distinct
uncompensated-water-loss → decreased-ECF-volume proposition. Removing the duplicate leaves
179 handles / 716 queries; deterministic ordinals 145–164 remain exactly 20 / 80 by pulling
former ordinal 165 (`osmosis`) into this batch. No ID is minted.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| synaptic-fatigue — `aa8 P2, p. 36` | `synaptic fatigue`; `synaptic`; `fatigue`; `neurotransmitter depletion` | Pending `CON-NEU-64B329335E9489` in `docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md` states that neuromuscular transmission fatigues with repeated stimulation because acetylcholine vesicles are exhausted. | pending |
| age-related-sweating-thermoregulation — `aa8 P3; b7c P96, pp. 36/22` | `ageing`; `aging`; `sweat gland`; `thermoregulation` | Pending eccrine-gland records establish cooling by sweating but not the age-related decrease; live `CON-DER-3076014D01EA15` is wrinkle/elasticity only. Neither is the tested age-related sweating/thermoregulation scope. | new |
| thermoregulation — `aa8 P4, p. 37` | `thermoregulation`; `temperature regulation`; `heat loss`; `hypothalamus` | The anterior-hypothalamus and eccrine-gland records are partial temperature-related facts; none establishes the tested thermoregulatory scope. | new |
| temporal-summation — `aa8 P5; b7c P87, pp. 37/20` | `temporal summation`; `summation`; `synapse`; `postsynaptic` | Pending `CON-NEU-7E784A50D2BBAF` in `docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md` states that rapid repeated subthreshold stimuli summate to firing level because the local response has no refractory period. | pending |
| potassium-and-resting-potential — `aa8 P6–7/P18/P24; b7c P99/P100, pp. 37/40/43/22–23` | `hypokalaemia`; `hyperkalaemia`; `potassium`; `resting membrane potential` | Pending `CON-NEU-77596C8A899A7E` in `docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md` distinguishes hyperkalaemic depolarisation from hypokalaemic hyperpolarisation and relates extracellular potassium to resting potential; P18 and P24 are the same relation after diarrhoeal/vomiting potassium loss. | pending |
| resting-membrane-potential — `aa8 P9; b7c P94, pp. 38/22` | `resting membrane potential`; `RMP`; `membrane potential`; `potassium permeability` | Live `CON-NEU-763D2F7A1571C9`, “Diffusion is the principal determinant of resting membrane potential,” has the asked mechanism scope. | live |
| calcium-transmitter-release — `aa8 P11; b7c P97, pp. 38/23` | `calcium channel`; `calcium dependent`; `neurotransmitter release`; `presynaptic` | Pending `CON-MSK-77D955AAB4D0FA` in `docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md` gives presynaptic calcium entry, vesicle rupture and acetylcholine release in sequence. | pending |
| body-fluid-osmolarity — `aa8 P12; b7c P84, pp. 38/20` | `osmolarity`; `osmolality`; `ECF`; `ICF` | Pending `CON-NEU-1D5DC2D67A5291` in `docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md` states that ICF and ECF osmolarity is each about 300 mOsm/L and distinguishes tonicity. | pending |
| chemical-synapse-sequence — `aa8 P14; b7c P-W1, pp. 39/26` | `chemical synapse`; `synaptic transmission`; `vesicle release`; `calcium channel` | Pending `CON-MSK-77D955AAB4D0FA` in `docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md` supplies the ordered presynaptic-calcium, vesicle-release, postsynaptic-channel and transmitter-clearance sequence. | pending |
| intracellular-potassium — `aa8 P15; b7c P80, pp. 39/19` | `intracellular potassium`; `ICF potassium`; `potassium`; `body fluid` | Pending `CON-FND-0592C1390E1B57` in `docs/Alexandria-Source-Imports/concept/AU-MED-102-physiology-concepts.md` explicitly places potassium (with phosphate and proteins) at higher intracellular concentration. | pending |
| ipsp-inhibitory-neurotransmitter — `aa8 P16; b7c P95, pp. 40/22` | `IPSP`; `inhibitory postsynaptic`; `inhibitory neurotransmitter`; `GABA` | No candidate identifies the tested inhibitory postsynaptic potential/neurotransmitter relation; generic synapse and GABA-adjacent hits are not that scope. | new |
| cleavage-lines — `aa8 P17; b7c P89, pp. 40/21` | `cleavage lines`; `Langer lines`; `incision`; `skin tension` | No candidate establishes the relation between cleavage lines, incision orientation and skin tension. | new |
| calcium-homeostasis — `aa8 P19, p. 41` | `calcium homeostasis`; `calcium`; `parathyroid`; `calcitriol` | Calcium distribution, isolated parathyroid disease and calcitriol glossary hits do not establish the tested homeostatic relation. | new |
| diffusion-and-facilitated-diffusion — `aa8 P20; b7c P83, pp. 41/20` | `facilitated diffusion`; `diffusion`; `carrier`; `passive transport` | Pending `CON-NEU-1D5DC2D67A5291` in `docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md` distinguishes simple diffusion, carrier-mediated facilitated diffusion and osmosis, including passive down-gradient movement. | pending |
| convergence — `aa8 P21; b7c P99, pp. 42/22` | `convergence`; `neural convergence`; `synapse`; `neuronal circuit` | Reflex-arc and generic synapse records do not establish neural convergence. | new |
| energy-independent-transport — `aa8 P22, p. 42` | `passive transport`; `energy independent`; `diffusion`; `osmosis` | Pending `CON-NEU-1D5DC2D67A5291` in `docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md` establishes diffusion, facilitated diffusion and osmosis as passive, down-gradient transport. | pending |
| uncompensated-water-loss-ecf-volume — `aa8 P23, p. 42` | `uncompensated water loss`; `water loss`; `extracellular volume`; `dehydration` | Aldosterone-deficiency and respiratory-water-loss records are cause-specific near-misses; none states uncompensated water loss causing decreased ECF volume. | new |
| steady-state-osmolarity — `aa8 P25, p. 43` | `steady state`; `osmolarity`; `osmolality`; `body fluids` | Pending `CON-NEU-1D5DC2D67A5291` in `docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md` gives the shared approximately 300 mOsm/L ICF/ECF body-fluid osmolarity relevant to the steady-state item. | pending |
| epinephrine-actions — `b7c P82, p. 20` | `epinephrine`; `adrenaline`; `sympathetic`; `beta receptor` | Pending `CON-NEU-F16D60268905BC` in `docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md` states that adrenaline acts on both alpha and beta receptors, with both excitatory and inhibitory effects. | pending |
| osmosis — `b7c P90, p. 21` | `osmosis`; `osmotic`; `water movement`; `semipermeable` | Pending `CON-NEU-1D5DC2D67A5291` in `docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md` defines osmosis as water movement across a membrane permeable to water but not solute. | pending |

Against the committed `144/180 = 7 live / 106 pending / 31 new` base, this corrected batch is
`live +1`, `pending +12`, `new +7`. P18/P24 add provenance to an existing pending handle and
do not add a bucket. The source-first collapse changes only the total denominator: cumulative
is `164/179 = 8 live / 118 pending / 38 new`, with `15` handles remaining.

### Semantic adjudication batch 9 — final 15 unadjudicated handles

This final deterministic slice is register ordinals 165–179 and contributes exactly 60
searches. Each apparent match was read at the asserted scope: tonicity is not the same as a
saline-induced compartment shift. No ID is minted.

| Handle / evidence | Four runner queries | Scope-confirmed record read | Disposition |
|---|---|---|---|
| carrier-stereospecificity-saturation — `b7c P91–92, pp. 21–22` | `carrier saturation`; `stereospecificity`; `carrier`; `transport maximum` | Live `CON-FND-DF7D6BE0B98F86` states facilitated diffusion is substrate-specific, and live `CON-FND-7E16CDFECE29B4` states carrier saturation imposes its maximum rate; together they cover the two printed carrier properties. | live |
| fluid-shifts-solute-load — `b7c P93, p. 22` | `fluid shift`; `solute load`; `osmolarity`; `ECF ICF` | The pending tonicity record distinguishes hypertonic from hypotonic solutions but does not state the tested compartmental fluid shift after a solute load. | new |
| melanocyte-photoprotection — `b7c P102, p. 24` | `melanocyte`; `melanin`; `photoprotection`; `ultraviolet` | Pending `CON-DER-71C980D8864B73` in `docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md`, with `article/103-BMS-histology.md`, directly identifies melanocytes as protecting skin from ultraviolet light through UV-responsive melanin synthesis. | pending |
| action-potential-upstroke — `867 P1/P3` | `action potential`; `upstroke`; `sodium influx`; `depolarisation` | Pending `CON-NEU-7A30FECF042995` in `docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md` directly states that the nerve action-potential depolarisation/upstroke is regenerative sodium influx. | pending |
| potassium-equilibrium-potential — `867 P2` | `potassium equilibrium`; `equilibrium potential`; `Nernst`; `potassium` | Pending `CON-NEU-8CC845C16CE133` gives the Nernst single-ion calculation and the approximately −94 mV potassium equilibrium potential. | pending |
| potassium-efflux-repolarisation — `867 P4` | `repolarisation`; `potassium efflux`; `action potential`; `potassium channel` | Pending `CON-NEU-DD9033DCA3AAF1` in `docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md` states delayed potassium efflux during repolarisation and slow potassium-channel closure in hyperpolarisation. | pending |
| sodium-channel-block — `867 P6` | `sodium channel block`; `sodium channel`; `local anaesthetic`; `action potential` | Pending `CON-NEU-77596C8A899A7E` states that reduced sodium permeability from local anaesthetic stabilises the membrane and that tetrodotoxin sodium-channel blockade prevents an action potential. | pending |
| siadh-compartments — `867 P7` | `SIADH`; `ADH`; `hyponatraemia`; `body fluid` | No candidate states SIADH's body-fluid-compartment consequences; general ADH and body-fluid records are near-misses. | new |
| hypertonic-saline-compartments — `867 P8` | `hypertonic saline`; `hypertonic`; `ECF ICF`; `fluid shift` | The pending tonicity record labels a solution hypertonic relative to plasma but does not establish the tested ECF/ICF shift after hypertonic saline. | new |
| hypotonic-saline-compartments — `867 P9` | `hypotonic saline`; `hypotonic`; `ECF ICF`; `fluid shift` | The pending tonicity record labels a solution hypotonic relative to plasma but does not establish the tested ECF/ICF shift after hypotonic saline. | new |
| body-fluid-volume-calculation — `867 P10–12` | `ICF volume`; `plasma volume`; `interstitial fluid`; `body fluid compartment` | Pending `docs/Kasr-Source-Imports/article/102-INT-physiology-blood-ans.md` gives ICF as TBW−ECF, plasma-volume indicators, and ISF as ECF−plasma; pending `CON-HEM-887A8CA1A1A3DC` supplies the haematocrit red-cell fraction. Together they cover all three printed calculations. | pending |
| sodium-nernst-potential — `867 P13` | `sodium Nernst`; `Nernst`; `sodium equilibrium`; `membrane potential` | Pending `CON-NEU-8CC845C16CE133` gives the Nernst single-ion calculation and the approximately +61 mV sodium equilibrium potential. | pending |
| sodium-potassium-atpase-inhibition — `867 P14` | `Na/K ATPase`; `sodium potassium pump`; `ouabain`; `active transport` | Pending `CON-CVS-7A8A04F61D44D1` in `docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md` gives the electrogenic Na+-K+ ATPase stoichiometry and the effect of digitalis inhibition on intracellular sodium/Na+-Ca++ exchange. | pending |
| hyperkalaemic-weakness — `867 P15` | `hyperkalaemic weakness`; `hyperkalaemia`; `muscle weakness`; `membrane potential` | The pending nerve-excitability record states hyperkalaemic depolarisation with raised excitability; it does not establish the tested hyperkalaemic-weakness mechanism. | new |
| potassium-current-driving-force — `867 P16` | `driving force`; `potassium current`; `potassium`; `membrane potential` | Live `CON-NEU-BA127208F5318E` states that at normal RMP potassium's electrical gradient opposes its chemical gradient but the net electrochemical gradient remains outward, the exact driving-force relation. | live |

Against the committed `164/179 = 8 live / 118 pending / 38 new` base, this final batch is
`live +2`, `pending +8`, `new +5`; cumulative is `179/179 = 10 live / 126 pending / 43 new`.
All 179 register handles are now adjudicated; 0 remain unadjudicated, and no record was created.
