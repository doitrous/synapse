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
        )
    )
}
