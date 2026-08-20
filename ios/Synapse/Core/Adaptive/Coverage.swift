import Foundation

/// How much of one concept has been practised.
struct ConceptCoverage: Identifiable, Equatable, Sendable {
    let conceptId: String
    let groupId: String
    let groupLabel: String
    /// Share of the blueprint this concept carries.
    let weight: Double
    /// Distinct questions answered on it.
    let items: Int
    /// True once it has any evidence at all.
    let touched: Bool

    var id: String { conceptId }
}

/// A topic's worth of coverage, for the bars both platforms render.
struct CoverageGroup: Identifiable, Equatable, Sendable {
    let groupId: String
    let groupLabel: String
    let weight: Double
    let coveredWeight: Double
    /// Concepts in this group with no evidence at all.
    let uncovered: Int

    var id: String { groupId }
}

struct CoverageState: Equatable, Sendable {
    /// Blueprint weight with at least one piece of evidence behind it, 0–1.
    var coveredWeight: Double = 0
    /// Blueprint weight never practised, 0–1.
    var uncoveredWeight: Double = 1
    /// Concepts on the blueprint that have no evidence, heaviest first.
    var uncoveredConcepts: [ConceptCoverage] = []
    var groups: [CoverageGroup] = []
    /// Every concept, so a table can show the whole blueprint.
    var concepts: [ConceptCoverage] = []
}

/// Slots owed to coverage from previous blocks.
///
/// Positive means the last blocks under-served coverage and this one should
/// serve more. Clamped, because repaying every owed slot at once is how an
/// adaptive session turns into a syllabus march and a student stops opening it.
struct CoverageDebt: Codable, Equatable, Sendable {
    /// Fractional slots owed, carried across blocks.
    var slots: Double = 0
    /// Blocks the debt has accumulated over, for the rolling window.
    var blocks: Int = 0
    var updatedAt: String?

    static let empty = CoverageDebt()
    static let key = "synapse.progress.adaptive.coverageDebt.v1"
}

/// How much of the blueprint has actually been practised, and what is owed.
///
/// A port of `src/data/adaptive/coverage.ts`. Coverage is measured in blueprint
/// **weight**, not in questions answered: a student who has answered two
/// hundred questions on one topic has covered that topic's weight and nothing
/// else, and a count would flatter them into thinking otherwise.
enum Coverage {

    /// Coverage as it stands.
    ///
    /// A concept counts as covered on its first piece of evidence — covered
    /// means "practised at all", not "mastered". Mastery is a separate
    /// measurement, and conflating them would let a single wrong answer report
    /// an area as done.
    static func state(
        _ nodes: [BlueprintNode], distinctItemsByConcept: [String: Int]
    ) -> CoverageState {
        let concepts = nodes.map { node in
            let items = distinctItemsByConcept[node.conceptId] ?? 0
            return ConceptCoverage(
                conceptId: node.conceptId,
                groupId: node.groupId,
                groupLabel: node.groupLabel,
                weight: node.weight,
                items: items,
                touched: items > 0
            )
        }

        let coveredWeight = concepts.reduce(0.0) { $0 + ($1.touched ? $1.weight : 0) }

        var order: [String] = []
        var byGroup: [String: (label: String, weight: Double, covered: Double, uncovered: Int)] = [:]
        for entry in concepts {
            if byGroup[entry.groupId] == nil {
                order.append(entry.groupId)
                byGroup[entry.groupId] = (entry.groupLabel, 0, 0, 0)
            }
            byGroup[entry.groupId]?.weight += entry.weight
            if entry.touched {
                byGroup[entry.groupId]?.covered += entry.weight
            } else {
                byGroup[entry.groupId]?.uncovered += 1
            }
        }

        let groups = order.compactMap { id -> CoverageGroup? in
            guard let group = byGroup[id] else { return nil }
            return CoverageGroup(
                groupId: id, groupLabel: group.label, weight: group.weight,
                coveredWeight: group.covered, uncovered: group.uncovered
            )
        }.sorted { $0.weight > $1.weight }

        return CoverageState(
            coveredWeight: coveredWeight,
            uncoveredWeight: max(0, 1 - coveredWeight),
            uncoveredConcepts: concepts.filter { !$0.touched }.sorted { $0.weight > $1.weight },
            groups: groups,
            concepts: concepts
        )
    }

