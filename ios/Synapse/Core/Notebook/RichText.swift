import UIKit

/// Bridges a note's Lexical `editorJson` to and from an `NSAttributedString`
/// for the on-device rich editor.
///
/// Only the four inline marks the editor offers — bold, italic, underline,
/// strikethrough — are modelled, and block structure is paragraphs. A note that
/// carries anything richer (a heading, list, table, image) is edited as plain
/// text instead (`NotebookDoc.isSimple` is the gate), so this path never has to
/// represent, or risk dropping, a structure it does not understand. The marks
/// map to Lexical's own text-node `format` bitfield, so a bold run written on
/// the phone reads bold on the website and vice-versa.
enum NotebookRichText {

    /// Lexical text-node `format` bit flags — identical to the web's Lexical.
    enum Mark {
        static let bold = 1, italic = 2, strikethrough = 4, underline = 8
    }

    /// A note's paragraphs of formatted text → an attributed string the editor
    /// can show and edit. Newlines separate paragraphs, as `editorJsonToPlainText`
    /// joins them.
    static func attributedString(from editorJson: JSONValue?, baseFont: UIFont, color: UIColor) -> NSAttributedString {
        let result = NSMutableAttributedString()
        let paragraphs = editorJson?["root"]?["children"]?.arrayValue ?? []
        for (index, paragraph) in paragraphs.enumerated() {
            if index > 0 { result.append(NSAttributedString(string: "\n")) }
            for run in paragraph["children"]?.arrayValue ?? [] {
                guard let text = run["text"]?.stringValue, !text.isEmpty else { continue }
                let format = Int(run["format"]?.numberValue ?? 0)
                result.append(NSAttributedString(string: text, attributes: attributes(format: format, baseFont: baseFont, color: color)))
            }
        }
        if result.length == 0 {
            result.append(NSAttributedString(string: "", attributes: [.font: baseFont, .foregroundColor: color]))
        }
        return result
    }

    /// The editor's attributed string → a Lexical root of paragraphs, each split
    /// into text runs by contiguous formatting. The inverse of `attributedString`.
    static func editorJson(from attributed: NSAttributedString) -> JSONValue {
        let string = attributed.string as NSString
        var paragraphs: [JSONValue] = []
        var runs: [JSONValue] = []
        attributed.enumerateAttributes(in: NSRange(location: 0, length: attributed.length)) { attrs, range, _ in
            let format = bitfield(from: attrs)
            // A single attribute run can span paragraph breaks; each "\n" closes
            // the current paragraph and opens the next.
            let segments = string.substring(with: range).components(separatedBy: "\n")
            for (index, segment) in segments.enumerated() {
                if index > 0 { paragraphs.append(paragraphNode(runs)); runs = [] }
                if !segment.isEmpty { runs.append(textNode(segment, format: format)) }
            }
        }
        paragraphs.append(paragraphNode(runs))
        return .object(["root": .object([
            "type": .string("root"), "version": .number(1),
            "children": .array(paragraphs.isEmpty ? [paragraphNode([])] : paragraphs),
            "direction": .null, "format": .string(""), "indent": .number(0),
        ])])
    }

    // MARK: - Attribute ↔ bitfield

    static func attributes(format: Int, baseFont: UIFont, color: UIColor) -> [NSAttributedString.Key: Any] {
        var traits = baseFont.fontDescriptor.symbolicTraits
        if format & Mark.bold != 0 { traits.insert(.traitBold) }
        if format & Mark.italic != 0 { traits.insert(.traitItalic) }
        let font = baseFont.fontDescriptor.withSymbolicTraits(traits)
            .map { UIFont(descriptor: $0, size: baseFont.pointSize) } ?? baseFont
        var attrs: [NSAttributedString.Key: Any] = [.font: font, .foregroundColor: color]
        if format & Mark.underline != 0 { attrs[.underlineStyle] = NSUnderlineStyle.single.rawValue }
        if format & Mark.strikethrough != 0 { attrs[.strikethroughStyle] = NSUnderlineStyle.single.rawValue }
        return attrs
    }

    static func bitfield(from attrs: [NSAttributedString.Key: Any]) -> Int {
        var format = 0
        if let font = attrs[.font] as? UIFont {
            let traits = font.fontDescriptor.symbolicTraits
            if traits.contains(.traitBold) { format |= Mark.bold }
            if traits.contains(.traitItalic) { format |= Mark.italic }
        }
        if let style = attrs[.underlineStyle] as? Int, style != 0 { format |= Mark.underline }
        if let style = attrs[.strikethroughStyle] as? Int, style != 0 { format |= Mark.strikethrough }
        return format
    }

    // MARK: - Node builders (the exact shapes Lexical serialises)

    private static func textNode(_ text: String, format: Int) -> JSONValue {
        .object([
            "type": .string("text"), "version": .number(1), "text": .string(text),
            "detail": .number(0), "format": .number(Double(format)), "mode": .string("normal"), "style": .string(""),
        ])
    }

    private static func paragraphNode(_ children: [JSONValue]) -> JSONValue {
        .object([
            "type": .string("paragraph"), "version": .number(1),
            "children": .array(children),
            "direction": .null, "format": .string(""), "indent": .number(0),
            "textFormat": .number(0), "textStyle": .string(""),
        ])
    }
}
