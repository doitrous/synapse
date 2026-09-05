import Foundation
import Testing
@testable import Nishany

/// The pure decisions behind a call: what muting does, and when a level counts
/// as speech.
struct RoomVoiceLogicTests {

    // MARK: - Mute

    @Test func mutingStopsTrackPausesProducerAndAnnouncesSilence() {
        let (muted, effects) = RoomMuteMachine.toggle(muted: false)
        #expect(muted)
        #expect(effects == RoomMuteMachine.Effects(trackEnabled: false, producerPaused: true, announceSilent: true))
    }

    @Test func unmutingResumesButDoesNotAnnounceSpeaking() {
        // The analyser relights the ring on the next word; unmute must not claim
        // the student is speaking.
        let (muted, effects) = RoomMuteMachine.toggle(muted: true)
        #expect(!muted)
        #expect(effects == RoomMuteMachine.Effects(trackEnabled: true, producerPaused: false, announceSilent: false))
    }

    // MARK: - Speaking thresholds

    @Test func quietNeverSpeaks() {
        var detector = RoomSpeakingDetector()
        let start = Date()
        let a = detector.update(rms: 0.01, now: start, muted: false)
        let b = detector.update(rms: 0.02, now: start.addingTimeInterval(1), muted: false)
        #expect(!a)
        #expect(!b)
    }

    @Test func loudMustBeSustainedPastOnset() {
        var detector = RoomSpeakingDetector()
        let start = Date()
        // Loud, but a cough — under the 120 ms onset.
        let atStart = detector.update(rms: 0.2, now: start, muted: false)
        let at50 = detector.update(rms: 0.2, now: start.addingTimeInterval(0.05), muted: false)
        // Sustained past onset — now speaking.
        let at130 = detector.update(rms: 0.2, now: start.addingTimeInterval(0.13), muted: false)
        #expect(!atStart)
        #expect(!at50)
        #expect(at130)
    }

    @Test func ringHoldsThroughShortPausesThenReleases() {
        var detector = RoomSpeakingDetector()
        let start = Date()
        _ = detector.update(rms: 0.2, now: start, muted: false)
        let lit = detector.update(rms: 0.2, now: start.addingTimeInterval(0.13), muted: false)
        // A gap between words shorter than the release keeps the ring lit.
        let shortPause = detector.update(rms: 0.0, now: start.addingTimeInterval(0.3), muted: false)
        // Silence past the release drops it.
        let released = detector.update(rms: 0.0, now: start.addingTimeInterval(0.75), muted: false)
        #expect(lit)
        #expect(shortPause)
        #expect(!released)
    }

    @Test func mutedIsNeverSpeaking() {
        var detector = RoomSpeakingDetector()
        let start = Date()
        _ = detector.update(rms: 0.2, now: start, muted: false)
        _ = detector.update(rms: 0.2, now: start.addingTimeInterval(0.2), muted: false)
        let whileMuted = detector.update(rms: 0.9, now: start.addingTimeInterval(0.25), muted: true)
        #expect(!whileMuted)
    }

    @Test func rmsOfSilenceIsZeroAndOfFullScaleIsOne() {
        #expect(RoomSpeakingDetector.rms([0, 0, 0]) == 0)
        #expect(abs(RoomSpeakingDetector.rms([1, -1, 1, -1]) - 1.0) < 1e-9)
        #expect(RoomSpeakingDetector.rms([]) == 0)
    }
}
