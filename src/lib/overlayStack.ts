/**
 * Which floating surface is on top.
 *
 * Escape has to dismiss exactly one thing: the time picker inside the block
 * editor, not the block editor with the half-filled form in it. Listeners
 * cannot work that out between themselves — a dialog attaches its handler
 * first, so it wins the capture phase over any popover opened later inside it,
 * and the more deeply nested surface loses. Ordering by *when a surface was
 * opened* is the only rule that matches what someone means by "go back".
 */

export type OverlayKind = 'dialog' | 'popover'

interface Layer {
  id: string
  kind: OverlayKind
}

const layers: Layer[] = []

export function pushOverlay(id: string, kind: OverlayKind): void {
  layers.push({ id, kind })
}

export function popOverlay(id: string): void {
  const at = layers.findIndex((layer) => layer.id === id)
  if (at !== -1) layers.splice(at, 1)
}

/** True while this surface is the one a dismissal should reach. */
export function isTopOverlay(id: string): boolean {
  return layers[layers.length - 1]?.id === id
}

/** How many of a kind are open — the page stays locked until no dialog is. */
export function countOverlays(kind: OverlayKind): number {
  return layers.reduce((total, layer) => total + (layer.kind === kind ? 1 : 0), 0)
}
