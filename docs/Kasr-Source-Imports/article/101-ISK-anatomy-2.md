<!--
  Library articles for 101 ISK — Anatomy, Year 1, Kasr Al Ainy (kau).

  Nine articles completing the Anatomy half of the module: the three Upper Limb
  leaves not covered by 101-ISK-anatomy.md — Arm, Shoulder Region and Forearm —
  and the six Basis of Anatomy leaves — Introduction, Fascia, Skeletal system,
  Cardiovascular system, Lymphatic system and Nervous system.

  Muscles of the Back and Veins of the Upper Limb were originally drafted here
  as well, independently of the copies in 101-ISK-anatomy.md, and both drafts
  carried the same ids — ART-101-ANA-MUSCLES-OF-THE-BACK and
  ART-101-ANA-VEINS-OF-UPPER-LIMB — as the ones already in that file. A repeated
  id is read by the importer as an update, so whichever file imported second
  would have silently overwritten the other. The two records have been compared
  against the department book and merged into single records kept in
  101-ISK-anatomy.md; anything this file's draft had that the book supported and
  the surviving record lacked was folded in there. The duplicates are removed
  from this file. 101-ISK-anatomy.md is the sole record for both ids.

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
  re-derived, and every listed concept is taught in the prose. The concept files
  were re-read after the last article was written, and the concepts other lanes
  had minted in the meantime — seven more on Arm — were folded in, with prose
  added where a new concept asked for something the article had not yet taught.
  Five leaves carry no concept at all yet — Introduction, Skeletal system,
  Cardiovascular system, Lymphatic system and Nervous system — and their
  `field_notes` say so rather than borrowing one from a neighbouring leaf.

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
CON-MSK-74BFAB9385B955
CON-MSK-951D4DFF864245
CON-MSK-875049D4420AA4
CON-MSK-2D2E4341DC5990
CON-MSK-34E34E10280236
CON-MSK-7325E0613EC953
CON-MSK-A4A49A26BA10E7
CON-MSK-BAB2A859A2575C
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

- The **ulnar nerve** pierces the **medial** intermuscular septum, at the middle of the arm, accompanied by the **superior ulnar collateral artery**, and leaves the front of the arm for the back.
- The **radial nerve** pierces the **lateral** intermuscular septum, in the lower third, accompanied by the **radial collateral artery**, and comes from the back of the arm to the front.

Both septa are attached to the corresponding **supracondylar ridge** of the humerus, and both give attachment to muscle: in front, to **brachialis**, which arises from the anterior aspect of both, and to **brachioradialis and extensor carpi radialis longus** on the lateral septum only; behind, to the **medial head of triceps**.

### Structure
**The flexor group** is three muscles in two layers: biceps and coracobrachialis superficially, brachialis deep to them. All three are supplied by the **musculocutaneous nerve**, with one qualification the department book states and the question books use — the small lateral part of brachialis is also supplied by a twig from the **radial nerve**, so brachialis has a double nerve supply.

**Biceps brachii.** Origin by two heads: the **short head** from the **lateral part of the tip of the coracoid process**, in common with coracobrachialis and lying lateral to it; the **long head** from the **supraglenoid tubercle** of the scapula. The long head's tendon runs through the shoulder joint **inside the fibrous capsule but outside the synovial membrane** — it is the one tendon of the region that is intracapsular and extrasynovial, and it is asked in those words — and then descends in the bicipital groove. Insertion in two parts: the **bicipital tendon** into the **posterior rough part of the radial (bicipital) tuberosity**, and the **bicipital aponeurosis** into the deep fascia over the flexor muscles in the roof of the cubital fossa. Nerve supply musculocutaneous, from the lateral cord. Action: it is the **powerful supinator** of the forearm, acting when the elbow is flexed; it flexes the elbow; the long head tendon stabilises the head of the humerus; and the short head assists flexion at the shoulder. It is **not** a pronator and it does not extend the elbow.

**Coracobrachialis.** Origin from the tip of the coracoid process, in common with the short head of biceps. Insertion into the middle of the medial border of the shaft of the humerus. Nerve supply musculocutaneous — the nerve pierces this muscle. Action: assists flexion and adduction at the shoulder joint.

**Brachialis.** Origin from the lower half of the front of the shaft of the humerus, embracing the insertion of deltoid above, and from the anterior aspects of both intermuscular septa. Insertion into the **coronoid process and the tuberosity of the ulna**. Nerve supply musculocutaneous, plus a radial twig to its small lateral part. Action: it is the **primary flexor of the elbow** and it does nothing else. It acts whatever the position of the forearm, which makes it the muscle that **flexes the pronated forearm**, where biceps is at a mechanical disadvantage.

**The extensor group** is one muscle.

**Triceps.** Origin by three heads: the **long head** from the **infraglenoid tubercle** of the scapula — the only head that crosses the shoulder joint as well as the elbow; the **lateral head** from the upper lip of the spiral groove on the back of the humerus; the **medial head** from the back of the shaft below the spiral groove and from both intermuscular septa. Insertion into the **upper surface of the olecranon process**, with a few deep fibres — **articularis cubiti** — inserting into the posterior part of the fibrous capsule of the elbow. Nerve supply **radial nerve** for every head, given in two instalments: branches to the long and medial heads in the axilla, and branches to the lateral and medial heads in the spiral groove. Action: the powerful extensor of the elbow; articularis cubiti draws the back of the capsule upwards during extension so that it is not nipped inside the joint. **Anconeus**, in the forearm, continues the muscle across the elbow, is also supplied by the radial nerve, and is described as the fourth head of triceps.

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

The **shaft of the humerus** is read in thirds, and each third has its own markings.

The **upper third** carries the **intertubercular (bicipital) groove** in front, with **pectoralis major on its lateral lip, teres major on its medial lip and latissimus dorsi on its floor**.

The **middle third** carries the **deltoid tuberosity on its lateral surface**, the **insertion of coracobrachialis on its medial border**, and the **spiral (radial) groove running downwards and laterally across its posterior surface**, lodging the radial nerve and the profunda brachii vessels. Those three are asked as a single-best-answer item that turns entirely on the surface each lies on, so learn them by surface rather than by name.

The **lower third** is flattened from before backwards and expands into the **medial and lateral supracondylar ridges**, the two **epicondyles** and the articular condyle.

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
Biceps has a long head from the supraglenoid tubercle and a short head from the lateral part of the tip of the coracoid, inserting by the bicipital tendon into the radial tuberosity and by the bicipital aponeurosis into the deep fascia.
The long head of biceps is the intracapsular, extrasynovial tendon of the shoulder joint.
Brachialis inserts into the coronoid process and the tuberosity of the ulna and is the muscle that flexes the pronated forearm.
The upper third of the humeral shaft carries the bicipital groove, the middle third the deltoid tuberosity, the coracobrachialis insertion and the spiral groove, and the lower third the supracondylar ridges and the epicondyles.
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
Naming the short head of biceps as the intracapsular tendon of the shoulder. It is the long head that lies inside the capsule and outside the synovial membrane.
Answering "biceps" for flexion of the pronated forearm. Brachialis flexes the elbow whatever the position of the forearm, and biceps is at a mechanical disadvantage in pronation.
Giving triceps a short head, or a long head from the supraglenoid tubercle. Its heads are long, lateral and medial, and the long head arises from the infraglenoid tubercle.
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
## resource_ids
src_b1e6dc481eaf337268d0

## claim_ids
CLM-09C3CC42F64D | CLM-0FA3B2DF97D2 | CLM-2C0AE84F5A80 | CLM-6FA9B9852227 | CLM-B4E2C96E77E8 | CLM-BB1B27CD52CD | CLM-CDCA0C631225 | CLM-F96946E40133

## span_ids
SPN-ANA-ARM-01 | SPN-ANA-ARM-02 | SPN-ANA-ARM-03 | SPN-ANA-ARM-04 | SPN-ANA-ARM-05 | SPN-ANA-ARM-06 | SPN-ANA-ARM-07 | SPN-ANA-ARM-08 | SPN-ANA-ARM-09 | SPN-ANA-ARM-10 | SPN-ANA-ARM-11 | SPN-ANA-ARM-12 | SPN-ANA-ARM-13 | SPN-ANA-ARM-14 | SPN-ANA-ARM-15 | SPN-ANA-ARM-16

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
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead, which is the admin-side request queue rather than a student-visible asset.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the reciprocal link is written from the question side, which is where the importer maintains it.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so the curriculum position is carried by module_subject instead.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate, so there is no student projection yet.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Development: The absence of a developmental account is the source's, not an omission here; it is recorded in evidence_gaps.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
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
CON-MSK-1CA86BE843A07C | CON-MSK-DF8F395F3D471E | CON-MSK-8533FCB18D819B | CON-MSK-04D3ACA71DC025 | CON-MSK-171B2F8B24F6E7 | CON-MSK-352E28DEA38DF7 | CON-MSK-38A32E79B1412F | CON-MSK-B88F413E4536F9 | CON-MSK-DAF3D2128459B3 | CON-MSK-E68EAACB7596AF

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
## resource_ids
src_b1e6dc481eaf337268d0

## claim_ids
CLM-03DBCEE37405 | CLM-0EB6C7FF0B79 | CLM-E49B719C31E7

## span_ids
SPN-ANA-SHOULDER-REGION-01 | SPN-ANA-SHOULDER-REGION-02 | SPN-ANA-SHOULDER-REGION-03 | SPN-ANA-SHOULDER-REGION-04

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
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Clinical correlations: The sentence explaining that the greater tuberosity meets the coraco-acromial ligament at 90° comes from the concept record drafted from the exam paper, not from the two chapters read for this article. It is named in evidence_gaps.
sections.Development: The absence of a developmental account is the source's; it is recorded in evidence_gaps.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
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
CON-MSK-E10403A4189B45 | CON-MSK-44234D1863CE8E | CON-MSK-2AA14F317F45C3

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
## resource_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

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
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Clinical correlations: The account of why the palmar cutaneous branch of the median nerve is spared in carpal tunnel syndrome is assembled from two statements the department book makes separately — that the branch passes superficial to the retinaculum, and that the nerve is compressed within the tunnel. The department book does not draw the conclusion itself.
sections.Development: The absence of a developmental account is the source's; it is recorded in evidence_gaps.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
## notes
The forearm carries more question-book items than any other Anatomy leaf in this module, and the material is almost entirely tabular. The article is written so that the two nerve rules and their five exceptions come before the muscle tables, because a student who holds the rules can reconstruct most of the tables and a student who holds the tables cannot reconstruct the rules.

---

# Item
## id
ART-101-ANA-INTRODUCTION
## title
Anatomical position, planes and terms
## subject
msk
## status
Draft
## owner
Claude
## topic
Basis of anatomy
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
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
101 ISK > Anatomy > Basis of Anatomy > Introduction
## primary_node_id
DIS-ANA-T01
## secondary_node_ids
SYS-MSK-T01
## related_concepts
CON-MSK-A0C1F50FABDC0F | CON-MSK-D193498AB94D21 | CON-MSK-EE7CDEF8ACA587

## related_articles
ART-101-ANA-FASCIA: The first structure described in these terms — superficial and deep, and everything the two words mean.
ART-101-ANA-SKELETAL-SYSTEM: The bony features named in this vocabulary, from process and tubercle to fossa and foramen.
ART-101-ANA-MUSCLE-ATTACHMENTS: Origin, insertion, proximal and distal — the limb conventions this chapter's terms make usable.
## aliases
Introduction | Anatomical position | Anatomical planes | Terms of position | Anatomical terminology | Median plane | Coronal plane
## reading_time
7
## summary
Every anatomical description in the module is written from one starting posture, and if the posture changes the words change with it. Anatomical erect position fixes the palms facing forwards, which is why the radius is lateral and the ulna medial in every sentence you will read this year. Four planes, fourteen terms of position and six terms of number — a short closed list that is asked directly in the single-best-answer paper and used silently in every other question on it.
## sections
### Definition
Anatomy is described from a fixed reference posture so that two people describing the same structure use the same words. That posture is the **anatomical erect position**, and the department book states it as five conditions together.

- The human body is regarded as **standing erect**.
- The **eyes are looking forwards**.
- The **upper limbs are hanging by the sides**.
- The **palms are facing forwards**.
- The **thumbs are directed laterally**.

Four other named positions are used in clinical description, and the book asks for them by name.

**Supine** — the body lies on its **back**. **Prone** — the body lies on its **face**. **Lithotomy** — the body lies on its back with **flexion of the hip and knee and abduction of the hip joints**. **Lateral decubitus** — the body lies on its **side**, right or left.

The anatomical position is not a description of how anyone stands. It is a convention chosen so that the two bones of the forearm are uncrossed, which is why the radius is described as lateral and the ulna as medial throughout the year even though the pronated hand puts the radius across the ulna.

### Mechanism
A plane is a flat surface passing through the body, and each is defined by what it separates.

**Median (sagittal) plane** — the **vertical** plane passing through the **middle line**, dividing the body into **equal right and left halves**. It is the only plane that produces two equal parts, and "equal" is the word the answer turns on.

**Paramedian plane** — a plane **parallel to and near** the median plane. It is vertical and it divides the body into right and left parts, but the parts are unequal.

**Coronal (frontal) plane** — the plane cutting the body **vertically** into an **anterior** part towards the front and a **posterior** part towards the back.

**Horizontal (transverse) plane** — the plane running **horizontally**, cutting the body into an **upper (superior)** and a **lower (inferior)** part.

