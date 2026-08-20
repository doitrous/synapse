import SwiftUI

/// Choosing what a sitting is drawn from.
///
/// A port of `src/components/qbank/TopicChooser.tsx`. Systems hold chapters,
/// chapters hold subtopics where the library provides them. Each row is
/// three-state: a chapter with some of its parts chosen reads as partly chosen
/// rather than as chosen or not, because either of those would be a lie.
struct TopicChooser: View {
    let topics: [ChooserTopic]
    let counts: (topics: [String: Int], subtopics: [String: Int])
    @Binding var scope: Set<String>
    let subjectName: (String) -> String

    @Environment(\.dismiss) private var dismiss

    /// Systems, each with the chapters that actually have questions under them.
    /// A chapter with none is not a choice, it is a dead end.
    private var groups: [(subject: String, topics: [ChooserTopic])] {
        var order: [String] = []
        var bySubject: [String: [ChooserTopic]] = [:]
        for topic in topics where (counts.topics[topic.id] ?? 0) > 0 {
            if bySubject[topic.subjectId] == nil { order.append(topic.subjectId) }
            bySubject[topic.subjectId, default: []].append(topic)
        }
        return order.map { ($0, bySubject[$0] ?? []) }
    }

    var body: some View {
        NavigationStack {
            Group {
                if groups.isEmpty {
                    // An empty box is not an answer. It happens when the bank
                    // has nothing in scope, and it should say so rather than
                    // look broken.
                    EmptyStateView(
                        symbol: "questionmark.folder",
                        title: "Nothing to choose from",
                        detail: "There are no published questions to narrow down yet."
                    )
                } else {
                    list
                }
            }
            .background(Theme.paper)
            .navigationTitle("What to study")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button("Everything") { scope = [] }
                        .font(Theme.ui(15))
                        .tint(Theme.primary)
                        .disabled(scope.isEmpty)
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                        .font(Theme.ui(16, weight: 600))
                        .tint(Theme.primary)
                }
            }
        }
    }

    private var list: some View {
        List {
            ForEach(groups, id: \.subject) { group in
                Section {
                    ForEach(group.topics) { topic in
                        row(
                            title: topic.title,
                            count: counts.topics[topic.id] ?? 0,
                            tick: QBankScope.tick(topic: topic, in: scope),
                            indent: 0
                        ) {
                            scope = QBankScope.toggleTopic(topic.id, in: scope, topics: topics)
                        }

                        // Only worth showing where the library gives something
                        // finer to pick.
                        ForEach(topic.subtopicIds, id: \.self) { subtopic in
                            row(
                                title: subtopic,
                                count: counts.subtopics[subtopic] ?? 0,
                                tick: scope.contains(QBankScope.topicKey(topic.id))
                                    || scope.contains(QBankScope.subtopicKey(subtopic)) ? .on : .off,
                                indent: 1
                            ) {
                                scope = QBankScope.toggleSubtopic(
                                    subtopic, under: topic.id, in: scope, topics: topics
                                )
                            }
                        }
                    }
                } header: {
                    Button {
                        scope = QBankScope.toggleSubject(group.subject, in: scope, topics: topics)
                    } label: {
                        HStack(spacing: 6) {
                            symbol(QBankScope.tick(subject: group.subject, in: scope, topics: topics))
                            Text(subjectName(group.subject))
                                .font(Theme.ui(12, weight: 600))
                        }
                        .foregroundStyle(Theme.primary)
                    }
                }
                .listRowBackground(Theme.surface)
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
    }

    private func row(
        title: String, count: Int, tick: QBankScope.Tick, indent: Int, toggle: @escaping () -> Void
    ) -> some View {
        Button(action: toggle) {
            HStack(spacing: 10) {
                symbol(tick)
                Text(title)
                    .font(Theme.ui(15))
                    .foregroundStyle(Theme.ink)
                    .multilineTextAlignment(.leading)
                Spacer(minLength: 8)
                Text("\(count)")
                    .font(Theme.numeric(12))
                    .foregroundStyle(Theme.ink2)
            }
            .padding(.leading, CGFloat(indent) * 20)
        }
    }

    private func symbol(_ tick: QBankScope.Tick) -> some View {
        let name = switch tick {
        case .on: "checkmark.square.fill"
        case .partial: "minus.square.fill"
        case .off: "square"
        }
        return Image(systemName: name)
            .foregroundStyle(tick == .off ? Theme.ink3 : Theme.primary)
    }
}
