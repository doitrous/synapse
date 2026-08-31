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

## Completed source — AE Microbiology MCQ

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - AE - MCQ.pdf` | `ae85035d9ea693b962b7d4a1999b7e61bed472cf0127eb04e3dcf2bd90892f37` | 29 | sparse-text | pages 1–29 rendered and read | Anonymous CamScanner reproduction whose cover says only `Microbiology MCQ` and `AE`; PDF metadata says `AE - Book 5`. No institution, department, examiner, sitting date, marks, author or authenticated faculty-key mark is visible. The terminal answer table is source-printed answer evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 is a non-assessment cover. Pages 2–28 contain a single continuous Q1–Q177 sequence; section headings embedded between numbered prompts are organizational labels rather than teaching prompts. Page 29 is answer-only and prints a complete Q1–Q177 table.

| Section | Prompt pages | Labels | Objective MCQs | Prompt-matched answer tokens |
|---|---|---|---:|---:|
| Bacterial structure | 2–9 | Q1–Q50 | 50 | 50 |
| Bacterial growth | 9–13 | Q51–Q76 | 26 | 26 |
| Genetics and bacteriophage | 13–19 | Q77–Q120 | 44 | 44 |
| Antibiotic resistance | 19–20 | Q121–Q128 | 8 | 8 |
| Infection | 21–25 | Q129–Q157 | 29 | 29 |
| General virology | 25–26 | Q158–Q166 | 9 | 9 |
| General mycology | 27–28 | Q167–Q177 | 11 | 11 |
| **Total** | **2–28; answer-only 29** | **Q1–Q177** | **177** | **177** |

The exact boundary is **177 objective prompts / 177 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**. Printed grammatical, spelling and academically questionable prompt/key tokens remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 177 prompts collapse source-first into twelve coherent handles. Six collapse to completed FHB-102-2 concepts without repeated search. The other **six accepted handles** each received exactly four live-and-pending searches: **6 × 4 = 24 searches**. Every query returned no live or pending match.

| Source handle | Four search phrases or prior-module reference | Disposition |
|---|---|---|
| Bacterial envelope, wall, membrane and wall-deficient forms | prior Gram-wall and bacterial-structure handles | prior-FHB-102-2 collapse |
| Bacterial appendages, capsule, inclusions, spores, ribosomes and plasmids | prior capsule/pili/flagella/glycocalyx and plasmid handles | prior-FHB-102-2 collapse |
| Bacterial nutritional and environmental growth requirements | `bacterial oxygen requirements obligate facultative microaerophile aerotolerant`; `bacterial temperature groups psychrophile mesophile thermophile`; `bacterial capnophile acidophile nutritional growth requirements`; `autotroph heterotroph bacterial carbon source` | no live/pending match — retained new/TBD |
| Bacterial growth curve, division, generation time and antimicrobial susceptibility | `bacterial growth curve lag log stationary decline phases`; `bacterial binary fission generation time`; `bacterial sporulation stationary phase`; `bacterial log phase antibiotic susceptibility` | no live/pending match — retained new/TBD |
| Chromosome, plasmid, gene, genome, genotype and phenotype | prior plasmid/chromosome and G+C classification handles | prior-FHB-102-2 collapse |
| Transposons and bacterial mutation | `bacterial transposons mobile DNA sequences`; `spontaneous induced bacterial mutation mutagens`; `simple replicative transposition bacteria`; `bacterial gene genotype phenotype mutation` | no live/pending match — retained new/TBD |
| Horizontal gene transfer and bacteriophage lytic/lysogenic cycles | `bacterial horizontal gene transfer transformation transduction conjugation`; `bacteriophage lytic lysogenic prophage cycle`; `generalized specialized transduction bacteria`; `F plasmid sex pilus conjugation` | no live/pending match — retained new/TBD |
| Antimicrobial-resistance mechanisms and genetic origins | `bacterial antimicrobial resistance altered target permeability enzyme inactivation`; `plasmid mediated antibiotic resistance R factor`; `chromosomal versus transferable drug resistance bacteria`; `intrinsic Mycoplasma penicillin resistance no cell wall` | no live/pending match — retained new/TBD |
| Virulence, toxins, colonization and carriers | prior infection/carrier/pathogenicity/virulence, invasion and toxin handles | prior-FHB-102-2 collapse |
| Infection stages, epidemiological distribution and infectious dose | `infection incubation prodromal invasion convalescent stages`; `endemic epidemic pandemic definitions infection`; `infectious dose Shigella Salmonella pathogenicity virulence`; `acute chronic latent infection carrier state` | no live/pending match — retained new/TBD |
| Viral structure, replication, cytopathic effects and prions | prior viral structure/genome/classification and replication/CPE handles | prior-FHB-102-2 collapse |
| Fungal structure, classification, reproduction and antifungal targets | prior fungal structure/classification/reproduction and membrane-target handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 6 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This sixth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+177 questions / +177 answers / +6 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 804 | 802 | 54 | 0 | 0 | 54 | TBD |

Removing the six processed hashes leaves **90 selected inventory paths / 88 unique SHA-256s**. Their sorted-newline checksum is `38ffe857c4ad0ae80ba3b1a9bfff9cd486d0c4df7668ba28de85d741b3c3b586`. Remaining audit-review debt is **38 substantive-text / 24 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`6 + 88 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB 102-2 Microbiology Infection tutorial-4.pdf`, SHA-256 `d563da91fcfe9ac872abf66c7f91729535a895bcc329978a67321fcf4aec3f43`, 20 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 90 selected inventory paths / 88 unique hashes remain untriaged.

## Completed source — Microbiology Infection tutorial 4

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB 102-2 Microbiology Infection tutorial-4.pdf` | `d563da91fcfe9ac872abf66c7f91729535a895bcc329978a67321fcf4aec3f43` | 20 | sparse-text | pages 1–20 rendered and read | Anonymous tutorial slide deck titled `FHB 102-2 | Infection module | Tutorial`. No institution, department, examiner, sitting, marks, named author or authenticated faculty-key mark is visible. The yellow highlights are source answer evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 is a title slide. Pages 2–5 print Q1–Q4, page 6 is a teaching-only Gram-positive/Gram-negative wall comparison diagram, and pages 7–19 print Q5–Q17. Page 20 is a closing `ANY QUESTIONS???` slide. Q1–Q11 each have one option highlighted yellow on the same slide. Q12–Q17 have no visible highlight, answer mark or separate key, so those six answers remain source-absent. Q14–Q17 include culture, biochemical-test, microscopy or colony images as evidence within otherwise conventional objective MCQs.

