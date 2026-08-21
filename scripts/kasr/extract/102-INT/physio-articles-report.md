# Module 102 INT — Physiology library articles, authoring report

Companion to `docs/Kasr-Source-Imports/article/102-INT-physiology.md`.

Four articles, one per Physiology chapter of 102 INT that a question on the 2025 end-of-year
paper touched. The assignment was `article-plan.json`, the four entries whose `articleId`
starts `ART-102-PHY-`. The eleven `ART-102-BIO-` entries belong to another pass and its file
was not opened or edited.

| articleId | chapter | physical | printed | concepts | 2025 marks |
|---|---|---|---|---|---|
| `ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID` | Vitamin B12 and folic acid | 131–132 | 18–19 | 2 | 7 |
| `ART-102-PHY-PHYSIOLOGICAL-LIMITATIONS-OF-BLOOD-COAGULATION` | Physiological limitations of blood coagulation | 140–141 | 27–28 | 1 | 9 |
| `ART-102-PHY-AUTONOMIC-GANGLIA` | Autonomic ganglia | 152–154 | 39–41 | 1 | 8 |
| `ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM` | Parasympathetic nervous system | 159–162 | 46–49 | 1 | 6 |

All five concept IDs from the plan are listed in `related_concepts`, and no other concept ID
is. Every ID was checked to exist in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md`
before it was written down. No ID was minted here except the four article IDs, which came
from the plan verbatim.

---

## 1. Validation

```
npm run --silent medical:batch -- "docs/Kasr-Source-Imports/article/102-INT-physiology.md"

{ "kind": "article", "items": 4, "fieldsUsed": 52, "annotations": 7,
  "mediaRequests": 12, "calloutsWithEvidence": 0, "errors": [] }
```

**`fieldsUsed`: 52. Errors: 0.** The floor in `04-library-articles.md` is 49 and the manual's
worked example scores 51. 52 is every column the article schema has except the two legacy
aliases the manual says never to write — `body` and `image_recommendations`. All four records
carry all 52 keys; nothing is filled in one article and missing from another.

The precedent this batch was told to match, `101-ISK-histology.md`, scores 33. Where the two
differ, this file fills what that one left out: `annotations`, `callout_evidence`,
`published_summary`, `published_sections`, `claim_ids`, `span_ids`, `resource_ids`,
`article_source_ids`, `question_ids`, `notes`, `reviewer`, `final_publisher`,
`last_reviewed`, `review_due`, `arabic_title`, `aliases`, `reading_time`, and
`media_recommendations` in place of the legacy `image_recommendations`.

Two further checks were run beyond what was asked, and both are clean:

```
npm run --silent medical:simulate -- ".../102-INT-physiology.md" --emit …
batches [{"kind":"article","created":4,"updated":0,"rejected":0}]
delta   {"articles":4}
errors  0
```

`created: 4, updated: 0` confirms four new records rather than four accidental overwrites.

The field audit against the simulated state, filtered to `ART-102-PHY`, reports **two**
errors, both the same known dependency:

```
article.articleData.claimIds missing for … all four
article.articleData.spanIds  missing for … all four
```

Nothing else. §3 below says why those two are open rather than filled. Running the audit
against the article file alone additionally reports `references unknown concept CON-…` five
times; simulating the article batch together with `../concept/102-INT-concepts.md` clears all
five, which is the expected result for concepts that are pending rather than live.

An empty `## key` block was written with a blank line after it throughout. The import
wizard's parser needs that blank line: `## media` followed immediately by `## annotations`
on the next line makes `media` swallow the whole rest of the record, because the lookahead
that terminates a block needs a newline the heading has already consumed. With the blank
line, all four rows parse to 52 keys and every intentionally empty field parses as empty.

---

## 2. The `primary_node_id` decision for blood coagulation

**Chosen: `primary_node_id: DIS-PHY-T02`, with `secondary_node_ids: SYS-HEM-T03`.**

The brief flagged this one as worth questioning, and it is. `DIS-PHY-T02` is
*Physiology > Cardiovascular*. Blood coagulation is not cardiovascular physiology.

What the discipline view actually contains was checked in
`src/data/medicalLibraryTaxonomy.generated.ts`, and the brief's description is exactly right:

