import Foundation
import Testing
@testable import Synapse

/// G2: a cold launch with no connectivity must not read the student's flags and
/// notes as empty and then overwrite the server with that emptiness.
@MainActor
struct QBankOfflineTests {

    @Test("an offline cold launch restores flags from cache instead of wiping them")
    func offlineRestoresFromCache() async throws {
        let store = try LocalStore(path: nil)

        // An online load returns real flags — which get cached.
        let online = StubServer { request in
            let path = request.url?.path ?? ""
            if path.contains("marked") {
                return .init(body: Data(#"{"value":["q1","q2"],"updatedAt":null}"#.utf8))
            }
            return .init(body: Data(#"{"value":null,"updatedAt":null}"#.utf8))
        }
        let qbankOnline = QBankStore(api: online.api, sync: SyncEngine(api: online.api, store: store), store: store)
        await qbankOnline.load()
        #expect(qbankOnline.marked == ["q1", "q2"])
        online.finish()

        // A cold launch with the network down must restore the cached flags,
        // not reset to empty (which the next write would push, wiping them).
        let offline = StubServer { _ in .init(status: 500, body: Data("{}".utf8)) }
        defer { offline.finish() }
        let qbankOffline = QBankStore(api: offline.api, sync: SyncEngine(api: offline.api, store: store), store: store)
        await qbankOffline.load()
        #expect(qbankOffline.marked == ["q1", "q2"], "offline must restore cached flags, not wipe them")
    }

    @Test("with no cache and no server, an offline launch reads empty safely")
    func firstEverOfflineIsEmpty() async throws {
        let store = try LocalStore(path: nil)
        let offline = StubServer { _ in .init(status: 500, body: Data("{}".utf8)) }
        defer { offline.finish() }
        let qbank = QBankStore(api: offline.api, sync: SyncEngine(api: offline.api, store: store), store: store)
        await qbank.load()
        // Nothing to restore and nothing to wipe — empty is correct here.
        #expect(qbank.marked.isEmpty)
        #expect(qbank.isLoaded)
    }
}
