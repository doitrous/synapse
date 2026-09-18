# iOS Study Rooms — native hall + mediasoup voice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the iOS "Study Together" tab with a native Study Rooms hall at parity with the live site — live presence, public chat, private DM/@-whisper, block, minimize-to-dock — and add voice channels over the production mediasoup SFU.

**Architecture:** A pure, unit-tested protocol core (`RoomMessages` + a `reduceChannel` port) drives a `URLSessionWebSocketTask` client (`RoomChannel`) that authenticates with the `nishany.bearer` subprotocol. REST party actions extend `SynapseAPI`. A `@MainActor @Observable RoomModel` merges the socket with the REST snapshot and owns the heartbeat and audio. Voice is a thin wrapper (`RoomAudio`) over the vendored `mediasoup-client-swift` xcframeworks running the 10-step handshake over the channel; speaking is client-side VAD. Native SwiftUI, no 2.5D world.

**Tech Stack:** Swift 6, SwiftUI, `@Observable`, Swift Testing (`@Test`/`#expect`), `URLSessionWebSocketTask`, `AVAudioSession`, vendored `mediasoup-client-swift` 0.13.2 xcframeworks (WebRTC + libmediasoupclient + libsdptransform + wrapper).

**Spec:** `docs/superpowers/specs/2026-09-14-ios-study-rooms-voice-design.md`

## Global Constraints

- Build in THIS worktree only (`.../.claude/worktrees/zen-agnesi-989cba`); never the main checkout.
- Stage only `git add ios/` (plus `docs/ios/HANDOFF.md` when editing the handoff, and `docs/superpowers/plans/...` / `scripts/ios/...` for their own tasks). Never touch `package.json` or `scripts/kasr/`.
- Re-fetch `origin/main` and rebase before every push: `GIT_SSH_COMMAND='ssh -i ~/.ssh/id_hetzner -o IdentitiesOnly=yes' git fetch origin && git rebase origin/main`, then push with the same `GIT_SSH_COMMAND`.
- Never build with `CODE_SIGNING_ALLOWED=NO`.
- Plain-ASCII commit messages. Commit trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Test/build command (never omit the destination): `xcodebuild test -project ios/Synapse.xcodeproj -scheme Synapse -destination 'platform=iOS Simulator,name=iPhone 17'`.
- pbxproj objectVersion 77: new `.swift` files under `ios/Synapse/` are picked up by filesystem-synchronized groups — **no pbxproj edit needed**. Binary frameworks and Info.plist keys DO need target/pbxproj wiring (Task 9).
- Theme tokens only (no raw colors/fonts): `Theme.primary/primaryTint/primaryStrong`, `success/successTint`, `danger/dangerTint`, `ink/ink2/ink3`, `surface`, `line`, `paper`, `onPrimary`; `Radius.lg/md`; `Theme.ui(_:weight:)`, `Theme.numeric()`; `@Environment(\.strings)` (`Localisation`, call as `strings("...")`).
- Socket auth: subprotocol array `["nishany.bearer", <supabaseAccessToken>]`. Frame cap 16 KiB. App ping `{type:"ping"}` every 20s. Close codes: 4401 not-a-member (permanent), 4403 evicted (permanent + re-read party), 4500 server error (retry). Request reply timeout 15s. Backoff 1s→30s doubling + up to 400ms jitter.
- Voice v1 is room-scoped only: always `audience:"room"` on produce. No seats, no tables, no 2.5D world.

---

## File Structure

Created:
- `ios/Synapse/Core/Rooms/RoomMessages.swift` — Codable inbound/outbound socket frames.
- `ios/Synapse/Core/Rooms/RoomChannelState.swift` — pure state + `reduceChannel` (port of `src/lib/rooms/roomChannel.ts`), `roomSocketURL`, `backoffDelay`.
- `ios/Synapse/Core/Rooms/RoomChannel.swift` — the `URLSessionWebSocketTask` client (connect, subprotocol, requestId correlation, ping, reconnect, close codes).
- `ios/Synapse/Core/Rooms/RoomModel.swift` — `@MainActor @Observable` orchestrator (channel + REST + heartbeat + audio).
- `ios/Synapse/Core/Rooms/Party.swift` — REST party models (`Party`, `PartySummary`, `PartyMember`, `PartyMutation`).
- `ios/Synapse/Core/Rooms/RoomAudio.swift` — mediasoup voice wrapper (Task 11).
- `ios/Synapse/Core/Rooms/VoiceActivity.swift` — RMS/threshold VAD (Task 10).
- `ios/Synapse/Features/Rooms/RoomsLobbyView.swift`, `RoomView.swift`, `RoomRosterView.swift`, `RoomChatView.swift`, `RoomDock.swift` — native UI.
- `ios/SynapseTests/RoomChannelReducerTests.swift`, `RoomMessagesTests.swift`, `RoomSocketURLTests.swift`, `PartyAPITests.swift`, `VoiceActivityTests.swift`.
- `scripts/ios/fetch-mediasoup.sh` — downloads pinned xcframeworks into `ios/Vendor/mediasoup/` (Task 9).

Modified:
- `ios/Synapse/Core/API/SynapseAPI.swift` — add party REST methods (Task 5).
- `ios/Synapse/Features/Root/SignedInView.swift` — point the Study Rooms tab at `RoomsLobbyView` (Task 7).
- `ios/Config/Info.plist` — `NSMicrophoneUsageDescription` + `UIBackgroundModes: [audio]` (Task 9).
- `docs/ios/HANDOFF.md` — feature notes + the one-time mediasoup fetch step.

Left alone (moved behind a later in-room-activity surface, not deleted): `ios/Synapse/Core/StudyTogether/StudyRoomModel.swift`, `ios/Synapse/Core/Model/StudyRoom.swift`, `ios/Synapse/Features/More/StudyTogetherView.swift`, and the `study-rooms` methods in `SynapseAPI.swift`.

---

# Phase A — the hall (fully simulator-verifiable, no new dependency)

### Task 1: Socket frame models (`RoomMessages.swift`)

**Files:**
- Create: `ios/Synapse/Core/Rooms/RoomMessages.swift`
- Test: `ios/SynapseTests/RoomMessagesTests.swift`

