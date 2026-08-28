<!--
  Histology articles for 104 CPS, teaching every new concept in
  concept/104-CPS-histology-concepts.md and covering every sub-heading of the
  department's own histology chapters (../academic/104-cps-structure.md) that
  article/104-CPS-articles.md (13 articles, 4 histology) leaves without an
  article: The heart, Arteries, Veins (a general vessel-wall article plus a
  named artery/vein classification article), the third capillary type and the
  blood-vs-lymph comparison under A-V Connections, the Macrophage system,
  the larynx/trachea/bronchi/bronchiole run and the whole Respiratory Portion
  and Alveolar Phagocytes leaves, and all of Cytogenetics beyond the two
  existing generated concepts' own article.

  Eleven articles, not one per concept — grouped the way the book itself
  groups the material (a chapter's own consecutive pages), so a concept that
  is genuinely broader than a thin existing live record (pneumocyte types,
  Down syndrome, alveolar phagocytes, the numerical-aberration taxonomy) gets
  real teaching prose, while three new concepts under Conducting Portion
  (nasal cavity, the five-cell-type epithelium, olfactory mucosa structure)
  are pointed at the module's EXISTING article ART-104-HIS-NASAL-MUCOSA
  instead of a new one, because that article already teaches this content in
  full — see those three concepts' own field_notes in the concept file.

  Source: `Dpt Book Book of Histology (CPS 104) 2026 1st Year (2).pdf`
  (src_18d3a953df4ca83c4e74, 53 pp., native text; printed page number equals
  page index in this book). Read directly from the cached page text at
  scripts/kasr/extract/pagetext/src_18d3a953df4ca83c4e74.json — nothing here
  was re-extracted.

  Every related_concepts entry names only concepts from this lane's own
  concept/104-CPS-histology-concepts.md, each of which lists this article (or
  its sibling teaching article) back on its own article_ids — the reciprocal
  link the importer needs. Live concepts mentioned in an article's prose for
  context (the pericardium, the tracheal wall-layers stub, aneuploidy's
  causes) are NOT listed in related_concepts, because this lane cannot add
  this article's id to the article_ids of a concept it does not own.

  claim_ids on every article is the union of the reserved CLM ids its own
  taught concepts already carry (see concept/104-CPS-histology-concepts.md's
  header); span_ids names one reserved SPN-104-HIS-<SLUG>-01 id per article.
  Neither resolves to a real evidence record yet -- authoring
  evidence/104-CPS-claims.md, -citations.md and -spans.md is a separate
  lane's scope, and the existing sibling histology articles in this module
  carry the identical gap (their own claim/span ids do not resolve either, per
  medical:audit). publication_gate is needs_evidence throughout, matching
  every sibling histology article in this module.

  Hand-authored, not generated — no GENERATED_BY marker.
-->

# Item
## id
ART-104-HIS-HEART-AND-VESSEL-WALL
## title
The heart wall and the general plan of blood vessels
## arabic_title

## aliases
[clear]
## subject
cvs
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
7
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
The heart's own wall and the wall of every vessel it pumps into are built from the same idea, repeated at different thicknesses: an inner lining in contact with blood, a middle layer of muscle and elastic tissue that does the work, and an outer connective-tissue coat that anchors the whole thing to its surroundings. Learn the three-layer plan once, on the heart, and the rest of the cardiovascular chapter is naming which layer changed.
## sections
### Definition
The heart's wall is three layers, outside to inside. The epicardium is the visceral layer of the serous pericardium, a single sheet of mesothelial cells on connective tissue, adherent to the heart's surface and carrying the heart's own vessels and nerves. The myocardium, cardiac muscle, is the thick middle bulk of the wall — thicker in the ventricles than the atria — attached to the heart's fibrous skeleton at the atrioventricular junctions, and built of branched, interconnected fibres each wrapped in a capillary-rich endomysium. The endocardium is innermost: endothelium continuous with the vessels' own lining, on a subendocardial connective tissue that is itself continuous with the myocardium's connective tissue and that carries the heart's conducting system.

The heart's valves are folds of the endocardium — the same endothelium on both surfaces, over a middle core of dense fibrous connective tissue rich in collagen and elastic fibres, strong enough to resist the closing pressure and flexible enough to open every cycle.

### Mechanism
Most blood vessel walls repeat the heart wall's own three-layer logic, adapted to a job that is regulation rather than contraction. Tunica intima is innermost: endothelium on a basal lamina, giving a smooth, low-friction surface and a thin barrier for exchange, on a subendothelium of loose connective tissue — and, in arteries only, an internal elastic lamina, condensed and fenestrated, that keeps the lumen from fully collapsing. Tunica media is the middle layer, circularly arranged smooth muscle in varying amounts (which both regulates flow by contracting and manufactures its own extracellular matrix), elastic fibres for distension, and reticular fibres and proteoglycans between the muscle cells. Tunica adventitia is the outer, loose connective-tissue coat that anchors the vessel: longitudinal collagen resisting overdistension, a few circular elastic fibres, vasa vasorum (small vessels, mainly in large veins, feeding the wall itself) and nervi vasorum (autonomic nerves driving the smooth muscle). An external elastic lamina may sit between media and adventitia, and the fenestrae in both laminae let nutrients reach the wall by diffusion.

### Key determinants
Side by side, the heart wall and the general vessel wall share one design rule: an inner layer built for contact with blood, a middle layer that does the mechanical work, and an outer layer that anchors the structure to what surrounds it. Epicardium, myocardium and endocardium map onto intima, media and adventitia only loosely — the heart's own wall is a special case built around a single working muscle rather than a tube — but the internal elastic lamina is the one feature that has no heart-wall equivalent at all: it exists only in arteries, marking where the vessel wall's job (holding a pulsatile pressure) diverges from the heart wall's job (generating one).

### Clinical significance
Damage to the endothelium is not cosmetic. It exposes the subendothelial connective tissue beneath it, which induces platelet aggregation, then thrombus formation, then obstruction of flow — the same three-layer plan read as a mechanism of disease rather than a mechanism of function.

### Common misconceptions
Treating the pericardium and the epicardium as two names for one thing. The epicardium is specifically the visceral layer of the serous pericardium — the layer stuck to the heart. The fibrous pericardium and the parietal serous layer are the pericardial sac around the heart, a related but separate structure from the heart wall itself.

Placing the heart's conducting system in the myocardium because it is "electrical muscle." It lies in the subendocardial connective tissue of the endocardium, the layer just inside the muscle it goes on to excite, not in the muscle itself.
## published_summary

## published_sections

## hold_these
The heart wall is epicardium, myocardium, endocardium, outside to inside.
A heart valve is a fold of endocardium: endothelium over a fibrous, collagen-and-elastin core.
Most vessel walls repeat the same three-tunic plan: intima, media, adventitia.
An internal elastic lamina exists only in arteries, not veins.
Endothelial damage exposes subendothelial connective tissue and triggers thrombosis.
## lose_the_mark
Calling the epicardium and the pericardium the same structure. The epicardium is the visceral layer of the serous pericardium specifically.
Putting the conducting system in the myocardium instead of the subendocardial connective tissue of the endocardium.
Describing the tunica media's smooth muscle as purely contractile and forgetting it also manufactures the media's own matrix.
## callout_evidence

## related_concepts
CON-CVS-CC8835108F512C | CON-CVS-7DA6E2CF7A3369 | CON-CVS-30053920BDC07F
## related_articles
ART-104-HIS-ARTERIES-AND-VEINS: applies this three-tunic plan to the named artery and vein types
ART-104-ANA-CORONARY-ARTERIES: the vessels that supply the wall this article describes
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
CLM-15EAC759559D
## span_ids
SPN-HIS-HEART-AND-VESSEL-01
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > The heart
104 CPS > Histology > Cardiovascular System > Arteries
## university_notes
kau: printed pages 4-6 of the 2026 histology book cover the heart wall, its valves, and the general vessel-wall plan in one continuous run of text before the ARTERIES heading proper begins on page 6.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter I (Cardiovascular System), printed pp. 4-6.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-ARTERIES-AND-VEINS
## title
Arteries and veins: classification and comparison
## arabic_title

## aliases
[clear]
## subject
cvs
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
9
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
An artery and a vein are built from the same three tunics, but every dial on that plan is turned differently — thicker media here, thicker adventitia there, a lamina present in one and absent in the other — and the direction those dials turn is set entirely by what each vessel has to do: hold a pulse, or hold a valve.
## sections
### Definition
Arteries fall into three histological classes. Large elastic (conducting) arteries — the aorta and its large branches — carry blood from the heart; very wide lumina, thick walls, an intima with a thin, inconspicuous internal elastic lamina, and a thick media of 40 to 70 circularly arranged fenestrated elastic membranes (increasing with age) with some smooth muscle, collagen and proteoglycan. Medium-sized muscular (distributing) arteries, the commonest type, deliver blood to organs; a prominent internal elastic lamina distinguishes them from elastic arteries, and their thick media is almost entirely circular smooth muscle, often with a recognisable external elastic lamina. Small arteries (arterioles), the smallest branches of muscular arteries, regulate flow to the capillaries; the wall thins gradually with diameter until only one or two smooth-muscle layers remain in the media and the adventitia is a thin, ill-defined sheath. The arteriole's own terminal segment, the metarteriole, drains directly into the capillary bed, and its smooth muscle thickens there into a precapillary sphincter that opens and closes the entrance to that bed.

Veins run the same size progression the other way. Small veins (venules) have a thin subendothelium, no internal elastic lamina, and a media that in the postcapillary venule is only pericytes and reticular fibres, gaining smooth muscle gradually as calibre increases. Medium-sized veins have a thin wall and a wide lumen that collapses and holds blood after death — the opposite of a medium artery's narrow, rounded, empty lumen; valves are present, the intima thin and unfolded, the media thin, and the adventitia is the thickest of the vein's three coats. Large veins, such as the inferior vena cava, have a thick wall and wide lumen: an intima whose connective tissue can blur into the media, a relatively thin media, and — the thickest layer of all — an adventitia carrying longitudinal smooth muscle that lets the vessel elongate and shorten with respiration.

### Mechanism
Every difference between an artery type and a vein type traces back to the pressure each is built to hold. An elastic artery's ring upon ring of fenestrated elastic membrane stores the energy of systole and releases it in diastole, smoothing a pulsatile pressure into a steadier downstream flow — the elastic recoil the large arteries are named for. A muscular artery's thick, almost purely smooth-muscle media adjusts its own diameter to regulate distribution to the organ it supplies, and the arteriole's media, thinning to one or two muscle layers, is doing the same job at the resistance vessel level, ending at the metarteriole's precapillary sphincter, the last point of active control before the capillary bed. A vein, by contrast, is a low-pressure conduit: its thin media does little regulatory work, so the wall can be thin — and because the pressure driving blood back to the heart is so low, medium and large veins add valves and, in the vena cava, an actively contracting adventitia, mechanisms an artery under its own driving pressure has no need for.

### Key determinants
Set a medium artery against a medium vein and every row of the department book's table differs. Thickness: thick wall in the artery, thin in the vein. Lumen: narrow and rounded in the artery, not collapsing and holding no blood after death; wide in the vein, collapsing and holding blood after death. Valves: absent in the artery, present in the vein. Tunica intima: thick and folded, rich in elastic fibres, a clear internal elastic lamina in the artery; thin and unfolded, poor in elastic fibres, no internal elastic lamina in the vein. Tunica media: thick, smooth muscle and elastic fibres, sometimes an external elastic lamina, in the artery; thin, smooth muscle with few elastic fibres, no external elastic lamina, in the vein. Tunica adventitia: thin in the artery, thick in the vein.

Valves — semilunar folds projecting from the intima — sit in medium and some large veins, particularly in the lower limb, to stop blood running backward under gravity; the connective tissue around a valve is rich in elastic fibres.

### Clinical significance
The collapsed, blood-filled postmortem lumen of a vein is not incidental. It is the direct arithmetic of a thin wall meeting low intraluminal pressure, the same arithmetic that, in life, is exactly why venous valves exist at all — to stop that same low-pressure column from running backward.

### Common misconceptions
Using the presence of an internal elastic lamina alone to sort the three artery types. All three carry some form of it; what separates a muscular artery from an elastic one is that the muscular artery's IEL is prominent and structurally distinct from its media, where the elastic artery's media is already built from the same elastic membranes the IEL is made of.

Assuming the vein's thick adventitia always means the same thing. In a medium vein it is simply the largest of three thin layers by default; in a large vein its longitudinal smooth muscle is doing active mechanical work, letting the vessel change length with respiration.
## published_summary

## published_sections

## hold_these
Arteries: large elastic, medium muscular, small (arteriole) — sorted mainly by the tunica media.
A muscular artery has a prominent internal elastic lamina; an elastic artery's media already is elastic membrane.
The metarteriole's precapillary sphincter is the last point of control before the capillary bed.
Veins: venule, medium, large — thinner-walled than the matched artery at every size.
A medium artery has a thick wall, narrow empty lumen, no valves; a medium vein has a thin wall, wide blood-filled lumen, and valves.
Venous valves sit chiefly in the lower limb, to stop gravity-driven backflow.
## lose_the_mark
Sorting artery type only by "has an IEL or not" instead of by how prominent and distinct that lamina is from the media.
Forgetting the metarteriole is the arteriole's own terminal segment, not a separate vessel class.
Explaining the vein's collapsed postmortem lumen as coincidence instead of thin wall plus low pressure.
## callout_evidence

## related_concepts
CON-CVS-712BA581C8AF88 | CON-CVS-E6F658EEC11072 | CON-CVS-B29610035B568D | CON-CVS-3C04F2DED454C9
## related_articles
ART-104-HIS-HEART-AND-VESSEL-WALL: the general three-tunic plan this article applies to named vessel types
ART-104-ANA-THORACIC-WALL-VEINS: the named venous drainage of the thoracic wall, at the anatomical rather than histological level
ART-104-ANA-CORONARY-ARTERIES: the heart's own named muscular arteries
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
[clear]
## span_ids
[clear]
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > Arteries
104 CPS > Histology > Cardiovascular System > Veins
## university_notes
kau: the elastic/muscular/arteriole classification runs printed pp. 6-8, and the vein classification with the artery-vein comparison table pp. 8-10.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter I (Cardiovascular System), printed pp. 6-10.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-AV-CONNECTIONS-CAPILLARIES-SHUNTS
## title
Arteriovenous connections: capillary types and shunts
## arabic_title

## aliases
[clear]
## subject
cvs
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-CVS-T01-S01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
7
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Blood on its way from artery back to vein has three routes through the tissue: a sealed capillary, a windowed one, or a wide-open sinusoid — and one further option that skips the tissue altogether, an arteriovenous shunt. Which route a bed uses follows directly from what has to cross that particular wall.
## sections
### Definition
A fenestrated, or visceral, capillary sits between the continuous capillary and the sinusoid on the module's three-way classification. Like the continuous capillary it is small and regular in calibre, tight-junctioned, with a continuous basal lamina, pericytes present and macrophages absent. What sets it apart is its endothelium: pores, or fenestrae — interrupted endothelial cell, covered by a non-membranous, cartwheel-like diaphragm with a central thickening and fourteen wedge-shaped gaps, derived from the glycocalyx. It is sited in the intestine, in endocrine glands (carrying hormones) and in the renal glomerulus, where the fenestrae characteristically carry no diaphragm at all.

Arteriovenous anastomoses (shunts) are direct connections between arterioles and venules that bypass the capillary bed entirely. They sit in exposed parts — fingertips, toes, external ears, nose, lips — and in organs such as the gastrointestinal tract, placenta, penis and uterus. The arterial and venous ends of the shunt resemble an arteriole and venule respectively; the intermediate segment carries a relatively thick smooth-muscle sphincter, enclosed in a connective-tissue capsule and richly innervated. When the sphincter closes the shunt, blood passes through the capillary bed as usual; when it opens, a large volume of blood runs through the shunt in a short, rapid circuit.

### Mechanism
A capillary's wall is built to match exactly what has to cross it. Where the traffic is small solutes and gases through an intact barrier, the wall is continuous — sealed tight junctions, unbroken basal lamina. Where the traffic includes hormones or nutrients that need a faster route, the wall adds diaphragmed windows — a fenestrated capillary — without giving up the continuous basal lamina that still holds cells and larger proteins back, except in the kidney's own filtering task, where even the diaphragm is dropped. Where the traffic is whole cells — plasma proteins, hormones, or the erythrocytes and marrow cells stored in liver, spleen and bone marrow — the wall opens fully into a sinusoid, wide, irregular, with a discontinuous basal lamina. The arteriovenous shunt is the same logic taken to its limit: when a bed's job is heat exchange or rapid volume shift rather than nutrient exchange at all, the tissue simply routes blood around the capillary bed through a muscular, sphinctered shortcut instead.

### Key determinants
Blood and lymphatic capillaries answer to the same general vascular plan but differ at every point that matters to their separate jobs. Blood capillaries begin from small arterioles; lymphatic capillaries begin with a blind end. Blood capillaries have a smaller, less permeable lumen; lymphatic capillaries are larger and more permeable. Blood-capillary endothelium may or may not be fenestrated and is usually tight-junctioned with a usually continuous basal lamina; lymphatic endothelium is non-fenestrated but has wider intercellular gaps, an interrupted basal lamina, and usually no pericytes. Blood capillaries exchange materials between blood and tissue; lymphatic capillaries drain lymph from the interstitial spaces back to the blood, and carry large molecules — fat droplets, bacteria — that blood capillaries cannot.

### Clinical significance
Arteriovenous shunts are a genuine thermoregulatory and haemodynamic tool, not a curiosity: skin shunts dilate in cold and constrict in heat to regulate body temperature; opening a shunt increases venous return; and the same mechanism regulates flow to the genital organs and to organs of digestion, absorption and secretion.

Inflammation of a lymphatic vessel is lymphangitis, seen in the skin as painful red lines — a direct clinical read of the same wide, permeable, valveless capillary wall this article's comparison describes.

### Common misconceptions
Confusing a fenestrated capillary with a sinusoid. Both carry pores, but the fenestrated capillary's pores are covered by diaphragms and its basal lamina stays continuous, where the sinusoid's pores are open and its basal lamina is discontinuous — the renal glomerulus is the fenestrated capillary's own exception, since its fenestrae characteristically carry no diaphragm.

Treating an arteriovenous shunt as a pathological structure. It is a normal, richly innervated, muscular-sphinctered structure present in named body sites for named physiological reasons — the pathology is in a shunt failing to close, not in the shunt's existence.
## published_summary

## published_sections

## hold_these
Three capillary types: continuous (sealed), fenestrated (diaphragmed pores), sinusoidal (open pores, discontinuous basal lamina).
Fenestrated capillaries sit in the intestine, endocrine glands, and the renal glomerulus (no diaphragm there).
An arteriovenous anastomosis is a direct arteriole-venule shunt with a muscular sphincter, bypassing the capillary bed.
AV shunts regulate temperature, venous return, and flow to the genital and digestive organs.
Lymphatic capillaries begin blind, are wider and more permeable, and carry what blood capillaries cannot.
## lose_the_mark
Mixing up fenestrated-capillary and sinusoid pores — diaphragmed and basal-lamina-continuous versus open and basal-lamina-discontinuous.
Forgetting the renal glomerulus's fenestrae carry no diaphragm, unlike the fenestrated capillary's usual pattern.
Describing an AV shunt as abnormal rather than a normal, site-specific regulatory structure.
## callout_evidence

## related_concepts
CON-CVS-E8964EBC8F2357 | CON-CVS-132A76916FEC05
## related_articles
ART-104-HIS-CAPILLARY-TYPES: the continuous-versus-sinusoidal comparison this article completes into a full three-way classification
ART-104-HIS-HEART-AND-VESSEL-WALL: the general vessel-wall plan capillaries and shunts are the terminal expression of
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
[clear]
## span_ids
[clear]
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cardiovascular System > A-V Connections
## university_notes
kau: capillary types run printed pp. 11-12, the blood-versus-lymphatic capillary comparison and lymphangitis note p. 12, and arteriovenous anastomoses p. 13.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter I (Cardiovascular System), printed pp. 11-13.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-MACROPHAGE-SYSTEM
## title
The mononuclear phagocyte system
## arabic_title

## aliases
[clear]
## subject
haem
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-HEM
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
6
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
One phagocytic cell, born in the bone marrow as a monocyte, takes on a different name in almost every organ it settles in — Kupffer cell in the liver, microglia in the brain, dust cell in the lung, osteoclast in bone. Learning the mononuclear phagocyte system is learning that these are not eight cell lines but one, read by address.
## sections
### Definition
The macrophage system, or mononuclear phagocytic system, is a group of highly phagocytic cells widely distributed through the body, an important part of the body's defence. Every cell in the system differentiates from a blood monocyte. All take up a vital stain, such as trypan blue or Indian ink injected into an animal, accumulating the dye in their cytoplasm.

### Mechanism
Histologically the cells of this system share a signature: irregular surfaces with many pseudopodia, a well-developed Golgi complex, numerous lysosomes and residual bodies, prominent rough endoplasmic reticulum, and an eccentric oval or kidney-shaped nucleus. Their functions follow from that machinery — phagocytosis and destruction of cell debris, dead cells and bacteria; antigen processing and presentation; destruction of aged erythrocytes, with bile production and iron metabolism; and, after injury or inflammation, clearing debris to help tissue healing.

### Key determinants
The department book distributes the system by site, and each site's cell carries its own name. Monocytes in the blood. Macrophages (histiocytes) in loose connective tissue and in the reticular stroma of bone marrow, spleen and lymph node. Littoral cells in the walls of the blood sinusoids of spleen and bone marrow. Von Kupffer cells in the blood sinusoids of the liver. Langerhans cells in the skin. Microglia in the central nervous system. Dust cells and heart-failure cells in the lung alveoli. Osteoclasts in the Howship's lacunae of bone.

### Clinical significance
A single system under eight names has practical consequences: a drug or disease process that impairs monocyte-macrophage function in one organ is a candidate to impair it everywhere the system is deployed, and a vital stain that labels a Kupffer cell will, by the same mechanism, label a dust cell or a lymph-node macrophage.

### Common misconceptions
Treating the eight named cell types as eight separate cell lines rather than one lineage under local names. A Kupffer cell, a dust cell, a microglial cell and an osteoclast are the same monocyte-derived phagocyte, differentiated only by where it settled — which is exactly why the system is named for its function (mononuclear phagocytosis) rather than for any one of its site-specific names.
## published_summary

## published_sections

## hold_these
Every cell of the mononuclear phagocyte system originates from the blood monocyte.
The system's cells take up a vital stain such as trypan blue or Indian ink.
Histological signature: irregular surface, many lysosomes, prominent rER, eccentric kidney-shaped nucleus.
Name the cell at each site: monocyte (blood), macrophage/histiocyte (connective tissue, marrow/spleen/node stroma), littoral cell (spleen/marrow sinusoids), Kupffer cell (liver sinusoids), Langerhans cell (skin), microglia (CNS), dust/heart-failure cell (lung), osteoclast (bone).
## lose_the_mark
Naming the lung, liver or CNS phagocyte as if it were a distinct cell line rather than the same monocyte-derived cell under a site-specific name.
Forgetting the vital-stain behaviour, which is how the system was first mapped histologically.
## callout_evidence

## related_concepts
CON-HEM-D1628423BE0844
## related_articles
ART-104-HIS-RESPIRATORY-PORTION: dust cells and heart-failure cells, this system's lung-specific instance
ART-104-HIS-LYMPHOID-ORGANS: the lymph node and spleen macrophages this system's stroma-dwelling members occupy
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
[clear]
## span_ids
[clear]
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Lymphatic and Macrophage System > Macrophage system
## university_notes
kau: the macrophage system section is the last of Chapter II, printed p. 25, directly after the thymus and before Chapter III opens.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter II (Lymphatic and Macrophage System), printed p. 25.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-LARYNX-TRACHEA-BRONCHI
## title
The larynx, trachea, bronchi and bronchioles
## arabic_title

## aliases
[clear]
## subject
resp
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
9
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Air crosses the larynx, the trachea, and two further generations of bronchus before it reaches a single bronchiole, and at every stop the tissue drops something — cartilage, glands, goblet cells — while smooth muscle takes on more of the job. Following that trade from stop to stop is the fastest way to hold the whole conducting portion in one picture.
## sections
### Definition
The larynx connects the pharynx with the trachea, lined by respiratory epithelium except over the true vocal cords and the lingual surface of the epiglottis, where stratified squamous epithelium takes over; its lamina propria carries the laryngeal cartilages — large ones (thyroid, cricoid, most of the arytenoids) that are hyaline and may calcify with age, and small ones (epiglottis, cuneiform, corniculate, the arytenoid tips) that are elastic and do not. Two pairs of folds project into its lumen: the upper, false vocal cords (vestibular folds), respiratory-epithelium-lined, preventing food and fluid from entering the larynx; and the lower, true vocal cords, lined by non-keratinized stratified squamous epithelium, producing voice.

The trachea, about 12 cm long, runs from the larynx to its bifurcation into the two primary bronchi, its wall four layers: a mucosa of respiratory epithelium on a lamina propria of loose connective tissue with elastic fibres and an elastic membrane; a submucosa of loose connective tissue with lymphoid nodules and mucous and serous glands; a fibrocartilaginous coat of twenty C-shaped incomplete hyaline cartilage rings, their posterior gaps bridged by a fibro-elastic ligament and by the trachealis smooth muscle; and an outer adventitia of loose connective tissue.

### Mechanism
The trachea divides into two primary (extrapulmonary) bronchi, structurally identical to the trachea itself; each enters a lung's hilum as intrapulmonary (secondary) bronchi, which divide repeatedly into bronchioles. Extrapulmonary bronchi keep a wide, less-folded lumen, pseudostratified ciliated epithelium rich in goblet cells, a true submucosa separated from the mucosa by an elastic membrane, incomplete C-shaped cartilage rings, smooth muscle posterior to the cartilage, and mucoserous glands and lymphatic nodules in the submucosa. Intrapulmonary bronchi keep the same epithelium with fewer goblet cells, lose the elastic membrane and the submucosa as separate layers, replace the C-shaped rings with multiple cartilage plates in the adventitia, arrange their smooth muscle spirally around the whole lumen, and carry glands and nodules in the adventitia between the plates. Bronchioles go further still: simple columnar or cuboidal ciliated epithelium with Clara cells and no goblet cells, cilia disappearing distally; more developed, circularly arranged smooth muscle that now controls airflow to the gas-exchange sites rather than merely shortening the airway; and no cartilage, gland or nodule at all.

Clara cells — dome-shaped, non-ciliated, rich in basal rough endoplasmic reticulum, apical smooth endoplasmic reticulum, mitochondria, Golgi apparatus and glycoprotein-containing secretory granules — protect the bronchiolar epithelium, degrade inhaled toxins, secrete a surfactant-like material that keeps the bronchiole patent, protect against emphysema by inhibiting macrophage-secreted protease and elastase, and may act as a stem cell for the bronchiolar lining.

### Key determinants
Four features track together from larynx to bronchiole and are worth reading as one column, not four separate facts: epithelium goes from respiratory (with two named squamous exceptions in the larynx) to progressively fewer goblet cells to no goblet cells at all; cartilage goes from large hyaline/small elastic laryngeal pieces to C-shaped tracheobronchial rings to cartilage plates to none; submucosa and glands are present through the extrapulmonary bronchus and gone by the bronchiole; and smooth muscle becomes steadily more developed and more completely circular the further the airway goes, until in the bronchiole its contraction is what actually controls flow to the gas-exchange tissue beyond it.

### Clinical significance
Bronchial asthma is spasm of exactly the circularly arranged, well-developed bronchiolar smooth muscle this progression ends on — an allergic constriction of the airway that produces difficulty during expiration, the direct histological correlate of the muscle this article has just described taking over the job cartilage and glands used to do further up the tree.

### Common misconceptions
Assuming the whole larynx is lined uniformly because "respiratory epithelium" is stated first. The true vocal cords and the lingual epiglottis are the two named exceptions, and it is exactly those two mechanically abraded surfaces that switch to a tougher, non-keratinized stratified squamous lining.

Treating the intrapulmonary bronchus's loss of a distinct submucosa as a loss of function rather than a redistribution. Its lamina propria is rich in elastic fibres and lymphatic follicles even without a separately named submucosal layer.
## published_summary

## published_sections

## hold_these
Larynx: respiratory epithelium throughout except the true vocal cords and the lingual epiglottis (stratified squamous).
False vocal cords protect the airway from food/fluid; true vocal cords produce voice.
Trachea's four wall layers: mucosa, submucosa, fibrocartilaginous coat (C-shaped rings), adventitia.
From extrapulmonary bronchus to bronchiole: cartilage, submucosa, glands and goblet cells fall away as smooth muscle becomes more developed.
Bronchioles have Clara cells, no goblet cells, no cartilage, no glands, no nodules.
Clara cell functions: protect epithelium, degrade toxins, secrete surfactant-like material, inhibit protease/elastase, may act as stem cell.
## lose_the_mark
Lining the entire larynx with respiratory epithelium and forgetting the true-vocal-cord/lingual-epiglottis exception.
Describing bronchioles as still carrying cartilage plates, mucoserous glands or lymphatic nodules — none of the three survive into the bronchiole.
Naming Clara cells as ciliated. They are non-ciliated by definition, sitting among epithelium whose own cilia are already disappearing distally.
## callout_evidence

## related_concepts
CON-RES-1FF74892D5B943 | CON-RES-38BA83C42FBE02 | CON-RES-099718106C38CD | CON-RES-7C79F2D68F1003
## related_articles
ART-104-HIS-NASAL-MUCOSA: the nasal cavity and its respiratory/olfactory epithelium, upstream of the larynx this article opens on
ART-104-HIS-RESPIRATORY-PORTION: the gas-exchange tissue the bronchiole this article ends on leads directly into
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
[clear]
## span_ids
[clear]
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Conducting Portion
## university_notes
kau: larynx and vocal cords run printed pp. 30-31, trachea p. 31, and bronchi/bronchioles/Clara cells pp. 32-33.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter III (Respiratory System), printed pp. 30-33.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-RESPIRATORY-PORTION
## title
The respiratory portion and its phagocytes
## arabic_title

## aliases
[clear]
## subject
resp
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T03
## secondary_node_ids
SYS-RES-T01-S01-M01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
9
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Everything upstream of the respiratory bronchiole exists to condition and deliver air; everything from the respiratory bronchiole onward exists to exchange it, across a barrier four cell-layers thin, patrolled by phagocytes that read like a diary of what the lung has been breathing.
## sections
### Definition
The respiratory portion's function is gas exchange between blood and inspired air, and it comprises four components. Respiratory bronchioles are the transition from the conducting portion: simple cuboidal ciliated epithelium with Clara cells (cilia absent distally) on an elastic-fibre-rich corium, a thin smooth-muscle musculosa, and a loose adventitia; the wall is interrupted by the openings of some alveoli, where gas exchange begins. Alveolar ducts are the free terminations of the respiratory bronchioles, lined completely by alveolar openings, smooth muscle only at those openings. Alveolar sacs are groups of adjacent alveoli opening into a shared central space; both ducts and sacs are lined by alveolar epithelium. Lung alveoli are the structural and functional unit of exchange, opening into sacs, ducts and respiratory bronchioles, lined by pneumocytes types I and II; alveolar pores (of Kohn) between adjoining walls equalise pressure between alveoli and give collateral air circulation when a bronchiole is obstructed.

### Mechanism
Type I pneumocytes (squamous alveolar cells) cover about 97% of the alveolar surface: flat squamous cells with flat nuclei and little cytoplasm, few organelles, small pinocytic vesicles turning over surfactant, tight-junctioned to both other pneumocyte types. Their job is a very thin diffusion wall and, through those tight junctions, keeping tissue fluid out of the alveolar cavity. Type II pneumocytes (great alveolar cells) cover only about 3%: cuboidal cells bulging into the airspace, central rounded nuclei, foamy cytoplasm rich in mitochondria, ribosomes, rough endoplasmic reticulum and Golgi, with membrane-bound multilamellar bodies and short apical microvilli. Their job is secreting pulmonary surfactant and acting as the stem cell for both pneumocyte types.

The blood-air barrier through which gas exchange actually happens is four layers: the surfactant film on the alveolar surface; the type I pneumocyte; the fused basal lamina of that pneumocyte and the capillary endothelial cell; and the capillary endothelial cell itself. It sits within an interalveolar septum of loose connective tissue carrying the richest capillary network in the body, elastic fibres for lung expansion, reticular fibres that prevent overexpansion injuring the capillaries, and extravasated monocytes that become the septum's own resident phagocytes.

### Key determinants
Those phagocytes are of two functional kinds, both blood-monocyte-derived, both bulging from the interalveolar wall or lying free in the alveoli, both vital-stain positive. Dust cells engulf inhaled dust, visible afterward in their cytoplasm. Heart-failure cells engulf red cells during pulmonary congestion, their cytoplasm turning brick-red from haemosiderin, the iron pigment of digested erythrocytes. Once loaded, either cell is cleared by one of three routes: migrating into a bronchiole to be coughed up in sputum, leaving the lung by lymphatic drainage, or simply remaining in the septum.

### Clinical significance
Respiratory distress syndrome is surfactant deficiency associated with premature labour, a direct failure of the type II pneumocyte's own secretory job. Emphysema is permanent alveolar enlargement from destruction of the interalveolar septa by protease and elastase secreted by dust cells, chiefly from cigarette smoking, which inhibits the proteins that would otherwise hold those enzymes in check — the same dust cell that is, in the ordinary case, simply clearing inhaled particles.

### Common misconceptions
Placing the conducting-to-respiratory transition at the alveolar duct rather than the respiratory bronchiole. The respiratory bronchiole is already gas-exchanging tissue — its wall is interrupted by the first alveolar openings — even though it keeps a cuboidal, Clara-cell epithelium that still looks like conducting-portion lining.

Assuming the cell covering most of the alveolar surface must be the more active one. It is the reverse: the type I cell is a thin, organelle-poor wall built purely for diffusion, and the far rarer type II cell carries the secretory machinery and is the stem cell for both types.

Reading a heart-failure cell's brick-red cytoplasm as a stain artefact. It is haemosiderin from digested erythrocytes, diagnostic of pulmonary congestion, not a property of the trypan-blue vital stain the cell also takes up.
## published_summary

## published_sections

## hold_these
Respiratory portion, in order: respiratory bronchiole, alveolar duct, alveolar sac, alveolus.
The respiratory bronchiole, not the alveolar duct, is where the conducting-to-respiratory transition happens.
Type I pneumocytes: 97% of surface, thin diffusion wall. Type II: 3%, surfactant secretion, stem cell for both types.
Blood-air barrier, four layers: surfactant film, type I pneumocyte, fused basal lamina, capillary endothelium.
Pores of Kohn equalise pressure and give collateral air circulation.
Dust cells engulf dust; heart-failure cells engulf RBCs (brick-red, haemosiderin) in pulmonary congestion.
Alveolar phagocytes clear by three routes: cough up in sputum, lymphatic drainage, or remain in the septum.
## lose_the_mark
Saying the alveolar duct is where gas exchange begins instead of the respiratory bronchiole.
Reversing which pneumocyte type is the more metabolically active one.
Missing that emphysema traces specifically to dust-cell protease/elastase, inhibited normally, disinhibited by smoking.
## callout_evidence

## related_concepts
CON-RES-52A974515C690A | CON-RES-94F66D51DB5B4D | CON-RES-ED5ADFB428C5BF | CON-RES-D8B1BE3C6CFABD
## related_articles
ART-104-HIS-LARYNX-TRACHEA-BRONCHI: the conducting-portion tissue immediately upstream of this article's respiratory bronchiole
ART-104-HIS-MACROPHAGE-SYSTEM: the body-wide mononuclear phagocyte system this article's dust and heart-failure cells belong to
ART-104-PHY-LUNG-RECOIL-AND-SURFACTANT: the physiology of the surfactant this article's type II pneumocyte secretes
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
CLM-4E1D08498C2D
## span_ids
SPN-HIS-RESPIRATORY-PORTION-01 | SPN-HIS-RESPIRATORY-PORTION-02
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Respiratory System > Respiratory Portion
104 CPS > Histology > Respiratory System > Alveolar Phagocytes
## university_notes
kau: the respiratory portion and pneumocytes run printed pp. 34-35, the blood-air barrier the foot of p. 35, and alveolar phagocytes p. 36.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter III (Respiratory System), printed pp. 34-36.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-CELL-CYCLE-RENEWAL-DEATH
## title
The cell cycle, stem cells and cell death
## arabic_title

## aliases
[clear]
## subject
fnd
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
8
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
A cell either divides or it does not, and the cytogenetics chapter opens by giving that single choice its full vocabulary — the phases that lead up to division, the stem cells that keep dividing on the body's behalf, and the two very different ways a cell can stop being a cell at all.
## sections
### Definition
The cell cycle is a series of events preparing a cell for division into two daughter cells, in two phases. Mitosis is division itself, changes visible by microscope, lasting about an hour. Interphase is the period between divisions, changes not microscopically visible, lasting about 20 hours in rapidly dividing cells, in three phases: G1 (about 8 hours), the daughter cell's nucleus holding 46 single s-chromosomes while the cell grows, gathers ATP, and synthesises the RNA and protein needed for DNA duplication — the more specialised the cell, the longer this phase and the lower the division rate; S (about 8 hours), DNA duplicating so each cell holds 46 double d-chromosomes, and the centrioles duplicating too; G2 (about 4 hours), RNA and protein synthesis for division, energy storage, tubulin formation for the mitotic microtubules, and correction of any replication error. A cell that has left the cycle sits in the stable, or G0, phase — most specialised working cells spend a prolonged G1 there.

### Mechanism
Stem cells are undifferentiated, self-renewing cells of two kinds. Pluripotential (multipotential) stem cells can give rise to more than one specialised type — blood cells, or the cells lining the gastrointestinal tract. Unipotential stem cells produce only one specialised type — the male germ cell is the book's own example, still a true stem cell, simply restricted to a single fate.

Two forms of cell death exist. Necrosis is pathological, from anoxia, mechanical injury or toxin exposure: the cell and its organelles swell and burst, spilling contents into the extracellular space, and its nucleus passes through pyknosis (small, dark, condensed chromatin), karyorrhexis (fragmentation by endonuclease) and karyolysis (dissolution). Apoptosis is active and programmed, occurring normally at the end of a cell's lifespan and sometimes pathologically; the cell shrinks rather than swells. Both routes end the same way — the necrotic cell degenerates and is phagocytosed by a macrophage; the apoptotic cell breaks into large vesicles that are themselves phagocytosed by a macrophage.

### Key determinants
Three questions sort this whole page of the book. Is the cell still in cycle, or has it left for G0 — and if it left, can it come back? Is it a stem cell, and if so does it serve one fate or several? And when a cell dies, did it swell and burst, or shrink in an orderly, programmed way? Every named term in this article — G1/S/G2/G0, pluripotential/unipotential, necrosis/apoptosis — is an answer to one of those three questions, not a separate fact to memorise in isolation.

### Clinical significance
The classification of specialised cells by renewal ability — non-renewing cells such as cardiac muscle and neurons, which never divide again once lost; potentially renewable cells such as hepatocytes, which can return to the cycle on demand; and continuously renewing cells such as blood cells, replaced from stem cells rather than by dividing themselves — is the direct clinical explanation for why a myocardial infarction or a spinal cord injury cannot simply regrow, where a partial hepatectomy can.

### Common misconceptions
Confusing the s-chromosome, present through G1, with the d-chromosome, present from S phase onward. The statement "46 chromosomes" is true in both G1 and after S — what changed is whether each chromosome is single- or double-stranded, not the count.

Treating pluripotential as meaning unlimited potential. The book's own bar is comparative — more than one specialised type — not a claim of unrestricted fate; a unipotential stem cell is still a genuine stem cell.

Assuming both forms of cell death end differently. Both necrotic and apoptotic material is ultimately cleared by macrophage phagocytosis; what differs is the route to that end — swelling and rupture against programmed vesiculation — not whether a macrophage is involved.
## published_summary

## published_sections

## hold_these
Cell cycle: mitosis (~1 hr) plus interphase (~20 hr) = G1 (~8 hr, s-chromosomes) → S (~8 hr, duplication to d-chromosomes) → G2 (~4 hr).
G0 is the stable, out-of-cycle phase most specialised cells sit in during a prolonged G1.
Stem cells: pluripotential (more than one fate, e.g. blood cells) versus unipotential (one fate, e.g. male germ cells).
Necrosis: pathological, cells swell and burst; pyknosis, karyorrhexis, karyolysis.
Apoptosis: active, programmed, cells shrink; both routes end in macrophage phagocytosis.
## lose_the_mark
Saying a cell has 46 chromosomes without specifying single- (G1) or double-stranded (S onward) — both are true, at different phases.
Calling apoptosis exclusively pathological. It is the normal end-of-lifespan route as well.
Describing necrosis and apoptosis as ending differently — both are cleared by macrophages.
## callout_evidence

## related_concepts
CON-FND-9C205E44C3404D | CON-FND-4699C7DBCE159A | CON-FND-E44369E755E9F7
## related_articles
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY: the renewal classification this article's G0 phase and stem-cell types underlie
ART-104-HIS-MITOSIS-AND-MEIOSIS: the division this article's cell cycle prepares a cell for
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
CLM-0C0E8A10CDF0 | CLM-1125E3A886CE | CLM-5B0A296D58E3 | CLM-5D726723382B
## span_ids
SPN-HIS-CELL-CYCLE-RENEWAL-01 | SPN-HIS-CELL-CYCLE-RENEWAL-02 | SPN-HIS-CELL-CYCLE-RENEWAL-03 | SPN-HIS-CELL-CYCLE-RENEWAL-04 | SPN-HIS-CELL-CYCLE-RENEWAL-05
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > The Cell Cycle
104 CPS > Histology > Cytogenetics > Cell Division
## university_notes
kau: the cell cycle and cell renewal run printed pp. 38-39, stem cells the foot of p. 39, and cell death p. 40, immediately before the CELL DIVISION heading.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter IV (Cytogenetics), printed pp. 38-40.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-MITOSIS-AND-MEIOSIS
## title
Mitosis and meiosis
## arabic_title

## aliases
[clear]
## subject
fnd
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
9
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Every somatic cell in the body divides by the same four-stage routine; every germ cell divides by a longer, two-round version of it that halves the chromosome number and shuffles the genes on the way. The two routines share a vocabulary — chromosome, spindle, centromere — and a side-by-side reading is the fastest way to keep them from blurring into one.
## sections
### Definition
Mitosis divides the nucleus to produce two daughter cells genetically identical to the parent, in four stages. Prophase: the 46 d-chromosomes shorten, thicken and darken; nucleoli and nuclear envelope disappear; centrioles move to opposite poles as cytoplasmic microtubules radiate from the microtubule-organising centre around them, organising into a spindle. Metaphase: chromosomes migrate to the equatorial plate, and a kinetochore — a dense protein plaque — develops at each centromere as the attachment site for chromosomal microtubules; the spindle's three microtubule types are cytoplasmic (elongating the cell), chromosomal (arranging chromosomes at the equator) and astral (star-like around the centrioles, setting the spindle's axis). Anaphase: each d-chromosome splits longitudinally at the centromere, sister chromatids pulled to opposite poles. Telophase: an actin-driven cleavage furrow divides the cytoplasm; the 46 chromatids of each new cell lengthen and lose visibility; nuclear envelopes and nucleoli re-form.

