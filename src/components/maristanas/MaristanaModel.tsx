import { useEffect, useState } from 'react'
import { Building2, Box } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { maristanaStageAsset } from '@/data/maristanas'

/**
 * Asset hand-off contract.
 *
 * A supplied render named `stage-01.webp` … `stage-25.webp` is picked up
 * automatically. Until those renders arrive the interface shows a deliberately
 * schematic construction elevation, not a fake final hospital model.
 */
function BlueprintHospital({ stage }: { stage: number }) {
  const visible = (part: number) => part <= stage
  const part = (number: number, className: string) => cn(
    'transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none',
    visible(number) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
    className,
  )
  return (
    <svg viewBox="0 0 760 420" className="h-full w-full" role="img" aria-label={`Schematic hospital at construction stage ${stage} of 25`}>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" className="text-accent/70">
        <path d="M72 354H688" strokeDasharray="5 8" className="text-line-2" />
        <path d="M155 352V303H605V352" className={part(1, '')} />
        <path d="M190 303V280H570V303" className={part(2, '')} />
        <path d="M226 280V250H534V280" className={part(3, '')} />
        <path d="M103 352V290H226V352" className={part(4, '')} />
        <path d="M534 352V290H657V352" className={part(5, '')} />

        <path d="M116 290V230H226V290" className={part(6, '')} />
        <path d="M128 230V205H226V230" className={part(7, '')} />
        <path d="M142 205V188H226V205" className={part(8, '')} />
        <path d="M151 352V252M190 352V252" className={part(9, '')} />
        <path d="M139 247H202M139 270H202" className={part(10, '')} />

        <path d="M534 290V230H644V290" className={part(11, '')} />
        <path d="M534 230V205H632V230" className={part(12, '')} />
        <path d="M534 205V188H618V205" className={part(13, '')} />
        <path d="M570 352V252M609 352V252" className={part(14, '')} />
        <path d="M558 247H621M558 270H621" className={part(15, '')} />

        <path d="M260 250V166H500V250" className={part(16, '')} />
        <path d="M286 250V190M332 250V190M428 250V190M474 250V190" className={part(17, '')} />
        <path d="M270 166H490L472 145H288Z" className={part(18, '')} />
        <path d="M325 145C331 94 429 94 435 145" className={part(19, '')} />
        <path d="M350 113C360 82 400 82 410 113" className={part(20, '')} />
        <path d="M380 87V54" className={part(21, '')} />
        <path d="M380 54L405 65L380 74Z" className={part(22, '')} />

        <path d="M357 250V210C357 180 403 180 403 210V250" className={part(23, '')} />
        <path d="M160 316H190M570 316H600M294 212H319M441 212H466" className={part(24, '')} />
        <path d="M83 352H677M125 367H635" strokeWidth="5" className={part(25, 'text-primary')} />
      </g>
      {stage === 0 && (
        <g className="text-ink-3">
          <path d="M130 350L630 350M220 280L540 280M380 70V350" stroke="currentColor" strokeWidth="2" strokeDasharray="7 9" />
          <text x="380" y="205" textAnchor="middle" fill="currentColor" fontSize="18" fontFamily="var(--font-mono)">SITE 01 · READY</text>
        </g>
      )}
    </svg>
  )
}

export function MaristanaModel({ stage, name, compact = false }: { stage: number; name: string; compact?: boolean }) {
  const [assetAvailable, setAssetAvailable] = useState(true)
  useEffect(() => setAssetAvailable(true), [stage])

  if (compact) {
    return (
      <div className="grid h-28 place-items-center overflow-hidden bg-surface-2/45 px-3">
        {assetAvailable && stage > 0 ? (
          <img
            src={maristanaStageAsset(stage)}
            alt={`${name}, construction stage ${stage} of 25`}
            className="size-full object-cover"
            onError={() => setAssetAvailable(false)}
          />
        ) : stage > 0 ? (
          <BlueprintHospital stage={stage} />
        ) : (
          <Icon icon={Building2} size={31} className="text-ink-3" />
        )}
      </div>
    )
  }

  return (
    <div className="grid-chart-major relative min-h-[340px] overflow-hidden bg-surface-2/45 sm:min-h-[430px]">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 p-4 sm:p-5">
        <span className="inline-flex items-center gap-2 rounded-md border border-line bg-surface/90 px-2.5 py-1.5 text-[11px] font-semibold text-ink-2 shadow-panel backdrop-blur-sm">
          <Icon icon={Box} size={13} /> Stage model {String(stage).padStart(2, '0')}/25
        </span>
        <span className="max-w-[50%] truncate font-mono text-[10.5px] text-ink-3">{name}</span>
      </div>

      {assetAvailable && stage > 0 ? (
        <img
          key={stage}
          src={maristanaStageAsset(stage)}
          alt={`${name}, construction stage ${stage} of 25`}
          className="absolute inset-0 size-full object-contain p-9 pt-16"
          onError={() => setAssetAvailable(false)}
        />
      ) : (
        <div className="absolute inset-0 flex items-end px-4 pb-8 pt-16 sm:px-10 sm:pb-10">
          <BlueprintHospital stage={stage} />
        </div>
      )}

      {!assetAvailable && (
        <div className="absolute bottom-3 start-3 rounded-md border border-line bg-surface/90 px-2.5 py-1.5 text-[10.5px] text-ink-3 shadow-panel backdrop-blur-sm">
          Blueprint preview · 3D asset pending
        </div>
      )}
    </div>
  )
}
