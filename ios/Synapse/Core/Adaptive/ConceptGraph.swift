import Foundation

/// The shared concept graph, as far as the planner needs it.
///
/// Deliberately partial. The full graph carries definitions, pitfalls,
/// citations and typed relationships for the reader's concept popovers, which
/// is a separate surface; what the planner needs from it is which concepts must
/// be learnt before which. Decoding only that keeps a change to the rest of the
/// graph from breaking a student's plan.
struct ConceptGraph: Codable, Equatable, Sendable {
    var relations: [ConceptRelation]

    /// Admin-authored, so hyphenated and read from the shared catalogue.
    static let key = "synapse-concept-graph-v2"

    /// Missing relations are an empty graph rather than a decoding failure: a
    /// catalogue that has concepts but no edges yet is a normal state.
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        relations = (try? container.decode([ConceptRelation].self, forKey: .relations)) ?? []
    }

    init(relations: [ConceptRelation] = []) { self.relations = relations }
}

struct ConceptRelation: Codable, Equatable, Sendable {
    var sourceId: String
    /// Left as a string rather than an enum: the catalogue carries relationship
    /// types this app has no opinion about, and an unknown one should be
    /// ignored, not refuse to decode the graph around it.
    var type: String
    var targetId: String
}
