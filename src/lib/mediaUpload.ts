import { API_MODE, apiDelete, apiFetchBlob, apiPost, apiPublicUrl, apiUploadChunk } from './api'
import { mediaUrl, type ManagedMediaType, type MediaRecord } from '@/data/mediaLibrary'

/**
 * Put a file on the server and prove it came back.
 *
 * The proving is the point. The old path wrote to IndexedDB and reported
 * success, which was true and useless: the write had happened somewhere only
 * that browser could read. Nothing here reports success until the bytes have
 * made the round trip and decoded on the way back — and, since the media
 * pipeline (see `mediaPipeline.js`) now runs its own processing/verification
 * pass before answering, nothing here reports success before the *server*
 * says the upload is genuinely `ready`, either.
 */

export interface UploadedMedia {
  /** Server-authoritative id; readable immediately when completion returns. */
  id: string
  /** Everything measured or verified from the stored file. */
  measured: Pick<MediaRecord, 'storageKey' | 'sha256' | 'mimeType' | 'sizeBytes' | 'mediaType' | 'width' | 'height' | 'durationSeconds'>
  /** True when these exact bytes were already present in content-addressed storage. */
  alreadyStored: boolean
}

interface CompletedUpload {
  id: string
  storageKey: string
  sha256: string
  mimeType: string
  mediaType: ManagedMediaType
  sizeBytes: number
  width: number
  height: number
  alreadyStored: boolean
  /**
   * The pipeline's truthful terminal state, once processing and verification
   * finish — the `/complete` request now spans that work rather than
   * returning the instant chunks are assembled. Optional so this client keeps
   * working against a server that has not rolled the pipeline out yet; such a
   * response is read as `'ready'` (see the `!== 'failed'` checks below).
   */
  status?: 'ready' | 'failed'
  /** Set when `status` is `'failed'` — what the server's own check found wrong. */
  failureReason?: string
}

/** Thrown when the server finished its check and truthfully reports the upload did not become usable media. */
export class MediaUploadFailedError extends Error {
  failureReason?: string
  constructor(message: string, failureReason?: string) {
    super(message)
    this.name = 'MediaUploadFailedError'
    this.failureReason = failureReason
  }
}

/** Thrown when a caller cancels an upload already in flight. Never a fault, and never auto-retried. */
export class MediaUploadCanceledError extends Error {
  constructor() {
    super('The upload was canceled.')
    this.name = 'MediaUploadCanceledError'
  }
}

/**
 * The ceiling this client enforces before a session is even opened, per
 * medium. The server holds the real limit (and may be stricter still, via the
 * upload session's own `maxBytes`) — this exists so a reviewer picking an
 * obviously oversized file finds out before spending a minute uploading it.
 */
export const MEDIA_TYPE_MAX_BYTES: Record<ManagedMediaType, number> = {
  image: 100 * 1024 * 1024,
  audio: 500 * 1024 * 1024,
  video: 5 * 1024 * 1024 * 1024,
}

