<!--
  MANS-MSS-202 lane 3 · Pharmacology · 27 new concepts (with articles) authored
  from Most important MCQ (continuous).pdf pp.24-48, the leftover NSAID/aspirin
  items lanes 1-2 did not author from pp.24-26 and 46-48, plus the wholly new
  opioid-analgesic section (pp.32-38) and the leftover DMARD/biologic items from
  pp.39-48. Broad greps for every drug name (morphine, opioid, naloxone,
  fentanyl, tramadol, pethidine, meperidine, cyclosporine, leflunomide,
  tofacitinib, etanercept, chloroquine) against Kasr, Alexandria, Ain Shams,
  Zagazig and FOMSCU pharmacology/physiology concept files found no matching
  drug-mechanism concept in any case (only tangential physiology-of-pain
  concepts using "opioid" as a general term, and one Ain Shams naltrexone
  concept covering a different clinical use) -- safe to mint, confirmed per
  concept below.

  Import: Admin › Concepts › Import. Before the sibling article file, before
  the claim and citation files.
-->

# Item

## label
non-narcotic-antipyretic-no-dependence

## id
CON-PHM-A6B7C8D9E0F1A2

## canonical_key
non-narcotic-analgesics-antipyretic-no-dependence

## aliases
Non-narcotic analgesic properties
NSAID vs opioid effects

## definition
Non-narcotic (non-opioid) analgesics, the NSAID and paracetamol family, produce an antipyretic effect by inhibiting cyclooxygenase-mediated prostaglandin E2 synthesis in the hypothalamus, which resets the elevated thermoregulatory set point of fever back toward normal. Unlike narcotic (opioid) analgesics, they do not act on opioid receptors, so they produce no euphoria, no antitussive effect, no respiratory depression and no physical dependence. This antipyretic action, together with the analgesic and (for most of the group) anti-inflammatory action, forms the shared behavioural signature that exam questions use to separate non-narcotic from narcotic analgesics.

## explicit_objective
State that non-narcotic analgesics act as antipyretics via central COX inhibition, and that they lack the opioid-receptor-mediated effects (euphoria, dependence, respiratory depression) of narcotic analgesics.

## pitfalls
Assuming any analgesic could plausibly cause euphoria or dependence. Only drugs acting on opioid receptors carry that risk profile; non-narcotic analgesics are mechanistically incapable of it because they do not touch that receptor system at all.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-NON-NARCOTIC-ANTIPYRETIC

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: MSS pp.24-45. find-existing.mjs / broad greps for "non-narcotic antipyretic" and "NSAID no dependence" returned no matching concept record distinct from the module's own aspirin-no-tolerance concept (CON-PHM-C78D496F3E1A85), which covers aspirin's adverse-effect list specifically rather than the antipyretic mechanism and opioid-receptor absence tested here; safe to create.

---

# Item

## label
aspirin-warfarin-drug-interaction

## id
CON-PHM-B7C8D9E0F1A2B3

## canonical_key
aspirin.drug-interaction.warfarin-potentiation

## aliases
Aspirin drug interactions
Warfarin potentiation

## definition
Aspirin potentiates the anticoagulant effect of warfarin through two additive mechanisms: it displaces warfarin from plasma protein binding sites, transiently raising free (active) warfarin concentration, and it independently impairs haemostasis through irreversible platelet cyclooxygenase-1 inhibition, which blocks thromboxane A2-mediated platelet aggregation. The combination raises bleeding risk beyond either drug alone, which is why the pairing is a classic drug-interaction exam stem. Aspirin does not potentiate beta-blockers' antihypertensive effect, does not potentiate vitamin K's coagulant action, does not potentiate furosemide's diuretic effect, and does not potentiate probenecid's uricosuric effect — each of those pairings is either the opposite interaction or unrelated.

## explicit_objective
Identify warfarin's anticoagulant effect as the one aspirin most classically potentiates, through both protein-binding displacement and platelet COX-1 inhibition.

## pitfalls
Confusing potentiation with the correct direction. Aspirin does not potentiate probenecid's uricosuric action, for instance — low-dose aspirin actually antagonises uricosurics by competing for the same renal tubular transporter, the opposite relationship.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-ASPIRIN-WARFARIN-INTERACTION

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: MSS p.24. Broad greps for "aspirin warfarin" and "aspirin drug interaction potentiation" returned no matching concept record in Kasr/Alexandria/import-ready pharmacology concept files; safe to create.

---

# Item

## label
aspirin-anti-inflammatory-rheumatic-effects

## id
CON-PHM-C8D9E0F1A2B3C4

## canonical_key
aspirin.pharmacologic-effects.anti-inflammatory-anti-rheumatic

## aliases
Aspirin pharmacologic effects
High-dose aspirin in rheumatic fever

## definition
At anti-inflammatory doses, well above those used for simple analgesia, aspirin produces genuine anti-inflammatory and anti-rheumatic effects through sustained cyclooxygenase inhibition, reducing prostaglandin-mediated inflammation, swelling and joint damage. This dose-dependent effect is why high-dose aspirin is used to prevent the progression of joint destruction in acute rheumatic fever, an application distinct from its low-dose antiplatelet or standard analgesic-antipyretic uses. Aspirin does not promote platelet aggregation (it inhibits it), does not reduce pain by stimulating prostaglandin synthesis (it inhibits that synthesis), does not centrally relax skeletal muscle, and does not lower blood pressure through a diuretic action, so none of those alternative descriptions is correct.

## explicit_objective
State that high-dose aspirin has genuine anti-inflammatory and anti-rheumatic activity, historically used to halt joint destruction in rheumatic fever, distinct from its antiplatelet and antipyretic uses at lower doses.

