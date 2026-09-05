import Foundation

/// What muting actually has to do, as a pure decision.
///
/// A mute button that only hid a dot would have been broadcasting all along, so
/// muting is three things at once (from `useRoomAudio.ts`): stop the local track
/// transmitting, pause the producer on the SFU (both the client-side pause and
/// the `sfu:pause` frame), and tell the room the ring is out. Unmuting is the
/// same three in reverse, minus the speaking frame — the analyser will relight
/// the ring on its own when the student next talks.
///
/// Modelled as a function from the current state to the next state plus the
/// side-effects to run, so the sequence can be asserted without a socket or a
/// track.
enum RoomMuteMachine {

    struct Effects: Equatable {
        /// `track.isEnabled` — false when muting.
        var trackEnabled: Bool
        /// Pause (true) or resume (false) the local producer and send `sfu:pause`.
        var producerPaused: Bool
        /// Emit `speaking:false`. Only when muting; unmuting waits for the analyser.
        var announceSilent: Bool
    }

    /// Toggle from `muted` and return the new value and what to do about it.
    static func toggle(muted: Bool) -> (muted: Bool, effects: Effects) {
        let next = !muted
        return (next, Effects(
            trackEnabled: !next,
            producerPaused: next,
            announceSilent: next,
        ))
    }
}
