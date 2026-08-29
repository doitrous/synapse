import Foundation
import Testing
@testable import Synapse

/// Pins the notebook text layer to the web's `notebook.test.ts`, and guards the
/// data-integrity invariant that made this port necessary: a note must survive
/// a decode → encode round-trip on the phone with every field — above all the
/// rich `editorJson` and any ink — byte-intact, or editing one note on the
/// phone would strip formatting from every note on the website.
struct NotebookEditorTests {

    // MARK: - Ported from notebook.test.ts

    @Test func legacyMarkdownIsPreservedButItsMarksDoNotEnterTheEditor() {
        let note = Note(id: "legacy", title: "Legacy", body: "# Heading\n- Point\n> Quote",
                        tags: [], updatedAt: "2026-01-01T00:00:00.000Z")
        let migrated = NotebookDoc.ensureNotebookEditor(note)
        #expect(migrated.legacyMarkdownSource == note.body)
        #expect(NotebookDoc.editorJsonToPlainText(migrated.editorJson) == "Heading\nPoint\nQuote")
    }

    @Test func newTextProducesALexicalCompatibleRoot() {
        let state = NotebookDoc.plainTextToEditorJson("First\nSecond")
        #expect(state["root"]?["type"]?.stringValue == "root")
        let firstBlock = state["root"]?["children"]?.arrayValue?.first
        #expect(firstBlock?["type"]?.stringValue == "paragraph")
        #expect(firstBlock?["children"]?.arrayValue?.first?["type"]?.stringValue == "text")
        #expect(NotebookDoc.editorJsonToPlainText(state) == "First\nSecond")
    }

    @Test func theTemporaryBlockJsonMigratesLazilyWithoutLosingItsWords() throws {
        let old = try decode(#"""
        {"root":{"type":"root","version":1,"children":[
          {"type":"heading","version":1,"text":"Clinical sequence"},
          {"type":"paragraph","version":1,"text":"Assess airway first."}
        ]}}
        """#)
        let next = NotebookDoc.normaliseNotebookEditorJson(old)
        #expect(NotebookDoc.editorJsonToPlainText(next) == "Clinical sequence\nAssess airway first.")
        // Every top-level block now carries a children array.
        #expect(next["root"]?["children"]?.arrayValue?.allSatisfy { $0["children"]?.arrayValue != nil } == true)
    }

    // MARK: - The lossless-round-trip guard (the reason for the port)

    private let richNoteJSON = #"""
    {
      "id": "n1",
      "title": "Heart failure",
      "editorJson": {
        "root": {
          "type": "root", "version": 1, "direction": null, "format": "", "indent": 0,
          "children": [
            { "type": "heading", "tag": "h2", "version": 1, "direction": null, "format": "", "indent": 0,
              "children": [ { "type": "text", "version": 1, "text": "Compensation", "detail": 0, "format": 1, "mode": "normal", "style": "" } ] },
            { "type": "list", "listType": "bullet", "start": 1, "tag": "ul", "version": 1, "direction": null, "format": "", "indent": 0,
              "children": [ { "type": "listitem", "value": 1, "version": 1, "direction": null, "format": "", "indent": 0,
                "children": [ { "type": "text", "version": 1, "text": "Preload", "detail": 0, "format": 0, "mode": "normal", "style": "" } ] } ] }
          ]
        }
      },
      "plainText": "Compensation\nPreload",
      "legacyMarkdownSource": "## Compensation\n- Preload",
      "revision": 3,
      "tags": ["cardio"],
      "imageDocumentId": "img_1",
      "drawing": { "placement": "over", "strokes": [ { "points": [1.5, 2.25, 3.75], "color": "#f00", "width": 2 } ] },
      "updatedAt": "2026-08-30T00:00:00.000Z"
    }
    """#

    @Test func aWebNoteSurvivesADecodeEncodeRoundTripWithEveryFieldIntact() throws {
        let note = try JSONDecoder().decode(Note.self, from: Data(richNoteJSON.utf8))

        // The website's save payload omits `body`; a required field would make
        // this throw. It decodes to nil and the rich fields are all present.
        #expect(note.body == nil)
        #expect(note.editorJson != nil)
        #expect(NotebookDoc.editorJsonToPlainText(note.editorJson) == "Compensation\nPreload")
        #expect(note.drawing?["placement"]?.stringValue == "over")
        #expect(note.drawing?["strokes"]?.arrayValue?.first?["color"]?.stringValue == "#f00")

        // The invariant: re-encoding and re-decoding changes nothing.
        let reencoded = try JSONEncoder().encode(note)
        let round = try JSONDecoder().decode(Note.self, from: reencoded)
        #expect(round == note)
    }

    @Test func aRichNoteIsDetectedAsNotSimple() throws {
        let rich = try JSONDecoder().decode(Note.self, from: Data(richNoteJSON.utf8))
        #expect(NotebookDoc.isSimple(rich.editorJson) == false)
        #expect(NotebookDoc.isSimple(NotebookDoc.plainTextToEditorJson("Just\nparagraphs")) == true)
        #expect(NotebookDoc.isSimple(nil) == true)
    }

    @Test func editingKeepsEveryFieldItDoesNotTouchAndBumpsTheRevision() throws {
        let base = try JSONDecoder().decode(Note.self, from: Data(richNoteJSON.utf8))
        let edited = NotebookDoc.applyingEdit(to: base, title: "New title", text: "Line one\nLine two")

        #expect(edited.title == "New title")
        #expect(edited.plainText == "Line one\nLine two")
        #expect(NotebookDoc.editorJsonToPlainText(edited.editorJson) == "Line one\nLine two")
        #expect(edited.revision == 4)                       // 3 + 1
        #expect(edited.drawing == base.drawing)             // ink carried through
        #expect(edited.imageDocumentId == "img_1")          // and pasted media
        #expect(edited.tags == ["cardio"])
        #expect(edited.legacyMarkdownSource == "## Compensation\n- Preload") // not overwritten
    }

    @Test func notePlainTextPrefersPlainTextThenFallsBack() {
        let modern = Note(id: "a", title: "t", plainText: "the words", tags: [], updatedAt: "")
        #expect(NotebookDoc.notePlainText(modern) == "the words")
        let legacy = Note(id: "b", title: "t", body: "old body", tags: [], updatedAt: "")
        #expect(NotebookDoc.notePlainText(legacy) == "old body")
    }

    @Test func wordCountMatchesTheStatusBarMeasure() {
        #expect(NotebookDoc.wordCount("") == 0)
        #expect(NotebookDoc.wordCount("   ") == 0)
        #expect(NotebookDoc.wordCount("one two   three\nfour") == 4)
    }

    // MARK: -

    private func decode(_ json: String) throws -> JSONValue {
        try JSONDecoder().decode(JSONValue.self, from: Data(json.utf8))
    }
}
