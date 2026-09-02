<!--
  SCU-FBS103 · Foundation 2 — S2 minting pass, second author lane
  (scu-fbs103-author2). Seven TPL-CONCEPT articles giving the 26 concepts in
  the sibling concept/SCU-FBS103-s2-author2-mint-concepts.md their covering
  section, grouped by topic cluster rather than one article per concept —
  each article's `related_concepts` names every concept it teaches, and each
  concept's own `article_ids` points back at its article. Same
  many-concepts-per-article pattern as Kasr's 103-BMS-mcq-lipid.md and this
  lane's own SCU-FBS103-s2-mint-articles.md / SCU-FBS103-s2-author1-batch2.

  All seven use TPL-CONCEPT (Definition / Mechanism / Key determinants /
  Clinical significance), matching this lane's own precedent: each covers a
  cluster of discrete, related exam facts rather than one single structure
  or process end-to-end.

  No claim, citation or media record is minted — this lane is scoped to
  concept, article and question files. `claim_ids`/`span_ids`/`media` are
  `[clear]` and the evidence chain is owed, named in the hand-off report,
  same convention as the sibling concept file. Arabic title is blank on
  every record with a field_note, per LD-15 — no Arabic reviewer is
  available to this lane.
-->

# Item

## id
ART-SCU-FBS103-BIO-DNA-REPLICATION-NUCLEOTIDE

## title
DNA replication machinery and nucleotide structure

## arabic_title


## aliases
DNA polymerase III activities
Nucleotide composition
Chargaff's rule
Vitamin K's bacterial source
Eukaryotic gene structure

## subject
fnd

## topic
Biochemistry

## subtopic
Molecular Biology: DNA Replication and Nucleic Acid Structure

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## module
SCU-FBS103

