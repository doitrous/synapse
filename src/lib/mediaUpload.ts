import { API_MODE, apiFetchFile, apiSend } from './api'
import { mediaUrl, type MediaRecord } from '@/data/mediaLibrary'

/**
 * Put a file on the server and prove it came back.
 *
 * The proving is the point. The old path wrote to IndexedDB and reported
 * success, which was true and useless: the write had happened somewhere only
 * that browser could read. Nothing here reports success until the bytes have
 * made the round trip and decoded on the way back.
 */

export interface UploadedMedia {
  /** Everything the server measured from the file itself. */
  measured: Pick<MediaRecord, 'storageKey' | 'sha256' | 'mimeType' | 'sizeBytes' | 'width' | 'height'>
  /** True when these exact bytes were already stored under another record. */
  alreadyStored: boolean
}

export async function uploadMedia(file: File): Promise<UploadedMedia> {
  if (!API_MODE) throw new Error('Uploading media needs the live backend. Set VITE_API_BASE to connect it.')
  const response = await apiSend<{
    storageKey: string
    sha256: string
    mimeType: string
    sizeBytes: number
    width: number
    height: number
    alreadyStored: boolean
  }>('/media', 'POST', file)
  const { alreadyStored, ...measured } = response
  return { measured, alreadyStored }
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
  const bytes = await apiFetchFile(mediaUrl(id))
  const bitmap = await createImageBitmap(new Blob([bytes]))
  try {
    if (!bitmap.width || !bitmap.height) throw new Error('The stored file came back, but did not decode as an image.')
    return { width: bitmap.width, height: bitmap.height }
  } finally {
    bitmap.close()
  }
}
