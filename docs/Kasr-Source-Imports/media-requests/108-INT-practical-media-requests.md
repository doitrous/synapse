# Practical media requests — 108 INT

Ten requests, one per teaching item. Every item in this module's practical is an
identify-this station, so there is no request here that a caption could stand in for.

**Why this file exists.** [`media-audit.md`](media-audit.md) establishes that the
repository holds zero medical images — no micrograph, no gross photograph, no
radiograph. Every item catalogued for this module therefore needs an image that does
not exist yet, and the practical cannot run until a human sources them. Nothing here
was generated, downloaded or saved. These are written requests to be fulfilled.

**Source.** `Dpt Book Pathology Practical [INT-108].pdf`, 12 pages, manifest source ID
`src_a2ffe25e8362fe840ceb` — see [`../manifest/kasr-y1-sources.json`](../manifest/kasr-y1-sources.json).
The catalogue behind these requests is `scripts/kasr/extract/108-INT/practical.json`.

**Format.** Each block is a `media_needed` / `media_recommendations` entry in the grammar
parsed by `parseMediaRequests` (`src/data/bulkImport.ts:485`): a `### <medium> · <label>`
heading followed by labelled lines. `Kind:` is drawn from `MEDIA_REQUEST_KINDS`,
`Priority:` from `MEDIA_REQUEST_PRIORITIES`, `Status:` from `MEDIA_REQUEST_STATUSES`
(`src/data/contentControl.ts:104-128`). Paste a block into the `media_needed` column of
the practical row that owns it; the owning item's ID is on the `Notes:` line.

**Counts.** 10 required · 0 strongly helpful · 0 optional. 6 micrographs · 4 gross
specimens.

**Why everything is `required`.** `required` means the station cannot be answered
without the image. That is true of all ten: the atlas's caption *is* the answer key, so
an item shipped without its plate is an answer with no question. Nothing here is
`optional`, because the extract contains no schematic and no redrawable diagram — there
is nothing whose teaching point survives being described in words.

**Stains are named once and never inferred.** Only `INT108-MEDIA-06` states its stain.
Elsewhere the atlas prints none, and the requests say so rather than assuming H&E — even
where the caption gives a colour cue such as "homogenous pink" or "blue basophilic".
A colour is evidence about the section, not a statement of how it was prepared, and a
request that specifies the wrong stain will be filled with the wrong image. Magnification
is null throughout: the atlas prints none on any plate.

---

## A rights warning found in the source

The atlas's own preface, on PDF page 3, admits that **"only few pictures are downloaded
from websites"**. The departmental book therefore contains images the faculty does not
own, and it does not say which ones.

So: **never re-host an image traced back to this PDF without a licence check.** Every
request below asks for a freshly licensed equivalent or an original departmental
photograph, and every `Rights:` line is written on the assumption that nothing is cleared
until someone has recorded a licence and a photographer.

## Two things to settle before these are filled

**The atlas is an excerpt — these ten items are about 23% of it.** Its printed page
numbers run 1, 2, 3, 4 and then jump to 22, 23, 24. Seventeen printed pages (5–21) are
absent outright, and the book continues past 24 by an unknown amount. Every teaching page
held carries exactly two items, which makes the rate safe to project: the twenty
histopathology teaching pages imply about forty items against the six held, so at least
44 in total. **Ask the department for printed pages 5–21 and everything after 24** before
treating this media set as the module's practical.

**`INT108-MEDIA-08` has an unresolved contradiction in the source.** For specimen C19-1
the gross description says the *left* ventricle is hypertrophied and dilated, the
diagnosis beneath says the *right*, and the plate itself is labelled "L.V." — confirmed on
the rendered page at 300 dpi, so it is a defect in the book rather than an OCR error. The
diagnosis list also ends with an empty item "4.". A pathologist must resolve which
ventricle before that item publishes. The request is written so the sourced photograph can
be labelled either way; do not caption it until the department has answered.

---

## Histopathology — micrographs

*6 requests.*

