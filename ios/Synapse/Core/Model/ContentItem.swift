import Foundation

/// The four kinds of thing an admin authors.
///
/// Mirrors `ContentKind` in `src/data/contentControl.ts`. Everything a student
/// reads is one of these, which is what lets the app render new content without
/// a new release: the app ships four renderers, not a screen per article.
enum ContentKind: String, Codable, CaseIterable, Sendable {
    case question, article, practical, resource
}

/// Where an item is in its editorial life.
///
/// Mirrors `Status` in `src/data/admin.ts`. Only `published` is student-visible
/// in live mode — see `LedgerItem.isStudentVisible`.
enum ContentStatus: String, Codable, Sendable {
    case published = "Published"
    case draft = "Draft"
    case inReview = "In review"
    case archived = "Archived"
}

/// One row of the content ledger (`synapse-admin-content-ledger-v4`).
///
/// Only the fields the app indexes or filters on are modelled. The rest of the
/// record — the authoring blocks, which are large and still growing — is kept
/// as raw JSON in `raw` and decoded on demand by whichever screen needs it.
///
/// That is deliberate. The authoring types in `src/data/contentControl.ts` gain
/// fields as the content pipeline matures, and a Swift mirror of all of them
/// would need a migration and a full re-sync every time one appeared. Storing
/// the bytes means a new field costs a decode, not a release.
struct LedgerItem: Codable, Identifiable, Sendable {
    let id: String
    let kind: ContentKind
    let title: String
    let subjectId: String
    let status: ContentStatus
    let updatedAt: String?

    /// The complete original record, kept verbatim.
    let raw: Data

    /// Universities this item is restricted to. Empty means unrestricted.
    let universityIds: [String]
    /// Year IDs this item is restricted to. Empty means unrestricted.
    let yearIds: [String]

    /// What the Library and Question Bank search over.
    let searchText: String
}

extension LedgerItem {

    /// Whether a student may see this at all.
    ///
    /// Matches `useLiveLibrary.ts:26`, which in live mode keeps only
    /// `Published` — a draft or an in-review item is editorial work, not
    /// study material.
    var isStudentVisible: Bool { status == .published }

    /// Whether this item is meant for a given cohort.
    ///
    /// Delegates to `ScopeMatch`, which compares what the tags *mean* rather
    /// than how they are spelled — the authored data uses `kau_y3`, `KAU_Y3`
    /// and `Year 3` for the same cohort, and a literal comparison would hide
    /// most of the catalogue. "Empty means unrestricted" still holds: an item
    /// with no universities listed applies to everyone rather than to nobody.
    func inScope(_ audience: StudentAudience) -> Bool {
        ScopeMatch.matches(universityIds: universityIds, yearIds: yearIds, audience: audience)
    }
}

// MARK: - Decoding the ledger

/// Reads the ledger document into `LedgerItem`s.
///
/// Written against the raw JSON rather than a generated `Codable` mirror,
/// because the scope fields live in different places depending on the kind —
/// see `itemScope` in `src/data/contentControl.ts`, which this reproduces:
///
/// - a question keeps them under `questionData.tags`, and names the year field
///   `years`;
/// - an article or resource keeps them at the top of its own block, and names
///   the year field `yearIds`.
///
/// Getting that wrong does not throw. It silently scopes every question to
/// nobody, and the question bank comes up empty for a reason no error explains.
enum LedgerDecoder {

    /// Items that could not be read are skipped rather than failing the batch.
    /// One malformed record authored upstream must not cost a student their
    /// whole library.
    static func decode(_ json: Any) -> (items: [LedgerItem], skipped: Int) {
        guard let array = json as? [[String: Any]] else { return ([], 0) }

        var items: [LedgerItem] = []
        var skipped = 0

        for record in array {
            if let item = decodeOne(record) {
                items.append(item)
            } else {
                skipped += 1
            }
        }
        return (items, skipped)
    }

    private static func decodeOne(_ record: [String: Any]) -> LedgerItem? {
        guard
            let id = record["id"] as? String,
            let kindRaw = record["kind"] as? String,
            let kind = ContentKind(rawValue: kindRaw),
            let statusRaw = record["status"] as? String,
            let status = ContentStatus(rawValue: statusRaw),
            let raw = try? JSONSerialization.data(withJSONObject: record)
        else { return nil }

        let scope = scopeOf(record)

        return LedgerItem(
            id: id,
            kind: kind,
            title: record["title"] as? String ?? "",
            subjectId: record["subjectId"] as? String ?? "",
            status: status,
            updatedAt: record["updatedAt"] as? String,
            raw: raw,
            universityIds: scope.universityIds,
            yearIds: scope.yearIds,
            searchText: searchText(record)
        )
    }

    /// Reproduces `itemScope`.
    private static func scopeOf(_ record: [String: Any]) -> (universityIds: [String], yearIds: [String]) {
        let questionTags = (record["questionData"] as? [String: Any])?["tags"] as? [String: Any]
        let block = (record["articleData"] as? [String: Any]) ?? (record["resourceData"] as? [String: Any])

        let universities = questionTags?["universityIds"] as? [String]
            ?? block?["universityIds"] as? [String]
            ?? []
        // Note the asymmetry: `years` on a question, `yearIds` on an article or
        // resource. This is the shape the authoring pipeline writes.
        let years = questionTags?["years"] as? [String]
            ?? block?["yearIds"] as? [String]
            ?? []

        return (universities, years)
    }

    /// What the student can find this item by.
    ///
    /// Title first, then the summary and the visible prose. Deliberately not
    /// the whole record — indexing every governance and provenance field would
    /// make searches match on reviewer names and internal notes.
    private static func searchText(_ record: [String: Any]) -> String {
        var parts: [String] = []
        if let title = record["title"] as? String { parts.append(title) }

        if let article = record["articleData"] as? [String: Any] {
            if let arabicTitle = article["arabicTitle"] as? String { parts.append(arabicTitle) }
            if let summary = article["publishedSummary"] as? String ?? article["summary"] as? String {
                parts.append(summary)
            }
            if let aliases = article["aliases"] as? [String] { parts.append(contentsOf: aliases) }
            if let holds = article["holdThese"] as? [String] { parts.append(contentsOf: holds) }

            // The article's own words.
            //
            // Without these the index held titles, summaries and key points
            // only — so a term discussed at length in the text but never named
            // in a heading could not be found at all, which is precisely the
            // search a student runs when they half-remember something.
            let sections = (article["publishedSections"] as? [[String: Any]])
                ?? (article["sections"] as? [[String: Any]])
                ?? []
            for section in sections {
                for key in ["heading", "body", "narrative"] {
                    if let text = section[key] as? String, !text.isEmpty { parts.append(text) }
                }
            }
        }

        if let question = record["questionData"] as? [String: Any] {
            for key in ["vignette", "stem", "explanation"] {
                if let text = question[key] as? String { parts.append(text) }
            }
        }

        return parts.joined(separator: " ")
    }
}
