/**
 * Runtime gaps left by the old-device floor (iOS 15.4+ / Android Chrome 90+,
 * see `build.target` in vite.config.ts).
 *
 * `crypto.randomUUID` is already feature-detected at every call site (see
 * `StudyActivityTracker.tsx`, `AcademicIntakePage.tsx`), so nothing to do
 * there. `structuredClone` (Chrome 98 / Safari 15.4) is the one hard
 * blocker — it is called unconditionally throughout the app (draft editors,
 * whiteboard snapshots, the adaptive config) — so it gets a real fallback
 * rather than a feature check at every one of those call sites.
 *
 * Imported first, before anything else, in main.tsx.
 */
if (typeof structuredClone !== 'function') {
  // JSON round-trip: loses `Date` (becomes a string), `Map`/`Set` (become
  // `{}`), functions, and circular references. Nothing this app hands to
  // structuredClone today is any of those — it clones plain data drafts — so
  // this is the whole fallback rather than a hand-rolled deep clone.
  ;(globalThis as { structuredClone?: <T>(value: T) => T }).structuredClone = (value) =>
    JSON.parse(JSON.stringify(value))
}
