import { scopeForSubtopic } from './taxonomy'

export const CONCEPT_RELATIONS = [
  'related_concepts',
  'prerequisite_of',
  'part_of',
  'mechanism_step_before',
  'causes',
  'increases',
  'decreases',
  'presents_as',
  'diagnosed_by',
  'investigated_by',
  'treated_by',
  'contraindicates',
  'differential_of',
  'complication_of',
  'associated_with',
  'contrasts_with',
  'often_confused_with',
] as const

export const STATEMENT_RELATIONS = ['definition_of', ...CONCEPT_RELATIONS] as const

export type ConceptRelationType = (typeof CONCEPT_RELATIONS)[number]
export type StatementRelationType = (typeof STATEMENT_RELATIONS)[number]

export const CONCEPT_STORAGE_KEY = 'synapse-concept-graph-v2'

export type ConceptStatus = 'active' | 'inactive' | 'under review'

/**
 * A concept is the smallest assessable objective. Beyond its definition it
 * carries curriculum placement (system/topic/subtopic IDs), exam-blueprint
 * weighting (overall and per university year), relevance scores, pitfalls, and
 * the resources/articles that cover it.
 */
export interface Concept {
  id: string
  label: string
  aliases: string[]
  definition: string
  /** Common mistakes / traps for this concept. */
  pitfalls?: string
  status?: ConceptStatus
  articleIds: string[]
  /** Explicit scope for admin-authored concepts; existing ones derive from articleIds. */
  subjectId?: string
  topicId?: string
  /** Visible curriculum IDs (SYS_*, TPC_*, SUB_*, MIC_*). */
  systemId?: string
  topicTagId?: string
  subtopicId?: string
  microtopicId?: string
  nanotopicId?: string
  /** Overall exam-blueprint weight, 0–1. */
  blueprintWeight?: number
  /** Per-year exam-blueprint weight, keyed by year_ID (e.g. OMS_Y2), each 0–1. */
  examWeightByYear?: Record<string, number>
  clinicalRelevance?: number
  academicRelevance?: number
  /** Related concept IDs (the simple, untyped list; typed relations live in relations[]). */
  relatedConceptIds?: string[]
  /** Article IDs that discuss this concept. */
  relatedArticleIds?: string[]
  /** Resource IDs approved for this concept — auto-maintained as resources are tagged. */
  approvedFileResourceIds?: string[]
  approvedVideoResourceIds?: string[]
}

export interface ConceptRelation {
  id: string
  sourceId: string
  type: ConceptRelationType
  targetId: string
}

export interface ConceptGraph {
  concepts: Concept[]
  relations: ConceptRelation[]
}

export interface ConceptAnnotation {
  id: string
  quote: string
  conceptId: string
  relation: StatementRelationType
  block: 'summary' | 'body' | 'hold' | 'trap'
}

