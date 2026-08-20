import SwiftUI

/// The library.
///
/// It opens by asking how the student wants to come at it, as the website does,
/// because "the library" is not one shelf: the same article sits under an organ
/// system, a discipline, a clinical skill and a curriculum module, and which of
/// those a student wants depends entirely on what they sat down to do.
struct LibraryView: View {
    @State private var model: LibraryModel
    @State private var library: UserLibrary
    @State private var files: ResourceFileStore
    /// A source a citation asked to open, and the page it named.
    @State private var openingSource: SourceRequest?

    /// Where a citation's "open at this page" ends up.
    private var openSource: (String, Int?) -> Void {
        { resourceId, page in openingSource = .init(resourceId: resourceId, page: page) }
    }
    let sync: SyncEngine
    let api: SynapseAPI

    /// A document a citation pointed at.
    struct SourceRequest: Identifiable, Equatable {
        let resourceId: String
        let page: Int?
        var id: String { "\(resourceId)#\(page ?? 0)" }
    }

    @State private var view: LibraryView.Mode = .home
    @State private var query = ""

    enum Mode: Equatable {
        case home
        case browsing(LibraryViewKind)
    }

    init(store: LocalStore, sync: SyncEngine, api: SynapseAPI, audience: StudentAudience) {
        _model = State(wrappedValue: LibraryModel(store: store, audience: audience))
        _library = State(wrappedValue: UserLibrary(api: api, sync: sync))
        _files = State(wrappedValue: ResourceFileStore(api: api))
        self.sync = sync
        self.api = api
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().tint(Theme.primary)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if let reason = model.emptyReason {
                    EmptyStateView(symbol: "books.vertical", title: "Nothing to read yet", detail: reason)
                } else {
                    // Pinned with safeAreaInset rather than stacked above the
                    // content: a plain VStack row above a List ends up
                    // competing with the navigation bar's own layout, and the
                    // row silently loses.
                    content
                        .safeAreaInset(edge: .top, spacing: 0) {
                            ViewTabs(selection: $view)
                        }
                }
            }
            .background(Theme.paper)
            .navigationTitle("Library")
            .navigationBarTitleDisplayMode(.large)
        }
        .searchable(text: $query, prompt: "Search the library")
        .task {
            await model.load()
            await library.load()
        }
        // A citation named a document and a page; this is where the student
        // lands on it.
        .sheet(item: $openingSource) { request in
            if let resource = model.resource(request.resourceId) {
                NavigationStack {
                    ResourceReaderView(
                        resource: resource, files: files, api: api, sync: sync,
                        openAt: request.page
                    )
                }
            } else {
                EmptyStateView(
                    symbol: "doc.questionmark",
                    title: "That source is not here",
                    detail: "The document this fact cites has not been uploaded to your library yet."
                )
            }
        }
        // The first sync usually finishes after this screen has already loaded
        // an empty cache. Without this the student is told there is nothing to
        // read while the content sits downloaded behind it.
        .onChange(of: sync.status) { _, status in
            if case .done = status { Task { await model.load() } }
        }
        .refreshable {
            await sync.refresh()
            await model.load()
        }
    }

    @ViewBuilder
    private var content: some View {
        if !query.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            // A search cuts across every view — a student who knows the word
            // does not want to pick a shelf first.
            SearchResults(openSource: openSource, model: model, query: query, library: library)
        } else {
            switch view {
            case .home:
                StudyChooser(model: model) { kind in view = .browsing(kind) }
            case .browsing(let kind):
                if kind == .curriculum {
                    ChapterList(openSource: openSource, model: model, library: library, chapters: model.chapters)
                } else if let division = kind.division {
                    DivisionBrowser(openSource: openSource, library: library, model: model, division: division, title: kind.label)
                }
            }
        }
    }
}

/// The five ways in, plus the way back to the chooser.
private struct ViewTabs: View {
    @Binding var selection: LibraryView.Mode