**Interfaces:**
- Produces:
  - `struct RoomMember: Decodable, Equatable, Identifiable, Sendable { let userId: String; let displayName: String; let role: String; let joinedAt: String?; let lastActiveAt: String?; let activity: String; var id: String { userId }; var name: String; var isHost: Bool }`
  - `struct RoomProducer: Equatable, Sendable { let producerId: String; let userId: String }`
  - `struct ChatLine: Decodable, Equatable, Identifiable, Sendable { let id: String; let from: String; let text: String; let at: String; let isPrivate: Bool; let to: String? }`
  - `enum InboundFrame` with a `static func parse(_ raw: String) -> (frame: InboundFrame, requestId: Int?)?` returning `nil` for non-objects / missing string `type` / bad JSON. Cases: `.hello(userId:roomId:sfu:)`, `.presence([RoomMember])`, `.speaking(userId:String, speaking:Bool)`, `.chat(ChatLine)`, `.archived(roomId:String)`, `.newProducer(producerId:String,userId:String)`, `.producerClosed(producerId:String,userId:String)`, `.producers([RoomProducer])`, `.voiceReset`, `.sfuUnavailable(reason:String)`, `.error(String)`, `.reply(type:String, json:[String:Any])`, `.unknown`.
  - `struct SFUInfo: Decodable, Equatable, Sendable { let available: Bool; let reason: String?; let iceServers: [ICEServer]? }`
  - `struct ICEServer: Codable, Equatable, Sendable { let urls: [String]; let username: String?; let credential: String? }` — decode `urls` from either a JSON string or `[String]`.

**Notes for the implementer:**
- The server sends `role: "host" | "member"`; expose `isHost { role == "host" }`.
- `displayName` defaults to `"Student"` if empty; keep the raw and expose `name`.
- `ChatLine` maps `private` → `isPrivate` via `CodingKeys` (`private` is a Swift keyword). A line is private only when the frame has `private == true`.
- `iceServers` on the wire is WebRTC `RTCIceServer` shape: `{ urls, username?, credential? }`. `urls` may be a bare string.
- Parsing must not throw on unknown frame types — return `.unknown` (a newer server), or `.reply(type:json:)` when a `requestId` is present so the channel can hand the raw JSON to the awaiting caller.

- [ ] **Step 1: Write failing tests**

```swift
import Foundation
import Testing
@testable import Synapse

struct RoomMessagesTests {
    @Test("a presence frame decodes its members")
    func presence() throws {
        let raw = #"{"type":"presence","members":[{"userId":"u1","displayName":"Sara","role":"host","lastActiveAt":"2026-01-01T00:00:00.000Z","activity":"studying"}]}"#
        let parsed = try #require(InboundFrame.parse(raw))
        guard case let .presence(members) = parsed.frame else { Issue.record("not presence"); return }
        #expect(members.count == 1)
        #expect(members[0].userId == "u1")
        #expect(members[0].isHost)
        #expect(members[0].name == "Sara")
    }

    @Test("a private chat line is flagged and addressed")
    func privateChat() throws {
        let raw = #"{"type":"chat","id":"c1","from":"u1","text":"hi","at":"2026-01-01T00:00:00.000Z","private":true,"to":"u2"}"#
        let parsed = try #require(InboundFrame.parse(raw))
        guard case let .chat(line) = parsed.frame else { Issue.record("not chat"); return }
        #expect(line.isPrivate)
        #expect(line.to == "u2")
    }

    @Test("a public chat line is not private")
    func publicChat() throws {
        let raw = #"{"type":"chat","id":"c1","from":"u1","text":"hi","at":"2026-01-01T00:00:00.000Z"}"#
        let parsed = try #require(InboundFrame.parse(raw))
        guard case let .chat(line) = parsed.frame else { Issue.record("not chat"); return }
        #expect(!line.isPrivate)
        #expect(line.to == nil)
    }

    @Test("hello carries the sfu block and ice servers")
    func hello() throws {
        let raw = #"{"type":"hello","userId":"u1","roomId":"r1","sfu":{"available":true,"iceServers":[{"urls":"stun:stun.l.google.com:19302"}]}}"#
        let parsed = try #require(InboundFrame.parse(raw))
        guard case let .hello(_, _, sfu) = parsed.frame else { Issue.record("not hello"); return }
        #expect(sfu.available)
        #expect(sfu.iceServers?.first?.urls == ["stun:stun.l.google.com:19302"])
    }

    @Test("a reply frame surfaces its requestId and raw json")
    func reply() throws {
        let raw = #"{"type":"sfu:produce","requestId":7,"producerId":"p1"}"#
        let parsed = try #require(InboundFrame.parse(raw))
        #expect(parsed.requestId == 7)
        guard case let .reply(type, json) = parsed.frame else { Issue.record("not reply"); return }
        #expect(type == "sfu:produce")
        #expect(json["producerId"] as? String == "p1")
    }

    @Test("an error reply carries its message and requestId")
    func errorReply() throws {
        let raw = #"{"type":"error","requestId":3,"error":"unknown_transport"}"#
        let parsed = try #require(InboundFrame.parse(raw))
        #expect(parsed.requestId == 3)
        guard case let .error(message) = parsed.frame else { Issue.record("not error"); return }
        #expect(message == "unknown_transport")
    }

    @Test("junk is rejected, not crashed on")
    func junk() {
        #expect(InboundFrame.parse("[1,2,3]") == nil)
        #expect(InboundFrame.parse("not json") == nil)
        #expect(InboundFrame.parse(#"{"noType":1}"#) == nil)
    }
}
```

- [ ] **Step 2: Run tests, verify they fail** — `xcodebuild test ... -only-testing:SynapseTests/RoomMessagesTests`. Expected: compile failure (`InboundFrame` undefined).

- [ ] **Step 3: Implement `RoomMessages.swift`.** Parse with `JSONSerialization` (object gate: must be `[String:Any]` with a `String` `type`), then map. Decode the strongly-typed cases (`presence`, `chat`, `hello`, `speaking`, `producers`) with `JSONDecoder` on the original data; for `.reply`, keep the `[String:Any]` dictionary. Provide `enum InboundFrame` and the structs above. Reference the exact field names from `src/lib/rooms/roomChannel.ts:40-62` and the SFU frames in the spec appendix.

- [ ] **Step 4: Run tests, verify PASS.**

- [ ] **Step 5: Commit**
```bash
git add ios/Synapse/Core/Rooms/RoomMessages.swift ios/SynapseTests/RoomMessagesTests.swift
git commit -m "feat(ios): Rooms - Codable socket frame models"
```

---

### Task 2: Channel state + reducer (`RoomChannelState.swift`)

Port of `reduceChannel`/`reduceMessage` from `src/lib/rooms/roomChannel.ts:163-269`. Pure, no networking — this is where the room's live logic is proven.

**Files:**
- Create: `ios/Synapse/Core/Rooms/RoomChannelState.swift`
- Test: `ios/SynapseTests/RoomChannelReducerTests.swift`

**Interfaces:**
- Consumes: `RoomMember`, `RoomProducer`, `ChatLine`, `SFUInfo`, `InboundFrame` (Task 1).
- Produces:
  - `enum ChannelStatus: Sendable { case idle, connecting, open, closed }`
  - `struct RoomChannelState: Equatable, Sendable` with: `status`, `members: [RoomMember]?` (nil until first presence), `speaking: [String]` (sorted), `producers: [RoomProducer]`, `sfu: SFUInfo?`, `messages: [ChatLine]` (cap `chatHistoryLimit = 100`), `archived: Bool`, `retrying: Bool`, `voiceReset: Int`. `static let initial`.
  - `enum ChannelAction: Sendable { case connecting; case closed(permanent: Bool); case frame(InboundFrame) }`
  - `func reduceChannel(_ state: RoomChannelState, _ action: ChannelAction) -> RoomChannelState`