```
DIS-PHY-T01  Cell and membrane physiology
DIS-PHY-T02  Cardiovascular
DIS-PHY-T03  Respiratory
DIS-PHY-T04  Renal
DIS-PHY-T05  Gastrointestinal
DIS-PHY-T06  Endocrine and reproductive
DIS-PHY-T07  Neurophysiology
DIS-PHY-T08  Exercise and environmental physiology
```

There is no haematology topic. Every 102 INT blood chapter has to be filed somewhere in that
list or nowhere, and the least wrong of eight wrong answers is the one next to the
circulation.

Three things decided it in favour of keeping `DIS-PHY-T02`:

1. **The concept record already sits there.** `CON-HEM-87280E690F877F` carries
   `primary_node_id: DIS-PHY-T02` and `secondary_node_ids: SYS-HEM-T03`. Moving the article
   without moving the concept would separate two records that teach and are taught by each
   other, and the concept file is owned by another pass. A split placement is worse than a
   shared imperfect one, because it is invisible: nothing errors, and the two records simply
   stop appearing in the same view.

2. **A better home exists and is already used — as the secondary.** `SYS-HEM-T03`,
   *Blood & Lymphoreticular System > Hemostasis and thrombosis*, was verified to exist, and
   it is the honest systems placement. So the article is *already* findable under
   haemostasis; what `DIS-PHY-T02` decides is only where it lands in the discipline view.
   `SYS-HEM-T03-S02` (Thrombotic disorders) and `SYS-HEM-T03-S01` (Bleeding disorders) also
   exist but are both narrower than a physiology chapter about neither, so the topic node is
   the right level.

3. **Consistency across the four.** Every article in this batch takes its `primary_node_id`
   from `concepts[0].primary` and its `secondary_node_ids` from the same concept, so all four
   sit in the discipline view alongside the rest of 102 physiology and in the systems view
   where a clinician would look for them. Making one of the four an exception would need a
   better reason than "the topic node is wrong", because it is wrong for a reason that is
   not this article's to fix.

**What this is not.** It is not an endorsement of `DIS-PHY-T02`. The correct fix is a
haematology topic in the discipline view — a `DIS-PHY-T09` for blood and haemostasis — which
would rehouse this article, the vitamin B12 article, and every other blood chapter of 102 INT
in one edit. That is a taxonomy change, it is out of scope here, and **no node was invented**
to approximate it. The reasoning is recorded on the article itself in `field_notes` under
`primaryNodeId`, so the next author does not have to re-derive it.

For completeness, the other three placements, all taken from `concepts[0].primary` and all
verified to exist:

| article | primary | secondary | comment |
|---|---|---|---|
| Vitamin B12 and folic acid | `DIS-PHY-T05` Gastrointestinal | `SYS-HEM-T02-S02-M02` B12 and folate | Defensible: the concept is B12 *absorption*, which is gut physiology. The second concept on the same article carries `DIS-PHY-T02` instead; `concepts[0]` won, per the brief. |
| Autonomic ganglia | `DIS-PHY-T07` Neurophysiology | `SYS-NEU-T01-S02` Peripheral nervous system | Exact fit, no tension. |
| Parasympathetic nervous system | `DIS-PHY-T07` Neurophysiology | `SYS-NEU-T01-S02` Peripheral nervous system | Exact fit, no tension. |

---

## 3. Where the book was silent, and what was done

Nothing was filled from another textbook. Every gap below is written into the article's own
`evidence_gaps`, so a reader of the article sees it too.

### The gaps that are in every article

**Claims, citations and evidence spans do not exist for this module.**
`04-library-articles.md` puts `articleData.spanIds` on the audit's *must carry a value* list,
so a properly finished article comes with at least one span. A span is an evidence record and
lives in `docs/Kasr-Source-Imports/evidence/`, which this pass does not own, so none could be
authored alongside the articles. `claim_ids` and `span_ids` are therefore `[clear]` with a
`field_notes` reason each, and both are named as open questions in §6.

`claim-plan.json` pre-allocates one claim and one citation per concept, including the five
that matter here:

