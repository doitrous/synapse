# What module 101 ISK actually examines

Built from `scripts/kasr/questions.json` -- 704 questions machine-extracted from 22 Kasr Al Ainy papers, 2021-2025 -- by `scripts/kasr/extract/cluster.py`. The 704 rows reduce to **177 distinct assessable objectives**. 31 rows could not be assigned and are listed in the appendix.

**Mechanical, and therefore reproducible:** whitespace normalisation; occurrence, year and marks counting; the legibility score that picks which verbatim occurrence to quote as `canonicalAsked`; parsing the subject tree; testing each declared syllabus item against the cluster set; and the check that every one of the 704 indices is assigned exactly once.

**Judgement, from reading all 704 rows end to end:** which rows are the same assessable objective, what that objective is, where it sits in the tree, which declared syllabus item each cluster answers to, and which rows are too broken to place. No string-similarity matching was used to form a cluster. The papers reword one objective freely -- "Describe Decidua regarding definition, parts and fates" and "Mention parts and fates of decidua" share almost no words -- and they also reuse near-identical wording for objectives that are genuinely different, so similarity would have both split and merged the wrong things.

Corroborating sources, used only to check conclusions and never to form a cluster: `scripts/kasr/extract/notes.json` (the Anatomy Department orientation sheet, 150 teaching topics, 153 past questions 2016-2024) and `scripts/kasr/extract/mcq-bank.json` (2,704 distinct MCQs with repetition counts).

## 1. The blueprint -- the top 40 objectives by how often they recur

