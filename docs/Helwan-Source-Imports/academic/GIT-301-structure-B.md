<!--
  Module GIT 301 (HU-GIT-301) — lane HU-GIT-301-B's four subjects only:
  Pathology, Pharmacology, Parasitology, Biochemistry. A sibling lane,
  HU-GIT-301-A, holds Anatomy, Histology and Physiology in a separate file,
  `academic/GIT-301-structure-A.md`; the orchestrator merges both into one
  module tree. Nothing below invents a subject boundary — it reproduces each
  core-notes file's own chapter/section headings, subject by subject.

  Sources, all four from ../manifest/helwan-y1-3-sources.json, moduleId
  HU-GIT-301:

    Pathology — `Patho by Dr.Passant [GIT].pdf` (172 pages), a slide deck
    titled "PATHOLOGY OF ORAL CAVITY AND GASTRO-INTESTINAL TRACT BY
    DR: PASSANT ESSAM SHIBEL". Manifest source ID src_1ecb59c30431f3d8e675.

    Pharmacology — `Pharma by Dr.TA7 [GIT].pdf` (27 pages), a Smart Vision
    Institute slide deck for the "Digestive System & Liver" chapter, printed
    under Dr. Khaled Ahmed and Dr. Mohamed Elmasry (the filename's "TA7" does
    not match either printed name; both are recorded as field_notes material
    for whoever authors from this file next, not resolved here). Manifest
    source ID src_41c01ed187d1095536ba.

    Parasitology — `Para by Dr.Kandeel [GIT][تجميعة].pdf` (8 pages), a
    تجميعة (compilation) in comparison-table form, not chapter prose. Its own
    column headers split every organism into two tables, "Parasite (IN S.I)"
    and "Parasite (IN L.I)", and those two headers are reproduced here as the
    two sections; every named organism is a row in one or the other table,
    reproduced as a leaf in the order printed. The L.I table's own rows
    include hepatobiliary and tissue organisms (Fasciola spp., Echinococcus
    granulosus, Toxocara — "visceral larva migrans") alongside true large-
    intestine organisms; that is the source's own grouping, not this file's
    judgement, so it is kept as printed. Manifest source ID
    src_ea40327a044be124034c.

    Biochemistry — `Bio by Dr.Sebaie [GIT].pdf` (12 pages), an untitled core-
    notes file whose own section breaks are reproduced below. Manifest source
    ID src_3309feea4fb9329615de.

  Judgement calls, each one made once and recorded here so a later author does
  not re-litigate it:

    - The pathology deck prints every heading in upper case. Case is
      normalised to title case for readability; wording and spelling are not
      touched. Page 140's own heading, "TEST URSELF" (its own misspelling of
      "yourself"), is a self-test slide — apparatus for revision, not a
      teaching heading — and is left out, the same way the 108 INT structure
      file drops "Formative Assessment". Pages 168-171 (Bleeding Per Rectum,
      Melena, a Peptic-Ulcer/differential-diagnosis comparison slide) are kept
      as leaves under Small and Large Intestine, because the deck devotes a
      named slide to each rather than only listing them as a differential
      table.
    - The pharmacology deck's own chapter title is "Digestive System & Liver".
      Its ILOs (p. 2) name antacids, antisecretory drugs, peptic-ulcer therapy,
      purgatives, antispasmodics and antidiarrhoeal drugs; the deck goes on to
      teach several sections the ILOs do not name (antiemetics/prokinetics,
      carminatives, emetics, IBS drugs, cholagogues/choleretics, variceal
      haemorrhage, obesity) and those are kept too, because the deck's own
      slides teach them, in the order the deck prints them.
    - Biochemistry prints its liver section header as "LIVER METABOLIM" (its
      own truncation/typo for "Metabolism"); this file corrects the case and
      the truncation to "Liver Metabolism" for the tree label only — the
      section's content headings underneath ("Role of Liver in ... Metabolism")
      are reproduced exactly as printed.

  All drug names below are the source's own; no dose, mechanism sentence or
  fact beyond a heading name is asserted by this file, and drug-class headings
  will carry `status: Draft` wherever a later batch teaches them, per the
  brief.

  Import: Academic Setup › Import, with HU as the target university. This file
  is deliberately incomplete on its own — it must be merged with lane A's
  `GIT-301-structure-A.md` (Anatomy, Histology, Physiology) before import, so
  the four subjects here do not resolve against a module missing its other
  three.
-->

