import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_9cd5c3597f6a69f61135'
const A1 = 'ART-HU-BMS102-MIC-F38P1-AUTOCLAVE-PRINCIPLES-EQUIPMENT'
const A2 = 'ART-HU-BMS102-MIC-F38P1-DRY-HEAT-INCINERATION'
const A3 = 'ART-HU-BMS102-MIC-F38P1-LOW-TEMPERATURE-GAS-STERILIZATION'
const A4 = 'ART-HU-BMS102-MIC-F38P1-DISINFECTANTS-ANTISEPTICS'
const allArticles = [A1, A3, A4]
const idFor = (key) => `CON-INF-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  { ref:'Q01', id:'CON-INF-33EA3B11A3033E', key:'autoclave-moist-heat-protein-denaturation-not-oxidation', article:A1, label:'Autoclaving uses moist heat and kills microorganisms by protein denaturation rather than oxidative destruction', aliases:['Autoclave protein denaturation','Moist heat versus dry heat killing'], type:'comparison', micro:'Autoclave principles', nano:'Moist-heat mechanism', definition:'An autoclave exposes a load to saturated steam under pressure. Moist heat kills primarily by denaturing and coagulating microbial proteins, whereas destructive oxidation is the mechanism emphasized for dry heat in the governed source.', objective:'Reject oxidative destruction as the autoclave mechanism and identify protein denaturation by moist heat.', pitfalls:'Assigning the dry-heat oxidation mechanism to steam sterilization, or assuming that pressure itself is the lethal mechanism.', display:'Autoclaving kills by moist-heat protein denaturation rather than oxidative destruction.', subjectClaim:'Autoclaving', predicate:'kills microorganisms by', object:'moist-heat protein denaturation rather than oxidative destruction', limitation:'The mechanism distinction is directly taught in the tier-6 source; no official examination-key authority is inferred.', teachPage:'3, 5', teaching:'Dry heat kills by destructive oxidation of essential cell constituents. Moist heat depends on killing bacteria by protein denaturation.' },
  { ref:'Q02', id:'CON-INF-29285F6B74DE0C', key:'autoclave-most-efficient-source-comparison', article:A1, label:'The Helwan source describes the autoclave as the most efficient sterilization method in its taught comparison', aliases:['Source-ranked autoclave efficiency','Autoclave efficiency comparison'], type:'source_assertion', micro:'Autoclave principles', nano:'Source-ranked efficiency', definition:'Within this Helwan lecture comparison, steam under pressure is described as the most efficient sterilization method because it reaches high temperature, penetrates effectively, releases latent heat on condensation, and is rapid, inexpensive and non-toxic.', objective:'Preserve the source-printed True answer for its autoclave-efficiency comparison without universalizing the ranking.', pitfalls:'Treating the source superlative as a universal device-selection rule, or ignoring load compatibility, validation and the required sterility assurance process.', display:'The Helwan source ranks autoclaving as the most efficient method in its sterilization comparison.', subjectClaim:'The Helwan sterilization comparison', predicate:'describes autoclaving as', object:'the most efficient method within its stated teaching context', limitation:'“Most efficient” is preserved as a source-bounded comparison, not a universal operational ranking across every load, device and validated process.', teachPage:'5–6', teaching:'The source calls autoclaving the most efficient method and attributes this to high temperature, steam penetration, latent heat, speed, low toxicity and low cost.' },
  { ref:'Q03', id:'CON-INF-D2792C58DF5E7A', key:'autoclave-unsuitable-heat-sensitive-syringes-gloves-catheters', article:A1, label:'The source classifies syringes, sterile gloves and catheters as heat-sensitive items unsuitable for autoclaving', aliases:['Heat-sensitive device autoclave limitation','Source-listed autoclave-unsuitable items'], type:'source_assertion', micro:'Autoclave principles', nano:'Heat-sensitive load suitability', definition:'The governed answer block treats the listed syringes, sterile gloves and catheters as heat-sensitive plastic or rubber items and therefore marks the categorical autoclave statement False. The same source directs heat-sensitive devices toward ethylene-oxide processing.', objective:'Preserve the source classification while recognizing that actual steam compatibility depends on the specific material and manufacturer instructions.', pitfalls:'Using a device-category label alone to override its validated reprocessing instructions, or treating every syringe, glove or catheter material as identical.', display:'The source treats the listed syringes, sterile gloves and catheters as heat-sensitive and unsuitable for autoclaving.', subjectClaim:'The Family-38 device-suitability statement', predicate:'is printed', object:'False because the listed items are treated as heat-sensitive plastic or rubber', limitation:'The categorical device wording is source-bounded; real reprocessing must follow material compatibility, manufacturer instructions and a validated cycle.', teachPage:'9–10', teaching:'Ethylene oxide is used for heat-sensitive devices such as plastic and rubber articles; the answer block applies that classification to the named items.' },
  { ref:'Q04', id:'CON-INF-76031C40E37026', key:'plasma-gas-low-temperature-sterilization', article:A3, label:'Plasma-gas sterilization is a low-temperature method', aliases:['Low-temperature gas plasma sterilization','Hydrogen-peroxide plasma temperature'], type:'classification', micro:'Low-temperature sterilization', nano:'Plasma temperature classification', definition:'Hydrogen-peroxide gas plasma is generated at low temperature and produces reactive species lethal to microorganisms. It is therefore not classified as a high-temperature sterilization method in the governed source.', objective:'Classify plasma-gas sterilization as low temperature and reject the high-temperature statement.', pitfalls:'Confusing plasma energy generation with high load temperature, or importing the ethylene-oxide exposure cycle into plasma sterilization.', display:'Plasma-gas sterilization is a low-temperature method.', subjectClaim:'Plasma-gas sterilization', predicate:'is', object:'a low-temperature sterilization method', limitation:'The source classification is foundational; device compatibility and cycle selection still require validated manufacturer instructions.', teachPage:'10', teaching:'Radiofrequency energy generates low-temperature plasma and free radicals lethal to microorganisms; the source notes that this is not a high-temperature method.' },
  { ref:'Q05', id:'CON-INF-A706492F7D3A46', key:'phenolics-chlorine-not-skin-antiseptics', article:A4, label:'The source classifies phenolics and chlorine-releasing compounds as disinfectants rather than skin antiseptics', aliases:['Phenolic and chlorine skin-use classification','Disinfectant versus antiseptic source comparison'], type:'comparison', micro:'Disinfectants and antiseptics', nano:'Skin-use classification', definition:'The governed lecture lists phenolic compounds and chlorine-releasing compounds for disinfection of inanimate surfaces or environmental materials and explicitly states that they cannot be used as skin antiseptics in its foundational classification.', objective:'Reject the source statement that phenolics and chlorine-releasing compounds can be used as skin antiseptics.', pitfalls:'Ignoring formulation, concentration and approved-use differences, or applying a broad teaching category as universal clinical product guidance.', display:'The source classifies phenolics and chlorine-releasing compounds as disinfectants, not skin antiseptics.', subjectClaim:'Phenolic and chlorine-releasing compounds', predicate:'are classified in the source as', object:'disinfectants rather than skin antiseptics', limitation:'This is the source’s broad teaching classification; actual formulation-specific indications and approved uses must not be inferred from it.', teachPage:'14', teaching:'Phenolic compounds and chlorine-releasing compounds are listed as disinfectants, with the explicit statement that they cannot be used as skin antiseptics.' },
  { ref:'Q11', id:'CON-INF-80D1CA11BB139C', key:'hot-air-oven-160c-2h-or-170c-1h', article:A2, label:'The source hot-air-oven cycle is 160°C for two hours or 170°C for one hour', aliases:['Hot-air-oven time and temperature','Dry-heat oven source cycle'], type:'procedure', micro:'Dry-heat sterilization', nano:'Hot-air-oven cycle', definition:'The governed lecture specifies dry-heat sterilization in a hot-air oven at 160°C for two hours or 170°C for one hour. These are the exact source alternatives selected over the malformed distractor ranges.', objective:'Select the source-specified hot-air-oven temperature and duration pair.', pitfalls:'Silently repairing distractor typography, substituting a moist-heat cycle, or treating one teaching cycle as universal for every load and device.', display:'The source specifies a hot-air oven at 160°C for two hours or 170°C for one hour.', subjectClaim:'The source hot-air-oven cycle', predicate:'is', object:'160°C for two hours or 170°C for one hour', limitation:'The exact source cycle is educational; validated processing depends on equipment, load and protocol.', teachPage:'3', teaching:'Hot air oven: temperature of 160°C for 2 hours or 170°C for 1 hour.' },
  { ref:'Q12', id:'CON-INF-7CC9BF8DD5C820', key:'incinerator-contaminated-biological-materials', article:A2, label:'Incineration is used to destroy contaminated biological materials', aliases:['Incineration of biological waste','Contaminated-material destruction'], type:'procedure', micro:'Dry-heat sterilization', nano:'Incineration use', definition:'Incineration destroys contaminated biological material through high-temperature combustion. In the governed option set, an incinerator is the appropriate equipment for bulk contaminated biological material rather than a Bunsen flame or micro-incinerator used for small laboratory tools.', objective:'Choose an incinerator for destruction of contaminated biological materials.', pitfalls:'Selecting flame sterilization for bulk waste or confusing a micro-incinerator for loops with an incinerator for biological material.', display:'An incinerator is used to destroy contaminated biological materials.', subjectClaim:'An incinerator', predicate:'is used for', object:'destruction of contaminated biological materials', limitation:'The item is a foundational equipment-use distinction, not a complete biomedical-waste policy.', teachPage:'3', teaching:'Incineration is listed for biological materials and bodies of dead animals; red heat includes Bunsen flame and micro-incinerator for bacteriological loops.' },
  { ref:'Q13', id:'CON-INF-8F95FE00E45558', key:'autoclave-pressure-raises-boiling-point-above-100c', article:A1, label:'Heating water in a closed vessel under pressure raises its boiling point above 100°C', aliases:['Autoclave pressure-boiling principle','Steam-under-pressure temperature principle'], type:'mechanism', micro:'Autoclave principles', nano:'Pressure and boiling point', definition:'In a closed autoclave vessel, increasing pressure raises the boiling point of water above 100°C and permits saturated steam at higher temperature. Pressure enables the temperature increase; microbial killing is mediated by the moist heat.', objective:'Identify the pressure-dependent rise in water’s boiling point as the source autoclave principle.', pitfalls:'Saying prolonged heating at normal pressure raises the boiling point, or treating pressure alone as the lethal agent.', display:'Heating water in a closed vessel under pressure raises its boiling point above 100°C.', subjectClaim:'Heating water in a closed vessel under pressure', predicate:'raises', object:'the boiling point above 100°C', limitation:'The source principle does not replace cycle validation or imply that pressure alone sterilizes a load.', teachPage:'6', teaching:'When water is heated in a closed vessel under pressure, the boiling point of water rises above 100°C.' },
  { ref:'Q14', id:'CON-INF-F57D5BB4B5C74D', key:'simple-autoclave-lid-valve-manometer-construction', article:A1, label:'A simple autoclave is a metal cylinder with a tight lid, steam-discharge tap, safety valve and manometer', aliases:['Simple-autoclave construction','Basic autoclave components'], type:'structure_function_relationship', micro:'Autoclave equipment', nano:'Simple-autoclave construction', definition:'The simple autoclave described in the source is a metal cylinder with a tightly fitting lid connected to a steam-discharge tap, safety valve and manometer. Water is placed below a perforated tray that supports the load.', objective:'Identify the source-listed construction of a simple autoclave.', pitfalls:'Choosing external steam supply, vacuum-assisted air removal or better air displacement, which describe other autoclave designs.', display:'A simple autoclave has a tight lid connected to a steam-discharge tap, safety valve and manometer.', subjectClaim:'A simple autoclave', predicate:'has', object:'a tight lid connected to a steam-discharge tap, safety valve and manometer', limitation:'The source description is a teaching schematic rather than an engineering specification.', teachPage:'7', teaching:'Simple autoclave: metal cylinder with tightly fitting lid connected to steam discharge tap, safety valve and manometer.' },
  { ref:'Q15', id:'CON-INF-50B54C0E700FD5', key:'steam-jacketed-gravity-displacement-automatic-control', article:A1, label:'The source distinguishes the steam-jacketed gravity-displacement autoclave by automatic control', aliases:['Steam-jacketed autoclave automatic control','Gravity-displacement autoclave distinction'], type:'comparison', micro:'Autoclave equipment', nano:'Steam-jacketed distinction', definition:'Compared with the simple autoclave, the source’s steam-jacketed gravity-displacement design uses an externally supplied steam jacket, improves air replacement and drying, and includes automatic control. The printed answer selects automatic control from the offered choices.', objective:'Identify automatic control as the source-listed distinction of the steam-jacketed gravity-displacement autoclave.', pitfalls:'Assigning vacuum evacuation to gravity displacement, selecting a vague better cycle statement, or treating biological indicators as unnecessary.', display:'The source distinguishes the steam-jacketed gravity-displacement autoclave by automatic control.', subjectClaim:'The steam-jacketed gravity-displacement autoclave', predicate:'is distinguished in the option set by', object:'automatic control', limitation:'The answer is limited to the printed comparison and does not claim automatic control is its only design difference.', teachPage:'8', teaching:'Differences from simple autoclave include external steam, better air replacement and drying, automatic control and safety devices.' },
  { ref:'Q16', id:'CON-INF-1D8EA7DA7403D9', key:'ethylene-oxide-lethal-alkylating-sporicidal-agent', article:A3, label:'Ethylene oxide is a highly lethal alkylating sterilant active against microbes including spores', aliases:['Ethylene-oxide alkylating action','EO gas sporicidal sterilant'], type:'mechanism', micro:'Low-temperature sterilization', nano:'Ethylene-oxide action', definition:'Ethylene oxide is a gaseous alkylating agent that damages essential microbial macromolecules and can kill microorganisms including spores. The source also identifies substantial toxicity, explosiveness and carcinogenic concern and requires aeration after exposure.', objective:'Identify the lethal alkylating, sporicidal property as the true ethylene-oxide statement.', pitfalls:'Calling ethylene oxide non-toxic, applying a 100°C exposure, or selecting it specifically for heat-resistant glass and metal.', display:'Ethylene oxide is a lethal alkylating sterilant that kills microbes including spores.', subjectClaim:'Ethylene oxide', predicate:'is', object:'a lethal alkylating sterilant active against microbes including spores', limitation:'This foundational property is not a complete occupational-safety or validated-cycle protocol.', teachPage:'10', teaching:'Ethylene oxide is a highly lethal alkylating agent that kills all microbes including spores; it is toxic, highly explosive and carcinogenic to laboratory animals.' },
  { ref:'Q17', id:'CON-INF-7A1422BDA6F879', key:'plasma-gas-long-narrow-lumen-instruments-source-use', article:A3, label:'The source lists long narrow-lumen surgical instruments among uses of plasma-gas sterilization', aliases:['Plasma sterilization of lumen instruments','Source-listed plasma device use'], type:'source_assertion', micro:'Low-temperature sterilization', nano:'Plasma instrument use', definition:'The governed source lists laparoscopes and arthroscopes as examples of long narrow-lumen surgical instruments processed by its plasma-gas method. Among the printed options, that use is selected over ethylene-oxide mixtures, toxicity with prolonged aeration, and the ethylene-oxide time-temperature cycle.', objective:'Preserve the printed best answer while limiting the device-use claim to validated compatible systems.', pitfalls:'Assuming every long or narrow lumen is compatible with every hydrogen-peroxide plasma system, or importing the ethylene-oxide cycle into plasma processing.', display:'The source lists long narrow-lumen surgical instruments as a plasma-gas sterilization use.', subjectClaim:'The Family-38 plasma-gas teaching', predicate:'lists', object:'long narrow-lumen surgical instruments among source uses', limitation:'Actual lumen length, diameter, materials and device compatibility are system-specific and must follow manufacturer instructions and a validated cycle.', teachPage:'10', teaching:'The source lists surgical instruments with long narrow lumens, including laparoscopes and arthroscopes, and states that plasma is non-toxic with no prolonged aeration.' },
].filter((c) => !['Q11', 'Q12', 'Q13'].includes(c.ref))

for (const c of concepts) {
  if (idFor(c.key) !== c.id) throw new Error(`Deterministic concept ID mismatch for ${c.ref}`)
}

const questions = [
  { ref:'Q01', page:'17', tf:true, key:'B', stem:'Principle of autoclave depends on oxidative destruction of microorganisms', reason:'autoclaving uses moist heat, which kills through protein denaturation; oxidative destruction is the source mechanism for dry heat' },
  { ref:'Q02', page:'17', tf:true, key:'A', stem:'Autoclave is the most efficient method for sterilization.', reason:'the source explicitly ranks the autoclave as most efficient within its own sterilization comparison and lists high temperature, steam penetration and latent heat among the reasons' },
  { ref:'Q03', page:'17', tf:true, key:'B', stem:'Syringes, sterile gloves and catheters can be sterilized in autoclave.', reason:'the source answer block treats the named items as heat-sensitive plastic or rubber and directs such devices to ethylene oxide' },
  { ref:'Q04', page:'17', tf:true, key:'B', stem:'Plasma gas sterilizer is a high temperature sterilization method.', reason:'the source explicitly generates low-temperature plasma and notes that this is not a high-temperature method' },
  { ref:'Q05', page:'18', tf:true, key:'B', stem:'Phenolic compounds, Chlorine & chlorine releasing compounds can be used as\nskin antiseptics.', reason:'the source classifies these agents as disinfectants for inanimate or environmental uses and states that they cannot be used as skin antiseptics' },
  { ref:'Q11', page:'19', key:'C', stem:'Temperature used in hot air oven is:', options:['100 120°C for 2 hours','180°C for 1 hour or 190°C for 30 minutes','160°C for 2 hours or 170°C for 1 hour'], reason:'the teaching page prints 160°C for two hours or 170°C for one hour as its hot-air-oven cycle' },
  { ref:'Q12', page:'19', key:'B', stem:'For destruction of contaminated biological materials we use:', options:['Bunsen flame','Incinerator','Micro Incinerator'], reason:'the source assigns incineration to biological materials, whereas Bunsen flame and micro-incinerator are red-heat methods used for small laboratory tools such as loops' },
  { ref:'Q13', page:'19', key:'B', stem:'Principle of autoclave:', options:['When water is heated in a closed vessel for long time with normal pressure,\nthe boiling point rises above 100°C.','When water is heated in a closed vessel under pressure, the boiling point\nrises above 100°C.','When water is heated in a closed vessel under pressure, the boiling point\nremains 100°C.'], reason:'the source states that heating water in a closed vessel under pressure raises its boiling point above 100°C' },
  { ref:'Q14', page:'20', key:'A', stem:'Simple autoclave:', options:['Metal cylinder with tightly fitting lid. The lid is connected to steam discharge\ntap, safety valve and manometer.','Metal cylinder with tightly fitting lid, in which steam is introduced from an\nexternal source.','Metal cylinder with tightly fitting lid that allows better displacement of air.','Metal cylinder with tightly fitting lid, fitted to a vacuum pump insuring air\nremoval.'], reason:'the source defines the simple autoclave by a tight lid connected to the steam-discharge tap, safety valve and manometer' },
  { ref:'Q15', page:'20', key:'C', stem:'Steam jacketed gravity displacement autoclave is better than simple\nautoclave in:', options:['Double walled chamber where air is evacuated through a vacuum.','Allows better temperature and time cycle.','The process is automatically controlled.','Biological indicators not always needed.'], reason:'automatic control is the precise source-listed distinction represented by the printed option set' },
  { ref:'Q16', page:'20', key:'D', stem:'Regarding Ethylene oxide (EO) gas sterilizer, the following is true:', options:['Items are exposed for 3 6 hr at 100°C then aerated for 8 12 hr.','Used for heat resistant devices like glass and metal.','It is not toxic, not explosive but carcinogenic.','Highly lethal alkylating agent that kills all microbes including spores.'], reason:'the source identifies ethylene oxide as a highly lethal alkylating agent active against microorganisms including spores' },
  { ref:'Q17', page:'21', key:'B', stem:'Regarding Plasma gas sterilizer, the following is true:', options:['Uses hydrogen peroxide or a mixture with peracetic acid and ethylene oxide.','Used for sterilization of surgical instruments with long narrow lumen (e.g.,\nlaparoscopes, arthroscopes).','Highly toxic and needs prolonged aeration before release.','Items exposed for 3 6 hr at 55°C then aerated for 8 12 hr.'], reason:'the source lists long narrow-lumen surgical instruments as the plasma-gas use among these options' },
].filter((q) => !['Q11', 'Q12', 'Q13'].includes(q.ref))

const byRef = Object.fromEntries(questions.map((q) => [q.ref, q]))
const byConcept = Object.fromEntries(concepts.map((c) => [c.id, c]))
for (const c of concepts) byRef[c.ref].concept = c.id
for (const q of questions) {
  q.id = `Q-HU102-MIC-F38-${q.ref}`
  q.claim = `CLM-HU102-F38-${q.ref}-01`
  q.answerCit = `CIT-HU102-F38-${q.ref}-ANSWER`
  q.teachCit = `CIT-HU102-F38-${q.ref}-TEACH`
  q.span = `SPN-HU102-F38-${q.ref}-01`
  q.display = byConcept[q.concept].display
}

const row = (fields) => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const joinRows = (rows) => rows.join('\n---\n\n')

const sourceRow = row([['id',source],['title','Helwan S2 Micro Sterilization — in-lecture study bank'],['institution','Faculty of Medicine, Helwan University local corpus'],['collection_id','hu-y1'],['source_relative_path','Year 1/BMS 102/Microbiology/Notes and Summaries/Helwan S2 Micro Sterilization.pdf'],['media_type','application/pdf'],['languages','en'],['page_count','22'],['sha256','9cd5c3597f6a69f611359a007889669dca09aa2f5cbbea28bea7f8bb97d9e723'],['processing_status','pending'],['rights','Local university material held for internal authoring only; no page image is redistributed.'],['qualification','Tier-6 TOP Microbiology Notes teaching and in-lecture study bank. Pages 17–22 print prompts and immediate study answers, but the file is not an official examination, recoverable sitting, or authenticated official key and supplies no marks. Family 38 releases only objective Q01–Q05 and Q14–Q17. Q11–Q13 remain three-option importer-schema holds; Q06–Q10 and Q18–Q20 remain unmarked-written holds.'],['is_assessment','yes']])

const articleSpecs = [
  { id:A1, title:'Autoclave mechanisms, principles and equipment distinctions', micro:'Autoclave principles and equipment', refs:['Q01','Q02','Q03','Q14','Q15'], sections:`### Definition
