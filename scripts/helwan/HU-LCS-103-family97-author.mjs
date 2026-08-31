#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')

const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family97-muscle-physiology-concept-links.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family97-muscle-physiology-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family97-muscle-physiology-mcq.md'),
  sources: resolve(importRoot, 'evidence/HU-LCS-103-family97-sources.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family97-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family97-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family97-spans.md'),
}

const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = {
  assessment: 'src_5c2fb18ea47b74ce252c',
  teaching: 'src_262c1ba3765a9922e9d4',
}

const article = {
  structure: 'ART-HU-LCS103-PHY-MUSCLE-STRUCTURE-COUPLING',
  function: 'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
}

const conceptSpecs = {
  sarcomere: {
    id: 'CON-MSK-0824FE988ADA00',
    key: 'skeletal-muscle.sarcomere.definition-z-line-to-z-line',
    label: 'The sarcomere, the segment between two Z lines, is the functional contractile unit of striated muscle',
    article: article.structure,
    objective: 'Identify the sarcomere as the Z-line-to-Z-line functional contractile unit and recognise its band changes during shortening.',
  },
  coupling: {
    id: 'CON-MSK-3013AA61E917B7',
    key: 'muscle.excitation-contraction-coupling.calcium-troponin',
    label: 'Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site',
    article: article.structure,
    objective: 'Sequence T-tubule depolarisation, sarcoplasmic-reticulum calcium release, troponin binding and tropomyosin movement.',
  },
  types: {
    id: 'CON-MSK-B080975D6171CF',
    key: 'muscle-tissue.three-types.comparison-table',
    label: 'Skeletal, cardiac and smooth muscle differ across site, size, fibre composition, shape, branching, sarcolemma, striation, nuclei, sarcomeres, tubular system, cell junctions, regeneration, action and innervation',
    article: article.function,
    objective: 'Differentiate skeletal, cardiac and smooth muscle by control, striation, location and specialised functional features.',
  },
  fatigue: {
    id: 'CON-MSK-2E4061334D52EA',
    key: 'muscle.fatigue.causes',
    label: 'Muscle fatigue weakens and prolongs contraction and leaves relaxation incomplete, from lactic acid, ATP/glycogen/creatine phosphate depletion, impaired neuromuscular transmission and interrupted blood flow',
    article: article.function,
    objective: 'Relate fatigue and electrolyte disturbance to reduced muscle performance while recognising source-key limitations.',
  },
  smooth: {
    id: 'CON-MSK-CF9EFE4EA3C90B',
    key: 'smooth-muscle.excitation-contraction-coupling.calmodulin-mlck',
    label: 'Smooth muscle contraction is triggered by calcium binding calmodulin to activate myosin light-chain kinase, and cross-bridges that stay attached without cycling — latch bridges — hold tone cheaply',
    article: article.function,
    objective: 'Recognise low-energy smooth-muscle contraction and unitary gastrointestinal smooth muscle with pacemaker activity.',
  },
  motorUnit: {
    id: 'CON-MSK-C14F65CD68F720',
    key: 'muscle.grading.motor-unit-recruitment-frequency-treppe',
    label: "The whole muscle's contraction is graded by recruiting more motor units and by raising stimulation frequency toward tetanus, and Treppe raises twitch tension over the first few stimuli of a rested muscle",
    article: article.function,
    objective: 'Define a motor unit as one motor neuron and all of the skeletal-muscle fibres it innervates.',
  },
  properties: {
    id: 'CON-MSK-43CD79301071ED',
    key: 'muscle.skeletal.overview-and-functions',
    label: 'Skeletal muscle is over four hundred voluntary muscles attached to bone, and contraction that depends on nerve supply serves four functions',
    article: article.function,
    objective: 'Distinguish skeletal-muscle functions from tissue properties such as extensibility and elasticity.',
  },
  dystrophin: {
    id: 'CON-MSK-9D01E2358A65E2',
    key: 'skeletal-muscle.clinical.hypertrophy-dystrophy-cramps',
    label: 'Skeletal muscle hypertrophy enlarges existing fibres, muscular dystrophy is satellite-cell failure from dystrophin loss, and cramps follow reduced blood flow or low potassium',
    article: article.structure,
    objective: 'Explain how dystrophin links the contractile apparatus to sarcolemmal proteins and protects fibres from mechanical stress.',
  },
  sarcolemma: {
    id: 'CON-MSK-2493DDAE4798CE',
    key: 'skeletal-muscle.fibre.lm-picture-and-sarcoplasm-contents',
    label: 'A skeletal muscle fibre is a long, multinucleated, striated cell whose sarcoplasm holds myofibrils, sarcoplasmic reticulum and myoglobin',
    article: article.structure,
    objective: 'Use muscle-cell terminology accurately, including sarcolemma for plasma membrane and sarcoplasmic reticulum for endoplasmic reticulum.',
  },
  proteins: {
    id: 'CON-MSK-287D88DF2F6B8C',
    key: 'muscle.proteins.myosin-actin-troponin-structure',
    label: "Myosin has two heavy chains forming flexible cross-bridge heads, and actin's active site is covered at rest by tropomyosin held in place by the three troponin subunits",
    article: article.structure,
    objective: 'Distinguish thick-filament myosin, thin-filament actin and the troponin–tropomyosin regulatory system.',
  },
  isometric: {
    id: 'CON-MSK-87D5C5A48AB5D9',
    key: 'muscle.contraction-types.isometric-isotonic-definitions',
    label: "In isometric contraction the muscle's length is held fixed while tension rises; in isotonic contraction tension is held fixed once threshold is reached and the muscle shortens",
    article: article.structure,
    objective: 'Identify isometric contraction when tension develops at fixed muscle length without whole-muscle shortening.',
  },
  twitch: {
    id: 'CON-MSK-242998842BE25C',
    key: 'muscle.skeletal.twitch',
    label: 'A muscle twitch is a single, brief contraction and relaxation cycle produced by one action potential, starting about 2 msec after depolarisation',
    article: article.function,
    objective: 'Define a muscle twitch as one brief contraction-and-relaxation cycle after a single action potential.',
  },
}