| # | Objective | Times | Years | Marks | Subject path |
|---|---|---|---|---|---|
| 1 | Each type of connective tissue proper is identified by where it is found and what it does -- loose areolar the commonest, reticular forming the stroma of organs, regular white fibrous in tendon and cornea, yellow elastic in the aorta. | 13 | 2021, 2022, 2023, 2024 | - | Histology > Connective Tissue > Types of Connective Tissue Proper |
| 2 | The Golgi apparatus is a stack of flattened saccules with a cis and a trans face, sited near the nucleus in secretory cells, demonstrated by silver and osmium, and it packages secretion and forms lysosomes. | 13 | 2021, 2022, 2023, 2024 | 3-4 | Histology > Cytology > Cytoplasm |
| 3 | The ulnar nerve comes from the medial cord, gives no branch in the arm, pierces the medial intermuscular septum, enters the forearm between the two heads of flexor carpi ulnaris, and enters the hand superficial to the flexor retinaculum where its deep branch supplies the intrinsic muscles. | 12 | 2021, 2022, 2023 | - | Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries |
| 4 | Fertilization happens in the lateral third of the uterine tube, and it restores the diploid number, determines sex, starts cleavage and produces the zygote. | 11 | 2021, 2022, 2023, 2024 | 5 | Anatomy > General Embryology > First Week of Development |
| 5 | The radial artery begins in the cubital fossa, runs lateral to the tendon of flexor carpi radialis, crosses the floor of the snuff box, and gives the dorsal and palmar carpal, first dorsal metacarpal, princeps pollicis and radialis indicis branches. | 11 | 2021, 2022, 2023 | - | Anatomy > Upper Limb > Forearm |
| 6 | The radial nerve arises from the posterior cord (C5-T1) and gives muscular, cutaneous and articular branches in the axilla, arm, forearm and hand, ending as superficial and posterior interosseous branches. | 11 | 2021, 2022, 2023, 2025 | 5-7 | Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries |
| 7 | Cell junctions are occluding (zonula occludens, membranes fusing and encircling the apex), anchoring (zonula adherens and macula adherens with its attachment plaque) and communicating (gap junction). | 10 | 2021, 2022, 2023 | - | Histology > Epithelial Tissues > Polarity and Membranous Specializations |
| 8 | A cilium arises from a basal body of 27 microtubules and its shaft (axoneme) holds 20 microtubules in a 9+2 pattern covered by cell membrane, so a defect in it causes chronic respiratory infection. | 10 | 2021, 2023, 2024, 2025 | 4 | Histology > Cytology > Cytoplasm |
| 9 | The anatomical snuff box lies at the base of the thumb bounded in front by abductor pollicis longus and extensor pollicis brevis and behind by extensor pollicis longus, floored by the scaphoid and trapezium, roofed by skin and the cephalic vein, and crossed by the radial artery -- so tenderness in it means a fractured scaphoid. | 9 | 2021, 2024, 2025 | 3-5 | Anatomy > Upper Limb > Hand |
| 10 | The superficial palmar arch is mainly the ulnar artery completed by the superficial palmar branch of the radial and gives the common palmar digital arteries; the deep arch is mainly the radial completed by the deep branch of the ulnar and lies a finger's breadth proximal to it. | 9 | 2021, 2024, 2025 | 7 | Anatomy > Upper Limb > Hand |
| 11 | The brachial artery begins at the lower border of teres major, runs down medial to the biceps tendon with the median nerve crossing it from lateral to medial, and ends at the neck of the radius by dividing into radial and ulnar arteries. | 8 | 2021, 2022, 2024 | 5 | Anatomy > Upper Limb > Arm |
| 12 | Deep fascia is the tough membranous sheath that forms intermuscular septa, retinacula, interosseous membranes and vascular sheaths, and it holds structures in place and helps venous return. | 8 | 2021, 2023, 2024 | 5 | Anatomy > Basis of Anatomy > Fascia |
| 13 | A fibrous joint unites bones by fibrous tissue with no cavity, and its types are suture, syndesmosis and gomphosis -- the tooth in its socket being the gomphosis. | 8 | 2022, 2023, 2024 | 5 | Anatomy > Basis of Anatomy > Articular system |
| 14 | The quadrangular, upper and lower triangular spaces behind the shoulder have set muscular and bony boundaries, the quadrangular space transmitting the axillary nerve and posterior circumflex humeral vessels. | 8 | 2021, 2022, 2023, 2024 | - | Anatomy > Upper Limb > Shoulder Region |
| 15 | Secondary lysosomes are named by what the primary lysosome fused with -- heterolysosome, autolysosome, multivesicular body -- and all end as residual bodies. | 8 | 2021, 2022, 2023, 2024, 2025 | 4 | Histology > Cytology > Cytoplasm |
| 16 | The median nerve arises by two heads from the medial and lateral cords, gives no branch in the arm, may be compressed between the two heads of pronator teres, and at the wrist lies between the tendons of palmaris longus and flexor carpi radialis before entering the carpal tunnel. | 8 | 2021, 2023, 2024 | - | Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries |
| 17 | The nucleolus has a nucleolar organiser, pars fibrosa holding newly formed rRNA, pars granulosa holding mature rRNA, and pars amorpha. | 8 | 2021, 2022, 2024 | - | Histology > Cytology > Nucleus |
| 18 | Fracture of the shaft of the humerus injures the radial nerve in the spiral groove, giving wrist drop with loss of extension of wrist and fingers and sensory loss over the lateral two-thirds of the dorsum of the hand. | 8 | 2022, 2023, 2024, 2025 | - | Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries |
| 19 | Supination and pronation turn the radius about an axis through the head of the radius and the styloid of the ulna -- biceps and supinator supinate through the musculocutaneous and posterior interosseous nerves, the two pronators pronate through the median. | 8 | 2021, 2022, 2024 | 5 | Anatomy > Upper Limb > Forearm |
| 20 | The skin of the upper limb is supplied in named strips -- the medial side of the arm and forearm from the medial cord, the lateral side from the musculocutaneous, the dorsum of the hand from radial and ulnar, the palm from median and ulnar. | 8 | 2021, 2022, 2023, 2024 | - | Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries |
| 21 | The axilla has an anterior wall of pectoralis major and minor, subclavius and clavipectoral fascia, a posterior wall of subscapularis, teres major and latissimus dorsi, a medial wall of serratus anterior and ribs, and it contains the axillary vessels, the cords and branches of the brachial plexus, lymph nodes, fat and the tail of the breast. | 7 | 2021, 2022, 2023, 2024 | - | Anatomy > Upper Limb > Axilla |
| 22 | The basophil has an S-shaped nucleus and metachromatic granules of histamine and heparin, and its membrane carries receptors for IgE. | 7 | 2021, 2022, 2023, 2024 | - | Histology > Blood > Granular leukocytes |
| 23 | The brachial plexus is formed of five roots, three trunks, six divisions, three cords and its terminal branches, the suprascapular nerve coming off the upper trunk and the axillary and radial off the posterior cord. | 7 | 2021, 2022 | 5 | Anatomy > Upper Limb > Axilla |
| 24 | The elbow is a synovial hinge between the humerus above and the radius and ulna below, strengthened by radial and ulnar collateral ligaments, flexed by brachialis and biceps and extended by triceps. | 7 | 2021, 2023, 2024, 2025 | 7 | Anatomy > Upper Limb > Joints of Upper Limb |
| 25 | The flat embryonic disc folds in a head, a tail and two lateral folds, driven by the expanding amniotic cavity and the growing neural tube, and this converts the disc into a cylinder and encloses the gut. | 7 | 2021, 2022, 2023, 2025 | 5-6 | Anatomy > General Embryology > Embryonic Period |
| 26 | The flexor retinaculum bridges the carpal bones to roof the carpal tunnel, which transmits the median nerve and the long flexor tendons, while the ulnar nerve and artery and the palmaris longus tendon pass superficial to it. | 7 | 2022, 2023, 2024 | - | Anatomy > Upper Limb > Forearm |
| 27 | The musculocutaneous nerve arises from the lateral cord, pierces coracobrachialis, supplies the three flexors of the arm, and ends as the lateral cutaneous nerve of the forearm. | 7 | 2021, 2024 | 5 | Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries |
| 28 | The platelet is a granulomere of alpha, delta and lambda granules surrounded by a hyalomere of microtubules, microfilaments and the open canalicular and dense tubular systems, and that structure explains how it works. | 7 | 2021, 2022, 2023, 2025 | 4 | Histology > Blood > Blood Platelets |
| 29 | Injury to the ulnar nerve gives claw hand with loss of thumb adduction and wasting of the hypothenar and interossei -- and the deformity is worse, not better, when the nerve is cut at the wrist. | 7 | 2021, 2022, 2023, 2024, 2025 | - | Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries |
| 30 | The cell membrane carries a carbohydrate-rich glycocalyx, which is why silver and PAS are the stains that demonstrate it. | 6 | 2021, 2023, 2024 | - | Histology > Cytology > The cell |
| 31 | Chorionic villi pass from primary (cytotrophoblast core) to secondary (mesenchymal core) to tertiary (blood vessels in the core), and become either anchoring or branch villi. | 6 | 2021, 2022, 2023, 2024 | - | Anatomy > General Embryology > Fetal Membranes |
| 32 | Collagen fibres are acidophilic with H&E and are specifically demonstrated blue by Mallory trichrome. | 6 | 2021, 2022, 2024 | - | Histology > Connective Tissue > Connective Tissue Fibres |
| 33 | The eosinophil makes up 2-4% of leukocytes, has a bilobed nucleus and oval specific granules with a crystalloid core, and terminates allergic reactions with histaminase and arylsulphatase. | 6 | 2021, 2022, 2024 | 2 | Histology > Blood > Granular leukocytes |
| 34 | Euchromatin is uncoiled, electron-lucent and carries the active genes, so the nucleus of an actively synthesising cell is vesicular while an inactive one is heterochromatic and dark. | 6 | 2021, 2022, 2023, 2024 | - | Histology > Cytology > Nucleus |
| 35 | The fibroblast has a pale vesicular nucleus and rER-rich basophilic cytoplasm, forms the connective tissue fibres and ground substance, and is the cell of wound healing. | 6 | 2022, 2023, 2024 | - | Histology > Connective Tissue > Connective Tissue Cells |
| 36 | Flexor digitorum superficialis arises from the common flexor origin, radius and ulna and inserts into the middle phalanges, while profundus arises from the ulna and interosseous membrane, inserts into the distal phalanges, and has a double nerve supply. | 6 | 2022, 2023 | - | Anatomy > Upper Limb > Forearm |
| 37 | Each forearm muscle has its own attachment and nerve -- flexor carpi radialis and pronator quadratus from the median and its anterior interosseous branch, flexor carpi ulnaris from the ulnar, the extensors from the posterior interosseous. | 6 | 2022, 2023 | - | Anatomy > Upper Limb > Forearm |
| 38 | The macrophage has an indented dark nucleus and lysosome- and Golgi-rich cytoplasm, takes up vital stains such as trypan blue and India ink, and phagocytoses and presents antigen. | 6 | 2021, 2022, 2023 | - | Histology > Connective Tissue > Connective Tissue Cells |
| 39 | The mast cell has a central rounded nucleus and granules that stain metachromatically with toluidine blue, and by EM those granules are scroll-like, holding histamine and heparin. | 6 | 2021, 2024, 2025 | 4 | Histology > Connective Tissue > Connective Tissue Cells |
| 40 | The megakaryocyte is the largest cell of the bone marrow, with a single multilobed nucleus and basophilic cytoplasm, and it sheds the blood platelets. | 6 | 2021, 2022, 2023 | - | Histology > Blood > Haemopoiesis |

