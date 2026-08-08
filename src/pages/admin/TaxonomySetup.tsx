import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Network, Plus, Trash2, ChevronRight, RotateCcw, Hash, Upload, TriangleAlert } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Field, TextInput, Textarea } from '@/components/ui/Field'
import { SystemBadge } from '@/components/ui/SystemBadge'
import { useSystemColor, setSystemColor, SYSTEM_COLOR_PALETTE } from '@/data/systemColors'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { taxonomyTree, systemId, topicIdOf, subtopicIdOf, microtopicIdOf, nanotopicIdOf } from '@/data/taxonomy'

const KEY = 'synapse-taxonomy-tree-v3'
const slug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'item'

interface Nano { id: string; title: string; nanId: string }
interface Micro { id: string; title: string; micId: string; nanos: Nano[] }
interface Sub { id: string; title: string; subId: string; micros: Micro[] }
interface Topic { id: string; title: string; tpcId: string; subs: Sub[] }
interface Sys { id: string; name: string; short: string; sysId: string; topics: Topic[] }

/** A few demo microtopics (with nanotopics) so every level is populated. */
const DEMO_MICROS: Record<string, Record<string, string[]>> = {
  'hf-patho': { 'Frank–Starling curve': ['Preload reserve', 'Length–tension relationship'], 'Neurohormonal activation': [] },
  'acs-dx': { 'ECG territories': ['Inferior leads (II, III, aVF)'], 'Troponin kinetics': [] },
  'asthma-patho': { 'Type-2 inflammation': [] },
  'diur-sites': { 'Nephron transporters': [] },
}

function seed(): Sys[] {
  return taxonomyTree().map((s) => ({
    id: s.id, name: s.name, short: s.short, sysId: s.sysId,
    topics: s.topics.map((t) => ({
      id: t.id, title: t.title, tpcId: t.tpcId,
      subs: t.subtopics.map((st) => ({
        id: st.id, title: st.title, subId: st.subId,
        micros: Object.entries(DEMO_MICROS[st.id] ?? {}).map(([m, nanos]) => ({
          id: slug(m), title: m, micId: microtopicIdOf(slug(m)),
          nanos: nanos.map((n) => ({ id: slug(n), title: n, nanId: nanotopicIdOf(slug(n)) })),
        })),
      })),
    })),
  }))
}

/** Every ID currently in the tree, for uniqueness checks. */
function allIds(tree: Sys[]): Set<string> {
  const set = new Set<string>()
  tree.forEach((s) => {
    set.add(s.id)
    s.topics.forEach((t) => { set.add(t.id); t.subs.forEach((su) => { set.add(su.id); su.micros.forEach((m) => { set.add(m.id); m.nanos.forEach((n) => set.add(n.id)) }) }) })
  })
  return set
}

/** Guarantee a fresh slug ID — appends -2, -3… if the name's slug is taken. */
function uniqueId(base: string, taken: Set<string>): string {
  let candidate = base
  let n = 2
  while (taken.has(candidate)) candidate = `${base}-${n++}`
  return candidate
}

function Id({ value }: { value: string }) {
  return <span className="inline-flex items-center gap-1 rounded bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-2"><Icon icon={Hash} size={9} className="text-ink-3" />{value}</span>
}

/** Click-to-rename title. */
function Editable({ value, onSave, className }: { value: string; onSave: (v: string) => void; className?: string }) {
  const [editing, setEditing] = useState(false)
  const [v, setV] = useState(value)
  if (editing) {
    return (
      <input
        autoFocus value={v}
        onChange={(e) => setV(e.target.value)}
        onBlur={() => { setEditing(false); if (v.trim() && v !== value) onSave(v.trim()) }}
        onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') { setV(value); setEditing(false) } }}
        className={cn('rounded border border-accent bg-surface px-1.5 py-0.5 text-ink outline-none', className)}
      />
    )
  }
  return <button type="button" onClick={() => { setV(value); setEditing(true) }} title="Click to rename" className={cn('rounded px-1 py-0.5 text-start hover:bg-inset', className)}>{value || '—'}</button>
}

function AddInline({ placeholder, onAdd }: { placeholder: string; onAdd: (value: string) => void }) {
  const [v, setV] = useState('')
  return (
    <div className="flex items-center gap-1.5">
      <TextInput value={v} onChange={(e) => setV(e.target.value)} placeholder={placeholder} className="h-8 text-[12.5px]" onKeyDown={(e) => { if (e.key === 'Enter' && v.trim()) { onAdd(v.trim()); setV('') } }} />
      <Button type="button" size="sm" variant="secondary" iconLeft={Plus} onClick={() => { if (v.trim()) { onAdd(v.trim()); setV('') } }}>Add</Button>
    </div>
  )
}