**Behaviour to preserve (from the TS, load-bearing):**
- `.connecting`: sets `status=.connecting`, `retrying=true`.
- `.closed`: `status=.closed`, clears `speaking` and `producers` (claims about *now*), keeps `members` (a drop did not empty the room), `retrying = !permanent`.
- `.hello`: `status=.open`, `retrying=false`, `sfu = hello.sfu` (or `available:false`).
- `.archived`: sticky `archived=true`.
- `.presence`: `status=.open`, `retrying=false`, replace `members`; drop any `speaking` id no longer present.
- `.speaking`: add/remove id, keep sorted; no-op if unchanged.
- `.newProducer`: append if `producerId` not already present.
- `.producerClosed`: remove by `producerId`.
- `.producers`: replace list.
- `.voiceReset`: `voiceReset += 1`.
- `.sfuUnavailable(reason)`: `sfu = {available:false, reason}`.
- `.chat`: ignore if `messages.last?.id == line.id` (own optimistic echo); append and cap at 100.
- `.reply`, `.unknown`, `.error`: no state change (replies are delivered to the awaiting caller by `RoomChannel`, not the room).

- [ ] **Step 1: Write failing tests** (port the meaningful cases from `roomChannel.test.ts`):

```swift
import Testing
@testable import Synapse

struct RoomChannelReducerTests {
    private func member(_ id: String, speaking: Bool = false) -> RoomMember {
        RoomMember(userId: id, displayName: id, role: "member", joinedAt: nil, lastActiveAt: nil, activity: "studying")
    }

    @Test("members survive a drop but speaking and producers do not")
    func closeKeepsMembers() {
        var s = RoomChannelState.initial
        s = reduceChannel(s, .frame(.presence([member("a"), member("b")])))
        s = reduceChannel(s, .frame(.speaking(userId: "a", speaking: true)))
        s = reduceChannel(s, .frame(.newProducer(producerId: "p1", userId: "a")))
        s = reduceChannel(s, .closed(permanent: false))
        #expect(s.members?.count == 2)
        #expect(s.speaking.isEmpty)
        #expect(s.producers.isEmpty)
        #expect(s.retrying)
    }

    @Test("a permanent close stops retrying")
    func permanentClose() {
        let s = reduceChannel(.initial, .closed(permanent: true))
        #expect(!s.retrying)
    }

    @Test("presence drops speakers who left")
    func presenceEvictsSpeaker() {
        var s = reduceChannel(.initial, .frame(.presence([member("a"), member("b")])))
        s = reduceChannel(s, .frame(.speaking(userId: "b", speaking: true)))
        s = reduceChannel(s, .frame(.presence([member("a")])))
        #expect(s.speaking == [])
    }

    @Test("speaking is sorted and deduped")
    func speakingSorted() {
        var s = reduceChannel(.initial, .frame(.presence([member("b"), member("a")])))
        s = reduceChannel(s, .frame(.speaking(userId: "b", speaking: true)))
        s = reduceChannel(s, .frame(.speaking(userId: "a", speaking: true)))
        s = reduceChannel(s, .frame(.speaking(userId: "a", speaking: true)))
        #expect(s.speaking == ["a", "b"])
    }

    @Test("an own echo of the last chat id is dropped")
    func chatDedupe() {
        let line = ChatLine(id: "c1", from: "me", text: "hi", at: "t", isPrivate: false, to: nil)
        var s = reduceChannel(.initial, .frame(.chat(line)))
        s = reduceChannel(s, .frame(.chat(line)))
        #expect(s.messages.count == 1)
    }

    @Test("chat is capped at the history limit")
    func chatCap() {
        var s = RoomChannelState.initial
        for i in 0..<130 {
            s = reduceChannel(s, .frame(.chat(ChatLine(id: "c\(i)", from: "u", text: "\(i)", at: "t", isPrivate: false, to: nil))))
        }
        #expect(s.messages.count == 100)
        #expect(s.messages.first?.id == "c30")
    }

    @Test("producers add, close, and bulk-replace")
    func producers() {
        var s = reduceChannel(.initial, .frame(.newProducer(producerId: "p1", userId: "a")))
        s = reduceChannel(s, .frame(.newProducer(producerId: "p1", userId: "a"))) // dup ignored
        #expect(s.producers.count == 1)
        s = reduceChannel(s, .frame(.producerClosed(producerId: "p1", userId: "a")))
        #expect(s.producers.isEmpty)
        s = reduceChannel(s, .frame(.producers([RoomProducer(producerId: "p2", userId: "b")])))
        #expect(s.producers.map(\.producerId) == ["p2"])
    }

    @Test("archived is sticky and voiceReset increments")
    func archivedAndReset() {
        var s = reduceChannel(.initial, .frame(.archived(roomId: "r1")))
        #expect(s.archived)
        s = reduceChannel(s, .frame(.voiceReset))
        s = reduceChannel(s, .frame(.voiceReset))
        #expect(s.voiceReset == 2)
        #expect(s.archived)
    }
}
```

- [ ] **Step 2: Run, verify fail** (undefined symbols).
- [ ] **Step 3: Implement `RoomChannelState.swift`** — the struct, `initial`, and `reduceChannel` exactly matching the behaviour list. Keep it pure (no imports beyond `Foundation`).
- [ ] **Step 4: Run, verify PASS.**
- [ ] **Step 5: Commit**
```bash
git add ios/Synapse/Core/Rooms/RoomChannelState.swift ios/SynapseTests/RoomChannelReducerTests.swift
git commit -m "feat(ios): Rooms - pure channel state reducer (port of roomChannel.ts)"
```

---

### Task 3: Socket URL + backoff (add to `RoomChannelState.swift`)

Port `roomSocketUrl` (`roomChannel.ts:306-320`) and `backoffDelay` (`:283-286`). The `/api/api` bug guard is the whole point of porting rather than hand-rolling.

**Files:**
- Modify: `ios/Synapse/Core/Rooms/RoomChannelState.swift`
- Test: `ios/SynapseTests/RoomSocketURLTests.swift`

**Interfaces:**
- Produces:
  - `func roomSocketURL(base: URL, code: String) -> URL?` — takes `AppConfig.apiBaseURL` (already `https://<host>/api`), strips a trailing `/api`, appends `/api/rooms/ws`, swaps `https`→`wss` / `http`→`ws`, sets `?code=CODE`. Returns nil for an empty code.
  - `let backoffMinMS = 1_000`, `let backoffMaxMS = 30_000`
  - `func backoffDelay(attempt: Int) -> Int` — `min(30_000, 1_000 * 2^max(0,attempt))`.

