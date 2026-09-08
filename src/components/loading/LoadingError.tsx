import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'

/** A failed section is an error, never an endless skeleton or a made-up zero. */
export function LoadingError() {
  const t = useT()
  return <div role="alert" className="rounded-xl border border-line bg-surface p-5"><p className="text-[13px] font-medium text-ink">{t('This could not be loaded')}</p><p className="mt-1 text-[12px] text-ink-2">{t('This page keeps retrying in the background — it will load as soon as you reconnect.')}</p><Button className="mt-3" size="sm" onClick={() => window.location.reload()}>{t('Try again')}</Button></div>
}
