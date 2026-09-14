import Foundation

/// One answer option, with the explanation for choosing it.
///
/// Every option carries its own explanation, not just the correct one — that
/// is the point of the question bank. A student who picked B learns why B is
/// wrong, which is the thing they actually needed to read.
struct AnswerOption: Identifiable, Equatable, Sendable {
    let label: String
    let text: String
    let explanation: String

    var id: String { label }
}

/// One marked subpart of a written question.
///
/// A port of `WrittenPart` in `src/data/questionFormat.ts`. A faculty written
/// question is rarely one prompt — it is "(a) enumerate the contents of the
/// femoral triangle [5 marks]; (b) …" — and the marks and the components an
/// answer must contain are the question. `marks` is a `Double` on purpose: a
/// paper that spreads one total over four subparts gives each 0.75.
struct WrittenPart: Identifiable, Equatable, Sendable {
    let id: String
    /// `a`, `b`, `i` — as the paper labels it.
    let label: String
    let prompt: String
    let marks: Double
    /// What an answer must contain to earn the marks, one per line — a mark
    /// scheme, not a model essay. May be empty when the paper never published one.
    let expectedPoints: [String]
    let conceptIds: [String]
}

/// A question as a student sits it.
struct Question: Identifiable, Equatable, Sendable {
    let id: String
    let subjectId: String
    /// The chapter this question was filed under.
    let topic: String
    let difficulty: String
    /// The clinical scenario. May be empty for a bare recall question.
    let vignette: String
    /// The question itself.
    let stem: String
    let options: [AnswerOption]
    /// The label of the correct option, e.g. "C". For a written question this
    /// is the `selfCorrectLabel` sentinel, so a student's own "I knew this"
    /// grades correct through the same path an option does.
    let correctLabel: String
    /// The overall explanation, shown once the answer is revealed.
    let explanation: String
    /// Held back until the answer is revealed — it names what is being tested,
    /// so showing it first gives the answer away.
    let learningObjective: String?
    let estimatedSeconds: Int?
    /// Library articles this question tests.
    let libraryIds: [String]
    /// The concepts it actually assesses, for the mastery ledger.
    let conceptIds: [String]
    /// The web `questionData.format` slug. `var` with a default so every
    /// existing call site and the whole choice-format path stay untouched — the
    /// synthesised memberwise init only offers a defaulted parameter for a `var`.
    var format: String = "mcq_single_best"
    /// The marked subparts, when this is a written question. Empty otherwise.
    var writtenParts: [WrittenPart] = []

    /// Written formats are answered in prose and self-graded, so they render
    /// their mark scheme rather than a set of options. A port of
    /// `WRITTEN_FORMATS`.
    static let writtenFormats: Set<String> = [
        "short_answer", "structured_written", "multipart_written",
        "comparison_table", "essay",
    ]

    /// The two sentinels a self-graded question grades against. Chosen so no
    /// authored option label (`A`, `B`, …) can collide with them.
    static let selfCorrectLabel = "__self_correct__"
    static let selfReviewLabel = "__self_review__"

    var isWritten: Bool { Self.writtenFormats.contains(format) }

    /// Total marks a written question carries, as its parts add up.
    var totalMarks: Double { writtenParts.reduce(0) { $0 + $1.marks } }

    var correctOption: AnswerOption? { options.first { $0.label == correctLabel } }

    func isCorrect(_ label: String) -> Bool { label == correctLabel }
}

/// Builds a sittable question from a ledger item.
///
/// Written against the shape the authoring pipeline actually writes, which is
/// not the shape the TypeScript interfaces suggest. In live content the stem is
/// the item's `title`, and the vignette and explanation are in `fields` — the
/// `vignette`, `stem` and `explanation` keys inside `questionData` are unused
/// across every published question. Reading those would render blank questions
/// and nothing would report an error.
enum QuestionProjection {

