<!--
  Library articles for 101 ISK — Anatomy, Year 1, Kasr Al Ainy (kau).

  Eleven articles completing the Anatomy half of the module: the five Upper Limb
  leaves not covered by 101-ISK-anatomy.md — Arm, Shoulder Region, Forearm,
  Muscles of the Back and Veins of the Upper Limb — and the six Basis of Anatomy
  leaves — Introduction, Fascia, Skeletal system, Cardiovascular system,
  Lymphatic system and Nervous system.

  Two sources of record, both taken from ../manifest/kasr-y1-sources.json:

    src_b1e6dc481eaf337268d0 — "Normal Structure of the Human Body (ISK - 101)",
      staff of the Histology and Anatomy Departments, Faculty of Medicine, Cairo
      University. Part II is Anatomy. PDF page 64 opens Part II and Anatomy's own
      page 1 is PDF page 66, so an internal page n is PDF page n + 65. The
      Basis of Anatomy chapters run PDF 108-151 and the Upper Limb chapters
      PDF 152-260; page references below are given as PDF pages, because that is
      the number a reader can type into a viewer without arithmetic.

    src_fc7ea5960363431009ed — Dr. Galal's final-revision compendium, 77 pages,
      flagged by the repository owner as authoritative priority material. Its
      topics are marked "Q." where he counts them high-yield, and those markers
      are recorded in scripts/kasr/extract/practical.json as writtenItems. Every
      origin/insertion/nerve/action table below is checked against his.

  What the question books ask of each leaf was read from
  scripts/kasr/extract/mcq-bank.json, filtered by `leaf`. The bank's own answer
  letters disagree with each other across sources for the same stem often enough
  that no answer key is treated as evidence here; only the stems and options were
  used, to see what the examiners ask about. That disagreement is recorded in
  `evidence_gaps` on the articles where it bites hardest.

  `related_concepts` is what the coverage check reads. Each article lists every
  concept in ../concept/101-ISK-concepts.md and ../concept/101-ISK-mcq-concepts.md
  whose `module_subject` is that article's own subject path, copied rather than
  re-derived, and every listed concept is taught in the prose. Five leaves carry
  no concept at all yet — Muscles of the Back, Veins of the Upper Limb,
  Introduction, Skeletal system, Cardiovascular system, Lymphatic system and
  Nervous system — and their `field_notes` say so rather than borrowing one.

  The repository holds zero medical images (../media-requests/media-audit.md).
  Every plate these articles need is written as an `image_recommendations` block
  for a human to source. Nothing here downloads, generates or attaches an asset.

  Import: Content Setup › Bulk Import › Library articles.
-->

# Item
## id
ART-101-ANA-ARM
## title
The arm
## subject
msk
## status
Draft
## owner
Claude
## topic
Upper limb
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-ANATOMY
## archetype
anatomy
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Anatomy > Upper Limb > Arm
## primary_node_id
DIS-ANA-T02
## secondary_node_ids
SYS-MSK-T01-S01-M02
SYS-MSK-T01-S01-M03
## related_concepts
CON-MSK-798DE81B6EE665
CON-MSK-74BFAB9385B955
## related_articles
ART-101-ANA-RADIAL-NERVE: The radial nerve's whole course, its branches level by level and the wrist-drop lesion are set out there; this article carries only what the nerve does inside the arm.
ART-101-ANA-ELBOW-JOINT: The joint the arm's muscles move and the anastomosis that surrounds it are described there in the joint's own terms.
ART-101-ANA-AXILLA-BREAST: The axillary artery, whose lower border of teres major is where this article's brachial artery begins.
## aliases
Arm | Brachium | Compartments of the arm | Brachial artery | Cubital fossa | Musculocutaneous nerve
## reading_time
14
## summary
The arm is two compartments with four muscles, and almost everything the examiner asks follows from a single fact: the deep fascia sends two septa to the humerus, and every nerve and vessel in the region is described by which side of those septa it is on and where it crosses them. The brachial artery is superficial the whole way and ends one centimetre below the elbow joint, not at it. The cubital fossa holds four things in a fixed medial-to-lateral order, and the bicipital aponeurosis in its roof is the reason a needle in the median cubital vein does not reach the artery.
## sections
### Overview and position
The arm is the segment between the shoulder and the elbow. Its skeleton is the single shaft of the humerus, and its soft tissue is wrapped in the brachial fascia — the deep fascia of the arm — which forms a sheath around the muscles, thin in front and thick behind.

From the deep surface of that sheath two fibrous sheets run inwards to the humerus: the **lateral intermuscular septum** and the **medial intermuscular septum**. They divide the arm into two compartments and give extra surface for muscle attachment.

The **anterior (ventral, flexor) compartment** contains three muscles. The **posterior (dorsal, extensor) compartment** contains one. That asymmetry — three in front, one behind — is worth holding, because a question that asks for "the muscles of the arm" is asking for four names, not for a long list.

The septa are not inert partitions. Each is crossed by exactly one named structure, and those two crossings are among the most heavily asked single facts on this leaf.

- The **ulnar nerve** pierces the **medial** intermuscular septum, at the middle of the arm, and leaves the front of the arm for the back.
- The **radial nerve** pierces the **lateral** intermuscular septum, in the lower third, with the radial collateral artery, and comes from the back of the arm to the front.

Both septa also give attachment to muscle: the lateral to brachioradialis and extensor carpi radialis longus in front of it and to the triceps behind, the medial and lateral both to brachialis, which arises from the anterior aspect of both septa.

### Structure
**The flexor group** is three muscles in two layers: biceps and coracobrachialis superficially, brachialis deep to them. All three are supplied by the **musculocutaneous nerve**, with one qualification the department book states and the question books use — the small lateral part of brachialis is also supplied by a twig from the **radial nerve**, so brachialis has a double nerve supply.

**Biceps brachii.** Origin by two heads: the **short head** from the tip of the coracoid process, in common with coracobrachialis; the **long head** from the **supraglenoid tubercle**, its tendon running down inside the shoulder joint and then in the bicipital groove. Insertion in two parts: the **bicipital tendon** into the **radial tuberosity**, and the **bicipital aponeurosis** into the deep fascia in the roof of the cubital fossa. Nerve supply musculocutaneous. Action: it is the **powerful supinator** of the forearm, acting when the elbow is flexed; it flexes the elbow; the long head tendon stabilises the head of the humerus; and the short head assists flexion at the shoulder.

**Coracobrachialis.** Origin from the tip of the coracoid process, in common with the short head of biceps. Insertion into the middle of the medial border of the shaft of the humerus. Nerve supply musculocutaneous — the nerve pierces this muscle. Action: assists flexion and adduction at the shoulder joint.

**Brachialis.** Origin from the lower half of the front of the shaft of the humerus and from the anterior aspects of both intermuscular septa. Insertion into the **coronoid process and the ulnar tuberosity**. Nerve supply musculocutaneous, plus a radial twig to its small lateral part. Action: it is the **primary flexor of the elbow**, and the one that still works when the forearm is pronated.

**The extensor group** is one muscle.

**Triceps.** Origin by three heads: the **long head** from the **infraglenoid tubercle** of the scapula; the **lateral head** from the upper lip of the spiral groove on the back of the humerus; the **medial head** from the back of the shaft below the spiral groove. Insertion into the **upper surface of the olecranon process**, with a few deep fibres — **articularis cubiti** — inserting into the posterior part of the fibrous capsule of the elbow. Nerve supply **radial nerve**, given in two instalments: branches to the long and medial heads in the axilla, and branches to the lateral and medial heads in the spiral groove. Action: the powerful extensor of the elbow; articularis cubiti draws the back of the capsule upwards during extension so that it is not nipped inside the joint.

**The cubital fossa** is the triangular hollow at the lower end of the arm, and the department book describes it at the head of the Forearm chapter while the papers file its question on this leaf. It is an inverted triangular hollow in front of the elbow joint, occupying the upper third of the front of the forearm.

Its **base** is directed upwards and is an imaginary line between the two epicondyles of the humerus. Its **lateral boundary** is brachioradialis and its **medial boundary** is pronator teres; its **apex** is where brachioradialis overlaps pronator teres. Its **floor** is brachialis medially and supinator laterally.

Its **roof** is built in two storeys. Skin and superficial fascia carry parts of the cephalic and basilic veins with the **median cubital vein** connecting them, the anterior branches of the lateral and medial cutaneous nerves of the forearm, and the **supratrochlear lymph nodes** in the upper lateral part. Beneath them lies deep fascia, reinforced by the **bicipital aponeurosis**.

Its **contents, from medial to lateral**, are four: the **median nerve**; the **termination of the brachial artery** with the beginnings of the ulnar and radial arteries; the **tendon of biceps**; and the **radial nerve** with the beginning of its posterior interosseous branch. The exits are as fixed as the order — the median nerve leaves between the two heads of pronator teres, the radial artery through the apex, the ulnar artery deep to pronator teres, and the posterior interosseous nerve by piercing supinator.

### Relations
The middle of the arm, opposite the insertion of coracobrachialis, is where four things happen at once, and the department book lists them together because they are one event seen four ways.

The **median nerve crosses the brachial artery** from lateral to medial — in front of the artery or behind it, and the book allows both. The **ulnar nerve leaves** the artery by piercing the medial intermuscular septum into the posterior compartment. The **basilic vein and the medial cutaneous nerve of the forearm** leave the artery by piercing the deep fascia to become superficial. And the **superior ulnar collateral artery** and the **nutrient artery to the humerus** both arise from the brachial artery at that level.

So the relation of the median nerve to the brachial artery has three answers depending on where you cut: lateral in the upper half, crossing in the middle, medial in the lower half and in the cubital fossa. The examiner asks for the level, not for one answer.

The **radial nerve** is described by three positions in the arm. In the upper part it passes downwards and laterally behind the proximal part of the brachial artery, separating it from the long head of triceps. In the middle part it leaves the front of the arm between the long and medial heads of triceps to reach the **spiral groove**, where it runs between the lateral and medial heads with the profunda brachii vessels. In the lower third it pierces the lateral intermuscular septum with the radial collateral artery and descends between **brachialis and brachioradialis** to the front of the lateral epicondyle.

The **musculocutaneous nerve** descends lateral to the third part of the axillary artery and the uppermost part of the brachial, **pierces coracobrachialis**, and then runs obliquely between biceps and brachialis. About one inch above the elbow it pierces the deep fascia at the lateral border of the biceps tendon and continues as the **lateral cutaneous nerve of the forearm**, which supplies the skin of the lateral side of the forearm and the upper part of the ball of the thumb.

Note the two piercings side by side, because the question books put them in the same stem: musculocutaneous pierces **coracobrachialis**, radial pierces the **lateral intermuscular septum**, ulnar pierces the **medial intermuscular septum**.

### Blood supply, innervation and lymphatics
**The brachial artery** is the axis of the arm and the subject of a five-mark question in its own right.

**Beginning:** at the **lower border of teres major**, as the continuation of the axillary artery. **Course:** it descends on the medial side of the shaft of the humerus, then passes to the front of the arm and descends midway between the two epicondyles into the cubital fossa. **End:** in the cubital fossa, **1 cm below the elbow joint, at the level of the neck of the radius**, by dividing into the **radial and ulnar arteries**.

It is **superficial throughout its entire course**, covered only by skin and the superficial and deep fasciae, though slightly overlapped above by coracobrachialis and the medial edge of biceps. It is accompanied by **two venae comitantes**.

Its branches are six groups, and the enumeration is what is marked.

1. **Profunda brachii** — the largest and highest branch, arising from the posteromedial aspect of the artery just below the lower border of teres major. It accompanies the radial nerve, runs backwards between the long and medial heads of triceps and through the **lower triangular space** to the spiral groove, where the lateral head of triceps covers it. Its own branches are muscular to triceps, a small nutrient artery to the humerus (which may be absent), an ascending branch to the cruciate anastomosis around the surgical neck, and **two terminal descending branches** — the anterior descending or **radial collateral**, and the posterior descending or **middle collateral**.
2. **Superior ulnar collateral artery** — arising about the middle of the arm opposite the insertion of coracobrachialis, accompanying the **ulnar nerve** to the back of the medial epicondyle.
3. **Inferior ulnar collateral artery** — arising 5 cm above the elbow joint, giving an anterior branch that descends in front of the medial epicondyle, then piercing the medial intermuscular septum to reach the back of it.
4. **Nutrient artery to the humerus** — arising about the middle of the arm, opposite the insertion of coracobrachialis, entering the nutrient canal.
5. **Muscular branches** — to biceps, brachialis and coracobrachialis.
6. **Terminal branches** — the radial and ulnar arteries.

**The anastomosis around the elbow joint** links the brachial artery above the joint with the radial and ulnar arteries below it, and it is described in four quarters plus one bridge. Behind the medial epicondyle: superior ulnar collateral and the posterior branch of inferior ulnar collateral, both from the brachial, meeting the posterior ulnar recurrent from the ulnar. In front of the medial epicondyle: the anterior branch of inferior ulnar collateral, from the brachial, meeting the anterior ulnar recurrent from the ulnar. Behind the lateral epicondyle: the middle collateral, from profunda brachii, meeting the posterior interosseous recurrent, from the ulnar by way of the posterior interosseous. In front of the lateral epicondyle: the radial collateral, from profunda brachii, meeting the radial recurrent, from the radial. The **transverse anastomosis** lies above the olecranon fossa, between the inferior ulnar collateral and the posterior descending branch of profunda brachii.

**Nerves.** Four nerves belong to the arm: musculocutaneous, radial, ulnar and median. Only the first two supply anything here — the ulnar and median pass through without a branch in the axilla or the arm, and the department book says so explicitly. That silence is examined: "the ulnar nerve gives no branch in the arm" is a fact, not an omission.

**Cutaneous supply of the arm** comes from four named nerves. The **intercostobrachial nerve**, the lateral cutaneous branch of the second intercostal nerve, supplies the floor of the axilla and the upper part of the medial side of the arm. The **medial cutaneous nerve of the arm**, from the medial cord, supplies the lower part of the medial side. The **upper lateral cutaneous nerve of the arm**, the continuation of the posterior branch of the axillary nerve, supplies the skin over the lower half of deltoid. The **lower lateral cutaneous nerve of the arm** and the **posterior cutaneous nerve of the arm**, both from the radial nerve, supply the lower half of the lateral side and the back of the arm respectively.

**Lymphatics** of the arm follow the main arteries to the **lateral (humeral) group** of axillary nodes, with a few deep nodes lying along the brachial artery on the way.

### Development
The department book gives no developmental account of the arm in this chapter, and the module's embryology chapters stop at the fetal period without following the limb bud. Nothing is offered here in its place; the gap is recorded in `evidence_gaps` rather than filled from another textbook.

### Surface and imaging anatomy
The **brachial artery** is represented by a line drawn between two points: a point at the **posterior fold of the axilla**, where the pulsation of the axillary artery can be felt, and a point **midway between the two epicondyles of the humerus, medial to the tendon of biceps**. The lower point is where the artery is compressed with a stethoscope for a blood pressure, and where its pulsation is sought in the cubital fossa.

The **middle third of the humerus** carries the deltoid tuberosity on its lateral surface, the insertion of coracobrachialis on its medial border, and the spiral groove on its posterior surface. Those three are asked as a single-best-answer item that turns entirely on the surface each lies on, so learn them by surface rather than by name.

The **median cubital vein** is the most prominent superficial vein in the body and the standard site for venepuncture. Its safety is anatomical: the **bicipital aponeurosis** lies deep to it and separates it from the brachial artery and median nerve.

### Clinical correlations
**Fracture of the shaft of the humerus and the spiral groove.** The radial nerve lies directly on bone in the spiral groove, and a mid-shaft fracture is the classic cause of its injury. The motor result is failure of supination of the extended forearm and **wrist drop with finger drop**; the sensory result is paraesthesia on the back of the arm and forearm and the lateral two-thirds of the dorsum of the hand, with a small area of complete loss between the first and second metacarpals. Triceps is **not** completely paralysed, because the branches to the long and medial heads have already been given in the axilla — which is why elbow extension is impaired rather than lost, and why "complete paralysis of triceps" is a wrong option that looks right.

