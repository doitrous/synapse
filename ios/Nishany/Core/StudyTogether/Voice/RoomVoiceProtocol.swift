import Foundation

/// The study-room voice wire protocol, as pure values.
///
/// Mirrors `src/lib/rooms/roomChannel.ts` and the contract in
/// `docs/rooms-voice.md`: the socket URL (with the historical `/api` strip),
/// the bearer subprotocol pair, the frames the server sends, and the frames the
/// client sends. Everything here is free of `URLSession` and of WebRTC, so the
/// whole contract can be exercised in a unit test the way the web client's is.

enum RoomVoiceProtocol {

    /// The subprotocol that carries the bearer token. Matches the server's
    /// `BEARER_PROTOCOL` in `server/src/roomsRealtime.js`.
    static let bearerSubprotocol = "nishany.bearer"

    /// The two subprotocols a socket offers: the marker, then the token.
    ///
    /// The server rejects the handshake unless the marker is offered, even when
    /// an `Authorization` header is also present — so this array is not
    /// optional, it is the authentication.
    static func subprotocols(token: String) -> [String] {
        [bearerSubprotocol, token]
    }

    /// The socket URL for a room, from the app's API base.
    ///
    /// `apiBaseURL` already ends in `/api` (see `AppConfig`), and every live
    /// deployment serves the socket at `/api/rooms/ws`. A trailing `/api` path
    /// segment is stripped before the suffix is added, so the base resolves to
    /// one `/api`, never the `/api/api/rooms/ws` that silently 404'd the upgrade
    /// and left every room reporting voice unavailable. `http`→`ws`,
    /// `https`→`wss`. Only a trailing path segment is touched; a host such as
    /// `api.nishany.com` is left alone.
    static func socketURL(base: URL, code: String) -> URL? {
        guard !code.isEmpty, var components = URLComponents(url: base, resolvingAgainstBaseURL: false) else {
            return nil
        }
        var path = components.path
        while path.hasSuffix("/") { path.removeLast() }
        if path.lowercased().hasSuffix("/api") { path.removeLast(4) }
        components.path = path + "/api/rooms/ws"
        components.scheme = (components.scheme?.lowercased() == "https") ? "wss" : "ws"
        components.queryItems = [URLQueryItem(name: "code", value: code)]
        return components.url
    }

    // MARK: - Server → client

    /// One room member, as the presence frame describes them. Only the fields
    /// the hall draws are decoded; the seat and activity the web client uses are
    /// ignored here because the voice roster shows names and speaking, not desks.
    struct Member: Decodable, Sendable, Equatable, Identifiable {
        let userId: String
        let displayName: String?
        var id: String { userId }
        var name: String { (displayName?.isEmpty == false ? displayName : nil) ?? "Student" }
    }

    struct SFUInfo: Decodable, Sendable, Equatable {
        let available: Bool
        let reason: String?

        init(available: Bool, reason: String? = nil) {
            self.available = available
            self.reason = reason
        }
    }

    /// A frame that is *not* a reply to a request — the room's own news.
    enum Event: Sendable, Equatable {
        case hello(userId: String, sfu: SFUInfo)
        case presence(members: [Member])
        case speaking(userId: String, speaking: Bool)
        case newProducer(producerId: String, userId: String)
        case producerClosed(producerId: String, userId: String)
        case sfuUnavailable(reason: String)
        case archived
        /// A `type` this client does not model. The room carries on.
        case other
    }

