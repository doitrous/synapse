import { useEffect, useState } from 'react'
import { RefreshCw, ShieldCheck, UserCog } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { apiGet, apiPost } from '@/lib/api'

interface AccessUser {
  userId: string
  email: string | null
  role: 'student' | 'admin'
  status: 'active' | 'suspended'
  createdAt: string
}

export function AccountAccessPanel() {
  const [users, setUsers] = useState<AccessUser[]>([])
  const [selected, setSelected] = useState<AccessUser | null>(null)
  const [role, setRole] = useState<'student' | 'admin'>('student')
  const [reason, setReason] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  async function load() {
    setLoading(true)
    try { setUsers(await apiGet<AccessUser[]>('/access/users')); setMessage('') }
    catch { setMessage('Account roles will appear after Supabase is connected and the first account signs in.') }
    finally { setLoading(false) }
  }

  useEffect(() => { void load() }, [])

  function review(user: AccessUser) {
    setSelected(user)
    setRole(user.role)
    setReason('')
    setConfirmed(false)
    setMessage('')
  }

  async function applyRole() {
    if (!selected || !confirmed || reason.trim().length < 8) return
    setSaving(true)
    try {
      await apiPost(`/access/users/${encodeURIComponent(selected.userId)}/promote`, { role, reason })
      setMessage(`${selected.email || selected.userId} is now ${role}. The change was written to the promotion audit.`)
      setSelected(null)
      await load()
    } catch { setMessage('Role change failed. Confirm that this session is signed in as an administrator.') }
    finally { setSaving(false) }
  }

  return (
    <Panel className="mb-4 overflow-hidden">
      <PanelHeader title="Account access and explicit promotion" icon={UserCog} hint="New accounts always start as students" action={<Button size="sm" variant="ghost" iconLeft={RefreshCw} onClick={() => void load()} loading={loading}>Refresh</Button>} />
      <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 divide-y divide-line border-b border-line lg:border-b-0 lg:border-e">
          {users.map((user) => <button key={user.userId} type="button" onClick={() => review(user)} className="flex w-full items-center gap-3 px-4 py-3 text-start hover:bg-inset"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2"><Icon icon={ShieldCheck} size={16} /></span><span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-semibold text-ink">{user.email || user.userId}</span><span className="mt-0.5 block truncate font-mono text-[10.5px] text-ink-2">{user.userId}</span></span><span className="flex flex-col items-end gap-1"><Badge tone={user.role === 'admin' ? 'accent' : 'neutral'}>{user.role}</Badge><Badge tone={user.status === 'active' ? 'success' : 'danger'} dot>{user.status}</Badge></span></button>)}
          {!loading && users.length === 0 && <div className="px-5 py-10 text-center"><p className="text-[13px] font-semibold text-ink">No authenticated accounts yet</p><p className="mt-1 text-[12px] text-ink-2">Accounts appear here after their first verified sign-in.</p></div>}
        </div>
        <div className="bg-surface-2/35 p-4 sm:p-5">
          {selected ? <div className="space-y-4"><div><div className="flex flex-wrap items-center gap-2"><p className="text-[13px] font-semibold text-ink">Review {selected.email || selected.userId}</p><Badge tone={selected.status === 'active' ? 'success' : 'danger'} dot>{selected.status}</Badge></div><p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">Changing a role requires a reason and explicit confirmation. The server—not this form—enforces the result.</p>{selected.status === 'suspended' && <p className="mt-2 text-[11.5px] font-semibold text-danger">Suspended accounts cannot receive a role change until they are reactivated.</p>}</div><Field label="Role"><Select value={role} disabled={selected.status === 'suspended'} onChange={(event) => setRole(event.target.value as 'student' | 'admin')}><option value="student">Student</option><option value="admin">Administrator</option></Select></Field><Field label="Reason" hint="Minimum 8 characters; stored in the audit"><TextInput value={reason} disabled={selected.status === 'suspended'} onChange={(event) => setReason(event.target.value)} placeholder="Operational reason for this change" /></Field><label className="flex cursor-pointer items-start gap-2 text-[11.5px] leading-relaxed text-ink-2"><input type="checkbox" className="mt-0.5 size-4 accent-accent" checked={confirmed} disabled={selected.status === 'suspended'} onChange={(event) => setConfirmed(event.target.checked)} /> I confirm that this person should receive the selected level of access.</label><div className="flex gap-2"><Button variant="primary" onClick={() => void applyRole()} loading={saving} disabled={selected.status === 'suspended' || !confirmed || reason.trim().length < 8}>Apply role change</Button><Button variant="ghost" onClick={() => setSelected(null)}>Cancel</Button></div></div> : <div><p className="text-[13px] font-semibold text-ink">Select an account</p><p className="mt-1 text-[12px] leading-relaxed text-ink-2">No account becomes an administrator during signup. Promotion happens only here or through an equally audited server action.</p></div>}
          {message && <p role="status" className="mt-4 rounded-lg border border-line bg-surface px-3 py-2.5 text-[11.5px] leading-relaxed text-ink-2">{message}</p>}
        </div>
      </div>
    </Panel>
  )
}
