import Foundation
import Testing
@testable import Synapse

/// Pins the "My uploads" model + the title/chunk behaviour the upload relies on.
struct MyDocumentTests {

    @Test func titleDropsTheExtension() {
        #expect(MyDocumentStore.title(from: "Cardiology handout.pdf") == "Cardiology handout")
        #expect(MyDocumentStore.title(from: "scan.jpeg") == "scan")
        #expect(MyDocumentStore.title(from: "no-extension") == "no-extension")
        #expect(MyDocumentStore.title(from: ".pdf") == "Untitled document")
    }

    @Test func decodesTheServerListing() throws {
        let json = """
        {"items":[
          {"id":"d1","title":"Handout","mediaType":"pdf","fileName":"h.pdf","mimeType":"application/pdf",
           "sizeBytes":12345,"pageCount":3,"sourceKind":"resource","sourceId":null,"createdAt":"2026-08-29T09:00:00.000Z"}
        ],"usedBytes":12345,"quotaBytes":104857600,"plan":"pro"}
        """
        let list = try JSONDecoder().decode(MyDocumentsList.self, from: Data(json.utf8))
        #expect(list.items.count == 1)
        #expect(list.items[0].isPDF)
        #expect(list.items[0].pageCount == 3)
        #expect(list.quotaBytes == 104857600)
    }

    @Test func decodesAnUploadSession() throws {
        let json = #"{"id":"d1","uploadId":"abc","chunkMaxBytes":67108864,"mediaType":"pdf"}"#
        let upload = try JSONDecoder().decode(MyDocumentUpload.self, from: Data(json.utf8))
        #expect(upload.id == "d1")
        #expect(upload.uploadId == "abc")
        #expect(upload.chunkMaxBytes == 67108864)
    }

    @Test func previewExtensionPrefersTheOriginalFileName() {
        // QuickLook renders from the extension; the original upload name is the
        // most reliable source of it.
        func doc(mediaType: String, fileName: String?, mimeType: String?) -> MyDocument {
            MyDocument(id: "d", title: "t", mediaType: mediaType, fileName: fileName,
                       mimeType: mimeType, sizeBytes: 1, pageCount: nil,
                       createdAt: "2026-08-29T00:00:00.000Z", sourceKind: nil, sourceId: nil)
        }
        #expect(doc(mediaType: "pdf", fileName: "Handout.PDF", mimeType: nil).previewExtension == "pdf")
        #expect(doc(mediaType: "file", fileName: "scan.PNG", mimeType: "image/png").previewExtension == "png")
        // No usable file name → the media type, then the mime, decide it.
        #expect(doc(mediaType: "pdf", fileName: nil, mimeType: nil).previewExtension == "pdf")
        #expect(doc(mediaType: "file", fileName: "no-extension", mimeType: "image/jpeg").previewExtension == "jpg")
        #expect(doc(mediaType: "file", fileName: nil, mimeType: nil).previewExtension == "dat")
    }

    @Test func previewURLRefusesAnIdThatCouldEscapeTheDirectory() {
        let ok = MyDocument(id: "abc-123", title: "t", mediaType: "pdf", fileName: "a.pdf",
                            mimeType: nil, sizeBytes: 1, pageCount: nil,
                            createdAt: "2026-08-29T00:00:00.000Z", sourceKind: nil, sourceId: nil)
        #expect(DocumentPreviewLoader.cachedURL(for: ok)?.lastPathComponent == "mydoc-abc-123.pdf")

        let evil = MyDocument(id: "../../etc/passwd", title: "t", mediaType: "pdf", fileName: "a.pdf",
                              mimeType: nil, sizeBytes: 1, pageCount: nil,
                              createdAt: "2026-08-29T00:00:00.000Z", sourceKind: nil, sourceId: nil)
        #expect(DocumentPreviewLoader.cachedURL(for: evil) == nil)
    }

    @Test func aFileThatFitsInOneChunkStillUploadsAsOne() {
        // The chunk count the upload loop computes: ceil(size / chunkBytes), min 1.
        let size = 100
        let total = max(1, Int((Double(size) / Double(MyDocumentStore.chunkBytes)).rounded(.up)))
        #expect(total == 1)
    }
}
