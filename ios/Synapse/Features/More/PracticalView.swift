import SwiftUI

/// OSCE stations, clinical cases, lab and imaging sets, and skills checklists.
struct PracticalView: View {
    @Environment(\.strings) private var strings
    let store: LocalStore
    let sync: SyncEngine
    let audience: StudentAudience
    let api: SynapseAPI

    @State private var groups: [(type: String, items: [Practical])] = []
    @State private var isLoading = true
    @State private var model: PracticalModel?

    var body: some View {
        Group {
            if isLoading {
                ProgressView().tint(Theme.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else if groups.isEmpty {
                EmptyStateView(
                    symbol: "list.bullet.clipboard",
                    title: "Nothing to practise yet",
                    detail: "No practical items have been published for you yet."
                )
            } else {
                List {
                    ForEach(groups, id: \.type) { group in
                        Section {
                            ForEach(group.items) { item in
                                if isSkill(item), item.markSections.isEmpty {
                                    // Nothing to open: the rating in the row
                                    // is the whole of it.
                                    row(item)
                                        .listRowBackground(Theme.surface)
                                } else {
                                    NavigationLink {
                                        PracticalDetailView(practical: item, model: model)
                                    } label: {
                                        row(item)
                                    }
                                    .listRowBackground(Theme.surface)
                                }
                            }
                        } header: {
                            Text(group.type)
                                .font(Theme.panelTitle())
                                .foregroundStyle(Theme.ink2)
                                .textCase(nil)
                        }
                    }
                }
                .listStyle(.insetGrouped)
                .scrollContentBackground(.hidden)
                .background(Theme.paper)
            }
        }
        .background(Theme.paper)
        .navigationTitle(strings("Practical"))
        .navigationBarTitleDisplayMode(.inline)
        .task {
            if model == nil {
                let created = PracticalModel(api: api, sync: sync)
                model = created
                await created.load()
            }
            await load()
        }
    }

    private func row(_ item: Practical) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: item.symbol)
                .font(.system(size: 15))
                .foregroundStyle(Theme.primary)
                .frame(width: 22)
            VStack(alignment: .leading, spacing: 3) {
                Text(item.title)
                    .font(Theme.ui(15, weight: 500))
                    .foregroundStyle(Theme.ink)
                HStack(spacing: 8) {
                    if let minutes = item.minutes { Text("\(minutes) min") }
                    if let marks = item.marks { Text("\(marks) marks") }
                    Text(item.difficulty)
                }
                .font(Theme.numeric(11))
                .foregroundStyle(Theme.ink3)

                // Where they got to, when they have been here before.
                if let done = standing(item) {
                    Text(done)
                        .font(Theme.numeric(11))
                        .foregroundStyle(Theme.success)
                }
            }

            Spacer(minLength: 0)

            // A skill is rated by the student, so it is rated from the list —
            // there is nothing to open and read.
            if isSkill(item), let model {
                Button {
                    Task { await model.cycle(skill: item.id) }
                } label: {
                    let status = model.skill(item.id)
                    Text(status.label)
                        .font(Theme.ui(11, weight: 600))
                        .foregroundStyle(colour(status))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(colour(status).opacity(0.12), in: Capsule())
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.vertical, 2)
    }

    private func isSkill(_ item: Practical) -> Bool { item.type == "Skills checklist" }

    private func colour(_ status: PracticalProgress.SkillStatus) -> Color {
        switch status {
        case .notStarted: Theme.ink3
        case .practised: Theme.primary
        case .ready: Theme.success
        }
    }

    /// What this student has already done here, said in a few characters.
    private func standing(_ item: Practical) -> String? {
        guard let model else { return nil }

        if let station = model.station(item.id), station.outOf > 0 {
            return "Best \(station.bestMarks)/\(station.outOf)"
        }
        if let progress = model.caseProgress(item.id) {
            return progress.status == .completed
                ? "Finished"
                : "Got to \(progress.lastStep) of \(progress.steps)"
        }
        if let lab = model.lab(item.id), lab.items > 0 {
            return "\(lab.done) of \(lab.items) answered"
        }
        return nil
    }

    private func load() async {
        isLoading = true
        defer { isLoading = false }

        let items = (try? await store.items(kind: .practical, audience: audience)) ?? []
        let practicals = items.compactMap(PracticalProjection.project)

        // Grouped by type, in the order a student meets them rather than
        // alphabetically.
        let order = ["OSCE station", "Clinical case", "Skills checklist", "Lab interpretation", "Imaging interpretation"]
        let byType = Dictionary(grouping: practicals, by: \.type)
        groups = byType
            .map { (type: $0.key, items: $0.value.sorted { $0.title < $1.title }) }
            .sorted { (order.firstIndex(of: $0.type) ?? 99) < (order.firstIndex(of: $1.type) ?? 99) }
    }
}

/// Reading one practical item.
///
/// Answers and debriefs are held behind a tap. A mark scheme visible while you
/// are still working through a station is not a mark scheme, it is the answers.
struct PracticalDetailView: View {
    @Environment(\.strings) private var strings
    let practical: Practical
    var model: PracticalModel?

