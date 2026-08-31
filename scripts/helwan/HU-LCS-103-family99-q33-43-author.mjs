#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family99-q33-43-muscle-concept-links.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family99-q33-43-muscle-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family99-q33-43-muscle-mcq.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family99-q33-43-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family99-q33-43-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family99-q33-43-spans.md'),
}

const divider = '\n\n---\n\n'
const item = (fields) => `# Item\n\n${Object.entries(fields).map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n\n')}\n`
const source = { assessment: 'src_fad2f5ab18e1efa59eb1', helwan: 'src_262c1ba3765a9922e9d4', kasr: 'src_59643edb9d371bcefa2c' }
const article = {
  structure: 'ART-HU-LCS103-PHY-F99-Q33-43-MYOFIBRIL-CONTRACTION',
  excitation: 'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
}

const conceptSpecs = {
  proteins: { id: 'CON-MSK-287D88DF2F6B8C', key: 'muscle.proteins.myosin-actin-troponin-structure', label: "Myosin has two heavy chains forming flexible cross-bridge heads, and actin's active site is covered at rest by tropomyosin held in place by the three troponin subunits", article: article.structure, objective: 'Identify myosin as the thick-filament and cross-bridge protein, and distinguish it from actin, troponin and tropomyosin.', teaching: 'Myosin forms the thick filament and its projecting heads form cross bridges; actin, troponin and tropomyosin belong to the thin filament.', discriminator: 'Neither actin nor the regulatory proteins form the thick-filament cross bridges.' },
  sarcomere: { id: 'CON-MSK-0824FE988ADA00', key: 'skeletal-muscle.sarcomere.definition-z-line-to-z-line', label: 'The sarcomere, the segment between two Z lines, is the functional contractile unit of striated muscle', article: article.structure, objective: 'Predict sarcomere band changes during shortening and identify the H-zone filament content.', teaching: 'A sarcomere extends between Z lines; the A band stays constant while the Z lines approach and the H zone narrows.', discriminator: 'The H zone contains thick myosin without actin, whereas overlap zones contain both filament types.' },
  atp: { id: 'CON-MSK-AC42FE7AB41DF2', key: 'muscle.skeletal-cross-bridge.atp-detachment', label: 'A cross-bridge cannot detach without a fresh ATP, and without ATP the muscle goes into contracture', article: article.structure, objective: 'Explain why ATP is needed for cross-bridge detachment and normal relaxation.', teaching: 'A fresh ATP binds the myosin head and lowers its affinity for actin, permitting detachment during the cross-bridge cycle.', discriminator: 'ATP is therefore required for relaxation as well as for continuing contraction.' },
  coupling: { id: 'CON-MSK-3013AA61E917B7', key: 'muscle.excitation-contraction-coupling.calcium-troponin', label: 'Excitation–contraction coupling relays a T-tubule depolarisation into calcium release, calcium onto troponin C, and tropomyosin off the actin site', article: article.excitation, objective: 'Distinguish T-tubule conduction, sarcoplasmic-reticulum calcium handling, troponin activation and calcium removal.', teaching: 'T-tubules carry depolarisation inward; sarcoplasmic-reticulum calcium binds troponin C, and calcium reuptake terminates a single contraction.', discriminator: 'Calmodulin regulates smooth muscle, whereas skeletal-muscle calcium binds troponin C.' },
  actionPotential: { id: 'CON-MSK-3B9143FBE075E4', key: 'muscle.skeletal.electrical-and-excitability-changes', label: "Skeletal muscle's own action potential resembles the nerve's but finishes before contraction starts, which is why the fibre can be tetanised", article: article.excitation, objective: 'Recognise the short skeletal-muscle action potential and its inward spread through T-tubules.', teaching: 'The skeletal-muscle action potential has no prolonged plateau, spreads along the sarcolemma and inward through T-tubules, and precedes contraction.', discriminator: 'A prolonged plateau characterises cardiac rather than skeletal muscle.' },
  nmtSequence: { id: 'CON-MSK-77D955AAB4D0FA', key: 'muscle.neuromuscular-transmission.sequence', label: 'Neuromuscular transmission runs presynaptic calcium, acetylcholine exocytosis, a cation channel on the end plate, the end-plate potential, then hydrolysis by acetylcholinesterase', article: article.excitation, objective: 'Place neuromuscular transmission before the muscle action potential and excitation–contraction coupling.', teaching: 'Acetylcholine release at the motor end plate produces a local end-plate potential that triggers a propagated muscle action potential.', discriminator: 'Transmission is chemical at the junction, but T-tubules conduct the muscle action potential within the fibre.' },
  nmtProperties: { id: 'CON-NEU-64B329335E9489', key: 'nmt.properties.delay-fatigue-ions-drugs', label: 'Neuromuscular transmission is one-directional, carries a fixed synaptic delay, fatigues with repeated use, and is shaped by Ca2+/Mg2+ and by three classes of drug', article: article.excitation, objective: 'Identify the direction, fatigue mechanism and drug effects of neuromuscular transmission.', teaching: 'Neuromuscular transmission is one-way from nerve to muscle and can fatigue when repeated stimulation exhausts acetylcholine vesicles.', discriminator: 'Succinylcholine is a depolarising neuromuscular blocker, not a physiological stimulant of transmission.' },
}

