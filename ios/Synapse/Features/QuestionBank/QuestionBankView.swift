import SwiftUI

/// Drill the question bank: build a sitting, answer, read why.
struct QuestionBankView: View {
    @Environment(\.strings) private var strings
    @State private var model: QuestionBankModel
    @State private var qbank: QBankStore
    @State private var mastery: MasteryModel
    let sync: SyncEngine

    init(store: LocalStore, sync: SyncEngine, api: SynapseAPI, audience: StudentAudience) {
        _model = State(wrappedValue: QuestionBankModel(
            store: store, sync: sync, audience: audience
        ))
        _qbank = State(wrappedValue: QBankStore(api: api, sync: sync))
        _mastery = State(wrappedValue: MasteryModel(api: api, sync: sync))
        self.sync = sync
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().tint(Theme.primary)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if let reason = model.emptyReason {
                    EmptyStateView(symbol: "questionmark.circle", title: "No questions yet", detail: reason)
                } else {
                    switch model.phase {
                    case .building: SessionBuilder(model: model, store: qbank, onRefresh: {
                        await sync.refresh()
                        await model.load()
                    })
                    case .running: Runner(model: model, store: qbank)
                    case .finished: Results(model: model)
                    }
                }
            }
            .background(Theme.paper)
            .navigationTitle(strings("Question bank"))
            .navigationBarTitleDisplayMode(model.phase == .building ? .large : .inline)
        }
        .task {
            model.mastery = mastery
            await model.load()
            await qbank.load()
            await mastery.load()
        }
        // Kept as the student moves *and* as they answer. Saving only on the
        // move would bring a resumed sitting back with the last answer missing,
        // which reads as work that was thrown away.
        .onChange(of: model.index) { _, _ in keep() }
        .onChange(of: model.answeredCount) { _, _ in keep() }
        .onChange(of: model.phase) { _, phase in
            if phase == .running { keep() } else { Task { await qbank.clearLive() } }
        }
        .onChange(of: sync.status) { _, status in
            if case .done = status, model.phase == .building { Task { await model.load() } }
        }
    }

    private func keep() {
        guard model.phase == .running else { return }
        Task { await qbank.keep(model.snapshot()) }
    }
}

// MARK: - Building

private struct SessionBuilder: View {
    @Environment(\.strings) private var strings
    @Bindable var model: QuestionBankModel
    var store: QBankStore
    /// Pull-to-refresh: sync the catalogue then reload. Passed in because the
    /// SyncEngine lives on the parent, not this builder.
    var onRefresh: () async -> Void

    @State private var choosing = false
    @State private var tab = Tab.new

    private enum Tab: String, CaseIterable, Identifiable {
        case new, previous
        var id: String { rawValue }
        var label: String {
            switch self {
            case .new: "New sitting"
            case .previous: "Previous"
            }
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            Picker("", selection: $tab) {
                ForEach(Tab.allCases) { Text($0.label).tag($0) }
            }
            .pickerStyle(.segmented)
            .padding(.horizontal, 20)
            .padding(.bottom, 6)

            switch tab {
            case .new: setup
            case .previous:
                PreviousTests(sessions: model.previousSittings, store: store) { summary in
                    Task {
                        let questions = await model.questions(inSitting: summary.sessionId)
                        guard !questions.isEmpty else { return }
                        model.start(questions: questions, named: store.name(of: summary.sessionId) ?? "Review")
                    }
                }
            }
        }
        .background(Theme.paper)
        .sheet(isPresented: $choosing) {
            TopicChooser(
                topics: model.chooserTopics,
                counts: model.scopeCounts,
                scope: $model.scope,
                subjectName: { $0.uppercased() }
            )
        .localisedSheet()
        }
    }

