# iOS Study Rooms — native real-time hall with mediasoup voice

Date: 2026-09-14
Status: design, awaiting approval
Branch: `claude/cortex-ios-port-79b661`

## Goal

Bring the iOS app's Study Rooms to parity with the web's current hall: a
real-time room a cohort shares, with live presence, public chat, private
DMs/@-whispers, and **voice channels** over the mediasoup SFU. Build the hall
and voice together (one feature), with a native-idiomatic UI (not the web's
illustrated 2.5D world).

## The one thing to get right: two systems share the name

- **Study Rooms hall** (what we port) = the **party** system: `server/src/parties.js`
  + `roomsRealtime.js` + `roomsSfu.js`; tables `study_parties` / `study_party_members`;
  a **raw WebSocket** at `/api/rooms/ws` plus a **mediasoup SFU**; REST under
  `/api/parties/*`.
- **"Study Together" shared quiz** (leave alone) = `server/src/studyRooms.js` +
  `routes/studyRooms.js`; REST `/api/study-rooms/*`; the current iOS
  `StudyTogetherView` / `StudyRoomModel` / `Core/Model/StudyRoom.swift`. A frozen
  MCQ set everyone answers at their own pace. It is reachable *inside* a hall as
  an "activity" but is a separate transport and feature. **Not touched by this
  work** (a later increment can surface it as an in-room activity).

The server side is already deployed and reachable in production: `GET
https://nishany.com/api/rooms/voice` returns `available:true` (announced
188.34.198.167, UDP/TCP 40000-40400, TURN on :3478). This is a pure iOS-client
build; no server changes.

## Scope (v1)

In:
- Lobby: create a room, join by code, list open/mine (REST `/api/parties/*`).
- Room: live presence roster; public chat; private DM / @-whisper; incoming
  speaking indicators; leave; minimize-to-dock (persist membership across
  navigation).
- Voice: join/leave voice, mic on/off (producer pause), hear everyone in the
  room, per-listener mute of a member, local voice-activity detection driving
  the speaking indicator.
- Block a student (REST `/api/friends`-style block; gates private chat
  server-side).

Deferred (YAGNI for v1, noted so the boundary is explicit):
- The illustrated 2.5D world, manual seat placement, shared **tables** and
  **table-scoped voice audience** (`roomVoiceScope.js`) — v1 produces/consumes
  with `audience:'room'` only (whole-room voice).
- Desk personalisation, table invitations, focus-session goals / hand-raise,
  the shared Pomodoro, in-room shared-quiz/game activities.

## Architecture / modules

All under `ios/Synapse`. Small, single-purpose units.

- `Core/Rooms/RoomChannel.swift` — the WebSocket client. Opens
  `wss://<host>/api/rooms/ws?code=CODE` with subprotocol
  `["nishany.bearer", <supabaseAccessToken>]`. JSON envelope; attaches an
  incrementing `requestId` and resolves replies by it (15s timeout); app-level
  `{type:"ping"}` every 20s; exponential backoff reconnect (1s→30s + jitter);
  close codes 4401 (not a member — stop), 4403 (evicted — stop + re-read),
  4500. Uses `URLSessionWebSocketTask`. Exposes an async stream of decoded
  inbound frames + a `send` that returns the correlated reply.
- `Core/Rooms/RoomMessages.swift` — Codable envelopes for every inbound/outbound
  frame (see Protocol appendix). One enum-of-structs per direction.
- `Core/API/SynapseAPI.swift` (extend) — REST party actions: `joinParty(code)`,
  `myParties()`, `createParty(...)`, `heartbeat(code:activity:)`,
  `setSeat(code:index:)`, `leaveParty(code/id)`; block via existing friends API.
- `Core/Rooms/RoomModel.swift` — `@MainActor @Observable`. Owns a `RoomChannel`,
  the roster (`members`), chat log, speaking set, and the `RoomAudio`. Merges
  socket `presence` with the REST snapshot. Sends chat/whisper, toggles mic,
  mutes members, leaves. Owns the 30s heartbeat and leave-on-exit.
- `Core/Rooms/RoomAudio.swift` — the mediasoup client wrapper over
  `mediasoup-client-swift` (`Device`, send/recv `Transport`, `Producer`,
  `Consumer`). Runs the 10-step handshake over the channel; configures
  `AVAudioSession` (`.playAndRecord`, `.voiceChat`); manages mic capture, the
  local producer (pause = mute), and one consumer per remote producer; reconciles
  consumers as `sfu:newProducer` / `sfu:producerClosed` arrive; rebuilds from
  step 1 on socket reconnect / `sfu:voiceReset`.
- `Core/Rooms/VoiceActivity.swift` — a simple RMS/threshold VAD over the mic tap
  (onset ~120ms, release ~400ms), emitting `{type:"speaking", speaking}` — the
  SFU never decodes audio, so speaking is client-detected, same as web.
- `Features/Rooms/RoomsLobbyView.swift`, `RoomView.swift`, `RoomChatView.swift`,
  `RoomRosterView.swift`, `RoomDock.swift` — the native UI.
- Wire into the **Study Rooms tab** (`SignedInView`), replacing the current
  shared-quiz `StudyTogetherView` as the tab's root (the shared-quiz stays in
  the codebase for a later in-room-activity surface).

## Dependency: mediasoup-client-swift (voice)

- Library: `VLprojects/mediasoup-client-swift` — a Swift API over
  libmediasoupclient (C++) + Google WebRTC, shipping prebuilt `.xcframework`s
  that cover devices **and** Apple-Silicon simulators. API matches
  `mediasoup-client` 3.x (`Device`, `createSendTransport`/`createRecvTransport`,
  `createProducer`, `Consumer`, `SendTransportDelegate.onConnect/onProduce`).
  Server is mediasoup `3.26.0` — protocol-compatible.
