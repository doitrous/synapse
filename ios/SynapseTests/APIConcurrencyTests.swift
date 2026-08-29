import Foundation
import Testing
@testable import Synapse

/// Thread-safety guard for the API transport.
///
/// The intermittent `EXC_BAD_ACCESS` / `_swift_release_dealloc` crash reported
/// from `SynapseAPI.send`/`get` under concurrent requests was an unsynchronised
/// write to shared `static var` diagnostics: several screens fan out
/// `userState` reads at once — Adaptive study loads six, Billing six, Question
/// Bank four, Flashcards two — and two `send` calls assigning the diagnostic
/// `String?` on different threads double-freed the previous value's buffer.
///
/// This drives that exact fan-out — many concurrent `userState` and `me` reads
/// through the real transport, decoding a dated body so the shared decoder and
/// its custom ISO-8601 strategy run concurrently too. Under Thread Sanitizer it
/// flags any unguarded shared state on the request path, so the over-release
/// cannot come back unnoticed.
@MainActor
struct APIConcurrencyTests {

    @Test("concurrent userState reads through one API are race-free")
    func concurrentUserStateReadsAreSafe() async throws {
        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.contains("/user-state/") {
                // A dated envelope so the read exercises the shared JSONDecoder
                // and its custom date strategy, not merely the request itself.
                return .init(body: Data(#"{"value":["a","b"],"updatedAt":"2026-08-16T00:00:00.000Z"}"#.utf8))
            }
            if path.hasSuffix("/me") {
                return .init(body: Data(#"{"user":{"id":"u1","role":"student"}}"#.utf8))
            }
            return .init(body: Data("{}".utf8))
        }
        defer { server.finish() }
        let api = server.api

        // The fan-out the real screens produce, amplified into a tight loop so
        // the shared write is contended on every pass, not merely occasionally.
        let keys = ["marked", "notes", "names", "live", "collection", "reviewlog"]
        for _ in 0..<40 {
            try await withThrowingTaskGroup(of: Bool.self) { group in
                for key in keys {
                    group.addTask {
                        let state = try await api.userState([String].self, key: key)
                        return state.value == ["a", "b"]
                    }
                    group.addTask {
                        _ = try await api.me()
                        return true
                    }
                }
                for try await ok in group {
                    #expect(ok)
                }
            }
        }
    }
}
