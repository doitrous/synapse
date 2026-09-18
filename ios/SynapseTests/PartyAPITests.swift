import Foundation
import Testing
@testable import Synapse

/// The party REST client decodes the live-hall shapes from `parties.js`, and
/// turns a `{ok:false,reason}` refusal into something a student can act on.
@MainActor
struct PartyAPITests {

    /// One scripted server that answers by path, reusing `StubProtocol`.
    private func server(_ routes: [String: String]) -> StubServer {
        StubServer { request in
            let path = request.url?.path ?? ""
            for (needle, body) in routes where path.hasSuffix(needle) {
                return .init(status: 200, body: Data(body.utf8))
            }
            return .init(status: 404, body: Data(#"{"error":"not found"}"#.utf8))
        }
    }

    @Test("mine decodes the summary list with member counts")
    func mine() async throws {
        let s = server(["/parties/mine": #"{"parties":[{"id":"p1","code":"WXYZ","name":"Anatomy grind","isHost":true,"capacity":20,"members":3}]}"#])
        defer { s.finish() }
        let list = try await s.api.myParties()
        #expect(list.count == 1)
        #expect(list[0].members == 3)
        #expect(list[0].host)
        #expect(list[0].capacity == 20)
    }

    @Test("a full-room join surfaces a student-readable refusal")
    func joinFull() async throws {
        let s = server(["/parties/join": #"{"ok":false,"reason":"room_full"}"#])
        defer { s.finish() }
        let result = try await s.api.joinParty(code: "WXYZ")
        #expect(!result.succeeded)
        #expect(result.message == "That room is full.")
    }

    @Test("a successful create carries the new party")
    func create() async throws {
        let s = server(["/parties": #"{"ok":true,"party":{"id":"p1","code":"WXYZ","name":"Anatomy grind","hostUserId":"u1","isHost":true,"visibility":"open","layoutKey":"campus","scope":"cohort","capacity":20,"members":[{"userId":"u1","displayName":"Sara","role":"host","lastActiveAt":null,"activity":"studying"}]}}"#])
        defer { s.finish() }
        let result = try await s.api.createParty(name: "Anatomy grind")
        #expect(result.succeeded)
        #expect(result.party?.code == "WXYZ")
        #expect(result.party?.members.count == 1)
    }

    @Test("party() decodes the full room with members")
    func partyFull() async throws {
        let s = server(["/parties/p1": #"{"party":{"id":"p1","code":"WXYZ","name":"Anatomy grind","hostUserId":"u1","isHost":true,"visibility":"open","layoutKey":"campus","scope":"cohort","capacity":20,"members":[{"userId":"u1","displayName":"Sara","role":"host","lastActiveAt":null,"activity":"studying"}]}}"#])
        defer { s.finish() }
        let party = try #require(try await s.api.party("p1"))
        #expect(party.members.count == 1)
        #expect(party.host)
        #expect(party.members[0].isHost)
    }

    @Test("members endpoint decodes the roster")
    func members() async throws {
        let s = server(["/parties/WXYZ/members": #"{"members":[{"userId":"u1","displayName":"Sara","role":"host","lastActiveAt":null,"activity":"studying"},{"userId":"u2","displayName":"","role":"member","lastActiveAt":null,"activity":"idle"}]}"#])
        defer { s.finish() }
        let members = try await s.api.roomMembers(code: "WXYZ")
        #expect(members.count == 2)
        #expect(members[1].name == "Student")
    }
}