## pitfalls
Assuming aspirin's mechanism at every dose is identical. The antiplatelet effect saturates at very low doses (irreversible COX-1 inhibition in platelets, which cannot resynthesise the enzyme), while meaningful anti-inflammatory activity needs much higher, repeated dosing to sustain COX inhibition in inflamed tissue throughout the dosing interval.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-ASPIRIN-ANTI-INFLAMMATORY

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: MSS p.25. Broad greps for "aspirin anti-inflammatory rheumatic fever" and "aspirin high dose joint destruction" returned no matching concept record; safe to create.

---

# Item

## label
ibuprofen-mechanism-nonselective-cox

## id
CON-PHM-D9E0F1A2B3C4D5

## canonical_key
ibuprofen.mechanism.nonselective-cox-inhibitor

## aliases
Ibuprofen mechanism of action
NSAID COX vs lipoxygenase selectivity

## definition
Ibuprofen is a non-selective cyclooxygenase inhibitor, blocking both the constitutive COX-1 isoform (responsible for protective gastric mucosal and platelet prostaglandin/thromboxane synthesis) and the inducible COX-2 isoform (responsible for inflammatory prostaglandin synthesis) without meaningful selectivity between them. Because ibuprofen's target is the cyclooxygenase (prostaglandin-synthesis) pathway specifically, it does not touch the parallel lipoxygenase pathway that produces leukotrienes such as LTB4 from arachidonic acid; ibuprofen therefore reduces TXA2, PGE2 and PGF2a and PGI2 (all cyclooxygenase products) but does not reduce LTB4. It is neither a phospholipase A2 inhibitor nor a kallikrein-system inhibitor, mechanisms that belong to corticosteroids and to bradykinin biology respectively, not to ibuprofen.

## explicit_objective
State that ibuprofen is a non-selective COX-1/COX-2 inhibitor, and that its cyclooxygenase selectivity means it leaves the lipoxygenase-derived eicosanoid leukotriene B4 unaffected.

## pitfalls
Assuming any NSAID blocks the whole arachidonic acid cascade. NSAIDs act only on the cyclooxygenase branch; the lipoxygenase branch (leukotrienes) is untouched by ibuprofen and can even be relatively upregulated when arachidonic acid is shunted away from the blocked COX pathway.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-IBUPROFEN-MECHANISM

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: MSS p.26 and Most important MCQ p.27. Broad greps for "ibuprofen mechanism" and "COX lipoxygenase selectivity" returned no matching concept record; safe to create.

---

# Item

## label
paracetamol-cox3-hypothesis

## id
CON-PHM-E0F1A2B3C4D5E6

## canonical_key
paracetamol.mechanism.cox3-hypothesis

## aliases
Paracetamol COX-3 hypothesis
Acetaminophen central mechanism

## definition
Paracetamol (acetaminophen) has long been recognised to inhibit prostaglandin synthesis centrally with minimal peripheral anti-inflammatory effect, and one proposed molecular explanation is selective inhibition of a COX-1 splice variant termed COX-3, expressed predominantly in the central nervous system. This COX-3 hypothesis is offered as a mechanistic account for why paracetamol behaves like a centrally selective antipyretic-analgesic without the peripheral, gastric-irritant or antiplatelet effects that accompany peripheral COX-1/COX-2 inhibition by NSAIDs such as aspirin and ibuprofen. Nimesulide, ketorolac, rofecoxib and aspirin are peripherally active COX-1/COX-2 (or COX-2-selective) inhibitors rather than agents proposed to act through this COX-3 mechanism.

## explicit_objective
Name paracetamol as the analgesic whose central antipyretic-analgesic action has been mechanistically proposed to work through COX-3 inhibition.

## pitfalls
Treating the COX-3 hypothesis as identical to the general 'paracetamol inhibits COX mainly in the CNS' teaching point. The COX-3 hypothesis is the more specific, named molecular mechanism proposed to explain that same centrally selective clinical picture.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-PARACETAMOL-COX3

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.27. Broad greps for "COX-3" and "paracetamol COX-3 hypothesis" returned no matching concept record distinct from the module's existing paracetamol-CNS concept (CON-PHM-A59B274D1C8E63), which covers the CNS-selectivity teaching point but not the named COX-3 splice-variant mechanism tested here; safe to create.

---

# Item

## label
aspirin-irreversible-nonselective-cox-platelet-mi

## id
CON-PHM-F1A2B3C4D5E6F7

## canonical_key
aspirin.mechanism.irreversible-nonselective-platelet-cox

## aliases
Aspirin irreversible COX inhibition
Aspirin MI prophylaxis mechanism

## definition
Aspirin is unique among NSAIDs in inhibiting cyclooxygenase irreversibly, by covalently acetylating a serine residue in the enzyme's active site, and it does so non-selectively across both COX-1 and COX-2. In platelets, which cannot synthesise new enzyme because they lack a nucleus, this irreversible inhibition permanently disables thromboxane A2 production for the platelet's roughly 7-10 day lifespan, which is the mechanism underlying low-dose aspirin's use in myocardial infarction prophylaxis: by inhibiting platelet cyclooxygenase and hence thromboxane A2-driven platelet aggregation, aspirin reduces thrombotic risk. This is distinct from reducing serum lipids, from a coronary steal phenomenon, or from any direct coronary vasodilator action, none of which is how aspirin's cardioprotective effect works.

## explicit_objective
State that aspirin's antiplatelet, MI-prophylactic effect comes from irreversible, non-selective inhibition of platelet cyclooxygenase, blocking thromboxane A2 synthesis for the platelet's lifespan.

## pitfalls
Confusing aspirin's irreversibility with other NSAIDs' reversible competitive inhibition. Most other NSAIDs (ibuprofen, indomethacin) reversibly and competitively inhibit COX, which is why they lack aspirin's durable, once-daily-dose antiplatelet effect.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-ASPIRIN-IRREVERSIBLE-COX

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.28-29. Broad greps for "aspirin irreversible COX" and "aspirin MI prophylaxis mechanism" returned no matching concept record; safe to create.

