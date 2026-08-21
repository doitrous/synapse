<!--
  103 BMS · the 29 citations that tie the module's claims to their books.

  One kind, one file: every record here is a citation. The claims they support
  are the sibling file ./103-BMS-claims.md, and the three sources they name are
  ./103-BMS-sources.md. Nothing here mints a claim ID or a source ID.

  One citation per claim, 29 for 29. No claim in the batch is left unevidenced.

  THE THREE BOOKS, and nothing else:

    Anatomy      src_23c95ac89b6b113bd58e  Dpt book Anatomy Lower Limb 103.pdf              119 pp
    Histology    src_2bf25a6864c9f6ce3283  Dpt book Final Book of Histology (BMS 103) 2026   48 pp
    Physiology   src_59643edb9d371bcefa2c  Dpt Book Physiology 103.pdf                       51 pp

  The two end-of-year papers in ./103-BMS-sources.md are `is_assessment: yes`
  and are cited by nothing here. An exam paper is evidence about what a faculty
  examines, never evidence that something is medically true.

  EVERY SPAN IS THE BOOK'S OWN WORDS, transcribed as printed and not smoothed.
  Each was located in the cached page text at
  scripts/kasr/extract/pagetext/<sourceId>.json and then read back off the page
  itself before being written down. Where the book is ugly, ungrammatical or
  misspelt it is quoted that way, and the four that matter are flagged in their
  own `context_note`:

    · anatomy p. 12  — "Nerve to vastus mediali", missing its final s
    · anatomy p. 49  — "talipes  equinovarus", with a double space
    · anatomy p. 81  — "quadratusfemoris", run together as one word
    · histology p. 42 — "Deeo Connective tissue under epidermis", for "Deep"

  Bullet markers, numbering and inline parentheticals are kept; where a span
  crosses a line or a list item the pieces are joined with a single space, and
  where it crosses a heading the heading is quoted with it. Nothing is added.

  LOCATORS. `locator_page` is the page number **in the file**, which is what the
  field means, and every citation carries one — `counts_as_claim_evidence: yes`
  requires an exact locator or the audit rejects it at rest.

    Anatomy and Physiology: the printed page number equals the file page.
    Histology: it does NOT. The histology book's printed folio runs one behind
    its file page — file page 42 is printed "41". `locator_page` is the file
    page throughout, and each histology `locator_detail` names the printed
    folio as well, so a reader holding the paper book can find the span.

  EVIDENCE ROLE. All 29 are `local_curriculum`. These are the faculty's own
  department books — the authority of record for what this module teaches, and
  not independent verification of a general medical fact. Nothing here has been
  checked against an international reference, and no citation claims it has.

  Three of the anatomy spans are clinical points from boxed sections of the book
  (CPN injury, its motor effects, its deformity). They state what a lesion
  causes, not what to do about it; none names a treatment, a dose or an
  emergency action.

  Import order: sources → concepts → claims → citations. This file lands last.
-->

# Item

## id
CIT-KA-ANAT-ADDUCTOR-CANAL-01

## claim_id
CLM-MSK-ADDUCTOR-CANAL-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"The canal is triangular in cross section having the following walls: 1. The antero-medial wall: is a fibrous roof extending between vastus medialis and adductor magnus muscles, covered by sartorius. 2. The posterior wall (floor): is formed by the adductor longus (above) and the adductor magnus (below). 3. The antero-lateral wall: is formed by the vastus medialis."

## locator_type
page

## locator_page
12

## locator_section
Adductor canal · II- Boundaries

## locator_detail
The three numbered wall entries under the "II- Boundaries" heading, printed page 12.

## context_note
The book calls the antero-medial wall a "fibrous roof" and the posterior wall "(floor)" in the same list; both terms are the book's own. The canal's position — medial aspect of the middle third of the thigh, under sartorius — is stated in "I- Position" immediately above this span.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-ADDUCTOR-CANAL-02

## claim_id
CLM-MSK-ADDUCTOR-CANAL-02

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"III- Contents: 1- Femoral artery 2- Femoral vein 3- Saphenous nerve 4- Nerve to vastus mediali"

## locator_type
page

## locator_page
12

## locator_section
Adductor canal · III- Contents