## module_subject
SCU-FBS103 > Biochemistry > Molecular Biology > DNA Replication and Nucleic Acid Structure

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
7

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
DNA replication and gene expression facts in this cluster split cleanly into a nucleotide's own building blocks (base, sugar, phosphate; Chargaff's A=T/G=C pairing rule) and the machinery that copies and reads DNA (DNA polymerase III's dual polymerase/exonuclease activity; eukaryotic multi-origin replication; intron-interrupted eukaryotic genes). A final, unrelated but commonly co-tested fact — vitamin K's partial bacterial source in the gut — is anchored here as a standalone biochemistry fact rather than forced into the DNA-replication narrative.

## sections
### Definition
A nucleotide is built from three parts: a nitrogenous base, a pentose sugar, and a phosphate group (a base plus sugar alone, with no phosphate, is instead a nucleoside). Chargaff's rule follows directly from the double helix's specific base pairing: %A = %T and %G = %C, so any one base's percentage fixes all four. DNA polymerase III holoenzyme, the main bacterial replicative enzyme, combines 5' to 3' polymerase activity with a proofreading 3' to 5' exonuclease activity in one molecule. Eukaryotic chromosomes, being far longer than a bacterial chromosome, replicate from many origins simultaneously rather than one. Eukaryotic genes are also split into exons interrupted by introns, requiring splicing before a continuous open reading frame exists on the mature mRNA — a feature absent from prokaryotic genes. Separately, vitamin K is unusual among fat-soluble vitamins in that a clinically significant portion is produced by normal intestinal bacterial flora, alongside the dietary (green leafy vegetable) source.

### Mechanism
Polymerase III's proofreading exonuclease works in real time: as each nucleotide is added 5' to 3', a misincorporated base is immediately excised 3' to 5' before the next one is added, which is the main source of bacterial replication's high fidelity. Eukaryotic replication solves the length problem differently — many origins fire at once along each chromosome, each creating its own replication bubble, and the bubbles extend and fuse to finish the whole chromosome within S phase. Chargaff's arithmetic is mechanical: fix one base's percentage (adenine or thymine), and the other pair (guanine and cytosine, equal to each other) automatically takes up the remainder split evenly. Vitamin K's gut-flora source becomes clinically relevant exactly when that source is disrupted — a newborn's uncolonised gut, or an adult's flora suppressed by prolonged antibiotics, both losing this second supply route and risking deficiency.

### Key determinants
For the nucleotide-composition question, the deciding fact is simply whether all three parts (base, sugar, phosphate) are named — any answer missing one part is a nucleoside, not a nucleotide. For Chargaff's rule, the deciding step is remembering which base pairs with which (A-T, G-C) and that the guanine-alone percentage is HALF of the combined G+C remainder, not the whole remainder. For the DNA-polymerase-III question, the deciding fact is that BOTH activities (5' to 3' polymerase AND 3' to 5' exonuclease) belong to the same enzyme — options naming only one, or naming the wrong direction for either, are the standard distractors. For the eukaryotic-versus-prokaryotic questions, three common distractors (coupled transcription-translation, polycistronic mRNA, circular supercoiled DNA) all actually describe the PROKARYOTIC pattern, so the deciding move is checking which organism each option truly belongs to before matching it to "eukaryotic-specific."

### Clinical significance
DNA polymerase III's proofreading exonuclease is the molecular basis for why bacterial DNA replication has such low error rates, relevant to understanding how antibiotics that target replication machinery (such as fluoroquinolones acting on topoisomerases) can selectively disrupt bacterial over human replication. Vitamin K deficiency's clinical picture — from loss of the gut-flora source in a newborn, or from antibiotic suppression of that flora in an adult — is a prolonged coagulation time from reduced hepatic synthesis of factors II, VII, IX, X and proteins C and S, the same downstream pathway that warfarin (a competitive vitamin K inhibitor) exploits therapeutically.

## published_summary


## published_sections


## hold_these
A nucleotide has three parts (base, sugar, phosphate); a nucleoside has only two (base, sugar).
Chargaff's rule: %A = %T and %G = %C in double-stranded DNA; guanine alone is HALF of the combined G+C remainder.
DNA polymerase III holoenzyme has both 5' to 3' polymerase activity and a proofreading 3' to 5' exonuclease activity.
Eukaryotes replicate from many origins simultaneously; eukaryotic genes have introns interrupting the open reading frame; both features are absent from the prokaryotic pattern.
A significant portion of the body's vitamin K comes from normal gut bacterial flora, not diet alone.

## lose_the_mark
Naming a nucleotide's parts as base+sugar only (that is a nucleoside).
Reporting the combined G+C percentage instead of guanine's own individual share.
Assigning only one of polymerase III's two activities, or assigning the wrong direction to either.
Assigning a prokaryotic-pattern feature (coupled transcription-translation, polycistronic mRNA, circular DNA) to eukaryotes by mistake.
Assuming vitamin K's only source is dietary, missing the gut-flora contribution and its clinical relevance in newborns/antibiotic use.

## callout_evidence


## related_concepts
CON-FND-97729CC3ACABF8 | CON-FND-4B34F00B9AC6EE | CON-FND-FC1C2D276EFCB1 | CON-FND-7E45E94A441771 | CON-FND-40504130316AEB | CON-FND-23AB2D963ED92A

## related_articles


## question_ids


## resource_ids


## article_source_ids


## claim_ids


## span_ids


## universities
scu

## years
SCU_Y1

## university_notes


## field_notes
arabicTitle: No Arabic reviewer is available to this lane; left blank rather than invented (LD-15).
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
media: Written [clear]. No rights-cleared asset exists for any of this material.

## annotations
### definition_of · CON-FND-97729CC3ACABF8
Quote: DNA polymerase III holoenzyme, the main bacterial replicative enzyme, combines 5' to 3' polymerase activity with a proofreading 3' to 5' exonuclease activity in one molecule
Block: body

### definition_of · CON-FND-4B34F00B9AC6EE
Quote: A nucleotide is built from three parts: a nitrogenous base, a pentose sugar, and a phosphate group
Block: body

### definition_of · CON-FND-FC1C2D276EFCB1
Quote: Eukaryotic chromosomes, being far longer than a bacterial chromosome, replicate from many origins simultaneously rather than one
Block: body

### definition_of · CON-FND-7E45E94A441771
Quote: Eukaryotic genes are also split into exons interrupted by introns, requiring splicing before a continuous open reading frame exists on the mature mRNA
Block: body

### definition_of · CON-FND-40504130316AEB
Quote: Chargaff's rule follows directly from the double helix's specific base pairing: %A = %T and %G = %C
Block: body

### definition_of · CON-FND-23AB2D963ED92A
Quote: vitamin K is unusual among fat-soluble vitamins in that a clinically significant portion is produced by normal intestinal bacterial flora
Block: body

---

# Item

## id
ART-SCU-FBS103-DEV-WEEK1-2-CLEAVAGE-BILAMINAR

## title
First and second week: cleavage to the bilaminar disc

## arabic_title


## aliases
Cleavage and blastomeres
Blastocyst formation
Bilaminar disc
Spermatogenesis yield

## subject
dev

## topic
Embryology

## subtopic
General Embryology: First and Second Week

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## module
SCU-FBS103

## module_subject
SCU-FBS103 > Embryology > General Embryology > First and Second Week

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
7

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
The first two weeks of development are best learned as a strict timeline of named milestones rather than a loose list of terms: fertilization, cleavage into blastomeres, morula formation, arrival in the uterine cavity around day 4, blastocyst formation, and finally the embryoblast's own split into epiblast and hypoblast during the second week. A related but separate fact anchored here is spermatogenesis's fixed 1-to-4 yield ratio, which sets up the arithmetic behind "how many sperm from how many primary spermatocytes" questions.

## sections
### Definition
Cleavage is the series of rapid mitotic divisions the zygote undergoes travelling along the uterine tube, producing progressively smaller blastomeres within the same zona pellucida. By around the third division the blastomeres compact into the solid morula, which reaches the uterine cavity by about the fourth day. Fluid then accumulates within the morula to form the blastocyst — a fluid-filled blastocele separating an outer trophoblast from an inner cell mass (embryoblast) — the event that defines the first week overall. During the second week, the embryoblast itself splits into two layers, the epiblast and the hypoblast, forming the bilaminar embryonic disc, while the trophoblast splits into cytotrophoblast and syncytiotrophoblast.

### Mechanism
Spermatogenesis's meiotic divisions are symmetric at every step, unlike oogenesis: a primary spermatocyte completes the first meiotic division into two secondary spermatocytes, and each secondary spermatocyte completes the second meiotic division into two spermatids, so every original primary spermatocyte yields exactly four spermatids (and, after spermiogenesis, four mature sperm) — no polar bodies are discarded along the way. This fixed 1-to-4 ratio is what makes "how many sperm from N primary spermatocytes" a simple multiplication (N x 4). The bilaminar disc's own formation sets up the platform gastrulation will act on the following week, converting two germ layers into three.

### Key determinants
Staging by week is the deciding move across this whole cluster: blastomeres and the morula's uterine arrival belong to week 1 (days 1-4), blastocyst formation closes week 1, and the epiblast/hypoblast split is specifically a week-2 event, distinct from the trilaminar (gastrulation) event of week 3. For the spermatogenesis arithmetic, the deciding fact is the ratio itself (1 primary spermatocyte : 4 sperm), not any partial count from only the first meiotic division (which would wrongly give a ratio of 1:2).

### Clinical significance
Because implantation depends on the blastocyst (not the morula or an earlier stage) reaching and invading the endometrium, disruptions to the days-4-through-7 timeline (ectopic implantation, failed transport) are clinically consequential windows tied directly to this same first-week sequence. The fixed spermatogenesis yield ratio underlies clinical semen-analysis reasoning about expected sperm counts relative to spermatogonial/spermatocyte pool size in fertility assessment.

## published_summary


## published_sections


## hold_these
The sequence is: fertilization -> cleavage (blastomeres) -> morula (reaches uterine cavity ~day 4) -> blastocyst formation (defines week 1) -> epiblast/hypoblast split (defines week 2).
Blastomeres are the immediate product of cleavage; trophoblast and epiblast/hypoblast differentiate later, not immediately from cleavage.
Spermatogenesis's fixed ratio is 1 primary spermatocyte : 4 mature sperm, because both meiotic divisions are symmetric with no discarded polar bodies.

## lose_the_mark
Assigning gastrulation, primitive streak formation, or trilaminar disc formation to week 1 or week 2 instead of week 3.
Naming trophoblast or epiblast as the immediate product of cleavage instead of blastomeres.
Using a 1:2 ratio (only the first meiotic division) instead of the correct 1:4 ratio for spermatogenesis yield.

## callout_evidence


## related_concepts
CON-DEV-8495EC8CE23F95 | CON-DEV-C5B75FE3FD0D47 | CON-DEV-CD3A7E5062F1BB | CON-DEV-517FE336846466 | CON-DEV-B8D22B244F1E15

## related_articles
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM: the following week's gastrulation, coelom and mesoderm-differentiation events

## question_ids


## resource_ids


## article_source_ids


## claim_ids


## span_ids


## universities
scu

## years
SCU_Y1

## university_notes


## field_notes
arabicTitle: No Arabic reviewer is available to this lane; left blank rather than invented (LD-15).
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
media: Written [clear]. No rights-cleared asset exists for any of this material.
relatedConcepts: CON-DEV-B8D22B244F1E15 is a pending reuse (this lane's own SCU-FBS102-s2-author5-mint-concepts.md), not one of this article's own 26 mints, but its spermatogenesis-yield fact is taught in this article's Mechanism section, so it is included here for coverage even though its `article_ids` field points to its own SCU-FBS102 article.

## annotations
### definition_of · CON-DEV-8495EC8CE23F95
Quote: the blastomeres compact into the solid morula, which reaches the uterine cavity by about the fourth day
Block: body

### definition_of · CON-DEV-C5B75FE3FD0D47
Quote: Fluid then accumulates within the morula to form the blastocyst — a fluid-filled blastocele separating an outer trophoblast from an inner cell mass (embryoblast)
Block: body

### definition_of · CON-DEV-CD3A7E5062F1BB
Quote: producing progressively smaller blastomeres within the same zona pellucida
Block: body

### definition_of · CON-DEV-517FE336846466
Quote: the embryoblast itself splits into two layers, the epiblast and the hypoblast, forming the bilaminar embryonic disc
Block: body

---

# Item

## id
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## title
Third and fourth week: gastrulation, coeloms and somites

## arabic_title


## aliases
Trilaminar disc and germ layers
Intraembryonic coelom
Cloacal membrane
Somite staging

## subject
dev

## topic
Embryology

## subtopic
General Embryology: Third and Fourth Week

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## module
SCU-FBS103

## module_subject
SCU-FBS103 > Embryology > General Embryology > Third and Fourth Week

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
8

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
The third and fourth weeks are dominated by two structural themes: gastrulation's mesoderm splitting into paraxial, intermediate and lateral plate columns (each with its own fate — somites, urogenital ridge, and the coelom/gut-wall pair), and the folding events that convert flat cavities into named adult-pattern spaces (the intraembryonic coelom into pericardial/pleural/peritoneal cavities). The cloacal membrane, formed during the third week, and the fourth week's somite count and neuropore closure timings round out this cluster's own timeline facts.

## sections
### Definition
Gastrulation, the defining third-week event, converts the bilaminar disc into a trilaminar one and organises mesoderm, from medial to lateral, into paraxial, intermediate and lateral plate columns. Paraxial mesoderm forms somites (about 28-30 pairs by the end of the fourth week); intermediate mesoderm forms the urogenital ridge (source of the urinary and genital systems); lateral plate mesoderm splits into somatic and splanchnic layers, enclosing the intraembryonic coelom between them. Endoderm plus splanchnic mesoderm together form the primitive gut tube (endoderm lining, splanchnic mesoderm wall). The cloacal membrane, a bilaminar (ectoderm+endoderm, no mesoderm) area at the disc's caudal end, mirrors the oropharyngeal membrane at the cranial end.

### Mechanism
The horseshoe-shaped intraembryonic coelom has a cranial-most part lying entirely cranial to the oropharyngeal membrane, in the cardiogenic area; as head folding proceeds, this part is carried ventrally with the heart and becomes the pericardial cavity. Its caudal ends communicate with the extraembryonic coelom at the disc margin before folding closes that connection off. Neural tube closure proceeds zipper-like from the cervical region (starting ~day 22) outward in both directions, closing the cranial neuropore by day 25 and the caudal neuropore about two days later. Somite formation proceeds craniocaudally at roughly three pairs per day from day 20 onward, reaching 28-30 pairs by the end of the fourth week — a regular-enough pace that the running count is used to stage the embryo.

### Key determinants
For coelom-fate questions, the deciding step is tracking WHICH part of the horseshoe-shaped coelom the question names (cranial-to-oropharyngeal-membrane -> pericardial cavity) rather than confusing the coelomic space with the nearby but different-germ-layer structures it sits near (stomodeum, oral cavity, cranial foregut). For the cloacal-membrane question, the deciding fact is its bilaminar (no mesoderm) composition, mirroring the oropharyngeal membrane at the opposite end of the disc. For the mesoderm-fate questions, the deciding sort is medial-to-lateral column identity: paraxial -> somites/axial structures, intermediate -> urogenital ridge, lateral plate (splanchnic half) -> gut wall.

### Clinical significance
Neural tube closure timing underlies the clinical logic of neural tube defects: failure of cranial neuropore closure (by day 25) is associated with anencephaly, and failure of caudal neuropore closure (a few days later) with spina bifida — both reasons folate supplementation is recommended before and during early pregnancy. The intraembryonic coelom's subdivision into pericardial, pleural and peritoneal cavities is the developmental basis for each cavity's own adult anatomy and for congenital anomalies (such as diaphragmatic hernia) arising when the partitions between these coelomic subdivisions fail to form correctly.

## published_summary


## published_sections


## hold_these
Mesoderm sorts medial-to-lateral into paraxial (somites), intermediate (urogenital ridge), and lateral plate (splits into somatic + splanchnic, enclosing the intraembryonic coelom).
The intraembryonic coelom's cranial-most part (cranial to the oropharyngeal membrane) becomes the pericardial cavity.
The cloacal membrane is bilaminar (ectoderm+endoderm, no mesoderm), mirroring the oropharyngeal membrane at the disc's opposite end.
By the end of the fourth week: ~28-30 somite pairs have formed, the cranial neuropore has closed (~day 25), and the caudal neuropore closes ~2 days later.

## lose_the_mark
Assigning the urogenital ridge to paraxial or lateral plate mesoderm instead of intermediate mesoderm.
Confusing the pericardial-cavity-forming coelomic space with the nearby stomodeum, oral cavity, or cranial foregut (different germ layers, different structures).
Reversing which neuropore (cranial vs caudal) closes first.

## callout_evidence


## related_concepts
CON-DEV-D3847B540C0E93 | CON-DEV-2EB4FBC84DF414 | CON-DEV-42DB8406323467 | CON-DEV-35C976C7594D91 | CON-DEV-F103401B1603A1 | CON-DEV-7678BBFF8E1462 | CON-DEV-1AAC12ECDA6AE2 | CON-DEV-65C2AEF8C5DB47

## related_articles
ART-SCU-FBS103-DEV-WEEK1-2-CLEAVAGE-BILAMINAR: the preceding week's cleavage and bilaminar-disc events
ART-SCU-FBS103-DEV-FETAL-CIRCULATION-REMNANTS: postnatal remnants of the fetal circulation, downstream of this same embryonic period

## question_ids


## resource_ids


## article_source_ids


## claim_ids


## span_ids


## universities
scu

## years
SCU_Y1

## university_notes


## field_notes
arabicTitle: No Arabic reviewer is available to this lane; left blank rather than invented (LD-15).
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
media: Written [clear]. No rights-cleared asset exists for any of this material.
relatedConcepts: CON-DEV-1AAC12ECDA6AE2 (cloacal membrane, pending in Assiut's AUN-PMS-102-concepts.md) and CON-DEV-65C2AEF8C5DB47 (intraembryonic coelom split, live kau) are pending/live reuses, not two of this article's own 26 mints, but both facts are taught in this article's Definition/Mechanism sections, so both are included here for coverage even though neither concept's own `article_ids` points at this file.

## annotations
### definition_of · CON-DEV-D3847B540C0E93
Quote: Paraxial mesoderm forms somites (about 28-30 pairs by the end of the fourth week)
Block: body

### definition_of · CON-DEV-2EB4FBC84DF414
Quote: closing the cranial neuropore by day 25 and the caudal neuropore about two days later
Block: body

### definition_of · CON-DEV-42DB8406323467
Quote: Endoderm plus splanchnic mesoderm together form the primitive gut tube (endoderm lining, splanchnic mesoderm wall)
Block: body

### definition_of · CON-DEV-35C976C7594D91
Quote: Its caudal ends communicate with the extraembryonic coelom at the disc margin before folding closes that connection off
Block: body

### definition_of · CON-DEV-F103401B1603A1
Quote: intermediate mesoderm forms the urogenital ridge (source of the urinary and genital systems)
Block: body

### definition_of · CON-DEV-7678BBFF8E1462
Quote: this part is carried ventrally with the heart and becomes the pericardial cavity
Block: body

---

# Item

## id
ART-SCU-FBS103-DEV-FETAL-CIRCULATION-REMNANTS

## title
Fetal circulation: the umbilical vein's postnatal remnant

## arabic_title


## aliases
Ligamentum teres hepatis
Umbilical vein fate
Falciform ligament

## subject
dev

## topic
Embryology

## subtopic
Fetal Circulation: Postnatal Remnants

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## module
SCU-FBS103

## module_subject
SCU-FBS103 > Embryology > General Embryology > Fetal Circulation

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
5

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
Four fetal vessels/ducts each have their own separate, commonly confused postnatal remnant. This article anchors the umbilical vein's own fate — the ligamentum teres hepatis — against the other three, since exam distractors typically list all four remnants as options for one vessel's fate.

## sections
### Definition
In the fetus, the single umbilical vein carries oxygenated, nutrient-rich blood from the placenta to the fetus, running within the falciform ligament to reach the liver. After birth, once placental flow stops, the umbilical vein closes off and fibroses into a solid fibrous cord — the ligamentum teres hepatis (round ligament of the liver) — which remains visible within the free edge of the falciform ligament in the adult.

### Mechanism
The umbilical vein's fibrosis happens because, once the cord is clamped and placental flow ends, the vessel carries no more blood and its wall contracts down into solid fibrous tissue, the same general process that converts the paired umbilical arteries into the medial umbilical ligaments and the ductus venosus into the ligamentum venosum. Each of these four fetal structures fibroses independently into its own separate adult remnant, so naming the correct vessel-to-remnant pairing (not just recognising that "some vessel becomes some ligament") is what these exam questions actually test.

### Key determinants
The deciding fact set is the four vessel-to-remnant pairings themselves: umbilical vein -> ligamentum teres hepatis; paired umbilical arteries -> medial umbilical ligaments; urachus (allantoic duct) -> median umbilical ligament; ductus venosus -> ligamentum venosum. The ligamentum teres hepatis and ligamentum venosum sit anatomically close together (both near the liver, and the ductus venosus's ligamentum venosum runs from the liver's own ligamentum teres onward to the IVC), which is exactly why the two are the most commonly confused pair on this list.

### Clinical significance
The ligamentum teres hepatis remains a recognisable structure in adult abdominal imaging and surgery, marking the free edge of the falciform ligament, and in rare cases it can be re-cannulated as a route for accessing the portal circulation in cases of portal hypertension (a paraumbilical vein pathway).

## published_summary


## published_sections


## hold_these
The umbilical vein becomes the ligamentum teres hepatis, within the free edge of the falciform ligament.
The four fetal-to-adult vessel pairings are separate and independent: umbilical vein/ligamentum teres hepatis, umbilical arteries/medial umbilical ligaments, urachus/median umbilical ligament, ductus venosus/ligamentum venosum.

## lose_the_mark
Confusing the ligamentum teres hepatis (from the umbilical vein) with the ligamentum venosum (from the ductus venosus) because the two sit close together anatomically.
Assigning the umbilical ARTERIES' remnant (medial umbilical ligaments) or the urachus's remnant (median umbilical ligament) to the umbilical VEIN by mistake.

## callout_evidence


## related_concepts
CON-DEV-CC1CF93A090BEE

## related_articles
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM: the coelomic and mesodermal events of the same embryonic period

## question_ids


## resource_ids


## article_source_ids


## claim_ids


## span_ids


## universities
scu

## years
SCU_Y1

## university_notes


## field_notes
arabicTitle: No Arabic reviewer is available to this lane; left blank rather than invented (LD-15).
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
media: Written [clear]. No rights-cleared asset exists for any of this material.

## annotations
### definition_of · CON-DEV-CC1CF93A090BEE
Quote: the umbilical vein closes off and fibroses into a solid fibrous cord — the ligamentum teres hepatis (round ligament of the liver)
Block: body

---

# Item

## id
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## title
Neuroglia morphology and the peripheral nerve connective tissue sheaths

## arabic_title


## aliases
Astrocyte types
Peripheral nerve sheaths
Epineurium

## subject
neuro

## topic
Histology

## subtopic
Nervous Tissue: Neuroglia and Peripheral Nerve Connective Tissue

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## module
SCU-FBS103

## module_subject
SCU-FBS103 > Histology > Nervous Tissue > Neuroglia and Peripheral Nerve

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
This cluster pairs two nervous-tissue histology facts that are often tested together: astrocyte morphology (fibrous versus protoplasmic, sorted by process shape and white-versus-grey-matter location) and the three-layer connective tissue organisation of a peripheral nerve (endoneurium, perineurium, epineurium), of which only the outermost, epineurium, is tested here directly.

## sections
### Definition
Fibrous astrocytes, predominant in white matter, have long, thin, sparsely branched processes running between axon bundles. Protoplasmic astrocytes, predominant in grey matter, have abundant cytoplasm and short, thick, extensively branched processes suited to their many synaptic contacts. Both express the intermediate filament GFAP, just in different relative abundance. Separately, a peripheral nerve trunk's connective tissue is organised in three concentric layers: endoneurium (around each fibre), perineurium (around each fascicle), and epineurium — the outermost, thickest, dense irregular connective tissue layer binding together the whole trunk.

### Mechanism
Process shape follows function: protoplasmic astrocytes' short, thick, bushy processes fit the dense population of neuronal cell bodies, dendrites and synapses in grey matter, while fibrous astrocytes' long, thin processes are suited to running between the parallel axon bundles of white matter and reaching blood vessels and the pial surface over longer distances. The three peripheral-nerve sheath layers nest inside one another concentrically — endoneurium innermost, then perineurium around each fascicle, then epineurium outermost around the whole trunk — mirroring skeletal muscle's own endomysium/perimysium/epimysium nesting pattern.

### Key determinants
For the astrocyte questions, the deciding sort is white matter + long/thin/sparse (fibrous) versus grey matter + short/thick/branched (protoplasmic) — GFAP presence is not the distinguishing feature, since both types express it. For the epineurium question, the deciding fact is scale: epineurium is the OUTERMOST, WHOLE-TRUNK layer, one level up from perineurium (fascicle-level) and two levels up from endoneurium (fibre-level).

### Clinical significance
Reactive astrogliosis (proliferation of astrocytes, predominantly the fibrous type in white-matter injury) is a hallmark CNS response to injury, forming a glial scar. The epineurium's structural robustness is why it is the layer surgeons specifically repair (epineural suture) when reconstructing a severed peripheral nerve, since it holds the fascicles in alignment during regeneration.

## published_summary


## published_sections


## hold_these
Fibrous astrocytes: white matter, long/thin/unbranched processes. Protoplasmic astrocytes: grey matter, abundant cytoplasm, short/thick/branched processes.
Epineurium is the outermost layer surrounding the whole nerve trunk; perineurium wraps each fascicle; endoneurium wraps each individual fibre.

## lose_the_mark
Reversing the white-matter/grey-matter locations of the two astrocyte types.
Confusing epineurium with perineurium (fascicle-level, one layer inward).

## callout_evidence


## related_concepts
CON-NEU-1B7B4BA87B29B2 | CON-NEU-81402D876C77D5 | CON-FND-14D80DE53DE835 | CON-NEU-93CD087BDE3F7B

## related_articles


## question_ids


## resource_ids


## article_source_ids


## claim_ids


## span_ids


## universities
scu

## years
SCU_Y1

## university_notes


## field_notes
arabicTitle: No Arabic reviewer is available to this lane; left blank rather than invented (LD-15).
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
media: Written [clear]. No rights-cleared asset exists for any of this material.
relatedConcepts: CON-FND-14D80DE53DE835 (Kasr, neuron-shape classification) and CON-NEU-93CD087BDE3F7B (Alexandria, neuroglia cell functions) are pending reuses, not two of this article's own 26 mints, but both are cited as `library_ids` on this cluster's reuse questions (fbs103b-q31 through q37), so both are listed here for coverage even though neither concept's own `article_ids` points at this file.

## annotations
### definition_of · CON-NEU-1B7B4BA87B29B2
Quote: Fibrous astrocytes, predominant in white matter, have long, thin, sparsely branched processes running between axon bundles
Block: body

### definition_of · CON-NEU-81402D876C77D5
Quote: epineurium — the outermost, thickest, dense irregular connective tissue layer binding together the whole trunk
Block: body

---

# Item

## id
ART-SCU-FBS103-PAR-LIFE-CYCLES-TERMINOLOGY

## title
Parasite life cycles and basic terminology

## arabic_title


## aliases
Direct versus indirect life cycle
Infection versus infestation
Malacology
Heterophyes heterophyes

## subject
inf

## topic
Parasitology

## subtopic
General Parasitology: Life Cycle Terminology and Heterophyes heterophyes

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## module
SCU-FBS103

## module_subject
SCU-FBS103 > Parasitology > General Parasitology > Life Cycle Terminology

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
This cluster anchors the basic vocabulary parasitology builds on — direct versus indirect life cycles, infection versus infestation, and malacology as a named sub-discipline — alongside two Heterophyes heterophyes-specific facts (egg colour, fish-borne transmission) that recur across this bank's own trematode questions.

## sections
### Definition
A direct (monoxenous) life cycle completes entirely within a single host species, with no intermediate host required; an indirect (heteroxenous) cycle needs one or more intermediate hosts. "Infection" describes a parasite living inside the host's tissues or organs; "infestation" describes one living on the external surface or in a superficial cavity. Malacology is the scientific study of molluscs, including the freshwater/brackish snails that serve as intermediate hosts for many trematodes. Heterophyes heterophyes, the smallest human trematode, produces small, golden-brown, operculated eggs and is transmitted by eating undercooked fish carrying its encysted metacercarial stage.

### Mechanism
The direct/indirect distinction and the infection/infestation distinction are independent axes: a parasite's cycle type (direct or indirect) does not determine whether it causes an infection or infestation, and vice versa — each question is asking about a different classifying dimension. Heterophyes heterophyes's own life cycle is indirect (requiring the intermediate snail and fish hosts before reaching a human definitive host), and its transmission (eating undercooked fish) and diagnosis (golden-brown eggs on stool microscopy) are the two facts most commonly tested about it.

### Key determinants
For the direct/indirect question, the deciding fact is host count (one versus more than one). For the infection/infestation question, the deciding fact is site (internal versus external/superficial), not severity or life-cycle length. For malacology, the deciding fact is the organism group studied (molluscs/snails), distinguishing it from entomology (insects), mycology (fungi) and helminthology (worms). For the two Heterophyes-specific facts, egg colour and transmission route are tested as two separate, unrelated details about the same organism.

### Clinical significance
Malacological control of intermediate-host snail populations is a public-health strategy for reducing transmission of medically important trematodes such as Schistosoma and Heterophyes heterophyes in endemic regions. Recognising Heterophyes heterophyes's small, golden-brown eggs on stool microscopy is the practical diagnostic step that follows directly from its own defining morphological fact.

## published_summary


## published_sections


## hold_these
A direct life cycle needs only one host; an indirect cycle needs an intermediate host.
Infection = internal site of living; infestation = external/superficial site of living.
Malacology is the study of molluscs and snails, including trematode intermediate hosts.
Heterophyes heterophyes eggs are small and golden-brown; transmission is by eating undercooked fish carrying encysted metacercariae.

## lose_the_mark
Basing the infection/infestation distinction on disease severity instead of site of living.
Confusing malacology with entomology, mycology or helminthology.
Assigning skin-penetration or vector-bite transmission to Heterophyes heterophyes instead of its actual fish-ingestion route.

## callout_evidence


## related_concepts
CON-GIT-D76A567284E40B | CON-GIT-CA7E5195BF5F65 | CON-GIT-E77362A9C0FFFC | CON-GIT-9D0CDFBC5FAF24 | CON-GIT-E20B95815074E4 | CON-GIT-2FCF45AE17574F

## related_articles


## question_ids


## resource_ids


## article_source_ids


## claim_ids


## span_ids


## universities
scu

## years
SCU_Y1

## university_notes


## field_notes
arabicTitle: No Arabic reviewer is available to this lane; left blank rather than invented (LD-15).
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
media: Written [clear]. No rights-cleared asset exists for any of this material.
relatedConcepts: CON-GIT-E20B95815074E4 (Helwan, fish-borne transmission) and CON-GIT-2FCF45AE17574F (Helwan, Hymenolepis nana direct cycle) are pending reuses, not two of this article's own 26 mints, but both are cited as `library_ids` on this cluster's reuse questions (fbs103b-q38, fbs103b-q39), so both are listed here for coverage even though neither concept's own `article_ids` points at this file.

## annotations
### definition_of · CON-GIT-D76A567284E40B
Quote: A direct (monoxenous) life cycle completes entirely within a single host species, with no intermediate host required
Block: body

### definition_of · CON-GIT-CA7E5195BF5F65
Quote: Heterophyes heterophyes, the smallest human trematode, produces small, golden-brown, operculated eggs
Block: body

### definition_of · CON-GIT-E77362A9C0FFFC
Quote: Malacology is the scientific study of molluscs, including the freshwater/brackish snails that serve as intermediate hosts for many trematodes
Block: body

### definition_of · CON-GIT-9D0CDFBC5FAF24
Quote: "Infection" describes a parasite living inside the host's tissues or organs; "infestation" describes one living on the external surface or in a superficial cavity
Block: body

---

# Item

## id
ART-SCU-FBS103-PHARM-RECEPTORS-ADR-CLASSIFICATION

## title
Cholinergic receptors and the adverse-drug-reaction classification system

## arabic_title


## aliases
Nicotinic receptors
Adverse drug reaction types
Type B and Type E reactions

## subject
pharm

## topic
Pharmacology

## subtopic
General Pharmacology: Receptors and Adverse Drug Reactions

## microtopic


## nanotopic


## primary_node_id


## secondary_node_ids


## module
SCU-FBS103

## module_subject
SCU-FBS103 > Pharmacology > General Pharmacology > Receptors and Adverse Drug Reactions

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Year 1 foundation

## reading_time
7

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
This cluster pairs the autonomic ganglion's nicotinic receptor synapse with the standard letter-coded adverse-drug-reaction classification system (Types A through E), of which Type B (bizarre/idiosyncratic) and Type E (end of dose/withdrawal) are anchored here directly, alongside the full/partial agonist ligand-classification scale that this lane's sibling reuse questions also draw on.

## sections
### Definition
In both autonomic divisions, the preganglionic fibre releases acetylcholine onto the postganglionic neuron via nicotinic (Nn) receptors at the ganglion itself, distinct from the muscarinic or adrenergic receptors found later at the postganglionic target organ. Adverse drug reactions are classified by letter: Type A (augmented) is a predictable, dose-related exaggeration of known pharmacology; Type B (bizarre) is an unpredictable, non-dose-related idiosyncratic or immunological reaction; Type C (continuous) develops with chronic cumulative use; Type D (delayed) appears after a time lag (teratogenicity, carcinogenicity); Type E (end of dose) is a withdrawal effect on abrupt discontinuation after physiological adaptation.

### Mechanism
Ganglionic nicotinic-receptor blockade affects both sympathetic and parasympathetic transmission simultaneously, because the same receptor type mediates the synapse in both divisions' ganglia — this is the pharmacological basis of ganglionic blocking drugs' broad autonomic effects. The Type A-through-E system sorts adverse reactions by TWO independent axes: predictability (A, C, D, E all follow logically from known pharmacology or physiology, while B alone is unpredictable) and timing (A and C occur during ongoing use, D after a delay, and E specifically on stopping the drug).

### Key determinants
For the nicotinic-receptor question, the deciding fact is synaptic LOCATION — ganglion (nicotinic) versus postganglionic target organ (muscarinic/adrenergic) — not which autonomic division is involved, since nicotinic receptors mediate both. For the Type B question, the deciding fact is unpredictability tied to individual susceptibility (immunological/genetic), not dose. For the Type E question, the deciding fact is TIMING — an effect appearing specifically on stopping the drug, distinguishing it from Type A's during-use exaggeration.

### Clinical significance
Ganglionic nicotinic receptors are the pharmacological target of older ganglion-blocking antihypertensives (now largely historical, due to their broad, non-selective autonomic side-effect profile affecting both divisions at once). Recognising Type B reactions clinically matters because, unlike Type A reactions, they cannot be anticipated from dose alone and instead require a history of prior exposure or known susceptibility (such as penicillin allergy) to predict; recognising Type E reactions matters for safe drug discontinuation planning (tapering opioids, benzodiazepines or corticosteroids rather than stopping abruptly).

## published_summary


## published_sections


## hold_these
Nicotinic (Nn) receptors mediate the ganglionic synapse in BOTH sympathetic and parasympathetic divisions.
Adverse drug reactions: Type A (predictable, dose-related), Type B (unpredictable, idiosyncratic/immunological), Type C (continuous, chronic use), Type D (delayed), Type E (end of dose/withdrawal).
A full agonist gives the maximum response (high efficacy); a partial agonist gives a fixed submaximal response regardless of dose, and behaves as an antagonist alongside a full agonist.

## lose_the_mark
Assigning nicotinic receptors only to the sympathetic (or only the parasympathetic) ganglion, missing that both divisions share this same receptor type at the ganglion.
Confusing Type B (unpredictable/idiosyncratic) with Type A (predictable/dose-related) or Type C (chronic/cumulative).
Confusing Type E (withdrawal, on stopping the drug) with Type A (an effect occurring during ongoing use).

## callout_evidence


## related_concepts
CON-FND-AA5799FC98B2D4 | CON-FND-6F98091A586CF3 | CON-FND-05FF1011EFFE2A | CON-FND-4388E0D8A75FD4

## related_articles


## question_ids


## resource_ids


## article_source_ids


## claim_ids


## span_ids


## universities
scu

## years
SCU_Y1

## university_notes


## field_notes
arabicTitle: No Arabic reviewer is available to this lane; left blank rather than invented (LD-15).
primaryNodeId: Not resolved from this worktree; module_subject carries the department's own placement instead.
media: Written [clear]. No rights-cleared asset exists for any of this material.
relatedConcepts: CON-FND-4388E0D8A75FD4 (Kasr 108-INT, full/partial agonist classification) is a pending reuse, not one of this article's own 26 mints, but it is cited as `library_ids` on this cluster's reuse questions (fbs103b-q40, fbs103b-q41), so it is listed here for coverage even though its own `article_ids` does not point at this file.

## annotations
### definition_of · CON-FND-AA5799FC98B2D4
Quote: the preganglionic fibre releases acetylcholine onto the postganglionic neuron via nicotinic (Nn) receptors at the ganglion itself
Block: body

### definition_of · CON-FND-6F98091A586CF3
Quote: Type B (bizarre) is an unpredictable, non-dose-related idiosyncratic or immunological reaction
Block: body

### definition_of · CON-FND-05FF1011EFFE2A
Quote: Type E (end of dose) is a withdrawal effect on abrupt discontinuation after physiological adaptation
Block: body
