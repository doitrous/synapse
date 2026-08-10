# Medical library taxonomy review

Status: **approved with corrections**  
Reviewed: 2026-08-10  
Scope: the supplied UniNect medical-library blueprint, local university digestion structure, and the canonical taxonomy shipped by Synapse.

## Decision

The library should keep four connected views rather than force one hierarchy to do every job:

1. **Systems & General** — the primary student route for organ systems, foundations, life stages, infection, emergencies, and population health.
2. **By Discipline** — the university-course route for anatomy, physiology, pathology, clinical specialties, and related disciplines.
3. **Clinical Skills** — observable history, examination, interpretation, procedure, prescribing, communication, documentation, and reasoning skills.
4. **Clinical Knowledge** — a task-oriented route through presentations, investigations, management, therapeutics, emergencies, prevention, contexts, and evidence.

These are placements, not duplicate concepts. One canonical article or concept can have one primary node and any number of secondary nodes across the four views.

## Structural findings

The supplied 2,389-node blueprint had no duplicate sibling names, missing parents, or empty titles. Its roots and system-level coverage were strong and aligned well with an integrated undergraduate curriculum.

One material defect prevented direct adoption: all 182 discipline topics were followed by the same three generic children — **Core principles**, **Applied / clinical correlations**, and **Practical and assessment**. Those 546 nodes were presentation facets rather than real subject matter. Keeping them would make browsing longer without helping a student find content, so they are not part of the canonical tree.

The generic descendants under **Conditions & syndromes** were also removed. “Common”, “serious”, and “rare/classic” are context-dependent filters, not stable homes for a condition. The Conditions route will be generated from canonical condition articles and concepts instead.

## Corrected canonical structure

| View | Roots | Topics | Subtopics | Microtopics | Total |
|---|---:|---:|---:|---:|---:|
| Systems & General | 19 | 127 | 273 | 925 | 1,344 |
| By Discipline | 27 | 193 | 0 | 0 | 220 |
| Clinical Skills | 10 | 32 | 148 | 0 | 190 |
| Clinical Knowledge | 9 | 24 | 96 | 0 | 129 |
| **All views** | **65** | **376** | **517** | **925** | **1,883** |

Discipline topics intentionally stop at the topic level until a reviewed university curriculum or qualified resource provides meaningful lower-level names. The data model supports nanotopics and deeper levels without another schema change.

## Additions and corrections

The review added only labels needed to close clear undergraduate gaps:

- **Anaesthesiology & Perioperative Medicine** as a discipline, with eight meaningful topics, and an anaesthesia branch under perioperative and critical care.
- **Oncology**, **Medicine of the older adult**, and **Rehabilitation and disability medicine** under Internal Medicine.
- **Digital health and clinical information**, including records, telemedicine, decision support/health AI, and data security.
- **Global health and health equity**.
- **Disability and inclusive care**, kept distinct from “Disability” in the ABCDE examination sequence.
- **Oral cavity and salivary glands**, plus a focused oral and dental examination skill.
- “QI” expanded to **Quality improvement methods**.
- “Rehabilitation and procedures” clarified as **Musculoskeletal assessment, rehabilitation and procedures**.

No addition publishes a fact or implies local curriculum placement. Articles and concepts still require evidence, university/year/module scope, and the normal publication gates.

## Placement decisions checked

| Area | Canonical home | Why it is not redundant or misplaced |
|---|---|---|
| Anatomy, physiology, pathology and pharmacology | Their own discipline roots, with relevant system placements | The discipline route matches university teaching; the system route matches integrated learning. Both point to the same canonical content. |
| Infection and tropical medicine | A cross-system domain, with Microbiology, Parasitology and Internal Medicine discipline placements | Organ-based infection and organism-based teaching are different navigation needs, not separate facts. |
| Ophthalmology and otolaryngology | Special senses within the system route; separate clinical disciplines | Students can enter by body system or by rotation without duplicating articles. |
| Breast | Female Reproductive System & Breast, with Surgery and Obstetrics & Gynecology discipline placements | This matches common undergraduate teaching while allowing surgical cross-placement. |
| Oral cavity and salivary glands | Gastrointestinal route, secondarily Otolaryngology | It closes a real medical-student gap without creating a full dental curriculum. |
| Anaesthesia | Perioperative and critical care, plus its own discipline | Safe perioperative practice is visible in both integrated and rotation-based curricula. |
| Oncology, pain and palliative care | Multisystem route, with relevant specialty placements | These topics cross organ systems and should not be forced into a single organ branch. |
| Conditions & syndromes | Dynamic route generated from canonical concepts/articles | “Common”, “serious”, and “rare/classic” remain filters because their meaning changes by setting and learner stage. |

## Anti-redundancy rules

- A medical fact, concept or article is created once. Additional routes store secondary taxonomy IDs rather than copies.
- University module names and local course structures belong in curriculum overlays, not the canonical medical hierarchy.
- Exam weight, high-yield status, resource type and article format are metadata or filters, not taxonomy branches.
- New lower levels are added only when a qualified source supplies a meaningful, reusable subject label.
- Synonyms and British/American spelling variants are aliases; they do not create parallel nodes.

## Completeness judgement

For an undergraduate medical library, the corrected top-level coverage is sound. It includes the major organ systems, basic and clinical disciplines, nutrition, human development, mental health, infection/tropical medicine, prevention, patient safety, evidence-based medicine, ethics/law, communication, prescribing, emergencies, perioperative care, palliative care, disability, and modern digital practice.

The taxonomy is not a claim that every branch already has publishable content. Empty branches are legitimate planned destinations and must show an honest empty state until evidence-backed articles are approved.

Automated validation currently passes with no duplicate IDs, missing parents, cross-division parent links, invalid depths, duplicate sibling titles, or cycles. The validator is `scripts/validate-reviewed-medical-taxonomy.mjs`.

## Reference basis

- [Egyptian National Academic Reference Standards — Medicine, 2nd edition (2017)](https://admin.naqaae.eg/api/v1/archive/download/4719): the Egyptian minimum is competency-based and covers the graduate as healthcare provider, health promoter, professional, scholar/scientist, health-team member, and lifelong learner/researcher.
- [GMC MLA content map, effective September 2026](https://www.gmc-uk.org/-/media/documents/251015---mla-content-map--english--112647970.pdf): uses interconnected clinical-practice, professional-knowledge, capabilities, practical-skills, presentation, and condition domains; explicitly includes perioperative medicine and anaesthesia, palliative care, imaging, older-adult medicine, and oral/maxillofacial surgery.
- [USMLE Step 2 CK content outline](https://www.usmle.org/exam-resources/step-2-ck-materials/step-2-ck-content-outline-specifications): validates the organ-system plus general-principles model and the explicit importance of nutrition, social sciences, safety, prevention, and population health.
- [AAMC Foundational Competencies for Undergraduate Medical Education](https://www.aamc.org/about-us/mission-areas/medical-education/cbme): supports the separate skills/capabilities view and identifies quality improvement, patient safety, telehealth, and emerging AI competencies.
- [WHO Patient Safety Curriculum Guide](https://www.who.int/publications/i/item/9789241598316): supports visible, integrated patient-safety and systems content rather than leaving it implicit.
