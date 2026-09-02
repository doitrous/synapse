<!--
  ZU-MED-108 (Professional Practice II) — 3 sparse PENDING-LIVE concept
  overlays from the same triage/mint pass as
  `concept/ZU-MED-108-pp2final24-concepts.md`.

  Every ## id below targets a concept that exists ONLY in another lane's
  unimported batch — none is in server/data/medical-library-v1.json yet
  (checked directly against the live JSON). Apply this file ONLY after the
  named source file is live. See INDEX.md for the per-target apply-after
  list and simulate command.

  `## label` restates the target's own label verbatim (required
  discriminator). `## universities`/`## modules` are true ID-list columns —
  `+zu`/`+ZU-MED-108`, safe appends. `## module_subject` is a
  full-replacement path list (00-START-HERE.md §3) — every row restates the
  target's existing path plus ZU's own new line, **ZU's own line listed
  first** (gate.mjs batch only checks module_subject's very first segment
  against the modules this row locally declares). `## learner_years` is a
  plain-number ID-list field.

  The first row (CON-CVS-D3ED0A0E795D72, syncope) targets a "SYS-CVS"
  cross-university curriculum-bank concept (`docs/import-ready/concept/
  SYS-CVS-CONCEPT-T02.md`) that carries NO existing `modules`/
  `module_subject` at all — its own field_notes state "No module catalogue
  is populated for this curriculum". Adding a module_subject here therefore
  supplies the record's first module tagging rather than evicting any
  existing path union (00-START-HERE.md §4's eviction warning does not
  apply — there is nothing to evict).
-->

# Item

## id
CON-CVS-D3ED0A0E795D72

## label
Syncope is a transient loss of consciousness caused by global cerebral hypoperfusion, characterised by rapid onset, short duration and complete spontaneous recovery.

## universities
+zu

## modules
+ZU-MED-108

## module_subject
ZU-MED-108 > Professional Practice II > Fainting and syncope

## field_notes
zu: Fakous P.P2 Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q2, "About fainting, which statement is true: a) Loss of consciousness when blood supply to brain is momentarily interrupted. b) Victim can respond to shake and shout. c) You can put the victim in sitting position d) There is loss of consciousness, no pulse and no breathing." (answer: a, hand-drawn ink key, option circled + margin "A", render-confirmed). Direct match — this SYS-CVS record's own definition ("transient loss of consciousness caused by global cerebral hypoperfusion... rapid onset") states exactly the fact ZU's option a tests, and its own aliases already list "Fainting". Found by `find-existing.mjs "syncope"`. This record carries no existing modules/module_subject field at all (see file-level note above), so this overlay supplies its first module tagging rather than evicting any prior union.

---

# Item

## id
CON-CVS-20A1EC258BFF30

## label
Korotkoff sound character changes through the phases of cuff deflation, from first appearance to muffling to silence

## universities
+zu

## modules
+ZU-MED-108

## module_subject
ZU-MED-108 > Professional Practice II > Blood pressure measurement
AU-MED-106 > Physiology > Blood pressure > Korotkoff phase sequence

## field_notes
zu: Fakous P.P2 Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q24, "How many phases of Korotkoff sounds are heard during blood pressure measurement: a. 2 b. 3 c. 4 d. 5" (answer: c, hand-drawn ink key, option circled, render-confirmed). Partial-topic match, taken deliberately rather than minted new: this live/pending record's own definition already names all five phases (I tapping, II murmurish, III banging, IV muffled, V silence) — ZU's printed key of "4" is defensible under that same definition, since only phases I-IV actually produce an audible sound and phase V is defined by the disappearance (silence) of sound, so 4 of the 5 named phases are "heard." The question's explanation states this reading explicitly rather than treating it as a bare fact. Found by `find-existing.mjs "Korotkoff"`.

---

# Item

## id
CON-CVS-A0579343614BCD

## label
Systolic, diastolic and mean arterial pressure are distinct quantities, mean arterial pressure sits nearer diastolic because diastole outlasts systole, and pulse pressure widens when arterial compliance falls

## universities
+zu

## modules
+ZU-MED-108

## module_subject
ZU-MED-108 > Professional Practice II > Blood pressure measurement
104 CPS > Physiology > Cardiovascular System > Vascular Function

## field_notes
zu: Fakous P.P2 Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q28, "Systolic blood pressure minus (-) diastolic blood pressure equals: A- Rate B- Pulse pressure C- Rhythm D- Pulse deficit" (answer: B, hand-drawn ink key, option boxed + diagonal stroke through "B", render-confirmed). Direct match — this record's own definition states verbatim "Pulse pressure is the difference between systolic and diastolic pressure," exactly the fact ZU's question tests, alongside its own MAP/systolic/diastolic context. Found by `find-existing.mjs "pulse pressure"`.