Independent corroboration: the most-repeated stems in the 2,704-question MCQ bank are wrist drop from nerve injury (x5), the lateral intermuscular septum (x5), branches of the ulnar artery, pronation and supination, cutaneous innervation of the palm, lateral rotation at the shoulder, loss of finger abduction, and carpal tunnel motor loss (all x4) -- the same nerve-injury and nerve-supply territory that dominates the table above.

## 2. Coverage against the declared syllabus

The Anatomy Department's orientation sheet (`notes.json` -> `orientation`, signed by the head of the department board) states the examinable syllabus for the 60-mark end-of-year Anatomy written paper. Each declared item is tested against the cluster set below. Note the sheet governs the **Anatomy** paper only -- Histology is set by a different department, so Histology clusters are not "undeclared", they are simply outside this sheet's remit.

### 2a. Every declared item, and whether it has ever been examined

| Declared item | Objectives | Total askings | Verdict |
|---|---|---|---|
| Basis: Fascia -- superficial | 1 | 3 | examined |
| Basis: Fascia -- deep | 1 | 8 | examined |
| Basis: Bones | 4 | 5 | examined |
| Basis: Joints -- fibrous | 1 | 8 | examined |
| Basis: Joints -- cartilaginous | 1 | 4 | examined |
| Basis: Joints -- synovial | 3 | 9 | examined |
| Basis: Muscles | 2 | 7 | examined |
| Embryology: Fertilization | 1 | 11 | examined |
| Embryology: Implantation | 5 | 15 | examined |
| Embryology: Decidua | 1 | 2 | examined |
| Embryology: Notochord | 1 | 2 | examined |
| Embryology: Intra-embryonic mesoderm | 2 | 6 | examined |
| Embryology: Folding | 1 | 7 | examined |
| Embryology: Fetal membranes -- chorion | 1 | 6 | examined |
| Embryology: Fetal membranes -- amnion | 2 | 3 | examined |
| Embryology: Fetal membranes -- placenta | 3 | 9 | examined |
| Embryology: Fetal membranes -- umbilical cord | 2 | 8 | examined |
| Upper Limb: Muscles -- all except hand (attachment, nerve supply, action) | 17 | 62 | examined |
| Upper Limb: Nerves -- brachial plexus | 3 | 12 | examined |
| Upper Limb: Nerves -- median | 2 | 10 | examined |
| Upper Limb: Nerves -- radial | 2 | 19 | examined |
| Upper Limb: Nerves -- ulnar | 2 | 19 | examined |
| Upper Limb: Nerves -- axillary | 2 | 3 | examined |
| Upper Limb: Nerves -- musculocutaneous | 1 | 7 | examined |
| Upper Limb: Cutaneous nerve supply of the upper limb | 1 | 8 | examined |
| Upper Limb: Arteries -- all, with anastomoses and arches | 7 | 37 | examined |
| Upper Limb: Veins -- all (beginning, course, end, tributaries, areas drained) | 1 | 1 | **barely examined** |
| Upper Limb: Spaces -- intermuscular spaces of shoulder | 1 | 8 | examined |
| Upper Limb: Spaces -- axilla | 1 | 7 | examined |
| Upper Limb: Spaces -- cubital fossa | 1 | 3 | examined |
| Upper Limb: Spaces -- snuff box | 1 | 9 | examined |
| Upper Limb: Spaces -- carpal tunnel | 1 | 7 | examined |
| Upper Limb: Fasciae -- clavipectoral fascia | 1 | 2 | examined |
| Upper Limb: Fasciae -- flexor retinaculum | 1 | 7 | examined |
| Upper Limb: Fasciae -- extensor retinaculum | 1 | 3 | examined |
| Upper Limb: Joints -- sternoclavicular | 1 | 3 | examined |
| Upper Limb: Joints -- acromioclavicular | 0 | 0 | **NEVER EXAMINED** |
| Upper Limb: Joints -- shoulder | 2 | 6 | examined |
| Upper Limb: Joints -- elbow | 1 | 7 | examined |
| Upper Limb: Joints -- superior & inferior radio-ulnar | 0 | 0 | **NEVER EXAMINED** |
| Upper Limb: Joints -- wrist | 1 | 3 | examined |

