import { useState } from 'react'
import {
  BookOpen, CalendarDays, ChevronDown, Clock3, FileText,
  Highlighter, Image, Link2, Network, PenLine, Search,
  Stethoscope, Users,
} from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { FeaturePreview, MaristanaLandingCopy } from './maristanaContent'

function PreviewFrame({ item, c }: { item: FeaturePreview; c: MaristanaLandingCopy }) {
  const ar = c.lang === 'ar'

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-raised">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-primary-strong">{item.eyebrow}</p>
          <h4 className="mt-0.5 text-[14px] font-semibold text-ink">{item.label}</h4>
        </div>
        <span className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[9.5px] text-ink-3">MARISTANA</span>
      </div>
      <div className="min-h-[300px] p-4 sm:min-h-[340px] sm:p-6">
        {item.kind === 'calendar' && <CalendarPreview ar={ar} />}
        {item.kind === 'practice' && <PracticePreview ar={ar} />}
        {item.kind === 'osce' && <OscePreview ar={ar} />}
        {item.kind === 'microscope' && <MicroscopePreview ar={ar} />}
        {item.kind === 'game' && <GamePreview ar={ar} />}
        {item.kind === 'mastery' && <MasteryPreview ar={ar} />}
        {item.kind === 'ranking' && <RankingPreview ar={ar} />}
        {item.kind === 'reader' && <ReaderPreview ar={ar} />}
        {item.kind === 'notes' && <NotesPreview ar={ar} />}
        {item.kind === 'whiteboard' && <WhiteboardPreview ar={ar} />}
        {item.kind === 'timer' && <TimerPreview ar={ar} />}
        {item.kind === 'people' && <PeoplePreview ar={ar} />}
        {item.kind === 'room' && <RoomPreview ar={ar} />}
        {item.kind === 'grow' && <GrowPreview ar={ar} />}
      </div>
      <div className="border-t border-line bg-surface-2/55 px-4 py-3 sm:px-5">
        <p className="text-[12.5px] leading-relaxed text-ink-2">{item.description}</p>
      </div>
    </div>
  )
}

