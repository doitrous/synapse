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

## Completed source — MCQ Dr.Alaa Microbiology

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - MCQ Dr.Alaa د.علاء Microbiology.pdf` | `0f86d7d7304363f68752bc9ed54a7c7eab4ec3d21eca3ef59c25dc08d5c5a6a7` | 12 | sparse-text | pages 1–12 rendered and read | CamScanner revision carrier headed `MCQ Dr Alaa / General Microbiology 1 & 2`. No institution, department, module, examiner, sitting, marks, date or authenticated faculty-key claim is visible. The inline answer lines are source evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 is a cover. Pages 2–12 contain ninety objective prompts with a complete printed answer line for every prompt. The section split is **Introduction/classification 14 / cell membrane and cytoplasm 6 / cell wall and toxins 22 / capsule and appendages 15 / spores 3 / bacterial pathogenesis 4 / growth and physiology 26**. The exact boundary is **90 objective prompts / 90 prompt-matched answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**.

Page 4 prints Q1, Q2, a second Q2, then Q3–Q7; both Q2 occurrences are distinct physical prompts, and the answer line separately marks `2-d` and `2'-c`. Page 11 contains conventional Q9–Q10 followed by a separately structured matching sequence Q10–Q16; both Q10 occurrences are distinct prompts, and the answer line separately marks `10-a` and `10-g`. Printed wording, duplicated numbering and academically questionable keys remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The ninety prompts collapse source-first into seven coherent handles. Every handle is already represented by concepts established in prior FHB-102-2 banks, so no genuinely new handle survives the gate: **0 accepted × 4 = 0 searches**.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Microbial classification; prokaryotes, eukaryotes, viruses, viroids and prions | prior organism-classification and noncellular-agent handles | prior-FHB-102-2 collapse |
| Bacterial membrane, wall, peptidoglycan and L-forms | prior bacterial-structure and cell-wall handles | prior-FHB-102-2 collapse |
| Endotoxin, exotoxin and toxoid properties | prior toxin-mechanism handles | prior-FHB-102-2 collapse |
| Capsule, glycocalyx, pili, flagella and spores | prior capsule, appendage and spore handles | prior-FHB-102-2 collapse |
| Opportunistic pathogens and virulence | prior pathogenicity and virulence handles | prior-FHB-102-2 collapse |
| Nutritional, oxygen and temperature growth requirements | prior bacterial growth-requirement handles | prior-FHB-102-2 collapse |
| Growth curve, binary division, energy, respiration and fermentation | prior growth-curve, division and metabolism handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This sixteenth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+90 questions / +90 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 1,629 | 1,491 | 62 | 0 | 0 | 62 | TBD |

Removing the sixteen processed hashes leaves **80 selected inventory paths / 78 unique SHA-256s**. Their sorted-newline checksum is `2225074a7571d57a71e3f107017862e5ab1559b17ca054a545f123c43d380489`. Remaining audit-review debt is **34 substantive-text / 22 sparse-text / 11 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`16 + 78 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Mcq 1.pdf`, SHA-256 `994657a11ad9f2f6192e8578cbf97e6142fc96452a0742a375b3ee86ab752ecc`, 15 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 80 selected inventory paths / 78 unique hashes remain untriaged.

## Completed source — Mcq 1

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Mcq 1.pdf` | `994657a11ad9f2f6192e8578cbf97e6142fc96452a0742a375b3ee86ab752ecc` | 15 | sparse-text | pages 1–15 rendered and read | Anonymous CamScanner revision carrier whose cover says `Micro Biology 1 MCQ Questions` and whose second bank is headed `Genetics`. No institution, department, module, examiner, sitting, marks, date, author or authenticated faculty-key claim is visible. The two printed key tables are source evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 is a cover. Pages 2–9 contain one continuous General Microbiology Q1–Q87 sequence; page 9 prints Q85–Q87 and a complete 87-token answer table. Pages 10–15 contain a separately numbered Genetics Q1–Q55 sequence; page 15 is answer-only and prints a complete 55-token table. The exact boundary is **142 objective prompts / 142 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**, split **87 General Microbiology / 55 Genetics**.

The decorative `Extra`, `Clinical` and red-X marks do not consistently indicate answer selections and are not counted as answer observations. Section headings and the terminal `Questions / Answers` artwork are not assessment occurrences. Printed wording, deprecated terminology and academically questionable answers remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 142 prompts collapse source-first into eight coherent handles. Every handle is already represented by concepts established in prior FHB-102-2 banks, especially the completed AE Microbiology bank, so no genuinely new handle survives the gate: **0 accepted × 4 = 0 searches**. The bank is a distinct carrier rather than an exact normalized prompt-sequence sibling of AE and therefore retains its full physical observation delta.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Microbial cell classification, normal flora, opportunism and pathogenicity | prior organism-classification, normal-flora and virulence handles | prior-FHB-102-2 collapse |
| Bacterial envelope, membrane, wall and wall-deficient forms | prior envelope, wall and membrane handles | prior-FHB-102-2 collapse |
| Capsule, appendages, spores, inclusions and essential cell structures | prior capsule, pili, flagella, spore and inclusion handles | prior-FHB-102-2 collapse |
| Nutritional, oxygen, temperature and pH growth requirements and growth curve | prior nutritional/environmental-growth and growth-curve handles | prior-FHB-102-2 collapse |
| Bacteriophage lytic/lysogenic cycles and lysogenic conversion | prior bacteriophage and horizontal-transfer handles | prior-FHB-102-2 collapse |
| Gene, genome, chromosome, plasmid, transposon, replication, transcription and mutation | prior bacterial-genetics and transposon/mutation handles | prior-FHB-102-2 collapse |
| Transformation, transduction and conjugation | prior horizontal-gene-transfer handle | prior-FHB-102-2 collapse |
| Gene cloning, restriction enzymes, PCR, RT-PCR and nucleic-acid probes | prior molecular-diagnostic and genetic-method handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This seventeenth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+142 questions / +142 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 1,771 | 1,633 | 62 | 0 | 0 | 62 | TBD |

Removing the seventeen processed hashes leaves **79 selected inventory paths / 77 unique SHA-256s**. Their sorted-newline checksum is `3579b95226b803b6737921cfb2027e03b0d4bf9733fe86ac4f9e8b316b38d839`. Remaining audit-review debt is **34 substantive-text / 21 sparse-text / 11 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`17 + 77 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Mcq 3.pdf`, SHA-256 `3caac35420de8faf6fcfeb9c291f2d6fcd464f5b3ebd288c5dc810defe4ed78a`, 8 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 79 selected inventory paths / 77 unique hashes remain untriaged.

## Completed source — Mcq 3

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Mcq 3.pdf` | `3caac35420de8faf6fcfeb9c291f2d6fcd464f5b3ebd288c5dc810defe4ed78a` | 8 | sparse-text | pages 1–8 rendered and read | Anonymous CamScanner revision carrier headed `Microbiology MCQ 4`, `General Bacteriology`, `Chapter 7 - Decontamination` and `Chapter 8 - Infection`. No institution, department, module, examiner, sitting, marks, date, author or authenticated faculty-key claim is visible. The terminal answer tables are source evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 is a cover. Pages 2–6 contain one continuous Q1–Q65 objective sequence: Decontamination Q1–Q38 and Infection Q39–Q65. Page 7 contains twenty independently numbered objective true/false statements. Page 8 supplies a complete 65-token MCQ key and a complete 20-token true/false key. The exact boundary is **85 objective prompts / 85 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**, split **38 Decontamination MCQs / 27 Infection MCQs / 20 true/false prompts**.

The cover, chapter headings, terminal `Questions / Answers` artwork and true/false emblem are not assessment occurrences. Printed wording, deprecated terminology and academically questionable answers remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The eighty-five prompts collapse source-first into four coherent handles. Every handle is already represented by concepts established in prior FHB-102-2 banks, especially the completed Infection Control and AE Microbiology carriers, so no genuinely new handle survives the gate: **0 accepted × 4 = 0 searches**. The bank is distinct rather than an exact normalized prompt-sequence sibling and retains its full physical observation delta.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Cleaning, disinfection, sterilization, antisepsis, disinfectant levels and chemical agents | prior equipment-decontamination and infection-control handle | prior-FHB-102-2 collapse |
| Physical and chemical sterilization methods, monitoring and equipment criticality | prior sterilization/disinfection/decontamination handle | prior-FHB-102-2 collapse |
| Colonization, carriers, epidemiological distribution, transmission, stages, pathogenicity and infectious dose | prior infection-stage, epidemiology and carrier-state handles | prior-FHB-102-2 collapse |
| Exotoxin, endotoxin, toxoid and virulence enzymes | prior toxin-mechanism and virulence handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This eighteenth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+85 questions / +85 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 1,856 | 1,718 | 62 | 0 | 0 | 62 | TBD |

Removing the eighteen processed hashes leaves **78 selected inventory paths / 76 unique SHA-256s**. Their sorted-newline checksum is `d5421719322de4419f1e13b7593920e16aaee12e9a3ff2f57585844d04b51383`. Remaining audit-review debt is **34 substantive-text / 20 sparse-text / 11 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`18 + 76 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Mcq2.pdf`, SHA-256 `40f81a419bd6c6eab30d2835ed2b029111e96ab615c3db50618c52c8448d327a`, 6 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 78 selected inventory paths / 76 unique hashes remain untriaged.

## Completed source — Mcq2

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Mcq2.pdf` | `40f81a419bd6c6eab30d2835ed2b029111e96ab615c3db50618c52c8448d327a` | 6 | sparse-text | pages 1–6 rendered and read | Anonymous CamScanner revision carrier headed only `Antimicrobial Drugs`. No institution, department, module, examiner, sitting, marks, date, author or authenticated faculty-key claim is visible. The two printed answer tables are source evidence, not an official faculty key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–4 contain one continuous Q1–Q40 objective MCQ sequence. Page 5 supplies a complete 40-token MCQ answer table and a separate complete 30-token true/false answer table. Page 6 contains the corresponding independently numbered Q1–Q30 objective true/false statements. The exact boundary is **70 objective prompts / 70 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**, split **40 antimicrobial-drug MCQs / 30 antimicrobial-drug true/false prompts**.

The page-5 `MCQ Questions` and true/false artwork are not assessment occurrences. Printed wording, deprecated terminology and academically questionable answers remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The seventy prompts collapse source-first into five coherent handles. Every handle is already represented by concepts established in prior FHB-102-2 banks, especially the completed AE, Absalam101 and Mucize carriers, so no genuinely new handle survives the gate: **0 accepted × 4 = 0 searches**. The bank is distinct rather than an exact normalized prompt-sequence sibling and retains its full physical observation delta.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Antimicrobial definitions, selective toxicity, bacteriostatic/bactericidal action and spectrum | prior antimicrobial-principles handle | prior-FHB-102-2 collapse |
| Antibacterial and antifungal drug classes, mechanisms and cellular targets | prior antimicrobial-mechanism handles | prior-FHB-102-2 collapse |
| Antimicrobial resistance mechanisms and genetic mediation | prior antimicrobial-resistance handle | prior-FHB-102-2 collapse |
| Susceptibility testing, MIC/MBC, combination effects and prophylaxis | prior susceptibility-testing and antimicrobial-use handles | prior-FHB-102-2 collapse |
| Clinical uses, adverse effects and contraindications of antimicrobial agents | prior antimicrobial-clinical-use handle | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This nineteenth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+70 questions / +70 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 1,926 | 1,788 | 62 | 0 | 0 | 62 | TBD |

Removing the nineteen processed hashes leaves **77 selected inventory paths / 75 unique SHA-256s**. Their sorted-newline checksum is `ffec53d1ef02649300a0f879060cc2812c427008448bd7a817b52007cf3dd58b`. Remaining audit-review debt is **34 substantive-text / 19 sparse-text / 11 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`19 + 75 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Micro and Immune Questions by Dr.Hesham [103].pdf`, SHA-256 `a3f83755f7a4921fd2bb614a3827af3a4bde8e86b40ce595e0d74dd30f578100`, 49 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 77 selected inventory paths / 75 unique hashes remain untriaged.

## Completed source — Micro and Immune Questions by Dr.Hesham [103]

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Micro and Immune Questions by Dr.Hesham [103].pdf` | `a3f83755f7a4921fd2bb614a3827af3a4bde8e86b40ce595e0d74dd30f578100` | 49 | empty-text | pages 1–49 rendered and read | Named revision bank headed `Microbiology and Immunology Questions`, watermarked `Dr Hesham` and signed `Dr. Hesham Esmat`. No institution, department, module authentication, examiner, sitting, marks, date or authenticated faculty-key claim is visible. The terminal answer tables are source evidence, not an official MUST key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–22 contain General Bacteriology Q1–Q185. Pages 23–47 continue the same document-wide numbering with Immunology Q186–Q403. Of the **403 objective prompts**, Q1–Q137 and Q186–Q360 are **312 conventional MCQs**, while Q138–Q185 and Q361–Q403 are **91 independently numbered matching or association prompts**. Pages 48–49 contain terminal answer tables only for Q1–Q399. The exact boundary is therefore **403 objective prompts / 399 prompt-matched printed answer observations / 4 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**. Q400–Q403 remain visibly unkeyed and no answers are inferred.

Matching and association labels are independent numbered assessment occurrences rather than one inseparable composite. Page-break continuations remain one prompt. Headings, instructions and the terminal sign-off are not assessment occurrences. The printed omission of a Chapter 8 heading in the bacteriology progression, spelling, deprecated terminology and academically questionable questions or answer tokens remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The 403 prompts collapse source-first into sixteen coherent handles. Every handle is already represented by concepts established in the prior module-wide, bacteriology, virology, mycology, infection-control and formative carriers, so no genuinely new handle survives the gate: **0 accepted × 4 = 0 searches**. This is a distinct carrier rather than an exact normalized prompt-sequence sibling and therefore retains its full physical observation delta.

| Source handle | Prior-FHB-102-2 reference | Disposition |
|---|---|---|
| Bacterial morphology, classification, envelope, capsule, pili and spores | prior bacterial-structure and envelope handles | prior-FHB-102-2 collapse |
| Growth, metabolism, nutrition and environmental requirements | prior bacterial-growth and physiology handles | prior-FHB-102-2 collapse |
| Bacteriophages, lysogeny and phage conversion | prior bacteriophage and lysogenic-conversion handles | prior-FHB-102-2 collapse |
| Plasmids, mutation and horizontal gene transfer | prior bacterial-genetics handles | prior-FHB-102-2 collapse |
| Antimicrobial action, susceptibility testing, resistance, combinations and prophylaxis | prior antimicrobial-principles and resistance handles | prior-FHB-102-2 collapse |
| Virulence, toxins, infection stages, carriers and epidemiology | prior virulence, toxin and infection handles | prior-FHB-102-2 collapse |
| General virology structure, replication, pathogenesis and antiviral control | prior general-virology handles | prior-FHB-102-2 collapse |
| General mycology morphology, reproduction and antifungal principles | prior general-mycology handles | prior-FHB-102-2 collapse |
| Innate/adaptive immunity, leukocytes, lymphoid organs and phagocytosis | prior immune-response and host-defense handles | prior-FHB-102-2 collapse |
| Antigens, haptens, immunogenicity and antigenic determinants | prior antigen/immunogenicity handles | prior-FHB-102-2 collapse |
| T cells, MHC, antigen presentation, activation, superantigens and NK cells | prior cellular-immunity handles | prior-FHB-102-2 collapse |
| Cytokines, Th1/Th2 responses and interferons | prior cytokine and antiviral-immunity handles | prior-FHB-102-2 collapse |
| B cells, antibody responses, immunoglobulins, opsonization and ADCC | prior humoral-immunity and antibody handles | prior-FHB-102-2 collapse |
| Complement pathways, regulation and biological effects | prior complement handles | prior-FHB-102-2 collapse |
| Active/passive immunity, vaccination and immunization schedules | prior vaccine-platform and immune-response handles | prior-FHB-102-2 collapse |
| Host defense against bacterial, viral and fungal pathogens | prior pathogen-specific host-defense handles | prior-FHB-102-2 collapse |

Post-prior disposition is **0 live / 0 pending / 0 new**. No content record, answer reconstruction, medical correction, placement or catalogue entry was created.

### Completed-source delta, cumulative totals and next source

This twentieth one-path hash is now `sourceProcessed=true`. Its distinct-bank delta is **+403 questions / +399 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 2,329 | 2,187 | 62 | 0 | 0 | 62 | TBD |

Removing the twenty processed hashes leaves **76 selected inventory paths / 74 unique SHA-256s**. Their sorted-newline checksum is `c3c08ac1930e1cff6adc0cab7e4886d7e5e57796103366b34abbe232810050a1`. Remaining audit-review debt is **34 substantive-text / 19 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`20 + 74 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Virology_60MCQ_10SAQ.pdf`, SHA-256 `c425f8a253501a3f6712c64895221953df8961fd60f8326bed5fcf33453ca810`, 10 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 76 selected inventory paths / 74 unique hashes remain untriaged.

## Completed source — Virology_60MCQ_10SAQ

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - Virology_60MCQ_10SAQ.pdf` | `c425f8a253501a3f6712c64895221953df8961fd60f8326bed5fcf33453ca810` | 10 | substantive-text | pages 1–10 rendered and read | Anonymous ReportLab-generated revision carrier titled `General Virology 2025 — Question Bank`, created in February 2026. No author, institution, department, module authentication, examiner, sitting, marks or authenticated faculty-key claim is visible. The terminal key and inline model answers are source evidence, not an official MUST key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–4 contain Set 1 E1–E10, M11–M20 and H21–H30. Pages 5–8 contain Set 2 E31–E40, M41–M50 and H51–H60. Page 9 contains ten independently numbered written SAQs, each immediately paired with a model answer. Page 10 supplies a complete sixty-token MCQ answer key. The exact boundary is **60 objective MCQs / 10 written SAQs / 70 prompt-matched answer observations / 0 source-absent answers / 0 practical or image / 0 teaching prompts**.

SAQ1/SAQ6, SAQ2/SAQ7, SAQ3/SAQ8 and SAQ4/SAQ10 are repeated or near-repeated physical prompts and remain distinct assessment occurrences. Headings and difficulty labels are not prompts. The title year 2025 and PDF creation date in 2026 are preserved without inferring a sitting, and printed wording or academically questionable answers remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The seventy prompts collapse source-first into six handles: viral structure/genomes/classification; envelope stability and virucidal agents; replication, eclipse and tropism; laboratory diagnosis and serology; culture effects, haemadsorption, interference, transformation and neutralization; and viral/immunoglobulin examples. All six are established by the prior General Virology, Micro–Immune and module-wide carriers, so **0 accepted × 4 = 0 searches**. This bank is distinct rather than an exact normalized prompt-sequence sibling. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This twenty-first one-path hash is now `sourceProcessed=true`, adding **+70 questions / +70 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 2,399 | 2,257 | 62 | 0 | 0 | 62 | TBD |

Removing the twenty-one processed hashes leaves **75 selected inventory paths / 73 unique SHA-256s**. Their sorted-newline checksum is `a8b3a940543ff395c0c4dcf4f0d7c93b27c9fff92f9f209fb9a75341ba762cc6`. Remaining audit-review debt is **33 substantive-text / 19 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`21 + 73 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - bacterial genetics MCQs.pdf`, SHA-256 `802d971b877b6af90552beb6760e05b95cab046cc4de2971f13f8e3a01ef9f43`, 3 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 75 selected inventory paths / 73 unique hashes remain untriaged.

## Completed source — bacterial genetics MCQs

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - bacterial genetics MCQs.pdf` | `802d971b877b6af90552beb6760e05b95cab046cc4de2971f13f8e3a01ef9f43` | 3 | substantive-text | pages 1–3 rendered and read | PowerPoint-generated `Micro MCQs / Bacterial genetics (FHB-2)` revision carrier visibly credited `By: Asma S.E`, with matching author metadata. No institution, department, module authentication, examiner, sitting, marks, date or authenticated faculty-key claim is visible. Inline answer lists are source evidence, not an official MUST key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–3 contain one continuous Q1–Q30 sequence and complete inline answer lists after Q9, Q20 and Q30. Q17–Q20 are four independently numbered matching prompts. The exact boundary is **30 objective prompts / 30 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**, split **26 conventional MCQs / 4 matching prompts**.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The bank collapses into four handles: bacterial genetic elements and variation; transformation/conjugation/transduction; lytic and lysogenic phage cycles/conversion; and recombinant-DNA methods plus resistance-bearing elements. All are established by prior module-wide and bacterial-genetics banks, so **0 accepted × 4 = 0 searches**. It is distinct rather than an exact normalized prompt sibling. Post-prior disposition is **0 live / 0 pending / 0 new**. Printed spelling, `conjunction` for conjugation, `contagious` for transposable and academically questionable wording or answer tokens remain source truth without correction.

