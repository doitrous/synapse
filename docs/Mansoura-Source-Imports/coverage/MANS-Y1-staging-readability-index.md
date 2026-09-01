# Mansoura Year 1 staging — readability index

`node scripts/content/pagetext.mjs index "_Staging/Telegram Year 1" --out ...`. 1,340 PDF
files indexed (the 3 `.apkg` and 1 `.docx` staging files aren't PDFs, not indexed here),
25,913 pages total, 5,611 garbled pages (scanned/image, no text layer) across 561 files
(41.9% of files have at least one garbled page). By archive group:

| Group | Files with ≥1 garbled page | Total files | % |
|---|--:|--:|--:|
| AEP | 136 | 313 | 43.5% |
| HBG | 94 | 229 | 41.0% |
| PPPM | 149 | 422 | 35.3% |
| MSS | 124 | 263 | 47.1% |
| HIS | 58 | 113 | 51.3% |

No OCR was run here — S1b is extraction-cache only, per the manual. Two of the
Priority-4 set's HIS files are garbled scans (`HIS 1- MCQ-scan.pdf`, `Histo HIS
Important MCQ.pdf`) and were OCR'd separately for the S3 triage, along with one further
HIS bank (`Patho HIS Important MCQ.pdf`, next-tier candidate, not Priority-4 itself);
see `MANS-HIS-203-triage.md`.

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| AEP Module - 64th/1-MCQ_Anatomy.pdf | 12 | 2728 | 0 | 0 |
| AEP Module - 64th/1-MCQ_Physio_AEP.pdf | 61 | 19518 | 0 | 0 |
| AEP Module - 64th/1. terminology 2025 mcq.pdf | 9 | 1542 | 0 | 0 |
| AEP Module - 64th/1. terminology 2025.pdf | 8 | 715 | 0 | 0 |
| AEP Module - 64th/10, Autonomic Nervous System  Under Different Situations.pdf | 5 | 726 | 0 | 0 |
| AEP Module - 64th/10, Lec- ANS under different situation.pdf | 31 | 794 | 4 | 0 |
| AEP Module - 64th/11, Cholinergic  transmission.pdf | 27 | 1006 | 1 | 0 |
| AEP Module - 64th/11, Cholinergic Transmission and Receptors.pdf | 7 | 967 | 0 | 0 |
| AEP Module - 64th/12, adrenergic transmission (2).pdf | 7 | 880 | 0 | 0 |
| AEP Module - 64th/12, adrenergic transmission.pdf | 43 | 1388 | 2 | 0 |
| AEP Module - 64th/13.pdf | 10 | 0 | 10 | 0 |
| AEP Module - 64th/15, lecture 15 (propagation of action potential and changes).pdf | 14 | 359 | 1 | 0 |
| AEP Module - 64th/15,_lecture_15_Propagation_of_action_potential_and_changes_1.pdf | 8 | 1398 | 0 | 0 |
| AEP Module - 64th/16, SENT 16.pdf | 34 | 195 | 25 | 0 |
| AEP Module - 64th/16, SENT, Synapses.pdf | 4 | 645 | 0 | 0 |
| AEP Module - 64th/17, final Blood flow students.pdf | 26 | 1267 | 1 | 0 |
| AEP Module - 64th/17, final blood flow, 13-12-2024.pdf | 5 | 841 | 0 | 0 |
| AEP Module - 64th/2, Lecture 2.pdf | 24 | 2181 | 0 | 0 |
| AEP Module - 64th/2,_Lecture_2_Transport_through_cell_membrane_new_2026_with_record.pdf | 46 | 2120 | 10 | 0 |
| AEP Module - 64th/2-Anatomy Cases.pdf | 8 | 1529 | 0 | 0 |
| AEP Module - 64th/2-Physio Cases Book.pdf | 6 | 1277 | 0 | 0 |
| AEP Module - 64th/3, Intercellular Connections.pdf | 8 | 1044 | 0 | 0 |
| AEP Module - 64th/3,_Lec_Intercellular_Connections_and_Communications_and_Cell_Signaling.pdf | 23 | 1056 | 0 | 0 |
| AEP Module - 64th/3-Physio Written Book.pdf | 34 | 8166 | 0 | 0 |
| AEP Module - 64th/3-Written_Anatomy.pdf | 43 | 11489 | 0 | 0 |
| AEP Module - 64th/4, Functional Divisions of Nervous system.pdf | 5 | 513 | 0 | 0 |
| AEP Module - 64th/4, SENT 4.pdf | 32 | 351 | 7 | 0 |
| AEP Module - 64th/4-Embryology Cases.pdf | 4 | 715 | 0 | 0 |
| AEP Module - 64th/4-MCQ_Embryo.pdf | 10 | 2237 | 0 | 0 |
| AEP Module - 64th/4_5764960509216430840 (3).pdf | 4 | 4 | 0 | 0 |
| AEP Module - 64th/5, Characters of ANS& GANGLIA.pdf | 5 | 514 | 0 | 0 |
| AEP Module - 64th/5, SENT 5.pdf | 27 | 199 | 19 | 0 |
| AEP Module - 64th/6,_Lecture_14_sympathetic_to_head_&_neck_new_2026_with_record.pdf | 19 | 541 | 4 | 0 |
| AEP Module - 64th/6-Written_Embryo.pdf | 24 | 7167 | 0 | 0 |
| AEP Module - 64th/7, SENT 7.pdf | 26 | 333 | 0 | 0 |
| AEP Module - 64th/7, Sympathetic to Thorax-Pelvis.pdf | 4 | 638 | 0 | 0 |
| AEP Module - 64th/8, PARASYMPATHETIC TO VARIOUS PARTS OF THE BODY -  2023.pdf | 29 | 995 | 1 | 0 |
| AEP Module - 64th/8, Parasympathetic NS.pdf | 7 | 990 | 0 | 0 |
| AEP Module - 64th/9, Higher control of ANS.pdf | 2 | 402 | 0 | 0 |
| AEP Module - 64th/9, Lec- Higher control of ANS.pdf | 25 | 687 | 1 | 0 |
| AEP Module - 64th/AEP Anatomy revision handout (without answers).pdf | 41 | 1407 | 0 | 0 |
| AEP Module - 64th/AEP Anatomy revision handout.pdf | 41 | 2621 | 0 | 0 |
| AEP Module - 64th/AEP Cont cases.pdf | 20 | 3853 | 0 | 0 |
| AEP Module - 64th/AEP Cont.pdf | 15 | 2049 | 0 | 0 |
| AEP Module - 64th/AEP Final Book Part 1 (1).pdf | 65 | 11969 | 1 | 0 |
| AEP Module - 64th/AEP Final Book Part 2.pdf | 104 | 20465 | 0 | 0 |
| AEP Module - 64th/AEP Final Book Part 3.pdf | 64 | 12854 | 0 | 0 |
| AEP Module - 64th/AEP Formative 64.pdf | 3 | 590 | 0 | 0 |
| AEP Module - 64th/AEP Full Exams (VIP) .pdf | 254 | 53148 | 0 | 0 |
| AEP Module - 64th/ALL mindmaps 1-11.pdf | 17 | 4683 | 0 | 0 |
| AEP Module - 64th/ALL physio online cases.pdf | 15 | 3245 | 0 | 0 |
| AEP Module - 64th/Anatomy & embryo sem 1 - Practical.pdf | 95 | 1662 | 0 | 0 |
| AEP Module - 64th/Anatomy 1 MCQ - Dr.Hossam Selim .pdf | 8 | 601 | 0 | 0 |
| AEP Module - 64th/Anatomy All_202601012302_39502.pdf | 120 | 11000 | 2 | 0 |
| AEP Module - 64th/Anatomy L10.pdf | 17 | 325 | 7 | 0 |
| AEP Module - 64th/Anatomy L13 Notes.pdf | 7 | 750 | 0 | 0 |
| AEP Module - 64th/Anatomy L13 PowerPoint.pdf | 17 | 0 | 17 | 0 |
| AEP Module - 64th/Anatomy L14 Notes.pdf | 6 | 926 | 0 | 0 |
| AEP Module - 64th/Anatomy L14 PowerPoint.pdf | 23 | 1005 | 4 | 0 |
| AEP Module - 64th/Anatomy L15 MCQ.pdf | 5 | 821 | 0 | 0 |
| AEP Module - 64th/Anatomy L15 Notes.pdf | 6 | 1213 | 0 | 0 |
| AEP Module - 64th/Anatomy L15 PowerPoint.pdf | 10 | 257 | 0 | 0 |
| AEP Module - 64th/Anatomy L3 MCQ_251022_011356.pdf | 4 | 504 | 0 | 0 |
| AEP Module - 64th/Anatomy Lecture (1) - Dr. Hendawy .pdf | 11 | 1289 | 1 | 0 |
| AEP Module - 64th/Anatomy Lecture (1) Questions - Dr. Hendawy .pdf | 7 | 985 | 0 | 0 |
| AEP Module - 64th/Anatomy OSPE - Bones  Part 1.pdf | 24 | 1141 | 0 | 0 |
| AEP Module - 64th/Anatomy OSPE - Jars -1.pdf | 30 | 1453 | 1 | 0 |
| AEP Module - 64th/Anatomy Of Respiratory System .pdf | 10 | 1070 | 1 | 0 |
| AEP Module - 64th/Anatomy Pract All.pdf | 201 | 3586 | 21 | 0 |
| AEP Module - 64th/Anatomy Practical (1) - Dr. Hendawy .pdf | 9 | 147 | 1 | 0 |
| AEP Module - 64th/Anatomy Practical 10.pdf | 14 | 0 | 14 | 0 |
| AEP Module - 64th/Anatomy Summary - Dr. Hendawy .pdf | 10 | 2941 | 1 | 0 |
| AEP Module - 64th/Anatomy [Harvard book ] cont.pdf | 55 | 12504 | 0 | 0 |
| AEP Module - 64th/Anatomy numbers & branches .pdf | 5 | 866 | 0 | 0 |
| AEP Module - 64th/Anatomy of the Scalp.pdf | 11 | 317 | 0 | 0 |
| AEP Module - 64th/Anatomy of the face.pdf | 16 | 541 | 1 | 0 |
| AEP Module - 64th/Anatomy summary 12-15.pdf | 12 | 2252 | 0 | 0 |
| AEP Module - 64th/Anatomy terminology.pdf | 6 | 0 | 6 | 0 |
| AEP Module - 64th/Bones of Upper Limb.pdf | 27 | 461 | 0 | 0 |
| AEP Module - 64th/Bones_AEP.pdf | 55 | 3135 | 0 | 0 |
| AEP Module - 64th/Bones_of_Lower_Limb[1].pdf | 25 | 392 | 1 | 0 |
| AEP Module - 64th/CBL - Diabetic Polyneuropathy.pdf | 4 | 608 | 0 | 0 |
| AEP Module - 64th/CVS & Resp..pdf | 18 | 77 | 3 | 0 |
| AEP Module - 64th/CVS (1).pdf | 31 | 570 | 11 | 0 |
| AEP Module - 64th/CVS.pdf | 12 | 0 | 12 | 0 |
| AEP Module - 64th/CamScanner 01-04-2026 19.23.pdf | 6 | 0 | 6 | 0 |
| AEP Module - 64th/CamScanner 18-10-2025 15.38.pdf | 5 | 0 | 5 | 0 |
| AEP Module - 64th/CamScanner 18-10-2025 15.39.pdf | 7 | 0 | 7 | 0 |
| AEP Module - 64th/Cardiovascular System_20251025_212139_0000.pdf | 7 | 1119 | 0 | 0 |
| AEP Module - 64th/Cases - written.pdf | 15 | 2381 | 0 | 0 |
| AEP Module - 64th/Diagmams L4 to L12.pdf | 58 | 0 | 58 | 0 |
| AEP Module - 64th/Digestive ppt.pdf | 36 | 1241 | 6 | 0 |
| AEP Module - 64th/Digestive system.pdf | 8 | 0 | 8 | 0 |
| AEP Module - 64th/Digestive_System_Anatomy_MCQs_Mansoura_Style.pdf | 1 | 222 | 0 | 0 |
| AEP Module - 64th/Digestive_System_Anatomy_MCQs_Questions_Only.pdf | 2 | 497 | 0 | 0 |
| AEP Module - 64th/EMBRYO Summary all.pdf | 24 | 4944 | 0 | 0 |
| AEP Module - 64th/Emberiology  All_202601012300_42567.pdf | 69 | 8165 | 0 | 0 |
| AEP Module - 64th/Embryo L6 Notes.pdf | 5 | 288 | 0 | 0 |
| AEP Module - 64th/Embryo L6 PowerPoint.pdf | 21 | 538 | 0 | 0 |
| AEP Module - 64th/Embryo L7 Notes.pdf | 5 | 453 | 0 | 0 |
| AEP Module - 64th/Embryo L7 PowerPoint.pdf | 23 | 545 | 4 | 0 |
| AEP Module - 64th/Embryo L8 Handout.pdf | 8 | 1053 | 0 | 0 |
| AEP Module - 64th/Embryo L8 PowerPoint.pdf | 27 | 638 | 3 | 0 |
| AEP Module - 64th/Embryo OSPE -  Part 3.pdf | 35 | 2949 | 0 | 0 |
| AEP Module - 64th/Embryo Pract All.pdf | 50 | 393 | 4 | 0 |
| AEP Module - 64th/Embryology 1.pdf | 20 | 163 | 2 | 0 |
| AEP Module - 64th/Embryology 2.pdf | 15 | 138 | 1 | 0 |
| AEP Module - 64th/Embryology 3 placenta and twins.pdf | 15 | 92 | 1 | 0 |
| AEP Module - 64th/Embryology Harvard book cont.pdf | 27 | 5792 | 0 | 0 |
| AEP Module - 64th/Embryology L1 MCQ.pdf | 5 | 729 | 0 | 0 |
| AEP Module - 64th/Embryology L2 MCQ_251022_015746.pdf | 5 | 669 | 0 | 0 |
| AEP Module - 64th/Embryology L3 MCQ.pdf | 5 | 709 | 0 | 0 |
| AEP Module - 64th/Embryology Summary - Dr. Hendawy .pdf | 6 | 1683 | 1 | 0 |
| AEP Module - 64th/Embryology numbers & anamolies.pdf | 5 | 751 | 0 | 0 |
| AEP Module - 64th/Embryology_Week2_MCQs.pdf | 5 | 733 | 0 | 0 |
| AEP Module - 64th/Equations & Questions.pdf | 13 | 1371 | 0 | 0 |
| AEP Module - 64th/First week notes.pdf | 3 | 663 | 0 | 0 |
| AEP Module - 64th/Foreign body aspiration.pdf | 1 | 150 | 0 | 0 |
| AEP Module - 64th/GASTRIC ULCER.pdf | 1 | 175 | 0 | 0 |
| AEP Module - 64th/Gametogenesis handout.pdf | 7 | 767 | 0 | 0 |
| AEP Module - 64th/Gametogenesis.pdf | 23 | 1034 | 1 | 0 |
| AEP Module - 64th/Genitourinary.pdf | 14 | 94 | 4 | 0 |
| AEP Module - 64th/HF.pdf | 1 | 192 | 0 | 0 |
| AEP Module - 64th/Handout Female reproductive cycles. Dr. Heba Elhessy.pdf | 9 | 888 | 0 | 0 |
| AEP Module - 64th/Horner syndrome.pdf | 1 | 89 | 0 | 0 |
| AEP Module - 64th/Images_AEP.pdf | 19 | 810 | 0 | 0 |
| AEP Module - 64th/Important MCQ - Final 64th-scan.pdf | 61 | 0 | 61 | 0 |
| AEP Module - 64th/Important numbers .pdf | 2 | 360 | 0 | 0 |
| AEP Module - 64th/JOINTS - final 2024.pdf | 40 | 805 | 2 | 0 |
| AEP Module - 64th/Jars_AEP.pdf | 28 | 1619 | 0 | 0 |
| AEP Module - 64th/Joints of upper and lower.pdf | 1 | 7 | 0 | 0 |
| AEP Module - 64th/Joints.pdf | 5 | 0 | 5 | 0 |
| AEP Module - 64th/L1 MCQ SEQ  Dr. Hendawy.pdf | 8 | 822 | 0 | 0 |
| AEP Module - 64th/L10 Handout.pdf | 10 | 963 | 0 | 0 |
| AEP Module - 64th/L10 PowerPoint.pdf | 48 | 1074 | 4 | 0 |
| AEP Module - 64th/L13 ALPHA TEAM.pdf | 8 | 0 | 8 | 0 |
| AEP Module - 64th/L18 Handout.pdf | 4 | 867 | 0 | 0 |
| AEP Module - 64th/L18 PowerPoint.pdf | 35 | 1258 | 5 | 0 |
| AEP Module - 64th/L2 Anatomy(Hossam Selim).pdf | 7 | 0 | 7 | 0 |
| AEP Module - 64th/L2 MCQ SEQ  Dr. Hendawy.pdf | 6 | 780 | 0 | 0 |
| AEP Module - 64th/L3 Anatomy(Hossam Selim).pdf | 9 | 0 | 9 | 0 |
| AEP Module - 64th/L3 MCQ SEQ  Dr. Hendawy.pdf | 5 | 520 | 0 | 0 |
| AEP Module - 64th/L4 MCQ SEQ  Dr. Hendawy.pdf | 8 | 1120 | 0 | 0 |
| AEP Module - 64th/L4&5 Anatomy(Hossam Selim).pdf | 10 | 0 | 10 | 0 |
| AEP Module - 64th/L5 MCQ SEQ  Dr. Hendawy.pdf | 7 | 962 | 0 | 0 |
| AEP Module - 64th/L9 Handout.pdf | 14 | 1888 | 0 | 0 |
| AEP Module - 64th/L9 PowerPoint.pdf | 23 | 618 | 3 | 0 |
| AEP Module - 64th/L9-Urinary system hand out.pdf | 7 | 684 | 0 | 0 |
| AEP Module - 64th/L9-Urinary system.pdf | 29 | 1046 | 1 | 0 |
| AEP Module - 64th/LEVEL 1 -SEM1 -DRHOSSAM SELIM DIGESIVE SYSTEM 2.pdf | 8 | 0 | 8 | 0 |
| AEP Module - 64th/Lec 1 - anatomical terminology ( Dr.Hossam selim ) .pdf | 10 | 633 | 0 | 0 |
| AEP Module - 64th/Lecture 5 (Great vessels of the neck) 2024.pdf | 4 | 622 | 0 | 0 |
| AEP Module - 64th/Lower limb Dr. Galal.pdf | 4 | 0 | 4 | 0 |
| AEP Module - 64th/MCQ (1).pdf | 19 | 0 | 19 | 0 |
| AEP Module - 64th/MCQ Anatomy AEP CONTINUOUS BOOK.pdf | 61 | 67 | 60 | 0 |
| AEP Module - 64th/MCQ embryo AEP CONTINUOUS BOOK.pdf | 25 | 0 | 25 | 0 |
| AEP Module - 64th/MCQ formative , exams physio 1-11.pdf | 52 | 8098 | 0 | 0 |
| AEP Module - 64th/MCQ notes + MCQ (1st three Lectures physio)..pdf | 38 | 8508 | 0 | 0 |
| AEP Module - 64th/MCQ notes 1-11.pdf | 28 | 7038 | 0 | 0 |
| AEP Module - 64th/MCQ physio L1.pdf | 12 | 1541 | 0 | 0 |
| AEP Module - 64th/MCQ أفكار.pdf | 16 | 0 | 16 | 0 |
| AEP Module - 64th/MCQ.pdf | 65 | 18428 | 1 | 0 |
| AEP Module - 64th/Major vessels in the neck_20251103_070249_0000.pdf | 8 | 963 | 0 | 0 |
| AEP Module - 64th/Most important + previous exams (after midterm).pdf | 69 | 12324 | 0 | 0 |
| AEP Module - 64th/Muscle & fascia 2024 shrouk edited.pdf | 25 | 792 | 3 | 0 |
| AEP Module - 64th/Muscle & fascia 2025  hand out edited.pdf | 7 | 609 | 0 | 0 |
| AEP Module - 64th/MyFile (10) (1).pdf | 345 | 15872 | 25 | 0 |
| AEP Module - 64th/Nervous and digistive system by DB.pdf | 28 | 358 | 3 | 0 |
| AEP Module - 64th/Nervous system notes.pdf | 11 | 1084 | 0 | 0 |
| AEP Module - 64th/Nervous system.pdf | 12 | 0 | 12 | 0 |
| AEP Module - 64th/No labeled bones .pdf | 28 | 0 | 28 | 0 |
| AEP Module - 64th/OSPE Q (1-4).pdf | 28 | 2960 | 0 | 0 |
| AEP Module - 64th/OSPE questions 5-8.pdf | 41 | 3914 | 0 | 0 |
| AEP Module - 64th/Online Cases AEP.pdf | 18 | 3443 | 0 | 0 |
| AEP Module - 64th/Physio .pdf | 169 | 47592 | 0 | 0 |
| AEP Module - 64th/Physio L10 MCQ.pdf | 4 | 856 | 0 | 0 |
| AEP Module - 64th/Physio L11 MCQ.pdf | 4 | 932 | 0 | 0 |
| AEP Module - 64th/Physio L12 MCQ.pdf | 4 | 746 | 0 | 0 |
| AEP Module - 64th/Physio L13 Notes.pdf | 8 | 1273 | 0 | 0 |
| AEP Module - 64th/Physio L13 PowerPoint.pdf | 25 | 1035 | 1 | 0 |
| AEP Module - 64th/Physio L14  Handout.pdf | 8 | 1289 | 0 | 0 |
| AEP Module - 64th/Physio L14 PowerPoint.pdf | 14 | 384 | 1 | 0 |
| AEP Module - 64th/Physio L2 Quiz.pdf | 5 | 862 | 0 | 0 |
| AEP Module - 64th/Physio L2(MM).pdf | 19 | 0 | 19 | 0 |
| AEP Module - 64th/Physio L3 MCQ.pdf | 4 | 551 | 0 | 0 |
| AEP Module - 64th/Physio L3(MM).pdf | 12 | 0 | 12 | 0 |
| AEP Module - 64th/Physio L4 MCQ.pdf | 4 | 547 | 0 | 0 |
| AEP Module - 64th/Physio L4(MM).pdf | 9 | 0 | 9 | 0 |
| AEP Module - 64th/Physio L5 MCQ.pdf | 4 | 580 | 0 | 0 |
| AEP Module - 64th/Physio L6 MCQ.pdf | 4 | 588 | 0 | 0 |
| AEP Module - 64th/Physio L7 MCQ.pdf | 4 | 613 | 0 | 0 |
| AEP Module - 64th/Physio L8 MCQ.pdf | 3 | 822 | 0 | 0 |
| AEP Module - 64th/Physio L9 MCQ.pdf | 6 | 714 | 0 | 0 |
| AEP Module - 64th/Physio P9.pdf | 15 | 327 | 0 | 0 |
| AEP Module - 64th/Physio Pract All.pdf | 200 | 6049 | 0 | 0 |
| AEP Module - 64th/Physiology - Lecture (1) - Dr. Elsawy.pdf | 10 | 957 | 0 | 0 |
| AEP Module - 64th/Physiology - Lecture (1) MCQ - Dr. Elsawy.pdf | 8 | 901 | 0 | 0 |
| AEP Module - 64th/Physiology 1- MCQ.pdf | 9 | 1710 | 0 | 0 |
| AEP Module - 64th/Physiology 1.pdf | 12 | 1294 | 0 | 0 |
| AEP Module - 64th/Physiology 10- MCQ-scan.pdf | 9 | 0 | 9 | 0 |
| AEP Module - 64th/Physiology 11- MCQ-scan.pdf | 20 | 0 | 20 | 0 |
| AEP Module - 64th/Physiology 12- MCQ-scan.pdf | 16 | 0 | 16 | 0 |
| AEP Module - 64th/Physiology 12-scan.pdf | 10 | 0 | 10 | 0 |
| AEP Module - 64th/Physiology 13- MCQ-scan.pdf | 15 | 0 | 15 | 0 |
| AEP Module - 64th/Physiology 13-scan.pdf | 11 | 0 | 11 | 0 |
| AEP Module - 64th/Physiology 14- MCQ-scan.pdf | 15 | 0 | 15 | 0 |
| AEP Module - 64th/Physiology 14-scan.pdf | 10 | 0 | 10 | 0 |
| AEP Module - 64th/Physiology 15- MCQ-scan.pdf | 18 | 0 | 18 | 0 |
| AEP Module - 64th/Physiology 15-scan.pdf | 7 | 0 | 7 | 0 |
| AEP Module - 64th/Physiology 16- MCQ-scan.pdf | 8 | 0 | 8 | 0 |
| AEP Module - 64th/Physiology 16-scan.pdf | 7 | 0 | 7 | 0 |
| AEP Module - 64th/Physiology 17- MCQ-scan.pdf | 10 | 0 | 10 | 0 |
| AEP Module - 64th/Physiology 17-scan.pdf | 9 | 0 | 9 | 0 |
| AEP Module - 64th/Physiology 18- MCQ-scan.pdf | 8 | 0 | 8 | 0 |
| AEP Module - 64th/Physiology 18-scan.pdf | 7 | 0 | 7 | 0 |
| AEP Module - 64th/Physiology 2- Diagrams.pdf | 33 | 0 | 33 | 0 |
| AEP Module - 64th/Physiology 2- MCQ-scan.pdf | 16 | 0 | 16 | 0 |
| AEP Module - 64th/Physiology 3- MCQ-scan.pdf | 6 | 0 | 6 | 0 |
| AEP Module - 64th/Physiology 4- MCQ-scan.pdf | 7 | 0 | 7 | 0 |
| AEP Module - 64th/Physiology 5- MCQ-scan.pdf | 10 | 0 | 10 | 0 |
| AEP Module - 64th/Physiology 6- MCQ-scan.pdf | 9 | 0 | 9 | 0 |
| AEP Module - 64th/Physiology 7- MCQ-scan.pdf | 13 | 0 | 13 | 0 |
| AEP Module - 64th/Physiology 8- MCQ-scan.pdf | 14 | 0 | 14 | 0 |
| AEP Module - 64th/Physiology 9- MCQ-scan.pdf | 6 | 0 | 6 | 0 |
| AEP Module - 64th/Physiology Cases.pdf | 14 | 3163 | 0 | 0 |
| AEP Module - 64th/Physiology L10 64Team.pdf | 6 | 702 | 0 | 0 |
| AEP Module - 64th/Physiology L8.pdf | 11 | 0 | 11 | 0 |
| AEP Module - 64th/Physiology L9.pdf | 7 | 0 | 7 | 0 |
| AEP Module - 64th/Physiology MCQ L8.pdf | 8 | 0 | 8 | 0 |
| AEP Module - 64th/Physiology MCQ L9.pdf | 5 | 0 | 5 | 0 |
| AEP Module - 64th/Physiology MCQ notes (12-18) - Final 64th-scan.pdf | 18 | 0 | 18 | 0 |
| AEP Module - 64th/Physiology Practical 1-scan.pdf | 9 | 0 | 9 | 0 |
| AEP Module - 64th/Physiology Practical 1.pdf | 6 | 608 | 0 | 0 |
| AEP Module - 64th/Physiology Practical 2-scan.pdf | 8 | 0 | 8 | 0 |
| AEP Module - 64th/Physiology Practical 2.pdf | 24 | 933 | 0 | 0 |
| AEP Module - 64th/Physiology Practical 3.pdf | 17 | 642 | 0 | 0 |
| AEP Module - 64th/Physiology Practical 4-scan.pdf | 9 | 0 | 9 | 0 |
| AEP Module - 64th/Physiology Practical 4.pdf | 20 | 801 | 0 | 0 |
| AEP Module - 64th/Physiology Practical 5.pdf | 20 | 595 | 0 | 0 |
| AEP Module - 64th/Physiology Practical 6.pdf | 23 | 796 | 0 | 0 |
| AEP Module - 64th/Physiology Practical 7_.pdf | 41 | 919 | 0 | 0 |
| AEP Module - 64th/Physiology Practical 8.pdf | 22 | 498 | 0 | 0 |
| AEP Module - 64th/Physiology Practical Summary & Questions-scan.pdf | 33 | 0 | 33 | 0 |
| AEP Module - 64th/Physiology Summary.pdf | 67 | 9050 | 0 | 0 |
| AEP Module - 64th/Physiology practical 3-scan.pdf | 6 | 0 | 6 | 0 |
| AEP Module - 64th/Physiology practical 5-scan.pdf | 10 | 0 | 10 | 0 |
| AEP Module - 64th/Physiology practical 6-scan.pdf | 11 | 0 | 11 | 0 |
| AEP Module - 64th/Physiology practical 7-scan.pdf | 15 | 0 | 15 | 0 |
| AEP Module - 64th/Physiology practical 8-scan.pdf | 10 | 0 | 10 | 0 |
| AEP Module - 64th/Physiology practical.pdf | 90 | 5883 | 0 | 0 |
| AEP Module - 64th/PowerPoint Anatomy questions .pdf | 16 | 0 | 16 | 0 |
| AEP Module - 64th/PowerPoint embryo questions .pdf | 16 | 0 | 16 | 0 |
| AEP Module - 64th/PowerPoint physio questions  (1).pdf | 17 | 0 | 17 | 0 |
| AEP Module - 64th/Powerpoint Female reproductive cycles.Dr.Heba Elhessy.pdf | 28 | 832 | 5 | 0 |
| AEP Module - 64th/Respiratory 2025 hand out.pdf | 4 | 553 | 0 | 0 |
| AEP Module - 64th/Respiratory 2025.pdf | 25 | 831 | 2 | 0 |
| AEP Module - 64th/Respiratory System MCQs_251025_151452.pdf | 7 | 1162 | 1 | 0 |
| AEP Module - 64th/Revision_AEP.pdf | 16 | 503 | 0 | 0 |
| AEP Module - 64th/Second week notes.pdf | 3 | 611 | 0 | 0 |
| AEP Module - 64th/Sem 1, Case 2 (student version).pdf | 3 | 307 | 0 | 0 |
| AEP Module - 64th/Sem 1, Case 2 Questions (Student Version)_260101_161246.pdf | 2 | 428 | 0 | 0 |
| AEP Module - 64th/Sem 1, Case 3 (Student version).pdf | 1 | 148 | 0 | 0 |
| AEP Module - 64th/Sem 1, Case 3 questions (Student Version)_260101_161455.pdf | 2 | 412 | 0 | 0 |
| AEP Module - 64th/Skeletal_System_MCQs_LargeFont.pdf | 8 | 513 | 0 | 0 |
| AEP Module - 64th/Skeleton.pdf | 5 | 0 | 5 | 0 |
| AEP Module - 64th/Skull 2.pdf | 20 | 328 | 5 | 0 |
| AEP Module - 64th/Summary (1-11) + Cases - CONT 64-scan.pdf | 19 | 0 | 19 | 0 |
| AEP Module - 64th/Summary Lec (1-11).pdf | 31 | 5207 | 0 | 0 |
| AEP Module - 64th/Summary Physiology Practical 1-3.pdf | 10 | 1004 | 0 | 0 |
| AEP Module - 64th/Summary Physiology Practical 5-9.pdf | 29 | 1870 | 0 | 0 |
| AEP Module - 64th/Summary Practical 1-4.pdf | 16 | 1374 | 0 | 0 |
| AEP Module - 64th/Tackat_Anatomy.pdf | 15 | 2314 | 0 | 0 |
| AEP Module - 64th/Tackat_Embryo.pdf | 11 | 1745 | 0 | 0 |
| AEP Module - 64th/Urinary System Quiz_20251027_162917_0000.pdf | 7 | 1197 | 0 | 0 |
| AEP Module - 64th/Virtual labs.pdf | 8 | 264 | 0 | 0 |
| AEP Module - 64th/Written physiology 1-3.pdf | 8 | 1795 | 0 | 0 |
| AEP Module - 64th/Written semester 1 - Final 64th-scan.pdf | 26 | 0 | 26 | 0 |
| AEP Module - 64th/Written with answers Final 64th -scan.pdf | 24 | 0 | 24 | 0 |
| AEP Module - 64th/axial skeleton_٢٠٢٦٠١١١٠٤٠٧_٢٢١٧٥.pdf | 9 | 0 | 9 | 0 |
| AEP Module - 64th/brain tumor case.pdf | 1 | 164 | 0 | 0 |
| AEP Module - 64th/cancer colon case.pdf | 1 | 164 | 0 | 0 |
| AEP Module - 64th/cvs notes .pdf | 5 | 950 | 0 | 0 |
| AEP Module - 64th/dehydration.pdf | 1 | 164 | 0 | 0 |
| AEP Module - 64th/digestive hand out.pdf | 8 | 954 | 0 | 0 |
| AEP Module - 64th/dinahany-skull (1).pdf | 15 | 301 | 2 | 0 |
| AEP Module - 64th/divisions of nervous system (L11).pdf | 31 | 438 | 14 | 0 |
| AEP Module - 64th/embryo.pdf | 6 | 504 | 0 | 0 |
| AEP Module - 64th/hand out Skeletal system 2025.pdf | 7 | 611 | 0 | 0 |
| AEP Module - 64th/introduction to nervous system (L10).pdf | 17 | 202 | 6 | 0 |
| AEP Module - 64th/lecture 5 (great vessels of neck) students 2024.pdf | 23 | 624 | 1 | 0 |
| AEP Module - 64th/lymph notes (1) (2) 2.pdf | 3 | 443 | 0 | 0 |
| AEP Module - 64th/lymphatic 2.pdf | 26 | 259 | 17 | 0 |
| AEP Module - 64th/massive hemorrhage.pdf | 1 | 172 | 0 | 0 |
| AEP Module - 64th/muscle rupture case.pdf | 1 | 180 | 0 | 0 |
| AEP Module - 64th/nervous_system_exam (1).pdf | 3 | 501 | 0 | 0 |
| AEP Module - 64th/past year & terial  harvard cont .pdf | 63 | 14542 | 0 | 0 |
| AEP Module - 64th/pheochromocytoma.pdf | 1 | 87 | 0 | 0 |
| AEP Module - 64th/physio L1..pdf | 9 | 980 | 0 | 0 |
| AEP Module - 64th/physiology harvard BOOK cont .pdf | 101 | 29530 | 0 | 0 |
| AEP Module - 64th/placenta previa case.pdf | 1 | 190 | 0 | 0 |
| AEP Module - 64th/practical all_202601011452_51119.pdf | 78 | 0 | 78 | 0 |
| AEP Module - 64th/primary focal hyperhidrosis.pdf | 1 | 108 | 0 | 0 |
| AEP Module - 64th/reproductive 2025 edited.pdf | 21 | 713 | 4 | 0 |
| AEP Module - 64th/reproductive 2025 hand out.pdf | 5 | 591 | 0 | 0 |
| AEP Module - 64th/sem 1 mans..pdf | 12 | 419 | 0 | 0 |
| AEP Module - 64th/semester 1 first week.pdf | 36 | 1067 | 1 | 0 |
| AEP Module - 64th/semester 1 second week.pdf | 26 | 648 | 0 | 0 |
| AEP Module - 64th/shoulder dislocatiom.pdf | 1 | 167 | 0 | 0 |
| AEP Module - 64th/skeletal system 2025 shrouk.pdf | 33 | 687 | 3 | 0 |
| AEP Module - 64th/skull 1.pdf | 21 | 572 | 2 | 0 |
| AEP Module - 64th/summary of continuous exam.pdf | 43 | 7071 | 0 | 0 |
| AEP Module - 64th/upper limb_٢٠٢٦٠١١١٠٤٠٧_٣٤٢٠١.pdf | 4 | 0 | 4 | 0 |
| AEP Module - 64th/ارقام الفسيولوجي.pdf | 7 | 738 | 0 | 0 |
| HBG Module - 64th/1- Gaucher's Disease.pdf | 1 | 274 | 0 | 0 |
| HBG Module - 64th/1- Practical Introduction-microtechniques & microscopy.pdf | 5 | 105 | 0 | 0 |
| HBG Module - 64th/2- kartagener 's syndrome.pdf | 1 | 253 | 0 | 0 |
| HBG Module - 64th/2_Practical_Cell_structure_membranous_non_membranous_organelles.pdf | 18 | 399 | 0 | 0 |
| HBG Module - 64th/3- Turner _s Syndrome.pdf | 1 | 217 | 0 | 0 |
| HBG Module - 64th/4- Practical_Karyotyping_chromosomal_anomalies.pdf | 20 | 386 | 1 | 0 |
| HBG Module - 64th/5- Practical_Epithelium.pdf | 15 | 377 | 0 | 0 |
| HBG Module - 64th/7- Practical_Nervous tissue.pdf | 10 | 252 | 0 | 0 |
| HBG Module - 64th/7-Past exams.pdf | 21 | 5577 | 0 | 0 |
| HBG Module - 64th/8- Practical_Skin.pdf | 13 | 287 | 0 | 0 |
| HBG Module - 64th/ALL online cases.pdf | 20 | 4121 | 0 | 0 |
| HBG Module - 64th/Amino acids- ppt.pdf | 42 | 941 | 6 | 0 |
| HBG Module - 64th/Atherosclerosis.pdf | 1 | 144 | 0 | 0 |
| HBG Module - 64th/BIO - case 1.pdf | 4 | 391 | 0 | 0 |
| HBG Module - 64th/BIO 1.pdf | 4 | 441 | 0 | 0 |
| HBG Module - 64th/Bio  10..pdf | 2 | 0 | 2 | 0 |
| HBG Module - 64th/Bio - Lecture (8) MCQs - Dr. Elsawy .pdf | 7 | 617 | 0 | 0 |
| HBG Module - 64th/Bio 12,13.pdf | 8 | 775 | 0 | 0 |
| HBG Module - 64th/Bio L2 MCQ.pdf | 4 | 614 | 0 | 0 |
| HBG Module - 64th/Bio L2(MM).pdf | 6 | 0 | 6 | 0 |
| HBG Module - 64th/Bio L3(MM).pdf | 8 | 0 | 8 | 0 |
| HBG Module - 64th/Bio L5 MCQ.pdf | 2 | 672 | 0 | 0 |
| HBG Module - 64th/Bio L6 MCQ.pdf | 4 | 653 | 0 | 0 |
| HBG Module - 64th/Bio Lec 8 Summary.pdf | 3 | 0 | 3 | 0 |
| HBG Module - 64th/Bio Past Years Questions (1).pdf | 17 | 0 | 17 | 0 |
| HBG Module - 64th/Bio Pract All.pdf | 167 | 5999 | 3 | 0 |
| HBG Module - 64th/Bio Practical 1 ....pdf | 2 | 370 | 0 | 0 |
| HBG Module - 64th/Bio Practical Atlas - Dr. Elsawy .pdf | 16 | 114 | 0 | 0 |
| HBG Module - 64th/Bio Practical..pdf | 11 | 0 | 11 | 0 |
| HBG Module - 64th/Biochemistry - Lecture (1) - Dr. Elsawy.pdf | 7 | 505 | 0 | 0 |
| HBG Module - 64th/Biochemistry - Lecture (1) MCQ & SEQ - Dr. Elsawy.pdf | 8 | 728 | 0 | 0 |
| HBG Module - 64th/Biochemistry L5.pdf | 8 | 0 | 8 | 0 |
| HBG Module - 64th/Biochemistry L6.pdf | 8 | 0 | 8 | 0 |
| HBG Module - 64th/Biochemistry L7 mcq mm.pdf | 9 | 0 | 9 | 0 |
| HBG Module - 64th/Biochemistry MCQ L6.pdf | 8 | 0 | 8 | 0 |
| HBG Module - 64th/Biochemistry Summary - Dr. Elsawy .pdf | 28 | 4736 | 0 | 0 |
| HBG Module - 64th/Biomedical  significance of enzymes lecture note.pdf | 7 | 420 | 0 | 0 |
| HBG Module - 64th/Biomedical significance of enzymes 2024.pdf | 29 | 688 | 3 | 0 |
| HBG Module - 64th/CBL 1 (Down syndrome).pdf | 5 | 0 | 5 | 0 |
| HBG Module - 64th/CT Table Helpers 64.pdf | 3 | 0 | 3 | 0 |
| HBG Module - 64th/Case (1) Down Syndrome.pdf | 3 | 364 | 0 | 0 |
| HBG Module - 64th/Case 1_AG.pdf | 4 | 100 | 0 | 0 |
| HBG Module - 64th/Case 2_AG.pdf | 3 | 99 | 0 | 0 |
| HBG Module - 64th/Compound lipid lecture (1).pdf | 50 | 1147 | 2 | 0 |
| HBG Module - 64th/Compound lipid lecture.pdf | 50 | 1147 | 2 | 0 |
| HBG Module - 64th/Compound lipid notes.pdf | 19 | 839 | 0 | 0 |
| HBG Module - 64th/Connective Tissue mcq.pdf | 14 | 1976 | 0 | 0 |
| HBG Module - 64th/Constipation.pdf | 1 | 227 | 0 | 0 |
| HBG Module - 64th/Cyctic fibrosis.pdf | 1 | 201 | 0 | 0 |
| HBG Module - 64th/DM.pdf | 1 | 200 | 0 | 0 |
| HBG Module - 64th/DNA PACKING.pdf | 48 | 1252 | 11 | 0 |
| HBG Module - 64th/DNA Replication lecture handout.pdf | 4 | 859 | 0 | 0 |
| HBG Module - 64th/DNA mutation.pdf | 5 | 0 | 5 | 0 |
| HBG Module - 64th/DNA repair 2025.pdf | 27 | 686 | 1 | 0 |
| HBG Module - 64th/DNA repair lecture notes 2025.pdf | 7 | 543 | 0 | 0 |
| HBG Module - 64th/DNA replication dr Noha Salah 2025-2026.pdf | 31 | 946 | 5 | 0 |
| HBG Module - 64th/DR AG  HISTOLOGY LEC 2 SEM 1.pdf | 6 | 0 | 6 | 0 |
| HBG Module - 64th/DR AG  HISTOLOGY LEC 3 SEM 1 2.pdf | 7 | 0 | 7 | 0 |
| HBG Module - 64th/Derived lipids handout 2024-2025.pdf | 7 | 691 | 0 | 0 |
| HBG Module - 64th/Disaccharides & Sugar derivatives (Handout).pdf | 13 | 686 | 0 | 0 |
| HBG Module - 64th/Disaccharides & Sugar derivatives dr.mai nasser 2025.pdf | 41 | 1425 | 1 | 0 |
| HBG Module - 64th/Disaccharides & Sugar derivatives-  Bio lecture pdf.pdf | 41 | 1423 | 1 | 0 |
| HBG Module - 64th/Dr Walaa principle of heredity New $ (1).pdf | 38 | 1277 | 0 | 0 |
| HBG Module - 64th/Dr Walaa principle of heredity hand out.pdf | 10 | 1007 | 0 | 0 |
| HBG Module - 64th/Enzyme biochemistry L1.pdf | 5 | 546 | 0 | 0 |
| HBG Module - 64th/Enzyme biochemistry L2.pdf | 25 | 617 | 0 | 0 |
| HBG Module - 64th/Epithelium mcq.pdf | 26 | 4049 | 0 | 0 |
| HBG Module - 64th/Gene L1 MCQ.pdf | 4 | 827 | 0 | 0 |
| HBG Module - 64th/Gene L2 MCQ.pdf | 3 | 497 | 0 | 0 |
| HBG Module - 64th/Gene L3 MCQ.pdf | 3 | 586 | 0 | 0 |
| HBG Module - 64th/Gene L4 MCQ.pdf | 3 | 552 | 0 | 0 |
| HBG Module - 64th/Gene L5 MCQ.pdf | 2 | 697 | 0 | 0 |
| HBG Module - 64th/Gene Pract All.pdf | 137 | 4238 | 7 | 0 |
| HBG Module - 64th/Genetics - Lecture (7) MCQs - Dr. Elsawy .pdf | 9 | 1275 | 0 | 0 |
| HBG Module - 64th/Genetics 11.,.pdf | 2 | 0 | 2 | 0 |
| HBG Module - 64th/Genetics 9.pdf | 2 | 0 | 2 | 0 |
| HBG Module - 64th/Genetics L1(MM).pdf | 13 | 0 | 13 | 0 |
| HBG Module - 64th/Genetics L10.pdf | 9 | 973 | 0 | 0 |
| HBG Module - 64th/Genetics L11 Team 64.pdf | 5 | 526 | 0 | 0 |
| HBG Module - 64th/Genetics L2(MM).pdf | 8 | 0 | 8 | 0 |
| HBG Module - 64th/Genetics L8 Notes.pdf | 5 | 476 | 0 | 0 |
| HBG Module - 64th/Genetics L8 PowerPoint.pdf | 33 | 751 | 2 | 0 |
| HBG Module - 64th/Genetics L9.pdf | 4 | 442 | 0 | 0 |
| HBG Module - 64th/Genetics P3 ElectroPhoresis.pdf | 33 | 1099 | 0 | 0 |
| HBG Module - 64th/Genetics P4 PCR.pdf | 27 | 661 | 1 | 0 |
| HBG Module - 64th/Genetics Practical Atlas - Dr. Elsawy .pdf | 11 | 79 | 0 | 0 |
| HBG Module - 64th/Glands (1).pdf | 1 | 88 | 0 | 0 |
| HBG Module - 64th/HBG - CBL (Down Syndrome).pdf | 5 | 680 | 0 | 0 |
| HBG Module - 64th/HBG CLINICAL POINTS.pdf | 3 | 434 | 0 | 0 |
| HBG Module - 64th/HBG Cont Cases.pdf | 40 | 1737 | 24 | 0 |
| HBG Module - 64th/HBG Continuous book Part 3.pdf | 178 | 28327 | 0 | 0 |
| HBG Module - 64th/HBG Index.pdf | 3 | 0 | 3 | 0 |
| HBG Module - 64th/Histo 14,R .pdf | 1 | 0 | 1 | 0 |
| HBG Module - 64th/Histo 1_MCQ_sem1_AG.pdf | 18 | 1932 | 0 | 0 |
| HBG Module - 64th/Histo 1_sem1_AG.pdf | 10 | 964 | 0 | 0 |
| HBG Module - 64th/Histo Cases All.pdf | 22 | 3584 | 0 | 0 |
| HBG Module - 64th/Histo Important MCQ Divided.pdf | 61 | 0 | 61 | 0 |
| HBG Module - 64th/Histo Important MCQ Last 4 Lectures.pdf | 13 | 0 | 13 | 0 |
| HBG Module - 64th/Histo L10  PowerPoint.pdf | 32 | 686 | 3 | 0 |
| HBG Module - 64th/Histo L11 Notes.pdf | 7 | 861 | 0 | 0 |
| HBG Module - 64th/Histo L11 PowerPoint.pdf | 21 | 981 | 3 | 0 |
| HBG Module - 64th/Histo L11 Team 64.pdf | 7 | 764 | 0 | 0 |
| HBG Module - 64th/Histo LM EM.pdf | 4 | 0 | 4 | 0 |
| HBG Module - 64th/Histo Lecture 1.pdf | 13 | 0 | 13 | 0 |
| HBG Module - 64th/Histo Lecture 10.pdf | 13 | 0 | 13 | 0 |
| HBG Module - 64th/Histo Lecture 9.pdf | 18 | 0 | 18 | 0 |
| HBG Module - 64th/Histo MCQ Formatives + Exams (1-10) (1).pdf | 27 | 0 | 27 | 0 |
| HBG Module - 64th/Histo MCQ Formatives + Exams Final.pdf | 36 | 0 | 36 | 0 |
| HBG Module - 64th/Histo P6 connective tissue.pdf | 10 | 252 | 0 | 0 |
| HBG Module - 64th/Histo Pract All.pdf | 108 | 2368 | 1 | 0 |
| HBG Module - 64th/Histo Practical 1 MCQ.pdf | 5 | 0 | 5 | 0 |
| HBG Module - 64th/Histo Practical 1.pdf | 3 | 0 | 3 | 0 |
| HBG Module - 64th/Histo Practical Full.pdf | 57 | 0 | 57 | 0 |
| HBG Module - 64th/Histo Practical MCQ Collected.pdf | 43 | 0 | 43 | 0 |
| HBG Module - 64th/Histo Practical Summary.pdf | 29 | 0 | 29 | 0 |
| HBG Module - 64th/Histo Previous MCQ Exams Final.pdf | 38 | 0 | 38 | 0 |
| HBG Module - 64th/Histo Sem 1 All Lectures.pdf | 150 | 0 | 150 | 0 |
| HBG Module - 64th/Histo Summary (1-10) (1).pdf | 11 | 0 | 11 | 0 |
| HBG Module - 64th/Histo Summary + Collections Final.pdf | 24 | 0 | 24 | 0 |
| HBG Module - 64th/Histo Written Final.pdf | 57 | 0 | 57 | 0 |
| HBG Module - 64th/Histo prac 1 MCQ_sem1_AG.pdf | 5 | 172 | 0 | 0 |
| HBG Module - 64th/Histo prac 1_sem1_AG.pdf | 3 | 137 | 0 | 0 |
| HBG Module - 64th/Histo sem 1 - ALL.pdf | 115 | 11443 | 2 | 0 |
| HBG Module - 64th/Histology Lecture (1) - Dr. Shalaby .pdf | 11 | 795 | 0 | 0 |
| HBG Module - 64th/Histology Lecture (1) Questions - Dr. Shalaby .pdf | 15 | 2233 | 0 | 0 |
| HBG Module - 64th/Histology Practical (1) - Dr. Shalaby .pdf | 3 | 111 | 0 | 0 |
| HBG Module - 64th/L1 - Monosaccharide.pdf | 4 | 385 | 0 | 0 |
| HBG Module - 64th/L1 BIO.pdf | 6 | 547 | 0 | 0 |
| HBG Module - 64th/L11 Handout.pdf | 6 | 582 | 0 | 0 |
| HBG Module - 64th/L11 PowerPoint.pdf | 25 | 839 | 1 | 0 |
| HBG Module - 64th/L12 Handout.pdf | 4 | 390 | 0 | 0 |
| HBG Module - 64th/L12 PowerPoint.pdf | 27 | 759 | 1 | 0 |
| HBG Module - 64th/L13 Handout.pdf | 4 | 500 | 0 | 0 |
| HBG Module - 64th/L13 PowerPoint.pdf | 25 | 781 | 0 | 0 |
| HBG Module - 64th/L9 Connective tissue (1) PowerPoint.pdf | 33 | 722 | 4 | 0 |
| HBG Module - 64th/L9 L10 Connective tissue Handout.pdf | 15 | 2719 | 0 | 0 |
| HBG Module - 64th/L9 PowerPoint enzyme biochemistry.pdf | 36 | 930 | 1 | 0 |
| HBG Module - 64th/L9 handout enzyme biochemistry.pdf | 4 | 453 | 0 | 0 |
| HBG Module - 64th/LECTURE 2.pdf | 6 | 625 | 0 | 0 |
| HBG Module - 64th/LECTURE 4 -HISTOLOGY -DR A.G.pdf | 8 | 0 | 8 | 0 |
| HBG Module - 64th/LECTURE 5 -HISTOLOGY -DR A.G.pdf | 9 | 0 | 9 | 0 |
| HBG Module - 64th/Lecture (12) Nervous Tissue-part 2-Dr Yomna Fathy.pdf | 13 | 572 | 1 | 0 |
| HBG Module - 64th/Lecture (12) notes Nervous Tissue-part 2-Dr Yomna Fathy.pdf | 5 | 522 | 0 | 0 |
| HBG Module - 64th/Lecture (13)-Skin (1)-Dr Amira Sherif.pdf | 31 | 651 | 6 | 0 |
| HBG Module - 64th/Lecture (14)-Skin (2)-Dr Amira Sherif.pdf | 25 | 586 | 5 | 0 |
| HBG Module - 64th/Lecture (4)-Cell inclusions & nucleus-Dr Nesreen Omar.pdf | 48 | 1052 | 3 | 0 |
| HBG Module - 64th/Lecture (5)-Cell cycle & mitosis-Dr Noura Zidane.pdf | 33 | 744 | 7 | 0 |
| HBG Module - 64th/Lecture (7)-Epithelium (1)-Dr Amal Moustafa.pdf | 35 | 1881 | 0 | 0 |
| HBG Module - 64th/Lecture (8)-Epithelium (2)-Dr Amal Moustafa.pdf | 20 | 1195 | 0 | 0 |
| HBG Module - 64th/Lecture 1 Genetics, nucelic acid (1).pdf | 43 | 1570 | 0 | 0 |
| HBG Module - 64th/Lecture 1-Cell structure (1) Dr Shehab Hafez.pdf | 23 | 1105 | 0 | 0 |
| HBG Module - 64th/Lecture 2-Cell structure (2) Dr Shehab Hafez.pdf | 23 | 938 | 0 | 0 |
| HBG Module - 64th/Lecture 3 cytoskeleton Dr Samar Asker.pdf | 28 | 0 | 28 | 0 |
| HBG Module - 64th/Lecture_6_Karyotyping_Structure_and_classfication_of_chromosome.pdf | 27 | 500 | 7 | 0 |
| HBG Module - 64th/Lipid chemistry 1 note.pdf | 6 | 883 | 0 | 0 |
| HBG Module - 64th/Lipid_Chemistry_Quiz.pdf | 5 | 610 | 0 | 0 |
| HBG Module - 64th/MCQ Bio 1.pdf | 5 | 657 | 0 | 0 |
| HBG Module - 64th/MCQ Bio L9.pdf | 7 | 1009 | 0 | 0 |
| HBG Module - 64th/MCQ Genetics Lecture 11.pdf | 8 | 1261 | 0 | 0 |
| HBG Module - 64th/MCQ Histo Lecture 1.pdf | 12 | 0 | 12 | 0 |
| HBG Module - 64th/MCQ genetics 8.pdf | 5 | 568 | 0 | 0 |
| HBG Module - 64th/MUTATION (1).pdf | 42 | 1550 | 3 | 0 |
| HBG Module - 64th/MUTATION note.pdf | 8 | 1019 | 0 | 0 |
| HBG Module - 64th/Monosaccharides (Amira Abdel Haleem).pdf | 31 | 1035 | 1 | 0 |
| HBG Module - 64th/Monosaccharides (Handout) (Amira Abdel Haleem).pdf | 9 | 382 | 0 | 0 |
| HBG Module - 64th/Notes Lecture (14)-Skin (2)-Dr Amira Sherif.pdf | 4 | 498 | 0 | 0 |
| HBG Module - 64th/Notes Lecture 3 Cytoskeleton Dr. Samar Asker.pdf | 6 | 966 | 0 | 0 |
| HBG Module - 64th/Notes lecture (13)-Skin (1)-Dr Amira Sherif.pdf | 5 | 584 | 0 | 0 |
| HBG Module - 64th/Notes lecture (5)-Cell cycle & mitosis-Dr Noura Zidane .pdf | 7 | 734 | 0 | 0 |
| HBG Module - 64th/Notes lecture (7)-Epithelium (1)-Dr Amal Moustafa.pdf | 13 | 2238 | 0 | 0 |
| HBG Module - 64th/Notes lecture 1-Cell structure (1) Dr Shehab Hafez.pdf | 7 | 893 | 0 | 0 |
| HBG Module - 64th/Notes lecture 2-Cell structure (2) Dr Shehab Hafez.pdf | 7 | 799 | 0 | 0 |
| HBG Module - 64th/Notes_Lecture_4_Cell_inclusions_&_nucleus_Dr_Nesreen_Omar.pdf | 5 | 960 | 0 | 0 |
| HBG Module - 64th/Notes_lecture_6_Karyotyping_Structure_and_classfication_of_chromosome.pdf | 6 | 494 | 0 | 0 |
| HBG Module - 64th/Nucleic_Acids_MCQs_Combined.pdf | 7 | 783 | 0 | 0 |
| HBG Module - 64th/Overview on molecular biology lab instrument. pptx.pdf | 39 | 1478 | 4 | 0 |
| HBG Module - 64th/PACKING note.pdf | 5 | 709 | 0 | 0 |
| HBG Module - 64th/Physiology MCQ L5.pdf | 7 | 0 | 7 | 0 |
| HBG Module - 64th/Pipetting.pdf | 25 | 588 | 4 | 0 |
| HBG Module - 64th/Polysaccharides_Quiz_2025 (1).pdf | 4 | 574 | 0 | 0 |
| HBG Module - 64th/Practical 2 Genetics, DNA extraction.pdf | 23 | 762 | 0 | 0 |
| HBG Module - 64th/Practical Enzymes.pdf | 24 | 810 | 1 | 0 |
| HBG Module - 64th/Protein  classification (Handout).pdf | 5 | 673 | 0 | 0 |
| HBG Module - 64th/Protein chemistry 1 note.pdf | 7 | 410 | 0 | 0 |
| HBG Module - 64th/Protein identification  Pract. 2 Biochemistry (2)-1.pdf | 25 | 873 | 1 | 0 |
| HBG Module - 64th/Protein synthesis lecture notes 2023-2024.pdf | 11 | 1163 | 0 | 0 |
| HBG Module - 64th/SEM_1_Amira_Haleem_online_course_cases,_lactose_intolerance.pdf | 1 | 225 | 0 | 0 |
| HBG Module - 64th/Sampling.pdf | 42 | 1778 | 0 | 0 |
| HBG Module - 64th/Sem 1, Case 1 (Student version).pdf | 2 | 195 | 0 | 0 |
| HBG Module - 64th/Sem 1, Case 1 Questions (Student Version).pdf | 2 | 425 | 0 | 0 |
| HBG Module - 64th/Sickle cell anemia.pdf | 1 | 217 | 0 | 0 |
| HBG Module - 64th/Solutions and osmolarity.pdf | 42 | 1568 | 0 | 0 |
| HBG Module - 64th/Summary + MCQ .pdf | 116 | 21782 | 0 | 0 |
| HBG Module - 64th/Summary bio 1-13.pdf | 35 | 3568 | 0 | 0 |
| HBG Module - 64th/Summary genetics 1-11.pdf | 29 | 3304 | 0 | 0 |
| HBG Module - 64th/Transcription. handout.pdf | 5 | 497 | 0 | 0 |
| HBG Module - 64th/Written Bio.pdf | 17 | 3633 | 0 | 0 |
| HBG Module - 64th/Written Genetics.pdf | 15 | 3368 | 0 | 0 |
| HBG Module - 64th/_Practical_Nucleus_Cell Division.pdf | 17 | 310 | 0 | 0 |
| HBG Module - 64th/amino acidnemonics .pdf | 9 | 0 | 9 | 0 |
| HBG Module - 64th/bio 1 edit.pdf | 5 | 495 | 0 | 0 |
| HBG Module - 64th/bio L1 MCQ.pdf | 6 | 663 | 0 | 0 |
| HBG Module - 64th/bio number.pdf | 2 | 175 | 0 | 0 |
| HBG Module - 64th/carb bio.pdf | 16 | 2074 | 0 | 0 |
| HBG Module - 64th/compound lipid notes (Telegram 2).pdf | 19 | 839 | 0 | 0 |
| HBG Module - 64th/enzyme biochemistry L2 handout.pdf | 4 | 518 | 0 | 0 |
| HBG Module - 64th/final Derived lipids.pdf | 30 | 1007 | 2 | 0 |
| HBG Module - 64th/gene L11 MCQ.pdf | 5 | 768 | 0 | 0 |
| HBG Module - 64th/genetic 1 lecture notes of nucleic acid structure.pdf | 8 | 971 | 0 | 0 |
| HBG Module - 64th/genetics all.pdf | 68 | 10944 | 0 | 0 |
| HBG Module - 64th/glucose  (1).pdf | 31 | 920 | 0 | 0 |
| HBG Module - 64th/histo 9-10 dr shalaby.pdf | 8 | 8 | 0 | 0 |
| HBG Module - 64th/lab safety .pdf | 15 | 544 | 1 | 0 |
| HBG Module - 64th/lecture 1 Genetics .pdf | 9 | 0 | 9 | 0 |
| HBG Module - 64th/lecture 1 lipid chemistry.pdf | 44 | 1372 | 5 | 0 |
| HBG Module - 64th/lecture 2 bio.pdf | 9 | 0 | 9 | 0 |
| HBG Module - 64th/lipid bio.pdf | 19 | 2272 | 0 | 0 |
| HBG Module - 64th/most important Bio MCQ .pdf | 52 | 6068 | 0 | 0 |
| HBG Module - 64th/most important Bio and genetics after midterm.pdf | 32 | 4183 | 0 | 0 |
| HBG Module - 64th/most important Genetics MCQ .pdf | 42 | 5597 | 0 | 0 |
| HBG Module - 64th/polysaccharide lecture handout 2025-2026.pdf | 36 | 1067 | 8 | 0 |
| HBG Module - 64th/polysaccharide lecture presentation Dr. Noha Salah 2024-2025.pdf | 34 | 1013 | 8 | 0 |
| HBG Module - 64th/post transcriptional modifications  (1).pdf | 33 | 665 | 2 | 0 |
| HBG Module - 64th/post-transcriptional modifications handout.pdf | 5 | 358 | 1 | 0 |
| HBG Module - 64th/protein classification.pdf | 31 | 1106 | 1 | 0 |
| HBG Module - 64th/protein synthesis, 2024.pdf | 42 | 1410 | 2 | 0 |
| HBG Module - 64th/transcription lecture.pdf | 28 | 740 | 4 | 0 |
| HBG Module - 64th/أسئلة ريتن اتكررت.pdf | 21 | 5 | 20 | 0 |
| HBG Module - 64th/اسئلة ريتن ٦٣ جديدة..pdf | 11 | 0 | 11 | 0 |
| HIS Module - 64th/3. HIS-203, Online case 3 Hypersensitivity.pdf | 1 | 289 | 0 | 0 |
| HIS Module - 64th/Anemia CBL- questions.pdf | 5 | 574 | 0 | 0 |
| HIS Module - 64th/Biochemistry L 3 Plasma Proteins lecture notes 1st part ONLY.pdf | 3 | 393 | 0 | 0 |
| HIS Module - 64th/Biochemistry L1 Handout Heme synthesis.pdf | 6 | 611 | 0 | 0 |
| HIS Module - 64th/Biochemistry L1 Heme synthesis ppt.pdf | 40 | 1035 | 8 | 0 |
| HIS Module - 64th/Biochemistry L2 HB Structure  degradation.pdf | 47 | 1878 | 1 | 0 |
| HIS Module - 64th/Biochemistry L2 handout Hb structure and degradation.pdf | 15 | 1601 | 1 | 0 |
| HIS Module - 64th/Biochemistry_L3_Joint_lecture_bio_physiology_plasma_proteins.pdf | 38 | 1328 | 4 | 0 |
| HIS Module - 64th/CBL - Anemia - Dr. Action potential.pdf | 25 | 1597 | 2 | 0 |
| HIS Module - 64th/CamScanner 10-05-2025 16.41.pdf | 3 | 0 | 3 | 0 |
| HIS Module - 64th/Cases Micro hypersensitivity 2026.pdf | 2 | 517 | 0 | 0 |
| HIS Module - 64th/DOC-20260616-WA0084.pdf | 11 | 2536 | 0 | 0 |
| HIS Module - 64th/EXTRA MCQ  ON HIS_AG.pdf | 33 | 4032 | 0 | 0 |
| HIS Module - 64th/HIS - Micro - Lec 5.pdf | 7 | 0 | 7 | 0 |
| HIS Module - 64th/HIS 1 - BIO-scan.pdf | 6 | 0 | 6 | 0 |
| HIS Module - 64th/HIS 1- MCQ-scan.pdf | 26 | 0 | 26 | 0 |
| HIS Module - 64th/HIS 1-scan.pdf | 13 | 0 | 13 | 0 |
| HIS Module - 64th/HIS Checklist Lectures & Practical.pdf | 2 | 187 | 0 | 0 |
| HIS Module - 64th/HIS L1 - Malaria.pdf | 12 | 1770 | 0 | 0 |
| HIS Module - 64th/HIS L2 - Visceral leishmaniasis.pdf | 11 | 1408 | 0 | 0 |
| HIS Module - 64th/HIS L3 - Filariasis.pdf | 9 | 977 | 0 | 0 |
| HIS Module - 64th/HIS Physiology 1 & 2 - Summary.pdf | 4 | 1094 | 0 | 0 |
| HIS Module - 64th/HIS Physiology 3- Summary.pdf | 2 | 525 | 0 | 0 |
| HIS Module - 64th/HIS Physiology 4- Summary.pdf | 2 | 467 | 0 | 0 |
| HIS Module - 64th/His Continuous Berlin Book 2026.pdf | 190 | 29471 | 0 | 0 |
| HIS Module - 64th/His Final Book.pdf | 116 | 18024 | 0 | 0 |
| HIS Module - 64th/Histo HIS Important MCQ (L1+2).pdf | 16 | 0 | 16 | 0 |
| HIS Module - 64th/Histo HIS Important MCQ.pdf | 25 | 0 | 25 | 0 |
| HIS Module - 64th/Histo HIS L1.pdf | 12 | 0 | 12 | 0 |
| HIS Module - 64th/Histo HIS L2.pdf | 10 | 0 | 10 | 0 |
| HIS Module - 64th/Histo HIS L3.pdf | 14 | 0 | 14 | 0 |
| HIS Module - 64th/Histo HIS L4.pdf | 8 | 0 | 8 | 0 |
| HIS Module - 64th/Histo HIS Summary + Collections (L1+2).pdf | 8 | 0 | 8 | 0 |
| HIS Module - 64th/Histo HIS Summary + Collections.pdf | 12 | 0 | 12 | 0 |
| HIS Module - 64th/Histology - HIS - Lecture 1.pdf | 11 | 970 | 0 | 0 |
| HIS Module - 64th/Histology L1 Hand out RBCs  platelets.pdf | 11 | 1175 | 0 | 0 |
| HIS Module - 64th/Histology L1 RBCs platelets.pdf | 44 | 1225 | 1 | 0 |
| HIS Module - 64th/Histology L2 Handout Structure of WBCs.pdf | 8 | 686 | 0 | 0 |
| HIS Module - 64th/Histology L2 Structure of WBC.pdf | 30 | 789 | 1 | 0 |
| HIS Module - 64th/Histology L3 Handout Lymph Node and spleen.pdf | 5 | 614 | 0 | 0 |
| HIS Module - 64th/Histology L3 Lymph node_Spleen.pdf | 23 | 960 | 0 | 0 |
| HIS Module - 64th/Histology L4 Handout Thymus and MALT.pdf | 4 | 439 | 0 | 0 |
| HIS Module - 64th/Histology L4 Thymus_Tonsil.pdf | 15 | 569 | 0 | 0 |
| HIS Module - 64th/IMMUNE (1).pdf | 6 | 754 | 1 | 0 |
| HIS Module - 64th/L1 para HIS.pdf | 7 | 791 | 1 | 0 |
| HIS Module - 64th/L2 Micro HIS.pdf | 8 | 1232 | 1 | 0 |
| HIS Module - 64th/L2 para HIS.pdf | 10 | 1231 | 1 | 0 |
| HIS Module - 64th/L3 para HIS.pdf | 11 | 1387 | 1 | 0 |
| HIS Module - 64th/L4 HIS.pdf | 4 | 392 | 1 | 0 |
| HIS Module - 64th/Lec 1 ( hyersensitivity ) 2026 After edit.pdf | 9 | 1180 | 1 | 0 |
| HIS Module - 64th/Lec 4 ( Immunodeficiency ).pdf | 5 | 491 | 1 | 0 |
| HIS Module - 64th/MCQ Histo HIS L1.pdf | 11 | 0 | 11 | 0 |
| HIS Module - 64th/MCQ Histo HIS L2.pdf | 10 | 0 | 10 | 0 |
| HIS Module - 64th/MCQ Histo HIS L3.pdf | 9 | 0 | 9 | 0 |
| HIS Module - 64th/MCQ Histo HIS L4.pdf | 6 | 0 | 6 | 0 |
| HIS Module - 64th/MCQ Patho HIS Lecture 1.pdf | 5 | 582 | 0 | 0 |
| HIS Module - 64th/MCQ Patho HIS Lecture 2.pdf | 17 | 2535 | 0 | 0 |
| HIS Module - 64th/Micro by Dr.Ahmed Essam [309][19].pdf | 1 | 0 | 1 | 0 |
| HIS Module - 64th/Microbiology L1 Hypersensitivity.pdf | 52 | 2465 | 10 | 0 |
| HIS Module - 64th/Microbiology L1 handout Hypersensitivity.pdf | 10 | 1581 | 0 | 0 |
| HIS Module - 64th/Microbiology L1 handout Hypersensitivity_260509_174929.pdf | 11 | 1613 | 1 | 0 |
| HIS Module - 64th/Microbiology L2 Immunological tolerance autoimmunity.pdf | 43 | 1268 | 5 | 0 |
| HIS Module - 64th/Microbiology L2 handout Immunological Tolerance autoimmunity.pdf | 6 | 998 | 0 | 0 |
| HIS Module - 64th/Microbiology L3 Viral Infection of Lymphocytes.pdf | 37 | 1415 | 3 | 0 |
| HIS Module - 64th/Microbiology L3 handout Viral Infections of Lymphocytes.pdf | 4 | 918 | 0 | 0 |
| HIS Module - 64th/Parasitology L1 Handout malaria.pdf | 9 | 1313 | 0 | 0 |
| HIS Module - 64th/Parasitology L1 malaria.pdf | 45 | 1736 | 0 | 0 |
| HIS Module - 64th/Parasitology L13 Handout Bancroftian filariasis .pdf | 5 | 904 | 0 | 0 |
| HIS Module - 64th/Parasitology L2 Handout visceral Leishmania.pdf | 7 | 1005 | 0 | 0 |
| HIS Module - 64th/Parasitology L2 visceral Leishmania.pdf | 39 | 603 | 14 | 0 |
| HIS Module - 64th/Parasitology L3 Bancroftian filariasis.pdf | 29 | 1113 | 3 | 0 |
| HIS Module - 64th/Patho HIS Important MCQ.pdf | 17 | 0 | 17 | 0 |
| HIS Module - 64th/Patho HIS Lecture 1.pdf | 7 | 637 | 0 | 0 |
| HIS Module - 64th/Patho HIS Lecture 2.pdf | 20 | 2286 | 0 | 0 |
| HIS Module - 64th/Patho HIS Summary + Collections.pdf | 7 | 0 | 7 | 0 |
| HIS Module - 64th/Pharma L1 Handout Therapy of anemia.pdf | 10 | 2165 | 0 | 0 |
| HIS Module - 64th/Pharma L1 Therapy of anemias.pdf | 43 | 2184 | 1 | 0 |
| HIS Module - 64th/Pharma L2 Anticoagulants-.pdf | 31 | 1564 | 1 | 0 |
| HIS Module - 64th/Pharma L2 Handout Anticoagulants.pdf | 7 | 1493 | 0 | 0 |
| HIS Module - 64th/Pharma L3 Fibrinolytics Antiplatelets.pdf | 21 | 973 | 1 | 0 |
| HIS Module - 64th/Pharma L3 Handout Fibrinolytics-Antiplatelets.pdf | 5 | 917 | 0 | 0 |
| HIS Module - 64th/Pharma L4 immunosuppressant.pdf | 22 | 0 | 22 | 0 |
| HIS Module - 64th/Pharma Seminar treatment of Anemia.pdf | 32 | 1112 | 2 | 0 |
| HIS Module - 64th/Physiology L1 Handout functions of rbcs and erythropoiesis.pdf | 8 | 1761 | 0 | 0 |
| HIS Module - 64th/Physiology L1 functions of rbcs and erythropoiesis ppt.pdf | 37 | 1352 | 1 | 0 |
| HIS Module - 64th/Physiology L2 WBCs  RES.pdf | 34 | 1181 | 1 | 0 |
| HIS Module - 64th/Physiology L2 handout WBCS and RES.pdf | 8 | 1531 | 0 | 0 |
| HIS Module - 64th/Physiology L3 Hemostasis 1 .pdf | 36 | 1349 | 0 | 0 |
| HIS Module - 64th/Physiology L3 handout hemostasis 1.pdf | 7 | 1478 | 0 | 0 |
| HIS Module - 64th/Physiology_L4_handout_natural_anti_clotting_mechanisms_and_disorders.pdf | 5 | 1002 | 0 | 0 |
| HIS Module - 64th/Physiology_L4_natural_anti_clotting_mechanisms_disorders_of_homeostasis.pdf | 26 | 958 | 0 | 0 |
| HIS Module - 64th/Plasma Proteins lecture physiology notes.pdf | 6 | 1172 | 0 | 0 |
| HIS Module - 64th/Scan HIS Micro L3 - Organ transplantation (Dr.Elbelkasi).pdf | 6 | 0 | 6 | 0 |
| HIS Module - 64th/Scan Micro His Lect 1.Dr.Elbelkasi.pdf | 12 | 0 | 12 | 0 |
| HIS Module - 64th/Scan Qs Micro His Lect 1.Dr.Elbelkasi.pdf | 6 | 0 | 6 | 0 |
| HIS Module - 64th/Scan Summary Pharma HIS DrSherif.pdf | 19 | 0 | 19 | 0 |
| HIS Module - 64th/Seminar Pharma HIS Dr.Sherif (Scan).pdf | 11 | 0 | 11 | 0 |
| HIS Module - 64th/Seminar pharma HIS 1.pdf | 11 | 1428 | 0 | 0 |
| HIS Module - 64th/Seminar pharma HIS 2.pdf | 13 | 2072 | 0 | 0 |
| HIS Module - 64th/Virology Boards AE (2) - HIV.pdf | 17 | 0 | 17 | 0 |
| HIS Module - 64th/microbiology L4 Transplantation.pdf | 28 | 766 | 5 | 0 |
| HIS Module - 64th/microbiology L4 handout Transplantation.pdf | 6 | 686 | 0 | 0 |
| HIS Module - 64th/microbiology L5 Handout Immunodeficiency.pdf | 3 | 508 | 0 | 0 |
| HIS Module - 64th/microbiology L5, Immunodeficiency.pdf | 13 | 796 | 0 | 0 |
| HIS Module - 64th/pathology L1 handout non neoplastic lymphatic disorders.pdf | 3 | 479 | 0 | 0 |
| HIS Module - 64th/pathology L1 non neoplastic lymphoid disorders.pdf | 33 | 1150 | 0 | 0 |
| HIS Module - 64th/pathology L2 Lymphoma  leukemia.pdf | 44 | 2361 | 2 | 0 |
| HIS Module - 64th/pathology L2 handout Lymphoma and leukemia.pdf | 8 | 2009 | 0 | 0 |
| HIS Module - 64th/summary bio HIS.pdf | 11 | 1250 | 0 | 0 |
| HIS Module - 64th/summary pharma HIS ..pdf | 14 | 2021 | 0 | 0 |
| HIS Module - 64th/summary physio HIS.pdf | 17 | 2451 | 0 | 0 |
| HIS Module - 64th/تفريغ بايو ١ بارت ٢ الحسيني.pdf | 2 | 0 | 2 | 0 |
| HIS Module - 64th/تفريغ ميكرو ٣ بارت ١.pdf | 2 | 0 | 2 | 0 |
| MSS Module - 64th/4-Histo_Micro_Para Written MSS.pdf | 25 | 4828 | 0 | 0 |
| MSS Module - 64th/ANATOMA UPPER COMPLETE2.pdf | 19 | 4986 | 0 | 0 |
| MSS Module - 64th/ANATOMIST_ UPPER LIMP_ Part 1_compressed.pdf | 35 | 0 | 35 | 0 |
| MSS Module - 64th/ANATOMY_UPPER LIMB-MCQ 1_compressed (2).pdf | 48 | 0 | 48 | 0 |
| MSS Module - 64th/Addition to Lecture 1 MSS.pdf | 3 | 180 | 0 | 0 |
| MSS Module - 64th/All Physio MSS important MCQs-scan.pdf | 32 | 0 | 32 | 0 |
| MSS Module - 64th/Anatomy  L14 nerves of Lower limb.pdf | 27 | 570 | 5 | 0 |
| MSS Module - 64th/Anatomy  L2 pectoral and axilla.pdf | 42 | 1243 | 11 | 0 |
| MSS Module - 64th/Anatomy L1 Muscles of upper limb Back and shoulder anatomy.pdf | 26 | 839 | 0 | 0 |
| MSS Module - 64th/Anatomy L10 Handout the leg (anterior and lateral).pdf | 7 | 498 | 0 | 0 |
| MSS Module - 64th/Anatomy L10 The leg (anterior and lateral).pdf | 31 | 788 | 1 | 0 |
| MSS Module - 64th/Anatomy L11 The leg (posterior)  sole (3).pdf | 72 | 0 | 72 | 0 |
| MSS Module - 64th/Anatomy L11 The leg (posterior)  sole.pdf | 8 | 745 | 0 | 0 |
| MSS Module - 64th/Anatomy L12  Handout Lower Limb joints.pdf | 6 | 998 | 0 | 0 |
| MSS Module - 64th/Anatomy L12 Lower limb joint.pdf | 33 | 1279 | 1 | 0 |
| MSS Module - 64th/Anatomy L13  Handout lower limb vessels.pdf | 11 | 1284 | 0 | 0 |
| MSS Module - 64th/Anatomy L13  lower limb vessles.pdf | 48 | 1443 | 12 | 0 |
| MSS Module - 64th/Anatomy L14 Handout nerves of Lower limb.pdf | 11 | 1104 | 0 | 0 |
| MSS Module - 64th/Anatomy L2 Hand out Pectoral and axilla.pdf | 8 | 1147 | 0 | 0 |
| MSS Module - 64th/Anatomy L2.pdf | 12 | 2349 | 0 | 0 |
| MSS Module - 64th/Anatomy L3 Arm  front of forearm muscles + cubital fossa.pdf | 39 | 0 | 39 | 0 |
| MSS Module - 64th/Anatomy L4 Handout Muscles of the forearm (back) + Hand.pdf | 6 | 740 | 0 | 0 |
| MSS Module - 64th/Anatomy L4 Muscles of the forearm (back) + Hand.pdf | 57 | 1244 | 4 | 0 |
| MSS Module - 64th/Anatomy L5 Handout joints and nerves of UL .pdf | 9 | 930 | 0 | 0 |
| MSS Module - 64th/Anatomy L5 Nerves joints UL .pdf | 35 | 1000 | 5 | 0 |
| MSS Module - 64th/Anatomy L6 Handout Nerves of upper limb.pdf | 7 | 1079 | 0 | 0 |
| MSS Module - 64th/Anatomy L6 Nerves of upper limb.pdf | 33 | 1281 | 7 | 0 |
| MSS Module - 64th/Anatomy L7 Handout vessels 2026 of the upper limb.pdf | 7 | 1061 | 0 | 0 |
| MSS Module - 64th/Anatomy L7 Vessels of upper limb.pdf | 43 | 0 | 43 | 0 |
| MSS Module - 64th/Anatomy L8 Anterior  medial compartments (Thigh).pdf | 35 | 1061 | 0 | 0 |
| MSS Module - 64th/Anatomy L8 Handout Anterior  medial compartments (Thigh).pdf | 7 | 782 | 0 | 0 |
| MSS Module - 64th/Anatomy L9 Handout the gluteal region and back of the thigh.pdf | 8 | 2008 | 0 | 0 |
| MSS Module - 64th/Anatomy L9 PowerPoint.pdf | 42 | 0 | 42 | 0 |
| MSS Module - 64th/Anatomy_L1_Handout_Muscles_of_upper_limb_1_Back_and_Shoulder_region.pdf | 4 | 713 | 0 | 0 |
| MSS Module - 64th/Anatomy_L_3_handout_Arm,_anterior_of_forearm_muscles_cubital_fossa.pdf | 6 | 644 | 0 | 0 |
| MSS Module - 64th/Anatomy_MSS 1_HS .pdf | 7 | 832 | 0 | 0 |
| MSS Module - 64th/Anatomy_MSS 2_HS.pdf | 10 | 1281 | 0 | 0 |
| MSS Module - 64th/Arthritis.pdf | 8 | 595 | 0 | 0 |
| MSS Module - 64th/Bone Tumors Collections.pdf | 2 | 403 | 0 | 0 |
| MSS Module - 64th/CBL 3 (Osteomyelitis).pdf | 5 | 1120 | 0 | 0 |
| MSS Module - 64th/Capsule MSK 1.pdf | 12 | 1789 | 0 | 0 |
| MSS Module - 64th/Capsule MSK 2.pdf | 9 | 1139 | 0 | 0 |
| MSS Module - 64th/DOC-20260420-WA0021..pdf | 11 | 11 | 0 | 0 |
| MSS Module - 64th/Drugs of MSS _20260504_114618_0000.pdf | 7 | 1856 | 0 | 0 |
| MSS Module - 64th/Histo MSS Important MCQ.pdf | 25 | 0 | 25 | 0 |
| MSS Module - 64th/Histo MSS L2.pdf | 9 | 0 | 9 | 0 |
| MSS Module - 64th/Histo MSS L3.pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/Histo MSS L4.pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/Histo MSS L5 Team64 (1).pdf | 7 | 780 | 0 | 0 |
| MSS Module - 64th/Histo MSS L5.pdf | 12 | 0 | 12 | 0 |
| MSS Module - 64th/Histo MSS Lecture 1.pdf | 7 | 0 | 7 | 0 |
| MSS Module - 64th/Histo MSS Summary.pdf | 6 | 0 | 6 | 0 |
| MSS Module - 64th/Histo MSS Written.pdf | 24 | 0 | 24 | 0 |
| MSS Module - 64th/Histo_MSS 1 MCQ_AG.pdf | 5 | 680 | 0 | 0 |
| MSS Module - 64th/Histo_MSS 1_AG.pdf | 6 | 518 | 0 | 0 |
| MSS Module - 64th/Histology 2-3 MCQ.pdf | 11 | 1720 | 0 | 0 |
| MSS Module - 64th/Histology L1 Cartilage 2026.pdf | 15 | 522 | 0 | 0 |
| MSS Module - 64th/Histology L2 Handout bone notes-1.pdf | 10 | 715 | 0 | 0 |
| MSS Module - 64th/Histology L2 bone-1.pdf | 30 | 639 | 3 | 0 |
| MSS Module - 64th/Histology L3 Bone-2.pdf | 29 | 569 | 3 | 0 |
| MSS Module - 64th/Histology L3 Handout bone notes-2.pdf | 10 | 696 | 0 | 0 |
| MSS Module - 64th/Histology L4 Handout Skeletal muscles.pdf | 7 | 944 | 0 | 0 |
| MSS Module - 64th/Histology L4 MCQ.pdf | 12 | 2495 | 0 | 0 |
| MSS Module - 64th/Histology L4 Skeletal muscles.pdf | 23 | 909 | 1 | 0 |
| MSS Module - 64th/Histology L5 Cardiac and smooth muscle.pdf | 25 | 898 | 0 | 0 |
| MSS Module - 64th/Histology L5 Handout Cardiac and smooth ms.pdf | 5 | 795 | 0 | 0 |
| MSS Module - 64th/Histology MSS - Lecture (1) - Dr. Shalaby .pdf | 8 | 775 | 0 | 0 |
| MSS Module - 64th/Histology MSS - Lecture (2) - Dr. Shalaby .pdf | 8 | 727 | 0 | 0 |
| MSS Module - 64th/L1 - Shoulder and Back muscles MCQs.pdf | 13 | 2051 | 0 | 0 |
| MSS Module - 64th/L1 Histo.pdf | 8 | 0 | 8 | 0 |
| MSS Module - 64th/L1 Muscles of the back.pdf | 9 | 824 | 0 | 0 |
| MSS Module - 64th/L1 para mcq.pdf | 9 | 1269 | 1 | 0 |
| MSS Module - 64th/L10 The leg (Anterior and lateral compartment).pdf | 6 | 491 | 0 | 0 |
| MSS Module - 64th/L11 posterior copmartment of Leg and sole.pdf | 10 | 887 | 0 | 0 |
| MSS Module - 64th/L12 Questions.pdf | 26 | 3886 | 0 | 0 |
| MSS Module - 64th/L12 lower limb joints (AutoRecovered).pdf | 13 | 1159 | 0 | 0 |
| MSS Module - 64th/L13 lower limb vessles.pdf | 15 | 1543 | 0 | 0 |
| MSS Module - 64th/L14 lower limb nerves.pdf | 13 | 1189 | 0 | 0 |
| MSS Module - 64th/L2 Histo.pdf | 8 | 0 | 8 | 0 |
| MSS Module - 64th/L2 Pectoral & Axilla.pdf | 13 | 1152 | 0 | 0 |
| MSS Module - 64th/L2 para mcq.pdf | 9 | 1101 | 1 | 0 |
| MSS Module - 64th/L2 questions (1).pdf | 18 | 2899 | 0 | 0 |
| MSS Module - 64th/L3 (3).pdf | 16 | 1128 | 0 | 0 |
| MSS Module - 64th/L3 Histo.pdf | 9 | 0 | 9 | 0 |
| MSS Module - 64th/L3 Muscles of the arm and the front of forearm.pdf | 13 | 991 | 0 | 0 |
| MSS Module - 64th/L3 Patho.pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/L3 para.pdf | 9 | 917 | 1 | 0 |
| MSS Module - 64th/L3 questions .pdf | 17 | 2836 | 0 | 0 |
| MSS Module - 64th/L4 (2).pdf | 15 | 1024 | 0 | 0 |
| MSS Module - 64th/L4 Histo.pdf | 8 | 0 | 8 | 0 |
| MSS Module - 64th/L4 Muscles of the forearm & hand.pdf | 13 | 1048 | 0 | 0 |
| MSS Module - 64th/L4 para (1).pdf | 5 | 421 | 1 | 0 |
| MSS Module - 64th/L4 physio.pdf | 9 | 0 | 9 | 0 |
| MSS Module - 64th/L4 questions.pdf | 18 | 2928 | 0 | 0 |
| MSS Module - 64th/L7 Vessels of the upper limb.pdf | 14 | 1189 | 0 | 0 |
| MSS Module - 64th/L8 Anterior & Medial compartments of the thigh.pdf | 14 | 1067 | 0 | 0 |
| MSS Module - 64th/L9 The gluteal region and back of the thigh.pdf | 17 | 2072 | 0 | 0 |
| MSS Module - 64th/Lec 1 Pharma MCQ (Analgesics 1).pdf | 12 | 2121 | 0 | 0 |
| MSS Module - 64th/Lec 2  Pharma MCQ (Opioid analgesics 2).pdf | 6 | 1084 | 0 | 0 |
| MSS Module - 64th/Lect 2 Anatomy Dr.Galilio Scan.pdf | 10 | 0 | 10 | 0 |
| MSS Module - 64th/Lect 3 Pharma Dr.Sherif PDF Scan.pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/Lect 4 Pharma Dr.Sherif PDF Scan.pdf | 7 | 0 | 7 | 0 |
| MSS Module - 64th/Lect 5 Pharma Dr.Sherif PDF Scan.pdf | 10 | 0 | 10 | 0 |
| MSS Module - 64th/Lect 6 Pharma Dr.Sherif PDF Scan.pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/MCQ Histo MSS L2.pdf | 7 | 0 | 7 | 0 |
| MSS Module - 64th/MCQ Histo MSS L3.pdf | 6 | 0 | 6 | 0 |
| MSS Module - 64th/MCQ Histo MSS L4.pdf | 7 | 0 | 7 | 0 |
| MSS Module - 64th/MCQ Histo MSS L5.pdf | 7 | 0 | 7 | 0 |
| MSS Module - 64th/MCQ Histo MSS Lecture 1.pdf | 10 | 0 | 10 | 0 |
| MSS Module - 64th/MCQ Lect 5 Pharma Dr.Sherif PDF Scan.pdf | 10 | 0 | 10 | 0 |
| MSS Module - 64th/MCQ Lect 6 Pharma Dr.Sherif PDF Scan.pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/MCQ MSS 1 (new).pdf | 12 | 1743 | 0 | 0 |
| MSS Module - 64th/MCQ MSS Lecture 1.pdf | 6 | 722 | 0 | 0 |
| MSS Module - 64th/MCQ MSS Lecture 2.pdf | 5 | 719 | 0 | 0 |
| MSS Module - 64th/MCQ Patho MSS L1.pdf | 15 | 0 | 15 | 0 |
| MSS Module - 64th/MCQ Patho MSS L2.pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/MCQ Patho MSS L3.pdf | 9 | 0 | 9 | 0 |
| MSS Module - 64th/MCQ Patho MSS L4.pdf | 10 | 0 | 10 | 0 |
| MSS Module - 64th/MCQ Patho MSS L5.pdf | 8 | 0 | 8 | 0 |
| MSS Module - 64th/MCQ Patho MSS L6.pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/MCQ on seminar.pdf | 9 | 2193 | 0 | 0 |
| MSS Module - 64th/MSS - Lecture 1 - Shoulder and Back muscles.pdf | 9 | 852 | 0 | 0 |
| MSS Module - 64th/MSS 1- MCQ .pdf | 10 | 1836 | 0 | 0 |
| MSS Module - 64th/MSS 1.pdf | 7 | 730 | 0 | 0 |
| MSS Module - 64th/MSS Anatomy L10 team 64 (2).pdf | 7 | 483 | 0 | 0 |
| MSS Module - 64th/MSS Anatomy L12 team 64.pdf | 12 | 1200 | 0 | 0 |
| MSS Module - 64th/MSS Anatomy L8 team 64.pdf | 9 | 849 | 0 | 0 |
| MSS Module - 64th/MSS Anatomy L9 MCQ.pdf | 19 | 3556 | 0 | 0 |
| MSS Module - 64th/MSS Anatomy L9 team 64.pdf | 18 | 1888 | 0 | 0 |
| MSS Module - 64th/MSS L1 - Trichinosis.pdf | 7 | 793 | 0 | 0 |
| MSS Module - 64th/MSS L2 - Cestodes 2026 (1).pdf | 20 | 2688 | 0 | 0 |
| MSS Module - 64th/MSS L3 - Nematodes affecting human skin (1).pdf | 18 | 2075 | 0 | 0 |
| MSS Module - 64th/MSS L4 - Cutaneous and Mucocutaneous Leishmaniasis.pdf | 8 | 1522 | 0 | 0 |
| MSS Module - 64th/MSS L6.pdf | 13 | 13 | 0 | 0 |
| MSS Module - 64th/MSS Lecures & Practical.pdf | 3 | 405 | 0 | 0 |
| MSS Module - 64th/MSS Para L1.pdf | 6 | 746 | 0 | 0 |
| MSS Module - 64th/MSS Para L4.pdf | 10 | 1690 | 0 | 0 |
| MSS Module - 64th/MSS Past Years.pdf | 42 | 9721 | 1 | 0 |
| MSS Module - 64th/MSS Pharma L1.pdf | 7 | 1176 | 0 | 0 |
| MSS Module - 64th/MSS Pharma L2.pdf | 6 | 777 | 0 | 0 |
| MSS Module - 64th/MSS Pharma L3.pdf | 10 | 993 | 0 | 0 |
| MSS Module - 64th/MSS Pharma L4.pdf | 8 | 1023 | 0 | 0 |
| MSS Module - 64th/MSS Pharma L5.pdf | 10 | 1013 | 0 | 0 |
| MSS Module - 64th/MSS Pharma L6.pdf | 12 | 1009 | 0 | 0 |
| MSS Module - 64th/MSS Physiology - Summary (1-3).pdf | 6 | 1638 | 0 | 0 |
| MSS Module - 64th/MSS written - with answers-scan.pdf | 6 | 0 | 6 | 0 |
| MSS Module - 64th/MSS written-scan.pdf | 7 | 0 | 7 | 0 |
| MSS Module - 64th/Micro - MSS - Written.pdf | 5 | 0 | 5 | 0 |
| MSS Module - 64th/Micro online case 2  Gas gangrene (1).pdf | 1 | 193 | 0 | 0 |
| MSS Module - 64th/Microbiology L1 anaerobic infection  Clostridium ppt.pdf | 49 | 1745 | 0 | 0 |
| MSS Module - 64th/Microbiology_L1_anaerobic_infection_Clostridia_lecture_notes.pdf | 12 | 1711 | 0 | 0 |
| MSS Module - 64th/Most important MCQ (continuous).pdf | 48 | 7252 | 0 | 0 |
| MSS Module - 64th/Myopathy.pdf | 14 | 1521 | 0 | 0 |
| MSS Module - 64th/Osteomyelitis.pdf | 12 | 1309 | 0 | 0 |
| MSS Module - 64th/Para - MSS - Written.pdf | 18 | 0 | 18 | 0 |
| MSS Module - 64th/Para L1 MCQ.pdf | 9 | 1580 | 0 | 0 |
| MSS Module - 64th/Para L1 Trichinosis.pdf | 40 | 926 | 0 | 0 |
| MSS Module - 64th/Para L1 handout Trichinosis.pdf | 6 | 654 | 0 | 0 |
| MSS Module - 64th/Para L2 Cestodes affecting skin and muscoskeletal system.pdf | 35 | 1358 | 1 | 0 |
| MSS Module - 64th/Para L2 handout of Cestodes affecting MSK.pdf | 7 | 1966 | 0 | 0 |
| MSS Module - 64th/Para L4 Cutaneous Leishmania.pdf | 44 | 1840 | 2 | 0 |
| MSS Module - 64th/Para L4 Handout Cutaneous Leishmania handout.pdf | 9 | 1459 | 0 | 0 |
| MSS Module - 64th/Para MSS L3.pdf | 15 | 1857 | 0 | 0 |
| MSS Module - 64th/Parasitology L3 nemtatodes affecting human skin.pdf | 50 | 1993 | 4 | 0 |
| MSS Module - 64th/Parasitology L4 Handout Nematodes affacting skin.pdf | 10 | 1773 | 0 | 0 |
| MSS Module - 64th/Patho MSS - Lecture (4) - Dr. Shalaby .pdf | 12 | 1668 | 1 | 0 |
| MSS Module - 64th/Patho MSS - Lecture (5) - Dr. Shalaby .pdf | 14 | 1216 | 1 | 0 |
| MSS Module - 64th/Patho MSS Important MCQ.pdf | 52 | 0 | 52 | 0 |
| MSS Module - 64th/Patho MSS L1.pdf | 17 | 0 | 17 | 0 |
| MSS Module - 64th/Patho MSS L2.pdf | 16 | 0 | 16 | 0 |
| MSS Module - 64th/Patho MSS L3.pdf | 14 | 0 | 14 | 0 |
| MSS Module - 64th/Patho MSS L4.pdf | 18 | 0 | 18 | 0 |
| MSS Module - 64th/Patho MSS L5.pdf | 16 | 0 | 16 | 0 |
| MSS Module - 64th/Patho MSS L6.pdf | 18 | 0 | 18 | 0 |
| MSS Module - 64th/Patho MSS Summary + Collections.pdf | 22 | 0 | 22 | 0 |
| MSS Module - 64th/Patho MSS Written.pdf | 26 | 0 | 26 | 0 |
| MSS Module - 64th/Patho MSS lecture (1) - Dr. Shalaby .pdf | 13 | 0 | 13 | 0 |
| MSS Module - 64th/Patho MSS lecture (2) - Dr. Shalaby .pdf | 10 | 0 | 10 | 0 |
| MSS Module - 64th/Patho MSS lecture (3) - Dr. Shalaby .pdf | 11 | 0 | 11 | 0 |
| MSS Module - 64th/Patholgy L2 MCQ.pdf | 14 | 2514 | 0 | 0 |
| MSS Module - 64th/Pathology L1 Osteodystrophy lecture note.pdf | 11 | 1775 | 0 | 0 |
| MSS Module - 64th/Pathology L1 osteodystrophy ppt.pdf | 47 | 1956 | 6 | 0 |
| MSS Module - 64th/Pathology L2 osteomyelitis.pdf | 39 | 1632 | 5 | 0 |
| MSS Module - 64th/Pathology L2 osteomylitis lecture note.pdf | 8 | 1109 | 1 | 0 |
| MSS Module - 64th/Pathology L3 Joint diseases lecture notes.pdf | 9 | 768 | 0 | 0 |
| MSS Module - 64th/Pathology L3 Joint diseases ppt.pdf | 37 | 1125 | 2 | 0 |
| MSS Module - 64th/Pathology L4 Myopathy lecture notes.pdf | 8 | 1191 | 0 | 0 |
| MSS Module - 64th/Pathology L4 myopathy ppt.pdf | 44 | 1466 | 9 | 0 |
| MSS Module - 64th/Pathology L6 Soft Tissue Tumors lecture notes.pdf | 12 | 1348 | 0 | 0 |
| MSS Module - 64th/Pathology L6 soft tissue tumors ppt.pdf | 37 | 1573 | 1 | 0 |
| MSS Module - 64th/Pathology...L1...{MSS).pdf | 20 | 2150 | 0 | 0 |
| MSS Module - 64th/Pharma L1 Analgesics 1.pdf | 34 | 638 | 6 | 0 |
| MSS Module - 64th/Pharma L1 Handout Analgesics 1.pdf | 14 | 1912 | 0 | 0 |
| MSS Module - 64th/Pharma L2 Opioid analgesics.pdf | 29 | 1189 | 4 | 0 |
| MSS Module - 64th/Pharma L3 Disease Modifying Antirheumatic drugs.pdf | 35 | 1279 | 1 | 0 |
| MSS Module - 64th/Pharma L3 Handout Disease Modifying Antirheumatic Drugs.pdf | 12 | 934 | 0 | 0 |
| MSS Module - 64th/Pharma L4 Handout skeletal muscle relaxant.pdf | 8 | 973 | 0 | 0 |
| MSS Module - 64th/Pharma L4 Skeletal muscle relaxant.pdf | 31 | 1433 | 0 | 0 |
| MSS Module - 64th/Pharma L5 Handout drugs affecting ca haemostasis.pdf | 7 | 906 | 0 | 0 |
| MSS Module - 64th/Pharma L5 PTH drugs and drugs affection Ca haemostasis.pdf | 33 | 1598 | 0 | 0 |
| MSS Module - 64th/Pharma L6 Handout Gout Therapy.pdf | 10 | 876 | 0 | 0 |
| MSS Module - 64th/Pharma L6 Therapy of gout.pdf | 32 | 1305 | 1 | 0 |
| MSS Module - 64th/Pharma Lec 1 (Analgesics 1) edit.pdf | 9 | 1497 | 0 | 0 |
| MSS Module - 64th/Pharma Lec 2 (Opioid analgesics 2 ) edit.pdf | 6 | 852 | 0 | 0 |
| MSS Module - 64th/Pharma_Seminar_case_discussion_of_Myasthenia_gravis_2f5264262cb.pdf | 34 | 1787 | 1 | 0 |
| MSS Module - 64th/Pharmacology L1-2 MCQ.pdf | 13 | 2606 | 0 | 0 |
| MSS Module - 64th/Physio L1.pdf | 6 | 646 | 0 | 0 |
| MSS Module - 64th/Physio L2.pdf | 12 | 1392 | 0 | 0 |
| MSS Module - 64th/Physio L3.pdf | 12 | 1220 | 0 | 0 |
| MSS Module - 64th/Physio L4.pdf | 8 | 839 | 0 | 0 |
| MSS Module - 64th/Physio MSS 1.pdf | 5 | 653 | 0 | 0 |
| MSS Module - 64th/Physiology L1 intugmentry system (physiology of skin) ppt.pdf | 22 | 726 | 1 | 0 |
| MSS Module - 64th/Physiology L2 Neuro-Muscular Transmission.pdf | 30 | 1188 | 1 | 0 |
| MSS Module - 64th/Physiology L4-5 MCQ.pdf | 10 | 2612 | 0 | 0 |
| MSS Module - 64th/Physiology L5 physiology of sk ms fiber.pdf | 28 | 1126 | 1 | 0 |
| MSS Module - 64th/Physiology Lecture 4 changes during sk ms contraction.pdf | 24 | 694 | 1 | 0 |
| MSS Module - 64th/Physiology_L1_intugmentry_system_physiology_of_skin_lecture_note.pdf | 4 | 674 | 0 | 0 |
| MSS Module - 64th/Physiology_L3_Excitation_Contraction_Coupling_in_Skeletal_Muscles.pdf | 30 | 938 | 2 | 0 |
| MSS Module - 64th/Physiology_L4_changes_during_sk_ms_contraction_lecture_note.pdf | 6 | 890 | 0 | 0 |
| MSS Module - 64th/Physiology_L5_Physiology_of_skeletal_muscle_fibers_lecture_note.pdf | 5 | 799 | 0 | 0 |
| MSS Module - 64th/Physiology_MSS_important_MCQs_1_3_scan_Dr_Action_Potential.pdf | 16 | 0 | 16 | 0 |
| MSS Module - 64th/Scan L1 Micro Mss Lect DrElbelksi.pdf | 15 | 0 | 15 | 0 |
| MSS Module - 64th/Scan L1 Micro Mss mcq DrElbelksi.pdf | 5 | 0 | 5 | 0 |
| MSS Module - 64th/Scan L10  Mss Hero questions.pdf | 13 | 0 | 13 | 0 |
| MSS Module - 64th/Scan L10  Mss Hero.pdf | 8 | 0 | 8 | 0 |
| MSS Module - 64th/Scan L11  Mss Hero.pdf | 13 | 0 | 13 | 0 |
| MSS Module - 64th/Scan L11 Mss Hero questions final.pdf | 17 | 0 | 17 | 0 |
| MSS Module - 64th/Scan L12  Mss Hero.pdf | 12 | 0 | 12 | 0 |
| MSS Module - 64th/Scan L14 Mss Hero.pdf | 14 | 0 | 14 | 0 |
| MSS Module - 64th/Scan L5  Mss Hero questions.pdf | 16 | 0 | 16 | 0 |
| MSS Module - 64th/Scan L5  Mss Hero.pdf | 10 | 0 | 10 | 0 |
| MSS Module - 64th/Scan L6  Mss Hero questions.pdf | 22 | 0 | 22 | 0 |
| MSS Module - 64th/Scan L6  Mss Hero.pdf | 14 | 0 | 14 | 0 |
| MSS Module - 64th/Scan L7  Mss Hero.pdf | 16 | 0 | 16 | 0 |
| MSS Module - 64th/Scan L7 Mss Hero Question.pdf | 25 | 0 | 25 | 0 |
| MSS Module - 64th/Scan L8  Mss Hero questions.pdf | 18 | 0 | 18 | 0 |
| MSS Module - 64th/Scan L8  Mss Hero-1.pdf | 14 | 0 | 14 | 0 |
| MSS Module - 64th/Scan L9  Mss Hero.pdf | 19 | 0 | 19 | 0 |
| MSS Module - 64th/Scan Lect 13 Dr.HERO.pdf | 14 | 0 | 14 | 0 |
| MSS Module - 64th/Sem2, CBL 4 , (Student version).pdf | 5 | 858 | 0 | 0 |
| MSS Module - 64th/Tables_Upper Limp_Anatomy.pdf | 14 | 3154 | 0 | 0 |
| MSS Module - 64th/Untitled Notebook 2 1.pdf | 4 | 1 | 3 | 0 |
| MSS Module - 64th/Untitled Notebook 4.pdf | 4 | 0 | 4 | 0 |
| MSS Module - 64th/Upper 1 Dr Cluster 2026 Scan.pdf | 15 | 0 | 15 | 0 |
| MSS Module - 64th/Upper 2 Dr Cluster 2026 Scan.pdf | 10 | 0 | 10 | 0 |
| MSS Module - 64th/__ورقة_تجميعات_دكتور_ايمن_خنفور_لل_Upper_Limb_of_MSK_3_.pdf | 16 | 1055 | 0 | 0 |
| MSS Module - 64th/dr. Nagy muscle diagrams.pdf | 21 | 0 | 21 | 0 |
| MSS Module - 64th/final bone tumours.pdf | 11 | 953 | 0 | 0 |
| MSS Module - 64th/most important MCQs (After midterm).pdf | 41 | 6388 | 0 | 0 |
| MSS Module - 64th/online case median n injury.pdf | 2 | 270 | 0 | 0 |
| MSS Module - 64th/part 2.pdf | 23 | 2289 | 0 | 0 |
| MSS Module - 64th/pathology L5 Bone tumors lecture notes.pdf | 4 | 917 | 0 | 0 |
| MSS Module - 64th/pathology L5 Bone tumors ppt.pdf | 53 | 1162 | 15 | 0 |
| MSS Module - 64th/physiology_online_applied_case_discussion_malignant_hyperthermia.pdf | 1 | 139 | 0 | 0 |
| MSS Module - 64th/scan 13 hero mcq.pdf | 28 | 0 | 28 | 0 |
| MSS Module - 64th/scan lec 14 qs hero.pdf | 15 | 0 | 15 | 0 |
| MSS Module - 64th/sem 2, CBL 3 (Student version).pdf | 3 | 494 | 0 | 0 |
| MSS Module - 64th/upper dr darwish-compressed.pdf | 70 | 6712 | 9 | 0 |
| MSS Module - 64th/تجميعات MSK للامتحان.pdf | 8 | 1686 | 0 | 0 |
| MSS Module - 64th/تفريغ Patho 2.pdf | 5 | 0 | 5 | 0 |
| MSS Module - 64th/رسومات خط اليد upper limb (1).pdf | 5 | 41 | 4 | 0 |
| MSS Module - 64th/رسومات خط اليد upper limb (2).pdf | 55 | 1876 | 5 | 0 |
| MSS Module - 64th/رسومات خط اليد محمود علاء Lower Limb.pdf | 40 | 64 | 30 | 0 |
| PPPM Module - 64th/1-Written_Pharma_PPPM.pdf | 79 | 17649 | 0 | 0 |
| PPPM Module - 64th/1.General Summary (1-7) New.pdf | 28 | 4560 | 0 | 0 |
| PPPM Module - 64th/1000503981_compressed (1).pdf | 18 | 0 | 18 | 0 |
| PPPM Module - 64th/2.Autonomic Summary (8-14) New.pdf | 14 | 1928 | 0 | 0 |
| PPPM Module - 64th/3.Chemotherapy Summary (15-19) New.pdf | 19 | 2432 | 0 | 0 |
| PPPM Module - 64th/4_5884059716111310525.pdf | 4 | 529 | 0 | 0 |
| PPPM Module - 64th/Autonomic Pharmacology seminar 2 edit.pdf | 10 | 1496 | 0 | 0 |
| PPPM Module - 64th/CBL 1 (Infection).pdf | 5 | 1065 | 0 | 0 |
| PPPM Module - 64th/CBL 2 (Breast cancer).pdf | 7 | 1667 | 0 | 0 |
| PPPM Module - 64th/CBL_1_Questions_without_answers_429a8f2b030697e2d_250311_015452.pdf | 2 | 424 | 0 | 0 |
| PPPM Module - 64th/Collections pharma 15-19.pdf | 3 | 468 | 0 | 0 |
| PPPM Module - 64th/DR.Elbelkasi General Micro MCQ ( 1-8-9-10-11-12 ).pdf | 27 | 5306 | 0 | 0 |
| PPPM Module - 64th/DR.Elbelkasi General Micro summary ( 1-8-9-10-11-12 ).pdf | 15 | 2460 | 0 | 0 |
| PPPM Module - 64th/DR.Elbelkasi Para MCQ ( 1-2-3 ).pdf | 23 | 3207 | 0 | 0 |
| PPPM Module - 64th/DR.Elbelkasi Para Summary ( 1-2-3 ).pdf | 9 | 1313 | 0 | 0 |
| PPPM Module - 64th/Degrams d. Ahmed Essam - @Medicine_Way2.pdf | 40 | 120 | 0 | 0 |
| PPPM Module - 64th/L 1 MCQ New.pdf | 13 | 3097 | 0 | 0 |
| PPPM Module - 64th/L 2 MCQ New.pdf | 15 | 3283 | 0 | 0 |
| PPPM Module - 64th/L01, Introduction to medical microbiology; Lecture note.pdf | 4 | 385 | 0 | 0 |
| PPPM Module - 64th/L01, Introduction to medical microbiology; ppt.pdf | 21 | 983 | 2 | 0 |
| PPPM Module - 64th/L02,Cells of the immune system-lecture note.pdf | 7 | 840 | 0 | 0 |
| PPPM Module - 64th/L02,_L03,_ppt_Cells_of_the_immune_system,_Antigen_presentation_and.pdf | 44 | 1007 | 10 | 0 |
| PPPM Module - 64th/L03, Antigen presentation and phagocytosis -lecture note.pdf | 6 | 989 | 0 | 0 |
| PPPM Module - 64th/L04, Ag and Ig lecture note.pdf | 10 | 911 | 1 | 0 |
| PPPM Module - 64th/L04, Ag and Ig ppt.pdf | 34 | 1202 | 4 | 0 |
| PPPM Module - 64th/L05, Adaptive immunity Lecture note.pdf | 11 | 1004 | 3 | 0 |
| PPPM Module - 64th/L05, Adaptive immunity ppt.pdf | 36 | 1305 | 6 | 0 |
| PPPM Module - 64th/L1 Introduction to Pathology Handout Prof. Azza (1).pdf | 7 | 765 | 0 | 0 |
| PPPM Module - 64th/L1 Introduction to Pathology ppt.pdf | 36 | 938 | 1 | 0 |
| PPPM Module - 64th/L1 PATHOLOGY UPDATED.pdf | 10 | 765 | 1 | 0 |
| PPPM Module - 64th/L10 MCQ.pdf | 9 | 1419 | 1 | 0 |
| PPPM Module - 64th/L12 MCQ.pdf | 10 | 1497 | 0 | 0 |
| PPPM Module - 64th/L16, Overview of vaccination; Lecture note.pdf | 5 | 1119 | 0 | 0 |
| PPPM Module - 64th/L2 Adaptation and reversible cell injury Handout Prof. Azza.pdf | 13 | 1059 | 0 | 0 |
| PPPM Module - 64th/L2 PATHOLOGY UPDATED.pdf | 11 | 1025 | 1 | 0 |
| PPPM Module - 64th/L2_Cell_Injury_1_Adaptation_and_reversible_cell_injury_2024.pdf | 45 | 1574 | 0 | 0 |
| PPPM Module - 64th/L3 Irreversible cell injury handout.pdf | 4 | 621 | 0 | 0 |
| PPPM Module - 64th/L3 PATHOLOGY UPDATED.pdf | 7 | 680 | 1 | 0 |
| PPPM Module - 64th/L3 irreversible cell injury ppt.pdf | 52 | 1338 | 1 | 0 |
| PPPM Module - 64th/L4 MCQ.pdf | 7 | 882 | 1 | 0 |
| PPPM Module - 64th/L4 PATHOLOGY UPDATED.pdf | 7 | 500 | 1 | 0 |
| PPPM Module - 64th/L4 tissue Accumulation handout.pdf | 21 | 469 | 0 | 0 |
| PPPM Module - 64th/L4 tissue Accumulation ppt Dr Nirmeen Megahed.pdf | 55 | 558 | 6 | 0 |
| PPPM Module - 64th/L5  inflammation Lecture note.pdf | 5 | 559 | 0 | 0 |
| PPPM Module - 64th/L5  inflammation ppt.pdf | 31 | 676 | 5 | 0 |
| PPPM Module - 64th/L5 PPPM UPDATED.pdf | 6 | 725 | 1 | 0 |
| PPPM Module - 64th/L6 MCQ.pdf | 6 | 734 | 1 | 0 |
| PPPM Module - 64th/L6 PPPM UPDATED.pdf | 6 | 667 | 1 | 0 |
| PPPM Module - 64th/L6 acute inflammation (mediators & morphology) ppt.pdf | 39 | 944 | 4 | 0 |
| PPPM Module - 64th/L6_acute_inflammation_mediators_and_morphology_lecture_note.pdf | 4 | 713 | 0 | 0 |
| PPPM Module - 64th/L7 PPM UPDATED.pdf | 10 | 1111 | 1 | 0 |
| PPPM Module - 64th/L7 Types of acute inflammation lecture notes.pdf | 5 | 962 | 0 | 0 |
| PPPM Module - 64th/L7 Types of acute inflammation ppt.pdf | 30 | 1091 | 3 | 0 |
| PPPM Module - 64th/L8 pathology (Chronic inflammation) ppt.pdf | 51 | 1155 | 6 | 0 |
| PPPM Module - 64th/L8 pathoogy (Chronic inflammation) lecture note.pdf | 4 | 787 | 0 | 0 |
| PPPM Module - 64th/L8 pppm updated.pdf | 6 | 859 | 0 | 0 |
| PPPM Module - 64th/L9 pathology (repair) lecture note.pdf | 5 | 721 | 0 | 0 |
| PPPM Module - 64th/L9 pathology (repair) ppt.pdf | 43 | 890 | 2 | 0 |
| PPPM Module - 64th/L9 pppm updated.pdf | 6 | 709 | 0 | 0 |
| PPPM Module - 64th/LEC 3 Q.pdf | 10 | 1364 | 1 | 0 |
| PPPM Module - 64th/Lec 1 Pharma .. New.pdf | 8 | 1201 | 0 | 0 |
| PPPM Module - 64th/Lec 2 Pharma .. New.pdf | 10 | 1026 | 0 | 0 |
| PPPM Module - 64th/Lecture 1 _ Micro _ Introduction.pdf | 5 | 402 | 0 | 0 |
| PPPM Module - 64th/Lecture 10 - Immunity.pdf | 6 | 859 | 0 | 0 |
| PPPM Module - 64th/Lecture 2 - Trematodes.pdf | 8 | 789 | 0 | 0 |
| PPPM Module - 64th/Lecture 2 mcq.pdf | 13 | 2256 | 1 | 0 |
| PPPM Module - 64th/Lecture 3 - Cestodes (1).pdf | 12 | 1570 | 0 | 0 |
| PPPM Module - 64th/Lecture 4 & 5 & 6.pdf | 24 | 3544 | 0 | 0 |
| PPPM Module - 64th/Lecture 4 - Nematodes - 2026 .pdf | 9 | 951 | 0 | 0 |
| PPPM Module - 64th/Lecture 5 - Protozoa.pdf | 9 | 815 | 0 | 0 |
| PPPM Module - 64th/Lecture 6 - Arthropodes I copy.pdf | 11 | 1227 | 0 | 0 |
| PPPM Module - 64th/Lecture 7 - Arthropodes II.pdf | 13 | 2174 | 0 | 0 |
| PPPM Module - 64th/Lecture 7.pdf | 5 | 499 | 0 | 0 |
| PPPM Module - 64th/Lecture 8 - Myiasis Final.pdf | 9 | 1219 | 0 | 0 |
| PPPM Module - 64th/Lecture 8.pdf | 9 | 953 | 0 | 0 |
| PPPM Module - 64th/Lecture 9 - Zoonosis 2026.pdf | 7 | 585 | 0 | 0 |
| PPPM Module - 64th/Lecture_1_General_Concepts_of_Medical_Parasitology_دا_البلقاسي.pdf | 7 | 975 | 0 | 0 |
| PPPM Module - 64th/MCQ - PPPM - Micro - 2026.pdf | 61 | 10791 | 1 | 0 |
| PPPM Module - 64th/MCQ 5.pdf | 7 | 1282 | 1 | 0 |
| PPPM Module - 64th/MCQ 8.pdf | 8 | 1223 | 0 | 0 |
| PPPM Module - 64th/MCQ 9.pdf | 9 | 1152 | 1 | 0 |
| PPPM Module - 64th/MCQ Continous 2026.pdf | 64 | 11431 | 0 | 0 |
| PPPM Module - 64th/MCQ LEC 1.pdf | 6 | 713 | 1 | 0 |
| PPPM Module - 64th/MCQ Patho L10.pdf | 9 | 0 | 9 | 0 |
| PPPM Module - 64th/MCQ Patho L12.pdf | 13 | 0 | 13 | 0 |
| PPPM Module - 64th/MCQ Patho L13.pdf | 10 | 0 | 10 | 0 |
| PPPM Module - 64th/MCQ Patho L15.pdf | 14 | 0 | 14 | 0 |
| PPPM Module - 64th/MCQ Patho L16.pdf | 14 | 0 | 14 | 0 |
| PPPM Module - 64th/MCQ Patho L17.pdf | 10 | 0 | 10 | 0 |
| PPPM Module - 64th/MCQ Patho L18.pdf | 6 | 0 | 6 | 0 |
| PPPM Module - 64th/MCQ Patho L19.pdf | 6 | 0 | 6 | 0 |
| PPPM Module - 64th/MCQ Patho L2.pdf | 12 | 0 | 12 | 0 |
| PPPM Module - 64th/MCQ Patho L20.pdf | 12 | 0 | 12 | 0 |
| PPPM Module - 64th/MCQ Patho L3.pdf | 7 | 0 | 7 | 0 |
| PPPM Module - 64th/MCQ Patho L4.pdf | 7 | 0 | 7 | 0 |
| PPPM Module - 64th/MCQ Patho L6.pdf | 6 | 0 | 6 | 0 |
| PPPM Module - 64th/MCQ Patho L7.pdf | 10 | 0 | 10 | 0 |
| PPPM Module - 64th/MCQ Patho L8.pdf | 8 | 0 | 8 | 0 |
| PPPM Module - 64th/MCQ Patho L9.pdf | 11 | 0 | 11 | 0 |
| PPPM Module - 64th/MCQ Patho Lecture 1.pdf | 7 | 0 | 7 | 0 |
| PPPM Module - 64th/MCQ Patho Lecture 11.pdf | 18 | 0 | 18 | 0 |
| PPPM Module - 64th/MCQ Patho Lecture 14.pdf | 6 | 0 | 6 | 0 |
| PPPM Module - 64th/MCQ Patho Lecture 5.pdf | 9 | 0 | 9 | 0 |
| PPPM Module - 64th/MCQ Pharma 25.pdf | 10 | 1894 | 0 | 0 |
| PPPM Module - 64th/MCQ Seminar 1 & 2.pdf | 13 | 2059 | 0 | 0 |
| PPPM Module - 64th/MCQ pharma 1.pdf | 18 | 3062 | 0 | 0 |
| PPPM Module - 64th/MCQ pharma 2_202602101038_23006.pdf | 22 | 4049 | 0 | 0 |
| PPPM Module - 64th/MOST important MCQs (chemotherapy).pdf | 24 | 5997 | 0 | 0 |
| PPPM Module - 64th/MOST important MCQs (pharma 20-25).pdf | 25 | 6527 | 0 | 0 |
| PPPM Module - 64th/Micro - Lec 1 - MCQ.pdf | 5 | 682 | 0 | 0 |
| PPPM Module - 64th/Micro - PPPM 1 2026 PPPM.pdf | 4 | 109 | 0 | 0 |
| PPPM Module - 64th/Micro - PPPM 1 MCQ.pdf | 8 | 337 | 0 | 0 |
| PPPM Module - 64th/Micro 2_PPPM _AG.pdf | 9 | 974 | 0 | 0 |
| PPPM Module - 64th/Micro L1.pdf | 4 | 380 | 0 | 0 |
| PPPM Module - 64th/Micro L10.pdf | 12 | 1455 | 0 | 0 |
| PPPM Module - 64th/Micro L11.pdf | 11 | 1321 | 0 | 0 |
| PPPM Module - 64th/Micro L12.pdf | 10 | 1006 | 0 | 0 |
| PPPM Module - 64th/Micro L13  (1).pdf | 6 | 918 | 0 | 0 |
| PPPM Module - 64th/Micro L14.pdf | 9 | 925 | 0 | 0 |
| PPPM Module - 64th/Micro L15.pdf | 6 | 977 | 0 | 0 |
| PPPM Module - 64th/Micro L16.pdf | 7 | 1077 | 0 | 0 |
| PPPM Module - 64th/Micro L2.pdf | 8 | 946 | 0 | 0 |
| PPPM Module - 64th/Micro L3.pdf | 10 | 1054 | 0 | 0 |
| PPPM Module - 64th/Micro L4.pdf | 8 | 1040 | 0 | 0 |
| PPPM Module - 64th/Micro L5.pdf | 7 | 1020 | 0 | 0 |
| PPPM Module - 64th/Micro L6, Complement system and cytokines ppt.pdf | 32 | 1230 | 4 | 0 |
| PPPM Module - 64th/Micro L6, Complement system and cytokines; lecture note.pdf | 5 | 752 | 0 | 0 |
| PPPM Module - 64th/Micro L6.pdf | 6 | 732 | 0 | 0 |
| PPPM Module - 64th/Micro L7, Immune modulation; lecture note.pdf | 5 | 634 | 0 | 0 |
| PPPM Module - 64th/Micro L7, Immune modulation; ppt.pdf | 30 | 1038 | 0 | 0 |
| PPPM Module - 64th/Micro L7.pdf | 4 | 605 | 0 | 0 |
| PPPM Module - 64th/Micro L8, General bacteriology (part 1); Lecture note.pdf | 6 | 908 | 0 | 0 |
| PPPM Module - 64th/Micro L8, General bacteriology (part 1); PPT.pdf | 33 | 1132 | 2 | 0 |
| PPPM Module - 64th/Micro L8.pdf | 7 | 898 | 0 | 0 |
| PPPM Module - 64th/Micro L9.pdf | 9 | 1408 | 0 | 0 |
| PPPM Module - 64th/Micro Summery 2026.pdf | 24 | 3770 | 0 | 0 |
| PPPM Module - 64th/Micro.Lec6.Ai generated MCQ.pdf | 3 | 298 | 0 | 0 |
| PPPM Module - 64th/Microbilogy L11,  Gene transfer, cloning, molecular; ppt.pdf | 48 | 1523 | 7 | 0 |
| PPPM Module - 64th/Microbiology L12; Antimicrobial resistance lecture note.pdf | 13 | 1019 | 0 | 0 |
| PPPM Module - 64th/Microbiology L12; Antimicrobial resistance ppt (1).pdf | 44 | 1653 | 0 | 0 |
| PPPM Module - 64th/Microbiology L13, General virology ppt.pdf | 52 | 1254 | 4 | 0 |
| PPPM Module - 64th/Microbiology L13, General virology; lecture note.pdf | 4 | 832 | 0 | 0 |
| PPPM Module - 64th/Microbiology L14, General mycology ppt.pdf | 43 | 1480 | 3 | 0 |
| PPPM Module - 64th/Microbiology L14, General mycology; lecture note.pdf | 9 | 958 | 0 | 0 |
| PPPM Module - 64th/Microbiology L15; Tumor immunology ppt.pdf | 30 | 1267 | 0 | 0 |
| PPPM Module - 64th/Microbiology L15; Tumor immunology-lecture note.pdf | 5 | 1112 | 0 | 0 |
| PPPM Module - 64th/Microbiology L16; Overview of vaccinations.pdf | 32 | 1284 | 0 | 0 |
| PPPM Module - 64th/Microbiology L9, General Bacteriology (part 2); PPT.pdf | 36 | 1420 | 2 | 0 |
| PPPM Module - 64th/Microbiology L9, General Bacteriology (part 2); lecture note.pdf | 6 | 1106 | 0 | 0 |
| PPPM Module - 64th/Microbiology_L10_Bacterial_Chromosomal_and_Extrachromosomal_Elements (1).pdf | 50 | 1908 | 2 | 0 |
| PPPM Module - 64th/Microbiology_L10_Bacterial_Chromosomal_and_Extrachromosomal_Elements.pdf | 9 | 1545 | 0 | 0 |
| PPPM Module - 64th/Microbiology_L11,_Gene_transfer,_cloning,_molecular;_lecture_note.pdf | 10 | 1243 | 0 | 0 |
| PPPM Module - 64th/Microbiology_Online_case_General_bacteriology_12_antibiotic_resistance.pdf | 2 | 212 | 0 | 0 |
| PPPM Module - 64th/Most Important MCQs (Autonomic).pdf | 33 | 5341 | 0 | 0 |
| PPPM Module - 64th/NMU Pharma & Patho.pdf | 4 | 522 | 0 | 0 |
| PPPM Module - 64th/Neoplasia online case disscusion.pdf | 1 | 195 | 0 | 0 |
| PPPM Module - 64th/Online case micro.pdf | 3 | 579 | 0 | 0 |
| PPPM Module - 64th/PPPM - Para - MCQ 2026.pdf | 37 | 5643 | 1 | 0 |
| PPPM Module - 64th/PPPM - Para - Written 2026.pdf | 15 | 2901 | 1 | 0 |
| PPPM Module - 64th/PPPM Continuous Book ( MCQ  PART 1  ) .pdf | 128 | 20156 | 0 | 0 |
| PPPM Module - 64th/PPPM Continuous Book ( MCQ ) .pdf | 441 | 69640 | 32 | 0 |
| PPPM Module - 64th/PPPM Continuous Book ( MCQ Part 2 ) .pdf | 312 | 49380 | 32 | 0 |
| PPPM Module - 64th/PPPM Continuous Book ( Summary + Notes ) .pdf | 140 | 24825 | 0 | 0 |
| PPPM Module - 64th/PPPM Exam Bank ( 61, 60, 59,58).pdf | 44 | 7178 | 0 | 0 |
| PPPM Module - 64th/PPPM Final Part 1.pdf | 150 | 25400 | 0 | 0 |
| PPPM Module - 64th/PPPM Final Part 2.pdf | 268 | 45412 | 0 | 0 |
| PPPM Module - 64th/PPPM_AG + Exams.pdf | 209 | 54723 | 0 | 0 |
| PPPM Module - 64th/PPPM_AH + Exams.pdf | 152 | 37983 | 0 | 0 |
| PPPM Module - 64th/PPPM_Cont 62.pdf | 10 | 1674 | 0 | 0 |
| PPPM Module - 64th/PPPM_Cont 63.pdf | 10 | 1826 | 0 | 0 |
| PPPM Module - 64th/PPPM_Final 62 MCQ.pdf | 5 | 868 | 0 | 0 |
| PPPM Module - 64th/PPPM_Final 63.pdf | 15 | 2393 | 0 | 0 |
| PPPM Module - 64th/PPPM_Formative 62 & 63.pdf | 7 | 1066 | 0 | 0 |
| PPPM Module - 64th/PPPM_MM + Exams.pdf | 262 | 72615 | 0 | 0 |
| PPPM Module - 64th/PPPM_Summer 62 MCQ.pdf | 4 | 735 | 0 | 0 |
| PPPM Module - 64th/PPPM_Summer 63.pdf | 15 | 2313 | 0 | 0 |
| PPPM Module - 64th/Para - Lec 1 MCQ.pdf | 7 | 989 | 0 | 0 |
| PPPM Module - 64th/Para - Lec 2 MCQ.pdf | 9 | 1250 | 0 | 0 |
| PPPM Module - 64th/Para - Summery 2026.pdf | 16 | 2605 | 0 | 0 |
| PPPM Module - 64th/Para L1 General concepts of med Parasitology-Lecture.pdf | 41 | 1192 | 0 | 0 |
| PPPM Module - 64th/Para L1 Lecture note, General concepts of med Parasitology.pdf | 6 | 881 | 0 | 0 |
| PPPM Module - 64th/Para L1.pdf | 8 | 853 | 1 | 0 |
| PPPM Module - 64th/Para L10 Immunity against parasitic infections.pdf | 34 | 1192 | 1 | 0 |
| PPPM Module - 64th/Para L10 Team 64  (1).pdf | 5 | 711 | 0 | 0 |
| PPPM Module - 64th/Para L10 handout Immunity_against_Parasitic_Infections.pdf | 8 | 1046 | 0 | 0 |
| PPPM Module - 64th/Para L2 Introduction to Trematoda lecture.pdf | 35 | 713 | 1 | 0 |
| PPPM Module - 64th/Para L2 Lecture note, Trematoda handout.pdf | 7 | 763 | 0 | 0 |
| PPPM Module - 64th/Para L2 Team 64.pdf | 6 | 627 | 0 | 0 |
| PPPM Module - 64th/Para L3 Introduction to Cestodes.pdf | 48 | 1787 | 0 | 0 |
| PPPM Module - 64th/Para L3 Lecture note Introduction to Cestodes handout.pdf | 10 | 1425 | 0 | 0 |
| PPPM Module - 64th/Para L3 Team 64.pdf | 11 | 1358 | 0 | 0 |
| PPPM Module - 64th/Para L4 handout Introduction to nematodes.pdf | 7 | 779 | 0 | 0 |
| PPPM Module - 64th/Para L4 introduction to Nematodes.pdf | 44 | 844 | 0 | 0 |
| PPPM Module - 64th/Para L4.pdf | 5 | 672 | 0 | 0 |
| PPPM Module - 64th/Para L5 handout introduction to Protozoa.pdf | 6 | 656 | 0 | 0 |
| PPPM Module - 64th/Para L5 introduction to protozoa lecture.pdf | 45 | 761 | 0 | 0 |
| PPPM Module - 64th/Para L5.pdf | 8 | 700 | 0 | 0 |
| PPPM Module - 64th/Para L6 introduction to arthropods 1.pdf | 45 | 1323 | 1 | 0 |
| PPPM Module - 64th/Para L6 lecture note introduction to arthropods 1.pdf | 10 | 1160 | 0 | 0 |
| PPPM Module - 64th/Para L6.pdf | 10 | 1133 | 0 | 0 |
| PPPM Module - 64th/Para L7 handout introduction to Arthopods II.pdf | 8 | 1670 | 0 | 0 |
| PPPM Module - 64th/Para L7 introduction to Arthropods II-Arachnida.pdf | 41 | 1902 | 1 | 0 |
| PPPM Module - 64th/Para L7.pdf | 12 | 1821 | 0 | 0 |
| PPPM Module - 64th/Para L8 Myiasis lecture.pdf | 33 | 1172 | 7 | 0 |
| PPPM Module - 64th/Para L8 Team 64.pdf | 10 | 1139 | 0 | 0 |
| PPPM Module - 64th/Para L8 handout myiasis.pdf | 5 | 1088 | 0 | 0 |
| PPPM Module - 64th/Para L9 Team 64.pdf | 3 | 492 | 0 | 0 |
| PPPM Module - 64th/Para L9 Zoonosis lecture.pdf | 22 | 725 | 0 | 0 |
| PPPM Module - 64th/Para L9 handout Zoonosis_.pdf | 4 | 457 | 0 | 0 |
| PPPM Module - 64th/Para MCQ Continuous 2026.pdf | 48 | 6577 | 0 | 0 |
| PPPM Module - 64th/Para Qs.pdf | 36 | 0 | 36 | 0 |
| PPPM Module - 64th/Para online case, Myiasis.pdf | 13 | 447 | 0 | 0 |
| PPPM Module - 64th/Patho 13.pdf | 9 | 0 | 9 | 0 |
| PPPM Module - 64th/Patho 14.pdf | 6 | 0 | 6 | 0 |
| PPPM Module - 64th/Patho Collections (1-14).pdf | 15 | 0 | 15 | 0 |
| PPPM Module - 64th/Patho Important MCQ (15-20).pdf | 70 | 0 | 70 | 0 |
| PPPM Module - 64th/Patho Important MCQ Divided (1-14).pdf | 71 | 0 | 71 | 0 |
| PPPM Module - 64th/Patho Important MCQ Divided (1-9).pdf | 43 | 0 | 43 | 0 |
| PPPM Module - 64th/Patho L1.pdf | 7 | 812 | 0 | 0 |
| PPPM Module - 64th/Patho L10 (Telegram 2).pdf | 8 | 818 | 0 | 0 |
| PPPM Module - 64th/Patho L10.pdf | 10 | 0 | 10 | 0 |
| PPPM Module - 64th/Patho L11 (Telegram 2).pdf | 12 | 1219 | 0 | 0 |
| PPPM Module - 64th/Patho L11.pdf | 13 | 0 | 13 | 0 |
| PPPM Module - 64th/Patho L12 (Telegram 2).pdf | 11 | 1000 | 0 | 0 |
| PPPM Module - 64th/Patho L12.pdf | 15 | 0 | 15 | 0 |
| PPPM Module - 64th/Patho L13 (Telegram 2).pdf | 12 | 1010 | 0 | 0 |
| PPPM Module - 64th/Patho L13.pdf | 11 | 0 | 11 | 0 |
| PPPM Module - 64th/Patho L14.pdf | 8 | 762 | 0 | 0 |
| PPPM Module - 64th/Patho L15 (Telegram 2).pdf | 15 | 1679 | 0 | 0 |
| PPPM Module - 64th/Patho L15.pdf | 14 | 0 | 14 | 0 |
| PPPM Module - 64th/Patho L16.pdf | 10 | 0 | 10 | 0 |
| PPPM Module - 64th/Patho L17 (Telegram 2).pdf | 5 | 826 | 0 | 0 |
| PPPM Module - 64th/Patho L17.pdf | 9 | 0 | 9 | 0 |
| PPPM Module - 64th/Patho L18 (Telegram 2).pdf | 9 | 748 | 0 | 0 |
| PPPM Module - 64th/Patho L18.pdf | 9 | 0 | 9 | 0 |
| PPPM Module - 64th/Patho L19 (Telegram 2).pdf | 7 | 590 | 0 | 0 |
| PPPM Module - 64th/Patho L19.pdf | 8 | 0 | 8 | 0 |
| PPPM Module - 64th/Patho L2 (1).pdf | 9 | 1038 | 0 | 0 |
| PPPM Module - 64th/Patho L2 (2).pdf | 10 | 1009 | 0 | 0 |
| PPPM Module - 64th/Patho L2.pdf | 11 | 0 | 11 | 0 |
| PPPM Module - 64th/Patho L20.pdf | 10 | 780 | 0 | 0 |
| PPPM Module - 64th/Patho L3 (1).pdf | 6 | 554 | 0 | 0 |
| PPPM Module - 64th/Patho L3.pdf | 8 | 0 | 8 | 0 |
| PPPM Module - 64th/Patho L4 (1).pdf | 7 | 496 | 0 | 0 |
| PPPM Module - 64th/Patho L4.pdf | 10 | 0 | 10 | 0 |
| PPPM Module - 64th/Patho L5.pdf | 8 | 776 | 0 | 0 |
| PPPM Module - 64th/Patho L6 (Telegram 2).pdf | 7 | 669 | 0 | 0 |
| PPPM Module - 64th/Patho L6.pdf | 7 | 0 | 7 | 0 |
| PPPM Module - 64th/Patho L7 (Telegram 2).pdf | 12 | 1072 | 0 | 0 |
| PPPM Module - 64th/Patho L7.pdf | 13 | 0 | 13 | 0 |
| PPPM Module - 64th/Patho L8 (Telegram 2).pdf | 9 | 829 | 0 | 0 |
| PPPM Module - 64th/Patho L8.pdf | 7 | 0 | 7 | 0 |
| PPPM Module - 64th/Patho L9 (Telegram 2).pdf | 8 | 760 | 0 | 0 |
| PPPM Module - 64th/Patho L9.pdf | 8 | 0 | 8 | 0 |
| PPPM Module - 64th/Patho Lecture (1) - Dr. ElEssawy .pdf | 7 | 761 | 0 | 0 |
| PPPM Module - 64th/Patho Lecture (1) MCQs - Dr. ElEssawy .pdf | 7 | 907 | 0 | 0 |
| PPPM Module - 64th/Patho Lecture 1.pdf | 8 | 0 | 8 | 0 |
| PPPM Module - 64th/Patho Lecture 14.pdf | 8 | 0 | 8 | 0 |
| PPPM Module - 64th/Patho Lecture 5.pdf | 9 | 0 | 9 | 0 |
| PPPM Module - 64th/Patho MCQ Formative & Exams (1-14).pdf | 57 | 0 | 57 | 0 |
| PPPM Module - 64th/Patho MCQ Formative & Exams (1-9).pdf | 34 | 0 | 34 | 0 |
| PPPM Module - 64th/Patho Online Cases (Cont).pdf | 3 | 0 | 3 | 0 |
| PPPM Module - 64th/Patho PPPM Online Cases (2).pdf | 7 | 0 | 7 | 0 |
| PPPM Module - 64th/Patho Summary (1-14).pdf | 20 | 0 | 20 | 0 |
| PPPM Module - 64th/Patho Summary + Collections (1-9).pdf | 20 | 0 | 20 | 0 |
| PPPM Module - 64th/Patho Summary + Collections (15-20).pdf | 13 | 0 | 13 | 0 |
| PPPM Module - 64th/Patho Written (Combined).pdf | 73 | 0 | 73 | 0 |
| PPPM Module - 64th/Patho lec11sem2.pdf | 12 | 0 | 12 | 0 |
| PPPM Module - 64th/Patho lec12sem2.pdf | 10 | 0 | 10 | 0 |
| PPPM Module - 64th/Pathology L10 Infection lecture note.pdf | 6 | 699 | 0 | 0 |
| PPPM Module - 64th/Pathology L10 infection ppt (2).pdf | 34 | 949 | 3 | 0 |
| PPPM Module - 64th/Pathology L11 Examples of infection ppt.pdf | 42 | 1392 | 5 | 0 |
| PPPM Module - 64th/Pathology L11 Examples of infection-lecture note.pdf | 4 | 1012 | 0 | 0 |
| PPPM Module - 64th/Pathology L12 congestion edema lecture note.pdf | 8 | 916 | 0 | 0 |
| PPPM Module - 64th/Pathology L13 thrombosis and embolism lecture notes.pdf | 5 | 949 | 0 | 0 |
| PPPM Module - 64th/Pathology L13 thrombosis and embolism ppt.pdf | 37 | 1147 | 9 | 0 |
| PPPM Module - 64th/Pathology L14 Ischemia, infarction, gangrene lecture notes.pdf | 5 | 651 | 0 | 0 |
| PPPM Module - 64th/Pathology L14 ischemia infarction gangrene ppt.pdf | 43 | 1030 | 7 | 0 |
| PPPM Module - 64th/Pathology L15  disorders of cell growth ppt.pdf | 75 | 1742 | 10 | 0 |
| PPPM Module - 64th/Pathology L15 disorders of cell growth lecture note.pdf | 17 | 1565 | 0 | 0 |
| PPPM Module - 64th/Pathology L16  neoplasia (basic concepts) lecture note.pdf | 7 | 1023 | 0 | 0 |
| PPPM Module - 64th/Pathology L16 neoplasia (basic concepts) ppt.pdf | 46 | 1068 | 10 | 0 |
| PPPM Module - 64th/Pathology L17 Etiology of Cancer lecture note.pdf | 11 | 1040 | 0 | 0 |
| PPPM Module - 64th/Pathology L17 Etiology of Cancer ppt.pdf | 35 | 1363 | 1 | 0 |
| PPPM Module - 64th/Pathology L18 Carcinogenesis lecture note.pdf | 7 | 688 | 0 | 0 |
| PPPM Module - 64th/Pathology L18 Carcinogenesis ppt.pdf | 36 | 1428 | 2 | 0 |
| PPPM Module - 64th/Pathology L19 Tumor host interaction lecture note.pdf | 3 | 478 | 0 | 0 |
| PPPM Module - 64th/Pathology L19 Tumor host interaction ppt.pdf | 37 | 767 | 1 | 0 |
| PPPM Module - 64th/Pathology L20 Morphology of tumors lecture note.pdf | 6 | 695 | 0 | 0 |
| PPPM Module - 64th/Pathology L20 Morphology of tumors ppt.pdf | 60 | 1036 | 22 | 0 |
| PPPM Module - 64th/Phamra 25.pdf | 15 | 1563 | 0 | 0 |
| PPPM Module - 64th/Pharma 1 (new).pdf | 10 | 991 | 0 | 0 |
| PPPM Module - 64th/Pharma 2-scan.pdf | 9 | 0 | 9 | 0 |
| PPPM Module - 64th/Pharma L1 PAGE.pdf | 1 | 73 | 0 | 0 |
| PPPM Module - 64th/Pharma L1 UPDATED.pdf | 9 | 922 | 0 | 0 |
| PPPM Module - 64th/Pharma L1 drug receptor dynamics.pdf | 23 | 900 | 5 | 0 |
| PPPM Module - 64th/Pharma L10 Sympatholytics part 1.pdf | 20 | 456 | 0 | 0 |
| PPPM Module - 64th/Pharma L10,11 Handout sympatholytics.pdf | 6 | 617 | 0 | 0 |
| PPPM Module - 64th/Pharma L10.pdf | 5 | 377 | 0 | 0 |
| PPPM Module - 64th/Pharma L11 Sympatholytics - part 2.pdf | 20 | 642 | 0 | 0 |
| PPPM Module - 64th/Pharma L11.pdf | 3 | 370 | 0 | 0 |
| PPPM Module - 64th/Pharma L12 Parasympathetic I.pdf | 28 | 522 | 10 | 0 |
| PPPM Module - 64th/Pharma L12.pdf | 9 | 873 | 0 | 0 |
| PPPM Module - 64th/Pharma L13 Parasympathetic II.pdf | 30 | 800 | 6 | 0 |
| PPPM Module - 64th/Pharma L13.pdf | 6 | 435 | 0 | 0 |
| PPPM Module - 64th/Pharma L14 Parasympathetic III.pdf | 23 | 699 | 2 | 0 |
| PPPM Module - 64th/Pharma L14.pdf | 6 | 551 | 0 | 0 |
| PPPM Module - 64th/Pharma L15 Introduction to Antibiotics.pdf | 21 | 880 | 2 | 0 |
| PPPM Module - 64th/Pharma L16 cell wall inhibitors Antibiotics part 1.pdf | 30 | 1124 | 0 | 0 |
| PPPM Module - 64th/Pharma L18 antibacterial 4 antibiotics part 3.pdf | 21 | 657 | 2 | 0 |
| PPPM Module - 64th/Pharma L19 Anti-tuberculosis treatment.pdf | 33 | 1081 | 1 | 0 |
| PPPM Module - 64th/Pharma L19.pdf | 11 | 1114 | 0 | 0 |
| PPPM Module - 64th/Pharma L20 Autacoids I histamine.pdf | 23 | 385 | 6 | 0 |
| PPPM Module - 64th/Pharma L20 handout Autacoids I.. Histamine.pdf | 4 | 462 | 0 | 0 |
| PPPM Module - 64th/Pharma L20.pdf | 5 | 517 | 0 | 0 |
| PPPM Module - 64th/Pharma L21 Autacoids II Prostaglandins.pdf | 24 | 379 | 8 | 0 |
| PPPM Module - 64th/Pharma L21 handout Autacoids II.. PGs.pdf | 3 | 394 | 0 | 0 |
| PPPM Module - 64th/Pharma L21.pdf | 6 | 503 | 0 | 0 |
| PPPM Module - 64th/Pharma L22 glucocorticoid pharmacology.pdf | 24 | 1368 | 0 | 0 |
| PPPM Module - 64th/Pharma L22 handout glucocorticoid pharmacology.pdf | 9 | 1089 | 0 | 0 |
| PPPM Module - 64th/Pharma L22.pdf | 11 | 1172 | 0 | 0 |
| PPPM Module - 64th/Pharma L23 antiviral drugs (1).pdf | 42 | 917 | 15 | 0 |
| PPPM Module - 64th/Pharma L23 handout antiviral drugs.pdf | 4 | 478 | 1 | 0 |
| PPPM Module - 64th/Pharma L23.pdf | 15 | 1336 | 0 | 0 |
| PPPM Module - 64th/Pharma L24 antifungal drug.pdf | 39 | 1325 | 5 | 0 |
| PPPM Module - 64th/Pharma L24 handout for antifungal drugs.pdf | 2 | 265 | 0 | 0 |
| PPPM Module - 64th/Pharma L24.pdf | 7 | 1021 | 0 | 0 |
| PPPM Module - 64th/Pharma L25 Principles of drug interactions.pdf | 42 | 2055 | 1 | 0 |
| PPPM Module - 64th/Pharma L25.pdf | 9 | 1626 | 0 | 0 |
| PPPM Module - 64th/Pharma L3 Dose-Response Curves.pdf | 32 | 1547 | 1 | 0 |
| PPPM Module - 64th/Pharma L3.pdf | 12 | 1531 | 0 | 0 |
| PPPM Module - 64th/Pharma L4-Genetics_Interactions_and_Drug_Response.pdf | 21 | 21 | 19 | 0 |
| PPPM Module - 64th/Pharma L4.pdf | 13 | 976 | 0 | 0 |
| PPPM Module - 64th/Pharma L5 Pharmacokintics I (Absorption, Distribution).pdf | 45 | 2555 | 0 | 0 |
| PPPM Module - 64th/Pharma L5.pdf | 11 | 1565 | 0 | 0 |
| PPPM Module - 64th/Pharma L6 Pharmacokintics II (Metabolism).pdf | 21 | 1146 | 0 | 0 |
| PPPM Module - 64th/Pharma L6.pdf | 6 | 763 | 0 | 0 |
| PPPM Module - 64th/Pharma L7 Pharmacokintics III (Excretion, elimination).pdf | 33 | 1856 | 1 | 0 |
| PPPM Module - 64th/Pharma L7.pdf | 10 | 1116 | 0 | 0 |
| PPPM Module - 64th/Pharma L8 Sympathomimetics part 1.pdf | 26 | 759 | 0 | 0 |
| PPPM Module - 64th/Pharma L8,9 Handout sympathomimetic.pdf | 12 | 1222 | 0 | 0 |
| PPPM Module - 64th/Pharma L8.pdf | 7 | 822 | 0 | 0 |
| PPPM Module - 64th/Pharma L9 Sympathomimetics part2.pdf | 20 | 681 | 0 | 0 |
| PPPM Module - 64th/Pharma L9.pdf | 5 | 423 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 12.pdf | 8 | 834 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 13+14.pdf | 10 | 1359 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 15.pdf | 9 | 999 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 16.pdf | 10 | 1078 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 17.pdf | 9 | 1082 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 18.pdf | 6 | 612 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 19.pdf | 13 | 1343 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 2- agonist and antagonist.pdf | 17 | 584 | 4 | 0 |
| PPPM Module - 64th/Pharma Lec 20.pdf | 6 | 676 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 3.pdf | 12 | 1488 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 4.pdf | 12 | 1596 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 5.pdf | 13 | 2193 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 6.pdf | 9 | 1074 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 7.pdf | 8 | 1354 | 0 | 0 |
| PPPM Module - 64th/Pharma Lec 8+9+10+11.pdf | 15 | 2120 | 0 | 0 |
| PPPM Module - 64th/Pharma Lecture note pharmacoKinetics.pdf | 16 | 4715 | 0 | 0 |
| PPPM Module - 64th/Pharma P3.pdf | 11 | 1812 | 0 | 0 |
| PPPM Module - 64th/Pharma practical, Autonomic cases Discussion.pdf | 20 | 805 | 0 | 0 |
| PPPM Module - 64th/Pharma_L17_Bacterial_protein_synthesis_inhibitors_Antibiotics_part.pdf | 30 | 1129 | 2 | 0 |
| PPPM Module - 64th/Pharma_practical_seminar_case_dissusion_on_general_pharmacology.pdf | 23 | 1054 | 0 | 0 |
| PPPM Module - 64th/Revision 1.pdf | 6 | 714 | 0 | 0 |
| PPPM Module - 64th/Sem_2,_CBL_1_Student_version_1223e965471563158071dd589f5734fe.pdf | 3 | 550 | 0 | 0 |
| PPPM Module - 64th/Seminar 2 (autonomic).pdf | 10 | 1374 | 0 | 0 |
| PPPM Module - 64th/Seminar pharma .pdf | 14 | 1644 | 0 | 0 |
| PPPM Module - 64th/Summary pharma 1 & 2 ..pdf | 9 | 902 | 0 | 0 |
| PPPM Module - 64th/Summary pharma 15-19 (new).pdf | 21 | 2184 | 0 | 0 |
| PPPM Module - 64th/Summary pharma 15-19 (new)_260316_234639.pdf | 21 | 2184 | 0 | 0 |
| PPPM Module - 64th/Summary pharma 3 , 4..pdf | 10 | 1134 | 0 | 0 |
| PPPM Module - 64th/Virology AE.PDF | 12 | 36 | 0 | 0 |
| PPPM Module - 64th/Written 1 micro.pdf | 3 | 400 | 0 | 0 |
| PPPM Module - 64th/Written 1 para.pdf | 3 | 574 | 0 | 0 |
| PPPM Module - 64th/Written 2 para.pdf | 4 | 798 | 0 | 0 |
| PPPM Module - 64th/Written 3 para.pdf | 4 | 757 | 0 | 0 |
| PPPM Module - 64th/Wrtten - PPPM - Micro - 2026.pdf | 27 | 4997 | 1 | 0 |
| PPPM Module - 64th/__تجميعات_.pdf | 7 | 1776 | 0 | 0 |
| PPPM Module - 64th/_اختصارات وتجميعات.pdf | 16 | 2573 | 0 | 0 |
| PPPM Module - 64th/_تسلسل الاحداث.pdf | 4 | 484 | 0 | 0 |
| PPPM Module - 64th/cbl.pdf | 4 | 419 | 1 | 0 |
| PPPM Module - 64th/mcq 11.pdf | 8 | 1004 | 1 | 0 |
| PPPM Module - 64th/mcq 7.pdf | 7 | 914 | 1 | 0 |
| PPPM Module - 64th/micro 10.pdf | 11 | 1724 | 0 | 0 |
| PPPM Module - 64th/micro 11.pdf | 8 | 1070 | 0 | 0 |
| PPPM Module - 64th/micro 12.pdf | 10 | 1157 | 0 | 0 |
| PPPM Module - 64th/micro 13.pdf | 7 | 947 | 0 | 0 |
| PPPM Module - 64th/micro 14.pdf | 8 | 1013 | 0 | 0 |
| PPPM Module - 64th/micro 15.pdf | 7 | 1025 | 0 | 0 |
| PPPM Module - 64th/micro 2 & 3.pdf | 20 | 2844 | 0 | 0 |
| PPPM Module - 64th/micro 9.pdf | 11 | 1434 | 0 | 0 |
| PPPM Module - 64th/most important MCQs (general + seminar).pdf | 57 | 11372 | 0 | 0 |
| PPPM Module - 64th/notes seminar ..pdf | 4 | 700 | 0 | 0 |
| PPPM Module - 64th/online case discussion  (Cell injury).pdf | 1 | 143 | 0 | 0 |
| PPPM Module - 64th/online case micro pppm.pdf | 4 | 538 | 0 | 0 |
| PPPM Module - 64th/para - PPPM 1 mcq.pdf | 8 | 341 | 0 | 0 |
| PPPM Module - 64th/para 1 2026 PPPM.pdf | 8 | 179 | 0 | 0 |
| PPPM Module - 64th/patho L16 (1).pdf | 9 | 912 | 0 | 0 |
| PPPM Module - 64th/patho lech10 sem2.pdf | 8 | 0 | 8 | 0 |
| PPPM Module - 64th/pathology L12 congestin edema ppt.pdf | 53 | 1110 | 5 | 0 |
| PPPM Module - 64th/pathology circulatory online case discussion.pdf | 1 | 278 | 0 | 0 |
| PPPM Module - 64th/pathology online case disscusion (Inflammation) (1).pdf | 1 | 200 | 0 | 0 |
| PPPM Module - 64th/pdf 21 Pharma Scan .. Dr.Sherif.pdf | 5 | 0 | 5 | 0 |
| PPPM Module - 64th/pdf 4 Pharma Scan.pdf | 11 | 0 | 11 | 0 |
| PPPM Module - 64th/pdf 5 Pharma Scan.pdf | 13 | 0 | 13 | 0 |
| PPPM Module - 64th/pdf 6 Pharma Scan.pdf | 9 | 0 | 9 | 0 |
| PPPM Module - 64th/pdf 7 Pharma Scan.pdf | 8 | 0 | 8 | 0 |
| PPPM Module - 64th/pdf 8 9 10 11 Pharma Scan.pdf | 14 | 0 | 14 | 0 |
| PPPM Module - 64th/pharma mcq 1-19.pdf | 158 | 29699 | 0 | 0 |
| PPPM Module - 64th/pppm_checklist-1.pdf | 6 | 519 | 0 | 0 |
| PPPM Module - 64th/seminar 1 (general) Dr.Sherif.pdf | 11 | 1743 | 0 | 0 |
| PPPM Module - 64th/summary pharma 12-14 .pdf | 6 | 751 | 0 | 0 |
| PPPM Module - 64th/summary pharma 20-25.pdf | 29 | 2909 | 0 | 0 |
| PPPM Module - 64th/summary pharma 5-7 (new).pdf | 17 | 2326 | 0 | 0 |
| PPPM Module - 64th/summary pharma 8-11 ...pdf | 9 | 1035 | 0 | 0 |
| PPPM Module - 64th/written pharma 1.pdf | 3 | 375 | 0 | 0 |
| PPPM Module - 64th/written pharma 2.pdf | 3 | 465 | 0 | 0 |
| PPPM Module - 64th/تفريغي ميكرو 6.pdf | 2 | 0 | 2 | 0 |
| PPPM Module - 64th/تفريغي ميكرو 8.pdf | 2 | 0 | 2 | 0 |
| PPPM Module - 64th/تقريغي ميكرو 7.pdf | 3 | 0 | 3 | 0 |
| PPPM Module - 64th/٤١.pdf | 11 | 0 | 11 | 0 |
