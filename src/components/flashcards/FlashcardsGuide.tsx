import type { ReactNode } from 'react'
import {
  GraduationCap, X, FileText, Brackets, Image as ImageIcon, Volume2, Sparkles,
  Layers, Search, BarChart3, KeyRound, Lightbulb, CheckCircle2, Repeat,
} from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Kbd } from '@/components/ui/Kbd'
import { useT } from '@/lib/i18n'
import { useScope } from '@/lib/shortcuts/useShortcuts'

/**
 * A friendly, scannable guide to the Flashcards feature — how to create the
 * three card types, study effectively, and use the scheduler and stats. Opened
 * on demand from the Flashcards header; it teaches the feature without leaving
 * the page. Everything here is static reference content, tokenized for theme.
 */
export function FlashcardsGuide({ onClose }: { onClose: () => void }) {
  const t = useT()
  useScope('dialog', { exclusive: true })

  return (
    <Dialog onClose={onClose} label={t('Flashcards guide')} size="xl">
      <PanelHeader
        title={t('Make the most of Flashcards')}
        icon={GraduationCap}
        action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />}
      />
      <div className="max-h-[75vh] space-y-7 overflow-y-auto p-5 sm:p-6">
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          {t('Flashcards use spaced repetition: each card comes back right before you would forget it, so a few minutes a day is enough to hold a whole subject in memory. Here is how to get the best out of it.')}
        </p>

        {/* 1 — Create cards */}
        <Section icon={Sparkles} step={1} title={t('Create your cards')}>
          <p className="mb-3 text-[13px] leading-relaxed text-ink-2">
            {t('Open the')} <b>{t('Add')}</b> {t('tab (or press')} <Kbd>⌘N</Kbd>{t('), pick a deck, then choose a card type:')}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <TypeCard icon={FileText} title={t('Basic')}>
              {t('A front (the prompt) and a back (the answer). Best for a clean question → answer.')}
            </TypeCard>
            <TypeCard icon={Brackets} title={t('Cloze')}>
              {t('Hide words inside a sentence: select text and press')} <Kbd>⌘⇧C</Kbd>. {t('Each {{c1}}, {{c2}} becomes its own card.')}
            </TypeCard>
            <TypeCard icon={ImageIcon} title={t('Image Occlusion')}>
              {t('Upload a diagram and draw over the labels to hide them — perfect for anatomy and histology.')}
            </TypeCard>
          </div>
          <Tip icon={Volume2}>
            {t('Attach audio to any Basic or Cloze card (pronunciations, heart sounds). While studying, press')} <Kbd>R</Kbd> {t('to replay and')} <Kbd>P</Kbd> {t('to pause or resume.')}
          </Tip>
        </Section>

        {/* 2 — Study */}
        <Section icon={CheckCircle2} step={2} title={t('Study and grade honestly')}>
          <p className="mb-3 text-[13px] leading-relaxed text-ink-2">
            {t('Open a deck and press')} <Kbd>Space</Kbd> {t('to reveal the answer. Then rate how it went — this is what schedules the card:')}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <GradeRow k="1" label={t('Again')} tone="danger">{t('You forgot — see it again soon.')}</GradeRow>
            <GradeRow k="2" label={t('Hard')} tone="ink">{t('Recalled, but it was a struggle.')}</GradeRow>
            <GradeRow k="3" label={t('Good')} tone="primary">{t('Recalled correctly — the normal answer.')}</GradeRow>
            <GradeRow k="4" label={t('Easy')} tone="success">{t('Instant — push the interval out further.')}</GradeRow>
          </div>
          <Tip icon={Lightbulb}>
            {t('Grade truthfully, not kindly. Pressing “Good” on a card you barely remembered only means you will fail it later. The schedule works when your grades are honest.')}
          </Tip>
        </Section>

        {/* 3 — Organize */}
        <Section icon={Layers} step={3} title={t('Organize and review')}>
          <ul className="space-y-2 text-[13px] leading-relaxed text-ink-2">
            <Bullet icon={Layers}>{t('Group cards into')} <b>{t('decks')}</b> {t('by subject, and add')} <b>{t('tags')}</b> {t('for cross-cutting topics.')}</Bullet>
            <Bullet icon={Search}>{t('Use')} <b>{t('Browse')}</b> {t('to search, filter, and bulk-edit — flag, suspend, bury, move or retag many cards at once.')}</Bullet>
            <Bullet icon={KeyRound}>{t('Flag a card with')} <Kbd>⌘1</Kbd>–<Kbd>⌘7</Kbd>{t('. Suspend with')} <Kbd>S</Kbd>{t(', bury for today with')} <Kbd>B</Kbd>.</Bullet>
          </ul>
        </Section>

        {/* 4 — Scheduler */}
        <Section icon={Repeat} step={4} title={t('Choose a scheduler (optional)')}>
          <p className="text-[13px] leading-relaxed text-ink-2">
            {t('In a deck’s')} <b>{t('Options')}</b> ({t('press')} <Kbd>O</Kbd> {t('while studying) you can pick:')}
          </p>
          <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-ink-2">
            <Bullet icon={CheckCircle2}><b>{t('SM-2')}</b> — {t('Anki’s classic scheduler and the default. Reliable and familiar.')}</Bullet>
            <Bullet icon={Sparkles}><b>{t('FSRS')}</b> — {t('a modern, self-adapting scheduler that learns each card’s stability and difficulty from your reviews to place intervals more precisely. Opt in per deck; your existing cards keep their history.')}</Bullet>
          </ul>
        </Section>

        {/* 5 — Track */}
        <Section icon={BarChart3} step={5} title={t('Track your progress')}>
          <p className="text-[13px] leading-relaxed text-ink-2">
            {t('The')} <b>{t('Stats')}</b> {t('tab shows your streak, retention, review forecast, and — on FSRS decks — the stability, difficulty and retrievability of your cards. Aim for a short daily session and let the streak build.')}
          </p>
        </Section>

        <div className="rounded-xl border border-line bg-surface-2/60 p-4">
          <div className="mb-1 flex items-center gap-2 text-[12.5px] font-semibold text-ink">
            <Icon icon={KeyRound} size={15} className="text-primary" /> {t('Keyboard-first')}
          </div>
          <p className="text-[12.5px] leading-relaxed text-ink-2">
            {t('Almost everything has a shortcut. Press')} <Kbd>?</Kbd> {t('anywhere in Flashcards to see the full list. Jump between views with')} <Kbd>G</Kbd> {t('then')} <Kbd>D</Kbd>/<Kbd>A</Kbd>/<Kbd>B</Kbd>/<Kbd>S</Kbd>.
          </p>
        </div>
      </div>
    </Dialog>
  )
}

