import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  GraduationCap,
  ShieldCheck,
  ArrowLeft,
  BookOpen,
  ListChecks,
  Stethoscope,
  CalendarDays,
  LineChart,
  FolderOpen,
  PenTool,
  Users,
} from 'lucide-react'
import { Wordmark } from '@/components/brand/Wordmark'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

/* Arabic (RTL) counterpart of Landing. Same clinical-chart system, mirrored. */

function ReferenceBar({ value }: { value: number }) {
  return (
    <div className="relative pt-2.5">
      <div className="absolute top-0 z-10 -translate-x-1/2" style={{ left: `${value}%` }} aria-hidden>
        <svg width="9" height="6" viewBox="0 0 9 6" className="fill-ink">
          <path d="M4.5 6 0 0h9z" />
        </svg>
      </div>
      <div className="relative flex h-2.5 overflow-hidden rounded-full">
        <div className="bg-danger/20" style={{ width: '40%' }} />
        <div className="bg-warning/25" style={{ width: '30%' }} />
        <div className="bg-success/25" style={{ width: '30%' }} />
        <span
          className="absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-ink"
          style={{ left: `${value}%` }}
          aria-hidden
        />
      </div>
    </div>
  )
}

function Specimen() {
  return (
    <div className="grid-chart-major rounded-2xl border border-line bg-surface-2/60 p-5 sm:p-8">
      <Panel className="mx-auto max-w-sm shadow-raised">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <h3 className="font-sans text-[13px] font-semibold text-ink">اليوم · تركيزك</h3>
          <span className="tnum font-mono text-[12px] text-ink-3">٣١ يوليو</span>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center gap-3">
            <span className="tnum font-mono text-[15px] font-medium text-ink">09:00</span>
            <span className="size-2 rounded-full" style={{ backgroundColor: '#a8462f' }} />
            <span className="flex-1 truncate text-[13.5px] text-ink">
              قصور القلب: الفيزيولوجيا المرضية
            </span>
            <Badge tone="accent">محاضرة</Badge>
          </div>

          <div className="border-t border-line pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-ink-2">الجاهزية للامتحان</span>
              <span className="tnum font-mono text-[15px] font-semibold text-ink">68%</span>
            </div>
            <ReferenceBar value={68} />
          </div>

          <div className="space-y-2 border-t border-line pt-3">
            <p className="text-[11px] font-semibold text-ink-3">يستحق الانتباه</p>
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: '#a8462f' }} />
              <span className="flex-1 truncate text-[13px] text-ink">المتلازمات التاجية الحادة</span>
              <Badge tone="danger">متأخّر</Badge>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: '#c06a3f' }} />
              <span className="flex-1 truncate text-[13px] text-ink">مدرّات البول: مواقع التأثير</span>
              <Badge tone="warning">مستحق اليوم</Badge>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

function PrimaryDoor() {
  return (
    <Link
      to="/app"
      className="group flex items-center gap-4 rounded-xl bg-accent p-4 text-on-accent shadow-panel transition-all hover:bg-accent-strong hover:shadow-raised sm:p-5"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/12 ring-1 ring-white/15">
        <Icon icon={GraduationCap} size={22} className="text-on-accent" />
      </span>
      <span className="flex-1">
        <span className="block text-[15px] font-semibold">ادخل كطالب</span>
        <span className="block text-[13px] text-on-accent/80">
          لوحة المتابعة، المكتبة، بنك الأسئلة، التدريب العملي والمزيد
        </span>
      </span>
      <Icon
        icon={ArrowLeft}
        size={20}
        className="text-on-accent/80 transition-transform group-hover:-translate-x-0.5"
      />
    </Link>
  )
}

function SecondaryDoor() {
  return (
    <Link
      to="/admin"
      className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 text-ink shadow-panel transition-all hover:border-line-2 hover:shadow-raised sm:p-5"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink-2">
        <Icon icon={ShieldCheck} size={22} />
      </span>
      <span className="flex-1">
        <span className="block text-[15px] font-semibold">لوحة الإدارة</span>
        <span className="block text-[13px] text-ink-3">
          المناهج، المحتوى، المدفوعات والصلاحيات
        </span>
      </span>
      <Icon
        icon={ArrowLeft}
        size={20}
        className="text-ink-3 transition-transform group-hover:-translate-x-0.5"
      />
    </Link>
  )
}

