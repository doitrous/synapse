import Foundation
import Observation

/// Question of the Day — one shared question per cohort, a personal streak, the
/// cohort leaderboard, and the friends comparison.
///
/// The server marks answers (`api.qotdAnswer`), so this never self-marks and
/// never writes a question-bank attempt: QotD is a separate progress track. The
/// question BODY is resolved from the local published ledger by the id the
/// server names, exactly as the question bank resolves its questions.
@MainActor
@Observable
final class QotdModel {

    private let api: NishanyAPI
    private let store: LocalStore
    private let audience: StudentAudience

    private(set) var isLoading = true
    private(set) var errorText: String?
    private(set) var emptyReason: String?

    private(set) var today: QotdToday?
    private(set) var question: Question?
    private(set) var answered = false
    private(set) var chosenLabel: String?
    private(set) var correctLabel: String?
    private(set) var current = 0
    private(set) var longest = 0
    private(set) var leaderboard: QotdLeaderboard?
    private(set) var friends: QotdFriends?

    init(api: NishanyAPI, store: LocalStore, audience: StudentAudience = .unknown) {
        self.api = api
        self.store = store
        self.audience = audience
    }

    /// Whether today's question is present and unanswered.
    var canAnswer: Bool { question != nil && !answered }

    func load() async {
        isLoading = true
        defer { isLoading = false }
        errorText = nil

        let todayResult: QotdToday
        do {
            todayResult = try await api.qotdToday()
        } catch {
            errorText = "Today's question could not be loaded."
            return
        }
        today = todayResult
        current = todayResult.current
        longest = todayResult.longest
        answered = todayResult.answered

        // Resolve the question body from the local published ledger by id.
        if let id = todayResult.questionId {
            let resolved = await resolveQuestion(id: id)
            question = resolved
            emptyReason = resolved == nil
                ? "Today's question isn't on this device yet — it may be outside your year, or still downloading."
                : nil
        } else {
            question = nil
            emptyReason = "There's no Question of the Day for your year today."
        }

        // Fold a prior answer from today back into the view.
        if let index = todayResult.answerIndex, let q = question, q.options.indices.contains(index) {
            chosenLabel = q.options[index].label
        }
        if todayResult.answered, let q = question {
            correctLabel = q.correctLabel
        }

        // The leaderboard and friends are secondary — a failure of either must
        // not blank the question.
        await loadSocial()
    }

    func answer(_ label: String) async {
        guard !answered, let q = question,
              let index = q.options.firstIndex(where: { $0.label == label }) else { return }
        do {
            let result = try await api.qotdAnswer(questionId: q.id, answerIndex: index)
            answered = true
            chosenLabel = label
            correctLabel = q.options.indices.contains(result.correctIndex)
                ? q.options[result.correctIndex].label
                : q.correctLabel
            current = result.current
            longest = result.longest
        } catch {
            errorText = "Your answer couldn't be submitted. Check your connection and try again."
            return
        }
        await loadSocial()
    }

    private func loadSocial() async {
        do { leaderboard = try await api.qotdLeaderboard() } catch { leaderboard = nil }
        do { friends = try await api.qotdFriends() } catch { friends = nil }
    }

    private func resolveQuestion(id: String) async -> Question? {
        do {
            let items = try await store.items(kind: .question, audience: audience)
            let byID = Dictionary(
                items.compactMap(QuestionProjection.project).map { ($0.id, $0) },
                uniquingKeysWith: { first, _ in first }
            )
            return byID[id]
        } catch {
            return nil
        }
    }
}
