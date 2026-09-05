import Foundation
import Observation

/// The room's live connection: one WebSocket carrying presence, speaking, and
/// the SFU negotiation. The iOS counterpart of `src/lib/rooms/useRoomChannel.ts`.
///
/// It owns the socket, the retries, and request/response correlation; what a
/// frame *means* is decided by the pure `RoomVoiceProtocol`, so this file has no
/// parsing logic of its own to get wrong. The token is read fresh on every
/// connect — a reconnect after the phone slept must not present the token that
/// expired while it was off.
@MainActor
@Observable
final class RoomVoiceChannel {

    struct Producer: Equatable, Sendable { let producerId: String; let userId: String }

    private(set) var connected = false
    private(set) var retrying = false
    private(set) var archived = false
    private(set) var sfu: RoomVoiceProtocol.SFUInfo?
    private(set) var members: [RoomVoiceProtocol.Member]?
    private(set) var speaking: Set<String> = []
    private(set) var producers: [Producer] = []
    private(set) var selfUserId: String?

    /// Called after any inbound frame is applied, so the audio controller can
    /// reconcile its consumers with `producers` and react to a dropped socket —
    /// the imperative counterpart of the web client's effects.
    var onChange: (() -> Void)?

    private let base: URL
    private let code: String
    private let token: @Sendable () async -> String?

    private var task: URLSessionWebSocketTask?
    private var pending: [Int: CheckedContinuation<Data, Error>] = [:]
    private var nextId = 0
    private var generation = 0
    private var closedForGood = false
    private var retries = 0
    private var retryTask: Task<Void, Never>?

    /// 1 s → 30 s, doubling, matching the web client.
    private static let backoffMin: TimeInterval = 1
    private static let backoffMax: TimeInterval = 30
    private static let requestTimeout: TimeInterval = 15

    init(base: URL, code: String, token: @escaping @Sendable () async -> String?) {
        self.base = base
        self.code = code
        self.token = token
    }

    // MARK: - Lifecycle

    func start() {
        closedForGood = false
        generation += 1
        connect(generation)
    }

    func stop() {
        closedForGood = true
        generation += 1
        retryTask?.cancel()
        failPending(RoomVoiceError.sdp("channel closed"))
        task?.cancel(with: .normalClosure, reason: "left".data(using: .utf8))
        task = nil
        connected = false
        retrying = false
        speaking = []
        producers = []
    }

    private func connect(_ mine: Int) {
        Task { [weak self] in
            guard let self, mine == self.generation, !self.closedForGood else { return }
            self.retrying = true
            let token = await self.token()
            guard mine == self.generation, !self.closedForGood else { return }
            guard let token, let url = RoomVoiceProtocol.socketURL(base: self.base, code: self.code) else {
                // No session (or no base): fall back silently, like the web client.
                self.connected = false
                self.retrying = false
                return
            }
            let ws = URLSession.shared.webSocketTask(
                with: url,
                protocols: RoomVoiceProtocol.subprotocols(token: token),
            )
            self.task = ws
            ws.resume()
            self.receive(ws, mine)
        }
    }

    private func receive(_ ws: URLSessionWebSocketTask, _ mine: Int) {
        ws.receive { [weak self] result in
            Task { @MainActor [weak self] in
                guard let self, mine == self.generation, ws === self.task else { return }
                switch result {
                case .success(let message):
                    switch message {
                    case .string(let text): self.handle(Data(text.utf8))
                    case .data(let data): self.handle(data)
                    @unknown default: break
                    }
                    self.receive(ws, mine)
                case .failure:
                    self.handleClose(ws, mine)
                }
            }
        }
    }

    private func handleClose(_ ws: URLSessionWebSocketTask, _ mine: Int) {
        guard mine == self.generation, !closedForGood else { return }
        connected = false
        // These are claims about *now*; a closed socket knows nothing about now.
        speaking = []
        producers = []
        failPending(RoomVoiceError.sdp("the room connection closed"))
        defer { onChange?() }
        // 4401 "never a member" and 4403 "no longer a member" are permanent:
        // retrying is a loop that never succeeds. Everything else is transient.
        let code = ws.closeCode.rawValue
        if code == 4401 || code == 4403 {
            if code == 4403 { archived = true }
            closedForGood = true
            retrying = false
            return
        }
        schedule(mine)
    }

