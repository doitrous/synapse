/**
 * The focus half of an overlay's keyboard contract.
 *
 * `Dialog` grew this first — focus the first thing worth acting on, wrap Tab at
 * the ends, hand focus back where it came from — and `Popover` needed exactly
 * the same three behaviours. Rather than write them twice (and have them drift),
 * both surfaces call these. The Escape half stays with `overlayStack`, which
 * already knows which overlay is on top.
 */

export const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * The tabbable descendants of `root`, in document order.
 *
 * Re-queried on every Tab rather than cached: an overlay's contents change as it
 * is filled in, and a stale list traps the user against a control that has gone.
 * A node with no `offsetParent` is hidden — unless it is the one currently
 * focused, which a `position: fixed` control legitimately is.
 */
export function focusableWithin(root: HTMLElement | null): HTMLElement[] {
  if (!root) return []
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)]
    .filter((node) => node.offsetParent !== null || node === document.activeElement)
}

/**
 * Move focus to the first control inside `root`, falling back to `root` itself
 * so a keyboard user lands inside the surface rather than still behind it. The
 * fallback needs `tabIndex={-1}` on the element to take.
 */
export function focusFirstWithin(root: HTMLElement | null): void {
  if (!root) return
  ;(focusableWithin(root)[0] ?? root).focus()
}

/**
 * Wrap Tab and Shift+Tab at the ends of `root`. Call it from a `keydown`
 * listener; it consumes the event only when it actually moves focus.
 */
export function wrapTab(event: KeyboardEvent, root: HTMLElement | null): void {
  if (event.key !== 'Tab') return
  const items = focusableWithin(root)
  if (!items.length) return
  const head = items[0]
  const tail = items[items.length - 1]
  if (event.shiftKey && document.activeElement === head) {
    event.preventDefault()
    tail.focus()
  } else if (!event.shiftKey && document.activeElement === tail) {
    event.preventDefault()
    head.focus()
  }
}