Autoclaving is moist-heat sterilization with saturated steam under pressure. Pressure raises water’s boiling point above 100°C, while steam condensation transfers heat to the load.

### Mechanism
Moist heat kills mainly by protein denaturation, in contrast with destructive oxidation by dry heat. The source attributes autoclave efficiency to high temperature, steam penetration and latent heat.

### Equipment distinctions
A simple autoclave has a tight lid, steam-discharge tap, safety valve and manometer. The source distinguishes the steam-jacketed gravity-displacement model by external steam, better air replacement and drying, automatic control and safety devices.

### Load compatibility
The source treats the named syringes, gloves and catheters as heat-sensitive plastic or rubber. Device-category wording must not replace manufacturer instructions, material compatibility or a validated cycle.

### Key determinants
Pressure raises the boiling point; steam supplies moist heat; condensation releases latent heat; equipment design governs air removal and control; and load material determines cycle compatibility.

### Clinical significance
Correctly matching mechanism, device design and load compatibility prevents failed sterilization and heat damage to equipment.

### Exam approach
Separate mechanism, physical principle, construction and load suitability. Do not assign dry-heat oxidation to moist heat or vacuum evacuation to gravity displacement.` },
  { id:A2, title:'Dry-heat cycles and incineration uses', micro:'Dry-heat sterilization', refs:['Q11','Q12'], sections:`### Definition
