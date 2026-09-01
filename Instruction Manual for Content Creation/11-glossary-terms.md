# 11 · Glossary terms

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

The **glossary** is a bilingual medical dictionary: an English term, its Arabic term, and a
plain explanation of each. It exists because a student reading English medical prose needs a
place to look up a word without leaving the sentence, and because the Arabic term is the one
they will hear on the ward.

| | |
|---|---|
| **Imports at** | Admin › Glossary › Import (`/admin/glossary/import`) |
| **Goes in** | `docs/import-ready/glossary/` |
| **Format** | Same as every other kind — `# Item` / `## field` blocks. See below. |
| **Fields** | 7 |
| **Live today** | The glossary is **empty**. Nothing has been imported. |

---

## Scope: this is reference content, not a project of its own

The glossary must not grow ahead of the question bank. Write a term because a module you are
actually authoring needs it — because its department book uses the word, or a question or
article you wrote assumes the student knows it — not because it is a plausible medical term.
Terms come from the department books of the modules being authored, in the order those
modules are worked.

## Arabic review

`ar` and `defAr` are both required in practice — a term is not finished with an English side
only. Research the Arabic yourself; you do not need to wait for a reviewer to write it. But
any rendering you are not fully confident of goes in a running list at
`<root>/glossary/ARABIC-REVIEW.md` (create it if it does not exist: one line per term, the
term, your rendering, and what you are unsure of) so a native reviewer can confirm it before
Omar treats it as final. Writing an Arabic term you doubt without flagging it there is worse
than flagging it — a wrong term teaches the wrong word.

---

## Two ways this type is different from everything else

The file format is **not** one of them, despite what an earlier draft of this manual and the
admin import screen's own "Markdown alternative" preview both claimed. Verified directly
against `src/components/admin/ImportWizard.tsx`: every `.md`/`.markdown` upload — glossary
included — goes through the same `parseMarkdown()`, which reads `# Item` / `## field` blocks
by regex-matching `##` headings. It does not parse pipe tables at all; a pipe table saved as
`.md` yields zero detected headers and the wizard rejects it with "No header row and data
rows were detected in this file." (`src/pages/admin/GlossaryImportPage.tsx:15-18` shows a pipe
table as its example text, but that text is display-only and does not reflect what the parser
accepts.) So: write the glossary exactly like every other kind, `# Item` / `## field` blocks.
The wizard also accepts `.csv` and `.xlsx` if that is what you have.

### 1 · None of the four validators cover it

`medical:batch`, `medical:simulate`, `medical:audit` and `medical:validate:authoring` all
have no branch for the glossary. `medical:batch` used to crash on a glossary file with a
`TypeError`; it now refuses it clearly, naming the kinds it does recognise — the same way it
handles a subjects file.

Your check is the one in this manual, plus the wizard's own preview.

### 2 · The glossary is currently empty

There are **no live terms**. `starterGlossary()` can seed **54** terms from `GLOSSARY_SEED`,
but it is only offered while the glossary is empty and it has never been run.

Two consequences:

- **Check the seed before you write anything.** If a term is in `GLOSSARY_SEED` and Omar
  later loads the starter set, your import collides with it.
- **You are starting a dictionary, not adding to one.** Consistency of register, length and
  tone across your batch matters more than it would if you were adding one term to an
  established set.

The 54 seed terms, by category:

```
Directional & anatomy (13): Anterior, Posterior, Superior, Inferior, Medial, Lateral,
                            Proximal, Distal, Superficial, Deep, Bilateral, Supine, Prone
Word parts (12):            -itis, -ectomy, -otomy, -ostomy, -pathy, -aemia / -emia,
                            -uria, Hyper-, Hypo-, Tachy-, Brady-, Dys-
Signs & symptoms (9):       Dyspnoea, Oedema, Syncope, Cyanosis, Pallor, Pyrexia, Malaise,
                            Lethargy, Nausea
Examination (4):            Auscultation, Palpation, Percussion, Inspection
Investigations (4):         Biopsy, Endoscopy, ECG, ABG
Common conditions (7):      Hypertension, Ischaemia, Infarction, Thrombosis, Embolism,
                            Sepsis, Hypoxia
Pharmacology (5):           Analgesic, Antipyretic, Prophylaxis, Contraindication, Indication
```

Regenerate that list, and check your batch against it, with:

```bash
node --experimental-strip-types -e "
import('./src/data/glossary.ts').then(({ GLOSSARY_SEED }) => {
  const fs = require('fs');
  const seed = new Set(GLOSSARY_SEED.map(t => t.term.toLowerCase()));
  const text = fs.readFileSync(process.argv[1],'utf8');
  const terms = [...text.matchAll(/^##\s+term\s*\n(.+)$/gim)].map(m => m[1].trim());
  const hits = terms.filter(t => seed.has(t.toLowerCase()));
  console.log('seed terms:', GLOSSARY_SEED.length);
  console.log('terms in your batch that are already in the seed:', hits.join(', ') || 'none');
});" "docs/import-ready/glossary/<your-file>.md"
```

