import { useEffect, useState } from 'react'
import { Check, Copy, Eye, Link2, Lock, PencilLine, RefreshCw, Share2, Trash2 } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { API_MODE } from '@/lib/api'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { useRoomSession } from '@/lib/rooms/RoomSessionProvider'
import {
  createShare, deleteShare, fetchShare, shareUrl, updateShare, useShareIndex,
  type ShareAccess, type ShareKind,
} from '@/lib/useShares'

/**
 * Publishing one note or one board behind a link.
 *
 * Three choices, and they are the three a student actually makes: keep it to
 * myself, let people read it, let people work on it with me. Each is the
 * server's rule rather than a hint — a link left on `private` answers 404 to
 * everybody but its owner, so revoking works even after the link has been
 * passed around.
 *
 * Publishing again from here replaces the contents of the same link rather than
 * minting a second one, because a link that has been shared and then silently
 * stopped being the current version is worse than no link at all.
 */

const CHOICES: Array<{ value: ShareAccess; label: string; detail: string; icon: typeof Lock }> = [
  { value: 'private', label: 'Only me', detail: 'The link stops working for everybody else.', icon: Lock },
  { value: 'view', label: 'Classmates with the link can read', detail: 'They sign in with an account in your university and year.', icon: Eye },
  { value: 'edit', label: 'Classmates with the link can edit', detail: 'Their changes are revision-checked and recorded against them.', icon: PencilLine },
]

