<!--
  Lane W1-103-HIST. Two articles, each teaching a cluster of this lane's NEW
  concepts (the HIT-LIVE and HIT-PENDING concepts this module also tests already
  have library coverage elsewhere -- see concept/AU-MED-103-histology-concepts.md
  and pending-live/AU-MED-103-histology.md, whose sparse updates carry no
  article_ids because none is owed). related_concepts / article_ids are wired
  both directions with the concept file above.

  Gates:
    npm run medical:batch -- "docs/Alexandria-Source-Imports/article/AU-MED-103-histology-articles.md"
    npm run medical:simulate -- "docs/Alexandria-Source-Imports/article/"*.md --with docs/Alexandria-Source-Imports/concept/AU-MED-103-histology-concepts.md --emit /tmp/sim-AU-MED-103-histology-articles.json
    npm run medical:audit -- --source /tmp/sim-AU-MED-103-histology-articles.json
-->

# Item

## id
ART-HEM-AU103-RBC-BONE-MARROW

## title
Red cell ultrastructure and bone-marrow maturation of the erythroid and granulocytic series

## arabic_title

## aliases
RBC haemoglobin distribution
Erythropoiesis stages
Granulopoiesis stages
Bone marrow blood cell maturation

## subject
haem

## topic
Hematopoiesis and blood science

## subtopic
Blood cell development

## microtopic

## nanotopic

## primary_node_id
SYS-HEM-T01-S01

## secondary_node_ids
DIS-HIS-T03

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
6

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
The mature red cell packs its cytoplasm with haemoglobin more densely at the periphery than
at the centre, and it arrives at that state, and the mature granulocyte at its stainable
specific granules, only after passing through an ordered sequence of bone-marrow precursors.
Two landmarks in that sequence are worth holding separately for the erythroid line — the last
stage able to divide, and the stage at which haemoglobin synthesis is complete — and one for
the granulocytic line — the stage at which the specific granules that tell neutrophil,
eosinophil and basophil apart first appear.

## sections
### Definition
The red cell's cytoplasm on electron microscopy shows haemoglobin distributed unevenly: more concentrated at the periphery, immediately under the membrane, than in the centre of the biconcave disc.

Erythropoiesis is the bone-marrow maturation sequence that produces that cell — proerythroblast, basophilic erythroblast, polychromatophilic erythroblast, normoblast (orthochromatic erythroblast), reticulocyte, mature erythrocyte. Granulopoiesis is the parallel sequence for the granulocytes — myeloblast, promyelocyte, myelocyte, metamyelocyte, band form, segmented granulocyte.

### Mechanism
Two landmarks sit inside the erythroid series. The polychromatophilic erythroblast is the last stage capable of mitosis; the following stage, the normoblast, is the first at which haemoglobin synthesis is complete, and its acidophilic, condensed nucleus is then extruded to leave the reticulocyte.

On the granulocytic side, the promyelocyte still carries only azurophilic (primary) granules and is still producing them; at the myelocyte stage the specific (secondary) granules that distinguish a neutrophil from an eosinophil from a basophil first appear, alongside a fall in basophilia and a rise in eosinophilia in the cytoplasm as those granules accumulate.

### Key determinants
Which stage a cell has reached is read from three things together: whether the nucleus can
still divide, how condensed and how acidophilic that nucleus is, and — for the granulocytic
line — whether specific granules are present yet alongside the primary ones. Reading only one
of these misplaces a cell in the sequence.

### Clinical significance
A blood film that shows an excess of any one stage — a shift to more nucleated red-cell
precursors, or to more band and metamyelocyte forms among the white cells — is read as a
"shift" in the corresponding marrow line, the everyday histological handle on marrow stress
that a full haematology work-up later characterises numerically.

## published_summary

## published_sections

## hold_these
Haemoglobin sits more densely at the red cell's periphery than at its centre — a distribution fact, separate from why the cell is flexible.
The polychromatophilic erythroblast is the last erythroid stage that can still divide; the normoblast one stage later is the first with complete haemoglobin synthesis.
A granulocyte's specific (secondary) granules first appear at the myelocyte stage, not the promyelocyte stage before it.

## lose_the_mark
Treating "why is the red cell flexible" (its biconcave shape, its cytoskeleton) and "where is the haemoglobin concentrated" as the same fact — they are tested as two separate questions on the same MED 103 paper.
Placing the specific-granule landmark at the promyelocyte stage instead of the myelocyte stage that follows it.

## callout_evidence

## related_concepts
CON-HEM-786A979CC7B733
CON-HEM-2D18E46BA15483
CON-HEM-A4B2A60B89E976
CON-HEM-23E454BD997B29
CON-HEM-D86697439C5923

## related_articles

## question_ids

## resource_ids
src_31fc3d2567adf6ff8074

## article_source_ids
src_31fc3d2567adf6ff8074

## claim_ids
CLM-3817DFB7BAB3
CLM-D38B2A6CA678
CLM-28028B8512F4
CLM-5FE9685AC3FD
CLM-E744661125F3
CLM-043812B52539

