# AU-MED-102 · Embryology — question-led triage

Lane W1-102-EMBR. Module `AU-MED-102` (`MED 102 - Foundation of Basic Medical Sciences &
Medical Terminology`), department `Embryology`, year `AU_Y1`. GUARD = paper (5 files in
`Exams`, all mixed-subject papers that examine every department of this module; the
Embryology department itself has 12 distinct teaching files and no bank of its own). Step 1
only — no concepts, articles or questions authored below. Ends at the LANE-BRIEF §8
checkpoint.

## Counts

| questions surveyed (distinct content) | Embryology-taught (distinct) | keyed | unkeyed | distinct concepts tested | hit-live | hit-pending | new |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 232 (60 + 112 + 60, three distinct papers, two of which each recur across two stream/cohort files) | 26 | 19 | 7 | 18 | 2 | 12 | 4 |

Of 232 distinct exam questions across the module's three paper contents, **26 are
Embryology-taught**; the rest are Anatomy, Histology, Biochemistry or Physiology, owned by
other lanes. Every row below traces to a specific question; nothing is authored from the
department book alone.

## Sources read

All 5 `Exams` rows for `AU-MED-102` are covered — this is the module's entire paper/bank set
(no separate `General` department rows exist for this module; the manifest files all 5 under
`departmentFolder: "Exams"`). Page text came from the tooling lane's pre-extraction
(`scripts/alexandria/pagetext/<sourceId>.json`); I ran no OCR myself on any of these five.

| sourceId | file | category | mode | key status found |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | `Exams/EOM - End foundation 2030.pdf` | End of Module paper | native, 12p | **answer block** after each subject's 4–7-question section; Embryology section (6 Q) on p11, answers p12 |
| `src_7d031a45baeadc973a00` | `Exams/EOM - end foundation  مصريين 222 1.pdf` | Department Questions | native, 11p | **answer block**, same layout as above; Embryology section (6 Q) spans p10–11 |
| `src_3bf4527b51de57464e14` | `Exams/EOM - Final foundation 2030.pdf` | End of Module paper | native, 24p | **answer block**, single table on the last page (p24) for all 112 continuously-numbered Qs |
| `src_413115a28d7dc9914c91` | `Exams/EOM - Foundation Final Egyptian.pdf` | Department Questions | native, 24p | **answer block**, identical layout to the above |
| `src_29f02a5a4d6a273dea76` | `Exams/EOM - End Foundation wafdeen-1.pdf` | Department Questions | native, 15p | **none** — no separate answer file exists for this module; checked p1 and p8 at 150 dpi for highlight/pen marks or `/Stamp`/`/Highlight` annotation objects (`strings <file> | grep -oE "/Subtype/(Highlight|Square|Stamp)"`) — zero hits on this file. Recorded unkeyed, not guessed |

