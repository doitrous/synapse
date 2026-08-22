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
| **Format** | **A pipe table** — not `# Item` blocks. See below. |
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

## Three ways this type is different from everything else

### 1 · It uses a pipe table, not `# Item` blocks

Every other importer in this folder reads `# Item` / `## field_key`. The glossary goes
through the generic import wizard, which reads a **markdown pipe table** — the same shape as
a spreadsheet, because a bilingual dictionary usually arrives as one.

```markdown
| term | ar | category | def | defAr | example |
| --- | --- | --- | --- | --- | --- |
| Tachycardia | تسرّع القلب | Signs & symptoms | A faster than normal heart rate. | تسارع ضربات القلب عن المعدل الطبيعي. | The patient was tachycardic at 120 beats per minute. |
```

Row 1 is the header. Row 2 is the `---` separator. Every row after that is one term. The
wizard also accepts `.csv` and `.xlsx` if that is what you have.

### 2 · None of the four validators cover it

`medical:batch`, `medical:simulate`, `medical:audit` and `medical:validate:authoring` all
have no branch for the glossary. `medical:batch` used to crash on a glossary file with a
`TypeError`; it now refuses it clearly, naming the kinds it does recognise — the same way it
handles a subjects file.

Your check is the one in this manual, plus the wizard's own preview.

### 3 · The glossary is currently empty

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
  const rows = fs.readFileSync(process.argv[1],'utf8').split(/\r?\n/).filter(l => l.startsWith('|')).slice(2);
  const hits = rows.map(r => r.split('|')[1].trim()).filter(t => seed.has(t.toLowerCase()));
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
file — both of which still mean **do not write a second row**.

An existing term is updated by giving its `id`. The ID is derived from the term when
omitted: lowercased, non-alphanumerics to `-`, capped at 40 characters. So `Tachycardia`
becomes `tachycardia`, and re-importing the same term updates it in place rather than
duplicating it — which is the one piece of duplicate protection this format gives you.

---

## The seven fields

| Column | Label | Required | Rule |
|---|---|---|---|
| `term` | Term (English) | **yes** | The English term. Singular, lowercase unless it is a proper noun. |
| `ar` | Term (Arabic) | **yes** | The reviewed Arabic term students read. Research it and write it — no separate verification step is required. |
| `category` | Category | **yes** | Exactly one of the seven below. Anything else rejects the row. |
| `def` | Definition (English) | **yes** | One plain sentence. See the register note. |
| `defAr` | Definition (Arabic) | no — **write it** | The same explanation in Arabic. A term with no Arabic definition shows an **Incomplete** badge in admin. |
| `example` | Example | no — **write it** | How the term is used in a sentence. This is what makes a dictionary usable. |
| `id` | ID | no | Supply to update an existing term. Derived from `term` when omitted. |