### Completed-source delta, cumulative totals and next source

This twenty-second one-path hash is now `sourceProcessed=true`, adding **+30 questions / +30 answers / +0 concepts**.

| Module | Questions triaged | Answers recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|---:|---:|---:|---:|---:|---:|---|
| FHB 102-2 | 2,429 | 2,287 | 62 | 0 | 0 | 62 | TBD |

Removing the twenty-two processed hashes leaves **74 selected inventory paths / 72 unique SHA-256s**. Their sorted-newline checksum is `a561317b32bdcb910a35b68faf00ff33d51c12a2c4a6b2719d319cd0c63d6b2b`. Remaining audit-review debt is **32 substantive-text / 19 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`22 + 72 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - bacterial growth mcqs.pdf`, SHA-256 `99c432be9bba05e5b9cef41f9baa4d6ed2587fe2a8281ec93afafc19c5b52438`, 4 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 74 selected inventory paths / 72 unique hashes remain untriaged.

## Completed source — bacterial growth mcqs

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - bacterial growth mcqs.pdf` | `99c432be9bba05e5b9cef41f9baa4d6ed2587fe2a8281ec93afafc19c5b52438` | 4 | substantive-text | pages 1–4 rendered and read | PowerPoint-generated `Micro MCQs / Bacterial growth (FHB-2)` revision carrier visibly credited `By: Asma S.E`, with matching author metadata. No institution, department, module authentication, examiner, sitting, marks, date or authenticated faculty-key claim is visible. Inline answer lists are source evidence, not an official MUST key. |

### Exact boundary and search gate

Pages 1–4 contain Q1–Q40 with complete inline answer lists after Q12, Q20, Q32 and Q40. Q36–Q39 are four independent matching prompts; Q15 is one image-supported growth-curve MCQ. The exact boundary is **40 objective prompts / 40 prompt-matched answer observations / 0 absent answers / 0 written / 1 practical or image-supported / 0 teaching prompts**, split **36 conventional MCQs / 4 matching prompts**.

Four source-first handles cover nutritional classification and requirements; oxygen relationships and protective enzymes; environmental temperature/salinity/CO2 requirements; and growth-curve phases, generation and clinical correlation. All collapse to prior FHB-102-2 concepts, so **0 accepted × 4 = 0 searches** and post-prior disposition is **0 live / 0 pending / 0 new**. Printed wording and questionable answer tokens remain source truth.

### Completed-source delta, cumulative totals and next source

This twenty-third one-path hash is now `sourceProcessed=true`, adding **+40 questions / +40 answers / +0 concepts**. Cumulative triage is **2,469 questions / 2,327 answers / 62 concepts**.

Removing the twenty-three processed hashes leaves **73 selected inventory paths / 71 unique SHA-256s**. Their sorted-newline checksum is `98fa968d2b4f382089177f59f4a1ee1dfd81d94742582e880517966698b4dc54`. Remaining audit-review debt is **31 substantive-text / 19 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`23 + 71 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - general bacteria part 2 MCQs.pdf`, SHA-256 `86b794ed659d725a5d2a2f236a11bf14760c26e326febfb9fdbbbff8e5322e5c`, 8 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 73 selected inventory paths / 71 unique hashes remain untriaged.

## Completed source — general bacteria part 2 MCQs

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - general bacteria part 2 MCQs.pdf` | `86b794ed659d725a5d2a2f236a11bf14760c26e326febfb9fdbbbff8e5322e5c` | 8 | substantive-text | pages 1–8 rendered and read | Named Dr. Kh. Mowafy General Bacteriology lecture/revision carrier labelled `2020-2021`, with a `General microbiology 2021` section headed `MCQs (previous exams)`. No institution, department, FHB 102-2 module authentication, exam sitting, marks, examiner signature or authenticated faculty-key claim is visible. The Q1–Q24 answer table is source answer evidence, not an official MUST key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Page 1 is a non-assessment cover. Pages 2–5 contain one General microbiology 2021 Q1–Q24 objective sequence; page 6 begins with its complete twenty-four-token answer table. Pages 6–8 then contain eight independently numbered unkeyed `Mowafiat` objective prompts, including one image-supported growth-curve prompt at Q4. Page 8 ends with six independently numbered unkeyed written prompts. The exact boundary is **32 objective MCQs / 6 written prompts / 24 prompt-matched printed answer observations / 14 source-absent answers / 1 image-supported / 0 teaching prompts**.

The printed `previous exams` heading and dated written-item annotations are preserved as source claims without authenticating an exam sitting. Duplicate option labels, spelling, the Arabic note at General microbiology Q19 and academically questionable wording or answer tokens remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The thirty-eight prompts collapse source-first into seven coherent handles: bacterial nutrition and growth factors; bacterial growth curve, oxygen relationships and clinical correlations; exotoxin/endotoxin plus bacterial products and enzymes; flagella, pili, capsule and adherence; spores and sporulation; Gram-positive versus Gram-negative envelope/peptidoglycan; and aerobic/anaerobic classification plus oxidative protective enzymes. All seven are established by prior module-wide, General Bacteriology & Mycology, Dr Alaa and bacterial-growth carriers, so **0 accepted × 4 = 0 searches**. The carrier is distinct rather than an exact normalized prompt-sequence sibling. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This twenty-fourth one-path hash is now `sourceProcessed=true`, adding **+38 questions / +24 answers / +0 concepts**. Cumulative triage is **2,507 questions / 2,351 answers / 62 concepts**.

Removing the twenty-four processed hashes leaves **72 selected inventory paths / 70 unique SHA-256s**. Their sorted-newline checksum is `44bd73392491c1c88610358c1011f49aafa5784ac922af65822f91dea44b6072`. Remaining audit-review debt is **30 substantive-text / 19 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`24 + 70 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - mcq all.pdf`, SHA-256 `d2c8016367c7ae6d5715097aa5845c2011f522daa64738dd3ece18ab7512edaa`, 12 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 72 selected inventory paths / 70 unique hashes remain untriaged.

## Completed source — mcq all

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/05 MCQs/MCQs - mcq all.pdf` | `d2c8016367c7ae6d5715097aa5845c2011f522daa64738dd3ece18ab7512edaa` | 12 | substantive-text | pages 1–12 rendered and read | Anonymous Microsoft Word/python-docx revision bank created in June 2025. No author, institution, department, FHB 102-2 module authentication, examiner, sitting, marks or authenticated faculty-key claim is visible. Inline green-check answers are source answer evidence, not an official MUST key. |

### Exact prompt, answer, written, practical, image and teaching boundary

Pages 1–7 contain one numbered `30 MCQs with Answers` sequence. Pages 7–12 contain a separately numbered `20 Case-Based MCQs with Answers` sequence. Every prompt carries one inline `Answer` token. The exact boundary is **50 objective MCQs / 50 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**, split **30 conventional / 20 case-based MCQs**.

The two independently numbered sections remain distinct physical assessment sequences. Case stems and conventional items that test the same concept remain separate physical prompt occurrences. Printed wording, simplified clinical claims and academically questionable answer tokens remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

The fifty prompts collapse source-first into seven coherent handles: bacterial genetics and resistance mechanisms; bacterial growth, nutrition and oxygen relationships; antibacterial mechanisms, classes, adverse effects and resistance; antiviral mechanisms, uses and adverse effects; bacteriophage structure and transduction; clinical bacteriology and healthcare-associated infection; and medical mycology plus antifungal therapy. All seven are established by prior module-wide, General Bacteriology & Mycology, General Virology, Micro–Immune, antimicrobial and bacterial-genetics/growth carriers, so **0 accepted × 4 = 0 searches**. The bank is distinct rather than an exact normalized prompt-sequence sibling. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This twenty-fifth one-path hash is now `sourceProcessed=true`, adding **+50 questions / +50 answers / +0 concepts**. Cumulative triage is **2,557 questions / 2,401 answers / 62 concepts**.

Removing the twenty-five processed hashes leaves **71 selected inventory paths / 69 unique SHA-256s**. Their sorted-newline checksum is `0c3b43f8f876c4b3d60979d53532ea8d2fb8aca511776d1f06bfa89a3e484663`. Remaining audit-review debt is **29 substantive-text / 19 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`25 + 69 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM - FHB102 FINAL REVISION 2025.pdf`, SHA-256 `eb83aed17e5e468bc64ed11774fa1ccc548bb7c3c28ebe96f90e37d97d7e7bc8`, 52 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 71 selected inventory paths / 69 unique hashes remain untriaged.

## Completed source — FHB102 FINAL REVISION 2025

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM - FHB102 FINAL REVISION 2025.pdf` | `eb83aed17e5e468bc64ed11774fa1ccc548bb7c3c28ebe96f90e37d97d7e7bc8` | 52 | sparse-text | pages 1–52 rendered and read | Official MUST College of Medicine `Microbiology & Immunology department` `Final Practical Revision` deck for FHB102-2, visibly authenticated by university, college and department branding. This is high-authority departmental teaching/revision evidence, not an exam sitting, question paper or answer key. |

### Exact assessment, practical, image and teaching boundary

Page 1 is the official title slide and page 2 is the institutional vision/mission slide. Pages 3–17 are fifteen fully labelled PPE, sharps, waste-segregation and hand-hygiene reference slides. Pages 18–30 are thirteen fully labelled microscopy, bacterial-morphology and staining reference slides. Pages 31–51 are twenty-one fully labelled culture-media, colony, sterilization and disinfection reference slides. Page 52 is a `GOOD LUCK` closer.

The labels are already-revealed teaching content rather than image-identification prompts or prompt→reveal pairs. The exact boundary is therefore **0 objective prompts / 0 written prompts / 0 practical or image assessment prompts / 0 prompt-matched answer observations / 0 source-absent answers / 49 teaching-reference slides**. The filename year 2025 and `Final Practical Revision` title are preserved without inferring an exam sitting, and no questions or keys are reverse-engineered from teaching labels.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

No assessment prompt is printed, so there is **0 source-first assessment handle / 0 accepted handle / 0 searches**. The exactly-four-search gate does not trigger. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This twenty-sixth one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **2,557 questions / 2,401 answers / 62 concepts**.

Removing the twenty-six processed hashes leaves **70 selected inventory paths / 68 unique SHA-256s**. Their sorted-newline checksum is `49e5c3ece78c05e0b305f433c1ac63ac1e5a6f7b1e015463a6db664554e780a0`. Remaining audit-review debt is **29 substantive-text / 18 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`26 + 68 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM - General Characteristics of Medically Important Bacteria (Final).pdf`, SHA-256 `7382438a5e045c543427c3b242ee0274b8498e6f2b7cad6db1b93decf7665072`, 1 page, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 70 selected inventory paths / 68 unique hashes remain untriaged.

## Completed source — General Characteristics of Medically Important Bacteria (Final)

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM - General Characteristics of Medically Important Bacteria (Final).pdf` | `7382438a5e045c543427c3b242ee0274b8498e6f2b7cad6db1b93decf7665072` | 1 | substantive-text | page 1 rendered and read at original resolution | Single-page Canva teaching mind map visibly signed `AHMED ASHOUR`, with matching individual author metadata. No institution, department, FHB 102-2 authentication, examiner, sitting, marks or authenticated faculty-key claim is visible; the filename `Final` label does not establish assessment authority. |

### Exact assessment, practical, image and teaching boundary

The page is one fully labelled comparison mind map with five reference cards: Actinomyces, Nocardia, Pseudomonas aeruginosa, Clostridium perfringens and Pasteurella multocida. Each card already reveals gram/morphology, oxygen relationship, habitat, disease and virulence facts. These are teaching facts rather than prompts, image-identification tasks or prompt→reveal pairs.

The exact boundary is **0 objective prompts / 0 written prompts / 0 practical or image assessment prompts / 0 prompt-matched answer observations / 0 source-absent answers / 5 teaching-reference cards**. The filename `Final` label is preserved without inferring an exam sitting. Printed spelling, organism descriptors and academically questionable claims remain source truth without correction.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

No assessment prompt is printed, so there is **0 source-first assessment handle / 0 accepted handle / 0 searches**. The exactly-four-search gate does not trigger. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This twenty-seventh one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **2,557 questions / 2,401 answers / 62 concepts**.

Removing the twenty-seven processed hashes leaves **69 selected inventory paths / 67 unique SHA-256s**. Their sorted-newline checksum is `7ed42c809923cb27ffeca3f1ff511fdc1287e231dab96d4ab5c1d3340e061293`. Remaining audit-review debt is **28 substantive-text / 18 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`27 + 67 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM - Micro FHB102-2 & MSK102-2 Subjects of Exam Final Spring 2025.pdf`, SHA-256 `3e0a1510ac1eee19dffd8c66c764b31ba5d9ba32c9a1327ba769cc45a26b8be5`, 3 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 69 selected inventory paths / 67 unique hashes remain untriaged.

## Completed source — Micro FHB102-2 & MSK102-2 Subjects of Exam Final Spring 2025

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM - Micro FHB102-2 & MSK102-2 Subjects of Exam Final Spring 2025.pdf` | `3e0a1510ac1eee19dffd8c66c764b31ba5d9ba32c9a1327ba769cc45a26b8be5` | 3 | substantive-text | pages 1–3 rendered and read | Official MUST Faculty of Medicine Microbiology & Immunology department Final Spring 2025 written-exam scope notice, visibly branded and signed by the department head. It is authoritative for exam format and syllabus scope, not a question paper, sitting capture or answer key. PDF title metadata says `Zagazig University`, conflicting with the visible MUST document; visible source content governs and the conflict remains preserved. |

### Exact FHB-versus-MSK scope and assessment boundary

Page 1 is the in-scope `FHB-102-2` blueprint. It declares single-best-answer MCQs as 70% of marks and short-answer questions as 30%, with five syllabus topic groups: antimicrobial drugs; bacterial growth/physiology; bacterial genetics; infection control; and general characteristics of five named medically important bacteria. Pages 2–3 are an explicitly separate `MSK-102-2` blueprint and are excluded from the FHB content scope.

Neither module section prints a question, answer, practical/image task or reveal pair. The exact FHB boundary is **0 objective prompts / 0 written prompts / 0 practical or image prompts / 0 prompt-matched answer observations / 0 source-absent answers / 1 official exam-blueprint notice**. Topic bullets and percentages are not counted as questions or answers.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

No assessment prompt is printed, so there is **0 source-first assessment handle / 0 accepted handle / 0 searches**. The exactly-four-search gate does not trigger. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This twenty-eighth one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **2,557 questions / 2,401 answers / 62 concepts**.

Removing the twenty-eight processed hashes leaves **68 selected inventory paths / 66 unique SHA-256s**. Their sorted-newline checksum is `ae4e2524dbfa41c74c7a1a7628b1fa3b8f580850f588783e6ae38b7b4f4da2a1`. Remaining audit-review debt is **27 substantive-text / 18 sparse-text / 10 empty-text / 11 audit-not-found / 2 audit-extract-failed rows**, and unique-hash accounting is **`28 + 66 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM - [Empty] FHB102 FINAL REVISION 2025.pdf`, SHA-256 `6f8c8d58b36dce48323583f692c5774aed8593e6fa3d22305068d4a3036b3901`, 52 pages, with an audit-extract-failed sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 68 selected inventory paths / 66 unique hashes remain untriaged.

## Completed source — [Empty] FHB102 FINAL REVISION 2025

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM - [Empty] FHB102 FINAL REVISION 2025.pdf` | `6f8c8d58b36dce48323583f692c5774aed8593e6fa3d22305068d4a3036b3901` | 52 | audit-extract-failed | pages 1–52 rendered and read | PDFium-generated image/flattened carrier of the official MUST College of Medicine Microbiology & Immunology department `Final Practical Revision` deck. The audit text extraction fails and emits repeated unknown `ExtGState GS17` diagnostics, but every page renders and the complete visual sequence is a near-exact sibling of completed SHA-256 `eb83aed17e5e468bc64ed11774fa1ccc548bb7c3c28ebe96f90e37d97d7e7bc8`. The carrier is neither blank nor corrupt. |

### Exact visual-sibling, assessment and teaching boundary

All 52 corresponding pages were compared after independent 160-dpi rendering. Resized-RGB mean absolute error ranges from **0.091–3.269/255**, with an overall mean of **1.569/255**. The complete ordered boundary matches the completed departmental sibling: page 1 official cover, page 2 institutional vision/mission, pages 3–51 **49 fully labelled practical-reference teaching slides**, and page 52 good-luck closer.

Because every reference image is already labelled and no question or reveal sequence is printed, the exact assessment boundary is **0 objective prompts / 0 written prompts / 0 practical or image assessment prompts / 0 prompt-matched answer observations / 0 source-absent answers / 49 teaching-reference slides**. The inventory filename `[Empty]` and audit-extract-failed label describe extraction state rather than visible content; repeated extraction diagnostics remain preserved without treating the readable pages as corrupt.

### Source-first handles, prior-FHB-102-2 collapse and exactly-four-search gate

No assessment prompt is printed, so there is **0 source-first assessment handle / 0 accepted handle / 0 searches**. The already completed visual sibling supplies the family reconciliation, and the exactly-four-search gate does not trigger. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This twenty-ninth one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **2,557 questions / 2,401 answers / 62 concepts**.

Removing the twenty-nine processed hashes leaves **67 selected inventory paths / 65 unique SHA-256s**. Their sorted-newline checksum is `2a980bf22eeb69899b7967378f1a2b02dfec903c915da58ee01c2ef85c920da1`. Remaining audit-review debt is **27 substantive-text / 18 sparse-text / 10 empty-text / 11 audit-not-found / 1 audit-extract-failed row**, and unique-hash accounting is **`29 + 65 = 94`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM MCQs - Final OSPE Simulation FHB102_Mucize Doctors.pdf`, SHA-256 `9d8fd6b6b5d51ccc5049efc430daa26267f57ac04dc11717686cfad21af7edf1`, 18 pages, with a sparse-text audit sample. This SHA is the recorded exact three-path duplicate family also stored under the Parasitology and Pharmacology `06 EOM Exams` folders; it will be read once and all three inventory paths reconciled together.

**BLOCKED — S1 cannot be approved:** 67 selected inventory paths / 65 unique hashes remain untriaged.

