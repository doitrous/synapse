import Foundation
import Testing
@testable import Nishany

/// The article-marks model, folds and anchoring.
///
/// The phone reads and writes the very same document the website does, so these
/// lock the JSON shape and the resolution rules to the web's `libraryMarks.ts`
/// and `textAnchor.ts`. A drift here does not throw — it puts a student's
/// highlight somewhere the other platform never draws it.
struct LibraryMarkTests {

    // MARK: - Contract

    @Test("the storage key is the web's, and routes to the student's store")
    func storageKey() {
        #expect(LibraryMarks.storageKey == "nishany.library.marks.v1")
        #expect(StateOwnership.isUserOwned(LibraryMarks.storageKey))
    }

    /// A document exactly as the website writes it must decode, re-encode and
    /// decode again unchanged — that is what web↔iOS interoperability means.
    @Test("a web-shaped document round-trips")
    func roundTrip() throws {
        let json = """
        {
          "art-1": [
            {
              "id": "mk-abc-1",
              "articleId": "art-1",
              "anchor": { "block": "block:2", "exact": "left ventricle", "prefix": "the ", "suffix": " pumps" },
              "tone": "amber",
              "note": "remember this",
              "createdAt": "2026-09-04T10:00:00.000Z"
            },
            {
              "id": "mk-abc-2",
              "articleId": "art-1",
              "anchor": { "block": "summary", "exact": "aorta", "prefix": "", "suffix": "" },
              "tone": "teal",
              "note": "",
              "createdAt": "2026-09-04T10:05:00.000Z"
            }
          ]
        }
        """.data(using: .utf8)!

        let store = try JSONDecoder().decode(LibraryMarkStore.self, from: json)
        #expect(store["art-1"]?.count == 2)
        let mark = try #require(store["art-1"]?.first)
        #expect(mark.id == "mk-abc-1")
        #expect(mark.anchor.exact == "left ventricle")
        #expect(mark.anchor.block == "block:2")
        #expect(mark.tone == "amber")
        #expect(mark.note == "remember this")

        let reencoded = try JSONEncoder().encode(store)
        let again = try JSONDecoder().decode(LibraryMarkStore.self, from: reencoded)
        #expect(again == store)
    }

    /// A tone this build does not offer must survive untouched rather than being
    /// coerced, so a note made on the web keeps its colour.
    @Test("an unknown tone round-trips rather than being normalised")
    func unknownToneKept() throws {
        let json = #"{"a":[{"id":"m1","articleId":"a","anchor":{"block":"b","exact":"x","prefix":"","suffix":""},"tone":"slate","note":"","createdAt":"t"}]}"#
        let store = try JSONDecoder().decode(LibraryMarkStore.self, from: Data(json.utf8))
        #expect(store["a"]?.first?.tone == "slate")
    }

    // MARK: - Anchoring

    @Test("an anchor keeps the words and a window of either side")
    func makeAnchorWindows() throws {
        let text = "The left ventricle pumps blood into the aorta."
        // "ventricle"
        let start = text.unicodeScalars.distance(
            from: text.unicodeScalars.startIndex,
            to: text.range(of: "ventricle")!.lowerBound.samePosition(in: text.unicodeScalars)!
        )
        let anchor = try #require(LibraryMarks.makeAnchor(block: "b", text: text, start: start, end: start + 9))
        #expect(anchor.exact == "ventricle")
        #expect(anchor.prefix == "The left ")
        #expect(anchor.suffix == " pumps blood into the aorta.")
    }

    @Test("an empty or out-of-bounds range makes no anchor")
    func makeAnchorGuards() {
        let text = "abc"
        #expect(LibraryMarks.makeAnchor(block: "b", text: text, start: 1, end: 1) == nil)
        #expect(LibraryMarks.makeAnchor(block: "b", text: text, start: 0, end: 9) == nil)
        #expect(LibraryMarks.makeAnchor(block: "b", text: text, start: -1, end: 2) == nil)
        #expect(LibraryMarks.makeAnchor(block: "b", text: "   ", start: 0, end: 3) == nil)
    }

    @Test("a single occurrence resolves to itself")
    func resolveSingle() throws {
        let anchor = TextAnchor(block: "b", exact: "aorta", prefix: "", suffix: "")
        let range = try #require(LibraryMarks.resolveAnchor("into the aorta now", anchor))
        #expect(range == TextRange(start: 9, end: 14))
    }