const concepts = Object.values(conceptSpecs).map((spec) => ({
  id: spec.id,
  label: spec.label,
  canonical_key: spec.key,
  article_ids: `+${spec.article}`,
}))

const commonArticle = {
  arabic_title: '',
  subject: 'msk',
  topic: 'Musculoskeletal system',
  subtopic: 'Muscle physiology',
  primary_node_id: 'SYS-MSK',
  template_id: 'TPL-CONCEPT',
  archetype: 'concept',
  language: 'en',
  learner_stage: 'Years 1–3 foundation',
  high_yield: 'High',
  time_sensitive: 'stable',
  status: 'Draft',
  owner: 'Helwan Year-1 authoring lane',
  reviewer: 'Medical team, Helwan Physiology faculty',
  final_publisher: 'Admin team',
  published_summary: '',
  published_sections: '',
  universities: 'hu',
  years: 'HU_Y1',
  module: 'HU-LCS-103',
  media: '',
  publication_gate: 'needs_evidence',
  conflicts: '[clear]',
  evidence_gaps: 'Independent medical verification and named Helwan Physiology faculty review are required before publication.',
  last_reviewed: '',
  review_due: '',
}

const structureConcepts = ['sarcomere', 'coupling', 'dystrophin', 'sarcolemma', 'proteins', 'isometric']
const functionConcepts = ['types', 'fatigue', 'smooth', 'motorUnit', 'properties', 'twitch']
const idsFor = (codes) => codes.map((code) => conceptSpecs[code].id).join('\n')
const claimsFor = (codes) => codes.map((code) => `CLM-MSK-HULCS103-F97-${code.toUpperCase()}-01`).join('\n')
const spansFor = (codes) => codes.map((code) => `SPN-HULCS103-F97-${code.toUpperCase()}-01`).join('\n')
const annotationQuote = {
  sarcomere: 'The sarcomere is the functional contractile unit of striated muscle and extends from one Z line to the next.',
  coupling: 'A sarcolemmal action potential enters the fibre through T-tubules and triggers calcium release from the sarcoplasmic reticulum.',
  dystrophin: 'Dystrophin links the actin-based contractile apparatus to proteins of the sarcolemma and helps protect the fibre against mechanical stress.',
  sarcolemma: 'The muscle-cell plasma membrane is the sarcolemma.',
  proteins: 'Myosin is the principal thick-filament protein; actin is the principal thin-filament protein.',
  isometric: 'Isometric contraction develops tension at fixed whole-muscle length, so internal cross-bridge activity can occur without external shortening.',
  types: 'Skeletal muscle is striated and usually voluntary, cardiac muscle is striated and involuntary, and smooth muscle is non-striated and involuntary.',
  fatigue: 'Repeated activity can produce fatigue when energy substrates, oxygen delivery, metabolite handling or neuromuscular transmission can no longer sustain the same response.',
  smooth: 'Unitary smooth muscle, exemplified by the gastrointestinal tract, is electrically coupled through gap junctions and can exhibit pacemaker activity.',
  motorUnit: 'A motor unit consists of one motor neuron and every skeletal-muscle fibre it innervates.',
  properties: 'Extensibility is the ability to be stretched, whereas elasticity is the ability to return toward the original length after stretch.',
  twitch: 'A twitch is the brief contraction-and-relaxation response to one action potential.',
}
const calloutLine = {
  sarcomere: 'A sarcomere runs from Z line to Z line.',
  coupling: 'T-tubules conduct depolarisation inward and sarcoplasmic reticulum releases calcium.',
  dystrophin: 'Dystrophin links actin to sarcolemmal proteins and protects the fibre from mechanical stress.',
  sarcolemma: 'The muscle-cell plasma membrane is the sarcolemma.',
  proteins: 'Myosin is thick, actin is thin, and tropomyosin blocks actin sites at rest.',
  isometric: 'Isometric contraction develops tension without whole-muscle shortening.',
  types: 'Smooth muscle is involuntary and non-striated.',
  fatigue: 'Fatigue and altered extracellular potassium can reduce reliable muscle performance.',
  smooth: 'Unitary gastrointestinal smooth muscle can exhibit pacemaker activity.',
  motorUnit: 'A motor unit is one motor neuron plus all fibres it innervates.',
  properties: 'Elasticity is return after stretch.',
  twitch: 'A twitch is one brief contraction–relaxation cycle.',
}