## Completed three-path family — Final OSPE Simulation FHB102_Mucize Doctors

| Inventory path | SHA-256 | Pages | Audit class | Disposition |
|---|---|---:|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM MCQs - Final OSPE Simulation FHB102_Mucize Doctors.pdf` | `9d8fd6b6b5d51ccc5049efc430daa26267f57ac04dc11717686cfad21af7edf1` | 18 | sparse-text | canonical read-once carrier |
| `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM MCQs - Final OSPE Simulation FHB102_Mucize Doctors.pdf` | `9d8fd6b6b5d51ccc5049efc430daa26267f57ac04dc11717686cfad21af7edf1` | 18 | sparse-text | bitwise-identical duplicate path; reconciled without rereading or recounting |
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM MCQs - Final OSPE Simulation FHB102_Mucize Doctors.pdf` | `9d8fd6b6b5d51ccc5049efc430daa26267f57ac04dc11717686cfad21af7edf1` | 18 | sparse-text | bitwise-identical duplicate path; reconciled without rereading or recounting |

All three files are 1,113,272 bytes and bitwise identical. The canonical carrier was rendered and read on pages 1–18. It is a student-team Mucize Doctors `TRIAL MODEL` visibly credited to Youssef BenAhmed, Maii Mahmoud and Abdelsalam Mohamed. No MUST university, college or department authentication, examiner, sitting, marks or authenticated faculty-key claim is visible; the page-18 answers are source answer evidence rather than an official key.

### Exact objective, written, practical, image and answer boundary

Pages 1–2 are the cover and trial-model introduction. Pages 3–17 contain fifteen stations, each with separately lettered A and B prompts. Stations 1–10 use ten image plates and contribute **20 image-dependent practical prompts**. Stations 11–15 contribute **10 text-only practical prompts**. Page 18 supplies one matched source answer for each A/B prompt.

The exact family boundary counted once is **0 ordinary objective MCQs / 0 standalone written prompts / 30 practical prompts / 30 prompt-matched source answer observations / 0 source-absent answers / 0 teaching prompts**. A prompt requesting multiple examples or effects remains one physical A/B prompt occurrence and one matched answer observation.

Preserved source defects include: Station 1 asks for a slide name but its answer supplies morphology rather than an organism identity; Station 4 asks for a disposal site but answers `Incineration`; Station 5 asks for one or two sterilization methods but supplies one method class/example; Station 9 neither asks nor supplies an organism identity while mixing adult-abdomen and posterior-spiracle features; and the printed forms `Corynebacterium Diphtheria`, `Male anopheles`, generic `Topoisomerase`, plus simplified or questionable pharmacology claims remain uncorrected.

### Source-first handles and prior-FHB-102-2 collapse

The thirty physical prompts collapse into twenty coherent source-first handles. Every handle is already represented in the completed FHB-102-2 evidence, so none survives the external search gate.

| Source-first handle | Prior-FHB-102-2 disposition |
|---|---|
| Gram morphology and stain | prior morphology/staining handle |
| Loeffler medium type and use | prior culture-media handle |
| Dark-ground microscopy and use | prior microscopy handle |
| Infectious-waste bag and disposal | prior medical-waste/infection-control handle |
| IV line identification and sterilization | prior sterilization/decontamination handle |
| Xenopsylla identification and morphology | prior arthropod-morphology/vector handle |
| Male Anopheles identification and morphology | prior mosquito-morphology handle |
| Trematoda classification and morphology | prior parasite-classification handle |
| Myiasis-fly abdomen and posterior spiracles | prior arthropod-morphology handle |
| Chagas disease and vector | prior vector-transmission handle |
| Antifungal ergosterol target | prior antifungal-mechanism handle |
| Beta-lactam examples | prior beta-lactam handle |
| Piperacillin–tazobactam combination | prior beta-lactam combination handle |
| Clarithromycin dysgeusia | prior macrolide adverse-effect handle |
| Cephalosporin uses | prior cephalosporin handle |
| Vancomycin adverse effects | prior vancomycin handle |
| Neomycin toxicity | prior aminoglycoside handle |
| Penicillin cell-wall mechanism | prior penicillin/cell-wall handle |
| Fluoroquinolone topoisomerase mechanism | prior fluoroquinolone mechanism handle |
| Clindamycin uses | prior clindamycin handle |

Search arithmetic is therefore **20 source-first − 20 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-family delta, cumulative totals and next source

This thirtieth unique hash consumes all three selected inventory paths as one content object and is now `sourceProcessed=true`, adding **+30 questions / +30 answers / +0 concepts** once. Cumulative triage is **2,587 questions / 2,431 answers / 62 concepts**.

Removing the thirty processed hashes leaves **64 selected inventory paths / 64 unique SHA-256s**. Their sorted-newline checksum is `4e5219910672e58ece12c7b4494ae9acefc355c5a6a7b16f92fbb242bec1196c`. Remaining audit-review debt is **27 substantive-text / 15 sparse-text / 10 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`30 + 64 = 94`** and path accounting is **`32 + 64 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM MCQs - Microbiology FHB102-2 Questions (Final).pdf`, SHA-256 `de82a2be9297f187ff00807a2769b02a8c31cc4d8f9a0a5deb28fb4ad1067c9e`, 40 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 64 selected inventory paths / 64 unique hashes remain untriaged.

## Completed source — Microbiology FHB102-2 Questions (Final)

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/06 EOM Exams/EOM MCQs - Microbiology FHB102-2 Questions (Final).pdf` | `de82a2be9297f187ff00807a2769b02a8c31cc4d8f9a0a5deb28fb4ad1067c9e` | 40 | substantive-text | pages 1–40 rendered and read | Individual Absalam101 Microsoft Word revision bank whose metadata identifies `200057470-Abdel Salam Muhammad Abdel Salam Mahmoud`. No MUST university, college or department authentication, examiner, sitting, marks or authenticated faculty-key claim is visible; the answer tables are source answer evidence rather than an official key. |

### Exact objective, written, practical, image and answer boundary

The source contains five independently numbered conventional MCQ sections with complete source answer tables:

| Section | Question pages | Answer page | Objective prompts | Source answers |
|---|---|---:|---:|---:|
| Bacterial Growth | 1–8 | 9 | 30 | 30 |
| Bacterial Genetics | 10–17 | 17 | 30 | 30 |
| Antimicrobial | 18–25 | 25 | 30 | 30 |
| General Characters of Medically Important Bacteria | 26–30 | 31 | 20 | 20 |
| Principles of Infection Prevention and Control | 32–39 | 40 | 30 | 30 |

The exact boundary is **140 objective prompts / 140 prompt-matched printed answer observations / 0 written prompts / 0 practical or image prompts / 0 source-absent answers / 0 teaching prompts**. The cover's printed claim of `120 Questions` conflicts with the five visible section counts totaling 140 and is preserved rather than used for counting. Printed capitalization, spelling, organism descriptions and academically questionable questions or answer tokens remain source truth without correction.

### Source-first handles and prior-FHB-102-2 collapse

The 140 physical prompts collapse into fourteen coherent source-first handles. Every handle is already represented in completed FHB-102-2 evidence, so none survives the external search gate.

| Source-first handle | Prior-FHB-102-2 disposition |
|---|---|
| Bacterial growth curve and generation time | prior bacterial-growth handle |
| Bacterial nutritional and environmental growth requirements | prior growth-requirements handle |
| Bacterial oxygen relationships and reactive-oxygen detoxification | prior oxygen-relationship handle |
| Plasmids, transposons, bacteriophages and lysogenic conversion | prior bacterial-genetics handle |
| Mutation, variation and horizontal gene transfer | prior mutation/gene-transfer handle |
| Recombinant DNA, genetic engineering and gene therapy | prior genetic-engineering handle |
| Antimicrobial classes, mechanisms and adverse effects | prior antimicrobial handle |
| Antimicrobial resistance mechanisms and stewardship | prior resistance/stewardship handle |
| Antifungal and antiviral mechanisms and resistance | prior antiviral/antifungal handle |
| Actinomyces, Nocardia, Pseudomonas, Clostridium and Pasteurella characteristics | prior medically important bacteria handle |
| Infection-control principles, occupational exposure and patient isolation | prior infection-control handle |
| Standard precautions, PPE and transmission-based precautions | prior precautions/PPE handle |
| Sterilization, disinfection and decontamination | prior decontamination handle |
| Medical waste, environmental cleaning and healthcare-associated infection prevention | prior waste/environmental-control handle |

Search arithmetic is therefore **14 source-first − 14 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-first one-path hash is now `sourceProcessed=true`, adding **+140 questions / +140 answers / +0 concepts**. Cumulative triage is **2,727 questions / 2,571 answers / 62 concepts**.

Removing the thirty-one processed hashes leaves **63 selected inventory paths / 63 unique SHA-256s**. Their sorted-newline checksum is `1a336a341fa201c294c0c77c608eae425535dd4e54b0d9484b34dae70a75b1ed`. Remaining audit-review debt is **26 substantive-text / 15 sparse-text / 10 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`31 + 63 = 94`** and path accounting is **`33 + 63 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/08 Midterm Exams/FHB Microbiology Midterm Notes.pdf`, SHA-256 `90bde8572955a23f5602a2cd4c2a154f8b64bae1e0e6b6c5cadb766423dd28ab`, 12 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 63 selected inventory paths / 63 unique hashes remain untriaged.

## Completed source — FHB Microbiology Midterm Notes

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/08 Midterm Exams/FHB Microbiology Midterm Notes.pdf` | `90bde8572955a23f5602a2cd4c2a154f8b64bae1e0e6b6c5cadb766423dd28ab` | 12 | substantive-text | pages 1–12 rendered and read | Microsoft Word 2016 teaching summary titled `FHB: Microbiology`, with author metadata `Ebedo`. No MUST university, college or department authentication, examiner, sitting, marks, question-paper status or authenticated faculty-key claim is visible. |

### Exact assessment, practical, image and teaching boundary

All twelve pages are already-revealed teaching/reference content. Pages 1–3 cover introduction to microbiology and bacteriology; pages 3–7 cover basic virology; pages 8–9 cover medical mycology; and pages 10–12 cover host-parasite relationships. The overlap on page 3 is a section transition within one teaching page, not an additional page occurrence.

The exact boundary is **0 objective prompts / 0 written prompts / 0 practical or image assessment prompts / 0 prompt-matched answer observations / 0 source-absent answers / 12 teaching-reference pages**. Numbered explanatory lists, comparison tables and already-revealed facts are not reverse-engineered into prompts or keys. The printed section numbering jumps from `III. Medical Mycology` to `VI. Host – Parasite Relationship`; that numbering, along with printed spelling, classifications and academically questionable teaching claims, remains source truth without correction.

### Source-first handles and exactly-four-search gate

No assessment prompt is printed, so there is **0 source-first assessment handle / 0 accepted handle / 0 searches**. The prior-FHB-102-2 collapse and exactly-four-search gate do not trigger. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-second one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **2,727 questions / 2,571 answers / 62 concepts**.

Removing the thirty-two processed hashes leaves **62 selected inventory paths / 62 unique SHA-256s**. Their sorted-newline checksum is `ee457a24dc1431e05f46e57eccc184aba9b8dfa9cf5d56201559ce6d12d59619`. Remaining audit-review debt is **25 substantive-text / 15 sparse-text / 10 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`32 + 62 = 94`** and path accounting is **`34 + 62 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Microbiology/08 Midterm Exams/📌Microbiology Midterm [FHB part].pdf`, SHA-256 `80f72f43a806337f940d1c1813329f785cf787804b7c80e94cf000315dfec631`, 26 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 62 selected inventory paths / 62 unique hashes remain untriaged.

## Completed source — 📌Microbiology Midterm [FHB part]

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Microbiology/08 Midterm Exams/📌Microbiology Midterm [FHB part].pdf` | `80f72f43a806337f940d1c1813329f785cf787804b7c80e94cf000315dfec631` | 26 | substantive-text | pages 1–26 rendered and read | Individual `Fundamentals in Microbiology` teaching carrier whose pages 2–26 are visibly credited `By/ Dr Mo. Haitham`. No MUST university, college or department authentication, FHB module mark, examiner, sitting, marks, question-paper status or authenticated faculty-key claim is visible; the filename `FHB part` label alone does not confer assessment authority. |

### Exact assessment, practical, image and teaching boundary

Page 1 is a cover. Pages 2–6 are labelled fundamentals, bacterial classification and bacterial-structure teaching pages. Pages 7–9 cover medical mycology; pages 10–18 general virology; pages 19–21 host-parasite relationships; and pages 22–26 medically important bacteria, principally Staphylococci and Streptococci. Every diagram, organism image, comparison table and classification tree is already labelled.

The exact boundary is **0 objective prompts / 0 written prompts / 0 practical or image assessment prompts / 0 prompt-matched answer observations / 0 source-absent answers / 25 teaching-reference pages**. Fully revealed images, tables and numbered teaching lists are not reverse-engineered into prompts or keys. Printed spelling, capitalization, organism descriptions, classifications and academically questionable teaching claims remain source truth without correction.

### Source-first handles and exactly-four-search gate

No assessment prompt is printed, so there is **0 source-first assessment handle / 0 accepted handle / 0 searches**. The prior-FHB-102-2 collapse and exactly-four-search gate do not trigger. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-third one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **2,727 questions / 2,571 answers / 62 concepts**.

Removing the thirty-three processed hashes leaves **61 selected inventory paths / 61 unique SHA-256s**. Their sorted-newline checksum is `2057487d48492ce0efaeb4ed5089bfd96f4dfaa40ebfb1fb81916afcab202e2d`. Remaining audit-review debt is **24 substantive-text / 15 sparse-text / 10 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`33 + 61 = 94`** and path accounting is **`35 + 61 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - AT - Book 3.pdf`, SHA-256 `fff8595dff5a949b535fb293c39c48a151e872b5af33df472b102924b655c201`, 25 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 61 selected inventory paths / 61 unique hashes remain untriaged.

## Completed source — AT - Book 3

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - AT - Book 3.pdf` | `fff8595dff5a949b535fb293c39c48a151e872b5af33df472b102924b655c201` | 25 | sparse-text | pages 1–25 rendered and read | External Study Smart `Notes & MCQ in Parasitology Module 2` compilation marked `New Edition 2020` and scanned by CamScanner. No MUST university, college or department authentication, FHB module label, examiner, sitting, marks or authenticated faculty-key claim is visible; year-labelled historical questions are revision evidence rather than authenticated past papers. |

### Exact objective, written, practical, image and answer boundary

Pages 1, 2, 5 and 10 are covers or dividers. Pages 3–4 contain nineteen historical written prompts with no answers. Pages 6–8 contain ten MCQs, two written completion prompts and fourteen matching prompts; page 9 answers all twenty-six. Pages 11–12 contain twelve MCQs and their answers. Pages 13–18 contain twenty-nine MCQs, thirty-one true/false prompts and seven matching prompts; pages 18–19 answer all sixty-seven. Pages 20–24 contain forty-four MCQs and page 25 answers all forty-four.

The exact boundary is **147 objective prompts (95 conventional MCQs + 31 true/false + 21 matching) / 21 written prompts / 149 prompt-matched printed answer observations / 19 source-absent answers / 0 practical or image prompts / 0 teaching prompts**. The written split is **2 keyed completion prompts + 19 unkeyed historical long-answer prompts**. Reused printed numbers across physically separate sections remain separate prompt occurrences.

The source's numbering defects remain literal: the first entomology set skips Q11–Q12 and prints Q13–Q14; the expanded set begins at Q8 and skips Q18–Q19 and Q37–Q38; and the true/false sequence skips Q31 but prints Q32. Matching order, dated terminology, spelling and academically questionable questions or answer tokens are not repaired.

### Source-first handles and exactly-four-search gate

The 168 physical prompts collapse into eight coherent source-first handles: general parasitology and host-parasite terminology; arthropod classification and morphology; vector transmission mechanisms; mosquitoes and sand flies; flies and myiasis; fleas, lice and bugs; ticks and mites; and arthropod-borne disease/vector control. Every handle is already represented in completed FHB-102-2 evidence.

Search arithmetic is therefore **8 source-first − 8 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-fourth one-path hash is now `sourceProcessed=true`, adding **+168 questions / +149 answers / +0 concepts**. Cumulative triage is **2,895 questions / 2,720 answers / 62 concepts**.

Removing the thirty-four processed hashes leaves **60 selected inventory paths / 60 unique SHA-256s**. Their sorted-newline checksum is `0f219a88931d74323492b438958cd9f94a12d3fe9fc9c548bad8805f85f76ec4`. Remaining audit-review debt is **24 substantive-text / 14 sparse-text / 10 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`34 + 60 = 94`** and path accounting is **`36 + 60 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Fhb para (answers & notes).pdf`, SHA-256 `5c62279de4964083aecb96a5bd72d47690b0fb569a38779992c2b987d9ce7e8e`, 10 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 60 selected inventory paths / 60 unique hashes remain untriaged.

## Completed source — Fhb para (answers & notes)

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Fhb para (answers & notes).pdf` | `5c62279de4964083aecb96a5bd72d47690b0fb569a38779992c2b987d9ce7e8e` | 10 | empty-text | pages 1–10 rendered and read | Page 1 is a visible official MUST Faculty of Medicine, Parasitology Department FHB102-2 teaching cover for `Vectors of Disease Transmission` by Prof. Heba Abdel Aaty. This authenticates departmental teaching attribution, not an exam sitting or faculty key; the later yellow option highlights and note-box annotations are not independently authenticated as official answers. |

### Exact objective, written, practical, image, note and answer boundary

Page 1 is the official teaching cover. Pages 2–10 contain three clinical single-best-answer MCQs apiece. Every prompt has exactly one yellow-highlighted option, producing **27 objective prompts / 27 highlighted source answer observations / 0 source-absent answers**. Nineteen separate yellow teaching-note callouts accompany selected questions; they are already-revealed reference annotations, not extra prompts or answer observations.

The full boundary is therefore **27 objective / 0 written / 0 practical or image / 27 answers / 0 absent / 0 teaching-only prompts**, with **19 embedded teaching-note callouts** tracked separately. Printed spelling, abbreviations, deprecated terms and academically questionable highlighted answers or note claims remain source truth without correction.

### Source-first handles and exactly-four-search gate

The 27 physical prompts collapse into eleven source-first handles: fleas/plague; lice/epidemic typhus; Triatoma/Chagas; epidemic and endemic relapsing fever; dog flea/Dipylidium; myiasis and fly-larva diagnosis; mosquito host roles and larval control; sand fly disease/control; Glossina/African trypanosomiasis; hard ticks/Babesia/paralysis/spotted fevers; and vector-transmission/host diagnosis. Every handle is already represented in completed FHB-102-2 evidence.

Search arithmetic is **11 source-first − 11 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-fifth one-path hash is now `sourceProcessed=true`, adding **+27 questions / +27 answers / +0 concepts**. Cumulative triage is **2,922 questions / 2,747 answers / 62 concepts**.

Removing the thirty-five processed hashes leaves **59 selected inventory paths / 59 unique SHA-256s**. Their sorted-newline checksum is `c6cd81db9c59dbd587baf48b27d709473426c21a4626e5eb2d77a6d4ac549656`. Remaining audit-review debt is **24 substantive-text / 14 sparse-text / 9 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`35 + 59 = 94`** and path accounting is **`37 + 59 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Medical_Parasitology_Quiz_MCQs_SAQs.pdf`, SHA-256 `41dce21bb593fae3d41ef4ae1f5728fdbe8db0ab363efde1b832d49734ea6f0c`, 8 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 59 selected inventory paths / 59 unique hashes remain untriaged.

## Completed source — Medical_Parasitology_Quiz_MCQs_SAQs

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Medical_Parasitology_Quiz_MCQs_SAQs.pdf` | `41dce21bb593fae3d41ef4ae1f5728fdbe8db0ab363efde1b832d49734ea6f0c` | 8 | substantive-text | pages 1–8 rendered and read | Anonymous ReportLab-generated `An Introduction to Medical Parasitology — Quiz` derivative created in February 2026. Its subtitle says it is based strictly on an unspecified provided PDF, but no source, MUST institution, department, module, named author, examiner, sitting, marks or authenticated faculty-key claim is identified. |

