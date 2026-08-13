const DATABASE_NAME = 'synapse-media-v1'
const STORE_NAME = 'attachments'
const DATABASE_VERSION = 1
const MEDIA_REFERENCE_PREFIX = 'synapse-media:'

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)
    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(STORE_NAME)) database.createObjectStore(STORE_NAME)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('Could not open media storage.'))
  })
}

function transactionComplete(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error ?? new Error('Media storage transaction failed.'))
    transaction.onabort = () => reject(transaction.error ?? new Error('Media storage transaction was cancelled.'))
  })
}

export function mediaReference(id: string) {
  return `${MEDIA_REFERENCE_PREFIX}${id}`
}

export function isStoredMediaReference(value: string) {
  return value.startsWith(MEDIA_REFERENCE_PREFIX)
}

function referenceId(reference: string) {
  return reference.slice(MEDIA_REFERENCE_PREFIX.length)
}

export async function storeMediaFile(id: string, file: File) {
  const database = await openDatabase()
  const transaction = database.transaction(STORE_NAME, 'readwrite')
  transaction.objectStore(STORE_NAME).put(file, id)
  await transactionComplete(transaction)
  database.close()
  return mediaReference(id)
}

export async function resolveMediaSource(reference: string): Promise<{ url: string; revoke: boolean }> {
  if (!isStoredMediaReference(reference)) return { url: reference, revoke: false }

  const database = await openDatabase()
  const transaction = database.transaction(STORE_NAME, 'readonly')
  const request = transaction.objectStore(STORE_NAME).get(referenceId(reference))
  const blob = await new Promise<Blob | undefined>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as Blob | undefined)
    request.onerror = () => reject(request.error ?? new Error('Could not read the media attachment.'))
  })
  database.close()
  if (!blob) throw new Error('The uploaded media file is no longer available in this browser.')
  return { url: URL.createObjectURL(blob), revoke: true }
}

export async function removeStoredMedia(reference: string) {
  if (!isStoredMediaReference(reference)) return
  const database = await openDatabase()
  const transaction = database.transaction(STORE_NAME, 'readwrite')
  transaction.objectStore(STORE_NAME).delete(referenceId(reference))
  await transactionComplete(transaction)
  database.close()
}

/**
 * A pasted screenshot, small enough to live inside a document.
 *
 * An image embedded as a data URL is carried by every subsequent save of the
 * document that holds it. A raw phone screenshot is several megabytes, which
 * either exceeds the request limit — and then the document silently stops
 * saving — or makes every later keystroke re-upload it. Capping the longest
 * edge and stepping the quality down keeps a paste useful and bounded.
 */
const MAX_EDGE_PX = 1600
const MAX_DATA_URL_BYTES = 512 * 1024
const QUALITY_STEPS = [0.82, 0.7, 0.6, 0.5, 0.4]

export async function imageFileToBoundedDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  try {
    const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d')
    if (!context) throw new Error('This browser could not process the pasted image.')
    // A white ground, because a transparent PNG flattened to JPEG turns black.
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)

    for (const quality of QUALITY_STEPS) {
      const dataUrl = canvas.toDataURL('image/jpeg', quality)
      if (dataUrl.length <= MAX_DATA_URL_BYTES) return dataUrl
    }
    throw new Error('That image is too detailed to attach. Crop it, or save it as a resource instead.')
  } finally {
    bitmap.close()
  }
}