### 2b. Declared but never examined

This is the most useful single fact here: material the department tells students to learn, and which no paper in the corpus has ever asked.

- **Upper Limb: Joints -- acromioclavicular** -- no cluster corresponds; the words "acromioclavicular" and "acromio-clavicular" do not occur in any of the 704 rows, in any spelling -- not as a question, not even as a wrong option.
- **Upper Limb: Joints -- superior & inferior radio-ulnar** -- no cluster corresponds; the radio-ulnar joints occur in five rows, every one of them as a wrong option inside a question about something else (which joint is a gomphosis; which is the biaxial ellipsoid joint) -- never as the subject of a question.

Both are declared twice over: the sheet says "All joints except joints of the hand", and the subject tree carries a `Joints of Upper Limb` leaf. Corroboration from the other two corpora shows this is a genuine examining habit and not an artefact of the 22 papers sampled: across the 2,704-MCQ bank the acromioclavicular joint heads five one-off stems and the radio-ulnar joints three, against x4-x5 repetition for the favoured topics; across the 153 past questions of 2016-2024 the acromioclavicular joint appears exactly once, as a 2024 *case*, and never as a short-answer question.

- **Upper Limb: Veins -- all (beginning, course, end, tributaries, areas drained)** -- 1 asking in the whole corpus.

The veins deserve their own line. The sheet devotes a full clause to them -- "all veins of the upper limb (beginning, course, end and name of the tributaries and areas drained by these tributaries)" -- and in 704 rows they are the subject of exactly one question, an MCQ in the 2024 end-of-module paper. Every other mention of the cephalic or basilic vein in the corpus is a distractor inside a question about the deltopectoral groove, the axillary lymph nodes or the brachial artery. In the wider 2016-2024 past-question set veins surface seven times, again only as MCQs or as one 2017 dialysis case -- never once as a short-answer question. Since the current paper is eight SAQs and two cases, a clause of the syllabus written in SAQ language has never been set as an SAQ.

One more gap sits inside a declared item rather than replacing it. "All muscles (attachment, nerve supply and action)" is examined heavily, but only for a subset: the following muscles never head a question anywhere in the corpus and appear solely as MCQ distractors -- coracobrachialis, pectoralis minor, subclavius, rhomboid major and minor, levator scapulae, teres major, teres minor (alone).

### 2c. Examined but not declared

Anatomy clusters that no line of the orientation sheet covers. Either the syllabus has changed since these were set, or the paper overran it.

