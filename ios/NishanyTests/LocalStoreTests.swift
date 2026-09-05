import Foundation
import Testing
@testable import Nishany

/// The cache is what every screen reads, so these cover the two things that
/// would be felt: finding content, and not losing work queued while offline.
struct LocalStoreTests {

    private func makeStore() throws -> LocalStore {
        try LocalStore(path: nil)  // in-memory
    }

    private func sampleItems() -> (items: [LedgerItem], searchTexts: [String: String]) {
        let (items, _) = LedgerDecoder.decode([
            [
                "id": "A1", "kind": "article", "title": "Aortic stenosis", "subjectId": "SYS_CVS",
                "status": "Published",
                "articleData": ["summary": "A narrowing of the aortic valve.", "universityIds": [], "yearIds": []],
            ],
            [
                "id": "A2", "kind": "article", "title": "Myocardial infarction", "subjectId": "SYS_CVS",
                "status": "Published",
                "articleData": ["summary": "Death of heart muscle.", "universityIds": ["OMS"], "yearIds": ["OMS_Y3"]],
            ],
            [
                "id": "A3", "kind": "article", "title": "Unpublished draft", "subjectId": "SYS_CVS",
                "status": "Draft",
                "articleData": ["summary": "Not ready.", "universityIds": [], "yearIds": []],
            ],
            [
                "id": "Q1", "kind": "question", "title": "Chest pain in a smoker", "subjectId": "SYS_CVS",
                "status": "Published",
                "questionData": ["vignette": "A 55-year-old presents with crushing chest pain.",
                                 "tags": ["universityIds": [], "years": []]],
            ],
        ])
        var texts: [String: String] = [:]
        for item in items { texts[item.id] = item.searchText }
        return (items, texts)
    }

