import { useMemo, useState } from 'react'
import { Layers, Plus, Search, BarChart3 } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Tabs } from '@/components/ui/Tabs'
import { IconButton } from '@/components/ui/IconButton'
import { HelpCircle, GraduationCap } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { managedDeckToStudentDeck, type StudentDeck } from '@/data/decks'
import { useFlashcards } from '@/lib/useFlashcards'
import { ShortcutsProvider, useCommands, useOpenShortcutHelp } from '@/lib/shortcuts/useShortcuts'
import type { Command } from '@/lib/shortcuts/registry'
import { DeckDashboard, FlashcardsStatsGate } from '@/components/flashcards/DeckDashboard'
import { StudyScreen } from '@/components/flashcards/StudyScreen'
import { AddView } from '@/components/flashcards/AddView'
import { BrowseView } from '@/components/flashcards/BrowseView'
import { StatsView } from '@/components/flashcards/StatsView'
import { FlashcardsGuide } from '@/components/flashcards/FlashcardsGuide'

/**
 * The Flashcards tab: four coordinated views over one persisted collection.
 *
 * Decks, Add, Browse and Stats are sub-views of a single feature, switched by
 * in-component state (the house pattern the old DeckList↔CardRunner used), so
 * navigating between them never loses a draft or a scroll position. Everything
 * reads and writes through one `useFlashcards` hook; the catalogue is joined in
 * here so a published deck studies exactly like an authored one. The whole tab
 * sits inside a ShortcutsProvider, so the command registry is live across every
 * view and study.
 */

export type FlashcardsView = 'decks' | 'add' | 'browse' | 'stats'

export function Flashcards() {
  return (
    <ShortcutsProvider>
      <FlashcardsShell />
    </ShortcutsProvider>
  )
}

function FlashcardsShell() {
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

  const api = useFlashcards(providedDecks)
  const [view, setView] = useState<FlashcardsView>('decks')
  const [studyDeckId, setStudyDeckId] = useState<string | null>(null)
  const [addDeckId, setAddDeckId] = useState<string | undefined>(undefined)
  const [editNoteId, setEditNoteId] = useState<string | undefined>(undefined)
  const openHelp = useOpenShortcutHelp()
  const [guideOpen, setGuideOpen] = useState(false)

  // Open the Add view either fresh (optionally into a deck) or editing a note.
  const openAdd = (opts: { deckId?: string; noteId?: string } = {}) => {
    setStudyDeckId(null)
    setAddDeckId(opts.deckId)
    setEditNoteId(opts.noteId)
    setView('add')
  }

  // Global two-key navigation chords (G then D/A/B/S) and Cmd/Ctrl+N to add.
  const navCommands = useMemo<Command[]>(
    () => [
      { id: 'nav.decks', title: 'Go to Decks', group: 'Navigation', scopes: ['global'], keys: { seq: ['G', 'D'] }, run: () => setView('decks') },
      { id: 'nav.add', title: 'Go to Add', group: 'Navigation', scopes: ['global'], keys: { seq: ['G', 'A'] }, run: () => openAdd() },
      { id: 'nav.browse', title: 'Go to Browse', group: 'Navigation', scopes: ['global'], keys: { seq: ['G', 'B'] }, run: () => setView('browse') },
      { id: 'nav.stats', title: 'Go to Stats', group: 'Navigation', scopes: ['global'], keys: { seq: ['G', 'S'] }, run: () => setView('stats') },
      { id: 'nav.new', title: 'Add a new card', group: 'Navigation', scopes: ['global'], keys: 'Mod+N', run: () => openAdd() },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  useCommands(navCommands)

  // Study takes over the whole surface, like the old runner.
  if (studyDeckId) {
    return (
      <StudyScreen
        api={api}
        deckId={studyDeckId}
        onExit={() => setStudyDeckId(null)}
        onNavigate={(next) => { setStudyDeckId(null); setView(next) }}
        onEditNote={(noteId) => openAdd({ noteId })}
      />
    )
  }

  const tabs = [
    { value: 'decks', label: t('Decks'), icon: Layers },
    { value: 'add', label: t('Add'), icon: Plus },
    { value: 'browse', label: t('Browse'), icon: Search },
    { value: 'stats', label: t('Stats'), icon: BarChart3 },
  ]

  return (
    <PageContainer>
      <PageHeader
        title={t('Flashcards')}
        description={t('Build, study and track your cards — spaced repetition on Anki’s own schedule.')}
        actions={
          <div className="flex items-center gap-1">
            <IconButton icon={GraduationCap} label={t('How to use Flashcards')} size="sm" onClick={() => setGuideOpen(true)} />
            <IconButton icon={HelpCircle} label={t('Keyboard shortcuts')} size="sm" onClick={openHelp} />
          </div>
        }
      />

      <Tabs items={tabs} value={view} onChange={(next) => setView(next as FlashcardsView)} className="mb-5" />

      {view === 'decks' && (
        <DeckDashboard
          api={api}
          onStudy={(deckId) => setStudyDeckId(deckId)}
          onAddToDeck={(deckId) => { setAddDeckId(deckId); setView('add') }}
        />
      )}
      {view === 'add' && (
        <AddView
          key={editNoteId ?? 'new'}
          api={api}
          initialDeckId={addDeckId}
          editNoteId={editNoteId}
          onDone={() => { setEditNoteId(undefined); setView(editNoteId ? 'browse' : 'decks') }}
        />
      )}
      {view === 'browse' && <BrowseView api={api} onAdd={() => openAdd()} onEditNote={(noteId) => openAdd({ noteId })} />}
      {/* Omar: the flashcards Stats tab is coming soon — the whole tab sits behind
          the gate, preview included. Study Rhythm itself is live, on the deck views. */}
      {view === 'stats' && <FlashcardsStatsGate><StatsView api={api} /></FlashcardsStatsGate>}

      {guideOpen && <FlashcardsGuide onClose={() => setGuideOpen(false)} />}
    </PageContainer>
  )
}