| Objective | Times | Years | Why it is undeclared |
|---|---|---|---|
| In mastectomy for breast carcinoma the axillary nodes are cleared, the opposite breast must be examined becaus | 5 | 2022, 2025 | the breast is not named on the sheet |
| The common peroneal nerve winds round the neck of the fibula where it is easily injured, giving foot drop with | 4 | 2025 | outside the module entirely -- Anatomy > Lower Limb |
| A cut across the front of the wrist divides the radial and ulnar arteries and the median and ulnar nerves, and | 4 | 2024, 2025 | covered obliquely by the arteries and nerves lines, but set as a case rather than an SAQ |
| The breast lies on a bed of pectoralis major, serratus anterior and external oblique, is slung by Cooper's lig | 3 | 2022, 2023 | the breast is not named on the sheet |
| The extensor expansion of a finger is formed by the tendon of extensor digitorum, joined by the lumbrical and  | 3 | 2021, 2022 | the sheet explicitly excludes muscles of the hand |
| The median, sagittal, coronal and transverse planes divide the body in fixed ways, and terms such as superior  | 2 | 2021, 2024 | the declared Basis list is Fascia, Bones, Joints, Muscles -- planes and terms of position are not on it |
| The five groups of axillary nodes each drain their own territory -- pectoral the breast and front of the trunk | 2 | 2022, 2024 | no lymphatics anywhere on the sheet |
| Anginal pain radiating to the left shoulder and arm comes from the two coronary arteries arising from the asce | 2 | 2025 | outside the module entirely -- Anatomy > Thorax |
| Irregular heartbeat after infarction of the territory of the right coronary artery points to damage of the con | 2 | 2025 | outside the module entirely -- Anatomy > Thorax |
| The clavicle breaks at the junction of its middle and outer thirds, the shoulder drops because the strut is lo | 2 | 2025 | the clavicle is not named on the sheet |
| A femoral hernia comes through the femoral ring into the femoral canal, is commoner in women because their rin | 2 | 2025 | outside the module entirely -- Anatomy > Lower Limb |
| The neck of the femur is the common fracture site in the elderly, and the limb becomes short and laterally rot | 2 | 2025 | outside the module entirely -- Anatomy > Lower Limb |
| Blood in the pericardial cavity is haemopericardium, drained by aspiration in the fifth left intercostal space | 2 | 2025 | outside the module entirely -- Anatomy > Thorax |
| An inhaled foreign body goes to the right principal bronchus because it is wider, shorter and more in line wit | 2 | 2025 | outside the module entirely -- Anatomy > Thorax |
| Violent abduction and external rotation of the flexed knee tears the medial meniscus because it is fixed to th | 2 | 2025 | outside the module entirely -- Anatomy > Lower Limb |
| Fluid in the pleural cavity is a pleural effusion; the pleura has parietal parts with their recesses and a vis | 2 | 2025 | outside the module entirely -- Anatomy > Thorax |
| The sciatic nerve (L4,5, S1,2,3) arises from the sacral plexus and a complete division at the back of the thig | 2 | 2025 | outside the module entirely -- Anatomy > Lower Limb |
| A pulsatile retrosternal swelling with dysphagia and hoarseness is an aneurysm of the arch of the aorta pressi | 2 | 2025 | outside the module entirely -- Anatomy > Thorax |
| The deltopectoral groove, between deltoid and pectoralis major, contains the cephalic vein and the deltoid bra | 2 | 2023 | not among the five declared spaces |
| The thumb moves in a plane of its own, each of its flexion, extension, abduction and adduction being produced  | 2 | 2022, 2023 | the sheet explicitly excludes muscles of the hand |
| Lymph from the nipple, areola and most of the breast drains to the pectoral (anterior) group of axillary nodes | 1 | 2024 | no lymphatics, and no breast, anywhere on the sheet |
| The interosseous membrane joins radius to ulna, its posterior aspect giving origin to the deep extensors and i | 1 | 2022 | not among the declared fasciae |
| Lymph capillaries begin blindly in tissue spaces with wide pores and no valves, are absent from brain, spinal  | 1 | undated | no lymphatics anywhere on the sheet |
| The right lymphatic duct drains the right side of the head, neck and thorax and the right upper limb; the thor | 1 | undated | no lymphatics anywhere on the sheet |
| Neurons are classified by their processes, the Purkinje cell of the cerebellar cortex being the multipolar exa | 1 | 2021 | outside the module entirely -- Histology > Nerve Tissue |
| Transport of neurotransmitter along the neuron runs on microtubules. | 1 | 2021 | outside the module entirely -- Histology > Nerve Tissue |
| A dendrite is multiple, short, tapering and contains Nissl bodies, while the axon is single, long and of const | 1 | 2021 | outside the module entirely -- Histology > Nerve Tissue |
| The thenar and midpalmar spaces lie deep to the palmar aponeurosis, the thenar space containing the flexor ten | 1 | 2022 | not among the five declared spaces |

The largest single block of undeclared material is the 2025 case bank, which examines **lower limb and thorax**: 11 objectives across 24 askings -- common peroneal nerve, femoral neck fracture, femoral hernia, knee meniscus, sciatic nerve, coronary arteries, pleural effusion, haemopericardium, the cardiac conducting system, inhaled foreign body and aortic aneurysm. None of this is on the orientation sheet and none of it exists anywhere in the 101 subject tree, whose only regional chapter is Upper Limb. A student revising module 101 from either document would not know these were coming.

Two smaller overruns are worth naming. The sheet excludes muscles of the hand and joints of the hand, yet thumb movements and the extensor expansion are both examined. And lymphatics appear nowhere on the sheet, yet the groups of axillary lymph nodes and the lymphatic drainage of the breast are asked repeatedly -- including as the mastectomy case, which is the single most repeated case in the corpus.

### 2d. Does the paper obey its own declared structure?

The sheet states a fixed shape: 8 SAQs -- 2 basis, 2 embryology, 4 upper limb -- plus 2 cases. Counted from the Anatomy section of each real sitting that prints its marks (duplicate "solved" and recollection copies of the same paper excluded):

