import { LoadingRegion, SkeletonFields } from '@/components/loading/SkeletonParts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Users, Search, ShieldOff, ShieldCheck, KeyRound, CalendarPlus, Ban,
  RefreshCw, Copy, History, UserCog, AlertTriangle, Activity, Download, ShieldPlus,
  GraduationCap,
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
import { useIdentity } from '@/lib/useIdentity'
import { useT } from '@/lib/i18n'
import { ROLE_LABEL, assignableRoles, rank, type StoredRole } from '@/data/adminRoles'
import { ReviewerScopeEditor } from '@/components/admin/ReviewerScopeEditor'
import {
  useAdminUsers, fetchUser, grantSubscription, cancelSubscription,
  setAccess, sendPasswordReset, changePassword, updateProfile, setUserRole, fetchUserActivity, changeEnrollment,
  type UserFilters, type UserActivity,
} from '@/lib/useAdminUsers'
import {
  EXTENSION_PRESETS, entitlementLabel, entitlementTone, shortDate,
  type AdminUser, type AdminUserDetail,
} from '@/data/adminUsers'
import { API_MODE, apiGet, apiPost } from '@/lib/api'

/**
 * Every action on this page is consequential and several are hard to undo, so
 * they share one shape: choose the action, say why in writing, confirm. The
 * reason is stored with the change and shown in the history below, which is what
 * makes an account decision auditable months later.
 */
/** What the person confirming a role change is actually deciding. */
const ROLE_CONSEQUENCE: Record<StoredRole, string> = {
  student: 'They lose the admin console entirely and keep only the student app. The last account with console access cannot be demoted.',
  mcq_validator: 'They see only MCQ batches assigned to them and can submit answers and curriculum feedback. They receive no editing or admin access.',
  reviewer: 'A reviewer works on medical content — library, questions, practicals, concepts and media — and only within the modules and years you assign them below. They see nothing else.',
  admin: 'An admin runs operations: accounts, students, payments, vouchers, email and support. They cannot author or edit medical content.',
  editor: 'An editor holds every console tab except Settings, Audit and Access Control, and can promote or demote anyone below them. They are not confined to any module or year.',
}

type PendingAction =
  | { kind: 'extend'; plan: string; days: number | null; note: string }
  | { kind: 'cancel'; immediate: boolean }
  | { kind: 'access'; status: 'active' | 'suspended' }
  | { kind: 'password' }
  /** Set a new password directly — editor-and-above, and only for accounts below editor. */
  | { kind: 'setPassword'; password: string }
  | { kind: 'profile'; name: string; email: string; notes: string }
  | { kind: 'role'; role: StoredRole }
  /**
   * A university/year move — editor-and-above only. Kept apart from the plain
   * profile edit above: that PATCH never persisted these two fields, and the
   * dedicated endpoint resets cohort-scoped progress, so it needs its own
   * confirmation screen rather than sharing the profile form's.
   */
  | { kind: 'enrollment'; universityId: string; year: string }

const PLAN_OPTIONS = ['All access']

interface EnrollmentChangeRequest {
  id: string
  field: 'university' | 'year'
  currentValue: string | null
  requestedValue: string
  reason: string
  status: string
  createdAt: string
  student?: { name?: string | null; email?: string | null; username?: string | null; profileIcon?: string | null }
}

/**
 * The visible roster as a spreadsheet.
 *
 * Exports exactly what is on screen, filters included, because an export that
 * quietly returns everything is the kind of thing that gets pasted into a report
 * and believed. Every field is quoted and internal quotes are doubled, so a name
 * containing a comma cannot shift the remaining columns.
 */
