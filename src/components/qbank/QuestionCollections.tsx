import { Eye, Flag, Play, Target, XCircle, CircleDashed, type LucideIcon } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import type { Question } from '@/data/qbank'
import { useT } from '@/lib/i18n'

export interface Collection {
  key: 'flagged' | 'incorrect' | 'omitted'
  title: string
  icon: LucideIcon
  /** What fills this list, said plainly when it is empty. */
  empty: string
  questions: Question[]
}

/**
 * The three lists worth coming back to.
 *
 * Each offers the same three things, because they are three different
 * questions a student asks about the same set: what is in it, can I sit it, and
 * what else is there like it. "Test this scope" is the third — the topics those
 * questions came from, including material the student has not seen.
 */
export function QuestionCollections({
  collections,
  onView,
  onTestThese,
  onTestScope,
}: {
  collections: Collection[]
  onView: (questions: Question[]) => void
  // The title travels with the questions so the sitting can be named after the
  // list it came from. Started without one, these landed in the history as
  // "Untitled test" — the very thing naming a sitting up front exists to stop.
  onTestThese: (questions: Question[], title: string) => void
  onTestScope: (questions: Question[], title: string) => void
}) {
  const t = useT()
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {collections.map((collection) => (
        <Panel key={collection.key} className="flex h-full flex-col">
          <PanelHeader
            title={collection.title}
            icon={collection.icon}
            hint={<span className="tnum font-mono text-[12px] text-ink-2">{collection.questions.length}</span>}
          />
          <div className="flex flex-1 flex-col justify-between gap-4 p-5">
            {collection.questions.length === 0 ? (
              <p className="text-[12.5px] leading-relaxed text-ink-3">{collection.empty}</p>
            ) : (
              <ul className="space-y-1.5">
                {collection.questions.slice(0, 3).map((question) => (
                  <li key={question.id} className="truncate text-[12.5px] text-ink-2">{question.stem}</li>
                ))}
                {collection.questions.length > 3 && (
                  <li className="text-[12px] text-ink-3">
                    {t('and')} {collection.questions.length - 3} {t('more')}
                  </li>
                )}
              </ul>
            )}
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" size="sm" iconLeft={Eye} disabled={!collection.questions.length} onClick={() => onView(collection.questions)}>
                {t('View')}
              </Button>
              <Button variant="secondary" size="sm" iconLeft={Play} disabled={!collection.questions.length} onClick={() => onTestThese(collection.questions, collection.title)}>
                {t('Test these')}
              </Button>
              <Button variant="secondary" size="sm" iconLeft={Target} disabled={!collection.questions.length} onClick={() => onTestScope(collection.questions, collection.title)}>
                {t('Test this scope')}
              </Button>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  )
}

/** The icons the Question Bank passes in, kept beside the component that uses them. */
export const COLLECTION_ICONS = { flagged: Flag, incorrect: XCircle, omitted: CircleDashed }