    /// The web's reason for keeping context at all: a phrase can occur more than
    /// once, and the surroundings decide which one a mark sits on.
    @Test("a repeated phrase resolves by its surrounding context")
    func resolveRepeatByContext() throws {
        let text = "the left ventricle and the right ventricle"
        let anchor = try #require(LibraryMarks.makeAnchor(
            block: "b", text: text,
            start: text.unicodeScalars.distance(from: text.unicodeScalars.startIndex,
                to: text.range(of: "ventricle", options: .backwards)!.lowerBound.samePosition(in: text.unicodeScalars)!),
            end: text.unicodeScalars.count
        ))
        // Anchored on the second "ventricle"; resolution must return the second.
        let range = try #require(LibraryMarks.resolveAnchor(text, anchor))
        #expect(range.start == 33)
    }

    @Test("a recased phrase still resolves, exact matches winning first")
    func resolveCaseInsensitive() throws {
        let anchor = TextAnchor(block: "b", exact: "Aorta", prefix: "", suffix: "")
        // No exact "Aorta"; the case-insensitive pass finds "aorta".
        let range = try #require(LibraryMarks.resolveAnchor("the aorta", anchor))
        #expect(range == TextRange(start: 4, end: 9))
    }

    @Test("a phrase that has been edited out resolves to nothing")
    func resolveGone() {
        let anchor = TextAnchor(block: "b", exact: "pulmonary vein", prefix: "", suffix: "")
        #expect(LibraryMarks.resolveAnchor("nothing of the sort here", anchor) == nil)
    }

    // MARK: - Store folds

    @Test("upsert adds, then replaces the same id in place")
    func upsertReplaces() {
        var store: LibraryMarkStore = [:]
        let a = mark(id: "m1", article: "art", exact: "one")
        let b = mark(id: "m2", article: "art", exact: "two")
        store = LibraryMarks.upsert(store, a)
        store = LibraryMarks.upsert(store, b)
        #expect(store["art"]?.map(\.id) == ["m1", "m2"])

        var edited = a; edited.note = "edited"
        store = LibraryMarks.upsert(store, edited)
        // Order preserved; not duplicated.
        #expect(store["art"]?.map(\.id) == ["m2", "m1"])
        #expect(store["art"]?.first { $0.id == "m1" }?.note == "edited")
    }

    @Test("removing the last mark drops the article's entry entirely")
    func removeClearsEntry() {
        var store = LibraryMarks.upsert([:], mark(id: "m1", article: "art", exact: "x"))
        store = LibraryMarks.remove(store, articleId: "art", markId: "m1")
        #expect(store["art"] == nil)
    }

    @Test("mark ids are unique in sequence")
    func idsAreUnique() {
        let a = LibraryMarks.newMarkId()
        let b = LibraryMarks.newMarkId()
        #expect(a != b)
        #expect(a.hasPrefix("mk-"))
    }

    // MARK: - Placement

    @Test("a mark is placed in the block its anchor names")
    func placeInOwnBlock() {
        let m = mark(id: "m1", article: "art", block: "p:1", exact: "aorta")
        let (placements, orphans) = LibraryMarks.place([m], in: [
            ("p:0", "the left ventricle"),
            ("p:1", "blood into the aorta"),
        ])
        #expect(orphans.isEmpty)
        #expect(placements["p:1"]?.count == 1)
        #expect(placements["p:0"] == nil)
        #expect(placements["p:1"]?.first?.range == TextRange(start: 15, end: 20))
    }

    /// A mark made on the web carries a block id this projection never uses, so
    /// it must still land in whichever block now holds its words.
    @Test("a mark whose block id is unknown falls back to the block with the words")
    func placeCrossPlatformFallback() {
        let m = mark(id: "m1", article: "art", block: "block:7", exact: "aorta")
        let (placements, orphans) = LibraryMarks.place([m], in: [
            ("p:0", "the left ventricle"),
            ("p:1", "blood into the aorta"),
        ])
        #expect(orphans.isEmpty)
        #expect(placements["p:1"]?.count == 1)
    }

    @Test("a mark whose words are gone from every block is an orphan, not misplaced")
    func placeOrphan() {
        let m = mark(id: "m1", article: "art", block: "p:0", exact: "pulmonary vein")
        let (placements, orphans) = LibraryMarks.place([m], in: [
            ("p:0", "the left ventricle"),
            ("p:1", "blood into the aorta"),
        ])
        #expect(placements.isEmpty)
        #expect(orphans.map(\.id) == ["m1"])
    }

    @Test("a phrase in two blocks is drawn once, not twice")
    func placeNoDoubleDraw() {
        // Anchor names p:1, and "aorta" is in both blocks.
        let m = mark(id: "m1", article: "art", block: "p:1", exact: "aorta")
        let (placements, _) = LibraryMarks.place([m], in: [
            ("p:0", "the aorta"),
            ("p:1", "the aorta"),
        ])
        let total = placements.values.reduce(0) { $0 + $1.count }
        #expect(total == 1)
        #expect(placements["p:1"]?.count == 1)
    }

    @Test("no marks and no blocks resolve to nothing, never a failure")
    func placeEmpty() {
        let (placements, orphans) = LibraryMarks.place([], in: [])
        #expect(placements.isEmpty)
        #expect(orphans.isEmpty)
    }

    // MARK: - Helpers

    private func mark(id: String, article: String, block: String = "b", exact: String) -> LibraryMark {
        LibraryMark(
            id: id, articleId: article,
            anchor: TextAnchor(block: block, exact: exact, prefix: "", suffix: ""),
            tone: "amber", note: "", createdAt: "2026-09-04T00:00:00.000Z"
        )
    }
}