    /// Laid out directly rather than in a horizontal ScrollView.
    ///
    /// A `ScrollView(.horizontal)` here drew its background and border but
    /// never its row, stacked or pinned. Six chips fit the narrowest supported
    /// width without scrolling, so the scroll view was buying nothing and
    /// costing the whole control.
    var body: some View {
        HStack(spacing: 4) {
            chip(label: nil, symbol: "square.grid.2x2", isSelected: selection == .home) {
                selection = .home
            }
            ForEach(LibraryViewKind.allCases) { kind in
                chip(label: kind.shortLabel, symbol: nil, isSelected: selection == .browsing(kind)) {
                    selection = .browsing(kind)
                }
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .frame(maxWidth: .infinity)
        .background(Theme.paper)
        .overlay(alignment: .bottom) { Rectangle().fill(Theme.line).frame(height: 1) }
    }

    private func chip(label: String?, symbol: String?, isSelected: Bool, tap: @escaping () -> Void) -> some View {
        Button(action: tap) {
            Group {
                if let symbol {
                    Image(systemName: symbol).font(.system(size: 12))
                } else if let label {
                    Text(label)
                        .font(Theme.ui(12, weight: isSelected ? 600 : 500))
                        .lineLimit(1)
                        .minimumScaleFactor(0.85)
                }
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 7)
            .background(isSelected ? Theme.primaryTint : Color.clear)
            .foregroundStyle(isSelected ? Theme.primaryStrong : Theme.ink2)
            .clipShape(Capsule())
        }
        .buttonStyle(.plain)
    }
}

/// "How do you want to study?" — the landing.
private struct StudyChooser: View {
    let model: LibraryModel
    let choose: (LibraryViewKind) -> Void

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("How do you want to study?")
                        .font(Theme.display(24))
                        .foregroundStyle(Theme.ink)
                    Text("Reviewed articles across the whole curriculum, each carrying the concepts it teaches and the questions that test it. Find it by organ system, by discipline, by clinical skill, by condition, or straight from your own timetable.")
                        .font(Theme.ui(14))
                        .foregroundStyle(Theme.ink2)
                        .lineSpacing(3)
                }
                .padding(.top, 8)

                ForEach(LibraryViewKind.allCases) { kind in
                    Button { choose(kind) } label: {
                        HStack(alignment: .top, spacing: 14) {
                            Image(systemName: kind.symbol)
                                .font(.system(size: 18))
                                .foregroundStyle(Theme.primary)
                                .frame(width: 26)

                            VStack(alignment: .leading, spacing: 4) {
                                Text(kind.label)
                                    .font(Theme.display(18))
                                    .foregroundStyle(Theme.ink)
                                Text(kind.detail)
                                    .font(Theme.ui(12.5))
                                    .foregroundStyle(Theme.ink3)
                                    .lineSpacing(2)
                                    .fixedSize(horizontal: false, vertical: true)
                                Text(count(kind))
                                    .font(Theme.numeric(11))
                                    .foregroundStyle(Theme.ink3)
                                    .padding(.top, 2)
                            }
                            .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        .padding(16)
                        .background(Theme.surface)
                        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
                    }
                    .buttonStyle(.plain)
                }
            }
            .padding(16)
        }
        .background(Theme.paper)
    }

    /// What is actually behind each door. A card promising a shelf that turns
    /// out to be empty is worse than one that says so first.
    private func count(_ kind: LibraryViewKind) -> String {
        if kind == .curriculum {
            let total = model.chapters.reduce(0) { $0 + $1.articles.count }
            return "\(total) article\(total == 1 ? "" : "s")"
        }
        guard let division = kind.division else { return "" }
        let unique = model.atlas.divisionCount(division)
        return unique == 0 ? "Nothing placed here yet" : "\(unique) article\(unique == 1 ? "" : "s")"
    }
}

/// Browsing one division of the taxonomy, a level at a time.
private struct DivisionBrowser: View {
    /// Passed down so a citation deep in an article can still open its source.
    var openSource: ((String, Int?) -> Void)?
    var library: UserLibrary?
    let model: LibraryModel
    let division: String
    let title: String

    var body: some View {
        let roots = model.atlas.roots(in: division).filter { model.atlas.hasArticles(under: $0.id) }

        if roots.isEmpty {
            EmptyStateView(
                symbol: "tray",
                title: "Nothing here yet",
                detail: "No reviewed articles have been placed under \(title) yet."
            )
        } else {
            List(roots) { node in
                NavigationLink {
                    BranchView(openSource: openSource, model: model, library: library, node: node)
                } label: {
                    BranchRow(model: model, node: node)
                }
                .listRowBackground(Theme.surface)
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
        }
    }
}

/// One branch: its sub-branches, then the articles sitting on it.
private struct BranchView: View {
    /// Passed down so a citation deep in an article can still open its source.
    var openSource: ((String, Int?) -> Void)?
    let model: LibraryModel
    var library: UserLibrary?
    let node: TaxonomyNode

