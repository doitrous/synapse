<!--
  Module GIT 301 (HU-GIT-301) — lane HU-GIT-301-A's three subjects only:
  Anatomy, Histology, Physiology. A sibling lane, HU-GIT-301-B, holds
  Pathology, Pharmacology, Parasitology and Biochemistry in a separate file,
  `academic/GIT-301-structure-B.md`; the orchestrator merges both into one
  module tree. Nothing below invents a subject boundary or a heading — each
  branch reproduces its own core-notes file's own section breaks.

  Sources, all three from ../manifest/helwan-y1-3-sources.json, moduleId
  HU-GIT-301:

    Anatomy   — `Anatomy by Dr.Jalal [GIT] بعد الحذف.pdf` (74 pages),
                manifest source src_0c7efa947426f293dd12. No text layer
                (manifest textLayer: ocr-needed, confirmed on OCR — a plain
                typed department-book-style document, no cover, no numbered
                "Chapter" headings). Read via `scripts/helwan/extract/pagetext.py`
                OCR cache, page by page.

    Histology — `Histo by Dr.Kandeel [GIT].pdf` (39 pages),
                manifest source src_1e62fff128e9282b3560. Hand-written,
                colour-coded notes; OCR of the handwriting is unusable
                (tesseract returns near-total noise on every page — confirmed
                by rendering the PDF with `pdftoppm` and reading the pages
                directly, per the "render the page and look" hazard). The
                cover (page 1, rotated 90°) reads "HISTOLOGY [Module.GIT]
                DR.KANDEEL". Headings below are transcribed by eye from a
                sample of pages spread through the file (roughly every 4th
                page, plus every page bearing a section break found that way)
                — not every one of the 39 pages was read individually, so a
                subheading that falls entirely between two sampled pages may
                be missing here. That is a stated limitation, not an
                invention: nothing below was guessed.

    Physiology — `Physio by Dr.Maher [GIT].pdf` (14 pages),
                manifest source src_57cc68a68a8e9332fd20. A continuous,
                unheaded lecture-note deck titled only "Physiology
                GASTROINTESTINAL TRACT" on its cover slide — it carries no
                chapter numbering and no department "orientation" ILO sheet
                of the kind FTF 304 has (see the FTF-304 structure file for
                what that looks like). The headings below are the source's
                own section-transition phrases, quoted or lightly cased, not
                an invented outline. Every page was read.

  Practical (Anatomy only). Two illustrated-image files exist, each an
  index of labs rather than prose:

    `Anatomy lab 1 illustrated images.pdf` (src_d088b673ad1cf8c9044d, 8p) —
    its own page 1 states "Topics: 1) Palate 2) Tongue 3) Palatine tonsils
    4) Teeth".

    `Anatomy labs 2-9 illustrated images.pdf` (src_351a963ff2461fa2e70f, 16p)
    — its own page 1 states "Topics: 1) Salivary glands 2) Anterior
    abdominal wall 3) Lumbar vertebrae 4) Esophagus 5) Stomach 6) Small &
    large intestine 7) Liver".

    A third file, `Anatomy Practical by Dr.Jala [Git&Rsp].pdf`
    (src_60453b63f268566d3639, 13p), is a viva/spotter answer sheet built
    almost entirely of radiographs, angiograms and labelled diagrams with
    short captions; several pages render upside-down or mirrored under OCR.
    It does not print topic headings of its own, so it contributes no leaf
    here — its content is for the practical/media-request pass, not the
    structure tree.

  Marks / weighting. No orientation sheet, ILO document or mark allocation
  exists anywhere in this module's Anatomy, Histology or Physiology sources
  — unlike FTF 304, which has one. This file therefore carries no mark
  annotations at all; that absence is stated once here rather than repeated
  under every heading.

  Subject placement for all three: `gi` (subject id) / `GIT` (concept
  system code), per the orchestrator's ruling that the runtime's subject ids
  are `cvs resp renal gi neuro endo msk pharm fnd dev haem imm inf obs gyn
  androl psy derm mul pop` (LANE-BRIEF), not the eight-id list in
  02-concepts.md.

  Import: Academic Setup › Import, with HU as the target university. This
  file is deliberately incomplete on its own — it must be merged with lane
  B's `GIT-301-structure-B.md` (Pathology, Pharmacology, Parasitology,
  Biochemistry) before import, so the three subjects here do not resolve
  against a module missing its other four.
-->

