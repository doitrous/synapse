import { useEffect, useState } from 'react'
import { NishanyLoader } from '@/components/ui/NishanyLoader'

/**
 * What a surface looks like while its chunk is still arriving.
 *
 * This used to be the words "Opening Maristana…" centred in an empty page, in
 * English regardless of the chosen language, and then a card skeleton. The
 * skeleton promised a shape the arriving page often did not have — six cards
 * for a whiteboard, a grid for a reader — so it read as a flicker of the wrong
 * page rather than as this one loading. The loader promises nothing except
 * that Nishany is working, which is the only thing that is actually true here.
 *
 * The 150 ms gate stays: with route chunks prefetched on hover, most loads
 * finish before it fires and show nothing at all, which is better than a
 * loader that blinks.
 */
export function RouteLoading() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 150)
    return () => window.clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="grid min-h-[40dvh] place-items-center" role="status" aria-busy="true">
      <NishanyLoader size={48} decorative />
    </div>
  )
}