| Year | Paper | Basis | Embryology | Upper limb SAQ | Cases | Obeys? |
|---|---|---|---|---|---|---|
| 2025 | EOY (ISK - 101) 199 (1).pdf | 2 | 2 | 4 | 2 | **yes, exactly** |
| 2024 | EOY (ISK - 101) 198 (1).pdf | 2 | 3 | 5 | 2 | no |
| 2022 | EOY 195 first 2022 101 ISK final (1).pdf | 0 | 1 | 2 | 1 | partial extraction -- not comparable |
| 2022 | EOY 195 first 2022  101 ISK  final modul | 0 | 0 | 1 | 0 | partial extraction -- not comparable |

Only the 2025 paper obeys the declared structure, and it obeys it exactly: two basis questions (types of muscle attachment; primary against secondary cartilaginous joints), two embryology (decidua; folding), four upper limb (pectoralis major; radial nerve; deep palmar arch; elbow joint) and two cases. **2024** ran ten SAQs, not eight -- two basis, *three* embryology and *five* upper limb -- all at a flat 5 marks. **2022** is a different architecture again: a single combined Histology-and-Anatomy paper of fourteen short essays, twenty-nine MCQs and three extended-matching questions -- the two 2022 rows above are partial extractions, so the counts in them are not the paper's shape. This is not a paper drifting from its orientation: the sheet is headed "End of Year, 2025-2026", so it describes the format that 2025 introduced, and the earlier papers predate it.

### 2e. Coverage by subject-tree leaf

| Leaf | Distinct objectives | Total askings |
|---|---|---|
| Anatomy > Basis of Anatomy > Introduction | 1 | 2 |
| Anatomy > Basis of Anatomy > Fascia | 2 | 11 |
| Anatomy > Basis of Anatomy > Skeletal system | 4 | 5 |
| Anatomy > Basis of Anatomy > Articular system | 5 | 21 |
| Anatomy > Basis of Anatomy > Muscular system | 2 | 7 |
| Anatomy > Basis of Anatomy > Cardiovascular system | 0 | 0 |
| Anatomy > Basis of Anatomy > Lymphatic system | 2 | 2 |
| Anatomy > Basis of Anatomy > Nervous system | 0 | 0 |
| Anatomy > General Embryology > Gametes | 0 | 0 |
| Anatomy > General Embryology > First Week of Development | 4 | 22 |
| Anatomy > General Embryology > Second Week of Development | 3 | 5 |
| Anatomy > General Embryology > Third Week of Development | 3 | 8 |
| Anatomy > General Embryology > Embryonic Period | 1 | 7 |
| Anatomy > General Embryology > Fetal Period | 0 | 0 |
| Anatomy > General Embryology > Fetal Membranes | 8 | 27 |
| Anatomy > Upper Limb > Pectoral Region | 8 | 19 |
| Anatomy > Upper Limb > Shoulder Region | 7 | 32 |
| Anatomy > Upper Limb > Muscles of the Back | 3 | 4 |
| Anatomy > Upper Limb > Axilla | 7 | 28 |
| Anatomy > Upper Limb > Arm | 5 | 20 |
| Anatomy > Upper Limb > Forearm | 11 | 51 |
| Anatomy > Upper Limb > Hand | 5 | 24 |
| Anatomy > Upper Limb > Joints of Upper Limb | 5 | 19 |
| Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries | 11 | 70 |
| Anatomy > Upper Limb > Veins of the Upper Limb | 1 | 1 |
| Histology > Introduction > Microscopes | 0 | 0 |
| Histology > Introduction > Microtechniques | 2 | 4 |
| Histology > Cytology > The cell | 5 | 11 |
| Histology > Cytology > Cytoplasm | 13 | 59 |
| Histology > Cytology > Nucleus | 4 | 16 |
| Histology > Blood > Red Blood Corpuscles | 2 | 8 |
| Histology > Blood > Blood Platelets | 1 | 7 |
| Histology > Blood > Granular leukocytes | 6 | 22 |
| Histology > Blood > Non granular leukocytes | 3 | 12 |
| Histology > Blood > Haemopoiesis | 3 | 9 |
| Histology > Connective Tissue > Connective Tissue Cells | 10 | 45 |
| Histology > Connective Tissue > Connective Tissue Fibres | 3 | 14 |
| Histology > Connective Tissue > Types of Connective Tissue Proper | 2 | 15 |
| Histology > Epithelial Tissues > Surface Epithelium | 5 | 17 |
| Histology > Epithelial Tissues > Glandular Epithelium | 2 | 9 |
| Histology > Epithelial Tissues > Neuro Epithelium | 0 | 0 |
| Histology > Epithelial Tissues > Myo Epithelium | 1 | 1 |
| Histology > Epithelial Tissues > Polarity and Membranous Specializations | 3 | 12 |

**Leaves never examined once:**

- Anatomy > Basis of Anatomy > Cardiovascular system
- Anatomy > Basis of Anatomy > Nervous system
- Anatomy > General Embryology > Gametes
- Anatomy > General Embryology > Fetal Period
- Histology > Introduction > Microscopes
- Histology > Epithelial Tissues > Neuro Epithelium

Three of these six are real gaps a student can act on: **Gametes** (no question on gametogenesis, spermatogenesis or oogenesis in eleven years), **Fetal Period**, and **Neuro Epithelium**. The other three are artefacts of how the tree was drawn -- Basis of Anatomy's Cardiovascular system and Nervous system leaves and Histology's Microscopes leaf carry content the papers do examine, but always inside a question filed elsewhere. Note also that Gametes and Fetal Period are absent from the orientation sheet too, so on that evidence they are genuinely not examinable and the tree, not the faculty, is what is out of step.