/** Colored system badge that opens a swatch palette to recolour the system. */
function SystemColorControl({ systemId, short }: { systemId: string; short: string }) {
  const color = useSystemColor(systemId)
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} title="Change colour" className="rounded-[7px] outline-offset-2 hover:outline hover:outline-1 hover:outline-line-2">
        <SystemBadge short={short} color={color} />
      </button>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-10" aria-label="Close" onClick={() => setOpen(false)} />
          <div className="absolute start-0 top-8 z-20 flex w-40 flex-wrap gap-1.5 rounded-lg border border-line bg-surface p-2 shadow-pop">
            {SYSTEM_COLOR_PALETTE.map((c) => (
              <button key={c} type="button" onClick={() => { setSystemColor(systemId, c); setOpen(false) }} className={cn('size-6 rounded-md border', color.toLowerCase() === c.toLowerCase() ? 'border-ink' : 'border-line-2')} style={{ backgroundColor: c }} aria-label={`Set colour ${c}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function TaxonomySetup() {
  const [tree, setTree] = usePersistentState<Sys[]>(KEY, seed)
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [importing, setImporting] = useState(false)
  const [importText, setImportText] = useState('')
  const [report, setReport] = useState<{ systems: number; topics: number; subs: number; micros: number; nanos: number; skipped: number; errors: string[] } | null>(null)
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }))

  const totals = {
    systems: tree.length,
    topics: tree.reduce((n, s) => n + s.topics.length, 0),
    subs: tree.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.subs.length, 0), 0),
    micros: tree.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.subs.reduce((k, su) => k + su.micros.length, 0), 0), 0),
    nanos: tree.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.subs.reduce((k, su) => k + su.micros.reduce((j, mi) => j + mi.nanos.length, 0), 0), 0), 0),
  }

  const update = (fn: (draft: Sys[]) => Sys[]) => setTree((cur) => fn(structuredClone(cur)))
  const findSys = (d: Sys[], id: string) => d.find((x) => x.id === id)!
  const findTop = (d: Sys[], sid: string, tid: string) => findSys(d, sid).topics.find((x) => x.id === tid)!
  const findSub = (d: Sys[], sid: string, tid: string, suid: string) => findTop(d, sid, tid).subs.find((x) => x.id === suid)!
  const findMic = (d: Sys[], sid: string, tid: string, suid: string, mid: string) => findSub(d, sid, tid, suid).micros.find((x) => x.id === mid)!

  const addSystem = (name: string) => update((d) => { const id = uniqueId(slug(name), allIds(d)); return [...d, { id, name, short: name.slice(0, 3).toUpperCase(), sysId: systemId(id), topics: [] }] })
  const addTopic = (sid: string, title: string) => update((d) => { const id = uniqueId(slug(title), allIds(d)); findSys(d, sid).topics.push({ id, title, tpcId: topicIdOf(id), subs: [] }); return d })
  const addSub = (sid: string, tid: string, title: string) => update((d) => { const id = uniqueId(slug(title), allIds(d)); findTop(d, sid, tid).subs.push({ id, title, subId: subtopicIdOf(id), micros: [] }); return d })
  const addMicro = (sid: string, tid: string, suid: string, title: string) => update((d) => { const id = uniqueId(slug(title), allIds(d)); findSub(d, sid, tid, suid).micros.push({ id, title, micId: microtopicIdOf(id), nanos: [] }); return d })
  const addNano = (sid: string, tid: string, suid: string, mid: string, title: string) => update((d) => { const id = uniqueId(slug(title), allIds(d)); findMic(d, sid, tid, suid, mid).nanos.push({ id, title, nanId: nanotopicIdOf(id) }); return d })

  const renameSystem = (sid: string, name: string) => update((d) => { findSys(d, sid).name = name; return d })
  const renameTopic = (sid: string, tid: string, title: string) => update((d) => { findTop(d, sid, tid).title = title; return d })
  const renameSub = (sid: string, tid: string, suid: string, title: string) => update((d) => { findSub(d, sid, tid, suid).title = title; return d })
  const renameMicro = (sid: string, tid: string, suid: string, mid: string, title: string) => update((d) => { findMic(d, sid, tid, suid, mid).title = title; return d })
  const renameNano = (sid: string, tid: string, suid: string, mid: string, nid: string, title: string) => update((d) => { const n = findMic(d, sid, tid, suid, mid).nanos.find((x) => x.id === nid)!; n.title = title; return d })

  const removeSystem = (sid: string) => update((d) => d.filter((x) => x.id !== sid))
  const removeTopic = (sid: string, tid: string) => update((d) => { const s = findSys(d, sid); s.topics = s.topics.filter((t) => t.id !== tid); return d })
  const removeSub = (sid: string, tid: string, suid: string) => update((d) => { const t = findTop(d, sid, tid); t.subs = t.subs.filter((s) => s.id !== suid); return d })
  const removeMicro = (sid: string, tid: string, suid: string, mid: string) => update((d) => { const su = findSub(d, sid, tid, suid); su.micros = su.micros.filter((m) => m.id !== mid); return d })
  const removeNano = (sid: string, tid: string, suid: string, mid: string, nid: string) => update((d) => { const mi = findMic(d, sid, tid, suid, mid); mi.nanos = mi.nanos.filter((n) => n.id !== nid); return d })

  function runImport() {
    let sAdd = 0, tAdd = 0, suAdd = 0, mAdd = 0, nAdd = 0, skipped = 0
    const errors: string[] = []
    update((d) => {
      const taken = allIds(d)
      const newId = (name: string) => { const id = uniqueId(slug(name), taken); taken.add(id); return id }
      let sys: Sys | null = null, top: Topic | null = null, sub: Sub | null = null, mic: Micro | null = null
      importText.split(/\r?\n/).forEach((raw, i) => {
        const line = raw.trim()
        if (!line) return
        if (!/^#{1,5}\s/.test(line)) { errors.push(`Line ${i + 1}: expected a #…##### heading.`); return }
        const m = line.match(/^(#{1,5})\s+(.+)/)
        if (!m) return
        const level = m[1].length; const name = m[2].trim()
        if (level === 1) {
          const existing = d.find((x) => x.name.toLowerCase() === name.toLowerCase())
          if (existing) { sys = existing; skipped++; top = null; sub = null; mic = null; return }
          const id = newId(name); sys = { id, name, short: name.slice(0, 3).toUpperCase(), sysId: systemId(id), topics: [] }; d.push(sys); sAdd++; top = null; sub = null; mic = null
        } else if (level === 2) {
          if (!sys) { errors.push(`Line ${i + 1}: topic "${name}" has no parent system.`); return }
          const existing = sys.topics.find((x) => x.title.toLowerCase() === name.toLowerCase())
          if (existing) { top = existing; skipped++; sub = null; mic = null; return }
          const id = newId(name); top = { id, title: name, tpcId: topicIdOf(id), subs: [] }; sys.topics.push(top); tAdd++; sub = null; mic = null
        } else if (level === 3) {
          if (!top) { errors.push(`Line ${i + 1}: subtopic "${name}" has no parent topic.`); return }
          const existing = top.subs.find((x) => x.title.toLowerCase() === name.toLowerCase())
          if (existing) { sub = existing; skipped++; mic = null; return }
          const id = newId(name); sub = { id, title: name, subId: subtopicIdOf(id), micros: [] }; top.subs.push(sub); suAdd++; mic = null
        } else if (level === 4) {
          if (!sub) { errors.push(`Line ${i + 1}: microtopic "${name}" has no parent subtopic.`); return }
          const existing = sub.micros.find((x) => x.title.toLowerCase() === name.toLowerCase())
          if (existing) { mic = existing; skipped++; return }
          const id = newId(name); mic = { id, title: name, micId: microtopicIdOf(id), nanos: [] }; sub.micros.push(mic); mAdd++
        } else if (level === 5) {
          if (!mic) { errors.push(`Line ${i + 1}: nanotopic "${name}" has no parent microtopic.`); return }
          if (mic.nanos.some((x) => x.title.toLowerCase() === name.toLowerCase())) { skipped++; return }
          const id = newId(name); mic.nanos.push({ id, title: name, nanId: nanotopicIdOf(id) }); nAdd++
        }
      })
      return d
    })
    setReport({ systems: sAdd, topics: tAdd, subs: suAdd, micros: mAdd, nanos: nAdd, skipped, errors })
  }

  const template = `# Immunology\n## Hypersensitivity\n### Type I hypersensitivity\n#### Mast cell degranulation\n##### IgE cross-linking\n### Type IV hypersensitivity\n## Autoimmunity\n### Tolerance mechanisms`

  return (
    <PageContainer>
      <PageHeader
        title="Subjects & Topics"
        description="The single source of the curriculum taxonomy — Systems → Topics → Subtopics → Microtopics → Nanotopics. Names are click-to-rename; each level gets a unique, visible ID (never reused) that concepts, questions, articles, and resources tag against."
        actions={<><Link to="/admin/taxonomy/import"><Button variant="secondary" size="md" iconLeft={Upload}>Bulk import</Button></Link><Button variant="secondary" size="md" iconLeft={RotateCcw} onClick={() => setTree(seed())}>Reset</Button></>}
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[['Systems', totals.systems], ['Topics', totals.topics], ['Subtopics', totals.subs], ['Microtopics', totals.micros], ['Nanotopics', totals.nanos]].map(([label, value]) => (
          <Panel key={String(label)} className="p-4"><p className="text-[12px] font-medium text-ink-2">{label}</p><p className="tnum mt-1.5 font-mono text-[24px] font-semibold text-ink">{value}</p></Panel>
        ))}
      </div>

      <div className="mb-4"><AddInline placeholder="Add a new system (e.g. Immunology)…" onAdd={addSystem} /></div>

      <div className="space-y-3">
        {tree.map((sys) => {
          const sk = `s-${sys.id}`
          return (
            <Panel key={sys.id} className="overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line bg-surface-2/50 px-3 py-2.5">
                <button onClick={() => toggle(sk)} className="grid size-6 place-items-center text-ink-3 hover:text-ink"><Icon icon={ChevronRight} size={15} className={cn('transition-transform', (open[sk] ?? true) && 'rotate-90')} /></button>
                <SystemColorControl systemId={sys.id} short={sys.short} />
                <Editable value={sys.name} onSave={(v) => renameSystem(sys.id, v)} className="text-[14px] font-semibold text-ink" />
                <Id value={sys.sysId} />
                <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{sys.topics.length} topics</span>
                <Button variant="ghost" size="sm" iconLeft={Trash2} className="hover:text-danger" onClick={() => removeSystem(sys.id)}>Remove</Button>
              </div>
              {(open[sk] ?? true) && (
                <div className="space-y-2 p-3">
                  {sys.topics.map((top) => {
                    const tk = `t-${sys.id}-${top.id}`
                    return (
                      <div key={top.id} className="rounded-lg border border-line">
                        <div className="flex items-center gap-2 px-3 py-2">
                          <button onClick={() => toggle(tk)} className="grid size-5 place-items-center text-ink-3 hover:text-ink"><Icon icon={ChevronRight} size={14} className={cn('transition-transform', open[tk] && 'rotate-90')} /></button>
                          <Editable value={top.title} onSave={(v) => renameTopic(sys.id, top.id, v)} className="text-[13.5px] font-medium text-ink" />
                          <Id value={top.tpcId} />
                          <span className="tnum ms-auto font-mono text-[10.5px] text-ink-3">{top.subs.length}</span>
                          <button onClick={() => removeTopic(sys.id, top.id)} className="grid size-8 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label="Remove topic"><Icon icon={Trash2} size={14} /></button>
                        </div>
                        {open[tk] && (
                          <div className="space-y-1.5 border-t border-line px-3 py-2">
                            {top.subs.map((sub) => {
                              const suk = `su-${sys.id}-${top.id}-${sub.id}`
                              return (
                                <div key={sub.id} className="ms-4">
                                  <div className="flex items-center gap-2 py-1">
                                    <button onClick={() => toggle(suk)} className="grid size-5 place-items-center text-ink-3 hover:text-ink"><Icon icon={ChevronRight} size={13} className={cn('transition-transform', open[suk] && 'rotate-90')} /></button>
                                    <Editable value={sub.title} onSave={(v) => renameSub(sys.id, top.id, sub.id, v)} className="text-[12.5px] text-ink-2" />
                                    <Id value={sub.subId} />
                                    <button onClick={() => removeSub(sys.id, top.id, sub.id)} className="ms-auto grid size-7 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label="Remove subtopic"><Icon icon={Trash2} size={13} /></button>
                                  </div>
                                  {open[suk] && (
                                    <div className="ms-6 space-y-1 border-s border-line-2 py-1 ps-2">
                                      {sub.micros.map((mic) => {
                                        const mk = `m-${sys.id}-${top.id}-${sub.id}-${mic.id}`
                                        return (
                                          <div key={mic.id}>
                                            <div className="flex items-center gap-2 py-0.5">
                                              <button onClick={() => toggle(mk)} className="grid size-5 place-items-center text-ink-3 hover:text-ink"><Icon icon={ChevronRight} size={12} className={cn('transition-transform', open[mk] && 'rotate-90')} /></button>
                                              <Editable value={mic.title} onSave={(v) => renameMicro(sys.id, top.id, sub.id, mic.id, v)} className="text-[12px] text-ink-3" />
                                              <Id value={mic.micId} />
                                              {mic.nanos.length > 0 && <span className="tnum font-mono text-[10px] text-ink-3">{mic.nanos.length}</span>}
                                              <button onClick={() => removeMicro(sys.id, top.id, sub.id, mic.id)} className="ms-auto grid size-6 place-items-center rounded text-ink-3 hover:text-danger" aria-label="Remove microtopic"><Icon icon={Trash2} size={12} /></button>
                                            </div>
                                            {open[mk] && (
                                              <div className="ms-5 space-y-1 border-s border-line-2 py-1 ps-2">
                                                {mic.nanos.map((nan) => (
                                                  <div key={nan.id} className="flex items-center gap-2 py-0.5">
                                                    <Editable value={nan.title} onSave={(v) => renameNano(sys.id, top.id, sub.id, mic.id, nan.id, v)} className="text-[11.5px] text-ink-3" />
                                                    <Id value={nan.nanId} />
                                                    <button onClick={() => removeNano(sys.id, top.id, sub.id, mic.id, nan.id)} className="ms-auto grid size-6 place-items-center rounded text-ink-3 hover:text-danger" aria-label="Remove nanotopic"><Icon icon={Trash2} size={11} /></button>
                                                  </div>
                                                ))}
                                                <AddInline placeholder="Add nanotopic…" onAdd={(v) => addNano(sys.id, top.id, sub.id, mic.id, v)} />
                                              </div>
                                            )}
                                          </div>
                                        )
                                      })}
                                      <AddInline placeholder="Add microtopic…" onAdd={(v) => addMicro(sys.id, top.id, sub.id, v)} />
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                            <div className="ms-4 pt-1"><AddInline placeholder="Add subtopic…" onAdd={(v) => addSub(sys.id, top.id, v)} /></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  <div className="pt-1"><AddInline placeholder="Add topic…" onAdd={(v) => addTopic(sys.id, v)} /></div>
                </div>
              )}
            </Panel>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11.5px] text-ink-3">
        <Icon icon={Network} size={13} />
        IDs are generated automatically and never reused — if a name's slug is taken, a numeric suffix is appended.
      </div>

      {/* Bulk import dialog */}
      {importing && (
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 animate-fade sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Bulk import taxonomy" onMouseDown={() => setImporting(false)}>
          <Panel className="animate-pop flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:max-w-xl sm:rounded-xl" onMouseDown={(e) => e.stopPropagation()}>
            <PanelHeader title="Bulk import taxonomy" icon={Upload} />
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
              <ol className="list-inside list-decimal space-y-1 text-[12.5px] text-ink-2">
                <li>Use Markdown heading depth for the level: <code className="rounded bg-inset px-1 font-mono text-[11px]">#</code> system, <code className="rounded bg-inset px-1 font-mono text-[11px]">##</code> topic, <code className="rounded bg-inset px-1 font-mono text-[11px]">###</code> subtopic, <code className="rounded bg-inset px-1 font-mono text-[11px]">####</code> microtopic, <code className="rounded bg-inset px-1 font-mono text-[11px]">#####</code> nanotopic.</li>
                <li>Each node is created under the most recent parent above it.</li>
                <li>Names matching an existing node at that level are reused (not duplicated); every new node gets a unique ID.</li>
                <li>Press <b>Import</b> for a report of what was added, reused, and rejected.</li>
              </ol>
              <Field label="Taxonomy"><Textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder={template} className="min-h-[12rem] font-mono text-[12px]" /></Field>
              {report && (
                <div className="rounded-lg border border-line bg-surface-2/50 p-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="success">{report.systems} systems</Badge>
                    <Badge tone="success">{report.topics} topics</Badge>
                    <Badge tone="success">{report.subs} subtopics</Badge>
                    <Badge tone="success">{report.micros} microtopics</Badge>
                    <Badge tone="success">{report.nanos} nanotopics</Badge>
                    <Badge tone="neutral">{report.skipped} reused</Badge>
                    <Badge tone={report.errors.length ? 'danger' : 'neutral'}>{report.errors.length} rejected</Badge>
                  </div>
                  {report.errors.length > 0 && <ul className="mt-2 max-h-32 space-y-0.5 overflow-y-auto">{report.errors.map((e, i) => <li key={i} className="flex items-start gap-1.5 text-[11.5px] text-danger"><Icon icon={TriangleAlert} size={12} className="mt-0.5 shrink-0" />{e}</li>)}</ul>}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-line bg-surface-2/40 px-5 py-3">
              <Button variant="ghost" onClick={() => setImporting(false)}>Close</Button>
              <Button variant="primary" iconLeft={Upload} onClick={runImport} disabled={!importText.trim()}>Import</Button>
            </div>
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
