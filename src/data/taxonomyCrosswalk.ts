/**
 * Curriculum ↔ canonical taxonomy crosswalk.
 *
 * `curriculumCatalog` is the curated student runtime view: eight subjects a
 * learner actually browses. `medicalLibraryTaxonomy` is the blueprint of
 * record: 1,883 reviewed nodes across four views. This file binds them, so a
 * canonical `primaryNodeId` is derived from where an author already placed the
 * item rather than typed a second time.
 *
 * Reviewed mappings are explicit at system and topic level. Below that, a
 * placement is only made more precise when a canonical descendant matches the
 * curriculum title unambiguously; otherwise the node inherits its topic's
 * placement. Nothing here invents a placement that has not been reviewed.
 */

import { CURRICULUM_CATALOG, type CurriculumSystem } from './curriculumCatalog.ts'
import { MEDICAL_TAXONOMY_INDEX, MEDICAL_TAXONOMY_SEED, type MedicalTaxonomyNode } from './medicalLibraryTaxonomy.ts'

export interface CrosswalkEntry {
  /** The canonical home. */
  primaryNodeId: string
  /** Other reviewed, valid placements across the four views. */
  secondaryNodeIds: string[]
}

const at = (primaryNodeId: string, ...secondaryNodeIds: string[]): CrosswalkEntry => ({ primaryNodeId, secondaryNodeIds })

/** Subject → canonical root. Pharmacology is a discipline, not an organ system. */
export const CURRICULUM_SYSTEM_CROSSWALK: Record<string, CrosswalkEntry> = {
  cvs: at('SYS-CVS'),
  resp: at('SYS-RES'),
  renal: at('SYS-REN'),
  gi: at('SYS-GIT'),
  neuro: at('SYS-NEU'),
  endo: at('SYS-END'),
  msk: at('SYS-MSK'),
  pharm: at('DIS-PHA', 'KNW-DRG'),
}

/**
 * Curriculum topic node ID → canonical placement.
 *
 * Where a curriculum topic deliberately spans several canonical topics (a
 * whole-system "pathology" or "presentations" topic), the closest canonical
 * topic is primary and the rest are secondary. That is the same primary/secondary
 * contract articles and concepts already use.
 */
