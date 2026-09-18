import Foundation

/// The room, as the socket knows it, and the one function that advances it.
///
/// A port of `reduceChannel`/`reduceMessage` from `src/lib/rooms/roomChannel.ts`.
/// Pure and free of the socket, so the whole protocol can be tested the way the
/// web tests it: a `presence` that arrives before `hello`, a producer that
/// closes while its consumer is still being built, a drop that must not empty
/// the hall. `RoomChannel` owns the WebSocket and does nothing but feed this.

enum ChannelStatus: Sendable, Equatable {
    case idle, connecting, open, closed
}

/// The last this many chat lines are kept — a room's chat is not a transcript.
let chatHistoryLimit = 100

struct RoomChannelState: Equatable, Sendable {
    var status: ChannelStatus
    /// Null until the first `presence` — which is not an empty room. Null means
    /// "fall back to the polled party"; `[]` means "nobody is here".
    var members: [RoomMember]?
    /// Who is speaking, by user id. Sorted, so equal rooms compare equal.
    var speaking: [String]
    var producers: [RoomProducer]
    /// Null until `hello`. `available: false` carries the reason the room shows.
    var sfu: SFUInfo?
    /// The room's chat, oldest first, capped at `chatHistoryLimit`. Ephemeral.
    var messages: [ChatLine]
    /// The room was archived or is gone; the socket is closed for good.
    var archived: Bool
    /// Whether a closed socket is expected back. A drop retries; a 4401/4403 does not.
    var retrying: Bool
    /// Bumped on `sfu:voiceReset` so the audio layer rebuilds from step one.
    var voiceReset: Int

    static let initial = RoomChannelState(
        status: .idle, members: nil, speaking: [], producers: [],
        sfu: nil, messages: [], archived: false, retrying: false, voiceReset: 0
    )
}

enum ChannelAction: Sendable {
    case connecting
    /// `permanent` for a refusal retrying cannot fix — 4401, 4403, no session.
    case closed(permanent: Bool)
    case frame(InboundFrame)
}

/// The room after one thing happened.
func reduceChannel(_ state: RoomChannelState, _ action: ChannelAction) -> RoomChannelState {
    switch action {
    case .connecting:
        if state.status == .connecting && state.retrying { return state }
        var next = state
        next.status = .connecting
        next.retrying = true
        return next

    case let .closed(permanent):
        // Members are kept across a drop on purpose: the room did not empty, the
        // connection did. Speaking and producers do not survive — those are
        // claims about *now*, and a closed socket knows nothing about now.
        var next = state
        next.status = .closed
        next.speaking = []
        next.producers = []
        next.retrying = !permanent
        return next

    case let .frame(frame):
        return reduceFrame(state, frame)
    }
}

private func reduceFrame(_ state: RoomChannelState, _ frame: InboundFrame) -> RoomChannelState {
    switch frame {
    case let .hello(_, _, sfu):
        var next = state
        next.status = .open
        next.retrying = false
        next.sfu = sfu
        return next

    case .archived:
        if state.archived { return state }
        var next = state
        next.archived = true
        return next

    case let .presence(members):
        var next = state
        next.status = .open
        next.retrying = false
        next.members = members
        // A member who left is no longer speaking, whatever their last frame said.
        let present = Set(members.map(\.userId))
        let speaking = state.speaking.filter { present.contains($0) }
        if speaking.count != state.speaking.count { next.speaking = speaking }
        return next

    case let .speaking(userId, isSpeaking):
        let has = state.speaking.contains(userId)
        if isSpeaking == has { return state }
        var next = state
        next.speaking = isSpeaking ? (state.speaking + [userId]).sorted()
                                   : state.speaking.filter { $0 != userId }
        return next

    case let .newProducer(producerId, userId):
        if producerId.isEmpty || state.producers.contains(where: { $0.producerId == producerId }) { return state }
        var next = state
        next.producers.append(RoomProducer(producerId: producerId, userId: userId))
        return next

    case let .producerClosed(producerId, _):
        if !state.producers.contains(where: { $0.producerId == producerId }) { return state }
        var next = state
        next.producers.removeAll { $0.producerId == producerId }
        return next

    case let .producers(list):
        var next = state
        next.producers = list
        return next

    case .voiceReset:
        var next = state
        next.voiceReset += 1
        return next

    case let .sfuUnavailable(reason):
        var next = state
        next.sfu = SFUInfo(available: false, reason: reason)
        return next

    case let .chat(line):
        // The sender's own optimistic echo would double the line; the last id is
        // the only one worth checking, since a chat box never gets one out of order.
        if state.messages.last?.id == line.id { return state }
        var next = state
        next.messages = Array((state.messages + [line]).suffix(chatHistoryLimit))
        return next

    case .reply, .unknown, .error:
        // A reply is delivered to whoever asked, not to the room; an unknown type
        // is a server from another version, and the room carries on.
        return state
    }
}

// MARK: - Reconnection and the socket URL

/// First retry, and the ceiling. A room is worth waiting half a minute for.
let backoffMinMS = 1_000
let backoffMaxMS = 30_000

/// How long to wait before retry number `attempt` (0-based): doubling from one
/// second to thirty. Deterministic; the caller adds jitter, where a random
/// number belongs, so the schedule can be asserted.
func backoffDelay(attempt: Int) -> Int {
    let step = max(0, attempt)
    // 2^step, capped, without overflowing for large attempts.
    if step >= 30 { return backoffMaxMS }
    return min(backoffMaxMS, backoffMinMS * (1 << step))
}

/// The socket URL for a room, from the configured API base.
///
/// `http` -> `ws` and `https` -> `wss`. The base already ends in `/api` in every
/// live deployment (`AppConfig.apiBaseURL` is `https://<host>/api`), so a
/// trailing `/api` path segment is stripped before the `/api/rooms/ws` suffix is
/// added — one `/api`, never the `/api/api/rooms/ws` that silently 404'd the
/// upgrade. Only a trailing path segment is touched; a host like
/// `api.nishany.com` is left alone. Returns nil for an empty code.
func roomSocketURL(base: URL, code: String) -> URL? {
    guard !code.isEmpty else { return nil }
    guard var components = URLComponents(url: base, resolvingAgainstBaseURL: false) else { return nil }

    var path = components.path
    while path.hasSuffix("/") { path.removeLast() }
    if path.lowercased().hasSuffix("/api") { path.removeLast(4) }
    components.path = path + "/api/rooms/ws"

    components.scheme = (components.scheme?.lowercased() == "http") ? "ws" : "wss"
    components.queryItems = [URLQueryItem(name: "code", value: code)]
    return components.url
}
