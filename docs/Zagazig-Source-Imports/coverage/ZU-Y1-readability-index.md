# Zagazig University Year 1 -- S1b readability index

Per-PDF text-layer survey via `node scripts/content/pagetext.mjs index <dir>`, one run per top-level folder (10 runs -- whole-tree indexing has been seen to exit 1 silently on other lanes). PDF only -- `pptx`/`ppt` files (27 total, see `manifest/y1-sources.md`) are not probed by this tool and are not counted below.

## Summary

| Folder | Corpus | PDFs | Pages | Words | Garbled pages | OCR'd pages |
|---|---|--:|--:|--:|--:|--:|
| 00 Administration | faculty-admin | 8 | 212 | 42361 | 11 | 48 |
| Year 1 (organized tree) | year1 | 13 | 229 | 20774 | 10 | 0 |
| Medical Terminology | staging | 4 | 110 | 6349 | 28 | 0 |
| Structure and Function | staging | 98 | 2087 | 228518 | 321 | 0 |
| Musculoskeletal | staging | 161 | 4032 | 217716 | 1594 | 0 |
| Professional Practice I | staging | 37 | 539 | 87003 | 20 | 0 |
| Cardiopulmonary | staging | 147 | 3985 | 375295 | 982 | 0 |
| GIT and Nutrition | staging | 116 | 3362 | 307724 | 817 | 0 |
| Professional Practice II | staging | 22 | 361 | 39254 | 21 | 0 |
| Human Rights and Community Issues | staging | 5 | 99 | 21568 | 12 | 0 |
| **Total** | | **611** | **15016** | **1346562** | **3816** | **48** |

3816/15016 pages (25%) came back garbled (0-word / scanned) on first pass -- mostly image-heavy MCQ sheets, OSPE stations and scanned exam papers across all modules, consistent with the pattern seen on other lanes (FOMSCU: "mostly image-heavy anatomy lecture slides"). The bylaw PDF (`Internal Bylaw 2023 - 5+2 Credit-Point Program.pdf`, 48/48 pages garbled) was OCR'd in full this session for `academic/ZU-Y1-modules.md`; no other file has been OCR'd yet -- that is S2 scope once triage is approved, done selectively per `coverage/ZU-Y1-priority-sources.md`.

## Per-file tables

### faculty-admin — 00 Administration/Plans and Mark Distribution

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| Plans and Mark Distribution/Academic Advising Guide 2018-04.pdf | 13 | 3324 | 0 | 0 |
| Plans and Mark Distribution/Academic Advising Guide 2018-09.pdf | 15 | 2535 | 0 | 0 |
| Plans and Mark Distribution/Academic Advising Guide 2025-2026.pdf | 8 | 660 | 0 | 0 |
| Plans and Mark Distribution/Admission and Transfer Rules.pdf | 9 | 0 | 9 | 0 |
| Plans and Mark Distribution/Internal Bylaw 2023 - 5+2 Credit-Point Program.pdf | 48 | 9638 | 0 | 48 |
| Plans and Mark Distribution/Internal Bylaw Attachment 2016 - Encrypted.pdf | 66 | 14340 | 0 | 0 |
| Plans and Mark Distribution/Student Assessment Guide.pdf | 51 | 11864 | 0 | 0 |
| Plans and Mark Distribution/Teaching Strategy 2018 - Traditional Program.pdf | 2 | 0 | 2 | 0 |

### year1 — organized Year 1/ tree (schedules, EOY, promoted module folders)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| 00 Administration/Schedules/Lecture Schedule - Year 1 Level 1 2024-2025.pdf | 7 | 0 | 7 | 0 |
| 00 Administration/Schedules/Timetable - Musculoskeletal 5 Dec 2023.pdf | 9 | 1603 | 0 | 0 |
| 00 Administration/Schedules/Timetable - S1 21 Oct to 7 Dec 2023 - S&F and Professionalism.pdf | 8 | 1983 | 0 | 0 |
| 00 Administration/Schedules/Timetable - Semester 2 Cardiopulmonary.pdf | 9 | 1800 | 1 | 0 |
| 07 EOY/تحديدات فاينال - CPS كتاب القسم.pdf | 9 | 381 | 0 | 0 |
| Medical Terminology/01 University Material/Handout - Medical Terminology Rearranged.pdf | 58 | 4001 | 1 | 0 |
| Medical Terminology/01 University Material/Handout - Principles of Study of Medicine and Medical Terminology MED-102 2023.pdf | 71 | 4070 | 0 | 0 |
| Medical Terminology/03 Questions and QBank/MCQ Revision - Medical Terminology ZNU.pdf | 15 | 1814 | 0 | 0 |
| Professional Practice II/00 Administration/Marks - Practical Anesthesia Airway Management Checklist.pdf | 2 | 410 | 0 | 0 |
| Professional Practice II/00 Administration/Marks - Practical Internal Medicine Checklist 2024.pdf | 6 | 904 | 0 | 0 |
| Professional Practice II/01 University Material/Lecture - Professionalism 1 - Elsharqawi.pdf | 7 | 548 | 0 | 0 |
| Structure and Function/01 University Material/Lecture - Biochemistry - Carbohydrates 2 - Younes.pdf | 12 | 1189 | 1 | 0 |
| Structure and Function/01 University Material/Lecture - Histology 2 - ElNaggar.pdf | 16 | 2071 | 0 | 0 |

### staging — Medical Terminology (ZU-MED-102)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| Fakous Medical Terminology Final 2024.pdf | 2 | 0 | 2 | 0 |
| Medical_terms MCQ.pdf | 61 | 5288 | 4 | 0 |
| Terminology (1) Dr Abdalla Elsamahy 5.pdf | 26 | 10 | 22 | 0 |
| terminology dr. wagih.pdf | 21 | 1051 | 0 | 0 |

