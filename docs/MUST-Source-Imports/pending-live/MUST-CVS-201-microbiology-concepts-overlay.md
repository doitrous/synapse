<!--
  MUST-CVS-201 · pending-live sparse CONCEPT overlay (Microbiology tranche,
  author5).

  3 concept ids, all pending in unimported batches — none is in
  server/data/medical-library-v1.json (checked directly, not just via
  find-existing.mjs). Two source files are involved:

    A. docs/import-ready/concept/ASU-INF-microbiology-concepts.md (identical
       record also sits in docs/Ain-Shams-Source-Imports/concept/ASU-INF-
       microbiology-concepts.md) — 2 ids:
       - CON-INF-2E4D9F498F4B12, "Streptococcus viridans, part of normal oral
         flora, causes infective endocarditis after dental procedures" — the
         classic subacute-IE-cause fact this tranche's M1-Q2, M1-Q17, M2-Q3
         and M2-Q29 all test (dental-procedure risk, congenital-heart-disease
         risk, and normal-oropharyngeal-flora framing are three facets of the
         one concept, not three concepts — find-existing.mjs "infective
         endocarditis" and "normal flora oropharynx" both returned this
         record).
       - CON-INF-C0123F8DDE0DAA, "Staphylococcus saprophyticus is
         differentiated from other coagulase-negative staphylococci by
         novobiocin resistance" — its own definition already names S.
         epidermidis by contrast ("distinguished ... such as S. epidermidis,
         by its resistance to ... novobiocin"), so M1-Q4 (S. epidermidis is
         novobiocin-SENSITIVE, the inverse fact this same test yields) extends
         rather than duplicates it; find-existing.mjs "novobiocin" confirmed
         no separate epidermidis-specific record exists.

    B. docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-
       concepts.md (MUST's own Year-1 Foundation module, a different lane's
       unimported file within this same university) — 1 id:
       - CON-INF-D5C29272FC4BC9, "Benzathine penicillin prevents recurrent
         rheumatic fever" — M1-Q20 (standard prophylaxis) and M1-Q30 (the
         penicillin-allergic alternative, erythromycin) both extend this one
         prophylaxis concept rather than mint a second; find-existing.mjs
         "rheumatic fever" surfaced it directly.

  Per 00-START-HERE.md §3 (module_subject fully replaces on every write — no
  '+' form there): every row restates '## label' verbatim; 'module_subject'
  restates the source's existing line(s) plus MUST-CVS-201's own.
  '## universities', '## learner_years' and '## modules' are true ID-list
  columns and take '+must' / '+2' / '+MUST-CVS-201' — the FHB-102-2 row is
  already 'must' so it takes only '+2' and '+MUST-CVS-201', not '+must'.

  Sibling docs/MUST-Source-Imports/pending-live/MUST-CVS-201-microbiology-questions.md
  carries the 7 MCQs that depend on these 3 concepts — see that file's own
  header and pending-live/INDEX.md for the apply order.

  Simulate together with the source file each block targets, e.g.:
    node scripts/content/gate.mjs simulate \
      docs/import-ready/concept/ASU-INF-microbiology-concepts.md \
      docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md \
      docs/MUST-Source-Imports/pending-live/MUST-CVS-201-microbiology-concepts-overlay.md
-->

# Item

## id
CON-INF-2E4D9F498F4B12

## label
Streptococcus viridans, part of normal oral flora, causes infective endocarditis after dental procedures

## modules
+MUST-CVS-201

## module_subject
ASU-INF > Microbiology > Lectures > Clinical bacteriology (Chapter 6)
MUST-CVS-201 > Microbiology > Infective Endocarditis > Viridans Streptococci

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested 4 times across MUST-CVS-201's two Microbiology EOM papers as the "most common cause of subacute endocarditis" fact (M1-Q2, dental-extraction-in-prior-rheumatic-valve-disease vignette; M1-Q17, wisdom-tooth-extraction-in-congenital-heart-disease vignette; M2-Q1/M2-Q3, direct recall and a poor-dental-hygiene vignette) and once as the "normal oropharyngeal flora" fact (M2-Q29) — all already stated in this concept's own definition. src_89011691408ee232b5ff p1,4; src_79f275c14b581a4187c2 p1,3,8.

---

# Item

## id
CON-INF-C0123F8DDE0DAA

## label
Staphylococcus saprophyticus is differentiated from other coagulase-negative staphylococci by novobiocin resistance

## modules
+MUST-CVS-201

## module_subject
ASU-INF > Microbiology > Lectures > Clinical bacteriology (Chapter 6)
MUST-CVS-201 > Microbiology > Infective Endocarditis > Coagulase-Negative Staphylococci

## universities
+must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.6

## field_notes
must: Tested as M1-Q4, "A patient with a prosthetic valve develops subacute bacteremia. The organism grows as non-hemolytic, catalase positive, coagulase negative colonies and is novobiocin-sensitive. What is the organism?" — printed answer: Staphylococcus epidermidis. This concept's own definition already names S. epidermidis as the organism this same novobiocin test distinguishes S. saprophyticus FROM ("distinguished from other coagulase-negative staphylococci, such as S. epidermidis, by its resistance to ... novobiocin"); the question tests the inverse read of the identical test (epidermidis = sensitive), an extension of the stated fact rather than a new one. find-existing.mjs "novobiocin" returned no separate epidermidis-specific record. src_89011691408ee232b5ff p2.

---

# Item

## id
CON-INF-D5C29272FC4BC9

## label
Benzathine penicillin prevents recurrent rheumatic fever

## modules
+MUST-CVS-201

## module_subject
MUST-FHB-102-2 > Pharmacology > Antimicrobials > Long-acting penicillins
MUST-CVS-201 > Microbiology > Rheumatic Fever > Secondary Prophylaxis

## universities
must

## learner_years
+2

## exam_weight_by_year
MUST_Y2=0.7

## field_notes
must: Tested twice in Microbiology tranche 5 as the RF secondary-prophylaxis fact: M1-Q20 (standard regimen, "most appropriate long-term prophylaxis is: monthly long-acting penicillin injections") and M1-Q30 (penicillin-allergic vignette, "long-term management to prevent recurrent rheumatic fever ... oral erythromycin for secondary prophylaxis") — both are prophylaxis-regimen facets of this one concept, the allergy-alternative extending rather than duplicating the standard-regimen fact this concept's own definition already states. universities is already 'must' from FHB-102-2's own record (a different MUST lane), so this row takes only '+MUST-CVS-201' and '+2', not '+must'. find-existing.mjs "rheumatic fever" surfaced this record directly. src_89011691408ee232b5ff p4,6.
