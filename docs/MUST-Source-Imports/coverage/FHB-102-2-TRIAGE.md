# MUST FHB 102-2 — S1 read-only triage checkpoint

## Scope and decision

This is an incomplete read-only S1 checkpoint. It covers the 96 inventory paths / 94 unique SHA-256s selected from module `FHB 102-2` and categories `05 MCQs`, `06 EOM Exams`, `07 EOY Exams`, and `08 Midterm Exams`. The sorted-newline selected-hash checksum is `3d7282909b1be0ee1a4b3ff7ae16d923505ab40926a44d97090c2e287e445313`. It does not mint IDs or student content; all future new-concept placement remains **TBD**.

## Selection and priority evidence

The selected-set boundary was reproduced directly from the canonical inventory:

| Boundary | Count |
|---|---:|
| Selected inventory paths | 96 |
| Unique SHA-256s | 94 |
| Duplicate paths beyond unique hashes | 2 |
| `05 MCQs` | 45 |
| `06 EOM Exams` | 26 |
| `07 EOY Exams` | 0 |
| `08 Midterm Exams` | 25 |
| Assessment-category paths (`06` + `07` + `08`) | 51 |
| Answer/key-labelled assessment paths | 0 |
| Candidate question-source paths (assessment + `05 MCQs`) | 96 |

The subject split is **00 Module-wide 5 / Microbiology 28 / Parasitology 21 / Pharmacology 42**. The only byte-duplicate family is SHA-256 `9d8fd6b6b5d51ccc5049efc430daa26267f57ac04dc11717686cfad21af7edf1`, represented by the same 18-page `Final OSPE Simulation FHB102_Mucize Doctors.pdf` carrier in the Microbiology, Parasitology and Pharmacology EOM folders.