- [ ] **Step 1: Write failing tests**
```swift
import Foundation
import Testing
@testable import Synapse

struct RoomSocketURLTests {
    @Test("derives one /api/rooms/ws from an /api base, as wss")
    func derives() throws {
        let url = try #require(roomSocketURL(base: URL(string: "https://nishany.com/api")!, code: "abcd"))
        #expect(url.absoluteString == "wss://nishany.com/api/rooms/ws?code=ABCD" || url.absoluteString == "wss://nishany.com/api/rooms/ws?code=abcd")
    }

    @Test("never doubles /api even when the base lacks it")
    func noDouble() throws {
        let url = try #require(roomSocketURL(base: URL(string: "https://nishany.com")!, code: "x1"))
        #expect(!url.absoluteString.contains("/api/api"))
        #expect(url.absoluteString.hasPrefix("wss://nishany.com/api/rooms/ws"))
    }

    @Test("localhost stays ws, not wss")
    func localhost() throws {
        let url = try #require(roomSocketURL(base: URL(string: "http://localhost:8823/api")!, code: "x"))
        #expect(url.scheme == "ws")
    }

    @Test("backoff doubles to a 30s ceiling")
    func backoff() {
        #expect(backoffDelay(attempt: 0) == 1_000)
        #expect(backoffDelay(attempt: 3) == 8_000)
        #expect(backoffDelay(attempt: 20) == 30_000)
        #expect(backoffDelay(attempt: -1) == 1_000)
    }
}
```
- [ ] **Step 2: Run, verify fail.**
- [ ] **Step 3: Implement** both functions. Use `URLComponents`; uppercasing the code is optional (the server upper-cases on lookup) — either is fine, keep it as passed.
- [ ] **Step 4: Run, verify PASS.**
- [ ] **Step 5: Commit**
```bash
git add ios/Synapse/Core/Rooms/RoomChannelState.swift ios/SynapseTests/RoomSocketURLTests.swift
git commit -m "feat(ios): Rooms - socket URL derivation and backoff"
```

---

### Task 4: The WebSocket client (`RoomChannel.swift`)

Owns the `URLSessionWebSocketTask`: connect with the bearer subprotocol, correlate replies by `requestId`, app-ping, reconnect with backoff, honour close codes. Mirrors `useRoomChannel.ts` (the parts that need a real socket).

**Files:**
- Create: `ios/Synapse/Core/Rooms/RoomChannel.swift`

**Interfaces:**
- Consumes: `roomSocketURL`, `backoffDelay`, `reduceChannel`, `RoomChannelState`, `ChannelAction`, `InboundFrame`, `SynapseAPI.TokenProvider` (`@Sendable () async throws -> String?`).
- Produces (an `actor`, so all mutable state is isolated):
  - `actor RoomChannel`
  - `init(base: URL, code: String, token: @escaping SynapseAPI.TokenProvider)`
  - `var frames: AsyncStream<ChannelAction>` — connecting/closed/frame actions for the model to reduce. (Expose via a stored `AsyncStream` + continuation created in init.)
  - `func start()` — opens the socket and begins the receive/ping/reconnect loop.
  - `func stop()` — clean `close(1000)`, cancels loops, finishes the stream.
  - `func send(_ frame: [String: Any])` — fire-and-forget (`speaking`, `chat`, `ping`).
  - `func request(_ frame: [String: Any]) async throws -> [String: Any]` — attaches an incrementing `requestId`, resolves on the matching reply, rejects on 15s timeout / `error` reply / socket close.
  - `func sendChat(_ text: String, to userId: String?)` — trims; `{type:"chat", text, to?}`.

**Implementation notes (no placeholders):**
- Build the request: `var req = URLRequest(url: roomSocketURL(base:code:)!)`. Auth is the subprotocol, not a header:
  `URLSession.shared.webSocketTask(with: req, protocols: ["nishany.bearer", token])` — fetch `token` via the provider *before* creating the task (it is async). If the provider returns nil, emit `.closed(permanent: true)` and finish (no session → retry is pointless, mirrors the web).
- `maximumMessageSize = 16 * 1024` (frame cap).
- Receive loop: recursive `task.receive`; on `.string`, `InboundFrame.parse`; if the parsed `requestId` matches a pending continuation, resolve/reject it and — unless it is `.sfuUnavailable` — return without dispatching to the stream; otherwise `continuation.yield(.frame(frame))`.
- Reply correlation: `var pending: [Int: CheckedContinuation<[String:Any], Error>]` and `var timers: [Int: Task<Void, Never>]`. `request` sets a 15s `Task` that removes+rejects on timeout.
- Ping: a `Task` that sleeps 20s and `send(["type":"ping"])` while open.
- Reconnect: on close, read `closeCode`; `permanent = code == 4401 || code == 4403`; fail all pending with "room connection closed"; yield `.closed(permanent:)`; if not permanent, `Task.sleep(backoffDelay(attempt) + random 0..<400 ms)` then reconnect (increment attempt; reset to 0 on a successful open).
- `stop()`: cancel tasks, `task?.cancel(with: .normalClosure, reason: Data("left".utf8))`, finish stream.
- Concurrency: this is an `actor`; `URLSessionWebSocketTask` completion handlers hop back in via `Task { await self.… }`. Keep continuations single-resume (guard removal before resume). Follow the `nonisolated(unsafe)` + lock pattern already in the codebase only if a callback truly cannot be actor-hopped — prefer actor hops.

**Testing:** A live socket is not unit-tested here (it needs the server); its pure pieces (URL, backoff, reducer, frame parsing) are already covered by Tasks 1-3. Verification is the live sim walkthrough in Task 8. Do **not** add a flaky network unit test.

- [ ] **Step 1: Implement `RoomChannel.swift`** per the notes above.
- [ ] **Step 2: Build to confirm it compiles** — `xcodebuild build -project ios/Synapse.xcodeproj -scheme Synapse -destination 'platform=iOS Simulator,name=iPhone 17'`. Expected: BUILD SUCCEEDED.
- [ ] **Step 3: Run the existing suite** to confirm no regression — `xcodebuild test ...`. Expected: all pass.
- [ ] **Step 4: Commit**
```bash
git add ios/Synapse/Core/Rooms/RoomChannel.swift
git commit -m "feat(ios): Rooms - URLSessionWebSocketTask client with bearer subprotocol"
```

---

### Task 5: Party REST (`Party.swift` + `SynapseAPI` extension)

**Files:**
- Create: `ios/Synapse/Core/Rooms/Party.swift`
- Modify: `ios/Synapse/Core/API/SynapseAPI.swift` (add a `// MARK: - Study parties` section near the existing `study-rooms` methods ~line 394)
- Test: `ios/SynapseTests/PartyAPITests.swift`

