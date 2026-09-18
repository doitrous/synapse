import Foundation
import os

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
    /// Signed in and allowed, but the content is behind a subscription the
    /// caller no longer has (trial expired / no active plan). Never retry — the
    /// fix is to subscribe, not to ask again. The UI answers this with a
    /// paywall, not the generic "couldn't reach the server" error.
    case paymentRequired
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

/// Whether a source document can be opened.
struct ResourceStatus: Decodable, Equatable, Sendable {
    let id: String
    let available: Bool
    let externalUrl: String?
}

/// The caller's own profile and entitlement, from `/api/me`.
///
/// A missing roster row is a 200 with nulls rather than a 404 — "your
/// university has not set up your profile yet" is a state to render, not a
/// failed request — so every field here is optional on purpose.
struct MeResponse: Decodable, Equatable {
    let user: SessionUser
    let profile: Profile?
    let entitlement: Entitlement?
    /// The row behind the entitlement, carrying whatever note the person who
    /// granted it wrote at the time.
    let subscription: Subscription?

    struct Profile: Decodable, Equatable {
        let name: String?
        let universityId: String?
        let year: String?
        let group: String?
        let status: String?
    }

    struct Entitlement: Decodable, Equatable {
        let state: String
        let plan: String?
        let expiresAt: String?
        let daysLeft: Int?
    }

    /// The cohort this account belongs to, as far as the roster knows.
    var audience: StudentAudience {
        StudentAudience(
            universityId: profile?.universityId ?? "",
            year: profile?.year ?? "",
            group: profile?.group ?? ""
        )
    }
}

/// The signed-in student, as the server sees them.
///
/// `Codable`, not just `Decodable`: `KeychainSessionUserCache` round-trips
/// one of these through the Keychain so a restore with no network can still
/// say who was signed in last (`AuthModel.restoreFromCache`). Nothing here
/// is ever encoded for the wire -- the server only ever sends this shape,
/// never receives it.
struct SessionUser: Codable, Equatable {
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

    static let log = Logger(subsystem: "com.nishany.app", category: "api")

    #if DEBUG
    /// Debug diagnostics the sign-in screen surfaces. Written from `send` on
    /// whatever thread `URLSession` resumes on, and from the token provider —
    /// and the screens that fan out reads (Adaptive study loads six, Billing
    /// six, Question Bank four, Flashcards two) drive several `send` calls at
    /// once. A bare `nonisolated(unsafe) static var String?` was then assigned
    /// from two threads simultaneously: overwriting the `Optional<String>`
    /// releases the previous value's buffer, and two threads releasing it at
    /// once double-freed it — the intermittent `_swift_release_dealloc` crash
    /// reported from `send`/`get`. Every access goes through a lock, the same
    /// pattern `StubProtocol` and `Box` already use for shared static state.
    private static let diagnosticsLock = NSLock()
    nonisolated(unsafe) private static var _lastDiagnostic: String?
    nonisolated(unsafe) private static var _lastTokenError: String?