---

# Item

## label
nsaid-renal-prostaglandin-interactions

## id
CON-PHM-A2B3C4D5E6F7A8

## canonical_key
nsaid.interaction.renal-vascular-prostaglandins

## aliases
NSAIDs and antihypertensive efficacy
NSAIDs and furosemide

## definition
NSAIDs inhibit renal and vascular prostaglandin synthesis (chiefly prostacyclin, PGI2), prostaglandins that normally counterbalance vasoconstrictor and salt-retaining influences on the kidney and vasculature. Losing this prostaglandin-mediated buffering blunts the efficacy of antihypertensive drugs, since NSAID-induced reduction in vascular prostacyclin promotes vasoconstriction and sodium retention that partly offsets the antihypertensive's action. The same mechanism reduces the diuretic action of loop diuretics such as furosemide: furosemide's natriuretic effect partly depends on renal prostaglandin-mediated increases in renal blood flow and inhibition of tubular salt reabsorption, and NSAIDs blunt this by preventing that prostaglandin-mediated internal renal hemodynamic action, rather than by any direct action on the ascending limb, distal tubule, aldosterone secretion, or a distal sodium channel.

## explicit_objective
Attribute NSAID-blunting of both antihypertensive efficacy and loop-diuretic natriuresis to loss of renal/vascular prostaglandin-mediated (prostacyclin) buffering, not to a direct tubular or vascular action of the NSAID itself.

## pitfalls
Assuming NSAIDs act directly on diuretic drug transporters or receptors. The interaction is indirect: NSAIDs remove a prostaglandin-dependent physiological support for both antihypertensive and diuretic action, rather than blocking the other drug's own mechanism.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-NSAID-RENAL-PROSTAGLANDINS

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.29,31. Broad greps for "NSAID antihypertensive prostacyclin" and "NSAID furosemide interaction" returned no matching concept record; safe to create.

---

# Item

## label
acetaminophen-overdose-hepatotoxicity

## id
CON-PHM-B3C4D5E6F7A8B9

## canonical_key
acetaminophen.toxicity.overdose-hepatotoxicity

## aliases
Acetaminophen overdose
Paracetamol hepatotoxicity

## definition
Acetaminophen (paracetamol) overdose is a leading cause of acute drug-induced liver injury: at therapeutic doses it is safely cleared mainly by glucuronidation and sulfation, but a small fraction is oxidised by cytochrome P450 (CYP2E1) to the reactive, hepatotoxic metabolite NAPQI, normally detoxified by conjugation with glutathione. When intake exceeds the liver's glutathione reserve, whether from a single large overdose or from cumulative supratherapeutic dosing in a combination product taken over weeks, NAPQI accumulates and causes centrilobular hepatocyte necrosis, presenting with elevated aminotransferases and jaundice. This is distinct from a direct hepatotoxic effect of an opioid component in a combination product (such as oxycodone), which does not cause this pattern of liver injury, and distinct from a viral hepatitis, which the dose-escalation history argues against.

## explicit_objective
Attribute rising aminotransferases and jaundice in a patient escalating an acetaminophen-containing combination product to acetaminophen's own hepatotoxic (NAPQI) mechanism, not to its opioid component.

## pitfalls
Blaming the opioid component of a combination analgesic (e.g. oxycodone-acetaminophen) for liver injury. Opioids are not hepatotoxic in this way; acetaminophen is the component responsible whenever a rising-dose combination product produces this pattern.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-ACETAMINOPHEN-HEPATOTOXICITY

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.31. Broad greps for "acetaminophen hepatotoxicity overdose" and "paracetamol NAPQI" returned no matching concept record; safe to create.

---

# Item

## label
morphine-oral-bioavailability-first-pass

## id
CON-PHM-C4D5E6F7A8B9C0

## canonical_key
morphine.pharmacokinetics.oral-first-pass-metabolism

## aliases
Morphine bioavailability
Morphine first-pass metabolism

## definition
Orally administered morphine has poor bioavailability, around 25%, chiefly because of extensive hepatic first-pass metabolism: after absorption from the gut, morphine passes through the portal circulation to the liver, where a large fraction is glucuronidated (to morphine-3-glucuronide and morphine-6-glucuronide) before ever reaching the systemic circulation. This is why oral morphine doses must be substantially higher than parenteral doses to achieve an equivalent analgesic effect, and it is a general principle for opioids with high hepatic extraction ratios, not a reflection of poor intestinal absorption, digestive enzyme destruction, altered peristalsis, or vasoconstriction limiting gut absorption, none of which is the actual mechanism.

## explicit_objective
Attribute morphine's poor oral bioavailability to extensive hepatic first-pass metabolism rather than to poor absorption or intestinal factors.

## pitfalls
Assuming poor oral bioavailability means poor absorption. Morphine is well absorbed from the gut; the loss happens afterward, in the liver, before the drug reaches the systemic circulation — a distinction with real dosing consequences (oral doses much higher than parenteral).

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-MORPHINE-FIRST-PASS

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.32. Broad greps for "morphine bioavailability first pass" and "morphine oral pharmacokinetics" returned no matching concept record; safe to create.

---

# Item

## label
morphine-gi-motility-constipation-mechanism

## id
CON-PHM-D5E6F7A8B9C0D1

## canonical_key
morphine.effect.gi-motility-constipation

## aliases
Morphine GI effects
Opioid-induced constipation mechanism

## definition
Morphine and other opioids slow gastrointestinal transit and cause constipation by acting on mu-opioid receptors in the enteric nervous system, which increases circular smooth muscle tone and segmenting (non-propulsive) contractions while reducing propulsive peristalsis, and also increases anal sphincter tone. This combination, more tone with less coordinated forward movement, is exactly why a patient on chronic opioid therapy for pain can see previously troublesome diarrhoea improve: the same mechanism that produces opioid-induced constipation in most patients slows transit enough to control diarrhoea in a patient who had excessive motility to begin with. This is improved circular muscle tone with reduced propulsion, not simply "improved motility" in a general sense, and not a weakened anal sphincter or weakened rectal or colonic muscle, which would worsen rather than improve diarrhoea.

