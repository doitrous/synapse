import Foundation

/// Finding words in a document, and in what the student wrote on it.
///
/// A port of the matching in `src/lib/reader/searchIndex.ts`. What is *not*
/// ported is that file's `buildPageText` / `mapRangeToItems`: those exist to map
/// a character range back onto pdf.js's text-layer spans so a hit can be
/// highlighted in the DOM. PDFKit hands back a `PDFSelection` that already knows
/// where it is, so reproducing the offset arithmetic here would be inventing a
/// problem in order to solve it. What is ported is the part that decides *what
/// a result is* — every occurrence rather than the first, and the snippet a
/// student recognises it by.
enum SearchIndex {

    private static let snippetBefore = 40
    private static let snippetAfter = 60

    struct Match: Identifiable, Equatable, Sendable {
        let page: Int
        /// Character range within the page's text.
        let start: Int
        let end: Int
        /// Enough surrounding text to recognise the hit in a list.
        let snippet: String
        /// Set for a hit in the student's own writing: a sticky note, a text
        /// box. Empty for the document's own text.
        var label: String = ""

        var id: String { "\(label)-\(page)-\(start)" }
        var isOwnWriting: Bool { !label.isEmpty }
    }

    /// Every occurrence, not just the first. Overlaps are not counted twice.
    ///
    /// The web's old search kept only the first hit per page, so a word
    /// appearing four times was reported once.
    static func matches(in text: String, page: Int, of needle: String, label: String = "") -> [Match] {
        let query = needle.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !query.isEmpty, !text.isEmpty else { return [] }

        let haystack = Array(text.lowercased())
        let source = Array(text)
        let target = Array(query)
        guard target.count <= haystack.count else { return [] }

        var found: [Match] = []
        var cursor = 0
        while cursor + target.count <= haystack.count {
            if Array(haystack[cursor..<(cursor + target.count)]) == target {
                let end = cursor + target.count
                found.append(Match(
                    page: page, start: cursor, end: end,
                    snippet: snippet(around: source, start: cursor, end: end),
                    label: label
                ))
                cursor = end
            } else {
                cursor += 1
            }
        }
        return found
    }

    private static func snippet(around text: [Character], start: Int, end: Int) -> String {
        let from = max(0, start - snippetBefore)
        let to = min(text.count, end + snippetAfter)
        let body = String(text[from..<to])
            .split(whereSeparator: \.isWhitespace)
            .joined(separator: " ")
        return "\(from > 0 ? "…" : "")\(body)\(to < text.count ? "…" : "")"
    }

    /// A student's own writing, searched alongside the document's.
    ///
    /// Notes are the thing most worth finding again. They are read from the
    /// manifest rather than from the shards, which is what lets a search made
    /// on page 3 find a note on page 240 — see `AnnotationManifest`.
    static func notes(_ entries: [AnnotationManifest.NoteEntry], of needle: String) -> [Match] {
        entries.flatMap { entry in
            matches(
                in: entry.text, page: entry.page, of: needle,
                label: entry.kind == "note" ? "Sticky note" : "Text box"
            )
        }
    }
}

/// A document a student has opened.
///
/// The dashboard's "last used" was once a hardcoded list shown to students who
/// had opened nothing. This is the record that replaces it: written when a
/// resource is actually opened, and empty until then.
struct RecentResource: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var title: String
    var type: String
    var subjectId: String
    /// Chapter, page, slide or timestamp — whatever the resource records.
    var meta: String
    var openedAt: String

    /// Enough to fill the panel and show a little history, without unbounded
    /// growth.
    static let limit = 10
    static let key = "nishany.progress.recentResources.v1"

    /// Re-opening moves a document to the front rather than listing it twice.
    static func noting(_ opened: RecentResource, in current: [RecentResource]) -> [RecentResource] {
        Array(([opened] + current.filter { $0.id != opened.id }).prefix(limit))
    }
}