### Exact objective, written, practical, image and answer boundary

Pages 1–6 contain thirty conventional objective MCQs. Page 7 contains five written SAQs. Page 8 supplies one answer token for every MCQ and a model answer for every SAQ.

The exact boundary is **30 objective prompts / 5 written prompts / 35 prompt-matched answer observations / 0 source-absent answers / 0 practical or image prompts / 0 teaching prompts**. The anonymous answer key and model answers remain derivative source-answer evidence, not an official faculty key. Printed simplifications, terminology and academically questionable prompts or answer claims remain source truth without correction.

### Source-first handles and exactly-four-search gate

The thirty-five physical prompts collapse into five coherent source-first handles: parasite definitions/classification; definitive, intermediate and reservoir hosts; biological vectors/transmission; zoonoses/accidental hosts; and parasite habitat, entry routes and life-cycle importance. Every handle is already represented in completed FHB-102-2 evidence.

Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-sixth one-path hash is now `sourceProcessed=true`, adding **+35 questions / +35 answers / +0 concepts**. Cumulative triage is **2,957 questions / 2,782 answers / 62 concepts**.

Removing the thirty-six processed hashes leaves **58 selected inventory paths / 58 unique SHA-256s**. Their sorted-newline checksum is `4a4445926442b7157bfe7d131be524ec508dd027f6ff4a0cfe98407f37274abb`. Remaining audit-review debt is **23 substantive-text / 14 sparse-text / 9 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`36 + 58 = 94`** and path accounting is **`38 + 58 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - PARA MCQ by DR.KANDEEL [103].pdf`, SHA-256 `73d025d9708beea25421fcb3bb4add7b77a7eeb093fc4858235656e871f135a7`, 15 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 58 selected inventory paths / 58 unique hashes remain untriaged.

## Completed source — PARA MCQ by DR.KANDEEL [103]

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - PARA MCQ by DR.KANDEEL [103].pdf` | `73d025d9708beea25421fcb3bb4add7b77a7eeb093fc4858235656e871f135a7` | 15 | empty-text | pages 1–15 rendered and read | Individual `DR.KANDEEL` Apple Notes/Quartz `PARA.103` question compilation created in April 2021. The visible attribution supports personal compilation provenance, but no MUST university, faculty or department authentication, examiner, sitting, marks or authenticated faculty-key claim appears. |

### Exact objective, written, practical, image and answer boundary

Page 1 is the cover. Page 2 contains ten matching prompts with complete mappings, plus a separate nineteen-token answer table. Only Q9–Q19 of that table have visible prompts on page 3, leaving Q1–Q8 as eight orphan answer tokens. Page 4 contains two `Give reasons` prompts, three `true or false and correct` prompts and six MCQs; page 5 answers all eleven. Pages 6–8 contain visible main-bank Q1–Q38. Pages 9–14 resume at Q49 and continue through Q115; page 15 prints a complete Q1–Q115 key, so Q39–Q48 contribute ten further orphan answer tokens rather than visible prompts.

The governed boundary is therefore **132 objective prompts (122 conventional MCQs + 10 matching prompts) / 5 written prompts / 137 prompt-matched answer observations / 18 orphan answer tokens / 0 unanswered visible prompts / 0 practical or image prompts / 0 teaching prompts**. The eighteen orphan tokens remain source-answer observations outside the matched-answer count and are never converted into manufactured questions. Independently numbered banks and matching sets remain distinct physical sequences. Printed spelling, dated terminology and academically questionable questions or key tokens remain source truth without correction.

### Source-first handles and exactly-four-search gate

The 137 visible prompts collapse into fifteen coherent source-first handles: general parasitology associations and parasite types; host types and host-parasite relationships; trematode morphology and life cycle; cestode morphology and host roles; nematode morphology and reproduction; protozoal reproduction; arthropod classes and metamorphosis; mechanical and biological vector transmission; mosquito biology, disease transmission and control; sand flies, transmitted disease and control; bugs and *Trypanosoma cruzi* transmission; fleas, plague, murine typhus and *Tunga penetrans*; lice, louse-borne disease and control; ticks, tick-borne disease and transmission; and mites, mite-borne disease and storage mites. Every handle is already represented in completed FHB-102-2 evidence.

Search arithmetic is **15 source-first − 15 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-seventh one-path hash is now `sourceProcessed=true`, adding **+137 questions / +137 answers / +0 concepts**. Cumulative triage is **3,094 questions / 2,919 answers / 62 concepts**.

Removing the thirty-seven processed hashes leaves **57 selected inventory paths / 57 unique SHA-256s**. Their sorted-newline checksum is `7cc5a2d76ccfda7e1427837c32e1372db8ce1c662558365133670193d8dd54da`. Remaining audit-review debt is **23 substantive-text / 14 sparse-text / 8 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`37 + 57 = 94`** and path accounting is **`39 + 57 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Para MCQ Dr Ayman Ibrahim.pdf`, SHA-256 `8a4ed429cba5061a07a77a9e9c657008946529fc3abc477adc1734283dc75901`, 20 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 57 selected inventory paths / 57 unique hashes remain untriaged.

## Completed source — Para MCQ Dr Ayman Ibrahim

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Para MCQ Dr Ayman Ibrahim.pdf` | `8a4ed429cba5061a07a77a9e9c657008946529fc3abc477adc1734283dc75901` | 20 | empty-text | pages 1–20 rendered and read | Filename-attributed Dr Ayman Ibrahim `1st Year Infection Module 2021` MCQ revision carrier scanned on a Konica Minolta device. The visible pages show no author signature, MUST institution, faculty or department authentication, examiner, sitting, marks or authenticated faculty-key claim. |

### Exact objective, written, practical, image and answer boundary

Page 1 is the Parasitology MCQ / `1st Year Infection Module 2021` cover. Pages 2 and 20 are blank. Pages 3–19 contain one continuous Q1–Q129 objective sequence, and page 19 ends with a complete 129-token answer table.

The exact boundary is **129 objective MCQs / 129 prompt-matched answer observations / 0 source-absent answers / 0 written / 0 teaching prompts**. Q76–Q85 and Q109–Q112 are **14 image-dependent practical-identification MCQs** embedded in the objective sequence; the remaining **115** are ordinary text MCQs. These fourteen occurrences are counted once as objective questions and additionally classified by assessment dependency, not double-counted. Printed terminology, spelling and academically questionable questions or answer tokens remain source truth without correction.

### Source-first handles and exactly-four-search gate

The 129 prompts collapse into twelve source-first handles: general parasitology relationships, parasite types and host definitions; trematode morphology, eggs, larvae and life cycle; cestode morphology, eggs, larvae and host roles; nematode morphology, reproduction, oesophagus and larvae; parasite transmission, autoinfection, zoonosis and infection sources; parasite laboratory diagnosis, concentration, blood films and molecular methods; protozoal classes, locomotion, reproduction and nutrition; arthropod classification and metamorphosis; mechanical, biological and transovarian vector transmission; preventive measures and infection-source control; image-based parasite, egg, larva and class identification; and host requirements, habitat and direct versus indirect life cycles. Every handle is already represented in completed FHB-102-2 evidence.

Search arithmetic is **12 source-first − 12 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-eighth one-path hash is now `sourceProcessed=true`, adding **+129 questions / +129 answers / +0 concepts**. Cumulative triage is **3,223 questions / 3,048 answers / 62 concepts**.

Removing the thirty-eight processed hashes leaves **56 selected inventory paths / 56 unique SHA-256s**. Their sorted-newline checksum is `621f39ef9ff41b21447e4ee12d2d0ad402aef34a8ddf0fbf83da4557f80242f3`. Remaining audit-review debt is **23 substantive-text / 14 sparse-text / 7 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`38 + 56 = 94`** and path accounting is **`40 + 56 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Para Mcq Dr.khairy.pdf`, SHA-256 `74c0876fa0e94fd02511ec0f55f78b1c67aeee35bd6d96047a25aa8435583dc0`, 112 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 56 selected inventory paths / 56 unique hashes remain untriaged.

## Completed source — Para Mcq Dr.khairy

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Para Mcq Dr.khairy.pdf` | `74c0876fa0e94fd02511ec0f55f78b1c67aeee35bd6d96047a25aa8435583dc0` | 112 | empty-text | pages 1–112 rendered and read | External `MCQ's in Medical Parasitology` book by Prof. Dr. Khairy Abdel Hamid Mohammad, Professor of Medical Parasitology, Faculty of Medicine for Boys (Cairo), Al-Azhar University. This is identifiable external academic authorship, but no MUST university, FHB-102-2 module, MUST examiner, sitting, marks or authenticated MUST faculty-key claim appears. |

### Exact objective, written, practical, image and answer boundary

Pages 1–3 are the cover, title and Arabic dedication/preface. The assessment body comprises six independently numbered conventional text-MCQ sections, each followed by its own printed answer table:

| Section | Question pages | Answer pages | Unique objective prompts | Prompt-matched answers |
|---|---|---|---:|---:|
| Trematodes | 4–19 | 20 | 106 | 106 |
| Cestodes | 21–27 | 28 | 43 | 43 |
| Nematodes | 29–39 | 40 | 70 | 70 |
| Protozoology | 41–72 | 73–74 | 212 | 212 |
| Entomology | 75–88 | 89 | 73 | 73 |
| Revision | 90–111 | 112 | 120 | 120 |
| **Total** | **4–112** | **20, 28, 40, 73–74, 89, 112** | **624** | **624** |

Pages 109 and 110 are duplicate scans of the same revision leaf carrying Q110–Q115. That leaf is counted once, rather than adding six duplicate prompt and answer observations. The exact governed boundary is therefore **624 objective MCQs / 624 prompt-matched printed answer observations / 0 source-absent answers / 0 written / 0 practical or image prompts / 0 teaching prompts**. Handwritten ticks, highlights and marginal notes are not treated as additional answers or authority. Printed spelling, terminology and academically questionable questions or key tokens remain source truth without correction.

### Source-first handles and exactly-four-search gate

The 624 unique prompt occurrences collapse into twenty source-first handles: general host–parasite relationships and terminology; trematode morphology and classification; trematode life cycles, intermediate hosts and transmission; trematode diagnosis, pathology and treatment; cestode morphology and larval stages; cestode hosts, transmission and disease; nematode morphology, reproduction and life cycles; intestinal nematodes; tissue and filarial nematodes; protozoal classification and locomotion; intestinal and urogenital protozoa; free-living amoebae; haemoflagellates and leishmaniasis; malaria, babesiosis and toxoplasmosis; protozoal diagnosis, treatment and prevention; arthropod classification and metamorphosis; mosquitoes and vector transmission; flies, myiasis, fleas, lice and bugs; ticks, mites and vector-borne disease; and parasite transmission, clinical syndromes, diagnosis and immune evasion. Every handle is already represented in completed FHB-102-2 evidence.

Search arithmetic is **20 source-first − 20 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This thirty-ninth one-path hash is now `sourceProcessed=true`, adding **+624 questions / +624 answers / +0 concepts**. Cumulative triage is **3,847 questions / 3,672 answers / 62 concepts**.

Removing the thirty-nine processed hashes leaves **55 selected inventory paths / 55 unique SHA-256s**. Their sorted-newline checksum is `c3c2ba674bfb96b1740bdaff2b35d2ae81608e50a27b65d09b060dade24d9c5a`. Remaining audit-review debt is **23 substantive-text / 14 sparse-text / 6 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`39 + 55 = 94`** and path accounting is **`41 + 55 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Ticks.pdf`, SHA-256 `30997b4bb2e13460089e4a1bdb97a022105d871cb28d70d0e95c63d1646e80a2`, 6 pages, with a substantive-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 55 selected inventory paths / 55 unique hashes remain untriaged.

## Completed source — Ticks

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - Ticks.pdf` | `30997b4bb2e13460089e4a1bdb97a022105d871cb28d70d0e95c63d1646e80a2` | 6 | substantive-text | pages 1–6 rendered and read | Individual PowerPoint-style `MCQs on ticks` slide deck visibly signed `Dr.Judy emadELdin`; no MUST university, faculty or department authentication, FHB module label, examiner, sitting, marks or authenticated faculty-key claim appears. |

### Exact objective, written, practical, image and answer boundary

Page 1 contains Q1–Q5 and five inline answers. Pages 2 and 3 are duplicate carriers of the same Q6–Q10 prompt-and-answer slide. Page 4 contains Q11–Q16 and six inline answers. Page 5 contains five matching prompts Q17–Q21 plus conventional Q22–Q23, all keyed inline. Page 6 contains five matching prompts Q24–Q28 plus conventional Q29–Q30, all keyed inline.

The raw rendered boundary is **35 objective prompt observations / 35 answer observations**. Collapsing the exact normalized Q6–Q10 duplicate slide leaves **30 unique objective prompts (20 conventional MCQs + 10 matching prompts) / 30 prompt-matched inline answer observations / 0 source-absent answers / 0 written / 0 practical or image prompts / 0 teaching prompts**. The matching labels are independent objective prompt occurrences rather than one composite question. Printed spelling and academically questionable wording or answer claims remain source truth without correction.

### Source-first handles and exactly-four-search gate

The thirty unique prompt occurrences collapse into five source-first handles: tick life cycle, classification and developmental stages; hard-versus-soft tick morphology and host attachment; tick habitat, host finding, removal and control; tick paralysis, dermatosis and clinical effects; and tick-borne babesiosis, Lyme disease, Q fever and Rocky Mountain spotted fever. Every handle is already represented in completed FHB-102-2 evidence.

Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fortieth one-path hash is now `sourceProcessed=true`, adding **+30 questions / +30 answers / +0 concepts**. Cumulative triage is **3,877 questions / 3,702 answers / 62 concepts**.

Removing the forty processed hashes leaves **54 selected inventory paths / 54 unique SHA-256s**. Their sorted-newline checksum is `07ff27235c8fae8fbd0f3f8fb9e5ff7565353bea145a37b64cb59c72912e445d`. Remaining audit-review debt is **22 substantive-text / 14 sparse-text / 6 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`40 + 54 = 94`** and path accounting is **`42 + 54 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - fhb para All.pdf`, SHA-256 `a81fc0d97fb235f673825d0c75a1c11527e5bdda44ae32b8a828948e7350334a`, 38 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 54 selected inventory paths / 54 unique hashes remain untriaged.

## Completed source — fhb para All

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - fhb para All.pdf` | `a81fc0d97fb235f673825d0c75a1c11527e5bdda44ae32b8a828948e7350334a` | 38 | sparse-text | pages 1–38 rendered and read | CamScanner carrier of direct `smartlearning.must...` online quiz-review screenshots. This is direct MUST platform feedback evidence, but no visible quiz title, module, sitting, date, examiner, marks scheme or authenticated faculty-key declaration appears. The visible account label `Ahmed` is a platform-account label and is not promoted to personal authorship. |

### Exact objective, written, practical, image and answer boundary

Each of the 38 pages is one distinct SmartLearning review screenshot. Every screenshot contains one complete text MCQ, shows the selected option marked correct, assigns full credit and prints a platform-confirmed correct-answer line. No exact screenshot or normalized prompt is duplicated within this carrier.

The exact boundary is **38 objective MCQs / 38 platform-confirmed prompt-matched answer observations / 0 source-absent answers / 0 written / 0 practical or image prompts / 0 teaching prompts**. The clinical narratives remain ordinary text MCQs rather than image-dependent practical items. Direct platform feedback supports the answer observation, but the missing quiz identity and sitting metadata prevent upgrading it to an authenticated faculty key or examination. Printed spelling and academically questionable prompts or platform answer claims remain source truth without correction.

### Source-first handles and exactly-four-search gate

The 38 prompts collapse into seventeen source-first handles: leishmanial and trypanosomal diagnostic stages; parasite taxonomy and class identification; malaria vector and host roles; filarial vectors and transmission; cyclopropagative, cyclodevelopmental and propagative transmission; mosquitoes and larval control; sand flies and leishmaniasis; ticks, Lyme disease and babesiosis; soft ticks and relapsing fever; lice and louse-borne disease; fleas, plague and *Dipylidium caninum*; flies and myiasis; *Triatoma* and Chagas disease; *Bartonella* and sand-fly transmission; parasite-vector clinical identification; arthropod-borne epidemic control; and vector-borne disease diagnosis and prevention. Every handle is already represented in completed FHB-102-2 evidence.

Search arithmetic is **17 source-first − 17 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-first one-path hash is now `sourceProcessed=true`, adding **+38 questions / +38 answers / +0 concepts**. Cumulative triage is **3,915 questions / 3,740 answers / 62 concepts**.

Removing the forty-one processed hashes leaves **53 selected inventory paths / 53 unique SHA-256s**. Their sorted-newline checksum is `de543441fd7aaf2c1911a70a7a51dcc102d917ffeb4b3e2be45d7f08d528dd7f`. Remaining audit-review debt is **22 substantive-text / 13 sparse-text / 6 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`41 + 53 = 94`** and path accounting is **`43 + 53 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - para all quizes.pdf`, SHA-256 `da9693771205f98be44d941dc779e72b34ad73850efd0e34ec332a2d642a1154`, 18 pages, with an empty-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 53 selected inventory paths / 53 unique hashes remain untriaged.

