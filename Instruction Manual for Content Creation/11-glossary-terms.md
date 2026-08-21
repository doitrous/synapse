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
| **Format** | **`# Item` blocks**, the same as every other importer. A `.csv` or `.xlsx` also works. **A pipe table does not** — see below. |
| **Fields** | 7 |
| **Live today** | The glossary is **empty**. 297 terms are pending in `docs/import-ready/glossary/`; nothing has been imported. |

---

## Three ways this type is different from everything else

### 1 · The wizard shows you a pipe table it cannot read

Open the import page and the "Columns & format" panel prints a **markdown pipe table** as its
worked example. Upload one and you get:

```
No header row and data rows were detected in this file.
```

`parseMarkdown` in [`../src/components/admin/ImportWizard.tsx`](../src/components/admin/ImportWizard.tsx)
(line 62) splits on `---` lines and matches `## key` blocks. It has no table branch at all: a
pipe table produces zero headers, the loader rejects the file, and you never reach the mapping
step. The example on screen is wrong, and so was this manual until 2026-08-17.

**Write `# Item` blocks**, exactly as [00-START-HERE.md §2](00-START-HERE.md) describes them:

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

## id
tachycardia

---

# Item
…
```

`.csv` and `.xlsx` are read properly and are a reasonable choice if the dictionary already
exists as a spreadsheet — one header row, one row per term. Only markdown is special.

### 2 · Check the mapping screen before you continue

The wizard normalises every column name to `lowercase_with_underscores` before it guesses the
mapping. Anything it cannot place lands on **Ignore this column**, and that column then
imports blank without ever raising an error — which is how an Arabic definition goes missing
from a batch that reported a clean import.

These seven keys auto-map, and nothing else does:

```
term · ar · category · def · definition_ar · example · id
```

`defAr`, `def_ar`, `english`, `word`, `arabic`, `definition`, `meaning` and `group` are
accepted aliases too — `defAr` only since 2026-08-17, when it was added to the alias map; it
had been the one key the import page advertised and could not read. Whatever you write, the
mapping screen shows each source column, the first value in it, and where it is going. Read it.

### 3 · None of the four validators cover it

`medical:batch`, `medical:simulate`, `medical:audit` and `medical:validate:authoring` all have
no branch for the glossary. Running `medical:batch` on a glossary file crashes with a
`TypeError`, the same way a subjects file does.

Use the checker that lives beside the batches instead. It mirrors the wizard's parser, its
column mapping and its row validation, and it fails on a missing field, a category typo, a
duplicate ID, and a definition that uses its own term:

```bash
node docs/import-ready/glossary/check-glossary.mjs docs/import-ready/glossary/*.md
```

```
docs/import-ready/glossary/GLOSSARY-WORD-PARTS-001.md: 65 rows, 7 columns → clean
…
total ids: 297 | total problems: 0
```

A file that reports `0 columns` is the pipe-table mistake. A column listed as *not
auto-mapped* will import blank unless you map it by hand.

---

## The starter set, and how not to collide with it

`GLOSSARY_SEED` in `src/data/glossary.ts` holds **54** terms. `starterGlossary()` writes them
in one click, but it is offered **only while the glossary is empty** and it has never been run.

So both orders have to be safe, and the ID is what makes them safe. An ID you do not supply is
derived from the term — lowercased, non-alphanumerics to `-`, capped at 40 characters — so
`Tachycardia` becomes `tachycardia`. **A row whose ID matches an existing term updates it in
place.** That is the only duplicate protection this format gives you, and it is enough:

- **To extend a seed term, reuse its seed ID.** `docs/import-ready/glossary/` does this
  fourteen times — `pyrexia` becomes `Fever · pyrexia · febrile · afebrile` under the same ID,
  so it updates the seed row if the starter set was loaded and is simply created if it was not.
- **Otherwise, do not repeat a seed term under a different ID.** That is the collision that
  produces two cards for one word.

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

Check a finished batch against that list, both ways round:

```bash
node --experimental-strip-types -e "
import(new URL('src/data/glossary.ts','file://'+process.cwd()+'/').href).then(({ GLOSSARY_SEED }) => {
  const fs = require('fs'), path = process.argv[1];
  const byId = new Map(GLOSSARY_SEED.map(t => [t.id, t.term]));
  const byTerm = new Map(GLOSSARY_SEED.map(t => [t.term.toLowerCase(), t.id]));
  const slug = v => v.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+\$/g,'').slice(0,40);
  for (const rec of fs.readFileSync(path,'utf8').split(/^\s*---\s*\$/m)) {
    const get = k => rec.match(new RegExp('^## '+k+'\\\\s*\\\\n([\\\\s\\\\S]*?)(?=\\\\n##|\$)','m'))?.[1].trim();
    const term = get('term'); if (!term) continue;
    const id = get('id') || slug(term);
    if (byId.has(id)) console.log('updates seed row', id, '(' + byId.get(id) + ')');
    for (const piece of term.split('·').map(s => s.trim().toLowerCase()))
      if (byTerm.has(piece) && byTerm.get(piece) !== id)
        console.log('COLLISION:', piece, 'is seed', byTerm.get(piece), 'but your row id is', id);
  }
});" "docs/import-ready/glossary/<your-file>.md"
```

---

## Search first

```bash
node "Instruction Manual for Content Creation/tools/find-existing.mjs" "<the term>"
```

The tool searches live glossary terms in both languages, and pending batches — it reads
`## term` blocks, which is another reason to use the block format. Because the live glossary is
empty, hits today come from the seed or from a pending file. Both still mean **do not write a
second row**.

---

## The seven fields

| Key | Label | Required | Rule |
|---|---|---|---|
| `term` | Term (English) | **yes** | The English term. Singular, lowercase unless it is a proper noun. |
| `ar` | Term (Arabic) | **yes** | The reviewed Arabic term students read. Research it and write it — no separate verification step is required. |
| `category` | Category | **yes** | Exactly one of the seven below. Anything else rejects the row. |
| `def` | Definition (English) | **yes** | One plain sentence. See the register note. |
| `definition_ar` | Definition (Arabic) | no — **write it** | The same explanation in Arabic. A term with no Arabic definition shows an **Incomplete** badge in admin. |
| `example` | Example | no — **write it** | How the term is used in a sentence. This is what makes a dictionary usable. |
| `id` | ID | no | Supply to update an existing term. Derived from `term` when omitted. |

The import rejects a row that has no `term`, no `def`, or a category outside the seven. The
admin form additionally flags a term as **Incomplete** when `term`, `ar` or `def` is missing.
Aim past both bars: fill all six content fields on every row.

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
and roots — `-itis`, `brady-`, `-ectomy`, `hepat-`. A student who learns twenty word parts can
decode a thousand terms. Write them as parts, with the hyphen showing where they attach.

There is no category for treatment that is not a drug. Talking therapies, prophylaxis,
indication and contraindication all sit in `Pharmacology`, which the seed already treats as the
treatment bucket.

---

## One word family, one item

A word and its own endings and beginnings are **one term**, never several. `psychology`,
`psychiatry`, `psychologist`, `psychiatrist`, `psychotherapy` and `psychoanalysis` are a single
row, not six.

Write the family into the `term` and `ar` cells, separated by ` · `, headword first, and let
the definition say what each ending does:

```markdown
## term
Psych- · psychology · psychiatry · psychologist · psychiatrist · psychotherapy · psychoanalysis

## ar
نفسي · علم النفس · الطب النفسي · عالِم نفس · طبيب نفسي · العلاج النفسي · التحليل النفسي

## def
Mind. Add -ology for its study, -iatry for the branch of medicine, -ologist for the
non-medical specialist, -iatrist for the doctor, and -otherapy for treatment by talking.
```

The student page splits that cell on ` · `: the headword is the card title in both languages
and the rest render as variant chips underneath. Student search covers `term`, `ar`, `def` and
`defAr`, so `psychiatrist` finds the card even though it is not the headword.

Two rules follow:

- **No English word form may appear in two items.** A compound built from two parts goes to the
  one that teaches it best — `nephritis` with `Nephr(o)-`, `gastritis` with `-itis` — and the
  other row picks a different example. Check with:

  ```bash
  node -e "
  const {readFileSync,readdirSync}=require('fs'), dir='docs/import-ready/glossary', seen=new Map();
  for (const f of readdirSync(dir).filter(n=>n.endsWith('.md')&&n!=='INDEX.md'))
    for (const rec of readFileSync(dir+'/'+f,'utf8').split(/^\s*---\s*\$/m)) {
      const m=rec.match(/^## term\s*\n(.+)\$/m); if(!m) continue;
      for (const p of m[1].split('·').map(s=>s.trim().toLowerCase()))
        seen.set(p,[...(seen.get(p)??[]),f]);
    }
  for (const [p,w] of seen) if (w.length>1) console.log('repeated:',p,w.join(', '));"
  ```

- **Keep the headword first.** It is what the card is titled with and what the ID is derived
  from when you do not supply one.

---

## Register: this is a dictionary, not a textbook

A glossary definition is not an article summary. It is the shortest true sentence that lets a
student keep reading.

| Write this | Not this |
|---|---|
| A faster than normal heart rate. | Tachycardia is a cardiac arrhythmia characterised by a resting heart rate exceeding 100 beats per minute in adults, which may be physiological or pathological… |
| Listening to body sounds with a stethoscope. | The clinical technique of auscultation, in which the examiner applies the diaphragm or bell… |
| Inflammation of the organ named before it. | The suffix -itis denotes an inflammatory process affecting… |

Rules of thumb:

- **One sentence.** Two only if the second is a genuine caveat, or if the row is a family and
  the second clause is what each ending means.
- **No numbers unless the number is the definition.** "A faster than normal heart rate" beats
  "over 100 beats per minute", which is only true for adults at rest.
- **Do not use the word in its own definition.** Naming an affix as an affix (`dent- comes from
  Latin`) is not the same thing and is fine.
- **The Arabic definition is a translation of the English one**, at the same register — not a
  longer or more formal version. If the English is one short sentence, so is the Arabic.
- **The example is a real clinical sentence**, the way it would actually be said or written.

---

## Media

Glossary terms **cannot carry media requests** — `MEDIA_REQUEST_OWNER_KINDS` is `article`,
`question`, `practical`. If a term genuinely needs a picture, file the request on the article
that teaches the concept and name the term in the purpose line. See
[04-library-articles.md](04-library-articles.md).

In practice a glossary term that needs a diagram is usually a concept in disguise. Check
[02-concepts.md](02-concepts.md) before you reach for an image.

---

## Worked example

`docs/import-ready/glossary/GLOSSARY-CVS-001.md`

```markdown
# Item

## term
Murmur

## ar
لغط (نفخة قلبية)

## category
Signs & symptoms

## def
An extra sound made by turbulent blood flow in the heart.

## definition_ar
صوت إضافي ناتج عن اضطراب تدفق الدم في القلب.

## example
A systolic murmur was heard at the aortic area.

## id
murmur

---

# Item

## term
Peri- · pericardium · perianal · periorbital

## ar
حول- · التامور · حول الشرج · حول العين

## category
Word parts

## def
Around. Attached to the front of the structure it surrounds.

## definition_ar
حول. تُضاف إلى بداية اسم التركيب الذي تحيط به.

## example
The pericardium is the sac around the heart.

## id
p-peri

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

## id
troponin
```

The five files already in `docs/import-ready/glossary/` are the long version of this, and
`INDEX.md` there records what each one covers.

---

## Before you hand off

```bash
node docs/import-ready/glossary/check-glossary.mjs docs/import-ready/glossary/<your-file>.md
```

- [ ] The file is **`# Item` blocks**, not a pipe table
- [ ] Every record has `term`, `ar`, `category`, `def`, `definition_ar`, `example`
- [ ] Every column is mapped on the mapping screen — nothing sitting on **Ignore this column**
- [ ] Every `category` is one of the seven, spelled exactly, `&` not `and`
- [ ] No definition uses the term in itself
- [ ] Definitions are one sentence, and the Arabic matches the English register
- [ ] A word family is one record, headword first, and no word form appears in two records
- [ ] I checked `GLOSSARY_SEED` both ways: deliberate extensions reuse the seed ID, and nothing
      else repeats a seed term
- [ ] I did not run `medical:batch` on this file

### The failures specific to the glossary

| Symptom | Cause |
|---|---|
| `No header row and data rows were detected in this file.` | You uploaded a pipe table. The wizard only reads `# Item` / `## key` markdown. |
| A column sits on **Ignore this column** in the mapping step | The key does not normalise to one of the seven or their aliases |
| The Arabic definition is missing after a clean import | Same cause — the column was ignored and you continued past the mapping screen |
| `Row N: "X" is not a glossary category` | Category not in the seven, or `and` written for `&` |
| `Row N: term is required` | Empty `term` block |
| `TypeError: Cannot read properties of undefined (reading 'map')` | You ran `medical:batch` on a glossary file. It has no branch for this kind. |
| A term shows **Incomplete** in admin | Missing `term`, `ar` or `def` |
| Two cards for one word | Different spellings producing different derived IDs, or a family split across rows — check with `find-existing.mjs` and the repeated-form script above |
| Your batch collides with the starter set | You repeated a seed term under a new ID instead of reusing the seed's |
