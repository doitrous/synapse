import Foundation

/// A failure that came back from the Synapse API.
///
/// The cases are split by what the caller should *do*, not by status code.
/// Sync needs to know whether to retry, whether to give up on a document
/// permanently, and whether the session is finished — and those three answers
/// are what separate a stalled queue from one that drains.
enum APIError: Error, Equatable {
    /// No session, or the session expired. Sign in again.
    case unauthorized
    /// Signed in, but not allowed this document. Never retry — for a student
    /// asking for an admin-only key this is the permanent, correct answer.
    case forbidden
    /// No such route. Distinguished from other failures because it is how an
    /// API deployed before a given endpoint answers, and the caller can often
    /// fall back to how it worked previously.
    case notFound
    /// The server broke, or the network did. Safe to retry.
    case transient(status: Int?)
    /// The response was not the shape we expected.
    case malformed(String)

    var isRetryable: Bool {
        if case .transient = self { return true }
        return false
    }
}

/// A stored document plus when the server last changed it.
///
/// `updatedAt` is the whole basis of sync: it is what lets the app decide
/// whether the copy it already holds is current, and which side wins when the
/// same document was edited in two places.
struct RemoteState<Value: Decodable>: Decodable {
    let value: Value?
    let updatedAt: Date?
}

/// When each catalogue document last changed. A few hundred bytes, so the app
/// can ask "what moved?" without downloading megabytes to find out.
struct StateManifest: Decodable {
    let keys: [String: Date?]
}

/// The `{ value: … }` envelope every state write is wrapped in.
///
/// At file scope rather than nested inside the generic method that uses it:
/// Swift does not allow a generic type to be declared inside a generic
/// function.
private struct ValueBody<Value: Encodable>: Encodable {
    let value: Value
}

/// The signed-in student, as the server sees them.
struct SessionUser: Decodable, Equatable {
    let id: String
    let email: String?
    let role: String
    let aal: String?
    let mfaRequired: Bool?
}

/// Talks to the Synapse Express API.
///
/// Deliberately thin. It knows how to attach a token, how to read the two
/// document endpoints, and how to turn a status code into something a caller
/// can act on. It holds no cache and no state — that belongs to the sync
/// engine, which is the only thing that should decide when to fetch.
struct SynapseAPI {

    /// Supplies a fresh access token, refreshing it if needed. Injected rather
    /// than reached for, so this type can be tested without an auth stack.
    typealias TokenProvider = @Sendable () async throws -> String?

    private let baseURL: URL
    /// Named `urlSession` so it cannot be confused with `session()`, which asks
    /// the API who is signed in.
    private let urlSession: URLSession
    private let token: TokenProvider

    init(baseURL: URL = AppConfig.apiBaseURL,
         urlSession: URLSession = .shared,
         token: @escaping TokenProvider) {
        self.baseURL = baseURL
        self.urlSession = urlSession
        self.token = token
    }

    // MARK: - Endpoints

    func session() async throws -> SessionUser? {
        struct Envelope: Decodable { let user: SessionUser? }
        return try await get(Envelope.self, path: "session").user
    }

    func me() async throws -> SessionUser {
        try await get(SessionUser.self, path: "me")
    }

    /// When each student-readable catalogue document last changed.
    func stateManifest() async throws -> [String: Date?] {
        try await get(StateManifest.self, path: "state/manifest").keys
    }

    /// A shared catalogue document — content authored in the admin console.
    func state<Value: Decodable>(_ type: Value.Type, key: String) async throws -> RemoteState<Value> {
        try await get(RemoteState<Value>.self, path: "state/\(escaped(key))")
    }

    /// A private document belonging to the signed-in student.
    func userState<Value: Decodable>(_ type: Value.Type, key: String) async throws -> RemoteState<Value> {
        try await get(RemoteState<Value>.self, path: "user-state/\(escaped(key))")
    }

    /// Replace a private document. Last write wins, as on the web.
    func putUserState<Value: Encodable>(key: String, value: Value) async throws {
        _ = try await send(path: "user-state/\(escaped(key))", method: "PUT", body: ValueBody(value: value))
    }

    /// Register this device for push notifications.
    func registerDevice(token deviceToken: String, environment: String, locale: String?, appVersion: String?) async throws {
        struct Body: Encodable {
            let token: String
            let environment: String
            let locale: String?
            let appVersion: String?
        }
        _ = try await send(
            path: "devices",
            method: "POST",
            body: Body(token: deviceToken, environment: environment, locale: locale, appVersion: appVersion)
        )
    }

    func unregisterDevice(token deviceToken: String) async throws {
        _ = try await send(path: "devices/\(escaped(deviceToken))", method: "DELETE", body: Optional<Int>.none)
    }

    // MARK: - Transport

    private func get<T: Decodable>(_ type: T.Type, path: String) async throws -> T {
        let data = try await send(path: path, method: "GET", body: Optional<Int>.none)
        do {
            return try Self.decoder.decode(T.self, from: data)
        } catch {
            throw APIError.malformed("\(path): \(error)")
        }
    }

    @discardableResult
    private func send<Body: Encodable>(path: String, method: String, body: Body?) async throws -> Data {
        var request = URLRequest(url: baseURL.appendingPathComponent(path))
        request.httpMethod = method

        if let accessToken = try await token() {
            request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        }
        if let body {
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.httpBody = try JSONEncoder().encode(body)
        }

        let data: Data
        let response: URLResponse
        do {
            (data, response) = try await urlSession.data(for: request)
        } catch {
            // No connection, DNS failure, timeout — all worth retrying.
            throw APIError.transient(status: nil)
        }

        guard let http = response as? HTTPURLResponse else {
            throw APIError.malformed("\(path): response was not HTTP")
        }

        switch http.statusCode {
        case 200...299:
            return data
        case 401:
            throw APIError.unauthorized
        case 403:
            throw APIError.forbidden
        case 404:
            throw APIError.notFound
        default:
            throw APIError.transient(status: http.statusCode)
        }
    }

    private func escaped(_ key: String) -> String {
        key.addingPercentEncoding(withAllowedCharacters: .alphanumerics) ?? key
    }

    /// MariaDB timestamps arrive as ISO 8601, sometimes with fractional seconds
    /// and sometimes without, depending on the column and the driver. Accepting
    /// only one form would make sync fail on a subset of documents.
    private static let decoder: JSONDecoder = {
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .custom { decoder in
            let text = try decoder.singleValueContainer().decode(String.self)
            if let date = iso8601WithFraction.date(from: text) ?? iso8601Plain.date(from: text) {
                return date
            }
            throw DecodingError.dataCorruptedError(
                in: try decoder.singleValueContainer(),
                debugDescription: "Not an ISO 8601 date: \(text)"
            )
        }
        return decoder
    }()

    private static let iso8601WithFraction: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter
    }()

    private static let iso8601Plain: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime]
        return formatter
    }()
}
