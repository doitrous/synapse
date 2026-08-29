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

## Exact next debt

- Both explicitly external rank-4 Histology banks are now fully inventoried and remain
  excluded from eligible Helwan assessment totals.
- Rank 5 is next. The first named local source in the wave plan is
  `src_103bc8809c3045ada51d`, `MCQs - College MCQs Physiology 103 tutorial with answers.pdf`
  (23 pages, solved, native-text, tier 3). It requires source-first prompt/key inventory,
  authority review and dedupe before the second named rank-5 source
  `src_5328082a807132f5cb29`.
- No S2 work is authorised until ranks 1–6 are consolidated and `/root` issues the literal
  `TRIAGE APPROVED` for Helwan Year 1.