## Completed source — FHB 102-2 Online Final Exam (PentaGram carrier)

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/00 Module-wide/06 EOM Exams/EOM MCQs - 1)FHB 102-2 Online Final Exam - PentaGram.pdf` | `dd800ea485e532ad4b5fedc7070c3e410b1d3bf13b7589c2fd79b38287704470` | 33 | empty-text | pages 1–33 rendered and read | Direct CamScanner photographs of the Qorrect `FHB102-2 Fundamentals of human body II` active-attempt interface. The interface declares 35 questions, 70 marks and 42 marks to pass, strongly supporting an examination sitting. It displays neither a result screen nor an official key and does not visibly authenticate an institution, examiner or sitting date. Personal account names are excluded from durable evidence. |

### Exact prompt, response, written, practical and image boundary

The source physically contains 33 prompt screenshots, but pages 1 and 3 are two capture states of the same Q1 stem and options. They are one assessment occurrence, not two prompts; page 1 shows a selected option and page 3 shows the earlier unselected state. The distinct visible sequence is **Q1–Q22, Q24, Q26–Q27 and Q29–Q35**. Q23, Q25 and Q28 are absent, and the interface's declared 35-question total is not used to manufacture them.

| Subject block | Visible labels | Distinct MCQ prompts | Student-selected response observations | Official faculty-key observations |
|---|---|---:|---:|---:|
| Parasitology / medical entomology | Q1–Q12 | 12 | 2 | 0 |
| Pharmacology | Q13–Q22 | 10 | 8 | 0 |
| Microbiology | Q24, Q26–Q27, Q29–Q35 | 10 | 8 | 0 |
| **Total** | **Q1–Q22, Q24, Q26–Q27, Q29–Q35** | **32** | **18** | **0** |

The eighteen filled radio rows are prompt-matched answer-bearing observations from the active student attempt, not an authenticated answer key. Fourteen captured prompts have no selected response. No selection is medically corrected or promoted to official authority. There are **0 written prompts / 0 practical stations / 0 image-identification prompts / 0 teaching-only pages / 0 answer-only pages**.

### Source-first handles, exactly four searches each, and prior-FHB-102-2 dedupe

All 32 distinct prompts are assigned exactly once across 22 source handles. Each handle received the four manual live-and-pending searches printed below through `find-existing.mjs`, giving **22 × 4 = 88 searches**. Every query returned no live or pending match. Because this is the first processed FHB 102-2 source, no prior-module handle exists to collapse; the source-level and post-prior disposition are both **0 live / 0 pending / 22 new**.

| Printed refs | Source-distinct tested concept (four search phrases) | Search / prior-FHB-102-2 disposition |
|---|---|---|
| Q1,Q3,Q6 | Biological vector-transmission modes and parasite host role (`cyclopropagative transmission`; `transovarian transmission mosquito`; `Anopheles definitive host`; `parasite biological transmission vector`) | new externally; no prior-module assignment — retained new/TBD. |
| Q2 | Malaria sporozoite as the mosquito-inoculated human stage (`malaria sporozoite infective stage`; `Plasmodium vector inoculated stage`; `malaria intraerythrocytic hemolytic anemia`; `Anopheles sporozoite human`) | new externally; no prior-module assignment — retained new/TBD. |
| Q4 | Babesiosis with intraerythrocytic rings and Maltese-cross forms (`babesiosis Maltese cross`; `Babesia intraerythrocytic rings`; `tick borne babesiosis`; `Babesia hemolytic anemia`) | new externally; no prior-module assignment — retained new/TBD. |
| Q5 | Blood trypomastigotes in African trypanosomiasis (`Trypanosoma blood trypomastigote`; `African sleeping sickness blood stage`; `Trypanosoma brucei posterior cervical lymph nodes`; `Winterbottom sign trypanosomiasis`) | new externally; no prior-module assignment — retained new/TBD. |
| Q7 | Ixodes transmission of Lyme disease (`Lyme disease Ixodes`; `erythema migrans tick vector`; `Borrelia burgdorferi Ixodes`; `Lyme arthritis facial palsy`) | new externally; no prior-module assignment — retained new/TBD. |
| Q8–Q9 | Body-louse epidemic typhus and rat-flea plague transmission (`epidemic typhus body louse`; `Rickettsia prowazekii Pediculus`; `plague Xenopsylla cheopis`; `rat flea Yersinia pestis`) | new externally; no prior-module assignment — retained new/TBD. |
| Q10 | Paratransgenesis using vector symbionts (`paratransgenesis symbiont bacteria`; `vector control paratransgenesis`; `genetically modified symbiont vector`; `paratransgenesis biological control`) | new externally; no prior-module assignment — retained new/TBD. |
| Q11 | Phlebotomus transmission of cutaneous leishmaniasis (`cutaneous leishmaniasis Phlebotomus`; `volcano ulcer sandfly`; `Leishmania major vector`; `phlebotomine sand fly leishmaniasis`) | new externally; no prior-module assignment — retained new/TBD. |
| Q12 | Wound myiasis and Sarcophaga larvae (`wound myiasis Sarcophaga`; `myiasis larva open peritreme`; `bed sore fly larvae myiasis`; `Sarcophaga larva wound`) | new externally; no prior-module assignment — retained new/TBD. |
| Q13–Q15 | Adverse effects of first-line antituberculous drugs (`ethambutol retrobulbar neuritis`; `isoniazid pyridoxine deficiency`; `streptomycin ototoxicity`; `first line tuberculosis drugs adverse effects`) | new externally; no prior-module assignment — retained new/TBD. |
| Q16,Q18 | Chloramphenicol aplastic anaemia and gray-baby toxicity (`chloramphenicol aplastic anemia`; `chloramphenicol gray baby syndrome`; `chloramphenicol toxicity`; `gray baby glucuronidation`) | new externally; no prior-module assignment — retained new/TBD. |
| Q17,Q21 | Clindamycin-associated pseudomembranous colitis and antimicrobial treatment (`clindamycin pseudomembranous colitis`; `Clostridioides difficile metronidazole`; `antibiotic associated colitis clindamycin`; `pseudomembranous colitis treatment`) | new externally; no prior-module assignment — retained new/TBD. |
| Q19,Q22 | Fluoroquinolone cartilage toxicity and DNA-gyrase inhibition (`fluoroquinolone cartilage damage children`; `ciprofloxacin pediatric cartilage`; `fluoroquinolone DNA gyrase`; `ciprofloxacin mechanism of action`) | new externally; no prior-module assignment — retained new/TBD. |
| Q20 | Vancomycin infusion reaction / red-man syndrome (`vancomycin red man syndrome`; `red man syndrome glycopeptide`; `vancomycin infusion reaction`; `vancomycin histamine flushing`) | new externally; no prior-module assignment — retained new/TBD. |
| Q24 | Viral mRNA production during replication (`viral mRNA transcription translation`; `virus mRNA production replication`; `viral replication transcription`; `viral protein synthesis mRNA`) | new externally; no prior-module assignment — retained new/TBD. |
| Q26,Q29 | Fungal eukaryotic organisation and nystatin membrane action (`fungi eukaryotic true nucleus`; `fungal cell membrane ergosterol`; `nystatin fungal cell membrane`; `fungi differentiated from bacteria`) | new externally; no prior-module assignment — retained new/TBD. |
| Q27 | Reversible bacterial phenotypic variation (`phenotypic variation reversible bacteria`; `bacterial phenotypic variation environment`; `nonheritable variation bacteria`; `phenotypic adaptation reversible`) | new externally; no prior-module assignment — retained new/TBD. |
| Q30 | Bacterial transformation by uptake of free DNA (`bacterial transformation free DNA`; `transformation horizontal gene transfer`; `uptake naked DNA bacteria`; `natural competence transformation`) | new externally; no prior-module assignment — retained new/TBD. |
| Q31 | Nutritional requirements of exacting heterotrophic bacteria (`exacting heterotrophic bacteria nutrition`; `organic carbon nitrogen heterotroph bacteria`; `bacterial growth requirements exacting`; `heterotrophic bacteria carbon source`) | new externally; no prior-module assignment — retained new/TBD. |
| Q32 | Thick multilayered peptidoglycan in Gram-positive bacteria (`Gram positive thick peptidoglycan`; `gram positive bacterial cell wall`; `lipopolysaccharide gram negative`; `multilayer peptidoglycan`) | new externally; no prior-module assignment — retained new/TBD. |
| Q33–Q34 | Plasmid and bacterial chromosome organisation (`plasmid extrachromosomal circular DNA`; `bacterial circular chromosome`; `plasmid nonessential bacterial DNA`; `bacterial genome organization plasmid`) | new externally; no prior-module assignment — retained new/TBD. |
| Q35 | G+C content in bacterial genetic classification (`GC ratio bacterial classification`; `guanine cytosine content taxonomy`; `genetic classification bacteria GC content`; `DNA base composition bacterial relatedness`) | new externally; no prior-module assignment — retained new/TBD. |

### Completed-source delta and cumulative table

This distinct one-path family is now `sourceProcessed=true`. Its delta and cumulative totals are **+32 questions / +18 prompt-matched answer observations / +22 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 32 | 18 | 22 | 0 | 0 | 22 | TBD |

No module ID, content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Remaining sources / blocker

Removing the one processed hash leaves **95 selected inventory paths / 93 unique SHA-256s**. Their sorted-newline checksum is `58bd03e147159d99e0338de9d8c4319f3d99cfe34367cb0a7254f82357de7cdd`. Remaining audit-review debt is **42 substantive-text / 25 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`1 + 93 = 94`**.

The next evidence-ranked source is the compact remaining module-wide carrier `Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf`, SHA-256 `b9989e9ef3c314f6c771c32a4ad2f096c02648a3b1f98281117ce7c4f5208063`, 6 pages, with a substantive-text audit sample. Its visual boundary and authority remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 95 selected inventory paths / 93 unique hashes remain untriaged.

## Completed source — FHB102-2 typed MCQ carrier

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/00 Module-wide/05 MCQs/MCQs - FHB102-2.pdf` | `b9989e9ef3c314f6c771c32a4ad2f096c02648a3b1f98281117ce7c4f5208063` | 6 | substantive-text | pages 1–6 rendered and read | Anonymous Microsoft Word-generated answer-bearing question bank created in 2021. The only title is `FHB102-2`; no institution, department, examiner, sitting date or authenticated faculty-key mark is visible. The terminal answer list is source-printed answer evidence, not an official-key authority claim. |