```
CLM-HEM-VITAMIN-B12-ABSORPTION-INTRINSIC-FACTOR-01   CIT-VITAMIN-B12-ABSORPTION-INTRINSIC-FACTOR-01
CLM-HEM-VITAMIN-B12-IMPORTANCE-AND-DEFICIENCY-01     CIT-VITAMIN-B12-IMPORTANCE-AND-DEFICIENCY-01
CLM-HEM-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01   CIT-PHYSIOLOGICAL-LIMITATION-OF-COAGULATION-01
CLM-NEU-AUTONOMIC-GANGLIA-TYPES-01                   CIT-AUTONOMIC-GANGLIA-TYPES-01
CLM-NEU-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01  CIT-PARASYMPATHETIC-FUNCTION-THORACIC-ABDOMI-01
```

Those IDs were **not** written into `claim_ids`. They are planned, not authored: `supportSpan`
and `locatorPage` are `null` on all five entries, no claim record exists anywhere, and
00-START-HERE §3 says a reference field may only name an ID that already exists in live state
or in a sibling batch file. Pointing at them now would attach the articles to nothing and
would not error. Each article's `field_notes` names its own planned claim ID so the evidence
pass can fill the field without re-deriving it.

**`callout_evidence` is present and empty in all four.** Gating a `hold_these` or
`lose_the_mark` line needs a claim and a citation, and neither exists. The key is present so
that gating one later is a change somebody made, not a field that was always missing.

**`arabic_title` is blank in all four, with a stated reason.** The manual asks for real effort
here rather than a note. The reason it is still blank: teaching at Kasr Alainy is in English,
the department book prints no Arabic term for any of these four chapters, and the concept
records for the same material — written by an earlier pass — record the same finding in their
own `arabicLabel` notes. A transliteration invented here would not be a reviewed term, and
writing one would make the field *look* filled to the next author. Consistency with the
sibling concept batch decided it. If a reviewer wants Arabic titles, they should be added
across the concept and article batches together, in one pass, by someone who can verify the
terms.

**`subtopic` is `[clear]` in all four.** The article importer stores `subtopic` as an overlay
ID (`subtopicId: text('subtopic')` in `src/data/bulkImport.ts`), not as free text. No `SUB_`
identifier has been assigned to this module, and free text there would be a bogus ID. The
curriculum position is carried by `module_subject`, which is the module's own subject-tree
path and is the field designed for it. `microtopic` and `nanotopic` are `[clear]` for the
same reason plus the fact that no such level exists beneath these nodes.

Note that `topic` on these articles is **not** the concepts' `topic`. The concept records
carry `topic: Physiology` with the chapter name in `subtopic`; an article cannot do that,
because its `subtopic` is an ID field. So `topic` carries the book's own Part II section —
`Haemopoietic system` for the two blood articles, `Autonomic nervous system` for the two
autonomic ones — which is the running head printed on every page of each chapter.

**`question_ids` is `[clear]` in all four.** The written questions that produced these
articles are authored in `docs/Kasr-Source-Imports/written/102-INT-EOY-2025-written.md` by
another pass, and the link is made from the question's `library_ids` there.

### Gaps specific to one article

**Vitamin B12 and folic acid.**
- The book gives a 5 µg daily requirement and a 5 mg hepatic store but does not say how long
  that store lasts. The concept record's pitfall line says "the liver holds several years'
  store"; the book does not, so the article does not. This is recorded in `evidence_gaps`.
- No serum B12 or folate reference range, and no diagnostic test for either deficiency, is
  given anywhere in the chapter. None was imported.
- The ileal receptor is not named — no cubilin, no amnionless — and haptocorrin / the
  R-binder stage is absent. Not added.
- The methyl trap is not explained, so the article cannot say why folate corrects the anaemia
  without correcting the neurological damage. Named as a gap rather than filled.
- The MCV threshold (> 95 μ3), the full causes of macrocytic anaemia, and pernicious anaemia
  are all in the **next** chapter, ANEMIA, printed 19–20, not in the vitamins chapter. They
  are used and attributed to that chapter explicitly, in both the prose and `evidence_basis`.
  The Anaemia chapter has its own subject-tree leaf and its article is not written here.