function CalendarPreview({ ar }: { ar: boolean }) {
  const rows = ar
    ? [['٠٩:٠٠', 'محاضرة فشل القلب', 'الجامعة'], ['١٣:٣٠', 'معمل الباثولوجي', 'الجامعة'], ['١٨:٣٠', 'مراجعة شخصية', 'أنت']]
    : [['09:00', 'Heart failure lecture', 'University'], ['13:30', 'Pathology lab', 'University'], ['18:30', 'Personal review block', 'You']]
  return <div>
    <div className="flex items-center justify-between"><h5 className="font-serif text-[21px] font-semibold text-ink">{ar ? 'الاثنين ٢١ أكتوبر' : 'Monday, 21 October'}</h5><Icon icon={CalendarDays} size={18} className="text-primary" /></div>
    <div className="mt-5 border-t border-line">{rows.map(([time, title, owner], index) => <div key={time} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 border-b border-line py-3.5"><span className="font-mono text-[11px] text-ink-3">{time}</span><span className="text-[13px] font-semibold text-ink">{title}</span><span className={cn('rounded-md px-2 py-1 text-[9.5px] font-semibold', index === 2 ? 'bg-primary-tint text-primary-strong' : 'bg-accent-tint text-accent-strong')}>{owner}</span></div>)}</div>
    <button type="button" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border border-dashed border-line-2 px-3 text-[11.5px] font-semibold text-ink-2"><Clock3 size={14} />{ar ? 'أضف وقت مذاكرة' : 'Add study block'}</button>
  </div>
}

function PracticePreview({ ar }: { ar: boolean }) {
  return <div>
    <div className="flex items-center justify-between text-[10.5px] font-semibold text-ink-3"><span>{ar ? 'حالة سريرية · ٤/١٠' : 'Clinical case · 4/10'}</span><span className="font-mono">01:18</span></div>
    <p className="mt-4 font-serif text-[19px] font-semibold leading-snug text-ink">{ar ? 'أي نتيجة تفسر ضيق النفس مع ارتفاع ضغط الوريد الوداجي؟' : 'Which finding best explains breathlessness with a raised JVP?'}</p>
    <div className="mt-5 space-y-2">{(ar ? ['احتقان وريدي جهازي', 'تضيق في مجرى الهواء', 'نقص هيموجلوبين معزول'] : ['Systemic venous congestion', 'Airway narrowing', 'Isolated low haemoglobin']).map((text, i) => <div key={text} className={cn('flex items-center gap-3 rounded-lg border px-3 py-2.5 text-[12px]', i === 0 ? 'border-primary-line bg-primary-tint font-semibold text-ink' : 'border-line text-ink-2')}><span className="grid size-5 place-items-center rounded-full border border-line-2 font-mono text-[9px]">{i + 1}</span>{text}</div>)}</div>
    <div className="mt-4 flex gap-2"><span className="rounded-md bg-surface-2 px-2 py-1 text-[9.5px] text-ink-3">{ar ? 'علّم' : 'Flag'}</span><span className="rounded-md bg-accent-tint px-2 py-1 text-[9.5px] text-accent-strong">{ar ? 'اشرح بعد الإجابة' : 'Explain after answer'}</span></div>
  </div>
}

function OscePreview({ ar }: { ar: boolean }) {
  return <div>
    <div className="flex items-center gap-2"><Icon icon={Stethoscope} size={18} className="text-primary" /><h5 className="font-serif text-[20px] font-semibold text-ink">{ar ? 'فحص القلب والأوعية' : 'Cardiovascular examination'}</h5></div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[{ title: ar ? 'ورقة الطالب' : 'Candidate brief', tone: 'primary', lines: ar ? ['اقرأ المهمة', 'نظّم الفحص', 'اختم للممتحن'] : ['Read the task', 'Structure the exam', 'Present your close'] }, { title: ar ? 'الممتحن والممثل' : 'Examiner & actor', tone: 'accent', lines: ar ? ['ردود المريض', 'إشارات عند السؤال', 'جدول الدرجات'] : ['Patient responses', 'Prompts when asked', 'Mark scheme'] }].map((card) => <div key={card.title} className={cn('rounded-lg border p-3.5', card.tone === 'primary' ? 'border-primary-line bg-primary-tint' : 'border-accent-line bg-accent-tint')}><p className={cn('text-[11px] font-bold', card.tone === 'primary' ? 'text-primary-strong' : 'text-accent-strong')}>{card.title}</p><ol className="mt-3 space-y-2">{card.lines.map((line, i) => <li key={line} className="flex gap-2 text-[11px] text-ink-2"><span className="font-mono text-ink-3">0{i + 1}</span>{line}</li>)}</ol></div>)}</div>
    <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[10.5px]"><span className="text-ink-3">{ar ? 'مدة المحطة' : 'Station time'}</span><span className="font-mono font-semibold text-ink">8:00</span></div>
  </div>
}

function MicroscopePreview({ ar }: { ar: boolean }) {
  return <div className="grid gap-4 sm:grid-cols-[1fr_96px]">
    <div className="relative aspect-[1.25] overflow-hidden rounded-xl border-[10px] border-inset bg-primary-tint">
      <div className="absolute inset-[8%] rounded-[42%] border-8 border-primary-line bg-primary-soft/35" />
      <div className="absolute left-[30%] top-[24%] size-[22%] rounded-full bg-primary/55" />
      <div className="absolute bottom-[18%] right-[18%] h-[18%] w-[34%] rounded-[50%] bg-accent-soft/40" />
      <div className="absolute inset-0 grid place-items-center"><span className="size-16 rounded-full border border-on-primary/60" /></div>
    </div>
    <div className="flex flex-row justify-between gap-2 sm:flex-col sm:justify-start">
      {['4×', '10×', '40×'].map((zoom, i) => <button key={zoom} type="button" className={cn('grid min-h-11 flex-1 place-items-center rounded-lg border font-mono text-[11px] sm:flex-none', i === 1 ? 'border-primary bg-primary text-on-primary' : 'border-line-2 bg-surface-2 text-ink-2')}>{zoom}</button>)}
    </div>
    <div className="sm:col-span-2"><p className="text-[11px] font-semibold text-ink">{ar ? 'نسيج كبد · صبغة H&E' : 'Liver tissue · H&E stain'}</p><p className="mt-1 text-[10.5px] text-ink-3">{ar ? 'حرّك الشريحة، كبّر، ثم ثبّت العلامة' : 'Pan, zoom, then pin the finding'}</p></div>
  </div>
}

function GamePreview({ ar }: { ar: boolean }) {
  const terms = ar ? [['Brady-', 'بطيء'], ['-itis', 'التهاب'], ['Hepat-', 'الكبد']] : [['Brady-', 'slow'], ['-itis', 'inflammation'], ['Hepat-', 'liver']]
  return <div><div className="flex justify-between"><span className="text-[10.5px] font-semibold text-primary-strong">{ar ? 'صل الجذر بالمعنى' : 'Match root to meaning'}</span><span className="font-mono text-[11px] text-ink-3">01:42</span></div><div className="mt-5 space-y-3">{terms.map(([term, meaning], i) => <div key={term} className="grid grid-cols-[1fr_36px_1fr] items-center"><span className="rounded-lg border border-accent-line bg-accent-tint px-3 py-3 text-center font-mono text-[12px] font-semibold text-accent-strong">{term}</span><span className={cn('mx-auto h-px w-7', i < 2 ? 'bg-primary' : 'border-t border-dashed border-line-2')} /><span className={cn('rounded-lg border px-3 py-3 text-center text-[11.5px]', i < 2 ? 'border-primary-line bg-primary-tint font-semibold text-primary-strong' : 'border-line bg-surface-2 text-ink-2')}>{meaning}</span></div>)}</div><p className="mt-5 text-center font-mono text-[12px] font-semibold text-ink">2 / 3</p></div>
}

function MasteryPreview({ ar }: { ar: boolean }) {
  const rows = ar ? [['الاحتقان الوريدي', 82], ['حلقة الضغط والحجم', 64], ['تفعيل RAAS', 47]] : [['Venous congestion', 82], ['Pressure–volume loop', 64], ['RAAS activation', 47]]
  return <div><div className="flex items-end justify-between"><div><p className="text-[10.5px] font-semibold text-primary-strong">{ar ? 'ما تعرفه فعلًا' : 'What is actually settling'}</p><p className="mt-1 font-serif text-[22px] font-semibold text-ink">{ar ? 'فشل القلب' : 'Heart failure'}</p></div><span className="font-mono text-[20px] font-semibold text-ink">68%</span></div><div className="mt-6 space-y-5">{rows.map(([name, value]) => <div key={String(name)}><div className="flex justify-between text-[11px]"><span className="font-medium text-ink-2">{name}</span><span className="font-mono text-ink">{value}%</span></div><div className="mt-2 h-2 rounded-full bg-inset"><div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} /></div></div>)}</div><p className="mt-6 border-t border-line pt-3 text-[10.5px] leading-relaxed text-ink-3">{ar ? 'يتشكل من الاستدعاء والتكرار ونوع الدليل—وليس الدقة وحدها.' : 'Built from recall, repetition and evidence—not accuracy alone.'}</p></div>
}