    @State private var revealed = false
    @State private var ticked: Set<String> = []
    /// The ticks as they stood when this screen opened, so leaving without
    /// changing anything does not count as another attempt.
    @State private var opened: Set<String> = []

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                header

                if let instructions = practical.candidateInstructions {
                    section("Your instructions") {
                        Text(instructions)
                            .font(Theme.serifBody(15))
                            .foregroundStyle(Theme.ink)
                            .lineSpacing(4)
                    }
                }

                ForEach(practical.decisions) { decision in
                    section(decision.title.isEmpty ? "Decision" : LocalizedStringKey(decision.title)) {
                        VStack(alignment: .leading, spacing: 8) {
                            if !decision.context.isEmpty {
                                Text(decision.context)
                                    .font(Theme.serifBody(15))
                                    .foregroundStyle(Theme.ink)
                                    .lineSpacing(4)
                            }
                            if let prompt = decision.prompt {
                                Text(prompt)
                                    .font(Theme.ui(14, weight: 500))
                                    .foregroundStyle(Theme.ink)
                            }
                            if revealed, let answer = decision.answer {
                                Text(answer)
                                    .font(Theme.ui(14))
                                    .foregroundStyle(Theme.ink2)
                            }
                        }
                    }
                }

                ForEach(practical.questions) { question in
                    section("Question") {
                        VStack(alignment: .leading, spacing: 6) {
                            Text(question.prompt)
                                .font(Theme.ui(15))
                                .foregroundStyle(Theme.ink)
                            if revealed, let answer = question.answer {
                                Text(answer)
                                    .font(Theme.ui(14))
                                    .foregroundStyle(Theme.ink2)
                            }
                        }
                    }
                }

                if !practical.markSections.isEmpty { markScheme }

                if revealed, let debrief = practical.debrief {
                    section("Debrief") {
                        Text(debrief)
                            .font(Theme.serifBody(15))
                            .foregroundStyle(Theme.ink)
                            .lineSpacing(4)
                    }
                }

                if hasHiddenContent {
                    Button {
                        revealed = true
                    } label: {
                        Text(strings("Show the answers"))
                            .font(Theme.ui(16, weight: 600))
                            .frame(maxWidth: .infinity)
                            .frame(height: 48)
                            .background(revealed ? Theme.inset : Theme.primary)
                            .foregroundStyle(revealed ? Theme.ink3 : Theme.onPrimary)
                            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
                    }
                    .disabled(revealed)
                }