function managedId(reference: string): string | null {
  const match = /^\/media\/([^/?#]+)$/.exec(reference)
  return match ? decodeURIComponent(match[1]) : null
}

/** A signed streaming URL for native audio/video Range requests. */
export async function mediaPlaybackSource(reference: string): Promise<string> {
  const id = managedId(reference)
  if (!id) return reference
  const response = await apiPost<{ url: string }>(`/media/${encodeURIComponent(id)}/playback`)
  return apiPublicUrl(response.url)
}

/**
 * Fetch the stored file back and confirm it actually renders in this browser.
 *
 * Kept even though the server pipeline now runs its own verification pass:
 * for audio/video without a transcoder available, the server is honest that
 * it can confirm *storage* but not *playback* (see `mediaPipeline.js`). This
 * is the one check that can still tell a reviewer whether the clip plays —
 * the "playback/render verification" step of the reviewer workflow.
 */
async function browserMetadata(id: string, kind: ManagedMediaType, mimeType: string) {
  if (kind === 'image') {
    const blob = await apiFetchBlob(mediaUrl(id))
    const bitmap = await createImageBitmap(blob)
    try {
      if (!bitmap.width || !bitmap.height) throw new Error('The stored image did not decode.')
      return { width: bitmap.width, height: bitmap.height, durationSeconds: undefined }
    } finally {
      bitmap.close()
    }
  }

  const source = await mediaPlaybackSource(mediaUrl(id))
  return new Promise<{ width: number; height: number; durationSeconds?: number }>((resolve, reject) => {
    const element = document.createElement(kind === 'video' ? 'video' : 'audio')
    const timeout = window.setTimeout(() => {
      element.removeAttribute('src')
      reject(new Error(`The stored ${kind} did not become playable in time.`))
    }, 20_000)
    const finish = () => {
      window.clearTimeout(timeout)
      const video = element instanceof HTMLVideoElement ? element : null
      const durationSeconds = Number.isFinite(element.duration) ? element.duration : undefined
      element.removeAttribute('src')
      resolve({ width: video?.videoWidth ?? 0, height: video?.videoHeight ?? 0, durationSeconds })
    }
    element.preload = 'metadata'
    element.onloadedmetadata = finish
    element.onerror = () => {
      window.clearTimeout(timeout)
      reject(new Error(`The stored ${kind} could not be played as ${mimeType}.`))
    }
    element.src = source
  })
}

interface UploadSessionRef { id: string; uploadId: string }
interface CancelToken { canceled: boolean }

/** Send every chunk, retrying each one a few times before giving up on it. */
async function uploadChunks(
  file: File,
  session: UploadSessionRef & { chunkMaxBytes: number },
  cancel: CancelToken,
  onProgress?: (fraction: number) => void,
): Promise<void> {
  const totalChunks = Math.ceil(file.size / session.chunkMaxBytes)
  for (let index = 0; index < totalChunks; index += 1) {
    if (cancel.canceled) throw new MediaUploadCanceledError()
    const start = index * session.chunkMaxBytes
    const end = Math.min(file.size, start + session.chunkMaxBytes)
    let lastError: unknown
    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (cancel.canceled) throw new MediaUploadCanceledError()
      try {
        await apiUploadChunk(
          `/media/uploads/${encodeURIComponent(session.id)}/${encodeURIComponent(session.uploadId)}/chunks/${index}`,
          file.slice(start, end),
        )
        lastError = undefined
        break
      } catch (reason) {
        lastError = reason
        if (attempt < 2) await new Promise((resolve) => window.setTimeout(resolve, 250 * (attempt + 1)))
      }
    }
    if (lastError) throw lastError
    onProgress?.(end / file.size)
  }
}

/** Ask the server to assemble, process and verify what was just uploaded. */
async function completeUpload(session: UploadSessionRef, file: File, totalChunks: number): Promise<CompletedUpload> {
  let completionError: unknown
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await apiPost<CompletedUpload>(
        `/media/uploads/${encodeURIComponent(session.id)}/${encodeURIComponent(session.uploadId)}/complete`,
        { totalChunks, sizeBytes: file.size },
      )
    } catch (reason) {
      completionError = reason
      if (attempt < 2) await new Promise((resolve) => window.setTimeout(resolve, 350 * (attempt + 1)))
    }
  }
  throw completionError
}

/** Clean up whatever was left behind by an upload that will not be used. Best-effort. */
async function discard(session: UploadSessionRef | null, completed: CompletedUpload | null): Promise<void> {
  if (completed) {
    await apiDelete(`/media/${encodeURIComponent(completed.id)}`).catch(() => undefined)
  } else if (session) {
    await apiDelete(`/media/uploads/${encodeURIComponent(session.id)}/${encodeURIComponent(session.uploadId)}`).catch(() => undefined)
  }
}

