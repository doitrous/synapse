import Foundation

/// A practical item: an OSCE station, a clinical case, a lab or imaging set,
/// or a skills checklist.
///
/// The five types are one content kind with different blocks filled in, which
/// is why `format` decides what a reader shows rather than a separate type per
/// screen.
struct Practical: Identifiable, Equatable, Sendable {
    let id: String
    let title: String
    let subjectId: String
    /// As authored: "OSCE station", "Clinical case", "Lab interpretation",
    /// "Imaging interpretation", "Skills checklist".
    let type: String
    let difficulty: String
    let minutes: Int?
    let marks: Int?
    let learningObjective: String?
    /// What the candidate is told before they start.
    let candidateInstructions: String?
    /// The mark scheme, as sections of tickable points.
    let markSections: [MarkSection]
    /// A case's staged decision points.
    let decisions: [Decision]
    /// A lab or imaging set's questions.
    let questions: [LabQuestion]
    let debrief: String?
    let references: [String]

    struct MarkSection: Identifiable, Equatable, Sendable {
        let id: String
        let title: String
        let items: [String]
    }

    struct Decision: Identifiable, Equatable, Sendable {
        let id: String
        let title: String
        let context: String
        let prompt: String?
        let answer: String?
    }

    struct LabQuestion: Identifiable, Equatable, Sendable {
        let id: String
        let prompt: String
        let answer: String?
    }

    var symbol: String {
        switch type {
        case "OSCE station": "person.2"
        case "Clinical case": "text.book.closed"
        case "Skills checklist": "checklist"
        default: "waveform.path.ecg"
        }
    }
}

enum PracticalProjection {

    static func project(_ item: LedgerItem) -> Practical? {
        guard item.kind == .practical else { return nil }
        guard let record = try? JSONSerialization.jsonObject(with: item.raw) as? [String: Any] else { return nil }

        let data = record["practicalData"] as? [String: Any] ?? [:]
        let fields = record["fields"] as? [String: String] ?? [:]

        return Practical(
            id: item.id,
            title: item.title,
            subjectId: item.subjectId,
            type: fields["Type"]?.trimmed.nilIfEmpty ?? "Practical",
            difficulty: fields["Difficulty"]?.trimmed ?? "Moderate",
            minutes: Int(fields["Duration"] ?? ""),
            marks: Int(fields["Marks"] ?? ""),
            learningObjective: (data["learningObjective"] as? String)?.trimmed.nilIfEmpty,
            candidateInstructions: (data["candidateInstructions"] as? String)?.trimmed.nilIfEmpty
                ?? fields["Candidate instructions"]?.trimmed.nilIfEmpty,
            markSections: markSections(data["markSections"]),
            decisions: decisions(data["decisions"]),
            questions: labQuestions(data["questions"]),
            debrief: (data["debrief"] as? String)?.trimmed.nilIfEmpty
                ?? fields["Debrief"]?.trimmed.nilIfEmpty,
            references: data["references"] as? [String] ?? []
        )
    }

    private static func markSections(_ raw: Any?) -> [Practical.MarkSection] {
        (raw as? [[String: Any]] ?? []).enumerated().compactMap { index, entry in
            let items = (entry["items"] as? [Any] ?? []).compactMap { item -> String? in
                if let text = item as? String { return text.trimmed.nilIfEmpty }
                if let object = item as? [String: Any] {
                    return (object["text"] as? String ?? object["label"] as? String)?.trimmed.nilIfEmpty
                }
                return nil
            }
            let title = (entry["title"] as? String)?.trimmed ?? ""
            guard !items.isEmpty || !title.isEmpty else { return nil }
            return .init(id: entry["id"] as? String ?? "sec-\(index)", title: title, items: items)
        }
    }

    private static func decisions(_ raw: Any?) -> [Practical.Decision] {
        (raw as? [[String: Any]] ?? []).enumerated().compactMap { index, entry in
            let title = (entry["title"] as? String)?.trimmed ?? ""
            let context = (entry["context"] as? String)?.trimmed ?? ""
            guard !title.isEmpty || !context.isEmpty else { return nil }
            return .init(
                id: entry["id"] as? String ?? "dec-\(index)",
                title: title,
                context: context,
                prompt: (entry["prompt"] as? String ?? entry["question"] as? String)?.trimmed.nilIfEmpty,
                answer: (entry["answer"] as? String ?? entry["explanation"] as? String)?.trimmed.nilIfEmpty
            )
        }
    }

    private static func labQuestions(_ raw: Any?) -> [Practical.LabQuestion] {
        (raw as? [[String: Any]] ?? []).enumerated().compactMap { index, entry in
            guard let prompt = (entry["prompt"] as? String ?? entry["stem"] as? String
                                ?? entry["question"] as? String)?.trimmed.nilIfEmpty else { return nil }
            return .init(
                id: entry["id"] as? String ?? "q-\(index)",
                prompt: prompt,
                answer: (entry["answer"] as? String ?? entry["explanation"] as? String)?.trimmed.nilIfEmpty
            )
        }
    }
}
