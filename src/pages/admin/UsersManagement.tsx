import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Users, Search, ShieldOff, ShieldCheck, KeyRound, CalendarPlus, Ban,
  RefreshCw, Copy, History, UserCog, AlertTriangle,
} from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { Field, SearchInput, Select, TextInput, Textarea } from '@/components/ui/Field'
import { Table, Th, Td, Tr } from '@/components/ui/Table'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/cn'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import {
  useAdminUsers, fetchUser, grantSubscription, cancelSubscription,
  setAccess, sendPasswordReset, updateProfile, type UserFilters,
} from '@/lib/useAdminUsers'
import {
  EXTENSION_PRESETS, entitlementLabel, entitlementTone, shortDate,
  type AdminUser, type AdminUserDetail,
} from '@/data/adminUsers'

/**
 * Every action on this page is consequential and several are hard to undo, so
 * they share one shape: choose the action, say why in writing, confirm. The
 * reason is stored with the change and shown in the history below, which is what
 * makes an account decision auditable months later.
 */
type PendingAction =
  | { kind: 'extend'; plan: string; days: number | null; note: string }
  | { kind: 'cancel'; immediate: boolean }
  | { kind: 'access'; status: 'active' | 'suspended' }
  | { kind: 'password' }
  | { kind: 'profile'; name: string; email: string; year: string; universityId: string; notes: string }

const PLAN_OPTIONS = ['Free', 'QBank', 'Adaptive', 'Adaptive add-on', 'Exam Sprint']

