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

    var body: some View {
        NavigationStack {
            List {
                Section("Study") {
                    link("Calendar", "calendar") {
                        CalendarView(store: store, sync: sync, audienceStore: audienceStore, api: api)
                    }
                    link("Practical", "list.bullet.clipboard") {
                        PracticalView(store: store, sync: sync, audience: audience)
                    }
                    link("Medical taxonomy", "character.book.closed") {
                        GlossaryView(store: store, sync: sync)
                    }
                }
                .listRowBackground(Theme.surface)

                Section("Workspace") {
                    link("Notebook", "note.text") {
                        NotebookView(store: store, sync: sync, api: api)
                    }
                }
                .listRowBackground(Theme.surface)

                Section("Plan") {
                    link("Progress", "chart.bar") {
                        PerformanceView(store: store, sync: sync)
                    }
                    link("Billing", "creditcard") {
                        BillingView(audienceStore: audienceStore)
                    }
                }
                .listRowBackground(Theme.surface)
            }
            .listStyle(.insetGrouped)
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle("More")
        }
    }

    private func link<Destination: View>(
        _ title: LocalizedStringKey, _ symbol: String, @ViewBuilder destination: @escaping () -> Destination
    ) -> some View {
        NavigationLink {
            destination()
        } label: {
            Label {
                Text(title).font(Theme.ui(16))
            } icon: {
                Image(systemName: symbol).foregroundStyle(Theme.accent)
            }
        }
    }
}