Two planes are vertical and divide right from left; one is vertical and divides front from back; one is horizontal and divides above from below. Sorting them that way is quicker than memorising four sentences, and it is what a stem asking "the plane which separates the body into an anterior and posterior part" is testing.

### Key determinants
**Terms of position** are the working vocabulary of every other chapter, and the department book gives them as a table of fourteen.

*Anterior / ventral* — in front, nearer to the front of the body.
*Posterior / dorsal / retro-* — behind, nearer to the back of the body.
*Superior / upper / cranial* — nearer to the upper end of the body.
*Inferior / lower / caudal* — nearer to the lower end of the body.
*External / outer* — near or on the surface of the body or organ.
*Internal / inner* — inside the organ or the body.
*Median* — exactly in the middle line or median plane.
*Medial* — **nearer to** the median plane.
*Lateral* — **away from** the median plane.
*Proximal* — **nearer to the root of the limb**.
*Distal* — **away from the root of the limb**.
*Superficial* — towards the skin or body surface.
*Deep* — away from the skin or body surface.
*Peri-* — around.

Two pairs are asked as single-best-answer items almost every sitting: **medial versus lateral**, defined against the **median plane**, and **proximal versus distal**, defined against the **root of the limb**. Neither pair is defined against the observer, the midline of a limb, or the ground, and each of those is a distractor.

**Terms of number** are a short prefix list.

*Uni- / mono-* one. *Bi- / di-* two. *Tri-* three. *Quadri-* four. *Multi- / poly-* many. *Oligo-* little.

These are what turn an unfamiliar muscle name into a readable one — bipennate, quadriceps, multifidus, polydactyly — and they are why the classification lists in later chapters can be reconstructed rather than memorised.

### Clinical significance
The vocabulary is not decoration; three practical things depend on it.

**A description that ignores the anatomical position is ambiguous.** "The radius is lateral to the ulna" is true only in supination, and is stated as a permanent fact because the reference posture is supinated. A student who describes a pronated forearm's relations without saying so has written something the marker cannot check.

**Imaging is reported in planes.** A cross-sectional image is read in the horizontal plane, a coronal reconstruction in the coronal plane, and a midline sagittal image in the median plane. The names come straight from this chapter.

**Clinical positioning is named, not described.** A patient is put in the lithotomy position or the lateral decubitus position, and the words are expected to be understood without further explanation. The department book lists them for that reason.

### Common misconceptions
**Median and medial are not the same word.** Median means exactly in the middle line; medial means nearer to it. A structure can be medial without being median, and only one structure in a pair can be median at all.

**The sagittal plane, in this faculty's usage, is the median plane.** The department book names them together — "Median plane (Sagittal)" — and calls a parallel plane beside it a **paramedian** plane. A student who has learned elsewhere that "sagittal" means any vertical antero-posterior plane will answer "which plane divides the body into two equal halves" wrongly, because on that usage both sagittal and median would qualify. Here they do not: **median is the equal one**.

**Proximal and distal are limb words.** They are defined against the root of the limb and are not used for the trunk, where superior and inferior do that job.

**Anatomical position is standing, not sitting or lying.** Options that describe the body sitting down, or with the eyes looking backwards, or with the palms facing backwards, appear in the question books and are wrong on the face of it once the five conditions are held together.
## hold_these
Anatomical erect position: standing erect, eyes forwards, upper limbs hanging by the sides, palms facing forwards, thumbs directed laterally.
Supine is lying on the back; prone is lying on the face.
Lithotomy position is on the back with the hips and knees flexed and the hips abducted; lateral decubitus is lying on one side.
The median (sagittal) plane is vertical and divides the body into two equal right and left halves.
The paramedian plane is parallel to and near the median plane, and its parts are unequal.
The coronal (frontal) plane divides the body vertically into anterior and posterior parts.
The horizontal (transverse) plane divides the body into upper and lower parts.
Medial means nearer to the median plane; lateral means away from it.
Proximal means nearer to the root of the limb; distal means away from it.
Superficial is towards the skin; deep is away from it.
Median means exactly in the middle line, which is not the same as medial.
Terms of number: uni- and mono- one, bi- and di- two, tri- three, quadri- four, multi- and poly- many, oligo- little.
## lose_the_mark
Answering "sagittal" or "paramedian" to the plane that divides the body into two equal halves. This faculty's answer is the median plane, and it names sagittal as its synonym rather than as a wider class.
Swapping medial and lateral. Medial is nearer to the median plane; the word to reason from is "median", not "middle of the limb".
Defining proximal and distal against the body rather than the root of the limb. They are limb terms and nothing else.
Describing the anatomical position with the palms facing backwards. The palms face forwards and the thumbs point laterally, which is what makes the forearm bones uncrossed.
Using median where medial is meant. Only a midline structure is median.
Giving the coronal plane an upper and lower division. It divides anterior from posterior; the horizontal plane divides upper from lower.
Forgetting that lithotomy involves abduction as well as flexion. The book gives flexion of hip and knee and abduction of the hip joints together.
## image_recommendations
### diagram · A figure standing in the anatomical erect position with all five conditions annotated — erect, eyes forwards, limbs by the sides, palms forwards, thumbs lateral — with the three planes drawn through it as translucent sheets in three colours and each labelled by what it separates
Purpose: The reference posture and the planes are one idea, and the whole chapter is a picture. A student who has seen the median plane as a sheet through a figure never confuses it with the coronal one; a student who has read four definitions often does.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book PDF pages 109-110, redrawn rather than reproduced
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
### diagram · One outline figure carrying every term of position as a labelled arrow — anterior and posterior, superior and inferior, medial and lateral against a drawn median plane, proximal and distal along a limb with its root marked, superficial and deep on a cut through the arm
Purpose: Each pair is defined against a reference the words do not name out loud. Drawing the reference — the median plane, the root of the limb, the skin — is what makes the definitions checkable rather than remembered.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book's table on PDF page 111
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · The four clinical positions drawn as four small figures — supine, prone, lithotomy with hips and knees flexed and hips abducted, and lateral decubitus
Purpose: These are names for postures, and a posture is a picture. Four small figures cost less page than four sentences and are recalled under exam pressure when the sentences are not.
Priority: optional
Status: needed
Kind: diagram
Section: Definition
Source direction: purpose-drawn, following the department book PDF pages 109-110
Rights: newly drawn for this product, or CC-BY / public domain
## conflicts
Sagittal as a synonym for median. The department book heads the first plane "Median plane (Sagittal)", treating the two as the same plane, and gives paramedian as the name for a parallel plane beside it. Most international texts use sagittal as the class name and midsagittal or median for the equal-halves plane. The department book's usage is followed here because it is what this faculty marks, and the divergence is recorded because a student reading around will meet the other convention.
Which is the fourth plane. Dr. Galal's final revision does not cover this chapter at all — it opens at the Upper Limb and returns to the Basis chapters only for fascia, bone, joints and muscle. The department book is the only source of record for this leaf.
## resource_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## evidence_gaps
Dr. Galal's revision does not cover this leaf. The department book is the sole source, so nothing in this article is corroborated by a second Kasr source.
The department book gives no oblique plane, no term for rotation about an axis, and no movement vocabulary — flexion, extension, abduction, adduction, pronation, supination, circumduction — in this chapter. Those words are used from the very next chapter onwards and are never defined anywhere in the module's own text, although the question books use them in almost every stem.
The department book gives no axes of movement, although the question books ask about the axis of pronation and supination directly.
The MCQ bank's "Introduction" leaf is not a clean set: of its 54 stems, roughly half are upper-limb muscle and artery questions filed here by the extractor rather than questions on anatomical terminology. Only the terminology stems were used to shape this article, and the mis-filing is recorded so that a later pass re-files them rather than treating this leaf as unexpectedly large.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Basis of Anatomy Chapter 1 "Introduction", PDF pages 109-111 — anatomical erect position and the four clinical positions; the four anatomical planes; the table of fourteen terms of position; the terms of number.
scripts/kasr/extract/mcq-bank.json, leaf "Introduction" — 54 stems, of which the terminology items were used and the mis-filed upper-limb items were not.
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here — and for this leaf in particular, because the whole article is vocabulary, an unreviewed Arabic title would be a claim about terminology rather than a label.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
relatedConceptIds: No concept whose module_subject is "101 ISK > Anatomy > Basis of Anatomy > Introduction" exists yet in either concept batch. The field is left empty rather than filled with a neighbouring leaf's concept, and the gap is named in evidence_gaps.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
## notes
Three pages of department book support a leaf the question books return to every sitting, and every later chapter depends on the vocabulary. The article is short on purpose: there is nothing here that is not in the book, and padding it with movement terminology the book never defines would hide the gap that matters.

---

# Item
## id
ART-101-ANA-FASCIA
## title
Fascia
## subject
msk
## status
Draft
## owner
Claude
## topic
Basis of anatomy
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
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
101 ISK > Anatomy > Basis of Anatomy > Fascia
## primary_node_id
DIS-ANA-T01
## secondary_node_ids
SYS-MSK-T03-S02-M04
## related_concepts
CON-MSK-6CD9FFF51AE9CD
## related_articles
ART-101-ANA-DEEP-FASCIA: The deep half of this chapter taught on its own, with the five parts and their functions worked through one at a time.
ART-101-ANA-ARM: The medial and lateral intermuscular septa, and the two nerves that pierce them, are what item two of the deep fascia list looks like in a real region.
ART-101-ANA-FOREARM: The retinacula and the carpal tunnel are items three and one of the same list, and they are where fascia becomes a clinical problem.
## aliases
Fascia | Superficial fascia | Deep fascia | Internal fascia | Functions of superficial fascia | Parts of deep fascia | Fascia profunda
## reading_time
9
## summary
The department asks fascia as two lists that must not be mixed: six functions of the superficial fascia and five parts of the deep fascia, each part with its own function. Superficial fascia is loose connective tissue with fat and its list is about what a fatty mobile layer achieves. Deep fascia is compact regular collagen with no fat and its list is about what a strong sheet can be shaped into. Answering one question with the other list is the way most marks are lost here, and it is why the two are set out side by side below.
## sections
### Definition
**Fascia** is a collection of connective tissue under the skin. It covers the body wall and the limbs, and it is of **three kinds**: **superficial**, **deep** and **internal**.

**Superficial fascia** is a layer of **loose connective tissue** lying just deep to the skin, allowing the skin to move more or less freely over the underlying structures. It contains a **variable quantity of fat, more in females**: abundant in the **gluteal region, the anterior abdominal wall and the breast**; less in the **limbs**; and **absent in the eyelid, the penis and the scrotum**.

**Deep fascia** is a **non-elastic membrane formed of compact and regular collagen fibres**. Its distribution is uneven and the unevenness is stated as fact to be learnt: it is **well defined in the limbs**, **very strong and thick in the palm and the sole**, and **absent in the face and in the anterior wall of the abdomen**.

**Internal fascia** is named as the third kind and then never described. That is the source's own silence, recorded here rather than filled in.

### Mechanism
The difference between the two layers is a difference of tissue, and every item on both lists follows from it.

Superficial fascia is **loose** connective tissue carrying **fat**. Loose tissue slides, so the skin moves over what lies beneath it. Fat insulates, so heat is kept in. Fat fills, so the surface of the body is smoothed and contoured. Loose tissue is easily traversed, so it is the layer nerves, vessels and lymphatics run through on their way to the skin. And because it is a roomy layer, structures can live in it — the muscles of facial expression, and the mammary gland.

Deep fascia is **compact, regular collagen** and it is **non-elastic**. A sheet that does not stretch can hold things. So the deep fascia is not a layer with functions; it is a material that is shaped into **five different structures**, each of which has a function of its own. That is why the exam question is "parts **and** functions", and why an answer that describes deep fascia as a wrapping has answered one-fifth of it.

The absence of fat from deep fascia and its presence in superficial fascia is also why fluid collects where it does. Oedema accumulates in the loose superficial layer, not in the compact deep one.

### Key determinants
**Six functions of the superficial fascia**, in the department book's own order.

1. **Prevents heat loss** from the body — it acts as a **thermal insulator**.
2. **Softens and smoothens the surface** of the body.
3. **Facilitates the movement of the skin** over the underlying structures.
4. Acts as the **medium conducting the nerves, vessels and lymphatics to the skin**.
5. **Contains skin muscles**, as in the face — the muscles of expression.
6. **Contains special types of glands**, as the **mammary gland**.

Note what is *not* on the list: fat storage. The fat is the material the layer is made of; the functions are what the layer does with it. That distinction is the concept record's own stated pitfall for this leaf and it is worth stating twice.

**Five parts of the deep fascia, each with its function.**

1. **Formation of broad sheets** around groups of body muscles — to **give muscle attachment**, **fix the underlying structures in position**, and **help venous return**.
2. **Formation of intermuscular septa and interosseous membranes** — they **separate different muscle groups having different actions and nerve supply**, and they **increase the surface area for muscle attachment**.
3. **Formation of retinacula** — localised transverse thickened bands around the **wrist and ankle** joints, to **keep the tendons in position**.
4. **Formation of the palmar aponeurosis** in the palm and the **plantar aponeurosis** in the sole — very thick strong layers that **protect the underlying vessels, nerves and tendons**.
5. **Formation of fibrous sheaths around big vessels** — for example the **carotid sheath** in the neck, around the **common carotid artery, the internal jugular vein and the vagus nerve**.

