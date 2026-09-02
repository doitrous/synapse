// Explanations for HU-GIT-301 biochemistry (all 24 items of
// mcq-bank-biochemistry.json). Keyed 1-24 by array position (NOT by the
// source's own per-chapter `num`, which resets at 1 for each of the two
// chapters -- "Biochemistry of Digestion and Absorption" is items 1-17
// here, "Liver Metabolism and Fatty Liver" is items 18-24). `root` matches
// a CONCEPTS entry from HU-GIT-301-biochemistry-data.mjs, EXCEPT for items
// 9 and 22, whose `root` instead names a reused concept from a different
// module (see the build script's reuse map: item 9 reuses a live Kasr
// 103-BMS chylomicron/VLDL concept via a sparse pending-live overlay row;
// item 22 reuses this lane's own HU-GIT-301-pathology-ch2-concepts.md
// AFP-in-hepatocellular-carcinoma concept directly). Stems and options are
// read directly from scripts/helwan/extract/HU-GIT-301/mcq-bank-biochemistry.json
// at build time; only the explanations, concept linkage and tagging live here.

export const QUESTIONS_BIOCHEM = {
  1: { root: 'disaccharide-digestion-pancreatic-enzymes', topic: 'Digestion biochemistry', subtopic: 'Carbohydrate digestion', difficulty: 'Easy', explanations: {
    a: 'Saliva contains salivary amylase, which acts on starch (a polysaccharide), not on disaccharides, so it does not hydrolyse disaccharides.',
    b: 'Pancreatic juice is the correct answer: it contains the disaccharidases (or feeds the brush-border disaccharidases) that hydrolyse dietary disaccharides such as sucrose, lactose and maltose into their constituent monosaccharides. Neither saliva\'s amylase nor gastric juice\'s pepsin has disaccharide-hydrolysing activity, and bile contains no digestive enzymes at all, only bile salts for fat emulsification. Recognising pancreatic juice as the source of disaccharide-hydrolysing activity, in contrast to these other secretions, is the point of this question.',
    c: 'Bile contains no digestive enzymes at all; its role is fat emulsification via bile salts, not carbohydrate hydrolysis.',
    d: 'Gastric juice\'s only enzyme is pepsin, a protease with no carbohydrate-hydrolysing (disaccharidase) activity.',
  }},
  2: { root: 'lactase-hydrolysis-products', topic: 'Digestion biochemistry', subtopic: 'Carbohydrate digestion', difficulty: 'Easy', explanations: {
    a: 'Glucose and galactose is the correct answer: lactase hydrolyses the disaccharide lactose specifically into these two monosaccharides. This is the standard, well-defined product pair for lactose hydrolysis, distinct from sucrose\'s glucose-and-fructose pair. Recognising glucose and galactose as lactose\'s specific hydrolysis products is the point of this question.',
    b: 'Glucose and fructose are instead the hydrolysis products of sucrose (by sucrase), not of lactose.',
    c: 'Glucose and mannose is not a recognised disaccharide hydrolysis pair for any common dietary disaccharide relevant here; mannose is not a lactose hydrolysis product.',
    d: 'Galactose and mannose is not a recognised disaccharide hydrolysis pair; mannose is not a lactose hydrolysis product.',
  }},
  3: { root: 'sglt1-tissue-distribution', topic: 'Digestion biochemistry', subtopic: 'Intestinal sugar transport', difficulty: 'Moderate', explanations: {
    a: 'It is present in muscles and adipose tissue is the incorrect statement, and therefore the correct answer to this "which is incorrect" question: SGLT-1 is instead present in the intestinal brush border and renal proximal tubule, not in muscle or adipose tissue, which is where the distinct, insulin-dependent GLUT-4 transporter is found. Confusing SGLT-1\'s intestinal/renal distribution with GLUT-4\'s muscle/adipose distribution is the specific error this question tests for. Recognising that this statement is false, unlike the other three genuinely true statements about SGLT-1, is the point of the question.',
    b: 'SGLT-1 genuinely causes active uptake of glucose against its concentration gradient, so this true statement is not the answer to this "which is incorrect" question.',
    c: 'SGLT-1 genuinely transports sodium down its concentration gradient, using this energy to co-transport glucose against its own gradient (secondary active transport), so this true statement is not the answer.',
    d: 'SGLT-1 genuinely is insulin-independent, unlike GLUT-4, so this true statement is not the answer.',
  }},
  4: { root: 'glucose-transporters-intestinal', topic: 'Digestion biochemistry', subtopic: 'Intestinal sugar transport', difficulty: 'Moderate', explanations: {
    a: 'SGLT-1 is genuinely present in the small intestine (apical membrane), so it is not the answer to this "which is not present" question.',
    b: 'GLUT-2 is genuinely present in the small intestine (basolateral membrane), so it is not the answer.',
    c: 'GLUT-5 is genuinely present in the small intestine (apical membrane, for fructose), so it is not the answer.',
    d: 'GLUT-4 is the correct answer: it is not present in the small intestine, unlike SGLT-1, GLUT-2 and GLUT-5. GLUT-4 is instead the insulin-responsive glucose transporter restricted to skeletal muscle and adipose tissue. Recognising GLUT-4\'s absence from the intestinal epithelium, in contrast to the intestine-expressed SGLT-1/GLUT-2/GLUT-5, is the point of this question.',
  }},
  5: { root: 'fructose-absorption-glut5', topic: 'Digestion biochemistry', subtopic: 'Intestinal sugar transport', difficulty: 'Moderate', explanations: {
    a: 'SGLT-1 is sodium-coupled and specific to glucose and galactose uptake, not fructose, so it is not the transporter this question asks about.',
    b: 'GLUT-3 is the high-affinity neuronal glucose transporter, not the intestinal fructose transporter.',
    c: 'GLUT-4 is the insulin-responsive muscle/adipose glucose transporter, not the intestinal fructose transporter.',
    d: 'GLUT-5 is the correct answer: it is the facilitated-diffusion transporter on the apical membrane of the small intestinal enterocyte specific for fructose uptake. This is distinct from SGLT-1 (sodium-coupled glucose/galactose), GLUT-3 (high-affinity neuronal glucose transport) and GLUT-4 (insulin-responsive muscle/adipose glucose transport), none of which handles fructose. Recognising GLUT-5 as the fructose-specific apical transporter is the point of this question.',
  }},
  6: { root: 'glut2-basolateral-exit', topic: 'Digestion biochemistry', subtopic: 'Intestinal sugar transport', difficulty: 'Moderate', explanations: {
    a: 'GLUT2 is the correct answer: located on the basolateral membrane of the intestinal enterocyte, it transports glucose (along with galactose and fructose) out of the cell and into the bloodstream by facilitated diffusion, completing transepithelial sugar absorption. This basolateral exit role is distinct from GLUT4\'s muscle/adipose role and SGLT2\'s renal role. Recognising GLUT2 as the basolateral exit transporter for absorbed intestinal sugars is the point of this question.',
    b: 'GLUT4 is the insulin-responsive glucose transporter of muscle and adipose tissue, not the intestinal basolateral exit transporter.',
    c: 'SGLT1 mediates apical (not basolateral) glucose/galactose uptake into the enterocyte, the opposite membrane and direction from what this question asks about.',
    d: 'SGLT2 is the sodium-glucose cotransporter of the renal proximal tubule (the target of SGLT2-inhibitor diabetes drugs), not an intestinal transporter at all.',
  }},
  7: { root: 'lactose-intolerance-lactase-deficiency', topic: 'Digestion biochemistry', subtopic: 'Carbohydrate digestion disorders', difficulty: 'Moderate', explanations: {
    a: 'Galactokinase deficiency causes a form of galactosaemia (galactokinase deficiency galactosaemia), an intracellular galactose-metabolism disorder, not lactose intolerance.',
    b: 'UDP-galactose-4-epimerase deficiency causes a rare form of galactosaemia, an intracellular galactose-metabolism disorder, not lactose intolerance.',
    c: 'Galactose-1-phosphate uridyl transferase deficiency causes classic galactosaemia, an intracellular galactose-metabolism disorder, not lactose intolerance.',
    d: 'Lactase is the correct answer: lactose intolerance is caused by deficiency of this brush-border enzyme, which normally hydrolyses lactose into glucose and galactose. Without it, undigested lactose remains in the gut lumen, causing the osmotic and fermentative symptoms of lactose intolerance, a distinct condition from galactosaemia, which instead follows deficiency of one of the intracellular galactose-metabolism (Leloir pathway) enzymes. Recognising lactase deficiency as specifically causing lactose intolerance, not galactosaemia, is the point of this question.',
  }},
  8: { root: 'pancreatic-lipase-cofactors', topic: 'Digestion biochemistry', subtopic: 'Fat digestion', difficulty: 'Moderate', explanations: {
    a: 'Colipase is genuinely required for pancreatic lipase activity, anchoring the enzyme at the lipid-water interface, so it is not the answer to this "does not require" question.',
    b: 'Bile salts are genuinely required, indirectly, for pancreatic lipase activity by emulsifying dietary fat into a large-surface-area interface, so this is not the answer.',
    c: 'Phospholipids are genuinely involved in micelle formation that aids pancreatic lipase\'s substrate presentation, so this is not the answer.',
    d: 'Apo C-II is the correct answer: pancreatic lipase does not require it. Apo C-II is instead the cofactor required by the distinct enzyme lipoprotein lipase, which hydrolyses triacylglycerol within circulating chylomicrons and VLDL at the capillary endothelium, an entirely different enzyme and compartment from pancreatic lipase\'s gut-luminal digestive role. Recognising that apo C-II belongs to lipoprotein lipase\'s cofactor requirements, not pancreatic lipase\'s, is the point of this question.',
  }},
  9: { root: 'dietary-lipid-transport-chylomicrons', topic: 'Digestion biochemistry', subtopic: 'Fat absorption and transport', difficulty: 'Easy', explanations: {
    a: 'Micelles are the mixed structures (bile salts, monoglycerides, fatty acids) that solubilise and carry lipid digestion products across the unstirred water layer to the enterocyte surface, a step in intestinal absorption, not the form dietary fat takes once transported in blood.',
    b: 'Chylomicrons is the correct answer: dietary fats, once absorbed and re-esterified within the enterocyte, are packaged into chylomicrons and transported in blood (via the lymphatics first) to peripheral tissues. This lipoprotein particle is specifically formed by intestinal cells to export dietary (exogenous) lipid, distinct from micelles (an intraluminal digestive-absorptive structure) or fatty-acid-albumin complexes (the transport form of free fatty acids mobilised from adipose tissue, not newly absorbed dietary fat). Recognising chylomicrons as the blood transport form of dietary fat is the point of this question.',
    c: 'A fatty acid-albumin complex is the transport form of free fatty acids mobilised from adipose tissue stores, not of newly absorbed dietary fat, which is instead packaged into chylomicrons.',
    d: 'Liposomes are artificial or experimental lipid bilayer vesicles, not a physiological blood transport form of dietary fat.',
  }},
  10: { root: 'gastric-lipase-infants', topic: 'Digestion biochemistry', subtopic: 'Fat digestion', difficulty: 'Moderate', explanations: {
    a: 'Gastric lipase is not the main digestive lipase overall; pancreatic lipase fills that role in adults, though gastric lipase is proportionally more significant in infants.',
    b: 'Gastric lipase does not need colipase; colipase is specifically required by pancreatic lipase, not gastric lipase.',
    c: 'It is of significance in infants is the correct answer: infants\' relatively immature pancreatic lipase secretion makes gastric lipase a proportionally larger contributor to milk fat digestion than in adults. This infant-specific relevance is gastric lipase\'s main clinical significance in this bank, since it is not the dominant digestive lipase overall in adults. Recognising this infant-specific clinical significance, rather than gastric lipase sharing pancreatic lipase\'s cofactor or pH requirements, is the point of this question.',
    d: 'Gastric lipase does not need a low pH for its action, unlike pepsin; it retains activity across a range of gastric pH, distinguishing its pH-tolerance from pepsin\'s acid dependence.',
  }},
  11: { root: 'steatorrhoea-causes', topic: 'Digestion biochemistry', subtopic: 'Fat malabsorption', difficulty: 'Moderate', explanations: {
    a: 'Deficiency of pancreatic lipase enzyme genuinely causes steatorrhoea, by directly impairing luminal fat digestion, so this true statement is not the exception.',
    b: 'Deficiency of hormone-sensitive lipase is the correct answer: it does NOT cause steatorrhoea, unlike the other three options. Hormone-sensitive lipase is an entirely different, intracellular enzyme that mobilises stored triacylglycerol from adipose tissue in response to hormonal signals, with no role in luminal fat digestion or absorption, so its deficiency does not produce fat malabsorption. Recognising hormone-sensitive lipase as the exception among these otherwise genuine causes of steatorrhoea is the point of this question.',
    c: 'Obstruction of the pancreatic duct genuinely causes steatorrhoea, by preventing pancreatic lipase from reaching the gut lumen, so this true statement is not the exception.',
    d: 'Obstruction of the bile duct genuinely causes steatorrhoea, by preventing bile-salt-driven fat emulsification, so this true statement is not the exception.',
  }},
  12: { root: 'pepsin-endopeptidase', topic: 'Digestion biochemistry', subtopic: 'Protein digestion', difficulty: 'Moderate', explanations: {
    a: 'Pepsin genuinely is formed by the action of HCl on its precursor pepsinogen, so this true statement is not the answer to this "which is not correct" question.',
    b: 'Pepsin genuinely is secreted by the chief cells (as inactive pepsinogen), so this true statement is not the answer.',
    c: 'It is an exopeptidase is the incorrect statement, and therefore the correct answer to this question: pepsin is actually an endopeptidase, cleaving peptide bonds within the interior of a protein chain, not at its terminal ends. Confusing pepsin\'s endopeptidase activity with exopeptidase activity (which instead describes later intestinal enzymes such as carboxypeptidases) is the specific error this question tests for. Recognising that this statement is false, unlike the other three genuinely true statements about pepsin, is the point of the question.',
    d: 'Pepsin genuinely is smaller than pepsinogen, since activation proceeds by proteolytic removal of a segment of the precursor, so this true statement is not the answer.',
  }},
  13: { root: 'trypsin-endopeptidase', topic: 'Digestion biochemistry', subtopic: 'Protein digestion', difficulty: 'Moderate', explanations: {
    a: 'Trypsin genuinely is secreted as trypsinogen and activated to trypsin by intestinal enteropeptidase, so this true statement is not the answer to this "which is incorrect" question.',
    b: 'Active trypsin genuinely can act on its own precursor trypsinogen autocatalytically to form more trypsin, so this true statement is not the answer.',
    c: 'It is an exopeptidase is the incorrect statement, and therefore the correct answer: trypsin is actually an endopeptidase, cleaving peptide bonds within the interior of a protein chain at specific residues (arginine and lysine), not at the chain\'s terminal ends. Confusing trypsin\'s central, endopeptidase role in the pancreatic protease cascade with exopeptidase activity is the specific error this question tests for. Recognising that this statement is false, unlike the other three genuinely true statements about trypsin, is the point of the question.',
    d: 'Trypsin genuinely does activate other zymogens such as chymotrypsinogen (to chymotrypsin), so this true statement is not the answer.',
  }},
  14: { root: 'trypsin-substrate-specificity', topic: 'Digestion biochemistry', subtopic: 'Protein digestion', difficulty: 'Moderate', explanations: {
    a: 'Pepsin has a broader specificity favouring aromatic and other bulky hydrophobic residues, not the specific arginine/lysine carboxyl-bond cleavage this question describes.',
    b: 'Trypsin is the correct answer: it cleaves polypeptide bonds specifically at the carboxyl end of the basic amino acids arginine and lysine. This specificity distinguishes it from chymotrypsin (aromatic residues), pepsin (broader hydrophobic specificity) and elastase (small, uncharged residues). Recognising trypsin\'s specific arginine/lysine cleavage pattern is the point of this question.',
    c: 'Chymotrypsin is specific for aromatic residues (phenylalanine, tyrosine, tryptophan), not arginine and lysine.',
    d: 'Elastase is specific for small, uncharged residues such as glycine, alanine and serine, not arginine and lysine.',
  }},
  15: { root: 'trypsin-substrate-specificity', topic: 'Digestion biochemistry', subtopic: 'Protein digestion', difficulty: 'Moderate', explanations: {
    a: 'Tryptophan is instead a target of chymotrypsin\'s aromatic-residue specificity, not trypsin\'s.',
    b: 'Glycine is instead a target of elastase\'s small-residue specificity, not trypsin\'s.',
    c: 'Tyrosine is instead a target of chymotrypsin\'s aromatic-residue specificity, not trypsin\'s.',
    d: 'Lysine is the correct answer: trypsin\'s proteolytic action is specific to the basic amino acids arginine and lysine, cleaving the polypeptide bond at their carboxyl end. This is distinct from chymotrypsin\'s aromatic-residue specificity (tryptophan, tyrosine) or elastase\'s small-residue specificity (glycine), giving these pancreatic endopeptidases complementary, non-overlapping cleavage patterns. Recognising lysine (alongside arginine) as trypsin\'s specific target is the point of this question.',
  }},
  16: { root: 'coeliac-disease-gluten', topic: 'Digestion biochemistry', subtopic: 'Malabsorption disorders', difficulty: 'Easy', explanations: {
    a: 'Keratin is a structural protein of skin and hair, unrelated to coeliac disease\'s dietary trigger.',
    b: 'Collagen is a structural extracellular matrix protein, unrelated to coeliac disease\'s dietary trigger.',
    c: 'Gluten is the correct answer: coeliac disease is an immune-mediated disorder in which ingestion of gluten, a protein in wheat, barley and rye, triggers small intestinal mucosal damage. This damage — villous atrophy and crypt hyperplasia — leads to the malabsorption characteristic of the disease, and withdrawal of dietary gluten is the mainstay of treatment. Recognising gluten as the specific dietary trigger, distinct from other structural or plasma proteins such as keratin, collagen or albumin, is the point of this question.',
    d: 'Albumin is a plasma protein, unrelated to coeliac disease\'s dietary trigger.',
  }},
  17: { root: 'nucleoprotein-digestion-poor-absorption', topic: 'Digestion biochemistry', subtopic: 'Nucleoprotein digestion', difficulty: 'Hard', explanations: {
    a: 'Nucleic acids are found mostly in legumes, cereals and vegetables is false; they are instead concentrated in liver and meat, tissues rich in cell nuclei, not in the plant sources listed.',
    b: 'Purines and pyrimidines are poorly absorbed is the correct answer: once released from dietary nucleic acids by digestion, purines and pyrimidines are poorly absorbed across the intestinal mucosa. This means dietary intake contributes only a minor amount to the body\'s purine/pyrimidine pool relative to endogenous (de novo and salvage pathway) synthesis. Recognising this poor-absorption fact, among three other false statements about nucleoprotein digestion, is the point of this question.',
    c: 'Dietary nucleoproteins are degraded by gastric enzymes into proteins and nucleic acids is false; this degradation instead occurs by pancreatic and intestinal enzymes, not gastric ones, since gastric juice\'s only enzyme, pepsin, is a general protease without this specific nucleoprotein-cleaving role described here.',
    d: 'The nucleotides are hydrolysed by intestinal nucleosidases (phosphorylases) to yield the base and pentose 1-P is false; nucleotidases instead yield the base and free pentose, not pentose 1-phosphate, when hydrolysing nucleotides.',
  }},
  18: { root: 'fatty-liver-not-increased-oxidation', topic: 'Liver metabolism', subtopic: 'Fatty liver pathogenesis', difficulty: 'Moderate', explanations: {
    a: 'Over-mobilisation of fats from adipose tissue, as during starvation, genuinely causes fatty liver, by overwhelming the liver\'s capacity to export triacylglycerol, so this true statement is not the exception.',
    b: 'Increased oxidation of fatty acids is the correct answer: it does NOT cause fatty liver, unlike the other three options. Increased fatty acid oxidation would consume fatty acids rather than allow them to accumulate as triacylglycerol; it is actually decreased, not increased, fatty acid oxidation that is a recognised contributing mechanism to fatty liver. Recognising this direction-of-effect reversal as the exception among these four options is the point of this question.',
    c: 'Decreased apolipoprotein synthesis genuinely causes fatty liver, by impairing VLDL assembly and hepatic triacylglycerol export, so this true statement is not the exception.',
    d: 'Decreased phospholipids for lipoprotein synthesis genuinely causes fatty liver, by similarly impairing VLDL assembly and export, so this true statement is not the exception.',
  }},
  19: { root: 'lipotropic-factors-chloroform-exception', topic: 'Liver metabolism', subtopic: 'Lipotropic factors', difficulty: 'Moderate', explanations: {
    a: 'Essential fatty acids genuinely are a lipotropic factor, needed for phospholipid and lipoprotein synthesis, so this true statement is not the exception.',
    b: 'Methionine genuinely is a lipotropic factor, acting as a methyl donor supporting phosphatidylcholine synthesis for lipoprotein assembly, so this true statement is not the exception.',
    c: 'Folic acid genuinely is a lipotropic factor, supporting methionine regeneration via one-carbon metabolism, so this true statement is not the exception.',
    d: 'Chloroform is the correct answer: it is NOT a lipotropic factor, unlike the other three options. Chloroform is instead a directly hepatotoxic solvent that damages hepatocytes and can itself cause fatty change, the opposite effect of a genuine lipotropic agent. Recognising chloroform as the exception among these otherwise genuine lipotropic factors is the point of this question.',
  }},
  20: { root: 'alcoholic-fatty-liver-nadh-nad', topic: 'Liver metabolism', subtopic: 'Alcoholic liver disease', difficulty: 'Hard', explanations: {
    a: 'Accumulation of fats in the liver genuinely is a manifestation of alcoholic fatty liver, so this true statement is not the exception.',
    b: 'Oxidation of alcohol genuinely occurs in alcoholic fatty liver (via alcohol dehydrogenase and acetaldehyde dehydrogenase), so this true statement is not the exception.',
    c: 'Decreased fatty acid oxidation genuinely is a manifestation of alcoholic fatty liver, driven by the raised NADH/NAD+ ratio from ethanol oxidation, so this true statement is not the exception.',
    d: 'Decreased NADH/NAD ratio is the correct answer: it is NOT a genuine manifestation of alcoholic fatty liver. Ethanol oxidation actually increases, not decreases, the hepatic NADH/NAD+ ratio, and this elevated ratio is what drives decreased fatty acid oxidation and favours triacylglycerol accumulation. Recognising this direction-of-effect reversal as the exception among these four options is the point of this question.',
  }},
  21: { root: 'liver-function-prothrombin-time', topic: 'Liver metabolism', subtopic: 'Liver function tests', difficulty: 'Moderate', explanations: {
    a: 'Serum alpha-fetoprotein (AFP) is instead a tumour marker, elevated in hepatocellular carcinoma, not an index of liver synthetic function.',
    b: 'Serum alanine aminotransferase (ALT) reflects hepatocellular damage/leakage from injured hepatocytes, not the liver\'s ongoing synthetic capacity.',
    c: 'Prothrombin time and concentration is the correct answer: it reflects the liver\'s synthetic capacity for clotting factors (II, VII, IX, X), which have short half-lives, making it a sensitive, good index of current liver synthetic function. This distinguishes it from AFP (a tumour marker), ALT (a hepatocellular damage marker) and plasma ammonia (a detoxification marker). Recognising prothrombin time as specifically a synthetic-function marker is the point of this question.',
    d: 'Plasma ammonia level reflects the liver\'s detoxification (urea cycle) function, not its protein-synthetic function.',
  }},
  22: { root: 'liver-function-tests-afp-in-liver-cancer', topic: 'Liver metabolism', subtopic: 'Liver function tests', difficulty: 'Moderate', explanations: {
    a: 'Plasma ammonia level reflects the liver\'s detoxification (urea cycle) function; it is not the marker that specifically increases in liver cancer.',
    b: 'Serum alpha-fetoprotein (AFP) is the correct answer: it is the characteristic tumour marker that increases in liver cancer (hepatocellular carcinoma), an oncofetal protein normally produced by fetal liver and yolk sac that becomes re-expressed by malignant hepatocytes. This distinguishes AFP from prothrombin time and concentration (a synthetic-function marker) or AST (a hepatocellular damage marker), neither of which is tumour-specific in this way. Recognising AFP as the tumour marker for liver cancer is the point of this question.',
    c: 'Prothrombin time and concentration is a marker of liver synthetic function, not a tumour marker that increases in liver cancer.',
    d: 'Serum aspartate aminotransferase (AST) reflects hepatocellular damage/leakage, not a tumour-specific marker of liver cancer.',
  }},
  23: { root: 'liver-function-transaminases-damage', topic: 'Liver metabolism', subtopic: 'Liver function tests', difficulty: 'Easy', explanations: {
    a: 'Liver cancer is better indicated by a tumour marker such as AFP, not directly by transaminase elevation, which instead reflects hepatocellular damage of any cause.',
    b: 'Liver failure is better reflected by synthetic markers such as prothrombin time and concentration, not directly by transaminase elevation.',
    c: 'Hepatocellular damage is the correct answer: serum transaminases (ALT and AST) are intracellular hepatocyte enzymes released into the blood when hepatocyte membranes are damaged. Their elevation therefore indicates hepatocellular damage specifically, from any cause, not liver cancer, liver failure, or decreased synthetic function directly. Recognising transaminases as damage/leakage markers, distinct from tumour markers (AFP), failure indicators, or synthetic-function markers (prothrombin time), is the point of this question.',
    d: 'Decreased liver synthetic function is instead reflected by markers such as prothrombin time, not directly by transaminase elevation, which reflects cell damage rather than synthetic capacity.',
  }},
  24: { root: 'liver-metabolism-gamma-globulins-exception', topic: 'Liver metabolism', subtopic: 'Liver metabolic functions', difficulty: 'Moderate', explanations: {
    a: 'The liver genuinely is the main organ responsible for regulation of blood glucose, via glycogen synthesis/breakdown and gluconeogenesis, so this true statement is not the exception.',
    b: 'The liver genuinely produces bile salts, for fat digestion, so this true statement is not the exception.',
    c: 'The liver genuinely is the site of storage of glucose as glycogen, so this true statement is not the exception.',
    d: 'It is the site of synthesis of gamma-globulins is the correct answer: this is NOT a genuine liver role. Gamma-globulins (immunoglobulins) are instead synthesised by plasma cells (differentiated B lymphocytes) of the immune system, not by hepatocytes, even though the liver does synthesise most other plasma proteins (albumin, clotting factors, alpha- and beta-globulins). Recognising gamma-globulin synthesis as the exception among these otherwise genuine liver metabolic roles is the point of this question.',
  }},
}