### Mechanism
Meiosis is a special division in which a diploid cell undergoes two successive rounds without an intervening S-phase, occurring in testis and ovary, producing haploid sperm or ova. The first meiotic division (reduction division) opens with a prophase I that is long — 22 days in spermatogenesis, 12 to 45 years in oogenesis — passing from 46 d-chromosomes as long threads, to 23 bivalents of one maternal and one paternal homologue each, to tetrads of four chromatids in which crossing over exchanges segments between non-sister chromatids at the chiasmata (recombinase-assisted), before the nucleolus and nuclear envelope disappear; metaphase I aligns the 23 bivalents; anaphase I separates whole homologous d-chromosomes to opposite poles; telophase I yields two cells, each with 23 d-chromosomes. The second division, mitosis-like and rapid, with no S-phase: prophase II re-forms the spindle; metaphase II aligns the 23 d-chromosomes; anaphase II splits each at the centromere into two chromatids; telophase II gives two cells, each with 23 s-chromosomes — the haploid number.

### Key determinants
Five features set the two divisions apart. Site: mitosis in somatic cells, meiosis in the germ cells of testis and ovary. Number of divisions: one in mitosis, two without an intervening S-phase in meiosis. Crossing over: absent in mitosis; present in meiosis, with gene exchange. Separation: mitosis splits each chromosome longitudinally at the centromere; meiosis's first division moves a whole bivalent homologue to one pole instead. Daughter cells: mitosis gives two somatic cells, diploid, genetically identical; meiosis gives four germ cells, haploid, genetically varied.

