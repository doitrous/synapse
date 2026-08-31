#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')

const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family77-concept-links.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family77-muscle-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family77-muscle-mcq.md'),
  sources: resolve(importRoot, 'evidence/HU-LCS-103-family77-sources.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family77-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family77-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family77-spans.md'),
}

const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const concepts = [
  {
    id: 'CON-MSK-0DEAF126DF8F2E',
    label: 'The intercalated disc has a transverse component carrying desmosomes and fascia adherens and a lateral component carrying gap junctions',
    canonical_key: 'cardiac.intercalated-disc.lm-em',
    article_ids: '+ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
  },
  {
    id: 'CON-MSK-5EA95D36121EF8',
    label: 'Purkinje fibres are larger, pale and vacuolated cardiac muscle fibres in the moderator band that conduct via gap junctions without intercalated discs',
    canonical_key: 'cardiac-muscle.purkinje-fibres.histological-characteristics',
    article_ids: '+ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
  },
  {
    id: 'CON-MSK-888DFA3AA4E974',
    label: 'Smooth muscle has caveolae instead of T-tubules and dense bodies instead of Z lines, and its irregular myofilaments leave it unstriated',
    canonical_key: 'smooth.muscle-ultrastructure.em-picture',
    article_ids: '+ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
  },
  {
    id: 'CON-MSK-BD54A250111D42',
    label: 'A T tubule between two terminal SR cisternae forms a triad',
    canonical_key: 'teaching.triad',
    article_ids: '+ART-HU-LCS103-HIS-SKELETAL-TRIAD',
  },
]

const commonArticle = {
  arabic_title: '',
  subject: 'msk',
  topic: 'Basic tissues',
  subtopic: 'Muscle Tissue',
  primary_node_id: 'DIS-HIS-T02',
  template_id: 'TPL-CONCEPT',
  archetype: 'concept',
  language: 'en',
  learner_stage: 'Years 1–3 foundation',
  high_yield: 'High',
  time_sensitive: 'stable',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Histology faculty',
  final_publisher: 'Admin team',
  published_summary: '',
  published_sections: '',
  universities: 'hu',
  years: 'HU_Y1',
  module: 'HU-LCS-103',
  media: '',
  publication_gate: 'needs_evidence',
  conflicts: '[clear]',
  evidence_gaps: 'Independent medical verification and named Helwan Histology faculty review are required before publication.',
  last_reviewed: '',
  review_due: '',
}