### Exact prompt, key, written, practical and teaching boundary

Pages 1–5 contain **32 objective MCQs**, numbered continuously Q1–Q32. Q13 crosses the page 2–3 boundary and Q22 crosses the page 3–4 boundary, but each is one assessment occurrence. The `Answers:` block begins after Q32 on page 5, prints answer tokens 1–27 there, and continues with tokens 28–31 on page 6. **Q32 has no printed key**, and no answer is inferred. The source therefore contains **32 prompt observations / 31 prompt-matched printed answer observations / one source-absent answer**. It contains **0 written prompts / 0 practical or image-identification prompts / 0 teaching-only prompts**. Academically questionable printed tokens are preserved as source truth and are not medically corrected.

### Normalized sibling reconciliation and exactly-four-search gate

The complete current sequence is a normalized-content sibling of the 32 distinct prompts captured in the first source. Current Q1–Q22 match the first carrier's Q1–Q22; current Q23–Q32 match its photographed Q24, Q26–Q27 and Q29–Q35 sequence after closing the three missing label gaps. Thus every prompt collapses to the prior FHB-102-2 family. The prior **22 accepted handles / 88 searches** are cross-referenced unchanged. No genuinely new handle survives, so the current-source search gate is exactly **0 accepted new handles × 4 = 0 new searches**. It adds **+0 concepts**, with no live or pending disposition change.

