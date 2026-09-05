<!--
  Kasr al-Ainy (KAU) — Year 5 catalogue: module-level marks mapped onto the
  4-bucket model (Omar decision 2026-09-05: "map to the 4 buckets now").
  Paste into Admin -> Academic Setup -> Academic Import.

  Year 5 is clinical rotations. Encoded from the clean top-level Year-5 table
  (Total 1580 = EndOfRound 429 + Final Clinical 439 + Final Written 572). Each
  top module carries ONE subject (the clerkship discipline).

  MAPPING CONVENTION (Y5 columns -> ExamMarks buckets):
    End of round    -> practical eom
    Final Clinical  -> practical eoy
    Final Written   -> written eoy

  GAPS (not encoded — need Omar to confirm before filling):
  - MED-522 and SUR-523 are printed as 700+70. The 700 reconciles as
    210 EoR + 210 Clinical + 280 Written and is encoded; the extra +70 each
    (140 total, which makes up the sheet's 1580) has no bucket shown -> left out.
  - The Surgery (110) and Medicine (100) SUBSPECIALTY tables (Orthopedics,
    Cardiology, etc.) do NOT reconcile with the 700 module totals — they measure
    a different component (end-of-round breakdown) -> not encoded as subjects yet.
    If you want subspecialties as filterable subjects, confirm how their marks
    relate to the 700 and I'll add them.
-->

# Year 5
## Term 1

<!-- Medicine 2 — printed 700+70; 700 encoded -->
- MED 522 [MED 522]
  - Internal Medicine (practical eom 210, practical eoy 210, written eoy 280)

<!-- Surgery 2 — printed 700+70; 700 encoded -->
- SUR 523 [SUR 523]
  - Surgery (practical eom 210, practical eoy 210, written eoy 280)

<!-- Family Medicine 2 — 30 -->
- FML 520 [FML 520]
  - Family Medicine (practical eom 9, practical eoy 9, written eoy 12)

<!-- MPC — 10 (Final Clinical only) -->
- MPC 526 [MPC 526]
  - Professionalism & Communication (practical eoy 10)
