import SwiftUI

/// Everything the website has that does not earn a tab of its own.
///
/// iOS gives five tab slots and folds anything beyond them into a menu it
/// names itself, so the choice is which four surfaces a student reaches in one
/// tap. The rest are here, named as the website names them, so nothing the web
/// app offers is simply missing.
struct MoreView: View {
    let store: LocalStore
    let sync: SyncEngine
    let audience: StudentAudience
    let audienceStore: AudienceStore
    let api: SynapseAPI

    @Environment(\.strings) private var strings

    var body: some View {
        NavigationStack {
            List {
                Section(strings("Study")) {
                    link("Adaptive Study", "wand.and.stars") {
                        AdaptiveStudyView(api: api, sync: sync, store: store, audience: audience)
                    }
                    link("Calendar", "calendar") {
                        CalendarView(store: store, sync: sync, audienceStore: audienceStore, api: api)
                    }
                    link("Practical", "list.bullet.clipboard") {
                        PracticalView(store: store, sync: sync, audience: audience, api: api)
                    }
                    link("Medical taxonomy", "character.book.closed") {
                        GlossaryView(store: store, sync: sync)
                    }
                }
                .listRowBackground(Theme.surface)

                Section(strings("Workspace")) {
                    link("Notebook", "note.text") {
                        NotebookView(store: store, sync: sync, api: api)
                    }
                    link("Whiteboard", "scribble.variable") {
                        WhiteboardView(api: api, sync: sync)
                    }
                    link("Study together", "person.2") {
                        StudyTogetherView(api: api, store: store, audience: audience)
                    }
                }
                .listRowBackground(Theme.surface)

                Section(strings("Plan")) {
                    link("Progress", "chart.bar") {
                        PerformanceView(store: store, sync: sync)
                    }
                    link("Billing", "creditcard") {
                        BillingView(api: api, sync: sync)
                    }
                }
                .listRowBackground(Theme.surface)
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle(strings("More"))
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    AssistantButton(surface: "More")
                }
            }
        }
    }

    /// Titles go through `strings` rather than a `LocalizedStringKey`.
    ///
    /// The table is keyed by the English source text and shared with the
    /// website, so both platforms say the same words — and a title with no
    /// Arabic behind it falls back to the English it was written from rather
    /// than showing a key.
    private func link<Destination: View>(
        _ title: String, _ symbol: String, @ViewBuilder destination: @escaping () -> Destination
    ) -> some View {
        NavigationLink {
            destination()
        } label: {
            Label {
                Text(strings(title)).font(Theme.ui(16))
            } icon: {
                Image(systemName: symbol)
                    .foregroundStyle(Theme.primary)
                    // A chevron or an arrow points the other way in Arabic; a
                    // calendar or a clipboard does not.
                    .flipsForRightToLeftLayoutDirection(true)
            }
        }
    }
}