**Supracondylar fracture of the humerus** is the department's named cause of **median nerve** injury above the elbow. The fragment lies immediately in front of the artery and the nerve at the level where both are still in the midline of the front of the arm.

**Injury to the musculocutaneous nerve** takes out biceps, brachialis (except its small lateral part) and coracobrachialis, so elbow flexion is weakened rather than lost — brachioradialis, supplied by the radial nerve, and the radial twig to brachialis remain — and supination is weakened, because biceps is the powerful supinator.

**Why the arm is where a tourniquet goes.** The brachial artery is superficial along its whole course and lies against the shaft of the humerus, so it can be compressed against bone anywhere in the arm. The same superficiality is why a wound of the front of the arm bleeds from a major artery covered by nothing but skin and fascia.

**Why the collateral circulation matters at the elbow.** The anastomosis around the elbow joins the brachial above with the radial and ulnar below. A gradual block of the brachial artery between the origin of profunda brachii and the bifurcation can be bypassed by it, which is why a limb distal to a slowly occluded brachial artery may stay viable.

### Variations and anomalies
The department book records one variation directly and implies a second. The **median nerve may cross the brachial artery either in front of it or behind it** at the middle of the arm; both are normal, and an examination option that says "in front of the artery in all people" is wrong for that reason. The **nutrient artery of the humerus** from profunda brachii **may be absent**, the nutrient supply then coming from the brachial artery's own nutrient branch.

Beyond these two the sources describe no variant of the arm's vessels or muscles — no high division of the brachial artery, no superficial brachial artery, no third head of biceps — and none is asserted here.
## hold_these
The arm has two compartments: an anterior flexor compartment with three muscles and a posterior extensor compartment with one.
The ulnar nerve pierces the medial intermuscular septum; the radial nerve pierces the lateral intermuscular septum; the musculocutaneous nerve pierces coracobrachialis.
Biceps has a long head from the supraglenoid tubercle and a short head from the tip of the coracoid, inserting by the bicipital tendon into the radial tuberosity and by the bicipital aponeurosis into the deep fascia.
Biceps is the powerful supinator, acting when the elbow is flexed; brachialis is the primary flexor of the elbow.
Brachialis is supplied by the musculocutaneous nerve, with a twig from the radial nerve to its small lateral part.
Triceps arises by a long head from the infraglenoid tubercle, a lateral head above the spiral groove and a medial head below it, and inserts into the upper surface of the olecranon.
The radial nerve supplies the long and medial heads of triceps in the axilla and the lateral and medial heads in the spiral groove.
The brachial artery begins at the lower border of teres major and ends 1 cm below the elbow joint at the level of the neck of the radius.
The brachial artery is superficial throughout its course and is accompanied by two venae comitantes.
Its branches are profunda brachii, superior ulnar collateral, inferior ulnar collateral, nutrient to the humerus, muscular, and the two terminals.
Profunda brachii accompanies the radial nerve through the lower triangular space to the spiral groove.
The median nerve is lateral to the brachial artery in the upper arm, crosses it at the middle, and is medial to it below and in the cubital fossa.
The cubital fossa is bounded laterally by brachioradialis and medially by pronator teres, with brachialis and supinator as its floor.
Its contents from medial to lateral are median nerve, end of brachial artery, tendon of biceps, radial nerve.
The bicipital aponeurosis in the roof separates the median cubital vein from the median nerve and the brachial artery.
## lose_the_mark
Saying the brachial artery ends at the elbow joint. It ends 1 cm below the joint, at the level of the neck of the radius, which is why one vessel is still palpable where the fossa is entered.
Putting the ulnar nerve through the lateral intermuscular septum. Ulnar pierces the medial septum and radial the lateral one; swapping them turns two marks into none.
Giving biceps an insertion into the ulnar tuberosity. That is brachialis. Biceps goes to the radial tuberosity and to the deep fascia by its aponeurosis.
Naming supinator alone as the supinator. Biceps is the powerful one, and the question about why supination beats pronation is asking for biceps and supinator together.
Answering "complete paralysis of triceps" for a radial nerve lesion in the spiral groove. The long and medial heads were already supplied in the axilla; elbow extension is impaired, not lost.
Calling brachialis a purely musculocutaneous muscle. Its small lateral part takes a radial twig, and its double supply is a stock single-best-answer item.
Listing the cubital fossa contents lateral to medial. The department book fixes the order medial to lateral, and marks are given against that order.
Putting the musculocutaneous nerve in the cubital fossa. It has already pierced the deep fascia an inch above the elbow and become the lateral cutaneous nerve of the forearm; the nerve in the fossa's lateral corner is the radial.
Forgetting the bicipital aponeurosis when asked why venepuncture at the elbow is safe. The aponeurosis is the answer, not the depth of the vein.
Saying the median nerve always crosses in front of the brachial artery. The department book allows either in front or behind.
## image_recommendations
### diagram · Transverse section of the mid-arm with the humerus, the brachial fascia as an encircling line, the medial and lateral intermuscular septa running from it to bone, the anterior compartment tinted with biceps, coracobrachialis and brachialis and the posterior with triceps, and every nerve and vessel marked in the compartment it actually lies in
Purpose: The whole leaf is organised by which side of a septum a structure is on, and a cross-section is the only view in which "medial septum" and "lateral septum" are positions rather than words. Students who cannot picture the section reliably swap the ulnar and radial nerves' piercings.
Priority: required
Status: needed
Kind: diagram
Section: Overview and position
Source direction: purpose-drawn, following the department book's Fig. 40 (PDF page 194), redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
Notes: Serves concepts CON-MSK-798DE81B6EE665 and CON-MSK-74BFAB9385B955 indirectly by fixing the frame both are described in.
### anatomy plate · The brachial artery from the lower border of teres major to its bifurcation at the neck of the radius, with all six branch groups labelled, the two venae comitantes shown, and the median nerve drawn crossing it at the middle of the arm
Purpose: The examined question is a beginning, an end and a list of branches, and each branch is defined by the level it leaves at. One figure with levels marked lets the six be counted; prose lets them be merged.
Priority: required
Status: needed
Kind: anatomy plate
Section: Blood supply, innervation and lymphatics
Source direction: purpose-drawn, following the department book Figs. 48 and 49 (PDF pages 201-202) and Dr. Galal's revision page 14
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-798DE81B6EE665, whose exam question was "Mention origin and end of the Brachial artery, and enumerate its branches", 5 marks.
### diagram · The cubital fossa opened, with the triangle's base, apex, brachioradialis and pronator teres labelled, the floor of brachialis and supinator tinted, and the four contents drawn in their medial-to-lateral order beside a second panel showing the roof with the median cubital vein lying on the bicipital aponeurosis
Purpose: The answer is an order and a layering, and both are spatial. The roof panel is what makes the venepuncture point self-evident instead of a remembered sentence.
Priority: required
Status: needed
Kind: diagram
Section: Structure
Source direction: purpose-drawn, following the department book Figs. 52, 53 and 54 (PDF pages 206-207)
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-74BFAB9385B955, exam question "Describe the anatomy of the cubital fossa (site, boundaries, floor and contents)", 5 marks.
### diagram · The anastomosis around the elbow drawn on the two epicondyles, four groups labelled — behind and in front of the medial epicondyle, behind and in front of the lateral epicondyle — plus the transverse anastomosis above the olecranon fossa, each vessel tagged with its parent artery
Purpose: Every vessel in this list is a pair, and the mark is for pairing the collateral with the recurrent that meets it. A network drawing pairs them by adjacency; a list of eight names does not.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Blood supply, innervation and lymphatics
Source direction: purpose-drawn, following the department book Fig. 51 (PDF page 204) and Dr. Galal's revision page 14
Rights: newly drawn for this product, or CC-BY / public domain
### imaging example · Antero-posterior radiograph of a normal adult humerus, unlabelled, with a companion labelled drawing marking the middle third, the deltoid tuberosity laterally, the coracobrachialis insertion on the medial border and the spiral groove posteriorly
Purpose: The middle-third question is asked as a surface-by-surface item, and a student who has only read the three names in a sentence cannot assign them to surfaces under exam pressure.
Priority: optional
Status: needed
Kind: imaging example
Section: Surface and imaging anatomy
Rights: consented or openly licensed radiograph; no all-rights-reserved atlas image
## conflicts
Where the cubital fossa is taught. The department book describes the cubital fossa at the head of the Forearm chapter (PDF pages 206-207) and Dr. Galal's revision puts it on his forearm pages, while the concept drafted from the paper files it under the Arm leaf. This article teaches it here, on the leaf the question sits on, and the forearm article cross-refers rather than repeating it.
Nerve supply of brachialis. Dr. Galal's table gives brachialis as "musculo-cutaneous & radial nn." without qualification; the department book gives musculocutaneous to the muscle with a radial twig to a small lateral part only. This article follows the department book, which is the more specific statement, and both are recorded because the question books ask the item both ways.
Origin of the lateral head of triceps. The department book says "the upper lip of the spiral groove, on the posterior surface of humerus"; Dr. Galal's table says "upper lip of spiral groove humerus". They agree; the wording is recorded because a student revising from a third summary that says "above the spiral groove" has the same fact in words the marker may not recognise.
## evidence_gaps
Neither source gives a developmental account of the arm, so the Development section reports the absence rather than an embryology. The limb bud, its rotation and the segmental origin of the arm's muscles are not taught anywhere in this module's material.
The department book does not state the segmental root value of the musculocutaneous nerve's cutaneous territory, nor of the medial and intercostobrachial cutaneous nerves. Root values are given only for the named trunks.
The MCQ bank (scripts/kasr/extract/mcq-bank.json) carries mutually contradictory answer letters for several stems on this leaf — the same profunda brachii stem is keyed A in one source file and C in another, and the same radial-nerve-in-spiral-groove stem is keyed A and C. No answer key from that bank has been used as evidence here; only the stems were read, to see what is asked. A faculty reviewer should key this leaf's items directly.
No independent citation has been attached to any statement in this article. Every taught fact traces to two Kasr sources that agree with each other, which is agreement rather than corroboration.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Chapter 5 "Arm", PDF pages 194-204 — deep fascia and intermuscular septa, flexor and extensor groups, musculocutaneous nerve, radial nerve in the arm, brachial artery and its branches, surface anatomy, anastomosis around the elbow.
Department Book Module 101, Chapter 6 "Forearm", PDF pages 206-207 — the cubital fossa: definition, site, boundaries, roof, floor and contents.
Dr. Galal final revision (src_fc7ea5960363431009ed), pages 12, 14, 16 and 18 — "Q. Muscles of front arm", "Q. Biceps brachii", "Q. Musculocutaneous n.", "Q. Triceps", "Q. Brachial artery", "Q. Profunda brachii", "Q. Anastomosis around elbow", "Q. Radial n. in axilla & arm", "Q. Cubital fossa: boundaries and contents".
scripts/kasr/extract/mcq-bank.json, leaf "Arm" — 68 distinct question stems, read for what the examiners ask and not for their answer keys.
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead, which is the admin-side request queue rather than a student-visible asset.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the reciprocal link is written from the question side, which is where the importer maintains it.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
publishedSummary: Not published — this article has not passed the evidence gate, so there is no student projection yet.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Development: The absence of a developmental account is the source's, not an omission here; it is recorded in evidence_gaps.
## notes
Written from the two Kasr sources, which agree on every table in this chapter. The three divergences that exist are of placement and of wording rather than of fact, and are recorded in conflicts.

---

# Item
## id
ART-101-ANA-SHOULDER-REGION
## title
The shoulder region
## subject
msk
## status
Draft
## owner
Claude
## topic
Upper limb
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-ANATOMY
## archetype
anatomy
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Anatomy > Upper Limb > Shoulder Region
## primary_node_id
DIS-ANA-T02
## secondary_node_ids
SYS-MSK-T01-S01-M01
SYS-MSK-T03-S02-M03
## related_concepts
CON-MSK-82C4250560D1A1
CON-MSK-1CA86BE843A07C
CON-MSK-DF8F395F3D471E
CON-MSK-8533FCB18D819B
CON-MSK-04D3ACA71DC025
## related_articles
ART-101-ANA-MUSCLES-OF-THE-BACK: Trapezius, the rhomboids and levator scapulae are the other half of the shoulder girdle's muscle list, and the article that carries them also carries the retraction and downward-rotation columns.
ART-101-ANA-AXILLA-BREAST: The axilla lies immediately below this region, and the long thoracic nerve that rotates the scapula runs on its medial wall.
ART-101-ANA-RADIAL-NERVE: The radial nerve leaves this region through the lower triangular space, which is one of the three intermuscular spaces described here.
## aliases
Shoulder region | Scapular muscles | Deltoid | Rotator cuff | Quadrangular space | Intermuscular spaces | Anastomosis around the scapula
## reading_time
15
## summary
Five of this module's written questions sit on this one leaf, and four of them are answered by the same picture: six muscles running from the scapula to the humerus, three gaps between them, and the vessels and nerves that use the gaps. The fifth is abduction, and abduction is a relay — supraspinatus 0 to 15 degrees, middle deltoid 15 to 90, then the scapula itself rotates from 90 to 180 under trapezius and serratus anterior. Answer any abduction question by naming the arc first and the muscles second.
## sections
### Overview and position
The shoulder region is the group of muscles that surrounds the shoulder joint and runs from the scapula to the humerus. The department book names six: **deltoid, supraspinatus, infraspinatus, teres major, teres minor and subscapularis**.

Four of the six — supraspinatus, infraspinatus, teres minor and subscapularis — blend their tendons with the capsule of the shoulder joint and together form the **rotator muscle cuff** (the musculo-tendinous cuff). Teres major is not one of them, and deltoid is not one of them; that exclusion is the single most-asked fact about the cuff.

Immediately below the joint, the muscles leave three gaps between themselves and the humerus. These are the **intermuscular spaces** — one quadrangular and two triangular — and each carries its own named contents.

The region has to be learnt with the **shoulder girdle** rather than apart from it, because the joint alone cannot raise the arm above the head. The girdle is the clavicle and the scapula, moving at the sterno-clavicular and acromio-clavicular joints, and its muscles come mostly from the back and the pectoral region rather than from here.

### Structure
**Deltoid** is the muscle of this region the examiner asks most often, and the whole question is that its three sets of fibres do three different things.

*Origin* — a **V-shaped** origin from three places: the **anterior border of the lateral third of the clavicle** (anterior fibres), the **lateral border of the acromion** (middle fibres), and the **lower lip of the crest of the spine of the scapula** (posterior fibres).
*Insertion* — the **deltoid tuberosity**, at the middle of the lateral surface of the shaft of the humerus.
*Nerve supply* — the **circumflex (axillary) nerve**, C5 and C6.
*Action* — anterior fibres **flex and medially rotate** the arm; posterior fibres **extend and laterally rotate** it; middle fibres **abduct the arm from 15° to 90°**.

**Supraspinatus.** Origin from the medial two-thirds of the supraspinous fossa. Insertion into the **highest impression** on the greater tuberosity. Nerve supply **suprascapular nerve** (C5, 6). Action: steadies the head of the humerus in the glenoid cavity, and **abducts the arm from 0° to 15°** — it initiates abduction.

**Infraspinatus.** Origin from the medial two-thirds of the infraspinous fossa. Insertion into the **middle impression** on the back of the greater tuberosity. Nerve supply suprascapular nerve (C5, 6). Action: steadies the head of the humerus; **laterally rotates** the arm.

**Teres minor.** Origin from the upper two-thirds of the dorsal surface of the lateral border of the scapula. Insertion into the **lowest impression** on the back of the greater tuberosity. Nerve supply **axillary (circumflex) nerve** (C5, 6). Action: steadies the head of the humerus; **adducts and laterally rotates** the arm.

