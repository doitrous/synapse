import SwiftUI

/// Browse the library: chapters, then articles, then the reader.
///
/// A phone gets a list and a push rather than the web app's three columns —
/// a taxonomy rail beside an article list beside a reader has nowhere to go at
/// this width, and stacking them would make every one of them cramped.
struct LibraryView: View {
    @State private var model: LibraryModel
    let sync: SyncEngine

    @State private var query = ""

    init(store: LocalStore, sync: SyncEngine, universityId: String?, yearId: String?) {
        _model = State(wrappedValue: LibraryModel(store: store, universityId: universityId, yearId: yearId))
        self.sync = sync
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().tint(Theme.accent)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if let reason = model.emptyReason {
                    EmptyLibraryView(reason: reason)
                } else {
                    chapterList
                }
            }
            .background(Theme.paper)
            .navigationTitle("Library")
            .navigationBarTitleDisplayMode(.large)
        }
        .searchable(text: $query, prompt: "Search the library")
        .task { await model.load() }
        // The first sync usually finishes after this screen has already loaded
        // an empty cache. Without this the student is told there is nothing to
        // read while the content sits downloaded behind it, until they happen
        // to switch tabs.
        .onChange(of: sync.status) { _, status in
            if case .done = status { Task { await model.load() } }
        }
        .refreshable {
            await sync.refresh()
            await model.load()
        }
    }

    private var chapterList: some View {
        List {
            ForEach(filteredChapters) { chapter in
                Section {
                    ForEach(chapter.articles) { article in
                        NavigationLink {
                            ArticleReaderView(article: article)
                        } label: {
                            ArticleRow(article: article)
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
        .overlay {
            if filteredChapters.isEmpty, !query.isEmpty {
                ContentUnavailableView.search(text: query)
            }
        }
    }

    /// Filtering here rather than in SQLite: the catalogue is already in memory
    /// and this keeps the search instant as the student types. Full-text search
    /// across the whole corpus is the Question Bank's job.
    private var filteredChapters: [LibraryChapter] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return model.chapters }

        return model.chapters.compactMap { chapter in
            let matches = chapter.articles.filter {
                $0.title.localizedCaseInsensitiveContains(trimmed)
                    || $0.summary.localizedCaseInsensitiveContains(trimmed)
            }
            guard !matches.isEmpty else { return nil }
            var filtered = chapter
            filtered.articles = matches
            return filtered
        }
    }
}

private struct ArticleRow: View {
    let article: Article

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(article.title)
                .font(.system(size: 16, weight: .medium))
                .foregroundStyle(Theme.ink)

            if !article.summary.isEmpty {
                Text(article.summary)
                    .font(.system(size: 14))
                    .foregroundStyle(Theme.ink2)
                    .lineLimit(2)
            }

            HStack(spacing: 10) {
                Label("\(article.readingMinutes) min", systemImage: "clock")
                if !article.linkedQuestionIds.isEmpty {
                    Label("\(article.linkedQuestionIds.count)", systemImage: "questionmark.circle")
                }
            }
            .font(Theme.numeric(11))
            .foregroundStyle(Theme.ink3)
            .labelStyle(.titleAndIcon)
        }
        .padding(.vertical, 4)
    }
}

/// Says which kind of empty this is.
///
/// The web app learned this the hard way: a student looking at a blank
/// catalogue cannot tell "nothing synced" from "nothing published for my year",
/// and those need different things done about them.
private struct EmptyLibraryView: View {
    let reason: String

    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: "books.vertical")
                .font(.system(size: 32))
                .foregroundStyle(Theme.ink3)
            Text("Nothing to read yet")
                .font(Theme.display(20))
                .foregroundStyle(Theme.ink)
            Text(reason)
                .font(.system(size: 14))
                .foregroundStyle(Theme.ink2)
                .multilineTextAlignment(.center)
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
