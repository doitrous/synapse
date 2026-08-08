import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { resources as SEED_RESOURCES, type Resource } from '@/data/resources'
import type { ResourceType } from '@/data/types'

/** A live resource carries the full chapters/modules lists for folder grouping. */
export interface LiveResource extends Resource {
  chapters: string[]
  modules: string[]
}

const RESOURCE_TYPES: ResourceType[] = ['Book', 'Video', 'Guideline', 'Deck', 'Article']
const asType = (value?: string): ResourceType => (RESOURCE_TYPES.includes(value as ResourceType) ? (value as ResourceType) : 'Article')

/** Apply an admin ledger resource item's edits on top of a seeded resource. */
function overlayResource(res: Resource, item: ManagedContentItem | undefined): LiveResource {
  if (!item) return { ...res, chapters: res.chapter ? [res.chapter] : [], modules: [] }
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
    chapters,
    modules: item.resourceData?.moduleIds ?? [],
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
    chapters,
    modules: item.resourceData?.moduleIds ?? [],
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

    const overlaid = SEED_RESOURCES
      .filter((r) => byId.get(r.id)?.status !== 'Archived') // hide if archived in admin
      .map((r) => overlayResource(r, byId.get(r.id)))

    const added = items
      .filter((i) => !seededIds.has(i.id) && i.status !== 'Archived' && i.status === 'Published')
      .map(itemToResource)

    return [...overlaid, ...added]
  }, [ledger])
}