### Clinical significance
Prophase I's extraordinary duration in the female — up to 45 years, the bivalent arrested that whole time — is the direct histological reason maternal age is linked to non-disjunction: the longer a bivalent sits arrested, the longer it has to fail.

### Common misconceptions
Describing the kinetochore as the centromere itself. The kinetochore is a protein plaque that develops at the centromere specifically in metaphase to serve as the microtubule attachment site; the centromere is the chromosomal constriction it sits on.

Reducing mitosis-versus-meiosis to "two cells versus four." The department book's own table roots that outcome in mechanism — one division against two, and whether homologues separate as whole chromosomes or split at the centromere — which is what an exam question on the comparison is actually testing.
## published_summary

## published_sections

## hold_these
Mitosis's four stages: prophase, metaphase, anaphase, telophase — two identical diploid daughter cells.
Kinetochore develops at the centromere in metaphase; it is not the centromere itself.
Meiosis: two divisions, no S-phase between them; crossing over at chiasmata in prophase I.
Prophase I: 22 days (male) versus 12–45 years (female) — the basis of the maternal-age/non-disjunction link.
Mitosis versus meiosis: one division/no crossing over/two identical diploid cells versus two divisions/crossing over/four varied haploid cells.
## lose_the_mark
Calling the kinetochore the centromere, rather than the protein plaque that forms on it.
Forgetting meiosis has no S-phase between its first and second divisions.
Stating "mitosis gives two, meiosis gives four" without the mechanism (division count, separation mode) behind it.
## callout_evidence