const articles = [
  {
    id: article.structure,
    title: 'Sarcomeres, membrane coupling and the contractile protein system',
    aliases: 'Skeletal-muscle structure and coupling\nSarcomere and sliding-filament review\nT-tubules, calcium and contractile proteins',
    ...commonArticle,
    microtopic: 'Skeletal-muscle structure and excitation–contraction coupling',
    nanotopic: '',
    secondary_node_ids: 'DIS-PHY-T02',
    reading_time: '8',
    summary: 'Skeletal-muscle contraction depends on a precise structural chain: the sarcomere arranges actin and myosin, the sarcolemma and T-tubules carry excitation inward, the sarcoplasmic reticulum supplies calcium, and regulatory proteins expose actin sites. Dystrophin protects this force-transmission system at the membrane, while contraction type describes whether tension changes with or without whole-muscle shortening.',
    sections: `### Definition
The sarcomere is the functional contractile unit of striated muscle and extends from one Z line to the next. Thin actin filaments attach at the Z lines and overlap central thick myosin filaments; this registered arrangement produces the A band, I band and H zone.

The muscle-cell plasma membrane is the sarcolemma. Its transverse invaginations are T-tubules, while the specialised endoplasmic reticulum surrounding myofibrils is the sarcoplasmic reticulum.

### Mechanism
A sarcolemmal action potential enters the fibre through T-tubules and triggers calcium release from the sarcoplasmic reticulum. Calcium binds troponin C, moves tropomyosin away from actin's myosin-binding sites and permits cross-bridge cycling. Relaxation requires calcium resequestration into the sarcoplasmic reticulum, which restores the inhibitory position of tropomyosin.

During shortening, thin filaments slide toward the centre of the A band without either thick or thin filaments becoming shorter. The A-band length therefore remains constant, while the I bands and H zone narrow and the Z lines approach each other.

### Key determinants
Myosin is the principal thick-filament protein; actin is the principal thin-filament protein. Tropomyosin covers actin-binding sites at rest, and the troponin complex translates calcium binding into movement of tropomyosin.

Dystrophin links the actin-based contractile apparatus to proteins of the sarcolemma and helps protect the fibre against mechanical stress. It is structural rather than one of the two main force-generating filament proteins.

### Clinical significance
Loss of dystrophin destabilises the muscle-fibre membrane during repeated contraction. The same structure–function chain explains why failure of membrane excitation, calcium handling, regulatory-protein movement or cross-bridge cycling can all cause weakness.

### Common misconceptions
A sarcomere is not an entire myofibril, and the A band does not shorten during normal sliding-filament contraction. Calcium is released from the sarcoplasmic reticulum, not from troponin; troponin receives calcium. Isometric contraction develops tension at fixed whole-muscle length, so internal cross-bridge activity can occur without external shortening.`,
    hold_these: 'A sarcomere runs from Z line to Z line.\nT-tubules conduct depolarisation inward and sarcoplasmic reticulum releases calcium.\nDystrophin links actin to sarcolemmal proteins and protects the fibre from mechanical stress.\nThe muscle-cell plasma membrane is the sarcolemma.\nMyosin is thick, actin is thin, and tropomyosin blocks actin sites at rest.\nIsometric contraction develops tension without whole-muscle shortening.',
    lose_the_mark: 'Calling the whole myofibril a sarcomere.\nSaying calcium is released from troponin.\nMaking the A band shorter during contraction.\nCalling dystrophin the main thick-filament protein.',
    related_concepts: idsFor(structureConcepts),
    related_articles: `${article.function}: compares the three muscle types and reviews muscle properties, motor units, fatigue and twitches`,
    question_ids: [1,2,12,13,14,15,17,20,21,22,23,24,25,26,27,28,29,30].map((n) => `Q-HU-LCS103-PHY-F97-${String(n).padStart(2, '0')}`).join('\n'),
    resource_ids: `${source.teaching}\n${source.assessment}`,
    module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Structure and Coupling',
    university_notes: 'hu: Restricted to the HU-LCS-103 Year-1 Physiology muscle block and its local lecture terminology.',
    annotations: structureConcepts.map((code) => `### definition_of · ${conceptSpecs[code].id}\nQuote: ${annotationQuote[code]}\nBlock: body`).join('\n\n'),
    article_source_ids: `${source.teaching}\n${source.assessment}`,
    claim_ids: claimsFor(structureConcepts),
    span_ids: spansFor(structureConcepts),
    media_recommendations: `### diagram · Sarcomere and excitation–contraction coupling sequence
Purpose: A labelled sequence could reinforce Z lines, bands, T-tubules, sarcoplasmic reticulum and calcium flow; the article is fully usable without it.
Priority: optional
Status: needed`,
    callout_evidence: structureConcepts.map((code) => `### ${calloutLine[code]}\nClaims: CLM-MSK-HULCS103-F97-${code.toUpperCase()}-01\nCitations: CIT-HULCS103-F97-${code.toUpperCase()}-01\nSpan: SPN-HULCS103-F97-${code.toUpperCase()}-01`).join('\n\n'),
    evidence_basis: 'Direct local LCS-103 Physiology teaching lecture, physical pages 12–40.\nDirect named-course LCS-103 Physiology question deck, physical pages 1–6, supplies exact assessment wording and printed keys but is not independent medical verification.',
    notes: 'No source image is redistributed. All linked questions retain the exact source stem, option wording and printed answer letter.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No rights-cleared asset is attached.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
  },
  {
    id: article.function,
    title: 'Muscle types, functional properties, motor units and fatigue',
    aliases: 'Muscle-type comparison\nMuscle functional properties\nMotor units, twitches and fatigue',
    ...commonArticle,
    microtopic: 'Muscle types and functional properties',
    nanotopic: '',
    secondary_node_ids: 'DIS-PHY-T02',
    reading_time: '8',
    summary: 'Skeletal, cardiac and smooth muscle share contractility but differ in control, striation, connectivity and physiological role. At the skeletal-muscle level, elasticity and extensibility describe mechanical properties, a motor unit links one motor neuron to its fibres, a twitch is one contraction–relaxation cycle, and fatigue or electrolyte disturbance reduces reliable performance.',
    sections: `### Definition
Skeletal muscle is striated and usually voluntary, cardiac muscle is striated and involuntary, and smooth muscle is non-striated and involuntary. Their differing architecture matches their roles: skeletal muscle produces movement and posture, cardiac muscle pumps blood, and smooth muscle controls hollow organs.

Muscle tissue is contractile, excitable, extensible and elastic. Extensibility is the ability to be stretched, whereas elasticity is the ability to return toward the original length after stretch.

### Mechanism
A motor unit consists of one motor neuron and every skeletal-muscle fibre it innervates. Recruitment of more motor units raises whole-muscle force, while stimulation frequency changes summation and can lead toward tetanus.

A twitch is the brief contraction-and-relaxation response to one action potential. Repeated activity can produce fatigue when energy substrates, oxygen delivery, metabolite handling or neuromuscular transmission can no longer sustain the same response.

### Key determinants
Unitary smooth muscle, exemplified by the gastrointestinal tract, is electrically coupled through gap junctions and can exhibit pacemaker activity. Smooth muscle can also maintain force economically because slowly cycling or latch-state cross-bridges conserve ATP.

Skeletal muscle moves the body, maintains posture and contributes to heat production. Pumping blood is the defining job of cardiac muscle, and calcium storage is not treated as a primary function of muscle tissue in this source set.

### Clinical significance
Electrolytes modify membrane excitability, so abnormal extracellular potassium can impair normal muscle activation. The Family-97 hypokalaemia item is retained as source evidence but is not promoted as settled teaching because its printed key and wording require faculty review.

### Common misconceptions
Elasticity is recovery after stretch; extensibility is the ability to stretch. A motor unit is not one nerve plus one muscle, and it is not all fibres in an entire muscle. The source-keyed cardiac-action-potential exception and hypokalaemia-cramp item remain Draft because their wording is medically sensitive.`,
    hold_these: 'Smooth muscle is involuntary and non-striated.\nFatigue and altered extracellular potassium can reduce reliable muscle performance.\nUnitary gastrointestinal smooth muscle can exhibit pacemaker activity.\nA motor unit is one motor neuron plus all fibres it innervates.\nElasticity is return after stretch.\nA twitch is one brief contraction–relaxation cycle.',
    lose_the_mark: 'Confusing elasticity with extensibility.\nCalling a whole muscle one motor unit.\nAssigning the pumping function to skeletal muscle.\nPublishing source-sensitive Q7 or Q19 without faculty review.',
    related_concepts: idsFor(functionConcepts),
    related_articles: `${article.structure}: supplies the sarcomere, membrane-coupling and contractile-protein framework`,
    question_ids: [3,4,5,6,7,8,9,10,11,16,18,19].map((n) => `Q-HU-LCS103-PHY-F97-${String(n).padStart(2, '0')}`).join('\n'),
    resource_ids: `${source.teaching}\n${source.assessment}`,
    module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Types and Properties',
    university_notes: 'hu: Restricted to the HU-LCS-103 Year-1 Physiology muscle block and its local lecture terminology.',
    annotations: functionConcepts.map((code) => `### definition_of · ${conceptSpecs[code].id}\nQuote: ${annotationQuote[code]}\nBlock: body`).join('\n\n'),
    article_source_ids: `${source.teaching}\n${source.assessment}`,
    claim_ids: claimsFor(functionConcepts),
    span_ids: spansFor(functionConcepts),
    media_recommendations: `### diagram · Muscle-type and property comparison
Purpose: A compact table could reinforce control, striation, role, elasticity, motor-unit organisation and smooth-muscle pacemaker behaviour; the article is fully usable without it.
Priority: optional
Status: needed`,
    callout_evidence: functionConcepts.map((code) => `### ${calloutLine[code]}\nClaims: CLM-MSK-HULCS103-F97-${code.toUpperCase()}-01\nCitations: CIT-HULCS103-F97-${code.toUpperCase()}-01\nSpan: SPN-HULCS103-F97-${code.toUpperCase()}-01`).join('\n\n'),
    evidence_basis: 'Direct local LCS-103 Physiology teaching lecture, physical pages 12, 36–56.\nDirect named-course LCS-103 Physiology question deck, physical pages 1–6, supplies exact assessment wording and printed keys but is not independent medical verification.',
    notes: 'Q7 and Q19 are retained as exact source records and explicitly held for faculty review. No source image is redistributed.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No rights-cleared asset is attached.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
  },
]

