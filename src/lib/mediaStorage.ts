const DATABASE_NAME = 'osler-media-v1'
const STORE_NAME = 'attachments'
const DATABASE_VERSION = 1
const MEDIA_REFERENCE_PREFIX = 'osler-media:'

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