# Year 3
- GIT 301 [HU-GIT-301]
  - Pathology
    - Tongue and Oral Cavity
      - Tongue Ulcers
        - Inflammatory Ulcers
        - Leukoplakia
        - Squamous Carcinoma of the Tongue
    - Salivary Glands
      - Sialadenitis
      - Salivary Gland Tumors
    - Esophagus
      - Congenital and Mechanical Disorders
      - Inflammation
      - Esophageal Tumors
        - Squamous Cell Carcinoma
        - Adenocarcinoma
    - Stomach
      - Congenital Disorders
      - Gastritis
        - Acute Gastritis
        - Chronic Gastritis
      - Acute Gastric Ulceration
      - Peptic Ulcer Disease (PUD)
      - Gastric Tumors
        - Gastric Carcinoma
          - Intestinal Type Adenocarcinoma
          - Diffuse Gastric Cancer
      - Hematemesis
    - Small and Large Intestine
      - Intestinal Obstruction
        - Acute Intestinal Obstruction
        - Chronic Intestinal Obstruction
      - Congenital Disorders
      - Malabsorption
      - Entero-colitis
        - Typhoid Fever (Enteric Fever)
        - Dysentery
          - Bacillary Dysentery (Shigella Colitis)
          - Amoebic Dysentery
      - Inflammatory Bowel Disease
        - Crohn's Disease
        - Ulcerative Colitis
      - Diverticular Disease of the Colon
      - Appendix
        - Acute Diffuse Suppurative Appendicitis
      - Colonic Polyps
      - Tumors of Small and Large Intestine
        - Adenomas
        - Adenocarcinoma of the Colon
        - Carcinoid Tumor (Argentaffinoma)
        - Lymphoma
      - Hemorrhoids (Piles)
      - Bleeding Per Rectum
      - Melena
  - Pharmacology
    - Drug Therapy of Peptic Ulcer Disease
      - Antacids
        - Physical Antacids
        - Chemical Antacids
      - Antisecretory Drugs
        - H2-Blockers
        - Proton Pump Inhibitors
        - Antimuscarinic Drugs
        - Gastrin Receptor Antagonists
      - Mucosal Protectives
      - Eradication of H. pylori
    - Antiemetics and Prokinetic Drugs
    - Digestants
    - Carminatives
    - Emetics
    - Purgatives
      - Mild Irritant Purgatives
      - Bisacodyl
      - Enemata
      - Intestinal Evacuants
    - Treatment of Diarrhoea and Oral Rehydration Therapy
    - Drugs Used in Irritable Bowel Syndrome
    - Antispasmodics (Treatment of Colic)
    - Cholagogues and Choleretics
    - Drugs Used to Treat Variceal Haemorrhage
    - Management of Obesity
  - Parasitology
    - Parasite (in S.I)
      - Heterophyes heterophyes
      - Diphyllobothrium latum
      - Hymenolepis nana
      - Taenia saginata
      - Taenia solium
      - Ascaris lumbricoides
      - Ancylostoma
      - Strongyloides stercoralis
      - Capillaria
      - Cysticercosis
      - Sparganosis
      - Trichostrongylus
      - Cyclospora
      - Cystoisospora belli
      - Cryptosporidium
      - Giardia lamblia
    - Parasite (in L.I)
      - Schistosoma mansoni and Schistosoma japonicum (Intestinal Schistosomiasis)
      - Enterobius vermicularis
      - Trichuris trichiura
      - Entamoeba histolytica
      - Balantidium coli
      - Blastocystis hominis
      - Fasciola gigantica and Fasciola hepatica
      - Halzon Syndrome
      - Echinococcus granulosus
      - Visceral Larva Migrans (Toxocara)
  - Biochemistry
    - Digestion and Absorption of Dietary Carbohydrates
      - Disorders of Carbohydrate Digestion and Absorption
        - Lactose Intolerance
        - Sucrose Intolerance
    - Digestion and Absorption of Dietary Lipids
      - Disorders of Digestion and Absorption of Lipids
        - Steatorrhea
    - Digestion of Proteins
      - Absorption of Amino Acids
      - Defects in Digestion and Absorption of Amino Acids
        - Allergy to Food Proteins
        - Celiac Disease
    - Digestion and Absorption of Nucleoproteins
    - Liver Metabolism
      - Role of Liver in Carbohydrate Metabolism
      - Role of Liver in Lipid Metabolism
      - Role of Liver in Protein Metabolism
        - Liver Function Tests Related to Protein Metabolism
      - Role of Liver in Xenobiotic Metabolism
      - Role of Liver in Vitamin Metabolism
      - Fatty Liver