**Content-duplicate pairs found by reading, not flagged by the manifest.** Two pairs of these
five files are the *same exam content* (same questions, same wording, same printed answer
key) delivered to two different streams/cohorts under different filenames and different
sha256 (so the manifest's twin machinery, which only catches literal `[from Alexandria
University Updated]` filename pairs, does not link them):

- `src_8d6ddf874f8984be8217` ("2030" cohort tag) and `src_7d031a45baeadc973a00` (`egyptian`
  streamSignal) are the same 60-question, per-subject-block paper — question order in the
  Biochemistry section differs by a few positions but every question and every answer is
  identical.
- `src_3bf4527b51de57464e14` ("2030" cohort tag) and `src_413115a28d7dc9914c91` (filename
  says "Egyptian", but `streamSignal` is `null` in the manifest for this row — see Hazards)
  are byte-for-byte identical in extracted text: same 112 questions in the same order, same
  answer table, including the examiner's own unresolved `64. XXX`.

I cite one of each pair as primary below and note its twin; both remain listed in Sources
read because a citation must name the file actually read (manifest README: "cite the one you
read").

**Department files read** (Embryology, all 12; extracted myself via
`scripts/alexandria/extract/pagetext.py --module AU-MED-102 --department Embryology`, since
these are lecture slides, not a shared paper, and so were mine to run): all are PDFs exported
from PowerPoint by Dr. Ayman Khanfour, image-heavy with sparse extractable text (labelled
diagrams). `pagetext.py`'s twin handling correctly skipped all 12 non-preferred `[from
Alexandria University Updated]` twins and extracted only the 12 preferred (native-text)
copies:

| # | file (preferred twin) | sourceId |
|---|---|---|
| 1 | `1- Reprodactive Organs.pdf` | `src_3e85774aeb43209e9955` |
| 2 | `2- Fertilization.pdf` | `src_739d5b3fd7396bda429a` |
| 4 | `4- Implantation & deciua.pdf` | `src_5e0004594ba8a7bef7d1` |
| 5 | `5- second week development.pdf` | `src_600a7ea2b0ba931ff54e` |
| 6 | `6- Chorion.pdf` | `src_d18164f2ee9370dae09e` |
| 7 | `7- Third Week of Development.pdf` | `src_c91adf618096ec2bd7d1` |
| 8 | `8- Third to Eight weeks.pdf` | `src_fd43a7320f87125af0be` |
| 9 | `9- Folding.pdf` | `src_c3c09586a6855126b8dc` |
| 10 | `10- Amnion.pdf` | `src_cd8ddd26802d4a679c55` |
| 11 | `11- Yolk sac & Allantois.pdf` | `src_a3420c64b5a184d4e0ca` |
| 12 | `12- Umbilical cord.pdf` | `src_1703b9d26f7e4dc17c2a` |
| 13 | `13- Placenta.pdf` | `src_ddb37055557042e892dc` |

There is no file numbered "3" — the department's own numbering has this gap; 12 files, not
13, and the dispatch note ("12 distinct teaching files, no bank of its own") is confirmed
exactly against the manifest (24 Embryology rows ÷ 2 twins each = 12).

## Questions this department teaches, grouped by department-book chapter

Chapter order follows the lecture numbering above. "Egyptian" and "2030" duplicate-file
citations are folded together per the finding above; I give the primary sourceId and name
its twin once per row group rather than doubling every row.

### 1 · Reproductive Organs (male and female genital anatomy)

No exam question in any of the five papers tests this chapter's content directly (it is
anatomical background for what follows — testis/ovary/uterus/fallopian-tube parts and
functions). Per the scope test (LANE-BRIEF §10), this chapter is **not in scope** unless a
question surfaces for it later; nothing to author from it now.

### 2 · Fertilization

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p17 | What is meant by capacitation? (Q80) | keyed (a — removal of glycoprotein coat of sperm) | cohort 2030 / Egyptian |

### 4 · Implantation & decidua

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p6 | Function of the zona pellucida (Q22) — wording matches this lecture's own slide verbatim, not the Fertilization lecture's | **unkeyed** | stream: wafdeen (filename) |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p19 | Which form of ectopic pregnancy is shown in the diagram? (Q89) | keyed (a — tubal pregnancy) — **diagram question** | cohort 2030 / Egyptian |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p21 | Site of normal implantation of the blastocyst (Q102) | keyed (a — upper segment of uterus) | cohort 2030 / Egyptian |

### 5 · Second week development

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` (twin `src_7d031a45baeadc973a00`) | p11 (p10 on the twin) | The part that gives rise to the embryo (Q1, Embryology section) | keyed (a — inner cell mass) | cohort 2030 / Egyptian |
| `src_8d6ddf874f8984be8217` (twin `src_7d031a45baeadc973a00`) | p11 (p10 on the twin) | The amniotic cavity arises from… (Q2, Embryology section) | keyed (b — epiblast) | cohort 2030 / Egyptian |

### 6 · Chorion

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p17 | Structure of tertiary chorionic villi (Q81) | keyed (c — cytotrophoblast, syncytiotrophoblast, extraembryonic mesoderm, umbilical blood vessels) | cohort 2030 / Egyptian |

