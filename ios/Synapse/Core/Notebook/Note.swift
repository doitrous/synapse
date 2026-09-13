import Foundation

/// A student's own note.
///
/// Stored under the same key the web app uses, so a note written on the phone
/// is there in the browser. Written locally first and uploaded after, so a
/// thought caught on a ward with no signal is not lost.
///
/// **Every field the website writes is held here, including the ones this app
/// does not yet let a student edit.** The notebook is stored as one array and
/// rewritten whole, and Swift drops keys it does not know — so a struct missing
/// a field would not merely ignore it, it would erase that field from *every*
/// note the moment any one of them was touched on the phone. A student would
/// lose the article a note was about, the image they pasted into it, the pages
/// they referenced — and, crucially, the entire rich-text body and any ink they
/// drew, since the website keeps those in `editorJson`/`drawing` and this app
/// once modelled neither. That is why the modern fields below are all present,
/// and why `editorJson`/`drawing` are held as opaque `JSONValue` trees rather
/// than parsed: the app does not need to understand a table or a checklist to
/// carry it back untouched.
struct Note: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var title: String
    /// Legacy markdown body. Optional because the website's save payload no
    /// longer sends it — the live content lives in `editorJson`/`plainText` —
    /// and a required field would make a modern note fail to decode entirely.
    var body: String?
    /// The rich-text editor state (Lexical). Opaque on purpose: see the type
    /// note above. This is what the website actually renders.
    var editorJson: JSONValue?
    /// The note's words with no formatting — what search and previews read.
    var plainText: String?
    /// The original markdown a legacy note was migrated from, kept frozen.
    var legacyMarkdownSource: String?
    /// Bumped on each edit; the website uses it to resolve which save wins.
    var revision: Int?
    var tags: [String]
    /// The article this note is about, when it was written from one.
    var subtopicId: String?
    var subtopicTitle: String?
    var subjectId: String?
    /// Managed student-owned media for a newly pasted image.
    var imageDocumentId: String?
    /// A legacy inline image, as a data URL. Held rather than shown for now.
    var imageData: String?
    /// Documents this note is about — a Synapse resource, or a PDF the student
    /// uploaded themselves.
    var resourceRefs: [NoteResourceRef]?
    /// Freehand ink drawn over or under the note body. Opaque and preserved.
    var drawing: JSONValue?
    /// ISO timestamp of the last edit.
    var updatedAt: String

    static let storageKey = "nishany.notebook.notes"

    init(
        id: String,
        title: String,
        body: String? = nil,
        editorJson: JSONValue? = nil,
        plainText: String? = nil,
        legacyMarkdownSource: String? = nil,
        revision: Int? = nil,
        tags: [String],
        subtopicId: String? = nil,
        subtopicTitle: String? = nil,
        subjectId: String? = nil,
        imageDocumentId: String? = nil,
        imageData: String? = nil,
        resourceRefs: [NoteResourceRef]? = nil,
        drawing: JSONValue? = nil,
        updatedAt: String
    ) {
        self.id = id
        self.title = title
        self.body = body
        self.editorJson = editorJson
        self.plainText = plainText
        self.legacyMarkdownSource = legacyMarkdownSource
        self.revision = revision
        self.tags = tags
        self.subtopicId = subtopicId
        self.subtopicTitle = subtopicTitle
        self.subjectId = subjectId
        self.imageDocumentId = imageDocumentId
        self.imageData = imageData
        self.resourceRefs = resourceRefs
        self.drawing = drawing
        self.updatedAt = updatedAt
    }
}

/// A document a note refers to.
struct NoteResourceRef: Codable, Identifiable, Equatable, Sendable {
    /// A reader route id, which means an upload is stored as `my:<id>`. One
    /// field addresses both kinds because the reader does.
    var resourceId: String
    /// The page the student was on, when they were on one.
    var page: Int?
    /// Kept alongside the id so a chip still reads if the item is withdrawn.
    var label: String

    var id: String { "\(resourceId)#\(page ?? 0)" }
}
