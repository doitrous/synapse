import { API_MODE, apiDelete, apiFetchBlob, apiPost, apiPublicUrl, apiUploadChunk } from './api'
import { mediaUrl, type ManagedMediaType, type MediaRecord } from '@/data/mediaLibrary'

/**
 * Put a file on the server and prove it came back.
 *
 * The proving is the point. The old path wrote to IndexedDB and reported
 * success, which was true and useless: the write had happened somewhere only
 * that browser could read. Nothing here reports success until the bytes have
 * made the round trip and decoded on the way back.
 */

export interface UploadedMedia {
  /** Server-authoritative id; readable immediately when completion returns. */
  id: string
  /** Everything measured or verified from the stored file. */
  measured: Pick<MediaRecord, 'storageKey' | 'sha256' | 'mimeType' | 'sizeBytes' | 'mediaType' | 'width' | 'height' | 'durationSeconds'>
  /** True when these exact bytes already had a managed asset record. */
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

/** Upload teaching media in bounded chunks, up to the server's configured limit. */
export async function uploadMedia(file: File, onProgress?: (fraction: number) => void): Promise<UploadedMedia> {
  if (!API_MODE) throw new Error('Uploading media needs the live backend. Set VITE_API_BASE to connect it.')
  const session = await apiPost<{ id: string; uploadId: string; chunkMaxBytes: number; maxBytes: number }>('/media/uploads', {
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
  })
  if (file.size > session.maxBytes) throw new Error(`That file exceeds the ${Math.round(session.maxBytes / (1024 ** 2))} MB media limit.`)
  const totalChunks = Math.ceil(file.size / session.chunkMaxBytes)
  let completed: CompletedUpload | null = null
  try {
    for (let index = 0; index < totalChunks; index += 1) {
      const start = index * session.chunkMaxBytes
      const end = Math.min(file.size, start + session.chunkMaxBytes)
      let lastError: unknown
      for (let attempt = 0; attempt < 3; attempt += 1) {
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
    completed = await apiPost<CompletedUpload>(
      `/media/uploads/${encodeURIComponent(session.id)}/${encodeURIComponent(session.uploadId)}/complete`,
      { totalChunks, sizeBytes: file.size },
    )
    const playback = await browserMetadata(completed.id, completed.mediaType, completed.mimeType)
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
  } catch (error) {
    if (completed && !completed.alreadyStored) {
      await apiDelete(`/media/${encodeURIComponent(completed.id)}`).catch(() => undefined)
    } else if (!completed) {
      await apiDelete(`/media/uploads/${encodeURIComponent(session.id)}/${encodeURIComponent(session.uploadId)}`).catch(() => undefined)
    }
    throw error
  }
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
