import type { ContextMenuItem } from '@/components/ui/ContextMenu'

/**
 * Extra right-click actions contributed by whatever was clicked.
 *
 * The shell's context menu is mounted once and knows nothing about the surfaces
 * under it, which is right for the actions that always apply — copy a phrase,
 * look it up, open a row. It is wrong for the actions that only make sense in
 * one place: the formatting a notebook offers, the board actions a whiteboard
 * offers. Those live with the surface that implements them.
 *
 * A surface marks its region with `data-context-scope="<name>"` and registers a
 * builder under the same name while it is mounted. The builder is called with
 * the element that was actually clicked, so it can tell a note body from a note
 * title, and with whatever text is selected.
 *
 * A registered scope also overrides the shell's rule about form controls: the
 * browser's own menu is better than an empty one, but it is not better than the
 * formatting menu for the field it is standing in.
 */

export interface ScopeContext {
  /** The element the pointer was over. */
  element: HTMLElement
  /** The element carrying `data-context-scope`. */
  region: HTMLElement
  /** Trimmed text selection, empty when there is none. */
  selection: string
}

export type ScopeBuilder = (context: ScopeContext) => ContextMenuItem[]

const builders = new Map<string, ScopeBuilder>()

/** Register a scope for as long as the surface is mounted. Returns the undo. */
export function registerContextScope(name: string, build: ScopeBuilder): () => void {
  builders.set(name, build)
  return () => {
    // Only if it is still ours: a remount registers the new builder before the
    // old one's cleanup runs, and deleting unconditionally would drop it.
    if (builders.get(name) === build) builders.delete(name)
  }
}

/** The nearest registered scope's items for this click, innermost first. */
export function scopeItemsFor(element: HTMLElement | null, selection: string): ContextMenuItem[] {
  let node: HTMLElement | null = element
  while (node) {
    const region = node.closest<HTMLElement>('[data-context-scope]')
    if (!region) return []
    const build = builders.get(region.dataset.contextScope ?? '')
    if (build) return build({ element, region, selection } as ScopeContext)
    // A region whose surface is not mounted is not a reason to stop looking.
    node = region.parentElement
  }
  return []
}

/** Whether anything at all would answer a right-click here. */
export function hasContextScope(element: HTMLElement | null): boolean {
  return scopeItemsFor(element, '').length > 0
}