Four of the five are structural specialisations rather than coverings, and a question asking for parts and functions is asking for those four as much as for the first.

The five parts are best learnt with one worked example each, because that is how the papers ask them: broad sheet — the **clavipectoral fascia**, pierced by the cephalic vein, the lateral pectoral nerve, the acromio-thoracic artery and the lymph vessels from the infraclavicular to the apical nodes; septum — the **medial and lateral intermuscular septa of the arm**, pierced by the ulnar and radial nerves respectively; interosseous membrane — the one between **radius and ulna**, which passes force from the radius to the ulna; retinaculum — the **flexor and extensor retinacula** at the wrist; aponeurosis — the **palmar aponeurosis**, into which palmaris longus inserts; vessel sheath — the **carotid sheath** with its three contents.

### Clinical significance
The department book gives four clinical points, and each is a consequence of one of the structural facts above.

**Fascia decides where infection travels.** Knowledge of the arrangement of the deep fascia often explains the path an infection takes when it spreads from its primary site. The book's own example is in the neck, where infection can spread **from the floor of the mouth to the larynx**. The general rule is that a compartment bounded by non-elastic fascia confines pus until the pus finds the plane the fascia leaves open.

**Fluid accumulates in the superficial fascia, and that is oedema.** The loose layer takes the fluid; the compact layer does not.

**The plane of the superficial fascia is the surgical plane for mobilising skin.** Good mobilisation of the skin after an incision occurs at that plane, because it is where the skin is loosely attached to what lies beneath.

**A surgical incision along a skin crease heals with minimal scar.**

Two further consequences follow from the deep fascia's inelasticity and are named in this module's regional chapters rather than in this one. The **carpal tunnel** has a rigid bony floor and an inelastic fascial roof, so a rise of pressure inside it compresses the median nerve. And a **broad sheet around a muscle group helps venous return**, because a contracting muscle inside an unyielding sleeve squeezes the veins within it rather than simply bulging.

### Common misconceptions
**Answering a deep fascia question with the superficial fascia list.** Thermal insulation, smoothing the body contour and conducting nerves to the skin are the superficial layer's functions. Deep fascia insulates nothing; it has no fat.

**Answering a superficial fascia question with "fat storage".** The fat is the material, not the function.

**Treating deep fascia as a single wrapping.** Its examined content is five parts, four of them specialisations, and each carries a function of its own.

**Assuming deep fascia is everywhere.** It is **absent in the face and in the anterior wall of the abdomen**, and its absence in the face is exactly why the muscles of facial expression live in the superficial fascia and insert into skin.

**Assuming superficial fascia always contains fat.** Its fat is variable, more in females, and **absent in the eyelid, penis and scrotum**.

**Calling the internal fascia the deep fascia.** They are named as separate kinds; the book describes only two of the three.
## hold_these
Fascia is connective tissue under the skin covering the body wall and limbs, of three kinds — superficial, deep and internal.
Superficial fascia is loose connective tissue with a variable quantity of fat, more in females.
Its fat is abundant in the gluteal region, anterior abdominal wall and breast, less in the limbs, and absent in the eyelid, penis and scrotum.
The six functions of superficial fascia are thermal insulation, softening and smoothing the body surface, facilitating skin movement, conducting nerves, vessels and lymphatics to the skin, containing skin muscles, and containing special glands such as the mammary gland.
Deep fascia is a non-elastic membrane of compact regular collagen fibres, well defined in the limbs, very strong and thick in palm and sole, and absent in the face and anterior abdominal wall.
The five parts of deep fascia are broad sheets, intermuscular septa and interosseous membranes, retinacula, palmar and plantar aponeuroses, and fibrous sheaths around big vessels.
Broad sheets give muscle attachment, fix underlying structures and help venous return.
Septa and interosseous membranes separate muscle groups of different action and nerve supply and increase the area for attachment.
Retinacula are localised transverse thickened bands at the wrist and ankle that keep the tendons in position.
Palmar and plantar aponeuroses are thick strong layers protecting the underlying vessels, nerves and tendons.
The carotid sheath is deep fascia round the common carotid artery, internal jugular vein and vagus nerve.
Infection spreads along fascial planes; the book's example is the floor of the mouth to the larynx.
Oedema accumulates in the superficial fascia; skin is mobilised surgically at that plane.
## lose_the_mark
Answering "parts and functions of deep fascia" with insulation and body contour. Those are superficial fascia's functions, and the two lists are the whole of this leaf.
Giving fat storage as a function of superficial fascia. The fat is the material; the six functions are what the layer does with it.
Describing deep fascia only as a wrapping. Four of its five parts are structural specialisations, and the marks are on those.
Saying deep fascia is thick in the anterior abdominal wall. It is absent there, and absent in the face.
Giving five functions of superficial fascia or six parts of deep fascia. The counts are six and five; a list of the wrong length loses the last item before it is read.
Calling an aponeurosis a separate kind of fascia. It is one of the five things deep fascia forms.
Listing the carotid sheath's contents as two. It has three: the common carotid artery, the internal jugular vein and the vagus nerve.
Forgetting that the fat of the superficial fascia is absent in the eyelid, penis and scrotum. That absence is asked directly.
## image_recommendations
### comparison table · Superficial fascia against deep fascia in two columns — nature, distribution, fat content, what it forms, and its functions — with the six-item and five-item lists set side by side and the counts printed at the head of each
Purpose: The whole leaf is two lists that students merge. Printing them side by side with their counts is the single most effective correction available, and it is a layout rather than a paragraph.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF pages 112-113 and Dr. Galal's revision page 62
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Serves both concepts on this leaf — CON-MSK-2145D2D62EC401 ("List the functions of the superficial fascia", 5 marks) and CON-MSK-6CD9FFF51AE9CD ("Explain different parts and function of Deep fascia", 5 marks).
### diagram · The five parts of deep fascia on one plate, one panel each — a limb cross-section with the encircling broad sheet and its intermuscular septa reaching bone, a radius and ulna with the interosseous membrane between them, a wrist with the retinaculum holding tendons down, a palm with the palmar aponeurosis, and a neck cross-section with the carotid sheath and its three contents labelled
Purpose: The classification is by what the sheet is shaped into, and five shapes are five pictures. Five sentences produce answers of length four.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF page 113
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Fulfils concept CON-MSK-6CD9FFF51AE9CD.
### diagram · Transverse section through a limb showing skin, superficial fascia carrying fat with a cutaneous nerve and vein crossing it, deep fascia as a distinct encircling line with no fat in it, intermuscular septa running from its deep surface to bone, and the muscle compartments each septum creates tinted separately
Purpose: Every functional difference between the two layers is a difference of tissue visible in one section — loose and fatty above, compact and fat-free below. The section makes the two lists derivable instead of memorable.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book PDF pages 112-113
Rights: newly drawn for this product, or CC-BY / public domain
Notes: Serves concept CON-MSK-2145D2D62EC401.
## conflicts
Order of the superficial fascia functions. The department book gives thermal insulation first, then softening and smoothing, then skin movement; Dr. Galal's table gives softening and smoothing first, then skin movement, then heat loss. The content is identical and order is not marked; the book's order is used.
Coverage overlap with ART-101-ANA-DEEP-FASCIA. That article, in 101-ISK-anatomy.md, teaches the same leaf and claims the deep fascia concept CON-MSK-6CD9FFF51AE9CD. This article claims both concepts on the leaf, because the superficial fascia concept CON-MSK-2145D2D62EC401 was not claimed by any article before it, and because the department asks the two lists against each other. The overlap is deliberate and is recorded so a reviewer can decide whether to merge the two articles or keep the deep-fascia one as the long-form treatment.
## resource_ids
src_b1e6dc481eaf337268d0

## claim_ids
CLM-C13EB37B0B03

## span_ids
SPN-ANA-FASCIA-01

## evidence_gaps
Neither source describes the internal fascia, although both name it as one of the three kinds. A student asked to contrast deep with internal fascia has nothing in the department text to answer from. This is the same gap the concept record CON-MSK-6CD9FFF51AE9CD already carries, restated here because it belongs to the article too.
Neither source defines aponeurosis, tendon or synovial sheath, although the muscular-system chapter's own stated learning outcome promises to define all three.
Neither source states why a broad sheet of deep fascia helps venous return; the function is asserted and not explained. The sentence here about a contracting muscle inside an unyielding sleeve is general anatomical reasoning and is named in field_notes.
The department book's Fascia chapter gives no account of fascial spaces or of the named fascial planes of the limbs, although the question books ask the mid-palmar space and the suspensory ligament of the axilla under this leaf. Those are taught in the regional chapters instead, and a student revising this chapter alone would not meet them.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Basis of Anatomy Chapter 2 "Fascia", PDF pages 112-114 — the three kinds of fascia; structure and six functions of superficial fascia; structure, distribution, five parts and their functions for deep fascia; the four clinical points.
Dr. Galal final revision (src_fc7ea5960363431009ed), page 62 — "Fascia" table, "Q. Functions" for both layers, giving the same six and five items.
scripts/kasr/extract/mcq-bank.json, leaf "Fascia" — 38 distinct question stems, of which the terminology and list items were used to shape the article and the regional retinaculum items were left to the forearm article.
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Mechanism: The explanation of why each item on the superficial fascia list follows from the tissue being loose and fatty is reasoning added here to make the list learnable. The book states the functions without deriving them.
sections.Clinical significance: The two closing paragraphs — the carpal tunnel as an inelastic roof over a rigid floor, and the muscle-pump account of venous return — draw on statements made in this module's regional chapters and on general anatomical reasoning. The Fascia chapter itself makes neither connection.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
## notes
This leaf already has an article in 101-ISK-anatomy.md — ART-101-ANA-DEEP-FASCIA — which teaches the deep half in more depth. This one exists because the leaf's second concept, the superficial fascia's six functions, had no article claiming it, and because the department asks the two lists as a contrast. The overlap is recorded in conflicts for a reviewer to resolve.

---

# Item
## id
ART-101-ANA-SKELETAL-SYSTEM
## title
The skeletal system: bone and cartilage
## subject
msk
## status
Draft
## owner
Claude
## topic
Basis of anatomy
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
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
101 ISK > Anatomy > Basis of Anatomy > Skeletal system
## primary_node_id
DIS-ANA-T01
## secondary_node_ids
SYS-MSK-T05
SYS-MSK-T01-S03-M01
## related_concepts
CON-MSK-00B4A0D32A6420 | CON-MSK-2C78EFB16CA67F | CON-MSK-40012FE18569EC | CON-MSK-6DCABD3AE947F5 | CON-MSK-9A22BB8909AF29 | CON-MSK-AEB62E99182AEE | CON-MSK-C30E73A5353ABB | CON-MSK-EFD497A9922A4D

## related_articles
ART-101-ANA-CARTILAGINOUS-JOINTS: The epiphyseal plate is a joint as well as a growth plate, and the classification of joints that follows from the cartilage types is set out there.
ART-101-ANA-MUSCLE-ATTACHMENTS: Why a tendinous attachment raises a tubercle and a fleshy one does not — the reason the external features of bone are worth naming.
ART-101-ANA-INTRODUCTION: The vocabulary of position that the terms for bony elevations and depressions are written in.
## aliases
Skeletal system | Bones | Classification of bones | Long bones | Growth of long bones | Arterial supply of bones | Cartilage | Hyaline cartilage | White fibrocartilage | Yellow elastic fibrocartilage
## reading_time
14
## summary
Three closed lists carry this leaf and each is asked as a separate five-mark question: eight functions of the skeleton, three ways of classifying bones — by position, by ossification, by shape — and four arteries of a long bone. The growth of a long bone is the thread that ties them together, because length comes from the epiphyseal plate, width comes from the periosteum, and the nutrient artery runs away from the growing end. Cartilage is a fourth list of three types, and the type is what a joint is named from.
## sections
### Definition
**Bone** is a hard type of connective tissue which forms the **skeleton**. The department book opens with what the skeleton is for, and gives **eight functions**.

1. Gives the **specific shape** to the body.
2. Provides the **central axis** of the body, and the skeleton of both upper and lower limbs.
3. **Protects the vital organs** — the skull protects the brain, the thoracic cage protects the heart and lungs.
4. Provides **surface area for muscular attachment**.
5. **Transmits and supports the body weight** — the vertebral column carries the weight of the head and trunk to the bony pelvis, then through the lower limb bones to the feet and to the ground.
6. **Forms the joints**, making an important part of the locomotor system.
7. **Forms the blood elements** in the bone marrow.
8. **Stores calcium salts**.

**Cartilage** is a rubbery type of connective tissue, tough and resilient, with **no blood vessels, nerves or lymphatics**, taking its nutrition **by diffusion from the vessels of the perichondrium**. It consists of mature cartilage cells (**chondrocytes**), fibres and matrix. It **resists compression forces and friction**, and has a **great capacity of growth by multiplication of the chondroblasts**, the immature cartilage cells.

That avascularity is the whole of cartilage's clinical character: a tissue fed by diffusion heals slowly and grows by cell division rather than by deposition on a surface.

### Mechanism
**How a long bone grows** is the mechanism that organises the rest of the chapter, and it has two independent halves.