Dry heat kills through destructive oxidation of essential cell constituents. It is less penetrating than moist heat and therefore uses higher temperatures and longer exposure.

### Mechanism
Oxidative injury accumulates during sustained dry-heat exposure. The required cycle therefore differs from protein-denaturing moist heat under pressure.

### Hot-air oven
The source cycle is 160°C for two hours or 170°C for one hour. It lists glassware, oils, powders and metal instruments as applications.

### Incineration
Incineration is used for contaminated biological material and animal remains. Bunsen flame and micro-incinerators are red-heat tools for small items such as bacteriological loops.

### Key determinants
Temperature, exposure duration, material compatibility and the scale of the item separate oven sterilization, red heat and incineration.

### Clinical significance
Choosing the appropriate dry-heat method supports reliable processing while avoiding the use of small-tool flame methods for bulk contaminated waste.

### Exam approach
Match the equipment to the scale and material: hot-air oven for compatible dry loads, incinerator for biological waste, and red heat for loops.` },
  { id:A3, title:'Ethylene-oxide and plasma-gas low-temperature sterilization', micro:'Low-temperature gas sterilization', refs:['Q04','Q16','Q17'], sections:`### Definition
Low-temperature gaseous methods are used for heat-sensitive compatible devices. Ethylene oxide alkylates microbial macromolecules; hydrogen-peroxide plasma generates reactive species at low temperature.

