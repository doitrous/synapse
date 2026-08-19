import type { KeyboardEvent } from 'react'

/**
 * A whole row or card that opens what it describes.
 *
 * A list row that only responds to a small icon at its far right is a target
 * the size of a thumbnail on a line the width of the page — the title, the
 * thing someone is actually aiming at, does nothing. This makes the row itself
 * the target while keeping it reachable from the keyboard.
 *
 * Controls nested inside a row (a bookmark toggle, a menu) must stop
 * propagation, or pressing them also opens the row.
 */
export function clickableRow(onOpen: () => void, className: string) {
  return {
    role: 'button' as const,
    tabIndex: 0,
    onClick: onOpen,
    onKeyDown: (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      onOpen()
    },
    className: `cursor-pointer transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-primary)] ${className}`,
  }
}

/** Props for a control inside a clickable row, so it does not also open it. */
export const stopRowClick = {
  onClick: (event: { stopPropagation: () => void }) => event.stopPropagation(),
  onKeyDown: (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') event.stopPropagation()
  },
}