## explicit_objective
Explain opioid-induced reduction of diarrhoea (and constipation more generally) as increased GI circular muscle tone with reduced propulsive peristalsis, via mu-receptor action on the enteric nervous system.

## pitfalls
Calling the effect simply 'improved motility.' Opioids do not speed transit; they increase tone and reduce propulsive coordination, which paradoxically controls diarrhoea by slowing things down, not by making the gut move more efficiently forward.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-MORPHINE-GI-MOTILITY

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.32. Broad greps for "morphine GI motility" and "opioid constipation mechanism" returned no matching concept record; safe to create.

---

# Item

## label
opioid-tolerance-sparing-constipation-miosis

## id
CON-PHM-E6F7A8B9C0D1E2

## canonical_key
opioid.tolerance.spares-constipation-miosis

## aliases
Opioid tolerance pattern
Constipation and miosis resist tolerance

## definition
Tolerance develops readily to most opioid effects with repeated use, including analgesia, euphoria, sedation, and nausea/vomiting, meaning progressively higher doses are needed to reproduce the original effect. Two effects are classic exceptions that resist tolerance even with prolonged use: constipation and miosis (pupillary constriction), both of which persist essentially unchanged no matter how long a patient has been on chronic opioid therapy. This is why chronic opioid patients continue to need laxative prophylaxis indefinitely (constipation never fades) and why pinpoint pupils remain a reliable clinical sign of opioid effect or overdose even in tolerant, long-term users, unlike euphoria or analgesia, to which the same patient may have become substantially tolerant.

## explicit_objective
Name constipation (with miosis) as the opioid effects that persist despite tolerance, unlike analgesia, euphoria, sedation and nausea/vomiting, which do develop tolerance.

## pitfalls
Assuming tolerance is uniform across all opioid effects. It is receptor- and pathway-specific: the GI and pupillary effects use mechanisms that do not down-regulate the way the CNS reward and analgesic pathways do.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-OPIOID-TOLERANCE-PATTERN

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.32,36. Broad greps for "opioid tolerance constipation miosis" returned no matching concept record; safe to create.

---

# Item

## label
opioid-miosis-not-mydriasis

## id
CON-PHM-F7A8B9C0D1E2F3

## canonical_key
opioid.effect.miosis-not-mydriasis

## aliases
Opioid pupillary effect
Miosis vs mydriasis in opioid toxicity

## definition
Opioids characteristically cause miosis (pupillary constriction), through stimulation of the Edinger-Westphal nucleus and consequent parasympathetic outflow to the pupillary constrictor muscle, not mydriasis (pupillary dilation). Pinpoint pupils are one of the most reliable bedside signs of opioid intoxication, alongside respiratory depression and decreased bowel sounds, and this sign does not fade with tolerance the way many other opioid effects do. Constipation, vomiting (via chemoreceptor trigger zone stimulation) and analgesia are genuine actions of opiates in man; mydriasis, the opposite pupillary change, is not one of them, which is exactly why it is the correct exception among these listed actions.

## explicit_objective
State that opioids cause miosis, not mydriasis, and recognise pinpoint pupils as a reliable clinical sign of opioid effect distinct from the dilated pupils of many other toxidromes.

## pitfalls
Confusing opioid toxidrome pupils with sympathomimetic or anticholinergic toxidromes, which do cause mydriasis. Pinpoint (miotic) pupils specifically point toward opioids; dilated pupils point away from an opioid cause and toward a different drug class.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-OPIOID-MIOSIS

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.32-33. Broad greps for "opioid miosis mydriasis" returned no matching concept record; safe to create.

---

# Item

## label
morphine-use-ischemic-heart-disease

## id
CON-PHM-A8B9C0D1E2F3A4

## canonical_key
morphine.clinical-use.ischemic-heart-disease

## aliases
Morphine in myocardial infarction
Morphine cardiac analgesia

## definition
Morphine is a standard analgesic in ischemic heart disease, particularly acute myocardial infarction, where it relieves severe chest pain and the accompanying anxiety and sympathetic overactivity, and also reduces cardiac preload through venodilation, easing myocardial oxygen demand. This makes morphine appropriate in ischemic heart disease patients, unlike in bronchial asthma patients, where its histamine-releasing and respiratory-depressant potential can worsen bronchospasm and ventilation, and unlike scenarios where age alone (elderly male patients) or an unrelated condition (biliary colic, where morphine can raise sphincter of Oddi tone and worsen pain) would argue for caution or an alternative agent instead.

## explicit_objective
Identify ischemic heart disease (myocardial infarction) as a setting where morphine is a standard, appropriate analgesic, both for pain relief and for its preload-reducing, oxygen-demand-lowering effect.

## pitfalls
Assuming morphine is universally cautioned against in cardiac patients. It is specifically favoured in acute MI pain, distinct from settings like bronchial asthma or biliary colic, where morphine's other pharmacological effects work against the patient.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-MORPHINE-ISCHEMIC-HEART-DISEASE

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.33. Broad greps for "morphine ischemic heart disease" and "morphine myocardial infarction analgesic" returned no matching concept record; safe to create.

---

# Item

## label
heroin-overdose-naloxone-reversal

## id
CON-PHM-B9C0D1E2F3A4B5

## canonical_key
opioid.overdose.heroin-naloxone-treatment

## aliases
Opioid overdose triad
Naloxone as overdose treatment

