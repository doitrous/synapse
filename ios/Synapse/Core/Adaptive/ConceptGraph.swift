import Foundation

/// The shared concept graph.
///
/// Two surfaces read this and want different things from it. The planner needs
/// only the edges — which concepts must be learnt before which. The reader
/// needs the concepts themselves: what a term means, what people get wrong
/// about it, and what it rests on.
///
/// Still deliberately partial. The authored concept carries some sixty fields —
/// review status, merge lineage, per-year blueprint weights — and decoding
/// those would mean a change to any of them could stop a student reading an
/// article. Each side decodes what it shows and tolerates the rest.
struct ConceptGraph: Codable, Equatable, Sendable {
    var relations: [ConceptRelation]
    var concepts: [Concept]

    /// Admin-authored, so hyphenated and read from the shared catalogue.
    static let key = "nishany-concept-graph-v2"

    /// Either half missing is an empty half rather than a decoding failure: a
    /// catalogue with concepts but no edges yet is a normal state, and so is
    /// the reverse.
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        relations = (try? container.decode([ConceptRelation].self, forKey: .relations)) ?? []
        concepts = (try? container.decode([Concept].self, forKey: .concepts)) ?? []
    }

    init(relations: [ConceptRelation] = [], concepts: [Concept] = []) {
        self.relations = relations
        self.concepts = concepts
    }
}

/// A concept, as the reader needs it.
struct Concept: Codable, Equatable, Identifiable, Sendable {
    var id: String
    var label: String
    var aliases: [String] = []
    var arabicLabel: String?
    var arabicAliases: [String]?
    var definition: String = ""
    /// What people commonly get wrong about this.
    var pitfalls: String?
    /// `active` is the only status a student should ever meet a term under.
    var status: String?
    /// Resources approved for this concept.
    var resourceIds: [String]?
    /// Claims this concept rests on, which is how its citations are found.
    var atomicClaimIds: [String]?

    /// Decoded field by field rather than by synthesis.
    ///
    /// Swift's synthesised decoder ignores a property's default when the key is
    /// absent and throws instead, so one concept authored without an `aliases`
    /// array would take the whole graph down with it — and the graph is one
    /// document, so that is every term in the app.
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id = try container.decode(String.self, forKey: .id)
        label = try container.decode(String.self, forKey: .label)
        aliases = (try? container.decode([String].self, forKey: .aliases)) ?? []
        arabicLabel = try? container.decode(String.self, forKey: .arabicLabel)
        arabicAliases = try? container.decode([String].self, forKey: .arabicAliases)
        definition = (try? container.decode(String.self, forKey: .definition)) ?? ""
        pitfalls = try? container.decode(String.self, forKey: .pitfalls)
        status = try? container.decode(String.self, forKey: .status)
        resourceIds = try? container.decode([String].self, forKey: .resourceIds)
        atomicClaimIds = try? container.decode([String].self, forKey: .atomicClaimIds)
    }

    init(id: String, label: String, aliases: [String] = [], arabicLabel: String? = nil,
         arabicAliases: [String]? = nil, definition: String = "", pitfalls: String? = nil,
         status: String? = nil, resourceIds: [String]? = nil, atomicClaimIds: [String]? = nil) {
        self.id = id
        self.label = label
        self.aliases = aliases
        self.arabicLabel = arabicLabel
        self.arabicAliases = arabicAliases
        self.definition = definition
        self.pitfalls = pitfalls
        self.status = status
        self.resourceIds = resourceIds
        self.atomicClaimIds = atomicClaimIds
    }

    /// Only an explicit `active` counts, exactly as the website has it.
    ///
    /// Of the 1,816 concepts in the live graph, 1,761 are still `under review`.
    /// Defaulting a missing status to active would put an unreviewed definition
    /// in front of a student on the phone that the website is deliberately
    /// withholding — and a definition awaiting review is withheld for a reason.
    var isActive: Bool { status == "active" }

    /// Every term that should light up for this concept.
    ///
    /// Both languages, always. An Arabic alias cannot match English prose, so
    /// carrying it costs nothing — and it means one index serves a reader who
    /// switches language without being rebuilt behind them.
    var terms: [String] {
        ([label] + aliases + [arabicLabel].compactMap { $0 } + (arabicAliases ?? []))
            .filter { !$0.trimmed.isEmpty }
    }
}

struct ConceptRelation: Codable, Equatable, Sendable {
    var sourceId: String
    /// Left as a string rather than an enum: the catalogue carries relationship
    /// types this app has no opinion about, and an unknown one should be
    /// ignored, not refuse to decode the graph around it.
    var type: String
    var targetId: String
}