The exact boundary is **17 objective prompts / 11 prompt-matched highlighted source-answer observations / 6 source-absent answers / 0 written / 4 image-supported objective prompts / 0 practical-only prompts / 0 teaching prompts**, plus one teaching-only diagram page. Image support does not create extra prompt occurrences. Printed spelling, grammar and academically questionable highlighted options remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The seventeen prompts collapse source-first into six coherent handles. Five are already represented by completed FHB-102-2 concepts and receive no repeated search. The one surviving clinical/laboratory bacterial-identification handle received exactly four live-and-pending searches: **1 × 4 = 4 searches**. Every query returned no live or pending match.

| Source handle | Four search phrases or prior-module reference | Disposition |
|---|---|---|
| Prokaryotic structure, Gram-positive/negative envelopes and plasma membrane | prior bacterial envelope, wall, membrane and wall-deficient-forms handle | prior-FHB-102-2 collapse |
| Bacterial spores and long-term environmental survival | prior bacterial appendages, capsule, inclusions, spores, ribosomes and plasmids handle | prior-FHB-102-2 collapse |
| Growth curve and nutritional classification | prior bacterial growth-curve/division and nutritional/environmental-requirements handles | prior-FHB-102-2 collapse |
| Transformation, conjugation and lysogenic conversion | prior horizontal gene transfer and bacteriophage lytic/lysogenic-cycle handle | prior-FHB-102-2 collapse |
| Endotoxin, invasion enzymes and virulence factors | prior virulence, toxins, colonization and carriers handle | prior-FHB-102-2 collapse |
| Clinical and laboratory identification of Proteus, Pseudomonas, Staphylococcus aureus and Streptococcus pyogenes | `Proteus swarming indole urease bacterial identification`; `Pseudomonas burn wound blue green pigment oxidase`; `Staphylococcus aureus catalase coagulase impetigo identification`; `Streptococcus pyogenes beta hemolysis catalase negative identification` | no live/pending match — retained new/TBD |

Post-prior disposition is **0 live / 0 pending / 1 new**. No content record, missing-answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This seventh one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+17 questions / +11 answers / +1 concept**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|
| FHB 102-2 | 821 | 813 | 55 | 0 | 0 | 55 | TBD |

Removing the seven processed hashes leaves **89 selected inventory paths / 87 unique SHA-256s**. Their sorted-newline checksum is `19c83af17959b145df6dbf3f4ae2f6b020d99028608d1b89bfb55f3a5c9c4516`. Remaining audit-review debt is **38 substantive-text / 23 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`7 + 87 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB MICRO CH10 PRACTICE.pdf`, SHA-256 `1c477cdee3ad720f5e94adfd2eafd9908bbcd61f9622f7b60ec93c9cb7f3d229`, 3 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 89 selected inventory paths / 87 unique hashes remain untriaged.

