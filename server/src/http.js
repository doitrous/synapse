/**
 * The small pieces every route module needs: the async-handler wrapper, the
 * rate-limit key, and the storage/state constants that more than one group
 * reads. Deliberately tiny — anything with real logic belongs in the module
 * that owns it, not here.
 */
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ApiError } from './apiError.js'
import { clientIp } from './rateLimit.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const LAUNCH_DATA_PATH = join(__dirname, '..', 'data', 'medical-library-v1.json')
export const RESOURCE_STORAGE_DIR = resolve(process.env.RESOURCE_STORAGE_DIR || '/data/medical-library')
export const RESOURCE_MAX_BYTES = Number(process.env.RESOURCE_MAX_BYTES) || 250 * 1024 * 1024
/** Managed teaching media shares the resource volume. Small legacy uploads keep
 * a single-request ceiling; the normal path uses bounded chunks up to 2 GB. */
export const MEDIA_STORAGE_DIR = RESOURCE_STORAGE_DIR
export const MEDIA_MAX_BYTES = Number(process.env.MEDIA_MAX_BYTES) || 100 * 1024 * 1024
// Per-type ceilings, enforced after the bytes are sniffed so the limit follows
// what the file actually is, not what it was named: images 100 MB, audio 500 MB,
// video 5 GB.
export const MEDIA_IMAGE_MAX_BYTES = Number(process.env.MEDIA_IMAGE_MAX_BYTES) || 100 * 1024 * 1024
export const MEDIA_AUDIO_MAX_BYTES = Number(process.env.MEDIA_AUDIO_MAX_BYTES) || 500 * 1024 * 1024
export const MEDIA_VIDEO_MAX_BYTES = Number(process.env.MEDIA_VIDEO_MAX_BYTES) || 5 * 1024 * 1024 * 1024
export const MEDIA_TYPE_MAX_BYTES = { image: MEDIA_IMAGE_MAX_BYTES, audio: MEDIA_AUDIO_MAX_BYTES, video: MEDIA_VIDEO_MAX_BYTES }
export const MEDIA_CHUNK_MAX_BYTES = Number(process.env.MEDIA_CHUNK_MAX_BYTES) || 8 * 1024 * 1024
// The session ceiling is the largest any single type allows (video), so a large
// video can begin; the per-type cap above is what actually bounds it once known.
export const MEDIA_CHUNKED_MAX_BYTES = Number(process.env.MEDIA_CHUNKED_MAX_BYTES) || MEDIA_VIDEO_MAX_BYTES
export const MEDIA_UPLOAD_MAX_AGE_HOURS = Math.max(1, Number(process.env.MEDIA_UPLOAD_MAX_AGE_HOURS) || 24)
export const RESOURCE_CHUNK_MAX_BYTES = Number(process.env.RESOURCE_CHUNK_MAX_BYTES) || 64 * 1024 * 1024
export const RESOURCE_CHUNKED_MAX_BYTES = Number(process.env.RESOURCE_CHUNKED_MAX_BYTES) || 2 * 1024 * 1024 * 1024
export const CONTENT_LEDGER_STATE_KEY = 'nishany-admin-content-ledger-v4'
export const ACADEMIC_CATALOGUE_STATE_KEY = 'nishany-academic-universities-v1'
export const MEDICAL_EVIDENCE_STATE_KEY = 'nishany-medical-evidence-v1'

// Where unsubscribe links point. The student origin, not the admin one — the
// reader of a campaign is a student, and the link has to work signed out.
export const PUBLIC_ORIGIN = (process.env.PUBLIC_ORIGIN || 'https://nishany.com').replace(/\/$/, '')

/** Logged server-side only — a stack trace is not something to hand a caller. */
export function logServerError(route, error) {
  console.error(`[error] ${route}`, error?.stack || error)
}

export const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((error) => {
  if (error instanceof ApiError) return res.status(error.status).json({ error: error.code, message: error.publicMessage })
  logServerError(req.originalUrl, error)
  res.status(500).json({ error: 'internal' })
})

/** Per-signed-in-caller rate-limit key. These routes all sit behind requireAuthenticated. */
export const byUser = (req) => req.identity?.id || clientIp(req)
