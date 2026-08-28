import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, isStudentPublishable, type ManagedContentItem } from '@/data/contentControl'
import { resources as SEED_RESOURCES, type Resource } from '@/data/resources'
import type { ResourceType } from '@/data/types'
import { API_MODE } from './api'

/**
 * A live resource carries the full chapters/modules lists for folder grouping,
 * plus the scope its author actually recorded.
 *
 * `universityIds` and `yearIds` are authored on the item. They replace a string
 * hash over the resource id that invented which universities each resource
 * "applies to" — a real-looking chip that meant nothing. Empty means it applies
 * to everyone, which is how an unrestricted resource should read.
 */
export interface LiveResource extends Resource {
  chapters: string[]
  modules: string[]
  universityIds: string[]
  yearIds: string[]
  /** True when a source file has been uploaded and can be opened. */
  hasFile: boolean
}

const RESOURCE_TYPES: ResourceType[] = ['Book', 'Video', 'Guideline', 'Deck', 'Article']
const asType = (value?: string): ResourceType => (RESOURCE_TYPES.includes(value as ResourceType) ? (value as ResourceType) : 'Article')

/** Apply an admin ledger resource item's edits on top of a seeded resource. */
function overlayResource(res: Resource, item: ManagedContentItem | undefined): LiveResource {
  if (!item) return { ...res, chapters: res.chapter ? [res.chapter] : [], modules: [], universityIds: [], yearIds: [], hasFile: false }
  const chapters = item.resourceData?.chapters?.length ? item.resourceData.chapters : (item.fields.Chapter ? [item.fields.Chapter] : res.chapter ? [res.chapter] : [])
  return {
    ...res,
    title: item.title?.trim() || res.title,
    type: asType(item.fields.Type) || res.type,
    subjectId: item.subjectId || res.subjectId,
    source: item.fields.Source?.trim() || res.source,
    meta: item.fields.Location?.trim() || res.meta,
    year: Number(item.fields.Year) || res.year,
    chapter: chapters[0] ?? res.chapter,
    icon: item.resourceData?.icon || res.icon,
    chapters,
    modules: item.resourceData?.moduleIds ?? [],
    universityIds: item.resourceData?.universityIds ?? [],
    yearIds: item.resourceData?.yearIds ?? [],
    hasFile: Boolean(item.resourceData?.storageKey),
  }
}

/** Build a resource from an admin-created ledger item that has no seed. */
function itemToResource(item: ManagedContentItem): LiveResource {
  const chapters = item.resourceData?.chapters?.length ? item.resourceData.chapters : (item.fields.Chapter ? [item.fields.Chapter] : [])
  return {
    id: item.id,
    title: item.title,
    type: asType(item.fields.Type),
    subjectId: item.subjectId,
    source: item.fields.Source?.trim() || '—',
    meta: item.fields.Location?.trim() || '',
    year: Number(item.fields.Year) || new Date().getFullYear(),
    chapter: chapters[0],
    icon: item.resourceData?.icon,
    chapters,
    modules: item.resourceData?.moduleIds ?? [],
    universityIds: item.resourceData?.universityIds ?? [],
    yearIds: item.resourceData?.yearIds ?? [],
    hasFile: Boolean(item.resourceData?.storageKey),
  }
}

/**
 * The resource library as students should see it now: seeded resources with
 * every admin edit from the content ledger overlaid, plus any resources added
 * in Resources & Media setup. Archived resources are hidden.
 */
export function useLiveResources(): LiveResource[] {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)

  return useMemo(() => {
    const items = ledger.filter((i) => i.kind === 'resource')
    const byId = new Map(items.map((i) => [i.id, i]))
    const seededIds = new Set(SEED_RESOURCES.map((r) => r.id))

    const overlaid = (API_MODE ? [] : SEED_RESOURCES)
      .filter((resource) => {
        const item = byId.get(resource.id)
        return item?.status !== 'Archived' && !(item?.status === 'Published' && !isStudentPublishable(item))
      })
      .map((r) => overlayResource(r, byId.get(r.id)))

    const added = items
      .filter((i) => !seededIds.has(i.id) && isStudentPublishable(i))
      .map(itemToResource)

    return [...overlaid, ...added]
  }, [ledger])
}
