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
  /^nishany-notification-read-v1-/,
  /^nishany-applied-voucher-v1$/,
  /^nishany\.qbank\./,
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
]

export function isUserOwnedState(key: string): boolean {
  return USER_OWNED_PATTERNS.some((pattern) => pattern.test(key))
}