function RankingPreview({ ar }: { ar: boolean }) {
  const names = ar ? [['مجهول · ٣٢', '٨٧'], ['أنت', '٨١'], ['مجهول · ١٨', '٧٦'], ['مجهول · ٤١', '٧٢']] : [['Anonymous · 32', '87'], ['You', '81'], ['Anonymous · 18', '76'], ['Anonymous · 41', '72']]
  return <div><div className="flex items-center justify-between"><h5 className="font-serif text-[21px] font-semibold text-ink">{ar ? 'مقارنة الدفعة' : 'Cohort comparison'}</h5><span className="rounded-md bg-success-tint px-2 py-1 text-[9.5px] font-semibold text-success">{ar ? 'مجهول دائمًا' : 'Always anonymous'}</span></div><div className="mt-5 border-t border-line">{names.map(([name, score], i) => <div key={name} className={cn('grid grid-cols-[28px_1fr_auto] items-center gap-3 border-b border-line py-3', i === 1 && 'bg-primary-tint px-2')}><span className="font-mono text-[10px] text-ink-3">0{i + 1}</span><span className="text-[12px] font-semibold text-ink">{name}</span><span className="font-mono text-[11px] text-ink">{score}%</span></div>)}</div><p className="mt-4 text-[10.5px] text-ink-3">{ar ? '١٢٤ طالبًا · نفس الجامعة والسنة' : '124 students · same university and year'}</p></div>
}