The first carrier supplied 18 student-selected response observations for this shared prompt family. This typed sibling supplies a printed token for 31 of the 32 prompts, so collapsed family answer coverage rises from 18 to 31: **+13 answer observations**, not +31 and not a double count. Q32 remains unkeyed.

### Completed-source delta and cumulative table

This second one-path hash is now `sourceProcessed=true`. Its source boundary is 32 prompts / 31 printed answers, but its collapsed delta is **+0 questions / +13 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 32 | 31 | 22 | 0 | 0 | 22 | TBD |

No module ID, content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Current remaining sources / blocker

Removing the two processed hashes leaves **94 selected inventory paths / 92 unique SHA-256s**. Their sorted-newline checksum is `a917a85255f8d1ae69a55c137ffef749015d5bb18a6b261663513d22b3fe6e3d`. Remaining audit-review debt is **41 substantive-text / 25 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`2 + 92 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 1).pdf`, SHA-256 `4bd3b78f762673d7eb7f1c0fc76651d76fd335105a287451e47c51d2bd0be5cf`, 45 pages, with a substantive-text audit sample. Its visual boundary and authority remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 94 selected inventory paths / 92 unique hashes remain untriaged.

## Completed source — FHB102-2 MCQs till Midterm by Absalam101 (Part 1)

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 1).pdf` | `4bd3b78f762673d7eb7f1c0fc76651d76fd335105a287451e47c51d2bd0be5cf` | 45 | substantive-text | pages 1–45 rendered and read | Student-authored revision question bank visibly attributed `By: Absalam101`, created in Microsoft Word in 2025. The filename and title say `Midterm`, but no institution, department, examiner, sitting, marks or authenticated faculty-key mark is visible. Its answer tables are source-printed keys, not official faculty keys. |

### Exact prompt, answer, written, practical, image and teaching boundary

The visible title says the file contains 150 questions, and the page-level boundary independently corroborates that claim: five separate 30-question sections, each followed by a complete 30-token answer-only page.

| Section | Question pages | Answer-only page | Objective MCQs | Printed answer tokens |
|---|---|---:|---:|---:|
| Parasitology — Introduction | 1–8 | 9 | 30 | 30 |
| Parasitology — Arthropoda | 10–17 | 18 | 30 | 30 |
| Microbiology — Chapters 1, 2 and 3 | 19–26 | 27 | 30 | 30 |
| Microbiology — Chapter 6 | 28–35 | 36 | 30 | 30 |
| Pharmacology | 37–44 | 45 | 30 | 30 |
| **Total** | **40 question pages** | **5 answer-only pages** | **150** | **150** |

There are **150 distinct objective prompt observations / 150 prompt-matched printed answer observations / 0 source-absent answers / 0 written prompts / 0 practical or image-identification prompts / 0 teaching prompts**. Page-break continuations remain one prompt occurrence each. Printed answer tokens, including academically questionable ones, are preserved without medical correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 150 prompts collapse source-first into 15 coherent handles. Four are already represented by the prior 22-handle FHB-102-2 family and receive no repeated external search: parasite host/vector/transmission roles collapse to the earlier biological-transmission handle; arthropod vector–disease associations collapse to the earlier vector-specific handles; myiasis classification and management collapse to the earlier wound-myiasis handle; and Gram-wall/plasmid/G+C classification items collapse to the earlier bacterial-structure handles. The remaining **11 accepted handles** each received exactly four manual live-and-pending searches: **11 × 4 = 44 searches**. Every query returned no live or pending match.

| Source refs / handle | Four search phrases or prior-module reference | Disposition |
|---|---|---|
| Parasitology Introduction — taxonomy, parasite types, habitat and lifecycle stages | `medical parasitology parasite classification`; `facultative obligate opportunistic parasite`; `ectoparasite endoparasite definition`; `diagnostic stage infective stage parasite` | no live/pending match — retained new/TBD |
| Parasitology Introduction — host roles and transmission/zoonosis | prior biological vector-transmission and host-role handle | prior-FHB-102-2 collapse |
| Arthropoda — insect/arachnid morphology and metamorphosis | `insect arachnid pairs of legs`; `holometabolous hemimetabolous metamorphosis`; `medical arthropod morphology`; `arthropoda insect arachnid classification` | no live/pending match — retained new/TBD |
| Arthropoda — vector–disease transmission associations | prior vector-transmission, malaria, trypanosomiasis, Lyme, typhus/plague and leishmaniasis handles | prior-FHB-102-2 collapse |
| Arthropoda — myiasis taxonomy, presentation, forensics and management | prior wound-myiasis handle | prior-FHB-102-2 collapse |
| Microbiology Ch. 1–3 — microorganism classification and cellular organisation | `microorganism prokaryote eukaryote acellular`; `microbiology scientific nomenclature genus species`; `saprophyte microorganism classification`; `bacteria virus fungi protozoa classification` | no live/pending match — retained new/TBD |
| Microbiology Ch. 1–3 — capsule, pili, flagella, glycocalyx, periplasm, membrane and L-forms | `bacterial capsule pili flagella glycocalyx`; `bacterial periplasmic space function`; `bacterial cytoplasmic membrane functions`; `bacterial L forms lack cell wall` | no live/pending match — retained new/TBD |
| Microbiology Ch. 1–3 — Gram wall, plasmid and G+C classification | prior thick-peptidoglycan, plasmid/chromosome and G+C-ratio handles | prior-FHB-102-2 collapse |
| Microbiology Ch. 6 — normal flora, colonisation and ecological relationships | `normal flora colonization sterile sites`; `commensal mutualistic parasitic relationship microbiota`; `opportunistic pathogen normal flora`; `colonization versus infection microbiology` | no live/pending match — retained new/TBD |
| Microbiology Ch. 6 — infection, carrier state, pathogenicity and virulence | `carrier state pathogenicity virulence`; `infection pathogenesis definition microbiology`; `bacterial virulence factors overview`; `asymptomatic carrier pathogen shedding` | no live/pending match — retained new/TBD |
| Microbiology Ch. 6 — adhesion, invasion, spreading factors and immune evasion | `bacterial adhesins pili invasins`; `hyaluronidase collagenase coagulase virulence`; `capsule resistance to phagocytosis`; `bacterial antigenic variation immune evasion` | no live/pending match — retained new/TBD |
| Microbiology Ch. 6 — endotoxin, exotoxin and superantigen mechanisms | `endotoxin versus exotoxin`; `AB exotoxin A B subunit`; `bacterial superantigen massive immune response`; `endotoxin complement inflammation` | no live/pending match — retained new/TBD |
| Pharmacology — bactericidal/static, spectrum and killing principles | `bactericidal versus bacteriostatic antibiotics`; `broad spectrum narrow spectrum antimicrobial`; `time dependent antibiotic killing beta lactam`; `antimicrobial chemotherapy principles` | no live/pending match — retained new/TBD |
| Pharmacology — beta-lactam/PBP, vancomycin and bacitracin cell-wall mechanisms | `beta lactam PBP transpeptidation`; `vancomycin D alanyl D alanine`; `bacitracin cell wall precursor transport`; `peptidoglycan synthesis inhibitor mechanism` | no live/pending match — retained new/TBD |
| Pharmacology — penicillin classes, formulations, combinations, resistance, uses and allergy | `penicillin classes natural aminopenicillin antipseudomonal`; `beta lactamase inhibitor penicillin combinations`; `penicillin adverse effects hypersensitivity cross reactivity`; `penicillin formulations clinical uses` | no live/pending match — retained new/TBD |

Post-prior disposition is therefore **0 live / 0 pending / 11 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This third one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+150 questions / +150 answers / +11 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 182 | 181 | 33 | 0 | 0 | 33 | TBD |

Removing the three processed hashes leaves **93 selected inventory paths / 91 unique SHA-256s**. Their sorted-newline checksum is `7d058de7f7a9b32b5423302c310b89fa181a695cfbae84cdc368dd4e83a9efd0`. Remaining audit-review debt is **40 substantive-text / 25 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`3 + 91 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 2).pdf`, SHA-256 `8bd3b772b3b32db5972665614475a6193f5ffa871e686a2026b0a7aeeadf375c`, 56 pages, with a substantive-text audit sample. Its exact prompt sequence and relation to Part 1 remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 93 selected inventory paths / 91 unique hashes remain untriaged.

## Completed source — FHB102-2 MCQs till Midterm by Absalam101 (Part 2)

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till Midterm by Absalam101 (Part 2).pdf` | `8bd3b772b3b32db5972665614475a6193f5ffa871e686a2026b0a7aeeadf375c` | 56 | substantive-text | pages 1–56 rendered and read | Student-authored revision question bank visibly attributed `By: Absalam101`, created in Microsoft Word in 2025. The filename/title say `Midterm`, but no institution, department, examiner, sitting, marks or authenticated faculty-key mark is visible. Its answer tables are source-printed keys, not official faculty keys. |