const INSIDE: { icon: LucideIcon; label: string; line: string }[] = [
  { icon: BookOpen, label: 'المكتبة', line: 'كل موضوع وموضوع فرعي في مكان واحد' },
  { icon: ListChecks, label: 'بنك الأسئلة', line: 'إجابات مشروحة، مرتبطة بالمكتبة' },
  { icon: Stethoscope, label: 'العملي السريري', line: 'OSCE، حالات، مهارات، مختبر وأشعة' },
  { icon: CalendarDays, label: 'التقويم', line: 'المنهج وخطتك في عرض واحد' },
  { icon: LineChart, label: 'الأداء', line: 'حسب المادة ونوع السؤال وعبر الزمن' },
  { icon: FolderOpen, label: 'المصادر', line: 'كتب وفيديوهات وإرشادات، مُصفّاة' },
  { icon: PenTool, label: 'السبورة', line: 'لوحة لا نهائية لربط الأفكار' },
  { icon: Users, label: 'ادرس مع زملائك', line: 'حل اختبارًا مشتركًا عبر رابط' },
]

export function LandingAr() {
  useEffect(() => {
    // /ar is the only RTL surface; the rest of the app is LTR. Set on enter,
    // hard-reset to the app default on leave (a direct load starts RTL).
    const el = document.documentElement
    el.dir = 'rtl'
    el.lang = 'ar'
    document.title = 'Synapse · مذاكرة مفصلة عليك'
    return () => {
      el.dir = 'ltr'
      el.lang = 'en'
      document.title = 'Synapse · Clinical study, in one place'
    }
  }, [])

  return (
    <div className="min-h-dvh" dir="rtl" lang="ar">
      <header className="mx-auto flex max-w-[1140px] items-center justify-between px-5 py-5 sm:px-8">
        <Wordmark />
        <Link
          to="/app"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-2 transition-colors hover:text-ink"
        >
          تسجيل الدخول
          <Icon icon={ArrowLeft} size={15} />
        </Link>
      </header>

      <main className="mx-auto max-w-[1140px] px-5 pb-20 sm:px-8">
        <section className="grid items-center gap-10 pt-8 lg:grid-cols-2 lg:gap-14 lg:pt-16">
          <div>
            <h1 className="max-w-xl font-serif text-[38px] font-semibold leading-[1.15] tracking-[-0.01em] text-ink text-balance sm:text-[52px]">
              مذاكرة مفصلة عليك.
            </h1>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-2">
              يجمع Synapse مكتبتك وبنك الأسئلة والتدريب العملي وجدولك في مساحة سريرية
              واحدة هادئة لطلاب الطب — ثم يخبرك بما يستحق انتباهك اليوم.
            </p>

            <div className="mt-8 flex max-w-md flex-col gap-3">
              <PrimaryDoor />
              <SecondaryDoor />
            </div>

            <p className="mt-6 text-[13px] text-ink-3">
              مبني على التكرار المتباعد ومنهج أجهزة الجسم.
            </p>
          </div>

          <div className="lg:pr-4">
            <Specimen />
          </div>
        </section>

        <section className="mt-20 border-t border-line pt-10">
          <h2 className="font-serif text-[22px] font-semibold tracking-[-0.005em] text-ink">
            كل شيء في مكان واحد
          </h2>
          <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {INSIDE.map((item) => (
              <div key={item.label} className="flex items-start gap-3 border-b border-line py-4">
                <Icon icon={item.icon} size={18} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <dt className="text-[14px] font-semibold text-ink">{item.label}</dt>
                  <dd className="mt-0.5 text-[13px] text-ink-2">{item.line}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1140px] flex-col items-start justify-between gap-3 px-5 py-6 text-[12.5px] text-ink-3 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-2">
            <Wordmark />
          </div>
          <p className="max-w-md sm:text-left">
            نسخة عرض توضيحية. المحتوى توضيحي لتعليم الطب الجامعي، وليس إرشادًا سريريًا.
          </p>
        </div>
      </footer>
    </div>
  )
}
