import SwiftUI

/// The Today-tab doorway into the Question of the Day.
///
/// Deliberately stateless: the dashboard is offline-first and QotD needs the
/// network, so the card only invites — the streak and today's state live on the
/// screen it opens, which loads them itself.
struct QotdCard: View {
    @Environment(\.strings) private var strings
    let open: () -> Void

    var body: some View {
        Button(action: open) {
            HStack(spacing: 14) {
                Image(systemName: "flame.fill")
                    .font(.system(size: 22))
                    .foregroundStyle(Theme.danger)
                VStack(alignment: .leading, spacing: 3) {
                    Text(strings("Question of the Day"))
                        .font(Theme.ui(16, weight: 600))
                        .foregroundStyle(Theme.ink)
                    Text(strings("Answer today's question and keep your streak"))
                        .font(Theme.ui(13))
                        .foregroundStyle(Theme.ink2)
                        .frame(maxWidth: .infinity, alignment: .leading)
                }
                Image(systemName: "chevron.right")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(Theme.ink3)
            }
            .padding(16)
            .background(Theme.surface)
            .overlay(RoundedRectangle(cornerRadius: Theme.Radius.lg).stroke(Theme.line, lineWidth: 1))
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        }
        .buttonStyle(.plain)
    }
}