export function initialConceptGraph(): ConceptGraph {
  const concepts: Concept[] = [
    { id: 'med.concept.heart-failure', label: 'Heart failure', aliases: ['HF', 'HFrEF', 'HFpEF'], definition: 'A clinical syndrome caused by structural or functional impairment of ventricular filling or ejection.', articleIds: ['hf-patho', 'hf-class', 'hf-mgmt'] },
    { id: 'med.concept.sympathetic-activation', label: 'Sympathetic activation', aliases: ['sympathetic drive'], definition: 'A compensatory neurohormonal response that raises rate and contractility but promotes adverse remodelling when chronic.', articleIds: ['hf-patho'] },
    { id: 'med.concept.raas', label: 'Renin–angiotensin–aldosterone system', aliases: ['RAAS'], definition: 'A hormonal cascade that increases vasoconstriction and sodium retention.', articleIds: ['hf-patho', 'hf-mgmt'] },
    { id: 'med.concept.ventricular-remodelling', label: 'Ventricular remodelling', aliases: ['adverse remodelling'], definition: 'Progressive changes in ventricular size, shape, and tissue composition after injury or chronic overload.', articleIds: ['hf-patho'] },
    { id: 'med.concept.beta-blockade', label: 'Beta-blockade', aliases: ['beta-blocker', 'beta-blockers'], definition: 'Pharmacological antagonism of beta-adrenergic receptors.', articleIds: ['hf-mgmt'] },
    { id: 'med.concept.loop-diuretics', label: 'Loop diuretics', aliases: ['furosemide'], definition: 'Diuretics that inhibit the Na-K-2Cl cotransporter in the thick ascending limb.', articleIds: ['hf-mgmt', 'diur-sites'] },
    { id: 'med.concept.acute-coronary-syndrome', label: 'Acute coronary syndrome', aliases: ['ACS', 'acute coronary syndromes'], definition: 'A spectrum of myocardial ischaemia comprising unstable angina, NSTEMI, and STEMI.', articleIds: ['acs-dx', 'acs-mgmt'] },
    { id: 'med.concept.nstemi', label: 'NSTEMI', aliases: ['non-ST elevation myocardial infarction'], definition: 'Myocardial infarction with biomarker rise without persistent ST elevation.', articleIds: ['acs-dx'] },
    { id: 'med.concept.stemi', label: 'STEMI', aliases: ['ST elevation myocardial infarction'], definition: 'Acute myocardial infarction associated with persistent ST elevation and usually complete coronary occlusion.', articleIds: ['acs-dx', 'acs-mgmt'] },
    { id: 'med.concept.asthma', label: 'Asthma', aliases: ['reversible airflow obstruction'], definition: 'A heterogeneous inflammatory airway disease with variable symptoms and expiratory airflow limitation.', articleIds: ['asthma-patho', 'asthma-mgmt'] },
    { id: 'med.concept.anion-gap', label: 'Anion gap', aliases: ['AG'], definition: 'The calculated difference between measured serum cations and anions used to classify metabolic acidosis.', articleIds: ['ab-approach'] },
    { id: 'med.concept.umn-lesion', label: 'Upper motor neurone lesion', aliases: ['UMN lesion', 'forehead sparing'], definition: 'A lesion affecting descending motor pathways above the anterior horn cell or cranial motor nucleus.', articleIds: ['cn-overview'] },
  ]

  const relations: ConceptRelation[] = [
    { id: 'rel-1', sourceId: 'med.concept.sympathetic-activation', type: 'causes', targetId: 'med.concept.ventricular-remodelling' },
    { id: 'rel-2', sourceId: 'med.concept.raas', type: 'causes', targetId: 'med.concept.ventricular-remodelling' },
    { id: 'rel-3', sourceId: 'med.concept.heart-failure', type: 'treated_by', targetId: 'med.concept.beta-blockade' },
    { id: 'rel-4', sourceId: 'med.concept.nstemi', type: 'part_of', targetId: 'med.concept.acute-coronary-syndrome' },
    { id: 'rel-5', sourceId: 'med.concept.stemi', type: 'part_of', targetId: 'med.concept.acute-coronary-syndrome' },
    { id: 'rel-6', sourceId: 'med.concept.nstemi', type: 'contrasts_with', targetId: 'med.concept.stemi' },
    { id: 'rel-7', sourceId: 'med.concept.loop-diuretics', type: 'treated_by', targetId: 'med.concept.heart-failure' },
  ]

  // ---- Demo enrichment: give every concept the full field set to author against.
  const PITFALLS: Record<string, string> = {
    'med.concept.heart-failure': 'Do not equate NYHA class (reversible) with ACC/AHA stage (only progresses).',
    'med.concept.sympathetic-activation': 'Initially compensatory but chronically harmful — students wrongly call it purely protective.',
    'med.concept.raas': 'Confusing aldosterone (sodium & water retention) with ADH (water only).',
    'med.concept.ventricular-remodelling': 'Distinguish adaptive athletic hypertrophy from pathological remodelling.',
    'med.concept.beta-blockade': 'Benefit is from opposing sympathetic drive, not inotropy — start low, titrate slowly.',
    'med.concept.loop-diuretics': 'Relieve congestion but give NO mortality benefit — a classic exam trap.',
    'med.concept.acute-coronary-syndrome': 'Atypical presentations (women, older adults, diabetics) are easily missed.',
    'med.concept.nstemi': 'A troponin rise without ST elevation — unlike unstable angina, which has no troponin rise.',
    'med.concept.stemi': 'New LBBB is a STEMI equivalent; do not wait for troponin before acting.',
    'med.concept.asthma': 'Frequent SABA use without an inhaled corticosteroid is a red flag, not reassurance.',
    'med.concept.anion-gap': 'Forgetting to calculate the anion gap in every metabolic acidosis.',
    'med.concept.umn-lesion': 'Forehead sparing = UMN lesion; whole-half-face weakness = LMN (Bell) palsy.',
  }
  const round2 = (x: number) => Math.round(x * 100) / 100
  const enriched: Concept[] = concepts.map((c, i) => {
    const scope = scopeForSubtopic(c.articleIds[0] ?? '')
    const bw = round2(0.35 + ((i * 7) % 6) / 10)
    return {
      ...c,
      status: (i === 3 ? 'under review' : i === 7 ? 'inactive' : 'active') as ConceptStatus,
      systemId: scope.systemId,
      topicTagId: scope.topicId,
      subtopicId: scope.subtopicId,
      pitfalls: PITFALLS[c.id] ?? 'Commonly confused with a related concept — anchor it to its single defining feature.',
      blueprintWeight: bw,
      examWeightByYear: { OMS_Y2: round2(bw), OMS_Y3: round2(Math.min(1, bw + 0.1)), MMS_Y2: round2(Math.max(0, bw - 0.1)) },
      clinicalRelevance: round2(0.5 + ((i * 3) % 5) / 10),
      academicRelevance: round2(0.5 + ((i * 4) % 5) / 10),
      relatedArticleIds: c.articleIds,
      approvedFileResourceIds: [],
      approvedVideoResourceIds: [],
    }
  })

  return { concepts: enriched, relations }
}

export function conceptGraphFromStorage(): ConceptGraph {
  try {
    const stored = localStorage.getItem(CONCEPT_STORAGE_KEY)
    if (stored) return JSON.parse(stored) as ConceptGraph
  } catch {
    // Fall back to the built-in graph when storage is unavailable or malformed.
  }
  return initialConceptGraph()
}
