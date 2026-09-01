import { useCallback, useMemo, useRef, useState } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'
import { manifestKey, shardIndexFor, shardKey } from '@/lib/reader/annotationKey'
import { byteSizeOf } from '@/lib/reader/strokeCodec'
import { newObjectId, type AnnotationObject, type MarkerObject } from '@/lib/reader/annotations'
import { dropNotes, upsertNotes, type NoteEntry } from '@/lib/reader/noteIndex'

export type { NoteEntry }

/**
 * The student's marks on one document.
 *
 * Stored under `nishany.annotations.*`, which `stateOwnership` routes to
 * `/api/user-state/:key` — the verified account's own record, versioned and
 * crash-recovered, with the existing 400 ms debounce and `pagehide` flush. So
 * "saved immediately" needs no new infrastructure; what it needs is not putting
 * a whole book under one key. See `annotationKey` for why.
 *
 * Only a window of shards around the reader is open at once, because the number
 * of `usePersistentState` calls has to be the same on every render — the same
 * constraint, and the same solution, as `useAttemptHistory`. A stroke is always
 * drawn on a page the reader is looking at, so the shard it belongs to is
 * always in the window. A write already queued when the window moves still
 * lands: `stateStore` holds documents and their pending writes independently of
 * who is subscribed.
 */

/** Shards kept open: the current one, the one before, and the one after. */
const WINDOW = [-1, 0, 1] as const

/**
 * A serialised shard past this is refused rather than written.
 *
 * `stateStore.flush` treats a non-retryable failure as terminal and drops the
 * value with only a status flag — so a shard that outgrew the 25 MB request
 * limit would stop saving silently. This is far below that, and reaching it
 * means something is wrong worth telling the student about.
 */
const MAX_SHARD_BYTES = 1_500_000

export interface AnnotationStore {
  /** Objects on the pages currently in the window. */
  objects: AnnotationObject[]
  /**
   * The student's own sections, for the whole document.
   *
   * These live outside the shards because the outline has to list every one of
   * them before the reader has visited the page it sits on. They are titles and
   * page numbers — a few hundred bytes for a book.
   */
  markers: MarkerObject[]
  addMarker: (title: string, page: number) => void
  removeMarker: (id: string) => void
  /**
   * Every note and text box in the document, as text.
   *
   * The words have to be findable from page one, and only three shards are open
   * at a time — so the index lives beside the markers rather than inside the
   * pages. It holds text and a page number, nothing that could be mistaken for
   * the mark itself.
   */
  noteIndex: NoteEntry[]
  add: (object: AnnotationObject) => void
  remove: (ids: string[]) => void
  /**
   * Change objects in place — moving a note, retyping it, recolouring a
   * selection. `coalesce` folds the change into the previous undo step, so a
   * drag of forty pointer moves is one Undo rather than forty.
   */
  update: (ids: string[], patch: (object: AnnotationObject) => AnnotationObject, coalesce?: string) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  /** Set when a save was refused, so the reader can say so. */
  error: string | null
}

/** What lives outside the shards: the whole document, in a few kilobytes. */
interface Manifest {
  markers: MarkerObject[]
  notes: NoteEntry[]
}

type Shard = AnnotationObject[]
/** `tag` marks a run of changes that undo as one — a drag, a resize, a retype. */
type Op = { added: AnnotationObject[]; removed: AnnotationObject[]; tag?: string }

const EMPTY: Shard = []
const EMPTY_MANIFEST: Manifest = { markers: [], notes: [] }

