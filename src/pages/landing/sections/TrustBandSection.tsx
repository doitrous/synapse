import { LiveCount } from '@/components/marketing/LiveCount'
import { cn } from '@/lib/cn'
import { useRevealOnScroll } from './shared'

export function TrustBandSection({ className }: { className?: string }) {
  const { ref, visible } = useRevealOnScroll<HTMLElement>()

  return (
    <section ref={ref} className={cn('border-t border-line py-16 sm:py-20', visible ? 'animate-rise' : 'opacity-0', className)}>
      <div className="-mx-5 rounded-2xl bg-primary px-6 py-14 text-center sm:-mx-8 sm:px-10 sm:py-16">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.09em] text-on-primary/70">Trusted by your colleagues</p>
        <div className="mt-4 flex flex-col items-center gap-1">
          <LiveCount variant="band" className="font-serif text-[56px] font-semibold leading-none text-on-primary sm:text-[72px]" />
          <p className="max-w-md text-[14.5px] font-medium text-on-primary/85">students across universities, studying with Nishany</p>
        </div>
      </div>
    </section>
  )
}
