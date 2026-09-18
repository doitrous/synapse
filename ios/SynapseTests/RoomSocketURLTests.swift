import Foundation
import Testing
@testable import Synapse

/// Deriving the room socket URL, and the reconnect schedule. The `/api/api`
/// double-segment once 404'd every upgrade and left every room reporting voice
/// unavailable, so the guard against it is pinned.
struct RoomSocketURLTests {
    @Test("derives one /api/rooms/ws from an /api base, as wss")
    func derives() throws {
        let url = try #require(roomSocketURL(base: URL(string: "https://nishany.com/api")!, code: "ABCD"))
        #expect(url.scheme == "wss")
        #expect(url.host == "nishany.com")
        #expect(url.path == "/api/rooms/ws")
        #expect(url.query?.contains("code=ABCD") == true)
    }

    @Test("never doubles /api even when the base lacks it")
    func noDouble() throws {
        let url = try #require(roomSocketURL(base: URL(string: "https://nishany.com")!, code: "x1"))
        #expect(!url.absoluteString.contains("/api/api"))
        #expect(url.path == "/api/rooms/ws")
    }

    @Test("localhost stays ws, not wss")
    func localhost() throws {
        let url = try #require(roomSocketURL(base: URL(string: "http://localhost:8823/api")!, code: "x"))
        #expect(url.scheme == "ws")
        #expect(url.port == 8823)
    }

    @Test("an empty code has no socket")
    func emptyCode() {
        #expect(roomSocketURL(base: URL(string: "https://nishany.com/api")!, code: "") == nil)
    }

    @Test("backoff doubles to a 30s ceiling")
    func backoff() {
        #expect(backoffDelay(attempt: 0) == 1_000)
        #expect(backoffDelay(attempt: 3) == 8_000)
        #expect(backoffDelay(attempt: 20) == 30_000)
        #expect(backoffDelay(attempt: -1) == 1_000)
    }
}