                if !practical.references.isEmpty {
                    section("References") {
                        VStack(alignment: .leading, spacing: 4) {
                            ForEach(practical.references, id: \.self) { reference in
                                Text(reference)
                                    .font(Theme.ui(13))
                                    .foregroundStyle(Theme.ink2)
                            }
                        }
                    }
                }
            }
            .padding(20)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
        .navigationTitle(practical.title)
        .navigationBarTitleDisplayMode(.inline)
        .onAppear(perform: resume)
        .onDisappear(perform: keep)
    }

    private var hasHiddenContent: Bool {
        practical.debrief != nil
            || practical.decisions.contains { $0.answer != nil }
            || practical.questions.contains { $0.answer != nil }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(practical.title)
                .font(Theme.display(24))
                .foregroundStyle(Theme.ink)
            HStack(spacing: 10) {
                Text(practical.type)
                if let minutes = practical.minutes { Text("\(minutes) min") }
                if let marks = practical.marks { Text("\(marks) marks") }
            }
            .font(Theme.numeric(12))
            .foregroundStyle(Theme.ink3)

            if let objective = practical.learningObjective {
                Text(objective)
                    .font(Theme.ui(15))
                    .foregroundStyle(Theme.ink2)
            }
        }
    }

    /// Tickable, because a station is marked by working through it rather than
    /// by reading it.
    private var markScheme: some View {
        section("Mark scheme") {
            VStack(alignment: .leading, spacing: 12) {
                ForEach(practical.markSections) { markSection in
                    VStack(alignment: .leading, spacing: 6) {
                        if !markSection.title.isEmpty {
                            Text(markSection.title)
                                .font(Theme.ui(13, weight: 600))
                                .foregroundStyle(Theme.ink2)
                        }
                        ForEach(Array(markSection.items.enumerated()), id: \.offset) { index, item in
                            let key = "\(markSection.id)-\(index)"
                            Button {
                                if ticked.contains(key) { ticked.remove(key) } else { ticked.insert(key) }
                            } label: {
                                HStack(alignment: .top, spacing: 8) {
                                    Image(systemName: ticked.contains(key) ? "checkmark.square.fill" : "square")
                                        .font(.system(size: 14))
                                        .foregroundStyle(ticked.contains(key) ? Theme.success : Theme.ink3)
                                    Text(item)
                                        .font(Theme.ui(14))
                                        .foregroundStyle(Theme.ink)
                                        .frame(maxWidth: .infinity, alignment: .leading)
                                }
                            }
                            .buttonStyle(.plain)
                        }
                    }
                }
                if totalMarkItems > 0 {
                    HStack {
                        Text("\(ticked.count) of \(totalMarkItems) ticked")
                            .font(Theme.numeric(12))
                            .foregroundStyle(Theme.ink3)
                        Spacer()
                        // What they managed before, so a second run has
                        // something to beat.
                        if let best = model?.station(practical.id), best.outOf > 0 {
                            Text("Best \(best.bestMarks)/\(best.outOf) · ^[\(best.attempts) go](inflect: true)")
                                .font(Theme.numeric(12))
                                .foregroundStyle(Theme.ink2)
                        }
                    }
                }
            }
        }
    }

    private var totalMarkItems: Int {
        practical.markSections.reduce(0) { $0 + $1.items.count }
    }

    /// Pick up where the last run left off.
    private func resume() {
        guard let model else { return }
        ticked = model.resumedTicks(practical.id)
        opened = ticked
    }

    /// Keep what this run came to.
    ///
    /// On the way out rather than on every tick: the record is one document,
    /// and a fifty-point mark scheme would otherwise cost fifty writes. A run
    /// that changed nothing is not a run — reopening a station to read it
    /// should not count as another attempt at it.
    private func keep() {
        guard let model, ticked != opened else { return }

        Task {
            if totalMarkItems > 0 {
                await model.record(station: practical, ticked: ticked, outOf: totalMarkItems)
            } else if !practical.decisions.isEmpty {
                await model.record(
                    case: practical,
                    reachedStep: revealed ? practical.decisions.count : 0,
                    completed: revealed
                )
            } else if !practical.questions.isEmpty {
                await model.record(lab: practical, answered: revealed ? practical.questions.count : 0)
            }
        }
    }

    private func section<Content: View>(
        _ title: LocalizedStringKey, @ViewBuilder content: () -> Content
    ) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)
            content()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .card()
    }
}
