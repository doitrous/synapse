import FamilyControls
import ManagedSettings
import Observation
import Foundation

/// Wraps FamilyControls + ManagedSettings for the Focus Timer's strict-mode
/// app blocking — shielding the student's chosen apps for the duration of a
/// strict block, on top of M4.1's discard-on-leave penalty.
///
/// This needs Apple's Family Controls entitlement, which is approved for this
/// app (see `Config/Nishany.entitlements`). It still functions only on a real
/// device provisioned against that entitlement — the simulator never grants
/// Screen Time authorization — so `authorizationStatus` stays other than
/// `.approved` there, and every method here no-ops in that case rather than
/// crashing or throwing into the caller. The rest of strict mode (the
/// discard-on-leave path) keeps working with no blocking on top, so the code
/// compiles and runs fine in the simulator with blocking simply absent.
@MainActor
@Observable
final class AppBlocker {
    static let shared = AppBlocker()

    private static let selectionKey = "nishany.focusTimer.blockedApps.v1"

    private let store = ManagedSettingsStore()
    private let defaults: UserDefaults

    private(set) var authorizationStatus: AuthorizationStatus

    /// The student's chosen apps/categories to shield, persisted device-local
    /// (never synced — like the session itself, one device's picks don't
    /// belong fighting another's).
    var selection: FamilyActivitySelection {
        didSet { save() }
    }

    var isAuthorized: Bool { authorizationStatus == .approved }

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        if let data = defaults.data(forKey: Self.selectionKey),
           let decoded = try? JSONDecoder().decode(FamilyActivitySelection.self, from: data) {
            selection = decoded
        } else {
            selection = FamilyActivitySelection()
        }
        authorizationStatus = AuthorizationCenter.shared.authorizationStatus
    }

    /// Only ever called from an explicit tap (`PermissionPrimerRow`'s
    /// pattern) — never at cold launch or on a path the student didn't
    /// choose. iOS shows this prompt once; asking cold burns it.
    func requestAuthorization() async {
        do {
            try await AuthorizationCenter.shared.requestAuthorization(for: .individual)
        } catch {
            // Denied, restricted, or the request itself failed (e.g. the
            // entitlement isn't approved yet) — `authorizationStatus` below
            // reflects whatever actually happened either way.
        }
        authorizationStatus = AuthorizationCenter.shared.authorizationStatus
    }

    /// Re-reads the live status — e.g. after returning from Settings, where
    /// the student may have changed Screen Time permission outside the app.
    func refreshAuthorizationStatus() {
        authorizationStatus = AuthorizationCenter.shared.authorizationStatus
    }

    /// Shields `selection`'s apps/categories/web domains. No-ops if
    /// unauthorized, or if the selection is empty (nothing chosen yet).
    func apply(_ selection: FamilyActivitySelection) {
        guard isAuthorized else { return }
        store.shield.applications = selection.applicationTokens.isEmpty ? nil : selection.applicationTokens
        store.shield.applicationCategories = selection.categoryTokens.isEmpty
            ? nil : .specific(selection.categoryTokens)
        store.shield.webDomains = selection.webDomainTokens.isEmpty ? nil : selection.webDomainTokens
    }

    /// Lifts any shield this store applied. Safe to call unconditionally —
    /// e.g. every place a strict block stops — since there is nothing to
    /// undo when unauthorized or when nothing was ever shielded.
    func clear() {
        guard isAuthorized else { return }
        store.shield.applications = nil
        store.shield.applicationCategories = nil
        store.shield.webDomains = nil
        store.clearAllSettings()
    }

    private func save() {
        guard let data = try? JSONEncoder().encode(selection) else { return }
        defaults.set(data, forKey: Self.selectionKey)
    }
}
