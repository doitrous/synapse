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
    /// Where this sits in the medical taxonomy — its primary placement first,
    /// then any secondary ones. Carried on the article so the atlas can be
    /// built without parsing every record a second time.
    let taxonomyNodeIds: [String]
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
    /// The citations themselves, for showing a fact's sources.
    ///
    /// Only their ids were kept before, which is all the publication gate
    /// needs — but a student asking "where does this come from" needs the
    /// document, the page and the sentence it rests on.
    var citations: [String: Citation] = [:]
    /// Claim verification, by id.
    var claims: [String: Claim] = [:]
    var spansById: [String: ArticleSpan] = [:]
    /// Spans grouped by `articleId|sectionId`, for the derived lookup.
    var spansBySection: [String: [ArticleSpan]] = [:]
    var resourceTitles: [String: String] = [:]
    /// Resources that have a file behind them, by ID.
    ///
    /// The evidence store is the register of source documents, so it — not the
    /// ledger's resource items — is what knows whether a PDF exists. Of 47
    /// catalogued resources only 15 carry one.
    var resourceFiles: [String: ResourceFile] = [:]

    struct ResourceFile: Equatable, Sendable {
        let id: String
        let title: String
        let mediaType: String
        let pageCount: Int?
        /// An external link instead of a stored file, when the source is hosted
        /// elsewhere. The server redirects to it.
        let sourceUri: String?
        var isPDF: Bool { mediaType.lowercased() == "pdf" }
    }

    /// One exact source for a statement.
    struct Citation: Equatable, Identifiable, Sendable {
        let id: String
        let resourceId: String
        /// The page in the source document, when the citation names one.
        let page: Int?
        /// A locator that is not a page — a section, a figure, a timestamp.
        let locatorLabel: String?
        /// The sentence in the source that supports the statement.
        let supportSpan: String?
        /// Whether this is evidence for the claim itself or context for the
        /// article. The web draws the distinction and so does this.
        let countsAsClaimEvidence: Bool

        /// What to show as the place: a page if there is one, otherwise
        /// whatever locator the citation carries.
        var placeLabel: String? {
            if let page { return "Page \(page)" }
            return locatorLabel
        }
    }

    struct Claim: Equatable, Sendable {
        let id: String
        /// `verified`, `needs_review`, and the rest as authored.
        let verificationStatus: String

        var isVerified: Bool { verificationStatus == "verified" }
        /// As authored, but readable: `needs_review` is not a phrase.
        var label: String { verificationStatus.replacingOccurrences(of: "_", with: " ") }
    }

    struct ArticleSpan: Equatable, Identifiable, Sendable {
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
            guard let id = claim["id"] as? String else { continue }
            store.claimIds.insert(id)
            store.claims[id] = Claim(
                id: id,
                verificationStatus: claim["verificationStatus"] as? String ?? "unverified"
            )
        }
        for citation in root["citations"] as? [[String: Any]] ?? [] {
            guard let id = citation["id"] as? String else { continue }
            store.citationIds.insert(id)

            // The locator is either an object with a page, or a bare string
            // naming somewhere else in the document.
            var page: Int?
            var locatorLabel: String?
            if let locator = citation["locator"] as? [String: Any] {
                page = locator["page"] as? Int
                locatorLabel = (locator["label"] as? String)?.nilIfEmpty
                    ?? (locator["section"] as? String)?.nilIfEmpty
            } else if let locator = (citation["locator"] as? String)?.nilIfEmpty {
                locatorLabel = locator
            }

            store.citations[id] = Citation(
                id: id,
                resourceId: citation["resourceId"] as? String ?? "",
                page: page,
                locatorLabel: locatorLabel,
                supportSpan: (citation["supportSpan"] as? String)?.nilIfEmpty,
                countsAsClaimEvidence: citation["countsAsClaimEvidence"] as? Bool ?? true
            )
        }
        for resource in root["resources"] as? [[String: Any]] ?? [] {
            guard let id = resource["id"] as? String else { continue }
            let title = resource["title"] as? String ?? id
            store.resourceTitles[id] = title

            // A resource is openable if it has bytes stored or a source to
            // redirect to. Everything else is catalogued but not yet uploaded.
            let storageKey = (resource["storageKey"] as? String)?.nilIfEmpty
            let sourceUri = (resource["sourceUri"] as? String)?.nilIfEmpty
            guard storageKey != nil || sourceUri != nil else { continue }

            store.resourceFiles[id] = ResourceFile(
                id: id,
                title: title,
                mediaType: resource["mediaType"] as? String ?? "pdf",
                pageCount: resource["pageCount"] as? Int,
                sourceUri: sourceUri
            )
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
