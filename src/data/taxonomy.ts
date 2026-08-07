/**
 * Curriculum taxonomy identifiers. Every System, Topic, Subtopic, and Microtopic
 * gets a stable, human-readable, visible ID (auto-derived from its slug), and
 * universities/years get readable IDs too (e.g. OMS_Y2). These IDs are what
 * concepts, questions, articles, and resources tag themselves with.
 */
import { subjects, getSubject } from './student'
import { libraryTopics } from './library'
import { universities } from './universities'

const up = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/(^_|_$)/g, '')

export const systemId = (subjectId: string) => `SYS_${up(subjectId)}`
export const topicIdOf = (topicId: string) => `TPC_${up(topicId)}`
export const subtopicIdOf = (subtopicId: string) => `SUB_${up(subtopicId)}`
export const microtopicIdOf = (microtopicId: string) => `MIC_${up(microtopicId)}`
export const universityId = (uniId: string) => (getUniShort(uniId) || up(uniId))
export const yearId = (uniId: string, year: string) => `${getUniShort(uniId) || up(uniId)}_Y${year.replace(/\D/g, '') || '1'}`

function getUniShort(uniId: string): string | undefined {
  return universities.find((u) => u.id === uniId)?.short
}

export interface TaxSubtopic { id: string; title: string; subId: string }
export interface TaxTopic { id: string; title: string; tpcId: string; subtopics: TaxSubtopic[] }
export interface TaxSystem { id: string; name: string; short: string; sysId: string; topics: TaxTopic[] }

/** The full derived taxonomy tree with visible IDs, for pickers and the editor. */
export function taxonomyTree(): TaxSystem[] {
  return subjects.map((subj) => ({
    id: subj.id,
    name: subj.name,
    short: subj.short,
    sysId: systemId(subj.id),
    topics: libraryTopics
      .filter((t) => t.subjectId === subj.id)
      .map((t) => ({
        id: t.id,
        title: t.title,
        tpcId: topicIdOf(t.id),
        subtopics: t.subtopics.map((s) => ({ id: s.id, title: s.title, subId: subtopicIdOf(s.id) })),
      })),
  }))
}

/** Resolve the system/topic/subtopic IDs for a library subtopic (article) id. */
export function scopeForSubtopic(subtopicId: string): { systemId?: string; topicId?: string; subtopicId?: string; subjectId?: string; topicSlug?: string } {
  for (const topic of libraryTopics) {
    const sub = topic.subtopics.find((s) => s.id === subtopicId)
    if (sub) {
      return {
        subjectId: topic.subjectId,
        topicSlug: topic.id,
        systemId: systemId(topic.subjectId),
        topicId: topicIdOf(topic.id),
        subtopicId: subtopicIdOf(sub.id),
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
