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

## Exact next debt

- The next untriaged local Anatomy quiz-content image is `src_2da654a75a9d236de8a7`,
  `Most important notes anatomy (Quiz content)2.jpg`. The other three Anatomy images follow:
  `src_9b509a75a7e648219f37`, `src_5bb02d6293fb60233949`, and
  `src_086eb3c89677239baa74`. Their visual prompt/note classification, key status, repeat
  collapse and semantic search remain wholly outside this checkpoint.
- The three local Pathology quiz-content images in the actual-assessment lane,
  `src_4ee3e3e63fa0804576fb`, `src_e8309c2953d770051cf0`, and
  `src_758188828699ae3569f4` remain after the Anatomy images. Their content counts and key
  status have not yet been claimed.
- Pathology `TUTORIAL 103` is explicitly LCS-103 evidence even though it resides in the
  BMS-102 department-bank PDF `src_88169dc9b6ad00181a0d`. Printed pp. 256–262 (physical
  pp. 16–22) contain **33 raw prompts**: 19 MCQs and 14 written/completion/table prompts,
  with no visually printed answer marks. It remains excluded from BMS-102 and queued here
  after the remaining actual assessments.
- No S2 work is authorised until ranks 1–6 are consolidated and `/root` issues the literal
  `TRIAGE APPROVED` for Helwan Year 1.
