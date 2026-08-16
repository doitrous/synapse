import Foundation
import Testing
@testable import Synapse

/// Intercepts requests so the engine can be driven against a scripted server.
final class StubProtocol: URLProtocol {

    struct Response {
        var status: Int = 200
        var body: Data = Data("{}".utf8)
    }

    nonisolated(unsafe) static var handler: (@Sendable (URLRequest) -> Response)?
    nonisolated(unsafe) private(set) static var requests: [URLRequest] = []
    private static let lock = NSLock()

    static func reset() {
        lock.lock(); defer { lock.unlock() }
        requests = []
        handler = nil
    }

    static func record(_ request: URLRequest) {
        lock.lock(); defer { lock.unlock() }
        requests.append(request)
    }

    static func requestedPaths() -> [String] {
        lock.lock(); defer { lock.unlock() }
        return requests.compactMap { $0.url?.path }
    }

    override class func canInit(with request: URLRequest) -> Bool { true }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        Self.record(request)
        let response = Self.handler?(request) ?? Response()
        let http = HTTPURLResponse(
            url: request.url!, statusCode: response.status,
            httpVersion: "HTTP/1.1", headerFields: ["Content-Type": "application/json"]
        )!
        client?.urlProtocol(self, didReceive: http, cacheStoragePolicy: .notAllowed)
        client?.urlProtocol(self, didLoad: response.body)
        client?.urlProtocolDidFinishLoading(self)
    }

    override func stopLoading() {}
}

/// A value a scripted stub can change between requests.
///
/// The stub closure is `@Sendable` and runs on URLSession's queue, so a plain
/// captured `var` is both a warning and a real race.
final class Box<Value>: @unchecked Sendable {
    private let lock = NSLock()
    private var stored: Value

    init(_ value: Value) { stored = value }

    var value: Value {
        get { lock.lock(); defer { lock.unlock() }; return stored }
        set { lock.lock(); defer { lock.unlock() }; stored = newValue }
    }
}

/// Serialized because `StubProtocol.handler` is process-global: `URLProtocol`
/// subclasses are registered on a session, not on an instance, so there is
/// nowhere per-test to hang the script. Run in parallel, one test's teardown
/// clears another's stub mid-request and the second silently gets a default
/// 200 — which looks like a successful upload rather than a broken test.
@Suite(.serialized)
@MainActor
struct SyncEngineTests {

    private func makeAPI() -> SynapseAPI {
        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [StubProtocol.self]
        return SynapseAPI(
            baseURL: URL(string: "https://example.test/api")!,
            urlSession: URLSession(configuration: configuration),
            token: { "stub-token" }
        )
    }

    /// A manifest shaped like the real endpoint's: every student-readable key
    /// present, with `null` for the ones never written.
    ///
    /// Listing only the interesting key would be a misleading fixture — the
    /// engine treats "absent from the manifest" as "this server is too old to
    /// know", which is a different path entirely.
    private func manifest(ledgerStamp: String?) -> Data {
        let entries = SyncEngine.catalogueKeys.map { key -> String in
            if key == SyncEngine.ledgerKey, let ledgerStamp {
                return "\"\(key)\":\"\(ledgerStamp)\""
            }
            return "\"\(key)\":null"
        }
        return Data("{\"keys\":{\(entries.joined(separator: ","))}}".utf8)
    }

    private let ledgerBody = Data("""
        {"value":[
          {"id":"A1","kind":"article","title":"Aortic stenosis","subjectId":"SYS_CVS","status":"Published",
           "articleData":{"summary":"A narrowing.","universityIds":[],"yearIds":[]}}
        ],"updatedAt":"2026-08-16T00:00:00.000Z"}
        """.utf8)

