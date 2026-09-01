import Foundation
import Observation

/// Sitting a shared test with other people.
///
/// This is the one surface that cannot work offline: a room is other students,
/// and their answers only exist on the server. So unlike every other screen it
/// talks to the API directly rather than reading the cache, and says plainly
/// when it cannot reach it.
@MainActor
@Observable
final class StudyRoomModel {

    private(set) var rooms: [RoomSummary] = []
    private(set) var room: StudyRoom?
    private(set) var isLoading = false
    private(set) var message: String?

    /// The questions in the current room, in the room's order.
    private(set) var questions: [Question] = []
    private(set) var index = 0
    private(set) var chosenIndex: Int?

    private let api: SynapseAPI
    private let store: LocalStore
    /// Which cohort's content this student may see.
    var audience: StudentAudience
    private var pollTask: Task<Void, Never>?
    private var questionStartedAt = Date()

    init(api: SynapseAPI, store: LocalStore, audience: StudentAudience = .unknown) {
        self.api = api
        self.store = store
        self.audience = audience
    }

    /// Polling is stopped by `close()`, which every exit from a room goes
    /// through. It cannot be cancelled in `deinit`: the task is main-actor
    /// state and `deinit` is not, and reaching across that boundary is the kind
    /// of race the compiler is right to refuse.
    private func stopPolling() {
        pollTask?.cancel()
        pollTask = nil
    }

    var current: Question? { questions.indices.contains(index) ? questions[index] : nil }

    // MARK: - Listing

    func loadRooms() async {
        isLoading = true
        defer { isLoading = false }
        do {
            rooms = try await api.myRooms()
            message = nil
        } catch {
            message = "Could not reach Nishany. A shared test needs a connection."
        }
    }

    // MARK: - Creating and joining

    func create(name: String, questionIds: [String], timed: Bool) async -> Bool {
        do {
            let result = try await api.createRoom(
                name: name, questionIds: questionIds, timed: timed,
                secondsPerQuestion: timed ? 90 : nil
            )
            guard result.succeeded else { message = result.message; return false }
            if let id = result.id ?? result.room?.id { await open(id) }
            return true
        } catch {
            message = "Could not create the room."
            return false
        }
    }

    func join(code: String) async -> Bool {
        let tidied = code.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        guard !tidied.isEmpty else { return false }
        do {
            let result = try await api.joinRoom(code: tidied)
            guard result.succeeded else { message = result.message; return false }
            if let id = result.id ?? result.room?.id { await open(id) }
            return true
        } catch {
            message = "Could not join that room."
            return false
        }
    }

    // MARK: - One room

    func open(_ id: String) async {
        isLoading = true
        defer { isLoading = false }
        await reload(id)
        startPolling(id)
    }

    func close() {
        stopPolling()
        room = nil
        questions = []
        index = 0
        chosenIndex = nil
    }

    func reload(_ id: String) async {
        do {
            let fresh = try await api.room(id: id)
            room = fresh
            message = nil
            await loadQuestions(for: fresh)
        } catch APIError.notFound {
            message = "That room is no longer available."
            close()
        } catch {
            // Keep whatever is on screen: a dropped poll should not blank the
            // room a student is halfway through.
            if room == nil { message = "Could not reach the room." }
        }
    }