## Completed source — FHB Microbiology Chapter 10 practice

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB MICRO CH10 PRACTICE.pdf` | `1c477cdee3ad720f5e94adfd2eafd9908bbcd61f9622f7b60ec93c9cb7f3d229` | 3 | substantive-text | pages 1–3 rendered and read | Google Docs-exported `CH.10 (Micro)` practice sheet with `Maii Mahmoud Rady` printed in each footer. The file metadata records a March 2025 browser export, but no institution, department, examiner, sitting, marks or authenticated faculty-key mark is visible. The terminal answer list is source answer evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–3 contain one continuous flow of eighteen unnumbered conventional MCQs. The eighth prompt begins on page 1 and its final two options continue at the top of page 2; it is one prompt occurrence. The final two prompts appear on page 3, followed by an `Answers:` heading and eighteen ordered option-and-text answer lines. Positional reconciliation maps all eighteen answer lines one-to-one to the eighteen prompts.

The exact boundary is **18 objective prompts / 18 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**. Near-repeated stems on Staphylococcus/Streptococcus, Corynebacterium, Nocardia and Actinomyces remain separate assessment occurrences because the source asks and answers each occurrence independently. Printed grammatical and academically questionable tokens remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The eighteen prompts collapse source-first into two coherent handles. General phenotypic identification of Staphylococcus, Streptococcus, Corynebacterium and Clostridium is already represented by the prior clinical/laboratory bacterial-identification concept and receives no repeated search. The surviving Actinomyces–Nocardia differentiation handle received exactly four live-and-pending searches: **1 × 4 = 4 searches**. Every query returned no live or pending match.

| Source handle | Four search phrases or prior-module reference | Disposition |
|---|---|---|
| Gram-positive cocci and rods differentiated by catalase, coagulase, hemolysis, motility, spores and oxygen requirement | prior clinical and laboratory bacterial-identification handle | prior-FHB-102-2 collapse |
| Actinomyces versus Nocardia by branching filaments, oxygen requirement and weak acid-fastness | `Nocardia Actinomyces branching filaments weak acid fast aerobic anaerobic`; `Nocardia weak acid fast aerobic branching bacteria`; `Actinomyces anaerobic branching filaments non acid fast`; `gram positive branching filamentous bacteria Nocardia Actinomyces identification` | no live/pending match — retained new/TBD |

Post-prior disposition is **0 live / 0 pending / 1 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This eighth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+18 questions / +18 answers / +1 concept**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|
| FHB 102-2 | 839 | 831 | 56 | 0 | 0 | 56 | TBD |

Removing the eight processed hashes leaves **88 selected inventory paths / 86 unique SHA-256s**. Their sorted-newline checksum is `ebbba239dcd4a733ba674ccd595995711ea39d8ead5a4883c66e8ecba87adf82`. Remaining audit-review debt is **37 substantive-text / 23 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`8 + 86 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB-2 micro mcq.pdf`, SHA-256 `9cf944929a7cffa384d05bc660ce1fc449e47ab2c1920f09d4bf861d942092bc`, 1 page, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 88 selected inventory paths / 86 unique hashes remain untriaged.

## Completed source — FHB-2 Microbiology MCQ

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - FHB-2 micro mcq.pdf` | `9cf944929a7cffa384d05bc660ce1fc449e47ab2c1920f09d4bf861d942092bc` | 1 | substantive-text | page 1 rendered and read | March 2025 Microsoft Word-generated exercise headed `Microbiology` and `FH8 102-2`. PDF metadata contains an individual author string, excluded from durable evidence because no visible attribution or authority statement accompanies it. No institution, department, examiner, sitting, marks or authenticated faculty-key claim is visible. |

### Exact prompt, answer, written, practical, image and teaching boundary

The single page contains Q1–Q5 as five conventional four-option MCQs. Each prompt has exactly one option highlighted yellow inline. There is no separate key, written question, practical station, image-identification prompt, teaching passage or non-assessment page.

The exact boundary is **5 objective prompts / 5 prompt-matched highlighted source-answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**. The heading typo `FH8 102-2`, the source's mesosome wording, and academically questionable highlighted options remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The five prompts collapse source-first into three coherent handles, all already represented by completed FHB-102-2 concepts. No new handle survives the gate: **0 accepted × 4 = 0 searches**.

| Source handle | Prior-module reference | Disposition |
|---|---|---|
| Prokaryotic energy structures, cell wall and prokaryote/eukaryote distinction | prior bacterial envelope, wall, membrane and bacterial-structure handles | prior-FHB-102-2 collapse |
| Bacterial chromosome organization | prior chromosome, plasmid, gene, genome, genotype and phenotype handle | prior-FHB-102-2 collapse |
| Bacterial multiplication by binary fission | prior bacterial growth curve, division and generation-time handle | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This ninth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+5 questions / +5 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|
| FHB 102-2 | 844 | 836 | 56 | 0 | 0 | 56 | TBD |

