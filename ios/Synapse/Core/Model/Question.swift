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
    /// The label of the correct option, e.g. "C".
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

        let options = self.options(from: data["answers"])
        let correctLabel = (data["correctAnswer"] as? String)?.trimmed ?? ""

        // A question whose correct answer is not among its options cannot be
        // marked, so it is not a question — it is a broken record, and showing
        // it would mark every attempt wrong.
        guard !options.isEmpty, options.contains(where: { $0.label == correctLabel }) else { return nil }

        let stem = item.title.trimmed
        guard !stem.isEmpty else { return nil }

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
            conceptIds: tags["mainConceptIds"] as? [String]
                ?? tags["conceptIds"] as? [String]
                ?? []
        )
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