**Physiological limitations of blood coagulation.**
- **The 9 marks are not split.** The paper gives 9 for the question and the book prints six
  numbered mechanisms with no weighting. No per-mechanism split was invented; the article
  says so in `evidence_gaps` and tells the student to answer all six.
- Tissue factor pathway inhibitor is a standard seventh mechanism elsewhere and is **not**
  in this book. Deliberately omitted.
- "Small amounts" is the only quantity the book gives for circulating heparin. No
  concentration for heparin, antithrombin III, protein C or protein S was imported.
- No deficiency state is described — no factor V Leiden, no antithrombin III, protein C or
  protein S deficiency. The book's only thrombotic examples are atherosclerosis, vessel-wall
  injury and post-operative stasis, and the article uses those.
- The book states that the cerebral microcirculation is the exception to thrombomodulin
  expression and gives no reason. The exception is carried; no reason is guessed at.
- Mechanism five is one line in this chapter and is described in full three chapters earlier,
  in PLATELETS AND HAEMOSTASIS at printed 22–23. That fuller description is carried into the
  article and attributed to that chapter.

**Autonomic ganglia.**
- The ganglionic transmitter is not named in this chapter. Acetylcholine at nicotinic
  receptors is two chapters later, printed 49–50, and was not imported.
- No ganglion-blocking drug is named anywhere. None added.
- The book does not say why the cervical region has three ganglia instead of eight. Stated as
  the exception it is; no developmental account invented.
- The 1:8 to 1:9 ratio is given without saying whether it differs between the two divisions.
  No division-specific figure invented.
- Horner's syndrome comes from the SYMPATHETIC chapter, printed 42, and is attributed there.

**Parasympathetic nervous system.**
- **The chapter names no disease at all.** `TPL-CONCEPT` requires a `Clinical significance`
  section, so that section is written entirely from functions the book states, read for what
  each would show on examination and set against the sympathetic effect on the same organ.
  No lesion, syndrome or drug effect was added. `evidence_gaps` says this in as many words.
- The postganglionic transmitter and muscarinic receptors are two chapters later, printed
  49–50, and were not imported.
- No vagal tone figure, no resting heart rate, no quantity for any parasympathetic effect.
  The only number in the chapter is the 75% share of fibres.
- The book says the vagus decreases coronary blood flow and oxygen consumption but not
  whether that is direct or secondary to reduced atrial work. Carried as printed.
- The enteric nervous system is not named in this chapter.

---

## 4. Conflicts recorded

Nine in total across the four articles, all in `conflicts` fields, none resolved silently.
The three that change what a student writes:

**1. The structure of the coagulation answer — the one the brief flagged.**
*(article: `ART-102-PHY-PHYSIOLOGICAL-LIMITATIONS-OF-BLOOD-COAGULATION`)*

The concept `CON-HEM-87280E690F877F` states the answer as **three general** limiting
reactions (smooth endothelium, hepatic clearance, natural heparin) and **three specific**
ones (the thromboxane–prostacyclin balance, antithrombin III, the fibrinolytic system). That
is the **year book's** structure — `src_bfeed7a91f343a86b255`, chapter *Anti-Clotting
Mechanisms*, physical 40–41, which prints "A. General limiting reactions" and "B. Specific
limiting reactions". It is conflict 4 in `physio-chapters-report.md`, the conflict that drove
the whole re-extraction.

The **module book** prints one flat numbered list of six, on physical 140–141 / printed 27–28:

```
1. Healthy endothelium              (five sub-actions)
2. Heparin                          (combines with antithrombin III; inactivates IX, X, XI, XII)
3. The liver                        (inactivates any activated coagulation factors)
4. Continuous normal flow rate      (stasis → intravascular clotting; bed rest → thrombosis)
5. The balance between TXA2 and prostacyclin
6. Fibrinolytic system              (thrombomodulin → protein C → S → V, VIII off; TPA → plasmin → FDPs → thrombin off)
```

**The article teaches the module book's six**, because the 2025 paper uses the module book's
chapter title verbatim for 9 marks and the module book is this module's own source. The
year-book framing is named in `conflicts` and is not used as wording anywhere.

Two things the concept's framing costs a student, both written into `conflicts`:

- It has **no item for the continuous normal flow rate of blood** — the module book's item
  four, and the one that carries the post-operative-thrombosis example. On a 9-mark question
  with no per-item split, that is a whole mechanism missing.
- It lists **antithrombin III as a mechanism in its own right**, where the module book lists
  **heparin** as the mechanism and antithrombin III as the thing heparin acts through. The two
  are not interchangeable in an answer.

The concept should be reconciled to the six-item list at the evidence pass. That edit belongs
on `../concept/102-INT-concepts.md`, which another pass owns, and was not made here.

**2. The aorticorenal ganglion.** *(article: `ART-102-PHY-AUTONOMIC-GANGLIA`)*
The concept `CON-NEU-FCFD384A1011F8` names three sympathetic collateral ganglia — coeliac,
superior mesenteric, inferior mesenteric. The department book names **four**, adding
**aorticorenal** (physical 152), and its sympathetic chapter then routes the lesser and least
splanchnic nerves to it by name (physical 156). The article follows the book and adds
"leaving out the aorticorenal ganglion" to `lose_the_mark`. Reconciliation owed on the
concept.

**3. Where the centres of the autonomic reflexes belong.**
*(article: `ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM`)*
The module book prints this as an unlisted heading **inside** the parasympathetic chapter
(physical 161 / printed 48). The year book makes it a **chapter of its own**, after the
parasympathetic chapter has ended, and the earlier extraction pass flagged it excluded from
the written exam. Two books, two positions, two exam statuses. This is conflict 6 in
`physio-chapters-report.md`. The article follows the module book and teaches it as `Applied
physiology`; the disagreement, including the exclusion flag, is recorded.

The other six recorded conflicts, briefly:

4. The collateral-ganglion definition against its own membership — the book defines them as
   lying at the origin of the big abdominal aortic vessels and named after them, then lists
   the ciliary, sphenopalatine, submaxillary and otic ganglia in the same type. Taught as the
   book has it; the tension recorded, because it is exactly what makes the parasympathetic
   half forgettable. *(This is the book's own inconsistency, not a disagreement between
   sources, and it was not corrected.)*
5. Submaxillary (printed 39) against submandibular (printed 46) — the same ganglion, two
   names, both the department book's own. Both are given across the batch.
6. Chapter naming for the vitamins chapter — the book prints `VITAMINS`, the subject tree
   names the leaf `Vitamin B12 and folic acid`.
7. Where the B12 deficiency detail lives — split across the vitamins chapter and the anaemia
   chapter that follows it, and attributed separately.
8. Where the anticoagulant drugs belong — heparin appears twice in the book, as physiological
   mechanism two and again in the ANTICOAGULANTS chapter as an administered drug. The
   distinction is recorded because collapsing it is the failure this exam question is most
   vulnerable to.
9. Concept scope against chapter scope on the parasympathetic article — the concept covers
   the vagus only, the chapter also covers head and neck and pelvic viscera. The article
   teaches the whole chapter; the extra material is not attached to the concept.

The year book was **not** consulted to fill any gap. It appears only where the two books
disagree, is always named by its manifest ID `src_bfeed7a91f343a86b255`, and no wording from
it is used in any article.

---

## 5. Media requests filed

**Twelve, three per article, all as `media_recommendations` blocks with a `Brief:` in the
heading tail, a `Purpose:`, a `Priority:`, a `Status:`, a `Kind:`, a `Section:`, a
`Source direction:` and `Rights:`.** No URL is invented anywhere in the file, and `## media`
is empty in all four with a `field_notes` reason. The repository holds no rights-cleared
medical image and the Kasr corpus is a private university collection cleared for nothing, so
every figure is a request.

Eight are `Priority: required` — meaning the teaching point genuinely fails without the
asset, not that the figure would be nice. Four are `strongly helpful`.

