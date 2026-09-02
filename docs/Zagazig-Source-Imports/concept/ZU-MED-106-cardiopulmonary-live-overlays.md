<!--
  ZU-MED-106 (Cardiopulmonary) — 4 sparse LIVE concept overlays.

  All 4 ids below are already LIVE in server/data/medical-library-v1.json —
  confirmed directly against the JSON, not just via find-existing.mjs (ids,
  moduleIds and moduleSubjectPaths checked one by one). Per the chief-of-staff
  ruling (2026-09-01, recorded in LANE-CARD.md §7): OVERLAY onto the live id,
  sparse rows only, never a full record. Do not split or re-mint.

  Every one of the 4 has `moduleIds: []` and `moduleSubjectPaths: None` on the
  live record today, so writing `module_subject` as a single new path here
  evicts nothing — there is no existing union to preserve. `## learner_years`
  is a plain-number ID-list field on concepts (00-START-HERE.md §3's
  traceability table: `learner_years` → `learnerYears`, plain numbers, not a
  scoped id like `ZU_Y1`) — `+1` implements the ruling's "+ZU_Y1" instruction
  in the field's real shape.

  3 of the 4 (`cps-refractory-shock-cause-of-death`,
  `cps-stagnant-hypoxia-decreased-blood-supply`,
  `cps-terminal-bronchiole-histology`) are the triage's own named live-partial
  hits. The 4th (recurrent laryngeal nerve motor supply, CON-END-80B5AB75A902CA)
  is an additional live hit this pass found while searching before minting
  `cps-recurrent-laryngeal-nerve-thyroarytenoid` — same ruling applies by the
  same logic, flagged here since it postdates the triage table.

  Import: Admin › Concepts › Import, with "Update matching items" on.
-->

# Item

## id
CON-CVS-1AD44A19DA47AD

## label
Microvascular change in late refractory shock

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Shock states

## exam_weight_by_year
ZU_Y1=0.6

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q15, "What is the cause of death in refractory shock?" (answer: release of toxins by ischemic tissues, hand-drawn-ink key). This is a partial match, not the same fact as the live concept's own microvascular precapillary-sphincter/venule behaviour — flagged in coverage/ZU-MED-106-triage.md as an authoring-time merge-vs-split call, resolved here as overlay-not-split per the chief-of-staff ruling (LANE-CARD.md §7): the live record already teaches "refractory shock", and ZU's cause-of-death fact is close enough in scope to sit under the same concept rather than fork a second one. The ZU-side question's own explanation covers the cause-of-death fact directly; the concept's existing definition is left untouched by this sparse row.

---

# Item

## id
CON-RES-654A12F4B21CC0

## label
Arterial or venous thrombosis or embolism can cause localized stagnant hypoxia

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Hypoxia

## exam_weight_by_year
ZU_Y1=0.6

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q24, "When the blood supply to the tissue decreases, what type of hypoxia occurs?" (answer: stagnant hypoxia, hand-drawn-ink key). Partial match — the live concept is scoped to localized stagnant hypoxia specifically from thrombosis/embolism; ZU's question tests the general definition (decreased blood supply → stagnant hypoxia) without naming a specific obstructive cause. Flagged in coverage/ZU-MED-106-triage.md; overlay-not-split per the chief-of-staff ruling. The ZU-side question's explanation states the general definition; the live concept's own text is untouched by this row.

---

# Item

## id
CON-RES-BECD91B06EA39D

## label
A terminal bronchiole (not shown) is immediately proximal to the respiratory bronchiole

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Respiratory histology

## exam_weight_by_year
ZU_Y1=0.55

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q36, "Which of the following is a character of terminal bronchiole?" (answer: its lamina propria has no glands, hand-drawn-ink key). Partial match — the live concept teaches the terminal bronchiole's position (immediately proximal to the respiratory bronchiole); ZU's question tests a histological feature (no glands in lamina propria) of the same structure. Flagged in coverage/ZU-MED-106-triage.md; overlay-not-split per the chief-of-staff ruling — same structure, adjacent teaching point, one concept. The ZU-side question's explanation states the histological fact directly; the live concept's own definition is untouched by this row.

---

# Item

## id
CON-END-80B5AB75A902CA

## label
Motor supply of the recurrent laryngeal nerve

## universities
+zu

## learner_years
+1

## modules
+ZU-MED-106

## module_subject
ZU-MED-106 > Cardiopulmonary > Larynx innervation

## exam_weight_by_year
ZU_Y1=0.6

## field_notes
zu: Fakous CPS Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q3, "A laryngoscopic examination demonstrates a lesion of the recurrent laryngeal nerve, causing weakness of which of the following muscles?" (answer: thyroarytenoid, hand-drawn-ink key). Direct match — this live concept's own definition ("the recurrent laryngeal nerve supplies all laryngeal muscles except cricothyroid") is exactly the fact the ZU question tests (thyroarytenoid is one of the muscles the RLN supplies; cricothyroid, the one exception, is a distractor option in the same question). Found by `find-existing.mjs "recurrent laryngeal nerve"` after a first, narrower search on "thyroarytenoid" alone missed it (the live label/definition never uses that word) — logged so the next author searches the broader anatomical term, not just the option text. Not one of the triage's 4 named live-partial hits; treated the same way on the same logic.
