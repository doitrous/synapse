import { useEffect, useState } from 'react'
import { DatabaseBackup, Download, RefreshCw } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { apiDownload, apiGet, apiPost } from '@/lib/api'
import { formatDateTime } from '@/lib/format'

interface Snapshot {
  id: string
  label: string
  createdBy: string
  createdAt: string
  sizeBytes: number
}

export function DataBackupsPanel() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState('')

  async function load() {
    setLoading(true)
    try { setSnapshots(await apiGet<Snapshot[]>('/backups')); setMessage('') }
    catch { setMessage('Backup registry is available when the live MariaDB API is connected.') }
    finally { setLoading(false) }
  }
  useEffect(() => { void load() }, [])

  async function create() {
    setCreating(true)
    try { await apiPost('/backups', { label: `Manual recovery point ${new Date().toISOString()}` }); await load(); setMessage('Recovery point created in MariaDB.') }
    catch { setMessage('Could not create a recovery point. Confirm admin access and database health.') }
    finally { setCreating(false) }
  }

  return <Panel className="mb-4"><PanelHeader title="MariaDB recovery points" icon={DatabaseBackup} hint="Daily automatically · manual on demand" action={<div className="flex gap-2"><Button size="sm" variant="ghost" iconLeft={RefreshCw} onClick={() => void load()} loading={loading}>Refresh</Button><Button size="sm" variant="primary" iconLeft={DatabaseBackup} onClick={() => void create()} loading={creating}>Create recovery point</Button></div>} /><div className="divide-y divide-line">{snapshots.slice(0, 10).map((snapshot) => <div key={snapshot.id} className="flex flex-wrap items-center gap-3 px-4 py-3"><div className="min-w-0 flex-1"><p className="truncate text-[13px] font-semibold text-ink">{snapshot.label}</p><p className="mt-0.5 font-mono text-[10.5px] text-ink-2">{formatDateTime(new Date(snapshot.createdAt))} · {(snapshot.sizeBytes / 1024).toFixed(1)} KB · {snapshot.createdBy}</p></div><Badge tone={snapshot.createdBy === 'system:daily' ? 'success' : 'neutral'}>{snapshot.createdBy === 'system:daily' ? 'Automatic' : 'Manual'}</Badge><Button size="sm" variant="ghost" iconLeft={Download} onClick={() => void apiDownload(`/backups/${encodeURIComponent(snapshot.id)}/download`, `${snapshot.id}.json`)}>Download</Button></div>)}{!loading && snapshots.length === 0 && <div className="px-5 py-10 text-center"><p className="text-[13px] font-semibold text-ink">No recovery points listed yet</p><p className="mt-1 text-[12px] text-ink-2">The first automatic snapshot is created when the updated server starts.</p></div>}</div>{message && <p role="status" className="border-t border-line bg-surface-2/45 px-4 py-3 text-[11.5px] text-ink-2">{message}</p>}</Panel>
}
