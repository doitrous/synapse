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

## Exact next debt

- The next actual-assessment source is `src_5423328a4798dba3c3be`, `Exams for Locomotor
  Quiz.pdf`: 11 pages containing five printed exams of 15 MCQs each (**75 raw MCQs**).
  Each item has a printed answer letter in the answer-side layout (**75 apparent printed
  keys**), but source-first duplicate collapse, rendered-key verification and semantic
  search are not included in Family 1.
- The remaining actual-assessment family also includes `src_414df0f15610aa4232f0`
  (`physio previous exams.pdf`, four pages) plus five anatomy and three pathology quiz
  images. They outrank department banks and must be triaged before lower-authority banks.
- Pathology `TUTORIAL 103` is explicitly LCS-103 evidence even though it resides in the
  BMS-102 department-bank PDF `src_88169dc9b6ad00181a0d`. Printed pp. 256–262 (physical
  pp. 16–22) contain **33 raw prompts**: 19 MCQs and 14 written/completion/table prompts,
  with no visually printed answer marks. It remains excluded from BMS-102 and queued here
  after the remaining actual assessments.
- No S2 work is authorised until ranks 1–6 are consolidated and `/root` issues the literal
  `TRIAGE APPROVED` for Helwan Year 1.