    /// Watch the room while it matters.
    ///
    /// Polling stops once the student has finished and results are open —
    /// there is nothing left to change, and a timer that never stops is a
    /// battery drain nobody attributes to the app that caused it.
    private func startPolling(_ id: String) {
        pollTask?.cancel()
        pollTask = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(4))
                guard let self else { return }
                let done = await MainActor.run {
                    guard let room = self.room else { return true }
                    return room.myFinished && room.resultsOpen
                }
                if done || Task.isCancelled { return }
                await self.reload(id)
            }
        }
    }

    /// The room's questions, read from the local catalogue.
    ///
    /// The server sends only IDs; the text is content the app already has. A
    /// question the server names but this device has not synced is skipped
    /// rather than shown blank.
    ///
    /// Scoped to this student's own cohort, not to whoever built the room.
    /// Content is licensed per university, and a room naming a question from
    /// another one must not be the way round that — so a question this student
    /// may not see is skipped exactly like one that has not synced.
    private func loadQuestions(for room: StudyRoom) async {
        guard !room.questionIds.isEmpty else { questions = []; return }

        let items = (try? await store.items(kind: .question, audience: audience)) ?? []
        let byId = Dictionary(
            items.compactMap(QuestionProjection.project).map { ($0.id, $0) },
            uniquingKeysWith: { first, _ in first }
        )
        let wasOn = current?.id
        questions = room.questionIds.compactMap { byId[$0] }

        // Resume where they left off rather than at the top.
        let answered = room.answeredIds
        index = questions.firstIndex { !answered.contains($0.id) } ?? max(0, questions.count - 1)

        // Only when the question underneath actually changed.
        //
        // This runs on every poll, and clearing the selection unconditionally
        // made a room impossible to hand in: answer the last question, wait
        // for one poll, and the choice — along with the button that submits
        // it — silently disappeared. Resetting the clock each time was the
        // quieter half of the same bug, recording the poll interval as the
        // time spent on every question.
        if current?.id != wasOn {
            chosenIndex = nil
            questionStartedAt = Date()
        }
    }

    // MARK: - The paper, afterwards

    /// One answered question, ready to be read back.
    struct Reviewed: Identifiable, Sendable {
        let question: Question
        let answer: StudyRoom.Answer

        var id: String { question.id }
        /// Which option was the right one, read from the published question.
        var correctIndex: Int? {
            question.options.firstIndex { $0.label == question.correctLabel }
        }

        /// Whether the student actually chose something.
        ///
        /// Handing in leaves anything untouched recorded as not correct, with
        /// no option behind it. That is a different thing from choosing badly,
        /// and saying "you got this wrong" about a question nobody answered
        /// tells a student they made a mistake they did not make.
        var wasAnswered: Bool { question.options.indices.contains(answer.chosenIndex) }
    }

    /// The sitting, in the order it was set.
    ///
    /// The verdict comes from the server's record of what the student answered.
    /// Only *which* option is the right one is read from the published question
    /// — the same split the question bank's own review uses, so a question
    /// edited since the sitting cannot retrospectively change whether an answer
    /// was marked right.
    var reviewed: [Reviewed] {
        guard let room else { return [] }
        let byID = Dictionary(questions.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })
        return room.questionIds.compactMap { id in
            guard let question = byID[id],
                  let answer = room.myAnswers.first(where: { $0.questionId == id })
            else { return nil }
            return Reviewed(question: question, answer: answer)
        }
    }

    /// Whether there is anything left to look at.
    ///
    /// A question withdrawn since the sitting cannot be reopened, so offering
    /// the button and then showing an empty screen would be worse than not
    /// offering it.
    var canReview: Bool { !reviewed.isEmpty }

    // MARK: - Sitting it

    func start() async {
        guard let room else { return }
        do {
            let result = try await api.startRoom(id: room.id)
            if !result.succeeded { message = result.message }
            await reload(room.id)
        } catch {
            message = "Could not start the test."
        }
    }

    func answer(optionIndex: Int) async {
        guard let room, let question = current, chosenIndex == nil else { return }
        chosenIndex = optionIndex

        do {
            let result = try await api.submitAnswer(
                roomId: room.id,
                questionId: question.id,
                chosenIndex: optionIndex,
                seconds: max(0, Int(Date().timeIntervalSince(questionStartedAt)))
            )
            if !result.succeeded { message = result.message }
        } catch {
            // The answer is gone. Say so rather than letting the student
            // believe it counted.
            message = "That answer did not reach the room."
            chosenIndex = nil
        }
    }

    func next() async {
        guard let room else { return }
        if index + 1 < questions.count {
            index += 1
            chosenIndex = nil
            questionStartedAt = Date()
        } else {
            do {
                _ = try await api.finishRoom(id: room.id)
            } catch {
                message = "Could not hand it in."
            }
            await reload(room.id)
        }
    }
}
