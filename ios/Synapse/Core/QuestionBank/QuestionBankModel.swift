import Foundation
import Observation

/// A sitting of the question bank.
@MainActor
@Observable
final class QuestionBankModel {

    enum Phase: Equatable {
        case building
        case running
        case finished
    }

    /// What the student has done with one question.
    struct Answered: Equatable {
        let question: Question
        let chosenLabel: String
        let seconds: Int
        var isCorrect: Bool { question.isCorrect(chosenLabel) }
    }

    private(set) var phase: Phase = .building
    private(set) var available: [Question] = []
    private(set) var isLoading = true
    private(set) var emptyReason: String?

    /// The questions in this sitting, in order.
    private(set) var session: [Question] = []
    private(set) var index = 0
    /// Question id → the option chosen. Held for the whole sitting rather than
    /// only the current question, because a student may go back.
    private(set) var picked: [String: String] = [:]
    /// Question id → whether they have committed to it. Choosing and committing
    /// are separate: in timed mode a student changes their mind, and only
    /// checking makes it final.
    private(set) var checked: [String: Bool] = [:]
    /// Indices actually looked at, so the navigator can tell a question left
    /// behind from one not reached yet.
    private(set) var visited: Set<Int> = []
    private(set) var answers: [Answered] = []

    var mode: SittingMode = .tutor
    /// Set when a finished sitting is being read back rather than taken.
    private(set) var reviewing = false
    /// Seconds this sitting has run, for the timed clock.
    private(set) var elapsed = 0
    private(set) var sessionName = ""
    /// Seconds spent on each question, kept so an attempt records the time
    /// actually spent rather than the time since the sitting began.
    private var spent: [String: Int] = [:]

    /// Chapters a student can narrow to.
    var topics: [String] {
        Array(Set(available.map(\.topic).filter { !$0.isEmpty })).sorted()
    }

    var selectedTopic: String?
    var length = 10

    private let store: LocalStore
    private let sync: SyncEngine
    private var questionStartedAt = Date()
    private(set) var sessionId = QBankStore.newSessionID()
    private var clock: Task<Void, Never>?
    var audience: StudentAudience

    init(store: LocalStore, sync: SyncEngine, audience: StudentAudience = .unknown) {
        self.store = store
        self.sync = sync
        self.audience = audience
    }

    var current: Question? { session.indices.contains(index) ? session[index] : nil }

    /// What the student has chosen for the question on screen, if anything.
    var chosen: String? { current.flatMap { picked[$0.id] } }
    /// Whether they have committed to it.
    var isChecked: Bool { current.map { checked[$0.id] == true } ?? false }
    /// Whether the answer is on show. Tutor mode reveals on checking; timed
    /// mode holds everything back until the sitting is over.
    var isRevealed: Bool { reviewing || (mode.explainsAsYouGo && isChecked) }
    var correctCount: Int { answers.filter(\.isCorrect).count }

    var answeredCount: Int { session.filter { picked[$0.id] != nil }.count }
    var isLastQuestion: Bool { index == session.count - 1 }

    /// Questions reached, left unanswered, and walked past.
    ///
    /// Worth naming separately from "not reached": a student scanning for
    /// unfinished work needs to know which gaps they already went by. The one
    /// they are looking at right now is not among them — they have not passed
    /// it over yet, and counting it would nag about the question on screen.
    var omitted: [Int] {
        session.indices.filter {
            $0 != index && visited.contains($0) && picked[session[$0].id] == nil
        }
    }

    /// Where a question stands, for the navigator.
    ///
    /// Not "where the student is" — that is a separate fact, and the navigator
    /// draws it as a border rather than a colour.
    func state(at position: Int) -> QuestionState {
        guard session.indices.contains(position) else { return .unseen }
        let question = session[position]

        guard let choice = picked[question.id] else {
            // The question on screen has not been passed over yet.
            if position == index { return .unseen }
            return visited.contains(position) ? .omitted : .unseen
        }

        // Before anything is graded, an answered question is just answered —
        // showing it as right or wrong would give the answer away in a timed
        // sitting.
        guard reviewing || (mode.explainsAsYouGo && checked[question.id] == true) else { return .answered }
        return question.isCorrect(choice) ? .correct : .wrong
    }

    func load() async {
        isLoading = true
        defer { isLoading = false }

        do {
            let items = try await store.items(kind: .question, audience: audience)
            available = items.compactMap(QuestionProjection.project)
            emptyReason = available.isEmpty ? await describeEmptiness(published: items.count) : nil
        } catch {
            available = []
            emptyReason = "The question bank could not be opened on this device."
        }
    }

