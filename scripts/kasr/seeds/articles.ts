/**
 * Which article teaches which concept.
 *
 * The validator refuses a question whose concept no article covers — "nothing
 * teaches this question's answer" — and it is right to: a question a student
 * gets wrong with nowhere to go and read is a dead end.
 *
 * Keyed by concept ID rather than by canonical key, so the mapping breaks
 * loudly if a concept is re-minted rather than silently pointing an article at
 * something it no longer teaches.
 */
export const ARTICLE_FOR_CONCEPT: Record<string, string> = {
  // Histology — docs/Kasr-Source-Imports/article/101-ISK-histology.md
  'CON-HEM-5724364F46CD5A': 'ART-101-HIS-GRANULAR-LEUKOCYTES',
  'CON-HEM-CC292B4D6CC61E': 'ART-101-HIS-BLOOD-PLATELETS',
  'CON-FND-EE10AFCE944705': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-9D325B98FC59A0': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-0FAE59E00B748E': 'ART-101-HIS-MEMBRANOUS-SPECIALISATIONS',
  'CON-FND-89FBF21510F273': 'ART-101-HIS-SURFACE-EPITHELIUM',
  // Anatomy and embryology — docs/Kasr-Source-Imports/article/101-ISK-anatomy.md
  'CON-MSK-4018ED42ADDDB4': 'ART-101-ANA-MUSCLE-ATTACHMENTS',
  'CON-MSK-8863ACD7E8D790': 'ART-101-ANA-CARTILAGINOUS-JOINTS',
  'CON-DEV-B84639AB8FF5DE': 'ART-101-ANA-DECIDUA',
  'CON-DEV-72D21476F03993': 'ART-101-ANA-EMBRYONIC-FOLDING',
  'CON-MSK-2B9F47FC205689': 'ART-101-ANA-PECTORALIS-MAJOR',
  'CON-MSK-A49B57B03A3610': 'ART-101-ANA-RADIAL-NERVE',
  // One article teaches both concepts the Hand leaf carries.
  'CON-MSK-BC95DAE3531583': 'ART-101-ANA-HAND-ARTERIES',
  'CON-MSK-1424177E093253': 'ART-101-ANA-HAND-ARTERIES',
  'CON-MSK-782A87EC05EF74': 'ART-101-ANA-ELBOW-JOINT',
  // And one teaches both halves of case 1 — where the breast drains, and the
  // nerve the operation that clears it puts at risk.
  'CON-MSK-1B2BD8EC2B44B8': 'ART-101-ANA-AXILLA-BREAST',
  'CON-MSK-24E318F2E3F18E': 'ART-101-ANA-AXILLA-BREAST',
  // Basis of anatomy — fascia and the fibrous joints.
  'CON-MSK-6CD9FFF51AE9CD': 'ART-101-ANA-DEEP-FASCIA',
  'CON-MSK-17E2267FB4758F': 'ART-101-ANA-FIBROUS-JOINTS',
  // General embryology.
  'CON-DEV-F33BB68138377B': 'ART-101-ANA-FERTILIZATION',
  'CON-DEV-89FC3BBB3C9BCE': 'ART-101-ANA-IMPLANTATION',
  'CON-DEV-E099FAA01BEAEB': 'ART-101-ANA-CHORIONIC-VILLI-PLACENTA',
  'CON-DEV-723B31B1B9ED2E': 'ART-101-ANA-CHORIONIC-VILLI-PLACENTA',
  'CON-DEV-3E918A4C74B56D': 'ART-101-ANA-UMBILICAL-CORD',
  // Upper limb — regions.
  'CON-MSK-26E6BC06A6079C': 'ART-101-ANA-CLAVICLE',
  'CON-MSK-8533FCB18D819B': 'ART-101-ANA-SHOULDER-SPACES-ROTATION',
  'CON-MSK-04D3ACA71DC025': 'ART-101-ANA-SHOULDER-SPACES-ROTATION',
  'CON-MSK-82C4250560D1A1': 'ART-101-ANA-SHOULDER-SPACES-ROTATION',
  'CON-MSK-FD238B6D305E22': 'ART-101-ANA-BRACHIAL-PLEXUS-INJURIES',
  'CON-MSK-528AA0580391C0': 'ART-101-ANA-BRACHIAL-PLEXUS-INJURIES',
  'CON-MSK-798DE81B6EE665': 'ART-101-ANA-BRACHIAL-ARTERY',
  'CON-MSK-44234D1863CE8E': 'ART-101-ANA-FOREARM-RETINACULUM-ROTATION',
  'CON-MSK-E10403A4189B45': 'ART-101-ANA-FOREARM-RETINACULUM-ROTATION',
  'CON-MSK-D5589ECD8F3C27': 'ART-101-ANA-STERNOCLAVICULAR-JOINT',
  // Upper limb — the nerve supply leaf, one article per named nerve.
  'CON-MSK-F4FC0C323C654E': 'ART-101-ANA-UPPER-LIMB-CUTANEOUS-NERVES',
  'CON-MSK-EE022A2043C10F': 'ART-101-ANA-AXILLARY-NERVE',
  'CON-MSK-F125616F7ED37A': 'ART-101-ANA-MUSCULOCUTANEOUS-NERVE',
  'CON-MSK-712EBE5936F7E4': 'ART-101-ANA-RADIAL-NERVE',
  'CON-MSK-9B52018C4649BD': 'ART-101-ANA-MEDIAN-ULNAR-NERVES',
  'CON-MSK-B640E3E982A149': 'ART-101-ANA-MEDIAN-ULNAR-NERVES',
  'CON-MSK-6DD9511FAB3EF1': 'ART-101-ANA-MEDIAN-ULNAR-NERVES',
  // Concepts a landed article already teaches, mapped rather than re-authored.
  'CON-MSK-2145D2D62EC401': 'ART-101-ANA-DEEP-FASCIA',
  'CON-DEV-44A219B862FFD5': 'ART-101-ANA-EMBRYONIC-FOLDING',
  'CON-MSK-8AA227FAC19B41': 'ART-101-ANA-AXILLA-BREAST',
  'CON-MSK-1CA86BE843A07C': 'ART-101-ANA-SHOULDER-SPACES-ROTATION',
  // Second wave of anatomy leaves.
  'CON-MSK-1E40050F141F4C': 'ART-101-ANA-SYNOVIAL-JOINTS',
  'CON-DEV-5E63C211DEEE00': 'ART-101-ANA-PARAXIAL-MESODERM',
  'CON-DEV-F356C3B8CFD31E': 'ART-101-ANA-AMNIOTIC-FLUID',
  'CON-MSK-74BFAB9385B955': 'ART-101-ANA-CUBITAL-FOSSA',
  'CON-MSK-CF723B5FB24D70': 'ART-101-ANA-BRACHIAL-PLEXUS',
  'CON-MSK-25C6698A72A982': 'ART-101-ANA-ULNAR-ARTERY',
  'CON-MSK-EA4C451C8749B9': 'ART-101-ANA-SHOULDER-JOINT',
  'CON-MSK-DF8F395F3D471E': 'ART-101-ANA-SCAPULAR-ANASTOMOSIS',
  // Histology — concepts a landed article already teaches, or now teaches after
  // being extended. The monocyte's leaf-correct home is
  // ART-101-HIS-NON-GRANULAR-LEUKOCYTES, in a sibling batch file this pass was
  // not permitted to edit; the reason it is declared on the connective tissue
  // article instead is recorded in that article's `conflicts`.
  'CON-HEM-77B701F6105076': 'ART-101-HIS-GRANULAR-LEUKOCYTES',
  'CON-HEM-5559E34E79085D': 'ART-101-HIS-GRANULAR-LEUKOCYTES',
  'CON-FND-0BB73C5CC1821B': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-CC62175DBE7355': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-45A380D5F6A77F': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-2E2D5D5817E5F5': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-HEM-22B546E0AA7D80': 'ART-101-HIS-NON-GRANULAR-LEUKOCYTES',
  'CON-FND-0B3CC0A79F9150': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-56B72DE04F5FED': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-1D529ACEC2E2F3': 'ART-101-HIS-SECRETORY-PATHWAY-ORGANELLES',
  'CON-FND-F1914E2CE56EBF': 'ART-101-HIS-MITOCHONDRIA-AND-CYTOSKELETON',
  'CON-FND-73F10C624D4BE1': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  // The last six, wired after checking each article genuinely teaches its
  // concept rather than merely sitting on the same leaf. The notochord goes to
  // its own article and not to the paraxial-mesoderm one, which says a great
  // deal about where the notochord lies and nothing about the four steps or the
  // nucleus pulposus — declaring it there would have been a lie the validator
  // cannot catch.
  'CON-DEV-1BCF37C48AF307': 'ART-101-ANA-NOTOCHORD',
  'CON-MSK-951D4DFF864245': 'ART-101-ANA-BRACHIAL-ARTERY',
  'CON-MSK-88711B7586CF2F': 'ART-101-ANA-SHOULDER-JOINT',
  'CON-FND-9EA7F8E2898EB7': 'ART-101-HIS-CT-CELLS-COMPARED',
  'CON-HEM-9F3C4150F1076B': 'ART-101-HIS-NON-GRANULAR-LEUKOCYTES',
  'CON-FND-834F212F6343CE': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  // Practical (spot) identification concepts. These do not fail the validator
  // the way a question's concept does — nothing refuses a practical concept no
  // article teaches — so the gap they closed was a content gap and not a red
  // check: a student who failed a spot had nowhere to go and read.
  //
  // Cytoplasm. Nine of these the article already taught and only needed
  // claiming; five arrived with the article extended first — the trilaminar
  // unit membrane, the centriole's nine triplets, the glycogen and fat
  // inclusions with their stains, and Nissl's granules. The reason each of the
  // five was written rather than merely declared is in that article's `notes`.
  'CON-FND-8BD70C3ED36B79': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-ED156BF8FBFD46': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-E0B130AC5EC939': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-89F4A730D095B7': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-F4DF782C697CCF': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-0492C40A7F76E7': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-08378767774524': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-369A1D27DFE0DD': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-82768007A697F1': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-4AE74C678A6F64': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-ACF503263BA7D7': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-759499A4A27938': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-7650D31963FEBD': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  'CON-FND-53E16F5D4E3538': 'ART-101-HIS-CYTOPLASMIC-ORGANELLES',
  // Surface epithelium. Four were already taught; the keratinised-against-
  // non-keratinised decision and the stereocilia arrived with the article
  // extended first.
  'CON-FND-CC0954729ED55F': 'ART-101-HIS-SURFACE-EPITHELIUM',
  'CON-FND-8760847341DE80': 'ART-101-HIS-SURFACE-EPITHELIUM',
  'CON-FND-A214482F13AD8D': 'ART-101-HIS-SURFACE-EPITHELIUM',
  'CON-FND-9715187C19E7FA': 'ART-101-HIS-SURFACE-EPITHELIUM',
  'CON-FND-28F7FA711C1C1C': 'ART-101-HIS-SURFACE-EPITHELIUM',
  'CON-FND-8EEA6972B77898': 'ART-101-HIS-SURFACE-EPITHELIUM',
  // Types of connective tissue proper. All five needed the article extended
  // first: it carried composition, sites and function for every type and
  // almost nothing about what any of them looks like on a section.
  'CON-FND-3E3303864A3CE8': 'ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE',
  'CON-FND-49D5829AC3DCA1': 'ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE',
  'CON-FND-7FB8290199B237': 'ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE',
  'CON-FND-B33D27A8517527': 'ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE',
  'CON-FND-4671C4D2911392': 'ART-101-HIS-TYPES-OF-CONNECTIVE-TISSUE',
  // Connective tissue cells. Three of the four the article already taught in
  // full — the macrophage with its vital stain, the plasma cell against the
  // mast cell, and the two fat cells. Only the fibroblast needed writing: the
  // article described the cell, and the spot exam asks for a nucleus among
  // fibre bundles, which is not the same picture.
  'CON-FND-2030501B814D35': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-90E8073879B42A': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-B83D7EAAF68D3B': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  'CON-FND-97930723FE0D94': 'ART-101-HIS-CONNECTIVE-TISSUE-CELLS',
  // Nucleus. The envelope and the chromatin comparison were already taught;
  // the open-face-against-closed-face concept needed the article extended,
  // because the article carried that idea under the book's names (pale
  // vesicular, dark condensed) and the spot exam asks it under the plate's.
  'CON-FND-E2DE55693981A7': 'ART-101-HIS-NUCLEUS',
  'CON-FND-C81FD3E574D3AA': 'ART-101-HIS-NUCLEUS',
  'CON-FND-BAABF179A898ED': 'ART-101-HIS-NUCLEUS',
}
