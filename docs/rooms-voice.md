# Study room voice — signalling, the SFU, and how to deploy it

A study room is a study party with a hall drawn over it. Until now the hall
could only ever show *you*: the room was polled over HTTP every four seconds,
the member record carried no seat, and "Join voice" opened your own microphone
and reached nobody.

This adds the two things that were missing — a live channel, and something in
the middle to mix the audio — plus the columns that let the hall show the room.

Nothing here is required for the rest of Study Rooms to work. A deployment with
no SFU still has seats, presence, speaking and every session and game the party
already had; the room says voice is unavailable and the microphone button still
shows you your own level. A deployment with no signalling at all falls back to
the four-second poll, exactly as before.

---

## 1. The pieces

| Where | What |
|---|---|
| `server/src/roomSeats.js` | Pure rules: what a seat may be, which desk is free, when a heartbeat has expired. Tested without a database. |
| `server/src/roomsRealtime.js` | The room hub (transport-agnostic, fully unit-tested) and the `ws` edge that binds it to the HTTP server. |
| `server/src/roomsSfu.js` | mediasoup: workers, one router per active room, transports/producers/consumers per member. Imported lazily. |
| `server/src/parties.js` | `setSeat`, `ensureSeated`, `recordActivity`, `partyMembers`, `resolvePartyId`. |
| `src/lib/rooms/roomChannel.ts` | Pure: parsing, the reducer that turns frames into room state, backoff, the socket URL. |
| `src/lib/rooms/useRoomChannel.ts` | The WebSocket, the retries, and request/response correlation. |
| `src/lib/rooms/useRoomAudio.ts` | The call: mic → producer, every other producer → an `<audio>` element. |

---

## 2. The database

Six columns on `study_party_members` and one unique index. Applied
automatically at boot by `migrate()` in `server/src/db.js` — the same
information-schema-lookup mechanism every other column added since launch uses,
so a database restored from a dump that already has them still boots. The
statements, for anyone applying them by hand:

```sql
ALTER TABLE study_party_members ADD COLUMN seat_desk      VARCHAR(16) NULL;
ALTER TABLE study_party_members ADD COLUMN seat_device    VARCHAR(16) NULL;
ALTER TABLE study_party_members ADD COLUMN seat_chair     VARCHAR(16) NULL;
ALTER TABLE study_party_members ADD COLUMN seat_index     TINYINT NULL;
ALTER TABLE study_party_members ADD COLUMN last_active_at DATETIME NULL;
ALTER TABLE study_party_members ADD COLUMN activity       VARCHAR(16) NULL;

CREATE UNIQUE INDEX study_party_members_seat_unique
  ON study_party_members (party_id, seat_index);
```

The unique index is what actually stops two students sitting at one desk.
MariaDB allows any number of NULLs in a unique index, so "in the room, nowhere
in particular" stays available to everyone, and a genuine race for desk 3 fails
as `ER_DUP_ENTRY` — which `setSeat` turns into a 409 — rather than as a read
that was true a millisecond ago.

Like `students_phone_unique`, the index is created separately from the columns:
on a database that somehow already holds duplicate seats it will fail loudly,
and that has to be an operator's decision rather than a column quietly left
unconstrained.

---

## 3. The HTTP routes

All of them take **either** a party id or a room code in the path — every route
that existed before is addressed by id, the browser's address bar carries the
code, and `resolvePartyId` accepts both so nothing has to translate.

| Route | Body | Answers |
|---|---|---|
| `PATCH /api/parties/:code/seat` | `{ desk?, device?, chair?, seatIndex? }` | `{ ok, party }`; **409** `seat_taken`; 404 not a member; 400 `invalid_desk` / `invalid_device` / `invalid_chair` / `invalid_seat_index` |
| `POST /api/parties/:code/seat/claim` | — | `{ ok, seatIndex, party }` — idempotent; `seatIndex: null` when the room is full |
| `POST /api/parties/:code/heartbeat` | `{ activity: 'studying' \| 'idle' }` | `{ ok, activity }` |
| `GET /api/parties/:code/members` | — | `{ members }` — the same list the socket broadcasts |

**Every key in the body follows the same rule: absent means "leave it alone",
and an explicit `null` means "nothing chosen".** So `PATCH { desk }` changes only
the desk and does not stand the member up, and `PATCH { seatIndex: 7 }` — the
obvious shape of a "move me to desk 7" control — moves them without wiping their
furniture. Only the columns actually named appear in the `SET` list; a body that
names nothing is a no-op.

`GET /api/parties/:id` (unchanged route) now returns each member as:

```json
{
  "userId": "…", "displayName": "…", "role": "member", "joinedAt": "…",
  "seat": { "desk": "corner", "device": "android", "chair": "stool", "seatIndex": 3 },
  "lastActiveAt": "2026-09-02T12:00:00.000Z",
  "activity": "studying"
}
```

`seat` is `null` for a member who has chosen nothing. `activity` is what the row
*means* now — a heartbeat older than two minutes reads `idle` however loudly it
claimed otherwise. `lastActiveAt` is **not** the column value: it is rebuilt as a
UTC instant from `TIMESTAMPDIFF(SECOND, last_active_at, NOW())`, so the browser
can make the same judgement against its own clock without the column, the driver
and the Node process having to agree about a timezone.

