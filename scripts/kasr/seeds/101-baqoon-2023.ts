/**
 * The 2023 Baqoon second-round paper for 101 ISK, as data.
 *
 * `EOY BAQOON 197 دور تاني` — sixteen pages, one question to a page, with a
 * running foot on every page that names the section and the round: `anatomy -
 * 197 دور ثان` on pages 2–12 and `Histo - 197 دور ثان` on pages 13–16. Ten
 * Anatomy questions and three Histology questions are printed in full. It has a
 * clean native text layer; nothing here is OCR.
 *
 * The batch code is 197 and the manifest derives calendar year 2023 from it;
 * `دور ثان` is the second round, so the tier is `resit`. That keeps its batch
 * name, `101-ISK-BAQOON-2023`, clear of the third-round 2024 Baqoon paper,
 * which is `101-ISK-BAQOON-2024`.
 *
 * ## Marks
 *
 * The paper prints no marks. Not a total on a cover — there is no cover beyond
 * a title page reading `101 / دور ثان 197` — and not a figure against any
 * question. Rather than invent a split, every seed carries the same `marks: 5`,
 * a uniform placeholder that weights no question above another, following the
 * 2024 Baqoon file which prints no marks either. It is not the examiner's
 * figure, and everything the generators derive from it — the paper total,
 * `exam_relevance`, `estimated_seconds`, `difficulty` — is a placeholder too. A
 * reviewer holding the real script should overwrite them.
 *
 * ## What this copy does not reproduce
 *
 * Three headings are printed with nothing under them, and they are recorded in
 * `SourceRef.incomplete` rather than passed over:
 *
 *   - page 12, `cases :` — the Anatomy section ends with a bare cases heading
 *     and an otherwise empty page. Every other Kasr paper in this module that
 *     prints a cases heading prints cases beneath it.
 *   - page 16, `match :` and `+MCQs` — likewise bare.
 *
 * So this is a thirteen-question transcript of a longer paper, and the
 * difference between "this sitting had no cases" and "we do not have its cases"
 * is the whole point of recording it.
 *
 * The companion file `EOY BAQOON 197 mcq&match 101 (1).pdf`
 * (src_d2867e081b0590fcee47) does not fill the gap. Its eight pages are
 * photographed screenshots with no text layer, and the page feet on those that
 * still carry one read `14/17`, `15/17`, `16/17` and `11/14` — the seventeen-
 * page July 2022 paper and the fourteen-page September 2022 paper, not this
 * sitting. Its multiple-choice and extended-matching items belong to the MCQ
 * lane and are not seeded here.
 *
 * ## Where the mark schemes come from
 *
 * Every `expects` line is the department's own book,
 * `scripts/kasr/extract/deptbook.json`, at the chapter on the seed's
 * `modulePath`. This paper has no solved copy and its tables are printed empty,
 * so there is no student answer to read either. Granularity follows the
 * department's July 2023 model answer in `scripts/kasr/extract/sittings.json`:
 * the name and the mechanism are separate points, and alternatives inside a
 * point are joined by OR.
 *
 * Two chapters are worth naming because the cluster's `subjectPath` and the
 * book's chapter disagree: the cubital fossa is described in the book's Forearm
 * chapter although `clusters.json` files it under Arm, and the abnormal sites
 * of implantation are in the Second Week chapter although `clusters.json` files
 * them under the First Week. The existing seeds' `modulePath` is followed in
 * both cases so the concepts deduplicate, and the `expects` come from the
 * chapter that actually holds the text.
 *
 * ## Keys
 *
 * Eleven of the thirteen are `clusters.json` keys verbatim, or — for
 * pectoralis, see below — the key an existing seed already used for the same
 * objective. Two are minted, each flagged on its seed:
 *
 *   - `elbow-anastomosis-arteries-origin` (A2). `clusters.json` has
 *     `scapular-anastomosis-arteries` and nothing for the elbow. They are
 *     different anastomoses out of different arteries, and the book describes
 *     them in different chapters.
 *   - `b-lymphocyte-percentage-surface-receptors` (H3). `clusters.json` carries
 *     `t-lymphocyte-subsets-cd4-cd8` and `nk-cell-features-markers` but no
 *     B-lymphocyte objective, and `plasma-cell-features-function` is the cell
 *     the B lymphocyte becomes, not the B lymphocyte.
 */
import type { Paper, Scheme, Seed, SourceRef } from './types.ts'

/** The manifest row this paper is. */
export const SOURCE: SourceRef = {
  id: 'src_f3d7ac13bbc97156212f',
  file: 'EOY BAQOON 197 دور تاني.pdf',
  sittingYear: 2023,
  tier: 'resit',
  sections: ['Anatomy', 'Histology'],
  incomplete: 'Three sections are printed as bare headings with nothing under them: `cases :` at the foot of the Anatomy section (p12), and `match :` and `+MCQs` at the foot of the Histology section (p16). The paper prints no marks and no counts for them, so how many questions are missing is not known — only that they were set. The thirteen questions here are the whole of what this copy reproduces.',
}

