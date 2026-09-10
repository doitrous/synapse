import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  TUTORIAL_HUBS,
  TUTORIAL_TOPICS,
  TUTORIAL_VIDEOS_STATE_KEY,
  firstTutorialVideoTopic,
  matchesTutorialQuery,
  readTutorialHub,
  tutorialHubLabel,
  tutorialTopicsByArea,
  tutorialTopicsByHub,
} from './tutorials.ts'

/**
 * Every id here is a key in the shared `nishany-tutorial-videos-v1` document
 * and a row on the admin Tutorial setup page. Renaming one silently unhooks the
 * video an admin already pasted, so the set is asserted rather than trusted.
 */
const TOPIC_IDS = [
  'dashboard', 'university', 'calendar', 'tutorial',
  'plan', 'performance', 'maristanas',
  'learn', 'library', 'resources', 'taxonomy',
  'practice', 'qbank', 'qbank-split-view', 'adaptive', 'practical', 'oral', 'skills', 'essays', 'histology',
  'revise', 'notebook', 'notebook-editor', 'whiteboard', 'flashcards',
  'minigames', 'study-together',
  'account', 'billing', 'fullscreen-button', 'qotd', 'anatomy-atlas', 'appearance-language',
]

test('the catalogue keeps its ids and its shared-state key', () => {
  assert.equal(TUTORIAL_VIDEOS_STATE_KEY, 'nishany-tutorial-videos-v1')
  assert.deepEqual([...TUTORIAL_TOPICS.map((topic) => topic.id)].sort(), [...TOPIC_IDS].sort())
})

test('every topic belongs to exactly one hub, and every hub has topics', () => {
  const placed = TUTORIAL_HUBS.flatMap((hub) => tutorialTopicsByHub(hub.id))
  assert.equal(placed.length, TUTORIAL_TOPICS.length)
  assert.equal(new Set(placed.map((topic) => topic.id)).size, TUTORIAL_TOPICS.length)
  for (const hub of TUTORIAL_HUBS) {
    assert.ok(tutorialTopicsByHub(hub.id).length > 0, `${hub.id} has no topics`)
  }
})

test('hub topics read in sidebar order', () => {
  assert.deepEqual(tutorialTopicsByHub('practice').map((topic) => topic.id), [
    'practice', 'performance', 'oral', 'skills', 'adaptive', 'histology', 'practical', 'essays',
  ])
  assert.deepEqual(TUTORIAL_HUBS.map((hub) => hub.id), [
    'getting-started', 'plan', 'library', 'tools', 'bank', 'practice', 'minigames', 'study-rooms', 'account',
  ])
})

test('a route, where one is given, points into the app', () => {
  for (const topic of TUTORIAL_TOPICS) {
    if (topic.route === undefined) continue
    assert.ok(topic.route.startsWith('/app'), `${topic.id} has an off-app route: ${topic.route}`)
  }
  // The fullscreen control is a top-bar button, not a page, so it has no route.
  assert.equal(TUTORIAL_TOPICS.find((topic) => topic.id === 'fullscreen-button')?.route, undefined)
})

test('legacy area grouping remains available', () => {
  const groups = tutorialTopicsByArea()
  assert.deepEqual(groups.map((group) => group.area), ['Getting started', 'Study', 'Plan', 'Workspace', 'Account'])
  assert.equal(groups.reduce((sum, group) => sum + group.topics.length, 0), TUTORIAL_TOPICS.length)
})

test('an unknown ?hub= falls back rather than emptying the page', () => {
  assert.equal(readTutorialHub('revise', 'getting-started'), 'tools')
  assert.equal(readTutorialHub('nonsense', 'getting-started'), 'getting-started')
  assert.equal(readTutorialHub(null, 'practice'), 'practice')
  assert.equal(tutorialHubLabel('getting-started'), 'Getting started')
})

test('search reads labels and instructions, and an empty query matches all', () => {
  const qbank = TUTORIAL_TOPICS.find((topic) => topic.id === 'qbank')!
  assert.ok(matchesTutorialQuery(qbank, 'question bank'))
  assert.ok(matchesTutorialQuery(qbank, 'explanation'))
  assert.ok(matchesTutorialQuery(qbank, '   '))
  assert.equal(matchesTutorialQuery(qbank, 'zzz'), false)
})

/**
 * The page is entirely Arabic for an Arabic student, so the matcher has to read
 * what is on screen and not only the English constants it is authored from.
 */
test('search finds a topic by its translated text as well as its source', () => {
  const qbank = TUTORIAL_TOPICS.find((topic) => topic.id === 'qbank')!
  const ar: Record<string, string> = {
    [qbank.label]: 'بنك الأسئلة',
    [qbank.instructions]: 'تدرّب على أسئلة على نمط الامتحان.',
    'Choose the bank': 'اختر البنك',
  }
  const t = (source: string) => ar[source] ?? source

  assert.ok(matchesTutorialQuery(qbank, 'بنك الأسئلة', t))
  assert.ok(matchesTutorialQuery(qbank, 'نمط الامتحان', t))
  // A step card is searchable too, in either language.
  assert.ok(matchesTutorialQuery(qbank, 'اختر البنك', t))
  assert.ok(matchesTutorialQuery(qbank, 'topic chooser', t))
  // The English name still finds it on an Arabic page.
  assert.ok(matchesTutorialQuery(qbank, 'Question Bank', t))
  assert.equal(matchesTutorialQuery(qbank, 'السبورة', t), false)
  // Without a translator the matcher is the source-only one it always was.
  assert.equal(matchesTutorialQuery(qbank, 'بنك الأسئلة'), false)
})


test('dashboard tutorial unlocks only when a current topic has a published video', () => {
  assert.equal(firstTutorialVideoTopic({}), undefined)
  assert.equal(firstTutorialVideoTopic({ dashboard: '   ', removed: 'https://example.com/video.mp4' }), undefined)
  assert.equal(firstTutorialVideoTopic({ dashboard: 'invalid' }), undefined)
  assert.equal(firstTutorialVideoTopic({ qbank: 'https://example.com/video.mp4' })?.id, 'qbank')
  assert.equal(firstTutorialVideoTopic({ qbank: 'https://example.com/video.mp4', dashboard: 'https://youtu.be/demo' })?.id, 'dashboard')
})

test('guide links and tool order match the current navigation', () => {
  assert.deepEqual(tutorialTopicsByHub('tools').map((topic) => topic.id), ['revise', 'taxonomy', 'anatomy-atlas', 'whiteboard', 'flashcards', 'notebook', 'notebook-editor', 'resources'])
  assert.equal(TUTORIAL_TOPICS.find((topic) => topic.id === 'plan')?.route, '/app/calendar')
  assert.equal(TUTORIAL_TOPICS.find((topic) => topic.id === 'practice')?.route, '/app/clinical-practice')
  assert.equal(TUTORIAL_TOPICS.find((topic) => topic.id === 'library')?.route, undefined)
  assert.equal(readTutorialHub('learn', 'getting-started'), 'library')
  assert.equal(readTutorialHub('together', 'getting-started'), 'study-rooms')
})