const teaching = {
  sarcomere: 'A sarcomere spans one Z line to the next, and sliding of thin filaments narrows the I band and H zone while A-band length remains constant. The source treats this registered unit as the functional contractile unit of skeletal muscle.',
  coupling: 'T-tubules carry sarcolemmal depolarisation into the fibre, the sarcoplasmic reticulum releases calcium, and calcium binding to troponin exposes actin sites by moving tropomyosin. Relaxation requires calcium return to the sarcoplasmic reticulum rather than release from troponin.',
  types: 'Skeletal muscle is voluntary and striated, cardiac muscle is involuntary and striated, and smooth muscle is involuntary and non-striated. Their structures support movement, pumping and hollow-organ control respectively.',
  fatigue: 'Fatigue reflects declining ability to sustain contraction and can involve substrate depletion, metabolite accumulation, reduced oxygen delivery or impaired transmission. Extracellular potassium also affects membrane excitability, so the precise hypokalaemia wording requires careful review.',
  smooth: 'Smooth muscle maintains force with relatively low energy expenditure because cross-bridges may remain attached in a latch state. Unitary smooth muscle such as gastrointestinal muscle is linked by gap junctions and can show pacemaker activity.',
  motorUnit: 'A motor unit is one motor neuron together with all skeletal-muscle fibres that it innervates. Whole-muscle force is graded by recruiting additional motor units rather than by partially contracting an individual fibre.',
  properties: 'Muscle tissue is contractile, excitable, extensible and elastic; elasticity means returning toward original length after stretch. Skeletal muscle produces movement, maintains posture and contributes to heat production, whereas cardiac muscle pumps blood.',
  dystrophin: 'Dystrophin helps connect actin myofilaments to sarcolemmal proteins and protects the muscle fibre from mechanical stress. It is a structural support protein rather than the principal force-generating thick or thin filament.',
  sarcolemma: 'The plasma membrane of a muscle fibre is called the sarcolemma, while its specialised endoplasmic reticulum is the sarcoplasmic reticulum. These terms describe different parts of the fibre and should not be interchanged.',
  proteins: 'Myosin forms the thick filament and actin forms the thin filament; tropomyosin covers actin binding sites at rest. Calcium-bound troponin moves tropomyosin so that myosin heads can form cross-bridges with actin.',
  isometric: 'In an isometric contraction, tension develops while whole-muscle length is held fixed. This differs from isotonic contraction, in which the muscle changes length while working against a load.',
  twitch: 'A muscle twitch is one brief contraction-and-relaxation cycle after a single action potential. It is not a sustained contraction, spasm or tetanic response.',
}

