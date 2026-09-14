import Foundation
import Testing
@testable import Synapse

/// Written questions are self-graded: there is no option to auto-mark, so the
/// student reveals the mark scheme and grades their own answer. These lock the
/// grade to the same accuracy/ledger path an option takes, so nothing
/// downstream needs a special case.
@MainActor
struct WrittenQuestionTests {

    private func written(id: String = "W1") -> Question {
        Question(
            id: id, subjectId: "S", topic: "Blood", difficulty: "Moderate",
            vignette: "", stem: "Define MCV.", options: [],
            correctLabel: Question.selfCorrectLabel, explanation: "The average volume of a red cell.",
            learningObjective: nil, estimatedSeconds: nil, libraryIds: [], conceptIds: ["C1"],
            format: "short_answer",
            writtenParts: [WrittenPart(id: "part-a", label: "a", prompt: "Define MCV.",
                                       marks: 2, expectedPoints: ["Average volume of one red cell"], conceptIds: [])]
        )
    }

    private func model() throws -> QuestionBankModel {
        let store = try LocalStore(path: nil)
        let server = StubServer { _ in .init(body: Data("{\"ok\":true}".utf8)) }
        return QuestionBankModel(store: store, sync: SyncEngine(api: server.api, store: store))
    }

    @Test("the mark scheme is hidden until revealed")
    func revealIsSeparateFromGrading() throws {
        let m = try model()
        m.start(questions: [written()])
        let q = try #require(m.current)
        #expect(!m.isWrittenRevealed(q), "grading blind is not grading")
        m.revealWritten()
        #expect(m.isWrittenRevealed(q))
        #expect(m.writtenGrade(q) == nil, "revealing is not yet a grade")
    }

    @Test("\"I knew this\" grades correct through the ordinary accuracy path")
    func knewItIsCorrect() throws {
        let m = try model()
        m.start(questions: [written()])
        m.selfMark(knewIt: true)
        let q = try #require(m.current)
        #expect(m.writtenGrade(q) == true)
        #expect(m.answers.count == 1)
        #expect(m.answers.first?.isCorrect == true)
        #expect(m.correctCount == 1)
    }

    @Test("\"Needs review\" grades wrong")
    func reviewIsWrong() throws {
        let m = try model()
        m.start(questions: [written()])
        m.selfMark(knewIt: false)
        let q = try #require(m.current)
        #expect(m.writtenGrade(q) == false)
        #expect(m.answers.first?.isCorrect == false)
        #expect(m.correctCount == 0)
    }

    @Test("a grade is irreversible, like committing to an option")
    func gradeIsFinal() throws {
        let m = try model()
        m.start(questions: [written()])
        m.selfMark(knewIt: true)
        m.selfMark(knewIt: false)
        let q = try #require(m.current)
        #expect(m.writtenGrade(q) == true, "the first grade stands; a written answer is not re-marked")
        #expect(m.answers.count == 1)
    }

    /// Marking counts the question as answered for the navigator, so it is not
    /// nagged about as an omitted question.
    @Test("a graded written question reads as answered")
    func gradedReadsAnswered() throws {
        let m = try model()
        m.start(questions: [written(), written(id: "W2")])
        m.selfMark(knewIt: true)
        #expect(m.answeredCount == 1)
    }
}
