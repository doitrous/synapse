import Foundation

/// A student's own highlight or sticky note on a library article.
///
/// A direct port of `LibraryMark` in `src/data/libraryMarks.ts` and the text
/// anchor in `src/lib/library/textAnchor.ts`, and it must stay one: the phone
/// reads and writes the very same document the website does, so the JSON shape
/// here — field names, the anchor, the tone as a bare string — is the contract.
///
/// One record, deliberately, for two things: a highlight is a note with nothing
/// written in it yet. `note` empty is a highlight; `note` set is a sticky note.
struct LibraryMark: Codable, Equatable, Identifiable, Sendable {
    let id: String
    let articleId: String
    var anchor: TextAnchor
    /// A `NOTE_TONES` value from the web palette. Kept as a string so a tone
    /// authored anywhere round-trips untouched, even one this build does not
    /// offer in its toolbar.
    var tone: String
    /// Empty for a plain highlight.
    var note: String
    /// ISO-8601, for ordering a student's own marks.
    var createdAt: String
}

/// Where a mark is pinned in the prose: the words, and a little of either side
/// so repeats of the same phrase can be told apart. The shape the W3C
/// text-quote selector settled on, and what `textAnchor.ts` records.
struct TextAnchor: Codable, Equatable, Sendable {
    /// Which run of text in the article this belongs to. Opaque: the reader
    /// assigns them and only has to be consistent with itself between renders.
    var block: String
    /// The selected words, exactly as they appeared.
    var exact: String
    /// Up to `contextWindow` characters before the selection.
    var prefix: String
    /// Up to `contextWindow` characters after it.
    var suffix: String
}

/// A half-open `[start, end)` range in a block's text.
struct TextRange: Equatable, Sendable {
    var start: Int
    var end: Int
}

/// Marks keyed by the article they sit on — the whole stored document.
typealias LibraryMarkStore = [String: [LibraryMark]]

enum LibraryMarks {

    /// Dotted and under `nishany.library.`, which `StateOwnership` routes to the
    /// student's own record. Undotted it would go to the shared catalogue store,
    /// where a student may not write and every save would be refused. Matches
    /// `LIBRARY_MARKS_STORAGE_KEY` on the web exactly.
    static let storageKey = "nishany.library.marks.v1"

    /// The tones the selection toolbar offers, in the order shown. `MARK_TONES`
    /// on the web.
    static let offeredTones = ["amber", "teal", "rose", "sage"]

    /// How much of either side an anchor keeps. `CONTEXT` in `textAnchor.ts`.
    static let contextWindow = 32

    private static var sequence = 0

    /// `mk-<base36 millis>-<seq>`, matching `newMarkId` on the web.
    static func newMarkId(now: Date = Date()) -> String {
        sequence += 1
        let millis = Int(now.timeIntervalSince1970 * 1000)
        return "mk-\(String(millis, radix: 36))-\(sequence)"
    }

    // MARK: - Store folds (ports of libraryMarks.ts)

    static func marks(_ store: LibraryMarkStore, on articleId: String) -> [LibraryMark] {
        store[articleId] ?? []
    }

    /// Add or replace a mark, keeping each article's list in creation order.
    static func upsert(_ store: LibraryMarkStore, _ mark: LibraryMark) -> LibraryMarkStore {
        var next = store
        var list = (next[mark.articleId] ?? []).filter { $0.id != mark.id }
        list.append(mark)
        next[mark.articleId] = list
        return next
    }

    /// Remove a mark, and the article's entry entirely once its last one goes.
    static func remove(_ store: LibraryMarkStore, articleId: String, markId: String) -> LibraryMarkStore {
        var next = store
        let remaining = (next[articleId] ?? []).filter { $0.id != markId }
        if remaining.isEmpty { next.removeValue(forKey: articleId) } else { next[articleId] = remaining }
        return next
    }

    // MARK: - Anchoring (port of textAnchor.ts)

