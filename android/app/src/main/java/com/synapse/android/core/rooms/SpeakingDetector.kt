package com.synapse.android.core.rooms

/**
 * Turns a stream of microphone loudness readings into a stable speaking flag —
 * the Android peer of the analyser loop in `useRoomAudio.ts`. The server never
 * decodes audio, so "am I speaking" is measured here, on this device's own
 * mic, and the boolean is broadcast for everyone else's roster.
 *
 * Pure and clock-injected ([onSample] takes `nowMs`), so `SpeakingDetectorTest`
 * asserts the onset and release timing without a real microphone or a sleep.
 * The RMS itself is computed from the WebRTC audio-device-module's PCM buffers;
 * see `MediasoupVoiceClient`.
 */
class SpeakingDetector(
    private val threshold: Double = SPEAKING_RMS,
    private val onsetMs: Long = ONSET_MS,
    private val releaseMs: Long = RELEASE_MS,
) {
    private var aboveSince: Long? = null
    private var belowSince: Long? = null
    private var speaking = false

    /**
     * Feed one loudness reading. Returns the current speaking flag: true only
     * after loudness has held above [threshold] for [onsetMs] (a cough is not a
     * turn to speak), and back to false only after it has held below for
     * [releaseMs] (an ordinary pause between words does not flicker the ring).
     * While [muted], always false.
     */
    fun onSample(rms: Double, nowMs: Long, muted: Boolean): Boolean {
        if (muted) {
            aboveSince = null
            belowSince = null
            speaking = false
            return false
        }
        if (rms >= threshold) {
            belowSince = null
            val since = aboveSince ?: nowMs.also { aboveSince = it }
            if (nowMs - since >= onsetMs) speaking = true
        } else {
            aboveSince = null
            val since = belowSince ?: nowMs.also { belowSince = it }
            if (nowMs - since >= releaseMs) speaking = false
        }
        return speaking
    }

    fun reset() {
        aboveSince = null
        belowSince = null
        speaking = false
    }

    companion object {
        /** How loud (RMS, 0–1) counts as speech rather than a room's own hum. */
        const val SPEAKING_RMS = 0.035
        /** Sustained for this long before the ring lights. */
        const val ONSET_MS = 120L
        /** Held for this long after it drops. */
        const val RELEASE_MS = 400L

        /** RMS (0–1) of one 16-bit PCM buffer. `data` is little-endian shorts. */
        fun rmsOfPcm16(data: ByteArray, length: Int = data.size): Double {
            val samples = length / 2
            if (samples == 0) return 0.0
            var sum = 0.0
            var i = 0
            while (i + 1 < length) {
                val s = (data[i].toInt() and 0xFF) or (data[i + 1].toInt() shl 8)
                val v = s / 32768.0
                sum += v * v
                i += 2
            }
            return kotlin.math.sqrt(sum / samples)
        }
    }
}