### staging — Structure and Function (ZU-MED-103)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| 2 (1).pdf | 17 | 1488 | 3 | 0 |
| 3.pdf | 50 | 6072 | 0 | 0 |
| 4_5841400786667443811_240725_140030.pdf | 6 | 0 | 6 | 0 |
| ANS SUMMARY.pdf | 9 | 959 | 0 | 0 |
| ANS-MCQ (1).pdf | 13 | 1904 | 0 | 0 |
| AUTONOMIC NERVOUS SYSTEM (ANS).pdf | 21 | 2275 | 0 | 0 |
| Azouny MCQS (Z.exam).pdf | 13 | 0 | 13 | 0 |
| Azouny Part 8(Z.doctors).pdf | 12 | 0 | 12 | 0 |
| Azouny part 9 practical (Z.doctors).pdf | 18 | 0 | 18 | 0 |
| BLOOD MCQ.pdf | 5 | 641 | 0 | 0 |
| BLOOD REVISION زتونه النظري.pdf | 3 | 1117 | 0 | 0 |
| BODY FLUIDS.pdf | 7 | 1030 | 0 | 0 |
| Blood 3 Elsamahy .pdf | 22 | 1448 | 0 | 0 |
| Blood Revision - 1 (DR ABDALLA ELSAMAHY) 2.pdf | 13 | 2402 | 0 | 0 |
| Blood-tissue 2023 (1).pdf | 15 | 2439 | 0 | 0 |
| Blood2_Elsamahy.pdf | 10 | 1200 | 0 | 0 |
| CELL MEMBRANE new .pdf | 17 | 1114 | 0 | 0 |
| CT WRITTEN REVISION الزتونه.pdf | 4 | 2013 | 0 | 0 |
| CT updated (1).pdf | 20 | 2384 | 0 | 0 |
| Cytoplasmic inclusion & Chromosomal anomalies (1).pdf | 12 | 1144 | 0 | 0 |
| Dr. Basel Connective Tissue MCQs.pdf | 10 | 1382 | 1 | 0 |
| Dr. Basel Cytogenetics MCQs-1.pdf | 4 | 985 | 0 | 0 |
| Dr. Basel Sherif Blood MCQs.pdf | 14 | 1871 | 1 | 0 |
| Dr. Basel Sherif Blood.pdf | 14 | 2265 | 1 | 0 |
| Dr. Basel Sherif Connective Tissue.pdf | 17 | 2839 | 1 | 0 |
| Dr. Basel Sherif Cytogenetics.pdf | 22 | 3415 | 1 | 0 |
| Dr. Basel Sherif Cytology.pdf | 29 | 4123 | 1 | 0 |
| Dr. Basel Sherif Epithelium MCQs.pdf | 7 | 982 | 1 | 0 |
| Dr. Basel Sherif Epithelium.pdf | 19 | 2450 | 1 | 0 |
| Dr. Basel Sherif MCQs Cytology.pdf | 12 | 2266 | 1 | 0 |
| Epithelium UPdated Dr.Ammar (1).pdf | 14 | 1894 | 0 | 0 |
| Eslam Gamal التانية اناتومي.pdf | 23 | 1561 | 0 | 0 |
| Final S&F 2024 .pdf | 5 | 0 | 5 | 0 |
| Hand out Module 1 st year-signed.pdf | 373 | 58936 | 0 | 0 |
| Joints Final.pdf | 11 | 1309 | 0 | 0 |
| MCQ 1.pdf | 16 | 2538 | 0 | 0 |
| MCQ CELL MEMBRANE 1.pdf | 15 | 2571 | 0 | 0 |
| Mcq اولي wagih .pdf | 20 | 2499 | 0 | 0 |
| Midterm MCQ -1.pdf | 9 | 1233 | 0 | 0 |
| MyFile (3) (1).pdf | 11 | 0 | 11 | 0 |
| Nucleic Acid ابراهيم الحسيني  .pdf | 12 | 1229 | 0 | 0 |
| PART (5).-1.pdf | 19 | 0 | 19 | 0 |
| Part 4 (1st Year ).pdf | 19 | 0 | 19 | 0 |
| Partical part (10)  yhaoo net.pdf | 8 | 0 | 8 | 0 |
| Practical Part (12) 1 nd year (Yhaoonet).pdf | 17 | 0 | 17 | 0 |
| Previous Exams Biochemistry Questions in S&F 2024.pdf | 38 | 4359 | 0 | 0 |
| Previous Exams Histology Questions in S&F 2024.pdf | 25 | 3079 | 0 | 0 |
| Previous exams Physio 2024.pdf | 43 | 5396 | 0 | 0 |
| Questions (1).pdf | 32 | 3757 | 2 | 0 |
| S&F anatomy part 2.pdf | 10 | 577 | 0 | 0 |
| S&f Practical 2 .pdf | 24 | 129 | 0 | 0 |
| SF PRACTICAL COURSE.pdf | 162 | 11266 | 0 | 0 |
| Skeleton.pdf | 9 | 891 | 0 | 0 |
| TRANSPORT REVISION.pdf | 7 | 1107 | 1 | 0 |
| The Cell 2023 updated (1).pdf | 21 | 2674 | 0 | 0 |
| The Lower Limb.pdf | 9 | 379 | 0 | 0 |
| Upper Limb Practical.pdf | 11 | 575 | 0 | 0 |
| Vitamins previous Exams بدون حل.pdf | 17 | 0 | 17 | 0 |
| __اجوبه body fluid & transport _بدون  (1).pdf | 9 | 1275 | 0 | 0 |
| __الاوتونوميك الاولي_ (1).pdf | 19 | 2563 | 0 | 0 |
| __امسكيو 1_ (1).pdf | 19 | 4019 | 0 | 0 |
| __ليبيد ابراهيم الحسيني _-1.pdf | 21 | 2244 | 0 | 0 |
| __مذكره الامسكيو بلود_ (1).pdf | 19 | 4174 | 0 | 0 |
| ans 2 (1).pdf | 12 | 2008 | 0 | 0 |
| blood 1 (1).pdf | 30 | 5952 | 1 | 0 |
| blood part 2 nageeb (2).pdf | 20 | 3190 | 0 | 0 |
| blood part 3 (2).pdf | 12 | 1874 | 0 | 0 |
| body fluid & General organization (1).pdf | 16 | 2488 | 0 | 0 |
| cell transport 1.pdf | 19 | 2639 | 0 | 0 |
| examsssss (1).pdf | 11 | 1285 | 0 | 0 |
| generl anatomy 2.pdf | 14 | 1101 | 0 | 0 |
| homeostasis.pdf | 5 | 0 | 5 | 0 |
| mcq of body fluids.pdf | 5 | 317 | 0 | 0 |
| organization.pdf | 4 | 196 | 0 | 0 |
| part 11.pdf | 16 | 0 | 16 | 0 |
| part 6.pdf | 25 | 0 | 25 | 0 |
| part 7.pdf | 27 | 0 | 27 | 0 |
| practical 1.pdf | 21 | 134 | 0 | 0 |
| s&f 1 (dr. wagih).pdf | 17 | 1243 | 0 | 0 |
| s&f summer fakous 2024.pdf | 5 | 0 | 5 | 0 |
| s&f_exam.pdf | 18 | 0 | 18 | 0 |
| اجابات الامتحان.pdf | 4 | 0 | 4 | 0 |
| الزقازيق tbl لمديول s&f.pdf | 4 | 0 | 4 | 0 |
| امتحان tbl مديول s&f فاقوس.pdf | 14 | 0 | 14 | 0 |
| امسكيو (2) ابراهيم الحسيني .pdf | 22 | 2966 | 0 | 0 |
| امسكيو (3) ابراهيم الحسيني.pdf | 23 | 2751 | 1 | 0 |
| امسكيو 1 (1).pdf | 19 | 3542 | 0 | 0 |
| امسكيو body fluid & transport للميد (1).pdf | 9 | 1214 | 0 | 0 |
| انزيم ابراهيم الحسيني .pdf | 17 | 2192 | 0 | 0 |
| بايو ابراهيم الحسيني Mcq_231028_224310.pdf | 40 | 0 | 40 | 0 |
| بروتين ابراهيم الحسيني .pdf | 25 | 3153 | 0 | 0 |
| د. باسل شريف زيادات.pdf | 7 | 1346 | 0 | 0 |
| فسيو القسم blood.pdf | 19 | 2349 | 1 | 0 |
| فيتامين (1) د.ابراهيم الحسيني.pdf | 18 | 2224 | 0 | 0 |
| فيتامين (2) د.ابراهيم الحسيني .pdf | 16 | 1663 | 0 | 0 |
| كربوهيدرات د.ابراهيم الحسيني .pdf | 25 | 2350 | 0 | 0 |
| موليكيولار (1) ابراهيم الحسيني .pdf | 27 | 2837 | 0 | 0 |
| موليكيولار (2) ابراهيم الحسيني .pdf | 19 | 3062 | 0 | 0 |