    private var setup: some View {
        List {
            // Offered before anything else: a student who left a sitting
            // half-done came back for it, not to start another.
            if let saved = store.live, saved.phase == "running" {
                Section {
                    Button {
                        _ = model.resume(saved, from: model.available)
                    } label: {
                        VStack(alignment: .leading, spacing: 3) {
                            Text(saved.name.isEmpty ? "Carry on" : "Carry on: \(saved.name)")
                                .font(Theme.ui(15, weight: 600))
                                .foregroundStyle(Theme.ink)
                            Text("^[\(saved.questionIds.count) question](inflect: true), you were on \(saved.idx + 1).")
                                .font(Theme.ui(13))
                                .foregroundStyle(Theme.ink2)
                        }
                    }
                    Button(strings("Start again instead"), role: .destructive) {
                        Task { await store.clearLive() }
                    }
                    .font(Theme.ui(14))
                }
                .listRowBackground(Theme.surface)
            }

            Section(strings("Quick start")) {
                ForEach(QBankPreset.allCases) { preset in
                    let pool = model.preset(preset)
                    Button {
                        model.start(questions: pool.shuffled(), named: preset.title)
                    } label: {
                        HStack(spacing: 10) {
                            Image(systemName: preset.symbol)
                                .foregroundStyle(pool.isEmpty ? Theme.ink3 : Theme.primary)
                                .frame(width: 22)
                            Text(preset.title)
                                .font(Theme.ui(15))
                                .foregroundStyle(Theme.ink)
                            Spacer()
                            Text("\(pool.count)")
                                .font(Theme.numeric(12))
                                .foregroundStyle(Theme.ink2)
                        }
                    }
                    .disabled(pool.isEmpty)
                }
            }
            .listRowBackground(Theme.surface)

            Section(strings("How")) {
                Picker("Mode", selection: $model.mode) {
                    ForEach(SittingMode.allCases, id: \.self) { Text($0.label).tag($0) }
                }
                .pickerStyle(.segmented)

                Text(model.mode.detail)
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
            }
            .listRowBackground(Theme.surface)

            if store.markedCount > 0 {
                Section {
                    Button {
                        let flagged = model.available.filter { store.isMarked($0.id) }
                        model.start(questions: flagged.shuffled(), named: "Flagged")
                    } label: {
                        Label("^[\(store.markedCount) flagged question](inflect: true)", systemImage: "flag.fill")
                            .font(Theme.ui(15, weight: 600))
                            .foregroundStyle(Theme.primary)
                    }
                } footer: {
                    Text(strings("The ones you marked to come back to."))
                        .font(Theme.ui(13))
                }
                .listRowBackground(Theme.surface)
            }

            Section(strings("Scope")) {
                Button { choosing = true } label: {
                    HStack {
                        Text(strings("What to study"))
                            .foregroundStyle(Theme.ink)
                        Spacer()
                        Text(scopeSummary)
                            .foregroundStyle(Theme.primary)
                        Image(systemName: "chevron.right")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundStyle(Theme.ink3)
                    }
                    .font(Theme.ui(15))
                }
            }
            .listRowBackground(Theme.surface)

            Section(strings("Length")) {
                Picker("Questions", selection: $model.length) {
                    ForEach([5, 10, 20, 40], id: \.self) { Text("\($0)").tag($0) }
                }
                .pickerStyle(.segmented)

                // The web allows any length up to forty; the four buttons are
                // the common ones, not the only ones.
                Stepper(
                    "^[\(model.length) question](inflect: true)",
                    value: $model.length, in: 1...40
                )
                .font(Theme.ui(14))
            }
            .listRowBackground(Theme.surface)

            Section {
                Button {
                    model.start(named: SessionNaming.automatic(
                        subject: scopeSummary == "Everything" ? "" : scopeSummary,
                        existing: Array(store.names.values)
                    ))
                } label: {
                    Text(strings("Start"))
                        .font(Theme.ui(16, weight: 600))
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                }
                .listRowBackground(Theme.primary)
                .foregroundStyle(Theme.onPrimary)
            } footer: {
                Text("\(matching) question\(matching == 1 ? "" : "s") available.")
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink3)
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        // The reading surfaces all pull to refresh; the question bank should too,
        // so a student who just had a new sitting published can reach for it
        // without relaunching. (offline-questions audit, gap: no pull-to-refresh.)
        .refreshable {
            await onRefresh()
        }
    }

    private var matching: Int { model.inScope.count }

    /// What the scope amounts to, said in a few words.
    ///
    /// The plural is spelt out rather than left to `^[…](inflect:)`: that markup
    /// is only read when it reaches `Text` as a literal, and a computed string
    /// arrives as itself — which puts the markup on screen.
    private var scopeSummary: String {
        guard !model.scope.isEmpty else { return "Everything" }
        let chapters = model.scope.filter { $0.hasPrefix("t:") }.count
        let parts = model.scope.filter { $0.hasPrefix("s:") }.count
        if chapters > 0, parts == 0 { return "\(chapters) chapter\(chapters == 1 ? "" : "s")" }
        if parts > 0, chapters == 0 { return "\(parts) part\(parts == 1 ? "" : "s")" }
        return "\(chapters + parts) chosen"
    }
}

// MARK: - Running

private struct Runner: View {
    @Environment(\.strings) private var strings
    let model: QuestionBankModel
    var store: QBankStore?

    @State private var showingNavigator = false
    @State private var showingNote = false
    @State private var showingWrongAnswers = false
    @State private var noteText = ""