const articles = [
  {
    id: 'ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
    title: 'Cardiac conducting fibres, intercalated discs and smooth-muscle dense bodies',
    aliases: 'Purkinje fibre histology\nIntercalated disc orientation\nSmooth-muscle dense bodies',
    ...commonArticle,
    microtopic: 'Cardiac and smooth muscle ultrastructure',
    nanotopic: '',
    secondary_node_ids: 'SYS-CVS-T01',
    reading_time: '7',
    summary: 'Three recurring LCS-103 distinctions organise this review: Purkinje fibres have few peripheral myofibrils, the transverse intercalated-disc component crosses cardiac fibres at right angles, and smooth-muscle dense bodies anchor thin and intermediate filaments. Each feature follows the mechanical or conducting role of the specialised cell.',
    sections: `### Definition
Purkinje fibres are specialised cardiac conducting fibres. They are larger and paler than ordinary cardiac myocytes because glycogen occupies much of the sarcoplasm, leaving relatively few myofibrils at the periphery.

Intercalated discs join successive cardiac muscle cells. Each disc has a transverse component that crosses the fibre and a lateral component that runs parallel to the myofilaments.

Smooth-muscle dense bodies are cytoplasmic or membrane-associated anchoring sites. They serve the force-transmission role played by Z lines in striated muscle, although smooth muscle has no organised sarcomeres.

### Mechanism
Purkinje fibres are adapted for rapid impulse transmission rather than maximal contractile mass. Their glycogen-rich pale sarcoplasm and sparse peripheral myofibrils produce the characteristic histological appearance.

The transverse part of an intercalated disc runs across the fibre at right angles. Fascia adherens and desmosomes provide mechanical adhesion there, while gap junctions in the lateral part permit electrical communication between adjacent cells.

Smooth-muscle dense bodies provide attachment sites for thin and intermediate filaments. Their scattered arrangement transmits contractile force through the cell without producing the registered banding of a sarcomere.

### Key determinants
Purkinje fibres contain few myofibrils, and those myofibrils lie peripherally. Do not confuse this with ordinary cardiac muscle, in which myofibrils occupy more of the sarcoplasm.

For an intercalated disc, orientation predicts function: transverse means mechanical anchorage across the fibre, whereas lateral means gap-junction communication along it.

For smooth muscle, the tested dense-body pair is thin plus intermediate filaments. Thick myosin filaments participate in contraction but are not the pair named as attached to dense bodies in this LCS-103 teaching scope.

### Clinical significance
These distinctions turn specialised cells into recognisable tissue patterns. Purkinje-fibre morphology helps identify conducting myocardium, intercalated-disc organisation explains coordinated cardiac contraction, and dense-body architecture explains how smooth muscle shortens despite lacking striations.

### Common misconceptions
Peripheral does not mean numerous: Purkinje myofibrils are both few and peripheral. The transverse part of an intercalated disc is not the gap-junction-bearing lateral part. Dense bodies are not miniature sarcomeres; they are distributed attachment sites in a non-striated contractile network.`,
    hold_these: 'Purkinje fibres contain few peripherally situated myofibrils.\nThe transverse component of an intercalated disc crosses the fibre at right angles.\nSmooth-muscle dense bodies anchor thin and intermediate filaments.',
    lose_the_mark: 'Calling Purkinje myofibrils central because the nucleus may be eccentric.\nPlacing gap junctions in the transverse rather than lateral disc component.\nChoosing thick plus intermediate filaments for smooth-muscle dense bodies.',
    related_concepts: 'CON-MSK-5EA95D36121EF8\nCON-MSK-0DEAF126DF8F2E\nCON-MSK-888DFA3AA4E974',
    related_articles: 'ART-HU-LCS103-HIS-SKELETAL-TRIAD: contrasts cardiac and smooth specialisations with the skeletal-muscle triad',
    question_ids: 'Q-HU-LCS103-HIS-F77-04\nQ-HU-LCS103-HIS-F77-06\nQ-HU-LCS103-HIS-F77-08',
    resource_ids: 'src_b0878e83f808ca239818',
    module_subject: 'HU-LCS-103 > Histology > Muscle Tissue > Cardiac and Smooth Muscle',
    university_notes: 'hu: Restricted to the HU-LCS-103 Year-1 Histology muscle block and its local lecture terminology.',
    annotations: `### definition_of · CON-MSK-0DEAF126DF8F2E
Quote: The transverse part of an intercalated disc runs across the fibre at right angles.
Block: body

### definition_of · CON-MSK-5EA95D36121EF8
Quote: Purkinje fibres contain few myofibrils, and those myofibrils lie peripherally.
Block: body

### definition_of · CON-MSK-888DFA3AA4E974
Quote: Smooth-muscle dense bodies provide attachment sites for thin and intermediate filaments.
Block: body`,
    article_source_ids: 'src_b0878e83f808ca239818',
    claim_ids: 'CLM-MSK-HULCS103-INTERCALATED-01\nCLM-MSK-HULCS103-PURKINJE-01\nCLM-MSK-HULCS103-DENSE-BODY-01',
    span_ids: 'SPN-HULCS103-HIS-DISC-01\nSPN-HULCS103-HIS-PURKINJE-01\nSPN-HULCS103-HIS-DENSE-01',
    media_recommendations: `### diagram · Intercalated-disc components and smooth-muscle dense bodies
Purpose: A labelled comparison would reinforce orientation and force transmission; the article remains fully usable without it.
Priority: optional
Status: needed`,
    callout_evidence: `### Purkinje fibres contain few peripherally situated myofibrils.
Claims: CLM-MSK-HULCS103-PURKINJE-01
Citations: CIT-HULCS103-HIS-PURKINJE-01
Span: SPN-HULCS103-HIS-PURKINJE-01

### The transverse component of an intercalated disc crosses the fibre at right angles.
Claims: CLM-MSK-HULCS103-INTERCALATED-01
Citations: CIT-HULCS103-HIS-INTERCALATED-01
Span: SPN-HULCS103-HIS-DISC-01

### Smooth-muscle dense bodies anchor thin and intermediate filaments.
Claims: CLM-MSK-HULCS103-DENSE-BODY-01
Citations: CIT-HULCS103-HIS-DENSE-BODY-01
Span: SPN-HULCS103-HIS-DENSE-01`,
    evidence_basis: 'Direct Helwan LCS-103 Histology teaching lecture, physical pages 22–30 and 38–40.\nDirect Helwan LCS-103 Histology question deck, physical pages 4, 6 and 8, supplies printed assessment keys but is not used as medical authority.',
    notes: 'No source image is redistributed. Assessment wording and keys are preserved in the linked question records.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present in the governed English source packet.
nanotopicId: The canonical taxonomy stops at DIS-HIS-T02 for this muscle-tissue placement.
media: No rights-cleared asset is attached; the optional diagram remains an admin-only request.
publishedSummary: Blank because the article remains Draft and needs evidence review.
publishedSections: Blank because the article remains Draft and needs evidence review.
lastReviewed: New draft; no named medical reviewer has completed review.
reviewDue: Set after the first named medical review.`,
  },
  {
    id: 'ART-HU-LCS103-HIS-SKELETAL-TRIAD',
    title: 'The skeletal-muscle triad at the A–I junction',
    aliases: 'Skeletal-muscle triad\nA–I band junction\nT-tubule and terminal cisternae',
    ...commonArticle,
    microtopic: 'Skeletal-muscle tubular system',
    nanotopic: '',
    secondary_node_ids: 'SYS-MSK',
    reading_time: '5',
    summary: 'A skeletal-muscle triad is one T-tubule flanked by two terminal cisternae of sarcoplasmic reticulum. Its position at the A–I band junction places the membrane action potential beside the calcium store that initiates contraction.',
    sections: `### Definition
A skeletal-muscle triad consists of one transverse T-tubule between two terminal cisternae of the sarcoplasmic reticulum. Each sarcomere has two triads.

### Mechanism
The T-tubule is an invagination of the sarcolemma that carries the action potential into the interior of the muscle fibre. The adjacent terminal cisternae are expanded parts of the sarcoplasmic reticulum, positioning the calcium store beside the propagated signal.

In skeletal muscle, the triad lies at the A–I band junction. This arrangement couples surface excitation to intracellular calcium release and therefore to actin–myosin interaction.

### Key determinants
Identify the structure by both composition and level. One T-tubule plus two terminal cisternae is a triad, and the skeletal-muscle level is the A–I junction.

The Z line is the level of the cardiac-muscle diad, not the skeletal-muscle triad. The H zone and M line are central thick-filament regions and are not the tested tubular-system site.

### Clinical significance
The triad explains how an electrical event at the cell surface rapidly reaches the contractile apparatus throughout a large skeletal-muscle fibre. Disruption of this coupling separates membrane excitation from calcium release and weakens contraction.

### Common misconceptions
Do not call every T-tubule association a triad. Cardiac muscle has one T-tubule paired with one terminal cisterna at the Z line, forming a diad; skeletal muscle has two cisternae at the A–I junction.`,
    hold_these: 'A skeletal-muscle triad is one T-tubule between two terminal cisternae.\nThe skeletal-muscle triad lies at the A–I band junction.',
    lose_the_mark: 'Choosing the Z line by importing the cardiac-diad location into skeletal muscle.\nNaming the A band alone instead of the A–I junction.',
    related_concepts: 'CON-MSK-BD54A250111D42',
    related_articles: 'ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE: compares skeletal tubular organisation with cardiac and smooth specialisations',
    question_ids: 'Q-HU-LCS103-HIS-F77-14',
    resource_ids: 'src_c7b80e456abfe93b686e',
    module_subject: 'HU-LCS-103 > Histology > Muscle Tissue > Skeletal Muscle',
    university_notes: 'hu: Restricted to the HU-LCS-103 Year-1 Histology skeletal-muscle block and its local lecture terminology.',
    annotations: `### definition_of · CON-MSK-BD54A250111D42
Quote: In skeletal muscle, the triad lies at the A–I band junction.
Block: body`,
    article_source_ids: 'src_c7b80e456abfe93b686e',
    claim_ids: 'CLM-MSK-HULCS103-TRIAD-01',
    span_ids: 'SPN-HULCS103-HIS-TRIAD-01',
    media_recommendations: `### diagram · Skeletal-muscle triad at the A–I junction
Purpose: A sarcomere-level diagram would reinforce the one-tubule/two-cisternae arrangement; the article remains fully usable without it.
Priority: optional
Status: needed`,
    callout_evidence: `### A skeletal-muscle triad is one T-tubule between two terminal cisternae.
Claims: CLM-MSK-HULCS103-TRIAD-01
Citations: CIT-HULCS103-HIS-TRIAD-01
Span: SPN-HULCS103-HIS-TRIAD-01

### The skeletal-muscle triad lies at the A–I band junction.
Claims: CLM-MSK-HULCS103-TRIAD-01
Citations: CIT-HULCS103-HIS-TRIAD-01
Span: SPN-HULCS103-HIS-TRIAD-01`,
    evidence_basis: 'Direct Helwan LCS-103 Histology teaching lecture, physical pages 35–39.\nDirect Helwan LCS-103 Histology question deck, physical page 14, supplies the printed assessment key but is not used as medical authority.',
    notes: 'No source image is redistributed. The question record preserves the source stem, options and printed key exactly.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present in the governed English source packet.
nanotopicId: The canonical taxonomy stops at DIS-HIS-T02 for this muscle-tissue placement.
media: No rights-cleared asset is attached; the optional diagram remains an admin-only request.
publishedSummary: Blank because the article remains Draft and needs evidence review.
publishedSections: Blank because the article remains Draft and needs evidence review.
lastReviewed: New draft; no named medical reviewer has completed review.
reviewDue: Set after the first named medical review.`,
  },
]