export function useAnnotations(scope: string, page: number): AnnotationStore {
  const base = shardIndexFor(page)

  // A fixed number of hooks, whose keys move with the reader.
  const shard0 = usePersistentState<Shard>(shardKey(scope, base + WINDOW[0]), EMPTY)
  const shard1 = usePersistentState<Shard>(shardKey(scope, base + WINDOW[1]), EMPTY)
  const shard2 = usePersistentState<Shard>(shardKey(scope, base + WINDOW[2]), EMPTY)

  const [manifest, setManifest] = usePersistentState<Manifest>(manifestKey(scope), EMPTY_MANIFEST)

  const [error, setError] = useState<string | null>(null)
  const past = useRef<Op[]>([])
  const future = useRef<Op[]>([])
  const lastStamp = useRef(0)
  const [revision, setRevision] = useState(0)

  const shards = useMemo(() => new Map([
    [base + WINDOW[0], shard0],
    [base + WINDOW[1], shard1],
    [base + WINDOW[2], shard2],
  ]), [base, shard0, shard1, shard2])

  const objects = useMemo(
    () => [shard0[0], shard1[0], shard2[0]].flat().sort((a, b) => a.z - b.z),
    [shard0, shard1, shard2],
  )

  const write = useCallback((index: number, update: (current: Shard) => Shard) => {
    const entry = shards.get(index)
    if (!entry) return
    entry[1]((current) => {
      const next = update(current)
      if (byteSizeOf(next) > MAX_SHARD_BYTES) {
        setError('These pages hold as many marks as they can. Erase some before adding more.')
        return current
      }
      setError(null)
      return next
    })
  }, [shards])

  const applyAdd = useCallback((items: AnnotationObject[]) => {
    const byShard = new Map<number, AnnotationObject[]>()
    for (const object of items) {
      const index = shardIndexFor(object.page)
      byShard.set(index, [...(byShard.get(index) ?? []), object])
    }
    for (const [index, batch] of byShard) write(index, (current) => [...current, ...batch])
    // Mirror the words outside the shards so search can reach them from any page.
    if (items.some((object) => object.kind === 'note' || object.kind === 'textbox')) {
      setManifest((current) => ({ ...current, notes: upsertNotes(current.notes, items) }))
    }
  }, [setManifest, write])

  const applyRemove = useCallback((items: AnnotationObject[]) => {
    const byShard = new Map<number, Set<string>>()
    for (const object of items) {
      const index = shardIndexFor(object.page)
      const set = byShard.get(index) ?? new Set<string>()
      set.add(object.id)
      byShard.set(index, set)
    }
    for (const [index, ids] of byShard) write(index, (current) => current.filter((object) => !ids.has(object.id)))
    const worded = items.filter((object) => object.kind === 'note' || object.kind === 'textbox')
    if (worded.length) {
      setManifest((current) => ({ ...current, notes: dropNotes(current.notes, worded.map((object) => object.id)) }))
    }
  }, [setManifest, write])

  const record = useCallback((op: Op) => {
    past.current = [...past.current.slice(-99), op]
    future.current = []
    setRevision((current) => current + 1)
  }, [])

  const add = useCallback((object: AnnotationObject) => {
    applyAdd([object])
    record({ added: [object], removed: [] })
  }, [applyAdd, record])

  const remove = useCallback((ids: string[]) => {
    if (!ids.length) return
    const wanted = new Set(ids)
    const removed = objects.filter((object) => wanted.has(object.id))
    if (!removed.length) return
    applyRemove(removed)
    record({ added: [], removed })
  }, [applyRemove, objects, record])

  const update = useCallback((ids: string[], patch: (object: AnnotationObject) => AnnotationObject, coalesce?: string) => {
    if (!ids.length) return
    const wanted = new Set(ids)
    const before = objects.filter((object) => wanted.has(object.id))
    if (!before.length) return
    // Stamped here rather than in each caller: `t` is what tells the canvas a
    // mark changed, and a recolour that forgot to touch it would not repaint.
    // Forced to advance, because a drag emits several changes inside one
    // millisecond and two equal stamps would look like no change at all.
    const stamp = Math.max(Date.now(), lastStamp.current + 1)
    lastStamp.current = stamp
    const after = before.map((object) => ({ ...patch(object), t: stamp }))
    applyRemove(before)
    applyAdd(after)

    // A drag emits one of these per pointer move. Folding them into the step
    // that started the drag is what makes Undo mean "put it back where it was"
    // rather than "move it two pixels".
    const last = past.current[past.current.length - 1]
    if (coalesce && last?.tag === coalesce) {
      past.current = [...past.current.slice(0, -1), { ...last, added: after }]
      future.current = []
      setRevision((current) => current + 1)
      return
    }
    record({ added: after, removed: before, tag: coalesce })
  }, [applyAdd, applyRemove, objects, record])

  const undo = useCallback(() => {
    const op = past.current[past.current.length - 1]
    if (!op) return
    past.current = past.current.slice(0, -1)
    future.current = [...future.current, op]
    // The inverse: whatever was added is removed, whatever was removed comes back.
    if (op.added.length) applyRemove(op.added)
    if (op.removed.length) applyAdd(op.removed)
    setRevision((current) => current + 1)
  }, [applyAdd, applyRemove])

  const redo = useCallback(() => {
    const op = future.current[future.current.length - 1]
    if (!op) return
    future.current = future.current.slice(0, -1)
    past.current = [...past.current, op]
    if (op.added.length) applyAdd(op.added)
    if (op.removed.length) applyRemove(op.removed)
    setRevision((current) => current + 1)
  }, [applyAdd, applyRemove])

  const addMarker = useCallback((title: string, page: number) => {
    const marker: MarkerObject = {
      id: newObjectId(), kind: 'marker', page, z: 0, bbox: [0, 0, 0, 0], t: Date.now(), title,
    }
    setManifest((current) => ({
      ...current,
      markers: [...current.markers, marker].sort((a, b) => a.page - b.page),
    }))
  }, [setManifest])

  const removeMarker = useCallback((id: string) => {
    setManifest((current) => ({ ...current, markers: current.markers.filter((marker) => marker.id !== id) }))
  }, [setManifest])

  return {
    objects,
    markers: manifest.markers,
    noteIndex: manifest.notes,
    addMarker,
    removeMarker,
    add,
    remove,
    update,
    undo,
    redo,
    // `revision` is what makes these recompute; the stacks are refs so that a
    // stroke in progress does not re-render the whole document.
    canUndo: revision >= 0 && past.current.length > 0,
    canRedo: revision >= 0 && future.current.length > 0,
    error,
  }
}