function ReaderPreview({ ar }: { ar: boolean }) {
  return <div className="grid gap-4 sm:grid-cols-[48px_1fr]"><div className="flex gap-2 sm:flex-col">{[Highlighter, PenLine, FileText, Search].map((Tool, i) => <button key={i} type="button" className={cn('grid size-10 place-items-center rounded-lg border', i === 0 ? 'border-primary bg-primary text-on-primary' : 'border-line bg-surface-2 text-ink-2')}><Tool size={15} /></button>)}</div><div className="min-h-56 rounded-md border border-line bg-paper p-5 shadow-panel"><div className="h-2 w-2/3 rounded bg-ink/80" /><div className="mt-4 space-y-2">{[92, 78, 88, 64, 85].map((w, i) => <div key={i} className={cn('h-1.5 rounded', i === 2 ? 'bg-primary-soft/55' : 'bg-line-2')} style={{ width: `${w}%` }} />)}</div><div className="mt-6 border-s-2 border-primary bg-primary-tint px-3 py-2 text-[10.5px] text-ink-2">{ar ? 'ملاحظة: اربط الوذمة بالاحتقان الوريدي' : 'Note: connect oedema to venous congestion'}</div><p className="mt-5 font-mono text-[9.5px] text-ink-3">{ar ? 'تزامن الآن · صفحة ١٤' : 'Synced now · page 14'}</p></div></div>
}

function NotesPreview({ ar }: { ar: boolean }) {
  return <div><div className="flex gap-2 border-b border-line pb-3"><Icon icon={BookOpen} size={16} className="text-primary" /><span className="text-[11.5px] font-semibold text-ink">{ar ? 'دفتر القلب والأوعية' : 'Cardiovascular notebook'}</span></div><h5 className="mt-5 font-serif text-[22px] font-semibold text-ink">{ar ? 'فشل القلب: الروابط التي تهم' : 'Heart failure: connections that matter'}</h5><div className="mt-4 space-y-3 text-[12px] leading-relaxed text-ink-2"><p>• {ar ? 'انخفاض النتاج ← تنشيط الجهاز الودي وRAAS' : 'Low output → sympathetic and RAAS activation'}</p><p>• {ar ? 'احتباس الصوديوم ← زيادة الاحتقان' : 'Sodium retention → greater congestion'}</p></div><div className="mt-6 flex flex-wrap gap-2"><span className="inline-flex items-center gap-1 rounded-md bg-accent-tint px-2 py-1 text-[9.5px] text-accent-strong"><Link2 size={10} />{ar ? 'السؤال ٣' : 'Question 3'}</span><span className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-2 py-1 text-[9.5px] text-ink-2"><FileText size={10} />{ar ? 'الملزمة ص ١٤' : 'Handout p.14'}</span></div></div>
}

function WhiteboardPreview({ ar }: { ar: boolean }) {
  return <div className="grid-chart-major relative min-h-[270px] overflow-hidden rounded-lg border border-line bg-paper p-4"><div className="absolute left-[38%] top-[42%] w-[30%] border-t-2 border-primary" /><div className="absolute left-[22%] top-[35%] h-[38%] border-s-2 border-accent" /><Node className="left-[6%] top-[12%]" label={ar ? 'انخفاض النتاج' : 'Low output'} accent /><Node className="right-[6%] top-[34%]" label="RAAS" /><Node className="bottom-[8%] left-[7%]" label={ar ? 'احتقان' : 'Congestion'} /><div className="absolute bottom-3 right-3 flex gap-1"><span className="grid size-8 place-items-center rounded-md border border-line bg-surface text-ink-2"><PenLine size={13} /></span><span className="grid size-8 place-items-center rounded-md border border-line bg-surface text-ink-2"><Image size={13} /></span><span className="grid size-8 place-items-center rounded-md border border-line bg-surface text-ink-2"><Network size={13} /></span></div></div>
}
function Node({ label, className, accent = false }: { label: string; className: string; accent?: boolean }) { return <div className={cn('absolute rounded-lg border px-3 py-2 text-[10.5px] font-semibold shadow-panel', accent ? 'border-accent-line bg-accent-tint text-accent-strong' : 'border-primary-line bg-primary-tint text-primary-strong', className)}>{label}</div> }

function TimerPreview({ ar }: { ar: boolean }) {
  return <div className="grid min-h-[270px] place-items-center"><div className="text-center"><div className="relative mx-auto grid size-40 place-items-center rounded-full border-[10px] border-inset"><span className="absolute inset-[-10px] rounded-full border-[10px] border-primary border-l-transparent" /><span className="font-mono text-[35px] font-semibold text-ink">24:18</span></div><p className="mt-5 text-[12px] font-semibold text-ink">{ar ? 'فشل القلب · تركيز' : 'Heart failure · focus'}</p><p className="mt-1 text-[10.5px] text-ink-3">{ar ? 'تُحفظ الجلسة تلقائيًا' : 'Session saves automatically'}</p></div></div>
}

