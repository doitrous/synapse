import { useMemo, useState } from 'react'
import { Layers, Plus, Search, BarChart3 } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Tabs } from '@/components/ui/Tabs'
import { IconButton } from '@/components/ui/IconButton'
import { HelpCircle } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { managedDeckToStudentDeck, type StudentDeck } from '@/data/decks'
import { useFlashcards } from '@/lib/useFlashcards'
import { ShortcutsProvider, useCommands, useOpenShortcutHelp } from '@/lib/shortcuts/useShortcuts'
import type { Command } from '@/lib/shortcuts/registry'
import { DeckDashboard } from '@/components/flashcards/DeckDashboard'
import { StudyScreen } from '@/components/flashcards/StudyScreen'
import { AddView } from '@/components/flashcards/AddView'
import { BrowseView } from '@/components/flashcards/BrowseView'
import { StatsView } from '@/components/flashcards/StatsView'

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
  const openHelp = useOpenShortcutHelp()

  // Global two-key navigation chords (G then D/A/B/S) and Cmd/Ctrl+N to add.
  const navCommands = useMemo<Command[]>(
    () => [
      { id: 'nav.decks', title: 'Go to Decks', group: 'Navigation', scopes: ['global'], keys: { seq: ['G', 'D'] }, run: () => setView('decks') },
      { id: 'nav.add', title: 'Go to Add', group: 'Navigation', scopes: ['global'], keys: { seq: ['G', 'A'] }, run: () => { setAddDeckId(undefined); setView('add') } },
      { id: 'nav.browse', title: 'Go to Browse', group: 'Navigation', scopes: ['global'], keys: { seq: ['G', 'B'] }, run: () => setView('browse') },
      { id: 'nav.stats', title: 'Go to Stats', group: 'Navigation', scopes: ['global'], keys: { seq: ['G', 'S'] }, run: () => setView('stats') },
      { id: 'nav.new', title: 'Add a new card', group: 'Navigation', scopes: ['global'], keys: 'Mod+N', run: () => { setAddDeckId(undefined); setView('add') } },
    ],
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
        onEditNote={(noteId) => { setStudyDeckId(null); setAddDeckId(undefined); setView('add'); void noteId }}
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
        actions={<IconButton icon={HelpCircle} label={t('Keyboard shortcuts')} size="sm" onClick={openHelp} />}
      />

      <Tabs items={tabs} value={view} onChange={(next) => setView(next as FlashcardsView)} className="mb-5" />

      {view === 'decks' && (
        <DeckDashboard
          api={api}
          onStudy={(deckId) => setStudyDeckId(deckId)}
          onAddToDeck={(deckId) => { setAddDeckId(deckId); setView('add') }}
        />
      )}
      {view === 'add' && <AddView api={api} initialDeckId={addDeckId} onDone={() => setView('decks')} />}
      {view === 'browse' && <BrowseView api={api} onAdd={() => { setAddDeckId(undefined); setView('add') }} />}
      {view === 'stats' && <StatsView api={api} />}
    </PageContainer>
  )
}