const concepts = Object.values(conceptSpecs).map((spec) => ({ id: spec.id, label: spec.label, canonical_key: spec.key, article_ids: `+${spec.article}` }))
const commonArticle = { arabic_title: '', subject: 'msk', topic: 'Musculoskeletal system', subtopic: 'Muscle physiology', primary_node_id: 'SYS-MSK', template_id: 'TPL-CONCEPT', archetype: 'concept', language: 'en', learner_stage: 'Years 1–3 foundation', high_yield: 'High', time_sensitive: 'stable', status: 'Draft', owner: 'Helwan Year-1 authoring lane', reviewer: 'Medical team, Helwan Physiology faculty', final_publisher: 'Admin team', published_summary: '', published_sections: '', universities: 'hu', years: 'HU_Y1', module: 'HU-LCS-103', media: '', publication_gate: 'needs_evidence', conflicts: '[clear]', evidence_gaps: 'Independent medical verification and named Helwan Physiology faculty review are required before publication.', last_reviewed: '', review_due: '' }
const structureCodes = ['proteins', 'sarcomere', 'atp']
const excitationCodes = ['coupling', 'actionPotential', 'nmtSequence', 'nmtProperties']
const idsFor = (codes) => codes.map((code) => conceptSpecs[code].id).join('\n')
const claimId = (code) => `CLM-HULCS103-F99-Q3343-${code.toUpperCase()}-01`
const citationId = (code) => `CIT-HULCS103-F99-Q3343-${code.toUpperCase()}-01`
const spanId = (code) => `SPN-HULCS103-F99-Q3343-${code.toUpperCase()}-01`
const annotationQuote = {
  proteins: 'Myosin heads form the cross bridges of skeletal muscle, whereas actin, troponin and tropomyosin are thin-filament proteins.',
  sarcomere: 'A sarcomere extends from one Z line to the next, and the A band remains constant during shortening.',
  atp: 'A fresh ATP molecule is required for a myosin head to detach from actin.',
  coupling: 'T-tubules carry depolarisation into the fibre, while the sarcoplasmic reticulum releases and reaccumulates calcium.',
  actionPotential: 'The skeletal-muscle action potential spreads inward through T-tubules and has no prolonged plateau phase.',
  nmtSequence: 'Neuromuscular transmission begins with acetylcholine release and proceeds from nerve to muscle at the motor end plate.',
  nmtProperties: 'Neuromuscular transmission is one-directional and can fatigue when acetylcholine vesicles are depleted.',
}
const calloutLine = {
  proteins: 'Myosin is the thick-filament and cross-bridge protein.', sarcomere: 'The A band stays constant while Z lines approach.', atp: 'ATP permits myosin detachment and relaxation.', coupling: 'T-tubules transmit excitation; the sarcoplasmic reticulum handles calcium.', actionPotential: 'The skeletal-muscle action potential has no prolonged plateau.', nmtSequence: 'The motor end plate converts acetylcholine release into muscle excitation.', nmtProperties: 'Neuromuscular transmission is one-way and fatigable.',
}
const claimsFor = (codes) => codes.map(claimId).join('\n')
const spansFor = (codes) => codes.map(spanId).join('\n')
const annotationsFor = (codes) => codes.map((code) => `### definition_of · ${conceptSpecs[code].id}\nQuote: ${annotationQuote[code]}\nBlock: body`).join('\n\n')
const calloutsFor = (codes) => codes.map((code) => `### ${calloutLine[code]}\nClaims: ${claimId(code)}\nCitations: ${citationId(code)}\nSpan: ${spanId(code)}`).join('\n\n')
const fieldNotes = `arabicTitle: Blank because no reviewed Arabic title was present.
nanotopicId: No reviewed nanotopic exists below the assigned node.
media: No media is required by these text-only questions.
publishedSummary: Blank because this remains Draft.
publishedSections: Blank because this remains Draft.
lastReviewed: New record; no named medical reviewer has completed review.
reviewDue: Set after first named medical review.`