**Examined, but nowhere in the 101 subject tree:**

- Anatomy > Lower Limb -- 5 objectives, 12 askings
- Anatomy > Thorax -- 6 objectives, 12 askings
- Histology > Nerve Tissue -- 3 objectives, 3 askings

## 3. Drift

A caution before the lists: the corpus is not a clean year-by-year sample. 2021 and 2022 are represented mostly by end-of-module MCQ papers, 2023 largely by a recollection list, and 2025 by one end-of-year paper plus a case bank. An objective "disappearing" after 2022 usually means the later MCQ papers are missing, not that the faculty stopped asking. The drift worth trusting is structural, and there are four movements.

**The paper changed shape twice.** 2022 was one combined paper with fourteen short essays, twenty-nine MCQs and three extended-matching questions. By 2024 the MCQs and matching survive but the Anatomy section is ten flat 5-mark SAQs. By 2025 the MCQs have collapsed to twenty-six at half a mark, and Anatomy is the eight-SAQ, two-case structure the orientation sheet describes. The direction is consistent: fewer, heavier written questions, and MCQs falling from a full mark to a half.

**Clinical cases arrived and then expanded past the module.** Cases appear in 2022 (one, the mastectomy), in 2024 (two) and in 2025 (two on the paper) -- but the 2025 case bank carries twenty-two, of which eleven are lower limb and thorax. Whatever the 2025 paper itself did, the material students were told to prepare stopped being an upper-limb module.

**The end-of-module MCQ paper is substantially recycled year to year.** The 2023 end-of-module paper shares 45 of its 58 objectives with the 2022 one -- the same questions, often the same wording and the same distractors. The 2024 paper is a bigger break, sharing only 16-18 objectives with either.

**A small stable core spans everything.** Two objectives are asked in all five years: the types and fates of secondary lysosomes, and ulnar nerve injury and claw hand. Sixteen more span four of the five.

Years present: 2021, 2022, 2023, 2024, 2025. 114 rows carry no year at all -- the compiled question banks, the Baqoon (third-sitting) lists and the upper-limb formative assessment.

## 4. Marks

| Year | Questions printing a mark | Mark values used | Mean marks/question |
|---|---|---|---|
| 2022 | 10 | 2, 3, 4, 5 | 4.00 |
| 2024 | 28 | 4, 5 | 4.71 |
| 2025 | 32 | 3, 4, 6, 7 | 5.06 |

2021 and 2023 print no per-question marks anywhere in the corpus -- the 2021 papers are MCQ answer keys and 2023 survives only as a recollection list -- so they cannot be included.

The trend is steady inflation of the individual written question: mean 4.00 in 2022 across values of 2 to 5, 4.71 in 2024 with everything flattened to 4 or 5, and 5.06 in 2025 across 3 to 7. Against that, MCQs move the other way. The 2024 paper marks its MCQ section "{1 Mark each}"; the 2025 paper marks its twenty-six MCQs "{1/2 Mark each}". Written answers are worth progressively more and recognition questions progressively less.

### The orientation sheet's arithmetic is wrong, and the papers show which half to trust

The sheet states: *8 SAQ (2 basis-2 embryology) 6 marks each and (4 upper) 7 marks each with total 54 mark* plus *2 cases, 3 marks each with total 6 mark*, under a heading of 60 marks.

Four questions at 6 and four at 7 is 24 + 28 = **52**, not the 54 the sheet claims. Settling it from the paper rather than the sheet: the 2025 end-of-year Anatomy section prints its marks, and they are 6, 6, 6, 6, 7, 7, 7, 7 for the SAQs and 3, 3 for the two cases.

So the **per-question figures on the sheet are exactly right** and the paper follows them question for question. It is the **stated subtotal that is wrong**: 52, not 54. The real Anatomy written paper therefore totals **58 marks, not the 60** the sheet is headed with. The two-mark discrepancy in the subtotal is the whole of the shortfall -- 52 + 6 = 58, while the sheet's 54 + 6 = 60 only reaches the headline total because of the error. A student allocating revision time by marks should use 6/6/6/6/7/7/7/7/3/3, which is what the paper actually pays.

## 5. What surprised me

**The papers are recycled far more than the file count suggests.** Twenty-two PDFs are not twenty-two papers. Eight pairs are the same sitting twice -- an unsolved and a solved copy, or a student's recollection of the paper they had just sat. Once those are collapsed the corpus is about thirteen distinct sittings. And the recycling continues between sittings: the 2023 end-of-module paper is three-quarters the 2022 one.

**The single most repeated thing in the corpus is not a topic but a question format.** Kasr examines by comparison table -- eosinophil against neutrophil, mast cell against plasma cell, unilocular against multilocular fat, plasma cell against macrophage, oesophagus against urinary bladder, primary against secondary cartilaginous joint, superficial against deep palmar arch, anterior against posterior carpal arch. These are not eight instances of "know your cells"; each is a distinct objective with its own printed answer grid, and a student who has revised the two entities separately can still fail the comparison.