---

## 4. The wire protocol

**Endpoint:** `GET /api/rooms/ws?code=<party code or id>` — an upgrade on the
same HTTP server and the same origin as the API. One socket per open room.

**Authentication:** the Supabase bearer token, presented as a WebSocket
subprotocol, because a browser cannot set an `Authorization` header on a
WebSocket and a token in a query string is a token written into every proxy log
it passes:

```js
new WebSocket(url, ['nishany.bearer', accessToken])
```

An `Authorization: Bearer …` header is also accepted, for non-browser clients.
The token is resolved by `identityFromToken` in `auth.js` — the *same* function
`apiAuthGate` uses, so a socket can never admit somebody the API would refuse.
Membership is then the same check `partyFor` makes.

A refusal at the door is delivered **after** the handshake as close code
**4401**. Authorization is then re-decided rather than remembered: the room's
roster is re-read on every seat write, every heartbeat, every join and drop, when
a member leaves the party, and on the 25 s tick — and a socket whose owner is no
longer a member, or whose room has been archived, is closed with **4403**, its
SFU peer torn down and the room's presence rebroadcast. A failure on our side
(a database that blinked) closes that one socket with **4500** and nothing else.
Both 4401 and 4403 stop the client's retry loop; only 4403 makes it re-read the
party.

The roster for all of this is read on the server's own authority, never as one
of the connected sockets: reading it as an arbitrary member meant that one
socket belonging to somebody who had since left would answer "not a member" and
silence presence for the whole room until that socket happened to close.

Every refusal is a close code rather than a failed handshake, because a failed
handshake is an opaque "connection error" in every browser while a close code is
something the client can read and act on — and the client does: it stops
retrying, falls back to polling, and (on 4403) re-reads the party, rather than
looping forever on a request that will never succeed.

### Server → client

| Frame | When |
|---|---|
| `{ type: 'hello', userId, roomId, sfu: { available, reason?, iceServers? } }` | Immediately on admission |
| `{ type: 'presence', members: [...] }` | On admission, on any join/leave, and whenever a seat or heartbeat route fires |
| `{ type: 'speaking', userId, speaking }` | Relayed from a member, and `false` when their socket drops |
| `{ type: 'sfu:newProducer', producerId, userId }` | Somebody started sending audio |
| `{ type: 'sfu:producerClosed', producerId, userId }` | They stopped, or their socket went |
| `{ type: 'sfu:unavailable', requestId?, reason }` | Any `sfu:*` request on a host with no SFU |
| `{ type: 'archived', roomId }` | The room was archived or deleted — the socket closes with 4403 immediately after |
| `{ type: 'error', requestId?, error }` | A request that threw |

### Client → server