## Completed source — para all quizes

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/05 MCQs/MCQs - para all quizes.pdf` | `da9693771205f98be44d941dc779e72b34ad73850efd0e34ec332a2d642a1154` | 18 | empty-text | pages 1–18 rendered and read | Anonymous Skia-generated consolidation of highlighted question-review screenshots. No visible institution, module, author, examiner, sitting, date, marks or authenticated key declaration appears. Its content authority derives only from exact reconciliation to the already completed direct SmartLearning sibling. |

### Exact objective, written, practical, image and answer boundary

Pages 1–18 contain 38 complete text MCQs and one highlighted option per prompt. An exhaustive normalized prompt comparison maps every one of the 38 prompt occurrences one-for-one to the completed `fhb para All.pdf` SmartLearning review family, although the prompts are rearranged and consolidated differently. Every highlighted option agrees with the corresponding platform-confirmed answer in that prior carrier.

The raw carrier boundary is **38 objective MCQs / 38 highlighted answer observations / 0 source-absent answers / 0 written / 0 practical or image prompts / 0 teaching prompts**. Because all 38 prompts and answers are exact sibling observations already governed in the prior family, the accepted family boundary is **+0 questions / +0 answers**. Anonymous highlighting is preserved as derivative evidence and is not promoted to an independent official faculty key.

### Source-first handles and exactly-four-search gate

The sibling reuses the same seventeen source-first handles already reconciled for `fhb para All.pdf`: leishmanial and trypanosomal diagnostic stages; parasite taxonomy and class identification; malaria vector and host roles; filarial vectors and transmission; vector transmission modes; mosquitoes and larval control; sand flies and leishmaniasis; ticks and tick-borne disease; soft ticks and relapsing fever; lice and louse-borne disease; fleas, plague and *Dipylidium caninum*; flies and myiasis; *Triatoma* and Chagas disease; *Bartonella* and sand-fly transmission; parasite-vector clinical identification; arthropod-borne epidemic control; and vector-borne disease diagnosis and prevention. All seventeen remain prior-represented.

Search arithmetic is **17 source-first − 17 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-second one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **3,915 questions / 3,740 answers / 62 concepts**.

Removing the forty-two processed hashes leaves **52 selected inventory paths / 52 unique SHA-256s**. Their sorted-newline checksum is `5196f76c49354f9a66b62ed8979fc184c5a32a2bf82ceb14fcce28fa989aade6`. Remaining audit-review debt is **22 substantive-text / 13 sparse-text / 5 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`42 + 52 = 94`** and path accounting is **`44 + 52 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM - FHB 102 Final revision.pdf`, SHA-256 `b9a55266923a251cd30bb06bbe51efae146bcd6ea9a51b7489b76caf18fcf9f3`, 116 pages, with a sparse-text audit sample. Its authority and exact visible boundary remain unadjudicated.

**BLOCKED — S1 cannot be approved:** 52 selected inventory paths / 52 unique hashes remain untriaged.

## Completed source — FHB 102 Final revision

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM - FHB 102 Final revision.pdf` | `b9a55266923a251cd30bb06bbe51efae146bcd6ea9a51b7489b76caf18fcf9f3` | 116 | sparse-text | pages 1–116 rendered and read | Visible MUST-branded `Parasitology FHB-102 Final revision` teaching carrier. PowerPoint metadata names Mohamed Mostafa Mostafa Ahmed. This supports high-authority institutional revision/teaching provenance, but no authenticated examination sitting, examiner, marks scheme or faculty-key declaration appears. |

### Exact objective, written, practical, image and answer boundary

Page 1 is the MUST revision cover, page 2 is an administrative reminder, and pages 3–116 interleave topic dividers, fully labelled practical-reference images, OSPE-style image-led prompts, clinical cases and prompt-reveal answers. The exact assessment boundary is **0 ordinary objective MCQs / 0 standalone written prompts / 82 image-dependent practical fields / 66 matched printed answers / 16 source-absent answers**. The source also contains **81 teaching/reference/divider pages**; this page count is intentionally non-additive because many labelled reveal pages both teach and answer practical fields.

The source truth is preserved as printed. Revision provenance is not promoted to an authenticated examination or official faculty key; the sixteen unmatched practical fields remain source-absent rather than inferred from adjacent teaching; and spelling, terminology, labels and academically questionable answer claims are not repaired.

### Source-first handles and exactly-four-search gate

The fifteen source-first handles cover helminth class/specimen identification; nematode, cestode and trematode morphology; protozoal class/stage identification; arthropod classification; mosquito sex/genus/stage morphology; mosquito-borne vectors and transmission; sand-fly morphology and disease; flies, myiasis and posterior spiracles; biting flies and trypanosomiasis; fleas and flea-borne disease; ticks, mites and arachnid morphology; *Cyclops* morphology/vector roles; and clinical diagnosis, infective stages and vectors. All fifteen collapse to already represented FHB-102-2 evidence.

Search arithmetic is **15 source-first − 15 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-third one-path hash is now `sourceProcessed=true`, adding **+82 questions / +66 answers / +0 concepts**. Cumulative triage is **3,997 questions / 3,806 answers / 62 concepts**.

Removing the forty-three processed hashes leaves **51 selected inventory paths / 51 unique SHA-256s**. Their sorted-newline checksum is `2ba45f8dff6da9e20b1f6868b2f9fcc315b196b8bd3b8974c0e35b6594dc1bbe`. Remaining audit-review debt is **22 substantive-text / 12 sparse-text / 5 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`43 + 51 = 94`** and path accounting is **`45 + 51 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM - Practical Final Para FHB-2 - Revision.pdf`, SHA-256 `95b68fdebb7014353e0ffce1ebde977607ff239132fef93f8184225775c8fe42`, 117 pages, with a sparse-text audit sample. Its sibling relationship and exact accepted family delta remain to be governed.

**BLOCKED — S1 cannot be approved:** 51 selected inventory paths / 51 unique hashes remain untriaged.

## Completed source — Practical Final Para FHB-2 Revision

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM - Practical Final Para FHB-2 - Revision.pdf` | `95b68fdebb7014353e0ffce1ebde977607ff239132fef93f8184225775c8fe42` | 117 | sparse-text | pages 1–117 rendered and read | Visible MUST-branded `Parasitology FHB-102 Final revision` teaching carrier naming Dr. Noran Mostafa; PowerPoint metadata names Mohamed Mostafa Mostafa Ahmed. This is institutional revision/teaching evidence, not an authenticated examination sitting, examiner, marks scheme or faculty key. |

### Exact sibling, practical, answer and teaching boundary

The raw carrier contains **82 image-dependent practical fields / 66 matched printed answers / 16 source-absent answers / 0 ordinary objective MCQs / 0 standalone written prompts / 82 non-additive teaching-reference-divider pages**. Exact sequence reconciliation maps pages 1–44 to prior-family pages 1–44 and pages 46–117 to prior-family pages 45–116. Page 45 is the only insertion: a fully labelled Aedes-egg reference slide with no question. Thus all 82 prompt fields, 66 answers and 16 absent fields are already governed by the completed 116-page sibling, while the inserted page is teaching-only.

The governed family delta is **+0 questions / +0 answers**. Page-level formatting or attribution differences do not mint new assessment occurrences; the sixteen unkeyed practical fields remain absent rather than inferred; and printed terminology, spelling and questionable answer claims remain source truth.

### Source-first handles and exactly-four-search gate

The carrier reuses the prior family's fifteen handles: helminth class/specimen identification; nematode, cestode and trematode morphology; protozoal class/stage identification; arthropod classification; mosquito morphology and vector transmission; sand flies; flies/myiasis; biting flies/trypanosomiasis; fleas; ticks/mites; *Cyclops*; and clinical diagnosis, stages and vectors. All fifteen remain prior-represented.

Search arithmetic is **15 source-first − 15 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-fourth one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **3,997 questions / 3,806 answers / 62 concepts**.

Removing the forty-four processed hashes leaves **50 selected inventory paths / 50 unique SHA-256s**. Their sorted-newline checksum is `bc43e41dd912fed10fca6f154c2913df65e1d416931b881eec411bb437a2ec77`. Remaining audit-review debt is **22 substantive-text / 11 sparse-text / 5 empty-text / 11 audit-not-found / 1 audit-extract-failed row**. Unique-hash accounting is **`44 + 50 = 94`** and path accounting is **`46 + 50 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM MCQs - Parasitology FHB102-2 Exam Night Questions & Notes (Final).pdf`, SHA-256 `15e37b0ef0fe721a4fd0c932ed1a5ba648fe4b14142adabc5e231bc3b8e24a51`, 23 pages, with an audit-extract-failed sample.

**BLOCKED — S1 cannot be approved:** 50 selected inventory paths / 50 unique hashes remain untriaged.

## Completed source — Parasitology FHB102-2 Exam Night Questions & Notes

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM MCQs - Parasitology FHB102-2 Exam Night Questions & Notes (Final).pdf` | `15e37b0ef0fe721a4fd0c932ed1a5ba648fe4b14142adabc5e231bc3b8e24a51` | 23 | audit-extract-failed | pages 1–23 rendered and read | Individual Dr Mohamed Ezzt parasitology question-and-revision compilation carried through CamScanner and iLovePDF. No authenticated MUST institution, faculty, department, module, examiner, sitting, marks scheme or official key declaration appears. |

### Exact objective, answer and annotation boundary

All twenty-three rendered pages contain conventional text MCQ material. Counting the physically printed prompt fields yields **27 objective MCQs / 27 prompt-matched blue pen-marked answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**. Seven explanatory note blocks and thirteen study-topic labels are annotations, not separate prompts or answers.

The marked answers remain individual source observations rather than an authenticated faculty key. Page count and numbered study labels are not used as proxy prompt counts; explanatory blocks remain annotations; and printed spelling, terminology and academically questionable prompt or answer claims remain source truth without repair.

### Source-first handles and exactly-four-search gate

The nine source-first handles cover flies and myiasis; ticks and tick-borne disease; fleas and flea-borne disease; lice and louse-borne disease; triatomine bugs and Chagas disease; trypanosomes and vector transmission; sand flies and leishmaniasis; arthropod transmission modes; and clinical vector-borne diagnosis and prevention. All nine collapse to already represented FHB-102-2 evidence.

Search arithmetic is **9 source-first − 9 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-fifth one-path hash is now `sourceProcessed=true`, adding **+27 questions / +27 answers / +0 concepts**. Cumulative triage is **4,024 questions / 3,833 answers / 62 concepts**.

Removing the forty-five processed hashes leaves **49 selected inventory paths / 49 unique SHA-256s**. Their sorted-newline checksum is `075e5e8db4f22327bd7e9e649b2227295b50b2ef8d933d0529286a9e646fba0d`. Remaining audit-review debt is **22 substantive-text / 11 sparse-text / 5 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`45 + 49 = 94`** and path accounting is **`47 + 49 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM MCQs - Parasitology FHB102-2 Questions (Final).pdf`, SHA-256 `b2b07230ab691f6e8c14085685cddb1b593fd46759689966247d318b4af6311f`, 42 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 49 selected inventory paths / 49 unique hashes remain untriaged.

## Completed source — Parasitology FHB102-2 Questions Final

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/06 EOM Exams/EOM MCQs - Parasitology FHB102-2 Questions (Final).pdf` | `b2b07230ab691f6e8c14085685cddb1b593fd46759689966247d318b4af6311f` | 42 | substantive-text | pages 1–42 rendered and read | Named Absalam101 FHB102-2 revision bank whose Microsoft Word metadata identifies `200057470-Abdel Salam Muhammad Abdel Salam Mahmoud`; no authenticated MUST institution, faculty, department, examiner, sitting, marks scheme or official key declaration appears. |

### Exact objective, answer and section boundary

The six independently numbered sections contain **30 Pre-Midterm + 30 Lice + 30 Fleas & Bugs + 30 Ticks + 20 Cyclops & Scorpions + 5 Diagnostic Parasitology = 145 conventional text MCQs**. Answer tables on pages 10, 18, 26, 34, 40 and 42 supply one token for every prompt: **145 prompt-matched answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**.

The cover's printed claim of `140 Questions` conflicts with the visible 145-item boundary and does not govern the count. The answer tables remain source-answer evidence rather than an authenticated faculty key. Two isolated direct prior prompt replays remain physical occurrences in this distinct non-sibling carrier. Printed spelling, terminology and academically questionable prompt or answer claims remain source truth without repair.

### Source-first handles and exactly-four-search gate

The eleven source-first handles cover host-parasite relationships; arthropod vector transmission modes; flies and myiasis; lice and louse-borne disease; fleas and flea-borne disease; triatomine bugs and Chagas disease; ticks and tick-borne disease; *Cyclops* morphology and vector roles; scorpions and envenomation; ectoparasite diagnosis and control; and direct/indirect diagnostic parasitology. All eleven collapse to already represented FHB-102-2 evidence.

Search arithmetic is **11 source-first − 11 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-sixth one-path hash is now `sourceProcessed=true`, adding **+145 questions / +145 answers / +0 concepts**. Cumulative triage is **4,169 questions / 3,978 answers / 62 concepts**.

Removing the forty-six processed hashes leaves **48 selected inventory paths / 48 unique SHA-256s**. Their sorted-newline checksum is `991d2f782eb3d05808d32e138f74876945869a520d28856c18219008e0525740`. Remaining audit-review debt is **21 substantive-text / 11 sparse-text / 5 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`46 + 48 = 94`** and path accounting is **`48 + 48 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Intro) Midterm Notes.pdf`, SHA-256 `20445c08505e59ae53e9c1b40465d5f329d4f51d03bdd615dd319dbd93e721de`, 1 page, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 48 selected inventory paths / 48 unique hashes remain untriaged.

## Completed source — FHB Para Intro Midterm Notes

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Intro) Midterm Notes.pdf` | `20445c08505e59ae53e9c1b40465d5f329d4f51d03bdd615dd319dbd93e721de` | 1 | substantive-text | page 1 rendered and read | Single-page Microsoft Word 2016 teaching note titled `FHB-2: Parasitology` with author metadata Ebedo; no authenticated MUST institution, faculty, department, examiner, sitting, marks, question-paper status or official key declaration appears. |

### Exact teaching and assessment boundary

The page consists entirely of fully revealed teaching prose under four headings: Basic Definitions, Classification of Parasites, Routes of Infection and Scientific Taxonomy. Numbered headings, nested taxonomy lists and examples are declarative structure rather than assessment prompts. The exact boundary is **0 objective / 0 written / 0 practical or image prompts / 0 answers / 0 source-absent / 1 teaching-reference page**.

The abbreviated `FHB-2` title and Ebedo metadata are retained without promotion to official module authority. Teaching headings and nested lists are not reverse-engineered into questions or keys. Printed spelling, classifications and academically questionable teaching claims remain source truth without repair.

### Source-first handles and exactly-four-search gate

The teaching topics cover parasite/host definitions, parasite classification, routes of infection and scientific taxonomy; all are already represented. Because the page contains no assessment prompt, no assessment handle survives the source-first gate.

Search arithmetic is **0 assessment handles − 0 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-seventh one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **4,169 questions / 3,978 answers / 62 concepts**.

Removing the forty-seven processed hashes leaves **47 selected inventory paths / 47 unique SHA-256s**. Their sorted-newline checksum is `da55000bdad6291c656dde313b70f464eeb0e36c34659e5adb37ea801b9b6bd0`. Remaining audit-review debt is **20 substantive-text / 11 sparse-text / 5 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`47 + 47 = 94`** and path accounting is **`49 + 47 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Mosquitoes) Midterm Notes.pdf`, SHA-256 `89f9b50762f9efbed0c081ba949a24e4ccbceb062df871c77497b1a1cc2af3a7`, 3 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 47 selected inventory paths / 47 unique hashes remain untriaged.

## Completed source — FHB Para Mosquitoes Midterm Notes

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Mosquitoes) Midterm Notes.pdf` | `89f9b50762f9efbed0c081ba949a24e4ccbceb062df871c77497b1a1cc2af3a7` | 3 | substantive-text | pages 1–3 rendered and read | Three-page Microsoft Word 2016 teaching summary titled `Mosquitoes` with author metadata Ebedo; no authenticated MUST institution, faculty, department, examiner, sitting, marks, question-paper status or official key declaration appears. |

### Exact teaching and assessment boundary

All three pages are fully revealed teaching/reference prose and lists covering mosquito morphology, life cycle, bionomics, *Anopheles*, *Aedes*, *Culex*, mosquito-borne diseases and mosquito control. Numbered sections, disease case bullets and nested lists are declarative teaching structure rather than assessment prompts. The exact boundary is **0 objective / 0 written / 0 practical or image prompts / 0 answers / 0 source-absent / 3 teaching-reference pages**.

The Ebedo metadata and generic title are retained without promotion to official module authority. Teaching sections, case summaries and lists are not reverse-engineered into questions or keys. Printed spellings, vector claims, classifications, control recommendations and academically questionable teaching statements remain source truth without repair.

### Source-first handles and exactly-four-search gate

The five teaching-topic handles cover mosquito morphology/life cycle, mosquito bionomics, *Anopheles* and malaria, *Aedes*/*Culex*-borne disease, and mosquito control; all are already represented. Because the source contains no assessment prompt, no assessment handle survives the source-first gate.

Search arithmetic is **0 assessment handles − 0 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-eighth one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **4,169 questions / 3,978 answers / 62 concepts**.

Removing the forty-eight processed hashes leaves **46 selected inventory paths / 46 unique SHA-256s**. Their sorted-newline checksum is `da6447dff977f36c86676532a2922eb245ed0ad47bda3c6899c865cf25fcbc87`. Remaining audit-review debt is **19 substantive-text / 11 sparse-text / 5 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`48 + 46 = 94`** and path accounting is **`50 + 46 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Myiasis) Midterm Notes.pdf`, SHA-256 `6fb474b2c5871480abefa3a6e738373c226ccb790af54bb01709f3bb833941d5`, 6 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 46 selected inventory paths / 46 unique hashes remain untriaged.

## Completed source — FHB Para Myiasis Midterm Notes

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Myiasis) Midterm Notes.pdf` | `6fb474b2c5871480abefa3a6e738373c226ccb790af54bb01709f3bb833941d5` | 6 | substantive-text | pages 1–6 rendered and read | Six-page Microsoft Word 2016 arthropod and myiasis teaching summary with author metadata Ebedo; no authenticated MUST institution, faculty, department, examiner, sitting, marks, question-paper status or official key declaration appears. |

### Exact teaching and assessment boundary

All six pages are fully revealed teaching/reference prose, tables and lists covering arthropod classification and transmission, fly families, myiasis classification, clinical forms, diagnosis, treatment and prevention. Headings, case descriptions, treatment lists and numbered prevention steps are declarative teaching structure rather than assessment prompts. The exact boundary is **0 objective / 0 written / 0 practical or image prompts / 0 answers / 0 source-absent / 6 teaching-reference pages**.

The generic `Arthropoda` opening title and Ebedo metadata are retained without promotion to official module authority. Teaching tables, case descriptions and nested lists are not reverse-engineered into questions or keys. Printed spellings, classifications, transmission claims, treatments and academically questionable teaching statements remain source truth without repair.

### Source-first handles and exactly-four-search gate

The five teaching-topic handles cover arthropod classification/transmission, fly families, myiasis classification, clinical diagnosis/treatment and prevention; all are already represented. Because the source contains no assessment prompt, no assessment handle survives the source-first gate.

Search arithmetic is **0 assessment handles − 0 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This forty-ninth one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **4,169 questions / 3,978 answers / 62 concepts**.

Removing the forty-nine processed hashes leaves **45 selected inventory paths / 45 unique SHA-256s**. Their sorted-newline checksum is `af2f9828f3144c9434f21988c3785cdc04237ca82d413d9b147650bcf93dc131`. Remaining audit-review debt is **18 substantive-text / 11 sparse-text / 5 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`49 + 45 = 94`** and path accounting is **`51 + 45 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Sand Fly) Midterm Notes.pdf`, SHA-256 `79db3ce9ae72b46dfb1eec91e0441e28543bd8eff4a743888958b412f9d62b0e`, 2 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 45 selected inventory paths / 45 unique hashes remain untriaged.

