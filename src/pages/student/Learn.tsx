import { useMemo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ListChecks,
  Flame,
  Compass,
  StickyNote,
  Stethoscope,
  PenLine,
  Layers,
  Gamepad2,
  BookOpen,
  FolderOpen,
  Languages,
  type LucideIcon,
} from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/Icon'
import { useT } from '@/lib/i18n'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { managedDeckToStudentDeck, type StudentDeck } from '@/data/decks'
import { useFlashcards } from '@/lib/useFlashcards'
import { useDueReviewSummary } from '@/components/dashboard/DueReviews'
import { validMiniGamePacks } from '@/data/minigamePacks'

interface LearnCard {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

interface LearnGroup {
  id: string
  label: string
  cards: LearnCard[]
}

const GROUPS: LearnGroup[] = [
  {
    id: 'practice',
    label: 'Practice',
    cards: [
      {
        title: 'Question Bank',
        description: 'Solve past-paper MCQs by chapter or source',
        href: '/app/qbank',
        icon: ListChecks,
      },
      {
        title: 'Question of the Day',
        description: 'One daily question, building a personal streak',
        href: '/app/qotd',
        icon: Flame,
      },
      {
        title: 'Adaptive Study',
        description: 'A personalised set that targets your weak spots',
        href: '/app/adaptive',
        icon: Compass,
      },
      {
        title: 'Question Notes',
        description: 'Your notes from questions in the Question Bank',
        href: '/app/question-notes',
        icon: StickyNote,
      },
    ],
  },
  {
    id: 'hands-on',
    label: 'Hands-on',
    cards: [
      {
        title: 'Practical',
        description: 'OSCE stations, spot diagnosis, and image questions',
        href: '/app/practical',
        icon: Stethoscope,
      },
      {
        title: 'Essay questions',
        description: 'Write full answers, then mark against key points',
        href: '/app/essays',
        icon: PenLine,
      },
    ],
  },
  {
    id: 'memorise',
    label: 'Memorise',
    cards: [
      {
        title: 'Flashcards',
        description: 'Spaced repetition so hard facts actually stick',
        href: '/app/flashcards',
        icon: Layers,
      },
      {
        title: 'Minigames',
        description: 'Quick matching and recall games between sessions',
        href: '/app/minigames',
        icon: Gamepad2,
      },
    ],
  },
  {
    id: 'read',
    label: 'Read',
    cards: [
      {
        title: 'Library',
        description: 'Every book and guideline, organised by subject',
        href: '/app/library',
        icon: BookOpen,
      },
      {
        title: 'Resources',
        description: 'Files, videos, and uploads in one place',
        href: '/app/resources',
        icon: FolderOpen,
      },
      {
        title: 'Medical Taxonomy',
        description: 'Look up terms and how concepts connect',
        href: '/app/taxonomy',
        icon: Languages,
      },
    ],
  },
]

/** One card in the grid — the whole surface is the link. */
function CardLink({ card, stat }: { card: LearnCard; stat: ReactNode }) {
  const t = useT()
  return (
    <Link
      to={card.href}
      className="group min-h-11 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
    >
      <Panel className="flex h-full flex-col gap-3 p-4 transition-[border-color,background-color,transform] group-hover:border-line-2 group-hover:bg-surface-2 group-active:translate-y-px">
        <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-primary-strong">
          <Icon icon={card.icon} size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[16px] font-semibold text-ink">{t(card.title)}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{t(card.description)}</p>
        </div>
        {stat && <p className="text-[12px] font-medium text-primary-strong">{stat}</p>}
      </Panel>
    </Link>
  )
}

/**
 * The Learn hub — every way to study, gathered under four intents.
 *
 * The old sidebar held nine separate "Study" destinations plus Flashcards and
 * Minigames in "Workspace" — eleven flat entries with no relationship between
 * them. This groups them by what a student is trying to do (practice
 * questions, work hands-on, memorise, or read), so choosing where to study
 * starts from intent rather than from a feature name. Every route it links to
 * already existed; nothing here reads or writes new data — the two stat lines
 * reuse hooks the Dashboard and Flashcards tab already call.
 */
export function Learn() {
  const t = useT()

  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const providedDecks: StudentDeck[] = useMemo(
    () =>
      ledger
        .filter((item) => item.kind === 'deck')
        .map(managedDeckToStudentDeck)
        .filter((deck): deck is StudentDeck => deck !== null),
    [ledger],
  )
  const flashcardsApi = useFlashcards(providedDecks)
  const flashcardsDue = useMemo(
    () => flashcardsApi.decks.reduce((sum, deck) => sum + deck.counts.reviewDue, 0),
    [flashcardsApi.decks],
  )

  const { count: conceptsDue } = useDueReviewSummary()
  const authoredPackCount = validMiniGamePacks().length

  const stats: Record<string, ReactNode> = {
    'Adaptive Study': conceptsDue > 0 ? (
      <><span className="tnum">{conceptsDue}</span> {t('Due for review')}</>
    ) : undefined,
    Flashcards: flashcardsDue > 0 ? (
      <><span className="tnum">{flashcardsDue}</span> {t('Due for review')}</>
    ) : undefined,
    Minigames: authoredPackCount > 0 ? (
      <><span className="tnum">{authoredPackCount}</span> {t('authored packs ready')}</>
    ) : undefined,
  }

  return (
    <PageContainer>
      <PageHeader title={t('Learn')} description={t('Every way to study, in one place.')} />

      {/* Sticky chip row: the grid below never loses its bearings, wherever
          the page has scrolled to — one tap gets back to any group. */}
      <nav
        aria-label={t('Jump to a group')}
        className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-20 -mx-3 mb-5 flex gap-2 overflow-x-auto border-b border-line bg-paper px-3 py-2.5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {GROUPS.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            className="inline-flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-full border border-line px-3 text-[12.5px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
          >
            {t(group.label)}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top)+3.25rem)]">
            <h2 className="mb-3 text-[12.5px] font-bold uppercase tracking-[0.08em] text-ink-3">
              {t(group.label)}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {group.cards.map((card) => (
                <CardLink key={card.href} card={card} stat={stats[card.title]} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageContainer>
  )
}
