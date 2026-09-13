import Foundation
import Testing
@testable import Synapse

/// Guards the whiteboard sync fix: iOS speaks the live `boards.v1` document, and
/// a save preserves every element type — even the ink/pictures/files iOS does
/// not render — so editing a note on the phone never strips a web-authored board.
struct WhiteboardCollectionTests {
    private let now = ISO8601DateFormatter.synapse.date(from: "2026-08-29T09:00:00.000Z")!

    @Test func theKeyIsTheLiveBoardsKeyAndIsUserOwned() {
        #expect(whiteboardCollectionKey == "nishany.whiteboard.boards.v1")
        #expect(StateOwnership.isUserOwned(whiteboardCollectionKey))
        #expect(BoardState.legacyStorageKey == "nishany.whiteboard.board")
    }

    // MARK: lossless preservation

    private func richState() -> BoardState {
        BoardState(
            notes: [BoardNote(id: "n1", x: 10, y: 20, text: "Preload", tone: "teal")],
            links: [BoardLink(id: "l1", from: "n1", to: "n1", c1: nil, c2: nil)],
            frames: [BoardFrame(id: "f1", x: 0, y: 0, width: 100, height: 80, title: "Frame")],
            images: [BoardImage(id: "img1", x: 5, y: 5, width: 260, height: 180, documentId: "doc1", src: nil, alt: "diagram", sizeBytes: 4096)],
            files: [BoardFile(id: "file1", x: 1, y: 2, documentId: "doc2", name: "notes.pdf", sizeBytes: 9000, kind: "pdf")],
            ink: [InkStroke(id: "s1", points: [0, 0, 10, 10, 20, 5], color: "var(--color-primary)", width: 4)],
            readyItems: [ReadyElement(id: "r1", x: 3, y: 3, width: 48, height: 48, readyItemId: "heart")],
            inkAbove: true
        )
    }

    @Test func aFullBoardStateRoundTripsThroughJSON() throws {
        let state = richState()
        let data = try JSONEncoder().encode(state)
        let decoded = try JSONDecoder().decode(BoardState.self, from: data)
        #expect(decoded == state)
    }

    @Test func editingNotesKeepsInkPicturesAndFiles() throws {
        // Decode a board that has ink/pictures/files, change only the notes, and
        // confirm the untouched elements survive the re-encode — the data loss
        // the old single-key model caused.
        var state = richState()
        state.notes.append(BoardNote(id: "n2", x: 40, y: 40, text: "Added on iOS", tone: "rose"))
        let data = try JSONEncoder().encode(state)
        let decoded = try JSONDecoder().decode(BoardState.self, from: data)
        #expect(decoded.notes.count == 2)
        #expect(decoded.ink?.count == 1)
        #expect(decoded.images?.first?.documentId == "doc1")
        #expect(decoded.files?.first?.name == "notes.pdf")
        #expect(decoded.readyItems?.first?.readyItemId == "heart")
        #expect(decoded.inkAbove == true)
    }

    @Test func anEmptyBoardOmitsTheOptionalCollections() throws {
        let text = String(data: try JSONEncoder().encode(BoardState.empty), encoding: .utf8)!
        // Quoted keys so "links" does not count as a match for "ink".
        #expect(!text.contains("\"ink\""))
        #expect(!text.contains("\"images\""))
        #expect(!text.contains("\"inkAbove\""))
        #expect(!text.contains("\"files\""))
    }

    // MARK: migration + collection ops

    @Test func migratingAoneBoardDrawingFoldsItIntoTheDefaultBoard() {
        let legacy = richState()
        let empty = Whiteboards.emptyCollection(now: now)
        let migrated = Whiteboards.migrateSingleBoard(legacy, into: empty, owner: .local, now: now)
        #expect(migrated.migratedFromSingleBoard == true)
        #expect(migrated.boards.count == 1)
        #expect(migrated.boards[0].state == legacy)
        #expect(migrated.activeBoardId == migrated.boards[0].id)
    }

    @Test func migrationIsIdempotent() {
        let once = Whiteboards.migrateSingleBoard(richState(), into: Whiteboards.emptyCollection(now: now), owner: .local, now: now)
        let twice = Whiteboards.migrateSingleBoard(BoardState.empty, into: once, owner: .local, now: now)
        #expect(twice == once)
    }

    @Test func updateStateReplacesTheActiveBoardAndBumpsRevision() {
        let collection = Whiteboards.emptyCollection(now: now)
        let id = collection.activeBoardId
        var next = BoardState.empty
        next.notes = [BoardNote(id: "n1", x: 0, y: 0, text: "hi", tone: "paper")]
        let updated = Whiteboards.updateState(collection, id: id, next, now: now)
        #expect(updated.boards[0].state.notes.count == 1)
        #expect(updated.boards[0].revision == 2)
    }

    @Test func activeBoardFallsBackToTheFirstBoard() {
        var collection = Whiteboards.emptyCollection(now: now)
        collection.activeBoardId = "missing"
        #expect(Whiteboards.activeBoard(collection, now: now).id == collection.boards[0].id)
    }

    @Test func aCollectionRoundTripsThroughJSON() throws {
        var collection = Whiteboards.emptyCollection(now: now)
        collection = Whiteboards.updateState(collection, id: collection.activeBoardId, richState(), now: now)
        let decoded = try JSONDecoder().decode(WhiteboardCollection.self, from: JSONEncoder().encode(collection))
        #expect(decoded == collection)
    }
}
