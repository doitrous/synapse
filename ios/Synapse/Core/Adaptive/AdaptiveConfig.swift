import Foundation

/// The tuning behind every adaptive decision.
///
/// A port of the parts of `src/data/adaptive/config.ts` the mastery model
/// reads. It is a *record*, not a constant: an administrator can change it, and
/// every estimate carries the `version` it was produced under so a change
/// recomputes history rather than silently rewriting it under a new name.
struct AdaptiveConfig: Codable, Equatable, Sendable {

    /// Bumped on every material change. Shown to students and admins alike.
    var version: Int
    var updatedAt: String
    var mastery: Mastery
    var validity: Validity
    var statuses: StatusThresholds
    var reviewIntervalDays: ReviewIntervals
    var constraints: Constraints
    var priority: PriorityWeights
    /// The default allocation when no exam horizon applies.
    var defaultShares: AllocationShares
    var horizonBands: [HorizonBand]

    /// Admin-authored, so it is read from the shared catalogue rather than the
    /// student's own record — which is why the key is hyphenated.
    static let key = "synapse-adaptive-config-v1"

    struct Mastery: Codable, Equatable, Sendable {
        var priorAlpha: Double
        var priorBeta: Double
        /// How long accumulated evidence takes to decay halfway back to the
        /// prior. A launch hypothesis, deliberately in config.
        var decayHalfLifeDays: Double
        var minDifficultyCredit: Double
        var maxDifficultyCredit: Double
        var mainConceptRelevance: Double
        var secondaryConceptRelevance: Double
        /// A wrong answer the student was sure of is the strongest
        /// misconception evidence there is, so it is the one case that carries
        /// *extra* weight rather than less.
        var highConfidenceErrorWeight: Double
    }

    struct Validity: Codable, Equatable, Sendable {
        /// Below this share of the expected time, an answer was not reasoned.
        var fastResponseRatio: Double
        var fastWrongWeight: Double
        var fastCorrectWeight: Double
        var exposedRepeatWeight: Double
        var blankWeight: Double
        var defaultExpectedSeconds: Double
    }

    struct StatusThresholds: Codable, Equatable, Sendable {
        var weakBelow: Double
        var secureAtOrAbove: Double
        var measuredDistinctItems: Int
        var weakDistinctItems: Int
        var secureDistinctItems: Int
        /// A correct answer this long after the previous evidence counts as
        /// retention rather than recall within one sitting.
        var spacedSuccessMinHours: Double
        var weakHighConfidenceErrors: Int
    }

    /// What each reason to ask, or not to ask, is worth.
    struct PriorityWeights: Codable, Equatable, Sendable {
        var conceptWeakness: Double
        var topicOrSubtopicGap: Double
        var examBlueprintDeficit: Double
        var spacedReviewUrgency: Double
        var informationGain: Double
        var recentErrorBoost: Double
        var novelty: Double
        /// The four below are subtracted.
        var repetitionPenalty: Double
        var exposurePenalty: Double
        var fatiguePenalty: Double
    }

    /// How a block divides as an exam approaches.
    struct HorizonBand: Codable, Equatable, Sendable {
        var id: String
        var label: String
        /// Nil is the open-ended band: more than the last bound, or no exam.
        var maxDaysToExam: Int?
        var shares: AllocationShares
    }

    struct Constraints: Codable, Equatable, Sendable {
        var minBlockSize: Int
        var maxBlockSize: Int
        /// How many times one item may be asked before it is worn out.
        var maxExposuresPerItem: Int
        /// How many blocks a coverage shortfall is repaid across. The window is
        /// what stops an old shortfall haunting a student forever.
        var rollingDebtWindowBlocks: Int
    }

    struct ReviewIntervals: Codable, Equatable, Sendable {
        var attention: Double
        var weak: Double
        var developing: Double
        var secure: Double
    }

    /// The v1 defaults, matching `DEFAULT_ADAPTIVE_CONFIG`.
    static let `default` = AdaptiveConfig(
        version: 1,
        updatedAt: "2026-07-19",
        mastery: Mastery(
            priorAlpha: 1,
            priorBeta: 1,
            decayHalfLifeDays: 60,
            minDifficultyCredit: 0.75,
            maxDifficultyCredit: 1.25,
            mainConceptRelevance: 1,
            secondaryConceptRelevance: 0.6,
            highConfidenceErrorWeight: 1.3
        ),
        validity: Validity(
            fastResponseRatio: 0.25,
            fastWrongWeight: 0.5,
            fastCorrectWeight: 0.4,
            exposedRepeatWeight: 0.25,
            blankWeight: 0.25,
            defaultExpectedSeconds: 75
        ),
        statuses: StatusThresholds(
            weakBelow: 0.55,
            secureAtOrAbove: 0.75,
            measuredDistinctItems: 2,
            weakDistinctItems: 2,
            secureDistinctItems: 4,
            spacedSuccessMinHours: 48,
            weakHighConfidenceErrors: 2
        ),
        reviewIntervalDays: ReviewIntervals(
            attention: 1,
            weak: 1,
            developing: 3,
            secure: 14
        ),
        constraints: Constraints(
            minBlockSize: 20,
            maxBlockSize: 40,
            maxExposuresPerItem: 1,
            rollingDebtWindowBlocks: 4
        ),
        priority: PriorityWeights(
            conceptWeakness: 0.32,
            topicOrSubtopicGap: 0.18,
            examBlueprintDeficit: 0.20,
            spacedReviewUrgency: 0.12,
            informationGain: 0.10,
            recentErrorBoost: 0.05,
            novelty: 0.03,
            repetitionPenalty: 0.15,
            exposurePenalty: 0.20,
            fatiguePenalty: 0.10
        ),
        defaultShares: AllocationShares(weakness: 0.40, coverage: 0.35, review: 0.15, uncertainty: 0.10),
        horizonBands: [
            // Fourteen days out, coverage overtakes depth: there is no longer
            // time to fix everything, and breadth is what an exam asks for.
            HorizonBand(id: "imminent", label: "14 days or fewer", maxDaysToExam: 14,
                        shares: AllocationShares(weakness: 0.25, coverage: 0.50, review: 0.15, uncertainty: 0.10)),
            HorizonBand(id: "near", label: "15–60 days", maxDaysToExam: 60,
                        shares: AllocationShares(weakness: 0.40, coverage: 0.35, review: 0.15, uncertainty: 0.10)),
            HorizonBand(id: "far", label: "More than 60 days, or no exam scheduled", maxDaysToExam: nil,
                        shares: AllocationShares(weakness: 0.45, coverage: 0.25, review: 0.20, uncertainty: 0.10)),
        ]
    )
}
