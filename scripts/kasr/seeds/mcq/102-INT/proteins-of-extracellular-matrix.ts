/**
 * `102 INT > Biochemistry > Proteins of Extracellular Matrix` — the question
 * books' MCQs.
 *
 * This chapter is cancelled for the 2025/2026 written exam (BIO ORIENTATION
 * 102, "A-Cancelled Items for Final Exam - Module 102/2026": "Proteins Of
 * Extracellular Matrix From page 44 to page 49", which is exactly the
 * printed range of this chapter) but is still taught and examined
 * practically, so it is authored normally here, against the department
 * book's physical p48–p53
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`): collagen's
 * structure and synthesis, the collagen/elastin comparison, and cartilage
 * and bone matrix proteins.
 *
 * `collagen-structural-strength-basis` is reused verbatim from
 * `docs/Kasr-Source-Imports/concept/102-INT-concepts.md` for the four rows
 * that test collagen's basic triple-helix composition.
 *
 * Five rows are excluded because the book names the relevant protein once,
 * in a one-line list, without teaching the fact the row asks for: fibronectin's
 * binding sites and chain structure (`p39-q10`, `p39-q11`), fibrillin's link
 * to Marfan's syndrome (`p39-q12`), collagen mutation in osteogenesis
 * imperfecta (`p39-q8`), and copper's role in collagen cross-linking
 * (`p38-q7`, where the book states vitamin C, not copper, as a cofactor and
 * never mentions copper at all in this chapter).
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Proteins of Extracellular Matrix',
  modulePath: '102 INT > Biochemistry > Proteins of Extracellular Matrix',
  articleId: 'ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX',

  concepts: [
    {
      // Reused verbatim from docs/Kasr-Source-Imports/concept/102-INT-concepts.md
      // (canonical_key: collagen-structural-strength-basis, id: CON-FND-14647EC60106E1).
      key: 'collagen-structural-strength-basis',
      label:
        'Collagen is strong because every level of its structure is built for tightness — three residues per turn, glycine in every third position, a right-handed superhelix of left-handed chains, hydroxyproline hydrogen bonds, and covalent cross-links between chains',
      definition:
        'The building unit of collagen is tropocollagen: three left-handed alpha-chains twisted into a right-handed superhelix, each chain about a thousand amino acids of the repeating triplet Gly-X-Y, where X is proline and Y hydroxyproline. Seven features give it its strength. Each turn contains only three amino acid residues, making a tight helix where an ordinary protein has 3.6. Glycine, in every third position, has a side chain short enough to let the chains lie very close together. The three left-handed chains form a right-handed superhelix. The high hydroxyproline content forms hydrogen bonds between chains. Covalent cross-links between adjacent chains give the tensile property, so collagen can be stretched without breaking. The molecules are arranged specifically into fibrils and then fibres. And the staggered, overhanging array gives collagen marked flexibility.',
      objective:
        'Give the structural features, from the repeating triplet up to the fibre, that account for the tensile strength of collagen.',
      pitfall:
        'Attributing the strength to proline alone. Proline prevents a right-handed helix from forming in the individual chain, but it is glycine at every third position that lets three chains pack close enough to wind together, and the covalent cross-links that let the result be pulled without breaking.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: ['SYS-MSK-T04-S02'],
      modulePath: '102 INT > Biochemistry > Proteins of Extracellular Matrix',
      type: 'structure_function_relationship',
    },
    {
      key: 'collagen-synthesis-hydroxylation-and-glycosylation',
      label:
        'Collagen synthesis hydroxylates some proline and lysine residues using vitamin C as cofactor, and attaches glucose and galactose to the resulting hydroxylysine residues, which is why collagen is considered a glycoprotein',
      definition:
        'During collagen synthesis, inside the lumen of the rough endoplasmic reticulum, some proline and some lysine residues of the procollagen α-chain are hydroxylated by hydroxylase enzymes that require vitamin C as a cofactor. Some of the resulting hydroxylysine residues are then glycosylated by the addition of glucose or galactose molecules — which is why collagen is considered a glycoprotein.',
      objective:
        'Name the vitamin cofactor collagen\'s hydroxylase enzymes require, and state which residue type carries the glucose/galactose that makes collagen a glycoprotein.',
      pitfall:
        'Attaching the sugar residues to proline or to hydroxyproline instead of hydroxylysine. Glucose and galactose are attached to hydroxylysine residues, not to proline, hydroxyproline or unmodified lysine.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Extracellular Matrix',
      type: 'mechanism',
      aliases: ['Collagen hydroxylation', 'Vitamin C and collagen', 'Collagen glycosylation'],
    },
    {
      key: 'collagen-elastin-shared-and-distinct-features',
      label:
        'Collagen and elastin share hydroxyproline residues, but differ in nearly everything else — collagen is a glycoprotein built from a three-chain tropocollagen stabilized by hydrogen bonds and covalent cross-links, while elastin is a non-glycoprotein built from a one-chain tropoelastin stabilized by desmosine cross-links',
      definition:
        'Collagen and elastin are both connective-tissue fibrous proteins and share the presence of hydroxyproline residues, though elastin\'s tropoelastin monomer contains only little hydroxyproline and no hydroxylysine at all, unlike collagen\'s larger hydroxyproline content. Beyond that they differ: collagen is a glycoprotein (its hydroxylysine residues carry glucose and galactose), while elastin is not a glycoprotein and has no hydroxylysine. Collagen\'s building unit, tropocollagen, is three polypeptide chains stabilized by hydrogen bonds and covalent cross-links; elastin\'s building unit, tropoelastin, is a single polypeptide chain (a monomer) whose monomers are instead stabilized by desmosine cross-links. Collagen is found in skin, bone, cartilage, tendon, liver, lung, vessels and cornea and has a supportive function; elastin is found in ligament, lung and blood vessels and gives elasticity.',
      objective:
        'State which structural feature collagen and elastin share, and contrast their chain number, glycoprotein status and stabilizing cross-links.',
      pitfall:
        'Assuming tropoelastin is a triple helix like tropocollagen because both are called "tropo-" molecules. Tropoelastin is a monomer — one polypeptide chain — while only tropocollagen is the three-chain triple helix.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Extracellular Matrix',
      type: 'structure_function_relationship',
      aliases: ['Collagen vs elastin', 'Elastin structure', 'Tropoelastin'],
    },
    {
      key: 'bone-and-cartilage-matrix-protein-composition',
      label:
        'Bone protein is mainly type I collagen and cartilage protein is mainly type II collagen, and bone\'s major non-collagenous protein, osteocalcin, needs vitamin K to γ-carboxylate its glutamate residues so they can bind hydroxyapatite',
      definition:
        'Type I collagen forms 90% of bone proteins and is made of two α1 chains and one α2 chain; the minor collagen form present in bone is type V. Type II collagen forms 90–98% of the total collagen present in cartilage and is made of three identical α1 chains. Among bone\'s non-collagenous proteins, osteocalcin is the major one: it is a bone-specific protein synthesized by osteoblasts, containing about 3 residues of glutamate that are γ-carboxylated — by a vitamin K-dependent enzyme — to γ-carboxyglutamate, which binds hydroxyapatite for bone mineralization. Osteocalcin synthesis is induced by calcitriol (the active form of vitamin D3), and its serum level is used as a marker of bone formation.',
      objective:
        'State which collagen type predominates in bone versus cartilage, and name the vitamin required for osteocalcin\'s glutamate carboxylation.',
      pitfall:
        'Swapping the collagen types — putting type II in bone and type I in cartilage. Assigned them the other way round: type I predominates in bone, type II in cartilage.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Proteins of Extracellular Matrix',
      type: 'structure_function_relationship',
      aliases: ['Osteocalcin', 'Bone collagen type I', 'Cartilage collagen type II'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p38-q1',
      conceptKey: 'collagen-structural-strength-basis',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'State that collagen is unusually rich in glycine because it occupies every third position of the repeating triplet.',
      explanations: {
        a: 'Correct by the description of collagen\'s amino acid composition: each α-chain\'s repeating Gly-X-Y triplet places glycine at every third position across roughly 1000 residues, making collagen distinctively glycine-rich.',
        b: 'Hemoglobin\'s globin chains are not described in terms of glycine content; nothing in this chapter\'s text supports singling it out as glycine-rich.',
        c: 'Keratin appears only as a named example of a fibrous protein and, elsewhere, of a protein with disulfide-bonded cysteines; its glycine content is not stated.',
        d: 'Fibronectin is named only once in this chapter\'s text, in a list of extracellular-matrix fibrous proteins, with no composition detail given — given no basis for calling it glycine-rich.',
      },
      answerOverride: 'a',
      answerOverrideReason:
        'No printed key ("none"). The book states that in collagen\'s repeating Gly-X-Y triplet, glycine occupies every third position across roughly 1000 residues per α-chain — making collagen unusually glycine-rich among proteins; the book does not give a glycine content for hemoglobin, keratin or fibronectin to compare against.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p38-q2',
      conceptKey: 'collagen-structural-strength-basis',
      difficulty: 'Easy',
      questionType: 'Structure and function',
      learningObjective: 'State that tropocollagen is built from three coiled α-chains.',
      explanations: {
        a: 'Reads as "1" (garbled by OCR to "|"); a single chain could not form the triple helix described as tropocollagen\'s building unit.',
        b: 'Two chains would not match the description of tropocollagen; it explicitly names three left-handed α-chains twisting together.',
        c: 'Tropocollagen consists of three coiled α-chains, each a left-handed helix, tightly twisted together into a right-handed superhelix.',
        d: 'Four chains overshoots the count; tropocollagen is built from three α-chains, not four.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p38-q3',
      conceptKey: 'collagen-structural-strength-basis',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective:
        'State that each turn of tropocollagen\'s helix contains 3 amino acid residues, tighter than an ordinary protein\'s 3.6.',
      explanations: {
        a: 'Each turn of the collagen helix contains 3 amino acid residues, making a tighter helix than normal proteins, which have 3.6 residues per turn.',
        b: '4 residues per turn is not the figure given for collagen; it states 3.',
        c: '3.6 is the figure for normal proteins\' helix, given specifically as the contrast to collagen\'s tighter, 3-residue turn — not collagen\'s own value.',
        d: '4.6 does not match either figure given — neither collagen\'s 3 residues per turn nor the ordinary protein\'s 3.6.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p38-q4',
      conceptKey: 'collagen-structural-strength-basis',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'State that glycine occupies every third position of collagen\'s repeating amino acid triplet.',
      explanations: {
        a: 'Serine is not named in the Gly-X-Y triplet at all; this option likely reflects an OCR misread of the printed key rather than a book-supported answer.',
        b: 'Proline is the X position in the Gly-X-Y triplet, not the third (repeating-Gly) position — it sits at the second position of each triplet, not the third.',
        c: 'Lysine only appears as an occasional substitute for the X position (normally proline); it is not the residue occupying every third position.',
        d: 'The repeating triplet is Gly-X-Y, where Gly is glycine, present in every third position of the chain.',
      },
      answerOverride: 'd',
      answerOverrideReason:
        'The two OCR passes disagree between (a) Serine and (d) Glycine. The book\'s own text settles it: each α-chain\'s repeating triplet is Gly-X-Y, "where Gly is glycine (which is present in every third position)" — glycine, not serine, occupies the third position.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p38-q5',
      conceptKey: 'collagen-synthesis-hydroxylation-and-glycosylation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name vitamin C as the cofactor collagen\'s proline-hydroxylase enzyme requires.',
      explanations: {
        a: 'Hydroxylation of some proline and some lysine residues, during collagen synthesis in the RER, is carried out by hydroxylase enzymes that require vitamin C as a cofactor.',
        b: 'Vitamin A is not named anywhere in this chapter\'s account of collagen synthesis.',
        c: 'Vitamin D is named elsewhere only in connection with osteocalcin synthesis (induced by calcitriol), not with proline hydroxylation.',
        d: 'Vitamin E is not named anywhere in this chapter\'s text on collagen synthesis.',
      },
      answerOverride: 'a',
      answerOverrideReason:
        'No printed key ("none"). The book states directly that hydroxylation of some proline and some lysine residues during collagen synthesis is carried out by hydroxylase enzymes that require vitamin C as a cofactor.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p38-q6',
      conceptKey: 'collagen-synthesis-hydroxylation-and-glycosylation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that glucose and galactose attach to hydroxylysine, making collagen a glycoprotein.',
      explanations: {
        a: 'Unmodified lysine is not the attachment site named; lysine must first be hydroxylated to hydroxylysine before the sugars are attached.',
        b: 'Proline occupies the X position of the triplet and is not described as carrying attached sugars; hydroxylation and glycosylation in the account happen to lysine residues, not proline.',
        c: 'Glucose and galactose molecules are attached to hydroxylysine residues, which is why collagen is considered a glycoprotein.',
        d: 'Hydroxyproline is the hydroxylated form of proline (the Y position of the triplet); attached the sugars to hydroxylysine, not hydroxyproline.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p38-q7',
      conceptKey: 'collagen-synthesis-hydroxylation-and-glycosylation',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'The book describes collagen\'s proline/lysine hydroxylation (requiring vitamin C) but never mentions copper or names an enzyme whose activity copper deficiency would reduce, in either the collagen or elastin sections of this chapter — not taught in the module book.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p39-q8',
      conceptKey: 'collagen-structural-strength-basis',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason: 'Osteogenesis imperfecta is never mentioned in this chapter\'s page text — not taught in the module book.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p39-q9',
      conceptKey: 'collagen-elastin-shared-and-distinct-features',
      difficulty: 'Hard',
      questionType: 'Structure and function',
      learningObjective: 'Identify hydroxyproline content as a feature collagen and elastin share, despite differing everywhere else.',
      explanations: {
        a: 'Elastin is a non-glycoprotein, unlike collagen, which is a glycoprotein because of its sugar-bearing hydroxylysine residues — this is a difference, not a similarity.',
        b: 'Described tropocollagen as three chains forming a triple helix, but tropoelastin as a monomer — a single polypeptide chain, not a helix of several chains — so this is also a difference, not a shared feature.',
        c: 'Tropoelastin contains little hydroxyproline (less than collagen\'s Y-position hydroxyproline content, but present nonetheless), so both proteins carry hydroxyproline residues, even though the amounts differ.',
        d: 'Explicitly stated elastin has no hydroxylysine at all, while collagen\'s hydroxylysine is what carries its attached sugars — a clear difference, not a similarity.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p39-q10',
      conceptKey: 'collagen-elastin-shared-and-distinct-features',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'Fibronectin appears only once in this chapter\'s text, named in a one-line list of extracellular-matrix fibrous proteins; the book gives no detail on its binding sites — not taught in the module book.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p39-q11',
      conceptKey: 'collagen-elastin-shared-and-distinct-features',
      difficulty: 'Moderate',
      questionType: 'Structure and function',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'Same gap as fibronectin\'s binding sites — the book never describes fibronectin\'s chain structure or how its chains are joined; not taught in the module book.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p39-q12',
      conceptKey: 'collagen-elastin-shared-and-distinct-features',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'N/A (excluded).',
      explanations: {},
      exclude: true,
      excludeReason:
        'Fibrillin and Marfan\'s syndrome are never discussed beyond fibrillin\'s name appearing once in a list of ECM fibrous proteins — not taught in the module book.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p39-q13',
      conceptKey: 'bone-and-cartilage-matrix-protein-composition',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Name vitamin K as the cofactor for γ-carboxylation of osteocalcin\'s glutamate residues.',
      explanations: {
        a: 'Vitamin A is not named in the account of bone protein carboxylation.',
        b: 'Vitamin C is the cofactor for collagen\'s proline/lysine hydroxylation, a different reaction from the glutamate carboxylation this question asks about.',
        c: 'Vitamin D (as calcitriol) is named as what induces osteocalcin\'s synthesis, not as the cofactor for the carboxylation reaction itself — that is vitamin K.',
        d: 'Osteocalcin\'s glutamate residues are γ-carboxylated by a vitamin K-dependent enzyme, to γ-carboxyglutamate that binds hydroxyapatite.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p39-q14',
      conceptKey: 'bone-and-cartilage-matrix-protein-composition',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'State that Type I collagen forms 90% of bone protein.',
      explanations: {
        a: 'Type I collagen forms 90% of bone proteins, made of two α1 chains and one α2 chain.',
        b: 'Garbled by OCR to "Type Il"; read as Type II, this is the collagen type assigned to cartilage, not bone — bone\'s dominant type is Type I.',
        c: 'Also garbled to "Type Il", identically to option b; whichever numeral was intended, it is not Type I, the type forms 90% of bone protein.',
        d: 'Type IV is named only as a minor form present in bone, not the mainly-present type — bone\'s dominant collagen is Type I.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p39-q15',
      conceptKey: 'bone-and-cartilage-matrix-protein-composition',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'State that Type II collagen is the most abundant collagen in cartilage.',
      explanations: {
        a: 'Garbled OCR for "Type I" ("Typel"); Type I is the dominant collagen for bone, not cartilage — cartilage\'s dominant type is Type II.',
        b: 'Type II collagen forms 90–98% of the total collagen present in cartilage, made of three identical α1 chains.',
        c: 'Garbled OCR for "Type III" ("Type Ill"); type III only is one of several minor collagen types, without singling it out for cartilage.',
        d: 'Type IV is not named as cartilage\'s dominant collagen; given Type II that role.',
      },
    },
  ],
}