- Integration: **vendored `.xcframework`s**, not CocoaPods, not SPM.
  - CocoaPods is not installed here and the system Ruby is 2.6 (too old for
    current CocoaPods); installing it needs elevated setup. SPM is not supported
    by the library yet. Both CocoaPods and vendoring deliver the *same* prebuilt
    binaries, so runtime voice reliability on device is identical; vendoring
    keeps the existing SPM-only, `xcodebuild -project` toolchain intact.
  - The prebuilt xcframeworks (WebRTC, libmediasoupclient, libsdptransform, the
    Mediasoup wrapper) at a **pinned release** are added to the Xcode target as
    **Embed & Sign** binary frameworks. They are **gitignored** (100s of MB);
    `scripts/ios/fetch-mediasoup.sh` downloads the pinned release into
    `ios/Vendor/mediasoup/` so a fresh checkout / CI fetches them before build.
    `docs/ios/HANDOFF.md` documents the one-time fetch.
- Info.plist: add `NSMicrophoneUsageDescription` (EN + AR) and
  `UIBackgroundModes` `audio` (voice continues briefly when backgrounded).
  Entitlements unchanged. Never `CODE_SIGNING_ALLOWED=NO`.

## Protocol appendix (from the live server)

Transport: raw WebSocket, JSON frames, `requestId` echo, 16 KiB frame cap.

Inbound (server→client): `hello{userId,roomId,sfu{available,reason?,iceServers?}}`,
`presence{members:[{userId,displayName,role,seat?,lastActiveAt,activity}]}`,
`speaking{userId,speaking}`, `chat{id,from,text,at,private?,to?}`,
`archived{roomId}`, `error{requestId?,error}`,
`sfu:rtpCapabilities{rtpCapabilities,iceServers}`,
`sfu:createTransport{direction,id,iceParameters,iceCandidates,dtlsParameters,iceServers}`,
`sfu:connectTransport{ok}`, `sfu:produce{producerId}`,
`sfu:newProducer{producerId,userId}`, `sfu:producers{producers[]}`,
`sfu:consume{id,producerId,kind,rtpParameters,producerUserId}`, `sfu:resume{ok}`,
`sfu:pause{ok}`, `sfu:close{ok}`, `sfu:producerClosed{producerId,userId}`,
`sfu:unavailable{reason}`, `sfu:voiceReset`.

Outbound (client→server): `ping`, `presence:refresh`, `speaking{speaking}`,
`chat{text,to?}`, and the voice requests `sfu:rtpCapabilities`,
`sfu:createTransport{direction}`, `sfu:connectTransport{transportId,dtlsParameters}`,
`sfu:produce{transportId,kind:"audio",rtpParameters,audience:"room"}`,
`sfu:producers`, `sfu:consume{transportId,producerId,rtpCapabilities}`,
`sfu:resume{consumerId}`, `sfu:pause{producerId,paused}`, `sfu:close`.

Voice handshake order: (1) `sfu:rtpCapabilities` → `device.load`; (2)
`sfu:createTransport` send then recv; (3) `sfu:connectTransport` on the
transport `connect` event (DTLS); (4) `sfu:produce` on the transport `produce`
event → server broadcasts `sfu:newProducer`; (5) `sfu:producers` to list
current speakers; (6) `sfu:consume` per producer (**starts paused**, attach a
muted audio unit); (7) `sfu:resume` then unmute; (8) reconcile on
`sfu:newProducer`/`sfu:producerClosed`; (9) `sfu:pause` to mute/unmute own mic;
(10) `sfu:close` on leave. Handle `sfu:unavailable` (host with no SFU → show
voice unavailable) and `sfu:voiceReset` (rebuild from step 1).

Non-socket ops: heartbeat/seat/leave/join are REST `/api/parties/:code/*`;
per-listener **mute** is client-local (tells no one); **block** is REST and gates
whispers server-side.

## Permissions & audio session

- Mic permission requested on first voice join; if denied, the room still works
  for presence/chat with voice disabled and a prompt to enable in Settings.
- `AVAudioSession`: `.playAndRecord`, mode `.voiceChat`, `.defaultToSpeaker` +
  `.allowBluetooth`; activated on voice join, deactivated on leave. Interruptions
  (calls) pause voice and resume after.

## Verification plan

- **Hall (presence, chat, DM, block, dock, mic-toggle UI):** verifiable on the
  simulator by driving a **second headless WebSocket participant** (the
  `local-rooms-live-harness` approach) against the same room on production, so
  presence and chat round-trip visibly. Screenshots + logs.
- **Voice (actual audio):** cannot be exercised by simulator automation (two
  live mic participants). Build runs on the simulator; the handshake can be
  traced in logs (transports connect, produce/consume succeed) against the live
  SFU, but hearing audio needs **two real devices** — final voice sign-off is
  Omar's on hardware. This is the one accepted gap in the "verify live" rule and
  is called out at hand-off.

## Risks / open items

- Vendored binary size + the fetch-script onboarding step (documented).
- Simulator audio: mediasoup-client-swift builds for the arm64 simulator, but
  WebRTC mic capture on the simulator is unreliable — expect to trace the
  handshake there and confirm audio only on device.
- TURN reliability on mobile carriers (server already ships TURN creds; client
  just uses the handed `iceServers`).
- App Store: microphone usage + background-audio need the usage strings and an
  honest review note; no IDFA/tracking added.

## Out of scope

2.5D illustrated world, seat placement UI, shared-table voice scoping, desk
personalisation, table invitations, focus-session/hand-raise, shared timer,
in-room shared-quiz/game activities. Each can be a later increment on top of
this foundation.
