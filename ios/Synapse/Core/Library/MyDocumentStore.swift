import Foundation
import Observation

/// The student's "My uploads" locker, over the chunked `/api/my-documents` REST
/// contract. A port of `useMyDocuments.ts` (live mode): the list, the chunked
/// upload, rename, delete, and downloading a file to open it.
@MainActor
@Observable
final class MyDocumentStore {

    /// Well under the server's 64 MB per-chunk ceiling, matching the web client.
    nonisolated static let chunkBytes = 8 * 1024 * 1024

    private(set) var items: [MyDocument] = []
    private(set) var usedBytes = 0
    private(set) var quotaBytes = 0
    private(set) var isLoaded = false
    /// Set while an upload is in flight (0…1); nil when idle.
    private(set) var uploadFraction: Double?
    private(set) var errorMessage: String?

    private let api: SynapseAPI

    init(api: SynapseAPI) {
        self.api = api
    }

    func load() async {
        do {
            let list = try await api.myDocuments()
            items = list.items
            usedBytes = list.usedBytes
            quotaBytes = list.quotaBytes
            errorMessage = nil
        } catch {
            errorMessage = "Your documents could not be listed."
        }
        isLoaded = true
    }

    /// Create the record, push the bytes chunk by chunk, then assemble. Reloads
    /// the list on success so the new document (with its server-computed size and
    /// page count) appears.
    func upload(data: Data, fileName: String, mimeType: String) async {
        uploadFraction = 0
        defer { uploadFraction = nil }
        do {
            let created = try await api.createMyDocument(
                title: Self.title(from: fileName), fileName: fileName, mimeType: mimeType
            )
            let total = max(1, Int((Double(data.count) / Double(Self.chunkBytes)).rounded(.up)))
            for index in 0..<total {
                let start = index * Self.chunkBytes
                let end = min(start + Self.chunkBytes, data.count)
                try await api.uploadMyDocumentChunk(
                    documentId: created.id, uploadId: created.uploadId, index: index,
                    data: data.subdata(in: start..<end)
                )
                uploadFraction = Double(index + 1) / Double(total)
            }
            try await api.completeMyDocument(
                documentId: created.id, uploadId: created.uploadId, totalChunks: total, sizeBytes: data.count
            )
            await load()
        } catch {
            errorMessage = Self.message(for: error, fallback: "The upload did not finish.")
        }
    }

    func rename(_ id: String, to title: String) async {
        do {
            try await api.renameMyDocument(id: id, title: title)
            await load()
        } catch {
            errorMessage = Self.message(for: error, fallback: "That could not be renamed.")
        }
    }

    func remove(_ id: String) async {
        do {
            try await api.deleteMyDocument(id: id)
            await load()
        } catch {
            errorMessage = Self.message(for: error, fallback: "That could not be deleted.")
        }
    }

    /// Download a document to a temporary file so it can be opened/previewed.
    func download(_ id: String, onProgress: @escaping @Sendable (Double) -> Void) async throws -> URL {
        try await api.downloadMyDocument(id: id, onProgress: onProgress)
    }

    // MARK: - Helpers

    /// The title an upload takes: its file name without the extension.
    nonisolated static func title(from fileName: String) -> String {
        let stripped = fileName.replacingOccurrences(
            of: "\\.[A-Za-z0-9]{1,8}$", with: "", options: .regularExpression
        ).trimmingCharacters(in: .whitespaces)
        return stripped.isEmpty ? "Untitled document" : stripped
    }

    private static func message(for error: Error, fallback: String) -> String {
        switch error {
        case APIError.unauthorized: return "You need to sign in again."
        case APIError.forbidden: return "That is not allowed on your plan."
        case APIError.transient(let status?) where status == 409:
            return "That would go past the space on your account."
        default: return fallback
        }
    }
}
