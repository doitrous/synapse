# AU-MED-102 · Biochemistry · Molecular biology & cell signalling — sparse updates
# against Kasr Year 1 concepts that are not yet live (HIT-PENDING, LANE-BRIEF §16 rule 1).
# Apply only after the named Kasr file is live. Do not import from this folder directly —
# see pending-live/INDEX.md for the exact ordering line per record.
#
# Validate each with:
#   npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-102-biochem-molecular.md --with docs/Kasr-Source-Imports/concept/<target file>.md
# (fails without --with, passes with it — that is the correct, expected state per the
# chief of staff's 2026-08-22 note on brief §19.)

# Item

## id
CON-FND-5BAF472E54A764

## label
The two strands of the DNA double helix run antiparallel and are held to each other only by hydrogen bonds between complementary bases — two for A-T and three for G-C

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: Tested by AU-MED-102 Biochemistry's DNA & RNA MCQ bank (src_80f6b1121bd3b85f8886, Q24, Q43) and the AFM master bank's Molecular Biology section (src_01ab4268402d32d4d111, Q11, Q25) — both ask for the hydrogen-bond count per base pair and the antiparallel arrangement, the same objective this concept already teaches.

---

# Item

## id
CON-FND-A73C06E0EC3C1D

## label
The five eukaryotic DNA polymerases divide the work of replication: α primes, β repairs, γ copies mitochondrial DNA, δ makes the lagging strand and ε makes the leading strand

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: Tested by AU-MED-102 Biochemistry's DNA & RNA MCQ bank (src_80f6b1121bd3b85f8886, Q57) asking which eukaryotic DNA polymerase carries proofreading (the standard teaching answer is delta, the same polymerase this concept already names as the leading-strand enzyme); recorded as the same idea rather than a new one because the role assignment is what the question tests.

---

# Item

## id
CON-FND-27013C64915C7E

## label
Splicing removes introns and joins exons using the snRNP spliceosome, and splicing the same primary transcript differently yields several proteins from one gene

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: Tested by AU-MED-102 Biochemistry's DNA & RNA MCQ bank (src_80f6b1121bd3b85f8886, Q8 "intron is the portion of mRNA removed after transcription", Q75 "segments retained after conversion of pre-mRNA to mature mRNA = exons") and the AFM master bank (src_01ab4268402d32d4d111, Q7). Both the intron definition and the "exons are retained" fact are the same splicing concept this record already teaches.

---

# Item

## id
CON-FND-CC55F157021237

## label
The two promoter boxes divide the work — TATA says where transcription starts and CAAT and GC say how often — while TFIIH opens the strands, polyadenylation sets how long the message lives, and alternative splicing decides how many proteins the gene yields

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: Tested by AU-MED-102 Biochemistry's DNA & RNA MCQ bank (src_80f6b1121bd3b85f8886, Q37 "a promoter is a specific sequence of DNA to which RNA polymerase binds") and the AFM master bank (src_01ab4268402d32d4d111, Q38). The promoter-definition half of this concept is what the AU question tests; the TATA/CAAT/polyadenylation detail is not separately examined here.

---

# Item

## id
CON-FND-D6DFABFBA0BA5E

## label
Free nucleotides do six different jobs — carry energy, signal as second messengers, donate methyl and sulfate groups, carry hydrogen and carry acyl groups — and which one a nucleotide does is fixed by the group hung on it, not by its base

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: Tested three separate ways by AU-MED-102 Biochemistry's DNA & RNA MCQ bank (src_80f6b1121bd3b85f8886): Q21 names cAMP as the second-messenger job, Q22 names SAM (active methionine) as the methyl-donor job, Q23 names PAPS as the sulfate-donor job — all three are the same "which job does this nucleotide-derived molecule do" objective already taught here, corroborated by the AFM master bank's Molecular Biology section (src_01ab4268402d32d4d111, Q23-24, Q28).

---

# Item

## id
CON-FND-4508AC0EA86F86

## label
A base substitution in a coding region is nonsense if it creates a stop codon, missense if it changes the amino acid, and silent if the new codon is a synonym

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: Tested three ways by AU-MED-102 Biochemistry's DNA & RNA MCQ bank (src_80f6b1121bd3b85f8886): Q32 (which mutation type produces a stop codon = nonsense), Q67 (silent-mutation definition), and Q17/Q85 plus the short and long EOM papers' sickle-cell items (the HbS Glu6→Val substitution is graded "partially acceptable missense" — the same three-way classification this concept already teaches, applied to a named clinical example). Sub-lane C's protein-chemistry concept for the sickle Hb substitution itself (which amino acid replaces which) is the companion record for the same clinical vignette; this record is only the mutation-type classification.

---

# Item

## id
CON-FND-42F34977A8DF23

## label
The four receptor types transduce signals on four different timescales, from milliseconds at an ion channel to hours at a nuclear receptor

## universities
+au

## modules
+AU-MED-102


## learner_years
+1

## field_notes
examSignal: This is the general receptor-mechanism taxonomy the AU-MED-102 Biochemistry Cell Signaling MCQ bank (src_4ff0b2fb099c99bb896e) tests directly and repeatedly: Q1/Q12 (hydrophilic vs hydrophobic ligand and where its receptor sits), Q3 (GPCR structure), Q4/Q11 (ligand-gated ion channels), Q6 (growth-factor receptors = receptor tyrosine kinases), Q9 (steroid hormones bind intracellular receptors) — five of this bank's fourteen questions are five different probes of the same four-way classification already taught here.
crossLaneBoundary: The myasthenia gravis / nicotinic-receptor vignette that appears on more than one AU-MED-102 sitting is authored by this Biochemistry lane for the receptor-mechanism classification (nicotinic receptor as a ligand-gated ion channel); the AU-MED-102 Histology + Physiology lane owns the anatomical and clinical (neuromuscular junction, autoimmune) teaching of the same vignette. Concepts carry no `university_notes` column (that field exists on articles only, per the schema) — recorded here instead so the two lanes do not double-author the same question.