## locator_detail
The four numbered contents at the foot of printed page 12.

## context_note
"Nerve to vastus mediali" is quoted exactly as printed — the book drops the final s of "medialis". The claim reads it as the nerve to vastus medialis, which is what the list plainly means and what the fourth content of the adductor canal is.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-PERONEUS-LONGUS-01

## claim_id
CLM-MSK-PERONEUS-LONGUS-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"Nerve supply: musculo-cutaneous nerve (superficial peroneal). Action: 1. Eversion of foot (at subtalar joint). 2. Plantar-flexion of foot (at ankle joint). Supports the lateral longitudinal, and the transverse arches of foot."

## locator_type
page

## locator_page
57

## locator_section
[2] Muscles of the Lateral (Peroneal) Compartment of the Leg · 1) Peroneus Longus

## locator_detail
The "Nerve supply" and "Action" entries of the Peroneus Longus block, printed page 57.

## context_note
The book uses "musculo-cutaneous nerve" as the primary name and gives "(superficial peroneal)" as the parenthetical, the reverse of the more common modern usage; page 58 confirms they are the same nerve. Peroneus brevis, on the same page, has the same nerve and the same two actions — the claim is about longus, which is the one with the transverse-arch support.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-HIP-MOVEMENTS-01

## claim_id
CLM-MSK-HIP-MOVEMENTS-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"Lateral rotation: done by the small lateral rotators of the thigh: (obturator internus and externus, 2 gemelli, quadratusfemoris and piriformis), assisted by gluteus maximus and sartorius."

## locator_type
page

## locator_page
81

## locator_section
The hip joint · Movements of the hip joint and muscles acting on it

## locator_detail
Sixth bullet of the "Movements of the hip joint and muscles acting on it" list, printed page 81.

## context_note
"quadratusfemoris" is quoted as printed — the book runs the two words together here and again three lines later under nerve supply. The six named rotators match the six the book devotes pages 30 to 32 to, one heading each: piriformis, obturator internus, superior gemellus, inferior gemellus, quadratus femoris and obturator externus.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-POST-TIBIAL-BRANCHES-01

## claim_id
CLM-MSK-POST-TIBIAL-BRANCHES-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"Branches 1) Circumflex fibular artery: Winds around the neck of fibula 2) Peroneal artery: (the largest branch and the main supply of leg)."

## locator_type
page

## locator_page
65

## locator_section
Posterior Tibial Artery · Branches

## locator_detail
First two of the seven numbered branches, printed page 65.

## context_note
The book's parenthesis is the whole claim: the peroneal is both the largest branch and the main supply of the leg. The list continues to seven — muscular branches, nutrient artery to tibia, medial malleolar, medial calcanean, and the medial and lateral plantar arteries as terminal branches — on the same page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-SCIATIC-COURSE-01

## claim_id
CLM-MSK-SCIATIC-COURSE-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"It leaves the pelvis through the greater sciatic foramen below the piriformis to enter the gluteal region. It descends on the back of the ischium and enters the back of the thigh midway between the greater trochanter and the ischial tuberosity. It ends a little below the middle of the thigh by dividing into its two terminal branches; the common peroneal and the tibial nerve"

## locator_type
page

## locator_page
37

## locator_section
Sciatic Nerve · Course

## locator_detail
The three "Course" entries, printed page 37. The last runs to the foot of the page and ends without a full stop, as quoted.

## context_note
The span is set around Fig. (55) and its text column is interrupted by the figure; the three sentences are quoted in the order the book sets them. The roots — "the anterior and posterior divisions of (L4, 5, SI,2,3)" — are in the "Origin" line immediately above, where the book prints S1 as "SI".

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-SCIATIC-BRANCHES-01

## claim_id
CLM-MSK-SCIATIC-BRANCHES-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"Branches: 1. Tibial (medial popliteal) nerve: the larger of the two terminal divisions. It leaves the thigh and enters the popliteal fossa. 2. Common peroneal (lateral popliteal) nerve: the smaller of the two terminal divisions. It enters the popliteal fossa lateral to the tibial nerve. 3. Muscular branches: a- From the tibial part to: * Long head of biceps femoris. * Semitendinosus. * Semimembranosus. * Ischial part of adductor magnus. b- From the common peroneal part to: Short head of biceps femoris. 4. Articular branches: to the hip joint."

