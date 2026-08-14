/**
 * Resources, arranged into folders.
 *
 * This was inline in the Resources page and quietly dropped rows: under System
 * grouping the folder list was built from the static subject catalogue, so any
 * resource tagged with a subject the catalogue does not list was counted in the
 * header and the filter chips, then never grouped — the page reported "7
 * resources" above "No resources match". Every published resource in the
 * shipped library carries `subjectId: "medical"`, which is not one of the
 * twenty catalogue ids, so the whole Files list was empty under System and
 * appeared only under Module.
 *
 * The rule now: catalogue order first, then anything else, and nothing is ever
 * discarded for being unrecognised.
 */

/** A folder with no name to give it — an absent module, or an absent subject. */
export const UNGROUPED = '__none__'

/** Items in a folder that name no chapter. */
export const NO_CHAPTER = '__general__'

export type GroupBy = 'system' | 'module'

export interface GroupableResource {
  subjectId: string
  modules: string[]
  chapter?: string
}

export interface ResourceFolder<T> {
  /** The subject id, the module id, or `UNGROUPED`. */
  key: string
  /** The subject to colour the folder by; absent when nothing identifies one. */
  subjectId?: string
  count: number
  subfolders: { key: string; items: T[] }[]
}

/** "CVS 2" before "CVS 10" — a plain string sort puts 10 first. */
function byModuleId(a: string, b: string): number {
  if (a === UNGROUPED) return 1
  if (b === UNGROUPED) return -1
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

export function groupResources<T extends GroupableResource>(
  items: T[],
  groupBy: GroupBy,
  /** Catalogue subject ids, in the order they should appear. */
  subjectOrder: readonly string[],
): ResourceFolder<T>[] {
  const primaries = new Map<string, T[]>()
  for (const item of items) {
    const key = (groupBy === 'system' ? item.subjectId : item.modules[0]) || UNGROUPED
    const bucket = primaries.get(key)
    if (bucket) bucket.push(item)
    else primaries.set(key, [item])
  }

  let keys: string[]
  if (groupBy === 'system') {
    const known = subjectOrder.filter((id) => primaries.has(id))
    // Everything the catalogue does not know about, kept rather than dropped.
    const rest = [...primaries.keys()]
      .filter((key) => !subjectOrder.includes(key))
      .sort(byModuleId)
    keys = [...known, ...rest]
  } else {
    keys = [...primaries.keys()].sort(byModuleId)
  }

  return keys.map((key) => {
    const folderItems = primaries.get(key)!
    const subfolders = new Map<string, T[]>()
    for (const item of folderItems) {
      const chapter = item.chapter || NO_CHAPTER
      const bucket = subfolders.get(chapter)
      if (bucket) bucket.push(item)
      else subfolders.set(chapter, [item])
    }
    return {
      key,
      subjectId: groupBy === 'system'
        ? (key === UNGROUPED ? undefined : key)
        : folderItems[0]?.subjectId || undefined,
      count: folderItems.length,
      subfolders: [...subfolders.entries()].map(([chapterKey, chapterItems]) => ({
        key: chapterKey,
        items: chapterItems,
      })),
    }
  })
}
