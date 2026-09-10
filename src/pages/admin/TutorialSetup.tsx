import { useState } from 'react'
import { CircleCheck, ExternalLink, GraduationCap, LifeBuoy, PlayCircle, Save } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { TextInput } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  TUTORIAL_VIDEOS_STATE_KEY,
  isPlausibleVideoUrl,
  TUTORIAL_HUBS,
  tutorialTopicsByHub,
  type TutorialVideoMap,
} from '@/data/tutorials'

/**
 * Paste a video URL per tutorial topic.
 *
 * Written to the shared `nishany-tutorial-videos-v1` document — the same
 * shared-state mechanism `NotificationCampaigns` and `EmailAutomations` use —
 * so a saved link reaches every student's Tutorial page, not just this
 * admin's own browser.
 *
 * Each row keeps its own draft, since a field the admin is mid-edit on must
 * not be reflowed by another admin's save landing elsewhere in the same
 * document. "Saved" is derived, not a timer: a row reads as saved exactly
 * when its draft matches what is actually stored.
 */
export function TutorialSetup() {
  const [videos, setVideos] = usePersistentState<TutorialVideoMap>(TUTORIAL_VIDEOS_STATE_KEY, {})
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const groups = TUTORIAL_HUBS.map((hub) => ({ area: hub.label, topics: tutorialTopicsByHub(hub.id) }))
  const filledCount = groups.reduce((sum, group) => sum + group.topics.filter((topic) => (videos[topic.id] ?? '').trim() !== '').length, 0)
  const totalCount = groups.reduce((sum, group) => sum + group.topics.length, 0)

  function draftFor(topicId: string): string {
    return drafts[topicId] ?? videos[topicId] ?? ''
  }

  function save(topicId: string) {
    const value = draftFor(topicId).trim()
    if (!isPlausibleVideoUrl(value)) return
    setVideos((current) => {
      if (!value) {
        const next = { ...current }
        delete next[topicId]
        return next
      }
      return { ...current, [topicId]: value }
    })
    setDrafts((current) => {
      const next = { ...current }
      delete next[topicId]
      return next
    })
  }

  return (
    <PageContainer>
      <PageHeader
        title="Tutorial videos"
        description="Paste a video URL for each platform function — a direct .mp4 link, or a YouTube/Vimeo link. Save a video to enable the dashboard tutorial button. Blank topics keep their written guide without a video. Sections follow the current app navigation."
      />

      <p className="mb-4 text-[12.5px] text-ink-3">
        <span className="tnum font-mono font-medium text-ink-2">{filledCount}</span> / {totalCount} topics have a video
      </p>

      <div className="space-y-4">
        {groups.map((group) => (
          <Panel key={group.area} className="overflow-hidden">
            <PanelHeader
              title={group.area}
              icon={group.area === 'Getting started' ? LifeBuoy : GraduationCap}
              hint={`${group.topics.length} ${group.topics.length === 1 ? 'topic' : 'topics'}`}
            />
            <div className="divide-y divide-line">
              {group.topics.map((topic) => {
                const value = draftFor(topic.id)
                const stored = (videos[topic.id] ?? '').trim()
                const valid = isPlausibleVideoUrl(value)
                const dirty = value.trim() !== stored
                const saved = !dirty && stored !== ''

                return (
                  <div key={topic.id} className="grid gap-2 p-4 sm:grid-cols-[14rem_minmax(0,1fr)_auto] sm:items-center sm:gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon icon={PlayCircle} size={15} className="shrink-0 text-ink-3" />
                      <span className="truncate text-[13.5px] font-medium text-ink">{topic.label}</span>
                    </div>
                    <div>
                      <TextInput
                        value={value}
                        onChange={(event) => setDrafts((current) => ({ ...current, [topic.id]: event.target.value }))}
                        onKeyDown={(event) => { if (event.key === 'Enter') save(topic.id) }}
                        placeholder="https://youtube.com/watch?v=… or a direct .mp4 link"
                        style={!valid ? { borderColor: 'var(--color-danger)' } : undefined}
                      />
                      {!valid && <p className="mt-1 text-[11.5px] text-danger">Enter a valid http(s) video URL, or leave blank.</p>}
                    </div>
                    <div className="flex items-center gap-2 sm:justify-end">
                      {saved ? (
                        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-success"><Icon icon={CircleCheck} size={14} />Saved</span>
                      ) : dirty && valid ? (
                        <span className="text-[11.5px] text-ink-3">Not saved yet</span>
                      ) : null}
                      {stored && !dirty && (
                        <IconButton icon={ExternalLink} label={`Open ${topic.label} video in a new tab`} size="sm" onClick={() => window.open(stored, '_blank', 'noopener,noreferrer')} />
                      )}
                      <IconButton
                        icon={Save}
                        label={`Save video for ${topic.label}`}
                        size="sm"
                        disabled={!valid || !dirty}
                        onClick={() => save(topic.id)}
                        className={dirty && valid ? 'border-primary-line bg-primary-tint text-primary-strong' : undefined}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>
        ))}
      </div>
    </PageContainer>
  )
}