## related_concepts
CON-FND-6DEB5A4F0F1675 | CON-FND-685D573458A6D7 | CON-FND-AB1858FD6C0F61
## related_articles
ART-104-HIS-CELL-CYCLE-RENEWAL-DEATH: the cell cycle this article's mitosis is the visible stage of
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE: the centromere, kinetochore and chromatid vocabulary this article uses without redefining
ART-104-HIS-NUMERICAL-ABERRATIONS: what happens when the separations this article describes go wrong
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
CLM-77CB83973CD5
## span_ids
SPN-HIS-MITOSIS-AND-MEIOSIS-01 | SPN-HIS-MITOSIS-AND-MEIOSIS-02
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Cell Division
## university_notes
kau: mitosis runs printed pp. 40-41 and meiosis pp. 41-43, immediately after the cell-death section and before Human Chromosome opens on p. 44.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter IV (Cytogenetics), printed pp. 40-43.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE
## title
The human chromosome: structure, karyotyping and classification
## arabic_title

## aliases
[clear]
## subject
fnd
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
9
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
A chromosome is not one fixed shape; it is DNA at different states of coiling, read differently at different points of the cell cycle, and every technique this article covers — karyotyping, banding, Barr-body counting — is a way of reading that state to answer a real clinical question about a real patient.
## sections
### Definition
Chromosomes are chromatin fibres so condensed and tightly coiled during mitosis and meiosis that they become visible by light microscope. At G1 a chromosome is a single DNA thread, the s-chromosome or chromatid; at S it becomes double-threaded, the d-chromosome. In late prophase and metaphase each chromosome is two chromatids joined at a centromere, which divides it into a short arm (p) and a long arm (q). Kinetochores are two protein discs at the centromere, the spindle's attachment site during division. Each chromatid is a DNA molecule coiled on histone and non-histone proteins. A gene is a DNA segment coding for a specific protein, at a precise locus on the chromosome. Telomeres are repeated-sequence regions capping the chromosomal ends, protecting them from destruction and preventing end-to-end fusion.