function PeoplePreview({ ar }: { ar: boolean }) {
  const people = [['MA', ar ? 'مريم أحمد' : 'Mariam Ahmed'], ['OK', ar ? 'عمر كريم' : 'Omar Karim'], ['LN', ar ? 'ليلى نبيل' : 'Laila Nabil']]
  return <div><div className="flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2.5"><Search size={14} className="text-ink-3" /><span className="text-[11px] text-ink-3">{ar ? 'نفس الجامعة · السنة الثانية' : 'Same university · Year 2'}</span></div><div className="mt-4 space-y-2">{people.map(([initials, name], i) => <div key={initials} className="flex items-center gap-3 border-b border-line py-2.5"><span className="grid size-9 place-items-center rounded-full bg-accent-tint font-mono text-[10px] font-semibold text-accent-strong">{initials}</span><div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold text-ink">{name}</p><p className="text-[9.5px] text-ink-3">{ar ? 'قلب وأوعية هذا الأسبوع' : 'Cardiovascular this week'}</p></div><button type="button" className={cn('min-h-10 rounded-lg px-3 text-[10px] font-semibold', i === 0 ? 'bg-primary text-on-primary' : 'border border-line text-ink-2')}>{i === 0 ? (ar ? 'متصل' : 'Added') : (ar ? 'أضف' : 'Add')}</button></div>)}</div></div>
}

function RoomPreview({ ar }: { ar: boolean }) {
  return <div><div className="flex justify-between"><h5 className="font-serif text-[20px] font-semibold text-ink">{ar ? 'غرفة القلب · ٤٥ دقيقة' : 'Cardiology room · 45 min'}</h5><Icon icon={Users} size={17} className="text-primary" /></div><div className="grid-chart-major mt-4 grid grid-cols-3 gap-3 rounded-xl border border-line bg-surface-2 p-4">{[['MA', true], ['OK', true], ['LN', false], ['YA', true], ['+', false], ['NS', true]].map(([initials, active]) => <div key={String(initials)} className="rounded-lg border border-line bg-surface p-2 text-center"><span className={cn('mx-auto grid size-8 place-items-center rounded-full font-mono text-[9.5px] font-semibold', active ? 'bg-primary-tint text-primary-strong' : 'bg-inset text-ink-3')}>{initials}</span><span className="mx-auto mt-2 block h-4 w-10 rounded border border-line-2 bg-inset" /><span className={cn('mx-auto mt-2 block size-1.5 rounded-full', active ? 'bg-success' : 'bg-ink-3')} /></div>)}</div></div>
}

function GrowPreview({ ar }: { ar: boolean }) {
  return <div><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-primary-strong">{ar ? 'مارستانك' : 'Your maristana'}</p><h5 className="mt-1 font-serif text-[22px] font-semibold text-ink">{ar ? 'فناء المستوى ٤' : 'Courtyard · level 4'}</h5></div><span className="font-mono text-[10.5px] text-ink-3">18h 40m</span></div><div className="grid-chart-major relative mt-4 aspect-[1.55] overflow-hidden rounded-xl border border-line bg-surface-2 p-4"><div className="absolute inset-[28%] rounded-[42%] border-2 border-accent bg-accent-tint"><span className="absolute inset-[30%] rounded-full bg-success/25" /></div><Wing className="left-[8%] top-[12%] h-[28%] w-[34%]" label={ar ? 'جناح' : 'Ward'} /><Wing className="right-[8%] top-[12%] h-[28%] w-[34%]" label={ar ? 'تعليم' : 'Teaching'} /><Wing className="bottom-[10%] left-[8%] h-[24%] w-[34%]" label={ar ? 'مكتبة' : 'Library'} /><Wing className="bottom-[10%] right-[8%] h-[24%] w-[34%]" label={ar ? 'حديقة' : 'Garden'} /></div><p className="mt-3 text-[10.5px] text-ink-3">{ar ? 'الخطوة التالية: أضف قاعة التشريح بعد ٣٢٠ دقيقة تركيز' : 'Next: add the anatomy hall after 320 focus minutes'}</p></div>
}
function Wing({ className, label }: { className: string; label: string }) { return <div className={cn('absolute grid place-items-center rounded-md border border-primary-line bg-primary-tint text-[8.5px] font-semibold text-primary-strong shadow-panel', className)}>{label}</div> }

function DesktopSuites({ c }: { c: MaristanaLandingCopy }) {
  const [suiteIndex, setSuiteIndex] = useState(0)
  const [itemIndex, setItemIndex] = useState(0)
  const suite = c.featureSuites[suiteIndex]
  const item = suite.items[Math.min(itemIndex, suite.items.length - 1)]
  return <div className="hidden lg:grid lg:grid-cols-[0.42fr_1fr] lg:gap-10">
    <div>
      <div role="tablist" aria-label={c.suites.title} className="border-t border-line">
        {c.featureSuites.map((candidate, index) => <button key={candidate.id} type="button" role="tab" aria-selected={index === suiteIndex} onClick={() => { setSuiteIndex(index); setItemIndex(0) }} className={cn('flex min-h-16 w-full items-center justify-between gap-4 border-b border-line py-3 text-start text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary', index === suiteIndex ? 'text-primary-strong' : 'text-ink-2 hover:text-ink')}><span>{candidate.label}</span><span className="font-mono text-[10px] text-ink-3">0{index + 1}</span></button>)}
      </div>
      <p className="mt-5 text-[12.5px] leading-relaxed text-ink-2">{suite.intro}</p>
    </div>
    <div>
      <div role="tablist" aria-label={c.suites.itemsLabel} className="mb-4 flex flex-wrap gap-2">
        {suite.items.map((candidate, index) => <button key={candidate.id} type="button" role="tab" aria-selected={index === itemIndex} onClick={() => setItemIndex(index)} className={cn('min-h-10 rounded-lg border px-3 py-2 text-[11.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary', index === itemIndex ? 'border-primary bg-primary text-on-primary' : 'border-line-2 bg-surface text-ink-2 hover:bg-surface-2')}>{candidate.label}</button>)}
      </div>
      <div role="tabpanel"><PreviewFrame item={item} c={c} /></div>
    </div>
  </div>
}

function MobileSuites({ c }: { c: MaristanaLandingCopy }) {
  const [open, setOpen] = useState(0)
  const [items, setItems] = useState<Record<number, number>>({})
  return <div className="space-y-3 lg:hidden">{c.featureSuites.map((suite, suiteIndex) => {
    const expanded = open === suiteIndex
    const itemIndex = items[suiteIndex] ?? 0
    const item = suite.items[itemIndex]
    const regionId = `feature-suite-${suite.id}`
    return <div key={suite.id} className="overflow-hidden rounded-xl border border-line bg-surface">
      <button type="button" aria-expanded={expanded} aria-controls={regionId} onClick={() => setOpen(expanded ? -1 : suiteIndex)} className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"><span><span className="block text-[13px] font-semibold text-ink">{suite.label}</span><span className="mt-0.5 block text-[10.5px] text-ink-3">{suite.intro}</span></span><Icon icon={ChevronDown} size={16} className={cn('shrink-0 text-ink-3 transition-transform', expanded && 'rotate-180')} /></button>
      {expanded && <div id={regionId} className="border-t border-line p-3 sm:p-4"><div className="mb-3 flex gap-2 overflow-x-auto pb-1" aria-label={c.suites.itemsLabel}>{suite.items.map((candidate, index) => <button key={candidate.id} type="button" onClick={() => setItems((current) => ({ ...current, [suiteIndex]: index }))} className={cn('min-h-11 shrink-0 rounded-lg border px-3 text-[11px] font-semibold', index === itemIndex ? 'border-primary bg-primary text-on-primary' : 'border-line-2 text-ink-2')}>{candidate.label}</button>)}</div><PreviewFrame item={item} c={c} /></div>}
    </div>
  })}</div>
}

export function FeatureSuites({ c }: { c: MaristanaLandingCopy }) {
  return <section id="practice-suite" className="scroll-mt-24 py-24 sm:py-28">
    <div className="mb-9 border-b-2 border-ink pb-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-primary-strong">{c.suites.eyebrow}</p>
      <div className="mt-2 grid gap-3 lg:grid-cols-[1fr_0.7fr] lg:items-end"><h2 className="max-w-2xl font-serif text-[31px] font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[40px]">{c.suites.title}</h2><p className="max-w-lg text-[14.5px] leading-relaxed text-ink-2 lg:justify-self-end">{c.suites.body}</p></div>
    </div>
    <DesktopSuites c={c} />
    <MobileSuites c={c} />
  </section>
}
