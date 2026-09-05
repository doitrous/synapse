import Foundation

/// The four ways to start without choosing anything.
///
/// A port of `presetPool` in `src/pages/student/QuestionBank.tsx`. The count on
/// a button and the questions that button opens come from the same expression,
/// or a button can advertise a number and then serve a different set — which is
/// exactly what happened on the web when an empty pool silently fell back to
/// the whole bank.
enum QBankPreset: String, CaseIterable, Identifiable, Sendable {
    case weak, emergency, demanding, everything

    var id: String { rawValue }

    var title: String {
        switch self {
        case .weak: "Your weakest topics"
        case .emergency: "Emergencies only"
        case .demanding: "Demanding questions"
        case .everything: "Everything, shuffled"
        }
    }

    var symbol: String {
        switch self {
        case .weak: "chart.line.downtrend.xyaxis"
        case .emergency: "light.beacon.max"
        case .demanding: "flame"
        case .everything: "shuffle"
        }
    }

    /// `Hard` and `Challenging` both mean "expect most students to miss this",
    /// and `Moderate` joins them because a sitting of only the hardest two is
    /// not practice, it is discouragement.
    static let demandingDifficulties: Set<String> = ["Moderate", "Hard", "Challenging"]

    /// Words that mark a question as something you meet in an emergency.
    ///
    /// A crude test, and deliberately the web's crude test rather than a better
    /// one: the two have to select the same questions or the same button means
    /// different things on the two platforms.
    static let emergencyTerms = ["acute", "stemi", "acidosis", "hypox"]

    func pool(_ questions: [Question], weakestSubjects: Set<String>) -> [Question] {
        switch self {
        case .weak:
            return questions.filter { weakestSubjects.contains($0.subjectId) }
        case .emergency:
            return questions.filter { question in
                let haystack = "\(question.topic) \(question.vignette) \(question.stem)".lowercased()
                return Self.emergencyTerms.contains { haystack.contains($0) }
            }
        case .demanding:
            return questions.filter { Self.demandingDifficulties.contains($0.difficulty) }
        case .everything:
            return questions
        }
    }
}
