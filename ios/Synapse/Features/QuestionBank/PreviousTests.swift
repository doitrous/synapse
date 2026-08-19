import SwiftUI

/// The sittings a student has already taken.
///
/// Rebuilt from the attempt log rather than stored a second time: every record
/// has always carried the id of the sitting that produced it, and until now
/// nothing read it back — so a student had no way to see what they had done.
struct PreviousTests: View {
    let sessions: [SessionSummary]
    var store: QBankStore?
    let review: (SessionSummary) -> Void

    @State private var renaming: SessionSummary?
    @State private var draftName = ""

    var body: some View {
        Group {
            if sessions.isEmpty {
                EmptyStateView(
                    symbol: "clock.arrow.circlepath",
                    title: "Nothing yet",
                    detail: "Sittings you finish are listed here, so you can look back at them."
                )
            } else {
                List {
                    ForEach(sessions) { session in
                        Button { review(session) } label: { row(session) }
                            .swipeActions {
                                Button {
                                    draftName = store?.name(of: session.sessionId) ?? ""
                                    renaming = session
                                } label: {
                                    Label("Rename", systemImage: "pencil")
                                }
                                .tint(Theme.accent)
                            }
                    }
                    .listRowBackground(Theme.surface)
                }
                .listStyle(.insetGrouped)
                .scrollContentBackground(.hidden)
            }
        }
        .background(Theme.paper)
        .alert("Name this sitting", isPresented: Binding(
            get: { renaming != nil }, set: { if !$0 { renaming = nil } }
        )) {
            TextField("Name", text: $draftName)
            Button("Cancel", role: .cancel) { renaming = nil }
            Button("Save") {
                if let session = renaming {
                    Task { await store?.rename(session.sessionId, to: draftName) }
                }
                renaming = nil
            }
        }
    }

    private func row(_ session: SessionSummary) -> some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack {
                Text(store?.name(of: session.sessionId) ?? "Sitting")
                    .font(Theme.ui(15, weight: 600))
                    .foregroundStyle(Theme.ink)
                Spacer()
                // Nothing marked means no accuracy — not zero. Showing 0%
                // would tell a student they got everything wrong.
                if let accuracy = session.accuracy {
                    Text("\(Int((accuracy * 100).rounded()))%")
                        .font(Theme.numeric(14))
                        .foregroundStyle(accuracy >= 0.75 ? Theme.success : accuracy >= 0.6 ? Theme.accent : Theme.warning)
                } else {
                    Text("—")
                        .font(Theme.numeric(14))
                        .foregroundStyle(Theme.ink3)
                }
            }

            HStack(spacing: 10) {
                Text("^[\(session.answered) question](inflect: true)")
                if session.seconds > 0 {
                    Text(StudyTimer.clock(Double(session.seconds)))
                        .monospacedDigit()
                }
                Text(day(session.startedAt))
            }
            .font(Theme.ui(12))
            .foregroundStyle(Theme.ink2)
        }
        .padding(.vertical, 2)
    }

    /// The day it happened, in the student's own calendar — the exact second is
    /// never what anyone is looking for.
    private func day(_ iso: String) -> String {
        guard let date = ISO8601DateFormatter.synapse.date(from: iso) else { return "" }
        return date.formatted(.dateTime.day().month(.abbreviated))
    }
}