const articles = [
  { id: article.structure, title: 'Myofibrils, sarcomeres and the cross-bridge cycle', aliases: 'Myofibril structure and longitudinal striation\nSarcomere bands and H zone\nCross bridges and ATP-dependent detachment', ...commonArticle, microtopic: 'Myofibril structure and shortening', nanotopic: '', secondary_node_ids: 'DIS-PHY-T02', reading_time: '7', summary: 'Myofibrils run longitudinally through a skeletal-muscle fibre and are built from repeating sarcomeres. Thick myosin filaments supply the cross-bridge heads, whereas the thin filament contains actin and its troponin–tropomyosin regulatory system. Sliding draws Z lines together without changing A-band width, and ATP is required for myosin to detach from actin.', sections: `### Definition
Myofibrils extend longitudinally through the fibre and contain repeating sarcomeres. A sarcomere extends from one Z line to the next, and the A band remains constant during shortening.

### Mechanism
Myosin heads form the cross bridges of skeletal muscle, whereas actin, troponin and tropomyosin are thin-filament proteins. Calcium exposes actin binding sites so the heads attach and generate movement. A fresh ATP molecule is required for a myosin head to detach from actin.

### Key determinants
The H zone is the central part of the A band that contains myosin but no actin. During contraction Z lines approach, the I band and H zone narrow, and the A band remains constant because thick-filament length is unchanged.

### Clinical significance
The ATP-detachment step explains why energy is needed for relaxation rather than only for force generation. When ATP is unavailable, attached heads cannot release actin and the muscle enters contracture.

### Common misconceptions
Myofibrils are much smaller than an entire muscle fibre and run longitudinally rather than producing cross striation by themselves. Myosin is not a thin-filament protein. Contraction does not widen the H zone or move Z lines farther apart.`, hold_these: 'Myosin is the thick-filament and cross-bridge protein.\nThe A band stays constant while Z lines approach.\nATP permits myosin detachment and relaxation.', lose_the_mark: 'Putting actin in the thick filament.\nPutting actin in the H zone.\nSaying ATP is unnecessary for relaxation.', related_concepts: idsFor(structureCodes), related_articles: `${article.excitation}: connects the motor end plate and muscle action potential to calcium release and reuptake`, question_ids: [33, 34, 35, 39, 40, 41].map((number) => `Q-HU-LCS103-PHY-F99-${number}`).join('\n'), resource_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`, module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Myofibrils and Contraction', university_notes: 'hu: Restricted to the exact Family-99 Q33–Q43 muscle-physiology assessment boundary.', annotations: annotationsFor(structureCodes), article_source_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`, claim_ids: claimsFor(structureCodes), span_ids: spansFor(structureCodes), media_recommendations: '', callout_evidence: calloutsFor(structureCodes), evidence_basis: 'Direct named-instructor Family-99 quiz bank, physical pages 7–8, supplies exact assessment wording and printed keys. The Helwan muscle lecture and Kasr 103 physiology source support Draft explanations but are not independent verification.', notes: 'All six printed occurrences assigned to this article remain separate; no wording/option-set repeat is collapsed.', field_notes: fieldNotes },
  { id: article.excitation, title: 'Neuromuscular transmission, T-tubules and termination of contraction', aliases: 'Motor end plate to skeletal-muscle action potential\nT-tubules and calcium release\nTermination of a single skeletal-muscle contraction', ...commonArticle, microtopic: 'Neuromuscular and excitation–contraction sequence', nanotopic: '', secondary_node_ids: 'DIS-PHY-T07\nDIS-PHY-T02', reading_time: '8', summary: 'Neuromuscular transmission carries excitation one way from a motor nerve to the end plate and can fatigue when acetylcholine vesicles are depleted. The resulting skeletal-muscle action potential has no prolonged plateau and travels inward through T-tubules. Calcium then binds troponin rather than calmodulin, and calcium reuptake into the sarcoplasmic reticulum terminates a single contraction.', sections: `### Definition
Neuromuscular transmission begins with acetylcholine release and proceeds from nerve to muscle at the motor end plate. The local end-plate response triggers a propagated skeletal-muscle action potential.

### Mechanism
Neuromuscular transmission is one-directional and can fatigue when acetylcholine vesicles are depleted. The skeletal-muscle action potential spreads inward through T-tubules and has no prolonged plateau phase. T-tubules carry depolarisation into the fibre, while the sarcoplasmic reticulum releases and reaccumulates calcium.

### Key determinants
In skeletal muscle, released calcium binds troponin C and moves tropomyosin away from actin. Calmodulin is the corresponding calcium sensor in smooth muscle, so it is the exception in a skeletal-muscle coupling list. A single contraction ends when cytosolic calcium is removed back into the sarcoplasmic reticulum.

### Clinical significance
Neuromuscular blockers can interrupt transmission even when the muscle membrane and contractile proteins remain intact. Succinylcholine depolarises the end plate and then blocks transmission; it should not be described as a physiological stimulant of the junction.

### Common misconceptions
T-tubules are sarcolemmal invaginations filled from the extracellular space, not intracellular-fluid reservoirs or the main calcium store. Closing nicotinic receptors or clearing acetylcholine ends junctional signalling, but the immediate event terminating contraction is removal of sarcoplasmic calcium.`, hold_these: 'T-tubules transmit excitation; the sarcoplasmic reticulum handles calcium.\nThe skeletal-muscle action potential has no prolonged plateau.\nThe motor end plate converts acetylcholine release into muscle excitation.\nNeuromuscular transmission is one-way and fatigable.', lose_the_mark: 'Calling T-tubules calcium stores.\nUsing calmodulin for skeletal-muscle thin-filament regulation.\nCalling succinylcholine a transmission stimulant.', related_concepts: idsFor(excitationCodes), related_articles: `${article.structure}: reviews the sarcomere and cross-bridge machinery activated by calcium`, question_ids: [36, 37, 38, 42, 43].map((number) => `Q-HU-LCS103-PHY-F99-${number}`).join('\n'), resource_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`, module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology > Neuromuscular and Excitation-Contraction Coupling', university_notes: 'hu: Restricted to the exact Family-99 Q33–Q43 muscle-physiology assessment boundary.', annotations: annotationsFor(excitationCodes), article_source_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`, claim_ids: claimsFor(excitationCodes), span_ids: spansFor(excitationCodes), media_recommendations: '', callout_evidence: calloutsFor(excitationCodes), evidence_basis: 'Direct named-instructor Family-99 quiz bank, physical pages 7–8, supplies exact assessment wording and printed keys. The Helwan muscle lecture and Kasr 103 physiology source support Draft explanations but are not independent verification.', notes: 'All five printed occurrences assigned to this article remain separate; no wording/option-set repeat is collapsed.', field_notes: fieldNotes },
]

