import SwiftUI
import Observation

/// A term in the bilingual medical glossary.
///
/// Mirrors `MedicalTerm` in `src/data/glossary.ts`. `def`/`defAr`/`example` are
/// the plain-language explanations the old iOS lookup dropped — a glossary you
/// can only translate a word in is a dictionary; with the definitions it is
/// something to learn from.
struct MedicalTerm: Codable, Identifiable, Equatable, Sendable {
    let id: String
    let term: String
    let ar: String
    let category: String
    let def: String
    let defAr: String
    let example: String?
}

/// The whole glossary as one stored document (`GlossaryDoc`). Written by the
/// admin's Glossary Setup, read by every student — the same key iOS already
/// syncs (`SyncEngine.glossaryKey`).
private struct GlossaryDoc: Codable {
    var terms: [MedicalTerm]?
}

/// Which glossary terms the student has marked "Got it".
///
/// A faithful port of `src/data/terminologyProgress.ts`, down to the key and
/// shape, so the ring on the phone and the ring on the web are the same ring:
/// `known` maps a term id to the ISO time it was learned.
struct TerminologyProgress: Codable, Equatable, Sendable {
    var version = 1
    var known: [String: String] = [:]

    static let key = "nishany.terminology.progress.v1"
}

@MainActor
@Observable
final class TerminologyModel {
    private(set) var terms: [MedicalTerm] = []
    private(set) var isLoading = true
    /// The student's progress doc — kept whole so each term's learned-time
    /// survives a later toggle of a different term, as it does on the web.
    private(set) var progress = TerminologyProgress()
    /// True once the known list has actually been read back. Writing before it
    /// has would replace the whole list with a single tap — the same trap
    /// `ResourceModel` guards its bookmarks against.
    private(set) var knownLoaded = false

    var known: Set<String> { Set(progress.known.keys) }

    private let store: LocalStore
    private let sync: SyncEngine
    private let api: SynapseAPI

    init(store: LocalStore, sync: SyncEngine, api: SynapseAPI) {
        self.store = store
        self.sync = sync
        self.api = api
    }

    /// The categories present, in the seed's canonical order, with anything
    /// off-catalogue kept at the end rather than dropped.
    var categories: [String] { Self.orderedCategories(terms) }

    /// Pure, so the ordering (canonical first, the rest alphabetical, nothing
    /// dropped) can be tested without a database.
    nonisolated static func orderedCategories(_ terms: [MedicalTerm]) -> [String] {
        let present = Set(terms.map(\.category)).subtracting([""])
        let known = categoryOrder.filter(present.contains)
        let rest = present.subtracting(categoryOrder).sorted()
        return known + rest
    }

    func count(in category: String) -> Int {
        terms.lazy.filter { $0.category == category }.count
    }

    func load() async {
        isLoading = true
        defer { isLoading = false }

        if let document = try? await store.catalogue(key: SyncEngine.glossaryKey),
           let doc = try? JSONDecoder().decode(GlossaryDoc.self, from: document) {
            // A term with no headword is a blank card no one can read — drop it.
            terms = (doc.terms ?? [])
                .filter { !$0.term.trimmingCharacters(in: .whitespaces).isEmpty }
                .sorted { $0.term.localizedCaseInsensitiveCompare($1.term) == .orderedAscending }
        }
        await loadProgress()
    }

    private func loadProgress() async {
        guard !knownLoaded else { return }
        do {
            let remote = try await api.userState(TerminologyProgress.self, key: TerminologyProgress.key)
            progress = remote.value ?? TerminologyProgress()
            knownLoaded = true
        } catch APIError.notFound {
            // Never written yet — for a new student the doc genuinely is empty,
            // and empty is safe to write onto. (A missing user-state key 404s.)
            progress = TerminologyProgress()
            knownLoaded = true
        } catch {
            // A network failure, not an empty list: leave writing disabled so a
            // tap cannot overwrite a real remote list with an empty one.
        }
    }

    func toggle(_ id: String) async {
        if !knownLoaded { await loadProgress() }
        guard knownLoaded else { return }

        // Toggle just this term, leaving every other term's learned-time intact.
        if progress.known[id] != nil {
            progress.known[id] = nil
        } else {
            progress.known[id] = ISO8601DateFormatter.synapse.string(from: Date())
        }
        await sync.write(key: TerminologyProgress.key, value: progress)
    }

    /// The web's `MED_CATEGORIES` order. `nonisolated` so the pure
    /// `orderedCategories` can read it.
    nonisolated static let categoryOrder = [
        "Directional & anatomy", "Word parts", "Signs & symptoms", "Examination",
        "Investigations", "Common conditions", "Pharmacology",
    ]
}

/// Medical Terminology — the bilingual dictionary as a place to learn from, not
/// only to look things up in. Pick a category, work the cards, mark the ones
/// that have landed; the ring fills as you go, on this device and the web alike.
struct TerminologyView: View {
    @Environment(\.strings) private var strings
    @State private var model: TerminologyModel
    @State private var query = ""
    @State private var category: String?
    @State private var revealed: Set<String> = []