## locator_type
page

## locator_page
39

## locator_section
Sciatic Nerve · Branches

## locator_detail
The whole four-item "Branches" list at the head of printed page 39.

## context_note
The asterisks are the book's own bullet marks in a two-column sub-list; they are kept so the four tibial-part muscles read as four items. The articular branch goes to the hip — the knee's articular branches belong to the terminal divisions and are listed separately on pages 48 and 49.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-CPN-INJURY-01

## claim_id
CLM-MSK-CPN-INJURY-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"Injury of common peroneal nerve: a) Causes of injury: fracture of head or neck of fibula or pressure from casts or splints."

## locator_type
page

## locator_page
49

## locator_section
Common Peroneal Nerve (Lateral popliteal nerve) · Injury of common peroneal nerve

## locator_detail
The "Causes of injury" line, printed page 49.

## context_note
The anatomical reason sits on the facing page, at the end of the nerve's course on printed page 48: "It curves behind the head of the fibula then close to the lateral aspect of its neck." The claim joins the two, which is why the page-48 sentence is quoted here rather than left implied. A causal statement about a mechanism of injury, not a treatment or an action.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-CPN-MOTOR-01

## claim_id
CLM-MSK-CPN-MOTOR-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"Motor effects: 1- Foot drop: due to paralysis of all extensor muscles of front of leg. 2- Loss of eversion of foot: due to paralysis of the 3 peroneal muscles."

## locator_type
page

## locator_page
49

## locator_section
Common Peroneal Nerve (Lateral popliteal nerve) · Injury of common peroneal nerve · Results of injury

## locator_detail
The two numbered motor effects under "Results of injury", printed page 49.

## context_note
The two compartments the claim names are the book's own division: the extensors of the front of the leg are the deep peroneal territory and the three peroneal muscles the superficial peroneal territory, and the parent nerve divides into both inside peroneus longus, stated four lines above this span on the same page. Describes the deficit a lesion produces; it prescribes nothing.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-CPN-CUTANEOUS-01

## claim_id
CLM-MSK-CPN-CUTANEOUS-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"Branches in the popliteal fossa: 1- Cutaneous branches: a- Sural communicating nerve: arises in the upper part of the fossa, and runs inferomedially to join the sural nerve. b- Lateral cutaneous nerve of calf: arises on the lateral head of gastrocnemius and supplies the upper 1/3 of the anterolateral side of the leg."

## locator_type
page

## locator_page
49

## locator_section
Common Peroneal Nerve (Lateral popliteal nerve) · Branches in the popliteal fossa

## locator_detail
Item 1 of the "Branches in the popliteal fossa" list, printed page 49.

## context_note
The heading is quoted with the span because it is what confines the claim: these are the two cutaneous branches given *in the fossa*. The nerve's other cutaneous territory — the front of the lower leg and the dorsum of the foot — is reached through the terminal superficial and deep peroneal branches, item 3 of the same list.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-ANAT-CPN-DEFORMITY-01

## claim_id
CLM-MSK-CPN-DEFORMITY-01

## resource_id
src_23c95ac89b6b113bd58e

## evidence_role
local_curriculum

## support_span
"1- Foot drop: due to paralysis of all extensor muscles of front of leg. 2- Loss of eversion of foot: due to paralysis of the 3 peroneal muscles. This deformity is called talipes  equinovarus."

## locator_type
page

## locator_page
49

## locator_section
Common Peroneal Nerve (Lateral popliteal nerve) · Injury of common peroneal nerve · Results of injury · Motor effects

## locator_detail
The naming sentence closing the motor effects, printed page 49. Its double space between "talipes" and "equinovarus" is the book's.

## context_note
The mirror image the claim also asserts is on the facing page, printed page 48, under "Injury of tibial nerve": "Motor loss: Muscles of back of leg and sole are paralyzed leading to dorsiflexion and eversion of foot. This deformity is called Talipes calcaneo-valgus". The two are set one page apart in the same chapter, which is why the claim states them as a pair. Names a deformity; it recommends no treatment.

## confidence
0.9

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-DERMIS-LAYERS-01

