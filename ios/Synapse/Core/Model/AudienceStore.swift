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
        let years: [String]
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
            audience = value
        }
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
            // Years may be strings or objects depending on how the catalogue
            // was authored; take whichever names a year.
            let years: [String] = (entry["years"] as? [Any] ?? []).compactMap { year in
                if let text = year as? String { return text }
                if let object = year as? [String: Any] {
                    return object["label"] as? String ?? object["name"] as? String ?? object["id"] as? String
                }
                return nil
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
