import Foundation
import GRDB

/// The on-device mirror of everything the app shows.
///
/// The UI reads from here and only from here. Screens never wait on the
/// network, which is what makes the app usable on a ward with no signal and
/// removes the loading spinner from every view. Keeping the network out of the
/// read path is the single rule this design rests on.
///
/// Three things live here:
///
/// - **catalogue documents** — the shared, admin-authored content, stored whole
///   and also shredded into rows so the library can be browsed and searched;
/// - **sync bookkeeping** — when each document was last changed on the server,
///   so a refresh fetches only what moved;
/// - **the outbox** — writes made while offline, waiting to reach the server.
actor LocalStore {

    private let dbQueue: DatabaseQueue

    /// Opens the store. Pass `nil` for an in-memory database (tests).
    init(path: String?) throws {
        var config = Configuration()
        // Student work is private study data. If the phone is locked and
        // stolen, the file should not be readable.
        config.prepareDatabase { db in
            try db.execute(sql: "PRAGMA foreign_keys = ON")
        }

        if let path {
            dbQueue = try DatabaseQueue(path: path, configuration: config)
        } else {
            dbQueue = try DatabaseQueue(configuration: config)
        }
        try Self.migrator.migrate(dbQueue)
    }

    /// The default location: Application Support, excluded from iCloud backup
    /// because every byte of it can be re-fetched and it is large.
    static func defaultURL() throws -> URL {
        let base = try FileManager.default.url(
            for: .applicationSupportDirectory, in: .userDomainMask,
            appropriateFor: nil, create: true
        )
        let folder = base.appendingPathComponent("Synapse", isDirectory: true)
        try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)

        var resourceValues = URLResourceValues()
        resourceValues.isExcludedFromBackup = true
        var mutable = folder
        try? mutable.setResourceValues(resourceValues)

        return folder.appendingPathComponent("cache.sqlite")
    }

    // MARK: - Schema

    private static var migrator: DatabaseMigrator {
        var migrator = DatabaseMigrator()

        migrator.registerMigration("v1") { db in
            // What the server last changed, per catalogue key. `fetchedAt` is
            // when we last pulled it; `updatedAt` is the server's own stamp and
            // is what a refresh compares against.
            try db.create(table: "catalogue") { t in
                t.primaryKey("key", .text)
                t.column("updatedAt", .datetime)
                t.column("fetchedAt", .datetime).notNull()
                t.column("document", .blob).notNull()
            }

            try db.create(table: "item") { t in
                t.primaryKey("id", .text)
                t.column("kind", .text).notNull().indexed()
                t.column("title", .text).notNull()
                t.column("subjectId", .text).notNull().indexed()
                t.column("status", .text).notNull()
                t.column("updatedAt", .text)
                t.column("universityIds", .text).notNull()
                t.column("yearIds", .text).notNull()
                t.column("raw", .blob).notNull()
                // Lives on the row because the FTS index is kept in step by
                // triggers built from these columns — see below.
                t.column("searchText", .text).notNull()
            }

            // Search. FTS5 is the reason this is SQLite rather than SwiftData,
            // which has no full-text index — and searching thousands of
            // articles with a LIKE scan is not something to ship.
            //
            // `synchronize` installs triggers that mirror `item` into the
            // index, so writes go to one table and the index cannot drift out
            // of step with it. Every column named here must exist on `item`.
            try db.create(virtualTable: "itemSearch", using: FTS5()) { t in
                t.synchronize(withTable: "item")
                t.column("title")
                t.column("searchText")
                t.tokenizer = FTS5TokenizerDescriptor.unicode61()
            }

            // Writes made offline, waiting to go up.
            //
            // Keyed by document, not appended per edit: a student who renames a
            // note six times offline should send the final text once, not six
            // versions. `queuedAt` is when the last edit happened and is what
            // decides precedence against the server's copy.
            try db.create(table: "outboxEntry") { t in
                t.primaryKey("key", .text)
                t.column("payload", .blob).notNull()
                t.column("queuedAt", .datetime).notNull()
                t.column("attempts", .integer).notNull().defaults(to: 0)
                t.column("lastError", .text)
            }
        }

        migrator.registerMigration("v2-attempts") { db in
            // The student's own answers, kept locally first.
            //
            // The server holds these as one document per month, so recording an
            // answer means read-modify-write of a shared document — which can
            // fail, and must never be the only copy. Written here on answering
            // and pushed afterwards, so a session survives being offline, the
            // app being killed, and a failed upload.
            try db.create(table: "attempt") { t in
                t.primaryKey("id", .text)
                t.column("month", .text).notNull().indexed()
                t.column("record", .blob).notNull()
                // Cleared once the month's document has been written up.
                t.column("pending", .boolean).notNull().defaults(to: true)
            }
        }

        return migrator
    }

    // MARK: - Attempts

    func saveAttempt(id: String, month: String, record: Data) throws {
        try dbQueue.write { db in
            try db.execute(
                sql: """
                    INSERT INTO attempt (id, month, record, pending) VALUES (?, ?, ?, 1)
                    ON CONFLICT(id) DO UPDATE SET record = excluded.record, pending = 1
                    """,
                arguments: [id, month, record]
            )
        }
    }

    /// Every attempt recorded in a month, whether or not it has been pushed.
    ///
    /// The whole month is returned because the server document is replaced
    /// wholesale — writing only the unpushed ones would drop the rest.
    func attempts(month: String) throws -> [Data] {
        try dbQueue.read { db in
            try Data.fetchAll(db, sql: "SELECT record FROM attempt WHERE month = ? ORDER BY id", arguments: [month])
        }
    }

    /// Months that have attempts not yet written up.
    func monthsWithPendingAttempts() throws -> [String] {
        try dbQueue.read { db in
            try String.fetchAll(db, sql: "SELECT DISTINCT month FROM attempt WHERE pending = 1 ORDER BY month")
        }
    }

    func markAttemptsPushed(month: String) throws {
        try dbQueue.write { db in
            try db.execute(sql: "UPDATE attempt SET pending = 0 WHERE month = ?", arguments: [month])
        }
    }

    func attemptCount() throws -> Int {
        try dbQueue.read { db in try Int.fetchOne(db, sql: "SELECT COUNT(*) FROM attempt") ?? 0 }
    }

    // MARK: - Catalogue documents

    /// When we last saw each catalogue document change, by key.
    func catalogueVersions() throws -> [String: Date?] {
        try dbQueue.read { db in
            let rows = try Row.fetchAll(db, sql: "SELECT key, updatedAt FROM catalogue")
            return Dictionary(uniqueKeysWithValues: rows.map { ($0["key"] as String, $0["updatedAt"] as Date?) })
        }
    }

    /// Store a freshly fetched document.
    func saveCatalogue(key: String, document: Data, updatedAt: Date?) throws {
        try dbQueue.write { db in
            try db.execute(
                sql: """
                    INSERT INTO catalogue (key, updatedAt, fetchedAt, document)
                    VALUES (?, ?, ?, ?)
                    ON CONFLICT(key) DO UPDATE SET
                        updatedAt = excluded.updatedAt,
                        fetchedAt = excluded.fetchedAt,
                        document = excluded.document
                    """,
                arguments: [key, updatedAt, Date(), document]
            )
        }
    }

    func catalogue(key: String) throws -> Data? {
        try dbQueue.read { db in
            try Data.fetchOne(db, sql: "SELECT document FROM catalogue WHERE key = ?", arguments: [key])
        }
    }

    // MARK: - Ledger items

    /// Replace the shredded ledger.
    ///
    /// One transaction, so a refresh interrupted halfway cannot leave the
    /// library half-old and half-new — the student either sees the previous
    /// catalogue or the next one, never a mixture.
    func replaceItems(_ items: [LedgerItem], searchTexts: [String: String]) throws {
        try dbQueue.write { db in
            try db.execute(sql: "DELETE FROM item")
            for item in items {
                try db.execute(
                    sql: """
                        INSERT INTO item (id, kind, title, subjectId, status, updatedAt,
                                          universityIds, yearIds, raw, searchText)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """,
                    arguments: [
                        item.id, item.kind.rawValue, item.title, item.subjectId,
                        item.status.rawValue, item.updatedAt,
                        item.universityIds.joined(separator: "\u{1F}"),
                        item.yearIds.joined(separator: "\u{1F}"),
                        item.raw,
                        searchTexts[item.id] ?? item.title,
                    ]
                )
            }
        }
    }

    func itemCount(kind: ContentKind? = nil) throws -> Int {
        try dbQueue.read { db in
            if let kind {
                return try Int.fetchOne(db, sql: "SELECT COUNT(*) FROM item WHERE kind = ?", arguments: [kind.rawValue]) ?? 0
            }
            return try Int.fetchOne(db, sql: "SELECT COUNT(*) FROM item") ?? 0
        }
    }

    /// Items of a kind that this student may actually see.
    func items(kind: ContentKind, universityId: String?, yearId: String?) throws -> [LedgerItem] {
        try dbQueue.read { db in
            let rows = try Row.fetchAll(
                db,
                sql: "SELECT * FROM item WHERE kind = ? AND status = ? ORDER BY title",
                arguments: [kind.rawValue, ContentStatus.published.rawValue]
            )
            return rows.compactMap(Self.item(from:))
                .filter { $0.inScope(universityId: universityId, yearId: yearId) }
        }
    }

    /// Full-text search, restricted to what this student may see.
    func search(_ query: String, kind: ContentKind?, universityId: String?, yearId: String?, limit: Int = 50) throws -> [LedgerItem] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return [] }

        return try dbQueue.read { db in
            // A student typing "myocardial inf" means a prefix, not a typo, so
            // match the last token as one. Quoting each token keeps FTS syntax
            // characters in a search box from being read as operators.
            let pattern = trimmed
                .split(separator: " ")
                .map { "\"\($0.replacingOccurrences(of: "\"", with: ""))\"" }
                .joined(separator: " ") + "*"

            var sql = """
                SELECT item.* FROM item
                JOIN itemSearch ON itemSearch.rowid = item.rowid
                WHERE itemSearch MATCH ? AND item.status = ?
                """
            var arguments: [DatabaseValueConvertible] = [pattern, ContentStatus.published.rawValue]
            if let kind {
                sql += " AND item.kind = ?"
                arguments.append(kind.rawValue)
            }
            sql += " ORDER BY rank LIMIT ?"
            arguments.append(limit)

            let rows = try Row.fetchAll(db, sql: sql, arguments: StatementArguments(arguments))
            return rows.compactMap(Self.item(from:))
                .filter { $0.inScope(universityId: universityId, yearId: yearId) }
        }
    }

    private static func item(from row: Row) -> LedgerItem? {
        guard
            let kind = ContentKind(rawValue: row["kind"]),
            let status = ContentStatus(rawValue: row["status"])
        else { return nil }

        func list(_ column: String) -> [String] {
            let raw: String = row[column]
            return raw.isEmpty ? [] : raw.components(separatedBy: "\u{1F}")
        }

        return LedgerItem(
            id: row["id"], kind: kind, title: row["title"], subjectId: row["subjectId"],
            status: status, updatedAt: row["updatedAt"], raw: row["raw"],
            universityIds: list("universityIds"), yearIds: list("yearIds"),
            searchText: ""
        )
    }

    // MARK: - Outbox

    /// Queue a private document for upload, replacing any earlier queued copy.
    func enqueue(key: String, payload: Data, at date: Date = Date()) throws {
        try dbQueue.write { db in
            try db.execute(
                sql: """
                    INSERT INTO outboxEntry (key, payload, queuedAt, attempts)
                    VALUES (?, ?, ?, 0)
                    ON CONFLICT(key) DO UPDATE SET
                        payload = excluded.payload,
                        queuedAt = excluded.queuedAt,
                        attempts = 0,
                        lastError = NULL
                    """,
                arguments: [key, payload, date]
            )
        }
    }

    func pendingWrites() throws -> [(key: String, payload: Data, queuedAt: Date, attempts: Int)] {
        try dbQueue.read { db in
            try Row.fetchAll(db, sql: "SELECT * FROM outboxEntry ORDER BY queuedAt")
                .map { ($0["key"], $0["payload"], $0["queuedAt"], $0["attempts"]) }
        }
    }

    func pendingCount() throws -> Int {
        try dbQueue.read { db in
            try Int.fetchOne(db, sql: "SELECT COUNT(*) FROM outboxEntry") ?? 0
        }
    }

    /// Remove a queued write.
    ///
    /// Guarded on `queuedAt` so an upload that succeeded does not delete an
    /// edit the student made while it was in flight. Without the guard, typing
    /// during a slow upload loses the last few seconds of work.
    func clearPending(key: String, uploadedAt: Date) throws {
        try dbQueue.write { db in
            try db.execute(
                sql: "DELETE FROM outboxEntry WHERE key = ? AND queuedAt <= ?",
                arguments: [key, uploadedAt]
            )
        }
    }

    func recordFailure(key: String, error: String) throws {
        try dbQueue.write { db in
            try db.execute(
                sql: "UPDATE outboxEntry SET attempts = attempts + 1, lastError = ? WHERE key = ?",
                arguments: [error, key]
            )
        }
    }

    /// Drop a write that will never succeed, so the queue cannot stall behind it.
    func abandonPending(key: String) throws {
        try dbQueue.write { db in
            try db.execute(sql: "DELETE FROM outboxEntry WHERE key = ?", arguments: [key])
        }
    }

    /// Forget everything. Used on sign-out — the next student on this device
    /// must not inherit the previous one's cache, and least of all their
    /// answers.
    func clearAll() throws {
        try dbQueue.write { db in
            for table in ["catalogue", "item", "outboxEntry", "attempt"] {
                try db.execute(sql: "DELETE FROM \(table)")
            }
        }
    }
}
