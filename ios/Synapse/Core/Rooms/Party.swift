import Foundation

/// A study party — the live-hall room the web calls "Study Rooms".
///
/// Mirrors `partyFor` in `server/src/parties.js`: the full room, including its
/// member list. Distinct from `StudyRoom` (the shared-quiz "Study Together"
/// system, `server/src/studyRooms.js`), which shares the name and nothing else.
struct Party: Decodable, Equatable, Identifiable, Sendable {
    let id: String
    let code: String
    let name: String
    let hostUserId: String?
    let isHost: Bool?
    let visibility: String
    let layoutKey: String?
    let scope: String?
    let capacity: Int?
    let members: [RoomMember]

    var host: Bool { isHost ?? false }
}

/// A party in a browsable list (`myParties` / `openParties`). Here `members` is
/// a count, not the roster — the list endpoints send a number.
struct PartySummary: Decodable, Equatable, Identifiable, Sendable {
    let id: String
    let code: String
    let name: String
    let isHost: Bool?
    let capacity: Int?
    let members: Int

    var host: Bool { isHost ?? false }
}

/// What every mutating party call answers with. Refusals come back as
/// `{ ok: false, reason }` rather than HTTP errors, so a caller that only checks
/// the status code would treat "that code does not exist" as success.
struct PartyMutation: Decodable, Sendable {
    let ok: Bool?
    let reason: String?
    let party: Party?

    var succeeded: Bool { ok != false }

    /// The refusal in words a student can act on.
    var message: String? {
        guard let reason, ok == false else { return nil }
        return switch reason {
        case "no_cohort": "Your year isn't set up for rooms yet."
        case "room_full": "That room is full."
        case "not_found": "No room with that code."
        case "not_a_member": "You're not in that room."
        case "not_host": "Only the host can do that."
        case "code_collision", "invalid_room_options": "Couldn't create the room."
        default: "That didn't work."
        }
    }
}