**Growth in length** comes from the **epiphyseal plate**, a plate of **hyaline cartilage** lying between the epiphysis and the diaphysis, growing the bone by **proliferation of its cells**. When the bone becomes mature the plate stops dividing and **ossifies**, fusing epiphysis to diaphysis. Fusion is **under hormonal control** and occurs in **females about two years earlier** than in males. The plate at one end ossifies **two to three years earlier** than the plate at the other; the end that ossifies **last** is the **growing end**.

**Growth in width** comes from the **periosteum**, the fibrous sheath around the shaft. Its **outer layer** is white fibrous tissue; its **inner layer** contains **osteoblasts** and is highly vascular. The osteoblasts of that inner layer lay bone down on the outside of the shaft, so the bone thickens.

Two different tissues, two different mechanisms, two different directions — and a question that asks "how does a long bone grow" is asking for both.

**How a long bone is supplied** follows the same geometry, and there are **four** arteries.

*Nutrient artery* — enters the middle of the shaft through an **oblique nutrient foramen** and **runs away from the growing end**. It reaches the medullary cavity and divides into ascending and descending branches, and it supplies the **inner two-thirds of the shaft** and the bone marrow.
*Metaphyseal arteries* — enter through minute foramina to supply the **metaphysis**, anastomosing with the nutrient artery and, **after ossification of the epiphyseal plate**, with the epiphyseal arteries.
*Epiphyseal arteries* — many small arteries to the **epiphysis**, anastomosing with the metaphyseal arteries **after** the plate ossifies.
*Periosteal arteries* — arise from the deep layer of the periosteum and supply the **outer third of the shaft**.

The two-thirds and one-third split, and the fact that epiphyseal and metaphyseal circulations do not communicate until the plate has gone, are the parts of this list that are examined.

### Key determinants
**Classification of the skeleton** is asked three ways, and the three ways are independent of each other.

**[I] By position in the body.** The **axial skeleton** is the skull, mandible, hyoid, sternum, ribs and vertebral column. The **appendicular (peripheral) skeleton** is the bones of the upper and lower limbs.

**[II] By process of ossification.** **Intra-membranous ossification** — the bone develops directly from a connective tissue membrane (mesenchyme), beginning at one or more centres of ossification; examples are the **clavicle and the skull cap**. **Intra-cartilaginous ossification** — the mesenchyme first becomes a cartilage model, and the cartilage is then replaced by bone; examples are the **long bones, vertebrae, ribs and the base of the skull**.

**[III] By shape**, six types.

**Long bones** — in the upper and lower limbs. Two ends (**epiphyses**) and a shaft (**diaphysis**). The epiphysis is the expanded end, used for articulation and covered with a layer of **hyaline** articular cartilage. The diaphysis is a **tube of compact bone** with a central **medullary cavity** lined with **endosteum** and filled with **bone marrow**, covered by **periosteum**. In a growing bone the epiphysis and diaphysis are separated by the **epiphyseal cartilage**. The **metaphysis** lies just beneath the epiphyseal cartilage and is the **most active part** of the bone.

**Short bones** — carpal and tarsal bones. **Spongy bone covered with a thin layer of compact bone.**

**Flat bones** — the skull cap, the scapula and the ribs. **Two thin plates of compact bone with a middle layer of spongy bone**; in the skull the plates are the **outer and inner tables** and the spongy layer between them is the **diploe**.

**Pneumatic bones** — bones containing air, mainly the skull bones around the nose (maxillary, frontal), whose air cavities are the **paranasal sinuses**. Structure: one air cavity, as the maxillary sinus, or multiple small air cells, as the mastoid air cells. **Three functions: they decrease the weight of the skull, they give resonance to the voice, and their highly vascular mucosa warms the inspired air.**

**Irregular bones** — bones of irregular shape with projecting processes, such as the vertebrae. **Similar in structure to the short bones.**

**Sesamoid bones** — small nodules of bone embedded in some muscle tendons; the **patella** is the largest, embedded in the tendon of quadriceps femoris in front of the knee. Function: they **diminish friction between tendons and the underlying bones**.

**Terms of external features** are the vocabulary a dry bone is described in, and they are asked as definitions.

*Elevations.* **Process** — an elongated projection with a **blunt** end. **Spine** — an elongated projection with a **pointed** tip. **Tubercle, tuberosity and trochanter** — localised roughly rounded elevations, the **tubercle smallest, the trochanter biggest, the tuberosity medium**. **Epicondyle** — a small elevation **above a condyle or articular surface**. **Hamulus** — a slender curved process resembling a **hook**. **Cornu** — a slender curved process resembling a **horn**. **Crest** — an elongated ridge usually on the top of a bone. **Ridge** — a linear elevation. **Line** — a slightly elevated or merely rough linear landmark. **Condyle** — a knuckle-shaped structure.

*Depressions, grooves and canals.* **Fossa** — a depression on a surface; a **fovea** is a small fossa. **Notch** — a depression of limited size on a surface or border, with two limiting edges. **Incisura** — a cut or notch-like depression on a border. **Groove (sulcus)** — an elongated depression. **Fissure** — a long cleft between flat bones. **Hiatus** — a gap or cleft. **Foramen** — a hole through a bone. **Aperture** — a large hole. **Canal** — a track of some length with **open ends**. **Meatus** — a bony canal with **one closed end**. **Impression** — a slight indentation.

**Sex differences in bones** are given as three.

1. **Characters of bones** — male bones are heavy and thick, female bones light and thin.
2. **Muscle attachment** — tubercles, tuberosities and ridges are more prominent in male bones.
3. **The bony pelvis** — the cavity is **wider and shorter in the female**, adapted to pregnancy and delivery.

**Three types of cartilage**, distinguished by matrix, cell number, site, and whether they ossify in old age.

**Hyaline cartilage** (glass-like). The most widespread in the body. **Matrix translucent**; **cells numerous, small and rounded**. Sites: the **developing bones in the fetus**; the **epiphyseal plates**; the **articular cartilage** of joints; the **costal cartilages and xiphoid process**; the **larynx except the epiglottis**, and the tracheal rings. **Ossifies in old age** at certain sites — the larynx and the epiphyseal cartilages.

**White fibrocartilage.** **Matrix opaque**, because it is rich in collagen bundles; **cells few in number**. Site: the **intervertebral discs**. **Does not ossify** in old age.

**Yellow elastic fibrocartilage.** **Matrix yellow**, rich in yellow elastic fibres; **cells abundant**. Sites: the **tip of the nose**, the **auricle of the ear**, the **epiglottis**. **Does not ossify** in old age.

Hold the three by matrix and by ossification, because those are the two columns that separate them cleanly: translucent and ossifying, opaque and permanent, yellow and permanent.

### Clinical significance
**The growing end and the nutrient foramen.** Because the nutrient artery runs **away from** the growing end, the direction of the oblique nutrient foramen on a dry bone tells you which end grew longest. It is a reading exercise, and it is asked as one.

**The epiphyseal plate is a plane of weakness in a child.** A plate of hyaline cartilage crosses the whole width of a growing bone. That plane does not exist in an adult, which is why the pattern of injury at the end of a long bone differs between the two. The department book does not describe epiphyseal injury, and none is described here.

**Why the metaphysis is the most active part.** It lies immediately beneath the epiphyseal plate, where the new bone is being made, and it is where the metaphyseal arteries enter. Activity and blood supply coincide.

**Why an epiphysis can lose its blood supply.** Epiphyseal and metaphyseal arteries do not anastomose until the plate has ossified. Before that, an epiphysis has its own arteries and no collateral from the shaft. The department book states the timing of the anastomosis; it does not draw the clinical consequence, which is noted here as reasoning rather than as the book's teaching.

**Why cartilage heals badly.** It has no blood vessels, nerves or lymphatics and is fed by diffusion from the perichondrium. The book states the avascularity; the consequence for repair is not in the text.

**Why the pelvis is the bone that sexes a skeleton.** The three sex differences the book gives are size, muscle marking and pelvic shape, and only the third is a difference of function rather than of degree.

**Why paranasal sinuses matter.** They lighten the skull, give resonance and warm inspired air. Their mucosa is continuous with that of the nose, which is why nasal infection reaches them — a connection the module's own text does not make, and which is left unasserted here.

### Common misconceptions
**"Long" does not mean long.** A long bone is defined by having two epiphyses and a diaphysis, not by its length. The **clavicle** is a long bone, and so are the metacarpals and phalanges.

**The clavicle is a long bone that ossifies in membrane.** The two classifications are independent, and this is the standing example that proves it: shape says long, ossification says intra-membranous. Reading one classification off the other is the commonest error on this leaf.

**Irregular bones are not a structural type of their own.** They are similar in structure to the short bones — spongy bone with a thin compact covering.

**Growth in length and growth in width are not the same process.** Length is the epiphyseal plate, a cartilage; width is the periosteum, a fibrous sheath with osteoblasts. Answering "the epiphyseal plate" to a question about growth in width loses the whole item.

**Hyaline is not only articular cartilage.** It is the most widespread type and appears in the fetal skeleton, the growth plates, the costal cartilages and most of the larynx as well as on joint surfaces.

