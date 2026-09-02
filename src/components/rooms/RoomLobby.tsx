import { useCallback, useState, type ReactNode } from 'react'
import { ArrowLeft, DoorOpen, Globe, LogIn, Plus, Users } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Field, TextInput } from '@/components/ui/Field'
import { PARTY_REFUSALS, useMyParties, useOpenParties, usePartyActions } from '@/lib/useParties'
import { API_MODE } from '@/lib/api'
import { useT } from '@/lib/i18n'
import { ROOM_CAPACITY } from '@/lib/rooms/roomPresence'
import { DEMO_OPEN_ROOMS, DEMO_ROOM_SUMMARY } from '@/lib/rooms/demoRoom'
import { ChallengeRunner } from '@/components/social/ChallengeRunner'
import { RoomCard } from './RoomCard'
import { SharedTestRunner } from './SharedTestRunner'
import { FriendsSection, SharedTestsSection } from './SocialSections'

/** What entering a room needs: the id to read it by, and the code to address it by. */
export interface RoomAddress {
  id: string
  code: string
}

function fallbackRefusal(t: (s: string) => string): string {
  return t('That did not work. Try again.')
}

/**
 * A pasted room link carries its code in `?room=` — or, from a link sent before
 * the rename, in `?party=`. Both are accepted, and so is a bare code, because a
 * student should not have to know which of the three they were handed.
 */
function extractCode(input: string): string {
  const trimmed = input.trim()
  try {
    const url = new URL(trimmed)
    return url.searchParams.get('room') ?? url.searchParams.get('party') ?? trimmed
  } catch {
    return trimmed
  }
}

/**
 * A runner — a shared test, a challenge — standing in for the lobby.
 *
 * It replaces the lobby rather than opening underneath it. Both runners used to
 * render inside their own collapsed section at the bottom of a page that still
 * showed Your rooms, Open rooms, Join and Create above them, so starting a test
 * looked like nothing had happened. A sitting is a screen, not a panel.
 */
function RunnerFrame({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  const t = useT()
  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" iconLeft={ArrowLeft} onClick={onBack}>
        {t('Back to Study Rooms')}
      </Button>
      {children}
    </div>
  )
}

/**
 * The way in: join with a code, open a room of your own, or walk into one your
 * year has left open.
 *
 * Underneath sit the two surfaces the old Study Together page owned — shared
 * tests and friends — demoted to secondary sections rather than dropped. They
 * are the same components, wired the same way; only their prominence changed,
 * because a room you can sit in is the point of this page and a friend request
 * is not. What they *open*, though, takes the whole screen: see `RunnerFrame`.
 */
