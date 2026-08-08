import { Field, Select } from '@/components/ui/Field'
import type { TaxSysNode } from '@/data/taxonomyStore'

/** A concept's placement in the single-source taxonomy, as visible IDs. */
export interface TaxonomyPlacement {
  subjectId?: string       // system node id, e.g. 'cvs'
  systemId?: string        // SYS_*
  topicTagId?: string      // TPC_*
  subtopicId?: string      // SUB_*
  microtopicId?: string    // MIC_*
  nanotopicId?: string     // NAN_*
}

/** Resolve the current node selections from a placement's visible IDs. */
function resolve(tree: TaxSysNode[], p: TaxonomyPlacement) {
  const sys = tree.find((s) => s.id === p.subjectId || s.sysId === p.systemId)
  const top = sys?.topics.find((t) => t.tpcId === p.topicTagId)
  const sub = top?.subs.find((s) => s.subId === p.subtopicId)
  const mic = sub?.micros.find((m) => m.micId === p.microtopicId)
  return { sys, top, sub, mic }
}

/**
 * Cascading System → Topic → Subtopic → Microtopic → Nanotopic picker, sourced
 * from the single Subjects & Topics taxonomy. Emits the placement as visible IDs.
 */
export function TaxonomyPlacementPicker({ tree, value, onChange, compact }: {
  tree: TaxSysNode[]
  value: TaxonomyPlacement
  onChange: (next: TaxonomyPlacement) => void
  compact?: boolean
}) {
  const { sys, top, sub, mic } = resolve(tree, value)

  const setSystem = (id: string) => {
    const s = tree.find((x) => x.id === id)
    onChange(s ? { subjectId: s.id, systemId: s.sysId } : {})
  }
  const setTopic = (tpcId: string) => {
    const t = sys?.topics.find((x) => x.tpcId === tpcId)
    onChange({ subjectId: sys?.id, systemId: sys?.sysId, topicTagId: t?.tpcId })
  }
  const setSub = (subId: string) => {
    const s = top?.subs.find((x) => x.subId === subId)
    onChange({ subjectId: sys?.id, systemId: sys?.sysId, topicTagId: top?.tpcId, subtopicId: s?.subId })
  }
  const setMic = (micId: string) => {
    const m = sub?.micros.find((x) => x.micId === micId)
    onChange({ subjectId: sys?.id, systemId: sys?.sysId, topicTagId: top?.tpcId, subtopicId: sub?.subId, microtopicId: m?.micId })
  }
  const setNan = (nanId: string) => {
    onChange({ subjectId: sys?.id, systemId: sys?.sysId, topicTagId: top?.tpcId, subtopicId: sub?.subId, microtopicId: mic?.micId, nanotopicId: nanId || undefined })
  }

  const cls = compact ? 'grid grid-cols-2 gap-2' : 'grid gap-2 sm:grid-cols-2'
  return (
    <div className={cls}>
      <Field label="System"><Select value={sys?.id ?? ''} onChange={(e) => setSystem(e.target.value)}><option value="">— Select —</option>{tree.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</Select></Field>
      <Field label="Topic"><Select value={top?.tpcId ?? ''} disabled={!sys} onChange={(e) => setTopic(e.target.value)}><option value="">— None —</option>{sys?.topics.map((t) => <option key={t.id} value={t.tpcId}>{t.title}</option>)}</Select></Field>
      <Field label="Subtopic"><Select value={sub?.subId ?? ''} disabled={!top} onChange={(e) => setSub(e.target.value)}><option value="">— None —</option>{top?.subs.map((s) => <option key={s.id} value={s.subId}>{s.title}</option>)}</Select></Field>
      <Field label="Microtopic"><Select value={mic?.micId ?? ''} disabled={!sub} onChange={(e) => setMic(e.target.value)}><option value="">— None —</option>{sub?.micros.map((m) => <option key={m.id} value={m.micId}>{m.title}</option>)}</Select></Field>
      <Field label="Nanotopic" className="sm:col-span-2"><Select value={value.nanotopicId ?? ''} disabled={!mic} onChange={(e) => setNan(e.target.value)}><option value="">— None —</option>{mic?.nanos.map((n) => <option key={n.id} value={n.nanId}>{n.title}</option>)}</Select></Field>
    </div>
  )
}
