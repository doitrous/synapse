import { useEffect, useState } from 'react'
import { ExternalLink, ImageIcon, Minus, Plus, RotateCcw, Trash2, X } from 'lucide-react'
import { Badge } from './Badge'
import { Button } from './Button'
import { Icon } from './Icon'
import { IconButton } from './IconButton'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { overlayPortal } from '@/lib/overlayPortal'

export interface MediaAsset {
  id: string
  type: 'image' | 'audio' | 'video'
  name: string
  url: string
  mimeType?: string
  size?: number
}

function formatSize(size?: number) {
  if (!size) return null
  if (size >= 1_000_000) return `${(size / 1_000_000).toFixed(1)} MB`
  return `${Math.max(1, Math.round(size / 1_000))} KB`
}

function playbackError(type: 'audio' | 'video') {
  return type === 'audio'
    ? 'This audio could not be played. Use an MP3, M4A/AAC, or WAV file, or enter a direct audio-file URL.'
    : 'This video could not be played. Use an MP4 file or enter a direct video-file URL.'
}

export function ZoomableImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === '+' || event.key === '=') setZoom((value) => Math.min(4, value + 0.25))
      if (event.key === '-') setZoom((value) => Math.max(0.5, value - 0.25))
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function close() {
    setOpen(false)
    setZoom(1)
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group relative block w-full overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]" aria-label={`Open ${alt} image viewer`}>
        <img src={src} alt={alt} className={className} />
        <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-ink/75 px-2 py-1 text-[10.5px] font-semibold text-white opacity-0 shadow-panel backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Icon icon={ImageIcon} size={12} />Open &amp; zoom</span>
      </button>
      {open && overlayPortal(
        <div className="fixed inset-0 z-[90] flex flex-col bg-ink/90 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${alt} image viewer`} onMouseDown={close}>
          <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-white/10 px-3 py-2.5 text-white sm:px-5" onMouseDown={(event) => event.stopPropagation()}>
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold">{alt}</span>
            <IconButton icon={Minus} label="Zoom out" className="border-white/15 text-white hover:bg-white/10 hover:text-white" onClick={() => setZoom((value) => Math.max(0.5, value - 0.25))} />
            <button type="button" onClick={() => setZoom(1)} className="tnum min-h-11 min-w-16 rounded-lg border border-white/15 px-2 font-mono text-[12px] text-white hover:bg-white/10" aria-label="Reset zoom">{Math.round(zoom * 100)}%</button>
            <IconButton icon={Plus} label="Zoom in" className="border-white/15 text-white hover:bg-white/10 hover:text-white" onClick={() => setZoom((value) => Math.min(4, value + 0.25))} />
            <IconButton icon={RotateCcw} label="Reset zoom" className="border-white/15 text-white hover:bg-white/10 hover:text-white" onClick={() => setZoom(1)} />
            <IconButton icon={X} label="Close image viewer" className="border-white/15 text-white hover:bg-white/10 hover:text-white" onClick={close} />
          </div>
          <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-4 sm:p-8" onMouseDown={(event) => event.stopPropagation()} onWheel={(event) => { if (event.ctrlKey || event.metaKey) { event.preventDefault(); setZoom((value) => Math.max(0.5, Math.min(4, value + (event.deltaY < 0 ? 0.25 : -0.25)))) } }}>
            <div className="grid min-h-full place-items-center">
              <img src={src} alt={alt} className="h-auto max-w-none rounded-lg shadow-float transition-[width] duration-150 ease-[var(--ease-out-quint)]" style={{ width: `${zoom * 100}%` }} onDoubleClick={() => setZoom((value) => value === 1 ? 2 : 1)} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function MediaAttachmentView({ attachment, onRemove }: { attachment: MediaAsset; onRemove?: () => void }) {
  const [source, setSource] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    let resolvedUrl = ''
    let revoke = false
    setLoading(true)
    setError('')
    resolveMediaSource(attachment.url)
      .then((resolved) => {
        if (!active) {
          if (resolved.revoke) URL.revokeObjectURL(resolved.url)
          return
        }
        resolvedUrl = resolved.url
        revoke = resolved.revoke
        setSource(resolved.url)
        setLoading(false)
      })
      .catch((reason: unknown) => {
        if (!active) return
        setLoading(false)
        setError(reason instanceof Error ? reason.message : 'The media attachment could not be loaded.')
      })
    return () => {
      active = false
      if (revoke && resolvedUrl) URL.revokeObjectURL(resolvedUrl)
    }
  }, [attachment.url])

  const size = formatSize(attachment.size)
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-surface-2/60">
      <div className="flex min-w-0 items-center gap-2 border-b border-line px-3 py-2">
        <Badge tone="outline">{attachment.type}</Badge>
        <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium text-ink-2">{attachment.name}</span>
        {size && <span className="shrink-0 font-mono text-[10px] text-ink-3">{size}</span>}
        {onRemove && <IconButton icon={Trash2} label={`Remove ${attachment.name}`} size="sm" className="text-ink-3 hover:text-danger" onClick={onRemove} />}
      </div>
      <div className="p-2.5">
        {loading && <p role="status" className="py-4 text-center text-[12px] text-ink-3">Loading media…</p>}
        {!loading && error && <div role="alert" className="rounded-lg border border-danger/25 bg-danger-tint p-3 text-[12px] leading-relaxed text-danger">{error}</div>}
        {!loading && !error && attachment.type === 'image' && <ZoomableImage src={source} alt={attachment.name} className="max-h-80 w-full rounded-lg object-contain" />}
        {!loading && !error && attachment.type === 'audio' && (
          <audio className="block w-full" controls preload="metadata" onCanPlay={() => setError('')} onError={() => setError(playbackError('audio'))}>
            <source src={source} type={attachment.mimeType} />
            Your browser does not support this audio.
          </audio>
        )}
        {!loading && !error && attachment.type === 'video' && (
          <video className="max-h-96 w-full rounded-lg bg-ink" controls playsInline preload="metadata" onCanPlay={() => setError('')} onError={() => setError(playbackError('video'))}>
            <source src={source} type={attachment.mimeType} />
            Your browser does not support this video.
          </video>
        )}
        {!loading && source && !source.startsWith('blob:') && !source.startsWith('data:') && (
          <Button type="button" variant="ghost" size="sm" className="mt-2" iconLeft={ExternalLink} onClick={() => window.open(source, '_blank', 'noopener,noreferrer')}>Open original media</Button>
        )}
      </div>
    </section>
  )
}