### 7 · Third week of development

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p9 | Remnant of the notochord in the adult (Q34) | **unkeyed** | stream: wafdeen |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p18 | Embryonic origin of a sacrococcygeal mass found after delivery (Q87) | keyed (a — primitive streak) | cohort 2030 / Egyptian |

### 9 · Folding

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p19 | Structure found most cranially before folding (Q88) | keyed (c — septum transversum) | cohort 2030 / Egyptian |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p19 | Cephalocaudal folding occurs due to rapid growth of the… (Q90) | keyed (a — central nervous system) | cohort 2030 / Egyptian |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p21 | Process converting the trilaminar disc into a cylindrical form (Q101) | keyed (b — folding) | cohort 2030 / Egyptian |

### 10 · Amnion

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p9 | Which cells form the roof of the amniotic cavity? (Q35) | **unkeyed** | stream: wafdeen |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p18 | Volume of amniotic fluid in oligohydramnios (Q84) | keyed (b — less than 400 mL) | cohort 2030 / Egyptian |

### 11 · Yolk sac & Allantois

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p11 | Final fate of the yolk stalk (Q44) — distractors deliberately include the allantois's own fate ("median umbilical ligament") to test the two structures are not confused | **unkeyed** | stream: wafdeen |
| `src_8d6ddf874f8984be8217` (twin `src_7d031a45baeadc973a00`) | p11 | What does the intraembryonic yolk sac form? (Q5, Embryology section) | keyed (b — gut tube) | cohort 2030 / Egyptian |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p18 | Last fate of the allantois (Q85) | keyed (b — median umbilical ligament) | cohort 2030 / Egyptian |

### 12 · Umbilical cord

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p12 | Congenital anomaly suggested by antepartum haemorrhage + uterine inversion after birth (Q50) | **unkeyed** | stream: wafdeen |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p18 | Nature of the discharge from a urachal fistula (Q83) | keyed (a — urine) | cohort 2030 / Egyptian |

### 13 · Placenta

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p8 | Cause of antepartum haemorrhage (Q33) | **unkeyed** | stream: wafdeen |
| `src_29f02a5a4d6a273dea76` | p11 | Excessive chorionic villi penetrating the myometrium on ultrasound at 36 weeks (Q45) | **unkeyed** | stream: wafdeen |
| `src_8d6ddf874f8984be8217` (twin `src_7d031a45baeadc973a00`) | p11 | Retained placental fragment causing PPH after normal delivery (Q3, Embryology section) | keyed (d — accessory/succenturiate placenta) | cohort 2030 / Egyptian |
| `src_8d6ddf874f8984be8217` (twin `src_7d031a45baeadc973a00`) | p11 | Severe haemorrhage on attempted manual separation of the placenta (Q4, Embryology section) | keyed (b — placenta accreta) | cohort 2030 / Egyptian |
| `src_8d6ddf874f8984be8217` (twin `src_7d031a45baeadc973a00`) | p11 | Ultrasound finding of something covering the internal os (Q6, Embryology section) | keyed (a — placenta previa) | cohort 2030 / Egyptian |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p2 | Definition of placenta accreta (Q8) | keyed (a — see Hazards: this key looks medically questionable) | cohort 2030 / Egyptian |
| `src_3bf4527b51de57464e14` (twin `src_413115a28d7dc9914c91`) | p17 | Function of the yolk sac (Q82) | keyed (b — "forming the mucosa of the respiratory system") — see Hazards, options look mismatched to the structure | cohort 2030 / Egyptian |

**8 · Third to eight weeks** has no exam question that tests it distinctly from the chapters
above (its own content is germ-layer-derivative lists — ectoderm/mesoderm/endoderm — that the
folding- and notochord-related questions already draw on). Nothing to add from it under the
scope test; flagged in OWED in case a Physiology/Anatomy-side question later reaches into it.

## Ordered list of distinct ideas tested → concept candidates

Key search run per idea: `find-existing.mjs` with the queries listed, plus
`grep -ril "<term>" docs/*-Source-Imports/concept/`. Almost everything below is already
covered by Kasr's unimported `101-ISK` (Y1 introductory module) concept batch — expected,
since Alexandria's Foundation module teaches the same syllabus.

