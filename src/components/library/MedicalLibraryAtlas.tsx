import { BookOpen } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { LibraryTreeBrowser } from '@/components/library/LibraryTreeBrowser'
import { useT } from '@/lib/i18n'

/**
 * The student library's one navigator: the modules the faculty teaches,
 * scoped to the student's own university and year.
 *
 * This used to switch between six views — the generated taxonomy (system,
 * discipline, skills, knowledge), plus module and year — with a landing page
 * offering all six as an entry choice. Module is the only one now: it is the
 * one view that matches the timetable a student is holding, because it is
 * read straight from curriculum coverage (the same admin Curriculum dialog
 * the qbank chooser reads) rather than a generated map. `LibraryTreeBrowser`
 * does the real work (which modules exist, which have anything published);
 * this wraps it in the chrome for the two places it appears.
 */
export function LibraryModuleNav({
  selectedArticleId,
  onArticleSelect,
  variant = 'rail',
}: {
  selectedArticleId?: string
  onArticleSelect: (articleId: string) => void
  /**
   * 'rail': the compact column beside an open article (or the mobile drawer).
   * 'landing': the whole page, with nothing else on screen — this is shown
   * whenever no article is open, so it is the menu itself, never a
   * placeholder pointing at one. A collapsed rail with a blank page beside it
   * cannot happen, because this is what renders instead of that page.
   */
  variant?: 'rail' | 'landing'
}) {
  const t = useT()

  if (variant === 'landing') {
    return (
      <div className="min-h-full bg-paper px-4 py-8 sm:px-7 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-[46rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-line bg-primary-tint/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-primary-strong">
            <Icon icon={BookOpen} size={13} />
            {t('Medical library')}
          </div>
          <h1 className="mt-5 font-serif text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[36px]">{t('Your modules')}</h1>
          <p className="mt-3 max-w-[38rem] text-[14px] leading-relaxed text-ink-2">{t('Reviewed articles, arranged the way your faculty teaches them. Choose a module to start reading.')}</p>
          <div className="mt-7 overflow-hidden rounded-xl border border-line bg-surface p-3 shadow-panel sm:p-4">
            <LibraryTreeBrowser selectedArticleId={selectedArticleId} onArticleSelect={onArticleSelect} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <aside className="flex min-h-0 min-w-0 flex-col border-e border-line bg-surface">
      <div className="border-b border-line px-3 py-2.5">
        <p className="truncate text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Your modules')}</p>
      </div>
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-2">
        <LibraryTreeBrowser selectedArticleId={selectedArticleId} onArticleSelect={onArticleSelect} />
      </div>
    </aside>
  )
}
