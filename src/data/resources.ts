import type { ResourceType } from './types'

export interface Resource {
  id: string
  title: string
  type: ResourceType
  subjectId: string
  source: string
  meta: string
  year: number
  recommended?: boolean
  saved?: boolean
}

export const resources: Resource[] = [
  { id: 'r-kc', title: "Kumar & Clark's Clinical Medicine", type: 'Book', subjectId: 'cvs', source: 'Elsevier', meta: 'Ch. 23 · Cardiology', year: 2024, recommended: true, saved: true },
  { id: 'r-ohcm', title: 'Oxford Handbook of Clinical Medicine', type: 'Book', subjectId: 'cvs', source: 'Oxford University Press', meta: '11th edition', year: 2023, recommended: true },
  { id: 'r-rangdale', title: 'Rang & Dale Pharmacology', type: 'Book', subjectId: 'pharm', source: 'Elsevier', meta: 'The kidney & diuretics', year: 2023 },
  { id: 'r-robbins', title: 'Robbins Basic Pathology', type: 'Book', subjectId: 'renal', source: 'Elsevier', meta: 'Ch. 20 · The kidney', year: 2022 },
  { id: 'r-guyton', title: 'Guyton & Hall Physiology', type: 'Book', subjectId: 'renal', source: 'Elsevier', meta: 'Acid–base regulation', year: 2021 },
  { id: 'r-grays', title: "Gray's Anatomy for Students", type: 'Book', subjectId: 'neuro', source: 'Elsevier', meta: 'The cranial nerves', year: 2023 },

  { id: 'r-osm-hf', title: 'Heart failure: compensatory mechanisms', type: 'Video', subjectId: 'cvs', source: 'Osmosis', meta: '12 min', year: 2024, recommended: true, saved: true },
  { id: 'r-osm-neph', title: 'The nephron & diuretic sites', type: 'Video', subjectId: 'pharm', source: 'Osmosis', meta: '15 min', year: 2023 },
  { id: 'r-osm-acs', title: 'Acute coronary syndromes explained', type: 'Video', subjectId: 'cvs', source: 'Osmosis', meta: '18 min', year: 2024 },
  { id: 'r-osm-asthma', title: 'Asthma pathophysiology', type: 'Video', subjectId: 'resp', source: 'Osmosis', meta: '10 min', year: 2022 },

  { id: 'r-ng106', title: 'NICE NG106 · Chronic heart failure', type: 'Guideline', subjectId: 'cvs', source: 'NICE', meta: 'Guideline', year: 2018, recommended: true },
  { id: 'r-ng185', title: 'NICE NG185 · Acute coronary syndromes', type: 'Guideline', subjectId: 'cvs', source: 'NICE', meta: 'Guideline', year: 2020 },
  { id: 'r-gina', title: 'GINA strategy report', type: 'Guideline', subjectId: 'resp', source: 'GINA', meta: 'Guideline', year: 2024 },
  { id: 'r-btssign', title: 'BTS/SIGN Asthma guideline', type: 'Guideline', subjectId: 'resp', source: 'BTS / SIGN', meta: 'Guideline', year: 2019 },

  { id: 'r-deck-diur', title: 'Diuretics & the nephron', type: 'Deck', subjectId: 'pharm', source: 'Faculty deck', meta: '38 slides', year: 2024, saved: true },
  { id: 'r-deck-cn', title: 'Cranial nerves — high-yield', type: 'Deck', subjectId: 'neuro', source: 'Faculty deck', meta: '26 slides', year: 2023 },

  { id: 'r-art-abg', title: 'A structured approach to the ABG', type: 'Article', subjectId: 'renal', source: 'Deranged Physiology', meta: '9 min read', year: 2022, recommended: true },
  { id: 'r-art-cn', title: 'Cranial nerves — high-yield notes', type: 'Article', subjectId: 'neuro', source: 'Geeky Medics', meta: '8 min read', year: 2023 },
]
