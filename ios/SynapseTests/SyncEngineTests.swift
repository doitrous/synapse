import Foundation
import Testing
@testable import Synapse

/// Intercepts requests so the engine can be driven against a scripted server.
///
/// Scripts are registered **per host**, not globally. `URLProtocol` subclasses
/// are installed on a session rather than an instance, so a single shared
/// handler makes every test that uses one collide with every other: one test's
/// teardown clears another's script mid-request, and the second silently gets a
/// default 200 — which reads as a successful upload rather than a broken test.
/// Giving each test its own host lets them run in parallel and tells them apart.
final class StubProtocol: URLProtocol {

    struct Response {
        var status: Int = 200
        var body: Data = Data("{}".utf8)
    }

    typealias Handler = @Sendable (URLRequest) -> Response

    nonisolated(unsafe) private static var handlers: [String: Handler] = [:]
    nonisolated(unsafe) private static var requests: [String: [URLRequest]] = [:]
    private static let lock = NSLock()

    /// A fresh host nobody else is using.
    static func newHost() -> String { "stub-\(UUID().uuidString.prefix(8).lowercased()).test" }

    static func install(host: String, handler: @escaping Handler) {
        lock.lock(); defer { lock.unlock() }
        handlers[host] = handler
        requests[host] = []
    }

    static func remove(host: String) {
        lock.lock(); defer { lock.unlock() }
        handlers[host] = nil
        requests[host] = nil
    }

    static func requestedPaths(host: String) -> [String] {
        lock.lock(); defer { lock.unlock() }
        return (requests[host] ?? []).compactMap { $0.url?.path }
    }

    private static func script(for request: URLRequest) -> Handler? {
        lock.lock(); defer { lock.unlock() }
        guard let host = request.url?.host else { return nil }
        requests[host, default: []].append(request)
        return handlers[host]
    }