**Interfaces:**
- Produces in `Party.swift` (shapes verified against `server/src/parties.js` `partyFor`/`myParties`/`openParties`):
  - `struct Party: Decodable, Equatable, Identifiable, Sendable { let id: String; let code: String; let name: String; let hostUserId: String?; let isHost: Bool?; let visibility: String; let layoutKey: String?; let scope: String?; let capacity: Int?; let members: [RoomMember]; var id: String { id } }` — `members` here is the full member list (from `partyFor`).
  - `struct PartySummary: Decodable, Equatable, Identifiable, Sendable { let id: String; let code: String; let name: String; let isHost: Bool?; let capacity: Int?; let members: Int }` — `members` is a **count** in list endpoints (`myParties`/`openParties`).
  - `struct PartyMutation: Decodable, Sendable { let ok: Bool?; let reason: String?; let party: Party?; var succeeded: Bool { ok != false }; var message: String? }` — map reasons: `no_cohort` → "Your year isn't set up for rooms yet.", `room_full` → "That room is full.", `code_collision`/`invalid_room_options` → "Couldn't create the room.", `not_found` → "No room with that code.", `not_a_member` → "You're not in that room.", `not_host` → "Only the host can do that.", default → "That didn't work."
- Produces in `SynapseAPI`:
  - `func createParty(name: String) async throws -> PartyMutation` → `POST /api/parties` body `{name}` (layoutKey defaults server-side to `campus`).
  - `func joinParty(code: String) async throws -> PartyMutation` → `POST /api/parties/join` body `{code}`.
  - `func myParties() async throws -> [PartySummary]` → `GET /api/parties/mine` → `.parties`.
  - `func openParties() async throws -> [PartySummary]` → `GET /api/parties/open` → `.parties`.
  - `func party(_ idOrCode: String) async throws -> Party?` → `GET /api/parties/:id` → `.party`.
  - `func leaveParty(_ id: String) async throws` → `POST /api/parties/:id/leave`.
  - `func roomHeartbeat(code: String, activity: String = "studying") async throws` → `POST /api/parties/:code/heartbeat` body `{activity}`.
  - `func roomMembers(code: String) async throws -> [RoomMember]` → `GET /api/parties/:code/members` → `.members`.

**Note:** name the method `myParties()` (distinct from the existing `myRooms()` which stays for the shared-quiz system). Do not remove `myRooms`/`joinRoom`/`study-rooms` methods.

- [ ] **Step 1: Write failing tests** using the existing `StubProtocol` test pattern (grep `StubProtocol` in `ios/SynapseTests` for the helper that injects canned responses into a `SynapseAPI`):
```swift
import Foundation
import Testing
@testable import Synapse

struct PartyAPITests {
    @Test("mine decodes the summary list with member counts")
    func mine() async throws {
        let json = #"{"parties":[{"id":"p1","code":"WXYZ","name":"Anatomy grind","isHost":true,"capacity":20,"members":3}]}"#
        let api = SynapseAPI.stub(get: ["parties/mine": json])   // helper mirrors existing StubProtocol usage
        let list = try await api.myParties()
        #expect(list.count == 1)
        #expect(list[0].members == 3)
        #expect(list[0].isHost == true)
    }

    @Test("a full-room join surfaces a student-readable refusal")
    func joinFull() async throws {
        let json = #"{"ok":false,"reason":"room_full"}"#
        let api = SynapseAPI.stub(post: ["parties/join": json])
        let result = try await api.joinParty(code: "WXYZ")
        #expect(!result.succeeded)
        #expect(result.message == "That room is full.")
    }

    @Test("party() decodes the full room with members")
    func partyFull() async throws {
        let json = #"{"party":{"id":"p1","code":"WXYZ","name":"Anatomy grind","hostUserId":"u1","isHost":true,"visibility":"open","layoutKey":"campus","scope":"cohort","capacity":20,"members":[{"userId":"u1","displayName":"Sara","role":"host","lastActiveAt":null,"activity":"studying"}]}}"#
        let api = SynapseAPI.stub(get: ["parties/p1": json])
        let party = try #require(try await api.party("p1"))
        #expect(party.members.count == 1)
        #expect(party.isHost == true)
    }
}
```
(If no `SynapseAPI.stub` convenience exists, add a small test-only helper in the test file that builds `SynapseAPI(baseURL:urlSession:token:)` with a `URLSession` using the existing `StubProtocol`; keep the exact key→path mapping.)

- [ ] **Step 2: Run, verify fail.**
- [ ] **Step 3: Implement** `Party.swift` and the `SynapseAPI` methods (reuse the private `get`/`send` helpers; envelopes as local `Decodable` structs, as the file already does for `study-rooms`).
- [ ] **Step 4: Run, verify PASS.**
- [ ] **Step 5: Commit**
```bash
git add ios/Synapse/Core/Rooms/Party.swift ios/Synapse/Core/API/SynapseAPI.swift ios/SynapseTests/PartyAPITests.swift
git commit -m "feat(ios): Rooms - party REST client and models"
```

---

### Task 6: The room model (`RoomModel.swift`)

`@MainActor @Observable` orchestrator: owns a `RoomChannel`, reduces its stream into a published `RoomChannelState`, merges with the REST snapshot, drives the 30s heartbeat, sends chat/whisper, leaves. (Voice hooks land in Task 12.)

**Files:**
- Create: `ios/Synapse/Core/Rooms/RoomModel.swift`

**Interfaces:**
- Consumes: `SynapseAPI`, `RoomChannel`, `RoomChannelState`, `Party`.
- Produces:
  - `@MainActor @Observable final class RoomModel`
  - `init(api: SynapseAPI, base: URL, token: @escaping SynapseAPI.TokenProvider, party: Party, myUserId: String)`
  - Published: `private(set) var state: RoomChannelState`, `private(set) var party: Party`, `var draft: String`, `private(set) var connectionLabel: String?` (e.g. "Reconnecting…"/"This room has closed."), `var voiceEnabled: Bool` (Task 12).
  - Derived: `var members: [RoomMember]` (socket `state.members` when present, else `party.members`); `var speaking: Set<String>`; `var messages: [ChatLine]`; `var isHost: Bool`.
  - `func connect()` — `channel.start()`, spawn a `Task` consuming `channel.frames` into `state = reduceChannel(state, action)`; on `.archived`/permanent-closed set `connectionLabel`; start the heartbeat `Task` (`api.roomHeartbeat(code:)` every 30s).
  - `func send()` — `channel.sendChat(draft, to: nil)`; clear `draft`.
  - `func whisper(_ text: String, to userId: String)` — `channel.sendChat(text, to: userId)`.
  - `func leave() async` — `channel.stop()`, cancel heartbeat, `try? await api.leaveParty(party.id)`.
  - `func refreshSnapshot() async` — `if let p = try? await api.party(party.code) { party = p }` (fallback when the socket is down).