export function UsersManagement() {
  const [universities] = useUniversityCatalogue()
  const { users, loading, error, load, passwordResetAvailable, setError } = useAdminUsers()
  const [filters, setFilters] = useState<UserFilters>({})
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<AdminUserDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [pending, setPending] = useState<PendingAction | null>(null)
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [resetLink, setResetLink] = useState<string | null>(null)

  // Search is debounced into the server query rather than filtering in the
  // browser, because the list is capped server-side and a local filter would
  // only ever search the page that happened to load.
  useEffect(() => {
    const timer = setTimeout(() => setFilters((f) => ({ ...f, query: query.trim() || undefined })), 250)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => { void load(filters) }, [filters, load])

  const openUser = useCallback(async (id: string) => {
    setSelectedId(id)
    setPending(null)
    setReason('')
    setResetLink(null)
    setNotice('')
    setDetailLoading(true)
    try { setDetail(await fetchUser(id)) }
    catch { setDetail(null); setError('Could not load that user.') }
    finally { setDetailLoading(false) }
  }, [setError])

  const refresh = useCallback(async () => {
    await load(filters)
    if (selectedId) { try { setDetail(await fetchUser(selectedId)) } catch { /* list error already shown */ } }
  }, [filters, load, selectedId])

  async function commit() {
    if (!selectedId || !pending) return
    if (reason.trim().length < 8) { setNotice('Give a reason of at least 8 characters — it is stored with the change.'); return }
    setBusy(true)
    setNotice('')
    setResetLink(null)
    try {
      if (pending.kind === 'extend') {
        await grantSubscription(selectedId, { plan: pending.plan, days: pending.days, note: pending.note || undefined, reason })
        setNotice(`${pending.plan} granted.`)
      } else if (pending.kind === 'cancel') {
        await cancelSubscription(selectedId, { immediate: pending.immediate, reason })
        setNotice(pending.immediate ? 'Subscription ended now.' : 'Subscription will lapse at its expiry date.')
      } else if (pending.kind === 'access') {
        await setAccess(selectedId, { status: pending.status, reason })
        setNotice(pending.status === 'suspended' ? 'Sign-in suspended.' : 'Sign-in restored.')
      } else if (pending.kind === 'password') {
        const result = await sendPasswordReset(selectedId, { reason })
        setResetLink(result.actionLink)
        setNotice(result.actionLink ? 'Recovery link generated. It is shown once — copy it now.' : 'Supabase issued the recovery email.')
      } else if (pending.kind === 'profile') {
        await updateProfile(selectedId, {
          name: pending.name, email: pending.email, year: pending.year,
          universityId: pending.universityId, notes: pending.notes, reason,
        })
        setNotice('Profile updated.')
      }
      setPending(null)
      setReason('')
      await refresh()
    } catch (e) {
      setNotice(e instanceof Error ? e.message : 'The change was refused.')
    } finally {
      setBusy(false)
    }
  }

  const counts = useMemo(() => ({
    total: users.length,
    suspended: users.filter((u) => u.identity?.accessStatus === 'suspended').length,
    paying: users.filter((u) => u.entitlement.state === 'active' || u.entitlement.state === 'trialing').length,
    neverSignedIn: users.filter((u) => !u.identity).length,
  }), [users])

  return (
    <PageContainer>
      <PageHeader
        title="Users"
        description="Every account, whether it came from a sign-in or from the roster. Select someone to see their record and manage their access."
      />

      {error && (
        <Panel className="border-warning/40 bg-warning-tint px-4 py-3">
          <p className="flex items-start gap-2 text-[13px] text-ink"><Icon icon={AlertTriangle} size={15} className="mt-0.5 shrink-0 text-warning" />{error}</p>
        </Panel>
      )}

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: 'Accounts', value: counts.total },
          { label: 'With access', value: counts.paying },
          { label: 'Suspended', value: counts.suspended },
          { label: 'Never signed in', value: counts.neverSignedIn },
        ].map((s) => (
          <Panel key={s.label} className="px-4 py-3">
            <p className="text-[11.5px] uppercase tracking-[0.06em] text-ink-3">{s.label}</p>
            <p className="tnum mt-1 font-mono text-[20px] font-semibold text-ink">{s.value}</p>
          </Panel>
        ))}
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_26rem]">
        {/* ---- Roster ---- */}
        <Panel className="min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
            <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email or user ID…" className="w-64" />
            <Select
              value={filters.accessStatus ?? ''}
              onChange={(e) => setFilters((f) => ({ ...f, accessStatus: e.target.value || undefined }))}
            >
              <option value="">Any access</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </Select>
            <Select
              value={filters.universityId ?? ''}
              onChange={(e) => setFilters((f) => ({ ...f, universityId: e.target.value || undefined }))}
            >
              <option value="">Any university</option>
              {universities.map((u) => <option key={u.id} value={u.id}>{u.short}</option>)}
            </Select>
            <Button size="sm" variant="ghost" iconLeft={RefreshCw} onClick={() => void refresh()}>Refresh</Button>
            <span className="ms-auto tnum font-mono text-[11.5px] text-ink-3">{users.length} shown</span>
          </div>

          <Table>
            <thead>
              <tr>
                <Th className="pl-4">User</Th>
                <Th>University · Year</Th>
                <Th>Subscription</Th>
                <Th align="right">Answered</Th>
                <Th align="right">Accuracy</Th>
                <Th>Access</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: AdminUser) => {
                const uni = universities.find((x) => x.id === u.universityId)
                return (
                  <Tr key={u.id} hover onClick={() => void openUser(u.id)} className={cn('cursor-pointer', selectedId === u.id && 'bg-accent-tint')}>
                    <Td className="pl-4">
                      <span className="inline-flex items-center gap-2.5">
                        <Avatar name={u.name || u.email || '?'} size="sm" />
                        <span className="min-w-0">
                          <span className="block truncate text-[13px] font-medium text-ink">{u.name || u.email || 'Unnamed account'}</span>
                          <span className="block truncate text-[11px] text-ink-3">{u.email ?? 'no email'}</span>
                        </span>
                      </span>
                    </Td>
                    <Td className="whitespace-nowrap text-[12.5px] text-ink-2">{uni?.short ?? '—'}{u.year ? ` · ${u.year}` : ''}</Td>
                    <Td><Badge tone={entitlementTone(u.entitlement.state)}>{entitlementLabel(u.entitlement)}</Badge></Td>
                    <Td align="right" className="tnum font-mono text-ink-2">{u.performance.questionsAnswered.toLocaleString()}</Td>
                    <Td align="right" className="tnum font-mono text-ink-2">{Math.round(u.performance.accuracy)}%</Td>
                    <Td>
                      {!u.identity
                        ? <Badge tone="neutral">Never signed in</Badge>
                        : u.identity.accessStatus === 'suspended'
                          ? <Badge tone="danger">Suspended</Badge>
                          : <Badge tone={u.identity.role === 'admin' ? 'accent' : 'success'}>{u.identity.role === 'admin' ? 'Admin' : 'Active'}</Badge>}
                    </Td>
                  </Tr>
                )
              })}
              {!loading && users.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-14">
                  <EmptyState icon={Search} title="No users match" description="Adjust the search or filters above." />
                </td></tr>
              )}
            </tbody>
          </Table>
        </Panel>

        {/* ---- Detail and actions ---- */}
        <Panel className="overflow-hidden">
          {!selectedId && (
            <div className="px-4 py-14">
              <EmptyState icon={Users} title="Select a user" description="Their record, subscription and account actions appear here." />
            </div>
          )}

          {selectedId && detailLoading && <p className="px-4 py-10 text-center text-[13px] text-ink-3">Loading…</p>}

          {selectedId && !detailLoading && detail && (
            <div className="divide-y divide-line">
              <div className="flex items-start gap-3 px-4 py-4">
                <Avatar name={detail.name || detail.email || '?'} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ink">{detail.name || 'Unnamed account'}</p>
                  <p className="truncate text-[12px] text-ink-3">{detail.email ?? 'no email on record'}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <Badge tone={entitlementTone(detail.entitlement.state)}>{entitlementLabel(detail.entitlement)}</Badge>
                    {detail.identity
                      ? <Badge tone={detail.identity.accessStatus === 'suspended' ? 'danger' : 'success'}>{detail.identity.accessStatus === 'suspended' ? 'Suspended' : 'Can sign in'}</Badge>
                      : <Badge tone="neutral">Never signed in</Badge>}
                    {detail.identity?.role === 'admin' && <Badge tone="accent">Admin</Badge>}
                  </div>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3 text-[12.5px]">
                {[
                  ['Joined', shortDate(detail.joined)],
                  ['Last active', shortDate(detail.lastActive)],
                  ['Questions answered', detail.performance.questionsAnswered.toLocaleString()],
                  ['Accuracy', `${Math.round(detail.performance.accuracy)}%`],
                  ['Readiness', `${Math.round(detail.performance.readiness)}%`],
                  ['Subscription ends', shortDate(detail.entitlement.expiresAt)],
                ].map(([k, v]) => (
                  <div key={k}><dt className="text-ink-3">{k}</dt><dd className="tnum font-mono text-ink">{v}</dd></div>
                ))}
              </dl>

              {/* ---- Actions ---- */}
              <div className="px-4 py-3">
                <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">Manage</p>
                <div className="flex flex-wrap gap-1.5">
                  <Button size="sm" variant="secondary" iconLeft={CalendarPlus}
                    onClick={() => setPending({ kind: 'extend', plan: detail.entitlement.plan === 'Free' ? 'QBank' : detail.entitlement.plan, days: 30, note: '' })}>
                    Extend
                  </Button>
                  <Button size="sm" variant="secondary" iconLeft={Ban} disabled={detail.entitlement.state === 'none'}
                    onClick={() => setPending({ kind: 'cancel', immediate: false })}>
                    End subscription
                  </Button>
                  {detail.identity?.accessStatus === 'suspended' ? (
                    <Button size="sm" variant="secondary" iconLeft={ShieldCheck} onClick={() => setPending({ kind: 'access', status: 'active' })}>Restore access</Button>
                  ) : (
                    <Button size="sm" variant="secondary" iconLeft={ShieldOff} disabled={!detail.identity}
                      onClick={() => setPending({ kind: 'access', status: 'suspended' })}>Suspend</Button>
                  )}
                  <Button size="sm" variant="secondary" iconLeft={KeyRound} disabled={!detail.email || !passwordResetAvailable}
                    onClick={() => setPending({ kind: 'password' })}>Password reset</Button>
                  <Button size="sm" variant="ghost" iconLeft={UserCog}
                    onClick={() => setPending({
                      kind: 'profile', name: detail.name ?? '', email: detail.email ?? '',
                      year: detail.year ?? '', universityId: detail.universityId ?? '', notes: detail.notes ?? '',
                    })}>Edit profile</Button>
                </div>

                {!detail.identity && (
                  <p className="mt-2 text-[11.5px] text-ink-3">This person has never signed in, so there is no account to suspend or reset. A subscription can still be granted — the profile is created when you do.</p>
                )}
                {!passwordResetAvailable && (
                  <p className="mt-2 text-[11.5px] text-ink-3">Password resets are unavailable until <span className="font-mono">SUPABASE_URL</span> and <span className="font-mono">SUPABASE_SERVICE_ROLE_KEY</span> are set on the server.</p>
                )}
              </div>

              {/* ---- The confirm step, shared by every action ---- */}
              {pending && (
                <div className="bg-inset px-4 py-3">
                  {pending.kind === 'extend' && (
                    <div className="grid gap-2">
                      <Field label="Plan">
                        <Select value={pending.plan} onChange={(e) => setPending({ ...pending, plan: e.target.value })}>
                          {PLAN_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                        </Select>
                      </Field>
                      <Field label="Length" hint={detail.entitlement.daysLeft ? `Adds to the ${detail.entitlement.daysLeft} days remaining.` : 'Starts today.'}>
                        <Select
                          value={String(pending.days)}
                          onChange={(e) => setPending({ ...pending, days: e.target.value === 'null' ? null : Number(e.target.value) })}
                        >
                          {EXTENSION_PRESETS.map((p) => <option key={p.label} value={String(p.days)}>{p.label}</option>)}
                        </Select>
                      </Field>
                      <Field label="Note (optional)"><TextInput value={pending.note} onChange={(e) => setPending({ ...pending, note: e.target.value })} placeholder="e.g. compensation for outage" /></Field>
                    </div>
                  )}

                  {pending.kind === 'cancel' && (
                    <Field label="How should it end?">
                      <Select
                        value={pending.immediate ? 'now' : 'lapse'}
                        onChange={(e) => setPending({ ...pending, immediate: e.target.value === 'now' })}
                      >
                        <option value="lapse">Let it lapse at the expiry date</option>
                        <option value="now">End access immediately</option>
                      </Select>
                    </Field>
                  )}

                  {pending.kind === 'access' && (
                    <p className="mb-2 text-[12.5px] text-ink">
                      {pending.status === 'suspended'
                        ? 'They will be signed out and unable to sign in again until this is reversed.'
                        : 'They will be able to sign in again immediately.'}
                    </p>
                  )}

                  {pending.kind === 'password' && (
                    <p className="mb-2 text-[12.5px] text-ink">Supabase will generate a recovery link for {detail.email}. No password is read or set here.</p>
                  )}

                  {pending.kind === 'profile' && (
                    <div className="grid gap-2">
                      <Field label="Name"><TextInput value={pending.name} onChange={(e) => setPending({ ...pending, name: e.target.value })} /></Field>
                      <Field label="Email"><TextInput value={pending.email} onChange={(e) => setPending({ ...pending, email: e.target.value })} /></Field>
                      <Field label="University">
                        <Select value={pending.universityId} onChange={(e) => setPending({ ...pending, universityId: e.target.value })}>
                          <option value="">—</option>
                          {universities.map((u) => <option key={u.id} value={u.id}>{u.short}</option>)}
                        </Select>
                      </Field>
                      <Field label="Year"><TextInput value={pending.year} onChange={(e) => setPending({ ...pending, year: e.target.value })} /></Field>
                      <Field label="Internal note"><Textarea className="min-h-16" value={pending.notes} onChange={(e) => setPending({ ...pending, notes: e.target.value })} /></Field>
                    </div>
                  )}

                  <Field label="Reason" hint="Stored with the change and shown in the history below.">
                    <TextInput value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why are you doing this?" />
                  </Field>
                  <div className="mt-2 flex gap-1.5">
                    <Button size="sm" variant={pending.kind === 'access' && pending.status === 'suspended' ? 'danger' : 'primary'} loading={busy} onClick={() => void commit()}>Confirm</Button>
                    <Button size="sm" variant="ghost" onClick={() => { setPending(null); setReason(''); setNotice('') }}>Cancel</Button>
                  </div>
                </div>
              )}

              {notice && <p className="px-4 py-2 text-[12.5px] text-ink">{notice}</p>}
              {resetLink && (
                <div className="px-4 py-2">
                  <p className="mb-1 text-[11.5px] text-ink-3">Recovery link — shown once, not stored.</p>
                  <div className="flex items-center gap-1.5">
                    <code className="min-w-0 flex-1 truncate rounded-md bg-inset px-2 py-1.5 font-mono text-[11px] text-ink">{resetLink}</code>
                    <Button size="sm" variant="ghost" iconLeft={Copy} onClick={() => void navigator.clipboard?.writeText(resetLink)}>Copy</Button>
                  </div>
                </div>
              )}

              {/* ---- History ---- */}
              <div className="px-4 py-3">
                <p className="mb-2 flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                  <Icon icon={History} size={13} />History
                </p>
                {detail.audit.length === 0 && <p className="text-[12px] text-ink-3">No changes recorded yet.</p>}
                <ul className="space-y-1.5">
                  {detail.audit.slice(0, 12).map((row) => (
                    <li key={row.id} className="text-[12px]">
                      <span className="font-medium text-ink">{row.action}</span>
                      {row.detail && <span className="text-ink-2"> · {row.detail}</span>}
                      <span className="block text-ink-3">{shortDate(row.createdAt)} — {row.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Panel>
      </div>
    </PageContainer>
  )
}