Removing the nine processed hashes leaves **87 selected inventory paths / 85 unique SHA-256s**. Their sorted-newline checksum is `1c2346c95515a82669241d515077c3f3835a71c2d22077053c5012ac440552c9`. Remaining audit-review debt is **36 substantive-text / 23 sparse-text / 15 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`9 + 85 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Formative Micro.pdf`, SHA-256 `d81b956eb2c8a26aada7ab5105d66d5a6c62a1047bfdf2a3c517b9966a3f00fc`, 4 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 87 selected inventory paths / 85 unique hashes remain untriaged.

## Completed source — Formative Micro

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Formative Micro.pdf` | `d81b956eb2c8a26aada7ab5105d66d5a6c62a1047bfdf2a3c517b9966a3f00fc` | 4 | empty-text | pages 1–4 rendered and read | CamScanner carrier of two direct formative-paper scans with blank Name/I.D. fields: pages 1–2 are headed `FORMATIVE EXAME -FHB102-2`, while pages 3–4 are headed `Formative Exam for MSK 102-2`. Neither paper shows an institution, department, examiner, date, marks, answer key or authenticated faculty mark. The assessment-paper format is stronger than a revision-bank filename, but it does not authenticate a sitting or key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–2 contain one FHB102-2 paper with Q1–Q13 as thirteen conventional MCQs followed by three numbered written prompts. Pages 3–4 contain a separate paper explicitly labelled MSK102-2 with Q1–Q10 as ten conventional MCQs followed by three numbered written prompts. Both papers end with `END OF QUESTIONS`; neither supplies highlighted selections, handwritten responses, a printed answer table or a separate key.

The full carrier boundary is **23 objective prompts / 6 written prompts / 0 prompt-matched answer observations / 29 source-absent answers / 0 practical or image / 0 teaching prompts**. The two paper labels and their independent numbering sequences are preserved. The MSK102-2-labelled second paper remains counted as visible source content while being explicitly flagged as an out-of-module-labelled segment in this FHB inventory carrier; it is not silently relabelled as FHB evidence.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The twenty-nine prompts collapse source-first into seven coherent handles. Four are already represented by completed FHB-102-2 concepts and receive no repeated search. The three surviving handles each received exactly four live-and-pending searches: **3 × 4 = 12 searches**. Every query returned no live or pending match.

| Source handle | Four search phrases or prior-module reference | Disposition |
|---|---|---|
| Bacterial structure, growth, transduction and pathogenic relationships | prior envelope/wall, growth/division, horizontal-gene-transfer and infection-relationship handles | prior-FHB-102-2 collapse |
| Exotoxins, virulence factors, clinical bacterial syndromes and antimicrobial resistance | prior virulence/toxin, clinical/laboratory bacterial-identification and antimicrobial-resistance handles | prior-FHB-102-2 collapse |
| Fungal structure and Nystatin membrane action | prior fungal structure/classification and membrane-target handles | prior-FHB-102-2 collapse |
| Viral capsid, genome and cytopathic effects | prior viral structure/genome/classification and replication/CPE handles | prior-FHB-102-2 collapse |
| HBV occupational exposure prophylaxis | `HBV needlestick post exposure prophylaxis HBIG vaccination`; `unvaccinated healthcare worker HBsAg positive exposure HBIG vaccine`; `hepatitis B occupational exposure prophylaxis`; `HBV postexposure vaccine immunoglobulin` | no live/pending match — retained new/TBD |
| Clinical viral syndromes, laboratory diagnosis and prevention across HSV, HPV, measles, varicella and mumps | `viral exanthem diagnosis HPV measles varicella HSV mumps microbiology`; `HPV genital warts types 6 11 skin tumor virus`; `Koplik spots measles varicella vesicular rash diagnosis`; `HSV laboratory diagnosis mumps prevention microbiology` | no live/pending match — retained new/TBD |
| Standard precautions and prevention of hospital-acquired infection | `standard precautions prevent hospital acquired infections`; `healthcare associated infection prevention standard precautions`; `hand hygiene PPE sharps safety standard precautions`; `nosocomial infection control measures microbiology` | no live/pending match — retained new/TBD |

Post-prior disposition is **0 live / 0 pending / 3 new**. No content record, missing-answer reconstruction, module relabelling, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This tenth one-path hash is now `sourceProcessed=true`. Its full-carrier delta is **+29 questions / +0 answers / +3 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|
| FHB 102-2 | 873 | 836 | 59 | 0 | 0 | 59 | TBD |

Removing the ten processed hashes leaves **86 selected inventory paths / 84 unique SHA-256s**. Their sorted-newline checksum is `a089077e343bb481647c15e0e26ba910af769a6b3961cdfa6c4730933a111b4b`. Remaining audit-review debt is **36 substantive-text / 23 sparse-text / 14 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`10 + 84 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Formative questions microbiology Spring 2026.pdf`, SHA-256 `f7a3192de2d21063dabcb7c1316c8e8e71b05ada37f47cb1cb4fd8759ade2bdd`, 6 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 86 selected inventory paths / 84 unique hashes remain untriaged.

## Completed source — Formative questions microbiology Spring 2026

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Formative questions microbiology Spring 2026.pdf` | `f7a3192de2d21063dabcb7c1316c8e8e71b05ada37f47cb1cb4fd8759ade2bdd` | 6 | substantive-text | pages 1–6 rendered and read | Named `Formative questions 102` revision carrier with `By / Dr Mo Haitham and Nour elganaihy` printed in every footer and March 2026 iOS Quartz metadata. The filename supplies a Spring 2026 label, but no institution, department, examiner, sitting, marks or authenticated faculty-key claim is visible. Highlighted options are source answer evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–3 contain three independent sets numbered Q1–Q8, for twenty-four conventional objective prompts. Pages 4–6 repeat the same three prompt sequences in the same order, with exactly one option highlighted yellow for every prompt. Pairing is page 1 with page 4, page 2 with page 5, and page 3 with page 6. The answer-bearing reveal pages therefore supply answer observations but do not create a second set of prompt occurrences.

