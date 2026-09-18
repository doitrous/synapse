import SwiftUI

/// A slim bar the app shows above the tab bar while a room is minimised, so a
/// student who stepped away can see it is still live and tap back into it.
struct RoomDock: View {
    @Environment(\.strings) private var strings
    let model: RoomModel
    let onOpen: () -> Void

    var body: some View {
        Button(action: onOpen) {
            HStack(spacing: 10) {
                Image(systemName: "person.2.fill")
                    .font(.system(size: 16))
                    .foregroundStyle(Theme.primary)
                VStack(alignment: .leading, spacing: 1) {
                    Text(model.party.name)
                        .font(Theme.ui(13, weight: 600)).foregroundStyle(Theme.ink).lineLimit(1)
                    Text(detail).font(Theme.ui(11)).foregroundStyle(Theme.ink3)
                }
                Spacer()
                Image(systemName: "chevron.up").font(.system(size: 12, weight: .semibold)).foregroundStyle(Theme.ink3)
            }
            .padding(.horizontal, 14).padding(.vertical, 8)
            .background(Theme.surface)
            .overlay(Rectangle().fill(Theme.line).frame(height: 0.5), alignment: .top)
        }
        .buttonStyle(.plain)
    }

    private var detail: String {
        let here = model.members.count
        let speaking = model.speaking.count
        let hereText = "\(here) " + strings(here == 1 ? "person here" : "people here")
        return speaking > 0 ? hereText + " . " + "\(speaking) " + strings("speaking") : hereText
    }
}
