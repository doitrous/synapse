import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  CalendarRange,
  Layers,
  LifeBuoy,
  Search,
  Target,
  UserCog,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { BoxTabs, boxTabId } from '@/components/ui/BoxTabs'
import { SearchInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { TopicIndex } from '@/components/tutorial/TopicIndex'
import { TopicReader } from '@/components/tutorial/TopicReader'
import { usePersistentState } from '@/lib/usePersistentState'
import { isEditableTarget } from '@/lib/shortcuts/keys'
import { useT } from '@/lib/i18n'
import {
  TUTORIAL_HUBS,
  TUTORIAL_READ_STATE_KEY,
  TUTORIAL_TOPICS,
  TUTORIAL_VIDEOS_STATE_KEY,
  matchesTutorialQuery,
  readTutorialHub,
  tutorialTopicsByHub,
  type TutorialHub,
  type TutorialVideoMap,
} from '@/data/tutorials'

/**
 * The guide, in the shape of the app it explains.
 *
 * It used to be twenty-seven stacked rows, each with a dashed grey rectangle
 * where a video will one day be — a page that read as a list of things that are
 * missing. It is a two-pane reference now: the sidebar's own seven destinations
 * as a row of boxes (the Question Bank's bank selector, which is the selector
 * shape across the app), the chosen one's topics as a short index, and one
 * topic open beside it. Hub and topic both live in the URL, so the dashboard's
 * tutorial card — and any link pasted into a group chat — can open the page on
 * the exact topic it is about.
 */

/**
 * The search field is reached by id rather than by ref: `SearchInput` is typed
 * as plain input attributes and takes no ref, and giving the shared field one
 * is not this page's change to make.
 */
const SEARCH_ID = 'tutorial-search'

/** The hub row and the panel it switches, wired together by `aria-controls`. */
const HUB_TABS_ID = 'tutorial-hubs'
const INDEX_ID = 'tutorial-index'

const HUB_ICON: Record<TutorialHub, LucideIcon> = {
  // The sidebar's own glyphs, so the row reads as the sidebar it mirrors.
  'getting-started': LifeBuoy,
  plan: CalendarRange,
  learn: BookOpen,
  practice: Target,
  revise: Layers,
  together: Users,
  account: UserCog,
}

export function Tutorial() {
  const t = useT()
  const [videos] = usePersistentState<TutorialVideoMap>(TUTORIAL_VIDEOS_STATE_KEY, {})
  const [readIds, setReadIds] = usePersistentState<string[]>(TUTORIAL_READ_STATE_KEY, [])
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const readerRef = useRef<HTMLElement>(null)

  const trimmed = query.trim()
  const searching = trimmed !== ''

  // A named topic decides the hub: a deep link says `?topic=qbank`, and the
  // Practice box is the one that should be lit when it opens. `?hub=` is what a
  // plain browse carries, and an unknown one falls back rather than emptying
  // the page.
  const topicFromUrl = TUTORIAL_TOPICS.find((topic) => topic.id === params.get('topic'))
  const hub = topicFromUrl?.hub ?? readTutorialHub(params.get('hub'), 'getting-started')
  // One source of truth for what is lit: browsing, it is the open topic's own
  // hub; searching, *nothing* is, because the list below is drawn from every
  // hub and a box claiming to be selected over it would be claiming something
  // untrue — audibly so, since `aria-selected` is what a screen reader reads.
  // Clearing the query lights the open topic's hub again, with no state to
  // restore, because the hub was never anything but a function of the URL.
  const litHub = searching ? null : hub

  const matches = useMemo(
    () => (searching ? TUTORIAL_TOPICS.filter((topic) => matchesTutorialQuery(topic, trimmed, t)) : []),
    [searching, trimmed, t],
  )
  const listed = searching ? matches : tutorialTopicsByHub(hub)
  // The reader holds whatever `?topic=` names, through a search and out the
  // other side: typing does not take the article you were reading away from
  // you, and picking a match is what replaces it.
  const selected = topicFromUrl ?? listed[0]

  // While a search is typed the boxes count matches instead of topics, so the
  // row says where the answer is as well as switching between sections.
  const hubItems = useMemo(() => {
    const pool = searching ? matches : TUTORIAL_TOPICS
    return TUTORIAL_HUBS.map((entry) => ({
      value: entry.id,
      label: t(entry.label),
      icon: HUB_ICON[entry.id],
      count: pool.filter((topic) => topic.hub === entry.id).length,
    }))
  }, [searching, matches, t])

  const hasVideo = useCallback((topicId: string) => (videos[topicId] ?? '').trim() !== '', [videos])

  // `replace`, not `push`, throughout: one guide is one destination, and a Back
  // button that walks a student back through every topic they glanced at is a
  // Back button that no longer leaves the guide. Deep links still work, because
  // the URL is written either way.
  const chooseTopic = useCallback((topicId: string) => {
    setParams((current) => {
      const next = new URLSearchParams(current)
      next.set('topic', topicId)
      // The topic carries its own hub, so keeping `?hub=` beside it would only
      // let the two disagree.
      next.delete('hub')
      return next
    }, { replace: true })
    // Below `lg` the reader sits *under* the index, so choosing a topic there
    // has to move the reader to it or the page looks like nothing happened.
    if (typeof window !== 'undefined' && !window.matchMedia('(min-width: 1024px)').matches) {
      readerRef.current?.focus()
    }
  }, [setParams])

  // Choosing a section is a decision to browse rather than to search, so it
  // clears the query: leaving it typed would show a hub whose list is still
  // every hub's matches.
  const chooseHub = useCallback((nextHub: string) => {
    setQuery('')
    setParams((current) => {
      const next = new URLSearchParams(current)
      next.set('hub', nextHub)
      next.delete('topic')
      return next
    }, { replace: true })
  }, [setParams])

  const toggleRead = useCallback(() => {
    if (!selected) return
    setReadIds((current) => (
      current.includes(selected.id)
        ? current.filter((id) => id !== selected.id)
        : [...current, selected.id]
    ))
  }, [selected, setReadIds])

  // A parameter that names nothing is dropped rather than left in the address
  // bar: the page already falls back to Getting started · Dashboard, but a URL
  // that keeps `?topic=zzz` is a URL that says something other than what is on
  // screen, and it is the one that gets re-shared.
  useEffect(() => {
    const rawTopic = params.get('topic')
    const rawHub = params.get('hub')
    const knownTopic = rawTopic !== null && TUTORIAL_TOPICS.some((topic) => topic.id === rawTopic)
    const staleTopic = rawTopic !== null && !knownTopic
    // A valid topic names its own hub, so any `hub` beside it is noise.
    const staleHub = rawHub !== null && (knownTopic || !TUTORIAL_HUBS.some((entry) => entry.id === rawHub))
    if (!staleTopic && !staleHub) return
    setParams((current) => {
      const next = new URLSearchParams(current)
      if (staleTopic) next.delete('topic')
      if (staleHub) next.delete('hub')
      return next
    }, { replace: true })
  }, [params, setParams])

  // `/` is the search shortcut everywhere else on the web. This page has no
  // command registry of its own, so it is one listener, and it stands aside
  // whenever the keystroke belongs to a field — or to a dialog over the page,
  // since focus must not be pulled out from under an open ⌘K palette.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      if (isEditableTarget(event.target as HTMLElement | null)) return
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return
      event.preventDefault()
      document.getElementById(SEARCH_ID)?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const showIndex = listed.length > 0
  const index = selected ? listed.findIndex((topic) => topic.id === selected.id) : -1
  const previous = index > 0 ? listed[index - 1] : undefined
  const next = index >= 0 && index < listed.length - 1 ? listed[index + 1] : undefined

  return (
    <PageContainer>
      <PageHeader
        title={t('Learn how Nishany works')}
        description={t('A short guide and a short video for every part of the app. Pick a section, then a topic — or search for what you are trying to do.')}
        actions={(
          // The wrapper is what carries the width: `SearchInput` puts its own
          // `div.relative` around the field, and as a flex item that div is
          // shrink-to-fit, so `w-full` on the input alone resolves against a box
          // the input already sized. On a phone the field runs edge to edge.
          <div className="w-full sm:w-72">
            <SearchInput
              id={SEARCH_ID}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('Search the guide…')}
              aria-label={t('Search the guide…')}
              className="w-full"
            />
          </div>
        )}
      />

      <BoxTabs
        id={HUB_TABS_ID}
        className="mb-4"
        label={t('Sections')}
        // Nothing to control while the empty state is up: the panel is not in
        // the document, and an `aria-controls` pointing at a missing id is a
        // promise to AT that cannot be kept.
        controls={showIndex ? INDEX_ID : undefined}
        countUnit={searching ? t('matches') : t('topics')}
        value={litHub}
        onChange={chooseHub}
        items={hubItems}
      />

      {!showIndex || !selected ? (
        <Panel>
          <EmptyState
            icon={Search}
            title={t('Nothing matches that')}
            description={t('Try a different word, or clear the search to see every topic.')}
          />
        </Panel>
      ) : (
        <div className="grid items-start gap-4 lg:grid-cols-[17.5rem_minmax(0,1fr)]">
          <TopicIndex
            id={INDEX_ID}
            labelledBy={litHub ? boxTabId(HUB_TABS_ID, litHub) : undefined}
            label={t('Search results')}
            className="lg:sticky lg:top-4"
            topics={listed}
            selectedId={selected.id}
            onSelect={chooseTopic}
            readIds={readIds}
            hasVideo={hasVideo}
            showHub={searching}
          />
          <TopicReader
            ref={readerRef}
            topic={selected}
            videoUrl={videos[selected.id]}
            isRead={readIds.includes(selected.id)}
            onToggleRead={toggleRead}
            previous={previous}
            next={next}
            onNavigate={chooseTopic}
          />
        </div>
      )}
    </PageContainer>
  )
}