The exact boundary is **24 distinct objective prompts / 24 prompt-matched highlighted source-answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**, plus twenty-four reveal-repeat prompt renderings excluded from the question count. Printed wording and academically questionable highlighted selections remain source truth without correction. In particular, the source's highlighted responses concerning dimorphic-fungus temperature, the Cryptococcus capsule, viral envelope, inactivated-vaccine production, bacterial–host relationships and fungal-versus-bacterial structure are preserved as observed rather than medically repaired.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The twenty-four prompts collapse source-first into five coherent handles. Four are already represented by completed FHB-102-2 concepts and receive no repeated search. The surviving vaccine-platform and immune-response handle received exactly four live-and-pending searches: **1 × 4 = 4 searches**. Every query returned no live or pending match.

| Source handle | Four search phrases or prior-module reference | Disposition |
|---|---|---|
| Bacterial envelope, membrane, wall, plasmid and capsule physiology | prior bacterial envelope, wall, membrane and bacterial-structure handles | prior-FHB-102-2 collapse |
| Fungal structure, dimorphism, direct diagnosis and Cryptococcus | prior fungal structure, classification and diagnostic handles | prior-FHB-102-2 collapse |
| Viral envelope, capsid and replication | prior viral structure, genome and replication handles | prior-FHB-102-2 collapse |
| Host–microbial relationships, endotoxin, exotoxin and virulence | prior infection-relationship, toxin and virulence handles | prior-FHB-102-2 collapse |
| Vaccine platforms and immune-response properties | `vaccine types live attenuated inactivated subunit toxoid cellular immunity`; `live attenuated vaccine strongest cellular immunity`; `inactivated vaccine composition production microbiology`; `vaccine platform classification immune response live killed subunit toxoid` | no live/pending match — retained new/TBD |

Post-prior disposition is **0 live / 0 pending / 1 new**. No content record, missing-answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This eleventh one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+24 questions / +24 answers / +1 concept**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 897 | 860 | 60 | 0 | 0 | 60 | TBD |

Removing the eleven processed hashes leaves **85 selected inventory paths / 83 unique SHA-256s**. Their sorted-newline checksum is `bdce7443886490fe39cf7ba9434798f41f1be46e44e0891e566866ba6039a702`. Remaining audit-review debt is **35 substantive-text / 23 sparse-text / 14 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`11 + 83 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General Bacteriology & Mycology.pdf`, SHA-256 `9b3aae1b913cff2c41851e255119bc377a6b94cf089450fa7c9805b03234be19`, 44 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 85 selected inventory paths / 83 unique hashes remain untriaged.

