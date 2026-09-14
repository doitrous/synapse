import { useId, useRef, useState, type FormEvent } from 'react'
import { CircleCheck, Mail, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput, Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Turnstile } from '@/components/forms/Turnstile'
import { API_MODE, apiPost } from '@/lib/api'
import { SUPPORT_ADDRESS, legalLabel } from './content'

/**
 * The contact form, actually sending somewhere.
 *
 * `POST /api/contact` (server/src/contact.js) now exists, so this posts to it
 * directly and shows an inline result. In demo mode there is no server to
 * receive it, so the form falls back to the previous behaviour: composing a
 * `mailto:` and handing it to the device's mail app.
 */
export function ContactForm({ lang }: { lang: 'ar' | 'en' }) {
  const id = useId()
  const label = (en: string) => legalLabel(lang, en)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const sendingRef = useRef(false)

  function openMailApp() {
    const subject = `${label('Support request')}${name.trim() ? ` — ${name.trim()}` : ''}`
    const details = [
      name.trim() && `${label('Your name')}: ${name.trim()}`,
      email.trim() && `${label('Your email address')}: ${email.trim()}`,
    ].filter((line): line is string => Boolean(line))
    const body = [...details, '', message.trim()].join('\n')
    window.location.href = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!API_MODE) return openMailApp()
    // Guard a same-tick double submit (two rapid Enter presses) before the
    // 'sending' state disables the button.
    if (sendingRef.current) return
    sendingRef.current = true
    setStatus('sending')
    try {
      await apiPost('/contact', { name: name.trim(), email: email.trim(), message: message.trim(), turnstileToken: turnstileToken || undefined })
      setStatus('sent')
    } catch {
      setStatus('error')
    } finally {
      sendingRef.current = false
    }
  }

  if (status === 'sent') {
    return (
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} className="mt-5 flex items-start gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel sm:p-5">
        <Icon icon={CircleCheck} size={20} className="mt-0.5 shrink-0 text-success" />
        <p className="text-[13.5px] leading-relaxed text-ink-2">{label('Message sent — a person reads it. Thank you.')}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(event) => { void handleSubmit(event) }}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      lang={lang}
      className="mt-5 grid gap-4 rounded-xl border border-line bg-surface p-4 shadow-panel sm:p-5"
    >
      <Field label={label('Your name')} htmlFor={`${id}-name`}>
        <TextInput
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Field>
      <Field label={label('Your email address')} htmlFor={`${id}-email`}>
        <TextInput
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>
      <Field label={label('Your message')} htmlFor={`${id}-message`}>
        <Textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          required
          minLength={10}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Field>
      <Turnstile onToken={setTurnstileToken} />
      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger-tint px-3 py-2 text-[12.5px] leading-relaxed text-danger">
          <Icon icon={TriangleAlert} size={15} className="mt-0.5 shrink-0" />
          {label('That did not send. Try again, or write to')} {SUPPORT_ADDRESS} {label('directly.')}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button type="submit" variant="primary" iconLeft={Mail} loading={status === 'sending'}>
          {label('Send message')}
        </Button>
        <p className="text-[12px] leading-snug text-ink-3">
          {label('Goes straight to the support inbox.')}
        </p>
      </div>
    </form>
  )
}