**Teres major.** Origin from the **lower third** of the dorsal surface of the lateral border of the scapula. Insertion into the **medial lip of the bicipital groove**. Nerve supply **lower subscapular nerve** (C5, 6). Action: **adduction, medial rotation and extension** of the arm.

**Subscapularis.** Origin from the medial two-thirds of the subscapular fossa, on the front of the scapula. Insertion into the **lesser tuberosity**. Nerve supply **upper and lower subscapular nerves** (C5, 6). Action: stabilises the anterior aspect of the shoulder joint; **medial rotation and adduction** of the arm.

Three insertions on the greater tuberosity, in order from above down: supraspinatus, infraspinatus, teres minor. One on the lesser tuberosity: subscapularis. One on the medial lip of the bicipital groove: teres major. Learn the tuberosity map and the cuff membership follows from it — the three greater-tuberosity muscles plus the one lesser-tuberosity muscle are the cuff, and the muscle that reaches the groove instead of the tuberosity is the one that is not.

**Serratus anterior** belongs anatomically to the muscles connecting the limb with the thoracic wall, but the department book describes it inside this chapter because its action is a shoulder-girdle action.

*Origin* — eight digitations from the outer surfaces of the **upper eight ribs**, midway between their angles and their costal cartilages; the first digitation is the largest and arises from the first and second ribs.
*Insertion* — the **ventral surface of the medial border of the scapula**: the first digitation into the superior angle, the second and third fanning out along the whole medial border, and the **lower five converging on the inferior angle**.
*Nerve supply* — the **nerve to serratus anterior (long thoracic nerve, nerve of Bell), C5, 6, 7**, which arises from the roots of the plexus and descends vertically on the outer surface of the muscle in the mid-axillary line.
*Action* — it is the **main and powerful protractor** of the shoulder, assisted by pectoralis minor; acting with the upper and lower fibres of trapezius, its **lower five digitations rotate the scapula so the glenoid cavity looks upwards**; it fixes the scapula to the chest wall; and with the scapula fixed it pulls on the ribs in forced inspiration.

**The three intermuscular spaces** lie just below the shoulder joint, and each is a set of boundaries with its own contents.

**Quadrangular space** (the lateral one). Above: **teres minor** seen from behind, **subscapularis** seen from in front, with the capsule of the shoulder joint. Below: **teres major**. Medially: the **long head of triceps**. Laterally: the **surgical neck of the humerus**. Contents: the **posterior circumflex humeral vessels** and the **axillary (circumflex) nerve**.

**Upper triangular space** (the medial one). Above: teres minor behind and subscapularis in front. Below: teres major. Laterally: the **long head of triceps**. Contents: the **circumflex scapular artery**, and nothing else.

**Lower triangular space** (the triangular interval). It lies just lateral to the long head of triceps and is separated from the quadrangular space by teres major. Above: **teres major**. Medially: the **long head of triceps**. Laterally: the **lateral head of triceps and the shaft of the humerus**. Contents: the **radial nerve** and the **profunda brachii vessels**.

The long head of triceps is the hinge of the whole arrangement: it is the **medial** boundary of the quadrangular space and the **lateral** boundary of the upper triangular space. Which side of that one muscle a structure passes is what separates the axillary nerve from the circumflex scapular artery.

### Relations
**The deltopectoral groove** lies between the contiguous borders of pectoralis major and deltoid and ends above, just below the clavicle, in the infraclavicular fossa. It lodges the **uppermost part of the cephalic vein**, the **deltoid branch of the thoraco-acromial artery**, and the **deltopectoral (infraclavicular) lymph nodes**.

Deltoid covers the shoulder joint on three sides and gives the shoulder its rounded contour, so its loss is visible as a change of shape rather than only as a loss of movement.

The **axillary nerve** wraps round the **surgical neck of the humerus** after passing back through the quadrangular space, which puts it against bone at the one place the humerus commonly breaks in the elderly and dislocates in the young.

The **rotator cuff tendons** lie between the head of the humerus and the acromion with the joint capsule, so anything that narrows that gap presses on them.

### Blood supply, innervation and lymphatics
**The anastomosis around the scapula** is a five-mark question, and the mark is for naming each vessel with its parent trunk.

From the **first part of the subclavian artery**, by way of the **thyro-cervical trunk**: the **suprascapular artery** and the **deep branch of the transverse cervical artery**.
From the **third part of the axillary artery**: the **subscapular artery** and its branch the **circumflex scapular artery**.
From the **descending thoracic aorta**: the **posterior intercostal arteries**.

Its clinical importance is what the anatomy is for: blood can bypass an obstruction lying anywhere between the **first part of the subclavian artery and the third part of the axillary artery**, keeping the upper limb supplied. Through the posterior intercostal contribution it can also maintain flow to the lower half of the body in **coarctation of the aorta**.

Two neighbouring anastomoses are asked in the same breath and are not the same thing. The **cruciate anastomosis around the surgical neck** is made of the descending branch of the suprascapular artery, the anterior and posterior circumflex humeral arteries from the third part of the axillary, and the ascending branch of profunda brachii from the brachial. The **anastomosis around the shoulder joint** is made of the acromial and deltoid branches of the thoraco-acromial artery, the suprascapular artery, and the ascending branch of the anterior circumflex humeral artery.

**Nerve supply of the region** runs on two root values and four nerves: **suprascapular** (supraspinatus, infraspinatus), **axillary/circumflex** (deltoid, teres minor), **upper and lower subscapular** (subscapularis; lower subscapular also teres major), all C5 and C6.

**Cutaneous supply** over the shoulder is shared. The **lateral supraclavicular nerves**, from C3 and C4, supply the skin over the **upper half of deltoid**; the **upper lateral cutaneous nerve of the arm**, the continuation of the posterior branch of the axillary nerve, supplies the skin over the **lower half of deltoid**. That split is why the sensory loss of an axillary nerve lesion is a patch over the lower deltoid and not the whole shoulder cap.

**Lymphatics** of the scapular region are deep vessels following the arteries and ending in the **subscapular (posterior) group** of axillary nodes.

### Development
The department book gives no developmental account of the shoulder region, and no chapter in this module's embryology follows the limb bud to the scapula or the humerus. The absence is recorded rather than filled.

### Surface and imaging anatomy
Deltoid gives the shoulder its **rounded contour**; loss of that contour is the surface sign of a **flat shoulder**, and the acromion becomes prominent under the skin because nothing rounds it off any more.

The **deltopectoral groove** is palpable as a furrow running from the anterior axillary fold up to just below the clavicle, and is the surface line of the cephalic vein.

**Winging of the scapula** is looked for by having the patient push against a wall: the inferior angle and the medial border of the scapula project backwards.

The **surgical neck of the humerus** lies deep to the deltoid a little below the acromion, and the axillary nerve winds round it there.

### Clinical correlations
**Paralysis of deltoid** results in **flattening of the shoulder** and **loss of abduction of the shoulder joint from 15° to 90°**. Abduction is not abolished — supraspinatus still initiates the first 15°, and the girdle can still rotate the scapula — which is why the deformity is named and the movement loss is a range.

**Axillary (circumflex) nerve injury** has three named causes: a **badly adjusted axillary crutch**, **downward dislocation of the shoulder joint**, and **fracture of the surgical neck of the humerus**. The result is paralysis of deltoid and teres minor, loss of abduction from 15° to 90°, a flat shoulder, and loss of sensation over the **lower half of deltoid**.

**Abduction above 90° is a shoulder-girdle question, not a shoulder-joint question.** Beyond about 90° the greater tuberosity meets the coraco-acromial ligament and the joint can go no further; the arm is raised the rest of the way by the scapula rotating on the chest wall so that the glenoid cavity faces upwards. That rotation is produced by the **upper and lower fibres of trapezius** — motor supply the **spinal root of the accessory nerve**, sensory C3 and C4 — acting with the **lower five digitations of serratus anterior**, supplied by the **long thoracic nerve**.

So the full arc has three answers and the examiner picks one of them: **0–15° supraspinatus; 15–90° middle fibres of deltoid; 90–180° trapezius and serratus anterior rotating the scapula.**

**Paralysis of serratus anterior** loses the fixation of the scapula against the chest wall. Pushing against resistance projects the inferior angle and medial border backwards — **winging of the scapula** — and the arm cannot be raised above the head, because upward rotation has lost half its motor.

**The shoulder girdle's five movements** and their muscles are asked as a table, and the columns are worth reproducing as a table.

*Elevation* — upper fibres of trapezius, levator scapulae.
*Depression* — pectoralis minor, with subclavius steadying the clavicle and preventing excessive movement.
*Protraction* — serratus anterior, the main and powerful protractor, assisted by pectoralis minor.
*Retraction* — middle fibres of trapezius, rhomboideus major and minor.
*Upward rotation* (glenoid faces upwards) — upper and lower fibres of trapezius with serratus anterior.
*Downward rotation* (glenoid faces downwards) — levator scapulae with rhomboideus minor and major.

**Rotator cuff.** Because the four cuff tendons blend with the capsule and hold the head of the humerus in the shallow glenoid cavity during every movement of the arm, they take load continuously. The department book states the mechanism and names the cuff; it does not go on to describe cuff tears or impingement, and neither does this article.

### Variations and anomalies
The two Kasr sources describe no variation of the shoulder region's muscles, spaces or vessels — no separate scapular slip, no anomalous course of the circumflex scapular artery. Nothing is asserted here in their absence.
## hold_these
The six muscles of the shoulder region are deltoid, supraspinatus, infraspinatus, teres major, teres minor and subscapularis.
The rotator cuff is supraspinatus, infraspinatus, teres minor and subscapularis — four muscles, and teres major is not one of them.
Deltoid has a V-shaped origin from the lateral third of the clavicle, the lateral border of the acromion and the lower lip of the crest of the spine of the scapula, and inserts into the deltoid tuberosity.
Deltoid is supplied by the axillary (circumflex) nerve; anterior fibres flex and medially rotate, posterior fibres extend and laterally rotate, middle fibres abduct from 15° to 90°.
Abduction is a relay: supraspinatus 0–15°, middle deltoid 15–90°, trapezius with serratus anterior rotating the scapula 90–180°.
Supraspinatus, infraspinatus and teres minor insert into the highest, middle and lowest impressions on the greater tuberosity, in that order.
Subscapularis inserts into the lesser tuberosity; teres major into the medial lip of the bicipital groove.
The quadrangular space transmits the posterior circumflex humeral vessels and the axillary nerve; the upper triangular space transmits only the circumflex scapular artery; the lower triangular space transmits the radial nerve and profunda brachii vessels.
The long head of triceps is medial to the quadrangular space and lateral to the upper triangular space.
The anastomosis around the scapula joins the first part of the subclavian (suprascapular and deep branch of transverse cervical, from the thyro-cervical trunk), the third part of the axillary (subscapular and circumflex scapular) and the descending thoracic aorta (posterior intercostals).
That anastomosis bypasses an obstruction between the first part of the subclavian and the third part of the axillary artery.
Serratus anterior arises from the upper eight ribs and inserts into the ventral surface of the medial border of the scapula; its nerve is the long thoracic nerve, C5, 6, 7.
Deltoid paralysis gives a flat shoulder and loss of abduction from 15° to 90°; serratus anterior paralysis gives a winged scapula and failure to raise the arm above the head.
Shoulder girdle movements: elevation, depression, protraction, retraction, upward rotation and downward rotation, each with its own muscles.
## lose_the_mark
Putting teres major in the rotator cuff. The cuff is supraspinatus, infraspinatus, teres minor and subscapularis; teres major reaches the bicipital groove, not the tuberosity, and has a different nerve.
Answering "deltoid" to any question about abduction. Deltoid's middle fibres carry only 15° to 90°; the first 15° is supraspinatus and everything above 90° is scapular rotation.
Answering abduction beyond 90° with deltoid and supraspinatus. Past 90° the question is about the shoulder girdle, and the answer is trapezius with serratus anterior.
Giving abduction as deltoid's only action. The anterior and posterior fibres oppose each other in flexion and rotation, and a five-mark question on deltoid is marked on all three.
Treating scapular rotation as one movement. Upward and downward rotation have different muscles, and only upward rotation raises the arm overhead.
Naming the vessels of the scapular anastomosis without their parent trunks. The question is which trunks the anastomosis connects, because that is what makes it a collateral route.
Using the long head of triceps as one boundary throughout. It is medial to the quadrangular space and lateral to the upper triangular space, and that is what separates the axillary nerve from the circumflex scapular artery.
Confusing the three anastomoses around the shoulder. The scapular anastomosis, the cruciate anastomosis around the surgical neck, and the anastomosis around the shoulder joint have different lists, and the paper asks them by name.
Giving deltoid's insertion as the greater tuberosity. It is the deltoid tuberosity, on the lateral surface of the shaft at its middle.
Saying an axillary nerve lesion numbs the whole shoulder cap. The upper half of deltoid is supplied by the lateral supraclavicular nerves from C3 and C4; the loss is over the lower half only.
## image_recommendations
### anatomy plate · Posterior view of the scapula and upper humerus with all six shoulder-region muscles in place and separately tinted, and a second panel with the muscles removed showing their attachments on the bone in matching colours, including the three impressions on the greater tuberosity in order
Purpose: Every cuff question is decided by which impression a tendon reaches, and every non-cuff answer is decided by teres major reaching the groove instead. Attachment maps make that a spatial fact; a table of insertions makes it four similar sentences.
Priority: required
Status: needed
Kind: anatomy plate
Section: Structure
Source direction: purpose-drawn, following the department book Figs. 18 and 21 (PDF pages 169 and 172), redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
Notes: Serves concept CON-MSK-82C4250560D1A1, exam question "Regarding Deltoid muscle, mention its attachment, nerve supply and action", 5 marks.
### diagram · The three intermuscular spaces from behind, boundaries labelled by muscle, with the long head of triceps drawn as the shared boundary and arrows showing the posterior circumflex humeral vessels and axillary nerve through the quadrangular space, the circumflex scapular artery through the upper triangular, and the radial nerve with profunda brachii through the lower triangular
Purpose: The whole answer is which side of the long head of triceps a structure passes on, and that is a relationship no sentence can hold three times over without collapsing.
Priority: required
Status: needed
Kind: diagram
Section: Structure
Source direction: purpose-drawn, following the department book Figs. 25 and 26 (PDF pages 176-177) and Dr. Galal's revision page 6
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-8533FCB18D819B, exam question "Boundaries and contents of intermuscular spaces", 5 marks.
### diagram · Abduction of the arm drawn as three consecutive panels of the same shoulder — 0 to 15° with supraspinatus tinted, 15 to 90° with the middle fibres of deltoid tinted and the greater tuberosity approaching the coraco-acromial ligament, and 90 to 180° with the scapula rotated and trapezius and serratus anterior tinted
Purpose: Abduction is an arc split between three motors, and the split is the answer to four separate exam questions. Three panels make the hand-over visible; one figure with three labels invites the student to name all three for any range.
Priority: required
Status: needed
Kind: diagram
Section: Clinical correlations
Source direction: purpose-drawn, following the department book PDF pages 170-171 and 175 and Dr. Galal's revision page 6
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-04D3ACA71DC025, exam question "Nerve supply and action of muscles producing abduction of shoulder girdle (more than 90)", 5 marks.
### diagram · The anastomosis around the scapula drawn on a posterior view of the scapula and chest wall, each vessel labelled with its parent trunk in the same colour as that trunk — subclavian in one colour, axillary in another, aorta in a third — with the bypassed segment between the first part of the subclavian and the third part of the axillary marked
Purpose: The mark is for pairing every vessel with its parent, and colour-by-parent is the only presentation in which that pairing survives being read once.
Priority: required
Status: needed
Kind: diagram
Section: Blood supply, innervation and lymphatics
Source direction: purpose-drawn, following the department book Fig. 36 (PDF page 189) and Dr. Galal's revision page 10
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-DF8F395F3D471E, exam question "Name the arteries share in the anastomosis around the scapula and give their origin", 5 marks.
### comparison table · The six shoulder-girdle movements as columns — elevation, depression, protraction, retraction, upward rotation, downward rotation — with the muscles of each listed beneath and the direction the glenoid cavity faces drawn as a small scapula icon on the two rotation columns
Purpose: The examined form of this material is a table, and rotation is the column students collapse into one. A drawn scapula on each rotation column stops upward and downward being read as one movement.
Priority: strongly helpful
Status: needed
Kind: comparison table
Section: Clinical correlations
Source direction: purpose-drawn, following Dr. Galal's revision page 38
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-1CA86BE843A07C, exam question "Outline the movement allowed at the shoulder girdle and the muscles responsible", 5 marks.
### clinical photograph · A patient with a flat shoulder from deltoid paralysis, the acromion standing out under the skin, shown beside the normal side for comparison
Purpose: "Flat shoulder" is a shape the examiner expects named on sight, and a student who has only read the phrase often cannot say what they would look for.
Priority: strongly helpful
Status: needed
Kind: clinical photograph
Section: Clinical correlations
Rights: consented clinical photograph, or an anatomical illustration if no consented image is available
## conflicts
Where serratus anterior is taught. The department book describes serratus anterior inside the Shoulder Region chapter (PDF pages 174-175) under the heading "muscles connecting the upper limb with the thoracic wall"; Dr. Galal's revision puts it on his pectoral-region page 2. Both give the same attachments, nerve and actions. It is taught here because two of this leaf's five concepts turn on its action.
Boundaries of the quadrangular space. The department book adds "and the capsule of the shoulder joint" to the upper boundary; Dr. Galal's table gives teres minor behind and subscapularis in front without it. The book's fuller version is used, and the difference is recorded because a marker working from the revision may not expect the capsule.
Insertion of supraspinatus. The department book says "the highest impression on the greater tuberosity"; Dr. Galal says "upper impression of greater tuberosity of humerus". The same fact in two words; recorded because a student writing "superior facet" from a third source is describing the same thing in a vocabulary this faculty does not use.
## evidence_gaps
Neither source gives a developmental account of the shoulder region.
The department book states that abduction beyond 90° requires scapular rotation but does not, in this chapter, state the mechanical reason. The statement here that the greater tuberosity meets the coraco-acromial ligament is taken from the concept record CON-MSK-04D3ACA71DC025 as drafted from the paper, and it is flagged in field_notes as not verified against the book's own Shoulder Joint chapter, which was not read for this article.
The department book names the rotator cuff and its function and stops there. It describes no cuff tear, no impingement and no painful arc, so a question book item on cuff pathology has nothing in the faculty's own text to answer from.
The MCQ bank's answer letters conflict across source files for several stems on this leaf, including the winged-scapula item and the trapezius nerve-supply item, where one file keys the trapezius stem to "dorsal scapular nerve" although every prose source in this module says spinal accessory. No answer key from the bank was used as evidence here.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Chapter 3 "Shoulder Region", PDF pages 169-177 — the six scapular muscles with attachments, nerve supply and actions; the deltopectoral groove; the rotator cuff; serratus anterior; the quadrangular and two triangular spaces.
Department Book Module 101, Chapter 4 "Axilla", PDF pages 189-190 — the anastomosis around the scapula, the cruciate anastomosis around the surgical neck, and the anastomosis around the shoulder joint, each with its contributing vessels and parent trunks.
Dr. Galal final revision (src_fc7ea5960363431009ed), pages 6, 10 and 38 — "Q. Muscles of post. wall axilla", "Q. Intermuscular spaces", "Q. Deltoid", "Q. Muscles producing abduction of shoulder", "Q. Anastomosis around scapula", "Q. Movements & muscles acting on shoulder girdle", and the axillary nerve injury list on page 10.
scripts/kasr/extract/mcq-bank.json, leaf "Shoulder Region" — 125 distinct question stems, read for what the examiners ask.
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Clinical correlations: The sentence explaining that the greater tuberosity meets the coraco-acromial ligament at 90° comes from the concept record drafted from the exam paper, not from the two chapters read for this article. It is named in evidence_gaps.
sections.Development: The absence of a developmental account is the source's; it is recorded in evidence_gaps.
## notes
Five concepts sit on this leaf, more than on any other Upper Limb leaf in the module, and four of them are answered by the same anatomy. The article is organised so that the intermuscular spaces, the abduction relay and the scapular anastomosis each get their own examinable block rather than being folded into a continuous description of the region.