## Completed source — General Bacteriology & Mycology

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General Bacteriology & Mycology.pdf` | `9b3aae1b913cff2c41851e255119bc377a6b94cf089450fa7c9805b03234be19` | 44 | empty-text | pages 1–44 rendered and read | CamScanner reproduction titled `Bacteriology & Mycology & Infection Control in Health Care Sittings`, visibly attributed to Amany Tharwat Abdel Rahman, Professor of Microbiology and Immunology. No institution, module, examiner, sitting, marks or authenticated faculty-key claim is visible. The terminal answer tables are source answer evidence, not an official MUST key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 is the title cover. Pages 2–39 contain Q1–Q297 as conventional multi-option and matching items. Pages 39–42 continue with Q298–Q334 as thirty-seven true/false items. Pages 43–44 are answer-only tables that visibly enumerate every label Q1–Q334 with one answer token each. There is no separate written question, practical station, image-identification prompt, teaching passage or missing key token.

The exact boundary is **334 objective prompts / 334 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**, split **297 conventional multi-option or matching items / 37 true-or-false items**. Matching labels are independently numbered assessment occurrences and are counted once each. Page-break continuations remain one prompt occurrence. Printed spelling, deprecated terminology, internal contradictions and academically questionable answer tokens remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 334 prompts collapse source-first into eight coherent handles. Every handle is already represented by concepts established in the preceding FHB-102-2 banks, including the broad 177-question AE carrier and the module-wide microbiology/pharmacology sections. No genuinely new handle survives the gate: **0 accepted × 4 = 0 searches**.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Microbial classification, prokaryote/eukaryote distinction and bacterial morphology | prior microorganism-classification and bacterial-structure handles | prior-FHB-102-2 collapse |
| Gram-positive/negative envelopes, membrane, capsule, pili, flagella, spores, ribosomes and plasmids | prior envelope/wall/membrane and appendage/capsule/spore/plasmid handles | prior-FHB-102-2 collapse |
| Bacterial nutrition, oxygen/temperature requirements, division and growth curve | prior nutritional/environmental-growth and growth-curve/division handles | prior-FHB-102-2 collapse |
| Chromosome, mutation, transposons, conjugation, transformation, transduction and bacteriophages | prior chromosome/mutation/transposon and horizontal-gene-transfer/phage handles | prior-FHB-102-2 collapse |
| Antimicrobial principles, mechanisms, clinical uses, adverse effects, prophylaxis and resistance | prior antibacterial-pharmacology, antimicrobial-principles and resistance handles | prior-FHB-102-2 collapse |
| Normal flora, symbiosis, carriers, transmission and infectious-disease epidemiology | prior normal-flora/ecological-relationship and infection-stage/epidemiology handles | prior-FHB-102-2 collapse |
| Pathogenicity, invasion, endotoxin, exotoxin and toxoid | prior virulence, toxin, colonization and carrier handles | prior-FHB-102-2 collapse |
| Fungal cellular structure and antifungal mechanisms | prior fungal structure/classification and antifungal-target handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, missing-answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This twelfth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+334 questions / +334 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 1,231 | 1,194 | 60 | 0 | 0 | 60 | TBD |

Removing the twelve processed hashes leaves **84 selected inventory paths / 82 unique SHA-256s**. Their sorted-newline checksum is `01501d064cbdb2956ab7055cb13ca0d13d3875f09fc62c4deda233853b0743a9`. Remaining audit-review debt is **35 substantive-text / 23 sparse-text / 13 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`12 + 82 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General Virology.pdf`, SHA-256 `e783e4871dd209458fcd73b69c39fed532d4aee593fa4097c2d739b1df388def`, 20 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 84 selected inventory paths / 82 unique hashes remain untriaged.

## Completed source — General Virology

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General Virology.pdf` | `e783e4871dd209458fcd73b69c39fed532d4aee593fa4097c2d739b1df388def` | 20 | empty-text | pages 1–20 rendered and read | CamScanner reproduction headed `Medical Virology`, visibly attributed to Tahany Ahmad Abdel Raouf, Professor of Microbiology and Immunology. No institution, module, examiner, sitting, marks or authenticated faculty-key claim is visible. The answer tables are source answer evidence, not an official MUST key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 is the title cover. Pages 2–10 contain Q1–Q65 as conventional general-virology MCQs. The `Complete questions on general virology` sequence begins on page 10 and continues through page 15 as Q1–Q52; each numbered completion item is one written prompt even when it contains multiple blanks. The `True and false questions on general virology` sequence begins on page 15 and continues through page 17 as Q1–Q55. Page 17 then begins a distinct `MCQs on systemic virology` sequence containing only Q1–Q2 before the carrier ends. Page 18 provides complete answer tables for general MCQ Q1–Q65 and true/false Q1–Q55. Pages 19–20 provide numbered answers Q1–Q52 for the completion sequence. No answer is printed for the two terminal systemic-virology MCQs.