## Completed source — FHB Para Sand Fly Midterm Notes

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/FHB Para (Sand Fly) Midterm Notes.pdf` | `79db3ce9ae72b46dfb1eec91e0441e28543bd8eff4a743888958b412f9d62b0e` | 2 | substantive-text | pages 1–2 rendered and read | Two-page Microsoft Word 2016 sand-fly teaching summary with author metadata Ebedo; no authenticated MUST institution, faculty, department, examiner, sitting, marks, question-paper status or official key declaration appears. |

### Exact teaching and assessment boundary

Both pages are fully revealed teaching/reference prose and lists covering sand-fly morphology, distribution, biology, leishmaniasis, sand-fly fever and Oroya fever. The four page-2 case-study lines are declarative clinical summaries without interrogative fields. The exact boundary is **0 objective / 0 written / 0 practical or image prompts / 0 answers / 0 source-absent / 2 teaching-reference pages**.

The generic `Sand Fly` title and Ebedo metadata are retained without promotion to official module authority. Four declarative case-study lines are not reverse-engineered into prompts or keys. Printed spellings, distribution claims, transmission classifications and academically questionable teaching statements remain source truth without repair.

### Source-first handles and exactly-four-search gate

The three teaching-topic handles cover sand-fly morphology/ecology, leishmaniasis and sand-fly/Oroya fevers; all are already represented. Because the source contains no assessment prompt, no assessment handle survives the source-first gate.

Search arithmetic is **0 assessment handles − 0 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fiftieth one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **4,169 questions / 3,978 answers / 62 concepts**.

Removing the fifty processed hashes leaves **44 selected inventory paths / 44 unique SHA-256s**. Their sorted-newline checksum is `97cf2f0f58fde05056cc5a8da749f08229b952cfb8d3b7ff329bdad4d1ca16d0`. Remaining audit-review debt is **17 substantive-text / 11 sparse-text / 5 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`50 + 44 = 94`** and path accounting is **`52 + 44 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/PARA FHB REVISION - MIDTERM 2026.pdf`, SHA-256 `ffd93da4358f3012ef44c154f62e4dde50a3d5378c0e2fa6188283ad4ff7844c`, 12 pages, with an empty-text audit sample.

**BLOCKED — S1 cannot be approved:** 44 selected inventory paths / 44 unique hashes remain untriaged.

## Completed source — PARA FHB Revision Midterm 2026

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/PARA FHB REVISION - MIDTERM 2026.pdf` | `ffd93da4358f3012ef44c154f62e4dde50a3d5378c0e2fa6188283ad4ff7844c` | 12 | empty-text | pages 1–12 rendered and read | Anonymous CamScanner/Quartz `PARA FHB REVISION - MIDTERM` carrier dated 2026; no authenticated MUST institution, faculty, department, examiner, sitting, marks scheme or official key declaration appears. |

### Exact objective, answer and prompt-reveal boundary

All twelve rendered pages show one MCQ field. Pages 5 and 7 repeat the complete prompts from pages 2 and 6 while adding visible `Answer` lines, so they are prompt-reveal repetitions rather than new occurrences. Collapsing those two repeats yields **10 unique objective MCQs / 3 prompt-matched printed answer observations / 7 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**.

Only three visibly printed `Answer` lines are counted; the seven missing answers remain source-absent rather than inferred. Anonymous revision provenance and CamScanner metadata are not promoted to an authenticated examination or faculty key. Printed spelling, terminology and academically questionable prompt or answer claims remain source truth without repair.

### Source-first handles and exactly-four-search gate

The five source-first handles cover mosquitoes/vector transmission, insecticides/arthropod control, host-parasite relationships, myiasis/fly larvae and fly-borne mechanical or biological transmission. All five collapse to already represented FHB-102-2 evidence.

Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fifty-first one-path hash is now `sourceProcessed=true`, adding **+10 questions / +3 answers / +0 concepts**. Cumulative triage is **4,179 questions / 3,981 answers / 62 concepts**.

Removing the fifty-one processed hashes leaves **43 selected inventory paths / 43 unique SHA-256s**. Their sorted-newline checksum is `3f5a6f66f86ad4ce8090cddfc384e75db6c0f5d7a09890c8f40eee9f7975b78a`. Remaining audit-review debt is **17 substantive-text / 11 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`51 + 43 = 94`** and path accounting is **`53 + 43 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/revision after midterm FHB102.pdf`, SHA-256 `be9417870fcbd5a6a748bf8142b7d6ae5ed0bc4090f175f6dc2b50eb161b2ea1`, 28 pages, with a sparse-text audit sample.

**BLOCKED — S1 cannot be approved:** 43 selected inventory paths / 43 unique hashes remain untriaged.

## Completed source — Revision after midterm FHB102

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/revision after midterm FHB102.pdf` | `be9417870fcbd5a6a748bf8142b7d6ae5ed0bc4090f175f6dc2b50eb161b2ea1` | 28 | sparse-text | pages 1–28 rendered and read | Visible MUST Foundations of Human Body 102-2 `Vectors of Disease Transmission` webinar/revision deck by Prof. Heba Abdel Aaty with discussion and flipped-classroom objectives. This is strong departmental teaching/revision provenance, not an authenticated examination sitting, marks scheme or faculty key. |

### Exact raw boundary and sibling-subset reconciliation

Pages 1–3 are cover, objectives and FHB102-2 theme framing. Pages 4–28 contain **25 answerless conventional MCQs / 0 printed answers / 25 raw source-absent answers / 0 written / 0 practical or image prompts**. Exhaustive normalized comparison maps every prompt-and-option field one-for-one to a 25-item subset of the completed 27-question `Fhb para (answers & notes)` family.

The governed family delta is therefore **+0 questions / +0 answers**. The answerless revision fields remain 25 raw source-absent observations without manufacturing answers; exact sibling-subset mapping prevents a second count; and official departmental teaching provenance is not promoted to an authenticated exam sitting or faculty key. Printed spelling, terminology and academically questionable prompt claims remain source truth without repair.

### Source-first handles and exactly-four-search gate

The carrier reuses the prior family's eleven handles across arthropod vectors, host/vector roles, transmission types, mosquitoes, flies/myiasis, lice, fleas, ticks, triatomine bugs, trypanosomes and clinical vector-borne diagnosis/prevention. All eleven remain prior-represented.

Search arithmetic is **11 source-first − 11 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fifty-second one-path hash is now `sourceProcessed=true`, adding **+0 questions / +0 answers / +0 concepts**. Cumulative triage remains **4,179 questions / 3,981 answers / 62 concepts**.

Removing the fifty-two processed hashes leaves **42 selected inventory paths / 42 unique SHA-256s**. Their sorted-newline checksum is `cc5fcf73d838f1f56adc61149aec5b948489c95919a080ac5f9b1dc2fb726c1c`. Remaining audit-review debt is **17 substantive-text / 10 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`52 + 42 = 94`** and path accounting is **`54 + 42 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/📌para FHB-2 102 midterm (By Asma).pdf`, SHA-256 `0444553891b39cf7fad5fad2c8c597923c785fb666e96503f313bf92f71d2194`, 19 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 42 selected inventory paths / 42 unique hashes remain untriaged.

## Completed source — Para FHB-2 102 midterm by Asma

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Parasitology/08 Midterm Exams/📌para FHB-2 102 midterm (By Asma).pdf` | `0444553891b39cf7fad5fad2c8c597923c785fb666e96503f313bf92f71d2194` | 19 | substantive-text | pages 1–19 rendered and read | Student-authored PowerPoint parasitology teaching summary visibly signed Asma S.E with PDF author metadata `asma sheriff`; no authenticated MUST institution, faculty, department, examiner, sitting, marks scheme or official key declaration appears. |

### Exact practical, answer and teaching boundary

The fully rendered carrier contains **11 raw image-dependent practical fields / 1 source answer observation / 10 source-absent fields / 0 ordinary objective MCQs / 0 standalone written prompts**. Teaching and reference content spans 18 non-additive pages: those page roles are not counted as separate prompt occurrences.

Nine practical fields map to the completed Final Revision practical family and are not counted twice. Two family prompt occurrences survive that reconciliation, one with a revealed source answer. The ten raw source-absent fields remain absent rather than inferred, and the one revealed answer remains student-source evidence rather than an authenticated faculty key. Printed spelling, terminology and academically questionable claims remain source truth without repair.

### Source-first handles and exactly-four-search gate

The three source-first handles cover arthropod/myiasis clinical identification, mosquito/sand-fly vector identification and vector-borne clinical transmission/diagnosis. All three collapse to already represented FHB-102-2 evidence.

Search arithmetic is **3 source-first − 3 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fifty-third one-path hash is now `sourceProcessed=true`, adding **+2 questions / +1 answer / +0 concepts**. Cumulative triage is **4,181 questions / 3,982 answers / 62 concepts**.

Removing the fifty-three processed hashes leaves **41 selected inventory paths / 41 unique SHA-256s**. Their sorted-newline checksum is `8c897b920090f1d7f9b35362a513b8f2defd8bfa5d76be5f8be6bcf7b98e69c9`. Remaining audit-review debt is **16 substantive-text / 10 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`53 + 41 = 94`** and path accounting is **`55 + 41 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - FHB-Pharma MCQ Questions.pdf`, SHA-256 `68c1cd690f5ff892c0de7c67f6a330c0358930834531624b19986bc635086169`, 10 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 41 selected inventory paths / 41 unique hashes remain untriaged.

## Completed source — FHB-Pharma MCQ Questions

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - FHB-Pharma MCQ Questions.pdf` | `68c1cd690f5ff892c0de7c67f6a330c0358930834531624b19986bc635086169` | 10 | substantive-text | pages 1–10 rendered and read | Named student Microsoft Word compilation visibly marked `MADE BY: KHALED HESHAM ABDELHAY` with individual PDF author metadata `200049807-Khaled Hisham AbdelHay Ramadan`; no authenticated MUST institution, faculty, department, examiner, sitting, marks scheme or official key declaration appears. |

### Exact objective and answer boundary

Pages 1–8 contain one continuous sequence of **59 conventional objective MCQs**. Pages 9–10 print a complete answer table for Q1–Q59, producing **59 prompt-matched source answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**.

The complete table remains student-source answer evidence rather than an authenticated faculty key. Repeated subject matter remains distinct physical prompt occurrence because no exact prompt-sibling sequence is present. Printed spelling, grammar, numbering, terminology and academically questionable questions or answer tokens remain source truth without repair.

### Source-first handles and exactly-four-search gate

The eight source-first handles cover beta-lactam cell-wall inhibition, penicillin classes and uses, cephalosporins, carbapenems/monobactams, beta-lactamase inhibitors, vancomycin, resistant-organism/antipseudomonal therapy and antibiotic-associated colitis/clinical selection. All eight collapse to already represented FHB-102-2 evidence.

Search arithmetic is **8 source-first − 8 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fifty-fourth one-path hash is now `sourceProcessed=true`, adding **+59 questions / +59 answers / +0 concepts**. Cumulative triage is **4,240 questions / 4,041 answers / 62 concepts**.

Removing the fifty-four processed hashes leaves **40 selected inventory paths / 40 unique SHA-256s**. Their sorted-newline checksum is `cd5c12961f5802078c1982efc26bdc0163b77b0f8809c3454c85358b903607c0`. Remaining audit-review debt is **15 substantive-text / 10 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`54 + 40 = 94`** and path accounting is **`56 + 40 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Final_Lec_3_45_New_Exam_MCQs.pdf`, SHA-256 `70dc21b86903e9b5dee9a0b5d7b33beff75e937cfd891dfb330682ec5ee5effe`, 7 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 40 selected inventory paths / 40 unique hashes remain untriaged.

## Completed source — Final Lec 3, 45 New Exam-Style MCQs

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Final_Lec_3_45_New_Exam_MCQs.pdf` | `70dc21b86903e9b5dee9a0b5d7b33beff75e937cfd891dfb330682ec5ee5effe` | 7 | substantive-text | pages 1–7 rendered and read | Anonymous ReportLab-generated May 2026 derivative labelled `FHB2-102 - Final Lec 3 | 45 New Exam-Style MCQs`, saying it is based only on an uploaded lecture file and citing Dr Ahmed Isa Final Lec 3 in the footer; no authenticated MUST institution, examiner, sitting, marks scheme or official key declaration appears. |

### Exact objective and answer boundary

Pages 1–6 contain one continuous sequence of **45 conventional objective MCQs**. Page 7 prints a complete answer table for Q1–Q45, producing **45 prompt-matched source answer observations / 0 source-absent answers / 0 written / 0 practical or image / 0 teaching prompts**.

The source expressly states that answers are intentionally varied to avoid one repeated-choice pattern; this engineered distribution and derivative provenance remain authority limitations. The answer table is not promoted to an authenticated faculty key. Printed terminology and academically questionable questions or answer tokens remain source truth without repair.

### Source-first handles and exactly-four-search gate

The five handles cover streptogramin/oxazolidinone pharmacology, fluoroquinolone mechanisms and generations, fluoroquinolone uses/adverse effects/interactions, rifampicin mechanism/uses and rifampicin pharmacokinetics/adverse effects/interactions. All five collapse to already represented evidence.

Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fifty-fifth one-path hash is now `sourceProcessed=true`, adding **+45 questions / +45 answers / +0 concepts**. Cumulative triage is **4,285 questions / 4,086 answers / 62 concepts**.

Removing the fifty-five processed hashes leaves **39 selected inventory paths / 39 unique SHA-256s**. Their sorted-newline checksum is `75d425642fafb339594555a16beee08c4b8b0da8933b7ea0e70f77664c1f5d76`. Remaining audit-review debt is **14 substantive-text / 10 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`55 + 39 = 94`** and path accounting is **`57 + 39 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - MICRO_PHARMA FHB 102-2 BY SALAMA.pdf`, SHA-256 `3c4f855a524545347d7ad2d5e54fee1d548b38d4c4ffca8bbaad0b2bc1cbe456`, 48 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 39 selected inventory paths / 39 unique hashes remain untriaged.

## Completed source — MICRO_PHARMA FHB 102-2 by Salama

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - MICRO_PHARMA FHB 102-2 BY SALAMA.pdf` | `3c4f855a524545347d7ad2d5e54fee1d548b38d4c4ffca8bbaad0b2bc1cbe456` | 48 | substantive-text | pages 1–48 rendered and read | Named Mohamed Salama Microsoft Word 365 revision carrier titled `micro fhb 102-2`, with matching visible footer attribution and author metadata; no authenticated MUST institution, faculty, department, examiner, examination sitting, marks scheme or official key declaration appears. |

### Exact objective, written and answer boundary

Physical page 1 is the cover. Pages 2–43 contain **130 conventional objective MCQs / 130 inline prompt-matched answers** across independently restarted microbiology, virology, mycology, medically important bacteria and infection-control sections. Pages 44–48 contain **35 standalone written prompts / 35 printed answers**. The complete physical boundary is therefore **165 prompts / 165 prompt-matched source answer observations / 0 source-absent answers / 0 practical or image-dependent / 0 teaching-only occurrences**.

The independently restarted section numbering is preserved, with every distinct physical prompt counted once. The written answer to “Name two drugs belonging to the allylamines group” supplies only Terbinafine, while the answer to “Enumerate two antibiotics that inhibit cytoplasmic membrane function” supplies only the polymyxin group. These quantity mismatches, along with printed spelling, grammar, simplified mechanisms and academically questionable answer claims, remain source truth without repair. The complete answer set remains individual revision-source evidence rather than an authenticated faculty key.

### Source-first handles and exactly-four-search gate

The sixteen source-first handles cover antimicrobial action/classes/selective toxicity; antibacterial mechanisms; resistance and chemotherapy complications; general virology structure/genome; viral replication/pathogenesis/diagnosis; medically important bacterial morphology/disease; bacterial culture/diagnostics; healthcare-associated infection reservoirs/transmission; standard and transmission-based precautions; hand hygiene/PPE; sterilization/disinfection/equipment risk; occupational exposure/PEP; general mycology and mycoses; antifungal classes/mechanisms/uses; antibacterial target classes; and resistance mechanisms/stewardship. All sixteen collapse to already represented FHB-102-2 evidence.

Search arithmetic is **16 source-first − 16 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**. No exact normalized prompt-sibling carrier was found, so all 165 distinct physical occurrences survive the family boundary.

### Completed-source delta, cumulative totals and next source

This fifty-sixth one-path hash is now `sourceProcessed=true`, adding **+165 questions / +165 answers / +0 concepts**. Cumulative triage is **4,450 questions / 4,251 answers / 62 concepts**.

Removing the fifty-six processed hashes leaves **38 selected inventory paths / 38 unique SHA-256s**. Their sorted-newline checksum is `78a61c6b756fe2993ad24b5c89702c2506aae33782219df7b516822be3556832`. Remaining audit-review debt is **13 substantive-text / 10 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`56 + 38 = 94`** and path accounting is **`58 + 38 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - PentaGram Mohamed Farid(Pharma102)FHB-2.pdf`, SHA-256 `6c0877cba2e6a0f9a92bc9c3cb1f9e40895afb1d8b1864205a668b62d610f7fb`, 33 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 38 selected inventory paths / 38 unique hashes remain untriaged.

## Completed source — PentaGram Mohamed Farid Pharma102 FHB-2

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - PentaGram Mohamed Farid(Pharma102)FHB-2.pdf` | `6c0877cba2e6a0f9a92bc9c3cb1f9e40895afb1d8b1864205a668b62d610f7fb` | 33 | substantive-text | pages 1–33 rendered and read | Personal pharmacology revision compilation visibly credited in Arabic and English to Mohamed Farid, with matching `Dr.Mohammed Farid` PDF author metadata and a 2020 Microsoft Word 2016 creation date; no authenticated MUST institution, faculty, department, examiner, sitting, marks scheme or official key declaration appears. |

### Exact objective, written and answer boundary

All 33 pages contain assessment material across eight labelled antimicrobial sections. The exact physical boundary is **213 multiple-choice objective prompts + 20 red `Answer →` completion/written prompts = 233 questions**. Of the objective prompts, **207 carry visible selected radio buttons or yellow-highlighted answers**. The six antimalarial multiple-choice fields spanning physical pages 28–29 are visibly unmarked, while all twenty completion fields carry only an empty answer arrow. The resulting answer boundary is **207 prompt-matched source answer observations / 26 source-absent answers / 0 practical or image-dependent / 0 teaching-only occurrences**.

The printed footer claim of 259 questions conflicts with the visible 233-prompt boundary and is not used. The six unmarked antimalarial MCQs are not promoted to answers merely because surrounding sections are highlighted. The twenty empty completion fields remain source-absent written prompts. Printed numbering, spelling, malformed `Default Question Text` artifacts, outdated regimens and academically questionable highlighted choices remain source truth without repair.

### Source-first handles and exactly-four-search gate

The ten source-first handles cover beta-lactam cell-wall agents and clinical use; protein-synthesis inhibitors; nucleic-acid/folate/metronidazole pharmacology; antituberculous drugs; antifungals; antiamoebics; antimalarials; general antimicrobial targets; clinical selection/prophylaxis/combinations; and antimicrobial adverse effects/interactions/resistance/pharmacokinetics. All ten collapse to already represented FHB-102-2 evidence.

Search arithmetic is **10 source-first − 10 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**. No exact normalized prompt-sibling carrier was found, so all 233 distinct physical occurrences survive the family boundary.

### Completed-source delta, cumulative totals and next source

This fifty-seventh one-path hash is now `sourceProcessed=true`, adding **+233 questions / +207 answers / +0 concepts**. Cumulative triage is **4,683 questions / 4,458 answers / 62 concepts**.

Removing the fifty-seven processed hashes leaves **37 selected inventory paths / 37 unique SHA-256s**. Their sorted-newline checksum is `95eb358d3f45ea6b88c139e5ce46fe1586845e7d8d3be56195d95a8e32ac8867`. Remaining audit-review debt is **12 substantive-text / 10 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`57 + 37 = 94`** and path accounting is **`59 + 37 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Pharma Chemo 1 (Q&A - Pentagram).pdf`, SHA-256 `3df95a463227dbe1fa28e03cb5d22b9f0e186ef1ab1a0826ac606af7fc20ee0b`, 21 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 37 selected inventory paths / 37 unique hashes remain untriaged.