### Mechanism
Karyotyping studies chromosome number and type by length and centromere position. Leucocytes are the cell of choice — an ordinary blood draw, stimulated to divide in culture, stopped at metaphase; the spread is photographed, paired, and arranged in descending order of length, then read with specialised software. Banding refines this further by staining different chromosomal segments — genes — in different colours, differentiating chromosomes that length and centromere position alone could not separate.

Chromosomes classify three ways. By gene content: 22 homologous autosome pairs controlling somatic characters, and one pair of sex chromosomes — homologous (XX) in females, heterologous (XY) in males. By centromere position: metacentric (central, arms equal), submetacentric (short arm shorter than long), acrocentric (short arm very short; satellites — small chromatin masses carrying rRNA genes — occur here on every acrocentric chromosome except the Y), and telocentric (terminal centromere, no short arm — not present in humans). By length: the 22 pairs, numbered 1 to 22 in descending length, grouped A through G; sex chromosomes sit alone or with X in group C and Y in group G.

### Key determinants
Sex chromatin, the Barr body, is the inactive, coiled, dark-staining X chromosome in a female nucleus, first described by Murray Barr; the other X stays active and inapparent. It appears on the nuclear envelope in about 60% of female buccal cell nuclei, and as a drumstick on the nucleus in 3 to 5% of female neutrophils. Every somatic cell keeps exactly one active X; every other X becomes a Barr body. A Barr body appears in normal female cells and in male cells with an extra X (47, XXY, Klinefelter syndrome); it is absent in normal male cells and in female cells with only one X (45, XO, Turner syndrome).