function toUploadedMedia(completed: CompletedUpload, playback: { width: number; height: number; durationSeconds?: number }): UploadedMedia {
  return {
    id: completed.id,
    measured: {
      storageKey: completed.storageKey,
      sha256: completed.sha256,
      mimeType: completed.mimeType,
      mediaType: completed.mediaType,
      sizeBytes: completed.sizeBytes,
      width: playback.width || completed.width || 0,
      height: playback.height || completed.height || 0,
      ...(playback.durationSeconds == null ? {} : { durationSeconds: playback.durationSeconds }),
    },
    alreadyStored: completed.alreadyStored,
  }
}

/**
 * Upload teaching media in bounded chunks, up to the server's configured limit.
 *
 * Unchanged signature and behaviour for every existing caller (the media
 * picker, the stranded-image recovery notice, the histology editor): still
 * either resolves with a genuinely stored, decoded file, or throws. The only
 * change is honesty — a server that now reports `status: 'failed'` after its
 * own verification pass is no longer read as success.
 */
export async function uploadMedia(file: File, onProgress?: (fraction: number) => void): Promise<UploadedMedia> {
  if (!API_MODE) throw new Error('Uploading media needs the live backend. Set VITE_API_BASE to connect it.')
  const session = await apiPost<{ id: string; uploadId: string; chunkMaxBytes: number; maxBytes: number }>('/media/uploads', {
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
  })
  if (file.size > session.maxBytes) throw new Error(`That file exceeds the ${Math.round(session.maxBytes / (1024 ** 2))} MB media limit.`)
  const totalChunks = Math.ceil(file.size / session.chunkMaxBytes)
  const cancel: CancelToken = { canceled: false }
  let completed: CompletedUpload | null = null
  try {
    await uploadChunks(file, session, cancel, onProgress)
    completed = await completeUpload(session, file, totalChunks)
    if (completed.status === 'failed') {
      throw new MediaUploadFailedError(completed.failureReason || 'That file was stored, but could not be verified.', completed.failureReason)
    }
    const playback = await browserMetadata(completed.id, completed.mediaType, completed.mimeType)
    return toUploadedMedia(completed, playback)
  } catch (error) {
    await discard(session, completed)
    throw error
  }
}

/**
 * Every phase a durable upload can report through `startMediaUpload`'s
 * `onUpdate`.
 *
 * `uploading` covers the chunked transfer. `verifying` covers both the
 * server's own processing/verification pass — the `/complete` request itself
 * now spans that work rather than returning the instant chunks land — and
 * this client's own playback/render round trip once the server answers
 * `ready`. Terminal states are `ready`, `failed` and `canceled`; nothing here
 * ever reports `ready` before the server has said so.
 */
export interface MediaUploadState {
  phase: 'uploading' | 'verifying' | 'ready' | 'failed' | 'canceled'
  /** 0..1. Meaningful during `uploading`; treat as indeterminate during `verifying`. */
  fraction: number
  /** A sentence for this failure — set only when `phase` is `'failed'`. */
  error?: string
  /** The server's own reason, when it gave one. */
  failureReason?: string
}

/**
 * The reviewer's durable, cancellable, retryable upload.
 *
 * Distinct from `uploadMedia` (which every other admin surface still calls)
 * because Media Requests needs to *show* the state machine, not just await
 * its result: a reviewer waiting on a large video should see uploading
 * progress, then "verifying", then ready or a real failure reason — never a
 * blank screen that either finishes or silently doesn't. Call again from
 * scratch to retry; call `cancel()` to stop a still-running attempt (chunks
 * already in flight are not aborted mid-request, but nothing further is sent
 * and whatever the server holds is discarded).
 */