const discriminator = {
  sarcomere: 'The decisive distinction is the named structural unit or the band behaviour specified in the stem.',
  coupling: 'The decisive distinction is whether the option correctly follows the membrane-to-calcium-to-filament sequence.',
  types: 'The decisive distinction is the combination of control, striation and organ-level function.',
  fatigue: 'The printed key is preserved as source evidence, while Q19 remains explicitly held rather than converted into unqualified teaching.',
  smooth: 'The decisive distinction is the economical latch mechanism or the coupled pacemaker behaviour of unitary smooth muscle.',
  motorUnit: 'The decisive distinction is one neuron and all of its fibres, not an entire muscle or a one-to-one nerve–fibre pair.',
  properties: 'The decisive distinction is whether the stem asks for a tissue function or a mechanical property.',
  dystrophin: 'The decisive distinction is the link between actin and the sarcolemmal protein complex under mechanical stress.',
  sarcolemma: 'The decisive distinction is the specialised name for the muscle-cell plasma membrane.',
  proteins: 'The decisive distinction is thick, thin or regulatory protein function rather than a merely associated structural protein.',
  isometric: 'The decisive distinction is rising tension without whole-muscle shortening.',
  twitch: 'The decisive distinction is a single brief response with both contraction and relaxation.',
}

const questionRows = [
  [1,1,'sarcomere','B','Which of the following is the functional unit of a skeletal muscle fiber?',['Myofibril','Sarcomere','Sarcolemma','Sarcoplasm']],
  [2,1,'coupling','C','What ion is essential for muscle contraction?',['Sodium','Potassium','Calcium','Magnesium']],
  [3,1,'types','C','Which muscle type is involuntary and non-striated?',['Skeletal','Cardiac','Smooth','All of the above']],
  [4,1,'fatigue','D','Muscle fatigue is primarily caused by:',['Depletion of oxygen','Lactic acid accumulation','Depletion of glycogen','All of the above']],
  [5,1,'properties','C','Which of the following is not a function of skeletal muscle?',['Movement','Heat production','Pumping blood','Posture maintenance']],
  [6,2,'smooth','C','Smooth muscle contracts:',['Voluntarily','Rapidly','With low energy expenditure','In a striated pattern']],
  [7,2,'types','A','Which of these is NOT a characteristic of cardiac muscle?',['Spike AP','Involuntary','Striated','Has intercalated discs']],
  [8,2,'motorUnit','C','In muscle physiology, a motor unit consists of:',['One muscle and all nerves','One nerve and one muscle','One motor neuron and all the muscle fibers it innervates','All fibers of a muscle']],
  [9,2,'properties','D','The ability of a muscle to return to its original length after stretching is:',['Excitability','Contractility','Extensibility','Elasticity']],
  [10,2,'properties','C','Which of the following is NOT a function of muscle tissue?',['Movement of the body','Production of body heat','Storage of calcium','Communication']],
  [11,3,'types','B','Which type of muscle is responsible for pumping blood in the body?',['Skeletal muscle','Cardiac muscle','Smooth muscle','Voluntary muscle']],
  [12,3,'dystrophin','C','Which structural protein helps attach actin to the sarcolemma and\n    protects muscle fibers from mechanical stress?',['Titin','Nebulin','Dystrophin','Myosin']],
  [13,3,'sarcolemma','C','The plasma membrane of a muscle cell is called the:',['Myofiber','Sarcoplasm','Sarcolemma','Myofibril']],
  [14,3,'proteins','C','What are the main functional proteins involved in muscle contraction?',['Actin and dystrophin','Titin and nebulin','Actin and myosin','Myosin and troponin']],
  [15,3,'isometric','D','in which type of contraction is the muscle develop tension but not\n    shorten?',['Isotonic','Eccentric','Concentric','Isometric']],
  [16,4,'twitch','C','Which of the following best describes a "muscle twitch"?',['Sustained muscle contraction','Muscle spasm due to nerve injury','A single, brief contraction and relaxation cycle','Involuntary tonic contraction']],
  [17,4,'coupling','A','What is the term for the invaginations of the sarcolemma?',['T-tubules','Sarcoplasmic reticulum','Myofibrils','Actin filaments']],
  [18,4,'smooth','B','Which type of smooth muscle is found in the gastrointestinal tract and\n    exhibits pacemaker activity?',['Multi-unit','Unitary','Striated','Voluntary']],
  [19,4,'fatigue','D','What is a likely cause of muscle cramps in hypokalemia?',['Increased muscle extensibility','Reduced membrane excitability due to lower extracellular K⁺','High sodium levels increasing excitability','Hyperpolarization leading to spontaneous contractions']],
  [20,4,'isometric','C','What happens during an isometric muscle contraction?',['The muscle shortens','The muscle lengthens','The muscle develops tension but doesn’t shorten','The muscle relaxes']],
  [21,5,'coupling','D','What is the function of T tubules in skeletal muscle fibers?',['Increase the surface area of the sarcolemma','Help movement of ions and other substances into and out of the cell','Help the spread of depolarization wave to the interior of muscle fibers','All of the above']],
  [22,5,'sarcomere','C','Z lines (discs) divide the myofibril into smaller units called:',['Fasciculi','Myofibers','Sarcomeres','Myofibrils']],
  [23,5,'proteins','B','Which protein is responsible for covering the binding sites on actin?',['Troponin','Tropomyosin','Myosin','Troponin C']],
  [24,5,'coupling','B','Which organelle is responsible for storing and releasing calcium ions in\n    muscle fibers?',['Golgi apparatus','Sarcoplasmic reticulum','Mitochondria','Ribosomes']],
  [25,5,'coupling','D','What happens during the relaxation of muscle fibers?',['Calcium ions are transported into the sarcoplasmic reticulum','Troponin returns to its original state, covering the binding sites on actin','Actin filaments slide back to their original position','All of the above']],
  [26,6,'proteins','D','Function of Tropomyosin in skeletal muscle include:',['Releasing Ca++ after propagation of action potential','Sliding on actin shortening to produce','Binding to myosin during contraction','Acting as a relaxing protein at rest by covering binding sites on actin.']],
  [27,6,'proteins','D','Main protein that forms thick muscle protein is:',['Troponin','Tropomyosin','Actin','Myosin']],
  [28,6,'sarcomere','A','During muscle contraction:',['A bands remain constant.','Tropomyosin molecules remain in place.','Z lines move further apart.','H zones become wider.']],
  [29,6,'proteins','D','Relaxing protein is:',['Myosin','Actin','Hzone','Tropomyosin']],
  [30,6,'coupling','A','Excitation contraction coupling involves all the following except:',['Release of Ca++ from troponin.','Formation of cross bridges between actin and myosin.','Spread of depolarization along the transverse tubules.','Hydrolysis of ATP to ADP.']],
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
  topic: 'Musculoskeletal system',
  subtopic: 'Muscle physiology',
  difficulty: 'Easy',
  question_type: 'Physiology',
  module: 'HU-LCS-103',
  module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology',
  clinical_relevance: '0.55',
  academic_relevance: '0.95',
  cognitive_effort_score: '0.3',
  exam_weight_by_year: 'HU_Y1=0.8',
  question_only_for: 'HU_Y1',
  concept_ids: '',
  years: 'HU_Y1',
  universities: 'hu',
  cognitive_effort: 'Low',
  setting: 'Academic',
  reasoning_level: '1',
  inferred_difficulty: '74',
  exam_relevance: '8',
  contextual_concept_ids: '',
  media_recommendations: '',
  attachments: '',
  attached_image: '',
  estimated_seconds: '55',
  randomise_answers: 'yes',
}

