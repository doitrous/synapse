import { useCallback, useEffect, useRef, useState } from 'react'
import { BookOpenCheck, CalendarDays, Check, CirclePause, CirclePlay, RotateCcw, Users } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { MaristanaLandingCopy } from './maristanaContent'

const STAGE_DELAY = 1800

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}

function StudySurface({ stage, c }: { stage: number; c: MaristanaLandingCopy }) {
  const ar = c.lang === 'ar'
  const copy = {
    session: ar ? 'فشل القلب · الآليات والعلامات' : 'Heart failure · mechanisms & findings',
    due: ar ? 'ضمن وحدة القلب والأوعية' : 'Cardiovascular module scope',
    stem: ar ? 'مريض عمره ٦٢ عامًا يعاني ضيق النفس وتورم الكاحلين. أي نتيجة تدعم فشل القلب؟' : 'A 62-year-old has exertional breathlessness and ankle swelling. Which finding supports heart failure?',
    right: ar ? 'ارتفاع ضغط الوريد الوداجي' : 'Raised jugular venous pressure',
    wrong: ar ? 'انخفاض سرعة الزفير فقط' : 'Reduced expiratory flow alone',
    explain: ar ? 'يربط ارتفاع الضغط الوريدي مع الوذمة الثنائية المشكلة بالدورة الدموية، لا بمجرى الهواء وحده.' : 'Raised venous pressure with bilateral oedema connects the problem to circulation, not the airway alone.',
    source: ar ? 'Kumar & Clark · الفصل ٢٣ · ص ٧٩١' : 'Kumar & Clark · Ch. 23 · p. 791',
    concept: ar ? 'الاحتقان الوريدي' : 'Venous congestion',
    stable: ar ? 'يثبت' : 'Settling',
    accuracy: ar ? 'الدقة' : 'Accuracy',
    recall: ar ? 'ثبات الاستدعاء' : 'Recall stability',
    evidence: ar ? 'أدلة متكررة' : 'Repeated evidence',
    room: ar ? 'غرفة مذاكرة · القلب' : 'Study room · Cardiology',
    focused: ar ? 'يركّز' : 'Focused',
    discuss: ar ? 'جاهز للنقاش' : 'Ready to discuss',
  }

  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-xl border border-line bg-surface shadow-raised sm:min-h-[420px]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary-tint text-primary-strong">
            <Icon icon={stage === 4 ? Users : stage === 0 ? CalendarDays : BookOpenCheck} size={16} />
          </span>
          <div>
            <p className="text-[12px] font-semibold text-ink">{c.showcase.stages[stage].label}</p>
            <p className="text-[10.5px] text-ink-3">{ar ? 'جلسة اليوم · ١٢ دقيقة' : 'Today’s session · 12 min'}</p>
          </div>
        </div>
        <span className="rounded-md border border-success/25 bg-success-tint px-2 py-1 text-[10.5px] font-semibold text-success">
          {stage === 4 ? (ar ? '٤ متصلون' : '4 online') : `${stage + 1}/5`}
        </span>
      </div>

      <div className="h-1 bg-inset" aria-hidden>
        <div
          className="h-full bg-primary transition-[width] duration-[900ms] ease-[var(--ease-out-quint)] motion-reduce:transition-none"
          style={{ width: `${((stage + 1) / 5) * 100}%` }}
        />
      </div>

      <div className="p-4 sm:p-6">
        {stage === 0 && (
          <div className="space-y-3">
            <p className="font-serif text-[22px] font-semibold text-ink">{ar ? 'خطة اليوم' : 'Today’s plan'}</p>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="border-s-2 border-accent bg-accent-tint px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-accent-strong">{ar ? 'من جامعتك' : 'From your university'}</p>
                <p className="mt-1 text-[14px] font-semibold text-ink">{copy.session}</p>
                <p className="mt-1 text-[11.5px] text-ink-2">{copy.due}</p>
              </div>
              <div className="flex min-w-28 items-center justify-between gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2 sm:flex-col sm:items-start sm:justify-center">
                <span className="font-mono text-[12px] font-semibold text-ink">10:00</span>
                <span className="text-[10.5px] text-ink-3">90 min</span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="border-s-2 border-primary bg-primary-tint px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-primary-strong">{ar ? 'خطتك الشخصية' : 'Your personal plan'}</p>
                <p className="mt-1 text-[14px] font-semibold text-ink">{ar ? 'اختبار سريري قصير' : 'Short clinical check'}</p>
                <p className="mt-1 text-[11.5px] text-ink-2">{ar ? '٨ أسئلة · نفس النطاق' : '8 questions · same scope'}</p>
              </div>
              <div className="flex min-w-28 items-center justify-between gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2 sm:flex-col sm:items-start sm:justify-center">
                <span className="font-mono text-[12px] font-semibold text-ink">18:30</span>
                <span className="text-[10.5px] text-ink-3">12 min</span>
              </div>
            </div>
          </div>
        )}

        {stage === 1 && (
          <div>
            <p className="text-[11px] font-semibold text-primary-strong">{ar ? 'السؤال ٣ من ٨' : 'Question 3 of 8'}</p>
            <h3 className="mt-3 max-w-xl font-serif text-[20px] font-semibold leading-snug text-ink sm:text-[23px]">{copy.stem}</h3>
            <div className="mt-5 space-y-2.5">
              {[copy.right, copy.wrong, ar ? 'أزيز منتشر' : 'Diffuse wheeze'].map((choice, index) => (
                <div key={choice} className={cn('flex items-center gap-3 rounded-lg border px-3.5 py-3 text-[13px]', index === 0 ? 'border-primary-line bg-primary-tint font-semibold text-ink' : 'border-line bg-surface text-ink-2')}>
                  <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[10px]', index === 0 ? 'border-primary bg-primary text-on-primary' : 'border-line-2')}>{String.fromCharCode(65 + index)}</span>
                  {choice}
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === 2 && (
          <div>
            <div className="flex items-start gap-3 border-b border-line pb-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-success-tint text-success"><Icon icon={Check} size={17} /></span>
              <div>
                <p className="text-[11px] font-semibold text-success">{ar ? 'إجابتك تربط العلامة بالآلية' : 'Your answer connects the finding to its mechanism'}</p>
                <p className="mt-1 text-[14px] font-semibold text-ink">{copy.right}</p>
              </div>
            </div>
            <p className="mt-5 font-serif text-[20px] font-semibold text-ink">{ar ? 'لماذا؟' : 'Why?'}</p>
            <p className="mt-2 max-w-xl text-[14px] leading-7 text-ink-2">{copy.explain}</p>
            <div className="mt-5 border-s-2 border-accent bg-accent-tint px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-accent-strong">{ar ? 'المصدر' : 'Source'}</p>
              <p className="mt-1 font-mono text-[11.5px] text-ink">{copy.source}</p>
            </div>
          </div>
        )}

        {stage === 3 && (
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-primary-strong">{ar ? 'سجل المفهوم' : 'Concept record'}</p>
                <h3 className="mt-1 font-serif text-[23px] font-semibold text-ink">{copy.concept}</h3>
              </div>
              <span className="rounded-lg border border-primary-line bg-primary-tint px-3 py-2 text-[12px] font-semibold text-primary-strong">{copy.stable}</span>
            </div>
            <div className="mt-7 space-y-5">
              {[[copy.accuracy, 75], [copy.recall, 61], [copy.evidence, 83]].map(([label, value]) => (
                <div key={String(label)}>
                  <div className="flex justify-between text-[12px]"><span className="font-medium text-ink-2">{label}</span><span className="font-mono font-semibold text-ink">{value}%</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-inset">
                    <div className="h-full rounded-full bg-primary transition-[width] duration-[900ms] ease-[var(--ease-out-quint)] motion-reduce:transition-none" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-line pt-4 text-[12px] leading-relaxed text-ink-2">{ar ? 'الدقة جزء من الصورة. تكرار الاستدعاء ونوع الدليل يحددان ما سيعود إليك.' : 'Accuracy is one part of the picture. Recall and repeated evidence decide what returns next.'}</p>
          </div>
        )}

        {stage === 4 && (
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-[22px] font-semibold text-ink">{copy.room}</h3>
              <span className="text-[11px] text-ink-3">45:00</span>
            </div>
            <div className="grid-chart-major relative mt-5 grid grid-cols-2 gap-4 rounded-xl border border-line bg-surface-2/60 p-4 sm:grid-cols-3 sm:p-5">
              {[
                ['MG', copy.focused, true], ['YA', copy.focused, true], ['NS', copy.discuss, false], ['AM', copy.focused, true], ['+1', ar ? 'ادعُ صديقًا' : 'Invite', false], ['DR', copy.focused, true],
              ].map(([initials, status, focused]) => (
                <div key={String(initials)} className="rounded-lg border border-line bg-surface p-3 text-center shadow-panel">
                  <span className={cn('mx-auto grid size-9 place-items-center rounded-full font-mono text-[11px] font-semibold', focused ? 'bg-primary-tint text-primary-strong' : 'bg-accent-tint text-accent-strong')}>{initials}</span>
                  <span className="mt-3 block h-5 rounded border border-line-2 bg-inset" aria-hidden />
                  <p className="mt-2 truncate text-[9.5px] font-medium text-ink-3">{status}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function MaristanaShowcase({ c }: { c: MaristanaLandingCopy }) {
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const started = useRef(false)
  const root = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()
  const last = c.showcase.stages.length - 1

  useEffect(() => {
    if (!reducedMotion) return
    started.current = true
    setStage(last)
    setPlaying(false)
  }, [last, reducedMotion])

  useEffect(() => {
    const node = root.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      const inView = entry.isIntersecting
      setVisible(inView)
      if (inView && !started.current) {
        started.current = true
        if (reducedMotion) setStage(last)
        else setPlaying(true)
      }
    }, { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [last, reducedMotion])

  useEffect(() => {
    if (!playing || !visible || reducedMotion) return
    if (stage >= last) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => setStage((current) => current + 1), STAGE_DELAY)
    return () => window.clearTimeout(timer)
  }, [last, playing, reducedMotion, stage, visible])

  const toggle = useCallback(() => {
    if (stage >= last) {
      setStage(0)
      setPlaying(!reducedMotion)
      return
    }
    setPlaying((current) => !current)
  }, [last, reducedMotion, stage])

  return (
    <section id="showcase" ref={root} className="scroll-mt-24 py-24 sm:py-28">
      <div className="border-b-2 border-ink pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">{c.showcase.eyebrow}</p>
        <div className="mt-2 grid gap-3 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <h2 className="max-w-2xl font-serif text-[31px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[40px]">{c.showcase.title}</h2>
          <p className="max-w-xl text-[14.5px] leading-relaxed text-ink-2 lg:justify-self-end">{c.showcase.body}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-7 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
        <div>
          <div role="tablist" aria-label={c.showcase.title} className="border-t border-line">
            {c.showcase.stages.map((item, index) => (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={index === stage}
                aria-controls="maristana-showcase-panel"
                onClick={() => { setStage(index); setPlaying(false) }}
                className={cn(
                  'group flex min-h-14 w-full items-center gap-3 border-b border-line px-1 py-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  index === stage ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
                )}
              >
                <span className={cn('grid size-7 shrink-0 place-items-center rounded-md border font-mono text-[10px] font-semibold', index === stage ? 'border-primary bg-primary text-on-primary' : 'border-line-2 bg-surface')}>{index + 1}</span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-semibold">{item.label}</span>
                  <span className={cn('mt-0.5 hidden text-[11px] leading-snug sm:block', index === stage ? 'text-ink-2' : 'text-ink-3')}>{item.title}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <button type="button" onClick={toggle} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line-2 bg-surface px-3.5 text-[12.5px] font-semibold text-ink shadow-control hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <Icon icon={stage >= last ? RotateCcw : playing ? CirclePause : CirclePlay} size={16} />
              {stage >= last ? c.showcase.replay : playing ? c.showcase.pause : c.showcase.play}
            </button>
            <span className="font-mono text-[11px] text-ink-3">{stage + 1} / {c.showcase.stages.length}</span>
          </div>
        </div>

        <div id="maristana-showcase-panel" role="tabpanel" className="min-w-0">
          <StudySurface stage={stage} c={c} />
          <div className="mt-4 min-h-[72px] border-s-2 border-primary ps-4">
            <h3 className="text-[15px] font-semibold text-ink">{c.showcase.stages[stage].title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{c.showcase.stages[stage].detail}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
