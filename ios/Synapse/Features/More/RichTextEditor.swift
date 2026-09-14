import SwiftUI
import UIKit

/// A rich-text editor over `NSAttributedString`, with an inline toolbar for the
/// four marks the notebook models (bold / italic / underline / strikethrough).
///
/// Bold, italic and underline reuse UIKit's own responder actions, which is why
/// this is a `UITextView` and not SwiftUI's `TextEditor`: attributed editing is
/// native on iOS 26 only, and the app deploys to iOS 18. Strikethrough has no
/// built-in action, so it is toggled by hand.
struct RichTextEditor: UIViewRepresentable {
    @Binding var text: NSAttributedString
    let baseFont: UIFont
    let textColor: UIColor

    func makeUIView(context: Context) -> UITextView {
        let view = UITextView()
        view.allowsEditingTextAttributes = true
        view.backgroundColor = .clear
        view.font = baseFont
        view.textColor = textColor
        view.typingAttributes = [.font: baseFont, .foregroundColor: textColor]
        view.attributedText = text
        view.delegate = context.coordinator
        view.inputAccessoryView = context.coordinator.makeToolbar()
        context.coordinator.textView = view
        return view
    }

    func updateUIView(_ view: UITextView, context: Context) {
        // The text view owns the content once it is first responder; assigning
        // `attributedText` here would reset the caret on every keystroke. The
        // note is loaded once in `makeUIView` and the only writer after that is
        // the student.
    }

    func makeCoordinator() -> Coordinator { Coordinator(self) }

    final class Coordinator: NSObject, UITextViewDelegate {
        private let parent: RichTextEditor
        weak var textView: UITextView?

        init(_ parent: RichTextEditor) { self.parent = parent }

        func textViewDidChange(_ view: UITextView) { parent.text = view.attributedText }

        func makeToolbar() -> UIToolbar {
            let bar = UIToolbar()
            bar.sizeToFit()
            func item(_ symbol: String, _ action: Selector, _ label: String) -> UIBarButtonItem {
                let button = UIBarButtonItem(image: UIImage(systemName: symbol), style: .plain, target: self, action: action)
                button.accessibilityLabel = label
                return button
            }
            bar.items = [
                item("bold", #selector(bold), "Bold"),
                item("italic", #selector(italic), "Italic"),
                item("underline", #selector(underline), "Underline"),
                item("strikethrough", #selector(strike), "Strikethrough"),
                .flexibleSpace(),
                item("keyboard.chevron.compact.down", #selector(dismissKeyboard), "Done"),
            ]
            return bar
        }

        @objc private func bold() { textView?.toggleBoldface(nil); pushChange() }
        @objc private func italic() { textView?.toggleItalics(nil); pushChange() }
        @objc private func underline() { textView?.toggleUnderline(nil); pushChange() }
        @objc private func dismissKeyboard() { textView?.resignFirstResponder() }

        /// No UIKit responder action for strikethrough, so toggle the attribute
        /// over the selection — or the typing attributes, when nothing is picked.
        @objc private func strike() {
            guard let view = textView else { return }
            let key = NSAttributedString.Key.strikethroughStyle
            let range = view.selectedRange
            if range.length == 0 {
                let on = (view.typingAttributes[key] as? Int ?? 0) != 0
                view.typingAttributes[key] = on ? 0 : NSUnderlineStyle.single.rawValue
                return
            }
            let current = view.textStorage.attribute(key, at: range.location, effectiveRange: nil) as? Int ?? 0
            view.textStorage.addAttribute(key, value: current != 0 ? 0 : NSUnderlineStyle.single.rawValue, range: range)
            pushChange()
        }

        /// Toggling an attribute is not a text change, so `textViewDidChange`
        /// does not fire; push the new value up by hand.
        private func pushChange() {
            guard let view = textView else { return }
            parent.text = view.attributedText
        }
    }
}
