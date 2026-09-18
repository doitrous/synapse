import SwiftUI

/// Who is in the room, and who is speaking. A grid of members; each carries a
/// context menu to whisper, mute (for you only), or block.
struct RoomRosterView: View {
    @Environment(\.strings) private var strings
    let members: [RoomMember]
    let speaking: Set<String>
    let mutedMembers: Set<String>
    let myUserId: String
    let onWhisper: (RoomMember) -> Void
    let onToggleMute: (RoomMember) -> Void
    let onBlock: (RoomMember) -> Void

    private let columns = [GridItem(.adaptive(minimum: 88), spacing: 12)]

    var body: some View {
        LazyVGrid(columns: columns, spacing: 12) {
            ForEach(members) { member in
                tile(member)
                    .contextMenu { menu(member) }
            }
        }
        .padding(.horizontal, 4)
    }

    private func tile(_ member: RoomMember) -> some View {
        let isSpeaking = speaking.contains(member.userId)
        return VStack(spacing: 6) {
            ZStack {
                Circle()
                    .fill(member.isHost ? Theme.primaryTint : Theme.surface2)
                    .frame(width: 52, height: 52)
                Text(initial(member))
                    .font(Theme.ui(20, weight: 600))
                    .foregroundStyle(member.isHost ? Theme.primary : Theme.ink2)
            }
            .overlay(
                Circle().stroke(Theme.success, lineWidth: isSpeaking ? 3 : 0)
            )
            .overlay(alignment: .bottomTrailing) {
                if mutedMembers.contains(member.userId) {
                    Image(systemName: "speaker.slash.fill")
                        .font(.system(size: 11, weight: .bold))
                        .foregroundStyle(Theme.ink3)
                        .padding(3)
                        .background(Theme.surface, in: Circle())
                }
            }
            Text(label(member))
                .font(Theme.ui(12, weight: member.userId == myUserId ? 600 : 400))
                .foregroundStyle(Theme.ink2)
                .lineLimit(1)
        }
        .frame(maxWidth: .infinity)
    }

    @ViewBuilder
    private func menu(_ member: RoomMember) -> some View {
        if member.userId != myUserId {
            Button { onWhisper(member) } label: { Label(strings("Whisper"), systemImage: "bubble.left") }
            Button { onToggleMute(member) } label: {
                Label(strings(mutedMembers.contains(member.userId) ? "Unmute for me" : "Mute for me"),
                      systemImage: mutedMembers.contains(member.userId) ? "speaker.wave.2" : "speaker.slash")
            }
            Button(role: .destructive) { onBlock(member) } label: { Label(strings("Block"), systemImage: "hand.raised") }
        }
    }

    private func initial(_ member: RoomMember) -> String {
        String(member.name.first.map(String.init) ?? "?").uppercased()
    }

    private func label(_ member: RoomMember) -> String {
        member.userId == myUserId ? "\(member.name) (\(strings("you")))" : member.name
    }
}
