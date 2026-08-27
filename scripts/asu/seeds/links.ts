/**
 * Copied from `scripts/kasr/seeds/links.ts` unchanged in logic — only the
 * output-directory constant moved to Ain Shams's own tree. This file was
 * already module-generic (it takes `module` as a string and slugifies it),
 * so nothing else needed to change.
 *
 * What each concept points at: its article, its claim, and the source it was read from.
 *
 * These three are what take a concept from `medical:batch` clean to
 * `medical:audit` clean. `articleIds`, `resourceIds` and `atomicClaimIds` are
 * all on `conceptPopulated`, so all three must carry a value, and every value
 * must resolve — the article against an article record, the resource against
 * the evidence store, the claim against a claim record.
 *
 * They are computed here rather than written into the seed file on purpose. A
 * seed file says what the paper asked; who teaches it and what supports it is a
 * separate decision, made once per chapter rather than once per question, and
 * mixing them means a seed has to be edited whenever an article is renamed.
 *
 * The article dependency is stricter than it first looks. `validate-content-
 * batch.mjs` checks coverage **from the concept's side**: it is not enough for
 * an article to list the concept, the concept must list the article in its own
 * `articleIds`. So concepts, articles and questions are one authoring set and
 * cannot be done as three phases.
 */
import { existsSync, readFileSync } from 'node:fs'

/** Where a module's article batches live. Named by convention, not by a registry. */
const ARTICLE_BATCHES = (slug: string) => [
  `docs/Ain-Shams-Source-Imports/article/${slug}-biochemistry.md`,
  `docs/Ain-Shams-Source-Imports/article/${slug}-physiology.md`,
  `docs/Ain-Shams-Source-Imports/article/${slug}-anatomy.md`,
  `docs/Ain-Shams-Source-Imports/article/${slug}-histology.md`,
]

export interface ConceptLinks {
  articleId?: string
  /**
   * Articles that discuss this concept without owning it.
   *
   * Distinct from `articleId`, which is what teaches it, and **required to
   * carry a value** — `relatedArticleIds` is on `conceptPopulated` in the
   * audit, so an empty list is a failure rather than an honest blank.
   *
   * Not invented to satisfy that. Taken from the `related_articles` the article
   * authors actually wrote: if the Enzymes article says the Nucleic Acids
   * article is related, then a concept the Enzymes article teaches is genuinely
   * discussed by the Nucleic Acids one, and the cross-reference already carries
   * a sentence saying why. Deriving it from what an author wrote keeps the
   * field meaning what its name says.
   */
  relatedArticleIds: string[]
  claimIds: string[]
  resourceIds: string[]
}

interface ArticlePlanEntry {
  articleId: string
  sourceId?: string
  concepts: { id: string }[]
}

interface ClaimPlanEntry {
  conceptId: string
  claimId: string
  sourceId: string
}

/**
 * The links for one module, keyed by concept ID.
 *
 * Missing plan files are not an error. A module part-way through its first pass
 * has concepts before it has articles, and failing here would stop the concept
 * batch being generated at all — which is the batch you need in order to write
 * the articles. The emitter records the gap as an authoring error in
 * `field_notes` instead, where it is visible and does not block the work.
 */
export function loadLinks(module: string): Map<string, ConceptLinks> {
  const slug = module.replace(/\s+/g, '-')
  const stage = `scripts/asu/extract/${slug}`
  const links = new Map<string, ConceptLinks>()

  const get = (conceptId: string): ConceptLinks => {
    const held = links.get(conceptId)
    if (held) return held
    const fresh: ConceptLinks = { relatedArticleIds: [], claimIds: [], resourceIds: [] }
    links.set(conceptId, fresh)
    return fresh
  }

  const articlePlan = `${stage}/article-plan.json`
  if (existsSync(articlePlan)) {
    for (const entry of JSON.parse(readFileSync(articlePlan, 'utf8')) as ArticlePlanEntry[]) {
      for (const concept of entry.concepts) {
        const link = get(concept.id)
        link.articleId = entry.articleId
        if (entry.sourceId && !link.resourceIds.includes(entry.sourceId)) {
          link.resourceIds.push(entry.sourceId)
        }
      }
    }
  }

  // The cross-references the article authors wrote, read back out of the
  // batches themselves rather than from a plan — the plan says which article
  // teaches a concept; only the article says which of its neighbours discuss it.
  const relatedByArticle = new Map<string, string[]>()
  for (const file of ARTICLE_BATCHES(slug)) {
    if (!existsSync(file)) continue
    const text = readFileSync(file, 'utf8')
    for (const record of text.split(/^# Item$/m).slice(1)) {
      const id = record.match(/^## id\n(.+)$/m)?.[1]?.trim()
      const block = record.match(/^## related_articles\n([\s\S]*?)(?=\n## |\n---|$)/m)?.[1] ?? ''
      if (!id) continue
      // `related_articles` is a prose list — one per line, `ARTICLE-ID: why`.
      // Splitting on `|` or `;` here would cut a reason in half.
      const ids = block.split('\n')
        .map((line) => line.split(':')[0].trim())
        .filter((one) => /^ART-/.test(one))
      if (ids.length) relatedByArticle.set(id, ids)
    }
  }
  for (const [, link] of links) {
    if (!link.articleId) continue
    link.relatedArticleIds = relatedByArticle.get(link.articleId) ?? []
  }

  const claimPlan = `${stage}/claim-plan.json`
  if (existsSync(claimPlan)) {
    for (const entry of JSON.parse(readFileSync(claimPlan, 'utf8')) as ClaimPlanEntry[]) {
      const link = get(entry.conceptId)
      if (!link.claimIds.includes(entry.claimId)) link.claimIds.push(entry.claimId)
      if (entry.sourceId && !link.resourceIds.includes(entry.sourceId)) {
        link.resourceIds.push(entry.sourceId)
      }
    }
  }

  return links
}

/**
 * Claims the evidence pass could not support, and must not be pointed at.
 *
 * Some concepts come off an exam question that the department book does not
 * cover — the paper asks something the book never states. The evidence pass
 * reports those rather than quoting a nearby passage that nearly fits, and the
 * claim is then never written. Pointing a concept at it anyway would fail
 * `medical:audit` with `references unknown claim`, and would be a lie besides:
 * the concept would look supported.
 *
 * The file is optional and holds claim IDs, one per line, `#` for comments.
 */
export function unsupportedClaims(module: string): Set<string> {
  const slug = module.replace(/\s+/g, '-')
  const file = `scripts/asu/extract/${slug}/claims-without-a-span.txt`
  if (!existsSync(file)) return new Set()
  return new Set(readFileSync(file, 'utf8')
    .split('\n')
    .map((line) => line.replace(/#.*$/, '').trim())
    .filter(Boolean))
}