## span_ids
SPN-AU103-RBC-BONE-MARROW-01
SPN-AU103-RBC-BONE-MARROW-02

## universities
au

## years
AU_Y1

## module
+AU-MED-103

## university_notes
au: Taught from the department's own Histology notes (Dr Iman Nabil, "Histology of the Blood, Immune & Lymphoid system"), which is the only Histology teaching text this module's corpus carries — no separate textbook resource is catalogued for it.

## annotations
### definition_of · CON-HEM-786A979CC7B733
Quote: The red cell's cytoplasm on electron microscopy shows haemoglobin distributed unevenly: more concentrated at the periphery, immediately under the membrane, than in the centre of the biconcave disc.
Block: body

### definition_of · CON-HEM-A4B2A60B89E976
Quote: at the myelocyte stage the specific (secondary) granules that distinguish a neutrophil from an eosinophil from a basophil first appear, alongside a fall in basophilia and a rise in eosinophilia in the cytoplasm as those granules accumulate.
Block: body

## media

## media_recommendations
### image · Mature red cell EM/diagram showing peripheral haemoglobin concentration
Purpose: A student cannot see an uneven, periphery-weighted haemoglobin distribution described in prose the way a real micrograph or diagram shows it, and the exam tests this distribution directly.
Priority: strongly helpful
Status: needed
Section: Definition
Source direction: openly licensed histology atlas or electron micrograph collection
Rights: must be CC-BY or public domain

### diagram · The erythroid and granulocytic maturation series side by side
Purpose: A student cannot hold six named stages of two parallel series from prose alone, and the exam tests exactly which stage a described cell belongs to.
Priority: required
Status: needed
Section: Mechanism
Source direction: openly licensed histology atlas or the department's own bone-marrow smear photomicrographs
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Alexandria University MED 103 Histology department notes (Dr Iman Nabil), cross-checked against the module's own EOM papers for what is actually examined.

## evidence_gaps
The specific-granule landmark's claim (CLM-043812B52539) and the erythroid-stage-landmark claim (CLM-5FE9685AC3FD) are not yet citation-linked to a verbatim book span; two of the six claims above are.

## conflicts

## last_reviewed

## review_due

## notes
Written to carry this lane's three NEW concepts (Hb distribution, erythropoiesis landmarks, granulopoiesis landmarks); the RBC glycocalyx, reticulocyte-stain, platelet and megakaryocyte concepts this same paper tests already have live-state or Kasr-pending article coverage and are cross-linked here as related_concepts rather than re-taught.

## field_notes
arabicTitle: No standard Arabic rendering of this specific ultrastructure/maturation topic is in undergraduate use in Egypt; students use the English stage names throughout.
aliases: Filled above.
relatedArticles: No further-reading article exists yet for this specific new topic; [clear] was removed per LANE-BRIEF Sec21 (related_articles is a prose-list column and stores the literal text, not a sentinel).
questionIds: question/AU-MED-103-histology-mcq.md carries this article's id in library_ids; the importer assigns real question ids on import, so none can be listed here yet.
module: Carried on the module column above as +AU-MED-103.
microtopicId: The primary node placement (SYS-HEM-T01-S01, Blood cell development) already covers this at the right grain; a separate microtopic string would only repeat the topic/subtopic columns.
nanotopicId: No nanotopic-level distinction applies below the microtopic grain.
media: The one real media block above has no rights-cleared URL and is intentionally empty; the diagram itself is a media_recommendations request.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.

---

# Item

## id
ART-HEM-AU103-LYMPHOID-ORGANS

## title
Primary and secondary lymphoid organs, and the reticulo-endothelial system

## arabic_title

## aliases
Central versus peripheral lymphoid organs
Lymphopoiesis site
Mononuclear phagocyte system
Reticulo-endothelial system

## subject
haem

## topic
Hematopoiesis and blood science

## subtopic
Blood cell development

## microtopic

## nanotopic

## primary_node_id
SYS-HEM-T01-S01-M02

## secondary_node_ids
SYS-IMM-T01

## template_id
TPL-CONCEPT

## archetype
concept

## language
en

## learner_stage
Years 1–3 foundation

## reading_time
5

## high_yield
Core

## time_sensitive
stable

## status
Draft

## owner
Admin team

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## summary
Lymphoid organs split into a primary (central) class — the thymus and bone marrow — where
lymphocytes are made, and a secondary (peripheral) class — lymph nodes, the spleen and
lymphoid nodules such as the tonsils — where mature lymphocytes actually meet antigen and
respond to it. A separate, tissue-wide network of fixed macrophages, the reticulo-endothelial
(mononuclear phagocyte) system, contributes to the body's defences by phagocytosis rather than
by any lymphocyte-mediated mechanism.

## sections
### Definition
Lymphoid organs are divided into two functional classes. Primary (central) lymphoid organs — the thymus and bone marrow — are the sites of development and maturation of lymphocytes; this is where lymphopoiesis itself takes place.

Secondary (peripheral) lymphoid organs — lymph nodes, the spleen and lymphoid nodules such as the tonsils — are the sites where lymphoid cells meet foreign antigen and mount an immune response.

