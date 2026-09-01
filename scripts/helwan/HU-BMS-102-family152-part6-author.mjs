import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_a988f51544db9b537b0c'
const letters = 'ABCDE'
const INFARCTION = 'ART-HU-BMS102-PAT-INFARCTION'
const GANGRENE = 'ART-HU-BMS102-PAT-F133P1-ISCHEMIA-GANGRENE'
const DRY_FEATURES = 'CON-FND-BBF7463AE10CB0'
const conceptKey = {
  'CON-FND-0BA658B26E1758': 'infarction',
  'CON-FND-59BAB71CE8221C': 'pathology.gangrene.definition-necrosis-putrefaction',
  'CON-FND-9D6BD61E0DDBF7': 'pathology.infarction.anemic-renal-artery-thrombosis',
  'CON-FND-C81ACFA73704BD': 'pathology.ischemia.commonest-cause-thrombosis',
  'CON-FND-B8D606F14F48CA': 'pathology.infarction.acute-complete-end-artery-obstruction',
  'CON-FND-4729AB2A8F4319': 'pathology.infarction.hemorrhagic-small-intestine',
  'CON-FND-0E1DF848DCA5D2': 'pathology.ischemia.cause-exception-thrombocytopenia',
  'CON-FND-A98923B1E85326': 'pathology.infarction.splenic-red-or-pale-source-key',
  'CON-FND-8AF4C0B246DBB9': 'pathology.gangrene.wet-artery-vein-intestine-toxemia',
  'CON-FND-BF3F3FB623CD3C': 'pathology.infarction.pale-heart',
  'CON-FND-F33A23DEE037BE': 'pathology.gangrene.dry-limb-gradual-arterial-obstruction',
}
for (const [id, key] of Object.entries(conceptKey)) {
  const expected = `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`
  if (id !== expected) throw new Error(`deterministic concept ID mismatch: ${id} != ${expected}`)
}

const C = {
  gangreneDefinition: 'CON-FND-59BAB71CE8221C',
  paleKidney: 'CON-FND-9D6BD61E0DDBF7',
  dryFeatures: DRY_FEATURES,
  ischemiaThrombosis: 'CON-FND-C81ACFA73704BD',
  infarctionDefinition: 'CON-FND-0BA658B26E1758',
  endArtery: 'CON-FND-B8D606F14F48CA',
  redIntestine: 'CON-FND-4729AB2A8F4319',
  ischemiaException: 'CON-FND-0E1DF848DCA5D2',
  splenicSourceKey: 'CON-FND-A98923B1E85326',
  wetGangrene: 'CON-FND-8AF4C0B246DBB9',
  paleHeart: 'CON-FND-BF3F3FB623CD3C',
  dryLimb: 'CON-FND-F33A23DEE037BE',
}
const info = {
  [C.gangreneDefinition]: ['Gangrene combines tissue necrosis with putrefactive digestion of dead tissue', 'Recognise the source-bounded relationship between necrosis, putrefaction and gangrene.', 'classification'],
  [C.paleKidney]: ['Renal arterial occlusion produces an anemic infarction in the source option set', 'Identify renal artery thrombosis as the source-keyed anemic-infarction setting.', 'classification'],
  [C.dryFeatures]: ['Dry gangrene shows demarcation, separation and mummification but not gas bubbles', 'Recognise line formation as a dry-gangrene feature while preserving the incomplete source phrase.', 'classification'],
  [C.ischemiaThrombosis]: ['Thrombosis is the source-keyed commonest cause of ischemia', 'Identify thrombosis as the source-keyed commonest cause of ischemia.', 'pathophysiological_mechanism'],
  [C.infarctionDefinition]: ['Infarction is necrosis of tissue caused by ischemia', 'Define infarction using the exact source distinction.', 'definition'],
  [C.endArtery]: ['Infarction follows acute complete obstruction of an end artery in the source model', 'Identify the source-keyed vascular event leading to infarction.', 'pathophysiological_mechanism'],
  [C.redIntestine]: ['Intestinal infarction is hemorrhagic or red in the source classification', 'Recognise the source-keyed intestinal setting for hemorrhagic infarction.', 'classification'],
  [C.ischemiaException]: ['Thrombocytopenia is the source-keyed exception among listed causes of ischemia', 'Select thrombocytopenia as the exact printed exception without generalising beyond the option set.', 'comparison'],
  [C.splenicSourceKey]: ['Splenic arterial embolization is source-keyed as a site where infarction may be red or pale', 'Preserve the source-specific red-or-pale splenic answer pending independent review.', 'source_assertion'],
  [C.wetGangrene]: ['Wet gangrene is source-associated with intestinal involvement, combined arterial and venous occlusion, and severe toxemia', 'Recognise the source-keyed wet-gangrene pattern without extending it into clinical guidance.', 'classification'],
  [C.paleHeart]: ['The heart is the source-keyed site of pale infarction', 'Identify the heart as the printed pale-infarction site.', 'classification'],
  [C.dryLimb]: ['Dry gangrene occurs in limbs after gradual arterial obstruction in the source model', 'Recognise the source-keyed limb and gradual-arterial-occlusion pattern of dry gangrene.', 'classification'],
}