| Frame | Reply |
|---|---|
| `{ type: 'ping' }` | `{ type: 'pong' }` |
| `{ type: 'presence:refresh' }` | `presence` |
| `{ type: 'speaking', speaking }` | broadcast (the sender's own id is attached by the server — a client cannot claim somebody else is talking) |
| `{ type: 'sfu:rtpCapabilities' }` | `{ rtpCapabilities, iceServers }` |
| `{ type: 'sfu:createTransport', direction: 'send' \| 'recv' }` | `{ id, iceParameters, iceCandidates, dtlsParameters, iceServers }` |
| `{ type: 'sfu:connectTransport', transportId, dtlsParameters }` | `{ ok: true }` |
| `{ type: 'sfu:produce', transportId, kind, rtpParameters }` | `{ producerId }`, plus `sfu:newProducer` to everyone else |
| `{ type: 'sfu:producers' }` | `{ producers: [{ producerId, userId }] }` — who was already talking when you walked in |
| `{ type: 'sfu:consume', transportId, producerId, rtpCapabilities }` | `{ id, producerId, kind, rtpParameters }` — **started paused** |
| `{ type: 'sfu:resume', consumerId }` | `{ ok: true }` |
| `{ type: 'sfu:pause', producerId, paused }` | `{ ok: true }` — what Mute does |
| `{ type: 'sfu:close' }` | `{ ok: true }`, plus `sfu:producerClosed` to the room |

Any frame may carry a `requestId`; the reply echoes it, so two requests in
flight cannot be confused for one another. An unknown `type` is ignored rather
than answered — it is a client or a server from another version, not an attack.

The server pings every 25 s and terminates a socket that missed the previous
round, so a phone that went into a tunnel leaves the hall rather than standing
in it forever. The client reconnects with backoff 1 s → 30 s (plus jitter, so
twenty students dropped by one flaky router do not all return in the same
millisecond).

While the socket is open the client **stops** the four-second party poll: the
socket has already pushed everything the poll would ask for. The poll resumes
the moment the socket closes.

---

## 5. Deploying the SFU

### Environment

| Variable | Default | What it is |
|---|---|---|
| `SFU_ANNOUNCED_IP` | *(none)* | **The public IP of this machine.** Required in production. |
| `SFU_LISTEN_IP` | `0.0.0.0` | The interface the media sockets bind to. |
| `SFU_RTC_MIN_PORT` | `40000` | Bottom of the media port range. |
| `SFU_RTC_MAX_PORT` | `49999` | Top of it. |
| `TURN_URLS` | *(none)* | Comma-separated `turn:`/`turns:` URLs. |
| `TURN_USERNAME` | *(none)* | |
| `TURN_CREDENTIAL` | *(none)* | |

There is deliberately **no default for `SFU_ANNOUNCED_IP`**. It is the address
other people's browsers dial; a guess would produce a room that connects on the
server host and nowhere else — which is indistinguishable, from a student's
chair, from voice being broken. The server logs a warning at boot when it is
unset in production, and `GET /api/rooms/ws` still works: only the audio fails.

The three TURN variables are all-or-nothing. A URL with no credential is not a
relay, it is a connection attempt that fails slowly, which is worse than never
trying.

### Ports

WebRTC media does **not** go over the HTTP port. Open, on the host firewall and
in Coolify's port mapping for this application:

- **UDP 40000–49999** (the media itself)
- **TCP 40000–49999** (the fallback for networks that block UDP)
- the existing HTTP port, which already carries `/api/rooms/ws`

Size the range by **four ports per member in voice** — a send and a receive
transport, each binding UDP and TCP. The 10 000-port default is about 2 500
concurrent speakers across every room on the host, which clears a few hundred
students spread across many rooms with all of them in voice at once. (Earlier
drafts defaulted to 101 ports — twenty-five speakers — and then 401 — a hundred;
both were a trap the moment more than one room filled.) mediasoup binds a port
only when a member actually joins voice, so a wide range costs nothing until it
is used. A peer is capped at two transports; asking for a third replaces the one
facing the same direction, so a member cannot take the range by looping
`sfu:createTransport`.

If the range is changed, change it in three places: `SFU_RTC_MIN_PORT` /
`SFU_RTC_MAX_PORT`, the host firewall, and Coolify.

### TURN is not optional

STUN alone (the default `stun:stun.l.google.com:19302`) fails behind symmetric
NAT and on many mobile carriers — which is most of the students this is for. A
`coturn` server is required for voice to be *reliable*, and it is the line item
with a running cost: bandwidth per relayed minute. Without it a good fraction of
rooms will connect for some members and not others, which is a worse experience
than no voice at all, because it looks like the app is broken rather than
unfinished.

### The native worker

mediasoup ships a native worker binary. It is loaded with a lazy `import()`
inside a `try`, and a host that cannot run it gets
`{ available: false, reason }` — the server boots, the room opens, presence and
seats work, and the room says voice is unavailable with the reason. Check the
boot log:

```
Study room signalling ready, voice ready
Study room signalling ready, voice unavailable (<reason>)
```

The Docker image must be able to run that binary. It builds and runs on
Debian/Ubuntu-based Node images; an Alpine (musl) image needs the prebuilt musl
worker or a build toolchain.

---

## 6. Verifying it, with two browsers

1. Deploy with `SFU_ANNOUNCED_IP` set and the UDP range open. Confirm the boot
   log says **voice ready**.
2. Sign in as **two different students in the same university and year** — two
   browsers, or one normal and one private window. A party is confined to a
   cohort; two accounts in different years cannot be in one room, and that is
   the first thing to check when a room "does not work".
3. Student A: Study Rooms → create a room → copy the link.
4. Student B: open the link. Within a frame — not four seconds — student A's
   hall should show a second desk. **This alone proves the signalling channel**,
   with or without an SFU.
5. Both: click a desk → Customise → change desk, device and chair → Save. Each
   change should appear in the other browser immediately, at the same desk.
6. Both: press **Join voice** and allow the microphone. The inset saying voice
   is unavailable should disappear and be replaced by "You are in the room's
   voice."
7. Talk into A's microphone. B should hear it, and B's hall should light the
   ring on A's desk. Then the reverse.
8. Press **Mute** on A. B stops hearing A, and A's ring goes out in both
   browsers.
9. Close B's tab. Within about 25 s A's hall should lose B's desk (sooner if the
   tab closed cleanly, which sends a close frame).

If step 4 works and step 7 does not, the problem is the SFU, not the channel:
check `SFU_ANNOUNCED_IP`, the UDP range, and — if the two browsers are on
different networks — TURN.

---

## 7. What is not here

- **No recording, and no server-side audio processing.** The SFU forwards
  packets; it never decodes them. Speaking detection is an analyser on your own
  microphone, and its result is broadcast as a boolean.
- **No per-room voice permission.** Anybody who may enter the room may talk in
  it. Rooms are cohort-confined and code-gated, which is the same protection the
  sessions and games already rely on.
- **No adaptive bitrate or simulcast.** Opus only, one quality.
- **The SFU is single-process.** Workers scale across the CPUs of one host;
  running two API replicas would put two members of one room on two SFUs that
  cannot hear each other. Voice needs either one replica or a shared
  media server before the API is scaled out.
