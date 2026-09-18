import Foundation

/// The room's live connection.
///
/// One WebSocket per open room, carrying presence, speaking, chat and the SFU
/// negotiation. A port of `src/lib/rooms/useRoomChannel.ts`: everything the
/// socket *decides* lives in `RoomChannelState.reduceChannel` and is tested
/// there; this owns only the socket, the retries and the request/response
/// bookkeeping.
///
/// Native clients authenticate with a bearer token in the WebSocket subprotocol
/// (`["nishany.bearer", <jwt>]`) — the web sends a cookie, which a native app
/// has no way to attach to an upgrade. Frames are correlated by an incrementing
/// `requestId` the server echoes.
actor RoomChannel {

    /// The subprotocol that carries the bearer token, matching `roomsRealtime.js`.
    static let bearerProtocol = "nishany.bearer"

    /// Refused at the door (not a member) or evicted (left / removed / archived).
    /// Retrying either is a loop that never succeeds; the REST poll is the fallback.
    private static let closeNotAMember = 4401
    private static let closeEvicted = 4403

    private static let requestTimeoutNS: UInt64 = 15 * 1_000_000_000
    private static let heartbeatNS: UInt64 = 20 * 1_000_000_000
    private static let frameCap = 16 * 1024

    enum ChannelError: Error, Equatable {
        case notConnected
        case timeout
        case server(String)
        case closed(String)
    }

    private let base: URL
    private let code: String
    private let token: SynapseAPI.TokenProvider
    private let urlSession: URLSession

    /// The stream the model reduces. Connecting / closed / frame actions.
    nonisolated let frames: AsyncStream<ChannelAction>
    private let framesContinuation: AsyncStream<ChannelAction>.Continuation

    private var task: URLSessionWebSocketTask?
    private var runner: Task<Void, Never>?
    private var pingTask: Task<Void, Never>?
    private var pending: [Int: CheckedContinuation<[String: Any], Error>] = [:]
    private var nextRequestId = 0
    private var attempt = 0
    private var stopped = false

    init(base: URL, code: String, token: @escaping SynapseAPI.TokenProvider, urlSession: URLSession = .shared) {
        self.base = base
        self.code = code
        self.token = token
        self.urlSession = urlSession
        var continuation: AsyncStream<ChannelAction>.Continuation!
        self.frames = AsyncStream(bufferingPolicy: .unbounded) { continuation = $0 }
        self.framesContinuation = continuation
    }

    // MARK: - Lifecycle

    func start() {
        guard runner == nil, !stopped else { return }
        runner = Task { await self.runLoop() }
    }

    func stop() {
        guard !stopped else { return }
        stopped = true
        runner?.cancel()
        runner = nil
        stopPing()
        failAllPending(.closed("The room was closed."))
        task?.cancel(with: .normalClosure, reason: Data("left".utf8))
        task = nil
        framesContinuation.yield(.closed(permanent: true))
        framesContinuation.finish()
    }

    private func runLoop() async {
        while !stopped {
            framesContinuation.yield(.connecting)

            let bearer: String?
            do { bearer = try await token() } catch { bearer = nil }
            guard let bearer, !bearer.isEmpty, !stopped else {
                // No session -> retrying is pointless, exactly as the web bails.
                framesContinuation.yield(.closed(permanent: true))
                return
            }
            guard let url = roomSocketURL(base: base, code: code) else {
                framesContinuation.yield(.closed(permanent: true))
                return
            }

            let ws = urlSession.webSocketTask(with: url, protocols: [Self.bearerProtocol, bearer])
            ws.maximumMessageSize = Self.frameCap
            task = ws
            ws.resume()
            startPing()

            let permanent = await receiveLoop(ws)

            stopPing()
            if task === ws { task = nil }
            failAllPending(.closed("The room connection closed."))
            framesContinuation.yield(.closed(permanent: permanent))
            if permanent || stopped { return }

            // A little jitter so twenty students dropped by one flaky wifi do not
            // all come back in the same millisecond.
            let delayMS = backoffDelay(attempt: attempt) + Int.random(in: 0..<400)
            attempt += 1
            try? await Task.sleep(nanoseconds: UInt64(delayMS) * 1_000_000)
        }
    }

    /// Pumps inbound frames until the socket closes. Returns whether the close
    /// is permanent (a 4401/4403 the client must not retry).
    private func receiveLoop(_ ws: URLSessionWebSocketTask) async -> Bool {
        while !stopped {
            do {
                let message = try await ws.receive()
                // A message means we are connected; reset the retry schedule.
                attempt = 0
                switch message {
                case let .string(text): handleFrame(text)
                case let .data(data): if let text = String(data: data, encoding: .utf8) { handleFrame(text) }
                @unknown default: break
                }
            } catch {
                // `closeCode` carries the application code the server sent. On the
                // platforms this ships to it preserves custom codes (4401/4403);
                // if it ever reports `.invalid` instead, the room simply retries
                // and the REST poll reports the same refusal.
                // ponytail: trusts closeCode.rawValue for 4401/4403; REST poll is the backstop if it degrades.
                let raw = ws.closeCode.rawValue
                return raw == Self.closeNotAMember || raw == Self.closeEvicted
            }
        }
        return true
    }

    // MARK: - Sending

    /// Fire and forget: `speaking`, `ping`, `presence:refresh`, chat.
    func send(_ frame: [String: Any]) {
        guard let ws = task, let text = Self.encode(frame) else { return }
        ws.send(.string(text)) { _ in }
    }

    /// Ask and wait. Attaches a `requestId`, resolves on the matching reply,
    /// rejects on timeout, an `error` reply, or the socket closing.
    func request(_ frame: [String: Any]) async throws -> [String: Any] {
        guard let ws = task else { throw ChannelError.notConnected }
        nextRequestId += 1
        let id = nextRequestId
        var payload = frame
        payload["requestId"] = id
        guard let text = Self.encode(payload) else { throw ChannelError.notConnected }

        return try await withCheckedThrowingContinuation { continuation in
            pending[id] = continuation
            ws.send(.string(text)) { [weak self] error in
                guard let error else { return }
                Task { await self?.rejectPending(id, .closed(error.localizedDescription)) }
            }
            Task { [weak self] in
                try? await Task.sleep(nanoseconds: Self.requestTimeoutNS)
                await self?.rejectPending(id, .timeout)
            }
        }
    }

    /// Send a chat line to the whole room, or — with `toUserId` — to one member.
    func sendChat(_ text: String, to userId: String?) {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }
        var frame: [String: Any] = ["type": "chat", "text": trimmed]
        if let userId { frame["to"] = userId }
        send(frame)
    }

    // MARK: - Inbound routing

    private func handleFrame(_ text: String) {
        guard let data = text.data(using: .utf8),
              let object = try? JSONSerialization.jsonObject(with: data),
              let dict = object as? [String: Any],
              let type = dict["type"] as? String
        else { return }

        let requestId = (dict["requestId"] as? NSNumber)?.intValue
        if let id = requestId, pending[id] != nil {
            if type == "error" {
                rejectPending(id, .server(dict["error"] as? String ?? "failed"))
            } else {
                resolvePending(id, dict)
            }
            // A refusal is also room state — the hall must be able to say voice is
            // unavailable — so `sfu:unavailable` keeps falling through to the room.
            if type != "sfu:unavailable" { return }
        }

        if let parsed = InboundFrame.parse(text) {
            framesContinuation.yield(.frame(parsed.frame))
        }
    }

    // MARK: - Pending bookkeeping

    private func resolvePending(_ id: Int, _ json: [String: Any]) {
        pending.removeValue(forKey: id)?.resume(returning: json)
    }

    private func rejectPending(_ id: Int, _ error: ChannelError) {
        pending.removeValue(forKey: id)?.resume(throwing: error)
    }

    private func failAllPending(_ error: ChannelError) {
        let all = pending
        pending.removeAll()
        for (_, continuation) in all { continuation.resume(throwing: error) }
    }

    // MARK: - Heartbeat

    private func startPing() {
        stopPing()
        pingTask = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(nanoseconds: Self.heartbeatNS)
                if Task.isCancelled { return }
                await self?.send(["type": "ping"])
            }
        }
    }

    private func stopPing() {
        pingTask?.cancel()
        pingTask = nil
    }

    // MARK: - Encoding

    private static func encode(_ frame: [String: Any]) -> String? {
        guard let data = try? JSONSerialization.data(withJSONObject: frame) else { return nil }
        return String(data: data, encoding: .utf8)
    }
}