const specs = [
  ['Q61', 'A', C.gangreneDefinition, GANGRENE, 12, 'The best definition of gangrene is:', ['Digestion of dead tissue by saprophytic bacteria', 'Digestion of living tissue by saprophytic bacteria', 'Gas production in dead tissue', 'Necrosis of tissue caused by bacterial toxins', 'Necrosis of tissue caused by ischemia'], 'The source keys digestion of dead tissue by saprophytic bacteria. This is a narrow study-bank formulation; the linked Draft teaching preserves the broader necrosis-plus-putrefaction relationship without claiming an official definition.'],
  ['Q62', 'C', C.paleKidney, INFARCTION, 12, 'Anemic infarction always occurs in one of the following sites:', ['Cerebral artery thrombosis', 'Pulmonary embolism', 'Renal artery thrombosis', 'Superior mesenteric artery thrombosis', 'Torsion of testis'], 'The source keys renal artery thrombosis as the anemic-infarction setting in this option set.'],
  ['Q63', 'D', C.dryFeatures, GANGRENE, 12, 'Which of the followings is true of dry gangrene:', ['It is usually due to sudden cut of both arterial & venous blood supply', 'It affects upper limbs only', 'Products of putrefaction are excessive', 'Line of separation is formed at this point between gangrenous part and viable part.', 'Rapid putrefaction'], 'The source keys formation of a line of separation. The incomplete phrase “at this point” is preserved and is not repaired or interpreted beyond the printed option.'],
  ['Q64', 'C', C.ischemiaThrombosis, INFARCTION, 12, 'The commonest cause of ischemia is:', ['Arterial spasm', 'Surgical ligation of a blood vessel', 'thrombosis', 'tumors', 'twisting of pedicles'], 'The source keys thrombosis as the commonest cause of ischemia.'],
  ['Q65', 'E', C.infarctionDefinition, INFARCTION, 13, 'Necrosis of tissues due to ischemia is defined as:', ['Atheroma', 'Caisson disease', 'congestion', 'Embolism', 'Infarction'], 'The source keys infarction as necrosis of tissue due to ischemia.'],
  ['Q66', 'A', C.endArtery, INFARCTION, 13, 'Infarction occurs due to:', ['Acute complete obstruction of end-arteries', 'Acute incomplete obstruction of end-arteries', 'Gradual complete obstruction of end-arteries', 'Gradual complete obstruction of end-arteries'], 'The source keys acute complete obstruction of end-arteries. Duplicate C and D wording is preserved literally.'],
  ['Q67', 'C', C.redIntestine, INFARCTION, 13, 'Hemorrhagic infarction is seen always in:', ['Coronary artery thrombosis', 'Renal artery thrombosis', 'superior mesentric artery thrombosis', 'Common carotid artery thrombosis', 'splenic artery thrombosis'], 'The source keys superior mesentric artery thrombosis as the hemorrhagic-infarction setting.'],
  ['Q68', 'D', C.ischemiaException, INFARCTION, 13, "Which of the following isn't a cause of ischemia:", ['Arterial spasm', 'Embolism', 'Enlarged lymph node', 'thrombocytopenia', 'Thrombosis'], 'The printed exception is thrombocytopenia.'],
  ['Q69', 'D', C.splenicSourceKey, INFARCTION, 13, 'Infarction may be red or pale if embolization occurs in:', ['Coronary artery', 'pulmonary artery', 'Renal artery', 'splenic artery', 'Superior mesenteric vascular occlusion'], 'The source keys splenic artery. This exact red-or-pale assertion remains source-bounded and needs independent medical review; it is not promoted to general guidance.'],
  ['Q70', 'B', C.wetGangrene, GANGRENE, 14, 'Which of the following is true about wet gangrene:', ['Associated with slow growth of bacteria', 'Results from simultaneous occlusion of the artery & vein of the limb', 'The affected part is mummified', 'The gangrenous process advances slowly', 'Line of separation is distal to line of demarcation'], 'The source keys simultaneous occlusion of the artery and vein of the limb.'],
  ['Q71', 'B', C.wetGangrene, GANGRENE, 14, 'One of the following is characteristic of wet gangrene:', ['Slow progression', 'severe toxemia', 'Black discoloration', 'Prominent line of demarcation', 'Self-separation may occur'], 'The source keys severe toxemia as characteristic of wet gangrene.'],
  ['Q72', 'B', C.wetGangrene, GANGRENE, 14, 'Wet gangrene more commonly occurs in:', ['Brain', 'Intestine', 'Liver', 'Spleen'], 'The source keys intestine as the common wet-gangrene site in this option set.'],
  ['Q73', 'D', C.redIntestine, INFARCTION, 14, 'A red infarction always occurs in:', ['Kidney.', 'Heart.', 'Spleen.', 'Small intestine.', 'brain.'], 'The source keys small intestine as the red-infarction site.'],
  ['Q74', 'E', C.gangreneDefinition, GANGRENE, 14, 'Gangrene is necrosis associated with:', ['Calcification', 'Caseation', 'Fibrosis', 'Hemorrhage', 'Putrefaction'], 'The source keys putrefaction as the process associated with necrosis in gangrene.'],
  ['Q75', 'A', C.paleHeart, INFARCTION, 14, 'Pale infarction always occurs in one of the following sites:', ['Heart', 'Intestine', 'Brain', 'Spleen', 'Lung'], 'The source keys heart as the pale-infarction site in this option set.'],
  ['Q76', 'C', C.dryLimb, GANGRENE, 15, 'Which of the followings is true for dry gangrene:', ["It’s characterized by rapid putrefaction", 'Usually affects the intestine', 'It occurs in limbs due to arterial obstruction', 'Swollen and edematous', 'Affected organ is usually red in color due to congestion'], 'The source keys occurrence in limbs due to arterial obstruction.'],
  ['Q77', 'C', C.wetGangrene, GANGRENE, 15, 'Intestinal gangrene may be caused by:', ['Gradual arterial and venous obstruction', 'Gradual arterial obstruction', 'sudden arterial and venous obstruction', 'sudden arterial obstruction only', 'sudden venous obstruction only'], 'The source keys sudden arterial and venous obstruction.'],
  ['Q78', 'B', C.dryLimb, GANGRENE, 15, 'Dry gangrene is differentiated from moist gangrene by that in dry gangrene:', ['Is more common in internal organs', 'Is caused by gradual occlusion of the artery', 'Is a rapid process', 'Manifests severe toxemia', 'Shows no line of demarcation'], 'The source keys gradual occlusion of the artery as the differentiating feature.'],
]

