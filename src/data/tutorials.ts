/**
 * The Tutorial catalogue: one slot per platform function, each carrying
 * written instructions (authored here) and a video an admin fills in later.
 *
 * Two groupings sit on every topic. `hub` is the live one: it follows the
 * sidebar a student actually navigates — Getting started, Plan, Library, Tools, Bank,
 * Practice, Minigames, Study Rooms, Account — and is what the Tutorial page's hub row
 * switches between. `area` is the older grouping, kept untouched along with
 * every id for older integrations; the
 * `nishany-tutorial-videos-v1` document is keyed on the ids.
 *
 * Video URLs are admin-authored content that every student must see, so they
 * cannot live in `localStorage` (per-device) or in this static file (a
 * redeploy to change one link). They persist through the same shared-state
 * mechanism as `nishany-notification-campaigns-v1` and
 * `nishany-email-automations-v1`: `usePersistentState` from
 * `@/lib/usePersistentState`, keyed on `TUTORIAL_VIDEOS_STATE_KEY`. That hook
 * is backed by `src/lib/stateStore.ts`, which hydrates from and writes to
 * `/api/state/:key` (MariaDB-backed) in live mode — a shared, unprefixed key
 * (not `nishany.foo.v1`) is treated as platform-wide rather than per-user, so
 * one admin edit reaches every student's session, not just the admin's own
 * browser or device.
 */

export type TutorialArea = 'Getting started' | 'Study' | 'Plan' | 'Workspace' | 'Account'

/** The sidebar destinations the guide is organised by, in sidebar order. */
export type TutorialHub =
  | 'getting-started'
  | 'plan'
  | 'library'
  | 'tools'
  | 'bank'
  | 'practice'
  | 'minigames'
  | 'study-rooms'
  | 'account'

export const TUTORIAL_HUBS: ReadonlyArray<{ id: TutorialHub; label: string }> = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'plan', label: 'Plan' },
  { id: 'library', label: 'Library' },
  { id: 'tools', label: 'Tools' },
  { id: 'bank', label: 'Bank' },
  { id: 'practice', label: 'Practice' },
  { id: 'minigames', label: 'Minigames' },
  { id: 'study-rooms', label: 'Study Rooms' },
  { id: 'account', label: 'Account' },
]

/** One numbered card in the reader: what to do, and the detail behind it. */
export interface TutorialStep {
  title: string
  detail: string
}

export interface TutorialTopic {
  id: string
  label: string
  area: TutorialArea
  hub: TutorialHub
  /**
   * Where the feature itself lives, for the reader's "Open …" link. Left off
   * the few topics that describe a control rather than a page.
   */
  route?: string
  instructions: string
  /**
   * The two or three moves the feature actually takes, shown as numbered cards
   * under the video. Only authored where the steps are worth spelling out; a
   * topic without them simply reads as its paragraph.
   */
  steps?: TutorialStep[]
}

export const TUTORIAL_VIDEOS_STATE_KEY = 'nishany-tutorial-videos-v1'

/**
 * The topics this student has ticked off, as a list of ids.
 *
 * Dotted, so `isUserOwnedState` routes it to the student's own record rather
 * than to the shared catalogue the videos above live in — one document per
 * student, not one for the platform.
 */
export const TUTORIAL_READ_STATE_KEY = 'nishany.tutorial.read.v1'

/** Admin-authored, topic id → video URL (mp4, YouTube, or Vimeo). */
export type TutorialVideoMap = Record<string, string>