    static func project(_ item: LedgerItem) -> Question? {
        guard item.kind == .question else { return nil }
        guard let record = try? JSONSerialization.jsonObject(with: item.raw) as? [String: Any] else { return nil }

        let data = record["questionData"] as? [String: Any] ?? [:]
        let fields = record["fields"] as? [String: String] ?? [:]
        let tags = data["tags"] as? [String: Any] ?? [:]

        let format = (data["format"] as? String)?.trimmed.nilIfEmpty ?? "mcq_single_best"
        let stem = item.title.trimmed
        guard !stem.isEmpty else { return nil }

        let conceptIds = tags["mainConceptIds"] as? [String]
            ?? tags["conceptIds"] as? [String]
            ?? []

        // A written question is answered in prose and self-graded, so it has no
        // options and cannot be dropped for lacking them. Its content is the
        // mark scheme in `writtenParts`. Only formats there is actually a runner
        // for arrive here; matching/completion still have no options and fall
        // through to the choice guard below, which drops them (better a missing
        // question than a set of blank buttons) until they have a runner.
        if Question.writtenFormats.contains(format) {
            let parts = self.writtenParts(from: data["writtenParts"])
            // Its own concepts, plus every part's — each part is co-primary.
            let allConcepts = Array(Set(conceptIds + parts.flatMap(\.conceptIds)))
            return Question(
                id: item.id,
                subjectId: item.subjectId,
                topic: fields["Topic"]?.trimmed ?? "",
                difficulty: fields["Difficulty"]?.trimmed ?? "Moderate",
                vignette: fields["Vignette"]?.trimmed ?? "",
                stem: stem,
                options: [],
                correctLabel: Question.selfCorrectLabel,
                explanation: fields["Explanation"]?.trimmed ?? "",
                learningObjective: (data["learningObjective"] as? String)?.trimmed.nilIfEmpty,
                estimatedSeconds: data["estimatedSeconds"] as? Int,
                libraryIds: data["libraryIds"] as? [String] ?? [],
                conceptIds: allConcepts,
                format: format,
                writtenParts: parts
            )
        }

        let options = self.options(from: data["answers"])
        let correctLabel = (data["correctAnswer"] as? String)?.trimmed ?? ""

        // A choice question whose correct answer is not among its options cannot
        // be marked, so it is not a question — it is a broken record, and showing
        // it would mark every attempt wrong.
        guard !options.isEmpty, options.contains(where: { $0.label == correctLabel }) else { return nil }

        return Question(
            id: item.id,
            subjectId: item.subjectId,
            topic: fields["Topic"]?.trimmed ?? "",
            difficulty: fields["Difficulty"]?.trimmed ?? "Moderate",
            vignette: fields["Vignette"]?.trimmed ?? "",
            stem: stem,
            options: options,
            correctLabel: correctLabel,
            explanation: fields["Explanation"]?.trimmed ?? "",
            learningObjective: (data["learningObjective"] as? String)?.trimmed.nilIfEmpty,
            estimatedSeconds: data["estimatedSeconds"] as? Int,
            libraryIds: data["libraryIds"] as? [String] ?? [],
            conceptIds: conceptIds,
            format: format
        )
    }

    /// Read the marked subparts of a written question straight from the stored
    /// `writtenParts` array (the import side already parsed the mark scheme; the
    /// app only decodes it). A part with no expected points is kept, not
    /// dropped — a paper often prints a question whose scheme was never
    /// published, and losing the question because its answer is unknown is the
    /// wrong trade.
    private static func writtenParts(from raw: Any?) -> [WrittenPart] {
        guard let entries = raw as? [[String: Any]] else { return [] }
        return entries.compactMap { entry in
            let prompt = (entry["prompt"] as? String)?.trimmed ?? ""
            let label = (entry["label"] as? String)?.trimmed ?? ""
            // Nothing to show for a part with neither a prompt nor a label.
            guard !prompt.isEmpty || !label.isEmpty else { return nil }
            let marks = (entry["marks"] as? NSNumber)?.doubleValue ?? 0
            return WrittenPart(
                id: (entry["id"] as? String)?.trimmed.nilIfEmpty ?? "part-\(label.lowercased())",
                label: label,
                prompt: prompt,
                marks: marks,
                expectedPoints: (entry["expectedPoints"] as? [String])?
                    .compactMap { $0.trimmed.nilIfEmpty } ?? [],
                conceptIds: entry["conceptIds"] as? [String] ?? []
            )
        }
    }

    /// Authored questions carry a fixed A–F block, so the unused labels arrive
    /// as entries with empty text. Rendering them would offer a student blank
    /// options to choose between.
    private static func options(from raw: Any?) -> [AnswerOption] {
        guard let entries = raw as? [[String: Any]] else { return [] }
        return entries.compactMap { entry in
            guard
                let label = (entry["label"] as? String)?.trimmed, !label.isEmpty,
                let text = (entry["text"] as? String)?.trimmed, !text.isEmpty
            else { return nil }
            return AnswerOption(
                label: label,
                text: text,
                explanation: (entry["explanation"] as? String)?.trimmed ?? ""
            )
        }
    }
}
