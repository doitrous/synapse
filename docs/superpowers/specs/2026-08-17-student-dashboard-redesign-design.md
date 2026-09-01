# Student dashboard, library and resources — design

Date: 2026-08-17

Eight changes to the student side of the app, agreed in brainstorming. Each is
independent of the others except where noted, and each says what it replaces.

## 1. Next on your schedule reads both calendars

`NextOnSchedule` reads `useStudentSchedule()` alone, which is the timetable an
admin published for the student's year. A student whose university has published
nothing sees the empty state permanently, no matter how full their own calendar
is — and their own blocks are the only thing many students have.

A new hook, `useNextUp()`, merges two sources into one chronological list:

- published module sessions (`useStudentSchedule`), and
- the student's own blocks (`nishany.calendar.blocks`, via `studyBlocks`).

Both collapse to one shape, `UpcomingItem`, carrying `source: 'faculty' |
'personal'`. The merge, the "what counts as still to come" rule, and the
ordering are pure functions in `src/lib/upcoming.ts` and are tested there.

The card shows the genuine next item whichever source it came from, marked by
source, and names the one or two that follow. "Add to plan" stays for a faculty
session — it is what copies a session into the student's own blocks — and a
personal block gets "Tick off" instead, writing `done` back to the same record
the calendar and the agenda read. The empty state appears only when both sources
are empty, and says which of the two is missing.

## 2. Today's view becomes one agenda

`TodaysSchedule` draws two rails of percentage-positioned bars. Every label is
squeezed into a two-or-three letter code with the full title in a hover tooltip,
which is unreadable on a phone and unavailable on a touch screen at all.

It is replaced by a single chronological agenda for today: start time, title,
source marker, duration, with the student's own blocks tickable in place. A
now-divider sits between the rows it falls between and moves on a minute
interval. Past items are dimmed rather than removed, because "what have I
already missed" is the question this screen is most often asked.

`TodaysPlanList` keeps its job — the checklist with its progress meter — and
loses the duplicate rendering of the same blocks.

## 3. A 401 during boot leaves the library empty

`errorKind` maps 401 to `unauthorized`, and `isRetryable` treats it as terminal
alongside `forbidden`. That is right for a refusal and wrong for this one: a
state read that goes out before the Supabase session has been restored, or while
its access token is being refreshed, gets a 401 that would have succeeded a
moment later. `hydrate()` then marks the document failed and never reads it
again, and nothing re-reads it when the session arrives. Every catalogue
document is read exactly once per boot, so the library — and the question bank,
and the taxonomy — stay empty until the student reloads the page by hand. This
is what "it was empty, now it is fine" looks like from the inside.

Three changes:

- `isRetryable('unauthorized')` becomes true. `forbidden` stays terminal: a
  student asking for an admin-only document will be refused identically forever.
- `stateStore.hydrate` bounds unauthorized retries and backs off, so a genuinely
  signed-out browser does not ask forever.
- `stateStore` exports `rehydrateFailed()`, which `IdentityProvider` calls when
  identity resolves to authenticated. A session arriving is the event that makes
  a previously refused read worth trying again.

`apiErrors.test.ts` covers the classification and the retry rule.

## 4. The account page and the sidebar tell the same story

`Account.tsx` reads `identity.profile` — the roster row, which for most accounts
is absent. `Sidebar.tsx` reads `identity.audience` — the roster merged with what
the student told onboarding. So the sidebar says "KAU · Year 1" while the
account page says every field is "Not recorded". Both will read `audience`.

University, year and group become editable on the account page, saved to
`nishany.account.audience.v1` — the same user-owned document onboarding writes,
so the two cannot disagree. Precedence in `useIdentity` flips: the student's own
answer wins over the roster. Where the roster holds a different value, the field
shows what the university has on record underneath, so an override is visible
rather than silent. Name and email stay read-only; they are identity, not
context, and changing them means changing the Supabase account.

## 5. Library chrome

Three faults, all in the library header:

- The toggle that collapses the topic rail sits at the far right of the header,
  the full width of the page away from the rail it controls. It moves to the
  left of the header, above the rail.