export const TUTORIAL_TOPICS: TutorialTopic[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    area: 'Getting started',
    hub: 'getting-started',
    route: '/app',
    instructions:
      "Start on Dashboard for your daily study target, upcoming exam, and recent activity. Plan opens your calendar, Bank opens the question bank, and Tools holds your study materials. The calendar-with-a-question-mark icon in the top bar opens Question of the Day.",
  },
  {
    id: 'tutorial',
    label: 'Tutorial',
    area: 'Getting started',
    hub: 'getting-started',
    route: '/app/tutorial',
    instructions:
      'This page is the tutorial itself — a short written guide plus a short video for every part of the platform. Use the search box to jump straight to the function you have a question about, or scroll through by section. New to Nishany? Start at the top and work down.',
  },
  {
    id: 'qotd',
    label: 'Question of the Day',
    area: 'Getting started',
    hub: 'getting-started',
    route: '/app/qotd',
    instructions:
      "Use the calendar-with-a-question-mark icon in the top bar to open Question of the Day. Answer the daily question there, or review your answer. The icon stays compact on phones.",
  },
  {
    id: 'plan',
    label: 'Plan',
    area: 'Study',
    hub: 'plan',
    route: '/app/calendar',
    instructions:
      "Plan opens Calendar directly. Use Month or Week to organise your study blocks, and switch between Calendar and Tasks on smaller screens. University is a coming-soon control in the calendar toolbar.",
  },
  {
    id: 'calendar',
    label: 'Calendar',
    area: 'Getting started',
    hub: 'plan',
    route: '/app/calendar',
    instructions:
      "View your timetable and personal study blocks by month or week. Add a block, select a day for its details, and keep your task list alongside the calendar. On a phone, use Calendar and Tasks to choose the view.",
  },
  {
    id: 'university',
    label: 'University',
    area: 'Getting started',
    hub: 'plan',
    instructions:
      "University is coming soon. Its button sits inside Plan beside the calendar controls. For an enrolment correction, open Account and press Request a university or year change to reveal the request form.",
  },
  {
    id: 'learn',
    label: 'Library availability',
    area: 'Study',
    hub: 'library',
    instructions:
      "The sidebar now calls this section Library. It is marked Coming soon and cannot be opened from the sidebar yet. Medical Terminology, Anatomy Atlas, Whiteboard, Flashcards, Notebook, and Resources are all under Tools.",
  },
  {
    id: 'library',
    label: 'Library',
    area: 'Study',
    hub: 'library',
    instructions:
      "Library is coming soon: a place for curriculum-linked articles and reading. Until it opens, use Tools for terminology, reference resources, notes, flashcards, and the Anatomy Atlas demo.",
  },
  {
    id: 'revise',
    label: 'Tools',
    area: 'Study',
    hub: 'tools',
    route: '/app/study-tools',
    instructions:
      "Tools sits below Library. Its cards are ordered Medical Terminology, Anatomy Atlas, Whiteboard, Flashcards, Notebook, then Resources. Open a card to use the tool; choose Demo on Anatomy Atlas to explore the available anatomy models.",
  },
  {
    id: 'taxonomy',
    label: 'Medical Terminology',
    area: 'Study',
    hub: 'tools',
    route: '/app/terminology',
    instructions:
      'Medical Terminology is the bilingual dictionary of the terms you meet first: each card carries the English term, its Arabic, a plain explanation and an example. Browse by category, flip a card to check yourself, mark the ones you know, and send the rest to flashcards, the Term Grid crossword or Term Match.',
  },
  {
    id: 'anatomy-atlas',
    label: 'Anatomy Atlas',
    area: 'Study',
    hub: 'tools',
    route: '/app/anatomy-atlas',
    instructions:
      "Open Tools, then press Demo on Anatomy Atlas. Choose the male or female model, search for a structure, and use the system controls to explore the anatomy. Use the Tools button in the viewer to return.",
  },
  {
    id: 'whiteboard',
    label: 'Whiteboard',
    area: 'Workspace',
    hub: 'tools',
    route: '/app/whiteboard',
    instructions:
      'Whiteboard is a free drawing canvas for sketching diagrams, annotating images, or working through a problem visually. Add images and files directly onto the board, and everything you draw is saved automatically so you can return to it later.',
  },
  {
    id: 'flashcards',
    label: 'Flashcards',
    area: 'Workspace',
    hub: 'tools',
    route: '/app/flashcards',
    instructions:
      'Flashcards uses spaced repetition to help you memorise facts efficiently. Study a deck, mark each card as easy, good, or hard, and the app schedules when to show it to you again. Build your own decks, or study ones shared by your university.',
    steps: [
      { title: 'Pick a deck', detail: 'Your own decks and the ones shared with your year sit side by side.' },
      { title: 'Grade every card', detail: 'Again, hard, good or easy — the grade decides when the card comes back.' },
      { title: 'Study what is due', detail: 'The deck list carries today’s due count, so a short session is always defined.' },
    ],
  },
  {
    id: 'notebook',
    label: 'Notebook',
    area: 'Workspace',
    hub: 'tools',
    route: '/app/notebook',
    instructions:
      'Notebook is where you write and organise your own notes, with a full word-processor-style editor: headings, lists, bold and italic text, images, and links to your sources. Create a note from scratch, or capture a quote straight from a Library document into a new note. Notes are searchable and grouped by subject.',
  },
  {
    id: 'notebook-editor',
    label: 'Notebook Word-style editor',
    area: 'Workspace',
    hub: 'tools',
    route: '/app/notebook',
    instructions:
      'The Notebook editor works like a familiar word processor: use the toolbar to format headings, bold, italics, and lists, drop in images, and insert links to Library sources without leaving the page. Formatting is saved as part of the note, so your notes look the same every time you reopen them.',
  },
  {
    id: 'resources',
    label: 'Resources',
    area: 'Study',
    hub: 'tools',
    route: '/app/resources',
    instructions:
      "Open Tools, then Resources, for shared reading materials, videos, and your own uploads. Switch between Files, Videos, and My uploads, and organise the list by system or module. Bookmarks and recently opened items help you return to useful references.",
  },
  {
    id: 'qbank',
    label: 'Question Bank',
    area: 'Study',
    hub: 'bank',
    route: '/app/qbank',
    instructions:
      "Bank in the sidebar opens Question Bank directly. Build a test from the bank, revisit flagged or missed questions, and choose tutor or timed mode. After answering, read the explanation and return to previous tests to review your work.",
    steps: [
      { title: 'Choose the bank', detail: 'The four boxes at the top of the page. Mixed draws from all three.' },
      { title: 'Set the scope', detail: 'Draw from everything, from what you flagged, from what you missed, or open the topic chooser.' },
      { title: 'Start, then review', detail: 'Timed or tutor mode. The sitting lands in Previous tests when you finish.' },
    ],
  },
  {
    id: 'qbank-split-view',
    label: 'Question Bank split view & highlighting',
    area: 'Study',
    hub: 'bank',
    route: '/app/qbank',
    instructions:
      'While answering a question with a source passage attached, open split view to read the passage and the question side by side instead of switching screens. Select any text in the passage to highlight it — your highlights are saved and reappear the next time you open that source, so you can build up your own markup as you study.',
  },
  {
    id: 'practice',
    label: 'Practice',
    area: 'Study',
    hub: 'practice',
    route: '/app/clinical-practice',
    instructions:
      "Practice sits below Bank and brings together Performance, Oral questions, Skills, Adaptive Study, and Histology Lab. Oral questions and Skills are available now. Performance, Adaptive Study, and Histology Lab are marked Coming soon.",
  },
  {
    id: 'performance',
    label: 'Performance',
    area: 'Plan',
    hub: 'practice',
    instructions:
      "Performance is a coming-soon card inside Practice. It will bring your study record and progress together. Your existing question-bank test history and the progress shown on available tools remain accessible.",
  },
  {
    id: 'oral',
    label: 'Oral questions',
    area: 'Study',
    hub: 'practice',
    route: '/app/oral',
    instructions:
      'Oral questions is the viva, rehearsed one question at a time. Read what the examiner asks, answer it out loud before you reveal anything, then mark yourself got it, partly, or missed it. The marks are your own record and never count toward your accuracy; the queue beside the question shows how far through the night you are.',
  },
  {
    id: 'skills',
    label: 'Skills',
    area: 'Study',
    hub: 'practice',
    route: '/app/skills',
    instructions:
      'Skills is the year’s checklist of procedures you are expected to perform. Tap a skill to cycle it: not started, then practised, then ready. It is your own record for planning revision rather than a formal sign-off — an assessor gives that, and it is not recorded here.',
  },
  {
    id: 'adaptive',
    label: 'Adaptive Study',
    area: 'Study',
    hub: 'practice',
    instructions:
      "Adaptive Study is coming soon inside Practice. It is intended to organise sessions around the concepts that need more review. For now, choose a focused question-bank test or review the flashcards due today.",
  },
  {
    id: 'histology',
    label: 'Histology Lab',
    area: 'Study',
    hub: 'practice',
    instructions:
      "Histology Lab is coming soon inside Practice. It will provide slide-based anatomy and tissue study. The card marks its availability; oral rehearsal and skills tracking are the currently available practice tools.",
  },
  {
    id: 'practical',
    label: 'Practical',
    area: 'Study',
    hub: 'practice',
    route: '/app/practical',
    instructions:
      'Practical is the three formats that are run as a station: OSCE stations, clinical cases, and lab and imaging films. Work through one at your own pace — each shows the clinical context first, then asks you to respond before revealing the answer and explanation. Oral questions, Skills and Histology used to be tabs here and are now their own entries on Practice.',
  },
  {
    id: 'essays',
    label: 'Essay questions',
    area: 'Study',
    hub: 'practice',
    route: '/app/essays',
    instructions:
      'Essay questions let you write a full, structured answer rather than pick from options — the format used in written exams. Draft your answer, save it, and compare it against the model answer and marking points once you are done. Your drafts are saved automatically as you type.',
  },
  {
    id: 'minigames',
    label: 'Minigames',
    area: 'Workspace',
    hub: 'minigames',
    route: '/app/minigames',
    instructions:
      'Minigames turns revision into quick, focused challenges — matching, timed recall, and other formats that make repetition less tedious. Pick a subject and a game mode for a few minutes of active practice between longer study sessions.',
  },
  {
    id: 'maristanas',
    label: 'Build Maristanas',
    area: 'Plan',
    hub: 'minigames',
    route: '/app/maristanas',
    instructions:
      "Build Maristanas is reached from Minigames. Open it to view your study hospital and the progress you build as you use Nishany.",
  },
  {
    id: 'study-together',
    label: 'Study Rooms',
    area: 'Workspace',
    hub: 'study-rooms',
    route: '/app/study-rooms',
    instructions:
      'Study Rooms put you at a desk with up to twenty classmates from your university and year. Join a room with its code or open one of your own, pick your desk and device, and study alongside the others — the room shows who is working and who is speaking. Shared tests sit in the same place, so a room can sit one paper together.',
    steps: [
      { title: 'Join or open a room', detail: 'Use a room code, or open a room for your university and year.' },
      { title: 'Take a desk', detail: 'Pick your seat and device; the room shows who is working and who is speaking.' },
      { title: 'Sit a paper together', detail: 'A shared test runs for everyone at the desks at once.' },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    area: 'Account',
    hub: 'account',
    route: '/app/account',
    instructions:
      "Account holds your profile, preferences, billing, security, and data. University and year are recorded after onboarding. Press Request a university or year change to expand the correction form, choose the requested details, and submit a reason for administrator review.",
  },
  {
    id: 'appearance-language',
    label: 'Appearance and language',
    area: 'Account',
    hub: 'account',
    instructions:
      "The Appearance and Language buttons sit side by side at the bottom of the sidebar. Press either to open its selector, then choose a theme or language. In the collapsed sidebar, the same controls appear as icons.",
  },
  {
    id: 'billing',
    label: 'Billing',
    area: 'Account',
    hub: 'account',
    route: '/app/account?tab=billing',
    instructions:
      'Billing is a tab on the Account page. It shows your current plan, payment history, and any available vouchers or discounts. Upgrade, renew, or apply a voucher code there — everything about your subscription is managed from that one tab.',
  },
  {
    id: 'fullscreen-button',
    label: 'Fullscreen and the top bar',
    area: 'Account',
    hub: 'account',
    instructions:
      "Open the Tools dropdown to the right of Question of the Day in the top bar, then choose Fullscreen. Choose Exit fullscreen from the same menu, or press Escape, to return. The menu also contains Search and Hide menus; on phones it includes the focus timer and audio controls.",
  },
]

