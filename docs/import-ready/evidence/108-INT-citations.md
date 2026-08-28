<!--
  Citations for the 108 INT claims in ./108-INT-claims.md.

  EVERY support_span IS COPIED OUT OF THE COMMITTED PAGE-TEXT CACHE
  (scripts/kasr/extract/pagetext/<sourceId>.json), never paraphrased and never
  typed from memory. Each was checked back against the cached page before this
  file was written, by string containment after whitespace collapse, and the
  generator refuses to write the file at all if a single segment does not match.
  A sentence that could not be found on the page it was supposed to be on was
  not cited. That check earned its keep: it caught a span in which a curly
  apostrophe had been substituted for the straight one the pathology book prints
  in "coal worker's pneumoconiosis" — a difference invisible on the page and
  fatal to the quote.

  What the quotes preserve and what they do not:
    - Wording, spelling and punctuation are as printed, including the books'
      own slips: "Morphologic Alternations in Cell Injury" for Alterations,
      "This extremely important and common cause of cell injury and death" with
      no verb, "due to in part to", "in the glomeruli.)", the heading
      "Haemochromatosis" over a body that writes "hemochromatosis", and the
      line-break hyphens in "wear-and- tear", "apple- green" and "starch- like".
    - '...' marks text cut from inside a quote.
    - Runs of whitespace are collapsed. Decorative bullet glyphs that the PDF
      carries in a symbol font are dropped where they extract as stray letters.
      Neither changes a word.

  THE PHARMACOLOGY BOOK IS OCR AND IS QUOTED UNDER RESTRAINT. The manifest calls
  src_af30e4191cb4087f8d3f a native text layer and the corpus index calls it
  extracted, but its cached text was produced in OCR mode and reads like it:
  "latrogenic" for Iatrogenic, "Inthe" for In the, "Acannula" for A cannula,
  "Phase-il" and "phase |" and "Phase ||" for Phase II and phase I and Phase II,
  "Efficacy»", "Type ©" for Type C, "ll)" and "lll)" for II) and III), "COz" for
  CO2, "NaHCOs" for NaHCO3, "LDso" and "EDs0" for LD50 and ED50, and mangled
  Arabic furniture where arrows and footers were. Those are quoted as extracted,
  because silently repairing them would misrepresent what the cached page says,
  and each is flagged in the context_note of the citation that carries it.

  No drug name, dose or number is quoted from that book unless it also occurs
  elsewhere in the same book in the same form — cross-page corroboration is the
  only verification available for an OCR layer with no rendered page to check
  against — and where a figure could not be corroborated it was cut with '...'
  rather than reproduced. CIT-108-PHARM-ION-TRAPPING-01 is the clearest case:
  the two milk and plasma pH figures are cut out of the middle of an otherwise
  quotable sentence for exactly that reason.

  Four spans are two-column comparison tables, where the text layer interleaves
  the columns line by line. They are quoted tangled, as extracted, with the
  column order explained in context_note, rather than untangled into something
  the page does not literally say.

  locator_type is printed_page and locator_page is the number printed on the
  page for the two department books. locator_detail carries the zero-based index
  into the cached pages array, because that is what a reader needs to find it
  again, and because the two books' offsets differ:
    pathology  printed = index + 1        pharmacology  printed = index
  The ILO sheet prints no page numbers at all, so its locator_type is `page` and
  its locator_page is the 1-based PDF page.

  counts_as_claim_evidence is 'no' on every row. Not because the locator is
  vague — each has an exact page — but because a university department book and
  a departmental ILO sheet are local curriculum, not independent verification,
  and neither must by itself promote a claim to 'verified'. Flip a row to 'yes'
  only when an independent authoritative source has been read and cited
  alongside it.

  Import: Evidence > Import, after ./108-INT-claims.md.
-->

