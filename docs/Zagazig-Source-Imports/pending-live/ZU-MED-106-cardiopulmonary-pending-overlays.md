<!--
  ZU-MED-106 (Cardiopulmonary) — 6 sparse PENDING-LIVE concept overlays.

  Every ## id below targets a concept that exists ONLY in another lane's
  unimported batch — none is in server/data/medical-library-v1.json yet
  (checked directly against the live JSON). Apply this file ONLY after the
  named source file is live. See INDEX.md for the per-target apply-after
  list and simulate command.

  Per 00-START-HERE.md §4 ("A hit only in another lane's unimported batch →
  the same sparse update, written into <import root>/pending-live/<slug>.md")
  and the chief-of-staff ruling on this triage's own live-partial hits
  (LANE-CARD.md §7, same overlay-not-split logic extended here to the
  pending-partial hits found in the same search pass) — 1 is the triage's own
  named pending hit (lingula); the next 4 (posterior cricoarytenoid, thymic
  epithelial reticular cells, splenic sinusoid, central chemoreceptors) are
  additional pending hits the first authoring pass found while searching
  before minting. The 6th (intra-alveolar pressure, CON-RES-42BC699422FFFA)
  resolves the triage's `cps-intra-alveolar-pressure` live-partial hit
  (author2 pass, LANE-CARD.md §7 ruling applied by the same logic) — see its
  own field_notes for why a second, narrower search turned up a pending
  concept where the first found only a citation.

  `## label` restates the target's own live-record label verbatim (required
  discriminator). `## universities`/`## modules` are true ID-list columns —
  `+zu`/`+ZU-MED-106`, safe appends. `## module_subject` is a full-replacement
  path list (00-START-HERE.md §3) — every row restates the target's existing
  path plus ZU's own new line, **ZU's own line listed first**: `gate.mjs
  batch` only checks `module_subject`'s very first segment (before the first
  `>` in the whole field) against the modules this row *locally* declares, so
  with a sparse `+ZU-MED-106` row that segment must be `ZU-MED-106`, not the
  pre-existing module — line order matters only for this gate check; the
  union is restated in full either way. This also sidesteps a second gate
  check (module ids cross-multiplied against every declared university's
  prefix) that has no correct answer when a record spans two
  different-prefixed non-Kasr universities on one row — `posterior
  cricoarytenoid` below (au + zu) hit exactly that combination; keeping this
  row's own `## universities`/`## modules` sparse (`zu` only, not restating
  `au`) avoids it without changing the real merge, which is a true ID-list
  append either way. `## learner_years` is a plain-number ID-list field,
  already `1` on every target below (Year 1 on both sides), so no addition is
  needed there.
-->

# Item

## id
CON-RES-69F499B794713C

## label
Each lung is half a cone with an apex, a base, costal and medial surfaces, and anterior, posterior and inferior borders

## universities
+zu

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Lung external features
104 CPS > Anatomy > Lungs

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q1, "Which of the following structures or characteristics does the cancerous lung contain?" [left lung] (answer: lingula, hand-drawn-ink key). This concept's own aliases already list "Lingula" — the fact this ZU question tests (lingula as the left lung's cardiac-notch-adjacent feature, no right-lung counterpart) is exactly what the concept's definition already teaches. Named as the triage's own pending hit (coverage/ZU-MED-106-triage.md, `cps-lung-carcinoma-lingula-anatomy`) — Kasr's own 104-CPS module code coincidentally shares a name with Zagazig's Cardiopulmonary subject matter, unrelated numbering, flagged there as exactly the cross-university overlap this overlay mechanism exists to catch.

---

# Item

## id
CON-RES-52550F9711D9AC

## label
The posterior cricoarytenoid is the only abductor of the vocal folds; the lateral cricoarytenoid and interarytenoid adduct, and cricothyroid tenses (lengthens) the vocal folds

## universities
+zu

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Larynx muscles
AU-MED-106 > Anatomy > Larynx

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q8, "She is unable to abduct the vocal cords during quiet breathing. Which of the following muscles is most likely paralyzed?" (answer: posterior cricoarytenoid, hand-drawn-ink key). Direct match, tested from the inverse direction of this concept's own label (which muscle abducts, vs which muscle's paralysis removes abduction) — same fact, no split. Found by `find-existing.mjs "posterior cricoarytenoid"`.

