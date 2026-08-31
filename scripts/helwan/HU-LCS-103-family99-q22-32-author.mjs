#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')

const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family99-q22-32-muscle-concept-links.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family99-q22-32-muscle-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family99-q22-32-muscle-mcq.md'),
  sources: resolve(importRoot, 'evidence/HU-LCS-103-family99-q22-32-sources.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family99-q22-32-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family99-q22-32-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family99-q22-32-spans.md'),
}

const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`

const source = { assessment: 'src_fad2f5ab18e1efa59eb1', teaching: 'src_262c1ba3765a9922e9d4' }
const article = { filaments: 'ART-HU-LCS103-PHY-F99-FILAMENT-SARCOMERE', function: 'ART-HU-LCS103-PHY-F99-RELAXATION-ATP-FUNCTION' }

const conceptSpecs = {
  proteins: {
    id: 'CON-MSK-287D88DF2F6B8C', key: 'muscle.proteins.myosin-actin-troponin-structure', label: "Myosin has two heavy chains forming flexible cross-bridge heads, and actin's active site is covered at rest by tropomyosin held in place by the three troponin subunits", article: article.filaments,
    objective: 'Differentiate myosin, actin, troponin and tropomyosin by filament location and function.',
    teaching: 'Myosin forms thick filaments and cross-bridge heads, while actin, troponin and tropomyosin form the thin-filament system; tropomyosin covers actin binding sites at rest.',
    discriminator: 'ATP binds to the myosin head, and myosin is not a thin-filament protein.',
  },
  sarcomere: {
    id: 'CON-MSK-0824FE988ADA00', key: 'skeletal-muscle.sarcomere.definition-z-line-to-z-line', label: 'The sarcomere, the segment between two Z lines, is the functional contractile unit of striated muscle', article: article.filaments,
    objective: 'Identify the sarcomere as the myofibril segment between two Z lines or discs and recognise the band changes during contraction.',
    teaching: 'A sarcomere extends from one Z line to the next; during shortening the A band remains constant while the I band and H zone narrow.',
    discriminator: 'The Z-line boundary, rather than the distance between H zones or between actin and myosin, defines the sarcomere.',
  },
  rigor: {
    id: 'CON-MSK-6087C9C091ED85', key: 'muscle.rigor-mortis.mechanism-and-medicolegal', label: 'Rigor mortis is the total, permanent contracture of every muscle after death from loss of the ATP needed to separate actin and myosin, and it is used to help estimate time of death', article: article.function,
    objective: 'Explain rigor mortis as failure of ATP-dependent detachment between actin and myosin.',
    teaching: 'ATP binding is required for a myosin head to detach from actin, so ATP loss locks cross-bridges and produces rigor.',
    discriminator: 'Rigor is a detachment failure, not a failure of propagation, a loss of binding sites or troponin damage.',
  },
  coupling: {
    id: 'CON-MSK-3013AA61E917B7', key: 'muscle.excitation-contraction-coupling.calcium-troponin', label: 'Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site', article: article.function,
    objective: 'Recognise sarcoplasmic-reticulum calcium reuptake as a relaxation step and T-tubules as the route carrying depolarisation to deep myofibrils.',
    teaching: 'T-tubules carry the depolarisation wave into the fibre, the sarcoplasmic reticulum releases calcium for contraction, and active calcium reuptake into that reticulum supports relaxation.',
    discriminator: 'T-tubules transmit excitation but are not the principal calcium store, which is the sarcoplasmic reticulum.',
  },
  functions: {
    id: 'CON-MSK-43CD79301071ED', key: 'muscle.skeletal.overview-and-functions', label: 'Skeletal muscle is over four hundred voluntary muscles attached to bone, and contraction that depends on nerve supply serves four functions', article: article.function,
    objective: 'Identify heat production and body-temperature regulation as a skeletal-muscle function.',
    teaching: 'Skeletal-muscle functions include locomotor force, posture and joint stabilisation, heat production and assistance with venous drainage.',
    discriminator: 'Regulation of body temperature follows from heat production, unlike the unrelated renal, glucose, blood-pressure and food-intake distractors.',
  },
}

const concepts = Object.values(conceptSpecs).map((spec) => ({ id: spec.id, label: spec.label, canonical_key: spec.key, article_ids: `+${spec.article}` }))

const commonArticle = {
  arabic_title: '', subject: 'msk', topic: 'Musculoskeletal system', subtopic: 'Muscle physiology', primary_node_id: 'SYS-MSK', template_id: 'TPL-CONCEPT', archetype: 'concept', language: 'en', learner_stage: 'Years 1–3 foundation', high_yield: 'High', time_sensitive: 'stable', status: 'Draft', owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Physiology faculty', final_publisher: 'Admin team', published_summary: '', published_sections: '', universities: 'hu', years: 'HU_Y1', module: 'HU-LCS-103', media: '', publication_gate: 'needs_evidence', conflicts: '[clear]', evidence_gaps: 'Independent medical verification and named Helwan Physiology faculty review are required before publication.', last_reviewed: '', review_due: '',
}

const filamentCodes = ['proteins', 'sarcomere']
const functionCodes = ['rigor', 'coupling', 'functions']
const idsFor = (codes) => codes.map((code) => conceptSpecs[code].id).join('\n')
const claimsFor = (codes) => codes.map((code) => `CLM-MSK-HULCS103-F99-${code.toUpperCase()}-01`).join('\n')
const spansFor = (codes) => codes.map((code) => `SPN-HULCS103-F99-${code.toUpperCase()}-01`).join('\n')
const annotationQuote = {
  proteins: 'Myosin forms thick filaments and projecting cross-bridge heads, whereas actin, troponin and tropomyosin belong to the thin-filament system.',
  sarcomere: 'A sarcomere extends from one Z line to the next.',
  rigor: 'Without ATP, myosin heads cannot detach from actin and the muscle remains locked in rigor.',
  coupling: 'T-tubules carry depolarisation inward, while the sarcoplasmic reticulum stores, releases and reaccumulates calcium.',
  functions: 'Skeletal-muscle heat production contributes to regulation of body temperature.',
}
const calloutLine = {
  proteins: 'Myosin is thick; actin, troponin and tropomyosin are thin-filament proteins.',
  sarcomere: 'A sarcomere runs from one Z line to the next.',
  rigor: 'ATP loss locks actin–myosin cross-bridges in rigor.',
  coupling: 'T-tubules transmit excitation and sarcoplasmic reticulum handles calcium.',
  functions: 'Skeletal muscle helps regulate body temperature by producing heat.',
}

const articles = [
  {
    id: article.filaments, title: 'Sarcomere boundaries and the thick–thin filament protein system', aliases: 'Sarcomere and Z lines\nMyosin, actin, troponin and tropomyosin\nThick and thin filament review', ...commonArticle, microtopic: 'Sarcomere and filament proteins', nanotopic: '', secondary_node_ids: 'DIS-PHY-T02', reading_time: '6',
    summary: 'The sarcomere is the repeating Z-line-to-Z-line contractile segment of a myofibril. Thick myosin filaments contribute projecting heads that bind ATP and form cross-bridges, while thin filaments contain actin plus the troponin–tropomyosin regulatory system. During contraction the A band remains constant even as the I band and H zone narrow.',
    sections: `### Definition
