/**
 * The admin content-list projection — pure, so both `adminContent.js` (which
 * serves it) and the client parity test (`src/data/adminListRow.test.ts`, which
 * proves it drops nothing the list reads) import it without pulling in the db
 * pool. See the long note on `toIndexItem` for why each field is kept.
 */
const omit = (obj, keys) => { const out = { ...obj }; for (const key of keys) delete out[key]; return out }
const pick = (obj, keys) => { const out = {}; for (const key of keys) if (obj[key] !== undefined) out[key] = obj[key]; return out }

// The heavy free-text fields the list never renders (only full-text search read
// them; that search now matches title/topic/tags instead).
const HEAVY_FIELDS = ['Vignette', 'Explanation']
// The only `questionData` members the list path reads: scope/placement tags and
// the media requests that gate publish + drive the media filter.
const QUESTION_DATA_KEEP = ['tags', 'mediaRequests']
// The `articleData` members the list path reads (scope, modules, gate, requests).
const ARTICLE_DATA_KEEP = ['universityIds', 'yearIds', 'moduleIds', 'moduleSubjectPaths', 'publicationGate', 'mediaRequests']

/**
 * The list projection.
 *
 * The catalogue is ~251 MB / 75k items in production, and the Content dashboard
 * holds the whole thing in the browser to filter/search/facet it client-side.
 * Merely dropping a question's stem+answers only trims it to ~178 MB — the
 * weight is the sheer count of questions (67k), each carrying a full
 * `questionData` and a long `Explanation`/`Vignette`. So this projects the two
 * dominant kinds (question, article) down to ONLY the fields the list path
 * actually reads, which brings the payload back to ~77 MB — the size the tab
 * worked at before the bank grew.
 *
 * The kept set is exhaustively enumerated from the list path (ControlDashboard +
 * itemScope, itemFacetTokens/contentModuleLabels, contentTagsOf, publishReadiness,
 * matchesMediaRequestFilter, itemSummary) and PROVEN complete by the parity test
 * `adminListRow.test.ts`, which asserts every one of those functions returns the
 * same thing on a projected row as on the full item. The two big bodies the list
 * does NOT render — a question's `Vignette`/`Explanation` and an article's
 * `sections` — are dropped, so the catalogue search no longer matches on them
 * (title/topic/tags still match); an article keeps a computed `hasBody` +
 * `publishedSectionKinds` so `publishReadiness` still works without the bodies.
 *
 * Small kinds (practical/resource/deck/essay/histology, ~370 items total) are
 * kept whole — projecting them would not pay for the risk. The editor fetches
 * the full item on open, so this projection never feeds a save.
 */
export function toIndexItem(item) {
  if (!item || typeof item !== 'object') return item
  const fields = item.fields ? omit(item.fields, HEAVY_FIELDS) : item.fields
  if (item.kind === 'question' && item.questionData && typeof item.questionData === 'object') {
    return { ...item, fields, questionData: pick(item.questionData, QUESTION_DATA_KEEP) }
  }
  if (item.kind === 'article' && item.articleData && typeof item.articleData === 'object') {
    const data = item.articleData
    return {
      ...item,
      fields,
      articleData: {
        ...pick(data, ARTICLE_DATA_KEEP),
        // publishReadiness needs to know an article HAS a body and which section
        // kinds are published — never the bodies themselves.
        hasBody: (Array.isArray(data.sections) ? data.sections : []).some((s) => s?.body?.trim() || s?.narrative?.trim()),
        publishedSectionKinds: Array.isArray(data.publishedSections) ? data.publishedSections.map((s) => s?.kind) : undefined,
      },
    }
  }
  return item
}