# Item
## id
CIT-108-PATH-SCOPE-01
## claim_id
CLM-FND-PATH-SCOPE-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Pathology is the scientific study of disease. It includes the functional and structural changes in disease, from the molecular level to the effects on the individual. Pathology is learned in two stages: 1. General pathology: The study of the main types of disease process; inflammation, tumors etc. 2. Systemic pathology: The description of specific diseases as they affect organs or organ systems e.g. Lung cancer.
## locator_type
printed_page
## locator_page
1
## locator_section
Introduction to Pathology
## locator_detail
cached page index 0 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The book’s opening paragraph, quoted whole because the definition and the two-stage division are one continuous passage.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PATH-DISEASE-HEADINGS-01
## claim_id
CLM-FND-PATH-DISEASE-HEADINGS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Characteristics of disease: For each disease entity, the following characteristics are studied: 1. Epidemiology (incidence). 2. Etiology (cause). 3. Pathogenesis (mechanism). 4. Morphological changes (gross & microscopic) as well as functional and clinical changes. 5. Complications and sequelae. 6. Prognosis (outcome).
## locator_type
printed_page
## locator_page
1
## locator_section
Characteristics of disease
## locator_detail
cached page index 0 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The department book’s own numbered list. The book then expands each heading over the next page and a half.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PATH-DISEASE-CLASSIFICATION-01
## claim_id
CLM-FND-PATH-DISEASE-CLASSIFICATION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
General classification of diseases: The most widely used general classification of disease is the one based on pathogenesis, or disease mechanism. Most diseases can be placed under one of these headings: 1- Congenital: a. Genetic. b. Non genetic. 2- Acquired: a. Inflammatory. b. Hemodynamic. c. Growth disorders. d. Disordered immunity. e. Metabolic and degenerative disease.
## locator_type
printed_page
## locator_page
2
## locator_section
General classification of diseases
## locator_detail
cached page index 1 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The whole classification, quoted with its sub-headings so the two-level structure is visible.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CELL-STRESS-OUTCOMES-01
## claim_id
CLM-FND-CELL-STRESS-OUTCOMES-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
More excessive physiological stresses, or adverse pathologic stimuli (injury), result in: 1. Adaptation. 2. Reversible injury, or 3. Irreversible injury and cell death. These responses may be considered a continuum of progressive impairment of cell structure and function.
## locator_type
printed_page
## locator_page
3
## locator_section
Chapter 1 — Effects of cell injury stimuli
## locator_detail
cached page index 2 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The three outcomes and the book’s own qualification that they are a continuum, which is the part a list format tends to lose.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CELL-ADAPTATION-FORMS-01
## claim_id
CLM-FND-CELL-ADAPTATION-FORMS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
1. Adaptation: It occurs when physiological or pathologic stressors induce a new state that changes the cell but otherwise preserves its viability in the face of the exogenous stimuli. These changes include: a. Hypertrophy. b. Hyperplasia. c. Atrophy. d. Metaplasia.
## locator_type
printed_page
## locator_page
3
## locator_section
Chapter 1 — Adaptation
## locator_detail
cached page index 2 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Definition and the four named forms, in one passage.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HYPOXIA-CAUSES-01
## claim_id
CLM-FND-HYPOXIA-CAUSES-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
1. Oxygen deprivation (hypoxia) affects aerobic respiration and therefore the ability to generate adenosine triphosphate (ATP). This extremely important and common cause of cell injury and death. Hypoxia occurs because of: • Ischemia (deficient blood supply). • Inadequate oxygenation (e.g., cardiorespiratory failure). • Loss of oxygen-carrying capacity of the blood (e.g., anemia, carbon monoxide poisoning).
## locator_type
printed_page
## locator_page
4
## locator_section
Causes of cell injury
## locator_detail
cached page index 3 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Quoted as printed, including the book’s dropped verb in "This extremely important and common cause of cell injury and death." — recorded rather than repaired.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-ATP-DEPLETION-EFFECTS-01
## claim_id
CLM-FND-ATP-DEPLETION-EFFECTS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
1. Interference with aerobic respiration in mitochondria (oxidative phosphorylation): This leads to a reduction of ATP and therefore impairs biochemical processes in the cell, with the following effects: a. Reduction of activity of sodium pump, leading to accumulation of sodium inside the cell with influx of water into the cell causing it to swell. b. Interferes with protein synthesis. c. Increase of intracellular calcium (the calcium levels are kept in check by ATP-dependent enzymes).
## locator_type
printed_page
## locator_page
4
## locator_section
Mechanisms of cell injury — 1
## locator_detail
cached page index 3 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The three downstream effects of ATP depletion, in the book’s order.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-OXIDATIVE-STRESS-01
## claim_id
CLM-FND-OXIDATIVE-STRESS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
a. Free radicals, including reactive oxygen species are chemical species that have a single unpaired electron in an outer orbit. They are highly reactive thus interacting and alter adjacent molecules.
## locator_type
printed_page
## locator_page
4
## locator_section
Mechanisms of cell injury — 2, free radicals
## locator_detail
cached page index 3 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The definition of a free radical. The book’s "thus interacting and alter adjacent molecules" is its own, and is quoted unchanged.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-OXIDATIVE-STRESS-02
## claim_id
CLM-FND-OXIDATIVE-STRESS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Normally there is a balance between free radicals and defense mechanisms which includes antioxidants as vitamin E and enzymes such as superoxide dismutase. c. In some situations, the defense mechanisms are overcome, and free radicals interact with lipids in cell membranes (peroxidation), cellular proteins and DNA, this is referred to as oxidative stress.
## locator_type
printed_page
## locator_page
5
## locator_section
Mechanisms of cell injury — 2, oxidative stress
## locator_detail
cached page index 4 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The definition of oxidative stress proper, which runs onto the next printed page from the free-radical definition above.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-REPERFUSION-FREE-RADICALS-01
## claim_id
CLM-FND-REPERFUSION-FREE-RADICALS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
d. Free radicals play a major role in reperfusion injury (following restoration of blood flow in ischemic tissue), cellular aging, chemical injury and radiation damage.
## locator_type
printed_page
## locator_page
5
## locator_section
Mechanisms of cell injury — free radicals, roles
## locator_detail
cached page index 4 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
One sentence, and the only place the book mentions reperfusion injury.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-REVERSIBLE-INJURY-MORPHOLOGY-01
## claim_id
CLM-FND-REVERSIBLE-INJURY-MORPHOLOGY-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
1. Reversible Injury (degeneration): a- Cloudy swelling: One of the earliest changes seen in injury is due to loss of Na pump and accumulation of sodium and water inside the cell. The cell is swollen, and the cytoplasm appears granular. It is seen in liver cells, myocardial cells and renal tubular cells. b- Hydropic, ballooning or vacuolar change: Same mechanism as cloudy swelling but more advanced. The cells are swollen due to excess water accumulation. The cytoplasm is pale and shows multiple vacuoles. c- Fatty change: Fatty change occurs in hypoxic and toxic injury. Lipid appears as empty vacuoles in the cytoplasm.
## locator_type
printed_page
## locator_page
5
## locator_section
Morphologic Alternations in Cell Injury — 1. Reversible Injury
## locator_detail
cached page index 4 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
All three stages in one span. The section heading is the book’s own misspelling, "Morphologic Alternations in Cell Injury" for Alterations, and the module’s subject tree reproduces it.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-NECROSIS-DEFINITION-01
## claim_id
CLM-FND-NECROSIS-DEFINITION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Necrosis Definition: Necrosis is death of a group of cells within a living body. Mechanism: • With severe or prolonged moderate injury, there is loss of membrane integrity and release of lysosomal enzymes in the cytosol leading to destruction of the cellular constituents. • There is also leakage of cell constituents into the surrounding tissue, resulting in an inflammatory response. • Necrotic areas are removed by macrophages and repaired by fibrosis. Dystrophic calcification may occur.
## locator_type
printed_page
## locator_page
6
## locator_section
Necrosis — Definition and Mechanism
## locator_detail
cached page index 5 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Definition and mechanism together, because the inflammatory response is the half that distinguishes necrosis from apoptosis.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-NECROSIS-MORPHOLOGY-01
## claim_id
CLM-FND-NECROSIS-MORPHOLOGY-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Morphology: 1- Nuclear changes: • Karyolysis: Fading of nuclear basophilia. • Pyknosis: Nuclear shrinkage followed by karyorrhexis. • Karyorrhexis: Destructive nuclear fragmentation. • Eventually the nucleus disappears completely. 2- Cytoplasmic changes: • Necrotic cells are more eosinophilic (stain pinker) with hematoxylin and eosin (due to in part to the loss of cytoplasmic RNA which binds the blue dye, hematoxylin, and in part to denatured cytoplasmic proteins, which bind the red dye, eosin).
## locator_type
printed_page
## locator_page
6
## locator_section
Necrosis — Morphology
## locator_detail
cached page index 5 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Nuclear and cytoplasmic changes in one span. The doubled "due to in part to" is the book’s and is quoted as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-COAGULATIVE-NECROSIS-01
## claim_id
CLM-FND-COAGULATIVE-NECROSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
1. Coagulative necrosis (ischemic necrosis): It occurs because of acute ischemia (sudden decrease in blood supply). It is due to protein denaturation. Presumably, the injury denatures structural proteins, as well as the enzymes that cause proteolysis (autolysis) so the cellular outlines are maintained for some time. The necrotic area is initially white/yellow but of normal consistency, e.g. infarction of kidney, spleen and heart. Microscopic examination shows loss of nuclei, increased eosinophilia of the cytoplasm with retention of the general cellular outline (Appearing as ghost of the original tissue).
## locator_type
printed_page
## locator_page
6
## locator_section
Types of necrosis — 1. Coagulative necrosis
## locator_detail
cached page index 5 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The mechanism the concept turns on — denaturation outrunning autolysis — together with the gross and microscopic picture.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-LIQUEFACTIVE-NECROSIS-01
## claim_id
CLM-FND-LIQUEFACTIVE-NECROSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
2. Liquefactive or colliquative necrosis: Occurs in CNS infarctions, where the tissues are rich in lipid, soft and lack supporting stroma. The necrotic area becomes surrounded by glial tissue and is changed into a cyst. Pus in suppurative inflammation is also an example of liquefactive necrosis.
## locator_type
printed_page
## locator_page
7
## locator_section
Types of necrosis — 2. Liquefactive necrosis
## locator_detail
cached page index 6 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Both settings the book gives, brain and pus, in one span.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CASEATION-NECROSIS-01
## claim_id
CLM-FND-CASEATION-NECROSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
3. Caseation necrosis: It is a type of necrosis where the necrotic tissue appears semi-solid, yellowish and cheese-like (casein). Under the microscope caseation necrosis appears as granular structureless pink material. This occurs mainly in tuberculosis due to tissue digestion by activated macrophages. Also, liberation of lipids from the tubercle bacilli capsule adds to the cheese-like appearance.
## locator_type
printed_page
## locator_page
7
## locator_section
Types of necrosis — 3. Caseation necrosis
## locator_detail
cached page index 6 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Appearance, mechanism and the tuberculosis association, which is what the chapter’s own formative MCQ asks about.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-FAT-NECROSIS-01
## claim_id
CLM-FND-FAT-NECROSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
4. Fat necrosis is of two types: a- Traumatic fat necrosis: Trauma to adipose tissue leads to the release of intracellular fat which provokes an inflammatory response. Macrophages engulf fat and eventually lead to fibrosis. A common site is the breast where it results in a palpable mass. b- Enzymatic fat necrosis: In acute pancreatitis, there is leakage of pancreatic lipase, which acts on mesenteric fat cells splitting fat into fatty acids, which combine with calcium to form white calcium soaps.
## locator_type
printed_page
## locator_page
7
## locator_section
Types of necrosis — 4. Fat necrosis
## locator_detail
cached page index 6 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Both types, quoted together because the concept is the contrast between them.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-FIBRINOID-NECROSIS-01
## claim_id
CLM-FND-FIBRINOID-NECROSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
5. Fibrinoid necrosis: Fibrinoid necrosis is a special form of necrosis, where the necrotic material has some staining reactions resembling fibrin. The material is deep red and homogenous with Hematoxylin and eosin stain. It is seen with collagen damage in some autoimmune diseases as rheumatoid arthritis and in immune reactions involving blood vessels, e.g. polyarteritis nodosa.
## locator_type
printed_page
## locator_page
7
## locator_section
Types of necrosis — 5. Fibrinoid necrosis
## locator_detail
cached page index 6 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The staining behaviour that gives the lesion its name, and the two immune settings.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-APOPTOSIS-DEFINITION-01
## claim_id
CLM-FND-APOPTOSIS-DEFINITION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Apoptosis Definition: It is a programmed cell death which is energy dependent. It is a form of cell death which leads to the deletion of individual cells. Their membranes remain intact and thus do not provoke an inflammatory response.
## locator_type
printed_page
## locator_page
8
## locator_section
Apoptosis — Definition
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The definition, with the causal link the book draws between intact membranes and the absence of inflammation.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-APOPTOSIS-CONTROL-01
## claim_id
CLM-FND-APOPTOSIS-CONTROL-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Control of apoptosis: Apoptosis is controlled by the bcl2 protein family. Apoptosis is brought about by the activation of a group of enzymes called caspases. These enzymes result in destroying the nuclear membrane and activating DNAses which degrade nuclear DNA.
## locator_type
printed_page
## locator_page
8
## locator_section
Apoptosis — Control of apoptosis
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The book writes bcl2 without the hyphen; quoted as printed. The chapter’s formative MCQ 3 asks for the same enzyme family.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-APOPTOSIS-CAUSES-01
## claim_id
CLM-FND-APOPTOSIS-CAUSES-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Causes of apoptosis: It can occur in physiological and pathological conditions. 1. Apoptosis in physiological conditions: a. Programmed destruction of cells during embryogenesis. b. Hormone dependent involution of tissues e.g. in the endometrium during menstruation. c. Cell deletion in proliferating cell populations (e.g., intestinal epithelium) to maintain a constant cell number. d. Defective cells which acquire significant DNA damage are removed by apoptosis, to get rid of cells with unwanted mutations. 2. Apoptosis in pathological conditions: a. Cell death in virus infected cells, which may be induced by the virus as in HIV infection or by the host immune response e.g. viral hepatitis.
## locator_type
printed_page
## locator_page
8
## locator_section
Apoptosis — Causes
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Both lists, the pathological one cut after its first item; the remaining five pathological causes run on in the same paragraph and are summarised in the claim rather than quoted at length.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-APOPTOSIS-MORPHOLOGY-01
## claim_id
CLM-FND-APOPTOSIS-MORPHOLOGY-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Morphological changes: 1- The cytoplasm condenses and the cell shrinks, retaining an intact plasma membrane. 2- The nucleus shrinks and fragments. 3- Apoptotic cells show surface blebs which later fragment into membrane bound apoptotic bodies, consisting of a dark nuclear fragment surrounded by eosinophilic cytoplasm. 4- Apoptotic cells and apoptotic bodies are removed by adjacent cells or macrophages.
## locator_type
printed_page
## locator_page
8
## locator_section
Apoptosis — Morphological changes
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The four numbered steps as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-NECROSIS-VS-APOPTOSIS-01
## claim_id
CLM-FND-NECROSIS-VS-APOPTOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
2- Irreversible Injury: Cell death occurs primarily through two morphologic patterns and mechanisms: Necrosis and Apoptosis.
## locator_type
printed_page
## locator_page
5
## locator_section
Morphologic Alternations in Cell Injury — 2. Irreversible Injury
## locator_detail
cached page index 4 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The only sentence in which the book names the two together. It sets up the contrast and does not draw it; the two halves of the contrast are cited separately below.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-NECROSIS-VS-APOPTOSIS-02
## claim_id
CLM-FND-NECROSIS-VS-APOPTOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
With severe or prolonged moderate injury, there is loss of membrane integrity and release of lysosomal enzymes in the cytosol leading to destruction of the cellular constituents. • There is also leakage of cell constituents into the surrounding tissue, resulting in an inflammatory response.
## locator_type
printed_page
## locator_page
6
## locator_section
Necrosis — Mechanism
## locator_detail
cached page index 5 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The necrosis half of the contrast: membrane integrity lost, inflammation provoked.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-NECROSIS-VS-APOPTOSIS-03
## claim_id
CLM-FND-NECROSIS-VS-APOPTOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Their membranes remain intact and thus do not provoke an inflammatory response.
## locator_type
printed_page
## locator_page
8
## locator_section
Apoptosis — Definition
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The apoptosis half. Set against the span above, the two axes the claim asserts are both the book’s own; cell size is not, and is not claimed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-INTRACELLULAR-ACCUMULATION-01
## claim_id
CLM-FND-INTRACELLULAR-ACCUMULATION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Cells may accumulate abnormal amounts of various substances: 1. A normal endogenous substance a) Water, protein, carbohydrates, & lipids are produced at a normal rate, but accumulate if the metabolic rate is inadequate to remove it (e.g., fat accumulation in liver cells). b) A normal substance can accumulate due to genetic or acquired defects in its metabolism (e.g. lysosomal storage diseases). 2. An abnormal endogenous substance (product of a mutated gene) accumulates due to defective folding or transport, and inadequate degradation ... 3. An abnormal exogenous substance may accumulate in normal cells as they are unable to degrade such substances (e.g., macrophages laden with environmental carbon).
## locator_type
printed_page
## locator_page
10
## locator_section
Chapter 2 — Intracellular accumulations
## locator_detail
cached page index 9 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
All three mechanisms. The cut removes the book’s worked example for mechanism 2, whose Greek alpha and subscript do not survive the text layer cleanly enough to reproduce.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-STEATOSIS-DEFINITION-01
## claim_id
CLM-FND-STEATOSIS-DEFINITION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
1. Steatosis (Fatty Change): Definition: An abnormal accumulation of triglycerides within parenchymal cells either due to excessive entry or defective metabolism. Fatty change is typically reversible, but it can lead to inflammation and fibrosis. Sites: The most common site is in the liver. However, it can occur in heart, muscle, & kidney.
## locator_type
printed_page
## locator_page
11
## locator_section
Chapter 2 — 1. Steatosis (Fatty Change)
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Definition and sites. The reversibility clause matters: this is the one chapter-2 lesion the concept batch places under the "Reversible injury" node.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HEPATIC-STEATOSIS-PATHOGENESIS-01
## claim_id
CLM-FND-HEPATIC-STEATOSIS-PATHOGENESIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Pathogenesis: Excessive entry or defective metabolism of lipids: • Increased fatty acids entering the liver (starvation, corticosteroids) • Decreased fatty acid oxidation (hypoxia) • Increased triglyceride formation (alcohol) • Impaired lipoprotein secretion from the liver (alcohol)
## locator_type
printed_page
## locator_page
11
## locator_section
Steatosis — Pathogenesis
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The four routes with the book’s own example for each. Alcohol appears twice, against two different routes, which is the book’s point rather than a slip.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-FATTY-LIVER-MORPHOLOGY-01
## claim_id
CLM-FND-FATTY-LIVER-MORPHOLOGY-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Gross picture: Fatty livers are enlarged, and soft. The borders are rounded, and the cut section is yellow and greasy. Microscopic picture: Small, intracytoplasmic droplets or large vacuoles of fat accumulate in the liver cells. The nucleus becomes flattened and pushed to one side giving the cell a signet ring appearance.
## locator_type
printed_page
## locator_page
11
## locator_section
Steatosis — Gross and microscopic picture
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Gross and microscopic in one span, because the OSPE asks for both.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-MYOCARDIAL-FATTY-CHANGE-01
## claim_id
CLM-FND-MYOCARDIAL-FATTY-CHANGE-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Fatty change in myocardium can be spotty (in case of ischemia) or diffuse (in case of toxemia e.g. in diphtheria).
## locator_type
printed_page
## locator_page
5
## locator_section
Morphologic Alternations in Cell Injury — Fatty change
## locator_detail
cached page index 4 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
One sentence, and it sits in chapter 1 rather than in the fatty-change section of chapter 2, which is where a reader looks for it first.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CHOLESTEROL-ACCUMULATION-01
## claim_id
CLM-FND-CHOLESTEROL-ACCUMULATION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
• Atherosclerosis: Cholesterol & cholesterol esters accumulate in arterial wall smooth muscle cells & macrophages. Extracellular accumulations appear microscopically as cleft-like spaces (due to dissolved cholesterol crystals during normal histologic processing).
## locator_type
printed_page
## locator_page
11
## locator_section
Chapter 2 — 2. Cholesterol & Cholesterol Esters
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Both halves of the concept — the clefts and their cause as a processing artefact. The xanthoma half is cited separately.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CHOLESTEROL-ACCUMULATION-02
## claim_id
CLM-FND-CHOLESTEROL-ACCUMULATION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Xanthomas: In acquired & hereditary hyperlipidemias, lipids accumulate in “foamy” macrophages forming clusters in subcutaneous tissues and tendons producing masses called xanthomas.
## locator_type
printed_page
## locator_page
11
## locator_section
Chapter 2 — 2. Cholesterol & Cholesterol Esters, xanthomas
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The xanthoma half. The book’s curly quotation marks around "foamy" are as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HYALINE-CHANGE-01
## claim_id
CLM-FND-HYALINE-CHANGE-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
II. Hyaline Change: The term hyaline usually refers to an alteration within cells or in the extracellular space that gives a homogeneous, glassy, pink appearance in routine histologic sections stained with hematoxylin and eosin. It is widely used as a descriptive histologic term rather than a specific marker for cell injury.
## locator_type
printed_page
## locator_page
11
## locator_section
Chapter 2 — II. Hyaline Change
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The second sentence is the whole concept: hyaline names an appearance, not a substance.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-GLYCOGEN-ACCUMULATION-01
## claim_id
CLM-FND-GLYCOGEN-ACCUMULATION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
III. Glycogen: Glycogen is commonly stored within cells as a ready energy source. Excessive intracellular deposits (seen as clear vacuoles) are seen in glycogen storage diseases (so-called glycogenosis).
## locator_type
printed_page
## locator_page
12
## locator_section
Chapter 2 — III. Glycogen
## locator_detail
cached page index 11 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The whole of the book’s treatment of glycogen — three lines, which is why the concept says no more than this.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-ANTHRACOSIS-01
## claim_id
CLM-FND-ANTHRACOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
a- Carbon particles in air polluted by factory and car exhaust. When inhaled it is picked up by macrophages within the alveoli and is then transported through lymphatic channels to the regional lymph nodes in the tracheobronchial region. Accumulations of this pigment blacken the tissues of the lungs (anthracosis) and the involved lymph nodes. In coal miners the aggregates of carbon dust may induce a fibroblastic reaction and thus cause a serious lung disease known as coal worker's pneumoconiosis.
## locator_type
printed_page
## locator_page
12
## locator_section
Chapter 2 — IV. Pigments, exogenous
## locator_detail
cached page index 11 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Route, name and the coal-miner consequence in one passage.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-LIPOFUSCIN-01
## claim_id
CLM-FND-LIPOFUSCIN-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
a- Lipofuscin. • Lipofuscin is an insoluble pigment, also known as lipochrome or wear-and- tear pigment. • Lipofuscin is derived through lipid peroxidation of cellular membranes. Lipofuscin is not injurious to the cell or its functions. • It is a sign of free radical injury and lipid peroxidation throughout cell life.
## locator_type
printed_page
## locator_page
12
## locator_section
Chapter 2 — Endogenous pigments, lipofuscin
## locator_detail
cached page index 11 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Quoted with the book’s line-break hyphen in "wear-and- tear" left as extracted, because removing it would be editing the source. The harmlessness clause is the part students get wrong.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-BROWN-ATROPHY-01
## claim_id
CLM-FND-BROWN-ATROPHY-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Brown atrophy of the heart: This is a senile atrophy of the heart with an excess lipofuscin pigment Gross appearance: • The heart is reduced in size and brown in color. • The coronaries appear more tortuous due to the decreased size of the heart with normal length arteries. • The pericardial fat is replaced by edematous jelly-like tissue (serous atrophy of the fat) Microscopic picture: • The muscle fibers are thin and atrophic. • Excess fine yellowish brown lipofuscin pigments are seen on both sides of the nucleus in sections stained with hematoxylin & Eosin.
## locator_type
printed_page
## locator_page
13
## locator_section
Chapter 2 — Brown atrophy of the heart
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Definition, gross and microscopic. The book runs the definition into the "Gross appearance" heading without a full stop; quoted as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-MELANIN-01
## claim_id
CLM-FND-MELANIN-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
b- Melanin. Melanin is an endogenous, non-hemoglobin-derived, brown-black pigment formed when the enzyme tyrosinase catalyzes the oxidation of tyrosine to dihydroxyphenylalanine in melanocytes. Increased melanin may be observed in the following conditions: 1. Prolonged exposure to the sun. 2. Melanocytic nevi and melanomas. 3. Chloasma of pregnancy: Brown patches in the skin of the face, nipple and genitalia due to hormonal changes.
## locator_type
printed_page
## locator_page
13
## locator_section
Chapter 2 — Endogenous pigments, melanin
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The synthetic step and the first three of the five conditions; conditions 4 and 5, Addison disease and cafe au lait patches, run on in the same list and are named in the claim.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HEMOSIDERIN-01
## claim_id
CLM-FND-HEMOSIDERIN-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
1- Hemosiderin: Hemosiderin is a hemoglobin-derived, golden yellow-to-brown, granular pigment. • Iron is normally carried by specific transport proteins, transferrins. In cells, it is stored in association with a protein, apoferritin, to form ferritin micelles. Ferritin is a constituent of most cell types.
## locator_type
printed_page
## locator_page
13
## locator_section
Chapter 2 — Hemoglobin-derived pigments, hemosiderin
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Definition and the normal iron handling it is the overflow of.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HEMOSIDERIN-02
## claim_id
CLM-FND-HEMOSIDERIN-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Increased hemosiderin in tissues can be localized or generalized. a. Localized hemosiderosis: Local excess of hemosiderin result from hemorrhages in tissues. ... b. Generalized (systemic) hemosiderosis: When there is systemic overload of iron, hemosiderin may be deposited in many organs and tissues, a condition called systemic hemosiderosis. The main causes of generalized hemosiderosis are: 1- Increased absorption of dietary iron. 2- Hemolytic anemias, in which abnormal quantities of iron are released from erythrocytes. 3- Repeated blood transfusions because the transfused red cells constitute an exogenous load of iron.
## locator_type
printed_page
## locator_page
14
## locator_section
Chapter 2 — Hemosiderin, localized and generalized
## locator_detail
cached page index 13 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The local/generalized split and the three causes of overload. The cut removes the sentence tracing extravasated red cells through macrophages, which the claim summarises.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HAEMOCHROMATOSIS-01
## claim_id
CLM-FND-HAEMOCHROMATOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Primary Haemochromatosis: • Primary hemochromatosis is the most common form of iron overload. • It is a congenital disorder due to a gene defect on chromosome 6. Heterozygotes have increased absorption of iron, but only in homozygotes does this reach dangerous levels. • The defect causes increased absorption of iron in small intestine even while transferrin is fully saturated.
## locator_type
printed_page
## locator_page
14
## locator_section
Chapter 2 — Primary Haemochromatosis
## locator_detail
cached page index 13 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The book spells the heading Haemochromatosis and the body hemochromatosis, two lines apart; both spellings are quoted as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HEMOZOIN-01
## claim_id
CLM-FND-HEMOZOIN-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
2- Hemozoin: Hemozoin is a brownish iron containing pigment that is produced by parasites feeding on blood cells as malaria and bilharziasis. It is not reactive to Prussian blue. The pigments are released in blood and taken by macrophages of liver, spleen and other organs.
## locator_type
printed_page
## locator_page
15
## locator_section
Chapter 2 — 2- Hemozoin
## locator_detail
cached page index 14 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The negative Prussian blue reaction is the discriminator against hemosiderin and is the point the chapter’s own matching exercise turns on.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-DYSTROPHIC-CALCIFICATION-01
## claim_id
CLM-FND-DYSTROPHIC-CALCIFICATION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
PATHOLOGICAL CALCIFICATION This is an abnormal deposition of calcium salts in tissue other than teeth or bone. Calcification may be dystrophic or metastatic. A- Dystrophic calcification: It occurs in tissues already affected by disease. Serum calcium is normal. The calcification is due to local precipitation of insoluble calcium salts. Examples: 1. Atheromatous plaques. 2. Congenital bicuspid aortic valves. 3. Areas of necrosis as in old tuberculous lesions. 4. Old thrombi. 5. Lithopedion (dead fetus). 6. Fat necrosis.
## locator_type
printed_page
## locator_page
15
## locator_section
Pathological calcification — A. Dystrophic calcification
## locator_detail
cached page index 14 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Definition of pathological calcification, the dystrophic type, its normal serum calcium and all six examples.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-METASTATIC-CALCIFICATION-01
## claim_id
CLM-FND-METASTATIC-CALCIFICATION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
B- Metastatic calcification: Calcification occurs in viable tissues in cases of hypercalcemia.
## locator_type
printed_page
## locator_page
15
## locator_section
Pathological calcification — B. Metastatic calcification
## locator_detail
cached page index 14 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The defining sentence. It sits at the foot of printed page 15, not page 16 where the concept batch’s exam_signal places it; the causes and sites overleaf are cited next.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-METASTATIC-CALCIFICATION-02
## claim_id
CLM-FND-METASTATIC-CALCIFICATION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Main sites of calcium deposition in metastatic calcification: The interstitial tissue in: • The gastric mucosa. • Kidney. • Lungs. • Systemic arteries and pulmonary veins. Usually, deposits cause no clinical dysfunction. Massive deposits in the kidney (nephrocalcinosis) may in time cause renal failure.
## locator_type
printed_page
## locator_page
16
## locator_section
Metastatic calcification — Causes and sites
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The sites and the one consequence the book allows. The four causes are on the same page and are named in the claim.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CALCIFICATION-MORPHOLOGY-01
## claim_id
CLM-FND-CALCIFICATION-MORPHOLOGY-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Morphology of calcification: Both dystrophic and metastatic show Grossly: Chalky white granular material. Microscopic: Calcium salts have a basophilic amorphous granular appearance.
## locator_type
printed_page
## locator_page
16
## locator_section
Morphology of calcification
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The book states outright that the two are morphologically the same. Set against the serum-calcium spans on printed page 15, this is what makes the biochemistry, not the slide, the discriminator.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-AMYLOID-DEFINITION-01
## claim_id
CLM-FND-AMYLOID-DEFINITION-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Amyloidosis Definition: Amyloidosis is extracellular deposition of abnormal protein having beta-pleated configuration with a glycoprotein (amyloid P protein). It is deposited on basement membrane, reticulin fibers, and walls of small blood vessels. The affected tissue becomes hard & waxy. Pathogenesis of amyloidosis: - Amyloidosis results from abnormal folding of proteins, which become insoluble, aggregate, and deposit as fibrils in extracellular tissues.
## locator_type
printed_page
## locator_page
16
## locator_section
Amyloidosis — Definition and pathogenesis
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Definition, sites of deposition and the first line of the pathogenesis, which is the misfolding the concept rests on.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-AMYLOID-PROTEIN-TYPES-01
## claim_id
CLM-FND-AMYLOID-PROTEIN-TYPES-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Types of amyloid protein: Of more than 20 distinct forms, the most common are: 1- Amyloid light chain (AL) protein: Immunoglobulin light chains derived from plasma cells. 2- Amyloid-associated (AA) protein: A non-immunoglobulin protein derived from a larger serum precursor called serum amyloid–associated (SAA) protein synthesized by hepatocytes as part of the “acute phase response”.
## locator_type
printed_page
## locator_page
17
## locator_section
Amyloidosis — Types of amyloid protein
## locator_detail
cached page index 16 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Both proteins with their origins, quoted with the book’s en-dash in "amyloid–associated" and its quotation marks around "acute phase response".
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-SYSTEMIC-AMYLOIDOSIS-01
## claim_id
CLM-FND-SYSTEMIC-AMYLOIDOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
A. Systemic amyloidosis: In systemic amyloidosis, the material is deposited in many organs: liver, spleen, tongue, heart, and kidney. This results in organomegaly e.g. hepatomegaly, splenomegaly, macroglossia; and can lead to organ dysfunction e.g. heart failure and proteinuria. Systemic amyloidosis is further classified according to its etiology into: 1. Primary amyloidosis (Myeloma-associated amyloidosis): • The amyloid material is AL (amyloid light chain) protein. ... 2. Secondary (reactive) amyloidosis: • The amyloid substance is AA protein derived from serum amyloid associated (SAA) protein. ... 3. Senile amyloidosis: Minute deposits of amyloid, transthyretin, may be found in the heart and in the wall of blood vessels. Only in a few cases do they result in significant clinical disease.
## locator_type
printed_page
## locator_page
17
## locator_section
Amyloidosis — A. Systemic amyloidosis
## locator_detail
cached page index 16 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
All three etiological types with their proteins, cut down to the protein line for each. The full accounts of myeloma and of the chronic inflammatory causes of reactive amyloidosis fill the rest of the page.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-LOCALIZED-AMYLOIDOSIS-01
## claim_id
CLM-FND-LOCALIZED-AMYLOIDOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
B. Localized amyloidosis: Amyloid deposits are limited to a single tissue or organ. Examples are: 1- In medullary carcinoma, a tumor from calcitonin secreting C cells in the thyroid, amyloid material is seen in the stroma surrounding the tumor cells. The amyloid material is calcitonin precursor molecules arranged in beta pleated sheets configuration. It has no clinical effect but helps in identification of the tumor. ... 3- Localized deposits of amyloid are rarely seen without any obvious cause, e.g. in the skin, laryngeal wall, lung, ureter and urinary system. 4- In the islets of Langerhans in individuals with type 2 diabetes mellitus.
## locator_type
printed_page
## locator_page
18
## locator_section
Amyloidosis — B. Localized amyloidosis
## locator_detail
cached page index 17 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Three of the four examples. Example 2, cerebral amyloid in Alzheimer disease, is named in the claim but cut from the span because the book writes its protein with a Greek beta and a subscript that the text layer does not carry reliably.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CONGO-RED-01
## claim_id
CLM-FND-CONGO-RED-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
2- Congo red Stain: Amyloid stains orange red and when examined by polarized light (using two filters in the path of light of a microscope, one fixed and one rotating) the amyloid appears as an apple- green light against a dark background (apple green birefringence)
## locator_type
printed_page
## locator_page
18
## locator_section
Amyloidosis — Staining characteristics
## locator_detail
cached page index 17 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The book breaks "apple- green" across a line the first time and writes it closed the second; both are as printed. Congo red alone gives orange red — the polariser is what produces the green.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CONGO-RED-02
## claim_id
CLM-FND-CONGO-RED-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
If a slice of tissue is immersed in Lugol’s iodine amyloid stains dark brown while the rest of the tissue stains yellow (hence the name amyloid, starch- like).
## locator_type
printed_page
## locator_page
18
## locator_section
Amyloidosis — Gross staining
## locator_detail
cached page index 17 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The gross stain and the etymology, which is where the substance’s misleading name comes from.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-RENAL-AMYLOIDOSIS-01
## claim_id
CLM-FND-RENAL-AMYLOIDOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Kidney Amyloidosis: Gross picture: The kidney is enlarged. The cut surface is pale yellow and shows brown waxy dots (amyloid deposits in the glomeruli.) In long standing cases the kidneys are contracted due to secondary ischemic changes. Microscopic picture: • Amyloid is deposited in the basement membrane of the glomerular capillaries, and in the mesangium. It appears thick and pink. Finally, the whole glomerular capillary is obliterated by the amyloid deposit and appears as a homogeneous pink mass.
## locator_type
printed_page
## locator_page
19
## locator_section
Amyloidosis — Kidney
## locator_detail
cached page index 18 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Gross and microscopic. The book’s misplaced full stop inside the bracket, "in the glomeruli.)", is as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-RENAL-AMYLOIDOSIS-02
## claim_id
CLM-FND-RENAL-AMYLOIDOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Clinically, the patient presents with proteinuria, and later renal failure.
## locator_type
printed_page
## locator_page
19
## locator_section
Amyloidosis — Kidney, clinical
## locator_detail
cached page index 18 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The clinical half, and the book’s only statement of the sequence.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HEPATIC-SPLENIC-AMYLOIDOSIS-01
## claim_id
CLM-FND-HEPATIC-SPLENIC-AMYLOIDOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Liver amyloidosis: Gross picture: The liver is enlarged, heavy, firm and rubbery. The borders are sharp. The cut surface shows waxy light brown streaks of amyloid on a yellow background of liver tissue (fatty change). Microscopic picture: The amyloid material is deposited in the walls of sinusoids as pink streaks. The liver cells undergo atrophy due to pressure and anoxia.
## locator_type
printed_page
## locator_page
18
## locator_section
Amyloidosis — Liver
## locator_detail
cached page index 17 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The liver half of the concept.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-HEPATIC-SPLENIC-AMYLOIDOSIS-02
## claim_id
CLM-FND-HEPATIC-SPLENIC-AMYLOIDOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Amyloidosis spleen: Two types occur: Sago spleen and diffuse amyloid spleen. 1- Sago spleen: The spleen is enlarged, rubbery and firm. The cut surface shows brown, glassy dots (which represents follicles with amyloid deposit) against a red background. Amyloid is deposited in the wall of the central arterioles in the lymph follicles of the white pulp. ... 2- Diffuse amyloid spleen (lardaceous spleen): A less common type. The spleen is markedly enlarged. The cut surface shows brown streaks of amyloid deposit. Amyloid is widely deposited in the sinusoids of the red pulp. The white pulp is atrophic.
## locator_type
printed_page
## locator_page
20
## locator_section
Amyloidosis — Spleen
## locator_detail
cached page index 19 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
Both splenic patterns, cut only to remove the sentence on follicular atrophy. White pulp against red pulp is the whole distinction.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CARDIAC-GI-AMYLOIDOSIS-01
## claim_id
CLM-FND-CARDIAC-GI-AMYLOIDOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Amyloidosis of the heart: Amyloid is deposited in the walls of small blood vessels and in the interstitial tissue surrounding and replacing muscle fibers. The heart is enlarged, and the myocardium is thickened and firm. The effects are cardiac arrhythmias and heart failure.
## locator_type
printed_page
## locator_page
20
## locator_section
Amyloidosis — Heart
## locator_detail
cached page index 19 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The cardiac half, deposition site through to clinical effect.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-CARDIAC-GI-AMYLOIDOSIS-02
## claim_id
CLM-FND-CARDIAC-GI-AMYLOIDOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Amyloidosis of gastrointestinal tract: Any part of GIT can be affected. • Amyloid deposits in the tongue cause macroglossia. • Amyloid deposits in the intestine: The early lesions mainly affect blood vessels but eventually extend to involve the adjacent areas of the submucosa, muscularis, and subserosa resulting in mucosal atrophy. The effects are malabsorption and protein loss.
## locator_type
printed_page
## locator_page
20
## locator_section
Amyloidosis — Gastrointestinal tract
## locator_detail
cached page index 19 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The gastrointestinal half. Macroglossia is also listed on printed page 17 as a feature of systemic disease; the mechanism is only given here.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-AMYLOIDOSIS-DIAGNOSIS-01
## claim_id
CLM-FND-AMYLOIDOSIS-DIAGNOSIS-01
## resource_id
src_e294bafc730fe7111b06
## evidence_role
local_curriculum
## support_span
Diagnosis of amyloidosis: The diagnosis of amyloidosis depends on the histologic demonstration of amyloid deposits in tissues. The most common sites biopsied are the kidney, when renal manifestations are present, or rectal or gingival biopsy in patients suspected of having systemic amyloidosis.
## locator_type
printed_page
## locator_page
21
## locator_section
Diagnosis of amyloidosis
## locator_detail
cached page index 20 of scripts/kasr/extract/pagetext/src_e294bafc730fe7111b06.json
## context_note
The book’s whole treatment of diagnosis — three lines, and it names no blood test.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-PK-VS-PD-01
## claim_id
CLM-FND-PK-VS-PD-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1- Pharmacokinetics: It describes what the body does to the drug, which includes Absorption, Distribution, Metabolism & Excretion [ADME]. 2- Pharmacodynamics: It describes what the drug does to the body, which includes the study of the pharmacological actions of drugs and their possible mechanisms of action.
## locator_type
printed_page
## locator_page
2
## locator_section
Introduction
## locator_detail
cached page index 2 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The book's own two definitions, side by side, and one of the cleanest passages in an otherwise damaged OCR layer.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-PK-VS-PD-02
## claim_id
CLM-FND-PK-VS-PD-01
## resource_id
src_b4f736e3bd809dbee187
## evidence_role
local_curriculum
## support_span
1. To explain the difference between pharmacokinetics and pharmacodynamics
## locator_type
page
## locator_page
1
## locator_section
ILOs of general pharmacology — ILO 1
## locator_detail
cached page index 0 of scripts/kasr/extract/pagetext/src_b4f736e3bd809dbee187.json
## context_note
The department's own numbered objective, carrying an MCQ tick. It establishes that the faculty teaches and examines the distinction; it does not state the distinction, which is why the department book is cited alongside it.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-SIMPLE-DIFFUSION-01
## claim_id
CLM-FND-SIMPLE-DIFFUSION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1) Simple diffusion: The chief process involved in absorption & distribution of drugs. Simple diffusion depends on: 1) Concentration gradient: drugs pass from one side of the cell membrane to the other along concentration gradient 2) Molecular size: the smaller the molecular size the better is the absorption. 3) Lipid solubility and lipid/water partition coefficient, the more, the better the absorption. ... 4) Degree of ionization: - The more the ionization, the less the lipid solubility.
## locator_type
printed_page
## locator_page
3
## locator_section
Passage of drugs across cell membranes — 1) Simple diffusion
## locator_detail
cached page index 3 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
OCR, quoted as extracted. The cut before item 4 removes the book's N.B. defining the lipid/water partition coefficient, which it prints between items 3 and 4. The list runs on to a fifth item, "No energy& no carriers are needed.", quoted separately below because the missing space is the book's OCR and not a typing slip here.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-SIMPLE-DIFFUSION-02
## claim_id
CLM-FND-SIMPLE-DIFFUSION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
5) No energy& no carriers are needed.
## locator_type
printed_page
## locator_page
3
## locator_section
Simple diffusion — item 5
## locator_detail
cached page index 3 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Quoted with the missing space after "energy&" exactly as the OCR layer carries it. This is the line that separates simple diffusion from both carrier-mediated types.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-CARRIER-TRANSPORT-01
## claim_id
CLM-FND-CARRIER-TRANSPORT-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
2) Carrier mediated transport: of 2 types: Drugs are transferred across cell Drugs are transferred across cell membranes: membranes: - Along their concentration gradient. - Against their concentration gradient - Carrier for substances which are - Transport requires a carrier too large or lipid insoluble to - Transport requires energy diffuse passively e.g. secretion of penicillin by renal tubules. - No energy is required. e.g. glucose uptake by cells.
## locator_type
printed_page
## locator_page
4
## locator_section
2) Carrier mediated transport
## locator_detail
cached page index 4 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
A TWO-COLUMN TABLE, quoted tangled exactly as the text layer interleaves it. Read the left column — facilitated diffusion: along the gradient, carrier for substances too large or lipid insoluble to diffuse passively, no energy required, glucose uptake by cells. Read the right column — active transport: against the gradient, requires a carrier, requires energy, secretion of penicillin by renal tubules. It is quoted tangled rather than untangled because the untangled version is not what the page says.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-CARRIER-TRANSPORT-02
## claim_id
CLM-FND-CARRIER-TRANSPORT-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
4- Active Tubular Excretion (Saturable & Site for competition & Drug Interaction):
## locator_type
printed_page
## locator_page
10
## locator_section
IV) Excretion — A) Renal
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The saturability and competition half of the claim. The book states it of the renal tubular carrier rather than of carriers in general, which is the only place it says it.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-PKA-01
## claim_id
CLM-FND-PKA-PH-IONIZATION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
pKa (ionization constant of a drug). It is the pH at which 50% of the drug is ionized and 50% non-ionized
## locator_type
printed_page
## locator_page
3
## locator_section
Simple diffusion — pKa
## locator_detail
cached page index 3 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition of pKa. The sentence continues with a worked example naming a drug and its pKa value; that figure is not reproduced, because a single numeral read off an OCR layer with no rendered page to check it against is exactly what this module was told not to quote.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-PKA-02
## claim_id
CLM-FND-PKA-PH-IONIZATION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1. Most drugs are either weak acids or weak bases. 2. Weak acids are better absorbed in acidic media where it is less ionized and so more lipid soluble. 3. Weak bases are better absorbed in alkaline media where it is less ionized so more lipid soluble.
## locator_type
printed_page
## locator_page
3
## locator_section
Simple diffusion — pH of the medium
## locator_detail
cached page index 3 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The rule in the book's own words, with its own number disagreement — "Weak acids ... where it is less ionized" — quoted as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ION-TRAPPING-01
## claim_id
CLM-FND-ION-TRAPPING-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
pH of milk is more acidic ... than that of plasma ..., so basic drugs ionize and accumulate in milk (ion trapping).
## locator_type
printed_page
## locator_page
8
## locator_section
Distribution — c- Passage of drugs through breast milk
## locator_detail
cached page index 8 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The clearest statement of the phenomenon in the book, and the only one in which it names it. THE TWO CUTS REMOVE THE PARENTHESISED pH FIGURES DELIBERATELY: they are numerals from an OCR text layer, there is no rendered page to check them against, and this module was told not to quote a number from this book that cannot be verified. The sentence's logic does not depend on them.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ION-TRAPPING-02
## claim_id
CLM-FND-ION-TRAPPING-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Changes in urinary pH: - Acidification of urine by ammonium chloride increases excretion of basic drugs as ephedrine. - Alkalinization of urine by sodium bicarbonate increases excretion of acidic drugs as aspirin.
## locator_type
printed_page
## locator_page
25
## locator_section
Pharmacokinetic drug interactions — 4- Renal Excretion
## locator_detail
cached page index 25 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The renal application, taken from printed page 25 rather than from the excretion chapter on printed pages 10 and 11, where the same rule is printed but the OCR has destroyed the arrows and left Arabic fragments in the middle of both sentences. The four substances named here — ammonium chloride, ephedrine, sodium bicarbonate, aspirin — each occur elsewhere in the same book in the same spelling, which is the only corroboration an OCR layer allows.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ORAL-ABSORPTION-01
## claim_id
CLM-FND-ORAL-ABSORPTION-FACTORS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1- Surface area of absorbing surface: The intestine has surface area 1000 times that of stomach (due to microvilli) and rich blood flow. Thus, absorption from intestine > stomach.
## locator_type
printed_page
## locator_page
5
## locator_section
Factors affecting oral absorption
## locator_detail
cached page index 5 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The single most examined fact in this section. The book states the same thousandfold ratio twice, here and on printed page 4, which corroborates the figure across pages within the same OCR layer.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ORAL-ABSORPTION-02
## claim_id
CLM-FND-ORAL-ABSORPTION-FACTORS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
2-Absorbing Surface: - Vascularity: Alveoli > Skeletal muscle > Subcutaneous tissues. - Surface area: Alveoli > Intestine > Stomach (Intestines have 1000 times the surface area of the stomach.).
## locator_type
printed_page
## locator_page
4
## locator_section
Factors affecting drug absorption — B) Factors Related to the Patient
## locator_detail
cached page index 4 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The corroborating statement of the same ratio, one printed page earlier, together with the vascularity ordering.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-BIOAVAILABILITY-01
## claim_id
CLM-FND-BIOAVAILABILITY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Bioavailability is the fraction of the unchanged drug that reaches the systemic circulation after administration by any route.
## locator_type
printed_page
## locator_page
6
## locator_section
Bioavailability
## locator_detail
cached page index 6 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition, which is what EOY 2025 asks students to write out for one mark. "Unchanged" is the word that does the work.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-BIOAVAILABILITY-02
## claim_id
CLM-FND-BIOAVAILABILITY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Factors affecting oral bioavailability: 1. Amount of drug absorbed = Factors affecting GIT absorption. 2. First pass metabolism.
## locator_type
printed_page
## locator_page
6
## locator_section
Bioavailability — factors
## locator_detail
cached page index 6 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The two determinants, which is what makes first-pass metabolism part of this concept rather than a separate one.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-BIOAVAILABILITY-03
## claim_id
CLM-FND-BIOAVAILABILITY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
7- First pass effect: Means metabolism of a drug in the gut content and wall or the liver before reaching the systemic circulation.
## locator_type
printed_page
## locator_page
5
## locator_section
Factors affecting oral absorption — 7- First pass effect
## locator_detail
cached page index 5 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The book's definition of first-pass metabolism, which it gives under oral absorption rather than under bioavailability.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DISTRIBUTION-PATTERNS-01
## claim_id
CLM-FND-DISTRIBUTION-PATTERNS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Patterns of distribution 1- One compartment model (intravascular): Drugs having large molecular weights are trapped in the intravascular compartment and are thus distributed in a volume of 4 L which is equal to 6% of a 70-kg body weight individual
## locator_type
printed_page
## locator_page
6
## locator_section
II) Distribution — Patterns of distribution
## locator_detail
cached page index 6 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The first pattern. The litre figures throughout this section come from an OCR layer, but they are internally consistent with the compartment volumes the book lists earlier on the same page — intravascular plus interstitial giving extracellular, and extracellular plus intracellular giving the whole body — and that arithmetic is a check the OCR could not have passed by accident. The claim rests on the four patterns, not on the numbers.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DISTRIBUTION-PATTERNS-02
## claim_id
CLM-FND-DISTRIBUTION-PATTERNS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
2-Two compartments model (extracellular): These compartments are the intravascular space and the interstitial fluid space. Drugs having low molecular weights but are not lipid soluble, are distributed to a volume of 14 L= 20% of body weight ... 3-Multicompartment model (Extra and intracellular): Drugs are distributed to total body fluids (42L / 70 Kg). They are of low MW and are hydrophobic (Lipid soluble). 4. Other sites: Some drugs have special affinity for certain tissue:
## locator_type
printed_page
## locator_page
7
## locator_section
Distribution — patterns 2 to 4
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Patterns two, three and four, completing the set of four the concept names. The cut removes the worked examples for pattern two.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DISTRIBUTION-FACTORS-01
## claim_id
CLM-FND-DISTRIBUTION-FACTORS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Factors affecting distribution of drugs: 1- Physicochemical properties of the drug: Molecular weight (MW) - degree of ionization - lipid solubility. 2- Binding to plasma proteins: ... 3- Passage across barriers:
## locator_type
printed_page
## locator_page
7
## locator_section
Factors affecting distribution of drugs
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The book's own three-item list, quoted with its headings so the count is visible. The concept's label also names blood flow and tissue affinity; the book does not put either in this list, and tissue affinity appears instead as the fourth distribution pattern, cited above.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DISTRIBUTION-FACTORS-02
## claim_id
CLM-FND-DISTRIBUTION-FACTORS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
So, drugs are carried in blood in 2 forms: a) Free form: Pharmacologically active - diffusible ... metabolized - excreted. b) Bound form: inactive, non-diffusible, not metabolized and not excreted (act as reservoir).
## locator_type
printed_page
## locator_page
7
## locator_section
Binding to plasma proteins — free and bound forms
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The free/bound split, which is the half of this concept that has clinical consequences. The cut removes an em dash the OCR substituted for a hyphen mid-list.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-BARRIER-BBB-01
## claim_id
CLM-FND-BARRIER-PASSAGE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
The blood-brain barrier (BBB) is composed of a capillary basement membrane and three cellular elements: endothelial cells, pericytes, and astrocyte end-feet., all of which aim to shield the brain from harmful substances.
## locator_type
printed_page
## locator_page
7
## locator_section
Passage across barriers — a- Blood Brain Barrier
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Quoted as printed, including the book's doubled punctuation at "end-feet.,". The two sentences that follow it, on non-ionized lipid-soluble drugs crossing and on inflamed meninges, are cited next.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-BARRIER-BBB-02
## claim_id
CLM-FND-BARRIER-PASSAGE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Inflammation (Meningitis) increases permeability of the B.B.B. Penicillins can pass inflamed meninges but NOT normal ones.
## locator_type
printed_page
## locator_page
7
## locator_section
Blood Brain Barrier — permeability
## locator_detail
cached page index 7 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The clinical consequence, and the book's own emphasis on NOT.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-BARRIER-PLACENTA-01
## claim_id
CLM-FND-BARRIER-PASSAGE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
b- Passage to fetus across placental barrier: e The placental barrier acts like a cell membrane. So non-ionized, lipid soluble drugs pass from the mother to the fetus more easily ... c- Passage of drugs through breast milk: e Most drugs administered to lactating women are detectable in milk.
## locator_type
printed_page
## locator_page
8
## locator_section
Passage across barriers — b- placental, c- breast milk
## locator_detail
cached page index 8 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The placental and milk barriers. The stray "e" characters are the OCR's rendering of the book's bullet glyph and are quoted as extracted rather than tidied away. The cut removes the two worked examples of drugs crossing the placenta, which name drugs and effects this OCR layer does not render cleanly enough to reproduce.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-METABOLISM-SITES-01
## claim_id
CLM-FND-METABOLISM-SITES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
The aim of drug metabolism in most of the cases is to change active lipid soluble drugs to inactive water soluble metabolites to be easily excreted. Site of Metabolism (Organs): - Liver (Hepatic) is the main site for biotransformation
## locator_type
printed_page
## locator_page
8
## locator_section
III) Metabolism (Biotransformation) — aim and site
## locator_detail
cached page index 8 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The purpose of metabolism and its main organ. The next line, naming what the lungs metabolise, is not quoted: the OCR renders "angiotensin I" as "angiotensin |", with a pipe for the Roman numeral.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-METABOLISM-SITES-02
## claim_id
CLM-FND-METABOLISM-SITES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
- The kidneys convert vitamin D to a more active form. - Plasma choline esterases inactivate acetylcholine and other similar compounds.
## locator_type
printed_page
## locator_page
9
## locator_section
Site of Metabolism — extrahepatic
## locator_detail
cached page index 9 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Two of the extrahepatic sites, in the two lines the OCR renders cleanly. The skin and gut flora lines on the same page are damaged — "Inthe presence of UV light", and a run of digits where the gut flora item's label should be — so they are named in the claim and not quoted.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-METABOLISM-PHASES-01
## claim_id
CLM-FND-METABOLISM-PHASES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Types of Metabolic reactions: A) Phase-I (Non-Synthetic) Oxidation, Reduction & Hydrolysis
## locator_type
printed_page
## locator_page
9
## locator_section
Types of Metabolic reactions
## locator_detail
cached page index 9 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The three Phase I reactions. The book's heading for the second phase, quoted in the next citation, reads "Phase-il" — a lower-case L and I where a Roman II belongs, one of the clearest OCR failures in the file.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-METABOLISM-PHASES-02
## claim_id
CLM-FND-METABOLISM-PHASES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
B) Phase-il (Synthetic, Conjugation): - Usually leads to inactivation
## locator_type
printed_page
## locator_page
9
## locator_section
Phase II and the order of the phases
## locator_detail
cached page index 9 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Quoted as extracted: "Phase-il" is the OCR's reading of "Phase-II".
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-METABOLISM-PHASES-03
## claim_id
CLM-FND-METABOLISM-PHASES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
N.B) Most drugs undergo phase | then Phase || metabolism.
## locator_type
printed_page
## locator_page
9
## locator_section
Order of the phases
## locator_detail
cached page index 9 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Quoted as extracted, pipes and all: the OCR renders Roman I as "|" and Roman II as "||". The sentence that follows names a drug that reverses the order; it is not reproduced, since the drug name sits in the same damaged run.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-MICROSOMAL-01
## claim_id
CLM-FND-MICROSOMAL-ENZYMES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Enzymes responsible for drug metabolism 1- Site Smooth endoplasmic reticulum Cytoplasm, Mitochondria, etc. 2- Organs Mainly Hepatic All organs 3- Phase-l Oxidation / Reduction Oxidation/Reduction & Hydrolysis (Cytochrome P-450) 4- Phase-Il Glucuronidation ONLY All Except Glucuronic acid 5- Induction Inducible NOT inducible 6- Substrates Usually lipophilic Lipophilic & hydrophilic
## locator_type
printed_page
## locator_page
9
## locator_section
Enzymes responsible for drug metabolism
## locator_detail
cached page index 9 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
A TWO-COLUMN COMPARISON TABLE, quoted tangled as the text layer interleaves it. Each numbered row carries the microsomal value first and the non-microsomal value second: site, smooth endoplasmic reticulum against cytoplasm and mitochondria; organs, mainly hepatic against all organs; and so on down to substrates. Row 5, "Induction Inducible NOT inducible", is the discriminator the EOY paper asks about. "Phase-l" and "Phase-Il" are the OCR's readings of Phase-I and Phase-II.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-INDUCTION-01
## claim_id
CLM-FND-ENZYME-INDUCTION-INHIBITION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
A-Hepatic microsomal enzyme inducers (Activators): Are drugs which increase the amount and activity of hepatic microsomal enzymes.
## locator_type
printed_page
## locator_page
10
## locator_section
Factors affecting metabolizing enzyme activity
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition of an inducer. The effect line beneath it is broken by an Arabic fragment where an arrow was, so the effect is cited from printed page 24 instead.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-INDUCTION-02
## claim_id
CLM-FND-ENZYME-INDUCTION-INHIBITION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
B-Hepatic microsomal enzyme inhibitors: Are drugs which inhibit activity of hepatic microsomal enzymes.
## locator_type
printed_page
## locator_page
10
## locator_section
Factors affecting metabolizing enzyme activity — inhibitors
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition of an inhibitor, the mirror of the span above.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-INDUCTION-03
## claim_id
CLM-FND-ENZYME-INDUCTION-INHIBITION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
a) Enzyme Induction: HME Inducers increase metabolism of the inducer & co- administered drugs ... b) Enzyme Inhibition: HME Inhibitors decrease metabolism of their own & co- administered drugs
## locator_type
printed_page
## locator_page
24
## locator_section
Pharmacokinetic drug interactions — 3- Metabolism
## locator_detail
cached page index 24 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The effects of both, stated in one place and in a passage the OCR left intact. Note the book's own point, made twice: an inducer and an inhibitor each act on their OWN metabolism as well as on other drugs'. The line-break hyphen in "co- administered" is as extracted. The cuts remove the worked drug examples.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RENAL-EXCRETION-01
## claim_id
CLM-FND-RENAL-EXCRETION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
2- Renal excretion is the result of glomerular filtration and active tubular secretion & reabsorption. 3- Passive Glomerular filtration for water soluble non-bound drugs with M.W. < 500 daltons. 4- Active Tubular Excretion (Saturable & Site for competition & Drug Interaction):
## locator_type
printed_page
## locator_page
10
## locator_section
IV) Excretion — A) Renal
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
All three processes with the properties that distinguish them. The 500-dalton figure is corroborated by nothing else in the book, so the claim states it as the book's own without asserting it independently.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-NON-RENAL-01
## claim_id
CLM-FND-NON-RENAL-EXCRETION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Removal of a drug from the body may occur via a number of routes, the most important being through the kidney into the urine. Other routes include: the GIT, skin glands, and the lungs.
## locator_type
printed_page
## locator_page
10
## locator_section
IV) Excretion — routes
## locator_detail
cached page index 10 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The book's own summary of the non-renal routes, before it takes each in turn.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-NON-RENAL-02
## claim_id
CLM-FND-NON-RENAL-EXCRETION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
3- Bile: some drugs may be secreted in the bile by a mechanism similar to that of renal tubular drug secretion. Such drugs reach the intestines in the bile and can have one or more of the following fates: - Be excreted in large intestine or - Be absorbed again from the small intestines and so undergo enterohepatic circulation.
## locator_type
printed_page
## locator_page
11
## locator_section
IV) Excretion — C) The Alimentary Tract, bile
## locator_detail
cached page index 11 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Biliary excretion and enterohepatic circulation, which is the one non-renal route with a mechanism rather than just a name. The example drug that follows is not quoted.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-NON-RENAL-03
## claim_id
CLM-FND-NON-RENAL-EXCRETION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
2- Milk”: May affect suckling baby e.g. purgatives
## locator_type
printed_page
## locator_page
11
## locator_section
IV) Excretion — D) Skin Glands
## locator_detail
cached page index 11 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Quoted as extracted, including the stray closing curly quotation mark the OCR has put after "Milk". This is the hazard half of the concept.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-FIRST-ZERO-ORDER-01
## claim_id
CLM-FND-FIRST-ZERO-ORDER-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Kinetics: 1- Kinetics of drug (ADME) are | 1- Limited capacity of drug’s kinetics due PROPORTIONAL to its concentration. to SATURATION of involved enzyme 2- Fixed FRACTION (%) of the drug is | &/or carrier = Rate of kinetics is Fixed eliminated per unit time. and NOT proportional to drug 3- LINEAR drug disappearance curve. concentration. 4- CONSTANT t12.
## locator_type
printed_page
## locator_page
12
## locator_section
Fundamental Principles of Pharmacokinetics — Kinetics
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
A TWO-COLUMN TABLE, quoted tangled exactly as the text layer interleaves it, and the tangling is unusually visible here because the column rule survives as a pipe character. Read the first-order column: kinetics proportional to concentration, a fixed FRACTION eliminated per unit time, a LINEAR disappearance curve, a CONSTANT half-life. Read the zero-order column: limited capacity due to SATURATION of the enzyme or carrier, so the rate is fixed and NOT proportional to concentration. "t12" is the OCR's reading of t½. The book's own capitalisation of FRACTION and CONSTANT is preserved, because it is the book teaching the contrast.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-FIRST-ZERO-ORDER-02
## claim_id
CLM-FND-FIRST-ZERO-ORDER-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
2- Fixed AMOUNT of the drug is 5- AUC is PROPORTIONAL to drug eliminated per unit time.
## locator_type
printed_page
## locator_page
12
## locator_section
Kinetics — zero order, fixed amount
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The other half of the contrast, and the clearest single illustration of why these spans are quoted tangled: "Fixed AMOUNT of the drug is ... eliminated per unit time" is the zero-order column, and the "5- AUC is PROPORTIONAL to drug" that sits in the middle of the sentence is the first-order column's fifth row, interleaved line by line. Untangling it would produce a sentence the page does not contain.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-HALF-LIFE-01
## claim_id
CLM-FND-PLASMA-HALF-LIFE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1- Time needed for the plasma drug concentration to ... decrease to one half.
## locator_type
printed_page
## locator_page
12
## locator_section
Plasma Half Life
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition, which EOY 2025 asks students to write out for one mark. The cut removes a fragment of the adjacent figure's axis label, which the text layer has dropped into the middle of the sentence.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-HALF-LIFE-02
## claim_id
CLM-FND-PLASMA-HALF-LIFE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
4- ti2 increases with increase in drug 7- Examples: concentration.
## locator_type
printed_page
## locator_page
12
## locator_section
Kinetics — zero order, rising half-life
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The zero-order column's fourth row, which is what makes the half-life constant only under first-order elimination. "ti2" is the OCR's reading of t½ — a different misreading of the same symbol the table renders as "t12" two rows earlier, on the same page. And this row is tangled too: the "7- Examples:" sitting between "in drug" and "concentration." is the first-order column's seventh row, interleaved into the middle of the zero-order sentence. It is quoted where it falls rather than lifted out.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-HALF-LIFE-APPLICATIONS-01
## claim_id
CLM-FND-HALF-LIFE-APPLICATIONS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
4- Most of the drug (> 95%) disappears from the body within 4-5 t12 after stopping its intake:
## locator_type
printed_page
## locator_page
13
## locator_section
Plasma Half Life — clinical applications
## locator_detail
cached page index 13 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The emptying half of the concept. The line beneath it in the book is a halving series that the OCR has scrambled into a row of arrows and percentages; it is not quoted.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-HALF-LIFE-APPLICATIONS-02
## claim_id
CLM-FND-HALF-LIFE-APPLICATIONS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
6- The t % is useful to determine the frequency & route of drug administration.
## locator_type
printed_page
## locator_page
13
## locator_section
Plasma Half Life — frequency and route
## locator_detail
cached page index 13 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Quoted as extracted: "t %" is the OCR's reading of t½. This is the practical consequence the ILO asks for.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-STEADY-STATE-01
## claim_id
CLM-FND-STEADY-STATE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
To maintain a steady state concentration (Css) the dose regimen must be designed to replace the medication at approximately the rate with which it is eliminated (rate of drug administration = rate of drug elimination).
## locator_type
printed_page
## locator_page
12
## locator_section
Steady state concentration
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition, with the equality stated explicitly in the book's own parenthesis — which is exactly what EOY 2025 question 15 turns on. One of the least damaged passages in the book.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-STEADY-STATE-02
## claim_id
CLM-FND-STEADY-STATE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
The most accurate way to do this is with a constant intravenous infusion, but an attempt to maintain an approximate steady state can be reached with repeated doses.
## locator_type
printed_page
## locator_page
12
## locator_section
Steady state — how it is achieved
## locator_detail
cached page index 12 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
How steady state is reached in practice, and the book's own hedge that repeated dosing only approximates it.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-MECHANISMS-01
## claim_id
CLM-FND-DRUG-ACTION-MECHANISMS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Possible Mechanisms of Action of Drugs: Drugs may act through one or more of the following mechanisms: 1. Physical: ... 3. Interference with cell division: e.g. anti-cancer drugs 4. Interference with ametabolic pathway: e.g. sulfonamides compete with PABA in bacteria leading to inhibition of synthesis of folic acid. 5. Inhibition of enzymes: Physostigmine (inhibits Cholinesterase), Aminophylline (inhibits Phosphodiesterase, PDE) & Aspirin (inhibits Cyclooxygenase, COX).
## locator_type
printed_page
## locator_page
13
## locator_section
Pharmacodynamics — Possible Mechanisms of Action of Drugs
## locator_detail
cached page index 13 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Mechanisms 1 and 3 to 5. "ametabolic" is the OCR running "a metabolic" together, quoted as extracted. The cut removes the worked examples under Physical and the whole of Chemical, where the OCR has damaged two chemical formulae.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-MECHANISMS-02
## claim_id
CLM-FND-DRUG-ACTION-MECHANISMS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
7. Inhibiting membrane carriers: ... 8. Action on specific receptors: Most common mechanism of drug action.
## locator_type
printed_page
## locator_page
14
## locator_section
Possible Mechanisms of Action of Drugs — 6 to 8
## locator_detail
cached page index 14 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Mechanisms 7 and 8, and the book's own ranking of receptor action as the most common. Mechanism 6, on ionic channels, is on the same page but its line carries a trailing underscore and two em dashes the OCR substituted for arrows; it is named in the claim and not quoted.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RECEPTOR-DEF-01
## claim_id
CLM-FND-RECEPTOR-AFFINITY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Definition of a receptor: A receptor is a chemo-sensitive and chemo-selective protein macromolecule that interacts specifically with a ligand (drug, transmitter or hormone) to produce a biological response. The receptor may be located in the cell membrane, the cytoplasm or the nucleus of the cell.
## locator_type
printed_page
## locator_page
14
## locator_section
Action on specific receptors — Definition of a receptor
## locator_detail
cached page index 14 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The full definition. One of the least damaged passages in the book, and the one EOY 2024 question 21 is built on.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RECEPTOR-DEF-02
## claim_id
CLM-FND-RECEPTOR-AFFINITY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
* Affinity: the ability of drug to fit onto the receptor to form drug-receptor (D-R) complex. * Efficacy OR Intrinsic activity (IA): ability of drug-receptor (D-R) complex to evoke a response.
## locator_type
printed_page
## locator_page
14
## locator_section
Affinity and efficacy
## locator_detail
cached page index 14 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The two definitions in the book's own words and in adjacent lines, which is what makes the distinction examinable: affinity is fitting, efficacy is evoking.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-POTENCY-01
## claim_id
CLM-FND-POTENCY-VS-EFFICACY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
4- Useful to compare drugs: - Efficacy» Compare Emax (B>A>C) - Potency Compare the doses that produce the same Submaximal effect (A>B>C).
## locator_type
printed_page
## locator_page
15
## locator_section
Concentration-Response Curve of Drugs — 4- Useful to compare drugs
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The book's own instruction for reading the two properties off the curve, and its own worked ordering in which the drug rankings for efficacy and potency deliberately differ. "Efficacy»" carries an OCR artefact where an arrow was.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-LIGAND-TYPES-01
## claim_id
CLM-FND-LIGAND-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Types of Ligands: Drugs are classified, according to the nature of their interaction with receptors, into: > Agonists: drugs that have affinity, efficacy and rapid dissociation. > Antagonists: drugs that block receptors. They have affinity, no efficacy and slow dissociation. > Partial agonists: - Produce a lower response, at full receptor occupancy, than do full agonists. - Partial agonists can behave like a weak agonist in absence of agonist and behave like antagonist in the presence of full agonist.
## locator_type
printed_page
## locator_page
15
## locator_section
Types of Ligands
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
THE BOOK'S COMPLETE LIST OF LIGAND TYPES, and it names three. The concept's label also names an inverse agonist; the string "inverse" does not occur anywhere in this book's 34 cached pages, so the claim covers the three the book teaches and no fourth was invented to match the label.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-COMPETITIVE-01
## claim_id
CLM-FND-COMPETITIVE-ANTAGONISM-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
A) Competitive antagonists: ... Antagonists bind REVERSIBLY with the receptors. ... Antagonists can be DISPLACED by excess agonists
## locator_type
printed_page
## locator_page
15
## locator_section
TYPES OF ANTAGONISTS — A) Competitive antagonists
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Reversible binding and displaceability, the two properties that make the block surmountable. The cuts remove the book's bullet glyphs, which the OCR has rendered as stray guillemets.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-COMPETITIVE-02
## claim_id
CLM-FND-COMPETITIVE-ANTAGONISM-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
NO effect on the maximum response (E-max) = Same Efficacy
## locator_type
printed_page
## locator_page
15
## locator_section
Competitive antagonists — effect on Emax
## locator_detail
cached page index 15 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The half that distinguishes competitive from non-competitive antagonism, and the half EOY 2025 question 19 asks for.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-COMPETITIVE-03
## claim_id
CLM-FND-COMPETITIVE-ANTAGONISM-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
B) Non-competitive antagonists: e Antagonist is NOT displaced by agonist > Non-surmountable block.
## locator_type
printed_page
## locator_page
16
## locator_section
TYPES OF ANTAGONISTS — B) Non-competitive antagonists
## locator_detail
cached page index 16 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The mirror property. The stray "e" is the OCR's rendering of the bullet and is quoted as extracted.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-COMPETITIVE-04
## claim_id
CLM-FND-COMPETITIVE-ANTAGONISM-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Decrease the maximum response to the agonist (E-max)
## locator_type
printed_page
## locator_page
16
## locator_section
Non-competitive antagonists — effect on Emax
## locator_detail
cached page index 16 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The reduction in Emax, which is the single observation that identifies a non-competitive antagonist on a dose-response experiment.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-IRREVERSIBLE-01
## claim_id
CLM-FND-IRREVERSIBLE-ANTAGONISM-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
- Reversible: Block end by metabolism of antagonist ... - Irreversible: Bind covalently, the block end by resynthesis of new receptors
## locator_type
printed_page
## locator_page
25
## locator_section
Pharmacodynamic drug interactions — B- Non-competitive antagonism
## locator_detail
cached page index 25 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Taken from printed page 25 rather than from the antagonist chapter on printed page 16, where the same contrast is set out in a two-column table whose bullet glyphs the OCR has turned into Arabic-Indic digits. This page states it in running prose and is undamaged. The cuts remove the worked drug examples.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RECEPTOR-TYPES-01
## claim_id
CLM-FND-RECEPTOR-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
The receptor has two main functions: ligand binding and generating effector response by interacting with closely associated cellular proteins called signaling systems. There are 4 types of receptors:
## locator_type
printed_page
## locator_page
17
## locator_section
Types of receptors and signal transduction mechanism
## locator_detail
cached page index 17 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The count, which is what EOY 2025 question 4 asks for over four marks. The figure that follows carries the four names and is too damaged by the OCR to quote; each type is cited from its own prose section instead.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RECEPTOR-TYPES-02
## claim_id
CLM-FND-RECEPTOR-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
(A) Ligand gated ionic channel receptors: e They are membrane receptors located on the gate of ionic channels. e Binding of the ligand to the receptor will lead to a conformational change in the receptor and change in cell membrane permeability to ions.
## locator_type
printed_page
## locator_page
17
## locator_section
(A) Ligand gated ionic channel receptors
## locator_detail
cached page index 17 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The first type and its mechanism. Its latency, "Milliseconds between binding of the ligand and cellular response", is on the same page and is quoted next.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RECEPTOR-TYPES-03
## claim_id
CLM-FND-RECEPTOR-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Milliseconds between binding of the ligand and cellular response
## locator_type
printed_page
## locator_page
17
## locator_section
(A) Ligand gated ionic channel receptors — latency
## locator_detail
cached page index 17 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The fastest of the four timescales, and the anchor of the axis the concept is built on.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RECEPTOR-TYPES-04
## claim_id
CLM-FND-RECEPTOR-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Few seconds - minutes between binding of the ligand and the cellular response:
## locator_type
printed_page
## locator_page
18
## locator_section
(B) G. protein-coupled receptors — latency
## locator_detail
cached page index 18 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The second timescale.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RECEPTOR-TYPES-05
## claim_id
CLM-FND-RECEPTOR-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
(C) Enzyme (Tyrosine kinase)-linked receptors: e They are polypeptide receptors consisting of an extracellular ligand-binding domain
## locator_type
printed_page
## locator_page
18
## locator_section
(C) Enzyme (Tyrosine kinase)-linked receptors
## locator_detail
cached page index 18 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The third type. Its two outputs run on the same page, non-genomic in seconds to minutes and genomic over hours, which is why this one receptor spans two of the four timescales.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-RECEPTOR-TYPES-06
## claim_id
CLM-FND-RECEPTOR-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
(D) Gene-active intracellular receptors (DNA linked receptors): e They are cytosolic or nuclear receptors that modulate the transcription of genes in the nucleus leading to change in protein synthesis. ... Delayed lasting effect (hours between binding of the ligand and cellular response).
## locator_type
printed_page
## locator_page
18
## locator_section
(D) Gene-active intracellular receptors — latency
## locator_detail
cached page index 18 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The fourth type and the slowest timescale, completing the axis. The cut removes the worked list of lipid-soluble ligands.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ADR-CLASS-01
## claim_id
CLM-FND-ADR-CLASSIFICATION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Adverse Drug Reactions A noxious and unintended response to a medicine. (European Medicines Agency definition) 1) TYPE A (Augmented or predictable undesirable adverse effects):
## locator_type
printed_page
## locator_page
19
## locator_section
Adverse Drug Reactions — definition and Type A
## locator_detail
cached page index 19 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition, which the book attributes to the European Medicines Agency, and the first of the five types.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ADR-CLASS-02
## claim_id
CLM-FND-ADR-CLASSIFICATION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
ll) Type B (Bizarre or unpredictable adverse effects):
## locator_type
printed_page
## locator_page
20
## locator_section
Adverse Drug Reactions — Type B
## locator_detail
cached page index 20 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Quoted as extracted: "ll)" is the OCR reading two lower-case Ls where the book prints Roman II.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ADR-CLASS-03
## claim_id
CLM-FND-ADR-CLASSIFICATION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
lll) Type © (Chronic effects): Effects of prolonged use of a drug:
## locator_type
printed_page
## locator_page
21
## locator_section
Adverse Drug Reactions — Type C
## locator_detail
cached page index 21 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Quoted as extracted, and this is the single most damaged heading in the file: "lll)" for Roman III and "Type ©" — a copyright sign — for Type C. Corrected silently it would look like a clean transcription of a page that does not read that way.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ADR-CLASS-04
## claim_id
CLM-FND-ADR-CLASSIFICATION-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
IV) Type D (Delayed effects): Delayed effects appearing after long time, even after stopping the use of the drug. ... V) Type E (End of Use Effect): These are adverse effects of sudden stopping of drug after long term treatment, include:
## locator_type
printed_page
## locator_page
23
## locator_section
Adverse Drug Reactions — Types D and E
## locator_detail
cached page index 23 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The last two types, whose Roman numerals the OCR happens to have read correctly where it failed on II and III. The cut removes the teratogenicity and mutagenicity subsections, cited separately.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ADR-TYPE-A-01
## claim_id
CLM-FND-ADR-TYPE-A-B-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1) TYPE A (Augmented or predictable undesirable adverse effects): Predictable undesirable effects related to the normal pharmacological actions of the drug:
## locator_type
printed_page
## locator_page
19
## locator_section
TYPE A — definition
## locator_detail
cached page index 19 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The defining property: a Type A reaction is the drug's own pharmacology, taken too far.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ADR-TYPE-B-01
## claim_id
CLM-FND-ADR-TYPE-A-B-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
ll) Type B (Bizarre or unpredictable adverse effects): 1- Allergy (Hypersensitivity): - Unpredictable abnormal response to drugs due to immune reaction.
## locator_type
printed_page
## locator_page
20
## locator_section
Type B — definition and allergy
## locator_detail
cached page index 20 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The contrasting property, and the first of the two Type B reactions.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ALLERGY-01
## claim_id
CLM-FND-ALLERGY-IDIOSYNCRASY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1- Allergy (Hypersensitivity): - Unpredictable abnormal response to drugs due to immune reaction. - The drug or its metabolites may act as an antigen or a hapten.
## locator_type
printed_page
## locator_page
20
## locator_section
Type B — 1- Allergy (Hypersensitivity)
## locator_detail
cached page index 20 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The immune mechanism, which is what separates allergy from every other adverse reaction in the list.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ALLERGY-02
## claim_id
CLM-FND-ALLERGY-IDIOSYNCRASY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
- Does not happen upon the first exposure to the drug.
## locator_type
printed_page
## locator_page
20
## locator_section
Allergy — first exposure
## locator_detail
cached page index 20 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Set against the idiosyncrasy span below, this is the discriminator the EOY paper asks for: allergy needs a prior exposure and idiosyncrasy does not.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-IDIOSYNCRASY-01
## claim_id
CLM-FND-ALLERGY-IDIOSYNCRASY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
2- Idiosyncrasy (Pharmacogenetics): > Unpredictable abnormal response due to genetic abnormality. > Occurs on first exposure.
## locator_type
printed_page
## locator_page
20
## locator_section
Type B — 2- Idiosyncrasy (Pharmacogenetics)
## locator_detail
cached page index 20 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The genetic mechanism and the first-exposure property, in two adjacent lines.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-SUPERSENSITIVITY-01
## claim_id
CLM-FND-ALLERGY-IDIOSYNCRASY-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
4- Supersensitivity: - An exaggerated pharmacological action of the drug in response to small therapeutic dose of the drug in some individuals due to tissue hyper-responsiveness (supersensitivity).
## locator_type
printed_page
## locator_page
19
## locator_section
TYPE A — 4- Supersensitivity
## locator_detail
cached page index 19 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Supersensitivity, which EOY 2025 asks students to define for one mark. Note where the book files it: under TYPE A, not with allergy and idiosyncrasy under Type B, because it is the drug's normal action exaggerated rather than a bizarre one.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-TYPE-C-01
## claim_id
CLM-FND-ADR-TYPE-C-D-E-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
lll) Type © (Chronic effects): Effects of prolonged use of a drug: 1- Tolerance:
## locator_type
printed_page
## locator_page
21
## locator_section
Type C (Chronic effects)
## locator_detail
cached page index 21 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Type C and the first of its three members. Quoted with its OCR damage, as above.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-TYPE-D-01
## claim_id
CLM-FND-ADR-TYPE-C-D-E-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
2- Mutagenicity: - The ability to induce gene mutations in somatic or germ cells. - In somatic cells > Carcinogenicity ... - In germ cells > Infertility or Teratogenicity
## locator_type
printed_page
## locator_page
23
## locator_section
Type D — 2- Mutagenicity
## locator_detail
cached page index 23 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Mutagenicity, which EOY 2025 asks students to define for one mark, and the book's own split by cell type. The cut removes a worked drug example.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-TYPE-E-01
## claim_id
CLM-FND-ADR-TYPE-C-D-E-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
V) Type E (End of Use Effect): These are adverse effects of sudden stopping of drug after long term treatment, include:
## locator_type
printed_page
## locator_page
23
## locator_section
Type E (End of Use Effect)
## locator_detail
cached page index 23 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition of the last type. What follows is a list of withdrawal syndromes and rebound phenomena naming specific drug classes; those are not quoted, since they are drug names from an OCR layer.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-TOLERANCE-01
## claim_id
CLM-FND-ACQUIRED-TOLERANCE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
B) Acquired Tolerance: - Progressive decrease of drug sensitivity as a result of continued administration.
## locator_type
printed_page
## locator_page
22
## locator_section
Type C — B) Acquired Tolerance
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition. The book distinguishes this from congenital or inborn tolerance, which it treats on the previous printed page and which the concept does not cover.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-TOLERANCE-02
## claim_id
CLM-FND-ACQUIRED-TOLERANCE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Mechanism of Acquired Tolerance: | Change in Kinetics or Dynamics 1- Pharmacokinetic changes: - Decreased absorption or HME inducers 2- Pharmacodynamic changes: - Down-regulation of receptors: e.g. beta-2 & opioid receptors - Antibody formation: e.g. insulin
## locator_type
printed_page
## locator_page
22
## locator_section
Mechanism of Acquired Tolerance
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Both mechanisms, which is what EOY 2025 question 23 turns on. The stray pipe after the heading is the table rule the OCR has kept; it is quoted where it falls. "HME" is the book's own abbreviation for hepatic microsomal enzyme, used unexpanded here and expanded on printed pages 10 and 24.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DEPENDENCE-01
## claim_id
CLM-FND-DRUG-DEPENDENCE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
a- Habituation = Psychic Dependence : - The drive for continuous administration of the drug to produce pleasure, sense of well-being, to enhance cognitive functions (attention, working memory) and to function good.
## locator_type
printed_page
## locator_page
22
## locator_section
2- Drug Dependence — a- Habituation
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The first subtype. The book's spaced colon and its "to function good" are as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DEPENDENCE-02
## claim_id
CLM-FND-DRUG-DEPENDENCE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
b- Physical Dependence: - A state of body adaptation to the presence of the drug and abrupt cessation produces an intense drug-specific withdrawal syndrome. - Withdrawal symptoms are usually the reverse of what the addicting substance does.
## locator_type
printed_page
## locator_page
22
## locator_section
2- Drug Dependence — b- Physical Dependence
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The second subtype, with the rule that makes withdrawal syndromes predictable from the drug's own action.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DEPENDENCE-03
## claim_id
CLM-FND-DRUG-DEPENDENCE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
c- Addiction or Substance Dependence: - A neuropsychological disorder developed arising from repeated or continuous use of a substance and consisting of a strong internal drive to use that substance.
## locator_type
printed_page
## locator_page
22
## locator_section
2- Drug Dependence — c- Addiction
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The third subtype. The book's "disorder developed arising from" is as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DEPENDENCE-04
## claim_id
CLM-FND-DRUG-DEPENDENCE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
4- Tolerance, physical dependence and withdrawal phenomena may be expected, however, “impaired control’ or “increasing priority” should be present.
## locator_type
printed_page
## locator_page
22
## locator_section
Addiction — essential features
## locator_detail
cached page index 22 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The book's own qualification, and the reason addiction is not simply the sum of the other two: tolerance and physical dependence may accompany it but are not what defines it. The mismatched quotation marks around "impaired control'" are as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DI-TYPES-01
## claim_id
CLM-FND-DRUG-INTERACTION-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Drug Interactions [DI] Drug Interactions are altered pharmacological responses due to multiple drugs acting concurrently. These can be desired (beneficial) or undesired (harmful).
## locator_type
printed_page
## locator_page
24
## locator_section
Drug Interactions [DI] — definition
## locator_detail
cached page index 24 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition, including the book's point that an interaction is not necessarily harmful.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DI-TYPES-02
## claim_id
CLM-FND-DRUG-INTERACTION-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Types of drug interactions: 1) Pharmaceutical Il) Pharmacokinetic _ Ill) Pharmacodynamic
## locator_type
printed_page
## locator_page
24
## locator_section
Types of drug interactions
## locator_detail
cached page index 24 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The three types on one line, quoted as extracted with the OCR's "Il)" and "Ill)" for Roman II and III and the stray underscore between the second and third.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DI-TYPES-03
## claim_id
CLM-FND-DRUG-INTERACTION-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1) Pharmaceutical drug interactions These are drug interaction occurring outside the body before drug administration (in vitro), as a result of physical or chemical reaction between the drugs.
## locator_type
printed_page
## locator_page
24
## locator_section
1) Pharmaceutical drug interactions
## locator_detail
cached page index 24 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The one type that happens before the patient receives anything, which is what makes it a separate category rather than a kind of pharmacokinetic interaction.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-DI-TYPES-04
## claim_id
CLM-FND-DRUG-INTERACTION-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Ill) Pharmacodynamic drug interactions Drug interactions occur at sites of action, receptor sites or secondary physiological mechanisms; leading to changes in drug responses.
## locator_type
printed_page
## locator_page
25
## locator_section
III) Pharmacodynamic drug interactions
## locator_detail
cached page index 25 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The third type. "Ill)" is the OCR again.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-COMBINATION-01
## claim_id
CLM-FND-DRUG-COMBINATION-RESULTS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
* Results of drug interactions: 1- Addition or Summation (1+1=2): The resultant action equals the sum of individual drug actions ... 2- Synergism (1+1>2): the resultant action exceeds the sum of individual drug actions ... 3- Potentiation (1+0>1): one drug has no action (0) but increases effect of another drug (>1) ... 4- Reversal of action:
## locator_type
printed_page
## locator_page
25
## locator_section
Results of drug interactions
## locator_detail
cached page index 25 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The first four results with the book's own arithmetic shorthand, which is what makes them distinguishable rather than synonyms. The cuts remove the worked drug pairings; the arithmetic in parentheses is the book's own notation and not a measured quantity, so it is quoted where drug names are not.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-COMBINATION-02
## claim_id
CLM-FND-DRUG-COMBINATION-RESULTS-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
5-Antagonism: occurs on using drugs of opposing actions.
## locator_type
printed_page
## locator_page
25
## locator_section
Results of drug interactions — antagonism
## locator_detail
cached page index 25 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The fifth result, which the book lists alongside the other four and then subdivides into chemical, physiological and pharmacological.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ANTAGONISM-01
## claim_id
CLM-FND-CHEMICAL-PHYSIOLOGICAL-ANTAGONISM-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
a)_Chemical: one drug reacts chemically with an active drug forming an inactive compound.
## locator_type
printed_page
## locator_page
25
## locator_section
Types of antagonism — a) Chemical
## locator_detail
cached page index 25 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Chemical antagonism, in which no receptor is involved at all. The stray underscore after "a)" is the OCR's. The worked example following it is a chemical equation the OCR has damaged and is not quoted.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ANTAGONISM-02
## claim_id
CLM-FND-CHEMICAL-PHYSIOLOGICAL-ANTAGONISM-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
b)_ Physiological: Two agonists acting on 2 different receptors producing opposite actions) ... c) Pharmacological: 2 drugs acting on 1 receptor 1-Competitive. 2-Non-Competitive
## locator_type
printed_page
## locator_page
26
## locator_section
Types of antagonism — b) Physiological and c) Pharmacological
## locator_detail
cached page index 26 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
Physiological antagonism — two receptors — set directly against pharmacological antagonism — one receptor — which is the distinction EOY 2024 asks students to write out. The unmatched closing bracket after "opposite actions)" is the book's own and is quoted as printed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-THERAPEUTIC-INDEX-01
## claim_id
CLM-FND-THERAPEUTIC-INDEX-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
*Therapeutic Index (Tl): It is the ratio of LDso (the dose that produces toxicity in 50% of the cases) to the EDs0 (the dose that produces an effective response in 50% of the cases)
## locator_type
printed_page
## locator_page
26
## locator_section
Dosage of Drugs (Posology) — Therapeutic Index
## locator_detail
cached page index 26 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition. Quoted as extracted: the OCR renders LD50 as "LDso" and ED50 as "EDs0" — a lower-case S for the 5 in one and for the 0 in the other, on the same line. The 50 per cent figures are spelled out in the book's own parentheses, which is what makes the mangled subscripts readable rather than ambiguous, and is why this span is quotable at all.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-THERAPEUTIC-INDEX-02
## claim_id
CLM-FND-THERAPEUTIC-INDEX-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Therapeutic Index: is a measure of a drug’s safety, because a larger value indicates a wide margin between doses that are effective and doses that are toxic. The Therapeutic Window, a more clinically relevant index of safety, describes the dosage range between the minimum effective therapeutic dose, and the minimum toxic dose.
## locator_type
printed_page
## locator_page
26
## locator_section
Therapeutic Index and Therapeutic Window
## locator_detail
cached page index 26 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
What the index measures — safety, not potency — and the book's own judgement that the therapeutic window is the more clinically relevant of the two.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-THERAPEUTIC-INDEX-03
## claim_id
CLM-FND-THERAPEUTIC-INDEX-01
## resource_id
src_b4f736e3bd809dbee187
## evidence_role
local_curriculum
## support_span
50. To distinguish between the therapeutic index and the therapeutic window as measures of drug safety
## locator_type
page
## locator_page
3
## locator_section
ILOs of general pharmacology — ILO 50
## locator_detail
cached page index 2 of scripts/kasr/extract/pagetext/src_b4f736e3bd809dbee187.json
## context_note
The department's own objective, and worth recording for what it lacks: ILO 50 carries no tick in any of the SAQ, MCQ or OSPE columns, which is why the concept batch marks this one orientation_ilo_no_tick where its neighbours carry a tick.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ROUTES-01
## claim_id
CLM-FND-ROUTES-ENUMERATED-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1- Oral route Definition: Administration of the drug to be swallowed through the mouth. ... 2- Sublingual / Buccal route
## locator_type
printed_page
## locator_page
28
## locator_section
Routes of administration — 1- Oral and 2- Sublingual / Buccal
## locator_detail
cached page index 28 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The first two routes in the numbered series.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ROUTES-02
## claim_id
CLM-FND-ROUTES-ENUMERATED-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
3- Rectal route
## locator_type
printed_page
## locator_page
29
## locator_section
Routes of administration — 3- Rectal route
## locator_detail
cached page index 29 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The third route.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ROUTES-03
## claim_id
CLM-FND-ROUTES-ENUMERATED-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
4. Parenteral routes Dosage forms are enclosed in: 1-Ampules 2-Vials 3- Bottles. 4- Plastic bags.
## locator_type
printed_page
## locator_page
30
## locator_section
Routes of administration — 4. Parenteral routes
## locator_detail
cached page index 30 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The fourth route. THIS IS THE ONLY OCCURRENCE OF THE STRING "enteral" IN THE BOOK, and it is inside "Parenteral": the word "enteral" is never used on its own, which is why the claim states the series the book enumerates rather than the enteral/parenteral/topical trichotomy the concept's label names.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ROUTES-04
## claim_id
CLM-FND-ROUTES-ENUMERATED-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
5- Intra-arterial 1- Diagnostic: the coronary angiography. ... 7- Intra-thecal 1- Spinal anesthesia: 2- Antibiotic administration 8- Intra-articular_joint injection
## locator_type
printed_page
## locator_page
32
## locator_section
Routes of administration — parenteral subdivisions and topical
## locator_detail
cached page index 32 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The parenteral subdivisions. The topical route is on the same page but its heading extracts as "STopicalroute", the numeral and two words run together, so it is named in the claim and quoted only in the span below.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ROUTES-05
## claim_id
CLM-FND-ROUTES-ENUMERATED-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Target: 1- Local effect: on skin, mucous membranes and underlying muscles or joints. 2- Systemic effect: Transdermal Drug Delivery system (TDDS):
## locator_type
printed_page
## locator_page
32
## locator_section
Routes of administration — topical route
## locator_detail
cached page index 32 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The topical route's two targets, quoted from the line below its damaged heading so the route is evidenced without reproducing "STopicalroute" as though it were the book's wording.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ROUTES-06
## claim_id
CLM-FND-ROUTES-ENUMERATED-01
## resource_id
src_b4f736e3bd809dbee187
## evidence_role
local_curriculum
## support_span
53. Classify routes of drug administration
## locator_type
page
## locator_page
3
## locator_section
ILOs of general pharmacology — ILO 53
## locator_detail
cached page index 2 of scripts/kasr/extract/pagetext/src_b4f736e3bd809dbee187.json
## context_note
The department's objective, carrying an MCQ tick. It asks for a classification and does not supply one, which is precisely why the classification had to be taken from the book's own numbering rather than assumed.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ORAL-ROUTE-01
## claim_id
CLM-FND-ORAL-ROUTE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
1- Oral route Definition: Administration of the drug to be swallowed through the mouth.
## locator_type
printed_page
## locator_page
28
## locator_section
1- Oral route — Definition
## locator_detail
cached page index 28 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The definition, which turns on swallowing and so excludes the sublingual and buccal routes that follow it.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ORAL-ROUTE-02
## claim_id
CLM-FND-ORAL-ROUTE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Advantages: Disadvantages: 1- Easy. NOT Suitable for 2- Safe. 1- Emergency situations (delayed onset). 3- Economic. 2- Uncooperative patients: comatose, psychotics, infants & children. 4- Convenient 3- Not in vomiting or severe diarrhea.
## locator_type
printed_page
## locator_page
28
## locator_section
1- Oral route — Advantages and Disadvantages
## locator_detail
cached page index 28 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
A TWO-COLUMN TABLE, quoted tangled as the text layer interleaves it row by row. The left column is the advantages — easy, safe, economic, convenient — and the right column is the disadvantages, headed "NOT Suitable for" and running emergency situations, uncooperative patients, and vomiting or severe diarrhoea. Untangling it would produce a sentence the page does not contain; the column order is given here instead.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-ORAL-ROUTE-03
## claim_id
CLM-FND-ORAL-ROUTE-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
6- Some drugs undergo extensive first pass metabolism:
## locator_type
printed_page
## locator_page
28
## locator_section
1- Oral route — first pass
## locator_detail
cached page index 28 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
The last of the disadvantages, and the one that ties this concept back to bioavailability. The two worked examples beneath it name drugs and are not reproduced.
## confidence
0.9
## counts_as_claim_evidence
no

---

# Item
## id
CIT-108-PHARM-IV-TYPES-01
## claim_id
CLM-FND-IV-TYPES-01
## resource_id
src_af30e4191cb4087f8d3f
## evidence_role
local_curriculum
## support_span
Types of intravenous administration: 1-1.V bolus (shot or push): - Using a syringe, few milliliters are injected rapidly. - Acannula could be used if repeated administration is required. 2- Slow intravenous injection: - as IV shot but given over few minutes (e.g. IV calcium). 3- Intravenous infusion: - Using an intravenous catheter (tube) and a cannula, large volume of I.V. fluids can be administered.
## locator_type
printed_page
## locator_page
31
## locator_section
Parenteral routes — Types of intravenous administration
## locator_detail
cached page index 31 of scripts/kasr/extract/pagetext/src_af30e4191cb4087f8d3f.json
## context_note
All three types in one passage, which is what EOY 2025 asks students to differentiate for 1.5 marks. Quoted as extracted, including "1-1.V" where the numeral and the abbreviation have run together and "Acannula" where the article and the noun have.
## confidence
0.9
## counts_as_claim_evidence
no
