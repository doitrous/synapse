<!--
  ASU-AE · Embryo 1 MCQ cluster (src_5d3b735488d8c321d5bd, "MCQs - Embryo 1.pdf")
  — pending-live sparse CONCEPT overlay onto LIVE concepts. Every ## id below
  already exists in server/data/medical-library-v1.json (originally minted
  under university `kau`, university-blind per the concept-id mint rule) —
  this file overlays ASU's own tags onto each rather than re-minting.

  These 6 records can be simulated directly against live state; no other
  pending source file needs to be applied first.

  Per LANE-BRIEF §6 rule 1/2 and the concepts manual: `## module_subject`
  fully replaces on every write (no `+` form) — none of these live records
  carries an existing module_subject line (auto-generated `kau` stubs), so
  the row below is the ASU-AE line alone. `## universities`, `## learner_years`
  and `## modules` are true ID-list columns and take `+asu` / `+1` / `+ASU-AE`.

  Simulate together with the question file this block is cited from:
  node scripts/content/gate.mjs simulate \
    docs/Ain-Shams-Source-Imports/pending-live/ASU-AE-embryo1-overlay-concepts.md \
    docs/Ain-Shams-Source-Imports/question/ASU-AE-embryo1-mcq.md \
    docs/Ain-Shams-Source-Imports/concept/ASU-AE-embryo1-new-concepts.md \
    docs/Ain-Shams-Source-Imports/article/ASU-AE-embryo1-new-articles.md
-->

# Item

## id
CON-AND-09727CBEB501FB

## label
A large proportion of abnormal sperm forms is associated with infertility

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE Embryo 1 MCQ bank — "The abnormal forms of sperms should not exceed ......... of the total count:" with the correct option "20%". "MCQs - Embryo 1.pdf" p.1 Q1, printed answer table p.8 (row-position 1, unlabeled top row e/20%.). This overlay adds the specific numeric threshold ASU's question supplies as a citation only, via QST-AND-ASU-AE-EMBRYO1-ABNORMAL-FORMS-PCT — the shared `definition` field itself is left untouched, since it already states the general infertility-association fact both universities teach.

---

# Item

## id
CON-AND-614CCD51AB977A

## label
Azoospermia is absence of sperm in semen

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE Embryo 1 MCQ bank — "Complete absence of sperms in the semen is called:" with the correct option "Azospermia". "MCQs - Embryo 1.pdf" p.3 Q16, printed answer table p.8 row 16 (d/azospermia=absent sperms).

---

# Item

## id
CON-OBS-24CAE6B0880C64

## label
Placental hCG maintains corpus luteum and promotes endometrial growth

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE Embryo 1 MCQ bank — "The hormone that maintains the corpus luteum during pregnancy is produced by:" with the correct option "Chorion". "MCQs - Embryo 1.pdf" p.2 Q9, printed answer table p.8 rows 8-9 (c/chorion secretes chorionic gonadotropins which maintain corpus luteum of pregnancy). ASU's question names the chorion/syncytiotrophoblast specifically, matching this record's "placental hCG" framing.

---

# Item

## id
CON-AND-4B7E5925250531

## label
Acrosomal vesicle spreads over the anterior half of the nucleus to form an acrosomal cap

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested twice in the ASU-AE Embryo 1 MCQ bank from two angles — "The acrosome of sperm is derived from:" (correct option "Golgi apparatus") and "The acrosome of sperm is derived from which part of the spermatid?" (correct option "Golgi complex"). "MCQs - Embryo 1.pdf" p.2 Q10-Q11, printed answer table p.8 rows 10-11 (d/golgi apparatus, b/golgi complex).

---

# Item

## id
CON-GYN-67FBF69E18FC33

## label
Cumulus oophorus is granulosa-cell group surrounding corona radiata and separating it from follicular fluid

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE Embryo 1 MCQ bank — "After ovulation, the released secondary oocyte is surrounded by cells called:" with the correct option "Cumulus oophorus". "MCQs - Embryo 1.pdf" p.3 Q15, printed answer table p.8 row 15 (c/cummulus oophorus).

---

# Item

## id
CON-GYN-0A37F80C809059

## label
Follicle rupture releases ovum with zona pellucida and corona radiata for fallopian-tube capture

## universities
+asu

## learner_years
+1

## modules
+ASU-AE

## module_subject
ASU-AE > Embryology > Questions > MCQ

## field_notes
asu: Tested directly in the ASU-AE Embryo 1 MCQ bank — "When the 2ry oocyte is ovulated, it is surrounded by:" with the correct option "B & C only" (zona pellucida & corona radiata). "MCQs - Embryo 1.pdf" p.7 Q44, printed answer table p.9 row 44 (e/zona pellucida & corona radiata).