export function RoomLobby({ onEnter }: { onEnter: (room: RoomAddress) => void }) {
  const t = useT()
  const { parties, reload: reloadMine } = useMyParties()
  const { parties: openParties, reload: reloadOpen } = useOpenParties()
  const { create, join } = usePartyActions()

  const [name, setName] = useState('')
  const [joinInput, setJoinInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [openSharedTestId, setOpenSharedTestId] = useState<string | null>(null)
  const [openChallengeId, setOpenChallengeId] = useState<string | null>(null)

  const reloadAll = useCallback(async () => {
    await Promise.all([reloadMine(), reloadOpen()])
  }, [reloadMine, reloadOpen])

  async function createRoom() {
    setBusy(true)
    setMessage('')
    const result = await create(name.trim() || t('Study room'))
    setBusy(false)
    if (!result.ok) { setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)); return }
    setName('')
    await reloadAll()
    onEnter({ id: result.party!.id, code: result.party!.code })
  }

  async function joinAndEnter(raw: string) {
    const code = extractCode(raw)
    if (!code) return
    setBusy(true)
    setMessage('')
    const result = await join(code)
    setBusy(false)
    if (!result.ok) { setMessage(PARTY_REFUSALS[result.reason ?? ''] ?? fallbackRefusal(t)); return }
    setJoinInput('')
    await reloadAll()
    onEnter({ id: result.party!.id, code: result.party!.code })
  }

  if (openSharedTestId) {
    return (
      <RunnerFrame onBack={() => setOpenSharedTestId(null)}>
        <SharedTestRunner roomId={openSharedTestId} onExit={() => setOpenSharedTestId(null)} />
      </RunnerFrame>
    )
  }

  if (openChallengeId) {
    return (
      <RunnerFrame onBack={() => setOpenChallengeId(null)}>
        <ChallengeRunner challengeId={openChallengeId} onExit={() => setOpenChallengeId(null)} />
      </RunnerFrame>
    )
  }

  const mine = API_MODE
    ? parties.filter((party) => party.archivedAt === null).map((party) => ({
      id: party.id, code: party.code, name: party.name, members: party.members,
      capacity: ROOM_CAPACITY, mine: true,
    }))
    : [DEMO_ROOM_SUMMARY]

  const open = API_MODE
    ? openParties.map((party) => ({
      id: party.id, code: party.code, name: party.name, members: party.members,
      capacity: ROOM_CAPACITY, mine: false,
    }))
    : [...DEMO_OPEN_ROOMS]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.6fr)]">
        <div className="space-y-4">
          <Panel>
            <PanelHeader title={t('Your rooms')} icon={Users} hint={mine.length ? `${mine.length}` : undefined} />
            {mine.length === 0 ? (
              <EmptyState
                className="px-5 py-8"
                icon={DoorOpen}
                title={t('You are not in a room yet')}
                description={t('Open one for your cohort, or join with a code someone sent you.')}
              />
            ) : (
              <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
                {mine.map((room) => (
                  <RoomCard key={room.id} {...room} busy={busy} onEnter={() => onEnter(room)} />
                ))}
              </div>
            )}
          </Panel>

          <Panel>
            <PanelHeader
              title={t('Open rooms')}
              icon={Globe}
              hint={t('Open to your university and year')}
            />
            {open.length === 0 ? (
              <p className="px-5 py-6 text-center text-[12.5px] text-ink-3">
                {t('No open rooms in your year right now.')}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
                {open.map((room) => (
                  <RoomCard
                    key={room.id}
                    {...room}
                    busy={busy}
                    onEnter={() => (API_MODE ? void joinAndEnter(room.code) : onEnter(room))}
                  />
                ))}
              </div>
            )}
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title={t('Join with a code')} icon={LogIn} />
            <div className="space-y-3 p-5">
              <TextInput
                value={joinInput}
                onChange={(event) => setJoinInput(event.target.value.toUpperCase())}
                onKeyDown={(event) => { if (event.key === 'Enter') void joinAndEnter(joinInput) }}
                placeholder={t('e.g. KTP0R2')}
                className="font-mono tracking-[0.2em]"
                aria-label={t('Room code or link')}
                disabled={!API_MODE}
              />
              <Button
                className="w-full"
                variant="secondary"
                iconLeft={LogIn}
                loading={busy}
                disabled={!API_MODE || extractCode(joinInput).length < 4}
                onClick={() => void joinAndEnter(joinInput)}
              >
                {t('Join')}
              </Button>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title={t('Create a room')} icon={Plus} />
            <div className="space-y-3 p-5">
              <Field label={t('Name it')}>
                <TextInput
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t('e.g. Cardiology evening sprint')}
                  disabled={!API_MODE}
                />
              </Field>
              <p className="text-[12px] leading-relaxed text-ink-3">
                {t('A room holds up to 20 desks and stays open to your university and year until you archive it.')}
              </p>
              <Button
                className="w-full"
                variant="primary"
                iconLeft={Plus}
                loading={busy}
                disabled={!API_MODE}
                onClick={() => void createRoom()}
              >
                {t('Create and get a code')}
              </Button>
              {!API_MODE && (
                <p className="text-[11.5px] text-ink-3">
                  {t('Preview only — opening a room for other students requires the connected server.')}
                </p>
              )}
            </div>
          </Panel>

          {/* Rendered whether or not it has anything to say: a live region
              inserted together with its text is frequently never announced. */}
          <p role="status" className="text-[12.5px] text-danger">{message}</p>
        </div>
      </div>

      {/* The old Study Together page, kept whole and put where it belongs. */}
      <SharedTestsSection onOpenSharedTest={setOpenSharedTestId} />
      <FriendsSection onOpenSharedTest={setOpenSharedTestId} onOpenChallenge={setOpenChallengeId} />
    </div>
  )
}
