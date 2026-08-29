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
