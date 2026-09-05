import SwiftUI

/// How the work is going.
///
/// Held back until there is enough of it to mean something. An accuracy figure
/// drawn from four answers is noise wearing the clothes of a measurement, and
/// showing it would invite a student to revise their whole plan around it.
struct PerformanceView: View {
    @Environment(\.strings) private var strings
    @State private var model: PerformanceModel
    let sync: SyncEngine

    init(store: LocalStore, sync: SyncEngine) {
        _model = State(wrappedValue: PerformanceModel(store: store))
        self.sync = sync
    }

    var body: some View {
        NavigationStack {
            Group {
                if model.isLoading {
                    ProgressView().tint(Theme.primary)
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if model.summary.attempts == 0 {
                    EmptyStateView(
                        symbol: "chart.bar",
                        title: "Nothing measured yet",
                        detail: "Answer some questions and your accuracy, pace and weakest topics appear here."
                    )
                } else {
                    content
                }
            }
            .background(Theme.paper)
            .navigationTitle(strings("Performance"))
        }
        .task { await model.load() }
        .onChange(of: sync.status) { _, status in
            if case .done = status { Task { await model.load() } }
        }
        .refreshable { await model.load() }
    }

    private var content: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                headline
                firstVsRepeat
                heatmap
                whenYouWork
                bySurface
                if !model.summary.byDifficulty.isEmpty { byDifficulty }
                if !model.summary.bySubject.isEmpty { bySubject }
            }
            .padding(16)
            .frame(maxWidth: 680)
            .frame(maxWidth: .infinity)
        }
        .background(Theme.paper)
    }

    @ViewBuilder
    private var headline: some View {
        if model.hasEnoughForAccuracy {
            HStack(spacing: 10) {
                StatTile(
                    label: "Accuracy",
                    value: model.summary.accuracy.map { "\(Int(($0 * 100).rounded()))%" } ?? "—",
                    detail: "of \(model.summary.marked) marked"
                )
                StatTile(
                    label: "Streak",
                    value: "\(model.summary.streak)",
                    detail: model.summary.streak == 1 ? "day" : "days"
                )
            }
        } else {
            // Say how far off it is rather than showing a figure that cannot
            // yet be trusted.
            let remaining = PerformanceModel.minimumMarked - model.summary.marked
            VStack(alignment: .leading, spacing: 6) {
                Text(strings("Not enough answers yet"))
                    .font(Theme.display(18))
                    .foregroundStyle(Theme.ink)
                Text("\(remaining) more marked answer\(remaining == 1 ? "" : "s") and accuracy becomes worth reading. Below that it moves too much to mean anything.")
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink2)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(16)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        }
    }

    /// 17 weeks of answers, one column per week.
    /// What the first sight of an item said, against every later one.
    @ViewBuilder private var firstVsRepeat: some View {
        if let first = model.firstAttempt, first.marked > 0 {
            VStack(alignment: .leading, spacing: 10) {
                Text(strings("First time vs. again"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)

                HStack(spacing: 20) {
                    figure("First sight", first.accuracy, marked: first.marked)
                    if let again = model.repeated, again.marked > 0 {
                        figure("Seen before", again.accuracy, marked: again.marked)
                    }
                }

                Text(strings("What you got right the first time is what you knew. Answering the same item again mostly measures whether you remember the answer."))
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.ink3)
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        }
    }

    private func figure(_ title: String, _ accuracy: Double?, marked: Int) -> some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(title)
                .font(Theme.ui(12))
                .foregroundStyle(Theme.ink2)
            // No marked work means no figure. A dash is honest; 0% is not.
            Text(accuracy.map { "\(Int(($0 * 100).rounded()))%" } ?? "—")
                .font(Theme.display(24))
                .foregroundStyle(Theme.ink)
            Text("of \(marked)")
                .font(Theme.ui(11))
                .foregroundStyle(Theme.ink3)
        }
    }

    /// Where the work actually went.
    @ViewBuilder private var bySurface: some View {
        if model.surfaces.count > 1 {
            VStack(alignment: .leading, spacing: 10) {
                Text(strings("Where the work went"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)

                ForEach(model.surfaces) { surface in
                    HStack {
                        Text(surface.key.capitalized)
                            .font(Theme.ui(14))
                            .foregroundStyle(Theme.ink)
                        Spacer()
                        Text("\(surface.attempts)")
                            .font(Theme.numeric(13))
                            .foregroundStyle(Theme.ink2)
                        // A surface nobody marks — a station is practice, not
                        // a score — says so rather than showing nought.
                        Text(surface.accuracy.map { "\(Int(($0 * 100).rounded()))%" } ?? "not marked")
                            .font(surface.accuracy == nil ? Theme.ui(11) : Theme.numeric(13))
                            .foregroundStyle(Theme.ink3)
                            .frame(width: 70, alignment: .trailing)
                    }
                }
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        }
    }

    /// When in the day the work happens.
    @ViewBuilder private var whenYouWork: some View {
        if model.hours.contains(where: { $0 > 0 }) {
            let peak = model.hours.max() ?? 1
            VStack(alignment: .leading, spacing: 10) {
                Text(strings("When you work"))
                    .font(Theme.panelTitle())
                    .foregroundStyle(Theme.ink2)

                HStack(alignment: .bottom, spacing: 2) {
                    ForEach(0..<24, id: \.self) { hour in
                        RoundedRectangle(cornerRadius: 1.5)
                            .fill(model.hours[hour] > 0 ? Theme.primary : Theme.line)
                            .frame(height: max(3, CGFloat(model.hours[hour]) / CGFloat(peak) * 54))
                            .frame(maxWidth: .infinity)
                    }
                }
                .frame(height: 54)

                HStack {
                    Text(strings("00"))
                    Spacer()
                    Text(strings("12"))
                    Spacer()
                    Text(strings("23"))
                }
                .font(Theme.numeric(10))
                .foregroundStyle(Theme.ink3)
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
        }
    }

    private var heatmap: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(strings("When you study"))
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)

            let weeks = stride(from: 0, to: model.summary.activity.count, by: 7)
                .map { Array(model.summary.activity[$0..<min($0 + 7, model.summary.activity.count)]) }
            let busiest = max(model.summary.activity.map(\.count).max() ?? 1, 1)

            HStack(alignment: .top, spacing: 3) {
                ForEach(Array(weeks.enumerated()), id: \.offset) { _, week in
                    VStack(spacing: 3) {
                        ForEach(week) { day in
                            RoundedRectangle(cornerRadius: 2)
                                .fill(shade(day.count, busiest: busiest))
                                .frame(height: 9)
                        }
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

    /// The site's heatmap ramp, from the palest step to the accent.
    private func shade(_ count: Int, busiest: Int) -> Color {
        guard count > 0 else { return Theme.inset }
        let ratio = Double(count) / Double(busiest)
        switch ratio {
        case ..<0.25: return Theme.primaryTint
        case ..<0.5: return Theme.primaryLine
        case ..<0.75: return Theme.primarySoft
        default: return Theme.primary
        }
    }

    private var byDifficulty: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(strings("By difficulty"))
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)

            ForEach(model.summary.byDifficulty) { row in
                Bar(label: row.difficulty, accuracy: row.accuracy, marked: row.marked)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }

    /// Weakest first — the order that answers "what should I study?".
    private var bySubject: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(strings("Weakest topics"))
                .font(Theme.panelTitle())
                .foregroundStyle(Theme.ink2)

            ForEach(model.summary.bySubject.prefix(10)) { row in
                Bar(
                    label: row.topic.isEmpty ? row.subjectId : row.topic,
                    accuracy: row.accuracy,
                    marked: row.marked
                )
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(16)
        .background(Theme.surface)
        .overlay(RoundedRectangle(cornerRadius: Theme.Radius.xl).stroke(Theme.line, lineWidth: 1))
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.xl))
    }
}

private struct Bar: View {
    @Environment(\.strings) private var strings
    let label: String
    let accuracy: Double
    let marked: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(label)
                    .font(Theme.ui(13))
                    .foregroundStyle(Theme.ink)
                    .lineLimit(1)
                Spacer()
                Text("\(Int((accuracy * 100).rounded()))%")
                    .font(Theme.numeric(12))
                    .foregroundStyle(Theme.ink2)
                // The denominator, so a bar drawn from four answers cannot be
                // mistaken for one drawn from forty.
                Text("/\(marked)")
                    .font(Theme.numeric(10))
                    .foregroundStyle(Theme.ink3)
            }
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    Capsule().fill(Theme.inset)
                    Capsule()
                        .fill(accuracy < 0.5 ? Theme.danger : Theme.primary)
                        .frame(width: max(2, geometry.size.width * accuracy))
                }
            }
            .frame(height: 6)
        }
    }
}
