import Foundation
import Testing
@testable import Synapse

/// Three bugs that all had the same shape: the app wrote a document it had
/// never read. None of them raised anything — the first showed as a student's
/// saved list emptying, the second as a year of study disappearing, the third
/// as totals shrinking the more work was done.
@MainActor
struct SyncDirectionTests {

    private func emptyManifest() -> Data {
        let entries = SyncEngine.catalogueKeys.map { "\"\($0)\":null" }
        return Data("{\"keys\":{\(entries.joined(separator: ","))}}".utf8)
    }

    private func record(_ id: String, at: String, correct: Bool?) -> String {
        """
        {"id":"\(id)","at":"\(at)","surface":"qbank","itemId":"Q-\(id)",
         "subjectId":"S","topic":"T","difficulty":"Easy","conceptIds":[],
         "correct":\(correct.map(String.init(describing:)) ?? "null"),
         "seconds":30,"sessionId":"sess"}
        """
    }

    // MARK: - Bookmarks

    /// Nested types do not inherit the enclosing suite's actor isolation, and
    /// both the model and the stubbed API are main-actor bound.
    @Suite("Saved resources")
    @MainActor
    struct Bookmarks {

        /// The bug: `bookmarks` began empty because nothing had been fetched,
        /// which is indistinguishable from "nothing saved". The first tap wrote
        /// a one-element array over the student's whole list.
        @Test("the saved list is read before anything writes it")
        func readsBeforeWriting() async throws {
            let uploaded = Box<[String]>([])
            let server = StubServer { request in
                let path = request.url?.path ?? ""
                if path.contains("bookmarks"), request.httpMethod == "GET" {
                    return .init(body: Data("{\"value\":[\"src_a\",\"src_b\"]}".utf8))
                }
                if request.httpMethod == "PUT" {
                    uploaded.value.append(request.stubBodyText)
                }
                return .init(body: Data("{\"ok\":true}".utf8))
            }
            defer { server.finish() }

            let store = try LocalStore(path: nil)
            let model = ResourceModel(store: store, sync: SyncEngine(api: server.api, store: store), api: server.api)

            await model.loadBookmarks()
            #expect(model.bookmarks == ["src_a", "src_b"], "the web's saved list must arrive first")

            await model.toggleBookmark("src_c")
            let last = try #require(uploaded.value.last)
            for existing in ["src_a", "src_b", "src_c"] {
                #expect(last.contains(existing), "adding one must not drop the rest; got \(last)")
            }
        }

        /// A failed read must not be mistaken for an empty list — that is
        /// exactly how the original bug destroyed data.
        @Test("saving is refused while the list is unknown")
        func refusesWhenUnread() async throws {
            let writes = Box(0)
            let server = StubServer { request in
                if request.httpMethod == "PUT" { writes.value += 1 }
                return .init(status: 503, body: Data("{}".utf8))
            }
            defer { server.finish() }

            let store = try LocalStore(path: nil)
            let model = ResourceModel(store: store, sync: SyncEngine(api: server.api, store: store), api: server.api)

            await model.toggleBookmark("src_a")

            #expect(!model.bookmarksLoaded)
            #expect(writes.value == 0, "a write here would replace the student's list with one item")
            #expect(model.bookmarkProblem != nil, "and it must say so rather than ignoring the tap")
        }

        /// A brand-new account has never written the bookmarks doc, so the read
        /// 404s. That is genuinely empty and safe to write onto — treating it as
        /// a failure would leave saving permanently off for every new student.
        @Test("a never-written list 404s as empty, and saving still works")
        func emptyListFromNotFound() async throws {
            let uploaded = Box<[String]>([])
            let server = StubServer { request in
                if request.httpMethod == "PUT" { uploaded.value.append(request.stubBodyText) }
                if request.httpMethod == "GET" { return .init(status: 404, body: Data("{}".utf8)) }
                return .init(body: Data("{\"ok\":true}".utf8))
            }
            defer { server.finish() }

            let store = try LocalStore(path: nil)
            let model = ResourceModel(store: store, sync: SyncEngine(api: server.api, store: store), api: server.api)

            await model.loadBookmarks()
            #expect(model.bookmarks.isEmpty)
            #expect(model.bookmarksLoaded, "404 means genuinely empty, not unread")
            #expect(model.bookmarkProblem == nil)

            await model.toggleBookmark("src_a")
            #expect(model.bookmarks == ["src_a"])
            #expect(uploaded.value.last?.contains("src_a") == true, "a fresh account's first save must reach the server")
        }
    }

    // MARK: - Attempts