### staging — Musculoskeletal (ZU-MED-104)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| 1st  role  FAKOS OSPE MSK exam cr 2024-2025.pdf | 21 | 458 | 1 | 0 |
| 4_5814207300017065534.pdf | 8 | 1370 | 0 | 0 |
| A.P  previous exams.pdf | 12 | 0 | 12 | 0 |
| A3 عملي 2.pdf | 6 | 474 | 0 | 0 |
| ANATOMY MCQ.pdf | 17 | 0 | 17 | 0 |
| Arm & Axilla.pdf | 12 | 1441 | 0 | 0 |
| B.V.M.pdf | 12 | 0 | 12 | 0 |
| Back Muscles-1.pdf | 10 | 1096 | 0 | 0 |
| Blood Vessels (1).pdf | 12 | 1976 | 0 | 0 |
| Blood- yahoo.net 01155562633.pdf | 8 | 0 | 8 | 0 |
| Ca homeostasis MCQ .pdf | 1 | 0 | 1 | 0 |
| Ca+ neuron - skin.pdf | 23 | 3039 | 0 | 0 |
| Cartilage A3.pdf | 2 | 724 | 0 | 0 |
| Cartilage.pdf | 5 | 704 | 0 | 0 |
| DOC-20240120-WA0109..pdf | 3 | 392 | 0 | 0 |
| DOC-20240709-WA0016-Copy.pdf | 26 | 2943 | 0 | 0 |
| DOC-20240709-WA0016.pdf | 26 | 2943 | 0 | 0 |
| DOC-20250918-WA0222_250918_220326 (1).pdf | 10 | 0 | 10 | 0 |
| Dr. Basel Bone.pdf | 15 | 2465 | 1 | 0 |
| Dr. Basel Cartilage MCQs.pdf | 6 | 820 | 1 | 0 |
| Dr. Basel Cartilage.pdf | 6 | 913 | 1 | 0 |
| Dr. Basel Muscle MCQs.pdf | 8 | 969 | 1 | 0 |
| Dr. Basel Skeletal Muscle.pdf | 8 | 1130 | 1 | 0 |
| Fakous MSK Final 2024.pdf | 5 | 0 | 5 | 0 |
| Fakous MSK Summer 2024.pdf | 5 | 0 | 5 | 0 |
| Final OSPE (( ZAG )) MSK 25 (1) (2).pdf | 10 | 0 | 10 | 0 |
| Final OSPE (( ZAG )) MSK 25 (1).pdf | 10 | 0 | 10 | 0 |
| Final Practical Revision.pdf | 43 | 434 | 1 | 0 |
| Final revision anatomy (1).pdf | 86 | 1810 | 1 | 0 |
| Final revision anatomy-Copy.pdf | 86 | 1810 | 1 | 0 |
| LOWER 2.pdf | 28 | 2041 | 0 | 0 |
| LOWER 4 .pdf | 23 | 1792 | 0 | 0 |
| LOWER MCQ.pdf | 37 | 3944 | 1 | 0 |
| Lower 1 .pdf | 31 | 1862 | 1 | 0 |
| Lower 3.pdf | 25 | 1491 | 1 | 0 |
| Lower 5.pdf | 20 | 2104 | 0 | 0 |
| Lower 6.pdf | 26 | 2282 | 0 | 0 |
| Lower Limb Part (19).pdf | 58 | 0 | 58 | 0 |
| Lower Limb Part (20).pdf | 43 | 0 | 43 | 0 |
| Lower Limb vessles_m.pdf | 17 | 0 | 17 | 0 |
| Lower Part (27).pdf | 33 | 0 | 33 | 0 |
| Lower limb Part (21) 1.pdf | 34 | 0 | 34 | 0 |
| Lower part (23).pdf | 21 | 0 | 21 | 0 |
| Lower part (26)[1].pdf | 42 | 0 | 42 | 0 |
| M . C . Q . $.pdf | 10 | 0 | 10 | 0 |
| MCQ 1.pdf | 24 | 3255 | 0 | 0 |
| MCQ Lower Limb.pdf | 4 | 0 | 4 | 0 |
| MCQ Part 1-1.pdf | 6 | 0 | 6 | 0 |
| MCQ Part 3.pdf | 17 | 0 | 17 | 0 |
| MCQS + WRITTEN of upper.pdf | 29 | 3410 | 1 | 0 |
| MSI upper 1_t.pdf | 28 | 0 | 28 | 0 |
| MSK 6 .pdf | 23 | 2506 | 0 | 0 |
| MSK Final Zag 2024.pdf | 6 | 0 | 6 | 0 |
| MSK OSPE Fakous 2023 (1).pdf | 46 | 1497 | 0 | 0 |
| MSK Practical Upper_organized.pdf | 6 | 392 | 1 | 0 |
| MSK review 1.pdf | 7 | 22 | 6 | 0 |
| MUSCLE 2 NEW .pdf | 17 | 42 | 0 | 0 |
| MUSCLE 3.pdf | 17 | 1003 | 0 | 0 |
| Merged_qe78j828 (1).pdf | 45 | 1609 | 29 | 0 |
| Msk 5.pdf | 22 | 1133 | 0 | 0 |
| Mss.pdf | 11 | 1321 | 0 | 0 |
| Muscle MCQ .pdf | 10 | 1109 | 1 | 0 |
| Muscle Updated.pdf | 9 | 1061 | 0 | 0 |
| Musculoskeleal Module book 2023-2024.pdf | 249 | 47797 | 0 | 0 |
| NERVE MCQ NEW.pdf | 4 | 699 | 0 | 0 |
| Nerve Mcq .pdf | 9 | 1440 | 0 | 0 |
| New Bone Lab (2) (1).pdf | 22 | 188 | 2 | 0 |
| New Cartilage Lab (1).pdf | 17 | 147 | 1 | 0 |
| PART 4-1.pdf | 50 | 0 | 50 | 0 |
| Part 15.pdf | 30 | 0 | 30 | 0 |
| Part 18 .pdf | 31 | 0 | 31 | 0 |
| Part 29.pdf | 34 | 0 | 34 | 0 |
| Part 30 Lower Limb.pdf | 41 | 0 | 41 | 0 |
| Pec. & Shoulder.pdf | 10 | 1067 | 0 | 0 |
| Practical MSK 2024 .pdf | 17 | 0 | 17 | 0 |
| RMP - AP.pdf | 22 | 3421 | 0 | 0 |
| Revision 4 MCQ.pdf | 5 | 474 | 0 | 0 |
| Revision 5 mcq.pdf | 3 | 301 | 0 | 0 |
| Revision MSK physiology .pdf | 32 | 1012 | 8 | 0 |
| SCHEEEME MSK PRAC DR ZAHRAN.pdf | 3 | 243 | 0 | 0 |
| Smooth-Muscle1.pdf | 8 | 1198 | 0 | 0 |
| Synapse - muscle 1.pdf | 22 | 2641 | 0 | 0 |
| TEST on Anatomy OSPE (MSK).pdf | 217 | 8131 | 1 | 0 |
| TEST on Histology OSPE (MSK) (1).pdf | 64 | 391 | 1 | 0 |
| The Forearm.pdf | 8 | 330 | 0 | 0 |
| The Hand.pdf | 10 | 946 | 0 | 0 |
| Upper Limb Nerves.pdf | 17 | 2412 | 0 | 0 |
| Upper Limb t.pdf | 25 | 0 | 25 | 0 |
| Upper part  7[1]1.pdf | 38 | 0 | 38 | 0 |
| Upper part (1).pdf | 26 | 0 | 26 | 0 |
| Upper part (11).pdf | 32 | 0 | 32 | 0 |
| Upper part (3) Yhaoonet.pdf | 28 | 0 | 28 | 0 |
| Upper part (5) yahoo net.pdf | 22 | 0 | 22 | 0 |
| Upper part 8 Yhaoo net.pdf | 19 | 0 | 19 | 0 |
| Upper part 9 Yhaoo net.pdf | 27 | 0 | 27 | 0 |
| Written lower limb .pdf | 49 | 3937 | 0 | 0 |
| Written upper limb .pdf | 77 | 6715 | 0 | 0 |
| ZIZO (1) (1).pdf | 5 | 605 | 0 | 0 |
| __امتحان فاقوس ( بدون الحل )_copy_.pdf | 5 | 0 | 5 | 0 |
| _مستند من M&A.pdf | 40 | 320 | 0 | 0 |
| doc00059620231214092709.pdf | 27 | 0 | 27 | 0 |
| doc00081720231230170311 (1).pdf | 12 | 0 | 12 | 0 |
| dr.samahy 1.pdf | 37 | 2487 | 0 | 0 |
| lower 3._t.pdf | 30 | 0 | 30 | 0 |
| lower1_t.pdf | 31 | 0 | 31 | 0 |
| mcq lower.pdf | 20 | 2112 | 0 | 0 |
| mcq upper 2.pdf | 23 | 3118 | 0 | 0 |
| merged (29) (1).pdf | 19 | 2561 | 1 | 0 |
| merged (37).pdf | 17 | 2954 | 1 | 0 |
| merged (40).pdf | 10 | 1316 | 1 | 0 |
| mid mcq (1).pdf | 4 | 776 | 0 | 0 |
| msk 3 modified.pdf | 33 | 0 | 33 | 0 |
| msk upper 2_t.pdf | 35 | 0 | 35 | 0 |
| msk upper 3_T.pdf | 37 | 0 | 37 | 0 |
| mss 1 Dr-wagih .pdf | 29 | 2195 | 0 | 0 |
| mss 2 dr_wagih.pdf | 24 | 1930 | 0 | 0 |
| mss 3 dr_wagih.pdf | 28 | 2065 | 0 | 0 |
| mss 4 dr_wagih .pdf | 27 | 1911 | 0 | 0 |
| muscle 2 final.pdf | 16 | 2794 | 0 | 0 |
| nerve & muscle MCQ.pdf | 12 | 2206 | 0 | 0 |
| nerves of lower.pdf | 16 | 1609 | 0 | 0 |
| nerves of upper.pdf | 19 | 2172 | 0 | 0 |
| o- lower 2 -_t.pdf | 29 | 0 | 29 | 0 |
| part 12.pdf | 22 | 0 | 22 | 0 |
| part 13 . (1).pdf | 32 | 0 | 32 | 0 |
| part 14 (1)..pdf | 32 | 0 | 32 | 0 |
| part 16-1 (1).pdf | 25 | 0 | 25 | 0 |
| part 17 (1).pdf | 16 | 0 | 16 | 0 |
| part 2 ..pdf | 19 | 0 | 19 | 0 |
| part 22.pdf | 18 | 0 | 18 | 0 |
| part 24.pdf | 9 | 0 | 9 | 0 |
| part 25 ..pdf | 20 | 0 | 20 | 0 |
| part 28.pdf | 18 | 0 | 18 | 0 |
| part 6-1.pdf | 27 | 0 | 27 | 0 |
| potential mcq د نجيب.pdf | 23 | 5050 | 0 | 0 |
| potential mcq غير محلول.pdf | 23 | 5050 | 0 | 0 |
| practical . right or left.pdf | 1 | 114 | 0 | 0 |
| practical handout  of MSI Module.pdf | 172 | 7634 | 1 | 0 |
| rev 6 mcq.pdf | 4 | 365 | 0 | 0 |
| revision part 1 mcq.pdf | 4 | 406 | 0 | 0 |
| revision part 2 mcq.pdf | 5 | 431 | 0 | 0 |
| revision part 3 MCQ.pdf | 3 | 0 | 3 | 0 |
| skin (1).pdf | 15 | 2707 | 0 | 0 |
| skin MCQ .pdf | 3 | 384 | 0 | 0 |
| synapse & muscle 1.pdf | 25 | 4373 | 0 | 0 |
| synapse na_240120_092004.pdf | 4 | 0 | 4 | 0 |
| الخلاصة.pdf | 25 | 0 | 25 | 0 |
| اناتومي السنين السابقه غير محلول.pdf | 40 | 320 | 0 | 0 |
| اهم الاسئلة.pdf | 1 | 78 | 0 | 0 |
| اهم الاسئله نظري ماسكلو  (1).pdf | 5 | 22 | 2 | 0 |
| تفريغ.pdf | 6 | 0 | 6 | 0 |
| حل Practical MSK Zag 2024 (1).pdf | 46 | 0 | 46 | 0 |
| حل اول 204 سؤال سنين سابقة (1).pdf | 28 | 235 | 0 | 0 |
| خلاصه الامسكيو.pdf | 10 | 1544 | 0 | 0 |
| د عمار   2.pdf | 18 | 1746 | 2 | 0 |
| د عمار bone.pdf | 15 | 0 | 15 | 0 |
| عملي ماسكل فاقوس (1).pdf | 8 | 816 | 0 | 0 |
| فسيو سنوات سابقة (1).pdf | 54 | 0 | 54 | 0 |
| فسيو سنوات سابقة .pdf | 60 | 0 | 60 | 0 |
| نظري الماسكلو د وجيه .pdf | 40 | 5090 | 4 | 0 |
| هستو سنين سابقه.pdf | 26 | 2943 | 0 | 0 |