## claim_id
CLM-DER-DERMIS-LAYERS-01

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"Papillary layer • Thinner superficial layer • Forms dermal papillae. Formed of loose C.T. More cellular (fibrocyte, lymphocyte, macrophage, mast cell, adipocyte). Fine C.T. fibers (type III collagen & elastic fibers). More vascular (to nourish epidermis). Receptors: Meissner's corpuscles."

## locator_type
page

## locator_page
42

## locator_section
II. The Dermis

## locator_detail
The left-hand column of the two-column dermis table, printed folio 41 (file page 42). Read top to bottom, one table row per sentence.

## context_note
This is a table column, not running prose: the book sets papillary and reticular side by side in six rows and the span is the left cell of each row in order, joined with a space. Nothing is added and no row is skipped. The book's typo "Deeo Connective tissue under epidermis" — for "Deep" — is four lines above this span and is not part of it. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-DERMIS-LAYERS-02

## claim_id
CLM-DER-DERMIS-LAYERS-02

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"Reticular layer Thicker deep layer Formed of dense C.T. Less cellular (fibrocyte, macrophage, lymphocyte, mast cell, adipocyte). C.T. fibers type I (bundles) & elastic fibers. Less vascular Receptors: Pacinian corpuscles, Ruffini's end organ & Krause's end bulb"

## locator_type
page

## locator_page
42

## locator_section
II. The Dermis

## locator_detail
The right-hand column of the two-column dermis table, printed folio 41 (file page 42). Read top to bottom, one table row per cell.

## context_note
The right cell of each row of the same six-row table, quoted in order. Two cells end without a full stop in the book — "Less vascular" and the receptor list — and are quoted that way. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-OSTEOBLAST-01

## claim_id
CLM-MSK-OSTEOBLAST-01

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"2. OSTEOBLASTS (Bone forming cell) Origin Osteogenic cells. Site • Present immediately under periosteum in the form of a continuous single layer covering the bone surface. • Present under the endosteum."

## locator_type
page

## locator_page
11

## locator_section
B - Bone Cells

## locator_detail
The "Origin" and "Site" rows of the osteoblast column of the bone-cell table, printed folio 10 (file page 11).

## context_note
A table again: the bone-cell table runs Origin / Site / L.M. / E.M. / Functions down the side and one column per cell type. The span is the osteoblast column's first two rows, with the column heading quoted so it is clear which cell is meant. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-OSTEOBLAST-02

## claim_id
CLM-MSK-OSTEOBLAST-02

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"E.M. • Characters of protein forming cells. They are rich in rER, mitochondria & a well-developed Golgi apparatus."

## locator_type
page

## locator_page
11

## locator_section
B - Bone Cells

## locator_detail
The "E.M." row of the osteoblast column of the bone-cell table, printed folio 10 (file page 11).

## context_note
The row label "E.M." is quoted with the cell because it is what fixes the claim to electron microscopy; the light-microscopic characters — oval cell, eccentric nucleus, darkly basophilic cytoplasm with a negative Golgi image, rich in alkaline phosphatase — are the row above. The book abbreviates rough endoplasmic reticulum to "rER" throughout. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-OSTEOCLAST-01

## claim_id
CLM-MSK-OSTEOCLAST-01

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"4. OSTEOCLASTS (BONE DESTROYING CELLS) Origin Fusion of mononuclear hemopoietic progenitor cells. Site • Present on the bone surface near the bone marrow within a cavity called Howship's lacuna."

## locator_type
page

## locator_page
12

## locator_section
B - Bone Cells

## locator_detail
The "Origin" and "Site" rows of the osteoclast column of the bone-cell table, printed folio 11 (file page 12).

## context_note
The osteoclast column continues from the previous file page's table onto this one; the column heading is quoted with the span so the cell is unambiguous. The book spells it "hemopoietic"; the claim uses the British "haemopoietic", per the house spelling rule, without changing what is asserted. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-OSTEOCLAST-02

## claim_id
CLM-MSK-OSTEOCLAST-02

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"L.M. • Large irregular cells having brush border facing the near bony surface. • Multinucleated cells (6-12), with foamy acidophilic cytoplasm."

## locator_type
page

## locator_page
12