### Exact prompt, answer, written, practical, image and teaching boundary

The title-page declaration of 180 questions is independently corroborated by six visible 30-question sections and six complete 30-token answer tables.

| Section | Prompt/key pages | Objective MCQs | Printed answer tokens |
|---|---|---:|---:|
| Parasitology — Mosquitoes | 1–9; Q30 and key table share page 9 | 30 | 30 |
| Parasitology — Sandfly | questions 10–17; answer-only page 18 | 30 | 30 |
| Microbiology — Mycology | questions 19–28; answer-only page 29 | 30 | 30 |
| Microbiology — Virology | questions 30–37; answer-only page 38 | 30 | 30 |
| Microbiology — Chapter 10 | 39–47; Q30 and key table share page 47 | 30 | 30 |
| Pharmacology | 48–56; Q30 and key table share page 56 | 30 | 30 |
| **Total** | **56 pages** | **180** | **180** |

There are **180 distinct objective prompt observations / 180 prompt-matched printed answer observations / 0 source-absent answers / 0 written prompts / 0 practical or image-identification prompts / 0 teaching prompts**. Pages 18, 29 and 38 are answer-only; pages 9, 47 and 56 combine the final prompt with the section answer table. Page-break continuations remain one prompt each. The stray `W` beginning Virology Q9 and academically questionable tokens are preserved without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 180 prompts collapse source-first into 18 coherent handles. Three are already represented by the prior FHB-102-2 family and receive no repeated external search: mosquito biology/morphology/lifecycle collapses to the prior arthropod-morphology handle; mosquito vector–disease transmission collapses to prior vector/transmission handles; and core beta-lactam mechanisms, resistance and allergy collapse to the prior cell-wall and penicillin handles. The remaining **15 accepted handles** each received exactly four manual live-and-pending searches: **15 × 4 = 60 searches**. Every query returned no live or pending match.

