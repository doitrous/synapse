import Foundation

/// What a study room's socket says.
///
/// A port of the inbound half of `src/lib/rooms/roomChannel.ts`: the same raw
/// WebSocket protocol the web hall speaks, decoded once here so the reducer and
/// the channel client both work in typed frames. Parsing never throws — a socket
/// does not get to crash the room by sending an array, and a frame from a newer
/// server decodes as `.unknown` rather than an error.

/// A member of a room, as presence and the party REST both describe them.
struct RoomMember: Decodable, Equatable, Identifiable, Sendable {
    let userId: String
    let displayName: String
    let role: String
    let joinedAt: String?
    let lastActiveAt: String?
    let activity: String

    var id: String { userId }
    /// The name to show, never blank. The server sends "" for a nameless row.
    var name: String { displayName.trimmingCharacters(in: .whitespaces).isEmpty ? "Student" : displayName }
    var isHost: Bool { role == "host" }

    init(userId: String, displayName: String, role: String, joinedAt: String?, lastActiveAt: String?, activity: String) {
        self.userId = userId
        self.displayName = displayName
        self.role = role
        self.joinedAt = joinedAt
        self.lastActiveAt = lastActiveAt
        self.activity = activity
    }

    enum CodingKeys: String, CodingKey {
        case userId, displayName, role, joinedAt, lastActiveAt, activity
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        userId = try c.decode(String.self, forKey: .userId)
        displayName = (try? c.decode(String.self, forKey: .displayName)) ?? ""
        role = (try? c.decode(String.self, forKey: .role)) ?? "member"
        joinedAt = try? c.decodeIfPresent(String.self, forKey: .joinedAt)
        lastActiveAt = try? c.decodeIfPresent(String.self, forKey: .lastActiveAt)
        activity = (try? c.decode(String.self, forKey: .activity)) ?? "idle"
    }
}

/// A remote voice producer: one member's microphone, by id.
struct RoomProducer: Equatable, Sendable {
    let producerId: String
    let userId: String
}

/// One line of room chat, public or whispered to a single member.
struct ChatLine: Decodable, Equatable, Identifiable, Sendable {
    let id: String
    let from: String
    let text: String
    let at: String
    /// Set only when this line was addressed to one member rather than the room.
    let isPrivate: Bool
    /// The addressed member's userId, present only alongside `isPrivate`.
    let to: String?

    init(id: String, from: String, text: String, at: String, isPrivate: Bool, to: String?) {
        self.id = id
        self.from = from
        self.text = text
        self.at = at
        self.isPrivate = isPrivate
        self.to = to
    }

    enum CodingKeys: String, CodingKey {
        case id, from, text, at
        case isPrivate = "private"
        case to
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        id = try c.decode(String.self, forKey: .id)
        from = try c.decode(String.self, forKey: .from)
        text = try c.decode(String.self, forKey: .text)
        at = (try? c.decode(String.self, forKey: .at)) ?? ""
        isPrivate = (try? c.decode(Bool.self, forKey: .isPrivate)) ?? false
        to = try? c.decodeIfPresent(String.self, forKey: .to)
    }
}

/// One WebRTC ICE server, as the SFU hands it over. `urls` may arrive as a bare
/// string or an array; both normalise to `[String]`.
struct ICEServer: Codable, Equatable, Sendable {
    let urls: [String]
    let username: String?
    let credential: String?

    enum CodingKeys: String, CodingKey { case urls, username, credential }

    init(urls: [String], username: String?, credential: String?) {
        self.urls = urls
        self.username = username
        self.credential = credential
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        if let one = try? c.decode(String.self, forKey: .urls) {
            urls = [one]
        } else {
            urls = (try? c.decode([String].self, forKey: .urls)) ?? []
        }
        username = try? c.decodeIfPresent(String.self, forKey: .username)
        credential = try? c.decodeIfPresent(String.self, forKey: .credential)
    }
}