The reticulo-endothelial (mononuclear phagocyte) system is the diffuse network of phagocytic cells fixed in connective tissue and the walls of blood sinusoids throughout the body — the macrophages of the spleen, liver, lymph nodes, lungs and elsewhere.

### Mechanism
A lymphocyte's stem cell divides and differentiates in a primary organ before it ever meets
antigen — it is "made", not yet "used". Only once mature lymphocytes recirculate into a
secondary organ do they encounter antigen presented there and proliferate into effector and
memory cells. The reticulo-endothelial system's contribution is a different mechanism
entirely: its fixed macrophages phagocytose particulate matter, spent cells and
micro-organisms directly from the blood and tissues, independent of antigen recognition by a
lymphocyte.

### Key determinants
Whether an organ is primary or secondary is read from what happens inside it, not from its
size or location: a primary organ shows lymphocyte development without an antigen-driven
response, a secondary organ shows the reverse.

### Clinical significance
Removing or destroying a secondary lymphoid organ (splenectomy, lymph-node dissection) does
not stop new lymphocytes being made, because that happens in the primary organs; it does
remove a site where antigen is met and responded to, which is why post-splenectomy patients
need specific vaccination cover against encapsulated organisms.

## published_summary

## published_sections

## hold_these
Lymphopoiesis — lymphocytes actually being made — happens in the primary lymphoid organs (thymus, bone marrow), not the secondary ones.
The reticulo-endothelial system defends by phagocytosis, carried out by tissue macrophages, not by a lymphocyte response.

## lose_the_mark
Calling a lymph node or the spleen a site of lymphopoiesis because lymphocytes are found there in large numbers — they are present and responding, not being made.
Describing the reticulo-endothelial system's defensive role in terms of antibody or lymphocyte action rather than phagocytosis.

## callout_evidence

## related_concepts
CON-HEM-2C5153657AD1AE
CON-HEM-157B01DD5EAEB6

## related_articles

## question_ids

## resource_ids
src_31fc3d2567adf6ff8074

## article_source_ids
src_31fc3d2567adf6ff8074
src_49f438279b68a489aa42

## claim_ids
CLM-6B26CE70062A
CLM-9225D5FA5051
CLM-8931AA6C4CBD
CLM-D8782E0B2E51
CLM-EEFAE0E3C148

## span_ids
SPN-AU103-LYMPHOID-ORGANS-01

## universities
au

## years
AU_Y1

## module
+AU-MED-103

## university_notes
au: The primary/secondary classification is taught from the department's own Histology notes; the reticulo-endothelial system's defensive role is examined on MED 103's own EOM paper (EOM - Blood End Egyptian 1, Q25) but is not stated as a named section anywhere in this corpus's Histology notes — see the concept's own uncertainty field.

## annotations
### definition_of · CON-HEM-2C5153657AD1AE
Quote: Primary (central) lymphoid organs — the thymus and bone marrow — are the sites of development and maturation of lymphocytes; this is where lymphopoiesis itself takes place.
Block: body

## media

## media_recommendations
### diagram · Primary versus secondary lymphoid organs, mapped onto the body
Purpose: A student cannot hold which of five named organs belongs to which class from prose alone, and the exam tests the classification directly.
Priority: strongly helpful
Status: needed
Section: Definition
Source direction: openly licensed immunology or histology atlas
Rights: must be CC-BY or public domain

## publication_gate
needs_evidence

## evidence_basis
Alexandria University MED 103 Histology department notes (Dr Iman Nabil) for the primary/secondary classification; the module's own EOM - Blood End Egyptian 1 paper for the reticulo-endothelial system's tested role, recorded as a paper-only source because this corpus's Histology notes do not name it as a section.

## evidence_gaps
The reticulo-endothelial-system claims (CLM-D8782E0B2E51, CLM-EEFAE0E3C148) are supported only by the EOM paper's one-word keyed answer ("defenses"), not by a department-book paragraph naming the system — see the concept's own uncertainty field. No span is yet built from either.

## conflicts

## last_reviewed

## review_due

## notes
Written to carry this lane's two remaining NEW concepts (lymphoid-organ classification, reticulo-endothelial system); the thymus's own special-features fact and the monocyte/macrophage concept are cross-linked as related_concepts because a MED 103 paper tests both alongside these two.

## field_notes
arabicTitle: No standard Arabic rendering of this classification is in undergraduate use in Egypt; students use the English "primary/secondary lymphoid organ" and "reticulo-endothelial system" terms.
aliases: Filled above.
relatedArticles: No further-reading article exists yet for this specific new topic; [clear] was removed per LANE-BRIEF Sec21 (related_articles is a prose-list column and stores the literal text, not a sentinel).
questionIds: question/AU-MED-103-histology-mcq.md carries this article's id in library_ids; the importer assigns real question ids on import, so none can be listed here yet.
module: Carried on the module column above as +AU-MED-103.
microtopicId: The primary node placement (SYS-HEM-T01-S01-M02, Leukopoiesis) already covers this at the right grain.
nanotopicId: No nanotopic-level distinction applies below the microtopic grain.
media: No rights-cleared asset exists yet; the one need is requested above instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
