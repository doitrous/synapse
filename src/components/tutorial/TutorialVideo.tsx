import { useT } from '@/lib/i18n'
import { toEmbedUrl, type TutorialTopic } from '@/data/tutorials'

/**
 * A topic's video, drawn only when there is one.
 *
 * An admin-pasted mp4 plays directly, a YouTube/Vimeo link embeds via iframe,
 * and anything else falls back to a plain `<video>` tag — covering a host we do
 * not specifically recognise without hiding the video. A topic with no URL
 * renders nothing at all: the page used to hold a dashed grey box open for
 * every one of the twenty-seven, which read as twenty-seven things missing
 * rather than as a written guide that also has some videos.
 */
export function TutorialVideo({ topic, url }: { topic: TutorialTopic; url: string | undefined }) {
  const t = useT()
  const trimmed = url?.trim() ?? ''
  if (!trimmed) return null

  const embedUrl = toEmbedUrl(trimmed)
  if (embedUrl) {
    return (
      <div className="mt-5 aspect-video w-full max-w-[45rem] overflow-hidden rounded-xl border border-line bg-black">
        <iframe
          src={embedUrl}
          title={t('{topic} tutorial video').replace('{topic}', t(topic.label))}
          className="size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <video
      controls
      preload="metadata"
      className="mt-5 aspect-video w-full max-w-[45rem] rounded-xl border border-line bg-black"
    >
      <source src={trimmed} />
    </video>
  )
}