## locator_section
B - Bone Cells

## locator_detail
The "L.M." row of the osteoclast column of the bone-cell table, printed folio 11 (file page 12).

## context_note
"6-12" is the book's own nucleus count. The row label "L.M." is quoted because the claim is specifically about light microscopy — on electron microscopy, in the row below, that brush border is "a ruffled surface which shows microvilli". The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-INTERCALATED-DISC-01

## claim_id
CLM-MSK-INTERCALATED-DISC-01

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"By EM, intercalated discs are formed of transverse and lateral regions: The transverse component of the discs crosses transversely the cardiac muscle fiber. Desmosomes and adherent junctions (fascia adherens) are located in this region of the disc, bind cardiac muscle cells firmly together to prevent their separation during repetitive contractions."

## locator_type
page

## locator_page
30

## locator_section
The Intercalated Discs

## locator_detail
The first bullet at the head of printed folio 29 (file page 30), continuing the section that opens on the previous file page.

## context_note
The "By EM" clause is quoted with the span because it is what confines the claim to electron microscopy; by light microscopy, on the previous file page, the disc is only "clear lines that appear transversely at intervals along the length of cardiac muscle fiber". The book writes "bind" where the grammar wants "binding"; quoted as printed. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-INTERCALATED-DISC-02

## claim_id
CLM-MSK-INTERCALATED-DISC-02

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"The lateral component of the discs lies parallel to muscle fibers. Gap junctions are located in this segment of the disc, allow the contraction signals to pass from cell to other. Their position in the lateral parts of the disc protect them from the contraction forces"

## locator_type
page

## locator_page
30

## locator_section
The Intercalated Discs

## locator_detail
The second bullet of the electron-microscopy description, printed folio 29 (file page 30). It ends without a full stop, as quoted.

## context_note
"from cell to other" is the book's phrasing for cell to cell, and "protect" where the grammar wants "protects"; both quoted as printed. The lateral component is the electrical junction, against the mechanical junction of the transverse component in the bullet above. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-SMOOTH-MUSCLE-EM-01

## claim_id
CLM-MSK-SMOOTH-MUSCLE-EM-01

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"Sarcolemma thin surrounded by basal lamina. It shows no T-tubules, instead there are invaginations along the cell surface, called caveolae. There is no tubular system. The caveolae can control calcium release and muscle contraction."

## locator_type
page

## locator_page
32

## locator_section
Smooth muscle fiber · Histological structure

## locator_detail
The "Sarcolemma" bullet of the "Histological structure" list, printed folio 31 (file page 32).

## context_note
Two negatives are stated separately and both matter: no T-tubules, and no tubular system at all. The caveolae are what stands in their place. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-HIST-SMOOTH-MUSCLE-EM-02

## claim_id
CLM-MSK-SMOOTH-MUSCLE-EM-02

## resource_id
src_2bf25a6864c9f6ce3283

## evidence_role
local_curriculum

## support_span
"Myofibrils, of thick myosin and thin actin filaments, are irregularly arranged. Therefore, striations do not appear in smooth muscle fibers. Actin filaments insert into sarcoplasmic and sarcolemma-associated dense bodies (correspond to Z-line in striated muscle) and extend into the sarcoplasm to interact with myosin filaments."

## locator_type
page

## locator_page
32

## locator_section
Smooth muscle fiber · Histological structure

## locator_detail
Two consecutive bullets of the "Histological structure" list, printed folio 31 (file page 32).

## context_note
The book gives the causal order the claim keeps: the arrangement is irregular, *therefore* no striations appear. The parenthesis "(correspond to Z-line in striated muscle)" is the book's own equivalence, not an editorial gloss. The histology book's printed folio runs one behind the file page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-AP-DEPOLARIZATION-01

## claim_id
CLM-NEU-AP-DEPOLARIZATION-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"1. During Depolarization (positive feedback / regenerative process): a. A stimulus causes initial decrease in the membrane potential from -90mV toward the firing level. b. Some of the Na+ channels activation gates open. Na+ enters the fiber down its electro-concentration gradient. c. Na+ inflow causes the membrane to depolarize further, which causes more activation of Na+ channels and so on until reaching -65 mV (firing level or Threshold). d. At firing level all voltage-gated Na+ channels are opened, and the rapid rate of depolarization occurs [ascending limb of the spike]."

