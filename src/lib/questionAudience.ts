import { itemInScope, type ManagedContentItem } from '../data/contentControl.ts'

/**
 * Whether a question may be shown to a student in this university and year.
 *
 * The same **hard gate** Adaptive Study applies (`itemInScope` in
 * `src/data/adaptive/item.ts`), so the two student surfaces agree on who sees
 * what. A question tagged for another university or year is never selectable,
 * not merely unlikely: this is the audience boundary, not a ranking hint. It is
 * the single fix for questions leaking across universities and years — the
 * student Question Bank previously applied no audience filter at all.
 *
 * `questionOnlyFor` is an author allow-list — when present, nothing outside it
 * qualifies. Empty university/year tags mean unrestricted, matching how scope
 * works everywhere else in Nishany (untagged demo/seed content stays visible);
 * a blank `universityId`/`yearId` — an unsettled audience, the demo build, or
 * an admin preview — applies no filter and sees the whole bank.
 */
export function questionInAudience(
  item: ManagedContentItem,
  universityId?: string,
  yearId?: string,
): boolean {
  const onlyFor = item.questionData?.tags.questionOnlyFor ?? []
  if (onlyFor.length > 0) {
    const allowed = (!!universityId && onlyFor.includes(universityId)) || (!!yearId && onlyFor.includes(yearId))
    if (!allowed) return false
  }
  return itemInScope(item, universityId || undefined, yearId || undefined)
}