### Mechanism
Ethylene oxide kills by alkylating essential microbial molecules. Plasma processing uses vaporized hydrogen peroxide and radiofrequency energy to generate reactive species lethal to microorganisms.

### Ethylene oxide
The source calls ethylene oxide lethal to microorganisms including spores and also toxic, explosive and carcinogenic, with post-cycle aeration required.

### Plasma gas
The source describes a non-toxic low-temperature plasma process without prolonged aeration and lists laparoscopes and arthroscopes among lumen-instrument examples.

### Safety and compatibility
These source statements are foundational comparisons, not reprocessing instructions. Cycle choice, material compatibility and lumen restrictions must follow the specific sterilizer and device manufacturer.

### Key determinants
Temperature sensitivity, sterilant chemistry, aeration requirement, device materials and validated lumen dimensions determine which low-temperature process is suitable.

### Clinical significance
Accurate distinction prevents exposure of heat-sensitive devices to incompatible cycles and avoids unsafe substitution of one gas process for another.

### Exam approach
Do not swap ethylene-oxide exposure and aeration details into plasma options, and do not classify plasma as high temperature.` },
  { id:A4, title:'Disinfectants versus skin antiseptics in the Helwan source', micro:'Disinfectants and antiseptics', refs:['Q05'], sections:`### Definition