const questionCommon = {
  subject: 'msk',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  vignette: '',
  format: 'single best answer',
  written_parts: '',
  matching_options: '',
  matching_prompts: '',
  correct_answers: '',
  labeling_image: '',
  labeling_alt: '',
  labeling_points: '',
  completion_text: '',
  derived_from: '',
  topic: 'Basic tissues',
  subtopic: 'Muscle Tissue',
  difficulty: 'Easy',
  question_type: 'Other',
  module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Histology > Muscle Tissue',
  clinical_relevance: '0.35',
  academic_relevance: '0.95',
  cognitive_effort_score: '0.25',
  exam_weight_by_year: 'HU_Y1=0.75',
  question_only_for: 'HU_Y1',
  concept_ids: '',
  years: 'HU_Y1',
  universities: 'hu',
  cognitive_effort: 'Low',
  setting: 'Academic',
  reasoning_level: '1',
  inferred_difficulty: '78',
  exam_relevance: '8',
  contextual_concept_ids: '',
  media_recommendations: '',
  attachments: '',
  attached_image: '',
  estimated_seconds: '50',
  randomise_answers: 'yes',
}

const questions = [
  {
    id: 'Q-HU-LCS103-HIS-F77-04',
    title: 'What is histological structure of myofibrils at Purkinje muscle fiber?',
    ...questionCommon,
    question: 'What is histological structure of myofibrils at Purkinje muscle fiber?',
    correct_answer: 'B',
    answer_a: 'Few and centrally situated.',
    explanation_a: 'This recognises that Purkinje fibres contain relatively few myofibrils but places them in the wrong part of the cell. Their glycogen-rich pale sarcoplasm occupies the centre, while the sparse myofibrils lie near the sarcolemma. Central placement therefore reverses the tested distribution.',
    answer_b: 'Few and peripherally situated.',
    explanation_b: 'Purkinje fibres are specialised conducting cardiac fibres with abundant glycogen and relatively little contractile material. Their myofibrils are few and lie peripherally, parallel to the sarcolemma, leaving the central sarcoplasm pale and vacuolated. This combination distinguishes them from ordinary working cardiac myocytes.',
    answer_c: 'More and peripherally situated.',
    explanation_c: 'Peripheral placement is the correct direction, but the amount is wrong. Purkinje fibres are adapted for rapid conduction and contain fewer myofibrils than ordinary cardiac muscle cells. Choosing “more” confuses a specialised conducting fibre with a contractile working myocyte.',
    answer_d: 'More and centrally situated.',
    explanation_d: 'Both features are reversed. Purkinje fibres have relatively few myofibrils, and those myofibrils lie at the periphery rather than in the centre. The pale central zone reflects glycogen-rich sarcoplasm, not an increased central contractile apparatus.',
    main_concept: 'CON-MSK-5EA95D36121EF8',
    library_ids: 'ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
    resource_ids: 'src_cfe1bf246bd0aa85b06b\nsrc_b0878e83f808ca239818',
    learning_objective: 'Recognise the number and peripheral distribution of myofibrils in a Purkinje fibre.',
    source_citation: 'src_cfe1bf246bd0aa85b06b, physical PDF p4: exact four-option stem with source-printed key B. Teaching support: src_b0878e83f808ca239818, physical PDF p30.',
    author_notes: 'Transcribed from Family 77 physical p4 without correcting source grammar or spelling. The key B is printed on the slide. No mark or media dependency is present.',
  },
  {
    id: 'Q-HU-LCS103-HIS-F77-06',
    title: 'What is histological structure of part runs across the fibers of cardiac muscle at right angles in intercalated disc?',
    ...questionCommon,
    question: 'What is histological structure of part runs across the fibers of cardiac muscle at right angles in intercalated disc?',
    correct_answer: 'D',
    answer_a: 'Lateral part.',
    explanation_a: 'The lateral component runs parallel to the long axis of the cardiac fibre rather than across it. It carries gap junctions that permit electrical communication between adjacent cells. Selecting it confuses the disc component responsible for electrical coupling with the one oriented at right angles.',
    answer_b: 'Medial part.',
    explanation_b: 'Medial is not one of the two structural components used to describe an intercalated disc. The recognised comparison is transverse versus lateral, each with a distinct orientation and junctional content. This distractor arises from inventing an anatomical direction that the disc classification does not use.',
    answer_c: 'Dorsal part.',
    explanation_c: 'Dorsal is a body-orientation term, not an intercalated-disc component. Intercalated discs are divided into transverse and lateral portions according to their relation to the long axis of the muscle fibre. Choosing dorsal substitutes gross anatomical language for microscopic structural terminology.',
    answer_d: 'Transverse part.',
    explanation_d: 'The transverse component runs across cardiac muscle fibres at right angles. Fascia adherens and desmosomes are concentrated there, providing strong mechanical adhesion during repetitive contraction. The lateral component instead runs parallel to the myofilaments and contains gap junctions.',
    main_concept: 'CON-MSK-0DEAF126DF8F2E',
    library_ids: 'ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
    resource_ids: 'src_cfe1bf246bd0aa85b06b\nsrc_b0878e83f808ca239818',
    learning_objective: 'Identify the transverse intercalated-disc component from its right-angle orientation.',
    source_citation: 'src_cfe1bf246bd0aa85b06b, physical PDF p6: exact four-option stem with source-printed key D. Teaching support: src_b0878e83f808ca239818, physical PDF pp22 and 24.',
    author_notes: 'Transcribed from Family 77 physical p6 without correcting source grammar. The key D is printed on the slide. No mark or image is inferred.',
  },
  {
    id: 'Q-HU-LCS103-HIS-F77-08',
    title: 'What is histological structure of dense bodies at smooth muscle?',
    ...questionCommon,
    question: 'What is histological structure of dense bodies at smooth muscle?',
    correct_answer: 'A',
    answer_a: 'Thin and intermediate filaments.',
    explanation_a: 'Smooth-muscle dense bodies provide attachment sites for thin actin filaments and intermediate filaments such as desmin. Their scattered cytoplasmic and sarcolemmal distribution transmits force through a cell that has no organised sarcomeres. This arrangement gives dense bodies a Z-line-like anchoring role without producing striations.',
    answer_b: 'Thick and intermediate filaments.',
    explanation_b: 'Intermediate filaments do attach to dense bodies, but thick myosin filaments are not the paired attachment named in this tested relation. Dense bodies anchor thin actin and intermediate filaments. Choosing thick plus intermediate retains only half of the correct attachment pattern.',
    answer_c: 'Thin and thick filaments.',
    explanation_c: 'Smooth muscle contains both thin and thick contractile filaments, but that fact does not define the dense-body attachment pair. Dense bodies anchor thin and intermediate filaments. This distractor confuses the complete contractile apparatus with the specific structures attached to the anchoring plaques.',
    answer_d: 'Thin and thin filaments.',
    explanation_d: 'Repeating thin filaments omits the intermediate-filament network that links dense bodies through the sarcoplasm and to the sarcolemma. The correct pair is thin plus intermediate filaments. This distractor reduces force transmission to a single filament class.',
    main_concept: 'CON-MSK-888DFA3AA4E974',
    library_ids: 'ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
    resource_ids: 'src_cfe1bf246bd0aa85b06b\nsrc_b0878e83f808ca239818',
    learning_objective: 'Name the two filament classes anchored to smooth-muscle dense bodies.',
    source_citation: 'src_cfe1bf246bd0aa85b06b, physical PDF p8: exact four-option stem with source-printed key A. Teaching support: src_b0878e83f808ca239818, physical PDF pp38–40.',
    author_notes: 'Transcribed from Family 77 physical p8 with the printed option wording unchanged. The key A is printed on the slide. No mark or image is inferred.',
  },
  {
    id: 'Q-HU-LCS103-HIS-F77-14',
    title: 'Where is site of Triad system at skeletal muscle?',
    ...questionCommon,
    question: 'Where is site of Triad system at skeletal muscle?',
    correct_answer: 'A',
    answer_a: 'A-I band.',
    explanation_a: 'The skeletal-muscle triad lies at the junction of the A and I bands. One T-tubule is flanked there by two terminal cisternae of sarcoplasmic reticulum, positioning the propagated action potential beside the calcium store. Each sarcomere therefore has two triads, one at each A–I junction.',
    answer_b: 'A-H band.',
    explanation_b: 'The H zone lies within the centre of the A band and contains thick filaments without thin-filament overlap. It is not the location of the transverse tubular system. Choosing an A–H relation confuses a central sarcomeric region with the boundary where the triad sits.',
    answer_c: 'Z line.',
    explanation_c: 'The Z line is the characteristic level of the cardiac-muscle diad, where one T-tubule pairs with one terminal cisterna. Skeletal muscle uses a triad at the A–I junction. This distractor transfers the cardiac tubular-system location to skeletal muscle.',
    answer_d: 'M line.',
    explanation_d: 'The M line lies at the centre of the sarcomere and holds thick filaments in register. It is not a surface-membrane invagination site and does not form the triad. Choosing it confuses a filament-anchoring landmark with the excitation–contraction coupling apparatus.',
    main_concept: 'CON-MSK-BD54A250111D42',
    library_ids: 'ART-HU-LCS103-HIS-SKELETAL-TRIAD',
    resource_ids: 'src_cfe1bf246bd0aa85b06b\nsrc_c7b80e456abfe93b686e',
    learning_objective: 'Locate the skeletal-muscle triad at the A–I band junction.',
    source_citation: 'src_cfe1bf246bd0aa85b06b, physical PDF p14: exact four-option stem with source-printed key A. Teaching support: src_c7b80e456abfe93b686e, physical PDF pp35–39.',
    author_notes: 'Transcribed from Family 77 physical p14 without correcting source grammar. The key A is printed on the slide. No mark or image is inferred.',
  },
]

