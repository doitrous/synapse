<!--
  MUST-MED501 (Rheumatology & Immunology) — new `inf` concepts, S2 authoring.
  Placement per TRIAGE APPROVED condition 3: immunology-mechanism concepts
  (an HLA association, a cytokine-targeted drug mechanism) sit under `inf`,
  not a dedicated rheum/immunology subject id — see the header note in
  ../concept/MUST-MED501-rheumatology-concepts.md for the full placement
  discussion. Ids minted with mint-concept-id.mjs (see that file's header).
-->

# Item

## id
CON-INF-931C18BC955C9F

## article_ids
ART-MSK-MUST-MED501-SERONEGATIVE-SPONDYLOARTHROPATHIES

## label
HLA-B27 marks the seronegative spondyloarthropathies — ankylosing spondylitis, reactive arthritis, psoriatic arthropathy and IBD-associated arthritis — but not Behçet syndrome

## canonical_key
hlab27.association.seronegative-spondyloarthropathies

## aliases
HLA-B27 associated diseases
Seronegative spondyloarthropathy family

## definition
HLA-B27 marks the seronegative spondyloarthropathies — ankylosing spondylitis (95% of cases), reactive arthritis/Reiter's syndrome (80%), psoriatic arthropathy's axial form, and the arthritis of inflammatory bowel disease — all rheumatoid-factor-negative conditions sharing axial/enthesitis-predominant inflammation. It is not associated with Behçet syndrome, a distinct vasculitis linked instead to HLA-B51.

## explicit_objective
Name which condition among a list of seronegative-arthritis-family diseases is NOT HLA-B27 associated (Behçet syndrome), and which are (ankylosing spondylitis, reactive arthritis, psoriatic arthropathy, IBD-associated arthritis).

## pitfalls
Treating every seronegative or vasculitic disease as HLA-B27-linked — Behçet syndrome is seronegative and inflammatory but its genetic association is HLA-B51, not B27.

## concept_type
mechanism

## status
Draft

## subject
inf

## topic
Immunology

## subtopic
HLA associations

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Seronegative spondyloarthropathies

## exam_weight_by_year
MUST_Y5=0.65

## clinical_relevance
0.6

## academic_relevance
0.7

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A17
src_a51388c9442af6f01df5 | lecture | | p26-29

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "HLA-B27" and "spondyloarthropathy" — no hit anywhere in live state or any docs/*-Source-Imports root.

---

# Item

## id
CON-INF-514EA5BBA9E96B

## article_ids
ART-MSK-MUST-MED501-RHEUMATOID-ARTHRITIS

## label
Infliximab is a biological response modifier that acts as a TNF-alpha inhibitor in rheumatoid arthritis

## canonical_key
infliximab.mechanism.tnf-alpha-inhibitor

## aliases
Infliximab mechanism
Anti-TNF therapy in RA

## definition
Infliximab is a biological response modifier that acts as a TNF-alpha inhibitor, blocking one of the key inflammatory cytokines (TNF, IL-1) driving rheumatoid arthritis. Biologics act faster than conventional disease-modifying drugs and are given by infusion, repeated at increasing intervals.

## explicit_objective
Name TNF-alpha as the target of infliximab and place it among the biological response modifiers used in rheumatoid arthritis.

## pitfalls
Confusing infliximab's mechanism with a conventional DMARD's (methotrexate, sulfasalazine) — biologics target a specific cytokine directly rather than broadly modulating lymphocyte/macrophage activity.

## concept_type
mechanism

## status
Draft

## subject
inf

## topic
Immunology

## subtopic
Biologic therapy

## universities
must

## learner_years
5

## modules
MUST-MED501

## module_subject
MUST-MED501 > Rheumatology and Immunology > Rheumatoid arthritis — treatment

## exam_weight_by_year
MUST_Y5=0.6

## clinical_relevance
0.6

## academic_relevance
0.7

## confidence
0.9

## support_mode
direct_statement

## exam_signal
src_92c2608c239affc24b1f | mcq_bank | | A24
src_a51388c9442af6f01df5 | lecture | | p18

## owner
Claude

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
arabicLabel: No reviewed Arabic label available for this MUST slice.
reviewer: Not yet named; MUST content is local-only Draft, per LANE-CARD.md.
finalPublisher: Not applicable — MUST is never imported to production.
sourceCandidateIds: find-existing.mjs run for "infliximab" and "TNF-alpha" — no hit anywhere.
