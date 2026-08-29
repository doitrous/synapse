import Foundation
import Testing
@testable import Synapse

/// The QotD wire types decode straight from the server's camelCase JSON. `date`
/// and `history` stay strings (calendar dates), and `answerIndex`/`correctIndex`
/// are option positions, not labels — the fields most likely to be got wrong.
struct QotdDecoderTests {

    private func decode<T: Decodable>(_ type: T.Type, _ json: String) throws -> T {
        try JSONDecoder().decode(T.self, from: Data(json.utf8))
    }

    @Test("today decodes, keeping questionId optional and history as strings")
    func todayDecodes() throws {
        let today = try decode(QotdToday.self, """
        {"date":"2026-08-29","questionId":"q-hf-1","answered":true,"answerIndex":1,
         "correct":true,"current":3,"longest":5,"history":["2026-08-29","2026-08-28"]}
        """)
        #expect(today.date == "2026-08-29")
        #expect(today.questionId == "q-hf-1")
        #expect(today.answered)
        #expect(today.answerIndex == 1)
        #expect(today.current == 3)
        #expect(today.history == ["2026-08-29", "2026-08-28"])
    }

    @Test("today tolerates a null questionId (no question for the cohort today)")
    func todayNullQuestion() throws {
        let today = try decode(QotdToday.self, """
        {"date":"2026-08-29","questionId":null,"answered":false,"answerIndex":null,
         "correct":null,"current":0,"longest":0,"history":[]}
        """)
        #expect(today.questionId == nil)
        #expect(today.answerIndex == nil)
        #expect(today.correct == nil)
        #expect(today.history.isEmpty)
    }

    @Test("answer result carries the server-marked correctIndex")
    func answerDecodes() throws {
        let result = try decode(QotdAnswerResult.self, """
        {"correct":false,"correctIndex":2,"current":0,"longest":5}
        """)
        #expect(!result.correct)
        #expect(result.correctIndex == 2)
        #expect(result.longest == 5)
    }

    @Test("leaderboard decodes scope, rows, and viewer standing")
    func leaderboardDecodes() throws {
        let board = try decode(QotdLeaderboard.self, """
        {"scope":{"universityId":"kau","year":"Year 2"},
         "rows":[{"rank":1,"userId":"u1","username":"amir","profileIcon":null,
                  "current":7,"totalCorrect":20,"totalAnswered":22}],
         "viewer":{"rank":4,"total":30,"current":3}}
        """)
        #expect(board.scope.universityId == "kau")
        #expect(board.rows.first?.rank == 1)
        #expect(board.rows.first?.username == "amir")
        #expect(board.rows.first?.profileIcon == nil)
        #expect(board.viewer.rank == 4)
        #expect(board.viewer.total == 30)
    }

    @Test("friends withhold correctness with a null until the viewer answers")
    func friendsDecodes() throws {
        let friends = try decode(QotdFriends.self, """
        {"date":"2026-08-29","viewerAnswered":false,
         "friends":[{"userId":"u2","name":"Sara","answered":true,"correct":null}]}
        """)
        #expect(!friends.viewerAnswered)
        #expect(friends.friends.first?.name == "Sara")
        #expect(friends.friends.first?.answered == true)
        #expect(friends.friends.first?.correct == nil)
    }
}
