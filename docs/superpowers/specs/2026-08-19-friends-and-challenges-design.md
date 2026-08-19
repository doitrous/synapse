# Friends and challenges — design

**Date:** 2026-08-19
**Status:** Approved, ready to plan
**Slice:** H of an eleven-part request

---

## Scope

Slice A+B shipped as PR #9. This is slice H, brought forward at the owner's
request ahead of C–G.

### In scope

1. A **friend graph** — request, accept, decline, remove — between student
   accounts.
2. A **Friends tab** under Study Together listing your friends, your pending
   requests, and people you can add.
3. Two ways to find someone: an **invite link**, and a **directory of your own
   university and year**.
4. **Connect Facebook** — account linking, plus friend matching that stays dark
   until Meta approves it.
5. **Study together**: start a shared test with a friend directly, without
   passing a code around.
6. **Challenge**: send a friend the same frozen paper, sit it separately, and
   open a head-to-head once both have finished.

### Deliberately out of scope

Slices C–G (essay questions, flashcards, histology, study parties, the word
game) are unchanged and still ordered as in the A+B spec. Slice H was
originally sequenced after F because parties were to be the social surface;
it turns out not to need them — Study Together already exists, and the friend
graph attaches to it directly.

---

## The decision that shapes everything

**Facebook cannot be the way friends are found, only a faster way.**

Meta's `user_friends` permission returns only friends who have *also* signed
into this app *and* granted the same permission. Even fully approved, a
student's list is empty until their friends arrive. Shipping the tab as a
Facebook feature would mean shipping an empty screen.

It also cannot ship at all until App Review passes, which needs Business
verification, a live privacy policy URL, a data-deletion callback, and a
screencast of the feature already working — recorded in dev mode, where it
works only for app admins and testers. None of that is code, and none of it is
on our schedule.

So the friend graph is the product and Facebook is one input to it. The tab
works on day one through invite links and the university/year directory;
`FEATURE_FACEBOOK_FRIENDS` turns matching on when approval lands, changing what
the "Connect Facebook" button does but nothing else.

---

## Decisions taken

1. **Friendship is mutual**, not a follow. A request is sent, and the other
   student accepts or declines. Challenges and shared tests both assume both
   people agreed.
2. **A challenge is the same paper, sat separately.** One student picks a
   scope; the paper is frozen at that moment; both sit it at their own pace;
   the head-to-head opens only once both have finished. Live racing was
   considered and rejected: it needs both people free at once and a live
   connection, and a dropout leaves the result undecided. This app is used on
   Egyptian mobile data, often in short gaps between classes.
3. **Discoverability is a setting, and Facebook is strictly opt-in.**
   - In the **directory**, a student is findable by their own university and
     year by default, with a clear toggle in Account. That cohort is already
     closed — a study room only ever offered questions the student is licensed
     to see — and being findable by your own classmates is the point of the
     feature.
   - **Facebook matching is off until explicitly connected.** Meta requires
     explicit consent, and so does decency: telling someone which of their
     Facebook friends use a medical study app is a disclosure about those
     friends, not about them.
4. **Store as little of Facebook as possible.** The app-scoped Facebook user id
   and the matched friend ids, and nothing else. Name, photo and email are
   already held for the account; copying Facebook's versions would widen the
   privacy surface for no gain.

---

## 1 · Data

### Server

```sql
CREATE TABLE friendships (
  -- Ordered pair: lower id first, so a pair can only exist once and
  -- "are we friends" is one lookup rather than two.
  user_a       VARCHAR(64) NOT NULL,
  user_b       VARCHAR(64) NOT NULL,
  requested_by VARCHAR(64) NOT NULL,
  status       ENUM('pending','accepted','declined') NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME NULL,
  PRIMARY KEY (user_a, user_b),
  INDEX idx_friendships_b (user_b, status)
);

CREATE TABLE friend_invites (
  token      CHAR(32) PRIMARY KEY,
  user_id    VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  used_by    VARCHAR(64) NULL,
  INDEX idx_friend_invites_user (user_id)
);

CREATE TABLE facebook_links (
  user_id      VARCHAR(64) PRIMARY KEY,
  fb_user_id   VARCHAR(64) NOT NULL UNIQUE,
  linked_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Meta requires a data-deletion callback; this records that we honoured one.
  unlinked_at  DATETIME NULL
);

CREATE TABLE challenges (
  id            VARCHAR(64) PRIMARY KEY,
  challenger_id VARCHAR(64) NOT NULL,
  opponent_id   VARCHAR(64) NOT NULL,
  -- Frozen at creation, exactly as study_rooms.question_ids is, so publishing
  -- or archiving a question mid-challenge cannot change what is being compared.
  question_ids  LONGTEXT NOT NULL,
  scope_label   VARCHAR(255) NOT NULL,
  status        ENUM('sent','declined','running','complete') NOT NULL DEFAULT 'sent',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_challenges_opponent (opponent_id, status),
  INDEX idx_challenges_challenger (challenger_id, status)
);
```

