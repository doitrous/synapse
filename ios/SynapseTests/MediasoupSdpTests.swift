import Foundation
import Testing
@testable import Synapse

/// The hand-rolled ORTC ⇄ SDP mapping for one Opus track.
///
/// These pin the pure string transforms — the part that can be checked without
/// two devices and a live SFU. What they cannot prove is that the resulting
/// DTLS/ICE handshake completes against a real mediasoup worker; that is the
/// documented, infrastructure-bound seam.
struct MediasoupSdpTests {

    private func transport() -> MediasoupSdp.Transport {
        MediasoupSdp.Transport(
            ice: IceParameters(usernameFragment: "ufrag", password: "pwd", iceLite: true),
            candidates: [
                IceCandidate(foundation: "1", priority: 12345, address: "203.0.113.9", ip: nil,
                             protocol: "udp", port: 40010, type: "host", tcpType: nil),
            ],
            dtls: DtlsParameters(role: "auto", fingerprints: [DtlsFingerprint(algorithm: "sha-256", value: "AA:BB:CC")]),
        )
    }

    private func opus(payloadType: Int, ssrc: UInt32?) -> RtpParameters {
        RtpParameters(
            mid: "0",
            codecs: [RtpCodecParameters(
                mimeType: "audio/opus", payloadType: payloadType, clockRate: 48000, channels: 2,
                parameters: ["minptime": .int(10), "useinbandfec": .int(1)],
                rtcpFeedback: [RtcpFeedback(type: "transport-cc", parameter: nil)],
            )],
            headerExtensions: [RtpHeaderExtensionParameters(uri: "urn:ietf:params:rtp-hdrext:ssrc-audio-level", id: 1, encrypt: nil)],
            encodings: ssrc.map { [RtpEncoding(ssrc: $0, dtx: nil)] },
            rtcp: RtcpParameters(cname: "cname0", reducedSize: true),
        )
    }

    // MARK: - Building remote SDP

    @Test func sendAnswerIsRecvonlyPassiveWithServerFingerprint() {
        let sdp = MediasoupSdp.sendAnswer(transport: transport(), produced: opus(payloadType: 111, ssrc: nil), mid: "0")
        #expect(sdp.contains("a=fingerprint:sha-256 AA:BB:CC"))
        #expect(sdp.contains("a=ice-lite"))
        #expect(sdp.contains("a=group:BUNDLE 0"))
        #expect(sdp.contains("m=audio 7 UDP/TLS/RTP/SAVPF 111"))
        #expect(sdp.contains("a=ice-ufrag:ufrag"))
        #expect(sdp.contains("a=ice-pwd:pwd"))
        #expect(sdp.contains("a=setup:passive"))
        #expect(sdp.contains("a=recvonly"))
        #expect(sdp.contains("a=rtpmap:111 opus/48000/2"))
        #expect(sdp.contains("a=candidate:1 1 udp 12345 203.0.113.9 40010 typ host"))
        #expect(sdp.contains("a=end-of-candidates"))
    }

    @Test func recvOfferHasOneSendonlySectionPerConsumerUnderOneBundle() {
        let sdp = MediasoupSdp.recvOffer(transport: transport(), consumers: [
            (mid: "recv1", rtp: opus(payloadType: 100, ssrc: 111)),
            (mid: "recv2", rtp: opus(payloadType: 100, ssrc: 222)),
        ])
        #expect(sdp.contains("a=group:BUNDLE recv1 recv2"))
        #expect(sdp.components(separatedBy: "m=audio").count - 1 == 2)
        #expect(sdp.contains("a=sendonly"))
        #expect(sdp.contains("a=ssrc:111 cname:cname0"))
        #expect(sdp.contains("a=ssrc:222 cname:cname0"))
        #expect(sdp.contains("a=mid:recv1"))
        #expect(sdp.contains("a=mid:recv2"))
    }

    @Test func fmtpParametersAreSortedAndRendered() {
        let sdp = MediasoupSdp.sendAnswer(transport: transport(), produced: opus(payloadType: 111, ssrc: nil), mid: "0")
        #expect(sdp.contains("a=fmtp:111 minptime=10;useinbandfec=1"))
        #expect(sdp.contains("a=rtcp-fb:111 transport-cc"))
        #expect(sdp.contains("a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level"))
    }

    // MARK: - Parsing our own offer

    @Test func parsesOpusRtpParametersOutOfAnOffer() throws {
        let offer = [
            "v=0", "o=- 1 2 IN IP4 0.0.0.0", "s=-", "t=0 0",
            "m=audio 9 UDP/TLS/RTP/SAVPF 111 63",
            "a=mid:0",
            "a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level",
            "a=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
            "a=rtpmap:111 opus/48000/2",
            "a=fmtp:111 minptime=10;useinbandfec=1",
            "a=rtcp-fb:111 transport-cc",
            "a=rtpmap:63 red/48000/2",
            "a=ssrc:987654 cname:abcCNAME",
        ].joined(separator: "\r\n")

        let rtp = try #require(MediasoupSdp.parseProducerRtpParameters(offer: offer))
        #expect(rtp.mid == "0")
        #expect(rtp.codecs.count == 1) // only Opus, not red
        #expect(rtp.codecs[0].payloadType == 111)
        #expect(rtp.codecs[0].clockRate == 48000)
        #expect(rtp.codecs[0].channels == 2)
        #expect(rtp.codecs[0].parameters?["useinbandfec"]?.sdpText == "1")
        #expect(rtp.codecs[0].rtcpFeedback?.first?.type == "transport-cc")
        #expect(rtp.headerExtensions?.count == 2)
        #expect(rtp.encodings?.first?.ssrc == 987654)
        #expect(rtp.rtcp?.cname == "abcCNAME")
    }

    @Test func offerWithoutOpusYieldsNil() {
        let offer = "v=0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 8\r\na=rtpmap:8 PCMA/8000\r\n"
        #expect(MediasoupSdp.parseProducerRtpParameters(offer: offer) == nil)
    }

    @Test func extractsOurFingerprintForConnect() throws {
        let sdp = "v=0\r\na=fingerprint:sha-256 DE:AD:BE:EF\r\nm=audio 9 RTP/SAVPF 111\r\n"
        let fingerprint = try #require(MediasoupSdp.parseFingerprint(localSDP: sdp))
        #expect(fingerprint.algorithm == "sha-256")
        #expect(fingerprint.value == "DE:AD:BE:EF")
    }

    /// A parsed producer's parameters must round-trip back into a well-formed
    /// media section — the two halves of the mapping agreeing.
    @Test func parsedParametersRebuildIntoValidSection() throws {
        let offer = [
            "m=audio 9 UDP/TLS/RTP/SAVPF 111", "a=mid:0",
            "a=rtpmap:111 opus/48000/2", "a=fmtp:111 useinbandfec=1",
            "a=ssrc:5 cname:c",
        ].joined(separator: "\r\n")
        let rtp = try #require(MediasoupSdp.parseProducerRtpParameters(offer: offer))
        let sdp = MediasoupSdp.sendAnswer(transport: transport(), produced: rtp, mid: rtp.mid ?? "0")
        #expect(sdp.contains("a=rtpmap:111 opus/48000/2"))
        #expect(sdp.contains("a=fmtp:111 useinbandfec=1"))
    }
}