function Section({ icon, step, title, children }: { icon: typeof Sparkles; step: number; title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-2.5 flex items-center gap-2.5 font-serif text-[16px] font-semibold text-ink">
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-primary-strong/25 bg-primary-tint text-[12px] font-semibold text-primary-strong tnum">{step}</span>
        <Icon icon={icon} size={16} className="text-primary" />
        {title}
      </h3>
      <div className="ps-9">{children}</div>
    </section>
  )
}

function TypeCard({ icon, title, children }: { icon: typeof FileText; title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-3">
      <div className="mb-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-ink">
        <Icon icon={icon} size={14} className="text-primary" /> {title}
      </div>
      <p className="text-[12px] leading-relaxed text-ink-2">{children}</p>
    </div>
  )
}

function GradeRow({ k, label, tone, children }: { k: string; label: string; tone: 'danger' | 'ink' | 'primary' | 'success'; children: ReactNode }) {
  const toneClass = {
    danger: 'border-danger/30 bg-danger-tint text-danger',
    ink: 'border-line-2 bg-surface text-ink',
    primary: 'border-primary-strong/25 bg-primary-tint text-primary-strong',
    success: 'border-success/30 bg-success-tint text-success',
  }[tone]
  return (
    <div className="flex items-center gap-2.5">
      <span className={`inline-flex min-w-[4.5rem] items-center justify-center gap-1.5 rounded-md border px-2 py-1 text-[12px] font-semibold ${toneClass}`}>
        {label} <Kbd>{k}</Kbd>
      </span>
      <span className="text-[12.5px] leading-snug text-ink-2">{children}</span>
    </div>
  )
}

function Bullet({ icon, children }: { icon: typeof Layers; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <Icon icon={icon} size={14} className="mt-0.5 shrink-0 text-ink-3" />
      <span>{children}</span>
    </li>
  )
}

function Tip({ icon, children }: { icon: typeof Lightbulb; children: ReactNode }) {
  return (
    <div className="mt-3 flex items-start gap-2 rounded-lg border border-accent/25 bg-accent-tint px-3 py-2.5">
      <Icon icon={icon} size={15} className="mt-0.5 shrink-0 text-accent-strong" />
      <p className="text-[12.5px] leading-relaxed text-ink-2">{children}</p>
    </div>
  )
}
