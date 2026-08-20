import SwiftUI

/// Adaptive Study.
///
/// Six panels over one model. Everything here is computed on the device from
/// the evidence ledger and the blueprint — nothing asks a server what a student
/// knows.
struct AdaptiveStudyView: View {
    let audience: StudentAudience

    @State private var model: AdaptiveStudyModel
    @State private var tab = Panel.today
    @Environment(\.strings) private var strings

    init(api: SynapseAPI, sync: SyncEngine, audience: StudentAudience) {
        _model = State(wrappedValue: AdaptiveStudyModel(api: api, sync: sync))
        self.audience = audience
    }

    enum Panel: String, CaseIterable, Identifiable {
        case today, practice, readiness, concepts, plan, how
        var id: String { rawValue }

        var label: String {
            switch self {
            case .today: "Today"
            case .practice: "Practice"
            case .readiness: "Readiness"
            case .concepts: "Concepts"
            case .plan: "Plan"
            case .how: "How this works"
            }
        }
    }

    var body: some View {
        // No `NavigationStack` of its own: this is pushed from the More menu's
        // stack, and nesting one inside another gives the screen two navigation
        // bars — the outer one keeping whatever chrome it was built with.
        Group {
            if model.isLoading {
                ProgressView().tint(Theme.primary)
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else if model.scopeUnknown {
                // Every figure here is scoped to a university and year.
                // Rendering it without one would show a blueprint that belongs
                // to nobody.
                EmptyStateView(
                    symbol: "location.slash",
                    title: "Your university and year are not set",
                    detail: "Adaptive Study works against your own exam blueprint, so it needs to know which programme you are on. Set it in your account and this page will fill in."
                )
            } else {
                content
            }
        }
        .background(Theme.paper)
        .navigationTitle(strings("Adaptive Study"))
        .navigationBarTitleDisplayMode(.inline)
        .task { await model.load(audience: audience) }
    }

    private var content: some View {
        VStack(spacing: 0) {
            Picker("", selection: $tab) {
                ForEach(Panel.allCases) { Text(strings($0.label)).tag($0) }
            }
            .pickerStyle(.segmented)
            .padding(.horizontal, 16)
            .padding(.bottom, 8)

            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    switch tab {
                    case .today: today
                    case .practice: practice
                    case .readiness: readinessPanel
                    case .concepts: concepts
                    case .plan: plan
                    case .how: how
                    }
                }
                .padding(16)
                .frame(maxWidth: 680)
                .frame(maxWidth: .infinity)
            }
            .screenIn(tab)
        }
    }

    // MARK: - Today

    @ViewBuilder private var today: some View {
        let counts = model.statusCounts()

        if !model.blueprint.isEmpty {
            panel(strings("Where you stand")) {
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(ConceptStatus.allCases, id: \.self) { status in
                        if let count = counts[status], count > 0 {
                            HStack {
                                Circle().fill(colour(status)).frame(width: 7, height: 7)
                                Text(strings(status.label))
                                    .font(Theme.ui(14))
                                    .foregroundStyle(Theme.ink)
                                Spacer()
                                Text("\(count)")
                                    .font(Theme.numeric(13))
                                    .foregroundStyle(Theme.ink2)
                            }
                        }
                    }
                }
            }
        }

        // The number every student asks about, next to the one it is not.
        panel(strings(AdaptiveExplain.wrongAttemptsVersusWeakConcepts.heading)) {
            VStack(alignment: .leading, spacing: 10) {
                HStack(spacing: 24) {
                    figure(strings("Wrong answers"), "\(model.rawWrongTotal)")
                    figure(strings("Weak concepts"), "\(counts[.weak] ?? 0)")
                }
                Text(strings(AdaptiveExplain.wrongAttemptsVersusWeakConcepts.body))
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
            }
        }

        if !model.blueprint.isEmpty {
            panel(strings("Blueprint coverage")) {
                VStack(alignment: .leading, spacing: 10) {
                    meter(model.coverage.coveredWeight)
                    Text(strings("Coverage is measured in blueprint weight, not questions answered."))
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink3)

                    ForEach(model.coverage.groups.prefix(6)) { group in
                        HStack {
                            Text(group.groupLabel)
                                .font(Theme.ui(13))
                                .foregroundStyle(Theme.ink)
                                .lineLimit(1)
                            Spacer()
                            Text(percent(group.weight > 0 ? group.coveredWeight / group.weight : 0))
                                .font(Theme.numeric(12))
                                .foregroundStyle(Theme.ink2)
                        }
                    }
                }
            }
        }

        nextBlock
    }

    private var nextBlock: some View {
        let plan = model.nextBlockPlan()

        return panel(strings("What your next block will contain")) {
            VStack(alignment: .leading, spacing: 8) {
                ForEach(AllocationNeed.allCases, id: \.self) { need in
                    HStack {
                        Text(strings(need.label))
                            .font(Theme.ui(13))
                            .foregroundStyle(Theme.ink)
                        Spacer()
                        Text("\(plan.targets[need])")
                            .font(Theme.numeric(13))
                            .foregroundStyle(Theme.ink2)
                    }
                }
                if plan.debtRepaid > 0 {
                    Text("^[\(plan.debtRepaid) slot](inflect: true) moved into coverage to repay earlier blocks.")
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink3)
                }
            }
        }
    }

    // MARK: - Practice

    @ViewBuilder private var practice: some View {
        if model.repairTargets.isEmpty, model.dueForReview.isEmpty {
            EmptyStateView(
                symbol: "checkmark.circle",
                title: "Nothing needs repairing",
                detail: "Answer some questions and what you find hard will show up here."
            )
        } else {
            if !model.repairTargets.isEmpty {
                panel(strings("Worth going back to")) {
                    VStack(alignment: .leading, spacing: 10) {
                        ForEach(model.repairTargets.prefix(8), id: \.conceptId) { state in
                            conceptRow(state)
                        }
                    }
                }
            }
            if !model.dueForReview.isEmpty {
                panel(strings("Due for review")) {
                    VStack(alignment: .leading, spacing: 10) {
                        ForEach(model.dueForReview.prefix(8), id: \.conceptId) { state in
                            conceptRow(state)
                        }
                    }
                }
            }
        }
    }

    // MARK: - Readiness

    @ViewBuilder private var readinessPanel: some View {
        panel(strings("How ready you are")) {
            VStack(alignment: .leading, spacing: 10) {
                if let result = model.readiness, result.answered > 0 {
                    Text("\(percent(result.lower)) – \(percent(result.upper))")
                        .font(Theme.display(30))
                        .foregroundStyle(Theme.ink)
                }
                Text(Readiness.sentence(model.readiness))
                    .font(Theme.ui(14))
                    .foregroundStyle(Theme.ink2)
            }
        }

        if let result = model.readiness, !result.groups.isEmpty {
            panel(strings("By area")) {
                VStack(alignment: .leading, spacing: 10) {
                    ForEach(result.groups) { group in
                        HStack {
                            Text(group.groupLabel)
                                .font(Theme.ui(13))
                                .foregroundStyle(Theme.ink)
                            Spacer()
                            // A range from two answers is a number pretending
                            // to be evidence, so a thin group says so instead.
                            if let lower = group.lower, let upper = group.upper {
                                Text("\(percent(lower)) – \(percent(upper))")
                                    .font(Theme.numeric(12))
                                    .foregroundStyle(Theme.ink2)
                            } else {
                                Text(strings("Too few to say"))
                                    .font(Theme.ui(11))
                                    .foregroundStyle(Theme.ink3)
                            }
                        }
                    }
                }
            }
        }

        panel(strings(AdaptiveExplain.adaptiveChoosesWhatToStudy.heading)) {
            Text(strings(AdaptiveExplain.adaptiveChoosesWhatToStudy.body))
                .font(Theme.ui(13))
                .foregroundStyle(Theme.ink2)
        }
    }

    // MARK: - Concepts

    @ViewBuilder private var concepts: some View {
        if model.blueprint.isEmpty {
            EmptyStateView(
                symbol: "square.stack.3d.up.slash",
                title: "No blueprint in scope",
                detail: "Your programme has no exam blueprint published yet, so there is nothing to measure against."
            )
        } else {
            panel(strings("Every concept on your blueprint")) {
                VStack(alignment: .leading, spacing: 10) {
                    ForEach(model.blueprint.prefix(40)) { node in
                        let state = model.states[node.conceptId]
                        HStack(spacing: 8) {
                            Circle()
                                .fill(colour(state?.status ?? .unmeasured))
                                .frame(width: 7, height: 7)
                            Text(node.label)
                                .font(Theme.ui(13))
                                .foregroundStyle(Theme.ink)
                                .lineLimit(1)
                            Spacer(minLength: 8)
                            Text(strings((state?.status ?? .unmeasured).label))
                                .font(Theme.ui(11))
                                .foregroundStyle(Theme.ink3)
                        }
                    }
                }
            }
        }
    }

    // MARK: - Plan

    @ViewBuilder private var plan: some View {
        panel(strings("How this block divides")) {
            VStack(alignment: .leading, spacing: 10) {
                if let days = model.daysToExam {
                    Text("^[\(days) day](inflect: true) to your exam.")
                        .font(Theme.ui(14))
                        .foregroundStyle(Theme.ink)
                } else {
                    Text(strings("No exam scheduled, so practice favours depth over breadth."))
                        .font(Theme.ui(14))
                        .foregroundStyle(Theme.ink2)
                }

                ForEach(AllocationNeed.allCases, id: \.self) { need in
                    HStack {
                        Text(strings(need.label))
                            .font(Theme.ui(13))
                            .foregroundStyle(Theme.ink)
                        Spacer()
                        Text(percent(model.shares[need]))
                            .font(Theme.numeric(13))
                            .foregroundStyle(Theme.ink2)
                    }
                }
            }
        }
    }

    // MARK: - How this works

    private var how: some View {
        VStack(alignment: .leading, spacing: 16) {
            panel(strings(AdaptiveExplain.wrongAttemptsVersusWeakConcepts.heading)) {
                Text(strings(AdaptiveExplain.wrongAttemptsVersusWeakConcepts.body))
                    .font(Theme.ui(13)).foregroundStyle(Theme.ink2)
            }
            panel(strings(AdaptiveExplain.adaptiveChoosesWhatToStudy.heading)) {
                Text(strings(AdaptiveExplain.adaptiveChoosesWhatToStudy.body))
                    .font(Theme.ui(13)).foregroundStyle(Theme.ink2)
            }
            panel(strings(AdaptiveExplain.readinessMeasuresWhereYouStand.heading)) {
                Text(strings(AdaptiveExplain.readinessMeasuresWhereYouStand.body))
                    .font(Theme.ui(13)).foregroundStyle(Theme.ink2)
            }
            Text("Algorithm v\(model.config.version)")
                .font(Theme.numeric(11))
                .foregroundStyle(Theme.ink3)
        }
    }

    // MARK: - Pieces

    private func conceptRow(_ state: ConceptState) -> some View {
        HStack(spacing: 8) {
            Circle().fill(colour(state.status)).frame(width: 7, height: 7)
            VStack(alignment: .leading, spacing: 2) {
                Text(model.label(for: state.conceptId))
                    .font(Theme.ui(14))
                    .foregroundStyle(Theme.ink)
                    .lineLimit(1)
                // The estimate is never shown without its interval — that is
                // what stops the interface claiming one right answer is
                // mastery.
                Text("\(percent(state.mean)) ± \(percent(state.uncertainty))")
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink3)
            }
            Spacer(minLength: 8)
            Text(strings(state.status.label))
                .font(Theme.ui(11))
                .foregroundStyle(colour(state.status))
        }
    }

    private func figure(_ label: String, _ value: String) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(label).font(Theme.ui(12)).foregroundStyle(Theme.ink2)
            Text(value).font(Theme.display(26)).foregroundStyle(Theme.ink)
        }
    }

    private func meter(_ fraction: Double) -> some View {
        GeometryReader { geometry in
            ZStack(alignment: .leading) {
                Capsule().fill(Theme.inset)
                Capsule().fill(Theme.primary)
                    .frame(width: geometry.size.width * min(max(fraction, 0), 1))
            }
        }
        .frame(height: 8)
    }

    private func panel<Content: View>(
        _ title: String, @ViewBuilder content: () -> Content
    ) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)
            content()
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }

    private func percent(_ value: Double) -> String {
        "\(Int((value * 100).rounded()))%"
    }

    /// Status colours. Blue is structural here — it marks a review coming
    /// round, which is a fact about the schedule rather than about the student.
    private func colour(_ status: ConceptStatus) -> Color {
        switch status {
        case .weak: Theme.danger
        case .attention: Theme.warning
        case .developing: Theme.primary
        case .secure: Theme.success
        case .reviewDue: Theme.accent
        case .unmeasured: Theme.ink3
        }
    }
}
