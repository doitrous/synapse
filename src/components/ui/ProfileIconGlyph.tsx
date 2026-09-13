import { PROFILE_ICONS } from '@/data/profileIcons'

/**
 * Renders a student's chosen profile icon as a monochrome glyph.
 *
 * The icons are a generated single-colour PNG set (see /public/profile-icons).
 * They are painted through a CSS mask so only the shape is used and the colour
 * comes from `currentColor` — so an icon is plain black in the light theme,
 * flips with the theme, and turns primary when its picker tile is selected,
 * instead of being a fixed-colour image. An unknown id falls back to the first
 * icon, exactly as before.
 */
export function ProfileIconGlyph({ id, className }: { id: string; className?: string }) {
  const icon = PROFILE_ICONS.find((entry) => entry.id === id) ?? PROFILE_ICONS[0]
  const mask = `url("${icon.src}") center / contain no-repeat`
  return (
    <span
      role="img"
      aria-label={icon.label}
      className={className}
      style={{ display: 'inline-block', backgroundColor: 'currentColor', WebkitMask: mask, mask }}
    />
  )
}