    private func schedule(_ mine: Int) {
        retrying = true
        let step = min(Double(retries), 5)
        retries += 1
        let delay = min(Self.backoffMax, Self.backoffMin * pow(2, step)) + Double.random(in: 0..<0.4)
        retryTask = Task { [weak self] in
            try? await Task.sleep(for: .seconds(delay))
            guard let self, !Task.isCancelled, mine == self.generation, !self.closedForGood else { return }
            self.connect(mine)
        }
    }

    // MARK: - Frames

    private func handle(_ data: Data) {
        if let requestId = RoomVoiceProtocol.requestId(in: data), let continuation = pending.removeValue(forKey: requestId) {
            if let error = try? JSONDecoder().decode(RoomVoiceProtocol.ErrorReply.self, from: data), !error.error.isEmpty {
                continuation.resume(throwing: RoomVoiceError.sdp(error.error))
            } else {
                continuation.resume(returning: data)
            }
            // Fall through: a reply is not an event (parses to `.other`), but a
            // refusal (`sfu:unavailable`) is also room state and must be applied.
        }
        guard let event = RoomVoiceProtocol.parseEvent(data) else { return }
        apply(event)
        onChange?()
    }

    private func apply(_ event: RoomVoiceProtocol.Event) {
        switch event {
        case .hello(let userId, let sfu):
            connected = true
            retrying = true
            retries = 0
            selfUserId = userId
            self.sfu = sfu
        case .presence(let members):
            connected = true
            self.members = members
            let present = Set(members.map(\.userId))
            speaking = speaking.intersection(present)
        case .speaking(let userId, let isSpeaking):
            if isSpeaking { speaking.insert(userId) } else { speaking.remove(userId) }
        case .newProducer(let producerId, let userId):
            if !producers.contains(where: { $0.producerId == producerId }) {
                producers.append(Producer(producerId: producerId, userId: userId))
            }
        case .producerClosed(let producerId, _):
            producers.removeAll { $0.producerId == producerId }
        case .sfuUnavailable(let reason):
            sfu = RoomVoiceProtocol.SFUInfo(available: false, reason: reason)
        case .archived:
            archived = true
        case .other:
            break
        }
    }

    private func failPending(_ error: Error) {
        for continuation in pending.values { continuation.resume(throwing: error) }
        pending.removeAll()
    }

    // MARK: - Sending

    /// Fire and forget: `speaking`, `sfu:pause`, `sfu:close`.
    func send<Message: Encodable>(_ message: Message) {
        guard let task, let data = try? JSONEncoder().encode(message),
              let text = String(data: data, encoding: .utf8) else { return }
        task.send(.string(text)) { _ in }
    }

    /// Ask and wait. The reply echoes the `requestId` this assigns.
    func request<Message: Encodable>(_ make: (Int) -> Message) async throws -> Data {
        guard let task else { throw RoomVoiceError.sdp("the room is not connected") }
        nextId += 1
        let id = nextId
        let message = make(id)
        guard let data = try? JSONEncoder().encode(message), let text = String(data: data, encoding: .utf8) else {
            throw RoomVoiceError.sdp("could not encode request")
        }
        return try await withCheckedThrowingContinuation { continuation in
            pending[id] = continuation
            task.send(.string(text)) { [weak self] error in
                if let error {
                    Task { @MainActor in
                        if let self, let pending = self.pending.removeValue(forKey: id) {
                            pending.resume(throwing: error)
                        }
                    }
                }
            }
            Task { [weak self] in
                try? await Task.sleep(for: .seconds(Self.requestTimeout))
                guard let self, let pending = self.pending.removeValue(forKey: id) else { return }
                pending.resume(throwing: RoomVoiceError.sdp("the room did not answer in time"))
            }
        }
    }
}