**Not all cartilage ossifies with age.** Only hyaline does, and only in certain sites; white fibrocartilage and yellow elastic fibrocartilage do not.
## hold_these
The eight functions of the skeleton: shape, central axis, protection of viscera, muscle attachment, transmission of weight, formation of joints, formation of blood elements, storage of calcium salts.
Axial skeleton: skull, mandible, hyoid, sternum, ribs, vertebral column. Appendicular: the bones of the two limbs.
Intra-membranous ossification is direct from connective tissue membrane — clavicle and skull cap. Intra-cartilaginous ossification passes through a cartilage model — long bones, vertebrae, ribs, base of skull.
Six shapes of bone: long, short, flat, pneumatic, irregular, sesamoid.
A long bone has two epiphyses and a diaphysis; the metaphysis lies just below the epiphyseal cartilage and is the most active part.
Short bones are spongy bone with a thin compact covering; irregular bones are built the same way.
Flat bones are two plates of compact bone with spongy bone between; in the skull the plates are the tables and the spongy layer is the diploe.
Pneumatic bones decrease the weight of the skull, give resonance to the voice, and warm inspired air.
The patella is the largest sesamoid bone, in the tendon of quadriceps femoris; sesamoid bones diminish friction between tendon and bone.
A long bone grows in length from the epiphyseal plate of hyaline cartilage and in width from the osteoblasts of the inner layer of the periosteum.
Epiphyseal fusion is under hormonal control and happens about two years earlier in females; the end that ossifies last is the growing end.
The nutrient artery enters through an oblique foramen, runs away from the growing end, and supplies the inner two-thirds of the shaft; periosteal arteries supply the outer third.
Epiphyseal and metaphyseal arteries anastomose only after the epiphyseal plate has ossified.
Cartilage has no blood vessels, nerves or lymphatics and is nourished by diffusion from the perichondrium.
Hyaline cartilage has a translucent matrix and numerous small rounded cells, is the most widespread type, and ossifies in old age in the larynx and epiphyseal cartilages.
White fibrocartilage has an opaque matrix rich in collagen and few cells, is found in the intervertebral discs, and does not ossify.
Yellow elastic fibrocartilage has a yellow matrix rich in elastic fibres and abundant cells, is found in the tip of the nose, auricle and epiglottis, and does not ossify.
## lose_the_mark
Reading one classification of bone off another. The clavicle is a long bone that ossifies in membrane; shape and ossification are independent lists.
Calling the clavicle a short bone because it is short. A long bone is defined by two epiphyses and a diaphysis, not by length.
Answering "epiphyseal plate" for growth in width. Width comes from the periosteum's osteoblasts; the plate does length.
Giving the nutrient artery the outer third of the shaft. It supplies the inner two-thirds; the periosteal arteries supply the outer third.
Saying the nutrient foramen points towards the growing end. It runs away from it, which is how the growing end is identified on a dry bone.
Naming articular cartilage as the only site of hyaline cartilage. It is also the fetal skeleton, the epiphyseal plates, the costal cartilages and most of the larynx.
Saying cartilage ossifies in old age without qualification. Only hyaline does, and only at certain sites.
Giving the intervertebral disc as elastic cartilage. It is white fibrocartilage — opaque matrix, few cells, no ossification.
Listing seven functions of the skeleton. The book gives eight, and blood formation and calcium storage are the two most often dropped.
Giving pneumatic bones two functions. There are three: weight, resonance, and warming inspired air.
Describing the metaphysis as part of the epiphysis. It lies in the upper and lower parts of the diaphysis, just beneath the epiphyseal cartilage.
## image_recommendations
### diagram · Coronal section of a growing long bone with epiphysis, epiphyseal plate, metaphysis, diaphysis, medullary cavity, endosteum and periosteum labelled, drawn beside the same bone after fusion so the plate has become a line, with growth in length arrowed at the plate and growth in width arrowed at the periosteum
Purpose: Growth is two mechanisms in two places and one drawing carries both arrows. The before-and-after pairing is also what makes the word "temporary" mean something.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book PDF pages 116-118 and Dr. Galal's revision pages 64 and 66
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
### diagram · The four arteries of a long bone on one longitudinal section — nutrient artery entering obliquely through the mid-shaft and running away from the growing end, metaphyseal arteries at both metaphyses, epiphyseal arteries in both epiphyses, periosteal arteries entering the outer third — with the inner two-thirds and outer third of the shaft tinted differently and the epiphyseal plate drawn as a barrier between the epiphyseal and metaphyseal circulations
Purpose: The examined content is a set of territories and one barrier, and the barrier is the reason the anastomosis waits for ossification. A drawing states it; a list of four arteries does not.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book PDF page 118 and Dr. Galal's revision page 66
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · The six shapes of bone as six panels with a named example in each — long bone sectioned, carpal short bone, skull cap flat bone showing outer and inner tables with diploe, maxilla as a pneumatic bone with its sinus, vertebra as an irregular bone, patella in the quadriceps tendon
Purpose: A six-item classification with a structural description each is a set of pictures pretending to be a list, and the panels also stop irregular and short bones being read as different in structure when the book says they are the same.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF pages 116-118 and Dr. Galal's revision page 64
Rights: newly drawn for this product, or CC-BY / public domain
### comparison table · The three cartilages in three columns — matrix, cell number, sites, ossification in old age — with a small histological sketch of each matrix at the head of its column
Purpose: The three are told apart on two columns only, matrix and ossification, and printing all four rows side by side is what stops the sites being attached to the wrong type.
Priority: required
Status: needed
Kind: comparison table
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF pages 120-121
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · A plate of named bony features on one or two dry bones — process, spine, tubercle, tuberosity, trochanter, epicondyle, hamulus, cornu, crest, ridge, line, condyle, fossa, fovea, notch, groove, fissure, hiatus, foramen, aperture, canal, meatus, impression — each labelled where it actually occurs
Purpose: These are definitions of shapes, and shapes are learnt by being pointed at. Twenty-three prose definitions are unusable; twenty-three labels on real bone are a single revision page.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF page 119
Rights: newly drawn for this product, or CC-BY / public domain
## conflicts
Whether the cartilage model dissolves. The department book says the mesenchyme "is changed at first into a cartilage model, and then the cartilage is changed into bone"; Dr. Galal says the cartilage "dissolves & disappears to be replaced by bones". These describe the same process with different emphasis, and the book's wording is used.
Where the metaphysis lies. The department book says it "lies in the upper and lower parts of the long bone just beneath the epiphyseal cartilage"; Dr. Galal says "upper & lower parts of diaphysis just below epiphyseal cartilage". Dr. Galal's is the more precise of the two and is followed, because "part of the long bone" would allow a student to place it in the epiphysis.
Functions of the skeleton, counted. The department book gives eight lettered functions; Dr. Galal compresses them into five numbered ones by pairing joints with muscle attachment and blood formation with calcium storage. The book's eight are taught, because a five-mark question marked against eight items rewards the longer list.
## resource_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## evidence_gaps
Neither source distinguishes red from yellow bone marrow, or says where each is found in the adult, although the question books ask that distinction repeatedly on this leaf — which bones hold red marrow in an adult, and what yellow marrow does under stress. The department book says only that the medullary cavity is "filled with bone marrow (soft vascular tissue)". A student revising this chapter has nothing to answer those items with.
Neither source describes the microscopic structure of bone — osteon, lamella, canaliculus, osteocyte, osteoclast — anywhere in the Anatomy part. The histology part of the same book covers connective tissue but the two are not cross-referenced.
Neither source describes epiphyseal injury, fracture healing or any bone disease, although the question books carry clinical stems on this leaf.
The department book states that epiphyseal and metaphyseal arteries anastomose only after the plate ossifies but draws no consequence from it. The clinical paragraph here reasons from the statement and is named in field_notes.
No concept whose module_subject is "101 ISK > Anatomy > Basis of Anatomy > Skeletal system" exists yet in either concept batch, although the question books carry 101 distinct stems on this leaf — the largest count of any Basis leaf. related_concepts is empty for that reason.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Basis of Anatomy Chapter 3 "Skeletal system", PDF pages 115-121 — functions of the skeleton; classification by position, by ossification and by shape with six types; growth of bones in length and width; arterial supply of bones; terms of external features; sex differences; properties and three types of cartilage.
Dr. Galal final revision (src_fc7ea5960363431009ed), pages 62, 64 and 66 — "Q. Functions" of bone, "Q. Classification", the six-shape comparison table, "Q. Growth of long bones", "Q. Arterial supply of long bones".
scripts/kasr/extract/mcq-bank.json, leaf "Skeletal system" — 101 distinct question stems, read for what the examiners ask; the marrow items are what surfaced the gap recorded in evidence_gaps.
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
relatedConceptIds: No concept whose module_subject is this leaf exists yet in either concept batch. The field is left empty rather than filled from the Articular system leaf next door, whose concepts belong to a different article, and the gap is named in evidence_gaps.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
sections.Clinical significance: Four paragraphs reason beyond the text — the epiphyseal plate as a plane of weakness, the epiphysis without collateral supply before ossification, the poor healing of an avascular cartilage, and the continuity of sinus mucosa with the nose. Each states a consequence of something the book asserts; the book itself draws none of them.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
## notes
This leaf carries 101 question-book stems and no concept. The article is written to the book's own three classifications and four-artery list, because those are what the five-mark written questions ask, and the marrow gap is recorded because it is the single most-asked thing on the leaf that the faculty's own chapter never teaches.

---

# Item
## id
ART-101-ANA-CARDIOVASCULAR-SYSTEM
## title
The cardiovascular system
## subject
cvs
## status
Draft
## owner
Claude
## topic
Basis of anatomy
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
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
101 ISK > Anatomy > Basis of Anatomy > Cardiovascular system
## primary_node_id
DIS-ANA-T01
## secondary_node_ids
SYS-CVS-T01-S01
SYS-CVS-T01-S02-M02
## related_articles
ART-101-ANA-ELBOW-JOINT: The anastomosis around the elbow is the department book's own worked example of anastomosis by terminal arterioles.
ART-101-ANA-SHOULDER-REGION: The anastomosis around the scapula, the collateral route that keeps the limb alive when the axillary artery is blocked.
ART-101-ANA-VEINS-OF-UPPER-LIMB: The superficial and deep veins of a limb, and the venae comitantes this chapter's principles describe in general.
## related_concepts
CON-MSK-655D74FEE1515A | CON-MSK-A12FB50E90A64B

## aliases
Cardiovascular system | Heart | Blood circulation | Systemic circulation | Pulmonary circulation | Portal circulation | Arterial anastomosis | End arteries | Venous return | Arteriovenous shunt
## reading_time
13
## summary
This chapter is the general principle behind every named vessel in the module. Three circulations, three kinds of arterial anastomosis, one list of end arteries where anastomosis fails, and one list of the forces that push venous blood back to the heart. The examined heart of it is a single distinction: an anastomosis opens when the main artery closes **gradually** and does not open when it closes **suddenly** — which is why a slow block leaves a limb alive and a faulty ligature kills it.
## sections
### Definition
The **cardiovascular system** consists of the **heart** and the **blood vessels**.

**The heart** lies **behind the sternum and costal cartilages**, extending from the **second to the sixth costal cartilages**. About **two-thirds of it lies to the left** and **one-third to the right** of the median plane. It is covered by two kinds of pericardial sac, **fibrous and serous**.

It has **four chambers**, two atria and two ventricles, and the sequence through them is the whole of the systemic and pulmonary circulations.

*Right atrium* — receives **deoxygenated** blood from all parts of the body by the **superior and inferior venae cavae**, and passes it to the right ventricle through the **tricuspid valve**.
*Right ventricle* — sends deoxygenated blood through the **pulmonary valve** to the **pulmonary trunk**, which divides into right and left pulmonary arteries, one for each lung, where the blood is oxygenated.
*Left atrium* — receives **oxygenated** blood from both lungs through **four pulmonary veins** and pumps it to the left ventricle through the **mitral valve**.
*Left ventricle* — pumps oxygenated blood to all parts of the body through the **aortic valve** into the aorta and its branches.

The rule that follows is stated separately because it is asked separately: **the right half of the heart contains deoxygenated (venous) blood and the left half contains oxygenated (arterial) blood.**

**Arteries** are the vessels which carry blood **from the heart** to other regions of the body. They carry oxygenated blood **except the pulmonary and umbilical arteries**, which carry deoxygenated blood. They are classified by size and structure into **large, medium-sized and small** arteries.

### Mechanism
**Three circulations** are named, and each is a closed loop described by where the exchange happens.

**Systemic circulation.** Oxygenated blood in the **left ventricle** passes through the aorta and its branches to all the tissues, where exchange of gases and materials occurs. Deoxygenated blood is collected by small veins, then large veins, and finally by the **superior and inferior venae cavae** into the **right atrium**, and passes to the right ventricle, where this circulation ends and a new cycle starts.

**Pulmonary circulation.** Deoxygenated blood from the **right ventricle** passes through the pulmonary artery and its two branches to both lungs, where exchange of gases occurs. Oxygenated blood returns to the **left atrium** by the **four pulmonary veins**, then to the left ventricle.

**Portal circulation.** Venous blood from the **stomach, spleen, pancreas and intestine** is collected into the **portal vein**, which enters the liver **through the porta hepatis** and divides into many branches ending in **liver sinusoids**. Blood leaves the sinusoids by the **hepatic veins**, which end in the **inferior vena cava**. The purpose of the detour is stated: to **metabolise undigested nutrients and to detoxify the blood**.

A portal circulation is therefore a venous system that begins in capillaries and ends in capillaries, and this is the one the module names.

**Arterio-venous connections.** Arteries and veins are connected by one of three structures.

**Capillaries** — narrow, of uniform diameter.
**Sinusoids** — wide, of irregular diameter, with dilatations and constrictions.
**Arteriovenous shunts** — direct connections between small arteries and the accompanying veins.

The **arteriovenous shunt (anastomosis)** is asked in its own right. Its **sites** are the **external ear, the nail bed and the palmar aspects of the digits; the tongue; the thyroid gland; the penis; and the alimentary tract**. Its **characters** are that it is straight or coiled, surrounded by a **thick muscular coat**, and supplied by **sympathetic fibres** which control its opening and closure. Its **functions** are the **regulation of body temperature and local heat** — when it opens, blood passes from artery to vein, decreasing the local heat — the **regulation of food absorption**, and a role in **erection**.

### Key determinants
**Arterial anastomosis** is the connection between arteries, present **mainly around the joints**. Its **three functions** are given as a list.

1. It **increases the blood supply** to some organs, for example the stomach.
2. It **equalises pressure** in the communicating arteries.
3. It **maintains blood flow** to a part if its main artery is obstructed.

**Three types of arterial anastomosis** are named, each with its own example.

**End-to-end anastomosis** — the two ends of two arteries are connected together forming an **arch**. Examples: the anastomoses in the **hand and foot**, between the **gastric arteries**, between the **arteries of the gut**, and between the **anterior and posterior intercostal arteries**.

**Anastomosis by terminal arterioles** — it lies **around the joints**, between the branches of the main artery **above** the joint and its branches **below** it. In case of **gradual obstruction** it will open to maintain the blood supply below the obstruction. Example: the **anastomosis around the elbow joint**.

**Anastomosis by conversion** — two arteries **converge and unite** together. Example: the two **vertebral arteries**.

**End arteries** are arteries which **do not anastomose** with adjacent arteries, and their obstruction leads to **necrosis** of the tissue they supply. The book's list is five: the **central retinal artery** to the retina; the **renal artery** to the kidney; the **splenic artery** to the spleen; the **central branches of the cerebral arteries**; and the **pulmonary arteries**.

**Factors helping venous return** are given by region, and the division is part of the answer.

**From the upper part of the body**, venous blood is drained mainly by **gravity**.

**From the lower limb**, five factors: **venous valves**; **arterial pulsations**; **muscular contractions (the muscle pump)**; the **deep fascia surrounding the muscle groups**; and **negative intrathoracic pressure**, drawing blood from the abdomen, head and neck into the thorax.

**From the abdomen, pelvis and thorax**, venous return is by the **suction mechanism of negative intrathoracic pressure**.

The deep fascia's appearance on that list is worth pausing on, because it ties this chapter to the fascia chapter: a muscle contracting inside a non-elastic sleeve squeezes the veins within it, and that is why the deep fascia is a factor in venous return rather than merely a covering.

### Clinical significance
**Why a joint can be bent without cutting off the limb.** All large arteries crossing a joint are liable to be **kinked** during movement, but distal flow is not interrupted, because an adequate anastomosis is usually present between branches arising **proximal and distal** to the joint.

**Why a faulty ligature kills a limb and a slow block does not.** **Sudden closure** of the main artery proximal to an anastomosis — as in faulty ligation — leads to the **death of the part distal to it, because the anastomosis does not open in sudden closure**. Gradual obstruction gives the terminal arterioles time to open. This single contrast is the most examinable sentence in the chapter and the reason the anastomoses around the scapula and around the elbow are taught at all.

**Why an end artery is different in kind.** It has no neighbour to open. Obstruction of the central retinal artery, the renal artery, the splenic artery, a central branch of a cerebral artery, or a pulmonary artery kills the territory outright, whatever the speed of the block.

**Varicose veins.** A varicosed vein is one that has a **larger diameter than normal** and is **elongated and tortuous**. Causes named: **hereditary weakness of the vein walls**, **incompetent valves**, and **elevated intra-abdominal pressure** from multiple pregnancies or abdominal tumours. As a result of high pressure, **venous blood escapes from the deep to the superficial veins** and produces the varicosity. They occur commonly in the **lower limb**.

**Stagnation and thrombosis.** Stagnation of blood in varicose veins may cause **thrombosis**, for example **deep venous thrombosis in the calf muscles**.