    override class func canInit(with request: URLRequest) -> Bool {
        request.url?.host?.hasPrefix("stub-") == true
    }

    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }

    override func startLoading() {
        let response = Self.script(for: request)?(request) ?? Response()
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

/// One scripted server, scoped to a test.
@MainActor
struct StubServer {
    let host: String
    let api: SynapseAPI

    init(_ handler: @escaping StubProtocol.Handler) {
        host = StubProtocol.newHost()
        StubProtocol.install(host: host, handler: handler)

        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [StubProtocol.self]
        api = SynapseAPI(
            baseURL: URL(string: "https://\(host)/api")!,
            urlSession: URLSession(configuration: configuration),
            token: { "stub-token" }
        )
    }

    /// Paths this server was asked for. `/api/state/…` only — `user-state` is
    /// the student's own record and is counted separately, because the two
    /// differ by one hyphen and a `contains("state")` filter silently conflates
    /// them.
    func cataloguePaths() -> [String] {
        StubProtocol.requestedPaths(host: host).filter { $0.contains("/state/") }
    }

    func catalogueFetches() -> Int {
        cataloguePaths().filter { !$0.hasSuffix("/manifest") }.count
    }

    func userStatePaths() -> [String] {
        StubProtocol.requestedPaths(host: host).filter { $0.contains("/user-state/") }
    }

    func finish() { StubProtocol.remove(host: host) }
}

extension URLRequest {
    /// The body, however URLSession chose to carry it.
    ///
    /// `httpBody` is usually nil by the time a `URLProtocol` sees the request —
    /// URLSession moves it to `httpBodyStream`. A test that reads only
    /// `httpBody` therefore asserts against an empty string and passes for the
    /// wrong reason, or fails for one.
    var stubBody: Data {
        if let body = httpBody { return body }
        guard let stream = httpBodyStream else { return Data() }

        stream.open()
        defer { stream.close() }

        var data = Data()
        let buffer = UnsafeMutablePointer<UInt8>.allocate(capacity: 4096)
        defer { buffer.deallocate() }
        while stream.hasBytesAvailable {
            let read = stream.read(buffer, maxLength: 4096)
            if read <= 0 { break }
            data.append(buffer, count: read)
        }
        return data
    }

    var stubBodyText: String { String(decoding: stubBody, as: UTF8.self) }
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

@MainActor
struct SyncEngineTests {

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
        let manifestBody = manifest(ledgerStamp: "2026-08-16T00:00:00.000Z")
        let body = ledgerBody
        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifestBody) }
            if path.contains("/state/") { return .init(body: body) }
            return .init(body: Data("{}".utf8))
        }
        defer { server.finish() }


        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)

        await engine.refresh()

        #expect(try await store.itemCount() == 1)
        let items = try await store.items(kind: .article, audience: .unknown)
        #expect(items.first?.title == "Aortic stenosis")

        // Only the one catalogue that has anything in it should have been
        // fetched; the other thirteen are reported empty by the manifest.
        let fetches = server.catalogueFetches()
        #expect(fetches == 1, "a catalogue the server has never written must not be requested")
    }

    /// The point of the manifest: an unchanged catalogue must not be downloaded
    /// again. Without this the app refetches megabytes on every launch.
    @Test("an unchanged document is not downloaded again")
    func skipsUnchanged() async throws {
        let manifestBody = manifest(ledgerStamp: "2026-08-16T00:00:00.000Z")
        let body = ledgerBody
        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifestBody) }
            return .init(body: body)
        }
        defer { server.finish() }


        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)

        await engine.refresh()
        let afterFirst = server.catalogueFetches()
        #expect(afterFirst == 1)

        await engine.refresh()
        let afterSecond = server.catalogueFetches()
        #expect(afterSecond == 1, "the second refresh must fetch nothing but the manifest")

        if case .done(let changed, _) = engine.status {
            #expect(changed == 0)
        } else {
            Issue.record("expected a completed sync, got \(engine.status)")
        }
    }

    @Test("a changed timestamp causes a re-download")
    func refetchesWhenChanged() async throws {
        let body = ledgerBody
        let manifestBody = Box(manifest(ledgerStamp: "2026-08-16T00:00:00.000Z"))
        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifestBody.value) }
            return .init(body: body)
        }
        defer { server.finish() }


        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)
        await engine.refresh()

        manifestBody.value = manifest(ledgerStamp: "2026-08-17T12:00:00.000Z")
        await engine.refresh()

        let fetches = server.catalogueFetches()
        #expect(fetches == 2, "new content on the server must reach the phone")
    }

    /// A student is not allowed every catalogue key on every deployment. A 403
    /// is a permanent answer, so it must not stall or repeat.
    @Test("a refused document does not fail the whole sync")
    func forbiddenIsSkipped() async throws {
        let manifestBody = manifest(ledgerStamp: "2026-08-16T00:00:00.000Z")
        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifestBody) }
            return .init(status: 403, body: Data("{\"error\":\"admin role required\"}".utf8))
        }
        defer { server.finish() }


        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)
        await engine.refresh()

        if case .failed(let message) = engine.status {
            Issue.record("a refused key must not fail the sync: \(message)")
        }
    }

    /// The app may reach TestFlight before the API is redeployed. Refusing to
    /// sync at all in that window would look like a broken app rather than a
    /// missing endpoint.
    ///
    /// Both statuses are covered because the one that actually happens is 403,
    /// not 404: without the route, `/api/state/:key` matches the path with
    /// `key = "manifest"`, which no student may read. Handling only 404 left
    /// the app unable to sync anything at all against the live server.
    @Test("an API without the manifest endpoint still syncs", arguments: [404, 403])
    func fallsBackWithoutManifest(status: Int) async throws {
        let body = ledgerBody
        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") {
                return .init(status: status, body: Data("{\"error\":\"refused\"}".utf8))
            }
            return .init(body: body)
        }
        defer { server.finish() }


        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)
        await engine.refresh()

        #expect(try await store.itemCount() == 1, "content must still reach the phone")
        if case .failed(let message) = engine.status {
            Issue.record("a missing manifest endpoint must not fail the sync: \(message)")
        }
    }

    /// A catalogue key contains hyphens and dots. Percent-encoding it before
    /// handing it to `appendingPathComponent` escaped the `%` a second time, so
    /// `synapse-admin-content-ledger-v4` reached the server as
    /// `synapse%252Dadmin…`, missed the readable set, and was refused. Every
    /// catalogue 403'd, and the app synced nothing.
    @Test("a catalogue key reaches the server unmangled")
    func keysAreNotDoubleEncoded() async throws {
        let body = ledgerBody
        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") {
                return .init(status: 403, body: Data("{}".utf8))
            }
            return .init(body: body)
        }
        defer { server.finish() }


        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)
        await engine.refresh()

        let requested = server.cataloguePaths()
        #expect(
            requested.contains { $0.hasSuffix("/state/synapse-admin-content-ledger-v4") },
            "the ledger key must arrive literally; got \(requested.filter { $0.contains("ledger") })"
        )
        #expect(!requested.contains { $0.contains("%") }, "no path component should be percent-escaped")
    }

    @Test("a network failure keeps the cache readable and reports itself")
    func networkFailure() async throws {
        let server = StubServer { _ in .init(status: 500, body: Data("{}".utf8)) }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)
        await engine.refresh()

        guard case .failed = engine.status else {
            Issue.record("expected a reported failure, got \(engine.status)")
            return
        }
        // The cache is empty here only because nothing was ever synced; the
        // point is that the store is still usable rather than torn down.
        #expect(try await store.itemCount() == 0)
    }

    /// Nested types do not inherit the enclosing suite's actor isolation, and
    /// `StubServer` is main-actor bound.
    @Suite("Writing a student's own work")
    @MainActor
    struct Writing {

        @Test("a write reaches the server and leaves the queue empty")
        func uploads() async throws {
            let server = StubServer { _ in .init(body: Data("{\"ok\":true}".utf8)) }

            let store = try LocalStore(path: nil)
            let engine = SyncEngine(api: server.api, store: store)

            await engine.write(key: "synapse.notebook.notes", value: ["a": "note"])

            #expect(try await store.pendingCount() == 0)
            #expect(!server.userStatePaths().isEmpty)
        }

        @Test("a write made offline is kept for later")
        func keepsWorkWhenOffline() async throws {
            let server = StubServer { _ in .init(status: 503, body: Data("{}".utf8)) }

            let store = try LocalStore(path: nil)
            let engine = SyncEngine(api: server.api, store: store)

            await engine.write(key: "synapse.notebook.notes", value: ["a": "note"])

            #expect(try await store.pendingCount() == 1, "the student's note must not be lost")
            let pending = try await store.pendingWrites()
            #expect(pending[0].attempts == 1)
        }

        @Test("work queued offline is sent once the network returns")
        func drainsOnReconnect() async throws {

            let online = Box(false)
            let server = StubServer { _ in
                online.value ? .init(body: Data("{\"ok\":true}".utf8)) : .init(status: 503, body: Data("{}".utf8))
            }
            defer { server.finish() }


            let store = try LocalStore(path: nil)
            let engine = SyncEngine(api: server.api, store: store)

            await engine.write(key: "synapse.notebook.notes", value: ["a": "note"])
            #expect(try await store.pendingCount() == 1)

            online.value = true
            await engine.drainOutbox()

            #expect(try await store.pendingCount() == 0)
        }

        /// The bug this guards: two overlapping drains each upload the snapshot
        /// they read, with no ordering between them, so an older payload can
        /// land second and the server keeps it. A note the student watched
        /// themselves type then comes back empty on their laptop.
        ///
        /// The order is forced rather than raced. Two concurrent `write` calls
        /// have no defined enqueue order, so asserting that a particular one
        /// wins would be asserting luck — and would pass or fail for reasons
        /// unrelated to the bug. Here the empty edit is queued first, its upload
        /// is held open, and the typed edit arrives while it is still in flight:
        /// exactly the sequence an editor sheet produces when it saves over a
        /// note that was created a moment earlier.
        @Test("an edit made during a slow upload is what the server ends up with")
        func lastWriteWins() async throws {
            let uploaded = Box<[String]>([])
            let holdFirst = Box(true)

            let server = StubServer { request in
                guard request.url?.path.contains("user-state") == true else {
                    return .init(body: Data("{\"ok\":true}".utf8))
                }
                let body = request.stubBodyText
                // Hold the first upload open so the second edit lands while it
                // is still going.
                if body.contains("\"\"") {
                    while holdFirst.value { Thread.sleep(forTimeInterval: 0.005) }
                }
                uploaded.value.append(body)
                return .init(body: Data("{\"ok\":true}".utf8))
            }
            defer { server.finish() }

            let store = try LocalStore(path: nil)
            let engine = SyncEngine(api: server.api, store: store)
            let key = "synapse.whiteboard.board"

            let first = Task { await engine.write(key: key, value: ["text": ""]) }
            // Queued behind it, with a later `queuedAt`.
            try await Task.sleep(for: .milliseconds(50))
            let second = Task { await engine.write(key: key, value: ["text": "typed"]) }

            try await Task.sleep(for: .milliseconds(50))
            holdFirst.value = false
            _ = await (first.value, second.value)

            #expect(try await store.pendingCount() == 0, "everything queued must be sent")
            let last = try #require(uploaded.value.last)
            #expect(last.contains("typed"), "the newest edit must be what the server keeps; got \(last)")
        }

        /// A write the server will never accept must not block everything
        /// queued behind it.
        @Test("a permanently refused write is abandoned")
        func abandonsRefused() async throws {
            let server = StubServer { _ in .init(status: 403, body: Data("{}".utf8)) }

            let store = try LocalStore(path: nil)
            let engine = SyncEngine(api: server.api, store: store)

            await engine.write(key: "synapse.notebook.notes", value: ["a": "note"])

            #expect(try await store.pendingCount() == 0, "a refused write must not stall the queue")
        }
    }

}