A sarcomere extends from one Z line to the next. It is the repeating structural and functional contractile unit along each myofibril and contains interdigitating thick and thin filaments.

### Mechanism
Calcium binding to troponin moves tropomyosin away from actin's myosin-binding sites. Myosin heads then interact with actin, and ATP binding and hydrolysis support repeated attachment, movement and detachment.

### Key determinants
Myosin forms thick filaments and projecting cross-bridge heads, whereas actin, troponin and tropomyosin belong to the thin-filament system. The myosin head carries the ATP-binding site required for the cross-bridge cycle.

### Clinical significance
Separating filament identity from filament behaviour prevents common errors in both physiology and structural questions. Rigor demonstrates the functional consequence when ATP-dependent detachment fails, while normal shortening demonstrates that filaments slide rather than themselves becoming shorter.

### Common misconceptions
The sarcomere is not the distance between two H zones or between actin and myosin. Myosin is not a thin-filament protein. Tropomyosin covers actin sites at rest and is not the calcium store or calcium-release channel.`,
    hold_these: 'Myosin is thick; actin, troponin and tropomyosin are thin-filament proteins.\nA sarcomere runs from one Z line to the next.', lose_the_mark: 'Putting myosin in the thin filament.\nDefining a sarcomere by H zones instead of Z lines.\nSaying the A band shortens during sliding-filament contraction.', related_concepts: idsFor(filamentCodes), related_articles: `${article.function}: reviews calcium reuptake, T-tubules, ATP-dependent detachment and heat production`, question_ids: [22, 23, 27, 28, 29, 31, 32].map((number) => `Q-HU-LCS103-PHY-F99-${number}`).join('\n'), resource_ids: `${source.teaching}\n${source.assessment}`, module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Sarcomere and Filaments', university_notes: 'hu: Restricted to the HU-LCS-103 Year-1 Physiology muscle block and the exact Family-99 Q22–Q32 assessment boundary.', annotations: filamentCodes.map((code) => `### definition_of · ${conceptSpecs[code].id}\nQuote: ${annotationQuote[code]}\nBlock: body`).join('\n\n'), article_source_ids: `${source.teaching}\n${source.assessment}`, claim_ids: claimsFor(filamentCodes), span_ids: spansFor(filamentCodes), media_recommendations: '', callout_evidence: filamentCodes.map((code) => `### ${calloutLine[code]}\nClaims: CLM-MSK-HULCS103-F99-${code.toUpperCase()}-01\nCitations: CIT-HULCS103-F99-${code.toUpperCase()}-01\nSpan: SPN-HULCS103-F99-${code.toUpperCase()}-01`).join('\n\n'), evidence_basis: 'Direct local LCS-103 Physiology teaching lecture, physical pages 14–24.\nDirect named-instructor LCS-103 Physiology quiz bank, physical pages 5–6, supplies exact assessment wording and printed keys but is not independent medical verification.', notes: 'Both within-source repeats Q22/Q31 and Q23/Q32 remain separate exact assessment occurrences.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by these text-only questions.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
  },
  {
    id: article.function, title: 'Relaxation, T-tubules, ATP-dependent detachment and muscle heat', aliases: 'Skeletal-muscle relaxation\nT-tubules and calcium handling\nATP, rigor and muscle thermogenesis', ...commonArticle, microtopic: 'Relaxation, rigor and skeletal-muscle function', nanotopic: '', secondary_node_ids: 'DIS-PHY-T02', reading_time: '6',
    summary: 'T-tubules conduct depolarisation rapidly into a skeletal-muscle fibre while the sarcoplasmic reticulum stores and releases calcium. Relaxation requires calcium pumping back into that reticulum and ATP-dependent detachment of myosin from actin. ATP loss therefore locks cross-bridges in rigor, while normal skeletal-muscle activity contributes heat for body-temperature regulation.',
    sections: `### Definition
T-tubules carry depolarisation inward, while the sarcoplasmic reticulum stores, releases and reaccumulates calcium. These structures cooperate but do not have interchangeable roles.

### Mechanism
Relaxation requires calcium to be pumped back into the sarcoplasmic reticulum so troponin loses calcium and tropomyosin can cover the actin-binding sites again. ATP binding lets myosin detach from actin. Without ATP, myosin heads cannot detach from actin and the muscle remains locked in rigor.

### Key determinants
T-tubules transmit excitation rapidly to deep myofibrils and are not the principal calcium store. ATP participates in cross-bridge cycling and detachment. Skeletal-muscle heat production contributes to regulation of body temperature.

### Clinical significance
Rigor mortis applies the ordinary cross-bridge mechanism after death: ATP depletion prevents detachment. In living muscle, intact calcium reuptake and ATP availability permit relaxation instead of persistent contracture.

### Common misconceptions
Do not call T-tubules calcium stores; the sarcoplasmic reticulum stores calcium. Do not describe rigor as absent actin binding, because rigor is persistent actin–myosin attachment. Do not replace skeletal-muscle thermogenesis with unrelated renal or metabolic regulation distractors.`,
    hold_these: 'ATP loss locks actin–myosin cross-bridges in rigor.\nT-tubules transmit excitation and sarcoplasmic reticulum handles calcium.\nSkeletal muscle helps regulate body temperature by producing heat.', lose_the_mark: 'Calling T-tubules the calcium store.\nSaying rigor is failure to attach rather than failure to detach.\nForgetting heat production as a skeletal-muscle function.', related_concepts: idsFor(functionCodes), related_articles: `${article.filaments}: reviews sarcomere boundaries and thick–thin filament proteins`, question_ids: [24, 25, 26, 30].map((number) => `Q-HU-LCS103-PHY-F99-${number}`).join('\n'), resource_ids: `${source.teaching}\n${source.assessment}`, module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Relaxation and Function', university_notes: 'hu: Restricted to the HU-LCS-103 Year-1 Physiology muscle block and the exact Family-99 Q22–Q32 assessment boundary.', annotations: functionCodes.map((code) => `### definition_of · ${conceptSpecs[code].id}\nQuote: ${annotationQuote[code]}\nBlock: body`).join('\n\n'), article_source_ids: `${source.teaching}\n${source.assessment}`, claim_ids: claimsFor(functionCodes), span_ids: spansFor(functionCodes), media_recommendations: '', callout_evidence: functionCodes.map((code) => `### ${calloutLine[code]}\nClaims: CLM-MSK-HULCS103-F99-${code.toUpperCase()}-01\nCitations: CIT-HULCS103-F99-${code.toUpperCase()}-01\nSpan: SPN-HULCS103-F99-${code.toUpperCase()}-01`).join('\n\n'), evidence_basis: 'Direct local LCS-103 Physiology teaching lecture, physical pages 12–42.\nDirect named-instructor LCS-103 Physiology quiz bank, physical pages 5–6, supplies exact assessment wording and printed keys; Q24 provides the local rigor assessment wording.', notes: 'No media, practical or written dependency is present in this bounded text-only slice.',
    field_notes: `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by these text-only questions.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`,
  },
]

