import SwiftUI
import UIKit

/// A mark's tone drawn as a colour.
///
/// Covers the whole `NOTE_TONES` palette the web can author, not only the four
/// this app's toolbar offers, so a note made anywhere still draws in something
/// sensible; an unknown tone falls back to the accent rather than vanishing.
enum MarkTonePalette {
    private static let hex: [String: UInt32] = [
        "amber": 0xc2691c, "teal": 0x2f7d6b, "rose": 0xb03a76, "sage": 0x4f8f3a,
        "slate": 0x5b6570, "sand": 0x8a6d3b, "clay": 0xc2352f, "paper": 0x8a8578,
    ]

    static func uiColor(_ tone: String) -> UIColor {
        hex[tone].map { UIColor(rgb: $0) } ?? UIColor(Theme.accent)
    }

    static func color(_ tone: String) -> Color { Color(uiColor: uiColor(tone)) }

    /// "amber" → "Amber", for a menu item and an accessibility label.
    static func label(_ tone: String) -> String {
        tone.isEmpty ? tone : tone.prefix(1).uppercased() + tone.dropFirst()
    }
}

/// Article prose a student can select, highlight and note — and whose concept
/// terms stay pressable.
///
/// A `UITextView` rather than SwiftUI `Text` for one reason: only UIKit hands
/// back the range a student selected, which is what a highlight is made from.
/// It reproduces `ConceptText`'s concept links (same custom scheme) so nothing
/// is lost by moving off `Text`, and paints each resolved mark on top.
struct MarkableText: UIViewRepresentable {
    let text: String
    /// This block's id, so a new mark's anchor names where it was made.
    let blockId: String
    let font: UIFont
    var concepts: ConceptTerms
    /// The marks that resolve inside this block, with where they sit now.
    var placements: [LibraryMarks.Placement]
    let strings: Localisation
    var onOpenConcept: (Concept) -> Void
    var onOpenMark: (String) -> Void
    /// A student made a selection and chose a tone (and whether to open a note).
    var onCreate: (_ range: TextRange, _ tone: String, _ openNote: Bool) -> Void

    static let conceptScheme = "connectcortex-concept"
    static let markScheme = "nishany-mark"

    func makeUIView(context: Context) -> UITextView {
        let view = UITextView()
        view.isEditable = false
        view.isSelectable = true
        // Off, so the view reports an intrinsic height and grows with its text
        // inside the article's outer ScrollView.
        view.isScrollEnabled = false
        view.backgroundColor = .clear
        view.textContainerInset = .zero
        view.textContainer.lineFragmentPadding = 0
        view.adjustsFontForContentSizeCategory = true
        view.delegate = context.coordinator
        // Links keep exactly the attributes rendered below, rather than being
        // repainted in the tint colour — the marks and concepts each style
        // themselves.
        view.linkTextAttributes = [:]
        view.setContentCompressionResistancePriority(.required, for: .vertical)
        view.setContentHuggingPriority(.required, for: .vertical)
        return view
    }

    func updateUIView(_ view: UITextView, context: Context) {
        context.coordinator.parent = self
        view.attributedText = context.coordinator.render()
        view.tintColor = UIColor(Theme.primary)
    }

    func makeCoordinator() -> Coordinator { Coordinator(self) }

    @MainActor
    final class Coordinator: NSObject, UITextViewDelegate {
        var parent: MarkableText
        init(_ parent: MarkableText) { self.parent = parent }