export function ShareDialog({
  open,
  onClose,
  handle,
  kind,
  title,
  payload,
}: {
  open: boolean
  onClose: () => void
  /** Which of the student's own documents this is — `note:<id>`, or `board`. */
  handle: string
  kind: ShareKind
  title: string
  /** A snapshot of what to publish, read fresh each time this opens. */
  payload: () => unknown
}) {
  const t = useT()
  const [index, setIndex] = useShareIndex()
  const shareId = index[handle]
  const [access, setAccess] = useState<ShareAccess>('view')
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [publishedAt, setPublishedAt] = useState<string | null>(null)
  const [revision, setRevision] = useState<number | null>(null)
  const [sentToRoom, setSentToRoom] = useState(false)
  // Null outside a live, connected room — demo rooms and no room at all both
  // leave `channel` null on the provider, so there is nothing else to check here.
  const roomChannel = useRoomSession()?.channel

  // What the link currently allows is the server's answer, not a remembered
  // one: the owner may have changed it from another device.
  useEffect(() => {
    if (!open || !shareId) return
    let live = true
    void fetchShare(shareId)
      .then((share) => { if (live) { setAccess(share.access); setPublishedAt(share.updatedAt); setRevision(share.revision) } })
      .catch(() => {
        // Deleted from elsewhere. Forget it rather than offering a dead link.
        if (live) setIndex((current) => { const next = { ...current }; delete next[handle]; return next })
      })
    return () => { live = false }
  }, [handle, open, setIndex, shareId])

  useEffect(() => { if (open) { setCopied(false); setError(''); setSentToRoom(false) } }, [open])

  async function publish(nextAccess: ShareAccess) {
    setError('')
    setBusy(true)
    try {
      if (shareId) {
        const updated = await updateShare(shareId, { title, access: nextAccess, payload: payload(), expectedRevision: revision ?? undefined })
        setPublishedAt(updated.updatedAt)
        setRevision(updated.revision)
      } else {
        const id = await createShare({ kind, title, access: nextAccess, payload: payload() })
        setIndex((current) => ({ ...current, [handle]: id }))
        setPublishedAt(new Date().toISOString())
        setRevision(1)
      }
      setAccess(nextAccess)
    } catch {
      setError(t('That could not be shared. Check your connection and try again.'))
    } finally {
      setBusy(false)
    }
  }

  async function stopSharing() {
    if (!shareId) return
    setBusy(true)
    try {
      await deleteShare(shareId)
      setIndex((current) => { const next = { ...current }; delete next[handle]; return next })
      setPublishedAt(null)
      setRevision(null)
    } catch {
      setError(t('The link could not be withdrawn. Try again.'))
    } finally {
      setBusy(false)
    }
  }

  const url = shareId ? shareUrl(shareId) : ''
  const live = Boolean(shareId) && access !== 'private'

  if (!open) return null

  return (
    <Dialog onClose={onClose} label={t('Share')}>
      <PanelHeader title={t('Share')} icon={Link2} />
      <div className="space-y-4 p-5">
        {!API_MODE ? (
          <>
            <p className="rounded-lg border border-warning/30 bg-warning-tint px-3.5 py-3 text-[12.5px] leading-relaxed text-ink-2">
              {t('Sharing needs the connected deployment: a link has to be readable by somebody else’s browser, and this preview keeps everything in yours.')}
            </p>
            <div className="flex justify-end border-t border-line pt-4">
              <Button size="sm" variant="secondary" onClick={onClose}>{t('Close')}</Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[13px] leading-relaxed text-ink-2">
              {t('This live document keeps its revision history. Classmates can read it or collaborate according to the permission you choose, and changing it back to “Only me” stops their access.')}
            </p>

            <ul className="space-y-2">
              {CHOICES.map((choice) => (
                <li key={choice.value}>
                  <button
                    type="button"
                    disabled={busy || (choice.value === 'private' && !shareId)}
                    onClick={() => void publish(choice.value)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-xl border p-3.5 text-start transition-colors disabled:cursor-not-allowed disabled:opacity-55',
                      access === choice.value && shareId ? 'border-primary bg-primary-tint/50' : 'border-line bg-surface hover:bg-inset',
                    )}
                  >
                    <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-inset text-primary-strong">
                      <Icon icon={choice.icon} size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-semibold text-ink">{t(choice.label)}</span>
                      <span className="mt-0.5 block text-[12px] leading-relaxed text-ink-2">{t(choice.detail)}</span>
                    </span>
                    {access === choice.value && shareId && <Icon icon={Check} size={16} className="mt-1 shrink-0 text-primary-strong" />}
                  </button>
                </li>
              ))}
            </ul>

            {live && (
              <div className="rounded-xl border border-line bg-surface-2/50 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Link')}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-md border border-line bg-surface px-2.5 py-2 font-mono text-[11.5px] text-ink-2">{url}</code>
                  <Button
                    size="sm"
                    iconLeft={copied ? Check : Copy}
                    onClick={() => {
                      void navigator.clipboard?.writeText(url).then(() => setCopied(true)).catch(() => setError(t('The link could not be copied. Select it and copy it by hand.')))
                    }}
                  >
                    {copied ? t('Copied') : t('Copy')}
                  </Button>
                </div>
                {publishedAt && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-ink-3">
                    <Icon icon={RefreshCw} size={12} />
                    {t('Live revision')} {revision ?? 1}
                  </p>
                )}
                {roomChannel?.connected && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2"
                    iconLeft={sentToRoom ? Check : Share2}
                    onClick={() => {
                      roomChannel.sendChat(`${title}: ${url}`)
                      setSentToRoom(true)
                    }}
                  >
                    {sentToRoom ? t('Shared to room') : t('Share to room')}
                  </Button>
                )}
              </div>
            )}

            {error && <p role="alert" className="text-[12.5px] text-danger">{error}</p>}

            <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
              {shareId && (
                <Button size="sm" iconLeft={RefreshCw} loading={busy} onClick={() => void publish(access)}>
                  {t('Publish current revision')}
                </Button>
              )}
              {shareId && (
                <Button size="sm" variant="ghost" iconLeft={Trash2} onClick={() => void stopSharing()}>
                  {t('Delete the link')}
                </Button>
              )}
              <Button size="sm" variant="secondary" className="ms-auto" onClick={onClose}>{t('Done')}</Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  )
}
