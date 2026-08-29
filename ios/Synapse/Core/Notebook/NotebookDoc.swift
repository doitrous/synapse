import Foundation

/// The notebook's text layer — a faithful port of `src/data/notebook.ts`.
///
/// The website's note body is a Lexical editor state (`editorJson`). These are
/// the pure functions that move between that tree and plain text, so the phone
/// reads the same words the browser shows and writes a state the browser can
/// render. Kept byte-compatible with the web helpers of the same names, pinned
/// by `NotebookEditorTests` against the web's own `notebook.test.ts`.
enum NotebookDoc {

    // MARK: - Node builders (the exact shapes Lexical serialises)

    private static func textNode(_ text: String) -> JSONValue {
        .object([
            "type": .string("text"), "version": .number(1), "text": .string(text),
            "detail": .number(0), "format": .number(0), "mode": .string("normal"), "style": .string(""),
        ])
    }

    private static func paragraphNode(_ text: String) -> JSONValue {
        .object([
            "type": .string("paragraph"), "version": .number(1),
            "children": .array(text.isEmpty ? [] : [textNode(text)]),
            "direction": .null, "format": .string(""), "indent": .number(0),
            "textFormat": .number(0), "textStyle": .string(""),
        ])
    }

    // MARK: - Conversions

    /// Plain text → a Lexical root of paragraphs. Markdown marks are stripped
    /// from the readable words; the source markdown is kept elsewhere on the
    /// note (`legacyMarkdownSource`), never fed back into the editor.
    static func plainTextToEditorJson(_ text: String) -> JSONValue {
        let normalised = normaliseNewlines(text)
        let lines = normalised.components(separatedBy: "\n")
        let blocks: [JSONValue] = lines.map { line in
            let trimmed = line.trimmingCharacters(in: .whitespaces)
            if trimmed.hasPrefix("## ") {
                return paragraphNode(String(trimmed.dropFirst(3)).trimmingCharacters(in: .whitespaces))
            }
            if trimmed.hasPrefix("# ") {
                return paragraphNode(String(trimmed.dropFirst(2)).trimmingCharacters(in: .whitespaces))
            }
            if trimmed.hasPrefix("> ") {
                return paragraphNode(String(trimmed.dropFirst(2)).trimmingCharacters(in: .whitespaces))
            }
            if let range = trimmed.range(of: "^[-*]\\s+", options: .regularExpression) {
                return paragraphNode(String(trimmed[range.upperBound...]))
            }
            if let range = trimmed.range(of: "^\\d+\\.\\s+", options: .regularExpression) {
                return paragraphNode(String(trimmed[range.upperBound...]))
            }
            return paragraphNode(line)
        }
        let children = blocks.isEmpty ? [paragraphNode("")] : blocks
        return .object([
            "root": .object([
                "type": .string("root"), "version": .number(1),
                "children": .array(children),
                "direction": .null, "format": .string(""), "indent": .number(0),
            ]),
        ])
    }

    /// A Lexical root → its words, one line per top-level block.
    static func editorJsonToPlainText(_ editorJson: JSONValue?) -> String {
        guard let children = editorJson?["root"]?["children"]?.arrayValue, !children.isEmpty else {
            return ""
        }
        func textOf(_ node: JSONValue) -> String {
            if let text = node["text"]?.stringValue { return text }
            let kids = node["children"]?.arrayValue ?? []
            return kids.map(textOf).joined()
        }
        return children.map(textOf).joined(separator: "\n")
    }

    /// Convert the worker-era block JSON (a heading/paragraph carrying `text`
    /// directly, with no `children` array) into a proper serialised state.
    static func normaliseNotebookEditorJson(_ editorJson: JSONValue) -> JSONValue {
        guard let first = editorJson["root"]?["children"]?.arrayValue?.first else {
            return editorJson
        }
        if first["children"]?.arrayValue != nil { return editorJson }
        return plainTextToEditorJson(editorJsonToPlainText(editorJson))
    }

    /// The readable words of a note, from the best source it has.
    ///
    /// The web reads `plainText ?? editorJsonToPlainText(editorJson)`; this adds
    /// a last fall-back to the legacy `body` so a note that predates both fields
    /// still reads, rather than coming up blank before `ensure` has run.
    static func notePlainText(_ note: Note) -> String {
        if let plainText = note.plainText { return plainText }
        let fromJson = editorJsonToPlainText(note.editorJson)
        if !fromJson.isEmpty { return fromJson }
        return note.body ?? ""
    }

    /// Give a note the modern fields if it is missing them, from its `body`.
    static func ensureNotebookEditor(_ note: Note) -> Note {
        if note.editorJson != nil, note.plainText != nil { return note }
        let source = note.body ?? ""
        var ensured = note
        ensured.editorJson = plainTextToEditorJson(source)
        ensured.plainText = normaliseNewlines(source)
        ensured.legacyMarkdownSource = note.legacyMarkdownSource ?? source
        ensured.revision = note.revision ?? 1
        return ensured
    }

    /// Whitespace-separated word count — the measure a word processor shows.
    static func wordCount(_ text: String) -> Int {
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty { return 0 }
        return trimmed.split(whereSeparator: { $0.isWhitespace }).count
    }

    // MARK: - Editing

    /// Whether a note's body is only paragraphs of plain text — i.e. something
    /// this app's plain editor can rewrite without discarding structure it does
    /// not model. A heading, list, table or image makes it "rich".
    static func isSimple(_ editorJson: JSONValue?) -> Bool {
        guard let children = editorJson?["root"]?["children"]?.arrayValue else { return true }
        return children.allSatisfy { node in
            guard node["type"]?.stringValue == "paragraph" else { return false }
            let kids = node["children"]?.arrayValue ?? []
            return kids.allSatisfy { $0["type"]?.stringValue == "text" }
        }
    }

    /// Apply a plain-text edit to a note, keeping every field the editor does
    /// not touch. Regenerates `editorJson`/`plainText` from the text and bumps
    /// the revision; leaves `legacyMarkdownSource`, ink, refs, images intact.
    static func applyingEdit(to note: Note, title: String, text: String) -> Note {
        let normalised = normaliseNewlines(text)
        var edited = note
        edited.title = title
        edited.plainText = normalised
        edited.editorJson = plainTextToEditorJson(normalised)
        edited.legacyMarkdownSource = note.legacyMarkdownSource ?? normalised
        edited.revision = (note.revision ?? 0) + 1
        return edited
    }

    // MARK: -

    /// `\r\n` and lone `\r` → `\n`, matching the web's `/\r\n?/g` normalisation.
    private static func normaliseNewlines(_ text: String) -> String {
        text.replacingOccurrences(of: "\r\n", with: "\n")
            .replacingOccurrences(of: "\r", with: "\n")
    }
}

/// Reading a Lexical tree without unwrapping a switch at every level.
extension JSONValue {
    var objectValue: [String: JSONValue]? {
        if case .object(let value) = self { return value }
        return nil
    }

    var arrayValue: [JSONValue]? {
        if case .array(let value) = self { return value }
        return nil
    }

    var stringValue: String? {
        if case .string(let value) = self { return value }
        return nil
    }

    /// A child of an object node by key, so `node["root"]?["children"]` reads.
    subscript(_ key: String) -> JSONValue? {
        objectValue?[key]
    }
}
