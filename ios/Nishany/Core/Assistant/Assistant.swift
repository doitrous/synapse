import Foundation
import Observation

/// The student's side of the study assistant.
///
/// A port of `src/lib/useAssistant.ts`. Two rules shape it. The server owns the
/// quota, so the count shown here is always the one the server just returned
/// rather than one this client decremented — a client that guesses will
/// eventually disagree with the thing doing the enforcing. And a failed turn
/// hands the student's text back to the composer instead of leaving it stranded
/// in a transcript that never got an answer.
///
/// The transcript lives here and nowhere else. It is not saved to the device
/// and the server does not store it.

struct AssistantStatus: Decodable, Equatable, Sendable {
    var available: Bool
    /// Why not, when it is not. Nil when it is.
    var reason: String?
    var plan: String
    var dailyMessages: Int
    var used: Int
    var remaining: Int
}

struct AssistantTurn: Identifiable, Equatable, Sendable {
    enum Role: String, Codable, Sendable { case user, assistant }
    let id: String
    let role: Role
    let content: String
}

/// What the assistant is told about where the student is and what is due.
struct AssistantContext: Encodable, Equatable, Sendable {
    var year: String?
    var dueToday: [String]?
    var weakest: [String]?
    /// The screen the student was on when they asked.
    var surface: String?
}

/// Failures worth phrasing differently, because the student's next move differs.
enum AssistantFailure: Equatable, Sendable {
    case quota, notOnPlan, unavailable, error, offline

    var message: String {
        switch self {
        case .quota: "You have used all your assistant messages for today. They reset at midnight."
        case .notOnPlan: "The assistant is not included on your plan."
        case .unavailable: "The assistant is unavailable right now."
        case .error: "That did not go through. Your message is back in the box — try again."
        case .offline: "You're offline. Your message is back in the box — connect and try again."
        }
    }
}

@MainActor
@Observable
final class AssistantModel {

    private(set) var status: AssistantStatus?
    private(set) var turns: [AssistantTurn] = []
    private(set) var pending = false
    private(set) var failure: AssistantFailure?
    /// Text handed back after a failed send, so the composer can restore it.
    private(set) var returned = ""

    /// The permanent qualifier. Not a one-time notice: the claim it qualifies
    /// is made by every answer, so it belongs beside every answer.
    static let disclaimer = "A study tool, not clinical guidance. Never use it for a decision about a patient."

    /// How long a single message may be, matching the server's own limit.
    static let maxMessageCharacters = 4000

    private let api: NishanyAPI?
    private var counter = 0

    init(api: NishanyAPI? = nil) {
        self.api = api
    }

    /// True only when the server says so.
    ///
    /// A launcher that opens onto "unavailable" is worse than no launcher, so
    /// every entry point asks this before it draws itself.
    var isAvailable: Bool { status?.available == true }

    var isExhausted: Bool { (status?.remaining ?? 0) <= 0 }

    func loadStatus() async {
        guard let api else { return }
        // A status that will not load is indistinguishable, from the student's
        // side, from an assistant that is switched off. Both mean: no launcher.
        status = try? await api.assistantStatus()
    }

    func send(_ text: String, lang: AppLanguage, context: AssistantContext) async {
        let message = String(text.trimmingCharacters(in: .whitespacesAndNewlines)
            .prefix(Self.maxMessageCharacters))
        guard !message.isEmpty, !pending, let api else { return }

        counter += 1
        let outgoing = AssistantTurn(id: "turn-\(counter)", role: .user, content: message)
        turns.append(outgoing)
        pending = true
        failure = nil
        returned = ""
        defer { pending = false }

        do {
            let result = try await api.assistantChat(
                messages: turns.map { .init(role: $0.role, content: $0.content) },
                lang: lang.rawValue,
                context: context
            )

            // The server's figures replace ours wholesale, rather than being
            // merged into them.
            status = AssistantStatus(
                available: status?.available ?? true,
                reason: nil,
                plan: result.plan,
                dailyMessages: result.dailyMessages,
                used: result.used,
                remaining: result.remaining
            )

            guard let reply = result.reply, !reply.isEmpty else {
                rollBack(outgoing, message: message, failure: .error)
                return
            }
            counter += 1
            turns.append(AssistantTurn(id: "turn-\(counter)", role: .assistant, content: reply))
        } catch {
            // Roll the student's message back out of the transcript and hand it
            // back: a question sitting under a failed send reads as
            // asked-and-ignored.
            rollBack(outgoing, message: message, failure: Self.failure(for: error))
            if case .quota = Self.failure(for: error), let current = status {
                status = AssistantStatus(
                    available: current.available, reason: current.reason, plan: current.plan,
                    dailyMessages: current.dailyMessages, used: current.dailyMessages, remaining: 0
                )
            }
        }
    }

    func reset() {
        turns = []
        failure = nil
        returned = ""
    }

    func clearFailure() { failure = nil }

    /// Told to a message that never got sent because there was plainly no
    /// connection to send it over — cheaper and more honest than letting the
    /// request go out just to fail with the generic message.
    func markOffline() { failure = .offline }

    /// Consumed once, so re-opening the panel does not resurrect old text.
    func takeReturned() -> String {
        defer { returned = "" }
        return returned
    }

    private func rollBack(_ turn: AssistantTurn, message: String, failure: AssistantFailure) {
        turns.removeAll { $0.id == turn.id }
        returned = message
        self.failure = failure
    }

    /// Each status the server uses to say something different to the student.
    static func failure(for error: Error) -> AssistantFailure {
        guard let api = error as? APIError else { return .error }
        switch api {
        case .forbidden: return .notOnPlan
        case .transient(let status) where status == 429: return .quota
        case .transient(let status) where status == 503: return .unavailable
        default: return .error
        }
    }
}