    // MARK: - Running a sitting

    func start(questions: [Question]? = nil, named name: String = "") {
        let pool = questions
            ?? selectedTopic.map { topic in available.filter { $0.topic == topic } }
            ?? available
        session = questions ?? Array(pool.shuffled().prefix(length))
        sessionId = QBankStore.newSessionID()
        sessionName = name
        index = 0
        picked = [:]
        checked = [:]
        visited = [0]
        spent = [:]
        answers = []
        reviewing = false
        elapsed = 0
        questionStartedAt = Date()
        phase = session.isEmpty ? .building : .running
        if phase == .running, mode == .timed { startClock() }
    }

    /// Put a sitting saved elsewhere back on screen.
    func resume(_ saved: LiveSession, from pool: [Question]) -> Bool {
        let byID = Dictionary(uniqueKeysWithValues: pool.map { ($0.id, $0) })
        let restored = saved.questionIds.compactMap { byID[$0] }
        // A question unpublished since the sitting began cannot be answered, so
        // the sitting is dropped rather than resumed short and scored wrong.
        guard restored.count == saved.questionIds.count, !restored.isEmpty else { return false }

        session = restored
        sessionId = saved.sessionId
        sessionName = saved.name
        mode = saved.mode
        index = min(max(saved.idx, 0), restored.count - 1)
        // The record stores an option's position; this build knows it by
        // label. Mapping through the question itself is what keeps a sitting
        // resumable when the options were shuffled or relabelled.
        picked = saved.answers.reduce(into: [:]) { result, entry in
            guard let question = byID[entry.key], question.options.indices.contains(entry.value)
            else { return }
            result[entry.key] = question.options[entry.value].label
        }
        checked = saved.checked
        visited = Set(saved.visited)
        reviewing = saved.reviewing
        elapsed = saved.elapsed
        answers = []
        questionStartedAt = Date()
        phase = saved.phase == "results" ? .finished : .running
        if phase == .running, mode == .timed { startClock() }
        return true
    }

    /// The sitting as it stands, for keeping.
    func snapshot() -> LiveSession {
        LiveSession(
            questionIds: session.map(\.id),
            idx: index,
            answers: optionIndices(),
            checked: checked,
            mode: mode,
            sessionId: sessionId,
            elapsed: elapsed,
            visited: visited.sorted(),
            reviewing: reviewing,
            name: sessionName,
            phase: phase == .finished ? "results" : "running",
            startedAt: ISO8601DateFormatter.synapse.string(from: questionStartedAt)
        )
    }

    /// Choices as option positions, which is what the shared record holds.
    private func optionIndices() -> [String: Int] {
        let byID = Dictionary(uniqueKeysWithValues: session.map { ($0.id, $0) })
        return picked.reduce(into: [:]) { result, entry in
            guard let question = byID[entry.key],
                  let position = question.options.firstIndex(where: { $0.label == entry.value })
            else { return }
            result[entry.key] = position
        }
    }

