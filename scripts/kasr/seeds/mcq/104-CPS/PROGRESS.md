# 104 CPS MCQ authoring — progress

Branch: `kasr-104-author-run23` (off `kasr-104-author-run22`, local-only —
origin never had run22). Latest pushed SHA: `58d39e81`.

Bank total: 1289 questions in `scripts/kasr/extract/104-CPS/mcq-bank.json`.
As of `58d39e81`: **288 kept / 1114 keyed**, 44 excluded, 68 MCQ concepts.

## Clusters fully closed (0 remaining bank rows for that `leaf` tag)

- Cardiac Function (38/38 triaged: 20 kept, 18 excluded) — commit `c7186aa6`.
  Spans `physiology-cardiac-function.ts`, `physiology-cardiac-output-
  formula.ts`, and re-routed rows in `physiology-circulatory-control-
  hemorrhagic-shock.ts` (venous return / AV shunt / athlete's heart / shock
  rows were mistagged "Cardiac Function" in the bank but belong under
  Basic Mechanisms of Circulatory Control).
- Organization of the Respiratory System (9/9 triaged: 6 kept, 3 excluded)
  — commit `58d39e81`. New file `physiology-dead-space-and-alveolar-
  ventilation.ts`; additions to `physiology-pleural-mechanics.ts` and
  `physiology-intrapleural-pressure-extremes.ts`.

## How to recompute "what's left" (do this first, don't trust stale counts)

```
node -e "
const fs=require('fs'), path=require('path');
const dir='scripts/kasr/seeds/mcq/104-CPS';
const used=new Set();
for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.ts'))){
  const c=fs.readFileSync(path.join(dir,f),'utf8');
  const re=/(?:^|[^a-zA-Z])key:\s*[\"']([^\"']+)[\"']/g; let m;
  while((m=re.exec(c))) used.add(m[1]);
}
const bank=JSON.parse(fs.readFileSync('scripts/kasr/extract/104-CPS/mcq-bank.json','utf8'));
const remaining=bank.questions.filter(q=>!used.has(q.key));
const byLeaf={};
for(const q of remaining) byLeaf[q.leaf||'(none)']=(byLeaf[q.leaf||'(none)']||0)+1;
Object.entries(byLeaf).sort((a,b)=>b[1]-a[1]).forEach(([l,c])=>console.log(c,l));
"
```
As of `58d39e81`: 58 Arteries, 54 A-V Connections, 47 Electrical Activity
of the Heart, 36 Mechanical Properties of Cardiac Muscle, 35 Vascular
Function, 34 Veins, 30 Respiratory Portion, 30 Pulmonary Compliance, 26
Spleen, 24 Gas Transport by the Blood, 21 Lymph node, 19 Conducting
Portion, 18 Basic Mechanisms of Circulatory Control, 17 Tonsils, 15
Control of Respiration, 13 Chromosomal Aberrations, 13 The heart, 1 each
of Human Chromosome / Thymus / Special Circulation / Alveolar Phagocytes.
(456 rows have `leaf:"(none)"` in the bank — topic-only, lower priority.)

## Next action (resume-first)

Pick "Lungs" per the dispatch brief — best next targets, in order:
1. **Pulmonary Compliance** (30 remaining) — no seed file exists yet for
   this leaf; will need a new file + likely a new article (surfactant,
   compliance curves, Laplace's law). Check `docs/Kasr-Source-Imports/
   article/104-CPS-physiology.md` for an existing compliance article
   before minting a new `articleId`.
2. **Respiratory Portion** (30 remaining, histology) — check
   `respiratory-respiratory-portion.ts` for existing concepts to reuse.
3. **Control of Respiration** (15 remaining) — `physiology-control-of-
   respiration.ts` already exists with 1 concept; extend it.
4. Gas exchange in the lung (7 remaining) — the dispatch brief flags this
   one needs a NEW physiology concept file + article scaffold before its
   questions gate; do this last, deliberately, not as a quick add-on.

Then move to the CVS histology/anatomy leaves (Arteries 58, A-V
Connections 54, Veins 34, Electrical Activity of the Heart 47,
Mechanical Properties of Cardiac Muscle 36, Vascular Function 35) — all
big, none started as dedicated files yet as of this checkpoint (check
`cardiovascular-*.ts` files first, they may already own some of these).

## Hazards hit and confirmed this session (beyond the dispatch brief)

- **`medical:simulate` has no `--with` flag.** Unlike `medical:batch`,
  passing `--with X` to `simulate-content-import.mjs` silently drops `X`
  from the files it loads (its arg parser excludes anything immediately
  after any `--flag`). Pass every file — concepts, mcq-concepts, articles,
  then the question file — as **plain positional arguments**, concepts/
  articles before the question file that references them.
- **A literal leading "+" in an extracted option's text breaks import.**
  `medical:batch` flags it directly: `answer_X starts with "+", but this
  column does not take an append — the record keeps a value nothing will
  ever match`. Not fixable from the seed (no stem/option override field
  exists) — exclude the question. Hit twice on the same source page in
  the Organization-of-Respiratory-System cluster (`+4 mm Hg` / `+6 mm Hg`
  distractors on an intrapleural-pressure question and its corrupted-stem
  sibling).
- The `leaf` field in the bank is unreliable for routing, not just
  occasionally: 12 of Cardiac Function's 38 remaining rows (venous
  return, AV shunt, athlete's heart, exercise circulation, hemorrhagic
  shock) were genuinely Basic-Mechanisms-of-Circulatory-Control content
  mistagged. Always read the stem before trusting the bank's `leaf` tag.
