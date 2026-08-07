import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { resources as SEED_RESOURCES, type Resource } from '@/data/resources'
import type { ResourceType } from '@/data/types'

const RESOURCE_TYPES: ResourceType[] = ['Book', 'Video', 'Guideline', 'Deck', 'Article']
const asType = (value?: string): ResourceType => (RESOURCE_TYPES.includes(value as ResourceType) ? (value as ResourceType) : 'Article')

/** Apply an admin ledger resource item's edits on top of a seeded resource. */
function overlayResource(res: Resource, item: ManagedContentItem | undefined): Resource {
  if (!item) return res
  const chapter = item.resourceData?.chapters?.[0] || item.fields.Chapter || res.chapter
  return {
    ...res,
    title: item.title?.trim() || res.title,
    type: asType(item.fields.Type) || res.type,
    subjectId: item.subjectId || res.subjectId,
    source: item.fields.Source?.trim() || res.source,
    meta: item.fields.Location?.trim() || res.meta,
    year: Number(item.fields.Year) || res.year,
    chapter,
  }
}

/** Build a resource from an admin-created ledger item that has no seed. */
function itemToResource(item: ManagedContentItem): Resource {
  return {
    id: item.id,
    title: item.title,
    type: asType(item.fields.Type),
    subjectId: item.subjectId,
    source: item.fields.Source?.trim() || '—',
    meta: item.fields.Location?.trim() || '',
    year: Number(item.fields.Year) || new Date().getFullYear(),
    chapter: item.resourceData?.chapters?.[0] || item.fields.Chapter || undefined,
  }
}

/**
 * The resource library as students should see it now: seeded resources with
 * every admin edit from the content ledger overlaid, plus any resources added
 * in Resources & Media setup. Archived resources are hidden.
 */
export function useLiveResources(): Resource[] {
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