| Source handle | Four search phrases or prior-module reference | Disposition |
|---|---|---|
| Mosquito biology, morphology, lifecycle and behaviour | prior arthropod morphology/metamorphosis handle | prior-FHB-102-2 collapse |
| Mosquito vector–disease and transmission associations | prior biological vector-transmission and vector-specific handles | prior-FHB-102-2 collapse |
| Integrated mosquito/sandfly vector control | `mosquito integrated vector management`; `biological chemical physical mosquito control`; `sandfly control insecticide bed net habitat`; `paratransgenesis vector control bacteria` | no live/pending match — retained new/TBD |
| Sandfly biology, ecology and bite | `sandfly Phlebotomus morphology lifecycle`; `sandfly nocturnal weak hopping flight`; `sandfly bite Harara reaction`; `sandfly breeding habitat control ecology` | no live/pending match — retained new/TBD |
| Sandfly diseases and transmission | `sandfly Leishmania promastigote amastigote`; `cutaneous visceral mucocutaneous leishmaniasis`; `Bartonella bacilliformis Oroya fever sandfly`; `sandfly fever leishmaniasis transmission` | no live/pending match — retained new/TBD |
| Fungal structure, classification and reproduction | `fungal ergosterol chitin beta glucan`; `yeast mold dimorphic fungi classification`; `fungal hyphae mycelium spore reproduction`; `medical mycology fungal morphology` | no live/pending match — retained new/TBD |
| Mycosis categories and pathogenesis | `superficial subcutaneous systemic opportunistic mycoses`; `fungal allergy spores mycotoxicosis`; `opportunistic pathogenic fungi immunocompromised`; `fungal disease classification pathogenesis` | no live/pending match — retained new/TBD |
| Fungal diagnostics, culture and stains | `KOH preparation fungal diagnosis`; `India ink cryptococcus capsule`; `Sabouraud agar fungal culture`; `calcofluor silver stain fungal PCR antigen` | no live/pending match — retained new/TBD |
| Viral structure, genome and classification | `virus capsid envelope genome classification`; `viroid circular RNA prion`; `viral envelope host cell membrane`; `DNA RNA virus genome morphology` | no live/pending match — retained new/TBD |
| Viral replication, culture, tropism and CPE | `viral eclipse period budding replication`; `virus tissue culture chick embryo isolation`; `viral cell tropism receptors`; `cytopathic effect inclusion bodies syncytia` | no live/pending match — retained new/TBD |
| Viral diagnosis, immunity and vaccines | `viral antigen antibody diagnostic tests ELISA`; `hemagglutination inhibition virus test`; `live attenuated subunit mRNA viral vector vaccines`; `interferon antiviral immunity chronic carrier` | no live/pending match — retained new/TBD |
| Staphylococci identification | `staphylococcus catalase coagulase mannitol salt agar`; `staphylococcus aureus pigment beta hemolysis`; `coagulase negative staphylococcus epidermidis`; `staphylococci clusters identification tests` | no live/pending match — retained new/TBD |
| Streptococci and enterococci | `streptococcus catalase negative chains pairs`; `Lancefield classification M protein Griffith`; `streptococcus pyogenes beta hemolysis`; `enterococci viridans streptococci hemolysis` | no live/pending match — retained new/TBD |
| Anaerobic GPC and Gram-positive rods | `peptostreptococci anaerobic mixed infections`; `corynebacterium Chinese letters morphology`; `clostridium perfringens capsule anaerobic spore`; `Nocardia Actinomyces Propionibacterium differentiation` | no live/pending match — retained new/TBD |
| Cephalosporins | `cephalosporin generations spectrum clinical uses`; `cefazolin cefaclor ceftriaxone cefepime ceftaroline`; `fourth fifth generation cephalosporin MRSA`; `cephalosporin meningitis surgical prophylaxis` | no live/pending match — retained new/TBD |
| Monobactams and carbapenems | `aztreonam monobactam gram negative penicillin allergy`; `imipenem cilastatin carbapenem`; `carbapenem broad spectrum anaerobes`; `monobactam lack nephrotoxicity` | no live/pending match — retained new/TBD |
| Vancomycin spectrum, uses and adverse-effect prevention | `vancomycin gram positive MRSA spectrum`; `oral vancomycin Clostridioides difficile`; `vancomycin nephrotoxicity red man prevention`; `vancomycin last resort resistant infection` | no live/pending match — retained new/TBD |
| Core beta-lactam mechanisms, resistance and allergy | prior cell-wall antimicrobial and penicillin handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 15 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This fourth one-path hash is now `sourceProcessed=true`. It is distinct from Part 1 and adds **+180 questions / +180 answers / +15 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 362 | 361 | 48 | 0 | 0 | 48 | TBD |