const sources = [
  {
    id: 'src_cfe1bf246bd0aa85b06b',
    title: 'LCS-103 Histology question deck — 27 June 2025',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'ocr_required',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/All Subjects/Questions/103 question.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '2025-06-27',
    accessed_at: '',
    page_count: '16',
    sha256: 'cfe1bf246bd0aa85b06b5a98d0d4ef74bb17dd9002a56eef66b66912d03a3508',
    rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-3 direct visibly Helwan-authored LCS-103 Histology question deck with one printed answer letter on every question slide. It supplies exact assessment wording and printed question-bank keys but is not labelled as a formal sitting paper or separately issued official key.',
    confidence: '0.9',
    is_assessment: 'yes',
  },
  {
    id: 'src_c7b80e456abfe93b686e',
    title: 'LCS-103 Histology — Skeletal Muscle I',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'ocr_required',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/Histology/Theoretical/Lec 4 - Skeletal Muscles I/muscle tissue 1 HELWAN record - Copy.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '',
    accessed_at: '',
    page_count: '47',
    sha256: 'c7b80e456abfe93b686e7d8b4c8341b8ea970b3476da61f43f5d114473a5199a',
    rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-4 direct Helwan-labelled LCS-103 Histology teaching lecture. It is local curriculum authority for skeletal-muscle histology and triad placement, not independent medical verification or an official exam key.',
    confidence: '0.85',
    is_assessment: 'no',
  },
  {
    id: 'src_b0878e83f808ca239818',
    title: 'LCS-103 Histology — Cardiac and Smooth Muscle',
    institution: 'Faculty of Medicine, Helwan University',
    processing_status: 'ocr_required',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/Histology/Theoretical/Lec 5 - Skeletal Muscles II/muscle tissue  HELWAN 2 iheba - record _Repaired_.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '',
    accessed_at: '',
    page_count: '47',
    sha256: 'b0878e83f808ca2398187a5f03f40fe3fce592912ed776888082f43f474746e3',
    rights: 'Local Helwan teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-4 direct Helwan-labelled LCS-103 Histology teaching lecture. It is local curriculum authority for cardiac and smooth-muscle histology, not independent medical verification or an official exam key.',
    confidence: '0.85',
    is_assessment: 'no',
  },
]