/** Topics grouped by area, in the order areas are defined above. */
export function tutorialTopicsByArea(topics: TutorialTopic[] = TUTORIAL_TOPICS): Array<{ area: TutorialArea; topics: TutorialTopic[] }> {
  const order: TutorialArea[] = ['Getting started', 'Study', 'Plan', 'Workspace', 'Account']
  return order
    .map((area) => ({ area, topics: topics.filter((topic) => topic.area === area) }))
    .filter((group) => group.topics.length > 0)
}

/** The topics of one hub, in the order they are authored above. */
export function tutorialTopicsByHub(hub: TutorialHub, topics: TutorialTopic[] = TUTORIAL_TOPICS): TutorialTopic[] {
  return topics.filter((topic) => topic.hub === hub)
}

/** The English label of a hub, or the id itself if it is not a known section. */
export function tutorialHubLabel(hub: TutorialHub): string {
  return TUTORIAL_HUBS.find((entry) => entry.id === hub)?.label ?? hub
}

/** Read a `?hub=` value, falling back when it names nothing. */
export function readTutorialHub(value: string | null | undefined, fallback: TutorialHub): TutorialHub {
  const aliases: Record<string, TutorialHub> = { learn: 'library', revise: 'tools', together: 'study-rooms' }
  const canonical = value ? aliases[value] ?? value : value
  return TUTORIAL_HUBS.some((entry) => entry.id === canonical) ? (canonical as TutorialHub) : fallback
}

