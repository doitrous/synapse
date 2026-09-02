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
| ancylostoma-duodenale.ground-itch | 0 | 0 | 1 | 1 |
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
| ascaris-lumbricoides.complications.obstruction | 0 | 0 | 1 | 1 |
| ascaris-lumbricoides.egg-maturation-in-soil | 0 | 0 | 1 | 1 |
| ascaris-lumbricoides.egg-morphology.single-cell | 0 | 0 | 1 | 1 |
| ascaris-lumbricoides.loefflers-syndrome | 0 | 0 | 1 | 1 |
| ascaris-lumbricoides.pulmonary-migration | 0 | 0 | 1 | 1 |
| autoinfection.parasite-scope | 0 | 0 | 1 | 1 |
| bacillary-dysentery.causative-organism | 0 | 0 | 1 | 1 |
| bacillary-dysentery.inflammation-type | 0 | 0 | 1 | 1 |
| budd-chiari-syndrome.hepatic-vein-thrombosis | 1 | 0 | 0 | 1 |
| capillaria-philippinensis.mode-of-infection | 0 | 0 | 1 | 1 |
| carcinoid-tumour.commonest-site.appendix | 0 | 0 | 1 | 1 |
| castor-oil.classification.irritant-laxative | 1 | 0 | 0 | 1 |
| cestoda.infective-stage.eggs | 0 | 0 | 1 | 1 |
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
| diphyllobothrium-latum.complication.b12-deficiency-anemia | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.diagnostic-stage | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.differential-b12-deficiency-anemia | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.egg-morphology.operculated | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.infective-stage.plerocercoid-in-fish | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.mechanism-of-b12-deficiency-anemia | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.second-intermediate-host.fish | 0 | 0 | 1 | 1 |
| diphyllobothrium-latum.treatment.praziquantel | 0 | 0 | 1 | 1 |
| dipylidium-caninum.control.flea-vector | 0 | 0 | 1 | 1 |
| dipylidium-caninum.diagnostic-stage | 0 | 0 | 1 | 1 |
| disaccharide-digestion.pancreatic-enzymes | 0 | 0 | 1 | 1 |
| diverticular-disease-colon.epidemiology | 0 | 0 | 1 | 1 |
| diverticular-disease-colon.pathology | 0 | 0 | 1 | 1 |
| diverticular-disease-colon.site | 0 | 0 | 1 | 1 |
| drug-induced-diarrhoea.codeine-causes-constipation | 1 | 0 | 0 | 1 |
| duodenal-peptic-ulcer.gastrinoma-association | 0 | 0 | 1 | 1 |
| echinococcus-granulosus.intermediate-host.sheep | 0 | 0 | 1 | 1 |
| echinococcus-granulosus.larval-stage.hydatid-cyst | 0 | 0 | 1 | 1 |
| echinococcus-granulosus.man-as-intermediate-host | 0 | 0 | 1 | 1 |
| echinococcus.alveolar-hydatid.intermediate-host | 0 | 0 | 1 | 1 |
| echinococcus.alveolar-hydatid.malignant-like-behaviour | 0 | 0 | 1 | 1 |
| echinococcus.alveolar-hydatid.site | 0 | 0 | 1 | 1 |
| entamoeba-histolytica.diagnosis.sigmoidoscopic-aspirate | 0 | 0 | 1 | 1 |
| entamoeba-histolytica.infective-stage.cyst | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.airborne-egg-transmission | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.clinical-features.perianal-pruritus | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.diagnosis.graham-swab | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.diagnosis.not-by-stool | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.diagnosis.perianal-swab | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.diagnostic-stage | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.ectopic-egg-deposition | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.egg-morphology.plano-convex | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.egg-under-fingernails | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.identity | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.mode-of-infection.egg-not-larva | 0 | 0 | 1 | 1 |
| enterobius-vermicularis.retroinfection | 0 | 0 | 1 | 1 |
| fap.apc-gene-mutation | 0 | 0 | 1 | 1 |
| fap.apc-tumour-suppressor-gene | 0 | 0 | 1 | 1 |
| fasciola-hepatica.intermediate-host.lymnaea-truncatula | 0 | 0 | 1 | 1 |
| fasciola.clinical-course | 0 | 0 | 1 | 1 |
| fasciola.clinical-features-and-diagnosis | 0 | 0 | 1 | 1 |
| fasciola.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| fasciola.complication.b12-deficiency-anemia | 0 | 0 | 1 | 1 |
| fasciola.diagnosis.serology-when-stool-negative | 0 | 0 | 1 | 1 |
| fasciola.early-diagnosis.serology | 0 | 0 | 1 | 1 |
| fasciola.habitat.bile-ducts | 0 | 0 | 1 | 1 |
| fasciola.halzoon-syndrome | 0 | 0 | 1 | 1 |
| fasciola.spurious-infection | 0 | 0 | 1 | 1 |
| fasciola.spurious-vs-false-infection | 0 | 0 | 1 | 1 |
| fasciola.treatment.triclabendazole | 0 | 0 | 1 | 1 |
| fasciolopsis-buski.reservoir-host.pig | 0 | 0 | 1 | 1 |
| fatty-liver.causes-vs-increased-fatty-acid-oxidation | 0 | 0 | 1 | 1 |
| fish-borne-helminths | 0 | 0 | 1 | 1 |
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
| hepatic-parasites | 0 | 0 | 1 | 1 |
| hepatoblastoma.angiosarcoma-vs-hepatoblastoma-risk-factors | 1 | 0 | 0 | 1 |
| hepatocellular-carcinoma.afp-marker | 1 | 0 | 0 | 1 |
| heterophyes.complication.ectopic-egg-emboli | 0 | 0 | 1 | 1 |
| heterophyes.complication.egg-emboli | 0 | 0 | 1 | 1 |
| heterophyes.complication.myocarditis | 0 | 0 | 1 | 1 |
| heterophyes.diagnosis.stool-concentration-technique | 0 | 0 | 1 | 1 |
| heterophyes.egg-hatching.no-miracidium-in-water | 0 | 0 | 1 | 1 |
| heterophyes.infective-stage.encysted-metacercaria | 0 | 0 | 1 | 1 |
| heterophyes.intermediate-host.pirenella-conica | 0 | 0 | 1 | 1 |
| heterophyes.life-cycle.lophocercous-cercaria | 0 | 0 | 1 | 1 |
| heterophyes.second-intermediate-host.fish | 0 | 0 | 1 | 1 |
| heterophyes.treatment.praziquantel | 0 | 0 | 1 | 1 |
| hev.fulminant-hepatitis-in-pregnancy | 1 | 0 | 0 | 1 |
| hev.transmission.faecal-oral | 1 | 0 | 0 | 1 |
| hiatus-hernia.pathogenesis | 0 | 0 | 1 | 1 |
| hirschsprung-disease.clinical-features | 0 | 0 | 1 | 1 |
| hookworm-group.iron-deficiency-anemia | 0 | 0 | 1 | 1 |
| hookworm.iron-deficiency-anemia | 0 | 0 | 1 | 1 |
| hymenolepis-diminuta.intermediate-host.arthropod | 0 | 0 | 1 | 1 |
| hymenolepis-nana.autoinfection | 0 | 0 | 1 | 1 |
| hymenolepis-nana.direct-life-cycle | 0 | 0 | 1 | 1 |
| hymenolepis-nana.egg-morphology | 0 | 0 | 1 | 1 |
| hymenolepis-nana.epidemiology.children | 0 | 0 | 1 | 1 |
| hymenolepis-nana.larval-stage.cysticercoid | 0 | 0 | 1 | 1 |
| hymenolepis.diagnostic-stage.eggs | 0 | 0 | 1 | 1 |
| hymenolepis.nana-vs-diminuta.egg-size | 0 | 0 | 1 | 1 |
| immunodiagnosis.parasite-scope | 0 | 0 | 1 | 1 |
| inflammatory-bowel-disease.crohns-site | 0 | 0 | 1 | 1 |
| intestinal-nematodes.complication.appendicitis | 0 | 0 | 1 | 1 |
| intestinal-nematodes.diagnostic-stage.adult-worm | 0 | 0 | 1 | 1 |
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
| liver-biopsy.parasitic-diagnosis | 0 | 0 | 1 | 1 |
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
| nematodes.large-intestine-habitat | 0 | 0 | 1 | 1 |
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
| pepsin.endopeptidase-not-exopeptidase | 0 | 0 | 1 | 1 |
| peptic-ulcer-disease.common-sites | 0 | 0 | 1 | 1 |
| peptic-ulcer-disease.gross-site | 0 | 0 | 1 | 1 |
| peptic-ulcer-disease.h-pylori-risk-factor | 1 | 0 | 0 | 1 |
| peptic-ulcer-disease.pathogenesis-gastric-vs-duodenal | 0 | 0 | 1 | 1 |
| peptic-ulcer-drugs.corticosteroids-not-used | 1 | 0 | 0 | 1 |
| peritoneal-carcinomatosis.commonest-primary | 1 | 0 | 0 | 1 |
| pirenella-conica.habitat.brackish-water | 0 | 0 | 1 | 1 |
| pirenella-conica.molluscicide-resistance | 0 | 0 | 1 | 1 |
| portal-hypertension.presinusoidal-cause-schistosomiasis | 1 | 0 | 0 | 1 |
| praziquantel.spectrum.cestodes-and-trematodes | 0 | 0 | 1 | 1 |
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
| soil-transmitted-helminths.sanitation-control | 0 | 0 | 1 | 1 |
| steatorrhoea.causes-vs-hormone-sensitive-lipase | 0 | 0 | 1 | 1 |
| stool-examination.helminth-scope | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.corticosteroid-hyperinfection-risk | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.diagnosis.duodenal-aspiration | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.diagnosis.stool-culture | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.diagnostic-stage.rhabditiform-larva | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.larva-currens | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.larva-morphology.double-bulbed-oesophagus | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.life-cycle-forms | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.portal-of-entry.skin | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.rhabditiform-larva-morphology | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.smallest-intestinal-nematode | 0 | 0 | 1 | 1 |
| strongyloides-stercoralis.treatment.ivermectin | 0 | 0 | 1 | 1 |
| sulfasalazine.indication.inflammatory-bowel-disease | 1 | 0 | 0 | 1 |
| taenia-saginata.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| taenia-saginata.diagnostic-stages | 0 | 0 | 1 | 1 |
| taenia-saginata.infective-stage.cysticercus-bovis | 0 | 0 | 1 | 1 |
| taenia-solium.cysticercosis | 0 | 0 | 1 | 1 |
| taenia-solium.cysticercosis-risk | 0 | 0 | 1 | 1 |
| taenia-solium.man-as-accidental-intermediate-host | 0 | 0 | 1 | 1 |
| taenia-solium.not-zoonotic-man-only-host | 0 | 0 | 1 | 1 |
| taenia-solium.treatment.praziquantel | 0 | 0 | 1 | 1 |
| taenia.diagnostic-stage | 0 | 0 | 1 | 1 |
| taenia.differentiation-by-uterine-branches | 0 | 0 | 1 | 1 |
| taenia.differentiation-solium-vs-saginata | 0 | 0 | 1 | 1 |
| tongue-squamous-carcinoma.predisposing-factors | 0 | 0 | 1 | 1 |
| toxocara.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| toxocara.infective-stage.embryonated-egg | 0 | 0 | 1 | 1 |
| trematode-eggs.operculated-immature | 0 | 0 | 1 | 1 |
| trematode-eggs.stool-concentration-technique | 0 | 0 | 1 | 1 |
| trematodes.infective-stage.encysted-metacercaria | 0 | 0 | 1 | 1 |
| trichuris-trichiura.clinical-vignette-diagnosis | 0 | 0 | 1 | 1 |
| trichuris-trichiura.complication.rectal-prolapse | 0 | 0 | 1 | 1 |
| trichuris-trichiura.complications | 0 | 0 | 1 | 1 |
| trichuris-trichiura.egg-morphology.bipolar-plugs | 0 | 0 | 1 | 1 |
| trichuris-trichiura.mucosal-attachment | 0 | 0 | 1 | 1 |
| trichuris-trichiura.no-migratory-phase | 0 | 0 | 1 | 1 |
| trypsin.endopeptidase-not-exopeptidase | 0 | 0 | 1 | 1 |
| trypsin.substrate-specificity-arginine-lysine | 0 | 0 | 1 | 1 |
| viral-hepatitis.hbv-hdv-coinfection | 1 | 0 | 0 | 1 |
| viral-hepatitis.hdv-can-cause-chronic-disease | 1 | 0 | 0 | 1 |
| zollinger-ellison-syndrome.proton-pump-inhibitor-treatment | 1 | 0 | 0 | 1 |
| zoonotic-dog-transmitted-parasites | 0 | 0 | 1 | 1 |