The exact boundary is **122 objective prompts / 52 written completion prompts / 172 prompt-matched answer observations / 2 source-absent answers / 0 practical or image / 0 teaching prompts**. The objective split is **65 keyed general-virology MCQs / 55 keyed true-or-false items / 2 unkeyed systemic-virology MCQs**. Multi-blank completion items remain one assessment occurrence per printed number and one prompt-matched answer observation per numbered answer line. Page-break continuations remain one occurrence. Printed spelling, deprecated terminology, internal contradictions and academically questionable answers remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 174 prompts collapse source-first into seven coherent handles. Each is already represented by concepts established in the preceding FHB-102-2 sources, including the Absalam101 and AE general-virology sections and the formative carriers. No genuinely new handle survives the gate: **0 accepted × 4 = 0 searches**.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Viral structure, envelope, capsid, genome, symmetry, defective viruses, prions and bacteriophages | prior viral structure, genome and classification handles | prior-FHB-102-2 collapse |
| Viral preservation, inactivation and environmental susceptibility | prior viral structure and preservation/inactivation question families | prior-FHB-102-2 collapse |
| Viral replication, adsorption, penetration, uncoating, assembly and release | prior viral replication and cytopathic-effect handles | prior-FHB-102-2 collapse |
| Viral cell culture, direct detection, serology, PCR and hybridization | prior viral diagnosis, culture and clinical/laboratory-detection handles | prior-FHB-102-2 collapse |
| Viral infection patterns, latency, carriers, transformation, localized/systemic spread and transmission | prior infection-stage, carrier and clinical-viral-syndrome handles | prior-FHB-102-2 collapse |
| Interferons, antibody classes, neutralization and antiviral immune response | prior viral immune-response and vaccine-platform handles | prior-FHB-102-2 collapse |
| Attenuated/inactivated vaccines, passive immunization and systemic-virus family classification | prior vaccine-platform and general-virology classification handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, missing-answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This thirteenth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+174 questions / +172 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 1,405 | 1,366 | 60 | 0 | 0 | 60 | TBD |

Removing the thirteen processed hashes leaves **83 selected inventory paths / 81 unique SHA-256s**. Their sorted-newline checksum is `6125bc441f96df6a27d82d670e67601bf265a2e42239d21b1817e42d9fa5b175`. Remaining audit-review debt is **35 substantive-text / 23 sparse-text / 12 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`13 + 81 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General_Mycology_MCQ_SAQ.pdf`, SHA-256 `a50083b794e01754d76a6a129f9f61fceeaa6775e5b2b4e93c8a10d49a42cfa2`, 5 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 83 selected inventory paths / 81 unique hashes remain untriaged.

## Completed source — General Mycology MCQ & SAQ

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - General_Mycology_MCQ_SAQ.pdf` | `a50083b794e01754d76a6a129f9f61fceeaa6775e5b2b4e93c8a10d49a42cfa2` | 5 | substantive-text | pages 1–5 rendered and read | Anonymous ReportLab-generated revision carrier headed `General Mycology - MCQs & SAQs`. No visible author, institution, department, examiner, sitting, marks, module authentication or authenticated faculty-key claim appears. The terminal answer key and model answers are source evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–4 contain thirty conventional objective prompts divided into Easy E1–E10, Medium M1–M10 and Hard H1–H10. Page 5 begins `Answer Key and Model Answers`, supplies a complete thirty-token MCQ key, then prints five numbered SAQ prompts, each immediately followed by a model answer. The five SAQs are visible assessment prompts even though they first appear on the model-answer page and are counted once each.

The exact boundary is **30 objective prompts / 5 written SAQ prompts / 35 prompt-matched answer observations / 0 source-absent answers / 0 practical or image / 0 teaching prompts**. Titles and instructions are not assessment occurrences. Printed wording, deprecated terminology and academically questionable answers remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The thirty-five prompts collapse source-first into four coherent handles. Every handle is already represented by concepts established in prior FHB-102-2 banks, so no genuinely new handle survives the gate: **0 accepted × 4 = 0 searches**.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Fungal eukaryotic structure, cell wall and membrane, morphology and classification | prior fungal structure and classification handles | prior-FHB-102-2 collapse |
| Dimorphism and yeast-versus-mould growth forms and temperatures | prior fungal dimorphism and morphology handles | prior-FHB-102-2 collapse |
| Mycological diagnosis by KOH, Gram, calcofluor, India ink, silver stain, latex antigen, Sabouraud culture, PCR and antibody | prior fungal diagnostic, culture and stain handles | prior-FHB-102-2 collapse |
| Mycosis categories, mycotoxicosis, aflatoxin and hepatic carcinoma | prior mycosis classification/pathogenesis and mycotoxicosis handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, missing-answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This fourteenth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+35 questions / +35 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 1,440 | 1,401 | 60 | 0 | 0 | 60 | TBD |

Removing the fourteen processed hashes leaves **82 selected inventory paths / 80 unique SHA-256s**. Their sorted-newline checksum is `a8e72221eda3102dfe7b14b504fa7c711038f285cbb7f569739a978cb56f9331`. Remaining audit-review debt is **34 substantive-text / 23 sparse-text / 12 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`14 + 80 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Infection control MCQs.pdf`, SHA-256 `885851eac62894e336f52ce833475e15300986b2230ef6bb6cafa409bc1b4b03`, 12 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 82 selected inventory paths / 80 unique hashes remain untriaged.

## Completed source — Infection control MCQs

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Infection control MCQs.pdf` | `885851eac62894e336f52ce833475e15300986b2230ef6bb6cafa409bc1b4b03` | 12 | empty-text | pages 1–12 rendered and read | CamScanner slice of printed book pages 31–42. Exact normalized prompt and page-layout overlap Q314–Q334 establishes it as a partial sibling of the completed professor-authored `General Bacteriology & Mycology` question-book carrier. This slice itself has no cover, institution, module, examiner, sitting, marks or authenticated key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 begins with the final options of Q313, whose stem is absent; that incomplete fragment is excluded. The page then contains complete Q314 plus six independently labelled matching occurrences Q315–Q320. The `INFECTION CONTROL` section begins at Q321 and runs continuously through Q433 on page 12. Page-break continuations Q325, Q383, Q404, Q426 and Q431 remain one occurrence each. The duplicated printed number in `430. 430.` is one prompt, not two.

