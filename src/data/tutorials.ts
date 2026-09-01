/**
 * The Tutorial catalogue: one slot per platform function, each carrying
 * written instructions (authored here) and a video an admin fills in later.
 *
 * `area` mirrors the groupings in `src/components/shell/nav.ts` — Getting
 * started, Study, Plan, Workspace, Account — plus one topic for the Tutorial
 * page itself, so the help centre also explains how to use itself.
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

export interface TutorialTopic {
  id: string
  label: string
  area: TutorialArea
  instructions: string
}

export const TUTORIAL_VIDEOS_STATE_KEY = 'nishany-tutorial-videos-v1'

/** Admin-authored, topic id → video URL (mp4, YouTube, or Vimeo). */
export type TutorialVideoMap = Record<string, string>

export const TUTORIAL_TOPICS: TutorialTopic[] = [
  // Getting started
  {
    id: 'dashboard',
    label: 'Dashboard',
    area: 'Getting started',
    instructions:
      'Your Dashboard is the first thing you see when you sign in. It shows what to study next, your recent scores, and any reminders your university has posted. Tap a suggested card to jump straight into a question set, a review, or an upcoming deadline. Check back here whenever you are not sure what to do next — it is built to answer exactly that.',
  },
  {
    id: 'university',
    label: 'University',
    area: 'Getting started',
    instructions:
      'The University page shows your enrolled university, year, and curriculum, along with the modules and subjects scheduled for your term. Use it to confirm you are seeing content for the right year and to understand how your course is structured. If your enrolment looks wrong, this is also where you can request a change.',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    area: 'Getting started',
    instructions:
      'Calendar lays out your exams, module deadlines, and study events in one place. Switch between month and list views, and tap any entry for details. Events your university has scheduled appear automatically — add your own personal reminders alongside them to keep everything in one view.',
  },
  {
    id: 'tutorial',
    label: 'Tutorial',
    area: 'Getting started',
    instructions:
      'This page is the tutorial itself — a short written guide plus a short video for every part of the platform. Use the search box to jump straight to the function you have a question about, or scroll through by section. New to Nishany? Start at the top and work down.',
  },

  // Study
  {
    id: 'library',
    label: 'Library',
    area: 'Study',
    instructions:
      'The Library holds every book, guideline, deck, and video for your course, organised by subject or module. Filter by type, subject, university, or year, and bookmark anything you want to find again quickly. Opening a document takes you straight to the reader at the right page when one is recorded.',
  },
  {
    id: 'qbank',
    label: 'Question Bank',
    area: 'Study',
    instructions:
      'Question Bank is where you practise exam-style questions by subject, topic, or past paper. Answer a question, check the explanation, and your result feeds your Performance stats automatically. Use the filters to focus on a weak topic, or start a mixed set to simulate exam conditions.',
  },
  {
    id: 'qbank-split-view',
    label: 'Question Bank split view & highlighting',
    area: 'Study',
    instructions:
      'While answering a question with a source passage attached, open split view to read the passage and the question side by side instead of switching screens. Select any text in the passage to highlight it — your highlights are saved and reappear the next time you open that source, so you can build up your own markup as you study.',
  },
  {
    id: 'adaptive',
    label: 'Adaptive Study',
    area: 'Study',
    instructions:
      'Adaptive Study builds a personalised question set based on what you have gotten right, wrong, or not yet tried. The more you use it, the better it targets your weak spots instead of repeating what you already know. Start a session whenever you want focused practice without picking topics yourself.',
  },
  {
    id: 'practical',
    label: 'Practical',
    area: 'Study',
    instructions:
      'Practical covers OSCE-style stations, spot diagnosis, and image-based questions you will meet in clinical exams. Work through a station at your own pace — each one shows the clinical context first, then asks you to respond before revealing the answer and explanation.',
  },
  {
    id: 'essays',
    label: 'Essay questions',
    area: 'Study',
    instructions:
      'Essay questions let you write a full, structured answer rather than pick from options — the format used in written exams. Draft your answer, save it, and compare it against the model answer and marking points once you are done. Your drafts are saved automatically as you type.',
  },
  {
    id: 'resources',
    label: 'Resources',
    area: 'Study',
    instructions:
      'Resources is your combined view of everything to read or watch: the shared Library, videos, and your own uploads, in one place. Switch between Files, Videos, and My uploads at the top, and organise the list by system or by module — whichever matches how you study.',
  },
  {
    id: 'taxonomy',
    label: 'Medical Taxonomy',
    area: 'Study',
    instructions:
      'Medical Taxonomy is the structured map of concepts, terms, and how they relate to each other across your curriculum. Use it to see how a topic connects to others, look up a definition, or explore a system from the top down rather than searching for one question at a time.',
  },

  // Plan
  {
    id: 'performance',
    label: 'Performance',
    area: 'Plan',
    instructions:
      'Performance tracks your accuracy, speed, and coverage across every subject and question type you have attempted. Use the breakdowns to see exactly which subjects need more attention before your next exam, and watch your trend over time rather than just your latest score.',
  },
  {
    id: 'maristanas',
    label: 'Build Maristanas',
    area: 'Plan',
    instructions:
      'Build Maristanas lets you assemble a custom study block — choosing subjects, question counts, and formats — tailored to how you want to prepare for a specific exam or block. Save a configuration once and reuse it, or build a fresh one each time your priorities change.',
  },

  // Workspace
  {
    id: 'whiteboard',
    label: 'Whiteboard',
    area: 'Workspace',
    instructions:
      'Whiteboard is a free drawing canvas for sketching diagrams, annotating images, or working through a problem visually. Add images and files directly onto the board, and everything you draw is saved automatically so you can return to it later.',
  },
  {
    id: 'notebook',
    label: 'Notebook',
    area: 'Workspace',
    instructions:
      'Notebook is where you write and organise your own notes, with a full word-processor-style editor: headings, lists, bold and italic text, images, and links to your sources. Create a note from scratch, or capture a quote straight from a Library document into a new note. Notes are searchable and grouped by subject.',
  },
  {
    id: 'notebook-editor',
    label: 'Notebook Word-style editor',
    area: 'Workspace',
    instructions:
      'The Notebook editor works like a familiar word processor: use the toolbar to format headings, bold, italics, and lists, drop in images, and insert links to Library sources without leaving the page. Formatting is saved as part of the note, so your notes look the same every time you reopen them.',
  },
  {
    id: 'flashcards',
    label: 'Flashcards',
    area: 'Workspace',
    instructions:
      'Flashcards uses spaced repetition to help you memorise facts efficiently. Study a deck, mark each card as easy, good, or hard, and the app schedules when to show it to you again. Build your own decks, or study ones shared by your university.',
  },
  {
    id: 'minigames',
    label: 'Minigames',
    area: 'Workspace',
    instructions:
      'Minigames turns revision into quick, focused challenges — matching, timed recall, and other formats that make repetition less tedious. Pick a subject and a game mode for a few minutes of active practice between longer study sessions.',
  },
  {
    id: 'study-together',
    label: 'Study Together',
    area: 'Workspace',
    instructions:
      'Study Together connects you with classmates for shared sessions — compare progress, share notes, and work through question sets alongside others in your year. Join a group or start your own to keep each other accountable.',
  },

  // Account
  {
    id: 'account',
    label: 'Manage your account',
    area: 'Account',
    instructions:
      'Manage your account is where you update your profile details, change your password, and control notification preferences. Keep your enrolment details accurate here so the content you see always matches your university and year.',
  },
  {
    id: 'billing',
    label: 'Billing',
    area: 'Account',
    instructions:
      'Billing shows your current plan, payment history, and any available vouchers or discounts. Upgrade, renew, or apply a voucher code here — everything about your subscription is managed from this one page.',
  },
  {
    id: 'fullscreen-button',
    label: 'Fullscreen button',
    area: 'Account',
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

/** Case-insensitive match against a topic's label or instructions. */
export function matchesTutorialQuery(topic: TutorialTopic, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return topic.label.toLowerCase().includes(q) || topic.instructions.toLowerCase().includes(q)
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