    var body: some View {
        let children = model.atlas.children(of: node.id).filter { model.atlas.hasArticles(under: $0.id) }
        let direct = (model.atlas.articlesOn[node.id] ?? []).compactMap { model.articlesById[$0] }
            .sorted { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }

        List {
            if !children.isEmpty {
                Section {
                    ForEach(children) { child in
                        NavigationLink {
                            BranchView(openSource: openSource, model: model, library: library, node: child)
                        } label: {
                            BranchRow(model: model, node: child)
                        }
                        .listRowBackground(Theme.surface)
                    }
                }
            }
            if !direct.isEmpty {
                Section {
                    ForEach(direct) { article in
                        NavigationLink {
                            ArticleReaderView(
                                article: article, library: library,
                                lookup: { model.articlesById[$0] },
                                evidence: model.evidence,
                                openSource: openSource,
                                concepts: model.concepts
                            )
                        } label: {
                            ArticleRow(article: article, library: library)
                        }
                        .listRowBackground(Theme.surface)
                    }
                } header: {
                    Text("Articles")
                        .font(Theme.panelTitle())
                        .foregroundStyle(Theme.ink2)
                        .textCase(nil)
                }
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .navigationTitle(node.title)
        .navigationBarTitleDisplayMode(.inline)
    }
}

private struct BranchRow: View {
    let model: LibraryModel
    let node: TaxonomyNode

    var body: some View {
        let count = model.atlas.articleCount(under: node.id)
        return VStack(alignment: .leading, spacing: 3) {
            Text(node.title)
                .font(Theme.ui(16, weight: 500))
                .foregroundStyle(Theme.ink)
            Text("\(count) article\(count == 1 ? "" : "s")")
                .font(Theme.numeric(11))
                .foregroundStyle(Theme.ink3)
        }
        .padding(.vertical, 2)
    }
}

/// The flat chapter list, used by My Curriculum.
private struct ChapterList: View {
    /// Passed down so a citation deep in an article can still open its source.
    var openSource: ((String, Int?) -> Void)?
    var model: LibraryModel?
    var library: UserLibrary?
    let chapters: [LibraryChapter]

    var body: some View {
        List {
            ForEach(chapters) { chapter in
                Section {
                    ForEach(chapter.articles) { article in
                        NavigationLink {
                            ArticleReaderView(
                                article: article, library: library,
                                lookup: { model?.articlesById[$0] },
                                evidence: model?.evidence ?? .empty,
                                openSource: openSource,
                                concepts: model?.concepts ?? ConceptTerms()
                            )
                        } label: {
                            ArticleRow(article: article, library: library)
                        }
                        .listRowBackground(Theme.surface)
                    }
                } header: {
                    Text(chapter.title)
                        .font(Theme.panelTitle())
                        .foregroundStyle(Theme.ink2)
                        .textCase(nil)
                }
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
    }
}

private struct SearchResults: View {
    /// Passed down so a citation deep in an article can still open its source.
    var openSource: ((String, Int?) -> Void)?
    let model: LibraryModel
    let query: String
    var library: UserLibrary?

    @State private var matches: [Article] = []

    var body: some View {
        Group {
            if matches.isEmpty {
                ContentUnavailableView.search(text: query)
            } else {
                results
            }
        }
        // Through the cache's index rather than a scan in memory, so the body
        // of an article is searched and not only its title.
        .task(id: query) { matches = await model.search(query) }
    }

    private var results: some View {
        Group {
            List(matches) { article in
                NavigationLink {
                    ArticleReaderView(
                        article: article, library: library,
                        lookup: { model.articlesById[$0] },
                        evidence: model.evidence,
                        openSource: openSource,
                        concepts: model.concepts
                    )
                } label: {
                    ArticleRow(article: article, library: library)
                }
                .listRowBackground(Theme.surface)
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
        }
    }
}

struct ArticleRow: View {
    let article: Article
    var library: UserLibrary?

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(article.title)
                .font(Theme.ui(16, weight: 500))
                .foregroundStyle(Theme.ink)

            if !article.summary.isEmpty {
                Text(article.summary)
                    .font(Theme.ui(14))
                    .foregroundStyle(Theme.ink2)
                    .lineLimit(2)
            }

            HStack(spacing: 10) {
                Label("\(article.readingMinutes) min", systemImage: "clock")
                if !article.linkedQuestionIds.isEmpty {
                    Label("\(article.linkedQuestionIds.count)", systemImage: "questionmark.circle")
                }
                if library?.hasRead(article.id) == true {
                    Label("Read", systemImage: "checkmark.circle.fill")
                        .foregroundStyle(Theme.success)
                }
                ForEach(library?.tags(on: article.id) ?? [], id: \.self) { tag in
                    Text(tag)
                        .font(Theme.ui(10))
                        .foregroundStyle(Theme.ink2)
                        .padding(.horizontal, 5)
                        .padding(.vertical, 1)
                        .background(Theme.inset, in: Capsule())
                }
            }
            .font(Theme.numeric(11))
            .foregroundStyle(Theme.ink3)
            .labelStyle(.titleAndIcon)
        }
        .padding(.vertical, 4)
    }
}
