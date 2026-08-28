<!--
  103 BMS · Article evidence spans · the 18 spans the thirteen 103 BMS articles
  already name in their `span_ids`, and which nothing had yet written.

  Spans only. `detectKind` reads the first record and validates the whole file
  against it, so claims, citations and resources stay in their own files:
  103-BMS-claims.md, 103-BMS-citations.md, 103-BMS-sources.md.

  `section_id` is derived, never free text. The importer builds it in
  `parseSections(values.sections, id.toLowerCase())` as
  `<article-id-lowercased>-<slugified heading>`, deduplicated `-2`, `-3` where a
  heading repeats. So the `Structure` section of ART-103-ANA-SCIATIC-NERVE is
  `art-103-ana-sciatic-nerve-structure`, and the
  `Blood supply, innervation and lymphatics` section of
  ART-103-ANA-PERONEUS-LONGUS is
  `art-103-ana-peroneus-longus-blood-supply-innervation-and-lymphatics`. Every
  section ID below was computed from the article file with the importer's own
  slugify, not typed by hand, and every `text` was checked to appear character
  for character inside the body of the section it names. Rename a heading and
  the ID moves with it.

  `text_hash` is omitted throughout. It is derived from the text when absent, so
  a reflow of the prose cannot silently detach a span from its sentence.

  Where the article already carries a `## annotations` block whose `Quote:`
  covers the same teaching as the span, that quote is the span text — the
  importer verifies those quotes against the body, so the two records point at
  one sentence and a transcription error is impossible. Ten spans are sourced
  that way; the other eight were selected from the section prose because the
  article's annotation covered a different concept.

  Citation IDs are taken from 103-BMS-citations.md. Note that the articles'
  `callout_evidence` blocks name citations in an older `CIT-ANA103-…` /
  `CIT-KA-PHY103-…` shape that no citation record uses; the live IDs are
  `CIT-KA-ANAT-…`, `CIT-KA-HIST-…` and `CIT-KA-PHYS-…`, and those are what is
  written here. Nothing is invented: every claim and citation ID below is a
  record in the two sibling evidence files.

  Import: Admin › Evidence › Import. Spans land after articles, claims and
  citations — the order the simulator applies is
  resource → article → concept → claim → citation → span.
-->

# Item

## id
SPN-ANA-ADDUCTOR-CANAL-01

## article_id
ART-103-ANA-ADDUCTOR-CANAL

## section_id
art-103-ana-adductor-canal-structure

## text
Its contents are four: the femoral artery, the femoral vein, the saphenous nerve and the nerve to vastus medialis.

## claim_ids
CLM-MSK-ADDUCTOR-CANAL-02

## citation_ids
CIT-KA-ANAT-ADDUCTOR-CANAL-02

---

# Item

## id
SPN-ANA-PERONEUS-LONGUS-01

## article_id
ART-103-ANA-PERONEUS-LONGUS

## section_id
art-103-ana-peroneus-longus-blood-supply-innervation-and-lymphatics

## text
Peroneus longus is supplied by the musculo-cutaneous nerve, which is the superficial peroneal nerve.

## claim_ids
CLM-MSK-PERONEUS-LONGUS-01

## citation_ids
CIT-KA-ANAT-PERONEUS-LONGUS-01

---

# Item

## id
SPN-ANA-HIP-MOVEMENTS-01

## article_id
ART-103-ANA-HIP-JOINT-MOVEMENTS

## section_id
art-103-ana-hip-joint-movements-relations

## text
The muscles that produce the movements lie in three groups around the joint — the flexors in front, the gluteal group behind and laterally, and the adductors medially — and the six small lateral rotators lie deep to gluteus maximus in the gluteal region.

## claim_ids
CLM-MSK-HIP-MOVEMENTS-01

## citation_ids
CIT-KA-ANAT-HIP-MOVEMENTS-01

---

# Item

## id
SPN-ANA-POST-TIBIAL-01

## article_id
ART-103-ANA-POSTERIOR-TIBIAL-ARTERY

## section_id
art-103-ana-posterior-tibial-artery-structure

## text
The peroneal artery is the largest branch and the main supply of the leg; it runs obliquely downwards and laterally, then vertically along the back of the fibula, and ends by dividing into terminal calcanean branches on the back of the inferior tibio-fibular joint.

## claim_ids
CLM-MSK-POST-TIBIAL-BRANCHES-01

## citation_ids
CIT-KA-ANAT-POST-TIBIAL-BRANCHES-01

---

# Item

## id
SPN-ANA-SCIATIC-01

## article_id
ART-103-ANA-SCIATIC-NERVE

## section_id
art-103-ana-sciatic-nerve-structure

## text
The nerve leaves the pelvis through the greater sciatic foramen below the piriformis to enter the gluteal region.

## claim_ids
CLM-MSK-SCIATIC-COURSE-01

## citation_ids
CIT-KA-ANAT-SCIATIC-COURSE-01

---

# Item

## id
SPN-ANA-SCIATIC-02

## article_id
ART-103-ANA-SCIATIC-NERVE

## section_id
art-103-ana-sciatic-nerve-structure

## text
The articular branches go to the hip joint.

## claim_ids
CLM-MSK-SCIATIC-BRANCHES-01

## citation_ids
CIT-KA-ANAT-SCIATIC-BRANCHES-01

---

# Item

## id
SPN-ANA-CPN-01

## article_id
ART-103-ANA-COMMON-PERONEAL-NERVE

## section_id
art-103-ana-common-peroneal-nerve-structure

## text
The nerve curves behind the head of the fibula and then lies close to the lateral aspect of its neck.

## claim_ids
CLM-MSK-CPN-INJURY-01

