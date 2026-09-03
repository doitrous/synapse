/**
 * The pure half of the content client: cache keys and the article back-link map.
 *
 * Split out only because it can then be tested — `contentClient` reaches for
 * `import.meta.env` and localStorage through its imports, neither of which
 * exists under `node --test`. A key that collides across two different scopes
 * would serve one surface another's questions, silently, which is exactly the
 * kind of thing worth a check.
 */
import type { ManagedContentItem } from '@/data/contentControl'

/** One question that names an article, as the library's "test yourself" link needs it. */
export interface QuestionLink { id: string; stem: string }

export interface QuestionScope {
  subject?: string
  module?: string
  topic?: string
  format?: string
  /** A client-side fan-out: the route takes one format, "written" is five. */
  formats?: readonly string[]
}

export function questionsKey(scope: QuestionScope = {}): string {
  const parts = [scope.subject, scope.module, scope.topic, scope.formats?.join('+') ?? scope.format]
  return `content:questions:${parts.map((part) => part ?? '').join('|')}`
}

/** Which questions point at which article. The server sends this; demo mode derives it. */
export function questionLinksFrom(items: readonly ManagedContentItem[]): Record<string, QuestionLink[]> {
  const links: Record<string, QuestionLink[]> = {}
  for (const item of items) {
    if (item.kind !== 'question') continue
    for (const articleId of item.questionData?.libraryIds ?? []) {
      (links[articleId] ??= []).push({ id: item.id, stem: item.title })
    }
  }
  return links
}