Removing the four processed hashes leaves **92 selected inventory paths / 90 unique SHA-256s**. Their sorted-newline checksum is `77ad46deade178ad591469f27b245889d771ef78e35a4975c26cc2a539c23aa9`. Remaining audit-review debt is **39 substantive-text / 25 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`4 + 90 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf`, SHA-256 `352f47c6e866e76a9d8b2aa4772a0f7d7a731170aa23214ac95ba51021c7213f`, 47 pages, with a substantive-text audit sample. Its visual boundary and authority remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 92 selected inventory paths / 90 unique hashes remain untriaged.

## Completed source — FHB102-2 MCQs till mid (Mucize Doctors Publish)

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/00 Module-wide/08 Midterm Exams/FHB102-2 MCQs till mid_MUCIZE DOCTORS PUPLISH.pdf` | `352f47c6e866e76a9d8b2aa4772a0f7d7a731170aa23214ac95ba51021c7213f` | 47 | substantive-text | pages 1–47 rendered and read | Mucize Doctors student-team revision book for MUST medical students, explicitly labelled `FROM STUDENTS TO STUDENTS` and described as a supplementary educational resource. Named students authored and reviewed it. The 2025 midterm branding and marks-distribution table do not supply an authenticated sitting, examiner, department or faculty-key mark. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–5 are cover, contributors, disclaimer, preface and contents rather than assessment prompts.

| Section | Pages | Objective MCQs | Printed answer tokens | Prompt-matched answers |
|---|---|---:|---:|---:|
| Parasitology core MCQs | 6–19 | 95 | 95 | 94 |
| Parasitology case-based MCQs | 20–23 | 22 | 22 | 22 |
| Parasitology advanced MCQs | 24–28 | 33 | 33 | 33 |
| Pharmacology Antibacterial (1) | questions 29–35; answer-only 36 | 50 | 50 | 50 |
| Pharmacology Antibacterial (2) | questions 37–43; answer-only 44 | 50 | 50 | 50 |
| Pharmacology advanced MCQs | 45–47 | 15 | 15 | 15 |
| **Total** | **47 pages** | **265** | **265** | **264** |

The page 9 answer line omits Q25 and prints a second, orphan Q35 token; Q25 is therefore source-absent and was not inferred. Case 1 refers to “following images”, but no diagnostic image is visibly printed, so its text questions are not counted as practical/image-identification items. The preface includes Microbiology in a three-subject marks table although this volume contains only Parasitology and Pharmacology questions. The exact boundary is **265 objective prompts / 265 printed answer tokens / 264 prompt-matched answer observations / 1 orphan or misnumbered token / 1 source-absent answer / 0 written / 0 practical or image / 0 teaching prompts**.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 265 prompts collapse source-first into thirteen coherent handles. Every handle is already represented by the completed FHB-102-2 family, so no accepted handle survives to external search: **0 accepted × 4 = 0 searches**.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Basic parasite definitions, taxonomy, host roles, routes and zoonosis | prior parasitology-foundation and host-role handles | prior-FHB-102-2 collapse |
| Arthropod classification and vector transmission | prior arthropod-morphology and vector-transmission handles | prior-FHB-102-2 collapse |
| Myiasis taxonomy, diagnosis and management | prior wound-myiasis handle | prior-FHB-102-2 collapse |
| Mosquito morphology, lifecycle, feeding and ecology | prior mosquito/arthropod-biology handles | prior-FHB-102-2 collapse |
| Mosquito-borne malaria, filariasis and arboviruses | prior vector, malaria and mosquito-disease handles | prior-FHB-102-2 collapse |
| Mosquito control methods | prior integrated-vector-control handle | prior-FHB-102-2 collapse |
| Sandfly biology and ecology | prior sandfly-biology handle | prior-FHB-102-2 collapse |
| Sandfly Leishmania, fever and Bartonella associations | prior sandfly-disease handle | prior-FHB-102-2 collapse |
| Sandfly control | prior integrated-vector-control handle | prior-FHB-102-2 collapse |
| Antimicrobial spectrum, killing principles, adverse effects, superinfection and prophylaxis | prior antimicrobial-principles handle | prior-FHB-102-2 collapse |
| Beta-lactam, penicillin and cephalosporin classes, mechanisms, uses and adverse effects | prior cell-wall, penicillin and cephalosporin handles | prior-FHB-102-2 collapse |
| Aztreonam, carbapenem, imipenem and cilastatin | prior monobactam/carbapenem handle | prior-FHB-102-2 collapse |
| Vancomycin, bacitracin and polymyxin | prior cell-wall and vancomycin handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No repeated external search, content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This fifth one-path hash is now `sourceProcessed=true`. It is a distinct source carrier and adds **+265 questions / +264 prompt-matched answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 627 | 625 | 48 | 0 | 0 | 48 | TBD |

Removing the five processed hashes leaves **91 selected inventory paths / 89 unique SHA-256s**. Their sorted-newline checksum is `555f63a0ee911aa14f000eaed153f133785899749cf47698bb1cc0b1e6eaae4b`. Remaining audit-review debt is **38 substantive-text / 25 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`5 + 89 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - AE - MCQ.pdf`, SHA-256 `ae85035d9ea693b962b7d4a1999b7e61bed472cf0127eb04e3dcf2bd90892f37`, 29 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 91 selected inventory paths / 89 unique hashes remain untriaged.
