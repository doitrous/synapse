import Foundation
import Observation

/// Keeps the local store current, in both directions.
///
/// Content comes down; a student's own work goes up. Neither the UI nor any
/// screen calls the network — they read `LocalStore`, and this is the only
/// thing that talks to the API. That separation is what makes every screen
/// work offline without knowing it is offline.
@MainActor
@Observable
final class SyncEngine {

    /// The catalogue documents a student is allowed to read.
    ///
    /// The same list as `STUDENT_READABLE_STATE` in `server/src/index.js`.
    /// Asking for anything outside it earns a 403, correctly — these are the
    /// documents the learning product is made of, and everything else on the
    /// server is operational data.
    static let catalogueKeys = [
        "synapse-academic-universities-v1",
        "synapse-course-curricula-v1",
        "synapse-module-schedules-v1",
        "synapse-admin-content-ledger-v4",
        "synapse-concept-graph-v2",
        "synapse-relation-types-v1",
        "synapse-taxonomy-tree-v4",
        "synapse-medical-library-taxonomy-v1",
        "synapse-medical-glossary-v1",
        "synapse-medical-evidence-published-v1",
        "synapse-plans-v1",
        "synapse-notification-campaigns-v1",
        "synapse-vouchers-v1",
        "synapse-system-colors-v1",
    ]

    /// The ledger: the one document every study surface is built from.
    static let ledgerKey = "synapse-admin-content-ledger-v4"
    /// The published evidence store. What resolves here is what a gated article
    /// may show — see `ArticleProjection`.
    static let evidenceKey = "synapse-medical-evidence-published-v1"
    /// Published concepts, for the annotations a reader may reveal.
    static let conceptGraphKey = "synapse-concept-graph-v2"
    /// The medical library taxonomy — the systems, disciplines, skills and
    /// knowledge branches a student browses by.
    static let medicalTaxonomyKey = "synapse-medical-library-taxonomy-v1"
    /// Universities and their years, for resolving a student's cohort.
    static let universitiesKey = "synapse-academic-universities-v1"
    /// The published timetable, per university/year/course.
    static let moduleSchedulesKey = "synapse-module-schedules-v1"
    /// The bilingual AR⇄EN glossary behind the taxonomy surface.
    static let glossaryKey = "synapse-medical-glossary-v1"
    /// Per-system colours, admin-editable. Fetched rather than hardcoded, so a
    /// new system in the admin console does not need an app release.
    static let systemColorsKey = "synapse-system-colors-v1"

    enum Status: Equatable {
        case idle
        case syncing
        /// Finished, with however many documents actually changed.
        case done(changed: Int, at: Date)
        /// Could not finish. The cache is still readable — it is simply not fresh.
        case failed(String)
    }

    private(set) var status: Status = .idle
    private(set) var pendingUploads = 0

    private let api: SynapseAPI
    private let store: LocalStore
    private var inFlight = false

    init(api: SynapseAPI, store: LocalStore) {
        self.api = api
        self.store = store
    }

    // MARK: - Refresh

    /// Fetch whatever changed, then drain the outbox.
    ///
    /// Safe to call on every launch and every foreground: the manifest makes
    /// "nothing changed" cost one small request rather than a full download.
    func refresh() async {
        guard !inFlight else { return }
        inFlight = true
        status = .syncing
        defer { inFlight = false }

        do {
            let changed = try await pullCatalogues()
            await drainOutbox()
            status = .done(changed: changed, at: Date())
        } catch {
            // A failed refresh is not a failed app. Say so, keep serving the
            // cache, and try again next time.
            status = .failed(Self.describe(error))
            await drainOutbox()
        }
    }