export function startMediaUpload(
  file: File,
  medium: ManagedMediaType,
  onUpdate: (state: MediaUploadState) => void,
): { promise: Promise<UploadedMedia>; cancel: () => void } {
  const cancel: CancelToken = { canceled: false }
  let session: UploadSessionRef | null = null
  let completed: CompletedUpload | null = null

  const promise = (async (): Promise<UploadedMedia> => {
    if (!API_MODE) {
      const message = 'Uploading media needs the live backend. Set VITE_API_BASE to connect it.'
      onUpdate({ phase: 'failed', fraction: 0, error: message })
      throw new Error(message)
    }
    const cap = MEDIA_TYPE_MAX_BYTES[medium]
    if (file.size > cap) {
      const message = `That file exceeds the ${Math.round(cap / (1024 ** 2))} MB ${medium} limit.`
      onUpdate({ phase: 'failed', fraction: 0, error: message })
      throw new Error(message)
    }
    try {
      onUpdate({ phase: 'uploading', fraction: 0 })
      const created = await apiPost<{ id: string; uploadId: string; chunkMaxBytes: number; maxBytes: number }>('/media/uploads', {
        fileName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
      })
      session = { id: created.id, uploadId: created.uploadId }
      const effectiveCap = Math.min(cap, created.maxBytes)
      if (file.size > effectiveCap) throw new Error(`That file exceeds the ${Math.round(effectiveCap / (1024 ** 2))} MB ${medium} limit.`)

      const totalChunks = Math.ceil(file.size / created.chunkMaxBytes)
      await uploadChunks(
        file,
        { id: created.id, uploadId: created.uploadId, chunkMaxBytes: created.chunkMaxBytes },
        cancel,
        (fraction) => onUpdate({ phase: 'uploading', fraction }),
      )
      if (cancel.canceled) throw new MediaUploadCanceledError()

      onUpdate({ phase: 'verifying', fraction: 1 })
      completed = await completeUpload(session, file, totalChunks)
      if (cancel.canceled) throw new MediaUploadCanceledError()

      if (completed.status === 'failed') {
        const message = completed.failureReason || `That ${medium} was stored, but could not be verified — it was not attached.`
        onUpdate({ phase: 'failed', fraction: 1, error: message, failureReason: completed.failureReason })
        throw new MediaUploadFailedError(message, completed.failureReason)
      }
      if (completed.mediaType !== medium) {
        const message = `That file contains ${completed.mediaType}, but this request needs ${medium}.`
        onUpdate({ phase: 'failed', fraction: 1, error: message })
        throw new MediaUploadFailedError(message)
      }

      const playback = await browserMetadata(completed.id, completed.mediaType, completed.mimeType)
      if (cancel.canceled) throw new MediaUploadCanceledError()
      const result = toUploadedMedia(completed, playback)
      onUpdate({ phase: 'ready', fraction: 1 })
      return result
    } catch (error) {
      if (error instanceof MediaUploadCanceledError) {
        onUpdate({ phase: 'canceled', fraction: 0 })
      } else if (!(error instanceof MediaUploadFailedError)) {
        const message = error instanceof Error ? error.message : 'That upload could not be completed.'
        onUpdate({ phase: 'failed', fraction: completed ? 1 : 0, error: message })
      }
      await discard(session, completed)
      throw error
    }
  })()

  return { promise, cancel: () => { cancel.canceled = true } }
}

/**
 * Fetch a stored image back and decode it.
 *
 * Deliberately not the blob still in hand: what has to be proved is that the
 * *server* has it and will hand it to somebody else. A decode that yields real
 * dimensions is the difference between "the request succeeded" and "there is a
 * picture there".
 */
export async function verifyRenders(id: string): Promise<{ width: number; height: number }> {
  const blob = await apiFetchBlob(mediaUrl(id))
  const bitmap = await createImageBitmap(blob)
  try {
    if (!bitmap.width || !bitmap.height) throw new Error('The stored file came back, but did not decode as an image.')
    return { width: bitmap.width, height: bitmap.height }
  } finally {
    bitmap.close()
  }
}