const questionRows = [
  [22, 5, 'proteins', 'B', 'The function of Tropomyosin in skeletal muscle include:', ['Binding to myosin during contraction.', 'Acting as a relaxing protein covering binding site on actin.', 'Sliding on actin shortening to produce.', 'Releasing Ca++ after propagation of action potential.', 'Reuptake of Ca++ during muscle relaxation.']],
  [23, 5, 'sarcomere', 'A', 'As regard sarcomere, which is true:', ['It is the distance between 2 z-lines.', 'It is prolonged during contraction.', 'The width of the I band does not change during contraction.', 'The width of the A band shortens and change during contraction.', 'Is the structural unit of the skeletal muscle.']],
  [24, 5, 'rigor', 'A', 'Rigor mortis is due to:', ['Failure of detachment between actin and myosin.', 'Excessive release of Ca++ from SR.', 'Damage of troponin protein molecules.', 'Lack of binding sites of myosin on actin.', 'Failure of propagation of action potential along muscle fibers.']],
  [25, 5, 'coupling', 'B', 'Among the steps of skeletal muscle relaxation:', ['Binding of cross bridges to actin.', 'Pumping of Ca++ back into the sarcoplasmic reticulum.', 'Binding of Ca++ to troponin C.', 'Inward spread of the depolarization waves along the transverse tubules.', 'Binding of Ca++ to troponin C.']],
  [26, 5, 'functions', 'C', 'Functions of skeletal muscles include:', ['Regulation of food intake.', 'Regulation of arterial blood pressure.', 'Regulation of body temperature.', 'Regulation of urine formation.', 'Regulation of blood glucose level.']],
  [27, 5, 'proteins', 'B', 'The myosin head contains:', ['AMP binding sites', 'ATP binding sites', 'ADP binding sites', 'GTP binding sites']],
  [28, 6, 'proteins', 'D', 'The main protein that forms the thick muscle protein is:', ['Troponin', 'Tropomyosin', 'Actin', 'Myosin', 'elastin']],
  [29, 6, 'proteins', 'D', 'One of the following is NOT a protein that forms the thin muscle protein:', ['troponin C', 'tropomyosin', 'actin', 'myosin', 'troponin T']],
  [30, 6, 'coupling', 'E', 'The T tubule:', ['Helps in longitudinal distribution of fluids, ions and substances synthesized within the sarcoplasm or mitochondria.', 'Releases Ca2+ during muscle contraction and store it during muscle relaxation.', 'Runs parallel to the myofibrils.', 'Transmits chemical substances from the nerve to the muscle.', 'Allows the depolarization wave to pass rapidly inside the muscle fiber to activate deep myofibrils.']],
  [31, 6, 'proteins', 'B', 'Function of tropomyosin in skeletal muscle includes:', ['binding to myosin during contraction.', 'acting as a relaxing protein at rest by covering the binding sites on actin.', 'sliding on actin shortening.', 'releasing Ca after propagation of action potential.', 'shares in the formation of cross bridges.']],
  [32, 6, 'sarcomere', 'E', 'The Sarcomere:', ['is the distance between myosin and actin.', 'is the distance between two H zones.', 'is the cause of the cross striation of the skeletal muscle.', 'does not shorten when the muscle contracts.', 'is the part of the myofibril present between the 2 Z discs.']],
]

