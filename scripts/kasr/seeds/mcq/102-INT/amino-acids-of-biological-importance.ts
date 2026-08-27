/**
 * `102 INT > Biochemistry > Amino Acids of Biological Importance` — the
 * question books' MCQs.
 *
 * Twenty-seven rows, triaged against the department book's own chapter
 * (`scripts/kasr/extract/pagetext/src_a488633802ec053c6325.json`, physical
 * p5-p10). Twenty-three keep their printed answer key as-is. Two need an
 * override the book itself supplies: `p25-q7` has no printed key at all, but
 * the book's own note ("Histidine is a basic heterocyclic amino acid") settles
 * it; `p28-q27` has a printed key that the book's own metabolic-classification
 * list directly contradicts — phenylalanine is named there as mixed
 * (glucogenic and ketogenic), not the "pure galactogenic" the key claims,
 * and "galactogenic" is not a category the book defines at all. Two rows are
 * excluded: `p26-q8` asks about selenocysteine, which this chapter's six
 * pages never mention, and `p29-q31`'s option set has the chapter's own
 * printed answer-key table bled into options (d) and (e) by OCR, leaving (e)
 * unreadable table fragments rather than a genuine fifth choice.
 *
 * Nine concepts cover the twenty-three sittable rows: the book's basic
 * definition of proteins and its one imino-acid exception; the four
 * classification schemes and the chemical-classification tree (aliphatic,
 * aromatic, heterocyclic, with aliphatic's further subgroups) that between
 * them carry the bulk of the "which group is amino acid X in" rows; the
 * separate polarity-based scheme; the nutritional scheme (reusing the
 * existing `amino-acid-chemical-and-nutritional-classification` concept);
 * biological value; the metabolic scheme; the amphoteric/isoelectric-point
 * property; and peptide bond formation.
 */
