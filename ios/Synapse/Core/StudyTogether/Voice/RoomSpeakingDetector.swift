import Foundation

/// Turns a stream of microphone levels into "is this person speaking".
///
/// The same thresholds the web client uses (`useRoomAudio.ts`): a level counts
/// as speech only once it has been sustained past an onset, and the ring stays
/// lit through the ordinary pauses between words by a longer release. The server
/// never decodes audio — speaking is measured here and broadcast as a boolean —
/// so this is the whole of active-speaker detection.
///
/// Pure: it holds only the onset/release timestamps and is driven by
/// `update(rms:now:)`, so the thresholds can be asserted without an audio
/// engine or a clock.
struct RoomSpeakingDetector {

    /// How loud (RMS, 0–1) counts as speech rather than a room's own hum.
    static let speakingRMS = 0.035
    /// Sustained for this long before the ring lights — a cough is not a turn.
    static let onset: TimeInterval = 0.120
    /// Held for this long after it drops, so pauses between words do not flicker.
    static let release: TimeInterval = 0.400

    private var aboveSince: Date?
    private var belowSince: Date?
    private(set) var isSpeaking = false

    /// Feed one sample. Returns the current speaking state.
    ///
    /// While muted the answer is always false and the timers reset, matching the
    /// web client: a muted microphone is not a speaker however loud the room is.
    mutating func update(rms: Double, now: Date, muted: Bool) -> Bool {
        if muted {
            aboveSince = nil
            belowSince = nil
            isSpeaking = false
            return false
        }
        if rms >= Self.speakingRMS {
            belowSince = nil
            let start = aboveSince ?? now
            aboveSince = start
            if now.timeIntervalSince(start) >= Self.onset { isSpeaking = true }
        } else {
            aboveSince = nil
            let start = belowSince ?? now
            belowSince = start
            if now.timeIntervalSince(start) >= Self.release { isSpeaking = false }
        }
        return isSpeaking
    }

    /// Root-mean-square of a buffer of mono samples in [-1, 1].
    static func rms(_ samples: [Float]) -> Double {
        guard !samples.isEmpty else { return 0 }
        var sum = 0.0
        for sample in samples { sum += Double(sample) * Double(sample) }
        return (sum / Double(samples.count)).squareRoot()
    }
}