# Year 3
- GIT 301 [HU-GIT-301]
  - Anatomy
    - Anterior Abdominal Wall
      - Skin and Umbilicus
      - Muscles (External Oblique, Internal Oblique, Transversus Abdominis, Rectus Abdominis, Pyramidalis)
      - Rectus Sheath
      - Groin (Inguinal Region)
        - Inguinal (Poupart's) Ligament
        - Inguinal Canal
        - Hernias
          - Inguinal Hernia
          - Femoral Hernia
          - Umbilical Hernia
          - Incisional Hernia
          - Sliding Hernia
      - Vessels of the Anterior Abdominal Wall (Arteries, Veins)
      - Nerves of the Anterior Abdominal Wall
    - Abdominal Cavity
      - Abdominal Regions and Planes
      - Peritoneum and Peritoneal Cavity
      - Greater Sac
      - Lesser Sac (Omental Bursa)
      - Epiploic Foramen (Foramen of Winslow)
    - Pharynx and Oesophagus
      - Note: marked "Cancelled" in the source, except the names of the muscles and the nerve supply of the pharynx
    - Mouth Region
      - Salivary Glands
        - Parotid Gland
        - Submandibular Gland
        - Sublingual Gland
      - Tongue
    - Oesophagus (Abdominal Organs)
    - Stomach
      - Parts, Curvatures and Openings
      - Peritoneal Relations and Ligaments (Lesser and Greater Omentum)
      - Stomach Bed (Posterior Relations)
      - Blood Supply and Venous Drainage
      - Nerve Supply
    - Duodenum
      - Duodenal Recesses
      - Arterial Supply
    - Small Intestine
      - Jejunum and Ileum
      - Mesentery
    - Large Intestine
      - Caecum
      - Vermiform Appendix
      - Ascending Colon
      - Right (Hepatic) Flexure
      - Left (Splenic) Flexure
      - Descending Colon
      - Sigmoid (Pelvic) Colon and Mesocolon
    - Vessels of the Gut
      - Coeliac Trunk and Branches
      - Superior Mesenteric Artery
      - Inferior Mesenteric Artery
      - Portal Circulation
      - Portosystemic Anastomoses
    - Liver
      - Surface Anatomy
      - Surfaces and Relations
      - Peritoneal Relations, Folds and Ligaments
      - Subphrenic Spaces
      - Liver Segments
    - Extrahepatic Biliary System
      - Hepatic Ducts and Common Hepatic Duct
      - Gall Bladder and Cystic Duct
      - Common Bile Duct
    - Posterior Abdominal Wall
      - Muscles (Diaphragm, Psoas Major, Quadratus Lumborum)
      - Vessels (Abdominal Aorta and Branches, External Iliac Artery)
      - Lumbar Plexus
    - Pelvic Viscera
      - Rectum
      - Anal Canal
    - Development
      - Derivatives of Foregut Caudal Part (Oesophagus, Stomach, Proximal Duodenum, Liver, Gall Bladder, Pancreas)
      - Midgut Development
      - Tongue Development
    - Practical
      - Lab 1: Palate, Tongue, Palatine Tonsils, Teeth
      - Labs 2–9: Salivary Glands, Anterior Abdominal Wall, Lumbar Vertebrae, Oesophagus, Stomach, Small and Large Intestine, Liver
  - Histology
    - Digestive Glands
      - Salivary Glands
        - Major Salivary Glands
        - Minor Salivary Glands
      - Pancreas
        - Exocrine Acini
        - Islets of Langerhans
        - Duct System
        - Note: Diabetes Mellitus (Type I, Type II) recorded on the same page as the islets, as a clinical note
      - Liver
        - Hepatocyte (Light and Electron Microscopy, Organelles, Inclusions)
    - Digestive Tract
      - Oral Cavity
        - Oral Mucosa
        - Lips (Red Line / Vermilion, Labial Glands)
      - Tongue
        - Taste Buds (Dark/Supporting, Light/Gustatory, Basal Cells)
        - Papillae (Circumvallate, Fungiform, Foliate)
      - Alimentary Tract (Oesophagus)
        - Mucosa
        - Submucosa
        - Muscularis Externa
        - Adventitia
        - Note: clinical correlation with heartburn / reflux and metaplastic change in the lower oesophagus
      - Stomach
        - Fundic Glands
        - Note: clinical correlation with peptic ulcer and pernicious anaemia
      - Small Intestine
        - Duodenum, Jejunum and Ileum (Comparative Table: Villi, Submucosa, Goblet Cells)
        - Epithelial Cells Lining the Intestinal Mucosa (Goblet, Paneth, Absorptive/Enterocyte, Undifferentiated/Regenerative, M/Microfold, Enteroendocrine/APUD/Argentaffin)
      - Large Intestine
        - Comparison with Small Intestine (Mucosa, Submucosa, Muscularis, Serosa)
      - Anal Canal
        - Changes at the Recto-anal Junction (Anal Mucosa Zones, Anal Submucosa, Anal Musculosa, External Anal Sphincter)
  - Physiology
    - General Functions of the GIT and Basic Electrical Rhythm (Slow Waves)
    - Regulation of Gastrointestinal Functions
      - Nervous Regulation (Enteric Nervous System, Myenteric and Submucosal Plexuses, Parasympathetic and Sympathetic Supply)
      - Hormonal Regulation (Gastrin, Secretin, Cholecystokinin, GIP, VIP, Somatostatin)
    - Peristalsis (General Mechanism)
    - Deglutition (Swallowing)
    - Gastric Motility
      - Storage Function of the Stomach (Receptive Relaxation)
      - Regulation of Gastric Evacuation (Gastric Emptying)
    - Vomiting
    - Small Intestinal Motility (Segmentation, Peristalsis, Migrating Motor Complex)
    - Large Intestinal Motility and Defecation