### image · Hyaline degeneration, spleen
Brief: Micrograph of spleen in which the capsule and a fibrous trabecula are both in frame and visibly thickened and structureless, together with a lymphoid follicle whose central arteriole shows a thickened wall and a narrowed lumen.
Purpose: The station asks the student to identify the lesion and the organ from the section. There is no text on the stem the answer can be read off.
Priority: required
Status: needed
Kind: histology
Notes: Owning item: INT108-PRAC-PATHO-S07 (SLIDE (7)). Stain: not named by the source; the caption calls the hyalinosis "homogenous pink", which is a colour cue only and not a statement of stain. Magnification: not printed. Structures that must be visible and markable: splenic capsule showing hyalinosis; fibrous trabecula showing hyalinosis; lymphoid follicle; central arteriole with thickened wall and narrowed lumen.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF — its preface admits some images were downloaded from websites.

### image · Fatty degeneration (steatosis), liver
Brief: Micrograph of liver in which hepatocytes are distended by large empty cytoplasmic vacuoles with the nucleus displaced to one side, so the signet-ring appearance is unmistakable at the printed size.
Purpose: Identify-the-lesion station. The empty vacuole is the whole teaching point and cannot be described into existence.
Priority: required
Status: needed
Kind: histology
Notes: Owning item: INT108-PRAC-PATHO-S09 (SLIDE (9)). Stain: not named by the source. Magnification: not printed. Structures that must be visible and markable: hepatocytes with empty cytoplasmic vacuoles; nuclei pushed to one side giving the signet-ring appearance; adjacent unaffected hepatocytes for contrast.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

### image · Traumatic fat necrosis
Brief: Micrograph of adipose tissue showing ghost outlines of dead fat cells ringed by foamy macrophages, with at least one multinucleated giant cell in the same field.
Purpose: Identify-the-lesion station. The three named cell types are the mark scheme, so all three must be in one field.
Priority: required
Status: needed
Kind: histology
Notes: Owning item: INT108-PRAC-PATHO-DS01. Stain: not named by the source. Magnification: not printed. Structures that must be visible and markable: ghosts of fat cells; foamy macrophages; multinucleated giant cells.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

### image · Infarction, kidney
Brief: Micrograph of kidney containing both infarcted and viable tissue in one field, so the preserved outlines of coagulative necrosis can be compared directly with the living parenchyma beside them, with the inflammatory margin included.
Purpose: Identify-the-lesion station. The comparison is the teaching point, so a field of pure necrosis will not do.
Priority: required
Status: needed
Kind: histology
Notes: Owning item: INT108-PRAC-PATHO-DS02. Stain: not named by the source. Magnification: not printed. Structures that must be visible and markable: zone of coagulative necrosis with maintained architecture; adjacent viable renal tissue; inflammatory cells at the margin. The atlas's caption points at the necrotic zone with an arrow, so leave room for an arrow marker over that zone.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

### image · Dystrophic calcification
Brief: Micrograph of fibrotic tissue carrying basophilic calcific deposits, with the characteristic ragged tearing at the calcified foci left visible rather than cropped out.
Purpose: Identify-the-lesion station, and the tearing artefact is itself examinable — the caption explains it, so the image must contain it.
Priority: required
Status: needed
Kind: histology
Notes: Owning item: INT108-PRAC-PATHO-DS03. Stain: not named by the source; the caption's "basophilic" is a colour cue only. Magnification: not printed. Structures that must be visible and markable: basophilic calcific deposits; surrounding fibrous tissue; inflammatory cells; ragged or torn foci left by the microtome cutting through calcium.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

### image · Prussian blue — hepatic haemochromatosis
Brief: Paired plate of the same haemochromatotic liver: one Prussian-blue section in which the haemosiderin is blue, and one H&E section of comparable field in which the same pigment is brown. Both sections must be in the one plate.
Purpose: Identify-the-stain-and-the-pigment station. The teaching point is the colour change between the two stains, so a single section teaches half the caption and cannot be marked against it.
Priority: required
Status: needed
Kind: histology
Notes: Owning item: INT108-PRAC-PATHO-DS04. Stain: Prussian blue, with H&E named as the comparison section — the only plate in the extract whose stain the source states. Magnification: not printed. Structures that must be visible and markable: blue haemosiderin granules in the Prussian-blue section; brown haemosiderin granules in the H&E section; hepatocytes in both. This is one request for a two-section plate, not two requests.
Source direction: An original section photographed by the pathology department, Cairo University, or an openly licensed histopathology teaching collection. Both sections should come from the same case.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

