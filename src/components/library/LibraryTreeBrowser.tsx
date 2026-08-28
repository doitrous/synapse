import { useMemo, useState } from 'react'
import { FolderTree } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { usePersistentState } from '@/lib/usePersistentState'
import { defaultModuleId } from '@/data/universities'
import {
  LIBRARY_TREES_STATE_KEY, emptyLibraryTrees, treeScope, allArticleIds,
  type LibraryTreeKind, type LibraryTreeNode, type LibraryTreesDocument,
} from '@/data/libraryTrees'

interface Choice { key: string; label: string }

/**
 * The library as a faculty arranged it, for one module or one year.
 *
 * Independent of the generated taxonomy by design: a heading here is whatever
 * the department calls it, at whatever depth they teach it. An article filed
 * here also still appears under Systems — a tree is an additional placement,
 * not a move, so an empty one hides nothing.
 *
 * A module (or year) that resolves to zero published articles is left off the
 * list entirely — there is nothing a student could open there, and an empty
 * branch just to say so reads as broken rather than unwritten. `articleIds`
 * that no longer resolve to a published title (already dropped per-article
 * further down, in `TreeBranch`) do not count towards "has something".
 */
export function LibraryTreeBrowser({ kind = 'module', selectedArticleId, onArticleSelect, articleTitles }: {
  kind?: LibraryTreeKind
  selectedArticleId?: string
  onArticleSelect: (articleId: string) => void
  /** Published article titles by id, so an unpublished filing renders as nothing. */
  articleTitles: Map<string, string>
}) {
  const t = useT()
  const identity = useIdentity()
  const [catalogue] = useUniversityCatalogue()
  const [document] = usePersistentState<LibraryTreesDocument>(LIBRARY_TREES_STATE_KEY, emptyLibraryTrees)
  const [chosen, setChosen] = useState<string | null>(null)

  /** Whether a scope's tree resolves to at least one article this student can read. */
  const hasReadableContent = (key: string) => allArticleIds(document.trees[key] ?? []).some((id) => articleTitles.has(id))

  /**
   * The university/year this student is registered in, resolved once so the
   * two failure modes below — "we don't know your cohort" and "your cohort
   * has nothing published yet" — can be told apart and worded differently.
   */
  const scope = useMemo(() => {
    const university = catalogue.find((item) => item.id === identity.audience.universityId)
    const year = university?.years.find((item) => item.year === identity.audience.year || item.id === identity.audience.yearId)
    return { university, year }
  }, [catalogue, identity.audience])

  /**
   * What this student can open.
   *
   * Module and year trees are scoped to the university/year on the account.
   * If that scope is missing, this view says so instead of showing another
   * cohort's material.
   */
  const choices = useMemo<Choice[]>(() => {
    const { university, year } = scope
    if (!university || !year) return []
    if (kind === 'year') {
      const key = treeScope('year', year.id)
      return hasReadableContent(key) ? [{ key, label: `${university.short} · ${year.year}` }] : []
    }
    const out: Choice[] = []
    year.courses.forEach((course, index) => {
      const moduleId = course.moduleId ?? defaultModuleId(course.name, index + 1)
      const key = treeScope('module', moduleId)
      if (hasReadableContent(key)) out.push({ key, label: course.name })
    })
    return out.sort((a, b) => a.label.localeCompare(b.label))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, kind, document, articleTitles])

  const active = chosen && choices.some((choice) => choice.key === chosen) ? chosen : choices[0]?.key ?? null
  const nodes = active ? document.trees[active] ?? null : null

  if (!scope.university || !scope.year) {
    return <p className="px-2 py-6 text-center text-[12px] leading-relaxed text-ink-3">{t('Choose your university and year in Account to see module and year library trees.')}</p>
  }
  if (choices.length === 0) {
    return <p className="px-2 py-6 text-center text-[12px] leading-relaxed text-ink-3">{t('Nothing has been published for your modules yet. Check back soon.')}</p>
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        {choices.map((choice) => (
          <button
            key={choice.key}
            type="button"
            onClick={() => setChosen(choice.key)}
            className={cn(
              'block w-full truncate rounded-md px-2 py-1.5 text-start text-[12px]',
              choice.key === active ? 'bg-primary-tint font-semibold text-primary-strong' : 'text-ink-2 hover:bg-inset',
            )}
          >
            {choice.label}
          </button>
        ))}
      </div>

      <div className="border-t border-line pt-3">
        {!nodes || nodes.length === 0 ? (
          // Said plainly, because an empty list reads as broken and this is not.
          <p className="flex items-start gap-2 px-2 py-4 text-[12px] leading-relaxed text-ink-3">
            <Icon icon={FolderTree} size={14} className="mt-0.5 shrink-0" />
            {t('No structure has been built for this yet. Everything published is still in Systems & General.')}
          </p>
        ) : (
          <TreeBranch nodes={nodes} depth={0} selectedArticleId={selectedArticleId} onArticleSelect={onArticleSelect} articleTitles={articleTitles} />
        )}
      </div>
    </div>
  )
}

function TreeBranch({ nodes, depth, selectedArticleId, onArticleSelect, articleTitles }: {
  nodes: LibraryTreeNode[]
  depth: number
  selectedArticleId?: string
  onArticleSelect: (articleId: string) => void
  articleTitles: Map<string, string>
}) {
  return (
    <ul className={depth > 0 ? 'ms-2 border-s border-line ps-2' : ''}>
      {nodes.map((node) => (
        <li key={node.id} className="mt-1.5">
          <p className={cn('px-2 py-1 text-ink', depth === 0 ? 'text-[12.5px] font-semibold' : 'text-[12px] font-medium')}>
            {node.title}
          </p>
          {(node.articleIds ?? []).map((articleId) => {
            const title = articleTitles.get(articleId)
            // A filed article that no longer resolves is not published; saying
            // nothing is right for a student, who cannot act on it either way.
            if (!title) return null
            return (
              <button
                key={articleId}
                type="button"
                onClick={() => onArticleSelect(articleId)}
                className={cn(
                  'block w-full truncate rounded-md px-2 py-1.5 text-start text-[12px]',
                  selectedArticleId === articleId ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset',
                )}
              >
                {title}
              </button>
            )
          })}
          {node.children && node.children.length > 0 && (
            <TreeBranch nodes={node.children} depth={depth + 1} selectedArticleId={selectedArticleId} onArticleSelect={onArticleSelect} articleTitles={articleTitles} />
          )}
        </li>
      ))}
    </ul>
  )
}
