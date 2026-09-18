import Foundation
import Testing
@testable import Synapse

/// The study-room socket speaks the protocol in `src/lib/rooms/roomChannel.ts`.
/// These pin the decode: a frame that changes shape on the server must break a
/// test here rather than silently drop presence or misroute a whisper.
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

    @Test("a member with a blank name falls back to Student")
    func blankName() throws {
        let raw = #"{"type":"presence","members":[{"userId":"u1","displayName":"","role":"member","lastActiveAt":null,"activity":"idle"}]}"#
        let parsed = try #require(InboundFrame.parse(raw))
        guard case let .presence(members) = parsed.frame else { Issue.record("not presence"); return }
        #expect(members[0].name == "Student")
        #expect(!members[0].isHost)
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
        guard case let .hello(userId, roomId, sfu) = parsed.frame else { Issue.record("not hello"); return }
        #expect(userId == "u1")
        #expect(roomId == "r1")
        #expect(sfu.available)
        #expect(sfu.iceServers?.first?.urls == ["stun:stun.l.google.com:19302"])
    }

    @Test("an ice server with a urls array and credentials decodes")
    func iceArray() throws {
        let raw = #"{"type":"hello","userId":"u1","roomId":"r1","sfu":{"available":true,"iceServers":[{"urls":["turn:t:3478?transport=udp","turn:t:3478?transport=tcp"],"username":"user","credential":"pass"}]}}"#
        let parsed = try #require(InboundFrame.parse(raw))
        guard case let .hello(_, _, sfu) = parsed.frame else { Issue.record("not hello"); return }
        let ice = try #require(sfu.iceServers?.first)
        #expect(ice.urls.count == 2)
        #expect(ice.username == "user")
        #expect(ice.credential == "pass")
    }

    @Test("speaking decodes its subject and flag")
    func speaking() throws {
        let raw = #"{"type":"speaking","userId":"u2","speaking":true}"#
        let parsed = try #require(InboundFrame.parse(raw))
        guard case let .speaking(userId, isSpeaking) = parsed.frame else { Issue.record("not speaking"); return }
        #expect(userId == "u2")
        #expect(isSpeaking)
    }

    @Test("producer add and close carry the owner")
    func producerFrames() throws {
        let add = try #require(InboundFrame.parse(#"{"type":"sfu:newProducer","producerId":"p1","userId":"u1"}"#))
        guard case let .newProducer(pid, uid) = add.frame else { Issue.record("not newProducer"); return }
        #expect(pid == "p1"); #expect(uid == "u1")

        let closed = try #require(InboundFrame.parse(#"{"type":"sfu:producerClosed","producerId":"p1","userId":"u1"}"#))
        guard case .producerClosed(let pid2, _) = closed.frame else { Issue.record("not producerClosed"); return }
        #expect(pid2 == "p1")
    }

    @Test("a producers list decodes")
    func producersList() throws {
        let raw = #"{"type":"sfu:producers","requestId":9,"producers":[{"producerId":"p1","userId":"u1"},{"producerId":"p2","userId":"u2"}]}"#
        let parsed = try #require(InboundFrame.parse(raw))
        // Carries a requestId, but a producers list is also a reply the caller awaits.
        #expect(parsed.requestId == 9)
    }

    @Test("archived, voiceReset and unavailable decode")
    func lifecycle() throws {
        guard case .archived(let roomId) = try #require(InboundFrame.parse(#"{"type":"archived","roomId":"r1"}"#)).frame
        else { Issue.record("not archived"); return }
        #expect(roomId == "r1")

        guard case .voiceReset = try #require(InboundFrame.parse(#"{"type":"sfu:voiceReset"}"#)).frame
        else { Issue.record("not voiceReset"); return }

        guard case .sfuUnavailable(let reason) = try #require(InboundFrame.parse(#"{"type":"sfu:unavailable","reason":"no_sfu"}"#)).frame
        else { Issue.record("not unavailable"); return }
        #expect(reason == "no_sfu")
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
        #expect(InboundFrame.parse("") == nil)
    }
}
