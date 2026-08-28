import { useMemo, useState } from 'react'
import { GraduationCap, LifeBuoy, PlayCircle, Search } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { SearchInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { Icon } from '@/components/ui/Icon'
import { usePersistentState } from '@/lib/usePersistentState'
import {
  TUTORIAL_VIDEOS_STATE_KEY,
  matchesTutorialQuery,
  toEmbedUrl,
  tutorialTopicsByArea,
  type TutorialTopic,
  type TutorialVideoMap,
} from '@/data/tutorials'

/**
 * A topic's video: an admin-pasted mp4 plays directly, a YouTube/Vimeo link
 * embeds via iframe, and anything else falls back to a plain `<video>` tag —
 * covering a host we don't specifically recognise without hiding the video.
 * No URL yet shows a calm "coming soon" placeholder rather than empty space.
 */
function TutorialVideo({ topic, url }: { topic: TutorialTopic; url: string | undefined }) {
  const trimmed = url?.trim() ?? ''

  if (!trimmed) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-line bg-surface-2 text-center">
        <Icon icon={PlayCircle} size={22} className="text-ink-3" />
        <p className="text-[12px] font-medium text-ink-3">Video coming soon</p>
      </div>
    )
  }

  const embedUrl = toEmbedUrl(trimmed)
  if (embedUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-line bg-black">
        <iframe
          src={embedUrl}
          title={`${topic.label} tutorial video`}
          className="size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <video controls preload="metadata" className="aspect-video w-full rounded-lg border border-line bg-black">
      <source src={trimmed} />
    </video>
  )
}

export function Tutorial() {
  const [videos] = usePersistentState<TutorialVideoMap>(TUTORIAL_VIDEOS_STATE_KEY, {})
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const q = query.trim()
    return tutorialTopicsByArea()
      .map((group) => ({ ...group, topics: group.topics.filter((topic) => matchesTutorialQuery(topic, q)) }))
      .filter((group) => group.topics.length > 0)
  }, [query])

  const totalMatches = groups.reduce((sum, group) => sum + group.topics.length, 0)

  return (
    <PageContainer>
      <PageHeader
        title="Tutorial"
        description="A short guide and a short video for every part of Synapse. Search for a function, or browse by section."
      />

      <div className="mb-5">
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the tutorial…"
          className="w-full sm:max-w-sm"
        />
      </div>

      {totalMatches === 0 ? (
        <Panel>
          <EmptyState
            icon={Search}
            title="Nothing matches that"
            description="Try a different word, or clear the search to see every topic."
          />
        </Panel>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <Panel key={group.area} className="overflow-hidden">
              <PanelHeader
                title={group.area}
                icon={group.area === 'Getting started' ? LifeBuoy : GraduationCap}
                hint={`${group.topics.length} ${group.topics.length === 1 ? 'topic' : 'topics'}`}
              />
              <div className="divide-y divide-line">
                {group.topics.map((topic) => (
                  <div key={topic.id} className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_18rem] sm:p-5">
                    <div className="min-w-0">
                      <h3 className="font-serif text-[15.5px] font-semibold text-ink">{topic.label}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">{topic.instructions}</p>
                    </div>
                    <TutorialVideo topic={topic} url={videos[topic.id]} />
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
