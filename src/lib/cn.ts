export type ClassValue = string | number | null | false | undefined | ClassValue[]

/** Minimal, dependency-free class joiner. */
export function cn(...args: ClassValue[]): string {
  const out: string[] = []
  for (const a of args) {
    if (!a && a !== 0) continue
    if (Array.isArray(a)) {
      const s = cn(...a)
      if (s) out.push(s)
    } else {
      out.push(String(a))
    }
  }
  return out.join(' ')
}
