# ASU-AE Embryo 2 — questions deferred on pending (not-yet-live) concepts

Apply only after the named Kasr/Alexandria batch is actually imported and live. Until then,
authoring a question against these concept ids fails `medical:simulate`'s concept-existence
check (`scripts/simulate-content-import.mjs`: "concept X does not exist") because the id is
neither live nor inside this lane's own simulated batch — the same hazard LANE-BRIEF.md §6
describes for a single cross-lane hit, here affecting most of "MCQs - Embryo 2.pdf"
(src_a7e3b821ab294015c05f) because Kasr's own `101-ISK-mcq-concepts.md` and Alexandria's own
`AU-MED-102-embryology*` files already carry a comprehensive, unimported embryology concept
set covering nearly the same fertilization/implantation/placenta ground this ASU paper tests.

Every row below is: ASU question (stem, printed answer key), the pending concept id it should
become a sparse `+asu/+ASU_Y1/+ASU-AE` overlay on once live, and that concept's own file. Once
the file is live, re-open `docs/Ain-Shams-Source-Imports/concept/ASU-AE-embryology-fertilization-placenta-concepts.md`
and add a sparse-overlay row (the exact pattern already used there for the 7 CON-OBS-* overlays),
then move the matching question below into the real question file, citing the same printed
answer-key row.

Answer-key page references: rows 1–20 on page 13, rows 21–56 on page 14, rows 57–69 on page 15
of "MCQs - Embryo 2.pdf".

## Zona reaction / polyspermy block — `CON-DEV-642BA9E28AC8B6` (`zonapellucida.function.block-polyspermy-and-adhesion`)
Pending in `docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md` (mirrored `docs/import-ready/`).

