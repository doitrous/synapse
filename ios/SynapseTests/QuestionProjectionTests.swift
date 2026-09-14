import Foundation
import Testing
@testable import Synapse

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

    // MARK: - Written formats

    /// A written question carries no options — its `answers` are the fixed A–F
    /// placeholders, all blank — so the choice guard would drop it. The content
    /// is the mark scheme in `writtenParts`.
    private func writtenItem(
        format: String = "structured_written",
        writtenParts: Any? = [
            ["id": "part-a", "label": "a", "prompt": "Write the equation of MCHC.",
             "marks": 2, "expectedPoints": ["MCHC = Hb / Hct x 100"], "conceptIds": ["CON-HEM-1"]],
            ["id": "part-b", "label": "b", "prompt": "Define MCV.",
             "marks": 2, "expectedPoints": ["Average volume of a single red cell"], "conceptIds": [] as [String]],
        ]
    ) -> LedgerItem {
        var data: [String: Any] = [
            "format": format,
            "answers": [
                ["label": "A", "text": "", "explanation": ""],
                ["label": "B", "text": "", "explanation": ""],
            ],
            "correctAnswer": "A",
            "tags": ["mainConceptIds": ["Q-CONCEPT"]],
        ]
        if let writtenParts { data["writtenParts"] = writtenParts }
        return item(title: "Write the equation used to calculate MCHC, and define MCV.", questionData: data)
    }

    @Test("a written question is kept, not dropped for having no options")
    func writtenKept() throws {
        let q = try #require(QuestionProjection.project(writtenItem()))
        #expect(q.isWritten)
        #expect(q.options.isEmpty)
        // Graded through the same path an option takes: its own answer counts.
        #expect(q.correctLabel == Question.selfCorrectLabel)
        #expect(q.isCorrect(Question.selfCorrectLabel))
        #expect(!q.isCorrect(Question.selfReviewLabel))
    }

    @Test("the marked subparts and their totals are read")
    func writtenParts() throws {
        let q = try #require(QuestionProjection.project(writtenItem()))
        #expect(q.writtenParts.map(\.label) == ["a", "b"])
        #expect(q.writtenParts[0].prompt.hasPrefix("Write the equation"))
        #expect(q.writtenParts[0].expectedPoints == ["MCHC = Hb / Hct x 100"])
        #expect(q.totalMarks == 4)
    }

    @Test("a written question's concepts are its own plus every part's")
    func writtenConceptUnion() throws {
        let q = try #require(QuestionProjection.project(writtenItem()))
        #expect(Set(q.conceptIds) == ["Q-CONCEPT", "CON-HEM-1"],
                "mastery for a written question credits the question and each marked part")
    }

    /// A paper often prints a written question whose mark scheme was never
    /// published. Losing the question because its answer is unknown is the wrong
    /// trade — it is still worth putting in front of a student.
    @Test("a written question with no parts still projects")
    func writtenNoParts() throws {
        let q = try #require(QuestionProjection.project(writtenItem(writtenParts: nil)))
        #expect(q.isWritten)
        #expect(q.writtenParts.isEmpty)
    }

    /// Matching and completion have no runner yet, and their `answers` are blank
    /// placeholders, so they fall through to the choice guard and are dropped —
    /// a missing question is better than a set of blank buttons.
    @Test("a non-written format with no real options is still dropped")
    func unrunnableFormatsDropped() {
        #expect(QuestionProjection.project(writtenItem(format: "matching", writtenParts: nil)) == nil)
        #expect(QuestionProjection.project(writtenItem(format: "completion", writtenParts: nil)) == nil)
    }

    @Test("an ordinary MCQ still reports its format and no written parts")
    func choiceFormatUnchanged() throws {
        let q = try #require(QuestionProjection.project(item()))
        #expect(!q.isWritten)
        #expect(q.format == "mcq_single_best")
        #expect(q.writtenParts.isEmpty)
    }
}
