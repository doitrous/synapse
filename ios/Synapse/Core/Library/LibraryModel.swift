import Foundation
import Observation

/// A chapter of the library: articles filed under one heading within a subject.
struct LibraryChapter: Identifiable, Equatable, Sendable {
    let id: String
    let title: String
    let subjectId: String
    var articles: [Article]
}

/// The library as a student sees it right now.
///
/// Reads the cache, never the network. `SyncEngine` keeps the cache current;
/// this turns it into something readable. That split is why the library opens
/// instantly and works with no signal.
@MainActor
@Observable
final class LibraryModel {

    private(set) var chapters: [LibraryChapter] = []
    private(set) var isLoading = true
    /// Set when the catalogue is empty, explaining which of the several
    /// reasons applies — a blank screen tells a student nothing.
    private(set) var emptyReason: String?

    /// Every readable article, by ID, for the taxonomy views.
    private(set) var articlesById: [String: Article] = [:]
    /// The medical taxonomy, indexed for browsing.
    private(set) var atlas = LibraryAtlas.empty
    /// The published evidence, kept so a fact can show where it came from.
    private(set) var evidence = EvidenceStore.empty

    private let store: LocalStore
    /// The student's cohort, which decides what is in scope. Nil until the
    /// audience is known, which means "show everything unrestricted".
    var audience: StudentAudience

    init(store: LocalStore, audience: StudentAudience = .unknown) {
        self.store = store
        self.audience = audience
    }

    /// The source document behind a citation, when this student has it.
    ///
    /// Built from the evidence store rather than the resource catalogue: the
    /// evidence store is the register of source documents and is what knows
    /// which of them have bytes behind them.
    func resource(_ id: String) -> LibraryResource? {
        guard let file = evidence.resourceFiles[id] else { return nil }
        return LibraryResource(
            id: id,
            title: file.title,
            type: .book,
            subjectId: "",
            source: "",
            meta: "",
            year: nil,
            chapters: [],
            hasFile: true,
            file: file
        )
    }

    /// Search the library through the cache's own full-text index.
    ///
    /// The index has been built, kept and migrated since the first week with
    /// nothing calling it: search was a `contains` scan over titles and
    /// summaries held in memory. Going through the index adds the article's
    /// own words, its aliases, its Arabic title and its key points, and orders
    /// hits by relevance rather than alphabetically — so a term discussed at
    /// length in the text can be found at all, which is precisely the search a
    /// student runs when they half-remember something.
    ///
    /// The projection still decides what may be shown: the index is a way of
    /// finding ids quickly, not a second opinion about what is in scope.
    func search(_ query: String) async -> [Article] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard trimmed.count >= 2 else { return [] }

        guard let hits = try? await store.search(trimmed, kind: .article, audience: audience) else {
            // A broken index must not mean a broken search box.
            return fallbackSearch(trimmed)
        }

        let found = hits.compactMap { articlesById[$0.id] }
        return found.isEmpty ? fallbackSearch(trimmed) : found
    }

    /// Titles and summaries only, for when the index cannot answer.
    private func fallbackSearch(_ trimmed: String) -> [Article] {
        articlesById.values
            .filter {
                $0.title.localizedCaseInsensitiveContains(trimmed)
                    || $0.summary.localizedCaseInsensitiveContains(trimmed)
            }
            .sorted { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }
    }

    func load() async {
        isLoading = true
        defer { isLoading = false }

        do {
            let items = try await store.items(kind: .article, audience: audience)
            let evidence = EvidenceStore.decode(try await decodedCatalogue(SyncEngine.evidenceKey))
            self.evidence = evidence
            let concepts = ConceptIndex.decode(try await decodedCatalogue(SyncEngine.conceptGraphKey))

            // Related reading may only point at an article this projection will
            // render, so the same filtered set decides both what exists and
            // what may be linked.
            let readableTitles = Dictionary(items.map { ($0.id, $0.title) }, uniquingKeysWith: { first, _ in first })

            var articles = items.compactMap {
                ArticleProjection.project(item: $0, evidence: evidence, concepts: concepts, readableTitles: readableTitles)
            }

            // The link exists in one direction — a question records which
            // articles it tests — so it has to be read backwards. Without this
            // every article advertises "0 questions" however many point at it.
            let byArticle = try await questionsByArticle()
            for index in articles.indices {
                articles[index].linkedQuestionIds = byArticle[articles[index].id] ?? []
            }

            chapters = group(articles)
            articlesById = Dictionary(articles.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })

            // Where each article sits in the medical taxonomy. Primary and
            // secondary placements both count: an article on the cardiovascular
            // system may also belong under pharmacology, and a student browsing
            // by discipline should find it there.
            //
            // Read from the placements the projection already parsed, rather
            // than deserialising all 162 records a second time. Parsing a 5 MB
            // catalogue twice per load is the kind of cost that only shows up
            // on an old phone, which is most of them.
            var placements: [String: [String]] = [:]
            for article in articles where !article.taxonomyNodeIds.isEmpty {
                placements[article.id] = article.taxonomyNodeIds
            }

            atlas = LibraryAtlas.build(
                taxonomy: try await decodedCatalogue(SyncEngine.medicalTaxonomyKey),
                articles: articles,
                placements: placements
            )

            emptyReason = chapters.isEmpty ? await describeEmptiness(articleCount: items.count) : nil
        } catch {
            chapters = []
            emptyReason = "The library could not be opened on this device."
        }
    }

    /// Group into chapters, as the web app does: by subject, then by the
    /// chapter recorded on each article.
    private func group(_ articles: [Article]) -> [LibraryChapter] {
        var chapters: [String: LibraryChapter] = [:]
        var order: [String] = []

        for article in articles {
            let key = "\(article.subjectId)::\(article.chapter.lowercased())"
            if chapters[key] == nil {
                chapters[key] = LibraryChapter(
                    id: key, title: article.chapter, subjectId: article.subjectId, articles: []
                )
                order.append(key)
            }
            chapters[key]?.articles.append(article)
        }

        return order.compactMap { chapters[$0] }.map { chapter in
            var sorted = chapter
            sorted.articles.sort { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }
            return sorted
        }
    }

    /// Which published questions name each article.
    private func questionsByArticle() async throws -> [String: [String]] {
        let questions = try await store.items(kind: .question, audience: audience)
        var byArticle: [String: [String]] = [:]

        for question in questions {
            guard
                let record = try? JSONSerialization.jsonObject(with: question.raw) as? [String: Any],
                let data = record["questionData"] as? [String: Any],
                let libraryIds = data["libraryIds"] as? [String]
            else { continue }
            for articleId in libraryIds {
                byArticle[articleId, default: []].append(question.id)
            }
        }
        return byArticle
    }

    /// Say which kind of empty this is.
    ///
    /// "Nothing has synced yet", "your year has no articles" and "nothing is
    /// published" are three different situations with three different things to
    /// do about them, and a blank page distinguishes none of them.
    private func describeEmptiness(articleCount: Int) async -> String {
        let total = (try? await store.itemCount(kind: .article)) ?? 0

        if total == 0 {
            let synced = (try? await store.catalogueVersions().isEmpty) ?? true
            return synced
                ? "Nothing has downloaded yet. Pull to refresh once you have a connection."
                : "No articles have been published yet."
        }
        if articleCount == 0 {
            return "No articles are published for your university and year yet."
        }
        return "No articles to show."
    }

    private func decodedCatalogue(_ key: String) async throws -> Any? {
        guard let document = try await store.catalogue(key: key) else { return nil }
        return try? JSONSerialization.jsonObject(with: document)
    }
}
