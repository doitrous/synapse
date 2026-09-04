import Foundation
import Testing
@testable import Synapse

/// The study-room voice wire protocol, exercised the way the web client's
/// `roomChannel.test.ts` is: the socket URL (including the `/api` strip), the
/// auth subprotocols, and the encode/decode of the whole `sfu:*` contract.
struct RoomVoiceProtocolTests {

    // MARK: - Socket URL

    @Test func stripsTrailingApiAndSwitchesToWss() throws {
        let base = URL(string: "https://synapse.doitrous.com/api")!
        let url = try #require(RoomVoiceProtocol.socketURL(base: base, code: "ABCD"))
        #expect(url.absoluteString == "wss://synapse.doitrous.com/api/rooms/ws?code=ABCD")
    }

    @Test func localHttpBaseBecomesWs() throws {
        let base = URL(string: "http://localhost:8823/api")!
        let url = try #require(RoomVoiceProtocol.socketURL(base: base, code: "R1"))
        #expect(url.absoluteString == "ws://localhost:8823/api/rooms/ws?code=R1")
    }

    @Test func doesNotDoubleApiOrTouchHost() throws {
        // A host literally named api.* must be left alone; only a trailing path
        // segment is stripped.
        let base = URL(string: "https://api.nishany.com/api")!
        let url = try #require(RoomVoiceProtocol.socketURL(base: base, code: "X"))
        #expect(url.absoluteString == "wss://api.nishany.com/api/rooms/ws?code=X")
    }

    @Test func emptyCodeIsRejected() {
        #expect(RoomVoiceProtocol.socketURL(base: URL(string: "https://x/api")!, code: "") == nil)
    }

    // MARK: - Auth

    @Test func subprotocolsAreMarkerThenToken() {
        #expect(RoomVoiceProtocol.subprotocols(token: "jwt.abc") == ["nishany.bearer", "jwt.abc"])
    }

    // MARK: - Inbound events