Disinfectants are applied to inanimate surfaces, whereas antiseptics are formulated for living tissue. Suitability depends on formulation, concentration and approved use.

### Mechanism
Chemical agents disrupt microbial structures or functions, but antimicrobial activity alone does not establish safety for living tissue. Tissue compatibility distinguishes an antiseptic formulation from a surface disinfectant use.

### Source classification
The governed table lists phenolics for cultures and floors and chlorine-releasing compounds for surfaces, water and environmental contamination. It explicitly states that these categories cannot be used as skin antiseptics in this foundational comparison.

### Key determinants
Application site, formulation, concentration, exposure time and tissue toxicity determine whether a chemical product is used as a disinfectant or antiseptic.

### Clinical significance
Separating surface disinfection from tissue antisepsis reduces chemical injury and prevents unsafe transfer of environmental products to skin.

### Exam approach
Preserve the source False answer while avoiding universal clinical guidance. The item tests the lecture’s broad category distinction, not every modern formulation or concentration.` },
].filter((a) => a.id !== A2)

const articleRow = (a) => {
  const qs = a.refs.map((ref) => byRef[ref])
  const ids = qs.map((q) => q.concept)
  return row([['id',a.id],['title',a.title],['arabic_title',''],['aliases',`Family-38 ${a.micro}\nHU-BMS-102 sterilization`],['subject','inf'],['topic','Microbiology'],['subtopic','Sterilization and disinfection'],['microtopic',a.micro],['nanotopic','Family-38 safe objective slice'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF'],['template_id','TPL-CONCEPT'],['archetype','concept'],['language','en'],['learner_stage','Years 1–3 foundation'],['reading_time','6'],['high_yield','High'],['time_sensitive','stable'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['summary',`Question-led teaching for ${a.micro.toLowerCase()} with literal Family-38 wording and explicit study-bank authority limits.`],['sections',`${a.sections}\n\n### Source-grounded claims\n${qs.map((q) => q.display).join('\n')}`],['published_summary',''],['published_sections',''],['hold_these',qs.map((q) => q.display).join('\n')],['lose_the_mark','Treating the printed study answer as an official examination key.\nSilently repairing malformed temperature or time glyphs in the source options.\nApplying source-bounded equipment or chemical categories as universal clinical reprocessing guidance.'],['related_concepts',ids.join('\n')],['related_articles',allArticles.filter((id) => id !== a.id).join('\n')],['question_ids',qs.map((q) => q.id).join('\n')],['resource_ids',source],['universities','hu'],['years','HU_Y1'],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Sterilization and disinfection > ${a.micro} > Family-38`],['university_notes','hu: Tier-6 local lecture and in-lecture study answers only; no exam sitting, marks or official-key status is inferred.'],['annotations',ids.map((id) => `### definition_of · ${id}\nQuote: ${byConcept[id].display}\nBlock: body`).join('\n\n')],['media',''],['media_recommendations',''],['callout_evidence',qs.map((q) => `### ${q.display}\nClaims: ${q.claim}\nCitations: ${q.teachCit}, ${q.answerCit}\nSpan: ${q.span}`).join('\n\n')],['article_source_ids',source],['claim_ids',qs.map((q) => q.claim).join('\n')],['span_ids',qs.map((q) => q.span).join('\n')],['publication_gate','needs_evidence'],['evidence_basis','Exact tier-6 prompt and immediate printed study answer paired with teaching in the same governed carrier; no official-key authority is claimed.'],['evidence_gaps','Independent medical verification and named Helwan microbiology faculty review remain required. Q06–Q10 and Q18–Q20 remain unmarked-written holds.'],['conflicts','[clear]'],['last_reviewed',''],['review_due',''],['notes','Family 38 releases only T/F Q01–Q05 and MCQ Q11–Q17. The eight short-answer and essay occurrences receive no student-facing records.'],['field_notes','arabicTitle: Blank pending terminology review.\npublishedSummary: Blank because status is Draft.\npublishedSections: Blank because status is Draft.\nmedia: No rights-cleared asset is attached.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.']])
}

