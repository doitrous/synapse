import SwiftUI

/// Build a shared test, or join one with a code.
struct StudyTogetherView: View {
    @Environment(\.strings) private var strings
    let api: SynapseAPI
    let store: LocalStore
    let audience: StudentAudience

    @State private var model: StudyRoomModel?
    @State private var joining = false
    @State private var creating = false
    @State private var code = ""

    var body: some View {
        Group {
            if let model {
                if let room = model.room {
                    RoomView(model: model, room: room)
                } else {
                    lobby(model)
                }
            } else {
                ProgressView().tint(Theme.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            }
        }
        .background(Theme.paper)
        .navigationTitle(strings("Study together"))
        .navigationBarTitleDisplayMode(.inline)
        .task {
            if model == nil {
                let created = StudyRoomModel(api: api, store: store, audience: audience)
                model = created
                await created.loadRooms()
            }
        }
    }

    private func lobby(_ model: StudyRoomModel) -> some View {
        List {
            if let message = model.message {
                Section {
                    Text(message)
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.danger)
                }
                .listRowBackground(Theme.surface)
            }

            Section {
                HStack(spacing: 10) {
                    TextField(strings("Room code"), text: $code)
                        .textInputAutocapitalization(.characters)
                        .autocorrectionDisabled()
                        .font(Theme.numeric(18, weight: 500))
                    Button(strings("Join")) {
                        Task { if await model.join(code: code) { code = "" } }
                    }
                    .tint(Theme.primary)
                    .disabled(code.trimmed.isEmpty)
                }
            } header: {
                Text(strings("Join a test"))
            } footer: {
                Text(strings("Everyone answers the same set at their own pace. Results open once you finish."))
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.ink3)
            }
            .listRowBackground(Theme.surface)

            Section(strings("Start one")) {
                Button {
                    creating = true
                } label: {
                    Label(strings("Build a shared test"), systemImage: "plus.circle")
                        .font(Theme.ui(15))
                }
                .tint(Theme.primary)
            }
            .listRowBackground(Theme.surface)

            if !model.rooms.isEmpty {
                Section(strings("Your rooms")) {
                    ForEach(model.rooms) { summary in
                        Button {
                            Task { await model.open(summary.id) }
                        } label: {
                            HStack {
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(summary.name)
                                        .font(Theme.ui(15, weight: 500))
                                        .foregroundStyle(Theme.ink)
                                    Text("\(summary.questionCount) questions · \(label(summary.status))")
                                        .font(Theme.numeric(11))
                                        .foregroundStyle(Theme.ink3)
                                }
                                Spacer()
                                Text(summary.code)
                                    .font(Theme.numeric(13, weight: 500))
                                    .foregroundStyle(Theme.primary)
                            }
                        }
                        .buttonStyle(.plain)
                    }
                }
                .listRowBackground(Theme.surface)
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .sheet(isPresented: $creating) {
            TestBuilder(store: store, audience: audience) { name, ids, timed in
                Task { await model.create(name: name, questionIds: ids, timed: timed) }
            }
            .localisedSheet()
        }
    }

    private func label(_ status: String) -> String {
        switch status {
        case "lobby": "waiting"
        case "running": "in progress"
        default: "finished"
        }
    }
}

/// Choosing what goes into a shared test.
private struct TestBuilder: View {
    @Environment(\.strings) private var strings
    let store: LocalStore
    let audience: StudentAudience
    let create: (String, [String], Bool) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var name = "Shared test"
    @State private var topic: String?
    @State private var count = 10
    @State private var timed = false
    @State private var available: [Question] = []

    var body: some View {
        NavigationStack {
            Form {
                Section(strings("Test")) {
                    TextField(strings("Name"), text: $name)
                    Picker("Topic", selection: $topic) {
                        Text(strings("Everything")).tag(String?.none)
                        ForEach(topics, id: \.self) { Text($0).tag(String?.some($0)) }
                    }
                    Picker("Questions", selection: $count) {
                        ForEach([5, 10, 20], id: \.self) { Text("\($0)").tag($0) }
                    }
                    .pickerStyle(.segmented)
                    Toggle("Timed", isOn: $timed)
                }

                Section {
                    Text("\(matching.count) question\(matching.count == 1 ? "" : "s") to choose from.")
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink3)
                }
            }
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle(strings("Build a test"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button(strings("Cancel")) { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button(strings("Create")) {
                        create(name.trimmed, Array(matching.shuffled().prefix(count)).map(\.id), timed)
                        dismiss()
                    }
                    .disabled(matching.isEmpty || name.trimmed.isEmpty)
                }
            }
            .task {
                let items = (try? await store.items(kind: .question, audience: audience)) ?? []
                available = items.compactMap(QuestionProjection.project)
            }
        }
    }

    private var topics: [String] {
        Array(Set(available.map(\.topic).filter { !$0.isEmpty })).sorted()
    }

    private var matching: [Question] {
        topic.map { name in available.filter { $0.topic == name } } ?? available
    }
}