---

# Item
## id
ART-101-ANA-FOREARM
## title
The forearm
## subject
msk
## status
Draft
## owner
Claude
## topic
Upper limb
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-ANATOMY
## archetype
anatomy
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Anatomy > Upper Limb > Forearm
## primary_node_id
DIS-ANA-T02
## secondary_node_ids
SYS-MSK-T01-S01-M04
SYS-MSK-T01-S01-M05
## related_concepts
CON-MSK-25C6698A72A982
CON-MSK-E10403A4189B45
CON-MSK-44234D1863CE8E
## related_articles
ART-101-ANA-ARM: The cubital fossa, where every structure in this article enters the forearm, is described there with its boundaries, roof and contents.
ART-101-ANA-HAND-ARTERIES: The superficial and deep palmar arches that the ulnar and radial arteries become, and the snuff box seen from the hand's side.
ART-101-ANA-RADIAL-NERVE: The radial nerve's whole course and its two terminal branches, of which the posterior interosseous nerve is the one that lives in this region.
## aliases
Forearm | Antebrachium | Flexor compartment of forearm | Extensor compartment of forearm | Supinator | Extensor retinaculum | Ulnar artery | Anatomical snuff box | Carpal tunnel
## reading_time
18
## summary
The forearm is two compartments and twenty muscles, and no one learns twenty muscles as twenty facts. Learn the four origins instead — common flexor origin on the medial epicondyle, common extensor origin on the lateral epicondyle, the two interosseous surfaces for the deep groups — and the two nerve rules: everything in front is median except flexor carpi ulnaris and the medial half of flexor digitorum profundus, and everything behind is posterior interosseous except brachioradialis, extensor carpi radialis longus and anconeus. The rest of the leaf is four tunnels and two arteries.
## sections
### Overview and position
The forearm runs from the elbow to the wrist on two bones, the radius laterally and the ulna medially, joined along their length by the **interosseous membrane** and at each end by a radio-ulnar joint. It is wrapped in the deep fascia of the forearm, the **antebrachial fascia**, which is thicker behind than in front and gives partial origin to the muscles of both compartments.

That fascia thickens in three named places, and each thickening is examinable.

- Above, it is strengthened by the **bicipital aponeurosis**.
- Along the posterior border of the ulna it forms a strong **ulnar aponeurosis**, which gives origin to **flexor carpi ulnaris, extensor carpi ulnaris and flexor digitorum profundus** — three muscles from one sheet, and the reason those three share a border.
- At the wrist it forms two bands: the **flexor retinaculum** in front and the **extensor retinaculum** behind.

The **interosseous membrane** is attached laterally to the interosseous border of the radius and medially to the interosseous border of the ulna, beginning about 2.5 cm below the radial tuberosity and blending below with the capsule of the inferior radio-ulnar joint. It gives attachment in front to **flexor pollicis longus and flexor digitorum profundus**, and behind to **abductor pollicis longus, extensor pollicis longus, extensor pollicis brevis and extensor indicis**. Its mechanical job is to transmit force: the **radius receives force from the hand and the membrane passes it on to the ulna**. Its relations are worth holding as a short list — the anterior interosseous nerve and vessels lie on its anterior surface, the anterior interosseous artery pierces it above its lower end, the posterior interosseous vessels pass backwards above its upper border, and pronator quadratus crosses in front of its lower part.

### Structure
**Muscles of the front of the forearm** — the flexors of the wrist and digits and the pronators — are arranged in a superficial group of five and a deep group of three.

**Superficial group.** Five muscles arising by a **common flexor origin** from the anterior surface of the **medial epicondyle**, in two layers: four superficial, from lateral to medial **pronator teres, flexor carpi radialis, palmaris longus, flexor carpi ulnaris**, and one deep, **flexor digitorum superficialis**. Their common nerve supply is the **median nerve**, except **flexor carpi ulnaris**, which is supplied by the **ulnar nerve**. Their common action is flexion of the wrist — except pronator teres — plus weak flexion of the elbow.

*Pronator teres.* Origin by a **humeral head** from the common flexor origin and the medial supracondylar ridge and an **ulnar head** from the medial side of the coronoid process. Insertion into the **pronator tuberosity**, the middle of the lateral surface of the shaft of the radius. Nerve **median**. Action: **powerful pronation**, weak elbow flexion. The **median nerve enters the forearm between its two heads**.

*Flexor carpi radialis.* Common flexor origin to the bases of the **second and third metacarpals**. Nerve median. Action: flexion and **abduction** of the wrist.

*Palmaris longus.* Common flexor origin to the **apex of the palmar aponeurosis**. Nerve median. Action: weak flexion of the wrist; tenses the palmar aponeurosis.

*Flexor carpi ulnaris.* Humeral head from the common flexor origin, ulnar head from the olecranon and the upper two-thirds of the posterior border of the ulna by the ulnar aponeurosis; insertion into the **pisiform**, then on to the hamate and the fifth metacarpal. Nerve **ulnar**. Action: flexion and **adduction** of the wrist. The **ulnar nerve enters the forearm between its two heads**.

*Flexor digitorum superficialis.* Humero-ulnar head from the common flexor origin and the coronoid process; **radial head from the anterior oblique line of the radius**. Insertion by four tendons, each splitting into two slips, into the **sides of the middle phalanges** of the medial four fingers. Nerve median. Action: flexes the wrist and the **metacarpo-phalangeal and proximal interphalangeal joints** — it does not reach the distal phalanx, and that is the distinction the papers test.

**Deep group.** Three muscles: **flexor pollicis longus** laterally and **flexor digitorum profundus** medially, with **pronator quadratus** deepest of all. Their common nerve is the **anterior interosseous branch of the median nerve** — except the **medial half of flexor digitorum profundus**, which is supplied by the **ulnar nerve**.

*Flexor digitorum profundus.* Origin from the anterior and medial surfaces of the ulna and the adjacent interosseous membrane; insertion into the **bases of the distal phalanges** of the medial four fingers, its tendons passing **deep to** those of superficialis. Action: flexes **all** the joints of the medial four fingers, and the wrist. Its **lateral half is supplied by the anterior interosseous nerve and its medial half by the ulnar nerve** — the one muscle in the limb with a split supply of that kind, and a stock examination item.

*Flexor pollicis longus.* Origin from the anterior surface of the radius below the anterior oblique line and the adjacent interosseous membrane; insertion into the base of the **distal phalanx of the thumb**. Nerve **anterior interosseous**. Action: flexes all the joints of the thumb, and the wrist.

*Pronator quadratus.* Origin from an oblique ridge on the **lower quarter of the anterior surface of the ulna**; insertion into the **lower quarter of the anterior and medial surfaces of the radius**. Nerve **anterior interosseous**. Action: **pronation** at the radio-ulnar joints — and pronation only; it does not flex the wrist.

**Muscles of the back of the forearm** — the extensors — are a superficial group of seven and a deep group of five. Every tendon except brachioradialis passes deep to the extensor retinaculum.

**Superficial group**, from lateral to medial: **brachioradialis, extensor carpi radialis longus, extensor carpi radialis brevis, extensor digitorum, extensor digiti minimi, extensor carpi ulnaris, anconeus**. They share a **common extensor origin** from the anterior and lateral surfaces of the **lateral epicondyle** — except brachioradialis, extensor carpi radialis longus and anconeus, which arise elsewhere.

*Brachioradialis.* Origin from the **upper two-thirds of the lateral supracondylar ridge** and the front of the lateral intermuscular septum; insertion into the lateral side of the lower end of the radius above the base of the styloid process. Nerve **radial**. Action: it puts the forearm in the **mid-prone position** and flexes the elbow. It is neither a pronator nor a supinator in the ordinary sense; it drives the forearm towards mid-prone from either extreme.

*Extensor carpi radialis longus.* Lower third of the lateral supracondylar ridge to the base of the **second metacarpal**. Nerve **radial**. Extension and abduction of the wrist.

*Extensor carpi radialis brevis.* Common extensor origin to the base of the **third metacarpal**. Nerve **posterior interosseous**. Extension and abduction of the wrist.

*Extensor digitorum.* Common extensor origin to the **extensor expansion** of each of the medial four fingers. Nerve posterior interosseous.

*Extensor digiti minimi.* Common extensor origin to the extensor expansion of the little finger. Nerve posterior interosseous.

*Extensor carpi ulnaris.* Common extensor origin and the upper two-thirds of the posterior border of the ulna by the ulnar aponeurosis, to the base of the **fifth metacarpal**. Nerve posterior interosseous. Extension and **adduction** of the wrist.

*Anconeus.* Back of the lateral epicondyle to a triangular area on the back of the olecranon. Nerve **radial**. It assists triceps in extending the elbow and is described as the fourth head of triceps.

The **extensor expansion** is a strong triangular fibrous sheet, base proximal and apex distal, covering the dorsum of the proximal phalanx of each of the medial four fingers and receiving the extensor tendon together with the tendons of the lumbricals and interossei. At the proximal interphalangeal joint it divides into an intermediate part, attached to the base of the middle phalanx, and two collateral parts, attached to the base of the terminal phalanx.

**Deep group**, from above down: **supinator, abductor pollicis longus, extensor pollicis brevis, extensor pollicis longus, extensor indicis**. All five are supplied by the **posterior interosseous nerve**.

*Supinator.* It **surrounds the upper third of the shaft of the radius**. Origin from the **supinator crest and fossa of the ulna**, and from the **lateral epicondyle of the humerus, the lateral collateral ligament of the elbow and the annular ligament**. Insertion into the **posterior, lateral and anterior aspects of the upper third of the radius**, above the anterior and posterior oblique lines, reaching as low as the insertion of pronator teres. Nerve **posterior interosseous**. Action: supination of the forearm at the radio-ulnar joints, and it is the supinator that works **when the elbow is extended**. Its important relation is that the **posterior interosseous nerve pierces it**, curving round the upper part of the radius inside the muscle and splitting it into a superficial and a deep layer.

*Abductor pollicis longus.* From the posterior surface of the ulna, the back of the interosseous membrane and the posterior surface of the radius just below the insertion of supinator, to the **lateral side of the base of the first metacarpal**. Abducts the thumb, helps abduct the wrist.

*Extensor pollicis brevis.* From the posterior surface of the radius and the back of the interosseous membrane, to the **base of the proximal phalanx of the thumb**. Extends the metacarpo-phalangeal and carpo-metacarpal joints of the thumb.

*Extensor pollicis longus.* From the middle third of the posterior surface of the ulna and the back of the interosseous membrane, to the **base of the distal phalanx of the thumb**. Extends all the joints of the thumb.

*Extensor indicis.* From the posterior surface of the ulna and the interosseous membrane, joining the middle part of the extensor expansion of the index. Extends the index, helps extend the wrist.

### Relations
**The extensor retinaculum** is a thickened band of the deep fascia of the forearm running obliquely across the back of the wrist. It is attached **laterally to the anterior border of the lower end of the radius** and **medially to the pisiform and the triquetral**. Five septa run from it to ridges on the back of the lower end of the radius and divide the space beneath into **six compartments**, and both the compartments and their order are examined.

1. On the lateral side of the lower end of the radius — **abductor pollicis longus** and **extensor pollicis brevis**.
2. On the back of the lower end of the radius, **lateral to the dorsal tubercle of Lister** — **extensor carpi radialis longus** and **brevis**.
3. **Medial to the tubercle of Lister** — **extensor pollicis longus**.
4. The most medial part of the back of the lower end of the radius — the four tendons of **extensor digitorum**, the tendon of **extensor indicis**, the **posterior interosseous nerve** and the **anterior interosseous artery**.
5. On the back of the inferior radio-ulnar joint — **extensor digiti minimi**.
6. On the back of the lower end of the ulna, between head and styloid process — **extensor carpi ulnaris**.