### staging — Professional Practice I (ZU-MED-105)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| 4_5771853253121676847.pdf | 11 | 0 | 11 | 0 |
| 4_5776124911630160513 (1).pdf | 12 | 1755 | 0 | 0 |
| 4_5947152867293925469 (1).pdf | 20 | 2604 | 0 | 0 |
| DOC-20231211-WA0006..pdf | 29 | 3697 | 0 | 0 |
| Fakous P.P1 Final 2024.pdf | 2 | 4 | 1 | 0 |
| Fakous P.P1 Mid.pdf | 3 | 416 | 0 | 0 |
| Fakous P.P1 Summer 2024.pdf | 3 | 3 | 0 | 0 |
| Final Hamdy 1 - 1st year.pdf | 16 | 3811 | 0 | 0 |
| Final Hamdy 2 - 1st year (3).pdf | 19 | 3431 | 0 | 0 |
| Final Hamdy 3 - 1st year (1).pdf | 22 | 5580 | 0 | 0 |
| Final Hamdy 4 - 1st year (2).pdf | 18 | 4267 | 0 | 0 |
| Final Hamdy 5 - 1st year (1).pdf | 16 | 3532 | 0 | 0 |
| MCQ 1.pdf | 4 | 631 | 0 | 0 |
| MCQ 2 (1).pdf | 3 | 613 | 0 | 0 |
| MCQ 3.pdf | 5 | 724 | 0 | 0 |
| MCQ 4.pdf | 3 | 458 | 0 | 0 |
| MyFile.pdf | 38 | 7270 | 0 | 0 |
| PP_1st year.pdf | 112 | 20733 | 0 | 0 |
| Profesionalism 1.pdf | 12 | 1757 | 0 | 0 |
| Team Work.pdf | 4 | 521 | 0 | 0 |
| Training MCQ.pdf | 7 | 717 | 0 | 0 |
| ZAG P.P1 Summer Final.pdf | 6 | 24 | 0 | 0 |
| ZNU P.P1 Mid.pdf | 3 | 485 | 0 | 0 |
| Zag P.P 1 Summer Mid.pdf | 2 | 0 | 2 | 0 |
| Zag P.P1 Final 2024.pdf | 3 | 355 | 0 | 0 |
| bio ethics for mid answers.pdf | 9 | 1005 | 0 | 0 |
| leader ship.pdf | 3 | 300 | 0 | 0 |
| mcq for mid answers.pdf | 29 | 3697 | 0 | 0 |
| mcq شامل.pdf | 44 | 5113 | 0 | 0 |
| mcq1.pdf | 6 | 878 | 0 | 0 |
| medical ethics mcqs.pdf | 6 | 0 | 6 | 0 |
| pp2.pdf | 14 | 2409 | 0 | 0 |
| pp4.pdf | 21 | 4062 | 0 | 0 |
| pp6.pdf | 16 | 2798 | 0 | 0 |
| time management.pdf | 2 | 214 | 0 | 0 |
| امتحان ميد تجريبي دكتور الشرقاوي.pdf | 3 | 342 | 0 | 0 |
| امتحانات سابقه.pdf | 13 | 2797 | 0 | 0 |