    /// Build an anchor for the range `[start, end)` of a block's text, or nil
    /// when the range is empty or out of bounds. Offsets are in Unicode scalars,
    /// the same unit the browser's string indexing uses, so an anchor made on
    /// one platform resolves on the other.
    static func makeAnchor(block: String, text: String, start: Int, end: Int) -> TextAnchor? {
        let scalars = Array(text.unicodeScalars)
        guard start >= 0, end <= scalars.count, end > start else { return nil }
        let exact = String(String.UnicodeScalarView(scalars[start..<end]))
        guard !exact.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return nil }
        let prefixStart = max(0, start - contextWindow)
        let suffixEnd = min(scalars.count, end + contextWindow)
        return TextAnchor(
            block: block,
            exact: exact,
            prefix: String(String.UnicodeScalarView(scalars[prefixStart..<start])),
            suffix: String(String.UnicodeScalarView(scalars[end..<suffixEnd]))
        )
    }

    /// Where this anchor sits in `text` now, or nil if its words have gone.
    ///
    /// When the phrase occurs more than once, the occurrence whose surroundings
    /// still match best wins. A case-insensitive pass is a deliberate second
    /// choice — an editor recasing a sentence should not lose a highlight — but
    /// exact matches are always preferred when any exist.
    static func resolveAnchor(_ text: String, _ anchor: TextAnchor) -> TextRange? {
        guard !anchor.exact.isEmpty else { return nil }
        let haystack = Array(text.unicodeScalars)
        let needle = Array(anchor.exact.unicodeScalars)

        var starts = occurrences(haystack, needle)
        if starts.isEmpty {
            let lowerHay = Array(text.lowercased().unicodeScalars)
            let lowerNeedle = Array(anchor.exact.lowercased().unicodeScalars)
            // A recased edit only changes letters, never the scalar count, so
            // the lowered indices still address the original text.
            if lowerHay.count == haystack.count {
                starts = occurrences(lowerHay, lowerNeedle)
            }
        }
        let length = needle.count
        guard !starts.isEmpty else { return nil }
        if starts.count == 1 { return TextRange(start: starts[0], end: starts[0] + length) }

        let prefix = Array(anchor.prefix.unicodeScalars)
        let suffix = Array(anchor.suffix.unicodeScalars)
        var best = starts[0]
        var bestScore = -1
        for start in starts {
            let score = commonRun(Array(haystack[0..<start]), prefix, fromEnd: true)
                + commonRun(Array(haystack[(start + length)...]), suffix, fromEnd: false)
            if score > bestScore { bestScore = score; best = start }
        }
        return TextRange(start: best, end: best + length)
    }

    /// Every index at which `needle` occurs in `haystack`, including overlaps.
    private static func occurrences(_ haystack: [Unicode.Scalar], _ needle: [Unicode.Scalar]) -> [Int] {
        guard !needle.isEmpty, needle.count <= haystack.count else { return [] }
        var found: [Int] = []
        var at = 0
        let last = haystack.count - needle.count
        while at <= last {
            var match = true
            for offset in 0..<needle.count where haystack[at + offset] != needle[offset] {
                match = false
                break
            }
            if match { found.append(at) }
            at += 1
        }
        return found
    }

    /// How many scalars two arrays share, reading inward from the given ends.
    private static func commonRun(_ a: [Unicode.Scalar], _ b: [Unicode.Scalar], fromEnd: Bool) -> Int {
        let limit = min(a.count, b.count)
        var run = 0
        while run < limit {
            let left = fromEnd ? a[a.count - 1 - run] : a[run]
            let right = fromEnd ? b[b.count - 1 - run] : b[run]
            if left != right { break }
            run += 1
        }
        return run
    }

    // MARK: - Placement

    /// One placed mark and where it resolves to in a block's text now.
    struct Placement: Equatable, Sendable {
        let mark: LibraryMark
        let range: TextRange
    }

    /// Assign every mark to at most one block, and collect the ones whose words
    /// are gone from the whole article.
    ///
    /// A mark is placed in the block its anchor names when the words are still
    /// there; failing that — which is every mark made on the other platform,
    /// whose block ids never match this projection's — in the first block whose
    /// text still contains them. Only when no block holds the words at all is a
    /// mark an orphan, exactly as the web decides it. Placing in at most one
    /// block is what stops a phrase that recurs in two blocks being drawn twice.
    ///
    /// - Parameter blocks: every markable block, in reading order, as (id, text).
    /// - Returns: placements keyed by block id (each in the marks' own order),
    ///   and the orphans in that same order.
    static func place(
        _ marks: [LibraryMark],
        in blocks: [(id: String, text: String)]
    ) -> (placements: [String: [Placement]], orphans: [LibraryMark]) {
        var placements: [String: [Placement]] = [:]
        var orphans: [LibraryMark] = []
        let byId = Dictionary(blocks.map { ($0.id, $0.text) }, uniquingKeysWith: { first, _ in first })

        for mark in marks {
            if let own = byId[mark.anchor.block], let range = resolveAnchor(own, mark.anchor) {
                placements[mark.anchor.block, default: []].append(Placement(mark: mark, range: range))
                continue
            }
            var placed = false
            for block in blocks {
                if let range = resolveAnchor(block.text, mark.anchor) {
                    placements[block.id, default: []].append(Placement(mark: mark, range: range))
                    placed = true
                    break
                }
            }
            if !placed { orphans.append(mark) }
        }
        return (placements, orphans)
    }
}