## locator_type
page

## locator_page
17

## locator_section
Ionic basis of action potential · During action potential, the gates move in a sequential manner

## locator_detail
Items a to d of the depolarisation sequence at the head of page 17.

## context_note
The heading's own parenthesis — "positive feedback / regenerative process" — is the book naming the mechanism the claim asserts, so it is quoted with the span. The +35 mV overshoot and the 125 mV spike amplitude that the claim's qualifiers carry are stated separately on page 14, under "Rapid Depolarization".

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-NA-CHANNEL-GATES-01

## claim_id
CLM-NEU-NA-CHANNEL-GATES-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"At resting membrane potential, the activation gate is closed while inactivation gate is open. When the outer gate is opened the channel is said to be activated while, when the inner gate is closed the channel is said to be inactivated." … "Fig 21: The three conformation states of the Na+ voltage-gated channel."

## locator_type
page

## locator_page
16

## locator_section
Ionic basis of action potential · (A) Voltage-gated Na+ channel

## locator_detail
The first bullet of page 16 and the caption of Fig 21 below it. The ellipsis marks the figure that stands between them.

## context_note
The sentence that names the two gates is the last line of the previous page, page 15: "This channel has two gates (Fig 20) one near the outer surface called the activation gate and the other on the inner surface of the channel called the inactivation gate." Page 16 is cited instead because it is where both gates and all three states are stated together, which is what the claim asserts. The contrast the claim's qualifier carries — the potassium channel's single gate and absent inactivation gate — is at the foot of this same page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-REFRACTORY-ABSOLUTE-01

## claim_id
CLM-NEU-REFRACTORY-ABSOLUTE-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"A. Absolute Refractory period [ARP] : Definition: It is the period of time during which another action potential cannot be produced, whatever the strength of the stimulus. Duration: it corresponds to the period from the firing level till the early part of repolarization. Cause: all Voltage gated Na+ channels are opened then rapidly inactivated by the inner gate."

## locator_type
page

## locator_page
19

## locator_section
There are two refractory periods (Fig 24) · A. Absolute Refractory period [ARP]

## locator_detail
The Definition, Duration and Cause lines of the ARP block, page 19.

## context_note
The book's own three-part shape — definition, duration, cause — is what the claim reproduces, so all three lines are quoted rather than the definition alone. The stray space before the colon in the heading is the book's.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-REFRACTORY-RELATIVE-01

## claim_id
CLM-NEU-REFRACTORY-RELATIVE-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"B. Relative Refractory Period [RRP]: Definition: it is the period of time during which another action potential can be produced by a stronger stimulus above the threshold. Duration: it begins at the end of ARP and it terminates when the membrane potential returns to its resting level. Cause: a. Some of the Na+ channels have returned to their resting state and are available for activation. b. The K+ channels are opened during repolarization →K +out oppose Na + in."

## locator_type
page

## locator_page
19

## locator_section
There are two refractory periods (Fig 24) · B. Relative Refractory Period [RRP]

## locator_detail
The Definition, Duration and two-part Cause of the RRP block, page 19, immediately below the ARP block.

## context_note
The final clause is quoted with the book's own spacing around the plus signs — "K +out oppose Na + in" — which is how the potassium and sodium symbols are set throughout this page. The two causes are what the claim's qualifier summarises as the period being costly rather than impossible.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-TENSION-CROSS-BRIDGE-01

## claim_id
CLM-MSK-TENSION-CROSS-BRIDGE-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"3- Generation of tension: Tension is the developed force when a muscle contracts. It is generated by the cycling of the cross-bridges as follows: (fig 41) a. Binding of actin and myosin occurs spontaneously, after Ca2+ binds to troponin C and tropomyosin moves away from actin active sites. b. Bending of the cross-bridges and the sliding of actin filament across the myosin filament. … c. Detachment of the cross-bridge from actin. … d. Return of the cross-bridge to its original upright position to participate in another cycle."

## locator_type
page

## locator_page
33

## locator_section
Molecular Mechanism of Muscle Contraction: Excitation-Contraction (EC) Coupling · 3- Generation of tension

