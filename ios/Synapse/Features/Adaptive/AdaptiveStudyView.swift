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
        let week = model.weeklyPlan()

        panel(strings("This week")) {
            VStack(alignment: .leading, spacing: 14) {
                // The one dial. Everything below is arithmetic on this number,
                // so it sits at the top of what it changes rather than in a
                // settings screen somewhere else.
                Stepper(value: $model.minutesPerDay, in: 0...600, step: 15) {
                    HStack {
                        Text(strings("Minutes a day"))
                            .font(Theme.ui(14))
                            .foregroundStyle(Theme.ink)
                        Spacer()
                        Text("\(model.minutesPerDay)")
                            .font(Theme.numeric(14))
                            .foregroundStyle(Theme.ink2)
                    }
                }
                .tint(Theme.primary)

                ForEach(orderedDates(week), id: \.self) { date in
                    let tasks = week.tasks.filter { $0.date == date }
                    VStack(alignment: .leading, spacing: 6) {
                        HStack(alignment: .firstTextBaseline) {
                            Text(dayName(date))
                                .font(Theme.ui(13).weight(.semibold))
                                .foregroundStyle(Theme.ink)
                            Spacer()
                            Text("\(tasks.reduce(0) { $0 + $1.expectedMinutes })m")
                                .font(Theme.numeric(12))
                                .foregroundStyle(Theme.ink3)
                        }
                        ForEach(tasks) { taskRow($0) }
                    }
                }
            }
        }

        panel(strings("Where the week's time goes")) {
            VStack(alignment: .leading, spacing: 10) {
                ForEach(AllocationNeed.allCases, id: \.self) { need in
                    let minutes = week.needMinutes[need] ?? 0
                    VStack(alignment: .leading, spacing: 4) {
                        HStack {
                            Text(strings(need.label))
                                .font(Theme.ui(13))
                                .foregroundStyle(Theme.ink)
                            Spacer()
                            Text("\(minutes)m")
                                .font(Theme.numeric(12))
                                .foregroundStyle(Theme.ink2)
                        }
                        meter(week.plannedMinutes > 0 ? Double(minutes) / Double(week.plannedMinutes) : 0,
                              tint: need == .weakness ? Theme.primary : Theme.ink3)
                    }
                }
            }
        }

        panel(strings("Capacity")) {
            VStack(alignment: .leading, spacing: 8) {
                capacityRow(strings("You said you have"), week.statedMinutes, tint: Theme.ink2)
                capacityRow(strings("Planned"), week.plannedMinutes, tint: Theme.ink2)
                // Shown, not hidden. A buffer a student cannot see is a buffer
                // they assume is not there.
                capacityRow(strings("Deliberately left free"), week.bufferMinutes, tint: Theme.primary)
            }
        }

        if !week.unplaced.isEmpty {
            panel(strings("What would not fit")) {
                VStack(alignment: .leading, spacing: 8) {
                    ForEach(Array(week.unplaced.enumerated()), id: \.offset) { _, task in
                        VStack(alignment: .leading, spacing: 2) {
                            Text(strings(task.title))
                                .font(Theme.ui(13).weight(.medium))
                                .foregroundStyle(Theme.ink)
                            Text(strings(task.reason))
                                .font(Theme.ui(12))
                                .foregroundStyle(Theme.ink3)
                        }
                    }
                    Text(strings("Your stated hours cannot hold everything the plan wanted. The shortfall is shown rather than dropped."))
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink3)
                }
            }
        }

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

        // Inside the plan, not in a settings page nobody opens. That is the
        // difference between a caveat and a disclaimer.
        Text(strings(WeeklyPlan.caveat))
            .font(Theme.ui(12))
            .foregroundStyle(Theme.ink3)
            .padding(.horizontal, 4)
    }

    @ViewBuilder private func taskRow(_ task: PlanTask) -> some View {
        if task.kind == .rest {
            VStack(alignment: .leading, spacing: 2) {
                Text(strings("Rest"))
                    .font(Theme.ui(12.5).weight(.medium))
                    .foregroundStyle(Theme.ink3)
                Text(strings(task.reason))
                    .font(Theme.ui(11.5))
                    .foregroundStyle(Theme.ink3)
            }
            .padding(10)
            .frame(maxWidth: .infinity, alignment: .leading)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.lg)
                    .strokeBorder(Theme.line, style: StrokeStyle(lineWidth: 1, dash: [4, 3]))
            )
        } else {
            VStack(alignment: .leading, spacing: 3) {
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Text(strings(task.title))
                        .font(Theme.ui(12.5).weight(.medium))
                        .foregroundStyle(Theme.ink)
                        .lineLimit(1)
                    Spacer(minLength: 0)
                    Text("\(task.expectedMinutes)m")
                        .font(Theme.numeric(11))
                        .foregroundStyle(Theme.ink2)
                    Text(strings(task.tier.label))
                        .font(Theme.ui(10).weight(.semibold))
                        .foregroundStyle(task.tier == .minimum ? Theme.primaryStrong : Theme.ink3)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(task.tier == .minimum ? Theme.primaryTint : Theme.surface2)
                        .clipShape(Capsule())
                }
                // Every task says why it exists, so a student can disagree
                // with it rather than only obey or abandon it.
                Text(strings(task.reason))
                    .font(Theme.ui(11.5))
                    .foregroundStyle(Theme.ink3)
            }
            .padding(10)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface2)
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
    }

    private func capacityRow(_ label: String, _ minutes: Int, tint: Color) -> some View {
        HStack {
            Text(label)
                .font(Theme.ui(13))
                .foregroundStyle(Theme.ink)
            Spacer()
            Text("\(minutes)m")
                .font(Theme.numeric(13))
                .foregroundStyle(tint)
        }
    }

    /// The dates that have work, in the order the week runs.
    ///
    /// Taken from the task list rather than from the seven days, so a day the
    /// student marked unavailable simply is not there.
    private func orderedDates(_ week: WeeklyPlan) -> [String] {
        var seen: Set<String> = []
        return week.tasks.map(\.date).filter { seen.insert($0).inserted }
    }

    private func dayName(_ iso: String) -> String {
        guard let date = StudySchedule.isoDay.date(from: iso) else { return iso }
        let formatter = DateFormatter()
        formatter.locale = strings.language.locale
        formatter.timeZone = TimeZone(identifier: "UTC")
        formatter.setLocalizedDateFormatFromTemplate("EEE d MMM")
        return formatter.string(from: date)
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

    /// Crimson is the action colour, so it is spent on the bar a student is
    /// meant to act on rather than on all four at once.
    private func meter(_ fraction: Double, tint: Color = Theme.primary) -> some View {
        GeometryReader { geometry in
            ZStack(alignment: .leading) {
                Capsule().fill(Theme.inset)
                Capsule().fill(tint)
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
