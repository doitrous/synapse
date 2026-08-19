import type { ResourceType } from './types'

/**
 * The demo resource catalogue.
 *
 * `saved: true` used to appear on three of these, so a student who had never
 * opened Connect Cortex arrived with three bookmarks already made for them. A
 * bookmark is the student's, and now lives in their own record.
 */

export interface Resource {
  id: string
  title: string
  type: ResourceType
  subjectId: string
  source: string
  meta: string
  year: number
  recommended?: boolean
  /** Chapter/topic a video belongs to — used to group the Videos section. */
  chapter?: string
  /** An admin's chosen glyph name; absent means the glyph for the type. */
  icon?: string
}

export const resources: Resource[] = [
  { id: 'r-kc', title: "Kumar & Clark's Clinical Medicine", type: 'Book', subjectId: 'cvs', source: 'Elsevier', meta: 'Ch. 23 · Cardiology', year: 2024, recommended: true },
  { id: 'r-ohcm', title: 'Oxford Handbook of Clinical Medicine', type: 'Book', subjectId: 'cvs', source: 'Oxford University Press', meta: '11th edition', year: 2023, recommended: true },
  { id: 'r-rangdale', title: 'Rang & Dale Pharmacology', type: 'Book', subjectId: 'pharm', source: 'Elsevier', meta: 'The kidney & diuretics', year: 2023 },
  { id: 'r-robbins', title: 'Robbins Basic Pathology', type: 'Book', subjectId: 'renal', source: 'Elsevier', meta: 'Ch. 20 · The kidney', year: 2022 },
  { id: 'r-guyton', title: 'Guyton & Hall Physiology', type: 'Book', subjectId: 'renal', source: 'Elsevier', meta: 'Acid–base regulation', year: 2021 },
  { id: 'r-grays', title: "Gray's Anatomy for Students", type: 'Book', subjectId: 'neuro', source: 'Elsevier', meta: 'The cranial nerves', year: 2023 },

  { id: 'r-osm-hf', title: 'Heart failure: compensatory mechanisms', type: 'Video', subjectId: 'cvs', source: 'Osmosis', meta: '12 min', year: 2024, recommended: true, chapter: 'Heart failure' },
  { id: 'r-osm-hf2', title: 'Heart failure: the four pillars of therapy', type: 'Video', subjectId: 'cvs', source: 'Osmosis', meta: '14 min', year: 2024, chapter: 'Heart failure' },
  { id: 'r-osm-acs', title: 'Acute coronary syndromes explained', type: 'Video', subjectId: 'cvs', source: 'Osmosis', meta: '18 min', year: 2024, chapter: 'Acute coronary syndromes' },
  { id: 'r-osm-acs2', title: 'STEMI vs NSTEMI on the ECG', type: 'Video', subjectId: 'cvs', source: 'Ninja Nerd', meta: '22 min', year: 2023, chapter: 'Acute coronary syndromes' },
  { id: 'r-osm-neph', title: 'The nephron & diuretic sites', type: 'Video', subjectId: 'pharm', source: 'Osmosis', meta: '15 min', year: 2023, chapter: 'Diuretics' },
  { id: 'r-osm-diur2', title: 'Loop, thiazide & potassium-sparing diuretics', type: 'Video', subjectId: 'pharm', source: 'Ninja Nerd', meta: '20 min', year: 2023, chapter: 'Diuretics' },
  { id: 'r-osm-asthma', title: 'Asthma pathophysiology', type: 'Video', subjectId: 'resp', source: 'Osmosis', meta: '10 min', year: 2022, chapter: 'Asthma' },
  { id: 'r-osm-asthma2', title: 'Stepwise management of asthma', type: 'Video', subjectId: 'resp', source: 'Osmosis', meta: '13 min', year: 2024, chapter: 'Asthma' },
  { id: 'r-osm-cn', title: 'Cranial nerves: an overview', type: 'Video', subjectId: 'neuro', source: 'Ninja Nerd', meta: '28 min', year: 2023, chapter: 'Cranial nerves' },
  { id: 'r-osm-abg', title: 'Interpreting the arterial blood gas', type: 'Video', subjectId: 'renal', source: 'Strong Medicine', meta: '17 min', year: 2022, chapter: 'Acid–base balance' },

  { id: 'r-ng106', title: 'NICE NG106 · Chronic heart failure', type: 'Guideline', subjectId: 'cvs', source: 'NICE', meta: 'Guideline', year: 2018, recommended: true },
  { id: 'r-ng185', title: 'NICE NG185 · Acute coronary syndromes', type: 'Guideline', subjectId: 'cvs', source: 'NICE', meta: 'Guideline', year: 2020 },
  { id: 'r-gina', title: 'GINA strategy report', type: 'Guideline', subjectId: 'resp', source: 'GINA', meta: 'Guideline', year: 2024 },
  { id: 'r-btssign', title: 'BTS/SIGN Asthma guideline', type: 'Guideline', subjectId: 'resp', source: 'BTS / SIGN', meta: 'Guideline', year: 2019 },

  { id: 'r-deck-diur', title: 'Diuretics & the nephron', type: 'Deck', subjectId: 'pharm', source: 'Faculty deck', meta: '38 slides', year: 2024 },
  { id: 'r-deck-cn', title: 'Cranial nerves — high-yield', type: 'Deck', subjectId: 'neuro', source: 'Faculty deck', meta: '26 slides', year: 2023 },

  { id: 'r-art-abg', title: 'A structured approach to the ABG', type: 'Article', subjectId: 'renal', source: 'Deranged Physiology', meta: '9 min read', year: 2022, recommended: true },
  { id: 'r-art-cn', title: 'Cranial nerves — high-yield notes', type: 'Article', subjectId: 'neuro', source: 'Geeky Medics', meta: '8 min read', year: 2023 },
]
