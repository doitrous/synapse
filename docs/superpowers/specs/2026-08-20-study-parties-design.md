# Study parties — design

**Date:** 2026-08-20
**Status:** Approved, ready to plan
**Slice:** F of an eleven-part request

---

## Scope

Slices A+B and H are on `main`. C (essay questions) is in PR #16 and this
branch is stacked on it, because a party is meant to mix question-bank,
practical **and** essay material — without C there is nothing to mix.

### In scope

1. A **party**: a named group, confined to one university and year, that people
   join and stay in.
2. **One link per party**, and a switch between **Open to your year** and
   **Invite only**.
3. **Sessions** inside a party: a set of mixed items — questions, practical
   items, essay questions — that members work through.
4. A session can **sit open indefinitely** or be **scheduled to start**.
5. A party page: who is in, what is running, what has finished.

### Out of scope

Slice G (the word game), which builds on this. Chat, voice, and live presence:
a party is a place to study together, not a messaging product, and none of
those are needed for the studying.

---

## Decisions taken

### 1 · A party is a group that owns sessions

Asked whether a party should persist, be scheduled, or be a standing group with
many sessions, the answer was **all three** — and they are not three designs,
they are one:

- the **party** is the standing group, and it persists;
- a **session** inside it is the unit of work;
- a session either **sits open** from the moment it is made, or **starts at a
  time**.

So "persistent" and "scheduled" are a property of a session, not two kinds of
party, and the standing group is what holds them. One model covers all three
answers.

### 2 · The cohort is decided by the server, never by the client

A party belongs to one university and year, read from the joining student's own
record on the server. A client that asks for another cohort is not refused so
much as never consulted — the same rule the friends directory already follows.

This is what makes "open" safe: it means *open to the people already in your
year*, not open to the internet.

### 3 · One link, and visibility only decides who can find it

Every party has exactly one code, and it never changes. The switch is:

- **Open to your year** — anyone in the same university and year can find the
  party in a list and join it.
- **Invite only** — it appears in no list; the link is the only way in.

Flipping to Invite only does **not** rotate the link or remove anyone. It stops
the party being *discovered*; it was never a lock on the door. Saying so plainly
in the UI matters more than the mechanism, because a host who believes flipping
the switch ejects people will be wrong at the worst moment.

### 4 · A mixed session reports two numbers, not one

A question is marked by the server against the published answer. A practical
item and an essay are marked **by the student who did them** — that is why both
already record `correct: null`.

So a session that mixes them cannot honestly produce a single score. It reports
**what was marked** ("14 of 20 correct") and **what was practised** ("6 items
self-checked") separately. Averaging them would put self-reported work into a
number other people compare themselves against, which is exactly what the
`correct: null` convention exists to prevent.

### 5 · The item set is frozen when a session is made

As with study rooms: if it resolved live, an admin publishing or archiving
something mid-session would change what people were working on, and the
comparison afterwards would be over different material.

---

## 1 · Data

```sql
CREATE TABLE study_parties (
  id            VARCHAR(64) PRIMARY KEY,
  code          VARCHAR(12) NOT NULL UNIQUE,
  name          VARCHAR(255) NOT NULL,
  host_user_id  VARCHAR(64) NOT NULL,
  -- The cohort, copied from the host at creation. A party does not follow its
  -- host into a new year; the people in it are the year it was made for.
  university_id VARCHAR(64) NOT NULL,
  year          VARCHAR(32) NOT NULL,
  visibility    ENUM('open','invite') NOT NULL DEFAULT 'open',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  archived_at   DATETIME NULL,
  INDEX idx_parties_cohort (university_id, year, visibility, archived_at)
);

CREATE TABLE study_party_members (
  party_id  VARCHAR(64) NOT NULL,
  user_id   VARCHAR(64) NOT NULL,
  role      ENUM('host','member') NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (party_id, user_id),
  INDEX idx_party_members_user (user_id, joined_at)
);

CREATE TABLE study_party_sessions (
  id          VARCHAR(64) PRIMARY KEY,
  party_id    VARCHAR(64) NOT NULL,
  name        VARCHAR(255) NOT NULL,
  -- Frozen at creation: [{ kind: 'question'|'practical'|'essay', id }]
  item_refs   LONGTEXT NOT NULL,
  -- NULL means it is open from now, with no end.
  starts_at   DATETIME NULL,
  status      ENUM('open','scheduled','closed') NOT NULL DEFAULT 'open',
  created_by  VARCHAR(64) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at   DATETIME NULL,
  INDEX idx_party_sessions (party_id, status, starts_at)
);

/* Marked by the server for questions; for practical and essay items the
   student says how it went, so `correct` is NULL — the same rule the attempt
   log already follows, and the reason a session reports two numbers. */
CREATE TABLE study_party_answers (
  session_id  VARCHAR(64) NOT NULL,
  user_id     VARCHAR(64) NOT NULL,
  item_kind   VARCHAR(16) NOT NULL,
  item_id     VARCHAR(96) NOT NULL,
  correct     TINYINT(1) NULL,
  seconds     INT NULL,
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (session_id, user_id, item_kind, item_id)
);
```

`students.university_id` and `students.year` already exist and are what the
cohort is read from.

## 2 · The rules, kept where they can be tested

`server/src/partyRules.js`, pure and with no database:

- `canJoin(party, viewer)` — same cohort, not archived; **open or invited**
  decides discovery, the code decides entry
- `visibleTo(parties, viewer)` — the list a student may browse: their own
  cohort, open, not archived
- `sessionState(session, now)` — `scheduled` until its time, then `open`, then
  `closed`; a session with no `starts_at` is open from the moment it exists
- `tally(answers)` — `{ marked: { correct, of }, practised }`, the two numbers
  from decision 4, never combined

## 3 · The surfaces

**Study Together** gains a **Parties** tab beside Shared tests and Friends.

- **Your parties** — the ones you are in, each showing what is running now.
- **Open in your year** — parties you could join, absent entirely when there
  are none rather than showing an empty heading.
- **Join with a link** — paste a code.

**A party page** shows its name, its members, its one link with a copy button,
the visibility switch (host only), and its sessions: running, scheduled, and
finished.

**Making a session** picks a name, a mix of items — reusing the existing
`TopicChooser` for questions and simple pickers for practical and essay items —
and either *Open it now* or *Start it at…*.

**Sitting a session** runs each item in the form it already has: a question with
its options marked by the server; a practical item and an essay shown with their
own runners, self-checked. At the end, the two numbers, and who else has done
it.

## 4 · Verification

**Unit** — `server/src/partyRules.test.js`:

- a student from another university cannot join, even with the code
- a student from another year in the same university cannot join
- an invite-only party is not in the browsable list but can still be joined by
  code
- an archived party is neither listed nor joinable
- a session with no `starts_at` is open immediately
- a session with a future `starts_at` is scheduled, and open once that passes
- `tally` counts marked and practised separately and never averages them
- `tally` on an empty set reports nothing rather than zero of zero

**Server** — every handler takes the actor from the verified session; the cohort
comes from the student's own record; a client-supplied verdict is ignored for
questions.

**Browser** — create a party, copy its link, flip it to Invite only and confirm
it leaves the open list while the link still works, make a session mixing all
three kinds, sit it, and see the two numbers.

**Not verifiable here:** there is no database in this worktree, so no SQL in
this slice has ever executed. The pure rules are unit-tested; everything that
touches MariaDB is verified by reading. This is the same gap slice H shipped
with, and it is the first thing to exercise once it is deployed.
