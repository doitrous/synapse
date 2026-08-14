import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CircleCheck, CircleAlert } from 'lucide-react'
import { API_MODE, apiGet } from '@/lib/api'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'

/**
 * The page an unsubscribe link lands on.
 *
 * Signed out, no shell, no nav — whoever follows this link is in their inbox, not
 * in the app, and asking them to log in to stop receiving email is how a message
 * gets reported as spam instead. The work is done by the GET itself, so the page
 * reports what already happened rather than asking again.
 */
export function Unsubscribe() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const [state, setState] = useState<'working' | 'done' | 'failed'>('working')
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    if (!token) { setState('failed'); return }
    if (!API_MODE) { setState('done'); return }
    let live = true
    apiGet<{ ok: boolean; category: string | null }>(`/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((data) => { if (live) { setCategory(data.category); setState('done') } })
      .catch(() => { if (live) setState('failed') })
    return () => { live = false }
  }, [token])

  return (
    <main className="grid min-h-dvh place-items-center bg-paper px-4">
      <div className="w-full max-w-md rounded-xl border border-line bg-surface p-7 text-center shadow-panel">
        <span className="font-serif text-[19px] font-semibold text-accent-strong">Synapse</span>

        {state === 'working' && <p className="mt-6 text-[14px] text-ink-2">Updating your preferences…</p>}

        {state === 'done' && (
          <>
            <span className="mx-auto mt-6 grid size-11 place-items-center rounded-full bg-success-tint text-success"><Icon icon={CircleCheck} size={22} /></span>
            <h1 className="mt-4 font-serif text-[21px] font-semibold text-ink">You are unsubscribed</h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
              {category ? <>You will no longer receive <strong className="font-semibold text-ink">{category}</strong> emails.</> : 'You will no longer receive these emails.'}
              {' '}Messages about your account — sign-in, billing, and privacy — still reach you, because they are about something that happened to your account.
            </p>
          </>
        )}

        {state === 'failed' && (
          <>
            <span className="mx-auto mt-6 grid size-11 place-items-center rounded-full bg-warning-tint text-warning"><Icon icon={CircleAlert} size={22} /></span>
            <h1 className="mt-4 font-serif text-[21px] font-semibold text-ink">That link has expired</h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
              We could not read this unsubscribe link. Change your email preferences in your account settings, or reply to any Synapse email and we will do it for you.
            </p>
          </>
        )}

        <Link to="/" className="mt-6 inline-block"><Button variant="secondary" size="sm">Go to Synapse</Button></Link>
      </div>
    </main>
  )
}
