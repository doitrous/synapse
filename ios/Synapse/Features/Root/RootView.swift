import SwiftUI

/// Chooses what the app shows, based on whether anyone is signed in.
struct RootView: View {
    @State private var auth = AuthModel()

    var body: some View {
        Group {
            switch auth.state {
            case .restoring:
                RestoringView()
            case .unconfigured(let problem):
                UnconfiguredView(problem: problem)
            case .signedOut:
                SignInView(auth: auth)
            case .signedIn(let user):
                SignedInView(user: user, auth: auth)
            }
        }
        .background(Theme.paper)
        .task { await auth.start() }
    }
}

private struct RestoringView: View {
    var body: some View {
        ProgressView()
            .tint(Theme.primary)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Theme.paper)
    }
}

/// Shown when the build has no Supabase configuration.
///
/// This is a developer-facing screen, so it names the actual file to edit
/// rather than apologising vaguely. It exists because the alternative — a
/// sign-in form that fails on every attempt — looks like a broken server.
private struct UnconfiguredView: View {
    let problem: AppConfig.Problem

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Not configured")
                .font(Theme.display(24))
                .foregroundStyle(Theme.ink)
            Text(problem.message)
                .font(Theme.ui(15))
                .foregroundStyle(Theme.ink)
            Text(problem.fix)
                .font(Theme.numeric(14))
                .foregroundStyle(Theme.ink2)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(24)
        .frame(maxHeight: .infinity, alignment: .center)
        .background(Theme.paper)
    }
}

// The signed-in shell lives in SignedInView.swift.
