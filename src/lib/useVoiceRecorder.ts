import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Record and replay the student's own voice while studying.
 *
 * A card is a prompt to say something out loud; recording yourself and playing
 * it back is how you check you actually knew it. The browser's `MediaRecorder`
 * and microphone are both optional and permission-gated, so every failure has a
 * named state the UI can explain — an unsupported browser, a denied microphone —
 * rather than a silent dead button. The recording lives only in memory for the
 * session and is revoked when it is replaced or the component unmounts; nothing
 * is uploaded.
 */

export type RecorderState = 'idle' | 'unsupported' | 'denied' | 'error' | 'requesting' | 'recording' | 'recorded'

export interface VoiceRecorder {
  state: RecorderState
  hasRecording: boolean
  start: () => void
  stop: () => void
  play: () => void
  reset: () => void
}

function isSupported(): boolean {
  return typeof navigator !== 'undefined'
    && !!navigator.mediaDevices?.getUserMedia
    && typeof window !== 'undefined'
    && 'MediaRecorder' in window
}

export function useVoiceRecorder(): VoiceRecorder {
  const [state, setState] = useState<RecorderState>('idle')
  const [url, setUrl] = useState<string | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const clearUrl = useCallback(() => {
    setUrl((current) => { if (current) URL.revokeObjectURL(current); return null })
  }, [])

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  const start = useCallback(() => {
    if (!isSupported()) { setState('unsupported'); return }
    clearUrl()
    setState('requesting')
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunksRef.current.push(event.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        setUrl(URL.createObjectURL(blob))
        setState('recorded')
        stopStream()
      }
      recorder.onerror = () => { setState('error'); stopStream() }
      recorderRef.current = recorder
      recorder.start()
      setState('recording')
    }).catch((err: unknown) => {
      // A denied permission and a missing device both surface here.
      const name = (err as { name?: string })?.name
      setState(name === 'NotAllowedError' || name === 'SecurityError' ? 'denied' : 'error')
      stopStream()
    })
  }, [clearUrl, stopStream])

  const stop = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop()
  }, [])

  const play = useCallback(() => {
    if (!url) return
    void new Audio(url).play().catch(() => undefined)
  }, [url])

  const reset = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop()
    stopStream()
    clearUrl()
    setState((s) => (s === 'unsupported' ? s : 'idle'))
  }, [stopStream, clearUrl])

  useEffect(() => () => { stopStream(); if (url) URL.revokeObjectURL(url) }, [stopStream, url])

  return { state, hasRecording: !!url, start, stop, play, reset }
}