const questionRows = [
  [33, 7, 'proteins', 'B', 'The myofibrils:', ['Are about 10 µm in diameter.', 'Extend from one end of the muscle fiber to the other, giving the muscle fiber its longitudinal striation.', 'The thick filaments contain the contractile protein actin, troponin, and tropomyosin.', 'The thin filaments contain the contractile protein myosin.', 'Each sarcomere contains two sets of thick filaments, one at each end.']],
  [34, 7, 'proteins', 'D', 'Relaxing protein is:', ['Myosin', 'Actin', 'H zone', 'Tropomyosin', 'T tubule']],
  [35, 7, 'proteins', 'D', 'Cross bridges of sarcomere in skeletal muscles are made up of:', ['actin.', 'troponin.', 'tropomyosin.', 'myosin.']],
  [36, 7, 'nmtProperties', 'C', 'As regard neuro-muscular transmission, all are true except:', ['It shows fatigue due to depletion of acetylcholine vesicles.', 'Occurs from nerve to muscle (one-way conduction).', 'It is stimulated by succinylcholine.', 'The width of the A band doesn’t change during contraction.']],
  [37, 7, 'coupling', 'C', 'As regard transverse tubules, all are true except:', ['It increases the surface area of the cell membrane.', 'It transmits action potential to inside the fiber.', 'It acts as Ca2+ stores.', 'It is absent in smooth muscle fibers.']],
  [38, 7, 'actionPotential', 'B', 'The action potential of skeletal muscles:', ['Has a prolonged plateau phase.', 'Spreads inwards to all parts of the muscle via T tubules.', 'Is longer than the action potential in cardiac muscle.', 'Causes reuptake of Ca2+ into terminal cisternae.']],
  [39, 8, 'coupling', 'D', 'During muscle contraction, all the following are true except:', ['The binding sites at the actin filament are activated by Ca2+.', 'The walk-along theory of contraction assumes that sliding of actin continues as long as Ca2+ is attached to troponin C.', 'Detachment of myosin heads from actin needs binding of ATP molecule.', 'The transverse tubules (TT) become filled with intracellular fluid.']],
  [40, 8, 'sarcomere', 'A', 'During muscle contraction:', ['The A bands remain constant.', 'The Z lines move further apart.', 'The tropomyosin molecules remain in place.', 'The bands are elongated.', 'The H zones become wider.']],
  [41, 8, 'atp', 'E', 'In skeletal muscles, all the following are true except:', ['Tropomyosin is found in the thin filaments.', 'Myosin is found in the thick filaments.', 'The lateral sacs of sarcoplasmic reticulum are rich in Ca2+.', 'Troponin C molecules bind Ca2+.', 'Energy from ATP is not required for muscle relaxation.']],
  [42, 8, 'coupling', 'B', 'Excitation-contraction coupling in skeletal muscles involves all the following events except one. Which one is this exception?', ['ATP hydrolysis.', 'Binding of Ca2+ to calmodulin.', 'Conformational change in dihydropyridine receptor.', 'Depolarization of the transverse tubule (T-tubule) membrane.', 'Increased Na+ conductance of sarcolemma.']],
  [43, 8, 'coupling', 'D', 'A single contraction of skeletal muscle is most likely to be terminated by which of the following actions?', ['Closure of post-synaptic nicotinic acetylcholine receptors.', 'Removal of acetylcholine from the neuro-muscular junction.', 'Removal of Ca2+ from the terminal of the motor neuron.', 'Removal of sarcoplasmic Ca2+.', 'Return of the dihydropyridine receptor to its resting conformation.']],
]
const questionCommon = { subject: 'msk', status: 'Draft', owner: 'Helwan Year-1 authoring lane', vignette: '', format: 'single best answer', written_parts: '', matching_options: '', matching_prompts: '', correct_answers: '', labeling_image: '', labeling_alt: '', labeling_points: '', completion_text: '', derived_from: '', topic: 'Musculoskeletal system', subtopic: 'Muscle physiology', difficulty: 'Easy', question_type: 'Physiology', module: 'HU-LCS-103', module_subject: 'HU-LCS-103 > Physiology > Muscle Physiology', clinical_relevance: '0.55', academic_relevance: '0.95', cognitive_effort_score: '0.3', exam_weight_by_year: 'HU_Y1=0.8', question_only_for: 'HU_Y1', concept_ids: '', years: 'HU_Y1', universities: 'hu', cognitive_effort: 'Low', setting: 'Academic', reasoning_level: '1', inferred_difficulty: '74', exam_relevance: '8', contextual_concept_ids: '', media_recommendations: '', attachments: '', attached_image: '', estimated_seconds: '55', randomise_answers: 'yes' }
const questions = questionRows.map(([number, page, code, key, stem, options]) => {
  const spec = conceptSpecs[code]
  const fields = { id: `Q-HU-LCS103-PHY-F99-${number}`, title: stem, ...questionCommon, question: stem, correct_answer: key }
  options.forEach((text, index) => {
    const letter = String.fromCharCode(65 + index)
    fields[`answer_${letter.toLowerCase()}`] = text
    fields[`explanation_${letter.toLowerCase()}`] = letter === key
      ? `The direct Family-99 quiz bank prints ${key} as the answer, so this is the exact source-keyed response. ${spec.teaching} ${spec.discriminator} The record remains Draft because this local quiz key is assessment evidence and has not received independent medical verification.`
      : `This option is retained exactly from the Family-99 quiz bank, but the printed right-column key selects ${key} instead. ${spec.teaching} ${spec.discriminator} The item remains Draft pending named Helwan Physiology faculty review and independent medical verification.`
  })
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) if (!Object.hasOwn(fields, `answer_${letter}`)) { fields[`answer_${letter}`] = ''; fields[`explanation_${letter}`] = '' }
  return { ...fields, main_concept: spec.id, library_ids: spec.article, resource_ids: `${source.assessment}\n${source.helwan}\n${source.kasr}`, learning_objective: spec.objective, source_citation: `${source.assessment}, physical PDF p${page}, printed Q${number}: exact source stem/options with right-column printed key ${key}. Draft explanation support: ${source.helwan} and ${source.kasr}.`, author_notes: `Transcribed as exact source wording from Family 99 physical p${page}; spelling, capitalisation, punctuation, option order and printed key are preserved. No exact wording/option-set repeat occurs inside Q33–Q43; every printed occurrence is retained. No mark, media dependency or corrected answer is inferred.` }
})

