import Foundation
import Observation

/// One open study-room hall.
///
/// Owns a `RoomChannel`, reduces its stream into the live `RoomChannelState`,
/// merges it with the REST snapshot, and drives the thirty-second heartbeat.
/// The web splits this across `useRoomChannel` and `RoomSessionProvider`; here
/// it is one main-actor model the views observe. Voice hooks attach in a later
/// task; this is the hall (presence, chat, whisper, leave).
@MainActor
@Observable
final class RoomModel {

    private(set) var state: RoomChannelState = .initial
    private(set) var party: Party
    /// A one-line status when the socket is not simply open: reconnecting,
    /// closed for good, or archived. Nil when all is well.
    private(set) var connectionLabel: String?

    /// The chat composer's text.
    var draft: String = ""
    /// Members this viewer has muted locally (client-only; tells no one). Voice
    /// applies it; chat and presence do not.
    var mutedMembers: Set<String> = []

    let myUserId: String

    private let api: SynapseAPI
    private let channel: RoomChannel
    private var consumeTask: Task<Void, Never>?
    private var heartbeatTask: Task<Void, Never>?

    init(api: SynapseAPI, base: URL, token: @escaping SynapseAPI.TokenProvider, party: Party, myUserId: String) {
        self.api = api
        self.party = party
        self.myUserId = myUserId
        self.channel = RoomChannel(base: base, code: party.code, token: token)
    }

    // MARK: - Derived views

    /// The roster: the socket's truth when it has spoken, else the polled party.
    /// Null members means "fall back to the party", not "empty room".
    var members: [RoomMember] { state.members ?? party.members }
    var speaking: Set<String> { Set(state.speaking) }
    var messages: [ChatLine] { state.messages }
    var isHost: Bool { party.host }
    var sfuAvailable: Bool { state.sfu?.available ?? false }

    // MARK: - Lifecycle

    func connect() {
        guard consumeTask == nil else { return }
        consumeTask = Task { [weak self] in
            guard let self else { return }
            await self.channel.start()
            for await action in self.channel.frames {
                self.apply(action)
            }
        }
        heartbeatTask = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(nanoseconds: 30 * 1_000_000_000)
                guard let self, !Task.isCancelled else { return }
                try? await self.api.roomHeartbeat(code: self.party.code)
            }
        }
    }

    private func apply(_ action: ChannelAction) {
        state = reduceChannel(state, action)
        updateLabel()
        if state.archived {
            // The room moved on; re-read it so a stale roster is not left on screen.
            Task { [weak self] in
                guard let self, let fresh = try? await self.api.party(self.party.code) else { return }
                self.party = fresh
            }
        }
    }

    private func updateLabel() {
        if state.archived {
            connectionLabel = "This room has closed."
        } else if state.status == .closed && !state.retrying {
            connectionLabel = "You are no longer in this room."
        } else if state.retrying || state.status == .connecting {
            connectionLabel = "Reconnecting. Showing the last snapshot."
        } else {
            connectionLabel = nil
        }
    }

    // MARK: - Actions

    func send() {
        let text = draft
        draft = ""
        Task { await channel.sendChat(text, to: nil) }
    }

    func whisper(_ text: String, to userId: String) {
        Task { await channel.sendChat(text, to: userId) }
    }

    func block(_ userId: String) {
        Task { try? await api.blockUser(userId) }
    }

    /// Leave the party for good (not the same as minimising, which keeps the
    /// model alive and the socket open).
    func leave() async {
        consumeTask?.cancel(); consumeTask = nil
        heartbeatTask?.cancel(); heartbeatTask = nil
        await channel.stop()
        try? await api.leaveParty(party.id)
    }

    /// Tear the socket down without leaving the party — for teardown paths that
    /// are not a deliberate "leave".
    func disconnect() {
        consumeTask?.cancel(); consumeTask = nil
        heartbeatTask?.cancel(); heartbeatTask = nil
        Task { await channel.stop() }
    }
}