const questionCommon = { subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Muscle physiology', difficulty: 'Easy', question_type: 'Physiology', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology', clinical_relevance: '0.55', academic_relevance: '0.95', cognitive_effort_score: '0.3', exam_weight_by_year: 'HU_Y1=0.8', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Low', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '74', exam_relevance: '8', contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '55', randomise_answers: 'yes' }

const questions = questionRows.map(([number, page, code, key, stem, options]) => {
  const spec = conceptSpecs[code]
  const fields = { id: `Q-HU-LCS103-PHY-F99-${number}`, title: stem, ...questionCommon, question: stem, correct_answer: key }
  options.forEach((text, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = text
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The direct Family-99 quiz bank prints ${key} as the answer, so this is the exact source-keyed response. ${spec.teaching} ${spec.discriminator} The record remains Draft because the local quiz key is assessment evidence, not independent medical verification.`
      : `This option is retained exactly from the Family-99 quiz bank, but the printed right-column key does not select it; the source answer is ${key}. ${spec.teaching} ${spec.discriminator} The item remains Draft pending named Helwan Physiology faculty review.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) if (!fields[`answer_${letter}`]) { fields[`answer_${letter}`] = ''; fields[`explanation_${letter}`] = '' }
  const repeat = number === 31 ? ' This is a wording/option-set repeat of printed Q22 and remains a separate source occurrence.' : number === 32 ? ' This is a wording/option-set repeat of printed Q23 and remains a separate source occurrence.' : ''
  return { ...fields, main_concept: spec.id, library_ids: spec.article, resource_ids: `${source.assessment}\n${source.teaching}`, learning_objective: spec.objective, source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Teaching support: ${source.teaching}, physical PDF pp12-42.`, author_notes: `Transcribed as exact source wording from Family 99 physical p${page}; spelling, capitalisation, punctuation, option order and printed key are preserved.${repeat} No mark, media dependency or corrected answer is inferred.` }
})

const sources = [
  { id: source.assessment, title: 'LCS-103 Physiology — Quiz most important MCQs', institution: 'Helwan LCS-103 local question-bank corpus', processing_status: 'native_text', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - Quiz most important MCQs.pdf', source_uri: '', media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '9', sha256: 'fad2f5ab18e1efa59eb1620bfa836c22c791f3de14b488c85ba03c84dfbfd125', rights: 'Local Helwan teaching and assessment material held for internal authoring only. No page image is redistributed.', qualification: 'Tier-3 direct named-instructor LCS Physiology quiz bank. Every footer prints Dr Omar Sheashaa and every item carries a right-column printed key. It is not a formal sitting paper or separately issued official key.', confidence: '0.9', is_assessment: 'yes' },
  { id: source.teaching, title: 'LCS-103 Physiology Lecture 1 — Muscle Physiology', institution: 'Local LCS-103 Physiology teaching corpus', processing_status: 'native_text', collection_id: 'hu-y1', source_relative_path: 'Year 1/LCS 103/Physiology/Theoretical/Lec 1 - Muscle Physiology/Muscle-Phys-26.pdf', source_uri: '', media_type: 'application/pdf', languages: 'en', publication_date: '', accessed_at: '', page_count: '60', sha256: '262c1ba3765a9922e9d48974891c6ae7d146fcd995cf59ce1aa0ed225ddba335', rights: 'Local LCS teaching material held for internal authoring only. No page image is redistributed.', qualification: 'Tier-4 direct local LCS-103 Physiology teaching deck titled Muscle Physiology and attributed to Nermien Waly. It supports explanations but is not a sitting paper, question bank or independent medical verification.', confidence: '0.86', is_assessment: 'no' },
]

const evidenceSpecs = {
  proteins: ['The skeletal-muscle filament system', 'contains', 'thick myosin and thin actin, troponin and tropomyosin components', '14-24', 'Muscle filaments; Cross-bridges cycling', 'Physical PDF pages 14 and 21–24', annotationQuote.proteins, 'art-hu-lcs103-phy-f99-filament-sarcomere-key-determinants', source.teaching, 'local_curriculum'],
  sarcomere: ['The sarcomere', 'extends from', 'one Z line to the next and shows predictable band changes during shortening', '18-24', 'The sarcomere; Structural functional arrangements', 'Physical PDF pages 18–24', annotationQuote.sarcomere, 'art-hu-lcs103-phy-f99-filament-sarcomere-definition', source.teaching, 'local_curriculum'],
  rigor: ['Rigor mortis', 'results from', 'failure of detachment between actin and myosin when ATP is unavailable', '5', 'Printed Q24', 'Physical Family-99 PDF page 5, exact keyed item', annotationQuote.rigor, 'art-hu-lcs103-phy-f99-relaxation-atp-function-mechanism', source.assessment, 'local_assessment'],
  coupling: ['Skeletal-muscle relaxation', 'requires', 'calcium reuptake into sarcoplasmic reticulum after T-tubule-mediated excitation', '19-25', 'T-tubules; Excitation contraction coupling', 'Physical PDF pages 19 and 22–25', annotationQuote.coupling, 'art-hu-lcs103-phy-f99-relaxation-atp-function-definition', source.teaching, 'local_curriculum'],
  functions: ['Skeletal muscle', 'produces', 'heat that contributes to regulation of body temperature', '12', 'Structure and function of skeletal muscles', 'Physical PDF page 12 plus Family-99 Q26/key C', annotationQuote.functions, 'art-hu-lcs103-phy-f99-relaxation-atp-function-key-determinants', source.teaching, 'local_curriculum'],
}
const evidenceRows = Object.entries(evidenceSpecs).map(([code, values]) => { const [subject, predicate, object, page, section, detail, text, sectionId, resource, role] = values; return { code, spec: conceptSpecs[code], subject, predicate, object, page, section, detail, text, sectionId, resource, role } })

const claims = evidenceRows.map((row) => ({ id: `CLM-MSK-HULCS103-F99-${row.code.toUpperCase()}-01`, concept_id: row.spec.id, subject: row.subject, predicate: row.predicate, object: row.object, display_text: `${row.subject} ${row.predicate} ${row.object}.`, risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'none', confidence: row.resource === source.assessment ? '0.8' : '0.86', freshness: 'stable_local_curriculum_fact', time_sensitive: 'no', qualifiers: `polarity: affirmative\nauthority: direct local Helwan curriculum, not independent verification\nassessment boundary: Family-99 Q22–Q32 only` }))
const citations = evidenceRows.map((row) => ({ id: `CIT-HULCS103-F99-${row.code.toUpperCase()}-01`, claim_id: `CLM-MSK-HULCS103-F99-${row.code.toUpperCase()}-01`, resource_id: row.resource, evidence_role: row.role, locator_type: 'page', locator_page: row.page, locator_section: row.section, locator_detail: row.detail, support_span: row.text, context_note: 'Source wording is preserved where quoted; article prose remains Draft pending independent verification.', confidence: row.resource === source.assessment ? '0.8' : '0.86', counts_as_claim_evidence: 'no' }))
const spans = evidenceRows.map((row) => ({ id: `SPN-HULCS103-F99-${row.code.toUpperCase()}-01`, article_id: row.spec.article, section_id: row.sectionId, text: row.text, claim_ids: `CLM-MSK-HULCS103-F99-${row.code.toUpperCase()}-01`, citation_ids: `CIT-HULCS103-F99-${row.code.toUpperCase()}-01` }))

if (concepts.length !== 5 || articles.length !== 2 || questions.length !== 11 || sources.length !== 2 || claims.length !== 5 || citations.length !== 5 || spans.length !== 5) throw new Error('Family-99 Q22–Q32 governed count mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8')
await writeFile(paths.articles, articles.map(item).join(divider), 'utf8')
await writeFile(paths.questions, questions.map(item).join(divider), 'utf8')
await writeFile(paths.sources, sources.map(item).join(divider), 'utf8')
await writeFile(paths.claims, claims.map(item).join(divider), 'utf8')
await writeFile(paths.citations, citations.map(item).join(divider), 'utf8')
await writeFile(paths.spans, spans.map(item).join(divider), 'utf8')
console.log(JSON.stringify({ files: paths, counts: { concepts: concepts.length, articles: articles.length, questions: questions.length, sources: sources.length, claims: claims.length, citations: citations.length, spans: spans.length }, keys: questions.map((row) => row.correct_answer).join(''), repeats: ['Q22/Q31', 'Q23/Q32'], practical: 0, written: 0, media: 0 }, null, 2))