    var body: some View {
        if let question = model.current {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    progress

                    if !question.vignette.isEmpty {
                        Text(question.vignette)
                            .font(Theme.serifBody(16))
                            .foregroundStyle(Theme.ink)
                            .lineSpacing(5)
                    }

                    Text(question.stem)
                        .font(Theme.ui(18, weight: 600))
                        .foregroundStyle(Theme.ink)

                    ForEach(question.options) { option in
                        OptionRow(
                            option: option,
                            state: state(for: option, in: question),
                            isAnswered: model.isRevealed
                        ) {
                            model.choose(option.label)
                        }
                    }

                    if model.isRevealed {
                        revealed(question)
                    }
                }
                .padding(20)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .safeAreaInset(edge: .bottom) { footer }
            .toolbar { questionActions }
            .sheet(isPresented: $showingNavigator) {
                QuestionNavigator(model: model, store: store) { position in
                    model.go(to: position)
                    showingNavigator = false
                }
                .localisedSheet()
            }
            .sheet(isPresented: $showingNote) {
                QuestionNoteSheet(text: $noteText, store: store) {
                    guard let id = model.current?.id else { return }
                    Task { await store?.saveNote(noteText, for: id) }
                }
                .localisedSheet()
            }
            .onChange(of: model.index) { _, _ in showingWrongAnswers = false }
        }
    }

    /// Going backwards, and the one thing to do next.
    ///
    /// The per-question actions — flag, note, the jump grid — live in the
    /// navigation bar instead. They belong to the question rather than to the
    /// sitting's flow, and a row of small targets stacked directly above a
    /// full-width button is a mis-tap waiting to happen on a phone.
    private var footer: some View {
        HStack(spacing: 12) {
            Button { model.previous() } label: {
                Image(systemName: "chevron.left")
                    .font(Theme.ui(16, weight: 600))
                    .frame(width: 48, height: 48)
                    .background(Theme.surface)
                    .foregroundStyle(Theme.primary)
                    .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
            }
            .disabled(model.index == 0)
            .opacity(model.index == 0 ? 0.4 : 1)

            primaryAction
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 8)
        .floatingChrome(in: Rectangle())
    }