### staging — Cardiopulmonary (ZU-MED-106)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| (invalid) (1) (1).pdf | 20 | 4187 | 0 | 0 |
| 011.pdf | 7 | 602 | 0 | 0 |
| 4_5938489664854823415.pdf | 22 | 3096 | 1 | 0 |
| 4_5976766013964817710_240909_144634.pdf | 5 | 0 | 5 | 0 |
| 4_5978581969087238957_قام بالتحرير_240909_174633.pdf | 7 | 0 | 7 | 0 |
| 4_6023825768763626215.pdf | 11 | 1949 | 0 | 0 |
| 4_6032918665500824012_240622_154531.pdf | 6 | 0 | 6 | 0 |
| ABP MCQ 3.pdf | 5 | 675 | 0 | 0 |
| ABP mcq.pdf | 6 | 932 | 0 | 0 |
| ANATOMY CARDIO PULMONARY .pdf | 95 | 13781 | 0 | 0 |
| BIO CARDIO PULMONARY .pdf | 38 | 5307 | 0 | 0 |
| Binder1.pdf | 18 | 0 | 18 | 0 |
| Binder1333 (1).pdf | 32 | 0 | 32 | 0 |
| Brief HR.pdf | 5 | 1282 | 0 | 0 |
| C.P part 4.pdf | 16 | 1200 | 0 | 0 |
| C.p part 7.pdf | 14 | 1367 | 1 | 0 |
| CPS (1) ابراهيم الحسيني.pdf | 20 | 1823 | 0 | 0 |
| CPS (1) د.محمد النجار (1).pdf | 19 | 2772 | 0 | 0 |
| CPS (2) د.محمد النجار(1).pdf | 20 | 3148 | 0 | 0 |
| CPS (3) ابراهيم الحسيني.pdf | 18 | 1578 | 0 | 0 |
| CPS (3) د.محمد النجار (1).pdf | 21 | 2750 | 0 | 0 |
| CPS MCQ 1.pdf | 11 | 1839 | 0 | 0 |
| CPS PRAC DR ZAHRAN.pdf | 14 | 173 | 0 | 0 |
| CPS Physiology Practice.pdf | 58 | 2974 | 1 | 0 |
| CPS WRITTEN VIP DR ZAHRAN .pdf | 1 | 217 | 0 | 0 |
| CVS practical (1) (1).pdf | 39 | 36 | 28 | 0 |
| Cardio 8.pdf | 23 | 2429 | 0 | 0 |
| Cardio Part (5).pdf | 31 | 0 | 31 | 0 |
| Cardio Pulmonary Part (11) 1st year (1).pdf | 19 | 0 | 19 | 0 |
| Cardio Pulmonary Part (12) 1st year (1).pdf | 36 | 0 | 36 | 0 |
| Cardio Pulmonary Part (13) 1st year (1).pdf | 43 | 0 | 43 | 0 |
| Cardio Pulmonary Part (14) 1st year (1).pdf | 12 | 0 | 12 | 0 |
| Cardio Pulmonary Part (15) 1st year-1 (1).pdf | 49 | 0 | 49 | 0 |
| Cardio Pulmonary Part (16) 1st year (1).pdf | 26 | 1 | 25 | 0 |
| Cardio Pulmonary Part (17) 1st year (1).pdf | 28 | 0 | 28 | 0 |
| Cardio Pulmonary Part (18) 1st year.pdf | 9 | 0 | 9 | 0 |
| Cardio Pulmonary Part (19) 1st year.pdf | 34 | 0 | 34 | 0 |
| Cardio Pulmonary Part (20) 1st year.pdf | 19 | 0 | 19 | 0 |
| Cardio Pulmonary Part (9) 1st year (1).pdf | 16 | 0 | 16 | 0 |
| Cardio pulamonary Part (2) 1st year[1] (1).pdf | 27 | 0 | 27 | 0 |
| Cardio pulamonary Part (3) 1st year.pdf | 16 | 0 | 16 | 0 |
| Cardio pulmonary Part (6) 1st year.pdf | 35 | 0 | 35 | 0 |
| Cardio pulmonary Part (7) 1st year (1).pdf | 34 | 0 | 34 | 0 |
| Cardio-Pulmonary Module Final (4).pdf | 244 | 41708 | 0 | 0 |
| Cardio-Pulmonary Module Final ---Part 2-1.pdf | 125 | 19331 | 0 | 0 |
| Cardio5.pdf | 17 | 1214 | 0 | 0 |
| Cardiopulmonary 10.pdf | 20 | 2068 | 0 | 0 |
| Cardiopulmonary 7.pdf | 14 | 1077 | 0 | 0 |
| Cardiopulmonary 9 (1).pdf | 26 | 6 | 25 | 0 |
| DOC-20230426-WA0008..pdf | 14 | 1169 | 0 | 0 |
| DOC-20230504-WA0006..pdf | 12 | 1275 | 0 | 0 |
| DOC-20240212-WA0019_240212_035258.pdf | 16 | 1765 | 0 | 0 |
| DOC-20240527-WA0088-١_240528_131155.pdf | 85 | 1019 | 26 | 0 |
| Dr. Basel Histology of lymphatic system.pdf | 24 | 2729 | 1 | 0 |
| FAQOUS ospe Cardiopulmonary 2025 answered.pdf | 19 | 605 | 1 | 0 |
| FINAL CPS 2024 MCQ ZAHRAN.pdf | 8 | 4619 | 0 | 0 |
| Fakous CPS Final 2024.pdf | 5 | 1511 | 0 | 0 |
| Final FAKOS OSPE  cardiopulmonary2023-2024.pdf | 21 | 645 | 1 | 0 |
| Final MCQ CPS  د.محمد النجار.pdf | 15 | 2006 | 0 | 0 |
| GAS EXCHANGE.pdf | 25 | 2218 | 0 | 0 |
| HEART 1 2023.pdf | 5 | 651 | 0 | 0 |
| HISTOLOGY CARDIO PULMONARY .pdf | 69 | 10112 | 0 | 0 |
| HISTOLOGY OF CARDIO PULMONARY PRACTICAL .pdf | 44 | 351 | 0 | 0 |
| Head & Neck.pdf | 14 | 1719 | 0 | 0 |
| LYMPHATIC PATHOHISTO BLAST DR ZAHRAN-.pdf | 19 | 3240 | 0 | 0 |
| MCQ (1) ابراهيم الحسيني.pdf | 20 | 2852 | 0 | 0 |
| MCQ 1 CPS د.محمد النجار.pdf | 13 | 1487 | 0 | 0 |
| MCQ 3-1.PDF | 5 | 794 | 0 | 0 |
| MCQ 4-1.pdf | 7 | 0 | 7 | 0 |
| MCQ Prei cardium-1.pdf | 6 | 0 | 6 | 0 |
| MCQ answer_.pdf | 17 | 0 | 17 | 0 |
| MCQ revision_240620_163232.pdf | 9 | 1826 | 0 | 0 |
| MCQ مذكره_240620_163208.pdf | 28 | 5929 | 1 | 0 |
| MCQS RESP 1.pdf | 14 | 2686 | 0 | 0 |
| MCQS Resp 2.pdf | 10 | 2018 | 0 | 0 |
| Mcq cardiopulmonary 3 مش محلول.pdf | 19 | 1455 | 0 | 0 |
| Mcq cardiopulmonary 3.pdf | 19 | 1455 | 0 | 0 |
| Mcq dr wagih محلول.pdf | 20 | 2825 | 0 | 0 |
| Merged_dizqk8g0 (1).pdf | 113 | 615 | 58 | 0 |
| MyFile (16).pdf | 22 | 4089 | 0 | 0 |
| Pericardium MCQ.pdf | 11 | 11 | 0 | 0 |
| Physio Dr.Khaled (1) (1).pdf | 2 | 0 | 2 | 0 |
| Physio Dr.Khaled (1).pdf | 7 | 0 | 7 | 0 |
| Physio Dr.Khaled.pdf | 3 | 0 | 3 | 0 |
| Practical Cardiopulmonary  (4).pdf | 186 | 13718 | 0 | 0 |
| QUIZ 1 LYMPHATIC DR ZAHRAN.pdf | 1 | 165 | 0 | 0 |
| QUIZ 1-1.pdf | 1 | 154 | 0 | 0 |
| Quastions 1.pdf | 1 | 196 | 0 | 0 |
| Quiz 1 د.محمد النجار.pdf | 1 | 132 | 0 | 0 |
| Quiz 2 د.محمد النجار.pdf | 1 | 111 | 0 | 0 |
| Quiz 3 د.محمد النجار.pdf | 1 | 128 | 0 | 0 |
| Quiz 4 د.محمد النجار.pdf | 1 | 128 | 0 | 0 |
| Quiz 5 د.محمد النجار.pdf | 1 | 140 | 0 | 0 |
| RESP MCQ amr mosafer.pdf | 19 | 2251 | 1 | 0 |
| RESPIRATION 1  (1).pdf | 13 | 13 | 0 | 0 |
| Respiration MCQ (dr abdalla elsamahy).pdf | 8 | 1473 | 1 | 0 |
| Respiratory Dr.basel .pdf | 25 | 2850 | 1 | 0 |
| THYMUS QUIZ DR ZAHRAN.pdf | 2 | 405 | 0 | 0 |
| The Pharynx.pdf | 14 | 1702 | 0 | 0 |
| Theoretical Cardiopulmonary  (5).pdf | 344 | 54939 | 0 | 0 |
| Zag CPS OSPE 2025 (1).pdf | 9 | 0 | 9 | 0 |
| Zag CPS Summer OSPE 2025.pdf | 10 | 0 | 10 | 0 |
| all Previous Years ospe Cardiopulmonary  (1).pdf | 135 | 1109 | 96 | 0 |
| amr mosafer (MCQ 1) (1).pdf | 17 | 0 | 17 | 0 |
| amr mosafer (part 2).pdf | 29 | 0 | 29 | 0 |
| anatomy .pdf | 17 | 0 | 17 | 0 |
| biochemistry written cvs.pdf | 13 | 2498 | 0 | 0 |
| cardio 3 pdf.pdf | 20 | 2097 | 0 | 0 |
| cardio 4.pdf | 17 | 1451 | 0 | 0 |
| cardio-plm. 1.pdf | 20 | 1626 | 0 | 0 |
| cardio2.pdf | 25 | 2206 | 0 | 0 |
| cardiopulmonary 3t.pdf | 19 | 0 | 19 | 0 |
| cvs 2 - Copy (1).pdf | 19 | 3982 | 0 | 0 |
| cvs 3 new.pdf | 22 | 3941 | 0 | 0 |
| cvs part 1 (1).pdf | 18 | 2557 | 0 | 0 |
| final FAQOUS ospe Cardiopulmonary 2024 .pdf | 21 | 834 | 1 | 0 |
| final revision CPUL (1).pdf | 43 | 7487 | 0 | 0 |
| mcq cardiac properties.pdf | 11 | 2056 | 0 | 0 |
| mcq2.pdf | 7 | 2421 | 0 | 0 |
| merged (76).pdf | 13 | 2119 | 1 | 0 |
| part 5.pdf | 14 | 1321 | 0 | 0 |
| part 6 .pdf | 35 | 3270 | 0 | 0 |
| patho histo blast Quiz 4 .pdf | 1 | 152 | 0 | 0 |
| physio Written cvs  7.6.2024.pdf | 23 | 4995 | 0 | 0 |
| physiology cardio pulmonary .pdf | 142 | 25749 | 0 | 0 |
| practical (amr mosafer ) (1).pdf | 86 | 1088 | 26 | 0 |
| practical prelap 1 pdf (2).pdf | 18 | 417 | 4 | 0 |
| previous cardio practiacl questions.pdf | 23 | 277 | 4 | 0 |
| revision cardiopulmonary 2024 (1).pdf | 66 | 3515 | 0 | 0 |
| اخر_تعديل_لاهم_الاسئله_في_الكارديو.pdf | 2 | 103 | 0 | 0 |
| الخلاصه 2024 CPS_240610_095402 (1).pdf | 33 | 6511 | 0 | 0 |
| المذكره_الرابعه_السماحي_compressed_240303_135453.pdf | 62 | 2248 | 43 | 0 |
| المزكرة التانيه السماحى (1).pdf | 35 | 4065 | 1 | 0 |
| امسكيو ريسب 1.pdf | 14 | 2686 | 0 | 0 |
| امسكيو ريسب 2.pdf | 10 | 2047 | 0 | 0 |
| امسكيو نجيب COP.pdf | 5 | 994 | 0 | 0 |
| تحديدات فاينال كـتاب بريف CPS .pdf | 9 | 400 | 0 | 0 |
| تدريب للعملي ابراهيم الحسيني.pdf | 5 | 592 | 0 | 0 |
| خمسه_صور_زياده_موجودين_ف_داتا_السكاشن.pdf | 1 | 5 | 0 | 0 |
| د عمار.pdf | 14 | 1605 | 5 | 0 |
| عملي CPS ابراهيم الحسيني.pdf | 20 | 2033 | 0 | 0 |
| عملي سي في اس.pdf | 43 | 6722 | 0 | 0 |
| كويز الحصه التانيه ( Patho histo blast) .pdf | 1 | 146 | 0 | 0 |
| كويز الحصه الثالثه patho histo blast .pdf | 1 | 165 | 0 | 0 |
| مذكره الريسب التالته.pdf | 16 | 2517 | 0 | 0 |
| مذكره الريسب التانيه.pdf | 21 | 3585 | 0 | 0 |
| 𝐈𝐫𝐚𝐭 1.pdf | 10 | 0 | 10 | 0 |

