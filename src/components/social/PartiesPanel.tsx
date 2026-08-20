import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Users, Globe, LogIn, Plus } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, TextInput } from '@/components/ui/Field'
import { PARTY_REFUSALS, useMyParties, useOpenParties, usePartyActions } from '@/lib/useParties'
import { PartyPage } from './PartyPage'
import { useT } from '@/lib/i18n'

function fallbackRefusal(t: (s: string) => string): string {
  return t('That did not work. Try again.')
}

/**
 * A pasted party link carries its code in a `party=` query param — see the
 * copy button on `PartyPage`. Accepting either the whole link or the bare
 * code means a student does not have to know which one they were sent.
 */
function extractCode(input: string): string {
  const trimmed = input.trim()
  try {
    const url = new URL(trimmed)
    return url.searchParams.get('party') ?? trimmed
  } catch {
    return trimmed
  }
}

/**
 * The Parties tab: your own standing groups, the ones open to your year that
 * you have not joined, and a way to join one you were sent.
 *
 * Owns its own "which party is open" state rather than routing through
 * `StudyTogether`, because — unlike a shared test — opening a party never
 * hands off to a runner that page has to know about; it is this tab's whole
 * story from list to detail and back.
 */
export function PartiesPanel() {
  const t = useT()
  const { parties, reload: reloadMine } = useMyParties()
  const { parties: openParties, reload: reloadOpen } = useOpenParties()
  const { create, join } = usePartyActions()

  const [openPartyId, setOpenPartyId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [joinInput, setJoinInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  /**
   * Walk in on the link, once.
   *
   * The link's whole point is that it works with nothing else done, so the code
   * is spent here rather than asking a student to copy it out of their own
   * address bar into the box below. Guarded by a ref rather than by the param,
   * because clearing the param re-renders this effect before the URL change has
   * landed and it would otherwise try the same code twice.
   *
   * A refusal is left on screen rather than swallowed: `wrong_cohort` covers
   * both another year's party and a code naming nothing at all, and a student
   * who followed a real link deserves to be told which of those happened as
   * plainly as we can honestly put it.
   */
  const [searchParams, setSearchParams] = useSearchParams()
  const spent = useRef<string | null>(null)
  useEffect(() => {
    const code = searchParams.get('party')
    if (!code || spent.current === code) return
    spent.current = code
    void (async () => {
      const result = await join(code.trim())
      if (result?.ok && result.party) { setOpenPartyId(result.party.id); await reloadMine(); await reloadOpen() }
      else setMessage(PARTY_REFUSALS[result?.reason ?? ''] ?? fallbackRefusal(t))
      setSearchParams((current) => {
        const next = new URLSearchParams(current)
        next.delete('party')
        return next
      }, { replace: true })
    })()
  }, [searchParams, setSearchParams, join, reloadMine, reloadOpen, t])

  async function reloadAll() {
    await Promise.all([reloadMine(), reloadOpen()])
  }

  async function createParty() {
    setBusy(true)
    setMessage('')
    const result = await create(name.trim() || t('Study party'))
    setBusy(false)
    if (!result.ok) { setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)); return }
    setName('')
    await reloadAll()
    setOpenPartyId(result.party!.id)
  }

  async function joinAndOpen(raw: string) {
    const code = extractCode(raw)
    if (!code) return
    setBusy(true)
    setMessage('')
    const result = await join(code)
    setBusy(false)
    if (!result.ok) { setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)); return }
    setJoinInput('')
    await reloadAll()
    setOpenPartyId(result.party!.id)
  }

  if (openPartyId) {
    return <PartyPage partyId={openPartyId} onExit={() => { setOpenPartyId(null); void reloadAll() }} />
  }

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
      <div className="space-y-4">
        <Panel>
          <PanelHeader title={t('Start a party')} icon={Plus} />
          <div className="space-y-3 p-5">
            <Field label={t('Name it')}>
              <TextInput value={name} onChange={(event) => setName(event.target.value)} placeholder={t('e.g. Y3 Cardiology group')} />
            </Field>
            <Button variant="primary" iconLeft={Plus} loading={busy} onClick={() => void createParty()}>
              {t('Create and get a link')}
            </Button>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title={t('Your parties')} icon={Users} hint={parties.length ? String(parties.length) : undefined} />
          {parties.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={Users}
                title={t('No parties yet')}
                description={t('Start one, join one open to your year, or join with a link.')}
              />
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {parties.map((party) => (
                <li key={party.id}>
                  <button
                    type="button"
                    onClick={() => setOpenPartyId(party.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-inset"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-ink">{party.name}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-3">
                        <span className="font-mono">{party.code}</span> · {party.members} {party.members === 1 ? t('person') : t('people')}
                      </span>
                    </span>
                    {party.isHost && <Badge tone="primary">{t('Host')}</Badge>}
                    <Badge tone={party.visibility === 'open' ? 'neutral' : 'outline'}>
                      {party.visibility === 'open' ? t('Open to your year') : t('Invite only')}
                    </Badge>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {message && <p role="status" className="border-t border-line px-4 py-2.5 text-[12.5px] text-danger">{message}</p>}
        </Panel>
      </div>

      <div className="space-y-4">
        {/* Absent, not an empty heading — the server already excludes parties the caller is in. */}
        {openParties.length > 0 && (
          <Panel>
            <PanelHeader title={t('Open in your year')} icon={Globe} hint={String(openParties.length)} />
            <ul className="divide-y divide-line">
              {openParties.map((party) => (
                <li key={party.id}>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void joinAndOpen(party.code)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-start transition-colors hover:bg-inset disabled:pointer-events-none disabled:opacity-55"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-ink">{party.name}</span>
                      <span className="mt-0.5 block text-[12px] text-ink-3">
                        {party.members} {party.members === 1 ? t('person') : t('people')}
                      </span>
                    </span>
                    <Button variant="secondary" size="sm" iconLeft={LogIn} loading={busy} tabIndex={-1}>
                      {t('Join')}
                    </Button>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        )}

        <Panel>
          <PanelHeader title={t('Join with a link')} icon={LogIn} />
          <div className="space-y-3 p-5">
            <TextInput
              value={joinInput}
              onChange={(event) => setJoinInput(event.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') void joinAndOpen(joinInput) }}
              placeholder={t('Paste a party link or code')}
              aria-label={t('Party link or code')}
            />
            <Button
              className="w-full"
              variant="secondary"
              iconLeft={LogIn}
              loading={busy}
              disabled={joinInput.trim().length < 4}
              onClick={() => void joinAndOpen(joinInput)}
            >
              {t('Join')}
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  )
}
