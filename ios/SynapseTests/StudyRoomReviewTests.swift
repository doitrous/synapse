import Foundation
import Testing
@testable import Synapse

/// Reading a shared sitting back afterwards.
///
/// The split these pin: the **verdict** comes from the server's record of what
/// the student answered, and only *which option is the right one* is read from
/// the published question. A question edited after the sitting must not
/// retrospectively change whether an answer was marked right.
@MainActor
struct StudyRoomReviewTests {

    private func option(_ label: String, _ text: String) -> AnswerOption {
        AnswerOption(label: label, text: text, explanation: "because")
    }

    private func question(_ id: String, correct: String) -> Question {
        Question(
            id: id, subjectId: "cvs", topic: "t", difficulty: "Easy",
            vignette: "", stem: "Stem \(id)",
            options: [option("A", "One"), option("B", "Two"), option("C", "Three")],
            correctLabel: correct, explanation: "overall",
            learningObjective: nil, estimatedSeconds: nil, libraryIds: [], conceptIds: []
        )
    }

    /// `Reviewed` is a value, so it can be exercised without a room or a server.
    private func reviewed(_ question: Question, chose: Int, correct: Bool) -> StudyRoomModel.Reviewed {
        StudyRoomModel.Reviewed(
            question: question,
            answer: StudyRoom.Answer(questionId: question.id, chosenIndex: chose, correct: correct)
        )
    }

    @Test func theRightOptionIsFoundByItsLabel() {
        #expect(reviewed(question("q1", correct: "A"), chose: 0, correct: true).correctIndex == 0)
        #expect(reviewed(question("q1", correct: "B"), chose: 0, correct: false).correctIndex == 1)
        #expect(reviewed(question("q1", correct: "C"), chose: 0, correct: false).correctIndex == 2)
    }

    /// The one that matters. If a question's key were edited after the sitting,
    /// the student's answer was still marked however the server marked it —
    /// the review may show a different option as right, but it must not
    /// silently rewrite the verdict they were given.
    @Test func theVerdictComesFromTheRecordNotTheQuestion() {
        // Answered option A, marked right by the server. The published question
        // now says B is correct.
        let row = reviewed(question("q1", correct: "B"), chose: 0, correct: true)

        #expect(row.answer.correct)
        #expect(row.answer.chosenIndex == 0)
        #expect(row.correctIndex == 1)
    }

    /// A question whose key no longer matches any option leaves the review
    /// unable to point at a right answer, rather than pointing at the wrong one.
    @Test func aMissingKeyPointsAtNothing() {
        #expect(reviewed(question("q1", correct: "Z"), chose: 0, correct: false).correctIndex == nil)
    }
}

extension StudyRoomReviewTests {

    /// Handing in leaves anything untouched recorded as not correct, with no
    /// option behind it. Telling a student they "got this wrong" about a
    /// question nobody answered blames them for a mistake they did not make.
    @Test func aQuestionNobodyAnsweredIsNotAWrongAnswer() {
        let unanswered = reviewed(question("q1", correct: "A"), chose: -1, correct: false)
        #expect(!unanswered.wasAnswered)

        let answered = reviewed(question("q1", correct: "A"), chose: 2, correct: false)
        #expect(answered.wasAnswered)
    }

    @Test func anOptionIndexPastTheEndIsNotAnAnswerEither() {
        #expect(!reviewed(question("q1", correct: "A"), chose: 99, correct: false).wasAnswered)
    }
}