### staging — GIT and Nutrition (ZU-MED-107)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| 4_5785115098519442551.pdf | 43 | 0 | 43 | 0 |
| 4_5866084449048860308_240428_221638.pdf | 6 | 1019 | 0 | 0 |
| 4_6005673909825834715 (Telegram 2).pdf | 2 | 2 | 0 | 0 |
| 4_6005673909825834715.pdf | 2 | 2 | 0 | 0 |
| 4_6048471240295846911_241002_215841.pdf | 4 | 16 | 0 | 0 |
| Anatomy questions(GIT)  (1).pdf | 92 | 15862 | 0 | 0 |
| Arterial supply.pdf | 10 | 1765 | 0 | 0 |
| DOC-20231126-WA0006_231206_174740.pdf | 19 | 1759 | 0 | 0 |
| DOC-20240520-WA0002 (1).pdf | 19 | 0 | 19 | 0 |
| Dr. Basel TBL Questions.pdf | 6 | 1019 | 0 | 0 |
| Fakous GIT OSPE 2024.pdf | 20 | 453 | 1 | 0 |
| Fakous GIT OSPE 2025.pdf | 23 | 857 | 0 | 0 |
| Fakous GIT SUMMER OSPE 2025.pdf | 20 | 0 | 20 | 0 |
| Fakous GIT Summer 2024.pdf | 20 | 0 | 20 | 0 |
| Fakous GIT final 2024.pdf | 5 | 1465 | 0 | 0 |
| Fakous_GIT_OSPE_2024_Signed_1_Signed_Signed_Signed_Signed_Signed.pdf | 20 | 631 | 1 | 0 |
| Final_Anatomy_Previous_Exams.pdf | 24 | 4043 | 0 | 0 |
| Final_Biochemistry_Previous_Exams.pdf | 26 | 3895 | 0 | 0 |
| Final_Histo_Previous_Exams.pdf | 12 | 1405 | 1 | 0 |
| First Aid-1.pdf | 44 | 522 | 16 | 0 |
| GIT  Anatomy REVISION 2024,,, (1).pdf | 63 | 1613 | 4 | 0 |
| GIT (4) ابراهيم الحسيني.pdf | 16 | 1665 | 0 | 0 |
| GIT (5) ابراهيم الحسيني.pdf | 16 | 1533 | 0 | 0 |
| GIT (6) ابراهيم الحسيني.pdf | 22 | 2160 | 0 | 0 |
| GIT (8) ابراهيم الحسيني.pdf | 22 | 2578 | 0 | 0 |
| GIT 1 Dr Wagih  (1).pdf | 24 | 2798 | 0 | 0 |
| GIT 2024.pdf | 354 | 62365 | 0 | 0 |
| GIT 8.pdf | 10 | 1152 | 0 | 0 |
| GIT Final Zag 2024.pdf | 4 | 0 | 4 | 0 |
| GIT HAND OUT  (1).pdf | 316 | 56239 | 0 | 0 |
| GIT MID MCQ (DR Abdalla Elsamahy).pdf | 8 | 1289 | 0 | 0 |
| GIT Module - Liver and Pancreas 2022 (1).pdf | 39 | 263 | 26 | 0 |
| GIT Module - Practical revision 2.pdf | 70 | 142 | 35 | 0 |
| GIT OSPE Practice (Histology) (1).pdf | 91 | 149 | 53 | 0 |
| GIT OSPE revision.pdf | 67 | 1300 | 1 | 0 |
| GIT PRACTCAL 2024.pdf | 43 | 0 | 43 | 0 |
| GIT Part (10) 1st year (1).pdf | 18 | 0 | 18 | 0 |
| GIT Part (11) 1st year.pdf | 31 | 0 | 31 | 0 |
| GIT Part (2) 1nd year.pdf | 17 | 0 | 17 | 0 |
| GIT Part (20) 1st year الجديدة (1).pdf | 15 | 0 | 15 | 0 |
| GIT Part (9) 1st year (1).pdf | 20 | 0 | 20 | 0 |
| GIT part (13) 1st year(1).pdf | 23 | 0 | 23 | 0 |
| GIT part (14) 1st year(1).pdf | 35 | 0 | 35 | 0 |
| GIT part (15) 1st year.pdf | 13 | 0 | 13 | 0 |
| GIT part (16) 1st year (1).pdf | 37 | 0 | 37 | 0 |
| GIT part (17).pdf | 19 | 0 | 19 | 0 |
| GIT part (18) 1st year.pdf | 32 | 0 | 32 | 0 |
| GIT part (19) 1st year.pdf | 19 | 0 | 19 | 0 |
| GIT part (4) 1st year (1).pdf | 25 | 0 | 25 | 0 |
| GIT part (7) 1st year.pdf | 25 | 0 | 25 | 0 |
| GIT part (8) 1st year(1) (1).pdf | 29 | 0 | 29 | 0 |
| GIT4 new .pdf | 21 | 3139 | 0 | 0 |
| Git 7 dr wagih.pdf | 28 | 3338 | 0 | 0 |
| Git Wagih 3.pdf | 28 | 3028 | 0 | 0 |
| Handout معدل (1) (1).pdf | 318 | 56808 | 3 | 0 |
| Liver& pancreas Zahran .pdf | 7 | 715 | 0 | 0 |
| MCQ (1) ابراهيم الحسيني.pdf | 38 | 4760 | 0 | 0 |
| MCQ (2) ابراهيم الحسيني.pdf | 29 | 3392 | 0 | 0 |
| MCQ (3) ابراهيم الحسيني.pdf | 11 | 627 | 0 | 0 |
| MCQ GIT part (1)(1).pdf | 14 | 0 | 14 | 0 |
| MCQ GIT1 ...pdf | 5 | 5 | 0 | 0 |
| MCQ GIT1.pdf | 5 | 5 | 0 | 0 |
| MCQ GITفسيو د.خالد ابو الفضل (1).pdf | 5 | 0 | 5 | 0 |
| MCQ GITفسيو د.خالد ابو الفضل (2).pdf | 3 | 0 | 3 | 0 |
| MCQ GITفسيو د.خالد ابو الفضل (3).pdf | 6 | 0 | 6 | 0 |
| MCQ GITفسيو د.خالد ابو الفضل.pdf | 5 | 0 | 5 | 0 |
| MCQ العزوني مش محلول .pdf | 14 | 0 | 14 | 0 |
| MCQ- GIT .pdf | 19 | 0 | 19 | 0 |
| PRACTICAL GIT DE ZAHRAN (1).pdf | 10 | 343 | 0 | 0 |
| Prac Git (1) ابراهيم الحسيني.pdf | 21 | 2144 | 0 | 0 |
| Prac Git (2) ابراهيم الحسيني (1).pdf | 24 | 2559 | 0 | 0 |
| Prac Git (3) ابراهيم الحسيني.pdf | 29 | 2519 | 1 | 0 |
| Practical Git (1).pdf | 72 | 1594 | 14 | 0 |
| Practicle Anatomy File (Unsolved).pdf | 63 | 592 | 18 | 0 |
| Previous practical exam (1).pdf | 30 | 219 | 2 | 0 |
| Previous practical exam.pdf | 30 | 15 | 28 | 0 |
| Quiz 1.pdf | 1 | 115 | 0 | 0 |
| The Liver.pdf | 12 | 1499 | 0 | 0 |
| The Pancreas.pdf | 9 | 878 | 0 | 0 |
| The Rectum.pdf | 11 | 1191 | 0 | 0 |
| The Stomach.pdf | 12 | 1222 | 0 | 0 |
| The rectus sheath.pdf | 2 | 260 | 0 | 0 |
| Total Quiz.pdf | 5 | 601 | 0 | 0 |
| Untitled (1).pdf | 4 | 0 | 4 | 0 |
| abdominal wall.pdf | 16 | 1902 | 1 | 0 |
| dodenum . pharynx.pdf | 19 | 1314 | 0 | 0 |
| lab application of LFT.pdf | 47 | 1248 | 1 | 0 |
| mcq (dr wagih) git.pdf | 9 | 1179 | 0 | 0 |
| mcq (git) dr wagih.pdf | 25 | 3309 | 0 | 0 |
| oral cavity 1 quiz dr zahran (3).pdf | 1 | 174 | 0 | 0 |
| oral cavity 2 Quiz zahran  (3).pdf | 1 | 295 | 0 | 0 |
| oral mcq - كامل.pdf | 8 | 1099 | 0 | 0 |
| oral mcq.pdf | 4 | 512 | 1 | 0 |
| part 4.pdf | 26 | 3035 | 2 | 0 |
| practical        digestive &nutrition (1).pdf | 146 | 9099 | 2 | 0 |
| quize form.pdf | 1 | 142 | 0 | 0 |
| revesion.pdf | 14 | 491 | 1 | 0 |
| scheme + esophagus + stomach 1 quiz.pdf | 1 | 299 | 0 | 0 |
| stomach quiz.pdf | 3 | 315 | 0 | 0 |
| tongue quiz.pdf | 2 | 137 | 0 | 0 |
| zag-practical-git-2025.pdf | 8 | 0 | 8 | 0 |
| اسئلة نظرى git د وجيه فاقوس.pdf | 4 | 0 | 4 | 0 |
| المذكرة الرابعه _compressed_240506_151924.pdf | 25 | 3512 | 0 | 0 |
| المذكرة_التانيه_السماحي_compressed_240418_171308.pdf | 21 | 2264 | 3 | 0 |
| المزكرة الاولى  (1).pdf | 41 | 4881 | 0 | 0 |
| امسكيو العملي د.ابراهيم الحسيني.pdf | 23 | 2865 | 0 | 0 |
| امسكيو فاينال د نجيب.pdf | 19 | 3282 | 0 | 0 |
| تحديدات فاينال GIT كتاب A+ .pdf | 7 | 388 | 0 | 0 |
| تحديدات فاينال كتاب القسم GIT .pdf | 7 | 383 | 0 | 0 |
| تحديدات فاينال كتاب بريف GIT .pdf | 7 | 380 | 0 | 0 |
| تحديدات_فاينال_GIT_كتاب_القسم_المُرتب_.pdf | 7 | 389 | 0 | 0 |
| حل فسيو (1).pdf | 26 | 3301 | 0 | 0 |
| لبوسة عملي هستو ال GIT د باسل شريف.pdf | 7 | 0 | 7 | 0 |
| ميد git فاقوس بالحل.pdf | 4 | 0 | 4 | 0 |
| 𝐓.𝐑𝐀𝐓 1.pdf | 1 | 0 | 1 | 0 |
| 𝐓.𝐑𝐀𝐓 2.pdf | 1 | 0 | 1 | 0 |