Its relations name what stays outside it: laterally the **superficial radial nerve and the cephalic vein**, medially the **dorsal cutaneous branch of the ulnar nerve and the basilic vein**. All four are superficial to the retinaculum, which is why "the beginning of the cephalic vein lies deep to the extensor retinaculum" is a wrong option that appears repeatedly.

**The flexor retinaculum** is a thickened transverse band of deep fascia crossing in front of the carpus and converting the anterior concavity of the bony carpal arch into the **carpal tunnel**. Medially it is attached to the **pisiform and the hook of the hamate**; laterally it **splits into two laminae**, a superficial lamina to the **tubercle of the scaphoid and the crest of the trapezium** and a deep lamina to the medial lip of the groove on the trapezium, the two enclosing a **special tunnel for the tendon of flexor carpi radialis** and its synovial sheath. Below it is continuous with the deep fascia of the palm, especially with the apex of the palmar aponeurosis; above, with the deep fascia of the front of the forearm.

**Superficial to it**, from medial to lateral: the **ulnar nerve**, the **ulnar artery**, the **palmar cutaneous branch of the ulnar nerve**, the **tendon of palmaris longus**, and the **palmar cutaneous branch of the median nerve**.

**Deep to it**, in the carpal tunnel: **nine tendons** — four of flexor digitorum superficialis, four of flexor digitorum profundus and one of flexor pollicis longus — **two synovial sheaths**, the ulnar and radial bursae, **one nerve**, the **median nerve**, lying directly under cover of the retinaculum, and the recurrent branch of the deep palmar arch as the deepest structure. In its own special tunnel: the tendon of flexor carpi radialis.

Muscles are attached to its anterior surface: the **thenar** muscles laterally and the **hypothenar** muscles medially take origin from it, and the tendon of palmaris longus inserts into it.

**The anatomical snuff box** is a triangular hollow on the dorso-lateral aspect of the wrist, clearest when the thumb is extended. **Laterally** it is bounded by the tendons of **abductor pollicis longus and extensor pollicis brevis**; **medially** by the tendon of **extensor pollicis longus**. Its **roof** is skin, superficial fascia containing the **beginning of the cephalic vein** and digital branches of the **superficial radial nerve**, and deep fascia. Its **floor** is the **styloid process of the radius, the scaphoid and the trapezium**. Its **contents** are the **radial artery**, crossing on its way to the dorsum of the hand, and the tendons of **extensor carpi radialis longus and brevis** crossing the floor.

**Nerves in the forearm** are four: ulnar, median, superficial radial and posterior interosseous.

The **ulnar nerve** enters the forearm between the two heads of flexor carpi ulnaris after grooving the back of the medial epicondyle, is covered by that muscle in the upper two-thirds and descends on flexor digitorum profundus; in the lower third it becomes superficial between the **tendon of flexor carpi ulnaris medially and the tendons of flexor digitorum superficialis laterally**. At the wrist it passes **superficial to the flexor retinaculum**, lateral to the pisiform and medial to the ulnar artery, and divides into a superficial branch, mainly cutaneous, and a deep branch, mainly muscular. In the forearm it supplies **flexor carpi ulnaris and the medial half of flexor digitorum profundus**, an articular branch to the elbow, a **palmar cutaneous branch** to the skin of the medial third of the palm and a **dorsal cutaneous branch** to the medial third of the dorsum of the hand and the medial one and a half fingers.

The **median nerve** enters between the two heads of pronator teres, descends between flexor digitorum superficialis and profundus, and above the wrist becomes superficial between the tendons of **flexor carpi radialis laterally and flexor digitorum superficialis medially**. At the wrist it enters the palm **through the carpal tunnel, deep to the flexor retinaculum**. In the forearm it supplies pronator teres, flexor carpi radialis, palmaris longus and flexor digitorum superficialis; gives the **anterior interosseous nerve** to flexor pollicis longus, the lateral half of flexor digitorum profundus and pronator quadratus; and gives a **palmar cutaneous branch** to the lateral two-thirds of the palm **except the proximal part of the thenar eminence**, which is supplied by the lateral cutaneous nerve of the forearm.

The **superficial radial nerve** begins in front of the lateral epicondyle as the continuation of the radial nerve, descends on the lateral side of the forearm deep to brachioradialis, and in the lower third turns backwards to descend in the **roof of the anatomical snuff box**, ending on the dorsum of the hand by dividing into **five dorsal digital branches** supplying the lateral two-thirds of the dorsum of the hand and the proximal halves of the dorsal aspects of the lateral three and a half fingers.

The **posterior interosseous nerve** arises from the radial nerve in front of the lateral epicondyle, supplies **extensor carpi radialis brevis and supinator** before piercing supinator, emerges on the back of the forearm between the superficial and deep extensors, passes deep to extensor pollicis longus to the back of the interosseous membrane, and finally runs deep to the extensor retinaculum in the **fourth compartment** to end in an expanded **pseudoganglion** giving articular filaments to the inferior radio-ulnar, wrist and some intercarpal joints. It supplies **all the extensors on the back of the forearm except brachioradialis, extensor carpi radialis longus and anconeus** — the three that keep the radial nerve proper.

### Blood supply, innervation and lymphatics
**The ulnar artery** is the **larger** of the two terminal branches of the brachial artery. It begins in the cubital fossa **1 cm below the elbow joint, at the level of the neck of the radius**. In the **upper third** of the forearm it runs obliquely downwards and medially; in the **lower two-thirds** it descends vertically along the medial side of the front of the forearm. At the wrist it descends **superficial to the flexor retinaculum**, **lateral to the ulnar nerve and the pisiform** and **medial to the hook of the hamate**, and ends in the hand by becoming the **superficial palmar arch**.

Its branches divide by level.

*Near the elbow:* the **anterior ulnar recurrent artery**, ascending in front of the medial epicondyle to meet the anterior branch of the inferior ulnar collateral; the **posterior ulnar recurrent artery**, ascending between the two heads of flexor carpi ulnaris to the back of the medial epicondyle to meet the superior ulnar collateral; and the **common interosseous artery**, a short trunk arising about **one inch below the beginning** of the ulnar artery and dividing into anterior and posterior interosseous arteries.

The **anterior interosseous artery** is the larger. It descends on the front of the interosseous membrane with the anterior interosseous nerve, pierces the membrane at the upper border of pronator quadratus to reach the back of the forearm, then descends with the posterior interosseous nerve in the **fourth compartment** of the extensor retinaculum to join the posterior carpal arch. It gives the **median artery** to the median nerve, muscular branches, the **nutrient arteries of both radius and ulna**, and a descending branch deep to pronator quadratus to the anterior carpal arch. The **posterior interosseous artery** is the smaller; it passes backwards **above** the upper border of the interosseous membrane, descends between the superficial and deep extensors with the posterior interosseous nerve, and gives the **posterior interosseous recurrent artery** to the back of the lateral epicondyle.

*In the forearm:* muscular branches to the muscles on the ulnar side.

*At the wrist:* the **anterior carpal artery**, which crosses the front of the carpus deep to the flexor tendons to meet its radial fellow and form the **anterior carpal arch**, and the **posterior carpal artery**, which does the same behind to form the **posterior carpal arch**.

**The radial artery** is the **smaller** terminal branch, beginning at the same point. In the forearm it passes downwards and laterally, overlapped above by the fleshy belly of brachioradialis and becoming **superficial in the lower part**, where its pulsation is felt **between the tendon of flexor carpi radialis medially and the tendon of brachioradialis laterally**. At the wrist it winds backwards round the lateral side through the **anatomical snuff box** to the dorsum of the hand. Its branches from above down are the **radial recurrent artery**, muscular branches, the **anterior carpal artery**, and the **superficial palmar artery**, which descends through the thenar muscles and completes the superficial palmar arch.

The **superficial radial nerve** and the radial artery run together only in part: the nerve is separated from the artery by a slight interval in the upper third, and in the lower third the nerve leaves the artery by curving backwards round the lateral margin of the forearm under cover of the brachioradialis tendon.

**Lymphatics** of the forearm run superficially with the two great veins and deeply with the arteries. Superficial vessels on the **medial** side follow the basilic vein and end in the **lateral (humeral) group** of axillary nodes, some passing first through the **supratrochlear nodes** just above the medial epicondyle; superficial vessels on the **lateral** side follow the cephalic vein and mostly incline medially at the insertion of deltoid to reach the same lateral group, a few continuing with the vein to the **apical group**. Deep vessels follow the radial, ulnar and brachial arteries to the lateral group.

### Development
Neither Kasr source gives a developmental account of the forearm, its bones or its musculature. The absence is recorded rather than filled from another textbook.

### Surface and imaging anatomy
The **radial artery** is represented by a line from a point **midway between the two epicondyles, medial to the tendon of biceps**, to a point at the **front of the lower end of the radius** where the pulse is felt, continued round the radial side of the wrist to the proximal end of the first interosseous space.

The **ulnar artery** is represented by a line through **three** points: midway between the epicondyles medial to the biceps tendon; the medial side of the forearm at the junction of the upper third with the lower two-thirds; and **just lateral to the pisiform** at the wrist. The three-point line is the surface statement of the artery's two-stage course — oblique above, vertical below.

The **anatomical snuff box** appears as a hollow when the thumb is extended, and the **radial pulse can be felt in its floor** as well as at the front of the wrist.

The **dorsal tubercle of Lister** is palpable on the back of the lower end of the radius and is the landmark that fixes the order of the extensor compartments: the second lies lateral to it and the third medial to it.

**Palmaris longus** is absent in a proportion of people; where present, its tendon stands out in the midline at the wrist when the thumb and little finger are opposed.

### Clinical correlations
**Supination is stronger than pronation, and the reason is biceps.** Supination is produced by **supinator**, which acts when the elbow is extended, and by **biceps brachii**, which acts when the elbow is flexed and is the powerful one. Pronation is produced by **pronator teres** and **pronator quadratus**. That imbalance is why a right-handed screw thread is cut to be driven by supination of the flexed right arm, and why an examination item that offers "supinator only" as the reason supination is stronger is wrong.

**Pronation and supination happen at the radio-ulnar joints, not at the elbow.** The head of the radius rotates inside the ring formed by the radial notch of the ulna and the annular ligament at the superior joint; the shaft swings; and the lower end of the radius, with the articular disc, rotates around the head of the ulna at the inferior joint. In **supination** the two bones are parallel, the palm faces forwards, the thumb points laterally and the interosseous membrane is taut. In **pronation** the shaft of the radius crosses the shaft of the ulna, the lower end of the radius lies medial to the ulna, the palm faces backwards, the thumb points medially and the membrane is lax.

**Carpal tunnel syndrome** is compression of the **median nerve** in the carpal tunnel — caused by inflammation of the synovial sheaths of the flexor tendons, arthritic change or osteophytes of the carpal bones, **dislocation of the lunate**, or accumulation of blood or pus in the tunnel. The nerve lies directly under cover of the retinaculum, which is the tunnel's only soft roof, so anything that raises pressure inside a bony gutter presses on it first. The sensory disturbance is over the **lateral three and a half fingers**; the **palmar cutaneous branch of the median nerve is spared**, because it leaves the nerve above the wrist and passes **superficial** to the retinaculum, so the skin over the lateral two-thirds of the **palm** keeps its sensation. That sparing is the difference between carpal tunnel syndrome and a cut wrist, where the palm is numb as well.

**A cut across the front of the wrist takes both the ulnar nerve and the ulnar artery,** because both lie superficial to the flexor retinaculum, side by side, with only skin and fascia over them.

**Ulnar nerve compression at the elbow** — cubital tunnel syndrome — is compression between the two heads of flexor carpi ulnaris, and fracture of the medial epicondyle or dislocation of the elbow is the department's named traumatic cause at the same level.

**Posterior interosseous nerve injury**, from a fracture of the head, neck or upper shaft of the radius or from the nerve's course inside supinator, produces **finger drop without wrist drop** — because extensor carpi radialis longus, supplied by the radial nerve above the division, is intact and can still extend the wrist. Wrist drop with finger drop places the lesion higher, in the spiral groove.

**Why a tear of the first dorsal compartment matters.** The first compartment carries abductor pollicis longus and extensor pollicis brevis, the two tendons that form the lateral boundary of the snuff box, so damage there is read both as loss of thumb abduction and extension and as loss of the snuff box's lateral wall.

**Why the scaphoid is in the floor of the snuff box.** Tenderness in the snuff box after a fall on the outstretched hand points to the scaphoid, which lies in the floor with the styloid process of the radius and the trapezium. The department book gives the floor; it does not describe the scaphoid's blood supply or the risk of avascular necrosis, and that is left to the hand article rather than asserted here.

### Variations and anomalies
The department book records two. The **ulnar artery and nerve are sometimes covered by a superficial layer of the flexor retinaculum** at the wrist, rather than lying frankly on it. The **nutrient artery of the humerus** from profunda brachii may be absent — recorded in the arm article — and by the same token the nutrient arteries of the radius and ulna come from the anterior interosseous artery in this region.

