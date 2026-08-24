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
    private let userCache: SessionUserCache

    /// Same closure `api`'s token provider was built from, kept so
    /// `restoreFromCache` can ask "is there still a token to sign in with?"
    /// without a second, divergent copy of how a token is read.
    private let readToken: @Sendable () async -> String?

    init(userCache: SessionUserCache = KeychainSessionUserCache()) {
        self.userCache = userCache
        if let url = AppConfig.supabaseURL, let key = AppConfig.supabaseAnonKey {
            let client = SupabaseClient(supabaseURL: url, supabaseKey: key)
            self.client = client
            let readToken: @Sendable () async -> String? = { [weak client] in
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
            self.readToken = readToken
            self.api = SynapseAPI(token: readToken)
        } else {
            self.client = nil
            self.readToken = { nil }
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
            // Forgotten before the sign-out is attempted, not after. If the
            // call throws, the student stays on the signed-in screen and
            // tries again -- but a cached identity left behind by a
            // sign-out that half-worked could restore that screen on the
            // next launch, offline, with no server left to say otherwise.
            self.userCache.writeUser(nil)
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
                userCache.writeUser(user)
                state = .signedIn(user)
                message = nil
            } else {
                // Not an error: Supabase knows this address and Synapse has no
                // account for it yet.
                userCache.writeUser(nil)
                state = .signedOut
                if explainFailure {
                    message = "Signed in, but Synapse has no account for this address yet."
                }
            }
        } catch APIError.unauthorized {
            // The server has spoken: this token is no good. Whatever the
            // cache remembers about it is no good either.
            userCache.writeUser(nil)
            state = .signedOut
            if explainFailure {
                // Deliberately not guessing at a cause. Two services have to
                // agree, and from here the difference between an unconfigured
                // server, a suspended account and a clock skew is invisible —
                // naming one would send the reader after the wrong thing.
                message = "Your password was accepted, but Synapse rejected the session. "
                    + "Please try again, or contact support if it keeps happening."
                #if DEBUG
                if let detail = SynapseAPI.lastDiagnostic { message! += "\n\n[\(detail)]" }
                if let tokenError = SynapseAPI.lastTokenError { message! += "\n[token error: \(tokenError.prefix(180))]" }
                #endif
            }
        } catch {
            // The token may well be fine and the network not. Don't discard a
            // good session over a dropped connection.
            if await restoreFromCache(explainFailure: explainFailure, error: error) { return }
            state = .signedOut
            if explainFailure { message = Self.describe(error) }
        }
    }

    /// Carry on as the student we last were, when the only thing that went
    /// wrong was the network.
    ///
    /// The app opens straight into `.restoring` and asks the server who this
    /// is. Losing that answer used to mean the sign-in form -- on a train, in
    /// a basement, on a hospital ward -- with a perfectly good token in the
    /// Keychain and a full local cache of the student's own work sitting one
    /// screen away, unreachable. Every screen reads the local cache, never
    /// the API, so there is nothing about being offline that the app cannot
    /// do; the sign-in form was the only thing standing in the way.
    ///
    /// Three things all have to hold, and each is doing work:
    ///
    /// - `explainFailure` is false, so this is a restore and not the student
    ///   pressing Sign in. Someone who just typed a password is owed the
    ///   truth about what happened to it, not a screen that behaves as if it
    ///   worked.
    /// - The failure is `APIError.isRetryable` -- a transport fault. A 401 is
    ///   handled above and never reaches here; anything else means the
    ///   server answered, and an answer is not something to paper over.
    /// - There is still a token to be signed in *with*. Without this, a
    ///   cleared session plus one unlucky request would show a signed-in
    ///   shell for an account that no longer has a way to talk to the
    ///   server.
    ///
    /// Nothing is faked: `.signedIn` carries the identity the server itself
    /// confirmed last time, and the next reachable server call either
    /// renews it or fails loudly where the student can see it.
    private func restoreFromCache(explainFailure: Bool, error: Error) async -> Bool {
        guard !explainFailure else { return false }
        guard let apiError = error as? APIError, apiError.isRetryable else { return false }
        guard await readToken() != nil else { return false }
        guard let cached = userCache.readUser() else { return false }
        state = .signedIn(cached)
        message = nil
        return true
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
