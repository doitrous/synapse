# Student experience redesign — handoff (2026-09-02)

Landed from branch `claude/qbank-unified-builder` in one commit. Design canvas:
https://claude.ai/code/artifact/172d6764-da21-4f11-8811-907e4bb0a159 (artboards:
hubs, Question Bank directions, Study Room, topic chooser, dashboard hero,
tutorial guide, study rhythm).

## What changed (student app)

- **Shell.** Sidebar sections: Study (Plan, Learn) · Test yourself (Practice,
  Adaptive Study, Revise) · Together · You. Top bar: title-only breadcrumb;
  Pomodoro · Focus audio · Fullscreen · Tools (Search ⌘K, Hide menus, Keyboard
  shortcuts) · Bell · Avatar menu (portal switch, Account, Sign out). Below `sm`
  the study tools collapse into Tools. Focus mode parks the sidebar off-canvas;
  hovering the start edge slides it in. Shared focus trap in `src/lib/focusTrap.ts`
  (used by `Popover` and `Dialog`).
- **Dashboard.** Day strip (streak · reviews due · today's blocks · next exam),
  no ring, no button; "Start now" in Your next step is the only call to action.
- **Question Bank.** Bank-first hub (`?bank=`), Build a test / Previous tests,
  per-bank Draw from (All · Flagged · Missed), collapsed Question source
  (coming soon), quick-start card stack, typed sittings (`nishany.sittings.v1`),
  flags on every format (`nishany.practice.flags.v1`), per-bank progress panel
  (last 7 days, accuracy by subject), rebuilt topic chooser.
- **Calendar.** Toolbar: ‹ Month › Today · Month|Week · Layers popover · Add block.
- **Practice hub.** Question Bank · Practical (OSCE, cases, lab) · Oral questions
  (`/app/oral`) · Skills (`/app/skills`) · Essay · Histology (`/app/histology`,
  coming soon) · Adaptive Study (coming soon). `?tab=oral|skills|histology`
  redirect. Performance is marked coming soon (page shows a banner + preview).
- **Flashcards.** Study Rhythm: one centred stage; Weekly/Monthly are small
  squares; stats are one hairline strip. Cloze field has the full formatting
  toolbar; cloze text is sanitized HTML with `{{cN::…}}` markers as text (legacy
  plain-text notes unchanged). `sanitizeRich` is now idempotent (it used to
  multiply `&amp;`). Stats panel gated "coming soon" with a Preview.
- **Tutorial.** Hub selector (box tabs) · topic index · reader; `?hub=`/`?topic=`;
  read state `nishany.tutorial.read.v1`; 27 guides translated.
- **Study Rooms.** Seats, presence and speaking over a WebSocket hub
  (`/api/rooms/ws?code=`), mediasoup SFU, six new columns on
  `study_party_members` (boot migration), client hooks in `src/lib/rooms/`.
  Theme-aware hall (warm uses cream mist tokens). See `docs/rooms-voice.md`.
- **Admin.** Legal pages editor at `/admin/legal` (`nishany-legal-pages-v1`).
- **Arabic.** Every student-facing string through `t()`; new packages
  `adaptive`, `maristanas`, `university`, `performance`, `tutorial`, `qbankStats`;
  subject names via `useSubjectName`; relative time via `useRelativeTime`.
- **Mobile.** Probed at 390/768 × LTR/RTL; 16 px fields below 640 px; `dvh`;
  grid bases; 44 px targets.

## Deploying the voice server

`mediasoup` is an **optional** server dependency (the Alpine image cannot always
build its worker; the app boots without it and rooms fall back to polling +
"voice unavailable"). To enable voice: build on an image with `python3 make g++`
(or use a prebuilt worker), set `SFU_LISTEN_IP=0.0.0.0`,
`SFU_ANNOUNCED_IP=<public IP>`, open UDP/TCP `SFU_RTC_MIN_PORT`–`SFU_RTC_MAX_PORT`
(default 40000–40400), run a single replica, and provide `TURN_*` for students
behind strict NAT. The DB migration runs at boot; the room archive endpoint is
not implemented.

## Known gaps / follow-ups

- Keyboard sweep (WP19) landed partially — see `wp19-report.md` in the SDD
  workspace for what remains.
- Tutorial video durations need an admin field; the dashboard "block name" needs
  a schedule source; Adaptive/Maristanas sentence generators keep English
  count phrases.
- Direction-1 (`claude/student-dashboard-redesign` worktree) is superseded; only
  its warm-token retune matters and is included here.
