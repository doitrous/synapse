import { ArrowLeft } from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { ButtonLink } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'

export function NotFound() {
  const t = useT()
  return (
    <div className="grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-10 text-center shadow-panel">
        <div className="mb-6 flex justify-center">
          <Wordmark />
        </div>
        <p className="tnum font-mono text-[13px] text-ink-3">404</p>
        <h1 className="mt-2 font-serif text-[26px] font-semibold tracking-[-0.02em] text-ink">
          {t("This page isn't on the chart")}
        </h1>
        <p className="mt-2 text-[14px] text-ink-2">
          {t("The page you're looking for doesn't exist or has moved.")}
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink
            to="/"
            variant="primary"
            size="md"
            iconLeft={ArrowLeft}
          >
            {t('Back to start')}
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}
