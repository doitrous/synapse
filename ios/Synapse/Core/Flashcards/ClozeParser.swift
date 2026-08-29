import Foundation

/// Cloze notes: one block of text, `{{c1::hidden}}` markup, many cards. A port
/// of `src/data/flashcards/cloze.ts`.
///
/// `Hyperplasia is {{c1::proliferation}} of {{c2::cells}}.` is two cards that
/// share a front. Every *distinct* cloze number is its own card; a card's
/// identity is its cloze number (`templateKey = "c1"`), not its position, so
/// inserting a deletion ahead of it never renumbers it and orphans its schedule.
///
/// The parse is pure and total: malformed input yields a validation error, never
/// a thrown exception mid-keystroke. All offsets are UTF-16 (via `NSString`) to
/// match the web's JavaScript string semantics exactly — a selection index from
/// a text view and a `caret` returned here are the same units the web uses.

enum ClozeToken: Equatable, Sendable {
    case text(String)
    case cloze(number: Int, content: String, hint: String?)
}

enum ClozeError: String, Equatable, Sendable {
    case noCloze = "no-cloze"
    case emptyDeletion = "empty-deletion"
    case unbalanced
    case zeroNumber = "zero-number"
}

struct ClozeValidation: Equatable, Sendable {
    var ok: Bool
    var errors: [ClozeError]
}

/// One rendered piece of a cloze card's face.
enum ClozeCell: Equatable, Sendable {
    case text(String)
    case blank(hint: String?)
    case answer(String)
}

enum ClozeSide: Sendable { case front, back }

enum Cloze {
    /// `{{cN::content}}` or `{{cN::content::hint}}`; non-greedy so adjacent
    /// deletions don't swallow each other. `[\s\S]` matches across newlines.
    /// (`cloze.ts:30`)
    private static let regex = try! NSRegularExpression(
        pattern: "\\{\\{c(\\d+)::([\\s\\S]*?)(?:::([\\s\\S]*?))?\\}\\}"
    )

    /// Split cloze text into literal runs and deletions. (`cloze.ts:28-45`)
    static func tokenize(_ text: String) -> [ClozeToken] {
        var tokens: [ClozeToken] = []
        let ns = text as NSString
        var last = 0
        for m in regex.matches(in: text, range: NSRange(location: 0, length: ns.length)) {
            if m.range.location > last {
                tokens.append(.text(ns.substring(with: NSRange(location: last, length: m.range.location - last))))
            }
            let number = Int(ns.substring(with: m.range(at: 1))) ?? 0
            let content = ns.substring(with: m.range(at: 2))
            let hintRange = m.range(at: 3)
            let hint = hintRange.location == NSNotFound ? nil : ns.substring(with: hintRange)
            tokens.append(.cloze(number: number, content: content, hint: hint))
            last = m.range.location + m.range.length
        }
        if last < ns.length {
            tokens.append(.text(ns.substring(with: NSRange(location: last, length: ns.length - last))))
        }
        return tokens
    }

    /// The distinct cloze numbers present, ascending. Each becomes one card.
    /// (`cloze.ts:48-54`)
    static func numbers(_ text: String) -> [Int] {
        var seen = Set<Int>()
        for token in tokenize(text) {
            if case let .cloze(number, _, _) = token { seen.insert(number) }
        }
        return seen.sorted()
    }

    /// Whether the text would generate valid cards. (`cloze.ts:68-86`)
    static func validate(_ text: String) -> ClozeValidation {
        var errors: [ClozeError] = []
        func add(_ e: ClozeError) { if !errors.contains(e) { errors.append(e) } }

        let tokens = tokenize(text)
        let clozes = tokens.compactMap { token -> (Int, String)? in
            if case let .cloze(number, content, _) = token { return (number, content) }
            return nil
        }

        if clozes.isEmpty { add(.noCloze) }
        for (number, content) in clozes {
            if content.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty { add(.emptyDeletion) }
            if number == 0 { add(.zeroNumber) }
        }
        // A `{{` or `}}` left over in a literal run is an unclosed deletion.
        for token in tokens {
            if case let .text(t) = token, t.contains("{{") || t.contains("}}") { add(.unbalanced) }
        }

        return ClozeValidation(ok: errors.isEmpty, errors: errors)
    }

    /// One past the highest number in use, or 1 for empty text. (`cloze.ts:94-97`)
    static func nextNumber(_ text: String) -> Int {
        let nums = numbers(text)
        return nums.isEmpty ? 1 : (nums.max()! + 1)
    }

    /// Wrap a selection in cloze markup, or insert an empty deletion when there
    /// is no selection; the caret lands inside the deletion. Offsets are UTF-16.
    /// (`cloze.ts:105-121`)
    static func insert(_ text: String, selStart: Int, selEnd: Int, number numberOverride: Int? = nil) -> (text: String, caret: Int) {
        let number = numberOverride ?? nextNumber(text)
        let ns = text as NSString
        let selected = ns.substring(with: NSRange(location: selStart, length: selEnd - selStart))
        let before = ns.substring(to: selStart)
        let after = ns.substring(from: selEnd)
        if selected.isEmpty {
            let open = "{{c\(number)::"
            return ("\(before)\(open)}}\(after)", selStart + (open as NSString).length)
        }
        let wrapped = "{{c\(number)::\(selected)}}"
        return ("\(before)\(wrapped)\(after)", selStart + (wrapped as NSString).length)
    }

    /// Render one side of the card for `activeNumber`: on the front the active
    /// deletion is a blank (with its hint) and the rest are revealed as plain
    /// text; on the back the active deletion is revealed too. (`cloze.ts:136-150`)
    static func renderSide(_ text: String, activeNumber: Int, side: ClozeSide) -> [ClozeCell] {
        var cells: [ClozeCell] = []
        for token in tokenize(text) {
            switch token {
            case let .text(t):
                cells.append(.text(t))
            case let .cloze(number, content, hint):
                if number != activeNumber {
                    cells.append(.text(content))
                } else {
                    cells.append(side == .front ? .blank(hint: hint) : .answer(content))
                }
            }
        }
        return cells
    }

    /// Plain, markup-free text of a cloze note, for search and duplicate checks.
    /// (`cloze.ts:153-157`)
    static func plainText(_ text: String) -> String {
        tokenize(text).map { token -> String in
            switch token {
            case let .text(t): return t
            case let .cloze(_, content, _): return content
            }
        }.joined()
    }
}