**Palmaris longus** is a muscle whose absence is common; neither Kasr source states a frequency, and none is invented here.
## hold_these
The common flexor origin is the front of the medial epicondyle; the common extensor origin is the front and lateral surface of the lateral epicondyle.
Everything in the front of the forearm is supplied by the median nerve or its anterior interosseous branch, except flexor carpi ulnaris and the medial half of flexor digitorum profundus, which are ulnar.
Everything on the back of the forearm is supplied by the posterior interosseous nerve, except brachioradialis, extensor carpi radialis longus and anconeus, which are radial.
The median nerve enters the forearm between the two heads of pronator teres; the ulnar nerve between the two heads of flexor carpi ulnaris.
Flexor digitorum superficialis inserts into the sides of the middle phalanges; flexor digitorum profundus into the bases of the distal phalanges, its tendons passing deep to superficialis.
Supinator surrounds the upper third of the shaft of the radius, arises from the supinator crest and fossa of the ulna and from the lateral epicondyle, lateral collateral and annular ligaments, and is pierced by the posterior interosseous nerve.
Supination is by supinator, with the elbow extended, and by biceps, the powerful one, with the elbow flexed; pronation is by pronator teres and pronator quadratus.
Brachioradialis puts the forearm in the mid-prone position and flexes the elbow.
The extensor retinaculum is attached laterally to the anterior border of the lower end of the radius and medially to the pisiform and triquetral, with five septa making six compartments.
Compartment 2 lies lateral to the tubercle of Lister and compartment 3 medial to it; compartment 4 carries extensor digitorum, extensor indicis, the posterior interosseous nerve and the anterior interosseous artery.
The flexor retinaculum is attached to the pisiform and hook of hamate medially and splits laterally into two laminae on the scaphoid tubercle and the trapezium.
The carpal tunnel contains nine tendons, two synovial sheaths and one nerve — the median.
The ulnar nerve and ulnar artery pass superficial to the flexor retinaculum; the median nerve passes deep to it.
The ulnar artery is the larger terminal branch of the brachial, begins 1 cm below the elbow at the neck of the radius, and ends as the superficial palmar arch.
The common interosseous artery arises about one inch below the beginning of the ulnar artery and divides into anterior and posterior interosseous arteries.
The anatomical snuff box is bounded laterally by abductor pollicis longus and extensor pollicis brevis, medially by extensor pollicis longus, floored by the radial styloid, scaphoid and trapezium, and contains the radial artery.
The radial pulse is felt between the tendons of flexor carpi radialis and brachioradialis.
## lose_the_mark
Putting the ulnar artery deep to the flexor retinaculum. It passes superficial to it, with the ulnar nerve, which is why a cut wrist takes both.
Naming supinator alone as the supinator of the forearm. Biceps is the powerful one, and the question asking why supination beats pronation is asking for both.
Saying flexor digitorum superficialis flexes the distal phalanges. It reaches only the middle phalanges; profundus reaches the distal ones.
Giving pronator quadratus a wrist action. It pronates at the radio-ulnar joints and does nothing else.
Losing the extensor compartment order by reciting tendons instead of landmarks. The second compartment is lateral to the tubercle of Lister and the third medial to it, and that fixes the sequence.
Putting the cephalic vein or the superficial radial nerve deep to the extensor retinaculum. Both are superficial to it, on its lateral side, along with the basilic vein and the dorsal cutaneous branch of the ulnar nerve medially.
Answering "the whole median territory" for the sensory loss in carpal tunnel syndrome. The palmar cutaneous branch leaves above the wrist and runs superficial to the retinaculum, so the palm is spared.
Saying pronation and supination happen at the elbow joint. They happen at the superior and inferior radio-ulnar joints.
Giving flexor digitorum profundus a single nerve. Its lateral half is anterior interosseous and its medial half ulnar.
Calling brachioradialis a flexor supplied by the posterior interosseous nerve. It is one of the three exceptions supplied by the radial nerve itself, along with extensor carpi radialis longus and anconeus.
Answering a posterior interosseous nerve injury with wrist drop. Extensor carpi radialis longus is spared, so the wrist can still be extended and only the fingers drop.
Giving the ulnar artery a radial recurrent branch. The recurrents pair with their own parents — anterior and posterior ulnar recurrent from the ulnar, radial recurrent from the radial.
## image_recommendations
### anatomy plate · Front of the forearm dissected in two panels, the superficial group of five with the common flexor origin marked and the deep group of three beneath, each muscle tinted by its nerve — median in one colour, anterior interosseous in a second, ulnar in a third — so that flexor digitorum profundus appears in two colours
Purpose: The nerve rule with its two exceptions is the single most productive fact on this leaf, and colour-by-nerve turns it into something a student sees rather than memorises. The split colouring of profundus is the point of the plate.
Priority: required
Status: needed
Kind: anatomy plate
Section: Structure
Source direction: purpose-drawn, following the department book Figs. 55, 56, 57 and 58 (PDF pages 208-211)
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
### anatomy plate · Back of the forearm in two panels, superficial group of seven and deep group of five, tinted by nerve so that brachioradialis, extensor carpi radialis longus and anconeus stand out from the posterior interosseous territory, with supinator drawn split into two layers by the nerve passing through it
Purpose: The three radial-nerve exceptions and the nerve piercing supinator are two separate examined facts that are both visible in one drawing and invisible in prose.
Priority: required
Status: needed
Kind: anatomy plate
Section: Structure
Source direction: purpose-drawn, following the department book Figs. 59, 61, 62 and 63 (PDF pages 212-217)
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-E10403A4189B45, exam question "Explain the attachments and nerve supply of the muscles produces supination of the forearm", 5 marks.
### diagram · Cross-section at the back of the wrist showing the extensor retinaculum with its five septa and six compartments numbered lateral to medial, contents drawn inside each, the dorsal tubercle of Lister marked between compartments two and three, and the four structures that stay superficial to the retinaculum drawn above it
Purpose: The compartments are a numbered sequence anchored to one bony tubercle, and both the anchoring and the superficial-versus-deep distinction are geometric. A numbered section is the only form in which the order survives.
Priority: required
Status: needed
Kind: diagram
Section: Relations
Source direction: purpose-drawn, following the department book Fig. 74 (PDF page 229) and Dr. Galal's revision page 32
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-44234D1863CE8E, exam question "Extensor retinaculum (boundaries and compartments)", 5 marks.
### diagram · Cross-section at the front of the wrist showing the carpal tunnel — the bony carpal arch as floor and sides, the flexor retinaculum as roof with its two lateral laminae and the flexor carpi radialis in its own tunnel, the nine tendons and two bursae inside, the median nerve directly beneath the retinaculum, and the five structures passing superficial to it labelled medial to lateral
Purpose: Carpal tunnel syndrome is entirely explained by which structures are inside a rigid gutter and which are outside it, and the sparing of the palmar cutaneous branch is only obvious once that boundary is drawn.
Priority: required
Status: needed
Kind: diagram
Section: Relations
Source direction: purpose-drawn, following the department book Figs. 72 and 73 (PDF pages 227-228)
Rights: newly drawn for this product, or CC-BY / public domain
### anatomy plate · The anatomical snuff box with the thumb extended, its three tendon boundaries labelled, the floor opened to show the radial styloid, scaphoid and trapezium, the radial artery crossing the floor, and the cephalic vein and superficial radial nerve in the roof
Purpose: The box is defined by tendons a student can see on their own hand, and the examined content — artery in the floor, vein and nerve in the roof — is a layering that a labelled photograph or plate settles in one look.
Priority: strongly helpful
Status: needed
Kind: anatomy plate
Section: Relations
Source direction: purpose-drawn, following the department book Fig. 64 (PDF page 218) and Dr. Galal's revision page 32
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · The ulnar and radial arteries drawn together from the cubital fossa to the palm, each branch tagged with the level it leaves at, the common interosseous trunk and its two divisions shown with the anterior interosseous piercing the membrane at the upper border of pronator quadratus, and the two carpal arches completed at the wrist
Purpose: The examined question is a course with branches by level, and the recurrent arteries only make sense drawn meeting the collaterals they anastomose with. One figure keeps the ulnar branches from being attributed to the radial.
Priority: required
Status: needed
Kind: diagram
Section: Blood supply, innervation and lymphatics
Source direction: purpose-drawn, following the department book Figs. 76, 77, 78 and 79 (PDF pages 231-234)
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-25C6698A72A982, exam question "Give the origin, relations and branches of the ulnar artery in the forearm", 5 marks.
### diagram · Supination and pronation as two drawings of the same forearm seen from in front, radius and ulna parallel in one and crossed in the other, with the head of the radius inside the annular ligament, the interosseous membrane drawn taut and then lax, and the thumb's direction marked in each
Purpose: Every item in the comparison — parallel or crossed, palm forwards or backwards, membrane taut or lax — is a picture of the same movement, and drawing the two positions is what stops students learning six unlinked facts.
Priority: required
Status: needed
Kind: diagram
Section: Clinical correlations
Source direction: purpose-drawn, following Dr. Galal's revision page 44
Rights: newly drawn for this product, or CC-BY / public domain
## conflicts
When each supinator acts. Dr. Galal's table says supinator supinates "when the elbow is extended" and biceps "when elbow is flexed"; the department book states supinator's action simply as "it supinates the forearm at radio-ulnar joints" without the qualification. The revision's fuller statement is taught here because it is what makes the exam answer about the relative power of supination coherent, and the difference is recorded.
Insertion of flexor carpi ulnaris. The department book gives "pisiform bone then into 5th metacarpal and hamate bones"; Dr. Galal gives the pisiform alone. Both are taught, with the pisiform named first, because the pisiform is what the ulnar artery and nerve are located against at the wrist.
Origin of extensor pollicis brevis. The department book says "posterior surface of the shaft of the radius" and the back of the interosseous membrane; Dr. Galal says "back radius & back interosseous membrane". The same fact; recorded because a question book option that adds the ulna to that origin is wrong under both.
## evidence_gaps
Neither source gives a developmental account of the forearm.
Neither source states the frequency with which palmaris longus is absent, though the question books treat its absence as known. No figure is asserted here.
The department book describes the floor of the anatomical snuff box but says nothing about the blood supply of the scaphoid or about avascular necrosis after a waist fracture, although the question books ask snuff box tenderness as a clinical stem. The clinical inference is left to the hand article rather than smuggled in here as though the faculty had taught it.
The department book gives the carpal tunnel and carpal tunnel syndrome but refers the results of median nerve compression forward to the nerve-injuries chapter rather than stating them in this chapter; the sensory pattern quoted here is Dr. Galal's, from his page 22.
The MCQ bank carries mutually contradictory answer letters for several stems on this leaf, including the cubital fossa contents and the extensor retinaculum fourth-compartment item. No answer key from the bank was used as evidence here.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Chapter 6 "Forearm", PDF pages 205-234 — antebrachial fascia and its thickenings; cubital fossa; superficial and deep flexor groups; superficial and deep extensor groups; extensor expansion; supinator and its relation to the posterior interosseous nerve; anatomical snuff box; ulnar, median, superficial radial and posterior interosseous nerves; flexor retinaculum and carpal tunnel; extensor retinaculum and its six compartments; radial and ulnar arteries with surface anatomy.
Department Book Module 101, Chapter 8 "Veins of the Upper Limb", PDF pages 255-256 — lymph drainage of the superficial and deep tissues of the forearm.
Dr. Galal final revision (src_fc7ea5960363431009ed), pages 16, 18, 20, 22, 26, 28, 30, 32, 34 and 44 — "Q. Pronator teres", "Q. Flexor digitorum superficialis", "Q. Flexor digitorum profundus", "Q. Pronator quadratus", "Q. Cubital fossa", "Q. Median n. in forearm, at wrist and in palm", "Q. Ulnar n. in forearm, at wrist and in palm", "Q. Nerve injuries at wrist", "Q. Flexor retinaculum", "Q. Carpal tunnel", "Q. Brachio-radialis", "Q. Supinator", "Q. Extensor retinaculum: attachments and compartments", "Q. Anatomical snuff box", "Q. Posterior interosseous n.", "Q. Supination & pronation", "Q. Interosseous membrane".
scripts/kasr/extract/mcq-bank.json, leaf "Forearm" — 171 distinct question stems, the largest count on any Anatomy leaf in this module, read for what the examiners ask.
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Clinical correlations: The account of why the palmar cutaneous branch of the median nerve is spared in carpal tunnel syndrome is assembled from two statements the department book makes separately — that the branch passes superficial to the retinaculum, and that the nerve is compressed within the tunnel. The department book does not draw the conclusion itself.
sections.Development: The absence of a developmental account is the source's; it is recorded in evidence_gaps.
## notes
The forearm carries more question-book items than any other Anatomy leaf in this module, and the material is almost entirely tabular. The article is written so that the two nerve rules and their five exceptions come before the muscle tables, because a student who holds the rules can reconstruct most of the tables and a student who holds the tables cannot reconstruct the rules.

---

# Item
## id
ART-101-ANA-MUSCLES-OF-THE-BACK
## title
Muscles of the back
## subject
msk
## status
Draft
## owner
Claude
## topic
Upper limb
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-ANATOMY
## archetype
anatomy
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Anatomy > Upper Limb > Muscles of the Back
## primary_node_id
DIS-ANA-T02
## secondary_node_ids
SYS-MSK-T01-S03-M02
SYS-MSK-T01-S01-M01
## related_concepts

## related_articles
ART-101-ANA-SHOULDER-REGION: The other half of the shoulder girdle's muscle list, and the abduction relay that trapezius completes above ninety degrees.
ART-101-ANA-AXILLA-BREAST: Latissimus dorsi forms the posterior wall of the axilla with teres major and subscapularis, and the posterior axillary fold with teres major.
ART-101-ANA-PECTORALIS-MAJOR: Latissimus dorsi and the sternocostal head of pectoralis major work together to pull the trunk upwards in climbing.
## aliases
Muscles of the back | Muscles connecting the upper limb with the vertebral column | Trapezius | Latissimus dorsi | Rhomboids | Levator scapulae | Triangle of auscultation | Lumbar triangle
## reading_time
11
## summary
These are not the muscles of the back in the anatomist's general sense. They are the five muscles that connect the upper limb to the vertebral column, and they are supplied by the anterior primary rami of spinal nerves — which is why trapezius, alone in the whole shoulder girdle, is not a brachial plexus muscle at all but a cranial-nerve one. Two layers, five muscles, two named triangles, and three clinical signs: shoulder drop, the posterior axillary fold, and a lumbar hernia.
## sections
### Overview and position
The muscles of the back, in this chapter's sense, are the muscles of the **upper limb** that lie on the back and connect the limb to the **vertebral column**. They are supplied by the **anterior primary rami** of the spinal nerves, and they are arranged in two layers.

**Superficial layer** — two muscles: **trapezius** and **latissimus dorsi**.
**Deep layer** — three muscles: **levator scapulae**, **rhomboideus major** and **rhomboideus minor**.

Five muscles in all. A student who adds erector spinae or the intrinsic muscles of the back has answered a different question: those are true back muscles, supplied by posterior primary rami, and this module does not teach them here.

### Structure
**Trapezius.** A large flat muscle whose two halves together look like a trapezium.

*Origin* — three regions of a continuous **U-shaped** line: the **back of the skull**, from the external occipital protuberance and the medial third of the superior nuchal line; the **back of the neck**, from the ligamentum nuchae and the spine of C7; and the **back of the thorax**, from the spines of **all** the thoracic vertebrae and their supraspinous ligaments.
*Insertion* — three regions matching the three sets of fibres: **upper fibres** into the posterior border of the lateral third of the clavicle; **middle fibres** into the medial border of the acromion and the upper lip of the crest of the spine of the scapula; **lower fibres** into a rough tubercle on the crest of the spine of the scapula near its root.
*Nerve supply* — **motor from the spinal root of the accessory nerve; sensory from the cervical nerves C3 and C4.**
*Action* — the upper fibres **elevate** the shoulder girdle; the middle fibres, with the rhomboids, **retract** the scapula and brace back the shoulder; the upper and lower fibres together **rotate the scapula so that the glenoid cavity faces upward**, which is what allows the arm to be raised overhead.

**Latissimus dorsi.** A large triangular flat muscle covering the lower half of the back down to the iliac crest, with a **wide origin and a narrow tendon of insertion**.

*Origin* — fleshy fibres from the **spines of the lower six thoracic vertebrae**, under cover of trapezius; the **thoraco-lumbar fascia**; the **posterior third of the outer lip of the iliac crest**; the **outer surfaces of the lower four ribs**; and a few fibres from the **dorsal aspect of the inferior angle of the scapula**.
*Insertion* — the **floor of the bicipital groove** of the humerus.
*Nerve supply* — the **thoraco-dorsal nerve (nerve to latissimus dorsi)**.
*Action* — **extension, medial rotation and adduction** of the arm, which is why it is named with pectoralis major as the swimming and rowing muscle; acting with the sternocostal part of pectoralis major it **pulls the trunk upwards** as in climbing, working from its insertion; and through its rib attachment it assists **violent expiration**, as in coughing.

Two relations of latissimus dorsi are examined in their own right. Its upper border crosses the inferior angle of the scapula, and it has a **triple relation to teres major**: first it lies **behind** teres major, then it curves **below** it, and at its insertion it comes to lie **in front** of it. And at its insertion it usually fuses with teres major to form the **posterior axillary fold** — the reason the two are named together whenever the wall of the axilla is asked.

**Deep layer.** Three muscles that all reach the **dorsal surface of the medial border of the scapula**, and are told apart by where along that border they arrive.

*Levator scapulae* — origin by four slips from the **transverse processes of the upper four cervical vertebrae**; insertion into the medial border **above the root of the spine**; nerve **dorsal scapular nerve (C5)** with fibres from **C3 and C4**; action: elevates the shoulder girdle with the upper fibres of trapezius, **rotates the scapula so the glenoid faces downward**, and retracts the scapula.

*Rhomboideus minor* — origin from the **lower part of the ligamentum nuchae and the spines of C7 and T1**; insertion into the medial border **opposite the root of the spine**; nerve **dorsal scapular nerve (C5)**; action: downward rotation of the scapula with levator scapulae, and **retraction** with the middle fibres of trapezius.

*Rhomboideus major* — origin from the **spines of T2 to T5 and their supraspinous ligaments**; insertion into the medial border **from the root of the spine to the inferior angle**; nerve **dorsal scapular nerve (C5)**; action: the same as rhomboideus minor.

