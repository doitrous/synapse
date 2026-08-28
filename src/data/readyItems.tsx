/**
 * READY ITEMS — shared library of 50 pre-made medical/study icons.
 *
 * Usage contract (this module is a shared dependency — keep its interface
 * stable, both consumers below rely on it):
 * - Whiteboard: dropping a ready item places a new element on the canvas.
 *   Render `<item.Svg className="h-8 w-8" />` inside the board's own
 *   positioned/resizable wrapper; treat the SVG as the visual payload only.
 * - Notebook: inserting a ready item drops it inline in the rich-text flow
 *   (e.g. as a Lexical decorator node). Render
 *   `<item.Svg className="h-5 w-5 inline-block align-text-bottom" />` next
 *   to surrounding text.
 *
 * Each `Svg` is a small, self-contained line icon (`viewBox="0 0 24 24"`,
 * ~1.75 stroke width, round caps/joins) that inherits color via
 * `currentColor` so callers can theme it with a text-color class. A handful
 * of trend/symptom icons use a fixed semantic color (green "improving" /
 * red "worsening") because the color itself is part of the meaning.
 *
 * READY_ITEMS is static data — do not mutate it at runtime.
 */
import type { ReactElement, ReactNode, SVGProps } from 'react'

export type ReadyItemCategory = 'anatomy' | 'tools' | 'people' | 'trends' | 'symptoms' | 'general'

export interface ReadyItem {
  id: string
  label: string
  category: ReadyItemCategory
  keywords: string[]
  Svg: (props: { className?: string }) => ReactElement
}

function icon(
  paths: ReactNode,
  extra?: Partial<SVGProps<SVGSVGElement>>,
): (props: { className?: string }) => ReactElement {
  return function ReadyItemSvg({ className }: { className?: string }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        {...extra}
      >
        {paths}
      </svg>
    )
  }
}

