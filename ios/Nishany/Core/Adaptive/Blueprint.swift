import Foundation

/// One concept on the exam blueprint, and how much of the exam it carries.
///
/// A port of `BlueprintNode` in `src/data/adaptive/blueprint.ts`. The label and
/// group label are carried on the node rather than looked up, so a blueprint
/// reads without the concept graph beside it.
struct BlueprintNode: Codable, Identifiable, Equatable, Sendable {
    var conceptId: String
    var label: String
    /// The topic this concept is grouped under — a subject id, or a taxonomy
    /// node.
    var groupId: String
    var groupLabel: String
    /// Share of the whole blueprint, 0–1. Normalised across the blueprint.
    var weight: Double
    /// True when an administrator set this weight rather than it being derived.
    var overridden: Bool

    var id: String { conceptId }
}