| # | Article | Kind | What it shows | Priority | Why prose cannot carry it |
|---|---|---|---|---|---|
| 1 | B12 | flowchart | B12 from gastric lumen to hepatic store, one panel per step, trypsin marked as a requirement | required | The answer is an ordered chain whose every link is a separate disease; five sentences get reproduced in the wrong order or lose the trypsin |
| 2 | B12 | diagram | Normal against megaloblastic maturation, nucleus lagging while cytoplasm grows | required | Macrocytosis is a timing mismatch, i.e. a process; one cell drawn once cannot show a lag |
| 3 | B12 | comparison table | B12 against folate: source, cooking, store, role, cause of deficiency, result | strongly helpful | Six rows of contrast that prose flattens into a paragraph read once |
| 4 | Coagulation | flowchart | The fibrinolytic system including the feedback arrow from FDPs back onto thrombin | required | A branching chain that loops onto its own trigger; the loop is the chapter's central idea and prose hides it |
| 5 | Coagulation | diagram | TXA2 inside the injury against prostacyclin on intact endothelium, clot stopping at the boundary | required | Mechanism five is a spatial boundary, not an on/off switch |
| 6 | Coagulation | comparison table | Six mechanisms × what each disables, with IX/X/XI/XII and V/VIII in adjacent cells | required | The two failure modes are an incomplete list and swapping the two factor lists; a table fixes both |
| 7 | Ganglia | diagram | Four ganglion types by distance from the cord, each labelled sympathetic / parasympathetic / both | required | Classification is by site *and* by division, both spatial; four panels give a countable set |
| 8 | Ganglia | diagram | One preganglionic B fibre diverging onto nine cells, beside a one-neuron somatic pathway | strongly helpful | 1:8–1:9 is a shape; as a ratio it is memorised and not used |
| 9 | Ganglia | comparison table | Four types × site, division, examples, distinguishing feature | strongly helpful | Marked on more than one axis per item |
| 10 | Parasympathetic | diagram | The whole cranio-sacral outflow, nucleus → ganglion → organ, on one plate | required | Four facts × seven pathways; a student otherwise rebuilds the map at each revision |
| 11 | Parasympathetic | comparison table | Vagal against sympathetic effects on heart, lungs, gut wall, sphincters, vessels | required | The sphincter rule is reliably reversed and bronchoconstriction reliably mislabelled when the two are read as separate lists |
| 12 | Parasympathetic | diagram | Three reflex-integration levels with each level's outflow leaving it | strongly helpful | The point is a correspondence between two lists, which prose leaves the reader to notice |

Every request that follows a department-book figure says so and says **redrawn rather than
reproduced** — the source is a private university PDF and nothing in it is cleared for
redistribution. Requests 3, 6, 9 and 11 exist because the article body format has no table
syntax; the manual's instruction for that case is to file a request, which is what was done.

Four requests carry a `Notes:` line naming the concept they serve and the exam question that
produced it, so a fulfiller can see what the figure is for.

---

## 6. What could not be determined

Named rather than guessed.

1. **Whether the marking scheme splits the 9 marks for the coagulation question.** It almost
   certainly does, and nothing in the corpus says how. The solved paper
   `src_77300134fd057d61852c` solves only the biochemistry section — its four physiology pages
   are blank answer lines — so the strongest possible confirmation was unavailable, as
   `physio-chapters-report.md` §7.1 already recorded. The article tells the student to answer
   all six mechanisms and states in `evidence_gaps` that no split is printed. **A human with
   the marking scheme should check this**, because if the split is 6 × 1.5 the advice is
   right and if it is weighted the article could say which mechanisms carry more.

2. **Whether `claim_ids` should carry the IDs `claim-plan.json` pre-allocates.** They were
   left `[clear]`, for the reason in §3. If the evidence pass is going to author exactly those
   five claim IDs, the fields could be filled now and would resolve on import. If the evidence
   pass renames them, filling them now creates four dangling references that nothing detects.
   **This needs a decision by whoever owns the evidence batch, not by this pass.**

3. **Which sentence each first evidence span should anchor.** A guess is on record: the seven
   sentences quoted in `annotations`, one or two per article, are the sentences the spans
   should carry, because each is the single sentence the concept's claim asserts. The span
   records themselves could not be written here — a span lives in
   `docs/Kasr-Source-Imports/evidence/`, which this pass does not own.

