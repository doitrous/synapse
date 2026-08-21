import { useState } from 'react'
import { Check, TriangleAlert, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Select } from '@/components/ui/Field'
import { Badge } from '@/components/ui/Badge'
import { MediaPicker } from '@/components/admin/MediaPicker'
import { QuestionView } from '@/components/qbank/QuestionView'
import { useMediaRecords } from '@/lib/useMediaRecords'
import { verifyRenders } from '@/lib/mediaUpload'
import type { AnswerLetter, MediaPlacement, MediaSlot } from '@/data/mediaLibrary'
import type { Question } from '@/data/qbank'

const SLOTS: Array<{ id: MediaSlot; label: string }> = [
  { id: 'stem', label: 'Question stem' },
  { id: 'answer', label: 'An answer option' },
  { id: 'explanation', label: 'The explanation' },
]

const LETTERS: AnswerLetter[] = ['A', 'B', 'C', 'D', 'E', 'F']

/**
 * What the editor knows about an image it has just attached.
 *
 * Each stage is named because "upload failed" for three different reasons is
 * three different fixes: the file never arrived, it arrived but is not an
 * image, or it is an image that did not appear where it was put.
 */
type Proof =
  | { phase: 'idle' }
  | { phase: 'verifying'; mediaId: string }
  | { phase: 'proved'; mediaId: string; width: number; height: number }
  | { phase: 'failed'; at: 'upload' | 'verify'; reason: string }

function newPlacementId() {
  return `plc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

/**
 * Where the images in one question go, and the proof that they got there.
 *
 * The confirmation is the student's own `QuestionView`, rendered with the
 * placement applied and the bytes fetched back from the server. A preview built
 * for this panel could be right while the student's view was wrong, which is
 * precisely the failure this replaces — an image that rendered perfectly for
 * whoever chose it and reached nobody else.
 */
export function MediaPlacementEditor({ placements, onChange, previewQuestion }: {
  placements: MediaPlacement[]
  onChange: (next: MediaPlacement[]) => void
  /** The draft as a student would receive it, for the proof below. */
  previewQuestion: Question
}) {
  const records = useMediaRecords()
  const [slot, setSlot] = useState<MediaSlot>('stem')
  const [answerLabel, setAnswerLabel] = useState<AnswerLetter>('A')
  const [picking, setPicking] = useState(false)
  const [proof, setProof] = useState<Proof>({ phase: 'idle' })

  async function place(mediaId: string) {
    setPicking(false)
    // The server has it. Whether a student can see it is a different question,
    // and this is where it gets asked.
    setProof({ phase: 'verifying', mediaId })
    try {
      const { width, height } = await verifyRenders(mediaId)
      onChange([
        ...placements,
        { id: newPlacementId(), mediaId, slot, ...(slot === 'answer' ? { answerLabel } : {}) },
      ])
      setProof({ phase: 'proved', mediaId, width, height })
    } catch (reason) {
      setProof({
        phase: 'failed',
        at: 'verify',
        reason: reason instanceof Error ? reason.message : 'The server has it, but it did not come back as an image.',
      })
    }
  }

  const provedQuestion: Question = proof.phase === 'proved'
    ? { ...previewQuestion, media: [...placements] }
    : previewQuestion

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {placements.map((placement) => {
          const record = records.get(placement.mediaId)
          return (
            <li key={placement.id} className="flex items-center gap-2 rounded-lg border border-line bg-surface-2/60 p-2">
              <Badge tone="outline">
                {placement.slot === 'answer' ? `Answer ${placement.answerLabel}` : placement.slot === 'stem' ? 'Stem' : 'Explanation'}
              </Badge>
              <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">
                {record?.title ?? <span className="text-warning">this image is no longer in the library</span>}
              </span>
              <button
                type="button"
                aria-label={`Remove ${record?.title ?? 'this image'}`}
                className="grid size-8 place-items-center rounded text-ink-3 hover:bg-inset hover:text-danger"
                onClick={() => onChange(placements.filter((candidate) => candidate.id !== placement.id))}
              >
                <Icon icon={Trash2} size={14} />
              </button>
            </li>
          )
        })}
      </ul>

      {!picking && (
        <div className="flex flex-wrap items-end gap-2">
          <Select aria-label="Where this image goes" value={slot} onChange={(event) => setSlot(event.target.value as MediaSlot)} className="h-9 w-auto text-[12.5px]">
            {SLOTS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </Select>
          {slot === 'answer' && (
            <Select aria-label="Which answer" value={answerLabel} onChange={(event) => setAnswerLabel(event.target.value as AnswerLetter)} className="h-9 w-auto text-[12.5px]">
              {LETTERS.map((letter) => <option key={letter} value={letter}>{letter}</option>)}
            </Select>
          )}
          <Button size="sm" variant="secondary" onClick={() => setPicking(true)}>Add an image here</Button>
        </div>
      )}

      {picking && <MediaPicker onPick={(mediaId) => void place(mediaId)} onCancel={() => setPicking(false)} />}

      {proof.phase === 'verifying' && (
        <p className="text-[12px] text-ink-2">Checking that the server hands it back…</p>
      )}

      {proof.phase === 'failed' && (
        <div className="rounded-lg border border-danger/40 bg-danger-tint/30 p-3">
          <p className="flex items-start gap-2 text-[12.5px] font-semibold text-ink">
            <Icon icon={TriangleAlert} size={14} className="mt-0.5 shrink-0 text-danger" />
            {proof.at === 'upload' ? 'The upload did not complete.' : 'The server has the file, but it did not come back as an image.'}
          </p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">{proof.reason}</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">Nothing was attached to this question.</p>
        </div>
      )}

      {proof.phase === 'proved' && (
        <div className="rounded-xl border border-success/40 bg-success-tint/30 p-3">
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
            <Icon icon={Check} size={14} className="text-success" />
            Stored and rendering — {proof.width}×{proof.height}. This is what the student sees:
          </p>
          {/* The student's own component, not a preview built for this panel. A
              purpose-built one could be right while their view was wrong. */}
          <div className="mt-2 rounded-lg border border-line bg-surface p-3">
            <QuestionView question={provedQuestion} chosen={null} revealed onChoose={() => undefined} />
          </div>
        </div>
      )}
    </div>
  )
}