const row = fields => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const questions = specs.map(([ref, key, concept, article, page, stem, options, teaching]) => ({
  ref, key, concept, article, page, stem, options, teaching,
  id: `Q-HU102-PAT-F152-P6-${ref}`,
  claim: `CLM-HU102-F152-P6-${ref}-01`,
  questionCitation: `CIT-HU102-F152-P6-${ref}-QUESTION`,
  keyCitation: `CIT-HU102-F152-P6-${ref}-KEY`,
  span: `SPN-HU102-F152-P6-${ref}-01`,
}))
const extract = (path, id) => {
  const block = readFileSync(path, 'utf8').split(/\n---\n/).find(value => value.includes(`## id\n${id}\n`))
  if (!block) throw new Error(`missing ${id} in ${path}`)
  return block.trim()
}
const get = (block, name) => block.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd() ?? ''
const set = (block, name, value) => block.replace(new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`), `$1${value}`)
const append = (block, name, values) => {
  const existing = get(block, name).split(/\n| \| /).filter(value => value && value !== '[clear]')
  for (const value of values) if (!existing.includes(value)) existing.push(value)
  return set(block, name, existing.join('\n'))
}
const ensure = (block, name, value, before = 'field_notes') => {
  if (block.includes(`## ${name}\n`)) return set(block, name, value)
  return block.replace(`\n## ${before}\n`, `\n## ${name}\n${value}\n## ${before}\n`)
}

