import SwiftUI

/// The Study Rooms tab root: create a room, join by code, or step into one that
/// is open in your year. The live hall itself is `RoomView`; this only gets you
/// to a `Party`, which the app shell turns into a `RoomModel`.
struct RoomsLobbyView: View {
    @Environment(\.strings) private var strings
    let api: SynapseAPI
    /// Hand a joined/created room up to the shell, which owns the live model so
    /// it survives minimising and tab switches.
    let onEnter: (Party) -> Void

    @State private var newName = ""
    @State private var joinCode = ""
    @State private var mine: [PartySummary] = []
    @State private var open: [PartySummary] = []
    @State private var busy = false
    @State private var error: String?

    var body: some View {
        List {
            createSection
            joinSection
            if !mine.isEmpty { listSection("Your rooms", mine, actionTitle: "Open") { await openExisting($0) } }
            if !open.isEmpty { listSection("Open in your year", open, actionTitle: "Join") { await joinListed($0) } }
            if let error {
                Text(strings(error)).font(Theme.ui(13)).foregroundStyle(Theme.danger)
                    .listRowBackground(Theme.surface)
            }
        }
        .listStyle(.insetGrouped)
        .scrollContentBackground(.hidden)
        .background(Theme.paper)
        .navigationTitle(strings("Study Rooms"))
        .task { await load() }
        .refreshable { await load() }
    }

    private var createSection: some View {
        Section {
            TextField(strings("Room name"), text: $newName)
                .font(Theme.ui(15))
            Button {
                Task { await create() }
            } label: {
                Text(strings("Create a room"))
                    .font(Theme.ui(15, weight: 600))
                    .foregroundStyle(Theme.primary)
            }
            .disabled(busy)
        } header: {
            Text(strings("Start a room"))
        } footer: {
            Text(strings("A room is shared with your year. Anyone with the code can join."))
                .font(Theme.ui(12))
        }
        .listRowBackground(Theme.surface)
    }

    private var joinSection: some View {
        Section {
            HStack {
                TextField(strings("Room code"), text: $joinCode)
                    .font(Theme.numeric(16))
                    .textInputAutocapitalization(.characters)
                    .autocorrectionDisabled()
                Button(strings("Join")) { Task { await joinByCode() } }
                    .font(Theme.ui(15, weight: 600))
                    .foregroundStyle(Theme.primary)
                    .disabled(busy || joinCode.trimmingCharacters(in: .whitespaces).isEmpty)
            }
        } header: {
            Text(strings("Join by code"))
        }
        .listRowBackground(Theme.surface)
    }

    private func listSection(_ title: String, _ rows: [PartySummary], actionTitle: String,
                             action: @escaping (PartySummary) async -> Void) -> some View {
        Section {
            ForEach(rows) { room in
                HStack(spacing: 12) {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(room.name).font(Theme.ui(15, weight: 600)).foregroundStyle(Theme.ink)
                        Text(memberLine(room)).font(Theme.ui(12.5)).foregroundStyle(Theme.ink3)
                    }
                    Spacer()
                    Button(strings(actionTitle)) { Task { busy = true; await action(room); busy = false } }
                        .font(Theme.ui(14, weight: 600))
                        .foregroundStyle(Theme.primary)
                        .disabled(busy)
                }
                .padding(.vertical, 2)
            }
        } header: {
            Text(strings(title))
        }
        .listRowBackground(Theme.surface)
    }

    private func memberLine(_ room: PartySummary) -> String {
        if let capacity = room.capacity {
            return "\(room.members)/\(capacity) . \(room.code)"
        }
        return "\(room.members) . \(room.code)"
    }

    // MARK: - Actions

    private func load() async {
        error = nil
        async let a = try? await api.myParties()
        async let b = try? await api.openParties()
        mine = await a ?? []
        open = await b ?? []
    }

    private func create() async {
        let name = newName.trimmingCharacters(in: .whitespaces)
        guard !name.isEmpty else { return }
        busy = true; defer { busy = false }
        do {
            let result = try await api.createParty(name: name)
            if let party = result.party { newName = ""; onEnter(party) }
            else { error = result.message }
        } catch { self.error = "Couldn't create the room." }
    }

    private func joinByCode() async {
        let code = joinCode.trimmingCharacters(in: .whitespaces).uppercased()
        guard !code.isEmpty else { return }
        busy = true; defer { busy = false }
        do {
            let result = try await api.joinParty(code: code)
            if let party = result.party { joinCode = ""; onEnter(party) }
            else { error = result.message }
        } catch { self.error = "No room with that code." }
    }

    private func openExisting(_ room: PartySummary) async {
        if let party = try? await api.party(room.id) { onEnter(party) }
        else { error = "That room is no longer open." }
    }

    private func joinListed(_ room: PartySummary) async {
        do {
            let result = try await api.joinParty(code: room.code)
            if let party = result.party { onEnter(party) } else { error = result.message }
        } catch { self.error = "That room is no longer open." }
    }
}