## locator_detail
Steps a to d of the "Generation of tension" block, page 33. The two ellipses stand for the unindented explanatory paragraphs the book sets under steps b and c.

## context_note
The four steps are quoted with their labels because the claim asserts that there are four and that they cycle. The elided paragraphs are the ATP detail, cited separately for CLM-MSK-CROSS-BRIDGE-ATP-01 off this same page; nothing contradicting the span was removed. The book's condition — "Cycling continues as long as Ca2+ is attached to troponin C and energy (ATP) is available" — follows step d on the same page.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-CROSS-BRIDGE-ATP-01

## claim_id
CLM-MSK-CROSS-BRIDGE-ATP-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"For detachment to occur, ADP and Pi must be removed from the cross-bridge and a new molecule of ATP put in their place. This new ATP reduces the affinity of the cross bridges for the active site. If no ATP is available, the thick and thin filaments cannot be separated (Muscle contracture)."

## locator_type
page

## locator_page
33

## locator_section
Molecular Mechanism of Muscle Contraction: Excitation-Contraction (EC) Coupling · 3- Generation of tension · c. Detachment

## locator_detail
The explanatory paragraph under step c of the cross-bridge cycle, page 33.

## context_note
The book hyphenates "cross-bridge" in the first sentence and not in the second; both are quoted as printed. The rigor-mortis consequence the claim's qualifier names is stated thirteen pages later, on page 46: "Several hours after death all the muscles of the body go into a state of contracture and become rigid even without action potentials. It is caused by loss of ATP, which is needed to produce separation of actin and myosin filaments during the relaxation process."

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-SMOOTH-FACTORS-01

## claim_id
CLM-MSK-SMOOTH-FACTORS-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"1- Stretch: Visceral smooth muscle responds to stretch by contraction. This response allows a hollow organ to contract automatically and evacuate its contents when it is distended. 2- Local factors: - Relaxing factors: acids, excess CO2 and oxygen lack. - Contracting factors: alkalis, excess K+ 3- Cold: increases the contraction of smooth muscles 4- Humoral Factors: ligand binds to its membrane receptors and results in: a. Excitatory receptors increase cytoplasmic Ca++ and cause contraction. b. Inhibitory receptors decrease cytoplasmic Ca ++ & cause relaxation … 5- Role of Nerve Supply:"

## locator_type
page

## locator_page
50

## locator_section
Control of Contractions of Smooth Muscle

## locator_detail
The five numbered headings and their content, page 50. The ellipsis stands for the mechanism clause closing item 4b.

## context_note
All five numbered groups are quoted because the claim asserts that there are five and names each. Items 3 and 4b end without full stops in the book, as quoted; "excess K+" likewise. The elided clause under 4b explains how inhibitory receptors lower calcium and does not bear on the count.

## confidence
0.95

## counts_as_claim_evidence
yes

---

# Item

## id
CIT-KA-PHYS-SMOOTH-SPONTANEOUS-01

## claim_id
CLM-MSK-SMOOTH-SPONTANEOUS-01

## resource_id
src_59643edb9d371bcefa2c

## evidence_role
local_curriculum

## support_span
"Smooth muscle is characterized by its tendency to give rise to spontaneous contractions which may occur in a rhythmic form [rhythmic contractions] or a tetanic form [Muscle tone or maintained partial contraction]. These occur even in isolated smooth muscle when there is no nerve supply." … "Smooth muscle has a dual nerve supply from the 2 divisions of the autonomic nervous system. The nerve supply does not initiate activity in the muscle but it modifies it by affecting: a. Its spontaneous activity b. Its sensitivity to chemical agents"

## locator_type
page

## locator_page
50

## locator_section
Control of Contractions of Smooth Muscle · and · 5- Role of Nerve Supply

## locator_detail
The first two bullets at the head of page 50 and the whole of item 5 at its foot. The ellipsis stands for the five numbered factor groups between them.

## context_note
Both halves of the claim are on this one page, top and bottom, which is why one citation carries it. The elided middle is the five-factor list cited for CLM-MSK-SMOOTH-FACTORS-01. The book's "does not initiate … but it modifies" is the exact distinction the claim rests on.

## confidence
0.95

## counts_as_claim_evidence
yes
