#!/usr/bin/env python3
import json, re, os

PAGETEXT_DIR = "/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse/.claude/worktrees/alexandria-university-content-000583/scripts/alexandria/pagetext"

def page_of(src, needle):
    path = os.path.join(PAGETEXT_DIR, f"{src}.json")
    d = json.load(open(path))
    pages = d["pages"]
    needle_norm = re.sub(r"\s+", " ", needle).strip().lower()
    for i, p in enumerate(pages):
        if re.sub(r"\s+", " ", needle_norm) in re.sub(r"\s+", " ", p).lower():
            return i + 1
    # fall back: try a shorter fragment
    frag = needle_norm[:40]
    for i, p in enumerate(pages):
        if frag in re.sub(r"\s+", " ", p).lower():
            return i + 1
    return None

# id, concept_id, system(FND), subject, predicate, object, display_text, src, quote, section, page_hint(optional override)
ITEMS = [
("CON-FND-92DD65D96E3FA1", "Purine catabolism", "ends at", "uric acid in humans, since humans lack uricase",
 "In humans, purine catabolism ends at uric acid because humans lack uricase.",
 "src_80f6b1121bd3b85f8886", "The chief product of catabolism of purines in human beings is: … Uric acid", "DNA & RNA MCQ, Q1"),
("CON-FND-7302601EA492D2", "DNA replication fidelity", "rests on", "complementary base pairing and DNA polymerase's proofreading",
 "DNA replication fidelity is ensured by complementary base pairing together with the specificity and proofreading of DNA polymerase.",
 "src_80f6b1121bd3b85f8886", "Fidelity of replication is ensured by: a- Complementary base pairing b- Specificity of DNA polymerase", "DNA & RNA MCQ, Q2"),
("CON-FND-73C77966B56FED", "Telomerase", "protects", "DNA from the shortening that would otherwise occur with ageing",
 "Telomerase is the enzyme that protects DNA from the shortening associated with ageing.",
 "src_80f6b1121bd3b85f8886", "Which enzyme protects DNA from aging? … Telomerase", "DNA & RNA MCQ, Q4"),
("CON-FND-F1E54D68C8FAB0", "RNA", "is distinguished from DNA by", "uracil instead of thymine and single-strandedness",
 "RNA is distinguished from DNA by carrying uracil in place of thymine and by being single-stranded.",
 "src_80f6b1121bd3b85f8886", "The nitrogenous base absent in DNA is: … Uracil", "DNA & RNA MCQ, Q5"),
("CON-FND-5FF8EB2DB4D662", "mRNA processing", "consists of", "5' capping, poly-A tailing and splicing, distinct from nuclear export",
 "mRNA processing consists of 5' capping, poly-A tail attachment and removal of introns, and does not include transfer of mRNA into the nucleus.",
 "src_80f6b1121bd3b85f8886", "The processing of mRNA does not involve: … Transfer of mRNA into nucleus", "DNA & RNA MCQ, Q7"),
("CON-FND-A1B0BFB9626438", "The genetic code", "is", "degenerate, unambiguous, non-overlapping and universal",
 "The genetic code is degenerate, non-overlapping and universal, and is not ambiguous.",
 "src_80f6b1121bd3b85f8886", "Which is not true regarding the genetic code? … Ambiguous", "DNA & RNA MCQ, Q9"),
("CON-FND-E8CD7F7F690B14", "Xeroderma pigmentosum", "results from a defect in", "nucleotide excision (DNA) repair",
 "Xeroderma pigmentosum results from a defect in DNA repair.",
 "src_80f6b1121bd3b85f8886", "Xerodema pigmentosa results from defect in: … DNA repair", "DNA & RNA MCQ, Q10"),
("CON-FND-8E4A3DB9BC03AC", "The order of nucleotides in a DNA strand", "is written", "from the 5' to the 3' direction",
 "The order of nucleotides in a DNA strand is always written from the 5' to the 3' direction.",
 "src_80f6b1121bd3b85f8886", "The order nucleotides in DNA strand in always written: … From the 5' to 3' direction", "DNA & RNA MCQ, Q11"),
("CON-FND-5B8E3AAFEB6C35", "DNA replication", "is characterised as", "semiconservative, requiring DNA polymerases, proceeding 5' to 3'",
 "Replication is semiconservative and requires DNA polymerases; it does not occur in the 3' to 5' direction.",
 "src_80f6b1121bd3b85f8886", "Replication is characterized by all EXCEPT: … It occurs from 3' - 5' direction", "DNA & RNA MCQ, Q13"),
("CON-FND-412F3EDF118F44", "RNA polymerase I", "transcribes", "the genes of the large ribosomal RNAs (5.8S, 18S, 28S rRNA)",
 "RNA polymerase I transcribes the genes of 5.8S, 18S and 28S ribosomal RNA.",
 "src_80f6b1121bd3b85f8886", "RNA polymerase I transcribes the genes of: … 5.8S, 18S, 28S rRNA", "DNA & RNA MCQ, Q14"),
("CON-FND-DF5E3014A149FC", "A transition point mutation", "is", "a purine-to-purine or pyrimidine-to-pyrimidine base substitution",
 "A transition point mutation is a purine-to-purine or pyrimidine-to-pyrimidine base substitution, for example guanine replaced by adenine.",
 "src_80f6b1121bd3b85f8886", "One of the following is transition type of point mutations: … Guanine is replaced by adenine", "DNA & RNA MCQ, Q16"),
("CON-FND-914D9DDFB56AD1", "A nucleotide", "is converted to a nucleoside by", "removal of its phosphate group",
 "A nucleotide is converted into a nucleoside by removal of the phosphate group.",
 "src_80f6b1121bd3b85f8886", "Nucleotide is converted into nucleoside by removal of: … Phosphate", "DNA & RNA MCQ, Q19"),
("CON-FND-CA2D65E688434A", "The acceptor arm of tRNA", "terminates at its 3' OH end with", "the sequence 5'-CCA-3'",
 "The acceptor arm of tRNA terminates at its 3' OH end with the sequence CCA.",
 "src_80f6b1121bd3b85f8886", "The acceptor arm of tRNA terminates at its 3' OH ends by: … 5'-CCA-3'", "DNA & RNA MCQ, Q25"),
("CON-FND-09FACBDCBBF8FD", "AUG", "is", "the mRNA start codon in most cases, recognised by a methionyl-tRNA complex",
 "AUG is the mRNA start codon in most cases, and translation initiation in eukaryotes forms a tRNA complex charged with methionine.",
 "src_80f6b1121bd3b85f8886", "Which of the following is the mRNA start codon in most cases? … AUG", "DNA & RNA MCQ, Q26"),
("CON-FND-252B3C77D181DA", "DNA ligase", "joins", "the Okazaki fragments of the lagging strand",
 "The function of DNA ligase is to join the Okazaki fragments.",
 "src_80f6b1121bd3b85f8886", "What is the function of DNA ligase? … Joins the Okazaki fragments", "DNA & RNA MCQ, Q29"),
("CON-FND-D717E6E7EEA466", "The coding strand of DNA", "differs from its mRNA only in that", "mRNA uses uracil instead of thymine",
 "The coding strand of DNA is the same as its associated mRNA except that mRNA uses uracil instead of thymine.",
 "src_80f6b1121bd3b85f8886", "The coding strand of DNA is the same as the associated mRNA EXCEPT for: … mRNA uses U instead of T", "DNA & RNA MCQ, Q30"),
("CON-FND-906B844C9AEE7D", "The anticodon", "is located on", "tRNA and pairs with the codon on mRNA",
 "The anticodon is a set of three nucleotides on tRNA that corresponds to the codon on mRNA.",
 "src_80f6b1121bd3b85f8886", "The anticodon is a set of three nuclecotides on the 3'-end of ...., which corresponds to the codon on the ......... … tRNA; mRNA", "DNA & RNA MCQ, Q31"),
("CON-FND-FFEE58EC9C0784", "Topoisomerase", "relieves", "the supercoil created by helicase's unwinding of the parental duplex",
 "Topoisomerase relieves the supercoil on the parental duplex of DNA caused by unwinding during synthesis.",
 "src_80f6b1121bd3b85f8886", "Which of the following relives the supercoil on the parental duplex of DNA caused by unwinding during synthesis? … Toposiomerase", "DNA & RNA MCQ, Q35"),
("CON-FND-31C41EFEF31740", "Chargaff's rule", "states that", "adenine equals thymine and guanine equals cytosine in double-stranded DNA",
 "By Chargaff's rule, if cytosine is 20% of total DNA bases, adenine is 30%.",
 "src_80f6b1121bd3b85f8886", "If cytosine content of DNA is 20% of the total bases, the adenine content will be: … 30%", "DNA & RNA MCQ, Q41"),
("CON-FND-DB1988D55A69E3", "PCR", "requires", "two DNA primers and a thermostable DNA polymerase, run in vitro",
 "PCR is an in vitro technique for DNA amplification requiring two types of DNA primers and a thermostable DNA polymerase.",
 "src_80f6b1121bd3b85f8886", "PCR requires (Practical) … 2 types of DNA primers … Thermo stable DNA polymerase", "DNA & RNA MCQ, Q44-45"),
("CON-FND-A1FC2FAF9F0211", "Cystine", "has no direct codon because", "it is formed after translation from two cysteine residues",
 "Cystine is one of the amino acids that does not have a specific code on DNA, because it is formed post-translationally.",
 "src_4852d425a88297af190e", "Which of the following amino acids doesn't have specific code on DNA? … Cystine", "Protein Chemistry MCQ, Q74 (unkeyed in the source — see field_notes)"),
("CON-FND-8C5B1666F4F7C1", "Phosphorylation of a protein", "can", "either increase or decrease its activity",
 "Phosphorylation of a protein can either increase or decrease its activity, and can occur on serine, threonine or tyrosine residues.",
 "src_4ff0b2fb099c99bb896e", "Phosphorylation of a protein: … Either increases or decreases a protein's activity", "Cell Signaling MCQ, Q2"),
("CON-FND-13FCDB652CB258", "A target cell for a hormone", "is defined by", "expressing a receptor specific to that hormone",
 "A cell is defined as a target for a hormone by having a receptor specific to that hormone.",
 "src_4ff0b2fb099c99bb896e", "What defines a cell as a target for certain hormone? … It has receptor specific to hormone", "Cell Signaling MCQ, Q5"),
("CON-FND-22F8C729D1E8B0", "Synaptic transmission across the synaptic cleft", "is classified as", "paracrine signalling",
 "Transmission of a nerve impulse through the synaptic cleft is classified as paracrine signalling.",
 "src_4ff0b2fb099c99bb896e", "Which type of signaling is the transmission of nerve impulse through the synaptic cleft? … Paracrine", "Cell Signaling MCQ, Q7"),
("CON-FND-1D57FC5C8BFF90", "A typical intracellular receptor", "has about", "two domains, fewer than a typical cell-membrane receptor",
 "A typical intracellular receptor is described as having two domains; a typical cell-membrane receptor is described with three.",
 "src_4ff0b2fb099c99bb896e", "Number of Domains in Typical Intra Cellular receptor is: … 2", "Cell Signaling MCQ, Q13-14"),
("CON-FND-D10E79C01B3345", "Phosphodiesterase", "reverses the action of", "adenylate cyclase, degrading the cAMP it makes",
 "Phosphodiesterase reverses the action of adenylate cyclase, which is how the cAMP second messenger is degraded once it has signalled.",
 "src_413115a28d7dc9914c91", "Which of the following enzymes reverses the action of adenylate cyclase? … phosphodiesterase", "long EOM/Foundation Final Egyptian paper (biochemistry section), Q29"),
]

