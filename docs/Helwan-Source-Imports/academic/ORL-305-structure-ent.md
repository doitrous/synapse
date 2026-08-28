<!--
  Module ORL 305 — ENT subject tree, taken from the department book's own
  page-by-page headings.

  Primary source (../manifest/helwan-y1-3-sources.json):

    `DPT BOOK - ENT department book edited by Pharmaga V3.PDF` (80 pages, native
    text), manifest source ID src_96d65f2bcf840ec58bb9, marked
    isDepartmentBook: true — the primary, examinable syllabus per the lane brief.

  Cross-checked against `ENT2026.pdf` (87 pages, OCR), source ID
  src_abbc57c082a786ae9121, "Manual of ENT" by the ENT Department, Cairo
  University — its own printed Table of Contents (page 3) names exactly the
  same nine top-level sections the department book's page headings fall into:
  Notes of Ear disorders / Notes of Ear symptoms / Notes of Nose PNSs
  disorders / Notes of Nose PNSs symptoms / Notes of Larynx disorders / Notes
  of Larynx symptoms / Notes of Pharynx and Esophagus disorders / Notes of
  Pharynx and Esophagus symptoms / Notes of Head and Neck swellings. That
  agreement between the two books is why those nine headings, not an invented
  grouping, are the second-level nodes below.

  The department book itself does not print numbered chapter headings — it is
  organised as one disease or symptom per page (occasionally two or three
  side by side in a table layout). Each page's own bold title is reproduced
  here as a leaf under the "Notes of ..." section it physically sits in,
  in the order the book prints them. Nothing below the "Notes of ..." level
  is invented grouping; it is the book's own running order.

  Five pages (6-10) extracted as empty text — image/diagram-only pages between
  "Tumors of the Ear" and "Fungal otitis externa (otomycosis)" — and are not
  represented as headings because no heading text exists to reproduce.

  A few page titles are printed in a two- or three-column layout and the title
  of the second/third column runs on into body prose without a clean break in
  extraction (e.g. p.40 "Acute Sinusitis It is acute inflammation..."). Where
  that happened the disease name itself is reproduced and the run-on prose is
  dropped; see `coverage/ORL-305-ent-coverage.md` (to follow) for the page
  numbers this affects, so a later author can check the original PDF rather
  than trust OCR/column-split alone.

  p.63 "Subglottic Stenosis" prints after "Notes on LARYNX symptoms" (p.62) in
  the book's own page order, ahead of the Pharynx and Esophagus section. It is
  kept where the book places it rather than moved to the disorders section,
  because the book's own running order is what this file reproduces.

  p.66 ("N.B. The pharynx is divided...") and p.36 ("Investigations CT and
  MRI"), p.32 ("Causes:") and p.42 ("Cavernous Sinus Thrombosis.") are
  continuation prose/sub-points of the preceding page's topic rather than new
  disease headings, and are folded into the parent line above rather than
  given their own bullet.

  Marks are not recorded anywhere in this tree: neither source PDF states an
  EOM/EOY split by page, and `تحديدات الدكتور مسعد ENT.pdf` (the examiner's
  scope sheet, source ID src_a90ab9a3fb828a32b968) is exam *scope* signal, not
  a marks table — see `exam_signal` / `university_notes` on the concepts and
  articles it touches, not this file.

  Module id `HU-ORL-305`, learner year `HU_Y3` (`learner_years: 3`). This file
  covers the ENT subject only; a sibling lane owns
  `academic/ORL-305-structure-ophthalmology.md` and the orchestrator merges
  the two into one module tree.

  Import: Academic Setup › Import, university `hu`. `- ORL 305 [HU-ORL-305]`
  resolves onto the catalogue's `HU-ORL-305` module; it does not create a
  second module. Subject label stays "ENT" as the faculty's own folder names
  it — subject/system placement (`inf`, `neuro`, `resp`, or the organ-system
  file that already holds ear/nose/throat anatomy) is decided per concept at
  mint time per the lane brief's subject/code law, not here.
-->

# Year 3
## Term 1 (or 2 — the corpus does not state which term ORL 305 sits in)
- ORL 305 [HU-ORL-305]
  - ENT
    - Notes of Ear disorders
      - Congenital Ear Diseases
        - Congenital auricular malformation (macrotia to microtia/anotia)
        - Accessory Auricle
        - Protruding ear (bat ear)
        - Preauricular sinus / cyst
        - Congenital EAC atresia
      - Traumatic Ear Diseases
        - Rupture of tympanic membrane
        - Auricular Hematoma
        - Otitic Barotrauma
        - Foreign Body (FB) of the Ear
        - Acoustic (noise) trauma
      - Tumors of the Ear
        - Exostosis
        - Glomus tumors (Paraganglioma / Chemodectoma)
        - Acoustic Neuroma (vestibular schwannoma)
      - Fungal otitis externa (otomycosis)
      - Herpes zoster oticus (Ramsay Hunt Syndrome)
      - Otitis Media
      - Mucosal Chronic Suppurative OM (= Squamous chronic suppurative OM = Unsafe/Safe CSOM)
      - Complications of suppurative otitis media
      - Otitis media with effusion (OME) (= Secretory otitis media = Glue ear)
      - Facial nerve palsy
        - Clinical picture of LMNL facial palsy
      - Otosclerosis
      - Vestibular Neuritis
      - Ear Wax
      - Ear Operations
        - Myringotomy
    - Notes of Ear symptoms
      - Hearing loss (Deafness)
      - Audiological Evaluation
        - Tuning fork tests (Rinne test)
      - Tympanometry
      - SNHL in children
      - Dizziness and vertigo
      - Nystagmus
      - Otorrhoea (Ear Discharge)
      - Otalgia (Earache — Ear pain)
    - Notes of Nose PNSs disorders
      - Congenital Anomalies of the Nose
        - Choanal Atresia
      - Traumatic Conditions of the Nose
      - CSF Rhinorrhoea
      - Tumors of the Nose and Paranasal Sinuses
        - Papilloma (Wart)
        - Inverted papilloma (Schneiderian papilloma)
      - Inflammatory conditions of the Nose
        - Chronic Hypertrophic Rhinitis
        - Atrophic Rhinitis (Ozaena)
        - Chronic specific rhinitis
      - Acute Sinusitis
      - Chronic Sinusitis
        - Complications of Sinusitis (Orbital / Intracranial / Cranial)
        - Cavernous Sinus Thrombosis
      - Acute Invasive Fungal Sinusitis
      - Chronic invasive fungal Sinusitis
      - Allergic Fungal Sinusitis
      - Fungal Ball
      - Diseases of the nasal septum
        - Septal hematoma
        - Septal abscess
        - Septal perforation
      - Allergic Rhinitis
      - Nasal polyps
      - Nasal operations
    - Notes of Nose PNSs symptoms
      - Epistaxis (nasal bleeding)
      - Headache and Facial pain
      - Nasal Obstruction
      - Smell Disorders
    - Notes of Larynx disorders
      - Congenital Anomalies of the Larynx
        - Laryngomalacia
      - Traumatic conditions of the Larynx
      - Tumors of the Larynx
      - Inflammatory conditions of the Larynx
        - Chronic Laryngitis
      - Laryngeal Paralysis
        - Unilateral vocal cord paralysis
        - Bilateral Abductor (vocal cord) paralysis
      - Laryngeal operations
    - Notes on Larynx symptoms
      - Hoarseness of voice (Dysphonia)
      - Subglottic Stenosis
    - Notes of Pharynx and Esophagus disorders
      - Congenital conditions of the pharynx and esophagus
        - Cleft Palate
      - Corrosive esophagitis & post-corrosive stricture
      - Peritonsillar Abscess (Quinsy)
      - Parapharyngeal Abscess
      - Acute Retropharyngeal Abscess
      - Ludwig's Angina
      - Pharyngeal tumors
        - Nasopharyngeal Carcinoma
        - Oropharyngeal tumors
        - Hypopharyngeal tumors
        - Post-cricoid carcinoma
        - Carcinoma of the esophagus
      - Miscellaneous conditions of the pharynx
        - The Occult primary (Hidden primary tumor)
        - The pharyngeal pouch (Pharyngocele / Zenker's Diverticulum)
        - Achalasia
      - Operations of the pharynx
    - Notes of Pharynx and Esophagus symptoms
      - Dysphagia
      - Snoring and Obstructive Sleep Apnea (OSA)
    - Notes of Head and Neck Swellings
      - Midline neck swellings
        - Thyroglossal cyst
        - Dermoid cyst
        - Thyroid gland isthmus swellings
        - Submental lymph node
        - Thymus gland swelling
        - Pre-laryngeal lymph node
      - Lateral neck swellings
        - Lymphadenopathy
        - Carotid aneurysm (body tumour)
        - Branchial cyst
        - Cystic hygroma
        - Salivary glands swellings
        - Thyroid gland swellings (Goiter)
        - Parapharyngeal abscess
        - Pharyngeal pouch
        - Laryngocele