## Completed source — Pharma Chemo 1 Q&A Pentagram

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Pharma Chemo 1 (Q&A - Pentagram).pdf` | `3df95a463227dbe1fa28e03cb5d22b9f0e186ef1ab1a0826ac606af7fc20ee0b` | 21 | substantive-text | pages 1–21 rendered and read | Personal PentaGram `Pharma FHB Q & A (1)` revision carrier bearing a Mohamed Eissa signature and Foxit PDF Creator metadata; no authenticated MUST institution, faculty, department, examiner, sitting, marks scheme or official key declaration appears. |

### Exact objective, written and answer boundary

Physical page 1 is a cover. Pages 2–21 contain **106 ordinary text multiple-choice prompts**, and every prompt is immediately followed by a printed `ANSWER` token. The exact raw source boundary is therefore **106 objective MCQs / 106 prompt-matched source answer observations / 0 source-absent / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**.

Sparse and restarted printed numbering does not govern the count: physically distinct prompt-and-option fields are counted once. Orthographic variants such as `amoxycillin`, `Lomofloxacin` and `Bezathine`, plus printed punctuation, simplified mechanisms and academically questionable questions or answer tokens, remain source truth without correction. The answer set remains personal revision-source evidence rather than an authenticated faculty key.

### Prior-family replay reconciliation and exactly-four-search gate

Normalized prompt-plus-option comparison against the completed `FHB-Pharma MCQ Questions.pdf` carrier identifies **25 one-for-one replay fields**, with all 25 printed answers agreeing. This is a partial-overlap carrier rather than an exact sibling: collapse of those 25 replay occurrences leaves **81 governed questions / 81 governed answers** from the 106 raw physical observations.

The five source-first handles cover beta-lactam and glycopeptide cell-wall inhibitors; protein-synthesis inhibitors; quinolone, sulfonamide and other antibacterial pharmacology; antimicrobial clinical selection, prophylaxis, adverse effects and interactions; and antifungal mechanisms, uses and toxicity. All five collapse to prior FHB-102-2 evidence. Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fifty-eighth one-path hash is now `sourceProcessed=true`, adding **+81 questions / +81 answers / +0 concepts**. Cumulative triage is **4,764 questions / 4,539 answers / 62 concepts**.

Removing the fifty-eight processed hashes leaves **36 selected inventory paths / 36 unique SHA-256s**. Their sorted-newline checksum is `79fab508c8724e618176cae37d70d8ad9c7e2d2270c23cca330f0d9e743f9a71`. Remaining audit-review debt is **11 substantive-text / 10 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`58 + 36 = 94`** and path accounting is **`60 + 36 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Pharma Chemo 2 (Q&A - Pentagram).pdf`, SHA-256 `d97e9681737b5bcd5dd9a0527b523657b13bc6adb70aeaeae8d3efdb35367328`, 16 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 36 selected inventory paths / 36 unique hashes remain untriaged.

## Completed source — Pharma Chemo 2 Q&A Pentagram

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Pharma Chemo 2 (Q&A - Pentagram).pdf` | `d97e9681737b5bcd5dd9a0527b523657b13bc6adb70aeaeae8d3efdb35367328` | 16 | substantive-text | pages 1–16 rendered and read | Personal PentaGram `Pharma FHB Q & A (2)` revision carrier bearing a Mohamed Eissa signature and Foxit PDF Creator metadata; no authenticated MUST institution, faculty, department, examiner, sitting, marks scheme or official key declaration appears. |

### Exact objective, written and answer boundary

Physical page 1 is a cover. Pages 2–16 contain **68 ordinary text multiple-choice prompts**, and every prompt is immediately followed by a printed `ANSWER` token. The exact source boundary is therefore **68 objective MCQs / 68 prompt-matched source answer observations / 0 source-absent / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**.

Sparse and restarted numbering does not govern the count. The malformed option sequence that prints `Pyrazinamide` followed by parenthetical `Isoniazid`, plus source spelling, grammar, dated terminology and academically questionable answer claims, remains literal source truth. The inline answer set is personal revision-source evidence rather than an authenticated faculty key.

### Prior-family reconciliation and exactly-four-search gate

Normalized comparison finds no sibling or multi-prompt replay subset against the completed Chemo 1, 59-question student bank, Salama or Mohamed Farid pharmacology carriers. The isolated thematic and stem-level overlaps belong to a distinct non-sibling carrier and do not suppress its physical occurrences, so all **68 questions / 68 answers** survive the governed family boundary.

The four source-first handles cover antituberculous drug mechanisms, regimens, resistance and toxicity; antimalarial therapy, prophylaxis, pregnancy use and toxicity; antiamoebic and metronidazole pharmacology; and anthelmintic drug selection, mechanisms and uses. All four collapse to prior FHB-102-2 evidence. Search arithmetic is **4 source-first − 4 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Completed-source delta, cumulative totals and next source

This fifty-ninth one-path hash is now `sourceProcessed=true`, adding **+68 questions / +68 answers / +0 concepts**. Cumulative triage is **4,832 questions / 4,607 answers / 62 concepts**.

Removing the fifty-nine processed hashes leaves **35 selected inventory paths / 35 unique SHA-256s**. Their sorted-newline checksum is `e34423d9aebdd72892dcc5f5476386254220a00feb5cdf42227c8c51ddc69541`. Remaining audit-review debt is **10 substantive-text / 10 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`59 + 35 = 94`** and path accounting is **`61 + 35 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Pharma FHB revision MCQs.pdf`, SHA-256 `d948497bb2689e89db0fcd72328049516cc34ec6255a346d032fbd83010c1114`, 52 pages, with a sparse-text audit sample.

**BLOCKED — S1 cannot be approved:** 35 selected inventory paths / 35 unique hashes remain untriaged.

## Completed source — Pharma FHB revision MCQs

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Pharma FHB revision MCQs.pdf` | `d948497bb2689e89db0fcd72328049516cc34ec6255a346d032fbd83010c1114` | 52 | sparse-text | pages 1–52 rendered and read | Anonymous PDFium-generated revision slide carrier; the terminal MUST-branded thank-you slide supplies design context only. No visible title, author, examiner, sitting, marks scheme or authenticated faculty-key declaration appears. |

### Exact boundary and source truth

Pages 1–35 and 37–50 contain **49 ordinary text objective MCQs**. Forty carry a visibly rendered red `ANSWER` token and nine remain visibly unkeyed. Pages 36 and 51 are explanatory teaching/reveal slides without a new assessment field, and page 52 is a non-assessment thank-you closer. The exact raw boundary is therefore **49 objective prompts / 40 prompt-matched source answer observations / 9 source-absent answers / 0 written / 0 practical or image-dependent / 2 teaching-reference pages**.

The nine absent answers are not inferred from other carriers. Two prompts whose extract layer contains additional option text remain governed only by the physically rendered field because their last option is clipped outside the page. Red answer marks are anonymous revision-source evidence, not an authenticated faculty key. Printed wording, clipping and academically questionable answer claims remain source truth without repair.

### Prior-family replay and four-search gate

Normalized comparison against the completed Chemo 1 and Chemo 2 families proves **12 complete visible prompt-and-option replays**. Eleven carry agreeing answer observations and one is unkeyed in this carrier, so replay collapse removes twelve questions and eleven answers. Two further extract-layer string matches are not complete visible fields and are not collapsed. The governed delta is **49 − 12 = 37 questions** and **40 − 11 = 29 answers**.

The six source-first handles cover antituberculous and antileprosy pharmacology; antifungal mechanisms, uses and toxicity; tetracycline, macrolide and other protein-synthesis inhibitors; aminoglycoside mechanisms, dosing, uses and toxicity; fluoroquinolone, sulfonamide and antifolate pharmacology; and general antimicrobial selection, pharmacodynamics, prophylaxis and adverse effects. All six collapse to prior evidence. Search arithmetic is **6 source-first − 6 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Delta, cumulative totals and next source

This sixtieth one-path hash is now `sourceProcessed=true`, adding **+37 questions / +29 answers / +0 concepts**. Cumulative triage is **4,869 questions / 4,636 answers / 62 concepts**.

Removing the sixty processed hashes leaves **34 selected inventory paths / 34 unique SHA-256s**. Their sorted-newline checksum is `c0b6f0a4f6adea42968aac5f7a8a38c37a89b7ad410abd0f004cad25011af3ae`. Remaining audit-review debt is **10 substantive-text / 9 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`60 + 34 = 94`** and path accounting is **`62 + 34 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Special Chemotherapy [ANSWERED].pdf`, SHA-256 `42bc67ac2f79d260f47b534c735175f3e8ee8fc3f4bb9301ab1d00ee522f3aaf`, 9 pages, with a sparse-text audit sample.

**BLOCKED — S1 cannot be approved:** 34 selected inventory paths / 34 unique hashes remain untriaged.

## Completed source — Special Chemotherapy ANSWERED

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Special Chemotherapy [ANSWERED].pdf` | `42bc67ac2f79d260f47b534c735175f3e8ee8fc3f4bb9301ab1d00ee522f3aaf` | 9 | sparse-text | pages 1–9 rendered and read | Direct FireShot capture of a finished MUST Smart E-Learning Spring 2021 `Fundamentals of human body II` review attempt titled `Special Chemotherapy revision`; strong platform/module/review provenance, but the personal login, zero-score unattempted state and lack of examiner or official-key declaration limit authority. |

### Exact boundary and answer state

The nine long-form rendered pages contain one continuous **Q1–Q57** sequence. Every field is an ordinary text MCQ and every prompt is followed by one platform-disclosed `The correct answer is:` line. The exact boundary is **57 objective prompts / 57 prompt-matched answer observations / 0 source-absent / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**.

Every question is visibly marked `Not answered`, and the finished attempt reports `0.00/57.00`; therefore the answer lines are platform review disclosures rather than student selections. They are strong source-answer observations but are not explicitly declared an authenticated faculty key. The personal login name is excluded. Printed grammar, dated regimens and academically questionable platform answers remain source truth without correction.

### Prior-family and exactly-four-search gate

No completed sibling or multi-prompt replay family suppresses this carrier. The similarly named nine-page `Special Chemotherapy.pdf` remains unprocessed and will be reconciled later as the sibling, so all **57 questions / 57 answers** survive this first governed family occurrence.

The five source-first handles cover antituberculous and antileprosy drug mechanisms, regimens, uses and adverse effects; antifungal mechanisms, uses, adverse effects and resistance; antiamoebic drug selection, mechanisms and adverse effects; antimalarial mechanisms, treatment, prophylaxis and transmission prevention; and antifolate/special-chemotherapy pharmacology. All five collapse to prior FHB-102-2 evidence. Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Delta, cumulative totals and next source

This sixty-first one-path hash is now `sourceProcessed=true`, adding **+57 questions / +57 answers / +0 concepts**. Cumulative triage is **4,926 questions / 4,693 answers / 62 concepts**.

Removing the sixty-one processed hashes leaves **33 selected inventory paths / 33 unique SHA-256s**. Their sorted-newline checksum is `7f86a41d86f3593ae978bf649d83cd66c3a20ab713b87f8f133023b89171e313`. Remaining audit-review debt is **10 substantive-text / 8 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`61 + 33 = 94`** and path accounting is **`63 + 33 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Special Chemotherapy.pdf`, SHA-256 `751bfbee69cbb36e1f12ca0cf411ca57ad0eeeddefd8386d822fe606293c4165`, 9 pages, with a sparse-text audit sample.

**BLOCKED — S1 cannot be approved:** 33 selected inventory paths / 33 unique hashes remain untriaged.

## Completed source — Special Chemotherapy unkeyed sibling

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - Special Chemotherapy.pdf` | `751bfbee69cbb36e1f12ca0cf411ca57ad0eeeddefd8386d822fe606293c4165` | 9 | sparse-text | pages 1–9 rendered and read | Direct FireShot capture of an active MUST Smart E-Learning Spring 2021 `Fundamentals of human body II` attempt titled `Special Chemotherapy revision`; strong platform/module assessment provenance, but the personal login and lack of examiner, result or official-key declaration limit authority. |

### Exact boundary and answer state

The nine long-form rendered pages contain one continuous **Q1–Q57** sequence. Every field is an ordinary text MCQ, visibly marked `Not complete`, with no selected response and no correct-answer disclosure. The exact boundary is **57 objective prompts / 0 answer observations / 57 source-absent answers / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**. No answer is inferred from the keyed sibling; that sibling's disclosures remain the already-counted family answer observations. The personal login is excluded, and printed grammar, dated regimens and academically questionable claims remain source truth.

### Exact sibling and search reconciliation

An independent normalized stem-plus-option comparison found **57 unique fields in the unkeyed carrier, 57 unique fields in the ANSWERED carrier, and a 57/57 bijection with no unmatched fields**. The numbering is shuffled—for example, this carrier's Q1 maps to ANSWERED Q55—but the complete fields agree. Because the ANSWERED sibling already contributed the family occurrence and its 57 answer disclosures, the unkeyed carrier contributes **+0 questions / +0 answers / +0 concepts**.

The same five source-first handles cover antituberculous and antileprosy pharmacology; antifungal pharmacology; antiamoebic pharmacology; antimalarial pharmacology; and antifolate/special-chemotherapy pharmacology. All five collapse to prior FHB-102-2 evidence. Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Delta, cumulative totals and next source

This sixty-second one-path hash is now `sourceProcessed=true`. Cumulative triage remains **4,926 questions / 4,693 answers / 62 concepts**.

Removing the sixty-two processed hashes leaves **32 selected inventory paths / 32 unique SHA-256s**. Their sorted-newline checksum is `7a784cd3ef38db6c02e1eda3569996a8a64639571b60ef244f8104b452f6ef9e`. Remaining audit-review debt is **10 substantive-text / 7 sparse-text / 4 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`62 + 32 = 94`** and path accounting is **`64 + 32 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - [Answers] MCQs Abubakr (ASU) - General Cemotherapy.pdf`, SHA-256 `d14cd183898771cf094e221c221fbffc7b1965b4f6c07579f3ba2207abf7b225`, 14 pages, with an empty-text audit sample.

**BLOCKED — S1 cannot be approved:** 32 selected inventory paths / 32 unique hashes remain untriaged.

## Completed source — Abubakr/ASU General Chemotherapy answers

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - [Answers] MCQs Abubakr (ASU) - General Cemotherapy.pdf` | `d14cd183898771cf094e221c221fbffc7b1965b4f6c07579f3ba2207abf7b225` | 14 | empty-text | pages 1–14 rendered and read | External Year 3 Pharmacology `8-General chemotherapy` application answer-reveal capture bearing an Abubakr logo and ASU filename attribution; no visible MUST module, department, examiner, sitting, marks scheme or authenticated faculty-key declaration. |

### Exact boundary and answer state

The fourteen rendered scroll-capture pages cover one continuous **Q1–Q53** sequence. Five fields straddle adjacent screenshots—Q16, Q19, Q35, Q47 and Q50—and are repeated views of the same numbered cards, not new occurrences. The exact unique boundary is **53 ordinary objective MCQs / 53 green-marked answer observations / 0 source-absent / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**. The green checks are external app disclosures, not authenticated MUST faculty-key marks. Printed spelling, grammar, dated recommendations and academically questionable answers remain source truth.

### Replay and exactly-four-search gate

Normalized complete stem-plus-option comparison proves that source Q1 and Q2 exactly reproduce the completed Mucize module-wide advanced-MCQ fields; their green-marked `Benzathine penicillin` and `Augmentin` answers agree with the earlier printed A and D answers. No other one of the 53 complete fields matches a completed carrier. Therefore **2 prompts / 2 answers collapse**, leaving governed **+51 questions / +51 answers**.

Eight source-first handles cover penicillin/cephalosporin/carbapenem/monobactam pharmacology; aminoglycosides; macrolide/tetracycline/chloramphenicol/clindamycin pharmacology; sulfonamide/trimethoprim pharmacology; fluoroquinolones; antituberculous drugs; resistant-organism agents; and antimicrobial pharmacodynamics, selection, interactions and adverse effects. All eight collapse to prior FHB-102-2 evidence. Search arithmetic is **8 source-first − 8 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Delta, cumulative totals and next source

This sixty-third one-path hash is now `sourceProcessed=true`, adding **+51 questions / +51 answers / +0 concepts**. Cumulative triage is **4,977 questions / 4,744 answers / 62 concepts**.

Removing the sixty-three processed hashes leaves **31 selected inventory paths / 31 unique SHA-256s**. Their sorted-newline checksum is `a97cd6ce2911f714d0d0294a723c10e87a4ac2eede7f38fc023d742e86f46d04`. Remaining audit-review debt is **10 substantive-text / 7 sparse-text / 3 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`63 + 31 = 94`** and path accounting is **`65 + 31 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - [Answers] MCQs Abubakr (ASU) - Special Chemotherapy.pdf`, SHA-256 `e2dff78742250a8d7f778f2431724d8eedd21bea41cb4c9e9f04670beeab336a`, 7 pages, with an empty-text audit sample.

**BLOCKED — S1 cannot be approved:** 31 selected inventory paths / 31 unique hashes remain untriaged.

## Completed source — Abubakr/ASU Special Chemotherapy answers

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - [Answers] MCQs Abubakr (ASU) - Special Chemotherapy.pdf` | `e2dff78742250a8d7f778f2431724d8eedd21bea41cb4c9e9f04670beeab336a` | 7 | empty-text | pages 1–7 rendered and read | External Year 3 Pharmacology `9-Special chemotherapy` answer-reveal capture bearing an Abubakr logo and ASU filename attribution; no visible MUST module, department, examiner, sitting, marks scheme or authenticated faculty-key declaration. |

### Exact boundary and answer state

The seven rendered scroll-capture pages cover one continuous **Q1–Q25** sequence. Repeated card portions at page boundaries are scroll overlaps rather than new occurrences. The unique boundary is **25 ordinary objective MCQs / 25 green-marked answer observations / 0 source-absent / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**. The green checks are external application observations rather than authenticated MUST faculty-key marks. Printed spelling, grammar, dated recommendations and academically questionable answers remain source truth.

### Replay and exactly-four-search gate

Complete stem-plus-option comparison against the completed FHB-102-2 pharmacology family, including the 57-item MUST-platform Special Chemotherapy family, finds no exact prior assessment-field replay. All **25 questions / 25 answers** therefore survive as this carrier's governed occurrence set.

Five source-first handles cover antifungal pharmacology; antiamoebic and metronidazole pharmacology; antiviral and interferon pharmacology; anthelmintic drug selection and toxicity; and antimalarial/antifolate pharmacology. All five collapse to prior FHB-102-2 evidence. Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Delta and cumulative totals

This sixty-fourth one-path hash is now `sourceProcessed=true`, adding **+25 questions / +25 answers / +0 concepts**. Cumulative triage is **5,002 questions / 4,769 answers / 62 concepts**.

## Completed source — Abubakr/ASU General Chemotherapy unkeyed sibling

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - [Questions] MCQs Abubakr (ASU) - General Cemotherapy.pdf` | `44571f8f9fc79493e261a97807914ab9e7127afc102b33fd997c71433eab6217` | 14 | empty-text | pages 1–14 rendered and read | External Year 3 Pharmacology `8-General chemotherapy` active-question capture bearing an Abubakr logo and ASU filename attribution; no visible MUST module, department, examiner, sitting, marks scheme or authenticated faculty-key declaration. |

### Exact boundary, sibling and search reconciliation

The fourteen rendered scroll pages contain one continuous **Q1–Q53** sequence. Five page-boundary cards are repeated scroll views and collapse by question number, leaving **53 ordinary objective MCQs / 0 answers / 53 source-absent answers / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**. No answer is imported from the answer carrier as a new observation.

