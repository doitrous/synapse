import Foundation

/// The mediasoup ORTC shapes this app exchanges with the SFU.
///
/// These mirror what `server/src/roomsSfu.js` sends and expects — a router's
/// `rtpCapabilities`, a transport's `iceParameters`/`iceCandidates`/
/// `dtlsParameters`, and the `rtpParameters` of a producer and a consumer.
/// They are deliberately narrow: a study room carries one Opus audio stream in
/// each direction, no video and no simulcast, so only the fields that path
/// actually uses are modelled. Everything here is a plain `Codable` value, so
/// the mapping to and from SDP in `MediasoupSdp.swift` is pure and testable
/// without a socket or a native worker.
///
/// A note on the wire: mediasoup allows a codec `parameters` value to be a
/// string or a number ("minptime" vs `useinbandfec: 1`), so those maps are
/// carried as `CodecParameterValue` rather than `[String: String]`.

// MARK: - Capabilities

struct RtpCapabilities: Codable, Sendable, Equatable {
    var codecs: [RtpCodecCapability]
    var headerExtensions: [RtpHeaderExtensionCapability]

    enum CodingKeys: String, CodingKey { case codecs, headerExtensions }

    init(codecs: [RtpCodecCapability] = [], headerExtensions: [RtpHeaderExtensionCapability] = []) {
        self.codecs = codecs
        self.headerExtensions = headerExtensions
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        codecs = try c.decodeIfPresent([RtpCodecCapability].self, forKey: .codecs) ?? []
        headerExtensions = try c.decodeIfPresent([RtpHeaderExtensionCapability].self, forKey: .headerExtensions) ?? []
    }
}

struct RtpCodecCapability: Codable, Sendable, Equatable {
    var kind: String
    var mimeType: String
    var preferredPayloadType: Int?
    var clockRate: Int
    var channels: Int?
    var parameters: [String: CodecParameterValue]?
    var rtcpFeedback: [RtcpFeedback]?
}

struct RtpHeaderExtensionCapability: Codable, Sendable, Equatable {
    var kind: String?
    var uri: String
    var preferredId: Int
}

// MARK: - Parameters (a producer / consumer)

struct RtpParameters: Codable, Sendable, Equatable {
    var mid: String?
    var codecs: [RtpCodecParameters]
    var headerExtensions: [RtpHeaderExtensionParameters]?
    var encodings: [RtpEncoding]?
    var rtcp: RtcpParameters?
}

struct RtpCodecParameters: Codable, Sendable, Equatable {
    var mimeType: String
    var payloadType: Int
    var clockRate: Int
    var channels: Int?
    var parameters: [String: CodecParameterValue]?
    var rtcpFeedback: [RtcpFeedback]?
}

struct RtcpFeedback: Codable, Sendable, Equatable {
    var type: String
    var parameter: String?
}

struct RtpHeaderExtensionParameters: Codable, Sendable, Equatable {
    var uri: String
    var id: Int
    var encrypt: Bool?
}

struct RtpEncoding: Codable, Sendable, Equatable {
    var ssrc: UInt32?
    var dtx: Bool?
}

struct RtcpParameters: Codable, Sendable, Equatable {
    var cname: String?
    var reducedSize: Bool?
}

// MARK: - Transport (ICE + DTLS)

struct IceParameters: Codable, Sendable, Equatable {
    var usernameFragment: String
    var password: String
    var iceLite: Bool?
}

struct IceCandidate: Codable, Sendable, Equatable {
    var foundation: String
    var priority: Int
    var address: String?
    var ip: String?
    var `protocol`: String
    var port: Int
    var type: String
    var tcpType: String?

    /// mediasoup names the host `address`; older builds sent `ip`. Either works.
    var host: String { address ?? ip ?? "" }
}

struct DtlsParameters: Codable, Sendable, Equatable {
    var role: String?
    var fingerprints: [DtlsFingerprint]
}

struct DtlsFingerprint: Codable, Sendable, Equatable {
    /// mediasoup uses `algorithm`; SDP writes it as e.g. `sha-256`.
    var algorithm: String
    var value: String
}

// MARK: - A codec parameter that may be a string or a number

/// `fmtp` values are `key=value;…`, and mediasoup sends the value side as a
/// JSON string *or* number depending on the key. Modelled as a small enum so
/// neither shape is a decode failure and both round-trip to the same SDP text.
enum CodecParameterValue: Codable, Sendable, Equatable {
    case string(String)
    case int(Int)
    case double(Double)
    case bool(Bool)

    /// The value as it appears after `=` in an `a=fmtp` line.
    var sdpText: String {
        switch self {
        case .string(let s): return s
        case .int(let i): return String(i)
        case .double(let d): return d == d.rounded() ? String(Int(d)) : String(d)
        case .bool(let b): return b ? "1" : "0"
        }
    }

    init(from decoder: Decoder) throws {
        let c = try decoder.singleValueContainer()
        if let b = try? c.decode(Bool.self) { self = .bool(b); return }
        if let i = try? c.decode(Int.self) { self = .int(i); return }
        if let d = try? c.decode(Double.self) { self = .double(d); return }
        self = .string(try c.decode(String.self))
    }

    func encode(to encoder: Encoder) throws {
        var c = encoder.singleValueContainer()
        switch self {
        case .string(let s): try c.encode(s)
        case .int(let i): try c.encode(i)
        case .double(let d): try c.encode(d)
        case .bool(let b): try c.encode(b)
        }
    }
}
