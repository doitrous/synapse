import Foundation
import Observation

/// Who the student is, for the surfaces that need to know their cohort.
///
/// The roster wins when it has a row. A university that has not set one up
/// leaves the student able to say so themselves, which is what the web app's
/// `synapse.account.audience.v1` is for — and because it is the same key, a
/// cohort set on the phone shows up in the browser.
@MainActor
@Observable
final class AudienceStore {

    private(set) var audience: StudentAudience = .unknown
    /// True when the roster supplied it, so the UI can say it is not editable.
    private(set) var fromRoster = false
    private(set) var entitlement: MeResponse.Entitlement?
    private(set) var universities: [University] = []

    struct University: Identifiable, Equatable, Sendable {
        let id: String
        let name: String
        let short: String
        let years: [Year]

        /// A year as the academic catalogue records it: an ID and the label a
        /// student recognises.
        ///
        /// The two must not be confused. `StudentAudience.year` holds the
        /// **label** — the web derives the ID from it — so storing `KAU_Y1`
        /// there would show a student "KAU_Y1" where their browser says
        /// "Year 1".
        struct Year: Identifiable, Equatable, Sendable {
            let id: String
            let label: String
        }

        var yearLabels: [String] { years.map(\.label) }
    }

    private let api: SynapseAPI
    private let store: LocalStore
    private let sync: SyncEngine

    init(api: SynapseAPI, store: LocalStore, sync: SyncEngine) {
        self.api = api
        self.store = store
        self.sync = sync
    }

    /// The derived year ID, e.g. `KAU_Y3`, using the university's real
    /// abbreviation from the academic catalogue.
    var yearId: String {
        let short = universities.first { $0.id == audience.universityId }?.short
        return audience.yearId(universityShort: short)
    }

    func load() async {
        universities = await loadUniversities()

        // The roster first.
        if let me = try? await api.me(), me.audience.isKnown {
            audience = me.audience
            entitlement = me.entitlement
            fromRoster = true
            return
        }
        if let me = try? await api.me() { entitlement = me.entitlement }

        // Then whatever the student said about themselves.
        fromRoster = false
        if let remote = try? await api.userState(StudentAudience.self, key: StudentAudience.storageKey),
           let value = remote.value, value.isKnown {
            audience = migrated(value)
        }
    }

    /// Repair a year recorded as an ID.
    ///
    /// An earlier build read the catalogue's `id` where it meant its `year`, so
    /// some accounts hold `KAU_Y1` where the contract says `Year 1`. Scoping
    /// survives it — the matcher compares year *numbers* — but the website
    /// would show a student "KAU_Y1" as their year, so it is corrected in place
    /// the next time the app resolves them.
    private func migrated(_ value: StudentAudience) -> StudentAudience {
        guard
            let university = universities.first(where: { $0.id == value.universityId }),
            let match = university.years.first(where: { $0.id == value.year }),
            match.label != value.year
        else { return value }

        var repaired = value
        repaired.year = match.label
        Task { await sync.write(key: StudentAudience.storageKey, value: repaired) }
        return repaired
    }

    /// Record a self-declared cohort. Written through the sync engine so it
    /// survives being offline and lands under the key the web app reads.
    func declare(_ value: StudentAudience) async {
        guard !fromRoster else { return }
        audience = value
        await sync.write(key: StudentAudience.storageKey, value: value)
    }

    private func loadUniversities() async -> [University] {
        guard
            let document = try? await store.catalogue(key: SyncEngine.universitiesKey),
            let raw = try? JSONSerialization.jsonObject(with: document) as? [[String: Any]]
        else { return [] }

        return raw.compactMap { entry in
            guard let id = entry["id"] as? String else { return nil }
            // The catalogue writes `{ id: "KAU_Y1", year: "Year 1", … }`. The
            // label key is `year`; reading `id` instead is how a student ended
            // up recorded as being in year "KAU_Y1".
            let years: [University.Year] = (entry["years"] as? [Any] ?? []).compactMap { entry in
                if let text = entry as? String { return .init(id: text, label: text) }
                guard let object = entry as? [String: Any] else { return nil }
                let label = object["year"] as? String
                    ?? object["label"] as? String
                    ?? object["name"] as? String
                    ?? object["id"] as? String
                guard let label else { return nil }
                return .init(id: object["id"] as? String ?? label, label: label)
            }
            return University(
                id: id,
                name: entry["name"] as? String ?? id,
                short: entry["short"] as? String ?? id.uppercased(),
                years: years
            )
        }
        .sorted { $0.name < $1.name }
    }
}