const groups = Object.groupBy(questions, question => question.article)
const articleRow = id => {
  const articleQuestions = groups[id]
  const concepts = [...new Set(articleQuestions.map(question => question.concept))]
  const title = id === INFARCTION ? 'Infarction' : 'Acute ischaemia and gangrene classifications'
  const body = id === INFARCTION
    ? 'Infarction is ischemic tissue necrosis. The source cluster distinguishes acute complete end-arterial obstruction, anemic infarction in solid end-arterial organs, and hemorrhagic infarction in intestine. Several “always” formulations remain bounded to their exact option sets.'
    : 'Gangrene combines necrosis with putrefaction. The source cluster distinguishes dry, gradually ischemic and demarcated limb gangrene from wet, rapidly putrefactive gangrene associated with combined arterial and venous compromise, intestinal involvement and systemic toxicity.'
  if (id === INFARCTION) return row([
    ['id', id], ['title', title], ['arabic_title', ''], ['aliases', 'Family152 infarction\nHU-BMS-102 circulatory disturbances'], ['subject', 'fnd'], ['topic', 'General pathology'], ['subtopic', 'Circulatory disturbances'], ['microtopic', 'Ischemia and infarction'], ['nanotopic', 'Infarction patterns and organ colour'], ['primary_node_id', 'SYS-FND-T03'], ['secondary_node_ids', 'DIS-PAT-T03\nSYS-CVS'], ['template_id', 'TPL-CONCEPT'], ['archetype', 'concept'], ['language', 'en'], ['learner_stage', 'Years 1–3 foundation'], ['reading_time', '7'], ['high_yield', 'High'], ['time_sensitive', 'stable'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pathology faculty'], ['final_publisher', 'Admin team'], ['summary', 'A source-bounded guide to ischemia, infarction, end-arterial obstruction and red-versus-pale patterns.'], ['sections', `### Definition\n${body}\n\n### Mechanism\nVascular obstruction reduces perfusion; the source then classifies infarcts by the involved organ and the red-or-pale pattern printed in each option set.\n\n### Key determinants\n${concepts.map(c => info[c][0]).join('\n')}\n\n### Clinical significance\nUse these records only to distinguish the literal source option sets.\n\n### Common misconceptions\nDo not promote “always” wording or tier-3 answers to official examination or clinical authority.`], ['published_summary', ''], ['published_sections', ''], ['hold_these', concepts.map(c => info[c][0]).join('\n')], ['lose_the_mark', 'Repairing literal source grammar or option duplication.\nTreating the right-column letters as an official key.\nGeneralising Q69 beyond its exact option set.'], ['related_concepts', concepts.join('\n')], ['related_articles', GANGRENE], ['question_ids', articleQuestions.map(q => q.id).join('\n')], ['resource_ids', source], ['universities', 'hu'], ['years', 'HU_Y1'], ['module', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pathology > Circulatory disturbances > Infarction > Family152 Part6'], ['university_notes', 'hu: Tier-3 instructor-attributed keyed study-bank evidence only; not a dated examination or official key.'], ['annotations', concepts.map(c => `### definition_of · ${c}\nQuote: ${info[c][0]}\nBlock: body`).join('\n\n')], ['media', ''], ['media_recommendations', ''], ['callout_evidence', articleQuestions.map(q => `### ${info[q.concept][0]}\nClaims: ${q.claim}\nCitations: ${q.questionCitation}, ${q.keyCitation}\nSpan: ${q.span}`).join('\n\n')], ['article_source_ids', source], ['claim_ids', articleQuestions.map(q => q.claim).join('\n')], ['span_ids', articleQuestions.map(q => q.span).join('\n')], ['publication_gate', 'needs_evidence'], ['evidence_basis', 'Exact literal prompts/options and isolated right-column answer letters in Family152 pages 12–15.'], ['evidence_gaps', 'Independent medical verification and named Helwan pathology faculty review remain required, especially for Q61, Q63 and Q69.'], ['conflicts', '[clear]'], ['last_reviewed', ''], ['review_due', ''], ['notes', 'Question-led Family152 closure; no marks, official-key authority, written or practical record inferred.'], ['field_notes', 'arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.'],
  ])
  {
    const input = id === GANGRENE
      ? join(root, 'article', 'HU-BMS-102-pathology-family133-part1-articles.md')
      : join(repo, 'docs', 'medical-library-program', 'batches', 'SYS-FND-ARTICLE-007.md')
    let block = extract(input, id)
    for (const [name, values] of [['related_concepts', concepts], ['question_ids', articleQuestions.map(q => q.id)], ['resource_ids', [source]], ['article_source_ids', [source]], ['claim_ids', articleQuestions.map(q => q.claim)], ['span_ids', articleQuestions.map(q => q.span)], ['hold_these', concepts.map(c => info[c][0])]]) block = append(block, name, values)
    if (!get(block, 'question_ids')) block = ensure(block, 'question_ids', articleQuestions.map(q => q.id).join('\n'))
    block = set(block, 'sections', `${get(block, 'sections')}\n\n### Family152 Part6 ${id === INFARCTION ? 'infarction' : 'gangrene'} closure\n${body}\n${concepts.map(c => info[c][0]).join('\n')}`)
    const annotations = get(block, 'annotations')
    const additions = concepts.filter(c => !annotations.includes(`· ${c}\n`)).map(c => `### definition_of · ${c}\nQuote: ${info[c][0]}\nBlock: body`)
    if (additions.length) block = set(block, 'annotations', `${annotations}\n\n${additions.join('\n\n')}`)
    block = set(block, 'callout_evidence', `${get(block, 'callout_evidence')}\n\n${articleQuestions.map(q => `### ${info[q.concept][0]}\nClaims: ${q.claim}\nCitations: ${q.questionCitation}, ${q.keyCitation}\nSpan: ${q.span}`).join('\n\n')}`)
    block = set(block, 'evidence_basis', `${get(block, 'evidence_basis')}\nFamily152 tier-3 keyed study bank, pages 12–15; right-column letters are study answers, not an official key.`)
    block = set(block, 'notes', `${get(block, 'notes')}\nFamily152 Part6 appends ${articleQuestions.map(q => q.ref).join('/')} while preserving all prior fields.`)
    return block
  }
}

const newConcept = id => {
  const conceptQuestions = questions.filter(question => question.concept === id)
  const [label, objective, type] = info[id]
  const articleIds = [...new Set(conceptQuestions.map(q => q.article))]
  if (id === C.infarctionDefinition) return row([
    ['label', 'Infarction'], ['id', id], ['canonical_key', conceptKey[id]], ['aliases', 'Infarct\nTissue necrosis from ischaemia'], ['arabic_label', 'الاحتشاء'], ['arabic_aliases', 'النخر الإقفاري'], ['definition', 'Death of tissue caused by loss of its blood supply, most often because a thrombus or embolus has obstructed the vessel supplying it.'], ['explicit_objective', 'Given an obstructed vessel, distinguish reversible ischaemia from infarction, the necrosis that follows sufficiently severe or prolonged loss of perfusion.'], ['pitfalls', 'Treating infarction and ischaemia as the same word. Ischaemia is reduced perfusion; infarction is the necrosis that follows if it is severe or long enough.'], ['concept_type', 'mechanism'], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'fnd'], ['primary_node_id', 'SYS-FND-T06-S01-M04'], ['secondary_node_ids', 'DIS-PAT\nDIS-PHY'], ['topic', 'General pathology'], ['subtopic', 'Circulatory disturbances'], ['microtopic', 'Ischemia and infarction'], ['nanotopic', 'Infarction definition'], ['learner_years', '1\n2'], ['universities', 'hu\nkau'], ['modules', 'HU-BMS-102'], ['module_subject', 'HU-BMS-102 > Pathology > Circulatory disturbances > Family152 Part6 > Q65'], ['article_ids', INFARCTION], ['related_article_ids', GANGRENE], ['related_concept_ids', C.ischemiaThrombosis], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['blueprint_weight', '0.62'], ['exam_weight_by_year', 'HU_Y1=0.62'], ['clinical_relevance', '0.9'], ['academic_relevance', '0.94'], ['weight_confidence', '0.44'], ['confidence', '0.8'], ['exam_signal', `${source} | Family152 Part6 Q65 | tier-3 keyed bank; not official key`], ['atomic_claim_ids', conceptQuestions.map(q => q.claim).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['original_wording', `Infarction\n${conceptQuestions.map(q => `[Family152 Part6 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')}`], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'], ['uncertainty', 'The governed canonical Infarction concept is absent from the current live graph, so this is a complete standalone create with its exact canonical key and deterministic ID rather than a sparse update.'], ['evidence_gaps', 'Red-versus-pale infarct patterns, collateral supply and histological timing require independent medical verification and named Helwan pathology faculty review.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pathology faculty'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''], ['field_notes', 'canonicalIdentity: Preserves governed canonical_key infarction and deterministic ID CON-FND-0BA658B26E1758.\nstandaloneCreate: Current live preflight confirms the governed ID is absent; every importer field is therefore supplied.\narabicLabel: Preserved from the governed concept.\narabicAliases: Preserved from the governed concept.\nmicrotopicId: No reviewed microtopic ID exists; the governed text microtopic is retained.\nnanotopicId: No reviewed nanotopic ID exists; the governed text nanotopic is retained.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family152 Q65 and right-column key.\nsourceCandidateIds: No unresolved corpus candidate pointer is imported.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No rival ID was minted.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
  return row([
    ['label', label], ['id', id], ['canonical_key', conceptKey[id]], ['aliases', label], ['arabic_label', ''], ['arabic_aliases', '[clear]'], ['definition', `${label}. This record remains bounded to the exact Family152 keyed occurrences and does not infer official examination authority.`], ['explicit_objective', objective], ['pitfalls', 'Generalising “always,” “commonest,” or site-specific wording beyond the printed option set; repairing literal source grammar; or treating a tier-3 answer as faculty-verified guidance.'], ['concept_type', type], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'fnd'], ['primary_node_id', 'SYS-FND-T03'], ['secondary_node_ids', 'DIS-PAT-T03\nSYS-CVS'], ['topic', 'General pathology'], ['subtopic', 'Circulatory disturbances'], ['microtopic', articleIds.includes(INFARCTION) ? 'Ischemia and infarction' : 'Ischaemia and gangrene'], ['nanotopic', `Family152 Part6 ${conceptQuestions.map(q => q.ref).join('/')}`], ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pathology > Circulatory disturbances > Family152 Part6 > ${conceptQuestions.map(q => q.ref).join('/')}`], ['article_ids', articleIds.join('\n')], ['related_article_ids', articleIds.includes(INFARCTION) ? GANGRENE : INFARCTION], ['related_concept_ids', '[clear]'], ['resource_ids', source], ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['blueprint_weight', '0.62'], ['exam_weight_by_year', 'HU_Y1=0.62'], ['clinical_relevance', '0.76'], ['academic_relevance', '0.94'], ['weight_confidence', '0.44'], ['confidence', '0.74'], ['exam_signal', `${source} | Family152 Part6 ${conceptQuestions.map(q => q.ref).join('/')} | tier-3 keyed bank; not official key`], ['atomic_claim_ids', conceptQuestions.map(q => q.claim).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'], ['original_wording', conceptQuestions.map(q => `[Family152 Part6 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')], ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'], ['uncertainty', id === C.splenicSourceKey ? 'The Q69 red-or-pale splenic assertion is preserved as a source-specific keyed statement pending independent medical review.' : 'Tier-3 source wording and isolated right-column answer only.'], ['evidence_gaps', 'Independent medical verification and named Helwan pathology faculty review remain required.'], ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pathology faculty'], ['final_publisher', 'Admin team'], ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''], ['field_notes', 'arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family152 prompt and right-column key.\nsourceCandidateIds: Source-first gate found no exact same-scope governed row.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No rival ID was minted.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}
const reuseConcept = id => {
  const input = id === DRY_FEATURES
    ? join(root, 'concept', 'HU-BMS-102-pathology-family133-part1-concepts.md')
    : join(repo, 'docs', 'medical-library-program', 'batches', 'SYS-FND-CONCEPT-008.md')
  let block = extract(input, id)
  const conceptQuestions = questions.filter(question => question.concept === id)
  for (const [name, values] of [['article_ids', [...new Set(conceptQuestions.map(q => q.article))]], ['related_article_ids', [INFARCTION]], ['resource_ids', [source]], ['atomic_claim_ids', conceptQuestions.map(q => q.claim)], ['learner_years', ['1']], ['universities', ['hu']], ['modules', ['HU-BMS-102']]]) block = append(block, name, values)
  block = set(block, 'exam_signal', `${get(block, 'exam_signal')}\n${source} | Family152 Part6 ${conceptQuestions.map(q => q.ref).join('/')} | tier-3 keyed bank; not official key`)
  block = set(block, 'original_wording', `${get(block, 'original_wording')}\n${conceptQuestions.map(q => `[Family152 Part6 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')}`)
  block = set(block, 'field_notes', `${get(block, 'field_notes')}\nfamily152Part6Reuse: Complete governed Family133 row preserved; reciprocal source, claim, wording and article links appended idempotently.`)
  if (get(block, 'publication_status') !== 'needs_evidence') throw new Error(`${id} is not needs_evidence`)
  return block
}
const questionRow = q => row([
  ['id', q.id], ['title', q.stem], ['subject', 'fnd'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', q.stem], ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', q.key],
  ...q.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, letters[index] === q.key ? `${q.teaching} This is a source-supplied study-bank answer, not an authenticated Helwan examination key.` : `This option is not the printed letter. The tested source-bounded point is: ${info[q.concept][0]}.`]]),
  ['topic', 'Circulatory disturbances'], ['subtopic', q.article === INFARCTION ? 'Infarction' : 'Gangrene'], ['difficulty', 'Moderate'], ['question_type', 'Pathology'], ['main_concept', q.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pathology > Family152 Part6 > ${q.ref}`], ['clinical_relevance', '0.76'], ['academic_relevance', '0.94'], ['cognitive_effort_score', '0.52'], ['exam_weight_by_year', 'HU_Y1=0.62'], ['question_only_for', 'HU_Y1'], ['concept_ids', q.concept], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Moderate'], ['setting', 'Foundational'], ['reasoning_level', '2'], ['inferred_difficulty', '52'], ['exam_relevance', '7'], ['contextual_concept_ids', ''], ['library_ids', q.article], ['resource_ids', source], ['learning_objective', info[q.concept][1]], ['media_recommendations', ''], ['source_citation', `${source}, Family152 Part6 ${q.ref}, PDF p${q.page}: literal stem/options and right-column printed ${q.key}. Tier-3 study-bank authority only.`], ['attachments', ''], ['attached_image', ''], ['author_notes', 'Literal spelling, capitalization, glyphs, repeated options, option order and printed answer preserved; no marks or official-key authority inferred. Q61/Q63/Q69 limitations remain explicit.'], ['estimated_seconds', '75'], ['randomise_answers', 'yes'],
])
const claim = q => row([['id', q.claim], ['concept_id', q.concept], ['subject', 'fnd'], ['predicate', 'is source-keyed as'], ['object', q.options[letters.indexOf(q.key)]], ['display_text', info[q.concept][0]], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', q.ref === 'Q69' ? '0.62' : '0.74'], ['freshness', 'source_created_2025-04-10'], ['time_sensitive', 'no'], ['qualifiers', `tier-3 bank, not official key; Family152 Part6 ${q.ref}${['Q61', 'Q63', 'Q69'].includes(q.ref) ? '; explicit source-bounded limitation' : ''}`]])
const citation = (q, key) => row([['id', key ? q.keyCitation : q.questionCitation], ['claim_id', q.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', key ? `Right-column printed answer: ${q.key}` : `${q.stem} Options: ${q.options.map((option, index) => `${letters[index]}. ${option}`).join(' | ')}`], ['locator_type', 'page'], ['locator_page', String(q.page)], ['locator_section', `Family152 Part6 ${q.ref}`], ['locator_detail', key ? 'Isolated right-column printed letter' : 'Exact stem and options'], ['context_note', 'Instructor-attributed keyed study bank; not an official key.'], ['confidence', '0.97'], ['counts_as_claim_evidence', 'no']])
const span = q => row([['id', q.span], ['article_id', q.article], ['section_id', `${q.article.toLowerCase()}-${q.ref.toLowerCase()}`], ['text', info[q.concept][0]], ['claim_ids', q.claim], ['citation_ids', `${q.questionCitation}\n${q.keyCitation}`]])
const relation = (from, to, refs, type, scope) => row([['source', from], ['type', type], ['target', to], ['evidence_claim_ids', refs.map(ref => questions.find(q => q.ref === ref).claim).join('\n')], ['citation_ids', refs.map(ref => questions.find(q => q.ref === ref).questionCitation).join('\n')], ['verification_status', 'needs_evidence'], ['confidence', '0.72'], ['qualifiers', `scope: ${scope}`], ['reviewer', 'Medical team, Helwan Pathology faculty']])
const relationRows = rows([
  relation(C.ischemiaThrombosis, C.infarctionDefinition, ['Q64', 'Q65'], 'related_concepts', 'ischemia can progress to infarction; each source item tests a distinct statement'),
  relation(C.endArtery, C.paleHeart, ['Q66', 'Q75'], 'related_concepts', 'end-arterial obstruction and pale solid-organ infarction'),
  relation(C.redIntestine, C.paleKidney, ['Q62', 'Q67', 'Q73'], 'contrasts_with', 'source distinction between anemic renal and hemorrhagic intestinal infarction'),
  relation(C.wetGangrene, C.dryLimb, ['Q70', 'Q72', 'Q76', 'Q77', 'Q78'], 'contrasts_with', 'wet intestinal combined-flow compromise versus dry gradual limb arterial compromise'),
  relation(C.gangreneDefinition, C.wetGangrene, ['Q61', 'Q71', 'Q74'], 'related_concepts', 'putrefaction and systemic toxicity in source-bounded gangrene distinctions'),
])
const sourceRow = row([['id', source], ['title', 'Circulatory — Ahmed Hassan keyed MCQ bank'], ['institution', 'Faculty of Medicine, Helwan University'], ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - Circulatory MCQ.pdf'], ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '16'], ['sha256', 'a988f51544db9b537b0c94d26fb4a7df13e8e6fba80ec3bc968fc007a6b7edc8'], ['processing_status', 'pending'], ['rights', 'Local study-bank carrier held for internal authoring only; no page redistributed.'], ['qualification', 'Tier-3 instructor-attributed keyed study bank headed Circulatory and DR. Ahmed Hassan; printed answers are not an authenticated official exam key. Family152 Part6 closes Q61–Q78 with Q61/Q63/Q69 limitations explicit.'], ['is_assessment', 'yes']])
const conceptIds = [...new Set(questions.map(q => q.concept))]
const conceptRows = conceptIds.map(id => id === DRY_FEATURES ? reuseConcept(id) : newConcept(id))
const files = new Map([
  ['evidence/HU-BMS-102-pathology-family152-part6-sources.md', sourceRow],
  ['article/HU-BMS-102-pathology-family152-part6-articles.md', rows([INFARCTION, GANGRENE].map(articleRow))],
  ['concept/HU-BMS-102-pathology-family152-part6-concepts.md', rows(conceptRows)],
  ['evidence/HU-BMS-102-pathology-family152-part6-claims.md', rows(questions.map(claim))],
  ['evidence/HU-BMS-102-pathology-family152-part6-citations.md', rows(questions.flatMap(q => [citation(q, false), citation(q, true)]))],
  ['evidence/HU-BMS-102-pathology-family152-part6-spans.md', rows(questions.map(span))],
  ['relations/HU-BMS-102-pathology-family152-part6-relations.md', relationRows],
  ['question/HU-BMS-102-pathology-family152-part6-mcq.md', rows(questions.map(questionRow))],
])
for (const [relativePath, body] of files) {
  const output = join(root, relativePath)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: 152, part: 6, refs: questions.map(q => q.ref), keys: questions.map(q => q.key).join(''), released: { sources: 1, articles: 2, conceptRows: conceptRows.length, distinctConceptsTested: conceptIds.length, newConcepts: 11, reusedConceptUpdates: 1, existingExactConceptReferences: 0, questions: questions.length, claims: questions.length, citations: questions.length * 2, spans: questions.length, relations: 5 }, holds: 0, backlog: 0 }, null, 2))
