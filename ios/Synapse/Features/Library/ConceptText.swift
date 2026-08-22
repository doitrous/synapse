import SwiftUI

/// Prose whose concept terms can be pressed.
///
/// The terms are rendered as links inside one `Text`, rather than as separate
/// views laid out beside each other, because a sentence has to wrap as a
/// sentence. Splitting it into buttons would break the line at every concept
/// and turn a paragraph into a ladder.
///
/// Cortex blue, not crimson: a concept term points at a definition, it does not
/// perform anything. Crimson is reserved for what the reader is meant to act
/// on, and a page of prose where every term shouted in the action colour would
/// bury the one control that matters.
struct ConceptText: View {
    let text: String
    let font: Font
    var index: ConceptTerms

    @State private var opened: Concept?
    @Environment(\.strings) private var strings

    init(_ text: String, font: Font, index: ConceptTerms) {
        self.text = text
        self.font = font
        self.index = index
    }

    var body: some View {
        Text(attributed)
            .font(font)
            .foregroundStyle(Theme.ink)
            .lineSpacing(6)
            .tint(Theme.accent)
            .textSelection(.enabled)
            .environment(\.openURL, OpenURLAction { url in
                guard url.scheme == Self.scheme, let concept = index.concept(id: url.host() ?? "") else {
                    return .systemAction
                }
                opened = concept
                return .handled
            })
            .sheet(item: $opened) { concept in
                ConceptSheet(concept: concept, index: index)
                .localisedSheet()
            }
    }

    /// The custom scheme a concept link uses.
    ///
    /// Never registered with the system: it exists so the reader's own handler
    /// can recognise its links and claim them, and anything else — a real
    /// http link an author wrote — falls through to the system untouched.
    private static let scheme = "connectcortex-concept"

    private var attributed: AttributedString {
        var out = AttributedString()
        for piece in index.split(text) {
            var run = AttributedString(piece.text)
            if let id = piece.conceptId,
               let url = URL(string: "\(Self.scheme)://\(id)") {
                run.link = url
                run.foregroundColor = Theme.accent
                run.underlineStyle = Text.LineStyle(pattern: .dot)
                run.inlinePresentationIntent = .stronglyEmphasized
            }
            out.append(run)
        }
        return out
    }
}

/// What a concept is, what people get wrong about it, and what it rests on.
struct ConceptSheet: View {
    let concept: Concept
    let index: ConceptTerms

    @Environment(\.strings) private var strings
    @Environment(\.dismiss) private var dismiss
    @Environment(\.evidence) private var evidence

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    definition
                    if let pitfalls = concept.pitfalls, !pitfalls.trimmed.isEmpty {
                        pitfall(pitfalls)
                    }
                    if !sources.isEmpty { sourceList }
                    let relationships = index.relationships(for: concept.id)
                    if !relationships.isEmpty { relationList(relationships) }
                }
                .padding(16)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .navigationTitle(concept.label)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button(strings("Done")) { dismiss() }.tint(Theme.primary)
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    private var definition: some View {
        Text(concept.definition.trimmed.isEmpty
             ? strings("Definition awaiting editorial review.")
             : concept.definition)
            .font(Theme.serifBody(16))
            .foregroundStyle(Theme.ink)
            .lineSpacing(5)
            .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func pitfall(_ text: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Label(strings("Pitfall"), systemImage: "exclamationmark.triangle")
                .font(Theme.panelTitle(11))
                .foregroundStyle(Theme.warning)
            Text(text)
                .font(Theme.ui(13))
                .foregroundStyle(Theme.ink2)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(Theme.warningTint)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg)
            .stroke(Theme.warning.opacity(0.3), lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }

    /// The resources behind this concept, with the exact place in each.
    ///
    /// A concept names its own resources when an editor has approved them;
    /// otherwise they are derived from the citations on its claims, which is
    /// the same order the website resolves them in.
    private var sources: [(resourceId: String, title: String, place: String?)] {
        let claims = Set(concept.atomicClaimIds ?? [])
        let citations = evidence.citations.values.filter { claims.contains($0.id) || !claims.isEmpty }
        let fromClaims = evidence.citations.values
            .filter { citation in claims.contains(citation.id) }

        let ids = concept.resourceIds?.isEmpty == false
            ? concept.resourceIds!
            : Array(Set(fromClaims.map(\.resourceId))).sorted()
        _ = citations

        return ids.map { id in
            (id,
             evidence.resourceTitles[id] ?? evidence.resourceFiles[id]?.title ?? id,
             fromClaims.first { $0.resourceId == id }?.placeLabel)
        }
    }

    private var sourceList: some View {
        VStack(alignment: .leading, spacing: 8) {
            Label(strings("Sources"), systemImage: "doc.text")
                .font(Theme.panelTitle(11))
                .foregroundStyle(Theme.ink3)

            ForEach(sources, id: \.resourceId) { source in
                VStack(alignment: .leading, spacing: 2) {
                    Text(source.title)
                        .font(Theme.ui(13, weight: 600))
                        .foregroundStyle(Theme.ink)
                        .lineLimit(2)
                    if let place = source.place {
                        Text(place)
                            .font(Theme.numeric(11))
                            .foregroundStyle(Theme.ink3)
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(10)
                .background(Theme.surface2)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
            }
        }
    }

    private func relationList(
        _ relationships: [(relation: ConceptRelation, outgoing: Bool, other: String)]
    ) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Label(strings("Relationships"), systemImage: "point.topleft.down.to.point.bottomright.curvepath")
                .font(Theme.panelTitle(11))
                .foregroundStyle(Theme.ink3)

            // The arrow carries the direction and the concept is named, rather
            // than the raw "related_concepts → X" the record holds.
            ForEach(Array(relationships.enumerated()), id: \.offset) { _, item in
                HStack(spacing: 8) {
                    Image(systemName: item.outgoing ? "arrow.right" : "arrow.left")
                        .font(.system(size: 11))
                        .foregroundStyle(Theme.ink3)
                    Text(strings(ConceptTerms.humanRelation(item.relation.type)))
                        .font(Theme.numeric(10))
                        .foregroundStyle(Theme.ink3)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(Theme.surface2)
                        .clipShape(RoundedRectangle(cornerRadius: 4))
                    Text(item.other)
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink)
                        .lineLimit(1)
                    Spacer(minLength: 0)
                }
            }
        }
    }
}

/// The evidence store, reachable where a concept sheet needs it.
private struct EvidenceKey: EnvironmentKey {
    static let defaultValue = EvidenceStore.empty
}

extension EnvironmentValues {
    var evidence: EvidenceStore {
        get { self[EvidenceKey.self] }
        set { self[EvidenceKey.self] = newValue }
    }
}
