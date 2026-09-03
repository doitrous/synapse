import { useCallback, useEffect, useState } from 'react'
import { ApiError, apiDelete, apiFetchFile, apiPost } from './api'
import { useIdentity } from './useIdentity'

/** Where the server serves a stored avatar. Client-relative, like `mediaUrl` in data/mediaLibrary.ts. */
function avatarPath(id: string): string {
  return `/me/avatar/${encodeURIComponent(id)}`
}

/**
 * Whether these bytes actually begin like an image.
 *
 * Same check `PlacedImage` (components/ui/PlacedMedia.tsx, the equivalent
 * for teaching media) makes before trusting a fetched blob: anything
 * answering 200 that is not really a picture — a sign-in redirect, an SPA
 * fallback page — would otherwise render as a silently broken `<img>`.
 */
function looksLikeImage(bytes: ArrayBuffer): boolean {
  const head = new Uint8Array(bytes.slice(0, 12))
  if (head.length < 12) return false
  const starts = (...signature: number[]) => signature.every((byte, index) => head[index] === byte)
  const ascii = (offset: number, text: string) =>
    [...text].every((character, index) => head[offset + index] === character.charCodeAt(0))
  return (
    starts(0x89, 0x50, 0x4e, 0x47) // PNG
    || starts(0xff, 0xd8, 0xff) // JPEG
    || ascii(0, 'GIF8')
    || (ascii(0, 'RIFF') && ascii(8, 'WEBP'))
  )
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error('That file could not be read.'))
    reader.readAsDataURL(file)
  })
}

/** A message worth showing, rather than a generic network complaint. */
function messageFor(reason: unknown, fallback: string): string {
  return reason instanceof ApiError && reason.message ? reason.message : fallback
}

/**
 * The signed-in student's own avatar: fetched with the session's credentials
 * (an `<img src>` cannot carry a bearer token) as an object URL, plus the
 * three actions — upload, import from a social provider's photo, remove —
 * that change it. `identity.reload()` is what makes a change visible: the
 * roster row is the one source of truth, and this hook never invents state
 * the server has not confirmed.
 */
export function useAvatar() {
  const identity = useIdentity()
  const mediaId = identity.profile.avatarMediaId ?? null
  const [src, setSrc] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    let objectUrl = ''
    setSrc('')
    if (!mediaId) return undefined
    apiFetchFile(avatarPath(mediaId))
      .then((bytes) => {
        if (!active || !looksLikeImage(bytes)) return
        objectUrl = URL.createObjectURL(new Blob([bytes]))
        setSrc(objectUrl)
      })
      .catch(() => { /* Missing or unreadable avatar: fall back to the glyph silently. */ })
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [mediaId])

  const upload = useCallback(async (file: File) => {
    setError('')
    setBusy(true)
    try {
      const image = await readAsDataUrl(file)
      await apiPost('/me/avatar', { image })
      identity.reload()
    } catch (reason) {
      setError(messageFor(reason, 'That photo could not be saved. Try a smaller image.'))
      throw reason
    } finally {
      setBusy(false)
    }
  }, [identity])

  const importFromUrl = useCallback(async (url: string) => {
    setError('')
    setBusy(true)
    try {
      await apiPost('/me/avatar/import', { url })
      identity.reload()
    } catch (reason) {
      setError(messageFor(reason, 'That photo could not be imported.'))
      throw reason
    } finally {
      setBusy(false)
    }
  }, [identity])

  const remove = useCallback(async () => {
    setError('')
    setBusy(true)
    try {
      await apiDelete('/me/avatar')
      identity.reload()
    } catch (reason) {
      setError(messageFor(reason, 'That could not be removed.'))
      throw reason
    } finally {
      setBusy(false)
    }
  }, [identity])

  return { src, hasPhoto: Boolean(mediaId), busy, error, upload, importFromUrl, remove }
}
