import { useEffect, useRef } from 'react'

/**
 * Moving the document with the mouse, and zooming where the pointer is.
 *
 * With no tool selected a left-drag pans, which is how every document reader
 * behaves and how this one did not — the only way through a file was the wheel
 * or the scrollbar. Releasing a drag carries on with a little inertia, because
 * a trackpad's own scrolling has momentum and a drag without it feels broken
 * next to it.
 */

const FRICTION = 0.94
const MIN_VELOCITY = 0.05
/** Samples kept for the throw, in ms. */
const VELOCITY_WINDOW = 90

export interface PanZoomOptions {
  scroller: React.RefObject<HTMLElement | null>
  /** False while a tool owns the pointer — an ink tool, a lasso. */
  enabled: boolean
  /** Cursor-anchored zoom. `pointer` is relative to the scroller's box. */
  onZoom: (factor: number, pointer: { x: number; y: number }) => void
}

export function usePanAndZoom({ scroller, enabled, onZoom }: PanZoomOptions) {
  const dragging = useRef(false)
  const samples = useRef<{ at: number; x: number; y: number }[]>([])
  const frame = useRef(0)
  const enabledRef = useRef(enabled)
  const zoomRef = useRef(onZoom)
  enabledRef.current = enabled
  zoomRef.current = onZoom

  useEffect(() => {
    const node = scroller.current
    if (!node) return

    const stopInertia = () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = 0
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!enabledRef.current) return
      // Left button only, and never on something the reader means to press.
      if (event.button !== 0 || event.pointerType === 'touch') return
      if ((event.target as HTMLElement).closest('a,button,input,textarea,[role="button"]')) return
      stopInertia()
      dragging.current = true
      samples.current = [{ at: performance.now(), x: event.clientX, y: event.clientY }]
      node.setPointerCapture(event.pointerId)
      node.style.cursor = 'grabbing'
      node.style.userSelect = 'none'
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current) return
      const last = samples.current[samples.current.length - 1]
      if (!last) return
      node.scrollLeft -= event.clientX - last.x
      node.scrollTop -= event.clientY - last.y
      const now = performance.now()
      samples.current.push({ at: now, x: event.clientX, y: event.clientY })
      while (samples.current.length > 2 && now - samples.current[0].at > VELOCITY_WINDOW) samples.current.shift()
    }

    const endDrag = (event: PointerEvent) => {
      if (!dragging.current) return
      dragging.current = false
      node.releasePointerCapture?.(event.pointerId)
      node.style.cursor = ''
      node.style.userSelect = ''

      const first = samples.current[0]
      const last = samples.current[samples.current.length - 1]
      samples.current = []
      if (!first || !last) return
      const elapsed = last.at - first.at
      if (elapsed <= 0) return

      let vx = -(last.x - first.x) / elapsed
      let vy = -(last.y - first.y) / elapsed
      const throwOn = () => {
        vx *= FRICTION
        vy *= FRICTION
        node.scrollLeft += vx * 16
        node.scrollTop += vy * 16
        if (Math.abs(vx) > MIN_VELOCITY || Math.abs(vy) > MIN_VELOCITY) {
          frame.current = requestAnimationFrame(throwOn)
        } else frame.current = 0
      }
      if (Math.abs(vx) > MIN_VELOCITY || Math.abs(vy) > MIN_VELOCITY) frame.current = requestAnimationFrame(throwOn)
    }

    const onWheel = (event: WheelEvent) => {
      // A trackpad pinch arrives as ctrl+wheel; so does a deliberate cmd-wheel.
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      const box = node.getBoundingClientRect()
      zoomRef.current(Math.exp(-event.deltaY / 320), { x: event.clientX - box.left, y: event.clientY - box.top })
    }

    node.addEventListener('pointerdown', onPointerDown)
    node.addEventListener('pointermove', onPointerMove)
    node.addEventListener('pointerup', endDrag)
    node.addEventListener('pointercancel', endDrag)
    node.addEventListener('wheel', onWheel, { passive: false })
    // A fresh wheel or touch scroll should stop a throw already in flight.
    node.addEventListener('wheel', stopInertia, { passive: true })
    node.addEventListener('touchstart', stopInertia, { passive: true })

    return () => {
      stopInertia()
      node.removeEventListener('pointerdown', onPointerDown)
      node.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('pointerup', endDrag)
      node.removeEventListener('pointercancel', endDrag)
      node.removeEventListener('wheel', onWheel)
      node.removeEventListener('wheel', stopInertia)
      node.removeEventListener('touchstart', stopInertia)
      node.style.cursor = ''
      node.style.userSelect = ''
    }
  }, [scroller])
}
