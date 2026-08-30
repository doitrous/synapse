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
