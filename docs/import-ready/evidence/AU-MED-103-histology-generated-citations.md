<!--
  Hand-authored citations for three of the eleven claims in
  AU-MED-103-histology-generated-claims.md. build-evidence.ts's own matcher found
  none automatically (0 of 11 crossed its 0.6 word-overlap bar against the
  department book's page text) -- expected, since these claims paraphrase rather
  than quote the source, and the matcher is deliberately strict. These three are
  written by hand instead, quoting the source verbatim, so that build-spans.ts has
  at least one cited claim per article to build a span from (an article's
  `span_ids` is a must-carry-a-value field). The other eight claims stand at
  `needs_evidence` with no citation -- real, not invented, just not yet matched to
  a verbatim span.

  Lane W1-103-HIST.
-->

# Item

## id
CIT-AU103-HIST-RBC-HB-01

## claim_id
CLM-3817DFB7BAB3

## resource_id
src_31fc3d2567adf6ff8074

## evidence_role
local_curriculum

## support_span
"Cytoplasm: hemoglobin occupies about 33% of the corpuscular volume & is more concentrated at the periphery."

## locator_type
page

## locator_page
2

## locator_section
Histology of the Blood, Immune & Lymphoid system · Red blood corpuscles (RBCs)

## locator_detail

## context_note
The department's own notes state the 33% figure and the peripheral concentration in the same sentence; the claim quotes only the distribution half, which is what MED 103's EOM - Blood end wafdeen final Q4 tests.

## confidence
0.85

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-AU103-HIST-ERYTHROPOIESIS-01

## claim_id
CLM-28028B8512F4

## resource_id
src_31fc3d2567adf6ff8074

## evidence_role
local_curriculum

## support_span
"4- Proerythroblasts: They are the first recognizable erythrocyte precursor."

## locator_type
page

## locator_page
4

## locator_section
Histology of the Blood, Immune & Lymphoid system · Erythropoiesis

## locator_detail

## context_note
The notes list the erythroid series as PHSCs, MHSCs, CFU-E, proerythroblast and onward; this span anchors the series' first recognisable stage, which is where the claim's own "runs proerythroblast, basophilic erythroblast..." enumeration starts.

## confidence
0.8

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-AU103-HIST-LYMPHOID-ORGANS-01

## claim_id
CLM-9225D5FA5051

## resource_id
src_31fc3d2567adf6ff8074

## evidence_role
local_curriculum

## support_span
"1- Primary (central) lymphoid organs: These are the sites for development & maturation of lymphocytes. They include: Thymus. Bone marrow."

## locator_type
page

## locator_page
17

## locator_section
Histology of the Blood, Immune & Lymphoid system · Lymphoid Organs

## locator_detail

## context_note
Quoted directly; the claim's wording ("where lymphocytes develop and mature; this is where lymphopoiesis itself takes place") restates this definition and adds the lymphopoiesis label the EOM question (Q6, wafdeen paper) tests.

## confidence
0.85

## counts_as_claim_evidence
yes