    init(store: LocalStore, sync: SyncEngine, api: SynapseAPI) {
        _model = State(wrappedValue: TerminologyModel(store: store, sync: sync, api: api))
    }

    var body: some View {
        Group {
            if model.isLoading {
                ProgressView().tint(Theme.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else if model.terms.isEmpty {
                EmptyStateView(
                    symbol: "character.book.closed",
                    title: "No glossary yet",
                    detail: "No bilingual terms have been published yet."
                )
            } else {
                list
            }
        }
        .background(Theme.paper)
        .navigationTitle(strings("Medical Terminology"))
        .navigationBarTitleDisplayMode(.inline)
        .task { await model.load() }
    }

    private var list: some View {
        List {
            Section {
                progressHeader
                categoryRail
            }
            .listRowBackground(Theme.surface)
            .listRowInsets(EdgeInsets(top: 12, leading: 16, bottom: 12, trailing: 16))

            Section {
                ForEach(visible) { term in
                    row(term)
                        .listRowBackground(Theme.surface)
                }
            } header: {
                if let category { Text(category).textCase(nil) }
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .searchable(text: $query, prompt: "Search terms")
        .overlay {
            if visible.isEmpty, !query.isEmpty { ContentUnavailableView.search(text: query) }
        }
    }

    /// How many terms are known, of the total — the web's TargetRing, as a bar.
    private var progressHeader: some View {
        let total = model.terms.count
        let done = model.known.count
        return VStack(alignment: .leading, spacing: 6) {
            HStack(alignment: .firstTextBaseline) {
                Text(strings("Terms you know"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)
                Spacer()
                Text("\(done) / \(total)")
                    .font(Theme.numeric(14))
                    .foregroundStyle(Theme.ink)
            }
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    Capsule().fill(Theme.inset)
                    Capsule().fill(Theme.primary)
                        .frame(width: total > 0 ? max(2, geometry.size.width * CGFloat(done) / CGFloat(total)) : 0)
                }
            }
            .frame(height: 6)
        }
    }

    private var categoryRail: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                chip(nil, label: strings("All"), count: model.terms.count)
                ForEach(model.categories, id: \.self) { name in
                    chip(name, label: name, count: model.count(in: name))
                }
            }
        }
    }

    private func chip(_ value: String?, label: String, count: Int) -> some View {
        let selected = category == value
        return Button {
            category = value
        } label: {
            HStack(spacing: 4) {
                Text(label)
                Text("\(count)").font(Theme.numeric(11))
            }
            .font(Theme.ui(12, weight: selected ? 600 : 400))
            .foregroundStyle(selected ? .white : Theme.ink2)
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .background(selected ? Theme.primary : Theme.inset, in: Capsule())
        }
        .buttonStyle(.plain)
    }

    /// A term. Tap the body to reveal the Arabic and the definition — self-test
    /// first, check yourself second; the trailing circle marks it known.
    @ViewBuilder
    private func row(_ term: MedicalTerm) -> some View {
        let isRevealed = revealed.contains(term.id)
        let isKnown = model.known.contains(term.id)
        HStack(alignment: .top, spacing: 12) {
            VStack(alignment: .leading, spacing: 4) {
                Text(term.term)
                    .font(Theme.ui(16, weight: 500))
                    .foregroundStyle(Theme.ink)

                if isRevealed {
                    Text(term.ar)
                        .font(Theme.ui(15))
                        .foregroundStyle(Theme.ink2)
                        .environment(\.layoutDirection, .rightToLeft)
                    if !term.def.isEmpty {
                        Text(term.def).font(Theme.ui(13)).foregroundStyle(Theme.ink2)
                    }
                    if !term.defAr.isEmpty {
                        Text(term.defAr).font(Theme.ui(13)).foregroundStyle(Theme.ink3)
                            .environment(\.layoutDirection, .rightToLeft)
                    }
                    if let example = term.example, !example.isEmpty {
                        Text(example).font(Theme.ui(12).italic()).foregroundStyle(Theme.ink3)
                    }
                } else {
                    Text(strings("Tap to reveal"))
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink3)
                }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .contentShape(Rectangle())
            .onTapGesture {
                if isRevealed { revealed.remove(term.id) } else { revealed.insert(term.id) }
            }

            Button {
                Task { await model.toggle(term.id) }
            } label: {
                Image(systemName: isKnown ? "checkmark.circle.fill" : "circle")
                    .font(.system(size: 22))
                    .foregroundStyle(isKnown ? Theme.success : Theme.ink3)
            }
            .buttonStyle(.plain)
            .accessibilityLabel(isKnown ? strings("Known") : strings("Mark as known"))
        }
        .padding(.vertical, 4)
    }

    private var visible: [MedicalTerm] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        return model.terms.filter { term in
            if let category, term.category != category { return false }
            guard !trimmed.isEmpty else { return true }
            return term.term.localizedCaseInsensitiveContains(trimmed)
                || term.ar.contains(trimmed)
                || term.def.localizedCaseInsensitiveContains(trimmed)
        }
    }
}
