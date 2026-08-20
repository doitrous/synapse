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
                do {
                    return try await client?.auth.session.accessToken
                } catch {
                    // Swallowing this silently once cost hours: the request went
                    // out with no Authorization header, the API answered 401,
                    // and the app reported a rejected session without ever
                    // saying it had failed to read one.
                    #if DEBUG
                    SynapseAPI.lastTokenError = String(describing: error)
                    #endif
                    return nil
                }
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
        // Launch, with nobody signed in, is the ordinary case — there is
        // nothing to explain, so say nothing.
        await confirmWithServer(explainFailure: false)
    }

    func signIn(email: String, password: String) async {
        guard let client else { return }
        await perform {
            try await client.auth.signIn(email: Self.tidy(email), password: password)
            await self.confirmWithServer(explainFailure: true)
        }
    }

    /// Create an account. Supabase sends the verification mail; the account
    /// cannot read anything until that link is followed, so say so plainly
    /// rather than dropping the student on a sign-in screen that will refuse
    /// them for a reason they cannot see.
    func signUp(email: String, password: String, name: String, phone: String) async {
        guard let client else { return }
        await perform {
            // The same metadata the website writes, so an account made on a
            // phone is indistinguishable from one made in a browser.
            try await client.auth.signUp(
                email: Self.tidy(email),
                password: password,
                data: ["full_name": .string(name), "phone": .string(phone)]
            )
            self.message = "Check your email to confirm the address, then sign in."
        }
    }

    /// Whether this person already has an account.
    ///
    /// A courtesy, not the guarantee: the UNIQUE index on the server is what
    /// actually enforces it, so a server that cannot answer must not stop
    /// somebody registering.
    func identityConflict(email: String, phone: String) async -> IdentityConflict? {
        guard let taken = try? await api.accountExists(email: email, phone: phone) else { return nil }
        // Email first: it is the field someone is most likely to remember
        // signing up with, and the one the sign-in form takes.
        if taken.email { return IdentityConflict(field: .email, value: email) }
        if taken.phone { return IdentityConflict(field: .phone, value: phone) }
        return nil
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
    ///
    /// Two services have to agree here, and when they disagree the failure is
    /// invisible from the outside: Supabase accepts the password, the API
    /// refuses the token it issued, and the app returns to a sign-in screen
    /// that looks like it did nothing. So when the caller has just tried to
    /// sign in, every branch below says something.
    private func confirmWithServer(explainFailure: Bool) async {
        do {
            if let user = try await api.session() {
                state = .signedIn(user)
                message = nil
            } else {
                state = .signedOut
                if explainFailure {
                    message = "Signed in, but Connect Cortex has no account for this address yet."
                }
            }
        } catch APIError.unauthorized {
            state = .signedOut
            if explainFailure {
                // Deliberately not guessing at a cause. Two services have to
                // agree, and from here the difference between an unconfigured
                // server, a suspended account and a clock skew is invisible —
                // naming one would send the reader after the wrong thing.
                message = "Your password was accepted, but Connect Cortex rejected the session. "
                    + "Please try again, or contact support if it keeps happening."
                #if DEBUG
                if let detail = SynapseAPI.lastDiagnostic { message! += "\n\n[\(detail)]" }
                if let tokenError = SynapseAPI.lastTokenError { message! += "\n[token error: \(tokenError.prefix(180))]" }
                #endif
            }
        } catch {
            // The token may well be fine and the network not. Don't discard a
            // good session over a dropped connection.
            state = .signedOut
            if explainFailure { message = Self.describe(error) }
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