A first draft of this manual's own worked example failed that check on ten terms —
`Auscultation, Palpation, Percussion, Anterior, Posterior, Brady-, Tachy-, -itis, Oedema,
Cyanosis`. That is how easy the collision is: those are exactly the terms a cardiovascular
glossary reaches for first. Run the check.

---

## Search first

```bash
node "Instruction Manual for Content Creation/tools/find-existing.mjs" "<the term>"
```

The tool searches live glossary terms in both languages, and pending batches. Because the
live glossary is empty, hits today will come from the seed or from another agent's pending
file — both of which still mean **do not write a second item for it**.

An existing term is updated by giving its `id`. The ID is derived from the term when
omitted: lowercased, non-alphanumerics to `-`, capped at 40 characters. So `Tachycardia`
becomes `tachycardia`, and re-importing the same term updates it in place rather than
duplicating it — which is the one piece of duplicate protection this format gives you.

---

## The seven fields

Write each one as a `## heading` inside the item's block (see the worked example below).
The **stored key** is what the code actually calls the field once it lands in `GlossaryDoc`
(`src/data/glossary.ts:20`); the **`## ` heading to write** is the text the wizard's column
mapper will auto-recognise for that key. Most of them are the same string. `defAr` is not —
write `## definition_ar`, not `## defAr`: the mapper lowercases and underscores headings
before matching, so a heading of `defAr` normalises to `defar`, which matches nothing, while
`definition_ar` is a registered alias for the real key `defAr`
(`src/pages/admin/GlossaryImportPage.tsx:82`). If you get the heading wrong the wizard still
lets you fix it by hand on the column-mapping step — it just won't auto-guess it for you.

| Stored key | `## ` heading to write | Required | Rule |
|---|---|---|---|
| `term` | `## term` | **yes** | The English term. Singular, lowercase unless it is a proper noun. |
| `ar` | `## ar` | **yes** | The reviewed Arabic term students read. Research it and write it — no separate verification step is required. |
| `category` | `## category` | **yes** | Exactly one of the seven below. Anything else rejects the row. |
| `def` | `## def` | **yes** | One plain sentence. See the register note. |
| `defAr` | `## definition_ar` | no — **write it** | The same explanation in Arabic. A term with no Arabic definition shows an **Incomplete** badge in admin. |
| `example` | `## example` | no — **write it** | How the term is used in a sentence. This is what makes a dictionary usable. |
| `id` | `## id` | no | Supply to update an existing term. Derived from `term` when omitted. |

The admin form flags a term as **Incomplete** when `term`, `ar` or `def` is missing. Aim
past that bar: fill all six content fields on every item.

### The seven categories, verbatim

Anything not on this list rejects the row with
`Row N: "X" is not a glossary category`.

| `category` value | Arabic label |
|---|---|
| `Directional & anatomy` | الاتجاهات والتشريح |
| `Word parts` | مكوّنات الكلمة |
| `Signs & symptoms` | العلامات والأعراض |
| `Examination` | الفحص السريري |
| `Investigations` | الفحوصات |
| `Common conditions` | حالات شائعة |
| `Pharmacology` | علم الأدوية |

Note the ampersands — `Directional & anatomy` and `Signs & symptoms` use `&`, not `and`.
The match is exact.

**`Word parts`** is the category authors under-use and students need most: prefixes, suffixes
and roots — `-itis`, `brady-`, `-ectomy`, `hepat-`. A student who learns twenty word parts
can decode a thousand terms. Write them as parts, with the hyphen showing where they attach.

---

## Register: this is a dictionary, not a textbook

A glossary definition is not an article summary. It is the shortest true sentence that lets
a student keep reading.

| Write this | Not this |
|---|---|
| A faster than normal heart rate. | Tachycardia is a cardiac arrhythmia characterised by a resting heart rate exceeding 100 beats per minute in adults, which may be physiological or pathological… |
| Listening to body sounds with a stethoscope. | The clinical technique of auscultation, in which the examiner applies the diaphragm or bell… |
| Inflammation. Attached to the end of an organ name. | The suffix -itis denotes an inflammatory process affecting… |

Rules of thumb:

- **One sentence.** Two only if the second is a genuine caveat.
- **No numbers unless the number is the definition.** "A faster than normal heart rate" beats
  "over 100 beats per minute", which is only true for adults at rest.
- **Do not use the word in its own definition.**
- **The Arabic definition is a translation of the English one**, at the same register — not a
  longer or more formal version. If the English is one short sentence, so is the Arabic.
