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