## definition
The classic opioid overdose triad, unconsciousness, decreased bowel sounds, respiratory depression, and pinpoint (miotic) pupils, as seen in a known heroin user, is treated with intravenous naloxone, a competitive opioid receptor antagonist that rapidly reverses respiratory depression and coma. Naloxone is given intravenously rather than orally in this emergency, because it undergoes extensive first-pass hepatic metabolism if taken by mouth (making oral dosing useless in a life-threatening overdose) and because the IV route gives the fastest onset when reversing a potentially fatal overdose. Oral naltrexone and oral diazepam are not appropriate acute overdose treatments: naltrexone is an oral opioid antagonist used for relapse-prevention maintenance rather than acute reversal, and diazepam, a benzodiazepine, does not reverse opioid effects and can worsen respiratory depression.

## explicit_objective
Recognise intravenous naloxone as the treatment of choice for an opioid overdose triad (coma, decreased bowel sounds, respiratory depression, pinpoint pupils).

## pitfalls
Confusing naloxone with naltrexone. Naloxone is short-acting and used IV for acute overdose reversal; naltrexone is longer-acting and given orally for relapse-prevention maintenance once the patient is opioid-free, a completely different clinical situation.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-HEROIN-OVERDOSE-NALOXONE

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.33. Broad greps for "heroin overdose naloxone" and "opioid overdose treatment" returned no matching concept record distinct from Ain Shams' naltrexone-mechanism concept (CON-NEU-3DF546A3530F63), which covers naltrexone's relapse-prevention role, not this acute-overdose IV naloxone scenario; safe to create.

---

# Item

## label
fentanyl-high-potency-relative-morphine

## id
CON-PHM-C0D1E2F3A4B5C6

## canonical_key
fentanyl.pharmacology.potency-relative-morphine

## aliases
Fentanyl potency
Opioid relative potency

## definition
Fentanyl is approximately 100 times more potent than morphine on a milligram-for-milligram basis, meaning a much smaller dose of fentanyl produces an equivalent analgesic (and respiratory-depressant) effect. This high potency reflects fentanyl's high lipophilicity, which lets it cross the blood-brain barrier rapidly and bind opioid receptors efficiently, and it is clinically important for dosing safety: doses that would be trivial for morphine can be dangerously excessive for fentanyl. Pethidine, pentazocine, meperidine (pethidine's alternative name) and codeine are all considerably less potent than morphine or only modestly more potent, none matching fentanyl's roughly hundredfold potency multiple.

## explicit_objective
State that fentanyl is approximately 100 times more potent than morphine, reflecting its high lipophilicity and rapid CNS penetration.

## pitfalls
Confusing potency with total efficacy or duration of action. Potency describes the dose needed for a given effect; fentanyl's short duration of action (from rapid redistribution) is a separate pharmacokinetic property from its high potency.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-FENTANYL-POTENCY

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.34. Broad greps for "fentanyl potency" and "opioid relative potency morphine" returned no matching concept record; safe to create.

---

# Item

## label
morphine-not-antiemetic-emetic-action

## id
CON-PHM-D1E2F3A4B5C6D7

## canonical_key
morphine.effect.emetic-not-antiemetic

## aliases
Morphine and nausea/vomiting
Chemoreceptor trigger zone stimulation

## definition
Morphine is emetic, not antiemetic: it stimulates the chemoreceptor trigger zone in the area postrema, producing nausea and vomiting in a substantial proportion of patients, especially early in treatment before some tolerance develops. Morphine's genuine, well-recognised actions include vagal stimulation (contributing to bradycardia), miosis, and postural hypotension (from histamine release and reduced sympathetic tone); an antiemetic effect is not among them, making it the correct exception when these four options are compared. This is why antiemetics are often co-prescribed with opioid analgesics, precisely because the opioid itself tends to cause nausea rather than to prevent it.

## explicit_objective
Recognise that morphine causes nausea and vomiting via chemoreceptor trigger zone stimulation and is not an antiemetic, distinguishing this from its genuine actions of vagal stimulation, miosis and postural hypotension.

## pitfalls
Assuming a drug affecting the vomiting pathway must be suppressing it. Morphine stimulates the chemoreceptor trigger zone, actively provoking nausea and vomiting rather than blocking it, the opposite of an antiemetic action.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-MORPHINE-EMETIC-ACTION

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.34. Broad greps for "morphine antiemetic" and "morphine chemoreceptor trigger zone" returned no matching concept record; safe to create.

---

# Item

## label
tramadol-dual-mechanism-serotonin-syndrome

## id
CON-PHM-E2F3A4B5C6D7E8

## canonical_key
tramadol.mechanism.dual-opioid-monoaminergic-serotonin-risk

## aliases
Tramadol mechanism
Tramadol serotonin syndrome risk

## definition
Tramadol is unusual among opioid analgesics in acting through a dual mechanism: weak mu-opioid receptor agonism, plus inhibition of serotonin and noradrenaline reuptake, engaging the descending spinal monoaminergic pain-modulation pathway in addition to the opioid system. This second, monoaminergic component is precisely why combining tramadol with another serotonergic drug, such as an SSRI (for example fluoxetine), carries a real risk of serotonin syndrome, presenting with confusion, agitation, tachycardia and hyperthermia from excess serotonergic activity, a risk that a purely opioid analgesic like morphine would not create in the same way. Ethoheptazine, dextropropoxyphene and alfentanil do not share this same dual serotonergic-plus-opioid mechanism, making tramadol the distinctive answer among these options.

## explicit_objective
Attribute tramadol's analgesic action to both weak opioid receptor agonism and serotonin/noradrenaline reuptake inhibition, and connect that same monoaminergic mechanism to its serotonin syndrome risk when combined with an SSRI.