**Notes:** members shown = socket truth when `state.members != nil`, else the REST `party.members` (mirrors the web's "null means fall back to the polled party"). `myUserId` comes from the session (`SessionUser`/`MeResponse`); pass it in so the roster can mark "you" and the chat can right-align your lines. Heartbeat only while connected; stop on `leave`.

- [ ] **Step 1: Implement `RoomModel.swift`.**
- [ ] **Step 2: Build** — confirm compiles.
- [ ] **Step 3: Run suite** — no regression.
- [ ] **Step 4: Commit**
```bash
git add ios/Synapse/Core/Rooms/RoomModel.swift
git commit -m "feat(ios): Rooms - observable room model over channel and REST"
```

---

### Task 7: Native UI + tab wiring

Native-idiomatic hall (no 2.5D). Lobby → room with roster, chat, and a dock to minimize.

**Files:**
- Create: `ios/Synapse/Features/Rooms/RoomsLobbyView.swift`, `RoomView.swift`, `RoomRosterView.swift`, `RoomChatView.swift`, `RoomDock.swift`
- Modify: `ios/Synapse/Features/Root/SignedInView.swift`

**Interfaces & structure:**
- `RoomsLobbyView(store:sync:api:...)` — the tab root (replaces `StudyTogetherView`). Sections:
  - "Create a room": a `TextField` (name) + primary button → `api.createParty(name:)`, on success push `RoomView`.
  - "Join by code": a `TextField` (auto-uppercased, `.characters`) + button → `api.joinParty(code:)`.
  - "Your rooms" (`api.myParties()`) and "Open in your year" (`api.openParties()`): rows with name, member count / capacity, a "Join"/"Open" button. `.refreshable` reloads both.
  - Uses the shared list styling already in `MinigamesView`/`StudyTogetherView` (`.insetGrouped`, `Theme.surface` rows, `Theme.paper` background, `navigationTitle(strings("Study Rooms"))`).
- `RoomView(model: RoomModel)` — `.task { model.connect() }`, `.onDisappear` does NOT leave (minimize-to-dock keeps membership; an explicit "Leave" button calls `await model.leave()`). Layout: a header (room name, code with a copy button, connection label when `model.connectionLabel != nil`), `RoomRosterView`, `RoomChatView`, and (Task 12) a voice bar. A "Minimize" affordance pops back to the lobby while `RoomModel` stays alive in a session-scoped holder (see dock note).
- `RoomRosterView(members:speaking:hostUserId:myUserId:onMute:onWhisper:onBlock:)` — a grid/list of members: avatar initial, name (", you" suffix for self), a host tag, a green ring/waveform when `speaking.contains(userId)`, and a context menu (Whisper / Mute (local) / Block) for others.
- `RoomChatView(messages:draft:onSend:myUserId:)` — a scroll view pinned to bottom; own lines right-aligned in `Theme.primaryTint`, others left in `Theme.surface`; private lines badged "Whisper" in `Theme.ink3`; a bottom input row (`TextField` + send). `.onChange(of: messages.count)` scrolls to the last id.
- `RoomDock` — a slim bottom bar shown app-wide (in `SignedInView`) when a `RoomModel` is live but its `RoomView` is not on screen: room name + speaking count + a tap to re-open `RoomView`. Back the live model with a `@State private var activeRoom: RoomModel?` on `SignedInView` (single active room in v1); minimize sets nothing to nil, leave clears it.

**Tab wiring:** In `SignedInView`, find where the Study Rooms / "Study Together" tab is built (grep `StudyTogetherView`) and swap its content for `RoomsLobbyView`. Keep the same tab item label/symbol unless it reads "Study Together" — rename the label to `strings("Study Rooms")`. Do not delete `StudyTogetherView` (it becomes an in-room activity later).

- [ ] **Step 1: Implement the five views.** Keep each file focused; reuse theme tokens and existing row styles. No business logic in views — bind to `RoomModel` / call `api`.
- [ ] **Step 2: Wire the tab** in `SignedInView` + the `activeRoom` dock state.
- [ ] **Step 3: Build** — confirm compiles.
- [ ] **Step 4: Run suite** — no regression.
- [ ] **Step 5: Commit**
```bash
git add ios/Synapse/Features/Rooms ios/Synapse/Features/Root/SignedInView.swift
git commit -m "feat(ios): Rooms - native lobby, room, roster, chat, dock"
```

---

### Task 8: Live simulator verification of the hall

Prove presence + chat + whisper + block round-trip against production, driving a **second headless WebSocket participant** (the `local-rooms-live-harness` approach). No new code; a throwaway harness script under the scratchpad is fine.

- [ ] **Step 1:** Boot the sim, install this worktree's build (resolve the path via `xcodebuild -showBuildSettings ... | grep BUILT_PRODUCTS_DIR` — do NOT `find | head -1`, it grabs another worktree's build). Sign in with a production account that has a cohort (rooms require `cohortFor`).
- [ ] **Step 2:** In the app, create a room; note the code.
- [ ] **Step 3:** From a scratchpad Node script, open a second member: `new WebSocket(wssURL, ["nishany.bearer", <token>])` for a *different* production account in the same cohort, join by code via REST first, then connect. Confirm the app's roster shows the second member appear and their `activity`.
- [ ] **Step 4:** Send chat from the harness → appears in the app; send from the app → the harness receives it. Send a whisper (`{type:"chat", text, to:<appUserId>}`) → app shows it badged "Whisper"; a whisper to a third party is NOT shown to the app.
- [ ] **Step 5:** Minimize → dock appears; re-open → same room, chat intact. Leave → roster on the harness side drops the app user (presence broadcast).
- [ ] **Step 6:** Capture screenshots (roster with a speaker, chat, whisper badge). Verify no console errors (`read_console_messages` equivalent via device logs).
- [ ] **Step 7:** Update `docs/ios/HANDOFF.md` (feature entry + test count) and the `ios-native-port` memory. Commit:
```bash
git add ios/ docs/ios/HANDOFF.md
git commit -m "docs(ios): HANDOFF - native Study Rooms hall verified live"
```
- [ ] **Step 8:** Rebase on origin/main and push (SSH). This is a shippable increment on its own — the hall works with voice simply absent until Phase B.

---

# Phase B — voice (vendored dependency; device-verified)

### Task 9: Vendor mediasoup-client-swift + permissions

**Files:**
- Create: `scripts/ios/fetch-mediasoup.sh`
- Create: `ios/Vendor/mediasoup/` (gitignored contents), add `ios/Vendor/mediasoup/.gitignore` (`*` except the README) and a `README.md` naming the pinned release.
- Modify: `ios/Config/Info.plist`, `.gitignore`, `ios/Synapse.xcodeproj/project.pbxproj` (binary framework refs — hand-authored, this is the one pbxproj edit).

