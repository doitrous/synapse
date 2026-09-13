import { AtlasSkeleton } from '@/components/loading/PageSkeleton'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  CircleAlert,
  Eye,
  EyeOff,
  Focus,
  Info,
  Layers3,
  Pause,
  RotateCcw,
  RotateCw,
  Search,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import AnatomyScene from '@/components/anatomy-atlas/AnatomyScene'
import {
  DEFAULT_VISIBLE,
  EXPLANATIONS,
  SYSTEMS,
  explanation,
  type Atlas,
  type Concept,
  type SceneState,
  type SystemId,
  type View,
} from '@/components/anatomy-atlas/anatomy'
import '@/styles/anatomy-atlas.css'

type AtlasKind = 'male' | 'female'

const ATLASES: Record<AtlasKind, { label: string; manifest: string; assetBase: string; pieces: string }> = {
  male: { label: 'Male', manifest: '/anatomy-atlas/models/atlas.json', assetBase: '/anatomy-atlas/models', pieces: '2,234' },
  female: { label: 'Female', manifest: '/anatomy-atlas/female/atlas.json', assetBase: '/anatomy-atlas/female', pieces: '3,004' },
}

const INITIAL_STATE: SceneState = {
  explode: 0,
  visible: DEFAULT_VISIBLE,
  selected: [],
  hidden: [],
  isolate: false,
  view: 'three-quarter',
  rotate: false,
  reset: 0,
}

const ORGAN_SYSTEMS: SystemId[] = ['cardiac', 'respiratory', 'digestive', 'urinary', 'endocrine', 'reproductive']
const VIEWS: { id: View; label: string; short: string }[] = [
  { id: 'three-quarter', label: 'Three-quarter view', short: '¾' },
  { id: 'front', label: 'Front view', short: 'F' },
  { id: 'side', label: 'Side view', short: 'S' },
  { id: 'back', label: 'Back view', short: 'B' },
]

