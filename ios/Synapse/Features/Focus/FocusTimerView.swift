import CoreMotion
import Foundation
import Observation
import SwiftUI

/// The dedicated Focus Timer surface — a port of `FocusTimerPanel.tsx`.
///
/// Presented as a `.sheet` at the `.large` detent, which already gives the
/// bottom-up slide and the system drag-to-dismiss the web version fakes with
/// a portal and a chevron; the chevron is kept anyway, both because the web
/// has one and because strict mode needs an explicit control to intercept
/// (interactive dismiss is disabled while it is armed and running).
struct FocusTimerView: View {
    @Environment(\.strings) private var strings
    @Environment(\.scenePhase) private var scenePhase
    @Environment(\.dismiss) private var dismiss

    let store: FocusSessionStore
    let tasks: FocusTasksStore

    @State private var newTaskTitle = ""
    @State private var showingMusic = false
    @State private var showingBimaristanComingSoon = false
    @State private var showingCloseConfirm = false
    @State private var immersive = false
    @State private var faceDown = FaceDownMonitor()

    private var state: FocusSessionState { store.state }
    private var strictBlocking: Bool { state.strictArmed && state.running }
    private var selectedTask: FocusTask? { tasks.tasks.first { $0.id == state.selectedTaskId } }
    private var displaySeconds: Int { state.mode == .countdown ? state.remainingSeconds : state.elapsedSeconds }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 28) {
                    modeAndDuration
                    clock
                    taskSection
                    strictSection
                    controls
                }
                .padding(20)
                .frame(maxWidth: 420)
                .frame(maxWidth: .infinity)
            }
            .background(Theme.paper)
            .safeAreaInset(edge: .bottom) { strictWarningBanner }
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button { attemptClose() } label: {
                        Image(systemName: "chevron.down")
                    }
                    .accessibilityLabel(strings("Close focus timer"))
                }
                ToolbarItem(placement: .principal) {
                    Text(strings("Focus Timer"))
                        .font(Theme.panelTitle())
                        .foregroundStyle(Theme.ink)
                }
                ToolbarItemGroup(placement: .topBarTrailing) {
                    Button { showingMusic = true } label: {
                        Image(systemName: "waveform")
                    }
                    .accessibilityLabel(strings("Focus audio"))

                    Button { immersive.toggle() } label: {
                        Image(systemName: immersive ? "arrow.down.right.and.arrow.up.left" : "arrow.up.left.and.arrow.down.right")
                    }
                    .accessibilityLabel(immersive ? strings("Exit fullscreen") : strings("Fullscreen"))

                    Button { showingBimaristanComingSoon = true } label: {
                        Image(systemName: "hammer")
                    }
                    .accessibilityLabel(strings("Build a bimaristan"))
                }
            }
        }
        .statusBarHidden(immersive)
        .interactiveDismissDisabled(strictBlocking)
        .alert(strings("Leaving now discards this focus session."), isPresented: $showingCloseConfirm) {
            Button(strings("Keep going"), role: .cancel) {}
            Button(strings("Discard and close"), role: .destructive) {
                store.discard()
                dismiss()
            }
        }
        .sheet(isPresented: $showingMusic) {
            EmptyStateView(
                symbol: "waveform",
                title: "Music",
                detail: strings("Open your own player, or Apple Music, alongside the timer.")
            )
            .presentationDetents([.medium])
        }
        .sheet(isPresented: $showingBimaristanComingSoon) {
            EmptyStateView(
                symbol: "hammer",
                title: "Build a bimaristan",
                detail: strings("This session already counts toward it — open Build Maristanas from the More tab to watch it grow.")
            )
            .presentationDetents([.medium])
        }
        .onChange(of: scenePhase) { _, phase in
            if phase == .active { store.appDidEnterForeground() } else { store.appDidLeaveForeground() }
        }
        .onChange(of: strictBlocking) { _, blocking in blocking ? faceDown.start() : faceDown.stop() }
        .onDisappear { faceDown.stop() }
    }

    private func attemptClose() {
        if strictBlocking { showingCloseConfirm = true; return }
        dismiss()
    }

    // MARK: - Mode + duration

    private var modeAndDuration: some View {
        VStack(spacing: 12) {
            Picker(strings("Mode"), selection: modeBinding) {
                Text(strings("Countdown")).tag(FocusMode.countdown)
                Text(strings("Count up")).tag(FocusMode.countup)
            }
            .pickerStyle(.segmented)
            .disabled(state.running)

            if state.mode == .countdown {
                HStack(spacing: 8) {
                    ForEach(FocusSession.durationPresetsMinutes, id: \.self) { minutes in
                        presetButton(minutes)
                    }
                    Stepper(value: durationMinutesBinding, in: FocusSession.minDurationMinutes...FocusSession.maxDurationMinutes) {
                        Text("\(state.durationSeconds / 60)\(strings("m"))")
                            .font(Theme.numeric(13, weight: 600))
                            .foregroundStyle(Theme.ink)
                    }
                    .disabled(state.running)
                    .accessibilityLabel(strings("Custom minutes"))
                }
            }
        }
    }

    private func presetButton(_ minutes: Int) -> some View {
        let selected = state.durationSeconds == minutes * 60
        return Button { store.setDurationMinutes(Double(minutes)) } label: {
            Text("\(minutes)\(strings("m"))")
                .font(Theme.ui(12.5, weight: 600))
                .foregroundStyle(selected ? Theme.primaryStrong : Theme.ink2)
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(selected ? Theme.primaryTint : Theme.surface2)
                .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))
        }
        .buttonStyle(.plain)
        .disabled(state.running)
    }

    private var modeBinding: Binding<FocusMode> {
        Binding(get: { state.mode }, set: { store.setMode($0) })
    }

    private var durationMinutesBinding: Binding<Int> {
        Binding(get: { state.durationSeconds / 60 }, set: { store.setDurationMinutes(Double($0)) })
    }

    // MARK: - Clock

    private var clock: some View {
        VStack(spacing: 14) {
            Text(FocusSession.formatClock(displaySeconds))
                .font(Theme.numeric(56, weight: 600))
                .foregroundStyle(Theme.ink)
                .monospacedDigit()
                .accessibilityLabel(strings("Time"))
                .accessibilityValue(FocusSession.formatClock(displaySeconds))

            if state.mode == .countdown {
                ProgressView(value: Double(store.accruedSeconds), total: Double(max(1, state.durationSeconds)))
                    .tint(Theme.primary)
                    .frame(maxWidth: 220)

                if state.remainingSeconds == 0, !state.running {
                    Text(strings("Block complete — nice work."))
                        .font(Theme.ui(12.5, weight: 600))
                        .foregroundStyle(Theme.success)
                }
            }
        }
    }

    // MARK: - Task

    @ViewBuilder private var taskSection: some View {
        if tasks.tasks.isEmpty {
            VStack(spacing: 10) {
                Image(systemName: "list.bullet.clipboard")
                    .font(.system(size: 26))
                    .foregroundStyle(Theme.ink3)
                Text(strings("No tasks yet"))
                    .font(Theme.ui(14, weight: 600))
                    .foregroundStyle(Theme.ink)
                Text(strings("Add one to focus on this session."))
                    .font(Theme.ui(12.5))
                    .foregroundStyle(Theme.ink2)
                addTaskRow
            }
            .frame(maxWidth: .infinity)
            .padding(16)
            .background(Theme.surface2)
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
        } else {
            VStack(alignment: .leading, spacing: 8) {
                Text(strings("Focusing on"))
                    .font(Theme.ui(12, weight: 600))
                    .foregroundStyle(Theme.ink2)
                Picker(strings("Focusing on"), selection: taskBinding) {
                    Text(strings("No task — just focus")).tag(Optional<String>.none)
                    ForEach(tasks.tasks) { task in
                        Text(task.title).tag(Optional(task.id))
                    }
                }
                .pickerStyle(.menu)
                .tint(Theme.ink)

                if selectedTask == nil { addTaskRow }
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
    }

    private var addTaskRow: some View {
        HStack(spacing: 8) {
            TextField(strings("New task"), text: $newTaskTitle)
                .textFieldStyle(.roundedBorder)
                .accessibilityLabel(strings("New task"))
            Button(strings("Add")) {
                let title = newTaskTitle.trimmingCharacters(in: .whitespacesAndNewlines)
                guard let id = tasks.add(title: newTaskTitle) else { return }
                store.selectTask(id, title: title)
                newTaskTitle = ""
            }
            .disabled(newTaskTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
        }
    }

    private var taskBinding: Binding<String?> {
        Binding(
            get: { state.selectedTaskId },
            set: { id in store.selectTask(id, title: id.flatMap { i in tasks.tasks.first { $0.id == i }?.title }) }
        )
    }

    // MARK: - Strict mode

    private var strictSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Toggle(isOn: strictBinding) {
                VStack(alignment: .leading, spacing: 2) {
                    Text(strings("Strict mode"))
                        .font(Theme.ui(13, weight: 600))
                        .foregroundStyle(Theme.ink)
                    Text(strings("Flip your phone face-down, or leave and the block is discarded in 15s."))
                        .font(Theme.ui(11.5))
                        .foregroundStyle(Theme.ink2)
                }
            }
            .tint(Theme.primary)
            .accessibilityLabel(strings("Strict mode"))

            if strictBlocking && faceDown.isFaceDown {
                Label(strings("Face-down — committed"), systemImage: "checkmark.circle.fill")
                    .font(Theme.ui(11.5, weight: 600))
                    .foregroundStyle(Theme.success)
            }
        }
        .padding(14)
        .background(Theme.surface2)
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
    }

    private var strictBinding: Binding<Bool> {
        Binding(get: { state.strictArmed }, set: { store.setStrictArmed($0) })
    }

    // MARK: - Controls

    private var controls: some View {
        HStack(spacing: 28) {
            Button { store.reset() } label: {
                Image(systemName: "arrow.counterclockwise")
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundStyle(Theme.ink2)
                    .frame(width: 44, height: 44)
                    .background(Theme.surface2)
                    .clipShape(Circle())
            }
            .accessibilityLabel(strings("Reset"))

            Button { store.toggleRunning() } label: {
                Image(systemName: state.running ? "pause.fill" : "play.fill")
                    .font(.system(size: 24, weight: .semibold))
                    .foregroundStyle(Theme.onPrimary)
                    .frame(width: 64, height: 64)
                    .background(Theme.primary)
                    .clipShape(Circle())
            }
            .accessibilityLabel(state.running ? strings("Pause") : strings("Start"))

            Color.clear.frame(width: 44, height: 44)
        }
    }

    // MARK: - Strict warning

    @ViewBuilder private var strictWarningBanner: some View {
        if let seconds = store.strictWarningSecondsLeft {
            Text(strings("Come back within {n}s or this session is discarded.").replacingOccurrences(of: "{n}", with: String(seconds)))
                .font(Theme.ui(12.5, weight: 600))
                .foregroundStyle(Theme.onDanger)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .frame(maxWidth: .infinity)
                .background(Theme.danger)
                .accessibilityAddTraits(.isStaticText)
        }
    }
}

/// Minimal face-down detection for strict mode's "flip to commit" gesture.
///
/// A UI cue only — it does not gate anything — so this reads one axis of
/// gravity through `CMMotionManager` and nothing more, active only while a
/// strict block is actually running.
@MainActor
@Observable
final class FaceDownMonitor {
    private(set) var isFaceDown = false
    private let manager = CMMotionManager()

    func start() {
        guard manager.isDeviceMotionAvailable, !manager.isDeviceMotionActive else { return }
        manager.deviceMotionUpdateInterval = 0.5
        manager.startDeviceMotionUpdates(to: .main) { [weak self] motion, _ in
            guard let motion else { return }
            // Gravity's z axis is near zero holding the phone upright and
            // negative face-up; face-down flips it strongly positive.
            self?.isFaceDown = motion.gravity.z > 0.8
        }
    }

    func stop() {
        manager.stopDeviceMotionUpdates()
        isFaceDown = false
    }
}