- **The example is a real clinical sentence**, the way it would actually be said or written.

---

## Media

Glossary terms **cannot carry media requests** — `MEDIA_REQUEST_OWNER_KINDS` is
`article`, `question`, `practical`. If a term genuinely needs a picture, file the request on
the article that teaches the concept and name the term in the purpose line. See
[04-library-articles.md](04-library-articles.md).

In practice a glossary term that needs a diagram is usually a concept in disguise. Check
[02-concepts.md](02-concepts.md) before you reach for an image.

---

## Worked example

`docs/import-ready/glossary/GLOSSARY-CVS-001.md`

```markdown
# Item

## term
Tachycardia

## ar
تسرّع القلب

## category
Signs & symptoms

## def
A faster than normal heart rate.

## definition_ar
تسارع ضربات القلب عن المعدل الطبيعي.

## example
The patient was tachycardic at 120 beats per minute.

---

# Item

## term
Bradycardia

## ar
بطء القلب

## category
Signs & symptoms

## def
A slower than normal heart rate.

## definition_ar
تباطؤ ضربات القلب عن المعدل الطبيعي.

## example
Bradycardia is expected in a trained athlete at rest.

---

# Item

## term
Murmur

## ar
لغط

## category
Signs & symptoms

## def
An extra sound made by turbulent blood flow in the heart.

## definition_ar
صوت إضافي ناتج عن اضطراب تدفق الدم في القلب.

## example
A systolic murmur was heard at the aortic area.

---

# Item

## term
Palpitations

## ar
خفقان

## category
Signs & symptoms

## def
An awareness of your own heartbeat.

## definition_ar
الإحساس بضربات القلب.

## example
She described palpitations lasting a few minutes at a time.

---

# Item

## term
Orthopnoea

## ar
ضيق التنفس الاضطجاعي

## category
Signs & symptoms

## def
Breathlessness that comes on when lying flat.

## definition_ar
ضيق في التنفس يحدث عند الاستلقاء.

## example
He now sleeps on three pillows because of orthopnoea.

---

# Item

## term
-megaly

## ar
-ضخامة

## category
Word parts

## def
Enlargement. Attached to the end of an organ name.

## definition_ar
تضخم. تُضاف إلى نهاية اسم العضو.

## example
Cardiomegaly is enlargement of the heart.

---

# Item

## term
-pnoea

## ar
-تنفس

## category
Word parts

## def
Breathing. Attached to the end of a word describing how.

## definition_ar
تنفس. تُضاف إلى نهاية كلمة تصف كيفيته.

## example
Tachypnoea means fast breathing.

---

# Item

## term
Peri-

## ar
حول-

## category
Word parts

## def
Around. Attached to the front of a structure's name.

## definition_ar
حول. تُضاف إلى بداية اسم التركيب.

## example
The pericardium is the sac around the heart.

---

# Item

## term
Endo-

## ar
داخل-

## category
Word parts

## def
Inside. Attached to the front of a structure's name.

## definition_ar
داخل. تُضاف إلى بداية اسم التركيب.

## example
The endocardium lines the inside of the heart chambers.

---

# Item

## term
Myo-

## ar
عضل-

## category
Word parts

## def
Muscle. Attached to the front of a word.

## definition_ar
عضلة. تُضاف إلى بداية الكلمة.

## example
The myocardium is the muscle of the heart.

---

# Item

## term
Apex beat

## ar
نبضة القمة

## category
Examination

## def
The lowest and most lateral point where the heartbeat can be felt on the chest.

## definition_ar
أبعد نقطة وأدناها على الصدر يمكن الإحساس فيها بنبض القلب.

## example
The apex beat was displaced to the anterior axillary line.

---

# Item

## term
Jugular venous pressure

## ar
ضغط الوريد الوداجي

## category
Examination

## def
The height of blood in the neck vein, used to estimate pressure in the right side of the heart.

## definition_ar
ارتفاع عمود الدم في وريد الرقبة، ويُستخدم لتقدير الضغط في الجانب الأيمن من القلب.

## example
The jugular venous pressure was raised 6 cm above the sternal angle.

---

# Item

## term
Capillary refill time

## ar
زمن امتلاء الشعيرات

## category
Examination

## def
The time colour takes to return after pressing on a fingertip.

## definition_ar
الزمن الذي يستغرقه عودة اللون بعد الضغط على طرف الإصبع.

## example
Capillary refill time was prolonged at four seconds.

---

# Item

## term
Echocardiogram

## ar
تخطيط صدى القلب

## category
Investigations

## def
An ultrasound scan of the heart.

## definition_ar
فحص القلب بالموجات فوق الصوتية.

## example
The echocardiogram showed a dilated left ventricle.

---

# Item

## term
Troponin

## ar
التروبونين

## category
Investigations

## def
A protein released into the blood when heart muscle is damaged.

## definition_ar
بروتين يُطلق في الدم عند تلف عضلة القلب.

## example
The troponin rose over six hours, confirming myocardial injury.

---

# Item

## term
Angiography

## ar
تصوير الأوعية

## category
Investigations

## def
Imaging of blood vessels after injecting a contrast dye.

## definition_ar
تصوير الأوعية الدموية بعد حقن صبغة ظليلة.

## example
Coronary angiography showed a blocked right coronary artery.

---

# Item

## term
Pericardium

## ar
التامور

## category
Directional & anatomy

## def
The sac of two layers that encloses the heart.

## definition_ar
الكيس المكوّن من طبقتين الذي يحيط بالقلب.

## example
The pericardium limits how much the heart can suddenly distend.

---

# Item

## term
Antiplatelet

## ar
مضاد للصفيحات

## category
Pharmacology

## def
A drug that makes platelets less likely to clump together.

## definition_ar
دواء يقلل من تجمع الصفيحات الدموية.

## example
Aspirin is the antiplatelet given first in suspected acute coronary syndrome.

---

# Item

## term
Anticoagulant

## ar
مضاد للتخثر

## category
Pharmacology

## def
A drug that slows the formation of blood clots.

## definition_ar
دواء يبطئ تكوّن الجلطات الدموية.

## example
She was started on an anticoagulant for atrial fibrillation.

---

# Item

## term
Heart failure

## ar
قصور القلب

## category
Common conditions

## def
A condition in which the heart cannot pump enough blood for the body's needs.

## definition_ar
حالة لا يستطيع فيها القلب ضخ كمية كافية من الدم لتلبية احتياجات الجسم.

## example
His breathlessness was caused by heart failure.
```

