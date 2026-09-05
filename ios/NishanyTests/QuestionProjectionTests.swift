import Foundation
import Testing
@testable import Nishany

/// Written against the shape live content actually has, which is not the shape
/// the TypeScript interfaces describe. The fixtures below mirror a real
/// published question.
struct QuestionProjectionTests {

    private func item(
        title: String = "What does this progression illustrate?",
        fields: [String: String] = [
            "Topic": "Blood flow and the microcirculation",
            "Difficulty": "Challenging",
            "Vignette": "Early in circulatory failure, constriction helps maintain pressure.",
            "Explanation": "The same constriction becomes harmful in isolation.",
        ],
        questionData: [String: Any]? = nil
    ) -> LedgerItem {
        let data: [String: Any] = questionData ?? [
            "correctAnswer": "C",
            "answers": [
                ["label": "A", "text": "That the compensations were misdirected", "explanation": "The early responses genuinely support pressure."],
                ["label": "B", "text": "That postcapillary constriction is always harmful", "explanation": "It is protective in combination."],
                ["label": "C", "text": "That a response protective in combination can harm alone", "explanation": "Correct."],
                ["label": "D", "text": "That the microcirculation is passive", "explanation": "It is not."],
                // Authored questions carry a fixed A–F block; the unused ones
                // arrive blank.
                ["label": "E", "text": "", "explanation": ""],
                ["label": "F", "text": "", "explanation": ""],
            ],
            "learningObjective": "Reason about a compensatory mechanism whose effect reverses.",
            "estimatedSeconds": 170,
            "libraryIds": ["A1", "A2"],
            "tags": ["mainConceptIds": ["C1"], "conceptIds": ["C1", "C2"]],
        ]
        return LedgerDecoder.decode([[
            "id": "Q1", "kind": "question", "title": title, "subjectId": "SYS_CVS",
            "status": "Published", "fields": fields, "questionData": data,
        ]]).items[0]
    }

    @Test("the stem is the item title, and the vignette comes from the fields")
    func realShape() throws {
        let question = try #require(QuestionProjection.project(item()))

        #expect(question.stem == "What does this progression illustrate?")
        #expect(question.vignette.hasPrefix("Early in circulatory failure"))
        #expect(question.explanation.hasPrefix("The same constriction"))
        #expect(question.difficulty == "Challenging")
        #expect(question.topic == "Blood flow and the microcirculation")
    }

    /// The A–F block is fixed, so unused labels arrive with empty text. Showing
    /// them would offer a student blank options to choose between.
    @Test("blank options are dropped")
    func dropsBlankOptions() throws {
        let question = try #require(QuestionProjection.project(item()))
        #expect(question.options.map(\.label) == ["A", "B", "C", "D"])
    }

    @Test("every option carries its own explanation")
    func perOptionExplanations() throws {
        let question = try #require(QuestionProjection.project(item()))
        let wrong = try #require(question.options.first { $0.label == "A" })
        #expect(wrong.explanation.hasPrefix("The early responses"),
                "a student who picked A needs to read why A is wrong")
    }

    @Test("the correct option is identified by its label")
    func marking() throws {
        let question = try #require(QuestionProjection.project(item()))
        #expect(question.correctLabel == "C")
        #expect(question.isCorrect("C"))
        #expect(!question.isCorrect("A"))
        #expect(question.correctOption?.text.hasPrefix("That a response protective") == true)
    }

    /// A question that cannot be marked is not a question. Rendering it would
    /// mark every attempt wrong, and the student would never know why.
    @Test("a question whose correct answer is not among its options is dropped")
    func unmarkable() {
        let broken = item(questionData: [
            "correctAnswer": "E",
            "answers": [["label": "A", "text": "Only option", "explanation": ""]],
        ])
        #expect(QuestionProjection.project(broken) == nil)
    }

    @Test("a question with no options is dropped")
    func noOptions() {
        #expect(QuestionProjection.project(item(questionData: ["correctAnswer": "A", "answers": []])) == nil)
        #expect(QuestionProjection.project(item(questionData: ["correctAnswer": "A"])) == nil)
    }

    @Test("a question with no stem is dropped")
    func noStem() {
        #expect(QuestionProjection.project(item(title: "   ")) == nil)
    }

    /// It names what is being tested, so it is held until the answer is shown.
    @Test("the learning objective and concepts are carried through")
    func metadata() throws {
        let question = try #require(QuestionProjection.project(item()))
        #expect(question.learningObjective?.hasPrefix("Reason about") == true)
        #expect(question.estimatedSeconds == 170)
        #expect(question.libraryIds == ["A1", "A2"])
        #expect(question.conceptIds == ["C1"], "mastery is credited to what the question assesses, not to context")
    }

    @Test("a missing vignette is not an error — some questions are bare recall")
    func optionalVignette() throws {
        let question = try #require(QuestionProjection.project(item(fields: ["Topic": "T", "Difficulty": "Easy"])))
        #expect(question.vignette.isEmpty)
        #expect(question.difficulty == "Easy")
    }

    @Test("only questions project")
    func onlyQuestions() {
        let article = LedgerDecoder.decode([[
            "id": "A1", "kind": "article", "title": "T", "subjectId": "S", "status": "Published",
        ]]).items[0]
        #expect(QuestionProjection.project(article) == nil)
    }
}