const questions = questionRows.map(([number, page, code, key, stem, options]) => {
  const spec = conceptSpecs[code]
  const fields = {
    id: `Q-HU-LCS103-PHY-F97-${String(number).padStart(2, '0')}`,
    title: stem,
    ...questionCommon,
    question: stem,
    correct_answer: key,
  }
  options.forEach((text, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = text
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `This is the source-keyed response, so the printed key is ${key}. ${teaching[code]} ${discriminator[code]}`
      : `This option is not the source-keyed response and is retained exactly as a distractor. ${teaching[code]} ${discriminator[code]}`
  })
  for (const letter of ['a','b','c','d','e','f']) {
    if (!fields[`answer_${letter}`]) {
      fields[`answer_${letter}`] = ''
      fields[`explanation_${letter}`] = ''
    }
  }
  const risk = number === 7
    ? ' The printed A key treats “Spike AP” as the exception; cardiac working-muscle action potentials have a rapid upstroke and plateau, so this wording is source-sensitive and the item must remain Draft pending faculty review.'
    : number === 19
      ? ' The printed D key links hypokalaemic hyperpolarisation to spontaneous contractions, while the same option set also prints reduced excitability; the exact source key is preserved but the item must remain Draft pending faculty review.'
      : ''
  const repeat = number === 20 ? ' This is a near-repeat of printed Q15 and remains a separate source occurrence.' : ''
  return {
    ...fields,
    main_concept: spec.id,
    library_ids: spec.article,
    resource_ids: `${source.assessment}\n${source.teaching}`,
    learning_objective: spec.objective,
    source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Teaching support: ${source.teaching}, physical PDF pp12-56.`,
    author_notes: `Transcribed from Family 97 physical p${page}; source capitalisation, spelling, punctuation and incomplete option wording are preserved.${repeat}${risk} No mark, media dependency or corrected answer is inferred.`,
  }
})

const sources = [
  {
    id: source.assessment,
    title: 'LCS-103 Physiology Questions — MCQ Muscle',
    institution: 'Helwan LCS-103 local question-bank corpus',
    processing_status: 'native_text',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - MCQ Muscle.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '',
    accessed_at: '',
    page_count: '6',
    sha256: '5c2fb18ea47b74ce252c6e756dd41c93531c7e6530eaf10b62a0786301fd0cb7',
    rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-3 direct named-course LCS Physiology question deck. Every page prints Physiology, Questions, MCQ MUSCLE and Dr El-Sawy, and every item has a right-column printed key. It is not a formal sitting paper or separately issued official key.',
    confidence: '0.9',
    is_assessment: 'yes',
  },
  {
    id: source.teaching,
    title: 'LCS-103 Physiology Lecture 1 — Muscle Physiology',
    institution: 'Local LCS-103 Physiology teaching corpus',
    processing_status: 'native_text',
    collection_id: 'hu-y1',
    source_relative_path: 'Year 1/LCS 103/Physiology/Theoretical/Lec 1 - Muscle Physiology/Muscle-Phys-26.pdf',
    source_uri: '',
    media_type: 'application/pdf',
    languages: 'en',
    publication_date: '',
    accessed_at: '',
    page_count: '60',
    sha256: '262c1ba3765a9922e9d48974891c6ae7d146fcd995cf59ce1aa0ed225ddba335',
    rights: 'Local LCS teaching material held for internal authoring only. No page image is redistributed.',
    qualification: 'Tier-4 direct local LCS-103 Physiology teaching deck titled Muscle Physiology and attributed to Nermien Waly. It supports explanations but is not a sitting paper, question bank or independent medical verification.',
    confidence: '0.86',
    is_assessment: 'no',
  },
]

const evidenceSpecs = {
  sarcomere: ['The sarcomere', 'is', 'the repeating contractile unit organised between Z lines', '18-24', 'The sarcomere; Structural functional arrangements of sarcomere; What does the sarcomere look like during cycling?', 'Physical PDF pages 18–24, sarcomere sequence', 'The sarcomere is the repeating contractile unit, and its bands change predictably as thin filaments slide.', 'art-hu-lcs103-phy-muscle-structure-coupling-definition'],
  coupling: ['Excitation–contraction coupling', 'links', 'T-tubule excitation to intracellular calcium release and filament activation', '19-25', 'T-tubules = invaginations of sarcolemma; Excitation contraction coupling steps', 'Physical PDF pages 19 and 22–25', 'T-tubules carry excitation inward and calcium release activates the troponin–tropomyosin switch.', 'art-hu-lcs103-phy-muscle-structure-coupling-mechanism'],
  types: ['Muscle tissue', 'is classified into', 'skeletal, cardiac and smooth types with different control and structure', '2, 49', 'Objectives; Smooth muscles', 'Physical PDF pages 2 and 49', 'Skeletal, cardiac and smooth muscle differ in control, striation and organ-level role.', 'art-hu-lcs103-phy-muscle-types-properties-definition'],
  fatigue: ['Muscle fatigue and electrolyte disturbance', 'can reduce', 'the ability to sustain normal contraction and excitability', '42-56', 'Muscle fatigue; Hypokalemia and membrane excitability', 'Physical PDF pages 42 and 56', 'Fatigue and altered extracellular potassium can both reduce reliable muscle performance.', 'art-hu-lcs103-phy-muscle-types-properties-clinical-significance'],
  smooth: ['Unitary smooth muscle', 'shows', 'gap-junction coupling and pacemaker activity in the gastrointestinal tract', '49', 'Smooth muscles', 'Physical PDF page 49, unitary-versus-multi-unit slide', 'Unitary gastrointestinal smooth muscle is gap-junction coupled and can exhibit pacemaker activity.', 'art-hu-lcs103-phy-muscle-types-properties-key-determinants'],
  motorUnit: ['A motor unit', 'is tested as', 'one motor neuron and all of the muscle fibres it innervates', '37', 'Motor unit — Define?', 'Physical PDF page 37 plus Family-97 printed Q8/key C', 'A motor unit joins one motor neuron to every skeletal-muscle fibre it supplies.', 'art-hu-lcs103-phy-muscle-types-properties-mechanism'],
  properties: ['Muscle tissue', 'has', 'contractility, excitability, extensibility and elasticity', '12', 'Structure and function of skeletal muscles', 'Physical PDF page 12, functional-properties list', 'Extensibility permits stretch, while elasticity returns the tissue toward its original length.', 'art-hu-lcs103-phy-muscle-types-properties-definition'],
  dystrophin: ['Dystrophin', 'helps attach', 'actin myofilaments to sarcolemmal proteins and protects fibres from mechanical stress', '15', 'Dystrophin', 'Physical PDF page 15, two explanatory bullets', 'Dystrophin mechanically links the actin apparatus to sarcolemmal proteins and protects the fibre.', 'art-hu-lcs103-phy-muscle-structure-coupling-key-determinants'],
  sarcolemma: ['The sarcolemma', 'is', 'the plasma membrane of a muscle fibre', '19', 'Terminology review', 'Physical PDF page 19, muscle-cell terminology list', 'The muscle-cell plasma membrane is the sarcolemma.', 'art-hu-lcs103-phy-muscle-structure-coupling-definition'],
  proteins: ['The functional muscle filaments', 'are', 'actin and myosin, regulated by troponin and tropomyosin', '14-24', 'Muscle filaments; Cross-bridges cycling', 'Physical PDF pages 14 and 21–24', 'Myosin forms thick filaments, actin forms thin filaments, and tropomyosin covers actin sites at rest.', 'art-hu-lcs103-phy-muscle-structure-coupling-key-determinants'],
  isometric: ['Isometric contraction', 'develops', 'tension at a fixed whole-muscle length', '39-40', 'Length-tension relationship; Isometric contraction', 'Physical PDF pages 39–40', 'In isometric contraction, tension develops while whole-muscle length remains fixed.', 'art-hu-lcs103-phy-muscle-structure-coupling-common-misconceptions'],
  twitch: ['A muscle twitch', 'is', 'a single brief contraction and relaxation cycle in a muscle fibre', '36', 'Muscle twitch', 'Physical PDF page 36, definition bullet', 'A twitch is one brief contraction-and-relaxation cycle after a single action potential.', 'art-hu-lcs103-phy-muscle-types-properties-mechanism'],
}

const evidenceRows = Object.entries(evidenceSpecs).map(([code, values]) => {
  const [subject, predicate, object, page, section, detail, spanText, sectionId] = values
  const spec = conceptSpecs[code]
  const assessmentOnly = code === 'motorUnit'
  return {
    code,
    spec,
    subject,
    predicate,
    object,
    page,
    section,
    detail,
    spanText,
    sectionId,
    resource: assessmentOnly ? source.assessment : source.teaching,
    role: assessmentOnly ? 'local_assessment' : 'local_curriculum',
    support: assessmentOnly
      ? 'In muscle physiology, a motor unit consists of: C. One motor neuron and all the muscle fibers it innervates. Printed key C.'
      : spanText,
  }
})

const claims = evidenceRows.map((row) => ({
  id: `CLM-MSK-HULCS103-F97-${row.code.toUpperCase()}-01`,
  concept_id: row.spec.id,
  subject: row.subject,
  predicate: row.predicate,
  object: row.object,
  display_text: `${row.subject} ${row.predicate} ${row.object}.`,
  risk_class: 'foundational_stable',
  verification_status: 'needs_evidence',
  conflict_status: row.code === 'fatigue' ? 'source_ambiguity_in_assessment_item' : row.code === 'types' ? 'source_wording_review_required' : 'none',
  confidence: row.resource === source.assessment ? '0.78' : '0.86',
  freshness: 'stable_local_curriculum_fact',
  time_sensitive: 'no',
  qualifiers: `polarity: affirmative\nauthority: direct local Helwan curriculum, not independent verification\nassessment caveat: ${['fatigue','types'].includes(row.code) ? 'Family-97 source-risk items remain Draft' : 'none'}`,
}))

const citations = evidenceRows.map((row) => ({
  id: `CIT-HULCS103-F97-${row.code.toUpperCase()}-01`,
  claim_id: `CLM-MSK-HULCS103-F97-${row.code.toUpperCase()}-01`,
  resource_id: row.resource,
  evidence_role: row.role,
  locator_type: 'page',
  locator_page: row.page,
  locator_section: row.section,
  locator_detail: row.detail,
  support_span: row.support,
  context_note: 'Source wording is preserved where quoted; article prose remains Draft pending independent verification.',
  confidence: row.resource === source.assessment ? '0.78' : '0.86',
  counts_as_claim_evidence: 'no',
}))

const spans = evidenceRows.map((row) => ({
  id: `SPN-HULCS103-F97-${row.code.toUpperCase()}-01`,
  article_id: row.spec.article,
  section_id: row.sectionId,
  text: row.spanText,
  claim_ids: `CLM-MSK-HULCS103-F97-${row.code.toUpperCase()}-01`,
  citation_ids: `CIT-HULCS103-F97-${row.code.toUpperCase()}-01`,
}))

if (concepts.length !== 12 || articles.length !== 2 || questions.length !== 30 || sources.length !== 2 || claims.length !== 12 || citations.length !== 12 || spans.length !== 12) {
  throw new Error('Family-97 governed count mismatch')
}

await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8')
await writeFile(paths.articles, articles.map(item).join(divider), 'utf8')
await writeFile(paths.questions, questions.map(item).join(divider), 'utf8')
await writeFile(paths.sources, sources.map(item).join(divider), 'utf8')
await writeFile(paths.claims, claims.map(item).join(divider), 'utf8')
await writeFile(paths.citations, citations.map(item).join(divider), 'utf8')
await writeFile(paths.spans, spans.map(item).join(divider), 'utf8')

console.log(JSON.stringify({
  files: paths,
  counts: { concepts: concepts.length, articles: articles.length, questions: questions.length, sources: sources.length, claims: claims.length, citations: citations.length, spans: spans.length },
  sourceRisks: ['Q7 printed A', 'Q19 printed D'],
  repeatedOccurrences: ['Q15/Q20 near-repeat'],
}, null, 2))