- Q3 "Prevents penetration of the oocyte by more than one sperm:" — key c (vitelline membrane; this source's own terminology for the zona-reaction barrier).
- Q19 "No sperm can penetrate the oocyte after fertilization due to:" — key d (zona reaction).
- Q29 "What is the result of the zona reaction (cortical reaction)?" — key e (sperms can no longer enter the egg).
- Q41 "Only one sperm can penetrate the oocyte membrane due to:" — key b (the zona reaction).
- Q54 "Only one sperm can penetrate the oocyte membrane because of:" — key a (the zona reaction).

## Sperm capacitation — `CON-DEV-CA422E559742A2` (`sperm.capacitation.glycoprotein-coat-removal`)
Pending in `docs/Alexandria-Source-Imports/concept/AU-MED-102-embryology-concepts.md`. Same id Embryo 1's
own triage/authoring pass already found and left untested (see `coverage/ASU-AE-triage.md`).

- Q18 "The process of sperm capacitation takes place within the:" — key c (female genital tract).
- Q21 "Sperm capacitation occurs in the:" — key e (uterus).
- Q28 "Where does the process of sperm capacitation take place?" — key c (female genital tract).
- Q33 "Where does the process of sperm capacitation take place?" — key e (female genital tract).
- Q65 "As regards sperm capacitation, choose the CORRECT statement:" — key b (is essential for fertilization).

## Fertilization site + the four results — `CON-DEV-F33BB68138377B` (`fertilization-site-mechanism-results`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`.

- Q42 "Normal site of fertilization is:" — key c (lateral part of uterine tube).
- Q56 "Regarding fertilization, all are true EXCEPT:" — key a (it usually occurs in uterine cavity — false).
- Q38 "Results of fertilization include all the following EXCEPT:" — key e (beginning of implantation — false).
- Q53 "Fertilization results in:" — key e (all of the above).

## Blastocyst structure and implanting stage — `CON-DEV-28CF4D241BE607` (`blastocyst-structure-poles-and-the-start-of-implantation`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` (mirrored in Alexandria's `pending-live/AU-MED-102-embryology.md`).

- Q37 "The stage that implants into the uterus is:" — key b (blastocyst).
- Q64 "During implantation, the blastocyst:" — key e (all of the above).

## Cleavage timeline / zona pellucida through the morula stage — `CON-DEV-F5A87FDF5D911C` (`cleavage-morula-and-migration-to-the-uterine-cavity`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`. This one concept's own definition
already covers both the morula timeline and the zona pellucida's persistence-then-degeneration timing,
so it also answers the two zona-pellucida questions below.

- Q30 "On what day does the morula reach the uterine cavity after fertilization?" — key a (4th day).
- Q39 "The first stage that reaches the uterine lumen after fertilization is:" — key d (the morula).
- Q57 "The fertilized human oocyte reaches the uterine lumen after:" — key d (3-4 days).
- Q12 "Enlargement of the cleaving zygote is prevented by:" — key b (zona pellucida).
- Q15 "Prevents enlargement of the dividing zygote:" — key b (zona pellucida).
- Q59 "As regards the blastocyst, all the following statements are true EXCEPT:" — key b (surrounded by zona pellucida until after implantation — false; the zona degenerates before implantation).
- Q66 "Zona pellucida surrounds:" — key e (all of the above).

## Implantation abnormal sites (placenta praevia / ectopic) — `CON-DEV-89FC3BBB3C9BCE` (`implantation-abnormal-sites`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`. Covers only the placenta-praevia
half below — the ectopic-pregnancy questions in this same paper (Q6, Q45) were authored this pass as
sparse overlays onto the live `CON-OBS-F3B46C8C137FA1` instead; see the main question file.

- Q2 "Placenta praevia results from implantation of the blastocyst in the:" — key e (lower part of the uterus).
- Q10 "Implantation in the lower uterine segment is called placenta:" — key a (previa).
- Q32 "Placenta praevia marginalis:" — key b (covers internal os partially).
- Q51 "Which of the following abnormalities of the placenta is due to an abnormality in implantation?" — key d (placenta praevia).

## Implantation day-6-to-11 timing and normal site — `CON-DEV-22C6EB6EB88448` (second-week timetable) and `CON-DEV-E08715FEB6438D` (`implantation-normal-site-and-the-syncytiotrophoblast-that-achieves-it`)
Both pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`.

- Q4 "Implantation of blastocyst is completed in which post-fertilization day?" — key d (11th).
- Q43 "Implantation of blastocyst begins in which post-fertilization day?" — key b (6th).
- Q58 "Usual number of days between fertilization & starting implantation is:" — key c (six days).
- Q44 "The normal site for implantation is:" — key c (posterior wall of body of uterus).

## Gamete morphology, oocyte identity and sex determination — `CON-DEV-0BA870DF2C2E13` (`gamete-morphology-and-the-haploid-nucleus`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`.

- Q9 "The cell that is fertilized by the sperm is the:" — key b (secondary oocyte).
- Q40 "The sex of the embryo is determined at the time of:" — key a (fertilization).
- Q55 "Genetic sex of the embryo is established at the time of:" — key d (fertilization).

## Decidua three-part classification — `CON-DEV-B84639AB8FF5DE` (`decidua-definition-parts-fates`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`.

- Q11 "The chorion leave faces which part of the decidua?" — key b (capsularis).

## Chorionic villus primary/secondary/tertiary classification — `CON-DEV-E099FAA01BEAEB` (`chorionic-villi-types-development`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`. The single richest cluster deferred
this pass (8 of the 47 questions) — worth prioritising once the Kasr batch lands.

- Q8 "The wall of chorionic vesicle is made of:" — key a (cytotrophoblast + syncytiotrophoblast).
- Q14 "A 2ry chorionic villus is made of:" — key e (trophoblast + 1ry mesoderm).
- Q20 "When the chorionic villus becomes invaded by mesoderm, it is called:" — key a (secondary villus).
- Q22 "When the chorionic villus becomes vascularized, it is given the term:" — key e (tertiary villus).
- Q60 "The chorion consists of:" — key d (all of the above).
- Q61 "A primary stem villus consists of:" — key c (cytotrophoblast & syncytiotrophoblast only).
- Q62 "As regards the secondary villi, all are true EXCEPT:" — key d (they contain a core of 2ry mesoderm — false; it is 1ry mesoderm).
- Q63 "A tertiary stem villus consists of:" — key e (cytotrophoblast, syncytiotrophoblast & extraembryonic mesoderm with small blood vessels).

## Primary yolk sac from Heuser's membrane over the blastocoele — `CON-DEV-1D10DF3B716A70` (`yolk-sac-allantois-heuser-and-the-vitelline-duct`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`.

- Q7 "The blastocoele becomes the:" — key b (yolk sac).

## Bilaminar disc / epiblast-hypoblast / amniotic cavity origin — `CON-DEV-59DB99C028C33F` (`bilaminar-disc-amnioblast-and-epiblast`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`. Covers both questions below in one record.

- Q67 "The first 2 intraembryonic germ layers that differentiate are:" — key b (epiblast & hypoblast).
- Q69 "The amniotic cavity develops:" — key d (during the 1st week after fertilization / between the inner cell mass & the trophoblast).

## Extraembryonic coelom formation (second-week timetable) — `CON-DEV-22C6EB6EB88448`
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`.

- Q68 "The Extraembryonic coelom:" — key c (is lined by extraembryonic mesoderm).

## Twins — general monozygotic/dizygotic same-sex prediction — `CON-DEV-698CF33638D4D7` (`twins-monozygotic-and-dizygotic`)
Pending in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`. Not used this pass — this batch's own
Q25 (pygopagus) and Q52 (conjoint twins are always monozygotic) were minted as a new, more specific
concept (`CON-DEV-397FA7EC5F2396`) instead, since neither ASU question tests the same-sex/different-sex
prediction this pending concept states; listed here only as the related record for future cross-linking.

## Totals
47 questions deferred across 15 pending concept ids (13 distinct, 2 shared by 2 clusters each). Combined
with the 1 excluded defective item (Q46) and the 21 authored this pass, all 69 printed items are accounted
for.