    /// The bug: attempts were pushed and never pulled, so a student with months
    /// of web history opened the app to an empty record.
    @Test("a student's history is pulled down on sync")
    func pullsAttempts() async throws {
        let manifest = emptyManifest()
        let older = record("a", at: "2026-06-02T10:00:00.000Z", correct: true)
        let newer = record("b", at: "2026-07-02T10:00:00.000Z", correct: false)

        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifest) }
            if path.contains("attemptIndex") {
                return .init(body: Data("""
                    {"value":{"version":1,"months":["2026-06","2026-07"],
                     "totals":{"attempts":2,"marked":2,"correct":1,"lastAt":null}}}
                    """.utf8))
            }
            if path.contains("attempts.2026-06") {
                return .init(body: Data("{\"value\":{\"version\":1,\"month\":\"2026-06\",\"records\":[\(older)]}}".utf8))
            }
            if path.contains("attempts.2026-07") {
                return .init(body: Data("{\"value\":{\"version\":1,\"month\":\"2026-07\",\"records\":[\(newer)]}}".utf8))
            }
            return .init(body: Data("{\"value\":null}".utf8))
        }
        defer { server.finish() }

        let store = try LocalStore(path: nil)
        let engine = SyncEngine(api: server.api, store: store)
        await engine.refresh()

        #expect(try await store.attemptCount() == 2)
        #expect(try await store.allAttemptMonths() == ["2026-06", "2026-07"])

        // Pulled records are already on the server; marking them pending would
        // make the next drain rewrite months that never changed.
        #expect(try await store.monthsWithPendingAttempts().isEmpty)
    }

    /// A sitting finished on the phone and not yet uploaded must survive
    /// meeting the server's copy of the same month.
    @Test("an unsent local sitting survives the pull")
    func mergesRatherThanReplaces() async throws {
        let manifest = emptyManifest()
        let remote = record("server-1", at: "2026-06-02T10:00:00.000Z", correct: true)
        let server = StubServer { request in
            let path = request.url?.path ?? ""
            if path.hasSuffix("/state/manifest") { return .init(body: manifest) }
            if path.contains("attemptIndex") {
                return .init(body: Data("""
                    {"value":{"version":1,"months":["2026-06"],
                     "totals":{"attempts":1,"marked":1,"correct":1,"lastAt":null}}}
                    """.utf8))
            }
            if path.contains("attempts.2026-06") {
                return .init(body: Data("{\"value\":{\"version\":1,\"month\":\"2026-06\",\"records\":[\(remote)]}}".utf8))
            }
            return .init(body: Data("{\"value\":null}".utf8))
        }
        defer { server.finish() }

        let store = try LocalStore(path: nil)
        try await store.saveAttempt(
            id: "local-1", month: "2026-06",
            record: Data(record("local-1", at: "2026-06-03T10:00:00.000Z", correct: false).utf8)
        )

        let engine = SyncEngine(api: server.api, store: store)
        await engine.refresh()

        #expect(try await store.attemptCount() == 2, "the local sitting must not be replaced")
        #expect(
            try await store.monthsWithPendingAttempts() == ["2026-06"],
            "and it must still be waiting to upload"
        )
    }

    /// The bug: totals were summed from only the months in that push, so every
    /// earlier month a student had already synced vanished from the index —
    /// their totals shrank as they studied.
    @Test("the index counts every month, not just the ones being pushed")
    func indexCoversAllMonths() async throws {
        let uploaded = Box<[String: String]>([:])
        let server = StubServer { request in
            if request.httpMethod == "PUT", let path = request.url?.path {
                uploaded.value[path] = request.stubBodyText
            }
            return .init(body: Data("{\"ok\":true}".utf8))
        }
        defer { server.finish() }

        let store = try LocalStore(path: nil)
        // An older month already synced, and a new one still pending.
        try await store.saveAttempt(
            id: "old", month: "2026-05",
            record: Data(record("old", at: "2026-05-02T10:00:00.000Z", correct: true).utf8),
            pending: false
        )
        try await store.saveAttempt(
            id: "new", month: "2026-06",
            record: Data(record("new", at: "2026-06-02T10:00:00.000Z", correct: true).utf8)
        )

        let model = QuestionBankModel(store: store, sync: SyncEngine(api: server.api, store: store))
        await model.pushAttempts()

        let indexBody = try #require(uploaded.value.first { $0.key.contains("attemptIndex") }?.value)
        #expect(indexBody.contains("2026-05"), "an already-synced month must stay in the index")
        #expect(indexBody.contains("\"attempts\":2"), "totals cover everything; got \(indexBody)")
    }
}