const evidenceSpecs = {
  proteins: { subject: 'Skeletal-muscle cross bridges', predicate: 'are formed by', object: 'myosin heads projecting from thick filaments', resource: source.helwan, role: 'local_curriculum', page: '14-24', section: 'Muscle filaments; Cross-bridges cycling', detail: 'Physical Helwan lecture pages 14 and 21–24.', support: 'Functional: actin and myosin.', article: article.structure, sectionId: 'art-hu-lcs103-phy-f99-q33-43-myofibril-contraction-mechanism' },
  sarcomere: { subject: 'The sarcomere A band', predicate: 'remains', object: 'constant during shortening while the H zone narrows', resource: source.assessment, role: 'local_assessment', page: '8', section: 'Printed Q40', detail: 'Physical Family-99 page 8, printed Q40 and key A.', support: 'The A bands remain constant.', article: article.structure, sectionId: 'art-hu-lcs103-phy-f99-q33-43-myofibril-contraction-key-determinants' },
  atp: { subject: 'Cross-bridge detachment', predicate: 'requires', object: 'a fresh ATP molecule binding to the myosin head', resource: source.assessment, role: 'local_assessment', page: '8', section: 'Printed Q41', detail: 'Physical Family-99 page 8, printed exception item Q41 and key E.', support: 'Energy from ATP is not required for muscle relaxation.', article: article.structure, sectionId: 'art-hu-lcs103-phy-f99-q33-43-myofibril-contraction-mechanism' },
  coupling: { subject: 'A single skeletal-muscle contraction', predicate: 'is terminated by', object: 'removal of sarcoplasmic calcium into the sarcoplasmic reticulum', resource: source.assessment, role: 'local_assessment', page: '8', section: 'Printed Q43', detail: 'Physical Family-99 page 8, printed Q43 and key D.', support: 'Removal of sarcoplasmic Ca2+.', article: article.excitation, sectionId: 'art-hu-lcs103-phy-f99-q33-43-nmj-coupling-key-determinants' },
  actionPotential: { subject: 'The skeletal-muscle action potential', predicate: 'spreads', object: 'inward through T-tubules without a prolonged plateau phase', resource: source.assessment, role: 'local_assessment', page: '7', section: 'Printed Q38', detail: 'Physical Family-99 page 7, printed Q38 and key B.', support: 'Spreads inwards to all parts of the muscle via T tubules.', article: article.excitation, sectionId: 'art-hu-lcs103-phy-f99-q33-43-nmj-coupling-mechanism' },
  nmtSequence: { subject: 'Neuromuscular transmission', predicate: 'proceeds', object: 'from nerve to muscle at the motor end plate', resource: source.assessment, role: 'local_assessment', page: '7', section: 'Printed Q36', detail: 'Physical Family-99 page 7, printed Q36 and key C identify the other statements as true.', support: 'Occurs from nerve to muscle (one-way conduction).', article: article.excitation, sectionId: 'art-hu-lcs103-phy-f99-q33-43-nmj-coupling-definition' },
  nmtProperties: { subject: 'Neuromuscular transmission', predicate: 'is', object: 'unidirectional and fatigable with acetylcholine-vesicle exhaustion', resource: source.assessment, role: 'local_assessment', page: '7', section: 'Printed Q36', detail: 'Physical Family-99 page 7, printed Q36 and key C identify options A and B as true properties.', support: 'It shows fatigue due to depletion of acetylcholine vesicles. Occurs from nerve to muscle (one-way conduction).', article: article.excitation, sectionId: 'art-hu-lcs103-phy-f99-q33-43-nmj-coupling-mechanism' },
}
const evidenceRows = Object.entries(evidenceSpecs).map(([code, evidence]) => ({ code, ...evidence, spec: conceptSpecs[code] }))
const claims = evidenceRows.map((row) => ({ id: claimId(row.code), concept_id: row.spec.id, subject: row.subject, predicate: row.predicate, object: row.object, display_text: `${row.subject} ${row.predicate} ${row.object}.`, risk_class: 'foundational_stable', verification_status: 'needs_evidence', conflict_status: 'none', confidence: row.role === 'local_assessment' ? '0.8' : '0.86', freshness: 'stable_local_curriculum_fact', time_sensitive: 'no', qualifiers: 'polarity: affirmative\nauthority: direct local curriculum or assessment, not independent verification\nassessment boundary: Family-99 Q33–Q43 only' }))
const citations = evidenceRows.map((row) => ({ id: citationId(row.code), claim_id: claimId(row.code), resource_id: row.resource, evidence_role: row.role, locator_type: 'page', locator_page: row.page, locator_section: row.section, locator_detail: row.detail, support_span: row.support, context_note: 'Quoted source wording is preserved; the linked article remains Draft pending independent verification.', confidence: row.role === 'local_assessment' ? '0.8' : '0.86', counts_as_claim_evidence: 'no' }))
const spans = evidenceRows.map((row) => ({ id: spanId(row.code), article_id: row.article, section_id: row.sectionId, text: annotationQuote[row.code], claim_ids: claimId(row.code), citation_ids: citationId(row.code) }))

if (concepts.length !== 7 || articles.length !== 2 || questions.length !== 11 || claims.length !== 7 || citations.length !== 7 || spans.length !== 7) throw new Error('Family-99 Q33–Q43 governed count mismatch')
await Promise.all(Object.values(paths).map((path) => mkdir(dirname(path), { recursive: true })))
await writeFile(paths.concepts, concepts.map(item).join(divider), 'utf8')
await writeFile(paths.articles, articles.map(item).join(divider), 'utf8')
await writeFile(paths.questions, questions.map(item).join(divider), 'utf8')
await writeFile(paths.claims, claims.map(item).join(divider), 'utf8')
await writeFile(paths.citations, citations.map(item).join(divider), 'utf8')
await writeFile(paths.spans, spans.map(item).join(divider), 'utf8')
console.log(JSON.stringify({ files: paths, counts: { concepts: concepts.length, articles: articles.length, questions: questions.length, claims: claims.length, citations: citations.length, spans: spans.length }, keys: questions.map((row) => row.correct_answer).join(''), exactWithinSliceRepeats: 0, practical: 0, written: 0, media: 0 }, null, 2))