## Held
(none)

## Remaining
- achalasia.definition
- acute-appendicitis.predisposing-factors
- acute-gastric-ulceration.causes
- acute-gastritis.causes
- acute-gastritis.commonest-cause
- acute-gastritis.pathogenesis
- acute-intestinal-obstruction.functional-vs-mechanical
- acute-oesophagitis.infective-causes
- alcoholic-fatty-liver.increased-nadh-nad-ratio
- amoebic-dysentery.flask-shaped-ulcers
- amoebic-liver-abscess.clinical-vignette-diagnosis
- ancylostoma-duodenale.clinical-vignette-diagnosis
- ancylostoma-duodenale.ground-itch
- ancylostoma-duodenale.infective-stage.filariform-larva
- ancylostoma-duodenale.iron-deficiency-anemia
- ascaris-lumbricoides.clinical-vignette-diagnosis
- ascaris-lumbricoides.complications.obstruction
- ascaris-lumbricoides.egg-maturation-in-soil
- ascaris-lumbricoides.egg-morphology.single-cell
- ascaris-lumbricoides.loefflers-syndrome
- ascaris-lumbricoides.pulmonary-migration
- autoinfection.parasite-scope
- bacillary-dysentery.causative-organism
- bacillary-dysentery.inflammation-type
- capillaria-philippinensis.mode-of-infection
- carcinoid-tumour.commonest-site.appendix
- cestoda.infective-stage.eggs
- chronic-intestinal-obstruction.causes
- chronic-intestinal-obstruction.pathology
- coeliac-disease.gluten-trigger
- colonic-adenoma.malignant-potential
- colonic-polyps.non-neoplastic-vs-neoplastic
- colorectal-carcinoma.modified-dukes-staging
- cryptosporidium.differential-diarrhoea-in-immunosuppressed
- cryptosporidium.infective-stage.oocyst
- dietary-lipid-transport.chylomicrons
- diphyllobothrium-latum.clinical-vignette-diagnosis
- diphyllobothrium-latum.complication.b12-deficiency-anemia
- diphyllobothrium-latum.diagnostic-stage
- diphyllobothrium-latum.differential-b12-deficiency-anemia
- diphyllobothrium-latum.egg-morphology.operculated
- diphyllobothrium-latum.infective-stage.plerocercoid-in-fish
- diphyllobothrium-latum.mechanism-of-b12-deficiency-anemia
- diphyllobothrium-latum.second-intermediate-host.fish
- diphyllobothrium-latum.treatment.praziquantel
- dipylidium-caninum.control.flea-vector
- dipylidium-caninum.diagnostic-stage
- disaccharide-digestion.pancreatic-enzymes
- diverticular-disease-colon.epidemiology
- diverticular-disease-colon.pathology
- diverticular-disease-colon.site
- duodenal-peptic-ulcer.gastrinoma-association
- echinococcus-granulosus.intermediate-host.sheep
- echinococcus-granulosus.larval-stage.hydatid-cyst
- echinococcus-granulosus.man-as-intermediate-host
- echinococcus.alveolar-hydatid.intermediate-host
- echinococcus.alveolar-hydatid.malignant-like-behaviour
- echinococcus.alveolar-hydatid.site
- entamoeba-histolytica.diagnosis.sigmoidoscopic-aspirate
- entamoeba-histolytica.infective-stage.cyst
- enterobius-vermicularis.airborne-egg-transmission
- enterobius-vermicularis.clinical-features.perianal-pruritus
- enterobius-vermicularis.clinical-vignette-diagnosis
- enterobius-vermicularis.diagnosis.graham-swab
- enterobius-vermicularis.diagnosis.not-by-stool
- enterobius-vermicularis.diagnosis.perianal-swab
- enterobius-vermicularis.diagnostic-stage
- enterobius-vermicularis.ectopic-egg-deposition
- enterobius-vermicularis.egg-morphology.plano-convex
- enterobius-vermicularis.egg-under-fingernails
- enterobius-vermicularis.identity
- enterobius-vermicularis.mode-of-infection.egg-not-larva
- enterobius-vermicularis.retroinfection
- fap.apc-gene-mutation
- fap.apc-tumour-suppressor-gene
- fasciola-hepatica.intermediate-host.lymnaea-truncatula
- fasciola.clinical-course
- fasciola.clinical-features-and-diagnosis
- fasciola.clinical-vignette-diagnosis
- fasciola.complication.b12-deficiency-anemia
- fasciola.diagnosis.serology-when-stool-negative
- fasciola.early-diagnosis.serology
- fasciola.habitat.bile-ducts
- fasciola.halzoon-syndrome
- fasciola.spurious-infection
- fasciola.spurious-vs-false-infection
- fasciola.treatment.triclabendazole
- fasciolopsis-buski.reservoir-host.pig
- fatty-liver.causes-vs-increased-fatty-acid-oxidation
- fish-borne-helminths
- fructose-absorption.glut-5
- gastric-carcinoma.risk-factors
- gastric-lipase.significance-in-infants
- gastric-lymphoma.h-pylori-association
- gastric-polyps.malignant-potential.adenomatous
- gastric-tumours.benign-mesenchymal-vs-epithelial
- giardia-lamblia.clinical-vignette-diagnosis
- giardia-lamblia.habitat.duodenum-jejunum
- gist.c-kit-mutation
- gist.commonest-abdominal-mesenchymal-tumour
- git-lymphoma.commonest-site
- glucose-transporters.intestinal-scglt1-glut2-glut5
- glut-2.basolateral-sugar-exit
- h-pylori-gastritis.pathogenesis
- hepatic-parasites
- heterophyes.complication.ectopic-egg-emboli
- heterophyes.complication.egg-emboli
- heterophyes.complication.myocarditis
- heterophyes.diagnosis.stool-concentration-technique
- heterophyes.egg-hatching.no-miracidium-in-water
- heterophyes.infective-stage.encysted-metacercaria
- heterophyes.intermediate-host.pirenella-conica
- heterophyes.life-cycle.lophocercous-cercaria
- heterophyes.second-intermediate-host.fish
- heterophyes.treatment.praziquantel
- hiatus-hernia.pathogenesis
- hirschsprung-disease.clinical-features
- hookworm-group.iron-deficiency-anemia
- hookworm.iron-deficiency-anemia
- hymenolepis-diminuta.intermediate-host.arthropod
- hymenolepis-nana.autoinfection
- hymenolepis-nana.direct-life-cycle
- hymenolepis-nana.egg-morphology
- hymenolepis-nana.epidemiology.children
- hymenolepis-nana.larval-stage.cysticercoid
- hymenolepis.diagnostic-stage.eggs
- hymenolepis.nana-vs-diminuta.egg-size
- immunodiagnosis.parasite-scope
- inflammatory-bowel-disease.crohns-site
- intestinal-nematodes.complication.appendicitis
- intestinal-nematodes.diagnostic-stage.adult-worm
- intestinal-parasites.complication.appendicitis
- juvenile-polyp.features
- lactase.hydrolysis-products
- lactose-intolerance.lactase-deficiency
- leukoplakia.malignant-transformation-is-to-scc-not-adenocarcinoma
- lipotropic-factors.chloroform-is-hepatotoxic
- liver-biopsy.parasitic-diagnosis
- liver-function-tests.afp-in-liver-cancer
- liver-function-tests.prothrombin-time-synthetic-function
- liver-function-tests.transaminases-hepatocellular-damage
- liver-metabolism.gamma-globulins-not-hepatic-synthesis
- meckels-diverticulum.antimesenteric-border
- melena.causes-vs-haematochezia
- nematodes.large-intestine-habitat
- nucleoprotein-digestion.poor-absorption-of-purines-and-pyrimidines
- oesophageal-squamous-papilloma.hpv-association
- pancreatic-lipase.cofactors
- pepsin.endopeptidase-not-exopeptidase
- peptic-ulcer-disease.common-sites
- peptic-ulcer-disease.gross-site
- peptic-ulcer-disease.pathogenesis-gastric-vs-duodenal
- pirenella-conica.habitat.brackish-water
- pirenella-conica.molluscicide-resistance
- praziquantel.spectrum.cestodes-and-trematodes
- salivary-gland-tumours.commonest-malignant.mucoepidermoid
- salivary-gland-tumours.site.parotid
- sglt-1.tissue-distribution-intestine-and-kidney-not-muscle
- sialadenitis.sjogren-syndrome-aetiology
- sialadenitis.viral-aetiology.mumps
- soil-transmitted-helminths.sanitation-control
- steatorrhoea.causes-vs-hormone-sensitive-lipase
- stool-examination.helminth-scope
- strongyloides-stercoralis.corticosteroid-hyperinfection-risk
- strongyloides-stercoralis.diagnosis.duodenal-aspiration
- strongyloides-stercoralis.diagnosis.stool-culture
- strongyloides-stercoralis.diagnostic-stage.rhabditiform-larva
- strongyloides-stercoralis.larva-currens
- strongyloides-stercoralis.larva-morphology.double-bulbed-oesophagus
- strongyloides-stercoralis.life-cycle-forms
- strongyloides-stercoralis.portal-of-entry.skin
- strongyloides-stercoralis.rhabditiform-larva-morphology
- strongyloides-stercoralis.smallest-intestinal-nematode
- strongyloides-stercoralis.treatment.ivermectin
- taenia-saginata.clinical-vignette-diagnosis
- taenia-saginata.diagnostic-stages
- taenia-saginata.infective-stage.cysticercus-bovis
- taenia-solium.cysticercosis
- taenia-solium.cysticercosis-risk
- taenia-solium.man-as-accidental-intermediate-host
- taenia-solium.not-zoonotic-man-only-host
- taenia-solium.treatment.praziquantel
- taenia.diagnostic-stage
- taenia.differentiation-by-uterine-branches
- taenia.differentiation-solium-vs-saginata
- tongue-squamous-carcinoma.predisposing-factors
- toxocara.clinical-vignette-diagnosis
- toxocara.infective-stage.embryonated-egg
- trematode-eggs.operculated-immature
- trematode-eggs.stool-concentration-technique
- trematodes.infective-stage.encysted-metacercaria
- trichuris-trichiura.clinical-vignette-diagnosis
- trichuris-trichiura.complication.rectal-prolapse
- trichuris-trichiura.complications
- trichuris-trichiura.egg-morphology.bipolar-plugs
- trichuris-trichiura.mucosal-attachment
- trichuris-trichiura.no-migratory-phase
- trypsin.endopeptidase-not-exopeptidase
- trypsin.substrate-specificity-arginine-lysine
- zoonotic-dog-transmitted-parasites
