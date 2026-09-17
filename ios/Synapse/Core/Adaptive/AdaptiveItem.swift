import Foundation

/// A question as the adaptive engine sees it.
///
/// A port of `AdaptiveItem` in `src/data/adaptive/item.ts` — the fields the
/// scorer reads. The full question travels alongside for rendering; this is
/// what ranking is done against.
struct AdaptiveItem: Identifiable, Equatable, Sendable {
    let id: String
    /// A stable fingerprint of the answerable content.
    ///
    /// Evidence records this so a replay can tell that a question was edited
    /// after it was answered. Without it, a rewritten stem silently inherits
    /// the evidence of the stem it replaced.
    let version: String
    let subjectId: String
    let topic: String
    let difficulty: String
    /// Concepts the item is *for*. Weighted at full relevance.
    let mainConceptIds: [String]
    /// Concepts it also assesses. Weighted lower.
    let secondaryConceptIds: [String]
    /// Both, in the order the mastery model should prefer.
    let conceptIds: [String]
    /// 0–1.
    let cognitiveEffort: Double
    /// Author's estimate, used to judge whether an answer arrived impossibly
    /// fast.
    let estimatedSeconds: Double?
    /// True when the difficulty band is one most students are expected to miss.
    let demanding: Bool

    /// The role a concept plays for this item.
    ///
    /// Nil when the item does not assess the concept at all, so a caller cannot
    /// accidentally record full-relevance evidence for a concept the question
    /// merely mentions.
    func role(of conceptId: String) -> ConceptRole? {
        if mainConceptIds.contains(conceptId) { return .main }
        if secondaryConceptIds.contains(conceptId) { return .secondary }
        return nil
    }
}

/// A concept temporarily worth more than its score says.
///
/// A port of `ConceptBoost` in `src/data/adaptive/boosts.ts`.
struct ConceptBoost: Codable, Equatable, Sendable {
    let conceptId: String
    /// Stacked multiplier, always at or below the configured cap.
    var multiplier: Double
    /// Blocks this survives. Decremented only when a block could have used it.
    var remainingEligibleBlocks: Int
    /// ISO timestamp before which the concept should not be re-asked.
    ///
    /// Re-asking a concept in the same sitting tests recall of the explanation
    /// just read, not knowledge. This is the spacing that makes the repair mean
    /// something.
    var notBefore: String
    /// Questions already used to repair this concept — never offered as its
    /// repair again.
    var repairQuestionIds: [String] = []

    static let key = "nishany.progress.adaptive.boosts.v1"
}

extension Dictionary where Key == String, Value == ConceptBoost {

    /// The strongest live boost across an item's concepts.
    ///
    /// A boost that has run out of blocks, or that is still inside its spacing
    /// window, is not live — re-asking inside the window would test recall of
    /// the explanation just read.
    func multiplier(for conceptIds: [String], now: Date = Date()) -> Double {
        var multiplier = 1.0
        for conceptId in conceptIds {
            guard let boost = self[conceptId], boost.remainingEligibleBlocks > 0 else { continue }
            guard let notBefore = ISO8601DateFormatter.read(boost.notBefore), now >= notBefore
            else { continue }
            multiplier = Swift.max(multiplier, boost.multiplier)
        }
        return multiplier
    }

    /// Questions already spent repairing these concepts.
    func usedRepairQuestions(for conceptIds: [String]) -> Set<String> {
        var used: Set<String> = []
        for conceptId in conceptIds {
            for questionId in self[conceptId]?.repairQuestionIds ?? [] { used.insert(questionId) }
        }
        return used
    }
}
