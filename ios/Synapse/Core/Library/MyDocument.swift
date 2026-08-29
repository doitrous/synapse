import Foundation

/// A document a student brought themselves — the "My uploads" locker.
///
/// Unlike everything else the app syncs, these do not travel as a user-state
/// JSON document: the bytes are large, so they go to the server's own document
/// store over a chunked REST upload (`/api/my-documents`, `user_documents`
/// table) and come back on any device the student signs in on. A port of the
/// live-mode half of `src/lib/useMyDocuments.ts`.
struct MyDocument: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var title: String
    /// `pdf` for anything the reader opens, `file` for everything else.
    var mediaType: String
    var fileName: String?
    var mimeType: String?
    var sizeBytes: Int
    var pageCount: Int?
    var createdAt: String
    var sourceKind: String?
    var sourceId: String?

    var isPDF: Bool { mediaType == "pdf" }

    /// The file extension a previewer needs to recognise the bytes.
    ///
    /// The download endpoint hands back an extensionless temp file, and
    /// QuickLook decides how to render purely from the path extension — a PDF
    /// named without `.pdf` opens as a wall of raw bytes. Prefer the original
    /// upload's own extension, then fall back to the media type, then the mime.
    var previewExtension: String {
        if let fileName {
            let ext = (fileName as NSString).pathExtension
            if !ext.isEmpty { return ext.lowercased() }
        }
        if isPDF { return "pdf" }
        if let mimeType, let sub = mimeType.split(separator: "/").last, !sub.isEmpty {
            let lower = sub.lowercased()
            return lower == "jpeg" ? "jpg" : lower
        }
        return "dat"
    }
}

/// The listing, with the student's space usage.
struct MyDocumentsList: Decodable, Sendable {
    var items: [MyDocument]
    var usedBytes: Int
    var quotaBytes: Int
}

/// What `POST /api/my-documents` returns: the record id and the upload session
/// to push the bytes into.
struct MyDocumentUpload: Decodable, Sendable {
    var id: String
    var uploadId: String
    /// The server's per-chunk ceiling; the client stays well under it.
    var chunkMaxBytes: Int?
}
