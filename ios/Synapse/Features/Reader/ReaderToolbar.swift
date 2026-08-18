import SwiftUI

/// The floating tool palette.
///
/// Draggable and collapsible, as on the web, and for the same reason: it sits
/// over the page a student is reading, so wherever it is parked it is covering
/// something. Being able to move it — and fold it down to just the active tool
/// — is what stops it being in the way.
///
/// Where it rests is a device preference, not an account one. Which side of the
/// screen suits is about the hand holding the phone.
struct ReaderToolbar: View {
    @Binding var settings: ToolSettings
    let canUndo: Bool
    let canRedo: Bool
    let undo: () -> Void
    let redo: () -> Void

    @State private var edge = ReaderPreferences.toolbarEdge
    @State private var offset = ReaderPreferences.toolbarOffset
    @State private var collapsed = ReaderPreferences.toolbarCollapsed
    @State private var dragging: CGSize = .zero
    @State private var showingSettings = false

    var body: some View {
        GeometryReader { geometry in
            palette
                .position(
                    x: restingX(in: geometry.size) + dragging.width,
                    y: geometry.size.height * offset + dragging.height
                )
                .gesture(drag(in: geometry.size))
        }
        .ignoresSafeArea(.keyboard)
    }

    private func restingX(in size: CGSize) -> CGFloat {
        let inset: CGFloat = 34
        return edge == .leading ? inset : size.width - inset
    }

    private func drag(in size: CGSize) -> some Gesture {
        DragGesture()
            .onChanged { dragging = $0.translation }
            .onEnded { value in
                // Snaps to whichever side it was released nearest. A palette
                // floating in the middle of the page would cover the text it is
                // being used on.
                let x = restingX(in: size) + value.translation.width
                edge = x < size.width / 2 ? .leading : .trailing

                let y = size.height * offset + value.translation.height
                offset = min(max(y / max(size.height, 1), 0.02), 0.75)

                ReaderPreferences.toolbarEdge = edge
                ReaderPreferences.toolbarOffset = offset
                dragging = .zero
            }
    }

    private var palette: some View {
        VStack(spacing: 6) {
            grip

            if collapsed {
                // Folded: only the tool in use, so the page is almost clear.
                button(for: settings.tool)
            } else {
                ForEach(ReaderTool.allCases) { button(for: $0) }

                Divider().frame(width: 22).overlay(Theme.line)

                Button { showingSettings = true } label: {
                    icon("slider.horizontal.3", active: false)
                }
                .accessibilityLabel("Tool settings")

                Button(action: undo) { icon("arrow.uturn.backward", active: false) }
                    .disabled(!canUndo)
                    .opacity(canUndo ? 1 : 0.35)
                    .accessibilityLabel("Undo")

                Button(action: redo) { icon("arrow.uturn.forward", active: false) }
                    .disabled(!canRedo)
                    .opacity(canRedo ? 1 : 0.35)
                    .accessibilityLabel("Redo")
            }
        }
        .padding(.vertical, 8)
        .padding(.horizontal, 5)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: Theme.Radius.xxl))
        .overlay(
            RoundedRectangle(cornerRadius: Theme.Radius.xxl).stroke(Theme.line, lineWidth: 1)
        )
        .shadow(color: .black.opacity(0.12), radius: 10, y: 3)
        .sheet(isPresented: $showingSettings) {
            ToolSettingsSheet(settings: $settings)
                .presentationDetents([.medium, .large])
        }
    }

    /// Drag here to move it; tap to fold it away.
    private var grip: some View {
        Button {
            collapsed.toggle()
            ReaderPreferences.toolbarCollapsed = collapsed
        } label: {
            Image(systemName: collapsed ? "chevron.down" : "chevron.up")
                .font(.system(size: 10, weight: .semibold))
                .foregroundStyle(Theme.ink3)
                .frame(width: 34, height: 18)
                .contentShape(Rectangle())
        }
        .accessibilityLabel(collapsed ? "Expand the tools" : "Collapse the tools")
    }

    private func button(for tool: ReaderTool) -> some View {
        Button {
            // Tapping the active tool while collapsed opens the palette again,
            // so a folded toolbar is never a dead end.
            if collapsed, tool == settings.tool {
                collapsed = false
                ReaderPreferences.toolbarCollapsed = false
            } else {
                settings.tool = tool
            }
        } label: {
            icon(tool.symbol, active: settings.tool == tool)
        }
        .accessibilityLabel(tool.label)
    }

    private func icon(_ symbol: String, active: Bool) -> some View {
        Image(systemName: symbol)
            .font(.system(size: 15))
            .foregroundStyle(active ? Theme.onAccent : Theme.ink2)
            .frame(width: 34, height: 34)
            .background(active ? Theme.accent : Color.clear, in: RoundedRectangle(cornerRadius: Theme.Radius.md))
            .contentShape(Rectangle())
    }
}