---

# Item

## id
CON-HEM-02424D1AF8A169

## label
Thymic epithelial reticular cells are endodermal, joined into a cellular reticulum, and produce no reticular fibres

## universities
+zu

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Lymphoid histology
104 CPS > Histology > Lymphatic and Macrophage System > Thymus

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q32, "The epithelial reticular cells of thymus gland have which of the following criteria?" (answer: they are joined together by cell junctions, hand-drawn-ink key). Direct match — this is the same fact the live label already states ("joined into a cellular reticulum"), and the ZU question's other three options (reticular-fibre synthesis, mesodermal origin, short wide processes) are corrected by the same concept's existing "endodermal, produce no reticular fibres" text. Found by `find-existing.mjs "thymic epithelial reticular"`.

---

# Item

## id
CON-HEM-4D47090A0B7561

## label
Open, closed and open-and-closed theories describe how blood crosses from the terminal capillaries into the splenic sinusoids

## universities
+zu

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Lymphoid histology
104 CPS > Histology > Lymphatic and Macrophage System > Spleen

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q33, "Splenic sinusoid is characterized by which of the following?" (answer: its endothelial cells are elongated, hand-drawn-ink key). Partial-topic match — the live concept's own label names the open/closed-theory debate about the sinusoid wall; the elongated-endothelial-cell fact ZU's question tests is the same structure's histological feature, close enough in scope to sit under this one concept rather than fork a second splenic-sinusoid record. Found by `find-existing.mjs "splenic sinusoid"`.

---

# Item

## id
CON-RES-C6F65BAAC06FAA

## label
Central chemoreceptors provide 75-80% of resting respiratory drive, responding to CSF H+ generated when CO2 (not H+ itself) crosses the blood-brain barrier, while peripheral chemoreceptors provide the remaining 20-25%, monitoring arterial PO2 directly and switching on sharply only once PO2 falls below about 60 mmHg

## universities
+zu

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Control of respiration
104 CPS > Physiology > Respiratory System > Control of Respiration

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q25, "The central chemoreceptors are more sensitive to which of the following?" (answer: CO2 excess, hand-drawn-ink key). Direct match — the live concept's own label states central chemoreceptors respond mainly to rising PCO2 (via CSF H+) rather than to arterial hypoxia directly, exactly the fact ZU's question tests. Found by `find-existing.mjs "central chemoreceptor"`.

---

# Item

## id
CON-RES-42BC699422FFFA

## label
Intra-alveolar pressure equals atmospheric during the pause between breaths, falls to about 1 mmHg below atmospheric during inspiration, and rises to about 1 mmHg above atmospheric during expiration

## universities
+zu

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Respiratory pressures
104 CPS > Physiology > Respiratory System > Mechanics of Breathing

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), written Q4 (3 marks), "Outline intra-alveolar pressure; Definition and Values?" (essay, graded by rubric/department book — not authored as an MCQ this pass, out of scope per LANE-CARD.md §4; page 1 render-confirmed via `pagetext.mjs show`). Resolves the triage's `cps-intra-alveolar-pressure` live-partial hit (coverage/ZU-MED-106-triage.md, coverage/ZU-MED-106-LEDGER.md "out of scope" list), which found only citation `CIT-FCC0FC6F6145B2` backing a narrower live concept (`CON-RES-2B785411500F0D`, one of five live concepts that each state a single point of the alveolar-pressure cycle) and concluded "no full concept" covering the essay's full "definition and values" objective. A second search this pass — `find-existing.mjs "alveolar pressure"` (dropping "intra-", which none of the live concepts' own text uses) — surfaced this Kasr 104-CPS pending concept instead, whose definition already states the full atmospheric / −1 mmHg / +1 mmHg cycle the essay question asks for, in one place. Overlay-not-split, applying the chief-of-staff's ruling on this triage's other 3 live-partial hits (LANE-CARD.md §7) by the same logic even though this hit lands on a pending, not live, record. No question authored against this row — the source item is essay-format, out of scope for this cluster — the overlay exists to correct the ledger's "no full concept" note and leave the resolution on record for whichever lane next authors ZU-MED-106's written/essay items.