const conceptRow = (c) => {
  const q = byRef[c.ref]
  return row([['label',c.label],['id',c.id],['canonical_key',c.key],['aliases',c.aliases.join('\n')],['arabic_label',''],['arabic_aliases','[clear]'],['definition',c.definition],['explicit_objective',c.objective],['pitfalls',c.pitfalls],['concept_type',c.type],['status','Draft'],['support_mode','direct_statement'],['subject','inf'],['primary_node_id','DIS-MIC-T01'],['secondary_node_ids','SYS-INF'],['learner_years','1'],['universities','hu'],['modules','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Sterilization and disinfection > ${c.micro} > ${c.nano}`],['article_ids',c.article],['related_article_ids',allArticles.filter((id) => id !== c.article).join('\n')],['related_concept_ids','[clear]'],['resource_ids',source],['approved_file_resource_ids','[clear]'],['approved_video_resource_ids','[clear]'],['blueprint_weight','0.60'],['exam_weight_by_year','HU_Y1=0.60'],['clinical_relevance','0.72'],['academic_relevance','0.95'],['weight_confidence','0.48'],['confidence',q.ref === 'Q02' || q.ref === 'Q03' || q.ref === 'Q05' || q.ref === 'Q17' ? '0.78' : '0.88'],['exam_signal',`${source} | tier-6 in-lecture study bank | Family-38 ${q.ref}, immediate printed answer | not an official examination key`],['atomic_claim_ids',q.claim],['resource_occurrence_ids','[clear]'],['source_candidate_ids','[clear]'],['original_wording',`[Family-38 ${q.ref}] ${q.stem} [printed answer ${q.tf ? (q.key === 'A' ? 'True' : 'False') : q.key}]`],['merge_ids','[clear]'],['rejected_merge_candidate_ids','[clear]'],['conflicts','[clear]'],['uncertainty',c.limitation],['evidence_gaps',`No official examination, official answer key, sitting, marks or recurrence evidence is available. ${c.limitation} Independent medical verification and Helwan faculty review remain required.`],['owner','Helwan Year-1 authoring lane'],['reviewer','Medical team, Helwan Microbiology faculty'],['final_publisher','Admin team'],['last_reviewed',''],['review_due',''],['publication_status','needs_evidence'],['editorial_review_status','drafted_not_reviewed'],['exclusion_reason',''],['field_notes','arabicLabel: Blank pending terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists beneath the canonical placement.\nnanotopicId: No reviewed nanotopic ID exists beneath the assigned node.\napprovedFileResourceIds: Local source files are not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from the exact Family-38 prompt, answer and teaching pages.\nsourceCandidateIds: Family 38 completed the governed search-before-mint gate.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No authored same-scope rival exists.\nlastReviewed: New Draft; no faculty review has occurred.\nreviewDue: Set after first faculty review.\nexclusionReason: Not excluded; held at needs_evidence.\nreuseGovernance: New Family-38 question-led concept after governed no-same-scope authoring adjudication.']])
}

const wrongNotes = {
  Q11:['This malformed source option does not match the teaching cycle and is preserved without repair.','The source does not print this higher-temperature pair as its hot-air-oven cycle.',''],
  Q12:['A Bunsen flame is a red-heat tool for small laboratory items such as loops, not the bulk contaminated material in the stem.','','A micro-incinerator is used for small laboratory tools rather than the contaminated biological material category asked here.'],
  Q13:['Normal pressure does not make the boiling point rise above 100°C merely through prolonged heating.','','The source explicitly states that pressure raises the boiling point above 100°C.'],
  Q14:['','External steam supply characterizes the steam-jacketed design rather than the source’s simple autoclave.','Better air displacement characterizes the steam-jacketed comparison rather than this construction definition.','A vacuum pump is assigned to the prevacuum design, not the simple autoclave.'],
  Q15:['Vacuum evacuation is assigned to the prevacuum autoclave, not gravity displacement.','This wording is vague; the source’s precise matching feature in the option set is automatic control.','','The source does not state that biological indicators are unnecessary.'],
  Q16:['The source uses 55°C, not 100°C, for its ethylene-oxide exposure and preserves the malformed time glyphs only as source wording.','Ethylene oxide is directed to heat-sensitive plastic and rubber devices rather than heat-resistant glass and metal.','The source explicitly describes ethylene oxide as toxic and highly explosive.',''],
  Q17:['The source names hydrogen peroxide or a mixture with peracetic acid, not ethylene oxide, for plasma generation.','','The source describes the plasma process as non-toxic and not requiring prolonged aeration.','This is the source’s ethylene-oxide exposure and aeration pattern, not the plasma cycle.'],
}

const answerRows = (q) => {
  if (q.tf) {
    const c = byConcept[q.concept]
    const trueText = q.key === 'A'
      ? `True is the directly printed study answer because ${q.reason}. ${c.limitation}`
      : `True is not the printed study answer because ${q.reason}. ${c.limitation}`
    const falseText = q.key === 'B'
      ? `False is the directly printed study answer because ${q.reason}. ${c.limitation}`
      : `False is not the printed study answer because ${q.reason}. ${c.limitation}`
    return [['answer_a','True'],['explanation_a',trueText],['answer_b','False'],['explanation_b',falseText]]
  }
  return q.options.flatMap((option, i) => {
    const letter = 'ABCD'[i]
    const correct = letter === q.key
    const explanation = correct
      ? `The option “${option}” is the directly printed study answer because ${q.reason}. ${byConcept[q.concept].limitation}`
      : `${wrongNotes[q.ref][i]} The tested relationship is: ${q.display} Therefore “${option}” is not the best answer.`
    return [[`answer_${'abcd'[i]}`,option],[`explanation_${'abcd'[i]}`,explanation]]
  })
}

const questionRow = (q) => {
  const c = byConcept[q.concept]
  const printed = q.tf ? (q.key === 'A' ? 'True' : 'False') : q.key
  return row([['id',q.id],['title',q.stem],['subject','inf'],['status','Draft'],['owner','Helwan Year-1 authoring lane'],['vignette',''],['question',q.stem],['format',q.tf ? 'true or false' : 'single best answer'],['derived_from',''],['correct_answer',q.key],...answerRows(q),['topic','Sterilization and disinfection'],['subtopic',c.micro],['difficulty','Moderate'],['question_type',q.tf ? 'True/False' : 'Microbiology'],['main_concept',q.concept],['module','HU-BMS-102'],['module_subject',`HU-BMS-102 > Microbiology > Sterilization and disinfection > Family-38 > ${q.ref}`],['clinical_relevance','0.72'],['academic_relevance','0.95'],['cognitive_effort_score','0.46'],['exam_weight_by_year','HU_Y1=0.60'],['question_only_for','HU_Y1'],['concept_ids',q.concept],['years','HU_Y1'],['universities','hu'],['cognitive_effort','Low'],['setting','Academic'],['reasoning_level','1'],['inferred_difficulty','46'],['exam_relevance','6'],['contextual_concept_ids',''],['library_ids',c.article],['resource_ids',source],['learning_objective',c.objective],['media_recommendations',''],['source_citation',`${source}, PDF p${q.page}, Family-38 ${q.ref}: literal stem, options where applicable, and immediate printed study answer ${printed}; teaching context on p${c.teachPage}. Tier-6 local lecture/study-bank authority only, not an official examination or authenticated official key.`],['attachments',''],['attached_image',''],['author_notes',`Literal wording, capitalization, line breaks and malformed source glyphs are preserved without repair. ${c.limitation} Q11–Q13 remain three-option importer-schema holds; Q06–Q10 and Q18–Q20 remain unmarked-written holds, all without student-facing records.`],['estimated_seconds',q.tf ? '45' : '60'],['randomise_answers',q.tf ? 'no' : 'yes']])
}

const claimRow = (q) => {
  const c = byConcept[q.concept]
  return row([['id',q.claim],['concept_id',q.concept],['subject','inf'],['predicate',c.predicate],['object',c.object],['display_text',q.display],['risk_class','foundational_stable'],['verification_status','needs_evidence'],['conflict_status','none'],['confidence',q.ref === 'Q02' || q.ref === 'Q03' || q.ref === 'Q05' || q.ref === 'Q17' ? '0.78' : '0.88'],['freshness','stable_local_teaching_fact'],['time_sensitive','no'],['qualifiers',`authority: tier-6 local teaching plus immediate printed study answer, without official-key status. scope: ${c.limitation}`]])
}
const teachCitation = (q) => {
  const c = byConcept[q.concept]
  return row([['id',q.teachCit],['claim_id',q.claim],['resource_id',source],['evidence_role','local_curriculum'],['support_span',c.teaching],['locator_type','page'],['locator_page',c.teachPage],['locator_section',`${c.micro} teaching`],['locator_detail',`Direct teaching used to explain Family-38 ${q.ref}`],['context_note',`Tier-6 local lecture context; ${c.limitation}`],['confidence',q.ref === 'Q02' || q.ref === 'Q03' || q.ref === 'Q05' || q.ref === 'Q17' ? '0.80' : '0.92'],['counts_as_claim_evidence','no']])
}
const answerCitation = (q) => {
  const printed = q.tf ? (q.key === 'A' ? 'True' : 'False') : q.key
  return row([['id',q.answerCit],['claim_id',q.claim],['resource_id',source],['evidence_role','auxiliary_assessment'],['support_span',`${q.stem} Printed answer: ${printed}.`],['locator_type','page'],['locator_page',q.page],['locator_section',`In Lecture Questions — Family-38 ${q.ref}`],['locator_detail','Exact literal prompt and options where applicable, followed by the immediate printed study answer'],['context_note','Tier-6 in-lecture study bank; not an authenticated examination or official departmental key and supplies no marks.'],['confidence','0.92'],['counts_as_claim_evidence','no']])
}
const spanRow = (q) => row([['id',q.span],['article_id',byConcept[q.concept].article],['section_id',`${byConcept[q.concept].article.toLowerCase()}-${q.ref.toLowerCase()}`],['text',q.display],['claim_ids',q.claim],['citation_ids',`${q.teachCit}\n${q.answerCit}`]])

const relationSpecs = [
  ['Q01','related_concepts','Q02','the moist-heat mechanism and the source-ranked efficiency statement are distinct but related autoclave teaching scopes'],
  ['Q03','related_concepts','Q16','the source directs its heat-sensitive device category toward ethylene-oxide processing'],
  ['Q04','related_concepts','Q17','plasma’s low-temperature classification is related to the source-listed compatible-device use'],
  ['Q14','contrasts_with','Q15','simple-autoclave construction contrasts with the steam-jacketed gravity-displacement feature set'],
]
const relationRows = joinRows(relationSpecs.map(([left,type,right,scope]) => row([['source',byRef[left].concept],['type',type],['target',byRef[right].concept],['evidence_claim_ids',`${byRef[left].claim}\n${byRef[right].claim}`],['citation_ids',`${byRef[left].teachCit}\n${byRef[right].teachCit}`],['verification_status','needs_evidence'],['confidence','0.84'],['qualifiers',`scope: ${scope}`],['reviewer','Medical team, Helwan Microbiology faculty']])))

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family38-part1-sources.md',sourceRow],
  ['article/HU-BMS-102-microbiology-family38-part1-articles.md',joinRows(articleSpecs.map(articleRow))
    .replaceAll('Q06–Q10 and Q18–Q20 remain unmarked-written holds.', 'Q11–Q13 remain three-option importer-schema holds; Q06–Q10 and Q18–Q20 remain unmarked-written holds.')
    .replaceAll('Family 38 releases only T/F Q01–Q05 and MCQ Q11–Q17. The eight short-answer and essay occurrences receive no student-facing records.', 'Family 38 releases only T/F Q01–Q05 and MCQ Q14–Q17. Q11–Q13 remain three-option schema holds; the eight short-answer and essay occurrences receive no student-facing records.')],
  ['concept/HU-BMS-102-microbiology-family38-part1-concepts.md',joinRows(concepts.map(conceptRow))],
  ['evidence/HU-BMS-102-microbiology-family38-part1-claims.md',joinRows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-microbiology-family38-part1-citations.md',joinRows([...questions.map(teachCitation), ...questions.map(answerCitation)])],
  ['evidence/HU-BMS-102-microbiology-family38-part1-spans.md',joinRows(questions.map(spanRow))],
  ['relations/HU-BMS-102-microbiology-family38-part1-relations.md',relationRows],
  ['question/HU-BMS-102-microbiology-family38-part1-questions.md',joinRows(questions.map(questionRow))],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family:'38-part1', refs:questions.map((q) => q.ref), answers:questions.map((q) => `${q.ref}:${q.key}`), released:{ sources:1, articles:3, concepts:9, newConcepts:9, questions:9, claims:9, citations:18, spans:9, relations:4 }, holds:{ family36:{ unansweredObjective:10, unmarkedWritten:3 }, family37:{ teachingOnly:0 }, family38:{ threeOptionSchema:['Q11','Q12','Q13'], unmarkedWritten:['Q06','Q07','Q08','Q09','Q10','Q18','Q19','Q20'] } } }, null, 2))
