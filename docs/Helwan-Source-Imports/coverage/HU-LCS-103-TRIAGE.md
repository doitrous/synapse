# HU-LCS-103 S1 triage

Status: `S1 TRIAGE — NOT APPROVED`. This is an assessment-evidence ledger only. It
creates no content records, IDs, imports, or student-facing material.

## Family 1 — anatomy written EOM file

### Source identity and read method

| Field | Verified value |
|---|---|
| Manifest source | `src_c690a159f01583eedac8` |
| Manifest SHA-256 | `c690a159f01583eedac809d9794b765890018602d4cddaf6a70ecb6bfabd8521` |
| Recomputed SHA-256 | `c690a159f01583eedac809d9794b765890018602d4cddaf6a70ecb6bfabd8521` |
| File | `EOM - ALLAWI helwan written final.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Assessments/Exams/EOM - ALLAWI helwan written final.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · All Subjects · Assessments/Exams · EOM · tier 2 |
| Container | six native-text PDF pages: one decorative cover plus five printed question pages |
| This bounded family | physical PDF pp. 2–6, printed pp. 1–5; Anatomy, lower limb plus head-and-neck/limb-development prompts |
| Read method | `pdftotext -layout` transcription checked against all five rendered question pages at 140 dpi |

The EOM classification and its physical placement inside the LCS-103 assessment folder make
this the highest-authority substantive LCS-103 source currently on disk. The printed pages
contain empty tables and dotted answer lines only. There is no answer section, highlighted
choice, margin key, or completed cell, so **zero printed keys** are recovered; no answer is
inferred from medical knowledge during S1.

### Exact prompt inventory

An independently answerable named target is one prompt record. A target's requested
attributes (for example origin, insertion, nerve supply and action) remain components of
that one prompt rather than four artificial records.

| Printed page | Printed scope | Prompt records | Printed keys |
|---:|---|---:|---:|
| 1 | Three regions (femoral sheath, adductor canal, popliteal fossa); ten named vessels; two ankle retinacula | 15 | 0 |
| 2 | Twenty named muscles; four sole layers; two sciatic foramina; four named nerve injuries | 30 | 0 |
| 3 | ACL and PCL; LCL and MCL; both menisci; three hip-joint ligaments; knee bursae | 10 | 0 |
| 4 | Seven triangles/fossae; maxillary artery; mandibular nerve; pterygoid plexus; sternocleidomastoid | 11 | 0 |
| 5 | Cervical plexus; scalp sensation; facial sensation; eight limb/digit anomaly terms | 11 | 0 |
| **Family 1** |  | **77** | **0** |

Arithmetic: `15 + 30 + 10 + 11 + 11 = 77`. All 77 are written prompts; the source has
no MCQ in this bounded family.

### Prompt-to-handle assignment ledger

The handles are triage labels, not proposed concept IDs or final labels. A semicolon
separates independently answerable printed targets in source order. A slash denotes several
printed targets collapsed to one teaching concept after all source locations remain attached.

| Evidence | Printed targets assigned in source order |
|---|---|
| p. 1 · regions | `femoral-sheath`; `adductor-canal`; `popliteal-fossa` |
| p. 1 · origin/termination/branches | `femoral-artery`; `popliteal-artery`; `anterior-tibial-artery`; `posterior-tibial-artery`; `fibular-artery`; `dorsalis-pedis-artery`; `medial-plantar-artery`; `lateral-plantar-artery`; `great-saphenous-vein`; `small-saphenous-vein` |
| p. 1 · deep to retinacula | `extensor-retinaculum-contents`; `flexor-retinaculum-contents` |
| p. 2 · OINA | `sartorius-oina`; `semimembranosus-oina`; `gluteus-maximus-oina`; `tibialis-anterior-oina`; `rectus-femoris-oina`; `semitendinosus-oina`; `gluteus-medius-oina`; `gastrocnemius-oina`; `gracilis-oina`; `biceps-femoris-oina`; `piriformis-oina`; `soleus-oina`; `articularis-genu-oina`; `adductor-magnus-oina`; `gluteus-minimus-oina`; `popliteus-oina`; `fibularis-longus-oina`; `tibialis-posterior-oina`; `flexor-hallucis-longus-oina`; `flexor-digitorum-longus-oina` |
| p. 2 · sole layers 1–4 | `intrinsic-foot-layers` (four prompt records → one handle) |
| p. 2 · greater/lesser foramina | `sciatic-foramina-contents` (two → one) |
| p. 2 · sciatic/tibial/common fibular/superior gluteal injury | `major-lower-limb-nerve-injury-deformities` (four → one) |
| p. 3 · ACL/PCL | `cruciate-ligaments` (two → one) |
| p. 3 · LCL/MCL | `collateral-ligaments-knee` (two → one) |
| p. 3 · medial/lateral menisci | `knee-menisci` (two → one) |
| p. 3 · iliofemoral/pubofemoral/ischiofemoral ligaments | `hip-joint-ligaments` (three → one) |
| p. 3 · bursae | `knee-bursae` |
| p. 4 · regions | `submental-triangle`; `carotid-triangle`; `muscular-triangle`; `submandibular-triangle`; `posterior-triangle-neck`; `temporal-fossa`; `infratemporal-fossa` |
| p. 4 · branches/connections/OINA | `maxillary-artery-branches`; `mandibular-nerve-branches`; `pterygoid-plexus-connections`; `sternocleidomastoid-oina` |
| p. 5 · sensory/plexus | `cervical-plexus`; `scalp-sensory-supply`; `face-sensory-supply` |
| p. 5 · eight definitions | `limb-reduction-and-digit-anomalies` (amelia, phocomelia, brachydactyly, syndactyly, polydactyly, cleft hand/foot); `micromelia-and-ectrodactyly-terminology` (eight → two handles) |

There is no exact repeated prompt in this source. The explicit semantic collapses above
remove 18 handle duplications: `77 - 18 = 59` tested-concept handles.

### Search-before-mint register and semantic dispositions

Every handle received four required searches: a distinctive term, an alias, a synonym or
abbreviation, and a mechanism/structure phrase. This is **59 handles × 4 = 236 required
search invocations**. Ten follow-ups (`ACL`, `PCL`, `MCL`, `LCL`, `meniscus`, `menisci`,
`cruciate ligament`, `collateral ligament`, `iliofemoral`, `knee locking`) resolved
abbreviation-heavy knee results, for **246 invocations total**. Search scope was live state,
`docs/import-ready`, `docs/questions-import-ready`, and every `docs/*-Source-Imports` root.

`live` and `pending` below mean one existing record can absorb the full prompt without
becoming two unrelated objectives. A record that merely mentions the anatomy is rejected as
too narrow. Placement is deliberately broad S1 routing, not an invented taxonomy ID:
`MSK/ANA` = musculoskeletal anatomy, `NEU/ANA` = neuroanatomy, `CVS/ANA` = vascular
anatomy, and `DEV/EMB` = limb development.

| # | Handle / evidence | Four required queries | Same-idea/same-scope result | Disposition | Placement if new |
|---:|---|---|---|---|---|
| 1 | `femoral-sheath` · p1 | `femoral sheath`; `femoral canal`; `sheath compartments`; `femoral hernia` | Pending Kasr `103-BMS-anatomy-concepts.md` has the sheath, compartments and canal; broaden the existing record for full boundaries/contents. | pending | — |
| 2 | `adductor-canal` · p1 | `adductor canal`; `Hunter canal`; `subsartorial canal`; `canal contents` | Pending Kasr record gives the triangular walls and four contents; live relation facts are narrower. | pending | — |
| 3 | `popliteal-fossa` · p1 | `popliteal fossa`; `posterior knee space`; `fossa boundaries`; `fossa contents` | Pending article title and artery/nerve mentions do not teach the fossa's boundaries, roof, floor and contents. | new | MSK/ANA |
| 4 | `femoral-artery` · p1 | `femoral artery`; `superficial femoral`; `femoral artery branches`; `lower limb artery` | Live relations name individual neighbours only; no full origin/termination/branches record. | new | CVS/ANA |
| 5 | `popliteal-artery` · p1 | `popliteal artery`; `genicular branches`; `femoral continuation`; `knee anastomosis` | Pending AU-MED-105 record states continuation, termination and genicular branches. | pending | — |
| 6 | `anterior-tibial-artery` · p1 | `anterior tibial artery`; `anterior tibial`; `dorsalis pedis origin`; `anterior leg artery` | Live `CON-MSK-C304D4DB6EDD7A` and `CON-MSK-F656F96F575FFB` hold entry and terminal transition; consolidate/extend rather than mint a duplicate artery concept. | live | — |
| 7 | `posterior-tibial-artery` · p1 | `posterior tibial artery`; `posterior tibial`; `medial lateral plantar origin`; `posterior leg artery` | Pending Kasr record already owns posterior-tibial branches and can absorb origin/termination. | pending | — |
| 8 | `fibular-artery` · p1 | `fibular artery`; `peroneal artery`; `fibular artery branches`; `posterior compartment artery` | No concept hit under either name. | new | CVS/ANA |
| 9 | `dorsalis-pedis-artery` · p1 | `dorsalis pedis`; `dorsal artery foot`; `dorsalis pedis branches`; `anterior tibial continuation` | Live `CON-MSK-F656F96F575FFB` owns the anterior-tibial transition; extend it for the requested branches. | live | — |
| 10 | `medial-plantar-artery` · p1 | `medial plantar artery`; `medial plantar`; `plantar artery branches`; `posterior tibial terminal` | The only hit is the homonymous cutaneous nerve territory. | new | CVS/ANA |
| 11 | `lateral-plantar-artery` · p1 | `lateral plantar artery`; `lateral plantar`; `plantar arch`; `posterior tibial terminal` | The only hit is the homonymous cutaneous nerve territory. | new | CVS/ANA |
| 12 | `great-saphenous-vein` · p1 | `great saphenous vein`; `long saphenous`; `saphenous opening`; `medial superficial vein` | Pending Kasr/AU records give origin, course and termination. | pending | — |
| 13 | `small-saphenous-vein` · p1 | `small saphenous vein`; `short saphenous`; `popliteal vein termination`; `lateral superficial vein` | Pending Kasr record gives origin, course and termination. | pending | — |
| 14 | `extensor-retinaculum-contents` · p1 | `extensor retinaculum`; `deep to extensor retinaculum`; `anterior ankle contents`; `ankle retinaculum` | All hits are wrist extensor-retinaculum records; ankle scope absent. | new | MSK/ANA |
| 15 | `flexor-retinaculum-contents` · p1 | `flexor retinaculum`; `deep to flexor retinaculum`; `tarsal tunnel contents`; `Tom Dick Harry` | All hits are carpal-tunnel/wrist records; tarsal-tunnel scope absent. | new | MSK/ANA |
| 16 | `sartorius-oina` · p2 | `sartorius`; `sartorius insertion`; `sartorius nerve supply`; `sartorius action` | Live medial-rotation and pending pes-anserinus facts are narrower than OINA. | new | MSK/ANA |
| 17 | `semimembranosus-oina` · p2 | `semimembranosus`; `semimembranosus insertion`; `semimembranosus nerve supply`; `semimembranosus action` | Pending hamstring-group record lacks the muscle's full attachments. | new | MSK/ANA |
| 18 | `gluteus-maximus-oina` · p2 | `gluteus maximus`; `gluteus maximus insertion`; `inferior gluteal nerve`; `hip extension` | Pending Kasr/AU records own this muscle's insertion, action and nerve; extend for origin. | pending | — |
| 19 | `tibialis-anterior-oina` · p2 | `tibialis anterior`; `tibialis anterior insertion`; `deep fibular nerve`; `ankle dorsiflexion inversion` | Pending compartment/inversion records are group mechanisms, not the requested OINA. | new | MSK/ANA |
| 20 | `rectus-femoris-oina` · p2 | `rectus femoris`; `rectus femoris origin`; `femoral nerve quadriceps`; `hip flexion knee extension` | No concept hit. | new | MSK/ANA |
| 21 | `semitendinosus-oina` · p2 | `semitendinosus`; `semitendinosus insertion`; `tibial division sciatic`; `knee flexion medial rotation` | Hamstring/pes-anserinus group hits do not supply full OINA. | new | MSK/ANA |
| 22 | `gluteus-medius-oina` · p2 | `gluteus medius`; `gluteus medius insertion`; `superior gluteal nerve`; `pelvic stability` | Pending medius/minimus mechanism omits attachments. | new | MSK/ANA |
| 23 | `gastrocnemius-oina` · p2 | `gastrocnemius`; `gastrocnemius origin`; `tibial nerve gastrocnemius`; `plantarflexion knee flexion` | No concept hit. | new | MSK/ANA |
| 24 | `gracilis-oina` · p2 | `gracilis muscle`; `gracilis insertion`; `obturator nerve gracilis`; `hip adduction knee flexion` | Pes-anserinus mention is not a full gracilis OINA record. | new | MSK/ANA |
| 25 | `biceps-femoris-oina` · p2 | `biceps femoris`; `biceps femoris insertion`; `common fibular biceps`; `knee flexion lateral rotation` | Live rotation and pending hamstring-group records omit full attachments. | new | MSK/ANA |
| 26 | `piriformis-oina` · p2 | `piriformis`; `piriformis insertion`; `nerve to piriformis`; `lateral rotation hip` | Sciatic-foramen and lateral-rotator group hits are different objectives. | new | MSK/ANA |
| 27 | `soleus-oina` · p2 | `soleus`; `soleus insertion`; `tibial nerve soleus`; `plantarflexion postural` | No concept hit. | new | MSK/ANA |
| 28 | `articularis-genu-oina` · p2 | `articularis genu`; `articularis genus`; `femoral nerve articularis`; `suprapatellar bursa` | No concept hit under either spelling. | new | MSK/ANA |
| 29 | `adductor-magnus-oina` · p2 | `adductor magnus`; `adductor magnus insertion`; `obturator sciatic adductor`; `adductor hiatus` | Live attachment/insertion records (`CON-MSK-B2A35D15A28004`, `CON-MSK-473AEEB1BB2FEE`) already own the muscle; merge/extend rather than duplicate. | live | — |
| 30 | `gluteus-minimus-oina` · p2 | `gluteus minimus`; `gluteus minimus insertion`; `superior gluteal nerve`; `hip abduction medial rotation` | Pending medius/minimus mechanism omits attachments. | new | MSK/ANA |
| 31 | `popliteus-oina` · p2 | `popliteus`; `popliteus insertion`; `tibial nerve popliteus`; `unlocking knee` | Pending unlocking record is a knee mechanism, not full OINA. | new | MSK/ANA |
| 32 | `fibularis-longus-oina` · p2 | `fibularis longus`; `peroneus longus`; `superficial fibular nerve`; `eversion plantarflexion` | Pending Kasr record owns peroneus-longus action and nerve and can absorb attachments. | pending | — |
| 33 | `tibialis-posterior-oina` · p2 | `tibialis posterior`; `tibialis posterior insertion`; `tibial nerve tibialis`; `inversion plantarflexion` | Foot-arch support mention is a different objective. | new | MSK/ANA |
| 34 | `flexor-hallucis-longus-oina` · p2 | `flexor hallucis longus`; `FHL muscle`; `tibial nerve FHL`; `great toe flexion` | No concept hit. | new | MSK/ANA |
| 35 | `flexor-digitorum-longus-oina` · p2 | `flexor digitorum longus`; `FDL muscle`; `tibial nerve FDL`; `lateral four toes flexion` | No concept hit. | new | MSK/ANA |
| 36 | `intrinsic-foot-layers` · p2 | `layers of sole`; `first layer sole`; `second third fourth layer foot`; `intrinsic foot muscles` | No concept hit. | new | MSK/ANA |
| 37 | `sciatic-foramina-contents` · p2 | `greater sciatic foramen`; `lesser sciatic foramen`; `sciatic foramina contents`; `piriformis foramen contents` | Pending AU-MED-105 record owns both foramina and piriformis partition. | pending | — |
| 38 | `major-lower-limb-nerve-injury-deformities` · p2 | `sciatic nerve injury`; `tibial nerve injury`; `common peroneal nerve injury`; `superior gluteal nerve injury` | A common-peroneal pending alias covers only one quarter of the composite prompt. | new | NEU/ANA |
| 39 | `cruciate-ligaments` · p3 | `anterior cruciate ligament`; `posterior cruciate ligament`; `cruciate attachment`; `cruciate injury` | Follow-up `ACL` finds six narrow live facts, but PCL and the full comparison are absent. | new | MSK/ANA |
| 40 | `collateral-ligaments-knee` · p3 | `lateral collateral ligament knee`; `medial collateral ligament knee`; `collateral ligament attachment`; `collateral ligament injury` | Elbow collateral-ligament hits are rejected; no knee comparison. | new | MSK/ANA |
| 41 | `knee-menisci` · p3 | `medial meniscus`; `lateral meniscus`; `meniscal attachment`; `meniscus injury` | Pending capsule/ligament/menisci overview omits shape, attachment and injury comparison. | new | MSK/ANA |
| 42 | `hip-joint-ligaments` · p3 | `iliofemoral ligament`; `pubofemoral ligament`; `ischiofemoral ligament`; `hip ligament` | Pending AU-MED-105 record owns the same three-ligament stabilisation scope. | pending | — |
| 43 | `knee-bursae` · p3 | `knee bursae`; `bursae around knee`; `prepatellar bursa`; `suprapatellar bursa` | No concept hit. | new | MSK/ANA |
| 44 | `submental-triangle` · p4 | `submental triangle`; `submental region`; `triangle boundaries content`; `anterior triangle neck` | No concept hit. | new | MSK/ANA |
| 45 | `carotid-triangle` · p4 | `carotid triangle`; `carotid region`; `triangle boundaries content`; `anterior triangle neck` | No concept hit. | new | CVS/ANA |
| 46 | `muscular-triangle` · p4 | `muscular triangle neck`; `omotracheal triangle`; `triangle boundaries content`; `anterior triangle neck` | No concept hit. | new | MSK/ANA |
| 47 | `submandibular-triangle` · p4 | `submandibular triangle`; `digastric triangle`; `triangle boundaries content`; `anterior triangle neck` | No concept hit. | new | MSK/ANA |
| 48 | `posterior-triangle-neck` · p4 | `posterior triangle neck`; `lateral cervical region`; `posterior triangle contents`; `posterior triangle boundaries` | No concept hit. | new | MSK/ANA |
| 49 | `temporal-fossa` · p4 | `temporal fossa`; `temporal region anatomy`; `fossa boundaries contents`; `temporalis fossa` | Live chorda-tympani course merely passes through the region; the fossa anatomy is absent. | new | MSK/ANA |
| 50 | `infratemporal-fossa` · p4 | `infratemporal fossa`; `infratemporal region`; `fossa boundaries contents`; `pterygoid space` | Live chorda-tympani course is narrower than boundaries/contents. | new | MSK/ANA |
| 51 | `maxillary-artery-branches` · p4 | `maxillary artery`; `maxillary artery branches`; `first second third part maxillary`; `pterygopalatine artery branches` | No concept hit. | new | CVS/ANA |
| 52 | `mandibular-nerve-branches` · p4 | `mandibular nerve`; `V3 branches`; `mandibular division trigeminal`; `infratemporal nerve branches` | No concept hit. | new | NEU/ANA |
| 53 | `pterygoid-plexus-connections` · p4 | `pterygoid plexus`; `pterygoid venous plexus`; `connections pterygoid plexus`; `cavernous sinus communication` | Live `CON-FND-1DE320DE8928B2` owns anterior communication; extend/merge the remaining connections rather than duplicate the plexus. | live | — |
| 54 | `sternocleidomastoid-oina` · p4 | `sternocleidomastoid`; `SCM origin insertion`; `accessory nerve SCM`; `neck rotation flexion` | Clavicle-fracture mention is a different objective. | new | MSK/ANA |
| 55 | `cervical-plexus` · p5 | `cervical plexus`; `C1 C4 plexus`; `cutaneous branches neck`; `ansa cervicalis` | No concept hit. | new | NEU/ANA |
| 56 | `scalp-sensory-supply` · p5 | `sensory supply scalp`; `scalp innervation`; `trigeminal occipital nerves`; `supraorbital greater occipital` | No concept hit. | new | NEU/ANA |
| 57 | `face-sensory-supply` · p5 | `sensory supply face`; `facial sensation`; `trigeminal divisions face`; `great auricular angle mandible` | No concept hit. | new | NEU/ANA |
| 58 | `limb-reduction-and-digit-anomalies` · p5 | `amelia`; `phocomelia`; `syndactyly polydactyly`; `cleft hand foot` | Pending Kasr limb-anomaly record owns amelia, brachydactyly, syndactyly, polydactyly and cleft hand/foot; extend for phocomelia. | pending | — |
| 59 | `micromelia-and-ectrodactyly-terminology` · p5 | `micromelia`; `ectrodactyly`; `limb reduction defects`; `split hand foot` | No same-scope concept hit. | new | DEV/EMB |

### Family-1 checkpoint

| Module / bounded family | Questions triaged | Printed keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| `HU-LCS-103` · Anatomy written EOM pp. 1–5 | 77 | 0 | 59 | 4 | 11 | 44 |

Arithmetic: `4 + 11 + 44 = 59` dispositions; `77 - 18 = 59` source-distinct handles.
This is the first bounded LCS-103 family, not the consolidated module or Helwan Year-1
triage checkpoint.

## Family 2 — five anatomy locomotor quiz exams

### Source identity and read method

| Field | Verified value |
|---|---|
| Manifest source | `src_5423328a4798dba3c3be` |
| Manifest SHA-256 | `5423328a4798dba3c3be58543155dee7da4efd04ef9c57886d6a6b657a21bf91` |
| Recomputed SHA-256 | `5423328a4798dba3c3be58543155dee7da4efd04ef9c57886d6a6b657a21bf91` |
| File | `Exams for Locomotor Quiz.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Assessments/Exams/Exams for Locomotor Quiz.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · All Subjects · Assessments/Exams |
| Container | 11 native-text, unencrypted A4 PDF pages; five consecutively numbered anatomy exams |
| This bounded family | Exam 1 pp. 1–2; Exam 2 pp. 3–4; Exam 3 pp. 5–6; Exam 4 pp. 7–8; Exam 5 pp. 9–11 |
| Read method | `pdftotext -layout` transcription checked against every page rendered at 180 dpi |

All 11 rendered pages show a pale-yellow answer column separated from the option text by a
vertical rule. Each of the 75 question rows has one large bold letter in that column. Those
letters are therefore **75 printed keys**, not incidental option labels or later handwriting.
S1 records the printed letters as evidence and does not silently correct their medical content.

### Exact question and key inventory

| Exam | Physical pages | Raw MCQ records | Printed keys | Printed key sequence Q1→Q15 |
|---:|---:|---:|---:|---|
| 1 | 1–2 | 15 | 15 | `A A D D C B C C D D C B A E D` |
| 2 | 3–4 | 15 | 15 | `A B B B D C B A A E A E D C A` |
| 3 | 5–6 | 15 | 15 | `B A B C A C C D C C D C A A E` |
| 4 | 7–8 | 15 | 15 | `D B B C A C B B D C B D A B A` |
| 5 | 9–11 | 15 | 15 | `D C E C D D D D D B B D C E B` |
| **Family 2** | **1–11** | **75** | **75** | **75 one-letter answer-column marks** |

Arithmetic: `5 × 15 = 75` observed MCQ records and `15 + 15 + 15 + 15 + 15 = 75`
printed keys. Two later occurrences are exact prompt repeats apart from numbering/layout:
Exam 2 Q5 repeats Exam 1 Q4, and Exam 5 Q13 repeats Exam 5 Q4. Thus the source contains
**73 unique prompt forms**, but all **75 observed exam occurrences and 75 printed keys** remain
counted as assessment evidence.

The transcription also preserves source defects instead of repairing them: Exam 1 Q14's
key `E` selects printed compound option `B&D`; Exam 2 Q10 and Q12 each key printed compound
option `C & D`; Exam 1 Q13 ends with the truncated option `d-magnus`; Exam 3 Q12 has the
malformed singular/directional stem; Exam 4 Q8 duplicates the `d.` option label; Exam 4 Q11
omits a positional preposition; and Exam 5 Q5 retains printed key `D` despite its dual-lesion
stem being a content-review risk. These are keyed source records, not S1 corrections.

### Question-to-handle assignment ledger

Every observed question occurrence is assigned once below. Repeated handles are deliberate
semantic collapses, while the two exact repeats remain visibly attached to both source locations.

| Evidence | One-to-one assignments in question order |
|---|---|
| Exam 1 · Q1–Q15 | `Q1→saphenous-opening`; `Q2→iliotibial-tract`; `Q3→hip-flexor-identification`; `Q4→obturator-nerve-roots-and-distribution`; `Q5→adductor-magnus-oina`; `Q6→femoral-triangle-anatomy`; `Q7→femoral-sheath`; `Q8→femoral-artery`; `Q9→femoral-sheath`; `Q10→adductor-canal`; `Q11→femoral-nerve-roots-course-and-distribution`; `Q12→gluteus-maximus-oina`; `Q13→gluteus-medius-oina`; `Q14→sciatic-foramina-contents`; `Q15→inferior-gluteal-artery` |
| Exam 2 · Q1–Q15 | `Q1→iliotibial-tract`; `Q2→sartorius-oina`; `Q3→rectus-femoris-oina`; `Q4→articularis-genu-oina`; `Q5→obturator-nerve-roots-and-distribution` (**exact repeat of E1Q4**); `Q6→femoral-triangle-anatomy`; `Q7→femoral-sheath`; `Q8→adductor-canal`; `Q9→femoral-nerve-roots-course-and-distribution`; `Q10→saphenous-nerve-sensory-territory`; `Q11→gluteus-maximus-oina`; `Q12→sciatic-foramina-contents`; `Q13→quadratus-femoris-oina`; `Q14→popliteal-artery`; `Q15→femoral-sheath` |
| Exam 3 · Q1–Q15 | `Q1→sartorius-oina`; `Q2→quadriceps-femoris-action`; `Q3→femoral-triangle-anatomy`; `Q4→adductor-canal`; `Q5→femoral-nerve-roots-course-and-distribution`; `Q6→gluteus-minimus-oina`; `Q7→sciatic-foramina-contents`; `Q8→adductor-canal`; `Q9→adductor-canal`; `Q10→obturator-nerve-roots-and-distribution`; `Q11→obturator-internus-oina`; `Q12→adductor-canal`; `Q13→adductor-canal`; `Q14→gluteal-intramuscular-injection`; `Q15→femoral-sheath` |
| Exam 4 · Q1–Q15 | `Q1→sartorius-oina`; `Q2→rectus-femoris-oina`; `Q3→femoral-triangle-anatomy`; `Q4→adductor-canal`; `Q5→femoral-nerve-roots-course-and-distribution`; `Q6→obturator-nerve-roots-and-distribution`; `Q7→iliotibial-tract`; `Q8→superior-gluteal-artery`; `Q9→quadratus-femoris-oina`; `Q10→obturator-nerve-roots-and-distribution`; `Q11→saphenous-opening`; `Q12→major-lower-limb-nerve-injury-deformities`; `Q13→superior-gemellus-oina`; `Q14→femoral-sheath`; `Q15→femoral-nerve-roots-course-and-distribution` |
| Exam 5 · Q1–Q15 | `Q1→femoral-nerve-roots-course-and-distribution`; `Q2→rectus-femoris-oina`; `Q3→gluteus-maximus-oina`; `Q4→sciatic-foramina-contents`; `Q5→biceps-femoris-oina`; `Q6→obturator-nerve-roots-and-distribution`; `Q7→femoral-sheath`; `Q8→obturator-nerve-roots-and-distribution`; `Q9→obturator-nerve-roots-and-distribution`; `Q10→adductor-magnus-oina`; `Q11→sciatic-foramina-contents`; `Q12→sciatic-foramina-contents`; `Q13→sciatic-foramina-contents` (**exact repeat of E5Q4**); `Q14→sciatic-foramina-contents`; `Q15→piriformis-oina` |

There are **29 source-distinct handles**. The assignment collapse is `75 - 29 = 46` repeated
concept assignments, including the two exact prompt repeats. Fifteen handles already exist in
Family 1; the other fourteen are a net addition to LCS-103.

### Search-before-mint register and semantic dispositions

All 29 handles received four searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root, and the accepted Family-1
LCS ledger. This is **29 × 4 = 116 search invocations**. A glossary-only or narrower mention
does not count as same-scope coverage. `prior LCS` means the Family-2 question attaches to an
already counted LCS-103 handle and creates no cumulative concept delta.

| # | Handle / evidence | Four required queries | Same-idea/same-scope result | Family-2 bucket | Placement if new |
|---:|---|---|---|---|---|
| 1 | `saphenous-opening` · E1Q1, E4Q11 | `saphenous opening`; `fossa ovalis`; `cribriform fascia`; `great saphenous vein opening` | Pending AU-MED-105 concept owns the opening, cribriform fascia and vein passage. | pending | — |
| 2 | `iliotibial-tract` · E1Q2, E2Q1, E4Q7 | `iliotibial tract`; `iliotibial band`; `tensor fascia lata insertion`; `lateral thigh fascia` | A glossary term and a gluteus-maximus insertion sentence do not cover the tract's attachments and classification. | new | MSK/ANA |
| 3 | `hip-flexor-identification` · E1Q3 | `hip flexor muscle`; `thigh flexor`; `psoas major action`; `flexion of hip joint` | No same-scope hit. | new | MSK/ANA |
| 4 | `obturator-nerve-roots-and-distribution` · E1Q4, E2Q5, E3Q10, E4Q6/Q10, E5Q6/Q8/Q9 | `obturator nerve`; `L2 L3 L4 obturator`; `medial thigh cutaneous`; `obturator nerve injury` | Pending Kasr/AU concepts together own L2–4 origin, divisions, medial-compartment motor supply and medial-thigh sensation; extend rather than mint. | pending | — |
| 5 | `adductor-magnus-oina` · E1Q5, E5Q10 | `adductor magnus`; `adductor hiatus`; `hamstring part adductor magnus`; `adductor magnus innervation` | Exact Family-1 handle; inherited live disposition. | prior LCS | — |
| 6 | `femoral-triangle-anatomy` · E1Q6, E2Q6, E3Q3, E4Q3 | `femoral triangle`; `Scarpa triangle`; `femoral triangle boundaries`; `femoral triangle floor` | Pending Kasr article/concept family owns the triangle and its contents; extend it for complete boundary/floor scope. | pending | — |
| 7 | `femoral-sheath` · E1Q7/Q9, E2Q7/Q15, E3Q15, E4Q14, E5Q7 | `femoral sheath`; `femoral canal`; `sheath compartments`; `femoral hernia` | Exact Family-1 handle; inherited pending disposition. | prior LCS | — |
| 8 | `femoral-artery` · E1Q8 | `femoral artery`; `superficial femoral`; `femoral artery branches`; `lower limb artery` | Exact Family-1 handle; inherited new disposition. | prior LCS | — |
| 9 | `adductor-canal` · E1Q10, E2Q8, E3Q4/Q8/Q9/Q12/Q13, E4Q4 | `adductor canal`; `Hunter canal`; `subsartorial canal`; `canal contents` | Exact Family-1 handle; inherited pending disposition. | prior LCS | — |
| 10 | `femoral-nerve-roots-course-and-distribution` · E1Q11, E2Q9, E3Q5, E4Q5/Q15, E5Q1 | `femoral nerve`; `L2 L3 L4 femoral`; `anterior thigh motor nerve`; `femoral nerve injury` | Pending Kasr concept covers origin, thigh course, branches and quadriceps-loss injury; AU adds cutaneous distribution. | pending | — |
| 11 | `gluteus-maximus-oina` · E1Q12, E2Q11, E5Q3 | `gluteus maximus`; `gluteus maximus insertion`; `inferior gluteal nerve`; `powerful hip extension` | Exact Family-1 handle; inherited pending disposition. | prior LCS | — |
| 12 | `gluteus-medius-oina` · E1Q13 | `gluteus medius`; `gluteus medius insertion`; `superior gluteal nerve`; `thigh abduction pelvic stability` | Exact Family-1 handle; inherited new disposition. | prior LCS | — |
| 13 | `sciatic-foramina-contents` · E1Q14, E2Q12, E3Q7, E5Q4/Q11–Q14 | `greater sciatic foramen`; `lesser sciatic foramen`; `sciatic foramina contents`; `piriformis foramen contents` | Exact Family-1 handle; inherited pending disposition. | prior LCS | — |
| 14 | `inferior-gluteal-artery` · E1Q15 | `inferior gluteal artery`; `inferior gluteal vessel`; `sciatic nerve arterial branch`; `internal iliac posterior branch` | No same-scope hit. | new | CVS/ANA |
| 15 | `sartorius-oina` · E2Q2, E3Q1, E4Q1 | `sartorius`; `sartorius origin insertion`; `femoral nerve sartorius`; `femoral triangle boundary` | Exact Family-1 handle; inherited new disposition. | prior LCS | — |
| 16 | `rectus-femoris-oina` · E2Q3, E4Q2, E5Q2 | `rectus femoris`; `rectus femoris origin`; `femoral nerve quadriceps`; `hip flexion knee extension` | Exact Family-1 handle; inherited new disposition. | prior LCS | — |
| 17 | `articularis-genu-oina` · E2Q4 | `articularis genu`; `articularis genus`; `femoral nerve articularis`; `suprapatellar bursa` | Exact Family-1 handle; inherited new disposition. | prior LCS | — |
| 18 | `saphenous-nerve-sensory-territory` · E2Q10 | `saphenous nerve`; `saphenous sensory territory`; `medial malleolus sensation`; `saphenous nerve injury` | Only a glossary label matches; the sensory-loss objective is absent. | new | NEU/ANA |
| 19 | `quadratus-femoris-oina` · E2Q13, E4Q9 | `quadratus femoris`; `quadrate tubercle`; `nerve to quadratus femoris`; `lateral rotation hip` | Pending short-rotator group sentence supplies action only, not the requested insertion/nerve scope. | new | MSK/ANA |
| 20 | `popliteal-artery` · E2Q14 | `popliteal artery`; `genicular branches`; `femoral continuation`; `popliteal fossa artery` | Exact Family-1 handle; inherited pending disposition. | prior LCS | — |
| 21 | `quadriceps-femoris-action` · E3Q2 | `quadriceps femoris`; `quadriceps action`; `knee extension muscle`; `extensor of leg` | Pending Kasr concept explicitly owns quadriceps as the knee extensor. | pending | — |
| 22 | `gluteus-minimus-oina` · E3Q6 | `gluteus minimus`; `gluteus minimus insertion`; `superior gluteal nerve`; `hip abduction medial rotation` | Exact Family-1 handle; inherited new disposition. | prior LCS | — |
| 23 | `obturator-internus-oina` · E3Q11 | `obturator internus`; `obturator internus insertion`; `nerve to obturator internus`; `short lateral rotator hip` | Pending short-rotator group sentence supplies action only, not full muscle scope. | new | MSK/ANA |
| 24 | `gluteal-intramuscular-injection` · E3Q14 | `gluteal intramuscular injection`; `upper outer quadrant gluteal`; `safe gluteal injection site`; `sciatic nerve injection injury` | No same-scope hit. | new | MSK/ANA |
| 25 | `superior-gluteal-artery` · E4Q8 | `superior gluteal artery`; `superior gluteal vessel`; `internal iliac posterior division`; `gluteal artery origin` | No same-scope hit. | new | CVS/ANA |
| 26 | `major-lower-limb-nerve-injury-deformities` · E4Q12 | `superior gluteal nerve`; `tensor fascia lata nerve`; `gluteus medius minimus nerve`; `superior gluteal nerve injury` | Exact Family-1 composite handle; its superior-gluteal injury component absorbs the tested motor distribution. Inherited new disposition. | prior LCS | — |
| 27 | `superior-gemellus-oina` · E4Q13 | `superior gemellus`; `gemellus superior`; `nerve to obturator internus`; `superior gemellus innervation` | No same-scope hit. | new | MSK/ANA |
| 28 | `biceps-femoris-oina` · E5Q5 | `biceps femoris`; `biceps femoris insertion`; `common fibular biceps`; `short head biceps innervation` | Exact Family-1 handle; inherited new disposition. | prior LCS | — |
| 29 | `piriformis-oina` · E5Q15 | `piriformis`; `piriformis insertion`; `nerve to piriformis`; `piriformis roots S1 S2` | Exact Family-1 handle; inherited new disposition. | prior LCS | — |

### Family-2 checkpoint and cumulative LCS-103 delta

| Bucket | Source-distinct handles | Live | Pending | New |
|---|---:|---:|---:|---:|
| Reused Family-1 LCS handles | 15 | 1 | 5 | 9 |
| New-to-LCS handles from Family 2 | 14 | 0 | 5 | 9 |
| **Family-2 tested handles** | **29** | **1** | **10** | **18** |

Only new-to-LCS handles change the module total. Net delta is therefore **+75 observed MCQ
records, +75 printed keys, +14 distinct concepts = +0 live, +5 pending, +9 new**.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Family 1 baseline | 77 | 0 | 59 | 4 | 11 | 44 |
| Family 2 net delta | +75 | +75 | +14 | +0 | +5 | +9 |
| **LCS-103 cumulative after Family 2** | **152** | **75** | **73** | **4** | **16** | **53** |

Arithmetic checks: `15 prior + 14 new-to-LCS = 29`; `0 + 5 + 9 = 14`; `59 + 14 = 73`;
`4 + 16 + 53 = 73`; `77 + 75 = 152`; `0 + 75 = 75`. The cumulative question total is
observed source occurrences; collapsing the two exact repeats yields `152 - 2 = 150` unique
prompt forms across these two families because Family 1 had no exact repeated prompt.

## Family 3 — physiology previous-exam scan excerpts

### Source identity and read method

| Field | Verified value |
|---|---|
| Manifest source | `src_414df0f15610aa4232f0` |
| Manifest SHA-256 | `414df0f15610aa4232f058ba5e2c9fae747cbecc9ecbbf210f2f2a45a0c47cde` |
| Recomputed SHA-256 | `414df0f15610aa4232f058ba5e2c9fae747cbecc9ecbbf210f2f2a45a0c47cde` |
| File | `physio previous exams.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Physiology/Assessments/Exams/physio previous exams.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Physiology · Assessments/Exams |
| Container | four unencrypted A4 PDF pages; each page is a cropped scan with a CamScanner watermark |
| Text-layer finding | `pdftotext -layout` returns only the four CamScanner watermarks; the assessment content is image-only despite the manifest's native-text flag |
| Read method | all four pages rendered at 220 dpi and read visually, source-first |

These are four cropped excerpts, not four complete exam sheets. The source shows sporadic
diagonal ticks, circles and underlines in pencil/pen on some questions and options. They are
non-typeset annotations, do not appear for every row and are not accompanied by an answer
table or printed solution legend. Consequently **zero printed keys** are recovered; no mark is
promoted to a key and no answer is inferred from physiology knowledge.

### Exact prompt inventory

| Physical page | Visible numbered evidence | Complete MCQs | Truncated numbered stems | Printed keys |
|---:|---|---:|---:|---:|
| 1 | Q26 neuromuscular transmission; Q27 skeletal excitation–contraction coupling; Q28 repolarisation | 3 | 0 | 0 |
| 2 | Model A Q23 protein shared by smooth/striated muscle; Q24 visceral smooth muscle; Q25 phase-[4] diagram stem | 2 | 1 | 0 |
| 3 | Q18 miniature end-plate potential; Q19 resting membrane potential; Q20 nerve action potential; Q21 myasthenia drug mechanism; Q22 skeletal excitation–contraction coupling | 5 | 0 | 0 |
| 4 | Q15 curare at the neuromuscular junction; Q16 sodium-conductance event; Q17 skeletal excitation–contraction coupling; Q18 enzyme opposing smooth-muscle contraction; Q19 cross-muscle property | 5 | 0 | 0 |
| **Family 3** |  | **15** | **1** | **0** |

Arithmetic: `3 + 3 + 5 + 5 = 16` observed numbered prompt records, of which `15` are
complete MCQs and `1` is a truncated stem. Page 2 Q25 reads “In the diagram below, which
statement is true about phase [4]?” but the diagram and complete option set fall outside that
crop. An orphan option-`d` tail above page 1 Q26 may continue Q25, but it does not make the
item answerable. Q25 remains an observed prompt record and unresolved evidence debt, not a
mintable concept. The orphan fragments above page 1 Q26 and page 3 Q18 are not separately
numbered prompts and are not counted. The source has no exact repeated prompt; reused numbers
on different scan excerpts carry different stems.

Source defects are retained rather than repaired: page 1 Q28 option `d` ends “appearance of
response”; page 3 Q22 prints the length threshold as `2.2μ`; page 4 Q19 begins with the
grammatically incomplete “A property shared by:”; and page 2 Q25 lacks its defining figure
and choices. The ledger records only what is visible.

### Prompt-to-handle assignment ledger

Every numbered prompt occurrence is assigned exactly once. `unresolved-phase-4-diagram` is
an evidence handle only; it is excluded from tested-concept arithmetic until its missing
diagram/options are recovered from another authorised local source.

| Evidence | One-to-one assignments in source order |
|---|---|
| Physical p. 1 · Q26–Q28 | `Q26→neuromuscular-junction-transmission`; `Q27→skeletal-muscle-excitation-contraction-coupling`; `Q28→nerve-action-potential` |
| Physical p. 2 · Q23–Q25 | `Q23→muscle-type-physiology-comparison`; `Q24→visceral-smooth-muscle-properties`; `Q25→unresolved-phase-4-diagram` |
| Physical p. 3 · Q18–Q22 | `Q18→miniature-endplate-potential`; `Q19→resting-membrane-potential`; `Q20→nerve-action-potential`; `Q21→neuromuscular-junction-transmission`; `Q22→skeletal-muscle-excitation-contraction-coupling` |
| Physical p. 4 · Q15–Q19 | `Q15→neuromuscular-junction-transmission`; `Q16→membrane-sodium-conductance-events`; `Q17→skeletal-muscle-excitation-contraction-coupling`; `Q18→smooth-muscle-contraction-regulation`; `Q19→muscle-type-physiology-comparison` |

The 15 complete prompts collapse to **9 resolved tested-concept handles**: three
neuromuscular-junction prompts collapse to one, three skeletal coupling prompts to one, two
nerve-action-potential prompts to one, and two muscle-comparison prompts to one. That is
`15 - 9 = 6` repeated concept assignments. Adding the one unresolved evidence handle gives
`9 + 1 = 10` source handles for all 16 numbered records.

### Search-before-mint register and semantic dispositions

All ten handles received four required searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root, and the accepted prior-LCS
ledger: **10 × 4 = 40 required invocations**. Fifteen follow-ups (`T-tubules`,
`sarcoplasmic reticulum`, `troponin C`, `cross-bridge`, `smooth muscle`, `single-unit`,
`gap junction`, `calmodulin`, `miniature end-plate`, `end-plate potential`, `Na+`,
`myosin light-chain kinase`, `MLCK`, `myosin phosphatase`, `Rho-kinase`) resolved punctuation
and hyphen variants, for **55 invocations total**. There is no prior-LCS physiology handle in
Families 1–2; all nine resolved handles are new to LCS-103 but already pending elsewhere.

| # | Handle / evidence | Four required queries | Same-idea/same-scope result | Disposition | Placement if new |
|---:|---|---|---|---|---|
| 1 | `neuromuscular-junction-transmission` · p1Q26, p3Q21, p4Q15 | `neuromuscular junction`; `neuromuscular transmission`; `curare acetylcholine`; `acetylcholinesterase myasthenia` | Pending Kasr concepts/articles own the presynaptic-calcium → acetylcholine → end-plate → acetylcholinesterase sequence, transmission properties and drug classes. | pending | — |
| 2 | `skeletal-muscle-excitation-contraction-coupling` · p1Q27, p3Q22, p4Q17 | `excitation contraction coupling`; `skeletal muscle calcium coupling`; `T tubule calcium release`; `troponin tropomyosin cross bridge` | Hyphen-aware follow-ups find the pending Kasr coupling article and concept: T-tubule depolarisation, SR calcium, troponin C, tropomyosin and ATP-dependent cross-bridge cycling. | pending | — |
| 3 | `nerve-action-potential` · p1Q28, p3Q20 | `nerve action potential`; `action potential repolarization`; `sodium activation potassium channel`; `absolute refractory period` | Pending Kasr article/concepts own the ionic phases, repolarisation and absolute refractory period. | pending | — |
| 4 | `muscle-type-physiology-comparison` · p2Q23, p4Q19 | `skeletal smooth muscle comparison`; `cardiac smooth skeletal muscle`; `muscle type shared properties`; `actin smooth striated` | Pending Kasr skeletal/cardiac/smooth comparison record can absorb the shared-protein and shared-property prompts. | pending | — |
| 5 | `visceral-smooth-muscle-properties` · p2Q24 | `visceral smooth muscle`; `single unit smooth muscle`; `smooth muscle gap junctions`; `smooth muscle stretch contraction` | Pending Kasr smooth-muscle article owns single-unit syncytial spread, gap junctions, stretch response and slow-wave behaviour. | pending | — |
| 6 | `unresolved-phase-4-diagram` · p2Q25 | `which statement is true about phase 4`; `diagram phase 4`; `phase four physiology`; `action potential phase 4` | No same-scope hit, but the missing diagram/options prevent semantic identification. This is not safe to mint or place. | unresolved | — |
| 7 | `miniature-endplate-potential` · p3Q18 | `miniature endplate potential`; `miniature end plate potential`; `spontaneous acetylcholine quantum`; `single receptor ion channel endplate` | Hyphen-aware follow-up finds the pending Kasr concept defining the spontaneous depolarisation from one acetylcholine vesicle at rest. | pending | — |
| 8 | `resting-membrane-potential` · p3Q19 | `resting membrane potential`; `nerve resting potential`; `selective sodium potassium permeability`; `membrane potential excitability` | Pending Kasr/AU concepts own definition and selective-ion-permeability mechanism; the one live diffusion fact is narrower. | pending | — |
| 9 | `membrane-sodium-conductance-events` · p4Q16 | `sodium conductance`; `sodium permeability membrane`; `end plate potential sodium`; `sodium conductance action potential` | Pending Kasr nerve-action-potential and neuromuscular-transmission material owns sodium influx and the cationic end-plate potential; extend the comparison rather than mint. | pending | — |
| 10 | `smooth-muscle-contraction-regulation` · p4Q18 | `smooth muscle contraction regulation`; `myosin phosphatase smooth muscle`; `myosin light chain kinase`; `Rho kinase smooth muscle` | Pending Kasr smooth-muscle article explicitly gives calcium–calmodulin–MLCK activation and myosin-phosphatase dephosphorylation/relaxation. | pending | — |

### Family-3 checkpoint and cumulative LCS-103 delta

| Family-3 bucket | Resolved tested concepts | Live | Pending | New | Unresolved evidence handles |
|---|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 0 | 0 | 0 | 0 | 0 |
| New-to-LCS resolved handles | 9 | 0 | 9 | 0 | 0 |
| Cropped evidence not semantically placeable | 0 | 0 | 0 | 0 | 1 |
| **Family 3** | **9** | **0** | **9** | **0** | **1** |

Net module delta is **+16 observed prompt records, +0 printed keys, +9 resolved distinct
concepts = +0 live, +9 pending, +0 new**, plus one unresolved crop handle that does not enter
concept totals.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 2 | 152 | 75 | 73 | 4 | 16 | 53 |
| Family 3 net delta | +16 | +0 | +9 | +0 | +9 | +0 |
| **LCS-103 cumulative after Family 3** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `9 pending + 1 unresolved = 10` source handles; `15 complete - 6 repeated
concept assignments = 9` resolved concepts; `73 + 9 = 82`; `4 + 25 + 53 = 82`;
`152 + 16 = 168`; `75 + 0 = 75`. Because Family 3 has no exact repeated prompt, the
cross-family unique-form count becomes `150 + 16 = 166`, including the one truncated form.

## Family 4 — first Anatomy quiz-content note image

### Source identity and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_773a3d8e00f38cedff12` |
| Manifest SHA-256 | `773a3d8e00f38cedff12ae381767e93e6e1cb7f06e92ec0bbdcae11ca44f29cc` |
| Recomputed SHA-256 | `773a3d8e00f38cedff12ae381767e93e6e1cb7f06e92ec0bbdcae11ca44f29cc` |
| File | `Most important notes anatomy (Quiz content).jpg` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Anatomy/Assessments/Quizzes/Most important notes anatomy (Quiz content).jpg` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Anatomy · Assessments/Quizzes |
| Container | one 1920 × 2560 JPEG photograph of a ruled spiral-notebook page |
| Read method | original-resolution visual read, with local OCR used only as a transcription cross-check |

The page is headed in handwriting with Arabic “quiz exams,” then `1) Anatomy` and
`A) Anterior Compartment of Thigh`. It is a handwritten study-note page, not an exam sheet:
there are no interrogative stems, answer choices, blank answer spaces, response marks or
question/key layout. The arrows join anatomy subjects to facts rather than joining questions
to answers. Therefore this source contributes **zero complete prompts, zero incomplete
prompts and zero printed or handwritten answer keys**. Its five numbered statements are kept
as auxiliary quiz-content evidence and are not counted as tested concepts.

### Exact note-statement inventory

| Note | Visible handwritten statement | Prompt status | Key status |
|---:|---|---|---|
| N1 | `Deep fascia of thigh → fascia lata` | note, not a prompt | none |
| N2 | `Psoas major → anterior rami (L1–3)`; a word before `Psoas` is scribbled out but the surviving statement is complete | note, not a prompt | none |
| N3 | `Rectus femoris → assist flexion of hip` | note, not a prompt | none |
| N4 | `Vastus medialis & lateralis → keep patella in its position` | note, not a prompt | none |
| N5 | `Boundaries of femoral ring`, with posterior `pectineal ligament`, medial `lacunar ligament`, lateral `femoral vein`, and anterior `inguinal ligament` around a ring sketch | note, not a prompt | none |
| **Family 4** | **5 complete numbered note statements** | **0 complete / 0 incomplete prompts** | **0** |

There is no exact repeated statement and no within-source semantic collapse: five note
statements map one-to-one to five coverage handles. Four handles already occur in the LCS
assessment ledger. N2 is the only new-to-LCS coverage candidate, but a note-only candidate
does not change tested-concept or live/pending/new totals.

### Statement-to-handle assignment and search ledger

All five handles received four searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root, and the accepted prior-LCS
ledger: **5 × 4 = 20 invocations**.

| # | Statement assignment | Four required queries | Same-idea/same-scope result | Evidence disposition | Placement only if later promoted by assessment evidence |
|---:|---|---|---|---|---|
| 1 | `N1→iliotibial-tract` | `fascia lata`; `deep fascia thigh`; `iliotibial tract fascia`; `thigh deep fascia` | Family-2 `iliotibial-tract` can absorb fascia lata as the deep fascia whose lateral thickening forms the tract. External hits are glossary-only. | prior LCS (inherited new) | — |
| 2 | `N2→psoas-major-oina` | `psoas major`; `psoas innervation`; `anterior rami L1 L3`; `lumbar plexus psoas` | The prior `hip-flexor-identification` handle covers action only; the sole live hit is an unrelated testicular-artery course. No same-scope innervation record exists. | note-only candidate; external new | MSK/ANA |
| 3 | `N3→rectus-femoris-oina` | `rectus femoris`; `rectus femoris origin`; `femoral nerve quadriceps`; `hip flexion knee extension` | Exact Family-1/2 LCS handle; no new concept. | prior LCS (inherited new) | — |
| 4 | `N4→quadriceps-femoris-action` | `vastus medialis patella`; `vastus lateralis patella`; `patellar stabilization quadriceps`; `patellar tracking muscles` | Family-3 quadriceps action handle can absorb medial/lateral patellar stabilisation; no separate same-scope external record was found. | prior LCS (inherited pending) | — |
| 5 | `N5→femoral-sheath` | `femoral ring boundaries`; `femoral ring`; `lacunar pectineal ligament`; `femoral canal ring` | Family-1/2 sheath/canal handle already owns the femoral ring scope; pending AU material also names the ring as the canal's upper opening. | prior LCS (inherited pending) | — |

### Family-4 checkpoint and cumulative LCS-103 delta

| Family-4 evidence bucket | Numbered note statements | Coverage handles | Live | Pending | New |
|---|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 4 | 4 | 0 | 2 | 2 |
| New-to-LCS note-only candidate | 1 | 1 | 0 | 0 | 1 |
| **Family 4 auxiliary evidence** | **5** | **5** | **0** | **2** | **3** |

These are evidence-bucket dispositions, not a module concept delta. The assessment-led module
delta is **+0 observed prompts, +0 printed keys, +0 resolved tested concepts**. The separate
auxiliary-note count is now five statements.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 3 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 4 assessment delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 4** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `4 prior + 1 note-only = 5` statement assignments; `0 + 2 + 3 = 5`
evidence dispositions; module arithmetic remains `4 + 25 + 53 = 82`. Family 3's one
unresolved phase-4 crop handle also remains outside these tested-concept totals.

## Family 5 — second Anatomy quiz-content note image

### Source identity and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_2da654a75a9d236de8a7` |
| Manifest SHA-256 | `2da654a75a9d236de8a75af2a47c33a56a32bb94856faed3bd194fe6ed130f48` |
| Recomputed SHA-256 | `2da654a75a9d236de8a75af2a47c33a56a32bb94856faed3bd194fe6ed130f48` |
| File | `Most important notes anatomy (Quiz content)2.jpg` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Anatomy/Assessments/Quizzes/Most important notes anatomy (Quiz content)2.jpg` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Anatomy · Assessments/Quizzes |
| Container | one 1920 × 2560 progressive JPEG photograph of a ruled spiral-notebook page |
| Read method | original-resolution visual read, source-first |

This is another entirely handwritten study-note page, not an assessment sheet. Two numbered
statements continue the preceding anterior-thigh section and seven more sit under the heading
`B) Medial Compartement of Thigh` (spelling preserved). There are no interrogative stems,
choices, blanks, response marks, typeset solutions or answer-key layout. Consequently the
page contributes **zero complete prompts, zero incomplete prompts and zero printed or
handwritten answer keys**. The nine complete numbered statements are retained only as
auxiliary quiz-content evidence.

### Exact note-statement inventory

| Visible section / note | Handwritten statement, transcribed source-first | Prompt status | Key status |
|---|---|---|---|
| preceding section · N6 | `Varicose Veins (Great Saphenous) graft for Cardiac Surgeries` | note, not a prompt | none |
| preceding section · N7 | `Femoral Nerve → Terminate 1 inch (4 cm) below inguinal ligament` | complete but apparently malformed note, not a prompt | none |
| medial compartment · N1 | `layers`: anterior → `Pectineus`, `Adductor longus`; middle → `Adductor Brevis`; posterior → `Adductor Magnus` | note, not a prompt | none |
| medial compartment · N2 | `Most Medial → Gracilis (Extend below knee)` | note, not a prompt | none |
| medial compartment · N3 | `Pectineus Has dual Nerve Supply → Femoral Nerve`, `Accessory Obturator` | note, not a prompt | none |
| medial compartment · N4 | `Obturator Externus → lateral Rotation (Hip)` | note, not a prompt | none |
| medial compartment · N5 | `Ischial Part of Adductor Magnus → Extension (Hip)` | note, not a prompt | none |
| medial compartment · N6 | `Gracilis → Flexion (Thigh & knee)`, `Medial Rotation (knee)` | note, not a prompt | none |
| medial compartment · N7 | `Boundaries of Adductor Canal`: floor → `Adductor longus & Magnus`; roof → `Sartorius & Deep fascia`; anterolateral → `Vastus Medialis` | note, not a prompt | none |
| **Family 5** | **9 complete numbered note statements** | **0 complete / 0 incomplete prompts** | **0** |

The preceding-section N7 statement is fully visible, but it says `Femoral Nerve` where its
`4 cm below the inguinal ligament` wording resembles descriptions elsewhere of the femoral
sheath. The
ledger neither corrects the noun nor merges the statement into `femoral-sheath`; it preserves
an `as-written` unresolved handle. There is no exact repeated statement. The two gracilis
statements ask for different attributes but collapse to the one prior `gracilis-oina`
coverage handle, so nine statement assignments yield eight source-distinct handles.

### Statement-to-handle assignment and search ledger

All eight handles received four searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root and the accepted prior-LCS
ledger: **8 × 4 = 32 required invocations**.

| # | Statement assignment | Four required queries | Same-idea/same-scope result | Evidence disposition | Placement only if later promoted by assessment evidence |
|---:|---|---|---|---|---|
| 1 | `preceding N6→great-saphenous-vein` | `great saphenous vein`; `long saphenous vein`; `saphenous vein graft`; `coronary bypass conduit` | Exact prior-LCS handle. Pending Kasr material already includes varicose-vein mechanism and great-saphenous harvest for coronary bypass. | prior LCS (inherited pending) | — |
| 2 | `preceding N7→as-written-femoral-nerve-termination` | `femoral nerve terminates`; `termination of femoral nerve`; `femoral nerve below inguinal ligament`; `femoral nerve 4 cm` | No same-wording result. Pending sheath records describe the upper `3–4 cm` below the ligament, but the source explicitly names the nerve; silent repair would change the evidence. | unresolved malformed auxiliary handle | — |
| 3 | `medial N1→medial-thigh-compartment-layers` | `medial compartment thigh layers`; `adductor compartment layers`; `pectineus adductor longus anterior layer`; `adductor brevis middle layer` | General medial-compartment material names the muscles but no live or pending record owns this exact anterior/middle/posterior layer arrangement. | note-only candidate; external new | MSK/ANA |
| 4 | `medial N2→gracilis-oina` | `gracilis`; `gracilis insertion`; `gracilis below knee`; `gracilis flexion medial rotation` | Exact Family-1 handle; external group mentions remain narrower than the muscle's combined position, insertion and actions. | prior LCS (inherited new) | — |
| 5 | `medial N3→pectineus-innervation` | `pectineus innervation`; `pectineus nerve supply`; `femoral nerve pectineus`; `accessory obturator pectineus` | Femoral- and obturator-nerve overviews mention pectineus separately, but no same-scope record owns the handwritten dual-supply claim including accessory obturator. | note-only candidate; external new | MSK/ANA |
| 6 | `medial N4→obturator-externus-action` | `obturator externus`; `external obturator muscle`; `lateral rotation hip`; `short lateral rotators hip` | Pending Kasr hip-movement record includes obturator externus among the short lateral rotators and can absorb this action statement. | note-only candidate; external pending | — |
| 7 | `medial N5→adductor-magnus-oina` | `adductor magnus`; `hamstring part adductor magnus`; `ischial part adductor magnus`; `hip extension adductor magnus` | Exact prior Family-1 handle, whose live attachment/action records already own the muscle and can absorb the ischial-part action. | prior LCS (inherited live) | — |
| 8 | `medial N6→gracilis-oina` | same four queries as assignment 4; one handle is searched once, not double-counted | Second statement assignment to the same Family-1 handle; this is the source's one explicit semantic collapse, not an exact repeat. | prior LCS (inherited new) | — |
| 9 | `medial N7→adductor-canal` | `adductor canal boundaries`; `subsartorial canal walls`; `Hunter canal boundaries`; `sartorius vastus medialis adductor longus magnus` | Exact Family-1 handle. The pending Kasr record owns the three walls and distinguishes the fibrous roof from the covering sartorius. | prior LCS (inherited pending) | — |

### Family-5 checkpoint and cumulative LCS-103 delta

| Family-5 evidence bucket | Numbered note assignments | Source-distinct handles | Live | Pending | New | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 5 | 4 | 1 | 2 | 1 | 0 |
| New-to-LCS resolved note-only candidates | 3 | 3 | 0 | 1 | 2 | 0 |
| As-written malformed auxiliary evidence | 1 | 1 | 0 | 0 | 0 | 1 |
| **Family 5 auxiliary evidence** | **9** | **8** | **1** | **3** | **3** | **1** |

These are auxiliary evidence dispositions, not a tested-concept delta. The assessment-led
module delta is **+0 observed prompts, +0 printed keys and +0 resolved tested concepts**.
Across Families 4–5, the separate auxiliary-note count is now `5 + 9 = 14` statements.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 4 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 5 assessment delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 5** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `5 prior assignments + 3 resolved note-only assignments + 1 malformed
assignment = 9`; one within-source gracilis collapse gives `9 - 1 = 8` handles;
`1 live + 3 pending + 3 new + 1 unresolved = 8`. Module arithmetic remains
`4 + 25 + 53 = 82`. Family 3's unresolved phase-4 crop and this Family-5 malformed note
remain outside tested-concept totals.

## Family 6 — third Anatomy quiz-content note image

### Source identity and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_9b509a75a7e648219f37` |
| Manifest SHA-256 | `9b509a75a7e648219f37b44c85b774a360e5e6abfbde29696d9582eff8caedbf` |
| Recomputed SHA-256 | `9b509a75a7e648219f37b44c85b774a360e5e6abfbde29696d9582eff8caedbf` |
| File | `Most important notes anatomy (Quiz content)3.jpg` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Anatomy/Assessments/Quizzes/Most important notes anatomy (Quiz content)3.jpg` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Anatomy · Assessments/Quizzes |
| Container | one 1920 × 2560 progressive JPEG photograph of a ruled spiral-notebook page |
| Read method | original-resolution visual read, source-first |

This page continues the same handwritten medial-thigh study notes. It contains four complete
numbered statements, N8–N11, plus an unnumbered alias bubble. It has no interrogative stem,
answer choices, blank response area, response mark, typeset solution or answer-key layout.
It therefore contributes **zero complete prompts, zero incomplete prompts and zero printed
or handwritten answer keys**. The four numbered statements remain auxiliary evidence only;
the alias bubble is attached to N8 rather than inflated into a fifth statement.

### Exact note-statement inventory

| Note | Visible handwritten statement | Prompt status | Key status |
|---:|---|---|---|
| N8 | `Content of Adductor Canal`: `Femoral Artery & Vein`; `Descending Genicular Artery`; `Saphenous Nerve`; `Nerve to Vastus Medialis`. Unnumbered bubble: `Adductor Canal = Subsartorial Canal = Hunter's Canal`. | note, not a prompt | none |
| N9 | `Obturator Nerve → Originate from Posterior Abdominal Wall` | broad wording preserved; note, not a prompt | none |
| N10 | `Adductor Brevis → Take Supply from Posterior & Anterior Branches of Obturator` | `nerve` is not repeated after `Obturator`; intelligible note, not repaired | none |
| N11 | `Obturator Artery → Originate from Pelvic Cavity` | broad wording preserved; note, not a prompt | none |
| **Family 6** | **4 complete numbered note statements plus one attached alias annotation** | **0 complete / 0 incomplete prompts** | **0** |

There is no exact repeated statement. N9 and N10 are different statements but collapse to
one coverage handle because the existing obturator-nerve origin/course/branches concept owns
both the nerve's origin and its division-specific supply to adductor brevis. Thus four
statement assignments yield three source-distinct handles.

### Statement-to-handle assignment and search ledger

All three handles received four required searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root and the accepted prior-LCS
ledger: **3 × 4 = 12 required invocations**. Three broad-token follow-ups (`obturator nerve`,
`adductor brevis`, `obturator artery`) resolved phrase-order misses, for **15 invocations
total**.

| # | Statement assignment | Four required queries | Same-idea/same-scope result | Evidence disposition | Placement only if later promoted by assessment evidence |
|---:|---|---|---|---|---|
| 1 | `N8→adductor-canal` | `adductor canal contents`; `subsartorial canal contents`; `Hunter canal contents`; `femoral vessels saphenous nerve nerve to vastus medialis` | Exact prior Family-1/5 handle. Pending Kasr concept owns the three aliases and the four principal contents. The note additionally names the descending genicular artery, which can be retained as source wording without minting a second canal concept. | prior LCS (inherited pending) | — |
| 2 | `N9→obturator-nerve-origin-course-branches` | `obturator nerve origin`; `lumbar plexus obturator nerve`; `anterior posterior obturator branches`; `both divisions obturator nerve adductor brevis` | Pending Kasr concept owns origin from the posterior abdominal-wall lumbar plexus, course and division-specific branches. | note-only candidate; external pending | — |
| 3 | `N10→obturator-nerve-origin-course-branches` | same four queries as assignment 2; one collapsed handle is searched once | The same pending record explicitly states that adductor brevis receives branches from both anterior and posterior divisions. | note-only candidate; external pending | — |
| 4 | `N11→obturator-artery-origin-course` | `obturator artery origin`; `obturator artery pelvic cavity`; `internal iliac obturator artery`; `anterior division internal iliac obturator` | Pending Kasr obturator nerve/artery article owns the artery's pelvic origin from the anterior division of the internal iliac artery and its course through the obturator canal. | note-only candidate; external pending | — |

### Family-6 checkpoint and cumulative LCS-103 delta

| Family-6 evidence bucket | Numbered note assignments | Source-distinct handles | Live | Pending | New | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 1 | 1 | 0 | 1 | 0 | 0 |
| New-to-LCS resolved note-only candidates | 3 | 2 | 0 | 2 | 0 | 0 |
| **Family 6 auxiliary evidence** | **4** | **3** | **0** | **3** | **0** | **0** |

These are auxiliary evidence dispositions, not a tested-concept delta. The assessment-led
module delta is **+0 observed prompts, +0 printed keys and +0 resolved tested concepts**.
Across Families 4–6, the separate auxiliary-note count is now `5 + 9 + 4 = 18` numbered
statements; the unnumbered N8 alias bubble is not added to that count.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 5 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 6 assessment delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 6** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `1 prior assignment + 3 new-to-LCS assignments = 4`; one semantic
collapse gives `4 - 1 = 3` handles; all three handles are pending. Module arithmetic remains
`4 + 25 + 53 = 82`. Family 3's unresolved phase-4 crop and Family 5's malformed auxiliary
handle remain outside tested-concept totals; Family 6 adds no unresolved handle.

## Family 7 — fourth Anatomy quiz-content note image

### Source identity and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_5bb02d6293fb60233949` |
| Manifest SHA-256 | `5bb02d6293fb602339498e26592f10f6a7c476fa6ed5a304c9cbf93d7b4dd8d0` |
| Recomputed SHA-256 | `5bb02d6293fb602339498e26592f10f6a7c476fa6ed5a304c9cbf93d7b4dd8d0` |
| File | `Most important notes anatomy (Quiz content)4.jpg` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Anatomy/Assessments/Quizzes/Most important notes anatomy (Quiz content)4.jpg` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Anatomy · Assessments/Quizzes |
| Container | one 1920 × 2560 progressive JPEG photograph of a ruled spiral-notebook page |
| Read method | original-resolution visual read, source-first |

The page is headed `C) Gluteal Region` and contains seven entirely handwritten numbered
study-note statements. It has no interrogative stem, choices, blank response area, typeset
solution or answer-key layout. The handwritten asterisk beside N5 is an emphasis mark beside
a note, not a response or key. Therefore the source contributes **zero complete prompts,
zero incomplete prompts and zero printed or handwritten answer keys**. All seven numbered
statements are auxiliary evidence only.

### Exact note-statement inventory

| Note | Visible handwritten statement | Prompt status | Key status |
|---:|---|---|---|
| N1 | `Gluteus Medius & Minimus → Prevent Pelvic Drop → Known By Trendelenberg Test` | source spelling preserved; note, not a prompt | none |
| N2 | `Most Superior Deep → Piriformis` | note, not a prompt | none |
| N3 | `Most Inferior Deep → Quadratus Femoris` | note, not a prompt | none |
| N4 | `Nerve to Piriformis → (S1 & S2)` | note, not a prompt | none |
| N5 | `Pudendal Nerve & Vessels → Pass from GSF & LSF`; a handwritten asterisk follows | shorthand preserved; note, not a prompt | emphasis only, not a key |
| N6 | `Nerves of [one word scribbled out] Gluteal Region → Originate from Pelvis (Sacral Plexus)` | surviving statement is complete; crossed-out text is not reconstructed | none |
| N7 | `Posterior Cutaneous Nerve of thigh → Medial to Sciatic Nerve` | note, not a prompt | none |
| **Family 7** | **7 complete numbered note statements** | **0 complete / 0 incomplete prompts** | **0** |

There is no exact repeated statement. N2 and N4 provide position and root value for the same
piriformis coverage concept and collapse to the prior `piriformis-oina` handle. The other
five statements remain separate, so seven statement assignments yield six source-distinct
handles.

### Statement-to-handle assignment and search ledger

All six handles received four required searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root and the accepted prior-LCS
ledger: **6 × 4 = 24 required invocations**. Four broad-token follow-ups (`Trendelenburg`,
`pudendal nerve`, `sacral plexus`, `posterior cutaneous nerve`) resolved phrase-order and
hyphen variation, for **28 invocations total**.

| # | Statement assignment | Four required queries | Same-idea/same-scope result | Evidence disposition | Placement only if later promoted by assessment evidence |
|---:|---|---|---|---|---|
| 1 | `N1→gluteus-medius-minimus-pelvic-stability` | `gluteus medius minimus pelvic stability`; `prevent pelvic drop`; `Trendelenburg test abductors`; `superior gluteal nerve pelvic drop` | Pending Alexandria concept owns the paired muscles' pelvic stabilisation and Trendelenburg mechanism. The two prior individual OINA handles do not absorb this combined clinical mechanism one-to-one. | note-only candidate; external pending | — |
| 2 | `N2→piriformis-oina` | `piriformis muscle`; `piriformis most superior deep`; `nerve to piriformis`; `piriformis S1 S2` | Exact Family-1/2 handle; its prior disposition remains new. | prior LCS (inherited new) | — |
| 3 | `N3→quadratus-femoris-oina` | `quadratus femoris`; `quadratus femoris most inferior`; `nerve to quadratus femoris`; `deep gluteal muscles order` | Exact Family-2 handle; external short-rotator material still lacks the full muscle scope, so its prior disposition remains new. | prior LCS (inherited new) | — |
| 4 | `N4→piriformis-oina` | same four queries as assignment 2; one collapsed handle is searched once | Second assignment to the same prior muscle handle; N2 and N4 are not exact repeats. | prior LCS (inherited new) | — |
| 5 | `N5→sciatic-foramina-contents` | `pudendal nerve greater sciatic foramen`; `pudendal vessels lesser sciatic foramen`; `GSF LSF pudendal`; `pudendal nerve exits reenters pelvis` | Exact prior Family-1/2 handle. Pending Alexandria material owns passage of pudendal nerve and internal pudendal vessels through both foramina. | prior LCS (inherited pending) | — |
| 6 | `N6→gluteal-region-nerves-sacral-plexus` | `gluteal region nerves sacral plexus`; `nerves of gluteal region`; `sacral plexus gluteal nerves`; `pelvic origin gluteal nerves` | Pending records cover individual sacral-plexus nerves, not this source's collective origin statement for the region. | note-only candidate; external new | NEU/ANA |
| 7 | `N7→posterior-cutaneous-nerve-thigh-course` | `posterior cutaneous nerve of thigh`; `posterior femoral cutaneous nerve`; `medial to sciatic nerve`; `posterior thigh nerve relation sciatic` | Pending articles mention the nerve's territory and a superficial relation to the sciatic nerve, but no same-scope concept owns the handwritten medial relation. | note-only candidate; external new | NEU/ANA |

### Family-7 checkpoint and cumulative LCS-103 delta

| Family-7 evidence bucket | Numbered note assignments | Source-distinct handles | Live | Pending | New | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 4 | 3 | 0 | 1 | 2 | 0 |
| New-to-LCS resolved note-only candidates | 3 | 3 | 0 | 1 | 2 | 0 |
| **Family 7 auxiliary evidence** | **7** | **6** | **0** | **2** | **4** | **0** |

These are auxiliary evidence dispositions, not a tested-concept delta. The assessment-led
module delta is **+0 observed prompts, +0 printed keys and +0 resolved tested concepts**.
Across Families 4–7, the separate auxiliary-note count is now `5 + 9 + 4 + 7 = 25`
numbered statements.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 6 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 7 assessment delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 7** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `4 prior assignments + 3 new-to-LCS assignments = 7`; one piriformis
collapse gives `7 - 1 = 6` handles; `0 live + 2 pending + 4 new + 0 unresolved = 6`.
Module arithmetic remains `4 + 25 + 53 = 82`. Family 3's unresolved phase-4 crop and Family
5's malformed auxiliary handle remain outside tested-concept totals; Family 7 adds no
unresolved handle.

## Family 8 — fifth and final Anatomy quiz-content note image

### Source identity and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_086eb3c89677239baa74` |
| Manifest SHA-256 | `086eb3c89677239baa743d3720429c23f87b168f24074acbb056076adba25248` |
| Recomputed SHA-256 | `086eb3c89677239baa743d3720429c23f87b168f24074acbb056076adba25248` |
| File | `Most important notes anatomy (Quiz content)5.jpg` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Anatomy/Assessments/Quizzes/Most important notes anatomy (Quiz content)5.jpg` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Anatomy · Assessments/Quizzes |
| Container | one 1920 × 2560 progressive JPEG photograph of a ruled spiral-notebook page |
| Read method | original-resolution visual read, source-first |

The page is headed `D) Posterior Compartment of Thigh` and contains two completely visible
numbered handwritten diagram-statements. It has no interrogative stem, answer choices, blank
response area, typeset solution or answer-key layout. The blue `AVN`/`NVA` boxes and red
outlines annotate the second diagram; colour does not turn them into answer marks or a key.
The source therefore contributes **zero complete prompts, zero incomplete prompts and zero
printed or handwritten answer keys**. Both numbered diagrams remain auxiliary evidence only.

### Exact note-statement inventory

| Note | Visible handwritten statement | Prompt status | Key status |
|---:|---|---|---|
| N1 | Ischial-tuberosity sketch: `Upper Medial → Semimembranosus`; `lower Medial → Semitendinosus`, `long head of Biceps Femoris` | `Upper Medial` is preserved despite conflict with pending anatomy wording; note, not a prompt | none |
| N2 | `Floor of Popliteal fossa`: `Upper → Popliteal Surface → AVN`; `Middle → Capsule of Knee → NVA` (vertical); `lower → Fascia → NVA` | blue abbreviations are preserved without expansion; note, not a prompt | annotations only, not a key |
| **Family 8** | **2 complete numbered diagram-statements** | **0 complete / 0 incomplete prompts** | **0** |

There is no exact repeat and no within-source semantic collapse: two statements map
one-to-one to two source-distinct coverage handles. N1's handle is identifiable despite the
directional conflict, so the conflict is retained on the pending match rather than repaired
or converted into a separate invented concept. N2's `AVN`/`NVA` letters are not expanded
beyond what is visible.

### Statement-to-handle assignment and search ledger

Both handles received four required searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root and the accepted prior-LCS
ledger: **2 × 4 = 8 required invocations**. Two broad-token follow-ups (`hamstrings`,
`popliteal fossa`) resolved phrase-order misses, for **10 invocations total**.

| # | Statement assignment | Four required queries | Same-idea/same-scope result | Evidence disposition | Placement only if later promoted by assessment evidence |
|---:|---|---|---|---|---|
| 1 | `N1→hamstring-origins-ischial-tuberosity` | `hamstring origin ischial tuberosity`; `semimembranosus upper medial`; `semitendinosus biceps femoris lower medial`; `ischial tuberosity hamstring facets` | Pending Kasr/Alexandria hamstring records own the three-muscle origin scope and state semitendinosus plus long-head biceps on the lower medial area. They state semimembranosus on the **upper lateral** area, conflicting with this source's legible `Upper Medial`; the source atom is preserved and not silently normalised. | note-only candidate; external pending with conflict | — |
| 2 | `N2→popliteal-fossa` | `popliteal fossa floor`; `popliteal surface femur capsule fascia`; `popliteal fossa AVN`; `artery vein nerve popliteal fossa` | Exact Family-1 handle. Pending component records cover the floor structures and nerve–vein–artery depth order, but no record absorbs the whole fossa scope; the prior disposition remains new. | prior LCS (inherited new) | — |

### Family-8 checkpoint and cumulative LCS-103 delta

| Family-8 evidence bucket | Numbered note assignments | Source-distinct handles | Live | Pending | New | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 1 | 1 | 0 | 0 | 1 | 0 |
| New-to-LCS resolved note-only candidates | 1 | 1 | 0 | 1 | 0 | 0 |
| **Family 8 auxiliary evidence** | **2** | **2** | **0** | **1** | **1** | **0** |

These are auxiliary evidence dispositions, not a tested-concept delta. The assessment-led
module delta is **+0 observed prompts, +0 printed keys and +0 resolved tested concepts**.
Across Families 4–8, all five Anatomy images contribute `5 + 9 + 4 + 7 + 2 = 27`
numbered auxiliary statements, no prompts and no keys.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 7 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 8 assessment delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 8** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `1 prior assignment + 1 new-to-LCS assignment = 2`; no collapse leaves
two handles; `0 live + 1 pending + 1 new + 0 unresolved = 2`. Module arithmetic remains
`4 + 25 + 53 = 82`. Family 3's unresolved phase-4 crop and Family 5's malformed auxiliary
handle remain outside tested-concept totals; Family 8 adds a recorded source conflict but no
unresolved semantic handle.

## Family 9 — first Pathology quiz-content note image

### Source identity and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_4ee3e3e63fa0804576fb` |
| Manifest SHA-256 | `4ee3e3e63fa0804576fb50ecce0b19b49e941cfe40d62054652edba301c9f9ee` |
| Recomputed SHA-256 | `4ee3e3e63fa0804576fb50ecce0b19b49e941cfe40d62054652edba301c9f9ee` |
| File | `Most important notes pathology (Quiz content).jpg` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Pathology/Assessments/Quizzes/Most important notes pathology (Quiz content).jpg` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Pathology · Assessments/Quizzes |
| Container | one 1920 × 2560 progressive JPEG photograph of a ruled spiral-notebook page |
| Read method | original-resolution visual read, source-first; manifest OCR used only as a transcription cross-check |

The page is explicitly headed `Pathology Notes` and contains ten entirely handwritten,
numbered fact statements. It has no interrogative stem, answer choices, blank response area,
typeset solution, response mark or answer-key layout. Its arrows link disease names to
features, mechanisms or morphology; they are explanatory note structure rather than answer
marks. The source therefore contributes **zero complete prompts, zero incomplete prompts
and zero printed or handwritten answer keys**. All ten statements remain auxiliary evidence
only.

### Exact note-statement inventory

| Note | Visible handwritten statement | Prompt status | Key status |
|---:|---|---|---|
| N1 | `Achondroplasia → Dwarfism` | note, not a prompt | none |
| N2 | `Osteogenesis Imperfecta → Blue sclera / Hear loss / Imperfect teeth` | source's `Hear loss` wording preserved; note, not a prompt | none |
| N3 | `Osteopetrosis → Marble Bone disease (Osteoclast dysfunction)` | note, not a prompt | none |
| N4 | `Osteoporosis → Elderly & Postmenopausal Women` | note, not a prompt | none |
| N5 | `Osteomalacia & Rickets → ↓ Vit D` | note, not a prompt | none |
| N6 | `Scurvy → ↓ Vit C → Subperiosteal Hemorrhages` | note, not a prompt | none |
| N7 | `Hyperparathyroidism → Osteitis Fibrosa Cystica` | note, not a prompt | none |
| N8 | `Paget's Disease → Males Over 50`; stages: `Initial Osteolytic`; `Mixed → Mosaic Pattern & Jigsaw Puzzle`; `Quiescent → Cotton-Wool` | note, not a prompt | none |
| N9 | `Osteomyelitis`: `Separation → Sequestrum`; `New → Involucrum`; `Opening has Pus → Cloaca` | terse source wording preserved; note, not a prompt | none |
| N10 | `Osteoma → Dense ivory-like bony Mass` | note, not a prompt | none |
| **Family 9** | **10 complete numbered note statements** | **0 complete / 0 incomplete prompts** | **0** |

There is no exact repeated statement and no within-source semantic collapse. Each numbered
statement maps one-to-one to one source-distinct coverage handle, so ten assignments yield
ten handles. None repeats a prior LCS-103 handle: the accepted LCS assessment and Anatomy-note
families do not own these pathology disease scopes.

### Statement-to-handle assignment and search ledger

All ten handles received four required searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root and the accepted prior-LCS
ledger: **10 × 4 = 40 required invocations**. Ten broad disease-name follow-ups resolved
phrase-order and narrower-mention hits, for **50 invocations total**.

| # | Statement assignment | Four required queries | Same-idea/same-scope result | Evidence disposition | Placement only if later promoted by assessment evidence |
|---:|---|---|---|---|---|
| 1 | `N1→achondroplasia-clinical-pattern` | `achondroplasia`; `dwarfism achondroplasia`; `short-limbed dwarfism`; `FGFR3 achondroplasia` | No substantive live, pending or prior-lane record owns the disease's clinical pattern; the only source hit is the Helwan manifest/source itself. | note-only candidate; external new | MSK/PATH |
| 2 | `N2→osteogenesis-imperfecta-clinical-features` | `osteogenesis imperfecta`; `brittle bone disease`; `blue sclera hearing loss imperfect teeth`; `type I collagen osteogenesis` | A prior Helwan BMS-101 lane has a narrower osteogenesis-imperfecta/type-I-collagen handle and a pending vitamin MCQ uses the disease only as a collagen-disorder distractor. Neither owns this blue-sclera, hearing-loss and tooth-feature cluster. | note-only candidate; external new | MSK/PATH |
| 3 | `N3→osteopetrosis-osteoclast-dysfunction` | `osteopetrosis`; `marble bone disease`; `osteoclast dysfunction`; `dense brittle bone osteopetrosis` | A pending histology article names osteopetrosis only as an example of net bone gain; it does not own the disease mechanism or marble-bone scope. | note-only candidate; external new | MSK/PATH |
| 4 | `N4→osteoporosis-demographic-risk` | `osteoporosis`; `postmenopausal women bone loss`; `elderly osteoporosis`; `estrogen deficiency osteoporosis` | Pending Alexandria anatomy records explicitly own age, sex, menopause and postmenopausal oestrogen loss as osteoporosis determinants. Taxonomy-only live leaves are not counted as substantive coverage. | note-only candidate; external pending | — |
| 5 | `N5→osteomalacia-rickets-vitamin-D-deficiency` | `osteomalacia rickets`; `vitamin D deficiency bone`; `adult rickets osteomalacia`; `defective mineralization` | Pending Kasr biochemistry records explicitly state that vitamin-D deficiency causes rickets in children and osteomalacia in adults. | note-only candidate; external pending | — |
| 6 | `N6→scurvy-bone-findings` | `scurvy bone`; `vitamin C deficiency`; `subperiosteal hemorrhage`; `defective collagen bleeding` | Pending Kasr/ISK records own vitamin-C deficiency as scurvy with defective collagen and bleeding manifestations. They can absorb this bone-specific subperiosteal-haemorrhage extension without creating an unrelated objective. | note-only candidate; external pending | — |
| 7 | `N7→hyperparathyroidism-osteitis-fibrosa-cystica` | `osteitis fibrosa cystica`; `hyperparathyroidism bone`; `brown tumors`; `PTH osteoclastic resorption` | Hyperparathyroidism appears elsewhere only in narrower calcification contexts; no substantive record owns osteitis fibrosa cystica. | note-only candidate; external new | MSK/PATH |
| 8 | `N8→paget-disease-stages-imaging` | `Paget disease bone`; `osteitis deformans`; `mosaic jigsaw cotton wool`; `osteolytic mixed quiescent stages` | Pending pathology mentions Paget disease only as accelerated bone turnover causing metastatic calcification. It does not own the stage sequence, mosaic/jigsaw morphology or cotton-wool appearance. | note-only candidate; external new | MSK/PATH |
| 9 | `N9→chronic-osteomyelitis-sequestrum-involucrum-cloaca` | `osteomyelitis sequestrum`; `involucrum`; `cloaca osteomyelitis`; `dead bone new bone pus opening` | Existing osteomyelitis mentions are pathogen- or amyloidosis-context references. Exact follow-up found no record for the sequestrum–involucrum–cloaca terminology; unrelated embryology `cloaca` hits are rejected. | note-only candidate; external new | MSK/PATH |
| 10 | `N10→osteoma-morphology` | `osteoma`; `ivory osteoma`; `dense bony mass`; `benign bone forming tumor` | Word-boundary follow-up found no substantive osteoma record; apparent broad hits were osteomalacia substrings or taxonomy context. | note-only candidate; external new | MSK/PATH |

### Family-9 checkpoint and cumulative LCS-103 delta

| Family-9 evidence bucket | Numbered note assignments | Source-distinct handles | Live | Pending | New | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 0 | 0 | 0 | 0 | 0 | 0 |
| New-to-LCS resolved note-only candidates | 10 | 10 | 0 | 3 | 7 | 0 |
| **Family 9 auxiliary evidence** | **10** | **10** | **0** | **3** | **7** | **0** |

These are auxiliary evidence dispositions, not a tested-concept delta. The assessment-led
module delta is **+0 observed prompts, +0 printed keys and +0 resolved tested concepts**.
The five Anatomy images remain at 27 numbered auxiliary statements; the first Pathology
image adds 10, for `27 + 10 = 37` auxiliary statements across both subjects.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 8 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 9 assessment delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 9** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `0 prior + 10 new-to-LCS = 10` statement assignments; no repeat or
collapse leaves ten handles; `0 live + 3 pending + 7 new + 0 unresolved = 10`. Module
arithmetic remains `4 + 25 + 53 = 82`. Family 3's unresolved phase-4 crop and Family 5's
malformed auxiliary handle remain outside tested-concept totals; Family 9 adds neither an
assessment prompt nor an unresolved handle.

## Family 10 — second Pathology quiz-content note image

### Source identity and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_e8309c2953d770051cf0` |
| Manifest SHA-256 | `e8309c2953d770051cf02cdadc0c64577b94fa999ca3270c003ac848121e5269` |
| Recomputed SHA-256 | `e8309c2953d770051cf02cdadc0c64577b94fa999ca3270c003ac848121e5269` |
| File | `Most important notes pathology (Quiz content)2.jpg` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Pathology/Assessments/Quizzes/Most important notes pathology (Quiz content)2.jpg` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Pathology · Assessments/Quizzes |
| Container | one 1920 × 2560 progressive JPEG photograph of a ruled spiral-notebook page |
| Read method | original-resolution visual read, source-first; manifest OCR used only as a transcription cross-check |

This is a second entirely handwritten pathology study-note page. It contains seven complete
numbered statements, N12–N18, with no interrogative stem, answer choices, blank response
area, typeset solution, response mark or answer-key layout. The arrows attach tumour names
or ranking phrases to features; they do not mark answers. The source therefore contributes
**zero complete prompts, zero incomplete prompts and zero printed or handwritten answer
keys**. All seven statements remain auxiliary evidence only.

The sequence jumps from Family 9's N10 to N12: N11 is not visible in either available image,
so no wording or handle is inferred for it. A fragment after N14's `Codman's Triangle` is
fully scribbled out. The two readable N14 features make the statement complete; the deleted
fragment is recorded but not reconstructed or counted separately.

### Exact note-statement inventory

| Note | Visible handwritten statement | Prompt status | Key status |
|---:|---|---|---|
| N12 | `Osteoid Osteoma → <2 cm`; `Femur & tibia`; `Relived by Aspirin` | source's `Relived` spelling preserved; note, not a prompt | none |
| N13 | `Osteoblastoma → >2 cm`; `Posterior Components of Vertebrae`; `Not Respond to Aspirin` | terse grammar preserved; note, not a prompt | none |
| N14 | `Osteo Sarcoma → Codman's Triangle`; one following fragment is scribbled out; `Sunburst Pattern` | readable statement retained without reconstructing deleted text; note, not a prompt | none |
| N15 | `Giant Cell Tumor (Osteoclastoma) → Stromal Cell is Main Cause` | broad causal wording preserved; note, not a prompt | none |
| N16 | `Ewing's Sarcoma → Onion Skin Appearance`; `5-20 Year` | source's singular `Year` preserved; note, not a prompt | none |
| N17 | `Commonest Bone Tumor → Metastasis` | ranking wording preserved without correction; note, not a prompt | none |
| N18 | `Most Common Primary Tumor → Multiple Myeloma` | ranking wording preserved without correction; note, not a prompt | none |
| **Family 10** | **7 complete numbered note statements; N11 absent and one deleted N14 fragment not counted** | **0 complete / 0 incomplete prompts** | **0** |

There is no exact repeated statement and no within-source semantic collapse: seven statement
assignments yield seven source-distinct handles. None repeats a prior LCS handle. In
particular, N12's `osteoid osteoma` is a distinct disease scope from Family 9's `osteoma`
and is not collapsed merely because their names overlap.

### Statement-to-handle assignment and search ledger

All seven handles received four required searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root and the accepted prior-LCS
ledger: **7 × 4 = 28 required invocations**. Thirteen terminology and spelling follow-ups
resolved British/American variants, hyphenation and false substring matches, for **41
invocations total**.

| # | Statement assignment | Four required queries | Same-idea/same-scope result | Evidence disposition | Placement only if later promoted by assessment evidence |
|---:|---|---|---|---|---|
| 1 | `N12→osteoid-osteoma-clinical-pattern` | `osteoid osteoma`; `relieved by aspirin`; `nidus less than 2 cm`; `femur tibia osteoid` | No substantive live, pending or prior-LCS record owns this size, site and aspirin-response pattern. The manifest/source is the only exact disease hit; Family 9's osteoma handle is a different entity. | note-only candidate; external new | MSK/PATH |
| 2 | `N13→osteoblastoma-clinical-pattern` | `osteoblastoma`; `giant osteoid osteoma`; `posterior elements vertebrae`; `not relieved by aspirin` | No substantive record owns the size, vertebral-posterior-element and aspirin-response comparison. Exact-name hits are limited to the Helwan manifest/source. | note-only candidate; external new | MSK/PATH |
| 3 | `N14→osteosarcoma-radiographic-signs` | `osteosarcoma`; `osteogenic sarcoma`; `Codman triangle`; `sunburst pattern` | No live or import-ready record owns both radiographic signs. A separate Helwan BMS-102 triage source currently records a sunburst/malignant-osteoid handle, but a triage evidence match is not substantive live or pending coverage; flag the cross-lane collision for later consolidation. | note-only candidate; external new; cross-lane triage match | MSK/PATH |
| 4 | `N15→giant-cell-tumor-stromal-cell-biology` | `giant cell tumor`; `osteoclastoma`; `stromal cell`; `giant-cell tumor bone` | The only stromal-cell hits concern normal marrow reticular stroma. No record owns giant-cell tumour/osteoclastoma or this source's causal stromal-cell wording. | note-only candidate; external new | MSK/PATH |
| 5 | `N16→ewing-sarcoma-clinical-radiology` | `Ewing sarcoma`; `Ewing's sarcoma`; `onion skin appearance`; `5 20 years Ewing` | Exact-word and hyphenation follow-ups reject broad `Ewing` substring noise; no substantive disease, age-range or onion-skin record exists. | note-only candidate; external new | MSK/PATH |
| 6 | `N17→bone-metastasis-commonest-bone-tumor` | `commonest bone tumor`; `most common bone tumor`; `bone metastasis`; `secondary bone tumor` | Pending metastatic-calcification material mentions diffuse skeletal metastasis only as a cause of destructive bone loss, not the source's tumour-frequency ranking. A separate BMS-102 triage example is breast-primary lytic metastasis, also a different objective. | note-only candidate; external new | MSK/PATH |
| 7 | `N18→multiple-myeloma-most-common-primary-bone-tumor` | `multiple myeloma`; `most common primary bone tumor`; `plasma cell tumor bone`; `primary malignant bone tumor` | Live hits are taxonomy-only. Pending pathology identifies myeloma as a marrow plasma-cell tumour in amyloidosis/calcification contexts, but does not own this primary-bone-tumour ranking; adding it there would create an unrelated objective. | note-only candidate; external new | MSK/PATH |

### Family-10 checkpoint and cumulative LCS-103 delta

| Family-10 evidence bucket | Numbered note assignments | Source-distinct handles | Live | Pending | New | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 0 | 0 | 0 | 0 | 0 | 0 |
| New-to-LCS resolved note-only candidates | 7 | 7 | 0 | 0 | 7 | 0 |
| **Family 10 auxiliary evidence** | **7** | **7** | **0** | **0** | **7** | **0** |

These are auxiliary evidence dispositions, not a tested-concept delta. The assessment-led
module delta is **+0 observed prompts, +0 printed keys and +0 resolved tested concepts**.
Anatomy remains at 27 numbered auxiliary statements; Pathology is now `10 + 7 = 17`, for
`27 + 17 = 44` auxiliary statements across both subjects. The absent N11 and deleted N14
fragment are not statements and do not inflate that count.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 9 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 10 assessment delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 10** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `0 prior + 7 new-to-LCS = 7` statement assignments; no repeat or
collapse leaves seven handles; `0 live + 0 pending + 7 new + 0 unresolved = 7`. Module
arithmetic remains `4 + 25 + 53 = 82`. Family 3's unresolved phase-4 crop and Family 5's
malformed auxiliary handle remain outside tested-concept totals; Family 10 adds neither an
assessment prompt nor an unresolved handle.

## Family 11 — third and final Pathology quiz-content note image

### Source identity and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_758188828699ae3569f4` |
| Manifest SHA-256 | `758188828699ae3569f40ab702bb53654038b3fb65a072ea1c182d2d8c1b7512` |
| Recomputed SHA-256 | `758188828699ae3569f40ab702bb53654038b3fb65a072ea1c182d2d8c1b7512` |
| File | `Most important notes pathology (Quiz content)3.jpg` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Pathology/Assessments/Quizzes/Most important notes pathology (Quiz content)3.jpg` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Pathology · Assessments/Quizzes |
| Container | one 1920 × 2560 progressive JPEG photograph of a ruled spiral-notebook page, photographed sideways |
| Read method | original-resolution visual read after orientation correction, source-first |

The page is one entirely handwritten `Bone Tumors` classification diagram. Three arrows
lead to `Diaphysis`, `Metaphysis` and `Epiphysis`, beneath which six tumour-location bullets
remain readable. There is no interrogative stem, answer choice, blank response area, typeset
solution, response mark or key layout. It therefore contributes **zero complete prompts,
zero incomplete prompts and zero printed or handwritten answer keys**. The six readable
bullets remain auxiliary evidence only.

A seventh dash under `Diaphysis` is followed by text that has been fully scribbled out. It
is recorded as a deleted source mark but is neither reconstructed nor counted as a statement,
prompt, key or unresolved semantic handle.

### Exact note-statement inventory

| Diagram branch / atom | Visible handwritten statement | Prompt status | Key status |
|---|---|---|---|
| Diaphysis · D1 | `Osteoid Osteoma` | unnumbered location note, not a prompt | none |
| Diaphysis · D2 | `Ewing's Sarcoma` | unnumbered location note, not a prompt | none |
| Diaphysis · deleted line | one bullet's following text is completely scribbled out | deleted mark; not counted as a prompt or statement | none |
| Metaphysis · M1 | `Osteoblastoma` | unnumbered location note; conflicts with Family 10's posterior-vertebral wording but is not corrected | none |
| Metaphysis · M2 | `Osteo chondroma` | source spacing preserved; unnumbered location note, not a prompt | none |
| Metaphysis · M3 | `Osteo Sarcoma` | source spacing preserved; unnumbered location note, not a prompt | none |
| Epiphysis · E1 | `Giant Cell Tumor (Osteoclastoma)` | unnumbered location note, not a prompt | none |
| **Family 11** | **6 complete visible tumour-location bullet statements; one fully deleted bullet outside counts** | **0 complete / 0 incomplete prompts** | **0** |

There is no exact repeated statement within this source and no within-source semantic
collapse: six visible bullet assignments yield six disease handles. Five handles reuse
Family 10 disease concepts with a new location attribute; only the osteochondroma handle is
new to LCS-103. Reusing a handle does not erase the source's six distinct bullet occurrences.

### Statement-to-handle assignment and search ledger

All six handles received four required searches against live state, `docs/import-ready`,
`docs/questions-import-ready`, every `docs/*-Source-Imports` root and the accepted prior-LCS
ledger: **6 × 4 = 24 required invocations**. Six exact disease-name follow-ups resolved
phrase-order and cross-lane hits, for **30 invocations total**.

| # | Statement assignment | Four required queries | Same-idea/same-scope result | Evidence disposition | Placement only if later promoted by assessment evidence |
|---:|---|---|---|---|---|
| 1 | `D1→osteoid-osteoma-clinical-pattern` | `osteoid osteoma diaphysis`; `osteoid osteoma shaft`; `osteoid osteoma location`; `diaphyseal bone tumor` | Exact Family-10 disease handle; its clinical-pattern record can absorb the diaphyseal location. No substantive external location record was found. | prior LCS (inherited new) | — |
| 2 | `D2→ewing-sarcoma-clinical-radiology` | `Ewing sarcoma diaphysis`; `Ewing tumor shaft`; `onion skin diaphysis`; `Ewing long bone location` | Exact Family-10 disease handle; attach the diaphyseal location to that source concept. Exact-word follow-up finds no substantive external disease record. | prior LCS (inherited new) | — |
| 3 | `M1→osteoblastoma-clinical-pattern` | `osteoblastoma metaphysis`; `osteoblastoma long bone location`; `giant osteoid osteoma metaphysis`; `metaphyseal osteoblastoma` | Exact Family-10 disease handle, but the current diagram's `Metaphysis` conflicts with Family 10's legible `Posterior Components of Vertebrae`. Both source atoms remain attached to one handle and neither is silently normalised. No external record resolves the conflict. | prior LCS (inherited new) with source conflict | — |
| 4 | `M2→osteochondroma-typical-location` | `osteochondroma metaphysis`; `cartilage cap exostosis`; `metaphyseal exostosis`; `osteochondroma growth plate` | A BMS-102 triage item mentions osteochondroma only as a hamartoma option; it does not own this metaphyseal-location scope and is not substantive live/import-ready coverage. No same-scope record exists. | note-only candidate; external new | MSK/PATH |
| 5 | `M3→osteosarcoma-radiographic-signs` | `osteosarcoma metaphysis`; `osteogenic sarcoma metaphyseal`; `sunburst metaphysis`; `distal femur osteosarcoma` | Exact Family-10 disease handle; attach the metaphyseal location to its Codman-triangle/sunburst scope. The separate BMS-102 sunburst handle remains triage evidence rather than substantive coverage. | prior LCS (inherited new); cross-lane triage match | — |
| 6 | `E1→giant-cell-tumor-stromal-cell-biology` | `giant cell tumor epiphysis`; `osteoclastoma epiphysis`; `epiphyseal bone tumor`; `giant cell tumor long bone end` | Exact Family-10 disease handle; its source concept can absorb the epiphyseal location. No substantive external giant-cell-tumour location record was found. | prior LCS (inherited new) | — |

### Family-11 checkpoint and cumulative LCS-103 delta

| Family-11 evidence bucket | Visible bullet assignments | Source-distinct handles | Live | Pending | New | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 5 | 5 | 0 | 0 | 5 | 0 |
| New-to-LCS resolved note-only candidates | 1 | 1 | 0 | 0 | 1 | 0 |
| **Family 11 auxiliary evidence** | **6** | **6** | **0** | **0** | **6** | **0** |

These are auxiliary evidence dispositions, not a tested-concept delta. The assessment-led
module delta is **+0 observed prompts, +0 printed keys and +0 resolved tested concepts**.
Anatomy remains at 27 auxiliary statements; all three Pathology images now contribute
`10 + 7 + 6 = 23`, for `27 + 23 = 50` auxiliary statements across both subjects. The
fully deleted Diaphysis bullet is recorded outside that count.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 10 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 11 assessment delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 11** | **168** | **75** | **82** | **4** | **25** | **53** |

Arithmetic checks: `5 prior + 1 new-to-LCS = 6` visible bullet assignments; no within-source
repeat or collapse leaves six handles; `0 live + 0 pending + 6 new + 0 unresolved = 6`.
Module arithmetic remains `4 + 25 + 53 = 82`. Family 3's unresolved phase-4 crop and Family
5's malformed auxiliary handle remain outside tested-concept totals; Family 11 adds one
recorded source conflict but no unresolved handle.

## Family 12 — Pathology Tutorial 103 inside the department-bank PDF

### Source identity, boundary and read method

| Field | Verified value |
|---|---|
| Manifest source | `src_88169dc9b6ad00181a0d` |
| Manifest SHA-256 | `88169dc9b6ad00181a0d085489284934c5661fe950be822a59ef26ba5e6ae128` |
| Recomputed SHA-256 | `88169dc9b6ad00181a0d085489284934c5661fe950be822a59ef26ba5e6ae128` |
| File | `DPT BOOK MCQs - اسئلة كتاب القسم باثو College MCQs.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/BMS 102/Pathology/Questions/MCQs/DPT BOOK MCQs - اسئلة كتاب القسم باثو College MCQs.pdf` |
| Manifest-path note | the manifest path contains one extra space before `.pdf`; the recomputed hash proves that the existing local file is the manifested source |
| Manifest classification | Helwan `HU_Y1` · `HU-BMS-102` · Pathology · Questions/MCQs; printed heading and accepted cross-module boundary assign Tutorial 103 to `HU-LCS-103` |
| Container | 22-page, unencrypted, non-interactive A4 scan PDF; physical pp. 16–22 are printed pp. 256–262 |
| Read method | all seven in-scope pages rendered at 180 dpi and read visually, source-first; no text-layer inference and no download |

Physical pp. 16–22 begin with the printed heading `TUTORIAL 103`; they were excluded from
the BMS-102 lane and are assessed here. Every page in that accepted boundary was rendered
and visually read. There is no highlighted choice, tick, circle, filled blank, completed
table, solution column or answer-key page. The family therefore contributes **33 observed
prompts and zero printed keys**. In particular, no medically plausible option is promoted
to a key.

Q19's option labels `a`–`e`, option text and entire stem are visibly complete, so Q19 is a
complete unkeyed prompt rather than an unresolved crop. Printed p. 262 uses `2.` twice: once
for the metabolic-bone table
and again for the arthritis comparison. Both source numbers are preserved without silently
renumbering either prompt.

### Exact prompt and key inventory

| Printed page (physical page) | Prompt starts / response units | MCQ prompts | Written, completion or table prompts | Visible printed keys |
|---:|---|---:|---:|---:|
| 256 (16) | MCQ Q1–Q3 | 3 | 0 | 0 |
| 257 (17) | Q3 options continue; MCQ Q4–Q6 and Q7 stem | 4 | 0 | 0 |
| 258 (18) | Q7 options continue; MCQ Q8–Q10 | 3 | 0 | 0 |
| 259 (19) | MCQ Q11–Q14 | 4 | 0 | 0 |
| 260 (20) | MCQ Q15–Q18 | 4 | 0 | 0 |
| 261 (21) | MCQ Q19; five prose tasks; six independently fillable blanks across three numbered completion lines | 1 | 11 | 0 |
| 262 (22) | one metabolic-bone laboratory table, one RA/OA/gout comparison and one bone-mass diagnostic algorithm | 0 | 3 | 0 |
| **Family 12** | **all in-scope pages** | **19** | **14** | **0** |

The 14 non-MCQ prompts are counted at the independently answerable response-unit level:
five prose tasks, six visible blanks and three p. 262 tasks. The four-disease by three-analyte
laboratory table remains one integrated table prompt, not twelve prompts. There is no exact
duplicate prompt form. MCQ Q2 and Q10 test the same periosteal-lifting/sunburst differential
with different wording and collapse to one handle. Completion line 1's two blanks collapse
to one matrix-products handle; completion line 2's three blanks collapse to one tissue-origin
handle. Therefore `33 - 1 - 1 - 2 = 29` source-distinct tested-concept handles.

### Prompt-to-handle assignment ledger

| Assignment | Source prompt scope | Assigned handle | Repeat / collapse rule |
|---|---|---|---|
| MCQ Q1 | childhood bone deformity and decreased-process differential | `childhood-bone-deformity-decreased-process-differential` | distinct |
| MCQ Q2 | periosteal lifting / sunburst bone-lesion differential | `sunburst-periosteal-lifting-bone-tumor-differential` | first occurrence |
| MCQ Q3 | acute crystal-arthritis aetiology differential | `acute-crystal-arthritis-etiology-differential` | distinct |
| MCQ Q4 | cartilage-capped benign bone-tumour differential | `cartilage-capped-benign-bone-tumor-differential` | distinct |
| MCQ Q5 | older-adult high-ALP skull/bone-disorder differential | `older-adult-high-alp-skull-bone-disorder-differential` | distinct |
| MCQ Q6 | pyogenic-osteomyelitis new-bone terminology | `chronic-osteomyelitis-sequestrum-involucrum-cloaca` | prior-LCS auxiliary handle promoted into tested evidence |
| MCQ Q7 | rheumatoid-arthritis clinical/aetiology differential | `rheumatoid-arthritis-clinical-etiology-differential` | distinct |
| MCQ Q8 | inherited progressive muscle-wasting differential | `inherited-progressive-muscle-wasting-differential` | distinct |
| MCQ Q9 | familial collagen-disorder inheritance differential | `familial-collagen-disorder-inheritance-differential` | distinct |
| MCQ Q10 | periosteal lifting / sunburst bone-lesion differential | `sunburst-periosteal-lifting-bone-tumor-differential` | semantic repeat of Q2; occurrence retained, handle collapsed |
| MCQ Q11 | osteoarthritis clinical/aetiology differential | `osteoarthritis-clinical-etiology-differential` | distinct |
| MCQ Q12 | adolescent primary malignant bone-neoplasm ranking | `adolescent-primary-malignant-bone-neoplasm-ranking` | distinct |
| MCQ Q13 | epiphyseal bone-tumour origin differential | `epiphyseal-bone-tumor-origin-differential` | distinct |
| MCQ Q14 | primary malignant bone-tumour ranking excluding myeloma | `primary-malignant-bone-tumor-ranking-excluding-myeloma` | distinct |
| MCQ Q15 | multifocal bone-tumour association exception | `multifocal-bone-tumor-association-exception` | distinct |
| MCQ Q16 | adolescent radiolucent bone-lesion differential | `adolescent-radiolucent-bone-lesion-differential` | distinct |
| MCQ Q17 | painful cortical-shaft lucid/sclerotic lesion differential | `painful-cortical-shaft-lucid-sclerotic-lesion-differential` | distinct |
| MCQ Q18 | enchondroma characteristics exception | `enchondroma-characteristics-exception` | distinct |
| MCQ Q19 | giant-cell-tumour age/site characteristics | `giant-cell-tumor-stromal-cell-biology` | prior-LCS auxiliary disease handle promoted; all option labels are complete |
| Prose W1 | compare chondrosarcoma and osteosarcoma | `chondrosarcoma-vs-osteosarcoma-comparison` | distinct |
| Prose W2 | compare osteoblastoma and osteoid osteoma | `osteoblastoma-vs-osteoid-osteoma-comparison` | distinct |
| Prose W3 | enumerate bone tumours by tissue origin | `bone-tumor-classification-by-tissue-origin` | distinct |
| Prose W4 | enumerate malignant soft-tissue tumours | `malignant-soft-tissue-tumor-enumeration` | distinct |
| Prose W5 | enumerate benign soft-tissue tumour characters | `benign-soft-tissue-tumor-characteristics` | distinct |
| Complete C1 · blanks 1–2 | products of bone-forming tumours | `bone-forming-tumor-matrix-products` | two prompt units collapse to one handle |
| Complete C2 · blanks 1–3 | tissue origins of soft-tissue tumours | `soft-tissue-tumor-tissue-origins` | three prompt units collapse to one handle |
| Complete C3 · blank 1 | most common benign soft-tissue tumour in adults | `common-benign-soft-tissue-tumor-adults` | one prompt unit |
| Table T1 | calcium/phosphorus/ALP patterns across four metabolic bone diseases | `metabolic-bone-disease-laboratory-patterns-table` | integrated table retained as one handle |
| Printed `2.` W6 | compare rheumatoid arthritis, osteoarthritis and gout | `ra-oa-gout-comparison` | distinct; duplicate source numbering preserved |
| W7 | diagnostic algorithm for young-adult bone mass | `young-adult-bone-mass-diagnostic-algorithm` | distinct |

All differential handles remain option-neutral because the source is unkeyed. A live,
pending or prior-lane semantic match is coverage evidence only and is never treated as the
answer to an MCQ.

### Search-before-mint and disposition ledger

Each of the 29 handles received one search in each required surface: live state
(`server/data` and `src/data`), pending state (`docs/import-ready` and
`docs/questions-import-ready`), every prior `docs/*-Source-Imports` lane, and the accepted
prior-LCS ledger. That is **29 × 4 = 116 required invocations**. One broad terminology or
phrase-order follow-up per handle resolves narrow wording and false substring matches, for
**145 invocations total**.

| # | Handle assignment | Four required search queries | Same-idea / same-scope result | Evidence disposition |
|---:|---|---|---|---|
| 1 | `childhood-bone-deformity-decreased-process-differential` | `childhood bone deformity`; `rickets deformity`; `osteomalacia mineralization`; `high ALP rickets` | Pending vitamin-D/rickets material owns insufficient mineralisation and the childhood deformity/laboratory pattern. | pending; semantic coverage only, not a key |
| 2 | `sunburst-periosteal-lifting-bone-tumor-differential` | `sunburst pattern`; `periosteal lifting`; `Codman triangle`; `bone tumor radiographic differential` | Prior LCS auxiliary and BMS triage clues mention the signs, but no substantive live/import-ready differential owns this unkeyed scope. | external new; related triage evidence only |
| 3 | `acute-crystal-arthritis-etiology-differential` | `acute crystal arthritis`; `gout cause`; `podagra tophi`; `urate joint inflammation` | Live `CON-REN-31708150F8B722` and its gout article own the acute joint/tophi/urate disease scope. | live; semantic coverage only, not a key |
| 4 | `cartilage-capped-benign-bone-tumor-differential` | `cartilage capped tumor`; `osteochondroma cartilage cap`; `benign bone exostosis`; `hamartoma osteochondroma` | BMS triage mentions osteochondroma only as an option/hamartoma clue; no substantive cartilage-cap differential exists. | external new |
| 5 | `older-adult-high-alp-skull-bone-disorder-differential` | `older adult high ALP skull`; `Paget bone skull`; `mosaic bone disease`; `Paget laboratory pattern` | Pending metastatic-calcification material only mentions Paget incidentally; prior LCS is auxiliary evidence. | external new |
| 6 | `chronic-osteomyelitis-sequestrum-involucrum-cloaca` | `sequestrum`; `involucrum`; `cloaca osteomyelitis`; `new bone pyogenic osteomyelitis` | Exact prior-LCS auxiliary handle; no fuller substantive external record owns the terminology set. | prior-LCS promotion; inherited external new |
| 7 | `rheumatoid-arthritis-clinical-etiology-differential` | `rheumatoid arthritis clinical`; `rheumatoid etiology`; `autoimmune polyarthritis`; `rheumatoid joint pattern` | Pending pathology mentions rheumatoid disease only as an autoimmune/fibrinoid-necrosis example, not this clinical differential. | external new |
| 8 | `inherited-progressive-muscle-wasting-differential` | `progressive muscle wasting inherited`; `muscular dystrophy dystrophin`; `skeletal muscle degeneration`; `muscle wasting differential` | Pending `CON-MSK-9D01E2358A65E2` owns progressive skeletal-muscle degeneration/dystrophin scope without supplying an option-specific answer. | pending; semantic coverage only, not a key |
| 9 | `familial-collagen-disorder-inheritance-differential` | `familial collagen disorder`; `osteogenesis imperfecta inheritance`; `type I collagen bone`; `inherited brittle bone` | Prior auxiliary and pending vitamin material are narrower disease/defect mentions; no record owns the option-neutral inheritance differential. | external new |
| 10 | `osteoarthritis-clinical-etiology-differential` | `osteoarthritis clinical`; `wear and tear arthritis`; `Heberden nodes`; `osteoarthritis etiology` | Existing OA strings are incidental and do not own the clinical/aetiology pattern. | external new |
| 11 | `adolescent-primary-malignant-bone-neoplasm-ranking` | `adolescent malignant bone tumor`; `primary bone cancer teenager`; `osteosarcoma age ranking`; `Ewing osteosarcoma ranking` | Only prior LCS/BMS triage disease clues occur; no substantive age-ranked differential exists. | external new |
| 12 | `epiphyseal-bone-tumor-origin-differential` | `epiphyseal bone tumor`; `tumor epiphysis`; `chondroblastoma epiphysis`; `giant cell tumor epiphysis` | Prior LCS auxiliary location notes do not own the unkeyed origin differential. | external new |
| 13 | `primary-malignant-bone-tumor-ranking-excluding-myeloma` | `primary malignant bone tumor ranking`; `excluding myeloma bone tumor`; `common primary bone cancer`; `osteosarcoma ranking` | No same-scope substantive ranking record exists. | external new |
| 14 | `multifocal-bone-tumor-association-exception` | `multifocal bone tumor`; `multiple bone lesions tumor`; `bone tumor association exception`; `multicentric bone neoplasm` | No substantive live, pending or prior-LCS record owns the exception scope. | external new |
| 15 | `adolescent-radiolucent-bone-lesion-differential` | `adolescent radiolucent bone lesion`; `lucent lesion teenager`; `bone cyst differential`; `young patient lytic lesion` | Broad lesion strings are taxonomy/triage noise; no same-scope differential exists. | external new |
| 16 | `painful-cortical-shaft-lucid-sclerotic-lesion-differential` | `painful cortical shaft lesion`; `lucent sclerotic bone lesion`; `diaphyseal cortical tumor`; `osteoid osteoma radiology` | Prior auxiliary osteoid-osteoma notes are disease clues, not this option-neutral imaging differential. | external new |
| 17 | `enchondroma-characteristics-exception` | `enchondroma characteristics`; `enchondroma exception`; `benign cartilage tumor medulla`; `enchondroma clinical` | No substantive same-scope record exists. | external new |
| 18 | `giant-cell-tumor-stromal-cell-biology` | `giant cell tumor age site`; `osteoclastoma epiphysis`; `stromal cell giant cell tumor`; `giant cell tumor characteristics` | Exact prior-LCS auxiliary disease handle can absorb the tested age/site attributes; no substantive external record exists. | prior-LCS promotion; inherited external new |
| 19 | `chondrosarcoma-vs-osteosarcoma-comparison` | `chondrosarcoma osteosarcoma compare`; `cartilage bone matrix malignancy`; `chondrosarcoma versus osteogenic`; `bone sarcoma comparison` | No substantive comparison record exists. | external new |
| 20 | `osteoblastoma-vs-osteoid-osteoma-comparison` | `osteoblastoma osteoid osteoma compare`; `osteoblastoma size aspirin`; `osteoid osteoma versus osteoblastoma`; `benign osteoid tumors comparison` | Two prior auxiliary disease handles supply fragments, but no comparison record owns the combined objective. | external new |
| 21 | `bone-tumor-classification-by-tissue-origin` | `bone tumor tissue origin`; `bone tumor classification`; `osteogenic chondrogenic tumors`; `bone neoplasm histogenesis` | No substantive tissue-origin classification record exists. | external new |
| 22 | `malignant-soft-tissue-tumor-enumeration` | `malignant soft tissue tumors`; `sarcoma enumeration`; `soft tissue malignancy types`; `mesenchymal malignant tumors` | Manifest/BMS triage mentions are broad evidence, not a substantive enumeration. | external new |
| 23 | `benign-soft-tissue-tumor-characteristics` | `benign soft tissue tumor characteristics`; `benign mesenchymal tumor features`; `soft tissue tumor benign clinical`; `benign tumor behavior` | No same-scope substantive record exists. | external new |
| 24 | `bone-forming-tumor-matrix-products` | `osteoid matrix`; `bone forming tumor products`; `osteoid mineralized bone`; `tumor bone matrix` | Pending AU-MED-105 histology material owns osteoid as unmineralised matrix and its mineralisation into calcified bone. | pending |
| 25 | `soft-tissue-tumor-tissue-origins` | `soft tissue tumor tissue origin`; `mesenchymal tumor origins`; `soft tissue neoplasm histogenesis`; `tumor tissue categories` | No substantive record owns the requested origin set. | external new |
| 26 | `common-benign-soft-tissue-tumor-adults` | `common benign soft tissue tumor adults`; `lipoma adult frequency`; `fibroma lipoma ranking`; `commonest soft tissue tumor` | Individual lipoma/fibroma mentions do not own the adult frequency-ranking objective. | external new |
| 27 | `metabolic-bone-disease-laboratory-patterns-table` | `metabolic bone calcium phosphorus ALP`; `rickets osteomalacia osteoporosis Paget labs`; `bone disease laboratory table`; `calcium phosphate alkaline phosphatase` | Pending rickets and narrower disease fragments exist, but no one record owns all four diseases across the three analytes. | external new |
| 28 | `ra-oa-gout-comparison` | `rheumatoid osteoarthritis gout compare`; `RA OA gout table`; `inflammatory degenerative crystal arthritis`; `arthritis differential comparison` | Disease mentions are fragmented across records; no substantive three-way comparison exists. | external new |
| 29 | `young-adult-bone-mass-diagnostic-algorithm` | `young adult bone mass algorithm`; `bone lesion age site radiology microscopy`; `bone tumor diagnostic algorithm`; `bone mass differential` | Broad bone strings and taxonomy hits do not own the requested age/site/radiology/microscopy workflow. | external new |

External disposition arithmetic is `1 live + 3 pending + 25 external new = 29` handles. The
two prior-LCS auxiliary promotions remain external-new dispositions because the earlier note
families did not count them as tested concepts. They now enter assessment totals once each.
None of the 29 handles repeats a concept already included in the accepted 82 tested-concept
baseline.

### Family-12 checkpoint and cumulative LCS-103 delta

| Family-12 evidence bucket | Prompt occurrences | Source-distinct handles | Live | Pending | New | Unresolved |
|---|---:|---:|---:|---:|---:|---:|
| Semantic repeat / completion collapse | 4 | 0 | 0 | 0 | 0 | 0 |
| Resolved tested concepts | 29 | 29 | 1 | 3 | 25 | 0 |
| **Family 12 assessment evidence** | **33** | **29** | **1** | **3** | **25** | **0** |

Family 12 adds **+33 observed prompts, +0 printed keys and +29 resolved tested concepts**.
The 50 Anatomy/Pathology auxiliary statements remain separate and unchanged.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 11 | 168 | 75 | 82 | 4 | 25 | 53 |
| Family 12 assessment delta | +33 | +0 | +29 | +1 | +3 | +25 |
| **LCS-103 cumulative after Family 12** | **201** | **75** | **111** | **5** | **28** | **78** |

Arithmetic checks: `19 MCQ + 14 written/completion/table = 33`; `33 - 4 collapsed
occurrences = 29` handles; `1 + 3 + 25 = 29`; `168 + 33 = 201`; `75 + 0 = 75`;
`82 + 29 = 111`; and `5 + 28 + 78 = 111`. Family 3's unresolved phase-4 crop and
Family 5's malformed auxiliary note remain outside tested-concept totals. Family 12 adds
neither an unresolved concept nor an inferred key.

## Family 13 — external-labelled Histology Cartilage & Bone MCQ bank

### Source identity, provenance and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_5da6cd6d288fb46dba2f` |
| Manifest SHA-256 | `5da6cd6d288fb46dba2f3ed81b483a20eb6dd2935d65d2da42ea7e3efd1849eb` |
| Recomputed SHA-256 | `5da6cd6d288fb46dba2f3ed81b483a20eb6dd2935d65d2da42ea7e3efd1849eb` |
| File | `MCQs - External Histo Cartilage & Bone MCQ + answers JPG.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - External Histo Cartilage & Bone MCQ + answers JPG.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · All Subjects · Questions/MCQs · solved copy · source tier 3 |
| External provenance | the filename explicitly says `External`; that label is source authority and is not overridden by folder placement or the answer list |
| Container | 23-page, unencrypted, non-interactive A4 PDF; pages 1–19 are question sheets and pages 20–23 are an answer list |
| Read method | all 23 pages rendered at 160 dpi and visually read source-first; OCR/text extraction used only to cross-check numbering and the printed answer list; no download |

This is a solved **assessment bank**, not teaching prose and not a practical handout. Pages
1–19 contain 141 complete MCQ occurrences. The printed sequence is Q1–Q140, but the source
prints two different questions as `41`; both occurrences are retained as Q41a and Q41b.
Pages 20–23 print 141 corresponding answer-letter entries: two separate `41` entries (`B`
then `D`) align by source order with Q41a and Q41b. No answer is inferred or medically
repaired, including when a source key may look questionable.

The first prompt on p. 10 begins visibly as `7 is the connective tissue covering which
surrounds cartilage?`; its intended sequence position is supported by the surrounding Q71
and Q73 and by the printed `72-C` key, but the damaged stem prefix is not reconstructed.
It remains one complete, malformed, keyed prompt. Several later prompts visibly omit some
option labels while preserving every option text and its order (notably Q73, Q80, Q88,
Q91–Q92, Q116, Q120–Q122 and Q130–Q136). They remain complete keyed prompts; the missing
labels are not silently supplied.

### Page-by-page prompt and printed-key inventory

| Physical page | Visible content | Prompt occurrences | Printed key entries |
|---:|---|---:|---:|
| 1 | Q1–Q6 | 6 | 0 |
| 2 | Q7–Q12 | 6 | 0 |
| 3 | Q13–Q17 | 5 | 0 |
| 4 | Q18–Q26 | 9 | 0 |
| 5 | Q27–Q36 | 10 | 0 |
| 6 | Q37–Q46, including distinct Q41a/Q41b | 11 | 0 |
| 7 | Q47–Q53 | 7 | 0 |
| 8 | Q54–Q61 | 8 | 0 |
| 9 | Q62–Q71 | 10 | 0 |
| 10 | malformed-prefix Q72, then Q73–Q80 | 9 | 0 |
| 11 | Q81–Q87 | 7 | 0 |
| 12 | Q88–Q94 | 7 | 0 |
| 13 | Q95–Q101 | 7 | 0 |
| 14 | Q101 option `d` continues, then Q102–Q108 | 7 | 0 |
| 15 | Q109–Q115 | 7 | 0 |
| 16 | Q116–Q122 | 7 | 0 |
| 17 | Q123–Q129 | 7 | 0 |
| 18 | Q130–Q136 | 7 | 0 |
| 19 | Q137–Q140 | 4 | 0 |
| 20 | answer list Q1–Q44, including two separate Q41 letters | 0 | 45 |
| 21 | answer list Q45–Q88 | 0 | 44 |
| 22 | answer list Q89–Q132 | 0 | 44 |
| 23 | answer list Q133–Q140 | 0 | 8 |
| **Family 13 raw external bank** | **all pages** | **141** | **141** |

Five assessment prompts, Q122–Q126, are **practical-relevant**: they test decalcified
versus ground-bone preparation and what each preparation demonstrates. They remain inside
the 141 MCQs and are not double-counted as practical records. There are no stand-alone
slides, spotters, specimens, teaching plates or non-assessment practical tasks in this PDF.

### One-to-one assignment, search and disposition ledger

Every one of the 141 prompt occurrences is assigned below exactly once. Repeated and
same-objective prompts collapse to 49 source-distinct handles, so `141 - 49 = 92` repeat
occurrences. Exact or near-exact repeats include Q4/Q40, Q5/Q44, Q23/Q77, Q30/Q33,
Q51/Q72, Q52/Q68, Q55/Q65, Q89/Q96 and Q139/Q140; the larger groups below make every
other semantic collapse explicit. The duplicated printed number `41` does not cause a
collapse because Q41a and Q41b test different concepts.

Each handle received one search in each required surface: live state (`server/data` and
`src/data`), pending state (`docs/import-ready` and `docs/questions-import-ready`), every
prior `docs/*-Source-Imports` lane, and accepted prior LCS. That is **49 × 4 = 196 required
invocations**. One broad terminology/phrase-order follow-up per handle gives **245 total
invocations**. No exact prior-LCS tested handle is reused; prior LCS bone-matrix and metabolic
table material is related but different-grain and therefore not collapsed.

| # | Prompt assignment → handle | Four-query bundle | Same-scope result | External-bank disposition |
|---:|---|---|---|---|
| 1 | Q1,Q29 → `endochondral-ossification-long-bone-regions` | `endochondral ossification`; `intracartilaginous`; `diaphysis ossification`; `epiphysis ossification` | Pending `ART-103-HIS-BONE-OSSIFICATION` owns the two centres and cartilage-model route. | pending |
| 2 | Q2,Q14,Q42,Q43,Q111 → `osteoblast-bone-forming-cell-alkaline-phosphatase` | `osteoblast alkaline phosphatase`; `bone building cell`; `laying down new bone`; `osteoblast matrix secretion` | Pending bone-cell and ossification records own the forming-cell/ALP scope. | pending |
| 3 | Q3,Q38 → `compact-bone-dense-definition` | `compact bone`; `dense bone`; `compact cancellous`; `bone density terminology` | Pending compact/spongy article owns the equivalence and structure. | pending |
| 4 | Q4,Q40,Q47 → `osteon-haversian-system-compact-bone-unit` | `Haversian system`; `osteon`; `cylindrical compact bone`; `compact bone unit` | Live `ART-MSK-TOP-3E60C20647` owns the Haversian/osteon lamellar unit; pending material is fuller but not a reason to duplicate. | live |
| 5 | Q5,Q18,Q44,Q101,Q121 → `bone-matrix-type-i-collagen-acidophilia` | `bone matrix`; `type I collagen bone`; `bone acidophilia`; `calcified collagen` | Live matrix records are narrower; pending bone-matrix material owns type-I collagen and acidophilia together. | pending |
| 6 | Q6,Q35,Q46,Q52,Q68 → `hyaline-cartilage-growth-plate-articular-fetal-sites` | `hyaline growth plate`; `articular cartilage`; `fetal skeleton cartilage`; `epiphyseal cartilage` | Pending cartilage-types/ossification records own all three site roles. | pending |
| 7 | Q7,Q12,Q19,Q115 → `osteocyte-canaliculi-processes-gap-junctions` | `osteocyte canaliculi`; `osteocyte processes`; `gap junction bone`; `canaliculi branches` | Pending compact-bone/bone-cell material owns the canalicular process network. | pending |
| 8 | Q8 → `osteoclast-howship-lacuna` | `Howship lacuna`; `osteoclast hollow`; `resorption bay`; `bone eroding cavity` | Pending `ART-103-HIS-BONE-CELLS` explicitly owns the osteoclast site. | pending |
| 9 | Q9 → `osteoid-unmineralized-bone-matrix` | `osteoid`; `unmineralized bone matrix`; `organic bone matrix`; `osteoblast osteoid` | Pending bone-cell/matrix material owns the definition; Family 12's tumour-matrix handle is different-grain. | pending |
| 10 | Q10,Q11,Q108 → `endosteum-medullary-cavity-lining` | `endosteum`; `medullary cavity lining`; `inner bone surface`; `bone marrow cavity layer` | Pending bone-coverings record owns the full definition. | pending |
| 11 | Q13,Q15,Q16 → `compact-vs-spongy-bone-sites` | `compact spongy sites`; `diaphysis compact`; `epiphysis spongy`; `flat short irregular bone` | Pending compact/spongy article owns the distribution. | pending |
| 12 | Q17,Q32,Q36,Q105 → `spongy-bone-trabecular-architecture` | `trabeculae`; `spongy bone spicules`; `cancellous septa`; `irregular bone lamellae` | Pending compact/spongy article owns the branching lamellar architecture. | pending |
| 13 | Q21,Q88 → `cartilage-isogenous-group-cell-nest` | `isogenous group`; `cell nest`; `chondrocytes same lacuna`; `cartilage cell cluster` | Pending cartilage-cell article owns the 2–8-cell group. | pending |
| 14 | Q22,Q23,Q27,Q56,Q57,Q63,Q64,Q69,Q70,Q71,Q76–Q79 → `cartilage-types-anatomic-sites` | `cartilage sites`; `epiglottis cartilage`; `meniscus fibrocartilage`; `elastic hyaline fibrocartilage` | Pending `ART-103-HIS-CARTILAGE-TYPES` owns the complete site table. | pending |
| 15 | Q24,Q90,Q95 → `cartilage-matrix-basophilia-metachromasia` | `cartilage basophilia`; `metachromasia`; `sulfated GAG`; `hematoxylin cartilage` | Pending cartilage-cell article owns sulfated GAG basophilia/metachromasia. | pending |
| 16 | Q25 → `volkmann-canals-connect-osteons` | `Volkmann canals`; `Haversian connectors`; `transverse bone canal`; `osteon connection` | Pending compact-bone article owns the transverse/oblique connections. | pending |
| 17 | Q26 → `osteoclast-multinucleation-identity` | `multinucleated osteoclast`; `bone cell several nuclei`; `osteoclast fusion`; `giant bone cell` | Pending bone-cell article owns origin by fusion and multinucleation. | pending |
| 18 | Q28,Q41a,Q49 → `sharpey-fibers-tendon-ligament-attachment` | `Sharpey fibers`; `perforating fibers`; `ligament bone anchor`; `collagen into bone` | Pending compact-bone/periosteum material owns the attachment. | pending |
| 19 | Q30,Q33,Q102 → `osteoclast-bone-resorption-identity` | `osteoclast resorption`; `bone breakdown cell`; `bone eroding cell`; `bone destroying cell` | Live bone-metabolism material explicitly owns activated osteoclast resorption. | live |
| 20 | Q31 → `bone-specialized-connective-tissue` | `bone connective tissue`; `hard connective tissue`; `bone basic tissue`; `calcified matrix tissue` | Live `ART-MSK-TOP-3E60C20647` defines bone as hard connective tissue with calcified matrix. | live |
| 21 | Q34 → `intramembranous-ossification-direct-bone-formation` | `intramembranous ossification`; `direct bone formation`; `no cartilage template`; `mesenchymal bone` | Pending ossification article owns the direct route. | pending |
| 22 | Q37,Q41b,Q48,Q104,Q136 → `osteocyte-lacuna-mature-maintenance-viability` | `mature bone cell`; `osteocyte lacuna`; `bone maintaining cell`; `osteocyte viability` | Pending bone-coverings/cells material owns mature osteocyte site and function. | pending |
| 23 | Q39 → `bone-lining-cell-resting-osteoblast` | `bone lining cell`; `resting osteoblast`; `flattened osteoblast`; `bone surface cell` | Pending bone-cell article explicitly owns the flattened lining-cell fate. | pending |
| 24 | Q45,Q107 → `periosteum-bone-covering-functions` | `periosteum`; `bone covering`; `periosteum functions`; `muscle attachment bone` | Pending bone-coverings article owns covering, nutrition, attachment and growth. | pending |
| 25 | Q50,Q55,Q65,Q73,Q97 → `chondroblast-vs-chondrocyte-maturity-matrix` | `chondroblast`; `chondrocyte`; `cartilage matrix cell`; `mature cartilage cell` | Pending cartilage-cell article owns both stages and matrix secretion. | pending |
| 26 | Q51,Q72,Q86 → `perichondrium-cartilage-covering-composition` | `perichondrium`; `cartilage covering`; `perichondrium vessels nerves`; `perichondrium collagen I` | Pending cartilage-cell article owns both layers and composition. | pending |
| 27 | Q53 → `megakaryocyte-single-multilobed-nucleus` | `megakaryocyte multilobed`; `single lobed nucleus`; `osteoclast megakaryocyte`; `marrow giant cell` | Pending bone-matrix comparison and ISK marrow records own the discriminator. | pending |
| 28 | Q54,Q74,Q85,Q92,Q93 → `cartilage-avascular-nutrition-repair` | `avascular cartilage`; `cartilage diffusion`; `synovial nutrition`; `cartilage capillary matrix` | Pending cartilage-cell article owns avascularity and both diffusion routes. | pending |
| 29 | Q58,Q60 → `cartilage-mesenchymal-origin-and-specialized-ct` | `cartilage mesenchyme`; `specialized connective tissue`; `cartilage origin`; `undifferentiated mesenchymal cells` | Live mesenchymal hits concern marrow; pending cartilage-cell material owns this exact origin/classification. | pending |
| 30 | Q59 → `connective-tissue-proper-classification` | `connective tissue proper`; `loose connective tissue`; `specialized connective tissue`; `areolar classification` | Pending ISK histology material owns the soft-matrix/CT-proper classification. | pending |
| 31 | Q61,Q94 → `cartilage-three-type-classification-basis` | `three cartilage types`; `cartilage classification`; `fiber type matrix amount`; `hyaline elastic fibrocartilage` | Pending cartilage articles own the three types and classification basis. | pending |
| 32 | Q62,Q67,Q81 → `chondrocyte-lacuna-and-general-phenotype` | `chondrocyte lacuna`; `single chondrocyte`; `cartilage cell lacuna`; `chondrocyte phenotype` | Pending cartilage-cell article owns the lacunar phenotype. | pending |
| 33 | Q66,Q91 → `hyaline-cartilage-glassy-type-ii-collagen` | `hyaline glassy`; `type II collagen`; `transparent cartilage matrix`; `hyaline matrix fibers` | Pending cartilage articles own both features. | pending |
| 34 | Q80 → `cartilage-matrix-firm-flexible` | `firm flexible cartilage`; `rubbery matrix`; `cartilage ground substance`; `cartilage matrix consistency` | Pending cartilage-cell article defines the matrix as firm, rubbery and flexible. | pending |
| 35 | Q75,Q82,Q83,Q100 → `fibrocartilage-type-i-collagen-perichondrium-absence` | `white fibrocartilage`; `type I collagen`; `no perichondrium`; `thick collagen bundles` | Pending cartilage-types article owns the full pattern. | pending |
| 36 | Q84,Q89,Q96,Q98,Q99 → `cartilage-appositional-vs-interstitial-growth` | `cartilage appositional`; `cartilage interstitial`; `chondroblast growth`; `chondrocyte growth` | Pending cartilage-cell article explicitly separates the two mechanisms. | pending |
| 37 | Q87 → `elastic-cartilage-fibers-type-ii-collagen` | `yellow elastic cartilage`; `elastic fibers`; `type II collagen elastic`; `elastic cartilage matrix` | Pending cartilage-types article owns the combination. | pending |
| 38 | Q139,Q140 → `deep-chondrocyte-phenotype` | `deep chondrocytes`; `lipid glycogen chondrocyte`; `pale basophilic chondrocyte`; `old chondrocyte shape` | Pending cartilage-cell article owns the deep-cell phenotype; two exception forms collapse. | pending |
| 39 | Q103,Q119,Q130–Q132 → `bone-cell-cytoplasm-organelle-comparison` | `negative Golgi image`; `osteoblast RER`; `osteoclast mitochondria`; `osteogenic ribosomes` | Pending bone-cell/coverings records own the LM/EM comparison. | pending |
| 40 | Q20,Q106,Q120,Q134 → `bone-appositional-growth-surfaces-width` | `bone appositional growth`; `periosteum endosteum`; `long bone width`; `bone growth surfaces` | Pending bone-coverings/ossification records own outward/inward surface growth. | pending |
| 41 | Q109,Q110,Q112,Q114,Q116 → `epiphyseal-plate-zone-sequence-cell-changes` | `epiphyseal zones`; `proliferative hypertrophy`; `zone invasion`; `zone ossification` | Pending ossification article owns the ordered zones and changes. | pending |
| 42 | Q117 → `osteoporosis-calcitonin-treatment` | `calcitonin osteoporosis`; `osteoclast inhibition`; `bone fracture treatment`; `C-cell calcitonin` | Pending 103-BMS histology concept explicitly states calcitonin use in osteoporosis. | pending |
| 43 | Q118 → `fracture-healing-periosteum-thickening` | `fracture periosteum`; `periosteal thickening`; `osteogenic layer fracture`; `bone repair periosteum` | Pending bone-coverings article explicitly owns marked periosteal thickening during fracture repair. | pending |
| 44 | Q122–Q126 → `bone-histology-preparation-ground-vs-decalcified` | `Grinding method`; `decalcified bone`; `ground compact bone`; `bone preparation histology` | Pending bone-matrix/classification article owns preparation choice and demonstrated structures. | pending; practical-relevant |
| 45 | Q127–Q129,Q133 → `osteoclast-vesicular-acid-enzyme-resorption-mechanism` | `exocytotic vesicles`; `endocytotic vesicles`; `H ion Howship`; `ruffled border osteoclast` | Pending bone-cell article owns vesicles, acid, proteolytic enzymes and ruffled border. | pending |
| 46 | Q137 → `osteoclast-remodeling-functions` | `osteoclast remodelling`; `marrow cavity widening`; `fracture growth remodeling`; `osteoclast function` | Pending bone-cell/ossification material owns resorption and remodelling. | pending |
| 47 | Q113 → `bone-lamellae-composition-organization` | `concentric lamellae`; `calcified collagen lamellae`; `Haversian canal layers`; `bone lamellae` | Live `CON-MSK-52DC4C4BF9126D` owns calcified collagen lamellae and live Haversian material owns their concentric organization. | live |
| 48 | Q135 → `long-bone-length-epiphyseal-plate` | `long bone length`; `epiphyseal plate`; `longitudinal growth`; `growth plate length` | Pending ossification article owns longitudinal growth at the plate. | pending |
| 49 | Q138 → `bone-no-interstitial-growth` | `no interstitial growth`; `osteocytes cannot divide`; `bone growth limitation`; `appositional only bone` | Live `CON-MSK-CCDCEC8F7ACBC0` owns the no-interstitial-growth fact. | live |

Disposition arithmetic is **5 live + 44 pending + 0 external-new = 49** source-distinct
handles. These are coverage results for an explicitly external bank, not authority to add
the source to Helwan-owned assessment scope. The answers remain useful source provenance,
and the five practical-relevant prompts remain useful evidence, but neither changes the
eligible Helwan module totals.

### Family-13 checkpoint and cumulative LCS-103 delta

| Family-13 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|
| Explicitly external assessment bank | 141 | 141 | 49 | 5 | 44 | 0 |
| Of which practical-relevant MCQs (already included above) | 5 | 5 | 1 | 0 | 1 | 0 |
| **Eligible Helwan assessment delta** | **+0** | **+0** | **+0** | **+0** | **+0** | **+0** |

The accepted eligible-module checkpoint therefore stays unchanged:

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 12 | 201 | 75 | 111 | 5 | 28 | 78 |
| Family 13 eligible delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 13** | **201** | **75** | **111** | **5** | **28** | **78** |

Arithmetic checks: pages 1–19 give `141` prompt occurrences; pages 20–23 give
`45 + 44 + 44 + 8 = 141` printed key entries; `141 - 92 = 49` handles; and
`5 + 44 + 0 = 49`. The external bank is recorded separately, so eligible cumulative
arithmetic remains `5 + 28 + 78 = 111`. The 50 auxiliary note statements, Family 3's
unresolved crop and Family 5's malformed note also remain unchanged and outside these raw
external-bank totals.

## Family 14 — external-labelled Histology Muscle MCQ bank

### Source identity, provenance and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_7f33f41ffaff192e3bc8` |
| Manifest SHA-256 | `7f33f41ffaff192e3bc8959d58591efdc6157e078241de89be990e8c695d4ff0` |
| Recomputed SHA-256 | `7f33f41ffaff192e3bc8959d58591efdc6157e078241de89be990e8c695d4ff0` |
| File | `MCQs - External Histo Muscle MCQ & answers JPG.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - External Histo Muscle MCQ & answers JPG.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · All Subjects · Questions/MCQs · solved copy · source tier 3 |
| External provenance | the filename explicitly says `External`; that source label is preserved and excludes this bank from eligible Helwan assessment totals |
| Container | 20-page, unencrypted, non-interactive PDF; pages 1–17 are scanned question sheets and pages 18–20 are a native-text answer list |
| Read method | all 20 physical pages rendered at 160 dpi and visually read source-first; text extraction used only to cross-check the printed answer list; no download |

This is a solved **assessment bank**, not teaching prose. The question sequence is Q1–Q100.
Q49 continues from p. 8 to p. 9, Q63 from p. 10 to p. 11 and Q82 from p. 13 to
p. 14; each is counted at its starting page only. Q100 has a complete stem and options
`a`–`d` on p. 16, followed by a dangling empty option label `e.` on p. 17. The blank label
is preserved as source damage but is neither a second prompt nor an absent key. Pages
18–20 print one answer letter for every Q1–Q100. No answer is inferred or medically
repaired, including where a printed answer appears questionable.

### Page-by-page prompt and printed-key inventory

| Physical page | Visible content | Prompt occurrences | Printed key entries |
|---:|---|---:|---:|
| 1 | Q1–Q6 | 6 | 0 |
| 2 | Q7–Q12 | 6 | 0 |
| 3 | Q13–Q17 | 5 | 0 |
| 4 | Q18–Q23 | 6 | 0 |
| 5 | Q24–Q29 | 6 | 0 |
| 6 | Q30–Q35 | 6 | 0 |
| 7 | Q36–Q41 | 6 | 0 |
| 8 | Q42–Q49; Q49 continues | 8 | 0 |
| 9 | Q49 continuation, then Q50–Q56 | 7 | 0 |
| 10 | Q57–Q63; Q63 continues | 7 | 0 |
| 11 | Q63 continuation, then Q64–Q69 | 6 | 0 |
| 12 | Q70–Q75 | 6 | 0 |
| 13 | Q76–Q82; Q82 continues | 7 | 0 |
| 14 | Q82 continuation, then Q83–Q88 | 6 | 0 |
| 15 | Q89–Q94 | 6 | 0 |
| 16 | Q95–Q100 stem and options `a`–`d` | 6 | 0 |
| 17 | dangling empty option label `e.` from Q100 | 0 | 0 |
| 18 | answer list Q1–Q44 | 0 | 44 |
| 19 | answer list Q45–Q88 | 0 | 44 |
| 20 | answer list Q89–Q100 | 0 | 12 |
| **Family 14 raw external bank** | **all pages** | **100** | **100** |

Q26 is **practical-relevant** because it asks the learner to interpret a histological
preparation and identify the red/fatigue-resistant skeletal-muscle fibre. It remains one
of the 100 keyed MCQs and is not double-counted as practical output. There are no
stand-alone slides, spotters, specimens, teaching plates or non-assessment practical tasks.

### One-to-one assignment, search and disposition ledger

Every prompt occurrence is assigned exactly once below. The 100 occurrences collapse to
26 source-distinct handles, so `100 - 26 = 74` occurrences are explicit repeats or
same-objective variants. Family 13's 49 Cartilage/Bone handles have no same-scope match,
so all 26 handles are new to the separately tracked external-bank inventory. Prior-LCS
dedupe is still applied: Q79 reuses the accepted
`inherited-progressive-muscle-wasting-differential` scope; the earlier physiology handles
for muscle-type comparison, excitation–contraction coupling and neuromuscular transmission
remain different-grain and are not silently merged with histological morphology or disease
identity here.

Each handle received one search in each required surface: live state (`server/data` and
`src/data`), pending state (`docs/import-ready` and `docs/questions-import-ready`), every
prior `docs/*-Source-Imports` lane, and accepted prior LCS. That is **26 × 4 = 104 required
invocations**. One terminology/phrase-order follow-up per handle gives **130 total
invocations**.

| # | Prompt assignment → handle | Four-query bundle | Same-scope result | External-bank disposition |
|---:|---|---|---|---|
| 1 | Q1,Q22,Q37,Q44,Q61 → `muscle-myofilament-identities-and-anchors` | `actin myofilament`; `myosin myofilament`; `thin filament`; `actin Z line` | Pending skeletal/smooth-muscle articles own actin, myosin and their attachment sites together. | pending |
| 2 | Q2,Q17,Q26,Q30–Q34,Q41,Q48–Q50,Q66 → `skeletal-muscle-red-white-fiber-comparison` | `red white muscle fibers`; `slow fast twitch`; `myoglobin mitochondria glycogen`; `fatigue aerobic anaerobic` | Pending `CON-MSK-3E5F54D8D58E9C` and the Histology fibre-type material own the comparison. | pending; Q26 practical-relevant |
| 3 | Q3,Q23,Q60,Q84 → `smooth-muscle-contractile-apparatus-dense-bodies-caveolae` | `smooth muscle dense bodies`; `caveolae`; `smooth actin myosin`; `no sarcomere` | Pending smooth-muscle article owns the irregular filaments, dense bodies and caveolae substitutions. | pending |
| 4 | Q4,Q13,Q16,Q39,Q40,Q54,Q75 → `muscle-type-histology-comparison` | `skeletal cardiac smooth comparison`; `central nuclei`; `striated muscle types`; `muscle gap junctions` | Pending comparison table owns the morphology/junction scope; prior-LCS `muscle-type-physiology-comparison` is related but different-grain. | pending |
| 5 | Q10,Q20,Q43,Q45,Q47,Q52,Q67,Q73,Q91 → `skeletal-muscle-fiber-lm-phenotype-and-sites` | `skeletal muscle LM`; `multinucleated peripheral`; `sarcolemma basal lamina`; `longitudinal striations` | Pending skeletal-muscle article owns the full LM phenotype and named sites. | pending |
| 6 | Q38,Q74,Q86,Q89 → `cardiac-myocyte-histologic-phenotype` | `cardiac myocyte histology`; `cardiac fiber myocytes`; `few myofibrils SR`; `myocardium muscle` | Pending cardiac-muscle article owns cell composition, branching, nuclei and organelle comparison. | pending |
| 7 | Q29,Q46,Q53,Q71,Q72 → `smooth-muscle-histologic-phenotype-and-sites` | `smooth muscle spindle`; `smooth muscle sites`; `visceral involuntary`; `blood vessel smooth muscle` | Pending smooth-muscle and comparison articles own this phenotype/site scope. | pending |
| 8 | Q5,Q12,Q14,Q35,Q42,Q51,Q55,Q59,Q82,Q95,Q96 → `sarcomere-band-line-architecture` | `sarcomere Z to Z`; `A I H M band`; `anisotropic A band`; `striations dark light` | Live `ART-MSK-TOP-B54C248DF1` owns the A/I pattern and the H-zone/M-line relationship. | live |
| 9 | Q11,Q70,Q90,Q98 → `sarcomere-band-changes-during-contraction` | `sarcomere contraction changes`; `H zone disappears`; `A band constant`; `I band shortens` | Live `ART-MSK-TOP-B54C248DF1` owns the complete change pattern without filament shortening. | live |
| 10 | Q6,Q18,Q28,Q36,Q57,Q97 → `skeletal-muscle-connective-tissue-organization` | `endomysium perimysium epimysium`; `muscle fascicle`; `cardiac delicate connective tissue`; `muscle coverings` | Live fragments cover endomysium/epimysium; the pending skeletal/comparison articles own the complete three-layer and fascicle scope. | pending |
| 11 | Q19,Q58 → `musculotendinous-junction-connective-tissue-continuity` | `musculotendinous junction`; `epimysium tendon`; `muscle collagen tendon`; `force transfer tendon` | Live `ART-MSK-TOP-B54C248DF1` explicitly owns muscle-connective-tissue continuity into tendon collagen. | live |
| 12 | Q15,Q21,Q56,Q69 → `skeletal-muscle-sarcoplasm-and-myofibril-organization` | `skeletal sarcoplasm organelles`; `myofibrils full length`; `mitochondria between myofibrils`; `glycogen myoglobin muscle` | Pending skeletal-muscle article owns the full internal organisation. | pending |
| 13 | Q7,Q9,Q24,Q87 → `intercalated-disc-components-orientation-and-functions` | `intercalated disc junctions`; `transverse component`; `lateral gap junction`; `desmosome fascia adherens` | Pending cardiac-muscle article owns both disc orientations and their mechanical/electrical functions. | pending |
| 14 | Q8,Q100 → `myocardial-infarction-fibrous-scar-repair` | `myocardial infarction fibrous`; `cardiac regeneration`; `cardiac scar`; `myocyte injury repair` | Pending cardiac-muscle article states that infarcted cardiac muscle heals by fibrous tissue. | pending; Q100 retains dangling blank `e.` |
| 15 | Q25,Q27,Q62–Q64,Q76 → `muscle-tubular-systems-t-tubules-triads-diads-sr` | `T tubule function`; `skeletal triad A-I`; `cardiac diad Z line`; `sarcoplasmic reticulum myofibrils` | Live state owns a skeletal triad fragment; pending skeletal/cardiac articles own the full comparative scope. | pending |
| 16 | Q68 → `skeletal-muscle-hypertrophy-existing-fiber-enlargement` | `skeletal hypertrophy`; `exercise fibre size`; `existing fibers enlarge`; `muscle hyperplasia` | Live `ART-MSK-TOP-B54C248DF1` states that exercise enlarges existing skeletal fibres. | live |
| 17 | Q65,Q80 → `atrial-myocyte-endocrine-anp-function` | `atrial natriuretic hormone`; `atrial granules`; `cardiac endocrine function`; `ANP diuretic` | Pending cardiac-muscle article owns atrial granules, endocrine function and urinary sodium/water effect. | pending |
| 18 | Q77,Q81,Q92 → `purkinje-fiber-histologic-identification` | `Purkinje fibre histology`; `few peripheral myofibrils`; `no striations`; `eccentric nucleus gap junctions` | Pending cardiac-muscle article owns the complete Purkinje phenotype. | pending |
| 19 | Q78 → `muscle-tissue-mesodermal-origin` | `muscle mesoderm`; `myoblast mesenchyme`; `skeletal myotome`; `smooth cardiac mesoderm` | Live state has narrower cardiac/somite derivatives; pending Histology and embryology records own the all-muscle statement. | pending |
| 20 | Q79 → `inherited-progressive-muscle-wasting-differential` | `muscular dystrophy dystrophin`; `progressive muscle wasting`; `satellite cell dystrophin`; `muscle degeneration inherited` | Exact accepted prior-LCS tested handle; pending `CON-MSK-9D01E2358A65E2` owns the disease scope. | pending; prior-LCS scope reuse |
| 21 | Q83 → `titin-z-line-to-m-line-thick-filament-anchor` | `titin Z M line`; `titin myosin anchor`; `sarcomere elastic protein`; `titin actin exception` | Pending skeletal-muscle written/concept material owns titin's span and anchoring role. | pending |
| 22 | Q85 → `myasthenia-gravis-acetylcholine-receptor-autoimmunity` | `myasthenia gravis`; `acetylcholine receptor antibody`; `respiratory failure`; `autoimmune neuromuscular` | Pending neuromuscular-junction article owns the receptor-autoantibody mechanism; prior-LCS transmission/drug handle is related but different-grain. | pending |
| 23 | Q88 → `pregnant-uterus-smooth-muscle-hypertrophy-hyperplasia` | `pregnant uterus smooth muscle`; `smooth hypertrophy hyperplasia`; `uterine size pregnancy`; `smooth muscle regeneration` | Pending smooth-muscle article explicitly owns both hypertrophy and hyperplasia in pregnancy. | pending |
| 24 | Q93 → `endocardium-inner-myocardial-lining` | `endocardium myocardium lining`; `heart wall inner layer`; `endocardial endothelium`; `subendocardial connective tissue` | Live state owns only the endothelial subfact; pending heart-wall material owns the complete inner-lining scope. | pending |
| 25 | Q94 → `epicardium-visceral-pericardium-outer-heart-layer` | `epicardium visceral pericardium`; `heart outer layer`; `mesothelium loose connective`; `epicardium myocardium` | Pending `CON-CVS-CC8835108F512C` owns the complete epicardial definition. | pending |
| 26 | Q99 → `muscle-spindle-skeletal-muscle-modification` | `muscle spindle modification`; `skeletal muscle spindle`; `muscle type modification`; `Purkinje versus spindle` | Pending Histology comparison table explicitly names muscle spindle as the skeletal-muscle modification. | pending |

Disposition arithmetic is **4 live + 22 pending + 0 external-new = 26** source-distinct
handles. There is no prior-external overlap with Family 13, so all 26 extend the separate
external-bank concept inventory. Coverage matches do not promote this explicitly external
source into eligible Helwan scope.

### Family-14 checkpoint and cumulative LCS-103 delta

| Family-14 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|
| Explicitly external assessment bank | 100 | 100 | 26 | 4 | 22 | 0 |
| Of which practical-relevant MCQs (already included above) | 1 | 1 | 1 | 0 | 1 | 0 |
| **Eligible Helwan assessment delta** | **+0** | **+0** | **+0** | **+0** | **+0** | **+0** |

The accepted eligible-module checkpoint therefore stays unchanged:

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 13 | 201 | 75 | 111 | 5 | 28 | 78 |
| Family 14 eligible delta | +0 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 14** | **201** | **75** | **111** | **5** | **28** | **78** |

The separately tracked external bank now totals:

| External-bank checkpoint | Prompt occurrences | Printed keys | Distinct handles | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|
| Family 13 Cartilage/Bone | 141 | 141 | 49 | 5 | 44 | 0 |
| Family 14 Muscle | +100 | +100 | +26 | +4 | +22 | +0 |
| **External-bank cumulative** | **241** | **241** | **75** | **9** | **66** | **0** |

Arithmetic checks: question pages give `75 + 7 + 6 + 6 + 6 = 100` starts; answer
pages give `44 + 44 + 12 = 100` printed letters; `100 - 74 = 26` source handles;
`4 + 22 + 0 = 26`; and external cumulative is `141 + 100 = 241` prompts/keys,
`49 + 26 = 75` handles and `5 + 4 = 9` live plus `44 + 22 = 66` pending.
Eligible cumulative remains `5 + 28 + 78 = 111`. The 50 auxiliary note statements,
Family 3's unresolved crop and Family 5's malformed note remain unchanged and outside both
assessment totals.

## Family 15 — Physiology Tutorial Loco-coordination 103

### Source identity, provenance and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_103bc8809c3045ada51d` |
| Manifest SHA-256 | `103bc8809c3045ada51ddac314ccd3d464bc11e846d2bbbd291e865e8d0fd9be` |
| Recomputed SHA-256 | `103bc8809c3045ada51ddac314ccd3d464bc11e846d2bbbd291e865e8d0fd9be` |
| File | `MCQs - College MCQs Physiology 103 tutorial with answers.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Physiology/Questions/MCQs/MCQs - College MCQs Physiology 103 tutorial with answers.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Physiology · Questions/MCQs · solved copy · source tier 3 |
| Source label | title slide prints `Physiology Tutorial Loco-coordination 103`, `Dr.Noha Osama`, `Lecturer of physiology`, `Faculty of Medicine`; filename's corpus label is `College MCQs`, not `External` |
| Authority decision | eligible module-specific tutorial/self-assessment evidence, lower than a sitting exam; no university name is added beyond the manifest and organised provenance |
| Container | 23-page, unencrypted, non-interactive 720 × 540 pt landscape PDF with a native text layer |
| Read method | all 23 physical pages rendered at 160 dpi and visually read source-first; native text used only to cross-check wording; no download |

Pages 1–9 are teaching slides, p. 10 introduces an `MCQ Quiz (Multiple Choice Questions
And Answers)`, pp. 11–16 contain six highlighted MCQ slides, p. 17 is an action-potential
divider, pp. 18–22 contain five highlighted MCQ slides, and p. 23 is a closing image. The
source prints no question numbers, so Q1–Q11 below are ledger labels assigned in physical
slide order. Every MCQ has exactly one translucent green highlight over an option. Because
the source identifies itself as `with answers` and the highlighting is systematic and
digitally embedded, these are **11 printed keys**, not reader handwriting.

Q4 on p. 14 and Q6 on p. 16 are different prompt forms testing the same length–tension
relationship: Q4 highlights `b`, `Contraction strength is related to initial length`, while
Q6 asks which skeletal-muscle-contraction statement is not correct and highlights `c`, `No
relation between the muscle length and the force of contraction`. Both occurrences and
both printed keys are retained, then semantically collapsed to one concept. Q7 on p. 18 is
a distinct all-or-none nerve-trunk question with highlighted option `c`; there is no exact
prompt repeat in this source.

Source wording is preserved rather than repaired: Q2 asks which `muscles` calmodulin is
most closely related to; Q4 prints `Skeletalmuscle`; Q7 prints `In all or non rule`; and Q11
prints `Salutatory conduction`. Q7's and Q10's printed keys are recorded without correction
even where the pending physiology material makes the keyed proposition medically
contestable.

### Page-by-page assessment, teaching and key inventory

| Physical page | Visible content | Assessment prompts | Printed keys | Classification |
|---:|---|---:|---:|---|
| 1 | tutorial title and lecturer credit | 0 | 0 | provenance |
| 2 | `Refresh your mind` stock image | 0 | 0 | divider |
| 3 | motor-neuron-pool and motor-unit definitions | 0 | 0 | teaching |
| 4 | excitation–contraction coupling title/image | 0 | 0 | divider |
| 5 | first three neuromuscular-junction/coupling steps | 0 | 0 | teaching |
| 6 | cross-bridge-cycle image | 0 | 0 | teaching image only |
| 7 | `What is the function of smooth muscle fibers?` plus calmodulin/MLCK note | 0 | 0 | teaching self-check, not assessment |
| 8 | single-unit versus multi-unit smooth-muscle coordination | 0 | 0 | teaching |
| 9 | single-unit versus multi-unit properties and sites | 0 | 0 | teaching |
| 10 | MCQ quiz divider | 0 | 0 | divider |
| 11 | Q1 involuntary muscle types | 1 | 1 (`b`) | keyed MCQ |
| 12 | Q2 calmodulin and smooth muscle | 1 | 1 (`a`) | keyed MCQ |
| 13 | Q3 excitation–contraction-coupling exception | 1 | 1 (`a`) | keyed MCQ |
| 14 | Q4 skeletal-muscle length and contraction strength | 1 | 1 (`b`) | keyed MCQ |
| 15 | Q5 tropomyosin function at rest | 1 | 1 (`b`) | keyed MCQ |
| 16 | Q6 skeletal-muscle contraction / length–force false statement | 1 | 1 (`c`) | keyed MCQ; semantic repeat of Q4 |
| 17 | action-potential divider | 0 | 0 | divider |
| 18 | Q7 all-or-none rule / nerve-trunk proposition | 1 | 1 (`c`) | distinct keyed MCQ |
| 19 | Q8 depolarisation and sodium permeability | 1 | 1 (`a`) | keyed MCQ |
| 20 | Q9 nerve resting membrane potential | 1 | 1 (`b`) | keyed MCQ |
| 21 | Q10 repolarisation | 1 | 1 (`b`) | keyed MCQ |
| 22 | Q11 saltatory conduction | 1 | 1 (`c`) | keyed MCQ |
| 23 | `Thank you` closing image | 0 | 0 | closing |
| **Family 15 assessment** | **all pages** | **11** | **11** | **eligible keyed tutorial MCQs** |

There is no practical task, slide-identification item, specimen, trace interpretation or
stand-alone written assessment. The p. 7 question is a teaching-heading self-check before
the MCQ divider and remains outside assessment counts. Teaching slides contribute five
source-distinct context handles: `motor-neuron-pool-definition`, `motor-unit-definition`,
`neuromuscular-junction-transmission`, `smooth-muscle-contraction-regulation`, and
`single-vs-multiunit-smooth-muscle-coordination`. The latter three are already pending and
the first two are supported by pending motor-unit material; none is added to tested-concept
or the 50 Anatomy/Pathology auxiliary-note totals.

### One-to-one assignment, search and disposition ledger

Every MCQ occurrence is assigned exactly once. Eleven prompt/key occurrences collapse to
nine source-distinct tested handles: Q3/Q5 share the accepted coupling scope, and Q4/Q6 are
opposite-polarity forms of the same length–tension relationship, giving `11 - 2 = 9`. Q7
alone carries the all-or-none nerve-trunk handle. Six handles reuse accepted prior-LCS
physiology concepts; three are new to LCS. Neither the Family 13 nor Family 14 external bank
contains a same-scope handle, and its separate totals therefore do not change.

Each of the nine handles received one search in each required surface: live state
(`server/data` and `src/data`), pending state (`docs/import-ready` and
`docs/questions-import-ready`), every prior `docs/*-Source-Imports` lane, and accepted prior
LCS. That is **9 × 4 = 36 required invocations**. One terminology/phrase-order follow-up
per handle gives **45 total invocations**.

| # | Prompt assignment → handle | Four-query bundle | Prior-LCS / external / corpus result | Disposition |
|---:|---|---|---|---|
| 1 | Q1 → `muscle-type-physiology-comparison` | `involuntary muscle types`; `cardiac smooth involuntary`; `skeletal voluntary`; `muscle action comparison` | Exact accepted Family-3 handle; pending comparison material owns the scope. No external-bank same-scope handle. | pending; prior-LCS reuse |
| 2 | Q2 → `smooth-muscle-contraction-regulation` | `calmodulin smooth muscle`; `myosin light chain kinase`; `smooth calcium regulation`; `troponin calmodulin comparison` | Exact accepted Family-3 handle; pending smooth-muscle article owns calmodulin–MLCK regulation. Family-14 dense-body/caveolae morphology is different-grain. | pending; prior-LCS reuse |
| 3 | Q3,Q5 → `skeletal-muscle-excitation-contraction-coupling` | `excitation contraction coupling`; `tropomyosin actin binding site`; `T tubule calcium`; `cross bridge ATP` | Exact accepted Family-3 handle; pending coupling article owns both the sequence and tropomyosin sub-objective. Family-14 tubular-system Histology handle is different-grain. | pending; prior-LCS reuse |
| 4 | Q4,Q6 → `skeletal-muscle-length-tension-relationship` | `skeletal length tension`; `initial muscle length force`; `optimal sarcomere length`; `filament overlap tension` | Pending `103-BMS-physiology` material owns the curve and overlap mechanism; no prior-LCS or external-bank same-scope handle. Q4 states the positive relation and Q6 negates it, so these are a semantic collapse, not an exact repeat. | pending; new to LCS |
| 5 | Q7 → `all-or-none-rule-excitable-tissues` | `all or none rule`; `threshold maximal response`; `nerve trunk graded`; `single fibre all or none` | Pending AU/Kasr concepts own the single-fibre rule and nerve-trunk exception. No prior-LCS tested or external-bank match. The printed `c` key is preserved although the pending material states that a nerve trunk is graded. | pending; new to LCS |
| 6 | Q8 → `membrane-sodium-conductance-events` | `depolarization sodium permeability`; `Na influx action potential`; `voltage gated sodium`; `potassium efflux depolarization` | Exact accepted Family-3 handle; pending nerve-action-potential material owns the sodium-permeability event. | pending; prior-LCS reuse |
| 7 | Q9 → `resting-membrane-potential` | `resting membrane potential`; `selective membrane permeability`; `Na K pump RMP`; `nerve RMP ions` | Exact accepted Family-3 handle. Its accepted pending disposition is retained; a narrower live diffusion statement does not replace the full mechanism scope. | pending; prior-LCS reuse |
| 8 | Q10 → `nerve-action-potential` | `nerve repolarization`; `sodium channel inactivation`; `potassium efflux`; `action potential phases` | Exact accepted Family-3 handle; pending action-potential article owns depolarisation/repolarisation. Printed key `b` is preserved without repair. | pending; prior-LCS reuse |
| 9 | Q11 → `saltatory-conduction-nodes-of-ranvier` | `saltatory conduction`; `node to node`; `myelinated nerve`; `120 meter second` | Pending Kasr/AU saltatory-conduction concepts own node-restricted regeneration, speed and energy economy; no prior-LCS or external-bank same-scope handle. | pending; new to LCS |

Disposition arithmetic is **0 live + 9 pending + 0 new = 9** source-distinct handles.
Within those nine, `6 prior-LCS reuse + 3 new-to-LCS = 9`. Corpus disposition and module
novelty are separate dimensions: the three new-to-LCS handles already have pending coverage,
so none is a content-new mint candidate.

### Family-15 checkpoint and cumulative LCS-103 delta

| Family-15 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior-LCS handle reuse | 7 | 7 | 6 | 0 | 0 | 0 | 0 |
| New-to-LCS pending handles | 4 | 4 | 3 | 3 | 0 | 3 | 0 |
| **Family 15 assessment** | **11** | **11** | **9** | **3** | **0** | **3** | **0** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 14 | 201 | 75 | 111 | 5 | 28 | 78 |
| Family 15 net delta | +11 | +11 | +3 | +0 | +3 | +0 |
| **LCS-103 cumulative after Family 15** | **212** | **86** | **114** | **5** | **31** | **78** |

Arithmetic checks: `6 + 5 = 11` assessment slides; `11` systematic highlights give 11
printed keys; the Q3/Q5 coupling collapse and Q4/Q6 length–tension collapse give `11 - 2 =
9` source handles, with no exact prompt repeat; `6 prior-LCS + 3 new-to-LCS = 9`; `0 + 9 +
0 = 9`; `201 + 11 = 212`; `75 + 11 = 86`; `111 + 3 = 114`; and `5 + 31 + 78 = 114`.
The external-bank cumulative stays separately unchanged at
`241 prompts / 241 keys / 75 handles = 9 live / 66 pending / 0 new`. The 50 auxiliary
Anatomy/Pathology notes and the two previously tracked malformed/unresolved items are also
unchanged.

## Family 16 — Loco-cordination 103 quick revision

### Source identity, provenance and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_5328082a807132f5cb29` |
| Manifest SHA-256 | `5328082a807132f5cb293ed83e5492fa1920ec89dfc511ad2258d87086a418e9` |
| Recomputed SHA-256 | `5328082a807132f5cb293ed83e5492fa1920ec89dfc511ad2258d87086a418e9` |
| File | `MCQs - College MCQs 103 quick revision with answers.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - College MCQs 103 quick revision with answers.pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · All Subjects · Questions/MCQs · solved · tier 3 |
| Source label | printed title `Loco-cordination 103` and closing credit `Dr.Noha Osama`; filename's `College MCQs` label is not an explicit `External` label |
| Authority decision | eligible module-specific revision/self-assessment evidence, lower than a sitting or department exam; no institution is inferred beyond manifest provenance |
| Paired-copy rule | manifest-preferred member of the three-file quick-revision pair/name-twin set; the two companion files are not separately counted |
| Container | three-page, unencrypted, non-interactive 612 × 792 pt PDF with a native text layer |
| Read method | all three pages rendered at 180 dpi and visually read source-first; native text used only to cross-check wording; no download |

The opening instruction says to choose an answer from the following MCQs. Q1–Q19 each have
exactly one digitally printed underline beneath an answer option. The filename says `with
answers`, and the underlining is systematic, so these are **19 printed keys**: `1-d, 2-a,
3-b, 4-c, 5-a, 6-c, 7-b, 8-c, 9-c, 10-c, 11-c, 12-c, 13-c, 14-c, 15-a, 16-a,
17-c, 18-a, 19-c`. The underlined title and the underlined `Don't forget` headings on p. 3
are formatting, not answer marks.

Q20 and Q21 are numbered teaching reminders, not questions: they have no interrogative,
response blank or option set. Q20 contributes six visible osteoporosis/calcium/osteoblast/
osteoclast statements and Q21 contributes three potassium-disorder statements. These nine
teaching statements remain outside assessment counts and outside the 50 Anatomy/Pathology
image-note statements. Source wording such as `Loco-cordination`, `bone remolding`, `forum`,
`kalemia` and `muscle weakens` is preserved without repair.

### Page, assessment-type and subject inventory

| Physical page | Visible source units | MCQ prompts | Printed keys | Teaching-only statements | Classification |
|---:|---|---:|---:|---:|---|
| 1 | Q1–Q6 | 6 | 6 | 0 | keyed assessment |
| 2 | Q7–Q15 | 9 | 9 | 0 | keyed assessment |
| 3 | Q16–Q19; numbered reminders Q20–Q21 | 4 | 4 | 9 | keyed assessment followed by teaching context |
| **Family 16** | **all pages** | **19** | **19** | **9** | **eligible keyed revision MCQs; teaching kept separate** |

At primary-subject grain, 16 assessment occurrences are Physiology (Q1–Q11, Q13 and
Q16–Q19), one is integrated bone Pathology/Pharmacology (Q12), and two are
neuromuscular Pharmacology (Q14–Q15). This is a source-first split of an `All Subjects`
container, not a change to manifest placement. There is no practical, specimen, image,
trace, table, completion item or stand-alone written assessment.

There is no exact repeat within the source. Nine repeated concept assignments collapse 19
occurrences to ten handles: Q1/Q17 share contraction-type comparison; Q2/Q6/Q8/Q9/Q19
share skeletal coupling; Q3/Q4 share muscle-type comparison; Q7/Q10 share length–tension;
and Q14/Q15/Q18 share neuromuscular transmission. Across families, Q3, Q5, Q7 and Q10 are
exact or formatting-only repeats of Family-15 Q1, Q2, Q4 and Q6 respectively. Their prompt
and key occurrences remain counted, but their accepted concepts do not re-enter the module
delta.

### One-to-one assignment, search and disposition ledger

Every one of the 19 MCQs is assigned exactly once below. Each of the ten handles received
one search in each required surface: live state (`server/data` and `src/data`), pending state
(`docs/import-ready` and `docs/questions-import-ready`), every prior
`docs/*-Source-Imports` lane, and accepted prior LCS. That is **10 × 4 = 40 required
invocations**. Twelve narrower phrase and scope checks for the contraction, remodelling,
smooth-muscle and hypertrophy ambiguities give **52 search invocations total**. Manifest
snippets from the paired copies are provenance hits, not semantic coverage.

| # | Prompt assignment → handle | Four-query bundle | Prior-LCS / external / corpus result | Disposition |
|---:|---|---|---|---|
| 1 | Q1,Q17 → `isometric-vs-isotonic-contraction-comparison` | `isometric isotonic`; `standing posture contraction`; `isotonic energy`; `mechanical efficiency muscle` | Live mechanical-muscle material has narrower facts, but not the keyed posture/energy comparison. Pending `103-BMS-physiology` owns the seven-property comparison, including posture, work, energy and efficiency. No prior-LCS or external-bank same-scope handle. | pending; new to eligible LCS |
| 2 | Q2,Q6,Q8,Q9,Q19 → `skeletal-muscle-excitation-contraction-coupling` | `excitation contraction coupling`; `sarcoplasmic calcium removal`; `T tubule spread`; `troponin ryanodine receptor` | Exact accepted Family-3/15 handle; pending coupling material owns calcium release/reuptake, T-tubule propagation, troponin and ryanodine-channel scope. | pending; prior-LCS reuse |
| 3 | Q3,Q4 → `muscle-type-physiology-comparison` | `involuntary muscle types`; `smooth skeletal comparison`; `smooth muscle fatigue`; `cardiac smooth involuntary` | Exact accepted Family-3/15 handle; pending comparison material owns action and fatigue resistance. Q3 is a cross-family repeat of Family-15 Q1. | pending; prior-LCS reuse |
| 4 | Q5 → `smooth-muscle-contraction-regulation` | `calmodulin smooth muscle`; `MLCK`; `smooth contraction regulation`; `troponin calmodulin comparison` | Exact accepted Family-3/15 handle and cross-family repeat of Family-15 Q2; pending smooth-muscle material owns calmodulin–MLCK regulation. | pending; prior-LCS reuse |
| 5 | Q7,Q10 → `skeletal-muscle-length-tension-relationship` | `skeletal length tension`; `initial muscle length`; `muscle length force`; `filament overlap tension` | Exact accepted Family-15 handle. Q7 states the positive relation and Q10 negates it; both are cross-family repeats of Family-15 Q4/Q6 and collapse semantically here. | pending; prior-LCS reuse |
| 6 | Q11 → `nerve-action-potential` | `absolute refractory period`; `sodium channel inactivation`; `normal increased excitability`; `nerve action potential phases` | Exact accepted Family-3 handle; pending action-potential material owns the absolute-refractory sodium-inactivation mechanism. | pending; prior-LCS reuse |
| 7 | Q12 → `glucocorticoid-induced-osteoporosis` | `cortisone osteoporosis`; `glucocorticoid bone loss`; `bone remodelling steroid`; `osteoporosis calcitonin` | Prior LCS and pending records own narrower remodelling, demographic-risk and calcitonin fragments, but no substantive live, pending, external-bank or prior-LCS record owns the steroid-induced osteoporosis scope tested by the printed `c` key. | new; new to eligible LCS |
| 8 | Q13 → `visceral-smooth-muscle-properties` | `single unit smooth muscle`; `multiple unit innervation`; `smooth muscle gap junctions`; `visceral smooth muscle` | Exact accepted Family-3 handle already owns single-unit syncytial spread and gap-junction behaviour; Family-15 teaching context adds no separate tested concept. | pending; prior-LCS reuse |
| 9 | Q14,Q15,Q18 → `neuromuscular-junction-transmission` | `motor end plate nicotinic`; `acetylcholine receptor blocker`; `presynaptic calcium channel`; `neurotransmitter release muscle` | Exact accepted Family-3 handle; pending NMJ material owns nicotinic-receptor activation/blockade and presynaptic calcium-dependent transmitter release. | pending; prior-LCS reuse |
| 10 | Q16 → `skeletal-muscle-hypertrophy-existing-fiber-enlargement` | `skeletal muscle hypertrophy`; `exercise enlarges existing fibers`; `weight training muscle mass`; `fiber size versus number` | Exact Family-14 external-bank handle and substantive live concept `CON-MSK-0BE756765378A6` state that exercise enlarges existing fibres. This eligible prompt promotes the scope into eligible LCS totals without altering the external bank. | live; new to eligible LCS, external-bank overlap |

Source-disposition arithmetic is **1 live + 8 pending + 1 new = 10** handles. Module
novelty is a separate dimension: seven handles reuse eligible prior-LCS tested scope and
three are new to eligible totals. Those three resolve as one live hypertrophy handle, one
pending contraction-comparison handle and one new glucocorticoid-osteoporosis handle.

### Family-16 checkpoint and cumulative LCS-103 delta

| Family-16 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS handle reuse | 15 | 15 | 7 | 0 | 0 | 0 | 0 |
| New-to-eligible pending comparison | 2 | 2 | 1 | 1 | 0 | 1 | 0 |
| External-bank handle promoted by eligible evidence | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| New corpus handle | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
| **Family 16 assessment** | **19** | **19** | **10** | **3** | **1** | **1** | **1** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 15 | 212 | 86 | 114 | 5 | 31 | 78 |
| Family 16 net delta | +19 | +19 | +3 | +1 | +1 | +1 |
| **LCS-103 cumulative after Family 16** | **231** | **105** | **117** | **6** | **32** | **79** |

Arithmetic checks: `6 + 9 + 4 = 19` MCQs and printed keys; `19 - 9 repeated concept
assignments = 10` source handles; `7 prior eligible + 3 new to eligible = 10`; `1 + 8 + 1
= 10`; `212 + 19 = 231`; `86 + 19 = 105`; `114 + 3 = 117`; and `6 + 32 + 79 =
117`. The explicit external-bank checkpoint stays separately unchanged at `241 prompts /
241 keys / 75 handles = 9 live / 66 pending / 0 new`. The 50 Anatomy/Pathology auxiliary
notes, Family 3's unresolved crop and Family 5's malformed note also remain unchanged. The
nine Family-16 teaching statements are separately reported context, not assessment or
auxiliary-note delta.

## Exact next debt

- The two named rank-5 solved tutorial/revision sources are fully inventoried as eligible,
  lower-authority evidence; the two non-preferred quick-revision companions remain excluded
  from additive counts unless a later reconciliation proves unique source material.
- The next evidence-ranked local rank-5 source is `src_23d4ed4d5e4f3f7c9764`,
  `MCQs - College MCQs LCS Q-BANK (PATHO).pdf` (37 pages, native text, tier 3). Its manifest
  first-page snippet identifies `LCS QUESTIONS BANK` / `Dr. Hebatallah Amin`,
  making it the next direct, non-external Pathology question-bank family for source-first
  prompt/key review.
- No S2 work is authorised until ranks 1–6 are consolidated and `/root` issues the literal
  `TRIAGE APPROVED` for Helwan Year 1.

## Family 17 — Pathology LCS question bank, Q1–Q24

### Source identity, authority and bounded read

| Field | Verified value |
|---|---|
| Manifest source | `src_23d4ed4d5e4f3f7c9764` |
| Manifest SHA-256 | `23d4ed4d5e4f3f7c9764477023894a609c7c4520e3129a7f50fb6c24efe6f1fc` |
| Recomputed SHA-256 | `23d4ed4d5e4f3f7c9764477023894a609c7c4520e3129a7f50fb6c24efe6f1fc` |
| File | `MCQs - College MCQs LCS Q-BANK (PATHO).pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Pathology/Questions/MCQs/MCQs - College MCQs LCS Q-BANK (PATHO).pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Pathology · Questions/MCQs · question bank · tier 3 |
| Printed provenance | cover prints `LCS QUESTIONS BANK`, `Made by : Dr. Hebatallah Amin`, and `Collected by : Eyad Ahmed & Eman Hefny` |
| Authority decision | eligible direct LCS Pathology question-bank evidence; lower than a sitting or department book, but not labelled `External`; no university or official-exam status is inferred beyond manifest placement |
| Container | 37-page, unencrypted, non-interactive PDF 1.7; 612 × 865.543 pt; native text layer; no form or JavaScript |
| This bounded family | physical p. 1 cover; Q1–Q24 across physical pp. 2–11; their printed key entries on physical p. 35 |
| Read method | all 11 relevant source pages and the first key page rendered at 160 dpi and visually read; native text used only to cross-check wording; no download |

The source has a clean three-part question/key structure: Q1–Q24 map to key p. 35,
Q25–Q50 map to key p. 36, and Q51–Q77 map to key p. 37. Family 17 therefore stops at
the first natural key boundary. Physical p. 11 contains all of Q23 and Q24, then begins
Q25; that next question is excluded rather than counted as a cropped Family-17 prompt.

All 24 in-scope questions are complete five-option MCQs. Physical p. 35 prints one answer
letter and answer text for each of Q1–Q24, so the family contributes **24 printed keys**.
There is no handwriting, circling, highlighting or annotation on the question pages. The
cover is provenance evidence and p. 35 is a key page; neither is teaching material or an
assessment prompt. There is no practical, specimen, image/trace interpretation, table,
completion or stand-alone written item in this bounded section.

### Page and key inventory

| Physical page | Complete prompt starts / visible continuation | MCQ prompts counted | Printed keys counted |
|---:|---|---:|---:|
| 1 | cover | 0 | 0 |
| 2 | Q1–Q3 (Q3 options continue) | 3 | 0 |
| 3 | Q3 option E; Q4–Q5 (Q5 options continue) | 2 | 0 |
| 4 | Q5 options D–E; Q6–Q8 (Q8 options continue) | 3 | 0 |
| 5 | Q8 options B–E; Q9–Q10 (Q10 options continue) | 2 | 0 |
| 6 | Q10 options B–E; Q11–Q12 (Q12 options continue) | 2 | 0 |
| 7 | Q12 options C–E; Q13–Q15 (Q15 stem continues) | 3 | 0 |
| 8 | Q15 continuation/options; Q16–Q17 (Q17 options continue) | 2 | 0 |
| 9 | Q17 options C–E; Q18–Q19 | 2 | 0 |
| 10 | Q20–Q22 (Q22 stem continues) | 3 | 0 |
| 11 | Q22 continuation/options; Q23–Q24; excluded Q25 start | 2 | 0 |
| 35 | printed `KEY ANSWERS` entries 1–24 | 0 | 24 |
| **Family 17** | **Q1–Q24 plus matched key section** | **24** | **24** |

The printed key sequence is `B E A D B A B A B B B D B C B E A D A C C E D B`.
S1 preserves the source rather than repairing it. In particular: Q1 uses “more than 2
standard deviations” rather than a conventional diagnostic threshold; Q15 asks for the
“confirmatory diagnosis” while keying the investigation `MRI showing disc protrusion`;
Q18 keys `Leukemia` for a secondary-gout malignancy association; Q20 keys
`Corticosteroids` as the single “best treatment” after a decade of rheumatoid disease; and
Q23 changes the female patient's pronoun to `his`. All remain complete keyed source records,
with those wording or clinical-quality risks flagged for later review.

### One-to-one prompt assignment and collapse ledger

Every observed MCQ occurrence is assigned exactly once. There is no exact repeated full
prompt. Five semantic repetitions collapse the 24 occurrences to 19 source-distinct
handles: Q1/Q23 are osteoporosis diagnosis/fragility presentations; Q4/Q5/Q21 are a single
myeloma diagnostic pattern; Q12/Q15 are the same disc-prolapse vignette asking diagnosis
then confirmation; and Q18/Q22 are the same gout presentation asking the malignant
association then the expected urate abnormality. Q13 and Q19 reuse two already-counted
eligible Family-12 handles; their prompt/key occurrences remain counted but their concepts
do not re-enter the module delta.

| Evidence | One-to-one assignment in source order |
|---|---|
| Q1–Q6 | `Q1→osteoporosis-density-and-fragility-diagnosis`; `Q2→fracture-nonunion-risk-poor-alignment`; `Q3→aneurysmal-bone-cyst-clinicoradiologic-pattern`; `Q4→multiple-myeloma-clinical-diagnostic-pattern`; `Q5→multiple-myeloma-clinical-diagnostic-pattern`; `Q6→osteoid-osteoma-clinicoradiologic-pattern` |
| Q7–Q12 | `Q7→fibrosarcoma-herringbone-spindle-cell-pattern`; `Q8→lumbar-disc-prolapse-cauda-equina-compression`; `Q9→hyperthyroidism-secondary-osteoporosis`; `Q10→diabetic-foot-ulcer-secondary-osteomyelitis`; `Q11→carpal-tunnel-syndrome-surgical-treatment`; `Q12→lumbar-disc-prolapse-clinical-diagnosis-and-mri-confirmation` |
| Q13–Q18 | `Q13→sunburst-periosteal-lifting-bone-tumor-differential`; `Q14→multiple-myeloma-prognosis-beta2-microglobulin`; `Q15→lumbar-disc-prolapse-clinical-diagnosis-and-mri-confirmation`; `Q16→osteogenesis-imperfecta-type-I-collagen`; `Q17→postmenopausal-high-turnover-osteoporosis`; `Q18→malignancy-associated-gout-hyperuricemia` |
| Q19–Q24 | `Q19→chondrosarcoma-vs-osteosarcoma-comparison`; `Q20→rheumatoid-arthritis-treatment-corticosteroids`; `Q21→multiple-myeloma-clinical-diagnostic-pattern`; `Q22→malignancy-associated-gout-hyperuricemia`; `Q23→osteoporosis-density-and-fragility-diagnosis`; `Q24→carpal-tunnel-associated-conditions-exception` |

The Q19 assignment extends the accepted comparison handle with the keyed chondrosarcoma
diagnostic pattern; it does not assert that the Family-17 prompt itself asks for a
comparison. Q6 and Q16 promote/extend prior auxiliary-only osteoid-osteoma and
osteogenesis-imperfecta evidence into eligible assessment concepts, so both enter the
tested-concept delta once.

### Search-before-mint and disposition ledger

Each of the 19 handles received one search in each required surface: live state
(`server/data` and `src/data`), pending state (`docs/import-ready` and
`docs/questions-import-ready`), every prior source-import lane, and accepted prior LCS.
That is **19 × 4 = 76 required invocations**. Eleven narrower scope/phrase follow-ups for
fracture alignment, myeloma, diabetic osteomyelitis, disc imaging, carpal-tunnel treatment,
secondary osteoporosis and prognostic wording give **87 search invocations total**.
Taxonomy-only leaves and question-option mentions are not substantive coverage.

| # | Prompt assignment → handle | Four-query bundle | Corpus / prior-LCS result | Disposition |
|---:|---|---|---|---|
| 1 | Q1,Q23 → `osteoporosis-density-and-fragility-diagnosis` | `osteoporosis densitometry`; `low bone mass`; `fragility fracture`; `bone resorption exceeds formation` | Pending `CON-MSK-89674D65B2316B` and its Histology article own progressive density loss, fracture risk and excess resorption. Prior LCS has demographic, glucocorticoid and algorithm scopes, not this tested diagnosis handle. | pending; new to eligible LCS |
| 2 | Q2 → `fracture-nonunion-risk-poor-alignment` | `fracture nonunion`; `poor alignment`; `malalignment healing`; `mechanical stability union` | Pending fractured-neck records own vascular nonunion, and Histology owns callus biology, but neither makes poor alignment the risk mechanism. | new |
| 3 | Q3 → `aneurysmal-bone-cyst-clinicoradiologic-pattern` | `aneurysmal bone cyst`; `expansile lytic lesion`; `blood filled bone cyst`; `reactive rim metaphysis` | No substantive live, pending, external-bank or prior-LCS same-scope record. | new |
| 4 | Q4,Q5,Q21 → `multiple-myeloma-clinical-diagnostic-pattern` | `multiple myeloma CRAB`; `M spike`; `lytic bone lesions`; `plasma cell marrow tumor` | Pending `ART-108-PAT-AMYLOIDOSIS` identifies myeloma as a marrow plasma-cell tumour with extensive bone erosion and monoclonal immunoglobulin/light-chain production; it can absorb the diagnostic cluster. Prior LCS's primary-bone-tumour ranking note is narrower. | pending; new to eligible LCS |
| 5 | Q6 → `osteoid-osteoma-clinicoradiologic-pattern` | `osteoid osteoma`; `nocturnal pain NSAID`; `radiolucent nidus`; `sclerotic bone under 1 cm` | Exact prior auxiliary disease handle supplies pain/size/site clues but was outside tested totals; no substantive live or pending record owns the full pattern. | prior-LCS auxiliary promotion; new |
| 6 | Q7 → `fibrosarcoma-herringbone-spindle-cell-pattern` | `fibrosarcoma`; `herringbone pattern`; `uniform spindle cells`; `malignant fibroblast fascicles` | Live `CON-DER-78AF0815FE7330` exactly owns fibrosarcoma spindle-cell fascicles in a herringbone pattern. | live; new to eligible LCS |
| 7 | Q8 → `lumbar-disc-prolapse-cauda-equina-compression` | `cauda equina`; `urinary retention back pain`; `disc prolapse emergency`; `lumbosacral root compression` | Pending disc records teach general nerve-root compression but do not own the cauda-equina/urinary-retention syndrome. | new |
| 8 | Q9 → `hyperthyroidism-secondary-osteoporosis` | `hyperthyroidism osteoporosis`; `thyrotoxicosis bone loss`; `secondary osteoporosis`; `thyroid excess bone turnover` | Searches return only osteoporosis/thyroid taxonomy or unrelated scopes; no substantive same-scope record. | new |
| 9 | Q10 → `diabetic-foot-ulcer-secondary-osteomyelitis` | `diabetic foot ulcer`; `diabetes osteomyelitis`; `contiguous bone infection`; `heel ulcer bone complication` | Osteomyelitis records are pathogen, chronic-morphology or amyloidosis contexts; none owns diabetic-foot contiguous spread. | new |
| 10 | Q11 → `carpal-tunnel-syndrome-surgical-treatment` | `carpal tunnel release`; `endoscopic decompression`; `refractory carpal tunnel`; `median nerve surgery` | Pending Anatomy owns carpal-tunnel causes, sensory/motor findings and deformity, but no treatment or release procedure. | new |
| 11 | Q12,Q15 → `lumbar-disc-prolapse-clinical-diagnosis-and-mri-confirmation` | `lumbar prolapsed nucleus pulposus`; `straight leg raise sciatica`; `disc protrusion MRI`; `radiating back pain` | Pending `CON-MSK-9C7E37FE296254` and its article own nucleus-pulposus herniation, radiating root pain and disc-prolapse diagnosis; extend for the source's MRI confirmation wording. | pending; new to eligible LCS |
| 12 | Q13 → `sunburst-periosteal-lifting-bone-tumor-differential` | `sunburst pattern`; `periosteal lifting`; `Codman triangle`; `osteosarcoma radiology` | Exact accepted Family-12 tested handle; Family-17 adds a printed osteosarcoma key. No substantive live/pending record supersedes its inherited new disposition. | prior eligible-LCS reuse; inherited new |
| 13 | Q14 → `multiple-myeloma-prognosis-beta2-microglobulin` | `beta 2 macroglobulin`; `myeloma prognosis`; `myeloma staging`; `albumin plasma cell prognosis` | No substantive live, pending, external-bank or prior-LCS prognostic/staging record. | new |
| 14 | Q16 → `osteogenesis-imperfecta-type-I-collagen` | `osteogenesis imperfecta`; `type I collagen`; `lethal fetal fractures`; `brittle bone mutation` | Prior LCS auxiliary clinical-features evidence and a separate Helwan BMS triage handle are related, but neither is counted substantive tested coverage; generic collagen records do not own the disease link. | prior-LCS auxiliary promotion/extension; new |
| 15 | Q17 → `postmenopausal-high-turnover-osteoporosis` | `high turnover osteoporosis`; `postmenopausal osteoporosis`; `low estrogen bone loss`; `osteoclast resorption menopause` | Pending Alexandria osteoporosis material owns postmenopausal oestrogen loss and accelerated resorption; extend it for the high-turnover label. Prior LCS demographic note was auxiliary only. | pending; new to eligible LCS |
| 16 | Q18,Q22 → `malignancy-associated-gout-hyperuricemia` | `secondary metabolic gout`; `leukemia purine catabolism`; `tophi needle crystals`; `serum uric acid` | Live `CON-REN-B9E0531973510E` states that cancer/leukaemia cause secondary metabolic gout through purine catabolism; live gout/tophi and urate material supplies the presentation/laboratory side. | live; new to eligible LCS |
| 17 | Q19 → `chondrosarcoma-vs-osteosarcoma-comparison` | `chondrosarcoma`; `popcorn calcification`; `chondroid matrix`; `chondrosarcoma osteosarcoma comparison` | Exact accepted Family-12 tested comparison handle can absorb the chondrosarcoma morphology and keyed diagnosis. | prior eligible-LCS reuse; inherited new |
| 18 | Q20 → `rheumatoid-arthritis-treatment-corticosteroids` | `rheumatoid arthritis corticosteroids`; `RA treatment`; `erosive inflammatory arthritis therapy`; `glucocorticoid rheumatoid` | Prior LCS owns an unkeyed clinical/aetiology differential, while pending Pathology mentions RA only as an autoimmune/fibrinoid-necrosis example. No treatment record owns the printed key. | new; printed key requires review |
| 19 | Q24 → `carpal-tunnel-associated-conditions-exception` | `carpal tunnel association`; `pregnancy carpal tunnel`; `thyroid diabetes carpal tunnel`; `diabetes insipidus exception` | Pending Anatomy lists local mechanical causes and owns syndrome findings, but not the systemic association/exception set. | new |

Source-disposition arithmetic is **2 live + 4 pending + 13 new = 19** source-distinct
handles. Two of those 13 new-disposition handles are already-counted eligible Family-12
concepts, so module novelty is separate: **2 prior eligible reuse + 17 new to eligible =
19**. The 17 net concepts resolve as **2 live + 4 pending + 11 new**.

### Family-17 checkpoint and cumulative LCS-103 delta

| Family-17 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS handle reuse (Q13, Q19) | 2 | 2 | 2 | 0 | 0 | 0 | 0 |
| New-to-eligible live handles | 3 | 3 | 2 | 2 | 2 | 0 | 0 |
| New-to-eligible pending handles | 8 | 8 | 4 | 4 | 0 | 4 | 0 |
| New-to-eligible new handles | 11 | 11 | 11 | 11 | 0 | 0 | 11 |
| **Family 17 assessment** | **24** | **24** | **19** | **17** | **2** | **4** | **11** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 16 | 231 | 105 | 117 | 6 | 32 | 79 |
| Family 17 net delta | +24 | +24 | +17 | +2 | +4 | +11 |
| **LCS-103 cumulative after Family 17** | **255** | **129** | **134** | **8** | **36** | **90** |

Arithmetic checks: `3 + 2 + 3 + 2 + 2 + 3 + 2 + 2 + 3 = 22` prompt starts on
physical pp. 2–10, plus Q23 and Q24 on p. 11 give 24 unique numbered prompts. The five
semantic repeats give `24 - 5 = 19` handles; `2 + 4 + 13 = 19`; `2 prior eligible + 17
new to eligible = 19`; `2 + 4 + 11 = 17`; `231 + 24 = 255`; `105 + 24 = 129`; `117
+ 17 = 134`; and `8 + 36 + 90 = 134`. The external-bank checkpoint remains separately
unchanged at `241 prompts / 241 keys / 75 handles = 9 live / 66 pending / 0 new`. The 50
Anatomy/Pathology auxiliary notes, Family 3's unresolved crop, Family 5's malformed note and
Family 16's nine teaching statements also remain unchanged.

## Exact next debt

- Continue the same local source at the next natural section: complete Q25–Q50, beginning
  on physical p. 11 and ending on physical p. 22, matched only to printed key entries
  25–50 on physical p. 36. Expected bounded inventory before visual verification is 26 MCQs
  and 26 printed key entries.
- The final section after that is Q51–Q77 with printed key entries 51–77 on physical p. 37.
  No part of either later section contributes to Family-17 counts.
- After this 77-question source closes, return to the committed rank order for the remaining
  local LCS theoretical/practical evidence. No download is needed or authorised.
- No S2 work is authorised until ranks 1–6 are consolidated and `/root` issues the literal
  `TRIAGE APPROVED` for Helwan Year 1.

## Family 18 — Pathology LCS question bank, Q25–Q50

### Source identity, corrected page boundary and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_23d4ed4d5e4f3f7c9764` |
| Manifest / recomputed SHA-256 | `23d4ed4d5e4f3f7c9764477023894a609c7c4520e3129a7f50fb6c24efe6f1fc` |
| File | `MCQs - College MCQs LCS Q-BANK (PATHO).pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Pathology/Questions/MCQs/MCQs - College MCQs LCS Q-BANK (PATHO).pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Pathology · Questions/MCQs · question bank · tier 3 |
| Container | same 37-page, native-text, unencrypted, non-interactive PDF 1.7 verified in Family 17 |
| This bounded family | Q25 begins on physical p. 11; Q25–Q50 occupy physical pp. 11–22, with Q50 options C–E continuing at the top of physical p. 23; matched printed keys are on physical p. 36 |
| Read method | physical pp. 11–23 and key p. 36 rendered at 160 dpi and visually read; on p. 23 only the Q50 continuation is in scope; no download |

The committed debt described Q25–Q50 as physical pp. 11–22, but the visual source shows
that Q50's final three options continue at the top of p. 23. Family 18 includes that
continuation so Q50 remains complete, then stops before Q51. This boundary correction does
not change the expected count: there are **26 complete five-option MCQs and 26 printed key
entries**. There is no handwriting, highlighting or answer mark on the question pages;
physical p. 36 is a designed `KEY ANSWERS` page with one letter and answer text per item.
There is no practical, specimen, image/trace, table, completion or written item.

### Page and printed-key inventory

| Physical page | In-scope prompt starts / continuation | MCQs counted | Printed keys |
|---:|---|---:|---:|
| 11 | Q25 starts after excluded Family-17 Q22–Q24 | 1 | 0 |
| 12 | Q25 continues; Q26–Q27 | 2 | 0 |
| 13 | Q27 continues; Q28–Q29 | 2 | 0 |
| 14 | Q30–Q31 | 2 | 0 |
| 15 | Q31 continues; Q32–Q34 | 3 | 0 |
| 16 | Q34 continues; Q35–Q36 | 2 | 0 |
| 17 | Q36 continues; Q37–Q38 | 2 | 0 |
| 18 | Q39–Q41 | 3 | 0 |
| 19 | Q41 continues; Q42–Q43 | 2 | 0 |
| 20 | Q43 continues; Q44–Q45 | 2 | 0 |
| 21 | Q45 continues; Q46–Q48 | 3 | 0 |
| 22 | Q48 continues; Q49–Q50 | 2 | 0 |
| 23 | Q50 options C–E only; Q51 excluded | 0 | 0 |
| 36 | printed `KEY ANSWERS` entries 25–50 | 0 | 26 |
| **Family 18** | **Q25–Q50 plus matched key section** | **26** | **26** |

The printed key sequence is `B B B E D A B B B E E A C D C D E B D A C A A C B A`.
Source risks remain attached without correction: Q30/Q31/Q44 print haemoglobin `5.4 g/L`;
Q38 describes peripheral neuropathy in a `newly diagnosed` type-1 diabetic; Q41 first says
there is no inter-attack mobility limitation and then says there is minimal limitation;
Q46's popliteal clear-fluid swelling is keyed `Bursitis`; and Q50 calls the patient
`asymptomatic`, then gives severe symptoms, later changes the pronoun to `she`, and keys
bisphosphonates as “immediate” therapy after hydration. All are complete keyed source
records, not S1 repairs.

### One-to-one assignment and repeat/collapse ledger

Every MCQ occurrence is assigned once. There is no exact full-prompt repeat. Ten repeated
concept assignments collapse 26 occurrences to 16 source-distinct handles. Q25/Q33/Q43
share the osteoarthritis pattern; Q26/Q27 share Paget complications; Q30/Q31/Q44/Q47/Q49
share the accepted myeloma diagnostic scope; Q34/Q50 form one sequential hypercalcaemia-
management handle; and Q39/Q41/Q48 share the accepted gout clinical/laboratory/crystal
scope. Seven handles reuse accepted eligible-LCS concepts and nine enter the eligible module
total for the first time.

| Evidence | One-to-one assignments in source order |
|---|---|
| Q25–Q30 | `Q25→osteoarthritis-clinical-etiology-differential`; `Q26→paget-disease-cardiac-and-joint-complications`; `Q27→paget-disease-cardiac-and-joint-complications`; `Q28→osteoma-morphology`; `Q29→sickle-cell-disease-osteomyelitis-predisposition`; `Q30→multiple-myeloma-clinical-diagnostic-pattern` |
| Q31–Q36 | `Q31→multiple-myeloma-clinical-diagnostic-pattern`; `Q32→adamantinoma-clinicoradiologic-immunophenotypic-pattern`; `Q33→osteoarthritis-clinical-etiology-differential`; `Q34→severe-hypercalcemia-sequential-saline-bisphosphonate-management`; `Q35→lumbar-disc-prolapse-clinical-diagnosis-and-mri-confirmation`; `Q36→ewing-sarcoma-clinical-radiology` |
| Q37–Q42 | `Q37→osteoporosis-density-and-fragility-diagnosis`; `Q38→diabetic-foot-ulcer-secondary-osteomyelitis`; `Q39→malignancy-associated-gout-hyperuricemia`; `Q40→lipoma-clinicopathologic-pattern`; `Q41→malignancy-associated-gout-hyperuricemia`; `Q42→carpal-tunnel-syndrome-clinical-diagnosis` |
| Q43–Q50 | `Q43→osteoarthritis-clinical-etiology-differential`; `Q44→multiple-myeloma-clinical-diagnostic-pattern`; `Q45→glucocorticoid-induced-osteoporosis`; `Q46→popliteal-bursitis-clinical-pattern`; `Q47→multiple-myeloma-clinical-diagnostic-pattern`; `Q48→malignancy-associated-gout-hyperuricemia`; `Q49→multiple-myeloma-clinical-diagnostic-pattern`; `Q50→severe-hypercalcemia-sequential-saline-bisphosphonate-management` |

The names of accepted prior handles are retained even when this source extends their scope:
Q35 adds annulus-fibrosus tearing to the prior disc-prolapse handle, Q38 adds peripheral
neuropathy upstream of the prior diabetic-foot/osteomyelitis pathway, and Q39/Q41/Q48 add
non-malignancy gout presentations to the prior hyperuricaemia/crystal scope. Q28 and Q36
promote accepted auxiliary-only osteoma and Ewing evidence into tested evidence, so each
enters the assessment delta once.

### Search-before-mint and disposition ledger

Each of the 16 handles received one search in each required surface: live state
(`server/data` and `src/data`), pending state (`docs/import-ready` and
`docs/questions-import-ready`), every prior source-import lane, and accepted prior LCS.
That is **16 × 4 = 64 required invocations**. Five narrower scope checks for substantive
osteoarthritis, hypercalcaemia treatment, sickle-cell osteomyelitis, adamantinoma and
popliteal bursitis give **69 search invocations total**. Taxonomy leaves, glossary word
parts, option mentions and a DVT article's incidental Baker-cyst differential are rejected
as substantive coverage.

| # | Prompt assignment → handle | Four-query bundle | Corpus / prior-LCS result | Disposition |
|---:|---|---|---|---|
| 1 | Q25,Q33,Q43 → `osteoarthritis-clinical-etiology-differential` | `osteoarthritis`; `osteophytes`; `joint space narrowing`; `degenerative joint pattern` | Exact accepted Family-12 tested handle. Current live hits are taxonomy-only and pending mentions are incidental, so its inherited new disposition remains. | prior eligible-LCS reuse; inherited new |
| 2 | Q26,Q27 → `paget-disease-cardiac-and-joint-complications` | `Paget heart failure`; `Paget secondary osteoarthritis`; `mosaic bone complication`; `high-output heart failure bone` | Prior LCS owns auxiliary stages/imaging and a tested Paget differential, but no record owns the cardiac/joint complication pair. No substantive external match. | new |
| 3 | Q28 → `osteoma-morphology` | `osteoma`; `ivory bony mass`; `mature lamellar bone mass`; `dense forehead bone tumor` | Exact prior auxiliary handle, previously outside tested totals. Broader hits are osteomalacia substrings, taxonomy or option noise; no substantive corpus record. | prior-LCS auxiliary promotion; new |
| 4 | Q29 → `sickle-cell-disease-osteomyelitis-predisposition` | `sickle cell osteomyelitis`; `Salmonella osteomyelitis`; `hemoglobinopathy bone infection`; `sickle bone pain` | No substantive live, pending, external-bank or prior-LCS same-scope record. | new |
| 5 | Q30,Q31,Q44,Q47,Q49 → `multiple-myeloma-clinical-diagnostic-pattern` | `multiple myeloma`; `plasma cell M spike`; `Bence-Jones proteins`; `lytic bone lesions` | Exact accepted Family-17 handle; pending `ART-108-PAT-AMYLOIDOSIS` owns the plasma-cell, monoclonal-protein and bone-erosion cluster. | pending; prior eligible-LCS reuse |
| 6 | Q32 → `adamantinoma-clinicoradiologic-immunophenotypic-pattern` | `adamantinoma`; `palisading epithelial tibia`; `cytokeratin vimentin bone`; `tibial epithelial tumor` | Pending intermediate-filament material explains cytokeratin/vimentin generally but does not own adamantinoma, its tibial lesion or palisading pattern. | new |
| 7 | Q34,Q50 → `severe-hypercalcemia-sequential-saline-bisphosphonate-management` | `hypercalcemia normal saline`; `hypercalcaemia hydration`; `bisphosphonate hypercalcemia`; `malignancy hypercalcemia treatment` | Pending calcium records address mechanisms, excitability or metastatic calcification, not acute treatment sequencing. No substantive live or prior-LCS match. | new; both printed treatment keys require review |
| 8 | Q35 → `lumbar-disc-prolapse-clinical-diagnosis-and-mri-confirmation` | `annulus fibrosus tear`; `disc herniation annulus`; `nucleus pulposus prolapse`; `lumbar PNP etiology` | Exact accepted Family-17 pending handle; `CON-MSK-9C7E37FE296254` already owns herniation through the annulus and can absorb the keyed tear. | pending; prior eligible-LCS reuse |
| 9 | Q36 → `ewing-sarcoma-clinical-radiology` | `Ewing sarcoma`; `onion skin`; `round blue cells`; `Homer Wright pseudorosettes` | Exact prior auxiliary handle owns age/site/onion-skin clues and was outside tested totals. No substantive live or pending disease record owns the combined pattern. | prior-LCS auxiliary promotion/extension; new |
| 10 | Q37 → `osteoporosis-density-and-fragility-diagnosis` | `osteoporosis fragility`; `hip vertebral fracture`; `low bone density fracture`; `resorption exceeds formation` | Exact accepted Family-17 handle; pending `CON-MSK-89674D65B2316B` owns density loss and fracture risk. | pending; prior eligible-LCS reuse |
| 11 | Q38 → `diabetic-foot-ulcer-secondary-osteomyelitis` | `diabetic foot neuropathy`; `peripheral neuropathy ulcer`; `diabetic ulcer osteomyelitis`; `diabetic foot infection` | Exact accepted Family-17 handle; no substantive external record owns the full neuropathy→ulcer→bone-infection pathway, so the inherited new disposition remains. | prior eligible-LCS reuse; inherited new |
| 12 | Q39,Q41,Q48 → `malignancy-associated-gout-hyperuricemia` | `gout`; `hyperuricemia`; `needle-shaped crystals`; `tophus first MTP` | Exact accepted Family-17 live handle; live secondary-gout, acute-gout and tophus records own the laboratory/crystal pattern. The current occurrences add non-malignancy presentations. | live; prior eligible-LCS reuse |
| 13 | Q40 → `lipoma-clinicopathologic-pattern` | `lipoma`; `mature white adipocytes`; `yellow encapsulated mass`; `benign adipose tumor` | The pending glossary only illustrates the `-oma` suffix, and the prior LCS adult-frequency ranking does not own this morphology/diagnosis pattern. No substantive live hit. | new |
| 14 | Q42 → `carpal-tunnel-syndrome-clinical-diagnosis` | `carpal tunnel syndrome`; `median nerve compression`; `thenar weakness paresthesia`; `repetitive manual wrist` | Pending `CON-MSK-9B52018C4649BD` and its Anatomy article own the sensory/motor clinical syndrome. Prior LCS treatment and association-exception handles are different objectives. | pending; new to eligible LCS |
| 15 | Q45 → `glucocorticoid-induced-osteoporosis` | `glucocorticoid osteoporosis`; `corticosteroid bone loss`; `steroid-induced osteoporosis`; `cortisone osteoporosis` | Exact accepted Family-16 tested handle; no substantive live/pending record supersedes its inherited new disposition. | prior eligible-LCS reuse; inherited new |
| 16 | Q46 → `popliteal-bursitis-clinical-pattern` | `popliteal bursitis`; `Baker cyst`; `popliteal swelling clear fluid`; `gastrocnemius semimembranosus bursa` | The only pending Baker-cyst hit is an incidental DVT differential; no record owns this keyed popliteal clear-fluid pattern. | new; printed `Bursitis` key requires review |

Source-disposition arithmetic is **1 live + 4 pending + 11 new = 16** handles. Module
novelty is separate: **7 prior eligible reuse + 9 new to eligible = 16**. The nine net
concepts resolve as **0 live + 1 pending + 8 new**.

### Family-18 checkpoint and cumulative LCS-103 delta

| Family-18 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS reuse | 15 | 15 | 7 | 0 | 0 | 0 | 0 |
| New-to-eligible pending clinical diagnosis | 1 | 1 | 1 | 1 | 0 | 1 | 0 |
| New-to-eligible new handles | 10 | 10 | 8 | 8 | 0 | 0 | 8 |
| **Family 18 assessment** | **26** | **26** | **16** | **9** | **0** | **1** | **8** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 17 | 255 | 129 | 134 | 8 | 36 | 90 |
| Family 18 net delta | +26 | +26 | +9 | +0 | +1 | +8 |
| **LCS-103 cumulative after Family 18** | **281** | **155** | **143** | **8** | **37** | **98** |

Arithmetic checks: page-start counts are `1 + 2 + 2 + 2 + 3 + 2 + 2 + 3 + 2 + 2 +
3 + 2 = 26`; p. 23 contributes only Q50 continuation; `26 - 10 repeated assignments =
16` handles; `1 + 4 + 11 = 16`; `7 + 9 = 16`; `0 + 1 + 8 = 9`; `255 + 26 =
281`; `129 + 26 = 155`; `134 + 9 = 143`; and `8 + 37 + 98 = 143`. The external
bank remains separately unchanged at `241 prompts / 241 keys / 75 handles = 9 live / 66
pending / 0 new`. The 50 auxiliary notes and previously tracked unresolved/malformed items
remain unchanged; Q28 and Q36 are promotions from that auxiliary evidence, not new note
statements.

## Exact next debt

- Continue the same source with Q51–Q77. Q51 begins on physical p. 23 immediately after
  the Q50 continuation; Q77 ends on physical p. 34; printed keys 51–77 are on physical
  p. 37. Expected inventory before full visual verification is 27 MCQs and 27 key entries.
- No part of Q51 or later content contributes to Family-18 counts.
- After the 77-question bank closes, return to the committed evidence rank for remaining
  local LCS theoretical/practical sources. No download is needed or authorised.
- No S2 work is authorised until ranks 1–6 are consolidated and `/root` issues the literal
  `TRIAGE APPROVED` for Helwan Year 1.

## Family 19 — Pathology LCS question bank, Q51–Q77

### Source identity, terminal boundary and visual classification

| Field | Verified value |
|---|---|
| Manifest source | `src_23d4ed4d5e4f3f7c9764` |
| Manifest / recomputed SHA-256 | `23d4ed4d5e4f3f7c9764477023894a609c7c4520e3129a7f50fb6c24efe6f1fc` |
| File | `MCQs - College MCQs LCS Q-BANK (PATHO).pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Pathology/Questions/MCQs/MCQs - College MCQs LCS Q-BANK (PATHO).pdf` |
| Manifest classification | Helwan `HU_Y1` · `HU-LCS-103` · Pathology · Questions/MCQs · question bank · tier 3 |
| Container | same 37-page, native-text, unencrypted, non-interactive PDF 1.7 verified in Families 17–18 |
| This bounded family | Q51 begins on physical p. 23 immediately after Family-18 Q50 options C–E; Q51–Q77 occupy physical pp. 23–34; all matched key entries are on physical p. 37 |
| Read method | physical pp. 23–34 and key p. 37 rendered at 160 dpi and visually read source-first; no download |

This terminal section contains **27 complete five-option MCQs and 27 printed key entries**.
Physical p. 23 begins with the already-counted Q50 continuation and then starts Q51; only
Q51 onward enters Family 19. Q77 and all five of its options end on physical p. 34. Physical
p. 37 is a designed `KEY ANSWERS` page containing exactly entries 51–77. There is no
handwriting, highlighting or answer mark on the question pages, and no practical, specimen,
image/trace, table, completion or written item.

### Page and printed-key inventory

| Physical page | In-scope prompt starts / continuation | MCQs counted | Printed keys |
|---:|---|---:|---:|
| 23 | excluded Q50 options C–E, then Q51–Q53 | 3 | 0 |
| 24 | Q53 continues; Q54–Q55 | 2 | 0 |
| 25 | Q55 continues; Q56–Q57 | 2 | 0 |
| 26 | Q57 continues; Q58–Q60 | 3 | 0 |
| 27 | Q60 continues; Q61–Q62 | 2 | 0 |
| 28 | Q62 continues; Q63–Q64 | 2 | 0 |
| 29 | Q64 continues; Q65–Q66 | 2 | 0 |
| 30 | Q66 continues; Q67–Q68 | 2 | 0 |
| 31 | Q69–Q70 | 2 | 0 |
| 32 | Q70 continues; Q71–Q73 | 3 | 0 |
| 33 | Q73 continues; Q74–Q75 | 2 | 0 |
| 34 | Q75 continues; Q76–Q77 | 2 | 0 |
| 37 | printed `KEY ANSWERS` entries 51–77 | 0 | 27 |
| **Family 19** | **Q51–Q77 plus matched key section** | **27** | **27** |

The printed key-letter sequence is `B D C D A D B B E B D B A B A A C C C A A E C C B B E`.
Key text is retained literally rather than normalised: Q73 option C prints `t(11;14)`, while
the p. 37 key line prints `C – t(14;11)`. The letter maps to option C, but the reversed text is
a source-key mismatch and remains flagged. Other source risks remain attached: Q51 reports
right-hip pain but a left-femoral-neck fracture; Q53 locates tapping over the `radial aspect`
while keying median-nerve compression; Q61 supplies only black heel discoloration and failed
cream before keying debridement; Q62 prints beta-2 microglobulin `4.5 mg/dL`; Q63 changes the
complaint from the left great toe to a right first-MTP mass; Q66 and Q70 key Phalen's test as
the next/confirmatory diagnostic step; and Q75 changes a right-elbow complaint to a left-
olecranon mass. None is medically or editorially repaired in S1.

### One-to-one assignment and repeat/collapse ledger

Every prompt occurrence is assigned exactly once. There is no exact full-prompt repeat.
Seven repeated same-concept assignments collapse 27 occurrences to 20 source-distinct
handles: Q53/Q64 share carpal-tunnel clinical diagnosis, Q54/Q59 share rheumatoid clinical/
radiographic disease recognition, Q60/Q63/Q75 share the accepted gout scope, Q62/Q73 share
myeloma prognosis, Q66/Q70 share Phalen testing and Q76/Q77 share the same giant-cell-tumour
pattern. Ten handles reuse accepted eligible-LCS concepts; ten enter eligible totals for the
first time.

| Evidence | One-to-one assignments in source order |
|---|---|
| Q51–Q56 | `Q51→age-related-low-turnover-osteoporosis`; `Q52→chondrosarcoma-vs-osteosarcoma-comparison`; `Q53→carpal-tunnel-syndrome-clinical-diagnosis`; `Q54→rheumatoid-arthritis-clinical-etiology-differential`; `Q55→aneurysmal-bone-cyst-clinicoradiologic-pattern`; `Q56→osteoarthritis-clinical-etiology-differential` |
| Q57–Q62 | `Q57→infantile-hemangioma-clinical-course`; `Q58→cushing-syndrome-secondary-osteoporosis`; `Q59→rheumatoid-arthritis-clinical-etiology-differential`; `Q60→malignancy-associated-gout-hyperuricemia`; `Q61→diabetic-heel-gangrene-debridement`; `Q62→multiple-myeloma-prognosis-beta2-microglobulin` |
| Q63–Q68 | `Q63→malignancy-associated-gout-hyperuricemia`; `Q64→carpal-tunnel-syndrome-clinical-diagnosis`; `Q65→graves-disease-clinical-pattern`; `Q66→carpal-tunnel-phalen-test-confirmation`; `Q67→uterine-leiomyoma-gross-microscopic-pattern`; `Q68→enchondroma-characteristics-exception` |
| Q69–Q74 | `Q69→carpal-tunnel-conservative-treatment`; `Q70→carpal-tunnel-phalen-test-confirmation`; `Q71→rheumatoid-arthritis-anti-ccp-serology`; `Q72→osteoid-osteoma-clinicoradiologic-pattern`; `Q73→multiple-myeloma-prognosis-beta2-microglobulin`; `Q74→osteochondroma-typical-location` |
| Q75–Q77 | `Q75→malignancy-associated-gout-hyperuricemia`; `Q76→giant-cell-tumor-stromal-cell-biology`; `Q77→giant-cell-tumor-stromal-cell-biology` |

Accepted handle names remain stable when the present source extends their tested scope.
Q52 adds the pelvic-site preference to the chondrosarcoma comparison; Q55 adds fracture as
an aneurysmal-bone-cyst complication; Q62/Q73 add adverse/favourable cytogenetics to the
myeloma prognostic handle; Q68 adds a complete diagnostic pattern to the prior enchondroma
exception; and Q76/Q77 add the epiphyseal `soap bubble` phenotype to the giant-cell-tumour
stromal-cell handle. Q74 promotes the accepted auxiliary-only osteochondroma location handle
into tested evidence, so it contributes one eligible-module concept.

### Search-before-mint and disposition ledger

Each of the 20 handles received one search in each required surface: live state
(`server/data` and `src/data`), pending state (`docs/import-ready` and
`docs/questions-import-ready`), every prior source-import lane, and accepted prior LCS.
That is **20 × 4 = 80 required invocations**. Twelve narrower scope/phrase checks for
haemangioma course, Graves phenotype, cortisol-related bone loss, diabetic heel management,
leiomyoma morphology, Phalen testing and rheumatoid serology give **92 search invocations
total**. Taxonomy leaves, option mentions and incidental terms are not substantive coverage.

| # | Prompt assignment → handle | Four-query bundle | Corpus / prior-LCS result | Disposition |
|---:|---|---|---|---|
| 1 | Q51 → `age-related-low-turnover-osteoporosis` | `low-turnover osteoporosis`; `senile osteoporosis`; `elderly fragility fracture`; `age-related bone turnover` | No substantive live, pending, external-bank or prior-LCS record owns the keyed low-turnover classification. | new |
| 2 | Q52 → `chondrosarcoma-vs-osteosarcoma-comparison` | `chondrosarcoma`; `popcorn calcification`; `chondroid matrix`; `pelvic bone chondrosarcoma` | Exact accepted Family-12/17 handle can absorb morphology and pelvic-site preference; its inherited new disposition remains. | prior eligible-LCS reuse; inherited new |
| 3 | Q53,Q64 → `carpal-tunnel-syndrome-clinical-diagnosis` | `carpal tunnel`; `median nerve compression`; `Tinel wrist`; `nocturnal hand paresthesia` | Exact accepted Family-18 pending handle; pending Anatomy owns the median-nerve sensory/motor syndrome. | pending; prior eligible-LCS reuse |
| 4 | Q54,Q59 → `rheumatoid-arthritis-clinical-etiology-differential` | `rheumatoid arthritis clinical`; `swan-neck ulnar deviation`; `juxta-articular osteopenia`; `erosive symmetric arthritis` | Exact accepted Family-12 handle. Pending pathology mentions RA only as a fibrinoid-necrosis example, not this disease-recognition scope. | prior eligible-LCS reuse; inherited new |
| 5 | Q55 → `aneurysmal-bone-cyst-clinicoradiologic-pattern` | `aneurysmal bone cyst`; `blood-filled cystic spaces`; `eccentric expansion`; `aneurysmal cyst fracture` | Exact accepted Family-17 new handle; no substantive corpus or external-bank match. | prior eligible-LCS reuse; inherited new |
| 6 | Q56 → `osteoarthritis-clinical-etiology-differential` | `osteoarthritis`; `Heberden nodes`; `osteophytes`; `pain worsens with use` | Exact accepted Family-12 handle. Current live/pending matches are taxonomy, incidental or narrower facts, so inherited new remains. | prior eligible-LCS reuse; inherited new |
| 7 | Q57 → `infantile-hemangioma-clinical-course` | `infantile hemangioma`; `appears after birth`; `vascular lesion regression`; `bleeding lip hemangioma` | Live capillary/cavernous haemangioma records own microscopic vascular-space morphology, not postnatal growth followed by regression. | new |
| 8 | Q58 → `cushing-syndrome-secondary-osteoporosis` | `Cushing osteoporosis`; `hypercortisolism bone loss`; `truncal obesity hypertension`; `cortisol 75 microgram` | Live Cushing fragments cover pigmentation/androgen effects and cortisol feedback; none owns endogenous cortisol excess causing progressive osteoporosis. | new |
| 9 | Q60,Q63,Q75 → `malignancy-associated-gout-hyperuricemia` | `thiazide gout`; `renal failure tophus`; `needle-shaped urate crystals`; `podagra` | Exact accepted Family-17/18 live handle; live gout/tophi material owns the clinical and crystal pattern. These prompts further extend its non-malignancy trigger scope. | live; prior eligible-LCS reuse |
| 10 | Q61 → `diabetic-heel-gangrene-debridement` | `diabetic heel gangrene`; `black heel debridement`; `diabetic foot necrosis`; `ischemic heel management` | Pending vascular material owns diabetes-associated distal disease and gangrene, but no record owns this keyed debridement decision. Prior diabetic-foot handle ends at ulcer/osteomyelitis. | new; printed key requires review |
| 11 | Q62,Q73 → `multiple-myeloma-prognosis-beta2-microglobulin` | `myeloma chromosome 13`; `myeloma t(11;14)`; `myeloma prognosis`; `beta-2 microglobulin myeloma` | Exact accepted Family-17 handle; no substantive live/pending record owns the cytogenetic prognosis set. | prior eligible-LCS reuse; inherited new; Q73 key text mismatch |
| 12 | Q65 → `graves-disease-clinical-pattern` | `Graves disease`; `weight loss increased appetite`; `pretibial myxedema`; `TSH receptor antibody eye` | Live Thyroid Disorders owns antibody-stimulated TSH receptors, extraocular-tissue hypertrophy and weight loss despite increased appetite; live Pathology also owns Graves morphology. | live; new to eligible LCS |
| 13 | Q66,Q70 → `carpal-tunnel-phalen-test-confirmation` | `Phalen test`; `carpal tunnel bedside test`; `wrist flexion test`; `confirm median neuropathy` | Pending Anatomy explicitly states that its source does not describe Phalen/Tinel or any named bedside test; no substantive live or prior-LCS test record. | new; both printed keys require review |
| 14 | Q67 → `uterine-leiomyoma-gross-microscopic-pattern` | `uterine leiomyoma`; `whorled grey-white`; `well-differentiated spindle fascicles`; `fibroid morphology` | Pending Pathology mentions leiomyoma only as an extracellular-hyaline example; it does not own the uterine gross/microscopic diagnostic pattern. | new |
| 15 | Q68 → `enchondroma-characteristics-exception` | `enchondroma`; `phalanx osteolytic lesion`; `mature hyaline cartilage lobules`; `sclerotic rim cartilage tumor` | Exact accepted Family-12 tested handle; no substantive live/pending record supersedes its inherited new disposition. | prior eligible-LCS reuse; inherited new |
| 16 | Q69 → `carpal-tunnel-conservative-treatment` | `carpal tunnel night splint`; `carpal tunnel steroid injection`; `mild carpal tunnel treatment`; `wrist neutral splint` | Prior LCS owns clinical diagnosis and surgical release, but no live, pending or external record owns the keyed conservative-treatment combination. | new; printed key requires review |
| 17 | Q71 → `rheumatoid-arthritis-anti-ccp-serology` | `anti-citrullinated peptide`; `anti-CCP`; `rheumatoid serology`; `swan-neck anti-CCP` | No substantive live, pending, external-bank or prior-LCS record owns this serologic association. | new |
| 18 | Q72 → `osteoid-osteoma-clinicoradiologic-pattern` | `osteoid osteoma`; `night pain relieved NSAID`; `intracortical nidus`; `radiolucent core under 1 cm` | Exact accepted Family-17 tested handle; no substantive corpus record supersedes inherited new. | prior eligible-LCS reuse; inherited new |
| 19 | Q74 → `osteochondroma-typical-location` | `osteochondroma metaphysis`; `stalked bony projection`; `cartilage cap exostosis`; `lower femoral metaphysis` | Exact prior auxiliary handle was outside tested totals. Glossary and BMS option hits are non-substantive; no live/pending same-scope record. | prior-LCS auxiliary promotion; new |
| 20 | Q76,Q77 → `giant-cell-tumor-stromal-cell-biology` | `giant cell tumor`; `epiphyseal soap bubble`; `multinucleated cells stromal cells`; `osteoclastoma` | Exact accepted Family-12 tested handle, itself promoted from auxiliary evidence; no substantive live/pending record owns the full pattern. | prior eligible-LCS reuse; inherited new |

Source-disposition arithmetic is **2 live + 1 pending + 17 new = 20** handles. Module
novelty is separate: **10 prior eligible reuse + 10 new to eligible = 20**. The ten net
concepts resolve as **1 live + 0 pending + 9 new**.

### Family-19 checkpoint, cumulative LCS-103 delta and source closure

| Family-19 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS handle reuse | 16 | 16 | 10 | 0 | 0 | 0 | 0 |
| New-to-eligible live Graves pattern | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| New-to-eligible new handles | 10 | 10 | 9 | 9 | 0 | 0 | 9 |
| **Family 19 assessment** | **27** | **27** | **20** | **10** | **1** | **0** | **9** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 18 | 281 | 155 | 143 | 8 | 37 | 98 |
| Family 19 net delta | +27 | +27 | +10 | +1 | +0 | +9 |
| **LCS-103 cumulative after Family 19** | **308** | **182** | **153** | **9** | **37** | **107** |

Arithmetic checks: page-start counts are `3 + 2 + 2 + 3 + 2 + 2 + 2 + 2 + 2 + 3 +
2 + 2 = 27`; p. 37 supplies 27 key entries; seven repeated assignments give `27 - 7 =
20` handles; `2 + 1 + 17 = 20`; `10 + 10 = 20`; `1 + 0 + 9 = 10`; `281 + 27 =
308`; `155 + 27 = 182`; `143 + 10 = 153`; and `9 + 37 + 107 = 153`. The external
bank remains separately unchanged at `241 prompts / 241 keys / 75 handles = 9 live / 66
pending / 0 new`. The 50 auxiliary notes and previously tracked unresolved/malformed items
remain unchanged. Across Families 17–19 this source is now closed at **77 complete keyed MCQs**.

## Exact next debt

- Return to evidence rank rather than starting another broad external bank. The highest-tier
  unprocessed local LCS question source is `src_065497f15835733031c0`, `DPT BOOK MCQs -
  Department MCQs TUTORIAL of Department Book Anatomy.pdf`: 10 pages, native text, source
  tier 1, recomputed SHA-256 `065497f15835733031c07a03549fa21ab7a89c602b6f0cbb68f9777375a2cfda`.
- Before additive counting, resolve its source-first scope: the manifest/path assign it to
  `HU-LCS-103` Anatomy and mark it as a department-book question source, while the first-page
  snippet reads `TUTORIAL 218`. Render all ten pages, preserve that printed identifier, and
  decide whether it is eligible LCS evidence, cross-module context or misfiled/external.
- If source identity validates for LCS, inventory prompts and printed keys before moving to
  lower-ranked local College/Student MCQ or practical sources. No download is needed.
- No S2 work is authorised until ranks 1–6 are consolidated and `/root` issues the literal
  `TRIAGE APPROVED` for Helwan Year 1.

## Provenance validation — Anatomy department-book tutorial source

### Scope-only verdict for `src_065497f15835733031c0`

| Evidence field | Source-first finding |
|---|---|
| SHA-256 | manifest and recomputation agree: `065497f15835733031c07a03549fa21ab7a89c602b6f0cbb68f9777375a2cfda` |
| Container | 10-page, native-text, unencrypted, non-interactive PDF 1.7; A4; no form or JavaScript |
| Manifest ownership | unique manifest hash occurrence; `HU_Y1` · `HU-LCS-103` · Anatomy · Questions/MCQs · `isDepartmentBook: true` · source tier 1 |
| Organised path / filename | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Anatomy/Questions/MCQs/DPT BOOK MCQs - Department MCQs TUTORIAL of Department Book Anatomy.pdf` |
| Visible pagination | physical p. 1 prints only `TUTORIAL` with book page `218`; physical pp. 2–9 continue book pages `219`–`226`; physical p. 10 is an unnumbered online-quiz screenshot |
| Visible scope headings | hip and gluteal region; thigh; leg; foot; lower-limb embryology; face and scalp; temporal and infratemporal regions; neck |
| Conflicting provenance | no other module code, year, institution, external-university label, author, edition or date is printed anywhere in the ten-page excerpt |
| Read method | all ten pages rendered at 180 dpi and visually read for scope markers only; native text used to confirm the continuous page-number sequence; no prompt/key inventory and no download |

The apparent `TUTORIAL 218` conflict is resolved: the visual source does **not** identify a
Tutorial 218 or module 218. It prints the generic title `TUTORIAL` above the first book-page
footer `218`, followed by consecutive footers `219`–`226`. The manifest first-page snippet
flattened the title and footer into one phrase.

The internal topic sequence also matches the local `HU-LCS-103` Anatomy source tree at high
specificity. Its lower-limb sections align with the declared LCS lectures for anterior/
medial/posterior thigh and gluteal region, leg, hip/knee/ankle joints, development of limbs
and foot. Its head-and-neck sections align with the declared LCS lectures for scalp/face,
neck triangles and temporal/infratemporal fossa. The already-accepted LCS written EOM also
tests temporal/infratemporal and neck-region scopes. No competing manifest owner or duplicate
hash exists.

**Verdict: eligible `HU-LCS-103` Anatomy department-book/tutorial question evidence.** The
evidence supports module ownership and the source's department-book rank; it does not support
calling the excerpt a sitting exam or independently naming Helwan on the printed pages. Any
institution attribution remains manifest/path-level provenance. This validation contributes
**zero prompts, zero keys and zero concepts**: eligible cumulative remains `308 / 182 / 153 =
9 live / 37 pending / 107 new`; external and auxiliary checkpoints are unchanged.

### Refreshed exact next debt

- Process this same now-validated source as the next bounded LCS family. Render/read all ten
  pages source-first and inventory MCQ plus short-essay/written prompts without inferring keys.
- Distinguish three key mechanisms visible during scope review: underlined answer choices,
  explicit printed `Answer:` lines, and unmarked items. Physical p. 10 is a screenshot of
  online quiz forms and visibly repeats some earlier questions; prove every repeat before
  collapse and do not treat empty radio buttons or `Submit Answers` controls as keys.
- Build the normal one-to-one assignment/search ledger and compute additive counts only in
  that later family. No download is needed.
- No S2 work is authorised until ranks 1–6 are consolidated and `/root` issues the literal
  `TRIAGE APPROVED` for Helwan Year 1.

## Family 20 — Anatomy department-book tutorial, complete source

### Source identity, complete visual read and assessment boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_065497f15835733031c0` |
| Manifest / recomputed SHA-256 | `065497f15835733031c07a03549fa21ab7a89c602b6f0cbb68f9777375a2cfda` |
| File | `DPT BOOK MCQs - Department MCQs TUTORIAL of Department Book Anatomy.pdf` |
| Organised local path | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/Anatomy/Questions/MCQs/DPT BOOK MCQs - Department MCQs TUTORIAL of Department Book Anatomy.pdf` |
| Authority | eligible `HU-LCS-103` Anatomy department-book/tutorial question evidence, source tier 1; not represented as a sitting exam |
| Container | 10-page A4, native-text, unencrypted, non-interactive PDF 1.7; no form or JavaScript |
| Visible source pagination | physical p. 1 cover/book p. 218; physical pp. 2–9 carry book pp. 219–226; physical p. 10 is an unnumbered online-quiz screenshot |
| Read method | all ten pages rendered at 180 dpi and visually read; physical pp. 2–9 were rerendered at 300 dpi for key-mark verification; native text used only to cross-check wording and page transitions; no download |

The source contains **62 complete assessment-prompt occurrences**: **45 MCQ occurrences**
and **17 written/short-essay prompts**. There is no practical, specimen, image-dependent,
completion or table item. Five of the 45 MCQ occurrences are exact screenshot repeats on
physical p. 10; they remain observed question records but do not create new prompt forms or
concept handles. The 57 unique prompt forms collapse through nine further same-concept
assignments to 48 source-distinct tested handles.

### Page, prompt-type and printed-key inventory

| Physical page | Visible assessment content | MCQ occurrences | Written prompts | Printed keys |
|---:|---|---:|---:|---:|
| 1 | tutorial cover only | 0 | 0 | 0 |
| 2 | hip/gluteal M1–M5; hip W1 | 5 | 1 | 0 |
| 3 | hip W2–W5; thigh W1–W3; thigh M1–M4 | 4 | 7 | 4 underlines |
| 4 | thigh M5–M6; leg M1–M2 and W1–W2; foot W1–W2 | 4 | 4 | 4 underlines |
| 5 | foot M1–M3; lower-limb embryology M1–M4 | 7 | 0 | 4 explicit `Answer:` lines |
| 6 | embryology M5; face/scalp M1–M4 and W1–W2; temporal M1 | 6 | 2 | 4 underlines + 2 explicit `Answer:` lines |
| 7 | temporal M2–M7; M7 continues on p. 8 | 6 | 0 | 5 explicit `Answer:` lines |
| 8 | temporal M7 answer and M8–M10; neck W1–W3; neck M1 starts | 4 | 3 | 4 explicit `Answer:` lines |
| 9 | neck M1 continuation and M2–M5 | 4 | 0 | 0 |
| 10 | five online-quiz screenshot repeats | 5 | 0 | 0 |
| **Family 20** | **complete ten-page source** | **45** | **17** | **27** |

The **27 recovered printed keys** comprise **12 typeset underlined choices** and **15
explicit `Answer:` lines**. The other 35 prompt occurrences are unkeyed as printed: 18 MCQ
occurrences and all 17 written prompts. Physical p. 10's radio circles are all empty and its
`Submit Answers` / `Clear Answers` controls expose no result state, so neither the circles
nor the controls are answer evidence. No handwriting or reader annotation appears.

Source-key risks remain uncorrected in S1. Thigh M5's underlined option D begins with the
malformed wording `Allows has`; leg M1 underlines D, `tendon perforates the superior extensor
retinaculum`, despite its unusual wording; embryology M1 explicitly keys lower-limb-bud
appearance as `C) Week 5`, while pending 103-BMS material states the fourth week; embryology
M5 explicitly keys `C) Lumbar somites (L3–L5)`, a narrow segmental formulation requiring
review; and temporal M3 keys `C) Superficial temporal artery`, although `temporal region`
does not specify whether it means surface scalp or the deeper temporalis/fossa. Because this
is a department tutorial/question bank rather than a sitting paper, any outright error is a
later editorial-key decision, not a silent S1 repair.

### Exact-repeat proof and one-to-one source-order assignment

Physical p. 10 reproduces five earlier stems **with the same option text and order**:
`p10-1 = thigh M1` (quadriceps-group exception), `p10-2 = thigh M3` (anterior-thigh
innervation), `p10-3 = thigh M6` (femoral-canal position), `p10-4 = face/scalp M1` (scalp
movement plane), and `p10-5 = face/scalp M3` (facial-expression nerve). The earlier copies
carry five underlined keys among them; the screenshot copies carry none. The ledger therefore
counts five additional observed records and zero additional keys, then collapses all five
before source-distinct handle arithmetic.

| Evidence block | One-to-one assignments in source order |
|---|---|
| Hip/gluteal | `M1→quadratus-femoris-oina`; `M2→inferior-gluteal-artery`; `M3→sciatic-nerve-course-termination-branches`; `M4→inferior-gluteal-artery`; `M5→hip-joint-classification`; `W1→posterior-femoral-cutaneous-branches`; `W2→deep-gluteal-muscle-actions`; `W3→sciatic-foramina-contents`; `W4→hip-joint-ligaments`; `W5→hip-joint-blood-supply` |
| Thigh | `W1→femoral-triangle-anatomy`; `W2→femoral-artery`; `W3→sciatic-nerve-course-termination-branches`; `M1→quadriceps-femoris-components`; `M2→adductor-canal`; `M3→femoral-nerve-roots-course-and-distribution`; `M4→femoral-artery`; `M5→adductor-canal`; `M6→femoral-sheath` |
| Leg / foot | `leg M1→tibialis-anterior-oina`; `leg M2→flexor-digitorum-longus-oina`; `leg W1→superficial-posterior-leg-compartment`; `leg W2→deep-fibular-nerve-terminal-branches`; `foot W1→medial-plantar-nerve-branches`; `foot W2→intrinsic-foot-layers`; `foot M1→foot-arches`; `foot M2→intrinsic-foot-layers`; `foot M3→inversion-eversion-joints` |
| Embryology | `M1→lower-limb-bud-development`; `M2→lower-limb-muscle-embryology`; `M3→lower-limb-medial-rotation`; `M4→apical-ectodermal-ridge`; `M5→lower-limb-bud-development` |
| Face / scalp | `M1→scalp-layers-and-movement-plane`; `M2→scalp-arterial-supply`; `M3→facial-nerve-expression`; `M4→face-sensory-supply`; `W1→scalp-layers-and-movement-plane`; `W2→scalp-face-venous-drainage` |
| Temporal / infratemporal | `M1→temporal-fossa`; `M2→temporalis-oina`; `M3→superficial-temporal-artery`; `M4→infratemporal-fossa`; `M5→mandibular-nerve-branches`; `M6→lateral-pterygoid-oina`; `M7→temporomandibular-joint`; `M8→temporomandibular-joint`; `M9→pterygoid-plexus-connections`; `M10→temporomandibular-joint` |
| Neck | `W1→median-neck-region`; `W2→carotid-triangle`; `W3→anterior-jugular-vein`; `M1→deep-cervical-lymph-nodes`; `M2→carotid-sheath`; `M3→left-subclavian-first-part-relations`; `M4→scalenus-anterior-relations`; `M5→greater-occipital-nerve` |
| Physical p. 10 | `repeat 1→quadriceps-femoris-components`; `repeat 2→femoral-nerve-roots-course-and-distribution`; `repeat 3→femoral-sheath`; `repeat 4→scalp-layers-and-movement-plane`; `repeat 5→facial-nerve-expression` |

Beyond the five exact repeats, nine repeated assignments are explicit semantic collapses:
the two inferior-gluteal-artery MCQs, the hip MCQ plus thigh written sciatic-nerve prompts,
the written and MCQ femoral-artery prompts, the two adductor-canal MCQs, written layer-three
plus lumbrical-layer foot prompts, the two lower-limb-bud prompts, the written plus MCQ scalp-
layer prompts, and three TMJ prompts collapsing to one handle. Thus `62 - 5 = 57` unique
prompt forms and `57 - 9 = 48` source-distinct handles.

### Search-before-mint, prior-LCS and external-bank disposition ledger

Each of the 48 handles received four `find-existing` query forms across live state, pending
state and every source-import root, followed by direct canonical-key/definition scans and
comparison with accepted prior LCS. That is **48 × 4 = 192 required invocations**. Twelve
targeted follow-ups (`trochanteric anastomosis`, `hip anastomoses`, `six lateral`, `short
external`, `paraxial mesoderm`, `myotome`, `limb muscles`, `hypaxial`, `limb buds form`,
`lower limb rotates`, `quadriceps`, `facial nerve`) give **204 query invocations total**.
The explicit external bank remains Histology scope; none of its 75 handles owns
an Anatomy handle below. A narrower live fact or an article mention is not treated as a
same-scope concept hit.

| # | Prompt assignment(s) → handle | Four-query bundle | Same-scope result | Disposition |
|---:|---|---|---|---|
| 1 | hip M1 → `quadratus-femoris-oina` | `quadratus femoris`; `nerve to quadratus femoris`; `inferior gemellus`; `short lateral rotator` | Exact prior Family-2 tested handle; pending lateral-rotator material still omits full OINA/nerve scope. | prior eligible-LCS reuse; inherited new |
| 2 | hip M2,M4 → `inferior-gluteal-artery` | `inferior gluteal artery`; `inferior gluteal vessel`; `sciatic nerve arterial branch`; `internal iliac posterior branch` | Exact prior Family-2 handle; no substantive corpus match supersedes it. | prior eligible-LCS reuse; inherited new |
| 3 | hip M3; thigh W3 → `sciatic-nerve-course-termination-branches` | `sciatic nerve course`; `sciatic nerve termination`; `sciatic nerve branches`; `tibial common fibular division` | Pending 103-BMS concepts separately own the pelvis-to-lower-thigh course and terminal/muscular/articular branches. | pending; new to eligible LCS |
| 4 | hip M5 → `hip-joint-classification` | `hip joint type`; `ball and socket hip`; `synovial hip joint`; `multiaxial hip` | Pending 103-BMS hip-movement concept explicitly begins with the polyaxial ball-and-socket synovial classification. | pending; new to eligible LCS |
| 5 | hip W1 → `posterior-femoral-cutaneous-branches` | `posterior cutaneous nerve thigh`; `posterior femoral cutaneous`; `inferior cluneal nerve`; `perineal branch posterior thigh` | Prior auxiliary evidence covers only a medial course relation, not the requested branch list; no substantive concept hit. | new; NEU/ANA |
| 6 | hip W2 → `deep-gluteal-muscle-actions` | `deep gluteal muscles`; `short lateral rotators`; `obturator internus gemelli`; `lateral rotation hip` | Pending AU/103-BMS concepts own the six short lateral rotators and their shared lateral-rotation action. | pending; new to eligible LCS |
| 7 | hip W3 → `sciatic-foramina-contents` | `greater sciatic foramen`; `lesser sciatic foramen`; `sciatic foramina contents`; `piriformis foramen contents` | Exact prior eligible handle; pending AU material owns both foramina and the piriformis partition. | prior eligible-LCS reuse; inherited pending |
| 8 | hip W4 → `hip-joint-ligaments` | `iliofemoral ligament`; `pubofemoral ligament`; `ischiofemoral ligament`; `hip ligament` | Exact prior eligible handle; pending AU and 103-BMS concepts own the capsular ligament set. | prior eligible-LCS reuse; inherited pending |
| 9 | hip W5 → `hip-joint-blood-supply` | `hip joint blood supply`; `arterial supply hip`; `retinacular arteries hip`; `medial circumflex femoral hip` | Pending AU trochanteric-anastomosis and 103-BMS acetabular-branch concepts jointly own the named arterial supply route. | pending; new to eligible LCS |
| 10 | thigh W1 → `femoral-triangle-anatomy` | `femoral triangle`; `Scarpa triangle`; `femoral triangle boundaries`; `femoral triangle contents` | Exact prior eligible handle; pending 103-BMS/AU material owns the boundaries and contents. | prior eligible-LCS reuse; inherited pending |
| 11 | thigh W2,M4 → `femoral-artery` | `femoral artery`; `femoral artery branches`; `profunda femoris`; `lateral circumflex femoral` | Exact prior eligible handle; pending records extend branches/relations but do not create a second LCS concept. | prior eligible-LCS reuse; inherited new |
| 12 | thigh M1 + p10 repeat 1 → `quadriceps-femoris-components` | `quadriceps components`; `quadriceps femoris group`; `vastus rectus femoris`; `anterior thigh muscles` | Pending 103-BMS quadriceps concept explicitly names all four heads and articularis genus. | pending; new to eligible LCS |
| 13 | thigh M2,M5 → `adductor-canal` | `adductor canal`; `Hunter canal`; `subsartorial canal`; `adductor canal contents` | Exact prior eligible handle; pending 103-BMS owns walls, contents and femoral-vessel relations. | prior eligible-LCS reuse; inherited pending |
| 14 | thigh M3 + p10 repeat 2 → `femoral-nerve-roots-course-and-distribution` | `femoral nerve`; `L2 L3 L4 femoral`; `anterior thigh motor nerve`; `femoral nerve distribution` | Exact prior eligible handle; pending 103-BMS/AU material owns anterior-compartment motor distribution. | prior eligible-LCS reuse; inherited pending |
| 15 | thigh M6 + p10 repeat 3 → `femoral-sheath` | `femoral sheath`; `femoral canal`; `sheath compartments`; `femoral canal medial vein` | Exact prior eligible handle; pending concepts explicitly place the canal medial to the femoral vein. | prior eligible-LCS reuse; inherited pending |
| 16 | leg M1 → `tibialis-anterior-oina` | `tibialis anterior`; `tibialis anterior insertion`; `deep fibular nerve tibialis`; `ankle dorsiflexion inversion` | Exact prior eligible handle; group-action hits remain narrower than the requested muscle anatomy. | prior eligible-LCS reuse; inherited new |
| 17 | leg M2 → `flexor-digitorum-longus-oina` | `flexor digitorum longus`; `FDL muscle`; `tibial nerve FDL`; `lateral four toes flexion` | Exact prior eligible handle; no substantive same-scope concept hit. | prior eligible-LCS reuse; inherited new |
| 18 | leg W1 → `superficial-posterior-leg-compartment` | `superficial posterior leg`; `posterior compartment leg muscles`; `gastrocnemius soleus plantaris`; `tibial nerve calf` | Ankle and tibial-injury material mentions gastrocnemius/soleus or calf paralysis but does not own the three-muscle compartment plus nerve-supply objective. | new; MSK/ANA |
| 19 | leg W2 → `deep-fibular-nerve-terminal-branches` | `deep fibular nerve terminal`; `deep peroneal nerve branches`; `medial terminal branch deep fibular`; `lateral terminal branch deep fibular` | No substantive live, pending, prior-LCS or external-bank handle owns the two terminal divisions. | new; NEU/ANA |
| 20 | foot W1 → `medial-plantar-nerve-branches` | `medial plantar nerve`; `medial plantar branches`; `proper plantar digital nerve`; `common plantar digital nerves` | Live cutaneous territory and a pending article are narrower/non-concept evidence; no concept owns the requested branch list. | new; NEU/ANA |
| 21 | foot W2,M2 → `intrinsic-foot-layers` | `layers of sole`; `third layer foot`; `plantar muscle layers`; `intrinsic foot muscles` | Exact prior eligible handle; no substantive corpus record supersedes its inherited disposition. | prior eligible-LCS reuse; inherited new |
| 22 | foot M1 → `foot-arches` | `foot arches`; `longitudinal arch foot`; `transverse arch foot`; `peroneus longus arch` | Pending AU concept owns all three arches and specifically the peroneus-longus tie beam of the transverse arch. | pending; new to eligible LCS |
| 23 | foot M3 → `inversion-eversion-joints` | `inversion eversion joints`; `subtalar joint movement`; `talocalcaneonavicular movement`; `transverse tarsal joint` | Pending AU/103-BMS concepts explicitly place inversion/eversion at subtalar plus transverse-tarsal/talocalcaneonavicular joints, not the ankle. | pending; new to eligible LCS |
| 24 | embryo M1,M5 → `lower-limb-bud-development` | `lower limb bud`; `limb bud week five`; `lower limb somite level`; `L2 S2 limb bud` | Pending 103-BMS limb-bud concept owns timing and formation; extend for segmental level. The source's Week-5 key conflicts with that pending fourth-week statement. | pending; new to eligible LCS; key review |
| 25 | embryo M2 → `lower-limb-muscle-embryology` | `lower limb muscle embryology`; `limb muscles paraxial mesoderm`; `somite myotome limb`; `limb muscle precursor` | Pending 101-ISK somite/dermomyotome concept owns muscle derivation from paraxial-mesoderm myotome and can absorb the limb-specific overlay. | pending; new to eligible LCS |
| 26 | embryo M3 → `lower-limb-medial-rotation` | `lower limb rotation`; `medial rotation limb bud`; `limb development rotation`; `ninety degree medial rotation` | Pending 103-BMS limb-bud concept explicitly owns 90-degree medial lower-limb rotation. | pending; new to eligible LCS |
| 27 | embryo M4 → `apical-ectodermal-ridge` | `apical ectodermal ridge`; `AER limb`; `proximodistal limb growth`; `limb bud ectoderm` | The same pending 103-BMS limb-bud concept owns the AER; extend it for the keyed proximodistal-growth mechanism. | pending; new to eligible LCS |
| 28 | face M1,W1 + p10 repeat 4 → `scalp-layers-and-movement-plane` | `scalp layers`; `SCALP layers`; `loose areolar scalp`; `scalp movement plane` | No substantive live, pending, prior-LCS or external-bank concept owns the five layers plus movement plane. | new; MSK/ANA |
| 29 | face M2 → `scalp-arterial-supply` | `scalp arterial supply`; `blood supply scalp`; `superficial temporal occipital arteries`; `internal external carotid scalp` | No same-scope concept owns the combined internal- and external-carotid scalp supply. | new; CVS/ANA |
| 30 | face M3 + p10 repeat 5 → `facial-nerve-expression` | `facial expression nerve`; `facial nerve motor face`; `muscles facial expression innervation`; `cranial nerve seven face` | Live extracranial facial-nerve course is a narrower relation and does not own motor supply to facial-expression muscles. | new; NEU/ANA |
| 31 | face M4 → `face-sensory-supply` | `sensory supply face`; `facial sensation`; `trigeminal divisions face`; `great auricular angle mandible` | Exact prior eligible handle; no substantive same-scope corpus hit. | prior eligible-LCS reuse; inherited new |
| 32 | face W2 → `scalp-face-venous-drainage` | `scalp venous drainage`; `face venous drainage`; `veins of scalp`; `facial vein termination` | Live anterior-scalp drainage owns only one territory, not the requested five veins and terminations. | new; CVS/ANA |
| 33 | temporal M1 → `temporal-fossa` | `temporal fossa`; `temporal region anatomy`; `temporalis fossa`; `temporal fossa boundary` | Exact prior eligible handle; live chorda-tympani mention is incidental. | prior eligible-LCS reuse; inherited new |
| 34 | temporal M2 → `temporalis-oina` | `temporalis muscle`; `temporalis action`; `jaw closing temporalis`; `mandible elevation temporalis` | No substantive same-scope concept hit. | new; MSK/ANA |
| 35 | temporal M3 → `superficial-temporal-artery` | `superficial temporal artery`; `temporal region blood supply`; `terminal external carotid temporal`; `scalp artery temple` | No substantive same-scope concept hit; preserve the source's ambiguous surface-versus-deep temporal wording. | new; CVS/ANA; key review |
| 36 | temporal M4 → `infratemporal-fossa` | `infratemporal fossa`; `infratemporal orbit communication`; `inferior orbital fissure`; `infratemporal opening` | Exact prior eligible handle; live chorda-tympani course is narrower than fossa communications. | prior eligible-LCS reuse; inherited new |
| 37 | temporal M5 → `mandibular-nerve-branches` | `mandibular nerve`; `V3 foramen ovale`; `mandibular division trigeminal`; `infratemporal nerve` | Exact prior eligible V3 handle can absorb its foramen-ovale entry into the infratemporal fossa. | prior eligible-LCS reuse; inherited new |
| 38 | temporal M6 → `lateral-pterygoid-oina` | `lateral pterygoid`; `lateral pterygoid action`; `mandible protrusion depression`; `muscle of mastication opening` | No substantive same-scope concept hit. | new; MSK/ANA |
| 39 | temporal M7,M8,M10 → `temporomandibular-joint` | `temporomandibular joint`; `TMJ articular disc`; `TMJ lateral ligament`; `synovial jaw joint` | A glossary word-part and incidental fibrocartilage mentions do not own classification, disc compartments and lateral-ligament attachment. | new; MSK/ANA |
| 40 | temporal M9 → `pterygoid-plexus-connections` | `pterygoid plexus`; `pterygoid venous plexus`; `cavernous sinus communication`; `emissary veins pterygoid` | Exact prior eligible handle; live `CON-FND-1DE320DE8928B2` owns its communication route. | prior eligible-LCS reuse; inherited live |
| 41 | neck W1 → `median-neck-region` | `median neck structures`; `midline neck structures`; `median part neck`; `anterior median neck` | No substantive same-scope concept hit. | new; MSK/ANA |
| 42 | neck W2 → `carotid-triangle` | `carotid triangle`; `carotid region`; `triangle boundaries contents`; `anterior triangle neck` | Exact prior eligible handle; no substantive same-scope corpus hit. | prior eligible-LCS reuse; inherited new |
| 43 | neck W3 → `anterior-jugular-vein` | `anterior jugular vein`; `jugular venous arch`; `superficial neck vein`; `anterior neck venous drainage` | No substantive same-scope concept hit. | new; CVS/ANA |
| 44 | neck M1 → `deep-cervical-lymph-nodes` | `deep cervical lymph nodes`; `upper deep cervical nodes`; `jugulodigastric node`; `cervical lymph drainage` | No substantive same-scope concept hit. | new; LYM/ANA |
| 45 | neck M2 → `carotid-sheath` | `carotid sheath`; `carotid sheath contents`; `vagus internal jugular carotid`; `hypoglossal carotid sheath` | Pending 101-ISK deep-fascia concept explicitly owns carotid artery, internal jugular vein and vagus as the sheath contents. | pending; new to eligible LCS |
| 46 | neck M3 → `left-subclavian-first-part-relations` | `left subclavian artery first part`; `first part subclavian relations`; `thoracic duct subclavian artery`; `ansa subclavia subclavian` | No substantive same-scope concept hit. | new; CVS/ANA |
| 47 | neck M4 → `scalenus-anterior-relations` | `scalenus anterior relations`; `anterior scalene surface`; `phrenic nerve scalenus anterior`; `subclavian vein anterior scalene` | Brachial-plexus and fascia mentions are narrower than the requested anterior-surface relation set. | new; MSK/ANA |
| 48 | neck M5 → `greater-occipital-nerve` | `greater occipital nerve`; `dorsal ramus C2`; `occipital scalp nerve`; `semispinalis trapezius nerve` | Prior general scalp-sensory scope is broader but does not own the nerve's course, branches and muscular relations; no substantive concept hit. | new; NEU/ANA |

Source-disposition arithmetic is **1 live + 18 pending + 29 new = 48** handles. Module
novelty is separate: **18 prior eligible-LCS handles + 30 new-to-eligible handles = 48**.
The 30 net handles resolve as **0 live + 12 pending + 18 new**. The five exact screenshot
repeats and nine other repeated same-concept assignments create no additional handle.

### Family-20 checkpoint and cumulative LCS-103 delta

| Family-20 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS handle reuse | 24 | 12 | 18 | 0 | 0 | 0 | 0 |
| New-to-eligible pending handles | 15 | 6 | 12 | 12 | 0 | 12 | 0 |
| New-to-eligible new handles | 23 | 9 | 18 | 18 | 0 | 0 | 18 |
| **Family 20 assessment** | **62** | **27** | **48** | **30** | **0** | **12** | **18** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 19 | 308 | 182 | 153 | 9 | 37 | 107 |
| Family 20 net delta | +62 | +27 | +30 | +0 | +12 | +18 |
| **LCS-103 cumulative after Family 20** | **370** | **209** | **183** | **9** | **49** | **125** |

Arithmetic checks: page prompt totals are `0 + 6 + 11 + 8 + 7 + 8 + 6 + 7 + 4 + 5 =
62`; type totals are `45 + 17 = 62`; key mechanisms are `12 underlines + 15 Answer lines =
27`; `62 - 5 exact repeats = 57` unique forms; `57 - 9 semantic repeats = 48` handles;
`18 prior + 30 net = 48`; `1 + 18 + 29 = 48`; `0 + 12 + 18 = 30`; `308 + 62 =
370`; `182 + 27 = 209`; `153 + 30 = 183`; and `9 + 49 + 125 = 183`. The
external bank remains separately unchanged at `241 prompts / 241 keys / 75 handles = 9 live
/ 66 pending / 0 new`. The 50 auxiliary notes and previously tracked unresolved/malformed
items also remain unchanged. This ten-page department-book tutorial source is now closed.

## Exact next debt

- Return to the remaining direct, non-external tier-3 college sources before student or
  external banks. The next explicit module-labelled local candidate is
  `src_79b0f17a5426e5773083`, `MCQs - College MCQs 103 LCS CBL .pdf`: 110 pages, native text,
  manifest SHA-256 `79b0f17a5426e57730835bca39abda5e82ac8f6c72db7f513cc7a24a805daa55`,
  `HU_Y1` / `HU-LCS-103` / All Subjects / Questions/MCQs, source tier 3.
- Its first-page snippet says `CBL Bone Diseases` and names Dr. Hebat Allah A. Amin, so begin
  with source-first provenance and assessment-versus-teaching classification. If it is a
  mixed CBL pack, inventory one explicit natural question section at a time rather than
  treating all 110 pages as assessment by filename.
- No download is needed. No S2 work is authorised until ranks 1–6 are consolidated and
  `/root` issues the literal `TRIAGE APPROVED` for Helwan Year 1.

## Next-source gate — tier-3 CBL teaching/revision case bank (zero delta)

### Identity, provenance and eligible evidence class

| Field | Verified gate result |
|---|---|
| Manifest source | `src_79b0f17a5426e5773083` |
| Manifest / recomputed SHA-256 | `79b0f17a5426e57730835bca39abda5e82ac8f6c72db7f513cc7a24a805daa55` |
| Local file | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - College MCQs 103 LCS CBL.pdf` |
| Path normalization | the manifest's stored path/filename contains extra spaces around `LCS CBL`; the present organised file uses single spaces, and its recomputed hash proves content identity |
| Container | 110-page, 4:3 landscape, native-text, unencrypted PDF 1.7; PowerPoint metadata; no form or JavaScript |
| Authorship / date metadata | title `PowerPoint Presentation`; author `Dr. Hebat Allah Amin`; created and modified 2024-05-14 |
| Visible provenance | the first and last slides print `http://library.med.utah.edu/WebPath/webpath.html#MENU`; thematic covers name `CBL` and Dr. Hebat Allah A. Amin, but no visible Helwan, faculty, module, year or sitting label was found in the inspected scope markers |
| Authority | eligible lower-authority `HU-LCS-103` teaching/revision assessment evidence by manifest and organised module path; not a sitting paper, department book or independently proven college-origin source |
| Gate method | native text scanned page-by-page for all 110 physical pages; title, initial prompt/key pair, rationale pages, every thematic boundary, the Case-20 exception and closing slides rendered at 170 dpi and visually checked; no download |

This is a **hybrid CBL teaching/revision case bank**, not a continuous exam paper. It contains
complete case-based MCQs, repeated answer-reveal slides and teaching rationale slides. The
repeated keyed version normally preserves the preceding stem and options while coloring the
correct option red; for example, physical pp. 2–3 repeat Case 1 verbatim and p. 3 colors
`c. Osteomyelitis`, while pp. 4–5 do the same for Case 2 and `c. Pott's disease`. Red text in
a stem is not automatically a key: physical p. 38 highlights diagnostic clues in red while
leaving every option black. Later `CORRECT` / `Incorrect` rationale slides corroborate the
same answer but are teaching evidence, not additional prompts or separately counted keys.

The copy pattern must be proved case by case rather than assumed globally. Physical pp. 69
and 70 are both complete Case-20 MCQs with the same stem and lead-in but altered option sets:
p. 69 prints `b. Aneurysmal bone cyst` and `c. Cystic rheumatoid
nodule`, while p. 70 prints `b. Aneurysmal bone cyst` and `c. Bursitis`, with all five options
visible and `d. Ganglion cyst` colored red. The later extraction must retain both as separate
complete prompt occurrences because they are not exact prompt copies, preserve the red key
and option-set conflict, and decide any semantic concept collapse separately under the normal
repeat rules. Other altered or explanation-only slides must receive the same source-first
treatment during their bounded extraction.

### Proven natural sections and safe extraction order

| Natural section | Physical pages | Visible structure | Extraction disposition |
|---|---:|---|---|
| `CBL Bone Diseases` | cover p. 1; Cases 1–11 on pp. 2–35 | question → keyed-repeat pairs; some later cases add one or two `CORRECT` / `Incorrect` rationale slides | **first countable bounded section: physical pp. 2–35 only** |
| `CBL Joint Diseases` | cover p. 36; objectives p. 37; Cases 12–20 on pp. 38–70 | teaching objectives, question/keyed-copy families and rationale slides; Case 20 ends with the complete altered keyed duplicate/reveal noted above | second bounded section after Bone Diseases closes; p. 37 remains teaching, not assessment |
| `CBL General/ Soft Tissue & Bone Neoplasia` | cover p. 71; Cases 21–34 on pp. 72–109; closing/source slide p. 110 | question/keyed-copy families plus selected rationale slides | third bounded section; p. 110 is non-assessment |

For the first countable pass, render and read **every physical page 2–35** and create a
source-order ledger for Cases 1–11. Record each complete unkeyed and keyed question-slide
occurrence, prove exact versus altered copies from the visible stem and option order, collapse
same-case repeats before concept arithmetic, and map the red answer reveal plus any later
`CORRECT` rationale to one source key for that case rather than double-counting corroboration.
Rationale-only slides remain teaching evidence. Search every resulting handle against live,
pending, prior eligible LCS and the separately tracked external bank before disposition. Stop
at physical p. 35; the Joint Diseases cover on p. 36 is the next hard boundary.

This gate contributes **zero prompts, zero keys and zero concepts**. The accepted eligible
checkpoint therefore remains **370 observed prompts / 209 printed keys / 183 concepts = 9
live / 49 pending / 125 new**; the external bank and auxiliary dimensions are unchanged.

## Family 21 — CBL Bone Diseases, Cases 1–11

### Bounded source identity and classification

| Field | Verified Family-21 result |
|---|---|
| Manifest source | `src_79b0f17a5426e5773083` |
| Manifest / recomputed SHA-256 | `79b0f17a5426e57730835bca39abda5e82ac8f6c72db7f513cc7a24a805daa55` |
| Local file | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - College MCQs 103 LCS CBL.pdf` |
| Container | 110-page native-text PDF; the bounded Family-21 section is physical pp. 2–35 |
| Visible section boundary | p. 1 is the `CBL Bone Diseases` cover; Cases 1–11 occupy pp. 2–35; p. 36 starts `CBL Joint Diseases` |
| Evidence class | eligible lower-authority `HU-LCS-103` teaching/revision assessment evidence; question occurrences and printed red-option reveals count, rationale-only slides do not |
| Review method | every physical page 2–35 rendered at 220 dpi and visually read; native text used only as a transcription aid; no download |

The bounded section contains **22 complete MCQ prompt-slide occurrences**: an unkeyed question
slide and a repeated keyed question slide for each of Cases 1–11. It contains **11 printed
keys**, one red option on each keyed repeat. The 12 additional rationale-only teaching slides
on pp. 14–15, 18–19, 22–23, 26–27, 30–31 and 34–35 are not extra prompts, and their
`CORRECT` / `Incorrect` prose does not create extra keys. Red words in the stems of Cases
6–11 are clue emphasis, not answers.

### Source-order occurrence, key and copy ledger

Every one of the 22 observed prompt occurrences is assigned once below. All eleven unkeyed
question slides remain observed prompt evidence even though the immediately following copy
supplies the answer reveal.

| Case | Physical pages | First occurrence | Keyed repeat / printed key | Handle assignment and repeat treatment |
|---:|---:|---|---|---|
| 1 | 2–3 | complete unkeyed MCQ | complete repeat; `C Osteomyelitis` red | both → `chronic-pyogenic-osteomyelitis-clinical-diagnosis`; same-case exact wording/options collapse |
| 2 | 4–5 | complete unkeyed MCQ | complete repeat; `C Pott's disease` red | both → `pott-disease-clinical-pathologic-diagnosis`; same-case exact wording/options collapse |
| 3 | 6–7 | complete unkeyed MCQ | complete repeat; `E Pyogenic osteomyelitis` red | both → `chronic-pyogenic-osteomyelitis-clinical-diagnosis`; same-case repeat collapses, then semantic collapse with Case 1 |
| 4 | 8–9 | complete unkeyed MCQ | complete repeat; `C Staph aureus` red | both → `staphylococcus-aureus-pyogenic-osteomyelitis`; same-case exact wording/options collapse |
| 5 | 10–11 | complete unkeyed MCQ | complete repeat; `E Stress fracture` red | both → `stress-fracture-clinical-radiologic-pattern`; capitalization-only `On radiological` / `on radiological` alteration retained but collapsed to one prompt form |
| 6 | 12–13 | complete unkeyed MCQ | complete repeat; `D Osteoporosis` red | both → `osteoporosis-density-and-fragility-diagnosis`; same-case exact wording/options collapse |
| 7 | 16–17 | complete unkeyed MCQ | visibly collided/malformed but complete keyed copy; `B Paget disease of bone` red | both → `older-adult-high-alp-skull-bone-disorder-differential`; malformed keyed rendering preserved, same intended stem/options collapsed |
| 8 | 20–21 | complete unkeyed MCQ | complete repeat; `E Congestive heart failure` red | both → `paget-disease-cardiac-and-joint-complications`; same-case exact wording/options collapse |
| 9 | 24–25 | complete unkeyed MCQ | complete repeat; `B Osteogenesis imperfecta` red | both → `osteogenesis-imperfecta-type-I-collagen`; same-case exact wording/options collapse |
| 10 | 28–29 | complete unkeyed MCQ | complete repeat; `E Poor alignment` red | both → `fracture-nonunion-risk-poor-alignment`; same-case exact wording/options collapse |
| 11 | 32–33 | complete unkeyed MCQ | complete repeat; `D Achondroplasia` red | both → `achondroplasia-clinical-pattern`; same-case exact wording/options collapse |

The eleven within-case copy collapses reduce 22 occurrences to 11 prompt forms. Cases 1 and
3 are separate clinical occurrences but ask the same chronic-pyogenic-osteomyelitis diagnosis
objective and collapse semantically. Thus `22 - 11 - 1 = 10` source-distinct handles.

Two explanation sequences require explicit source-risk preservation:

- Case 6's p. 13 red `D Osteoporosis` and p. 14 `(D) CORRECT` agree. On p. 15, however,
  `(E)` discusses McCune-Albright/fibrous dysplasia, which is absent from the five printed
  options, and `(F)` discusses metastases although metastatic breast carcinoma is printed as
  option E. The one mapped printed key remains red D; the shifted/malformed explanation is
  not silently reconciled.
- Case 10's p. 29 red `E Poor alignment` conflicts with the p. 30–31 explanation lettering:
  the rationale introduces absent option A `Diabetes mellitus`, shifts the printed options,
  and calls `(F) CORRECT` for poor alignment although the MCQ has only A–E. The one mapped
  printed key remains red E, and the rationale conflict is retained for review.

### Search-before-mint and prior-LCS disposition ledger

Each of the ten source-distinct handles received one query against each required surface:
live state (`server/data` and `src/data`), pending state (`docs/import-ready` and
`docs/questions-import-ready`), all prior source-import lanes, and the accepted prior-LCS
ledger. That is **10 × 4 = 40 required invocations**. Taxonomy leaves, MCQ-option strings and
incidental mentions were rejected as substantive coverage. The separately tracked external
Histology bank has no exact same-scope handle; its osteoporosis/calcitonin treatment record
is narrower and does not alter the eligible disposition.

| # | Case assignment → handle | Four-query bundle | Corpus / prior-LCS result | Source disposition | Eligible-module effect |
|---:|---|---|---|---|---|
| 1 | Cases 1,3 → `chronic-pyogenic-osteomyelitis-clinical-diagnosis` | `chronic osteomyelitis`; `draining sinus bone infection`; `pyogenic osteomyelitis diagnosis`; `sequestrum involucrum sinus` | Prior LCS owns the narrower sequestrum/involucrum/cloaca terminology and diabetic-foot or sickle-cell contexts, not this clinical diagnosis objective. No substantive live or pending match. | new | +1 new |
| 2 | Case 2 → `pott-disease-clinical-pathologic-diagnosis` | `Pott disease`; `tuberculous spondylitis`; `spinal tuberculosis`; `vertebral tuberculosis granulomatous` | No substantive live, pending, external-bank or prior eligible-LCS record owns the combined clinical/pathologic diagnosis. | new | +1 new |
| 3 | Case 4 → `staphylococcus-aureus-pyogenic-osteomyelitis` | `staphylococcus aureus osteomyelitis`; `staph aureus bone infection`; `pyogenic osteomyelitis organism`; `osteomyelitis causative organism` | Other osteomyelitis records own diabetic, sickle-cell or morphologic contexts, not the keyed organism relationship. | new | +1 new |
| 4 | Case 5 → `stress-fracture-clinical-radiologic-pattern` | `stress fracture`; `fatigue fracture`; `athletic overuse fracture`; `periosteal bone formation fissure` | No substantive live, pending, external-bank or prior-LCS same-scope record. | new | +1 new |
| 5 | Case 6 → `osteoporosis-density-and-fragility-diagnosis` | `osteoporosis`; `fragility fracture`; `vertebral compression fracture osteoporosis`; `postmenopausal bone loss` | Exact accepted Family-17/18 eligible handle; pending `CON-MSK-89674D65B2316B` owns density loss and fracture risk. | pending; prior eligible-LCS reuse | +0 |
| 6 | Case 7 → `older-adult-high-alp-skull-bone-disorder-differential` | `Paget disease bone`; `osteitis deformans`; `mosaic bone alkaline phosphatase`; `enlarged skull hearing loss` | Exact accepted Family-12 eligible handle; no substantive corpus match supersedes its inherited new disposition. | prior eligible-LCS reuse; inherited new | +0 |
| 7 | Case 8 → `paget-disease-cardiac-and-joint-complications` | `Paget high output heart failure`; `Paget congestive heart failure`; `bone hypervascularity cardiac failure`; `Paget complications` | Exact accepted Family-18 eligible handle; no substantive live or pending record owns the complication pair. | prior eligible-LCS reuse; inherited new | +0 |
| 8 | Case 9 → `osteogenesis-imperfecta-type-I-collagen` | `osteogenesis imperfecta`; `type I collagen bone fractures`; `blue sclera hearing loss`; `brittle bone disease` | Exact accepted Family-17 eligible handle, previously promoted from auxiliary evidence; no substantive live/pending match. | prior eligible-LCS reuse; inherited new | +0 |
| 9 | Case 10 → `fracture-nonunion-risk-poor-alignment` | `fracture nonunion`; `pseudarthrosis`; `poor alignment fracture healing`; `delayed union malalignment` | Exact accepted Family-17 eligible handle; pending fractured-neck material is vascular rather than alignment-mechanism coverage. | prior eligible-LCS reuse; inherited new | +0 |
| 10 | Case 11 → `achondroplasia-clinical-pattern` | `achondroplasia`; `short limbed dwarfism`; `FGFR3 dwarfism`; `rhizomelic short stature` | Exact prior-LCS auxiliary-only handle from Family 9, never counted in tested totals; no substantive live or pending record owns the pattern. | prior-LCS auxiliary promotion; new | +1 new |

Source-disposition arithmetic is **0 live + 1 pending + 9 new = 10** handles. Module novelty
is separate: **5 prior eligible reuse + 5 new to eligible = 10**. All five net concepts are
new, so the eligible delta resolves as **0 live + 0 pending + 5 new**. The pending status on
the osteoporosis handle is inherited evidence for a concept already counted in the baseline,
not a new pending concept.

### Family-21 checkpoint and cumulative LCS-103 delta

| Family-21 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS reuse (Cases 6–10) | 10 | 5 | 5 | 0 | 0 | 0 | 0 |
| New-to-eligible handles (Cases 1/3, 2, 4, 5, 11) | 12 | 6 | 5 | 5 | 0 | 0 | 5 |
| **Family 21 assessment evidence** | **22** | **11** | **10** | **5** | **0** | **0** | **5** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 20 | 370 | 209 | 183 | 9 | 49 | 125 |
| Family 21 net delta | +22 | +11 | +5 | +0 | +0 | +5 |
| **LCS-103 cumulative after Family 21** | **392** | **220** | **188** | **9** | **49** | **130** |

Arithmetic checks: `11 cases × 2 complete prompt slides = 22`; `11 keyed repeats × 1 red
option = 11` keys; `22 - 11 same-case copy collapses = 11` prompt forms; `11 - 1 Case-1/
Case-3 semantic collapse = 10` source-distinct handles; `5 prior eligible reuse + 5 net =
10`; `0 + 1 + 9 = 10` source dispositions; `0 + 0 + 5 = 5` net dispositions; `370 + 22
= 392`; `209 + 11 = 220`; `183 + 5 = 188`; and `9 + 49 + 130 = 188`. The 12
rationale-only teaching slides add no assessment counts. The external bank remains separately
unchanged at `241 prompts / 241 keys / 75 handles = 9 live / 66 pending / 0 new`; the 50
auxiliary notes and tracked unresolved/malformed items also remain unchanged.

## Exact next debt

- Continue the same local source with the next hard-bounded section, `CBL Joint Diseases`:
  physical p. 36 is the cover, p. 37 is a teaching-objectives slide, and **Cases 12–20 occupy
  physical pp. 38–70**. Inventory only pp. 38–70 in the next bounded family.
- Preserve the already-proven Case-20 exception: pp. 69 and 70 are both complete MCQs with
  the same stem/lead-in but altered option sets; p. 70 has red `D Ganglion cyst`. Retain both
  as prompt occurrences, preserve both visible option sets and the reveal, and decide semantic
  collapse separately rather than calling them exact copies.
- No download is needed. The later General / Soft Tissue & Bone Neoplasia section remains
  deferred behind completion of Joint Diseases.

## Family 22 — CBL Joint Diseases, Cases 12–20

### Bounded source identity and assessment classification

| Field | Verified Family-22 result |
|---|---|
| Manifest source | `src_79b0f17a5426e5773083` |
| Manifest / recomputed SHA-256 | `79b0f17a5426e57730835bca39abda5e82ac8f6c72db7f513cc7a24a805daa55` |
| Local file | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - College MCQs 103 LCS CBL.pdf` |
| Bounded section | physical pp. 38–70, Cases 12–20 only; p. 36 cover and p. 37 objectives excluded |
| Hard next boundary | p. 71 is the `CBL GENERAL/ SOFT TISSUE & BONE NEOPLASIA` cover; Case 21 begins on p. 72 |
| Evidence class | eligible lower-authority `HU-LCS-103` teaching/revision assessment evidence |
| Review method | every physical page 38–70 rendered at 220 dpi and visually read; native text used only as a transcription aid; no download |

This 33-page section contains three visually different slide classes:

- **14 complete MCQ prompt occurrences**: nine first question slides, four full keyed copies,
  and the complete altered Case-20 keyed occurrence.
- **four answer-only reveal slides** on pp. 39, 47, 59 and 63. Each prints a red answer option
  and therefore supplies one key, but it does not repeat the complete stem/options and is not
  counted as another prompt occurrence.
- **15 rationale-only teaching slides** on pp. 40–41, 44–45, 48–49, 52–53, 56–57,
  60–61, 64 and 67–68. `CORRECT` statements corroborate the reveal but create neither an
  additional prompt nor an additional key.

Red phrases in the stems are teaching emphasis. A key is counted only when a specific option
is red on a reveal slide. There are therefore **nine printed keys**, one for each Case 12–20.

### Source-order prompt, reveal and rationale ledger

| Case | Physical pages | Complete prompt occurrences | Printed reveal / key | Rationale-only pages | One-to-one assignment and copy treatment |
|---:|---:|---:|---|---:|---|
| 12 | 38–41 | 1 (p. 38) | p. 39 answer-only; `C Osteoarthritis` red | 2 | p. 38 → `osteoarthritis-clinical-etiology-differential`; p. 39 is key evidence, not a prompt |
| 13 | 42–45 | 2 (pp. 42–43) | p. 43 full keyed copy; `C Hyperuricemia` red | 2 | both → `malignancy-associated-gout-hyperuricemia`; identical wording/options collapse, despite changed illustration |
| 14 | 46–49 | 1 (p. 46) | p. 47 answer-only; `A Chronic renal failure` red | 2 | p. 46 → `malignancy-associated-gout-hyperuricemia`; p. 47 is key evidence, not a prompt; semantic collapse with Case 13 |
| 15 | 50–53 | 2 (pp. 50–51) | p. 51 full keyed copy; `B Ankylosing spondylitis` red | 2 | both → `ankylosing-spondylitis-clinical-and-sacroiliac-ankylosis-pattern`; identical wording/options collapse |
| 16 | 54–57 | 2 (pp. 54–55) | p. 55 full keyed copy; `D Anti-citrullinated peptide` red | 2 | both → `rheumatoid-arthritis-anti-ccp-serology`; identical wording/options collapse despite image/layout change |
| 17 | 58–61 | 1 (p. 58) | p. 59 answer-only; `D Osteoarthritis` red | 2 | p. 58 → `osteoarthritis-clinical-etiology-differential`; p. 59 is key evidence, not a prompt; semantic collapse with Case 12 |
| 18 | 62–64 | 1 (p. 62) | p. 63 answer-only; `A Ankylosis` red | 1 | p. 62 → `ankylosing-spondylitis-clinical-and-sacroiliac-ankylosis-pattern`; p. 63 is key evidence, not a prompt; semantic collapse with Case 15 |
| 19 | 65–68 | 2 (pp. 65–66) | p. 66 full keyed copy; `C Juvenile idiopathic arthritis` red | 2 | both → `juvenile-idiopathic-arthritis-clinical-pattern`; identical wording/options collapse |
| 20 | 69–70 | 2 (pp. 69–70) | p. 70 complete altered keyed occurrence; `D Ganglion cyst` red | 0 | both → `ganglion-cyst-clinicopathologic-pattern`; two complete occurrences retained, then semantically collapsed |
| **Family 22** | **38–70** | **14** | **9 printed keys** | **15** | **all occurrences assigned once** |

The four exact wording/option repeats in Cases 13, 15, 16 and 19 reduce 14 complete prompt
occurrences to ten prompt forms. Four separately proven semantic collapses then reduce ten
forms to six handles: Cases 12/17 share osteoarthritis recognition; Cases 13/14 share the
accepted gout/hyperuricaemia/trigger scope; Cases 15/18 share the same ankylosing-spondylitis
clinical and sacroiliac-ankylosis pattern; and Case-20 pp. 69/70 ask the same ganglion-cyst
diagnosis. Thus `14 - 4 - 4 = 6` source-distinct handles.

Case 20 is not an exact-copy collapse. Both pp. 69 and 70 have the same complete stem and
lead-in, but p. 69 prints option C `Cystic rheumatoid nodule`, while p. 70 replaces it with
`Bursitis`; p. 70 also replaces the image and colors D `Ganglion cyst` red. Both prompt
occurrences and both option sets are preserved before their shared concept assignment.

Two further source-quality risks remain literal:

- Case 16's p. 57 `(E) Incorrect` explanation says ankylosis can occur with severe rheumatoid
  arthritis, but printed option E is `Borrelia burgdorferi antibody`. The explanation does not
  correspond to that option. Red D and p. 56 `(D) CORRECT` agree, so D remains the one mapped
  printed key while the E-rationale mismatch remains flagged.
- Case 19's p. 68 option-B rationale omits the opening parenthesis and runs
  `burgdorferiinfection` together. This malformed rationale does not alter red C on p. 66.

### Search-before-mint and prior-LCS disposition ledger

Each of the six source-distinct handles received one query against each required surface:
live state (`server/data` and `src/data`), pending state (`docs/import-ready` and
`docs/questions-import-ready`), every prior source-import lane, and the accepted prior-LCS
ledger. That is **6 × 4 = 24 required invocations**. Four additional wording variants for the
new ankylosing, juvenile-arthritis and ganglion scopes give **28 invocations total**. The
separately tracked external Histology bank contains no same-scope record.

| # | Case assignment → handle | Four-query bundle | Corpus / prior-LCS result | Source disposition | Eligible-module effect |
|---:|---|---|---|---|---|
| 1 | Cases 12,17 → `osteoarthritis-clinical-etiology-differential` | `osteoarthritis`; `osteophytes joint space narrowing`; `Heberden nodes osteoarthritis`; `weight-bearing joint pain use` | Exact accepted Family-12/18/19 eligible handle. Current corpus matches remain taxonomy/incidental only. | prior eligible-LCS reuse; inherited new | +0 |
| 2 | Cases 13,14 → `malignancy-associated-gout-hyperuricemia` | `gout hyperuricemia`; `needle-shaped urate crystals`; `renal failure gout tophus`; `podagra hyperuricemia` | Exact accepted Family-17/18/19 live handle; Family 19 already extended it across podagra, renal-failure tophus and other non-malignancy triggers. | live; prior eligible-LCS reuse | +0 |
| 3 | Cases 15,18 → `ankylosing-spondylitis-clinical-and-sacroiliac-ankylosis-pattern` | `ankylosing spondylitis`; `inflammatory back pain activity`; `HLA-B27 sacroiliitis`; `bony ankylosis spine` | No substantive live, pending, external-bank or prior-LCS record owns the clinical-plus-sacroiliac pattern. | new | +1 new |
| 4 | Case 16 → `rheumatoid-arthritis-anti-ccp-serology` | `anti-citrullinated peptide`; `anti-CCP rheumatoid arthritis`; `swan-neck anti-CCP`; `rheumatoid serology` | Exact accepted Family-19 eligible handle; no substantive external record supersedes its inherited new disposition. | prior eligible-LCS reuse; inherited new | +0 |
| 5 | Case 19 → `juvenile-idiopathic-arthritis-clinical-pattern` | `juvenile idiopathic arthritis`; `Still disease arthritis`; `child fever lymphadenopathy arthritis`; `ANA juvenile rheumatoid arthritis` | No substantive live, pending, external-bank or prior-LCS same-scope record. | new | +1 new |
| 6 | Case 20 → `ganglion-cyst-clinicopathologic-pattern` | `ganglion cyst`; `wrist ganglion fibrous wall`; `cyst no epithelial lining wrist`; `painless fluctuant wrist swelling` | No substantive live, pending, external-bank or prior-LCS same-scope record. Prior popliteal-bursitis and carpal-tunnel handles are different objectives. | new | +1 new |

Source-disposition arithmetic is **1 live + 0 pending + 5 new = 6** handles. Module novelty
is separate: **3 prior eligible reuse + 3 new to eligible = 6**. The three net concepts all
resolve as new, so the eligible delta is **0 live + 0 pending + 3 new**.

### Family-22 checkpoint and cumulative LCS-103 delta

| Family-22 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS reuse (OA, gout, RA anti-CCP) | 7 | 5 | 3 | 0 | 0 | 0 | 0 |
| New-to-eligible handles (ankylosing spondylitis, JIA, ganglion cyst) | 7 | 4 | 3 | 3 | 0 | 0 | 3 |
| **Family 22 assessment evidence** | **14** | **9** | **6** | **3** | **0** | **0** | **3** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 21 | 392 | 220 | 188 | 9 | 49 | 130 |
| Family 22 net delta | +14 | +9 | +3 | +0 | +0 | +3 |
| **LCS-103 cumulative after Family 22** | **406** | **229** | **191** | **9** | **49** | **133** |

Arithmetic checks: prompt-slide counts are `1 + 2 + 1 + 2 + 2 + 1 + 1 + 2 + 2 = 14`;
the nine cases provide nine red-option keys; `14 - 4 exact repeats = 10` prompt forms;
`10 - 4 semantic collapses = 6` handles; `3 prior eligible reuse + 3 net = 6`; `1 + 0 +
5 = 6` source dispositions; `0 + 0 + 3 = 3` net dispositions; `14 prompt slides + 4
answer-only reveals + 15 rationale-only slides = 33` bounded physical pages; `392 + 14 =
406`; `220 + 9 = 229`; `188 + 3 = 191`; and `9 + 49 + 133 = 191`. The external
bank remains separately unchanged at `241 prompts / 241 keys / 75 handles = 9 live / 66
pending / 0 new`; the 50 auxiliary notes and tracked unresolved/malformed items also remain
unchanged. The Joint Diseases section is now closed.

## Exact next debt

- Continue the same source with its final assessment section, `CBL GENERAL/ SOFT TISSUE &
  BONE NEOPLASIA`: physical p. 71 is the cover, **Cases 21–34 occupy physical pp. 72–109**,
  and p. 110 is the closing/source slide. The next bounded inventory is pp. 72–109 only.
- Preserve question slides, red-option keyed copies, answer-only reveals and rationale-only
  teaching slides as separate evidence classes; do not infer a regular copy pattern from the
  earlier sections.
- No download is needed. After Cases 21–34 close, this 110-page CBL source can be marked
  fully inventoried.

## Family 23 — CBL General / Soft Tissue & Bone Neoplasia, Cases 21–34

### Bounded source identity and assessment classification

| Field | Verified Family-23 result |
|---|---|
| Manifest source | `src_79b0f17a5426e5773083` |
| Manifest / recomputed SHA-256 | `79b0f17a5426e57730835bca39abda5e82ac8f6c72db7f513cc7a24a805daa55` |
| Local file | `/Users/doitrous/Desktop/helwan/Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - College MCQs 103 LCS CBL.pdf` |
| Bounded section | physical pp. 72–109, Cases 21–34 only; p. 71 cover and p. 110 closing/source slide excluded |
| Source closure | Cases 21–34 are the final assessment section; after this family all 110 physical pages have been classified |
| Evidence class | eligible lower-authority `HU-LCS-103` teaching/revision assessment evidence |
| Review method | every physical page 72–109 rendered at 180 dpi and visually read; native text and extracted font colours used only to cross-check wording and red-option reveals; no download |

This 38-page section contains **28 complete MCQ prompt occurrences**, exactly two complete
question slides for each of Cases 21–34. Thirteen second occurrences, Cases 21–33, print one
red answer option and therefore supply **13 printed keys**. Case 34's second occurrence adds a
histology image but leaves every option black; there is no answer text or later rationale, so
Case 34 remains a complete unkeyed MCQ and no answer is inferred.

Ten slides are rationale-only teaching evidence: pp. 84–85, 88–89, 92, 95–96, 99 and
102–103. Their `CORRECT` / `Incorrect` prose corroborates the already red option for Cases
26–31 but creates neither an additional prompt nor an additional key. There are no
answer-only reveal slides in this section. Red wording in first-occurrence stems is clue
emphasis, not a key.

### Source-order prompt, reveal and rationale ledger

| Case | Physical pages | Complete prompt occurrences | Printed reveal / key | Rationale-only pages | One-to-one assignment and copy treatment |
|---:|---:|---:|---|---:|---|
| 21 | 72–73 | 2 | p. 73 full keyed occurrence; `C Rhabdomyosarcoma` red | 0 | both → `childhood-vaginal-rhabdomyosarcoma-clinicopathologic-pattern`; identical wording/options collapse |
| 22 | 74–75 | 2 | p. 75 full keyed occurrence; `C Synovial sarcoma` red | 0 | both → `synovial-sarcoma-young-adult-thigh-clinicopathologic-pattern`; identical wording/options collapse |
| 23 | 76–77 | 2 | p. 77 full keyed occurrence; `B Colonic adenocarcinoma` red | 0 | both → `familial-adenomatous-polyposis-associated-colonic-adenocarcinoma`; identical wording/options collapse |
| 24 | 78–79 | 2 | p. 79 full keyed occurrence; `B Fibrosarcoma` red | 0 | both → `fibrosarcoma-herringbone-spindle-cell-pattern`; identical wording/options collapse |
| 25 | 80–81 | 2 | p. 81 complete keyed occurrence; `B Hemangioma` red | 0 | both → `infantile-hemangioma-clinical-course`; p. 80 prints `His mother` while p. 81 prints `Heris mother`, so the two forms are retained then semantically collapsed |
| 26 | 82–85 | 2 | p. 83 full keyed occurrence; `D Giant cell tumor` red | 2 | both → `giant-cell-tumor-stromal-cell-biology`; identical wording/options collapse |
| 27 | 86–89 | 2 | p. 87 full keyed occurrence; `D Chondrosarcoma` red | 2 | both → `chondrosarcoma-vs-osteosarcoma-comparison`; identical wording/options collapse and extend the accepted pelvic-site/morphology scope |
| 28 | 90–92 | 2 | p. 91 full keyed occurrence; `A Ewing sarcoma` red | 1 | both → `ewing-sarcoma-clinical-radiology`; identical wording/options collapse |
| 29 | 93–96 | 2 | p. 94 full keyed occurrence; `B Osteosarcoma` red | 2 | both → `sunburst-periosteal-lifting-bone-tumor-differential`; identical wording/options collapse and extend the accepted osteoid/metaphyseal scope |
| 30 | 97–99 | 2 | p. 98 full keyed occurrence; `A Osteochondroma` red | 1 | both → `osteochondroma-typical-location`; identical wording/options collapse |
| 31 | 100–103 | 2 | p. 101 full keyed occurrence; `C Osteoid osteoma` red | 2 | both → `osteoid-osteoma-clinicoradiologic-pattern`; identical wording/options collapse |
| 32 | 104–105 | 2 | p. 105 full keyed occurrence; `D Lipoma` red | 0 | both → `lipoma-clinicopathologic-pattern`; identical wording/options collapse despite changed gross/microscopic illustration |
| 33 | 106–107 | 2 | p. 107 full keyed occurrence; `E Liposarcoma` red | 0 | both → `liposarcoma-retroperitoneal-clinicopathologic-pattern`; identical wording/options collapse despite changed gross/microscopic illustration |
| 34 | 108–109 | 2 | none; all options remain black on both slides | 0 | both → `bland-fibrous-finger-mass-differential`; identical wording/options collapse, but the option-neutral differential remains keyless |
| **Family 23** | **72–109** | **28** | **13 printed keys** | **10** | **all occurrences assigned once** |

The thirteen identical wording/option repeats in Cases 21–24 and 26–34 reduce 28 complete
occurrences to 15 prompt forms. Case 25's two visibly different forms then collapse onto the
same clinical-course objective. Thus `28 - 13 - 1 = 14` source-distinct handles, one per case.
The different clinical, gross and microscopic images remain attached to their own source
occurrences even where the wording/options collapse.

Case 34 is not silently keyed as fibroma. Its handle records what the complete source actually
tests—a painless finger mass with bland hypocellular spindle-cell morphology and five printed
diagnostic options—without converting medical inference into source authority.

### Search-before-mint and prior-LCS disposition ledger

Each of the fourteen source-distinct handles received one query against each required surface:
live state (`server/data` and `src/data`), pending state (`docs/import-ready` and
`docs/questions-import-ready`), every prior source-import lane, and the accepted prior-LCS
ledger. That is **14 × 4 = 56 required invocations**. A glossary-only `lipoma` hit and broad
tumour mentions were rejected as substantive coverage. The separately tracked external
Histology bank contains no same-scope handle for the five module additions.

| # | Case assignment → handle | Four-query bundle | Corpus / prior-LCS result | Source disposition | Eligible-module effect |
|---:|---|---|---|---|---|
| 1 | Case 21 → `childhood-vaginal-rhabdomyosarcoma-clinicopathologic-pattern` | `vaginal rhabdomyosarcoma`; `sarcoma botryoides`; `childhood genitourinary rhabdomyosarcoma`; `pleomorphic malignant cells vaginal mass` | No substantive live, pending, external-bank or prior eligible-LCS same-scope record. | new | +1 new |
| 2 | Case 22 → `synovial-sarcoma-young-adult-thigh-clinicopathologic-pattern` | `synovial sarcoma`; `young adult thigh sarcoma`; `biphasic spindle epithelial tumor`; `t(X;18) SS18` | No substantive live, pending, external-bank or prior-LCS same-scope record. | new | +1 new |
| 3 | Case 23 → `familial-adenomatous-polyposis-associated-colonic-adenocarcinoma` | `familial adenomatous polyposis`; `hundreds colorectal polyps`; `APC colonic adenocarcinoma`; `young adult polyposis colon cancer` | No substantive live, pending, external-bank or prior-LCS record owns the polyposis-plus-invasive-gland diagnosis scope. | new | +1 new |
| 4 | Case 24 → `fibrosarcoma-herringbone-spindle-cell-pattern` | `fibrosarcoma`; `herringbone pattern`; `uniform spindle cells`; `malignant fibroblast fascicles` | Exact accepted Family-17 live handle; live `CON-DER-78AF0815FE7330` owns the herringbone fascicular spindle-cell pattern. | live; prior eligible-LCS reuse | +0 |
| 5 | Case 25 → `infantile-hemangioma-clinical-course` | `infantile hemangioma`; `strawberry hemangioma`; `postnatal growth spontaneous regression`; `child vascular tumor involution` | Exact accepted Family-19 eligible handle; live capillary/cavernous records remain morphology-only, so its inherited new disposition stands. | prior eligible-LCS reuse; inherited new | +0 |
| 6 | Case 26 → `giant-cell-tumor-stromal-cell-biology` | `giant cell tumor bone`; `osteoclastoma epiphysis`; `soap bubble distal radius`; `multinucleated giant cells spindle stroma` | Exact accepted Family-12/19 eligible handle owns adult epiphyseal site, soap-bubble imaging and stromal-cell biology. | prior eligible-LCS reuse; inherited new | +0 |
| 7 | Case 27 → `chondrosarcoma-vs-osteosarcoma-comparison` | `chondrosarcoma`; `pelvic cartilage tumor`; `bluish white calcified mass`; `older adult destructive cartilage neoplasm` | Exact accepted Family-12/17/19 handle already absorbs pelvic-site and chondroid-matrix morphology. | prior eligible-LCS reuse; inherited new | +0 |
| 8 | Case 28 → `ewing-sarcoma-clinical-radiology` | `Ewing sarcoma`; `t(11;22) bone tumor`; `onion skin diaphysis`; `small round blue cell bone` | Exact accepted Family-18 eligible handle owns the age, diaphyseal onion-skin and round-blue-cell scope; this case adds the printed translocation. | prior eligible-LCS reuse; inherited new | +0 |
| 9 | Case 29 → `sunburst-periosteal-lifting-bone-tumor-differential` | `osteosarcoma`; `Codman triangle osteoid`; `metaphyseal malignant bone tumor`; `osteoid producing sarcoma` | Exact accepted Family-12/17 eligible handle; no substantive corpus record supersedes its inherited new disposition. | prior eligible-LCS reuse; inherited new | +0 |
| 10 | Case 30 → `osteochondroma-typical-location` | `osteochondroma`; `cartilage capped exostosis`; `metaphyseal bony projection`; `growth plate hamartoma` | Exact accepted Family-19 eligible handle, itself promoted from auxiliary location evidence. | prior eligible-LCS reuse; inherited new | +0 |
| 11 | Case 31 → `osteoid-osteoma-clinicoradiologic-pattern` | `osteoid osteoma`; `nocturnal pain aspirin`; `radiolucent nidus`; `cortical sclerosis osteoid` | Exact accepted Family-17/19 eligible handle owns night pain, aspirin response, cortical nidus and surrounding sclerosis. | prior eligible-LCS reuse; inherited new | +0 |
| 12 | Case 32 → `lipoma-clinicopathologic-pattern` | `lipoma`; `encapsulated mature adipocytes`; `benign adipocytic tumor`; `painless soft yellow mass` | Exact accepted Family-18 eligible handle; the pending glossary occurrence is not substantive coverage. | prior eligible-LCS reuse; inherited new | +0 |
| 13 | Case 33 → `liposarcoma-retroperitoneal-clinicopathologic-pattern` | `liposarcoma`; `retroperitoneal adipocytic sarcoma`; `lipoblast hyperchromatic nucleus`; `myxoid fatty tumor` | No substantive live, pending, external-bank or prior-LCS same-scope record. | new | +1 new |
| 14 | Case 34 → `bland-fibrous-finger-mass-differential` | `finger fibroma`; `benign fibrous tumor`; `hypocellular bland spindle cells`; `painless finger fibrous mass` | No substantive live, pending, external-bank or prior-LCS same-scope record. The handle stays option-neutral because the source prints no key. | new; keyless | +1 new |

Source-disposition arithmetic is **1 live + 0 pending + 13 new = 14** handles. Module
novelty is separate: **9 prior eligible reuse + 5 new to eligible = 14**. All five net
concepts resolve as new, so the eligible delta is **0 live + 0 pending + 5 new**.

### Family-23 checkpoint, cumulative LCS-103 delta and source closure

| Family-23 evidence bucket | Prompt occurrences | Printed keys | Source-distinct handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS reuse (Cases 24–32) | 18 | 9 | 9 | 0 | 0 | 0 | 0 |
| New-to-eligible keyed handles (Cases 21–23 and 33) | 8 | 4 | 4 | 4 | 0 | 0 | 4 |
| New-to-eligible keyless differential (Case 34) | 2 | 0 | 1 | 1 | 0 | 0 | 1 |
| **Family 23 assessment evidence** | **28** | **13** | **14** | **5** | **0** | **0** | **5** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 22 | 406 | 229 | 191 | 9 | 49 | 133 |
| Family 23 net delta | +28 | +13 | +5 | +0 | +0 | +5 |
| **LCS-103 cumulative after Family 23** | **434** | **242** | **196** | **9** | **49** | **138** |

Arithmetic checks: `14 cases × 2 complete prompt slides = 28`; Cases 21–33 provide 13
red-option keys and Case 34 provides none; `28 - 13 identical wording/option repeats = 15`
prompt forms; `15 - 1 altered Case-25 semantic collapse = 14` handles; `9 prior eligible
reuse + 5 net = 14`; `1 + 0 + 13 = 14` source dispositions; `0 + 0 + 5 = 5` net
dispositions; `28 prompt slides + 10 rationale-only slides = 38` bounded physical pages;
`406 + 28 = 434`; `229 + 13 = 242`; `191 + 5 = 196`; and `9 + 49 + 138 =
196`. The external bank remains separately unchanged at `241 prompts / 241 keys / 75
handles = 9 live / 66 pending / 0 new`; the 50 auxiliary notes and tracked unresolved/
malformed items also remain unchanged. The complete 110-page CBL source is now closed.

## Exact next debt

- `src_79b0f17a5426e5773083` is fully inventoried: p. 1 cover; Bone Diseases pp. 2–35;
  Joint Diseases cover/objectives pp. 36–37 and Cases 12–20 pp. 38–70; General / Soft Tissue
  & Bone Neoplasia cover p. 71 and Cases 21–34 pp. 72–109; closing/source p. 110. No page
  remains in this source.
- Broader LCS-103 S1 remains incomplete. After Family 24, the rank-4/rank-5 local-source
  remainder is **52 path instances / 50 unique hashes**: the two duplicate tier-4 path pairs
  remain path provenance, not extra source families. The next manifest-order evidence gate is
  `src_95c1a0516668c3eda345`, `Nervesand Vessels of Head and Neck 4.pdf` (28 pages; tier 4;
  native text; local LCS Anatomy theoretical path). The separate anatomy/histology and
  pathology/physiology/pharmacology/biochemistry scopes also await consolidation.
- No download was performed. No S2 work is authorised until rank 1–6 triage is consolidated
  and `/root` issues the fresh literal `TRIAGE APPROVED` for Helwan Year 1.

## Family 24 — Tier-4 Anatomy lecture interactive-question gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_85203d8d86d05275cf7d` |
| Manifest / recomputed SHA-256 | `85203d8d86d05275cf7d2569aa49690a45194b7f77bc27f339e59089f73e34bc` |
| Local path | `Year 1/LCS 103/Anatomy/Theoretical/Head & Neck/Lec 10 - Temporal & Infratemporal Fossa/Anatomy_Lecture_Temporal_Infratemporal_Fossa_Muscles_Of_Mastication.pdf` |
| Manifest class | Helwan `HU_Y1` / `HU-LCS-103` / Anatomy / Theoretical / tier 4 / 52 native-text pages |
| Visible provenance | p. 1 prints `Ass. Prof. Dr. Eman El Sawaf`, `Anatomy & Embryology Department`, `Faculty Of Medicine`, and `Capital University (Formerly Helwan)`; p. 2 prints `Locomotor Module` / `Anatomy` / `Head & Neck` |
| Container / boundary | Unencrypted 52-page PowerPoint PDF, 720 × 540 pt, no form or JavaScript; every physical page was rendered and read. Pages 1–18 are lecture setup, p. 19 is the first interactive prompt, pp. 20–49 remain instructional material, p. 50 is the final interactive prompt, and pp. 51–52 are references/closing. |
| Authority | Direct, Helwan-labelled tier-4 teaching evidence. It is not a sitting paper or official key, and the embedded checks are formative `Interactive Question` slides rather than an independently administered assessment. |

The full-source gate finds exactly three complete printed prompts: p. 19 asks for the contents
of the infratemporal fossa; p. 32 asks for temporalis origin, insertion, nerve supply and
action; p. 50 asks which listed cranial nerve supplies the muscles of mastication. There are
**zero printed keys**. The surrounding explanatory slides are not converted into keys: p. 16–18
list teaching content, pp. 24–31 teach temporalis anatomy, and p. 29 states mandibular-nerve
innervation, but none is an answer reveal, underlined/coloured option, answer line or keyed
copy of its interactive prompt. The p. 50 choices are all visibly unmarked. No complete
question, answer-space, option set or answer-reveal occurs elsewhere in the 52-page source.

### Source-first handles, search and overlap result

The three prompts have no within-source copies or semantic collapse. Each received four
`find-existing` query forms across live/pending state and all source-import roots (**3 × 4 =
12 invocations**), then a direct comparison with accepted prior LCS and the separately tracked
external Histology banks.

| Source prompt | Handle | Search / prior-LCS result | Disposition |
|---|---|---|---|
| p. 19 `List the contents of the infratemporal fossa?` | `infratemporal-fossa` | Exact accepted Family-20 temporal M4 handle. The sole live chorda-tympani mention is narrower than fossa contents; no external-bank same-scope handle. | prior eligible-LCS reuse; inherited new |
| p. 32 temporalis OINA request | `temporalis-oina` | Exact accepted Family-20 temporal M2 handle. No substantive live/pending or external-bank same-scope concept supersedes the prior LCS scope. | prior eligible-LCS reuse; inherited new |
| p. 50 CN supply MCQ | `mandibular-nerve-motor-supply-to-muscles-of-mastication` | The earlier `mandibular-nerve-branches` handle covers branches/foramen-ovale context, not this motor-supply question. No live, pending, external-bank or accepted prior-LCS same-scope hit. | new; NEU/ANA |

The source-level handle result is **0 live / 0 pending / 3 new**. Module novelty is separate:
two handles reuse eligible LCS and one is new to eligible LCS, so the module delta is **+1
concept = 0 live / 0 pending / +1 new**. This teaching-source result does not promote the
source to a sitting assessment or an official key.

| Family-24 evidence bucket | Prompt occurrences | Printed keys | Source handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS reuse | 2 | 0 | 2 | 0 | 0 | 0 | 0 |
| New eligible-LCS tested scope | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| **Family 24 assessment evidence** | **3** | **0** | **3** | **1** | **0** | **0** | **1** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 23 | 434 | 242 | 196 | 9 | 49 | 138 |
| Family 24 net delta | +3 | +0 | +1 | +0 | +0 | +1 |
| **LCS-103 cumulative after Family 24** | **437** | **242** | **197** | **9** | **49** | **139** |

Arithmetic checks: `2 + 1 = 3` prompts and handles; `0 + 0 + 3 = 3` source dispositions;
`2 prior eligible + 1 new-to-eligible = 3`; `434 + 3 = 437`; `242 + 0 = 242`; `196 + 1 =
197`; and `9 + 49 + 139 = 197`. No ID, content record, catalogue update, import or source
copy was created.

## Family 25 — Tier-4 Anatomy lecture interactive-prompt family

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_95c1a0516668c3eda345` |
| Manifest / recomputed SHA-256 | `95c1a0516668c3eda3458aecd774b45c0ee4559278f9c788162ae302d53dc88a` |
| Local path | `Year 1/LCS 103/Anatomy/Theoretical/Head & Neck/Lec 11 - Blood Vessels & Nerves of Head & Neck/Nervesand Vessels of Head and Neck 4.pdf` |
| Manifest class | Helwan `HU_Y1` / `HU-LCS-103` / Anatomy / Theoretical / tier 4 / 28 native-text pages |
| Visible provenance | p. 1 prints `Nerves and Vessels of Head and Neck`, `By; Dr. Sarah Arakib`, and `MD Anatomy and Embryology`; the source itself prints no university, module, assessment or sitting label. |
| Container / boundary | Unencrypted 28-page PowerPoint PDF, 960 × 540 pt, no form or JavaScript; every physical page was rendered at original resolution and read. Pages 1–12 are teaching slides, p. 13 contains the sole interactive prompt, pp. 14–27 return to teaching material, and p. 28 is the closing slide. |
| Authority | Manifest/path-assigned tier-4 local teaching evidence. It is not a sitting paper, department bank or official key; its single embedded question is formative lecture evidence only. |

The full-source gate finds exactly **one complete prompt occurrence** and **zero printed keys**.
On p. 13, `Clinical importance ??` follows the `Pterygoid plexus` heading and its connection
bullets, so the visible context makes the requested target complete: clinical importance of
the pterygoid plexus. The surrounding statements are lecture teaching, not an answer reveal,
answer convention or keyed response. In particular, the slide prints facial-vein and
cavernous-sinus communications but does not print a labelled answer or state the clinical
consequence; none is inferred from medical knowledge. No other complete question, response
field, option set, answer line, highlighted choice or answer reveal occurs on pp. 1–28.

### Source-first handle, search and overlap result

The single occurrence produces one source handle, `pterygoid-plexus-clinical-importance`.
It received four required `find-existing` searches across live/pending state and all
source-import roots: `pterygoid plexus clinical importance`, `pterygoid venous plexus
cavernous sinus infection`, `pterygoid plexus danger area face`, and `pterygoid plexus
dental infection spread` (**1 × 4 = 4 invocations**). The four direct query runs returned no
new same-string record, but scope comparison resolves it to accepted Family-1 handle
`pterygoid-plexus-connections`: that handle already owns the pterygoid plexus's facial and
cavernous-sinus communications and is live through `CON-FND-1DE320DE8928B2`. Family 20 also
reused that same handle. Therefore this source occurrence is **prior eligible-LCS reuse;
inherited live**, not a new concept.

| Family-25 evidence bucket | Prompt occurrences | Printed keys | Source handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS reuse | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| **Family 25 assessment evidence** | **1** | **0** | **1** | **0** | **0** | **0** | **0** |

The source-level handle result is **1 live / 0 pending / 0 new**; the module net is zero
because that live scope was already counted in Family 1. Source disposition and additive
module disposition are intentionally kept separate.

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 24 | 437 | 242 | 197 | 9 | 49 | 139 |
| Family 25 net delta | +1 | +0 | +0 | +0 | +0 | +0 |
| **LCS-103 cumulative after Family 25** | **438** | **242** | **197** | **9** | **49** | **139** |

Arithmetic checks: `1 prompt = 1 source handle`; `1 + 0 + 0 = 1` source disposition;
`1 prior eligible + 0 new-to-eligible = 1`; `437 + 1 = 438`; `242 + 0 = 242`;
`197 + 0 = 197`; and `9 + 49 + 139 = 197`. Removing this unique source from the accepted
Family-24 remainder leaves **51 rank-4/rank-5 path instances / 49 unique hashes**. The next
manifest-order evidence gate is tier-4 Anatomy source `src_c9f3a9a347a23822db32`, `Face.pdf`
(63 pages; SHA-256 `c9f3a9a347a23822db328f3fc95a5208fccb94f161b7b054d1d93a567b8730be`).
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 26 — Tier-4 Face lecture interactive-prompt family

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_c9f3a9a347a23822db32` |
| File / SHA-256 | `Face.pdf` / `c9f3a9a347a23822db328f3fc95a5208fccb94f161b7b054d1d93a567b8730be` |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 · native PDF · 63 pages |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Head & Neck/Lec 8 - Scalp & Face/Face.pdf` |
| Visible provenance | Ass. Prof. Dr. Eman El Sawaf · Anatomy & Embryology · Faculty of Medicine · Capital University (Formerly Helwan) |
| Authority finding | Direct local Helwan-labelled teaching lecture; it is not an examination, department question bank, or official answer key. |

The manifest hash was recomputed and matched. All **63 physical pages** were rendered and
read. Pages 1–33 and 35–60 are declarative teaching: objectives, headings, diagrams,
captions, clinical illustrations, tables and reference material. Pages 62–63 are references
and closing material. None is treated as an assessment prompt, answer reveal or key.

Only these complete, explicitly labelled interactive prompts qualify:

| Page | Printed prompt observation | Printed key treatment |
|---:|---|---|
| 34 | `Mention the origin, insertion and nerve supply of orbital part of orbicularis oculi muscle?` | No answer reveal or printed key. Nearby teaching text is not retrofitted into an answer. |
| 61 | `Which branch of the facial nerve supplies the orbicularis oris muscle?` with options Temporal / Zygomatic / Buccal / Cervical | Options are visibly unmarked; the preceding muscle table is teaching material, not an answer reveal. No answer is inferred. |

This is a complete source closure, not a partial screen: **2 prompt occurrences / 0 directly
printed keys**. No objectives, captions, diagrams, ordinary teaching statements, or the
unmarked multiple-choice options were counted as keys.

### Source-first handles, searches and overlap

| Source handle | Prompt scope retained | Required `find-existing` query set | Search / prior-LCS result | Disposition |
|---|---|---|---|---|
| `orbital-part-orbicularis-oculi-oina` | Orbital orbicularis oculi origin, insertion and nerve supply | orbital part orbicularis oculi origin insertion nerve supply; orbicularis oculi orbital part facial nerve; orbicularis oculi oina; orbicularis oculi temporal zygomatic facial nerve | Four searches found no live or pending same-scope record. The broader Family-20 `facial-nerve-expression` handle is not this OINA scope. | new · MSK/ANA |
| `orbicularis-oris-facial-nerve-branch-innervation` | Facial-nerve branch innervating orbicularis oris | orbicularis oris facial nerve buccal branch; buccal branch supplies orbicularis oris; facial nerve branches orbicularis oris; orbicularis oris motor innervation | Four searches found no live or pending same-scope record. The broader Family-20 `facial-nerve-expression` handle is not this named branch-innervation scope. | new · NEU/ANA |

The ledger has two source-distinct handles and **2 × 4 = 8** required searches. There are no
literal duplicates, semantic collapses, external-bank matches, or prior eligible-LCS matches.
Both source and additive module disposition are therefore **0 live / 0 pending / 2 new**.

| Family-26 evidence bucket | Prompt occurrences | Printed keys | Source handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| New tested scopes | 2 | 0 | 2 | 2 | 0 | 0 | 2 |
| **Family 26 assessment evidence** | **2** | **0** | **2** | **2** | **0** | **0** | **2** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 25 | 438 | 242 | 197 | 9 | 49 | 139 |
| Family 26 net delta | +2 | +0 | +2 | +0 | +0 | +2 |
| **LCS-103 cumulative after Family 26** | **440** | **242** | **199** | **9** | **49** | **141** |

Arithmetic checks: `2 prompts = 2 source handles`; `0 + 0 + 2 = 2`; `438 + 2 = 440`;
`242 + 0 = 242`; `197 + 2 = 199`; and `9 + 49 + 141 = 199`. Removing this unique source
from the accepted Family-25 remainder leaves **50 rank-4/rank-5 path instances / 48 unique
hashes**. The next manifest-order evidence gate is tier-4 Anatomy source
`src_d32797506d25c0624326`, `Scalp.pdf` (38 pages; SHA-256
`d32797506d25c062432627346e867c97ff3f5992a907b1933d68ed3eb5aafd28`). Broader LCS-103 S1
remains incomplete. No download, ID, content record, catalogue update, import or source copy
was created.


## Family 27 — Tier-4 Scalp lecture interactive-prompt family

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_d32797506d25c0624326` |
| File / SHA-256 | `Scalp.pdf` / `d32797506d25c062432627346e867c97ff3f5992a907b1933d68ed3eb5aafd28` |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 · native PDF · 38 pages |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Head & Neck/Lec 8 - Scalp & Face/Scalp.pdf` |
| Visible provenance | Ass. Prof. Dr. Eman El Sawaf · Anatomy & Embryology · Faculty of Medicine · Capital University (Formerly Helwan) |
| Authority finding | Direct local Helwan-labelled teaching lecture; it is not an examination, department question bank, or official answer key. |

The manifest SHA-256 was recomputed and matched. All **38 physical pages** were rendered and
read. Pages 1–18 and 20–35 are declarative teaching: cover/module framing, objectives,
headings, diagrams, anatomy descriptions, clinical illustrations, tables, summaries and
captions. Pages 37–38 are references and closing material. They are not counted as prompts,
answer reveals or keys.

Only these complete, explicitly labelled interactive prompts qualify:

| Physical page | Printed prompt observation | Printed key treatment |
|---:|---|---|
| 19 | `List the layers of the scalp?` | No answer reveal or printed key. The surrounding lecture layer diagrams/text are not converted into a key. |
| 36 | `Which branch of the facial nerve supplies the frontal bellies of occipitofrontalis muscle?` with options Temporal / Zygomatic / Buccal / Cervical | Options are visibly unmarked; the earlier motor-innervation slide is teaching material, not an answer reveal. No answer is inferred. |

This is a complete source closure: **2 prompt occurrences / 0 directly printed keys**. No
objective, caption, diagram, table, lecture statement, or unmarked option is treated as a
printed answer.

### Source-first handles, searches and overlap

| Source handle | Prompt scope retained | Required `find-existing` query set | Search / prior-LCS result | Disposition |
|---|---|---|---|---|
| `scalp-layers` | Five anatomical layers of the scalp | scalp layers; five layers scalp; loose areolar scalp; scalp movement plane | All four searches returned no live or pending record. Accepted Family-20 `scalp-layers-and-movement-plane` owns the complete five-layer scope and absorbs this subset. | prior eligible-LCS reuse; inherited new |
| `frontalis-temporal-branch-facial-nerve-innervation` | Temporal facial-nerve branch supplying frontal bellies of occipitofrontalis | frontalis temporal branch facial nerve; temporal branch frontal belly; occipitofrontalis motor innervation; facial nerve frontal bellies | All four searches returned no live or pending record. The broader Family-20 `facial-nerve-expression` handle, like it was for Family-26 named facial branches, does not own this named branch-to-muscle relation. | new · NEU/ANA |

The ledger has two source-distinct handles and **2 × 4 = 8** successful `find-existing`
invocations. There are no literal duplicates, semantic collapses, or external-bank matches.
The source-level result is **0 live / 0 pending / 2 new**; one exact prior eligible-LCS reuse
leaves an additive module delta of **0 live / 0 pending / 1 new**.

| Family-27 evidence bucket | Prompt occurrences | Printed keys | Source handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| Prior eligible-LCS reuse | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| New named branch-to-muscle scope | 1 | 0 | 1 | 1 | 0 | 0 | 1 |
| **Family 27 assessment evidence** | **2** | **0** | **2** | **1** | **0** | **0** | **1** |

| Module checkpoint | Observed question records | Printed keys recovered | Distinct resolved concepts tested | Live-hit | Pending-hit | New |
|---|---:|---:|---:|---:|---:|---:|
| Cumulative after Family 26 | 440 | 242 | 199 | 9 | 49 | 141 |
| Family 27 net delta | +2 | +0 | +1 | +0 | +0 | +1 |
| **LCS-103 cumulative after Family 27** | **442** | **242** | **200** | **9** | **49** | **142** |

Arithmetic checks: `2 prompts = 2 source handles`; `0 + 0 + 2 = 2`; `1 prior eligible +
1 new-to-eligible = 2`; `440 + 2 = 442`; `242 + 0 = 242`; `199 + 1 = 200`; and
`9 + 49 + 142 = 200`. Removing this unique source from the accepted Family-26 remainder
leaves **49 rank-4/rank-5 path instances / 47 unique hashes**. The next manifest-order
evidence gate is tier-5 all-subject practical source `src_6da2de9f2e39f6bdcb46`,
`practical L.L HELWAN.pdf` (11 pages; SHA-256
`6da2de9f2e39f6bdcb46c092922b8982ae54b6aef6e43f942dd1b534891e129c`). Broader LCS-103 S1
remains incomplete. No download, ID, content record, catalogue update, import or source copy
was created.

## Family 28 — Tier-5 lower-limb osteology practical teaching atlas

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_6da2de9f2e39f6bdcb46` |
| File / SHA-256 | `practical L.L HELWAN.pdf` / `6da2de9f2e39f6bdcb46c092922b8982ae54b6aef6e43f942dd1b534891e129c` |
| File boundary | 2,915,074 bytes · native PDF · 11 physical pages |
| Manifest placement | `HU-LCS-103` · All Subjects · Practical · tier 5 |
| Local corpus path | `Year 1/LCS 103/All Subjects/Practical/practical L.L HELWAN.pdf` |
| Visible provenance | every page carries `ANATOMY`, `Practical bones` and `BY DR Mohamed Ali`; PDF metadata names author `Mohamed Ali` |
| Authority finding | Helwan-local practical teaching atlas by filename/path placement; it is not an examination, station sheet, department question bank, response form or official answer key. |

The manifest SHA-256 was recomputed and matched. All **11 physical pages** were rendered and
read. The source contains labelled osteology plates rather than a learner-facing question
bank: there is no instruction to identify a structure, station stem, ordinary question,
response field, blank, mark allocation, correctness mark or answer convention. Numbered
pointers and colour legends are shown simultaneously with their teaching labels. They are
therefore recorded as directly printed **teaching-label mappings**, not retrofitted into
image-dependent prompts and not counted as assessment keys.

### Complete practical-unit classification

| Physical pages | Source-first unit | Classification | Directly printed teaching labels / residue |
|---:|---|---|---:|
| 1 | hip bone, lateral view | one image-dependent practical teaching plate; no prompt | 27 numbered mappings |
| 2 | hip bone, medial view | one image-dependent practical teaching plate; no prompt | 25 mappings (`1–24` plus `A`) |
| 3 | femur, anterior view | one image-dependent practical teaching plate; no prompt | 14 numbered mappings |
| 4 | femur, posterior view | one image-dependent practical teaching plate; no prompt | 24 numbered mappings |
| 5–6 | tibia and fibula, anterior view | one two-page practical teaching plate; the same image is repeated while complementary tibial and fibular label lists are printed | 27 unique numbered mappings |
| 7–8 | tibia and fibula, posterior view | one two-page practical teaching plate; the same image is repeated while complementary label lists are printed | 27 directly named unique mappings; callout `11` remains masked as `********`; page 8 masks `24`, but page 7 directly prints `24. Nutrient foramen` |
| 9 | tarsal bones, medial/lateral/superior views | one colour-coded practical teaching plate; no prompt | 5 unique group-label mappings; repeated legends across views are not recounted |
| 10 | metatarsal bones, superior/inferior/lateral views | one colour-coded practical teaching plate; no prompt | 1 directly printed group-label mapping; numeric tags `1–5` are not expanded into inferred names |
| 11 | phalangeal bones, inferior view | one colour-coded practical teaching plate; no prompt | 3 unique group-label mappings |

The **11 page occurrences consolidate to 9 source-distinct practical teaching plates** because
pages 5–6 and 7–8 each split one repeated image across complementary label lists. The source
prints **153 unique teaching-label mappings** (`27 + 25 + 14 + 24 + 27 + 27 + 5 + 1 + 3`)
and leaves one unique callout masked. These counts do not become 153 questions, practical
stations or keys. The assessment boundary is **0 practical/station prompts / 0 ordinary
questions / 0 printed assessment keys**. No missing image item is rewritten into prose, and
neither the masked callout nor the five metatarsal numeric tags is resolved by anatomy
knowledge.

### Source-first practical scopes, searches and prior-LCS adjudication

| Practical teaching handle | Four required `find-existing` queries | External / prior-LCS result |
|---|---|---|
| `hip-bone-lateral-landmark-identification` | hip bone lateral landmarks; ilium ischium pubis lateral view; hip bone gluteal surface anatomy; acetabulum iliac spines identification | new; no same-scope live, pending or prior eligible-LCS plate |
| `hip-bone-medial-landmark-identification` | hip bone medial landmarks; ilium medial surface anatomy; iliac fossa auricular surface arcuate line; hip bone pelvic surface identification | new; no same-scope live, pending or prior eligible-LCS plate |
| `femur-anterior-landmark-identification` | femur anterior landmarks; anterior femur bone identification; femur head neck trochanter patellar surface; femur osteology anterior view | new; no same-scope live, pending or prior eligible-LCS plate |
| `femur-posterior-landmark-identification` | femur posterior landmarks; posterior femur bone identification; linea aspera trochanteric fossa intercondylar fossa; femur osteology posterior view | new; no same-scope live, pending or prior eligible-LCS plate |
| `tibia-fibula-anterior-landmark-identification` | tibia fibula anterior landmarks; anterior tibia fibula bone identification; tibial tuberosity interosseous border malleoli; leg bones osteology anterior view | new; no same-scope live, pending or prior eligible-LCS plate |
| `tibia-fibula-posterior-landmark-identification` | tibia fibula posterior landmarks; posterior tibia fibula bone identification; soleal line malleolar fossa fibular notch; leg bones osteology posterior view | new; no same-scope live, pending or prior eligible-LCS plate |
| `tarsal-bones-multiview-identification` | tarsal bones identification; talus calcaneus navicular cuboid cuneiform; foot tarsal bones medial lateral superior views; tarsal osteology practical | new; no same-scope live, pending or prior eligible-LCS plate |
| `metatarsal-bones-multiview-identification` | metatarsal bones identification; first fifth metatarsal superior inferior lateral; foot metatarsal osteology; metatarsal bones practical | new; no same-scope live, pending or prior eligible-LCS plate |
| `foot-phalanges-segment-identification` | foot phalanges identification; proximal intermediate distal phalanges; toe phalangeal bones practical; phalanges inferior view | new; no same-scope live, pending or prior eligible-LCS plate |

All **9 × 4 = 36** literal searches completed with no live or pending hit. Accepted prior-LCS
handles test muscle, vessel, joint, compartment and movement relations rather than these
whole-plate osteology-identification scopes. The practical-teaching disposition is therefore
`0 live / 0 pending / 9 new`. Because the source contains no assessment prompt, those nine
teaching scopes are tracked separately and do not add nine tested concepts to the question
checkpoint.

### Separated question and practical evidence checkpoint

| Evidence dimension | Before Family 28 | Family 28 delta | After Family 28 |
|---|---:|---:|---:|
| Eligible observed question records | 442 | +0 | 442 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 200 | +0 | 200 |
| Question live / pending / new | 9 / 49 / 142 | +0 / +0 / +0 | 9 / 49 / 142 |
| Stand-alone practical/station prompt occurrences | 0 | +0 | 0 |
| Distinct practical teaching plates | 0 | +9 | 9 |
| Directly printed practical teaching-label mappings | 0 | +153 | 153 |
| Masked/unresolved practical callouts | 0 | +1 | 1 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 0 | +0 / +0 / +9 | 0 / 0 / 9 |
| Practical content records created | 0 | +0 | 0 |

The six explicitly external practical-relevant MCQs recorded in Families 13–14 remain inside
their separate external-bank question inventory and are not merged into this eligible local
stand-alone practical dimension. Family 28 adds practical teaching coverage, not assessment
authority: the eligible question checkpoint remains **442 / 242 / 200 = 9 / 49 / 142**.

Removing this unique tier-5 source from the accepted Family-27 remainder leaves **48
rank-4/rank-5 path instances / 46 unique hashes**. The next evidence-ranked local gate is
tier-5 all-subject practical source `src_1c10b647790aca3d4183`, `practical helwan locomotor
1.pdf` (41 native-text pages; SHA-256
`1c10b647790aca3d41833edb5e54fc5f354963a23c3f203da963df2f7970a2c3`). Its manifest snippet
already contains `identify this bone` instructions, so it requires a full page-level
station/prompt, printed-key, image-dependence, repeat and prior-LCS gate. Broader LCS-103 S1
remains incomplete. No download, ID, content record, catalogue update, import or source copy
was created.

## Family 29 — Tier-5 mixed lower-limb practical assessment and teaching pack

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_1c10b647790aca3d4183` |
| File / SHA-256 | `practical helwan locomotor 1.pdf` / `1c10b647790aca3d41833edb5e54fc5f354963a23c3f203da963df2f7970a2c3` |
| File boundary | 2,835,262 bytes · native PDF · 41 physical pages |
| Manifest placement | `HU-LCS-103` · All Subjects · Practical · tier 5 |
| Local corpus path | `Year 1/LCS 103/All Subjects/Practical/practical helwan locomotor 1.pdf` |
| Visible provenance | the pages carry `Practical` / `Anatomy practical`, `lower limb` or `lower limb & H&N`, and `Dr/ M. Ali`; the PDF producer is iLovePDF |
| Authority finding | Helwan-local practical teaching/revision material by manifest placement; it is not an exam, recoverable sitting, station sheet, response form, department question bank or official answer key. |

The manifest SHA-256 was recomputed and matched. All **41 physical pages** were rendered and
read. Pages 1–5 each contain an explicit `Question ??` block tied to the labelled image on that
page. Pages 6–9 are lower-limb labelled teaching plates only; pp. 10–25 are skull teaching and
reference pages; pp. 26–35 are labelled anatomy-practical model pages; and pp. 36–41 are
summary/reference tables. The source has no response field, blank answer area, mark allocation,
station/sitting convention, printed answer block or assessment key.

Five teaching-only residues are preserved outside assessment counts: two rule blanks on pp.
14–15, two `???` attachment callouts on p. 19, and one forced-inspiration rule blank on p. 38.
The teaching portion mixes multi-figure labelled plates, declarative prose and tables, so it is
not assigned a fabricated aggregate label count. That unquantified teaching residue does not
alter Family 28's separately verified 9-plate / 153-mapping quantitative checkpoint.

### Complete assessment prompt classification

| Ref / physical page | Image-specific prompt scope | Printed key treatment |
|---|---|---|
| P1 / p. 1 | Hip-bone identification, side, articulations, joint types and attached structures | none; the simultaneous labelled plate is teaching context, not an assessment key |
| P2 / p. 2 | Hip-joint ligament identification, attachments and functions | none; the simultaneous labelled ligament plate is teaching context |
| P3 / p. 3 | Femur identification, side, articulations, joint types and attached structures | none; the simultaneous labelled plate is teaching context |
| P4 / p. 4 | Anterior-view femoral/hip attachment map with origin, insertion, nerve supply and action of the attached muscles | none; printed labels are teaching context |
| P5 / p. 5 | Posterior-view femoral/hip attachment map with origin, insertion, nerve supply and action of the attached muscles | none; printed labels are teaching context |

P1 and P3 use the same generic bone instruction, and P4 and P5 use the same generic muscle
instruction. They remain **five prompt occurrences and five source-distinct image scopes**:
the paired pages show different bones or different attachment views, so wording repetition does
not make any occurrence a copy. There are three literal stem forms but no semantic collapse.

### Five-scope searches and prior-LCS adjudication

| Practical assessment handle | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `hip-bone-side-articulations-and-attached-structures` | hip bone landmark identification lateral medial view; innominate bone side joint muscle attachments; hip bone side determination landmarks; hip bone articulations muscle attachments anatomy | no direct live or pending record; broader composite than Family 28's two landmark-only teaching plates — new |
| `hip-joint-ligament-identification-attachments-and-functions` | hip joint ligaments attachments functions; iliofemoral pubofemoral ischiofemoral ligaments; ligaments of hip joint functions attachments; capsular ligaments hip stability | no direct search hit; exact accepted Family-1/Family-20 `hip-joint-ligaments` reuse, inheriting its pending disposition |
| `femur-side-articulations-and-attached-structures` | femur landmark identification anterior posterior view; femur side joint muscle attachments; femur side determination osteology landmarks; femur articulations muscle attachments anatomy | no direct live or pending record; broader composite than Family 28's two landmark-only teaching plates — new |
| `femur-anterior-attachment-plate-muscle-oina` | anterior medial thigh muscle origins insertions map; quadriceps adductors attachment sites femur hip bone; anterior thigh muscles origin insertion nerve action; medial thigh muscles origin insertion nerve action | no direct live or pending record; individual prior OINA facts do not own this whole image-specific multi-muscle plate — new |
| `femur-posterior-attachment-plate-muscle-oina` | posterior thigh gluteal muscle origins insertions map; hamstring gluteal attachment sites femur hip bone; posterior thigh muscles origin insertion nerve action; gluteal muscles origin insertion nerve action | no direct live or pending record; individual prior OINA facts do not own this whole image-specific multi-muscle plate — new |

All **5 × 4 = 20** searches completed with no direct live or pending record. Exact prior-LCS
comparison changes only P2: raw external search disposition is `0 live / 0 pending / 5 new`,
while source classification after the accepted-prior relation is **0 live / 1 inherited pending
/ 4 new**. The inherited pending handle is not a module addition, so the net module delta is
`0 / 0 / +4`. Partial component overlap does not absorb P1, P3, P4 or P5's wider
image-specific assessment scopes.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 29 | Family 29 delta | After Family 29 |
|---|---:|---:|---:|
| Eligible observed question records | 442 | +5 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 200 | +4 | 204 |
| Question live / pending / new | 9 / 49 / 142 | +0 / +0 / +4 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 0 | +5 | 5 |
| Distinct practical teaching plates, quantified | 9 | unquantified mixed residue | 9 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 153 | unquantified mixed residue | 153 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 1 | +5 | 6 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical content records created | 0 | +0 | 0 |

Arithmetic checks: `5 prompts = 5 image-specific handles`; `0 + 1 + 4 = 5`; `442 + 5 =
447`; `242 + 0 = 242`; `200 + 4 = 204`; and `9 + 49 + 146 = 204` after the one inherited
pending prior reuse is removed from the module delta. The eligible LCS checkpoint is therefore
**447 prompts / 242 printed keys / 204 concepts = 9 live / 49 pending / 146 new**.

Removing this unique tier-5 source from the accepted Family-28 remainder leaves **47
rank-4/rank-5 path instances / 45 unique hashes**. The next manifest-order gate is tier-5
Anatomy practical source `src_01ed16d14274951518d4`, `Bones of the lower limb.pdf` (17 pages;
SHA-256 `01ed16d14274951518d40b1ed757ca1acdb981688af7763a0569fe3cad6a95e5`) under
`Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 1 - Bones of the Lower Limb/`. Broader
LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update, import or
source copy was created.

## Family 30 — Tier-5 lower-limb osteology virtual-lab atlas

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_01ed16d14274951518d4` |
| File / SHA-256 | `Bones of the lower limb.pdf` / `01ed16d14274951518d40b1ed757ca1acdb981688af7763a0569fe3cad6a95e5` |
| File boundary | 864,296 bytes · native PDF · 17 physical pages |
| Manifest placement | `HU-LCS-103` · Anatomy · Practical Labs · tier 5 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 1 - Bones of the Lower Limb/Bones of the lower limb.pdf` |
| Visible provenance | title page prints `Bones of the Lower Limb`, `Dr. Alaa Mohamed` and `Assistant lecturer of anatomy`; PDF author is `Alaa Mohamed` and creator/producer is Microsoft PowerPoint for Microsoft 365 |
| Authority finding | Helwan-local virtual-lab teaching atlas by manifest/path placement; it is not an exam, station sheet, response form, question bank or official answer key. |

The manifest SHA-256 was recomputed and matched. All **17 physical pages** were rendered and
read. Page 1 is the title page, pp. 2–16 are labelled or colour-emphasised lower-limb
osteology teaching plates, and p. 17 is a closing `Thank you` slide. There is no instruction
to identify a structure, explicit practical/station prompt, ordinary question, response field,
blank answer area, mark allocation, correctness convention, printed assessment answer or key.
The simultaneous labels are teaching mappings only.

### Complete defensible plate and mapping inventory

| Physical page | Source-first teaching plate | Directly printed unique mappings / residue |
|---:|---|---:|
| 2 | hip-bone skeletal locator | 1 colour-emphasis/title mapping |
| 3 | hip-bone components and selected landmarks | 8 mappings |
| 4 | hip bone, lateral and medial component views | 5 mappings |
| 5 | lateral hip-bone landmarks | 18 mappings |
| 6 | medial hip-bone landmarks | 20 mappings |
| 7 | femur, anterior and posterior landmarks | 17 mappings |
| 8 | proximal femur, anterior and posterior views | 8 mappings |
| 9 | left femur, anterior and posterior landmarks | 10 mappings |
| 10 | tibia/fibula locator and joint relations | 13 mappings |
| 11 | tibia, anterior and posterior landmarks | 14 readable mappings; one further posterior-shaft callout is visibly masked and remains unresolved |
| 12 | fibula skeletal locator | 4 mappings |
| 13 | tibia/fibula selected landmarks | 9 mappings |
| 14 | fibula landmarks | 12 unique mappings; `Lateral surface` is printed twice on the same figure and counted once |
| 15 | foot-bone groups, oblique view | 10 mappings |
| 16 | foot-bone groups and named tarsals, superior view | 14 mappings |

The **15 plate occurrences are 15 source-distinct images or multiview compositions**; none is
an exact within-source image copy. The directly printed unique mapping arithmetic is
`1 + 8 + 5 + 18 + 20 + 17 + 8 + 10 + 13 + 14 + 4 + 9 + 12 + 10 + 14 = 163`, plus one
masked callout on p. 11. Repeated anatomical labels across genuinely different plates remain
separate evidence occurrences, while the same p. 14 label printed twice on one figure is not
inflated. The assessment boundary is **0 practical/station prompts / 0 ordinary questions /
0 printed assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 15 plates consolidate to six source-level teaching scopes by bone/region; this is a
scope collapse, not a deletion of plate or mapping evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `hip-bone-skeletal-location` · p. 2 | hip bone location skeleton; os coxae pelvic girdle location; coxal bone lower limb attachment; hip bone pelvis axial skeleton | no direct live or pending hit and no accepted prior-LCS locator scope — new |
| `hip-bone-landmarks-multiview` · pp. 3–6 | hip bone landmarks lateral medial views; ilium ischium pubis acetabulum; os coxae osteology landmarks; iliac spines sciatic notches obturator foramen | no direct live or pending hit; Family 28's accepted lateral- and medial-hip-bone teaching handles jointly own this landmark scope — prior teaching reuse |
| `femur-landmarks-multiview` · pp. 7–9 | femur landmarks anterior posterior views; femur head neck trochanters condyles; femur osteology linea aspera patellar surface; femur landmark identification practical | no direct live or pending hit; Family 28's anterior- and posterior-femur teaching handles jointly own this scope — prior teaching reuse |
| `tibia-landmarks-multiview` · pp. 10–11 | tibia landmarks anterior posterior views; tibial condyles tuberosity soleal line malleolus; tibia osteology borders surfaces; tibia landmark identification practical | no direct live or pending hit; the tibial components of Family 28's anterior/posterior tibia-fibula handles absorb this narrower scope — prior teaching reuse |
| `fibula-landmarks-multiview` · pp. 12–14 | fibula landmarks head neck shaft lateral malleolus; fibula osteology borders surfaces; fibular styloid malleolar fossa; fibula landmark identification practical | no direct live or pending hit; the fibular components of Family 28's anterior/posterior tibia-fibula handles absorb this narrower scope — prior teaching reuse |
| `foot-bone-groups-and-tarsals` · pp. 15–16 | bones of foot tarsals metatarsals phalanges; talus calcaneus navicular cuboid cuneiforms; foot bone groups identification; tarsal metatarsal phalangeal layout | no direct live or pending hit; Family 28's accepted tarsal, metatarsal and phalangeal teaching handles jointly own this scope — prior teaching reuse |

All **6 × 4 = 24** required searches completed with no direct live or pending hit. The raw
external result is `0 live / 0 pending / 6 new`; exact accepted-prior comparison removes five
module additions, leaving only the hip-bone locator as **+1 new practical-teaching scope**.
The five reused scopes corroborate earlier practical teaching evidence but do not inflate the
module concept checkpoint.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 30 | Family 30 delta | After Family 30 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 9 verified minimum | +15 | 24 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 153 verified minimum | +163 | 316 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 6 | +1 | 7 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 9 | +0 / +0 / +1 | 0 / 0 / 10 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum; Family 30 adds only its independently countable units. The eligible
question checkpoint therefore remains **447 prompts / 242 printed keys / 204 concepts = 9
live / 49 pending / 146 new**.

This source hash occurs once in the manifest. Removing it from the accepted Family-29
remainder leaves **46 rank-4/rank-5 path instances / 44 unique hashes**. The next
manifest-order gate is tier-5 Anatomy practical source `src_47f9f289a4101c486870`,
`anterior compartment of the thigh.pdf` (24 native-text pages; SHA-256
`47f9f289a4101c486870d510dc71949f885ce517134ac5834cb50fd74ad42e2e`) under
`Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 2 - Anterior Compartment of Thigh/`.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 31 — Tier-5 anterior-thigh virtual-lab teaching deck

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_47f9f289a4101c486870` |
| File / SHA-256 | `anterior compartment of the thigh.pdf` / `47f9f289a4101c486870d510dc71949f885ce517134ac5834cb50fd74ad42e2e` |
| File boundary | 1,995,485 bytes · native PDF · 24 physical pages |
| Manifest placement | `HU-LCS-103` · Anatomy · Practical Labs · tier 5 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 2 - Anterior Compartment of Thigh/anterior compartment of the thigh.pdf` |
| Visible provenance | title page prints `Anatomy of anterior compartment of the thigh`, `Dr. Alaa Mohamed` and `Assistant lecturer`; PDF author is `Alaa Mohamed` and creator/producer is Microsoft PowerPoint for Microsoft 365 |
| Authority finding | Helwan-local virtual-lab teaching deck by manifest/path placement; it is not an exam, station sheet, response form, question bank or official answer key. |

The manifest SHA-256 was recomputed and matched. All **24 physical pages** were rendered and
read. Page 1 is the title page, pp. 2–23 are anterior-thigh teaching slides, and p. 24 is a
closing `Thank you` slide. No page prints an instruction to identify a structure, explicit
practical/station prompt, ordinary question, response field, blank answer area, mark
allocation, correctness convention, printed assessment answer or key. Named structures,
attachment statements and arrows are simultaneous teaching mappings, not answers to an
assessment prompt.

### Complete defensible teaching-slide and mapping inventory

| Physical page | Source-first teaching slide / plate | Directly printed unique mappings / residue |
|---:|---|---:|
| 2 | thigh compartments, anterior-compartment functions and supply | 14 mappings: 6 named cross-section labels plus 8 muscle/function/supply relations |
| 3 | colour-coded anterior-compartment muscles | 6 mappings; one further legend entry is visibly masked |
| 4 | anterior-compartment muscle groups and nerve supply | 8 mappings |
| 5 | labelled anterior-thigh muscle illustration | 6 mappings; 2 further leader-line labels are blank |
| 6 | sartorius origin, insertion and labelled course | 3 unique mappings |
| 7 | sartorius attachment sites on hip bone and tibia | 2 mappings |
| 8 | sartorius model identification | 1 mapping |
| 9 | psoas-major origin, insertion and illustrated identity | 3 mappings |
| 10 | psoas-major origin and insertion plate | 2 directly named mappings; 8 other leader-line callouts are blank |
| 11 | iliacus origin and insertion | 2 mappings |
| 12 | iliacus attachment sites on hip bone and femur | 2 mappings |
| 13 | iliopsoas model identification | 1 mapping |
| 14 | quadriceps components, anatomical illustration | 4 mappings |
| 15 | quadriceps components, laboratory model | 4 mappings |
| 16 | rectus-femoris straight- and reflected-head origins | 2 mappings |
| 17 | vastus-medialis linear origins | 4 mappings |
| 18 | vastus-lateralis linear origins | 4 mappings |
| 19 | vastus-intermedius origin | 1 mapping |
| 20 | common quadriceps insertion chain | 2 mappings |
| 21 | femoral-artery origin | 1 mapping |
| 22 | femoral-artery termination | 1 mapping |
| 23 | femoral-vein beginning and termination | 2 mappings |

The **22 content-slide occurrences are 22 source-distinct teaching compositions**. Reused
base illustrations or the same laboratory-model photograph carry different directly printed
labels and therefore remain distinct evidence plates; no complete page is an exact copy. The
mapping arithmetic is `14 + 6 + 8 + 6 + 3 + 2 + 1 + 3 + 2 + 2 + 2 + 1 + 4 + 4 + 2 + 4 +
4 + 1 + 2 + 1 + 1 + 2 = 75`. The unresolved-residue arithmetic is `1 + 2 + 8 = 11` blank
or masked callouts. Repeated facts on genuinely different teaching plates remain evidence
occurrences, while duplicate wording within one plate is counted once. The assessment
boundary is **0 practical/station prompts / 0 ordinary questions / 0 printed assessment
keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 22 slides consolidate to ten source-level teaching scopes. This scope collapse does not
delete plate or mapping evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `anterior-thigh-compartments-muscles-and-supply` · pp. 2–5 | anterior thigh compartments; anterior compartment thigh muscles; thigh intermuscular septa; anterior thigh femoral nerve supply | no direct live/pending hit; prior quadriceps and femoral-nerve handles own components only, not this compartment-organisation composite — new |
| `sartorius-origin-insertion-and-identification` · pp. 6–8 | sartorius origin insertion; sartorius ASIS tibia; sartorius identification model; sartorius OINA | no direct live/pending hit; exact attachment scope is already owned by accepted `sartorius-oina` — prior LCS reuse |
| `psoas-major-origin-insertion-and-identification` · pp. 9–10 | psoas major origin insertion; psoas lumbar vertebra lesser trochanter; psoas major identification model; psoas major OINA | no direct live/pending hit; Family 4 records nerve supply only and does not own the attachment/identification scope — new |
| `iliacus-iliopsoas-origin-insertion-and-identification` · pp. 11–13 | iliacus origin insertion; iliacus iliac fossa lesser trochanter; iliopsoas tendon lesser trochanter; iliopsoas identification model | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `quadriceps-femoris-components-and-identification` · pp. 14–15 | quadriceps femoris components; quadriceps four heads; rectus vastus intermedius lateralis medialis; quadriceps identification model | no direct live/pending hit in the current search state; exact accepted `quadriceps-femoris-components` scope is prior LCS and retains its inherited pending disposition — prior LCS reuse |
| `rectus-femoris-dual-head-origins` · p. 16 | rectus femoris straight reflected head; rectus femoris two heads origin; rectus femoris AIIS acetabular origin; rectus femoris origin identification | no direct live/pending hit; narrower attachment detail of accepted `rectus-femoris-oina` — prior LCS reuse |
| `vasti-femoral-origins` · pp. 17–19 | vastus medialis origin; vastus lateralis origin; vastus intermedius origin; vasti femur attachment origins | no direct live/pending hit; component-name and action handles do not own the three-muscle attachment scope — new |
| `quadriceps-common-insertion-chain` · p. 20 | quadriceps insertion patella; quadriceps tendon patellar ligament tibial tuberosity; quadriceps common insertion; ligamentum patellae quadriceps insertion | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `femoral-artery-origin-and-termination` · pp. 21–22 | femoral artery origin termination; external iliac continuation femoral artery; femoral artery adductor hiatus popliteal; femoral artery mid inguinal point | no direct live/pending hit; accepted `femoral-artery` handle expressly owns the full origin/termination/branches record — prior LCS reuse |
| `femoral-vein-beginning-and-termination` · p. 23 | femoral vein beginning termination; popliteal vein continuation femoral vein; femoral vein external iliac vein inguinal ligament; femoral vein adductor hiatus | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |

All **10 × 4 = 40** required searches completed with no direct live or pending hit. The raw
external result is `0 live / 0 pending / 10 new`; exact accepted-prior comparison removes
four module additions, leaving **+6 new practical-teaching scopes**. Component overlap alone
does not absorb the six broader or attachment-specific new scopes.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 31 | Family 31 delta | After Family 31 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 24 verified minimum | +22 | 46 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 316 verified minimum | +75 | 391 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 7 | +11 | 18 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 10 | +0 / +0 / +6 | 0 / 0 / 16 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**.

This source hash occurs once in the manifest. Removing it from the accepted Family-30
remainder leaves **45 rank-4/rank-5 path instances / 43 unique hashes**. The next
manifest-order gate is tier-5 Anatomy practical source `src_c3469062f5d94b4598cd`,
`medial compartment and gluteal region-1.pdf` (30 native-text pages; SHA-256
`c3469062f5d94b4598cd466365727e6296e31327587c49604cc3888d98209e2f`) under
`Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 3 - Medial Compartment of the Thigh & Gluteal Region/`.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 32 — Tier-5 medial-thigh and gluteal virtual-lab teaching deck

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_c3469062f5d94b4598cd` |
| File / SHA-256 | `medial compartment and gluteal region-1.pdf` / `c3469062f5d94b4598cd466365727e6296e31327587c49604cc3888d98209e2f` |
| File boundary | 2,194,779 bytes · native PDF · 30 physical pages |
| Manifest placement | `HU-LCS-103` · Anatomy · Practical Labs · tier 5 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 3 - Medial Compartment of the Thigh & Gluteal Region/medial compartment and gluteal region-1.pdf` |
| Visible provenance | title page prints `Anatomy of medial compartment of the thigh and gluteal region`, `Dr. Alaa Mohamed` and `Assistant lecturer`; PDF author is `Alaa Mohamed` and creator/producer is Microsoft PowerPoint for Microsoft 365 |
| Authority finding | Helwan-local virtual-lab teaching deck by manifest/path placement; it is not an exam, station sheet, response form, question bank or official answer key. |

The manifest SHA-256 was recomputed and matched. All **30 physical pages** were rendered and
read. Page 1 is the title page, pp. 2–29 are medial-thigh and gluteal-region teaching slides,
and p. 30 is a closing `Thank you` slide. No page prints an instruction to identify a
structure, explicit practical/station prompt, ordinary question, response field, blank answer
area, mark allocation, correctness convention, printed assessment answer or key. Named
structures, attachment statements, colour regions and arrows are simultaneous teaching
mappings, not answers to an assessment prompt.

### Complete defensible teaching-slide and mapping inventory

| Physical page | Source-first teaching slide / plate | Directly printed unique mappings / residue |
|---:|---|---:|
| 2 | thigh-compartment cross-section | 6 named cross-section mappings |
| 3 | medial-compartment anterior-layer model | 2 muscle/layer mappings; one large content rectangle is visibly blank |
| 4 | medial-compartment layers and colour-coded muscle/landmark diagram | 15 unique mappings: 3 layer relations, 8 skeletal/ligament labels and 4 muscle-colour relations |
| 5 | pectineus model identification | 1 mapping |
| 6 | adductor magnus, adductor longus and gracilis model identification | 3 mappings |
| 7 | gracilis position in the medial compartment | 1 printed mapping; 9 other leader-line callouts are blank |
| 8 | medial-compartment muscle origins on the hip bone | 8 mappings |
| 9 | pectineus origin/insertion and selected hip-bone labels | 4 mappings; one further hip-bone leader line is blank |
| 10 | pectineus and adductor-longus insertions | 2 mappings |
| 11 | adductor-brevis insertion | 2 mappings |
| 12 | adductor-magnus pubic- and ischial-part insertions | 4 mappings |
| 13 | obturator-externus insertion | 1 mapping |
| 14 | upper-femur anterior/posterior landmarks | 8 mappings |
| 15 | gracilis insertion | 1 mapping |
| 16 | superficial/deep gluteal-muscle classification | 9 group-membership mappings |
| 17 | unlabelled femur and gluteal-model montage | 0 directly printed mappings; retained as one teaching composition, not inferred |
| 18 | gluteus-maximus model identification | 1 mapping |
| 19 | gluteus-medius illustration | 1 printed mapping; 2 further leader-line labels are blank |
| 20 | gluteus-minimus model identification | 1 mapping |
| 21 | superficial-gluteal origins and gluteal lines | 6 mappings; one additional iliac-crest arrow is unlabelled |
| 22 | continuation of gluteus-maximus origin on sacrum/coccyx | 1 composite mapping |
| 23 | superficial-gluteal insertions on the femur | 3 mappings |
| 24 | tensor-fasciae-latae origin, insertion and model identification | 3 mappings |
| 25 | deep-gluteal group and model identification | 9 mappings: 5 group memberships plus 4 model identifications |
| 26 | piriformis origin | 1 mapping |
| 27 | obturator-internus and quadratus-femoris origins | 2 mappings |
| 28 | piriformis and quadratus-femoris insertions | 2 mappings |
| 29 | obturator-internus insertion | 1 mapping |

The **28 content-slide occurrences are 28 source-distinct teaching compositions**. Reused
base illustrations or laboratory-model photographs carry different directly printed labels
and remain distinct evidence plates; no complete page is an exact copy. The mapping
arithmetic is `6 + 2 + 15 + 1 + 3 + 1 + 8 + 4 + 2 + 2 + 4 + 1 + 8 + 1 + 9 + 0 + 1 +
1 + 1 + 6 + 1 + 3 + 3 + 9 + 1 + 2 + 2 + 1 = 98`. The unresolved-residue arithmetic is
`1 + 9 + 1 + 2 + 1 = 14` blank, masked or unlabelled callouts/regions. Repeated facts on
genuinely different teaching plates remain evidence occurrences; within-plate duplicate
wording is counted once. The assessment boundary is **0 practical/station prompts / 0
ordinary questions / 0 printed assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 28 slides consolidate to ten source-level teaching scopes. This scope collapse does not
delete plate or mapping evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `medial-thigh-compartment-layers` · pp. 2–7 | medial compartment thigh layers; adductor compartment layers; pectineus adductor longus anterior layer; adductor brevis middle layer | no direct live/pending hit; exact accepted Family-5 auxiliary handle owns the anterior/middle/posterior layer arrangement — prior LCS reuse |
| `medial-thigh-muscle-origins` · pp. 8–9 | medial thigh muscle origins; adductor longus brevis gracilis origins; pectineus obturator externus origins; adductor magnus pubic ischial origins | no direct live/pending hit; individual prior OINA facts do not jointly own this six-muscle attachment-map scope — new |
| `medial-thigh-muscle-insertions` · pp. 9–15 | medial thigh muscle insertions; adductor longus brevis femur insertions; adductor magnus adductor tubercle insertion; gracilis pectineus obturator externus insertions | no direct live/pending hit; individual prior OINA facts do not jointly own this multi-muscle attachment-map scope — new |
| `superficial-and-deep-gluteal-muscle-classification` · pp. 16–20, 25 | superficial deep gluteal muscles; gluteal muscle layers classification; gluteus maximus medius minimus tensor fascia lata; piriformis obturator internus gemelli quadratus femoris | no direct live/pending hit; individual muscle handles and the deep-gluteal action handle do not own the printed superficial/deep classification — new |
| `superficial-gluteal-muscle-origins` · pp. 21–22 | superficial gluteal muscle origins; gluteus maximus medius minimus origins; gluteal lines muscle origins; gluteus maximus sacrum coccyx origin | no direct live/pending hit; accepted gluteus-maximus/medius/minimus OINA handles jointly own these three origins — prior LCS reuse |
| `superficial-gluteal-muscle-insertions` · p. 23 | superficial gluteal muscle insertions; gluteus maximus medius minimus insertions; gluteal muscle greater trochanter insertions; gluteus maximus gluteal tuberosity iliotibial tract | no direct live/pending hit; accepted gluteus-maximus/medius/minimus OINA handles jointly own these three insertions — prior LCS reuse |
| `tensor-fasciae-latae-origin-insertion` · p. 24 | tensor fascia lata origin insertion; tensor fascia lata iliac crest; tensor fascia lata iliotibial tract; TFL OINA | no direct live/pending hit; prior iliotibial-tract evidence owns the insertion only, not the muscle's origin-and-insertion scope — new |
| `piriformis-origin-insertion-and-identification` · pp. 25–26, 28 | piriformis origin insertion; piriformis sacrum greater trochanter; piriformis OINA; piriformis identification model | no direct live/pending hit; exact accepted `piriformis-oina` scope — prior LCS reuse |
| `obturator-internus-origin-insertion-and-identification` · pp. 25, 27, 29 | obturator internus origin insertion; obturator internus obturator membrane greater trochanter; obturator internus OINA; obturator internus identification | no direct live/pending hit; exact accepted `obturator-internus-oina` scope — prior LCS reuse |
| `quadratus-femoris-origin-insertion-and-identification` · pp. 25, 27–28 | quadratus femoris origin insertion; quadratus femoris ischium quadrate tubercle; quadratus femoris OINA; quadratus femoris identification | no direct live/pending hit; exact accepted `quadratus-femoris-oina` scope — prior LCS reuse |

All **10 × 4 = 40** required searches completed with no direct live or pending hit. The raw
external result is `0 live / 0 pending / 10 new`; exact accepted-prior comparison removes six
module additions, leaving **+4 new practical-teaching scopes**. Component overlap does not
absorb the two composite medial-attachment maps, the gluteal-layer classification or the
tensor-fasciae-latae attachment scope.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 32 | Family 32 delta | After Family 32 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 46 verified minimum | +28 | 74 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 391 verified minimum | +98 | 489 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 18 | +14 | 32 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 16 | +0 / +0 / +4 | 0 / 0 / 20 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**.

This source hash occurs once in the manifest. Removing it from the accepted Family-31
remainder leaves **44 rank-4/rank-5 path instances / 42 unique hashes**. The next
manifest-order gate is tier-5 Anatomy practical source `src_b912e8878c85ce34a74a`,
`posterior compartement of the thigh.pdf` (31 native-text pages; SHA-256
`b912e8878c85ce34a74a263d1796ce6e6d52fb8790722f73f039cb225c48156d`) under
`Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 4 - Posterior Compartment of the Thigh/`.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 33 — Tier-5 posterior-thigh and popliteal-fossa virtual-lab teaching deck

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_b912e8878c85ce34a74a` |
| File / SHA-256 | `posterior compartement of the thigh.pdf` / `b912e8878c85ce34a74a263d1796ce6e6d52fb8790722f73f039cb225c48156d` |
| File boundary | 14,607,924 bytes · native PDF · 31 physical pages |
| Manifest placement | `HU-LCS-103` · Anatomy · Practical Labs · tier 5 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 4 - Posterior Compartment of the Thigh/posterior compartement of the thigh.pdf` |
| Visible provenance | title page prints `Presented by/ Nourhan . A . S . Elsadany` and `Posterior Compartment Of the thigh`; PDF producer is Skia/PDF m136 |
| Authority finding | Helwan-local virtual-lab teaching deck by manifest/path placement; it is not an exam, station sheet, response form, question bank or official answer key. |

The manifest SHA-256 was recomputed and matched. All **31 physical pages** were rendered and
read. Page 1 is the title page, pp. 2–29 are posterior-thigh and popliteal-fossa teaching
slides with two section dividers and two exact complete-slide content copies, p. 30 is a quote
slide, and p. 31 is a closing `Thank you` slide. No page prints an instruction to identify a
structure, explicit practical/station prompt, ordinary question, response field, blank answer
area, mark allocation, correctness convention, printed assessment answer or key. The hidden
text-layer phrase `Q&A / Panel discussion session` is not visibly printed on p. 31 and is not
counted. Named structures, attachment statements and arrows are simultaneous teaching
mappings, not answers to an assessment prompt.

### Complete defensible teaching-slide and mapping inventory

| Physical page | Source-first teaching slide / plate | Directly printed unique mappings / residue |
|---:|---|---:|
| 2 | thigh mid-shaft cross-section and compartment relations | 25 mappings: 22 named structures/relations plus 3 compartment names |
| 3 | `Posterior Compartment Of the thigh` divider | no plate or mapping |
| 4 | posterior-compartment functions, members and nerve supply | 11 mappings |
| 5 | posterior-thigh model identification | 7 mappings |
| 6 | letter-labelled posterior-thigh model | 16 mappings |
| 7 | posterior lower-limb muscle/nerve illustration | 21 unique mappings; `Tibial nerve` is printed twice on the same plate and counted once |
| 8 | posterior/anterior hip-and-thigh muscle plate | 24 mappings |
| 9 | exact complete-slide content copy of p. 5 | 0 additional plate or mapping after copy collapse |
| 10 | hamstring members and common characteristics | 8 mappings |
| 11 | semimembranosus origin, insertion and nerve supply | 3 unique mappings; the repeated cropped hip-bone figure contains 10 unresolved callout residues and one tibial label is visibly masked |
| 12 | semitendinosus origin, insertion and nerve supply | 3 unique mappings; repeats the same 10 unresolved hip-bone callout residues from p. 11, so they are not recounted |
| 13 | unlabelled posterior-thigh model montage | 0 mappings; retained as one teaching composition, not inferred |
| 14 | biceps-femoris long/short-head origins, insertion and supply | 7 mappings |
| 15 | highlighted hip/femur/fibula attachment montage | 0 printed mappings; repeats p. 11's 10 hip-bone residues and adds 5 fibular leader-line residues |
| 16 | popliteal-fossa location, borders, floor and roof | 14 mappings |
| 17 | posterior-knee model with an unlabelled yellow marker | 0 mappings; one unresolved marker |
| 18 | popliteal-fossa contents | 4 mappings |
| 19 | `vessels` divider | no plate or mapping |
| 20 | sciatic-nerve origin and termination | 2 mappings |
| 21 | popliteal-artery origin and termination | 2 mappings |
| 22 | popliteal-vein beginning/termination and tibial-nerve origin/termination | 4 mappings |
| 23 | exact complete-slide content copy of p. 7 | 0 additional plate or mapping after copy collapse |
| 24 | common-peroneal-nerve origin, termination and terminal branches | 4 mappings |
| 25 | tibial-nerve origin and termination | 2 mapping occurrences; the same two facts appear within p. 22 but this is a distinct teaching composition |
| 26 | sciatic/common-peroneal/tibial nerves and popliteal vessels on a model | 5 mappings |
| 27 | unlabelled posterior-leg model montage | 0 mappings; retained as one teaching composition, not inferred |
| 28 | unlabelled posterior-thigh/lower-leg model montage | 0 mappings; retained as one teaching composition, not inferred |
| 29 | model with four leader arrows whose labels are grey-blocked or absent | 0 mappings; four unresolved callouts |

The **26 content-slide occurrences consolidate to 24 source-distinct teaching compositions**
because p. 9 copies p. 5 and p. 23 copies p. 7. The mapping arithmetic after those two copy
collapses is `25 + 11 + 7 + 16 + 21 + 24 + 8 + 3 + 3 + 7 + 14 + 4 + 2 + 2 + 4 + 4 +
2 + 5 = 162`. The unique unresolved-residue arithmetic is `10 + 1 + 5 + 1 + 4 = 21`:
the ten cropped hip-bone callouts recur on pp. 11, 12 and 15 but are counted once, while the
masked tibial label, five fibular leader lines, yellow posterior-knee marker and four blocked
p. 29 callouts are source-distinct. Coloured dots/circles that only highlight attachment sites
are annotations, not missing printed answers, and are not counted as mappings or keys.
Repeated facts on genuinely different teaching compositions remain evidence occurrences, but
complete-slide copies and repeated residue are not inflated. The assessment boundary is **0
practical/station prompts / 0 ordinary questions / 0 printed assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 24 compositions consolidate to eleven source-level teaching scopes. This scope collapse
does not delete plate or mapping evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `posterior-thigh-compartment-muscles-and-supply` · pp. 2, 4–9 | posterior thigh compartment muscles; posterior thigh hamstring compartment organization; posterior compartment thigh nerve supply; posterior thigh muscles sciatic tibial division | no direct live/pending hit; individual prior muscle OINA handles do not own the compartment-organisation composite — new |
| `hamstring-members-and-common-criteria` · p. 10 | hamstring muscles common criteria; hamstring four common features; hamstring origin insertion knee hip action; true hamstring muscle definition | no direct live/pending hit; prior three-muscle origin and individual OINA evidence do not own the printed membership-plus-four-criteria scope — new |
| `semimembranosus-oina` · p. 11 | semimembranosus origin insertion nerve supply; semimembranosus OINA; semimembranosus ischial tuberosity medial tibial condyle; semimembranosus tibial sciatic nerve | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `semitendinosus-oina` · p. 12 | semitendinosus origin insertion nerve supply; semitendinosus OINA; semitendinosus ischial tuberosity medial tibia; semitendinosus tibial sciatic nerve | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `biceps-femoris-oina` · pp. 14–15 | biceps femoris origin insertion nerve supply; biceps femoris OINA; biceps femoris long short head attachments; biceps femoris fibular head nerve supply | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `popliteal-fossa` · pp. 16–18 | popliteal fossa boundaries roof floor contents; popliteal fossa anatomy; popliteal fossa borders hamstrings gastrocnemius; popliteal fossa contents artery vein tibial nerve | no direct live/pending hit; exact accepted Family-1 scope and Family-6 reuse — prior LCS reuse |
| `sciatic-nerve-origin-and-termination` · pp. 20, 26 | sciatic nerve origin termination; sciatic nerve sacral plexus popliteal fossa termination; sciatic nerve tibial common fibular division; sciatic nerve posterior thigh course termination | no direct live/pending hit; narrower reuse of accepted `sciatic-nerve-course-termination-branches`, which retains its inherited pending disposition — prior LCS reuse |
| `popliteal-artery-origin-and-termination` · pp. 21, 26 | popliteal artery origin termination; femoral artery adductor hiatus popliteal artery; popliteal artery termination anterior posterior tibial; popliteal artery anatomy | no direct live/pending hit; exact origin/termination subset of accepted `popliteal-artery`, which retains its inherited pending disposition — prior LCS reuse |
| `popliteal-vein-beginning-and-termination` · pp. 22, 26 | popliteal vein beginning termination; popliteal vein anterior posterior tibial veins; popliteal vein adductor hiatus femoral vein; popliteal vein anatomy | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `tibial-nerve-origin-and-termination` · pp. 22, 25–26 | tibial nerve origin termination; tibial nerve popliteal fossa medial lateral plantar; tibial nerve sciatic division termination; tibial nerve anatomy | no direct live/pending hit; prior sciatic-nerve and nerve-injury records do not own this individual nerve's full origin/termination scope — new |
| `common-peroneal-nerve-origin-termination-and-branches` · pp. 24, 26 | common peroneal nerve origin termination branches; common fibular nerve popliteal fossa branches; common peroneal nerve superficial deep terminal branches; common fibular nerve sciatic division neck fibula | no direct live/pending hit; prior sciatic-nerve and nerve-injury records do not own this individual nerve's origin/termination/terminal-branch scope — new |

All **11 × 4 = 44** required searches completed with no direct live or pending hit. The raw
external result is `0 live / 0 pending / 11 new`; exact accepted-prior comparison removes six
module additions, leaving **+5 new practical-teaching scopes**. Component overlap does not
absorb the posterior-compartment composite, the hamstring criteria, popliteal-vein course or
the two individual terminal-nerve scopes.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 33 | Family 33 delta | After Family 33 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 74 verified minimum | +24 | 98 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 489 verified minimum | +162 | 651 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 32 | +21 | 53 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 20 | +0 / +0 / +5 | 0 / 0 / 25 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**.

This source hash occurs once in the manifest. Removing it from the accepted Family-32
remainder leaves **43 rank-4/rank-5 path instances / 41 unique hashes**. The next
manifest-order gate is tier-5 Anatomy practical source `src_f45d7e77bbde568d6505`, `Leg
final.pdf` (49 native-text pages; SHA-256
`f45d7e77bbde568d6505d31c1b5ff93b798369337dbd80fd5d067f1a1c9f8fc7`) under `Year 1/LCS
103/Anatomy/Practical Labs/Virtual Lab 5 - Leg/`. Broader LCS-103 S1 remains incomplete. No
download, ID, content record, catalogue update, import or source copy was created.

## Family 34 — Tier-5 leg-compartment virtual-lab teaching deck

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_f45d7e77bbde568d6505` |
| File / SHA-256 | `Leg final.pdf` / `f45d7e77bbde568d6505d31c1b5ff93b798369337dbd80fd5d067f1a1c9f8fc7` |
| File boundary | 32,146,755 bytes · native PDF · 49 physical pages |
| Manifest placement | `HU-LCS-103` · Anatomy · Practical Labs · tier 5 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 5 - Leg/Leg final.pdf` |
| Visible provenance | title page prints `Presented by/ Nourhan . A . S . Elsadany` and `Leg`; PDF producer is Skia/PDF m136 |
| Authority finding | Helwan-local virtual-lab teaching deck by manifest/path placement; it is not an exam, station sheet, response form, question bank or official answer key. |

The manifest SHA-256 was recomputed and matched. All **49 physical pages** were rendered and
read. Page 1 is the title page; pp. 2, 13 and 22 are compartment dividers; pp. 3–12,
14–21 and 23–47 are leg-compartment teaching slides; p. 48 is a quotation slide; and p. 49
is a closing `Thank you` slide. The native text layer's `Q&A / Panel discussion session`
belongs to p. 49 but is not visibly printed on the rendered page and is not assessment
evidence. No page prints an instruction to identify a structure, explicit practical/station
prompt, ordinary question, response field, blank answer area, mark allocation, correctness
convention, printed assessment answer or key. Named structures, attachment statements,
colour marks and arrows are simultaneous teaching evidence, not answers to an assessment
prompt.

### Complete defensible teaching-slide and mapping inventory

| Physical page | Source-first teaching slide / plate | Directly printed unique mappings / residue |
|---:|---|---:|
| 3 | anterior-leg compartment contents | 6 content mappings |
| 4 | tibialis-anterior origins, insertions and nerve supply | 6 mappings |
| 5 | tibialis-anterior attachment-site plate | 0 printed mappings; retained as one teaching composition |
| 6 | extensor-hallucis-longus origins, tendon course/insertion and nerve supply | 6 mappings |
| 7 | extensor-hallucis-longus attachment-site plate | 0 printed mappings; retained as one teaching composition |
| 8 | extensor-digitorum-longus origins, tendon course/insertions and nerve supply | 7 mappings |
| 9 | extensor-digitorum-longus attachment-site/model plate | 0 printed mappings; retained as one teaching composition |
| 10 | peroneus-tertius origins/insertion and labelled anatomical illustration | 8 mappings: 4 attachment relations plus 4 named illustration labels; the `may be absent` note is context, not an additional label mapping |
| 11 | deep-peroneal-nerve origin and termination | 2 mappings |
| 12 | anterior-tibial-artery origin and termination | 2 mappings |
| 14 | lateral-leg compartment contents | 3 mappings |
| 15 | peroneus-longus origins, insertions and nerve supply | 6 mappings |
| 16 | fibula landmarks and peroneus-longus attachment-site plate | 10 unique named fibula-landmark mappings |
| 17 | peroneus-brevis origins, insertion and nerve supply | 4 mappings |
| 18 | fibula landmarks and peroneus-brevis attachment-site plate | 10 unique named fibula-landmark mappings |
| 19 | anterior/lateral-leg model identification | 5 mappings |
| 20 | peroneus-longus and peroneus-brevis model identification | 2 mappings |
| 21 | common-peroneal-nerve origin, termination and terminal branches | 4 mappings |
| 23 | letter-keyed lower-limb muscle model | 16 mappings |
| 24 | labelled posterior lower-limb muscle/nerve illustration | 21 unique mappings; `tibial nerve` is printed twice and counted once |
| 25 | superficial/deep posterior-leg muscle groups and common nerve supply | 8 mappings |
| 26 | gastrocnemius two-head origins, insertion chain and nerve supply | 5 mappings |
| 27 | gastrocnemius model plate with a green pointer | 0 directly printed mappings; retained as one teaching composition |
| 28 | gastrocnemius attachment-site montage | 0 directly printed mappings; retained as one teaching composition |
| 29 | soleus origins, insertion and nerve supply with a bone montage | 5 mappings; 7 blank leader-line callouts |
| 30 | fibula-landmark attachment plate | 10 unique named fibula-landmark mappings |
| 31 | soleus model montage | 0 printed mappings; one unlabelled black pointer |
| 32 | plantaris variation, morphology, origin, insertion alternatives and nerve supply | 7 mappings; the tendon-course wording frames the three insertion alternatives and is not double-counted |
| 33 | plantaris model montage | 0 printed mappings; 2 unlabelled black pointers |
| 34 | plantaris attachment-site montage | 0 directly printed mappings; retained as one teaching composition |
| 35 | popliteus origin, two insertions and nerve supply | 4 mappings |
| 36 | popliteus attachment-site montage | 0 printed mappings; 17 blank leader-line callouts |
| 37 | flexor-hallucis-longus origin and insertion | 2 mappings |
| 38 | flexor-hallucis-longus attachment montage with fibula landmarks | 10 unique named fibula-landmark mappings |
| 39 | flexor-digitorum-longus origin, insertion and nerve supply | 3 mappings |
| 40 | tibialis-posterior origins, insertions and nerve supply | 6 mappings |
| 41 | tibialis-posterior model identification and insertion-site montage | 1 directly printed muscle-identification mapping |
| 42 | deep posterior-leg model with letter markers A–D | 0 printed mappings; 4 unresolved letter markers |
| 43 | unlabelled superficial/deep posterior-leg model montage | 0 mappings; retained as one teaching composition |
| 44 | posterior-leg superficial/deep group mnemonic | 7 group-membership mappings |
| 45 | structures deep to the flexor retinaculum, medial to lateral | 5 mappings |
| 46 | tibial-nerve origin and termination | 2 mappings |
| 47 | posterior-tibial-artery origin, termination and terminal branches | 4 mappings |

The **43 content-slide occurrences are 43 source-distinct teaching compositions**; no
complete page is an exact copy. The mapping arithmetic is `6 + 6 + 0 + 6 + 0 + 7 + 0 +
8 + 2 + 2 + 3 + 6 + 10 + 4 + 10 + 5 + 2 + 4 + 16 + 21 + 8 + 5 + 0 + 0 + 5 +
10 + 0 + 7 + 0 + 0 + 4 + 0 + 2 + 10 + 3 + 6 + 1 + 0 + 0 + 7 + 5 + 2 + 4 =
197`. The unique unresolved-marker arithmetic is `7 + 1 + 2 + 17 + 4 = 31` on pp. 29,
31, 33, 36 and 42 respectively. Red attachment bars/dots and the green p. 27 pointer are
annotations rather than missing printed answers and are not counted as residues, mappings or
keys. Repeated facts on genuinely different teaching compositions remain evidence
occurrences; repeated wording or labels within one plate are counted once. The assessment
boundary is **0 practical/station prompts / 0 ordinary questions / 0 printed assessment
keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 43 compositions consolidate to 22 source-level teaching scopes. This scope collapse does
not delete plate or mapping evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `anterior-leg-compartment-contents` · p. 3 | anterior compartment leg contents; anterior leg muscles vessels nerve; tibialis anterior extensor muscles compartment; deep peroneal anterior tibial compartment | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `tibialis-anterior-oina` · pp. 4–5, 19 | tibialis anterior origin insertion nerve supply; tibialis anterior OINA; tibialis anterior tibia medial cuneiform; tibialis anterior identification model | no direct live/pending hit; exact accepted Family-1 handle and Family-6 reuse — prior LCS reuse |
| `extensor-hallucis-longus-oina` · pp. 6–7, 19 | extensor hallucis longus origin insertion nerve supply; EHL muscle OINA; extensor hallucis longus fibula distal phalanx; extensor hallucis longus identification model | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `extensor-digitorum-longus-oina` · pp. 8–9, 19 | extensor digitorum longus origin insertion nerve supply; EDL muscle OINA; extensor digitorum longus fibula extensor expansions; extensor digitorum longus identification model | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `peroneus-tertius-origin-and-insertion` · p. 10 | peroneus tertius origin insertion; fibularis tertius attachments; peroneus tertius fifth metatarsal; peroneus tertius may be absent | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `deep-peroneal-nerve-origin-and-termination` · p. 11 | deep peroneal nerve origin termination; deep fibular nerve common peroneal branch; deep peroneal nerve ankle divisions; anterior tibial nerve anatomy | no direct live/pending hit; prior terminal-branch and injury handles do not own this full origin/termination scope — new |
| `anterior-tibial-artery-origin-and-termination` · p. 12 | anterior tibial artery origin termination; popliteal artery anterior tibial branch; anterior tibial artery dorsalis pedis continuation; anterior tibial artery ankle | no direct live/pending hit; exact accepted `anterior-tibial-artery` scope, whose live records retain ownership — prior LCS reuse |
| `lateral-leg-compartment-contents` · p. 14 | lateral compartment leg contents; fibular compartment muscles nerve; peroneus longus brevis superficial peroneal nerve; lateral leg compartment anatomy | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `fibularis-longus-oina` · pp. 15–16, 19–20 | fibularis longus origin insertion nerve supply; peroneus longus OINA; fibularis longus medial cuneiform first metatarsal; peroneus longus identification model | no direct live/pending hit; exact accepted Family-1 handle, which retains its inherited pending disposition — prior LCS reuse |
| `fibularis-brevis-oina` · pp. 17–20 | fibularis brevis origin insertion nerve supply; peroneus brevis OINA; fibularis brevis fifth metatarsal; peroneus brevis identification model | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `common-peroneal-nerve-origin-termination-and-branches` · p. 21 | common peroneal nerve origin termination branches; common fibular nerve sciatic division; common peroneal nerve superficial deep branches; common fibular nerve neck fibula | no direct live/pending hit; exact accepted Family-33 handle — prior LCS reuse |
| `posterior-leg-superficial-and-deep-groups` · pp. 23–25, 43–44 | posterior leg superficial deep groups; posterior compartment leg muscles classification; gastrocnemius soleus plantaris deep flexors; posterior leg tibial nerve supply | no direct live/pending hit; accepted `superficial-posterior-leg-compartment` owns only the superficial subset, not this two-group classification — new |
| `gastrocnemius-oina` · pp. 26–28 | gastrocnemius origin insertion nerve supply; gastrocnemius OINA; gastrocnemius condyles calcaneal tendon; gastrocnemius identification model | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `soleus-oina` · pp. 29–31 | soleus origin insertion nerve supply; soleus OINA; soleus tibia fibula calcaneal tendon; soleus identification model | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `plantaris-oina` · pp. 32–34 | plantaris origin insertion nerve supply; plantaris OINA; plantaris lateral supracondylar line calcaneus; plantaris identification model | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `popliteus-oina` · pp. 35–36 | popliteus origin insertion nerve supply; popliteus OINA; popliteus lateral femoral condyle posterior tibia; popliteus identification model | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `flexor-hallucis-longus-oina` · pp. 37–38 | flexor hallucis longus origin insertion nerve supply; FHL muscle OINA; flexor hallucis longus fibula distal phalanx; flexor hallucis longus identification model | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `flexor-digitorum-longus-oina` · p. 39 | flexor digitorum longus origin insertion nerve supply; FDL muscle OINA; flexor digitorum longus tibia distal phalanges; flexor digitorum longus identification model | no direct live/pending hit; exact accepted Family-1 handle and Family-6 reuse — prior LCS reuse |
| `tibialis-posterior-oina` · pp. 40–42 | tibialis posterior origin insertion nerve supply; tibialis posterior OINA; tibialis posterior navicular tarsal bones; tibialis posterior identification model | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `flexor-retinaculum-contents` · p. 45 | flexor retinaculum contents; deep to flexor retinaculum; tarsal tunnel contents order; Tom Dick and very nervous Harry | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `tibial-nerve-origin-and-termination` · p. 46 | tibial nerve origin termination; tibial nerve sciatic branch posterior leg; medial popliteal nerve origin; tibial nerve distal popliteus termination | no direct live/pending hit; exact accepted Family-33 handle — prior LCS reuse |
| `posterior-tibial-artery-origin-and-termination` · p. 47 | posterior tibial artery origin termination; popliteal artery posterior tibial branch; posterior tibial artery flexor retinaculum; posterior tibial artery medial lateral plantar | no direct live/pending hit; exact accepted `posterior-tibial-artery` scope, which retains its inherited pending disposition — prior LCS reuse |

All **22 × 4 = 88** required searches completed with no direct live or pending hit. The raw
external result is `0 live / 0 pending / 22 new`; exact accepted-prior comparison removes 13
module additions, leaving **+9 new practical-teaching scopes**. Component overlap does not
absorb the two compartment-content scopes, the posterior two-group classification, the three
new muscle-attachment scopes, plantaris, or the deep-peroneal origin/termination record.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 34 | Family 34 delta | After Family 34 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 98 verified minimum | +43 | 141 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 651 verified minimum | +197 | 848 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 53 | +31 | 84 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 25 | +0 / +0 / +9 | 0 / 0 / 34 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**.

This source hash occurs once in the manifest. Removing it from the accepted Family-33
remainder leaves **42 rank-4/rank-5 path instances / 40 unique hashes**. For the exact
post-Family-34 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`525c7bb84c19f43d6a7bf7a709a01cf14920b9343664a0f909ca05ae3a9b0da0`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`8cffc0f2c8a2b52b98a4bb9b3a395c98fc612560d83d2f25316e31f4baac8c3d`.
The next manifest-order gate is tier-5 Anatomy practical source
`src_ebf0ae057711b9db4157`, `Virtual Lab 6 Dr.Hiede Hossameldin 2.pdf` (1,563,257 bytes;
19 native-text pages; SHA-256
`ebf0ae057711b9db41575e49b8a283b1a8c55e3d690ba3668dedab30c5501bd4`) under `Year 1/LCS
103/Anatomy/Practical Labs/Virtual Lab 6 - Bones of the Skull/`. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.




## Family 35 — Tier-5 skull-normae and mandible virtual-lab teaching deck

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_ebf0ae057711b9db4157` |
| File / SHA-256 | `Virtual Lab 6 Dr.Hiede Hossameldin 2.pdf` / `ebf0ae057711b9db41575e49b8a283b1a8c55e3d690ba3668dedab30c5501bd4` |
| File boundary | 1,563,257 bytes · native PDF · 19 physical pages |
| Manifest placement | `HU-LCS-103` · Anatomy · Practical Labs · tier 5 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 6 - Bones of the Skull/Virtual Lab 6 Dr.Hiede Hossameldin 2.pdf` |
| Visible provenance | title page prints `Virtual Lab 6`, `Norma of the Skull`, `Dr. Hiede Hossameldin`, `Anatomy & Embryology Teaching Assistant Faculty of Medicine Capital University`; PDF author is `Dr.Ammar Atef` |
| Authority finding | Manifest/path-assigned local virtual-lab teaching evidence. It is not an exam, station sheet, response form, question bank or official answer key. |

The manifest SHA-256 was recomputed and matched. All **19 physical pages** were rendered and
read. Page 1 is the title page, p. 2 prints learning objectives, pp. 3–14 teach the frontal,
lateral, vertical and occipital skull normae, pp. 15–18 teach the mandible, and p. 19 is a
closing `Best of luck` slide. No page prints an instruction to identify a structure, explicit
practical/station prompt, ordinary question, response field, answer blank, mark allocation,
correctness convention, printed assessment answer or key. Named bones, sutures, landmarks,
relations and labelled figures are simultaneous teaching evidence, not answers to an
assessment prompt.

### Complete defensible teaching-slide and mapping inventory

| Physical page | Source-first teaching slide / plate | Directly printed unique mappings / residue |
|---:|---|---:|
| 3 | norma-frontalis bones, sutures and frontal-view labelled skull | 24 mappings |
| 4 | two labelled norma-frontalis skull plates | 39 unique mappings; repeated labels within and between the two figures are counted once |
| 5 | bones visible in norma lateralis and labelled lateral skull | 12 mappings |
| 6 | norma-lateralis sutures, their bone relations and labelled lateral-skull landmarks | 22 unique mappings |
| 7 | pterion/asterion constituent bones and labelled lateral-skull landmarks | 30 unique mappings |
| 8 | squamous temporal part, zygomatic-arch components, mastoid/styloid processes and external auditory meatus | 7 mappings |
| 9 | norma-verticalis bones, sutures and labelled superior-skull landmarks | 10 unique mappings |
| 10 | parietal features, bregma/lambda and labelled superior-skull plate | 11 unique mappings |
| 11 | norma-occipitalis bones, sutures and labelled posterior-skull landmarks | 19 unique mappings |
| 12 | seven described occipital features plus labelled posterior-skull plate | 11 unique mappings |
| 13 | two labelled norma-occipitalis plates | 18 unique mappings |
| 14 | labelled posterior skull with sutural bone, sutures and occipital landmarks | 12 unique mappings |
| 15 | mandible parts, external-body features and labelled mandible plate | 14 unique mappings |
| 16 | inner-body features and partially masked labelled mandible plate | 13 directly printed mappings; 7 greyed leader-line callouts |
| 17 | ramus processes and labelled mandible plate | 26 unique mappings |
| 18 | two labelled mandible plates | 23 unique mappings; repeated labels between the figures are counted once |

The **16 content-slide occurrences are 16 source-distinct teaching compositions**; no complete
page is an exact copy. The mapping arithmetic is `24 + 39 + 12 + 22 + 30 + 7 + 10 + 11 +
19 + 11 + 18 + 12 + 14 + 13 + 26 + 23 = 291`. Page 16 contains **7** source-distinct
grey-blocked label callouts. Its visible labels and left-side teaching bullets remain counted,
but no obscured text is inferred from the later labelled mandible compositions. Repeated
wording or labels within one composition are counted once, while genuinely different plates
remain separate evidence occurrences. The assessment boundary is **0 practical/station
prompts / 0 ordinary questions / 0 printed assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 16 compositions consolidate to six source-level teaching scopes. This scope collapse does
not delete plate, mapping or residue evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `norma-frontalis-bones-sutures-and-features` · pp. 3–4 | norma frontalis bones sutures; frontal view skull anatomy; anterior skull bones and sutures; frontonasal internasal frontozygomatic zygomaticomaxillary sutures | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `norma-lateralis-bones-sutures-and-landmarks` · pp. 5–7 | norma lateralis bones sutures; lateral view skull anatomy; pterion and asterion; coronal squamous lambdoid zygomaticotemporal sutures | no direct live/pending hit; prior temporal/infratemporal-fossa and scalp/face scopes do not own the lateral-skull composite — new |
| `temporal-bone-lateral-surface-features` · p. 8 | temporal bone lateral surface features; squamous temporal bone features; zygomatic arch mastoid styloid process; external acoustic meatus temporal bone | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `norma-verticalis-bones-sutures-and-landmarks` · pp. 9–10 | norma verticalis bones sutures; superior view skull anatomy; bregma lambda landmarks; coronal sagittal lambdoid sutures superior skull | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `norma-occipitalis-bones-sutures-and-landmarks` · pp. 11–14 | norma occipitalis bones sutures; posterior view skull anatomy; external occipital protuberance nuchal lines; occipitomastoid parietomastoid sutures | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `mandible-parts-and-surface-features` · pp. 15–18 | mandible parts and surface features; body and ramus of mandible anatomy; mandibular foramina fossae processes; coronoid condylar process mylohyoid line | no direct live/pending hit; prior facial-sensory and muscles-of-mastication handles mention the mandible but do not own its parts/surface-feature scope — new |

All **6 × 4 = 24** required searches completed with no direct live or pending hit. The raw
external result is `0 live / 0 pending / 6 new`; accepted-prior comparison removes no module
addition, leaving **+6 new practical-teaching scopes**.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 35 | Family 35 delta | After Family 35 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 141 verified minimum | +16 | 157 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 848 verified minimum | +291 | 1,139 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 84 | +7 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 34 | +0 / +0 / +6 | 0 / 0 / 40 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**.

This source hash occurs once in the manifest. Removing it from the accepted Family-34
remainder leaves **41 rank-4/rank-5 path instances / 39 unique hashes**. For the exact
post-Family-35 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`4e2f37483c98292af36777fe168900c54e43a4e20d49f86dfc8c49740bab5711`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`ec46f22ef7f5ddd9197e1950c39960273754088ed91abe3762a8252f8f6862ff`.
The next manifest-order gate is tier-5 Anatomy practical source
`src_1757d6acc3c8e3843ee9`, `Virtual Lab 7 final.pdf` (19,878,613 bytes; 73 native-text
pages; SHA-256 `1757d6acc3c8e3843ee98bd84b23ac799477f7d498dfea5bf7307c26498242a8`)
under `Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 7 - Muscles of the Head & Neck/`.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 36 — Tier-5 head, neck, mastication and back virtual-lab teaching deck

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_1757d6acc3c8e3843ee9` |
| File / SHA-256 | `Virtual Lab 7 final.pdf` / `1757d6acc3c8e3843ee98bd84b23ac799477f7d498dfea5bf7307c26498242a8` |
| File boundary | 19,878,613 bytes · native PDF · 73 physical pages |
| Manifest placement | `HU-LCS-103` · Anatomy · Practical Labs · tier 5 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Practical Labs/Virtual Lab 7 - Muscles of the Head & Neck/Virtual Lab 7 final.pdf` |
| Visible provenance | p. 1 prints `Virtual Lab 7`, `Dr. Hiedy Hossameldin`, `Anatomy & Embryology Teaching Assistant at Faculty of Medicine Capital university`; the PDF title is `Virtual Lab 7 final` and its creator is Keynote |
| Authority finding | Manifest/path-assigned local virtual-lab teaching evidence. It is not an exam, station sheet, response form, question bank or official answer key. |

The manifest SHA-256 was recomputed and matched. All **73 physical pages** were rendered and
read against the native text. Page 1 is the title page, p. 2 prints learning objectives, pp.
3–11 teach scalp layers, occipitofrontalis, scalp vessels and scalp nerves, p. 12 is a facial-
muscles section divider, pp. 13–23 teach selected muscles of facial expression, p. 24 is an
arteries-of-the-face divider, pp. 25–29 teach facial vessels and sensory/motor innervation,
pp. 30–39 teach the muscles of mastication, p. 40 is a neck-triangles divider, pp. 41–64
teach sternocleidomastoid, neck triangles, jugular veins and cervical-plexus branches, pp.
65–72 teach superficial back muscles, and p. 73 is a closing slide.

No page prints an instruction to identify a structure, ordinary question, response field,
answer blank, mark allocation, correctness convention, printed assessment answer or key.
The p. 63 words `QUIZ YOURSELF!` accompany a fully labelled study graphic; they do not create
an independently answerable prompt or reveal. Numbered model figures print their labels on
the same teaching composition and are simultaneous teaching evidence, not assessment
answers.

### Complete defensible teaching-slide and mapping inventory

One mapping is one directly printed anatomy-to-location, group, attachment, supply or keyed-
callout relation. Ancillary figure labels are counted once per composition; repeated text or
the same label elsewhere on the same page is collapsed. Unlabelled coloured attachment
highlights are teaching annotations, not unresolved callouts.

| Physical page | Source-first teaching slide / plate | Directly printed unique mappings / residue |
|---:|---|---:|
| 3 | five scalp layers and section diagram | 5 mappings |
| 4 | occipitofrontalis composition, frontal/occipital bellies, attachments and nerve supply | 9 mappings |
| 5 | head-model facial-muscle identification | 4 mappings |
| 6 | internal-/external-carotid contributions to scalp supply and labelled vessel figures | 14 unique mappings |
| 7 | anterior-scalp artery model identification | 3 mappings |
| 8 | lateral/posterior-scalp artery model identification | 3 mappings |
| 9 | nerves in front of the auricle and labelled scalp-innervation figures | 10 unique mappings |
| 10 | nerves behind the auricle and labelled scalp-innervation figures | 11 unique mappings |
| 11 | labelled scalp sensory-nerve territory figure | 10 mappings |
| 13 | orbicularis-oculi parts figure | 4 mappings |
| 14 | orbital-part orbicularis-oculi origins, insertions and nerve branches | 7 mappings |
| 15 | palpebral-part orbicularis-oculi origins, insertions and nerve branches | 8 mappings |
| 16 | lacrimal-part orbicularis-oculi origin, insertion and nerve branches | 5 mappings |
| 17 | orbital/palpebral-part model identification | 2 mappings |
| 18 | orbicularis-oris intrinsic/extrinsic origins, insertions and nerve branches | 6 mappings |
| 19 | labelled muscles-of-facial-expression figure | 13 unique mappings |
| 20 | mouth-region model identification printed as `Orbicularis Oculi` | 1 source-faithful mapping; source wording is retained rather than corrected |
| 21 | buccinator origins, insertions and nerve supply | 6 mappings |
| 22 | buccinator and pterygomandibular-region labelled figures | 4 mappings |
| 23 | labelled muscle-origin/insertion skull model | 15 unique mappings |
| 25 | facial-artery origin, termination, branches and labelled arterial figure | 12 unique mappings |
| 26 | facial-artery branch model identification | 4 mappings |
| 27 | trigeminal facial sensory supply, exception and labelled territory figure | 7 mappings |
| 28 | facial-nerve motor branches and labelled branch figure | 6 unique mappings |
| 29 | unlabelled face/neck neurovascular model | 0 printed mappings; retained as one teaching composition |
| 30 | four muscles of mastication | 4 group-membership mappings |
| 31 | temporalis attachments/nerve supply and labelled skull/mandible plates | 11 unique mappings |
| 32 | masseter attachments/nerve supply and labelled layer figures | 9 unique mappings |
| 33 | temporalis/masseter attachment-site skull and mandible montage | 9 unique mappings |
| 34 | head-and-neck model identification | 8 named-structure mappings; the combined internal/external-carotid entry contains two named vessels |
| 35 | medial-pterygoid attachments/nerve supply and labelled mastication figure | 13 unique mappings |
| 36 | pterygoid attachment/model montage | 10 unique mappings |
| 37 | lateral-pterygoid two-head origins, insertions and nerve supply | 6 mappings |
| 38 | unlabelled lateral-pterygoid attachment plate | 0 printed mappings; retained as one teaching composition |
| 39 | labelled mandible attachment-site plate | 6 mappings |
| 41 | sternocleidomastoid origins, insertions and innervation | 5 mappings |
| 42 | sternocleidomastoid attachment and muscle figures | 4 mappings |
| 43 | posterior-triangle floor, boundaries and contents | 19 unique mappings |
| 44 | posterior-triangle subdivisions and labelled neurovascular figures | 18 unique mappings |
| 45 | posterior-triangle model identification | 9 mappings |
| 46 | anterior-triangle definition, subdivisions and labelled figure | 8 unique mappings |
| 47 | labelled anterior-triangle regional figure | 17 unique mappings |
| 48 | submental/submandibular boundaries, roofs and labelled figures | 12 unique mappings |
| 49 | submental-triangle model identification | 3 mappings |
| 50 | submandibular-triangle model identification | 4 mappings |
| 51 | stylohyoid/posterior-digastric model identification | 2 mappings |
| 52 | carotid- and muscular-triangle boundaries and muscular-triangle contents | 12 mappings |
| 53 | carotid-triangle model identification | 3 mappings |
| 54 | muscular-triangle model identification | 5 mappings |
| 55 | external/internal jugular and subclavian vein model identification | 3 mappings |
| 56 | internal- and external-jugular termination relations | 2 mappings |
| 57 | keyed anterior-neck model | 7 mappings |
| 58 | keyed lateral-neck model | 8 mappings |
| 59 | keyed posterior-triangle model | 11 mappings |
| 60 | keyed submental/muscular-region model | 8 mappings |
| 61 | keyed deep-lateral neck model | 7 mappings |
| 62 | keyed anterior/lateral neck model | 10 mappings |
| 63 | fully labelled sensory/motor cervical-plexus graphic | 8 mappings; `QUIZ YOURSELF!` is a study cue, not a prompt |
| 64 | cervical-plexus cutaneous-branch model identification | 2 mappings |
| 65 | superficial back-muscle overview | 5 mappings |
| 66 | trapezius and latissimus-dorsi origins, insertions and nerve supply | 16 mappings |
| 67 | unlabelled trapezius attachment montage | 0 printed mappings; retained as one teaching composition |
| 68 | second unlabelled trapezius attachment montage | 0 printed mappings; retained as a source-distinct composition |
| 69 | latissimus-dorsi attachments and muscle identification | 7 mappings |
| 70 | levator-scapulae, rhomboid-minor and rhomboid-major OINA table | 9 mappings |
| 71 | levator-scapulae/rhomboid labelled figure | 3 mappings |
| 72 | rhomboid-minor attachment and labelled bone montage | 4 mappings |

The **67 content-slide occurrences are 67 source-distinct teaching compositions**. There is
no exact complete-page copy. Pages 9–11 reuse a base innervation diagram, pages 31/33/39
reuse a mandible photograph, and the neck-model sequence reuses specimens, but each complete
slide has a different printed teaching layer and remains a distinct evidence occurrence.
The mapping arithmetic is `5 + 9 + 4 + 14 + 3 + 3 + 10 + 11 + 10 + 4 + 7 + 8 + 5 + 2 +
6 + 13 + 1 + 6 + 4 + 15 + 12 + 4 + 7 + 6 + 0 + 4 + 11 + 9 + 9 + 8 + 13 + 10 + 6 +
0 + 6 + 5 + 4 + 19 + 18 + 9 + 8 + 17 + 12 + 3 + 4 + 2 + 12 + 3 + 5 + 3 + 2 + 7 +
8 + 11 + 8 + 7 + 10 + 8 + 2 + 5 + 16 + 0 + 0 + 7 + 9 + 3 + 4 = 476`. There are
**0 masked or unresolved callouts**: every numbered marker has a printed key, while coloured
circles, arrows and attachment overlays are annotations rather than missing answers. The
assessment boundary is **0 practical/station prompts / 0 ordinary questions / 0 printed
assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 67 compositions consolidate to 28 source-level teaching scopes. This collapse does not
delete plate, mapping or source-wording evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `scalp-layers-and-movement-plane` · p. 3 | scalp layers; SCALP layers; loose areolar scalp; scalp movement plane | no direct live/pending hit; exact accepted Family-20 handle — prior LCS reuse |
| `occipitofrontalis-oina-and-identification` · pp. 4–5 | occipitofrontalis origin insertion nerve supply; frontalis occipitalis attachments; epicranial aponeurosis bellies; occipitofrontalis muscle identification | no direct live/pending hit; Family-27 owns only the frontal-belly temporal-branch relation, not the full two-belly attachment scope — new |
| `scalp-arterial-supply` · pp. 6–8 | scalp arterial supply; blood supply scalp; superficial temporal occipital arteries; internal external carotid scalp | no direct live/pending hit; exact accepted Family-20 handle — prior LCS reuse |
| `scalp-sensory-supply` · pp. 9–11 | sensory supply scalp; scalp innervation; trigeminal occipital nerves; supraorbital greater occipital | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `orbicularis-oculi-parts-and-oina` · pp. 13–17 | orbicularis oculi parts origin insertion nerve supply; orbital palpebral lacrimal parts; orbicularis oculi OINA; temporal zygomatic branches orbicularis oculi | no direct live/pending hit; Family-26 owns only the orbital-part subset, not the three-part composite — new |
| `orbicularis-oris-oina` · pp. 18–20 | orbicularis oris origin insertion nerve supply; orbicularis oris OINA; intrinsic extrinsic fibers orbicularis oris; lower buccal mandibular branch lips | no direct live/pending hit; Family-26 owns a branch-innervation question, not the full OINA scope — new |
| `buccinator-oina` · pp. 21–23 | buccinator origin insertion nerve supply; buccinator OINA; pterygomandibular raphe buccinator; buccal branch facial nerve cheek | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `facial-artery-origin-termination-and-branches` · pp. 25–26 | facial artery origin termination branches; facial artery angular artery; superior inferior labial lateral nasal; external carotid facial artery carotid triangle | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `face-sensory-supply` · p. 27 | sensory supply face; facial sensation; trigeminal divisions face; great auricular angle mandible | no direct live/pending hit; exact accepted Family-1/Family-20 handle — prior LCS reuse |
| `facial-nerve-expression` · pp. 28–29 | facial expression nerve; facial nerve motor face; muscles facial expression innervation; cranial nerve seven face | no direct live/pending hit; exact accepted Family-20 handle — prior LCS reuse |
| `muscles-of-mastication-membership` · pp. 30, 34 | muscles of mastication; four muscles mastication; temporalis masseter pterygoids; mandibular nerve mastication muscles | no direct live/pending hit; the prior motor-supply handle does not own four-muscle membership — new |
| `temporalis-oina` · pp. 31, 33–34 | temporalis muscle origin insertion nerve supply; temporalis OINA; temporal fossa coronoid process; deep temporal branches temporalis | no direct live/pending hit; exact accepted Family-20/Family-24 handle — prior LCS reuse |
| `masseter-oina` · pp. 32–34 | masseter origin insertion nerve supply; masseter OINA; zygomatic arch angle mandible masseter; masseteric nerve muscle | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `medial-pterygoid-oina` · pp. 35–36 | medial pterygoid origin insertion nerve supply; medial pterygoid OINA; maxillary tuberosity medial angle mandible; nerve to medial pterygoid | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `lateral-pterygoid-oina` · pp. 36–39 | lateral pterygoid origin insertion nerve supply; lateral pterygoid OINA; pterygoid fovea TMJ insertion; upper lower head lateral pterygoid | no direct live/pending hit; exact accepted Family-20 handle — prior LCS reuse |
| `sternocleidomastoid-oina` · pp. 41–42 | sternocleidomastoid origin insertion nerve supply; SCM OINA; manubrium clavicle mastoid nuchal line; accessory nerve sternocleidomastoid | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `posterior-triangle-neck` · pp. 43–45 | posterior triangle neck; lateral cervical region; posterior triangle contents; posterior triangle boundaries | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `anterior-triangle-neck-subdivisions` · pp. 46–47 | anterior triangle neck subdivisions; submental submandibular carotid muscular triangles; anterior cervical triangle regions; digastric carotid muscular triangle classification | no direct live/pending hit; prior handles own individual triangles, not the four-way subdivision relation — new |
| `submental-triangle` · pp. 48–49, 57–62 | submental triangle; submental region; submental triangle boundaries; anterior triangle neck | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `submandibular-triangle` · pp. 48, 50–51, 57–62 | submandibular triangle; digastric triangle; submandibular triangle boundaries; anterior triangle neck | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `carotid-triangle` · pp. 52–53, 57–62 | carotid triangle; carotid region; carotid triangle boundaries contents; anterior triangle neck | no direct live/pending hit; exact accepted Family-1/Family-20 handle — prior LCS reuse |
| `muscular-triangle` · pp. 52, 54, 57–62 | muscular triangle neck; omotracheal triangle; muscular triangle boundaries contents; anterior triangle neck | no direct live/pending hit; exact accepted Family-1 handle — prior LCS reuse |
| `internal-and-external-jugular-vein-termination` · pp. 55–62 | internal external jugular vein termination; jugular veins drain subclavian; internal jugular brachiocephalic formation; external jugular vein termination | no direct live/pending hit; prior anterior-jugular and scalp/face-drainage handles do not own this paired termination scope — new |
| `cervical-plexus-branches` · pp. 63–64 | cervical plexus branches; cutaneous branches cervical plexus; lesser occipital great auricular transverse cervical; ansa cervicalis phrenic nerve C1 C4 | no direct live/pending hit; accepted Family-1 `cervical-plexus` handle owns the branch scope — prior LCS reuse |
| `trapezius-oina` · pp. 65–68 | trapezius origin insertion nerve supply; trapezius OINA; nuchal line clavicle acromion scapular spine; accessory nerve trapezius | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `latissimus-dorsi-oina` · pp. 65–66, 69 | latissimus dorsi origin insertion nerve supply; latissimus dorsi OINA; thoracolumbar fascia bicipital groove; thoracodorsal nerve latissimus | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `levator-scapulae-oina` · pp. 65, 70–71 | levator scapulae origin insertion nerve supply; levator scapulae OINA; C1 C4 medial scapular border; dorsal scapular nerve levator scapulae | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |
| `rhomboid-minor-and-major-oina` · pp. 65, 70–72 | rhomboid minor major origin insertion nerve supply; rhomboids OINA; C7 T5 medial scapular border; dorsal scapular nerve rhomboids | no direct live/pending hit and no same-scope accepted prior-LCS handle — new |

All **28 × 4 = 112** required searches completed with no direct live or pending hit. The raw
external result is `0 live / 0 pending / 28 new`; exact accepted-prior comparison removes 14
module additions, leaving **+14 new practical-teaching scopes**. Component overlap does not
absorb the full two-belly occipitofrontalis scope, three-part orbicularis-oculi composite,
four-muscle mastication membership, anterior-triangle subdivision relation, paired jugular
termination scope, or the new facial/back-muscle OINA scopes.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 36 | Family 36 delta | After Family 36 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 157 verified minimum | +67 | 224 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,139 verified minimum | +476 | 1,615 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 40 | +0 / +0 / +14 | 0 / 0 / 54 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**.

This source hash occurs once in the manifest. Removing it from the accepted Family-35
remainder leaves **40 rank-4/rank-5 path instances / 38 unique hashes**. The Family-35
method was reproduced first: its 41/39 row sets recomputed to
`4e2f37483c98292af36777fe168900c54e43a4e20d49f86dfc8c49740bab5711` and
`ec46f22ef7f5ddd9197e1950c39960273754088ed91abe3762a8252f8f6862ff`. For the exact
post-Family-36 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`933253b563432615caf14639717de813dbf01f0d2af0263e3c1f1cb46772028a`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`81f8d837a8b153b406adb0cab050009241f56bbd05e83d524449ebba3bf20620`.
The next manifest-order gate is tier-5 Anatomy practical source
`src_7d5c2bbd2c34a93312a2`, `practical images  Anatomy _250703_123600 (1).pdf`
(3,753,189 bytes; 27 native-text pages; SHA-256
`7d5c2bbd2c34a93312a22fbcda9894293a34e35f42d8e126d8cb23393dc743a3`) under
`Year 1/LCS 103/Anatomy/Practical/`. Broader LCS-103 S1 remains incomplete. No download,
ID, content record, catalogue update, import or source copy was created.

## Family 37 — Tier-5 labelled Anatomy practical-image atlas

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_7d5c2bbd2c34a93312a2` |
| File / SHA-256 | `practical images  Anatomy _250703_123600 (1).pdf` / `7d5c2bbd2c34a93312a22fbcda9894293a34e35f42d8e126d8cb23393dc743a3` |
| File boundary | 3,753,189 bytes · PDF · 27 physical pages |
| Manifest placement | `HU-LCS-103` · Anatomy · Practical · tier 5 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Practical/practical images  Anatomy _250703_123600 (1).pdf` |
| Read method | all 27 pages rendered at 140 dpi and read; the text extractor returns only `CamScanner`, so the manifest's `native` text-layer label is not substantive anatomy text |
| Authority finding | Manifest/path-assigned local practical teaching evidence. It is not an exam, station sheet, response form, question bank or official answer key. |

The SHA-256, byte count and 27-page boundary were recomputed and match the manifest. The
organised file currently present on disk has one space between `images` and `Anatomy`, while
the manifest path and filename have two; the bytes and hash establish that this is the same
source, and the manifest spelling remains the ledger identity. Every page is a CamScanner
photograph of an anatomy model or skull with labels superimposed. No page prints an instruction
to identify a structure, station stem, ordinary question, response field, answer blank, mark
allocation, correctness convention, printed assessment answer or key. The simultaneous labels
are therefore teaching mappings only, not assessment reveals.

### Complete practical-plate, mapping and residue inventory

One mapping is one directly printed label-to-structure or label-to-landmark relation. A label
printed twice for the same structure on one composition is counted once; an alias printed in
parentheses remains part of that one mapping. The small moulded manufacturer numbers visible
on some plastic models are incidental surface markings, not authored callouts. Unlabelled
model anatomy, coloured vessels, ink traces and page arrows are likewise not missing answers.

| Physical page | Source-first teaching plate | Directly printed unique mappings / residue |
|---:|---|---:|
| 1 | anterior/medial thigh model: iliopsoas, pectineus, adductors, gracilis and quadriceps | 8 mappings |
| 2 | anterior thigh model: sartorius, rectus femoris, vasti and tensor fasciae latae | 5 mappings |
| 3 | proximal anterior-thigh model including inguinal ligament and iliopsoas | 7 mappings |
| 4 | medial/anterior thigh model including three adductors and three vasti | 8 mappings |
| 5 | superficial posterior-leg model | 4 mappings |
| 6 | posterior-thigh model: hamstrings, adductor magnus and gracilis | 6 mappings |
| 7 | deep gluteal model: gluteus medius and five short lateral rotators | 6 mappings |
| 8 | anterior/medial thigh overview | 5 mappings |
| 9 | inferior extensor retinaculum | 1 mapping |
| 10 | anterolateral thigh overview including iliotibial tract | 11 mappings |
| 11 | anterior/lateral leg muscles and superficial fibular nerve | 6 mappings; `Fibularis (peroneus) longus` is one alias-bearing mapping |
| 12 | deep posterior/lateral leg muscles | 6 mappings |
| 13 | posterior thigh with sciatic nerve | 3 mappings |
| 14 | sciatic nerve and its tibial/common-fibular terminal divisions | 3 mappings |
| 15 | popliteal/posterior-leg nerve, artery and vein model | 8 mappings |
| 16 | anterior-leg neurovascular model and patellar ligament | 3 mappings |
| 17 | posterior skull/fontanelle, sutures and occipital landmarks | 8 unique mappings; the repeated `Lambdoid suture` label is counted once |
| 18 | frontal skull bones and cavities | 7 unique mappings; the bilateral zygomatic-bone label is counted once |
| 19 | tibial-plateau menisci and cruciate-ligament attachment sites | 4 mappings |
| 20 | frontal skull nasal structures, conchae, meatus and foramina | 9 mappings |
| 21 | lateral skull temporal lines, pterion/asterion and zygomatic landmarks | 10 unique mappings; the generic `Temporal line` duplicate is collapsed into its pointed superior-line mapping |
| 22 | superior skull/fontanelle, bones and sutures | 5 unique mappings; bilateral `Parietal bone` is counted once |
| 23 | frontal belly of occipitofrontalis and epicranial aponeurosis | 2 mappings |
| 24 | temporal/infratemporal fossae and adjacent zygomatic/frontal processes | 4 mappings |
| 25 | frontal skull orbital margins, fissures, canal, fossa and surface landmarks | 10 mappings |
| 26 | facial-expression model: orbicularis-oculi parts, orbicularis oris and buccinator | 5 mappings |
| 27 | norma basalis interna with internal occipital crest and protuberance | 2 mappings |

The **27 physical-page occurrences are 27 source-distinct labelled photo compositions**.
Several pages reuse the same plastic lower-limb or skull model, but angle, crop and printed
label layer differ; there is no exact complete-page copy to collapse. The mapping arithmetic
is `8 + 5 + 7 + 8 + 4 + 6 + 6 + 5 + 1 + 11 + 6 + 6 + 3 + 3 + 8 + 3 + 8 + 7 +
4 + 9 + 10 + 5 + 2 + 4 + 10 + 5 + 2 = 156`. There are **0 masked or unresolved
callouts** and **0 rule blanks**. The assessment boundary is **0 practical/station prompts /
0 ordinary questions / 0 printed assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 27 compositions consolidate to 16 source-level teaching scopes. This scope collapse does
not delete plate, mapping, page or source-wording evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `anterior-and-medial-thigh-muscle-model-identification` · pp. 1–4, 8, 10 | anterior medial thigh muscle model; anterior thigh muscle identification; medial thigh muscle model; sartorius quadriceps adductor model | no direct live/pending same-scope hit; accepted Families 31–32 compartment, layer and muscle scopes jointly own this identification subset — prior LCS reuse |
| `posterior-thigh-muscle-model-identification` · p. 6 | posterior thigh muscle model; hamstring model identification; semimembranosus biceps femoris identification; posterior compartment thigh muscles | no direct live/pending same-scope hit; accepted Family-33 posterior-thigh and hamstring scopes own this labelled model subset — prior LCS reuse |
| `deep-gluteal-muscle-model-identification` · p. 7 | deep gluteal muscle model; short lateral rotators hip; piriformis gemelli obturator internus quadratus; gluteal muscle identification model | no direct live/pending same-scope hit; accepted Family-32 classification and muscle-identification/OINA handles jointly own this subset — prior LCS reuse |
| `leg-compartment-muscle-model-identification` · pp. 5, 11–12 | leg compartment muscle model; anterior lateral posterior leg muscles; tibialis extensor fibularis model; gastrocnemius soleus deep flexors | no direct live/pending same-scope hit; accepted Family-34 compartment and individual-muscle handles jointly own the labelled model scope — prior LCS reuse |
| `inferior-extensor-retinaculum-identification` · p. 9 | inferior extensor retinaculum; ankle extensor retinaculum; Y shaped retinaculum; dorsum ankle retinaculum | the only external concept hit uses the retinaculum as an extensor-digitorum-brevis origin, not as this identification objective; accepted Family-1 `extensor-retinaculum-contents` owns the structure and absorbs the narrower label — prior LCS reuse |
| `sciatic-nerve-and-terminal-divisions-identification` · pp. 13–14 | sciatic nerve bifurcation; sciatic tibial common fibular identification; posterior thigh sciatic nerve; sciatic nerve branches model | no direct live/pending same-scope hit; exact subset of accepted Family-33 sciatic origin/termination scope — prior LCS reuse |
| `popliteal-and-posterior-leg-neurovascular-identification` · p. 15 | popliteal posterior leg neurovascular; popliteal artery vein tibial nerve; anterior posterior tibial fibular arteries; popliteal fossa neurovascular model | no direct live/pending same-scope hit; accepted Families 33–34 artery, vein, nerve and popliteal-fossa handles jointly own the printed labels — prior LCS reuse |
| `anterior-leg-neurovascular-identification` · p. 16 | anterior leg neurovascular; deep fibular nerve anterior tibial artery; anterior compartment neurovascular bundle; tibial artery deep peroneal identification | no direct live/pending same-scope hit; accepted Family-34 anterior-compartment, deep-fibular and anterior-tibial handles jointly own this subset — prior LCS reuse |
| `knee-menisci-and-cruciate-attachment-identification` · p. 19 | knee menisci cruciate attachments; tibial plateau ACL PCL attachments; medial lateral meniscus model; intercondylar area cruciate ligaments | no direct live/pending same-scope hit; accepted Family-1 `knee-menisci` and `cruciate-ligaments` handles jointly own the four labels — prior LCS reuse |
| `norma-frontalis-bones-and-features` · pp. 18, 20, 25 | norma frontalis bones features; frontal skull view landmarks; nasal orbital cavity skull; nasal conchae foramina anterior skull | no direct live/pending same-scope hit; accepted Family-35 `norma-frontalis-bones-sutures-and-features` owns this scope — prior LCS reuse |
| `norma-lateralis-bones-and-landmarks` · pp. 21, 24 | norma lateralis bones landmarks; lateral skull landmarks; pterion asterion zygomatic arch; temporal infratemporal fossa skull | no direct live/pending same-scope hit; accepted Family-35 `norma-lateralis-bones-sutures-and-landmarks` owns this scope — prior LCS reuse |
| `norma-verticalis-bones-sutures-and-fontanelle` · p. 22 | norma verticalis bones sutures; superior skull view landmarks; anterior fontanelle pregma; coronal sagittal suture | no direct live/pending same-scope hit; accepted Family-35 `norma-verticalis-bones-sutures-and-landmarks` owns this scope — prior LCS reuse |
| `norma-occipitalis-sutures-and-landmarks` · p. 17 | norma occipitalis landmarks; posterior skull landmarks; lambda nuchal lines; external occipital crest protuberance | no direct live/pending same-scope hit; accepted Family-35 `norma-occipitalis-bones-sutures-and-landmarks` owns this scope — prior LCS reuse |
| `occipitofrontalis-and-epicranial-aponeurosis-identification` · p. 23 | occipitofrontalis epicranial aponeurosis; frontal belly occipitofrontalis; galea aponeurotica muscle; scalp muscle model | no direct live/pending same-scope hit; accepted Family-36 `occipitofrontalis-oina-and-identification` owns this two-label subset — prior LCS reuse |
| `orbicularis-oculi-oris-and-buccinator-identification` · p. 26 | facial expression muscle model; orbicularis oculi parts; orbicularis oris buccinator; facial muscle identification | no direct live/pending same-scope hit; accepted Family-36 orbicularis-oculi, orbicularis-oris and buccinator handles jointly own the labelled subset — prior LCS reuse |
| `norma-basalis-interna-occipital-landmarks` · p. 27 | norma basalis interna; internal cranial base landmarks; internal occipital crest protuberance; posterior cranial fossa landmarks | source inventories and question-bank mentions are not live/pending teaching records; Family-35 is external/posterior skull and does not own the internal cranial-base view — new |

All **16 × 4 = 64** required searches completed. The raw external result is `0 live / 0
pending / 16 new`: source-manifest/inventory strings and component mentions are not same-scope
concept records. Exact accepted-prior comparison removes 15 module additions, leaving **+1
new practical-teaching scope**. The new scope is the internal cranial-base view; Family-35's
external occipital landmarks cannot absorb it.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 37 | Family 37 delta | After Family 37 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 224 verified minimum | +27 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,615 verified minimum | +156 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 54 | +0 / +0 / +1 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**. Arithmetic checks are `224 + 27 =
251`, `1,615 + 156 = 1,771`, `91 + 0 = 91`, and `54 + 1 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-36
remainder leaves **39 rank-4/rank-5 path instances / 37 unique hashes**. The Family-36
method was reproduced first: its 40/38 row sets recomputed to
`933253b563432615caf14639717de813dbf01f0d2af0263e3c1f1cb46772028a` and
`81f8d837a8b153b406adb0cab050009241f56bbd05e83d524449ebba3bf20620`.
For the exact post-Family-37 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`e27a55dc6341786d5d229699eb5a7c18ec9d4e8f8268b65ee74ad42f9892ea44`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`058a69c793791d55c7fb4ddeacf2242629e294d4bc0f109f93318074139fbba9`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_163c4a1fb9365979992a`, `Triangles of the Neck dr Sarah .pdf` (1,988,802 bytes; 23
native-text pages; SHA-256
`163c4a1fb9365979992a9a1d4e05762089c961e9d5bc6c8b55f322502e45545a`) under `Year 1/LCS
103/Anatomy/Theoretical/Head & Neck/Lec 9 - Triangles of Neck/`. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.

## Family 38 — Tier-4 Anatomy teaching-only neck-triangles lecture gate

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_163c4a1fb9365979992a` |
| File / SHA-256 | `Triangles of the Neck dr Sarah .pdf` / `163c4a1fb9365979992a9a1d4e05762089c961e9d5bc6c8b55f322502e45545a` |
| File boundary | 1,988,802 bytes · unencrypted PDF · 23 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Head & Neck/Lec 9 - Triangles of Neck/Triangles of the Neck dr Sarah .pdf` |
| Visible provenance | p. 1 prints `Triangles of the Neck`, `Dr Sarah Arakib`, and `MD Anatomy and Embryology`; the source itself prints no university, sitting or assessment label |
| Authority finding | Manifest/path-assigned local Anatomy teaching evidence. It is not an examination, station sheet, question bank or official answer key. |

The SHA-256, byte count and 23-page boundary were recomputed and match the manifest. The
organised file currently present on disk omits the manifest's space before `.pdf`; its bytes
and hash establish that it is the same source, while the manifest spelling remains the ledger
identity. All 23 pages were rendered at 140 dpi and read against the native text layer. Page
1 is the cover, pp. 2–22 are 21 instructional slide compositions, and p. 23 is the closing
slide.

There is **no assessment occurrence anywhere in the source**. No page prints an imperative
or interrogative prompt, station instruction, response area, option set, answer line,
correctness convention, answer reveal or key. In particular, p. 17's `Clinical importance`
is a declarative heading above a labelled photograph of an enlarged left supraclavicular
lymph node (`Virchow's node`), not the `Clinical importance ??` prompt form seen in Family
25. Page 18 is a fully labelled summary graphic, likewise teaching material. The embedded
black crop/mask artifacts around the imported p. 6 figure are not authored response blanks
or unresolved practical callouts; the slide itself directly prints its three intended
content bullets.

### Complete teaching-slide and assessment-boundary inventory

The theoretical lecture's figures are retained as parts of their source teaching
compositions, not promoted into tier-5 practical plates or label-mapping records.

| Physical page | Source-first instructional composition | Evidence class |
|---:|---|---|
| 2 | anterior-versus-posterior triangle position relative to sternocleidomastoid, with regional image | declarative teaching |
| 3 | anterior-triangle superior, lateral and medial borders, with labelled figure | declarative teaching |
| 4 | four anterior-triangle subdivisions with labelled regional diagram | declarative teaching |
| 5 | submental-triangle borders, roof and floor | declarative teaching |
| 6 | submental lymph nodes, vessels and anterior jugular vein, with imported figure | declarative teaching; crop artifacts are not blanks |
| 7 | submandibular/digastric-triangle borders, roof and floor | declarative teaching |
| 8 | submandibular gland/nodes, vessels and nerves | declarative teaching |
| 9 | carotid-triangle borders, roof and floor | declarative teaching |
| 10 | carotid-triangle arteries, veins, nerves and deep cervical lymph nodes | declarative teaching |
| 11 | muscular-triangle borders | declarative teaching |
| 12 | infrahyoid-muscle and thyroid-lobe contents of the muscular triangle | declarative teaching |
| 13 | posterior-triangle definition and borders | declarative teaching |
| 14 | posterior-triangle floor and roof | declarative teaching |
| 15 | posterior-triangle muscle, vascular, neural and lymph-node contents | declarative teaching |
| 16 | occipital and supraclavicular/subclavian subdivisions by inferior belly of omohyoid | declarative teaching |
| 17 | enlarged left supraclavicular lymph node identified as Virchow's node | labelled clinical teaching image |
| 18 | fully labelled neck-triangle summary graphic | labelled teaching image; no prompt |
| 19 | sternomastoid origins, insertions, innervation and actions | declarative teaching |
| 20 | supra- versus infrahyoid group locator image | labelled teaching image |
| 21 | suprahyoid members and their nerve supply | declarative teaching |
| 22 | infrahyoid members and ansa-cervicalis/thyrohyoid exception | declarative teaching |

The **21 content-slide occurrences are 21 source-distinct teaching compositions**. The
regional triangle artwork is reused across several pages, but each complete slide has a
different title, text layer, crop or teaching purpose; there is no exact complete-page copy
to collapse. The source boundary is therefore **21 teaching compositions / 0 ordinary
questions / 0 practical or station prompts / 0 printed assessment keys / 0 assessment
residues**. Because this is a tier-4 theoretical lecture, its instructional images add
**0 practical plates, 0 practical label mappings and 0 practical residues** to the separated
tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 21 compositions consolidate to nine source-level theoretical teaching scopes. This
scope collapse preserves every page occurrence and does not convert teaching statements
into tested concepts.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `anterior-triangle-neck-subdivisions` · pp. 2–4, 18 | anterior triangle neck subdivisions; submental submandibular carotid muscular triangles; anterior cervical triangle regions; digastric carotid muscular triangle classification | no direct live/pending same-scope hit; exact accepted Family-36 handle — prior LCS reuse |
| `submental-triangle` · pp. 5–6 | submental triangle; submental region; submental triangle boundaries contents; anterior triangle neck submental | no direct live/pending same-scope hit; exact accepted Family-1/Family-36 handle — prior LCS reuse |
| `submandibular-triangle` · pp. 7–8 | submandibular triangle; digastric triangle; submandibular triangle boundaries contents; submandibular gland facial artery lingual nerve | no direct live/pending same-scope hit; exact accepted Family-1/Family-36 handle — prior LCS reuse |
| `carotid-triangle` · pp. 9–10 | carotid triangle; carotid region; carotid triangle boundaries contents; carotid arteries jugular vagus hypoglossal | the sole external literal hit is a manifest snippet, not a live/pending concept; exact accepted Family-1/Family-20/Family-36 handle — prior LCS reuse |
| `muscular-triangle` · pp. 11–12 | muscular triangle neck; omotracheal triangle; muscular triangle boundaries contents; infrahyoid thyroid gland triangle | no direct live/pending same-scope hit; exact accepted Family-1/Family-36 handle — prior LCS reuse |
| `posterior-triangle-neck` · pp. 2, 13–16, 18 | posterior triangle neck; lateral cervical region; posterior triangle contents boundaries; occipital supraclavicular triangle | no direct live/pending same-scope hit; exact accepted Family-1/Family-36 handle — prior LCS reuse |
| `virchow-node-identification` · p. 17 | Virchow node; left supraclavicular lymph node; enlarged left supraclavicular lymph node; Virchow supraclavicular node identification | the sole external literal hit is a BMS coverage row about the broader gastric-carcinoma association, not a live/pending identification record; no accepted prior-LCS same-scope handle — new theoretical teaching scope |
| `sternocleidomastoid-oina` · p. 19 | sternocleidomastoid origin insertion nerve supply action; SCM OINA; manubrium clavicle mastoid nuchal line; accessory nerve sternocleidomastoid | no direct live/pending same-scope hit; exact accepted Family-1/Family-36 handle — prior LCS reuse |
| `suprahyoid-and-infrahyoid-members-and-innervation` · pp. 20–22 | suprahyoid infrahyoid members innervation; hyoid muscle nerve supply; mylohyoid digastric stylohyoid geniohyoid; ansa cervicalis thyrohyoid C1 | no direct live/pending same-scope hit and no accepted prior-LCS handle owning the paired membership-and-innervation scope — new theoretical teaching scope |

All **9 × 4 = 36** required searches completed across live state, `docs/import-ready`,
`docs/questions-import-ready` and all source-import roots. The raw external result is `0
live / 0 pending / 9 new`; exact accepted-prior comparison removes seven module additions,
leaving **seven prior-LCS reuses / two new theoretical teaching scopes**. These two scopes
are inventory findings only: with no source prompt they do not enter the eligible tested-
concept count, and because the source is theoretical they do not enter the practical-
teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 38 | Family 38 delta | After Family 38 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**. Arithmetic checks are `447 + 0 =
447`, `242 + 0 = 242`, `204 + 0 = 204`, `9 + 49 + 146 = 204`, `251 + 0 = 251`,
`1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-37
remainder leaves **38 rank-4/rank-5 path instances / 36 unique hashes**. The Family-37
method was reproduced first: its 39/37 row sets recomputed to
`e27a55dc6341786d5d229699eb5a7c18ec9d4e8f8268b65ee74ad42f9892ea44` and
`058a69c793791d55c7fb4ddeacf2242629e294d4bc0f109f93318074139fbba9`.
For the exact post-Family-38 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`d07372201d3429a4bc539fac712a8282375e960995bcd9d34f5a09fef3aa7882`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`cf2f5344cbc6e2f953d6ad55d944426e5a212a0cbc8fca3f4af48dc903526672`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_21e1cf59bf0e485444a7`, `Anterior Compartment of Thigh  Dr Sarah 103.pdf` (4,601,182
bytes; 40 native-text pages; SHA-256
`21e1cf59bf0e485444a7f4f182f6fbb6aea8f9fa67066f2b4eb65e6321e96168`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 1 - Anterior Compartment of Thigh/`. Broader
LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update, import or
source copy was created.

## Family 39 — Tier-4 Anatomy teaching-only anterior-thigh lecture gate

### Source identity, authority and full boundary

| Field | Recorded value |
|---|---|
| Manifest source ID | `src_21e1cf59bf0e485444a7` |
| File / SHA-256 | `Anterior Compartment of Thigh  Dr Sarah 103.pdf` / `21e1cf59bf0e485444a7f4f182f6fbb6aea8f9fa67066f2b4eb65e6321e96168` |
| File boundary | 4,601,182 bytes · unencrypted PDF · 40 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 1 - Anterior Compartment of Thigh/Anterior Compartment of Thigh  Dr Sarah 103.pdf` |
| Visible provenance | p. 1 prints `Anterior Compartment of Thigh`, `Dr. Sarah Arakib`, and `MD Anatomy and Embryology`; the source itself prints no university, sitting or assessment label |
| Authority finding | Manifest/path-assigned local Anatomy teaching evidence. It is not an examination, station sheet, response form, question bank or official answer key. |

The SHA-256, byte count and 40-page boundary were recomputed and match the manifest. The
organised file currently present on disk uses one space between `Thigh` and `Dr`, while the
manifest identity uses two; the byte-for-byte hash establishes that it is the same source.
All 40 pages were rendered at 140 dpi and read against the native text layer. Page 1 is the
cover, pp. 2–39 are 38 instructional slide compositions, and p. 40 is a motivational closing
image.

There is **no assessment occurrence anywhere in the source**. No page prints an instruction
to identify, an ordinary or station question, response area, option set, answer line, mark
allocation, correctness convention, answer reveal or key. On p. 2, the question marks after
`iliotibial tract?` and `Saphenous opening ?` trail already-complete declarative statements;
both named structures and their arrows are simultaneously printed, so the punctuation does
not create two prompts. Page 37's `Clinical importance` is followed immediately by two
declarative teaching points about varicose veins and graft use, not a request for a response.
Embedded crop/mask or clipped-source-image artifacts on pp. 4, 14, 16 and 33 are not authored
answer blanks or unresolved practical callouts.

### Complete teaching-slide and assessment-boundary inventory

The lecture's images and labelled diagrams remain parts of their tier-4 theoretical teaching
compositions; they are not promoted into the tier-5 practical plate/mapping ledger.

| Physical pages | Source-first instructional compositions | Slide occurrences |
|---:|---|---:|
| 2 | fascia lata, iliotibial tract and saphenous opening with labelled regional figures | 1 |
| 3–5 | three thigh compartments; anterior-compartment muscles, actions and supply; labelled anterior-thigh overview | 3 |
| 6–9 | sartorius origin/insertion/supply, actions, and two attachment/identification diagrams | 4 |
| 10–11 | psoas-major and iliacus origins, insertions, supply and iliopsoas action | 2 |
| 12–15 | quadriceps membership/identification, cross-sectional organisation, common insertion, supply and actions | 4 |
| 16–22 | rectus-femoris dual origins and illustrations; vastus intermedius, medialis and lateralis origins; combined femoral attachment maps | 7 |
| 23–27 | femoral-triangle site, boundaries, floor, contents and two labelled/mnemonic overview diagrams | 5 |
| 28–30 | femoral-sheath/canal definition and compartments, labelled sheath diagram, and femoral-ring/hernia teaching slide | 3 |
| 31–35 | femoral-artery origin, course, termination, overview diagram, branch list and labelled branch diagram | 5 |
| 36 | femoral-vein beginning, course and termination with labelled diagrams | 1 |
| 37 | great/small saphenous-vein course, termination and clinical-use statements | 1 |
| 38–39 | femoral-nerve roots, course, termination, muscular/cutaneous/articular branches and sensory distribution | 2 |
| **Total** | **tier-4 instructional compositions** | **38** |

The **38 content-slide occurrences are 38 source-distinct teaching compositions**. Reused
base illustrations acquire different titles, text, label layers, crops or instructional
purposes; there is no exact complete-page copy to collapse. The source boundary is therefore
**38 teaching compositions / 0 ordinary questions / 0 practical or station prompts / 0
printed assessment keys / 0 assessment residues**. Because the source is theoretical, its
instructional diagrams add **0 practical plates, 0 practical label mappings and 0 practical
residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 38 compositions consolidate to 16 source-level theoretical teaching scopes. This
collapse preserves every page occurrence and does not turn lecture statements into tested
concepts.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `fascia-lata-iliotibial-tract-and-saphenous-opening` · p. 2 | fascia lata deep fascia thigh; iliotibial tract lateral thickening; saphenous opening fascia lata; deep fascia thigh stocking | no single direct live/pending record owns the composite; accepted Families 2, 4 and 31 jointly own the fascia-lata/tract/opening scope — prior LCS reuse |
| `anterior-thigh-compartments-muscles-and-supply` · pp. 3–5 | anterior thigh compartments; anterior compartment thigh muscles; thigh intermuscular septa; anterior thigh femoral nerve supply | no direct live/pending same-scope hit; exact accepted Family-31 handle — prior LCS reuse |
| `sartorius-origin-insertion-action-and-supply` · pp. 6–9 | sartorius origin insertion; sartorius ASIS tibia; sartorius action hip knee; sartorius OINA | external component hits do not own full OINA; accepted Family-1/Family-31 sartorius handles jointly own the complete scope — prior LCS reuse |
| `psoas-major-origin-insertion-and-supply` · p. 10 | psoas major origin insertion; psoas lumbar vertebra lesser trochanter; psoas major anterior rami L1 L3; psoas major OINA | no direct live/pending full-scope hit; accepted Families 4 and 31 jointly own attachment and supply — prior LCS reuse |
| `iliacus-iliopsoas-origin-insertion-and-action` · p. 11 | iliacus origin insertion; iliacus iliac fossa lesser trochanter; iliopsoas tendon lesser trochanter; iliopsoas hip flexion | no direct live/pending full-scope hit; exact accepted Family-31 attachment handle plus accepted hip-flexor action — prior LCS reuse |
| `quadriceps-femoris-components-and-identification` · pp. 12–14 | quadriceps femoris components; quadriceps four heads; rectus vastus intermedius lateralis medialis; quadriceps identification model | pending 103-BMS material owns the four-head scope; exact accepted Family-20/Family-31 handle — prior LCS reuse with inherited pending overlap |
| `quadriceps-common-insertion-and-action` · p. 15 | quadriceps insertion patella; quadriceps tendon patellar ligament tibial tuberosity; quadriceps knee extension; vastus medial lateral patellar stabilization | no external record owns the complete insertion/action composite; accepted Families 3 and 31 jointly own it — prior LCS reuse |
| `rectus-femoris-dual-head-origins` · pp. 16–17, 21 | rectus femoris straight reflected head; rectus femoris two heads origin; rectus femoris AIIS acetabular origin; rectus femoris origin identification | no direct live/pending same-scope hit; exact accepted Family-31 handle, itself a subset of accepted `rectus-femoris-oina` — prior LCS reuse |
| `vasti-femoral-origins` · pp. 18–22 | vastus medialis origin; vastus lateralis origin; vastus intermedius origin; vasti femur attachment origins | no direct live/pending same-scope hit; exact accepted Family-31 handle — prior LCS reuse |
| `femoral-triangle-anatomy` · pp. 23–27 | femoral triangle; Scarpa triangle; femoral triangle boundaries floor; femoral triangle contents VAN | pending Kasr/AU material can absorb full boundaries, floor and contents; exact accepted Families 1, 2 and 20 handle — prior LCS reuse with inherited pending overlap |
| `femoral-sheath-and-canal` · pp. 28–29 | femoral sheath; femoral canal; femoral sheath compartments; femoral artery vein canal sheath | pending AU/Kasr material owns the three compartments and their contents; exact accepted Families 1, 2 and 20 handle — prior LCS reuse with inherited pending overlap |
| `femoral-ring-and-hernia` · p. 30 | femoral ring; femoral canal superior opening; femoral hernia ring; Cloquet node femoral canal | pending combined sheath/canal/ring record owns the opening and hernia route; accepted prior sheath/ring evidence already absorbs the source subset — prior LCS reuse with inherited pending overlap |
| `femoral-artery-origin-course-termination-and-branches` · pp. 31–35 | femoral artery origin termination branches; external iliac continuation femoral artery; femoral artery adductor hiatus popliteal; profunda femoris descending genicular branches | external relation hits are narrower than the full artery record; exact accepted Family-1/Family-20/Family-31 artery handle — prior LCS reuse |
| `femoral-vein-beginning-course-and-termination` · p. 36 | femoral vein beginning termination; popliteal vein continuation femoral vein; femoral vein external iliac vein inguinal ligament; femoral vein adductor canal course | no direct live/pending full-scope hit; exact accepted Family-31 handle — prior LCS reuse |
| `great-and-small-saphenous-veins-course-and-clinical-use` · p. 37 | great small saphenous veins; long short saphenous vein course; saphenous vein varicose graft; great saphenous femoral small saphenous popliteal | pending Kasr/AU records own both courses plus the varicose/graft teaching; accepted Families 1, 2 and 4 already own the source scope — prior LCS reuse with inherited pending overlap |
| `femoral-nerve-roots-course-and-distribution` · pp. 38–39 | femoral nerve roots course branches; L2 L3 L4 femoral nerve; femoral nerve anterior posterior divisions; saphenous medial intermediate cutaneous nerve thigh | pending Kasr/AU material owns the roots, course, branches and sensory distribution; exact accepted Family-2/Family-20 handle — prior LCS reuse with inherited pending overlap |

All **16 × 4 = 64** required searches completed across live state, `docs/import-ready`,
`docs/questions-import-ready` and all source-import roots; generic follow-ups were also used
to inspect broad regional hits. The direct external result is **0 live / 6 pending / 10
new** at the complete-scope level. Exact accepted-prior comparison removes all ten apparent
additions, leaving **16 prior-LCS reuses / 0 new theoretical teaching scopes**. With no
source prompt, none enters the eligible tested-concept count; because the source is
theoretical, none enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 39 | Family 39 delta | After Family 39 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +0 | 447 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +0 | 204 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +0 / +0 | 9 / 49 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. The eligible question checkpoint remains **447 prompts / 242 printed
keys / 204 concepts = 9 live / 49 pending / 146 new**. Arithmetic checks are `38 = 1 + 3
+ 4 + 2 + 4 + 7 + 5 + 3 + 5 + 1 + 1 + 2`, `447 + 0 = 447`, `242 + 0 = 242`, `204
+ 0 = 204`, `9 + 49 + 146 = 204`, `251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0
= 91`, and `55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-38
remainder leaves **37 rank-4/rank-5 path instances / 35 unique hashes**. The Family-38
method was reproduced first: its 38/36 row sets recomputed to
`d07372201d3429a4bc539fac712a8282375e960995bcd9d34f5a09fef3aa7882` and
`cf2f5344cbc6e2f953d6ad55d944426e5a212a0cbc8fca3f4af48dc903526672`.
For the exact post-Family-39 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`e3ed4abebff0d80f295bd0d0ffe59309aafaeba2c4a13a441b5388cee7c998c7`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`614cb4e3059ee93d431ef282b6b56bfd667cbc75753989c69081fadf158ff9aa`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_88ff9464e6fabde88dcc`, `Anatomy Lecture Muscles of the back.pdf` (3,782,094 bytes; 44
native-text pages; SHA-256
`88ff9464e6fabde88dccea091a860c912ef5cb9f88bd8cdd6161e6d0a4c12501`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 12 - Muscles of Back/`. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.

## Family 40 — Tier-4 Anatomy lecture interactive-question gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_88ff9464e6fabde88dcc` |
| File / SHA-256 | `Anatomy Lecture Muscles of the back.pdf` / `88ff9464e6fabde88dccea091a860c912ef5cb9f88bd8cdd6161e6d0a4c12501` |
| File boundary | 3,782,094 bytes · unencrypted PDF · 44 physical native-text pages · 720 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 12 - Muscles of Back/Anatomy Lecture Muscles of the back.pdf` |
| Visible provenance | p. 1 prints `Ass. Prof. Dr. Eman El Sawaf`, `Anatomy & Embryology Department`, `Faculty Of Medicine`, and `Capital University (Formerly Helwan)`; p. 2 prints `Locomotor Module`, `Anatomy`, and `Muscles Of The Back` |
| Authority finding | Direct local Helwan-labelled tier-4 teaching evidence. It is not a sitting paper, station sheet, response form, department question bank or official answer key; the two embedded `Interactive Question` slides are formative lecture evidence. |

The SHA-256, byte count and 44-page boundary were recomputed and match the manifest. All 44
pages were rendered at 140 dpi and read against the native text layer. Pages 1–4 are
provenance/title/objective/contents framing, pp. 5–30 are instructional material, p. 31 is
the first interactive prompt, pp. 32–41 return to teaching, p. 42 is the second interactive
prompt, p. 43 is the references slide and p. 44 is the closing slide.

The full-source gate finds exactly **two complete printed prompt occurrences** and **zero
printed keys**. Page 31 asks `Mention the action of trapezius muscle.` as an open prompt
with no answer line, response field or answer reveal. Page 42 asks `What is the nerve supply
of rhomboid muscles?` with four choices: `a. Thoracodorsal.`, `b. Suprascapular.`,
`c. Subscapular.`, and `d. Dorsal scapular.` All four choices are visibly unmarked. The
preceding teaching is not converted into a key: pp. 14–18 teach trapezius actions before the
p. 31 prompt, while pp. 38 and 41 teach nerve supply before the p. 42 prompt, but none is an
answer reveal, keyed copy, coloured/underlined option or correctness convention tied to the
question. No other imperative/interrogative prompt, response area, option set, answer line,
mark allocation or answer reveal occurs anywhere in the source.

### Complete teaching-slide and assessment-boundary inventory

The lecture's images and labelled diagrams remain parts of their tier-4 theoretical teaching
compositions; they are not promoted into the tier-5 practical plate/mapping ledger.

| Physical pages | Source-first instructional compositions | Slide occurrences |
|---:|---|---:|
| 5 | five-muscle back overview: trapezius, latissimus dorsi, levator scapulae, rhomboid minor and rhomboid major | 1 |
| 6–18 | trapezius form, origins, insertion, nerve supply, fibre-specific actions and OINA summary | 13 |
| 19–30 | latissimus-dorsi form, origins, insertion, nerve supply, actions and OINA summary | 12 |
| 32–41 | levator-scapulae/rhomboid overview, origins, insertions, nerve supply, actions and three-muscle OINA summary | 10 |
| **Total** | **tier-4 instructional compositions** | **36** |

The **36 content-slide occurrences are 36 source-distinct teaching compositions**. Some
base skeleton, bone and action photographs recur, and pp. 39–40 teach the same action scope,
but their complete slide layouts, text layers and/or illustrative purpose differ. SHA-256
comparison of all 44 rendered complete pages found no exact full-page copy to collapse. The
source boundary is therefore **36 teaching compositions / 2 ordinary formative questions /
0 practical or station prompts / 0 printed assessment keys / 0 assessment residues**.
Because this is theoretical material, its instructional figures add **0 practical plates,
0 practical label mappings and 0 practical residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 36 compositions consolidate to four source-level theoretical teaching scopes. Page 5's
overview supports all four handles without being counted more than once in the physical-slide
total.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `trapezius-oina` · pp. 5–18 | trapezius origin insertion nerve supply; trapezius OINA; nuchal line clavicle acromion scapular spine; accessory nerve trapezius | the external accessory-nerve hit is a narrower pending paralysis-test scope, not the complete OINA handle; exact accepted Family-36 handle — prior LCS reuse |
| `latissimus-dorsi-oina` · pp. 5, 19–30 | latissimus dorsi origin insertion nerve supply; latissimus dorsi OINA; thoracolumbar fascia bicipital groove; thoracodorsal nerve latissimus | no direct live/pending complete-scope hit; exact accepted Family-36 handle — prior LCS reuse |
| `levator-scapulae-oina` · pp. 5, 32–41 | levator scapulae origin insertion nerve supply action; levator scapulae OINA; upper cervical transverse processes medial border scapula; dorsal scapular nerve levator scapulae | no direct live/pending complete-scope hit; exact accepted Family-36 handle — prior LCS reuse |
| `rhomboid-minor-and-major-oina` · pp. 5, 32–41 | rhomboid major minor origin insertion nerve supply action; rhomboid OINA; C7 T5 spinous processes medial border scapula; dorsal scapular nerve rhomboid | no direct live/pending complete-scope hit; exact accepted Family-36 handle — prior LCS reuse |

All **4 × 4 = 16** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete composite-scope level, the raw external result is **0 live / 0 pending / 4 new**;
exact accepted-prior comparison removes all four apparent module additions, leaving **four
prior-LCS reuses / zero new theoretical teaching scopes**. These declarative teaching scopes
do not themselves enter the eligible tested-concept count, and no theoretical scope enters
the practical-teaching-scope counter.

### Assessment handles, searches and overlap result

The two prompts are source-distinct and do not collapse semantically. Each received four
required query forms across the same live/pending and source-import roots (**2 × 4 = 8
invocations**), followed by direct record-level scope review.

| Source prompt | Handle / four required queries | Search / prior-LCS result | Disposition |
|---|---|---|---|
| p. 31 trapezius-action request | `trapezius-actions` · trapezius suspends the shoulder girdle; lower fibres of trapezius depress; upper fibres elevate the scapula; middle fibres retract it | pending `101-ISK-mcq-concepts.md` handle `trapezius-attachments-actions-and-shoulder-drop` explicitly owns the upper-elevate, middle-retract, lower-depress and upward-rotation action scope; Family 36 taught trapezius OINA but no accepted prior LCS prompt tested its actions | new-to-eligible LCS; pending; NEU/ANA |
| p. 42 rhomboid-innervation MCQ | `rhomboids-dorsal-scapular-innervation` · rhomboid nerve supply; dorsal scapular nerve; nerve to rhomboids; rhomboid major minor innervation | pending AU/Kasr dorsal-scapular-nerve concepts explicitly own supply to rhomboid major/minor; Family 36 taught rhomboid OINA but no accepted prior LCS prompt tested the nerve-supply fact | new-to-eligible LCS; pending; NEU/ANA |

The source-level assessment result is **0 live / 2 pending / 0 new**. Neither source handle
was previously counted in the eligible LCS tested-concept ledger, so both add to the module
as pending concepts. Their printed source prompt wording remains the evidence; no answer is
inferred from the pending records or from the lecture's earlier declarative slides.

| Family-40 evidence bucket | Prompt occurrences | Printed keys | Source handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| New eligible-LCS tested scopes | 2 | 0 | 2 | 2 | 0 | 2 | 0 |
| **Family 40 assessment evidence** | **2** | **0** | **2** | **2** | **0** | **2** | **0** |

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 40 | Family 40 delta | After Family 40 |
|---|---:|---:|---:|
| Eligible observed question records | 447 | +2 | 449 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 204 | +2 | 206 |
| Question live / pending / new | 9 / 49 / 146 | +0 / +2 / +0 | 9 / 51 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `36 = 1 + 13 + 12 + 10`, `2 prompts = 2
source handles`, `0 + 2 + 0 = 2` source dispositions, `0 prior eligible + 2 new-to-eligible
= 2`, `447 + 2 = 449`, `242 + 0 = 242`, `204 + 2 = 206`, `9 + 51 + 146 = 206`,
`251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-39
remainder leaves **36 rank-4/rank-5 path instances / 34 unique hashes**. The Family-39
method was reproduced first: its 37/35 row sets recomputed to
`e3ed4abebff0d80f295bd0d0ffe59309aafaeba2c4a13a441b5388cee7c998c7` and
`614cb4e3059ee93d431ef282b6b56bfd667cbc75753989c69081fadf158ff9aa`.
For the exact post-Family-40 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`f8d66ea1a4cafc4dac50793a5ff7d4aea9e53fd17731f45adf8604cbcfda101c`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`6d6e8826dff9cbed6b80051ea84dc273ccb22adce7efdb9e2c8a17fe153af8d6`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_8bd8d156f885aecec812`, `Medial Compartment Of Thigh.pdf` (4,732,560 bytes; 56
native-text pages; SHA-256
`8bd8d156f885aecec812b9c00a42dbaf84ab2e1601779fdbc3dbe732640c788e`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 2 - Medial Compartment of Thigh & Gluteal Region 1,
2/`. Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue
update, import or source copy was created.

## Family 41 — Tier-4 medial-thigh lecture interactive-question gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_8bd8d156f885aecec812` |
| File / SHA-256 | `Medial Compartment Of Thigh.pdf` / `8bd8d156f885aecec812b9c00a42dbaf84ab2e1601779fdbc3dbe732640c788e` |
| File boundary | 4,732,560 bytes · unencrypted PDF · 56 physical native-text pages · 720 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 2 - Medial Compartment of Thigh & Gluteal Region 1, 2/Medial Compartment Of Thigh.pdf` |
| Visible provenance | p. 1 prints `Dr. Eman El Sawaf`, `Anatomy & Embryology Department`, `Faculty Of Medicine`, and `Capital University (Formerly Helwan)`; p. 2 prints `Locomotor Module`, `Anatomy`, and `Lower Limb` |
| Authority finding | Direct local Helwan-labelled tier-4 teaching evidence. It is not a sitting paper, station sheet, response form, department question bank or official answer key; the two embedded `Interactive Question` slides are formative lecture evidence. |

The SHA-256, byte count and 56-page boundary were recomputed and match the manifest. All 56
pages were rendered at 140 dpi and read against the native text layer. Pages 1–2 are
provenance/title, pp. 3–4 are lower-limb orientation teaching, pp. 5–6 are objectives and
contents, pp. 7–37 are instructional material, p. 38 is the first interactive prompt, pp.
39–53 return to teaching, p. 54 is the second interactive prompt, p. 55 is references and p.
56 is the closing slide.

The full-source gate finds exactly **two complete printed prompt occurrences** and **zero
printed keys**. Page 38 asks `List the muscles which adducts the hip joint.` as an open
prompt with no answer line, response field or answer reveal. Page 54 asks `Concerning the
cutaneous innervation of the thigh, the obturator nerve supplies which one of the
following?` with four choices: `a. The anterior aspect.`, `b. The posterior aspect.`, `c.
The medial aspect.`, and `d. The lateral aspect.` All four choices are visibly unmarked.
The preceding teaching is not converted into a key: pp. 31–37 and p. 53 teach medial-thigh
actions before the p. 38 prompt and pp. 46–47 and p. 53 teach obturator cutaneous supply
before p. 54, but none is an answer reveal, keyed copy, coloured/underlined option or
correctness convention tied to the question. The numbered attachment locators on pp. 13 and
17 are declarative teaching diagrams whose labels follow on later slides, not assessment
instructions or blanks. No other imperative/interrogative prompt, response area, option set,
answer line, mark allocation or answer reveal occurs anywhere in the source.

### Complete teaching-slide and assessment-boundary inventory

The lecture's figures and labelled diagrams remain parts of their tier-4 theoretical teaching
compositions; they are not promoted into the tier-5 practical plate/mapping ledger.

| Physical pages | Source-first instructional compositions | Slide occurrences |
|---:|---|---:|
| 3–4 | lower-limb major-bone and regional orientation | 2 |
| 7–8 | thigh definition and compartment overview | 2 |
| 9–12 | medial-compartment muscles, layers and gracilis relation | 4 |
| 13–16 | medial-thigh muscle origins | 4 |
| 17–28 | medial-thigh muscle insertions and muscle-specific attachment summaries | 12 |
| 29–37 | nerve supply, actions and medial-thigh OINA summaries | 9 |
| 39–42 | adductor-canal definition, extent, boundaries and contents | 4 |
| 43–47 | obturator-nerve origin, course and branches | 5 |
| 48–52 | obturator-artery origin, course and branches | 5 |
| 53 | medial-compartment summary | 1 |
| **Total** | **tier-4 instructional compositions** | **48** |

The **48 content-slide occurrences are 48 source-distinct teaching compositions**. Some
base skeleton, muscle, nerve and vessel illustrations recur, and pp. 32–33 share an action
scope, but their complete layouts, text layers and/or illustrative purpose differ. SHA-256
comparison of all 56 rendered complete pages found no exact full-page copy to collapse. The
source boundary is therefore **48 teaching compositions / 2 ordinary formative questions /
0 practical or station prompts / 0 printed assessment keys / 0 assessment residues**.
Because this is theoretical material, its instructional figures add **0 practical plates,
0 practical label mappings and 0 practical residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 48 compositions consolidate to nine source-level theoretical teaching scopes. Page 53's
summary supports existing scopes without being counted more than once in the physical-slide
total.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `lower-limb-bones-and-regions-orientation` · pp. 3–4 | lower limb major bones; lower limb regions; femur tibia fibula patella; gluteal thigh leg foot regions | no direct live/pending complete-scope hit; accepted Family-30 bones evidence owns the skeletal subset, but no accepted prior handle owns the combined bone-and-region orientation — new |
| `thigh-definition-and-compartments` · pp. 7–8 | thigh definition boundaries; thigh compartments; anterior medial posterior thigh compartments; thigh extends hip to knee | no direct live/pending same-scope hit; accepted Families 31, 32 and 39 jointly own the source's regional and compartment subset — prior LCS reuse |
| `medial-thigh-compartment-layers` · pp. 9–12 | medial compartment thigh layers; adductor compartment layers; pectineus adductor longus anterior layer; adductor brevis middle layer | no direct live/pending same-scope hit; exact accepted Families 5 and 32 handle — prior LCS reuse |
| `medial-thigh-muscle-origins` · pp. 13–16 | medial thigh muscle origins; adductor longus brevis gracilis origins; pectineus obturator externus origins; adductor magnus pubic ischial origins | no direct live/pending same-scope hit; exact accepted Family-32 scope — prior LCS reuse |
| `medial-thigh-muscle-insertions` · pp. 17–28 | medial thigh muscle insertions; adductor longus brevis femur insertions; adductor magnus adductor tubercle insertion; gracilis pectineus obturator externus insertions | no direct live/pending same-scope hit; exact accepted Family-32 scope — prior LCS reuse |
| `medial-thigh-muscle-innervation-and-actions` · pp. 29–37, 53 | medial thigh muscle innervation action; obturator nerve medial compartment muscles; adductor muscles hip actions; pectineus gracilis obturator externus actions | external component hits do not own the complete composite; accepted Family-1 muscle OINA handles jointly own the printed supply/action subset — prior LCS reuse |
| `adductor-canal` · pp. 39–42 | adductor canal anatomy; Hunter canal boundaries; subsartorial canal contents; sartorius vastus medialis adductor longus magnus | pending Kasr material owns the walls and contents; exact accepted Families 1, 5 and 20 handle — prior LCS reuse with inherited pending overlap |
| `obturator-nerve-roots-and-distribution` · pp. 43–47 | obturator nerve origin course branches; L2 L3 L4 obturator nerve; obturator nerve anterior posterior divisions; obturator nerve medial thigh cutaneous | pending Kasr/AU material owns roots, course, branches and sensory territory; exact accepted Families 1, 2 and 20 handle — prior LCS reuse with inherited pending overlap |
| `obturator-artery-origin-course-and-branches` · pp. 48–52 | obturator artery origin course branches; internal iliac obturator artery; obturator artery obturator canal; acetabular branch obturator artery | external component hits own the source facts; accepted Family-5 auxiliary artery scope owns the same origin/course subset — prior LCS reuse with inherited pending overlap |

All **9 × 4 = 36** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete-scope level, the direct external result is **0 live / 3 pending / 6 new**; exact
accepted-prior comparison removes five apparent additions, leaving **eight prior-LCS reuses
/ one new theoretical teaching scope**. These declarative scopes do not themselves enter
the eligible tested-concept count, and no theoretical scope enters the practical-teaching
scope counter.

### Assessment handles, searches and overlap result

The two prompts are source-distinct and do not collapse semantically. Each received four
required query forms across the same live/pending and source-import roots (**2 × 4 = 8
invocations**), followed by direct record-level scope review.

| Source prompt | Handle / four required queries | Search / prior-LCS result | Disposition |
|---|---|---|---|
| p. 38 hip-adductor listing request | `hip-adductor-muscles` · muscles adduct hip; hip adductor muscles; adduction hip muscles; adductor longus brevis magnus gracilis | pending AU/Kasr material owns the medial-compartment muscle/adduction set; accepted prior LCS OINA handles test individual muscles but no prior eligible prompt asks for the collective list | new-to-eligible LCS; pending; MSK/ANA |
| p. 54 obturator cutaneous-territory MCQ | `obturator-nerve-medial-thigh-cutaneous-territory` · obturator nerve cutaneous thigh; cutaneous innervation medial thigh; obturator nerve medial aspect thigh; medial thigh skin nerve supply | pending Kasr/AU records own the medial-thigh sensory territory; this is a narrower repeat of accepted Family-1 `obturator-nerve-roots-and-distribution` assessment evidence | prior eligible-LCS reuse; inherited pending |

The source-level assessment result is **0 live / 2 pending / 0 new**. The first source handle
is new to the eligible LCS tested-concept ledger and adds one pending concept; the second is
already counted and adds only its newly observed prompt occurrence. Their printed source
wording remains the evidence; no answer is inferred from pending records or earlier lecture
slides.

| Family-41 evidence bucket | Prompt occurrences | Printed keys | Source handles | Net module concepts | Live | Pending | New |
|---|---:|---:|---:|---:|---:|---:|---:|
| New eligible-LCS tested scope | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| Prior eligible-LCS reuse | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
| **Family 41 assessment evidence** | **2** | **0** | **2** | **1** | **0** | **1** | **0** |

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 41 | Family 41 delta | After Family 41 |
|---|---:|---:|---:|
| Eligible observed question records | 449 | +2 | 451 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 206 | +1 | 207 |
| Question live / pending / new | 9 / 51 / 146 | +0 / +1 / +0 | 9 / 52 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `48 = 2 + 2 + 4 + 4 + 12 + 9 + 4 + 5 + 5 +
1`, `2 prompts = 2 source handles`, `1 new eligible + 1 prior eligible = 2`, `0 + 2 + 0 =
2` source dispositions, `449 + 2 = 451`, `242 + 0 = 242`, `206 + 1 = 207`, `9 + 52 +
146 = 207`, `251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-40
remainder leaves **35 rank-4/rank-5 path instances / 33 unique hashes**. The Family-40
method was reproduced first: its 36/34 row sets recomputed to
`f8d66ea1a4cafc4dac50793a5ff7d4aea9e53fd17731f45adf8604cbcfda101c` and
`6d6e8826dff9cbed6b80051ea84dc273ccb22adce7efdb9e2c8a17fe153af8d6`.
For the exact post-Family-41 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`1dbd85a53f419c225b4375271eaa34be43f2fc0fcba926dd117b79d4ca25ca6d`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`ab47730874ec211edeeb051115a8df87ac0c5c5fa1d1abadeda8a80923cafec3`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_0e30d32f2bc49e81e838`, `posterior compartment of thigh and POP. fossa Dr Sarah .pdf`
(18 native-text pages; SHA-256
`0e30d32f2bc49e81e838d8eaae5e461b648951e17f3bc8f52ee4ecbf45a67d2a`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 3 - Posterior Compartment of Thigh & Popliteal
Fossa/`. Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue
update, import or source copy was created.

## Family 42 — Tier-4 posterior-thigh and popliteal-fossa teaching-only lecture gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_0e30d32f2bc49e81e838` |
| File / SHA-256 | `posterior compartment of thigh and POP. fossa Dr Sarah .pdf` / `0e30d32f2bc49e81e838d8eaae5e461b648951e17f3bc8f52ee4ecbf45a67d2a` |
| File boundary | 1,565,088 bytes · unencrypted PDF · 18 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | Manifest records `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 3 - Posterior Compartment of Thigh & Popliteal Fossa/posterior compartment of thigh and POP. fossa Dr Sarah .pdf`; the hash-matched local filename is normalized to `posterior compartment of thigh and POP. fossa Dr Sarah.pdf` without the pre-extension space |
| Visible provenance | p. 1 prints `Posterior Compartment of the thigh And Popliteal Fossa`, `Dr. Sarah Arakib`, and `MD Anatomy and Embryology`; PDF author is `Shaimaa Helmy`; p. 3 alone prints footer `LCS - 105` |
| Authority finding | Manifest/path-placed local tier-4 teaching evidence, with the visible `LCS - 105` footer discrepancy preserved as an authority caution. It is not a sitting paper, station sheet, response form, question bank or official answer key. |

The SHA-256 and 18-page boundary were recomputed and match the manifest; the 1,565,088-byte
hash-matched local file resolves the manifest filename's pre-extension-space discrepancy. All
18 pages were rendered at 140 dpi and read against the native text layer. Page 1 is the title
page, pp. 2–9 teach posterior-compartment muscles, pp. 10–17 teach the popliteal fossa and
its vessels, and p. 18 is a motivational closing image.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. Every anatomical sentence, heading, label and arrow is
simultaneous declarative teaching. No page contains an imperative or interrogative prompt,
response field, blank answer area, option set, mark allocation, correctness convention or
answer reveal.

### Complete teaching-slide and assessment-boundary inventory

The lecture's figures and labelled diagrams remain parts of tier-4 theoretical teaching
compositions; they are not promoted into the tier-5 practical plate/mapping ledger.

| Physical pages | Source-first instructional compositions | Slide occurrences |
|---:|---|---:|
| 2 | posterior-compartment/hamstring members and division-specific sciatic supply | 1 |
| 3–4 | biceps-femoris origins, insertion, supply and actions | 2 |
| 5–7 | semitendinosus origin, insertion, supply and actions | 3 |
| 8–9 | semimembranosus origin, insertion, supply and actions | 2 |
| 10–14 | popliteal-fossa location, roof, floor, borders and contents | 5 |
| 15–16 | popliteal-artery origin, course, relations, termination and branches | 2 |
| 17 | popliteal-vein origin, course, relations, termination and tributaries | 1 |
| **Total** | **tier-4 instructional compositions** | **16** |

The **16 content-slide occurrences are 16 source-distinct teaching compositions**. Pages 5
and 6 repeat the semitendinosus insertion on different complete layouts, while pp. 15 and 17
reuse the same neurovascular-relation diagram for different artery/vein teaching purposes.
SHA-256 comparison of all 18 rendered complete pages found no exact full-page copy to
collapse. The source boundary is therefore **16 teaching compositions / 0 ordinary
questions / 0 practical or station prompts / 0 printed assessment keys / 0 assessment
residues**. As theoretical material, its figures add **0 practical plates, 0 practical label
mappings and 0 practical residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 16 compositions consolidate to seven source-level theoretical teaching scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `posterior-thigh-compartment-muscles-and-supply` · p. 2 | posterior thigh compartment muscles; posterior thigh hamstring compartment organization; posterior compartment thigh nerve supply; posterior thigh muscles sciatic tibial division | no direct live/pending complete-scope hit; exact accepted Family-33 handle — prior LCS reuse |
| `biceps-femoris-oina` · pp. 3–4 | biceps femoris origin insertion nerve supply; biceps femoris OINA; biceps femoris long short head attachments; biceps femoris fibular head nerve supply | no direct live/pending complete-scope hit; exact accepted Families 1 and 33 handle — prior LCS reuse |
| `semitendinosus-oina` · pp. 5–7 | semitendinosus origin insertion nerve supply action; semitendinosus OINA; semitendinosus ischial tuberosity medial tibia; semitendinosus tibial sciatic nerve | no direct live/pending complete-scope hit; exact accepted Families 1 and 33 handle — prior LCS reuse |
| `semimembranosus-oina` · pp. 8–9 | semimembranosus origin insertion nerve supply action; semimembranosus OINA; semimembranosus ischial tuberosity medial tibial condyle; semimembranosus tibial sciatic nerve | no direct live/pending complete-scope hit; exact accepted Families 1 and 33 handle — prior LCS reuse |
| `popliteal-fossa` · pp. 10–14 | popliteal fossa boundaries roof floor contents; popliteal fossa anatomy; popliteal fossa borders hamstrings gastrocnemius; popliteal fossa contents artery vein tibial nerve | direct mentions are narrower than the whole fossa scope; exact accepted Families 1, 6 and 33 handle — prior LCS reuse |
| `popliteal-artery` · pp. 15–16 | popliteal artery origin course termination branches; femoral artery adductor hiatus popliteal artery; popliteal artery anterior posterior tibial arteries; popliteal genicular branches | pending AU material owns continuation, termination and genicular branches; exact accepted Families 1, 2 and 33 handle — prior LCS reuse with inherited pending overlap |
| `popliteal-vein-beginning-course-and-termination` · p. 17 | popliteal vein origin course termination tributaries; popliteal vein anterior posterior tibial veins; popliteal vein adductor hiatus femoral vein; small saphenous vein popliteal vein | small-saphenous and femoral-vein hits are component records, not the full vein scope; accepted Family-33 popliteal-vein handle owns the beginning/termination and this source supplies its course/tributary detail — prior LCS reuse |

All **7 × 4 = 28** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete-scope level, the direct external result is **0 live / 1 pending / 6 new**; exact
accepted-prior comparison removes all six apparent additions, leaving **seven prior-LCS
reuses / zero new theoretical teaching scopes**. There is no assessment handle to search.
These declarative scopes do not enter the eligible tested-concept count, and no theoretical
scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 42 | Family 42 delta | After Family 42 |
|---|---:|---:|---:|
| Eligible observed question records | 451 | +0 | 451 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 207 | +0 | 207 |
| Question live / pending / new | 9 / 52 / 146 | +0 / +0 / +0 | 9 / 52 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `16 = 1 + 2 + 3 + 2 + 5 + 2 + 1`, `0
prompts = 0 source handles`, `451 + 0 = 451`, `242 + 0 = 242`, `207 + 0 = 207`, `9 + 52
+ 146 = 207`, `251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 =
55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-41
remainder leaves **34 rank-4/rank-5 path instances / 32 unique hashes**. The Family-41
method was reproduced first: its 35/33 row sets recomputed to
`1dbd85a53f419c225b4375271eaa34be43f2fc0fcba926dd117b79d4ca25ca6d` and
`ab47730874ec211edeeb051115a8df87ac0c5c5fa1d1abadeda8a80923cafec3`.
For the exact post-Family-42 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`e10573b0ff42f8932291623aaf7563ff9e396293eb5436a6a69cb869133c17cf`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`8bf87ec9940bf36a83da98958c336cc3be8b4c30e349e1d16ee95becd454c7b8`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_5f00bf0283978c12f4c9`, `Anatomy Lecture Anterolateral Comp. Of The Leg.pdf` (3,322,719
bytes; 49 native-text pages; SHA-256
`5f00bf0283978c12f4c9058883c6bd149b815e9148b63d38742a1c3ae9c1c04f`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 4 - Anterolateral & Posterior Compartment of
Leg/`. Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue
update, import or source copy was created.

## Family 43 — Tier-4 anterolateral-leg lecture with two unkeyed formative prompts

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_5f00bf0283978c12f4c9` |
| File / SHA-256 | `Anatomy Lecture Anterolateral Comp. Of The Leg.pdf` / `5f00bf0283978c12f4c9058883c6bd149b815e9148b63d38742a1c3ae9c1c04f` |
| File boundary | 3,322,719 bytes · unencrypted PDF · 49 physical native-text pages · 720 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 4 - Anterolateral & Posterior Compartment of Leg/Anatomy Lecture Anterolateral Comp. Of The Leg.pdf` |
| Visible provenance | p. 1 prints `Dr. Eman El Sawaf`, `Anatomy & Embryology Department`, `Faculty Of Medicine`, and `Capital University (Formerly Helwan)`; PDF author is `User` and creator/producer is Microsoft PowerPoint 2019 |
| Authority finding | Manifest/path-placed local tier-4 teaching evidence with two ordinary formative prompts. It is not a sitting paper, station sheet, practical response form, question bank or official answer key. |

The SHA-256, byte size and 49-page boundary were recomputed and match the assigned source.
All 49 pages were rendered at 140 dpi and read against the native text layer. Page 1 is the
provenance slide, p. 2 is the module/anatomy/lower-limb title, pp. 3–4 orient the lower-limb
bones and regions, pp. 5–6 state the objectives and contents, pp. 7–30 teach the anterior and
lateral leg compartments with emphasis on the anterior muscles, p. 31 is an `Interactive
Question`, pp. 32–46 teach the lateral-compartment muscles and summary, p. 47 is a second
`Interactive Question`, p. 48 gives references and p. 49 closes with `Thank You`.

Pages 31 and 47 are genuine ordinary formative prompts because they explicitly ask the
student to produce or select an answer. Neither page prints a correctness mark, answer
reveal, explanatory key or response already selected. Declarative attachment and action
statements on earlier and later teaching slides remain simultaneous teaching evidence; they
are not silently promoted into printed keys for either prompt.

### Complete teaching-slide and assessment-boundary inventory

The lecture's figures, muscle montages, arrows and labelled diagrams remain parts of tier-4
theoretical teaching compositions; they are not promoted into the tier-5 practical
plate/mapping ledger.

| Physical pages | Source-first instructional composition or actual prompt | Teaching occurrences / assessment disposition |
|---:|---|---:|
| 3–4 | lower-limb bones, joints and named regions orientation | 2 teaching compositions |
| 7–9 | leg compartments and anterior/lateral muscle membership | 3 teaching compositions |
| 10–14 | anterior-compartment framework and position of tibialis anterior, extensor hallucis longus, extensor digitorum longus and fibularis tertius | 5 teaching compositions |
| 15–18 | combined anterior-muscle origins and insertions | 4 teaching compositions |
| 19–22 | individual attachment compositions for the four anterior-compartment muscles | 4 teaching compositions |
| 23–30 | deep-fibular supply; dorsiflexion, toe-extension, inversion/eversion and medial-arch actions; consolidated anterior-compartment table | 8 teaching compositions |
| 31 | `List the muscles which dorsiflex the foot at the ankle joint.` | 1 ordinary open prompt; no printed key |
| 32–35 | lateral-compartment framework, muscle positions and origins | 4 teaching compositions |
| 36–40 | combined and individual fibularis-longus/brevis insertions plus superficial-fibular supply | 5 teaching compositions |
| 41–46 | eversion, plantar-flexion and arch support; consolidated lateral-muscle table and movement/attachment summary | 6 teaching compositions |
| 47 | `Which one of the following muscles is inserted at the base of the 5th metatarsal bone?` with options `a. TA`, `b. TP`, `c. FL`, `d. FB` | 1 ordinary MCQ prompt; all four options visibly unmarked; no printed key |
| **Total** | **tier-4 content plus actual prompts** | **41 teaching compositions / 2 ordinary prompts / 0 printed keys** |

The **41 content-slide occurrences are 41 source-distinct teaching compositions**. Paired
slides 26/27, 28/29, 41/42 and 43/44 repeat action wording while changing the complete image
or layout, so none is an exact copy collapse. SHA-256 comparison of all 49 rendered complete
pages found no exact full-page duplicate. The two prompt pages are source-distinct and test
different concepts. The full boundary is therefore **41 teaching compositions / 2 ordinary
questions / 0 practical or station prompts / 0 printed assessment keys / 0 assessment
residues**. As theoretical material, its figures add **0 practical plates, 0 practical label
mappings and 0 practical residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 41 compositions consolidate to eight source-level theoretical teaching scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `lower-limb-bones-and-regions-orientation` · pp. 3–4 | lower limb major bones; lower limb regions; femur tibia fibula patella; gluteal thigh leg foot regions | no direct live/pending complete-scope hit; exact accepted Family-41 theoretical handle — prior LCS reuse |
| `leg-compartments-and-anterolateral-contents` · pp. 7–9 | leg compartments anatomy; anterior lateral leg compartments; anterior leg muscles deep fibular nerve; lateral leg fibularis superficial nerve | pending AU material owns the anterior-compartment membership/supply component, while the combined anterolateral scope is already accepted across Family-34's two compartment handles — prior LCS reuse with pending overlap |
| `tibialis-anterior-oina` · pp. 10–30 | tibialis anterior origin insertion nerve supply; tibialis anterior OINA; tibialis anterior tibia medial cuneiform; tibialis anterior dorsiflexion inversion | no direct live/pending complete-scope hit; exact accepted Families 1 and 34 handle — prior LCS reuse |
| `extensor-hallucis-longus-oina` · pp. 10–30 | extensor hallucis longus origin insertion nerve supply; EHL muscle OINA; extensor hallucis longus fibula distal phalanx; extensor hallucis longus action deep fibular | group-level pending mentions do not own the complete OINA scope; exact accepted Family-34 handle — prior LCS reuse |
| `extensor-digitorum-longus-oina` · pp. 10–30 | extensor digitorum longus origin insertion nerve supply; EDL muscle OINA; extensor digitorum longus fibula extensor expansion; extensor digitorum longus action deep fibular | group-level pending mentions do not own the complete OINA scope; exact accepted Family-34 handle — prior LCS reuse |
| `fibularis-tertius-oina` · pp. 10–30 | fibularis tertius origin insertion nerve supply action; peroneus tertius OINA; fibularis tertius fifth metatarsal; peroneus tertius dorsiflexion eversion | no direct live/pending complete-scope hit; Family 34 owns only `peroneus-tertius-origin-and-insertion`, so the present nerve/action-complete OINA scope is new theoretical teaching |
| `fibularis-longus-oina` · pp. 32–46 | fibularis longus origin insertion nerve supply; peroneus longus OINA; fibularis longus medial cuneiform first metatarsal; peroneus longus eversion plantarflexion arch | pending 103-BMS material owns the complete muscle scope; exact accepted Families 1 and 34 handle — prior LCS reuse with inherited pending overlap |
| `fibularis-brevis-oina` · pp. 32–46 | fibularis brevis origin insertion nerve supply; peroneus brevis OINA; fibularis brevis fifth metatarsal; peroneus brevis eversion plantarflexion | pending 103-BMS material owns the complete muscle scope; exact accepted Family-34 handle — prior LCS reuse with pending overlap |

All **8 × 4 = 32** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete-scope level, the direct external result is **0 live / 3 pending / 5 new**; exact
accepted-prior comparison prevents seven repeated module additions, leaving **seven
prior-LCS reuses / one new theoretical teaching scope**. Declarative teaching scopes do not
enter the eligible tested-concept count, and no theoretical scope enters the
practical-teaching-scope counter.

### Assessment handles, searches and prior-LCS adjudication

| Source page / eligible handle | Source prompt inventory | Four required `find-existing` queries | External / prior-LCS result |
|---|---|---|---|
| 31 · `ankle-dorsiflexor-muscles` | open request to list the ankle dorsiflexors; no answer line or printed key | muscles dorsiflex ankle; ankle dorsiflexor muscles; anterior compartment dorsiflexors; tibialis anterior EHL EDL fibularis tertius | pending AU and 103-BMS records explicitly own the four-muscle dorsiflexor group; no earlier eligible LCS-103 question handle tests the collective list — pending, new-to-eligible |
| 47 · `fibularis-brevis-fifth-metatarsal-insertion` | one four-option MCQ; all options unmarked and no printed key | fibularis brevis insertion; peroneus brevis fifth metatarsal; base fifth metatarsal muscle; fibularis brevis attachment | pending 103-BMS article/concept material explicitly owns the fifth-metatarsal insertion; Family-34 coverage is teaching-only and no earlier eligible LCS-103 question handle tests this fact — pending, new-to-eligible |

All **2 × 4 = 8** required assessment-handle searches completed. The assessment result is
**0 live / 2 pending / 0 new**, and prior-LCS comparison finds **zero eligible question-handle
reuses / two new-to-eligible tested concepts**. The two prompt occurrences remain separate;
the group-list request is not collapsed into the single-muscle insertion MCQ. No answer is
inferred from the teaching slides or the external pending records, so the source contributes
zero printed keys.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 43 | Family 43 delta | After Family 43 |
|---|---:|---:|---:|
| Eligible observed question records | 451 | +2 | 453 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 207 | +2 | 209 |
| Question live / pending / new | 9 / 52 / 146 | +0 / +2 / +0 | 9 / 54 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `41 = 2 + 3 + 5 + 4 + 4 + 8 + 4 + 5 + 6`,
`2 prompts = 2 source-distinct handles`, `451 + 2 = 453`, `242 + 0 = 242`, `207 + 2 =
209`, `9 + 54 + 146 = 209`, `251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0 = 91`, and
`55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-42
remainder leaves **33 rank-4/rank-5 path instances / 31 unique hashes**. The Family-42
method was reproduced first: its 34/32 row sets recomputed to
`e10573b0ff42f8932291623aaf7563ff9e396293eb5436a6a69cb869133c17cf` and
`8bf87ec9940bf36a83da98958c336cc3be8b4c30e349e1d16ee95becd454c7b8`.
For the exact post-Family-43 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`6687210268877d3424e4c0383917933fcbfd4978d9fb7579467028bb49589c44`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`560c0b9ac7d77a94d3429f52c7dc9c2d472ff0f2b09317d53dbc4b2226689902`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_59e94a40a806e17e000e`, `Anatomy Lecture Posterior Comp. Of The Leg.pdf` (3,728,172
bytes; 55 native-text pages; SHA-256
`59e94a40a806e17e000e2eace648f1b13e9730cf2f4e49b6d579c7e23397f58e`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 4 - Anterolateral & Posterior Compartment of Leg/`.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 44 — Tier-4 posterior-leg lecture with two prior-scope formative prompts

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_59e94a40a806e17e000e` |
| File / SHA-256 | `Anatomy Lecture Posterior Comp. Of The Leg.pdf` / `59e94a40a806e17e000e2eace648f1b13e9730cf2f4e49b6d579c7e23397f58e` |
| File boundary | 3,728,172 bytes · unencrypted PDF · 55 physical native-text pages · 720 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 4 - Anterolateral & Posterior Compartment of Leg/Anatomy Lecture Posterior Comp. Of The Leg.pdf` |
| Visible provenance | p. 1 prints `Dr. Eman El Sawaf`, `Anatomy & Embryology Department`, `Faculty Of Medicine`, and `Capital University (Formerly Helwan)`; PDF author is `User` and creator/producer is Microsoft PowerPoint 2019 |
| Authority finding | Manifest/path-placed local tier-4 teaching evidence with two ordinary formative prompts. It is not a sitting paper, station sheet, practical response form, question bank or official answer key. |

The SHA-256, byte size and 55-page boundary were recomputed and match the assigned source.
All 55 pages were rendered at 140 dpi and read against the native text layer. Page 1 is the
provenance slide, p. 2 is the module/anatomy/lower-limb title, pp. 3–4 orient the lower-limb
bones and regions, pp. 5–6 state the objectives and contents, pp. 7–26 teach the fascia,
compartments and superficial posterior-leg muscles, p. 27 is an `Interactive Question`, pp.
28–52 teach the deep posterior-leg muscles and summary, p. 53 is a second `Interactive
Question`, p. 54 gives references and p. 55 closes with `Thank You`.

Pages 27 and 53 are genuine ordinary formative prompts because they explicitly request or
offer a student answer. Neither page prints a correctness mark, selected option, answer
reveal or explanatory key. The declarative muscle-action slides elsewhere in the lecture are
simultaneous teaching evidence, not printed assessment keys.

### Complete teaching-slide and assessment-boundary inventory

The lecture's figures, muscle montages, arrows and labelled diagrams remain parts of tier-4
theoretical teaching compositions; they are not promoted into the tier-5 practical
plate/mapping ledger.

| Physical pages | Source-first instructional composition or actual prompt | Teaching occurrences / assessment disposition |
|---:|---|---:|
| 3–4 | lower-limb bones, joints and named regions orientation | 2 teaching compositions |
| 7–10 | leg fascia, septa, compartments and superficial/deep posterior-muscle membership | 4 teaching compositions |
| 11–14 | superficial-group framework and position/relations of gastrocnemius, plantaris and soleus | 4 teaching compositions |
| 15–21 | combined and individual superficial-muscle origins and insertions | 7 teaching compositions |
| 22–26 | tibial supply, actions, walking/standing/muscle-pump functions and consolidated superficial-muscle table | 5 teaching compositions |
| 27 | `Mention the action of the soleus muscle.` | 1 ordinary open prompt; no printed key |
| 28–32 | deep-group framework and position/relations of popliteus, flexor hallucis longus, flexor digitorum longus and tibialis posterior | 5 teaching compositions |
| 33–36 | combined deep-muscle origins and insertions | 4 teaching compositions |
| 37–41 | individual deep-muscle attachments plus tibialis-posterior tendon course behind the medial malleolus | 5 teaching compositions |
| 42–52 | tibial supply; popliteus unlocking/flexion; toe-flexion, inversion, plantar-flexion and medial-arch actions; consolidated deep-muscle table and summary | 11 teaching compositions |
| 53 | `Which one of the following is the action of tibialis posterior muscle?` with options knee flexion, ankle plantar flexion, big-toe flexion and transverse-arch support | 1 ordinary MCQ prompt; all four options visibly unmarked; no printed key |
| **Total** | **tier-4 content plus actual prompts** | **47 teaching compositions / 2 ordinary prompts / 0 printed keys** |

The **47 content-slide occurrences are 47 source-distinct teaching compositions**. Pages
44/45, 47/48 and 49/50 repeat action wording while changing the complete image or layout,
so none is an exact copy collapse. SHA-256 comparison of all 55 rendered complete pages
found no exact full-page duplicate. The two prompt pages remain separate evidence
occurrences. The full boundary is therefore **47 teaching compositions / 2 ordinary
questions / 0 practical or station prompts / 0 printed assessment keys / 0 assessment
residues**. As theoretical material, its figures add **0 practical plates, 0 practical label
mappings and 0 practical residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 47 compositions consolidate to eleven source-level theoretical teaching scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `lower-limb-bones-and-regions-orientation` · pp. 3–4 | lower limb major bones; lower limb regions; femur tibia fibula patella; gluteal thigh leg foot regions | no direct live/pending complete-scope hit; exact accepted Families 41 and 43 handle — prior LCS reuse |
| `leg-fascia-and-compartments` · pp. 7–8 | leg superficial deep fascia; leg intermuscular septa; leg compartments anterior posterior lateral; leg interosseous membrane compartments | no direct live/pending complete-scope hit and no same-scope accepted prior-LCS handle — new theoretical teaching |
| `posterior-leg-superficial-and-deep-groups` · pp. 9–10 | posterior leg superficial deep groups; posterior compartment leg muscles classification; gastrocnemius soleus plantaris deep flexors; posterior leg tibial nerve supply | no direct live/pending complete-scope hit; exact accepted Family-34 handle — prior LCS reuse |
| `gastrocnemius-oina` · pp. 11–26 | gastrocnemius origin insertion nerve supply; gastrocnemius OINA; gastrocnemius femoral condyles calcaneal tendon; gastrocnemius plantarflexion knee flexion | no direct live/pending complete-scope hit; exact accepted Families 1 and 34 handle — prior LCS reuse |
| `plantaris-oina` · pp. 11–26 | plantaris origin insertion nerve supply; plantaris OINA; plantaris lateral supracondylar line calcaneus; plantaris plantarflexion knee flexion | external action mentions are narrower than full OINA; exact accepted Family-34 handle — prior LCS reuse |
| `soleus-oina` · pp. 11–26 | soleus origin insertion nerve supply; soleus OINA; soleus tibia fibula calcaneal tendon; soleus plantarflexion postural | group-level pending movement evidence is narrower than full OINA; exact accepted Families 1 and 34 handle — prior LCS reuse |
| `popliteus-oina` · pp. 28–45 | popliteus origin insertion nerve supply; popliteus OINA; popliteus lateral femoral condyle posterior tibia; popliteus unlocking knee | pending AU material owns the unlocking action but not the complete OINA scope; exact accepted Families 1 and 34 handle — prior LCS reuse |
| `flexor-hallucis-longus-oina` · pp. 28–51 | flexor hallucis longus origin insertion nerve supply; FHL muscle OINA; flexor hallucis longus fibula distal phalanx; flexor hallucis longus plantarflexion inversion | group-level pending movement evidence is narrower than full OINA; exact accepted Families 1 and 34 handle — prior LCS reuse |
| `flexor-digitorum-longus-oina` · pp. 28–51 | flexor digitorum longus origin insertion nerve supply; FDL muscle OINA; flexor digitorum longus tibia distal phalanges; flexor digitorum longus plantarflexion inversion | group-level pending movement evidence is narrower than full OINA; exact accepted Families 1 and 34 handle — prior LCS reuse |
| `tibialis-posterior-oina` · pp. 28–51 | tibialis posterior origin insertion nerve supply; tibialis posterior OINA; tibialis posterior navicular tarsal bones; tibialis posterior plantarflexion inversion | pending movement/arch-support components do not own full OINA; exact accepted Families 1 and 34 handle — prior LCS reuse |
| `tibialis-posterior-tendon-course` · p. 41 | tibialis posterior tendon course; tibialis posterior behind medial malleolus; tibialis posterior medial to FDL; tibialis posterior tendon groove | no direct live/pending complete-scope hit; accepted OINA handles do not own this separate malleolar course relation — new theoretical teaching |

All **11 × 4 = 44** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete-scope level, the direct external result is **0 live / 0 pending / 11 new**; exact
accepted-prior comparison prevents nine repeated module additions, leaving **nine prior-LCS
reuses / two new theoretical teaching scopes**. Declarative teaching scopes do not enter the
eligible tested-concept count, and no theoretical scope enters the practical-teaching-scope
counter.

### Assessment handles, searches and prior-LCS adjudication

| Source page / eligible handle | Source prompt inventory | Four required `find-existing` queries | External / prior-LCS result |
|---|---|---|---|
| 27 · `soleus-actions` | open request to state the action of soleus; no answer line or printed key | soleus action; soleus plantarflexion; soleus posture standing; soleus muscle pump | external plantar-flexion/postural mentions do not own the complete action range; eligible Family-1 `soleus-oina` already owns the action component — prior eligible reuse with inherited new disposition |
| 53 · `tibialis-posterior-plantarflexion` | one four-option MCQ; all options unmarked and no printed key | tibialis posterior action; tibialis posterior plantar flexion; tibialis posterior inversion; tibialis posterior arch support | pending 103-BMS movement material owns ankle plantar flexion, while eligible Family-1 `tibialis-posterior-oina` already owns the action component — prior eligible reuse with inherited new disposition |

All **2 × 4 = 8** required assessment-handle searches completed. The raw current external
result is **0 live / 1 pending / 1 new**; accepted prior-eligible comparison collapses both
source handles to existing Family-1 tested concepts, leaving **two prior eligible reuses /
zero net module concepts**. The source still contributes two observed prompt occurrences.
No answer is inferred from the lecture's declarative slides, the external pending material
or the prior OINA prompts, so it contributes zero printed keys.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 44 | Family 44 delta | After Family 44 |
|---|---:|---:|---:|
| Eligible observed question records | 453 | +2 | 455 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 209 | +0 | 209 |
| Question live / pending / new | 9 / 54 / 146 | +0 / +0 / +0 | 9 / 54 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `47 = 2 + 4 + 4 + 7 + 5 + 5 + 4 + 5 + 11`,
`2 prompts = 2 source-distinct handles`, `2 prior eligible reuses = 0 net concepts`, `453 +
2 = 455`, `242 + 0 = 242`, `209 + 0 = 209`, `9 + 54 + 146 = 209`, `251 + 0 = 251`,
`1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-43
remainder leaves **32 rank-4/rank-5 path instances / 30 unique hashes**. The Family-43
method was reproduced first: its 33/31 row sets recomputed to
`6687210268877d3424e4c0383917933fcbfd4978d9fb7579467028bb49589c44` and
`560c0b9ac7d77a94d3429f52c7dc9c2d472ff0f2b09317d53dbc4b2226689902`.
For the exact post-Family-44 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`b2c37576487a0a96768f46f4e2212abb50e005012fead6bbe298f209542b38bb`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`33a8e100e59cb0bf9d3ec4f33ee4f3b414161b25a61be2d2a5e617fdb3fc0234`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_3c99184681f4248eba19`, `Nerves_and_Vessels_of_Lower_Limb_Dr_Sarah_بعد_التعديل.pdf`
(1,975,984 bytes; 19 native-text pages; SHA-256
`3c99184681f4248eba19ac92b0b2105dd5762abfacd64c1db88409b6cf1ca78e`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 5 - Blood Vessels & Nerves of Lower Limb/`.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 45 — Tier-4 lower-limb nerves-and-vessels teaching-only lecture gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_3c99184681f4248eba19` |
| File / SHA-256 | `Nerves_and_Vessels_of_Lower_Limb_Dr_Sarah_بعد_التعديل.pdf` / `3c99184681f4248eba19ac92b0b2105dd5762abfacd64c1db88409b6cf1ca78e` |
| File boundary | 1,975,984 bytes · unencrypted PDF · 19 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 5 - Blood Vessels & Nerves of Lower Limb/Nerves_and_Vessels_of_Lower_Limb_Dr_Sarah_بعد_التعديل.pdf` |
| Visible provenance | p. 1 prints `Nerves and Vessels of Lower Limb`, `Dr. Sarah Arakib` and `MD Anatomy and Embryology`; PDF author is `Lenovo` and creator/producer is Microsoft PowerPoint for Microsoft 365 |
| Authority finding | Manifest/path-placed local tier-4 teaching evidence. It is not a sitting paper, station sheet, practical response form, question bank or official answer key. |

The SHA-256, byte size and 19-page boundary were recomputed and match the assigned source.
All 19 pages were rendered at 160 dpi and read against the native text layer. Page 1 is the
title/provenance slide, pp. 2–4 teach the posterior tibial artery, pp. 5–7 teach the anterior
tibial artery, pp. 8–11 teach the tibial nerve from the popliteal fossa through the leg, pp.
12–13 teach the common fibular nerve, pp. 14–15 teach the superficial fibular nerve, pp.
16–17 teach the deep fibular nerve, p. 18 teaches common-fibular and tibial nerve injury
patterns, and p. 19 is a photographic motivational closing slide.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. Every anatomical heading, sentence, label, coloured circle and
arrow on pp. 2–18 is simultaneous declarative teaching. No page contains an instruction to
identify a structure, interrogative stem, option set, response field, answer blank, mark
allocation, correctness convention or answer reveal.

### Complete teaching-slide and assessment-boundary inventory

The lecture's vessel/nerve figures, course diagrams, skin maps and injury photographs remain
parts of tier-4 theoretical teaching compositions; they are not promoted into the tier-5
practical plate/mapping ledger.

| Physical pages | Source-first instructional compositions | Slide occurrences |
|---:|---|---:|
| 2–4 | posterior-tibial-artery origin, course, termination and seven branch groups | 3 |
| 5–7 | anterior-tibial-artery origin, course, dorsalis-pedis continuation and recurrent/muscular/malleolar branches | 3 |
| 8–11 | tibial-nerve origin and popliteal course, continuation through the posterior leg, muscular/cutaneous/articular branches and plantar terminal divisions | 4 |
| 12–13 | common-fibular-nerve origin, popliteal course, neck-of-fibula termination and cutaneous/articular/terminal branches | 2 |
| 14–15 | superficial-fibular-nerve origin, course, termination, muscular branches and cutaneous territory/exceptions | 2 |
| 16–17 | deep-fibular-nerve origin, anterior-compartment course, foot termination, muscular supply and first-web-space territory | 2 |
| 18 | common-fibular foot-drop and tibial-nerve motor-loss patterns | 1 |
| **Total** | **tier-4 instructional compositions** | **17** |

The **17 content-slide occurrences are 17 source-distinct teaching compositions**.
SHA-256 comparison of all 19 rendered complete pages found no exact full-page duplicate to
collapse. The source boundary is therefore **17 teaching compositions / 0 ordinary
questions / 0 practical or station prompts / 0 printed assessment keys / 0 assessment
residues**. As theoretical material, its figures add **0 practical plates, 0 practical label
mappings and 0 practical residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 17 compositions consolidate to seven source-level theoretical teaching scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `posterior-tibial-artery` · pp. 2–4 | posterior tibial artery origin course termination branches; posterior tibial artery popliteal terminal branch; posterior tibial artery medial lateral plantar; posterior tibial artery fibular calcaneal branches | pending 103-BMS material owns the complete vessel scope; exact accepted Families 1 and 34 artery handle — prior LCS reuse with inherited pending overlap |
| `anterior-tibial-artery` · pp. 5–7 | anterior tibial artery origin course termination branches; anterior tibial artery interosseous membrane; anterior tibial artery dorsalis pedis continuation; anterior tibial artery malleolar branches | live records own the vessel's compartment entry and dorsalis-pedis continuation; exact accepted Families 1 and 34 handle — prior LCS reuse with inherited live overlap |
| `tibial-nerve-origin-course-termination-and-branches` · pp. 8–11 | tibial nerve origin course termination branches; medial popliteal nerve popliteal fossa; posterior tibial nerve medial lateral plantar; tibial nerve muscular sural calcaneal branches | pending 103-BMS material can absorb the continuous nerve/branch scope; accepted Family-33 `tibial-nerve-origin-and-termination` is narrower and does not own the complete branch inventory — new theoretical teaching |
| `common-fibular-nerve-origin-termination-and-branches` · pp. 12–13 | common fibular nerve origin course termination branches; common peroneal nerve popliteal fossa; common fibular nerve neck fibula; common peroneal superficial deep branches | pending 103-BMS material overlaps the full nerve scope; exact accepted Families 33 and 34 handle — prior LCS reuse |
| `superficial-fibular-nerve-course-and-distribution` · pp. 14–15 | superficial fibular nerve origin course termination branches; superficial peroneal nerve fibularis longus brevis; superficial fibular nerve dorsum foot cutaneous; superficial peroneal nerve sensory exceptions | pending 103-BMS material owns the motor/cutaneous distribution; no accepted prior-LCS handle owns this individual nerve's origin, course, termination and distribution together — new theoretical teaching |
| `deep-fibular-nerve-course-and-distribution` · pp. 16–17 | deep fibular nerve origin course termination branches; deep peroneal nerve anterior tibial artery; deep fibular nerve anterior compartment muscles; deep peroneal nerve first web space | pending AU material owns the muscle and first-web-space distribution; accepted Family-20 terminal-branch scope plus Family-34 origin/termination and anterior-compartment scopes jointly own the present evidence — prior LCS reuse |
| `common-fibular-and-tibial-nerve-injury-patterns` · p. 18 | common fibular tibial nerve injuries; common peroneal nerve foot drop; tibial nerve injury loss plantarflexion; equinovarus calcaneovalgus nerve injury | pending 103-BMS material owns both motor-loss patterns; exact components of accepted Family-1 `major-lower-limb-nerve-injury-deformities` — prior LCS reuse |

All **7 × 4 = 28** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete-scope level, the direct external result is **1 live / 6 pending / 0 new**; exact
accepted-prior comparison prevents five repeated module additions, leaving **five prior-LCS
reuses / two new theoretical teaching scopes**. There is no assessment handle to search.
Declarative teaching scopes do not enter the eligible tested-concept count, and no
theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 45 | Family 45 delta | After Family 45 |
|---|---:|---:|---:|
| Eligible observed question records | 455 | +0 | 455 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 209 | +0 | 209 |
| Question live / pending / new | 9 / 54 / 146 | +0 / +0 / +0 | 9 / 54 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `17 = 3 + 3 + 4 + 2 + 2 + 2 + 1`, `0
prompts = 0 source handles`, `455 + 0 = 455`, `242 + 0 = 242`, `209 + 0 = 209`, `9 + 54
+ 146 = 209`, `251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-44
remainder leaves **31 rank-4/rank-5 path instances / 29 unique hashes**. The Family-44
method was reproduced first: its 32/30 row sets recomputed to
`b2c37576487a0a96768f46f4e2212abb50e005012fead6bbe298f209542b38bb` and
`33a8e100e59cb0bf9d3ec4f33ee4f3b414161b25a61be2d2a5e617fdb3fc0234`.
For the exact post-Family-45 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`905d7cac60a1797f845dcccfd2a941707acbb3fa7bd87c1746802187cf699ce3`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`ce58b03e3071ca9bd48b8ed2815fc4e7d370f48ac68cb8ef74cb3c2265513625`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_348ca6fdcbd882b2982c`, `Anatomy Lecture Hip_ Knee _ ankle Joints.pdf` (8,214,026
bytes; 90 native-text pages; SHA-256
`348ca6fdcbd882b2982c9a73302712b92c23736d295778d2eb32172649990265`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 6 - Hip, Knee & Ankle Joints/`. Broader LCS-103 S1
remains incomplete. No download, ID, content record, catalogue update, import or source copy
was created.

## Family 46 — Tier-4 hip, knee and ankle-joints lecture with three unkeyed prompts

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_348ca6fdcbd882b2982c` |
| File / SHA-256 | `Anatomy Lecture Hip_ Knee _ ankle Joints.pdf` / `348ca6fdcbd882b2982c9a73302712b92c23736d295778d2eb32172649990265` |
| File boundary | 8,214,026 bytes · unencrypted PDF · 90 physical native-text pages · 720 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 6 - Hip, Knee & Ankle Joints/Anatomy Lecture Hip_ Knee _ ankle Joints.pdf` |
| Visible provenance | p. 1 prints `Ass. Prof. Dr. Eman El Sawaf`, `Anatomy & Embryology Department`, `Faculty Of Medicine`, and `Capital University (Formerly Helwan)`; PDF author is `User` and creator/producer is Microsoft PowerPoint 2019 |
| Authority finding | Manifest/path-placed local tier-4 teaching evidence with three ordinary formative prompts. It is not a sitting paper, station sheet, practical response form, question bank or official answer key. |

The SHA-256, byte size and 90-page boundary were recomputed and match the assigned source.
All 90 pages were rendered at 130 dpi and read against the native text layer. Page 1 is the
provenance slide, p. 2 is the module/anatomy/lower-limb title, pp. 3–4 orient the lower-limb
bones and regions, pp. 5–6 state the objectives and contents, p. 7 is the hip-joint divider,
pp. 8–29 teach the hip joint, p. 30 is an `Interactive Question`, p. 31 is the knee-joint
divider, pp. 32–73 teach the knee joint, p. 74 is an `Interactive Question`, p. 75 is the
ankle-joint divider, pp. 76–87 teach the ankle joint and summary, p. 88 is an `Interactive
Question`, p. 89 gives references and p. 90 closes with `Thank You`.

Pages 30, 74 and 88 are genuine ordinary formative prompts because they explicitly request
or offer a student answer. None prints a correctness mark, selected option, answer reveal or
explanatory key. The earlier declarative joint slides remain simultaneous teaching evidence;
they are not silently promoted into printed keys.

### Complete teaching-slide and assessment-boundary inventory

The lecture's joint figures, labelled diagrams, movement photographs and attachment plates
remain parts of tier-4 theoretical teaching compositions; they are not promoted into the
tier-5 practical plate/mapping ledger.

| Physical pages | Source-first instructional composition or actual prompt | Teaching occurrences / assessment disposition |
|---:|---|---:|
| 3–4 | lower-limb bones, joints and named regions orientation | 2 teaching compositions |
| 8–12 | hip type, articular surfaces, cartilage, acetabular labrum and transverse ligament | 5 teaching compositions |
| 13–17 | hip fibrous-capsule attachments and synovial membrane | 5 teaching compositions |
| 18–24 | ligament of femoral head and iliofemoral, pubofemoral and ischiofemoral ligaments | 7 teaching compositions |
| 25–27 | hip arterial and nerve supply | 3 teaching compositions |
| 28–29 | hip movement geometry and movement classes | 2 teaching compositions |
| 30 | `What are the muscles acting on the hip joint?` beside flexion, extension, adduction, abduction and medial/lateral rotation category labels | 1 ordinary open prompt; category labels are not muscle answers; no printed key |
| 32–35 | knee type and femorotibial/patellofemoral articular surfaces | 4 teaching compositions |
| 36–44 | meniscal structure, attachments, functions, comparison and popliteus relations | 9 teaching compositions |
| 45–54 | knee fibrous capsule and synovial membrane, suprapatellar bursa, fat pad and cruciate coverings | 10 teaching compositions |
| 55–56 | knee bursa definition and six-site inventory | 2 teaching compositions |
| 57–60 | knee ligament overview plus patellar and collateral ligaments | 4 teaching compositions |
| 61–69 | cruciate-ligament attachments, directions, tension and stability functions | 9 teaching compositions |
| 70–73 | transverse/oblique/arcuate ligaments, nerve supply, arterial anastomosis and knee movements | 4 teaching compositions |
| 74 | `Mention the attachments of the anterior cruciate ligament?` | 1 ordinary open prompt; no printed key |
| 76–79 | ankle type, articular surfaces, capsule/synovium and dorsiflexion stability | 4 teaching compositions |
| 80–83 | tibiofibular, medial/deltoid and lateral ankle ligaments | 4 teaching compositions |
| 84–87 | ankle arterial supply, nerve supply, movements and three-joint summary | 4 teaching compositions |
| 88 | `What is the variety of the ankle joint?` with options hinge, ellipsoid, saddle and pivot | 1 ordinary MCQ prompt; all four options visibly unmarked; no printed key |
| **Total** | **tier-4 content plus actual prompts** | **78 teaching compositions / 3 ordinary prompts / 0 printed keys** |

The **78 content-slide occurrences are 78 source-distinct teaching compositions**. Pages
11/12, 25/26, 62/63 and 65/66 repeat text while changing the complete image, annotation or
layout, so none is an exact copy collapse. SHA-256 comparison of all 90 rendered complete
pages found no exact full-page duplicate. The three prompt pages remain separate evidence
occurrences. The full boundary is therefore **78 teaching compositions / 3 ordinary
questions / 0 practical or station prompts / 0 printed assessment keys / 0 assessment
residues**. As theoretical material, its figures add **0 practical plates, 0 practical label
mappings and 0 practical residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 78 compositions consolidate to twenty-five source-level theoretical teaching scopes.
Each row received the four semicolon-separated query forms shown.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `lower-limb-bones-and-regions-orientation` · pp. 3–4 | lower limb major bones; lower limb regions; femur tibia fibula patella; gluteal thigh leg foot regions | exact accepted Families 41 and 43 handle — prior LCS reuse |
| `hip-joint-classification` · p. 8 | hip joint type; ball and socket hip; synovial hip joint; multiaxial hip | pending 103-BMS classification; exact accepted Family-20 handle — prior LCS reuse |
| `hip-joint-articular-surfaces-and-labrum` · pp. 9–12 | hip joint articular surfaces; femoral head lunate acetabulum; acetabular labrum transverse ligament; acetabular fossa fovea cartilage | pending component evidence; no accepted prior-LCS complete handle — new theoretical teaching |
| `hip-joint-capsule-and-synovium` · pp. 13–17 | hip joint capsule attachments; hip synovial membrane; hip capsule intertrochanteric line; synovium femoral neck ligament head | pending component evidence; no accepted prior-LCS complete handle — new theoretical teaching |
| `hip-joint-ligaments` · pp. 18–24 | iliofemoral ligament; pubofemoral ligament; ischiofemoral ligament; ligament head femur | pending AU/103-BMS material; exact accepted Families 1 and 20 handle — prior LCS reuse |
| `hip-joint-blood-supply` · pp. 25–26 | hip joint blood supply; arterial supply hip joint; circumflex femoral obturator hip; gluteal perforating arteries hip | pending AU/103-BMS material; exact accepted Family-20 handle — prior LCS reuse |
| `hip-joint-nerve-supply` · p. 27 | hip joint nerve supply; articular nerves hip; femoral obturator superior gluteal hip; nerve quadratus femoris hip joint | no accepted prior-LCS complete handle — new theoretical teaching |
| `hip-joint-movements` · pp. 28–29 | hip joint movements; hip flexion extension abduction adduction; hip circumduction rotation; muscles acting hip joint | pending movement material is external; no accepted prior-LCS complete joint-movement handle — new theoretical teaching |
| `knee-joint-type-and-articular-surfaces` · pp. 32–35 | knee joint type articular surfaces; modified hinge bicondylar knee; femoral tibial condyles patella articulation; knee hyaline articular cartilage | pending joint-overview components; no accepted prior-LCS complete handle — new theoretical teaching |
| `knee-menisci` · pp. 36–44 | medial lateral knee menisci; knee menisci attachments functions; meniscofemoral meniscotibial compartments; popliteus lateral meniscus relation | pending knee-overview overlap; exact accepted Family-1 handle — prior LCS reuse |
| `knee-joint-capsule-and-synovium` · pp. 45–54 | knee joint capsule attachments; knee synovial membrane cruciate ligaments; suprapatellar bursa synovium; infrapatellar fat pad synovial membrane | pending component evidence; no accepted prior-LCS complete handle — new theoretical teaching |
| `knee-bursae` · pp. 55–56 | knee bursae; bursae around knee; prepatellar infrapatellar bursa; subpopliteal suprapatellar bursa | exact accepted Family-1 handle — prior LCS reuse |
| `patellar-ligament` · pp. 57–58 | patellar ligament attachments; ligamentum patellae; quadriceps tendon tibial tuberosity; patellar ligament knee | pending knee-capsule material is narrower; no accepted prior-LCS complete handle — new theoretical teaching |
| `collateral-ligaments-knee` · pp. 57, 59–60 | fibular collateral ligament knee; tibial collateral ligament knee; lateral medial collateral attachments; collateral ligament meniscus relations | pending knee-overview overlap; exact accepted Family-1 handle — prior LCS reuse |
| `cruciate-ligaments` · pp. 57, 61–69 | anterior posterior cruciate ligaments; ACL PCL attachments; cruciate ligament directions functions; cruciate extension flexion taut | pending 103-BMS knee material; exact accepted Family-1 handle — prior LCS reuse |
| `secondary-knee-ligaments` · p. 70 | transverse ligament knee; oblique popliteal ligament; arcuate popliteal ligament; secondary knee ligaments | component hits do not own the three-ligament set; no accepted prior-LCS complete handle — new theoretical teaching |
| `knee-joint-nerve-supply` · p. 71 | knee joint nerve supply; articular nerves knee; femoral obturator tibial knee; common fibular nerve knee joint | no accepted prior-LCS complete handle — new theoretical teaching |
| `knee-joint-blood-supply` · p. 72 | knee joint blood supply; anastomosis around knee; genicular arteries knee joint; circumflex fibular recurrent tibial knee | pending artery records are components, not the complete joint supply — new theoretical teaching |
| `knee-joint-movements` · p. 73 | knee joint movements; knee flexion extension rotation; unlocking knee joint; medial lateral rotation knee | pending popliteus material owns unlocking only; no accepted prior-LCS complete movement handle — new theoretical teaching |
| `ankle-joint-type-and-articular-surfaces` · pp. 76–77 | ankle joint type articular surfaces; talocrural synovial hinge; tibia malleoli trochlea talus; ankle joint variety | pending 103-BMS joint material; no accepted prior-LCS complete handle — new theoretical teaching |
| `ankle-joint-capsule-synovium-and-stability` · pp. 78–79 | ankle joint capsule synovial membrane; ankle stability dorsiflexion; talocrural capsule; ankle bones fit tighter dorsiflexed | no accepted prior-LCS complete handle — new theoretical teaching |
| `ankle-joint-ligaments` · pp. 80–83 | ankle joint ligaments; deltoid ligament ankle; lateral ligament ankle; anterior posterior inferior tibiofibular | pending ankle-overview components; no accepted prior-LCS complete handle — new theoretical teaching |
| `ankle-joint-blood-supply` · p. 84 | ankle joint blood supply; arterial supply ankle; malleolar anastomosis; tibial fibular arteries ankle joint | no accepted prior-LCS complete handle — new theoretical teaching |
| `ankle-joint-nerve-supply` · p. 85 | ankle joint nerve supply; innervation ankle joint; tibial fibular saphenous sural ankle; five nerves ankle joint | no accepted prior-LCS complete handle — new theoretical teaching |
| `ankle-joint-movements` · p. 86 | ankle joint movements; dorsiflexion plantarflexion ankle; talocrural movements; ankle hinge movement | pending movement material; accepted inversion/eversion handles concern other joints and do not own this scope — new theoretical teaching |

All **25 × 4 = 100** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete-scope level, the direct external result is **0 live / 19 pending / 6 new**; exact
accepted-prior comparison prevents eight repeated module additions, leaving **eight
prior-LCS reuses / seventeen new theoretical teaching scopes**. Declarative teaching scopes
do not enter the eligible tested-concept count, and no theoretical scope enters the
practical-teaching-scope counter.

### Assessment handles, searches and prior-LCS adjudication

| Source page / eligible handle | Source prompt inventory | Four required `find-existing` queries | External / prior-LCS result |
|---|---|---|---|
| 30 · `hip-muscles-by-movement` | open request for muscles acting across the listed hip-movement classes; no muscle answers or printed key | muscles acting hip joint; hip flexors extensors abductors adductors; hip medial lateral rotators; hip muscle groups movements | pending 103-BMS/AU movement material can absorb the composite; prior individual OINA and hip-adductor handles do not own all six movement groups — pending, new-to-eligible |
| 74 · `anterior-cruciate-ligament-attachments` | open ACL-attachment request; no answer line or printed key | anterior cruciate ligament attachments; ACL tibial attachment; ACL femoral attachment; anterior cruciate intercondylar area lateral condyle | pending knee material owns the attachment pair; exact component of eligible Family-1 `cruciate-ligaments` — prior eligible reuse with inherited new disposition |
| 88 · `ankle-joint-hinge-variety` | four-option variety MCQ; all options unmarked and no printed key | ankle joint variety; ankle hinge joint; talocrural hinge variety; what type is ankle joint | pending 103-BMS ankle-joint material explicitly owns the synovial-hinge classification; no earlier eligible LCS prompt owns ankle variety — pending, new-to-eligible |

All **3 × 4 = 12** required assessment-handle searches completed. The raw current external
result is **0 live / 3 pending / 0 new**; accepted prior-eligible comparison collapses the
ACL handle, leaving **one prior eligible reuse / two new pending module concepts**. The
source contributes three observed prompt occurrences and zero printed keys; no answer is
inferred from adjacent teaching slides, external material or the prior cruciate prompt.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 46 | Family 46 delta | After Family 46 |
|---|---:|---:|---:|
| Eligible observed question records | 455 | +3 | 458 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 209 | +2 | 211 |
| Question live / pending / new | 9 / 54 / 146 | +0 / +2 / +0 | 9 / 56 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `78 = 2 + 5 + 5 + 7 + 3 + 2 + 4 + 9 + 10 +
2 + 4 + 9 + 4 + 4 + 4 + 4`, `3 prompts = 3 source-distinct handles`, `1 prior eligible reuse +
2 new-to-eligible = 3 handles`, `455 + 3 = 458`, `242 + 0 = 242`, `209 + 2 = 211`, `9 +
56 + 146 = 211`, `251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 =
55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-45
remainder leaves **30 rank-4/rank-5 path instances / 28 unique hashes**. The Family-45
method was reproduced first: its 31/29 row sets recomputed to
`905d7cac60a1797f845dcccfd2a941707acbb3fa7bd87c1746802187cf699ce3` and
`ce58b03e3071ca9bd48b8ed2815fc4e7d370f48ac68cb8ef74cb3c2265513625`.
For the exact post-Family-46 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`07baa4cee486ca13352a662bcb85745525027ecb37b91eee7f3d7ecd3e0978e7`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`af858e27a73011813da686f145d3f3ca27a0fdf8bf566414849f05d94fd68252`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_24071cf85eb1a9ea9c62`, `Development Limbs.pdf` (320,989 bytes; 7 native-text pages;
SHA-256 `24071cf85eb1a9ea9c62b2019439c2e0822f1a4686815abf70781ab4ae828018`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 7 - Development of Limbs & Anatomy of Foot/`.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 47 — Tier-4 limb-development teaching-only lecture gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_24071cf85eb1a9ea9c62` |
| File / SHA-256 | `Development Limbs.pdf` / `24071cf85eb1a9ea9c62b2019439c2e0822f1a4686815abf70781ab4ae828018` |
| File boundary | 320,989 bytes · unencrypted PDF · 7 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 7 - Development of Limbs & Anatomy of Foot/Development Limbs.pdf` |
| Visible provenance | p. 1 prints `Development of Limbs`, `Dr. Sarah Arakib` and `MD Anatomy and Embryology`; PDF author is `Lenovo` and creator/producer is Microsoft PowerPoint for Microsoft 365 |
| Authority finding | Manifest/path-placed local tier-4 embryology teaching evidence. It is not a sitting paper, station sheet, practical response form, question bank or official answer key. |

The SHA-256, byte size and seven-page boundary were recomputed and match the assigned
source. All seven pages were rendered at 180 dpi and read against the native text layer.
Page 1 is the title/provenance slide, pp. 2–3 teach limb-bud formation and early patterning,
p. 4 teaches limb rotation, p. 5 teaches limb ossification, p. 6 teaches congenital limb
anomalies, and p. 7 closes with `Thank You`.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. Every sentence, heading, photograph and diagram is simultaneous
declarative teaching. No page contains an instruction to identify a structure, interrogative
stem, option set, response field, answer blank, mark allocation, correctness convention or
answer reveal.

### Complete teaching-slide and assessment-boundary inventory

| Physical page | Source-first instructional composition | Teaching occurrences / unresolved residue |
|---:|---|---:|
| 2 | fourth-week limb buds, tissue origins, somite-derived muscle, ectoderm and apical ectodermal ridge | 1 teaching composition; two opaque blue overprints mask embedded diagram labels |
| 3 | hand/foot plates, limb constrictions, digit separation and condensation→chondrification→ossification sequence | 1 teaching composition |
| 4 | seventh-week upper-limb lateral and lower-limb medial rotation | 1 teaching composition |
| 5 | primary/secondary ossification-centre timing and diaphysis/epiphysis progression | 1 teaching composition |
| 6 | brachydactyly, syndactyly, polydactyly and cleft-foot definitions | 1 teaching composition |
| **Total** | **tier-4 instructional compositions** | **5 teaching compositions / 2 unresolved teaching-only figure labels** |

The **five content-slide occurrences are five source-distinct teaching compositions**.
SHA-256 comparison of all seven rendered complete pages found no exact full-page duplicate
to collapse. The two opaque p. 2 rectangles are retained as unresolved embedded teaching
callouts rather than silently reconstructed; because there is no student-facing instruction,
response convention or answer reveal, they are **not ordinary assessment prompts, keys or
assessment residues**, and because the source is theoretical they do not enter the tier-5
practical residue ledger. The source boundary is therefore **5 teaching compositions / 0
ordinary questions / 0 practical or station prompts / 0 printed assessment keys / 0
assessment residues** and adds **0 practical plates, 0 practical label mappings and 0
practical residues**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The five compositions consolidate to six source-level theoretical teaching scopes; p. 2
supports three scopes without being counted three times in the physical-slide total.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `lower-limb-bud-development` · pp. 2–3 | lower limb bud development; limb buds fourth week; forelimb hindlimb outpocketings; limb bud mesenchymal core | pending 103-BMS material owns timing and formation; exact accepted Family-20 handle — prior LCS reuse |
| `lower-limb-muscle-embryology` · p. 2 | lower limb muscle embryology; limb muscles dorsolateral somite; somitic cells migrate limb bud; limb muscle development myotome | pending embryology material owns the somite/myotome origin; exact accepted Family-20 handle — prior LCS reuse |
| `apical-ectodermal-ridge-and-digit-separation` · pp. 2–3 | apical ectodermal ridge; AER limb development; AER digit separation cell death; hand plate footplate constrictions | pending 103-BMS AER material can absorb digit-separation detail; exact accepted Family-20 AER handle — prior LCS reuse |
| `lower-limb-medial-rotation` · p. 4 | lower limb rotation; medial rotation limb bud; limb development rotation; ninety degree medial rotation | pending 103-BMS material owns the 90-degree medial rotation; exact accepted Family-20 handle — prior LCS reuse |
| `limb-ossification-timeline` · pp. 3, 5 | limb ossification timeline; primary ossification centers twelfth week; limb bone chondrification ossification; diaphysis epiphysis birth ossification | no direct live/pending complete-scope hit and no accepted prior-LCS complete handle — new theoretical teaching |
| `limb-reduction-and-digit-anomalies` · p. 6 | brachydactyly syndactyly polydactyly; cleft foot limb anomaly; congenital anomalies limbs digits; short fused extra digits | pending Kasr material owns these digit/cleft-foot anomalies; exact accepted Family-1 handle — prior LCS reuse |

All **6 × 4 = 24** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete-scope level, the direct external result is **0 live / 5 pending / 1 new**; exact
accepted-prior comparison prevents five repeated module additions, leaving **five prior-LCS
reuses / one new theoretical teaching scope**. There is no assessment handle to search.
Declarative teaching scopes do not enter the eligible tested-concept count, and no
theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 47 | Family 47 delta | After Family 47 |
|---|---:|---:|---:|
| Eligible observed question records | 458 | +0 | 458 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 211 | +0 | 211 |
| Question live / pending / new | 9 / 56 / 146 | +0 / +0 / +0 | 9 / 56 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `5 = 1 + 1 + 1 + 1 + 1`, `2 unresolved
teaching labels = 0 assessment prompts + 0 practical residues`, `0 prompts = 0 source
handles`, `458 + 0 = 458`, `242 + 0 = 242`, `211 + 0 = 211`, `9 + 56 + 146 = 211`,
`251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-46
remainder leaves **29 rank-4/rank-5 path instances / 27 unique hashes**. The Family-46
method was reproduced first: its 30/28 row sets recomputed to
`07baa4cee486ca13352a662bcb85745525027ecb37b91eee7f3d7ecd3e0978e7` and
`af858e27a73011813da686f145d3f3ca27a0fdf8bf566414849f05d94fd68252`.
For the exact post-Family-47 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`7e420c23d2b7b34280c93094595460743894aa1c6edaa5f32b8e60104be7b2d0`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`fc765beb04dfd0fdd1bb92c24861cab77a4eb2de6eee1915a30d83573bb6130d`.
The next manifest-order gate is tier-4 Anatomy theoretical source
`src_c7d6856e377ba67b8a0a`, `Foot.pdf` (276,144 bytes; 10 native-text pages; SHA-256
`c7d6856e377ba67b8a0ab10de783f92c4b581514e8a9e7dd75a13991aa4d036a`) under `Year 1/LCS
103/Anatomy/Theoretical/Lower Limb/Lec 7 - Development of Limbs & Anatomy of Foot/`.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 48 — Tier-4 foot-retinacula and skeleton teaching-only lecture gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_c7d6856e377ba67b8a0a` |
| File / SHA-256 | `Foot.pdf` / `c7d6856e377ba67b8a0ab10de783f92c4b581514e8a9e7dd75a13991aa4d036a` |
| File boundary | 276,144 bytes · unencrypted PDF · 10 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Anatomy · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Anatomy/Theoretical/Lower Limb/Lec 7 - Development of Limbs & Anatomy of Foot/Foot.pdf` |
| Visible provenance | p. 1 prints `Anatomy of Foot`, `Dr. Sarah Arakib` and `MD Anatomy and Embryology`; PDF author is `Lenovo` and creator/producer is Microsoft PowerPoint for Microsoft 365 |
| Authority finding | Manifest/path-placed local tier-4 anatomy teaching evidence. It is not a sitting paper, station sheet, practical response form, question bank or official answer key. |

The SHA-256, byte size and ten-page boundary were recomputed and match the assigned source.
All ten pages were rendered at 180 dpi and read against the native text layer. Page 1 is the
title/provenance slide, pp. 2–7 teach the ankle/foot retinacula, p. 8 teaches the bones of the
foot, p. 9 is a labelled foot-joints atlas composition, and p. 10 closes with `Thank You`.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. Every heading, list, mnemonic, label and figure is simultaneous
declarative teaching. No page contains an instruction to identify a structure, interrogative
stem, option set, response field, answer blank, mark allocation, correctness convention,
answer reveal or masked/unresolved callout.

### Complete teaching-slide and assessment-boundary inventory

| Physical page | Source-first instructional composition | Slide occurrences |
|---:|---|---:|
| 2 | ankle/foot retinacula definition, location and tendon-retention function | 1 |
| 3 | superior/inferior extensor-retinaculum form and attachments | 1 |
| 4 | structures deep to the extensor retinacula, medial-to-lateral | 1 |
| 5 | superficial structures crossing the extensor retinacula | 1 |
| 6 | flexor retinaculum/tarsal tunnel and structures deep to it | 1 |
| 7 | superior/inferior fibular retinacula and fibularis-longus/brevis tendons | 1 |
| 8 | foot skeleton: tarsals, metatarsals and phalanges | 1 |
| 9 | labelled atlas of hindfoot, midfoot, forefoot and toe joints in multiple views | 1 |
| **Total** | **tier-4 instructional compositions** | **8** |

The **eight content-slide occurrences are eight source-distinct teaching compositions**.
SHA-256 comparison of all ten rendered complete pages found no exact full-page duplicate to
collapse. Visual inspection found no opaque overprint, blank leader line, masked label or
unresolved rule callout. The source boundary is therefore **8 teaching compositions / 0
ordinary questions / 0 practical or station prompts / 0 printed assessment keys / 0
assessment residues / 0 unresolved teaching callouts**. As theoretical material, its figures
add **0 practical plates, 0 practical label mappings and 0 practical residues** to the
separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The eight compositions consolidate to seven source-level theoretical teaching scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `foot-and-ankle-retinacula-definition-and-function` · p. 2 | retinacula foot ankle definition; ankle retinacula function; deep fascia retinacula tendons; foot retinacula stabilize tendons | no direct live/pending complete-scope hit and no accepted prior-LCS complete handle — new theoretical teaching |
| `extensor-retinaculum-attachments` · p. 3 | superior extensor retinaculum attachments ankle; inferior extensor retinaculum Y shaped; extensor retinaculum medial malleolus; inferior extensor retinaculum plantar aponeurosis | external identification mentions are narrower; accepted Family-37 label evidence owns only identification, not this attachment scope — new theoretical teaching |
| `extensor-retinaculum-contents` · pp. 4–5 | extensor retinaculum contents ankle; deep to extensor retinaculum; anterior ankle contents order; Tom has a very nice dog and pig | exact accepted Family-1 handle; Family-37 identification evidence is an additional prior component — prior LCS reuse |
| `flexor-retinaculum-contents` · p. 6 | flexor retinaculum contents; deep to flexor retinaculum; tarsal tunnel contents order; Tom Dick and very nervous Harry | pending 103-BMS tarsal-tunnel material; exact accepted Families 1 and 34 handle — prior LCS reuse |
| `fibular-retinacula-attachments-and-contents` · p. 7 | fibular retinacula attachments contents; peroneal retinaculum ankle; superior inferior fibular retinacula; fibularis longus brevis retinaculum | no direct live/pending complete-scope hit and no accepted prior-LCS complete handle — new theoretical teaching |
| `foot-skeleton-bones` · p. 8 | bones of foot; foot skeleton tarsal metatarsal phalanges; talus calcaneus navicular cuboid cuneiforms; foot bone arrangement | accepted Family-30 `foot-bone-groups-and-tarsals` and Family-28 component handles jointly own the scope — prior LCS reuse |
| `foot-joints-identification` · p. 9 | joints of foot; foot intertarsal joints; subtalar transverse tarsal joints; tarsometatarsal metatarsophalangeal interphalangeal | pending movement records own only a subset; no accepted prior-LCS handle owns the complete labelled joint atlas — new theoretical teaching |

All **7 × 4 = 28** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At the
complete-scope level, the direct external result is **0 live / 3 pending / 4 new**; exact
accepted-prior comparison prevents three repeated module additions, leaving **three
prior-LCS reuses / four new theoretical teaching scopes**. There is no assessment handle to
search. Declarative teaching scopes do not enter the eligible tested-concept count, and no
theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 48 | Family 48 delta | After Family 48 |
|---|---:|---:|---:|
| Eligible observed question records | 458 | +0 | 458 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 211 | +0 | 211 |
| Question live / pending / new | 9 / 56 / 146 | +0 / +0 / +0 | 9 / 56 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +0 | 251 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +0 | 1,771 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +0 | 91 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +0 | 0 / 0 / 55 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `8 = 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1`, `0
prompts = 0 source handles`, `458 + 0 = 458`, `242 + 0 = 242`, `211 + 0 = 211`, `9 + 56
+ 146 = 211`, `251 + 0 = 251`, `1,771 + 0 = 1,771`, `91 + 0 = 91`, and `55 + 0 = 55`.

This source hash occurs once in the manifest. Removing it from the accepted Family-47
remainder leaves **28 rank-4/rank-5 path instances / 26 unique hashes**. The Family-47
method was reproduced first: its 29/27 row sets recomputed to
`7e420c23d2b7b34280c93094595460743894aa1c6edaa5f32b8e60104be7b2d0` and
`fc765beb04dfd0fdd1bb92c24861cab77a4eb2de6eee1915a30d83573bb6130d`.
For the exact post-Family-48 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`3b59b1059becca688eccdc6ba9d4e0e013627536fef4fcffce9700415de95d0d`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`1c92beac847af1a40fc7d26821f91c476e50311420edb84844722aff099de9a1`.
The next manifest-order gate is tier-5 Biochemistry practical source
`src_6c61774894408ad18245`, `Compressed_Electrophoresis_&_muscle_and_bone_isoenzymes_final1.pdf`
(3,278,162 bytes; 54 native-text pages; SHA-256
`6c61774894408ad18245ea59f3dedea6be09e1e9216f8f9b5717b83e8aecc726`) under `Year 1/LCS
103/Biochemistry/Practical/Virtual Lab 1 - Enzymes of Bone & Muscle/`. Broader LCS-103 S1
remains incomplete. No download, ID, content record, catalogue update, import or source copy
was created.

## Family 49 — Tier-5 electrophoresis and muscle/bone-isoenzyme practical teaching deck

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_6c61774894408ad18245` |
| File / SHA-256 | `Compressed_Electrophoresis_&_muscle_and_bone_isoenzymes_final1.pdf` / `6c61774894408ad18245ea59f3dedea6be09e1e9216f8f9b5717b83e8aecc726` |
| File boundary | 3,278,162 bytes · unencrypted PDF · 54 physical native-text pages · 720 × 540 pt |
| Manifest placement | `HU-LCS-103` · Biochemistry · Practical · tier 5 |
| Local corpus path | `Year 1/LCS 103/Biochemistry/Practical/Virtual Lab 1 - Enzymes of Bone & Muscle/Compressed_Electrophoresis_&_muscle_and_bone_isoenzymes_final1.pdf` |
| Visible provenance | p. 1 prints `Electrophoresis`; the PDF title is `Proteins and Electrophoresis`, author is `Roger Bertholf`, and creator/producer is Aspose.Slides for Java 25.7; many slides visibly retain CamScanner/template marks |
| Authority finding | Manifest/path-placed local tier-5 practical teaching evidence. It is not a sitting paper, station sheet, response form, question bank or official answer key. |

The SHA-256, byte size and 54-page boundary were recomputed and match the assigned source.
All 54 pages were rendered at 160 dpi and read against the native text layer; all 54 complete
page renders have distinct SHA-256 values. Pages 1–28 teach electrophoresis, pp. 29–46 teach
muscle/bone isoenzyme principles and muscle-enzyme patterns, and pp. 47–53 teach bone-enzyme
patterns; p. 54 is the closing slide.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. The gels, tables, labelled equipment, disease associations and
interpretive captions are all simultaneous declarative teaching. No page asks the learner to
identify or calculate anything, supplies an option set, provides a response field, awards
marks, or reveals an answer after an assessment stem. The empty squares on pp. 43 and 53 are
list bullets, not answer boxes.

### Complete practical-plate, mapping and residue inventory

One mapping is one directly printed term/value/disease-to-role, tissue, band, component or
workflow relation. A repeated label on the same composition is counted once; related facts on
different source-distinct pages remain separate evidence occurrences. Figure letters, slide
titles, publisher marks and polarity symbols without a named relation are not mappings.

| Physical page | Source-first practical teaching composition | Directly printed unique mappings / residue |
|---:|---|---:|
| 3 | electrophoresis definition | 1 mapping |
| 4 | charge-dependent migration toward anode or cathode | 2 mappings |
| 5 | clinical applications/specimen classes | 4 mappings |
| 6 | protein ionisation and cathodal migration in acid pH | 3 mappings |
| 7 | protein ionisation and anodal migration in alkaline pH | 3 mappings |
| 8 | isoelectric pH, electrical neutrality and non-migrating zwitterion | 3 mappings |
| 9 | determinants of net protein charge | 2 mappings |
| 10 | cation/zwitterion/anion state-and-charge schematic | 3 mappings |
| 11 | nucleic-acid charge and size-dependent separation | 2 mappings |
| 12 | labelled DNA nucleotide/backbone diagram | 6 readable mappings; 1 right-edge base-name callout is source-cropped and unresolved |
| 13 | five electrophoresis components | 5 mappings |
| 14 | horizontal chamber, power supply, electrodes and migration direction | 4 mappings |
| 15 | electrophoresis tank, buffer, gel and colour-coded electrodes | 5 mappings |
| 16 | unlabelled horizontal electrophoresis apparatus photograph | 0 mappings |
| 17 | vertical electrophoresis apparatus and current-flow schematic | 6 mappings |
| 18 | voltage/current, heat, evaporation and buffer-concentration effects | 4 mappings |
| 19 | buffer-pH control of protein charge and mobility | 2 mappings |
| 20 | stabilising-matrix rationale against heat-driven diffusion/mixing | 3 mappings |
| 21 | support-media types and common research matrices | 7 mappings |
| 22 | agarose source, properties and high-molecular-weight uses | 7 mappings |
| 23 | agarose-gel casting, well formation, loading and migration workflow | 10 mappings |
| 24 | polyacrylamide-gel low-molecular-weight use | 1 mapping |
| 25 | dilution of high-protein serum before loading | 1 mapping |
| 26 | protein, haemoglobin, enzyme and DNA detection stains | 5 mappings |
| 27 | qualitative gel inspection and quantitative densitometry | 2 mappings |
| 28 | five factors affecting migration rate | 5 mappings |
| 30 | isoenzyme definition | 1 mapping |
| 31 | isoenzyme tissue specificity and physical/chemical properties | 6 mappings |
| 33 | four clinical roles of serum-enzyme assay | 4 mappings |
| 35 | serum aldolase/CPK/transaminase links to muscle diseases | 6 mappings |
| 36 | aldolase isoenzymes, subunits and tissue distribution | 8 mappings |
| 37 | clinical causes of increased serum aldolase | 3 mappings |
| 38 | CK1/BB, CK2/MB and CK3/MM tissue assignments | 3 mappings |
| 39 | healthy, myocardial-infarction and muscle-disease CK patterns | 3 mappings |
| 40 | CK-MB gel lanes/bands and cardiac-disease interpretation | 7 mappings |
| 41 | CK isoform gel, age lanes and skeletal-muscle interpretation | 9 mappings |
| 42 | CK fraction/densitometry profile, lanes and skeletal-muscle interpretation | 8 mappings |
| 43 | LDH1–LDH5 subunit compositions and tissue assignments | 11 mappings |
| 44 | LDH isoenzyme tissue-distribution and disease-elevation table | 19 mappings |
| 45 | normal, liver-damage, myocardial-infarction and muscle-damage LDH profiles | 24 mappings |
| 46 | LDH1–LDH5 gel bands, sample lanes and LDH5 interpretation | 14 mappings |
| 48 | alkaline/acid-phosphatase associations in bone disease | 8 mappings |
| 49 | body-source diagram of six alkaline-phosphatase isoenzymes | 6 mappings |
| 50 | ALP tissue concentrations, membrane association and disease elevations | 9 mappings |
| 51 | ALP isoform mobility order and normal/liver-disease profiles | 8 mappings |
| 52 | acid-phosphatase main, other and rare source hierarchy | 11 mappings |
| 53 | ACP reference interval and clinical associations | 7 mappings |

The **47 content-page occurrences are 47 source-distinct practical teaching plates**. The
seven non-plate pages are the title, contents, four section dividers and closing slide (pp. 1,
2, 29, 32, 34, 47 and 54). No exact complete-page copy is present. The mapping arithmetic is
`34 + 62 + 7 + 4 + 115 + 49 = 271`. The single residue is the visibly cropped right-edge
base-name callout on p. 12; it is not inferred into the mapping count. Other edge-cropped
headers/captions on pp. 44 and 51 remain legible context and are neither blanks nor unresolved
callouts. The assessment boundary is therefore **47 practical teaching plates / 271 printed
teaching mappings / 1 unresolved teaching callout / 0 practical or station prompts / 0
ordinary questions / 0 printed assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 47 plates consolidate to 16 source-level practical teaching scopes. Scope collapse does
not delete plate, mapping, page or source-wording evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `electrophoresis-definition-and-clinical-applications` · pp. 3–5 | electrophoresis charged particles electric field; electrophoresis clinical applications; plasma protein electrophoresis definition; electrophoretic separation hemoglobin isoenzymes | no substantive live/pending or accepted prior-LCS complete-scope handle — new |
| `protein-charge-ph-and-isoelectric-migration` · pp. 6–10 | protein charge acid alkaline pH electrophoresis; isoelectric pH zwitterion migration; protein cation cathode alkaline anode; net charge protein pH amino acid groups | no substantive complete-scope match — new |
| `nucleic-acid-electrophoresis-by-size` · pp. 11–12 | nucleic acid electrophoresis size phosphate; DNA negative charge electrophoresis; DNA fragments migrate positive electrode; nucleic acid gel size separation | no substantive complete-scope match — new |
| `electrophoresis-components-and-equipment` · pp. 13–20 | electrophoresis components buffer support medium; horizontal electrophoresis chamber equipment; vertical electrophoresis buffer samples gel; electrophoresis driving force constant voltage | no substantive complete-scope match — new |
| `agarose-versus-polyacrylamide-support-media` · pp. 21–24 | agarose gel high molecular weight; polyacrylamide gel low molecular weight; electrophoresis support media matrix; agarose gel casting comb wells | no substantive complete-scope match — new |
| `electrophoresis-sample-detection-and-evaluation` · pp. 25–27 | electrophoresis sample preparation staining; silver Ponceau enzyme DNA staining; gel qualitative quantitative densitometer; electrophoresis detecting system evaluation | no substantive complete-scope match — new |
| `electrophoretic-migration-rate-factors` · p. 28 | electrophoretic migration factors charge size field; electrophoresis supporting media temperature; rate of migration electrophoresis; electrophoretic mobility determinants | no substantive complete-scope match — new |
| `isoenzyme-definition-properties-and-clinical-role` · pp. 30–33 | isoenzymes definition same reaction; isoenzyme electrophoretic mobility amino acid; isoenzymes tissue distribution clinical diagnosis; serum enzyme assay differential diagnosis prognosis | no substantive complete-scope match — new |
| `serum-enzyme-markers-in-muscle-disease` · p. 35 | serum enzymes muscle disease aldolase CPK SGOT; muscular dystrophy enzyme markers; myopathy serum enzyme assay; muscle disease CK aldolase transaminase | no substantive complete-scope match — new |
| `aldolase-isoenzymes-and-clinical-significance` · pp. 36–37 | serum aldolase isoenzymes tetramer A B; aldolase tissue distribution muscle liver brain heart; aldolase elevated muscular dystrophy; clinical significance serum aldolase | no substantive complete-scope match — new |
| `creatine-kinase-isoenzymes-and-diagnostic-patterns` · pp. 38–42 | creatine kinase isoenzymes CK BB MB MM; CK MB myocardial infarction electrophoresis; CK MM skeletal muscle disease; creatine kinase electrophoretic pattern | no substantive complete-scope match — new |
| `ldh-isoenzymes-tissues-and-diagnostic-patterns` · pp. 43–46 | LDH isoenzymes tissue distribution; LDH electrophoretic patterns myocardial infarction; LDH 5 skeletal muscle disease; LDH isoenzyme elevations table | no substantive complete-scope match — new |
| `alkaline-phosphatase-metabolic-bone-disease-elevation` · pp. 48, 50 | alkaline phosphatase metabolic bone disease; rickets osteomalacia Paget ALP; osteoblast alkaline phosphatase bone marker; metabolic bone ALP elevation | accepted Families 12–13 and 25 jointly own the metabolic-bone/osteoblast/Paget ALP subset — prior LCS reuse |
| `alp-tissue-sources-and-systemic-elevations` · pp. 49–50 | ALP tissue sources liver bone placenta intestine; alkaline phosphatase systemic disease elevations; ALP hepatobiliary osteoblast membrane enzyme; alkaline phosphatase liver bone malignancy | prior ALP handles are bone-limited; no accepted complete tissue/systemic scope — new |
| `alp-isoenzyme-electrophoretic-profiles` · p. 51 | alkaline phosphatase isoenzymes electrophoresis; ALP liver bone placental isoforms; alkaline phosphatase electrophoretic mobility; ALP isoform liver disease profile | no substantive complete-scope match — new |
| `acid-phosphatase-sources-and-clinical-significance` · pp. 48, 52–53 | acid phosphatase tissue sources; acid phosphatase prostate bone liver spleen; acid phosphatase clinical significance; ACP Paget Gaucher hairy cell leukemia | no substantive complete-scope match — new |

All **16 × 4 = 64** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and source-import roots. The direct
complete-scope external result is **0 live / 0 pending / 16 new**. Exact accepted-prior
comparison prevents one repeated module addition, leaving **one prior-LCS reuse / 15 new
practical-teaching scopes**. There is no assessment handle to search; teaching scopes do not
enter the eligible tested-concept count.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 49 | Family 49 delta | After Family 49 |
|---|---:|---:|---:|
| Eligible observed question records | 458 | +0 | 458 |
| Eligible printed question keys | 242 | +0 | 242 |
| Eligible distinct tested concepts | 211 | +0 | 211 |
| Question live / pending / new | 9 / 56 / 146 | +0 / +0 / +0 | 9 / 56 / 146 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 251 verified minimum | +47 | 298 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 1,771 verified minimum | +271 | 2,042 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 91 | +1 | 92 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 55 | +0 / +0 / +15 | 0 / 0 / 70 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `47 = 26 + 2 + 1 + 12 + 6`, `271 = 34 + 62
+ 7 + 4 + 115 + 49`, `458 + 0 = 458`, `242 + 0 = 242`, `211 + 0 = 211`, `9 + 56 +
146 = 211`, `251 + 47 = 298`, `1,771 + 271 = 2,042`, `91 + 1 = 92`, and `55 + 15 =
70`.

This source hash occurs once in the manifest. Removing it from the accepted Family-48
remainder leaves **27 rank-4/rank-5 path instances / 25 unique hashes**. The Family-48
method was reproduced first: its 28/26 row sets recomputed to
`3b59b1059becca688eccdc6ba9d4e0e013627536fef4fcffce9700415de95d0d` and
`1c92beac847af1a40fc7d26821f91c476e50311420edb84844722aff099de9a1`.
For the exact post-Family-49 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`5d7901670d066b2f4bc2fba6ed5c1bbaab8d269b147a110dcb26bb6dab4ff2eb`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`5b8d0de62e55be15b393a46b39e58e949e01fec1a8514f734006c53e24f27ba7`.
The next manifest-order gate is tier-5 Biochemistry practical source
`src_ce57f137927ce4b3058c`, `CBL muscles and bone.pdf` (535,598 bytes; 34 native-text
pages; SHA-256 `ce57f137927ce4b3058cda875c78554dda4a97502a3feed5b923e2165b948977`)
under `Year 1/LCS 103/Biochemistry/Practical/Virtual Lab 2 - CBL/`. Broader LCS-103 S1
remains incomplete. No download, ID, content record, catalogue update, import or source copy
was created.

## Family 50 — Tier-5 Biochemistry practical case deck with printed answers

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_ce57f137927ce4b3058c` |
| File / SHA-256 | `CBL muscles and bone.pdf` / `ce57f137927ce4b3058cda875c78554dda4a97502a3feed5b923e2165b948977` |
| File boundary | 535,598 bytes · unencrypted PDF · 34 physical native-text pages · 720 × 540 pt |
| Manifest placement | `HU-LCS-103` · Biochemistry · Practical · tier 5 |
| Local corpus path | `Year 1/LCS 103/Biochemistry/Practical/Virtual Lab 2 - CBL/CBL muscles and bone.pdf` |
| Visible provenance | p. 1 prints `Case Scenarios of bone and muscles isoenzymes`; PDF author is `Amany Mohamed` and creator/producer is Microsoft PowerPoint 2016 |
| Authority finding | Manifest/path-placed local tier-5 practical case-based learning deck. It is not a recoverable sitting paper or official department answer key, but it does print source-authored answers to every question it asks. |

The SHA-256, byte size and 34-page boundary were recomputed and match the assigned source.
All 34 pages were rendered at 180 dpi and read against the native text layer; all 34 complete
page renders have distinct SHA-256 values. Page 1 is the title, pp. 2–33 alternate declarative
case scenarios with open questions/answers or keyed MCQs, and p. 34 is `Thank you`.

The source contains **21 eligible ordinary assessment-prompt occurrences with 21 directly
printed source keys**: 11 open questions carry a visible `Answer` or simultaneous answer
list/diagram, and ten MCQs print `Correct Answer`. The 11 case-scenario slides are declarative
teaching context rather than additional question occurrences or implicit keys. None of the 21
questions is a station instruction, image-identification station, response form or mark-bearing
practical task, so the separate stand-alone practical/station-prompt counter does not increase.

### Complete assessment prompt, key and semantic-collapse inventory

| Prompt pages / occurrences | Source-first tested scope | Directly printed key evidence | Collapsed assessment handle |
|---|---|---|---|
| pp. 3–4 · 2 | clinical significance of raised serum aldolase | p. 3 lists muscular dystrophy/DMD, viral hepatitis and advanced prostate cancer; p. 4 prints `Correct Answer: C` (`Suggests muscle disease or injury`) | `serum-aldolase-clinical-significance` |
| pp. 6–7 · 2 | CK isoenzyme identities and count | p. 6 prints CK1/BB brain, CK2/MB cardiac and CK3/MM muscle; p. 7 prints `Correct Answer: A` (3) | `creatine-kinase-isoenzyme-types-and-count` |
| pp. 9–10 · 2 | LDH isoenzyme identities, tissues and cardiac-injury fraction | p. 9 prints LDH1–LDH5 with tissue assignments; p. 10 prints `Correct Answer: A` (LDH-1) | `ldh-isoenzymes-and-tissue-significance` |
| pp. 12, 15 · 2 | cells/tissues with high normal ALP concentration | p. 12 prints hepatobiliary-tract cells and osteoblasts; p. 15 prints `Correct Answer: B` (hepatocytes and osteoblasts) | `alkaline-phosphatase-high-concentration-tissues` |
| p. 14 · 1 | other bone enzyme increased in the Paget case | prints `Acid phosphatase enzyme` | `acid-phosphatase-as-paget-bone-enzyme` |
| p. 17 · 1 | ALP isoenzyme types separated by electrophoresis | the simultaneous labelled body diagram prints liver, intestinal, renal-tubular-cell, placental, bone and granulocyte ALP | `alp-isoenzyme-types-by-electrophoresis` |
| p. 18 · 1 | malignancy settings associated with increased ALP | prints `Correct Answer: A` (`When the liver or bone is involved`) | `alp-malignancy-liver-or-bone-involvement` |
| pp. 20–21 · 2 | mechanism of CK3/MM elevation in Duchenne muscular dystrophy | p. 20 ties DMD degeneration to raised CK3 in muscle disease; p. 21 prints `Correct Answer: B` (`Leakage from damaged muscle cells`) | `ck-mm-elevation-in-duchenne-muscular-dystrophy` |
| pp. 23–24 · 2 | mechanism of ALP elevation in rickets | p. 23 prints osteoblast concentration/membrane association and bone-disease elevation; p. 24 prints `Correct Answer: C` (`Increased osteoblastic activity`) | `alp-elevation-in-rickets-osteoblast-activity` |
| pp. 26–27 · 2 | mechanism of ALP elevation in osteomalacia | p. 26 prints the osteoblast/membrane explanation; p. 27 prints `Correct Answer: B` (`Enhanced osteoblastic activity due to defective mineralization`) | `alp-elevation-in-osteomalacia-osteoblast-activity` |
| pp. 29–30 · 2 | mechanism and meaning of ALP elevation during fracture healing | p. 29 prints increased osteoblast activity/new-bone formation; p. 30 prints `Correct Answer: B` (`Increased osteoblastic activity`) | `alp-elevation-during-fracture-healing` |
| p. 32 · 1 | Paget ALP as a marker of dysregulated remodelling | prints compensatory osteoblast activity in response to abnormal osteoclast resorption | `alp-paget-disease-remodeling-mechanism` |
| p. 33 · 1 | diagnostic importance of isoenzymes | prints `Correct Answer: B` (`They provide tissue-specific diagnostic insights`) | `isoenzyme-tissue-specific-diagnostic-value` |
| **Total** | **21 prompt occurrences collapse to 13 source handles** | **21 directly printed keys** | **13 distinct source scopes before prior-LCS adjudication** |

There are no literal duplicate pages. The repeated open/MCQ pairs test the same scope and are
collapsed semantically within each row, while their separately printed prompt and key
occurrences remain counted. Earlier case conclusions are teaching context, not extra keys; no
answer is inferred from medicine outside the printed source.

### Assessment searches, external disposition and prior-LCS adjudication

| Assessment handle | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `serum-aldolase-clinical-significance` | serum aldolase clinical significance; aldolase elevated muscular dystrophy hepatitis prostate; aldolase muscle disease injury; elevated serum aldolase Duchenne | carbohydrate-pathway aldolase strings are different enzymes/contexts; no substantive same-scope record — new |
| `creatine-kinase-isoenzyme-types-and-count` | creatine kinase isoenzymes CK1 CK2 CK3; CK BB MB MM tissues; serum creatine kinase three isoenzymes; creatine kinase isoenzyme count | pending `ldh-and-ck-isoenzymes-comparison` owns the CK family, composition and tissue assignments — pending |
| `ldh-isoenzymes-and-tissue-significance` | LDH isoenzymes tissue distribution heart; LDH1 heart injury; LDH 1 2 3 4 5 tissues; lactate dehydrogenase isoenzyme heart | the same pending comparison concept owns LDH1–LDH5, tissues and diagnostic fractions — pending |
| `alkaline-phosphatase-high-concentration-tissues` | alkaline phosphatase high concentration hepatobiliary osteoblasts; ALP hepatocytes osteoblasts; cells contain high concentration ALP; alkaline phosphatase normal tissue distribution | pending osteoblast and biliary-ALP records are separate narrower components; no complete tissue-distribution handle — new |
| `acid-phosphatase-as-paget-bone-enzyme` | acid phosphatase Paget disease bone enzyme; other bone enzyme acid phosphatase; acid phosphatase increased Paget; bone enzymes ALP acid phosphatase | prostate/ACP mentions do not own this Paget relationship — new |
| `alp-isoenzyme-types-by-electrophoresis` | ALP isoenzymes separated electrophoresis; alkaline phosphatase types liver intestine placenta bone granulocyte; alkaline phosphatase isoenzyme types; ALP electrophoretic isoforms | no substantive same-scope record — new |
| `alp-malignancy-liver-or-bone-involvement` | ALP increased malignancy liver bone; alkaline phosphatase cancer liver bone involvement; ALP bone metastasis malignancy; malignancy alkaline phosphatase scenario | biliary-obstruction ALP and bone-tumour mentions do not own this malignancy/tissue relationship — new |
| `ck-mm-elevation-in-duchenne-muscular-dystrophy` | CK MM elevated Duchenne leakage damaged muscle; DMD creatine kinase muscle cell leakage; CK3 MM Duchenne muscular dystrophy; creatine kinase elevated dystrophin muscle damage | pending CK-isoenzyme and muscular-dystrophy material explicitly owns CK leakage from damaged muscle in dystrophy — pending |
| `alp-elevation-in-rickets-osteoblast-activity` | ALP elevated rickets osteoblastic activity; alkaline phosphatase rickets mechanism; rickets ALP osteoblasts; why ALP high in rickets | vitamin-D/rickets and osteoblast-ALP records are partial; no one substantive record owns this disease-specific mechanism — new |
| `alp-elevation-in-osteomalacia-osteoblast-activity` | ALP elevated osteomalacia osteoblastic activity; alkaline phosphatase osteomalacia mechanism; osteomalacia defective mineralization ALP; why ALP high in osteomalacia | vitamin-D/osteomalacia and osteoblast-ALP records are partial; no one substantive record owns the combined mechanism — new |
| `alp-elevation-during-fracture-healing` | ALP elevated bone healing osteoblast activity; alkaline phosphatase fracture healing; bone repair osteoblast ALP; callus formation elevated ALP | pending bone-cell material owns osteoblast ALP/new-bone formation and fracture-healing activation; exact accepted Family-13 `osteoblast-bone-forming-cell-alkaline-phosphatase` absorbs this application — pending external evidence, prior eligible-LCS reuse |
| `alp-paget-disease-remodeling-mechanism` | ALP Paget disease bone remodeling osteoblast; elevated alkaline phosphatase Paget mechanism; Paget abnormal osteoclast compensatory osteoblast; high ALP increased bone turnover Paget | accepted Paget diagnosis handles do not own the compensatory osteoblast/osteoclast mechanism; no complete external record — new |
| `isoenzyme-tissue-specific-diagnostic-value` | isoenzymes clinical diagnostics tissue specific; isoenzyme diagnostic importance; isoenzymes tissue-specific diagnostic insights; clinical role isoenzymes | pending LDH/CK comparison expressly owns tissue-specific diagnostic interpretation — pending |

All **13 × 4 = 52** required assessment searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and source-import roots. The direct external
result is **0 live / 5 pending / 8 new**. Exact accepted-prior comparison removes the one
fracture-healing/osteoblast-ALP handle from module addition, leaving a tested-concept delta of
**0 live / 4 pending / 8 new = 12**. Family 49's practical-teaching scopes are corroborating
teaching evidence, not previously counted eligible assessment concepts.

### Complete practical teaching-plate and mapping inventory

Only the 11 declarative case-scenario slides enter the practical teaching-plate ledger. The
21 question/key compositions remain in the assessment ledger above rather than being counted
again as teaching plates or mappings. One mapping below is one explicit case finding,
laboratory result, disease association or mechanism relation; age/sex alone is not a mapping.

| Physical page | Source-first case-teaching composition | Directly printed unique mappings / residue |
|---:|---|---:|
| 2 | progressive weakness/walking difficulty with raised aldolase and DMD context | 3 mappings |
| 5 | marathon-associated CK3/MM rise, skeletal-muscle damage and rhabdomyolysis | 2 mappings |
| 8 | trauma-associated LDH5 rise and muscle-tissue damage | 2 mappings |
| 11 | bowed legs/bone pain, raised ALP/osteoblast activity and vitamin-D-deficient rickets | 4 mappings |
| 13 | bone pain/deformity, raised ALP/high turnover and Paget disease | 3 mappings |
| 16 | raised ALP/bone metastasis with breast- and prostate-cancer associations | 3 mappings |
| 19 | DMD clinical pattern, raised aldolase/CK3-MM and dystrophin mutation | 7 mappings |
| 22 | nutritional-rickets clinical, exposure, laboratory and radiographic pattern | 11 mappings |
| 25 | vitamin-D-deficient osteomalacia clinical, laboratory and biopsy pattern | 10 mappings |
| 28 | fracture callus, raised ALP and osteoblast-mediated bone repair | 3 mappings |
| 31 | Paget clinical, laboratory, remodelling and imaging pattern | 8 mappings |

The **11 case-page occurrences are 11 source-distinct practical teaching plates**. Their
mapping arithmetic is `3 + 2 + 2 + 4 + 3 + 3 + 7 + 11 + 10 + 3 + 8 = 56`. No page
contains a masked callout, rule blank or unresolved label. The question slides contain no
unanswered residue because every prompt has a directly printed key.

### Practical teaching scopes, searches and prior-LCS adjudication

The 11 case plates consolidate to eight source-level teaching scopes.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `duchenne-muscular-dystrophy-clinical-enzyme-profile` · pp. 2, 19 | Duchenne muscular dystrophy aldolase CK clinical profile; DMD progressive weakness pseudohypertrophy dystrophin; Duchenne serum enzymes aldolase creatine kinase; DMD muscle enzyme case | accepted Family-49 aldolase/CK teaching plus prior DMD clinical evidence jointly own the profile — prior LCS reuse |
| `ck-mm-rhabdomyolysis-after-endurance-exercise` · p. 5 | CK MM rhabdomyolysis marathon; creatine kinase skeletal muscle damage athlete; CK3 MM elevated rhabdomyolysis; marathon collapse muscle enzyme | Family-49 owns generic CK-MM muscle damage, not the exercise/rhabdomyolysis application — new practical teaching |
| `ldh5-traumatic-skeletal-muscle-damage` · p. 8 | LDH5 trauma skeletal muscle damage; LDH 5 elevated muscle injury; trauma LDH isoenzyme muscle; LDH5 striated muscle damage | narrower application of accepted Family-49 LDH5 skeletal-muscle interpretation — prior LCS reuse |
| `rickets-clinical-laboratory-alp-profile` · pp. 11, 22 | rickets clinical laboratory ALP profile; rickets bowed legs craniotabes alkaline phosphatase; vitamin D deficiency rickets low calcium phosphate; rickets metaphyseal cupping fraying | accepted metabolic-bone/rickets and Family-49 phosphatase evidence jointly own the profile — prior LCS reuse |
| `paget-disease-clinical-laboratory-alp-profile` · pp. 13, 31 | Paget disease clinical laboratory ALP profile; Paget bone pain deformity increased hat size; Paget high ALP normal calcium phosphate; Paget thickened irregular bone remodeling | accepted Paget assessment and Family-49 ALP teaching jointly own the profile — prior LCS reuse |
| `bone-metastasis-elevated-alp-breast-prostate` · p. 16 | bone metastasis elevated ALP breast prostate; cancer back pain alkaline phosphatase bone metastasis; ALP bone metastases tumor marker; breast prostate cancer bone metastasis ALP | accepted Family-49 systemic/malignancy ALP teaching owns the relation — prior LCS reuse |
| `osteomalacia-clinical-laboratory-alp-profile` · p. 25 | osteomalacia clinical laboratory ALP profile; osteomalacia low calcium phosphate vitamin D; osteomalacia defective mineralization elevated ALP; adult bone pain muscle weakness osteomalacia | accepted metabolic-bone and Family-49 ALP teaching jointly own the profile — prior LCS reuse |
| `fracture-healing-osteoblast-alp-profile` · p. 28 | fracture healing elevated ALP osteoblasts; bone healing callus alkaline phosphatase; osteoblastic activity fracture repair ALP; bone formation enzyme fracture healing | accepted Family-13 osteoblast/ALP and Family-49 healing-fracture teaching own the profile — prior LCS reuse |

All **8 × 4 = 32** required teaching-scope searches completed. Raw component searches do not
change the exact accepted-prior result: **seven prior-LCS teaching reuses / one new practical
teaching scope**. These teaching scopes remain separate from the 13 assessment handles.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 50 | Family 50 delta | After Family 50 |
|---|---:|---:|---:|
| Eligible observed question records | 458 | +21 | 479 |
| Eligible printed question keys | 242 | +21 | 263 |
| Eligible distinct tested concepts | 211 | +12 | 223 |
| Question live / pending / new | 9 / 56 / 146 | +0 / +4 / +8 | 9 / 60 / 154 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 298 verified minimum | +11 | 309 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,042 verified minimum | +56 | 2,098 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 92 | +0 | 92 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 70 | +0 / +0 / +1 | 0 / 0 / 71 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `21 = 11 + 10`, `21 prompt occurrences = 21
printed keys`, `21 occurrences collapse to 13 source handles`, `13 = 1 prior eligible reuse
+ 4 pending additions + 8 new additions`, `458 + 21 = 479`, `242 + 21 = 263`, `211 +
12 = 223`, `9 + 60 + 154 = 223`, `298 + 11 = 309`, `2,042 + 56 = 2,098`, `92 + 0
= 92`, and `70 + 1 = 71`.

This source hash occurs once in the manifest. Removing it from the accepted Family-49
remainder leaves **26 rank-4/rank-5 path instances / 24 unique hashes**. The Family-49
method was reproduced first: its 27/25 row sets recomputed to
`5d7901670d066b2f4bc2fba6ed5c1bbaab8d269b147a110dcb26bb6dab4ff2eb` and
`5b8d0de62e55be15b393a46b39e58e949e01fec1a8514f734006c53e24f27ba7`.
For the exact post-Family-50 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`d4828bf908ad85b5ebe561cd54fcbbe6b64f78729f87bc022e073e53633d2c55`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`da81d39b2a88fb1f992bf39f661649e66ca1454ad952863cbc6436a97290e584`.
The next manifest-order gate is tier-4 Biochemistry theoretical source
`src_76f90f3f79fbc13bae3f`, `source of energy for muscle contrction.pdf` (3,412,647 bytes;
51 native-text pages; SHA-256
`76f90f3f79fbc13bae3f8f1269cbdf5bad86a8691d660aae2ddadc93b20276a4`) under `Year 1/LCS
103/Biochemistry/Theoretical/Lec 1 - Sources of Energy for Muscle Contraction/`. Broader
LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update, import or
source copy was created.

## Family 51 — Tier-4 muscle-energy and creatine-metabolism lecture with one keyed application

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_76f90f3f79fbc13bae3f` |
| File / SHA-256 | `source of energy for muscle contrction.pdf` / `76f90f3f79fbc13bae3f8f1269cbdf5bad86a8691d660aae2ddadc93b20276a4` |
| File boundary | 3,412,647 bytes · unencrypted PDF · 51 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Biochemistry · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Biochemistry/Theoretical/Lec 1 - Sources of Energy for Muscle Contraction/source of energy for muscle contrction.pdf` |
| Visible provenance | p. 1 prints `Energy source for muscle contraction and creatine metabolism`, `Dr/Rehab Elkoseir` and `Medical Biochemistry Department`; PDF author is `Rehab Elsayed Mohammed Elkoseir` and creator/producer is Microsoft PowerPoint for Microsoft 365 |
| Authority finding | Manifest/path-placed local tier-4 biochemistry lecture. It is not a sitting paper, practical response form, question bank or official department answer key, but it does contain one source-authored application prompt followed by an answer/reveal. |

The SHA-256, byte size and 51-page boundary were recomputed and match the assigned source.
All 51 pages were rendered at 170 dpi and read against the native text layer; all 51 complete
page renders have distinct SHA-256 values. Page 1 is title/provenance, p. 2 states objectives,
pp. 3–45 teach muscle structure, contractile proteins, ATP-regeneration systems, creatine
metabolism, fatigue and exercise, p. 46 asks one open application question, pp. 47–48 print
its answer/reveal, p. 49 is `Any Questions`, p. 50 lists learning resources and p. 51 closes.

The full-source assessment boundary is **one eligible ordinary prompt occurrence with one
directly printed source key**. The p. 46 bus-running scenario asks where contraction energy
comes from; p. 47 explicitly maps immediate activity to the phosphagen system, short-term
activity to lactic-acid metabolism and long-term activity to glucose/fatty acids/amino acids,
and p. 48 prints the matching 100-metre energy-source table. Those two reveal slides jointly
key the one prompt and are not two additional questions. There are **zero practical/station
prompts, zero response blanks, zero masked assessment callouts and zero unresolved teaching
callouts**.

### Complete teaching-composition and assessment inventory

| Physical pages | Source-first instructional composition | Occurrences / collapse |
|---|---|---:|
| 3–7 | muscle-tissue types, skeletal-muscle fibre/myofibril organisation and sarcoplasmic contents | 5 |
| 9–14 | myosin thick filament; actin, tropomyosin and troponin thin-filament complex; contraction-cycle diagrams | 6 |
| 15–20, 30, 35 | ATP roles, limited ATP stores and the three regeneration systems | 8 occurrences → 6 distinct compositions; pp. 30 and 35 repeat p. 15 |
| 21–24 | phosphagen/ATP–creatine-phosphate system, reactions, timing and activity profile | 4 |
| 25–29 | creatine synthesis, transport, phosphocreatine formation and creatinine degradation/excretion | 5 |
| 31–34 | anaerobic glycolysis, muscle glycogen mobilisation and short-duration profile | 4 |
| 36–41 | aerobic respiration, fuel inputs and duration-dependent energy-system comparison | 6 |
| 42–44 | muscle fatigue and oxygen-debt mechanism/recovery diagrams | 3 |
| 45 | benefits of aerobic exercise | 1 |
| 46 | bus-running muscle-energy application prompt | 1 ordinary prompt |
| 47–48 | directly printed answer/reveal for the p. 46 application | 1 printed key across 2 slides |

The **42 substantive teaching-slide occurrences collapse to 40 source-distinct teaching
compositions**: the identical source wording and teaching function on pp. 30 and 35 are
complete semantic copies of p. 15 despite different complete-render hashes caused by the
slide treatment. Title, objectives, the p. 8 divider, three closing/resource slides and the
assessment prompt/reveal are outside that distinct teaching count; p. 14's `Reading only`
caption does not negate its declarative contraction-cycle diagram. The source boundary is
therefore **40 distinct teaching compositions / 1
ordinary prompt / 1 printed assessment key / 0 practical or station prompts / 0 residues**.
As theoretical material, it adds **0 practical plates, 0 practical mappings and 0 practical
residues** to the separated tier-5 ledger.

### Assessment search and prior-LCS adjudication

| Assessment handle | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `muscle-energy-systems-by-activity-duration` · pp. 46–48 | muscle contraction energy sources by duration; phosphagen glycolytic aerobic exercise systems; running energy immediate short long term; ATP regeneration systems muscle activity | pending `muscle.metabolism.three-energy-systems-oxygen-debt` owns the phosphagen→glycolytic→aerobic sequence and duration framing; no accepted earlier Family owns this tested scope — pending |

All **1 × 4 = 4** required assessment searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and source-import roots. The direct result
is **0 live / 1 pending / 0 new**. Exact accepted-prior comparison finds **zero prior-LCS
eligible reuses**, so the tested-concept delta remains **0 live / 1 pending / 0 new = 1**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 40 compositions consolidate to 12 source-level theoretical teaching scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `skeletal-muscle-fibre-myofibril-and-sarcoplasm` · pp. 3–7 | skeletal muscle fibre myofibril sarcoplasm; sarcoplasm mitochondria glycogen myoglobin; muscle fibre structure myofibrils; skeletal muscle tissue types structure | pending skeletal-muscle histology/physiology records own the complete internal organisation — pending |
| `thick-and-thin-muscle-filament-proteins` · pp. 9–12 | thick thin muscle filament proteins; myosin head ATP binding site; actin tropomyosin troponin complex; troponin I T C functions | pending nerve-muscle material owns the myosin/actin and troponin–tropomyosin protein scope — pending |
| `actin-myosin-contraction-cycle` · pp. 13–14 | actin myosin muscle contraction cycle; cross bridge ATP contraction; sliding filament contraction mechanism; myosin ATPase actin binding | pending nerve-muscle physiology owns the cross-bridge/contraction mechanism — pending |
| `muscle-atp-roles-and-three-regeneration-systems` · pp. 15–20, 30, 35 | ATP roles muscle contraction calcium pumps; three ATP regeneration systems muscle; phosphagen glycolytic aerobic sequence; source energy muscle contraction | pending `muscle.metabolism.three-energy-systems-oxygen-debt` owns the complete sequence and ATP role — pending |
| `phosphagen-atp-creatine-phosphate-system` · pp. 21–24 | creatine phosphate ATP phosphagen system; phosphocreatine creatine kinase ADP ATP; ATP CP first 10 15 seconds; high energy phosphate system muscle | pending muscle-physiology and carbohydrate records jointly own the complete phosphagen scope — pending |
| `creatine-biosynthesis-and-tissue-transport` · pp. 25–27 | creatine synthesis glycine arginine methionine; guanidinoacetate kidney liver creatine; creatine biosynthesis tissue transport; phosphocreatine synthesis creatine kinase | pending amino-acid material owns the precursor/methylation pathway and creatine synthesis — pending |
| `creatine-degradation-creatinine-and-renal-indicator` · pp. 28–29 | creatine phosphate degradation creatinine; creatinine urine muscle mass; serum creatinine kidney function indicator; spontaneous creatine creatinine formation | renal records contain generic creatinine interpretation, but no complete same-source creatine-degradation scope — new theoretical teaching |
| `anaerobic-glycolysis-for-muscle-contraction` · pp. 31–34 | anaerobic glycolysis muscle contraction energy; muscle glycogen phosphorylase calcium epinephrine AMP; glycolytic system one to three minutes; glycogen lactic acid muscle ATP | pending muscle-physiology records own the anaerobic/glycogen-lactic-acid energy system — pending |
| `aerobic-respiration-for-muscle-contraction` · pp. 36–41 | aerobic respiration muscle contraction energy; muscle aerobic oxidative system fuels; fatty acids glucose amino acids muscle ATP; prolonged exercise aerobic system | pending muscle-physiology records own the aerobic system, fuels and duration framing — pending |
| `muscle-fatigue-mechanisms` · pp. 39–41 | muscle fatigue causes blood flow ions lactic acid; inability muscle contract fatigue; muscle cramp electrolyte imbalance; muscle energy systems fatigue | pending muscle-physiology material owns the fatigue mechanisms — pending |
| `oxygen-debt-and-postexercise-recovery` · pp. 42–44 | oxygen debt muscle exercise; post exercise oxygen creatine phosphate myoglobin; lactate liver glucose oxygen debt; restore ATP glycogen after exercise | pending `muscle.metabolism.three-energy-systems-oxygen-debt` owns the complete recovery scope — pending |
| `aerobic-exercise-systemic-benefits` · p. 45 | benefits aerobic exercise muscle bone; aerobic exercise metabolic efficiency; exercise neuromuscular coordination capillary growth; aerobic exercise lungs gas exchange | no direct live/pending complete-scope hit and no accepted prior-LCS complete handle — new theoretical teaching |

All **12 × 4 = 48** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete
scope level the direct external result is **0 live / 10 pending / 2 new**. Exact comparison
finds **zero accepted prior-LCS complete-scope reuses**, leaving **12 theoretical teaching
scopes (10 pending / 2 new)**. Declarative teaching scopes do not enter the eligible tested-
concept count, and no theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 51 | Family 51 delta | After Family 51 |
|---|---:|---:|---:|
| Eligible observed question records | 479 | +1 | 480 |
| Eligible printed question keys | 263 | +1 | 264 |
| Eligible distinct tested concepts | 223 | +1 | 224 |
| Question live / pending / new | 9 / 60 / 154 | +0 / +1 / +0 | 9 / 61 / 154 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 309 verified minimum | +0 | 309 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,098 verified minimum | +0 | 2,098 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 92 | +0 | 92 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 71 | +0 / +0 / +0 | 0 / 0 / 71 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `42 teaching occurrences - 2 repeated-copy
occurrences = 40 distinct teaching compositions`, `1 prompt occurrence = 1 source handle =
1 printed key`, `223 + 1 = 224`, `9 + 61 + 154 = 224`, `479 + 1 = 480`, `263 + 1 =
264`, `309 + 0 = 309`, `2,098 + 0 = 2,098`, `92 + 0 = 92`, and `71 + 0 = 71`.

This source hash occurs once in the manifest. Removing it from the accepted Family-50
remainder leaves **25 rank-4/rank-5 path instances / 23 unique hashes**. The Family-50
method was reproduced first: its 26/24 row sets recomputed to
`d4828bf908ad85b5ebe561cd54fcbbe6b64f78729f87bc022e073e53633d2c55` and
`da81d39b2a88fb1f992bf39f661649e66ca1454ad952863cbc6436a97290e584`.
For the exact post-Family-51 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`f2c05065ffd263bd5ff80a578bb33fe0227ed1b9748fe7d0d7ca592e4f7002da`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`7fb3ddad2d75fc94d45fd11188c70d6e2cbfa1960a0aed13d4621284a6293fc1`.
The next manifest-order gate is tier-4 Biochemistry theoretical source
`src_da044da0bfcc6af6ed2c`, `GENETIC DISEASES OF THE MUSCLES.pdf` (1,844,403 bytes; 21
native-text pages; SHA-256
`da044da0bfcc6af6ed2c435b1eb67dd34b45340a757fbddefdb326c8ec562075`) under `Year 1/LCS
103/Biochemistry/Theoretical/Lec 2 - Genetic Diseases of Muscles/`. Broader LCS-103 S1
remains incomplete. No download, ID, content record, catalogue update, import or source copy
was created.

## Family 52 — Tier-4 genetic muscle-disease and glycogen-storage teaching-only lecture gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_da044da0bfcc6af6ed2c` |
| File / SHA-256 | `GENETIC DISEASES OF THE MUSCLES.pdf` / `da044da0bfcc6af6ed2c435b1eb67dd34b45340a757fbddefdb326c8ec562075` |
| File boundary | 1,844,403 bytes · unencrypted PDF · 21 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Biochemistry · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Biochemistry/Theoretical/Lec 2 - Genetic Diseases of Muscles/GENETIC DISEASES OF THE MUSCLES.pdf` |
| Visible provenance | p. 1 prints `GENETIC DISEASES OF THE MUSCLES`; the PDF author is `LENOVO` and creator/producer is Microsoft PowerPoint for Microsoft 365; no lecturer, university, assessment or sitting label is printed |
| Authority finding | Manifest/path-placed local tier-4 biochemistry lecture. It is not a sitting paper, practical response form, question bank or official answer key. |

The SHA-256, byte size and 21-page boundary were recomputed and match the assigned source.
All 21 pages were rendered at 170 dpi and read against the native text layer; all 21 complete
page renders have distinct SHA-256 values. Page 1 is the title, p. 2 states objectives, pp.
3–20 are declarative teaching compositions, and p. 21 closes with `Thank You`.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. Page 10's inline `What are glycogen storage diseases (GSD)?` is
a rhetorical definition cue embedded in a teaching bullet and is immediately completed by
the next bullet on the same slide; it is not a stand-alone student instruction, response
field, option set or later answer-reveal sequence. No other page contains an imperative or
interrogative task, answer blank, mark allocation, correctness convention, highlighted
choice, masked label or unresolved callout.

### Complete teaching-composition and assessment-boundary inventory

| Physical pages | Source-first instructional compositions | Slide occurrences |
|---:|---|---:|
| 3–7 | Duchenne muscular dystrophy: dystrophin complex, membrane/cytoskeletal role, X-linked inheritance, degeneration, Gower sign and clinical course | 5 |
| 8–9 | inherited cardiomyopathy definition, familial/genetic frequency and structural/metabolic gene categories | 2 |
| 10–13 | muscle glycogen-storage disorders; Pompe, McArdle and Tarui enzyme defects, tissues and clinical features | 4 |
| 14–16 | glycogen-storage disease definition, inheritance, hepatic/myopathic classification and general features | 3 |
| 17–18 | comparative GSD enzyme/organ/pathway tables and glycogen-metabolism map | 2 |
| 19–20 | von Gierke type-Ia/Ib defect, organ involvement, metabolic consequences, clinical features and treatment | 2 |
| **Total** | **tier-4 instructional compositions** | **18** |

The **18 content-slide occurrences are 18 source-distinct teaching compositions**. Complete-
render SHA-256 comparison found no exact full-page copy, and visual comparison found no
complete semantic duplicate to collapse. All printed tables, pathways and figure labels are
simultaneous teaching; none is masked or unresolved. The source boundary is therefore **18
teaching compositions / 0 ordinary prompts / 0 practical or station prompts / 0 printed
assessment keys / 0 residues**. As theoretical material, it adds **0 practical plates, 0
practical mappings and 0 practical residues** to the separated tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 18 compositions consolidate to nine source-level theoretical teaching scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `duchenne-dystrophin-complex-and-muscle-fibre-loss` · pp. 3–4 | Duchenne dystrophin glycoprotein complex; dystrophin links actin extracellular matrix; dystrophin deficiency muscle fibre loss; DMD membrane instability | pending muscular-dystrophy material owns dystrophin loss and degeneration; accepted Families 12 and 15 already own the dystrophin/progressive-wasting scope — prior LCS reuse |
| `duchenne-inheritance-gower-sign-and-clinical-course` · pp. 5–7 | Duchenne X linked recessive Gower sign; DMD age four wheelchair twelve; Duchenne cardiomegaly fatal age thirty; Gower manoeuvre muscular dystrophy | pending DMD material and Family-50 teaching own components, but no accepted prior complete inheritance/course handle — pending new theoretical teaching |
| `inherited-cardiomyopathy-structural-and-metabolic-genes` · pp. 8–9 | inherited cardiomyopathy structural metabolic genes; familial cardiomyopathy myosin troponin; cardiomyopathy fatty acid oxidation oxidative phosphorylation; monogenic heterogeneous cardiomyopathy | fatty-acid and contractile-protein records are narrower; no direct complete-scope live/pending hit or accepted prior-LCS handle — new theoretical teaching |
| `glycogen-storage-disease-definition-classification-and-inheritance` · pp. 10, 14–16 | glycogen storage disease definition inheritance; hepatic myopathic GSD types; glycogen synthesis degradation enzyme defects; GSD autosomal recessive X linked | pending carbohydrate material owns the definition, classification and inheritance framework — pending |
| `pompe-disease-acid-alpha-glucosidase-deficiency` · p. 11 | Pompe acid alpha glucosidase deficiency; glycogen storage disease II lysosome; Pompe cardiomegaly hypotonia hepatomegaly; lysosomal glycogen cardiac failure | pending carbohydrate/GSD material owns the enzyme defect and clinical phenotype — pending |
| `mcardle-disease-muscle-phosphorylase-deficiency` · p. 12 | McArdle myophosphorylase deficiency; glycogen storage disease V skeletal muscle; McArdle exercise cramps fatigue; muscle phosphorylase GSD V | pending carbohydrate/GSD material owns the enzyme defect, tissue and exercise phenotype — pending |
| `tarui-disease-muscle-pfk-deficiency` · p. 13 | Tarui phosphofructokinase deficiency; glycogen storage disease VII muscle erythrocytes; Tarui exercise intolerance haemolysis; muscle PFK myoglobinuria hyperbilirubinemia | pending carbohydrate/GSD material owns the enzyme defect and clinical phenotype — pending |
| `glycogen-storage-disease-type-enzyme-organ-map` · pp. 10, 15, 17–18 | glycogen storage diseases types enzymes table; GSD enzyme defect organ characteristics; glycogen pathway GSD I II III IV V VI VII; glycogenosis comparative map | pending carbohydrate/GSD records jointly own the type–enzyme–organ mapping — pending |
| `von-gierke-disease-metabolic-consequences` · pp. 19–20 | von Gierke glucose 6 phosphatase deficiency; GSD I hypoglycemia lactic acidosis; von Gierke hyperuricemia hyperlipidemia hepatomegaly; glucose 6 phosphate metabolic consequences | pending `Von Gierke disease` concept owns the complete block-to-consequence chain — pending |

All **9 × 4 = 36** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **0 live / 8 pending / 1 new**. Exact accepted-prior
comparison prevents the DMD dystrophin scope from being added again, leaving **one prior-LCS
reuse / eight additive theoretical teaching scopes (7 pending / 1 new)**. There is no
assessment handle to search. Declarative teaching scopes do not enter the eligible tested-
concept count, and no theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 52 | Family 52 delta | After Family 52 |
|---|---:|---:|---:|
| Eligible observed question records | 480 | +0 | 480 |
| Eligible printed question keys | 264 | +0 | 264 |
| Eligible distinct tested concepts | 224 | +0 | 224 |
| Question live / pending / new | 9 / 61 / 154 | +0 / +0 / +0 | 9 / 61 / 154 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 309 verified minimum | +0 | 309 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,098 verified minimum | +0 | 2,098 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 92 | +0 | 92 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 71 | +0 / +0 / +0 | 0 / 0 / 71 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `18 = 5 + 2 + 4 + 3 + 2 + 2`, `0 prompts =
0 source handles`, `480 + 0 = 480`, `264 + 0 = 264`, `224 + 0 = 224`, `9 + 61 + 154 =
224`, `309 + 0 = 309`, `2,098 + 0 = 2,098`, `92 + 0 = 92`, and `71 + 0 = 71`.

This source hash occurs once in the manifest. Removing it from the accepted Family-51
remainder leaves **24 rank-4/rank-5 path instances / 22 unique hashes**. The Family-51
method was reproduced first: its 25/23 row sets recomputed to
`f2c05065ffd263bd5ff80a578bb33fe0227ed1b9748fe7d0d7ca592e4f7002da` and
`7fb3ddad2d75fc94d45fd11188c70d6e2cbfa1960a0aed13d4621284a6293fc1`.
For the exact post-Family-52 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`53260d735f7d79e43df34b596ed59b713a0b61790614bdcb70ae410903c048be`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`dce3f442251bfb6ea136a50f0dfd937b15fc684a5488d9322dc53d842ccf35dc`.
The next manifest-order gate is tier-4 Biochemistry theoretical source
`src_011c744f3cf119c15f48`, `Vitamin D , phosphorus and Calcium metabolism.pdf` (1,243,649
bytes; 35 native-text pages; SHA-256
`011c744f3cf119c15f48b55bcf97cf9ab6423f00fe6e92272960f2d67314616e`) under `Year 1/LCS
103/Biochemistry/Theoretical/Lec 3 - Vitamin D, Calcium & Phosphorus Metabolism/`. Broader
LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update, import or
source copy was created.

## Family 53 — Tier-4 vitamin-D, calcium, phosphorus and bone-metabolism teaching-only lecture gate

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_011c744f3cf119c15f48` |
| File / SHA-256 | `Vitamin D , phosphorus and Calcium metabolism.pdf` / `011c744f3cf119c15f48b55bcf97cf9ab6423f00fe6e92272960f2d67314616e` |
| File boundary | 1,243,649 bytes · unencrypted PDF · 35 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Biochemistry · Theoretical · tier 4 |
| Local corpus path | `Year 1/LCS 103/Biochemistry/Theoretical/Lec 3 - Vitamin D, Calcium & Phosphorus Metabolism/Vitamin D , phosphorus and Calcium metabolism.pdf` |
| Visible provenance | p. 1 prints `Vitamin D , phosphorus and Calcium metabolism`; PDF author is `Rehab Elsayed Mohammed Elkoseir` and creator/producer is Microsoft PowerPoint for Microsoft 365; no university, assessment or sitting label is printed |
| Authority finding | Manifest/path-placed local tier-4 biochemistry lecture. It is not a sitting paper, practical response form, question bank or official answer key. |

The SHA-256, byte size and 35-page boundary were recomputed and match the assigned source.
All 35 pages were rendered at 170 dpi and read against the native text layer; all 35 complete
page renders have distinct SHA-256 values. Page 1 is title/provenance, p. 2 states intended
learning outcomes, pp. 3–10 teach bone matrix/cells/remodelling, p. 11 is a calcium section
divider, and pp. 12–35 teach calcium, phosphate and vitamin-D metabolism and disorders.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. Every heading, list, reference range, dose table, pathway,
clinical photograph and labelled diagram is simultaneous declarative teaching. No page
contains an interrogative or imperative task, response field, option set, answer blank, mark
allocation, correctness convention, answer reveal, masked label or unresolved callout.

### Complete teaching-composition and assessment-boundary inventory

| Physical pages | Source-first instructional compositions | Slide occurrences |
|---:|---|---:|
| 3–4 | bone composition and matrix proteins, including osteocalcin turnover marker | 2 |
| 5–8 | osteoblast, osteocyte and osteoclast origins/functions, secretions and hormonal responsiveness | 4 |
| 9–10 | bone-remodelling sequence and formation/resorption balance | 2 |
| 12–14 | serum-calcium fractions/ranges, physiological roles and hypo-/hypercalcaemic muscle effects | 3 |
| 15–18 | PTH, calcitriol, calcitonin, glucocorticoid, growth/sex-steroid and FGF23 regulation | 4 |
| 19–23 | vitamin-D introduction, forms/sources, age-related dose table, absorption and transport | 5 |
| 24–28 | skin/liver/kidney synthesis and activation pathways, cofactors and regulation diagrams | 5 |
| 29–30 | vitamin-D functions and calcium/phosphate homeostasis | 2 |
| 31–33 | deficiency, rickets/osteomalacia and type-I/type-II inherited vitamin-D-deficiency rickets | 3 |
| 34 | renal osteodystrophy mechanism | 1 |
| 35 | hypervitaminosis-D manifestations and metastatic calcification | 1 |
| **Total** | **tier-4 instructional compositions** | **32** |

The **32 content-slide occurrences are 32 source-distinct teaching compositions**. Complete-
render SHA-256 and semantic comparison found no full-page copy to collapse. The source
boundary is therefore **32 teaching compositions / 0 ordinary prompts / 0 practical or
station prompts / 0 printed assessment keys / 0 residues**. As theoretical material, it
adds **0 practical plates, 0 practical mappings and 0 practical residues** to the separated
tier-5 ledger.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 32 compositions consolidate to 14 source-level theoretical teaching scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `bone-matrix-organic-inorganic-composition` · pp. 3–4 | bone matrix organic inorganic composition; bone type I collagen ninety percent; osteocalcin osteonectin bone matrix; serum osteocalcin turnover marker | pending bone-matrix material owns the composition; accepted Family-13 matrix handle owns the same core — prior LCS reuse |
| `osteoblast-osteocyte-osteoclast-functions` · pp. 5–8 | osteoblast osteocyte osteoclast functions; osteoblast osteoid ALP; osteocyte sclerostin FGF23; osteoclast multinucleate bone resorption | pending bone-cell material owns the cell comparison; accepted Family-13 cell handles jointly own the core — prior LCS reuse |
| `bone-remodeling-formation-resorption-balance` · pp. 9–10 | bone remodeling formation resorption balance; osteoblast osteoclast steady state; bone remodeling mechanical loading; formation less resorption osteoporosis | pending remodelling material owns the balance; accepted Family-13 osteoclast/remodelling handles own the core — prior LCS reuse |
| `serum-calcium-fractions-ranges-and-physiological-roles` · pp. 12–13 | ionized protein bound complexed calcium; serum calcium fractions reference range; calcium muscle contraction neurotransmitter release; calcium coagulation bone structure | pending calcium/nerve-muscle material owns the fractions and major physiological roles — pending |
| `hypocalcemia-hypercalcemia-muscle-effects` · p. 14 | hypocalcemia tetany hyperexcitability; hypercalcemia muscle weakness sodium channels; calcium neuromuscular excitability; abnormal calcium muscle function | pending calcium-excitability records own both direction-specific muscle effects — pending |
| `pth-calcitriol-calcitonin-calcium-regulation` · pp. 15–16 | PTH calcitriol calcitonin calcium regulation; parathyroid hormone bone turnover plasma calcium; calcitriol intestinal calcium osteoblast; calcitonin osteoclast inhibition | pending calcium/bone records own the three-hormone regulation; accepted Family-13 PTH/calcitonin components are prior corroboration but not the full composite — pending |
| `glucocorticoid-growth-and-sex-steroid-bone-effects` · p. 17 | glucocorticoids bone loss osteoporosis; growth hormone bone growth; estrogen androgen bone turnover; sex steroid deficiency osteoporosis | pending bone/endocrine records own the hormone-effect comparison — pending |
| `fgf23-phosphate-regulation` · p. 18 | FGF23 phosphate lowering factor; plasma phosphate regulation; phosphate retention toxicity; osteocyte FGF23 phosphate | no direct complete-scope live/pending hit and no accepted prior-LCS handle — new theoretical teaching |
| `vitamin-d-forms-sources-dose-absorption-and-transport` · pp. 19–23 | vitamin D2 D3 sources; vitamin D recommended dose age; vitamin D duodenum jejunum bile salts; chylomicron vitamin D binding protein transport | pending vitamin material owns the forms, sources and absorption/transport components — pending |
| `vitamin-d-skin-liver-kidney-activation` · pp. 24–28 | vitamin D skin liver kidney activation; 7 dehydrocholesterol UV cholecalciferol; liver 25 hydroxylase calcidiol; kidney 1 alpha hydroxylase calcitriol | pending vitamin-D records own the complete two-hydroxylation pathway — pending |
| `vitamin-d-calcium-phosphate-homeostasis-functions` · pp. 29–30 | vitamin D calcium phosphate homeostasis; calcitriol calbindin intestinal absorption; vitamin D renal calcium reabsorption; vitamin D bone mineralization mobilization | pending vitamin-D records own intestinal, renal and bone functions — pending |
| `vitamin-d-deficiency-rickets-and-osteomalacia` · pp. 31–33 | vitamin D deficiency rickets osteomalacia; defective mineralization child adult; vitamin D dependent rickets type I II; 1 alpha hydroxylase receptor deficiency rickets | pending vitamin-D records own deficiency and inherited forms; accepted Families 12, 49 and 50 already own the rickets/osteomalacia core — prior LCS reuse |
| `renal-osteodystrophy-calcitriol-pth-mechanism` · p. 34 | renal osteodystrophy calcitriol PTH; kidney disease hypocalcemia secondary hyperparathyroidism bone; renal failure impaired vitamin D activation; excessive bone turnover renal disease | chronic-renal/calcitriol hits are components, but no complete same-scope record or accepted prior-LCS handle — new theoretical teaching |
| `hypervitaminosis-d-hypercalcemia-and-calcification` · p. 35 | hypervitaminosis D hypercalcemia; vitamin D toxicity polyuria thirst constipation; hypervitaminosis D metastatic calcification; vitamin D toxicity renal failure | cross-module calcification material is corroborating only; no complete HU-LCS-103 pending or accepted prior handle — new theoretical teaching |

All **14 × 4 = 56** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **0 live / 11 pending / 3 new**. Exact accepted-
prior comparison prevents four core bone/vitamin-D scopes from being added again, leaving
**four prior-LCS reuses / ten additive theoretical teaching scopes (7 pending / 3 new)**.
There is no assessment handle to search. Declarative teaching scopes do not enter the
eligible tested-concept count, and no theoretical scope enters the practical-teaching-scope
counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 53 | Family 53 delta | After Family 53 |
|---|---:|---:|---:|
| Eligible observed question records | 480 | +0 | 480 |
| Eligible printed question keys | 264 | +0 | 264 |
| Eligible distinct tested concepts | 224 | +0 | 224 |
| Question live / pending / new | 9 / 61 / 154 | +0 / +0 / +0 | 9 / 61 / 154 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 309 verified minimum | +0 | 309 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,098 verified minimum | +0 | 2,098 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 92 | +0 | 92 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 71 | +0 / +0 / +0 | 0 / 0 / 71 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `32 = 2 + 4 + 2 + 3 + 4 + 5 + 5 + 2 + 3 +
1 + 1`, `0 prompts = 0 source handles`, `480 + 0 = 480`, `264 + 0 = 264`, `224 + 0 =
224`, `9 + 61 + 154 = 224`, `309 + 0 = 309`, `2,098 + 0 = 2,098`, `92 + 0 = 92`, and
`71 + 0 = 71`.

This source hash occurs once in the manifest. Removing it from the accepted Family-52
remainder leaves **23 rank-4/rank-5 path instances / 21 unique hashes**. The Family-52
method was reproduced first: its 24/22 row sets recomputed to
`53260d735f7d79e43df34b596ed59b713a0b61790614bdcb70ae410903c048be` and
`dce3f442251bfb6ea136a50f0dfd937b15fc684a5488d9322dc53d842ccf35dc`.
For the exact post-Family-53 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`51369aec195ab6614119fae66193f800a07fb682192fab6dcf310490c47c4221`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`362bb3986aea43034da3a6ec4ed81def25c7b907bc8b4effd1fbfb218193386d`.
The next manifest-order gate is tier-4 Biochemistry theoretical source
`src_8b8f579ff4ea709713b0`, `103 revision.pdf` (174,605 bytes; 6 native-text pages;
SHA-256 `8b8f579ff4ea709713b0008e9a17688c5a6de706e861cfe55351487a0fa3d970`)
under `Year 1/LCS 103/Biochemistry/Theoretical/Revision/`. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.

## Family 54 — Tier-4 Biochemistry revision question set without printed keys

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_8b8f579ff4ea709713b0` |
| File / SHA-256 | `103 revision.pdf` / `8b8f579ff4ea709713b0008e9a17688c5a6de706e861cfe55351487a0fa3d970` |
| File boundary | 174,605 bytes · unencrypted PDF · 6 physical native-text pages · 612 × 792 pt |
| Manifest placement | `HU-LCS-103` · Biochemistry · Theoretical/Revision · tier 4 |
| Local corpus path | `Year 1/LCS 103/Biochemistry/Theoretical/Revision/103 revision.pdf` |
| Visible provenance | p. 1 prints `103 Revision`; PDF author is `Rehab Elsayed Mohammed Elkoseir` and creator/producer is Microsoft Word for Microsoft 365; no university, sitting, mark or answer-key label is printed |
| Authority finding | Manifest/path-placed local tier-4 module revision question set. It is not a recoverable sitting paper or official department key, and it prints no answer convention. |

The SHA-256, byte size and six-page boundary were recomputed and match the assigned source.
All six pages were rendered at 200 dpi and read against the native text layer; all six
complete page renders have distinct SHA-256 values. Questions begin immediately below the
p. 1 title and continue through the final line of p. 6; there is no separate teaching,
reference or closing page.

The full-source gate finds **30 complete ordinary assessment-prompt occurrences: 22 MCQs and
eight written prompts**. Every MCQ option is visibly unmarked. There is no underline,
colour, bolding, tick, answer list, `Correct Answer`, model response or other correctness
convention, and the written prompts have no response text. The source therefore contributes
**zero printed keys**. None is a practical/station task, image-identification station,
response form or mark-bearing practical instruction, and no prompt is masked or unresolved.

### Complete page, prompt-type and semantic-collapse inventory

| Physical page | Complete source prompts | MCQ / written occurrences |
|---:|---|---:|
| 1 | serum creatinine interpretation; creatine amino-acid precursors; exercise glycogen-breakdown stimulus; oxygen debt; myoglobin function | 5 / 0 |
| 2 | mitochondrial impairment/least-affected activity; hypoxia metabolic shift; fatigue correction; energy-source order; phosphagen components/synthesis; creatine-P synthesis | 3 / 3 |
| 3 | DMD gene product; DMD inheritance; Pompe enzyme; DMD fibre-loss mechanism; infantile-Pompe cardiac-failure mechanism | 5 / 0 |
| 4 | Gower-sign diagnosis; exercise-cramp deficient enzyme; correctly matched disease/enzyme pair; dystrophin role; Pompe biochemical defect; McArdle/Tarui comparison | 3 / 3 |
| 5 | active vitamin-D form; biologically active calcium fraction; first vitamin-D hydroxylation; calbindin-mediated absorption; adult demineralisation diagnosis | 5 / 0 |
| 6 | vitamin-D activation sequence; describe vitamin-D synthesis/activation; FGF23 phosphate-regulation role | 1 / 2 |
| **Total** | **30 complete prompt occurrences** | **22 MCQs / 8 written** |

There are no literal duplicate prompts. Semantic collapse assigns the 30 occurrences to
**24 source-first tested handles**: DMD gene/fibre-loss/role prompts collapse three-to-one;
Pompe enzyme MCQ and biochemical-defect request collapse two-to-one; the two McArdle enzyme
MCQs collapse two-to-one; and the vitamin-D first-site, sequence and synthesis prompts
collapse three-to-one. All other prompts remain source-distinct. No option text is promoted
to declarative teaching or a key, so this assessment-only source adds **0 teaching
compositions, 0 practical plates, 0 practical mappings and 0 residues**.

### Assessment handles, searches and prior-LCS adjudication

| Source-first assessment handle / occurrences | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `serum-creatinine-as-impaired-kidney-function-marker` · 1 | serum creatinine impaired kidney function; elevated creatinine renal impairment; creatinine kidney marker; serum creatinine interpretation | pending renal/creatinine material owns the marker relation — pending |
| `creatine-amino-acid-precursors` · 1 | creatine synthesis glycine arginine methionine; amino acids required creatine synthesis; creatine precursors amino acids; glycine arginine methionine creatine | pending amino-acid material owns the three precursors — pending |
| `exercise-muscle-glycogen-breakdown-stimuli` · 1 | exercise glycogen breakdown calcium epinephrine; muscle glycogen phosphorylase Ca epinephrine; intense exercise glycogenolysis stimulus; calcium catecholamine muscle glycogen | pending muscle-energy material owns calcium/epinephrine activation — pending |
| `oxygen-debt-postexercise-recovery` · 1 | oxygen debt heavy breathing exercise; restore oxygen debt; postexercise oxygen consumption; vigorous exercise recovery oxygen | pending muscle-physiology material owns the recovery mechanism — pending |
| `myoglobin-oxygen-storage-in-muscle` · 1 | myoglobin oxygen storage muscle; myoglobin deficiency muscle oxygen; muscle oxygen binding pigment; myoglobin function skeletal muscle | pending skeletal-muscle material owns the oxygen-storage role — pending |
| `short-sprint-low-mitochondrial-dependence` · 1 | mitochondrial impairment short sprint; aerobic metabolism activity least affected; sprint phosphagen mitochondria; endurance versus sprint mitochondria | pending muscle-energy material owns duration/system dependence — pending |
| `hypoxia-shifts-muscle-to-anaerobic-glycolysis` · 1 | oxygen deficiency anaerobic glycolysis muscle; hypoxia metabolic shift glycolysis; low oxygen muscle energy metabolism; anaerobic glycolysis oxygen supply | pending muscle-energy material owns the metabolic shift — pending |
| `muscle-fatigue-lactate-and-metabolic-changes` · 1 | muscle fatigue lactate metabolic changes; ATP depletion fatigue correction; causes of muscle fatigue exercise; lactate accumulation muscle fatigue | pending muscle-fatigue material owns the metabolic-cause scope — pending |
| `muscle-energy-systems-in-order` · 1 | energy sources muscle contraction order; phosphagen glycolytic aerobic sequence; muscle ATP systems in order; duration energy system muscle | exact accepted Family-51 tested handle `muscle-energy-systems-by-activity-duration`; pending physiology owns it — prior eligible-LCS reuse |
| `phosphagen-system-components` · 1 | phosphagen system components; ATP creatine phosphate system; high energy phosphate components; explain phosphagen synthesis component | pending phosphagen material owns the component scope — pending |
| `creatine-phosphate-synthesis` · 1 | creatine phosphate synthesis; phosphocreatine formation creatine kinase; synthesis creatine P muscle; creatine phosphorylation ATP | pending creatine/phosphagen material owns the formation step — pending |
| `duchenne-dystrophin-role-and-fibre-loss` · 3 | DMD dystrophin gene; role dystrophin skeletal muscle; Duchenne loss muscle fibers; dystrophin actin extracellular matrix | pending dystrophy material owns the molecular mechanism; accepted Families 12/15 tested dystrophin-linked progressive fibre loss — prior eligible-LCS reuse |
| `duchenne-x-linked-recessive-inheritance` · 1 | Duchenne X linked recessive; DMD inheritance pattern; dystrophin disease inheritance; Duchenne carrier mother male child | pending DMD material owns the inheritance pattern — pending |
| `pompe-acid-alpha-glucosidase-deficiency` · 2 | Pompe alpha 1 4 glucosidase deficiency; GSD II lysosomal enzyme; Pompe biochemical defect; acid maltase deficiency Pompe | pending GSD material owns the enzyme defect — pending |
| `pompe-cardiac-glycogen-accumulation` · 1 | Pompe cardiac failure glycogen accumulation; infantile Pompe cardiomyopathy; glycogen cardiac muscle Pompe; GSD II heart failure mechanism | pending GSD material owns the cardiac mechanism — pending |
| `gower-sign-duchenne-diagnosis` · 1 | Gower sign Duchenne diagnosis; child climbs legs standing DMD; progressive weakness Gower manoeuvre; five year old Gower muscular dystrophy | pending DMD material owns the diagnostic phenotype — pending |
| `mcardle-myophosphorylase-deficiency` · 2 | McArdle myophosphorylase deficiency; GSD V exercise cramps; muscle glycogen breakdown enzyme McArdle; disease enzyme correctly matched McArdle | pending GSD material owns the enzyme/disease association — pending |
| `mcardle-versus-tarui-comparison` · 1 | compare McArdle Tarui; myophosphorylase versus PFK deficiency; GSD V versus VII; McArdle Tarui clinical biochemical | pending GSD material owns both disease components; no accepted prior tested comparison — pending |
| `calcitriol-active-vitamin-d` · 1 | biologically active vitamin D calcitriol; active vitamin D form; calcidiol versus calcitriol; 1 25 dihydroxy vitamin D active | pending vitamin-D material owns the active-form distinction — pending |
| `ionized-calcium-biologically-active-fraction` · 1 | biologically active plasma calcium ionized; serum calcium fractions active; ionized versus protein bound calcium; active calcium fraction | pending calcium material owns the fraction distinction — pending |
| `vitamin-d-skin-liver-kidney-activation-sequence` · 3 | vitamin D activation sequence; skin liver kidney vitamin D; first hydroxylation liver; describe vitamin D synthesis activation | pending vitamin-D material owns the complete sequence — pending |
| `calcitriol-calbindin-intestinal-calcium-absorption` · 1 | vitamin D calbindin calcium absorption; calcitriol intestinal calcium protein; calbindin synthesis vitamin D; vitamin D gut calcium mechanism | pending vitamin-D material owns calbindin induction — pending |
| `adult-demineralized-bone-osteomalacia` · 1 | adult demineralized bone fractures osteomalacia; rickets versus osteomalacia adult; vitamin D deficiency adult bone; osteomalacia fracture diagnosis | pending vitamin-D/osteomalacia material owns the adult phenotype — pending |
| `fgf23-phosphate-lowering-role` · 1 | FGF23 phosphate regulation role; FGF23 phosphate lowering; fibroblast growth factor 23 phosphaturia; osteocyte FGF23 plasma phosphate | live state owns phosphate-triggered FGF23 but not the requested lowering-role scope; no pending complete handle or prior tested scope — new |

All **24 × 4 = 96** required assessment searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. The direct
source-handle result is **0 live / 23 pending / 1 new**. Exact accepted-prior comparison
removes the two already tested LCS handles, leaving a tested-concept delta of **0 live / 21
pending / 1 new = 22**. The 30 printed prompt occurrences remain counted even where their
scopes collapse or reuse prior concepts; no answer is inferred from any search result.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 54 | Family 54 delta | After Family 54 |
|---|---:|---:|---:|
| Eligible observed question records | 480 | +30 | 510 |
| Eligible printed question keys | 264 | +0 | 264 |
| Eligible distinct tested concepts | 224 | +22 | 246 |
| Question live / pending / new | 9 / 61 / 154 | +0 / +21 / +1 | 9 / 82 / 155 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 309 verified minimum | +0 | 309 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,098 verified minimum | +0 | 2,098 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 92 | +0 | 92 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 71 | +0 / +0 / +0 | 0 / 0 / 71 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `30 = 22 MCQs + 8 written`, `30 prompt
occurrences collapse to 24 handles`, `24 = 2 prior eligible reuses + 21 pending additions +
1 new addition`, `480 + 30 = 510`, `264 + 0 = 264`, `224 + 22 = 246`, `9 + 82 + 155 =
246`, `309 + 0 = 309`, `2,098 + 0 = 2,098`, `92 + 0 = 92`, and `71 + 0 = 71`.

This source hash occurs once in the manifest. Removing it from the accepted Family-53
remainder leaves **22 rank-4/rank-5 path instances / 20 unique hashes**. The Family-53
method was reproduced first: its 23/21 row sets recomputed to
`51369aec195ab6614119fae66193f800a07fb682192fab6dcf310490c47c4221` and
`362bb3986aea43034da3a6ec4ed81def25c7b907bc8b4effd1fbfb218193386d`.
For the exact post-Family-54 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`18408ea1128ac8614594cc65604e168fcf83b17d18ee8c8d0f5ea5902e677fc9`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`4929d719e8d12036f78ab78bc9adc2a523dfe0788abf97a049f2ca62481a2102`.
The next rank-4/rank-5 manifest-order gate is tier-5 Histology practical source
`src_a5deaaf750c18cfcf6ed`, `Virtual lab (1) bms 103.pdf` (2,242,092 bytes; 27 native-text
pages; SHA-256 `a5deaaf750c18cfcf6ed2053d57aebd113b32981d8ce66ecb523d258186aedc9`)
under `Year 1/LCS 103/Histology/Practical Labs/Virtual Lab 1 - Bone/`. Tier-6 source debts
between the two manifest indices remain outside this rank-4/rank-5 remainder. Broader
LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update, import or
source copy was created.

## Family 55 — Tier-5 Histology practical Virtual Lab 1 bone teaching deck

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_a5deaaf750c18cfcf6ed` |
| File / SHA-256 | `Virtual lab (1) bms 103.pdf` / `a5deaaf750c18cfcf6ed2053d57aebd113b32981d8ce66ecb523d258186aedc9` |
| File boundary | 2,242,092 bytes · unencrypted PDF · 27 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Histology · Practical Labs · tier 5 |
| Local corpus path | `Year 1/LCS 103/Histology/Practical Labs/Virtual Lab 1 - Bone/Virtual lab (1) bms 103.pdf` |
| Visible provenance | p. 1 prints `Virtual lab (1)`, `Bone` and `Histology department`; creator is Microsoft PowerPoint 2016 and producer is ilovepdf; no named author, university, assessment or sitting label is printed |
| Authority finding | Manifest/path-placed local tier-5 Histology practical teaching evidence. It is not a sitting paper, station sheet, response form, question bank or official answer key. |

The SHA-256, byte size and 27-page boundary were recomputed and match the assigned source.
All 27 pages were rendered at 180 dpi and read against the native text layer; all 27 complete
page renders have distinct SHA-256 values. Page 1 is title/provenance, p. 2 states objectives,
p. 3 is a decorative bone/skeleton divider, pp. 4–26 contain the complete practical teaching
sequence, and p. 27 is the closing `Thank you` slide.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. The preparation workflow, lists, labelled light/electron
micrographs, diagrams, numbered structures and epiphyseal-zone descriptions are all
simultaneous declarative teaching. No page asks the learner to identify or supply anything,
prints a response field or answer blank, awards marks, provides an option set, masks a label,
or reveals an answer after an assessment stem. The p. 2 objectives and p. 4 `How to prepare`
heading are instructional framing, not learner tasks.

### Complete practical-plate, mapping and residue inventory

One mapping is one distinct directly printed specimen label, preparation reagent/outcome,
cell-to-role/site relation, named structural component or zone-to-appearance relation. A
repeated arrow or duplicate wording on the same plate is counted once; slide titles,
publisher marks and an unlabelled image identity are not mappings. Related mappings on
different source-distinct plates remain separate evidence occurrences.

| Physical pages | Source-first practical teaching composition | Plate occurrences | Directly printed unique mappings / residue |
|---:|---|---:|---:|
| 4–7 | decalcified-versus-ground-bone preparation and ground-bone readout; pp. 5–6 label osteocyte lacunae, canaliculi and Haversian canals, while p. 7 is unlabelled | 4 | 16 mappings |
| 8 | resting osteogenic cells, active osteoblasts, osteocytes and osteoclasts | 1 | 4 mappings |
| 9–10 | osteoblast bone-forming role, surface location, osteoid secretion and diagram/micrograph identification | 2 | 10 mappings |
| 11–13 | osteocyte location/process relations, LM labels and EM nucleus/process identification | 3 | 8 mappings |
| 14–15 | osteoclast remodelling/resorption/lysosomal-enzyme relations and EM plate | 2 | 3 mappings; p. 15 has 4 unresolved printed callouts (`M`, `bv`, `N`, `B`) without a legend |
| 16 | compact, cancellous/spongy, ground and growing forms of bone | 1 | 4 mappings |
| 17–19 | compact-bone architecture: Haversian systems/canals, circumferential/interstitial lamellae, periosteum, endosteum, Volkmann canals and osteocyte lacunae | 3 | 13 mappings |
| 20–22 | cancellous-bone trabeculae, marrow and osteocytes in lacunae; p. 22 is an unlabelled example | 3 | 5 mappings; p. 20 has 1 unexplained printed numeral (`4`) |
| 23 | osteogenesis definition and intramembranous/flat-bone versus endochondral/long-bone relations | 1 | 5 mappings |
| 24–26 | epiphyseal-plate growth context, five ordered zones and their characteristic cell/matrix changes | 3 | 12 mappings; p. 26 has 4 unresolved printed callouts (`a`, `b`, `c`, `e`) without a legend |
| **Total** | **source-distinct practical teaching evidence** | **23** | **80 mappings; 9 unresolved callouts** |

The **23 content-page occurrences are 23 source-distinct practical teaching plates**. The
four non-plate pages are the title, objectives, decorative divider and close (pp. 1–3 and
27). No exact complete-page copy is present. The mapping arithmetic is `16 + 4 + 10 + 8 +
3 + 4 + 13 + 5 + 5 + 12 = 80`; the residue arithmetic is `4 + 1 + 4 = 9`. The isolated
prose glyph after `periosteum` on p. 25 is a typographic artifact, not an image callout,
mask or response blank, and is not promoted into either count. The assessment boundary is
therefore **23 practical teaching plates / 80 printed teaching mappings / 9 unresolved
teaching callouts / 0 practical or station prompts / 0 ordinary questions / 0 printed
assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 23 plates consolidate to ten source-level practical teaching scopes. Scope collapse does
not delete plate, mapping, page or source-wording evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `bone-histology-preparation-and-ground-bone-readout` · pp. 4–7 | bone histology preparation decalcified ground; acid EDTA decalcified bone section; carborundum ground bone lacunae canaliculi; ground bone Haversian canal osteocyte lacuna | pending bone-matrix/classification material owns preparation and demonstrated structures; exact accepted Family-13 `bone-histology-preparation-ground-vs-decalcified` owns the same core — prior LCS reuse |
| `bone-cell-four-class-practical-overview` · p. 8 | osteogenic osteoblast osteocyte osteoclast overview; bone cell types histology diagram; resting osteogenic active osteoblast; identify four bone cells | pending bone-cell material plus accepted Family-13 bone-cell handles jointly own the four-class overview — prior LCS reuse |
| `osteoblast-lm-identification-site-and-osteoid-role` · pp. 9–10 | osteoblast histology identification bone surface; osteoblast bone forming cell; osteoblast osteoid ground substance secretion; osteoblast row bone matrix micrograph | pending bone-cell material owns site, appearance and osteoid role; accepted Family-13 `osteoblast-bone-forming-cell-alkaline-phosphatase` owns the practical core — prior LCS reuse |
| `osteocyte-lm-em-lacuna-canaliculi-identification` · pp. 11–13 | osteocyte lacuna canaliculi histology; osteocyte cytoplasmic process canaliculus; EM osteocyte nucleus process lacuna; osteocyte Haversian canal micrograph | pending bone-cell/compact-bone material owns the LM/EM relations; accepted Family-13 osteocyte handles jointly own the same core — prior LCS reuse |
| `osteoclast-lm-em-identification-and-resorption-role` · pp. 14–15 | osteoclast histology identification multinucleated; EM osteoclast micrograph; osteoclast lysosomal enzymes resorption; osteoclast remodeling bone | pending bone-cell material owns the practical appearance/mechanism; accepted Family-13 osteoclast identity/resorption/remodelling handles own the same core — prior LCS reuse |
| `four-forms-of-bone-practical-overview` · p. 16 | forms of bone compact cancellous ground growing; compact spongy ground growing bone list; bone histology practical forms overview; four forms bone slide | no single substantive live/pending record or accepted prior-LCS handle owns this exact four-form practical overview — new |
| `compact-bone-practical-architecture-and-identification` · pp. 17–19 | compact bone histology Haversian system; circumferential interstitial lamellae diagram; Volkmann canal periosteum endosteum; decalcified compact bone osteocyte lacunae | pending compact-bone material owns the complete architecture; accepted Family-13 osteon, canal, lamella and compact-bone handles jointly own the same core — prior LCS reuse |
| `cancellous-bone-practical-identification-and-components` · pp. 20–22 | cancellous bone histology trabeculae marrow; spongy bone osteocyte lacunae; identify bone trabecula bone marrow; cancellous bone practical micrograph | pending compact/spongy material owns the components and appearance; accepted Family-13 spongy-bone architecture handle owns the same core — prior LCS reuse |
| `intramembranous-versus-endochondral-ossification-sites` · p. 23 | intramembranous flat bone endochondral long bone; two mechanisms osteogenesis; bone formation mechanism by bone type; endochondral most bones body | pending ossification material owns both routes/sites; accepted Family-13 route handles own the same core — prior LCS reuse |
| `epiphyseal-plate-five-zone-sequence-and-appearance` · pp. 24–26 | epiphyseal plate five zones histology; resting proliferating hypertrophic calcification ossification zones; growth plate zone cell changes; epiphysis to diaphysis zone sequence | pending ossification material owns the ordered zones and changes; exact accepted Family-13 `epiphyseal-plate-zone-sequence-cell-changes` owns the same core — prior LCS reuse |

All **10 × 4 = 40** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **0 live / 9 pending / 1 new**. Exact accepted-
prior comparison prevents nine repeated module additions, leaving **nine prior-LCS reuses /
one new practical-teaching scope**. There is no assessment handle to search; declarative
teaching scopes do not enter the eligible tested-concept count.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 55 | Family 55 delta | After Family 55 |
|---|---:|---:|---:|
| Eligible observed question records | 510 | +0 | 510 |
| Eligible printed question keys | 264 | +0 | 264 |
| Eligible distinct tested concepts | 246 | +0 | 246 |
| Question live / pending / new | 9 / 82 / 155 | +0 / +0 / +0 | 9 / 82 / 155 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 309 verified minimum | +23 | 332 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,098 verified minimum | +80 | 2,178 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 92 | +9 | 101 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 71 | +0 / +0 / +1 | 0 / 0 / 72 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `27 = 4 non-plate pages + 23 plates`, `23 = 4
+ 1 + 2 + 3 + 2 + 1 + 3 + 3 + 1 + 3`, `80 = 16 + 4 + 10 + 8 + 3 + 4 + 13 + 5 +
5 + 12`, `9 = 4 + 1 + 4`, `510 + 0 = 510`, `264 + 0 = 264`, `246 + 0 = 246`, `9 +
82 + 155 = 246`, `309 + 23 = 332`, `2,098 + 80 = 2,178`, `92 + 9 = 101`, and `71 +
1 = 72`.

This source hash occurs once in the manifest. Removing it from the accepted Family-54
remainder leaves **21 rank-4/rank-5 path instances / 19 unique hashes**. The Family-54
method was reproduced first: its 22/20 row sets recomputed to
`18408ea1128ac8614594cc65604e168fcf83b17d18ee8c8d0f5ea5902e677fc9` and
`4929d719e8d12036f78ab78bc9adc2a523dfe0788abf97a049f2ca62481a2102`.
For the exact post-Family-55 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`ab82b6bd8e7bfdaca0d23519f244ab779ebfb9e2d3b145bdd71d2790ee2c7a20`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`2bbca0d6bb11bd9faed141b2583364d04959195cf5af48425afa693ecb3dfa52`.
The next rank-4/rank-5 manifest-order gate is tier-5 Histology practical source
`src_d96c2b7e91e21bab3ee1`, `download.pdf` (7,762,323 bytes; 59 native-text pages;
SHA-256 `d96c2b7e91e21bab3ee1dab0ccdcb09287e712379293f594e8df562c9d69f591`)
under `Year 1/LCS 103/Histology/Practical Labs/Virtual Lab 2 - Cartilage & Muscle/`. Tier-6
source debts between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1
remains incomplete. No download, ID, content record, catalogue update, import or source copy
was created.

## Family 56 — Tier-5 Histology practical Virtual Lab 2 cartilage-and-muscle teaching deck

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_d96c2b7e91e21bab3ee1` |
| Manifest file / SHA-256 | `download.pdf` / `d96c2b7e91e21bab3ee1dab0ccdcb09287e712379293f594e8df562c9d69f591` |
| File boundary | 7,762,323 bytes · unencrypted PDF · 59 physical native-text pages · 720 × 405 pt |
| Manifest placement | `HU-LCS-103` · Histology · Practical Labs · `Virtual Lab 2 - Cartilage & Muscle` · tier 5 |
| Local corpus path used | `Year 1/LCS 103/Histology/Practical Labs/Virtual Lab 2 - Cartilage & Muscle/Cartilage and Muscle Virtual Lab.pdf` |
| Name reconciliation | The manifest-named `download.pdf` path is absent locally, but the organised local file above recomputes to the manifest SHA-256 and byte size exactly; it is the same accepted source under a descriptive filename. |
| Visible provenance | p. 1 prints `Histology virtual lab`, `cartilage and muscles` and `Dr. Salma`; creator is WPS Presentation, with blank title/author/producer metadata and no assessment or sitting label |
| Authority finding | Manifest/path-placed local tier-5 Histology practical teaching evidence. It is not a sitting paper, station sheet, response form, question bank or official answer key. |

The SHA-256, byte size and 59-page boundary were recomputed and match the assigned source.
All 59 pages were rendered at 180 dpi and read against the native text layer; all 59 complete
page renders have distinct SHA-256 values. Page 1 is title/provenance, p. 2 is the cartilage
divider, pp. 3–28 are the complete cartilage teaching sequence, p. 29 is the muscle divider,
pp. 30–58 are the complete muscle teaching sequence, and p. 59 is the closing slide.

The full-source gate finds **zero ordinary questions, zero practical/station prompts and zero
printed assessment keys**. The p. 4 `WHAT IS CARTILAGE MADE OF?` and repeated `LOCATION?`
headings are rhetorical teaching headings immediately answered on the same slide; they do not
request a learner response. Lists, labelled micrographs, diagrams, abbreviations and numbered
structures likewise remain simultaneous declarative teaching. No page prints a response field,
answer blank, mark allocation, option set, masked label or delayed answer reveal.

### Complete practical-plate, mapping and residue inventory

One mapping is one distinct directly printed specimen label, type-to-site relation,
cell-to-location/role relation, matrix/fibre/stain relation or named structural component. A
repeated arrow or duplicate wording on the same plate is counted once; slide titles and an
unlabelled image identity are not mappings. Related mappings on different source-distinct
plates remain separate evidence occurrences. A letter, numeral or abbreviation embedded in a
micrograph without a local legend is retained as an unresolved teaching callout, never inferred
as either a mapping or an assessment blank.

| Physical pages | Source-first practical teaching composition | Plate occurrences | Directly printed unique mappings / residue |
|---:|---|---:|---:|
| 3–4 | three cartilage types and cartilage cell/matrix/fibre/perichondrium composition | 2 | 9 mappings |
| 5–8 | hyaline-cartilage sites, two-layer perichondrium, detailed layer contents and four functions | 4 | 26 mappings; pp. 7–8 have 4 unresolved `P`/`C` callouts |
| 9–13 | chondroblast/chondrocyte comparison, isogenous groups, territorial/interterritorial matrix and labelled overview | 5 | 32 mappings; p. 13 has 4 unresolved embedded `P`/`C`/`M`/`C` callouts |
| 14–16 | hyaline-cartilage labelled LM examples; p. 16 is unlabelled | 3 | 6 mappings |
| 17–23 | elastic-cartilage sites, composition, Verhoeff stain relation and labelled practical examples | 7 | 23 mappings; pp. 20–21 have 5 unresolved `E`/`Ch`/`L` and `1`/`2` callouts |
| 24–28 | fibrocartilage sites, type-I-collagen/rowed-chondrocyte phenotype and labelled examples | 5 | 18 mappings |
| 30–34 | skeletal/cardiac/smooth overview, skeletal connective-tissue hierarchy and labelled longitudinal phenotype | 5 | 37 mappings |
| 35–40 | skeletal longitudinal/transverse teaching micrographs and connective-tissue labels; pp. 35–36 and 39 are unlabelled | 6 | 8 mappings |
| 41–43 | sarcomere diagram and EM band/line architecture; p. 43 is otherwise unlabelled | 3 | 15 mappings; p. 43 has 3 unresolved `Z`/`I`/`A` callouts |
| 44–48 | cardiac-fibre LM phenotype, intercalated-disc junction diagram and labelled examples | 5 | 34 mappings |
| 49–52 | cardiac-muscle EM, intercalated-disc orientation and named junction components | 4 | 10 mappings; pp. 49–50 have 12 unresolved image callouts (`D` plus 11 printed letter/abbreviation occurrences) |
| 53–58 | smooth-muscle LM phenotype, contraction states, dense-body/caveolae ultrastructure and diagram; pp. 55 and 58 are otherwise unlabelled | 6 | 27 mappings; p. 55 has 6 unresolved `C`/`N`/`SM`/`CT`/`SM`/`N` callouts |
| **Total** | **source-distinct practical teaching evidence** | **55** | **245 mappings; 34 unresolved callouts** |

The **55 content-page occurrences are 55 source-distinct practical teaching plates**. The
four non-plate pages are the title, two section dividers and close (pp. 1–2, 29 and 59).
No exact complete-page copy is present. Cartilage arithmetic is `26 plates = 2 + 4 + 5 +
3 + 7 + 5`, `114 mappings = 9 + 26 + 32 + 6 + 23 + 18`, and `13 residues = 4 + 4 +
5`. Muscle arithmetic is `29 plates = 5 + 6 + 3 + 5 + 4 + 6`, `131 mappings = 37 +
8 + 15 + 34 + 10 + 27`, and `21 residues = 3 + 12 + 6`. The assessment boundary is
therefore **55 practical teaching plates / 245 printed teaching mappings / 34 unresolved
teaching callouts / 0 practical or station prompts / 0 ordinary questions / 0 response
blanks / 0 printed assessment keys**.

### Source-first teaching scopes, searches and prior-LCS adjudication

The 55 plates consolidate to fourteen source-level practical teaching scopes. Scope collapse
does not delete plate, mapping, page or source-wording evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `cartilage-three-type-practical-overview-and-composition` · pp. 3–4 | three cartilage types practical; cartilage cell matrix fiber perichondrium; hyaline elastic fibrocartilage overview; cartilage composition histology | pending cartilage-type/cell material jointly owns the overview; accepted Family-13 classification/cell/matrix handles own the same core — prior LCS reuse |
| `cartilage-type-anatomic-sites` · pp. 5, 17, 24 | hyaline elastic fibrocartilage sites; trachea epiglottis intervertebral disc cartilage; cartilage type location practical; identify cartilage by site | pending cartilage-types material owns the site sets; exact accepted Family-13 `cartilage-types-anatomic-sites` owns the same core — prior LCS reuse |
| `hyaline-perichondrium-layers-contents-and-functions` · pp. 6–8 | perichondrium two layers histology; outer fibrous inner chondrogenic; perichondrium nutrition growth protection; perichondrium blood vessels nerves chondroblasts | pending cartilage-cell/written material owns both layers and functions; accepted Family-13 perichondrium handle owns the same core — prior LCS reuse |
| `chondroblast-chondrocyte-isogenous-group-practical` · pp. 9–10 | chondroblast chondrocyte histology comparison; cartilage lacuna cell nest; isogenous group chondrocytes; identify cartilage cells micrograph | pending cartilage-cell material owns the full relation; accepted Family-13 chondroblast/chondrocyte and cell-nest handles jointly own the same core — prior LCS reuse |
| `hyaline-matrix-and-lm-identification` · pp. 11–16 | territorial interterritorial cartilage matrix; hyaline cartilage LM identification; chondrocyte lacuna perichondrium micrograph; cartilage matrix basophilia practical | pending cartilage-cell/type material owns the matrix and demonstrated phenotype; accepted Family-13 matrix, lacuna and hyaline handles jointly own the practical core — prior LCS reuse |
| `elastic-cartilage-verhoeff-stain-and-practical-identification` · pp. 17–23 | elastic cartilage Verhoeff stain; elastin blue black cartilage; elastic cartilage micrograph identification; ear pinna elastic fibers practical | pending Histology material owns the special-stain/appearance scope; accepted Family-13 handles own the sites and fibre composition but not the complete special-stain practical identity — new practical teaching scope |
| `fibrocartilage-sites-features-and-practical-identification` · pp. 24–28 | fibrocartilage histology identification; type I collagen chondrocyte rows; fibrocartilage sites shoulder hip meniscus; fibrocartilage no perichondrium practical | pending cartilage-types material owns the complete phenotype/sites; accepted Family-13 fibrocartilage and site handles own the same core — prior LCS reuse |
| `muscle-three-type-histology-practical-overview` · p. 30 | skeletal cardiac smooth histology comparison; striated voluntary involuntary muscle; three muscle types practical; identify muscle types morphology | pending comparison material owns the complete overview; exact accepted Family-14 `muscle-type-histology-comparison` owns the same core — prior LCS reuse |
| `skeletal-muscle-connective-tissue-hierarchy` · pp. 31, 38–40 | epimysium perimysium endomysium; skeletal muscle fascicle hierarchy; muscle connective tissue labels; muscle fiber covering practical | pending skeletal-muscle material owns the hierarchy; exact accepted Family-14 connective-tissue handle owns the same core — prior LCS reuse |
| `skeletal-muscle-lm-longitudinal-transverse-identification` · pp. 32–37 | skeletal muscle longitudinal section histology; skeletal muscle transverse section nuclei; multinucleated peripheral striated fiber; skeletal muscle LM practical identification | pending skeletal-muscle material owns the full phenotype; exact accepted Family-14 skeletal-LM handle owns the same core — prior LCS reuse |
| `skeletal-sarcomere-band-line-em-identification` · pp. 41–43 | sarcomere EM A I H M Z; skeletal muscle band line identification; sarcomere diagram practical; myofilament sarcomere ultrastructure | live `ART-MSK-TOP-B54C248DF1` owns the band/line architecture; exact accepted Family-14 sarcomere handle owns the same core — prior LCS reuse |
| `cardiac-muscle-lm-practical-phenotype` · pp. 44, 46–47 | cardiac muscle LM identification; branched central nucleus cardiac fiber; cardiac striations intercalated disc micrograph; cardiac muscle histology practical | pending cardiac-muscle material owns the phenotype; exact accepted Family-14 cardiac-myocyte handle owns the same core — prior LCS reuse |
| `intercalated-disc-lm-em-components-and-identification` · pp. 45, 48–52 | intercalated disc EM identification; fascia adherens desmosome gap junction; transverse lateral intercalated disc; cardiac junction micrograph practical | pending cardiac-muscle material owns both orientations and junctions; exact accepted Family-14 intercalated-disc handle owns the same core — prior LCS reuse |
| `smooth-muscle-lm-em-dense-body-caveolae-identification` · pp. 53–58 | smooth muscle LM EM identification; fusiform central nucleus smooth muscle; dense bodies caveolae practical; smooth muscle no T tubule histology | pending smooth-muscle material owns LM and ultrastructure; accepted Family-14 smooth phenotype and dense-body/caveolae handles jointly own the same core — prior LCS reuse |

All **14 × 4 = 56** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **1 live / 13 pending / 0 new**. Exact accepted-
prior comparison prevents thirteen repeated module additions, leaving **thirteen prior-LCS
reuses / one new practical-teaching scope**. There is no assessment handle to search;
declarative teaching scopes do not enter the eligible tested-concept count.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 56 | Family 56 delta | After Family 56 |
|---|---:|---:|---:|
| Eligible observed question records | 510 | +0 | 510 |
| Eligible printed question keys | 264 | +0 | 264 |
| Eligible distinct tested concepts | 246 | +0 | 246 |
| Question live / pending / new | 9 / 82 / 155 | +0 / +0 / +0 | 9 / 82 / 155 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 332 verified minimum | +55 | 387 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,178 verified minimum | +245 | 2,423 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 101 | +34 | 135 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 72 | +0 / +0 / +1 | 0 / 0 / 73 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `59 = 4 non-plate pages + 55 plates`, `55 =
26 cartilage + 29 muscle`, `245 = 114 + 131`, `34 = 13 + 21`, `510 + 0 = 510`, `264
+ 0 = 264`, `246 + 0 = 246`, `9 + 82 + 155 = 246`, `332 + 55 = 387`, `2,178 +
245 = 2,423`, `101 + 34 = 135`, and `72 + 1 = 73`.

This source hash occurs once in the manifest. Removing it from the accepted Family-55
remainder leaves **20 rank-4/rank-5 path instances / 18 unique hashes**. The Family-55
method was reproduced first: its 21/19 row sets recomputed to
`ab82b6bd8e7bfdaca0d23519f244ab779ebfb9e2d3b145bdd71d2790ee2c7a20` and
`2bbca0d6bb11bd9faed141b2583364d04959195cf5af48425afa693ecb3dfa52`.
For the exact post-Family-56 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`0b03bff5371fa3e2a22d0c4ba0f459133a947f84f01771f6afaa59b845c8ce3a`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`69405653348e8adb9db144dcbc722feb6e6ae5c36e44f55d88cc1208fb5a4196`.
The next rank-4/rank-5 manifest-order gate is tier-4 Histology theoretical source
`src_252ae116a3911d2020a2`, `cartilage2  medical - record - Copy - Copy.pdf` (33
OCR-needed pages; SHA-256
`252ae116a3911d2020a2d814ccf5ec639b698ca9ba0e05320c245f793f7982e6`) under
`Year 1/LCS 103/Histology/Theoretical/Lec 1 - Cartilage/`. Tier-6 and rank-9 source debts
between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.


## Family 57 — Tier-4 Histology cartilage lecture with one unkeyed self-test MCQ

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_252ae116a3911d2020a2` |
| Manifest file / SHA-256 | `cartilage2  medical - record - Copy - Copy.pdf` / `252ae116a3911d2020a2d814ccf5ec639b698ca9ba0e05320c245f793f7982e6` |
| File boundary | 2,291,006 bytes · unencrypted PDF · 33 physical OCR-needed pages · 792 × 612 pt |
| Manifest placement | `HU-LCS-103` · Histology · Theoretical · `Lec 1 - Cartilage` · tier 4 |
| Local corpus path used | `Year 1/LCS 103/Histology/Theoretical/Lec 1 - Cartilage/cartilage2 medical - record.pdf` |
| Name reconciliation | The exact manifest-named path is absent locally, but the organised one-space filename above recomputes to the assigned SHA-256 and byte size exactly; it is the same source under a normalised local name. |
| Visible provenance | p. 2 prints `CARTILAGE`, `DR\HEBA ABD ALRAZAK`, `Lecturer of histology Helwan University`; the dated footer on pp. 31–32 prints `11 May 2026` and `Module: BMS-101`, retained as an internal module-label conflict with the LCS-103 manifest/path placement |
| Authority finding | Direct local Helwan-labelled tier-4 teaching lecture under the assigned LCS-103 corpus path. It is not a sitting paper, question bank, practical response form or official answer key; the stale/conflicting `BMS-101` footer is preserved rather than silently normalised. |

The SHA-256, byte size and 33-page boundary were recomputed and match the assigned source.
All 33 pages were rendered at 180 dpi and visually read with page-level OCR support; all 33
complete-page renders have distinct SHA-256 values. Page 1 is a devotional opener, p. 2 is
title/provenance, p. 3 states objectives, pp. 4–31 contain the complete cartilage lecture,
p. 32 is a single `TEST YOUR SELF` multiple-choice prompt, and p. 33 is the closing slide.

The p. 3 `Mention`/`Describe` lines are learning objectives, not learner response tasks. All
lists, arrows, micrographs and diagrams on pp. 4–31 are simultaneous declarative teaching.
The arrows on pp. 15–17 point to structures identified by the adjacent chondroblast prose;
all other embedded labels are likewise legible, so there is **no masked or unresolved
teaching callout**. Page 32 alone has an interrogative stem plus four mutually exclusive
lettered options and therefore is an ordinary formative MCQ. The lecture states the relevant
site facts earlier, but neither p. 32 nor p. 33 prints a correctness mark, answer letter or
delayed reveal; no key is inferred from teaching order.

### Complete teaching-composition and assessment-boundary inventory

| Physical pages | Source-first instructional composition | Teaching occurrences | Ordinary prompts | Printed keys |
|---:|---|---:|---:|---:|
| 4–6 | cartilage definition, general characters and mechanical/support functions | 3 | 0 | 0 |
| 7–9 | cells/fibres/matrix composition, three-type classification and labelled comparison | 3 | 0 | 0 |
| 10–14 | hyaline appearance/sites, perichondrium structure and perichondrial functions | 5 | 0 | 0 |
| 15–18 | chondroblast origin, site, LM morphology, functions and unlabelled EM | 4 | 0 | 0 |
| 19–23 | chondrocyte morphology/division/function plus type-II collagen and ground substance | 5 | 0 | 0 |
| 24–25 | yellow elastic cartilage structure and sites | 2 | 0 | 0 |
| 26–29 | white fibrocartilage structure, lack of perichondrium, sites and toughness | 4 | 0 | 0 |
| 30 | intervertebral-disc annulus/nucleus structure and prolapse/root-compression relation | 1 | 0 | 0 |
| 31 | appositional versus interstitial cartilage growth | 1 | 0 | 0 |
| 32 | `Where are Sites of hyaline cartilage?` with options A–D | 0 | 1 | 0 |
| **Total** | **complete content boundary** | **28** | **1** | **0** |

The **28 teaching-slide occurrences are 28 source-distinct instructional compositions**.
Complete-render SHA-256 and semantic comparison found no full-page copy to collapse. The
source boundary is therefore **28 teaching compositions / 1 ordinary MCQ / 0 printed keys /
0 practical or station prompts / 0 response blanks / 0 masked assessment callouts / 0
unresolved teaching callouts**. As theoretical material, it adds **0 practical plates, 0
practical mappings and 0 practical residues** to the separated tier-5 ledger.

### One-to-one assessment assignment, search and disposition

| Prompt assignment → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 32 → `hyaline-cartilage-growth-plate-and-articular-sites` | hyaline cartilage sites; epiphyseal plate articular surface hyaline; elastic fibrocartilage site distractors; where is hyaline cartilage found | pending `ART-103-HIS-CARTILAGE-TYPES` owns the site table; exact accepted Family-13 `hyaline-cartilage-growth-plate-articular-fetal-sites` and Family-56 cartilage-site scope own this same tested objective | pending; prior-LCS scope reuse; new to eligible LCS because the prior exact prompt family was external-only |

The one occurrence is one source-distinct tested handle: `1 - 0 repeats = 1`. Its four
required searches completed across live state, pending state, all source-import roots and
accepted prior LCS. Assessment disposition is **0 live / 1 pending / 0 new = 1**. The option
pair that matches the earlier teaching is not promoted into a key; the printed-key delta is
zero.

### Source-first theoretical scopes, searches and prior-LCS adjudication

The 28 teaching compositions consolidate to eleven source-level theoretical scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `cartilage-definition-general-characters-and-functions` · pp. 4–6 | cartilage definition firm rubbery matrix; cartilage mesenchymal avascular diffusion; cartilage no lymphatics nerves; cartilage support attachment airway shock absorption | pending cartilage material owns the characteristics/functions; accepted Family-13 general cartilage handles and Family-56 overview jointly own the core — prior LCS reuse |
| `cartilage-composition-and-three-type-classification` · pp. 7–9 | cartilage cells fibers ground substance; chondroblast chondrocyte collagen elastic; three types cartilage classification; hyaline elastic fibrocartilage matrix comparison | pending cartilage cell/type material owns the composition/classification; accepted Families 13 and 56 own the same core — prior LCS reuse |
| `hyaline-cartilage-appearance-and-sites` · pp. 10–11 | hyaline cartilage glassy translucent; hyaline cartilage fetal skeleton; epiphyseal costal articular cartilage; respiratory passage hyaline cartilage | pending cartilage-types material owns appearance and sites; accepted Family-13 hyaline/site handles and Family-56 site scope own the core — prior LCS reuse |
| `perichondrium-structure-and-functions` · pp. 12–14 | perichondrium two layers; outer fibrous inner chondrogenic; perichondrium nutrition appositional growth; perichondrium muscle attachment articular absence | pending cartilage-cell/written material owns both layers and functions; accepted Family-13 and Family-56 perichondrium scopes own the same core — prior LCS reuse |
| `chondroblast-origin-lm-em-and-functions` · pp. 15–18 | chondroblast origin inner perichondrium; chondroblast LM basophilic spindle; chondroblast EM histology; chondroblast appositional growth collagen II | pending cartilage-cell material owns the phenotype/functions; accepted Family-13 and Family-56 chondroblast scopes own the same core — prior LCS reuse |
| `chondrocyte-morphology-isogenous-groups-and-functions` · pp. 19–21 | chondrocyte morphology lacuna nucleus; chondrocyte isogenous cell nest; mature chondrocyte cannot divide; chondrocyte matrix interstitial growth | pending cartilage-cell material owns the full relation; accepted Family-13 and Family-56 chondrocyte scopes own the same core — prior LCS reuse |
| `hyaline-type-ii-fibres-and-ground-substance` · pp. 22–23 | hyaline collagen II refractive index; cartilage collagen after ground substance digestion; cartilage proteoglycan chondroitin sulfate; cartilage matrix homogeneous basophilic | pending cartilage-cell/type material owns fibre and matrix composition; accepted Family-13 matrix handles and Family-56 hyaline-matrix scope own the core — prior LCS reuse |
| `yellow-elastic-cartilage-structure-and-sites` · pp. 24–25 | yellow elastic cartilage structure; elastic cartilage perichondrium collagen II; ear pinna epiglottis Eustachian tube cartilage; elastic cartilage branching fibers sites | pending cartilage-types material owns the structure/sites; accepted Family-13 and Family-56 elastic-cartilage scopes own the same core — prior LCS reuse |
| `white-fibrocartilage-structure-sites-and-function` · pp. 26–29 | white fibrocartilage collagen I rows; fibrocartilage no perichondrium; fibrocartilage sites meniscus symphysis; fibrocartilage strong tough function | pending cartilage-types material owns phenotype/sites; accepted Family-13 and Family-56 fibrocartilage scopes own the same core — prior LCS reuse |
| `intervertebral-disc-structure-prolapse-and-root-compression` · p. 30 | intervertebral disc annulus fibrosus nucleus pulposus; white fibrocartilage disc structure; nucleus pulposus herniation; disc prolapse nerve root compression | pending Histology/Anatomy material owns the complete structure/clinical relation; accepted Family-17 owns clinical prolapse and accepted cartilage scopes own the site, but no prior LCS handle owns this complete composite — additive theoretical scope |
| `cartilage-appositional-versus-interstitial-growth` · p. 31 | cartilage appositional interstitial growth; chondroblast matrix outside cartilage; chondrocyte division inside cartilage; cartilage growth limited adults | pending cartilage-cell material owns both mechanisms; exact accepted Family-13 growth handle and Family-56 cell scopes own the same core — prior LCS reuse |

All **11 × 4 = 44** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **0 live / 11 pending / 0 new**. Exact accepted-
prior comparison prevents ten repeated module additions, leaving **ten prior-LCS reuses /
one additive theoretical teaching scope (pending)**. Together with the assessment handle,
Family 57 completed **48 required searches**. Declarative teaching scopes do not enter the
eligible tested-concept count, and no theoretical scope enters the practical-teaching-scope
counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 57 | Family 57 delta | After Family 57 |
|---|---:|---:|---:|
| Eligible observed question records | 510 | +1 | 511 |
| Eligible printed question keys | 264 | +0 | 264 |
| Eligible distinct tested concepts | 246 | +1 | 247 |
| Question live / pending / new | 9 / 82 / 155 | +0 / +1 / +0 | 9 / 83 / 155 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 387 verified minimum | +0 | 387 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,423 verified minimum | +0 | 2,423 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 135 | +0 | 135 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 73 | +0 / +0 / +0 | 0 / 0 / 73 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `33 = 4 framing/closing pages + 28 teaching
compositions + 1 assessment page`, `28 = 3 + 3 + 5 + 4 + 5 + 2 + 4 + 1 + 1`, `1 = 1
prompt - 0 repeats`, `511 = 510 + 1`, `264 = 264 + 0`, `247 = 246 + 1`, `9 + 83 +
155 = 247`, `387 + 0 = 387`, `2,423 + 0 = 2,423`, `135 + 0 = 135`, and `73 + 0 =
73`.

This source hash occurs once in the manifest. Removing it from the accepted Family-56
remainder leaves **19 rank-4/rank-5 path instances / 17 unique hashes**. The Family-56
method was reproduced first: its 20/18 row sets recomputed to
`0b03bff5371fa3e2a22d0c4ba0f459133a947f84f01771f6afaa59b845c8ce3a` and
`69405653348e8adb9db144dcbc722feb6e6ae5c36e44f55d88cc1208fb5a4196`.
For the exact post-Family-57 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`247e5121430294c35ac6d8c31c5564c9e47e1c793bcc4c419b5720bfc73b38dc`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`a17789d8e8d39545fecbcbb4763713a6187a1962fff7670222005cefbcabcf0b`.
The next rank-4/rank-5 manifest-order gate is tier-4 Histology theoretical source
`src_11f398fe99ee4128f6f8`, `bone 1 - record.pdf` (2,434,527 bytes; 42 OCR-needed pages;
SHA-256 `11f398fe99ee4128f6f87771ca1f5d0632a9a102c7e6cfce63f4e80120af5297`)
under `Year 1/LCS 103/Histology/Theoretical/Lec 2 - Bone I/`. Tier-6 and rank-9 source debts
between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.

## Family 58 — Tier-4 Histology Bone I lecture with one unkeyed self-test MCQ

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_11f398fe99ee4128f6f8` |
| Manifest file / SHA-256 | `bone 1 - record.pdf` / `11f398fe99ee4128f6f87771ca1f5d0632a9a102c7e6cfce63f4e80120af5297` |
| File boundary | 2,434,527 bytes · unencrypted PDF · 42 physical OCR-needed pages · 960.12 × 540 pt |
| Manifest placement | `HU-LCS-103` · Histology · Theoretical · `Lec 2 - Bone I` · tier 4 |
| Local corpus path | `Year 1/LCS 103/Histology/Theoretical/Lec 2 - Bone I/bone 1 - record.pdf` |
| Visible provenance | p. 2 prints `BONE PART I`, `DR\HEBA ABD ALRAZAK`, `Lecturer of Histology Helwan University`; creator is Microsoft PowerPoint 2016 and producer is ilovepdf |
| Authority finding | Direct local Helwan-labelled tier-4 teaching lecture under the assigned LCS-103 corpus path. It is not a sitting paper, question bank, practical response form or official answer key. |

The SHA-256, byte size and 42-page boundary were recomputed and match the assigned source.
All 42 pages were rendered at 180 dpi and visually read with page-level OCR support; all 42
complete-page renders have distinct SHA-256 values. Pages 1–3 are the devotional opener,
title/provenance and objectives; pp. 4–32 and 34–40 contain the complete Bone I lecture;
p. 33 is the bone-cell section divider, p. 41 is one `TEST YOUR SELF` multiple-choice
prompt, and p. 42 is the closing slide.

The p. 3 verbs are learning objectives rather than response tasks. Lists, tables, diagrams,
arrows and micrographs on the teaching pages are simultaneous declarative instruction. The
two electron micrographs on pp. 31–32 nevertheless contain **14 unexpanded teaching-symbol
occurrences** without a local legend: p. 31 prints `M`, `bv`, `N` and `B` once each; p. 32
prints `B`, `RF`, two asterisks and six `M` labels. They are preserved as unresolved teaching
callouts, not promoted into questions, response blanks or inferred mappings. Four of those
symbols recur on the already accepted Family-55 practical plate; this theoretical copy does
not increment the separated practical residue ledger. Page 41 alone has an interrogative stem
and four mutually exclusive lettered options. Neither it nor p. 42 prints a correctness mark,
answer letter or delayed reveal, so no key is inferred from the preceding osteoclast lesson.

### Complete teaching-composition and assessment-boundary inventory

| Physical pages | Source-first instructional composition | Teaching occurrences | Ordinary prompts | Printed keys |
|---:|---|---:|---:|---:|
| 4–8 | bone definition, general characters, components and organic/inorganic matrix | 5 | 0 | 0 |
| 9–12 | skeletal bone-shape classification and long-bone gross arrangement/coverings | 4 | 0 | 0 |
| 13–17 | periosteum, endosteum and four-bone-cell overview | 5 | 0 | 0 |
| 18–21 | decalcified/ground preparation and compact-versus-spongy architecture | 4 | 0 | 0 |
| 22–23 | four-cell overview and osteogenic-cell differentiation/formation diagram | 2 | 0 | 0 |
| 24–29 | osteoblast and osteocyte LM/EM, lacuna and canaliculi relations | 6 | 0 | 0 |
| 30–32 | osteoclast LM/EM and bone-resorption mechanism | 3 | 0 | 0 |
| 34–36 | four-cell origin, LM, EM and function comparison tables | 3 | 0 | 0 |
| 37–40 | osteoclast and osteocyte summary diagrams/micrographs | 4 | 0 | 0 |
| 41 | `What is bone destroying cell?` with options A–D | 0 | 1 | 0 |
| **Total** | **complete content boundary** | **36** | **1** | **0** |

The **36 teaching-page occurrences are 36 source-distinct instructional compositions**.
Complete-render SHA-256 and semantic comparison found no full-page copy to collapse. The
source boundary is therefore **36 teaching compositions / 1 ordinary MCQ / 0 printed keys /
0 practical or station prompts / 0 response blanks / 0 masked assessment callouts / 14
unresolved teaching-callout occurrences**. As theoretical material, it adds **0 practical
plates, 0 practical mappings and 0 practical residues** to the separated tier-5 ledger.

### One-to-one assessment assignment, search and disposition

| Prompt assignment → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 41 → `osteoclast-bone-resorption-identity` | bone destroying cell; osteoclast bone resorption; osteoblast osteocyte osteogenic distractors; what cell destroys bone | live bone-metabolism material owns activated osteoclast resorption; exact accepted Family-13 Q30/Q33/Q102 handle owns this tested objective | live; prior eligible-LCS reuse; inherited live; tested-concept delta +0 |

The one occurrence is one source-distinct question record, but its tested handle is already
eligible LCS evidence: `1 question - 0 repeated source occurrences = 1 record`, while `1
tested handle - 1 prior eligible handle = 0 new concepts`. Its four required searches
completed across live state, pending state, all source-import roots and accepted prior LCS.
The assessment disposition counts remain unchanged at **9 live / 83 pending / 155 new**.
The option consistent with the preceding lecture is not promoted into a printed key.

### Source-first theoretical scopes, searches and prior-LCS adjudication

The 36 teaching compositions consolidate to twelve source-level theoretical scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `bone-definition-general-characters-and-components` · pp. 4–7 | bone definition specialized connective tissue; bone general characters rigidity vascularity; bone cells fibers matrix components; bone support protection mineral storage | live/pending bone-overview material owns the definition and components; exact accepted Family-13 bone-definition handle and Family-55 overview own the core — prior LCS reuse |
| `bone-organic-inorganic-matrix-composition` · p. 8 | bone organic inorganic matrix percentage; type I collagen bone matrix; bone calcium phosphate hydroxyapatite; bone matrix acidophilic composition | pending bone-matrix material owns the composition; accepted Family-13 matrix handles own the same core — prior LCS reuse |
| `bone-shape-classification-and-long-bone-gross-layout` · pp. 9–12 | bone classification long short flat irregular; long bone diaphysis epiphysis metaphysis; compact cancellous medullary cavity; periosteum endosteum gross bone | pending bone-classification material owns the shapes and layout; accepted Family-13 classification/architecture handles and Family-55 overview own the core — prior LCS reuse |
| `periosteum-structure-and-functions` · pp. 13–15 | periosteum outer fibrous inner osteogenic; periosteum blood vessels nerves Sharpey fibers; periosteum appositional growth repair; periosteum absent articular surfaces | pending bone-covering material owns layers and functions; exact accepted Family-13 periosteum handle and Family-55 architecture scope own the core — prior LCS reuse |
| `endosteum-structure-and-functions` · p. 16 | endosteum medullary cavity lining; endosteum osteogenic cells; endosteum Haversian Volkmann canals; endosteum bone growth repair | pending bone-covering material owns the lining/functions; exact accepted Family-13 endosteum handle and Family-55 architecture scope own the core — prior LCS reuse |
| `four-bone-cell-overview-and-lineage` · pp. 17, 22–23 | osteogenic osteoblast osteocyte osteoclast overview; bone cell lineage differentiation; osteoprogenitor to osteoblast osteocyte; monocyte osteoclast origin | pending bone-cell material owns the four-cell comparison/lineage; accepted Family-13 cell handles and Family-55 four-cell scope own the core — prior LCS reuse |
| `bone-section-decalcification-versus-grinding` · pp. 18–19 | bone histology decalcified section; ground bone preparation; acid EDTA decalcification; ground versus decalcified bone structures | pending bone-preparation material owns both methods; exact accepted Family-13 preparation handle and Family-55 practical scope own the core — prior LCS reuse |
| `compact-spongy-bone-and-surface-covering-architecture` · pp. 20–21 | compact versus spongy bone histology; osteon trabeculae marrow spaces; periosteum endosteum bone surfaces; cortical cancellous architecture | pending compact/spongy material owns the architecture; accepted Family-13 osteon/trabecular handles and Family-55 architecture scopes own the core — prior LCS reuse |
| `osteoblast-identity-lm-and-bone-forming-role` · p. 24 | osteoblast LM basophilic cuboidal; osteoblast bone surface location; osteoblast osteoid secretion; osteoblast alkaline phosphatase bone forming | pending bone-cell material owns morphology and function; exact accepted Family-13 osteoblast handle and Family-55 osteoblast scope own the core — prior LCS reuse |
| `osteocyte-lm-em-lacuna-canaliculi-and-gap-junctions` · pp. 25–29, 39–40 | osteocyte lacuna canaliculi LM; osteocyte EM cytoplasmic processes; osteocyte gap junction nutrient exchange; osteocyte mature bone cell maintenance | pending bone-cell material owns LM/EM relations; accepted Family-13 osteocyte handles and Family-55 osteocyte scope own the core — prior LCS reuse |
| `osteoclast-lm-em-howship-lacuna-and-resorption` · pp. 30–32, 37–38 | osteoclast multinucleated Howship lacuna; osteoclast ruffled border clear zone; osteoclast acid lysosomal bone resorption; osteoclast LM EM identification | live/pending bone-cell material owns identity and the fuller morphology/mechanism; accepted Family-13 osteoclast handles and Family-55 osteoclast scope own the core — prior LCS reuse |
| `four-bone-cell-origin-lm-em-function-comparison` · pp. 34–36 | bone cells origin LM EM function table; osteogenic osteoblast osteocyte osteoclast comparison; bone cell organelles morphology; bone cell function summary | pending bone-cell material owns the complete comparison; accepted Family-13 comparison handles and Family-55 four-cell scope own the core — prior LCS reuse |

All **12 × 4 = 48** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **1 live / 11 pending / 0 new**. Exact accepted-
prior comparison prevents all twelve repeated module additions, leaving **twelve prior-LCS
reuses / zero additive theoretical scopes**. Together with the assessment handle, Family 58
completed **52 required searches**. Declarative teaching scopes do not enter the eligible
tested-concept count, and no theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 58 | Family 58 delta | After Family 58 |
|---|---:|---:|---:|
| Eligible observed question records | 511 | +1 | 512 |
| Eligible printed question keys | 264 | +0 | 264 |
| Eligible distinct tested concepts | 247 | +0 | 247 |
| Question live / pending / new | 9 / 83 / 155 | +0 / +0 / +0 | 9 / 83 / 155 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 387 verified minimum | +0 | 387 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,423 verified minimum | +0 | 2,423 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 135 | +0 | 135 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 73 | +0 / +0 / +0 | 0 / 0 / 73 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `42 = 5 framing/closing pages + 36 teaching
compositions + 1 assessment page`, `36 = 5 + 4 + 5 + 4 + 2 + 6 + 3 + 3 + 4`, `14 =
4 + 10 unresolved teaching callouts`, `1 = 1 prompt - 0 repeated source occurrences`,
`0 = 1 tested handle - 1 prior eligible handle`, `512 = 511 + 1`, `264 = 264 + 0`,
`247 = 247 + 0`, `9 + 83 + 155 = 247`, `387 + 0 = 387`, `2,423 + 0 = 2,423`,
`135 + 0 = 135`, and `73 + 0 = 73`.

This source hash occurs once in the manifest. Removing it from the accepted Family-57
remainder leaves **18 rank-4/rank-5 path instances / 16 unique hashes**. The Family-57
method was reproduced first: its 19/17 row sets recomputed to
`247e5121430294c35ac6d8c31c5564c9e47e1c793bcc4c419b5720bfc73b38dc` and
`a17789d8e8d39545fecbcbb4763713a6187a1962fff7670222005cefbcabcf0b`.
For the exact post-Family-58 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`1e804e4d469f96b798af573a12821abc0139c2bf72ac258c5ecf1b6060866e38`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`9ac9d209783727ed541fa2ba2d9b43b2b6b56d4e51adfa41410615eb14277f10`.
The next rank-4/rank-5 manifest-order gate is tier-4 Histology theoretical source
`src_bbe144643b8333dddcc2`, `bone part 2 RECOED.pdf` (4,135,104 bytes; 43 OCR-needed pages;
SHA-256 `bbe144643b8333dddcc2b729294e9f091c2089708f382e905c1c7b8b3cf7a669`)
under `Year 1/LCS 103/Histology/Theoretical/Lec 3 - Bone II/`. Tier-6 and rank-9 source debts
between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.

## Family 59 — Tier-4 Histology Bone II lecture with two unkeyed self-test MCQs

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_bbe144643b8333dddcc2` |
| Manifest file / SHA-256 | `bone part 2 RECOED.pdf` / `bbe144643b8333dddcc2b729294e9f091c2089708f382e905c1c7b8b3cf7a669` |
| File boundary | 4,135,104 bytes · unencrypted PDF · 43 physical OCR-needed pages · 360 × 216 pt |
| Manifest placement | `HU-LCS-103` · Histology · Theoretical · `Lec 3 - Bone II` · tier 4 |
| Local corpus path | `Year 1/LCS 103/Histology/Theoretical/Lec 3 - Bone II/bone part 2 RECOED.pdf` |
| Visible provenance | p. 2 prints `BONE PART II`, `DR\HEBA ABD ALRAZAK`, `Lecturer of Histology Helwan University`; p. 42 cites Junqueira's *Basic Histology: Text & Atlas*, 17th edition, by Anthony Mescher |
| Internal label conflict | The dated footer on p. 41 prints `11 May 2026` and `Module: BMS-101`; it is retained as a source-internal conflict with the LCS-103 manifest/path placement rather than silently normalised |
| Authority finding | Direct local Helwan-labelled tier-4 teaching lecture under the assigned LCS-103 corpus path. It is not a sitting paper, question bank, practical response form or official answer key. |

The SHA-256, byte size and 43-page boundary were recomputed and match the assigned source.
All 43 pages were rendered at 180 dpi and visually read with page-level OCR support; all 43
complete-page renders have distinct SHA-256 values. Pages 1–3 are the devotional opener,
title/provenance and objectives; pp. 4–40 contain the complete Bone II lecture; p. 41 is one
`TEST YOUR SELF` slide with two multiple-choice prompts, p. 42 is the reference slide, and
p. 43 is the closing slide.

The p. 3 verbs are learning objectives rather than response tasks. The numbered sequences,
lists, comparison table, diagrams, arrows and micrographs on pp. 4–40 are simultaneous
declarative teaching. Three images nevertheless contain **24 unresolved teaching-indicator
occurrences**: p. 14 has six numbered labels (`1`–`6`) without a legend; p. 36 has fourteen
unexpanded abbreviation occurrences (`ZRC`, `ZP`, `ZH`, `ZCC`, `ZR`, `M`, two `EB`, two
`CC`, `BM`, `Ocl`, `Ob`, `Oc`); and p. 38 has four unlabelled blue arrows. The ten p. 27
stage numbers and the p. 28/p. 35 panel letters are explicit sequence identifiers, not
unresolved structure labels. Page 41 alone contains learner-facing questions. No
correctness mark, answer letter or later reveal is printed, so neither option implied by the
preceding lesson is promoted into a key.

### Complete teaching-composition and assessment-boundary inventory

| Physical pages | Source-first instructional composition | Teaching occurrences | Ordinary prompts | Printed keys |
|---:|---|---:|---:|---:|
| 4 | axial/appendicular skeletal division, component groups and bone counts | 1 | 0 | 0 |
| 5–8 | bone characters/components plus anatomical shape classification | 4 | 0 | 0 |
| 9–13 | compact-bone sites, coverings, circumferential/interstitial lamellae, osteons and canals | 5 | 0 | 0 |
| 14–21 | compact-bone diagrams and source-distinct LM/ground-section teaching micrographs | 8 | 0 | 0 |
| 22–25 | spongy-bone architecture, mature/immature forms and compact/spongy comparison | 4 | 0 | 0 |
| 26–30 | intramembranous/endochondral routes, long-bone centre sequence and formation diagrams/micrographs | 5 | 0 | 0 |
| 31–35 | epiphyseal-cartilage zones, longitudinal remodelling and cutting/closing-cone remodelling | 5 | 0 | 0 |
| 36–40 | growth-plate/endochondral histology diagrams and micrographs | 5 | 0 | 0 |
| 41 | two `TEST YOUR SELF` MCQs | 0 | 2 | 0 |
| **Total** | **complete content boundary** | **37** | **2** | **0** |

The **37 teaching-page occurrences are 37 source-distinct instructional compositions**.
Complete-render SHA-256 and semantic comparison found no full-page copy to collapse. The
source boundary is therefore **37 teaching compositions / 2 ordinary MCQs / 0 printed keys /
0 practical or station prompts / 0 response blanks / 0 masked assessment callouts / 24
unresolved teaching indicators**. As theoretical material, it adds **0 practical plates, 0
practical mappings and 0 practical residues** to the separated tier-5 ledger.

### One-to-one assessment assignment, search and disposition

| Prompt assignment → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 41 first MCQ → `intramembranous-ossification-terminal-product` | intramembranous ossification terminal product; end replacement intramembranous bone; compact versus spongy intramembranous result; what does intramembranous ossification give | pending bone-ossification material owns the route and remodelling outcome; accepted Family-13 direct-formation handle owns the route but not this terminal-product discriminator | pending; new to eligible LCS |
| p. 41 second MCQ → `osteon-haversian-system-compact-bone-unit` | structural unit compact bone; Haversian system osteon; Haversian canal versus system; compact bone structural unit MCQ | live `ART-MSK-TOP-3E60C20647` owns the Haversian/osteon unit; exact accepted Family-13 Q4/Q40/Q47 handle owns this tested objective | live; prior eligible-LCS reuse; inherited live; tested-concept delta +0 |

The two occurrences are two source-distinct question records. Tested-handle collapse is `2
handles - 1 prior eligible handle = 1 new concept`. All **2 × 4 = 8** required assessment
searches completed across live state, pending state, all source-import roots and accepted
prior LCS. Assessment disposition is **0 live delta / 1 pending delta / 0 new delta** because
the live osteon handle is inherited rather than added. The source's option wording is
preserved without inferring either answer.

### Source-first theoretical scopes, searches and prior-LCS adjudication

The 37 teaching compositions consolidate to fifteen source-level theoretical scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `axial-appendicular-skeleton-divisions-and-bone-counts` · p. 4 | axial skeleton 80 bones; appendicular skeleton 126 bones; human skeleton 206 bones divisions; skull vertebral thoracic girdle limb counts | no substantive direct record or accepted prior-LCS complete scope owns the division/count map — additive theoretical scope |
| `bone-general-characters-components-and-matrix` · pp. 5–6 | bone solid vascular connective tissue; bone cells fibers matrix components; type I V collagen bone; calcium phosphate carbonate citrate matrix | pending bone-matrix material owns the complete composition; accepted Families 13 and 58 own the same core — prior LCS reuse |
| `bone-anatomical-shape-classification` · pp. 7–8 | long short flat irregular bones; sesamoid sutural bone classification; bone classification according shape; femur carpal vertebra skull examples | pending bone-classification material owns shapes/examples; accepted Family-58 shape-classification scope owns the same core — prior LCS reuse |
| `compact-bone-coverings-and-lamellar-components` · pp. 9, 13 | compact bone periosteum endosteum; external internal circumferential lamellae; interstitial lamellae osteocytes lacunae; compact bone marrow cavity lining | pending compact-bone/covering material owns all components; accepted Families 13, 55 and 58 jointly own the core — prior LCS reuse |
| `osteon-haversian-volkmann-lacuna-canaliculi-architecture` · pp. 10–12, 14–21 | osteon Haversian canal concentric lamellae; Volkmann canals connect osteons; osteocyte lacuna canaliculi ground bone; compact bone histology identification | live osteon and pending compact-bone material jointly own the architecture; accepted Families 13, 55 and 58 own the same core — prior LCS reuse |
| `spongy-bone-sites-trabeculae-marrow-and-no-osteons` · pp. 22–23 | spongy bone sites epiphysis flat short irregular; trabeculae marrow cavities histology; cancellous bone no Haversian systems; spongy bone periosteum endosteum | pending compact/spongy material owns the full relation; accepted Families 13, 55 and 58 own the core — prior LCS reuse |
| `mature-lamellar-versus-immature-woven-bone` · p. 24 | mature lamellar bone; immature woven bone; mature compact spongy classification; woven versus lamellar histology | no substantive direct record or accepted prior-LCS complete scope owns this mature/immature comparison — additive theoretical scope |
| `compact-versus-spongy-histological-comparison` · p. 25 | compact spongy bone site appearance arrangement; ivory cortical versus cancellous; Haversian systems versus trabeculae; compact spongy histology table | pending compact/spongy material owns the comparison; accepted Families 13 and 58 own the same core — prior LCS reuse |
| `intramembranous-versus-endochondral-route-and-sites` · pp. 26, 37 | intramembranous versus endochondral ossification; direct bone no cartilage precursor; cartilage model bone formation; flat skull clavicle versus extremity bone | pending ossification material owns routes/sites; accepted Family-13 route handles and Family-55 ossification scope own the core — prior LCS reuse |
| `endochondral-primary-secondary-centre-sequence` · p. 27 | endochondral ossification primary secondary centers; bony collar diaphysis epiphysis sequence; epiphyseal growth plate line; cartilage model long bone stages | pending ossification material owns the centre sequence; accepted Families 13, 47 and 55 jointly own the core — prior LCS reuse |
| `intramembranous-ossification-cell-and-matrix-sequence` · pp. 28–30 | intramembranous ossification mesenchymal center; osteoprogenitor osteoblast osteoid osteocyte; woven trabeculae periosteum compact plate; direct bone formation histology | pending ossification material owns the cellular sequence; accepted Family-13 direct-formation handle and Family-55 route scope own the core — prior LCS reuse |
| `endochondral-epiphyseal-cartilage-zones-and-changes` · pp. 31–33 | epiphyseal cartilage resting proliferation hypertrophy; calcification invasion ossification zones; growth plate ordered zone changes; osteoclast vascular bud cartilage collar | pending ossification material owns the ordered changes; exact accepted Family-13 zone handle and Family-55 five-zone scope own the core — prior LCS reuse |
| `epiphyseal-growth-length-and-remodelling` · p. 34 | epiphyseal plate longitudinal growth; bone addition resorption remodeling; epiphysis growth cartilage; long bone length growth plate | pending ossification material owns growth/remodelling; accepted Family-13 length/remodelling handles own the same core — prior LCS reuse |
| `compact-bone-remodelling-cutting-and-closing-cones` · p. 35 | compact bone cutting cone closing cone; osteoclast cutting cone osteoblast closing cone; growth reversal lines osteon; secondary osteon remodeling sequence | no substantive direct record or accepted prior-LCS complete scope owns the cone/reversal-line sequence — additive theoretical scope |
| `growth-plate-zone-histology-identification` · pp. 36, 38–40 | growth plate zone histology identification; reserve proliferation hypertrophy calcification resorption; endochondral ossification micrograph; epiphyseal plate abbreviated zones | pending ossification material owns the practical morphology; accepted Family-13 zone handle and Family-55 epiphyseal practical scope own the core — prior LCS reuse |

All **15 × 4 = 60** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **1 live / 11 pending / 3 new**. Exact accepted-
prior comparison prevents twelve repeated module additions, leaving **twelve prior-LCS
reuses / three additive theoretical scopes**. Together with the assessment handles, Family
59 completed **68 required searches**. Declarative teaching scopes do not enter the eligible
tested-concept count, and no theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 59 | Family 59 delta | After Family 59 |
|---|---:|---:|---:|
| Eligible observed question records | 512 | +2 | 514 |
| Eligible printed question keys | 264 | +0 | 264 |
| Eligible distinct tested concepts | 247 | +1 | 248 |
| Question live / pending / new | 9 / 83 / 155 | +0 / +1 / +0 | 9 / 84 / 155 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 387 verified minimum | +0 | 387 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,423 verified minimum | +0 | 2,423 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 135 | +0 | 135 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 73 | +0 / +0 / +0 | 0 / 0 / 73 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `43 = 5 framing/reference/closing pages + 37
teaching compositions + 1 assessment page`, `37 = 1 + 4 + 5 + 8 + 4 + 5 + 5 + 5`,
`24 = 6 + 14 + 4 unresolved teaching indicators`, `2 = 2 prompts - 0 repeated source
occurrences`, `1 = 2 tested handles - 1 prior eligible handle`, `514 = 512 + 2`, `264 =
264 + 0`, `248 = 247 + 1`, `9 + 84 + 155 = 248`, `387 + 0 = 387`, `2,423 + 0 =
2,423`, `135 + 0 = 135`, and `73 + 0 = 73`.

This source hash occurs once in the manifest. Removing it from the accepted Family-58
remainder leaves **17 rank-4/rank-5 path instances / 15 unique hashes**. The Family-58
method was reproduced first: its 18/16 row sets recomputed to
`1e804e4d469f96b798af573a12821abc0139c2bf72ac258c5ecf1b6060866e38` and
`9ac9d209783727ed541fa2ba2d9b43b2b6b56d4e51adfa41410615eb14277f10`.
For the exact post-Family-59 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`1544b5b078fcf1b5b04d31f1fabba5d07a2a1bd79850d05237eebadf6f559749`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`88e4f14504f52bc75bb1b9e02c941abdb60f7045e22f33e4a83a4263cc4ad259`.
The next rank-4/rank-5 manifest-order gate is tier-4 Histology theoretical source
`src_c7b80e456abfe93b686e`, `muscle tissue 1 HELWAN record - Copy.pdf` (2,320,116 bytes;
47 OCR-needed pages; SHA-256
`c7b80e456abfe93b686e7d8b4c8341b8ea970b3476da61f43f5d114473a5199a`)
under `Year 1/LCS 103/Histology/Theoretical/Lec 4 - Skeletal Muscles I/`. The exact
manifest-named next path is absent locally, but the organised filename without ` - Copy`
recomputes to that assigned hash and byte size. Tier-6 and rank-9 source debts between
rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains incomplete.
No download, ID, content record, catalogue update, import or source copy was created.

## Family 60 — Tier-4 Histology Skeletal Muscle I lecture with one keyed and one unkeyed prompt

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_c7b80e456abfe93b686e` |
| Manifest file / SHA-256 | `muscle tissue 1 HELWAN record - Copy.pdf` / `c7b80e456abfe93b686e7d8b4c8341b8ea970b3476da61f43f5d114473a5199a` |
| File boundary | 2,320,116 bytes · unencrypted PDF · 47 physical OCR-needed pages · 756 × 522 pt |
| Manifest placement | `HU-LCS-103` · Histology · Theoretical · `Lec 4 - Skeletal Muscles I` · tier 4 |
| Local corpus path used | `Year 1/LCS 103/Histology/Theoretical/Lec 4 - Skeletal Muscles I/muscle tissue 1 HELWAN record.pdf` |
| Name reconciliation | The exact manifest-named path is absent locally, but the organised filename without ` - Copy` recomputes to the assigned SHA-256 and byte size exactly; it is the same source under a normalised local name. |
| Visible provenance | p. 3 prints `Skeletal muscle`, `Presented by Dr Heba abd alrazak`, `lecturer of histology`, `Faculty of Medicine`, `Helwan University`, and credits the PowerPoint to Dr Doaa Khaled and Dr Heba Abd Alrazak; pp. 13, 19–20 cite Mescher/Junqueira, and p. 45 lists the lecture references |
| Authority finding | Direct local Helwan-labelled tier-4 teaching lecture under the assigned LCS-103 corpus path. It is not a sitting paper, question bank, practical response form or official answer key, but it contains one composite prompt followed by a direct answer/reveal and one separate unkeyed MCQ. |

The SHA-256, byte size and 47-page boundary were recomputed and match the assigned source.
All 47 pages were rendered at 180 dpi and visually read with page-level OCR support; all 47
complete-page renders have distinct SHA-256 values. Pages 1–5 are the devotional/title/
provenance/objective opening; pp. 6–34 teach skeletal-muscle structure and contraction, with
section dividers on pp. 9 and 14; p. 35 asks one composite triad prompt; pp. 36–39 directly
reveal its requested composition and level; pp. 40–43 teach fibre types; p. 44 is one
unkeyed `TEST YOUR SELF` MCQ; and pp. 45–47 are references and closing slides.

Page 35 is an actual learner-facing prompt because it explicitly asks what forms the triad
and at what level it occurs. Pages 36–38 provide labelled triad diagrams and p. 39 explicitly
prints one T-tubule plus two terminal cisternae at the A–I junction; together they are one
directly printed delayed key for the single composite handle, not four additional questions.
Page 44 offers four visibly unmarked options and has no later reveal, so no key is inferred
from the earlier accessory-protein teaching. The `Red why??`/`White why???` wording on p. 42
is embedded inside a simultaneously filled comparison table and is instructional emphasis,
not a learner response task or separate question.

The p. 19 micrograph contains **four unresolved teaching abbreviations** (`I`, `A`, `F`,
`N`) without a local legend. The surrounding lecture permits an interpretation, but the
letters remain unexpanded in the printed composition and are preserved as callout debt.
All other diagram labels are explicit or are sequence/directional indicators. These four
theoretical teaching callouts are not promoted into assessment blanks or practical mappings.

### Complete teaching-composition and assessment/key boundary inventory

| Physical pages | Source-first instructional composition | Teaching occurrences | Prompt/key disposition |
|---:|---|---:|---:|
| 6–8 | muscle origin, cell terminology, sarcoplasm and skeletal/cardiac/smooth comparison | 3 | 0 |
| 10–13 | skeletal-muscle sites, embryonic myoblast fusion and satellite-cell regeneration | 4 | 0 |
| 15–17 | epimysium/perimysium/endomysium and fascicle organisation | 3 | 0 |
| 18–20 | skeletal-fibre LM phenotype plus longitudinal/transverse-section micrographs | 3 | 0 |
| 21–22 | sarcoplasmic organelles, myofibrils, SR, mitochondria and inclusions | 2 | 0 |
| 23–31 | sarcomere bands/lines/filaments, accessory proteins and thin-filament regulation | 9 | 0 |
| 32–34 | calcium exposure, cross-bridge force and sliding-filament contraction/relaxation | 3 | 0 |
| 35 | `Triad system???? formed of? Level?` | 0 | 1 composite open prompt |
| 36–39 | triad diagrams and explicit composition/A–I-junction reveal | 0 | 1 printed key across 4 slides |
| 40–43 | slow oxidative, fast glycolytic and intermediate fibre-type comparison | 4 | 0 |
| 44 | myosin-binding accessory-protein MCQ with options Titin/Troponin/Dystrophin/Myomesin | 0 | 1 ordinary MCQ; 0 keys |
| **Total** | **complete content boundary** | **31** | **2 prompt occurrences / 1 printed key** |

The **31 teaching-page occurrences are 31 source-distinct instructional compositions**.
Complete-render SHA-256 and semantic comparison found no full-page copy to collapse. The
complete arithmetic is **47 = 10 framing/divider/reference/closing pages + 31 teaching
compositions + 2 assessment pages + 4 answer/reveal pages**. The source boundary is
therefore **31 teaching compositions / 2 ordinary prompt occurrences / 1 printed assessment
key / 0 practical or station prompts / 0 response blanks / 0 masked assessment callouts / 4
unresolved teaching callouts**. As theoretical material, it adds **0 practical plates, 0
practical mappings and 0 practical residues** to the separated tier-5 ledger.

### One-to-one assessment assignment, search and disposition

| Prompt assignment → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 35 with pp. 36–39 reveal → `skeletal-triad-composition-and-a-i-junction` | skeletal triad components; triad T tubule terminal cisternae; skeletal triad A-I junction; sarcomere two triads | pending skeletal/cardiac muscle material owns the complete triad relation; exact accepted Family-15 `muscle-tubular-systems-t-tubules-triads-diads-sr` handle owns this tested objective | pending; prior eligible-LCS reuse; 1 printed key; tested-concept delta +0 |
| p. 44 → `myomesin-m-line-myosin-binding-protein` | myomesin myosin-binding protein; M-line accessory protein; myomesin thick-filament register; titin troponin dystrophin myomesin MCQ | no substantive live/pending hit and no accepted prior-LCS handle owns myomesin's M-line myosin-binding role | new to eligible LCS; no printed key |

The two occurrences are two source-distinct question records. Tested-handle collapse is `2
handles - 1 prior eligible handle = 1 new concept`; the p. 35 composite's two requested
attributes remain one triad handle and one printed key. All **2 × 4 = 8** assessment searches
completed across live state, pending state, all source-import roots and accepted prior LCS.
The source-level assessment result is **0 live / 1 pending / 1 new**, but prior-eligible
comparison removes the inherited pending triad handle from module delta, leaving **0 live /
0 pending / 1 new = 1 added concept**.

### Source-first theoretical scopes, searches and prior-LCS adjudication

The 31 teaching compositions consolidate to ten source-level theoretical scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `muscle-origin-cell-terminology-and-three-type-overview` · pp. 6–8 | muscle tissue mesoderm myoblast myocyte; muscle fibre sarcoplasm sarcolemma SR; skeletal cardiac smooth comparison; voluntary striated involuntary muscle | pending muscle-comparison material owns the complete overview; accepted Family-15 type/origin handles and Family-51 skeletal-organisation scope own the core — prior LCS reuse |
| `skeletal-muscle-myoblast-formation-and-satellite-cell-regeneration` · pp. 10–13 | myoblast fusion myotube skeletal fibre; satellite cell between sarcolemma basal lamina; satellite activation proliferation fusion; skeletal muscle regeneration injury | pending Histology material owns the full formation/regeneration sequence; accepted Family-15 origin/regeneration evidence owns the same core — prior LCS reuse |
| `skeletal-muscle-connective-tissue-organisation` · pp. 15–17 | epimysium perimysium endomysium; skeletal muscle fascicle organization; muscle connective tissue vessels nerves; tendon epimysium continuity | pending skeletal-muscle material owns the three layers; exact accepted Family-15 connective-tissue handle owns the core — prior LCS reuse |
| `skeletal-muscle-fibre-lm-phenotype-and-sections` · pp. 18–20 | skeletal muscle LM phenotype; long cylindrical multinucleated peripheral nuclei; skeletal muscle longitudinal transverse sections; skeletal muscle striations acidophilic sarcoplasm | pending skeletal-muscle material owns the phenotype; exact accepted Family-15 LM handle owns the same core — prior LCS reuse |
| `skeletal-muscle-sarcoplasmic-organelles-and-inclusions` · pp. 21–22 | skeletal sarcoplasm organelles inclusions; myofibrils sarcoplasmic reticulum mitochondria; muscle myoglobin glycogen lipid; calcium storage SR muscle | pending skeletal-muscle material owns the complete internal organisation; exact accepted Family-15 sarcoplasm handle and Family-51 scope own the core — prior LCS reuse |
| `sarcomere-band-line-and-filament-architecture` · pp. 23, 25–28, 30 | sarcomere Z to Z architecture; A I H bands M Z lines; actin myosin thin thick filaments; sarcomere contraction band changes | live sarcomere material owns the complete pattern; exact accepted Family-15 band/filament handles and Family-51 scopes own the core — prior LCS reuse |
| `sarcomere-accessory-proteins-titin-dystrophin-alpha-actinin-myomesin` · pp. 24, 29 | sarcomere accessory proteins; titin dystrophin alpha actinin myomesin; Z-line thick filament anchoring proteins; myomesin M-line myosin binding | pending component records own titin/dystrophin but no substantive record or accepted prior-LCS complete scope owns the four-protein comparison — additive theoretical scope |
| `thin-filament-calcium-troponin-tropomyosin-regulation` · pp. 31–32 | actin troponin tropomyosin complex; calcium binds troponin moves tropomyosin; myosin binding sites exposed actin; thin filament muscle regulation | pending nerve-muscle material owns the regulatory sequence; accepted Family-51 thin-filament scope and prior excitation-contraction evidence own the core — prior LCS reuse |
| `sliding-filament-contraction-and-relaxation` · pp. 32–34 | sliding filament contraction relaxation; cross bridge binds actin generates force; sarcomere actin myosin overlap; I band H zone shortening A band constant | live/pending contraction material owns the full change pattern; exact accepted Family-15 contraction handle and Family-51 cycle scope own the core — prior LCS reuse |
| `skeletal-muscle-red-white-intermediate-fibre-comparison` · pp. 40–43 | red white intermediate skeletal muscle fibers; slow oxidative fast glycolytic; myoglobin mitochondria capillaries fatigue; glycogen glycolytic oxidative fibre types | pending Histology fibre-type material owns the comparison; exact accepted Family-15 red/white handle owns the same core — prior LCS reuse |

All **10 × 4 = 40** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **2 live / 7 pending / 1 new**. Exact accepted-
prior comparison prevents nine repeated module additions, leaving **nine prior-LCS reuses /
one additive theoretical scope**. Together with the assessment handles, Family 60 completed
**48 required searches**. Declarative teaching scopes do not enter the eligible tested-
concept count, and no theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 60 | Family 60 delta | After Family 60 |
|---|---:|---:|---:|
| Eligible observed question records | 514 | +2 | 516 |
| Eligible printed question keys | 264 | +1 | 265 |
| Eligible distinct tested concepts | 248 | +1 | 249 |
| Question live / pending / new | 9 / 84 / 155 | +0 / +0 / +1 | 9 / 84 / 156 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 387 verified minimum | +0 | 387 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,423 verified minimum | +0 | 2,423 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 135 | +0 | 135 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 73 | +0 / +0 / +0 | 0 / 0 / 73 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `47 = 10 + 31 + 2 + 4`, `31 = 3 + 4 + 3 +
3 + 2 + 9 + 3 + 4`, `4 unresolved teaching callouts = I + A + F + N on p. 19`, `2 = 2
prompts - 0 repeated source occurrences`, `1 = 2 tested handles - 1 prior eligible handle`,
`516 = 514 + 2`, `265 = 264 + 1`, `249 = 248 + 1`, `9 + 84 + 156 = 249`, `387 + 0
= 387`, `2,423 + 0 = 2,423`, `135 + 0 = 135`, and `73 + 0 = 73`.

This source hash occurs once in the manifest. Removing it from the accepted Family-59
remainder leaves **16 rank-4/rank-5 path instances / 14 unique hashes**. The Family-59
method was reproduced first: its 17/15 row sets recomputed to
`1544b5b078fcf1b5b04d31f1fabba5d07a2a1bd79850d05237eebadf6f559749` and
`88e4f14504f52bc75bb1b9e02c941abdb60f7045e22f33e4a83a4263cc4ad259`.
For the exact post-Family-60 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`d830cea21a5ccf8d420fdb8dca670227dedaf7398ac1165288243941239ca902`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`0c241f7e1789ffd01ee9b44655f1700a8d7494368fbc2dde0876ccdf4df1fba9`.
The next rank-4/rank-5 manifest-order gate is tier-4 Histology theoretical source
`src_b0878e83f808ca239818`, `muscle tissue  HELWAN 2 iheba - record _Repaired_.pdf`
(2,500,993 bytes; 47 OCR-needed pages; SHA-256
`b0878e83f808ca2398187a5f03f40fe3fce592912ed776888082f43f474746e3`)
under `Year 1/LCS 103/Histology/Theoretical/Lec 5 - Skeletal Muscles II/`. The exact
manifest-named next path is absent locally, but the organised filename with normalised
spacing and final `_Repaired.pdf` recomputes to that assigned hash and byte size. Tier-6 and
rank-9 source debts between rank-4/rank-5 gates remain outside this remainder. Broader
LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update, import or
source copy was created.

## Family 61 — Tier-4 Histology Cardiac and Smooth Muscle lecture with two unkeyed self-test MCQs

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_b0878e83f808ca239818` |
| Manifest file / SHA-256 | `muscle tissue  HELWAN 2 iheba - record _Repaired_.pdf` / `b0878e83f808ca2398187a5f03f40fe3fce592912ed776888082f43f474746e3` |
| File boundary | 2,500,993 bytes · unencrypted PDF · 47 physical OCR-needed pages · 792 × 612 pt |
| Manifest placement | `HU-LCS-103` · Histology · Theoretical · `Lec 5 - Skeletal Muscles II` · tier 4 |
| Local corpus path used | `Year 1/LCS 103/Histology/Theoretical/Lec 5 - Skeletal Muscles II/muscle tissue HELWAN 2 iheba - record _Repaired.pdf` |
| Name reconciliation | The exact manifest-named path is absent locally, but the organised filename with normalised spacing and final `_Repaired.pdf` recomputes to the assigned SHA-256 and byte size exactly; it is the same source under a normalised local name. |
| Visible provenance | p. 3 prints `Skeletal muscle`, `Presented by Dr Heba abd alrazak`, `lecturer of histology`, `Faculty of Medicine`, `Helwan University`, and credits the PowerPoint to Dr Doaa Khaled and Dr Heba Abd Alrazak; pp. 14 and 25 cite Mescher/Junqueira, and p. 45 lists Junqueira and Guyton & Hall |
| Authority finding | Direct local Helwan-labelled tier-4 teaching lecture under the assigned LCS-103 corpus path. It is not a sitting paper, practical response form or official answer key, but p. 44 contains two ordinary self-test MCQs. |

The SHA-256, byte size and 47-page boundary were recomputed and match the assigned source.
All 47 pages were rendered at 180 dpi and visually read with page-level OCR support; all 47
complete-page renders have distinct SHA-256 values. Pages 1–5 are the devotional/title/
provenance/objective opening; p. 6 is a three-muscle overview; p. 7 is a section divider;
pp. 8–31 teach cardiac muscle; pp. 32–43 teach smooth muscle and compare all three muscle
types; p. 44 contains two `TEST YOUR SELF` multiple-choice prompts; and pp. 45–47 are the
reference and closing slides.

The p. 4–5 verbs are learning objectives rather than response tasks. Page 22's `What is the
intercalated discs` heading is followed on the same composition by the definition, form and
electron-microscopic description, so it is rhetorical instructional framing rather than a
learner response task. All other lists, diagrams, arrows, micrographs and tables on pp. 6 and
8–43 are simultaneous declarative instruction. Page 44 alone prints interrogative stems and
mutually exclusive lettered options. Neither prompt has a marked option, answer letter or
later reveal, so the correct choices are not inferred from the earlier diad and dense-body
teaching.

Three teaching micrographs contain **13 unexpanded teaching-callout occurrences** without a
local legend: p. 11 prints `GI` and `N` once each; p. 14 prints `D` twice plus `M` and `SR`
once each; p. 25 prints `N` three times, `S` once and `I` three times. The surrounding
lecture permits interpretations, but those abbreviations remain unresolved in the printed
compositions. They are preserved as theoretical teaching callout debt, not promoted into
questions, response blanks, inferred label mappings or practical residues. Panel letters,
direction arrows and fully expanded diagram labels are not unresolved callouts.

### Complete teaching-composition and assessment-boundary inventory

| Physical pages | Source-first instructional composition | Teaching occurrences | Ordinary prompts | Printed keys |
|---:|---|---:|---:|---:|
| 6, 42–43 | skeletal/cardiac/smooth overview and twelve-feature comparison tables | 3 | 0 | 0 |
| 8–11 | cardiac-muscle site, LM shape, branching, nuclei, sarcoplasm, endomysium and intercalated-disc appearance | 4 | 0 | 0 |
| 12–15, 19–21 | cardiac EM, sarcoplasmic organelles/inclusions, diad, thin filament and sarcomere relation | 7 | 0 | 0 |
| 16–17 | atrial/brain or B-type natriuretic factors, endocrine actions and CHF diagnostic note | 2 | 0 | 0 |
| 18 | cardiac conducting-system component list | 1 | 0 | 0 |
| 22–28 | intercalated-disc definition, transverse/lateral portions, junctions and functions | 7 | 0 | 0 |
| 29 | absent cardiac regeneration, hypertrophy and fibrous-scar repair | 1 | 0 | 0 |
| 30–31 | Purkinje-fibre site, function and histological phenotype | 2 | 0 | 0 |
| 32–34 | smooth-muscle sites, physiological properties and LM phenotype | 3 | 0 | 0 |
| 35–37 | smooth-muscle EM organelles, gap junctions, caveolae and absent T tubules | 3 | 0 | 0 |
| 38–40 | dense bodies/attachment plaques, filament organisation and contraction morphology | 3 | 0 | 0 |
| 41 | smooth-muscle mitotic/pericyte regeneration | 1 | 0 | 0 |
| 44 | cardiac-diad-site MCQ plus smooth-muscle attachment-plaque MCQ | 0 | 2 | 0 |
| **Total** | **complete content boundary** | **37** | **2** | **0** |

The **37 teaching-page occurrences are 37 source-distinct instructional compositions**.
Complete-render SHA-256 and semantic comparison found no full-page copy to collapse. The
source boundary is therefore **37 teaching compositions / 2 ordinary MCQs / 0 printed keys /
0 practical or station prompts / 0 response blanks / 0 masked assessment callouts / 13
unresolved teaching-callout occurrences**. As theoretical material, it adds **0 practical
plates, 0 practical mappings and 0 practical residues** to the separated tier-5 ledger.

### One-to-one assessment assignment, search and disposition

| Prompt assignment → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 44 first MCQ → `cardiac-diad-at-z-line` | cardiac diad site; cardiac T tubule Z line; diad one terminal cisterna; cardiac diad A-I H M distractors | pending cardiac-muscle material owns the relation; exact accepted Family-14 external-bank `muscle-tubular-systems-t-tubules-triads-diads-sr` handle owns the same objective, but no prior eligible-LCS prompt has promoted this cardiac-diad handle | pending; external-bank overlap; new to eligible LCS; no printed key |
| p. 44 second MCQ → `smooth-muscle-attachment-plaque-thin-and-intermediate-filaments` | smooth muscle attachment plaques; dense bodies thin intermediate filaments; smooth thick thin filament attachment; histological structure attachment plaques | pending smooth-muscle material owns the relation; exact accepted Family-14 external-bank `smooth-muscle-contractile-apparatus-dense-bodies-caveolae` handle owns the same objective, but no prior eligible-LCS prompt has promoted this attachment-plaque handle | pending; external-bank overlap; new to eligible LCS; no printed key |

The two occurrences are two source-distinct question records: `2 - 0 repeated source
occurrences = 2`. Both tested handles existed only in the separately tracked external bank,
so this direct Helwan lecture promotes **two concepts into eligible LCS totals** without
altering the external-bank inventory. All **2 × 4 = 8** assessment searches completed across
live state, pending state, all source-import roots and accepted prior LCS. Assessment
disposition is **0 live / 2 pending / 0 new = 2**, and the printed-key delta is zero.

### Source-first theoretical scopes, searches and prior-LCS adjudication

The 37 teaching compositions consolidate to twelve source-level theoretical scopes.

| Theoretical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `muscle-type-overview-and-histology-comparison` · pp. 6, 42–43 | three types muscle tissue comparison; skeletal cardiac smooth striated; voluntary involuntary muscle types; muscle histology comparison table | pending comparison material owns the complete table; exact accepted Family-14 type-comparison handle owns the same core — prior LCS reuse |
| `cardiac-muscle-site-and-lm-phenotype` · pp. 8–11 | cardiac muscle myocardium site; short branching cardiac myocyte; central nucleus cardiac muscle; cardiac endomysium intercalated disc LM | pending cardiac-muscle material owns the phenotype; exact accepted Family-14 cardiac-myocyte handle and Family-56 practical scope own the core — prior LCS reuse |
| `cardiac-muscle-em-organelles-inclusions-and-diad` · pp. 12–15, 19–21 | cardiac muscle EM organelles; cardiac mitochondria myofibrils glycogen lipofuscin; cardiac sarcoplasmic reticulum diad; cardiac T tubule Z line | pending cardiac-muscle material owns the internal organisation and tubular relation; accepted Family-14 organelle/tubular handles own the same core — prior LCS reuse |
| `cardiac-natriuretic-factors-actions-and-bnp-chf-use` · pp. 16–17 | atrial natriuretic factor ANF; brain natriuretic factor BNF; B-type natriuretic peptide CHF; cardiac myocyte endocrine diuretic aldosterone renin | pending cardiac and cardiovascular material owns ANF actions and BNP wall-stress/testing facts; accepted Family-14 ANP handle is narrower and no prior LCS scope owns this combined endocrine/CHF relation — additive theoretical scope |
| `cardiac-conducting-system-components` · p. 18 | components conductive system heart; SAN AVN AV bundle branches; Purkinje fibres conduction system; intercalated disc diad conducting system | direct records own individual nodes, Purkinje fibres, discs and diads, but no substantive record or accepted prior-LCS complete scope owns this exact component-list composite — additive theoretical scope |
| `intercalated-disc-structure-junctions-and-functions` · pp. 22–28 | intercalated disc transverse lateral; fascia adherens desmosome gap junction; intercalated disc stepwise EM; cardiac junction mechanical electrical function | pending intercalated-disc material owns both orientations and junction functions; exact accepted Family-14 handle and Family-56 practical scope own the core — prior LCS reuse |
| `cardiac-muscle-regeneration-hypertrophy-and-fibrosis` · p. 29 | cardiac muscle cannot regenerate; cardiomyocyte hypertrophy no satellite cells; myocardium heals fibrosis scar; cardiac muscle injury repair | pending cardiac-muscle material owns the repair relation; exact accepted Family-14 fibrous-scar handle owns the same core — prior LCS reuse |
| `purkinje-fibre-site-function-and-histology` · pp. 30–31 | Purkinje fibre histology; pale vacuolated glycogen Purkinje; few peripheral myofibrils Purkinje; Purkinje no intercalated discs | pending Purkinje material owns the complete phenotype; exact accepted Family-14 handle owns the same core — prior LCS reuse |
| `smooth-muscle-sites-properties-and-lm-phenotype` · pp. 32–34 | smooth muscle sites viscera; fusiform central nucleus smooth muscle; smooth muscle slow fatigue resistant; smooth muscle respiratory urinary genital ducts | pending smooth-muscle material owns sites and phenotype; exact accepted Family-14 smooth-muscle handle owns the core — prior LCS reuse |
| `smooth-muscle-em-gap-junctions-caveolae-and-sr` · pp. 35–37 | smooth muscle EM organelles; smooth muscle gap junction coordination; smooth muscle caveolae no T tubules; smooth muscle sarcoplasmic reticulum poorly developed | pending smooth-muscle material owns the ultrastructure; accepted Family-14 smooth phenotype/dense-body handles and Family-56 practical scope own the core — prior LCS reuse |
| `smooth-muscle-dense-bodies-filaments-and-contraction` · pp. 38–40 | smooth muscle dense bodies attachment plaques; smooth thin intermediate filament attachment; smooth muscle scalloped corkscrew nucleus contraction; smooth muscle no sarcomere desmin | pending smooth-muscle material owns the complete contractile apparatus; exact accepted Family-14 dense-body/caveolae handle owns the core — prior LCS reuse |
| `smooth-muscle-regeneration-by-mitosis-and-pericytes` · p. 41 | smooth muscle regeneration mitosis; smooth muscle pericytes differentiation; smooth muscle rapid healing; smooth muscle growth regeneration divisible cells | pending Histology written material owns mitosis/pericyte regeneration; accepted Family-14 muscle-comparison/regeneration evidence owns the same core — prior LCS reuse |

All **12 × 4 = 48** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope level the direct external result is **0 live / 11 pending / 1 new**. Exact accepted-
prior comparison prevents ten repeated module additions, leaving **ten prior-LCS reuses /
two additive theoretical scopes**. Together with the assessment handles, Family 61
completed **56 required searches**. Declarative teaching scopes do not enter the eligible
tested-concept count, and no theoretical scope enters the practical-teaching-scope counter.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 61 | Family 61 delta | After Family 61 |
|---|---:|---:|---:|
| Eligible observed question records | 516 | +2 | 518 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 249 | +2 | 251 |
| Question live / pending / new | 9 / 84 / 156 | +0 / +2 / +0 | 9 / 86 / 156 |
| Stand-alone practical/station prompt occurrences | 5 | +0 | 5 |
| Distinct practical teaching plates, quantified | 387 verified minimum | +0 | 387 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,423 verified minimum | +0 | 2,423 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 135 | +0 | 135 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 73 | +0 / +0 / +0 | 0 / 0 / 73 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `47 = 9 framing/divider/reference/closing
pages + 37 teaching compositions + 1 assessment page`, `37 = 3 + 4 + 7 + 2 + 1 + 7 + 1
+ 2 + 3 + 3 + 3 + 1`, `13 unresolved teaching callouts = 2 + 4 + 7`, `2 = 2 prompts -
0 repeated source occurrences`, `2 = 2 tested handles - 0 prior eligible handles`, `518 =
516 + 2`, `265 = 265 + 0`, `251 = 249 + 2`, `9 + 86 + 156 = 251`, `387 + 0 = 387`,
`2,423 + 0 = 2,423`, `135 + 0 = 135`, and `73 + 0 = 73`.

This source hash occurs once in the manifest. Removing it from the accepted Family-60
remainder leaves **15 rank-4/rank-5 path instances / 13 unique hashes**. The Family-60
method was reproduced first: its 16/14 row sets recomputed to
`d830cea21a5ccf8d420fdb8dca670227dedaf7398ac1165288243941239ca902` and
`0c241f7e1789ffd01ee9b44655f1700a8d7494368fbc2dde0876ccdf4df1fba9`.
For the exact post-Family-61 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`038a0b83429e089cc78101765912c340eba8c183bfeec00a4b0c56b0ad9a021a`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`ab34fcda50c731f47a18e936b7d9df17b682524f657b0211d58c7fd4430c4609`.
The next rank-4/rank-5 manifest-order gate is tier-5 Pathology practical source
`src_22194b2bfc94456a2f66`, `103 Lab 1.pdf` (985,111 bytes; 16 native-text pages;
SHA-256 `22194b2bfc94456a2f66fc27ba724c93beece0cc62b1e4a7dfa2d85572718a14`)
under `Year 1/LCS 103/Pathology/Practical Labs/Practical Revision/`. Tier-6 and rank-9 source
debts between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.


## Family 62 — Tier-5 Pathology practical Lab 1 deck with one ordinary and one image-dependent unkeyed MCQ

### Source identity, authority and full boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_22194b2bfc94456a2f66` |
| File / SHA-256 | `103 Lab 1.pdf` / `22194b2bfc94456a2f66fc27ba724c93beece0cc62b1e4a7dfa2d85572718a14` |
| File boundary | 985,111 bytes · unencrypted PDF · 16 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Pathology · Practical Labs · `Practical Revision` · tier 5 |
| Local corpus path | `Year 1/LCS 103/Pathology/Practical Labs/Practical Revision/103 Lab 1.pdf` |
| Visible provenance | p. 1 prints `Locomotor Pathology`, `Laboratory 1` and `Dr Rofanda Bakeer`; PDF metadata retains the unrelated title `Respiratory Module Lecture 1`, author `lenovo`, and Microsoft PowerPoint 2016 creator/producer; pp. 7 and 16 embed Galala University marks in reused graphics |
| Authority finding | Manifest/path-placed local tier-5 Pathology practical teaching/revision evidence. It is not a recoverable sitting, station sheet, response form, department question bank or official answer key. |

The SHA-256, byte size and 16-page boundary were recomputed and match the assigned source.
All 16 pages were rendered at 180 dpi and read against the native text layer; all 16 complete-
page renders have distinct SHA-256 values. Page 1 is the title/provenance slide; pp. 2–5 cover
bone-growth and metabolic/endocrine disease plates; pp. 6–8 cover bone inflammation; p. 9
covers ganglion cyst; p. 10 is the tumour divider; pp. 11–13 cover three bone-tumour plates;
pp. 14–15 are the two `Test yourself` assessment pages; and p. 16 is the closing slide.

Pages 2–9 and 11–13 are simultaneous declarative practical teaching. They name the disease,
show gross, radiographic, CT or microscopic evidence, and print the corresponding findings;
no learner is asked to identify or supply anything on those pages. Page 14 is one ordinary
clinical/laboratory MCQ about acute gout. Page 15 explicitly asks the learner to diagnose a
shown biopsy image, so it is one image-dependent practical prompt as well as one eligible
question record. Both option sets are visibly unmarked and p. 16 supplies no delayed reveal;
therefore neither the clinically inferable choices nor the earlier brown-tumour teaching is
promoted into a printed key.

### Complete practical-plate, mapping, residue and assessment inventory

One mapping is one distinct directly printed disease-to-feature, specimen-to-finding,
structure-to-image, laboratory relation or gross/microscopic phenotype. Repeated wording,
arrows or labels on the same plate are counted once; slide titles, publisher marks, age/sex
alone and an unlabelled image identity are not mappings. Panel letters `a`–`d`, the radiograph
side marker `R`, modality/magnification marks and directional arrows are presentation aids,
not masked labels or inferred mappings.

| Physical pages | Source-first practical composition | Teaching plates | Directly printed mappings / assessment / residue |
|---:|---|---:|---:|
| 2 | osteopetrosis radiographic/microscopic context and dysfunctional dysplastic osteoclast phenotype | 1 | 3 mappings |
| 3–5 | inactive osteoporosis, osteitis fibrosa cystica/brown tumour and Paget gross/microscopic findings | 3 | 19 mappings (`4 + 3 + 12`) |
| 6–8 | chronic osteomyelitis sequestrum/sinus, CT involucrum-sequestrum-cloaca anatomy and four-panel acute/chronic histology | 3 | 18 mappings (`2 + 6 + 10`); p. 8 retains 1 unexplained asterisk |
| 9 | ganglion-cyst clinical, gross and microscopic phenotype | 1 | 8 mappings |
| 11 | giant-cell-tumour site, giant-cell/mononuclear pattern, brown-tumour differential and calcium/PTH relation | 1 | 5 mappings |
| 12 | chondrosarcoma anaplastic-cartilage-cell, soft-tissue-invasion and malignant-cytology findings | 1 | 3 mappings |
| 13 | osteosarcoma gross destructive pattern and pleomorphic osteoid-producing microscopic phenotype | 1 | 17 mappings |
| 14 | podagra/needle-crystal laboratory-finding MCQ | 0 | 1 ordinary prompt; 0 keys |
| 15 | mandibular giant-cell biopsy image with systemic hyperparathyroid clues and five diagnoses | 0 | 1 image-dependent practical MCQ; 0 keys |
| **Total** | **complete source content boundary** | **11** | **73 mappings / 2 question records / 1 practical prompt / 1 unresolved callout / 0 keys** |

The **11 content-page occurrences are 11 source-distinct practical teaching plates**; no
exact complete-page copy is present. The mapping arithmetic is `3 + 19 + 18 + 8 + 5 + 3 +
17 = 73`. The single p. 8 asterisk is not explained by the accompanying A–D prose and remains
teaching residue; panel letters, arrows, boxes, `R`, `CT` and `H&E, X100` do not constitute
learner blanks. The complete physical-page arithmetic is **16 = 3 title/divider/closing pages
+ 11 teaching plates + 2 assessment pages**. The assessment boundary is therefore **11
practical teaching plates / 73 printed teaching mappings / 1 unresolved teaching callout / 1
stand-alone practical prompt / 2 ordinary question records / 0 response blanks / 0 printed
assessment keys**.

### One-to-one assessment assignment, search and disposition

| Prompt assignment → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 14 → `gout-podagra-needle-crystals-and-hyperuricemia` | podagra; needle-shaped crystals; hyperuricemia; first metatarsophalangeal gout | live gout/urate material owns the complete clinical, crystal and laboratory relation; exact accepted Families 17–19 and 21 eligible handle owns this objective | live; prior eligible-LCS reuse; no concept delta; no printed key |
| p. 15 → `hyperparathyroidism-osteitis-fibrosa-cystica-brown-tumor` | osteitis fibrosa cystica; brown tumor hyperparathyroidism; jaw lesion renal stones PTH; giant-cell lesion hypercalcemia | no substantive live/pending record owns the complete image-supported diagnosis; accepted Family-9 note-only candidate is auxiliary evidence and has never entered eligible totals | new to eligible LCS; promotes the auxiliary brown-tumour scope; practical/image-dependent; no printed key |

The two occurrences are two source-distinct question records: `2 - 0 repeated source
occurrences = 2`. Their tested handles collapse against prior eligible evidence as `2 - 1
prior eligible gout handle = 1 added concept`. All **2 × 4 = 8** assessment searches completed
across live state, pending state, all source-import roots and accepted prior LCS. Raw source
disposition is **1 live / 0 pending / 1 new**, while prior-eligible adjudication removes the
inherited live gout handle from module addition, leaving a delta of **0 live / 0 pending / 1
new**. Neither option set contributes a printed key.

### Source-first practical teaching scopes, searches and prior-LCS adjudication

The 11 teaching plates consolidate to nine source-level practical teaching scopes. Scope
collapse does not delete plate, mapping, page or source-wording evidence.

| Practical teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `osteopetrosis-osteoclast-dysfunction-practical-phenotype` · p. 2 | osteopetrosis osteoclast dysfunction; marble bone dysplastic osteoclast; osteopetrosis histology increased osteoclast; dense brittle bone growth disorder | direct hits do not own the complete plate; accepted Family-9 osteopetrosis/osteoclast-dysfunction evidence owns the core — prior LCS reuse |
| `inactive-osteoporosis-low-turnover-histology` · p. 3 | inactive osteoporosis histology; decreased osteoclast resorptive surface; reduced osteoid osteoblastic surface; low turnover osteoporosis microscopy | direct osteoporosis records are different-grain; accepted age-related low-turnover osteoporosis and bone-cell evidence jointly own the core — prior LCS reuse |
| `osteitis-fibrosa-cystica-brown-tumor-histology` · p. 4 | brown tumor bony trabeculae resorption; osteoclast-like giant cells spindled stroma; osteitis fibrosa cystica histology; hyperparathyroid bone lesion microscopy | no substantive complete external or accepted prior-LCS practical scope owns the trabecular/giant-cell/stromal phenotype — new practical teaching scope |
| `paget-disease-gross-and-mosaic-histology` · p. 5 | Paget disease mosaic cement lines; osteitis deformans thickened trabeculae; Paget abnormal osteoclast osteoblastic rimming; Paget bone gross histology | direct fragments are incomplete; accepted Paget imaging/stage, complication and remodelling evidence jointly owns the gross/mosaic core — prior LCS reuse |
| `chronic-osteomyelitis-sequestrum-involucrum-cloaca-and-histology` · pp. 6–8 | chronic osteomyelitis sequestrum involucrum cloaca; dead cortical bone neutrophils fibrin; fibrovascular inflammatory tissue woven bone; draining sinus chronic bone infection | direct fragments are incomplete; accepted chronic-pyogenic-osteomyelitis diagnosis and terminology evidence owns the full core — prior LCS reuse |
| `ganglion-cyst-clinicopathologic-practical-phenotype` · p. 9 | ganglion cyst bland spindle cells myxoid matrix; ganglion cyst clear mucinous fluid; cystic fluctuant mobile finger swelling; ganglion cyst no epithelial lining histology | no substantive external complete scope; exact accepted Family-21 ganglion-cyst clinicopathologic handle owns the core — prior LCS reuse |
| `giant-cell-tumor-site-and-histology` · p. 11 | giant cell tumor epiphysis adults; uniform osteoclast giant cells mononuclear; giant cell tumor normal calcium PTH; osteoclastoma histology differential brown tumor | no substantive external complete scope; exact accepted giant-cell-tumour handles own adult epiphyseal site, stromal/giant-cell biology and differential core — prior LCS reuse |
| `chondrosarcoma-anaplasia-and-soft-tissue-invasion` · p. 12 | chondrosarcoma anaplastic cartilage cells; chondrosarcoma invades soft tissue; malignant cartilage cytology histology; chondrosarcoma microscopy identification | no substantive external complete scope; accepted chondrosarcoma comparison/morphology handles own the malignant cartilage and invasion core — prior LCS reuse |
| `osteosarcoma-gross-microscopy-and-malignant-osteoid` · p. 13 | osteosarcoma malignant osteoid lace-like; pleomorphic hyperchromatic tumor cells woven bone; osteosarcoma gross hemorrhage necrosis; osteosarcoma microscopy identification | no substantive external complete scope; accepted osteosarcoma radiographic/differential handles already own the osteoid-producing malignant-bone-tumour core — prior LCS reuse |

All **9 × 4 = 36** required teaching-scope searches completed across live state,
`docs/import-ready`, `docs/questions-import-ready` and all source-import roots. At complete-
scope grain the direct external result is **0 live / 0 pending / 9 new**. Exact accepted-prior
comparison prevents eight repeated module additions, leaving **eight prior-LCS reuses / one
new practical-teaching scope**. Together with the two assessment handles, Family 62 completed
**44 required searches**. Declarative teaching scopes do not enter the eligible tested-concept
count.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 62 | Family 62 delta | After Family 62 |
|---|---:|---:|---:|
| Eligible observed question records | 518 | +2 | 520 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 251 | +1 | 252 |
| Question live / pending / new | 9 / 86 / 156 | +0 / +0 / +1 | 9 / 86 / 157 |
| Stand-alone practical/station prompt occurrences | 5 | +1 | 6 |
| Distinct practical teaching plates, quantified | 387 verified minimum | +11 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,423 verified minimum | +73 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 135 | +1 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 73 | +0 / +0 / +1 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `16 = 3 + 11 + 2`, `11 = 1 + 3 + 3 + 1 + 1
+ 1 + 1`, `73 = 3 + 19 + 18 + 8 + 5 + 3 + 17`, `2 = 1 ordinary + 1 image-dependent
prompt`, `1 added concept = 2 tested handles - 1 prior eligible handle`, `520 = 518 + 2`,
`265 = 265 + 0`, `252 = 251 + 1`, `9 + 86 + 157 = 252`, `6 = 5 + 1`, `398 = 387
+ 11`, `2,496 = 2,423 + 73`, `136 = 135 + 1`, and `74 = 73 + 1`.

This source hash occurs once in the manifest. Removing it from the accepted Family-61
remainder leaves **14 rank-4/rank-5 path instances / 12 unique hashes**. The Family-61
method was reproduced first: its 15/13 row sets recomputed to
`038a0b83429e089cc78101765912c340eba8c183bfeec00a4b0c56b0ad9a021a` and
`ab34fcda50c731f47a18e936b7d9df17b682524f657b0211d58c7fd4430c4609`.
For the exact post-Family-62 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`b8a548371d624eba4823dd133057547a2ffe1d499f97800cbff294c10b3dab46`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`51ced3587e996fe46adad4a7bcc2d68b4eaae8302f321bdb6f47314f71d13d94`.
The next rank-4/rank-5 manifest-order gate is tier-5 Pathology practical source
`src_f370e46e69acd89946bb`, `Pathology 103 SEQs.pdf` (21,055 bytes; 1 native-text page;
SHA-256 `f370e46e69acd89946bbd95da53f945410bbf28e559088a1f5402059ab3a41d2`)
under `Year 1/LCS 103/Pathology/Practical Labs/Practical Revision/`. Tier-6 and rank-9 source
debts between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.

## Family 63 — Tier-5 Pathology practical-revision folder SEQ sheet with five unkeyed written prompts

### Source identity, provenance and complete boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_f370e46e69acd89946bb` |
| File / SHA-256 | `Pathology 103 SEQs.pdf` / `f370e46e69acd89946bbd95da53f945410bbf28e559088a1f5402059ab3a41d2` |
| File boundary | 21,055 bytes · unencrypted PDF · 1 physical native-text page · 595.5 × 841.92 pt |
| Manifest placement | `HU-LCS-103` · Pathology · Practical Labs · `Practical Revision` · tier 5 |
| Local corpus path | `Year 1/LCS 103/Pathology/Practical Labs/Practical Revision/Pathology 103 SEQs.pdf` |
| Visible provenance | The sole page prints only `Pathology 103 SEQs`; PDF metadata gives title `Untitled design`, author `Mohanad` and Canva creator/producer, with no university, department, instructor, sitting, mark or key label |
| Authority finding | Manifest/path-placed local module revision-question evidence. The printed module heading establishes LCS-103 relevance, but the source is not a recoverable sitting paper or official answer key. Despite its practical-revision folder, every task is ordinary written assessment rather than a specimen, image or station task. |

The assigned SHA-256, byte size and one-page boundary were recomputed and match the manifest.
The page was rendered at 180 dpi and read against the complete native text layer. It contains
one heading followed by three numbered groups. Group 1 has three separately lettered,
independently answerable comparisons; groups 2 and 3 each have one independently answerable
composite request. Accordingly, the source contributes **five written prompt occurrences**,
not merely the three outer numbers. The wording `Describe Chordoma as original and
microscopic picture` is preserved as printed; `original` is not silently repaired to
`origin` in the evidence layer.

There is no image, specimen, labelled plate, response line, blank, option set, answer text,
tick, highlight, delayed reveal or correctness convention. The complete source boundary is
therefore **5 ordinary written question records / 0 printed keys / 0 practical or station
prompts / 0 teaching plates / 0 teaching mappings / 0 masked or unresolved practical
callouts**. No medically inferable answer is promoted into a key.

### Exact prompt assignment, searches and prior-LCS adjudication

| Source prompt → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| 1A, rheumatoid arthritis versus osteoarthritis → `rheumatoid-arthritis-vs-osteoarthritis-comparison` | rheumatoid arthritis osteoarthritis compare; RA OA comparison; inflammatory versus degenerative arthritis; rheumatoid versus osteoarthritis | external records contain disease fragments but no complete two-way comparison; accepted Family-12 `ra-oa-gout-comparison` already owns this comparison as a strict subset | prior eligible-LCS reuse; inherited new; no concept delta |
| 1B, benign versus malignant soft-tissue tumours → `benign-vs-malignant-soft-tissue-tumor-comparison` | benign malignant soft tissue tumors compare; soft tissue tumor benign malignant; benign versus malignant mesenchymal tumor; soft tissue neoplasm behavior comparison | accepted Family-12 separately owns malignant-tumour enumeration and benign-tumour characteristics, but neither it nor a substantive external record owns the requested paired comparison | new |
| 1C, osteoid osteoma versus osteoblastoma → `osteoblastoma-vs-osteoid-osteoma-comparison` | osteoid osteoma osteoblastoma compare; osteoblastoma versus osteoid osteoma; benign osteoid tumor comparison; osteoid osteoma size aspirin osteoblastoma | exact accepted Family-12 tested comparison handle; external hits are fragments rather than a superseding complete scope | prior eligible-LCS reuse; inherited new; no concept delta |
| 2, chordoma as printed `original` plus microscopic picture → `chordoma-origin-and-microscopic-morphology` | chordoma origin microscopy; chordoma notochord physaliphorous cells; chordoma microscopic picture; chordoma sacrococcygeal origin histology | external embryology mentions of notochordal remnants do not own the pathology composite, and no accepted prior-LCS tested handle owns it | new; as-written wording retained |
| 3, gout pathogenesis plus diagnostic hallmark → `gout-pathogenesis-and-diagnostic-hallmark` | gout pathogenesis hallmark diagnosis; urate crystal gout pathogenesis; gout diagnostic hallmark crystals; monosodium urate negatively birefringent | live gout/hyperuricaemia material owns overproduction-versus-underexcretion pathogenesis and urate-deposition diagnosis; accepted prior-LCS gout handles own clinical/crystal recognition but not this complete mechanism-plus-hallmark composite | live; additive to eligible LCS |

The five source occurrences map one-to-one to five tested handles: there is no within-source
semantic repeat or response-unit collapse. All **5 × 4 = 20** required searches completed
across live state, pending state, `docs/import-ready`, `docs/questions-import-ready`, every
source-import root and accepted prior LCS. Direct complete-scope disposition is **1 live / 0
pending / 4 external new**. Exact accepted-prior adjudication removes two already tested
comparisons, leaving the module concept delta **1 live / 0 pending / 2 new = 3**. Search
matches establish coverage only; they supply neither answer text nor printed keys.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 63 | Family 63 delta | After Family 63 |
|---|---:|---:|---:|
| Eligible observed question records | 520 | +5 | 525 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 252 | +3 | 255 |
| Question live / pending / new | 9 / 86 / 157 | +1 / +0 / +2 | 10 / 86 / 159 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `1 physical page = 1 heading-bearing assessment
page`, `5 prompts = 3 lettered comparison units + 2 numbered composite units`, `5 tested
handles - 2 prior eligible reuses = 3 added concepts`, `1 + 0 + 2 = 3`, `525 = 520 + 5`,
`265 = 265 + 0`, `255 = 252 + 3`, `10 + 86 + 159 = 255`, `6 + 0 = 6`, `398 + 0 =
398`, `2,496 + 0 = 2,496`, `136 + 0 = 136`, and `74 + 0 = 74`.

This source hash occurs once in the manifest. Removing it from the accepted Family-62
remainder leaves **13 rank-4/rank-5 path instances / 11 unique hashes**. The Family-62
method was reproduced first: its 14/12 row sets recomputed to
`b8a548371d624eba4823dd133057547a2ffe1d499f97800cbff294c10b3dab46` and
`51ced3587e996fe46adad4a7bcc2d68b4eaae8302f321bdb6f47314f71d13d94`.
For the exact post-Family-63 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`8153903e8783e0270b3e82642a8cc3b0efcc74c89f32522fd4c9f1892f32d0fb`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`4275bc123b028640c1e7fe844847329e7030c721559945c26980efc63b7a9f7d`.
The next rank-4/rank-5 manifest-order gate is tier-4 Pathology theoretical source
`src_3328fde7f743cd67dc9f`, manifest `103   (1) and (2)bone diseases and tumors.pdf`
(863,512 bytes; 43 native-text pages; SHA-256
`3328fde7f743cd67dc9fabcdd320e6337d1b38a2f6f36a7fa2e347ededf359cb`) under `Year
1/LCS 103/Pathology/Theoretical/Lec 1 - Bone Diseases & Tumors/`; the local normalized
filename omits the manifest's two extra spaces after `103`. Tier-6 and rank-9 source debts
between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.

## Family 64 — Tier-4 Pathology theoretical Bone Diseases and Tumours lecture with two unkeyed self-test prompts

### Source identity, provenance and complete boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_3328fde7f743cd67dc9f` |
| File / SHA-256 | manifest `103   (1) and (2)bone diseases and tumors.pdf`; local normalized `103 (1) and (2)bone diseases and tumors.pdf` / `3328fde7f743cd67dc9fabcdd320e6337d1b38a2f6f36a7fa2e347ededf359cb` |
| File boundary | 863,512 bytes · unencrypted PDF · 43 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Pathology · Theoretical · `Lec 1 - Bone Diseases & Tumors` · tier 4 |
| Local corpus path | `Year 1/LCS 103/Pathology/Theoretical/Lec 1 - Bone Diseases & Tumors/103 (1) and (2)bone diseases and tumors.pdf` |
| Visible provenance | p. 1 prints `Locomotor Module 103`, `Lecture 1-Part I`, `Bone Lesions` and `Dr Rofanda Bakeer`; p. 29 prints `Lecture1-Part2`, `Bone Tumors` and `Dr Rofanda`; metadata identifies Microsoft PowerPoint 2016 and ilovepdf but supplies no title or author |
| Authority finding | Manifest/path-placed local module theoretical teaching and self-test evidence. It is not a recoverable sitting, department question bank, response form, practical station or official answer key. |

The assigned SHA-256, byte size and 43-page boundary were recomputed and match the source.
All 43 pages were rendered at 160 dpi and read against the complete native text layer; all
43 complete-page renders have distinct SHA-256 values. Page 1 is the Part-I title, pp. 2–28
are declarative bone-lesion teaching, p. 29 is the Part-II title, pp. 30–39 are declarative
bone-tumour teaching, p. 40 is the `Test Yourself` divider, pp. 41–42 contain one prompt
each, and p. 43 is the closing slide.

Pages 2–28 and 30–39 name and explain their diseases, classifications, mechanisms,
clinical patterns, laboratory findings, morphology or radiology; none asks the learner to
supply an answer. Pages 30–31 are teaching classification compositions despite their sparse
native text. Page 41 asks which bone tumour causes periosteal lifting, a Codman triangle and
sunburst X-ray appearance. Page 42 asks for the calcium, phosphorus and alkaline-phosphatase
pattern in osteomalacia. Neither page marks an option or prints an answer, and p. 43 gives no
delayed reveal. The radiologic wording on p. 41 is not accompanied by a radiograph, specimen
or learner-facing plate. The complete source boundary is therefore **37 theoretical teaching
compositions / 2 ordinary assessment prompt occurrences / 0 printed keys / 0 practical or
station prompts / 0 practical teaching plates / 0 practical mappings / 0 masked or unresolved
practical callouts**. No medically inferable response is promoted into a key.

### Complete teaching and assessment inventory

| Physical pages | Source-first composition | Teaching compositions | Assessment / key boundary |
|---:|---|---:|---:|
| 2–4 | course disease taxonomy, skeletal-dysplasia framework and achondroplasia | 3 | 0 |
| 5–10 | osteogenesis imperfecta clinical/radiologic teaching and osteopetrosis mechanism, forms, complications and histology | 6 | 0 |
| 11–12 | metabolic/endocrine bone-disease cause taxonomy | 2 | 0 |
| 13–16 | osteoporosis definition, clinical/laboratory pattern, types, causes and active/inactive turnover histology | 4 | 0 |
| 17–20 | osteitis fibrosa cystica, renal osteodystrophy and skeletal fluorosis | 4 | 0 |
| 21–22 | Paget disease distribution, stages, morphology and radiology | 2 | 0 |
| 23–28 | osteomyelitis overview/classification/chronic terminology, osteonecrosis and tumour-like lesions | 6 | 0 |
| 30–34 | primary bone-tumour classification, bone-forming group, osteoma and osteoid-osteoma/osteoblastoma | 5 | 0 |
| 35–39 | osteosarcoma, giant-cell tumour and Ewing sarcoma | 5 | 0 |
| 41 | Codman-triangle/sunburst bone-tumour MCQ | 0 | 1 ordinary prompt; 0 keys |
| 42 | osteomalacia calcium/phosphorus/ALP written request | 0 | 1 ordinary prompt; 0 keys |
| **Total** | **complete in-scope content boundary** | **37** | **2 prompts / 0 keys** |

The two self-test pages are source-distinct prompts and test two source-distinct handles; no
within-source prompt copy or response-unit collapse applies. The complete physical-page
arithmetic is **43 = 4 title/divider/closing pages + 37 teaching compositions + 2 assessment
pages**. No complete teaching page is duplicated.

### One-to-one assessment assignment, search and disposition

| Prompt assignment → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 41 → `sunburst-periosteal-lifting-bone-tumor-differential` | sunburst pattern; periosteal lifting; Codman triangle; bone tumor radiographic differential | exact accepted Family-12 tested handle, subsequently reused and extended by keyed pathology-bank evidence, already owns this option-neutral radiologic differential | prior eligible-LCS reuse; inherited new; no concept delta; no printed key |
| p. 42 → `osteomalacia-calcium-phosphorus-alkaline-phosphatase-pattern` | osteomalacia calcium phosphorus alkaline phosphatase; osteomalacia laboratory pattern; low calcium low phosphate high ALP; metabolic bone disease laboratory patterns | a strict subset of accepted Family-12 `metabolic-bone-disease-laboratory-patterns-table`, reinforced by accepted later osteomalacia laboratory teaching | prior eligible-LCS reuse; inherited new; no concept delta; no printed key |

Both occurrences remain eligible question records, but exact prior comparison gives `2 tested
handles - 2 prior eligible handles = 0 added concepts`. All **2 × 4 = 8** assessment searches
completed across live state, pending state, every source-import root and accepted prior LCS.
At direct external complete-scope grain both would be new; prior-eligible adjudication removes
both repeated module additions, leaving a module delta of **0 live / 0 pending / 0 new**.
Search matches establish coverage only and do not supply answer text or keys.

### Source-first theoretical teaching scopes, searches and prior-LCS adjudication

The 37 teaching compositions consolidate to 20 source-level theoretical scopes. Scope collapse
does not delete page or source-wording evidence.

| Teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `bone-disease-course-taxonomy-and-differential-objectives` · p. 2 | bone disease classification; developmental metabolic inflammatory neoplastic bone; bone lesion differential; bone disease learning objectives | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `skeletal-dysplasia-local-systemic-and-cell-process-classification` · p. 3 | skeletal dysplasia classification; localized versus systemic skeletal disorder; osteoclast dysfunction skeletal dysplasia; abnormal cellular process bone disease | no substantive complete-scope match — new theoretical teaching |
| `achondroplasia-endochondral-ossification-and-clinical-pattern` · p. 4 | achondroplasia endochondral ossification; FGFR3 achondroplasia; short limbs normal trunk achondroplasia; achondroplasia clinical pattern | accepted achondroplasia clinical/disease evidence owns the core and this page adds its ossification explanation — prior LCS reuse |
| `osteogenesis-imperfecta-type-i-collagen-clinical-radiologic-pattern` · pp. 5–8 | osteogenesis imperfecta type I collagen; blue sclera hearing loss brittle bone; wormian bones osteogenesis imperfecta; osteogenesis imperfecta radiology | accepted Family-17/19 eligible and earlier auxiliary evidence jointly owns the type-I-collagen and clinical/radiologic core — prior LCS reuse |
| `osteopetrosis-osteoclast-dysfunction-forms-complications-and-histology` · pp. 9–10 | osteopetrosis osteoclast dysfunction; marble bone disease complications; osteopetrosis infantile adult forms; osteopetrosis histology | accepted osteopetrosis disease and Family-62 practical evidence owns the osteoclast, density and histologic core — prior LCS reuse |
| `metabolic-endocrine-bone-disease-cause-taxonomy` · pp. 11–12 | metabolic bone disease classification; endocrine bone disease causes; osteoporosis osteomalacia hyperparathyroidism taxonomy; metabolic endocrine bone disorders | disease fragments exist, but no one substantive external or accepted prior scope owns the complete taxonomy — new theoretical teaching |
| `osteoporosis-definition-clinic-labs-types-causes-and-turnover-histology` · pp. 13–16 | osteoporosis low bone mass microarchitectural deterioration; osteoporosis normal calcium phosphorus alkaline phosphatase; primary secondary osteoporosis causes; high turnover low turnover osteoporosis histology | accepted osteoporosis assessment and teaching handles jointly own the density, laboratory, primary/secondary and turnover core — prior LCS reuse |
| `osteitis-fibrosa-cystica-hyperparathyroid-clinic-labs-and-morphology` · pp. 17–18 | osteitis fibrosa cystica hyperparathyroidism; brown tumor hypercalcemia hypophosphatemia; osteitis fibrosa cystica histology; subperiosteal bone resorption hyperparathyroidism | accepted hyperparathyroid/brown-tumour and Family-62 histology evidence owns the disease and morphology core — prior LCS reuse |
| `renal-osteodystrophy-crf-mineral-pth-pathogenesis-and-lesions` · p. 19 | renal osteodystrophy chronic renal failure; phosphate retention hypocalcemia secondary hyperparathyroidism; renal osteodystrophy bone lesions; renal failure vitamin D PTH bone | accepted Family-53 renal-osteodystrophy/calcitriol/PTH teaching owns the core — prior LCS reuse |
| `skeletal-fluorosis-exposure-pathogenesis-and-phenotype` · p. 20 | skeletal fluorosis; fluoride osteosclerosis bone; chronic fluoride exposure skeleton; fluorosis bone phenotype | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `paget-disease-site-stage-morphology-and-radiology` · pp. 21–22 | Paget disease bone stages; mosaic cement lines Paget; cotton wool skull Paget; Paget osteitis deformans morphology | accepted Paget stages/imaging, clinical and remodelling evidence owns the core — prior LCS reuse |
| `osteomyelitis-classification-and-chronic-sequestrum-involucrum-cloaca` · pp. 23–26 | osteomyelitis classification; sequestrum involucrum cloaca; chronic osteomyelitis sinus tract; pyogenic osteomyelitis morphology | accepted chronic-pyogenic-osteomyelitis and terminology evidence owns the core — prior LCS reuse |
| `osteonecrosis-etiologies-and-vascular-mechanisms` · p. 27 | osteonecrosis avascular necrosis causes; bone infarction vascular compromise; steroid alcohol osteonecrosis; osteonecrosis pathogenesis | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `tumor-like-bone-lesion-taxonomy` · p. 28 | tumor like bone lesions classification; bone cyst fibrous dysplasia brown tumor; non neoplastic bone lesion taxonomy; tumor-like lesions of bone | disease fragments exist, but no accepted complete taxonomy — new theoretical teaching |
| `primary-bone-tumor-histogenesis-age-and-location-classification` · pp. 30–31 | bone tumor classification tissue origin; primary bone tumor age location; epiphyseal metaphyseal diaphyseal tumor; bone neoplasm histogenesis | accepted Family-11/12 location and tissue-origin classification evidence owns the core — prior LCS reuse |
| `bone-forming-tumor-group-and-osteoma-phenotype` · pp. 32–33 | bone forming tumors classification; osteoma clinical morphology; osteoma compact cancellous bone; osteogenic tumor group | accepted bone-forming-matrix and osteoma evidence jointly owns the core — prior LCS reuse |
| `osteoid-osteoma-versus-osteoblastoma-clinic-radiology-histology` · p. 34 | osteoid osteoma osteoblastoma comparison; osteoid osteoma nidus nocturnal pain aspirin; osteoblastoma spine size; osteoid osteoma histology | exact accepted comparison plus accepted clinicoradiologic evidence owns the core — prior LCS reuse |
| `osteosarcoma-definition-primary-secondary-classification-clinic-radiology-metastasis` · pp. 35–37 | osteosarcoma classification primary secondary; Codman triangle sunburst osteosarcoma; osteosarcoma pulmonary metastasis; osteosarcoma malignant osteoid clinical | accepted osteosarcoma differential, radiology and morphology evidence jointly owns the core — prior LCS reuse |
| `giant-cell-tumor-gross-and-stromal-giant-cell-histology` · p. 38 | giant cell tumor gross histology; osteoclastoma mononuclear stromal cells; giant cell tumor epiphysis soap bubble; giant cell tumor morphology | accepted giant-cell-tumour site, stromal-cell and practical-histology evidence owns the core — prior LCS reuse |
| `ewing-sarcoma-variants-site-clinic-and-onion-skin-radiology` · p. 39 | Ewing sarcoma onion skin; Ewing PNET Askin variants; Ewing diaphysis children; Ewing sarcoma clinical radiology | accepted Ewing clinical/radiology and location evidence owns the core — prior LCS reuse |

All **20 × 4 = 80** teaching-scope searches completed across live state, pending state, all
source-import roots and accepted prior LCS. At complete-scope grain the direct external result
is **0 live / 0 pending / 20 new**. Exact accepted-prior comparison prevents 14 repeated
module additions, leaving **14 prior-LCS reuses / 6 new theoretical-teaching scopes**. Together
with the assessment handles, Family 64 completed **88 required searches**. Declarative
teaching scopes do not enter the eligible tested-concept or practical-scope counts.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 64 | Family 64 delta | After Family 64 |
|---|---:|---:|---:|
| Eligible observed question records | 525 | +2 | 527 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 255 | +0 | 255 |
| Question live / pending / new | 10 / 86 / 159 | +0 / +0 / +0 | 10 / 86 / 159 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `43 = 4 + 37 + 2`, `37 = 3 + 6 + 2 + 4 + 4
+ 2 + 6 + 5 + 5`, `2 = 2 prompts - 0 repeated source occurrences`, `0 added concepts =
2 tested handles - 2 prior eligible handles`, `527 = 525 + 2`, `265 = 265 + 0`, `255 =
255 + 0`, `10 + 86 + 159 = 255`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496 + 0 =
2,496`, `136 + 0 = 136`, and `74 + 0 = 74`.

This source hash occurs once in the manifest. Removing it from the accepted Family-63
remainder leaves **12 rank-4/rank-5 path instances / 10 unique hashes**. The Family-63
method was reproduced first: its 13/11 row sets recomputed to
`8153903e8783e0270b3e82642a8cc3b0efcc74c89f32522fd4c9f1892f32d0fb` and
`4275bc123b028640c1e7fe844847329e7030c721559945c26980efc63b7a9f7d`.
For the exact post-Family-64 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`ccdda56b5597164f9a6ea9810a7b41ba8a13415a8a2d53f6a42c2b86724e2942`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`6873596c38d12745f5e5e48ae9734fff171928e756c60aa91fe9077368bda6ea`.
The next rank-4/rank-5 manifest-order gate is tier-4 Pathology theoretical source
`src_6995e894c8b7f13c8809`, manifest `103  (3) joints.pdf` (1,210,435 bytes; 31
native-text pages; SHA-256
`6995e894c8b7f13c88097fced41e6d68b9af3d2a05b8a49203eff09d46be5378`) under `Year 1/LCS
103/Pathology/Theoretical/Lec 2 - Joint Diseases & Tumors/`; the local normalized filename
omits one of the manifest's two spaces after `103`. Tier-6 and rank-9 source debts between
rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains incomplete. No
download, ID, content record, catalogue update, import or source copy was created.

## Family 65 — Tier-4 Pathology theoretical Joint Diseases and Tumours lecture with five unkeyed self-test MCQs

### Source identity, provenance and complete boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_6995e894c8b7f13c8809` |
| File / SHA-256 | manifest `103  (3) joints.pdf`; local normalized `103 (3) joints.pdf` / `6995e894c8b7f13c88097fced41e6d68b9af3d2a05b8a49203eff09d46be5378` |
| File boundary | 1,210,435 bytes · unencrypted PDF · 31 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Pathology · Theoretical · `Lec 2 - Joint Diseases & Tumors` · tier 4 |
| Local corpus path | `Year 1/LCS 103/Pathology/Theoretical/Lec 2 - Joint Diseases & Tumors/103 (3) joints.pdf` |
| Visible provenance | p. 1 prints `Locomotor Pathology 103`, `Lecture 3`, `Joints` and `Dr Rofanda Bakeer`; the manifest folder calls this `Lec 2`; PDF metadata retains the unrelated title `Respiratory Module Lecture 1`, author `lenovo`, and Microsoft PowerPoint 2016 creator/producer |
| Authority finding | Manifest/path-placed local module theoretical teaching and self-test evidence. It is not a recoverable sitting, department question bank, response form, practical station or official answer key. The visible lecture number and manifest-folder number are retained without reconciliation. |

The assigned SHA-256, byte size and 31-page boundary were recomputed and match the source.
All 31 pages were rendered at 160 dpi and read against the complete native text layer; all
31 complete-page renders have distinct SHA-256 values. Page 1 is the title/provenance slide;
pp. 2–24 are declarative teaching; p. 25 is the `Test Yourself` divider; pp. 26–30 contain
one MCQ each; and p. 31 is the graphic closing slide.

The labelled diagrams and photomicrographs on pp. 6, 11, 15, 18, 21 and 24 are simultaneous
declarative teaching: disease names and findings are printed on the same pages, with no
learner request, blank or masked label. Page 21's printed `Physaliferous cells` label is
preserved as source wording. None of the five option sets is marked, coloured, ticked or
followed by a delayed reveal. The complete source boundary is therefore **23 theoretical
teaching compositions / 5 ordinary assessment prompt occurrences / 0 printed keys / 0
practical or station prompts / 0 practical teaching plates / 0 practical mappings / 0 masked
or unresolved practical callouts**. No medically inferable option is promoted into a key.

### Complete teaching and assessment inventory

| Physical pages | Source-first composition | Teaching compositions | Assessment / key boundary |
|---:|---|---:|---:|
| 2–3 | objectives and joint-disease aetiologic/classification frame | 2 | 0 |
| 4–8 | osteoarthritis definition, primary/secondary causes, clinical pattern, diagram, radiology and morphology | 5 | 0 |
| 9–11 | rheumatoid-arthritis multisystem clinic, laboratory/radiology and synovial histology | 3 | 0 |
| 12–13 | suppurative and tuberculous arthritis | 2 | 0 |
| 14–16 | gout stages/podagra/tophi and pseudogout | 3 | 0 |
| 17–19 | ganglion cyst and bursitis | 3 | 0 |
| 20–24 | chordoma, chondroblastoma and chondrosarcoma | 5 | 0 |
| 26 | leading cause of disability after age 55 differential | 0 | 1 ordinary MCQ; 0 keys |
| 27 | low-trauma hip and vertebral-fracture differential | 0 | 1 ordinary MCQ; 0 keys |
| 28 | destructive calcified pelvic bluish-white tumour differential | 0 | 1 ordinary MCQ; 0 keys |
| 29 | cytopenic back-pain, jelly-like marrow-aspirate cell-type differential | 0 | 1 ordinary MCQ; 0 keys |
| 30 | febrile child with diaphyseal small-round-blue-cell tumour differential | 0 | 1 ordinary MCQ; 0 keys |
| **Total** | **complete in-scope content boundary** | **23** | **5 prompts / 0 keys** |

The five assessment pages are five source-distinct prompts and map to five source-distinct
tested handles; there is no within-source wording repeat or response-unit collapse. The
complete physical-page arithmetic is **31 = 3 title/divider/closing pages + 23 teaching
compositions + 5 assessment pages**. No complete teaching page is duplicated.

### One-to-one assessment assignment, search and disposition

| Prompt assignment → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 26 → `older-adult-leading-disability-arthropathy-differential` | most common cause disability over 55; older adult leading disability arthritis; osteoarthritis disability elderly; arthritis disability age 55 | accepted OA handles own clinical/aetiologic features but not this age-bounded leading-disability ranking; no complete external record owns it | new; no printed key |
| p. 27 → `osteoporosis-density-and-fragility-diagnosis` | elderly hip vertebral fracture; osteoporosis fragility fracture; femoral head T10 compression fracture; low trauma fracture osteoporosis | exact accepted Family-17/18/19 eligible handle; pending density/fragility material owns the clinical core | pending; prior eligible-LCS reuse; no concept delta; no printed key |
| p. 28 → `chondrosarcoma-clinicoradiologic-gross-diagnosis` | pelvic ischium destructive calcified mass; bluish white cartilage tumor pelvis; chondrosarcoma pelvic mass calcification; chondrosarcoma clinicoradiologic diagnosis | accepted Family-17/19 keyed chondrosarcoma evidence already owns the pelvic, calcified, destructive and bluish-white diagnostic pattern | prior eligible-LCS reuse; inherited new; no concept delta; no printed key |
| p. 29 → `multiple-myeloma-marrow-plasma-cell-diagnostic-pattern` | dark red jelly bone marrow aspirate; multiple myeloma plasma cells marrow; pancytopenia back pain plasma cells; sternal marrow aspirate plasma cells | accepted multiple-myeloma diagnostic handle plus pending marrow-plasma-cell evidence owns the cytopenia, back-pain and aspirate-cell core | pending; prior eligible-LCS reuse; no concept delta; no printed key |
| p. 30 → `ewing-sarcoma-small-round-blue-cell-diaphyseal-diagnosis` | child diaphyseal small round blue cells; Ewing sarcoma femur fever; Ewing diaphysis round blue cell; pediatric bone mass Ewing diagnosis | accepted Family-18/20 eligible Ewing handle owns child age, diaphyseal site, fever and small-round-blue-cell pattern | prior eligible-LCS reuse; inherited new; no concept delta; no printed key |

All **5 × 4 = 20** assessment searches completed across live state, pending state, every
source-import root and accepted prior LCS. At direct complete-scope grain the five handles are
**0 live / 2 pending / 3 external new**. Exact prior-eligible adjudication removes four
already tested scopes, leaving `5 tested handles - 4 prior eligible handles = 1 added
concept` and a module delta of **0 live / 0 pending / 1 new**. Search matches establish
coverage only and do not supply answer text or keys.

### Source-first theoretical teaching scopes, searches and prior-LCS adjudication

The 23 teaching compositions consolidate to 12 source-level theoretical scopes. Scope collapse
does not delete page, diagram, label or source-wording evidence.

| Teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `joint-disease-objectives-and-etiologic-classification` · pp. 2–3 | joint disease classification etiology; osteoarthritis rheumatoid suppurative tuberculous arthritis; cystic lesions joints ganglion bursitis; joint tumor nature behavior prognosis | no substantive complete external or accepted prior-LCS taxonomy — new theoretical teaching |
| `osteoarthritis-primary-secondary-pathogenesis-clinic-radiology-morphology` · pp. 4–8 | primary secondary osteoarthritis causes; osteoarthritis Heberden nodes; osteoarthritis joint space osteophytes loose bodies; osteoarthritis microcysts damaged cartilage | accepted OA clinical/aetiologic, age and keyed diagnostic evidence jointly owns the disease core — prior LCS reuse |
| `rheumatoid-arthritis-multisystem-clinic-labs-radiology-synovial-histology` · pp. 9–11 | rheumatoid arthritis systemic manifestations; rheumatoid factor ESR ulnar deviation; rheumatoid synovium villous hypertrophy; rheumatoid lymphoid follicles histology | accepted RA clinical/aetiologic, serologic and joint-pattern evidence owns the core — prior LCS reuse |
| `suppurative-arthritis-routes-organisms-and-clinical-pattern` · p. 12 | suppurative arthritis hematogenous spread; septic arthritis causative organisms; infectious arthritis joint effusion neutrophilic leukocytosis; suppurative arthritis immunocompromised | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `tuberculous-arthritis-spread-sites-and-morphology` · p. 13 | tuberculous arthritis hematogenous spread; Pott disease tuberculous spondylitis; tuberculous arthritis caseating tubercles; tuberculous joint rice bodies caries | prior Pott-disease evidence is narrower and does not own the complete joint spread/site/morphology scope — new theoretical teaching |
| `gout-purine-urate-stages-podagra-tophi-histology` · pp. 14–15 | gout purine metabolism hyperuricemia; gout clinical stages; podagra monosodium urate tophi; gout tophus histology giant cells | live gout/urate and accepted Family-62 clinical/crystal/practical evidence jointly owns the core — prior LCS reuse |
| `pseudogout-calcium-pyrophosphate-and-associations` · p. 16 | pseudogout calcium pyrophosphate; pyrophosphate arthropathy; pseudogout metabolic associations; CPPD elderly joint disease | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `ganglion-cyst-clinic-pathogenesis-gross-histology` · pp. 17–18 | ganglion cyst dorsum wrist; ganglion clear mucinous fluid; ganglion cyst synovial lining histology; ganglion cyst pathogenesis | exact accepted Family-21 clinicopathologic and Family-62 practical evidence owns the core — prior LCS reuse |
| `bursitis-causes-gross-and-histologic-pattern` · p. 19 | bursitis mechanical trauma; housemaids knee tennis elbow bursitis; bursitis thick walled bursal sac; bursitis granulation tissue histology | accepted popliteal-bursitis clinical evidence is narrower and does not own the complete cause/gross/histology scope — new theoretical teaching |
| `chordoma-origin-site-clinic-gross-and-microscopy` · pp. 20–21 | chordoma notochord origin; chordoma sacral spheno-occipital; chordoma physaliphorous cells; chordoma gelatinous gross histology | accepted Family-63 chordoma-origin/microscopy handle owns the core — prior LCS reuse |
| `chondroblastoma-age-site-radiology-gross-and-histology` · p. 22 | chondroblastoma epiphysis under 20; chondroblastoma calcified lytic lesion; chondroblastoma chicken wire calcification; chondroblastoma giant cells histology | prior epiphyseal-tumour differential is narrower and no accepted complete disease scope exists — new theoretical teaching |
| `chondrosarcoma-classification-clinic-gross-and-histology` · pp. 23–24 | chondrosarcoma central peripheral; chondrosarcoma bluish white gelatinous mass; chondrosarcoma anaplastic cartilage lobules; chondrosarcoma metastasis lung liver kidney brain | accepted chondrosarcoma assessment/morphology and Family-62 practical evidence owns the core — prior LCS reuse |

All **12 × 4 = 48** teaching-scope searches completed across live state, pending state, all
source-import roots and accepted prior LCS. At complete-scope grain the direct external result
is **0 live / 0 pending / 12 new**. Exact accepted-prior comparison prevents six repeated
module additions, leaving **6 prior-LCS reuses / 6 new theoretical-teaching scopes**. Together
with the assessment handles, Family 65 completed **68 required searches**. Declarative
teaching scopes do not enter eligible tested-concept or practical-scope counts.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 65 | Family 65 delta | After Family 65 |
|---|---:|---:|---:|
| Eligible observed question records | 527 | +5 | 532 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 255 | +1 | 256 |
| Question live / pending / new | 10 / 86 / 159 | +0 / +0 / +1 | 10 / 86 / 160 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `31 = 3 + 23 + 5`, `23 = 2 + 5 + 3 + 2 + 3
+ 3 + 5`, `5 = 5 prompts - 0 repeated source occurrences`, `1 added concept = 5 tested
handles - 4 prior eligible handles`, `532 = 527 + 5`, `265 = 265 + 0`, `256 = 255 + 1`,
`10 + 86 + 160 = 256`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496 + 0 = 2,496`, `136 +
0 = 136`, and `74 + 0 = 74`.

This source hash occurs once in the manifest. Removing it from the accepted Family-64
remainder leaves **11 rank-4/rank-5 path instances / 9 unique hashes**. The Family-64
method was reproduced first: its 12/10 row sets recomputed to
`ccdda56b5597164f9a6ea9810a7b41ba8a13415a8a2d53f6a42c2b86724e2942` and
`6873596c38d12745f5e5e48ae9734fff171928e756c60aa91fe9077368bda6ea`.
For the exact post-Family-65 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`2532b563552e572beb00e32f39fcc6c477834ceef7b891b2331617f5cecc652e`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`21aa1ba9ec98c5797c4ab5bccb6243d42972938390d271731211a39d60175ac5`.
The next rank-4/rank-5 manifest-order gate is tier-4 Pathology theoretical source
`src_237f83bb42bf143fefdf`, manifest `103  (4) Soft Tissue Tumors.pdf` (1,870,745 bytes;
29 native-text pages; SHA-256
`237f83bb42bf143fefdfd1bb5be5fefda31fa451da2ae98c4c71944c852a312a`) under `Year 1/LCS
103/Pathology/Theoretical/Lec 3 - Soft Tissue Lesions & Tumors/`; the local normalized
filename omits one of the manifest's two spaces after `103`. Tier-6 and rank-9 source debts
between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains
incomplete. No download, ID, content record, catalogue update, import or source copy was
created.

## Family 66 — Tier-4 Pathology theoretical Soft Tissue Tumours teaching-only lecture

### Source identity, provenance and complete boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_237f83bb42bf143fefdf` |
| File / SHA-256 | manifest `103  (4) Soft Tissue Tumors.pdf`; local normalized `103 (4) Soft Tissue Tumors.pdf` / `237f83bb42bf143fefdfd1bb5be5fefda31fa451da2ae98c4c71944c852a312a` |
| File boundary | 1,870,745 bytes · unencrypted PDF · 29 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Pathology · Theoretical · `Lec 3 - Soft Tissue Lesions & Tumors` · tier 4 |
| Local corpus path | `Year 1/LCS 103/Pathology/Theoretical/Lec 3 - Soft Tissue Lesions & Tumors/103 (4) Soft Tissue Tumors.pdf` |
| Visible provenance | p. 1 prints `SOFT TISSUE TUMORS` and `DR HEBAT ALLAH AMIN`; metadata instead records title `PowerPoint Presentation` and author `Yahya M. Yahya`, with Microsoft PowerPoint for Microsoft 365 creator/producer; p. 28 cites WebPath, the Helwan Locomotor Bank and Robbins & Cotran |
| Authority finding | Manifest/path-placed local module theoretical teaching evidence. It is not a recoverable sitting, department question bank, response form, practical station or official answer key. The p. 28 self-study/assessment repository reference does not turn this deck into assessment evidence. |

The assigned SHA-256, byte size and 29-page boundary were recomputed and match the source.
All 29 pages were rendered at 160 dpi and read against the complete native text layer; all
29 complete-page renders have distinct SHA-256 values. Page 1 is the title/provenance slide;
pp. 2–19 are declarative soft-tissue-tumour teaching; p. 20 is a `Diagnosis!!!` section
divider; p. 21 supplies declarative immunohistochemical diagnostic guidance; pp. 22–27 are
declarative bone-tumour recap/extension teaching; p. 28 is the reference slide; and p. 29 is
the closing slide.

The gross specimens and photomicrographs on pp. 8–19 and 26 are simultaneous declarative
teaching because the source prints the disease/category and findings on the same page. Pages
24 and 25 reuse the same four-pattern periosteal-reaction graphic, but p. 25 adds a title and
Helwan marks; the two complete-page renders are distinct while the repeated embedded graphic
is collapsed at scope grain. Page 27 is a summary composition that repeats earlier taxonomy
and contributes no separate scope. Page 20 contains only a divider heading and emoji, not a
target case, specimen or learner response request; p. 21 immediately follows with teaching
statements rather than an answer reveal. No page contains an option set, question stem,
response line, answer, tick, highlight, masked label or practical station instruction.

The complete source boundary is therefore **25 theoretical teaching compositions / 0
assessment prompt occurrences / 0 printed keys / 0 practical or station prompts / 0 practical
teaching plates / 0 practical mappings / 0 masked or unresolved practical callouts**. No
diagnosis or image identity is inferred beyond the source's printed labels.

### Complete teaching and assessment inventory

| Physical pages | Source-first composition | Teaching compositions | Assessment / key boundary |
|---:|---|---:|---:|
| 2–7 | objectives, tissue origins, `-oma`/sarcoma nomenclature, benign/malignant behaviour and category taxonomy | 6 | 0 |
| 8–9 | lipoma and liposarcoma gross/microscopic teaching | 2 | 0 |
| 10–12 | fibroma, fibromatosis and fibrosarcoma gross/microscopic teaching | 3 | 0 |
| 13–16 | peripheral-nerve, benign and malignant smooth-muscle, and rhabdomyosarcoma teaching | 4 | 0 |
| 17–19 | hemangioma, angiosarcoma and synovial-sarcoma teaching | 3 | 0 |
| 21 | immunohistochemical diagnostic-adjunct teaching | 1 | 0 |
| 22–27 | bone-tumour frequency/classification table, periosteal-reaction patterns, osteoid-osteoma/osteoblastoma comparison and summary | 6 | 0 |
| **Total** | **complete in-scope content boundary** | **25** | **0 prompts / 0 keys** |

The complete physical-page arithmetic is **29 = 4 title/divider/reference/closing pages + 25
teaching compositions + 0 assessment pages**. The 25 teaching occurrences contain no exact
complete-page copy; the repeated pp. 24–25 embedded periosteal graphic and p. 27 summary are
retained as source occurrences but collapsed in the scope ledger.

### Source-first theoretical teaching scopes, searches and prior-LCS adjudication

The 25 teaching compositions consolidate to 17 source-level theoretical scopes. Scope collapse
does not delete page, gross-image, micrograph, label or source-wording evidence.

| Teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `soft-tissue-tumor-origin-classification-nomenclature-and-behavior` · pp. 2–7, 27 | soft tissue tumor tissue origins; oma benign sarcoma malignant; benign soft tissue tumor behavior; malignant soft tissue tumor hematogenous metastasis | accepted Family-12 tissue-origin, benign-characteristics and malignant-enumeration evidence owns the core — prior LCS reuse |
| `lipoma-gross-and-mature-adipocyte-morphology` · p. 8 | lipoma encapsulated yellow greasy mass; lipoma mature adipocytes; common soft tissue tumor adults; benign adipose tumor morphology | exact accepted Family-18/20 lipoma clinicopathologic evidence owns the core — prior LCS reuse |
| `liposarcoma-adult-retroperitoneal-lipoblast-pattern` · p. 9 | liposarcoma retroperitoneum adults; lipoblast hyperchromatic nucleus; liposarcoma mature adipocytes spindle cells; deep soft tissue liposarcoma | exact accepted Family-20 liposarcoma clinicopathologic handle owns the core — prior LCS reuse |
| `fibroma-bland-spindle-cell-morphology` · p. 10 | fibroma bland spindle cells; benign fibroblast tumor; finger fibroma histology; circumscribed fibrous tumor | accepted Family-20 bland-fibrous-mass differential owns the source's benign fibroblastic/spindle-cell core — prior LCS reuse |
| `fibromatosis-locally-aggressive-infiltrative-fibroblasts` · p. 11 | fibromatosis locally aggressive; fibromatosis infiltrative borders; desmoid bland spindle cells; fibroblastic tumor local aggression | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `fibrosarcoma-hemorrhagic-herringbone-spindle-pattern` · p. 12 | fibrosarcoma herringbone pattern; malignant fibroblast spindle cells; fibrosarcoma hemorrhagic cut surface; fibrosarcoma morphology | live fibrosarcoma material and exact accepted Family-17/20 handle own the herringbone spindle-cell core — live; prior LCS reuse |
| `schwannoma-neurofibroma-circumscribed-wavy-spindle-pattern` · p. 13 | schwannoma neurofibroma wavy nuclei; peripheral nerve sheath tumor spindle cells; circumscribed nerve sheath neoplasm; schwannoma neurofibroma morphology | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `leiomyoma-firm-white-intersecting-spindle-fascicles` · p. 14 | leiomyoma firm white mass; leiomyoma intersecting fascicles; eosinophilic spindle cells right angles; smooth muscle benign tumor morphology | accepted Family-19 uterine-leiomyoma gross/microscopic handle owns the core — prior LCS reuse |
| `malignant-smooth-muscle-tumor-gross-histology-immunophenotype` · p. 15 | malignant smooth muscle tumor necrosis; pleomorphic spindle cells interweaving fascicles; actin desmin caldesmon sarcoma; smooth muscle sarcoma histology | no complete external or accepted prior-LCS scope; the source does not print a more specific disease name — new theoretical teaching |
| `rhabdomyosarcoma-childhood-soft-tissue-sarcoma-pattern` · p. 16 | rhabdomyosarcoma children soft tissue; skeletal muscle malignant tumor variants; childhood soft tissue sarcoma; rhabdomyosarcoma gross histology | accepted Family-20 childhood-rhabdomyosarcoma clinicopathologic evidence owns the core — prior LCS reuse |
| `hemangioma-red-mass-variable-vessel-flat-endothelium` · p. 17 | hemangioma red mass; variable sized vessels flat endothelium; benign vascular tumor histology; hemangioma morphology | accepted infantile-hemangioma clinical evidence plus live vascular-space morphology owns the core — prior LCS reuse |
| `angiosarcoma-red-mass-branching-vessel-anaplastic-endothelium` · p. 18 | angiosarcoma branching vessels; anaplastic endothelium vascular tumor; angiosarcoma red mass; malignant vascular tumor histology | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `synovial-sarcoma-young-adult-parajoint-lower-extremity-pattern` · p. 19 | synovial sarcoma adjacent joint misnomer; young adult lower extremity synovial sarcoma; parajoint soft tissue sarcoma; synovial sarcoma age 20 40 | exact accepted Family-20 synovial-sarcoma clinicopathologic handle owns the core — prior LCS reuse |
| `soft-tissue-tumor-immunohistochemical-diagnostic-panel` · p. 21 | soft tissue tumor immunohistochemistry; S100 desmin vimentin cytokeratin panel; sarcoma diagnostic adjunct immunostains; soft tissue neoplasm marker panel | no substantive complete external or accepted prior-LCS panel scope — new theoretical teaching |
| `bone-tumor-frequency-histogenesis-age-location-morphology-table` · pp. 22–23, 27 | bone tumor classification age location morphology; metastasis commonest bone tumor; multiple myeloma primary bone tumor ranking; bone tumor histogenesis table | accepted bone-tumour tissue-origin/ranking and disease-location evidence owns the core — prior LCS reuse |
| `periosteal-reaction-patterns-onion-codman-solid-sunburst` · pp. 24–25 | periosteal reaction patterns; onion skin Codman solid sunburst; rapidly growing bone lesion periosteum; hair on end periosteal reaction | accepted Ewing/osteosarcoma radiology and periosteal-lifting evidence jointly owns the source's core; repeated embedded graphic collapsed — prior LCS reuse |
| `osteoid-osteoma-versus-osteoblastoma-clinic-radiology-histology` · p. 26 | osteoid osteoma osteoblastoma comparison; osteoid osteoma aspirin less than 2 cm; osteoblastoma vertebral posterior elements; woven bone osteoblasts vascular stroma | exact accepted Family-12/64 comparison and clinicoradiologic evidence owns the core — prior LCS reuse |

All **17 × 4 = 68** required teaching-scope searches completed across live state, pending
state, all source-import roots and accepted prior LCS. At complete-scope grain the direct
external result is **1 live / 0 pending / 16 new**. Exact accepted-prior comparison prevents
12 repeated module additions, leaving **12 prior-LCS reuses / 5 new theoretical-teaching
scopes**. Page 27 adds no eighteenth scope because it is a direct recap of the two taxonomy
scopes already counted. Declarative teaching scopes do not enter eligible tested-concept or
practical-scope counts.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 66 | Family 66 delta | After Family 66 |
|---|---:|---:|---:|
| Eligible observed question records | 532 | +0 | 532 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 256 | +0 | 256 |
| Question live / pending / new | 10 / 86 / 160 | +0 / +0 / +0 | 10 / 86 / 160 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `29 = 4 + 25 + 0`, `25 = 6 + 2 + 3 + 4 + 3
+ 1 + 6`, `0 assessment prompts / 0 printed keys`, `532 = 532 + 0`, `265 = 265 + 0`,
`256 = 256 + 0`, `10 + 86 + 160 = 256`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496 + 0 =
2,496`, `136 + 0 = 136`, and `74 + 0 = 74`.

This source hash occurs once in the manifest. Removing it from the accepted Family-65
remainder leaves **10 rank-4/rank-5 path instances / 8 unique hashes**. The Family-65
method was reproduced first: its 11/9 row sets recomputed to
`2532b563552e572beb00e32f39fcc6c477834ceef7b891b2331617f5cecc652e` and
`21aa1ba9ec98c5797c4ab5bccb6243d42972938390d271731211a39d60175ac5`.
For the exact post-Family-66 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`57a67bac750010a429c3355ad2b6ab5342e724889c370dbcf2ff57ae3367e0fd`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`35930a1384727b2668919d9dc8de8bf9d57978e4920c20133454bad9407e8cc9`.
The next rank-4/rank-5 manifest-order gate is tier-4 Pharmacology theoretical source
`src_d08bcb59d5e3d0154b28`, `Analgesics.pdf` (231,330 bytes; 17 native-text pages;
SHA-256 `d08bcb59d5e3d0154b28bf10cd3442f5698cab8e8354206d41cab4bc5763d22b`) under `Year
1/LCS 103/Pharmacology/Theoretical/Lec 1 - Pharmacology of NSAIDs 1 (Aspirin)/`. The same
hash also occurs later under the acetaminophen lecture folder, so the remainder retains two
path instances but one unique hash for that pair until both paths are adjudicated. Tier-6 and
rank-9 source debts between rank-4/rank-5 gates remain outside this remainder. Broader
LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update, import or
source copy was created.

## Family 67 — Tier-4 Pharmacology theoretical Analgesics teaching-only duplicate-hash family

### Source identity, duplicate-path authority and complete boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_d08bcb59d5e3d0154b28` |
| File / SHA-256 | `Analgesics.pdf` / `d08bcb59d5e3d0154b28bf10cd3442f5698cab8e8354206d41cab4bc5763d22b` |
| File boundary | 231,330 bytes · unencrypted PDF · 17 physical native-text pages · 595.32 × 841.92 pt |
| Current manifest path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 1 - Pharmacology of NSAIDs 1 (Aspirin)/Analgesics.pdf` · tier 4 |
| Identical later manifest path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 3 - Pharmacology of Acetaminophen/Analgesics.pdf` · same source ID, SHA-256, byte size and 17-page boundary |
| Manifest duplicate metadata | the current row is `twinPreferred: true` and points to the acetaminophen-folder copy in `duplicateOf`; its normalized `subfolder` field nevertheless says `Lec 3 - Pharmacology of Acetaminophen`, so row path and normalized subfolder are preserved without reconciliation |
| Visible provenance | p. 1 prints only `Analgesics`; PDF metadata records author `mustafa elsayed` and Microsoft Word for Microsoft 365 creator/producer, with no university, module, instructor, sitting or assessment label |
| Authority finding | Manifest/path-placed local module theoretical teaching evidence. It is not a recoverable sitting, department question bank, response form, practical station or official answer key. The two manifest paths are byte-identical copies of one content object, so content is inventoried once while path debt remains path-sensitive. |

Both local path instances were recomputed at 231,330 bytes and the exact assigned SHA-256;
both report the same unencrypted 17-page boundary. The preferred Lec-1 path was rendered at
180 dpi and read against the complete native text layer; all 17 complete-page renders have
distinct SHA-256 values. Since the Lec-3 path is bitwise identical, rendering or counting it
again would manufacture duplicate content evidence. Page 1 is the title page and pp. 2–17
are continuous declarative pharmacology teaching.

The source contains definitions, classifications, prose, numbered facts and adverse-effect/
contraindication tables only. Imperative safety phrases such as `Remember`, `Avoid large
dose` and treatment bullets are teaching statements, not learner requests. The visibly empty
table cell at the top of p. 17 is continuation/layout residue from the preceding adverse-effect
table, not a response blank or masked callout. There is no question stem, option set, response
line, answer, tick, highlight, delayed reveal, specimen, image-identification task or station
instruction. The complete unique-content boundary is therefore **16 theoretical teaching
compositions / 0 assessment prompt occurrences / 0 printed keys / 0 practical or station
prompts / 0 practical teaching plates / 0 practical mappings / 0 masked or unresolved
practical callouts**.

### Complete teaching and assessment inventory

| Physical pages | Source-first composition | Teaching compositions | Assessment / key boundary |
|---:|---|---:|---:|
| 2–4 | analgesic definition, central/peripheral and non-opioid chemical/selectivity classifications, COX-2/COX-3 notes and salicylate derivatives | 3 | 0 |
| 5–6 | aspirin pharmacokinetics, dose-dependent elimination, COX/TXA2 mechanism, local actions and analgesic/antipyretic actions | 2 | 0 |
| 7–10 | anti-inflammatory, respiratory/acid-base, cardiovascular, blood, uric-acid, gastrointestinal, renal, metabolic/endocrine/liver and therapeutic-use teaching | 4 | 0 |
| 11–12 | aspirin interactions, acute/chronic toxicity, treatment, adverse effects and contraindications | 2 | 0 |
| 13–14 | acetaminophen pharmacokinetics/actions, NAPQI/glutathione toxicity, N-acetylcysteine treatment and benorylate | 2 | 0 |
| 15–17 | phenylbutazone, indomethacin, sulindac and remaining NSAID derivative classes | 3 | 0 |
| **Unique content total** | **one hash across two manifest paths** | **16** | **0 prompts / 0 keys** |

The unique-content page arithmetic is **17 = 1 title page + 16 teaching compositions + 0
assessment pages**. The later 17-page twin is retained as a manifest path occurrence but adds
**0 pages, 0 teaching compositions and 0 assessment evidence** to this family.

### Source-first theoretical teaching scopes, searches and prior-LCS adjudication

The 16 teaching compositions consolidate to 15 source-level theoretical scopes. Scope collapse
does not delete page, table or source-wording evidence.

| Teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `analgesic-definition-central-peripheral-classification` · p. 2 | analgesics relieve pain without loss consciousness; central peripheral analgesics classification; opioid non opioid co analgesics; adjuvant analgesics classification | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `nonopioid-analgesic-chemical-and-cox-selectivity-classification` · pp. 3–4 | non opioid analgesics chemical classification; nonselective COX inhibitors classification; selective COX2 inhibitors celecoxib meloxicam; selective COX3 aniline derivatives | no substantive complete-scope match — new theoretical teaching |
| `salicylate-chemistry-local-systemic-derivatives` · p. 4 | salicylates derived salicylic acid; methyl salicylate local use; aspirin sodium salicylate diflunisal; salicylate derivatives classification | no substantive complete-scope match — new theoretical teaching |
| `aspirin-pharmacokinetics-and-dose-dependent-elimination` · p. 5 | aspirin pharmacokinetics absorption distribution metabolism excretion; salicylate plasma protein binding placenta; aspirin first order zero order kinetics; aspirin dose dependent elimination | no substantive complete-scope match — new theoretical teaching |
| `aspirin-cox-acetylation-txa2-and-local-actions` · p. 5 | aspirin irreversible COX acetylation; low dose aspirin thromboxane platelet aggregation; salicylic acid keratolytic action; methyl salicylate counterirritant | no substantive complete-scope match — new theoretical teaching |
| `aspirin-analgesic-antipyretic-antiinflammatory-actions` · pp. 6–7 | aspirin analgesic action prostaglandin; aspirin antipyretic hypothalamic set point; aspirin anti inflammatory bradykinin; salicylate anti rheumatic action | no substantive complete-scope match — new theoretical teaching |
| `aspirin-dose-dependent-systemic-organ-effects` · pp. 7–9 | aspirin acid base respiratory alkalosis metabolic acidosis; aspirin uric acid low high dose; aspirin gastrointestinal renal blood effects; salicylate endocrine metabolic liver actions | no substantive complete-scope match — new theoretical teaching |
| `aspirin-therapeutic-uses-and-drug-interactions` · pp. 9–11 | aspirin therapeutic uses antiplatelet analgesic; aspirin drug interactions anticoagulants hypoglycemics; aspirin uricosuric probenecid interaction; aspirin alcohol corticosteroid ulcer interaction | no substantive complete-scope match — new theoretical teaching |
| `aspirin-toxicity-adverse-effects-contraindications-and-treatment` · pp. 11–12 | acute salicylate toxicity treatment bicarbonate; aspirin adverse effects contraindications; Reye syndrome aspirin children viral infection; salicylism tinnitus hyperpyrexia hemodialysis | no substantive complete-scope match — new theoretical teaching |
| `acetaminophen-pharmacokinetics-and-cox3-actions` · p. 13 | acetaminophen pharmacokinetics glucuronide sulfate; paracetamol COX3 central action; acetaminophen analgesic antipyretic no anti inflammatory; paracetamol distribution metabolism excretion | no substantive complete-scope match — new theoretical teaching |
| `acetaminophen-napqi-hepatotoxicity-and-nacetylcysteine` · pp. 13–14 | acetaminophen NAPQI glutathione; paracetamol centrilobular necrosis; N acetylcysteine acetaminophen antidote; acetaminophen overdose treatment within 8 hours | no substantive complete-scope match — new theoretical teaching |
| `benorylate-aspirin-paracetamol-ester` · p. 14 | benorylate aspirin paracetamol ester; benorylate analgesic anti inflammatory; benorylate gastric irritation; benorylate pharmacology | no substantive complete-scope match — new theoretical teaching |
| `phenylbutazone-kinetics-actions-adverse-contraindications` · p. 15 | phenylbutazone oxyphenbutazone; phenylbutazone agranulocytosis; phenylbutazone uricosuric gout; phenylbutazone adverse contraindications | no substantive complete-scope match — new theoretical teaching |
| `indomethacin-actions-uses-adverse-contraindications` · p. 16 | indomethacin patent ductus arteriosus; indomethacin COX inhibitor uses; indomethacin psychosis corneal opacity; indomethacin adverse contraindications | no substantive complete-scope match — new theoretical teaching |
| `sulindac-and-nsaid-derivative-class-summary` · p. 17 | sulindac prodrug sulphide COX LOX; sulindac mild renal insufficiency; propionic acid oxicams phenylacetic fenamates; NSAID derivative classes ibuprofen piroxicam diclofenac | no substantive complete-scope match — new theoretical teaching |

All **15 × 4 = 60** required teaching-scope searches completed across live state, pending
state, all source-import roots and accepted prior LCS. At complete-scope grain the result is
**0 live / 0 pending / 15 new theoretical-teaching scopes**; no accepted prior-LCS scope owns
these pharmacology objectives. The later identical path receives no second search set because
the accepted handles and source content are identical. Declarative teaching scopes do not
enter eligible tested-concept or practical-scope counts.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 67 | Family 67 delta | After Family 67 |
|---|---:|---:|---:|
| Eligible observed question records | 532 | +0 | 532 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 256 | +0 | 256 |
| Question live / pending / new | 10 / 86 / 160 | +0 / +0 / +0 | 10 / 86 / 160 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `17 unique-content pages = 1 + 16 + 0`, `16 =
3 + 2 + 4 + 2 + 2 + 3`, `17 later-twin pages × 0 additional content weight = 0`, `0
assessment prompts / 0 printed keys`, `532 = 532 + 0`, `265 = 265 + 0`, `256 = 256 + 0`,
`10 + 86 + 160 = 256`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496 + 0 = 2,496`, `136 + 0 =
136`, and `74 + 0 = 74`.

This source hash occurs twice in the manifest. Removing only the current Lec-1 path from the
accepted Family-66 remainder while retaining the later Lec-3 path leaves **9 rank-4/rank-5
path instances / 8 unique hashes**. The Family-66 method was reproduced first: its 10/8 row
sets recomputed to `57a67bac750010a429c3355ad2b6ab5342e724889c370dbcf2ff57ae3367e0fd`
and `35930a1384727b2668919d9dc8de8bf9d57978e4920c20133454bad9407e8cc9`.
For the exact post-Family-67 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`5915289fed166b3635435d446ec1de543fc7ee01babcf5a948a95470a89cd8ca`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows remains
`35930a1384727b2668919d9dc8de8bf9d57978e4920c20133454bad9407e8cc9`, because the
identical Lec-3 path still carries this hash.

The next rank-4/rank-5 manifest-order gate is tier-4 Pharmacology theoretical source
`src_10ef402eb9eff4e5fb7b`, `Analgesics 2.PDF` (756,839 bytes; 39 native-text pages;
SHA-256 `10ef402eb9eff4e5fb7bec157b463fe5448711a01f4afdd2d09ef8d0d5bda1ac`) under `Year 1/LCS
103/Pharmacology/Theoretical/Lec 2 - Pharmacology of NSAIDs 2 (Pyrazoline & Indole
Derivatives)/`. The byte-identical Lec-3 `Analgesics.pdf` path follows that source in manifest
order and remains explicit path debt, but it must add no second content inventory when its
path is adjudicated. Tier-6 and rank-9 source debts between rank-4/rank-5 gates remain outside
this remainder. Broader LCS-103 S1 remains incomplete. No download, ID, content record,
catalogue update, import or source copy was created.

## Family 68 — Tier-4 Pharmacology theoretical Analgesics 2 teaching-only lecture

### Source identity, provenance and complete boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_10ef402eb9eff4e5fb7b` |
| File / SHA-256 | `Analgesics 2.PDF` / `10ef402eb9eff4e5fb7bec157b463fe5448711a01f4afdd2d09ef8d0d5bda1ac` |
| File boundary | 756,839 bytes · unencrypted PDF · 39 physical native-text pages · 792 × 612 pt |
| Manifest placement | `HU-LCS-103` · Pharmacology · Theoretical · `Lec 2 - Pharmacology of NSAIDs 2 (Pyrazoline & Indole Derivatives)` · tier 4 |
| Local corpus path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 2 - Pharmacology of NSAIDs 2 (Pyrazoline & Indole Derivatives)/Analgesics 2.PDF` |
| Visible provenance | p. 1 prints only `Analgesics`; the PDF exposes no title, author, creator or producer metadata and prints no university, instructor, sitting or assessment label |
| Authority finding | Manifest/path-placed local module theoretical teaching evidence. It is not a recoverable sitting, department question bank, response form, practical station or official answer key. Its source-first objectives substantially recast the same pharmacology scope already accepted from Family 67, but this distinct hash and 39-page composition are preserved as a separate source occurrence. |

The assigned SHA-256, byte size and 39-page boundary were recomputed and match the manifest.
All 39 pages were rendered at 160 dpi and read against the complete native text layer; all 39
complete-page renders have distinct SHA-256 values. Page 1 is the title slide, pp. 2–38 are
continuous declarative pharmacology teaching and p. 39 is the closing `Thank You` slide.

The source contains definitions, classifications, pathway diagrams, numbered facts, adverse-
effect/contraindication tables and treatment bullets only. Imperative safety phrases such as
`Avoid ingestion of large doses` and `Avoid large dose` are declarative treatment advice, not
learner requests. The paired adverse-effect/contraindication tables on pp. 32 and 36 are fully
printed teaching tables, not answer matrices or response forms. No page contains a question
stem, option set, response line, answer, tick, highlight, delayed reveal, specimen,
image-identification task or station instruction. The complete boundary is therefore **37
theoretical teaching compositions / 0 assessment prompt occurrences / 0 printed keys / 0
practical or station prompts / 0 practical teaching plates / 0 practical mappings / 0 masked
or unresolved practical callouts**.

### Complete teaching and assessment inventory

| Physical pages | Source-first composition | Teaching compositions | Assessment / key boundary |
|---:|---|---:|---:|
| 2–7 | analgesic definition; peripheral/central classes; non-opioid advantages; nonselective, COX-2 and COX-3 classifications | 6 | 0 |
| 8–10 | salicylate members, absorption/distribution/metabolism/excretion and arachidonic-acid COX/LOX pathway | 3 | 0 |
| 11–16 | analgesic, antipyretic and anti-inflammatory actions; systemic organ effects; therapeutic uses | 6 | 0 |
| 17–22 | acute/chronic aspirin toxicity, treatment, remaining adverse effects, contraindications and interactions | 6 | 0 |
| 23–29 | acetaminophen kinetics, metabolism, dynamics, toxicity/mechanism/treatment and benorylate | 7 | 0 |
| 30–32 | phenylbutazone kinetics, actions/uses, adverse effects and contraindications | 3 | 0 |
| 33–36 | indomethacin kinetics, mechanism, uses, adverse effects and contraindications | 4 | 0 |
| 37–38 | sulindac kinetics/mechanism/uses and remaining NSAID derivative-class summary | 2 | 0 |
| **Total** | **complete in-scope content boundary** | **37** | **0 prompts / 0 keys** |

The complete physical-page arithmetic is **39 = 1 title page + 37 teaching compositions + 1
closing page + 0 assessment pages**. No complete-page render or teaching composition is
collapsed from the source-occurrence inventory; scope consolidation is recorded separately.

### Source-first theoretical teaching scopes, searches and prior-LCS adjudication

The 37 teaching compositions consolidate to 15 source-level theoretical scopes. Scope collapse
does not delete page, diagram, table or source-wording evidence.

| Teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `analgesic-definition-central-peripheral-classification` · pp. 2–4 | analgesics relieve pain without loss consciousness; central peripheral analgesics classification; opioid non opioid analgesics; adjuvant co analgesics classification | accepted Family-67 handle owns the complete teaching core — prior LCS reuse |
| `nonopioid-analgesic-advantages-and-cox-classification` · pp. 5–7 | non opioid analgesics mild moderate pain; NSAIDs no euphoria tolerance dependence; nonselective COX inhibitor classes; selective COX2 COX3 classification | accepted Family-67 non-opioid/selectivity handle owns the complete teaching core — prior LCS reuse |
| `salicylate-members-absorption-and-derivative-actions` · p. 8 | salicylate derivatives aspirin sodium diflunisal; diflunisal no antipyretic effect; salicylate oral absorption stomach intestine; salicylate members pharmacology | accepted Family-67 salicylate-derivative handle owns the complete teaching core — prior LCS reuse |
| `salicylate-distribution-metabolism-and-excretion` · p. 9 | salicylate distribution BBB placenta protein binding; salicylate glucuronic glycine conjugation; gentisic acid salicylate metabolism; salicylate unchanged urine excretion | accepted Family-67 aspirin-pharmacokinetics handle owns the complete teaching core — prior LCS reuse |
| `nsaid-arachidonic-acid-cox-lox-pathway-map` · p. 10 | NSAID arachidonic acid COX pathway; phospholipase A2 steroid inhibition; COX1 COX2 prostaglandin thromboxane; 5 lipoxygenase leukotriene pathway | accepted Family-67 COX/TXA2 mechanism scope owns the source's pathway core — prior LCS reuse |
| `aspirin-analgesic-antipyretic-antiinflammatory-actions` · pp. 11–12 | aspirin analgesic pain threshold peripheral action; aspirin antipyretic hypothalamic heat loss; aspirin anti inflammatory bradykinin; salicylate lysosome polymorph migration | accepted Family-67 actions handle owns the complete teaching core — prior LCS reuse |
| `aspirin-dose-dependent-systemic-organ-effects` · pp. 13–15 | aspirin respiratory alkalosis metabolic acidosis; aspirin uric acid small large dose; aspirin gastrointestinal blood endocrine effects; salicylate G6PD metabolism BMR | accepted Family-67 systemic-organ-effects handle owns the complete teaching core — prior LCS reuse |
| `aspirin-therapeutic-uses-and-drug-interactions` · pp. 16, 22 | aspirin therapeutic uses antiplatelet analgesic; salicylic acid local keratolytic methyl salicylate; aspirin hypoglycemic drug displacement; aspirin alcohol corticosteroid piroxicam diclofenac interaction | accepted Family-67 uses/interactions handle owns the complete teaching core — prior LCS reuse |
| `aspirin-toxicity-adverse-effects-contraindications-and-treatment` · pp. 17–21 | acute salicylate toxicity treatment bicarbonate; chronic salicylism tinnitus; Reye syndrome aspirin children viral infection; aspirin adverse effects contraindications | accepted Family-67 toxicity/adverse/contraindication handle owns the complete teaching core — prior LCS reuse |
| `acetaminophen-pharmacokinetics-and-cox3-actions` · pp. 23–25 | acetaminophen absorption gastric emptying; paracetamol glucuronide sulfate metabolism; paracetamol COX3 central action; acetaminophen no peripheral anti inflammatory action | accepted Family-67 acetaminophen-kinetics/actions handle owns the complete teaching core — prior LCS reuse |
| `acetaminophen-napqi-hepatotoxicity-and-nacetylcysteine` · pp. 24, 26–28 | acetaminophen toxic metabolite glutathione; paracetamol centrilobular hepatic necrosis; N acetylcysteine acetaminophen antidote; acetaminophen overdose charcoal hemodialysis | accepted Family-67 NAPQI/hepatotoxicity handle owns the complete teaching core — prior LCS reuse |
| `benorylate-aspirin-paracetamol-ester` · p. 29 | benorylate aspirin paracetamol ester; benorylate analgesic antipyretic; benorylate anti inflammatory synergy; benorylate less gastric irritation | accepted Family-67 benorylate handle owns the complete teaching core — prior LCS reuse |
| `phenylbutazone-kinetics-actions-adverse-contraindications` · pp. 30–32 | phenylbutazone oxyphenbutazone hydroxyphenylbutazone; phenylbutazone COX acute gout; phenylbutazone agranulocytosis; phenylbutazone adverse contraindications | accepted Family-67 phenylbutazone handle owns the complete teaching core — prior LCS reuse |
| `indomethacin-kinetics-actions-uses-adverse-contraindications` · pp. 33–36 | indomethacin enterohepatic circulation; indomethacin potent COX inhibitor; indomethacin closes PDA neonates; indomethacin psychosis corneal opacity leukopenia | accepted Family-67 indomethacin handle owns the complete teaching core — prior LCS reuse |
| `sulindac-and-nsaid-derivative-class-summary` · pp. 37–38 | sulindac prodrug sulphide COX LOX; sulindac arthritis gout cataract; propionic acid oxicam phenylacetic derivatives; fenamates mefenamic flufenamic acid | accepted Family-67 sulindac/class-summary handle owns the complete teaching core — prior LCS reuse |

All **15 × 4 = 60** required teaching-scope searches completed across live state, pending
state, all source-import roots and accepted prior LCS. At complete-scope grain the direct
external result is **0 live / 0 pending / 15 new**. Exact accepted-prior comparison prevents
all 15 repeated module additions, leaving **15 prior-LCS reuses / 0 new theoretical-teaching
scopes**. The distinct source hash and page compositions remain fully inventoried even though
Family 67 owns the source-level teaching objectives. Declarative teaching scopes do not enter
eligible tested-concept or practical-scope counts.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 68 | Family 68 delta | After Family 68 |
|---|---:|---:|---:|
| Eligible observed question records | 532 | +0 | 532 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 256 | +0 | 256 |
| Question live / pending / new | 10 / 86 / 160 | +0 / +0 / +0 | 10 / 86 / 160 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `39 = 1 + 37 + 1 + 0`, `37 = 6 + 3 + 6 + 6
+ 7 + 3 + 4 + 2`, `0 assessment prompts / 0 printed keys`, `532 = 532 + 0`, `265 = 265
+ 0`, `256 = 256 + 0`, `10 + 86 + 160 = 256`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496
+ 0 = 2,496`, `136 + 0 = 136`, and `74 + 0 = 74`.

This source hash occurs once in the manifest. Removing its path from the accepted Family-67
remainder leaves **8 rank-4/rank-5 path instances / 7 unique hashes**. The Family-67 method
was reproduced first: its 9/8 row sets recomputed to
`5915289fed166b3635435d446ec1de543fc7ee01babcf5a948a95470a89cd8ca` and
`35930a1384727b2668919d9dc8de8bf9d57978e4920c20133454bad9407e8cc9`.
For the exact post-Family-68 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`90b4f4fe9e6eb7ac2a16733f13de61fe32a73fc066f4fd00a4474eb256d92164`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`9486593605e838b425ad24dd86a58d0013e8e7554ece349d6996e513075a5cf5`.

The exact next manifest-order path debt is the already-inventoried Family-67 source
`src_d08bcb59d5e3d0154b28`, `Analgesics.pdf` (231,330 bytes; 17 native-text pages;
SHA-256 `d08bcb59d5e3d0154b28bf10cd3442f5698cab8e8354206d41cab4bc5763d22b`) under `Year 1/LCS
103/Pharmacology/Theoretical/Lec 3 - Pharmacology of Acetaminophen/`. It is byte-identical
to the accepted Lec-1 path and must add **0** second content inventory when its remaining path
is adjudicated. The next new unique-hash gate after that duplicate path is tier-4 Pharmacology
theoretical source `src_791096e550811606d4db`, `26 LECTURE ON CORTICOSTEROIDES PDF.pdf`
(SHA-256 `791096e550811606d4dbcf8e19959834216a2a76aacbf85bc321112c5e419cac`)
under `Lec 4 - Corticosteroids 1/`; the same hash then recurs in `Lec 5 - Corticosteroids 2/`.
Tier-6 and rank-9 source debts between rank-4/rank-5 gates remain outside this remainder.
Broader LCS-103 S1 remains incomplete. No download, ID, content record, catalogue update,
import or source copy was created.

## Family 69 — Tier-4 Pharmacology Analgesics duplicate-path adjudication

### Exact path identity and zero-weight content boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_d08bcb59d5e3d0154b28` |
| File / SHA-256 | `Analgesics.pdf` / `d08bcb59d5e3d0154b28bf10cd3442f5698cab8e8354206d41cab4bc5763d22b` |
| File boundary | 231,330 bytes · unencrypted PDF · 17 physical native-text pages · 595.32 × 841.92 pt |
| Adjudicated manifest path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 3 - Pharmacology of Acetaminophen/Analgesics.pdf` · tier 4 · `twinPreferred: false` |
| Accepted twin path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 1 - Pharmacology of NSAIDs 1 (Aspirin)/Analgesics.pdf` · Family 67 · `twinPreferred: true` |
| Duplicate authority | Both local files recompute to the same assigned SHA-256 and byte size, report the same 17-page boundary and compare byte-for-byte identical. The manifest gives both rows the same source ID and reciprocal `duplicateOf` paths. |

This is a path-debt adjudication, not a second content source. Family 67 already rendered and
read every byte-identical page, recorded **1 title page + 16 theoretical teaching compositions
+ 0 assessment pages**, and completed the 15 accepted handles and their 60 searches. Repeating
the rendering, teaching inventory, searches or prior-LCS comparison for this non-preferred path
would manufacture duplicate evidence. The Family-69 content weight is therefore **0 additional
pages / 0 teaching compositions / 0 assessment or written prompt occurrences / 0 printed keys /
0 practical or station prompts / 0 practical teaching plates / 0 practical mappings / 0 masked
or unresolved practical callouts / 0 searches / 0 scopes**.

### Cumulative assessment and practical checkpoint

| Evidence dimension | Before Family 69 | Family 69 delta | After Family 69 |
|---|---:|---:|---:|
| Eligible observed question records | 532 | +0 | 532 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 256 | +0 | 256 |
| Question live / pending / new | 10 / 86 / 160 | +0 / +0 / +0 | 10 / 86 / 160 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `17 duplicate pages × 0 additional content weight
= 0`, `0 assessment prompts / 0 printed keys`, `532 = 532 + 0`, `265 = 265 + 0`, `256 =
256 + 0`, `10 + 86 + 160 = 256`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496 + 0 = 2,496`,
`136 + 0 = 136`, and `74 + 0 = 74`.

Removing this remaining path also removes the last remainder occurrence of its already-counted
hash. The accepted Family-68 8/7 row sets recompute to
`90b4f4fe9e6eb7ac2a16733f13de61fe32a73fc066f4fd00a4474eb256d92164` and
`9486593605e838b425ad24dd86a58d0013e8e7554ece349d6996e513075a5cf5`.
The exact post-Family-69 remainder is **7 rank-4/rank-5 path instances / 6 unique hashes**.
SHA-256 over the bytewise path-sorted `corpusRelativePath<TAB>sha256<LF>` rows is
`fc83a1e439fb3b947d873d5033d551754cb308e6449d9d4ddcad90bd0680ddb7`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`d49df975eea85e8148a2d5c1815ae42656c14428b5f50fef79f02d40839a7d06`.

The exact next new unique-hash gate is tier-4 Pharmacology theoretical source
`src_791096e550811606d4db`, `26 LECTURE ON CORTICOSTEROIDES PDF.pdf` (1,061,618 bytes;
27 native-text pages; SHA-256
`791096e550811606d4dbcf8e19959834216a2a76aacbf85bc321112c5e419cac`) under `Year 1/LCS
103/Pharmacology/Theoretical/Lec 4 - Corticosteroids 1/`. The same hash immediately recurs
under `Lec 5 - Corticosteroids 2/`, so unique content must again be inventoried once while
path debt remains path-sensitive. Tier-6 and rank-9 source debts between rank-4/rank-5 gates
remain outside this remainder. Broader LCS-103 S1 remains incomplete. No download, ID,
content record, catalogue update, import or source copy was created.

## Family 70 — Tier-4 Pharmacology theoretical Corticosteroids teaching-only duplicate-hash family

### Source identity, duplicate-path authority and complete boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_791096e550811606d4db` |
| File / SHA-256 | `26 LECTURE ON CORTICOSTEROIDES PDF.pdf` / `791096e550811606d4dbcf8e19959834216a2a76aacbf85bc321112c5e419cac` |
| File boundary | 1,061,618 bytes · unencrypted PDF · 27 physical native-text pages · 960 × 540 pt |
| Current manifest path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 4 - Corticosteroids 1/26 LECTURE ON CORTICOSTEROIDES PDF.pdf` · tier 4 · `twinPreferred: true` |
| Identical later manifest path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 5 - Corticosteroids 2/26 LECTURE ON CORTICOSTEROIDES PDF.pdf` · same source ID, SHA-256, byte size and 27-page boundary · `twinPreferred: false` |
| Manifest duplicate metadata | the two rows carry reciprocal `duplicateOf` paths; the current row's normalized `subfolder` nevertheless says `Lec 5 - Corticosteroids 2`, so row path and normalized subfolder are preserved without reconciliation |
| Visible provenance | p. 1 prints `CORTICOSTEROIDS`, `BY PROFESSOR DR MOHAMED ABDELGHANY` and `CLINICAL PHARMACOLOGY`; metadata title is `Corticosteroids`, author is `mohamed abdelaziz`, and creator/producer is Microsoft PowerPoint LTSC |
| Authority finding | Manifest/path-placed local module theoretical teaching evidence. It is not a recoverable sitting, department question bank, response form, practical station or official answer key. The two manifest paths are byte-identical copies of one content object, so content is inventoried once while path debt remains path-sensitive. |

Both local path instances were recomputed at 1,061,618 bytes and the exact assigned SHA-256;
both report the same unencrypted 27-page boundary and compare byte-for-byte identical. The
preferred Lec-4 path was rendered at 160 dpi and read against the complete native text layer;
all 27 complete-page renders have distinct SHA-256 values. Since the Lec-5 path is bitwise
identical, rendering or counting it again would manufacture duplicate content evidence. Page
1 is the title/provenance slide and pp. 2–27 are continuous declarative pharmacology teaching.

The source contains definitions, classifications, explanatory diagrams, filled tables,
summaries, clinical pearls and fully completed mnemonics only. The `High-Yield Concept`,
`One-Line Master Summary`, `STAIR CASE`, `CUSHINGOID` and `Sugar High, Protein Die, Fat Fly`
phrasing signals teaching emphasis, not learner-response requests. The composite mechanism
graphic on p. 14 and corticosteroid poster on p. 24 are labelled theoretical teaching images,
not practical plates or identification stations. Every mnemonic cell is printed; none is a
blank or masked callout. There is no question stem, option set, response line, answer, tick,
highlight, delayed reveal, specimen, image-identification task or station instruction. The
complete unique-content boundary is therefore **26 theoretical teaching compositions / 0
assessment prompt occurrences / 0 printed keys / 0 practical or station prompts / 0 practical
teaching plates / 0 practical mappings / 0 masked or unresolved practical callouts**.

### Complete teaching and assessment inventory

| Physical pages | Source-first composition | Teaching compositions | Assessment / key boundary |
|---:|---|---:|---:|
| 2–6 | definition/physiological roles; functional, duration and route classifications; chemistry/structure | 5 | 0 |
| 7–13 | absorption, distribution/binding, hepatic metabolism/interactions, prodrug conversion/elimination/disease factors, dosing pearls, `LAMER` and master summary | 7 | 0 |
| 14–17 | genomic/non-genomic mechanism; anti-inflammatory, immunosuppressive, metabolic, hematologic, bone and endocrine actions | 4 | 0 |
| 18–19 | replacement, anti-inflammatory, immunosuppressive, neurologic, oncology and shock uses | 2 | 0 |
| 20–23 | multisystem adverse effects; withdrawal/adrenal crisis; contraindications, precautions and summary | 4 | 0 |
| 24–27 | composite poster and fully filled use, adverse-effect and metabolic mnemonics | 4 | 0 |
| **Unique content total** | **one hash across two manifest paths** | **26** | **0 prompts / 0 keys** |

The unique-content page arithmetic is **27 = 1 title page + 26 teaching compositions + 0
assessment pages**. The later 27-page twin is retained as a manifest path occurrence but adds
**0 pages, 0 teaching compositions and 0 assessment evidence** to this family.

### Source-first theoretical teaching scopes, searches and prior-LCS adjudication

The 26 teaching compositions consolidate to 17 source-level theoretical scopes. Scope collapse
does not delete page, diagram, poster, table, mnemonic or source-wording evidence.

| Teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `corticosteroid-definition-physiological-roles-and-adrenal-zones` · p. 2 | corticosteroid steroid hormones adrenal cortex cholesterol; glucocorticoid mineralocorticoid physiological roles; cortisol zona fasciculata aldosterone zona glomerulosa; corticosteroid sodium water potassium blood pressure | no substantive complete external or accepted prior-LCS scope — new theoretical teaching |
| `corticosteroid-functional-classification-and-examples` · p. 3 | glucocorticoid examples hydrocortisone prednisolone dexamethasone; mineralocorticoid aldosterone fludrocortisone; corticosteroid physiological function classification; prednisone prednisolone methylprednisolone triamcinolone | no substantive complete-scope match — new theoretical teaching |
| `corticosteroid-duration-classification` · p. 4 | corticosteroid duration short intermediate long acting; hydrocortisone 8 12 hours prednisone 12 36; dexamethasone betamethasone 36 72 hours; corticosteroid duration of action classification | no substantive complete-scope match — new theoretical teaching |
| `corticosteroid-route-classification` · p. 5 | corticosteroid routes oral IV inhaled topical intra articular; prednisone hydrocortisone budesonide clobetasol triamcinolone fluticasone; corticosteroid route administration examples; inhaled intranasal corticosteroids administration | no substantive complete-scope match — new theoretical teaching |
| `corticosteroid-chemistry-structure-and-activity-modification` · p. 6 | corticosteroid steroid nucleus cyclopentanoperhydrophenanthrene; corticosteroid structural modification potency duration; corticosteroid lipid soluble cholesterol derived; glucocorticoid chemistry structure mineralocorticoid activity | no substantive complete-scope match — new theoretical teaching |
| `corticosteroid-route-dependent-absorption` · p. 7 | corticosteroid absorption oral intravenous topical inhaled; prednisone prednisolone dexamethasone oral bioavailability; hydrocortisone succinate methylprednisolone emergency shock cerebral edema; inflamed skin increases topical corticosteroid absorption | no substantive complete-scope match — new theoretical teaching |
| `corticosteroid-distribution-and-protein-binding` · p. 8 | corticosteroid distribution CBG transcortin albumin; cortisol protein binding free drug active; corticosteroid crosses placenta CNS lipid soluble; corticosteroid widely distributed liver muscle adipose | no substantive complete-scope match — new theoretical teaching |
| `corticosteroid-hepatic-cyp3a4-metabolism-and-interactions` · p. 9 | corticosteroid CYP3A4 metabolism rifampicin phenytoin carbamazepine; ketoconazole macrolide grapefruit steroid toxicity; glucocorticoid hepatic reduction hydroxylation conjugation; CYP3A4 inducer inhibitor corticosteroid interaction | no substantive complete-scope match — new theoretical teaching |
| `prednisone-conversion-elimination-and-disease-pharmacokinetics` · p. 10 | prednisone conversion prednisolone severe liver disease; corticosteroid renal excretion glucuronide sulfate conjugates; liver disease prolongs steroid action renal metabolite accumulation; corticosteroid prodrug conversion elimination | no substantive complete-scope match — new theoretical teaching |
| `corticosteroid-dosing-pearls-and-pharmacokinetic-summary` · pp. 11–13 | corticosteroid morning dosing HPA suppression; corticosteroid alternate day therapy adrenal suppression; LAMER corticosteroid pharmacokinetic mnemonic; corticosteroid clinical pharmacokinetic pearls | no substantive complete-scope match; p. 12 mnemonic and p. 13 summary collapse into this scope — new theoretical teaching |
| `corticosteroid-genomic-nongenomic-mechanism-and-gene-regulation` · pp. 14–15 | glucocorticoid receptor GRE gene transcription; corticosteroid genomic non genomic mechanism; annexin A1 phospholipase A2 corticosteroid; corticosteroid inhibits IL1 IL2 IL6 TNF IFN gamma | no substantive complete-scope match; p. 14 composite graphic and p. 15 prose collapse at scope grain — new theoretical teaching |
| `corticosteroid-antiinflammatory-and-immunosuppressive-actions` · p. 16 | corticosteroid anti inflammatory prostaglandin leukotriene lysosome; corticosteroid immunosuppressive T lymphocyte macrophage; corticosteroid decreases capillary permeability edema pain; glucocorticoid cytokine antigen presentation transplantation autoimmune | no substantive complete-scope match — new theoretical teaching |
| `glucocorticoid-metabolic-hematologic-and-endocrine-actions` · p. 17 | glucocorticoid gluconeogenesis protein catabolism fat redistribution; corticosteroid neutrophilia eosinopenia lymphopenia; corticosteroid suppresses CRH ACTH adrenal cortex; glucocorticoid metabolic hematologic endocrine effects | no substantive complete-scope match — new theoretical teaching |
| `glucocorticoid-bone-loss-osteoporosis-and-osteonecrosis` · pp. 17, 20 | glucocorticoid induced osteoporosis reduced calcium absorption; corticosteroid osteonecrosis avascular necrosis bone loss; steroid osteoporosis muscle wasting fractures; glucocorticoid bone adverse effects | exact accepted Family-16/53 glucocorticoid bone-loss evidence owns the core — prior LCS reuse |
| `corticosteroid-therapeutic-use-spectrum` · pp. 18–19, 25 | corticosteroid replacement Addison congenital adrenal hyperplasia; corticosteroid asthma COPD rheumatoid SLE IBD; corticosteroid transplantation cerebral edema multiple sclerosis; corticosteroid leukemia lymphoma shock anaphylaxis | no complete external or accepted prior-LCS spectrum scope; p. 25 mnemonic repeats these uses — new theoretical teaching |
| `systemic-corticosteroid-multisystem-adverse-effects` · pp. 20–21, 26–27 | corticosteroid cushingoid hyperglycemia diabetes adrenal suppression; corticosteroid ulcer hypertension edema psychosis; corticosteroid cataract glaucoma infection tuberculosis reactivation; systemic corticosteroid adverse effects | no complete external or accepted prior-LCS multisystem scope; filled mnemonics on pp. 26–27 repeat subsets — new theoretical teaching |
| `corticosteroid-withdrawal-contraindications-and-safety-precautions` · pp. 22–24 | corticosteroid abrupt withdrawal adrenal crisis taper; corticosteroid contraindications diabetes ulcer hypertension osteoporosis fungal; corticosteroid lowest effective dose calcium vitamin D latent TB; long term steroid monitoring gradual withdrawal | no substantive complete-scope match; p. 24 poster repeats the same safety/action/use material — new theoretical teaching |

All **17 × 4 = 68** required teaching-scope searches completed across live state, pending
state, all source-import roots and accepted prior LCS. At complete-scope grain the direct
external result is **0 live / 0 pending / 17 new**. Exact accepted-prior comparison prevents
one repeated bone-effects addition, leaving **1 prior-LCS reuse / 16 new theoretical-teaching
scopes**. The later identical path receives no second search set because the accepted handles
and source content are identical. Declarative teaching scopes do not enter eligible
tested-concept or practical-scope counts.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 70 | Family 70 delta | After Family 70 |
|---|---:|---:|---:|
| Eligible observed question records | 532 | +0 | 532 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 256 | +0 | 256 |
| Question live / pending / new | 10 / 86 / 160 | +0 / +0 / +0 | 10 / 86 / 160 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `27 unique-content pages = 1 + 26 + 0`, `26 =
5 + 7 + 4 + 2 + 4 + 4`, `27 later-twin pages × 0 additional content weight = 0`, `0
assessment prompts / 0 printed keys`, `532 = 532 + 0`, `265 = 265 + 0`, `256 = 256 + 0`,
`10 + 86 + 160 = 256`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496 + 0 = 2,496`, `136 + 0 =
136`, and `74 + 0 = 74`.

This source hash occurs twice in the manifest. Removing only the current Lec-4 path from the
accepted Family-69 remainder while retaining the later Lec-5 path leaves **6 rank-4/rank-5
path instances / 6 unique hashes**. The Family-69 method was reproduced first: its 7/6 row
sets recomputed to `fc83a1e439fb3b947d873d5033d551754cb308e6449d9d4ddcad90bd0680ddb7`
and `d49df975eea85e8148a2d5c1815ae42656c14428b5f50fef79f02d40839a7d06`.
For the exact post-Family-70 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`1c622111a52df918c9215faf762b53da6b86e9d6f4f6c56c7ae1dae5694101e2`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows remains
`d49df975eea85e8148a2d5c1815ae42656c14428b5f50fef79f02d40839a7d06`, because the
identical Lec-5 path still carries this hash.

The exact next manifest-order path debt is the already-inventoried Family-70 source
`src_791096e550811606d4db`, `26 LECTURE ON CORTICOSTEROIDES PDF.pdf` (1,061,618 bytes;
27 native-text pages; SHA-256
`791096e550811606d4dbcf8e19959834216a2a76aacbf85bc321112c5e419cac`) under `Year 1/LCS
103/Pharmacology/Theoretical/Lec 5 - Corticosteroids 2/`. It is byte-identical to the accepted
Lec-4 path and must add **0** second content inventory when its remaining path is adjudicated.
The next new unique-hash gate after that duplicate path is tier-4 Pharmacology theoretical
source `src_d4997a0848a0aa52ae1a`, `26 Calcium Metabolism.pdf` (408,873 bytes; 24 native-text
pages; SHA-256 `d4997a0848a0aa52ae1a39d26515360f5e2de0bf630169aa0778a364396bd26a`)
under `Lec 6 - Drugs Affecting Calcium/`. Tier-6 and rank-9 source debts between rank-4/rank-5
gates remain outside this remainder. Broader LCS-103 S1 remains incomplete. No download, ID,
content record, catalogue update, import or source copy was created.

## Family 71 — Tier-4 Pharmacology Corticosteroids duplicate-path adjudication

### Exact path identity and zero-weight content boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_791096e550811606d4db` |
| File / SHA-256 | `26 LECTURE ON CORTICOSTEROIDES PDF.pdf` / `791096e550811606d4dbcf8e19959834216a2a76aacbf85bc321112c5e419cac` |
| File boundary | 1,061,618 bytes · unencrypted PDF · 27 physical native-text pages · 960 × 540 pt |
| Adjudicated manifest path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 5 - Corticosteroids 2/26 LECTURE ON CORTICOSTEROIDES PDF.pdf` · tier 4 · `twinPreferred: false` |
| Accepted twin path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 4 - Corticosteroids 1/26 LECTURE ON CORTICOSTEROIDES PDF.pdf` · Family 70 · `twinPreferred: true` |
| Duplicate authority | Both local files recompute to the same assigned SHA-256 and byte size, report the same 27-page boundary and compare byte-for-byte identical. The manifest gives both rows the same source ID and reciprocal `duplicateOf` paths. |

This is a path-debt adjudication, not a second content source. Family 70 already rendered and
read every byte-identical page, recorded **1 title page + 26 theoretical teaching compositions
+ 0 assessment pages**, and completed the 17 accepted handles and their 68 searches. Repeating
the rendering, teaching inventory, searches or prior-LCS comparison for this non-preferred path
would manufacture duplicate evidence. The Family-71 content weight is therefore **0 additional
pages / 0 teaching compositions / 0 assessment or written prompt occurrences / 0 printed keys /
0 practical or station prompts / 0 practical teaching plates / 0 practical mappings / 0 masked
or unresolved practical callouts / 0 searches / 0 scopes**.

### Cumulative assessment and practical checkpoint

| Evidence dimension | Before Family 71 | Family 71 delta | After Family 71 |
|---|---:|---:|---:|
| Eligible observed question records | 532 | +0 | 532 |
| Eligible printed question keys | 265 | +0 | 265 |
| Eligible distinct tested concepts | 256 | +0 | 256 |
| Question live / pending / new | 10 / 86 / 160 | +0 / +0 / +0 | 10 / 86 / 160 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `27 duplicate pages × 0 additional content weight
= 0`, `0 assessment prompts / 0 printed keys`, `532 = 532 + 0`, `265 = 265 + 0`, `256 =
256 + 0`, `10 + 86 + 160 = 256`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496 + 0 = 2,496`,
`136 + 0 = 136`, and `74 + 0 = 74`.

Removing this remaining path also removes the last remainder occurrence of its already-counted
hash. The accepted Family-70 6/6 row sets recompute to
`1c622111a52df918c9215faf762b53da6b86e9d6f4f6c56c7ae1dae5694101e2` and
`d49df975eea85e8148a2d5c1815ae42656c14428b5f50fef79f02d40839a7d06`.
The exact post-Family-71 remainder is **5 rank-4/rank-5 path instances / 5 unique hashes**.
SHA-256 over the bytewise path-sorted `corpusRelativePath<TAB>sha256<LF>` rows is
`9034c18e737ea147547342d9da33c0a1250d951eb5bb979663101e0fd333b362`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`df66823080e441afc56a07f61c2a1dcc57c3e351a5da245caacffc635d0676b0`.

The exact next new unique-hash gate is tier-4 Pharmacology theoretical source
`src_d4997a0848a0aa52ae1a`, `26 Calcium Metabolism.pdf` (408,873 bytes; 24 native-text
pages; SHA-256 `d4997a0848a0aa52ae1a39d26515360f5e2de0bf630169aa0778a364396bd26a`)
under `Year 1/LCS 103/Pharmacology/Theoretical/Lec 6 - Drugs Affecting Calcium/`. Tier-6 and
rank-9 source debts between rank-4/rank-5 gates remain outside this remainder. Broader LCS-103
S1 remains incomplete. No download, ID, content record, catalogue update, import or source
copy was created.

## Family 72 — Tier-4 Pharmacology Calcium Metabolism lecture with four keyed MEQs

### Source identity, provenance and complete boundary

| Field | Verified value |
|---|---|
| Manifest source | `src_d4997a0848a0aa52ae1a` |
| File / SHA-256 | `26 Calcium Metabolism.pdf` / `d4997a0848a0aa52ae1a39d26515360f5e2de0bf630169aa0778a364396bd26a` |
| File boundary | 408,873 bytes · unencrypted PDF · 24 physical native-text pages · 960 × 540 pt |
| Manifest placement | `HU-LCS-103` · Pharmacology · Theoretical · `Lec 6 - Drugs Affecting Calcium` · instructor field `Ugs` · tier 4 |
| Local corpus path | `Year 1/LCS 103/Pharmacology/Theoretical/Lec 6 - Drugs Affecting Calcium/26 Calcium Metabolism.pdf` |
| Visible provenance | p. 1 prints only `CALCIUM METABOLISM`; metadata title is `Calcium Metabolism`, author is `mohamed abdelaziz`, and creator/producer is Microsoft PowerPoint LTSC; p. 2 says `postgraduate students`, which is preserved as a source statement without overriding the manifest's Year-1 module placement |
| Authority finding | Manifest/path-placed local module theoretical lecture and revision-question evidence. It is not a recoverable sitting, department question bank, response form, practical station or official answer key, but pp. 21–24 explicitly print learner-facing MEQs and simultaneous `Model Answers`. |

The assigned SHA-256, byte size and 24-page boundary were recomputed and match the manifest.
All 24 pages were rendered at 160 dpi and read against the complete native text layer; all 24
complete-page renders have distinct SHA-256 values. Page 1 is the title slide, pp. 2–20 are
declarative calcium-metabolism teaching, and pp. 21–24 are four MEQ compositions containing
15 independently answerable lettered subprompts and 15 simultaneous printed answer units.

Page 14 has three locally empty formula fields after `UVB converts:`, `Liver Hydroxylation:`
and `Kidney 1-alpha hydroxylase converts:`. They are teaching-layout omissions rather than
imperative response blanks, and the exact pathway is explicitly supplied later in p. 21's
model answer. They therefore contribute **3 source-resolved teaching callouts / 0 unresolved
source-wide callouts**, not assessment prompts or practical residue. Page 20's memory-aid
table is fully filled. No page contains a practical specimen, identification station, masked
practical label, unkeyed option set or response form.

The complete source boundary is therefore **19 theoretical teaching compositions / 15
ordinary written prompt occurrences / 15 printed assessment keys / 0 practical or station
prompts / 0 practical teaching plates / 0 practical mappings / 0 unresolved callouts**.

### Complete teaching, assessment and key inventory

| Physical pages | Source-first composition | Teaching compositions | Assessment / key boundary |
|---:|---|---:|---:|
| 2–7 | objectives, calcium introduction/distribution/functions, integrated homeostasis and bone-cell table | 6 | 0 |
| 8–11 | intestinal absorption/mechanisms/factors and renal handling/hormonal-diuretic regulation | 4 | 0 |
| 12–13 | PTH synthesis, stimulus, organ actions and net-effect table | 2 | 0 |
| 14–18 | vitamin-D activation/regulation, deficiency disorders, calcitriol, calcitonin and FGF-23 | 5 | 0; p. 14's 3 local blanks are resolved on p. 21 |
| 19–20 | take-home summary and fully filled hormone/organ memory aid | 2 | 0 |
| 21 | `MEQ 2 — Vitamin D Metabolism`: synthesis/activation, calcitriol actions and deficiency causes | 0 | 3 prompt occurrences / 3 printed model-answer units |
| 22 | `MEQ 3 — Hypercalcemia`: definition, causes, manifestations and treatment | 0 | 4 prompt occurrences / 4 printed model-answer units |
| 23 | `MEQ 4 — Hypocalcemia`: causes, tetany, ECG changes and treatment | 0 | 4 prompt occurrences / 4 printed model-answer units |
| 24 | `MEQ 5 — Osteoporosis`: definition, pathogenesis, risk factors and pharmacotherapy | 0 | 4 prompt occurrences / 4 printed model-answer units |
| **Total** | **complete source boundary** | **19** | **15 prompts / 15 keys** |

The physical-page arithmetic is **24 = 1 title page + 19 teaching pages + 4 simultaneous
assessment/key pages**. The prompt/key arithmetic is **15 = 3 + 4 + 4 + 4**, and every
lettered request has a same-letter model-answer unit. No medical inference is needed to create
the key boundary.

### Assessment handles, searches and prior-LCS adjudication

The 15 prompt occurrences consolidate to 14 tested handles because p. 24's definition and
pathogenesis subprompts jointly test the already accepted osteoporosis density/resorption-
formation handle. All other lettered requests are independently scoped.

| Source prompt → handle | Four required `find-existing` queries | Same-scope result | Disposition |
|---|---|---|---|
| p. 21A → `vitamin-d-skin-liver-kidney-activation-sequence` | describe synthesis activation vitamin D; vitamin D activation skin liver kidney sequence; 7 dehydrocholesterol cholecalciferol calcidiol calcitriol; vitamin D synthesis hydroxylation MEQ | pending vitamin-D material owns the complete activation sequence; Family 53 owns it as teaching but not as an eligible tested handle | pending; new to eligible LCS; 1 printed key |
| p. 21B → `calcitriol-multiorgan-actions` | explain actions of calcitriol; calcitriol intestinal calcium bone mineralization PTH suppression; active vitamin D organ actions; calcitriol kidney bone intestine parathyroid | pending vitamin-D material owns the multiorgan action pattern; Family 53 is teaching corroboration only | pending; new to eligible LCS; 1 printed key |
| p. 21C → `vitamin-d-deficiency-cause-spectrum` | causes vitamin D deficiency malnutrition malabsorption CKD liver; vitamin D deficiency causes list; malabsorption chronic kidney liver disease vitamin D; etiology vitamin D deficiency | deficiency/disorder fragments do not own the source's complete cause list, and no prior eligible tested handle does | new; 1 printed key |
| p. 22A → `hypercalcemia-definition-above-10-point-5-mg-dl` | define hypercalcemia serum calcium greater 10.5; hypercalcemia threshold 10.5 mg dL; high serum calcium definition; hypercalcaemia laboratory definition | no substantive complete external or accepted prior-LCS tested handle | new; 1 printed key |
| p. 22B → `hypercalcemia-cause-spectrum` | hypercalcemia causes hyperparathyroidism malignancy vitamin D thiazide; etiology of hypercalcemia; granulomatous disease hypercalcemia causes; enumerate hypercalcemia causes | prior malignancy/calcium fragments do not own the complete five-cause spectrum | new; 1 printed key |
| p. 22C → `hypercalcemia-clinical-manifestation-spectrum` | hypercalcemia manifestations stones bones constipation neuropsychiatric; clinical manifestations hypercalcemia; renal stones bone pain hypercalcemia; hypercalcemia symptoms neuropsychiatric gastrointestinal | no substantive complete external or accepted prior-LCS tested handle | new; 1 printed key |
| p. 22D → `severe-hypercalcemia-sequential-saline-bisphosphonate-management` | hypercalcemia treatment hydration calcitonin bisphosphonates dialysis; severe hypercalcemia management; saline bisphosphonate calcitonin hypercalcemia; treat hypercalcemia dialysis | exact accepted Family-18 treatment handle owns the hydration/bisphosphonate core; the source adds calcitonin and severe-case dialysis wording without creating a new tested concept | prior eligible-LCS reuse; inherited new; 1 printed key; concept delta +0 |
| p. 23A → `hypocalcemia-cause-spectrum` | hypocalcemia causes hypoparathyroidism vitamin D CKD hypomagnesemia; etiology of hypocalcemia; enumerate hypocalcemia causes; low calcium causes parathyroid kidney magnesium | no substantive complete external or accepted prior-LCS tested handle | new; 1 printed key |
| p. 23B → `hypocalcemic-tetany-from-neuromuscular-hyperexcitability` | hypocalcemia tetany neuromuscular excitability; explain tetany low calcium; calcium decreases neuronal threshold tetany; hypocalcemic tetany mechanism | pending calcium-excitability material owns the mechanism; Family 53 is teaching corroboration only | pending; new to eligible LCS; 1 printed key |
| p. 23C → `hypocalcemia-qt-interval-prolongation` | hypocalcemia ECG QT prolongation; low calcium electrocardiogram change; prolonged QT hypocalcaemia; ECG changes hypocalcemia | no substantive complete external or accepted prior-LCS tested handle | new; 1 printed key |
| p. 23D → `hypocalcemia-calcium-and-vitamin-d-treatment` | hypocalcemia treatment IV calcium gluconate oral vitamin D; acute hypocalcemia management; treat symptomatic hypocalcemia; calcium gluconate vitamin D hypocalcemia | no substantive complete external or accepted prior-LCS tested handle | new; 1 printed key |
| p. 24A–B → `osteoporosis-density-and-resorption-formation-pathogenesis` | osteoporosis low bone mass microarchitectural deterioration; define osteoporosis; osteoporosis resorption formation imbalance; osteoporosis definition pathogenesis | pending osteoporosis material and exact accepted Family-17/18 density/fragility handle own the definition and imbalance core | pending; prior eligible-LCS reuse; 2 printed keys; concept delta +0 |
| p. 24C → `osteoporosis-risk-factor-spectrum` | osteoporosis risk factors aging menopause steroids smoking; enumerate osteoporosis risks; postmenopausal steroid smoking bone loss risk; osteoporosis risk factor spectrum | accepted age-, menopause- and glucocorticoid-specific handles are component evidence only; no one tested handle owns this four-factor request | new; 1 printed key |
| p. 24D → `osteoporosis-bisphosphonate-denosumab-teriparatide-pharmacotherapy` | osteoporosis pharmacotherapy bisphosphonate denosumab teriparatide; treatment osteoporosis calcium vitamin D; osteoporosis drug therapy; antiresorptive anabolic osteoporosis management | calcitonin and calcium-management fragments do not own this antiresorptive/anabolic treatment set | new; 1 printed key |

All **14 × 4 = 56** required assessment searches completed across live state, pending state,
`docs/import-ready`, `docs/questions-import-ready`, every source-import root and accepted prior
LCS. Direct complete-scope disposition is **0 live / 4 pending / 10 new**. Exact accepted-
prior adjudication removes the inherited hypercalcemia-treatment and osteoporosis-definition/
pathogenesis handles, leaving module concept delta **0 live / 3 pending / 9 new = 12**.
Search matches establish coverage only; all 15 keys come directly from the source's printed
`Model Answers` sections.

### Source-first theoretical teaching scopes, searches and prior-LCS adjudication

The 19 teaching compositions consolidate to ten source-level theoretical scopes. The p. 19
summary and p. 20 memory aid collapse into their already listed source scopes; no page,
reference value, table, callout or source wording is deleted.

| Teaching handle / pages | Four required `find-existing` queries | Search / prior-LCS result |
|---|---|---|
| `calcium-body-distribution-serum-range-and-physiological-functions` · pp. 2–5, 19 | calcium body distribution serum fractions physiological functions; total body calcium 99 percent bone teeth; normal serum calcium 8.5 10.5 mg dL; calcium neuromuscular cardiac coagulation signaling | pending calcium material and accepted Family-53 serum-calcium/functions scope own the core — prior LCS reuse |
| `calcium-homeostasis-regulators-and-bone-cell-roles` · pp. 6–7, 19–20 | calcium homeostasis bone kidney intestine hormones; osteoblast osteoclast osteocyte functions; PTH vitamin D calcitonin FGF23 regulators; bone cells formation resorption mechanosensing | accepted Families 13 and 53 jointly own the bone-cell/regulator core — prior LCS reuse |
| `intestinal-calcium-absorption-mechanisms-and-factors` · pp. 8–9 | intestinal calcium absorption TRPV6 calbindin; calcium ATPase sodium calcium exchanger intestine; vitamin D active transcellular calcium absorption; phytate oxalate glucocorticoid calcium absorption | pending calcium/vitamin-D material and accepted Family-53 absorption/function teaching own the core — prior LCS reuse |
| `renal-calcium-handling-hormones-and-diuretics` · pp. 10–11 | renal calcium reabsorption proximal thick ascending distal; PTH distal calcium phosphate reabsorption 1 alpha hydroxylase; loop diuretics increase calcium excretion thiazide reduce; renal handling calcium nephron percentages | no complete external or accepted prior-LCS scope owns both nephron percentages and the loop/thiazide contrast — new theoretical teaching |
| `pth-synthesis-stimulus-organ-actions-and-net-effects` · pp. 12–13 | PTH chief cells CaSR low ionized calcium; PTH RANKL osteoclast bone kidney intestine; PTH serum calcium phosphate urinary phosphate calcitriol; parathyroid hormone net effects calcium phosphate | accepted Family-53 PTH/calcium-regulation teaching owns the core — prior LCS reuse |
| `vitamin-d-skin-liver-kidney-activation-and-regulation` · p. 14 | vitamin D skin liver kidney activation regulation; UVB 7 dehydrocholesterol cholecalciferol; liver 25 hydroxylation kidney 1 alpha hydroxylase; FGF23 inhibits calcitriol activation | pending vitamin-D material and exact accepted Family-53 activation scope own the core; p. 21 resolves the three local teaching omissions — prior LCS reuse |
| `vitamin-d-deficiency-rickets-and-osteomalacia` · p. 15 | vitamin D deficiency rickets osteomalacia features; rickets bow legs rachitic rosary delayed dentition; osteomalacia bone pain fragility fractures; defective mineralization children adults vitamin D | exact accepted Family-53 deficiency scope and earlier rickets/osteomalacia evidence own the core — prior LCS reuse |
| `calcitriol-multiorgan-calcium-phosphate-actions` · p. 16 | calcitriol actions intestine bone kidney parathyroid; calcitriol calcium phosphate absorption mineralization; excess calcitriol bone resorption suppresses PTH; active vitamin D physiological actions | pending vitamin-D material and accepted Family-53 homeostasis/functions scope own the core — prior LCS reuse |
| `calcitonin-source-stimulus-and-actions` · p. 17 | calcitonin C cells hypercalcemia osteoclast inhibition; calcitonin renal calcium excretion; calcitonin physiological importance humans limited; thyroid parafollicular calcitonin bone resorption | accepted Families 13 and 53 calcitonin evidence own the core — prior LCS reuse |
| `fgf23-source-phosphate-calcitriol-regulation` · p. 18 | FGF23 osteocyte osteoblast phosphate homeostasis; FGF23 reduces phosphate reabsorption; FGF23 suppresses 1 alpha hydroxylase calcitriol; fibroblast growth factor 23 functions | exact accepted Family-53 FGF-23 teaching scope owns the core — prior LCS reuse |

All **10 × 4 = 40** required teaching-scope searches completed across live state, pending
state, all source-import roots and accepted prior LCS. At complete-scope grain the direct
external result is **0 live / 8 pending / 2 new**. Exact accepted-prior comparison prevents
nine repeated module additions, leaving **9 prior-LCS reuses / 1 new theoretical-teaching
scope**. Together with the assessment handles, Family 72 completed **96 required searches**.
Declarative teaching scopes do not enter eligible tested-concept or practical-scope counts.

### Separated assessment and practical checkpoint

| Evidence dimension | Before Family 72 | Family 72 delta | After Family 72 |
|---|---:|---:|---:|
| Eligible observed question records | 532 | +15 | 547 |
| Eligible printed question keys | 265 | +15 | 280 |
| Eligible distinct tested concepts | 256 | +12 | 268 |
| Question live / pending / new | 10 / 86 / 160 | +0 / +3 / +9 | 10 / 89 / 169 |
| Stand-alone practical/station prompt occurrences | 6 | +0 | 6 |
| Distinct practical teaching plates, quantified | 398 verified minimum | +0 | 398 verified minimum |
| Directly printed practical teaching-label mappings, quantified | 2,496 verified minimum | +0 | 2,496 verified minimum |
| Masked/unresolved practical callouts or rule blanks | 136 | +0 | 136 |
| Printed practical assessment keys | 0 | +0 | 0 |
| Practical teaching-scope live / pending / new | 0 / 0 / 74 | +0 / +0 / +0 | 0 / 0 / 74 |
| Practical content records created | 0 | +0 | 0 |

Family 29's deliberately unquantified mixed teaching residue remains outside the verified
plate/mapping minimum. Arithmetic checks are `24 = 1 + 19 + 4`, `19 = 6 + 4 + 2 + 5 +
2`, `15 prompts = 3 + 4 + 4 + 4`, `15 printed keys = 3 + 4 + 4 + 4`, `14 tested
handles = 15 prompts - 1 within-source concept collapse`, `12 added concepts = 14 handles -
2 prior eligible reuses`, `0 + 3 + 9 = 12`, `547 = 532 + 15`, `280 = 265 + 15`, `268
= 256 + 12`, `10 + 89 + 169 = 268`, `6 + 0 = 6`, `398 + 0 = 398`, `2,496 + 0 =
2,496`, `136 + 0 = 136`, and `74 + 0 = 74`.

This source hash occurs once in the manifest. Removing it from the accepted Family-71
remainder leaves **4 rank-4/rank-5 path instances / 4 unique hashes**. The Family-71 method
was reproduced first: its 5/5 row sets recomputed to
`9034c18e737ea147547342d9da33c0a1250d951eb5bb979663101e0fd333b362` and
`df66823080e441afc56a07f61c2a1dcc57c3e351a5da245caacffc635d0676b0`.
For the exact post-Family-72 manifest remainder, SHA-256 over the bytewise path-sorted
`corpusRelativePath<TAB>sha256<LF>` rows is
`b084ddbff5b885b2708375ae2de9b116c242c25a1dd31e859ce1c940928e40fc`; SHA-256 over the
bytewise sorted unique `sha256<LF>` rows is
`0db266826526e7def7158f3908bdfcb806156634d2d49a4631546752838d7046`.

The exact next rank-4/rank-5 manifest-order gate is tier-5 Physiology practical source
`src_e15c508e9a9bdef2e3b9`, manifest `103-LCS-SMT- virtual lab -26 .pdf` (960,704 bytes;
20 native-text pages; SHA-256
`e15c508e9a9bdef2e3b9d6f00b84693e0418784167cfbb491f5ae2e0f58781b1`) under `Year 1/LCS
103/Physiology/Practical Labs/Virtual Lab 1 - Simple Muscle Twitch (SMT)/`. The exact
manifest-named path has a space before `.pdf`; the local normalized filename omits that space
and recomputes to the assigned hash and byte size. Tier-6 and rank-9 source debts between
rank-4/rank-5 gates remain outside this remainder. Broader LCS-103 S1 remains incomplete. No
download, ID, content record, catalogue update, import or source copy was created.