**Why the arteriovenous shunt is a thermoregulator.** It is surrounded by a thick muscular coat under sympathetic control, and it sits in the ear, the nail bed, the pulp of the fingers and the tongue — the surfaces where heat is lost. Opening it short-circuits blood past the capillary bed and drops the local temperature.

### Common misconceptions
**Not all arteries carry oxygenated blood.** The **pulmonary and umbilical arteries** carry deoxygenated blood. An artery is defined by direction — away from the heart — not by content.

**The three types of anastomosis are not three names for one thing.** End-to-end forms an arch, terminal-arteriole anastomosis lies around a joint and opens on gradual obstruction, and anastomosis by conversion is two vessels becoming one. The example fixes the type.

**An anastomosis is not a guarantee.** It opens on gradual obstruction, not on sudden closure, and the exam question is usually about the sudden case.

**A portal circulation is not "the circulation of the portal vein" only.** It is a venous system that starts and ends in capillaries; the hepatic portal system is the example this module names.

**Venous return from the upper part of the body is not the muscle pump.** The book gives **gravity** for the upper part and reserves the five-factor list for the lower limb.

**The spleen's artery is an end artery.** Students who have learned that the spleen has a rich blood supply are surprised by it; the book lists it with the retina and the kidney.
## hold_these
The heart lies behind the sternum and costal cartilages from the second to the sixth costal cartilage, two-thirds to the left of the median plane and one-third to the right.
The right half of the heart carries deoxygenated blood and the left half oxygenated blood.
Right atrium to right ventricle through the tricuspid valve; right ventricle to pulmonary trunk through the pulmonary valve; left atrium to left ventricle through the mitral valve; left ventricle to aorta through the aortic valve.
The left atrium receives four pulmonary veins.
Arteries carry blood away from the heart and carry oxygenated blood except the pulmonary and umbilical arteries.
The three circulations are systemic, pulmonary and portal; the portal circulation carries blood from stomach, spleen, pancreas and intestine to the liver through the porta hepatis and out by the hepatic veins to the inferior vena cava.
Arterial anastomosis increases blood supply, equalises pressure, and maintains flow past an obstruction.
Three types of arterial anastomosis: end to end forming an arch, by terminal arterioles around a joint, and by conversion where two arteries unite.
The anastomosis around the elbow joint is the example of anastomosis by terminal arterioles; the two vertebral arteries are the example of anastomosis by conversion.
An anastomosis opens on gradual obstruction and does not open on sudden closure, which is why faulty ligation kills the part distal to it.
End arteries: central retinal, renal, splenic, central branches of cerebral arteries, and the pulmonary arteries.
Venous return from the upper body is mainly by gravity.
Venous return from the lower limb is by venous valves, arterial pulsations, muscular contraction, deep fascia around the muscle groups, and negative intrathoracic pressure.
Arteries and veins are connected by capillaries, sinusoids or arteriovenous shunts.
Arteriovenous shunts lie in the external ear, nail bed and palmar aspects of the digits, tongue, thyroid, penis and alimentary tract, have a thick muscular coat under sympathetic control, and regulate local heat, food absorption and erection.
A varicose vein is larger than normal, elongated and tortuous; causes are hereditary wall weakness, incompetent valves and raised intra-abdominal pressure.
## lose_the_mark
Saying all arteries carry oxygenated blood. The pulmonary and umbilical arteries do not, and an artery is defined by direction of flow.
Answering that an anastomosis protects a limb from a sudden arterial occlusion. It opens on gradual obstruction only; the book says so explicitly and the exam asks the sudden case.
Naming the three types of anastomosis without their examples. The type is identified by the example — arch, joint, or two vessels converging.
Leaving the splenic artery or the pulmonary arteries off the end-artery list. Both are on the book's list of five.
Giving the muscle pump as the reason venous blood returns from the head and neck. That is gravity; the five-factor list belongs to the lower limb.
Forgetting the deep fascia in the venous return list. It is one of the five, and it links this chapter to the fascia chapter.
Giving the left atrium two pulmonary veins. It receives four.
Describing the portal vein as ending in the inferior vena cava. It ends in the liver sinusoids; it is the hepatic veins that end in the inferior vena cava.
Calling a sinusoid a wide capillary of uniform diameter. Its defining feature is an irregular diameter with dilatations and constrictions.
## image_recommendations
### diagram · The three circulations on one figure — systemic, pulmonary and portal — drawn as three loops through a four-chambered heart, oxygenated blood in one colour and deoxygenated in another, with the four valves labelled at their crossings and the portal loop running from gut and spleen through the liver sinusoids to the hepatic veins
Purpose: The chapter's whole content is a route with colour changes at fixed points, and a route is a diagram. Colouring the pulmonary artery as deoxygenated is what settles the misconception the question books test.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book PDF pages 141-143
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
### diagram · The three types of arterial anastomosis as three panels — two arteries meeting end to end in an arch, a joint with branches from above and below meeting through terminal arterioles, and two arteries converging to unite — each labelled with the book's own example
Purpose: These are three shapes, and the type is decided by the shape rather than by the words. Three panels also carry the examples where a list would drop them.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF page 144
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · One artery crossing a joint drawn twice — gradual narrowing with the terminal arteriole anastomosis opened and flow maintained below, and sudden ligation with the anastomosis closed and the distal part shaded as dead
Purpose: The single most examined sentence in the chapter is a contrast between two time courses, and two panels of the same vessel are the only way to show a time course in a still image.
Priority: required
Status: needed
Kind: diagram
Section: Clinical significance
Source direction: purpose-drawn, following the department book PDF page 145
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · The factors helping venous return drawn on one lower limb and trunk — valves in a vein, an artery pulsating beside it, a calf muscle contracting inside its deep fascial sleeve, and the thorax with negative pressure arrowed — with a separate small panel for the head and neck labelled gravity
Purpose: Five mechanisms acting on one column of blood is a picture of forces, and separating the upper body's single factor into its own panel prevents the two lists being merged.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF pages 145-146
Rights: newly drawn for this product, or CC-BY / public domain
## conflicts
Dr. Galal's final revision does not cover this chapter. The department book is the sole source of record for this leaf, so nothing here is corroborated by a second Kasr source.
## resource_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## evidence_gaps
Dr. Galal's revision covers none of the Cardiovascular system chapter, so this leaf has one source only.
The department book gives the heart's position, chambers and valves and nothing else: no surfaces, borders or apex beat, no coronary arteries, no conducting system, no cardiac veins. A question book stem on the coronary circulation has nothing in this chapter to answer from, and the module's own Histology part does not cover it either.
The book names the fibrous and serous pericardium and does not describe either.
The book states that arteries are classified by size and structure into large, medium and small, and then describes none of the three. A question asking how an elastic artery differs from a muscular one cannot be answered from this text.
The book gives no account of capillary exchange, blood pressure, or the structure of a vein wall.
The MCQ bank's "Cardiovascular system" leaf is not a clean set: of its 85 stems, most are upper-limb artery questions — the scapular anastomosis, the brachial artery, the carpal arches — filed here by the extractor rather than questions on the Basis chapter. Only the general-principle stems were used to shape this article, and the mis-filing is recorded so a later pass can re-file them.
No concept whose module_subject is this leaf exists yet in either concept batch. related_concepts is empty for that reason.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Basis of Anatomy Chapter 7 "Cardiovascular system", PDF pages 140-147 — site and chambers of the heart; the three circulations; arteries and their classification; arterial anastomosis, its functions and three types; end arteries; factors helping venous return; arterio-venous connections and the arteriovenous shunt; varicose veins and stagnation.
Department Book Module 101, Chapter 4 "Axilla", PDF pages 189-190, and Chapter 5 "Arm", PDF page 204 — the scapular and elbow anastomoses, which are this chapter's principles worked out in a region and are taught in their own articles.
scripts/kasr/extract/mcq-bank.json, leaf "Cardiovascular system" — 85 stems, of which the general-principle items were used and the mis-filed upper-limb items were not.
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
relatedConceptIds: No concept whose module_subject is "101 ISK > Anatomy > Basis of Anatomy > Cardiovascular system" exists yet in either concept batch. The field is left empty rather than filled with an upper-limb vascular concept, whose article is elsewhere, and the gap is named in evidence_gaps.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
subject: Filed under cvs rather than msk because the material is cardiovascular, even though the leaf sits inside an Anatomy module whose other Basis leaves are msk.
sections.Common misconceptions: The remark that a portal circulation is a venous system beginning and ending in capillaries is general anatomical knowledge; the department book describes the hepatic portal system without defining the class.
sections.Clinical significance: The closing paragraph explaining the arteriovenous shunt as a thermoregulator assembles the book's separate statements about site, muscular coat, sympathetic control and local heat; the book does not draw them together.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
## notes
Eight pages of department book, no second Kasr source, and a leaf whose question-bank entries are mostly upper-limb vessels filed here in error. The article teaches the chapter's general principles in full, because those principles are what the regional anastomosis questions in the rest of the module rest on.

---

# Item
## id
ART-101-ANA-LYMPHATIC-SYSTEM
## title
The lymphatic system
## subject
msk
## status
Draft
## owner
Claude
## topic
Basis of anatomy
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
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
101 ISK > Anatomy > Basis of Anatomy > Lymphatic system
## primary_node_id
DIS-ANA-T01
## secondary_node_ids
SYS-IMM-T01
SYS-HEM-T01
## related_concepts
CON-MSK-8EFC3649B7898F | CON-MSK-BF3670E27D6F12

## related_articles
ART-101-ANA-AXILLA-BREAST: The five groups of axillary lymph nodes and the lymphatic drainage of the breast — this chapter's principles in the region the papers ask them from.
ART-101-ANA-VEINS-OF-UPPER-LIMB: The supratrochlear and infraclavicular nodes and the lymph vessels of the limb, which follow the two superficial veins.
ART-101-ANA-CARDIOVASCULAR-SYSTEM: The venous system the two lymph ducts empty into, and the negative intrathoracic pressure that moves lymph as well as blood.
## aliases
Lymphatic system | Lymph vessels | Lymph nodes | Thoracic duct | Right lymphatic duct | Thymus | Spleen | Lymph
## reading_time
11
## summary
The lymphatic system is three parts — vessels, lymphoid tissue and free cells — and one drainage map with a lopsided split: the right lymphatic duct takes one quadrant of the body and the thoracic duct takes the other three. Everything else on this leaf is short closed lists: four characters of a lymph vessel, four places lymph vessels do not exist, four forces that move lymph, three functions of a lymph node, four functions of the spleen. The one sentence to carry away is the book's own: lymph nodes filter lymph, the spleen filters blood.
## sections
### Definition
The **lymphatic system** is the system responsible for the circulation of **lymph** — a **clear, colourless fluid, rich in protein** — from the **tissue spaces (intercellular spaces)** to the **blood stream**.

It consists of **three parts**.

**(a) Lymph vessels.**
**(b) Lymphoid tissues** — lymph nodes, spleen, tonsils and thymus.
**(c) Free cells (lymphocytes)** — including B and T lymphocytes.

That third item is the whole of what the Anatomy part of this book says about lymphocytes, and it matters for what follows.

### Mechanism
**Lymph vessels** are fine vessels present in the tissue spaces, uniting to form larger vessels that join the lymph nodes. **Two types** are named by their relation to a node.

**Afferent lymph vessels** open into the **periphery of the lymph node at its convex border** and carry lymph **to** it.
**Efferent lymph vessels** emerge from the **hilum** of the node and carry lymph **away** from it.

All the lymph vessels in the body are collected into **two large lymph ducts at the root of the neck**, and the division between them is the map the whole chapter turns on.

**The thoracic duct** drains the **left side of the head and neck, the left upper limb, the left half of the thorax, and the whole body below the diaphragm**.
**The right lymphatic duct** drains the **right side of the head and neck, the right half of the thorax, and the right upper limb**.

The two ducts open into two large veins at the root of the neck. Three quarters of the body to one duct and one quarter to the other is the asymmetry to hold, and the quadrant that goes right is the right upper quadrant above the diaphragm.

**Four characters of the lymph vessels**, as the book gives them.

1. They **begin blindly** in the tissue spaces.
2. Their **walls contain wide pores** which allow the passage of **fat and proteins**.
3. They have **many valves**, which make the flow of lymph **one-directional**.
4. Lymph vessels are **absent** in the **brain and spinal cord (CNS)**, **bone marrow**, and **avascular structures** such as **cartilage, cornea and hair**.

Every one of those four is a consequence of what lymph is for. A vessel that begins blindly can collect from a space rather than from another vessel; wide pores are what let protein and fat back into circulation when a capillary cannot take them; valves are needed because there is no pump; and tissues with no blood vessels have nothing to drain.

**Four factors help the flow and movement of lymph**, and they are the venous-return list minus gravity and plus one.

1. **Arterial pulsations.**
2. **Muscular contractions.**
3. **Intrathoracic negative pressure.**
4. **Peristaltic movement of the intestine.**

There is no lymphatic heart. Everything on that list is a force borrowed from something else that is already moving.

### Key determinants
**Lymph nodes.** **Shape** — oval or kidney-shaped small bodies. **Site** — along the course of the lymph vessels, in groups, in **fixed sites**.

- At the **roots of the limbs**: **axillary** for the upper limb, **inguinal** for the lower limb.
- In the **neck**, on both its sides and at its junction with the head.
- In the **chest**: close to the trachea and bronchi, and in the chest wall.
- Close to the **abdominal and pelvic organs**, near the big vessels.
- Around the **abdominal aorta** and the blood vessels of the pelvis.