Normalized stem-plus-option comparison proves **53 unique fields in each General Chemotherapy carrier and a sequence-preserving 53/53 bijection with no unmatched field**. The answered sibling already contributed the family occurrence after collapsing its two Mucize replays; therefore this unkeyed sibling adds **+0 questions / +0 answers / +0 concepts**. The same eight source-first handles are prior-represented, so search arithmetic is **8 source-first − 8 prior-collapsed = 0 accepted; 0 × 4 = 0 searches** and post-prior disposition is **0 live / 0 pending / 0 new**.

### Delta and cumulative totals

This sixty-fifth one-path hash is now `sourceProcessed=true`. Cumulative triage remains **5,002 questions / 4,769 answers / 62 concepts**.

## Completed source — Abubakr/ASU Special Chemotherapy unkeyed sibling

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - [Questions] MCQs Abubakr (ASU) - Special Chemotherapy.pdf` | `d787ff1868b620e9ffa46aacb390074c49aadaa67a4687b26792c3a625ea3fc7` | 7 | empty-text | pages 1–7 rendered and read | External Year 3 Pharmacology `9-Special chemotherapy` active-question capture bearing an Abubakr logo and ASU filename attribution; no visible MUST module, department, examiner, sitting, marks scheme or authenticated faculty-key declaration. |

### Exact boundary, sibling and search reconciliation

The seven rendered scroll pages contain one continuous **Q1–Q25** sequence. Repeated card portions at page boundaries collapse by question number, leaving **25 ordinary objective MCQs / 0 answers / 25 source-absent answers / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**. No answer is imported from the answered sibling as a new observation.

Normalized stem-plus-option comparison proves **25 unique fields in each Special Chemotherapy application carrier and a sequence-preserving 25/25 bijection with no unmatched field**. The answered sibling already contributed the complete family occurrence and answer set, so this unkeyed sibling adds **+0 questions / +0 answers / +0 concepts**. The same five handles are prior-represented, giving **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches** and **0 live / 0 pending / 0 new**.

### Grouped-checkpoint cumulative totals and next source

This sixty-sixth one-path hash is now `sourceProcessed=true`. The three-source grouped checkpoint adds **+25 questions / +25 answers / +0 concepts** in total, bringing cumulative triage to **5,002 questions / 4,769 answers / 62 concepts**.

Removing the sixty-six processed hashes leaves **28 selected inventory paths / 28 unique SHA-256s**. Their sorted-newline checksum is `4da703767ac5565696ba25839644b0fe76b530995e80d8e517bd72396ea35e1b`. Remaining audit-review debt is **10 substantive-text / 7 sparse-text / 0 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`66 + 28 = 94`** and path accounting is **`68 + 28 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - mcq pharma1 FHB.pdf`, SHA-256 `1f9a64fcab03438c34c7ba82cf11c620e4e6c6d2049ae93cc58dc5f545bb30ea`, 5 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 28 selected inventory paths / 28 unique hashes remain untriaged.

## Completed source — `mcq pharma1 FHB` general-chemotherapy practice

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - mcq pharma1 FHB.pdf` | `1f9a64fcab03438c34c7ba82cf11c620e4e6c6d2049ae93cc58dc5f545bb30ea` | 5 | substantive-text | pages 1–5 rendered and read | Word-authored `LEC 1 general chemotherapy MCQ practice` handout with `Shady Mohammad Zaki` in the PDF author property and FHB attribution only in the inventory filename; no visible institution, MUST platform, department, examiner, sitting, marks scheme or authenticated faculty-key declaration. |

### Exact boundary and answer state

The five rendered pages contain one continuous **Q1–Q20** sequence: Q1–Q4 on page 1, Q5–Q8 on page 2, Q9–Q12 on page 3, Q13–Q17A on page 4, and Q17B–Q20 plus a complete `Quick Answer Key` on page 5. Q17 straddles the page boundary but is one field. The exact unique boundary is **20 ordinary objective MCQs / 20 printed answer observations / 0 source-absent / 0 written / 0 practical or image-dependent / 0 teaching-only occurrences**. The quick key is retained as a handout answer observation rather than promoted to authenticated faculty-key authority.

### Replay and exactly-four-search gate

Complete stem-plus-option comparison against the completed FHB-102-2 family finds no exact prior assessment-field replay, so all **20 questions / 20 answers** survive.

Four source-first handles cover bactericidal/bacteriostatic selection and Gram-stain framing; antimicrobial cell-wall and protein-synthesis mechanisms; nucleic-acid and folate-pathway inhibitors; and antimicrobial adverse effects plus concentration/time-dependent pharmacodynamics. All four collapse to prior FHB-102-2 evidence. Search arithmetic is **4 source-first − 4 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Delta, cumulative totals and next source

This sixty-seventh one-path hash is now `sourceProcessed=true`, adding **+20 questions / +20 answers / +0 concepts**. Cumulative triage is **5,022 questions / 4,789 answers / 62 concepts**.

Removing the sixty-seven processed hashes leaves **27 selected inventory paths / 27 unique SHA-256s**. Their sorted-newline checksum is `295118f20a2a18ca15e28163b908ed2229c365262c8d605391a3a8a986f2aa44`. Remaining audit-review debt is **9 substantive-text / 7 sparse-text / 0 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`67 + 27 = 94`** and path accounting is **`69 + 27 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - pharma fhb 102-2 by salama.pdf`, SHA-256 `346f87242b75a96f83216cf3975a04282624d76af6e8054c8730909926cacd2d`, 39 pages, with a substantive-text audit sample.

**BLOCKED — S1 cannot be approved:** 27 selected inventory paths / 27 unique hashes remain untriaged.

## Completed source — Mohamed Salama FHB 102-2 pharmacology bank

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/05 MCQs/MCQs - pharma fhb 102-2 by salama.pdf` | `346f87242b75a96f83216cf3975a04282624d76af6e8054c8730909926cacd2d` | 39 | substantive-text | pages 1–39 rendered and read | Word-authored `PHARMA FHB 102-2` review bank naming Mohamed Salama in the PDF metadata and throughout the cover/footer; no visible institution, MUST platform, department, examiner, sitting, marks scheme or authenticated faculty-key declaration. |

### Exact boundary and answer state

Page 1 is a cover. Pages 2–13 contain a continuous **general-chemotherapy MCQ 1–60** sequence; pages 14–20 reset numbering for **35 antituberculous, antiamoebic, antimalarial, antileprosy and antifolate MCQs**; pages 21–28 reset numbering for **40 antifungal and antiviral MCQs**; and pages 29–39 contain a `WRITTEN` Q1–Q50 sequence. Every occurrence has an adjacent printed answer. The exact boundary is **135 ordinary objective MCQs / 50 ordinary written prompts / 185 printed answer observations / 0 source-absent / 0 practical or image-dependent / 0 teaching-only occurrences**. The answers remain author-attributed review observations rather than authenticated faculty-key marks.

### Replay and exactly-four-search gate

Complete-field comparison against all sixty-seven processed hash families, including the earlier `MICRO_PHARMA FHB 102-2 BY SALAMA` carrier, finds **0 exact prior prompt-plus-option replays for the 135 MCQs and 0 exact prior written-prompt replays for the 50 written fields**. All **185 questions / 185 answers** therefore survive; repeated topics inside the source remain distinct authored occurrences rather than page overlaps.

Five source-first handles cover general antimicrobial mechanisms, selection and adverse effects; antituberculous and antileprosy pharmacology; antiamoebic, antimalarial and antifolate pharmacology; antifungal pharmacology; and antiviral plus macrolide/clindamycin written pharmacology. All five collapse to prior FHB-102-2 evidence. Search arithmetic is **5 source-first − 5 prior-collapsed = 0 accepted; 0 × 4 = 0 searches**. Post-prior disposition is **0 live / 0 pending / 0 new**.

### Delta, cumulative totals and next source

This sixty-eighth one-path hash is now `sourceProcessed=true`, adding **+185 questions / +185 answers / +0 concepts**. Cumulative triage is **5,207 questions / 4,974 answers / 62 concepts**.

Removing the sixty-eight processed hashes leaves **26 selected inventory paths / 26 unique SHA-256s**. Their sorted-newline checksum is `09ee2654bcfa6ba70bdac1180a1c1bb558f633afc603a4c72577f7c4c7114688`. Remaining audit-review debt is **8 substantive-text / 7 sparse-text / 0 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`68 + 26 = 94`** and path accounting is **`70 + 26 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 3. Antimicrbial Protein inhibitors.pdf`, SHA-256 `3a69ab072e403a68f2876542ad6511dfa2dec9395a5cd0af0141e4bafb4792c5`, 49 pages, with a sparse-text audit sample.

**BLOCKED — S1 cannot be approved:** 26 selected inventory paths / 26 unique hashes remain untriaged.

## Grouped completed checkpoint — pharmacology lecture/reference tail

| Source path | SHA-256 | Pages | Audit class | Full visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 3. Antimicrbial Protein inhibitors.pdf` | `3a69ab072e403a68f2876542ad6511dfa2dec9395a5cd0af0141e4bafb4792c5` | 49 | sparse-text | pages 1–49 rendered and read | Bacterial Protein Inhibitors lecture slides; no authenticated MUST examination or faculty-key declaration. |
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 4. Antimicrbial Nucleopotein (DNA and RNA) Inhibitors.pdf` | `5dfd7701d995629e7c36c7967736e21927c28a3a5e89272f8c40e20cacbac952` | 23 | sparse-text | pages 1–23 rendered and read | Nucleoprotein inhibitors lecture slides; no authenticated MUST examination or faculty-key declaration. |
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 5. Antifolate Drugs.pdf` | `1c098c79464fd2b1e47dce741c09a0c29fa2446feeb280ea1f7ff1ac91d7733f` | 10 | sparse-text | pages 1–10 rendered and read | Antifolate antimicrobials lecture slides; no authenticated MUST examination or faculty-key declaration. |
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 5. Folate Antagonists (Dr. Esraa).pdf` | `fca512413dacd95eeb9c00487fa1a7f9fc7e78ab195f3aeb0ac3c295bc16398b` | 12 | sparse-text | pages 1–12 rendered and read | Dr Esraa Mostafa Elnahas, Lecturer of Clinical Pharmacology, Faculty of Medicine, Ain Shams University; named lecturer provenance, not MUST examination/key authority. |
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 6. TB and Leprosy (Dr. Esraa).pdf` | `47c08908667b08b453d71594041a4e9ee2912b0e594bc80b5ef82658381f933d` | 48 | sparse-text | pages 1–48 rendered and read | Dr Esraa Mostafa Elnahas, Lecturer of Clinical Pharmacology, Faculty of Medicine, Ain Shams University; named lecturer provenance, not MUST examination/key authority. |
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - 7. Antifungal_Drugs.pdf` | `bbf7f72f08ce85032b4d64e013a499d0846398d04b970d9248198ad5c141be32` | 26 | sparse-text | pages 1–26 rendered and read | MUST University College of Medicine teaching deck; no examination sitting, marks scheme or authenticated faculty key. |
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - FHB Pharmacology 102 Final Exam Notes 2025.pdf` | `d6c4b7b739a00dd96eb575836ca1ff2b64e4b006aa7cb6d32b2c995256418349` | 14 | substantive-text | pages 1–14 rendered and read | Typed final-exam study notes; the label is unverified and not promoted to examination authority. |

### Exact boundary and teaching-only disposition

The seven carriers are fully revealed lecture/reference content. The protein-inhibitor deck covers synthesis foundations, aminoglycosides, tetracyclines, chloramphenicol, macrolides, linezolid, clindamycin, tissue penetration, stewardship and resistance; the nucleoprotein deck covers fluoroquinolones, rifampicin, metronidazole, pharmacokinetics and resistance; the two folate decks cover sulfonamides, trimethoprim, co-trimoxazole, mechanism, adverse effects and uses; the TB/leprosy deck covers fluoroquinolones, rifampicin, TB regimens, isoniazid, pyrazinamide, ethambutol and antileprotic drugs; the antifungal deck covers fungal biology, azoles, amphotericin B, flucytosine and griseofulvin; and the final notes summarize those same domains. Declarative bullets, learning objectives, regimen tables, labeled diagrams, photographs and thank-you slides are teaching structure, not assessment response fields. The exact grouped boundary is **0 objective MCQs / 0 written prompts / 0 practical or image-dependent prompts / 0 printed answer observations / 0 source-absent answers / 175 teaching-reference pages**.

### Replay and exactly-four-search gate

No assessment prompt or answer observation exists in any of the seven carriers, so no replay mapping is required and no family occurrence is created. The source-first gate stops before search for every carrier: **0 accepted × 4 = 0 searches**, with **0 live / 0 pending / 0 new** dispositions throughout. Named Ain Shams and MUST teaching provenance remains descriptive only and is not promoted to official key authority.

### Delta, cumulative totals and next source

The sixty-ninth through seventy-fifth hashes are now `sourceProcessed=true`; the grouped checkpoint contributes **+0 questions / +0 answers / +0 concepts**. Cumulative triage is **5,207 questions / 4,974 answers / 62 concepts**.

Removing the seventy-five processed hashes leaves **19 selected inventory paths / 19 unique SHA-256s**. Their sorted-newline checksum is `720841e613b1513d016b3024fdac13b5f0d990d41c54f195330de4a1a93aa925`. Remaining audit-review debt is **7 substantive-text / 1 sparse-text / 0 empty-text / 11 audit-not-found / 0 audit-extract-failed rows**. Unique-hash accounting is **`75 + 19 = 94`** and path accounting is **`77 + 19 = 96`**.

The next evidence-ranked source is `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - Pharmacology FHB102-2 Final all.pdf`, SHA-256 `1213f6e2c8296e7a93d709c9ee3eb3b038d02152339b968b392e37dcb510c68a`, 168 pages, with a sparse-text audit sample.

**BLOCKED — S1 cannot be approved:** 19 selected inventory paths / 19 unique hashes remain untriaged.

## Partial source checkpoint — `EOM - Pharmacology FHB102-2 Final all`, pages 1–140

| Source path | SHA-256 | Source pages | Audit class | Bounded visual read | Provenance / authority |
|---|---|---:|---|---|---|
| `Year 1/Semester 102/FHB 102-2/Pharmacology/06 EOM Exams/EOM - Pharmacology FHB102-2 Final all.pdf` | `1213f6e2c8296e7a93d709c9ee3eb3b038d02152339b968b392e37dcb510c68a` | 168 | sparse-text | pages 1–140 rendered and read | Concatenated pharmacology teaching/reference carrier assembled under an `EOM` / `Final all` filename. The reviewed pages show no examination fields, sitting, marks scheme, examiner or authenticated faculty-key declaration. |

### Exact bounded boundary and handle state

Pages 1–6 introduce bacterial protein inhibitors, replication/transcription/translation and prokaryotic/eukaryotic ribosomes. Pages 7–11 cover aminoglycoside pharmacokinetics, clinical uses, adverse effects and concentration-dependent killing. Pages 12–20 introduce tetracyclines and cover representative drugs, elimination, pharmacokinetics, spectrum, uses, acne-treatment imagery and doxycycline.

The latest pages 21–40 tranche continues with tetracycline adverse effects and mechanism on pages 21–25; chloramphenicol pharmacology, uses, adverse effects and interaction imagery on pages 26–32; macrolide pharmacokinetics, uses and adverse effects on pages 33–37; linezolid pharmacology on pages 38–39; and a clindamycin title/product slide on page 40. All twenty new pages are fully revealed declarative teaching/reference slides. Labelled diagrams, bullet lists and product or clinical images are not assessment response fields.

The latest pages 41–60 tranche contains clindamycin mechanism, uses, therapeutics and a protein-inhibitor mechanism diagram on pages 41–44; pharmacokinetic treatment principles, stewardship/mnemonics and resistance on pages 45–48; a closing thank-you separator on page 49; antifolate antimicrobial title, drugs, mechanism, activity, pharmacokinetics, adverse effects and uses on pages 50–58; a closing thank-you separator on page 59; and the opening named Folate Antagonists teaching slide on page 60. The exact tranche has **18 teaching-reference pages / 2 non-assessment closing separators**.

The latest pages 61–80 tranche continues folate-antagonist teaching through sulfonamides, trimethoprim and co-trimoxazole on pages 61–70; page 71 is a closing thank-you separator; pages 72–74 introduce nucleoprotein inhibition, protein synthesis and DNA replication; and pages 75–80 cover fluoroquinolone introduction, mechanism, spectrum, pharmacokinetics, clinical uses and adverse effects. The exact tranche has **19 teaching-reference pages / 1 non-assessment closing separator**.

The latest pages 81–100 tranche covers rifampicin mechanism and uses on pages 81–84; metronidazole mechanism, uses and adverse effects on pages 85–89; treatment pharmacokinetics, stewardship and antimicrobial resistance on pages 90–93; a multilingual thank-you separator on page 94; a nucleoprotein-inhibitor recap on pages 95–97; and renewed fluoroquinolone mechanism and classification teaching on pages 98–100. The exact tranche has **19 teaching-reference pages / 1 non-assessment closing separator**.

The latest pages 101–120 tranche continues fluoroquinolone spectrum, members, clinical uses and adverse effects on pages 101–104; recaps rifampicin mechanism, pharmacokinetics, uses and adverse effects on pages 105–109; revisits antimicrobial resistance on page 110; and covers tuberculosis overview, spread, chemotherapy goals, first- and second-line drugs and treatment regimens on pages 111–120. All twenty pages are fully revealed teaching/reference slides.

The latest pages 121–140 tranche covers problems with TB therapy on page 121; rifamycin title, overview and uses on pages 122–124; isoniazid mechanism, pharmacokinetics, uses and adverse effects on pages 125–130; pyrazinamide on pages 131–133; ethambutol on pages 134–137; and antileprotic-drug overview, classification and dapsone on pages 138–140. All twenty pages are fully revealed teaching/reference slides.

The exact pages 121–140 tranche is **0 objective MCQs / 0 written prompts / 0 practical or image-dependent prompts / 0 printed answer observations / 0 source-absent answers / 20 teaching-reference pages / 0 non-assessment separators**. The cumulative pages 1–140 boundary is therefore **0 objective MCQs / 0 written prompts / 0 practical or image-dependent prompts / 0 printed answer observations / 0 source-absent answers / 136 teaching-reference pages / 4 non-assessment closing separators**. With no assessment prompt, the source-first assessment handle count is **0**, so **0 accepted × 4 = 0 searches** and **0 live / 0 pending / 0 new**. No answer is inferred and no declarative statement is reverse-engineered into a question.

### Partial-state reconciliation and next page

This is not a completed source family: only pages **1–140 of 168** are adjudicated, pages **141–168** remain unread in this checkpoint, and the exact resume boundary is **page 141**. The hash remains `sourceProcessed=false` and stays in the remaining set. The latest-tranche and cumulative partial delta is **+0 questions / +0 answers / +0 concepts**, leaving cumulative triage at **5,207 questions / 4,974 answers / 62 concepts**.

Processed/remaining arithmetic therefore does not change: **75 processed unique hashes + 19 remaining unique hashes = 94**, with **77 processed paths + 19 remaining paths = 96**. The remaining checksum stays `720841e613b1513d016b3024fdac13b5f0d990d41c54f195330de4a1a93aa925`, and remaining audit debt stays **7 substantive-text / 1 sparse-text / 0 empty-text / 11 audit-not-found / 0 audit-extract-failed**.

**BLOCKED — S1 cannot be approved:** current source resumes at page 141; 19 selected inventory paths / 19 unique hashes remain untriaged.
