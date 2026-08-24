export interface ProfileIconDef {
  id: string
  label: string
  path: string
}

export const PROFILE_ICONS: ProfileIconDef[] = [
  { id: 'stethoscope', label: 'Stethoscope', path: 'M7 3v5a5 5 0 0 0 10 0V3M5 3h4m6 0h4M17 8v5a4 4 0 0 0 8 0v-1' },
  { id: 'neuron', label: 'Neuron', path: 'M12 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M12 9.5V4m2 9.5 5 4M9.8 13.4 5 17m8.8-6.9 5-3.5M10 10.2 5.5 7M19 6.5h2M4 17h-2M12 4V2' },
  { id: 'capsule', label: 'Capsule', path: 'M10.2 20.8a5 5 0 0 1-7.1-7.1l10.6-10.6a5 5 0 0 1 7.1 7.1L10.2 20.8Zm-2.1-8.5 3.6 3.6' },
  { id: 'microscope', label: 'Microscope', path: 'M9 3h6v4H9zM11 7v4a4 4 0 0 0 4 4h1M7 21h12M8 21a7 7 0 0 1 7-7M6 11h4m-2 0v6' },
  { id: 'heart', label: 'Heart', path: 'M12 21s-7-4.4-9.2-9.1C1.1 8.3 3.2 5 6.7 5c2 0 3.4 1 4.3 2.3C11.9 6 13.3 5 15.3 5c3.5 0 5.6 3.3 3.9 6.9C19 16.6 12 21 12 21Z' },
  { id: 'book', label: 'Book', path: 'M5 4.5A3.5 3.5 0 0 1 8.5 1H21v18H8.5A3.5 3.5 0 0 0 5 22.5V4.5Zm0 0A3.5 3.5 0 0 0 1.5 1H3v18h2' },
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