### Clinical significance
Chromosomal examination, including Barr-body assessment, does real clinical work: diagnosing genetic sex in doubtful hermaphroditism; identifying fetal sex from amniotic-fluid cells; diagnosing sex-chromosome abnormalities such as Turner and Klinefelter syndromes; diagnosing structural abnormalities such as the deletion behind some mental retardation or the translocation behind chronic myeloid leukaemia; diagnosing numerical abnormalities such as mongolism; and forensic, medico-legal identification.

### Common misconceptions
Predicting Barr-body number by simple subtraction without the rule behind it. The count is always one fewer than the number of X chromosomes present, because exactly one X per cell stays active and every other X is inactivated — apply the rule, do not just memorise the two named syndromes' answers.

Assuming karyotyping needs a specialised dividing tissue such as bone marrow. The department book specifies ordinary leucocytes, stimulated to divide in culture, as the cell of choice — which is what makes the test practical from a simple blood draw.
## published_summary

## published_sections

## hold_these
A chromosome is single-stranded (s-chromosome) at G1 and double-stranded (d-chromosome) from S phase; two chromatids join at the centromere into p (short) and q (long) arms.
Karyotyping uses leucocytes, stopped at metaphase, arranged in descending length order; banding stains individual gene segments.
Centromere position: metacentric, submetacentric, acrocentric (satellites, except on Y), telocentric (absent in humans).
Barr-body count = number of X chromosomes minus one.
Barr body present: normal female, Klinefelter (47,XXY). Barr body absent: normal male, Turner (45,XO).
## lose_the_mark
Calling every chromosome a fixed double-stranded structure rather than a state that changes across the cell cycle.
Forgetting the Y-chromosome exception to the acrocentric-satellite rule.
Predicting Barr-body count without applying the "one fewer than X count" rule.
## callout_evidence

