import { useId, useState, type FormEvent } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput, Textarea } from '@/components/ui/Field'
import { SUPPORT_ADDRESS, legalLabel } from './content'

/**
 * A contact form that is honest about what it is.
 *
 * There is no contact endpoint on this site, and a form that quietly drops a
 * message is worse than no form. So this one composes a `mailto:` from the
 * fields and hands it to the device's mail application: the student sends it
 * themselves, from their own address, and keeps a copy in their sent items —
 * which also means we can reply to a real address rather than one typed into a
 * box. The page says so in the section above, and the button says "open",
 * never "send".
 */
export function ContactForm({ lang }: { lang: 'ar' | 'en' }) {
  const id = useId()
  const label = (en: string) => legalLabel(lang, en)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = `${label('Support request')}${name.trim() ? ` — ${name.trim()}` : ''}`
    const details = [
      name.trim() && `${label('Your name')}: ${name.trim()}`,
      email.trim() && `${label('Your email address')}: ${email.trim()}`,
    ].filter((line): line is string => Boolean(line))
    const body = [...details, '', message.trim()].join('\n')
    window.location.href = `mailto:${SUPPORT_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    // The document around this is English and sets its own `dir`; the form's
    // labels are chrome and follow the shell's language instead.
    <form
      onSubmit={handleSubmit}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      lang={lang}
      className="mt-5 grid gap-4 rounded-xl border border-line bg-surface p-4 shadow-panel sm:p-5"
    >
      <Field label={label('Your name')} htmlFor={`${id}-name`}>
        <TextInput
          id={`${id}-name`}
          name="name"
          autoComplete="name"
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
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Field>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button type="submit" variant="primary" iconLeft={Mail}>
          {label('Open in my mail app')}
        </Button>
        <p className="text-[12px] leading-snug text-ink-3">
          {label('Nothing is sent from this page — your mail app opens with the message ready.')}
        </p>
      </div>
    </form>
  )
}
