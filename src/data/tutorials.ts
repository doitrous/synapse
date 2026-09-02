/**
 * The Tutorial catalogue: one slot per platform function, each carrying
 * written instructions (authored here) and a video an admin fills in later.
 *
 * Two groupings sit on every topic. `hub` is the live one: it follows the
 * sidebar a student actually navigates — Getting started, Plan, Learn,
 * Practice, Revise, Together, Account — and is what the Tutorial page's hub row
 * switches between. `area` is the older grouping, kept untouched along with
 * every id because the admin Tutorial setup page lists by it and the
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
  | 'learn'
  | 'practice'
  | 'revise'
  | 'together'
  | 'account'

export const TUTORIAL_HUBS: ReadonlyArray<{ id: TutorialHub; label: string }> = [
  { id: 'getting-started', label: 'Getting started' },
  { id: 'plan', label: 'Plan' },
  { id: 'learn', label: 'Learn' },
  { id: 'practice', label: 'Practice' },
  { id: 'revise', label: 'Revise' },
  { id: 'together', label: 'Together' },
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
  // Getting started — the shape of the app
  {
    id: 'dashboard',
    label: 'Dashboard',
    area: 'Getting started',
    hub: 'getting-started',
    route: '/app',
    instructions:
      'Your Dashboard is the first thing you see when you sign in. It shows what to study next, your recent scores, and any reminders your university has posted. Tap a suggested card to jump straight into a question set, a review, or an upcoming deadline. Check back here whenever you are not sure what to do next — it is built to answer exactly that.',
  },
  {
    id: 'university',
    label: 'University',
    area: 'Getting started',
    hub: 'getting-started',
    route: '/app/university',
    instructions:
      'The University page shows your enrolled university, year, and curriculum, along with the modules and subjects scheduled for your term. Use it to confirm you are seeing content for the right year and to understand how your course is structured. If your enrolment looks wrong, this is also where you can request a change.',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    area: 'Getting started',
    hub: 'getting-started',
    route: '/app/calendar',
    instructions:
      'Calendar lays out your exams, module deadlines, and study events in one place. Switch between month and list views, and tap any entry for details. Events your university has scheduled appear automatically — add your own personal reminders alongside them to keep everything in one view.',
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

  // Plan — the week and how it is going
  {
    id: 'plan',
    label: 'Plan',
    area: 'Study',
    hub: 'plan',
    route: '/app/plan',
    instructions:
      'Plan gathers everything about your time: the Calendar with its to-do list, your Performance, and — when it opens — your University page. Open it when you want to decide what the week looks like rather than what to study next.',
    steps: [
      { title: 'Open the calendar', detail: 'Exams, module deadlines and the to-do list you keep beside them.' },
      { title: 'Read the performance page', detail: 'Accuracy and coverage per subject, so the week aims at the weak ones.' },
      { title: 'Confirm the scope', detail: 'The University page states the year and curriculum everything else is filtered by.' },
    ],
  },
  {
    id: 'performance',
    label: 'Performance',
    area: 'Plan',
    hub: 'plan',
    route: '/app/performance',
    instructions:
      'Performance tracks your accuracy, speed, and coverage across every subject and question type you have attempted. Use the breakdowns to see exactly which subjects need more attention before your next exam, and watch your trend over time rather than just your latest score.',
  },
  {
    id: 'maristanas',
    label: 'Build Maristanas',
    area: 'Plan',
    hub: 'plan',
    route: '/app/maristanas',
    instructions:
      'Build Maristanas lets you assemble a custom study block — choosing subjects, question counts, and formats — tailored to how you want to prepare for a specific exam or block. Save a configuration once and reuse it, or build a fresh one each time your priorities change.',
  },

  // Learn — reading and looking things up
  {
    id: 'learn',
    label: 'Learn',
    area: 'Study',
    hub: 'learn',
    route: '/app/learn',
    instructions:
      'Learn holds the material you read and look things up in: Medical Terminology, Resources, and this Tutorial, with the Library to come. Each card shows how far you have got, so you can see at a glance what is still untouched.',
    steps: [
      { title: 'Pick what you are reading', detail: 'Terminology, Resources and the Library sit as cards on the hub.' },
      { title: 'Watch the ring', detail: 'Each card carries how far through that material you already are.' },
      { title: 'Come back for help', detail: 'This Tutorial is a card on the same hub, so the guide is never far.' },
    ],
  },
  {
    id: 'library',
    label: 'Library',
    area: 'Study',
    hub: 'learn',
    route: '/app/library',
    instructions:
      'The Library holds every book, guideline, deck, and video for your course, organised by subject or module. Filter by type, subject, university, or year, and bookmark anything you want to find again quickly. Opening a document takes you straight to the reader at the right page when one is recorded.',
  },
  {
    id: 'resources',
    label: 'Resources',
    area: 'Study',
    hub: 'learn',
    route: '/app/resources',
    instructions:
      'Resources is your combined view of everything to read or watch: the shared Library, videos, and your own uploads, in one place. Switch between Files, Videos, and My uploads at the top, and organise the list by system or by module — whichever matches how you study.',
  },
  {
    id: 'taxonomy',
    label: 'Medical Terminology',
    area: 'Study',
    hub: 'learn',
    route: '/app/terminology',
    instructions:
      'Medical Terminology is the bilingual dictionary of the terms you meet first: each card carries the English term, its Arabic, a plain explanation and an example. Browse by category, flip a card to check yourself, mark the ones you know, and send the rest to flashcards, the Term Grid crossword or Term Match.',
  },

  // Practice — every format the exams use
  {
    id: 'practice',
    label: 'Practice',
    area: 'Study',
    hub: 'practice',
    route: '/app/practice',
    instructions:
      'Practice is every format your exams use: the Question Bank, Practical (OSCE stations, clinical cases, lab and imaging), Oral questions, Skills, Essay and Histology. Start from a card, and its ring tells you how much of that bank you have already worked through.',
    steps: [
      { title: 'Choose the format', detail: 'Question Bank, Practical stations or Essay — the three formats the exams use.' },
      { title: 'Work through a card', detail: 'Each card opens its bank with the scope you last used.' },
      { title: 'Watch the coverage', detail: 'The ring on every card is how much of that bank you have already answered.' },
    ],
  },
  {
    id: 'qbank',
    label: 'Question Bank',
    area: 'Study',
    hub: 'practice',
    route: '/app/qbank',
    instructions:
      'Question Bank is where you practise exam-style questions by subject, topic, or past paper. Answer a question, check the explanation, and your result feeds your Performance stats automatically. Use the filters to focus on a weak topic, or start a mixed set to simulate exam conditions.',
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
    hub: 'practice',
    route: '/app/qbank',
    instructions:
      'While answering a question with a source passage attached, open split view to read the passage and the question side by side instead of switching screens. Select any text in the passage to highlight it — your highlights are saved and reappear the next time you open that source, so you can build up your own markup as you study.',
  },
  {
    id: 'adaptive',
    label: 'Adaptive Study',
    area: 'Study',
    hub: 'practice',
    route: '/app/adaptive',
    instructions:
      'Adaptive Study builds a personalised question set based on what you have gotten right, wrong, or not yet tried. The more you use it, the better it targets your weak spots instead of repeating what you already know. Start a session whenever you want focused practice without picking topics yourself.',
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
    id: 'essays',
    label: 'Essay questions',
    area: 'Study',
    hub: 'practice',
    route: '/app/essays',
    instructions:
      'Essay questions let you write a full, structured answer rather than pick from options — the format used in written exams. Draft your answer, save it, and compare it against the model answer and marking points once you are done. Your drafts are saved automatically as you type.',
  },
  {
    id: 'histology',
    label: 'Histology',
    area: 'Study',
    hub: 'practice',
    route: '/app/histology',
    instructions:
      'Histology is the slide box and the microscope. Pick a slide, then pan and zoom through 4×, 10× and 40× and name what is under the lens. It is marked coming soon because what you name is not scored or carried into your record yet — the bench itself works, and every published slide is on it.',
  },

  // Revise — writing it down and keeping it
  {
    id: 'revise',
    label: 'Revise',
    area: 'Study',
    hub: 'revise',
    route: '/app/revise',
    instructions:
      'Revise is where what you learned gets consolidated: your Notebook (including the notes you attach to questions), the Whiteboard, and Flashcards with what is due today.',
    steps: [
      { title: 'Write it down', detail: 'Notebook holds your own notes, including the ones you attach to questions.' },
      { title: 'Draw it out', detail: 'Whiteboard is a free canvas that saves itself as you work.' },
      { title: 'Sit what is due', detail: 'Flashcards shows the cards spaced repetition has scheduled for today.' },
    ],
  },
  {
    id: 'notebook',
    label: 'Notebook',
    area: 'Workspace',
    hub: 'revise',
    route: '/app/notebook',
    instructions:
      'Notebook is where you write and organise your own notes, with a full word-processor-style editor: headings, lists, bold and italic text, images, and links to your sources. Create a note from scratch, or capture a quote straight from a Library document into a new note. Notes are searchable and grouped by subject.',
  },
  {
    id: 'notebook-editor',
    label: 'Notebook Word-style editor',
    area: 'Workspace',
    hub: 'revise',
    route: '/app/notebook',
    instructions:
      'The Notebook editor works like a familiar word processor: use the toolbar to format headings, bold, italics, and lists, drop in images, and insert links to Library sources without leaving the page. Formatting is saved as part of the note, so your notes look the same every time you reopen them.',
  },
  {
    id: 'whiteboard',
    label: 'Whiteboard',
    area: 'Workspace',
    hub: 'revise',
    route: '/app/whiteboard',
    instructions:
      'Whiteboard is a free drawing canvas for sketching diagrams, annotating images, or working through a problem visually. Add images and files directly onto the board, and everything you draw is saved automatically so you can return to it later.',
  },
  {
    id: 'flashcards',
    label: 'Flashcards',
    area: 'Workspace',
    hub: 'revise',
    route: '/app/flashcards',
    instructions:
      'Flashcards uses spaced repetition to help you memorise facts efficiently. Study a deck, mark each card as easy, good, or hard, and the app schedules when to show it to you again. Build your own decks, or study ones shared by your university.',
    steps: [
      { title: 'Pick a deck', detail: 'Your own decks and the ones shared with your year sit side by side.' },
      { title: 'Grade every card', detail: 'Again, hard, good or easy — the grade decides when the card comes back.' },
      { title: 'Study what is due', detail: 'The deck list carries today’s due count, so a short session is always defined.' },
    ],
  },

  // Together — studying with other people
  {
    id: 'minigames',
    label: 'Minigames',
    area: 'Workspace',
    hub: 'together',
    route: '/app/minigames',
    instructions:
      'Minigames turns revision into quick, focused challenges — matching, timed recall, and other formats that make repetition less tedious. Pick a subject and a game mode for a few minutes of active practice between longer study sessions.',
  },
  {
    id: 'study-together',
    label: 'Study Rooms',
    area: 'Workspace',
    hub: 'together',
    route: '/app/study-rooms',
    instructions:
      'Study Rooms put you at a desk with up to twenty classmates from your university and year. Join a room with its code or open one of your own, pick your desk and device, and study alongside the others — the room shows who is working and who is speaking. Shared tests sit in the same place, so a room can sit one paper together.',
    steps: [
      { title: 'Join or open a room', detail: 'Use a room code, or open a room for your university and year.' },
      { title: 'Take a desk', detail: 'Pick your seat and device; the room shows who is working and who is speaking.' },
      { title: 'Sit a paper together', detail: 'A shared test runs for everyone at the desks at once.' },
    ],
  },

  // Account — the subscription and the frame
  {
    id: 'account',
    label: 'Account',
    area: 'Account',
    hub: 'account',
    route: '/app/account',
    instructions:
      'Account is where you update your profile details, change your password, control notification preferences, and manage your plan under its Billing tab. Keep your enrolment details accurate here so the content you see always matches your university and year.',
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
    label: 'Fullscreen button',
    area: 'Account',
    hub: 'account',
    instructions:
      'The fullscreen button, near the top of the app, expands the current page to fill your whole screen and hides browser chrome — useful when reading a long document, working on the Whiteboard, or focusing during a timed practice set. Press it again, or press Escape, to return to the normal view.',
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

/** The English label of a hub, or the id itself if it is not one of the seven. */
export function tutorialHubLabel(hub: TutorialHub): string {
  return TUTORIAL_HUBS.find((entry) => entry.id === hub)?.label ?? hub
}

/** Read a `?hub=` value, falling back when it names nothing. */
export function readTutorialHub(value: string | null | undefined, fallback: TutorialHub): TutorialHub {
  return TUTORIAL_HUBS.some((entry) => entry.id === value) ? (value as TutorialHub) : fallback
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