**Steps:**
- [ ] **Step 1:** Write `scripts/ios/fetch-mediasoup.sh`: downloads the pinned `Mediasoup-Client-Swift` 0.13.2 release xcframeworks (WebRTC, Mediasoup, and any bundled deps) into `ios/Vendor/mediasoup/`, verifies a checksum, and is idempotent (skip if present). Pin the exact release URL + SHA in the script. Document that CocoaPods/SPM are not used here and why (system Ruby 2.6; SPM unsupported by the lib).
- [ ] **Step 2:** Run it; confirm the `.xcframework`s land in `ios/Vendor/mediasoup/`.
- [ ] **Step 3:** In Xcode/pbxproj, add the xcframeworks to the Synapse target as **Embed & Sign** binary frameworks. Add `import Mediasoup` availability check in a throwaway file, build, then remove the throwaway. Never `CODE_SIGNING_ALLOWED=NO`.
- [ ] **Step 4:** `Info.plist`: add `NSMicrophoneUsageDescription` ("Nishany uses your microphone for voice in study rooms.") + Arabic in the localized strings, and `UIBackgroundModes` → `audio`.
- [ ] **Step 5:** `.gitignore`: ignore `ios/Vendor/mediasoup/*` binaries (keep README + fetch script tracked).
- [ ] **Step 6:** Build clean (`xcodebuild build ...`) to confirm linking. Run the suite (no regression).
- [ ] **Step 7:** Commit
```bash
git add ios/Config/Info.plist ios/Vendor/mediasoup/README.md ios/Vendor/mediasoup/.gitignore scripts/ios/fetch-mediasoup.sh .gitignore ios/Synapse.xcodeproj/project.pbxproj
git commit -m "build(ios): Rooms - vendor mediasoup-client-swift, mic and background-audio permissions"
```

---

### Task 10: Voice activity detection (`VoiceActivity.swift`)

**Files:**
- Create: `ios/Synapse/Core/Rooms/VoiceActivity.swift`
- Test: `ios/SynapseTests/VoiceActivityTests.swift`

**Interfaces:**
- Produces:
  - `struct VoiceActivity` (pure/testable core): `init(threshold: Float = 0.02, onsetMS: Int = 120, releaseMS: Int = 400)`; `mutating func push(rms: Float, at ms: Int) -> Bool?` — returns `true` when speaking onset is confirmed (RMS above threshold sustained ≥ onset), `false` on release (below threshold sustained ≥ release), `nil` when unchanged. Mirrors the web VAD (`useRoomAudio.ts` hold logic).

- [ ] **Step 1: Write failing tests**
```swift
import Testing
@testable import Synapse

struct VoiceActivityTests {
    @Test("onset needs sustained level, release needs sustained silence")
    func hysteresis() {
        var vad = VoiceActivity(threshold: 0.02, onsetMS: 120, releaseMS: 400)
        #expect(vad.push(rms: 0.05, at: 0) == nil)       // loud, but not yet sustained
        #expect(vad.push(rms: 0.05, at: 100) == nil)
        #expect(vad.push(rms: 0.05, at: 130) == true)    // onset confirmed at >=120ms
        #expect(vad.push(rms: 0.05, at: 200) == nil)     // still speaking, no repeat
        #expect(vad.push(rms: 0.001, at: 300) == nil)    // silent, not yet sustained
        #expect(vad.push(rms: 0.001, at: 750) == false)  // release confirmed at >=400ms
    }

    @Test("a brief dip between words does not release")
    func briefDip() {
        var vad = VoiceActivity(threshold: 0.02, onsetMS: 120, releaseMS: 400)
        _ = vad.push(rms: 0.05, at: 0); _ = vad.push(rms: 0.05, at: 130)
        #expect(vad.push(rms: 0.001, at: 200) == nil)
        #expect(vad.push(rms: 0.05, at: 300) == nil)     // back above before release window elapsed
        #expect(vad.push(rms: 0.05, at: 800) == nil)     // still speaking
    }
}
```
- [ ] **Step 2: Run, verify fail.**
- [ ] **Step 3: Implement** the hysteresis state machine (track the timestamp the level first crossed each way; confirm when the gap ≥ onset/release).
- [ ] **Step 4: Run, verify PASS.**
- [ ] **Step 5: Commit**
```bash
git add ios/Synapse/Core/Rooms/VoiceActivity.swift ios/SynapseTests/VoiceActivityTests.swift
git commit -m "feat(ios): Rooms - voice-activity detection with hysteresis"
```

---

### Task 11: The mediasoup wrapper (`RoomAudio.swift`)

Runs the 10-step handshake over `RoomChannel.request`, configures `AVAudioSession`, produces the mic, and consumes remote producers.

**Files:**
- Create: `ios/Synapse/Core/Rooms/RoomAudio.swift`

