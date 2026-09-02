// Shared render helpers for the HU-ORL-305 Ophthalmology authoring lane.
// Adapted from HU-GIT-301-render.mjs (same field order, parameterised
// module/discipline/source text instead of hardcoding GIT-301 pathology).
import { createHash } from 'node:crypto'

export function mintConceptId(system, canonicalKey) {
  const hash = createHash('sha256').update(canonicalKey).digest('hex').toUpperCase().slice(0, 14)
  return `CON-${system}-${hash}`
}

function block(key, value) {
  if (value === undefined || value === null) value = ''
  if (Array.isArray(value)) value = value.join('\n')
  return `## ${key}\n${value}`.replace(/\n$/, m => m)
}

function joinList(arr, sep = ' | ') {
  if (!arr || !arr.length) return ''
  return arr.join(sep)
}

function fieldNotes(notes) {
  return notes.map(([k, v]) => `${k}: ${v}`).join('\n')
}

const SOURCE_NOTE = 'Helwan ORL-305 Ophthalmology-cluster sources are not yet registered in docs/medical-library-program/evidence/corpus-source-index.json (ruling 2026-08-22 #2 not yet executed for Year 3) — citing a src_ id here would be inventing one; the fact is instead cited in source_citation on the covering question(s).'

export function renderConcept(c) {
  const lines = []
  const push = (k, v) => lines.push(block(k, v))
  push('id', c.id)
  push('label', c.label)
  push('canonical_key', c.canonicalKey)
  push('aliases', c.aliases || [])
  push('arabic_label', c.arabicLabel || '')
  push('arabic_aliases', c.arabicAliases || [])
  push('definition', c.definition)
  push('explicit_objective', c.objective)
  push('pitfalls', c.pitfalls || '')
  push('concept_type', c.conceptType || 'clinical_feature')
  push('status', 'under review')
  push('support_mode', c.supportMode || 'direct_statement')
  push('subject', c.subject || 'mul')
  push('primary_node_id', c.primaryNodeId)
  push('secondary_node_ids', c.secondaryNodeIds || [])
  push('topic', c.topic)
  push('subtopic', c.subtopic)
  push('microtopic', c.microtopic || '')
  push('nanotopic', '')
  push('modules', c.modules || ['HU-ORL-305'])
  push('article_ids', c.articleIds || [])
  push('related_article_ids', c.relatedArticleIds || [])
  push('related_concept_ids', c.relatedConceptIds || [])
  push('resource_ids', [])
  push('approved_file_resource_ids', [])
  push('approved_video_resource_ids', [])
  push('learner_years', c.learnerYears || '3')
  push('universities', c.universities || ['hu'])
  push('blueprint_weight', c.blueprintWeight ?? 0.4)
  push('exam_weight_by_year', joinList(c.examWeightByYear || ['HU_Y3=0.4']))
  push('clinical_relevance', c.clinicalRelevance ?? 0.5)
  push('academic_relevance', c.academicRelevance ?? 0.7)
  push('weight_confidence', c.weightConfidence ?? 0.3)
  push('confidence', c.confidence ?? 0.8)
  push('atomic_claim_ids', c.claimIds || [])
  push('resource_occurrence_ids', [])
  push('source_candidate_ids', [])
  push('original_wording', c.originalWording || [])
  push('merge_ids', [])
  push('rejected_merge_candidate_ids', c.rejectedMergeCandidateIds || [])
  push('conflicts', c.conflicts || '')
  push('uncertainty', c.uncertainty || '')
  push('evidence_gaps', 'Evidence must be attached before publication: ' + SOURCE_NOTE)
  push('owner', 'Helwan Year-3 authoring lane')
  push('reviewer', 'Medical team, Helwan Ophthalmology faculty')
  push('final_publisher', 'Admin team')
  push('last_reviewed', '')
  push('review_due', '')
  push('publication_status', 'needs_evidence')
  push('editorial_review_status', 'drafted_not_reviewed')
  push('exclusion_reason', '')
  const notes = [
    ['moduleIds', 'HU-ORL-305 is carried directly in modules; no separate cross-university module catalogue entry exists to also cite.'],
    ['resourceIds', SOURCE_NOTE],
    ['approvedFileResourceIds', 'No file resource has been rights-cleared for this concept yet.'],
    ['approvedVideoResourceIds', 'This module has no video resource distributed yet.'],
    ['resourceOccurrenceIds', 'Hand-authored from the ORL-305 Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305); no corpus extraction record exists for this concept.'],
    ['sourceCandidateIds', 'find-existing.mjs was searched for the shortest distinctive term in this key; the corpus-concept-index itself was not separately queried.'],
    ['subjectId', 'No oph/ent subject id exists in the curriculum catalogue (LANE-CARD-Y2-3.md §5) — falls to mul ("Multisystem and emergencies") by the pre-ruled elimination.'],
    ['lastReviewed', 'New record; it has not been reviewed yet.'],
    ['reviewDue', 'Set when the first review completes.'],
    ['microtopicId', c.microtopicNote || 'No department-level microtopic subdivision exists below the chapter heading; the free-text microtopic column carries the placement instead.'],
    ['nanotopicId', 'No department-level nanotopic subdivision exists below microtopic for this fact.'],
    ...(c.extraNotes || []),
    ['relationships', c.relationshipsNote || 'Same-chapter proximity only this pass; a live-sibling relationship discovery walk is deferred — see WANTED in the lane report.'],
  ]
  push('field_notes', fieldNotes(notes))
  return `# Item\n\n${lines.join('\n\n')}\n`
}

