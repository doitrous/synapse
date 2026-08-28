import { Select } from '@/components/ui/Field'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/cn'
import {
  curriculumModuleOptions,
  curriculumUniversityOptions,
  curriculumYearOptions,
  resolveCurriculumScope,
  type CurriculumScope,
} from '@/data/curriculumFilters'
import type { University } from '@/data/universities'

/**
 * The University → Year → Module cascade: three selects where choosing a
 * university scopes which years are offered, and choosing a year scopes
 * which modules are offered. Replaces the flattened, whole-curriculum module
 * dropdown that used to sit in `MediaRequests.tsx` — modules are grouped by
 * year (`<optgroup>`) instead of listed as one flat sea of options.
 *
 * A part with nothing to show is disabled rather than hidden, so the row
 * never reflows as a filter is built: pick a university, the year select
 * lights up; pick a year (optional), the module list narrows to it.
 */
export function CascadingScopeFilter({
  catalogue,
  value,
  onChange,
  className,
}: {
  catalogue: University[]
  value: CurriculumScope
  onChange: (value: CurriculumScope) => void
  className?: string
}) {
  const { t } = useI18n()
  const universities = curriculumUniversityOptions(catalogue)
  const years = curriculumYearOptions(catalogue, value.universityId)
  const modules = curriculumModuleOptions(catalogue, value.universityId, value.yearId)

  // Group modules by year only when more than one year is represented — a
  // single already-chosen year needs no redundant wrapper group.
  const moduleGroups = new Map<string, typeof modules>()
  for (const option of modules) {
    const group = moduleGroups.get(option.groupLabel) ?? []
    group.push(option)
    moduleGroups.set(option.groupLabel, group)
  }
  const grouped = moduleGroups.size > 1

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <Select
        aria-label={t('Filter by university')}
        value={value.universityId ?? ''}
        onChange={(event) => {
          const universityId = event.target.value || undefined
          onChange(resolveCurriculumScope({ universityId }, catalogue))
        }}
        className="min-w-[9.5rem] flex-1 basis-40"
      >
        <option value="">{t('All universities')}</option>
        {universities.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
      </Select>

      <Select
        aria-label={t('Filter by year')}
        value={value.yearId ?? ''}
        disabled={!value.universityId}
        onChange={(event) => {
          const yearId = event.target.value || undefined
          onChange(resolveCurriculumScope({ ...value, yearId }, catalogue))
        }}
        className="min-w-[8.5rem] flex-1 basis-36"
      >
        <option value="">{t('All years')}</option>
        {years.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
      </Select>

      <Select
        aria-label={t('Filter by module')}
        value={value.moduleId ?? ''}
        disabled={!value.universityId}
        onChange={(event) => {
          const moduleId = event.target.value || undefined
          onChange({ ...value, moduleId })
        }}
        className="min-w-[10rem] flex-1 basis-44"
      >
        <option value="">{t('All modules')}</option>
        {grouped
          ? [...moduleGroups.entries()].map(([group, options]) => (
            <optgroup key={group} label={group}>
              {options.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </optgroup>
          ))
          : modules.map((option) => (
            <option key={option.id} value={option.id}>{option.label}</option>
          ))}
      </Select>
    </div>
  )
}