    @Test("a first sync downloads the catalogue and fills the cache")
    func firstSync() async throws {
        StubProtocol.reset()
        defer { StubProtocol.reset() }

        let manifestBody = manifest(ledgerStamp: "2026-08-16T00:00:00.000Z")
        let body = ledgerBody
        StubProtocol.handler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifestBody) }
            if path.contains("/state/") { return .init(body: body) }
            return .init(body: Data("{}".utf8))
        }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: makeAPI(), store: store)

        await engine.refresh()

        #expect(try await store.itemCount() == 1)
        let items = try await store.items(kind: .article, universityId: nil, yearId: nil)
        #expect(items.first?.title == "Aortic stenosis")

        // Only the one catalogue that has anything in it should have been
        // fetched; the other thirteen are reported empty by the manifest.
        let fetches = StubProtocol.requestedPaths().filter { $0.contains("state") && !$0.hasSuffix("manifest") }.count
        #expect(fetches == 1, "a catalogue the server has never written must not be requested")
    }

    /// The point of the manifest: an unchanged catalogue must not be downloaded
    /// again. Without this the app refetches megabytes on every launch.
    @Test("an unchanged document is not downloaded again")
    func skipsUnchanged() async throws {
        StubProtocol.reset()
        defer { StubProtocol.reset() }

        let manifestBody = manifest(ledgerStamp: "2026-08-16T00:00:00.000Z")
        let body = ledgerBody
        StubProtocol.handler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifestBody) }
            return .init(body: body)
        }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: makeAPI(), store: store)

        await engine.refresh()
        let afterFirst = StubProtocol.requestedPaths().filter { $0.contains("state") && !$0.hasSuffix("manifest") }.count
        #expect(afterFirst == 1)

        await engine.refresh()
        let afterSecond = StubProtocol.requestedPaths().filter { $0.contains("state") && !$0.hasSuffix("manifest") }.count
        #expect(afterSecond == 1, "the second refresh must fetch nothing but the manifest")

        if case .done(let changed, _) = engine.status {
            #expect(changed == 0)
        } else {
            Issue.record("expected a completed sync, got \(engine.status)")
        }
    }

    @Test("a changed timestamp causes a re-download")
    func refetchesWhenChanged() async throws {
        StubProtocol.reset()
        defer { StubProtocol.reset() }

        let body = ledgerBody
        let manifestBody = Box(manifest(ledgerStamp: "2026-08-16T00:00:00.000Z"))
        StubProtocol.handler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifestBody.value) }
            return .init(body: body)
        }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: makeAPI(), store: store)
        await engine.refresh()

        manifestBody.value = manifest(ledgerStamp: "2026-08-17T12:00:00.000Z")
        await engine.refresh()

        let fetches = StubProtocol.requestedPaths().filter { $0.contains("state") && !$0.hasSuffix("manifest") }.count
        #expect(fetches == 2, "new content on the server must reach the phone")
    }

    /// A student is not allowed every catalogue key on every deployment. A 403
    /// is a permanent answer, so it must not stall or repeat.
    @Test("a refused document does not fail the whole sync")
    func forbiddenIsSkipped() async throws {
        StubProtocol.reset()
        defer { StubProtocol.reset() }

        let manifestBody = manifest(ledgerStamp: "2026-08-16T00:00:00.000Z")
        StubProtocol.handler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifestBody) }
            return .init(status: 403, body: Data("{\"error\":\"admin role required\"}".utf8))
        }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: makeAPI(), store: store)
        await engine.refresh()

        if case .failed(let message) = engine.status {
            Issue.record("a refused key must not fail the sync: \(message)")
        }
    }

    /// The app may reach TestFlight before the API is redeployed. Refusing to
    /// sync at all in that window would look like a broken app rather than a
    /// missing endpoint.
    @Test("an API without the manifest endpoint still syncs")
    func fallsBackWithoutManifest() async throws {
        StubProtocol.reset()
        defer { StubProtocol.reset() }

        let body = ledgerBody
        StubProtocol.handler = { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") {
                return .init(status: 404, body: Data("{\"error\":\"not found\"}".utf8))
            }
            return .init(body: body)
        }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: makeAPI(), store: store)
        await engine.refresh()

        #expect(try await store.itemCount() == 1, "content must still reach the phone")
        if case .failed(let message) = engine.status {
            Issue.record("a missing manifest endpoint must not fail the sync: \(message)")
        }
    }

    @Test("a network failure keeps the cache readable and reports itself")
    func networkFailure() async throws {
        StubProtocol.reset()
        defer { StubProtocol.reset() }

        StubProtocol.handler = { _ in .init(status: 500, body: Data("{}".utf8)) }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: makeAPI(), store: store)
        await engine.refresh()

        guard case .failed = engine.status else {
            Issue.record("expected a reported failure, got \(engine.status)")
            return
        }
        // The cache is empty here only because nothing was ever synced; the
        // point is that the store is still usable rather than torn down.
        #expect(try await store.itemCount() == 0)
    }

    @Suite("Writing a student's own work")
    struct Writing {

        @Test("a write reaches the server and leaves the queue empty")
        func uploads() async throws {
            StubProtocol.reset()
            defer { StubProtocol.reset() }
            StubProtocol.handler = { _ in .init(body: Data("{\"ok\":true}".utf8)) }

            let store = try LocalStore(path: nil)
            let engine = await SyncEngineTests().makeEngine(store: store)

            await engine.write(key: "synapse.notebook.notes", value: ["a": "note"])

            #expect(try await store.pendingCount() == 0)
            #expect(StubProtocol.requestedPaths().contains { $0.contains("user-state") })
        }

        @Test("a write made offline is kept for later")
        func keepsWorkWhenOffline() async throws {
            StubProtocol.reset()
            defer { StubProtocol.reset() }
            StubProtocol.handler = { _ in .init(status: 503, body: Data("{}".utf8)) }

            let store = try LocalStore(path: nil)
            let engine = await SyncEngineTests().makeEngine(store: store)

            await engine.write(key: "synapse.notebook.notes", value: ["a": "note"])

            #expect(try await store.pendingCount() == 1, "the student's note must not be lost")
            let pending = try await store.pendingWrites()
            #expect(pending[0].attempts == 1)
        }

        @Test("work queued offline is sent once the network returns")
        func drainsOnReconnect() async throws {
            StubProtocol.reset()
            defer { StubProtocol.reset() }

            let online = Box(false)
            StubProtocol.handler = { _ in
                online.value ? .init(body: Data("{\"ok\":true}".utf8)) : .init(status: 503, body: Data("{}".utf8))
            }

            let store = try LocalStore(path: nil)
            let engine = await SyncEngineTests().makeEngine(store: store)

            await engine.write(key: "synapse.notebook.notes", value: ["a": "note"])
            #expect(try await store.pendingCount() == 1)

            online.value = true
            await engine.drainOutbox()

            #expect(try await store.pendingCount() == 0)
        }

        /// A write the server will never accept must not block everything
        /// queued behind it.
        @Test("a permanently refused write is abandoned")
        func abandonsRefused() async throws {
            StubProtocol.reset()
            defer { StubProtocol.reset() }
            StubProtocol.handler = { _ in .init(status: 403, body: Data("{}".utf8)) }

            let store = try LocalStore(path: nil)
            let engine = await SyncEngineTests().makeEngine(store: store)

            await engine.write(key: "synapse.notebook.notes", value: ["a": "note"])

            #expect(try await store.pendingCount() == 0, "a refused write must not stall the queue")
        }
    }

    fileprivate func makeEngine(store: LocalStore) -> SyncEngine {
        SyncEngine(api: makeAPI(), store: store)
    }
}
