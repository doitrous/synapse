import Foundation
import Observation
import Supabase

/// Who is signed in, and how the app got there.
///
/// The app talks to two services that must agree: Supabase issues the token,
/// and the Synapse API verifies it against the project's JWKS and decides what
/// this person may read. Signing in is therefore not finished when Supabase
/// returns a session — it is finished when the API accepts that session. This
/// model only reports `signedIn` after the round-trip, so a student never lands
/// on an app shell that will 401 on its first read.
@MainActor
@Observable
final class AuthModel {

    enum State: Equatable {
        /// Deciding whether a stored session is still good.
        case restoring
        /// The build has no usable Supabase configuration.
        case unconfigured(AppConfig.Problem)
        case signedOut
        case signedIn(SessionUser)
    }

    private(set) var state: State = .restoring
    private(set) var isWorking = false
    /// Shown to the student. Nil when there is nothing to report.
    private(set) var message: String?

    private let client: SupabaseClient?
    private(set) var api: SynapseAPI!

    init() {
        if let url = AppConfig.supabaseURL, let key = AppConfig.supabaseAnonKey {
            let client = SupabaseClient(supabaseURL: url, supabaseKey: key)
            self.client = client
            self.api = SynapseAPI { [weak client] in
                // A token is only useful if it is current, and the SDK refreshes
                // on read — so read it per request rather than caching one here.
                try? await client?.auth.session.accessToken
            }
        } else {
            self.client = nil
            self.api = SynapseAPI { nil }
        }
    }

    /// Restore a stored session, if there is one worth restoring.
    func start() async {
        if let problem = AppConfig.problem {
            state = .unconfigured(problem)
            return
        }
        state = .restoring
        await confirmWithServer(onFailure: .signedOut)
    }

    func signIn(email: String, password: String) async {
        guard let client else { return }
        await perform {
            try await client.auth.signIn(email: Self.tidy(email), password: password)
            await self.confirmWithServer(onFailure: .signedOut)
        }
    }

    /// Create an account. Supabase sends the verification mail; the account
    /// cannot read anything until that link is followed, so say so plainly
    /// rather than dropping the student on a sign-in screen that will refuse
    /// them for a reason they cannot see.
    func signUp(email: String, password: String) async {
        guard let client else { return }
        await perform {
            try await client.auth.signUp(email: Self.tidy(email), password: password)
            self.message = "Check your email to confirm the address, then sign in."
        }
    }

    func sendPasswordReset(email: String) async {
        guard let client else { return }
        await perform {
            try await client.auth.resetPasswordForEmail(Self.tidy(email))
            // Deliberately the same wording whether or not the address exists —
            // otherwise this screen answers "does this person have an account?"
            // to anyone who asks.
            self.message = "If that address has an account, a reset link is on its way."
        }
    }

    func signOut() async {
        guard let client else { return }
        await perform {
            try await client.auth.signOut()
            self.state = .signedOut
        }
    }

    // MARK: - Internals

    /// Ask the Synapse API who it thinks we are. This is the step that proves
    /// the whole chain — Supabase token → JWKS verification → `user_access`
    /// row → role — actually works.
    private func confirmWithServer(onFailure fallback: State) async {
        do {
            if let user = try await api.session() {
                state = .signedIn(user)
                message = nil
            } else {
                state = fallback
            }
        } catch APIError.unauthorized {
            state = fallback
        } catch {
            // The token may well be fine and the network not. Don't discard a
            // good session over a dropped connection.
            state = fallback
            message = Self.describe(error)
        }
    }

    private func perform(_ work: @escaping () async throws -> Void) async {
        isWorking = true
        message = nil
        defer { isWorking = false }
        do {
            try await work()
        } catch {
            message = Self.describe(error)
        }
    }

    private static func tidy(_ email: String) -> String {
        email.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
    }

    private static func describe(_ error: Error) -> String {
        switch error {
        case APIError.unauthorized:
            "That session is no longer valid. Please sign in again."
        case APIError.forbidden:
            "This account doesn't have access to that."
        case APIError.transient:
            "Couldn't reach Synapse. Check your connection and try again."
        default:
            error.localizedDescription
        }
    }
}