Challenge answers reuse `study_room_answers`' rule rather than its table: the
server marks each answer against the published question and stores the verdict.
A score another student sees is never self-reported.

`students.discoverable` (boolean, default true) carries decision 3.

### Ordered pairs

Every friendship read and write goes through one helper that sorts the two ids
before touching the table. Two rows for one friendship is the bug this shape
exists to prevent, and it is the kind that only shows up once two people press
Add at the same moment.

---

## 2 · Finding someone

**Invite link.** `friend_invites` mints a 32-character token, valid 14 days,
single use. Opening it while signed in sends a request; while signed out it
survives the sign-up and fires afterwards. This is the path that works with no
Facebook, no directory, and no shared university.

**Directory.** Students in your own university and year who have not turned
discoverability off, searchable by name, excluding existing friends and anyone
you have a pending request with. Never paginated by "everyone" — the query is
always bounded by the caller's own cohort, on the server, from the verified
session rather than anything the client sends.

**Facebook.** Connect links the account; matching is a server-side intersection
of the caller's Facebook friend ids against `facebook_links`. Until
`FEATURE_FACEBOOK_FRIENDS` is on, the button explains plainly that matching is
waiting on Meta's review and offers the invite link instead — it does not
pretend to be broken.

---

## 3 · The Friends tab

A tab beside the existing Study Together content. Four sections, each absent
rather than empty when it has nothing:

- **Requests** — incoming first, with Accept / Decline; outgoing shown as
  pending so a student knows it was sent.
- **Your friends** — each row offering **Study together** (a shared test,
  pre-joined, no code to pass around) and **Challenge**.
- **Find friends** — the invite link with a copy button, the directory search,
  and Connect Facebook.
- **Challenges** — incoming to accept, yours in progress, and finished ones
  with their head-to-head.

## 4 · A challenge

1. The challenger picks a scope with the existing `TopicChooser` and a length.
   The paper is frozen at that moment.
2. The opponent sees it in Challenges and accepts or declines.
3. Each sits the same paper independently. Answers are marked by the server.
4. When **both** have finished, the head-to-head opens: each score, time taken,
   and which questions each one lost — the interesting part, because a question
   one got and the other missed is exactly what is worth discussing.
5. Before both finish, each sees only their own progress. Showing a running
   score would let the second student decide whether it is worth trying.

Both sittings write to the attempt log under the existing `room` surface, so a
challenge counts toward mastery and accuracy like any other marked work.

---

## 5 · Privacy and the Meta obligations

- A student can **disconnect Facebook** at any time; the row is soft-marked and
  the friend ids are dropped.
- A **data-deletion callback** endpoint is required by Meta for approval and is
  built with the link, not after it.
- Discoverability is a **student-facing setting** in Account, not a hidden
  default.
- The directory is always scoped to the caller's own university and year, from
  the verified session — a client that asks for another cohort is refused, not
  trusted.
- Nothing about a student's performance is visible to a friend except a
  challenge they both agreed to sit.

---

## 6 · Verification

**Unit** — pure modules, tested as this repo tests (`node --test`, relative
`.ts` imports):

- the ordered-pair helper: same pair either way round, and a self-friendship
  refused
- request state machine: pending → accepted / declined; a second request while
  one is pending is not a second row; re-requesting after a decline is allowed
- invite tokens: expired refused, used-once enforced, self-redemption refused
- challenge readiness: the head-to-head opens only when both sides are finished
- the head-to-head diff: which questions each side lost

**Server** — the directory refuses a cohort other than the caller's; challenge
answers are marked server-side and a client-supplied verdict is ignored.

**Browser** — two accounts: send, accept, start a shared test, send a
challenge, both sit it, and confirm the comparison appears only after the
second finishes.

**Not verifiable here:** live Facebook matching, which needs an approved Meta
app. The link flow is testable in dev mode with a test user; the intersection
is unit-tested against a stubbed friend list.