/** The paper prints no marks anywhere. Uniform, deliberately — see the header. */
const M = 5

export const SEEDS: Seed[] = [
  {
    // The paper's own words on this page are `compare :` and the cells of a
    // three-row table. The table is transcribed after the dash rather than
    // paraphrased, so every token below is one the paper prints.
    q: 1, section: 'Anatomy', page: 2, marks: M,
    asked: 'compare : Pectoralis major | Pectoralis minor — origin, insertion, Action',
    label: 'Pectoralis major and pectoralis minor differ in all three rows: origin, insertion and action',
    key: 'pectoralis-major-attachment-action-nerve',
    definition: 'Pectoralis major arises by a clavicular head from the anterior surface of the medial half of the clavicle and a sternocostal head from the anterior surface of the sternum, the upper six costal cartilages and the aponeurosis of external abdominal oblique, and inserts by a bilaminar tendon into the lateral lip of the intertubercular (bicipital) groove; supplied by the lateral and medial pectoral nerves, it adducts and medially rotates the arm, its clavicular head flexing the arm and its sternocostal head extending the flexed arm. Pectoralis minor arises from the outer surfaces of the 3rd, 4th and 5th ribs near their costal cartilages and inserts into the medial border and upper surface of the coracoid process; supplied by the medial pectoral nerve, it protracts and depresses the shoulder girdle and raises the ribs in forced inspiration when the scapula is fixed.',
    objective: 'Compare pectoralis major and pectoralis minor by origin, insertion and action.',
    pitfall: 'Giving pectoralis minor an action on the arm. It does not reach the humerus at all — it ends on the coracoid process, so everything it does is to the scapula or the ribs.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T03-S02-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Pectoral Region',
    type: 'comparison',
    aliases: ['Pectoralis minor', 'Muscles of the pectoral region'],
    conflicts: [
      'Three disagreements meet on this one question and none is resolved here. (1) `clusters.json` names the objective `pectoralis-major-attachment-nerve-action` while the 2025 EOY seed already carries it as `pectoralis-major-attachment-action-nerve` — the same four words in a different order, which mints two concepts for one idea. The existing seed key is used so this sitting deduplicates onto the 2025 concept rather than adding a third spelling. (2) Neither key names pectoralis minor, and the cluster does not cover it: its label and all three of its occurrences are pectoralis major alone, and `clusters.json` has no pectoralis minor objective anywhere — the muscle appears only inside `axillary-artery-parts-branches` and `clavipectoral-fascia-attachments-structures-piercing`, as a landmark. So half of what this question asks is filed under a key that does not claim it. (3) The cluster and the 2025 seed both include the nerve supply, which this paper does not ask for; it is left out of the scheme and kept in the concept definition. Flagged for reconciliation, not settled.',
    ],
  },
  {
    q: 2, section: 'Anatomy', page: 3, marks: M,
    asked: 'name the arteries share in anastomosis around elbow and give their origin',
    label: 'The anastomosis around the elbow joins collateral branches from above to recurrent branches from below, around each epicondyle',
    key: 'elbow-anastomosis-arteries-origin',
    definition: 'The anastomosis around the elbow joint is between the brachial artery above and the radial and ulnar arteries below, and the book describes it around the two epicondyles. Behind the medial epicondyle the superior ulnar collateral and the posterior branch of the inferior ulnar collateral, both from the brachial artery, meet the posterior ulnar recurrent from the ulnar artery; in front of it the anterior branch of the inferior ulnar collateral meets the anterior ulnar recurrent. Behind the lateral epicondyle the posterior descending (middle collateral) branch of the profunda brachii meets the posterior interosseous recurrent; in front of it the anterior descending (radial collateral) branch of the profunda brachii meets the radial recurrent from the radial artery. A transverse anastomosis lies above the olecranon fossa between the inferior ulnar collateral and the posterior descending branch of the profunda brachii.',
    objective: 'Name the arteries taking part in the anastomosis around the elbow and give the parent artery of each.',
    pitfall: 'Confusing it with the anastomosis around the scapula, which the papers ask at least as often. That one is subclavian to third-part-axillary, out of the suprascapular, deep transverse cervical, subscapular and circumflex scapular arteries; this one is brachial to radial and ulnar, out of collateral and recurrent branches.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-CVS-T01-S01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Arm',
    type: 'structural_description',
    aliases: ['Collateral circulation at the elbow', 'Peri-articular anastomosis of the elbow'],
    conflicts: [
      'New key, minted here. `clusters.json` has no objective for the anastomosis around the elbow. Its nearest entry is `scapular-anastomosis-arteries`, which is a different anastomosis between different arteries in a different chapter of the book, and the only other mention of the word is inside `elastic-fibres-orcein-staining`, where it describes fibres branching. Flagged rather than forced onto the scapular key.',
    ],
  },
  {
    q: 3, section: 'Anatomy', page: 4, marks: M,
    asked: 'mention the origin and branches of brachial plexus',
    label: 'The brachial plexus runs roots, trunks, divisions and cords, and each stage has its own branches',
    key: 'brachial-plexus-formation-branches',
    definition: 'The brachial plexus lies partly in the neck and partly in the axilla and consists of roots, trunks, divisions and cords. The roots are the ventral primary rami of C5 to T1. C5 and C6 unite as the upper trunk, C7 alone is the middle trunk, and C8 with T1 form the lower trunk; the trunks lie above the clavicle. Each trunk divides behind the clavicle into an anterior and a posterior division. The anterior divisions of the upper and middle trunks form the lateral cord, the anterior division of the lower trunk is the medial cord, and the posterior divisions of all three form the posterior cord; the cords lie in the axilla. Branches of the roots are the dorsal scapular nerve to the rhomboids and the long thoracic nerve to serratus anterior. The only trunk branches come from the upper trunk: the nerve to subclavius and the suprascapular nerve. The lateral cord gives the musculocutaneous nerve, the lateral root of the median and the lateral pectoral nerve; the medial cord gives the ulnar nerve, the medial root of the median, the medial pectoral nerve and the medial cutaneous nerves of arm and forearm; the posterior cord gives the radial and axillary nerves, the upper and lower subscapular nerves and the nerve to latissimus dorsi.',
    objective: 'Give the formation of the brachial plexus stage by stage and name the branches arising at each stage.',
    pitfall: 'Listing only the cord branches. The roots and the upper trunk give branches too, and the two nerves that come off the roots — dorsal scapular and long thoracic — are exactly the ones a cord lesion spares.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Axilla',
    type: 'structural_description',
    aliases: ['Plexus brachialis'],
  },
  {
    q: 4, section: 'Anatomy', page: 5, marks: M,
    asked: 'describe the anatomy of cubital fossa ( site, boundries, floor and contents )',
    label: 'The cubital fossa is a triangle in front of the elbow with brachialis and supinator for a floor',
    key: 'cubital-fossa-boundaries-contents',
    definition: 'The cubital fossa is an inverted triangular hollow in front of the elbow joint occupying the upper third of the front of the forearm. Its base is the line between the two epicondyles of the humerus, its lateral boundary is brachioradialis, its medial boundary is pronator teres, and its apex is where those two muscles meet. Its floor is brachialis medially and supinator laterally, and its roof is skin, superficial fascia and deep fascia with the bicipital aponeurosis. From medial to lateral it contains the median nerve, the termination of the brachial artery with the beginnings of the ulnar and radial arteries, the tendon of biceps, and the radial nerve with the beginning of its posterior interosseous branch.',
    objective: 'Give the site, boundaries, floor and contents of the cubital fossa, naming the contents in their medial-to-lateral order.',
    pitfall: 'Losing the order of the contents. Medial to lateral is median nerve, brachial artery, biceps tendon, radial nerve — and it is that order which puts the median nerve, not the artery, closest to the medial epicondyle.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Arm',
    type: 'structural_description',
    aliases: ['Antecubital fossa'],
  },
  {
    q: 5, section: 'Anatomy', page: 6, marks: M,
    asked: 'Mention beginning, end and branches of Brachial artery',
    label: 'The brachial artery runs from the lower border of teres major to the neck of the radius and gives six groups of branches',
    key: 'brachial-artery-origin-course-end-branches',
    definition: 'The brachial artery begins at the lower border of teres major as the continuation of the axillary artery, descends on the medial side of the shaft of the humerus, passes to the front of the arm and runs midway between the epicondyles into the cubital fossa, where it ends about a centimetre below the elbow joint at the level of the neck of the radius by dividing into the radial and ulnar arteries. It is superficial throughout, covered only by skin and fasciae, and accompanied by two venae comitantes. Its branches are the profunda brachii, the superior ulnar collateral, the inferior ulnar collateral, the nutrient artery to the humerus, muscular branches, and its two terminal branches.',
    objective: 'Give where the brachial artery begins, where and into what it ends, and enumerate its branches.',
    pitfall: 'Saying it ends at the elbow joint. It ends about a centimetre below it, at the neck of the radius and inside the cubital fossa, which is why the pulse is felt above the crease and the bifurcation is not.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-CVS-T01-S01'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Arm',
    type: 'structural_description',
    aliases: ['Arteria brachialis'],
  },
  {
    q: 6, section: 'Anatomy', page: 7, marks: M,
    asked: 'list. movements of shoulder joint and mention muscles produce it',
    label: 'Each movement at the shoulder joint has its own set of muscles, and above a right angle the scapula takes over',
    key: 'shoulder-joint-movements-muscles',
    definition: 'The shoulder is a polyaxial ball-and-socket joint. Flexion is by the clavicular head of pectoralis major, the anterior fibres of deltoid and coracobrachialis, assisted by the long head of biceps; extension by the posterior fibres of deltoid, teres major and latissimus dorsi, with the sternocostal head of pectoralis major extending the flexed arm. Abduction is by supraspinatus, which initiates it, and the middle (acromial) fibres of deltoid; adduction by pectoralis major, teres major, latissimus dorsi, coracobrachialis, subscapularis, infraspinatus and teres minor. Medial rotation is by pectoralis major, teres major, latissimus dorsi, the anterior fibres of deltoid and subscapularis; lateral rotation by infraspinatus, the posterior fibres of deltoid and teres minor. Circumduction combines all of these. Beyond about a right angle the greater tuberosity meets the coraco-acromial ligament and the arm is raised further by the scapula rotating upwards, by the upper and lower fibres of trapezius with the lower five digitations of serratus anterior.',
    objective: 'List the movements of the shoulder joint with the muscles producing each, and say where movement at the joint stops and scapular rotation takes over.',
    pitfall: 'Answering the whole of abduction with deltoid. Supraspinatus starts it, deltoid carries it to a right angle, and everything above that is upward rotation of the scapula — three different sets of muscles in one movement.',
    subject: 'msk', primary: 'DIS-ANA-T02', secondary: ['SYS-MSK-T01-S01-M03'],
    modulePath: '101 ISK > Anatomy > Upper Limb > Joints of Upper Limb',
    type: 'structure_function_relationship',
    aliases: ['Glenohumeral joint movements'],
  },
  {
    q: 7, section: 'Anatomy', page: 8, marks: M,
    asked: 'describe the characters and types of fibrous joint.',
    label: 'A fibrous joint has no cavity and is immobile, and comes as syndesmosis, gomphosis or suture',
    key: 'fibrous-joints-types-definition',
    definition: 'In a fibrous joint the bone surfaces are united by fibrous tissue and there is no joint cavity, so the joint is fixed or immobile. There are three types. A syndesmosis connects the bones by an interosseous ligament, as at the inferior tibio-fibular joint. A gomphosis holds the root of a tooth in its socket in the mandible or maxilla by the periodontal ligament. A suture connects skull bones by a thin layer of fibrous tissue called the sutural ligament, and is obliterated in old age.',
    objective: 'Give the characters of a fibrous joint and name and exemplify its three types.',
    pitfall: 'Calling every immobile joint fibrous. A primary cartilaginous joint is immobile too; what makes a joint fibrous is that the uniting tissue is fibrous and there is no cavity.',
    subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-MSK-T06-S01-M01'],
    modulePath: '101 ISK > Anatomy > Basis of Anatomy > Articular system',
    type: 'classification',
    aliases: ['Synarthrosis'],
  },
  {
    q: 8, section: 'Anatomy', page: 9, marks: M,
    asked: 'mention results of fertilization',
    label: 'Fertilisation makes the zygote, sets its sex, restores the diploid number and starts cleavage',
    key: 'fertilization-site-mechanism-results',
    definition: 'Fertilisation is the process by which sperm and ovum unite to form a zygote, and it occurs in the ampullary part of the uterine tube — its lateral third. Its results are the formation of the zygote; determination of the sex of the zygote, male (XY) or female (XX), according to the type of fertilising sperm; restoration of the diploid number of chromosomes; and the start of cleavage and of migration from the site of fertilisation to implantation in the uterine cavity.',
    objective: 'State the results of fertilisation.',
    pitfall: 'Stopping at "a zygote is formed". The department marks four results, and the two that are easiest to omit — restoring the diploid number and starting cleavage and migration — are the two that explain what happens next.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
    type: 'developmental_process',
    aliases: ['Conception'],
  },
  {
    q: 9, section: 'Anatomy', page: 10, marks: M,
    asked: 'give abnormal sites of implantation',
    label: 'Implantation goes wrong either low in the uterus or outside it altogether',
    key: 'implantation-abnormal-sites',
    definition: 'Implantation is the process by which the blastocyst becomes embedded in the superficial layers of the endometrium, and the abnormal sites divide into intrauterine and ectopic. Abnormal intrauterine implantation gives placenta previa, implantation in the lower uterine segment with the placenta related to the internal os, in complete (total), partial and marginal forms; and low-lying placenta, where the lower edge lies within two centimetres of the margin of the internal os. Ectopic implantation may be tubal — in the ampulla, the isthmus or the intramural part — ovarian, on the surface of the ovary, or omental, on the surface of the peritoneum. In tubal ectopic pregnancy rupture of the tube with internal haemorrhage is expected.',
    objective: 'Enumerate the abnormal sites of implantation, separating abnormal intrauterine sites from ectopic ones.',
    pitfall: 'Treating "abnormal site" as a synonym for "ectopic". Placenta previa is inside the uterus and is still an abnormal site of implantation, and it is the one that is a problem at delivery rather than in the first trimester.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > First Week of Development',
    type: 'clinical_correlation',
    aliases: ['Ectopic pregnancy', 'Placenta previa'],
  },
  {
    q: 10, section: 'Anatomy', page: 11, marks: M,
    asked: 'summrize notochrod',
    label: 'The notochord forms in four steps, guides the embryo, and ends as the nucleus pulposus',
    key: 'notochord-formation-fate',
    definition: 'The notochord is the temporary primitive axial skeleton of the embryonic disc and develops in four steps. The prenotochordal process is a solid cord of epiblast cells from the primitive pit that invaginates and extends cranially in the midline between ectoderm and endoderm as far as the bucco-pharyngeal membrane. The cavity of the primitive pit then extends into it as the notochordal canal, whose roof lies against ectoderm, whose floor is fused with endoderm and whose cavity is continuous with the amniotic cavity. Degeneration of that floor with the fused endoderm opens the neurenteric canal, a temporary communication between amniotic cavity and yolk sac, leaving roof and sides as the notochordal plate. The plate then folds on itself into the definitive notochord, a solid cord with no cavity, and the endoderm approximates and fuses beneath it so amniotic cavity and yolk sac are separate again. It is the temporary axial skeleton, its firmness limits the head fold during folding, and the vertebral column forms around it. Most of it degenerates; the part within the intervertebral disc persists as the nucleus pulposus.',
    objective: 'Summarise the notochord: its four steps of formation, its importance, and its fate.',
    pitfall: 'Saying the notochord becomes the vertebral column. It does not — the column forms around it and the notochord degenerates, surviving only as the nucleus pulposus of the intervertebral disc.',
    subject: 'dev', primary: 'DIS-EMB-T01', secondary: [],
    modulePath: '101 ISK > Anatomy > General Embryology > Third Week of Development',
    type: 'developmental_process',
    aliases: ['Notochordal plate', 'Nucleus pulposus'],
  },
  {
    q: 1, section: 'Histology', page: 13, marks: M,
    asked: 'discribe the histological structure of rER (LM, EM and function)',
    label: 'The rER is basophilic by light microscopy, ribosome-studded by electron microscopy, and makes export protein',
    key: 'rer-structure-function-protein-synthesis',
    definition: 'Rough endoplasmic reticulum is the organelle of protein-forming cells such as the plasma cell. By light microscopy it is what gives the cytoplasm its basophilia, from the RNA of the ribosomes on it. By electron microscopy it is parallel flattened cisternae, continuous with the outer nuclear envelope, studded on their outer surface with ribosomes attached by their large subunit at ribophorins. It synthesises export protein, segregates it and performs its initial glycosylation, packs it into transfer vesicles for the Golgi apparatus, protects the cytoplasm from hydrolytic enzymes, and serves as an intracellular pathway.',
    objective: 'Describe the rER as seen by light microscopy and by electron microscopy, and give its functions.',
    pitfall: 'Crediting the membrane with the basophilia. It is the RNA in the attached ribosomes that is acidic and takes the basic dye — which is why a cell packed with sER is acidophilic instead.',
    subject: 'fnd', primary: 'DIS-HIS-T01', secondary: [],
    modulePath: '101 ISK > Histology > Cytology > Cytoplasm',
    type: 'structure_function_relationship',
    aliases: ['Rough endoplasmic reticulum', 'Granular endoplasmic reticulum'],
  },
  {
    q: 2, section: 'Histology', page: 14, marks: M,
    asked: 'state the origin and describe the LM, EM of active fibroblast',
    label: 'The active fibroblast comes from the mesenchymal cell and is built to synthesise protein',
    key: 'fibroblast-features-function',
    definition: 'The fibroblast is the commonest cell of connective tissue proper and arises from the undifferentiated mesenchymal cell and from the pericyte. In its active state it is a branched cell with many long thin processes, deeply basophilic cytoplasm and a central large oval pale nucleus with a prominent nucleolus. By electron microscopy it is a protein-synthesising cell: well-developed rER and Golgi apparatus, many mitochondria and a euchromatic nucleus. The inactive form, the fibrocyte, is a smaller spindle cell with few processes, paler cytoplasm and a smaller darker nucleus with more heterochromatin and less rER, Golgi and mitochondria.',
    objective: 'State where the fibroblast comes from and describe the active fibroblast by light and electron microscopy.',
    pitfall: 'Describing the fibrocyte and calling it a fibroblast. The question asks the active cell — branched, deeply basophilic, pale euchromatic nucleus — and the inactive one is the opposite of it in every feature.',
    subject: 'fnd', primary: 'DIS-HIS-T02', secondary: [],
    modulePath: '101 ISK > Histology > Connective Tissue > Connective Tissue Cells',
    type: 'structural_description',
    aliases: ['Active fibroblast', 'Fibrocyte'],
  },
  {
    q: 3, section: 'Histology', page: 15, marks: M,
    asked: 'describe Large B-lymphocyte regarding percentage, surface receptors',
    label: 'B lymphocytes are told from T and NK cells only by their surface receptors, IgM and IgD',
    key: 'b-lymphocyte-percentage-surface-receptors',
    definition: 'Lymphocytes are 20–30% of the leucocytes, and by activity they are small or large; large lymphocytes are 5–10% of the leucocytes and 10–15 µm across, with a large indented pale nucleus, a clear nucleolus and abundant deeply basophilic cytoplasm, and they are either activated lymphocytes or natural killer cells. By function there are three kinds — T, B and natural killer — which look alike by light and electron microscopy and differ only in their surface receptors. B lymphocytes are 20–30% of the lymphocytes, with a life span of a few days to a few months. They mature in the bursa of Fabricius in birds and in the bone marrow in mammals, carry receptors for IgM and IgD, and mediate humoral immunity: on meeting their antigen and being activated by T-helper cells they become plasmablasts, then plasma cells producing antibody, and B memory cells.',
    objective: 'Give the percentage of the B lymphocyte and name the surface receptors it carries.',
    pitfall: 'Trying to recognise a B lymphocyte down the microscope. T, B and NK cells are identical by light and electron microscopy; the surface receptors are the only thing that separates them, which is why the question asks for those and not for a picture.',
    subject: 'haem', primary: 'DIS-HIS-T02', secondary: ['SYS-HEM-T01-S01-M02'],
    modulePath: '101 ISK > Histology > Blood > Non granular leukocytes',
    type: 'structural_description',
    aliases: ['B cell', 'Large lymphocyte'],
    conflicts: [
      'New key, minted here. `clusters.json` has an objective for the T lymphocyte (`t-lymphocyte-subsets-cd4-cd8`) and one for the natural killer cell (`nk-cell-features-markers`) but none for the B lymphocyte; the nearest, `plasma-cell-features-function`, is about the cell a B lymphocyte becomes and says nothing about its percentage or its surface receptors. `leukocyte-classification-granular-nongranular` only places the lymphocyte among the non-granular leucocytes. Flagged rather than filed under the plasma cell.',
    ],
  },
]

