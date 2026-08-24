export interface MicroscopeTransitionRect {
  left: number
  top: number
  width: number
  height: number
}

export interface MicroscopeTransitionStart {
  x: number
  y: number
  scaleX: number
  scaleY: number
}

/**
 * Place an element laid out at `destination` exactly over `origin`.
 *
 * The transition layer always uses the real field-of-view rectangle as its
 * layout box. Only its transform changes, so returning to `transform: none`
 * cannot land somewhere different from the viewer that replaces it.
 */
export function microscopeTransitionStart(
  origin: MicroscopeTransitionRect,
  destination: MicroscopeTransitionRect,
): MicroscopeTransitionStart {
  const originCenterX = origin.left + origin.width / 2
  const originCenterY = origin.top + origin.height / 2
  const destinationCenterX = destination.left + destination.width / 2
  const destinationCenterY = destination.top + destination.height / 2

  return {
    x: originCenterX - destinationCenterX,
    y: originCenterY - destinationCenterY,
    scaleX: destination.width > 0 ? origin.width / destination.width : 1,
    scaleY: destination.height > 0 ? origin.height / destination.height : 1,
  }
}

