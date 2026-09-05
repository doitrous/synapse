import Foundation

/// The wire types for the Question-of-the-Day endpoints (`/api/qotd/*`).
///
/// Property names match the server JSON exactly (camelCase), because the shared
/// `NishanyAPI.decoder` applies no key strategy. `date` and `history` are kept
/// as strings — they are calendar dates (`YYYY-MM-DD`), not instants, so they do
/// not go through the decoder's ISO-8601 date strategy.
///
/// The question BODY is deliberately absent here: `today` names the day's
/// `questionId`, and the app resolves the question from the local published
/// ledger by that id, exactly as the question bank does.

/// `GET /api/qotd/today`
struct QotdToday: Decodable, Equatable, Sendable {
    let date: String
    let questionId: String?
    let answered: Bool
    let answerIndex: Int?
    let correct: Bool?
    let current: Int
    let longest: Int
    let history: [String]
}

/// `POST /api/qotd/answer` result. `correctIndex` is a position in the question's
/// option list (blank options dropped, same order the server marks against), not
/// a label — map it with `question.options[correctIndex].label`.
struct QotdAnswerResult: Decodable, Equatable, Sendable {
    let correct: Bool
    let correctIndex: Int
    let current: Int
    let longest: Int
}

/// `GET /api/qotd/leaderboard`
struct QotdLeaderboard: Decodable, Equatable, Sendable {
    struct Scope: Decodable, Equatable, Sendable {
        let universityId: String
        let year: String
    }

    struct Row: Decodable, Equatable, Sendable, Identifiable {
        let rank: Int
        let userId: String
        let username: String
        let profileIcon: String?
        let current: Int
        let totalCorrect: Int
        let totalAnswered: Int
        var id: String { userId }
    }

    struct Viewer: Decodable, Equatable, Sendable {
        let rank: Int?
        let total: Int
        let current: Int
    }

    let scope: Scope
    let rows: [Row]
    let viewer: Viewer
}

/// `GET /api/qotd/friends`
struct QotdFriends: Decodable, Equatable, Sendable {
    struct Friend: Decodable, Equatable, Sendable, Identifiable {
        let userId: String
        let name: String
        let answered: Bool
        /// `nil` until the viewer has answered today — no spoilers.
        let correct: Bool?
        var id: String { userId }
    }

    let date: String
    let viewerAnswered: Bool
    let friends: [Friend]
}
