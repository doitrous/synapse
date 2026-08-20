/**
 * Which content a reviewer may write — the client's twin of
 * `server/src/contentScope.js`.
 *
 * Declared rather than imported, like `adminRoles.ts` and `adminTabs.ts`: the
 * server module is untyped JavaScript outside `src`, so importing it into app
 * code would break the Vite bundle and `tsc -b`. `contentScope.test.ts` imports
 * both and compares them on every question, which is why this is a
 * transliteration and not a tidier rewrite.
 *
 * The server is what enforces this. Here it only decides what to show, so that
 * a reviewer is not scrolling a catalogue they cannot edit and discovering the
 * boundary when a save is refused.
 *
 * The mirror of *this* is `itemInScope` in `contentControl.ts`, and the two
 * deliberately disagree about what an empty tag list means. There, empty means
 * unrestricted: an untagged article is shown to every student. Here, empty
 * means nobody: an untagged item matches no reviewer and only an unscoped
 * caller may touch it. Showing untagged content to everyone is generous;
 * letting anyone edit it is not.
 */

import type { ManagedContentItem } from './contentControl.ts'
import type { Concept } from './conceptGraph.ts'

/** The modules and years a reviewer may write. */
export interface ContentScope {
  moduleIds: string[]
  yearIds: string[]
}

export type ScopedKind = 'question' | 'article' | 'practical' | 'resource' | 'concept' | 'deck' | 'essay' | 'histology'
export type ScopedItem = ManagedContentItem | Concept

interface ItemTags {
  moduleIds: unknown[]
  years: unknown[]
  universityIds: unknown[]
}

/**
 * A year, from any of the three ways this codebase stores one.
 *
 * Question tags hold labels ("Year 2"), concepts hold plain numbers, and
 * `yearIds` holds whichever form the editor that wrote it used — the article
 * editor writes scoped ids from `yearId()` (src/data/taxonomy.ts:26), while
 * ResourceEditorDialog.tsx:231 writes YEARS labels into the same field. All
 * three are therefore read here rather than assumed away.
 *
 * Internship years are deliberately not numbers: "OMS_INT1" is not year 1, and
 * treating it as one would hand a first-year reviewer the interns.
 */
export function yearNumber(value: string | number | null | undefined): number | null {
  if (typeof value === 'number') return Number.isInteger(value) && value > 0 ? value : null
  const text = String(value ?? '').trim()
  if (!text) return null
  if (/int/i.test(text)) return null
  const match = text.match(/(?:^|[_\s])(?:Y)?(\d{1,2})$/i)
  return match ? Number(match[1]) : null
}

/** The university an id like "OMS_Y2" belongs to, or null for a bare label. */
function universityOfYear(value: unknown): string | null {
  const match = String(value ?? '').match(/^([A-Za-z]+)_(?:Y|INT)\d+$/)
  return match ? match[1].toUpperCase() : null
}

/**
 * The module a `module_subject` path names.
 *
 * A path reads `101 ISK > Anatomy > Upper Limb > Brachial Plexus`, written the
 * way the faculty says it, and its first segment is the module. Content tagged
 * only this finely still belongs to whoever reviews that module, so the path is
 * a second source of module ids beside `moduleIds` rather than a replacement
 * for it. See `moduleSubjectPath.ts`.
 */
function moduleOfPath(path: unknown): string | null {
  const first = String(path ?? '').split('>')[0]?.trim()
  return first || null
}

function list(value: unknown): unknown[] {
  return Array.isArray(value)
    ? value.filter((entry) => entry !== null && entry !== undefined && entry !== '')
    : []
}

/** Where each kind keeps its tags. The one place that has to know. */
function tagsOf(kind: ScopedKind, item: ScopedItem | null): ItemTags {
  const record = item as unknown as Record<string, unknown> & { questionData?: { tags?: Record<string, unknown> }; articleData?: Record<string, unknown>; practicalData?: Record<string, unknown>; resourceData?: Record<string, unknown> }
  if (!item) return { moduleIds: [], years: [], universityIds: [] }
  if (kind === 'question') {
    const tags = record.questionData?.tags ?? {}
    return {
      moduleIds: [...list(tags.moduleIds), ...list(tags.moduleSubjectPaths).map(moduleOfPath).filter(Boolean)],
      years: list(tags.years),
      universityIds: list(tags.universityIds),
    }
  }
  if (kind === 'concept') {
    return { moduleIds: list(record.moduleIds), years: list(record.learnerYears), universityIds: list(record.universityIds) }
  }
  // deck, essay and histology carry no curriculum placement at all yet, so they
  // fall through to nothing — which means untagged, which means only an
  // unscoped caller may edit them.
  const data = (kind === 'article' ? record.articleData
    : kind === 'practical' ? record.practicalData
    : kind === 'resource' ? record.resourceData
    : null) ?? {}
  return {
    moduleIds: [...list(data.moduleIds), ...list(data.moduleSubjectPaths).map(moduleOfPath).filter(Boolean)],
    years: list(data.yearIds),
    universityIds: list(data.universityIds),
  }
}

export function itemModules(kind: ScopedKind, item: ScopedItem | null): string[] {
  return tagsOf(kind, item).moduleIds.map(String)
}

export function itemYears(kind: ScopedKind, item: ScopedItem | null): number[] {
  return [...new Set(tagsOf(kind, item).years.map((year) => yearNumber(year as string | number)).filter((year): year is number => year !== null))]
}

export function itemUniversities(kind: ScopedKind, item: ScopedItem | null): string[] {
  const tags = tagsOf(kind, item)
  const fromYears = tags.years.map(universityOfYear).filter((id): id is string => Boolean(id))
  return [...new Set([...tags.universityIds.map((id) => String(id).toUpperCase()), ...fromYears])]
}

/**
 * Whether this scope may write this item.
 *
 * A null scope is an editor or a super admin and writes anything. Otherwise the
 * item's modules or its years must intersect the reviewer's — and when both
 * sides name universities, those must overlap too, so a Year 2 reviewer at one
 * university does not inherit another's Year 2.
 */
export function itemWritableBy(scope: ContentScope | null, kind: ScopedKind, item: ScopedItem | null): boolean {
  if (!scope) return true
  if (!item) return true

  const scopeUniversities = new Set(scope.yearIds.map(universityOfYear).filter((id): id is string => Boolean(id)))
  const itemUniversityList = itemUniversities(kind, item)
  if (scopeUniversities.size && itemUniversityList.length
      && !itemUniversityList.some((id) => scopeUniversities.has(id))) return false

  const modules = new Set(itemModules(kind, item))
  if (scope.moduleIds.some((id) => modules.has(String(id)))) return true

  const years = new Set(itemYears(kind, item))
  const scopeYears = scope.yearIds.map((year) => yearNumber(year)).filter((year): year is number => year !== null)
  return scopeYears.some((year) => years.has(year))
}

/**
 * Whether this scope may make this change.
 *
 * Both sides are judged, which is what stops the two obvious attacks: retagging
 * somebody else's item into your scope, and retagging your own out of it. A
 * creation has no before and a deletion has no after; the side that exists must
 * still pass.
 */
export function changeWritableBy(scope: ContentScope | null, kind: ScopedKind, before: ScopedItem | null, after: ScopedItem | null): boolean {
  if (!scope) return true
  return itemWritableBy(scope, kind, before) && itemWritableBy(scope, kind, after)
}