/// One room: the lobby, the sitting, then the results.
private struct RoomView: View {
    @Environment(\.strings) private var strings
    let model: StudyRoomModel
    let room: StudyRoom

    @State private var reviewing = false
    @State private var reviewIndex = 0

    var body: some View {
        Group {
            if room.isLobby {
                waiting
            } else if room.myFinished, reviewing {
                review
            } else if room.myFinished {
                results
            } else {
                running
            }
        }
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button(strings("Leave")) { model.close() }.tint(Theme.primary)
            }
        }
    }

    private var waiting: some View {
        VStack(spacing: 20) {
            VStack(spacing: 8) {
                Text(room.name)
                    .font(Theme.display(24))
                    .foregroundStyle(Theme.ink)
                Text(strings("Share this code"))
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
                Text(room.code)
                    .font(Theme.numeric(34, weight: 600))
                    .foregroundStyle(Theme.ink)
                    .tracking(6)
                    .textSelection(.enabled)
                Text("\(room.questionCount) questions · \(room.timed ? "timed" : "untimed")")
                    .font(Theme.numeric(12))
                    .foregroundStyle(Theme.ink3)
            }

            members

            if room.isHost {
                Button {
                    Task { await model.start() }
                } label: {
                    Text(strings("Start the test"))
                        .font(Theme.ui(16, weight: 600))
                        .frame(maxWidth: .infinity)
                        .frame(height: 48)
                        .background(Theme.primary)
                        .foregroundStyle(Theme.onPrimary)
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                }
            } else {
                Text(strings("Waiting for the host to start."))
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink3)
            }
            Spacer()
        }
        .padding(20)
        .frame(maxWidth: .infinity)
        .background(Theme.paper)
    }

    @ViewBuilder
    private var running: some View {
        if let question = model.current {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    HStack {
                        Text("\(model.index + 1) of \(model.questions.count)")
                        Spacer()
                        Text("\(room.members.filter(\.finished).count) of \(room.members.count) finished")
                    }
                    .font(Theme.numeric(12))
                    .foregroundStyle(Theme.ink3)

                    if !question.vignette.isEmpty {
                        Text(question.vignette)
                            .font(Theme.serifBody(16))
                            .foregroundStyle(Theme.ink)
                            .lineSpacing(5)
                    }
                    Text(question.stem)
                        .font(Theme.ui(18, weight: 600))
                        .foregroundStyle(Theme.ink)

                    ForEach(Array(question.options.enumerated()), id: \.element.id) { position, option in
                        Button {
                            Task { await model.answer(optionIndex: position) }
                        } label: {
                            HStack(alignment: .top, spacing: 10) {
                                Text(option.label)
                                    .font(Theme.numeric(13))
                                    .foregroundStyle(Theme.ink3)
                                    .frame(width: 20, alignment: .leading)
                                Text(option.text)
                                    .font(Theme.ui(15))
                                    .foregroundStyle(Theme.ink)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                            }
                            .padding(14)
                            .background(model.chosenIndex == position ? Theme.primaryTint : Theme.surface)
                            .overlay(
                                RoundedRectangle(cornerRadius: Theme.Radius.lg)
                                    .stroke(model.chosenIndex == position ? Theme.primaryLine : Theme.line, lineWidth: 1)
                            )
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                        }
                        .buttonStyle(.plain)
                        .disabled(model.chosenIndex != nil)
                    }

                    // No rationale here, unlike the solo bank: everyone is
                    // still sitting it, and the room's results open together.
                    if model.chosenIndex != nil {
                        Button {
                            Task { await model.next() }
                        } label: {
                            Text(model.index + 1 < model.questions.count ? "Next" : "Hand it in")
                                .font(Theme.ui(16, weight: 600))
                                .frame(maxWidth: .infinity)
                                .frame(height: 48)
                                .background(Theme.primary)
                                .foregroundStyle(Theme.onPrimary)
                                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                        }
                    }
                }
                .padding(20)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
        } else {
            EmptyStateView(
                symbol: "questionmark.circle",
                title: "Questions not downloaded",
                detail: "This room uses questions this device has not synced yet. Pull to refresh the Library, then come back."
            )
        }
    }

    private var results: some View {
        ScrollView {
            VStack(spacing: 18) {
                VStack(spacing: 4) {
                    Text(myScore)
                        .font(Theme.numeric(34, weight: 500))
                        .foregroundStyle(Theme.ink)
                    Text(room.resultsOpen ? "Everyone has finished" : "Waiting for the others")
                        .font(Theme.ui(14))
                        .foregroundStyle(Theme.ink2)
                }
                .padding(.top, 20)

                // Finishing used to end at a score. The questions just sat
                // were unreachable, so the one moment a student is most ready
                // to learn from them had nothing to look at.
                if model.canReview {
                    Button {
                        reviewIndex = 0
                        reviewing = true
                    } label: {
                        Label(strings("Look back at your answers"), systemImage: "eye")
                            .font(Theme.ui(16, weight: 600))
                            .frame(maxWidth: .infinity)
                            .frame(height: 48)
                            .background(Theme.primary)
                            .foregroundStyle(Theme.onPrimary)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }
                } else if !room.myAnswers.isEmpty {
                    // Honest about why, rather than a button that leads nowhere.
                    Text(strings("These questions are no longer published, so they cannot be reopened."))
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink3)
                        .multilineTextAlignment(.center)
                }

                members
            }
            .padding(20)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
    }

    /// The paper, afterwards.
    @ViewBuilder private var review: some View {
        let rows = model.reviewed
        let position = min(reviewIndex, max(0, rows.count - 1))

        if let row = rows.indices.contains(position) ? rows[position] : nil {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    HStack {
                        Text("\(position + 1) of \(rows.count)")
                            .font(Theme.numeric(12))
                            .foregroundStyle(Theme.ink3)
                        Spacer()
                        if !row.wasAnswered {
                            Label(strings("You did not answer this"), systemImage: "minus.circle.fill")
                                .font(Theme.ui(12, weight: 600))
                                .foregroundStyle(Theme.ink3)
                        } else {
                            Label(
                                row.answer.correct ? "You got this right" : "You got this wrong",
                                systemImage: row.answer.correct ? "checkmark.circle.fill" : "xmark.circle.fill"
                            )
                            .font(Theme.ui(12, weight: 600))
                            .foregroundStyle(row.answer.correct ? Theme.success : Theme.danger)
                        }
                    }

                    if !row.question.vignette.isEmpty {
                        Text(row.question.vignette)
                            .font(Theme.serifBody(16))
                            .foregroundStyle(Theme.ink)
                            .lineSpacing(5)
                    }

                    Text(row.question.stem)
                        .font(Theme.ui(18, weight: 600))
                        .foregroundStyle(Theme.ink)

                    ForEach(Array(row.question.options.enumerated()), id: \.element.id) { index, option in
                        OptionRow(
                            option: option,
                            state: state(index, in: row),
                            isAnswered: true
                        ) {}
                    }

                    if let correct = row.correctIndex.map({ row.question.options[$0] }),
                       !correct.explanation.isEmpty {
                        explanation("Why the right answer is right", correct.explanation, Theme.success)
                    }

                    if !row.question.explanation.isEmpty,
                       row.question.explanation != row.correctIndex.map({ row.question.options[$0].explanation }) {
                        explanation("Explanation", row.question.explanation, Theme.ink2)
                    }
                }
                .padding(20)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .safeAreaInset(edge: .bottom) {
                HStack(spacing: 12) {
                    Button { reviewIndex = max(0, position - 1) } label: {
                        Image(systemName: "chevron.left")
                            .frame(width: 48, height: 48)
                            .background(Theme.surface)
                            .foregroundStyle(Theme.primary)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }
                    .disabled(position == 0)
                    .opacity(position == 0 ? 0.4 : 1)

                    Button { reviewing = false } label: {
                        Text(strings("Back to your result"))
                            .font(Theme.ui(15, weight: 600))
                            .frame(maxWidth: .infinity)
                            .frame(height: 48)
                            .background(Theme.surface)
                            .foregroundStyle(Theme.primary)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }

                    Button { reviewIndex = min(rows.count - 1, position + 1) } label: {
                        Image(systemName: "chevron.right")
                            .frame(width: 48, height: 48)
                            .background(Theme.primary)
                            .foregroundStyle(Theme.onPrimary)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }
                    .disabled(position >= rows.count - 1)
                    .opacity(position >= rows.count - 1 ? 0.4 : 1)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 8)
                .floatingChrome(in: Rectangle())
            }
        }
    }

    private func state(_ index: Int, in row: StudyRoomModel.Reviewed) -> OptionRow.State {
        if index == row.correctIndex { return .correct }
        if index == row.answer.chosenIndex { return .chosenWrong }
        return .otherWrong
    }

    private func explanation(_ title: String, _ text: String, _ tint: Color) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title)
                .font(Theme.panelTitle())
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

    private var myScore: String {
        let correct = room.myAnswers.filter(\.correct).count
        return "\(correct) of \(room.questionCount)"
    }

    private var members: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(strings("Who is in"))
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)

            ForEach(room.members) { member in
                HStack {
                    Text(member.name)
                        .font(Theme.ui(14))
                        .foregroundStyle(Theme.ink)
                    Spacer()
                    // A score only when results are open. Until then this is
                    // progress, not a scoreboard — watching a friend's score
                    // climb mid-test is exactly what the server withholds.
                    if let correct = member.correct, room.resultsOpen || member.finished {
                        Text("\(correct) / \(room.questionCount)")
                            .font(Theme.numeric(12))
                            .foregroundStyle(Theme.ink2)
                    } else {
                        Text("\(member.answered) / \(room.questionCount)")
                            .font(Theme.numeric(12))
                            .foregroundStyle(Theme.ink3)
                    }
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