**Three functions of a lymph node.**

1. **Filtration** of lymph from bacteria and foreign bodies.
2. **Formation and production of lymphocytes.**
3. **Defence** — they are the sites of interaction between micro-organisms (antigens) and phagocytes and lymphocytes.

**The thymus gland** is a lymphatic organ with an **endocrine function**: it secretes **thymosine**. It is formed of **two lobes** and lies in the **thorax just behind the sternum**. Its size **increases until puberty** and then **decreases with advancing age**.

**The spleen** is a **hemolymphatic organ** in the **upper left part of the abdominal cavity**, beneath the **left dome of the diaphragm**, **behind the stomach**, protected by the **ninth, tenth and eleventh ribs**. Its **size**: it is **not palpable unless enlarged at least three times**.

**Four functions of the spleen.**

1. In the **fetus**, it has a role in the **formation of blood cells**.
2. In the **adult**, it **stores and concentrates blood cells**, so that in haemorrhage it pours concentrated blood into the circulation.
3. It **destroys old expired red cells**.
4. It **filters the blood** from organisms and harmful substances.

The department book closes the comparison itself, and it is worth quoting as the chapter's summary: **the lymph nodes filter the lymph, but the spleen filters the blood.**

### Clinical significance
**Why an enlarged node sends you looking elsewhere.** Lymph nodes may swell as the result of **inflammation, metastasis or primary tumour**. The book's instruction follows directly: because of this, the lymphatic drainage of all the major organs of the body, **including the skin**, should be known — and when a node is enlarged, **the area it drains should be examined**; when a lesion is found anywhere, **the nodes draining it should be examined**. That two-way rule is the reason lymphatic drainage is memorised region by region for the rest of the course.

**Why destroying lymph vessels causes swelling.** **Extensive destruction of lymph vessels in surgery, or obstruction as in filariasis, leads to oedema of the drained part.** The most familiar example in this module is the arm after axillary clearance for breast carcinoma.

**Why a spleen you can feel is already large.** It is not palpable unless enlarged at least three times, so any palpable spleen is an abnormal one — the point of the book's stating its size in those terms.

**Why the spleen is injured by lower rib fractures.** It lies behind the ninth, tenth and eleventh ribs. The book gives the relation; it does not describe splenic rupture, and none is described here.

**Why the thymus is a childhood organ.** It grows until puberty and involutes afterwards, which is why a mass behind the sternum means different things at different ages. The book gives the timing and no more.

### Common misconceptions
**Afferent and efferent are defined by the node, not by the direction of travel through the body.** Afferent vessels enter at the **convex border**; efferent vessels leave at the **hilum**. A vessel is afferent to one node and efferent from the one before it.

**The two ducts do not split the body left and right.** The thoracic duct takes the **whole body below the diaphragm** as well as the left side above it. Only the **right head and neck, right thorax and right upper limb** go to the right lymphatic duct.

**Lymph is not present everywhere.** It is absent from the **central nervous system, the bone marrow, and avascular structures** — cartilage, cornea and hair.

**The spleen is not a lymph node.** It is a hemolymphatic organ, it filters **blood** rather than lymph, and it has functions — fetal haemopoiesis, storage, destruction of old red cells — that no lymph node has.

**The thymus is not purely lymphatic.** The book calls it a lymphatic organ **with an endocrine function**, secreting thymosine.
## hold_these
Lymph is a clear colourless fluid rich in protein, carried from the tissue spaces to the blood stream.
The lymphatic system has three parts: lymph vessels, lymphoid tissues (lymph nodes, spleen, tonsils, thymus) and free cells (B and T lymphocytes).
Afferent lymph vessels enter a node at its convex border; efferent vessels leave at the hilum.
The thoracic duct drains the left head and neck, left upper limb, left half of the thorax and the whole body below the diaphragm.
The right lymphatic duct drains the right head and neck, right half of the thorax and right upper limb.
Lymph vessels begin blindly, have wide pores that pass fat and protein, and have many valves making flow one-directional.
Lymph vessels are absent in the brain and spinal cord, bone marrow, and avascular structures such as cartilage, cornea and hair.
Lymph is moved by arterial pulsations, muscular contractions, negative intrathoracic pressure and intestinal peristalsis.
Lymph nodes are oval or kidney-shaped and lie in fixed groups: limb roots, neck, chest, near abdominal and pelvic organs, and around the abdominal aorta and pelvic vessels.
The three functions of a lymph node are filtration of lymph, production of lymphocytes, and defence.
The thymus is a two-lobed lymphatic organ behind the sternum with an endocrine function, secreting thymosine; it grows until puberty and then involutes.
The spleen lies in the upper left abdomen beneath the left dome of the diaphragm, behind the stomach, protected by the ninth, tenth and eleventh ribs, and is not palpable unless enlarged at least three times.
The four functions of the spleen are fetal blood formation, storage and concentration of blood cells, destruction of old red cells, and filtration of the blood.
Lymph nodes filter lymph; the spleen filters blood.
Destruction of lymph vessels in surgery, or obstruction as in filariasis, causes oedema of the drained part.
## lose_the_mark
Splitting the body left and right between the two ducts. The thoracic duct takes everything below the diaphragm as well as the left side above it.
Defining afferent and efferent by direction of body travel. They are defined against a node — in at the convex border, out at the hilum.
Saying lymph vessels are present everywhere. They are absent in the CNS, in bone marrow, and in avascular tissues such as cartilage, cornea and hair.
Putting gravity on the list of factors moving lymph. The four are arterial pulsation, muscular contraction, negative intrathoracic pressure and intestinal peristalsis.
Giving the spleen the job of filtering lymph. It filters blood; the book states the contrast itself.
Calling the thymus purely lymphatic. It has an endocrine function and secretes thymosine.
Saying a palpable spleen is normal in a thin patient. The book's own criterion is that it is not palpable unless enlarged at least three times.
Giving two functions of a lymph node. There are three, and defence is the one usually dropped.
## image_recommendations
### diagram · A whole-body outline shaded into two territories — the small right upper quadrant draining to the right lymphatic duct, everything else to the thoracic duct — with the two ducts drawn opening into the great veins at the root of the neck
Purpose: The asymmetry of the two territories is the chapter's central fact and it is a map. Students who read the two sentences almost always answer that the split is left and right; a shaded body cannot be misread that way.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book PDF pages 148-149
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
### diagram · A single lymph node in section with afferent vessels entering all round the convex border and one efferent vessel leaving at the hilum, drawn in a chain so the same vessel is afferent to one node and efferent from the last
Purpose: The definition is relational, and the chain is what makes that visible. One node drawn alone teaches the words without the relation the exam item turns on.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF page 148
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · The fixed sites of lymph node groups on one whole-body outline — axillary and inguinal at the limb roots, cervical in the neck, tracheobronchial and chest wall in the thorax, groups beside the abdominal and pelvic organs and around the aorta — with the thymus behind the sternum and the spleen under the left ninth to eleventh ribs marked in a different colour as lymphoid organs rather than node groups
Purpose: "Fixed sites" is a list of places, and the distinction between a node group and a lymphoid organ is what the last two labels teach. Both are spatial claims.
Priority: strongly helpful
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF pages 149-151
Rights: newly drawn for this product, or CC-BY / public domain
## conflicts
Dr. Galal's final revision does not cover this chapter. The department book is the sole source of record for this leaf, so nothing here is corroborated by a second Kasr source.
## resource_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## evidence_gaps
Dr. Galal's revision covers none of the Lymphatic system chapter, so this leaf has one source only.
**The book names B and T lymphocytes once, as "free cells", and never describes them.** The question books examine them constantly on this leaf — where each matures, which is responsible for humoral and which for cellular immunity, the proportion of T lymphocytes among circulating lymphocytes, CD markers, cytotoxic and helper subsets, natural killer cells, plasma cells and their cartwheel nucleus, life spans. None of it is anywhere in the Anatomy part of the department book. A student revising this chapter for those items has nothing to revise from, and a reviewer should decide whether they belong to the Histology half of the module instead.
The book gives no structure of a lymph node — cortex, medulla, sinuses, germinal centres — although it asks the student to know the node's functions.
The book gives no lymphatic drainage map for any organ other than what appears in the regional chapters, yet its own clinical paragraph instructs that the drainage of all major organs including the skin should be known.
The book gives the spleen's site, size and functions and no surfaces, borders or peritoneal relations, although one of its own stated learning outcomes is to "determine the site, surfaces, size and functions of the spleen".
The MCQ bank's "Lymphatic system" leaf is not a clean set: of its 71 stems, the majority are histology and immunology items on lymphocytes, plasma cells and connective tissue, plus a group of breast and axilla drainage questions. Only the stems answerable from this chapter shaped the article, and the mis-filing is recorded.
No concept whose module_subject is this leaf exists yet in either concept batch. related_concepts is empty for that reason.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Basis of Anatomy Chapter 8 "Lymphatic system", PDF pages 148-151 — definition and three parts of the system; two types of lymph vessel; the thoracic and right lymphatic ducts and their territories; four characters of lymph vessels; four factors moving lymph; shape, sites and three functions of lymph nodes; the thymus; the spleen's site, size and four functions; the clinical paragraph on enlarged nodes and on destruction or obstruction of lymph vessels.
Department Book Module 101, Chapter 4 "Axilla", PDF pages 191-193, and Chapter 8 "Veins of the Upper Limb", PDF pages 255-256 — the regional application of these principles, taught in their own articles.
scripts/kasr/extract/mcq-bank.json, leaf "Lymphatic system" — 71 stems, of which only those answerable from the Basis chapter were used; the remainder are histology and immunology items recorded in evidence_gaps.
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
relatedConceptIds: No concept whose module_subject is "101 ISK > Anatomy > Basis of Anatomy > Lymphatic system" exists yet in either concept batch. The field is left empty rather than filled with an axillary node concept, whose article is elsewhere, and the gap is named in evidence_gaps.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
subject: Filed under msk to match the leaf's placement in the Anatomy module's Basis section, as specified for this batch, although the material is immunological.
sections.Mechanism: The paragraph explaining why each of the four characters of a lymph vessel follows from what lymph is for is reasoning added here to make the list learnable. The book states the four characters without deriving them.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
## notes
Four pages of department book against 71 question-bank stems, most of which this chapter cannot answer. The single most useful thing this article does for a faculty reviewer is name that mismatch precisely: the book mentions B and T lymphocytes once, in a bracket, and the papers examine them in detail.

---

# Item
## id
ART-101-ANA-NERVOUS-SYSTEM
## title
The nervous system
## subject
neuro
## status
Draft
## owner
Claude
## topic
Basis of anatomy
## language
en
## learner_stage
Year 1 foundation
## template_id
TPL-CONCEPT
## archetype
concept
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
101 ISK > Anatomy > Basis of Anatomy > Nervous system
## primary_node_id
DIS-ANA-T01
## secondary_node_ids
SYS-NEU-T01-S01
SYS-NEU-T01-S02
## related_concepts
CON-MSK-59F41C4BAF6181

## related_articles
ART-101-ANA-RADIAL-NERVE: A peripheral nerve followed from its roots to its territory — this chapter's classification worked out in one nerve.
ART-101-ANA-ARM: Where the anterior primary rami of the brachial plexus end up, and why a nerve is described by the level its branches leave at.
ART-101-ANA-MUSCLES-OF-THE-BACK: Trapezius, the module's one limb muscle supplied by a cranial nerve rather than by a spinal one.
## aliases
Nervous system | Central nervous system | Peripheral nervous system | Spinal cord | Spinal nerves | Cranial nerves | Meninges | Autonomic nervous system
## reading_time
9
## summary
This is a three-page chapter and the shortest in the Basis section, and everything in it is a classification: central against peripheral, spinal against cranial, sympathetic against parasympathetic. What is worth learning cold is the spinal cord — 45 cm, 31 segments in a fixed count, two enlargements where the plexuses arise, an H of grey matter with three pairs of horns, and lateral horns that carry sympathetic nuclei in the thoracic and upper two lumbar segments and parasympathetic nuclei in the second, third and fourth sacral segments. That last line is the only piece of autonomic anatomy the book gives.
## sections
### Definition
The **nervous system** is classified into two.

**1. Central nervous system** — the **brain**, inside the skull, and the **spinal cord**.

**2. Peripheral nervous system** — divided in turn into
 *(a) nerves*: **spinal nerves** and **cranial nerves**; and
 *(b) the **autonomic nervous system***: **sympathetic** and **parasympathetic**.

**Parts of the brain**, as the book gives them.

- **Two cerebral hemispheres (cerebrum)**, each formed of four main lobes — **frontal, parietal, occipital and temporal**.
- **Cerebellum.**
- **Brain stem**, formed of **midbrain, pons and medulla oblongata**.
- **Diencephalon**, divided into **thalamus, subthalamus, hypothalamus, epithalamus and metathalamus**.

### Mechanism
**The spinal cord** is the part of this chapter that carries detail, and the detail is examined.

**Site** — a **45 cm** tube present **inside the vertebral column**.
**Segments** — **31**: **8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 1 coccygeal**.
**Enlargements** — **two**, one **cervical** and one **lumbar**, **where the nerve plexuses arise**.
**End** — tapering, and called the **conus medullaris**.

**Structure**, in three parts.

