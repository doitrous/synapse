import Foundation

/// Which words in a sentence are concepts.
///
/// A port of the matching in `src/components/concepts/ConceptText.tsx`. Two
/// rules carry the whole correctness of it. Terms are matched longest first, so
/// "heart failure" wins over "heart" and a student is not offered a definition
/// of the wrong thing. And matching is on whole words, so "arterial" does not
/// light up inside "arterioles".
struct ConceptTerms: Sendable {

    /// Lower-cased term → concept.
    private let byTerm: [String: Concept]
    /// Terms, longest first. The order is the correctness.
    private let terms: [String]

    let concepts: [Concept]
    let relations: [ConceptRelation]

    init(graph: ConceptGraph = ConceptGraph()) {
        concepts = graph.concepts.filter(\.isActive)
        relations = graph.relations

        var lookup: [String: Concept] = [:]
        for concept in concepts {
            for term in concept.terms {
                // First writer wins, so a term claimed by two concepts resolves
                // the same way every time rather than by dictionary order.
                let key = term.trimmed.lowercased()
                if lookup[key] == nil { lookup[key] = concept }
            }
        }
        byTerm = lookup
        terms = lookup.keys.sorted { $0.count != $1.count ? $0.count > $1.count : $0 < $1 }
    }

    var isEmpty: Bool { terms.isEmpty }

    func concept(id: String) -> Concept? { concepts.first { $0.id == id } }

    /// A run of text, either plain or a concept.
    struct Piece: Equatable, Sendable {
        var text: String
        var conceptId: String?
    }

    /// Split a sentence into plain runs and concept runs.
    ///
    /// Returns one plain piece when nothing matches, so a caller can always
    /// render the result the same way.
    func split(_ text: String) -> [Piece] {
        guard !isEmpty, !text.isEmpty else { return [Piece(text: text, conceptId: nil)] }

        let lower = text.lowercased()
        var pieces: [Piece] = []
        var cursor = text.startIndex

        while cursor < text.endIndex {
            var matched: (range: Range<String.Index>, concept: Concept)?

            // Longest term first, so the first hit at this position is the best
            // one and the search can stop.
            for term in terms {
                guard let range = lower.range(of: term, range: cursor..<text.endIndex),
                      Self.isWholeWord(range, in: text)
                else { continue }
                if matched == nil || range.lowerBound < matched!.range.lowerBound {
                    matched = (range, byTerm[term]!)
                    // A match starting exactly here cannot be beaten by a later
                    // one, and the term list is already longest-first.
                    if range.lowerBound == cursor { break }
                }
            }

            guard let matched else {
                pieces.append(Piece(text: String(text[cursor...]), conceptId: nil))
                break
            }

            if matched.range.lowerBound > cursor {
                pieces.append(Piece(text: String(text[cursor..<matched.range.lowerBound]), conceptId: nil))
            }
            pieces.append(Piece(text: String(text[matched.range]), conceptId: matched.concept.id))
            cursor = matched.range.upperBound
        }

        return pieces.isEmpty ? [Piece(text: text, conceptId: nil)] : pieces
    }

    /// Whether a match sits on word boundaries.
    ///
    /// Without this "arterial" lights up inside "arterioles", and a student is
    /// shown a definition of something the sentence never said.
    private static func isWholeWord(_ range: Range<String.Index>, in text: String) -> Bool {
        let isWord = { (character: Character) in character.isLetter || character.isNumber }
        if range.lowerBound > text.startIndex {
            let before = text[text.index(before: range.lowerBound)]
            if isWord(before) { return false }
        }
        if range.upperBound < text.endIndex, isWord(text[range.upperBound]) { return false }
        return true
    }

    /// This concept's typed relationships, at most five, as the web shows them.
    func relationships(for conceptId: String) -> [(relation: ConceptRelation, outgoing: Bool, other: String)] {
        relations
            .filter { $0.sourceId == conceptId || $0.targetId == conceptId }
            .prefix(5)
            .map { relation in
                let outgoing = relation.sourceId == conceptId
                let otherId = outgoing ? relation.targetId : relation.sourceId
                return (relation, outgoing, concept(id: otherId)?.label ?? otherId)
            }
    }

    /// `related_concepts` is a database value, not something to show a student.
    static func humanRelation(_ type: String) -> String {
        let words = type.replacingOccurrences(of: "_", with: " ")
            .replacingOccurrences(of: "-", with: " ")
            .trimmed
        guard let first = words.first else { return "Related" }
        return first.uppercased() + words.dropFirst()
    }
}