**Interfaces:**
- Consumes: `RoomChannel` (`request`/`send`), `Mediasoup` (`Device`, `SendTransport`, `RecvTransport`, `Producer`, `Consumer`, delegates), `SFUInfo`/`ICEServer`, `VoiceActivity`, `AVFoundation`.
- Produces:
  - `@MainActor final class RoomAudio` (or an actor if the Mediasoup API demands off-main; follow the lib's threading — its delegates call back on arbitrary queues, so guard shared state).
  - `init(channel: RoomChannel, iceServers: [ICEServer])`
  - `func joinVoice() async throws` — steps 1-7 below.
  - `func leaveVoice()` — `producer.close()`, close consumers, `send({type:"sfu:close"})`, deactivate `AVAudioSession`.
  - `func setMuted(_ muted: Bool) async` — `producer.pause()`/`resume()` + `request({type:"sfu:pause", producerId, paused})`.
  - `func onNewProducer(_ producerId: String, userId: String)` / `func onProducerClosed(_ producerId: String)` — reconcile consumers (called by `RoomModel` from the frame stream).
  - `func rebuild() async` — tear down and re-run `joinVoice` on `voiceReset`/reconnect.
  - `var onSpeakingChange: (Bool) -> Void` — wired to send `{type:"speaking", speaking}` and reflect self in the roster.

**Handshake (exact payloads, from `useRoomAudio.ts` + spec appendix):**
1. `let caps = try await channel.request(["type":"sfu:rtpCapabilities"])` → `device.load(routerRtpCapabilities: caps["rtpCapabilities"])`. Merge `iceServers` from `caps` if present.
2. `createTransport` send then recv: `channel.request(["type":"sfu:createTransport","direction":"send"])` (then `"recv"`); build `SendTransport`/`RecvTransport` with `id, iceParameters, iceCandidates, dtlsParameters, iceServers`.
3. On the transport `connect` delegate (`onConnect(transport, dtlsParameters)`): `channel.request(["type":"sfu:connectTransport","transportId":transport.id,"dtlsParameters":dtlsParameters])`, then call the completion.
4. On the send transport `produce` delegate (`onProduce(transport, kind, rtpParameters)`): `let r = try await channel.request(["type":"sfu:produce","transportId":send.id,"kind":"audio","rtpParameters":rtpParameters,"audience":"room"])`, return `r["producerId"]`.
5. `let existing = try await channel.request(["type":"sfu:producers"])` → for each, `consume`.
6. Per producer: `let p = try await channel.request(["type":"sfu:consume","transportId":recv.id,"producerId":producerId,"rtpCapabilities":device.rtpCapabilities])` → `recv.consume(id:p.id, producerId:producerId, kind:"audio", rtpParameters:p.rtpParameters)`; consumer **starts paused** (attach muted).
7. `try await channel.request(["type":"sfu:resume","consumerId":consumer.id])` → unmute the consumer.
8. Reconcile on `sfu:newProducer` / `sfu:producerClosed` (steps 6-7 for new; close+remove for closed).
9. Mute/unmute own mic = `producer.pause()`/`resume()` + `sfu:pause`.
10. Leave = `sfu:close`.
- Handle `sfu:unavailable` (show "voice unavailable", stay in the hall) and `sfu:voiceReset` (`rebuild()`).

**AVAudioSession:** on `joinVoice`, `setCategory(.playAndRecord, mode: .voiceChat, options: [.defaultToSpeaker, .allowBluetooth])`, `setActive(true)`; observe `AVAudioSession.interruptionNotification` (pause on `.began`, resume on `.ended` with `.shouldResume`); deactivate on leave. Request mic permission (`AVAudioApplication.requestRecordPermission`) on first join; if denied, `RoomModel` keeps the room usable with voice disabled and prompts Settings.

**Testing:** no unit test (needs the C++/WebRTC stack + a live SFU). Verification is Task 12's live handshake trace. Keep the handshake logic thin and delegate-driven so the untestable surface is minimal.

- [ ] **Step 1: Implement `RoomAudio.swift`.**
- [ ] **Step 2: Build** — confirm links against the vendored frameworks and compiles.
- [ ] **Step 3: Run suite** — no regression.
- [ ] **Step 4: Commit**
```bash
git add ios/Synapse/Core/Rooms/RoomAudio.swift
git commit -m "feat(ios): Rooms - mediasoup voice wrapper (handshake, produce, consume)"
```

---

### Task 12: Wire voice into the model + UI, verify against the live SFU

**Files:**
- Modify: `ios/Synapse/Core/Rooms/RoomModel.swift`, `ios/Synapse/Features/Rooms/RoomView.swift`, `RoomRosterView.swift`

**Steps:**
- [ ] **Step 1:** In `RoomModel`, add `private var audio: RoomAudio?`, `var micMuted = true`, `var voiceState: VoiceState` (`.off/.connecting/.on/.unavailable(reason)`). Build `RoomAudio` when `state.sfu?.available == true`. Route `sfu:newProducer`/`sfu:producerClosed`/`voiceReset`/`sfu:unavailable` from the frame stream into `audio`. Add `func joinVoice()`, `func toggleMic()`, per-member local mute set `mutedMembers: Set<String>` (client-only — tells no one; applies to the consumer's player volume). Wire `audio.onSpeakingChange` → `channel.send(["type":"speaking","speaking":...])`.
- [ ] **Step 2:** In `RoomView`, add a voice bar: a "Join voice" button when `voiceState == .off`; when on, a mic toggle (muted/unmuted) and a "Leave voice". Show "Voice unavailable" with the reason when `.unavailable`.
- [ ] **Step 3:** In `RoomRosterView`, the speaking ring already reads `speaking`; add a per-member "Mute (for me)" toggle bound to `mutedMembers`.
- [ ] **Step 4: Build + run suite** — no regression.
- [ ] **Step 5: Live handshake trace (simulator).** Join voice on the sim against production. Confirm in logs: rtpCapabilities load, send+recv transports connect (DTLS), `sfu:produce` returns a producerId, `sfu:producers` lists, consume+resume succeed. Simulator mic capture is unreliable — do NOT claim audio works from the sim; confirm the handshake completes without errors.
- [ ] **Step 6:** Update `docs/ios/HANDOFF.md`: voice shipped; **the one accepted gap** — real two-way audio needs two physical devices, so final voice sign-off is Omar's on hardware. Update the `ios-native-port` memory + test count.
- [ ] **Step 7: Commit + push (rebase on origin/main first, SSH).**
```bash
git add ios/ docs/ios/HANDOFF.md
git commit -m "feat(ios): Rooms - voice UI wiring; handshake traced against live SFU"
```

---

## Self-Review

**Spec coverage:**
- Lobby (create/join/list) → Task 5 (REST) + Task 7 (UI). ✓
- Presence roster → Tasks 2/6/7. ✓
- Public chat + private DM/@-whisper → Tasks 1/2/6/7. ✓
- Speaking indicators → Tasks 2 (state) + 10 (VAD) + 12 (wiring). ✓
- Block → Task 7 context menu over the existing friends block API (note: this reuses `SynapseAPI` friends/block; if no block method exists yet, add it in Task 5's file alongside the party methods — grep `block`/`friends` in `SynapseAPI.swift` first). **Gap flagged:** confirm the friends/block endpoint exists on iOS; if not, add `func blockUser(_ id:)` in Task 5.
- Minimize-to-dock → Task 7 (`RoomDock` + `activeRoom` state). ✓
- Voice join/leave, mic pause, per-listener mute, hear everyone → Tasks 11/12. ✓
- Vendored xcframeworks + fetch script + Info.plist → Task 9. ✓
- Deferred (2.5D world, seats, table voice, desk personalisation) → not in any task, correct. ✓

**Placeholder scan:** No "TBD"/"handle errors"/"similar to". Refusal-message maps and handshake payloads are spelled out. Views specify exact model bindings; SwiftUI body layout is left idiomatic against a locked interface (acceptable — the logic under test is all in Core).

**Type consistency:** `RoomMember`/`RoomProducer`/`ChatLine`/`SFUInfo`/`InboundFrame` defined in Task 1 and consumed by 2/5/6. `roomSocketURL`/`backoffDelay`/`reduceChannel` defined in 2/3, consumed in 4/6. `SynapseAPI.TokenProvider` reused verbatim. `myParties()` deliberately distinct from existing `myRooms()`.

**One open item to resolve during Task 5:** whether an iOS block/friends API already exists (web gates whispers server-side via `/api/friends`). Grep first; add the method if missing.

---

## Execution Handoff

Two execution options:
1. **Subagent-Driven (recommended)** — a fresh subagent per task, two-stage review between tasks.
2. **Inline Execution** — batch tasks in this session with checkpoints.