**[A] Outer white matter** — nerve fibres, containing the nervous **tracts**.
**[B] Inner grey matter** — nerve cells, **H-shaped**, making horns:
 - **two dorsal horns**, containing **sensory nuclei**;
 - **two ventral horns**, containing **motor nuclei**;
 - **two lateral horns**, containing **sympathetic nuclei in the thoracic and upper two lumbar segments** and **parasympathetic nuclei in the second, third and fourth sacral segments**.
**[C] Central canal.**

White outside and grey inside is the reverse of the arrangement in the cerebrum, and the reversal is a stock single-best-answer item.

**Spinal nerves** — **31 pairs**, matching the segments: 8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal. Each nerve arises from the cord by **two roots**.

1. **Anterior (ventral) root**, containing **motor** fibres.
2. **Posterior (dorsal) root**, containing **sensory** fibres.
3. The two roots **unite to form the nerve trunk**, which contains **mixed** fibres.
4. The trunk divides into **two rami, both containing mixed fibres**: an **anterior (ventral) primary ramus** and a **posterior (dorsal) primary ramus**.

That sequence — separate roots, mixed trunk, two mixed rami — is the reason the limbs are supplied by anterior primary rami and the true muscles of the back by posterior primary rami, which is a fact the Upper Limb chapters use without re-explaining.

**Cranial nerves** — **12 pairs**, arising from the brain and leaving the skull through foramina.

I olfactory. II optic. III oculomotor. IV trochlear. V trigeminal. VI abducent. VII facial. VIII auditory. IX glossopharyngeal. X vagus. XI accessory. XII hypoglossal.

**Meninges** are the coverings of the central nervous system. Their layers, **from inside out**, are **pia mater, arachnoid mater, dura mater**.

**The autonomic nervous system** is concerned with **involuntary activities** and is divided into **sympathetic** and **parasympathetic**. The department book says nothing further about either.

### Key determinants
Four counts carry most of the marks on this leaf, and they are worth separating from the prose.

**45** — the length of the spinal cord in centimetres.
**31** — the number of cord segments, and of pairs of spinal nerves, split 8 / 12 / 5 / 5 / 1.
**12** — the number of pairs of cranial nerves.
**3** — the number of meningeal layers, in the order pia, arachnoid, dura from inside out.

Two spatial claims sit beside them.

The **two enlargements** are cervical and lumbar, and their reason is given: they are **where the nerve plexuses arise**. Enlargement follows from the extra motor and sensory neurons a limb needs.

The **lateral horn** exists only where the autonomic outflow leaves the cord: **T1 to L2 for the sympathetic** and **S2, S3, S4 for the parasympathetic**. The book states those levels as the location of the nuclei, and they are the only quantitative statement about the autonomic system anywhere in this module's Anatomy text.

The **root rule** is the last determinant: **anterior root motor, posterior root sensory, trunk and both rami mixed**. Four statements, and each half of the pair is a distractor for the other.

### Clinical significance
The department book's Nervous system chapter offers no clinical section at all — no lesion, no level, no sign. What follows is the small number of consequences that follow directly from statements the chapter does make, and each is flagged as reasoning rather than as the book's teaching.

**Why a root lesion and a nerve lesion differ.** The roots are separate and unmixed — anterior motor, posterior sensory — while the trunk and rami are mixed. A lesion of one root can therefore produce a pure motor or a pure sensory loss; a lesion of the trunk cannot.

**Why the cord ends before the vertebral column does.** The cord is 45 cm long and tapers at the conus medullaris. The book gives the length and the name and does not say at which vertebral level the taper lies, so the standard clinical statement about the safe level for lumbar puncture cannot be made from this text.

**Why the enlargements are where the plexuses are.** More neurons are needed where a limb is supplied, so the cord is thicker at the cervical and lumbar levels. The book states the association and leaves the reason implicit.

**Why the meningeal order matters.** Pia is innermost and applied to the cord, dura outermost. Any collection named by its relation to the dura — above it or below it — takes its name from that order.

**Why trapezius is the odd muscle out in the limb.** The accessory nerve is number XI on the cranial list, and trapezius is supplied by its spinal root. Everything else acting on the shoulder girdle comes from anterior primary rami by way of the brachial plexus.

### Common misconceptions
**Grey outside, white inside is the brain, not the cord.** In the spinal cord the white matter is **outer** and the grey matter **inner**.

**There are 31 pairs of spinal nerves and 8 cervical ones, not 7.** The cervical count does not match the number of cervical vertebrae, and the mismatch is the point of the item.

**The anterior root is motor and the posterior root sensory — but both primary rami are mixed.** A student who carries the motor/sensory split past the point where the roots unite will describe a posterior primary ramus as sensory, and it is not.

**Lateral horns are not present at every level.** They exist where the autonomic nuclei are — thoracic and upper two lumbar for the sympathetic, second to fourth sacral for the parasympathetic.

**Meninges are listed here from inside out.** Pia, arachnoid, dura. A list learned outside in from another book will be written in the reverse of the order this faculty prints.

**The accessory nerve is a cranial nerve.** Its spinal root supplies a muscle of the limb, which is why it appears in the Upper Limb chapters, but it is number XI on the list of twelve.
## hold_these
The nervous system is central — brain and spinal cord — and peripheral, which comprises the spinal and cranial nerves and the autonomic nervous system.
The brain is the two cerebral hemispheres with four lobes each, the cerebellum, the brain stem of midbrain, pons and medulla oblongata, and the diencephalon.
The diencephalon is thalamus, subthalamus, hypothalamus, epithalamus and metathalamus.
The spinal cord is a 45 cm tube inside the vertebral column with 31 segments — 8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal.
It has two enlargements, cervical and lumbar, where the nerve plexuses arise, and ends as the conus medullaris.
White matter is outer and contains the tracts; grey matter is inner and H-shaped.
Dorsal horns carry sensory nuclei, ventral horns motor nuclei, and lateral horns the sympathetic nuclei of the thoracic and upper two lumbar segments and the parasympathetic nuclei of the second, third and fourth sacral segments.
Each spinal nerve has an anterior root carrying motor fibres and a posterior root carrying sensory fibres; the trunk and both primary rami are mixed.
There are 31 pairs of spinal nerves and 12 pairs of cranial nerves.
The twelve cranial nerves in order are olfactory, optic, oculomotor, trochlear, trigeminal, abducent, facial, auditory, glossopharyngeal, vagus, accessory, hypoglossal.
The meninges from inside out are pia mater, arachnoid mater, dura mater.
The autonomic nervous system governs involuntary activity and is sympathetic and parasympathetic.
## lose_the_mark
Putting grey matter on the outside of the spinal cord. In the cord white is outer and grey inner; the reverse is the cerebrum.
Giving 7 cervical cord segments to match the 7 cervical vertebrae. There are 8.
Calling the posterior primary ramus sensory. Only the posterior root is sensory; both rami are mixed.
Saying lateral horns run the whole length of the cord. They are present in the thoracic and upper two lumbar segments and in S2, S3, S4.
Listing the meninges dura first. This faculty prints them from inside out — pia, arachnoid, dura.
Leaving the diencephalon out of the parts of the brain. The book gives four parts, and the diencephalon with its five subdivisions is the one most often dropped.
Counting the accessory nerve among the spinal nerves. It is cranial nerve XI, even though its spinal root supplies trapezius.
Giving the cord a length other than 45 cm. The book states the figure and the question books ask it.
## image_recommendations
### diagram · Classification of the nervous system as a single branching chart — central into brain and spinal cord, peripheral into nerves (spinal, cranial) and autonomic (sympathetic, parasympathetic) — with the parts of the brain hanging off the brain node and the four counts (45 cm, 31, 12, 3) printed beside the structures they belong to
Purpose: The chapter is a classification and nothing else, so the deliverable is the tree itself. Printing the examined counts on the branches puts the numbers where the student will look for them.
Priority: required
Status: needed
Kind: diagram
Section: Definition
Source direction: purpose-drawn, following the department book PDF pages 137-139
Rights: newly drawn for this product, or CC-BY / public domain; no all-rights-reserved textbook figure
### diagram · Transverse section of the spinal cord with outer white matter and inner H-shaped grey matter, the three pairs of horns labelled with their nuclei, the central canal marked, and a spinal nerve drawn leaving by an anterior motor root and a posterior sensory root uniting into a mixed trunk that divides into two mixed rami
Purpose: The root rule and the horn map are one picture, and the mixing of the trunk is a geometric event. Prose lets a student carry "posterior equals sensory" past the point where it stops being true.
Priority: required
Status: needed
Kind: diagram
Section: Mechanism
Source direction: purpose-drawn, following the department book PDF pages 138-139
Rights: newly drawn for this product, or CC-BY / public domain
### diagram · The spinal cord drawn whole inside an outline of the vertebral column, its 31 segments blocked out by region with the counts printed, the cervical and lumbar enlargements shown as thickenings with the plexuses arising from them, the conus medullaris at the end, and the levels of the sympathetic and parasympathetic lateral-horn nuclei shaded in two colours
Purpose: Segment counts, enlargements and autonomic outflow levels are three claims about the same axis, and one drawing holds all three where three sentences separate them.
Priority: required
Status: needed
Kind: diagram
Section: Key determinants
Source direction: purpose-drawn, following the department book PDF page 138
Rights: newly drawn for this product, or CC-BY / public domain
## conflicts
Dr. Galal's final revision does not cover this chapter. The department book is the sole source of record for this leaf, so nothing here is corroborated by a second Kasr source.
Name of the eighth cranial nerve. The department book prints "Auditory nerve"; most current texts call it the vestibulocochlear nerve. The book's name is used here, and the divergence is recorded because a student reading around will meet the other.
## resource_ids
[clear]

## claim_ids
[clear]

## span_ids
[clear]

## evidence_gaps
Dr. Galal's revision covers none of the Nervous system chapter, so this leaf has one source only, and it is three pages long.
The book classifies the autonomic nervous system into sympathetic and parasympathetic and then says nothing else about either — no outflow, no ganglia, no neurotransmitter, no distribution — although one of its own stated learning outcomes for the chapter is to "discuss the two parts of the autonomic nervous system". The only autonomic anatomy in the chapter is the segmental level of the lateral-horn nuclei.
The chapter's stated outcomes also promise a comparison of spinal and cranial nerves. No comparison is made; the two are listed separately.
The book gives no structure of a peripheral nerve — axon, myelin, Schwann cell, endoneurium, perineurium, epineurium — and no account of nerve injury or regeneration, although the Upper Limb chapters describe nerve injuries in detail and the question books examine them heavily.
The book does not state the vertebral level at which the cord ends, so nothing about lumbar puncture can be derived from this text.
The chapter has no clinical section at all; the Clinical significance section here reasons from the chapter's own statements and says so.
The MCQ bank's "Nervous system" leaf is not a clean set: of its 16 stems, almost all are histology and embryology items — neural tube and neural crest derivatives, intermediate filaments in neurons and glia, derivatives of intra-embryonic mesoderm — that belong to the Histology part or to the General Embryology chapters, not to this three-page Anatomy chapter. Effectively none of the leaf's question-bank items are answerable from the chapter the leaf names.
No concept whose module_subject is this leaf exists yet in either concept batch. related_concepts is empty for that reason.
No independent citation has been attached to any statement in this article.
## evidence_basis
Department Book Module 101 (src_b1e6dc481eaf337268d0), Part II Anatomy, Basis of Anatomy Chapter 6 "Nervous system", PDF pages 137-139 — classification of the nervous system; parts of the brain; site, segments, enlargements, end and structure of the spinal cord; spinal nerves and their roots and rami; the twelve cranial nerves; the meninges; the autonomic nervous system.
scripts/kasr/extract/mcq-bank.json, leaf "Nervous system" — 16 stems, almost none of which are answerable from this chapter; the mismatch is recorded in evidence_gaps.
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## field_notes
arabicTitle: Arabic anatomical terminology has not been reviewed for this module. It is filled at the evidence pass with a reviewer rather than guessed here.
media: No image exists anywhere in the repository for this module, so there is no URL to attach. Everything this article needs is written as an image recommendation instead.
relatedConceptIds: No concept whose module_subject is "101 ISK > Anatomy > Basis of Anatomy > Nervous system" exists yet in either concept batch. The field is left empty rather than borrowed from the Upper Limb nerve-injury leaf, whose concepts belong to other articles, and the gap is named in evidence_gaps.
questionIds: Questions for this article are authored in the question pass that runs alongside it, and the link is written from the question side.
subtopic: No SUB_ identifier has been assigned to this module in the canonical taxonomy, so module_subject carries the curriculum position.
microtopicId: No microtopic level exists beneath this node.
nanotopicId: No nanotopic level exists beneath this node.
publishedSummary: Not published — this article has not passed the evidence gate.
publishedSections: As above.
lastReviewed: Never reviewed.
subject: Filed under neuro, matching the material, although the leaf sits in an Anatomy module whose other Basis leaves are msk.
sections.Clinical significance: The department book's chapter has no clinical section. Every paragraph in this one is a consequence drawn from a statement the chapter does make, and the section says so in its opening line rather than presenting the reasoning as the faculty's teaching.
reviewDue: No review cycle has been scheduled yet — none begins until a faculty reviewer completes the sign-off named in the reviewer note above.
## notes
The shortest chapter in the Basis section and, on the evidence of the question bank, the leaf whose stems least resemble its own content. The article teaches the chapter completely — it is short enough to teach completely — and spends most of its evidence_gaps saying which of the chapter's own stated learning outcomes the chapter does not deliver.