/// The SFU's availability for a room, and how to reach it.
struct SFUInfo: Decodable, Equatable, Sendable {
    let available: Bool
    let reason: String?
    let iceServers: [ICEServer]?

    init(available: Bool, reason: String? = nil, iceServers: [ICEServer]? = nil) {
        self.available = available
        self.reason = reason
        self.iceServers = iceServers
    }
}

/// One decoded inbound frame.
enum InboundFrame: Sendable {
    case hello(userId: String, roomId: String, sfu: SFUInfo)
    case presence([RoomMember])
    case speaking(userId: String, speaking: Bool)
    case chat(ChatLine)
    case archived(roomId: String)
    case newProducer(producerId: String, userId: String)
    case producerClosed(producerId: String, userId: String)
    case producers([RoomProducer])
    case voiceReset
    case sfuUnavailable(reason: String)
    case error(String)
    /// A reply to a request the caller is awaiting — the raw JSON, for whoever asked.
    case reply(type: String, json: [String: Any])
    /// A frame from a newer server. The room carries on.
    case unknown

    /// Parse one frame of JSON. Returns the decoded frame and any `requestId`
    /// the server echoed, or nil when the input is not a room frame at all
    /// (bad JSON, not an object, or no string `type`).
    static func parse(_ raw: String) -> (frame: InboundFrame, requestId: Int?)? {
        guard let data = raw.data(using: .utf8),
              let object = try? JSONSerialization.jsonObject(with: data),
              let dict = object as? [String: Any],
              let type = dict["type"] as? String
        else { return nil }

        let requestId = (dict["requestId"] as? NSNumber)?.intValue

        func decode<T: Decodable>(_ t: T.Type) -> T? { try? JSONDecoder().decode(t, from: data) }

        switch type {
        case "hello":
            struct Env: Decodable { let userId: String?; let roomId: String?; let sfu: SFUInfo? }
            let env = decode(Env.self)
            return (.hello(userId: env?.userId ?? "", roomId: env?.roomId ?? "",
                           sfu: env?.sfu ?? SFUInfo(available: false)), requestId)

        case "presence":
            struct Env: Decodable { let members: [RoomMember]? }
            return (.presence(decode(Env.self)?.members ?? []), requestId)

        case "speaking":
            let uid = dict["userId"] as? String ?? ""
            let flag = (dict["speaking"] as? Bool) ?? ((dict["speaking"] as? NSNumber)?.boolValue ?? false)
            guard !uid.isEmpty else { return (.unknown, requestId) }
            return (.speaking(userId: uid, speaking: flag), requestId)

        case "chat":
            guard let line = decode(ChatLine.self) else { return (.unknown, requestId) }
            return (.chat(line), requestId)

        case "archived":
            return (.archived(roomId: dict["roomId"] as? String ?? ""), requestId)

        case "sfu:newProducer":
            return (.newProducer(producerId: dict["producerId"] as? String ?? "",
                                 userId: dict["userId"] as? String ?? ""), requestId)

        case "sfu:producerClosed":
            return (.producerClosed(producerId: dict["producerId"] as? String ?? "",
                                    userId: dict["userId"] as? String ?? ""), requestId)

        case "sfu:producers":
            // A reply the caller awaits: the channel resolves it by requestId and
            // (unlike unavailable) does not forward it to the room. RoomAudio reads
            // the producer list out of the raw JSON. `producers(_:)` on the reducer
            // stays for parity with the web reducer and its test.
            return (.reply(type: type, json: dict), requestId)

        case "sfu:voiceReset":
            return (.voiceReset, requestId)

        case "sfu:unavailable":
            return (.sfuUnavailable(reason: dict["reason"] as? String ?? "unavailable"), requestId)

        case "error":
            return (.error(dict["error"] as? String ?? "failed"), requestId)

        default:
            // Every other type is a reply to a request (createTransport, consume,
            // resume, produce, …). If it has no requestId it is an unknown frame.
            if requestId != nil {
                return (.reply(type: type, json: dict), requestId)
            }
            return (.unknown, requestId)
        }
    }
}
