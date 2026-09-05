import Foundation

/// How a student chooses to come at the library.
///
/// The same five the website offers, with its labels and descriptions, because
/// they are the vocabulary a student already knows from the web app. `home` is
/// the chooser itself.
enum LibraryViewKind: String, CaseIterable, Identifiable, Sendable {
    case system, discipline, skills, knowledge, curriculum

    var id: String { rawValue }

    var label: String {
        switch self {
        case .system: "Systems & General"
        case .discipline: "By Discipline"
        case .skills: "Clinical Skills"
        case .knowledge: "Clinical Knowledge"
        case .curriculum: "My Curriculum"
        }
    }

    var shortLabel: String {
        switch self {
        case .system: "Systems"
        case .discipline: "Disciplines"
        case .skills: "Skills"
        case .knowledge: "Knowledge"
        case .curriculum: "Curriculum"
        }
    }

    var detail: String {
        switch self {
        case .system: "Organ systems, foundations, life stages, infection, emergencies, and population health."
        case .discipline: "Basic sciences, clinical specialties, and the subjects used in university teaching."
        case .skills: "History, examination, interpretation, procedures, prescribing, communication, and reasoning."
        case .knowledge: "Presentations, diagnosis, management, therapeutics, emergencies, prevention, and evidence."
        case .curriculum: "Reviewed content assigned to your university, year, and module."
        }
    }

    /// Long-established symbols only. `microscope` and the connected-path ones
    /// render blank on this deployment target, and a card with a missing icon
    /// reads as a broken card.
    var symbol: String {
        switch self {
        case .system: "stethoscope"
        case .discipline: "atom"
        case .skills: "graduationcap"
        case .knowledge: "brain"
        case .curriculum: "calendar"
        }
    }

    /// Which division of the medical taxonomy this view browses. `curriculum`
    /// is not a division — it filters by the student's cohort instead.
    var division: String? {
        self == .curriculum ? nil : rawValue
    }
}

/// One branch of the medical library taxonomy.
struct TaxonomyNode: Identifiable, Equatable, Sendable {
    let id: String
    let parentId: String?
    let division: String
    let level: String
    let title: String
    let depth: Int
}

/// The taxonomy, indexed for browsing.
///
/// A flat list of ~1,900 nodes arrives from `synapse-medical-library-taxonomy-v1`;
/// this turns it into something a screen can walk, and hangs the articles off
/// the branches they were placed on.
struct LibraryAtlas: Sendable {
    private(set) var nodesById: [String: TaxonomyNode] = [:]
    private(set) var childrenOf: [String: [TaxonomyNode]] = [:]
    private(set) var rootsByDivision: [String: [TaxonomyNode]] = [:]
    /// Article IDs placed directly on a node.
    private(set) var articlesOn: [String: [String]] = [:]
    /// How many distinct articles sit at or beneath each node.
    ///
    /// Computed once when the atlas is built, because the alternative is
    /// walking a subtree per row: the system division alone has 1,344 nodes,
    /// and SwiftUI asks a row for its contents again on every scroll.
    private(set) var subtreeCount: [String: Int] = [:]

    static let empty = LibraryAtlas()

    static func build(taxonomy: Any?, articles: [Article], placements: [String: [String]]) -> LibraryAtlas {
        var atlas = LibraryAtlas()

        for raw in taxonomy as? [[String: Any]] ?? [] {
            guard
                let id = raw["id"] as? String,
                let division = raw["division"] as? String,
                let title = raw["title"] as? String
            else { continue }
            let node = TaxonomyNode(
                id: id,
                parentId: raw["parentId"] as? String,
                division: division,
                level: raw["level"] as? String ?? "",
                title: title,
                depth: raw["depth"] as? Int ?? 0
            )
            atlas.nodesById[id] = node
        }

        // Ordered by title so a branch reads the same way twice.
        for node in atlas.nodesById.values.sorted(by: { $0.title < $1.title }) {
            if let parent = node.parentId, atlas.nodesById[parent] != nil {
                atlas.childrenOf[parent, default: []].append(node)
            } else {
                atlas.rootsByDivision[node.division, default: []].append(node)
            }
        }

        for (articleId, nodeIds) in placements {
            for nodeId in nodeIds where atlas.nodesById[nodeId] != nil {
                atlas.articlesOn[nodeId, default: []].append(articleId)
            }
        }

        atlas.subtreeCount = atlas.computeSubtreeCounts()

        _ = articles
        return atlas
    }

    /// One pass, deepest first, so each node adds its children's sets to its own.
    ///
    /// Iterative rather than recursive: the taxonomy is authored data, and a
    /// cycle in it would turn a recursive walk into a stack overflow — a crash
    /// on launch caused by a content edit.
    private func computeSubtreeCounts() -> [String: Int] {
        var articleSets: [String: Set<String>] = [:]
        var counts: [String: Int] = [:]

        // Post-order: push each node, revisit it once its children are done.
        for root in rootsByDivision.values.flatMap({ $0 }) {
            var stack: [(id: String, expanded: Bool)] = [(root.id, false)]
            var guardSeen: Set<String> = []

            while let (id, expanded) = stack.popLast() {
                if expanded {
                    var set = Set(articlesOn[id] ?? [])
                    for child in childrenOf[id] ?? [] {
                        set.formUnion(articleSets[child.id] ?? [])
                    }
                    articleSets[id] = set
                    counts[id] = set.count
                } else {
                    guard guardSeen.insert(id).inserted else { continue }
                    stack.append((id, true))
                    stack.append(contentsOf: (childrenOf[id] ?? []).map { ($0.id, false) })
                }
            }
        }
        return counts
    }

    func roots(in division: String) -> [TaxonomyNode] { rootsByDivision[division] ?? [] }
    func children(of nodeId: String) -> [TaxonomyNode] { childrenOf[nodeId] ?? [] }

    /// How many articles are at or beneath a node — a lookup, not a walk.
    func articleCount(under nodeId: String) -> Int { subtreeCount[nodeId] ?? 0 }

    /// Distinct articles reachable anywhere in a division.
    ///
    /// Roots are summed as sets rather than counts: an article placed under two
    /// roots of the same division would otherwise be counted twice, and the
    /// chooser would promise more than the shelf holds.
    func divisionCount(_ division: String) -> Int {
        var seen: Set<String> = []
        for root in roots(in: division) {
            seen.formUnion(articleIds(under: root.id))
        }
        return seen.count
    }

    /// Every article at or beneath a node.
    ///
    /// Gathered from the whole subtree because a student tapping "Cardiovascular
    /// system" means everything under it, not only what happens to be pinned to
    /// that exact node — which, for a hub node, is usually nothing.
    func articleIds(under nodeId: String) -> [String] {
        var found: [String] = []
        var seen: Set<String> = []
        var stack = [nodeId]

        while let current = stack.popLast() {
            guard seen.insert(current).inserted else { continue }
            found.append(contentsOf: articlesOn[current] ?? [])
            stack.append(contentsOf: (childrenOf[current] ?? []).map(\.id))
        }
        return Array(Set(found))
    }

    /// True when a branch has anything to read. Used to hide empty branches —
    /// a student opening one and finding nothing learns only that the app
    /// wasted their tap.
    func hasArticles(under nodeId: String) -> Bool {
        articleCount(under: nodeId) > 0
    }
}
