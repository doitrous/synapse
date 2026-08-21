<!--
  Module 103 BMS — the subject tree, taken from the department's own books.

  Sources, one book per subject, all four in the manifest:

    Dpt book Anatomy Lower Limb 103.pdf                      src_23c95ac89b6b113bd58e  119 p
    Dpt book Biochemistry 103.pdf                            src_300847a5fa64809d6c07  160 p
    Dpt book Final Book of Histology (BMS 103) 2026 1st Year  src_2bf25a6864c9f6ce3283   48 p
    Dpt Book Physiology 103.pdf                              src_59643edb9d371bcefa2c   51 p

  The four subjects are not a guess. `y1/103 BMS/` carries four empty subject
  folders — Anatomy, Biochemistry, Histology, Physiology — and the manifest
  records each as a declaration (`moduleSubjectDeclarations`). One department
  book exists per declared subject, which is the four agreeing with each other.

  Beneath each subject the structure reproduces that book's own chapters and
  sections, as the programme requires. Where a book names a section, that is a
  node; where it does not, there is none. Nothing here is invented, and where a
  book is unclear the ambiguity is recorded below rather than resolved silently.

  Marks are recorded only where a source states them. Only one subject's marks
  were ever written down: the Anatomy department's own orientation
  ("Orientation of final Anatomy Exam (End of Year, 2025-2026)") gives module 103
  Anatomy 35 marks at end of year, broken down as "5 SAQ, 6 marks each with total
  30 mark" plus "1 case, 5 marks". Biochemistry, Histology and Physiology carry
  no mark, because no document in the corpus states one — not a number inferred
  from making the four add up.

  Import: Academic Setup › Import. `[103 BMS]` resolves onto the catalogue's
  existing `103 BMS` (src/data/universities.ts:111); it does not create a second
  module.

  ── Where the books are unclear, and what was done ──────────────────────────

  ANATOMY. The book has no table of contents; it opens on "CHAPTER 1". The ten
  chapters come from its own `CHAPTER n` markers and the region title printed at
  each chapter head. Chapter 9 prints no title at all, so its first major
  heading, "Veins of the Lower Limb", names it — flagged, because that is a
  reading and not the book's word. The chapter also covers lymph drainage, which
  is why that is its one listed child. The book's own numbering is unreliable
  and is not reproduced: it letters "(A)" and "(C)" in General Topics with two
  unlettered headings between them, and numbers the leg compartments [1], [2],
  [2]. Pure ordinal prefixes are stripped throughout so a `module_subject` path
  matches on the name rather than on a typo.

  A heading on p22 — "Nerve of medial (adductor) compartment of thigh" — is
  overprinted by a figure and unreadable as printed, so it is not a node; its
  content sits under Obturator nerve (p23).

  HISTOLOGY. The book numbers its four chapters I, II, II, III — "Chapter II"
  twice, and no chapter IV. The nodes below are the chapters' subject names, so
  the misnumbering does not propagate. Its LIST OF CONTENTS is substantially
  incomplete: it names 13 sections where the chapters print 26, and the tree
  follows the chapters rather than the contents page.

  BIOCHEMISTRY. The book has a CONTENTS page naming ten chapters, and it is
  accurate. Its sections were read off a single consistent heading style rather
  than by eye. Two things are worth a reviewer's attention. "Citric acid cycle"
  has **no children** — the chapter prints no section headings at all, only the
  run-in labels (Definition, Site, Steps, Importance, Regulation) that the book
  also uses one level further down inside Glycolysis, so promoting them would
  have made them siblings of Glycolysis. And in four chapters a bare
  classification label was skipped in favour of the topics beneath it, where the
  label's entire content was those topics — so Vitamins lists the vitamins
  rather than "Fat Soluble" and "Water Soluble".

  Eleven biochemistry items are cancelled for both the end-of-module and the
  final exam by the department's own orientation, among them the whole Uronic
  Acid Pathway, Metabolic Integrations, and Biosynthesis of heme & Porphyria.
  They stay in the tree for the same reason the excluded physiology topics do.

  PHYSIOLOGY. Every one of the book's 51 pages carries the running head "Nerve
  and Muscle" and no other part title appears, so that is a level of its own —
  this book is one part of physiology, not the whole subject, and flattening it
  would claim the module teaches no other physiology.

  Its divisions were read off the book's own typography, since it has no
  contents page: a boxed centred red title is a division, a left-margin dark-red
  heading is a section. "Smooth Muscles" is boxed exactly like the numbered
  divisions but carries no numeral, and the book's numbering stops at IV. It is
  placed as a fifth division, on the typography. The competing reading — that it
  is the second half of "Physiology of the Muscle", paired with "Skeletal
  Muscles" — is recorded here so a reviewer can overrule the call without
  re-deriving it.

  Seven physiology topics are excluded from the 2025-2026 final theoretical
  exam by the department's own announcement, including the whole of "Transport
  through the cell membrane". They stay in the tree: the tree is what the
  department teaches, and what is examinable in one sitting is a different
  question, carried on the items themselves.
