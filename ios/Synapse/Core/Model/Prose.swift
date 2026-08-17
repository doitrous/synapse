import Foundation

/// Typographic normalisation for authored prose.
///
/// A port of `src/lib/prose.ts`. The app's own copy is written with curly
/// quotes, so an article quoting a patient — `her heart keeps "jumping"` — would
/// otherwise put straight ASCII quotes beside typographic ones in the same
/// paragraph, which reads as broken formatting.
///
/// It runs at projection time so every surface benefits at once, and it is
/// deliberately conservative: it changes punctuation, never words.
enum Prose {

    /// The whole pass, in the order the steps depend on each other: entities
    /// first, so `&quot;` is a quote by the time quotes are being decided.
    static func normalize(_ text: String) -> String {
        guard !text.isEmpty else { return text }
        return normalizeDashes(curlyQuotes(decodeEntities(text)))
    }

    /// The handful of entities that actually turn up in imported content.
    private static let entities: [String: String] = [
        "amp": "&", "quot": "\"", "apos": "'", "lt": "<", "gt": ">",
        "nbsp": "\u{00A0}",
        "ldquo": "\u{201C}", "rdquo": "\u{201D}", "lsquo": "\u{2018}", "rsquo": "\u{2019}",
        "mdash": "\u{2014}", "ndash": "\u{2013}", "hellip": "\u{2026}",
        "deg": "\u{00B0}", "micro": "\u{00B5}", "times": "\u{00D7}",
    ]

    /// Undo a single round of HTML escaping.
    ///
    /// `&amp;` is resolved in the same pass as everything else rather than
    /// first, so a literal `&amp;quot;` in the source stays the text `&quot;`
    /// instead of silently becoming a quote character.
    static func decodeEntities(_ text: String) -> String {
        guard text.contains("&") else { return text }
        let pattern = try! NSRegularExpression(pattern: "&(#x?[0-9a-fA-F]+|[a-zA-Z]+);")
        let source = text as NSString
        var out = ""
        var cursor = 0

        pattern.enumerateMatches(in: text, range: NSRange(location: 0, length: source.length)) { match, _, _ in
            guard let match else { return }
            out += source.substring(with: NSRange(location: cursor, length: match.range.location - cursor))
            let whole = source.substring(with: match.range)
            let body = source.substring(with: match.range(at: 1))

            if body.hasPrefix("#") {
                let isHex = body.count > 1 && (body[body.index(body.startIndex, offsetBy: 1)] == "x" || body[body.index(body.startIndex, offsetBy: 1)] == "X")
                let digits = String(body.dropFirst(isHex ? 2 : 1))
                if let code = UInt32(digits, radix: isHex ? 16 : 10),
                   code > 0, code <= 0x10FFFF, let scalar = Unicode.Scalar(code) {
                    out += String(Character(scalar))
                } else {
                    out += whole
                }
            } else {
                out += entities[body.lowercased()] ?? whole
            }
            cursor = match.range.location + match.range.length
        }

        out += source.substring(from: cursor)
        return out
    }

    /// Characters after which a quote is opening rather than closing.
    private static let opensAfter: Set<Character> = [
        " ", "\t", "\n", "\r", "(", "[", "{", "\u{00A0}",
        "\u{2014}", "\u{2013}", "/", "\u{201C}", "\u{2018}",
    ]

    /// Straight quotes become typographic ones, decided by what precedes them.
    ///
    /// A double quote at the start of a run, or after a space or an opening
    /// bracket, opens; anything else closes. A single quote after a letter or
    /// digit is an apostrophe (`don't`, `patient's`), otherwise it opens.
    ///
    /// The word test includes the Arabic block, so an apostrophe inside
    /// transliterated or mixed-script text is not mistaken for an opening quote.
    static func curlyQuotes(_ text: String) -> String {
        var out = ""
        out.reserveCapacity(text.count)
        var previous: Character?

        for char in text {
            switch char {
            case "\"":
                let opens = previous.map { opensAfter.contains($0) } ?? true
                out.append(opens ? "\u{201C}" : "\u{201D}")
            case "'":
                if let previous, isWordCharacter(previous) {
                    out.append("\u{2019}")
                } else {
                    let opens = previous.map { opensAfter.contains($0) } ?? true
                    out.append(opens ? "\u{2018}" : "\u{2019}")
                }
            default:
                out.append(char)
            }
            previous = char
        }
        return out
    }

    /// Mirrors the `[A-Za-z0-9؀-ۿ]` test in the source.
    private static func isWordCharacter(_ char: Character) -> Bool {
        guard let scalar = char.unicodeScalars.first, char.unicodeScalars.count == 1 else {
            return char.isLetter || char.isNumber
        }
        if ("A"..."Z").contains(char) || ("a"..."z").contains(char) || ("0"..."9").contains(char) {
            return true
        }
        return (0x0600...0x06FF).contains(scalar.value)
    }

    /// Dashes and ellipses.
    ///
    /// Only a spaced `--` becomes an em dash: an unspaced one is far more likely
    /// to be a range, an identifier or a command-line flag than punctuation
    /// somebody typed twice.
    static func normalizeDashes(_ text: String) -> String {
        var out = text.replacingOccurrences(
            of: " +-- +", with: "\u{2014}", options: .regularExpression
        )
        // Both edges are guarded, so a longer run of dots is left alone rather
        // than having an ellipsis taken out of the middle of it.
        out = out.replacingOccurrences(
            of: "(?<!\\.)\\.{3}(?!\\.)", with: "\u{2026}", options: .regularExpression
        )
        return out
    }
}