    /// The most a single block will repay, so no one block becomes all
    /// coverage.
    ///
    /// Spread over the rolling window: a debt of six slots against a four-block
    /// window is repaid a slot or two at a time, which is the difference
    /// between adaptive study and a syllabus march.
    static func maxDebtRepayment(blockSize: Int, config: AdaptiveConfig) -> Int {
        let window = max(1, config.constraints.rollingDebtWindowBlocks)
        return max(1, Int((Double(blockSize) / Double(window)).rounded()))
    }

    /// Fold a finished block into the debt.
    ///
    /// `targeted` is what the allocation asked for; `served` is what the
    /// builder managed. The difference is the debt — which is why a pool
    /// shortage that forces a block off-target is repaid later rather than
    /// forgotten.
    static func debtAfterBlock(
        _ debt: CoverageDebt, targeted: Double, served: Double,
        config: AdaptiveConfig, at: String = ISO8601DateFormatter.synapse.string(from: Date())
    ) -> CoverageDebt {
        let window = max(1, config.constraints.rollingDebtWindowBlocks)
        let blocks = min(debt.blocks + 1, config.constraints.rollingDebtWindowBlocks)
        let outstanding = debt.slots + (targeted - served)
        // The window is what stops an old shortfall haunting a student forever:
        // debt decays toward zero as blocks pass, so a bad week does not
        // distort a month.
        let decayed = outstanding * (1 - 1 / Double(window))
        return CoverageDebt(
            slots: max(0, min(decayed, Double(config.constraints.maxBlockSize))),
            blocks: blocks,
            updatedAt: at
        )
    }

    /// How much a question would contribute to closing coverage.
    ///
    /// Highest for a concept with real blueprint weight and no evidence at all;
    /// zero for one already covered. A question that reaches an untouched,
    /// heavily-weighted area outranks one that revisits ground already walked.
    static func blueprintDeficit(
        conceptIds: [String], weights: [String: Double], distinctItemsByConcept: [String: Int]
    ) -> Double {
        var best = 0.0
        for conceptId in conceptIds {
            guard let weight = weights[conceptId] else { continue }
            let items = distinctItemsByConcept[conceptId] ?? 0
            // Falls off quickly: the second question on a concept closes far
            // less coverage than the first, and the tenth closes none worth
            // naming.
            let deficit = weight * (1 / (1 + Double(items)))
            if deficit > best { best = deficit }
        }

        // Scaled against the largest single-concept weight so the term stays
        // 0–1 whatever the blueprint's size. A 400-concept blueprint would
        // otherwise emit deficits near zero and the term would silently stop
        // mattering.
        var maxWeight = 0.0
        for weight in weights.values where weight > maxWeight { maxWeight = weight }
        return maxWeight > 0 ? min(1, best / maxWeight) : 0
    }

    /// Breadth not already explained by the concept itself.
    ///
    /// Parent and child weakness must not both be charged. Concept weakness is
    /// scored directly from the concept's own state; this term only reports how
    /// much of the *rest* of the group is untouched, so a weak concept in a
    /// well-covered topic does not collect a second penalty for the topic it
    /// happens to sit in.
    static func groupGap(
        conceptIds: [String], nodeByConcept: [String: BlueprintNode], coverage: CoverageState
    ) -> Double {
        let groups = Dictionary(
            coverage.groups.map { ($0.groupId, $0) }, uniquingKeysWith: { first, _ in first }
        )
        let touched = Set(coverage.concepts.filter(\.touched).map(\.conceptId))

        var worst = 0.0
        for conceptId in conceptIds {
            guard let node = nodeByConcept[conceptId],
                  let group = groups[node.groupId], group.weight > 0
            else { continue }

            // Remove this concept's own weight from both sides, so what is left
            // is genuinely the breadth around it rather than the concept
            // counted twice.
            let siblingWeight = group.weight - node.weight
            guard siblingWeight > 0 else { continue }
            let siblingCovered = group.coveredWeight - (touched.contains(conceptId) ? node.weight : 0)
            let gap = max(0, (siblingWeight - siblingCovered) / siblingWeight)
            if gap > worst { worst = gap }
        }
        return min(1, worst)
    }
}