-->

# Year 1
## Term 1
- Biomedical Sciences [103 BMS]
  - Anatomy (written EOY 35)
    - The Thigh
      - Front and Medial Side of Thigh
      - Fasciae of the thigh
      - Muscles of Front of Thigh
      - Muscles of the Medial Compartment of Thigh
      - Femoral Triangle
      - Adductor canal
      - Lumbar Plexus
      - Nerve of anterior compartment of thigh (Femoral nerve)
      - Saphenous nerve
      - Femoral Artery
      - Profunda Femoris Artery
      - Anastomoses of femoral artery
      - Femoral Vein
      - Obturator nerve
      - Obturator Artery
    - The Gluteal Region
      - Muscles of the Gluteal Region
      - Structures deep to the gluteus maximus
      - The Six Lateral Rotators of the Hip Joint
      - Arteries of Gluteal Region
      - Nerves of Gluteal Region
      - Ligaments of Gluteal Region
      - Foramina of Gluteal Region
      - Sacral Plexus
      - Sciatic Nerve
    - Muscles of the Back of Thigh
      - Hamstring muscles
    - Popliteal Fossa
      - Popliteal Artery
      - Anastomosis around the knee
      - Popliteal Vein
      - Tibial Nerve (Medial popliteal nerve)
      - Common Peroneal Nerve (Lateral popliteal nerve)
    - The Leg
      - Deep Fascia of the Leg (fascia cruris)
      - Muscles of the Leg
      - Muscles of the Anterior (Extensor) Compartment of the Leg
      - Anterior Tibial (deep peroneal) Nerve
      - Anterior Tibial Artery
      - Muscles of the Lateral (Peroneal) Compartment of the Leg
      - Musculo-cutaneous (Superficial Peroneal) Nerve
      - Muscles of the Posterior (Flexor) Compartment of the Leg
      - Posterior Tibial Nerve
      - Posterior Tibial Artery
      - Anastomosis around ankle
    - The Foot
      - The Dorsum of the Foot
      - Extensor Digitorum Brevis
      - Dorsalis Pedis Artery
      - The Sole of the Foot
      - Plantar Nerves
      - Plantar Arteries
    - Joints of the lower limb
      - The Hip joint
      - The Knee Joint
      - Tibio-fibular Joints
      - The Ankle Joint
      - Intertarsal Joints
      - Ligaments of the foot
      - Inversion and Eversion of Foot
    - General Topics
      - Cutaneous Innervation of the Lower Limb
      - Segmental Innervation of Skin of Lower Limb
      - Dermatomal Cutaneous Supply
      - Arches of the Foot
      - Mechanism of walking
      - Transmission of Body weight
    - Veins of the Lower Limb
      - Lymph Drainage of the Lower Limb
    - Development of Limbs
      - Steps
      - Formation of skeleton of limbs
      - Anomalies of limbs
  - Biochemistry
    - Bioenergetics
      - Generation of High Energy Phosphate Bonds
      - Reactive Oxygen Species (ROS)
    - Citric acid cycle
    - Carbohydrate Metabolism
      - Introduction to Carbohydrate Metabolism
      - Oxidation of Glucose
      - Glycolysis
      - Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)
      - Uronic Acid Pathway
      - Glycogen Metabolism
      - Gluconeogenesis
      - Blood Glucose
    - Lipid Metabolism
      - Introduction to Lipid Metabolism
      - Synthesis of Triacylglycerol
      - Catabolism of Depot Fat
      - Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)
      - Cholesterol Metabolism
      - Plasma Lipids and Lipoproteins
    - General protein Metabolism
      - Removal of Amino Acid Nitrogen
      - Metabolism of Ammonia
      - Urea Cycle
    - Individual amino acid Metabolism
      - Glycine
      - Alanine
      - Serine
      - Threonine
      - Branched Chain Amino Acids (Valine-Leucine-Isoleucine)
      - Glutamic Acid
      - Aspartic Acid
      - Arginine
      - Lysine
      - Cysteine
      - Methionine
      - Aromatic Amino Acids (Phenylalanine and Tyrosine)
      - Tryptophan
      - Histidine
      - Proline
      - Summary of Amino Acid Metabolism
      - Summary for the Metabolic Pathways of Active Acetate
    - Metabolic Integrations
      - Metabolism in the Well-Fed State
      - Metabolism in Early Fasting State
      - Metabolism in Late Fasting State
      - Metabolism in Starvation State
    - Heme Metabolism
      - Biosynthesis of Heme
      - Porphyrias
      - Heme Catabolism
      - Blood Bilirubin
      - Jaundice (Icterus or Hyperbilirubinemia)
    - Metabolism of purines and pyrimidines
      - Biosynthesis of Purine Nucleotides
      - Catabolism of Purine Nucleotides
      - Disorders of Purine Metabolism
      - Pyrimidine Metabolism
    - Vitamins
      - Vitamin A (Retinol, Antixerophthalmia)
      - Vitamin D (Calciferol, Antirachitic Vitamin)
      - Vitamin E (Tocopherols, Antioxidant vitamin)
      - Vitamin K (Antihemorrhagic Vitamin)
      - Vitamin C (L-Ascorbic Acid, Anti-Scurvy Vitamin)
      - Vitamin B1 (Thiamine, Antiberiberi)
      - Vitamin B2 (Riboflavin)
      - Vitamin B3 (Niacin, Pellagra Preventive Factor (PPF))
      - Vitamin B5 (Pantothenic acid)
      - Vitamin B6 (Pyridoxine)
      - Vitamin B7 (Biotin)
      - Vitamin B9 (Folic acid, Pteroyl glutamate)
      - Vitamin B12 (Cobalamin)
      - Summary Table for Vitamins
  - Histology
    - Cartilage
      - Hyaline Cartilage
      - Yellow Elastic Cartilage
      - White Fibro Cartilage
      - Structure of the Intervertebral Disc
    - Bone
      - Bone Coverings (Periosteum & Endosteum)
      - Bone Cells
      - Bone Matrix: Ground substance & Fibers
      - Methods of Preparation of Bone Sections
      - Classification of the Bone
      - Compact Bone
      - Cancellous (Spongy) Bone
      - Ossification (Bone Formation)
      - Intramembranous Ossification
      - Intracartilagenous Ossification
    - Muscle Tissue
      - Skeletal Muscle
      - Cardiac Muscle
      - Smooth Muscle
    - Integumentary System
      - Skin
      - Thick (Non-Hairy) Skin
      - The Epidermis
      - The Dermis
      - Thin (Hairy) Skin
      - Skin Appendages
      - Hair
      - Sebaceous Glands
      - Sweat Glands
  - Physiology
    - Nerve and Muscle
      - Transport through the cell membrane
        - Diffusion
        - Active transport
        - Vesicular transport
        - Intercellular communications
      - Physiology of the Nerve
        - The Neuron
        - Types of nerve fibers regarding myelination
        - Membrane Potential (the Basis of Excitability)
        - The Strength-Duration Curve
        - Measuring the Membrane potential
        - Resting Membrane Potential (RMP): Polarized State
        - Causes of Resting Membrane Potential: ionic basis of RMP
        - Relative Contributions of Ion Fluxes & Na+-K+ Pump to RMP
        - Action Potential
        - Nerve fiber response to adequate stimulus
        - Ionic basis of action potential
        - All or None law
        - Excitability Changes during Action Potential
        - There are two refractory periods
        - Factors that affect the excitability of the nerve
        - Conduction [Propagation] of the Action Potential
        - Orthodromic and Antidromic Conduction
        - Local excitatory state (Local Response)
        - Accommodation of Nerve Fiber
        - Nerve fiber types are classified into 3 types according to their thickness and velocity of conduction
        - Monophasic and Biphasic Action Potential
        - Action Potential in Nerve Trunk "Compound Action Potential"
        - Neurotrophins
      - Neuromuscular Transmission
        - Physiologic Anatomy of Neuromuscular Junction
        - Sequence of Events during Neuromuscular Transmission
        - Properties of Neuromuscular Transmission
        - Miniature End-Plate Potential
      - Physiology of the Muscle
        - Skeletal Muscles
        - Morphology
        - The sarcomeres
        - Tubular System
        - The Muscle Proteins
        - Changes Following Skeletal Muscle Stimulation
        - The All or None Law
        - The Muscle Twitch
        - Types of Skeletal Muscle Contraction
        - Basic differences between isometric and isotonic contractions
        - Factors Affecting Skeletal Muscle Contraction
        - Metabolic Changes Following Skeletal Muscle Stimulation
        - Electromyography
        - Muscular hypertrophy
        - Reaction of muscle to denervation
        - Rigor Mortis
      - Smooth Muscles
        - Electrical Activity of Smooth Muscle
        - Action potentials of smooth muscle occur in 2 different forms
        - Excitation-Contraction Coupling of smooth muscle
        - Control of Contractions of Smooth Muscle
        - Relation of Length to Tension: Plasticity