    /// What the last request did, for a debug build to show on screen.
    static var lastDiagnostic: String? {
        get { diagnosticsLock.lock(); defer { diagnosticsLock.unlock() }; return _lastDiagnostic }
        set { diagnosticsLock.lock(); defer { diagnosticsLock.unlock() }; _lastDiagnostic = newValue }
    }
    /// Why reading the access token failed, if it did.
    static var lastTokenError: String? {
        get { diagnosticsLock.lock(); defer { diagnosticsLock.unlock() }; return _lastTokenError }
        set { diagnosticsLock.lock(); defer { diagnosticsLock.unlock() }; _lastTokenError = newValue }
    }
    #endif

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
        return try await get(Envelope.self, ["session"]).user
    }

    func me() async throws -> MeResponse {
        try await get(MeResponse.self, ["me"])
    }

    /// When each student-readable catalogue document last changed.
    func stateManifest() async throws -> [String: Date?] {
        try await get(StateManifest.self, ["state", "manifest"]).keys
    }

    /// A shared catalogue document — content authored in the admin console.
    func state<Value: Decodable>(_ type: Value.Type, key: String) async throws -> RemoteState<Value> {
        try await get(RemoteState<Value>.self, ["state", key])
    }

    /// A private document belonging to the signed-in student.
    func userState<Value: Decodable>(_ type: Value.Type, key: String) async throws -> RemoteState<Value> {
        try await get(RemoteState<Value>.self, ["user-state", key])
    }

    /// Replace a private document. Last write wins, as on the web.
    func putUserState<Value: Encodable>(key: String, value: Value) async throws {
        _ = try await send(["user-state", key], method: "PUT", body: ValueBody(value: value))
    }

    // MARK: - Accounts

    /// Update the caller's own editable profile. The server reads the timezone
    /// from this row when it decides what hour to send reminders (see
    /// `qotdReminders.js`), so keeping it current is what stops a student who
    /// has travelled from being nudged in the middle of the night. None of the
    /// profile fields are locked the way university/year are.
    func putProfile(timezone: String) async throws {
        struct Body: Encodable { let timezone: String }
        _ = try await send(["me", "profile"], method: "PUT", body: Body(timezone: timezone))
    }

    /// Whether this person already has an account, asked before one is made.
    ///
    /// Sign-up runs this first so somebody re-registering is sent to sign in
    /// rather than handed an error after Supabase has already created an auth
    /// user with no roster row behind it. The server holds the UNIQUE index and
    /// is the authority; this is the question, not the enforcement.
    func accountExists(email: String, phone: String) async throws -> (email: Bool, phone: Bool) {
        struct Body: Encodable { let email: String; let phone: String }
        struct Taken: Decodable { let email: Bool; let phone: Bool }
        let data = try await send(["accounts", "exists"], method: "POST",
                                  body: Body(email: email, phone: phone))
        let taken = try Self.decoder.decode(Taken.self, from: data)
        return (taken.email, taken.phone)
    }

    // MARK: - Vouchers

    /// The voucher this student currently has applied, if any.
    func myVoucher() async throws -> VoucherRedemption? {
        struct Envelope: Decodable { let redemption: VoucherRedemption? }
        return try await get(Envelope.self, ["vouchers", "mine"]).redemption
    }

    struct VoucherResult: Decodable, Sendable {
        let ok: Bool
        /// Present when refused: the reason, in words meant for the student.
        let message: String?
        let voucher: Voucher?
    }

    /// Redeem a code.
    ///
    /// A refused voucher comes back as a 200 with a typed reason rather than as
    /// an error status — it is a normal answer, and treating it as a failure
    /// would put the transport into its retry path for something settled.
    func redeemVoucher(code: String) async throws -> VoucherResult {
        struct Body: Encodable { let code: String }
        let data = try await send(["vouchers", "redeem"], method: "POST", body: Body(code: code))
        do {
            return try Self.decoder.decode(VoucherResult.self, from: data)
        } catch {
            throw APIError.malformed("vouchers/redeem: \(error)")
        }
    }

    func releaseVoucher() async throws {
        _ = try await send(["vouchers", "redemption"], method: "DELETE", body: Optional<Int>.none)
    }

    /// Erase this account and everything it owns.
    ///
    /// No id in the path: the only account this can delete is the one whose
    /// token is being presented, which is what makes it safe to expose.
    func deleteAccount() async throws {
        _ = try await send(["account"], method: "DELETE", body: Optional<Int>.none)
    }

    // MARK: - Study assistant

    /// Whether the assistant is usable, and how much of today's quota is left.
    func assistantStatus() async throws -> AssistantStatus {
        try await get(AssistantStatus.self, ["assistant", "status"])
    }

    struct AssistantMessage: Encodable, Sendable {
        let role: AssistantTurn.Role
        let content: String
    }

    struct AssistantReply: Decodable, Sendable {
        /// Nil when the model returned nothing usable, which is a failure the
        /// student is told about rather than an empty bubble.
        let reply: String?
        let plan: String
        let dailyMessages: Int
        let used: Int
        let remaining: Int
    }

    /// Send a turn.
    ///
    /// The whole transcript goes up each time because the server keeps none of
    /// it: the conversation exists only in the client that is having it.
    func assistantChat(
        messages: [AssistantMessage], lang: String, context: AssistantContext
    ) async throws -> AssistantReply {
        struct Body: Encodable {
            let messages: [AssistantMessage]
            let lang: String
            let context: AssistantContext
        }
        let data = try await send(
            ["assistant", "chat"], method: "POST",
            body: Body(messages: messages, lang: lang, context: context)
        )
        do {
            return try Self.decoder.decode(AssistantReply.self, from: data)
        } catch {
            throw APIError.malformed("assistant/chat: \(error)")
        }
    }

    // MARK: - Source documents

    /// Whether a resource has a file behind it right now.
    func resourceStatus(id: String) async throws -> ResourceStatus {
        try await get(ResourceStatus.self, ["medical-resources", id, "status"])
    }

    /// Stream a resource to a temporary file.
    ///
    /// A download rather than a `data` call: these are textbooks, and holding
    /// one in memory to write it out again is how a phone with other apps open
    /// gets the app killed mid-download.
    ///
    /// The URL cannot simply be handed to PDFKit because the endpoint needs the
    /// bearer token, and a viewer given a bare URL sends no Authorization
    /// header — it would render a 401 body as a broken document.
    func downloadResource(id: String, onProgress: @escaping @Sendable (Double) -> Void) async throws -> URL {
        var request = URLRequest(url: url(["medical-resources", id]))
        request.httpMethod = "GET"
        if let accessToken = try await token() {
            request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        }

        let (temporary, response) = try await urlSession.download(
            for: request, delegate: ProgressDelegate(onProgress)
        )

        guard let http = response as? HTTPURLResponse else {
            throw APIError.malformed("no response downloading \(id)")
        }
        switch http.statusCode {
        case 200...299: return temporary
        case 401: throw APIError.unauthorized
        case 402: throw APIError.paymentRequired
        case 403: throw APIError.forbidden
        case 404: throw APIError.notFound
        default: throw APIError.transient(status: http.statusCode)
        }
    }

    /// Reports byte-by-byte progress on a download.
    private final class ProgressDelegate: NSObject, URLSessionTaskDelegate, URLSessionDownloadDelegate, Sendable {
        private let onProgress: @Sendable (Double) -> Void

        init(_ onProgress: @escaping @Sendable (Double) -> Void) {
            self.onProgress = onProgress
        }

        func urlSession(
            _ session: URLSession, downloadTask: URLSessionDownloadTask,
            didWriteData bytesWritten: Int64, totalBytesWritten: Int64, totalBytesExpectedToWrite: Int64
        ) {
            // A server that does not send a length reports -1; showing a bar
            // that never moves is worse than showing none.
            guard totalBytesExpectedToWrite > 0 else { return }
            onProgress(Double(totalBytesWritten) / Double(totalBytesExpectedToWrite))
        }

        func urlSession(
            _ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL
        ) {}
    }

    // MARK: - Study Together

    func createRoom(name: String, questionIds: [String], timed: Bool, secondsPerQuestion: Int?) async throws -> RoomMutation {
        struct Body: Encodable {
            let name: String
            let questionIds: [String]
            let timed: Bool
            let secondsPerQuestion: Int?
        }
        let data = try await send(
            ["study-rooms"], method: "POST",
            body: Body(name: name, questionIds: questionIds, timed: timed, secondsPerQuestion: secondsPerQuestion)
        )
        return try Self.decoder.decode(RoomMutation.self, from: data)
    }

    func joinRoom(code: String) async throws -> RoomMutation {
        struct Body: Encodable { let code: String }
        let data = try await send(["study-rooms", "join"], method: "POST", body: Body(code: code))
        return try Self.decoder.decode(RoomMutation.self, from: data)
    }

    func myRooms() async throws -> [RoomSummary] {
        struct Envelope: Decodable { let rooms: [RoomSummary] }
        return try await get(Envelope.self, ["study-rooms", "mine"]).rooms
    }

    func room(id: String) async throws -> StudyRoom {
        struct Envelope: Decodable { let room: StudyRoom }
        return try await get(Envelope.self, ["study-rooms", id]).room
    }

    func startRoom(id: String) async throws -> RoomMutation {
        let data = try await send(["study-rooms", id, "start"], method: "POST", body: Optional<Int>.none)
        return try Self.decoder.decode(RoomMutation.self, from: data)
    }

    /// Submit one answer.
    ///
    /// `chosenIndex` is a position in the question's option list, not a label.
    /// The server marks it against the same published projection the app reads,
    /// which drops blank options in the same order — so the indexes line up.
    /// Sending a label here would mark every answer against the wrong option.
    func submitAnswer(roomId: String, questionId: String, chosenIndex: Int, seconds: Int) async throws -> RoomMutation {
        struct Body: Encodable {
            let questionId: String
            let chosenIndex: Int
            let seconds: Int
        }
        let data = try await send(
            ["study-rooms", roomId, "answers"], method: "POST",
            body: Body(questionId: questionId, chosenIndex: chosenIndex, seconds: seconds)
        )
        return try Self.decoder.decode(RoomMutation.self, from: data)
    }

    func finishRoom(id: String) async throws -> RoomMutation {
        let data = try await send(["study-rooms", id, "finish"], method: "POST", body: Optional<Int>.none)
        return try Self.decoder.decode(RoomMutation.self, from: data)
    }

    // MARK: - Study parties (the live hall)

    /// The party system (`server/src/parties.js`) — the real Study Rooms hall
    /// with presence, chat and voice. Named apart from the `…Room` methods above,
    /// which drive the separate shared-quiz "Study Together" feature.

    func createParty(name: String) async throws -> PartyMutation {
        struct Body: Encodable { let name: String }
        let data = try await send(["parties"], method: "POST", body: Body(name: name))
        return try Self.decoder.decode(PartyMutation.self, from: data)
    }

    func joinParty(code: String) async throws -> PartyMutation {
        struct Body: Encodable { let code: String }
        let data = try await send(["parties", "join"], method: "POST", body: Body(code: code))
        return try Self.decoder.decode(PartyMutation.self, from: data)
    }

    func myParties() async throws -> [PartySummary] {
        struct Envelope: Decodable { let parties: [PartySummary] }
        return try await get(Envelope.self, ["parties", "mine"]).parties
    }

    func openParties() async throws -> [PartySummary] {
        struct Envelope: Decodable { let parties: [PartySummary] }
        return try await get(Envelope.self, ["parties", "open"]).parties
    }

    /// The full room by id or code. Returns nil for a party the caller cannot see.
    func party(_ idOrCode: String) async throws -> Party? {
        struct Envelope: Decodable { let party: Party? }
        return try await get(Envelope.self, ["parties", idOrCode]).party
    }

    func leaveParty(_ id: String) async throws {
        _ = try await send(["parties", id, "leave"], method: "POST", body: Optional<Int>.none)
    }

    /// "I am still here." Sent from the room every thirty seconds.
    func roomHeartbeat(code: String, activity: String = "studying") async throws {
        struct Body: Encodable { let activity: String }
        _ = try await send(["parties", code, "heartbeat"], method: "POST", body: Body(activity: activity))
    }

    /// The room's members, seats and activity — the same list the socket broadcasts.
    func roomMembers(code: String) async throws -> [RoomMember] {
        struct Envelope: Decodable { let members: [RoomMember] }
        return try await get(Envelope.self, ["parties", code, "members"]).members
    }

    /// Block a student. Gates whispers to and from them server-side.
    func blockUser(_ userId: String) async throws {
        struct Body: Encodable { let userId: String }
        _ = try await send(["friends", "block"], method: "POST", body: Body(userId: userId))
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
            ["devices"],
            method: "POST",
            body: Body(token: deviceToken, environment: environment, locale: locale, appVersion: appVersion)
        )
    }

    func unregisterDevice(token deviceToken: String) async throws {
        _ = try await send(["devices", deviceToken], method: "DELETE", body: Optional<Int>.none)
    }

    // MARK: - Question of the Day

    /// Today's QotD status for the caller's cohort. The question body is not here;
    /// resolve `questionId` from the local ledger.
    func qotdToday() async throws -> QotdToday {
        try await get(QotdToday.self, ["qotd", "today"])
    }

    /// Answer today's question. `answerIndex` is a position in the question's
    /// option list (blank options dropped, same order the server marks against),
    /// not a label — same contract as `submitAnswer`. The server marks it and
    /// returns the outcome; the app never self-marks QotD.
    func qotdAnswer(questionId: String, answerIndex: Int) async throws -> QotdAnswerResult {
        struct Body: Encodable {
            let questionId: String
            let answerIndex: Int
        }
        let data = try await send(
            ["qotd", "answer"], method: "POST",
            body: Body(questionId: questionId, answerIndex: answerIndex)
        )
        return try Self.decoder.decode(QotdAnswerResult.self, from: data)
    }

    /// The cohort leaderboard. `limit` is left to the server default (50); the
    /// path builder takes components only, and the board is small, so no query
    /// string is sent.
    func qotdLeaderboard() async throws -> QotdLeaderboard {
        try await get(QotdLeaderboard.self, ["qotd", "leaderboard"])
    }

    /// Today's results for the caller's friends.
    func qotdFriends() async throws -> QotdFriends {
        try await get(QotdFriends.self, ["qotd", "friends"])
    }

    // MARK: - Transport

    private func get<T: Decodable>(_ type: T.Type, _ components: [String]) async throws -> T {
        let data = try await send(components, method: "GET", body: Optional<Int>.none)
        do {
            return try Self.decoder.decode(T.self, from: data)
        } catch {
            throw APIError.malformed("\(components.joined(separator: "/")): \(error)")
        }
    }

    /// Build the URL one path component at a time.
    ///
    /// Percent-encoding is left to `appendingPathComponent`, which does it once
    /// and correctly. Encoding a key here first — as this did, with
    /// `.alphanumerics`, which escapes `-` and `.` — meant the `%` was escaped
    /// again on the way in, and a key like `synapse-admin-content-ledger-v4`
    /// arrived as `synapse%252Dadmin…`. The server then failed to match it
    /// against the readable set and refused it, so every catalogue 403'd.
    private func url(_ components: [String]) -> URL {
        components.reduce(baseURL) { $0.appendingPathComponent($1) }
    }

    @discardableResult
    private func send<Body: Encodable>(_ components: [String], method: String, body: Body?) async throws -> Data {
        let path = components.joined(separator: "/")
        var request = URLRequest(url: url(components))
        request.httpMethod = method

        if let accessToken = try await token() {
            request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        }
        // Which device is asking, so a write made here does not nudge the phone
        // that made it awake for its own change.
        if let device = await PushRegistrar.shared.deviceToken {
            request.setValue(device, forHTTPHeaderField: "X-Device-Token")
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

        #if DEBUG
        // Recorded rather than logged. Neither `print` nor `Logger` reached the
        // console for an app launched from the home screen in this simulator,
        // so the one diagnostic that mattered was invisible exactly when it was
        // needed. A value the UI can show always arrives.
        let token = request.value(forHTTPHeaderField: "Authorization")
        Self.lastDiagnostic = "\(method) \(path) → \(http.statusCode), token "
            + (token.map { "\($0.count - 7)ch" } ?? "MISSING")
        #endif

        switch http.statusCode {
        case 200...299:
            return data
        case 401:
            throw APIError.unauthorized
        case 402:
            throw APIError.paymentRequired
        case 403:
            throw APIError.forbidden
        case 404:
            throw APIError.notFound
        default:
            throw APIError.transient(status: http.statusCode)
        }
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

// MARK: - My uploads (the personal document locker)

/// Ported from the live-mode half of `src/lib/useMyDocuments.ts`. Same file as
/// the client so these can reuse its private request helpers.
extension SynapseAPI {

    /// The student's own documents, newest first, with their space usage.
    func myDocuments() async throws -> MyDocumentsList {
        try await get(MyDocumentsList.self, ["my-documents"])
    }

    /// Create the record and open a chunked upload session. The server owns the
    /// storage path; this only says what the file is called.
    func createMyDocument(
        title: String, fileName: String, mimeType: String,
        sourceKind: String = "resource", sourceId: String? = nil
    ) async throws -> MyDocumentUpload {
        struct Body: Encodable {
            let title: String; let fileName: String; let mimeType: String
            let sourceKind: String; let sourceId: String?
        }
        let data = try await send(
            ["my-documents"], method: "POST",
            body: Body(title: title, fileName: fileName, mimeType: mimeType, sourceKind: sourceKind, sourceId: sourceId)
        )
        return try Self.decoder.decode(MyDocumentUpload.self, from: data)
    }

    /// Push one chunk of the file — a raw body, not JSON.
    func uploadMyDocumentChunk(documentId: String, uploadId: String, index: Int, data: Data) async throws {
        var request = URLRequest(url: url(["my-documents", documentId, "chunks", uploadId, String(index)]))
        request.httpMethod = "PUT"
        if let accessToken = try await token() {
            request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        }
        request.setValue("application/octet-stream", forHTTPHeaderField: "Content-Type")
        request.httpBody = data
        let response: URLResponse
        do {
            (_, response) = try await urlSession.data(for: request)
        } catch {
            throw APIError.transient(status: nil)
        }
        guard let http = response as? HTTPURLResponse else { throw APIError.malformed("chunk: not HTTP") }
        switch http.statusCode {
        case 200...299: return
        case 401: throw APIError.unauthorized
        case 402: throw APIError.paymentRequired
        case 403: throw APIError.forbidden
        case 404: throw APIError.notFound
        default: throw APIError.transient(status: http.statusCode)
        }
    }

    /// Assemble the pushed chunks into the finished document.
    func completeMyDocument(documentId: String, uploadId: String, totalChunks: Int, sizeBytes: Int) async throws {
        struct Body: Encodable { let totalChunks: Int; let sizeBytes: Int }
        _ = try await send(
            ["my-documents", documentId, "chunks", uploadId, "complete"], method: "POST",
            body: Body(totalChunks: totalChunks, sizeBytes: sizeBytes)
        )
    }

    /// Upload a file in one call and return its new document id — create the
    /// record, push every chunk, assemble. Used where the caller needs the id
    /// back to reference the file (e.g. a whiteboard picture), unlike the
    /// locker's `MyDocumentStore.upload`, which only refreshes the list.
    func uploadMyDocument(
        data: Data, fileName: String, mimeType: String,
        sourceKind: String = "resource", sourceId: String? = nil
    ) async throws -> String {
        let created = try await createMyDocument(
            title: MyDocumentStore.title(from: fileName), fileName: fileName,
            mimeType: mimeType, sourceKind: sourceKind, sourceId: sourceId
        )
        let chunk = MyDocumentStore.chunkBytes
        let total = max(1, Int((Double(data.count) / Double(chunk)).rounded(.up)))
        for index in 0..<total {
            let start = index * chunk
            let end = min(start + chunk, data.count)
            try await uploadMyDocumentChunk(
                documentId: created.id, uploadId: created.uploadId, index: index,
                data: data.subdata(in: start..<end)
            )
        }
        try await completeMyDocument(
            documentId: created.id, uploadId: created.uploadId, totalChunks: total, sizeBytes: data.count
        )
        return created.id
    }

    func renameMyDocument(id: String, title: String) async throws {
        struct Body: Encodable { let title: String }
        _ = try await send(["my-documents", id], method: "PATCH", body: Body(title: title))
    }

    func deleteMyDocument(id: String) async throws {
        _ = try await send(["my-documents", id], method: "DELETE", body: Optional<Int>.none)
    }

    /// Download a finished document to a file on disk. Bearer-authed, so a plain
    /// URL will not do — the same reason `downloadResource` streams to disk.
    func downloadMyDocument(id: String, onProgress: @escaping @Sendable (Double) -> Void) async throws -> URL {
        var request = URLRequest(url: url(["my-documents", id, "file"]))
        request.httpMethod = "GET"
        if let accessToken = try await token() {
            request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        }
        let (temporary, response) = try await urlSession.download(for: request, delegate: ProgressDelegate(onProgress))
        guard let http = response as? HTTPURLResponse, (200...299).contains(http.statusCode) else {
            throw APIError.transient(status: (response as? HTTPURLResponse)?.statusCode)
        }
        let destination = FileManager.default.temporaryDirectory
            .appendingPathComponent("mydoc-\(id)")
        try? FileManager.default.removeItem(at: destination)
        try FileManager.default.moveItem(at: temporary, to: destination)
        return destination
    }
}
