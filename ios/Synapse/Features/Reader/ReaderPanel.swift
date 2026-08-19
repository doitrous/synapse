import PDFKit
import SwiftUI

/// One entry in a document's own contents list.
struct OutlineEntry: Identifiable, Equatable {
    let id = UUID()
    let title: String
    let page: Int?
    /// How far in it sits, so the shape of the book is visible at a glance.
    let depth: Int
}

extension PDFDocument {

    /// The document's contents list, flattened.
    ///
    /// Kept as a flat list with a depth rather than a tree: a contents panel is
    /// read top to bottom, and a tree would mean collapsing state for something
    /// nobody collapses.
    func contents() -> [OutlineEntry] {
        guard let root = outlineRoot else { return [] }
        var entries: [OutlineEntry] = []

        func walk(_ node: PDFOutline, depth: Int) {
            for index in 0..<node.numberOfChildren {
                guard let child = node.child(at: index) else { continue }
                let page = child.destination?.page.flatMap { self.index(for: $0) }
                entries.append(OutlineEntry(
                    title: child.label ?? "",
                    page: page.map { $0 + 1 },
                    depth: depth
                ))
                walk(child, depth: depth + 1)
            }
        }

        walk(root, depth: 0)
        return entries.filter { !$0.title.trimmingCharacters(in: .whitespaces).isEmpty }
    }
}

/// Finding your way around a document: its contents, your own sections, and
/// what either of you wrote.
struct ReaderPanel: View {

    enum Tab: String, CaseIterable, Identifiable {
        case contents, search
        var id: String { rawValue }
        var label: String {
            switch self {
            case .contents: "Contents"
            case .search: "Search"
            }
        }
    }

    @Binding var tab: Tab
    let outline: [OutlineEntry]
    let markers: [AnnotationObject]
    let noteIndex: [AnnotationManifest.NoteEntry]
    let currentPage: Int
    let findInDocument: (String) -> (matches: [SearchIndex.Match], hasText: Bool)
    let goTo: (Int) -> Void
    let addSection: (String) -> Void
    let removeSection: (String) -> Void
    let close: () -> Void

    @State private var query = ""
    @State private var documentHits: [SearchIndex.Match] = []
    @State private var scanning = false
    @State private var scanned = false
    /// False once a scan has found the document carries no text at all.
    @State private var hasText = true
    @State private var naming = false
    @State private var sectionTitle = ""

    /// Found as you type, because the note index is a few kilobytes already in
    /// hand — unlike the document, which has to be read page by page.
    private var noteHits: [SearchIndex.Match] {
        SearchIndex.notes(noteIndex, of: query)
    }

