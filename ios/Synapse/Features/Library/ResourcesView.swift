import SwiftUI

/// The resource catalogue: folders of books, decks, guidelines and video.
struct ResourcesView: View {
    @State private var model: ResourceModel
    let sync: SyncEngine

    @State private var query = ""
    @State private var savedOnly = false
    @State private var files: ResourceFileStore

    init(store: LocalStore, sync: SyncEngine, audience: StudentAudience, api: SynapseAPI) {
        _model = State(wrappedValue: ResourceModel(
            store: store, sync: sync, api: api, audience: audience
        ))
        _files = State(wrappedValue: ResourceFileStore(api: api))
        self.sync = sync
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().tint(Theme.accent)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if let reason = model.emptyReason {
                    EmptyStateView(symbol: "folder", title: "No resources yet", detail: reason)
                } else {
                    folderList
                }
            }
            .background(Theme.paper)
            .navigationTitle("Resources")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        savedOnly.toggle()
                    } label: {
                        Image(systemName: savedOnly ? "bookmark.fill" : "bookmark")
                    }
                    .tint(Theme.accent)
                    .accessibilityLabel(savedOnly ? "Showing saved only" : "Show saved only")
                }
            }
        }
        .searchable(text: $query, prompt: "Search resources")
        .task { await model.load() }
        // See the note in LibraryView: the first sync lands after this screen
        // has already read an empty cache.
        .onChange(of: sync.status) { _, status in
            if case .done = status { Task { await model.load() } }
        }
        .refreshable {
            await sync.refresh()
            await model.load()
        }
    }

    private var folderList: some View {
        List {
            ForEach(visibleFolders) { folder in
                Section {
                    ForEach(folder.resources) { resource in
                        // Only an openable resource is a link. A row that
                        // pushes to "nothing here" teaches a student not to
                        // trust the rest of them.
                        if resource.isOpenable {
                            NavigationLink {
                                ResourceReaderView(resource: resource, files: files)
                            } label: {
                                ResourceRow(
                                    resource: resource,
                                    isSaved: model.bookmarks.contains(resource.id),
                                    isDownloaded: files.state(for: resource.id) == .ready(ResourceFileStore.fileURL(resource.id) ?? URL(fileURLWithPath: "/")),
                                    toggle: { Task { await model.toggleBookmark(resource.id) } }
                                )
                            }
                            .listRowBackground(Theme.surface)
                        } else {
                            ResourceRow(
                                resource: resource,
                                isSaved: model.bookmarks.contains(resource.id),
                                isDownloaded: false,
                                toggle: { Task { await model.toggleBookmark(resource.id) } }
                            )
                            .listRowBackground(Theme.surface)
                        }
                    }
                } header: {
                    Text(folder.title)
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
            if visibleFolders.isEmpty {
                if savedOnly, query.isEmpty {
                    EmptyStateView(
                        symbol: "bookmark",
                        title: "Nothing saved",
                        detail: "Tap the bookmark on a resource to keep it here."
                    )
                } else if !query.isEmpty {
                    ContentUnavailableView.search(text: query)
                }
            }
        }
    }

    private var visibleFolders: [ResourceModel.Folder] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)

        return model.folders.compactMap { folder in
            var matches = folder.resources
            if savedOnly {
                matches = matches.filter { model.bookmarks.contains($0.id) }
            }
            if !trimmed.isEmpty {
                matches = matches.filter {
                    $0.title.localizedCaseInsensitiveContains(trimmed)
                        || $0.source.localizedCaseInsensitiveContains(trimmed)
                }
            }
            guard !matches.isEmpty else { return nil }
            var filtered = folder
            filtered.resources = matches
            return filtered
        }
    }
}

private struct ResourceRow: View {
    let resource: LibraryResource
    let isSaved: Bool
    let isDownloaded: Bool
    let toggle: () -> Void

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: resource.type.symbol)
                .font(.system(size: 15))
                .foregroundStyle(Theme.accent)
                .frame(width: 22)

            VStack(alignment: .leading, spacing: 3) {
                Text(resource.title)
                    .font(Theme.ui(16, weight: 500))
                    .foregroundStyle(Theme.ink)

                HStack(spacing: 6) {
                    Text(resource.source)
                    if let year = resource.year {
                        Text("·")
                        Text(String(year)).font(Theme.numeric(12))
                    }
                }
                .font(Theme.ui(13))
                .foregroundStyle(Theme.ink2)
                .lineLimit(1)

                // A resource can be catalogued before its file is uploaded.
                // Saying so is better than a tap that opens nothing.
                if !resource.isOpenable {
                    Text("File not uploaded yet")
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink3)
                } else if isDownloaded {
                    Label("On this phone", systemImage: "checkmark.circle")
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.success)
                } else if let pages = resource.file?.pageCount {
                    Text("\(pages) pages")
                        .font(Theme.numeric(11))
                        .foregroundStyle(Theme.ink3)
                }
            }

            Spacer(minLength: 8)

            Button(action: toggle) {
                Image(systemName: isSaved ? "bookmark.fill" : "bookmark")
                    .font(.system(size: 14))
                    .foregroundStyle(isSaved ? Theme.accent : Theme.ink3)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(isSaved ? "Remove from saved" : "Save")
        }
        .padding(.vertical, 4)
    }
}

/// Shared empty state, so every surface explains itself the same way.
struct EmptyStateView: View {
    let symbol: String
    let title: LocalizedStringKey
    let detail: String

    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: symbol)
                .font(.system(size: 32))
                .foregroundStyle(Theme.ink3)
            Text(title)
                .font(Theme.display(20))
                .foregroundStyle(Theme.ink)
            Text(detail)
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink2)
                .multilineTextAlignment(.center)
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Theme.paper)
    }
}