| # | Idea (as tested) | Search terms used | Classification | Evidence |
|---|---|---|---|---|
| 1 | Embryoblast (inner cell mass) gives rise to the embryo proper | inner cell mass; embryoblast; blastocyst | **HIT-PENDING** | `101-ISK-mcq-concepts.md`: "The blastocyst is a trophoblast wall around a blastocele with the embryoblast at one pole…"; "Embryoblast" alias |
| 2 | Amniotic cavity forms from the epiblast | epiblast; amniotic cavity | **HIT-PENDING** | `101-ISK-mcq-concepts.md`: "The embryoblast splits into epiblast and hypoblast, and the cavity that opens above the epiblast is roofed by amnioblast" — same fact. (Adjacent but distinct: **live** `CON-DEV-D710466361F978` "Amniotic cavity surrounds embryo" and `CON-DEV-B385E05FE858C2` "Amniotic expansion causes folding" are a different grain — post-folding topology and a folding mechanism, not the cavity's origin — so filed here as pending, not live) |
| 3 | Function of the zona pellucida (blocks polyspermy; prevents blastomere adhesion to tubal mucosa) | zona pellucida | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "Zona pellucida" alias, cleavage-in-zona-pellucida concept; live `CON-GYN-E908EB053BC204`/`CON-GYN-0A37F80C809059` are corona-radiata/follicle-rupture concepts, a different idea (structure around the ovum, not the membrane's own function) |
| 4 | Sperm capacitation (removal of glycoprotein/seminal-plasma coat) | capacitation; acrosome reaction; glycoprotein coat | **NEW, tentative** — only an article alias (`101-ISK-anatomy.md`) and a question title (`101-ISK-mcq.md` "Sperm capacitation is") surfaced, no dedicated pending **concept** record found on 4 queries; check `101-ISK-concepts.md`/`101-ISK-mcq-concepts.md` directly in Step 2 before minting | none at concept level |
| 5 | Normal site and timing of implantation (fundus, upper segment, day 6–11) | implantation | **HIT-PENDING** | `101-ISK-concepts.md`, `101-ISK-mcq-concepts.md` both carry implantation concepts |
| 6 | Ectopic pregnancy — abnormal implantation sites (tubal, ovarian, abdominal, cervical) | ectopic pregnancy; tubal pregnancy | **HIT-PENDING** | `101-ISK-anatomy.md`, `101-ISK-concepts.md`, `101-ISK-mcq-concepts.md` all alias "Ectopic pregnancy" |
| 7 | Structure of tertiary chorionic villi (cyto- + syncytiotrophoblast + extraembryonic mesoderm + fetal vessels) | chorionic villi; tertiary villi | **HIT-PENDING** | `101-ISK-anatomy.md` "Primary secondary and tertiary villi"; `101-ISK-concepts.md`/`101-ISK-mcq-concepts.md` alias "chorionic villi" |
| 8 | Notochord forms and ends as the nucleus pulposus | notochord; nucleus pulposus | **HIT-PENDING** | `101-ISK-concepts.md`/`101-ISK-mcq-concepts.md`: "The notochord forms in four steps, guides the embryo, and ends as the nucleus pulposus" — exact match |
| 9 | Primitive streak — first appearance and its adult remnant (sacrococcygeal teratoma) | primitive streak; sacrococcygeal teratoma | **HIT-PENDING** for the streak itself (`101-ISK-mcq-concepts.md` alias, MCQ on its timing); **NEW** for the specific sacrococcygeal-teratoma-as-remnant fact — no hit on that exact idea across 2 queries | mixed, see evidence |
| 10 | Folding: what is most cranial before it happens (septum transversum), what drives cephalocaudal folding (CNS overgrowth), and folding as the disc→cylinder conversion | folding; septum transversum; cephalocaudal folding | **NEW** — adjacent live concept `CON-DEV-B385E05FE858C2` "Amniotic expansion causes folding" is a *different causal claim* (lateral folding by amniotic-sac expansion vs. this exam's cephalocaudal folding by neural-tube/CNS overgrowth); no hit at all for "septum transversum" on any query | flag for Step 2: complementary mechanism, not a duplicate — confirm before deciding update vs. new |
| 11 | Intraembryonic yolk sac forms the gut tube | yolk sac; vitelline duct | **HIT-PENDING** | `101-ISK-mcq-concepts.md`: "…the vitelline duct is what connects the definitive sac to the midgut" |
| 12 | Yolk stalk obliterates completely; do not confuse its fate with the allantois's | yolk stalk; vitelline duct | **HIT-PENDING** | same `101-ISK-mcq-concepts.md` vitelline-duct record as #11 |
| 13 | Allantois's fate is the median umbilical ligament | allantois; median umbilical ligament | **HIT-LIVE** | `CON-REN-CB7041F0D25574` "Extent of the median umbilical ligament" — filed under `renal`/anatomical extent, not this embryological origin claim; Step 2 must decide sparse update (add the developmental fact) vs. a distinct `dev`-subject concept per the one-label-one-home tiebreaker |
| 14 | Oligohydramnios — amniotic fluid volume under 400 mL | oligohydramnios; amniotic fluid volume | **NEW, tentative** — only an article alias (`101-ISK-anatomy.md` "Oligohydramnios") surfaced, no concept record on 2 queries | none at concept level |
| 15 | Urachal fistula discharges urine (urachus = obliterated allantois) | urachus; urachal | **NEW** | zero hits on both queries, live or pending |
| 16 | Umbilical cord anomaly (long cord) linked to antepartum haemorrhage / cord accident | umbilical cord | **HIT-PENDING**, general — `101-ISK-concepts.md`/`101-ISK-mcq-concepts.md`/`101-ISK-practical-concepts.md` all carry umbilical-cord concepts; no query surfaced the specific "long cord as anomaly" fact, so Step 2 must check whether an update or a new sub-concept is needed | umbilical cord (general) pending; long-cord specific unconfirmed |
| 17 | Placental attachment disorders: previa (covers os), accreta (adherent to myometrium), percreta (invades through myometrium) | placenta previa; placenta accreta | **HIT-PENDING** | `101-ISK-article.md`(anatomy)/`101-ISK-concepts.md`/`101-ISK-mcq-concepts.md`/`101-ISK-mcq.md` all alias both terms |
| 18 | Accessory (succenturiate) placenta as a cause of retained tissue/PPH | accessory placenta; succenturiate | **HIT-LIVE** | live claim `CLM-OBS-4153A9F8A1ABFF` "Accessory placenta consists of a main placenta accompanied by a small placenta" — concept ID not yet resolved from this claim id; confirm the parent concept directly in Step 2 |

**Table total: 18 distinct ideas** — 2 HIT-LIVE (rows 13, 18 — both need a Step 2 judgement
call on update-vs-new rather than a clean match), 12 HIT-PENDING (rows 1, 2, 3, 5, 6, 7, 8,
9(partial), 11, 12, 16, 17), 4 NEW (rows 4, 10, 14, 15 — row 9's teratoma half and row 10's
septum-transversum half are also unmatched but folded into their HIT-PENDING/flagged rows
above rather than double-counted).

## HAZARDS

- **`streamSignal` manifest gap, same class as the Histology lane found.** The Egyptian-tag
  file (`src_413115a28d7dc9914c91`, filename literally "Foundation Final **Egyptian**")
  carries `streamSignal: null` in the manifest, while the Arabic-named twin sitting (`src_
  7d031a45baeadc973a00`, "end foundation **مصريين** 222 1") correctly gets `streamSignal:
  "egyptian"`. The classifier catches the Arabic token but misses the plain English word in
  another file's name. Worth a targeted fix by whichever lane owns `manifest.py`.
- **Content-duplicate pairs invisible to the manifest's twin machinery** (detailed under
  Sources read). Two of the module's five exam files are word-for-word the same paper given
  to a different stream/cohort under an unrelated filename and a different sha256. The
  manifest's `nameTwinOf` only links files that share a normalised *name* in the same folder;
  it has no mechanism for "different name, same content." Step 2/3 should cite one file per
  pair and record the other as the duplicate sitting, not author from both as if they were
  independent evidence for the same fact twice.
- **Q8's printed key looks medically questionable.** `src_3bf4527b51de57464e14`/`
  src_413115a28d7dc9914c91` key "placenta accreta" (Q8) as **(a)** "excessive implantation of
  embryo in endometrium." Standard teaching (and this same paper's own Q4, keyed correctly)
  defines accreta as abnormal adherence to the **myometrium** — option **(b)** here. Recorded
  as printed, not silently corrected, per the toolchain's "record disagreement rather than
  resolving it." Flag for whoever authors this question in Step 3: either the key is wrong,
  or the question intends a distinction I am not seeing, and it needs a second look against
  the department book before an `explanation_<correct>` is written either way.
- **Q82's options look mismatched to the structure being tested.** "Function of the yolk
  sac" is keyed **(b)** "forming the mucosa of the respiratory system" — none of the four
  options (temperature regulation, respiratory mucosa, fetal lung development, fluid/
  electrolyte balance) is a textbook yolk-sac function; they read like amniotic-fluid
  functions with "yolk sac" substituted into the stem. Recorded as printed; needs the
  department book checked before this one is authored, and it may be a genuinely flawed
  question rather than a mis-extraction on my part (the native-text extraction was clean and
  unambiguous here).
- **`EOM - End Foundation wafdeen-1.pdf` is unkeyed and no separate answer file exists** for
  this module (checked: zero rows anywhere in the manifest carry an "answers"-flavoured
  category for `AU-MED-102`). I confirmed this by rendering p1 and p8 at 150 dpi and by
  scanning raw PDF bytes for `/Highlight`, `/Square`, `/Stamp` annotation objects — zero
  matches on this file (the two "2030"-tagged files do carry 2 `/Stamp` objects each, but
  that is far too few for a per-question key on a 12–24-page paper and is more likely a
  watermark/stamp artifact; not investigated further since those two files already have a
  printed answer block that is the real key). The 7 Embryology questions in this paper are
  recorded unkeyed, not guessed.
- **Two identically-worded distractor pairs across different questions test whether students
  conflate structures**: yolk stalk vs. allantois (both can plausibly answer "obliterated to
  form the median umbilical ligament" — only the allantois actually does; Q44's own correct
  answer is the yolk stalk's *complete disappearance*), and placenta accreta vs. percreta vs.
  previa vs. accessory (four questions across the two paper-pairs test four different corners
  of the same four-way distinction). Useful for Step 3's distractor writing, not just trivia.

## OWED

- **Anatomy, Histology, Biochemistry and Physiology departments** of this same module need
  their own triage against these same 5 papers — I pulled only the 26 Embryology-taught
  questions; the remaining ~206 distinct questions belong to those lanes.
- **Chapter 8 (Third to eight weeks)** has no directly-matched exam question in this triage;
  flagged in case a sibling lane's question reaches into germ-layer derivatives from the
  Anatomy or Histology side.
- **Chapter 1 (Reproductive Organs)** likewise untested by any of the five papers under the
  current scope test; not authored unless the orchestrator says otherwise.
- Step 2 must resolve, before minting anything: idea #9's teratoma-specific half, idea #10 in
  full (folding mechanism — confirm it's complementary to live `CON-DEV-B385E05FE858C2`, not
  a duplicate), idea #13 (update `CON-REN-CB7041F0D25574` vs. a new `dev`-subject concept),
  idea #16's long-umbilical-cord specific fact, and idea #18's concept ID behind
  `CLM-OBS-4153A9F8A1ABFF`.
- Q8 and Q82's questionable keys (Hazards) need a second look, ideally against the
  department's own placenta/yolk-sac slides, before Step 3 writes their explanations.

## BLOCKED

none — all five paper sourceIds were cached by the tooling lane by the time this triage
needed them (orchestrator confirmed mid-run); all twelve department files were safely
extractable by me directly, since they are lecture slides, not a shared paper.
