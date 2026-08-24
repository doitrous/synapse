# 14 — Decks, written essays, histology slides, and authored minigames

These import kinds share the same Markdown shape as the rest of the
authoring programme:

- start each record with `# Item`;
- write every import column as a `## field_key` heading;
- separate records with `---`;
- never invent medical facts to fill an example. Use reviewed source material.

This page exists because the canonical import registry now treats these as
first-class authored content types, not side channels.

## Shared fields

Every record may use:

- `id`
- `title`
- `subject`
- `status`
- `owner`

`title` and `subject` are required. `id` is optional for a new record and
required when updating a specific existing record.

## Flashcard decks

Deck-specific fields:

- `description`
- `cards`

`cards` is required. Write one card per line:

```md
front | back
```

Example:

```md
# Item

## id
DECK-CVS-CORONARY-001

## title
CVS: Coronary anatomy

## subject
cvs

## description
Quick-fire recall for the major coronary vessels.

## cards
LAD | Supplies the anterior wall of the left ventricle
RCA | Supplies the SA node in most people
```

## Written essays

Essay-specific fields:

- `prompt`
- `key_points`
- `examiner_note`
- `model_answer`

`prompt` is required. `key_points` must contain at least one point. Prefix a key
point with `!` when it is a term the examiner scans for exactly.

Example:

```md
# Item

## id
ESSAY-CVS-RHF-001

## title
Right heart failure

## subject
cvs

## prompt
Discuss the causes and management of right heart failure.

## key_points
!Cor pulmonale
Raised JVP
Peripheral oedema

## examiner_note
Marks are lost for listing causes without linking them to right-sided signs.

## model_answer
Right heart failure follows a rise in pulmonary vascular resistance...
```

## Histology slides

Histology-specific fields:

- `tissue`
- `stain`
- `description`
- `image_4x`
- `image_10x`
- `image_40x`

At least one image field is required. Use reviewed, rights-cleared slide images;
pins/labels are added in the editor after import because their coordinates are
visual placement data, not manual text.

Example:

```md
# Item

## id
HIST-GI-ILEUM-001

## title
Ileum

## subject
gi

## tissue
Small bowel

## stain
H&E

## description
Villi, crypts of Lieberkühn, and Peyer's patches in the submucosa.

## image_4x
https://media.example.edu/histology/ileum-4x.jpg

## image_40x
https://media.example.edu/histology/ileum-40x.jpg
```

## Authored medicine minigames

Minigame packs are authored content, not generated content. Use `kind` to choose
one of the three supported medicine games:

- `clinical_sequence`
- `mechanism_chain`
- `red_flag_sort`

Shared minigame fields:

- `id`
- `kind`
- `title`
- `subject`
- `topic`
- `summary`
- `prompt`
- `source_label`
- `source_url`
- `reviewed_by`
- `reviewed_at`

`id`, `kind`, `title`, `subject`, `topic`, `summary`, `prompt`,
`source_label`, and `reviewed_by` are required. `source_url` and `reviewed_at`
are optional, but use them whenever the reviewed source has a stable locator or
review date.

### Clinical Sequence and Mechanism Chain

Ordered games also use:

- `steps`
- `explanation`

`steps` is required. Write one reviewed step per line, in the correct order:

```md
step_id | step text
```

`explanation` is required and should explain the authored order. The app may
shuffle step cards for play, but it must never invent or rewrite the medical
facts.

Example:

```md
# Item

## id
CS-EMERG-PRIMARY-SURVEY-001

## kind
clinical_sequence

## title
Basic life support primary survey

## subject
fnd

## topic
Emergencies & red flags

## summary
Order the first response steps for an unresponsive adult in a teaching scenario.

## prompt
Place the actions in the order a responder should take before ongoing reassessment.

## source_label
Reviewed emergency-skills source pack

## source_url
internal://source-packs/emergency-skills

## reviewed_by
Content operations

## reviewed_at
2026-08-24

## steps
danger | Check the scene for danger before approaching.
response | Check responsiveness and call for help.
airway | Open the airway.
breathing | Check breathing.
compressions | Start chest compressions if breathing is absent or abnormal.
aed | Attach an AED as soon as it is available and follow prompts.

## explanation
The game uses this authored order exactly; it never generates clinical steps.
```

Use the same `steps` format for `mechanism_chain`, but each line should be one
reviewed cause-to-effect link in the chain.

### Red Flag Sort

Red Flag Sort also uses:

- `urgent_lane`
- `routine_lane`
- `findings`

`urgent_lane`, `routine_lane`, and `findings` are required. Write one reviewed
finding per line:

```md
finding_id | urgent|routine | finding text | rationale
```

Each pack must contain both urgent and routine findings. The rationale is shown
after play, so it should state why the authored lane is correct in that pack.

Example:

```md
# Item

## id
RF-RESP-ESCALATION-001

## kind
red_flag_sort

## title
Respiratory escalation signals

## subject
resp

## topic
Respiratory safety

## summary
Sort respiratory findings into urgent escalation versus routine review.

## prompt
Classify each authored finding by the action it should trigger in this learning scenario.

## source_label
Reviewed respiratory safety pack

## reviewed_by
Content operations

## urgent_lane
Urgent escalation

## routine_lane
Routine review

## findings
silent-chest | urgent | Silent chest with marked breathlessness | This is authored as an emergency-pattern finding in this pack.
cyanosis | urgent | Cyanosis or exhaustion | This is authored as an urgent deterioration signal in this pack.
mild-cough | routine | Mild cough with normal activity and no distress | This is authored here as appropriate for routine review.
inhaler-technique | routine | Poor inhaler technique without acute distress | This pack classifies it as a routine education/review issue.
```
