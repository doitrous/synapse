import { useState } from 'react'
import { FolderTree } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { useModuleLibraryContent } from '@/lib/useModuleLibraryContent'

/**
 * The library as the viewer's own curriculum covers it: one entry per module
 * on their year, each holding whatever published articles the admin
 * Curriculum dialog has attached to it.
 *
 * This used to read a separate, hand-curated tree document
 * (`nishany-library-trees-v1`) that a faculty filed articles into by hand —
 * a second, mostly-empty source of truth sitting beside the real one. Every
 * module a student is actually enrolled in already carries its coverage
 * through `useModuleLibraryContent` (curriculum coverage, the same source the
 * admin dialog edits and the qbank chooser reads), so that is read directly
 * instead. Curriculum coverage is now the *only* source for this view: a
 * module with nothing covered says so rather than falling back to the old
 * document, and every module the student is enrolled in is listed — even the
 * ones with nothing published yet — because the list itself is the student's
 * timetable, not a index of what happens to have content.
 */
export function LibraryTreeBrowser({ selectedArticleId, onArticleSelect }: {
  selectedArticleId?: string
  onArticleSelect: (articleId: string) => void
}) {
  const t = useT()
  const identity = useIdentity()
  const { groups, availability } = useModuleLibraryContent(identity.audience.universityId, identity.audience.yearId)
  const [chosen, setChosen] = useState<string | null>(null)

  const active = chosen && groups.some((group) => group.moduleId === chosen) ? chosen : groups[0]?.moduleId ?? null
  const activeGroup = groups.find((group) => group.moduleId === active) ?? null

  // Not yet known which university/year to read — never someone else's cohort.
  if (!identity.audienceSettled) return <ModuleListSkeleton />
  if (identity.audienceUnknown) {
    return <p className="px-2 py-6 text-center text-[12px] leading-relaxed text-ink-3">{t('Choose your university and year in Account to see your modules.')}</p>
  }

  if (availability.kind === 'loading') return <ModuleListSkeleton />
  if (availability.kind === 'error') {
    return (
      <CatalogueUnavailable
        availability={availability}
        empty={{
          title: t('No articles have been published yet'),
          description: t('Your library is being written. Reviewed articles will appear here as they are published.'),
        }}
      />
    )
  }

  // Empty coverage is a valid, ordinary state — not an error — whether the
  // whole library has nothing published yet (`availability.kind === 'empty'`)
  // or this cohort simply has no modules on file. Either way the per-module
  // list below already says so, module by module, without treating it as a
  // fault.
  if (groups.length === 0) {
    return <p className="px-2 py-6 text-center text-[12px] leading-relaxed text-ink-3">{t('No modules are set up for your year yet.')}</p>
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1" role="tablist" aria-label={t('Your modules')}>
        {groups.map((group) => (
          <button
            key={group.moduleId}
            type="button"
            role="tab"
            aria-selected={group.moduleId === active}
            onClick={() => setChosen(group.moduleId)}
            className={cn(
              'flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-start text-[12px]',
              group.moduleId === active ? 'bg-primary-tint font-semibold text-primary-strong' : 'text-ink-2 hover:bg-inset',
            )}
          >
            <span className="truncate">{group.moduleName}</span>
            <span className="tnum shrink-0 font-mono text-[10.5px] text-ink-3">{group.articles.length}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-line pt-3">
        {!activeGroup || activeGroup.articles.length === 0 ? (
          // Said plainly, because an empty list reads as broken and this is not.
          <p className="flex items-start gap-2 px-2 py-4 text-[12px] leading-relaxed text-ink-3">
            <Icon icon={FolderTree} size={14} className="mt-0.5 shrink-0" />
            {t('Nothing has been published for this module yet. Check back soon.')}
          </p>
        ) : (
          <ul>
            {activeGroup.articles.map((article) => (
              <li key={article.id} className="mt-1 first:mt-0">
                <button
                  type="button"
                  onClick={() => onArticleSelect(article.id)}
                  className={cn(
                    'block w-full truncate rounded-md px-2 py-1.5 text-start text-[12px]',
                    selectedArticleId === article.id ? 'bg-primary-tint text-primary-strong' : 'text-ink-2 hover:bg-inset',
                  )}
                >
                  {article.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/** Placeholder rows shown while the viewer's audience or their coverage is still resolving. */
function ModuleListSkeleton() {
  return (
    <div className="space-y-1.5" aria-hidden="true">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="h-8 animate-pulse rounded-md bg-inset motion-reduce:animate-none" />
      ))}
    </div>
  )
}
