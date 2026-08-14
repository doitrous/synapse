import {
  Activity, Atom, BookMarked, BookOpenText, Brain, ClipboardList, Dna, FlaskConical,
  Heart, Layers, Microscope, Newspaper, Pill, PlayCircle, Ruler, ScanLine, ScrollText,
  Stethoscope, Syringe, TestTube,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ResourceType } from './types'

/**
 * The glyph on a resource.
 *
 * Every book looked like every other book, because the icon was derived from
 * the type alone: five glyphs for a whole library. An admin can now pick one
 * per resource, from a curated list rather than free text — a name that no
 * longer exists in the icon set would otherwise render nothing at all, and the
 * chosen name is stored, not the component.
 */

export const RESOURCE_ICONS: Record<string, LucideIcon> = {
  book: BookMarked,
  reader: BookOpenText,
  article: Newspaper,
  guideline: ScrollText,
  deck: Layers,
  video: PlayCircle,
  checklist: ClipboardList,
  anatomy: Ruler,
  physiology: Activity,
  heart: Heart,
  neuro: Brain,
  pharmacology: Pill,
  microbiology: Microscope,
  biochemistry: FlaskConical,
  genetics: Dna,
  pathology: TestTube,
  imaging: ScanLine,
  clinical: Stethoscope,
  procedure: Syringe,
  molecular: Atom,
}

export type ResourceIconName = keyof typeof RESOURCE_ICONS

/** For the picker: a stable order with readable labels. */
export const RESOURCE_ICON_CHOICES: { name: string; label: string }[] = [
  { name: 'book', label: 'Book' },
  { name: 'reader', label: 'Reader' },
  { name: 'article', label: 'Article' },
  { name: 'guideline', label: 'Guideline' },
  { name: 'deck', label: 'Slide deck' },
  { name: 'video', label: 'Video' },
  { name: 'checklist', label: 'Checklist' },
  { name: 'anatomy', label: 'Anatomy' },
  { name: 'physiology', label: 'Physiology' },
  { name: 'heart', label: 'Cardiology' },
  { name: 'neuro', label: 'Neurology' },
  { name: 'pharmacology', label: 'Pharmacology' },
  { name: 'microbiology', label: 'Microbiology' },
  { name: 'biochemistry', label: 'Biochemistry' },
  { name: 'genetics', label: 'Genetics' },
  { name: 'pathology', label: 'Pathology' },
  { name: 'imaging', label: 'Imaging' },
  { name: 'clinical', label: 'Clinical skills' },
  { name: 'procedure', label: 'Procedures' },
  { name: 'molecular', label: 'Molecular' },
]

const TYPE_FALLBACK: Record<ResourceType, LucideIcon> = {
  Book: BookMarked,
  Video: PlayCircle,
  Guideline: ScrollText,
  Deck: Layers,
  Article: Newspaper,
}

/** The admin's choice when there is one, else the glyph for the type. */
export function resourceIcon(name: string | undefined, type: ResourceType): LucideIcon {
  return (name && RESOURCE_ICONS[name]) || TYPE_FALLBACK[type]
}
