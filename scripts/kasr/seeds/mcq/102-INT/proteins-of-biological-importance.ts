/**
 * `102 INT > Biochemistry > Proteins of Biological Importance` — the question
 * books' MCQs.
 *
 * The department book teaches this leaf on physical pages 11–16
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`): the four
 * orders of protein structure (primary through quaternary), the α-helix, the
 * β-pleated sheet, the bond types that stabilize tertiary structure,
 * denaturation, and the fibrous/globular conformational classification.
 *
 * Three rows (`p31-q1/q2/q3`) ask for the amino-acid-count nomenclature of
 * oligopeptide/polypeptide/protein. That fact is real and is in this same
 * department book — but one page earlier, on physical p10, inside the
 * "Amino Acids of Biological Importance" chapter's own text and article, not
 * this leaf's assigned p11–p16 range. Excluded rather than sourced from a
 * neighbouring chapter's pages.
 *
 * One row (`p33-q18`) has a printed key that the book's own text contradicts:
 * the book puts histidine in its ionic-bond-disruptor group, not its
 * ring-structure group, and no option states "ionic bonds only" for both
 * aspartate and histidine. Excluded rather than adjudicated against the book.
 *
 * One row (`p33-q19`) asks a specific numeric strand count the book never
 * states. Excluded as not taught.
 *
 * `protein-denaturation-effects` is reused verbatim from
 * `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` for the three
 * denaturation rows.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Proteins of Biological Importance',
  modulePath: '102 INT > Biochemistry > Proteins of Biological Importance',
  articleId: 'ART-102-BIO-PROTEINS-OF-BIOLOGICAL-IMPORTANCE',

  concepts: [
    {
      key: 'protein-structure-four-orders-by-chain-count',
      label:
        'Proteins in their native state are three-dimensional; a protein built of one polypeptide chain has primary, secondary and tertiary structure, and a protein built of two or more chains adds a quaternary structure that certain proteins like hemoglobin need for activity',
      definition:
        'Proteins in their native state are characterized by their three-dimensional structure. Proteins which are formed of one polypeptide chain have primary, secondary and tertiary structures, while proteins which are formed of two or more polypeptide chains have an additional quaternary structure. Quaternary structure is shown only by proteins with two or more polypeptide chains (subunits): each subunit keeps its own primary, secondary and tertiary structure, and the subunits combine to form the quaternary structure. This level of organization may be essential for the protein\'s activity, as it is for enzymes and for hemoglobin.',
      objective:
        'State how many structural orders a protein has depending on whether it is built of one or several polypeptide chains, and name a protein whose activity depends on its quaternary structure.',
      pitfall:
        'Assuming every protein reaches quaternary structure. Quaternary structure exists only when a protein has two or more chains combining as subunits; a single-chain protein stops at tertiary structure, however tightly it folds.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Biological Importance',
      type: 'classification',
      aliases: ['Orders of protein structure', 'Levels of protein structure'],
    },
    {
      key: 'primary-structure-sequence-and-termini',
      label:
        'Primary structure is the amino acid sequence held together by peptide bonds, running from an N-terminus amino acid on the left to a C-terminus amino acid on the right, synthesized in that same N-to-C direction, and it is the first of the four orders that the higher orders are built from',
      definition:
        'The primary structure refers to the amino acid sequence of the polypeptide chain, held together by peptide bonds made during protein biosynthesis; the sequence of any protein is specific to that protein. The polypeptide chain starts on the left side with amino acid number 1, which carries a free terminal amino group and is termed the N-terminus amino acid. On the right side, at the end, the chain carries an amino acid with a free terminal carboxylic group, termed the C-terminus amino acid. Synthesis of the polypeptide chain starts from the N-terminus end toward the C-terminus, with the amino acid sequence determined by the genetic information in DNA. Structure of proteins is organized into four orders in sequence — primary, secondary, tertiary and, for multi-chain proteins, quaternary — and the primary sequence, fixed first by peptide bonds during biosynthesis, is what the secondary and tertiary orders subsequently fold.',
      objective:
        'Identify which end of a polypeptide chain is the N-terminus and which is the C-terminus, state the direction in which the chain is synthesized, and explain why the primary sequence underlies the higher orders of structure.',
      pitfall:
        'Reversing the termini — putting the free carboxyl group on the left and the free amino group on the right. The book\'s own convention is fixed: N-terminus (free amino group) on the left where synthesis starts, C-terminus (free carboxyl group) on the right where it ends.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Biological Importance',
      type: 'structural_description',
      aliases: ['N-terminus', 'C-terminus', 'Primary structure of proteins'],
    },
    {
      key: 'secondary-structure-alpha-helix-formation-and-disruption',
      label:
        'Secondary structure is mainly α-helix or β-pleated sheet; the α-helix coils the chain along its long axis and is held by intra-chain hydrogen bonds between NH and C=O of different peptide bonds, with R-groups projecting outward, and is disrupted by ionic-bond-forming or ring-structure side chains — while collagen forms its own left-handed helix rather than the ordinary right-handed one',
      definition:
        'Secondary structure includes mainly two regular forms, α-helical or β-pleated sheets, alongside other forms such as loop regions, β-bends and disordered regions. The α-helix is a folding of the polypeptide chain along its long axis into a specific coiled structure, held together by hydrogen bonds; folding can be right-handed, as in most proteins, or left-handed, as in collagen. In the α-helix, the backbone is tightly coiled around the long axis to form a coil, and the helix is stabilized by intra-chain hydrogen bonds formed between the NH group of one peptide bond and the C=O group of another peptide bond — every peptide bond takes part, which gives the helix maximum stability. The R-groups of the amino acids project outwards of the helix. Some R-groups disrupt the α-helical structure: histidine, lysine, arginine, aspartic acid and glutamic acid do so by forming ionic bonds, while proline and tryptophan disrupt it because their ring structures interfere with the helical formation.',
      objective:
        'Describe how the α-helix is formed and stabilized, where its R-groups point, which side chains disrupt it and by what mechanism, and note that collagen\'s own helix is left-handed rather than the usual right-handed form.',
      pitfall:
        'Mixing up which residues disrupt the helix by ionic bonds and which by ring structures. The book keeps them as two separate lists — histidine, lysine, arginine, aspartic acid and glutamic acid disrupt it through ionic bonds; proline and tryptophan disrupt it through their ring structures — and a student who blends the two lists (e.g. attributing histidine\'s disruption to its ring) has the mechanism right for the wrong residue.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Biological Importance',
      type: 'structure_function_relationship',
      aliases: ['Alpha helix', 'α-helix', 'Secondary structure of proteins'],
    },
    {
      key: 'beta-pleated-sheet-formation-and-directionality',
      label:
        'β-pleated sheets form when chain segments line up side by side — within one chain (intra-chain hydrogen bonds) or between chains (inter-chain hydrogen bonds) — with side chains above or below the sheet plane, and are called parallel when the segments run the same N-to-C direction or antiparallel when they run opposite directions',
      definition:
        'β-pleated sheets can be formed within a single polypeptide chain or between multiple polypeptide chains. If two or more segments of a single chain are arranged side by side, a β-pleated sheet is formed and is stabilized by intra-chain hydrogen bonds. When multiple polypeptide chains are involved, the chains are stabilized instead by inter-chain hydrogen bonds. The R-groups of the amino acids project above or below the plane of the sheet. When the segments of the β-pleated sheet run in the same direction (N to C terminus), the structure is termed a parallel β-pleated sheet; when adjacent segments run in opposite directions, it is termed an antiparallel β-pleated sheet. An individual protein may contain both types of secondary structure.',
      objective:
        'State whether a β-pleated sheet within one chain or between chains is stabilized by intra- or inter-chain hydrogen bonds, where its side chains project, and distinguish parallel from antiparallel sheets by strand direction.',
      pitfall:
        'Swapping intra- and inter-chain hydrogen bonds. The sheet formed by segments of the same chain folding back on itself is intra-chain; the sheet formed between separate chains is inter-chain — the word describes where the two hydrogen-bonded strands come from, not the sheet itself.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Biological Importance',
      type: 'structure_function_relationship',
      aliases: ['Beta pleated sheet', 'β-pleated sheet', 'Parallel and antiparallel sheets'],
    },
    {
      key: 'tertiary-structure-stabilizing-interactions',
      label:
        'Tertiary structure folds a polypeptide chain into a specific 3D globular shape, held by hydrophobic interactions between nonpolar side chains, electrostatic bonds between oppositely charged side chains, disulfide bonds between cysteines, hydrogen bonds involving hydroxyl/amide/carboxylic/ring-nitrogen groups, and weak Van der Waals interactions',
      definition:
        'Tertiary structure is the folding of the polypeptide chain of a protein into a specific higher three-dimensional globular structure, maintained by several types of bonds or interactions. Hydrophobic interactions are the tendency of nonpolar compounds to cluster together in an aqueous medium; the nonpolar side chains of neutral amino acids tend to associate together in proteins. Electrostatic bonds (salt bridges or ionic bonds) form between oppositely charged groups of amino acid side chains, for example lysine (positively charged) and aspartic acid (negatively charged) at physiological pH. Disulfide bonds form when two cysteine residues connect to form cystine, as in keratin and insulin. Hydrogen bonds involve amino acid side chains — the hydroxyl group of amino acids such as serine and threonine, the amide group of glutamine and asparagine, the carboxylic group of aspartic and glutamic acids, and the ring nitrogen of histidine can all take part in internal hydrogen bond formation. Van der Waals interactions are transient attractions between molecules at the Van der Waals distance; these weak interactions also contribute to protein stability.',
      objective:
        'List the five kinds of interaction that hold the tertiary structure together and give the specific residues or side-chain groups involved in each.',
      pitfall:
        'Assigning a bond type to the wrong side chain — for example crediting threonine\'s hydroxyl group with an amide-type hydrogen bond, which belongs to glutamine and asparagine instead, or aspartate\'s carboxylic group with the hydroxyl-type bond that belongs to serine and threonine.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Biological Importance',
      type: 'structure_function_relationship',
      aliases: ['Tertiary structure', 'Protein tertiary structure stabilization'],
    },
    {
      // Reused verbatim from docs/Kasr-Source-Imports/concept/102-INT-concepts.md
      // (canonical_key: protein-denaturation-effects, id: CON-FND-2414B3639FD4D3).
      key: 'protein-denaturation-effects',
      label:
        'Denaturation ruptures the bonds holding secondary, tertiary and quaternary structure, leaving the primary sequence intact but the protein insoluble, more viscous, more digestible and biologically dead',
      definition:
        'Denaturation breaks the bonds that stabilise the secondary, tertiary and quaternary orders, leaving only the primary structure. The protein loses solubility as its nonpolar groups become exposed, viscosity rises, digestibility by proteolytic enzymes rises because peptide bonds are exposed, biological activity is lost, and antigenic property is lost.',
      objective:
        'List the effects of denaturation on a protein and say which level of structure survives it.',
      pitfall:
        'Saying the peptide bonds are broken. Denaturation leaves the primary structure untouched — that is why a denatured protein is more digestible rather than already digested.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Biological Importance',
      type: 'mechanism',
    },
    {
      key: 'protein-conformational-classification-fibrous-globular',
      label:
        'Depending on their conformation, proteins are classified as fibrous — chains arranged in parallel along a single axis into long fibers or sheets, as in collagen, elastin and α-keratin — or globular — tightly folded into compact spherical shapes, as in most enzymes, hemoglobin, myoglobin, many hormones, immunoglobulins and plasma proteins',
      definition:
        'Depending on their conformation, proteins are classified into two major classes: fibrous and globular. Fibrous proteins consist of polypeptide chains arranged in a parallel form along a single axis to yield long fibers or sheets, for example collagen, elastin and α-keratin. Globular proteins are tightly folded into compact spherical or globular shapes, for example most enzymes, hemoglobin, myoglobin, many hormones, immunoglobulins and plasma proteins.',
      objective: 'Classify a named protein as fibrous or globular from the book\'s own examples.',
      pitfall:
        'Assuming shape correlates with function in a way the book doesn\'t state — e.g. that fibrous proteins are always structural and globular proteins are always active. The book\'s classification is by conformation and gives named examples; it draws no further generalization.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Biological Importance',
      type: 'classification',
      aliases: ['Fibrous proteins', 'Globular proteins', 'Conformational classification of proteins'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p31-q1',
      conceptKey: 'protein-structure-four-orders-by-chain-count',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'Peptide-chain-length nomenclature (oligopeptide/polypeptide/protein by amino acid count) is taught on physical p10, in the Amino Acids of Biological Importance chapter\'s own page text, not within this chapter\'s assigned physical range (p11–p16) — belongs to that leaf/article, not this one.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p31-q2',
      conceptKey: 'protein-structure-four-orders-by-chain-count',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'Same as p31-q1: the oligopeptide/polypeptide/protein nomenclature is on physical p10, in the Amino Acids of Biological Importance chapter, outside this chapter\'s assigned p11–p16 range.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p31-q3',
      conceptKey: 'protein-structure-four-orders-by-chain-count',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'Same as p31-q1/q2. Has a clean printed key ("b", polypeptide), but the definition needed to ground it — "polypeptides contain from 11 to 49 amino acids" — is on physical p10, in the Amino Acids of Biological Importance chapter, outside this chapter\'s assigned p11–p16 range.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p31-q4',
      conceptKey: 'protein-structure-four-orders-by-chain-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'State that a single-chain protein has primary, secondary and tertiary structure only, without a quaternary level.',
      explanations: {
        a: 'Pentagonal structure names nothing the book describes, and starting the list at tertiary skips over primary and secondary altogether — a single-chain protein still has all three of the lower orders.',
        b: 'Same problem as the pentagonal option with a different invented shape name; a single chain does not reach quaternary structure at all, so quaternary should not be on this list.',
        c: 'Correct. A protein built of one polypeptide chain has primary, secondary and tertiary structure; quaternary structure requires two or more chains.',
        d: 'Adds quaternary structure, which only appears when two or more polypeptide chains combine as subunits — a single chain never reaches it.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p31-q5',
      conceptKey: 'protein-structure-four-orders-by-chain-count',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'State that a multi-chain protein adds quaternary structure on top of primary, secondary and tertiary.',
      explanations: {
        a: 'Pentagonal structure is not a level the book recognises, and this list also skips primary and secondary, which a multi-chain protein still has.',
        b: 'Hexagonal structure is likewise not one of the book\'s four orders, and the list again omits primary and secondary.',
        c: 'This is the set for a single-chain protein. A protein with two or more chains adds a fourth, quaternary, level on top of these three.',
        d: 'Correct. Two or more chains combine as subunits into a quaternary structure, on top of the primary, secondary and tertiary structure each subunit already has on its own.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p31-q6',
      conceptKey: 'protein-structure-four-orders-by-chain-count',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that a protein\'s native state is three-dimensional.',
      explanations: {
        a: 'A one-dimensional description would be the amino acid sequence alone — the primary structure — not the folded native protein.',
        b: 'Two dimensions is not a description the book uses for any level of protein structure.',
        c: 'Correct. The book states directly that proteins in their native state are characterized by their three-dimensional structure — the folded shape built from primary through tertiary (and, for some, quaternary) structure.',
        d: 'Five dimensions is not a real description of anything in the book; it is a distractor with no basis in the text.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p31-q7',
      conceptKey: 'primary-structure-sequence-and-termini',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Identify the N-terminus as the amino acid that starts the polypeptide chain on the left.',
      explanations: {
        a: 'Correct. The book states the polypeptide chain starts on the left side with amino acid number 1, which carries a free terminal amino group and is termed the N-terminus amino acid.',
        b: 'The C-terminus, with its free carboxylic group, is the book\'s name for the end of the chain on the right, not the start on the left.',
        c: 'S-terminus names no group the book describes; it invents a sulfur-based terminus that does not exist in the primary structure it teaches.',
        d: 'OH-terminus is likewise not a term the book uses; no hydroxyl group defines either end of the chain.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p32-q8',
      conceptKey: 'primary-structure-sequence-and-termini',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Identify the C-terminus as the amino acid that ends the polypeptide chain on the right.',
      explanations: {
        a: 'N-terminus, with its free amino group, is the book\'s name for the start of the chain on the left, not the end on the right.',
        b: 'Correct. The book states that at the end, on the right side, the chain carries an amino acid with a free terminal carboxylic group, termed the C-terminus amino acid.',
        c: 'S-terminus is not a term the book uses for either end of the chain.',
        d: 'OH-terminus is likewise not one of the book\'s two termini.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p32-q9',
      conceptKey: 'primary-structure-sequence-and-termini',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State that polypeptide synthesis proceeds from the N-terminus toward the C-terminus.',
      explanations: {
        a: 'Correct. The book states synthesis of the polypeptide chain starts from the N-terminus end toward the C-terminus, with the sequence determined by the genetic information in DNA.',
        b: 'Reverses the book\'s stated direction; synthesis runs from the N- toward the C-terminus, not the other way.',
        c: 'Invents an S-terminus that the book never names as a starting point for synthesis.',
        d: 'Invents the same nonexistent S-terminus as the wrong starting point, and still gets the direction of travel wrong.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p32-q10',
      conceptKey: 'primary-structure-sequence-and-termini',
      difficulty: 'Challenging',
      questionType: 'Mechanism',
      learningObjective:
        'Recognise the primary structure as the amino acid sequence laid down first, which the higher orders of structure are built from by folding.',
      explanations: {
        a: 'Correct. The book lays out the four orders of structure in sequence — primary first, as the amino acid sequence fixed by peptide bonds during biosynthesis — and describes the secondary and tertiary orders as further folding of that same chain; the sequence set at the primary level is what the higher orders fold.',
        b: 'The reverse of the book\'s own ordering: primary structure is the first of four orders, not the final one — tertiary (or quaternary, for multi-chain proteins) is the higher, later order.',
        c: 'The book\'s own example of a functionally essential order is the quaternary structure of hemoglobin, not the primary sequence on its own.',
        d: 'The α-helix is a secondary-structure feature, one specific folded form the chain can take — it is not part of the primary structure, which is the unfolded amino acid sequence.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p32-q11',
      conceptKey: 'secondary-structure-alpha-helix-formation-and-disruption',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name α-helix and β-pleated sheet as the two main forms of secondary structure.',
      explanations: {
        a: 'Repeats \'a-\' for both forms; the book pairs the α-helix with the β-pleated sheet, not with a second α form.',
        b: 'There is no "β-helix" in the book; the two regular secondary structures are the α-helix and the β-pleated sheet.',
        c: 'Correct. The book states secondary structure includes mainly two regular forms, α-helical or β-pleated sheets.',
        d: '"β-globular sheets" is not a term the book uses; "globular" describes a class of whole proteins by conformation, not a secondary-structure form.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p32-q12',
      conceptKey: 'secondary-structure-alpha-helix-formation-and-disruption',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Describe the α-helix as a coiling of the chain along its own long axis.',
      explanations: {
        a: 'Correct. The book describes the α-helix as a folding of the polypeptide chain along its long axis into a specific coiled structure.',
        b: 'Perpendicular coiling is not how the book describes the helix; the coiling runs along the chain\'s own long axis, not across it.',
        c: 'Chains lying side by side is how the book describes β-pleated sheet formation, not the α-helix, which is a single coiled chain.',
        d: 'Chains crossing each other describes neither structure the book teaches; the α-helix is one chain coiling around its own axis.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p32-q13',
      conceptKey: 'beta-pleated-sheet-formation-and-directionality',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'Describe β-pleated sheet formation as chain segments lining up side by side.',
      explanations: {
        a: 'Crossing chains is not how the book describes sheet formation; the segments line up side by side, and "crossing" is not the geometry given for any secondary structure.',
        b: 'Combines two errors — crossing is not the book\'s geometry, and "coils" describes the α-helix, not the β-pleated sheet.',
        c: 'Side by side is correct, but the resulting structure is a sheet, not a coil — "coil" is the α-helix\'s shape, not the β-pleated sheet\'s.',
        d: 'Correct. The book states that when two or more segments of chain are arranged side by side, a β-pleated sheet is formed.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p32-q14',
      conceptKey: 'secondary-structure-alpha-helix-formation-and-disruption',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        'State that the α-helix is stabilized by intra-chain hydrogen bonds between the NH and C=O of different peptide bonds in the same chain.',
      explanations: {
        a: 'Inter-chain hydrogen bonds stabilize β-pleated sheets formed between separate chains; the α-helix is a single chain coiling on itself, so its bonds are intra-chain.',
        b: 'Correct. The book states the α-helix is stabilized by intra-chain hydrogen bonds, formed between the NH group of one peptide bond and the C=O group of another peptide bond in the same chain.',
        c: 'Ionic bonds are not what the book credits with α-helix stability; hydrogen bonds are, and in any case ionic bonds between certain side chains are described as disrupting the helix, not stabilizing it.',
        d: 'Combines two errors: ionic bonds are described as disruptive to the helix, not stabilizing, and the stabilizing hydrogen bonds are the correct bond type here, not ionic bonds.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p32-q15',
      conceptKey: 'secondary-structure-alpha-helix-formation-and-disruption',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        'Identify the NH and C=O groups of the peptide bond as the partners in the α-helix\'s stabilizing hydrogen bonds.',
      explanations: {
        a: 'Correct. The book specifies the α-helix\'s intra-chain hydrogen bonds form between the NH group of one peptide bond and the C=O group of another.',
        b: 'The R-group is not one of the book\'s stated partners; the bond is between backbone NH and C=O groups of the peptide bonds, not a side chain.',
        c: 'Same substitution error as the NH/R- option, with the R-group swapped in for the NH partner instead — the book keeps both partners as backbone peptide-bond groups.',
        d: 'SH belongs to cysteine\'s side chain, relevant to disulfide bonds elsewhere in the book, not to the α-helix\'s hydrogen bonding, which involves NH and C=O.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p33-q16',
      conceptKey: 'secondary-structure-alpha-helix-formation-and-disruption',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that the R-groups of an α-helix project outward from the coil.',
      explanations: {
        a: 'Inward projection would crowd the R-groups into the helix\'s core; the book states they project outwards, away from the axis.',
        b: 'Correct. The book states the R-groups of amino acids project outwards of the helix.',
        c: 'Upwards is not the direction the book gives; the helix is a coil around a long axis, and the R-groups point outward from that axis, not along it.',
        d: 'Downwards has the same problem as upwards — it describes motion along the helix\'s axis rather than the outward projection the book states.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p33-q17',
      conceptKey: 'secondary-structure-alpha-helix-formation-and-disruption',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that tryptophan\'s ring structure disturbs the α-helix.',
      explanations: {
        a: 'The book names tryptophan among the residues that disrupt the helix, not residues that reinforce it.',
        b: 'The opposite of what the book states — tryptophan\'s ring structure is one of the two named causes of helix disruption, not stabilization.',
        c: 'Correct. The book lists tryptophan, alongside proline, as disrupting the α-helical structure because its ring structure disturbs the helical formation.',
        d: 'The book gives tryptophan a specific, named disruptive effect on the helix; it is not neutral.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p33-q18',
      conceptKey: 'secondary-structure-alpha-helix-formation-and-disruption',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'Printed key names "Ionic bonds and ring structures," but the book\'s own text (p12) puts histidine, along with lysine, arginine, aspartic acid and glutamic acid, in the ionic-bond group and reserves ring-structure disruption for proline and tryptophan alone — so per the book, both aspartate and histidine disturb the helix by ionic bonds only, a combination none of the four options state; the printed key conflicts with the book and no option matches the book-supported answer.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p33-q19',
      conceptKey: 'beta-pleated-sheet-formation-and-directionality',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'The book describes how β-pleated sheets form (single or multiple chains, side by side) but never states a numeric range for how many adjacent strands combine to form one — not taught in the module book.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p33-q20',
      conceptKey: 'beta-pleated-sheet-formation-and-directionality',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that a β-sheet\'s R-groups project above or below the plane of the sheet.',
      explanations: {
        a: 'Correct. The book states the R-groups of amino acids project above or below the plane of the sheet.',
        b: 'Inside or outside the plane is not the book\'s description; "inside/outside" better fits a folded globular shape than a flat sheet.',
        c: 'Forward or backward does not describe the perpendicular projection the book gives; the R-groups project above or below the flat plane, not along it.',
        d: 'Away or near does not capture the book\'s specific geometry of projection above or below the sheet\'s plane.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p33-q21',
      conceptKey: 'beta-pleated-sheet-formation-and-directionality',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name antiparallel β-pleated sheet as the form with strands running in opposite directions.',
      explanations: {
        a: 'Parallel is the book\'s name for segments running in the same direction (N to C terminus), the opposite of what this stem describes.',
        b: 'Correct. The book states that when adjacent segments run in opposite directions, the structure is termed an antiparallel β-pleated sheet.',
        c: 'Perpendicular is not a term the book uses for β-sheet strand orientation; the two named orientations are parallel and antiparallel.',
        d: '"Separate" describes nothing about strand direction and is not a term the book uses for sheet classification.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p33-q22',
      conceptKey: 'beta-pleated-sheet-formation-and-directionality',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name parallel β-pleated sheet as the form with strands running in the same direction.',
      explanations: {
        a: 'Correct. The book states that when segments of the β-pleated sheet run in the same direction (N to C terminus), the structure is termed a parallel β-pleated sheet.',
        b: 'Antiparallel is the book\'s name for the opposite case, strands running in opposite directions.',
        c: 'Perpendicular is not one of the book\'s two named strand orientations.',
        d: '"Separate" is not a term the book uses to classify strand direction in a β-pleated sheet.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p34-q23',
      conceptKey: 'beta-pleated-sheet-formation-and-directionality',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that a β-sheet built from separate chains is held by inter-chain hydrogen bonds.',
      explanations: {
        a: 'Correct. The book states that in the case of multiple polypeptide chains, the chains involved in β-pleated sheet formation are stabilized by inter-chain hydrogen bonds.',
        b: 'Intra-chain hydrogen bonds stabilize a sheet formed by segments of a single chain folding on itself, not a sheet built from separate chains.',
        c: 'Ionic bonds are not the bond type the book credits with β-sheet stability in either case; hydrogen bonds are, whether intra- or inter-chain.',
        d: 'Combines two errors — ionic bonds are the wrong bond type, and intra-chain is the wrong scope for a sheet built between separate chains.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p34-q24',
      conceptKey: 'beta-pleated-sheet-formation-and-directionality',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that a β-sheet built within one chain is held by intra-chain hydrogen bonds.',
      explanations: {
        a: 'Inter-chain hydrogen bonds stabilize a sheet built between separate chains; a sheet formed within one chain\'s own regions is intra-chain.',
        b: 'Correct. The book states that when two or more segments of a single polypeptide chain are arranged side by side, the resulting β-pleated sheet is stabilized by intra-chain hydrogen bonds.',
        c: 'Ionic bonds are not the stabilizing bond type the book gives for β-pleated sheets, whichever scope is chosen; hydrogen bonds are.',
        d: 'Intra-chain is the right scope, but ionic bonds are the wrong bond type — the book specifies hydrogen bonds for this structure.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p34-q25',
      conceptKey: 'secondary-structure-alpha-helix-formation-and-disruption',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective:
        'Recognise that collagen\'s helix is left-handed, distinct from the ordinary right-handed α-helix most proteins use.',
      explanations: {
        a: '"a-pleated sheet" names nothing the book describes, and in any case collagen\'s helix is explicitly the left-handed exception to the ordinary α-helix, not a standard α-helix at all.',
        b: 'There is no "β-helix" in the book\'s account of secondary structure, for collagen or any other protein.',
        c: 'The ordinary α-helix/β-pleated-sheet pairing describes most proteins\' secondary structure, but the book specifically singles out collagen as forming a left-handed helix where most proteins form a right-handed one — collagen is the stated exception, not an example of the ordinary pairing.',
        d: 'Correct. The book notes that helical folding is right-handed in most proteins but left-handed in collagen — marking collagen\'s helix out from the standard forms described for secondary structure, consistent with collagen having its own characteristic secondary structure.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p34-q26',
      conceptKey: 'tertiary-structure-stabilizing-interactions',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that tertiary structure folds a polypeptide chain into a higher three-dimensional globular structure.',
      explanations: {
        a: 'Two dimensions understates the fold; the book specifies a higher three-dimensional globular structure, not a flat, two-dimensional one.',
        b: 'Correct. The book states tertiary structure is the folding of the polypeptide chain into a specific higher three-dimensional globular structure.',
        c: 'Four dimensions is not a description the book applies to any level of protein structure.',
        d: 'Five dimensions, likewise, is not a real description used anywhere in the book.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p34-q27',
      conceptKey: 'tertiary-structure-stabilizing-interactions',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective:
        'Identify the nonpolar side chains of neutral amino acids as the ones clustering together in hydrophobic interactions.',
      explanations: {
        a: 'Correct. The book states the nonpolar side chains of neutral amino acids tend to associate together in proteins, driven by their tendency to cluster away from the surrounding aqueous medium.',
        b: 'Acidic amino acids are charged at physiological pH, which is what makes them polar, not nonpolar — the hydrophobic clustering the book describes is specifically among neutral, nonpolar side chains.',
        c: 'Polar side chains are the opposite of what associates hydrophobically; hydrophobic interactions are driven by nonpolar groups avoiding water, not polar ones.',
        d: 'Same error as the acidic-polar option with an alkaline side chain substituted — polar side chains, charged or not, are not what the book credits with hydrophobic clustering.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p34-q28',
      conceptKey: 'tertiary-structure-stabilizing-interactions',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'State that electrostatic (ionic) bonds in tertiary structure form between oppositely charged side chains.',
      explanations: {
        a: 'Uncharged groups cannot form an electrostatic bond, which by definition requires charge; the book\'s own example, lysine and aspartic acid, are both charged, just oppositely.',
        b: 'Correct. The book states electrostatic bonds (salt bridges or ionic bonds) form between oppositely charged groups of amino acid side chains, giving lysine (positive) and aspartic acid (negative) as the example.',
        c: 'Same-charged groups repel rather than bond; an electrostatic attraction requires opposite charges, as the book\'s lysine/aspartate example shows.',
        d: 'Two sulfur groups describes the disulfide bond, a different bond type the book covers separately from the electrostatic (ionic) bond.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p34-q29',
      conceptKey: 'tertiary-structure-stabilizing-interactions',
      difficulty: 'Hard',
      questionType: 'Mechanism',
      learningObjective:
        'Match each side-chain group the book names for tertiary-structure hydrogen bonding to the correct amino acid.',
      explanations: {
        a: 'Aspartate\'s side chain is carboxylic, not hydroxyl; the book lists aspartic acid\'s carboxylic group, not a hydroxyl group, among the hydrogen-bonding groups.',
        b: 'Correct. The book names the hydroxyl group of amino acids such as serine (and threonine) as taking part in internal hydrogen bond formation in the tertiary structure.',
        c: 'Threonine\'s group named by the book is a hydroxyl group, like serine\'s, not an amide group — the amide group belongs to glutamine and asparagine instead.',
        d: 'Methionine\'s sulfur is not among the groups the book lists for tertiary hydrogen bonding; disulfide bonds, a separate bond type, involve cysteine\'s sulfur, not methionine\'s.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p35-q30',
      conceptKey: 'tertiary-structure-stabilizing-interactions',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that Van der Waals interactions are weak forces contributing to tertiary structure stability.',
      explanations: {
        a: 'The book calls Van der Waals interactions weak, transient attractions, not strong bonds.',
        b: 'Correct. The book describes Van der Waals interactions as transient attractions between molecules that, as weak interactions, also contribute to the stability of proteins — introduced among the tertiary-structure interactions.',
        c: 'The book discusses Van der Waals interactions under tertiary structure, not secondary structure, and in any case calls them weak, not strong.',
        d: 'Primary structure is held by peptide bonds, not Van der Waals interactions, and the book calls these interactions weak, not strong.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p35-q31',
      conceptKey: 'tertiary-structure-stabilizing-interactions',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that a disulfide bond forms between two cysteine residues.',
      explanations: {
        a: 'Alanine\'s side chain has no sulfur to form a disulfide bond with; the book names cysteine specifically.',
        b: 'Tyrosine\'s side chain is a phenol, not a thiol, and is not the residue the book names for disulfide bonding.',
        c: 'Correct. The book states disulfide bonds are present in many proteins when two cysteine residues connect to form cystine, giving keratin and insulin as examples.',
        d: 'Serine\'s hydroxyl group takes part in hydrogen bonding elsewhere in the tertiary structure, not in disulfide bond formation, which the book reserves for cysteine.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p35-q32',
      conceptKey: 'protein-structure-four-orders-by-chain-count',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'Name quaternary structure as essential to hemoglobin\'s activity, per the book\'s own example.',
      explanations: {
        a: 'Primary structure is necessary for any protein but is not the level the book singles out as essential for hemoglobin\'s activity.',
        b: 'Secondary structure, likewise, is a prerequisite but not the specific level the book names for hemoglobin\'s function.',
        c: 'Tertiary structure is what a single subunit reaches on its own; hemoglobin\'s activity specifically depends on its subunits combining further, into quaternary structure.',
        d: 'Correct. The book states that this high level of organization — quaternary structure — may be essential for the activity of certain proteins, naming hemoglobin as an example.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p35-q33',
      conceptKey: 'protein-denaturation-effects',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that denaturation is a property specific to proteins.',
      explanations: {
        a: 'Correct. The book opens its denaturation section by stating that denaturation is a specific property of proteins — the change of a protein\'s native state by rupture of the bonds holding its secondary, tertiary and quaternary structure.',
        b: 'Carbohydrates are not described as undergoing denaturation anywhere in the book; the concept is specific to proteins\' folded structure.',
        c: 'Lipids, likewise, are not subject to denaturation in the book\'s account — denaturation is defined specifically as a property of proteins.',
        d: 'Water has no folded structure to lose; denaturation as the book defines it applies to proteins\' secondary, tertiary and quaternary structure.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p35-q34',
      conceptKey: 'protein-denaturation-effects',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that heat-induced albumin coagulation results from disulfide cross-linking.',
      explanations: {
        a: 'Ionic bonds are not the cross-link the book names for albumin\'s heat coagulation; it names disulfide cross-linking specifically.',
        b: '"Carboxyl cross linkage" is not a bond type the book describes for albumin coagulation or anywhere else in this section.',
        c: '"Glycoprotein cross linkage" is not a real bond type; it is not how the book describes the coagulation mechanism.',
        d: 'Correct. The book gives albumin coagulation by heat as its example of denaturation, occurring due to the formation of disulfide cross linkage.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p35-q35',
      conceptKey: 'protein-denaturation-effects',
      difficulty: 'Easy',
      questionType: 'Mechanism',
      learningObjective: 'List increased viscosity as one of the book\'s stated effects of protein denaturation.',
      explanations: {
        a: 'The book states denaturation decreases protein solubility, due to exposure of nonpolar hydrophobic groups — the opposite of this option.',
        b: 'Correct. The book lists increased viscosity among the effects of denaturation on proteins.',
        c: 'The book states denaturation increases digestibility by proteolytic enzymes, due to exposure of peptide bonds — the opposite of this option.',
        d: 'The book states denaturation causes loss of biologic activity, including inactivation of enzymes — the opposite of increased enzyme activity.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p35-q36',
      conceptKey: 'protein-conformational-classification-fibrous-globular',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name fibrous and globular as the two conformational classes of proteins.',
      explanations: {
        a: 'Simple and compound is a classification by composition, not the conformational classification the book gives here, which is fibrous and globular.',
        b: 'Glycoproteins and lipoproteins are classified by what is conjugated to the protein, not by conformation.',
        c: 'Correct. The book states that, depending on their conformation, proteins are classified into two major classes: fibrous and globular.',
        d: 'Essential and nonessential is a nutritional classification of amino acids, not a conformational classification of proteins.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p35-q37',
      conceptKey: 'protein-conformational-classification-fibrous-globular',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify collagen and elastin as fibrous proteins.',
      explanations: {
        a: 'Correct. The book gives collagen and elastin, alongside α-keratin, as its examples of fibrous proteins.',
        b: 'Globular is the book\'s other conformational class, illustrated instead by hemoglobin, myoglobin and enzymes, not by collagen or elastin.',
        c: 'Spherical is not one of the book\'s two conformational classes; it is closer in meaning to "globular," which collagen and elastin are not.',
        d: 'Cylindrical is not a term the book uses for protein conformation at all.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p36-q38',
      conceptKey: 'protein-conformational-classification-fibrous-globular',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Classify hemoglobin and myoglobin as globular proteins.',
      explanations: {
        a: 'Fibrous is the book\'s other conformational class, illustrated by collagen, elastin and α-keratin, not by hemoglobin or myoglobin.',
        b: 'Correct. The book lists hemoglobin and myoglobin among its examples of globular proteins, tightly folded into compact spherical shapes.',
        c: 'Apoprotein describes a protein lacking its non-protein prosthetic group (as apo-hemoglobin would lack heme) — a different distinction from the fibrous/globular conformational classification the question asks about.',
        d: 'Cylindrical is not a term the book uses for protein conformation.',
      },
    },
  ],
}