    /// Flag, note and the jump grid, for the question on screen.
    @ToolbarContentBuilder var questionActions: some ToolbarContent {
        ToolbarItem(placement: .topBarTrailing) {
            AssistantButton(surface: "Question Bank")
        }
        ToolbarItem(placement: .topBarTrailing) {
            Button { showingNavigator = true } label: {
                Label("\(model.index + 1) / \(model.session.count)", systemImage: "square.grid.3x3")
                    .font(Theme.numeric(13))
            }
            .tint(Theme.primary)
        }
        if let question = model.current, let store {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    Task { await store.toggleMark(question.id) }
                } label: {
                    Image(systemName: store.isMarked(question.id) ? "flag.fill" : "flag")
                }
                .tint(Theme.primary)
                .accessibilityLabel(store.isMarked(question.id) ? "Unflag" : "Flag for later")
            }
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    noteText = store.note(question.id)
                    showingNote = true
                } label: {
                    Image(systemName: store.note(question.id).isEmpty ? "note.text" : "note.text.badge.plus")
                }
                .tint(Theme.primary)
                .accessibilityLabel(strings("Your note"))
            }
        }
    }

    /// One button, whose job depends on where the student is.
    ///
    /// In tutor mode checking reveals the answer, so it takes two presses to
    /// move on; in timed mode there is nothing to reveal, so choosing and
    /// moving on are the same act.
    @ViewBuilder private var primaryAction: some View {
        let canCheck = model.chosen != nil && !model.isChecked && model.mode.explainsAsYouGo

        Button {
            if canCheck {
                model.check()
            } else {
                Task { await model.next() }
            }
        } label: {
            Text(canCheck ? "Check" : model.isLastQuestion ? "Finish" : "Next question")
                .font(Theme.ui(16, weight: 600))
                .frame(maxWidth: .infinity)
                .frame(height: 48)
                .background(Theme.primary)
                .foregroundStyle(Theme.onPrimary)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
        .padding(.horizontal, 20)
    }

    private var progress: some View {
        HStack {
            Text("\(model.index + 1) of \(model.session.count)")
            Spacer()
            // A timed sitting shows the clock rather than a score: the score is
            // not knowable yet, and pretending otherwise would give away which
            // answers were right.
            if model.mode == .timed {
                Label(StudyTimer.clock(Double(model.elapsed)), systemImage: "timer")
                    .monospacedDigit()
            } else {
                Text("\(model.correctCount) correct")
            }
        }
        .font(Theme.numeric(12))
        .foregroundStyle(Theme.ink3)
    }

    private func state(for option: AnswerOption, in question: Question) -> OptionRow.State {
        guard let chosen = model.chosen else { return .unanswered }
        // Before the answer is out, a choice is only a choice — marking it
        // right or wrong here is exactly what a timed sitting must not do.
        guard model.isRevealed else { return option.label == chosen ? .chosen : .unanswered }
        if option.label == question.correctLabel { return .correct }
        if option.label == chosen { return .chosenWrong }
        return .otherWrong
    }

    /// Everything explanatory, in one place and in one order.
    ///
    /// Why the right answer is right, then the explanation if it says something
    /// different, then — folded away — why each wrong answer is wrong. The web
    /// gathered these deliberately: they used to be scattered under whichever
    /// options happened to be revealed, which meant reading the page in the
    /// order the options happened to fall.
    @ViewBuilder
    private func revealed(_ question: Question) -> some View {
        let correct = question.correctOption
        let wrong = question.options.filter { $0.label != question.correctLabel && !$0.explanation.isEmpty }
        // Only worth its own block when it says something the rationale did not.
        let separateExplanation = !question.explanation.isEmpty
            && question.explanation != (correct?.explanation ?? "")

        VStack(alignment: .leading, spacing: 12) {
            if let correct, !correct.explanation.isEmpty {
                block(
                    "Why the right answer is right", symbol: "checkmark",
                    tint: Theme.success, text: correct.explanation
                )
            }

            if separateExplanation {
                block("Explanation", symbol: nil, tint: Theme.ink2, text: question.explanation)
            }

            if !wrong.isEmpty {
                DisclosureGroup(isExpanded: $showingWrongAnswers) {
                    VStack(alignment: .leading, spacing: 12) {
                        ForEach(wrong) { option in
                            HStack(alignment: .top, spacing: 10) {
                                Text(option.label)
                                    .font(Theme.numeric(12))
                                    .foregroundStyle(Theme.ink3)
                                    .frame(width: 18, alignment: .leading)
                                VStack(alignment: .leading, spacing: 3) {
                                    Text(option.text)
                                        .font(Theme.ui(13, weight: 600))
                                        .foregroundStyle(Theme.ink)
                                    Text(option.explanation)
                                        .font(Theme.ui(13))
                                        .foregroundStyle(Theme.ink2)
                                }
                            }
                        }
                    }
                    .padding(.top, 10)
                    .frame(maxWidth: .infinity, alignment: .leading)
                } label: {
                    HStack(spacing: 8) {
                        Text(strings("Why the wrong answers are wrong"))
                            .font(Theme.ui(14, weight: 600))
                            .foregroundStyle(Theme.ink)
                        Text("\(wrong.count)")
                            .font(Theme.numeric(11))
                            .foregroundStyle(Theme.ink2)
                            .padding(.horizontal, 7)
                            .padding(.vertical, 2)
                            .background(Theme.inset, in: Capsule())
                    }
                }
                .tint(Theme.primary)
                .padding(14)
                .background(Theme.surface)
                .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
            }

            // Named last because it states what the question was testing —
            // shown earlier it would give the answer away.
            if let objective = question.learningObjective, !objective.isEmpty {
                block("What this tests", symbol: nil, tint: Theme.primaryStrong, text: objective)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private func block(_ title: String, symbol: String?, tint: Color, text: String) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 5) {
                if let symbol { Image(systemName: symbol).font(.system(size: 11, weight: .bold)) }
                Text(title).font(Theme.panelTitle())
            }
            .foregroundStyle(tint)

            Text(text)
                .font(Theme.serifBody(15))
                .foregroundStyle(Theme.ink)
                .lineSpacing(4)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(14)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }
}


// MARK: - Results

private struct Results: View {
    @Environment(\.strings) private var strings
    let model: QuestionBankModel

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                VStack(spacing: 4) {
                    Text("\(model.correctCount) of \(model.answers.count)")
                        .font(Theme.numeric(34))
                        .foregroundStyle(Theme.ink)
                    Text(strings("correct"))
                        .font(Theme.ui(15))
                        .foregroundStyle(Theme.ink2)
                }
                .padding(.top, 24)

                VStack(spacing: 0) {
                    ForEach(Array(model.answers.enumerated()), id: \.offset) { position, answer in
                        if position > 0 { Divider().overlay(Theme.line) }
                        HStack(alignment: .top, spacing: 10) {
                            Image(systemName: answer.isCorrect ? "checkmark" : "xmark")
                                .font(.system(size: 12, weight: .semibold))
                                .foregroundStyle(answer.isCorrect ? Theme.success : Theme.danger)
                                .frame(width: 16)
                            Text(answer.question.stem)
                                .font(Theme.ui(14))
                                .foregroundStyle(Theme.ink)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        .padding(14)
                    }
                }
                .background(Theme.surface)
                .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))

                Button(strings("Another sitting")) { model.restart() }
                    .font(Theme.ui(16, weight: 600))
                    .foregroundStyle(Theme.primary)
            }
            .padding(20)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
    }
}