export const CURRICULUM_TOPIC_CROSSWALK: Record<string, CrosswalkEntry> = {
  // Cardiovascular
  'cvs-cardiac-anatomy': at('SYS-CVS-T01', 'DIS-ANA'),
  'cvs-cardiac-histology-and-development': at('SYS-CVS-T01', 'DIS-HIS', 'DIS-EMB'),
  'cvs-cardiac-electrophysiology': at('SYS-CVS-T05', 'DIS-PHY'),
  'cvs-cardiac-mechanics-and-haemodynamics': at('SYS-CVS-T01', 'DIS-PHY'),
  'cvs-vascular-physiology': at('SYS-CVS-T01', 'DIS-PHY'),
  'cvs-cardiovascular-pathology': at('SYS-CVS-T03', 'SYS-CVS-T04', 'SYS-CVS-T06', 'SYS-CVS-T07', 'SYS-CVS-T08', 'DIS-PAT'),
  'cvs-cardiovascular-presentations': at('SYS-CVS-T02', 'KNW-PRS'),
  'cvs-cardiovascular-examination-and-investigations': at('SYS-CVS-T09', 'SKL-EXM', 'SKL-INT'),
  'cvs-cardiovascular-emergencies-and-skills': at('KNW-EMG', 'SYS-CVS-T03', 'SKL-ERS'),

  // Respiratory
  'resp-respiratory-anatomy': at('SYS-RES-T01', 'DIS-ANA'),
  'resp-respiratory-histology-and-development': at('SYS-RES-T01', 'DIS-HIS', 'DIS-EMB'),
  'resp-ventilation-and-mechanics': at('SYS-RES-T01', 'DIS-PHY'),
  'resp-gas-exchange-and-transport': at('SYS-RES-T01', 'DIS-PHY'),
  'resp-control-of-breathing': at('SYS-RES-T01', 'DIS-PHY'),
  'resp-respiratory-pathology': at('SYS-RES-T03', 'SYS-RES-T04', 'SYS-RES-T05', 'SYS-RES-T06', 'SYS-RES-T07', 'DIS-PAT'),
  'resp-respiratory-presentations': at('SYS-RES-T02', 'KNW-PRS'),
  'resp-respiratory-examination-and-investigations': at('SYS-RES-T08', 'SKL-EXM', 'SKL-INT'),
  'resp-respiratory-emergencies-and-skills': at('KNW-EMG', 'SYS-RES-T07', 'SKL-ERS'),

  // Renal & urinary
  'renal-renal-and-urinary-anatomy': at('SYS-REN-T01', 'DIS-ANA'),
  'renal-renal-histology-and-development': at('SYS-REN-T01', 'DIS-HIS', 'DIS-EMB'),
  'renal-renal-blood-flow-and-filtration': at('SYS-REN-T01', 'DIS-PHY'),
  'renal-tubular-transport': at('SYS-REN-T01', 'DIS-PHY'),
  'renal-fluid-electrolytes-and-acid-base': at('SYS-REN-T02', 'DIS-PHY'),
  'renal-endocrine-functions-of-the-kidney': at('SYS-REN-T01', 'SYS-END-T01'),
  'renal-renal-pathology': at('SYS-REN-T03', 'SYS-REN-T04', 'SYS-REN-T05', 'SYS-REN-T06', 'DIS-PAT'),
  'renal-renal-presentations': at('KNW-PRS', 'SYS-REN-T03'),
  'renal-renal-examination-and-investigations': at('SYS-REN-T07', 'SKL-EXM', 'SKL-INT'),
  'renal-renal-replacement-therapy': at('SYS-REN-T07', 'KNW-MGT'),

  // Gastrointestinal
  'gi-gastrointestinal-anatomy': at('SYS-GIT-T01', 'DIS-ANA'),
  'gi-gastrointestinal-histology-and-development': at('SYS-GIT-T01', 'DIS-HIS', 'DIS-EMB'),
  'gi-gastrointestinal-motility-and-secretion': at('SYS-GIT-T01', 'DIS-PHY'),
  'gi-digestion-and-absorption': at('SYS-GIT-T01', 'DIS-PHY'),
  'gi-liver-biliary-system-and-pancreas': at('SYS-GIT-T06', 'SYS-GIT-T07'),
  'gi-gastrointestinal-pathology': at('SYS-GIT-T03', 'SYS-GIT-T04', 'SYS-GIT-T05', 'SYS-GIT-T06', 'SYS-GIT-T07', 'DIS-PAT'),
  'gi-gastrointestinal-presentations': at('SYS-GIT-T02', 'KNW-PRS'),
  'gi-gastrointestinal-examination-and-investigations': at('SYS-GIT-T08', 'SKL-EXM', 'SKL-INT'),
  'gi-gastrointestinal-emergencies-and-skills': at('KNW-EMG', 'SYS-GIT-T03', 'SKL-ERS'),

  // Neurology
  'neuro-neuroanatomy': at('SYS-NEU-T01', 'DIS-ANA'),
  'neuro-neural-histology-and-development': at('SYS-NEU-T01', 'DIS-HIS', 'DIS-EMB'),
  'neuro-cellular-neurophysiology': at('SYS-NEU-T01', 'DIS-PHY'),
  'neuro-sensory-systems': at('SYS-NEU-T01', 'SYS-NEU-T07', 'SYS-NEU-T08'),
  'neuro-motor-systems': at('SYS-NEU-T01', 'DIS-PHY'),
  'neuro-autonomic-nervous-system': at('SYS-NEU-T01', 'DIS-PHY'),
  'neuro-higher-functions-and-behaviour': at('SYS-NEU-T01', 'SYS-PSY'),
  'neuro-neurological-pathology': at('SYS-NEU-T03', 'SYS-NEU-T04', 'SYS-NEU-T05', 'SYS-NEU-T06', 'DIS-PAT'),
  'neuro-neurological-presentations-and-examination': at('SYS-NEU-T02', 'KNW-PRS', 'SKL-EXM'),
  'neuro-neurological-investigations': at('KNW-DIA', 'SYS-NEU-T02', 'SKL-INT'),

  // Endocrine
  'endo-endocrine-anatomy-and-histology': at('SYS-END-T01', 'DIS-ANA', 'DIS-HIS'),
  'endo-hormone-signalling-and-regulation': at('SYS-END-T01', 'DIS-PHY'),
  'endo-hypothalamic-and-pituitary-systems': at('SYS-END-T02'),
  'endo-thyroid-physiology-and-disease': at('SYS-END-T03'),
  'endo-adrenal-physiology-and-disease': at('SYS-END-T05'),
  'endo-endocrine-pancreas-and-metabolism': at('SYS-END-T06', 'SYS-END-T07'),
  'endo-calcium-phosphate-and-bone-metabolism': at('SYS-END-T04', 'SYS-MSK-T05'),
  'endo-reproductive-endocrinology': at('SYS-END-T01', 'SYS-GYN', 'SYS-AND'),
  'endo-endocrine-presentations-and-investigations': at('KNW-PRS', 'SYS-END-T01', 'KNW-DIA'),
  'endo-endocrine-emergencies': at('KNW-EMG', 'SYS-END-T06'),

  // Musculoskeletal
  'msk-musculoskeletal-foundations': at('SYS-MSK-T01', 'DIS-ANA'),
  'msk-bone-cartilage-and-connective-tissue': at('SYS-MSK-T01', 'DIS-HIS'),
  'msk-muscle-physiology': at('SYS-MSK-T01', 'DIS-PHY'),
  'msk-upper-limb': at('SYS-MSK-T01', 'DIS-ANA'),
  'msk-lower-limb': at('SYS-MSK-T01', 'DIS-ANA'),
  'msk-back-and-axial-skeleton': at('SYS-MSK-T01', 'DIS-ANA'),
  'msk-musculoskeletal-pathology': at('SYS-MSK-T03', 'SYS-MSK-T04', 'SYS-MSK-T05', 'DIS-PAT'),
  'msk-musculoskeletal-presentations-and-examination': at('SYS-MSK-T02', 'KNW-PRS', 'SKL-EXM'),
  'msk-musculoskeletal-investigations': at('SYS-MSK-T06', 'SKL-INT'),
  'msk-musculoskeletal-skills': at('SYS-MSK-T06', 'SKL-PRC'),

  // Pharmacology
  'pharm-pharmacokinetics': at('DIS-PHA-T01'),
  'pharm-pharmacodynamics': at('DIS-PHA-T02'),
  'pharm-safe-prescribing-and-calculations': at('DIS-PHA-T08', 'SKL-PRE'),
  'pharm-adverse-effects-and-interactions': at('DIS-PHA-T08', 'SKL-PRE'),
  'pharm-autonomic-pharmacology': at('DIS-PHA-T03'),
  'pharm-cardiovascular-pharmacology': at('DIS-PHA-T04', 'SYS-CVS', 'KNW-DRG'),
  'pharm-respiratory-and-allergy-pharmacology': at('DIS-PHA-T04', 'SYS-RES', 'KNW-DRG'),
  'pharm-renal-and-endocrine-pharmacology': at('DIS-PHA-T04', 'SYS-REN', 'SYS-END', 'KNW-DRG'),
  'pharm-gastrointestinal-pharmacology': at('DIS-PHA-T04', 'SYS-GIT', 'KNW-DRG'),
  'pharm-neuropsychopharmacology': at('DIS-PHA-T04', 'SYS-NEU', 'SYS-PSY', 'KNW-DRG'),
  'pharm-antimicrobial-pharmacology': at('DIS-PHA-T05', 'SYS-INF', 'KNW-DRG'),
  'pharm-inflammation-immunity-and-cancer-pharmacology': at('DIS-PHA-T06', 'SYS-IMM', 'KNW-DRG'),
  'pharm-toxicology-and-antidotes': at('DIS-PHA-T07', 'DIS-FOR'),
  'pharm-special-populations-and-personalised-therapy': at('DIS-PHA-T08', 'KNW-SPC'),
}

