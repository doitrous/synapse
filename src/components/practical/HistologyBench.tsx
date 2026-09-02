import { useState } from 'react'
import { Microscope } from '@/components/practical/Microscope'
import { SlideViewer } from '@/components/practical/SlideViewer'
import type { MicroscopeTransitionRect } from '@/components/practical/microscopeTransition'
import type { HistologySlide } from '@/data/histology'

/**
 * The bench: the instrument, the slides beside it, and what you see once one is
 * under the lens. Kept apart from the page so the viewer can take the whole
 * width without the chooser above it.
 */
export function HistologyBench() {
  const [open, setOpen] = useState<{ slide: HistologySlide; origin?: MicroscopeTransitionRect } | null>(null)
  if (open) {
    return (
      <SlideViewer
        slide={open.slide}
        transitionOrigin={open.origin}
        onClose={() => setOpen(null)}
      />
    )
  }
  return <Microscope onOpen={(slide, origin) => setOpen({ slide, origin })} />
}
