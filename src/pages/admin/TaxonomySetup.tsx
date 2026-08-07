import { useState } from 'react'
import { Network, Plus, Trash2, ChevronRight, RotateCcw, Hash } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { TextInput } from '@/components/ui/Field'
import { SubjectDot } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { taxonomyTree, systemId, topicIdOf, subtopicIdOf, microtopicIdOf } from '@/data/taxonomy'

const KEY = 'synapse-taxonomy-tree-v1'
const slug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

interface Micro { id: string; title: string; micId: string }
interface Sub { id: string; title: string; subId: string; micros: Micro[] }
interface Topic { id: string; title: string; tpcId: string; subs: Sub[] }
interface Sys { id: string; name: string; short: string; color?: string; sysId: string; topics: Topic[] }

function seed(): Sys[] {
  return taxonomyTree().map((s) => ({
    id: s.id, name: s.name, short: s.short, sysId: s.sysId,
    topics: s.topics.map((t) => ({
      id: t.id, title: t.title, tpcId: t.tpcId,
      subs: t.subtopics.map((st) => ({ id: st.id, title: st.title, subId: st.subId, micros: [] as Micro[] })),
    })),
  }))
}

/** Small monospace ID chip. */
function Id({ value }: { value: string }) {
  return <span className="inline-flex items-center gap-1 rounded bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-2"><Icon icon={Hash} size={9} className="text-ink-3" />{value}</span>
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

export function TaxonomySetup() {
  const [tree, setTree] = usePersistentState<Sys[]>(KEY, seed)
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }))

  const totals = {
    systems: tree.length,
    topics: tree.reduce((n, s) => n + s.topics.length, 0),
    subs: tree.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.subs.length, 0), 0),
    micros: tree.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.subs.reduce((k, su) => k + su.micros.length, 0), 0), 0),
  }

  const update = (fn: (draft: Sys[]) => Sys[]) => setTree((cur) => fn(structuredClone(cur)))

  const addSystem = (name: string) => update((d) => [...d, { id: slug(name), name, short: name.slice(0, 3).toUpperCase(), sysId: systemId(slug(name)), topics: [] }])
  const addTopic = (sysIdx: string, title: string) => update((d) => { const s = d.find((x) => x.id === sysIdx)!; s.topics.push({ id: slug(title), title, tpcId: topicIdOf(slug(title)), subs: [] }); return d })
  const addSub = (sysIdx: string, topId: string, title: string) => update((d) => { const t = d.find((x) => x.id === sysIdx)!.topics.find((x) => x.id === topId)!; t.subs.push({ id: slug(title), title, subId: subtopicIdOf(slug(title)), micros: [] }); return d })
  const addMicro = (sysIdx: string, topId: string, subId: string, title: string) => update((d) => { const su = d.find((x) => x.id === sysIdx)!.topics.find((x) => x.id === topId)!.subs.find((x) => x.id === subId)!; su.micros.push({ id: slug(title), title, micId: microtopicIdOf(slug(title)) }); return d })
  const removeSystem = (sysIdx: string) => update((d) => d.filter((x) => x.id !== sysIdx))
  const removeTopic = (sysIdx: string, topId: string) => update((d) => { const s = d.find((x) => x.id === sysIdx)!; s.topics = s.topics.filter((t) => t.id !== topId); return d })
  const removeSub = (sysIdx: string, topId: string, subId: string) => update((d) => { const t = d.find((x) => x.id === sysIdx)!.topics.find((x) => x.id === topId)!; t.subs = t.subs.filter((s) => s.id !== subId); return d })
  const removeMicro = (sysIdx: string, topId: string, subId: string, micId: string) => update((d) => { const su = d.find((x) => x.id === sysIdx)!.topics.find((x) => x.id === topId)!.subs.find((x) => x.id === subId)!; su.micros = su.micros.filter((m) => m.id !== micId); return d })

  return (
    <PageContainer>
      <PageHeader
        title="Subjects & Topics"
        description="Manage the curriculum taxonomy — Systems → Topics → Subtopics → Microtopics. Each level gets a unique, visible ID that concepts, questions, articles, and resources tag themselves with."
        actions={<Button variant="secondary" size="md" iconLeft={RotateCcw} onClick={() => setTree(seed())}>Reset to default</Button>}
      />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[['Systems', totals.systems], ['Topics', totals.topics], ['Subtopics', totals.subs], ['Microtopics', totals.micros]].map(([label, value]) => (
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
                <SubjectDot id={sys.color ? sys.id : (['cvs', 'resp', 'renal', 'neuro', 'pharm', 'gi', 'endo', 'msk'].includes(sys.id) ? sys.id : 'cvs')} />
                <span className="text-[14px] font-semibold text-ink">{sys.name}</span>
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
                          <span className="text-[13.5px] font-medium text-ink">{top.title}</span>
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
                                    <span className="text-[12.5px] text-ink-2">{sub.title}</span>
                                    <Id value={sub.subId} />
                                    <button onClick={() => removeSub(sys.id, top.id, sub.id)} className="ms-auto grid size-7 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label="Remove subtopic"><Icon icon={Trash2} size={13} /></button>
                                  </div>
                                  {open[suk] && (
                                    <div className="ms-6 space-y-1 border-s border-line-2 ps-2 py-1">
                                      {sub.micros.map((mic) => (
                                        <div key={mic.id} className="flex items-center gap-2 py-0.5">
                                          <span className="text-[12px] text-ink-3">{mic.title}</span>
                                          <Id value={mic.micId} />
                                          <button onClick={() => removeMicro(sys.id, top.id, sub.id, mic.id)} className="ms-auto grid size-6 place-items-center rounded text-ink-3 hover:text-danger" aria-label="Remove microtopic"><Icon icon={Trash2} size={12} /></button>
                                        </div>
                                      ))}
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
        IDs are generated automatically from each name and stay visible so questions, articles, concepts, and resources can tag against them.
      </div>
    </PageContainer>
  )
}