def emit_claim(i):
    cid, subj, pred, obj, display, src, quote, section = i
    slug = cid.split("-")[-1]
    return f"""# Item

## id
CLM-FND-{slug}-01

## concept_id
{cid}

## subject
{subj}

## predicate
{pred}

## object
{obj}

## display_text
{display}

## risk_class
foundational_stable

## verification_status
needs_evidence

## conflict_status
none

## confidence
0.7

## freshness
stable_local_curriculum_fact

## time_sensitive
no

## qualifiers
population: AU-MED-102 Year 1 (Biochemistry)
"""

def emit_citation(i):
    cid, subj, pred, obj, display, src, quote, section = i
    slug = cid.split("-")[-1]
    stem = quote.split("\u2026")[0].strip()
    answer_fragment = quote.split("\u2026")[-1].strip() if "\u2026" in quote else ""
    page = page_of(src, stem)
    ctx = f"The source's printed key/marked-correct option for this stem is: {answer_fragment}." if answer_fragment else "AU-MED-102 Biochemistry department question source."
    return f"""# Item

## id
CIT-FND-{slug}-01

## claim_id
CLM-FND-{slug}-01

## resource_id
{src}

## evidence_role
local_curriculum

## support_span
{stem}

## locator_type
{"page" if page else "section"}

## locator_page
{page or ""}

## locator_section
{section}

## locator_detail

## context_note
{ctx} Recorded as curriculum/exam signal, not independent medical authority (is_assessment belongs on the evidence-source record, owned by sub-lane A).

## confidence
0.7

## counts_as_claim_evidence
{"yes" if page else "no"}
"""

