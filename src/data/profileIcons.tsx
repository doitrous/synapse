import type { ReactNode } from 'react'

export interface ProfileIconOption {
  id: string
  label: string
  svg: ReactNode
}

export const PROFILE_ICONS: ProfileIconOption[] = [
  {
    id: 'stethoscope',
    label: 'Stethoscope',
    svg: <path d="M9 4v5a3 3 0 0 0 6 0V4M7 4h2m6 0h2m-5 8v3a4 4 0 0 0 8 0v-1.5a2.5 2.5 0 1 0-2 0V15a2 2 0 0 1-4 0v-3" />,
  },
  {
    id: 'neuron',
    label: 'Neuron',
    svg: <path d="M12 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0M4 5l5.9 5M20 5l-5.9 5M4 19l5.9-5M20 19l-5.9-5M4 5h3m10 0h3M4 19h3m10 0h3" />,
  },
  {
    id: 'capsule',
    label: 'Capsule',
    svg: <path d="M10 21a5 5 0 0 1-3.5-8.5l6-6a5 5 0 0 1 7 7l-6 6A5 5 0 0 1 10 21Zm-1.5-7.5 7 7M10.5 8.5l5 5" />,
  },
  {
    id: 'microscope',
    label: 'Microscope',
    svg: <path d="M10 4h5v4h-5zM12.5 8v3.5l-3 3M7 20h11M9 17h7a5 5 0 0 0-5-5M5 20h3m8-9 2-2" />,
  },
  {
    id: 'heart',
    label: 'Heart',
    svg: <path d="M12 20s-7-4.4-9-9a4.7 4.7 0 0 1 8-5 4.7 4.7 0 0 1 8 5c-2 4.6-9 9-9 9Z" />,
  },
  {
    id: 'book',
    label: 'Book',
    svg: <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21V5.5Zm0 0A2.5 2.5 0 0 1 7.5 8H20M9 7h7" />,
  },
]

export const DEFAULT_PROFILE_ICON = PROFILE_ICONS[0].id

export function ProfileIconGlyph({ id, className }: { id: string; className?: string }) {
  const icon = PROFILE_ICONS.find((item) => item.id === id) ?? PROFILE_ICONS[0]
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {icon.svg}
    </svg>
  )
}

export function normaliseUsername(value: string): string {
  return value.trim().replace(/^@+/, '').toLowerCase()
}

export function usernameProblem(value: string): string | null {
  const normalized = normaliseUsername(value)
  if (normalized.length < 3) return 'Use at least 3 characters.'
  if (normalized.length > 24) return 'Use 24 characters or fewer.'
  if (!/^[a-z0-9_]+$/.test(normalized)) return 'Use letters, numbers, and underscores only.'
  return null
}
