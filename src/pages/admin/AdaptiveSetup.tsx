/**
 * Adaptive Learning Setup.
 *
 * Everything the selection algorithm reads lives here, and nothing here is live
 * until it is published with a dated note. That is the point: material algorithm
 * changes need a change note, and must not silently rewrite what students were
 * told about their own progress.
 *
 * The tab order runs from evidence to policy: what the pool can actually
 * support, what the exam requires, how selection weighs it, how the model reads
 * an answer, what happens after a wrong one, how readiness stays separate, how
 * the week is planned, and finally what is published to students.
 */

import { useMemo, useState } from 'react'
import {
  Activity, Braces, CalendarRange, ClipboardCheck, Gauge, Layers, ScrollText, Radar,
} from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Tabs } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { Field, Select, Textarea } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { Caveat, Figure, ShareRow, SubHeading, percent } from '@/components/adaptive/parts'
import {
  InterventionsTab, MasteryTab, PlanningTab, ReadinessTab, SelectionTab, type Draft,
} from '@/components/admin/adaptive/tabs'
import { SettingGroup } from '@/components/admin/adaptive/controls'
import {
  useAdaptiveBlueprints, useAdaptiveConfig, useConceptLabels, usePublishConfig, useResolvedBlueprint,
} from '@/lib/adaptive/useAdaptiveConfig'
import { useAdaptivePool } from '@/lib/content/adminContentClient'
import { itemInScope, type AdaptivePoolItem } from '@/data/adaptive/item'
import { EMPTY_HELD_OUT, HELD_OUT_STORAGE_KEY, heldOutIds, type HeldOutRegistry } from '@/data/adaptive/readiness'
import { draftBlueprint, weightByGroup, type Blueprint } from '@/data/adaptive/blueprint'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { yearId as deriveYearId } from '@/data/taxonomy'

const TABS = [
  { value: 'overview', label: 'Overview & pool health', icon: Activity },
  { value: 'blueprints', label: 'Blueprints', icon: Layers },
  { value: 'selection', label: 'Selection', icon: Radar },
  { value: 'mastery', label: 'Mastery model', icon: Braces },
  { value: 'interventions', label: 'Interventions', icon: Gauge },
  { value: 'readiness', label: 'Readiness', icon: ClipboardCheck },
  { value: 'planning', label: 'Planning', icon: CalendarRange },
  { value: 'governance', label: 'Governance', icon: ScrollText },
]

/**
 * Which blueprint node a question can actually serve.
 *
 * The number content operations needs: a node with no eligible items cannot be
 * covered by any block, however heavily the blueprint weights it, and no amount
 * of algorithm tuning will fix that.
 */
function poolHealth(items: AdaptivePoolItem[], conceptIds: string[], heldOut: Set<string>) {
  const byConcept = new Map<string, { total: number; practice: number }>()
  for (const conceptId of conceptIds) byConcept.set(conceptId, { total: 0, practice: 0 })

  for (const item of items) {
    for (const conceptId of item.conceptIds) {
      const entry = byConcept.get(conceptId)
      if (!entry) continue
      entry.total += 1
      if (!heldOut.has(item.id)) entry.practice += 1
    }
  }
  return byConcept
}