### staging — Professional Practice II (ZU-MED-108)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| 3.pdf | 10 | 1139 | 0 | 0 |
| 4 (1).pdf | 21 | 2227 | 0 | 0 |
| 4_5789543733787628351.pdf | 14 | 1809 | 0 | 0 |
| 4_5951876884642928102.pdf | 9 | 909 | 1 | 0 |
| 4_6051042332273284158_240325_212713.pdf | 7 | 548 | 0 | 0 |
| Airway management.pdf | 7 | 390 | 0 | 0 |
| BLS MCQs.pdf | 10 | 1065 | 4 | 0 |
| Basic clinical skills 1 مترجم.pdf | 69 | 6576 | 0 | 0 |
| Basic clinical skills 1.pdf | 69 | 7050 | 0 | 0 |
| Clinical sheet mcq.pdf | 3 | 502 | 0 | 0 |
| DOC-20240513-WA0020..pdf | 24 | 3212 | 0 | 0 |
| DOC-20240525-WA0001..pdf | 8 | 466 | 0 | 0 |
| DOC-Injection mcq.pdf | 14 | 1700 | 0 | 0 |
| Fakous P.P2 Final 2024.pdf | 4 | 958 | 0 | 0 |
| Fakous P.P2 Mid 2024.pdf | 2 | 0 | 2 | 0 |
| Final Hamdy 1 - 1st year.pdf | 23 | 3855 | 0 | 0 |
| MCQS general surgery-1.pdf | 7 | 1616 | 0 | 0 |
| OSPE “Answers” Yousef Amr.pdf | 16 | 1562 | 0 | 0 |
| mcq.pdf | 18 | 2198 | 0 | 0 |
| pp2 summer fakous 2024.pdf | 4 | 0 | 4 | 0 |
| pp2ميد فتره تانيه.pdf | 10 | 0 | 10 | 0 |
| revision 1st year part 1.pdf | 12 | 1472 | 0 | 0 |

### staging — Human Rights and Community Issues (ZU-UNI-101?)

| file | pages | words | garbled pages | ocr pages |
|---|---:|---:|---:|---:|
| 4_5897849516068967814.pdf | 20 | 3397 | 1 | 0 |
| CamScanner 09-01-2024 06.46.pdf | 10 | 0 | 10 | 0 |
| human_right_and_anticorruption.pdf | 31 | 10675 | 0 | 0 |
| روابط القضايا المجتمعبة 2024 (1).pdf | 1 | 30 | 0 | 0 |
| مقرر القضايا المجتمعيه 2024.pdf | 37 | 7466 | 1 | 0 |
