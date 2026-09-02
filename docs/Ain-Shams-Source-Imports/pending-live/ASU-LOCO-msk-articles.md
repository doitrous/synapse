<!--
  Sparse updates for ASU-LOCO (Locomotor System, ASU_Y1 Term 2) onto library
  articles that exist only in other lanes' unimported batches, per LANE-BRIEF.md
  Section 6 minting ruling applied to articles: the same medical article a
  question's main_concept needs already exists in Kasr Year 1 (and one from
  Alexandria Year 1); this batch only adds the ASU university/year/module tags
  so ASU students can see it, rather than authoring a duplicate article for
  content already fully covered.

  Backs the 20 physiology + 5 biochemistry concepts already sparse-updated in
  ASU-LOCO-msk-physiology.md and ASU-LOCO-msk-biochemistry.md (same folder).

  Validate with:
    npm run medical:batch -- docs/Ain-Shams-Source-Imports/pending-live/ASU-LOCO-msk-articles.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-physiology.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-vitamins-nerve.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-histology.md \
      --with docs/Kasr-Source-Imports/article/102-INT-biochemistry.md \
      --with docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-purine.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md

  Do not apply this file until the target file each record names is live.
-->

# Item

## id
ART-103-PHY-SKELETAL-MUSCLE-EC-COUPLING

## title
From the T tubule to the uncovered actin site: excitation–contraction coupling and the fibre types

## summary
A muscle fibre is too thick for a surface signal to reach its middle by diffusion, and excitation–contraction coupling is the machinery that solves that problem. The T tubule carries the action potential into the depth of the fibre; its voltage sensor opens a calcium channel on the sarcoplasmic reticulum lying against it; calcium binds troponin C; tropomyosin moves off the actin site; and the cross-bridges attach. Relaxation is the same sequence run backwards, and it needs a pump. The second half of the article is the fibre-type table, which is examined constantly and is nearly always asked as an EXCEPT question, because the two columns are each other’s negatives.

## sections


## subject
msk

## topic
Cell and membrane physiology

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-mcq-vitamins-nerve.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-mcq-vitamins-nerve.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## title
Skeletal muscle: organisation, the fibre, and the sarcomere

## summary
A skeletal muscle is not a single structure but three nested connective-tissue coats holding together bundles of long, striated, multinucleated fibres, and each fibre is itself a stack of sarcomeres — the true contractile unit, defined precisely as the segment between two Z lines, whose named bands and lines are a direct map of where its actin and myosin filaments sit. That sarcomere lattice is read out by the triad tubular system: a T-tubule at every A-I junction, flanked by two terminal cisternae, spreads depolarisation from the surface into the fibre's depth and triggers the calcium release that starts the sliding described above.

## sections


## subject
msk

## topic
Basic tissues

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-histology.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-histology.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## title
Generating tension in skeletal muscle

## summary
Tension is the force a muscle develops when it contracts, and it is produced by cross-bridges cycling through four steps: bind, bend, detach, reset. Calcium starts the cycle by uncovering the active site on actin; ATP is what ends each turn of it, because a cross-bridge cannot let go of actin until a fresh ATP replaces the ADP and phosphate on the myosin head. That is why a muscle without ATP goes stiff rather than limp.

## sections


## subject
msk

## topic
Cell and membrane physiology

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-physiology.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-physiology.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-PHY-SKELETAL-STRUCTURE-RESPONSE

## title
Skeletal muscle: structure, contractile proteins, and its electrical, all-or-none and twitch response to stimulation

## summary
The body holds over four hundred voluntary skeletal muscles, whose contraction depends entirely on their nerve supply and which together produce locomotion, posture, heat and venous return. Myosin's two heavy chains form the flexible cross-bridge heads that will later cycle against actin, whose active site tropomyosin covers at rest — held there by the three troponin subunits, I, T and C. The muscle fibre's own action potential resembles the nerve's but finishes well before contraction does, which is why skeletal muscle, unlike cardiac muscle, can be tetanised. A single fibre obeys the all-or-none law exactly as a nerve does, and the muscle twitch is the smallest unit of mechanical response that one action potential produces.

## sections


## subject
msk

## topic
Cell and membrane physiology

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-physiology.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-physiology.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-PHY-CONTRACTION-TYPES

## title
Isometric and isotonic contraction, defined and compared

## summary
Isometric and isotonic contraction are defined by the same experimental setup with one variable changed: a heavy load that the muscle cannot lift produces isometric contraction, where the whole muscle's length stays fixed while its internal sarcomeres shorten and stretch the series elastic component instead; a lighter load produces isotonic contraction, which starts isometric and then shortens once tension is enough to lift it. The book compares the two across seven properties, including a stated mechanical efficiency of zero for isometric and 20 to 25 percent for isotonic contraction. This whole heading is excluded from the 2025-2026 final theoretical exam, but every later heading on grading, length-tension and load-velocity in this module assumes it.

## sections


## subject
msk

## topic
Cell and membrane physiology

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-physiology.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-physiology.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-PHY-GRADING-LENGTH-LOAD

## title
Grading skeletal muscle contraction: motor units, length-tension, and load-velocity