---

## Gross specimens

*4 requests.*

### image · Brown atrophy of the heart
Brief: Photograph of a heart opened on the left side, framed with the aorta in shot so the reduced cardiac size can be judged against it, showing dark brown myocardium, tortuous surface coronaries, and pericardial fat replaced by gelatinous serous tissue.
Purpose: Identify-the-specimen station. All five gross findings are read off the photograph, and the size judgement in particular fails if the aorta is cropped out.
Priority: required
Status: needed
Kind: clinical photograph
Notes: Owning item: INT108-PRAC-PATHO-C18-1. Stain: not applicable to a gross specimen. Structures that must be visible and markable: dark brown myocardium; the heart small relative to the aorta in the same frame; tortuous coronary arteries on the outer surface; serous atrophy of pericardial fat; yellow atherosclerotic patches on the aorta.
Source direction: An original photograph of the numbered museum specimen held by the pathology department, Cairo University, or an openly licensed gross-pathology atlas.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

### image · Fatty change of the heart (tabby cat)
Brief: Photograph of a heart with the chambers opened, showing yellow myocardium and columnae carneae mottled with alternating brown and yellow bands — the tabby-cat striping — with the aorta and mitral valve in frame.
Purpose: Identify-the-specimen station. The striping is the diagnosis and only survives as an image.
Priority: required
Status: needed
Kind: clinical photograph
Notes: Owning item: INT108-PRAC-PATHO-C19-1. Stain: not applicable to a gross specimen. Structures that must be visible and markable: yellow myocardium; brown-and-yellow banded columnae carneae; a hypertrophied and dilated ventricle; yellow atherosclerotic patches on the aorta and mitral valve. **Unresolved in the source:** the gross description says left ventricle, the diagnosis says right, and the plate is labelled "L.V.". Frame the photograph so either can be labelled, and do not caption it until a pathologist has settled which.
Source direction: An original photograph of the numbered museum specimen held by the pathology department, Cairo University, or an openly licensed gross-pathology atlas.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

### image · Liver steatosis (fatty change)
Brief: Photograph of a liver slice whose cut surface is diffusely yellow, taken from an angle that keeps the rounded border of the slice visible.
Purpose: Identify-the-specimen station. Both gross findings are visual, and the rounded border is the only evidence of the soft consistency the caption describes — an angle that loses it loses half the answer.
Priority: required
Status: needed
Kind: clinical photograph
Notes: Owning item: INT108-PRAC-PATHO-D105-2. Stain: not applicable to a gross specimen. Structures that must be visible and markable: diffusely yellow cut surface; rounded border of the slice.
Source direction: An original photograph of the numbered museum specimen held by the pathology department, Cairo University, or an openly licensed gross-pathology atlas.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.

### image · Subcutaneous fibroma with dystrophic calcification
Brief: Photograph of a sectioned rounded encapsulated soft-tissue tumour with a greyish white cut surface bearing granular chalky white calcific foci, with the capsule visible around the circumference.
Purpose: Identify-the-specimen station. The diagnosis is made from the capsule plus the chalky foci, so both must be in frame.
Priority: required
Status: needed
Kind: clinical photograph
Notes: Owning item: INT108-PRAC-PATHO-S10-1. Stain: not applicable to a gross specimen. Structures that must be visible and markable: rounded capsulated mass; fibrous capsule around the circumference; greyish white cut surface; granular chalky white foci of calcification.
Source direction: An original photograph of the numbered museum specimen held by the pathology department, Cairo University, or an openly licensed gross-pathology atlas.
Rights: Must be CC-BY, CC0 or public domain, or carry written departmental permission. Record the licence and the photographer before release. Do not re-host the plate from the source PDF.