    /// The `requestId` on a frame, if it has one. Used to route replies.
    static func requestId(in data: Data) -> Int? {
        guard let object = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return nil }
        return object["requestId"] as? Int
    }

    /// Parse one server frame into a room event.
    ///
    /// Anything that is not a JSON object with a string `type` is `nil` — noise,
    /// or a client from another version, and the room ignores it rather than
    /// closing over it. An unknown `type` is `.other`, not `nil`, so the caller
    /// can tell "not a message" from "a message I don't act on".
    static func parseEvent(_ data: Data) -> Event? {
        guard let object = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let type = object["type"] as? String else { return nil }
        switch type {
        case "hello":
            let sfuObject = object["sfu"] as? [String: Any]
            let sfu = SFUInfo(
                available: (sfuObject?["available"] as? Bool) ?? false,
                reason: sfuObject?["reason"] as? String,
            )
            return .hello(userId: (object["userId"] as? String) ?? "", sfu: sfu)
        case "presence":
            let raw = object["members"] as? [[String: Any]] ?? []
            let members = raw.compactMap { entry -> Member? in
                guard let userId = entry["userId"] as? String else { return nil }
                return Member(userId: userId, displayName: entry["displayName"] as? String)
            }
            return .presence(members: members)
        case "speaking":
            guard let userId = object["userId"] as? String else { return .other }
            return .speaking(userId: userId, speaking: (object["speaking"] as? Bool) ?? false)
        case "sfu:newProducer":
            guard let producerId = object["producerId"] as? String else { return .other }
            return .newProducer(producerId: producerId, userId: (object["userId"] as? String) ?? "")
        case "sfu:producerClosed":
            guard let producerId = object["producerId"] as? String else { return .other }
            return .producerClosed(producerId: producerId, userId: (object["userId"] as? String) ?? "")
        case "sfu:unavailable":
            return .sfuUnavailable(reason: (object["reason"] as? String) ?? "Voice is unavailable right now.")
        case "archived":
            return .archived
        default:
            return .other
        }
    }

    // MARK: - Reply payloads (decoded at the call site from a reply's Data)

    /// A relay/STUN server the client should use, as the server hands it over.
    struct IceServer: Decodable, Sendable, Equatable {
        let urls: [String]
        let username: String?
        let credential: String?

        /// mediasoup may send `urls` as a single string or an array; accept both.
        init(from decoder: Decoder) throws {
            let c = try decoder.container(keyedBy: CodingKeys.self)
            if let single = try? c.decode(String.self, forKey: .urls) {
                urls = [single]
            } else {
                urls = try c.decodeIfPresent([String].self, forKey: .urls) ?? []
            }
            username = try c.decodeIfPresent(String.self, forKey: .username)
            credential = try c.decodeIfPresent(String.self, forKey: .credential)
        }
        enum CodingKeys: String, CodingKey { case urls, username, credential }
    }

    struct RtpCapabilitiesReply: Decodable, Sendable {
        let rtpCapabilities: RtpCapabilities
        let iceServers: [IceServer]?
    }

    struct CreateTransportReply: Decodable, Sendable {
        let id: String
        let iceParameters: IceParameters
        let iceCandidates: [IceCandidate]
        let dtlsParameters: DtlsParameters
        let iceServers: [IceServer]?
    }

    struct ProduceReply: Decodable, Sendable {
        let producerId: String
    }

    struct ConsumeReply: Decodable, Sendable {
        let id: String
        let producerId: String
        let kind: String
        let rtpParameters: RtpParameters
        let producerUserId: String?
    }

    struct ProducersReply: Decodable, Sendable {
        struct Entry: Decodable, Sendable { let producerId: String; let userId: String }
        let producers: [Entry]
    }

    struct ErrorReply: Decodable, Sendable {
        let error: String
    }

    // MARK: - Client → server (each carries a requestId the reply echoes)

    /// Fire-and-forget frames (no reply awaited).
    struct SpeakingFrame: Encodable { let type = "speaking"; let speaking: Bool }
    struct PauseFrame: Encodable { let type = "sfu:pause"; let producerId: String; let paused: Bool }
    struct CloseFrame: Encodable { let type = "sfu:close" }

    /// Request frames. Built with the id the channel assigns.
    struct RtpCapabilitiesRequest: Encodable { let type = "sfu:rtpCapabilities"; let requestId: Int }
    struct CreateTransportRequest: Encodable { let type = "sfu:createTransport"; let requestId: Int; let direction: String }
    struct ConnectTransportRequest: Encodable {
        let type = "sfu:connectTransport"; let requestId: Int
        let transportId: String; let dtlsParameters: DtlsParameters
    }
    struct ProduceRequest: Encodable {
        let type = "sfu:produce"; let requestId: Int
        let transportId: String; let kind = "audio"; let rtpParameters: RtpParameters
    }
    struct ProducersRequest: Encodable { let type = "sfu:producers"; let requestId: Int }
    struct ConsumeRequest: Encodable {
        let type = "sfu:consume"; let requestId: Int
        let transportId: String; let producerId: String; let rtpCapabilities: RtpCapabilities
    }
    struct ResumeRequest: Encodable { let type = "sfu:resume"; let requestId: Int; let consumerId: String }
}