**Nerve injury outweighs nerve anatomy.** Across the blueprint, the MCQ bank and the case bank, the recurring winners are lesions, not descriptions: wrist drop, claw hand, winged scapula, Erb's palsy, carpal tunnel, flat shoulder. The orientation sheet anticipates this precisely -- its nerves clause ends "and the effect of injury" -- which makes it the one place where the sheet is a better guide to the paper than the subject tree is.

**The corpus quietly stopped being an upper-limb module.** Eleven objectives and twenty-two rows examine the lower limb and thorax, all through the 2025 case bank, and neither the orientation sheet nor the subject tree contains a word about either region.

**The extraction's own duplicates are informative rather than noise.** Where the same paper exists as both an unsolved and a solved copy, the solved copy sometimes settles an OCR ambiguity in the other -- the 2025 MCQ weighting reads as "{2 Mark each}" in the unsolved scan and "{1/2 Mark each}" in the solved one, and the half-mark is what makes the section total work.

## Appendix -- rows that could not be clustered

31 of 704 rows. Every one is an OCR casualty rather than a judgement call: the extractor split an MCQ across two rows and these are the halves carrying answer options but no question stem. They are listed rather than dropped so the count reconciles.

| Index | File | Why |
|---|---|---|
| 81 | EOM ISK EOM exam 2024.pdf | answer-option list only ("Responsible for cell digestion / Inner membrane form cristae ..."); the stem it belongs to was OCR'd into the preceding row |
| 91 | EOM ISK EOM exam 2024.pdf | answer-option list only ("Basophils / Lymphocytes / Eosinophils") with no question stem |
| 243 | EOM ISK 101 - 2023.pdf | single answer option ("Supraglenoid tubercle of the scapula.") split off its stem |
| 254 | EOM ISK 101 - 2023.pdf | single answer option about the medial wall of the axilla, split off its stem |
| 306 | EOM ISK End 101 — 2022.pdf | single answer option about the normal site of implantation, split off its stem |
| 314 | EOM ISK End 101 — 2022.pdf | single answer option ("Supraglenoid tubercle of the scapula.") split off its stem |
| 328 | EOM ISK End 101 — 2022.pdf | single answer option ("It gives posterior interosseous recurrent artery.") split off its stem |
| 331 | EOM ISK End 101 — 2022.pdf | single answer option ("It is most commonly dislocated inferiorly.") split off its stem |
| 334 | EOM ISK End 101 — 2022.pdf | single answer option ("Arises from radius, ulna and interosseous membrane.") split off its stem |
| 339 | EOM ISK End 101 — 2022.pdf | two answer options ("Thoracodorsal nerve / Suprascapular nerve") with no stem |
| 341 | EOM ISK End 101 — 2022.pdf | single answer option about sensation on the dorsum of the hand, split off its stem |
| 347 | EOY 195 first 2022  101 ISK  final mod | exam rubric, not a question ("The exam consists of 3 sections ...") |
| 358 | EOY 195 first 2022  101 ISK  final mod | column B of an extended-matching table (organelle functions) with no column A and no stem |
| 427 | EOM ISK 101 195 Answers.pdf | single answer option ("It arises from annular and lateral collateral ligament.") split off its stem |
| 429 | EOM ISK 101 195 Answers.pdf | single answer option ("is accompanied throughout its course by the basilic vein") split off its stem |
| 493 | EOM ISK End 101– 2021 (answers).pdf | single answer option ("It arises from annular and lateral collateral ligament.") split off its stem |
| 495 | EOM ISK End 101– 2021 (answers).pdf | single answer option ("is accompanied throughout its course by the basilic vein") split off its stem |
| 631 | EOY BAQOON 197 mcq&match 101 (1).pdf | stem destroyed by OCR ("1 latel ntains:"); probably the platelet granulomere question but not legible enough to assign |
| 645 | Anatomy Formative Assessment [Upper Li | three answer options ("Pectoralis minor / Subclavius / Clavipectoral fascia") with no stem |
| 650 | Anatomy Formative Assessment [Upper Li | answer options about the range of abduction lost, split off their stem |
| 653 | Anatomy Formative Assessment [Upper Li | answer options ("Rhomboid major / Trapezius / Medial border of the scapula") with no stem |
| 665 | Anatomy Formative Assessment [Upper Li | two answer options ("bicipital aponeurosis / ulnar nerve") with no stem |
| 675 | Anatomy Formative Assessment [Upper Li | two answer options ("extensor digiti minimi / extensor carpi ulnaris") with no stem |
| 677 | Anatomy Formative Assessment [Upper Li | single answer option ("most medial muscle arising from the common flexor origin") with no stem |
| 678 | Anatomy Formative Assessment [Upper Li | single answer option ("ulnar nerve passes between its two heads") with no stem |
| 689 | Anatomy Formative Assessment [Upper Li | single answer option ("2nd Dorsal metacarpal artery") with no stem |
| 690 | Anatomy Formative Assessment [Upper Li | single answer option ("Radialis indicis artery") with no stem |
| 693 | Anatomy Formative Assessment [Upper Li | answer options (forearm flexor muscles) with no stem |
| 695 | Anatomy Formative Assessment [Upper Li | single answer option ("palmaris longus") with no stem |
| 696 | Anatomy Formative Assessment [Upper Li | single answer option ("flexor carpi ulnaris") with no stem |
| 697 | Anatomy Formative Assessment [Upper Li | single answer option ("flexor digitorum superficialis") with no stem |