    @Test("catalogue documents round-trip with their server timestamp")
    func catalogueRoundTrip() async throws {
        let store = try makeStore()
        let document = Data(#"{"hello":"world"}"#.utf8)
        let stamp = Date(timeIntervalSince1970: 1_700_000_000)

        try await store.saveCatalogue(key: "synapse-plans-v1", document: document, updatedAt: stamp)

        #expect(try await store.catalogue(key: "synapse-plans-v1") == document)
        let versions = try await store.catalogueVersions()
        #expect(versions["synapse-plans-v1"] ?? nil == stamp)
    }

    @Test("re-fetching a document replaces it rather than duplicating it")
    func catalogueUpsert() async throws {
        let store = try makeStore()
        try await store.saveCatalogue(key: "k", document: Data("old".utf8), updatedAt: Date(timeIntervalSince1970: 1))
        try await store.saveCatalogue(key: "k", document: Data("new".utf8), updatedAt: Date(timeIntervalSince1970: 2))

        #expect(try await store.catalogue(key: "k") == Data("new".utf8))
        #expect(try await store.catalogueVersions().count == 1)
    }

    @Test("a refresh replaces the ledger wholesale")
    func replaceItems() async throws {
        let store = try makeStore()
        let sample = sampleItems()

        try await store.replaceItems(sample.items, searchTexts: sample.searchTexts)
        #expect(try await store.itemCount() == 4)

        // A second refresh must not leave the previous catalogue behind.
        try await store.replaceItems(Array(sample.items.prefix(1)), searchTexts: sample.searchTexts)
        #expect(try await store.itemCount() == 1)
    }

    @Test("only published, in-scope items are served")
    func visibility() async throws {
        let store = try makeStore()
        let sample = sampleItems()
        try await store.replaceItems(sample.items, searchTexts: sample.searchTexts)

        let forOms = try await store.items(kind: .article, audience: StudentAudience(universityId: "OMS", year: "Year 3"))
        #expect(forOms.map(\.id).sorted() == ["A1", "A2"], "the draft must not appear")

        let forOther = try await store.items(kind: .article, audience: StudentAudience(universityId: "ASU", year: "Year 3"))
        #expect(forOther.map(\.id) == ["A1"], "a cohort-scoped article must not leak to another cohort")
    }

    @Suite("Search")
    struct Search {

        @Test("finds an article by a word in its title")
        func byTitle() async throws {
            let store = try LocalStore(path: nil)
            let sample = LocalStoreTests().sampleItems()
            try await store.replaceItems(sample.items, searchTexts: sample.searchTexts)

            let hits = try await store.search("stenosis", kind: nil, audience: .unknown)
            #expect(hits.map(\.id) == ["A1"])
        }

        /// Students type as they think, not in whole words.
        @Test("matches a partial last word")
        func prefix() async throws {
            let store = try LocalStore(path: nil)
            let sample = LocalStoreTests().sampleItems()
            try await store.replaceItems(sample.items, searchTexts: sample.searchTexts)

            let hits = try await store.search("myocard", kind: nil, audience: .unknown)
            #expect(hits.map(\.id) == ["A2"])
        }

        @Test("searches the body, not only the title")
        func body() async throws {
            let store = try LocalStore(path: nil)
            let sample = LocalStoreTests().sampleItems()
            try await store.replaceItems(sample.items, searchTexts: sample.searchTexts)

            let hits = try await store.search("crushing", kind: nil, audience: .unknown)
            #expect(hits.map(\.id) == ["Q1"])
        }

        @Test("a draft is never a search result")
        func excludesDrafts() async throws {
            let store = try LocalStore(path: nil)
            let sample = LocalStoreTests().sampleItems()
            try await store.replaceItems(sample.items, searchTexts: sample.searchTexts)

            let hits = try await store.search("Unpublished", kind: nil, audience: .unknown)
            #expect(hits.isEmpty)
        }

        /// A search box will receive quotes and asterisks. They must read as
        /// text, not as FTS operators that throw.
        @Test("punctuation in the query does not break the search")
        func punctuation() async throws {
            let store = try LocalStore(path: nil)
            let sample = LocalStoreTests().sampleItems()
            try await store.replaceItems(sample.items, searchTexts: sample.searchTexts)

            #expect(try await store.search("\"quoted\"", kind: nil, audience: .unknown).isEmpty)
            #expect(try await store.search("   ", kind: nil, audience: .unknown).isEmpty)
            let hits = try await store.search("aortic stenosis", kind: nil, audience: .unknown)
            #expect(hits.map(\.id) == ["A1"])
        }
    }

    @Suite("Outbox")
    struct Outbox {

        @Test("repeated edits to one document collapse to a single upload")
        func coalesces() async throws {
            let store = try LocalStore(path: nil)
            let key = "synapse.notebook.notes"

            try await store.enqueue(key: key, payload: Data("v1".utf8))
            try await store.enqueue(key: key, payload: Data("v2".utf8))
            try await store.enqueue(key: key, payload: Data("v3".utf8))

            let pending = try await store.pendingWrites()
            #expect(pending.count == 1, "six edits offline must not become six uploads")
            #expect(pending[0].payload == Data("v3".utf8))
        }

        /// The case that loses work: an upload is in flight, the student keeps
        /// typing, and the upload's completion clears the newer edit.
        @Test("an edit made during an upload survives that upload finishing")
        func doesNotDropAnInFlightEdit() async throws {
            let store = try LocalStore(path: nil)
            let key = "synapse.notebook.notes"

            let firstQueuedAt = Date(timeIntervalSince1970: 1_000)
            try await store.enqueue(key: key, payload: Data("first".utf8), at: firstQueuedAt)

            // Student types again while the first upload is still going.
            try await store.enqueue(key: key, payload: Data("second".utf8), at: Date(timeIntervalSince1970: 2_000))

            // The first upload completes and reports what it sent.
            try await store.clearPending(key: key, uploadedAt: firstQueuedAt)

            let pending = try await store.pendingWrites()
            #expect(pending.count == 1, "the newer edit must still be queued")
            #expect(pending[0].payload == Data("second".utf8))
        }

        @Test("a completed upload clears the queue")
        func clearsWhenCurrent() async throws {
            let store = try LocalStore(path: nil)
            let queuedAt = Date(timeIntervalSince1970: 1_000)
            try await store.enqueue(key: "k", payload: Data("v".utf8), at: queuedAt)
            try await store.clearPending(key: "k", uploadedAt: queuedAt)
            #expect(try await store.pendingCount() == 0)
        }

        @Test("failures are counted so a stuck write can be recognised")
        func recordsFailures() async throws {
            let store = try LocalStore(path: nil)
            try await store.enqueue(key: "k", payload: Data("v".utf8))
            try await store.recordFailure(key: "k", error: "offline")
            try await store.recordFailure(key: "k", error: "offline")

            let pending = try await store.pendingWrites()
            #expect(pending[0].attempts == 2)
        }

        @Test("a new edit resets the failure count")
        func editResetsAttempts() async throws {
            let store = try LocalStore(path: nil)
            try await store.enqueue(key: "k", payload: Data("v1".utf8))
            try await store.recordFailure(key: "k", error: "offline")
            try await store.enqueue(key: "k", payload: Data("v2".utf8))

            let pending = try await store.pendingWrites()
            #expect(pending[0].attempts == 0)
        }
    }

    @Suite("The rebrand key rename")
    struct LegacyKeyRename {

        private func makeStore() throws -> LocalStore { try LocalStore(path: nil) }

        @Test("a write queued under the old key is carried to the new one")
        func carriesForward() async throws {
            let store = try makeStore()
            try await store.enqueue(key: "synapse.qbank.marked.v1", payload: Data("[]".utf8))

            try await store.renameLegacyUserStateKeys([("synapse.qbank.marked.v1", "nishany.qbank.marked.v1")])

            let keys = try await store.pendingWrites().map(\.key)
            #expect(keys == ["nishany.qbank.marked.v1"])
        }

        @Test("a write already queued under the new key is not clobbered")
        func keepsNewer() async throws {
            let store = try makeStore()
            try await store.enqueue(key: "nishany.qbank.marked.v1", payload: Data("new".utf8), at: Date(timeIntervalSince1970: 2))
            try await store.enqueue(key: "synapse.qbank.marked.v1", payload: Data("old".utf8), at: Date(timeIntervalSince1970: 1))

            try await store.renameLegacyUserStateKeys([("synapse.qbank.marked.v1", "nishany.qbank.marked.v1")])

            let rows = try await store.pendingWrites()
            #expect(rows.map(\.key) == ["nishany.qbank.marked.v1"])
            #expect(rows.first?.payload == Data("new".utf8))
        }

        @Test("running it again, or with nothing to move, is a no-op")
        func idempotent() async throws {
            let store = try makeStore()
            try await store.enqueue(key: "nishany.qbank.marked.v1", payload: Data("v".utf8))
            let renames = [("synapse.qbank.marked.v1", "nishany.qbank.marked.v1")]

            try await store.renameLegacyUserStateKeys(renames)
            try await store.renameLegacyUserStateKeys(renames)

            let keys = try await store.pendingWrites().map(\.key)
            #expect(keys == ["nishany.qbank.marked.v1"])
        }
    }

    @Test("signing out leaves nothing of the previous student behind")
    func clearAll() async throws {
        let store = try makeStore()
        let sample = sampleItems()
        try await store.replaceItems(sample.items, searchTexts: sample.searchTexts)
        try await store.saveCatalogue(key: "k", document: Data("d".utf8), updatedAt: Date())
        try await store.enqueue(key: "synapse.notebook.notes", payload: Data("v".utf8))

        try await store.clearAll()

        #expect(try await store.itemCount() == 0)
        #expect(try await store.pendingCount() == 0)
        #expect(try await store.catalogueVersions().isEmpty)
    }
}
