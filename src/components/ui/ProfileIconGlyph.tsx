import { PROFILE_ICONS } from '@/data/profileIcons'

export function ProfileIconGlyph({ id, className }: { id: string; className?: string }) {
  const icon = PROFILE_ICONS.find((entry) => entry.id === id) ?? PROFILE_ICONS[0]
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={icon.path} />
    </svg>
  )
}
