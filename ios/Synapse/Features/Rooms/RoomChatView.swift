import SwiftUI

/// The room's chat. Public lines to everyone; whispers to one member, badged.
/// Ephemeral — a reload starts empty, the same as the web.
struct RoomChatView: View {
    @Environment(\.strings) private var strings
    let messages: [ChatLine]
    let members: [RoomMember]
    let myUserId: String
    @Binding var draft: String
    /// A pending whisper target, set from the roster. Nil is a public message.
    @Binding var whisperTo: RoomMember?
    let onSend: () -> Void

    var body: some View {
        VStack(spacing: 0) {
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 8) {
                        ForEach(messages) { line in
                            bubble(line).id(line.id)
                        }
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 8)
                }
                .onChange(of: messages.count) {
                    if let last = messages.last { withAnimation { proxy.scrollTo(last.id, anchor: .bottom) } }
                }
            }
            composer
        }
    }

    private func bubble(_ line: ChatLine) -> some View {
        let mine = line.from == myUserId
        return HStack {
            if mine { Spacer(minLength: 40) }
            VStack(alignment: mine ? .trailing : .leading, spacing: 2) {
                if line.isPrivate {
                    Text(strings("Whisper"))
                        .font(Theme.ui(10, weight: 600))
                        .foregroundStyle(Theme.ink3)
                }
                Text(line.text)
                    .font(Theme.ui(14))
                    .foregroundStyle(Theme.ink)
                    .padding(.horizontal, 10).padding(.vertical, 7)
                    .background(mine ? Theme.primaryTint : Theme.surface2, in: RoundedRectangle(cornerRadius: Theme.Radius.md))
                if !mine {
                    Text(name(line.from)).font(Theme.ui(10)).foregroundStyle(Theme.ink3)
                }
            }
            if !mine { Spacer(minLength: 40) }
        }
    }

    private var composer: some View {
        VStack(spacing: 4) {
            if let whisperTo {
                HStack(spacing: 6) {
                    Text(strings("Whispering to") + " \(whisperTo.name)")
                        .font(Theme.ui(11, weight: 600)).foregroundStyle(Theme.primary)
                    Button { self.whisperTo = nil } label: {
                        Image(systemName: "xmark.circle.fill").font(.system(size: 12)).foregroundStyle(Theme.ink3)
                    }
                    Spacer()
                }
                .padding(.horizontal, 12)
            }
            HStack(spacing: 8) {
                TextField(strings("Message"), text: $draft, axis: .vertical)
                    .font(Theme.ui(14))
                    .lineLimit(1...4)
                    .padding(.horizontal, 12).padding(.vertical, 8)
                    .background(Theme.surface, in: RoundedRectangle(cornerRadius: Theme.Radius.lg))
                Button(action: onSend) {
                    Image(systemName: "arrow.up.circle.fill")
                        .font(.system(size: 28))
                        .foregroundStyle(draft.trimmingCharacters(in: .whitespaces).isEmpty ? Theme.ink3 : Theme.primary)
                }
                .disabled(draft.trimmingCharacters(in: .whitespaces).isEmpty)
            }
            .padding(.horizontal, 12).padding(.vertical, 8)
        }
        .background(Theme.paper)
        .overlay(Rectangle().fill(Theme.line).frame(height: 0.5), alignment: .top)
    }

    private func name(_ userId: String) -> String {
        members.first { $0.userId == userId }?.name ?? "Student"
    }
}