const claims = [
  ['CLM-MSK-HULCS103-PURKINJE-01', 'CON-MSK-5EA95D36121EF8', 'Purkinje fibres', 'contain', 'few peripherally situated myofibrils', 'Purkinje fibres contain few myofibrils, and those myofibrils lie peripherally.'],
  ['CLM-MSK-HULCS103-INTERCALATED-01', 'CON-MSK-0DEAF126DF8F2E', 'The transverse intercalated-disc component', 'runs', 'across the cardiac muscle fibre at right angles', 'The transverse part of an intercalated disc runs across the fibre at right angles.'],
  ['CLM-MSK-HULCS103-DENSE-BODY-01', 'CON-MSK-888DFA3AA4E974', 'Smooth-muscle dense bodies', 'provide attachment sites for', 'thin and intermediate filaments', 'Smooth-muscle dense bodies provide attachment sites for thin and intermediate filaments.'],
  ['CLM-MSK-HULCS103-TRIAD-01', 'CON-MSK-BD54A250111D42', 'The skeletal-muscle triad', 'lies at', 'the A–I band junction and consists of one T-tubule between two terminal cisternae', 'In skeletal muscle, the triad lies at the A–I band junction and consists of one T-tubule between two terminal cisternae.'],
].map(([id, concept_id, subject, predicate, object, display_text]) => ({
  id, concept_id, subject, predicate, object, display_text,
  risk_class: 'foundational_stable',
  verification_status: 'needs_evidence',
  conflict_status: 'none',
  confidence: '0.9',
  freshness: 'stable_local_curriculum_fact',
  time_sensitive: 'no',
  qualifiers: 'polarity: affirmative\nauthority: direct local Helwan curriculum, not independent verification',
}))

