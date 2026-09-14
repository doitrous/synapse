import SwiftUI

/// The resource catalogue: folders of books, decks, guidelines and video.
struct ResourcesView: View {
    @Environment(\.strings) private var strings
    @State private var model: ResourceModel
    let sync: SyncEngine

    @State private var query = ""
    @State private var savedOnly = false
    @State private var typeFilter: ResourceType?
    @AppStorage("nishany.resources.openableOnly") private var openableOnly = false
    @State private var files: ResourceFileStore
    let api: SynapseAPI

    init(store: LocalStore, sync: SyncEngine, audience: StudentAudience, api: SynapseAPI) {
        _model = State(wrappedValue: ResourceModel(
            store: store, sync: sync, api: api, audience: audience
        ))
        _files = State(wrappedValue: ResourceFileStore(api: api))
        self.api = api
        self.sync = sync
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().tint(Theme.primary)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if let reason = model.emptyReason {
                    EmptyStateView(symbol: "folder", title: "No resources yet", detail: reason)
                } else {
                    folderList
                }
            }
            .background(Theme.paper)
            .navigationTitle(strings("Resources"))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    // The student's own files — reachable whether or not the
                    // catalogue has anything for their cohort.
                    NavigationLink {
                        MyUploadsView(api: api)
                    } label: {
                        Image(systemName: "tray.and.arrow.up")
                    }
                    .tint(Theme.primary)
                    .accessibilityLabel(strings("My uploads"))
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        savedOnly.toggle()
                    } label: {
                        Image(systemName: savedOnly ? "bookmark.fill" : "bookmark")
                    }
                    .tint(Theme.primary)
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
            Section {
                filters
            }
            .listRowBackground(Theme.surface)

            ForEach(visibleFolders) { folder in
                Section {
                    ForEach(folder.resources) { resource in
                        // Only an openable resource is a link. A row that
                        // pushes to "nothing here" teaches a student not to
                        // trust the rest of them.
                        row(resource, model: model)
                            .listRowBackground(Theme.surface)
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

    /// How the shelf is arranged, and what is left out of it.
    ///
    /// Both are device preferences, as on the web: how a student likes to
    /// browse is about the hand holding the phone, not the account.
    @ViewBuilder private var filters: some View {
        Picker("Arrange", selection: Binding(
            get: { model.grouping },
            set: { model.grouping = $0 }
        )) {
            ForEach(ResourceModel.Grouping.allCases, id: \.self) {
                Text($0.label).tag($0)
            }
        }
        .pickerStyle(.segmented)

        // Tick rows rather than switches. A `Toggle` in this list takes no
        // taps at all — the picker above it does, so the section is live —
        // and a control that looks operable and is not is worse than none.
        tick("Saved only", isOn: savedOnly) { savedOnly.toggle() }

        // Most of this shelf is catalogued but not uploaded, so "what can I
        // actually open" is the filter a student reaches for first.
        tick("Only ones I can open", isOn: openableOnly) { openableOnly.toggle() }

        // Type chips with live counts, as on the web. Only worth showing when
        // the shelf actually holds more than one kind.
        let counts = typeCounts
        if counts.count > 1 {
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    typeChip(nil, label: "All", count: counts.values.reduce(0, +))
                    ForEach(ResourceType.allCases.filter { counts[$0] != nil }, id: \.self) { type in
                        typeChip(type, label: type.rawValue, count: counts[type] ?? 0)
                    }
                }
            }
        }
    }

    /// How many of each kind the shelf holds, before the saved/search filters —
    /// so a chip's count reads as "how many of these exist", the way the web's do.
    private var typeCounts: [ResourceType: Int] {
        Dictionary(grouping: model.folders.flatMap(\.resources), by: \.type).mapValues(\.count)
    }

    private func typeChip(_ type: ResourceType?, label: String, count: Int) -> some View {
        let selected = typeFilter == type
        return Button {
            typeFilter = type
        } label: {
            HStack(spacing: 4) {
                Text(label)
                Text("\(count)").font(Theme.numeric(11))
            }
            .font(Theme.ui(12, weight: selected ? 600 : 400))
            .foregroundStyle(selected ? .white : Theme.ink2)
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(selected ? Theme.primary : Theme.inset, in: Capsule())
        }
        .buttonStyle(.plain)
    }

    private func tick(_ title: String, isOn: Bool, toggle: @escaping () -> Void) -> some View {
        Button(action: toggle) {
            HStack(spacing: 10) {
                Image(systemName: isOn ? "checkmark.square.fill" : "square")
                    .foregroundStyle(isOn ? Theme.primary : Theme.ink3)
                Text(title)
                    .font(Theme.ui(14))
                    .foregroundStyle(Theme.ink)
                Spacer()
            }
        }
        .buttonStyle(.plain)
    }

    /// One catalogue row, routed by what it actually is. A PDF opens in the
    /// in-app reader; a video or other non-PDF source opens externally (never
    /// fed to PDFKit, which renders its bytes as a broken document, and never
    /// downloaded as a `.pdf`); a source with no openable URL is shown inert.
    @ViewBuilder
    private func row(_ resource: LibraryResource, model: ResourceModel) -> some View {
        let downloaded = (resource.file?.isPDF == true)
            && files.state(for: resource.id) == .ready(ResourceFileStore.fileURL(resource.id) ?? URL(fileURLWithPath: "/"))
        let card = ResourceRow(
            resource: resource,
            isSaved: model.bookmarks.contains(resource.id),
            isDownloaded: downloaded,
            toggle: { Task { await model.toggleBookmark(resource.id) } }
        )

        if resource.isOpenable, resource.file?.isPDF == true {
            NavigationLink {
                ResourceReaderView(resource: resource, files: files, api: api, sync: sync)
            } label: { card }
        } else if let uri = resource.file?.sourceUri, let url = URL(string: uri) {
            Link(destination: url) { card }
        } else {
            card
        }
    }

    private var visibleFolders: [ResourceModel.Folder] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)

        return model.folders.compactMap { folder in
            var matches = folder.resources
            if savedOnly {
                matches = matches.filter { model.bookmarks.contains($0.id) }
            }
            if openableOnly {
                matches = matches.filter(\.isOpenable)
            }
            if let typeFilter {
                matches = matches.filter { $0.type == typeFilter }
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
    @Environment(\.strings) private var strings
    let resource: LibraryResource
    let isSaved: Bool
    let isDownloaded: Bool
    let toggle: () -> Void

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: resource.type.symbol)
                .font(.system(size: 15))
                .foregroundStyle(Theme.primary)
                .frame(width: 22)

            VStack(alignment: .leading, spacing: 3) {
                Text(resource.title)
                    .font(Theme.ui(16, weight: 500))
                    .foregroundStyle(Theme.ink)

                HStack(spacing: 6) {
                    Text(resource.source)
                    if let year = resource.year {
                        Text(strings("·"))
                        Text(String(year)).font(Theme.numeric(12))
                    }
                }
                .font(Theme.ui(13))
                .foregroundStyle(Theme.ink2)
                .lineLimit(1)

                // A resource can be catalogued before its file is uploaded.
                // Saying so is better than a tap that opens nothing — and, as on
                // the web, showing where the author said it can be found.
                if !resource.isOpenable {
                    Text(strings("File not uploaded yet"))
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink3)
                    if !resource.meta.isEmpty {
                        Text(resource.meta)
                            .font(Theme.ui(11))
                            .foregroundStyle(Theme.ink3)
                            .lineLimit(2)
                    }
                } else if isDownloaded {
                    Label(strings("On this phone"), systemImage: "checkmark.circle")
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
                    .foregroundStyle(isSaved ? Theme.primary : Theme.ink3)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(isSaved ? "Remove from saved" : "Save")
        }
        .padding(.vertical, 4)
    }
}

/// Shared empty state, so every surface explains itself the same way.
struct EmptyStateView: View {
    @Environment(\.strings) private var strings
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
