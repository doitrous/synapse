export interface ProfileIconDef {
  id: string
  label: string
  /** Public asset URL for the icon PNG (generated set under /public/profile-icons). */
  src: string
}

/** Build a base-aware URL for an icon in /public/profile-icons. */
const icon = (id: string) => `${import.meta.env.BASE_URL}profile-icons/${id}.png`

export const PROFILE_ICONS: ProfileIconDef[] = [
  { id: 'stethoscope', label: 'Stethoscope', src: icon('stethoscope') },
  { id: 'heart', label: 'Heart', src: icon('heart') },
  { id: 'brain', label: 'Brain', src: icon('brain') },
  { id: 'dna', label: 'DNA', src: icon('dna') },
  { id: 'neuron', label: 'Neuron', src: icon('neuron') },
  { id: 'microscope', label: 'Microscope', src: icon('microscope') },
  { id: 'lungs', label: 'Lungs', src: icon('lungs') },
  { id: 'bone', label: 'Bone', src: icon('bone') },
  { id: 'tooth', label: 'Tooth', src: icon('tooth') },
  { id: 'eye', label: 'Eye', src: icon('eye') },
  { id: 'capsule', label: 'Capsule', src: icon('capsule') },
  { id: 'syringe', label: 'Syringe', src: icon('syringe') },
  { id: 'flask', label: 'Flask', src: icon('flask') },
  { id: 'ecg', label: 'ECG', src: icon('ecg') },
  { id: 'caduceus', label: 'Caduceus', src: icon('caduceus') },
  { id: 'first-aid', label: 'First aid', src: icon('first-aid') },
  { id: 'atlas', label: 'Atlas', src: icon('atlas') },
  { id: 'graduation-cap', label: 'Graduation cap', src: icon('graduation-cap') },
  { id: 'owl', label: 'Owl', src: icon('owl') },
  { id: 'mountain', label: 'Summit', src: icon('mountain') },
]

export const DEFAULT_PROFILE_ICON = PROFILE_ICONS[0].id

export function normaliseUsername(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-')
}

export function usernameProblem(value: string): string | null {
  const username = normaliseUsername(value)
  if (username.length < 3) return 'Use at least 3 characters.'
  if (username.length > 24) return 'Use 24 characters or fewer.'
  if (!/^[a-z0-9][a-z0-9._-]*[a-z0-9]$/.test(username)) return 'Use letters, numbers, dots, underscores or hyphens; start and end with a letter or number.'
  if (username.includes('..') || username.includes('__') || username.includes('--')) return 'Avoid repeated separators.'
  return null
}