- Both toggles are the same three lines, so nothing distinguishes the one that
  opens a horizontal strip of views from the one that opens a vertical tree.
  `MenuToggle` gains a `direction` prop: a chevron pointing the way the menu
  will open — right for the horizontal strip, rotating down when open; right for
  the rail, rotating back when open.
- The rail appears and disappears by swapping a grid template, which snaps. It
  animates instead — width and opacity, ~180ms, and not at all under
  `prefers-reduced-motion`.

## 6. Highlighter and anchored sticky notes in the library

The PDF reader's annotation store is page-space coordinates on a canvas and has
no meaning for an HTML article. But the library already anchors media to a
phrase by matching its quote (`anchorSegments`), and that mechanism generalises.

**Anchor.** `src/lib/library/textAnchor.ts` — a mark records the block it sits
in (`summary`, `body:3`, `hold:1`, `trap:0`), the exact selected text, and up to
32 characters of prefix and suffix. Quote alone is not enough: the same phrase
can occur twice in a block, and the existing media matcher silently takes the
first. Resolution scores every occurrence by how much of its context matches and
takes the best. A mark that no longer resolves — because the article was edited
— is not dropped: it is reported as orphaned and listed in the sidebar with the
text it was made on.

**Segments.** One builder merges media anchors and student marks into a single
non-overlapping, ordered segment list per block, so the two cannot fight over
the same phrase. First-come wins on overlap, as the media matcher already does.
Both the anchor resolution and the segment merge are pure and tested.

**Interaction.** Selecting text in an article raises a small floating toolbar at
the selection: highlight tones, "Add note", and remove when the selection lands
on an existing mark. A highlight renders as tinted text; a note renders as
tinted text with a note glyph, and opens a popover to read, edit or delete.
Escape dismisses. Every mark is a real button, so the whole feature is reachable
from the keyboard.

**Palette.** `NOTE_TONES` from `src/lib/reader/annotations.ts` — the same tones
as the PDF reader's sticky notes and the whiteboard, so there is one palette in
this app rather than three.

**Storage.** One document, `nishany.library.marks.v1`, keyed by article id.
Marks are a quote and a short note; a whole library of them is tens of
kilobytes, so the sharding the PDF annotations need would be machinery for
nothing here. `isUserOwnedState` currently matches only
`nishany.library.(read|userArticles|personalTags)`, which would route this key
to the shared admin-only store and refuse every student's save. The pattern is
extended, and the rule gets a test.

Out of scope: surfacing these marks in the Notebook or the command bar.

## 7. Previous tests carry their own numbers

A previous test shows a name, a date, a question count and one accuracy figure,
and its only actions are behind a "…" menu. Everything else the student would
want is already in the attempt log and simply never read back.

Each row expands to show, for that sitting: right, wrong and unmarked counts,
accuracy, total time, median seconds per question, a per-subject and per-topic
breakdown, and the weakest topic in it. All of it derives from
`attemptStats.ts`, which already has the functions — they are called over the
sitting's records rather than the whole history.

Actions are promoted out of the menu: **Retake these questions** replays the
exact items from that sitting as a new session, and **New test, same scope**
draws fresh questions from the same subjects. Review answers, Rename and Delete
remain.

The weakest-topic rule from `weakest()` is kept: a group needs three marked
attempts before it can be called a weakness, so a single unlucky item never
sends a student to revise a topic they know.

## 8. Kasr Al Ainy modules, years 1 to 5

In live mode the university catalogue is read from the server, so a code seed
cannot reach production. Both paths are therefore covered:

- `src/data/universities.ts` seeds the modules for demo mode.
- `docs/import-ready/academic/kau-modules.md` is written in the Academic Import
  wizard's format (year, term, module, module_id) for an admin to apply at
  `/admin/academic/import` against KAU — the same route the content batches take.

Module IDs are scoped per year, because Year 5 repeats SURG, IM and FM from
Year 4 and the importer refuses a duplicate id by appending `-2`, which would
produce an id no student recognises. Year 3's "314" and "319" are recorded with
those codes as their names until better ones are supplied.
