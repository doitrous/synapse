// src/data/qotdTypes.ts

/** Shared app_state document of admin pins. cohortKey → isoDate → questionId. */
export const QOTD_PINS_KEY = 'nishany-qotd-pins-v1'

/** User-owned demo-mode answer log (localStorage in demo, user_state in live-unused). */
export const QOTD_LOCAL_ANSWERS_KEY = 'nishany.qotd.answers.v1'

/** One locally-stored answer in demo mode. */
export interface QotdLocalAnswer {
  date: string        // YYYY-MM-DD (Cairo)
  questionId: string
  answerIndex: number
  correct: boolean
}

/** GET /api/qotd/today */
export interface QotdTodayResponse {
  date: string
  questionId: string | null
  answered: boolean
  answerIndex: number | null
  correct: boolean | null
  current: number       // current streak
  longest: number       // longest streak
  history: string[]     // answered dates, most recent first (bounded, e.g. last 60)
}

/** POST /api/qotd/answer body */
export interface QotdAnswerRequest {
  questionId: string
  answerIndex: number
}

/** POST /api/qotd/answer response */
export interface QotdAnswerResponse {
  correct: boolean
  correctIndex: number
  current: number
  longest: number
}

/** One row of GET /api/qotd/leaderboard */
export interface QotdLeaderboardRow {
  rank: number
  userId: string
  username: string
  profileIcon: string | null
  current: number
  totalCorrect: number
  totalAnswered: number
}

export interface QotdLeaderboardResponse {
  scope: { universityId: string; year: string }
  rows: QotdLeaderboardRow[]
  viewer: { rank: number | null; total: number; current: number }
}

/** One row of GET /api/qotd/friends */
export interface QotdFriendRow {
  userId: string
  name: string
  answered: boolean
  /** null until the viewer has answered today (no spoilers). */
  correct: boolean | null
}

export interface QotdFriendsResponse {
  date: string
  viewerAnswered: boolean
  friends: QotdFriendRow[]
}