## pitfalls
Treating tramadol as a purely conventional opioid. Its added monoaminergic mechanism is what gives it a genuinely distinct drug-interaction profile (serotonin syndrome risk) that plain opioid agonists like morphine or fentanyl do not share.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-TRAMADOL-DUAL-MECHANISM

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.35,37. Broad greps for "tramadol mechanism" and "tramadol serotonin syndrome" returned no matching concept record; safe to create.

---

# Item

## label
meperidine-metabolite-toxicity-normeperidine

## id
CON-PHM-F3A4B5C6D7E8F9

## canonical_key
meperidine.toxicity.normeperidine-accumulation

## aliases
Meperidine chronic use avoided
Normeperidine seizure risk

## definition
Meperidine (pethidine) is avoided for chronic pain management because of its active metabolite normeperidine, which accumulates with repeated dosing (especially with a shorter half-life than the parent drug and dependence on renal clearance) and is both less analgesic and pro-convulsant, lowering the seizure threshold. This accumulation is a particular danger in renal failure, where normeperidine's renal elimination is impaired, so it builds up further and raises seizure risk substantially; tramadol also lowers the seizure threshold but through a different, serotonergic mechanism rather than a toxic metabolite. Meperidine's chronic-use limitation is specifically metabolite toxicity, not poor oral absorption, patient noncompliance, or diversion/street sale, even though those other concerns can accompany any opioid.

## explicit_objective
Attribute meperidine's unsuitability for chronic pain, and its seizure risk especially in renal failure, to accumulation of its active, pro-convulsant metabolite normeperidine.

## pitfalls
Treating meperidine's chronic-use risk as generic addiction-potential concern. The specific, testable mechanism is metabolite (normeperidine) accumulation and seizure risk, not merely a broader worry about opioid dependence shared by every opioid.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-MEPERIDINE-NORMEPERIDINE

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.36-37. Broad greps for "meperidine normeperidine" and "pethidine seizure metabolite" returned no matching concept record; safe to create.

---

# Item

## label
paracetamol-safest-analgesic-renal-failure

## id
CON-PHM-A4B5C6D7E8F9A0

## canonical_key
paracetamol.safety.preferred-in-renal-failure

## aliases
Analgesic choice in renal failure
Paracetamol renal safety