## citation_ids
CIT-KA-ANAT-CPN-INJURY-01

---

# Item

## id
SPN-ANA-CPN-02

## article_id
ART-103-ANA-COMMON-PERONEAL-NERVE

## section_id
art-103-ana-common-peroneal-nerve-structure

## text
The cutaneous branches are two: the sural communicating nerve, which arises in the upper part of the fossa and runs inferomedially to join the sural nerve, and the lateral cutaneous nerve of the calf, which arises on the lateral head of gastrocnemius and supplies the upper third of the anterolateral side of the leg.

## claim_ids
CLM-MSK-CPN-CUTANEOUS-01

## citation_ids
CIT-KA-ANAT-CPN-CUTANEOUS-01

---

# Item

## id
SPN-ANA-CPN-03

## article_id
ART-103-ANA-COMMON-PERONEAL-NERVE

## section_id
art-103-ana-common-peroneal-nerve-clinical-correlations

## text
The motor effects are foot drop, due to paralysis of all the extensor muscles of the front of the leg, and loss of eversion of the foot, due to paralysis of the three peroneal muscles; the resulting deformity is called talipes equinovarus.

## claim_ids
CLM-MSK-CPN-MOTOR-01 | CLM-MSK-CPN-DEFORMITY-01

## citation_ids
CIT-KA-ANAT-CPN-MOTOR-01 | CIT-KA-ANAT-CPN-DEFORMITY-01

---

# Item

## id
SPN-HIS-DERMIS-01

## article_id
ART-103-HIS-DERMIS-LAYERS

## section_id
art-103-his-dermis-layers-definition

## text
The papillary layer is the thinner superficial layer and it forms the dermal papillae.

## claim_ids
CLM-DER-DERMIS-LAYERS-01

## citation_ids
CIT-KA-HIST-DERMIS-LAYERS-01

---

# Item

## id
SPN-HIS-BONE-CELLS-01

## article_id
ART-103-HIS-BONE-CELLS

## section_id
art-103-his-bone-cells-key-determinants

## text
The osteoblast arises from osteogenic cells.

## claim_ids
CLM-MSK-OSTEOBLAST-01

## citation_ids
CIT-KA-HIST-OSTEOBLAST-01

---

# Item

## id
SPN-HIS-BONE-CELLS-02

## article_id
ART-103-HIS-BONE-CELLS

## section_id
art-103-his-bone-cells-key-determinants

## text
The osteoclast is formed by fusion of mononuclear haemopoietic progenitor cells.

## claim_ids
CLM-MSK-OSTEOCLAST-01

## citation_ids
CIT-KA-HIST-OSTEOCLAST-01

---

# Item

## id
SPN-HIS-ICD-01

## article_id
ART-103-HIS-CARDIAC-INTERCALATED-DISC

## section_id
art-103-his-cardiac-intercalated-disc-mechanism

## text
So the gap junctions are placed where the force is not: the lateral component of the disc lies parallel to muscle fibres, and gap junctions are located in this segment of the disc, allowing the contraction signals to pass from cell to other.

## claim_ids
CLM-MSK-INTERCALATED-DISC-02

## citation_ids
CIT-KA-HIST-INTERCALATED-DISC-02

---

# Item

## id
SPN-HIS-SMOOTH-01

## article_id
ART-103-HIS-SMOOTH-MUSCLE

## section_id
art-103-his-smooth-muscle-mechanism

## text
It shows no T-tubules; instead there are invaginations along the cell surface, called caveolae.

## claim_ids
CLM-MSK-SMOOTH-MUSCLE-EM-01

## citation_ids
CIT-KA-HIST-SMOOTH-MUSCLE-EM-01

---

# Item

## id
SPN-PHY-AP-DEPOL-01

## article_id
ART-103-PHY-NERVE-ACTION-POTENTIAL

## section_id
art-103-phy-nerve-action-potential-mechanism

## text
In the rapid phase, at the firing level all the voltage-gated sodium channels open, the potential difference falls to zero and then reverses, so the inside becomes positive relative to the outside, to an overshoot of +35 mV.

## claim_ids
CLM-NEU-AP-DEPOLARIZATION-01

## citation_ids
CIT-KA-PHYS-AP-DEPOLARIZATION-01

---

# Item

## id
SPN-PHY-REFRACTORY-01

## article_id
ART-103-PHY-NERVE-ACTION-POTENTIAL

## section_id
art-103-phy-nerve-action-potential-key-determinants

## text
The absolute refractory period is the period during which another action potential cannot be produced, whatever the strength of the stimulus.

## claim_ids
CLM-NEU-REFRACTORY-ABSOLUTE-01

## citation_ids
CIT-KA-PHYS-REFRACTORY-ABSOLUTE-01

---

# Item

## id
SPN-PHY-TENSION-01

## article_id
ART-103-PHY-SKELETAL-MUSCLE-TENSION

## section_id
art-103-phy-skeletal-muscle-tension-mechanism

## text
Tension is then generated by the cycling of the cross-bridges, in four steps.

## claim_ids
CLM-MSK-TENSION-CROSS-BRIDGE-01

## citation_ids
CIT-KA-PHYS-TENSION-CROSS-BRIDGE-01

---

# Item

## id
SPN-PHY-SMOOTH-01

## article_id
ART-103-PHY-SMOOTH-MUSCLE-CONTROL

## section_id
art-103-phy-smooth-muscle-control-key-determinants

## text
Five groups of factors modify contraction, and the exam asks for them as a list.

## claim_ids
CLM-MSK-SMOOTH-FACTORS-01

## citation_ids
CIT-KA-PHYS-SMOOTH-FACTORS-01