export const READY_ITEMS: ReadyItem[] = [
  // ── people ────────────────────────────────────────────────────────────
  {
    id: 'patient',
    label: 'Patient',
    category: 'people',
    keywords: ['patient', 'person', 'bed', 'inpatient'],
    Svg: icon(
      <>
        <circle cx="8" cy="6" r="2.25" />
        <path d="M3 20v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
        <path d="M13 20h8v-3a2 2 0 0 0-2-2h-4" />
        <path d="M13 15h6" />
      </>,
    ),
  },
  {
    id: 'doctor',
    label: 'Doctor',
    category: 'people',
    keywords: ['doctor', 'physician', 'clinician', 'md'],
    Svg: icon(
      <>
        <circle cx="12" cy="5.5" r="2.25" />
        <path d="M6 21v-3a6 6 0 0 1 12 0v3" />
        <path d="M9 12v2a3 3 0 0 0 6 0v-2" />
        <path d="M6 12H4.5A1.5 1.5 0 0 1 3 10.5V9" />
        <path d="M18 12h1.5A1.5 1.5 0 0 0 21 10.5V9" />
      </>,
    ),
  },
  {
    id: 'nurse',
    label: 'Nurse',
    category: 'people',
    keywords: ['nurse', 'caregiver', 'staff'],
    Svg: icon(
      <>
        <circle cx="12" cy="5.5" r="2.25" />
        <path d="M6 21v-3a6 6 0 0 1 12 0v3" />
        <path d="M12 5.5V3M10.5 4h3" />
        <path d="M10 13h4M12 11v4" />
      </>,
    ),
  },
  {
    id: 'male-symbol',
    label: 'Male symbol',
    category: 'people',
    keywords: ['male', 'man', 'gender', 'sex'],
    Svg: icon(
      <>
        <circle cx="10" cy="14" r="5.25" />
        <path d="M14 10 19.5 4.5M15 4.5h4.5V9" />
      </>,
    ),
  },
  {
    id: 'female-symbol',
    label: 'Female symbol',
    category: 'people',
    keywords: ['female', 'woman', 'gender', 'sex'],
    Svg: icon(
      <>
        <circle cx="12" cy="9" r="5.25" />
        <path d="M12 14.25V21M9 18h6" />
      </>,
    ),
  },

  // ── tools / equipment ───────────────────────────────────────────────────
  {
    id: 'stethoscope',
    label: 'Stethoscope',
    category: 'tools',
    keywords: ['stethoscope', 'auscultation', 'exam'],
    Svg: icon(
      <path d="M9 4v5a3 3 0 0 0 6 0V4M7 4h2m6 0h2m-5 8v3a4 4 0 0 0 8 0v-1.5a2.5 2.5 0 1 0-2 0V15a2 2 0 0 1-4 0v-3" />,
    ),
  },
  {
    id: 'syringe',
    label: 'Syringe',
    category: 'tools',
    keywords: ['syringe', 'injection', 'vaccine', 'shot'],
    Svg: icon(
      <>
        <path d="M20 4 17 7M18.5 5.5 8 16v2.5H5.5L16 8" />
        <path d="M6.5 17.5 4 20M10 12l2 2M13 9l2 2" />
      </>,
    ),
  },
  {
    id: 'needle',
    label: 'Needle',
    category: 'tools',
    keywords: ['needle', 'injection', 'sharp'],
    Svg: icon(
      <>
        <path d="M19 3 21 5 8 18l-3 1 1-3z" />
        <path d="M15 7l2 2" />
      </>,
    ),
  },
  {
    id: 'pill',
    label: 'Pill / tablet',
    category: 'tools',
    keywords: ['pill', 'tablet', 'medication', 'drug', 'capsule'],
    Svg: icon(
      <path d="M10 21a5 5 0 0 1-3.5-8.5l6-6a5 5 0 0 1 7 7l-6 6A5 5 0 0 1 10 21Zm-1.5-7.5 7 7" />,
    ),
  },
  {
    id: 'iv-drip',
    label: 'IV drip',
    category: 'tools',
    keywords: ['iv', 'drip', 'infusion', 'fluids'],
    Svg: icon(
      <>
        <path d="M8 3h8" />
        <path d="M9 3v3.5a3 3 0 0 0 6 0V3" />
        <path d="M12 9.5v3" />
        <path d="M12 12.5a3.5 4 0 0 0-3.5 4c0 2.2 1.6 4.5 3.5 4.5s3.5-2.3 3.5-4.5a3.5 4 0 0 0-3.5-4Z" />
      </>,
    ),
  },
  {
    id: 'microscope',
    label: 'Microscope',
    category: 'tools',
    keywords: ['microscope', 'lab', 'pathology', 'histology'],
    Svg: icon(
      <path d="M10 4h5v4h-5zM12.5 8v3.5l-3 3M7 20h11M9 17h7a5 5 0 0 0-5-5M5 20h3m8-9 2-2" />,
    ),
  },
  {
    id: 'test-tube',
    label: 'Test tube',
    category: 'tools',
    keywords: ['test tube', 'lab', 'sample', 'blood test'],
    Svg: icon(
      <>
        <path d="M9 3h6M10 3v13a2 2 0 0 0 4 0V3" />
        <path d="M10 12h4" />
      </>,
    ),
  },
  {
    id: 'thermometer',
    label: 'Thermometer',
    category: 'tools',
    keywords: ['thermometer', 'temperature', 'fever'],
    Svg: icon(
      <>
        <path d="M12 14.5V5a2 2 0 0 0-4 0v9.5a3.5 3.5 0 1 0 4 0Z" />
        <path d="M12 8h1.5M12 11h1.5" />
      </>,
    ),
  },
  {
    id: 'blood-pressure-cuff',
    label: 'Blood-pressure cuff',
    category: 'tools',
    keywords: ['blood pressure', 'cuff', 'sphygmomanometer', 'bp'],
    Svg: icon(
      <>
        <rect x="4" y="9" width="9" height="7" rx="1.5" />
        <path d="M13 11h3" />
        <circle cx="19" cy="9" r="3" />
        <path d="M19 7.5v1.8l1.2 1" />
      </>,
    ),
  },
  {
    id: 'bandage',
    label: 'Bandage',
    category: 'tools',
    keywords: ['bandage', 'wound', 'plaster', 'dressing'],
    Svg: icon(
      <>
        <rect x="3.5" y="9.5" width="17" height="5" rx="2.5" transform="rotate(-35 12 12)" />
        <circle cx="8.4" cy="10.6" r="0.9" transform="rotate(-35 12 12)" />
        <circle cx="15.6" cy="13.4" r="0.9" transform="rotate(-35 12 12)" />
      </>,
    ),
  },
  {
    id: 'wheelchair',
    label: 'Wheelchair',
    category: 'tools',
    keywords: ['wheelchair', 'mobility', 'accessibility'],
    Svg: icon(
      <>
        <circle cx="9" cy="16" r="4.25" />
        <path d="M9 5.5h1.5l1 6h5.5" />
        <path d="M11.5 11.5 14 18h4" />
        <path d="M8.5 5.5h2" />
      </>,
    ),
  },
  {
    id: 'ambulance',
    label: 'Ambulance',
    category: 'tools',
    keywords: ['ambulance', 'emergency', 'transport'],
    Svg: icon(
      <>
        <path d="M3 16V8h9v8" />
        <path d="M12 11h5l3 3v2h-2" />
        <path d="M3 16H2" />
        <circle cx="7" cy="17.5" r="1.6" />
        <circle cx="16.5" cy="17.5" r="1.6" />
        <path d="M6.5 10.5h3M8 9v3" />
      </>,
    ),
  },
  {
    id: 'scalpel',
    label: 'Scalpel',
    category: 'tools',
    keywords: ['scalpel', 'surgery', 'blade', 'operate'],
    Svg: icon(<path d="M4 20 14 10l4-4 2 2-4 4L6 22zM17 5l2 2" />),
  },
  {
    id: 'clipboard-chart',
    label: 'Clipboard / chart',
    category: 'tools',
    keywords: ['clipboard', 'chart', 'notes', 'record'],
    Svg: icon(
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
        <path d="M8 13l2.5 2.5L14 11l2.5 3" />
      </>,
    ),
  },
  {
    id: 'prescription-rx',
    label: 'Prescription (Rx)',
    category: 'tools',
    keywords: ['prescription', 'rx', 'medication order'],
    Svg: icon(
      <>
        <path d="M7 20V5h4.5a3.5 3.5 0 0 1 0 7H7" />
        <path d="M11 12l6 8" />
      </>,
    ),
  },
  {
    id: 'oxygen-mask',
    label: 'Oxygen mask',
    category: 'tools',
    keywords: ['oxygen', 'mask', 'breathing', 'o2'],
    Svg: icon(
      <>
        <path d="M6 10a6 5 0 0 1 12 0v2a6 5 0 0 1-12 0Z" />
        <circle cx="12" cy="11" r="1.6" />
        <path d="M4 10h2M18 10h2" />
        <path d="M5 8.5v3M19 8.5v3" />
      </>,
    ),
  },
  {
    id: 'x-ray',
    label: 'X-ray',
    category: 'tools',
    keywords: ['x-ray', 'radiograph', 'imaging', 'radiology'],
    Svg: icon(
      <>
        <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
        <path d="M9 8c0 2-1.5 2.5-1.5 4.5S9 15 9 17" />
        <path d="M15 8c0 2 1.5 2.5 1.5 4.5S15 15 15 17" />
        <path d="M9 12.5h6" />
      </>,
    ),
  },

  // ── anatomy ──────────────────────────────────────────────────────────
  {
    id: 'heart',
    label: 'Heart',
    category: 'anatomy',
    keywords: ['heart', 'cardiac', 'cardiology'],
    Svg: icon(<path d="M12 20s-7-4.4-9-9a4.7 4.7 0 0 1 8-5 4.7 4.7 0 0 1 8 5c-2 4.6-9 9-9 9Z" />),
  },
  {
    id: 'brain',
    label: 'Brain',
    category: 'anatomy',
    keywords: ['brain', 'neuro', 'neurology', 'cns'],
    Svg: icon(
      <path d="M9 4.5a3 3 0 0 0-3 3v.3A3 3 0 0 0 4.5 10a3 3 0 0 0 0 4 3 3 0 0 0 2 4.7A3 3 0 0 0 9 21c1 0 1.9-.5 2.4-1.3.4.2.9.3 1.4.3V4.5a2.5 2.5 0 0 0-3.8 0Zm3.8 0a2.5 2.5 0 0 1 3.8 0M15 4.5a3 3 0 0 1 3 3v.3A3 3 0 0 1 19.5 10a3 3 0 0 1 0 4 3 3 0 0 1-2 4.7A3 3 0 0 1 15 21c-1 0-1.9-.5-2.4-1.3" />,
    ),
  },
  {
    id: 'lungs',
    label: 'Lungs',
    category: 'anatomy',
    keywords: ['lungs', 'respiratory', 'pulmonary', 'breathing'],
    Svg: icon(
      <path d="M12 4v7.5M12 11.5c-.5-2-2-3-3.5-3S6 9.8 6 12v4c0 2 1 3.5 2.5 3.5S11 18.5 11 16v-2M12 11.5c.5-2 2-3 3.5-3S18 9.8 18 12v4c0 2-1 3.5-2.5 3.5S13 18.5 13 16v-2M9 5.5 12 4l3 1.5" />,
    ),
  },
  {
    id: 'kidney',
    label: 'Kidney',
    category: 'anatomy',
    keywords: ['kidney', 'renal', 'nephrology'],
    Svg: icon(
      <path d="M9.5 3.5c-3.3 0-5.5 3-5.5 7s2.2 10 5 10c2 0 2-2.5 3.5-2.5S15 20.5 17 20.5c2.8 0 3-3.8 1.5-6-1.2-1.7-1.2-2.8 0-4.5C20 7.8 19.8 3.5 17 3.5c-2 0-2 2.5-3.5 2.5S11.5 3.5 9.5 3.5Z" />,
    ),
  },
  {
    id: 'liver',
    label: 'Liver',
    category: 'anatomy',
    keywords: ['liver', 'hepatic', 'hepatology'],
    Svg: icon(
      <path d="M4 11c0-3.5 3-6.5 8-6.5 5.5 0 8.5 3 8.5 6a3.5 3.5 0 0 1-1 6.5c.3 2-1 3.5-3 3.5-1.2 0-2-1.8-3.5-1.8S10 20.5 8 20.5c-2.5 0-4-1.7-4-4 0-1.2.7-2 1.5-2.7C4.6 13 4 12.2 4 11Z" />,
    ),
  },
  {
    id: 'stomach',
    label: 'Stomach',
    category: 'anatomy',
    keywords: ['stomach', 'gastric', 'gi', 'digestive'],
    Svg: icon(
      <path d="M8 3.5c0 1.5-1 2-1 4.5 0 1.5 1 2 1 3.5 0 3 1.5 5.5 3 6.5 2 1.3 5-.2 6.5-2.5 1.5-2.3 1-6-1-7.5-1.2-.9-1.5-2-1-4M8 3.5c1 0 1.5.5 2.5.5s1.5-.5 2.5-.5" />,
    ),
  },
  {
    id: 'bone',
    label: 'Bone',
    category: 'anatomy',
    keywords: ['bone', 'orthopedics', 'skeletal', 'fracture'],
    Svg: icon(
      <path d="M6.5 5.5a2.25 2.25 0 1 0-3.2 3.2c-.6.7-.6 1.8.1 2.4l8.4 8.4c.7.7 1.8.6 2.4-.1a2.25 2.25 0 1 0 3.2-3.2c.6-.7.6-1.8-.1-2.4L9.1 5.4c-.7-.7-1.8-.6-2.4.1Z" />,
    ),
  },
  {
    id: 'tooth',
    label: 'Tooth',
    category: 'anatomy',
    keywords: ['tooth', 'dental', 'dentistry'],
    Svg: icon(
      <path d="M12 4c-1.4 0-2.2.8-3.2.8S6.8 4 5.5 4C3.6 4 3 6 3.3 8c.3 2 1.4 3.3 1.9 5.5.4 2 .8 6.5 2.3 6.5 1.3 0 1.3-3.5 2-5.5.3-.9.7-1.5 1.5-1.5s1.2.6 1.5 1.5c.7 2 .7 5.5 2 5.5 1.5 0 1.9-4.5 2.3-6.5.5-2.2 1.6-3.5 1.9-5.5.3-2-.3-4-2.2-4-1.3 0-1.5.8-2.5.8S13.4 4 12 4Z" />,
    ),
  },
  {
    id: 'eye',
    label: 'Eye',
    category: 'anatomy',
    keywords: ['eye', 'ophthalmology', 'vision'],
    Svg: icon(
      <>
        <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>,
    ),
  },
  {
    id: 'ear',
    label: 'Ear',
    category: 'anatomy',
    keywords: ['ear', 'ent', 'audiology', 'hearing'],
    Svg: icon(
      <path d="M15 4a6 6 0 0 0-6 6c0 2 1 2.8 1 4.5A2.5 2.5 0 0 1 7.5 17 2.5 2.5 0 0 1 5 14.5M15 4a6 6 0 0 1 6 6c0 4-3 5-3 8a3 3 0 0 1-6 0v-3.5" />,
    ),
  },
  {
    id: 'skin',
    label: 'Skin',
    category: 'anatomy',
    keywords: ['skin', 'dermatology', 'integument'],
    Svg: icon(
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2" />
        <path d="M7 9.5c1 1.2 2 1.2 3 0s2-1.2 3 0 2 1.2 3 0 2-1.2 3 0" />
        <path d="M7 14.5c1 1.2 2 1.2 3 0s2-1.2 3 0 2 1.2 3 0 2-1.2 3 0" />
      </>,
    ),
  },
  {
    id: 'muscle',
    label: 'Muscle',
    category: 'anatomy',
    keywords: ['muscle', 'strength', 'musculoskeletal'],
    Svg: icon(
      <path d="M3 13c0-4 2.5-8 6-8 2 0 2 1.5 3.5 1.5S14 5 16 5c3 0 5 3 5 6.5 0 4-2 8-6 8-1.5 0-2-1-2-2.5 0-2 1-2.5 1-4 0-1-.7-1.5-1.5-1.5S11 12 11 13c0 1.5 1 2 1 4 0 1.5-.5 2.5-2 2.5C6 19.5 3 17 3 13Z" />,
    ),
  },
  {
    id: 'nerve',
    label: 'Nerve',
    category: 'anatomy',
    keywords: ['nerve', 'neuron', 'neurology', 'synapse'],
    Svg: icon(
      <path d="M12 12m-2.2 0a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0M4.5 5.5l5.7 4.8M19.5 5.5l-5.7 4.8M4.5 18.5l5.7-4.8M19.5 18.5l-5.7-4.8M4.5 5.5h3M19.5 5.5h-3M4.5 18.5h3M19.5 18.5h-3" />,
    ),
  },

  // ── general / biology ────────────────────────────────────────────────
  {
    id: 'pulse',
    label: 'Pulse / heartbeat',
    category: 'general',
    keywords: ['pulse', 'heartbeat', 'ecg', 'vitals', 'monitor'],
    Svg: icon(<path d="M2 12h4l2-6 3 12 2.5-9 1.5 3h7" />),
  },
  {
    id: 'blood-drop',
    label: 'Blood drop',
    category: 'general',
    keywords: ['blood', 'drop', 'donation', 'transfusion', 'hematology'],
    Svg: icon(<path d="M12 3s6 7 6 11.5a6 6 0 0 1-12 0C6 10 12 3 12 3Z" />),
  },
  {
    id: 'dna',
    label: 'DNA',
    category: 'general',
    keywords: ['dna', 'genetics', 'genome', 'chromosome'],
    Svg: icon(
      <path d="M7 3c0 4 10 4 10 8s-10 4-10 8M17 3c0 4-10 4-10 8s10 4 10 8M8 6.5h8M8 17.5h8" />,
    ),
  },
  {
    id: 'cell',
    label: 'Cell',
    category: 'general',
    keywords: ['cell', 'biology', 'cytology'],
    Svg: icon(
      <>
        <path d="M12 3c4 1 7 4.5 8 8.5-2 3-6 8-8 8.5-4-1-7-4.5-8-8.5 2-3 6-8 8-8.5Z" />
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="15.5" cy="8.5" r="0.9" />
        <circle cx="8" cy="15" r="0.9" />
      </>,
    ),
  },
  {
    id: 'pathogen',
    label: 'Virus / bacteria',
    category: 'general',
    keywords: ['virus', 'bacteria', 'germ', 'infection', 'microbe', 'pathogen'],
    Svg: icon(
      <>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6" />
      </>,
    ),
  },
  {
    id: 'hospital',
    label: 'Hospital',
    category: 'general',
    keywords: ['hospital', 'clinic', 'facility', 'building'],
    Svg: icon(
      <>
        <path d="M4 21V9l8-5 8 5v12" />
        <path d="M4 21h16" />
        <path d="M9 21v-5h6v5" />
        <path d="M12 8v4M10 10h4" />
      </>,
    ),
  },

  // ── trends ───────────────────────────────────────────────────────────
  {
    id: 'increases',
    label: 'Increases',
    category: 'trends',
    keywords: ['increase', 'up', 'rise', 'elevated', 'arrow up'],
    Svg: icon(<path d="M4 17 10 11 14 15 20 8M15 8h5v5" />, { stroke: 'currentColor' }),
  },
  {
    id: 'decreases',
    label: 'Decreases',
    category: 'trends',
    keywords: ['decrease', 'down', 'fall', 'reduced', 'arrow down'],
    Svg: icon(<path d="M4 7 10 13 14 9 20 16M15 16h5v-5" />, { stroke: 'currentColor' }),
  },
  {
    id: 'ecg-wave',
    label: 'ECG wave',
    category: 'trends',
    keywords: ['ecg', 'ekg', 'electrocardiogram', 'cardiac trace'],
    Svg: icon(
      <>
        <path d="M2 12h3l1.5-3 2 6 2-9 2 6h2l1.5-4 1.5 4H21" />
        <path d="M2 18h20M2 6h20" strokeOpacity={0.25} />
      </>,
    ),
  },
  {
    id: 'stopwatch',
    label: 'Stopwatch',
    category: 'trends',
    keywords: ['stopwatch', 'timer', 'duration', 'onset', 'time'],
    Svg: icon(
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 13V9M12 13l3 2" />
        <path d="M10 2h4M12 2v2.5" />
      </>,
    ),
  },

  // ── symptoms / status ────────────────────────────────────────────────
  {
    id: 'improving-symptoms',
    label: 'Improving symptoms',
    category: 'symptoms',
    keywords: ['improving', 'better', 'recovery', 'positive trend', 'green'],
    Svg: icon(
      <>
        <path d="M3 16l4.5-5 3.5 3L18 6" />
        <path d="M13 6h5v5" />
      </>,
      { stroke: '#16a34a' },
    ),
  },
  {
    id: 'worsening-symptoms',
    label: 'Worsening symptoms',
    category: 'symptoms',
    keywords: ['worsening', 'worse', 'deteriorating', 'negative trend', 'red'],
    Svg: icon(
      <>
        <path d="M3 8l4.5 5 3.5-3L18 18" />
        <path d="M13 18h5v-5" />
      </>,
      { stroke: '#dc2626' },
    ),
  },
  {
    id: 'warning-alert',
    label: 'Warning / alert',
    category: 'symptoms',
    keywords: ['warning', 'alert', 'caution', 'red flag'],
    Svg: icon(
      <>
        <path d="M12 3.5 21.5 20h-19Z" />
        <path d="M12 9.5v4.5" />
        <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
      </>,
      { stroke: '#d97706' },
    ),
  },
  {
    id: 'checkmark-normal',
    label: 'Checkmark / normal',
    category: 'symptoms',
    keywords: ['normal', 'checkmark', 'ok', 'within range', 'unremarkable'],
    Svg: icon(
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8 12.5 11 15.5 16 9" />
      </>,
      { stroke: '#16a34a' },
    ),
  },
  {
    id: 'cross-abnormal',
    label: 'Cross / abnormal',
    category: 'symptoms',
    keywords: ['abnormal', 'cross', 'flagged', 'out of range'],
    Svg: icon(
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9 9l6 6M15 9l-6 6" />
      </>,
      { stroke: '#dc2626' },
    ),
  },
]

export function readyItemsByCategory(): Record<ReadyItemCategory, ReadyItem[]> {
  const grouped: Record<ReadyItemCategory, ReadyItem[]> = {
    anatomy: [],
    tools: [],
    people: [],
    trends: [],
    symptoms: [],
    general: [],
  }
  for (const item of READY_ITEMS) {
    grouped[item.category].push(item)
  }
  return grouped
}

export function searchReadyItems(query: string): ReadyItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return READY_ITEMS
  return READY_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.keywords.some((keyword) => keyword.toLowerCase().includes(q)),
  )
}