function toCsv(rows: AdminUser[]): string {
  const header = ['Name', 'Email', 'University', 'Year', 'Plan', 'Entitlement', 'Expires', 'Role', 'Access', 'Answered', 'Accuracy', 'Readiness', 'Joined', 'Last active']
  const cell = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`
  const lines = rows.map((u) => [
    u.name, u.email, u.universityId, u.year,
    u.entitlement.plan, u.entitlement.state, u.entitlement.expiresAt ?? '',
    u.identity?.role ?? 'never signed in', u.identity?.accessStatus ?? '',
    u.performance.questionsAnswered, Math.round(u.performance.accuracy), Math.round(u.performance.readiness),
    u.joined, u.lastActive,
  ].map(cell).join(','))
  return [header.map(cell).join(','), ...lines].join('\n')
}

function downloadCsv(rows: AdminUser[]): void {
  const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `nishany-users-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export function UsersManagement() {
  const [universities] = useUniversityCatalogue()
  const { users, loading, error, load, passwordResetAvailable, setError } = useAdminUsers()
  const [filters, setFilters] = useState<UserFilters>({})
  const [query, setQuery] = useState('')
  const identity = useIdentity()
  const t = useT()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<AdminUserDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [pending, setPending] = useState<PendingAction | null>(null)
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [resetLink, setResetLink] = useState<string | null>(null)
  const [activity, setActivity] = useState<UserActivity | null>(null)
  const [activityBusy, setActivityBusy] = useState(false)
  const [enrollmentRequests, setEnrollmentRequests] = useState<EnrollmentChangeRequest[]>([])
  const [enrollmentNote, setEnrollmentNote] = useState('')
  const [enrollmentBusy, setEnrollmentBusy] = useState<string | null>(null)
  const [enrollmentLoading, setEnrollmentLoading] = useState(false)
  const [enrollmentError, setEnrollmentError] = useState('')
  /**
   * The roles this actor may give this person.
   *
   * The same function the server runs, so the control cannot offer a change the
   * route would refuse. Their current role is dropped: "set them to what they
   * already are" is not a choice, and offering it is how a one-option dropdown
   * that does nothing gets built.
   */
  const offerableRoles = useMemo(
    () => assignableRoles(identity.role ?? '', detail?.identity?.role ?? 'student')
      .filter((role) => role !== detail?.identity?.role),
    [identity.role, detail?.identity?.role],
  )

  // Search is debounced into the server query rather than filtering in the
  // browser, because the list is capped server-side and a local filter would
  // only ever search the page that happened to load.
  useEffect(() => {
    const timer = setTimeout(() => setFilters((f) => ({ ...f, query: query.trim() || undefined })), 250)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => { void load(filters) }, [filters, load])

  const loadEnrollmentRequests = useCallback(async () => {
    if (!API_MODE) return
    setEnrollmentLoading(true)
    try {
      const response = await apiGet<{ requests: EnrollmentChangeRequest[] }>('/admin/enrollment-change-requests?status=pending')
      setEnrollmentRequests(response.requests)
      setEnrollmentError('')
    } catch {
      setEnrollmentError('Could not load enrollment change requests.')
    } finally {
      setEnrollmentLoading(false)
    }
  }, [])

  useEffect(() => { void loadEnrollmentRequests() }, [loadEnrollmentRequests])

  async function decideEnrollmentRequest(id: string, decision: 'approve' | 'reject') {
    if (enrollmentNote.trim().length < 8) {
      setEnrollmentError('Write an admin note of at least 8 characters before deciding.')
      return
    }
    setEnrollmentBusy(id)
    setEnrollmentError('')
    try {
      await apiPost(`/admin/enrollment-change-requests/${encodeURIComponent(id)}/${decision}`, { note: enrollmentNote })
      setEnrollmentNote('')
      await loadEnrollmentRequests()
      await refresh()
    } catch (error) {
      setEnrollmentError(error instanceof Error ? error.message : 'The enrollment request was refused.')
    } finally {
      setEnrollmentBusy(null)
    }
  }

  const openUser = useCallback(async (id: string) => {
    setSelectedId(id)
    setPending(null)
    setReason('')
    setResetLink(null)
    setNotice('')
    setActivity(null)
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
      } else if (pending.kind === 'setPassword') {
        if (pending.password.length < 8) { setNotice(t('The password must be at least 8 characters.')); setBusy(false); return }
        await changePassword(selectedId, { password: pending.password, reason })
        setNotice(t('Password set. Share it with the user over a channel they trust — it is not emailed.'))
      } else if (pending.kind === 'role') {
        await setUserRole(selectedId, { role: pending.role, reason })
        setNotice(`Role changed to ${ROLE_LABEL[pending.role]}.`)
      } else if (pending.kind === 'profile') {
        await updateProfile(selectedId, {
          name: pending.name, email: pending.email, notes: pending.notes, reason,
        })
        setNotice('Profile updated.')
      } else if (pending.kind === 'enrollment') {
        const result = await changeEnrollment(selectedId, {
          universityId: pending.universityId, year: pending.year, reason,
        })
        const label = (snapshot: { universityId: string | null; year: string | null }) => {
          const uni = universities.find((u) => u.id === snapshot.universityId)
          return `${uni?.short ?? snapshot.universityId ?? '—'}${snapshot.year ? ` · ${snapshot.year}` : ''}`
        }
        setNotice(
          `${t('Moved from')} ${label(result.from)} ${t('to')} ${label(result.to)}. ` +
          `${result.aggregates.questionsAnswered.toLocaleString()} ${t('questions answered so far in the new cohort')} ` +
          `(${Math.round(result.aggregates.accuracy)}% ${t('accuracy')}).`,
        )
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

      <Panel className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            <h3 className="text-[13.5px] font-bold text-ink">Pending enrollment changes</h3>
            <p className="mt-0.5 text-[12px] text-ink-3">Students can request a locked university or year change; admins approve or reject with an audit note.</p>
          </div>
          <Button size="sm" variant="ghost" iconLeft={RefreshCw} loading={enrollmentLoading} onClick={() => void loadEnrollmentRequests()}>Refresh</Button>
        </div>
        {enrollmentError && <p role="alert" className="border-b border-line bg-warning-tint px-4 py-2 text-[12.5px] text-warning">{enrollmentError}</p>}
        <div className="p-4">
          {enrollmentRequests.length === 0 ? (
            <p className="text-[12.5px] text-ink-3">No pending enrollment changes.</p>
          ) : (
            <div className="space-y-3">
              <Field label="Admin note" hint="Stored with the approve/reject decision.">
                <TextInput value={enrollmentNote} onChange={(event) => setEnrollmentNote(event.target.value)} placeholder="Why is this request being accepted or refused?" />
              </Field>
              <Table>
                <thead><tr><Th>Student</Th><Th>Requested change</Th><Th>Reason</Th><Th align="end">Decision</Th></tr></thead>
                <tbody>
                  {enrollmentRequests.map((request) => (
                    <Tr key={request.id}>
                      <Td>
                        <p className="font-medium text-ink">{request.student?.name || request.student?.username || 'Student'}</p>
                        <p className="text-[11.5px] text-ink-3">{request.student?.email ?? request.id}</p>
                      </Td>
                      <Td className="text-[12.5px] text-ink-2">
                        <span className="font-medium capitalize text-ink">{request.field}</span>
                        <span className="tnum font-mono"> · {request.currentValue ?? 'unset'} → {request.requestedValue}</span>
                      </Td>
                      <Td className="max-w-sm text-[12.5px] text-ink-2">{request.reason}</Td>
                      <Td align="end">
                        <div className="inline-flex gap-1.5">
                          <Button size="sm" variant="primary" loading={enrollmentBusy === request.id} onClick={() => void decideEnrollmentRequest(request.id, 'approve')}>Approve</Button>
                          <Button size="sm" variant="secondary" loading={enrollmentBusy === request.id} onClick={() => void decideEnrollmentRequest(request.id, 'reject')}>Reject</Button>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </Panel>

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
            <Button size="sm" variant="ghost" iconLeft={RefreshCw} loading={loading} onClick={() => void refresh()}>Refresh</Button>
            <Button size="sm" variant="ghost" iconLeft={Download} disabled={!users.length} onClick={() => downloadCsv(users)}>Export</Button>
            <span className="ms-auto tnum font-mono text-[11.5px] text-ink-3">{users.length} shown</span>
          </div>

          <Table>
            <thead>
              <tr>
                <Th className="pl-4">User</Th>
                <Th>University · Year</Th>
                <Th>Subscription</Th>
                <Th align="end">Answered</Th>
                <Th align="end">Accuracy</Th>
                <Th>Access</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: AdminUser) => {
                const uni = universities.find((x) => x.id === u.universityId)
                return (
                  <Tr key={u.id} hover onClick={() => void openUser(u.id)} className={cn('cursor-pointer', selectedId === u.id && 'bg-primary-tint')}>
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
                    <Td align="end" className="tnum font-mono text-ink-2">{u.performance.questionsAnswered.toLocaleString()}</Td>
                    <Td align="end" className="tnum font-mono text-ink-2">{Math.round(u.performance.accuracy)}%</Td>
                    <Td>
                      {!u.identity
                        ? <Badge tone="neutral">Never signed in</Badge>
                        : u.identity.accessStatus === 'suspended'
                          ? <Badge tone="danger">Suspended</Badge>
                          : <Badge tone={u.identity.role && u.identity.role !== 'student' ? 'primary' : 'success'}>{u.identity.role && u.identity.role !== 'student' ? ROLE_LABEL[u.identity.role] : 'Active'}</Badge>}
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

          {selectedId && detailLoading && <LoadingRegion><SkeletonFields fields={5} /></LoadingRegion>}

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
                    {detail.identity?.role && detail.identity.role !== 'student' && <Badge tone="primary">{ROLE_LABEL[detail.identity.role]}</Badge>}
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
                    onClick={() => setPending({ kind: 'extend', plan: 'All access', days: 30, note: '' })}>
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
                  {/* Set a password directly — editor-and-above only, and only for an
                      account below editor. The server enforces both, so a control that
                      would be refused is never shown: hidden for admins (rank 1) and
                      when the target is an editor or super admin. */}
                  {identity.rank >= 2 && rank(detail.identity?.role ?? 'student') < 2 && (
                    <Button size="sm" variant="secondary" iconLeft={KeyRound}
                      onClick={() => setPending({ kind: 'setPassword', password: '' })}>{t('Set password')}</Button>
                  )}
                  <Button size="sm" variant="ghost" iconLeft={UserCog}
                    onClick={() => setPending({
                      kind: 'profile', name: detail.name ?? '', email: detail.email ?? '', notes: detail.notes ?? '',
                    })}>Edit profile</Button>
                  {/* University/year is its own audited action, gated past the Users
                      tab to editor-and-above: an admin can hold this tab (rank 1) but
                      the server refuses the move with a 403, so it is never offered
                      here either. Moving cohorts resets what progress the student
                      sees, which the confirmation screen below states plainly. */}
                  {identity.rank >= 2 && (
                    <Button size="sm" variant="ghost" iconLeft={GraduationCap}
                      onClick={() => setPending({
                        kind: 'enrollment',
                        universityId: detail.universityId ?? '',
                        year: detail.year ?? '',
                      })}>{t('Change university & year')}</Button>
                  )}
{/* Built from the same rule the server enforces, so nothing offered here
                      can be refused. A super admin is stated, never offered: their
                      role comes from the server's email allowlist and has no row
                      to change. */}
                  {detail.identity?.role === 'super_admin' ? (
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-3">
                      <Icon icon={ShieldPlus} size={14} />Super admin — set in server configuration
                    </span>
                  ) : offerableRoles.length > 0 ? (
                    <Select
                      aria-label="Change role"
                      className="h-9 w-auto min-w-[10rem] text-[12.5px]"
                      value=""
                      disabled={!detail.identity}
                      onChange={(event) => { if (event.target.value) setPending({ kind: 'role', role: event.target.value as StoredRole }) }}
                    >
                      <option value="">Change role…</option>
                      {offerableRoles.map((role) => <option key={role} value={role}>{ROLE_LABEL[role]}</option>)}
                    </Select>
                  ) : (
                    <span className="text-[11.5px] text-ink-3">Changing this person's role is above your level.</span>
                  )}
                </div>

                {!detail.identity && (
                  <p className="mt-2 text-[11.5px] text-ink-3">This person has never signed in, so there is no account to suspend or reset. A subscription can still be granted — the profile is created when you do.</p>
                )}
                {!passwordResetAvailable && (
                  <p className="mt-2 text-[11.5px] text-ink-3">Password resets are unavailable until <span className="font-mono">SUPABASE_URL</span> and <span className="font-mono">SUPABASE_SERVICE_ROLE_KEY</span> are set on the server.</p>
                )}
              </div>

              {/* A reviewer is the only role confined to part of the catalogue,
                  so this appears for them and nobody else. It is its own audited
                  action rather than part of the promotion, because scope is
                  changed far more often than the role that needs it. */}
              {detail.identity?.role === 'reviewer' && (
                <ReviewerScopeEditor
                  userId={detail.id}
                  scope={detail.identity.contentScope ?? null}
                  onSaved={() => void openUser(detail.id)}
                />
              )}

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

                  {pending.kind === 'setPassword' && (
                    <div className="grid gap-2">
                      <p className="text-[12.5px] text-ink">
                        {t('Set a new password for {name}. It is applied immediately and is not stored or emailed — share it over a channel they trust.')
                          .replace('{name}', detail.name || detail.email || t('this user'))}
                      </p>
                      <Field label={t('New password')} hint={t('At least 8 characters')}>
                        <TextInput
                          type="password"
                          autoComplete="new-password"
                          value={pending.password}
                          onChange={(e) => setPending({ ...pending, password: e.target.value })}
                        />
                      </Field>
                    </div>
                  )}

                  {pending.kind === 'role' && (
                    <p className="mb-2 text-[12.5px] text-ink">{ROLE_CONSEQUENCE[pending.role]}</p>
                  )}

                  {pending.kind === 'profile' && (
                    <div className="grid gap-2">
                      <Field label="Name"><TextInput value={pending.name} onChange={(e) => setPending({ ...pending, name: e.target.value })} /></Field>
                      <Field label="Email"><TextInput value={pending.email} onChange={(e) => setPending({ ...pending, email: e.target.value })} /></Field>
                      <Field label="Internal note"><Textarea className="min-h-16" value={pending.notes} onChange={(e) => setPending({ ...pending, notes: e.target.value })} /></Field>
                    </div>
                  )}

                  {pending.kind === 'enrollment' && (() => {
                    const oldUni = universities.find((u) => u.id === detail.universityId)
                    const newUni = universities.find((u) => u.id === pending.universityId)
                    const newYears = newUni?.years ?? []
                    const oldLabel = detail.universityId || detail.year
                      ? `${oldUni?.short ?? detail.universityId ?? t('no university set')}${detail.year ? ` · ${detail.year}` : ''}`
                      : t('no university or year set')
                    const newLabel = pending.universityId && pending.year
                      ? `${newUni?.short ?? pending.universityId} · ${pending.year}`
                      : t('choose a university and year below')
                    const studentLabel = detail.name || detail.email || t('This student')
                    const progressNote = t(
                      'Progress from {old} is kept. {student} starts fresh in {new}. If they ever return to {old}, their old progress reappears exactly.',
                    )
                      .replace(/\{old\}/g, oldLabel)
                      .replace(/\{student\}/g, studentLabel)
                      .replace(/\{new\}/g, newLabel)
                    return (
                      <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="rounded-lg border border-line bg-surface px-3 py-2">
                            <p className="text-[11px] uppercase tracking-[0.06em] text-ink-3">{t('Current')}</p>
                            <p className="mt-0.5 text-[12.5px] font-medium text-ink">{oldLabel}</p>
                          </div>
                          <div className="rounded-lg border border-line bg-surface px-3 py-2">
                            <p className="text-[11px] uppercase tracking-[0.06em] text-ink-3">{t('New')}</p>
                            <p className="mt-0.5 text-[12.5px] font-medium text-ink">{newLabel}</p>
                          </div>
                        </div>
                        <Field label={t('New university')}>
                          <Select
                            value={pending.universityId}
                            onChange={(e) => setPending({ kind: 'enrollment', universityId: e.target.value, year: '' })}
                          >
                            <option value="">{t('Choose a university…')}</option>
                            {universities.map((u) => <option key={u.id} value={u.id}>{u.short}</option>)}
                          </Select>
                        </Field>
                        <Field label={t('New year')} hint={!pending.universityId ? t('Choose a university first.') : undefined}>
                          <Select
                            value={pending.year}
                            disabled={!pending.universityId}
                            onChange={(e) => setPending({ ...pending, year: e.target.value })}
                          >
                            <option value="">{t('Choose a year…')}</option>
                            {newYears.map((y) => <option key={y.id} value={y.year}>{y.year}</option>)}
                          </Select>
                        </Field>
                        <p className="rounded-lg border border-warning/40 bg-warning-tint px-3 py-2.5 text-[12.5px] leading-relaxed text-ink">
                          {progressNote}
                        </p>
                        <p className="text-[11.5px] text-ink-3">
                          {t('Changed by')} <span className="font-medium text-ink">{identity.displayName}</span>
                          {identity.role && <> ({t(ROLE_LABEL[identity.role])})</>}
                        </p>
                      </div>
                    )
                  })()}

                  <Field label="Reason" hint="Stored with the change and shown in the history below.">
                    <TextInput value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Why are you doing this?" />
                  </Field>
                  <div className="mt-2 flex gap-1.5">
                    <Button
                      size="sm"
                      variant={pending.kind === 'access' && pending.status === 'suspended' ? 'danger' : 'primary'}
                      loading={busy}
                      disabled={
                        (pending.kind === 'enrollment' && (!pending.universityId || !pending.year))
                        || (pending.kind === 'setPassword' && pending.password.length < 8)
                      }
                      onClick={() => void commit()}
                    >Confirm</Button>
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

              {/* ---- What they have actually stored ---- */}
              <div className="px-4 py-3">
                <p className="mb-2 flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                  <Icon icon={Activity} size={13} />Activity &amp; data
                </p>
                {!detail.identity && (
                  <p className="text-[12px] text-ink-3">This person has never signed in, so the product has stored nothing for them.</p>
                )}
                {detail.identity && !activity && (
                  <Button size="sm" variant="secondary" loading={activityBusy} onClick={async () => {
                    setActivityBusy(true)
                    try { setActivity(await fetchUserActivity(detail.id)) }
                    catch { setNotice('Could not read this account\u2019s stored data.') }
                    finally { setActivityBusy(false) }
                  }}>Load stored data</Button>
                )}
                {activity && (
                  <>
                    <p className="mb-1.5 text-[12px] text-ink-2">
                      <span className="tnum font-mono text-ink">{activity.totalDocuments}</span> saved {activity.totalDocuments === 1 ? 'document' : 'documents'}
                      {activity.lastActivity && <> · last touched {shortDate(activity.lastActivity)}</>}
                    </p>
                    {activity.families.length === 0 && <p className="text-[12px] text-ink-3">Nothing saved yet.</p>}
                    <ul className="space-y-1">
                      {activity.families.map((f) => (
                        <li key={f.family} className="flex items-baseline gap-2 text-[12px]">
                          <span className="min-w-0 flex-1 truncate text-ink">{f.family}</span>
                          <span className="tnum font-mono text-ink-2">{f.documents}</span>
                          <span className="tnum w-24 text-end font-mono text-[11px] text-ink-3">{shortDate(f.lastUpdated)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1.5 text-[11.5px] text-ink-3">
                      Counts and dates only. What they wrote is not read here.
                    </p>
                  </>
                )}
              </div>

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