export const SCHEMES: Record<string, Scheme> = {
  A1: {
    format: 'comparison_table',
    prompt: 'Compare pectoralis major and pectoralis minor by origin, insertion and action.',
    expects: [
      'Pectoralis major arises by a clavicular head from the anterior surface of the medial half of the clavicle and a sternocostal head from the anterior surface of the sternum, the upper six costal cartilages and the aponeurosis of external abdominal oblique',
      'Pectoralis minor arises from the outer surfaces of the 3rd, 4th and 5th ribs near their costal cartilages',
      'Pectoralis major inserts by a bilaminar tendon into the lateral lip of the intertubercular (bicipital) groove',
      'Pectoralis minor inserts into the medial border and upper surface of the coracoid process',
      'Pectoralis major adducts and medially rotates the arm, its clavicular head flexing the arm and its sternocostal head extending the flexed arm',
      'Pectoralis minor protracts and depresses the shoulder girdle, and raises the ribs in forced inspiration when the scapula is fixed',
    ],
  },
  A2: {
    format: 'structured_written',
    prompt: 'Name the arteries sharing in the anastomosis around the elbow, and give the origin of each.',
    expects: [
      'The anastomosis is between the brachial artery above and the radial and ulnar arteries below',
      'Behind the medial epicondyle: the superior ulnar collateral artery and the posterior branch of the inferior ulnar collateral, both from the brachial artery, meeting the posterior ulnar recurrent artery from the ulnar artery',
      'In front of the medial epicondyle: the anterior branch of the inferior ulnar collateral, from the brachial artery, meeting the anterior ulnar recurrent artery from the ulnar artery',
      'Behind the lateral epicondyle: the posterior descending (middle collateral) branch of the profunda brachii meeting the posterior interosseous recurrent artery',
      'In front of the lateral epicondyle: the anterior descending (radial collateral) branch of the profunda brachii meeting the radial recurrent artery from the radial artery',
      'The profunda brachii, the superior ulnar collateral and the inferior ulnar collateral all arise from the brachial artery',
      'A transverse anastomosis above the olecranon fossa, between the inferior ulnar collateral and the posterior descending branch of the profunda brachii',
    ],
  },
  A3: {
    format: 'structured_written',
    prompt: 'Mention the origin of the brachial plexus and its branches.',
    expects: [
      'Roots: the ventral primary rami of C5, C6, C7, C8 and T1',
      'Trunks: C5 and C6 unite as the upper trunk, C7 alone is the middle trunk, C8 and T1 unite as the lower trunk — all three above the clavicle',
      'Divisions: each trunk divides behind the clavicle into an anterior and a posterior division, six in all',
      'Cords: the anterior divisions of the upper and middle trunks form the lateral cord, the anterior division of the lower trunk is the medial cord, the three posterior divisions form the posterior cord — all in the axilla',
      'Branches of the roots: the nerve to the rhomboids (dorsal scapular nerve) and the nerve to serratus anterior (long thoracic nerve)',
      'Branches of the trunks, from the upper trunk only: the nerve to subclavius and the suprascapular nerve',
      'Branches of the lateral cord: the musculocutaneous nerve, the lateral root of the median nerve and the lateral pectoral nerve',
      'Branches of the medial cord: the ulnar nerve, the medial root of the median nerve, the medial pectoral nerve, and the medial cutaneous nerves of the arm and of the forearm',
      'Branches of the posterior cord: the radial nerve, the axillary (circumflex) nerve, the upper and lower subscapular nerves and the nerve to latissimus dorsi (thoraco-dorsal nerve)',
    ],
  },
  A4: {
    format: 'structured_written',
    prompt: 'Describe the anatomy of the cubital fossa: its site, boundaries, floor and contents.',
    expects: [
      'Site: an inverted triangular hollow in front of the elbow joint, occupying the upper third of the front of the forearm',
      'Base: the line between the two epicondyles of the humerus',
      'Lateral boundary: brachioradialis',
      'Medial boundary: pronator teres',
      'Apex: where brachioradialis and pronator teres meet',
      'Floor: brachialis medially and supinator laterally',
      'Contents, from medial to lateral: the median nerve, which leaves between the two heads of pronator teres',
      'Then the termination of the brachial artery with the beginnings of the ulnar and radial arteries',
      'Then the tendon of biceps, and laterally the radial nerve with the beginning of its posterior interosseous branch',
    ],
  },
  A5: {
    format: 'structured_written',
    prompt: 'Mention the beginning, the end and the branches of the brachial artery.',
    expects: [
      'It begins at the lower border of teres major, as the continuation of the axillary artery',
      'It ends in the cubital fossa, about a centimetre below the elbow joint at the level of the neck of the radius',
      'It ends by dividing into the radial and ulnar arteries',
      'Branch: the profunda brachii artery, the largest and highest, arising just below the lower border of teres major',
      'Branch: the superior ulnar collateral artery, about the middle of the arm opposite the insertion of coracobrachialis',
      'Branch: the inferior ulnar collateral artery, above the elbow joint',
      'Branch: the nutrient artery to the humerus, and muscular branches to biceps, brachialis and coracobrachialis',
    ],
  },
  A6: {
    format: 'structured_written',
    prompt: 'List the movements of the shoulder joint and mention the muscles that produce each.',
    expects: [
      'Flexion: the clavicular head of pectoralis major, the anterior fibres of deltoid and coracobrachialis, assisted by the long head of biceps',
      'Extension: the posterior fibres of deltoid, teres major and latissimus dorsi, with the sternocostal head of pectoralis major extending the flexed arm',
      'Abduction: supraspinatus, which initiates it, then the middle (acromial) fibres of deltoid',
      'Adduction: pectoralis major, teres major, latissimus dorsi, coracobrachialis, subscapularis, infraspinatus and teres minor',
      'Medial rotation: pectoralis major, teres major, latissimus dorsi, the anterior fibres of deltoid and subscapularis',
      'Lateral rotation: infraspinatus, the posterior fibres of deltoid and teres minor',
      'Circumduction: a combination of all of these',
      'Above about a right angle the arm is raised by upward rotation of the scapula, by the upper and lower fibres of trapezius with the lower five digitations of serratus anterior, not by movement at the joint',
    ],
  },
  A7: {
    format: 'structured_written',
    prompt: 'Describe the characters of a fibrous joint and its types.',
    expects: [
      'Character: the bone surfaces are united by fibrous tissue',
      'Character: there is no joint cavity',
      'Character: the joint is fixed or immobile',
      'Type: syndesmosis, the bones connected by an interosseous ligament, as at the inferior tibio-fibular joint',
      'Type: gomphosis, the root of a tooth held in its socket in the mandible or maxilla by the periodontal ligament',
      'Type: suture, skull bones connected by a thin sutural ligament, obliterated in old age',
    ],
  },
  A8: {
    format: 'short_answer',
    prompt: 'Mention the results of fertilisation.',
    expects: [
      'Formation of the zygote',
      'Determination of the sex of the zygote, male (XY) OR female (XX), according to the type of fertilising sperm',
      'Restoration of the diploid number of chromosomes',
      'Start of cleavage',
      'Start of migration from the site of fertilisation to implantation in the uterine cavity',
    ],
  },
  A9: {
    format: 'structured_written',
    prompt: 'Give the abnormal sites of implantation.',
    expects: [
      'Abnormal intrauterine: placenta previa, implantation in the lower uterine segment with the placenta related to the internal os — complete (total), partial OR marginal',
      'Abnormal intrauterine: low-lying placenta, its lower edge within two centimetres of the margin of the internal os',
      'Ectopic: tubal — in the ampulla, the isthmus OR the intramural part',
      'Ectopic: ovarian, on the surface of the ovary',
      'Ectopic: omental, on the surface of the peritoneum',
      'In tubal ectopic pregnancy, rupture of the tube with internal haemorrhage is expected',
    ],
  },
  A10: {
    format: 'structured_written',
    prompt: 'Summarise the notochord: how it forms, why it matters, and what becomes of it.',
    expects: [
      'It is the temporary primitive axial skeleton of the embryonic disc, and it develops in four steps',
      'Prenotochordal process: a solid cord of epiblast cells from the primitive pit invaginates and extends cranially in the midline between ectoderm and endoderm as far as the bucco-pharyngeal membrane',
      'Notochordal canal: the cavity of the primitive pit extends into the process — roof against ectoderm, floor fused with endoderm, cavity continuous with the amniotic cavity',
      'Neurenteric canal and notochordal plate: the floor degenerates with the fused endoderm, temporarily joining amniotic cavity and yolk sac, and the roof and sides persist as the notochordal plate',
      'Definitive notochord: the plate folds on itself into a solid cord with no cavity, and the endoderm fuses beneath it so the two cavities are separate again',
      'Importance: the temporary axial skeleton; its firmness limits the head fold during folding; the vertebral column forms around it',
      'Fate: most of it degenerates, and the part within the intervertebral disc persists as the nucleus pulposus',
    ],
  },
  H1: {
    format: 'structured_written',
    prompt: 'Describe the histological structure of the rough endoplasmic reticulum by light microscopy and electron microscopy, and give its functions.',
    expects: [
      'LM: it is what makes the cytoplasm basophilic, and it is abundant in protein-forming cells such as the plasma cell',
      'EM: parallel flattened cisternae, continuous with the outer nuclear envelope',
      'EM: studded on the outer surface with ribosomes, bound by their large subunit at ribophorins',
      'Function: synthesis of export protein',
      'Function: segregation of that protein and its initial glycosylation',
      'Function: packing into transfer vesicles for the Golgi apparatus',
      'Function: protection of the cytoplasm from hydrolytic enzymes, and an intracellular pathway',
    ],
  },
  H2: {
    format: 'structured_written',
    prompt: 'State the origin of the fibroblast and describe the active fibroblast by light microscopy and electron microscopy.',
    expects: [
      'Origin: from the undifferentiated mesenchymal cell (UMC) OR from the pericyte',
      'LM: a branched cell with many long thin processes',
      'LM: deeply basophilic cytoplasm',
      'LM: a central large oval pale nucleus with a prominent nucleolus',
      'EM: a protein-synthesising cell with well-developed rER and Golgi apparatus',
      'EM: many mitochondria',
      'EM: a euchromatic nucleus',
    ],
  },
  H3: {
    format: 'structured_written',
    prompt: 'Describe the large B-lymphocyte: its percentage and its surface receptors.',
    expects: [
      'Percentage: large lymphocytes are 5–10% of the leucocytes, 10–15 µm in diameter, and a large lymphocyte is an activated lymphocyte OR a natural killer cell',
      'Percentage: of the lymphocytes, B lymphocytes are 20–30%, with a life span of a few days to a few months',
      'Percentage: lymphocytes as a whole are 20–30% of the leucocytes',
      'Surface receptors: receptors for IgM and IgD',
      'The surface receptors are the only difference between B, T and natural killer cells, which are alike by light and electron microscopy',
      'B lymphocytes mature in the bursa of Fabricius in birds and in the bone marrow in mammals, and mediate humoral immunity',
    ],
  },
}


export const PAPER: Paper = { source: SOURCE, seeds: SEEDS, schemes: SCHEMES }