    @Test func parsesHelloWithSfuAvailability() {
        let data = Data(#"{"type":"hello","userId":"u1","roomId":"r1","sfu":{"available":true}}"#.utf8)
        #expect(RoomVoiceProtocol.parseEvent(data) == .hello(userId: "u1", sfu: .init(available: true)))

        let off = Data(#"{"type":"hello","userId":"u1","sfu":{"available":false,"reason":"no worker"}}"#.utf8)
        #expect(RoomVoiceProtocol.parseEvent(off) == .hello(userId: "u1", sfu: .init(available: false, reason: "no worker")))
    }

    @Test func parsesPresenceMembers() {
        let data = Data(#"{"type":"presence","members":[{"userId":"a","displayName":"Amir"},{"userId":"b"}]}"#.utf8)
        guard case .presence(let members) = RoomVoiceProtocol.parseEvent(data)! else { Issue.record("not presence"); return }
        #expect(members.map(\.userId) == ["a", "b"])
        #expect(members[0].name == "Amir")
        #expect(members[1].name == "Student")
    }

    @Test func parsesSpeakingProducersAndArchived() {
        #expect(RoomVoiceProtocol.parseEvent(Data(#"{"type":"speaking","userId":"a","speaking":true}"#.utf8))
                == .speaking(userId: "a", speaking: true))
        #expect(RoomVoiceProtocol.parseEvent(Data(#"{"type":"sfu:newProducer","producerId":"p1","userId":"a"}"#.utf8))
                == .newProducer(producerId: "p1", userId: "a"))
        #expect(RoomVoiceProtocol.parseEvent(Data(#"{"type":"sfu:producerClosed","producerId":"p1","userId":"a"}"#.utf8))
                == .producerClosed(producerId: "p1", userId: "a"))
        #expect(RoomVoiceProtocol.parseEvent(Data(#"{"type":"archived","roomId":"r"}"#.utf8)) == .archived)
        #expect(RoomVoiceProtocol.parseEvent(Data(#"{"type":"sfu:unavailable","reason":"nope"}"#.utf8))
                == .sfuUnavailable(reason: "nope"))
    }

    @Test func unknownTypeIsOtherAndNoiseIsNil() {
        #expect(RoomVoiceProtocol.parseEvent(Data(#"{"type":"future"}"#.utf8)) == .other)
        #expect(RoomVoiceProtocol.parseEvent(Data("not json".utf8)) == nil)
        #expect(RoomVoiceProtocol.parseEvent(Data("[1,2,3]".utf8)) == nil)
    }

    @Test func requestIdIsReadForReplyRouting() {
        #expect(RoomVoiceProtocol.requestId(in: Data(#"{"type":"sfu:produce","producerId":"p","requestId":7}"#.utf8)) == 7)
        #expect(RoomVoiceProtocol.requestId(in: Data(#"{"type":"presence"}"#.utf8)) == nil)
    }

    // MARK: - Reply decoding

    @Test func decodesTransportReply() throws {
        let json = #"""
        {"type":"sfu:createTransport","id":"t1","iceParameters":{"usernameFragment":"uf","password":"pw","iceLite":true},
         "iceCandidates":[{"foundation":"1","priority":100,"address":"1.2.3.4","protocol":"udp","port":40000,"type":"host"}],
         "dtlsParameters":{"role":"auto","fingerprints":[{"algorithm":"sha-256","value":"AA:BB"}]},
         "iceServers":[{"urls":["stun:stun.l.google.com:19302"]}]}
        """#
        let reply = try JSONDecoder().decode(RoomVoiceProtocol.CreateTransportReply.self, from: Data(json.utf8))
        #expect(reply.id == "t1")
        #expect(reply.iceParameters.usernameFragment == "uf")
        #expect(reply.iceCandidates.first?.host == "1.2.3.4")
        #expect(reply.dtlsParameters.fingerprints.first?.value == "AA:BB")
        #expect(reply.iceServers?.first?.urls == ["stun:stun.l.google.com:19302"])
    }

    @Test func decodesConsumeReplyWithNumericAndStringFmtp() throws {
        let json = #"""
        {"type":"sfu:consume","id":"c1","producerId":"p1","kind":"audio","producerUserId":"b",
         "rtpParameters":{"codecs":[{"mimeType":"audio/opus","payloadType":100,"clockRate":48000,"channels":2,
           "parameters":{"useinbandfec":1,"maxplaybackrate":"48000"}}],
           "encodings":[{"ssrc":11111}],"rtcp":{"cname":"x","reducedSize":true}}}
        """#
        let reply = try JSONDecoder().decode(RoomVoiceProtocol.ConsumeReply.self, from: Data(json.utf8))
        #expect(reply.rtpParameters.codecs.first?.payloadType == 100)
        #expect(reply.rtpParameters.codecs.first?.parameters?["useinbandfec"]?.sdpText == "1")
        #expect(reply.rtpParameters.codecs.first?.parameters?["maxplaybackrate"]?.sdpText == "48000")
        #expect(reply.rtpParameters.encodings?.first?.ssrc == 11111)
    }

    // MARK: - Outbound encoding

    @Test func encodesProduceRequestWithRtpParameters() throws {
        let rtp = RtpParameters(
            mid: "0",
            codecs: [RtpCodecParameters(mimeType: "audio/opus", payloadType: 111, clockRate: 48000, channels: 2, parameters: nil, rtcpFeedback: nil)],
            headerExtensions: nil, encodings: [RtpEncoding(ssrc: 42, dtx: nil)], rtcp: RtcpParameters(cname: "c", reducedSize: true),
        )
        let data = try JSONEncoder().encode(RoomVoiceProtocol.ProduceRequest(requestId: 3, transportId: "t1", rtpParameters: rtp))
        let object = try #require(try JSONSerialization.jsonObject(with: data) as? [String: Any])
        #expect(object["type"] as? String == "sfu:produce")
        #expect(object["requestId"] as? Int == 3)
        #expect(object["kind"] as? String == "audio")
        #expect(object["transportId"] as? String == "t1")
    }

    @Test func encodesSpeakingAndPauseFrames() throws {
        let speaking = try JSONSerialization.jsonObject(with: JSONEncoder().encode(RoomVoiceProtocol.SpeakingFrame(speaking: true))) as? [String: Any]
        #expect(speaking?["type"] as? String == "speaking")
        #expect(speaking?["speaking"] as? Bool == true)

        let pause = try JSONSerialization.jsonObject(with: JSONEncoder().encode(RoomVoiceProtocol.PauseFrame(producerId: "p", paused: true))) as? [String: Any]
        #expect(pause?["type"] as? String == "sfu:pause")
        #expect(pause?["producerId"] as? String == "p")
        #expect(pause?["paused"] as? Bool == true)
    }
}