4. **Whether `DIS-PHY` should gain a haematology topic.** §2 argues it should and does not do
   it. Until then two of these four articles sit on `DIS-PHY-T02` (Cardiovascular) and
   `DIS-PHY-T05` (Gastrointestinal) for reasons that have nothing to do with the heart or the
   gut. **This is a taxonomy question for a human.**

5. **Whether `ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM` should also teach
   `CON-NEU-82AD1AB931614C`.** The search before creating turned up that live concept — "Chorda
   tympani secretomotor pathway" — and this chapter describes exactly that pathway, chorda
   tympani to submandibular ganglion to the submandibular and sublingual glands. It is **not**
   in `related_concepts`, because the brief says list every concept from the plan entry *and
   only IDs that exist* as plan concepts for this article, and adding a concept from a
   different module's extraction would change what the batch validator checks coverage
   against. It is named in that article's `notes` so the concept pass can decide.

6. **Whether the two live haematology articles are really distinct from the coagulation
   article.** `ART-HEM-TOP-CC03030BEE` "Coagulation Physiology" and `ART-HEM-TOP-5F717A708E`
   "Primary Hemostasis" both surfaced on the searches. Both are pipeline-generated reading
   workspaces carrying the legacy `subjectId: "medical"`, each assembling a dozen or so
   extracted concepts, and neither teaches the limitation of coagulation as a chapter.
   Applying the §4 tiebreaker — could one record answer both "walk me through the cascade"
   and "name the six mechanisms that stop it"? — the answer is no, so a new article was
   created. Both IDs are written into that article's `notes`, because an article record has no
   `rejected_merge_candidate_ids` field to put them in. If a human decides those generated
   workspaces should be retired rather than sat beside, that is a separate call.

7. **Whether an Arabic title should be written.** §3 explains why all four are blank. The
   manual asks for effort here rather than a note, and the note given is honest but it is
   still a note. Someone who can verify Arabic physiological terminology should do the concept
   batch and the article batch together.

8. **Whether folic acid needs its own concept.** The chapter gives folate a source list, an
   importance line and three causes of deficiency, and the article teaches all of it — but
   both concepts on this article are about vitamin B12. Nothing in the plan asked for a folate
   concept and none was minted. If a question is ever written on folate specifically, it will
   have no concept to test.

---

## 7. Back-links owed

00-START-HERE §7 requires both directions and only one of them was writable here.

**Written:** each article lists its concepts in `related_concepts` — all five, and nothing
else. Confirmed by simulating the article batch together with the concept batch: zero errors,
`created: 4` articles and `created: 21` concepts, `delta.articles: 4`.

**Owed:** all five concept records in `docs/Kasr-Source-Imports/concept/102-INT-concepts.md`
carry `article_ids: [clear]` with a `field_notes` line that reads, verbatim:

> `articleIds: AUTHORING ERROR: a concept with no article is an orphan and the question testing it cannot validate. Name the article.`

These four articles are the answer to that note. The reciprocal edit — adding the article ID
to each concept and removing the note — was **not** made, because that file belongs to another
pass and 00-START-HERE §9 forbids appending to a file another row claims. The mapping the
next author needs:

```
CON-HEM-D76C58506E52B7  → ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID
CON-HEM-DDAAF125FD2EBE  → ART-102-PHY-VITAMIN-B12-AND-FOLIC-ACID
CON-HEM-87280E690F877F  → ART-102-PHY-PHYSIOLOGICAL-LIMITATIONS-OF-BLOOD-COAGULATION
CON-NEU-FCFD384A1011F8  → ART-102-PHY-AUTONOMIC-GANGLIA
CON-NEU-C3D7B209FB3260  → ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM
```

The written questions in `../written/102-INT-EOY-2025-written.md` also need these article IDs
in their `library_ids`, for the same reason and by the same pass.

---

## 8. Files touched

- `docs/Kasr-Source-Imports/article/102-INT-physiology.md` — created, four articles.
- `scripts/kasr/extract/102-INT/physio-articles-report.md` — this file.

Nothing else was edited. `article-plan.json`, `claim-plan.json` and
`physio-chapters-report.md` were read and not written to. `eoy-2025-199.json`, the
`*-chapters.json` files and `102-INT-biochemistry.md` were not opened at all. No
`git commit`, no `git push`, no import.
