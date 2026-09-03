/**
 * Student-owned state is never stored in the shared catalogue document store.
 * The API derives the owner from the verified session; these patterns only
 * choose the endpoint and are not themselves a security boundary.
 */
const USER_OWNED_PATTERNS = [
  /^nishany-lang$/,
  /^nishany\.notebook\./,
  /^nishany\.whiteboard\./,
  /^nishany\.calendar\.blocks$/,
  // `marks` is the student's highlights and sticky notes on library articles.
  // Left out of this list it would be routed to the shared catalogue store,
  // which only an admin may write — so every save a student made would be
  // refused by the server and dropped.
  /^nishany\.library\.(read|userArticles|personalTags|marks)/,
  /^nishany\.account\./,
  // Question-of-the-day answers made offline, waiting to be submitted. Missing
  // from this list they went to the shared store and every student read got 403.
  /^nishany\.qotd\./,
  /^nishany-notification-read-v1-/,
  /^nishany-applied-voucher-v1$/,
  /^nishany\.qbank\./,
  // The unified builder's mixed sitting — the queue it drew and how far
  // through it the student is. It sits inside the qbank namespace above and is
  // already matched by it; it is named here because this list is where anyone
  // asking "who owns this document" looks, and a new student-owned key that
  // cannot be found by grepping it is the way one ends up in the shared store.
  /^nishany\.qbank\.mixedSession\./,
  // The flags a student raised on practical items and written questions. MCQ
  // flags are not migrated here — they stay in `nishany.qbank.marked.v1`, which
  // is live on every device and read in four places.
  /^nishany\.practice\./,
  // Every test the student has sat, of every kind, with what it was made of.
  // A list of what this student did: it follows the account and must never
  // reach the shared catalogue store.
  /^nishany\.sittings\./,
  /^nishany\.flashcards\./,
  /^nishany\.practical\./,
  /^nishany\.essay\./,
  /^nishany\.highlights\./,
  /^nishany\.annotations\./,
  /^nishany\.reader\./,
  /^nishany\.bookmarks\./,
  /^nishany\.progress\./,
  // Whether this student has completed the one-time Build Maristanas tour.
  // It follows the account across devices and must never become shared state.
  /^nishany\.maristanas\./,
  // The list of a student's own uploaded documents. Undotted it reached the
  // shared catalogue store, where the server refuses a student every read and
  // every write — so the demo build's document list was silently inert and the
  // live build spent a retry budget on a document it could never have.
  /^nishany\.myDocuments\./,
  /^nishany\.termgrid\./,
  // The redesign's new student documents: the calendar's task list, the
  // terminology "Got it" marks, and the study-room seat the student chose.
  /^nishany\.calendar\.tasks/,
  /^nishany\.terminology\./,
  /^nishany\.studyRooms\./,
  // Which guide topics this student has ticked off. Dotted and per-student, so
  // it is not to be confused with `nishany-tutorial-videos-v1` — the undotted,
  // admin-written document holding the video links every student reads.
  /^nishany\.tutorial\./,
]

export function isUserOwnedState(key: string): boolean {
  return USER_OWNED_PATTERNS.some((pattern) => pattern.test(key))
}