So the medial border of the scapula is read from above down: levator scapulae above the spine, rhomboideus minor at the spine, rhomboideus major below it — and, on the **ventral** surface of the same border, **serratus anterior**. Which surface a muscle reaches is the difference between the rhomboids and serratus anterior, and it is the reason they are antagonists.

### Relations
Trapezius is the most superficial muscle of the region and covers the upper part of latissimus dorsi's origin, the rhomboids and levator scapulae. Latissimus dorsi covers the lower half of the back and is the muscle that wraps forwards around the lower border of the axilla.

Two named triangles are defined by these muscles, and both are asked by their boundaries.

**Triangle of auscultation** lies medial to the lower part of the scapula. *Above*: the lateral border of **trapezius**. *Below*: the upper border of **latissimus dorsi**. *Laterally*: the lower part of the **medial border of the scapula**. Its **floor** is **rhomboideus major** and the **sixth and seventh ribs with the space between them**. Breath sounds are heard clearly over it, because so little muscle lies between the stethoscope and the lung — which is where the name comes from.

**Lumbar triangle** lies just above the iliac crest. *Below*: the **iliac crest**. *Medially*: the lateral border of **latissimus dorsi**. *Laterally*: the posterior border of the **external abdominal oblique**. Its **floor** is the **internal abdominal oblique and transversus abdominis**. It is a site of **lumbar hernia**.

Note which muscle appears in both triangles and which does not: latissimus dorsi is a boundary of both, teres major of neither. A question book item that offers teres major as part of the triangle of auscultation is testing exactly that.

### Blood supply, innervation and lymphatics
The nerve supplies of this group carry a lesson that the whole shoulder girdle turns on.

**Trapezius is supplied by the spinal root of the accessory nerve** — a cranial nerve — with sensory fibres from C3 and C4. It is the one muscle acting on the shoulder girdle that is **not** supplied by a branch of the brachial plexus, and that exception is asked directly.

**Latissimus dorsi** is supplied by the **thoraco-dorsal nerve**, a branch of the posterior cord.
**Levator scapulae and both rhomboids** are supplied by the **dorsal scapular nerve (C5)**, levator scapulae also receiving fibres from **C3 and C4**.

The arterial supply of the region is not set out as a list in either Kasr source. What is named is the **anastomosis around the scapula**, whose vessels — the suprascapular artery, the deep branch of the transverse cervical artery, the subscapular and circumflex scapular arteries and the posterior intercostal arteries — run in this plane and supply the muscles they pass through.

**Lymphatics** of the back down to the level of the iliac crest drain to the **posterior (subscapular) group** of axillary nodes, which is why a lesion low on the back presents with an axillary node.

### Development
Neither Kasr source gives a developmental account of these muscles. The point that would matter — why a muscle of the limb comes to lie on the back and to be supplied by a cranial nerve — is not addressed in this module's material, and nothing is offered here in its place.

### Surface and imaging anatomy
The **lateral border of trapezius** and the **upper border of latissimus dorsi** are both palpable and together with the medial border of the scapula outline the triangle of auscultation; the triangle is opened up by folding the arms across the chest and leaning forwards, which draws the scapula laterally.

The **posterior axillary fold** is felt between finger and thumb as the sharp ridge at the back of the armpit; it is latissimus dorsi and teres major together.

The **inferior angle of the scapula** normally lies flat against the chest wall at about the level of the seventh rib; its projection backwards is the sign of a winged scapula, and it is what an examiner asks the patient to demonstrate by pushing against a wall.

The **lumbar triangle** is the soft area just above the iliac crest behind the mid-axillary line, and a lumbar hernia presents there as a reducible swelling.

### Clinical correlations
**Paralysis of trapezius leads to shoulder drop.** The department book states it in those words. The upper fibres are what hold the shoulder up against the weight of the limb, so their loss lets the whole girdle sag. Because the motor supply is the spinal root of the accessory nerve, the lesion is often in the **posterior triangle of the neck** rather than in the limb at all — an operation or a wound there, not a brachial plexus injury.

**Trapezius and serratus anterior fail together in raising the arm overhead.** Both rotate the scapula so that the glenoid cavity faces upward, and abduction beyond about ninety degrees needs that rotation. Loss of either stops the arm at roughly shoulder height, and the two are distinguished by the accompanying sign — **shoulder drop** for trapezius, **winging** for serratus anterior.

**Retraction fails with trapezius and the rhomboids together.** A patient who cannot brace the shoulders back has lost the middle fibres of trapezius, the rhomboids, or both, and the paired answer is the one the examiners ask for.

**Lumbar hernia** occurs through the lumbar triangle, whose floor is only internal oblique and transversus abdominis. The department book names the triangle as a hernia site and asks for its boundaries; it does not describe the management, and none is offered here.

**Latissimus dorsi in climbing and coughing.** Because the muscle takes origin from the trunk and inserts on the humerus, fixing the hand converts it into a muscle that lifts the trunk — which is the anatomical account of a pull-up. Its rib origin means the same muscle assists violent expiration.
## hold_these
The muscles of the back in this chapter are five muscles of the upper limb connecting it to the vertebral column, supplied by anterior primary rami.
Superficial layer: trapezius and latissimus dorsi. Deep layer: levator scapulae, rhomboideus major and rhomboideus minor.
Trapezius arises from the external occipital protuberance and medial third of the superior nuchal line, the ligamentum nuchae and C7 spine, and all the thoracic spines with their supraspinous ligaments.
Trapezius is supplied motor by the spinal root of the accessory nerve and sensory by C3 and C4 — the one shoulder-girdle muscle that is not a brachial plexus muscle.
Trapezius upper fibres elevate, middle fibres retract, and upper and lower fibres together rotate the scapula so the glenoid faces upward.
Latissimus dorsi arises from the lower six thoracic spines, thoraco-lumbar fascia, outer lip of the iliac crest, lower four ribs and the inferior angle of the scapula, and inserts into the floor of the bicipital groove.
Latissimus dorsi is supplied by the thoraco-dorsal nerve and extends, medially rotates and adducts the arm.
Latissimus dorsi has a triple relation to teres major — behind it, then below it, then in front of it at the insertion — and fuses with it to form the posterior axillary fold.
Levator scapulae and both rhomboids are supplied by the dorsal scapular nerve (C5); levator scapulae also takes C3 and C4.
Levator scapulae inserts above the root of the spine of the scapula, rhomboideus minor opposite it, rhomboideus major below it — all on the dorsal surface of the medial border.
Triangle of auscultation: trapezius above, latissimus dorsi below, medial border of scapula laterally; floor rhomboideus major with the sixth and seventh ribs.
Lumbar triangle: iliac crest below, latissimus dorsi medially, external abdominal oblique laterally; floor internal oblique and transversus abdominis; a site of lumbar hernia.
Paralysis of trapezius gives shoulder drop.
## lose_the_mark
Answering with erector spinae or the intrinsic back muscles. This chapter's five muscles belong to the upper limb and take anterior primary rami; the true back muscles are a different group.
Giving the brachial plexus as trapezius's nerve. It is the spinal root of the accessory nerve, and the exception is asked directly.
Confusing shoulder drop with winging. Shoulder drop is trapezius; winging is serratus anterior. Both stop the arm below the head, and only the accompanying sign separates them.
Putting teres major in the triangle of auscultation. Its boundaries are trapezius, latissimus dorsi and the medial border of the scapula, with rhomboideus major in the floor.
Attributing lateral rotation or flexion of the arm to latissimus dorsi. It extends, adducts and medially rotates.
Giving latissimus dorsi an origin from the lumbar spines directly. The book gives the thoraco-lumbar fascia, not the lumbar spines, along with the lower six thoracic spines.
Letting the rhomboids and serratus anterior share a surface. The rhomboids reach the dorsal surface of the medial border and serratus anterior the ventral surface, which is why they oppose each other.
Naming one nerve for the deep layer and forgetting levator scapulae's extra roots. It takes C3 and C4 in addition to the dorsal scapular nerve.
Giving the lumbar triangle a floor of latissimus dorsi. Latissimus dorsi is its medial boundary; the floor is internal oblique and transversus abdominis.
## image_recommendations
### anatomy plate · Back view with the five muscles in two panels — trapezius and latissimus dorsi in place on the left, cut away on the right to show levator scapulae and the two rhomboids — with every attachment mapped on the underlying skeleton in matching colours
Purpose: The deep-layer muscles are distinguished only by where along one border they insert, and that is unreadable as three sentences. A two-panel plate with the superficial layer reflected makes the layering and the border sequence one image.
Priority: required
Status: needed
Kind: anatomy plate
Section: Structure
Source direction: purpose-drawn, following the department book Figs. 12, 13, 14 and 17 (PDF pages 163-168)
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
### diagram · The triangle of auscultation and the lumbar triangle drawn on one back view, each boundary labelled with the muscle or bone that forms it and each floor tinted differently, with the stethoscope position marked on the first and the hernia site on the second
Purpose: Both triangles are examined as boundary lists, and both lists share latissimus dorsi. Drawing them on the same back is what stops the two sets of boundaries being blended into one.
Priority: required
Status: needed
Kind: diagram
Section: Relations
Source direction: purpose-drawn, following the department book Fig. 16 (PDF page 167)
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · The triple relation of latissimus dorsi to teres major, drawn as three small panels along the muscle's course — behind, below, and in front at the insertion — with the posterior axillary fold marked where the two fuse
Purpose: A relationship that changes three times along one muscle cannot be held from a sentence; three panels make the twist visible and explain the fold in the same figure.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Structure
Source direction: purpose-drawn, following the department book Fig. 15 (PDF page 166)
Rights: newly drawn for this product, or CC-BY / public domain
### clinical photograph · A patient with unilateral shoulder drop from trapezius paralysis, shown from behind beside the normal side, with the level of the two acromia marked
Purpose: Shoulder drop is a comparison rather than an appearance, and the examiner asks it to be recognised. A single side photographed alone teaches nothing.
Priority: optional
Status: needed
Kind: clinical photograph
Section: Clinical correlations
Rights: consented clinical photograph, or an anatomical illustration if no consented image is available
## conflicts
Nerve supply of levator scapulae. The department book gives "dorsal scapular nerve (C5) + fibres from C3 and C4"; Dr. Galal's table gives "N. to rhomboids & C3, 4", which names the same nerve by a different name. Both are recorded, because a marker working from either wording should recognise the other.
Insertion of the upper fibres of trapezius. The department book says "posterior border of lateral third of clavicle"; Dr. Galal says "post. border of lat. 1/3 clavicle". They agree, and the agreement is recorded because a third summary that says "outer third of the clavicle" is describing the same attachment in words the marker may not credit.
## evidence_gaps
Neither source gives a developmental account of these muscles, and neither explains why a limb muscle comes to be supplied by a cranial nerve. A student asked to account for trapezius's innervation has nothing in the faculty's own text to reason from.
Neither source sets out an arterial supply for this group as a list. What is given is the anastomosis around the scapula, whose vessels run in the plane; the muscles' individual arteries are not named anywhere in this module's material.
The department book names the lumbar triangle as a site of hernia and asks for its boundaries, but describes neither the clinical presentation nor the management of a lumbar hernia.
No concept has yet been minted on this leaf in either ../concept/101-ISK-concepts.md or ../concept/101-ISK-mcq-concepts.md, although the question books carry 29 distinct stems on it. The article's related_concepts is empty for that reason and not because the coverage was skipped; the concepts should be authored from these stems.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Chapter 2 "Muscles of the Back", PDF pages 163-168 — the two layers and their five muscles with origin, insertion, nerve supply and action; the triple relation of latissimus dorsi to teres major; the posterior axillary fold; the triangle of auscultation and the lumbar triangle; shoulder drop.
Department Book Module 101, Chapter 3 "Shoulder Region", PDF pages 174-175 — serratus anterior, whose ventral insertion on the medial border of the scapula is what the rhomboids are contrasted with.
Dr. Galal final revision (src_fc7ea5960363431009ed), page 4 — "Q. Trapezius", "Q. Latissimus dorsi", and the levator scapulae / rhomboideus minor / rhomboideus major comparison table.
scripts/kasr/extract/mcq-bank.json, leaf "Muscles of the Back" — 29 distinct question stems, read for what the examiners ask.
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
relatedConcepts: No concept whose module_subject is "101 ISK > Anatomy > Upper Limb > Muscles of the Back" exists yet in either concept batch. The field is left empty rather than filled with a neighbouring leaf's concept, and the gap is named in evidence_gaps so the concept pass can close it.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Blood supply, innervation and lymphatics: The arterial paragraph reports that the sources give no list, rather than assembling one from elsewhere.
sections.Development: The absence of a developmental account is the source's; it is recorded in evidence_gaps.
## notes
This leaf carries no concept yet. The article is written to the question books' stems and to Dr. Galal's two "Q." topics on the same page, so that the concepts minted from it later have prose already teaching them.

---

# Item
## id
ART-101-ANA-VEINS-OF-UPPER-LIMB
## title
Veins and lymphatics of the upper limb
## subject
msk
## status
Draft
## owner
Claude
## topic
Upper limb
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-ANATOMY
## archetype
anatomy
## high_yield
Core
## time_sensitive
stable
## publication_gate
needs_evidence
## universities
kau
## years
Year 1
## module
101 ISK
## module_subject
101 ISK > Anatomy > Upper Limb > Veins of the Upper Limb
## primary_node_id
DIS-ANA-T02
## secondary_node_ids
SYS-MSK-T01-S01-M03
SYS-MSK-T01-S01-M02
## related_concepts

## related_articles
ART-101-ANA-ARM: The cubital fossa, whose roof carries the median cubital vein and whose bicipital aponeurosis is what makes venepuncture there safe.
ART-101-ANA-AXILLA-BREAST: The axillary vein and the five groups of axillary lymph nodes that every lymphatic in this article ends in.
ART-101-ANA-FOREARM: The extensor retinaculum, which the cephalic and basilic veins pass superficial to, and the flexor retinaculum at the other side of the wrist.
## aliases
Veins of the upper limb | Cephalic vein | Basilic vein | Median cubital vein | Dorsal venous arch | Lymph drainage of the upper limb | Supratrochlear nodes | Infraclavicular nodes
## reading_time
10
## summary
Both great superficial veins of the limb start from the same dorsal venous arch and are told apart by which end they start from — cephalic laterally, basilic medially. Everything else follows: the cephalic ends in the axillary vein after piercing the clavipectoral fascia, the basilic becomes deep at the middle of the arm and helps make the axillary vein, and the median cubital vein between them is the commonest site of venepuncture in the body because a sheet of aponeurosis lies between it and the brachial artery. The lymphatics run with the veins and end, almost all of them, in one group of axillary nodes.
## sections
### Overview and position
The veins of the upper limb are divided into a **superficial** and a **deep** group. They communicate freely with each other and are provided with **valves**.

The superficial veins run in the **superficial fascia**, and the department book states plainly that they are **larger and more important than the deep veins**, into which they finally end. That is the opposite of the arrangement students expect from the lower limb, and it is the fact that makes the upper limb the site of choice for taking blood and giving fluids.

All of the superficial veins begin on the **dorsum of the hand**, from a network in the superficial fascia there.

### Structure
**The superficial dorsal venous network (dorsal venous arch)** lies in the superficial fascia on the dorsum of the hand and receives the **dorsal digital and metacarpal veins**. Both great superficial veins of the limb rise from its two ends.

**The cephalic vein** begins from the **lateral end** of the dorsal venous arch, **just behind the styloid process of the radius** — which is to say, in the roof of the anatomical snuff box. It runs upwards, winds round the lateral side of the wrist to reach the **anterior surface of the forearm**, and ascends on its lateral side. It crosses the **lateral part of the roof of the cubital fossa** into the arm, where it runs in a groove along the lateral side, and finally reaches the **delto-pectoral groove**. Just below the clavicle it pierces the **deep fascia and the clavipectoral fascia** to end in the **terminal part of the axillary vein**.

