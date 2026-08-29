import SwiftUI
import PhotosUI
import UniformTypeIdentifiers

/// The student's own documents — "My uploads". Upload a photo or a file, rename
/// or delete it; the bytes live on their account and follow them to any device,
/// which is the whole point of not leaving them on one phone.
struct MyUploadsView: View {
    @Environment(\.strings) private var strings

    let api: SynapseAPI
    @State private var docs: MyDocumentStore

    @State private var showingPhotos = false
    @State private var photoItem: PhotosPickerItem?
    @State private var showingFileImporter = false
    @State private var renaming: MyDocument?
    @State private var renameText = ""

    init(api: SynapseAPI) {
        self.api = api
        _docs = State(wrappedValue: MyDocumentStore(api: api))
    }

    var body: some View {
        List {
            if let fraction = docs.uploadFraction {
                Section {
                    ProgressView(value: fraction) {
                        Text(strings("Uploading…")).font(Theme.ui(13)).foregroundStyle(Theme.ink2)
                    }
                    .tint(Theme.primary)
                }
                .listRowBackground(Theme.surface)
            }

            if docs.isLoaded && docs.items.isEmpty {
                Section {
                    Text(strings("Nothing here yet. Add a photo or a file and it will be waiting on every device you sign in on."))
                        .font(Theme.ui(14)).foregroundStyle(Theme.ink3)
                        .padding(.vertical, 6)
                }
                .listRowBackground(Theme.surface)
            } else {
                Section {
                    ForEach(docs.items) { doc in
                        row(doc)
                            .swipeActions(edge: .trailing) {
                                Button(role: .destructive) {
                                    Task { await docs.remove(doc.id) }
                                } label: { Label(strings("Delete"), systemImage: "trash") }
                                Button {
                                    renaming = doc
                                    renameText = doc.title
                                } label: { Label(strings("Rename"), systemImage: "pencil") }
                                .tint(Theme.primary)
                            }
                    }
                } footer: {
                    if docs.quotaBytes > 0 {
                        Text(usageSummary).font(Theme.numeric(12)).foregroundStyle(Theme.ink3)
                    }
                }
                .listRowBackground(Theme.surface)
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .navigationTitle(strings("My uploads"))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Menu {
                    Button {
                        showingPhotos = true
                    } label: { Label(strings("Photo"), systemImage: "photo") }
                    Button {
                        showingFileImporter = true
                    } label: { Label(strings("File"), systemImage: "doc") }
                } label: {
                    Image(systemName: "plus")
                }
                .tint(Theme.primary)
                .disabled(docs.uploadFraction != nil)
            }
        }
        .photosPicker(isPresented: $showingPhotos, selection: $photoItem, matching: .images)
        .fileImporter(isPresented: $showingFileImporter, allowedContentTypes: [.pdf, .image, .item]) { result in
            if case .success(let url) = result { importFile(url) }
        }
        .onChange(of: photoItem) { _, item in
            guard let item else { return }
            Task { await importPhoto(item); photoItem = nil }
        }
        .alert(strings("Rename"), isPresented: renamingBinding) {
            TextField(strings("Title"), text: $renameText)
            Button(strings("Cancel"), role: .cancel) {}
            Button(strings("Save")) {
                let name = renameText.trimmingCharacters(in: .whitespacesAndNewlines)
                if let doc = renaming, !name.isEmpty { Task { await docs.rename(doc.id, to: name) } }
            }
        }
        .task { await docs.load() }
        .overlay(alignment: .bottom) {
            if let message = docs.errorMessage {
                Text(strings(message)).font(Theme.ui(13)).foregroundStyle(Theme.danger)
                    .padding(10).background(Theme.dangerTint, in: Capsule()).padding(.bottom, 12)
            }
        }
    }

    private func row(_ doc: MyDocument) -> some View {
        HStack(spacing: 12) {
            Image(systemName: doc.isPDF ? "doc.text" : "photo")
                .font(.system(size: 20)).foregroundStyle(Theme.primary).frame(width: 26)
            VStack(alignment: .leading, spacing: 3) {
                Text(doc.title).font(Theme.ui(15, weight: 500)).foregroundStyle(Theme.ink).lineLimit(1)
                Text(Self.byteText(doc.sizeBytes) + (doc.isPDF && (doc.pageCount ?? 0) > 0 ? " · \(doc.pageCount!) pp" : ""))
                    .font(Theme.numeric(11)).foregroundStyle(Theme.ink3)
            }
        }
        .padding(.vertical, 2)
    }

    private var usageSummary: String {
        "\(Self.byteText(docs.usedBytes)) of \(Self.byteText(docs.quotaBytes)) used"
    }

    private var renamingBinding: Binding<Bool> {
        Binding(get: { renaming != nil }, set: { if !$0 { renaming = nil } })
    }

    private func importPhoto(_ item: PhotosPickerItem) async {
        guard let data = try? await item.loadTransferable(type: Data.self) else { return }
        let type = item.supportedContentTypes.first
        let ext = type?.preferredFilenameExtension ?? "jpg"
        let mime = type?.preferredMIMEType ?? "image/jpeg"
        await docs.upload(data: data, fileName: "Photo.\(ext)", mimeType: mime)
    }

    private func importFile(_ url: URL) {
        Task {
            let scoped = url.startAccessingSecurityScopedResource()
            defer { if scoped { url.stopAccessingSecurityScopedResource() } }
            guard let data = try? Data(contentsOf: url) else { return }
            let mime = UTType(filenameExtension: url.pathExtension)?.preferredMIMEType
                ?? (url.pathExtension.lowercased() == "pdf" ? "application/pdf" : "application/octet-stream")
            await docs.upload(data: data, fileName: url.lastPathComponent, mimeType: mime)
        }
    }

    static func byteText(_ bytes: Int) -> String {
        ByteCountFormatter.string(fromByteCount: Int64(bytes), countStyle: .file)
    }
}