const citations = [
  {
    id: 'CIT-HULCS103-HIS-PURKINJE-01', claim_id: 'CLM-MSK-HULCS103-PURKINJE-01', resource_id: 'src_b0878e83f808ca239818',
    support_span: 'Myofibrils are few and peripherally situated.', locator_page: '30', locator_section: 'Purkinje fibers', locator_detail: 'Physical PDF page 30, numbered histological characteristic 4',
    context_note: 'Literal teaching phrase from the OCR-verified Helwan lecture page; spelling is otherwise normalised only in student-facing prose.',
  },
  {
    id: 'CIT-HULCS103-HIS-INTERCALATED-01', claim_id: 'CLM-MSK-HULCS103-INTERCALATED-01', resource_id: 'src_b0878e83f808ca239818',
    support_span: 'Transverse( Vertical) part: Runs across the fibres at right angles.', locator_page: '24', locator_section: 'Intercalated disc', locator_detail: 'Physical PDF page 24, transverse-part bullet',
    context_note: 'Literal teaching phrase from the OCR-verified Helwan lecture page.',
  },
  {
    id: 'CIT-HULCS103-HIS-DENSE-BODY-01', claim_id: 'CLM-MSK-HULCS103-DENSE-BODY-01', resource_id: 'src_b0878e83f808ca239818',
    support_span: 'Dense bodies provide an attachment site for thin and intermediate filaments', locator_page: '38', locator_section: 'Dense bodies or attachment plaques', locator_detail: 'Physical PDF page 38, dense-body definition',
    context_note: 'Literal teaching phrase from the OCR-verified Helwan lecture page.',
  },
  {
    id: 'CIT-HULCS103-HIS-TRIAD-01', claim_id: 'CLM-MSK-HULCS103-TRIAD-01', resource_id: 'src_c7b80e456abfe93b686e',
    support_span: 'T-Tubules which are invaginated from sarcolemma; Terminal cisternae of sarcoplasmic reticulum on each side of T-tubule. It is present at the A/I band junction.', locator_page: '39', locator_section: 'T-tubular system', locator_detail: 'Physical PDF page 39, composition and level bullets',
    context_note: 'The two source bullets are joined with a semicolon; their words and order are preserved.',
  },
].map((citation) => ({
  ...citation,
  evidence_role: 'local_curriculum',
  locator_type: 'page',
  confidence: '0.9',
  counts_as_claim_evidence: 'no',
}))

