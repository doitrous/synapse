/**
 * Curriculum taxonomy identifiers. Every System, Topic, Subtopic, and Microtopic
 * gets a stable, human-readable, visible ID (auto-derived from its slug), and
 * universities/years get readable IDs too (e.g. OMS_Y2). These IDs are what
 * concepts, questions, articles, and resources tag themselves with.
 */
import { subjects, getSubject } from './subjects'
import { getUniversity } from './universities'
import {
  CURRICULUM_CATALOG,
  curriculumSystemId,
  curriculumTopicId,
  curriculumSubtopicId,
  curriculumMicrotopicId,
  curriculumNanotopicId,
} from './curriculumCatalog'

const up = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/(^_|_$)/g, '')

export const systemId = curriculumSystemId
export const topicIdOf = curriculumTopicId
export const subtopicIdOf = curriculumSubtopicId
export const microtopicIdOf = curriculumMicrotopicId
export const nanotopicIdOf = curriculumNanotopicId
export const universityId = (uniId: string) => (getUniShort(uniId) || up(uniId))
export const yearId = (uniId: string, year: string) => {
  const short = getUniShort(uniId) || up(uniId)
  const number = year.replace(/\D/g, '') || '1'
  return /internship/i.test(year) ? `${short}_INT${number}` : `${short}_Y${number}`
}

function getUniShort(uniId: string): string | undefined {
  // Read from the persistent Academic Setup catalogue (localStorage) first, so a
  // newly-added or renamed university uses its real abbreviation (e.g. HU_Y1),
  // then fall back to the seeded list.
  return getUniversity(uniId)?.short
}

export interface TaxSubtopic { id: string; title: string; subId: string }
export interface TaxTopic { id: string; title: string; tpcId: string; subtopics: TaxSubtopic[] }
export interface TaxSystem { id: string; name: string; short: string; sysId: string; topics: TaxTopic[] }

/** The full derived taxonomy tree with visible IDs, for pickers and the editor. */
export function taxonomyTree(): TaxSystem[] {
  return CURRICULUM_CATALOG.map((system) => ({
    id: system.id,
    name: system.name,
    short: system.short,
    sysId: system.sysId,
    topics: system.topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      tpcId: topic.tpcId,
      subtopics: topic.subs.map(({ id, title, subId }) => ({ id, title, subId })),
    })),
  }))
}

/** Resolve any curriculum node slug or visible ID to its complete path. */
export function scopeForSubtopic(subtopicId: string): { systemId?: string; topicId?: string; subtopicId?: string; subjectId?: string; topicSlug?: string } {
  for (const system of CURRICULUM_CATALOG) {
    for (const topic of system.topics) {
      const subtopic = topic.subs.find((node) => node.id === subtopicId || node.subId === subtopicId)
      if (!subtopic) continue
      return {
        subjectId: system.id,
        topicSlug: topic.id,
        systemId: system.sysId,
        topicId: topic.tpcId,
        subtopicId: subtopic.subId,
      }
    }
  }
  return {}
}

export function systemLabel(sysId: string): string {
  const subj = subjects.find((s) => systemId(s.id) === sysId)
  return subj ? subj.name : sysId
}

export { getSubject }