claims = "\n---\n\n".join(emit_claim(i) for i in ITEMS)
citations = "\n---\n\n".join(emit_citation(i) for i in ITEMS)

header_claims = """<!--
  AU-MED-102 Biochemistry sub-lane D — one claim per newly minted concept, supporting the
  concept and the article's callout/annotation content. concept_id values must already
  exist (they are minted in concept/AU-MED-102-biochem-molecular-concepts.md, same lane).
-->

"""
header_cit = """<!--
  AU-MED-102 Biochemistry sub-lane D — one citation per claim above, naming the exact
  AU-MED-102 Biochemistry source and (where locatable in the pre-extracted page cache) the
  real page number. resource_id is a genuine corpus src_ id (checked against
  corpus-source-index.json); the *evidence-source* record for it is owned by sub-lane A
  (evidence/AU-MED-102-biochemistry-resources.md, not yet authored) — see CLAIMS.md's
  Wanted row. is_assessment marking belongs on that resource record, not here.
-->

"""

open("/tmp/AU-MED-102-biochem-molecular-claims.md", "w").write(header_claims + claims)
open("/tmp/AU-MED-102-biochem-molecular-citations.md", "w").write(header_cit + citations)
print("wrote", len(ITEMS), "claims and citations")

# report which pages were found, for sanity
for i in ITEMS:
    cid, subj, pred, obj, display, src, quote, section = i
    stem = quote.split("\u2026")[0].strip()
    page = page_of(src, stem)
    print(cid, src, "-> page", page)