    var body: some View {
        NavigationStack {
            Group {
                switch tab {
                case .contents: contents
                case .search: search
                }
            }
            .background(Theme.paper)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Picker("", selection: $tab) {
                        ForEach(Tab.allCases) { Text($0.label).tag($0) }
                    }
                    .pickerStyle(.segmented)
                    .frame(width: 200)
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done", action: close)
                        .font(Theme.ui(16, weight: 600))
                        .tint(Theme.accent)
                }
            }
        }
        .alert("Name this section", isPresented: $naming) {
            TextField("Page \(currentPage)", text: $sectionTitle)
            Button("Cancel", role: .cancel) { sectionTitle = "" }
            Button("Add") {
                addSection(sectionTitle.isEmpty ? "Page \(currentPage)" : sectionTitle)
                sectionTitle = ""
            }
        } message: {
            Text("It will be listed here, whatever page you are on.")
        }
    }

    // MARK: - Contents

    @ViewBuilder private var contents: some View {
        if outline.isEmpty && markers.isEmpty {
            VStack(spacing: 14) {
                EmptyStateView(
                    symbol: "list.bullet.indent",
                    title: "No contents list",
                    detail: "This document does not carry one. Mark your own sections instead, or search it."
                )
                Button { naming = true } label: {
                    Label("Section here", systemImage: "plus")
                }
                .font(Theme.ui(15, weight: 600))
                .tint(Theme.accent)
            }
        } else {
            List {
                Section {
                    Button { naming = true } label: {
                        Label("Section here", systemImage: "plus")
                            .font(Theme.ui(14, weight: 600))
                            .foregroundStyle(Theme.accent)
                    }
                }
                .listRowBackground(Theme.surface)

                if !markers.isEmpty {
                    Section("Your sections") {
                        ForEach(markers) { marker in
                            Button { goTo(marker.page) } label: {
                                row(marker.title ?? "", page: marker.page, depth: 0, mine: true)
                            }
                            .swipeActions {
                                Button(role: .destructive) {
                                    removeSection(marker.id)
                                } label: {
                                    Label("Remove", systemImage: "trash")
                                }
                            }
                        }
                    }
                    .listRowBackground(Theme.surface)
                }

                if !outline.isEmpty {
                    Section("In this document") {
                        ForEach(outline) { entry in
                            Button { entry.page.map(goTo) } label: {
                                row(entry.title, page: entry.page, depth: entry.depth, mine: false)
                            }
                            .disabled(entry.page == nil)
                        }
                    }
                    .listRowBackground(Theme.surface)
                }
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
        }
    }

    private func row(_ title: String, page: Int?, depth: Int, mine: Bool) -> some View {
        HStack(spacing: 8) {
            if mine {
                Capsule()
                    .fill(Theme.accent)
                    .frame(width: 2, height: 14)
            }
            Text(title)
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink)
                .lineLimit(2)
                .multilineTextAlignment(.leading)
            Spacer(minLength: 8)
            if let page {
                Text("\(page)")
                    .font(Theme.numeric(12))
                    .foregroundStyle(Theme.ink2)
            }
        }
        .padding(.leading, CGFloat(depth) * 14)
    }

    // MARK: - Search

    private var search: some View {
        List {
            Section {
                TextField("Find in this document…", text: $query)
                    .font(Theme.ui(15))
                    .submitLabel(.search)
                    .autocorrectionDisabled()
                    .onSubmit(scan)
                    .onChange(of: query) { _, _ in
                        // The document is scanned on Enter, not per keystroke:
                        // reading a 400-page book is not something to do four
                        // times while a word is being typed.
                        documentHits = []
                        scanned = false
                    }
            }
            .listRowBackground(Theme.surface)

            if !noteHits.isEmpty {
                Section("In your notes") {
                    ForEach(noteHits) { hit in
                        Button { goTo(hit.page) } label: { hitRow(hit) }
                    }
                }
                .listRowBackground(Theme.surface)
            }

            if scanning {
                Section {
                    HStack(spacing: 10) {
                        ProgressView().tint(Theme.accent)
                        Text("Reading the document…")
                            .font(Theme.ui(13))
                            .foregroundStyle(Theme.ink2)
                    }
                }
                .listRowBackground(Theme.surface)
            } else if !documentHits.isEmpty {
                Section("^[\(documentHits.count) hit](inflect: true) in this document") {
                    ForEach(documentHits) { hit in
                        Button { goTo(hit.page) } label: { hitRow(hit) }
                    }
                }
                .listRowBackground(Theme.surface)
            } else if scanned, !hasText {
                Section {
                    VStack(alignment: .leading, spacing: 6) {
                        Label("This one is a scan", systemImage: "doc.text.image")
                            .font(Theme.ui(14, weight: 600))
                            .foregroundStyle(Theme.ink)
                        Text("It is photographs of pages, with no text behind them, so there are no words in it to search. Anything you write on it is still searched.")
                            .font(Theme.ui(13))
                            .foregroundStyle(Theme.ink2)
                    }
                    .padding(.vertical, 2)
                }
                .listRowBackground(Theme.surface)
            } else if scanned, noteHits.isEmpty, !query.isEmpty {
                Section {
                    Text("Nothing found for “\(query)”.")
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink2)
                }
                .listRowBackground(Theme.surface)
            } else if !query.isEmpty, !scanned {
                Section {
                    Button(action: scan) {
                        Label("Search the document too", systemImage: "magnifyingglass")
                            .font(Theme.ui(14, weight: 600))
                            .foregroundStyle(Theme.accent)
                    }
                }
                .listRowBackground(Theme.surface)
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
    }

    private func hitRow(_ hit: SearchIndex.Match) -> some View {
        VStack(alignment: .leading, spacing: 3) {
            HStack(spacing: 6) {
                Text("Page \(hit.page)")
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.accent)
                if hit.isOwnWriting {
                    Text(hit.label)
                        .font(Theme.ui(11))
                        .foregroundStyle(Theme.ink2)
                }
            }
            Text(hit.snippet)
                .font(Theme.ui(13))
                .foregroundStyle(Theme.ink)
                .lineLimit(3)
                .multilineTextAlignment(.leading)
        }
        .padding(.vertical, 2)
    }

    private func scan() {
        let wanted = query
        guard !wanted.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        scanning = true
        let result = findInDocument(wanted)
        documentHits = result.matches
        hasText = result.hasText
        scanning = false
        scanned = true
    }
}