/// Colour, width, pen and eraser options.
private struct ToolSettingsSheet: View {
    @Binding var settings: ToolSettings
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                if settings.tool == .pen || settings.tool == .highlighter {
                    Section("Colour") {
                        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 6), spacing: 10) {
                            ForEach(ReaderPalette.ink, id: \.self) { hex in
                                Button { settings.color = hex } label: {
                                    Circle()
                                        .fill(Color(UIColor(hex: hex)))
                                        .frame(height: 30)
                                        .overlay(
                                            Circle().stroke(
                                                settings.color == hex ? Theme.ink : Theme.line,
                                                lineWidth: settings.color == hex ? 2 : 1
                                            )
                                        )
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        .padding(.vertical, 4)

                        ColorPicker("Another colour", selection: Binding(
                            get: { Color(UIColor(hex: settings.color)) },
                            set: { settings.color = $0.hexString }
                        ))
                    }

                    Section("Width") {
                        // Page-space units, so the slider means the same thing
                        // on every document and at every zoom.
                        Slider(value: $settings.width, in: 0.001...0.014)
                        Text(String(format: "%.0f", settings.width * 1000))
                            .font(Theme.numeric(12))
                            .foregroundStyle(Theme.ink3)
                    }
                }

                if settings.tool == .pen {
                    Section("Pen") {
                        Picker("Pen", selection: $settings.pen) {
                            ForEach(PenTool.allCases, id: \.self) { pen in
                                Text(pen.rawValue.capitalized).tag(pen)
                            }
                        }
                        .pickerStyle(.segmented)
                    }

                    Section {
                        Slider(value: $settings.stabilization, in: 0...0.95)
                    } header: {
                        Text("Steadiness")
                    } footer: {
                        Text("Eases each stroke toward where your hand was, so a shaky line comes out smooth.")
                            .font(Theme.ui(12))
                    }
                }

                if settings.tool == .eraser {
                    Section("Eraser") {
                        Picker("Mode", selection: $settings.eraserMode) {
                            ForEach(EraserMode.allCases, id: \.self) { mode in
                                Text(mode.label).tag(mode)
                            }
                        }
                        .pickerStyle(.segmented)

                        Slider(value: $settings.eraserRadius, in: 0.004...0.06)

                        Toggle("Highlighter only", isOn: $settings.eraserHighlighterOnly)
                    }
                }
            }
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle(settings.tool.label)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
}

extension PenTool: CaseIterable {
    public static var allCases: [PenTool] { [.ball, .fountain, .brush, .pencil] }
}

private extension Color {
    /// The literal sRGB the annotation model stores.
    var hexString: String {
        let components = UIColor(self).cgColor.components ?? [0, 0, 0]
        let channels = components.count >= 3 ? components : [components[0], components[0], components[0]]
        return String(
            format: "#%02x%02x%02x",
            Int((channels[0] * 255).rounded()),
            Int((channels[1] * 255).rounded()),
            Int((channels[2] * 255).rounded())
        )
    }
}