## definition
In chronic renal failure, paracetamol (acetaminophen) is generally the safest analgesic choice for moderate pain among the common options, because it is metabolised hepatically rather than depending on renal clearance for its own elimination or for clearance of an accumulating toxic metabolite. Morphine and pethidine both have active metabolites that are renally cleared and can accumulate to toxic levels in renal impairment (morphine-6-glucuronide, and pethidine's normeperidine, respectively), while NSAIDs directly reduce renal prostaglandin-mediated blood flow and can worsen renal function further in a patient whose kidneys are already compromised. Paracetamol avoids both of these specific problems, which is why it is preferred, at appropriate doses, in patients with significant renal impairment.

## explicit_objective
Identify paracetamol as the safest analgesic for moderate pain in a patient with chronic renal failure, since it avoids both the renally-cleared toxic-metabolite risk of morphine/pethidine and the direct renal-prostaglandin-blocking risk of NSAIDs.

## pitfalls
Assuming all analgesics are equally risky in renal failure. Each class has a distinct mechanism of renal risk (toxic renally-cleared metabolites for morphine/pethidine, direct prostaglandin-mediated renal blood flow reduction for NSAIDs), and paracetamol is the one option that avoids both.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-PARACETAMOL-RENAL-SAFETY

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.37. Broad greps for "paracetamol renal failure analgesic" and "safest analgesic in renal failure" returned no matching concept record; safe to create.

---

# Item

## label
pentazocine-mixed-agonist-antagonist

## id
CON-PHM-B5C6D7E8F9A0B1

## canonical_key
pentazocine.classification.mixed-agonist-antagonist

## aliases
Pentazocine classification
Mixed opioid agonist-antagonist

## definition
Pentazocine is classified as a mixed opioid agonist-antagonist: it acts as a partial agonist (or agonist) at kappa opioid receptors, producing analgesia, while acting as a weak antagonist or partial agonist at mu opioid receptors. This mixed profile distinguishes it from pure agonists such as heroin and fentanyl, which are full agonists at the mu receptor, and from pure antagonists such as naloxone, which blocks opioid receptors without producing analgesia at all. A clinically important consequence of pentazocine's mixed profile is that, because of its mu-antagonist component, it can precipitate withdrawal if given to a patient already dependent on a pure mu agonist.

## explicit_objective
Classify pentazocine as a mixed opioid agonist-antagonist (kappa agonist, mu antagonist/partial agonist), distinct from pure agonists (heroin, fentanyl) and pure antagonists (naloxone).

## pitfalls
Treating pentazocine as either a straightforward agonist or a straightforward antagonist. Its mixed profile is the whole point: kappa-agonist analgesia coexists with mu-receptor antagonism, a combination that can precipitate withdrawal in a patient dependent on a pure mu agonist.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-PENTAZOCINE-MIXED-AGONIST

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.38. Broad greps for "pentazocine mixed agonist antagonist" returned no matching concept record; safe to create.

---

# Item

## label
morphine-mu-receptor-potassium-channel-mechanism

## id
CON-PHM-C6D7E8F9A0B1C2

## canonical_key
morphine.mechanism.mu-receptor-postsynaptic-potassium-channel

## aliases
Morphine molecular mechanism
Mu-opioid receptor signal transduction

## definition
At the molecular level, morphine's analgesic effect is mediated by mu-opioid receptors, which are Gi/Go-protein-coupled receptors. Their activation opens potassium channels on postsynaptic neurons, hyperpolarising the cell and reducing its excitability, while also closing voltage-gated calcium channels on presynaptic nerve terminals, reducing neurotransmitter (such as substance P and glutamate) release from nociceptive afferents. Both actions reduce nociceptive signal transmission, but the specific postsynaptic action is potassium channel opening, not calcium channel opening (that happens presynaptically, and in the opposite, closing direction), not chloride channel closing, and not stimulation of substance P or glutamate release, which morphine actually suppresses rather than stimulates.

## explicit_objective
State that morphine's mu-receptor action opens potassium channels on postsynaptic neurons, hyperpolarising them and reducing excitability, as part of its overall mechanism of analgesia.

## pitfalls
Mixing up the pre- and postsynaptic actions or their direction. Morphine opens potassium channels postsynaptically (hyperpolarising, inhibitory) and closes calcium channels presynaptically (reducing transmitter release, also inhibitory) — getting either channel type or its direction wrong reverses the intended mechanism.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Opioid analgesics

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Opioid analgesics

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-MORPHINE-MU-RECEPTOR-MECHANISM

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.38. Broad greps for "morphine mu receptor potassium channel mechanism" returned no matching concept record; safe to create.

---

# Item

## label
cyclosporine-calcineurin-il2-transcription

## id
CON-PHM-D7E8F9A0B1C2D3

## canonical_key
cyclosporine.mechanism.calcineurin-interleukin-gene-transcription

## aliases
Cyclosporine mechanism
Calcineurin inhibition

## definition
Cyclosporine is a calcineurin inhibitor: it binds cyclophilin, and the complex inhibits calcineurin, a phosphatase normally required to activate the transcription factor NFAT, which drives gene transcription of interleukin-2 and other cytokines in T lymphocytes. By blocking this calcineurin-mediated gene transcription, cyclosporine suppresses T lymphocyte activation and proliferation, the basis of its use as an immunosuppressant in organ transplantation and severe autoimmune disease. This mechanism, inhibiting the gene transcription of interleukins via calcineurin, is distinct from activating NK cells, from blocking tissue responses to inflammatory mediators, from increasing IgG catabolism, or from interfering with MHC class II-peptide presentation, none of which describes cyclosporine's actual mode of action.

## explicit_objective
State that cyclosporine inhibits calcineurin, blocking NFAT-dependent gene transcription of interleukin-2 and suppressing T lymphocyte activation.

## pitfalls
Confusing cyclosporine's mechanism with a cytokine-receptor-blocking biologic. Cyclosporine acts intracellularly, upstream, preventing the T cell from transcribing interleukin genes in the first place, rather than blocking a cytokine or its receptor after the cytokine is made.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-CYCLOSPORINE-CALCINEURIN

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.45-46. Broad greps for "cyclosporine mechanism calcineurin" returned no matching concept record distinct from the DMARD concepts already authored by this lane (methotrexate, leflunomide, sulfasalazine, rituximab); safe to create.

---

# Item

## label
etanercept-soluble-tnf-receptor-fusion-protein

## id
CON-PHM-E8F9A0B1C2D3E4

## canonical_key
etanercept.mechanism.soluble-tnf-receptor-decoy

## aliases
Etanercept mechanism
TNF receptor fusion protein DMARD

## definition
Etanercept is a biologic disease-modifying antirheumatic drug that works as a soluble TNF-alpha receptor fusion protein: it is a decoy receptor, binding circulating TNF-alpha and preventing it from engaging its cell-surface receptors, effectively blocking soluble TNF-alpha receptor signalling. This mechanism, a fusion protein acting as a decoy soluble receptor, is mechanistically distinct from the monoclonal antibodies infliximab and adalimumab, which also neutralise TNF-alpha but by directly binding it as antibodies rather than by presenting a soluble receptor decoy, and distinct from anakinra (an IL-1 receptor antagonist) and sulfasalazine (a non-biologic prodrug DMARD), neither of which targets TNF-alpha at all.

## explicit_objective
Classify etanercept as a soluble TNF-alpha receptor fusion protein that blocks TNF-alpha by acting as a decoy receptor, distinct from the anti-TNF monoclonal antibodies.

## pitfalls
Lumping every anti-TNF biologic together as identical in mechanism. Etanercept's fusion-protein decoy-receptor mechanism is structurally and mechanistically distinct from the antibody-based mechanism of infliximab and adalimumab, even though all three neutralise TNF-alpha.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-ETANERCEPT-SOLUBLE-RECEPTOR

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.40,46. Broad greps for "etanercept mechanism soluble receptor" returned no matching concept record distinct from the module's existing rituximab concept (CON-PHM-C4E1F8A9D5B6B7), which covers a different biologic (anti-CD20) entirely; safe to create.

---

# Item

## label
tofacitinib-jak-inhibitor

## id
CON-PHM-F9A0B1C2D3E4F5

## canonical_key
tofacitinib.classification.jak-inhibitor

## aliases
Tofacitinib mechanism
JAK inhibitor DMARD

## definition
Tofacitinib is a small-molecule Janus kinase (JAK) inhibitor used as a disease-modifying antirheumatic drug: it blocks intracellular JAK enzymes that normally transduce signals from cytokine receptors (including several interleukin receptors) to the nucleus via the JAK-STAT pathway, so cytokine signalling is interrupted after the cytokine has already bound its receptor. This distinguishes tofacitinib from the biologic DMARDs that act extracellularly, blocking a specific cytokine (like TNF-alpha inhibitors) or a specific receptor (like an IL-1 or IL-6 receptor antagonist) before it can bind at all; tofacitinib instead works one step downstream, inside the cell, and is notably an oral small molecule rather than an injected or infused biologic.

## explicit_objective
Classify tofacitinib as an oral small-molecule JAK inhibitor, blocking intracellular JAK-STAT cytokine signal transduction, distinct from the extracellular cytokine- or receptor-blocking biologic DMARDs.

## pitfalls
Treating tofacitinib as another antibody-based biologic. It is a small molecule taken orally, working intracellularly on the JAK-STAT pathway, a fundamentally different drug class and route of administration from the injected/infused TNF, IL-1 or IL-6 blockers.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-TOFACITINIB-JAK-INHIBITOR

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ pp.42,46. Broad greps for "tofacitinib JAK inhibitor" returned no matching concept record; safe to create.

---

# Item

## label
corticosteroids-bridging-therapy-arthritis

## id
CON-PHM-A0B1C2D3E4F5A6

## canonical_key
corticosteroids.role.bridging-therapy-arthritis

## aliases
Corticosteroid bridging therapy
DMARD onset delay management

## definition
Corticosteroids are used as bridging therapy in rheumatoid arthritis: because conventional DMARDs such as methotrexate typically take weeks to months to produce their full disease-modifying effect, corticosteroids provide rapid symptomatic relief and inflammation control during this delay, and are then tapered once the DMARD has taken effect. This bridging role is distinct from a DMARD's own mechanism, since corticosteroids are not themselves disease-modifying in the same durable sense; leflunomide, sulfasalazine, celecoxib and anakinra each have their own distinct roles (DMARD, DMARD, NSAID/symptom control, and biologic respectively), none of which is specifically the short-term bridging role that corticosteroids fill while a slower-onset DMARD is being established.

## explicit_objective
Identify corticosteroids' bridging-therapy role in rheumatoid arthritis: rapid symptom control while a slower-onset DMARD (such as methotrexate) reaches its full effect.

## pitfalls
Treating corticosteroids as a DMARD themselves. Their bridging role is specifically about covering the gap before a true DMARD's delayed onset, not about producing the same durable, disease-course-modifying effect that DMARDs are defined by.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-CORTICOSTEROID-BRIDGING

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.47. Broad greps for "corticosteroid bridging therapy arthritis" returned no matching concept record; safe to create.

---

# Item

## label
chloroquine-lysosome-phagocyte-mechanism

## id
CON-PHM-B1C2D3E4F5A6B7

## canonical_key
chloroquine.mechanism.lysosome-stabilisation-phagocyte-inhibition

## aliases
Chloroquine mechanism
Antimalarial DMARD lysosomal action

## definition
Chloroquine (and hydroxychloroquine) is an antimalarial-derived DMARD whose anti-rheumatic mechanism includes inhibition of phagocytic cell function and stabilisation of lysosomal membranes, raising lysosomal pH and interfering with antigen processing and presentation, which dampens the autoimmune inflammatory cascade in rheumatoid arthritis. This lysosome-targeted, phagocyte-inhibiting mechanism is distinct from abatacept (a T-cell costimulation blocker), anakinra (an IL-1 receptor antagonist), leflunomide (a pyrimidine synthesis inhibitor) and methotrexate (a dihydrofolate reductase inhibitor), none of which act primarily through lysosomal stabilisation or phagocyte inhibition.

## explicit_objective
Attribute chloroquine's anti-rheumatic action to inhibition of phagocytic function and stabilisation of lysosomal membranes, distinct from the mechanisms of abatacept, anakinra, leflunomide and methotrexate.

## pitfalls
Assuming every DMARD works through cytokine blockade. Chloroquine's mechanism is comparatively old-fashioned and lysosome-centred, interfering with antigen processing rather than directly neutralising a named cytokine or its receptor.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-CHLOROQUINE-LYSOSOME

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.47. Broad greps for "chloroquine lysosome phagocyte" and "chloroquine mechanism rheumatoid arthritis" returned no matching concept record; safe to create.

---

# Item

## label
hydroxychloroquine-retinopathy-adverse-effect

## id
CON-PHM-C2D3E4F5A6B7C8

## canonical_key
hydroxychloroquine.adverse-effect.retinopathy

## aliases
Hydroxychloroquine retinopathy
DMARD ocular toxicity

## definition
Hydroxychloroquine's most clinically significant adverse effect is retinopathy, from drug accumulation in the retinal pigment epithelium, which can progress to irreversible visual loss if unrecognised, so patients on long-term hydroxychloroquine require baseline and periodic ophthalmologic screening. This specific ocular toxicity is not shared by the other listed DMARDs: sulfasalazine's characteristic risks are gastrointestinal and haematological, leflunomide's is hepatotoxicity and teratogenicity, cyclosporine's is nephrotoxicity, and etanercept's is infection/malignancy risk from immunosuppression, none of which is retinopathy.

## explicit_objective
Identify retinopathy as the DMARD-defining adverse effect of hydroxychloroquine, requiring regular ophthalmologic monitoring, and distinguish it from the different characteristic toxicities of sulfasalazine, leflunomide, cyclosporine and etanercept.

## pitfalls
Assuming retinopathy is a general DMARD class effect. It is specifically tied to hydroxychloroquine (and chloroquine) among the DMARDs, from drug accumulation in retinal tissue, not a risk shared by the other agents in this drug class.

## concept_type
directly_taught_pharmacology_concept

## status
under review

## subject
pharm

## primary_node_id
DIS-PHY-T01

## topic
Pharmacology

## subtopic
Analgesics and NSAIDs

## modules
MANS-MSS-202

## module_subject
MANS-MSS-202 > Pharmacology > Analgesics and NSAIDs

## universities
mans

## learner_years
1

## exam_signal
src_9fa49f3f0021440fcce7 | question_book | | authored | MANS-MSS-202

## article_ids
ART-MANS-MSS-HYDROXYCHLOROQUINE-RETINOPATHY

## resource_ids
src_9fa49f3f0021440fcce7

## blueprint_weight
0.3

## exam_weight_by_year
MANS_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.6

## owner
Claude

## publication_status
needs_evidence

## field_notes
arabicLabel: Arabic terminology has not been researched; filled during a later evidence pass rather than guessed.
sourceCandidateIds: Most important MCQ p.48. Broad greps for "hydroxychloroquine retinopathy" returned no matching concept record distinct from the module's existing sulfasalazine/leflunomide concepts, which cover different DMARDs with different toxicity profiles; safe to create.
