# Nishany — engineering rules

Read this before changing anything. The **Responsiveness doctrine** below is non-negotiable:
it is why the app feels instant, and every rule here is already load-bearing in the code.
Breaking one is a regression even when the feature "works." If a change cannot satisfy a
rule, say so and stop — do not quietly opt out.

---

## Responsiveness doctrine (hard rules)

The whole point: **pay for speed once, up front, then never again.** A student opens the app
and stays for an hour. Moving between screens, filtering a bank, and starting a test must fire
as little network as possible and must never block on a spinner the user has to watch.

These six rules come from studying a competitor (coursology) and matching them against what
Nishany already does. Most are already true — the rules exist to keep them true.

### 1. Navigation never blocks on a fetch

Every route is lazy-split **and** preloaded on intent. A click must land on code that is
already in memory.

- **How:** routes go through `lazyNamed` in [src/router.tsx](src/router.tsx); the returned
  component carries `.preload()`. Every navigation surface wires preload on
  `onMouseEnter` / `onFocus` / `onTouchStart` — see `preloadStudentRoute` and
  [src/components/shell/Sidebar.tsx](src/components/shell/Sidebar.tsx).
- **When you add a route or a link:** register it in the router's page map and wire preload on
  the link. A new nav entry that does not preload is an incomplete change.
- **Do NOT** "fix" perceived slowness by removing code-splitting and shipping one eager bundle.
  That trades a lean first load for a heavier one and is the opposite of this rule. Keep the
  split; make preload cover the link.

### 2. Read from an in-memory cache, not the wire, on navigation

Data a screen needs should already be in memory when the screen mounts. Entering a screen must
not trigger a fresh round-trip for data another screen already loaded.

- **How:** shared hooks hold the data (`useScopedPublishedQuestionSummaries`,
  `usePublishedQuestions`, `useQbankQuestions`). Reuse the existing hook; do not add a parallel
  fetch for data already in one.
- **When you need "the same data somewhere else":** lift it to the shared hook / cache, don't
  refetch.

### 3. Counts and filters are computed client-side — instantly, with no spinner

Every number that reacts to a filter (matching count, the target ring, per-subject tallies) is
a `.filter().length` over cached summaries, computed in the same frame. No filter toggle sends
a request.

- **How:** the hub reads the cheap summary projection
  (`useScopedPublishedQuestionSummaries`), and `BuilderSummary` renders `matching` / `pool` /
  `serving` from it — see [src/components/qbank/hub/BuilderSummary.tsx](src/components/qbank/hub/BuilderSummary.tsx).
- **Rule:** a filter/count interaction that hits the network, or shows a loading state, is a bug.
  If a count genuinely needs server data, cache that data once on mount and count against the cache.

### 4. Load heavy content lazily, scoped, and only when actually needed

The expensive payload (fully-built questions with options/explanations/attachments) is fetched
only when a sitting truly needs it, and only for the narrowest scope that covers it — never the
whole bank "just in case."

- **How:** `useQbankQuestions` keeps `fullQuestions` empty until `needsFullQuestions` flips on a
  real start/resume, and picks the narrowest `QuestionScope` (single subject when it can) —
  see [src/pages/student/qbank/useQbankQuestions.ts](src/pages/student/qbank/useQbankQuestions.ts).
- **Rule:** mounting a hub, opening a builder, or rendering a list must not pull heavy per-item
  content. Fetch it at the moment of use, scoped as tightly as the ids allow.

### 5. Mutations are optimistic, and the create call is lightweight

An action the user takes (start a test, save, toggle) should reflect in the UI immediately. The
server call that persists it should be small — persist the selection and return an id; it must
not be the thing that computes or returns the heavy result.

- **Rule:** transition the UI on intent, then reconcile when the server answers. A create/start
  path whose request must compute and return the full content before the UI can move is a
  regression — split it: cheap persist + id first, heavy content streamed after the transition
  (rule 4).
- **Failure handling:** an optimistic update must roll back visibly if the server rejects it.
  Optimism without rollback is a lie, not a feature.

### 6. First load may be heavier than the rest — protect the *steady state* first

The one-time first paint is allowed to cost more than in-app navigation, but do not let it bloat
unbounded. Keep shared/vendor code split, keep the initial route lean, and never regress rules
1–5 to shave the first load.

- **Rule of thumb:** if a change makes the first load lighter but adds a network wait to an
  in-app interaction, it is the wrong trade. Steady-state responsiveness wins.

---

## How to check yourself before finishing a change

- Did I add a route or nav link without wiring `.preload()`? (rule 1)
- Does entering a screen, or toggling a filter, fire a request that could have read from an
  existing hook/cache? (rules 2, 3)
- Does a hub/list/builder pull heavy per-item content it doesn't yet need? (rule 4)
- Does a user action wait on a server round-trip before the UI moves, with no optimistic path or
  no rollback? (rule 5)

If any answer is "yes," the change isn't done.
