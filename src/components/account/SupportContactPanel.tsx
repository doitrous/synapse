import { useEffect, useState } from 'react'
import { LifeBuoy, Mail, Send } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonAnchor } from '@/components/ui/Button'
import { Field, TextInput, Textarea } from '@/components/ui/Field'
import { AsyncSurface } from '@/components/ui/AsyncSurface'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { API_MODE, apiGet, apiPost } from '@/lib/api'
import { useRelativeTime } from '@/lib/useRelativeTime'
import { useT } from '@/lib/i18n'

export const SUPPORT_ADDRESS = 'help@nishany.com'

interface SupportMessage {
  id: string
  subject: string | null
  message: string
  status: string
  createdAt: string
}

/**
 * Contact Us, as an inbox rather than a one-way mailto.
 *
 * The mailto link stays — some students would rather send from their own mail
 * app, and it costs nothing to keep working — but a message typed here is
 * actually stored against the account (`POST /me/support`) and the student can
 * see it was received, which the old link never confirmed either way.
 */
export function SupportContactPanel() {
  const t = useT()
  const relativeTime = useRelativeTime()
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [loading, setLoading] = useState(API_MODE)
  const [listError, setListError] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const load = async () => {
    if (!API_MODE) { setLoading(false); return }
    setLoading(true)
    setListError(false)
    try {
      const result = await apiGet<{ messages: SupportMessage[] }>('/me/support')
      setMessages(result.messages)
    } catch {
      setListError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  async function send() {
    if (!message.trim()) { setSendError(t('Write a message before sending.')); return }
    setSending(true)
    setSendError('')
    try {
      if (API_MODE) {
        await apiPost('/me/support', { subject: subject.trim() || undefined, message: message.trim() })
        await load()
      }
      setSubject('')
      setMessage('')
    } catch {
      setSendError(t('Your message could not be sent. Try again, or email us directly.'))
    } finally {
      setSending(false)
    }
  }

  const supportLink = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent('Nishany support')}`

  return (
    <Panel>
      <PanelHeader title={t('Contact us')} icon={LifeBuoy} />
      <div className="space-y-4 p-4">
        <ButtonAnchor href={supportLink} className="w-full justify-start" variant="ghost" iconLeft={Mail}>
          {SUPPORT_ADDRESS}
        </ButtonAnchor>

        <div className="grid gap-2">
          <Field label={t('Subject (optional)')} htmlFor="support-subject">
            <TextInput id="support-subject" value={subject} maxLength={160} onChange={(event) => setSubject(event.target.value)} />
          </Field>
          <Field label={t('Message')} htmlFor="support-message">
            <Textarea
              id="support-message"
              value={message}
              maxLength={4000}
              className="min-h-24"
              placeholder={t('What do you need help with?')}
              onChange={(event) => { setMessage(event.target.value); setSendError('') }}
            />
          </Field>
          {sendError && <p role="alert" className="text-[12.5px] text-danger">{sendError}</p>}
          <div className="flex justify-end">
            <Button type="button" variant="secondary" size="sm" iconLeft={Send} loading={sending} disabled={!message.trim()} onClick={() => void send()}>
              {t('Send message')}
            </Button>
          </div>
        </div>

        <div className="border-t border-line pt-3">
          <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Your messages')}</p>
          <AsyncSurface
            loading={loading}
            error={listError && (
              <EmptyState
                icon={LifeBuoy}
                title={t('Could not load your messages')}
                description={t('Check your connection and try again.')}
                action={<Button size="sm" variant="secondary" onClick={() => void load()}>{t('Retry')}</Button>}
              />
            )}
            isEmpty={!messages.length}
            empty={<p className="text-[12px] text-ink-3">{t('Nothing sent yet.')}</p>}
          >
            <ul className="space-y-2">
              {messages.map((entry) => (
                <li key={entry.id} className="rounded-lg border border-line bg-surface-2/50 px-3 py-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">{entry.subject || t('(no subject)')}</p>
                    <Badge tone={entry.status === 'closed' ? 'success' : 'warning'}>{entry.status === 'closed' ? t('Answered') : t('Open')}</Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12px] text-ink-2">{entry.message}</p>
                  <p className="mt-1 text-[11px] text-ink-3">{relativeTime(entry.createdAt)}</p>
                </li>
              ))}
            </ul>
          </AsyncSurface>
        </div>
      </div>
    </Panel>
  )
}
