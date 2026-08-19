import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

/**
 * Renders a modal overlay into `<body>` rather than wherever the page asked
 * for it.
 *
 * A `position: fixed` overlay is only worth anything while `fixed` still
 * means "against the viewport", and it stops meaning that the moment any
 * ancestor holds a `transform`, `filter`, `backdrop-filter`, `perspective`,
 * `contain`, or a `will-change` naming one of those. The nearest such
 * ancestor becomes the containing block, and `inset-0` starts resolving
 * against a scrolling column inside the page instead of against the screen.
 *
 * That is not hypothetical: the screen-entrance animation on <main> used to
 * hold its final `transform` after finishing, and every overlay rendered
 * beneath it grew to the page's full scroll height and drifted with it. The
 * entrance no longer leaves a transform behind — but the next ancestor to
 * pick up a filter or a hover transform would have done the same thing.
 *
 * Rendering into `<body>` makes the whole class of failure unreachable rather
 * than merely currently-false: there is no ancestor left to capture the
 * overlay. React events still bubble through the component tree, so handlers
 * written against the page keep working.
 *
 * Only for overlays that mean the viewport. A transparent click-catcher that
 * belongs to a popover's local stacking order is not one of them.
 */
export function overlayPortal(overlay: ReactNode) {
  return createPortal(overlay, document.body)
}