/**
 * Case-insensitive match against everything a topic says — its label, its
 * paragraph and its step cards.
 *
 * `translate` is the page's `t`. Every one of those strings is now translated,
 * so an Arabic student reads an entirely Arabic page; matching the English
 * constants alone meant typing what was on screen returned "nothing matches
 * that". Both languages are searched, not just the active one: a student who
 * knows a feature by its English name finds it on the Arabic page too.
 */
export function matchesTutorialQuery(
  topic: TutorialTopic,
  query: string,
  translate: (source: string) => string = (source) => source,
): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true

  const sources = [topic.label, topic.instructions]
  for (const step of topic.steps ?? []) sources.push(step.title, step.detail)

  return sources.some((source) => (
    source.toLowerCase().includes(q) || translate(source).toLowerCase().includes(q)
  ))
}

/**
 * Turn a YouTube or Vimeo watch/share URL into its embeddable form.
 * Anything else (including a direct .mp4 URL) is returned unchanged, since
 * the caller falls back to a plain `<video>` element for those.
 */
export function toEmbedUrl(url: string): string | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    const host = parsed.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      if (parsed.pathname === '/watch') {
        const id = parsed.searchParams.get('v')
        return id ? `https://www.youtube.com/embed/${id}` : null
      }
      if (parsed.pathname.startsWith('/embed/')) return trimmed
      if (parsed.pathname.startsWith('/shorts/')) {
        const id = parsed.pathname.split('/')[2]
        return id ? `https://www.youtube.com/embed/${id}` : null
      }
      return null
    }
    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null
    }
    if (host === 'player.vimeo.com') return trimmed

    return null
  } catch {
    return null
  }
}

/** True when a URL looks like a direct video file rather than a hosted embed. */
export function isDirectVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url.trim())
}

/** Basic shape check for the admin's paste field — not a reachability check. */
export function isPlausibleVideoUrl(url: string): boolean {
  const trimmed = url.trim()
  if (!trimmed) return true // empty clears the video, which is valid
  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

/** The first published video in guide order; stale or empty topic entries do not unlock the dashboard action. */
export function firstTutorialVideoTopic(videos: TutorialVideoMap): TutorialTopic | undefined {
  return TUTORIAL_TOPICS.find((topic) => {
    const url = videos[topic.id]
    return typeof url === 'string' && url.trim() !== '' && isPlausibleVideoUrl(url)
  })
}
