<!--
  MU-MED102 · pending-live sparse CONCEPT overlay for 13 of the 45 questions
  in the sibling file question/MU-MED102-f2end43-mcq.md (kept apart because
  detectKind reads only the first record in a file, per the ASU-IBM
  precedent). One row is Q25/Q26 sharing a single concept id (same
  plasma-half-life fact tested twice, definition then calculation).

  Three more items (Q7 capsule-antiphagocytic, Q16 plasmid, Q18 coagulase)
  found an equally on-point live concept via find-existing.mjs, but no local
  markdown article/concept file could be found to back it (a live-only
  record — the gate's article-coverage check has nothing to cite), so those
  three were minted fresh in concept/MU-MED102-concepts.md instead of
  overlaid here; each records the rejected live id in its own
  rejected_merge_candidate_ids for the record.

  Every ## id below targets a concept that already exists (live or pending)
  in another lane's own record — found via find-existing.mjs before minting
  any twin, per LANE-CARD §2 rule 4 and this dispatch's own standing rule 6.
  No ## module_subject column: per rule 6, an overlay row never carries it —
  the column is a true replace-on-write field (src/data/bulkImport.ts's own
  moduleSubjectPathsOf comment: "absent means untouched, not emptied"), so
  omitting it here leaves each target's existing curriculum placement intact
  rather than risking an accidental wipe or duplicate path. ## universities,
  ## learner_years and ## modules are true ID-list columns and take the
  additive `+mu` / `+MU_Y1` / `+MU-MED102` form.

  Every fact below is tested by "End Foundation 2 Batch 43 - Answers -
  Telegram 9659.pdf" (sourceId mu_56d88740af5ca3011894 per
  manifest/y1-sources.json). Key convention: grey highlight on the correct
  option, confirmed by rendering pages 1-13 (see coverage/MU-MED102-triage.md
  and this dispatch's own render pass) — pagetext.mjs keys does not detect it.

  Simulate together with each target source's own article + concept file
  (article coverage is what the gate checks against), e.g.:
    npm run medical:simulate -- \
      docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md \
      docs/Ain-Shams-Source-Imports/article/ASU-INF-microbiology-articles.md \
      docs/Assiut-Source-Imports/concept/AUN-INI-105-ch2-concepts.md \
      docs/Assiut-Source-Imports/article/AUN-INI-105-ch2-article.md \
      docs/Assiut-Source-Imports/concept/AUN-INI-105-ch6-concepts.md \
      docs/Assiut-Source-Imports/article/AUN-INI-105-ch6-article.md \
      docs/Assiut-Source-Imports/concept/AUN-MPT-104-concepts.md \
      docs/Assiut-Source-Imports/article/AUN-MPT-104-articles.md \
      docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
      docs/import-ready/article/108-INT-pharmacology.md \
      docs/Kasr-Source-Imports/concept/208-INT-concepts.md \
      docs/Kasr-Source-Imports/article/208-INT-articles.md \
      docs/import-ready/concept/108-INT-concepts-pathology.md \
      docs/import-ready/article/108-INT-pathology.md \
      docs/Menoufia-Source-Imports/pending-live/MU-MED102-overlay-concepts.md \
      docs/Menoufia-Source-Imports/concept/MU-MED102-concepts.md \
      docs/Menoufia-Source-Imports/article/MU-MED102-articles.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED102-resources.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED102-claims.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED102-citations.md \
      docs/Menoufia-Source-Imports/question/MU-MED102-f2end43-mcq.md \
      --emit /tmp/sim-MU-MED102.json

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-INF-BC446C9816D9CE

## label
Ordinary pili mediate adhesion, while sex pili mediate conjugative gene transfer

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q8, "Select one important virulence factor help in bacterial adherence" (answer: Pili), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p3.

---

# Item

## id
CON-INF-42D77BF4AB3ADD

## label
Transformation requires recipient competence and DNA homology to take up soluble DNA

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q13, "Name gene transfer Process in which free bacterial DNA transferred from bacteria to another through the media?" (answer: Transformation), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p4.

---

# Item

## id
CON-INF-13DB3587F46FE0

## label
A bacteriophage is a virus that lives as a parasite on (infects) bacteria

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q14, "Which of the following is true regarding bacteriophages?" (answer: They are viruses), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p5.

---

# Item

## id
CON-INF-25DA8EFD9E1DA5

## label
Bacteria reproduce by simple binary fission, made possible by carrying a single (usually circular) chromosome rather than the diploid, spindle-based apparatus that eukaryotic mitosis or meiosis requires

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q15, "Which of the following is the reproduction method for bacteria?" (answer: Binary fission), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p5.

---

# Item

## id
CON-FND-CF40F32A8A74A0

## label
Bioavailability is the fraction of an oral dose that reaches the systemic circulation, and first-pass metabolism is what removes the rest

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q21, "The percentage of the drug that reaches systemic circulation unchanged after its absorption form any route is known as:" (answer: Bioavailability), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p6. This item generalises the concept's own oral-dose framing to "any route"; the underlying fraction-reaching-systemic-circulation-unchanged definition is unchanged.

---

# Item

## id
CON-FND-CBA2A73AE9A6D8

## label
Apparent volume of distribution

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q22, a calculation item (IV dose 300 mg, plasma concentration 5 mg/L, Vd = dose / concentration = 60 L), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p7.

---

# Item

## id
CON-FND-955AD7B6FE6F03

## label
Plasma half-life is the time taken for the plasma concentration to fall by half, and it is fixed only in first-order elimination

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested twice — Q25, "Time taken for the drug to reach 50% of its original value is known as:" (answer: Plasma half-life), grey-highlight key on p8; and Q26, a calculation item (300 mg/L falling to 75 mg/L across two half-lives of 2h each = 4 hours), grey-highlight key on p9. Both End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf.

---

# Item

## id
CON-FND-A1FC8CB691E6C5

## label
Acquired tolerance is pharmacokinetic when the body clears the drug faster and pharmacodynamic when the receptor stops responding

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q28, "Which of the following best describes tolerance?" (answer: Decreased response to the same dose of the drug on prolonged use), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p10.

---

# Item

## id
CON-FND-F966C99135DCA0

## label
Pralidoxime reactivates phosphorylated acetylcholinesterase in organophosphorus poisoning, before enzyme aging occurs

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q35, "Which of the following is a cholinesterase activator?" (answer: Pralidoxime), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p12.

---

# Item

## id
CON-FND-8DA30AD870AC1E

## label
Necrosis is recognised by karyolysis, pyknosis and karyorrhexis with a pinker cytoplasm

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q38, "Pyknosis is characterized by:" (answer: Shrunken nuclei), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p13.

---

# Item

## id
CON-FND-7B4DA968F5BE76

## label
Solid-organ infarcts undergo coagulative necrosis

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q39, a vignette item (65-year-old woman, pancreatic infarct due to acute ischemia; answer: Coagulative necrosis), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p13.

---

# Item

## id
CON-FND-BA4E3D79017392

## label
Pathological localized atrophy has five named causes -- hormonal, vascular, pressure, neuropathic and disuse -- distinct from generalized atrophy's causes (malnutrition, cachexia, thyrotoxicosis)

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q49, "Which of the following growth disturbances is most likely to occur in patients suffering from cachexia?" (answer: Atrophy), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p17.

---

# Item

## id
CON-INF-2541991F249506

## label
A parasite's life cycle can involve several host roles: the definitive host harbours the adult/sexual stage; the intermediate host is where all larval development takes place; the paratenic (transfer) host carries the organism in an arrested state of development, without further development, transporting it onward; and a reservoir host is a non-human animal harbouring the same parasite, serving as an additional source of human infection

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q51, "It is an animal that harbors the mature stage of the parasite and acts as a source of infection" (answer: Reservoir host), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p17. Found via find-existing.mjs in pending docs/Assiut-Source-Imports/concept/AUN-INI-105-ch8-concepts.md; this exam's own key names "reservoir host" for an animal harbouring the mature stage and serving as an infection source, which the reused concept's own definition covers.

---

# Item

## id
CON-INF-BE9AD99C94CD24

## label
Most trematodes are hermaphroditic; Schistosoma is the classic exception with separate sexes, the male and female worms pairing in copula for the duration of adult life

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q52, "Most trematodes are hermaphrodites except....." (answer: Schistosomes), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p17. Found via find-existing.mjs in pending docs/Assiut-Source-Imports/concept/AUN-INI-105-ch9-concepts.md, an exact-grain match (that concept's own original_wording already records this same "hermaphrodite except" phrasing).

---

# Item

## id
CON-INF-F82C6307A7B7E3

## label
Facultative parasite

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q63, "Organisms live independent on the host, but may occasionally be parasitic under certain conditions, they are:" (answer: Facultative parasite), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p21. Found via find-existing.mjs in pending docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md, already the standing cross-lane reuse target for this exact fact per AUN-INI-105-ch8's own header note.

---

# Item

## id
CON-INF-93B7D64C0E2A15

## label
Zoonotic parasitic diseases originate from animals

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as Q64, "The infection which is transmitted from infected animals to humans is called:" (answer: Zoonoses), End Foundation 2 Batch 43 - Answers - Telegram 9659.pdf, grey-highlight key on p22. Found via find-existing.mjs in pending docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md.

---
# Item

## id
CON-INF-83707B09F53803

## label
Bacterial flagella are motility organelles built from the protein flagellin

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q02, "Bacterial flagellum is..." (answer: Made up of protein), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/bold/underline key on p1.

---

# Item

## id
CON-INF-A22576F1C4B8AF

## label
Candida albicans is recognized in infected tissue by the co-occurrence of yeast cells and pseudohyphae on microscopic examination

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q03, "Candida albicans is diagnosed by examination of infected tissues for..." (answer: Yeasts and pseudohyphae), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/bold/underline key on p1.

---

# Item

## id
CON-INF-C74F8450F57CB5

## label
Catalase distinguishes staphylococci from streptococci

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q04, pyoderma vignette with beta-haemolysis and a catalase-negative Gram-positive coccus isolate (answer: Streptococcus pyogenes), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/bold/underline key on p2.

---

# Item

## id
CON-INF-42D77BF4AB3ADD

## label
Transformation requires recipient competence and DNA homology to take up soluble DNA

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q05, "Bacteria can take up fragments of naked DNA by..." (answer: Transformation), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/bold/underline key on p2.

---

# Item

## id
CON-INF-7E3B831D71A008

## label
Teichoic acid and lipoteichoic acid are Gram-positive wall components absent from Gram-negative bacteria

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested twice in this compilation -- micro-eom-q06, "ONLY found in the cell walls of Gram positive bacteria" (answer: Teichoic acid), and micro-eom-q15, "Cell wall of Gram-positive bacteria is unique being have" (answer: Teichoic acids) -- same fact, two stems. Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/bold/underline key on p2 and p7.

---

# Item

## id
CON-INF-1AD4F150B33953

## label
Clostridium difficile is the classic cause of antibiotic-associated diarrhea and its more severe form, pseudomembranous enterocolitis, typically following broad-spectrum antibiotic disruption of normal gut flora

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested twice in this compilation -- micro-eom-q12, generic bowel-flora-disruption vignette (answer: Clostridium difficile), and micro-eom-q18, 65-year-old woman on ampicillin for a UTI who develops fever and severe diarrhea (answer: Clostridium difficile) -- same fact, two clinical vignettes. Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/underline key on p6 and p10.

---

# Item

## id
CON-INF-D60EAAF763C476

## label
Septic shock from Gram-negative infection is caused by lipid A of LPS

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q14, "Which ONE of the following is directly responsible for causing septic shock?" (answer: Bacterial endotoxins), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/bold/underline key on p7.

---

# Item

## id
CON-INF-D31966C6CEF85C

## label
Facultative anaerobes grow with or without oxygen; microaerophiles grow best with only traces of it

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q16, "Which ONE of the following organisms can NOT exist in presence of oxygen" (answer: Obligate anaerobe), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/underline key on p8.

---

# Item

## id
CON-INF-271E9930B4B73A

## label
Mycoplasma permanently lacks a cell wall by genotype, unlike L-forms which lose it under an inducing agent

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q23, "walking pneumonia caused by Mycoplasma... BEST describes the characteristics of the etiologic organism" (answer: Absence of a cell wall), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/underline key on p13.

---

# Item

## id
CON-INF-AC873FE98E856F

## label
Urethritis with intracellular gram-negative diplococci on Gram stain indicates Neisseria gonorrhoeae infection

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q25, purulent urethral discharge with Gram-negative diplococci on Gram stain (answer: Neisseria gonorrhoeae/gonorrhea, source spelling "gonorrhea"), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/underline key on p15.

---

# Item

## id
CON-INF-C87DF729E2ADDF

## label
An exotoxin is a secreted polypeptide/protein, unlike structural endotoxin

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as micro-eom-q26, "Botulinum toxin is an example of which ONE of the following" (answer: Exotoxin), Microbiology Past Exams - Answers - Telegram 9662.pdf, red-text/underline key on p15.

---

# Item

## id
CON-INF-66A57CFB78A21F

## label
Pseudoparasites, coprozoic organisms and spurious parasites are non-infecting artefacts of stool or specimen examination, not true infections: a pseudoparasite is any object or organism mistaken for a parasite; a coprozoic organism is a free-living species passing through the alimentary tract undigested; and a spurious finding is another species' parasite stage, ingested (e.g. in undercooked meat), passed unchanged in stool without ever having infected the examined host

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as para-past-q03, "Foreign organism that passes through the human intestine without causing any disease, is a/an...... parasite" (answer: coprozoic), Parasitology Past Exams - MCQ Answers - Telegram 9673.pdf, highlight-fill-red key on p1. Found via find-existing.mjs, exact-grain match (coprozoic organism definition already recorded on this pending Assiut concept).

---

# Item

## id
CON-INF-0B4BAFFD525FDF

## label
Host-microbe relationships are classified as parasitism, commensalism or mutualism

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested twice — para-past-q09, "it is a relationship between two living organisms where one benefits, while the other (host) is not harmed" (answer: Commensalism), End 39 sitting p1; and para-past-q22, "Which of the following is a relationship between two living organisms From which one benefits and the other is not harmed?" (answer: Commensalism), Final 40 sitting p9. Both from Parasitology Past Exams - MCQ Answers - Telegram 9673.pdf, highlight-fill-red key. Found via find-existing.mjs, exact-grain match (host-microbe relationship classification already covers the parasitism/commensalism/mutualism distinction tested here, applied to parasitology rather than bacteriology).

---

# Item

## id
CON-FND-2A6D478CFC27ED

## label
Myositis ossificans is mesenchymal metaplasia -- bone formation in muscle, typically after intramuscular hemorrhage -- one instance of connective-tissue metaplasia forming cartilage, bone or fat where these tissues do not normally occur

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as "Myositis ossificans is an example of" (answer: Connective tissue metaplasia), Pathology Chapters 5 and 6 Past Exam MCQs - Answers - Telegram 9683.pdf p3, purple/violet highlight-fill key. Found via find-existing.mjs in pending docs/Kasr-Source-Imports/concept/208-INT-concepts.md, exact-grain match.

---

# Item

## id
CON-FND-91B66B24922754

## label
Carcinoma in situ is a pre-invasive stage of carcinoma with full-thickness epithelial atypia and disturbed cellular polarity but no invasion of the basement membrane, distinguishing it from both dysplasia and frankly invasive carcinoma

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested as a 62-year-old-man bladder-mucosa biopsy vignette (marked hyperchromatism, increased N:C ratio, full epithelial thickness, intact basement membrane; answer: Carcinoma in situ), Pathology Chapters 5 and 6 Past Exam MCQs - Answers - Telegram 9683.pdf p10, purple/violet highlight-fill key. Found via find-existing.mjs in pending docs/Kasr-Source-Imports/concept/208-INT-concepts.md, exact-grain match.

---

# Item

## id
CON-FND-9B1EE27764E33C

## label
Metastases typically resemble their primary tumor, bone metastases are usually osteolytic (prostate is the osteosclerotic exception), muscle is a rare metastatic site, and gastric or colonic carcinoma can seed both ovaries as a Krukenberg tumor

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested twice -- "Krukenberg's tumor is an example of one of the following" (answer: Transcoelomic spread), p7; and "Which of the following best describes Krukenberg tumor?" (answer: Metastatic ovarian tumor), p10 -- same tumour, two facets (spread mechanism, then definition). Both Pathology Chapters 5 and 6 Past Exam MCQs - Answers - Telegram 9683.pdf, purple/violet highlight-fill key. Found via find-existing.mjs in pending docs/Kasr-Source-Imports/concept/208-INT-concepts.md, exact-grain match.

---

# Item

## id
CON-FND-98883162BD988A

## label
Lipoma is the benign, soft, stable subcutaneous fatty tumour

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested three times in this cluster -- "Male patient has subcutaneous mass soft in consistency. Cut section is yellowish and greasy" (answer: Lipoma), p2; "Signet ring microscopic morphology presents in the following tumor" (answer: Lipoma), p4; and a 25-year-old-male neck-mass vignette, "microscopic picture of this lesion reveals lobules of" (answer: Fat cells), p9 (this third stem's own printed key names the histologic feature -- fat cells -- rather than the tumour name, but tests the same lipoma-recognition fact). All Pathology Chapters 5 and 6 Past Exam MCQs - Answers - Telegram 9683.pdf, purple/violet highlight-fill key. Found via find-existing.mjs in pending docs/Assiut-Source-Imports/concept/AUN-MPT-104-concepts.md, exact-grain match.

---

# Item

## id
CON-FND-3965F7DB0C47DC

## label
Leiomyoma is the benign, slow-growing uterine smooth-muscle tumour

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED102

## field_notes
mu: Tested twice -- a 25-year-old-female uterine submucous whorled-cut-section vignette (answer: Leiomyoma), p2; and "One of the following benign tumor could be a cause of infertility" (answer: Leiomyoma), p4. Both Pathology Chapters 5 and 6 Past Exam MCQs - Answers - Telegram 9683.pdf, purple/violet highlight-fill key. Found via find-existing.mjs in pending docs/Assiut-Source-Imports/concept/AUN-MPT-104-concepts.md, exact-grain match.

---
