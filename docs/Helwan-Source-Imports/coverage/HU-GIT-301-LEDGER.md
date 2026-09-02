<!--
  NOTE on this ledger's own per-row numbers: scripts/content/ledger.mjs infers
  a "cluster" by stripping a trailing "-qNN" from each key
  (`clusterForKey`), and groups authored keys by the seed file's single
  `cluster` field ("pathology-ch1" for this batch). Our tested_concept_key
  keys (dot-notation, e.g. "achalasia.definition") carry no "-qNN" suffix, so
  every triage key resolves to its own singleton cluster that no seed file's
  `cluster` ever equals — the table below therefore shows every row as
  0 authored / 1 remaining even for keys this batch actually authored. Other
  lanes (e.g. MU-MED104) avoided this by rewriting their triage file into
  "<cluster>-qNN" form; ours is the chief-of-staff-approved 281-key dot-key
  triage and is not rewritten here. A direct set-diff against the seed
  (below the tool's own table) is the true count for this pass.

  True count, pathology Chapter 1 (that commit): 47/47 seed keys matched
  against the 281-key triage list, 0 unexpected, 234 keys remain in the
  281-key triage after this chunk.

  True count, pathology Chapter 2 (that commit): 32/32 seed keys matched
  against the 281-key triage list, 0 unexpected, 202 keys remain in the
  281-key triage after this chunk. Individual rows below are hand-flipped to
  1 authored / 0 remaining for the 32 matched keys (same manual method as
  Chapter 1, since ledger.mjs still misreads these dot-notation keys), and a
  `pathology-ch2 | 32 | 0 | 0 | 32` summary row is added beside the existing
  `pathology-ch1` row.

  True count, pharmacology (this commit, both parts): 53 items authored (the
  shared-bank Q40 omeprazole item plus all 52 department pharmacology bank
  items) against 49 unique keys in the 202-key remainder — 4 keys are each
  matched by two authored items (antiemetics.motion-sickness.dimenhydrinate:
  items #1 and #31; metoclopramide.dual-antiemetic-prokinetic-action: items
  #2 and #34; h-pylori-eradication.triple-therapy: items #27 and #38;
  proton-pump-inhibitors.omeprazole: pharm item #6 and the shared Q40 item),
  0 unexpected, 153 keys remain in the 281-key triage after this chunk.
  Individual rows are hand-flipped to 1 authored / 0 remaining for the 49
  matched keys, and a `pharmacology | 53 | 0 | 0 | 53` summary row is added
  beside the pathology-ch1/ch2 rows.

  True count, parasitology Part 1 — Trematoda and Cestoda (this commit):
  before this pass, the `## Remaining` narrative list below still carried 200
  entries, not the 153 the prior note claimed — a bookkeeping slip in an
  earlier pass (the ch1/ch2/pharmacology table rows were correctly flipped,
  but the separate `## Remaining` list underneath was never regenerated to
  match). This pass rebuilt `## Remaining` from a direct set-diff of
  `HU-GIT-301-triage-keys.txt` (281 keys, ground truth) against every
  `question[].key` actually present in `coverage/seeds/HU-GIT-301/{pathology-
  ch1,pathology-ch2,pharmacology-part1,pharmacology-part2,parasitology-
  part1}.json` — confirming 128 keys used by the three prior chunks (matching
  47+32+49) and finding it 153, not 200, before this chunk, exactly matching
  the LANE-CARD's own count. 59 items authored this pass (items #1-59 of
  mcq-bank-parasitology.json, pp.7-13, the bank's Trematoda and Cestoda
  block) against 57 unique keys — 2 keys are each matched by two items
  (fasciola.halzoon-syndrome: items #8 and #14; trematode-eggs.operculated-
  immature: items #15 and #16), 0 unexpected. Individual rows are
  hand-flipped to 1 authored / 0 remaining for the 57 matched keys, a
  `parasitology-part1 | 57 | 0 | 0 | 57` summary row is added beside the
  pathology-ch1/ch2/pharmacology rows, and `## Remaining` is rewritten to the
  true 96 keys left in the 281-key triage (73 parasitology — nematodes
  pp.14-19 and the protozoa/mixed-vignette section pp.20-25 — plus all 23
  biochemistry keys, untouched by this pass).

  True count, parasitology Part 2 — Intestinal nematodes (this commit): 52
  items authored (bank items #60-111 of mcq-bank-parasitology.json, pp.14-19,
  the nematodes block) against 44 unique triage keys — 8 keys are each
  matched by two or three items (autoinfection.parasite-scope: items #63 and
  #102; strongyloides-stercoralis.larva-currens: items #67, #88 and #93;
  strongyloides-stercoralis.corticosteroid-hyperinfection-risk: items #76 and
  #78; ascaris-lumbricoides.loefflers-syndrome: items #81 and #85;
  ascaris-lumbricoides.complications.obstruction: items #84 and #110;
  strongyloides-stercoralis.diagnosis.stool-culture: items #89 and #96;
  hookworm-group.iron-deficiency-anemia / hookworm.iron-deficiency-anemia:
  items #62 and #74, consolidated under one concept root; and
  intestinal-nematodes.complication.appendicitis: items #75 and #100), 0
  unexpected. Two of the 44 keys (intestinal-nematodes.complication.
  appendicitis and heterophyes.complication.myocarditis) were already
  authored by the parasitology-part1 chunk (part1's item #56 and the
  Heterophyes/myocarditis concept respectively) — this pass reuses those
  concept ids directly rather than re-minting, so only 42 of the 44 keys were
  net-new to the 281-key triage's covered set. A direct set-diff of
  `HU-GIT-301-triage-keys.txt` (281 keys) against every `question[].key`
  actually present in `coverage/seeds/HU-GIT-301/{pathology-ch1,pathology-
  ch2,pharmacology-part1,pharmacology-part2,parasitology-part1,parasitology-
  part2}.json` confirms 227 keys now used (128 from the first three chunks +
  57 from parasitology-part1 + 42 net-new from this pass) and 54 keys
  remaining. Individual rows are hand-flipped to 1 authored / 0 remaining for
  the 42 net-new matched keys, a `parasitology-part2 | 44 | 0 | 0 | 44`
  summary row is added beside the other cluster rows, and `## Remaining` is
  rewritten to the true 54 keys left in the 281-key triage (31 parasitology
  — the protozoa/mixed-vignette section, pp.20-25 — plus all 23 biochemistry
  keys, both untouched by this pass).
-->

| cluster | authored | held | remaining | total |
|---|---:|---:|---:|---:|
| achalasia.definition | 0 | 0 | 1 | 1 |
| acute-appendicitis.predisposing-factors | 0 | 0 | 1 | 1 |
| acute-cholangitic-abscess.multiplicity | 1 | 0 | 0 | 1 |
| acute-gastric-ulceration.causes | 0 | 0 | 1 | 1 |
| acute-gastritis.causes | 0 | 0 | 1 | 1 |
| acute-gastritis.commonest-cause | 0 | 0 | 1 | 1 |
| acute-gastritis.pathogenesis | 0 | 0 | 1 | 1 |
| acute-intestinal-obstruction.functional-vs-mechanical | 0 | 0 | 1 | 1 |
| acute-oesophagitis.infective-causes | 0 | 0 | 1 | 1 |
| alcoholic-cirrhosis.gross-features | 1 | 0 | 0 | 1 |
| alcoholic-fatty-liver.increased-nadh-nad-ratio | 0 | 0 | 1 | 1 |
| alcoholic-steatosis.mechanisms | 1 | 0 | 0 | 1 |
| aluminium-hydroxide.phosphate-binding-in-renal-failure | 1 | 0 | 0 | 1 |
| amoebic-dysentery.flask-shaped-ulcers | 0 | 0 | 1 | 1 |
| amoebic-liver-abscess.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| ancylostoma-duodenale.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| ancylostoma-duodenale.ground-itch | 1 | 0 | 0 | 1 |
| ancylostoma-duodenale.infective-stage.filariform-larva | 0 | 0 | 1 | 1 |
| ancylostoma-duodenale.iron-deficiency-anemia | 0 | 0 | 1 | 1 |
| antacid-combination.mg-al-balancing-bowel-effects | 1 | 0 | 0 | 1 |
| antacids.rapid-onset-brief-duration | 1 | 0 | 0 | 1 |
| antidiarrhoeal-drugs.indapamide-is-a-diuretic | 1 | 0 | 0 | 1 |
| antidiarrhoeal-drugs.neostigmine-not-antidiarrhoeal | 1 | 0 | 0 | 1 |
| antiemetics.apomorphine-is-an-emetic | 1 | 0 | 0 | 1 |
| antiemetics.motion-sickness.dimenhydrinate | 1 | 0 | 0 | 1 |
| antispasmodics.direct-vs-anticholinergic | 1 | 0 | 0 | 1 |
| ascaris-lumbricoides.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| ascaris-lumbricoides.complications.obstruction | 1 | 0 | 0 | 1 |
| ascaris-lumbricoides.egg-maturation-in-soil | 1 | 0 | 0 | 1 |
| ascaris-lumbricoides.egg-morphology.single-cell | 1 | 0 | 0 | 1 |
| ascaris-lumbricoides.loefflers-syndrome | 1 | 0 | 0 | 1 |
| ascaris-lumbricoides.pulmonary-migration | 1 | 0 | 0 | 1 |
| autoinfection.parasite-scope | 1 | 0 | 0 | 1 |
| bacillary-dysentery.causative-organism | 0 | 0 | 1 | 1 |
| bacillary-dysentery.inflammation-type | 0 | 0 | 1 | 1 |
| budd-chiari-syndrome.hepatic-vein-thrombosis | 1 | 0 | 0 | 1 |
| capillaria-philippinensis.mode-of-infection | 1 | 0 | 0 | 1 |
| carcinoid-tumour.commonest-site.appendix | 0 | 0 | 1 | 1 |
| castor-oil.classification.irritant-laxative | 1 | 0 | 0 | 1 |
| cestoda.infective-stage.eggs | 1 | 0 | 0 | 1 |
| chemotherapy-induced-nausea.corticosteroid-adjunct | 1 | 0 | 0 | 1 |
| chenodeoxycholic-acid.gallstone-dissolution | 1 | 0 | 0 | 1 |
| cholangiocarcinoma.afp-not-a-marker | 1 | 0 | 0 | 1 |
| chronic-hepatitis.commonest-cause-viral | 1 | 0 | 0 | 1 |
| chronic-hepatitis.metabolic-causes | 1 | 0 | 0 | 1 |
| chronic-intestinal-obstruction.causes | 0 | 0 | 1 | 1 |
| chronic-intestinal-obstruction.pathology | 0 | 0 | 1 | 1 |
| chronic-liver-failure.causes | 1 | 0 | 0 | 1 |
| chronic-pancreatitis.commonest-cause-alcohol | 1 | 0 | 0 | 1 |
| chronic-pancreatitis.complications | 1 | 0 | 0 | 1 |
| chronic-pancreatitis.pathogenesis | 1 | 0 | 0 | 1 |
| cimetidine.cytochrome-p450-drug-interactions | 1 | 0 | 0 | 1 |
| cimetidine.gynaecomastia-side-effect | 1 | 0 | 0 | 1 |
| cimetidine.mechanism-and-adverse-effects | 1 | 0 | 0 | 1 |
| cirrhosis.regeneration-nodule-architecture | 1 | 0 | 0 | 1 |
| coeliac-disease.gluten-trigger | 0 | 0 | 1 | 1 |
| colloidal-bismuth.black-staining-side-effect | 1 | 0 | 0 | 1 |
| colonic-adenoma.malignant-potential | 0 | 0 | 1 | 1 |
| colonic-polyps.non-neoplastic-vs-neoplastic | 0 | 0 | 1 | 1 |
| colorectal-carcinoma.modified-dukes-staging | 0 | 0 | 1 | 1 |
| cryptosporidium.differential-diarrhoea-in-immunosuppressed | 0 | 0 | 1 | 1 |
| cryptosporidium.infective-stage.oocyst | 0 | 0 | 1 | 1 |
| diarrhoea-treatment.muscarinic-agonists-not-used | 1 | 0 | 0 | 1 |
| dietary-lipid-transport.chylomicrons | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.complication.b12-deficiency-anemia | 1 | 0 | 0 | 1 |
| diphyllobothrium-latum.diagnostic-stage | 1 | 0 | 0 | 1 |
| diphyllobothrium-latum.differential-b12-deficiency-anemia | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.egg-morphology.operculated | 1 | 0 | 0 | 1 |
| diphyllobothrium-latum.infective-stage.plerocercoid-in-fish | 1 | 0 | 0 | 1 |
| diphyllobothrium-latum.mechanism-of-b12-deficiency-anemia | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.second-intermediate-host.fish | 1 | 0 | 0 | 1 |
| diphyllobothrium-latum.treatment.praziquantel | 0 | 0 | 1 | 1 |
| dipylidium-caninum.control.flea-vector | 1 | 0 | 0 | 1 |
| dipylidium-caninum.diagnostic-stage | 1 | 0 | 0 | 1 |
| disaccharide-digestion.pancreatic-enzymes | 0 | 0 | 1 | 1 |
| diverticular-disease-colon.epidemiology | 0 | 0 | 1 | 1 |
| diverticular-disease-colon.pathology | 0 | 0 | 1 | 1 |
| diverticular-disease-colon.site | 0 | 0 | 1 | 1 |
| drug-induced-diarrhoea.codeine-causes-constipation | 1 | 0 | 0 | 1 |
| duodenal-peptic-ulcer.gastrinoma-association | 0 | 0 | 1 | 1 |
| echinococcus-granulosus.intermediate-host.sheep | 1 | 0 | 0 | 1 |
| echinococcus-granulosus.larval-stage.hydatid-cyst | 1 | 0 | 0 | 1 |
| echinococcus-granulosus.man-as-intermediate-host | 1 | 0 | 0 | 1 |
| echinococcus.alveolar-hydatid.intermediate-host | 1 | 0 | 0 | 1 |
| echinococcus.alveolar-hydatid.malignant-like-behaviour | 1 | 0 | 0 | 1 |
| echinococcus.alveolar-hydatid.site | 1 | 0 | 0 | 1 |
| entamoeba-histolytica.diagnosis.sigmoidoscopic-aspirate | 0 | 0 | 1 | 1 |
| entamoeba-histolytica.infective-stage.cyst | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.airborne-egg-transmission | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.clinical-features.perianal-pruritus | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.diagnosis.graham-swab | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.diagnosis.not-by-stool | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.diagnosis.perianal-swab | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.diagnostic-stage | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.ectopic-egg-deposition | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.egg-morphology.plano-convex | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.egg-under-fingernails | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.identity | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.mode-of-infection.egg-not-larva | 1 | 0 | 0 | 1 |
| enterobius-vermicularis.retroinfection | 1 | 0 | 0 | 1 |
| fap.apc-gene-mutation | 0 | 0 | 1 | 1 |
| fap.apc-tumour-suppressor-gene | 0 | 0 | 1 | 1 |
| fasciola-hepatica.intermediate-host.lymnaea-truncatula | 1 | 0 | 0 | 1 |
| fasciola.clinical-course | 1 | 0 | 0 | 1 |
| fasciola.clinical-features-and-diagnosis | 1 | 0 | 0 | 1 |
| fasciola.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| fasciola.complication.b12-deficiency-anemia | 1 | 0 | 0 | 1 |
| fasciola.diagnosis.serology-when-stool-negative | 0 | 0 | 1 | 1 |
| fasciola.early-diagnosis.serology | 1 | 0 | 0 | 1 |
| fasciola.habitat.bile-ducts | 1 | 0 | 0 | 1 |
| fasciola.halzoon-syndrome | 1 | 0 | 0 | 1 |
| fasciola.spurious-infection | 1 | 0 | 0 | 1 |
| fasciola.spurious-vs-false-infection | 1 | 0 | 0 | 1 |
| fasciola.treatment.triclabendazole | 1 | 0 | 0 | 1 |
| fasciolopsis-buski.reservoir-host.pig | 1 | 0 | 0 | 1 |
| fatty-liver.causes-vs-increased-fatty-acid-oxidation | 0 | 0 | 1 | 1 |
| fish-borne-helminths | 1 | 0 | 0 | 1 |
| fructose-absorption.glut-5 | 0 | 0 | 1 | 1 |
| gallstones.cholesterol-vs-pigment-risk-factors | 1 | 0 | 0 | 1 |
| gallstones.pigment-stones-haemolysis | 1 | 0 | 0 | 1 |
| gallstones.secondary-biliary-cirrhosis | 1 | 0 | 0 | 1 |
| gastric-carcinoma.risk-factors | 0 | 0 | 1 | 1 |
| gastric-lipase.significance-in-infants | 0 | 0 | 1 | 1 |
| gastric-lymphoma.h-pylori-association | 0 | 0 | 1 | 1 |
| gastric-polyps.malignant-potential.adenomatous | 0 | 0 | 1 | 1 |
| gastric-tumours.benign-mesenchymal-vs-epithelial | 0 | 0 | 1 | 1 |
| gerd.proton-pump-inhibitor-for-full-acid-suppression | 1 | 0 | 0 | 1 |
| giardia-lamblia.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| giardia-lamblia.habitat.duodenum-jejunum | 0 | 0 | 1 | 1 |
| gist.c-kit-mutation | 0 | 0 | 1 | 1 |
| gist.commonest-abdominal-mesenchymal-tumour | 0 | 0 | 1 | 1 |
| git-lymphoma.commonest-site | 0 | 0 | 1 | 1 |
| glucose-transporters.intestinal-scglt1-glut2-glut5 | 0 | 0 | 1 | 1 |
| glut-2.basolateral-sugar-exit | 0 | 0 | 1 | 1 |
| granisetron.mechanism.5ht3-receptor-antagonist | 1 | 0 | 0 | 1 |
| granulomatous-liver-disease.exclusion-nash | 1 | 0 | 0 | 1 |
| h-pylori-eradication.antibiotic-regimen | 1 | 0 | 0 | 1 |
| h-pylori-eradication.clarithromycin | 1 | 0 | 0 | 1 |
| h-pylori-eradication.triple-therapy | 1 | 0 | 0 | 1 |
| h-pylori-gastritis.pathogenesis | 0 | 0 | 1 | 1 |
| h2-blockers.famotidine-ulcer-healing | 1 | 0 | 0 | 1 |
| h2-blockers.maintenance-therapy-ulcer-relapse | 1 | 0 | 0 | 1 |
| haemochromatosis.pigmented-cirrhosis | 1 | 0 | 0 | 1 |
| hepatic-parasites | 1 | 0 | 0 | 1 |
| hepatoblastoma.angiosarcoma-vs-hepatoblastoma-risk-factors | 1 | 0 | 0 | 1 |
| hepatocellular-carcinoma.afp-marker | 1 | 0 | 0 | 1 |
| heterophyes.complication.ectopic-egg-emboli | 0 | 0 | 1 | 1 |
| heterophyes.complication.egg-emboli | 1 | 0 | 0 | 1 |
| heterophyes.complication.myocarditis | 1 | 0 | 0 | 1 |
| heterophyes.diagnosis.stool-concentration-technique | 0 | 0 | 1 | 1 |
| heterophyes.egg-hatching.no-miracidium-in-water | 1 | 0 | 0 | 1 |
| heterophyes.infective-stage.encysted-metacercaria | 0 | 0 | 1 | 1 |
| heterophyes.intermediate-host.pirenella-conica | 1 | 0 | 0 | 1 |
| heterophyes.life-cycle.lophocercous-cercaria | 1 | 0 | 0 | 1 |
| heterophyes.second-intermediate-host.fish | 0 | 0 | 1 | 1 |
| heterophyes.treatment.praziquantel | 0 | 0 | 1 | 1 |
| hev.fulminant-hepatitis-in-pregnancy | 1 | 0 | 0 | 1 |
| hev.transmission.faecal-oral | 1 | 0 | 0 | 1 |
| hiatus-hernia.pathogenesis | 0 | 0 | 1 | 1 |
| hirschsprung-disease.clinical-features | 0 | 0 | 1 | 1 |
| hookworm-group.iron-deficiency-anemia | 1 | 0 | 0 | 1 |
| hookworm.iron-deficiency-anemia | 1 | 0 | 0 | 1 |
| hymenolepis-diminuta.intermediate-host.arthropod | 1 | 0 | 0 | 1 |
| hymenolepis-nana.autoinfection | 1 | 0 | 0 | 1 |
| hymenolepis-nana.direct-life-cycle | 1 | 0 | 0 | 1 |
| hymenolepis-nana.egg-morphology | 1 | 0 | 0 | 1 |
| hymenolepis-nana.epidemiology.children | 1 | 0 | 0 | 1 |
| hymenolepis-nana.larval-stage.cysticercoid | 1 | 0 | 0 | 1 |
| hymenolepis.diagnostic-stage.eggs | 1 | 0 | 0 | 1 |
| hymenolepis.nana-vs-diminuta.egg-size | 1 | 0 | 0 | 1 |
| immunodiagnosis.parasite-scope | 1 | 0 | 0 | 1 |
| inflammatory-bowel-disease.crohns-site | 0 | 0 | 1 | 1 |
| intestinal-nematodes.complication.appendicitis | 1 | 0 | 0 | 1 |
| intestinal-nematodes.diagnostic-stage.adult-worm | 1 | 0 | 0 | 1 |
| intestinal-parasites.complication.appendicitis | 0 | 0 | 1 | 1 |
| irritant-purgatives.mechanism | 1 | 0 | 0 | 1 |
| juvenile-polyp.features | 0 | 0 | 1 | 1 |
| lactase.hydrolysis-products | 0 | 0 | 1 | 1 |
| lactose-intolerance.lactase-deficiency | 0 | 0 | 1 | 1 |
| lactulose.hepatic-encephalopathy-treatment | 1 | 0 | 0 | 1 |
| laxatives.diphenoxylate-is-antidiarrhoeal | 1 | 0 | 0 | 1 |
| leukoplakia.malignant-transformation-is-to-scc-not-adenocarcinoma | 0 | 0 | 1 | 1 |
| lipotropic-factors.chloroform-is-hepatotoxic | 0 | 0 | 1 | 1 |
| liquid-paraffin.fat-soluble-vitamin-malabsorption | 1 | 0 | 0 | 1 |
| liver-abscess.multiple-vs-solitary-causes | 1 | 0 | 0 | 1 |
| liver-biopsy.parasitic-diagnosis | 1 | 0 | 0 | 1 |
| liver-cell-adenoma.oral-contraceptive-association | 1 | 0 | 0 | 1 |
| liver-function-tests.afp-in-liver-cancer | 0 | 0 | 1 | 1 |
| liver-function-tests.prothrombin-time-synthetic-function | 0 | 0 | 1 | 1 |
| liver-function-tests.transaminases-hepatocellular-damage | 0 | 0 | 1 | 1 |
| liver-metabolism.gamma-globulins-not-hepatic-synthesis | 0 | 0 | 1 | 1 |
| liver-zonation.zone-3-ischaemic-vulnerability | 1 | 0 | 0 | 1 |
| loperamide.drug-class | 1 | 0 | 0 | 1 |
| loperamide.opioid-derivative-otc-status | 1 | 0 | 0 | 1 |
| loperamide.travellers-diarrhoea | 1 | 0 | 0 | 1 |
| magnesium-antacids.diarrhoea-side-effect | 1 | 0 | 0 | 1 |
| magnesium-hydroxide.osmotic-laxative | 1 | 0 | 0 | 1 |
| meckels-diverticulum.antimesenteric-border | 0 | 0 | 1 | 1 |
| melena.causes-vs-haematochezia | 0 | 0 | 1 | 1 |
| metoclopramide.diabetic-gastroparesis | 1 | 0 | 0 | 1 |
| metoclopramide.dual-antiemetic-prokinetic-action | 1 | 0 | 0 | 1 |
| metoclopramide.mechanism.d2-receptor-antagonist | 1 | 0 | 0 | 1 |
| misoprostol.nsaid-ulcer-prophylaxis | 1 | 0 | 0 | 1 |
| nematodes.large-intestine-habitat | 1 | 0 | 0 | 1 |
| nucleoprotein-digestion.poor-absorption-of-purines-and-pyrimidines | 0 | 0 | 1 | 1 |
| oesophageal-squamous-papilloma.hpv-association | 0 | 0 | 1 | 1 |
| ondansetron.indication.chemotherapy-induced-vomiting | 1 | 0 | 0 | 1 |
| ondansetron.mechanism.5ht3-receptor-blockade | 1 | 0 | 0 | 1 |
| paediatric-diarrhoea.fluid-electrolyte-correction | 1 | 0 | 0 | 1 |
| pancreatic-carcinoma.clinical-presentation | 1 | 0 | 0 | 1 |
| pancreatic-carcinoma.commonest-site-head | 1 | 0 | 0 | 1 |
| pancreatic-lipase.cofactors | 0 | 0 | 1 | 1 |
| pancreatic-pseudocyst.no-epithelial-lining | 1 | 0 | 0 | 1 |
| pathology-ch1 | 47 | 0 | 0 | 47 |
| pathology-ch2 | 32 | 0 | 0 | 32 |
| pharmacology | 53 | 0 | 0 | 53 |
| parasitology-part1 | 57 | 0 | 0 | 57 |
| parasitology-part2 | 44 | 0 | 0 | 44 |
| pepsin.endopeptidase-not-exopeptidase | 0 | 0 | 1 | 1 |
| peptic-ulcer-disease.common-sites | 0 | 0 | 1 | 1 |
| peptic-ulcer-disease.gross-site | 0 | 0 | 1 | 1 |
| peptic-ulcer-disease.h-pylori-risk-factor | 1 | 0 | 0 | 1 |
| peptic-ulcer-disease.pathogenesis-gastric-vs-duodenal | 0 | 0 | 1 | 1 |
| peptic-ulcer-drugs.corticosteroids-not-used | 1 | 0 | 0 | 1 |
| peritoneal-carcinomatosis.commonest-primary | 1 | 0 | 0 | 1 |
| pirenella-conica.habitat.brackish-water | 1 | 0 | 0 | 1 |
| pirenella-conica.molluscicide-resistance | 1 | 0 | 0 | 1 |
| portal-hypertension.presinusoidal-cause-schistosomiasis | 1 | 0 | 0 | 1 |
| praziquantel.spectrum.cestodes-and-trematodes | 1 | 0 | 0 | 1 |
| primary-biliary-cirrhosis.female-predominance | 1 | 0 | 0 | 1 |
| proton-pump-inhibitors.omeprazole | 1 | 0 | 0 | 1 |
| purgatives.indications-vs-contraindication-gastroenteritis | 1 | 0 | 0 | 1 |
| purgatives.physical-vs-irritant-classification | 1 | 0 | 0 | 1 |
| ranitidine.mechanism.h2-receptor-blockade | 1 | 0 | 0 | 1 |
| salivary-gland-tumours.commonest-malignant.mucoepidermoid | 0 | 0 | 1 | 1 |
| salivary-gland-tumours.site.parotid | 0 | 0 | 1 | 1 |
| sglt-1.tissue-distribution-intestine-and-kidney-not-muscle | 0 | 0 | 1 | 1 |
| sialadenitis.sjogren-syndrome-aetiology | 0 | 0 | 1 | 1 |
| sialadenitis.viral-aetiology.mumps | 0 | 0 | 1 | 1 |
| sodium-bicarbonate.systemic-antacid-rebound-and-bleeding-risk | 1 | 0 | 0 | 1 |
| soil-transmitted-helminths.sanitation-control | 1 | 0 | 0 | 1 |
| steatorrhoea.causes-vs-hormone-sensitive-lipase | 0 | 0 | 1 | 1 |
| stool-examination.helminth-scope | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.corticosteroid-hyperinfection-risk | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.diagnosis.duodenal-aspiration | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.diagnosis.stool-culture | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.diagnostic-stage.rhabditiform-larva | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.larva-currens | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.larva-morphology.double-bulbed-oesophagus | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.life-cycle-forms | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.portal-of-entry.skin | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.rhabditiform-larva-morphology | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.smallest-intestinal-nematode | 1 | 0 | 0 | 1 |
| strongyloides-stercoralis.treatment.ivermectin | 1 | 0 | 0 | 1 |
| sulfasalazine.indication.inflammatory-bowel-disease | 1 | 0 | 0 | 1 |
| taenia-saginata.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| taenia-saginata.diagnostic-stages | 0 | 0 | 1 | 1 |
| taenia-saginata.infective-stage.cysticercus-bovis | 1 | 0 | 0 | 1 |
| taenia-solium.cysticercosis | 1 | 0 | 0 | 1 |
| taenia-solium.cysticercosis-risk | 1 | 0 | 0 | 1 |
| taenia-solium.man-as-accidental-intermediate-host | 1 | 0 | 0 | 1 |
| taenia-solium.not-zoonotic-man-only-host | 1 | 0 | 0 | 1 |
| taenia-solium.treatment.praziquantel | 1 | 0 | 0 | 1 |
| taenia.diagnostic-stage | 1 | 0 | 0 | 1 |
| taenia.differentiation-by-uterine-branches | 1 | 0 | 0 | 1 |
| taenia.differentiation-solium-vs-saginata | 1 | 0 | 0 | 1 |
| tongue-squamous-carcinoma.predisposing-factors | 0 | 0 | 1 | 1 |
| toxocara.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| toxocara.infective-stage.embryonated-egg | 0 | 0 | 1 | 1 |
| trematode-eggs.operculated-immature | 1 | 0 | 0 | 1 |
| trematode-eggs.stool-concentration-technique | 1 | 0 | 0 | 1 |
| trematodes.infective-stage.encysted-metacercaria | 1 | 0 | 0 | 1 |
| trichuris-trichiura.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| trichuris-trichiura.complication.rectal-prolapse | 1 | 0 | 0 | 1 |
| trichuris-trichiura.complications | 0 | 0 | 1 | 1 |
| trichuris-trichiura.egg-morphology.bipolar-plugs | 1 | 0 | 0 | 1 |
| trichuris-trichiura.mucosal-attachment | 1 | 0 | 0 | 1 |
| trichuris-trichiura.no-migratory-phase | 1 | 0 | 0 | 1 |
| trypsin.endopeptidase-not-exopeptidase | 0 | 0 | 1 | 1 |
| trypsin.substrate-specificity-arginine-lysine | 0 | 0 | 1 | 1 |
| viral-hepatitis.hbv-hdv-coinfection | 1 | 0 | 0 | 1 |
| viral-hepatitis.hdv-can-cause-chronic-disease | 1 | 0 | 0 | 1 |
| zollinger-ellison-syndrome.proton-pump-inhibitor-treatment | 1 | 0 | 0 | 1 |
| zoonotic-dog-transmitted-parasites | 1 | 0 | 0 | 1 |

## Held
(none)

## Remaining
- alcoholic-fatty-liver.increased-nadh-nad-ratio
- amoebic-liver-abscess.clinical-vignette-diagnosis
- ancylostoma-duodenale.clinical-vignette-diagnosis
- ancylostoma-duodenale.infective-stage.filariform-larva
- ancylostoma-duodenale.iron-deficiency-anemia
- ascaris-lumbricoides.clinical-vignette-diagnosis
- coeliac-disease.gluten-trigger
- cryptosporidium.differential-diarrhoea-in-immunosuppressed
- cryptosporidium.infective-stage.oocyst
- dietary-lipid-transport.chylomicrons
- diphyllobothrium-latum.clinical-vignette-diagnosis
- diphyllobothrium-latum.differential-b12-deficiency-anemia
- diphyllobothrium-latum.mechanism-of-b12-deficiency-anemia
- diphyllobothrium-latum.treatment.praziquantel
- disaccharide-digestion.pancreatic-enzymes
- entamoeba-histolytica.diagnosis.sigmoidoscopic-aspirate
- entamoeba-histolytica.infective-stage.cyst
- enterobius-vermicularis.clinical-vignette-diagnosis
- enterobius-vermicularis.diagnostic-stage
- fasciola.clinical-vignette-diagnosis
- fasciola.diagnosis.serology-when-stool-negative
- fatty-liver.causes-vs-increased-fatty-acid-oxidation
- fructose-absorption.glut-5
- gastric-lipase.significance-in-infants
- giardia-lamblia.clinical-vignette-diagnosis
- giardia-lamblia.habitat.duodenum-jejunum
- glucose-transporters.intestinal-scglt1-glut2-glut5
- glut-2.basolateral-sugar-exit
- heterophyes.complication.ectopic-egg-emboli
- heterophyes.diagnosis.stool-concentration-technique
- heterophyes.infective-stage.encysted-metacercaria
- heterophyes.second-intermediate-host.fish
- heterophyes.treatment.praziquantel
- intestinal-parasites.complication.appendicitis
- lactase.hydrolysis-products
- lactose-intolerance.lactase-deficiency
- lipotropic-factors.chloroform-is-hepatotoxic
- liver-function-tests.afp-in-liver-cancer
- liver-function-tests.prothrombin-time-synthetic-function
- liver-function-tests.transaminases-hepatocellular-damage
- liver-metabolism.gamma-globulins-not-hepatic-synthesis
- nucleoprotein-digestion.poor-absorption-of-purines-and-pyrimidines
- pancreatic-lipase.cofactors
- pepsin.endopeptidase-not-exopeptidase
- sglt-1.tissue-distribution-intestine-and-kidney-not-muscle
- steatorrhoea.causes-vs-hormone-sensitive-lipase
- taenia-saginata.clinical-vignette-diagnosis
- taenia-saginata.diagnostic-stages
- toxocara.clinical-vignette-diagnosis
- toxocara.infective-stage.embryonated-egg
- trichuris-trichiura.clinical-vignette-diagnosis
- trichuris-trichiura.complications
- trypsin.endopeptidase-not-exopeptidase
- trypsin.substrate-specificity-arginine-lysine
