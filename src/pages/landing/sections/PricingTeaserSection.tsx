import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { offerAmounts, pricingFor, resolvePriced } from '../pricingContent'
import { useRevealOnScroll } from './shared'

export function PricingTeaserSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()
  const [catalog] = usePlanCatalog()
  const { teaser, path } = pricingFor('en')
  // `teaser.sub` / `teaser.termDetail` are Priced<string> (functions of the live
  // catalog price) since the pricing single-source-of-truth work — resolve them
  // against the current amounts before rendering, or React would try to render a
  // function child.
  const amounts = offerAmounts(catalog)

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface-2/60 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">{teaser.eyebrow}</p>
          <h2 className="mt-2 max-w-md font-serif text-[24px] font-semibold leading-tight text-ink sm:text-[28px]">{teaser.title}</h2>
          <p className="mt-2.5 max-w-lg text-[13.5px] leading-relaxed text-ink-2">{resolvePriced(teaser.sub, amounts)}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-2"><Icon icon={Check} size={13} className="text-success" />{resolvePriced(teaser.termDetail, amounts)}</p>
        </div>
        <Link to={path} className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-line-2 bg-surface px-5 text-[14px] font-semibold text-ink shadow-control transition-colors hover:bg-surface-2">
          {teaser.link}
          <Icon icon={ArrowRight} size={15} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  )
}
