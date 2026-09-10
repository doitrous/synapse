# Subscription gating

## What is gated
Every student page under `/app` requires an **active** subscription except the
free set in `src/lib/entitlement.ts` (`FREE_STUDENT_PATHS`):

- **dashboard** (index) — read-only home
- **Question of the Day** (`qotd`) — the free daily teaser
- **Account/Billing** (`account`) — must stay reachable so a student can subscribe
- **Study rooms & social** (`study-rooms`)
- **the paywall** (`upgrade`) itself

"Active" = entitlement `state` of `active` or `trialing` (`hasActiveAccess`),
mirroring the server's `entitlementOf` (`server/src/accounts.js`). New students
are auto-granted a trial at enrolment, so they are not paywalled on day one.

## How it is enforced — two layers

**Client (pages).** `src/components/auth/RequirePlan.tsx` wraps every gated route
(wiring in `src/router.tsx`). A lapsed/cancelled/never-subscribed student is
redirected to `/app/upgrade`. Staff previewing the student app and the demo
showcase are exempt (neither is a paying student).

**Server (content).** The real boundary. `callerHasActiveAccess`
(`server/src/accounts.js`) gates **answerable content** — full questions with
their answers, article and slice bodies, a single item, and the legacy
whole-ledger read — behind a live trial or subscription (`402
subscription_required`). Console roles are exempt (they preview). What stays
open is everything a student cannot study or answer from: `/api/content/summary`
counts, `/api/content/questions?view=summary` stems, the article index, and id
manifests — which is exactly what the free dashboard is built on.

## Rooms & social: bank activities are effectively subscribers-only
Study rooms and social are free, so a lapsed student can sit in a room. But a
shared test, party session or challenge draws on the question bank, and that
content is now gated: the participant's own client refuses to fetch it. So those
runners (`SharedTestRunner`, `PartySessionRunner`, `ChallengeRunner`) show
`ActivityLocked` (a subscribe prompt) to a student without access — in effect a
shared test only runs for the subscribers at the table, which is the intended
"all-active tables" rule, without exposing who is or isn't subscribed.

**Residual:** shared *games* (`/api/parties/:id/games`) draw on minigame packs
rather than the question bank and are not covered here; gate them the same way if
their packs should be paid. `/api/qbank/attempts` (recording) is intentionally
left open — it is used by the free dashboard heatmap and records no content.