**The basilic vein** begins from the **medial end** of the dorsal venous arch. It ascends along the **medial surface of the forearm**, then turns to reach the anterior surface just below the elbow, and crosses the **medial part of the roof of the cubital fossa** into the arm. It **pierces the deep fascia at the middle of the arm**, at the insertion of coracobrachialis, and ascends **medial to the brachial artery**. At the **lower border of teres major** it is joined by the two venae comitantes of the brachial artery, and the union **forms the axillary vein**.

So the two veins end in different ways and the difference is examined: the cephalic **drains into** the axillary vein at its upper end, while the basilic **becomes** the axillary vein at its lower end.

**The median vein of the forearm** begins near the wrist by the union of a few veins from the palm and ascends in the middle of the front of the forearm. Below the elbow it ends in the basilic or the cephalic vein, or it divides into two — a **median basilic vein** joining the basilic and a **median cephalic vein** joining the cephalic.

**The median cubital vein** connects the cephalic and basilic veins in the superficial fascia of the **roof of the cubital fossa**, crossing **superficial to the bicipital aponeurosis**, which separates it from the brachial artery and median nerve lying deep to the aponeurosis. It is the **most prominent superficial vein in the body** and is the standard vein for intravenous injection.

**The deep veins** are two kinds. **Venae comitantes** accompany the main arteries, usually **two to each artery**, anastomosing with each other across it; the venae comitantes of the radial and ulnar arteries join those of the brachial artery. And the **axillary vein**, which begins at the lower border of teres major, ascends on the medial side of the axillary artery, and ends at the outer border of the first rib by becoming the subclavian vein.

### Relations
The relation that carries the clinical weight is at the elbow. In the **roof of the cubital fossa**, from superficial to deep: skin, then superficial fascia carrying the **median cubital vein** with the medial and lateral cutaneous nerves of the forearm and the **supratrochlear lymph nodes**, then deep fascia **reinforced by the bicipital aponeurosis**, and only then the **brachial artery and median nerve**. A needle in the median cubital vein is separated from the artery and the nerve by that aponeurosis.

At the **wrist**, both veins lie **superficial to the retinacula**. The beginning of the cephalic vein and the superficial radial nerve lie on the **lateral** side of the extensor retinaculum; the basilic vein and the dorsal cutaneous branch of the ulnar nerve on its **medial** side. Nothing venous passes deep to the extensor retinaculum, whose six compartments carry tendons, one nerve and one artery.

At the **shoulder**, the cephalic vein lies in the delto-pectoral groove with the deltoid branch of the thoraco-acromial artery and the **infra-clavicular (delto-pectoral) lymph nodes**, and pierces the **clavipectoral fascia** — one of the four structures that do so, along with the lateral pectoral nerve, the acromio-thoracic artery, and the lymph vessels running from the infraclavicular nodes to the apical group.

### Blood supply, innervation and lymphatics
**Lymph nodes of the upper limb** are divided into deep and superficial.

**Deep nodes** are the **five groups of axillary lymph nodes** — anterior (pectoral), posterior (subscapular), lateral (humeral), central and apical — together with a few nodes in the cubital fossa at the bifurcation of the brachial artery, in the arm along the brachial artery, and in the forearm along the radial and ulnar arteries.

**Superficial nodes** are few and scattered, and form two named groups.

The **supratrochlear (epitrochlear) nodes** lie in the superficial fascia of the **roof of the cubital fossa, above the medial epicondyle, along the basilic vein**. They receive from the **medial side of the hand and forearm** and send their efferents to the **lateral (humeral) group** of axillary nodes.

The **infraclavicular (delto-pectoral) nodes** lie **along the cephalic vein in the delto-pectoral groove**, immediately below the clavicle. They receive the few lymphatics that accompany that vein and send their efferents to the **apical group** of axillary nodes.

**Lymph vessels** follow the same two-vein plan.

*Superficial vessels on the medial side of the wrist* follow the **basilic vein** in the forearm, pierce the deep fascia with it, and end in the **lateral (humeral) group** of axillary nodes — some of them passing first through the supratrochlear nodes just above the elbow.

*Superficial vessels on the lateral side of the wrist* follow the **cephalic vein**. At the insertion of deltoid **most of them incline medially**, pierce the deep fascia and end in the **lateral (humeral) group**; a **few continue with the cephalic vein** and end in the **apical group**.

*Deep vessels* follow the main arteries — radial, ulnar and brachial — and end in the **lateral group**.

Two exceptions are named separately: deep vessels from the **scapular region** end in the **subscapular** group, and those from the **pectoral region** in the **pectoral** group.

The pattern to hold is that the **lateral (humeral) group of axillary nodes is the destination of the whole limb**, medial and lateral, superficial and deep, except for the small cephalic-vein stream that reaches the apical group directly. That is why the lateral group is the one enlarged by an infected hand.

### Development
Neither Kasr source gives a developmental account of the limb's veins or lymphatics, and this module's embryology chapters do not follow the limb bud. The absence is recorded rather than filled.

### Surface and imaging anatomy
The **dorsal venous arch** is visible under the skin on the back of the hand in most people, especially with the hand dependent, and is the vein used when the antecubital fossa is unusable.

The **cephalic vein** is followed as a line up the lateral side of the forearm and arm to the **delto-pectoral groove**, a palpable furrow between deltoid and pectoralis major.

The **median cubital vein** is looked for in the roof of the cubital fossa, and is made to stand out with a tourniquet on the arm. Its landmark is the **bicipital aponeurosis**, which can be felt as a taut band when the elbow is flexed against resistance.

The **supratrochlear nodes** are sought just above the medial epicondyle, along the basilic vein, and are palpated in a patient with a lesion of the medial fingers or the ulnar border of the hand.

### Clinical correlations
**Why venepuncture is done at the median cubital vein.** It is the most prominent superficial vein in the body, it is fixed in the superficial fascia of the roof of the cubital fossa, and the **bicipital aponeurosis** lies immediately deep to it, separating it from the brachial artery and the median nerve. The anatomy, not the size of the vein, is the answer to the exam question.

**Why the upper limb rather than the lower.** The superficial veins of the upper limb are larger and more important than the deep, so a cannula in a superficial vein carries a large share of the limb's return and does not obstruct anything the deep system needs.

**Why an infected finger produces a lump above the elbow.** Lymph from the medial side of the hand and forearm follows the basilic vein and passes through the **supratrochlear nodes** on its way to the axilla. A septic lesion on the ulnar side of the hand enlarges them; a lesion on the radial side usually does not, because that stream inclines medially at the deltoid to bypass them.

**Why an infected hand enlarges the lateral axillary nodes.** Almost the entire limb — superficial and deep, medial and lateral — drains eventually to the **lateral (humeral) group**, which is therefore the group that swells in an infection of the limb, as distinct from the **anterior (pectoral) group** that a breast lesion reaches first.

**Why the cephalic vein is used for a pacemaker or long line.** Its position in the delto-pectoral groove is constant and superficial, and it ends directly in the axillary vein after piercing the clavipectoral fascia, giving a short route to the central veins. The department book gives the anatomy; it does not describe the procedure, and none is described here.

### Variations and anomalies
The department book records that the **median vein of the forearm** may end in the basilic vein, or in the cephalic vein, or divide into a median basilic and a median cephalic vein — three normal patterns rather than one, which is why the venous outline at the elbow differs from patient to patient and why a described "M" pattern is a common arrangement rather than the arrangement.

No other variation of the limb's veins or lymphatics is described in either source, and none is asserted here.
## hold_these
The superficial veins of the upper limb are larger and more important than the deep veins, and they end in them; both groups carry valves.
Both great superficial veins begin from the dorsal venous arch on the back of the hand — cephalic from its lateral end, basilic from its medial end.
The cephalic vein begins just behind the styloid process of the radius, ascends on the lateral side, crosses the lateral part of the roof of the cubital fossa, reaches the delto-pectoral groove, and pierces the clavipectoral fascia to end in the axillary vein.
The basilic vein pierces the deep fascia at the middle of the arm and is joined at the lower border of teres major by the venae comitantes of the brachial artery to form the axillary vein.
The median cubital vein connects the two in the roof of the cubital fossa, crossing superficial to the bicipital aponeurosis.
The bicipital aponeurosis separates the median cubital vein from the brachial artery and the median nerve.
The median vein of the forearm ends in the basilic, or the cephalic, or divides into median basilic and median cephalic veins.
Venae comitantes accompany the main arteries, two to each, and those of the radial and ulnar arteries join those of the brachial.
Supratrochlear nodes lie above the medial epicondyle along the basilic vein, receive from the medial side of the hand and forearm, and drain to the lateral (humeral) axillary group.
Infraclavicular nodes lie along the cephalic vein in the delto-pectoral groove and drain to the apical axillary group.
Lymph from the medial side of the wrist follows the basilic vein to the lateral group, some passing through the supratrochlear nodes.
Lymph from the lateral side of the wrist follows the cephalic vein, most inclining medially at the deltoid to reach the lateral group, a few continuing to the apical group.
Deep lymph vessels follow the radial, ulnar and brachial arteries to the lateral group; scapular region drains to subscapular nodes and pectoral region to pectoral nodes.
## lose_the_mark
Starting the basilic vein at the lateral end of the dorsal venous arch. Cephalic is lateral, basilic is medial, and the two stems that swap them are the commonest single-best-answer trap on this leaf.
Saying the cephalic vein ends in the subclavian vein. It ends in the terminal part of the axillary vein, after piercing the clavipectoral fascia.
Putting the beginning of the cephalic vein or the basilic vein deep to the extensor retinaculum. Both are superficial to it; only tendons, the posterior interosseous nerve and the anterior interosseous artery pass beneath.
Answering "because it is big" when asked why the median cubital vein is used for injection. The mark is for the bicipital aponeurosis lying between it and the brachial artery.
Calling the median cubital vein a deep vein. It lies in the superficial fascia of the roof of the cubital fossa.
Saying the axillary artery is accompanied by two venae comitantes. It has one axillary vein; it is the brachial artery that has two venae comitantes.
Sending supratrochlear lymph to the apical group. Supratrochlear efferents go to the lateral (humeral) group; it is the infraclavicular nodes along the cephalic vein that reach the apical group.
Treating the basilic vein as a tributary of the axillary vein. It is one of the two roots that form it, together with the venae comitantes of the brachial artery.
## image_recommendations
### diagram · The superficial veins of the whole upper limb on one anterior figure, dorsal venous arch at the bottom with the cephalic rising from its lateral end and the basilic from its medial end, the median vein of the forearm and the median cubital vein drawn between them, the point where the basilic pierces the deep fascia marked, and the cephalic's passage through the clavipectoral fascia shown at the top
Purpose: Both veins are defined entirely by which end they start from and where they go deep, and those are two positions on one drawing. The commonest exam error on this leaf is swapping them, which a single figure prevents and prose does not.
Priority: required
Status: needed
Kind: diagram
Section: Structure
Source direction: purpose-drawn, following the department book Figs. 96 and 97 (PDF pages 253-254)
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
### diagram · Sagittal section through the roof of the cubital fossa, layer by layer — skin, superficial fascia with the median cubital vein and the supratrochlear nodes, deep fascia reinforced by the bicipital aponeurosis, then the brachial artery and median nerve beneath — with a needle drawn entering the vein and stopping above the aponeurosis
Purpose: The safety of venepuncture is a statement about layers, and a section is the only view in which a layer is a thing rather than a word. The needle makes the teaching point without a caption.
Priority: required
Status: needed
Kind: diagram
Section: Relations
Source direction: purpose-drawn, following the department book Fig. 53 (PDF page 206) and the veins chapter PDF page 254
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · Lymph drainage of the upper limb as arrows on one anterior figure — the medial stream following the basilic vein through the supratrochlear nodes to the lateral axillary group, the lateral stream following the cephalic vein and inclining medially at the deltoid with a thin branch continuing to the apical group, and the deep vessels following the arteries — with the five axillary groups drawn at the top
Purpose: The whole answer is a set of directions that converge on one node group, and directions drawn as arrows are countable in a way that four prose sentences are not.
Priority: required
Status: needed
Kind: diagram
Section: Blood supply, innervation and lymphatics
Source direction: purpose-drawn, following the department book Figs. 98 and 99 (PDF pages 255-256)
Rights: newly drawn for this product, or CC-BY / public domain
### clinical photograph · A forearm with a tourniquet applied and the median cubital vein standing out in the cubital fossa, the bicipital aponeurosis's position indicated on a companion drawing
Purpose: The vein is identified in practice by appearance under a tourniquet, and a student who has only read "most prominent superficial vein" has no picture of what to look for.
Priority: optional
Status: needed
Kind: clinical photograph
Section: Surface and imaging anatomy
Rights: consented clinical photograph, or an anatomical illustration if no consented image is available
## conflicts
Where the cephalic vein begins. The department book says "from the lateral end of the dorsal venous arch just behind the styloid process of radius"; Dr. Galal says it begins "from lat. end of dorsal venous arch in roof of anatomical snuff box". These are the same place described by two landmarks, and both are given here because the question books use both.
Whether the basilic vein pierces the clavipectoral fascia. One question-book stem offers "the basilic vein pierces the clavipectoral fascia" as an option. Both Kasr sources are clear that it is the **cephalic** vein that pierces the clavipectoral fascia; the basilic pierces the deep fascia of the arm at the middle of the arm. The stem is recorded because a student who has met the option needs to know it is a distractor.
## evidence_gaps
Neither source gives a developmental account of the limb's veins or lymphatics.
Neither source gives the valve arrangement of the superficial veins beyond the statement that they are provided with valves, so a question on the direction or number of valves cannot be answered from this faculty's own text.
The department book states that the superficial veins are larger and more important than the deep veins but does not say why, and offers no account of the muscle pump or of venous return from the limb. The clinical paragraph here reasons from the book's own statement rather than adding a mechanism the book does not teach.
No concept whose module_subject is this leaf exists yet in either concept batch, although the question books carry 9 distinct stems on it. The related_concepts field is empty for that reason.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Chapter 8 "Veins of the Upper Limb", PDF pages 253-256 — superficial and deep groups; dorsal venous network; cephalic, basilic, median and median cubital veins; venae comitantes; deep and superficial lymph nodes; superficial and deep lymph vessels and their destinations.
Department Book Module 101, Chapter 6 "Forearm", PDF page 206 — the roof of the cubital fossa and the bicipital aponeurosis, which is what makes the median cubital vein safe to puncture.
Department Book Module 101, Chapter 4 "Axilla", PDF pages 191-193 — the axillary vein and the five groups of axillary lymph nodes that every stream in this article ends in.
Dr. Galal final revision (src_fc7ea5960363431009ed), pages 12 and 36 — "Axillary V.", "Q. Axillary lymph nodes", and "Cephalic & basilic veins".
scripts/kasr/extract/mcq-bank.json, leaf "Veins of the Upper Limb" — 9 distinct question stems, the smallest count on any Anatomy leaf in this module, read for what the examiners ask.
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
relatedConcepts: No concept whose module_subject is "101 ISK > Anatomy > Upper Limb > Veins of the Upper Limb" exists yet in either concept batch. The field is left empty rather than filled with a neighbouring leaf's concept, and the gap is named in evidence_gaps.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopic: No microtopic level exists beneath this node.
nanotopic: No nanotopic level exists beneath this node.
reviewer: Not yet reviewed by faculty. The publication gate is needs_evidence for that reason.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
title: The leaf is named "Veins of the Upper Limb" but the department book's chapter of that name also carries the whole lymph drainage of the limb, and the question books ask both. The title says so rather than leaving half the chapter unannounced.
sections.Development: The absence of a developmental account is the source's; it is recorded in evidence_gaps.
## notes
The chapter this article follows is short, and the leaf carries only nine question-book stems. It is written full-length anyway, because the lymphatic half of the chapter is what the axilla and breast questions rest on, and because five of the nine stems turn on one swap — cephalic lateral, basilic medial.