const spans = [
  {
    id: 'SPN-HULCS103-HIS-PURKINJE-01',
    article_id: 'ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
    section_id: 'art-hu-lcs103-his-cardiac-smooth-muscle-key-determinants',
    text: 'Purkinje fibres contain few myofibrils, and those myofibrils lie peripherally.',
    claim_ids: 'CLM-MSK-HULCS103-PURKINJE-01',
    citation_ids: 'CIT-HULCS103-HIS-PURKINJE-01',
  },
  {
    id: 'SPN-HULCS103-HIS-DISC-01',
    article_id: 'ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
    section_id: 'art-hu-lcs103-his-cardiac-smooth-muscle-mechanism',
    text: 'The transverse part of an intercalated disc runs across the fibre at right angles.',
    claim_ids: 'CLM-MSK-HULCS103-INTERCALATED-01',
    citation_ids: 'CIT-HULCS103-HIS-INTERCALATED-01',
  },
  {
    id: 'SPN-HULCS103-HIS-DENSE-01',
    article_id: 'ART-HU-LCS103-HIS-CARDIAC-SMOOTH-MUSCLE',
    section_id: 'art-hu-lcs103-his-cardiac-smooth-muscle-mechanism',
    text: 'Smooth-muscle dense bodies provide attachment sites for thin and intermediate filaments.',
    claim_ids: 'CLM-MSK-HULCS103-DENSE-BODY-01',
    citation_ids: 'CIT-HULCS103-HIS-DENSE-BODY-01',
  },
  {
    id: 'SPN-HULCS103-HIS-TRIAD-01',
    article_id: 'ART-HU-LCS103-HIS-SKELETAL-TRIAD',
    section_id: 'art-hu-lcs103-his-skeletal-triad-mechanism',
    text: 'In skeletal muscle, the triad lies at the A–I band junction.',
    claim_ids: 'CLM-MSK-HULCS103-TRIAD-01',
    citation_ids: 'CIT-HULCS103-HIS-TRIAD-01',
  },
]

await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8')
await writeFile(paths.articles, articles.map(item).join(divider), 'utf8')
await writeFile(paths.questions, questions.map(item).join(divider), 'utf8')
await writeFile(paths.sources, sources.map(item).join(divider), 'utf8')
await writeFile(paths.claims, claims.map(item).join(divider), 'utf8')
await writeFile(paths.citations, citations.map(item).join(divider), 'utf8')
await writeFile(paths.spans, spans.map(item).join(divider), 'utf8')

console.log(JSON.stringify({ files: paths, counts: { conceptUpdates: concepts.length, articles: articles.length, questions: questions.length, sources: sources.length, claims: claims.length, citations: citations.length, spans: spans.length } }, null, 2))