    private func startClock() {
        clock?.cancel()
        clock = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(for: .seconds(1))
                guard let self, self.phase == .running else { return }
                self.elapsed += 1
            }
        }
    }

    func stopClock() {
        clock?.cancel()
        clock = nil
    }

    /// Commit to an answer. Deliberately irreversible — a question you can
    /// re-answer after seeing the explanation teaches nothing and makes the
    /// accuracy figure a fiction.
    func choose(_ label: String) {
        guard let question = current, checked[question.id] != true, !reviewing else { return }
        picked[question.id] = label
    }

    /// Commit to the answer on screen.
    ///
    /// Deliberately irreversible — a question you can re-answer after seeing the
    /// explanation teaches nothing and makes the accuracy figure a fiction.
    /// Before this, in a timed sitting, a student may change their mind freely.
    func check() {
        guard let question = current, let choice = picked[question.id], checked[question.id] != true
        else { return }

        checked[question.id] = true
        spent[question.id] = max(0, Int(Date().timeIntervalSince(questionStartedAt)))
        answers.append(Answered(
            question: question, chosenLabel: choice, seconds: spent[question.id] ?? 0
        ))
    }

    func go(to position: Int) {
        guard session.indices.contains(position), position != index else { return }
        index = position
        visited.insert(position)
        questionStartedAt = Date()
    }

    func previous() {
        guard index > 0 else { return }
        go(to: index - 1)
    }

    func next() async {
        if index + 1 < session.count {
            go(to: index + 1)
        } else {
            await finish()
        }
    }

    /// End the sitting and write it down.
    ///
    /// In a timed sitting every answer is committed here rather than as it was
    /// given — that is what "answers come at the end" means, and it is why an
    /// unchecked choice still counts.
    func finish() async {
        guard phase == .running else { return }
        stopClock()

        if !mode.explainsAsYouGo {
            for question in session where checked[question.id] != true {
                guard let choice = picked[question.id] else { continue }
                checked[question.id] = true
                answers.append(Answered(
                    question: question, chosenLabel: choice, seconds: spent[question.id] ?? 0
                ))
            }
        }

        reviewing = true
        phase = .finished
        await recordAttempts()
    }

    func restart() {
        stopClock()
        phase = .building
        session = []
        answers = []
        picked = [:]
        checked = [:]
        visited = []
        index = 0
        reviewing = false
        elapsed = 0
    }

    // MARK: - Recording

    /// Write the sitting to the student's record.
    ///
    /// Saved locally first, and only then pushed. The server holds a month of
    /// attempts as a single document, so writing one means replacing the whole
    /// thing — a step that can fail, and must never be the only copy of work a
    /// student has just done.
    private func recordAttempts() async {
        let now = Date()
        let stamp = ISO8601DateFormatter.synapse.string(from: now)
        let month = AttemptStore.month(of: now)

        for answer in answers {
            let record = AttemptRecord(
                id: "\(sessionId)-\(answer.question.id)",
                at: stamp,
                surface: "qbank",
                itemId: answer.question.id,
                subjectId: answer.question.subjectId,
                topic: answer.question.topic,
                difficulty: answer.question.difficulty,
                conceptIds: answer.question.conceptIds,
                correct: answer.isCorrect,
                seconds: answer.seconds,
                sessionId: sessionId
            )
            if let encoded = try? JSONEncoder().encode(record) {
                try? await store.saveAttempt(id: record.id, month: month, record: encoded)
            }
        }

        await pushAttempts()
    }

    /// Push every month that has unsent attempts.
    ///
    /// The whole month is written, rebuilt from the local record, because the
    /// server document is replaced rather than appended to.
    func pushAttempts() async {
        guard let months = try? await store.monthsWithPendingAttempts() else { return }

        for month in months {
            guard let rows = try? await store.attempts(month: month) else { continue }
            let records = rows.compactMap { try? JSONDecoder().decode(AttemptRecord.self, from: $0) }
            guard !records.isEmpty else { continue }

            await sync.write(
                key: AttemptStore.monthKey(month),
                value: AttemptMonth(month: month, records: records)
            )
            try? await store.markAttemptsPushed(month: month)
        }

        await pushIndex()
    }

    /// The headline totals, so a summary can be read without loading a shard.
    ///
    /// Built from every month on the device, not just the ones that happened to
    /// be pending. Summing only the months in this push wrote a global index
    /// that silently dropped every earlier month a student had already synced —
    /// their totals shrank as they studied.
    private func pushIndex() async {
        let months = (try? await store.allAttemptMonths()) ?? []
        var totals = AttemptTotals()
        var seen: Set<String> = []

        for month in months {
            guard let rows = try? await store.attempts(month: month) else { continue }
            for row in rows {
                guard let record = try? JSONDecoder().decode(AttemptRecord.self, from: row) else { continue }
                totals.attempts += 1
                if let correct = record.correct {
                    totals.marked += 1
                    if correct { totals.correct += 1 }
                }
                if totals.lastAt == nil || record.at > totals.lastAt! { totals.lastAt = record.at }
            }
            seen.insert(month)
        }

        await sync.write(
            key: AttemptStore.indexKey,
            value: AttemptIndex(months: seen.sorted(), totals: totals)
        )
    }

    private func describeEmptiness(published: Int) async -> String {
        let total = (try? await store.itemCount(kind: .question)) ?? 0
        if total == 0 {
            let nothingSynced = (try? await store.catalogueVersions().isEmpty) ?? true
            return nothingSynced
                ? "Nothing has downloaded yet. Pull to refresh once you have a connection."
                : "No questions have been published yet."
        }
        if published == 0 {
            return "No questions are published for your university and year yet."
        }
        // Published, in scope, and still nothing sittable: every one was
        // unmarkable. Worth distinguishing — it is a content fault, not an
        // empty catalogue.
        return "The published questions could not be read on this device."
    }
}

extension ISO8601DateFormatter {
    /// Fractional seconds, matching what the web app writes.
    static let synapse: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter
    }()
}
