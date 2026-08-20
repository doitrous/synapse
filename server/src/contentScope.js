/**
 * Which content a reviewer may write.
 *
 * The mirror of this on the client is `itemInScope` in
 * `src/data/contentControl.ts`, and the two deliberately disagree about what an
 * empty tag list means. There, empty means unrestricted: an untagged article is
 * shown to every student. Here, empty means nobody: an untagged item matches no
 * reviewer and only an unscoped caller may touch it. Showing untagged content
 * to everyone is generous; letting anyone edit it is not. They are two named
 * functions rather than one with a flag, so neither can be mistaken for the
 * other.
 */

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
export function yearNumber(value) {
  if (typeof value === 'number') return Number.isInteger(value) && value > 0 ? value : null
  const text = String(value ?? '').trim()
  if (!text) return null
  if (/int/i.test(text)) return null
  const match = text.match(/(?:^|[_\s])(?:Y)?(\d{1,2})$/i)
  return match ? Number(match[1]) : null
}

/** The university an id like "OMS_Y2" belongs to, or null for a bare label. */
function universityOfYear(value) {
  const match = String(value ?? '').match(/^([A-Za-z]+)_(?:Y|INT)\d+$/)
  return match ? match[1].toUpperCase() : null
}

function list(value) {
  return Array.isArray(value)
    ? value.filter((entry) => entry !== null && entry !== undefined && entry !== '')
    : []
}

/** Where each kind keeps its tags. The one place that has to know. */
function tagsOf(kind, item) {
  if (!item) return { moduleIds: [], years: [], universityIds: [] }
  if (kind === 'question') {
    const tags = item.questionData?.tags ?? {}
    return { moduleIds: list(tags.moduleIds), years: list(tags.years), universityIds: list(tags.universityIds) }
  }
  if (kind === 'concept') {
    return { moduleIds: list(item.moduleIds), years: list(item.learnerYears), universityIds: list(item.universityIds) }
  }
  const data = (kind === 'article' ? item.articleData
    : kind === 'practical' ? item.practicalData
    : kind === 'resource' ? item.resourceData
    : null) ?? {}
  return { moduleIds: list(data.moduleIds), years: list(data.yearIds), universityIds: list(data.universityIds) }
}

export function itemModules(kind, item) {
  return tagsOf(kind, item).moduleIds.map(String)
}

export function itemYears(kind, item) {
  return [...new Set(tagsOf(kind, item).years.map(yearNumber).filter((year) => year !== null))]
}

export function itemUniversities(kind, item) {
  const tags = tagsOf(kind, item)
  const fromYears = tags.years.map(universityOfYear).filter(Boolean)
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
export function itemWritableBy(scope, kind, item) {
  if (!scope) return true
  if (!item) return true

  const scopeUniversities = new Set(scope.yearIds.map(universityOfYear).filter(Boolean))
  const itemUniversityList = itemUniversities(kind, item)
  if (scopeUniversities.size && itemUniversityList.length
      && !itemUniversityList.some((id) => scopeUniversities.has(id))) return false

  const modules = new Set(itemModules(kind, item))
  if (scope.moduleIds.some((id) => modules.has(String(id)))) return true

  const years = new Set(itemYears(kind, item))
  const scopeYears = scope.yearIds.map(yearNumber).filter((year) => year !== null)
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
export function changeWritableBy(scope, kind, before, after) {
  if (!scope) return true
  return itemWritableBy(scope, kind, before) && itemWritableBy(scope, kind, after)
}