export function AdaptiveSetup() {
  const [tab, setTab] = useState('overview')
  const { displayName } = useIdentity()

  const [config] = useAdaptiveConfig()
  const publish = usePublishConfig()
  const [draft, setDraft] = useState<Draft | null>(null)
  const [note, setNote] = useState('')

  const [registry, setRegistry] = usePersistentState<HeldOutRegistry>(HELD_OUT_STORAGE_KEY, EMPTY_HELD_OUT)
  // Only the approved bank's concept ids and scope — projected server-side, never
  // the 239 MB ledger. Feeds pool health, the held-out reserve and scope counts.
  const { items: approved } = useAdaptivePool()
  const [blueprints, setBlueprints] = useAdaptiveBlueprints()
  const [universities] = useUniversityCatalogue()
  const labels = useConceptLabels()

  // The scope the console is inspecting. Defaults to nothing rather than to the
  // first university in the list — a figure shown for the wrong programme is
  // worse than a prompt to choose one.
  const [universityId, setUniversityId] = useState('')
  const [year, setYear] = useState('')

  const yearIdValue = universityId && year ? deriveYearId(universityId, year) : ''
  const scope = useMemo(
    () => ({ universityId, yearId: yearIdValue }),
    [universityId, yearIdValue],
  )
  const blueprint = useResolvedBlueprint(scope)

  const items = useMemo(
    () => (universityId ? approved.filter((item) => itemInScope(item, scope)) : approved),
    [approved, scope, universityId],
  )

  const heldOut = useMemo(() => heldOutIds(items, registry, config), [items, registry, config])

  const health = useMemo(
    () => poolHealth(items, blueprint.nodes.map((node) => node.conceptId), heldOut),
    [items, blueprint.nodes, heldOut],
  )

  const starved = useMemo(
    () => blueprint.nodes
      .map((node) => ({ node, ...(health.get(node.conceptId) ?? { total: 0, practice: 0 }) }))
      .filter((entry) => entry.practice === 0)
      .sort((a, b) => b.node.weight - a.node.weight),
    [blueprint.nodes, health],
  )

  const unreachableWeight = starved.reduce((sum, entry) => sum + entry.node.weight, 0)

  const working = draft ?? config
  const dirty = draft !== null

  const yearsForUniversity = universities.find((entry) => entry.id === universityId)?.years ?? []

  return (
    <PageContainer>
      <PageHeader
        title="Adaptive Learning Setup"
        description="Every threshold, weight and interval the adaptive algorithms read. Nothing here is live until it is published with a dated change note."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="outline">Config v{config.version}</Badge>
            {dirty && <Badge tone="warning" dot>Unpublished changes</Badge>}
          </div>
        }
      />

      <Tabs items={TABS} value={tab} onChange={setTab} className="mb-5" />

      {/* Scope selector: every pool and blueprint reading below is scoped, and a
          figure computed across every university at once would mean nothing. */}
      {(tab === 'overview' || tab === 'blueprints' || tab === 'readiness') && (
        <Panel className="mb-5">
          <PanelHeader title="Inspecting" icon={Layers} />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Field label="University">
              <Select value={universityId} onChange={(event) => { setUniversityId(event.target.value); setYear('') }}>
                <option value="">Choose a university</option>
                {universities.map((entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>)}
              </Select>
            </Field>
            <Field label="Year">
              <Select value={year} onChange={(event) => setYear(event.target.value)} disabled={!universityId}>
                <option value="">Choose a year</option>
                {yearsForUniversity.map((entry) => <option key={entry.year} value={entry.year}>{entry.year}</option>)}
              </Select>
            </Field>
          </div>
        </Panel>
      )}

      {tab === 'overview' && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Figure label="Approved items in scope" value={String(items.length)} icon={Activity} />
            <Figure label="Blueprint concepts" value={String(blueprint.nodes.length)} icon={Layers} />
            <Figure label="Reserved for measurement" value={String(heldOut.size)} icon={ClipboardCheck} />
            <Figure
              label="Blueprint weight unreachable"
              value={percent(unreachableWeight)}
              sub={`${starved.length} concepts with no practice items`}
              icon={Gauge}
            />
          </div>

          {!universityId && (
            <Caveat>
              Choose a university and year above. Pool health is scoped, and a count taken across every programme at once
              would not tell you whether any single student's blueprint can be served.
            </Caveat>
          )}

          <Panel>
            <PanelHeader
              title="Blueprint nodes with no practice questions"
              icon={Activity}
              hint="Constraints cannot be satisfied here at any setting"
              action={<Badge tone={starved.length ? 'danger' : 'success'} dot>{starved.length}</Badge>}
            />
            {starved.length === 0 ? (
              <EmptyState
                icon={Activity}
                title={blueprint.nodes.length ? 'Every blueprint concept has questions' : 'No blueprint in scope'}
                description={
                  blueprint.nodes.length
                    ? 'Selection can reach every concept on this blueprint.'
                    : 'Choose a university and year, or author concepts scoped to this programme.'
                }
              />
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>Concept</Th>
                    <Th>Group</Th>
                    <Th align="end">Blueprint weight</Th>
                    <Th align="end">Items</Th>
                    <Th align="end">Practice items</Th>
                  </tr>
                </thead>
                <tbody>
                  {starved.slice(0, 40).map((entry) => (
                    <Tr key={entry.node.conceptId}>
                      <Td>{labels.get(entry.node.conceptId) ?? entry.node.label}</Td>
                      <Td className="text-ink-2">{entry.node.groupLabel}</Td>
                      <Td align="end" className="tnum font-mono text-[12.5px]">{percent(entry.node.weight)}</Td>
                      <Td align="end" className="tnum font-mono text-[12.5px]">{entry.total}</Td>
                      <Td align="end" className="tnum font-mono text-[12.5px] text-danger">{entry.practice}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Panel>

          <Panel>
            <PanelHeader title="Pool by blueprint group" icon={Layers} />
            <div className="space-y-3.5 p-5">
              {weightByGroup(blueprint.nodes).slice(0, 12).map((group) => {
                const served = blueprint.nodes
                  .filter((node) => node.groupId === group.groupId)
                  .filter((node) => (health.get(node.conceptId)?.practice ?? 0) > 0).length
                return (
                  <ShareRow
                    key={group.groupId}
                    label={group.groupLabel}
                    value={served}
                    max={Math.max(1, group.concepts)}
                    right={`${served} of ${group.concepts} concepts served`}
                    tone={served === group.concepts ? 'success' : served === 0 ? 'danger' : 'warning'}
                  />
                )
              })}
              {blueprint.nodes.length === 0 && (
                <p className="text-[13px] text-ink-3">Nothing in scope.</p>
              )}
            </div>
          </Panel>
        </div>
      )}

      {tab === 'blueprints' && (
        <div className="space-y-5">
          <Caveat>
            Derived weights decide <strong>which</strong> concepts are in scope; a published blueprint only overrides
            <strong> how much</strong> each is worth. That order means a concept authored after a blueprint was published
            still counts toward coverage instead of staying invisible.
          </Caveat>

          <Panel>
            <PanelHeader
              title="Published blueprints"
              icon={Layers}
              action={
                <Button
                  disabled={!universityId || !yearIdValue || blueprint.nodes.length === 0}
                  onClick={() => {
                    const created = draftBlueprint(
                      `${universityId} · ${year}`,
                      { universityId, yearId: yearIdValue, moduleIds: [] },
                      blueprint.nodes,
                    )
                    setBlueprints((current) => [...current, created])
                  }}
                >
                  Draft from derived weights
                </Button>
              }
            />
            {blueprints.length === 0 ? (
              <EmptyState
                icon={Layers}
                title="No stored blueprints"
                description="Weights are being derived from each concept's own blueprint weight and per-year exam weight. That is a working default — a stored blueprint is only needed where those weights are wrong."
              />
            ) : (
              <Table>
                <thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Scope</Th>
                    <Th align="end">Concepts</Th>
                    <Th align="end">Version</Th>
                    <Th align="end">Status</Th>
                    <Th align="end" />
                  </tr>
                </thead>
                <tbody>
                  {blueprints.map((entry) => (
                    <Tr key={entry.id}>
                      <Td>{entry.name}</Td>
                      <Td className="text-ink-2">{entry.universityId || 'Any'} · {entry.yearId || 'Any year'}</Td>
                      <Td align="end" className="tnum font-mono text-[12.5px]">{entry.nodes.length}</Td>
                      <Td align="end" className="tnum font-mono text-[12.5px]">v{entry.version}</Td>
                      <Td align="end">
                        <Badge tone={entry.publishedAt ? 'success' : 'warning'} dot>
                          {entry.publishedAt ? 'Published' : 'Draft'}
                        </Badge>
                      </Td>
                      <Td align="end">
                        <Button
                          size="sm"
                          onClick={() => setBlueprints((current) => current.map((stored) =>
                            stored.id !== entry.id ? stored : publishBlueprint(stored, displayName)))}
                        >
                          {entry.publishedAt ? 'Republish' : 'Publish'}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Panel>

          <Panel>
            <PanelHeader
              title="Weights in scope"
              icon={Layers}
              hint={blueprint.stored ? `From ${blueprint.stored.name} v${blueprint.stored.version}` : 'Derived from concept weights'}
            />
            <div className="space-y-3.5 p-5">
              {weightByGroup(blueprint.nodes).map((group) => (
                <ShareRow
                  key={group.groupId}
                  label={group.groupLabel}
                  value={group.weight}
                  max={1}
                  right={`${percent(group.weight)} · ${group.concepts} concepts`}
                />
              ))}
              {blueprint.nodes.length === 0 && <p className="text-[13px] text-ink-3">Nothing in scope.</p>}
            </div>
          </Panel>
        </div>
      )}

      {tab === 'selection' && <SelectionTab draft={working} setDraft={(edit) => setDraft(edit(working))} />}
      {tab === 'mastery' && <MasteryTab draft={working} setDraft={(edit) => setDraft(edit(working))} />}
      {tab === 'interventions' && <InterventionsTab draft={working} setDraft={(edit) => setDraft(edit(working))} />}
      {tab === 'readiness' && (
        <ReadinessTab
          draft={working}
          setDraft={(edit) => setDraft(edit(working))}
          registry={registry}
          setRegistry={setRegistry}
          poolSize={items.length}
          heldOutCount={heldOut.size}
        />
      )}
      {tab === 'planning' && <PlanningTab draft={working} setDraft={(edit) => setDraft(edit(working))} />}

      {tab === 'governance' && (
        <div className="space-y-5">
          <SettingGroup title="What students can see" icon={ScrollText}>
            <p className="text-[13px] leading-relaxed text-ink-2">
              The student-facing rules surface publishes the governing principles and this configuration: the separate
              purposes of adaptive learning and readiness, how wrong attempts differ from weak concepts, the current
              allocation, the relaxation order, the status definitions, and the config version behind every figure.
            </p>
            <div>
              <SubHeading>Deliberately not published</SubHeading>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
                Item parameters, held-out answers, other students' data, fraud thresholds, and anything else that would
                let the selection be gamed. The principles are public; the levers are not.
              </p>
            </div>
          </SettingGroup>

          <SettingGroup title="Validation scorecard" icon={Gauge}>
            <Caveat>
              Practice-block accuracy is explicitly not the north-star metric. Adaptive blocks oversample weakness, so
              that figure gets worse as selection gets better.
            </Caveat>
            <Table>
              <thead>
                <tr><Th>Measure</Th><Th align="end">Status</Th></tr>
              </thead>
              <tbody>
                {[
                  'Learning gain on matched held-out items',
                  'Retention at 7, 14, 21, 30 and 45 days',
                  'Readiness calibration and interval coverage',
                  'Blueprint coverage, debt and unmeasured concept count',
                  'Weak-concept resolution time and false-red rate',
                  'Resource completion followed by successful transfer',
                  'Item exposure concentration and pool utilisation',
                  'Block abandonment, time burden and fatigue signals',
                  'Subgroup calibration and access disparities',
                ].map((measure) => (
                  <Tr key={measure}>
                    <Td className="text-[13px]">{measure}</Td>
                    <Td align="end">
                      {/* Honest by construction: nothing here reports a number
                          until the data exists to compute it. */}
                      <Badge tone="outline">Not measurable yet</Badge>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
            <p className="text-[12.5px] leading-relaxed text-ink-2">
              These require a held-out response history this deployment does not have yet. They are listed so the gap is
              visible rather than implied — an empty scorecard is a finding, not an oversight.
            </p>
          </SettingGroup>

          <Panel>
            <PanelHeader title="Change history" icon={ScrollText} hint={`${config.changeNotes.length} entries`} />
            <div className="divide-y divide-line">
              {config.changeNotes.map((entry) => (
                <div key={`${entry.version}-${entry.at}`} className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="outline">v{entry.version}</Badge>
                    <span className="tnum font-mono text-[11.5px] text-ink-3">{entry.at}</span>
                    <span className="text-[12px] text-ink-3">{entry.author}</span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{entry.note}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {/* Publishing bar. Present on every settings tab, because the draft is one
          document — an admin who edited three tabs publishes all three together
          under one note, which is what makes the note meaningful. */}
      {dirty && (
        <Panel className="sticky bottom-4 mt-5 border-primary">
          <PanelHeader title="Publish these changes" icon={ScrollText} hint={`Will become v${config.version + 1}`} />
          <div className="space-y-4 p-5">
            <Field label="Change note" hint="Shown to students and kept permanently.">
              <Textarea
                rows={2}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="What changed, and why."
              />
            </Field>
            <Caveat>
              Publishing changes how future selections are made. It does not recompute historical scores under the new
              model — a recomputation is a separate, clearly labelled operation.
            </Caveat>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="primary"
                onClick={() => {
                  publish(() => draft as Draft, note, displayName)
                  setDraft(null)
                  setNote('')
                }}
              >
                Publish as v{config.version + 1}
              </Button>
              <Button onClick={() => { setDraft(null); setNote('') }}>Discard changes</Button>
            </div>
          </div>
        </Panel>
      )}
    </PageContainer>
  )
}

/** Publish a stored blueprint, stamping the version and the dated note. */
function publishBlueprint(blueprint: Blueprint, author: string): Blueprint {
  const version = blueprint.publishedAt ? blueprint.version + 1 : blueprint.version
  return {
    ...blueprint,
    version,
    publishedAt: new Date().toISOString(),
    changeNotes: [
      { version, at: new Date().toISOString().slice(0, 10), author, note: 'Published.' },
      ...blueprint.changeNotes,
    ],
  }
}