export function renderConceptUpdate(u) {
  const lines = []
  const push = (k, v) => lines.push(block(k, v))
  push('id', u.id)
  push('label', u.label)
  if (u.definition) push('definition', u.definition)
  if (u.objective) push('explicit_objective', u.objective)
  if (u.aliases) push('aliases', u.aliases)
  push('universities', u.universities || ['+hu'])
  push('learner_years', u.learnerYears || '+3')
  push('modules', u.modules || ['+HU-ORL-305'])
  push('module_subject', (u.moduleSubject || []))
  push('exam_weight_by_year', joinList(u.examWeightByYear || ['HU_Y3=0.4']))
  if (u.fieldNotes) push('field_notes', fieldNotes(u.fieldNotes))
  return `# Item\n\n${lines.join('\n\n')}\n`
}

export function renderClaim(cl) {
  const lines = []
  const push = (k, v) => lines.push(block(k, v))
  push('id', cl.id)
  push('concept_id', cl.conceptId)
  push('subject', cl.subject)
  push('predicate', cl.predicate)
  push('object', cl.object)
  push('display_text', cl.displayText)
  push('risk_class', cl.riskClass || 'foundational_stable')
  push('verification_status', 'needs_evidence')
  push('conflict_status', 'none')
  push('confidence', cl.confidence ?? 0.75)
  push('freshness', 'stable_local_curriculum_fact')
  push('time_sensitive', 'no')
  push('review_due', '')
  push('qualifiers', cl.qualifiers || '')
  return `# Item\n\n${lines.join('\n\n')}\n`
}

export function renderArticle(a) {
  const lines = []
  const push = (k, v) => lines.push(block(k, v))
  push('id', a.id)
  push('title', a.title)
  push('arabic_title', a.arabicTitle || '')
  push('aliases', a.aliases || [])
  push('subject', a.subject || 'mul')
  push('topic', a.topic)
  push('subtopic', a.subtopic)
  push('microtopic', a.microtopic || '')
  push('nanotopic', a.nanotopic || '')
  push('primary_node_id', a.primaryNodeId)
  push('secondary_node_ids', a.secondaryNodeIds || [])
  push('template_id', a.templateId || 'TPL-CONCEPT')
  push('archetype', a.archetype || 'concept')
  push('language', 'en')
  push('learner_stage', 'Years 1-3 foundation')
  push('reading_time', a.readingTime || 12)
  push('high_yield', a.highYield || 'High')
  push('time_sensitive', 'stable')
  push('status', 'Draft')
  push('owner', 'Helwan Year-3 authoring lane')
  push('reviewer', 'Medical team, Helwan Ophthalmology faculty')
  push('final_publisher', 'Admin team')
  push('summary', a.summary)
  push('sections', a.sections)
  push('published_summary', '')
  push('published_sections', '')
  push('hold_these', a.holdThese || [])
  push('lose_the_mark', a.loseTheMark || [])
  push('related_concepts', a.relatedConcepts || [])
  push('related_articles', a.relatedArticles || [])
  push('question_ids', [])
  push('resource_ids', [])
  push('universities', a.universities || ['hu'])
  push('years', a.years || ['HU_Y3'])
  push('module', a.module || ['HU-ORL-305'])
  push('module_subject', a.moduleSubject || [])
  push('university_notes', a.universityNotes || `hu: Restricted to HU-ORL-305 Year 3. Sourced from the department Ophthalmology MCQ bank triage (scripts/helwan/extract/HU-ORL-305/mcq-bank-ophthalmology.json); the bank's own printed answer key stands as the source of the recovered answers.`)
  push('annotations', a.annotations || [])
  push('media', '')
  push('media_recommendations', '')
  push('callout_evidence', '')
  push('claim_ids', a.claimIds || [])
  push('span_ids', [])
  push('evidence_gaps', a.evidenceGaps || '[clear]')
  push('notes', '')
  push('field_notes', fieldNotes(a.fieldNotes || [
    ['relationships', 'Covers every concept minted in this cluster; cross-article links deferred to a later pass — see WANTED.'],
  ]))
  return `# Item\n\n${lines.join('\n\n')}\n`
}