## related_concepts
CON-FND-918BBB81C26937 | CON-FND-C7C2723BD3BC8D | CON-FND-29D305EDFC022D | CON-FND-7FE32E35CA4C7F
## related_articles
ART-104-HIS-MITOSIS-AND-MEIOSIS: the division that first puts the centromere and kinetochore this article defines to use
ART-104-HIS-NUMERICAL-ABERRATIONS: the Klinefelter and Turner syndromes this article's Barr-body rule predicts
ART-104-HIS-STRUCTURAL-ABERRATIONS: the acrocentric-chromosome classification this article sets out, applied to centric-fusion translocation
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
[clear]
## span_ids
[clear]
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Human Chromosome
## university_notes
kau: chromosome structure and karyotyping run printed p. 44, classification p. 45, and the Barr body with its clinical importance p. 46, immediately before Chromosomal Aberrations opens.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter IV (Cytogenetics), printed pp. 44-46.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-NUMERICAL-ABERRATIONS
## title
Numerical chromosomal aberrations
## arabic_title

## aliases
[clear]
## subject
dev
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
9
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
Down syndrome, Klinefelter syndrome, Turner syndrome and triple X syndrome are four different karyotypes with one shared cause — a chromosome, or a whole extra set of them, ending up in the wrong number — and the same non-disjunction event, seen at a different meiotic division, produces each one.
## sections
### Definition
Numerical aberrations are anomalies of chromosome number, in germ or somatic cells, of two kinds. Euploidy is an exact multiple of the haploid number beyond diploid — triploid (3n, 69 chromosomes), tetraploid (4n, 92), or polyploidy (5n or more, meaning one or both gametes were not haploid). Aneuploidy is not an exact multiple: the karyotype shows the addition or loss of one chromosome. Trisomy adds one, giving 2n+1 — three copies instead of two, as in Down syndrome (trisomy 21). Monosomy loses one, giving 2n−1 — one copy instead of two, as in Turner syndrome (45 chromosomes). Aneuploidy can also be mosaic: secondary non-disjunction in mitosis, after many normal divisions, leaves the body with more than one karyotype coexisting.

### Mechanism
Down syndrome (mongolism) results from either non-disjunction of chromosome 21, giving trisomy 21, or a translocation between chromosomes 21 and 14, accounting for 3 to 4% of cases; the affected child's cells carry 47 chromosomes, the extra one resembling chromosome 21. Characteristic features are mental retardation, small genital organs, cardiac abnormalities, a lateral upward slope of the eyes, small ears, and a short, broad nose and neck.

Numerical aberrations of the sex chromosomes trace to non-disjunction in the first meiotic division of the primary oocyte, producing an ovum with two X chromosomes or none. Klinefelter's syndrome (47, XXY), a sex-chromosome trisomy, follows a two-X ovum fertilised by a Y-bearing sperm; the affected male carries a positive Barr body and is characteristically mentally retarded, tall, with small testes and large, widely spaced breasts. Multiple X syndrome (47, XXX), also a trisomy, follows the same non-disjunction but fertilisation by an X-bearing sperm; the affected female carries two Barr bodies and characteristically shows delayed language development, motor coordination problems and auditory disorders. Turner's syndrome (45, XO), a sex-chromosome monosomy, follows an ovum with no X fertilised by an X-bearing sperm; the affected female has no Barr body and is characteristically short, mentally retarded, with limb oedema, underdeveloped ovaries and external genitalia, and primary amenorrhoea.

### Key determinants
All three sex-chromosome syndromes trace to the identical event — non-disjunction in the first meiotic division of the oocyte — so the karyotype, not the mechanism, is what actually separates them. Fix the karyotype and the Barr-body count follows automatically, one fewer than the X-chromosome total.

