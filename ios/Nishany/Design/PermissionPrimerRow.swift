import SwiftUI

/// A row that explains why a system permission is worth granting, before the
/// system prompt asks for it.
///
/// iOS shows most permission dialogs exactly once per install — decline and
/// the only way back is the Settings app — so asking cold, on a path nobody
/// chose, teaches a student to say no to the prompt that matters. This pairs
/// a plain-language reason with the tap that triggers the real request, and
/// is generic enough to reuse for any future permission (camera, calendar,
/// contacts, …), not just notifications.
struct PermissionPrimerRow: View {
    let symbol: String
    let title: LocalizedStringKey
    /// Shown immediately, in this row — the rationale iOS itself does not
    /// give a place for.
    let rationale: LocalizedStringKey
    let isGranted: Bool
    let action: () async -> Void

    @State private var isRequesting = false

    var body: some View {
        Button {
            guard !isGranted, !isRequesting else { return }
            isRequesting = true
            Task {
                await action()
                isRequesting = false
            }
        } label: {
            HStack(spacing: 12) {
                Image(systemName: symbol)
                    .font(.system(size: 16))
                    .foregroundStyle(Theme.primary)
                    .frame(width: 22)
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(Theme.ui(15))
                        .foregroundStyle(Theme.ink)
                    Text(rationale)
                        .font(Theme.ui(12))
                        .foregroundStyle(Theme.ink2)
                }
                Spacer(minLength: 8)
                if isGranted {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundStyle(Theme.success)
                } else if isRequesting {
                    ProgressView().controlSize(.small)
                } else {
                    Image(systemName: "chevron.right")
                        .font(.system(size: 12))
                        .foregroundStyle(Theme.ink3)
                        .flipsForRightToLeftLayoutDirection(true)
                }
            }
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .disabled(isGranted || isRequesting)
        .accessibilityAddTraits(isGranted ? [.isButton] : [.isButton])
    }
}