    /// Returns how many documents were actually re-fetched.
    private func pullCatalogues() async throws -> Int {
        let serverVersions: [String: Date?]
        do {
            serverVersions = try await api.stateManifest()
        } catch APIError.notFound, APIError.forbidden {
            // An API deployed before the manifest endpoint. Fall back to the
            // only behaviour available to it — fetch every catalogue — rather
            // than refusing to sync at all. Every key then reads as "not
            // mentioned" below, which is exactly that fallback.
            //
            // Both statuses mean the same thing here, and 403 is the one that
            // actually happens: without the route, `/api/state/:key` matches
            // the path with `key = "manifest"`, which is not in the readable
            // set, so a student is refused rather than 404'd. Treating only
            // 404 as "old server" left the app unable to sync at all against a
            // server that had simply not been redeployed.
            //
            // Safe to treat as absent: a student is never entitled to read a
            // document called `manifest`, so this cannot mask a real refusal.
            serverVersions = [:]
        }

        let localVersions = try await store.catalogueVersions()

        var changed = 0
        for key in Self.catalogueKeys {
            // Three cases, and they are genuinely different.
            guard let serverEntry = serverVersions.index(forKey: key).map({ serverVersions[$0].value }) else {
                // The manifest does not mention this key at all — an older
                // server that predates the endpoint. Fetch, because we cannot
                // tell whether it changed, and reading stale content is worse
                // than one extra request.
                if try await fetchCatalogue(key: key, expecting: nil) { changed += 1 }
                continue
            }

            guard let server = serverEntry else {
                // The manifest lists the key with no timestamp: nothing has
                // ever been written to it. There is no document to fetch, and
                // asking anyway would mean a wasted request on every launch for
                // every catalogue an install does not use.
                continue
            }

            // Skip only when the local copy carries the same stamp the server
            // reports. Anything else is fetched — guessing wrong here means a
            // student silently reads last month's content.
            if let local = localVersions[key] ?? nil, local == server { continue }

            if try await fetchCatalogue(key: key, expecting: server) { changed += 1 }
        }
        return changed
    }

    /// - Returns: whether the document was stored. A key a student may not read
    ///   is skipped permanently rather than retried.
    private func fetchCatalogue(key: String, expecting updatedAt: Date?) async throws -> Bool {
        do {
            let remote = try await api.state(JSONValue.self, key: key)
            guard let value = remote.value else { return false }

            let document = try JSONEncoder().encode(value)
            try await store.saveCatalogue(key: key, document: document, updatedAt: remote.updatedAt ?? updatedAt)

            if key == Self.ledgerKey {
                try await shredLedger(document)
            }
            return true
        } catch APIError.forbidden {
            // Not ours to read. Correct, and permanent — do not retry.
            return false
        }
    }

    /// Turn the ledger document into rows the library can browse and search.
    private func shredLedger(_ document: Data) async throws {
        let json = try JSONSerialization.jsonObject(with: document)
        let (items, skipped) = LedgerDecoder.decode(json)

        if skipped > 0 {
            // Worth saying out loud: a record the app cannot read is content a
            // student cannot see, and nothing else would report it.
            print("[sync] skipped \(skipped) unreadable ledger record(s)")
        }

        var searchTexts: [String: String] = [:]
        for item in items { searchTexts[item.id] = item.searchText }
        try await store.replaceItems(items, searchTexts: searchTexts)
    }

    // MARK: - The student's own work

    /// Record a change to one of the student's documents.
    ///
    /// Writes to the cache first and uploads after, so the app stays usable
    /// with no connection and the student never waits on a round trip to see
    /// their own edit.
    func write<Value: Encodable>(key: String, value: Value) async {
        assert(StateOwnership.isUserOwned(key), "\(key) is not a student-owned key — it would be refused by the server")

        do {
            let payload = try JSONEncoder().encode(value)
            try await store.enqueue(key: key, payload: payload)
            await refreshPendingCount()
            await drainOutbox()
        } catch {
            print("[sync] could not queue \(key): \(error)")
        }
    }

    /// Send everything waiting.
    func drainOutbox() async {
        let pending: [(key: String, payload: Data, queuedAt: Date, attempts: Int)]
        do {
            pending = try await store.pendingWrites()
        } catch {
            return
        }

        for entry in pending {
            do {
                let value = try JSONDecoder().decode(JSONValue.self, from: entry.payload)
                try await api.putUserState(key: entry.key, value: value)
                try await store.clearPending(key: entry.key, uploadedAt: entry.queuedAt)
            } catch APIError.forbidden {
                // The server will never accept this. Retrying forever would
                // block everything queued behind it.
                print("[sync] \(entry.key) refused; abandoning")
                try? await store.abandonPending(key: entry.key)
            } catch APIError.unauthorized {
                // Signed out mid-drain. Keep the work and stop — the rest of
                // the queue would fail the same way.
                return
            } catch {
                try? await store.recordFailure(key: entry.key, error: Self.describe(error))
            }
        }
        await refreshPendingCount()
    }

    private func refreshPendingCount() async {
        pendingUploads = (try? await store.pendingCount()) ?? 0
    }

    // MARK: - Sign-out

    /// Drop everything cached for the previous student.
    func clearForSignOut() async {
        try? await store.clearAll()
        pendingUploads = 0
        status = .idle
    }

    private static func describe(_ error: Error) -> String {
        switch error {
        case APIError.unauthorized: "Signed out"
        case APIError.forbidden: "Not permitted"
        case APIError.transient(let status): "Network error\(status.map { " (\($0))" } ?? "")"
        case APIError.malformed(let detail): "Unexpected response: \(detail)"
        default: error.localizedDescription
        }
    }
}