### Clinical significance
Causes of chromosomal aberration generally include radiation (damage and non-disjunction), viral infection such as German measles (fragmentation), advanced maternal age (non-disjunction risk, from prophase I's own long arrest), cytotoxic drugs such as colchicine (inhibiting spindle formation), and autoimmune disease (associated with non-disjunction) — a list worth holding against Down syndrome specifically, since maternal age is the clinical variable most directly tied to non-disjunction risk in this chapter.

### Common misconceptions
Treating "aneuploid" and "not diploid" as synonyms. A triploid or tetraploid cell is not diploid either, but it is euploid, because 3n and 4n are still exact multiples of the haploid number — aneuploidy specifically means the count is off by one chromosome, not by a whole set.

Treating Down syndrome as caused by non-disjunction alone. The book states a second route explicitly, centric-fusion translocation between chromosomes 21 and 14, in 3 to 4% of cases — the minority route an exam question on "other causes" is testing.
## published_summary

## published_sections

## hold_these
Euploidy: exact multiple of haploid number beyond diploid (triploid, tetraploid, polyploid). Aneuploidy: addition/loss of one chromosome (trisomy 2n+1, monosomy 2n−1).
Down syndrome: trisomy 21 (non-disjunction) or 21;14 translocation (3–4% of cases) — 47 chromosomes, characteristic dysmorphic features.
All three sex-chromosome syndromes trace to non-disjunction in meiosis I of the oocyte.
Klinefelter (47,XXY, Barr-positive), triple X (47,XXX, two Barr bodies), Turner (45,XO, Barr-negative).
Causes of aberration generally: radiation, viral infection, maternal age, cytotoxic drugs, autoimmune disease.
## lose_the_mark
Calling a triploid or tetraploid cell aneuploid instead of euploid.
Naming non-disjunction as Down syndrome's only cause and missing the 21;14 translocation route.
Getting a sex-chromosome syndrome's Barr-body count wrong by not applying the X-count-minus-one rule.
## callout_evidence

## related_concepts
CON-DEV-451A64C9445CAB | CON-DEV-294FB8DDA40429 | CON-DEV-C5F7B1973F8049
## related_articles
ART-104-HIS-CELL-RENEWAL-AND-ANEUPLOIDY: the causes of aneuploidy (non-disjunction, failure of duplication, simple loss) this article's numerical taxonomy explains
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE: the Barr-body rule this article applies to each named syndrome
ART-104-HIS-STRUCTURAL-ABERRATIONS: the companion aberration category, structural rather than numerical
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
[clear]
## span_ids
[clear]
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
## university_notes
kau: causes of chromosomal aberration and numerical aberrations run printed pp. 46-48, Down syndrome p. 48, and the sex-chromosome syndromes pp. 48-49.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter IV (Cytogenetics), printed pp. 46-49.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

# Item
## id
ART-104-HIS-STRUCTURAL-ABERRATIONS
## title
Structural chromosomal aberrations
## arabic_title

## aliases
[clear]
## subject
dev
## topic
Histology
## subtopic

## microtopic

## nanotopic

## primary_node_id
DIS-HIS-T01
## secondary_node_ids
[clear]
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
8
## high_yield
Core
## time_sensitive
stable
## status
Draft
## owner
Claude
## reviewer
Medical team, Admin team
## final_publisher
Admin team
## summary
A chromosome does not need to gain or lose a whole copy of itself to cause disease — a single break, healed in the wrong place, can delete, invert, relocate or duplicate a piece of it, and which of those five things happened is usually readable straight off the karyotype.
## sections
### Definition
Structural aberrations are abnormalities of chromosome structure rather than number. An aberration is balanced if the chromosome's genetic information is unchanged overall, and unbalanced, with an affected phenotype, if information has been added or lost. Breaks heal rapidly by reunion of the two sticky ends they leave.

### Mechanism
Deletion is loss of a fragment, in three forms: terminal (a single break, loss from one end), interstitial (two breaks in the same arm, loss between them, fusion at the break sites), and ring chromosome (two breaks, loss of the fragment between them, reunion into a ring). Inversion is two breaks followed by rejoining in reversed orientation — pericentric, the breaks flanking the centromere, or paracentric, both breaks on one side of it. Translocation transfers a segment to a non-homologous chromosome, in two forms: centric fusion, in which the long arms of two acrocentric chromosomes — classically 21 and 14 — fuse, with loss of the insignificant short arms, seen in 3 to 4% of Down syndrome; and reciprocal translocation, an exchange of material between two chromosomes, usually balanced since nothing is lost overall. Duplication adds an extra copy of a segment to its homologue, usually from unequal crossing over, giving a double dose of the duplicated genes. Isochromosomes arise mostly in submetacentric chromosomes when the centromere divides transversely rather than longitudinally at mitotic anaphase, giving one short and one long chromatid that become, in the daughter cells, two unequal chromosomes each with matching (both-long or both-short) arms.

### Key determinants
Two questions distinguish the six named types from each other. Did the chromosome lose material, gain material, or simply rearrange what it already had — deletion loses, duplication gains, inversion and reciprocal translocation rearrange without net loss, and centric fusion loses only the two acrocentric short arms, which the book calls insignificant. And did the break fall relative to the centromere — pericentric inversion flanks it, paracentric sits to one side, and an isochromosome forms because the centromere itself divides the wrong way, transversely instead of longitudinally.

### Clinical significance
The Philadelphia chromosome, a reciprocal translocation between chromosomes 22 and 9, is used to diagnose chronic myeloid leukaemia — a direct clinical application of the reciprocal-translocation mechanism this article describes, and a different chromosome pair from Down syndrome's centric-fusion translocation of 21 and 14.

### Common misconceptions
Filing the Philadelphia chromosome under centric-fusion translocation because Down syndrome's translocation is the more familiar one. It is a reciprocal translocation, between 22 and 9, structurally distinct from the centric fusion of 21 and 14 that causes some Down syndrome — the book states it as a read-only note directly after isochromosomes, and the two translocation types are easy to conflate precisely because both are called "translocation."

Treating every structural aberration as unbalanced. A reciprocal translocation, and any aberration that keeps the chromosome's full genetic complement despite rearranging it, is balanced by definition — "structural" describes what changed, not whether anything was lost.
## published_summary

## published_sections

## hold_these
Balanced aberration: full genetic complement, rearranged. Unbalanced: information added or lost, affected phenotype.
Deletion: terminal, interstitial, or ring chromosome.
Inversion: pericentric (breaks flank centromere) versus paracentric (both breaks one side).
Translocation: centric fusion (acrocentric long arms, e.g. 21;14, 3–4% of Down syndrome) versus reciprocal (balanced exchange, e.g. Philadelphia chromosome, 22;9).
Isochromosome: centromere splits transversely at mitotic anaphase, giving matched-arm daughter chromosomes.
## lose_the_mark
Filing the Philadelphia chromosome (22;9, reciprocal) under Down syndrome's translocation (21;14, centric fusion).
Assuming a structural aberration is always unbalanced — reciprocal translocation usually is not.
Mixing up pericentric and paracentric inversion by which side of the centromere the breaks fall on.
## callout_evidence

## related_concepts
CON-DEV-D2BA4082190B3F
## related_articles
ART-104-HIS-NUMERICAL-ABERRATIONS: the companion aberration category and the Down syndrome article naming this article's own centric-fusion translocation
ART-104-HIS-CHROMOSOME-STRUCTURE-KARYOTYPE: the acrocentric/submetacentric classification this article's translocation and isochromosome mechanisms depend on
## question_ids
[clear]
## resource_ids
src_18d3a953df4ca83c4e74
## article_source_ids
src_18d3a953df4ca83c4e74
## claim_ids
CLM-6008DF5BAE4A
## span_ids
SPN-HIS-STRUCTURAL-ABERRATIONS-01
## universities
kau
## years
Year 1
## module
104 CPS
## module_subject
104 CPS > Histology > Cytogenetics > Chromosomal Aberrations (Abnormalities)
## university_notes
kau: structural aberrations run printed pp. 49-51, the last section of the histology book before its reference list on p. 52.
## annotations

## media

## media_recommendations

## publication_gate
needs_evidence
## evidence_basis
Department histology book, Chapter IV (Cytogenetics), printed pp. 49-51.
## evidence_gaps
[clear]
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Written directly from the department histology book; no prior draft existed for this content. Evidence (claims/citations/spans) is a separate lane's scope -- claim_ids above are reserved ids already carried by this article's own concepts, and span_ids names one reserved id per article for a future evidence pass, not yet backed by a real span record.
## field_notes
evidenceBasis: A single department-book citation because every claim in this article traces to one source, the histology book named on resource_ids.
conflicts: The department book is the only source read; nothing was found to record.
aliases: No alternate names are in use for this teaching grouping beyond the terms already carried as aliases on the concepts it teaches.
questionIds: No hand-authored questions have been written against this article yet; question authoring is a separate lane's scope.
microtopicId: The catalogue has no MIC_ ids for first-year basic science; module_subject carries the curriculum position instead.
nanotopicId: As above — no NAN_ ids exist for this material.
media: No media has been sourced or rights-cleared for this module; the corpus is a private university collection.
lastReviewed: New record; no reviewer has seen it yet.
reviewDue: Set when the first review completes; a due date before a first review is a date nobody agreed to.
arabicTitle: Teaching at Kasr Alainy is in English and the department book prints no Arabic term; not transliterated, because a transliteration is not a reviewed term.
---