export function AnatomyAtlas() {
  const [atlasKind, setAtlasKind] = useState<AtlasKind>('male')
  const [atlas, setAtlas] = useState<Atlas | null>(null)
  const [state, setState] = useState<SceneState>(INITIAL_STATE)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [systemsOpen, setSystemsOpen] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)
  const [searchOpen, setSearchOpen] = useState(false)
  const [creditsOpen, setCreditsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [chosen, setChosen] = useState<Concept | null>(null)
  const atlasConfig = ATLASES[atlasKind]

  useEffect(() => {
    const abort = new AbortController()
    setAtlas(null)
    setProgress(0)
    setError('')
    setQuery('')
    setChosen(null)
    setState((current) => ({ ...INITIAL_STATE, reset: current.reset + 1 }))
    fetch(atlasConfig.manifest, { signal: abort.signal })
      .then((response) => {
        if (!response.ok) throw new Error('The anatomy catalogue could not be loaded.')
        return response.json()
      })
      .then((data) => setAtlas(data as Atlas))
      .catch((cause: unknown) => {
        if (cause instanceof DOMException && cause.name === 'AbortError') return
        setError(cause instanceof Error ? cause.message : 'The anatomy catalogue could not be loaded.')
      })
    return () => abort.abort()
  }, [atlasConfig.manifest])

  const partById = useMemo(() => new Map(atlas?.parts.map((part) => [part.id, part])), [atlas])
  const counts = useMemo(
    () => Object.fromEntries(SYSTEMS.map((system) => [system.id, atlas?.parts.filter((part) => part.system === system.id).length ?? 0])),
    [atlas],
  ) as Record<SystemId, number>
  const activeSystems = SYSTEMS.filter((system) => counts[system.id] > 0)
  const hidden = new Set(state.hidden)
  const selectedParts = state.selected.map((id) => partById.get(id)).filter((part) => part !== undefined)
  const selected = selectedParts[0]
  const selectedSystem = SYSTEMS.find((system) => system.id === selected?.system)
  const visibleCount = atlas?.parts.filter((part) =>
    !hidden.has(part.id) && (state.isolate ? state.selected.includes(part.id) : state.visible.includes(part.system) || state.selected.includes(part.id)),
  ).length ?? 0

  const results = useMemo(() => {
    if (!atlas) return []
    const term = query.toLowerCase().trim()
    if (!term) return []
    return atlas.concepts
      .filter((concept) => concept.name.toLowerCase().includes(term) || concept.id.toLowerCase().includes(term))
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 12)
  }, [atlas, query])

  const chooseConcept = (concept: Concept) => {
    setChosen(concept)
    setState((current) => ({ ...current, selected: concept.elements, isolate: false, rotate: false }))
    setQuery(concept.name)
    setSearchOpen(false)
  }

  const choosePart = (id: string) => {
    const part = partById.get(id)
    if (!part) return
    setChosen({ id: part.conceptId, name: part.name, elements: [id] })
    setState((current) => ({ ...current, selected: [id], isolate: false, rotate: false }))
  }

  const toggleSystem = (id: SystemId) => {
    setChosen(null)
    setState((current) => ({
      ...current,
      selected: [],
      isolate: false,
      visible: current.visible.includes(id)
        ? current.visible.filter((system) => system !== id)
        : [...current.visible, id],
    }))
  }

  const hideSelection = () => {
    setState((current) => ({
      ...current,
      hidden: [...new Set([...current.hidden, ...current.selected])],
      selected: [],
      isolate: false,
    }))
    setChosen(null)
    setQuery('')
  }

  const reset = () => {
    setChosen(null)
    setQuery('')
    setState((current) => ({ ...INITIAL_STATE, reset: current.reset + 1 }))
  }

  return (
    <div className="anatomy-atlas-page">
      <header className="anatomy-atlas-page-header">
        <div className="flex min-w-0 items-center gap-3">
          <ButtonLink to="/app/study-tools" size="sm" variant="ghost" iconLeft={ArrowLeft}>Tools</ButtonLink>
          <span className="h-6 w-px bg-line" aria-hidden />
          <div className="flex min-w-0 items-baseline gap-2">
            <h1 className="truncate font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink sm:text-[25px]">Anatomy Atlas</h1>
            <Badge tone="outline">Coming soon · Demo</Badge>
          </div>
        </div>
        <p className="hidden text-[12px] text-ink-3 lg:block">Interactive male and female reference anatomy</p>
      </header>

      <section className="anatomy-atlas-shell" aria-label="Anatomy Atlas demo">
        {atlas && (
          <AnatomyScene
            key={atlasKind}
            atlas={atlas}
            assetBase={atlasConfig.assetBase}
            state={{ ...state, inspectorOpen: Boolean(selected) }}
            onSelect={choosePart}
            onProgress={(value) => {
              setProgress(value)
              if (value === 100) setError('')
            }}
            onError={setError}
          />
        )}

        <div className="anatomy-atlas-toolbar">
          <div className="anatomy-atlas-sex-selector" aria-label="Choose anatomy model">
            {(Object.keys(ATLASES) as AtlasKind[]).map((kind) => (
              <button key={kind} type="button" aria-pressed={atlasKind === kind} onClick={() => setAtlasKind(kind)}>
                {ATLASES[kind].label}
              </button>
            ))}
          </div>
          <div className="anatomy-atlas-search">
            <Icon icon={Search} size={16} className="pointer-events-none absolute start-3 top-1/2 z-10 -translate-y-1/2 text-ink-3" />
            <input
              value={query}
              onFocus={() => setSearchOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value)
                setSearchOpen(true)
              }}
              placeholder={`Find a structure in the ${atlasConfig.label.toLowerCase()} atlas…`}
              aria-label="Find an anatomical structure"
              className="h-10 w-full rounded-lg border border-line-2 bg-surface/95 ps-9 pe-9 text-[13px] text-ink shadow-control outline-none backdrop-blur placeholder:text-ink-3 focus:border-primary"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute end-2 top-1/2 z-10 grid size-7 -translate-y-1/2 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink">
                <Icon icon={X} size={14} />
              </button>
            )}
            {searchOpen && query.trim() && (
              <div className="absolute inset-x-0 top-[calc(100%+6px)] z-30 max-h-72 overflow-y-auto rounded-lg border border-line bg-surface p-1.5 shadow-raised">
                {results.length ? results.map((concept) => (
                  <button key={concept.id} type="button" onClick={() => chooseConcept(concept)} className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-start hover:bg-inset">
                    <span className="min-w-0 truncate text-[13px] font-medium text-ink">{concept.name}</span>
                    <span className="shrink-0 font-mono text-[10.5px] text-ink-3">{concept.elements.length} {concept.elements.length === 1 ? 'piece' : 'pieces'}</span>
                  </button>
                )) : <p className="px-3 py-4 text-center text-[12.5px] text-ink-3">No structures match that search.</p>}
              </div>
            )}
          </div>
          {state.hidden.length > 0 && (
            <Button size="sm" iconLeft={Eye} onClick={() => setState((current) => ({ ...current, hidden: [] }))}>Show hidden ({state.hidden.length})</Button>
          )}
          <Button size="sm" iconLeft={Layers3} onClick={() => setSystemsOpen((open) => !open)} aria-pressed={systemsOpen}>Systems</Button>
          <Button size="sm" iconLeft={Info} onClick={() => setCreditsOpen(true)}>Credits</Button>
        </div>

        {systemsOpen && (
          <aside className="anatomy-atlas-systems" aria-label="Anatomical systems">
            <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2.5">
              <div>
                <p className="text-[12px] font-semibold text-ink">{atlasConfig.label} anatomy systems</p>
                <p className="mt-0.5 font-mono text-[10px] text-ink-3">{visibleCount.toLocaleString()} of {atlas?.parts.length.toLocaleString() ?? atlasConfig.pieces} pieces visible</p>
              </div>
              <button type="button" className="grid size-8 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink md:hidden" onClick={() => setSystemsOpen(false)} aria-label="Close systems"><Icon icon={X} size={15} /></button>
            </div>
            <div className="flex gap-1 border-b border-line p-2">
              {[
                { label: 'All', systems: activeSystems.map((system) => system.id) },
                { label: 'Skeleton', systems: ['skeletal'] as SystemId[] },
                { label: 'Organs', systems: ORGAN_SYSTEMS },
              ].map((preset) => (
                <button key={preset.label} type="button" onClick={() => setState((current) => ({ ...current, visible: preset.systems, selected: [], isolate: false }))} className="flex-1 rounded-md border border-line px-1.5 py-1.5 text-[10.5px] font-medium text-ink-2 hover:border-line-2 hover:bg-inset hover:text-ink">{preset.label}</button>
              ))}
            </div>
            <div className="anatomy-atlas-system-list">
              {activeSystems.map((system) => {
                const enabled = state.visible.includes(system.id)
                return (
                  <button key={system.id} type="button" onClick={() => toggleSystem(system.id)} aria-pressed={enabled} className="anatomy-atlas-system-row">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: system.color }} />
                    <span className="min-w-0 flex-1 truncate">{system.name}</span>
                    <span className="font-mono text-[10px] text-ink-3">{counts[system.id]}</span>
                    <span className={enabled ? 'anatomy-atlas-switch is-on' : 'anatomy-atlas-switch'} aria-hidden><i /></span>
                  </button>
                )
              })}
            </div>
          </aside>
        )}

        {selected && chosen && (
          <aside className="anatomy-atlas-details" aria-label="Selected anatomical structure">
            <button type="button" onClick={() => { setChosen(null); setState((current) => ({ ...current, selected: [], isolate: false })) }} className="absolute end-2 top-2 grid size-8 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close structure details"><Icon icon={X} size={15} /></button>
            <span className="mb-3 block h-1 w-10 rounded-full" style={{ background: selectedSystem?.color }} />
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">{selectedSystem?.name ?? 'Anatomy'}</p>
            <h2 className="mt-1.5 pe-7 font-serif text-[20px] font-semibold leading-tight text-ink">{chosen.name}</h2>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-2">{explanation(chosen.name, selected.system)}</p>
            {!EXPLANATIONS[chosen.name.toLowerCase()] && <p className="mt-2 text-[10.5px] text-ink-3">System overview · structure identified from source anatomy</p>}
            <dl className="mt-4 grid grid-cols-2 gap-2 border-y border-line py-3">
              <div><dt className="text-[10px] text-ink-3">Atlas reference</dt><dd className="mt-0.5 truncate font-mono text-[11px] font-medium text-ink">{chosen.id}</dd></div>
              <div><dt className="text-[10px] text-ink-3">Selected pieces</dt><dd className="mt-0.5 font-mono text-[11px] font-medium text-ink">{state.selected.length.toLocaleString()}</dd></div>
            </dl>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button size="sm" variant={state.isolate ? 'primary' : 'secondary'} iconLeft={Focus} onClick={() => setState((current) => ({ ...current, isolate: !current.isolate, explode: 0 }))}>{state.isolate ? 'Show context' : 'Isolate'}</Button>
              <Button size="sm" variant="secondary" iconLeft={EyeOff} onClick={hideSelection}>Hide structure</Button>
            </div>
          </aside>
        )}

        <div className="anatomy-atlas-controls" aria-label="Atlas view controls">
          <div className="flex items-center gap-1">
            {VIEWS.map((view) => (
              <button key={view.id} type="button" title={view.label} aria-label={view.label} aria-pressed={state.view === view.id} disabled={state.explode > 0.8 && view.id !== 'front'} onClick={() => setState((current) => ({ ...current, view: view.id, reset: current.reset + 1, rotate: false }))} className="anatomy-atlas-view-button">{view.short}</button>
            ))}
            <button type="button" title="Auto rotate" aria-label={state.rotate ? 'Pause rotation' : 'Rotate body'} aria-pressed={state.rotate} disabled={state.explode >= 0.4} onClick={() => setState((current) => ({ ...current, rotate: !current.rotate }))} className="anatomy-atlas-view-button"><Icon icon={state.rotate ? Pause : RotateCw} size={15} /></button>
          </div>
          <label className="anatomy-atlas-explode">
            <span>Explode anatomy</span>
            <input type="range" min="0" max="100" step="1" value={Math.round(state.explode * 100)} onChange={(event) => { const value = Number(event.target.value); setState((current) => ({ ...current, explode: value / 100, view: value > 80 ? 'front' : current.view, rotate: false })) }} />
            <output>{Math.round(state.explode * 100)}%</output>
          </label>
          <button type="button" title="Reset atlas" aria-label="Reset atlas" onClick={reset} className="anatomy-atlas-view-button"><Icon icon={RotateCcw} size={15} /></button>
        </div>

        {progress < 100 && !error && <AtlasSkeleton stageOnly />}
        {progress < 100 && !error && (
          <div className="anatomy-atlas-loading" role="status">
            <div className="flex items-center justify-between gap-4"><span className="text-[12.5px] font-semibold text-ink">Preparing the {atlasConfig.label.toLowerCase()} anatomy</span><span className="font-mono text-[11px] text-ink-3">{progress}%</span></div>
            <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-inset"><i className="absolute inset-0 rounded-full bg-primary transition-transform duration-300 ease-[var(--ease-out-quint)]" style={{ transform: `translateX(${progress - 100}%)` }} /></div>
            <p className="mt-2 text-[10.5px] text-ink-3">Loading {atlas?.parts.length.toLocaleString() ?? atlasConfig.pieces} interactive pieces</p>
          </div>
        )}
        {error && (
          <div className="anatomy-atlas-loading" role="alert">
            <div className="flex items-start gap-2"><Icon icon={CircleAlert} size={17} className="mt-0.5 shrink-0 text-danger" /><p className="text-[12.5px] leading-relaxed text-ink">{error}</p></div>
          </div>
        )}

        <div className="anatomy-atlas-hint">Drag to orbit · Scroll or pinch to zoom · Select a structure to inspect or hide</div>
      </section>

      {creditsOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" role="dialog" aria-modal="true" aria-labelledby="credits-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setCreditsOpen(false) }}>
          <div className="max-h-[min(760px,calc(100dvh-32px))] w-full max-w-2xl overflow-y-auto rounded-xl border border-line bg-surface p-5 shadow-raised">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-strong">Source & scope</p><h2 id="credits-title" className="mt-1 font-serif text-[22px] font-semibold text-ink">Anatomy Atlas credits</h2></div>
              <button type="button" className="grid size-9 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" onClick={() => setCreditsOpen(false)} aria-label="Close credits"><Icon icon={X} size={17} /></button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-line bg-inset p-4">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">Male atlas</p>
                <h3 className="mt-1 text-[15px] font-semibold text-ink">Human Atlas · ashemag</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">Application and browser-optimized geometry released under the MIT License.</p>
                <a href="https://github.com/ashemag/human-atlas" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-primary-strong hover:underline">GitHub repository <Icon icon={ArrowUpRight} size={12} /></a>
              </article>
              <article className="rounded-lg border border-line bg-inset p-4">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">Female atlas</p>
                <h3 className="mt-1 text-[15px] font-semibold text-ink">Female Atlas · Mahendra Beniwal</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">Application, anatomical integration, and morphological adaptations released under the MIT License.</p>
                <a href="https://github.com/HiMahendraBeniwal/female-atlas" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-primary-strong hover:underline">GitHub repository <Icon icon={ArrowUpRight} size={12} /></a>
              </article>
            </div>
            <div className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-ink-2">
              <p><strong className="text-ink">BodyParts3D.</strong> © The Database Center for Life Science (DBCLS), licensed under CC BY 4.0. It provides the male reference anatomy and portions of the female musculoskeletal and vascular anatomy.</p>
              <p><strong className="text-ink">Human Reference Atlas / HuBMAP.</strong> Kristen Browne and Heidi Schlehlein, <em>3D Reference Organ Set for Female v1.5</em> (2023), licensed under CC BY 4.0. DOI: 10.48539/HBM352.BTSQ.586.</p>
              <p>Both models are educational reference assemblies and do not represent every human structure or variation. This viewer is not a diagnostic or surgical tool.</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px] font-medium text-primary-strong">
              <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">BodyParts3D <Icon icon={ArrowUpRight} size={12} /></a>
              <a href="https://doi.org/10.48539/HBM352.BTSQ.586" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">HuBMAP female reference <Icon icon={ArrowUpRight} size={12} /></a>
              <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">CC BY 4.0 <Icon icon={ArrowUpRight} size={12} /></a>
            </div>
            <div className="mt-5 flex justify-end"><Button variant="primary" onClick={() => setCreditsOpen(false)}>Close</Button></div>
          </div>
        </div>
      )}
    </div>
  )
}
