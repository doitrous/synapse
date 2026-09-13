import Foundation
import Testing
@testable import Synapse

/// The 402 / paywall path: a student whose trial lapsed must see a subscribe
/// prompt, not a retry loop that reads as "couldn't reach the server".
@MainActor
struct PaywallTests {

    @Test("402 maps to paymentRequired and is never retried")
    func paymentRequiredMapping() async throws {
        let server = StubServer { _ in .init(status: 402, body: Data("{}".utf8)) }
        defer { server.finish() }

        do {
            _ = try await server.api.state(JSONValue.self, key: "nishany-plans-v1")
            Issue.record("a 402 must throw")
        } catch let error as APIError {
            #expect(error == .paymentRequired)
            #expect(error.isRetryable == false, "the fix for a 402 is to subscribe, not to retry")
        }
    }

    @Test("a 402 on paid content raises the paywall instead of failing the sync")
    func paywallOn402() async throws {
        let server = StubServer { _ in .init(status: 402, body: Data("{}".utf8)) }
        defer { server.finish() }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)
        await engine.refresh()

        #expect(engine.subscriptionRequired, "a 402 must raise the paywall signal")
        // A retryable failure would put the shell in the "couldn't reach the
        // server" state and spin forever; the pull must instead finish cleanly.
        if case .failed(let message) = engine.status {
            Issue.record("a 402 must not fail the sync; got .failed(\(message))")
        }
    }

    @Test("access returning clears the paywall on the next pull")
    func paywallClearsWhenAccessReturns() async throws {
        // First a 402, then a server that answers normally.
        let paid = StubServer { _ in .init(status: 402, body: Data("{}".utf8)) }
        let store = try LocalStore(path: nil)
        let blocked = SyncEngine(api: paid.api, store: store)
        await blocked.refresh()
        #expect(blocked.subscriptionRequired)
        paid.finish()

        let open = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(status: 403, body: Data("{}".utf8)) }
            return .init(body: Data("{\"value\":{},\"updatedAt\":null}".utf8))
        }
        defer { open.finish() }
        let restored = SyncEngine(api: open.api, store: store)
        await restored.refresh()
        #expect(restored.subscriptionRequired == false, "a clean pull must clear the paywall signal")
    }
}