The admin form flags a term as **Incomplete** when `term`, `ar` or `def` is missing. Aim
past that bar: fill all six content fields on every row.

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
| term | ar | category | def | defAr | example |
| --- | --- | --- | --- | --- | --- |
| Tachycardia | تسرّع القلب | Signs & symptoms | A faster than normal heart rate. | تسارع ضربات القلب عن المعدل الطبيعي. | The patient was tachycardic at 120 beats per minute. |
| Bradycardia | بطء القلب | Signs & symptoms | A slower than normal heart rate. | تباطؤ ضربات القلب عن المعدل الطبيعي. | Bradycardia is expected in a trained athlete at rest. |
| Murmur | لغط | Signs & symptoms | An extra sound made by turbulent blood flow in the heart. | صوت إضافي ناتج عن اضطراب تدفق الدم في القلب. | A systolic murmur was heard at the aortic area. |
| Palpitations | خفقان | Signs & symptoms | An awareness of your own heartbeat. | الإحساس بضربات القلب. | She described palpitations lasting a few minutes at a time. |
| Orthopnoea | ضيق التنفس الاضطجاعي | Signs & symptoms | Breathlessness that comes on when lying flat. | ضيق في التنفس يحدث عند الاستلقاء. | He now sleeps on three pillows because of orthopnoea. |
| -megaly | -ضخامة | Word parts | Enlargement. Attached to the end of an organ name. | تضخم. تُضاف إلى نهاية اسم العضو. | Cardiomegaly is enlargement of the heart. |
| -pnoea | -تنفس | Word parts | Breathing. Attached to the end of a word describing how. | تنفس. تُضاف إلى نهاية كلمة تصف كيفيته. | Tachypnoea means fast breathing. |
| Peri- | حول- | Word parts | Around. Attached to the front of a structure's name. | حول. تُضاف إلى بداية اسم التركيب. | The pericardium is the sac around the heart. |
| Endo- | داخل- | Word parts | Inside. Attached to the front of a structure's name. | داخل. تُضاف إلى بداية اسم التركيب. | The endocardium lines the inside of the heart chambers. |
| Myo- | عضل- | Word parts | Muscle. Attached to the front of a word. | عضلة. تُضاف إلى بداية الكلمة. | The myocardium is the muscle of the heart. |
| Apex beat | نبضة القمة | Examination | The lowest and most lateral point where the heartbeat can be felt on the chest. | أبعد نقطة وأدناها على الصدر يمكن الإحساس فيها بنبض القلب. | The apex beat was displaced to the anterior axillary line. |
| Jugular venous pressure | ضغط الوريد الوداجي | Examination | The height of blood in the neck vein, used to estimate pressure in the right side of the heart. | ارتفاع عمود الدم في وريد الرقبة، ويُستخدم لتقدير الضغط في الجانب الأيمن من القلب. | The jugular venous pressure was raised 6 cm above the sternal angle. |
| Capillary refill time | زمن امتلاء الشعيرات | Examination | The time colour takes to return after pressing on a fingertip. | الزمن الذي يستغرقه عودة اللون بعد الضغط على طرف الإصبع. | Capillary refill time was prolonged at four seconds. |
| Echocardiogram | تخطيط صدى القلب | Investigations | An ultrasound scan of the heart. | فحص القلب بالموجات فوق الصوتية. | The echocardiogram showed a dilated left ventricle. |
| Troponin | التروبونين | Investigations | A protein released into the blood when heart muscle is damaged. | بروتين يُطلق في الدم عند تلف عضلة القلب. | The troponin rose over six hours, confirming myocardial injury. |
| Angiography | تصوير الأوعية | Investigations | Imaging of blood vessels after injecting a contrast dye. | تصوير الأوعية الدموية بعد حقن صبغة ظليلة. | Coronary angiography showed a blocked right coronary artery. |
| Pericardium | التامور | Directional & anatomy | The sac of two layers that encloses the heart. | الكيس المكوّن من طبقتين الذي يحيط بالقلب. | The pericardium limits how much the heart can suddenly distend. |
| Antiplatelet | مضاد للصفيحات | Pharmacology | A drug that makes platelets less likely to clump together. | دواء يقلل من تجمع الصفيحات الدموية. | Aspirin is the antiplatelet given first in suspected acute coronary syndrome. |
| Anticoagulant | مضاد للتخثر | Pharmacology | A drug that slows the formation of blood clots. | دواء يبطئ تكوّن الجلطات الدموية. | She was started on an anticoagulant for atrial fibrillation. |
| Heart failure | قصور القلب | Common conditions | A condition in which the heart cannot pump enough blood for the body's needs. | حالة لا يستطيع فيها القلب ضخ كمية كافية من الدم لتلبية احتياجات الجسم. | His breathlessness was caused by heart failure. |
```

Twenty terms across six of the seven categories, every field filled, definitions at a
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
  const rows = fs.readFileSync(file,'utf8').split(/\r?\n/).filter(l => l.trim().startsWith('|'));
  const head = rows[0].split('|').map(s=>s.trim()).filter(Boolean);
  let n = 0;
  for (const row of rows.slice(2)) {
    const cells = row.split('|').map(s=>s.trim()).slice(1,-1);
    n++;
    if (cells.length !== head.length) console.log('row',n,'has',cells.length,'cells, header has',head.length);
    const cat = cells[head.indexOf('category')];
    if (!ok.has(cat)) console.log('row',n,'bad category:',JSON.stringify(cat));
    for (const req of ['term','ar','def']) if (!cells[head.indexOf(req)]) console.log('row',n,'missing',req);
  }
  console.log('checked', n, 'rows against', head.join(', '));
});" "docs/import-ready/glossary/<your-file>.md"
```

- [ ] The file is a **pipe table**, not `# Item` blocks
- [ ] Header row, `---` separator row, then one row per term
- [ ] Every row has the same number of cells as the header
- [ ] Every `category` is one of the seven, spelled exactly, `&` not `and`
- [ ] Every row has `term`, `ar` and `def`
- [ ] Every row also has `defAr` and `example` — not required, but a term without them is half a term
- [ ] No definition uses the term in itself
- [ ] Definitions are one sentence, and the Arabic matches the English register
- [ ] I checked `GLOSSARY_SEED` so my batch will not collide with the starter set
- [ ] I did not run `medical:batch` on this file

### The failures specific to the glossary

| Symptom | Cause |
|---|---|
| `Row N: "X" is not a glossary category` | Category not in the seven, or `and` written for `&` |
| `Row N: term is required` | Empty `term` cell |
| `… matches no contract this validator knows` | You ran `medical:batch` on a glossary file. It has no branch for this kind. |
| Cells land in the wrong columns | A `\|` inside a definition, or a row with the wrong cell count |
| A term shows **Incomplete** in admin | Missing `term`, `ar` or `def` |
| Two rows for one term | Different `term` spellings producing different derived IDs — check with `find-existing.mjs` first |
| Your batch collides with the starter set | You did not check `GLOSSARY_SEED` |
