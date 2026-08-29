import Foundation

/// The multi-board whiteboard document, ported from `src/data/whiteboard.ts`.
///
/// The live web app keeps every student's boards in one document under
/// `synapse.whiteboard.boards.v1`; the single-board `synapse.whiteboard.board`
/// key is retired. iOS was still on the retired key, so a board made on the
/// website never reached the phone and vice versa. This models the current shape
/// so the two platforms share boards again — and preserves every element type on
/// the round trip, even the ones iOS does not render yet, so saving from the
/// phone never strips a board of its web-authored ink or pictures.

/// The board key the live web reads and writes.
let whiteboardCollectionKey = "synapse.whiteboard.boards.v1"

struct WhiteboardCollaborator: Codable, Equatable, Sendable {
    var userId: String
    var username: String
    var icon: String?
    /// "view" | "edit"; a string so a new permission never fails the decode.
    var permission: String
}

struct WhiteboardDocument: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var title: String
    var state: BoardState
    var ownerId: String
    var ownerName: String
    var universityId: String
    var year: String
    /// "owner" | "view" | "edit", kept as a string for forward-compatibility.
    var permission: String
    var collaborators: [WhiteboardCollaborator]
    var topics: [String]
    var stars: [String]
    var follows: [String]
    var revision: Int
    var updatedAt: String
}

struct WhiteboardCollection: Codable, Equatable, Sendable {
    var activeBoardId: String
    var boards: [WhiteboardDocument]
    var sharedBoards: [WhiteboardDocument]
    var migratedFromSingleBoard: Bool
}

/// Owner identity stamped onto a new board.
struct WhiteboardOwner: Equatable, Sendable {
    var ownerId: String
    var ownerName: String
    var universityId: String
    var year: String

    static let local = WhiteboardOwner(ownerId: "local-student", ownerName: "Student", universityId: "", year: "")
}

/// Pure collection operations, mirroring `whiteboard.ts`. Every function takes
/// `now` explicitly and mutates nothing.
enum Whiteboards {

    private static func iso(_ now: Date) -> String { ISO8601DateFormatter.synapse.string(from: now) }

    static func createDocument(
        id: String, title: String, state: BoardState = .empty,
        owner: WhiteboardOwner, now: Date
    ) -> WhiteboardDocument {
        WhiteboardDocument(
            id: id, title: title, state: state,
            ownerId: owner.ownerId, ownerName: owner.ownerName,
            universityId: owner.universityId, year: owner.year,
            permission: "owner", collaborators: [], topics: [], stars: [], follows: [],
            revision: 1, updatedAt: iso(now)
        )
    }

    static func emptyCollection(owner: WhiteboardOwner = .local, now: Date) -> WhiteboardCollection {
        let board = createDocument(id: "default", title: "Default board", owner: owner, now: now)
        return WhiteboardCollection(activeBoardId: board.id, boards: [board], sharedBoards: [], migratedFromSingleBoard: false)
    }

    /// Fold a retired single-board state into the collection, once. Matches
    /// `migrateSingleBoardToCollection`: the legacy drawing becomes the first
    /// board, keeping that board's id/title if the collection already had one.
    static func migrateSingleBoard(
        _ legacy: BoardState, into collection: WhiteboardCollection,
        owner: WhiteboardOwner, now: Date
    ) -> WhiteboardCollection {
        guard !collection.migratedFromSingleBoard else { return collection }
        let defaultBoard = createDocument(id: "default", title: "Default board", state: legacy, owner: owner, now: now)
        var next = collection
        if collection.boards.isEmpty {
            next.boards = [defaultBoard]
        } else {
            next.boards = collection.boards.enumerated().map { index, board in
                guard index == 0 else { return board }
                var merged = defaultBoard
                merged.id = board.id
                merged.title = board.title.isEmpty ? defaultBoard.title : board.title
                return merged
            }
        }
        next.activeBoardId = collection.activeBoardId.isEmpty ? defaultBoard.id : collection.activeBoardId
        next.migratedFromSingleBoard = true
        return next
    }

    /// The active board, falling back to the first, then to a fresh default.
    static func activeBoard(_ collection: WhiteboardCollection, now: Date) -> WhiteboardDocument {
        collection.boards.first { $0.id == collection.activeBoardId }
            ?? collection.boards.first
            ?? createDocument(id: "default", title: "Default board", owner: .local, now: now)
    }

    static func updateState(_ collection: WhiteboardCollection, id: String, _ next: BoardState, now: Date) -> WhiteboardCollection {
        var c = collection
        c.boards = collection.boards.map { board in
            guard board.id == id else { return board }
            var b = board
            b.state = next
            b.revision += 1
            b.updatedAt = iso(now)
            return b
        }
        return c
    }

    static func addBoard(_ collection: WhiteboardCollection, _ board: WhiteboardDocument) -> WhiteboardCollection {
        var c = collection
        c.boards.append(board)
        c.activeBoardId = board.id
        return c
    }

    static func renameBoard(_ collection: WhiteboardCollection, id: String, title: String, now: Date) -> WhiteboardCollection {
        let cleaned = title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "Untitled board" : title.trimmingCharacters(in: .whitespacesAndNewlines)
        var c = collection
        c.boards = collection.boards.map { board in
            guard board.id == id else { return board }
            var b = board
            b.title = cleaned
            b.revision += 1
            b.updatedAt = iso(now)
            return b
        }
        return c
    }

    static func removeBoard(_ collection: WhiteboardCollection, id: String) -> WhiteboardCollection {
        guard collection.boards.count > 1 else { return collection }
        var c = collection
        c.boards = collection.boards.filter { $0.id != id }
        if collection.activeBoardId == id { c.activeBoardId = c.boards[0].id }
        return c
    }
}
