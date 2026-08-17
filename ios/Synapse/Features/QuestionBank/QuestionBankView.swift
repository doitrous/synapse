import SwiftUI

/// Drill the question bank: build a sitting, answer, read why.
struct QuestionBankView: View {
    @State private var model: QuestionBankModel
    let sync: SyncEngine

    init(store: LocalStore, sync: SyncEngine, audience: StudentAudience) {
        _model = State(wrappedValue: QuestionBankModel(
            store: store, sync: sync, audience: audience
        ))
        self.sync = sync
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().tint(Theme.accent)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if let reason = model.emptyReason {
                    EmptyStateView(symbol: "questionmark.circle", title: "No questions yet", detail: reason)
                } else {
                    switch model.phase {
                    case .building: SessionBuilder(model: model)
                    case .running: Runner(model: model)
                    case .finished: Results(model: model)
                    }
                }
            }
            .background(Theme.paper)
            .navigationTitle("Question bank")
            .navigationBarTitleDisplayMode(model.phase == .building ? .large : .inline)
        }
        .task { await model.load() }
        .onChange(of: sync.status) { _, status in
            if case .done = status, model.phase == .building { Task { await model.load() } }
        }
    }
}

// MARK: - Building

private struct SessionBuilder: View {
    @Bindable var model: QuestionBankModel

    var body: some View {
        List {
            Section("Scope") {
                Picker("Topic", selection: $model.selectedTopic) {
                    Text("Everything").tag(String?.none)
                    ForEach(model.topics, id: \.self) { Text($0).tag(String?.some($0)) }
                }
            }
            .listRowBackground(Theme.surface)

            Section("Length") {
                Picker("Questions", selection: $model.length) {
                    ForEach([5, 10, 20, 40], id: \.self) { Text("\($0)").tag($0) }
                }
                .pickerStyle(.segmented)
            }
            .listRowBackground(Theme.surface)

            Section {
                Button {
                    model.start()
                } label: {
                    Text("Start")
                        .font(Theme.ui(16, weight: 600))
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                }
                .listRowBackground(Theme.accent)
                .foregroundStyle(Theme.onAccent)
            } footer: {
                Text("\(matching) question\(matching == 1 ? "" : "s") available.")
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink3)
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
    }

    private var matching: Int {
        model.selectedTopic.map { topic in model.available.filter { $0.topic == topic }.count }
            ?? model.available.count
    }
}

// MARK: - Running

private struct Runner: View {
    let model: QuestionBankModel

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
                            isAnswered: model.isAnswered
                        ) {
                            model.choose(option.label)
                        }
                    }

                    if model.isAnswered {
                        revealed(question)
                    }
                }
                .padding(20)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .safeAreaInset(edge: .bottom) {
                if model.isAnswered {
                    Button {
                        Task { await model.next() }
                    } label: {
                        Text(model.index + 1 < model.session.count ? "Next question" : "Finish")
                            .font(Theme.ui(16, weight: 600))
                            .frame(maxWidth: .infinity)
                            .frame(height: 48)
                            .background(Theme.accent)
                            .foregroundStyle(Theme.onAccent)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }
                    .padding(.horizontal, 20)
                    .padding(.bottom, 8)
                    .background(.ultraThinMaterial)
                }
            }
        }
    }

    private var progress: some View {
        HStack {
            Text("\(model.index + 1) of \(model.session.count)")
            Spacer()
            Text("\(model.correctCount) correct")
        }
        .font(Theme.numeric(12))
        .foregroundStyle(Theme.ink3)
    }

    private func state(for option: AnswerOption, in question: Question) -> OptionRow.State {
        guard let chosen = model.chosen else { return .unanswered }
        if option.label == question.correctLabel { return .correct }
        if option.label == chosen { return .chosenWrong }
        return .otherWrong
    }

    /// Everything held back until the student has committed.
    @ViewBuilder
    private func revealed(_ question: Question) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            if !question.explanation.isEmpty {
                VStack(alignment: .leading, spacing: 6) {
                    Text("Explanation")
                        .font(Theme.panelTitle())
                        .foregroundStyle(Theme.ink2)
                    Text(question.explanation)
                        .font(Theme.serifBody(15))
                        .foregroundStyle(Theme.ink)
                        .lineSpacing(4)
                }
            }

            // Named last because it states what the question was testing —
            // shown earlier it would give the answer away.
            if let objective = question.learningObjective {
                VStack(alignment: .leading, spacing: 6) {
                    Text("What this tests")
                        .font(Theme.panelTitle())
                        .foregroundStyle(Theme.accentStrong)
                    Text(objective)
                        .font(Theme.ui(14))
                        .foregroundStyle(Theme.ink)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }
}

private struct OptionRow: View {
    enum State { case unanswered, correct, chosenWrong, otherWrong }

    let option: AnswerOption
    let state: State
    let isAnswered: Bool
    let choose: () -> Void

    var body: some View {
        Button(action: choose) {
            VStack(alignment: .leading, spacing: 8) {
                HStack(alignment: .top, spacing: 10) {
                    Text(option.label)
                        .font(Theme.numeric(13))
                        .foregroundStyle(labelColor)
                        .frame(width: 20, alignment: .leading)
                    Text(option.text)
                        .font(Theme.ui(15))
                        .foregroundStyle(Theme.ink)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    if let symbol {
                        Image(systemName: symbol).foregroundStyle(labelColor)
                    }
                }

                // The reason this option is right or wrong. Shown for every
                // option, because the one a student picked is the one they
                // need explained.
                if isAnswered, !option.explanation.isEmpty {
                    Text(option.explanation)
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink2)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(.leading, 30)
                }
            }
            .padding(14)
            .background(background)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(border, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
        .buttonStyle(.plain)
        .disabled(isAnswered)
    }

    private var symbol: String? {
        switch state {
        case .correct: "checkmark"
        case .chosenWrong: "xmark"
        default: nil
        }
    }

    private var labelColor: Color {
        switch state {
        case .correct: Theme.success
        case .chosenWrong: Theme.danger
        default: Theme.ink3
        }
    }

    private var background: Color {
        switch state {
        case .unanswered, .otherWrong: Theme.surface
        case .correct, .chosenWrong: Theme.surface2
        }
    }

    private var border: Color {
        switch state {
        case .correct: Theme.success
        case .chosenWrong: Theme.danger
        default: Theme.line
        }
    }
}

// MARK: - Results

private struct Results: View {
    let model: QuestionBankModel

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                VStack(spacing: 4) {
                    Text("\(model.correctCount) of \(model.answers.count)")
                        .font(Theme.numeric(34))
                        .foregroundStyle(Theme.ink)
                    Text("correct")
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

                Button("Another sitting") { model.restart() }
                    .font(Theme.ui(16, weight: 600))
                    .foregroundStyle(Theme.accent)
            }
            .padding(20)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
    }
}
