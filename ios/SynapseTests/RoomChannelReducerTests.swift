import Testing
@testable import Synapse

/// The room's live logic, proven without a socket. A port of the cases in
/// `src/lib/rooms/roomChannel.test.ts`: a drop that must not empty the hall, a
/// speaker who left, an own chat echo. These are the states impossible to
/// reproduce by hand and trivial to state here.
struct RoomChannelReducerTests {
    private func member(_ id: String) -> RoomMember {
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
        #expect(s.status == .closed)
    }

    @Test("a permanent close stops retrying")
    func permanentClose() {
        let s = reduceChannel(.initial, .closed(permanent: true))
        #expect(!s.retrying)
    }

    @Test("hello opens the socket and clears retrying")
    func hello() {
        var s = reduceChannel(.initial, .connecting)
        #expect(s.retrying)
        s = reduceChannel(s, .frame(.hello(userId: "u1", roomId: "r1", sfu: SFUInfo(available: true))))
        #expect(s.status == .open)
        #expect(!s.retrying)
        #expect(s.sfu?.available == true)
    }

    @Test("presence opens the socket even before hello")
    func presenceOpens() {
        var s = reduceChannel(.initial, .connecting)
        s = reduceChannel(s, .frame(.presence([member("a")])))
        #expect(s.status == .open)
        #expect(!s.retrying)
        #expect(s.members?.count == 1)
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

    @Test("unavailable records the reason without opening voice")
    func unavailable() {
        let s = reduceChannel(.initial, .frame(.sfuUnavailable(reason: "no_sfu")))
        #expect(s.sfu?.available == false)
        #expect(s.sfu?.reason == "no_sfu")
    }

    @Test("replies and unknown frames leave the room unchanged")
    func inertFrames() {
        let base = reduceChannel(.initial, .frame(.presence([member("a")])))
        let afterReply = reduceChannel(base, .frame(.reply(type: "sfu:consume", json: [:])))
        let afterUnknown = reduceChannel(afterReply, .frame(.unknown))
        let afterError = reduceChannel(afterUnknown, .frame(.error("boom")))
        #expect(afterError == base)
    }
}
