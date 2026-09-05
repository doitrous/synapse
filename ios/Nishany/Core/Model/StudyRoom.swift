import Foundation

/// A shared test, as the server describes it.
///
/// Mirrors the payload built in `server/src/studyRooms.js`. Two of its rules
/// are load-bearing and are the reason fields are optional here:
///
/// - `questionIds` is empty while the room is in the lobby, so nobody can read
///   ahead before everyone has joined;
/// - another member's `correct` is null until results open, so nobody watches
///   a friend's score climb while they are still sitting it.
struct StudyRoom: Decodable, Equatable, Identifiable, Sendable {
    let id: String
    let code: String
    let name: String
    let isHost: Bool
    /// `lobby`, `running`, or `closed`.
    let status: String
    let timed: Bool
    let secondsPerQuestion: Int?
    let questionCount: Int
    /// Empty in the lobby, by design.
    let questionIds: [String]
    let resultsOpen: Bool
    let members: [Member]
    let myAnswers: [Answer]
    let myFinished: Bool

    struct Member: Decodable, Equatable, Identifiable, Sendable {
        let userId: String
        let displayName: String?
        let finished: Bool
        let answered: Int
        /// Null until results open, for everyone but yourself.
        let correct: Int?

        var id: String { userId }
        var name: String { displayName?.nilIfEmpty ?? "Student" }
    }

    struct Answer: Decodable, Equatable, Sendable {
        let questionId: String
        let chosenIndex: Int
        let correct: Bool
    }

    var isLobby: Bool { status == "lobby" }
    var answeredIds: Set<String> { Set(myAnswers.map(\.questionId)) }
}

/// A room in the student's list.
struct RoomSummary: Decodable, Equatable, Identifiable, Sendable {
    let id: String
    let code: String
    let name: String
    let status: String
    let questionCount: Int
}

/// What every mutating room call answers with.
///
/// The server reports refusals as `{ ok: false, reason }` rather than as HTTP
/// errors, so a caller that only checks the status code would treat "that code
/// does not exist" as success.
struct RoomMutation: Decodable, Equatable, Sendable {
    let ok: Bool?
    let reason: String?
    let room: StudyRoom?
    let id: String?

    var succeeded: Bool { ok != false }

    /// The refusal in words a student can act on.
    var message: String? {
        guard let reason, ok == false else { return nil }
        return switch reason {
        case "no_questions": "Pick at least one question first."
        case "not_found": "No room with that code."
        case "already_started": "That test has already started."
        case "not_started": "The host has not started it yet."
        case "not_a_member": "You are not in that room."
        case "already_finished": "You have already finished this one."
        case "not_in_room": "That question is not part of this test."
        case "not_host": "Only the host can start it."
        default: "That did not work."
        }
    }
}