## summary
A whole skeletal muscle grades its response by two mechanisms that leave the single-fibre all-or-none law untouched: recruiting more motor units as stimulus strength rises, and summating twitches into tetanus as stimulation frequency rises, with Treppe adding a separate, rest-dependent rise in twitch size of its own. How much tension a fully activated fibre can develop then depends on two more variables the book plots as curves: its own sarcomere length, peaking at about 2.2 micrometres of optimal filament overlap, and, for an isotonic contraction, the afterload it must lift, which slows and shortens shortening as it rises.

## sections


## subject
msk

## topic
Cell and membrane physiology

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-physiology.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-physiology.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-PHY-FATIGUE-METABOLISM

## title
Muscle fatigue and the three energy systems that power contraction

## summary
Muscle fatigue weakens and prolongs contraction and leaves relaxation incomplete, from four causes: metabolite build-up, substrate depletion, impaired junctional transmission, and interrupted blood flow. Behind it is a strict sequence of three ATP-regeneration systems, each one taking over as the last runs out: the phosphagen system, powering the first 10 to 15 seconds; the glycogen-lactic acid system, adding 30 to 40 more; and the aerobic system, sustaining activity indefinitely as long as nutrients and oxygen hold out. The oxygen debt is the extra oxygen consumption paid back afterward to restore what the first two systems used up.

## sections


## subject
msk

## topic
Cell and membrane physiology

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-physiology.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-physiology.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-PHY-INJURY-DEATH

## title
Muscle activity, injury and death: electromyography, hypertrophy, denervation and rigor mortis

## summary
Four short topics close the department book's account of skeletal muscle. Electromyography records electrical activity by surface disc or needle electrode. Hypertrophy thickens existing fibres, with fibre number unchanged. Denervation runs through a fixed sequence — atrophy, then visible fasciculation from the dying nerve, then invisible fibrillation from the muscle's own hypersensitivity to acetylcholine — each stage distinguished by cause and by which EMG electrode can detect it. Rigor mortis is the same ATP-detachment mechanism already seen in a living, fatigued muscle, made permanent by death, and it has a stated forensic use.

## sections


## subject
msk

## topic
Cell and membrane physiology

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-physiology.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-physiology.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX

## title
Proteins of extracellular matrix

## summary
This chapter is off the 2025/2026 written paper and was a four-mark question on the 2024 one, so read it knowing which exam you are sitting. What it teaches is one idea done twice: a fibrous protein's job is written into its structure. Collagen is built for tightness at every level — three residues per turn, glycine every third position, left-handed chains in a right-handed superhelix, hydroxyproline hydrogen bonds, covalent cross-links — and is therefore supportive. Elastin is built from a single chain with desmosine cross-links in every direction and is therefore elastic. Cartilage and bone are then read as collagen plus a named non-collagenous protein each.

## sections


## subject
msk

## topic
Biochemistry

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (102-INT-biochemistry.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/102-INT-biochemistry.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-101-HIS-CONNECTIVE-TISSUE-FIBRES

## title
Connective tissue fibres

## summary
Three fibres, and the book separates them on four things at once: the protein they are made of, the cell that makes them, what they look like by light microscopy, and — the part the paper leans on hardest — which stain shows them. Collagen is the strongest and the most abundant, elastic is the one that recoils, and reticular is the one that is invisible in haematoxylin and eosin and has to be found with silver.

## sections


## subject
msk

## topic
Connective tissue

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (101-ISK-histology-2.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/101-ISK-histology-2.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-BIO-PURINE-SYNTHESIS-AND-SALVAGE

## title
Purine nucleotide synthesis: building the ring from scratch, and salvaging it back

## summary
A cell gets its purine nucleotides two ways, and the whole chapter turns on the difference. De novo synthesis builds the ring atom by atom onto a ribose phosphate, drawing on five sources of which only three donate nitrogen, and it is expensive. Salvage takes a base the body has already made and returns it to the nucleotide pool in a single step, and in the brain and in red cell precursors it is the major route. One substrate, PRPP, feeds both, and it is where the pathway's brakes are set — which is why a defect in salvage raises uric acid from two directions at once.

## sections


## subject
msk

## topic
Molecular biology

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-mcq-purine.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-mcq-purine.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.

---

# Item

## id
ART-103-BIO-BIOENERGETICS-AND-HIGH-ENERGY-BONDS

## title
Bioenergetics: high-energy bonds, the ATP–ADP cycle, and making ATP without the chain

## summary
Everything in bioenergetics hangs off one number. A bond that yields 7.3 kcal per mole or more on hydrolysis is called high energy, and that figure is exactly what each of ATP's two terminal pyrophosphate bonds releases — so ATP sets the standard by which every other bond is judged. From there the chapter is short: catabolism makes ATP, anabolism spends it, the cell holds only seconds of it and stores the surplus in muscle as creatine phosphate, and there are precisely three reactions in the whole of metabolism that make ATP without the respiratory chain.

## sections


## subject
msk

## topic
Biomolecules

## universities
+asu

## years
+ASU_Y1

## module
+ASU-LOCO

## field_notes
titleSummarySubjectTopic: Restated verbatim from the source article record (103-BMS-mcq-carbohydrate.md) because the batch validator requires these fields on every row regardless of update status; not a content change.
arabicTitle: Not reviewed; left empty rather than guessed (restated omission from the source record).
targetFile: docs/Kasr-Source-Imports/article/103-BMS-mcq-carbohydrate.md
asuTeaching: ASU Year 1 Locomotor (Term 2) tests this article's concepts directly in its Physiology or Biochemistry Locomotor MCQ papers; no ASU-specific variance from the source text found.
