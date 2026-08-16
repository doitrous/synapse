import Foundation

/// One piece of a rendered article.
///
/// Mirrors `LibBlock` in `src/data/library.ts`. `fact` is a verified statement
/// carrying its evidence chain; `sources` is the header that introduces them at
/// the end of the article.
enum ArticleBlock: Equatable, Identifiable, Sendable {
    case heading(String)
    case paragraph(String)
    case callout(title: String, text: String)
    case fact(text: String, spanId: String?)
    case sourcesHeader(count: Int)

    var id: String {
        switch self {
        case .heading(let text): "h:\(text)"
        case .paragraph(let text): "p:\(text.prefix(64))"
        case .callout(let title, let text): "c:\(title):\(text.prefix(48))"
        case .fact(let text, let spanId): "f:\(spanId ?? text.prefix(48).description)"
        case .sourcesHeader(let count): "s:\(count)"
        }
    }
}

/// A link to another article the student can actually open.
struct RelatedArticle: Equatable, Identifiable, Sendable {
    let id: String
    let title: String
    let reason: String?
}

/// An article as a student reads it.
///
/// Mirrors the student-facing half of `Subtopic` in `src/data/library.ts`.
struct Article: Equatable, Identifiable, Sendable {
    let id: String
    let title: String
    let subjectId: String
    /// The chapter this article was filed under, from `fields.Topic`.
    let chapter: String
    let readingMinutes: Int
    let summary: String
    let blocks: [ArticleBlock]
    /// "Hold these" — reviewed teaching points.
    let keyPoints: [String]
    /// "Where people lose the mark".
    let traps: [String]
    let relatedArticles: [RelatedArticle]
    /// Published questions that name this article.
    var linkedQuestionIds: [String]
}

/// The published evidence store, `synapse-medical-evidence-published-v1`.
///
/// Only the parts the gate consults are modelled: what exists here is what
/// makes a statement publishable.
struct EvidenceStore: Sendable {
    var claimIds: Set<String> = []
    var citationIds: Set<String> = []
    var spansById: [String: ArticleSpan] = [:]
    /// Spans grouped by `articleId|sectionId`, for the derived lookup.
    var spansBySection: [String: [ArticleSpan]] = [:]
    var resourceTitles: [String: String] = [:]

    struct ArticleSpan: Equatable, Sendable {
        let id: String
        let articleId: String
        let sectionId: String
        let text: String?
        let claimIds: [String]
        let citationIds: [String]
    }

    static let empty = EvidenceStore()

    static func decode(_ json: Any?) -> EvidenceStore {
        guard let root = json as? [String: Any] else { return .empty }
        var store = EvidenceStore()

        for claim in root["claims"] as? [[String: Any]] ?? [] {
            if let id = claim["id"] as? String { store.claimIds.insert(id) }
        }
        for citation in root["citations"] as? [[String: Any]] ?? [] {
            if let id = citation["id"] as? String { store.citationIds.insert(id) }
        }
        for resource in root["resources"] as? [[String: Any]] ?? [] {
            if let id = resource["id"] as? String {
                store.resourceTitles[id] = resource["title"] as? String ?? id
            }
        }
        for raw in root["articleSpans"] as? [[String: Any]] ?? [] {
            guard
                let id = raw["id"] as? String,
                let articleId = raw["articleId"] as? String,
                let sectionId = raw["sectionId"] as? String
            else { continue }
            let span = ArticleSpan(
                id: id, articleId: articleId, sectionId: sectionId,
                text: raw["text"] as? String,
                claimIds: raw["claimIds"] as? [String] ?? [],
                citationIds: raw["citationIds"] as? [String] ?? []
            )
            store.spansById[id] = span
            store.spansBySection["\(articleId)|\(sectionId)", default: []].append(span)
        }
        return store
    }
}

/// Published concepts, from `synapse-concept-graph-v2`.
struct ConceptIndex: Sendable {
    /// Label by concept ID, for published concepts only.
    var publishedLabels: [String: String] = [:]

    static let empty = ConceptIndex()

    static func decode(_ json: Any?) -> ConceptIndex {
        guard let root = json as? [String: Any] else { return .empty }
        var index = ConceptIndex()
        for concept in root["concepts"] as? [[String: Any]] ?? [] {
            guard
                let id = concept["id"] as? String,
                let label = concept["label"] as? String,
                concept["publicationStatus"] as? String == "published"
            else { continue }
            index.publishedLabels[id] = label
        }
        return index
    }
}
