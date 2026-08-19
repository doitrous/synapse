# Study assistant — design

The in-app assistant for students. Built with the method from the
[chatbot-builder harness](https://github.com/revfactory/harness-100/tree/main/en/38-chatbot-builder/.claude)
— persona → conversation design → NLU → integration → testing — applied
directly rather than through its five-agent pipeline.

The harness assumes a task bot: an intent classifier, a slot filler, a
scripted flow per intent. Synapse's assistant is an LLM, so the taxonomy below
is not a classifier to train. It is the **contract the system prompt is written
against and the test suite is written from** — the set of things the assistant
must handle, and the shape of the answer for each.

---

## 1. Persona

| Attribute | Decision |
|---|---|
| Name | Study assistant (no human name, no avatar face) |
| Voice | Precise, calm, clinical. Never hype, never gamified. |
| Person | Second person to the student; first person plural never |
| Length | Two to six sentences by default; a list only when the answer is a list |
| Emoji | None |
| Languages | Arabic and English; answers in the language it was asked in |
| Refusal style | One sentence, no lecture, then the nearest thing it can do |

This follows the brand voice in `PRODUCT.md` and its anti-goal — "avoid AI
slop". Practically that means: no "Great question!", no "I'd be happy to help",
no bulleted summary of what it is about to say before it says it.

### The one thing it must never be

Synapse is **not clinical guidance** and neither is the assistant. Anything
that reads as a request for a decision about a real patient gets refused, in
both languages, without exception and without hedging. That is `safety.clinical`
below, and it is the highest-priority intent — it is checked before the
assistant tries to be helpful.

---

## 2. Intent taxonomy

Named `verb.noun` per the harness's quality checklist. Twelve intents plus
fallback — inside the 20–50 band it recommends for a small system, because the
LLM generalises across phrasing and the taxonomy only has to carve out
behaviours that genuinely differ.

### Study (the reason the assistant exists)

| Intent | The student is asking | Required slots | Answer shape |
|---|---|---|---|
| `study.what_next` | What should I study today? | — | Reads their due reviews and schedule; names one thing first, then at most two more |
| `study.explain_concept` | Explain preload vs afterload | `concept` | Explanation grounded in the library, with the subtopic named so they can open it |
| `study.why_wrong` | Why was my answer wrong? | `question_ref` | The rationale for the option they picked, then the one for the correct option |
| `study.summarise_topic` | Summarise the cardiac cycle | `topic` | Structured recall, not prose — the shape they will be examined on |
| `study.find_content` | Where is heart failure covered? | `query` | A named location in the library/practical/resources, not a description of it |
| `study.plan_session` | Build me 20 renal questions | `subject`, `count?` | Confirms the block, then hands off to the question bank |
| `study.test_me` | Quiz me on the nephron | `topic` | One question at a time, answer withheld until they commit |

### Progress and platform

| Intent | The student is asking | Answer shape |
|---|---|---|
| `progress.check` | How am I doing in respiratory? | First-attempt accuracy and what is slipping — calibrated, never vanity |
| `platform.how_to` | How does the whiteboard work? | Two sentences and where to click |
| `platform.account` | What plan am I on? What are my limits? | Their tier, their remaining messages, and where Billing is |

### Meta and safety

| Intent | Trigger | Behaviour |
|---|---|---|
| `meta.smalltalk` | Greeting, thanks, "who are you" | One line, then offer the three things it is good at |
| `meta.out_of_scope` | Anything not medical study or Synapse | Declines in one sentence, names what it does cover |
| `safety.clinical` | **Any** request for a decision about a real person | Refuses. See below. |
| `fallback.unclear` | Nothing above fits | Level 1 of the fallback ladder |

### `safety.clinical` — the exact contract

Triggers on: a named or implied real patient, a treatment or dosing decision,
an interpretation of a real result, "what should I do", anything in a clinical
setting framed as live rather than as a case.

Does **not** trigger on: exam-style vignettes, OSCE stations, "a 62-year-old
man presents with…", textbook mechanism questions. Those are the product.

Response: one sentence stating it is a study tool and cannot advise on real
patients, then a redirect to the study version of the same question. No
disclaimer paragraph, no repetition — the disclaimer already sits under the
composer.

---

## 3. Entities and slots

| Slot | Type | Source |
|---|---|---|
| `concept`, `topic` | dictionary | The medical taxonomy already in `app_state` |
| `subject` / `system` | dictionary | The eight organ systems |
| `year` | system | The student's own record |
| `count` | pattern | Integer, clamped 5–40 |
| `question_ref` | pattern | A question id from the current session |
| `lang` | system | Detected from the message, defaulting to UI language |

Unfilled required slots are asked for **once**, in the same turn as a useful
partial answer — never as a bare "which subject?" that spends a turn and
gives nothing.

---

## 4. Fallback ladder

Three levels, per the harness's `conversation-flow-validator`:

| Level | When | Behaviour |
|---|---|---|
| 1 | First unparsed message | Asks for a rephrase, and names the two most likely readings |
| 2 | Second in a row | Offers concrete options — "study plan", "explain a concept", "find a topic" |
| 3 | Third in a row, or asked for | Points at Help and Support; stops trying to guess |

The counter resets on any successful turn. It is carried by the transcript
itself — the model sees how many times in a row it has already asked for a
rephrase — rather than by a separate counter, so the ladder is about the
conversation, not the account.

**No fallback black hole.** Every level ends in something the student can act
on, which is the defect the validator's `[FALLBACK]` node check exists to catch.

---

## 5. Guardrails

| Guardrail | Implementation |
|---|---|
| Not clinical guidance | System prompt, plus a persistent line under the composer |
| No invented citations | The prompt forbids naming a book, page or guideline it was not given |
| No invented prices or policy | Pricing and refund questions are answered from the pricing page's own FAQ, passed in as grounding |
| No curriculum claim | It never asserts a specific university's syllabus |
| Quota | Enforced server-side before the model is called, never in the client |
| Key safety | API keys never reach the browser; the chat route runs on the server. One key per provider, each encrypted at rest |
| Provider independence | Three wire adapters (OpenAI-compatible, Anthropic, Gemini) in `server/src/assistantProviders.js`. Adding a provider is a registry entry, not a new code path |

---

## 6. Quotas and tiers

Limits are per calendar day, per account, counted in **student messages sent**
— the unit a student can understand and predict. Enforced in
`server/src/assistant.js` before any model call, so a client that ignores the
count cannot spend anything.

Defaults, all editable in Admin → AI Assistant:

| Tier | Messages / day | Rationale |
|---|---|---|
| `free` | 10 | Matches the free plan's 10 questions a day |
| `qbank` | 60 | Enough to lean on it through a study session |
| `adaptive` | 200 | The plan whose whole promise is that Synapse plans for you |
| `sprint` | 200 | Exam-period intensity |
| `campus` | 200 | Institutional |
| *(unknown plan)* | falls back to `free` | Fails closed |

A tier can also be switched off entirely, which is the honest way to run the
assistant as an Adaptive-only feature.

---

## 7. What is deliberately not built

- **No streaming on the first version.** Responses are short by design and the
  quota is per message; streaming adds a failure mode (a half-charged message)
  for a small gain. The route is shaped so streaming can be added without a
  client change.
- **No conversation history in the database.** Turns live in the session only.
  Storing student questions about their own weak points creates a sensitive
  record with no product use yet; aggregate usage is stored instead.
- **No streaming across providers.** Each of the three formats streams
  differently; the non-streaming path is one adapter per format and is what the
  quota model assumes. Streaming is additive when it is wanted.
- **No retrieval over the whole library yet.** The assistant is grounded on a
  compact context (the student's schedule, their weak subjects, the pricing FAQ,
  the platform how-tos). Full retrieval over `medical-library-v1.json` is the
  natural next step and is where citation quality will come from.

See [assistant-testing.md](assistant-testing.md) for the scenarios this design
is verified against.