const normalise = (value: string) =>
  value.toLocaleLowerCase().replace(/[‐-―]/g, '-').replace(/[^a-z0-9]+/g, ' ').trim()

/** Curriculum node ID → its subject and owning topic, for ancestor lookup. */
interface CurriculumLocation {
  subjectId: string
  topicNodeId?: string
}

function buildLocations(tree: CurriculumSystem[]): Map<string, CurriculumLocation> {
  const locations = new Map<string, CurriculumLocation>()
  for (const system of tree) {
    locations.set(system.id, { subjectId: system.id })
    for (const topicNode of system.topics) {
      locations.set(topicNode.id, { subjectId: system.id, topicNodeId: topicNode.id })
      for (const subtopicNode of topicNode.subs) {
        locations.set(subtopicNode.id, { subjectId: system.id, topicNodeId: topicNode.id })
        for (const microtopicNode of subtopicNode.micros) {
          locations.set(microtopicNode.id, { subjectId: system.id, topicNodeId: topicNode.id })
          for (const nanotopicNode of microtopicNode.nanos) {
            locations.set(nanotopicNode.id, { subjectId: system.id, topicNodeId: topicNode.id })
          }
        }
      }
    }
  }
  return locations
}

const CURRICULUM_LOCATIONS = buildLocations(CURRICULUM_CATALOG)