import type { McqLeafSeed } from '../../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Amino Acids of Biological Importance',
  modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
  articleId: 'ART-102-BIO-AMINO-ACIDS-OF-BIOLOGICAL-IMPORTANCE',

  concepts: [
    {
      key: 'amino-acid-basic-composition-and-alpha-imino-distinction',
      label:
        'Proteins are high molecular weight organic compounds built from 20 amino acids, all of which are α-amino acids except proline, an imino acid',
      definition:
        'Proteins are organic compounds with a high molecular weight. Synthesis of proteins commonly requires twenty different amino acids. All of these amino acids are α-amino acids — the amino group sits on the carbon next to the carboxyl group — except proline, whose side chain cyclises back onto its own nitrogen, which makes it an imino acid rather than a true amino acid.',
      objective:
        'State that proteins are high molecular weight organic compounds built from 20 amino acids, and identify proline as the one exception to the rule that all of them are α-amino acids.',
      pitfall:
        'Treating proline as just another α-amino acid because it sits on the same list of twenty. Its ring puts its nitrogen between two carbons rather than leaving it with two free hydrogens, which is exactly why it is an imino, not an amino, acid.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
      type: 'definition',
      aliases: ['Alpha amino acid', 'Imino acid'],
    },
    {
      key: 'amino-acid-classification-schemes-and-chemical-subgroups',
      label:
        'Amino acids are classified four ways — chemical, polar/non-polar, nutritional, metabolic — and the chemical scheme sorts them into aliphatic (neutral, acidic, basic, each with further subgroups), aromatic and heterocyclic',
      definition:
        'Amino acids are classified four ways: chemical classification (by chemical structure), polar or non-polar (by the polarity of the side chain), nutritional classification (by dietary importance) and metabolic classification (by metabolic fate). The chemical scheme divides amino acids into aliphatic, aromatic and heterocyclic groups. Aromatic amino acids are phenylalanine, tyrosine and tryptophan; heterocyclic amino acids are histidine and proline. Aliphatic amino acids split further into neutral aliphatic (glycine and the short-chain alanine; the branched-chain valine, leucine and isoleucine; the hydroxyl-containing serine and threonine; the sulfur-containing cysteine and methionine; and the amide-of-acidic-amino-acid pair asparagine and glutamine), acidic aliphatic (aspartic acid and glutamic acid) and basic aliphatic (lysine and arginine). Tryptophan can be considered both aromatic and heterocyclic, and histidine is a basic heterocyclic amino acid.',
      objective:
        "Name the four classification schemes for amino acids, and place a named amino acid in its correct chemical subgroup — aliphatic (neutral, acidic or basic, with its further short-chain, branched-chain, hydroxyl- or sulfur-containing subdivision), aromatic or heterocyclic.",
      pitfall:
        "Sorting histidine as aromatic because it has a ring. The chemical classification tree puts histidine, with proline, under heterocyclic amino acids, keeping aromatic reserved for phenylalanine, tyrosine and tryptophan.",
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
      type: 'classification',
      aliases: ['Aliphatic amino acids', 'Aromatic amino acids', 'Heterocyclic amino acids', 'Chemical classification of amino acids'],
    },
    {
      key: 'amino-acid-polarity-based-classification',
      label:
        'By side-chain polarity, amino acids fall into nonpolar/hydrophobic, uncharged polar, or charged groups, and the charged group splits into basic and acidic amino acids',
      definition:
        'By the polarity of the side chain (R-group), amino acids sort into three main groups. Amino acids with nonpolar or hydrophobic R groups include glycine, alanine, valine, leucine, isoleucine, methionine, phenylalanine, tryptophan and proline. Amino acids with uncharged polar R groups are more soluble in water and include serine, threonine, tyrosine and hydroxyproline (hydroxyl group), cysteine (SH group), and asparagine and glutamine (amide group). Amino acids with charged R groups split into basic amino acids, or diamino-monocarboxylic acids (lysine, arginine, histidine), and acidic amino acids, or monoamino-dicarboxylic acids (aspartic acid, glutamic acid).',
      objective:
        "Classify a named amino acid by the polarity of its side chain — nonpolar/hydrophobic, uncharged polar, or charged (basic or acidic) — as distinct from the chemical classification tree.",
      pitfall:
        "Conflating this scheme with the chemical classification tree. Serine is 'hydroxyl-containing' chemically but 'uncharged polar' by side-chain polarity — the same amino acid is sorted differently depending on which of the two schemes is being applied.",
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
      type: 'classification',
      aliases: ['Polar amino acids', 'Nonpolar amino acids', 'Charged amino acids'],
    },
    {
      key: 'amino-acid-chemical-and-nutritional-classification',
      label:
        'An amino acid is placed by holding two classifications at once — its chemical group and whether the body can make it — and no acidic amino acid is essential',
      definition:
        'Chemically, glycine is the smallest neutral aliphatic amino acid, lysine is basic aliphatic, cystine is the disulfide-linked dimer of the sulfur-containing cysteine, isoleucine is branched-chain, and glutamate is acidic aliphatic. Nutritionally, the nine essential amino acids are valine, leucine, isoleucine, threonine, methionine, lysine, phenylalanine, tryptophan and histidine; arginine is half-essential; all the rest, including glycine, cysteine and cystine, and glutamate, are non-essential.',
      objective: 'Classify a named amino acid simultaneously by its chemical group and by whether it is essential in the diet.',
      pitfall:
        'Calling cystine essential because methionine, the other sulfur-containing amino acid, is. Methionine is the essential one; cysteine and its dimer cystine are made in the body. There is no essential acidic amino acid at all.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
      type: 'classification',
    },
    {
      key: 'protein-biological-value-from-essential-amino-acid-completeness',
      label:
        'Proteins containing all the essential amino acids are of high biological value; proteins deficient in one or more are of low biological value',
      definition:
        "Proteins that contain all the essential amino acids are of high biological value — milk and egg proteins are examples. Proteins that are deficient in one or more of the essential amino acids are of low biological value — zein of maize is an example, deficient in tryptophan.",
      objective: "State what makes a protein of high versus low biological value, and give a worked example of each.",
      pitfall:
        "Judging biological value by a protein's size or molecular weight rather than by its essential-amino-acid completeness. A protein can be large and still be of low biological value if it lacks even one essential amino acid, as zein does for tryptophan.",
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
      type: 'definition',
      aliases: ['Biological value of protein', 'High biological value protein', 'Low biological value protein'],
    },
    {
      key: 'amino-acid-metabolic-classification-glucogenic-ketogenic',
      label:
        'By metabolic fate amino acids are pure glucogenic (most of them), pure ketogenic (leucine and lysine only), or glucogenic-and-ketogenic/mixed (phenylalanine, tyrosine, tryptophan and isoleucine)',
      definition:
        'According to their metabolic fate, amino acids classify into three groups. Pure glucogenic amino acids can give glucose in the body and include all amino acids except the members of the other two groups. Pure ketogenic amino acids can give ketone bodies and include only leucine and lysine. Glucogenic and ketogenic (mixed) amino acids can give both glucose and ketone bodies, and include phenylalanine, tyrosine, tryptophan and isoleucine.',
      objective:
        'Classify a named amino acid by metabolic fate — pure glucogenic, pure ketogenic, or glucogenic-and-ketogenic (mixed) — and name the exact membership of the two small, named groups.',
      pitfall:
        "Assuming phenylalanine must be simply glucogenic because it is not one of the two purely ketogenic amino acids. Phenylalanine, along with tyrosine, tryptophan and isoleucine, is named as mixed — capable of giving rise to both glucose and ketone bodies — not purely glucogenic.",
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
      type: 'classification',
      aliases: ['Glucogenic amino acids', 'Ketogenic amino acids', 'Metabolic classification of amino acids'],
    },
    {
      key: 'amino-acid-amphoteric-property-and-isoelectric-point',
      label:
        'Amino acids are amphoteric — positively charged in acid, negatively charged in alkali, and zwitterionic at their isoelectric point, which is pH 6.02 for all monoamino-monocarboxylic amino acids',
      definition:
        'Amino acids can react with both acids and bases, so they are ampholytes. In acidic medium they are positively charged (R-NH3+); in alkaline medium they are negatively charged (R-COO-); at the isoelectric point (IEP) they carry equal negative and positive charges, forming dipolar ions (zwitterions), which sit at pH 6.02 for all monoamino-monocarboxylic amino acids. At this point the amino acid cannot migrate in an electric field, and the fully uncharged form is never present at any pH.',
      objective:
        "State how an amino acid's charge changes with pH — positive in acid, negative in alkali, zwitterionic at the isoelectric point — and give the IEP value of pH 6.02 for monoamino-monocarboxylic amino acids.",
      pitfall:
        'Assuming an amino acid can exist in a fully neutral, uncharged form at some pH. The uncharged form is not present at any pH — at the isoelectric point the amino acid is not chargeless, it is a zwitterion carrying equal and opposite charges.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
      type: 'mechanism',
      aliases: ['Amphoteric property', 'Isoelectric point', 'Zwitterion', 'IEP'],
    },
    {
      key: 'peptide-bond-formation-mechanism',
      label:
        'A peptide bond forms by condensation of the carboxylic group of one amino acid with the amino group of the next, releasing one molecule of water',
      definition:
        'A dipeptide is formed by the condensation of the carboxylic group of one amino acid with the amino group of a second amino acid, losing one molecule of water. Three amino acids form a tripeptide, and so on. Proteins are formed of many amino acids linked together by peptide bonds; the term polypeptide means the presence of a large number of peptide bonds. Oligopeptides contain 2 to 10 amino acids, polypeptides contain 11 to 49 amino acids, and protein molecules are formed of 50 or more amino acids.',
      objective:
        "Describe the condensation reaction that forms a peptide bond — carboxyl group of one amino acid to amino group of the next, with loss of water — and state the size cut-offs for oligopeptide, polypeptide and protein.",
      pitfall:
        'Reversing which group belongs to which amino acid. It is the carboxylic group of the first amino acid that condenses with the amino group of the second, not the other way around — the resulting dipeptide still has one free amino end and one free carboxyl end.',
      subject: 'fnd',
      primary: 'DIS-BIO-T05',
      secondary: [],
      modulePath: '102 INT > Biochemistry > Amino Acids of Biological Importance',
      type: 'mechanism',
      aliases: ['Peptide bond', 'Dipeptide', 'Condensation reaction', 'Oligopeptide', 'Polypeptide'],
    },
  ],

  questions: [
    {
      key: 'MCQ-102-07f0a0ff-p25-q1',
      conceptKey: 'amino-acid-basic-composition-and-alpha-imino-distinction',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State that proteins are organic compounds of high molecular weight.',
      explanations: {
        a: 'Confuses proteins with small metabolites. Proteins are defined as the opposite of low molecular weight.',
        b: 'Proteins are organic compounds with a high molecular weight, built up from amino acids.',
        c: 'Wrong on both counts — proteins are organic, not inorganic, and their molecular weight is specifically high, not low.',
        d: 'Gets "high molecular weight" right but wrongly classifies proteins as inorganic; amino acids and the peptide bonds linking them are carbon-based organic chemistry.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p25-q2',
      conceptKey: 'amino-acid-basic-composition-and-alpha-imino-distinction',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the number of amino acids commonly required for protein synthesis.',
      explanations: {
        a: 'Overshoots the correct number by a factor of five.',
        b: 'Far above the correct count; there is no expanded amino-acid alphabet in what this chapter teaches.',
        c: 'Synthesis of proteins commonly requires twenty different amino acids.',
        d: 'A plausible-sounding round number, but not the correct one — it is fixed at twenty, not thirty.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p25-q3',
      conceptKey: 'amino-acid-basic-composition-and-alpha-imino-distinction',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Recognise phenylalanine as a true α-amino acid and rule out proline, hydroxyproline and glutathione.',
      explanations: {
        a: 'Phenylalanine is one of the twenty amino acids, and — unlike proline — it is a true α-amino acid, with a free amino group on the carbon next to the carboxyl group.',
        b: 'The stated exception. Proline is singled out as an imino acid, not an α-amino acid, because its side chain cyclises onto its own nitrogen.',
        c: 'Hydroxyproline is not one of the twenty amino acids used during protein synthesis at all — it belongs among the amino acids formed by hydroxylation of proline after the protein has already been built.',
        d: 'Glutathione does not appear in this chapter\'s list of the twenty amino acids; nothing here identifies it as an α-amino acid.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p25-q4',
      conceptKey: 'amino-acid-basic-composition-and-alpha-imino-distinction',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'Identify proline as the chapter\'s one imino acid.',
      explanations: {
        a: 'Alanine is a short-chain neutral aliphatic amino acid — a standard α-amino acid, not the named exception.',
        b: 'Glutamate (glutamic acid) is an example of an acidic aliphatic amino acid, still a conventional α-amino acid.',
        c: 'All amino acids are α-amino acids except proline, which is an imino acid.',
        d: 'Serine is listed among the hydroxyl-containing aliphatic amino acids, an ordinary α-amino acid like the rest of the list.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p25-q5',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Name chemical classification as one way amino acids are grouped.',
      explanations: {
        a: '"Physical classification" is not one of the four named schemes; it is invented to sound plausible alongside the real one.',
        b: 'Amino acids are not classified pathologically anywhere in this chapter — this option borrows clinical-sounding language that has no basis in the text.',
        c: 'There are four classification schemes for amino acids, and chemical classification — by chemical structure — is the first one listed.',
        d: '"Quantitative classification" does not appear among the four schemes (chemical, polar/non-polar, nutritional, metabolic).',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p25-q7',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Hard',
      questionType: 'Classification',
      learningObjective: 'Recover histidine\'s classification as a heterocyclic amino acid when the bank supplies no printed key.',
      answerOverride: 'b',
      answerOverrideReason:
        'No printed key survived for this row (correctSource: "none"). The book\'s own note states plainly that "Histidine is a basic heterocyclic amino acid," and its chemical classification tree places histidine, with proline, under heterocyclic amino acids rather than aromatic or aliphatic — settling the answer as (b).',
      explanations: {
        a: 'Tempting because histidine has a ring, but "aromatic" is reserved for phenylalanine, tyrosine and tryptophan; histidine\'s ring is classed heterocyclic instead.',
        b: 'Histidine is a basic heterocyclic amino acid — its ring places it, with proline, in the heterocyclic group of the chemical classification tree.',
        c: 'Branched-chain is an aliphatic subgroup (valine, leucine, isoleucine); histidine\'s ring structure puts it outside the aliphatic branch of the tree entirely.',
        d: '"Non-branched chain" is not one of the named subgroups at all — it is not how the chemical classification tree is organised.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p26-q8',
      conceptKey: 'excluded.amino-acids.selenocysteine-not-in-book',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Not taught in the module book. Selenocysteine is never mentioned anywhere in this chapter\'s physical p5-p10 text, so there is no book basis for confirming that it substitutes selenium for sulfur (or for refuting the other three options) — the printed key cannot be checked against anything the book actually teaches.',
    },
    {
      key: 'MCQ-102-07f0a0ff-p26-q9',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Place valine among the branched-chain aliphatic amino acids.',
      explanations: {
        a: 'Valine, alongside leucine and isoleucine, is listed under the branched-chain amino acids within the neutral aliphatic group.',
        b: 'Valine is specifically named as a branched-chain amino acid, not lumped with the short-chain (non-branched) pair glycine and alanine.',
        c: 'Aromatic is reserved for phenylalanine, tyrosine and tryptophan; valine\'s side chain is a simple branched hydrocarbon, not a ring.',
        d: 'Heterocyclic amino acids (histidine, proline) contain a ring in their structure; valine\'s isopropyl side chain has no ring.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p26-q10',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify serine as a hydroxyl-containing amino acid.',
      explanations: {
        a: 'Arginine is a basic aliphatic amino acid; its side chain is a guanidinium group, not a hydroxyl.',
        b: 'Serine, with threonine, is listed under the hydroxyl-containing amino acids in the chemical classification.',
        c: 'Cysteine is grouped with methionine among the sulfur-containing amino acids, not the hydroxyl-containing pair.',
        d: 'Methionine is the other sulfur-containing amino acid — its side chain carries a thioether, not a hydroxyl group.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p26-q11',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify threonine as a hydroxyl-containing amino acid, and rule out the post-translationally hydroxylated hydroxyproline.',
      explanations: {
        a: 'Threonine is the second hydroxyl-containing amino acid, alongside serine.',
        b: 'Methionine\'s defining group is sulfur (a thioether), placing it with cysteine among the sulfur-containing amino acids, not the hydroxyl-containing pair.',
        c: 'Glutathione is not one of the twenty amino acids and is never assigned to a hydroxyl-containing subgroup in this chapter.',
        d: 'Hydroxyproline is formed by hydroxylation of proline only after the protein has been synthesised; the hydroxyl-containing subgroup lists only serine and threonine among the twenty amino acids used in synthesis.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p26-q12',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify methionine as a sulfur-containing amino acid.',
      explanations: {
        a: 'Serine belongs to the hydroxyl-containing subgroup, not the sulfur-containing one.',
        b: 'Threonine is the second hydroxyl-containing amino acid — its side chain has no sulfur.',
        c: 'Methionine, with cysteine, is the sulfur-containing amino acid.',
        d: 'Aspartate (aspartic acid) is an acidic aliphatic amino acid; its side chain is a second carboxyl group, not sulfur.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p26-q14',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify aspartate as an acidic aliphatic amino acid.',
      explanations: {
        a: 'Arginine sits in the opposite, basic aliphatic group.',
        b: 'Glycine is the smallest neutral aliphatic amino acid — it carries no charged side-chain group at all.',
        c: 'Pyruvate is not one of the twenty amino acids; it is not listed anywhere in this chapter.',
        d: 'Aspartate (aspartic acid), with glutamic acid, is one of the two acidic aliphatic amino acids.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p27-q15',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify lysine as a basic aliphatic amino acid.',
      explanations: {
        a: 'Lysine, with arginine, is one of the basic aliphatic amino acids.',
        b: 'Proline is grouped under heterocyclic amino acids by its ring structure, not among the basic aliphatic group.',
        c: 'Glycine is the neutral, uncharged short-chain amino acid — the simplest of the twenty.',
        d: 'Alanine is also a neutral short-chain amino acid, with no basic side-chain group.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p27-q16',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify phenylalanine as an aromatic amino acid.',
      explanations: {
        a: 'Histidine\'s ring places it in the heterocyclic group instead.',
        b: 'Proline is the other heterocyclic amino acid, not aromatic.',
        c: 'Alanine is a short-chain neutral aliphatic amino acid with a simple methyl side chain — no ring at all.',
        d: 'Phenylalanine, with tyrosine and tryptophan, is one of the aromatic amino acids.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p27-q17',
      conceptKey: 'amino-acid-classification-schemes-and-chemical-subgroups',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify histidine as a heterocyclic amino acid.',
      explanations: {
        a: 'Histidine, with proline, is one of the two heterocyclic amino acids.',
        b: 'Cysteine is a sulfur-containing aliphatic amino acid, not heterocyclic.',
        c: 'Tyrosine is one of the three aromatic amino acids; it is also hydroxyl-containing, but never heterocyclic.',
        d: 'Methionine is the other sulfur-containing aliphatic amino acid.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p27-q18',
      conceptKey: 'amino-acid-polarity-based-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Classify serine as an uncharged polar amino acid by side-chain polarity.',
      explanations: {
        a: 'Non-polar/hydrophobic is the first polarity group (glycine, alanine, valine and others) — serine\'s hydroxyl group makes its side chain polar, not nonpolar.',
        b: 'Serine, for its hydroxyl group, is among the amino acids with uncharged polar R groups.',
        c: 'Charged polar R groups belong to the basic and acidic amino acids (lysine, arginine, histidine, aspartate, glutamate); serine\'s hydroxyl group does not ionise at physiological pH.',
        d: 'Hydrophobic describes the nonpolar group, the opposite of serine\'s water-soluble hydroxyl side chain.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p27-q19',
      conceptKey: 'amino-acid-polarity-based-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Classify arginine as a charged (basic) amino acid by side-chain polarity.',
      explanations: {
        a: 'Uncharged polar covers hydroxyl-, sulfhydryl- and amide-bearing side chains (serine, cysteine, asparagine and others); arginine\'s guanidinium group carries a positive charge at physiological pH.',
        b: 'Arginine is among the basic amino acids, one of the two charged-R-group categories.',
        c: 'Non-polar amino acids are the hydrophobic group (glycine, alanine, valine and others); arginine\'s charged side chain is the opposite of nonpolar.',
        d: 'Hydrophobic is the term for the nonpolar group; arginine\'s charged, water-attracting side chain places it firmly outside it.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p27-q20',
      conceptKey: 'amino-acid-chemical-and-nutritional-classification',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective:
        'Name essential, half-essential and non-essential as the three nutritional categories of amino acids, and distinguish this scheme from the chemical, polarity and metabolic ones.',
      explanations: {
        a: 'Nutritionally, amino acids fall into essential, half-essential (semi-essential) and non-essential groups — the nine essential amino acids include valine, leucine, isoleucine, threonine, methionine, lysine, phenylalanine, tryptophan and histidine, arginine is the sole half-essential amino acid, and the rest are non-essential.',
        b: 'Ketogenic, glucogenic and mixed is the metabolic, not nutritional, classification — it groups amino acids by what they can be converted to, not by whether the diet must supply them.',
        c: 'Aliphatic, aromatic and heterocyclic is the chemical classification, sorting by structure rather than dietary requirement.',
        d: 'Non-polar, uncharged polar and charged polar is the classification by side-chain polarity, unrelated to nutritional requirement.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p27-q21',
      conceptKey: 'amino-acid-chemical-and-nutritional-classification',
      difficulty: 'Easy',
      questionType: 'Classification',
      learningObjective: 'Identify valine as one of the nine essential amino acids.',
      explanations: {
        a: 'Valine is one of the nine essential amino acids — those the body cannot form, so diet must supply them.',
        b: 'Non-essential amino acids are made by the body in sufficient amounts; valine is explicitly one of the nine listed as essential instead.',
        c: 'Semi- (half-) essential describes arginine alone, the one amino acid the body makes at a rate sufficient for adults but not for growing children; valine has no such shortfall — it is essential outright.',
        d: '"Mixed" names a metabolic-fate category (glucogenic and ketogenic together), not a nutritional one — a different classification scheme entirely.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p28-q23',
      conceptKey: 'protein-biological-value-from-essential-amino-acid-completeness',
      difficulty: 'Moderate',
      questionType: 'Definition',
      learningObjective: 'State that completeness of essential amino acid content, not size, determines a protein\'s biological value.',
      explanations: {
        a: 'Proteins containing all the essential amino acids are of high biological value; milk and egg proteins are examples.',
        b: '"Moderate biological value" is not a category used at all — only high and low biological value are defined, and completeness of essential amino acids decides which.',
        c: 'Low biological value is the term for the opposite case — a protein deficient in one or more essential amino acids, such as zein of maize (deficient in tryptophan).',
        d: 'Molecular weight is unrelated to biological value; a protein complete in essential amino acids is called high in biological value regardless of its size.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p28-q25',
      conceptKey: 'amino-acid-metabolic-classification-glucogenic-ketogenic',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Name pure glucogenic, pure ketogenic, and mixed as the three metabolic categories of amino acids.',
      explanations: {
        a: 'The metabolic classification names exactly these three groups: pure glucogenic, pure ketogenic, and glucogenic-and-ketogenic (mixed) amino acids.',
        b: 'Acidic, alkaline (basic) and neutral describes a chemical property of the side chain, not a metabolic fate — it is not one of the four named schemes in this form.',
        c: 'Aliphatic, aromatic and heterocyclic is the chemical classification by structure, unrelated to what an amino acid is metabolised into.',
        d: 'Essential, non-essential and semi-essential is the nutritional classification — by dietary requirement, not metabolic fate.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p28-q26',
      conceptKey: 'amino-acid-metabolic-classification-glucogenic-ketogenic',
      difficulty: 'Moderate',
      questionType: 'Classification',
      learningObjective: 'Identify lysine, with leucine, as one of the two pure ketogenic amino acids.',
      explanations: {
        a: 'Leucine and lysine are the only two pure ketogenic amino acids.',
        b: 'Pure glucogenic covers every amino acid except the members of the other two groups; lysine is one of only two named exceptions, so it cannot be glucogenic.',
        c: '"Pure galactogenic" is not a category defined anywhere in the metabolic classification.',
        d: 'Glucogenic-and-ketogenic (mixed) is the third group — phenylalanine, tyrosine, tryptophan and isoleucine — and lysine is not one of its four named members.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p28-q27',
      conceptKey: 'amino-acid-metabolic-classification-glucogenic-ketogenic',
      difficulty: 'Challenging',
      questionType: 'Classification',
      learningObjective:
        'Recover phenylalanine\'s correct metabolic classification — mixed, not the undefined "pure galactogenic" — against a printed key the underlying facts contradict.',
      answerOverride: 'd',
      answerOverrideReason:
        'The printed key marks (a), but the book\'s own metabolic classification (physical p9) names phenylalanine explicitly under the third group: "Glucogenic and ketogenic (mixed) amino acids... include phenylalanine, tyrosine, tryptophan, and isoleucine." "Pure galactogenic" (a) is not a category the book defines at all — it appears nowhere in the metabolic classification, which recognises only pure glucogenic, pure ketogenic, and mixed. The correct answer is therefore (d).',
      explanations: {
        a: 'Not a defined category. "Galactogenic" does not appear anywhere in the metabolic classification of amino acids — this option does not correspond to anything in the text, and the printed key naming it is contradicted by the actual membership list.',
        b: 'Pure glucogenic is the largest, catch-all group (everything except the members of the other two), but phenylalanine is specifically named as mixed, not pure glucogenic.',
        c: 'Pure ketogenic is reserved for exactly two amino acids, leucine and lysine; phenylalanine is not one of them.',
        d: '"Glucogenic and ketogenic (mixed) amino acids... include phenylalanine, tyrosine, tryptophan, and isoleucine" (physical p9). The printed key\'s answer (a) names a category that is never defined.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p28-q28',
      conceptKey: 'amino-acid-amphoteric-property-and-isoelectric-point',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'State that amino acids are positively charged in acidic medium and negatively charged in alkaline medium.',
      explanations: {
        a: 'In acidic medium amino acids are positively charged (R-NH3+), because the excess H+ leaves the ammonium group charged.',
        b: 'Reverses the rule. In alkaline medium amino acids are negatively charged (R-COO-), not positively.',
        c: 'Reverses the acidic-medium charge. Amino acids are positively, not negatively, charged in acidic medium.',
        d: 'In alkaline medium amino acids are negatively charged, not uncharged — the fully uncharged form is not present at any pH.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p29-q29',
      conceptKey: 'amino-acid-amphoteric-property-and-isoelectric-point',
      difficulty: 'Easy',
      questionType: 'Definition',
      learningObjective: 'State the isoelectric point value, pH 6.02, for monoamino-monocarboxylic amino acids.',
      explanations: {
        a: '10.02 is well into the alkaline range, where amino acids are negatively charged rather than balanced at their IEP.',
        b: 'The isoelectric point for all monoamino-monocarboxylic amino acids is pH 6.02, the pH at which the zwitterion carries equal positive and negative charge and cannot migrate in an electric field.',
        c: '2.02 is strongly acidic, where amino acids are positively charged rather than at their zwitterionic balance point.',
        d: '30.02 is not a physiologically meaningful pH value at all — the pH scale for aqueous solutions runs roughly 0-14.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p29-q30',
      conceptKey: 'peptide-bond-formation-mechanism',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Describe peptide bond formation as condensation of one amino acid\'s carboxyl group with the next amino acid\'s amino group.',
      explanations: {
        a: 'Two carboxylic groups do not condense with each other in peptide bond formation — the reaction is specifically carboxyl-to-amino, not carboxyl-to-carboxyl.',
        b: 'The peptide bond is formed by condensation of the carboxylic group of one amino acid with the amino group of a second amino acid, releasing one molecule of water.',
        c: 'A hydroxyl group belongs only to specific amino acids like serine and threonine, not to the general peptide-bond-forming reaction that applies to every amino acid pair.',
        d: '"Amidic group" is not the partner group in the condensation reaction — the peptide bond itself becomes an amide linkage as a result of the reaction, but the group that reacts on the second amino acid is its free amino group.',
      },
    },
    {
      key: 'MCQ-102-07f0a0ff-p29-q31',
      conceptKey: 'excluded.amino-acids.option-set-corrupted-by-ocr',
      difficulty: 'Moderate',
      questionType: 'Mechanism',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason:
        'Option set corrupted by OCR. Options (d) and (e) have the chapter\'s own printed answer-key table bled into them — (d) reads "Peptide covalent bond Answers Key 1.b| ll.a| 21.a} 31.d 2.c|/ 12.c} 22.b..." and (e) is nothing but further table fragments ("a| 16.d| 26.a Ib| I7a| 27.0 8.c| 18.b| 28.a..."), not a genuine fifth choice for this stem at all. Even though the underlying fact — amino acids are linked by peptide, covalent, bonds — is taught on physical p10, the option text itself is not repairable from the extracted data.',
    },
  ],
}