        func render() -> NSAttributedString {
            let paragraph = NSMutableParagraphStyle()
            paragraph.lineSpacing = 6
            let base: [NSAttributedString.Key: Any] = [
                .font: parent.font,
                .foregroundColor: UIColor(Theme.ink),
                .paragraphStyle: paragraph,
            ]

            let out = NSMutableAttributedString()
            for piece in parent.concepts.split(parent.text) {
                var attrs = base
                if let id = piece.conceptId, let url = URL(string: "\(MarkableText.conceptScheme)://\(id)") {
                    attrs[.link] = url
                    attrs[.foregroundColor] = UIColor(Theme.accent)
                    attrs[.underlineStyle] = NSUnderlineStyle.single.rawValue | NSUnderlineStyle.patternDot.rawValue
                }
                out.append(NSAttributedString(string: piece.text, attributes: attrs))
            }

            // Marks on top, so a highlight over a concept term still reads as a
            // highlight and its tap opens the note.
            for placement in parent.placements {
                guard let range = Self.utf16Range(placement.range, in: parent.text) else { continue }
                let colour = MarkTonePalette.uiColor(placement.mark.tone)
                out.addAttribute(.backgroundColor, value: colour.withAlphaComponent(0.20), range: range)
                out.addAttribute(.underlineStyle, value: NSUnderlineStyle.thick.rawValue, range: range)
                out.addAttribute(.underlineColor, value: colour, range: range)
                if let url = URL(string: "\(MarkableText.markScheme)://\(placement.mark.id)") {
                    out.addAttribute(.link, value: url, range: range)
                }
            }
            return out
        }

        // A tap on a concept or a mark, rather than following the URL.
        func textView(_ textView: UITextView, primaryActionFor textItem: UITextItem, defaultAction: UIAction) -> UIAction? {
            guard case let .link(url) = textItem.content else { return defaultAction }
            if url.scheme == MarkableText.conceptScheme, let concept = parent.concepts.concept(id: url.host() ?? "") {
                return UIAction(title: "") { [weak self] _ in self?.parent.onOpenConcept(concept) }
            }
            if url.scheme == MarkableText.markScheme, let id = url.host() {
                return UIAction(title: "") { [weak self] _ in self?.parent.onOpenMark(id) }
            }
            return defaultAction
        }

        // The menu over a selection: a tone to highlight in, or a note.
        func textView(_ textView: UITextView, editMenuForTextIn range: NSRange, suggestedActions: [UIMenuElement]) -> UIMenu? {
            guard range.length > 0, let selected = Self.scalarRange(range, in: parent.text) else { return nil }
            let strings = parent.strings

            let tones = LibraryMarks.offeredTones.map { tone in
                UIAction(title: strings(MarkTonePalette.label(tone))) { [weak self, weak textView] _ in
                    self?.parent.onCreate(selected, tone, false)
                    textView?.selectedTextRange = nil
                }
            }
            let highlight = UIMenu(
                title: strings("Highlight"),
                image: UIImage(systemName: "highlighter"),
                children: tones
            )
            let note = UIAction(title: strings("Add note"), image: UIImage(systemName: "note.text")) { [weak self, weak textView] _ in
                self?.parent.onCreate(selected, "amber", true)
                textView?.selectedTextRange = nil
            }
            let mine = UIMenu(title: "", options: .displayInline, children: [highlight, note])
            return UIMenu(children: [mine] + suggestedActions)
        }

        // MARK: - Offset conversion

        /// Scalar `[start,end)` → the `UITextView`'s UTF-16 range for drawing.
        static func utf16Range(_ range: TextRange, in text: String) -> NSRange? {
            let scalars = text.unicodeScalars
            guard range.start >= 0, range.end <= scalars.count, range.start < range.end else { return nil }
            let lo = scalars.index(scalars.startIndex, offsetBy: range.start)
            let hi = scalars.index(scalars.startIndex, offsetBy: range.end)
            guard let a = lo.samePosition(in: text), let b = hi.samePosition(in: text) else { return nil }
            return NSRange(a..<b, in: text)
        }

        /// A UTF-16 selection → scalar `[start,end)`, the unit an anchor records
        /// so it resolves the same on the web.
        static func scalarRange(_ nsRange: NSRange, in text: String) -> TextRange? {
            guard let r = Range(nsRange, in: text) else { return nil }
            let scalars = text.unicodeScalars
            guard let lo = r.lowerBound.samePosition(in: scalars),
                  let hi = r.upperBound.samePosition(in: scalars) else { return nil }
            return TextRange(
                start: scalars.distance(from: scalars.startIndex, to: lo),
                end: scalars.distance(from: scalars.startIndex, to: hi)
            )
        }
    }
}