/** Every canonical node title, for the unambiguous-title refinement below. */
function buildTitleIndex(): Map<string, MedicalTaxonomyNode[]> {
  const index = new Map<string, MedicalTaxonomyNode[]>()
  for (const node of MEDICAL_TAXONOMY_SEED) {
    const key = normalise(node.title)
    index.set(key, [...(index.get(key) ?? []), node])
  }
  return index
}

const CANONICAL_BY_TITLE = buildTitleIndex()

const isDescendantOf = (node: MedicalTaxonomyNode, ancestorId: string) =>
  MEDICAL_TAXONOMY_INDEX.lineage(node.id).some((entry) => entry.id === ancestorId)

/**
 * Refine a placement when the canonical tree has exactly one node with this
 * title inside the mapped subtree. Ambiguous or absent titles inherit.
 */
function refine(entry: CrosswalkEntry, title: string): CrosswalkEntry {
  const candidates = (CANONICAL_BY_TITLE.get(normalise(title)) ?? []).filter((node) => isDescendantOf(node, entry.primaryNodeId))
  if (candidates.length !== 1) return entry
  return { primaryNodeId: candidates[0].id, secondaryNodeIds: entry.secondaryNodeIds }
}

/**
 * Canonical placement for any curriculum node.
 *
 * Resolution order: the node's own topic mapping, then its subject mapping.
 * A subtopic/microtopic/nanotopic title is used only to make an already-mapped
 * placement more precise, never to guess one.
 */
export function canonicalPlacementFor(curriculumNodeId: string, title?: string): CrosswalkEntry | undefined {
  const location = CURRICULUM_LOCATIONS.get(curriculumNodeId)
  if (!location) return undefined
  if (CURRICULUM_TOPIC_CROSSWALK[curriculumNodeId]) return CURRICULUM_TOPIC_CROSSWALK[curriculumNodeId]
  if (CURRICULUM_SYSTEM_CROSSWALK[curriculumNodeId]) return CURRICULUM_SYSTEM_CROSSWALK[curriculumNodeId]
  const inherited = (location.topicNodeId ? CURRICULUM_TOPIC_CROSSWALK[location.topicNodeId] : undefined)
    ?? CURRICULUM_SYSTEM_CROSSWALK[location.subjectId]
  if (!inherited) return undefined
  return title ? refine(inherited, title) : inherited
}

/** Reverse lookup: which curriculum topics point at this canonical node. */
export function curriculumTopicsFor(canonicalNodeId: string): string[] {
  return Object.entries(CURRICULUM_TOPIC_CROSSWALK)
    .filter(([, entry]) => entry.primaryNodeId === canonicalNodeId || entry.secondaryNodeIds.includes(canonicalNodeId))
    .map(([curriculumNodeId]) => curriculumNodeId)
}

export interface CrosswalkCoverage {
  mappedSubjects: number
  mappedTopics: number
  /** Curriculum subjects/topics with no reviewed canonical placement. */
  unmappedSubjects: string[]
  unmappedTopics: string[]
  /** Crosswalk targets that do not exist in the canonical taxonomy. */
  unknownTargets: Array<{ curriculumNodeId: string; canonicalNodeId: string }>
}

export function crosswalkCoverage(tree: CurriculumSystem[] = CURRICULUM_CATALOG): CrosswalkCoverage {
  const unmappedSubjects: string[] = []
  const unmappedTopics: string[] = []
  for (const system of tree) {
    if (!CURRICULUM_SYSTEM_CROSSWALK[system.id]) unmappedSubjects.push(system.id)
    for (const topicNode of system.topics) {
      if (!CURRICULUM_TOPIC_CROSSWALK[topicNode.id]) unmappedTopics.push(topicNode.id)
    }
  }
  const unknownTargets: CrosswalkCoverage['unknownTargets'] = []
  const check = (curriculumNodeId: string, entry: CrosswalkEntry) => {
    for (const canonicalNodeId of [entry.primaryNodeId, ...entry.secondaryNodeIds]) {
      if (!MEDICAL_TAXONOMY_INDEX.byId.has(canonicalNodeId)) unknownTargets.push({ curriculumNodeId, canonicalNodeId })
    }
  }
  Object.entries(CURRICULUM_SYSTEM_CROSSWALK).forEach(([id, entry]) => check(id, entry))
  Object.entries(CURRICULUM_TOPIC_CROSSWALK).forEach(([id, entry]) => check(id, entry))

  return {
    mappedSubjects: Object.keys(CURRICULUM_SYSTEM_CROSSWALK).length,
    mappedTopics: Object.keys(CURRICULUM_TOPIC_CROSSWALK).length,
    unmappedSubjects,
    unmappedTopics,
    unknownTargets,
  }
}