Twenty items across six of the seven categories, every field filled, definitions at a
consistent one-sentence register, and four `Word parts` entries that unlock terms far beyond
this batch.

---

## Before you hand off

There is no CLI validator. Check these yourself:

```bash
node --experimental-strip-types -e "
import('./src/data/glossary.ts').then(({ MED_CATEGORIES }) => {
  const ok = new Set(MED_CATEGORIES.map(c => c.key));
  const fs = require('fs');
  const file = process.argv[1];
  const text = fs.readFileSync(file,'utf8');
  const items = text.split(/^\s*---\s*$/m).map(s => s.trim()).filter(Boolean);
  let n = 0;
  for (const item of items) {
    n++;
    const field = (key) => item.match(new RegExp('^##\\\\s+' + key + '\\\\s*\\\\n([\\\\s\\\\S]*?)(?=^##\\\\s+|$)', 'im'))?.[1]?.trim() ?? '';
    const cat = field('category');
    if (!ok.has(cat)) console.log('item',n,'bad category:',JSON.stringify(cat));
    for (const req of ['term','ar','def']) if (!field(req)) console.log('item',n,'missing',req);
  }
  console.log('checked', n, 'items');
});" "docs/import-ready/glossary/<your-file>.md"
```

- [ ] The file is `# Item` / `## field` blocks, same as every other kind — not a pipe table
- [ ] Every item has `## term`, `## ar`, `## category` and `## def`
- [ ] Every `category` is one of the seven, spelled exactly, `&` not `and`
- [ ] Every item also has `## definition_ar` and `## example` — not required, but a term without them is half a term
- [ ] No definition uses the term in itself
- [ ] Definitions are one sentence, and the Arabic matches the English register
- [ ] I checked `GLOSSARY_SEED` so my batch will not collide with the starter set
- [ ] I did not run `medical:batch` on this file
- [ ] No `def`, `definition_ar` or `example` contains a bare `---` line on its own — the check
  script above (and the wizard) splits records on exactly that line, so one silently ends
  the item and starts a broken second record

### The failures specific to the glossary

| Symptom | Cause |
|---|---|
| `Row N: "X" is not a glossary category` | Category not in the seven, or `and` written for `&` |
| `Row N: term is required` | Empty `term` field |
| `… matches no contract this validator knows` | You ran `medical:batch` on a glossary file. It has no branch for this kind. |
| A field lands empty in the wizard preview | Heading spelled wrong, or missing the blank line before the next `## ` |
| A term shows **Incomplete** in admin | Missing `term`, `ar` or `def` |
| Two items for one term | Different `term` spellings producing different derived IDs — check with `find-existing.mjs` first |
| Your batch collides with the starter set | You did not check `GLOSSARY_SEED` |
| An item (or everything after it) is missing or the count of items is wrong | A bare `---` line inside `def`/`definition_ar`/`example` ended the record early — strip stray horizontal rules from pasted source text |
