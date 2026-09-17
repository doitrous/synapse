import Foundation

/// Where a student's marks are stored.
///
/// A port of `src/lib/reader/annotationKey.ts`. Every string this produces must
/// match the web's byte for byte — a key that differs by one character is not
/// an error, it is a second, invisible set of notes.
///
/// One key is one JSON document rewritten in full on every change, and the
/// server keeps a version row beside it. A heavily annotated 300-page book is
/// several megabytes, so marks are sharded by page range: a stroke rewrites
/// sixteen pages' worth, and the reader keeps only the shards near the viewport
/// open.
enum AnnotationKey {

    /// Pages per shard. Small enough to rewrite cheaply, large enough to be few.
    static let shardPages = 16

    private static let prefix = "nishany.annotations.v1."
    /// `k VARCHAR(160)` in `user_state`.
    private static let maxKeyLength = 160
    /// Room for the longest suffix appended below: `.s` plus digits.
    private static let suffixBudget = 8

    static func shardIndex(forPage page: Int) -> Int {
        (max(1, page) - 1) / shardPages
    }

    /// The inclusive page range a shard covers.
    static func pageRange(forShard index: Int) -> ClosedRange<Int> {
        (index * shardPages + 1)...((index + 1) * shardPages)
    }

    /// The shards a page range touches, so the reader loads only what it shows.
    static func shards(fromPage from: Int, toPage to: Int) -> [Int] {
        Array(shardIndex(forPage: from)...shardIndex(forPage: to))
    }

    /// A stable, bounded name for one document.
    ///
    /// `r-` for a catalogue resource, `d-` for the student's own upload. An id
    /// long enough to threaten the column is hashed rather than truncated —
    /// truncation would let two documents collide silently and share each
    /// other's notes.
    static func scope(kind: Kind, id: String) -> String {
        let budget = maxKeyLength - prefix.count - suffixBudget - kind.rawValue.count
        let safe = String(id.map { character in
            character.isASCII && (character.isLetter || character.isNumber)
                || character == "." || character == "_" || character == "-"
                ? character : "_"
        })
        return safe.count <= budget ? "\(kind.rawValue)\(safe)" : "\(kind.rawValue)h\(fnv1a(id))"
    }

    enum Kind: String, Sendable {
        case resource = "r-"
        case document = "d-"
    }

    static func manifestKey(scope: String) -> String { "\(prefix)\(scope).idx" }
    static func shardKey(scope: String, index: Int) -> String { "\(prefix)\(scope).s\(index)" }

    /// FNV-1a, hex. Not a security boundary — just a short, stable name.
    ///
    /// Hashes the *original* id, not the sanitised one, exactly as the web
    /// does: sanitising first would make two different ids that differ only in
    /// punctuation hash the same.
    static func fnv1a(_ value: String) -> String {
        var hash: UInt32 = 0x811c9dc5
        // `charCodeAt` yields UTF-16 code units, so the same string must be
        // walked the same way or the hash diverges on anything non-ASCII.
        for unit in Array(value.utf16) {
            hash ^= UInt32(unit)
            hash = hash &* 0x01000193
        }
        return String(format: "%08x", hash)
    }
}