The exact visible boundary is **120 complete objective prompts / 0 prompt-matched answer observations / 120 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**, split **7 complete pre-section prompts (Q314–Q320) / 113 Infection Control prompts (Q321–Q433)**. Faint boxes and underlines mark stems, distractors and whole text regions inconsistently—including demonstrably non-answer emphasis—and are not adjudicated as answer selections. Printed wording, duplicated numbering, deprecated terminology and academically questionable statements remain source truth without correction.

The first **21 complete prompts, Q314–Q334**, exactly reproduce the normalized prompt sequence already counted and keyed in the completed `General Bacteriology & Mycology` sibling. They add no questions or answer observations. Q335–Q433 are ninety-nine genuinely additional unkeyed prompts, giving a family delta of **+99 questions / +0 answers**.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 120 visible prompts collapse source-first into six coherent handles. Four are already represented by completed FHB-102-2 concepts. The two surviving handles each received exactly four live-and-pending searches: **2 × 4 = 8 searches**. Every query returned no live or pending match.

| Source handle | Four search phrases or prior-module reference | Disposition |
|---|---|---|
| Toxin mechanisms in complete Q314–Q320 | exact prior-sibling Q314–Q320 plus prior virulence/toxin handles | prior-FHB-102-2 collapse |
| Healthcare-associated infection, transmission routes and isolation precautions | exact prior-sibling Q321–Q334 plus prior standard-precautions handle | prior-FHB-102-2 collapse |
| Hand hygiene, resident/transient flora, PPE, gloves and aseptic technique | prior standard precautions and hospital-acquired-infection prevention handle | prior-FHB-102-2 collapse |
| Occupational blood exposure, sharps injury and HBV/HIV post-exposure response | prior HBV occupational-exposure and standard-precautions handles | prior-FHB-102-2 collapse |
| Cleaning, antisepsis, disinfection, sterilization, HLD and equipment classification | `sterilization disinfection decontamination high level disinfection medical equipment`; `autoclave ethylene oxide glutaraldehyde high level disinfection`; `Spaulding critical semicritical noncritical disinfection sterilization`; `antiseptic disinfectant sterilization decontamination infection control` | no live/pending match — retained new/TBD |
| Medical waste, linen, housekeeping, environmental cleaning and spill management | `medical waste sharps linen housekeeping infection control`; `healthcare waste color coding sharps red bag linen`; `environmental cleaning housekeeping blood spill chlorine healthcare`; `PPE donning doffing medical waste linen handling infection prevention` | no live/pending match — retained new/TBD |

Post-prior disposition is **0 live / 0 pending / 2 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This fifteenth one-path hash is now `sourceProcessed=true`. After the 21-prompt exact sibling collapse, its family delta is **+99 questions / +0 answers / +2 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 1,539 | 1,401 | 62 | 0 | 0 | 62 | TBD |

Removing the fifteen processed hashes leaves **81 selected inventory paths / 79 unique SHA-256s**. Their sorted-newline checksum is `0b40997928690021fd7cb0e394ce9a77d214e00e238aa436c7cc861c78d4dfff`. Remaining audit-review debt is **34 substantive-text / 23 sparse-text / 11 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`15 + 79 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - MCQ Dr.Alaa د.علاء Microbiology.pdf`, SHA-256 `0f86d7d7304363f68752bc9ed54a7c7eab4ec3d21eca3ef59c25dc08d5c5a6a7`, 12 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 81 selected inventory paths / 79 unique hashes remain untriaged.
