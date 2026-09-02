// Explanations for HU-GIT-301 pathology Chapter 2 ("Liver, GB and Pancreas").
// Keyed by the bank item `num`. `root` matches a CONCEPTS entry (or an
// UPDATES key) from HU-GIT-301-pathology-ch2-data.mjs. Stems and options are
// read directly from scripts/helwan/extract/HU-GIT-301/mcq-bank-pathology.json
// at build time; only the explanations, concept linkage and tagging live here.

export const QUESTIONS_CH2 = {
  1: { root: 'liver-zonation', topic: 'Liver pathology', subtopic: 'Hepatic zonation', difficulty: 'Moderate', explanations: {
    a: 'Zone 1, the periportal zone, receives the freshest, most oxygenated blood from the portal tract and is the most resistant zone to ischaemic injury, not the most vulnerable.',
    b: 'Zone 2 is the intermediate zone, classically the site affected in yellow fever, but it is not the zone most susceptible to vascular insufficiency.',
    c: 'Zone 3, the centrilobular (pericentral) zone, lies farthest from the incoming portal blood supply and so receives the least oxygenated blood of the three zones. It is therefore the most vulnerable to injury whenever blood flow or oxygenation falls, and it is also the zone richest in drug-metabolising cytochrome P450 enzymes, which adds vulnerability to toxic metabolites. This combination of relative hypoxia and metabolic activity is why centrilobular (zone 3) necrosis is the classic pattern seen in ischaemic and many toxic liver injuries.',
    d: 'Zone 3 is the correct answer among the given options, so "none of the above" is incorrect.',
  }},
  2: { root: 'viral-hepatitis-coinfection', topic: 'Liver pathology', subtopic: 'Viral hepatitis', difficulty: 'Moderate', explanations: {
    a: 'HAV does not require HBsAg to replicate and is not linked to HBV in a coinfection pattern; the two viruses do not share this defective-virus relationship.',
    b: 'HCV replicates independently of HBV and is not the virus that requires HBsAg for its own replication.',
    c: 'Hepatitis D virus is defective and cannot replicate without the HBsAg coat that only an active HBV infection supplies. When a person is infected with HBV and HDV at the same time, this is termed coinfection, and it usually produces a self-limited acute hepatitis with a comparatively low risk of progressing to chronic disease. This obligate dependence on HBsAg is exactly why HBV-HDV is the pair that produces a true coinfection, rather than HDV pairing with any of the other hepatitis viruses.',
    d: 'HEV, like HAV, replicates independently and follows an enteric transmission pattern unrelated to HDV’s dependence on HBsAg.',
  }},
  3: { root: 'hepatitis-e-virus', topic: 'Liver pathology', subtopic: 'Viral hepatitis', difficulty: 'Easy', explanations: {
    a: 'Blood and blood components are the chief route for HBV, HCV and HDV, not the characteristic route for HEV.',
    b: 'A sexual route is not the characteristic transmission pattern of HEV; that pattern is instead seen with some blood-borne hepatitis viruses in certain settings.',
    c: 'Transplacental spread is not the primary transmission route of HEV, even though vertical transmission from an infected pregnant woman to her fetus can occur as a secondary consequence of her infection.',
    d: 'Hepatitis E virus is transmitted enterically, by the faecal-oral route, typically through contaminated water supplies, in the same pattern as hepatitis A virus. This waterborne, faecal-oral spread explains why HEV causes large outbreaks linked to contaminated water sources, particularly in areas with poor sanitation. Recognising this enteric route, distinct from the parenteral and sexual routes of HBV, HCV and HDV, is the fact this question tests.',
  }},
  4: { root: 'hepatitis-e-virus', topic: 'Liver pathology', subtopic: 'Viral hepatitis', difficulty: 'Moderate', explanations: {
    a: 'HBV does not carry HEV’s specific, well-recognised risk of fatal fulminant hepatitis in pregnancy.',
    b: 'HCV does not carry this specific pregnancy-related fulminant hepatitis risk that distinguishes HEV.',
    c: 'HDV requires an existing HBV infection and is not the virus recognised for a specific fulminant hepatitis risk in pregnancy.',
    d: 'Hepatitis E virus carries a distinctive risk in pregnant women: infection, especially in the third trimester, can progress to fatal fulminant hepatitis, with a mortality rate far higher than in non-pregnant individuals or with the other hepatitis viruses. This unique susceptibility is one of the clinically most important features distinguishing HEV from HAV, despite both sharing the same enteric transmission route. Recognising HEV as the virus with this specific pregnancy risk is the fact tested here.',
  }},
  5: { root: 'viral-hepatitis-clinicopathological-syndromes', topic: 'Liver pathology', subtopic: 'Viral hepatitis', difficulty: 'Hard', explanations: {
    a: 'HAV and HBV infections genuinely are frequently subclinical, especially in children, so this true statement is not the exception.',
    b: 'HAV never causes chronic disease, but HDV, unlike HAV, can cause chronic hepatitis, particularly when it superinfects a person who is already a chronic HBV carrier. Grouping HDV together with HAV as both incapable of causing chronic disease is therefore false, which is exactly why this is the exception the question asks for. Recognising HDV’s capacity for chroniticy, unlike HAV’s, is the distinction this question is testing.',
    c: 'The carrier state genuinely is commonly caused by HBV or HCV, so this true statement is not the exception.',
    d: 'Acute symptomatic viral hepatitis cases genuinely do share a broadly similar clinical picture despite each virus having its own incubation period, so this true statement is not the exception.',
  }},
  7: { root: 'chronic-hepatitis-causes', topic: 'Liver pathology', subtopic: 'Chronic hepatitis', difficulty: 'Moderate', explanations: {
    a: 'Alpha-1 antitrypsin deficiency is a genuine, specific metabolic/genetic cause of chronic hepatitis, so this true statement is not the exception.',
    b: '"Cryptogenic" is not itself a metabolic cause of chronic hepatitis; it is the label applied when no cause, metabolic or otherwise, can be identified after a full work-up. Listing it alongside alpha-1 antitrypsin deficiency, haemochromatosis and Wilson disease as though it were a discrete metabolic disease category is therefore false, which is why it is the exception among these options. The genuine metabolic causes are specific, named genetic diseases, not a diagnosis of exclusion.',
    c: 'Haemochromatosis is a genuine, specific metabolic/genetic cause of chronic hepatitis, so this true statement is not the exception.',
    d: 'Wilson disease is a genuine, specific metabolic/genetic cause of chronic hepatitis, so this true statement is not the exception.',
  }},
  8: { root: 'chronic-hepatitis-causes', topic: 'Liver pathology', subtopic: 'Chronic hepatitis', difficulty: 'Easy', explanations: {
    a: 'Viral hepatitis, chiefly chronic HBV or HCV infection, is the single commonest cause of chronic hepatitis overall, ahead of autoimmune, drug-induced and metabolic causes. Its high global prevalence, and the tendency of HBV and HCV infection to persist rather than resolve in a substantial proportion of those infected, is what makes viral infection the dominant cause of chronic hepatitis worldwide. Recognising this relative ranking among the causes of chronic hepatitis is the fact tested here.',
    b: 'Autoimmune hepatitis is a recognised cause of chronic hepatitis but is considerably less common overall than chronic viral infection.',
    c: 'Drug-induced hepatitis can become chronic but is not the single commonest cause when weighed against the global burden of chronic viral hepatitis.',
    d: 'Metabolic hepatitis (from alpha-1 antitrypsin deficiency, haemochromatosis or Wilson disease) is a recognised but comparatively uncommon cause next to chronic viral infection.',
  }},
  9: { root: 'liver-abscess', topic: 'Liver pathology', subtopic: 'Liver abscess', difficulty: 'Moderate', explanations: {
    a: 'An infected hydatid cyst typically produces a single, localised abscess-like lesion at the site of the cyst, not the scattered multiple abscesses of pyaemic seeding.',
    b: 'A traumatic liver abscess typically forms at a single, localised site of injury, rather than as multiple scattered lesions.',
    c: 'Pyaemic (haematogenous) seeding spreads mixed flora from a distant septic focus through the portal or arterial circulation to multiple sites in the liver simultaneously, which is why it classically produces multiple, rather than solitary, liver abscesses. This haematogenous route contrasts with the more localised routes of a traumatic, hydatid, or direct cholecystitis-related abscess, which tend to remain confined to a single area. Recognising pyaemic spread as the multiplicity-producing mechanism is the fact tested here.',
    d: 'An abscess complicating cholecystitis typically arises by direct spread from the adjacent gall bladder to a localised area of liver, not by the scattered haematogenous route that produces multiple abscesses.',
  }},
  10: { root: 'granulomatous-liver-disease', topic: 'Liver pathology', subtopic: 'Granulomatous liver disease', difficulty: 'Moderate', explanations: {
    a: 'Tuberculosis genuinely is a classic cause of hepatic granulomas, so it is not the exception.',
    b: 'Non-alcoholic steatohepatitis (NASH) is a fatty liver disease defined by hepatic steatosis with hepatocellular injury and inflammation, not by granuloma formation, which is why it does not belong among the granulomatous liver diseases. Tuberculosis, primary biliary cirrhosis and sarcoidosis are all genuine causes of hepatic granulomas through different mechanisms (infective, autoimmune bile duct injury, and idiopathic granulomatous inflammation respectively), while NASH’s pathology is built around lipid accumulation and injury rather than granuloma formation. This is why NASH is the one that is not a granulomatous liver disease.',
    c: 'Primary biliary cirrhosis genuinely can produce hepatic granulomas around damaged bile ducts, so it is not the exception.',
    d: 'Sarcoidosis genuinely is a classic cause of hepatic (and systemic) granulomas, so it is not the exception.',
  }},
  11: { root: 'liver-abscess', topic: 'Liver pathology', subtopic: 'Acute cholangitic abscess', difficulty: 'Moderate', explanations: {
    a: 'Acute cholangitic abscesses genuinely are caused by mixed flora ascending the biliary tree, so this true statement is not the incorrect one.',
    b: 'An acute cholangitic abscess does not appear grossly as a single yellow small abscess; ascending infection of the bile ducts instead produces multiple small abscesses distributed through the portal tract areas around the bile ducts, not one solitary lesion. This multiplicity, together with the mixed bacterial flora and the full suppurative inflammatory changes seen in the bile ducts, is what characterises acute cholangitis pathologically. Describing it as a single abscess is therefore the incorrect statement among these options.',
    c: 'Acute cholangitic abscesses genuinely are located mostly in the portal tract areas around the bile ducts, so this true statement is not the incorrect one.',
    d: 'The bile ducts in acute cholangitis genuinely do show the full features of acute suppurative inflammation, so this true statement is not the incorrect one.',
  }},
  13: { root: 'alcoholic-steatosis', topic: 'Liver pathology', subtopic: 'Alcoholic liver disease', difficulty: 'Hard', explanations: {
    a: 'Alcohol does not increase fatty acid oxidation; it in fact decreases fatty acid oxidation within hepatocytes, which is one of the four mechanistic routes by which lipid accumulates in the liver. Increased fatty acid oxidation would reduce, not promote, hepatic fat accumulation, which is the opposite of what alcohol actually does and exactly why this is the false statement, the exception the question asks for. The genuine alcohol-driven routes are decreased oxidation, increased triglyceride synthesis, and impaired lipoprotein export.',
    b: 'Alcohol genuinely does increase synthesis of triglycerides within hepatocytes, one of its two direct contributions to steatosis, so this true statement is not the exception.',
    c: 'Alcohol genuinely does impair hepatic secretion of lipoproteins, its second direct contribution to steatosis, so this true statement is not the exception.',
    d: 'Increased fat mobilisation from peripheral stores genuinely is one of the four routes by which excess lipid reaches and accumulates in the liver, so this true statement is not the exception.',
  }},
  15: { root: 'haemochromatosis', topic: 'Liver pathology', subtopic: 'Haemochromatosis', difficulty: 'Moderate', explanations: {
    a: 'Haemochromatosis produces a specific type of cirrhosis classified as pigmented cirrhosis, reflecting the intense iron (haemosiderin) deposition throughout the liver that gives the organ its dense, chocolate-brown appearance as fibrous septa slowly develop into a micronodular cirrhotic pattern. This pigmented classification distinguishes haemochromatosis-related cirrhosis from post-necrotic cirrhosis (following massive hepatocyte death), nutritional cirrhosis (from malnutrition), and alcoholic cirrhosis, each of which has its own distinct gross appearance and mechanism. Naming pigmented cirrhosis as haemochromatosis’s specific cirrhosis type is the fact tested here.',
    b: 'Post-necrotic cirrhosis follows massive hepatocyte necrosis, typically from severe viral hepatitis or toxic injury, not from the iron-deposition mechanism of haemochromatosis.',
    c: 'Nutritional cirrhosis follows chronic malnutrition, a different mechanism from haemochromatosis’s iron-overload pathway.',
    d: 'Alcoholic cirrhosis follows chronic alcohol-related liver injury, a different, non-iron-related mechanism from haemochromatosis.',
  }},
  16: { root: 'budd-chiari-syndrome', topic: 'Liver pathology', subtopic: 'Budd-Chiari syndrome', difficulty: 'Moderate', explanations: {
    a: 'Prolonged obstruction of the extrahepatic bile ducts describes secondary biliary cirrhosis, a bile-flow disorder, not the venous thrombotic process of Budd-Chiari syndrome.',
    b: 'Chronic venous congestion of the liver alone, without naming the thrombotic mechanism, describes the passive congestion of right heart failure ("nutmeg liver") more than the specific hepatic vein thrombosis that defines Budd-Chiari syndrome.',
    c: 'Budd-Chiari syndrome is thrombosis of the hepatic veins, the large veins that drain the liver into the inferior vena cava. This thrombosis produces severe hepatic venous congestion which, if it persists, progresses through centrilobular fibrosis to cirrhosis. Naming the thrombotic event and its fibrotic progression together is what correctly and completely defines Budd-Chiari syndrome among these options.',
    d: 'Toxic plant alkaloids producing venous fibrosis describes veno-occlusive disease, a distinct entity affecting the small hepatic venules rather than the larger hepatic veins thrombosed in Budd-Chiari syndrome.',
  }},
  17: { root: 'gallstones', topic: 'Liver pathology', subtopic: 'Gallstone complications', difficulty: 'Moderate', explanations: {
    a: 'Cardiac cirrhosis follows chronic passive venous congestion from right heart failure, a different mechanism from gallstone-related biliary obstruction.',
    b: 'Gallstones that chronically obstruct the biliary tree can lead to secondary biliary cirrhosis, in which the sustained back-pressure and repeated cholangitis from obstructed bile flow progressively damage and fibrose the liver. This complication follows directly from the mechanical obstruction gallstones can cause when they become lodged in the biliary tree, distinguishing it from cirrhosis types that arise through cardiac congestion, massive hepatocyte necrosis, or malnutrition. Naming secondary biliary cirrhosis as the gallstone complication is the fact tested here.',
    c: 'Post-necrotic cirrhosis follows massive hepatocyte necrosis, typically viral or toxic, not the obstructive mechanism of gallstones.',
    d: 'Nutritional cirrhosis follows chronic malnutrition, unrelated to gallstone obstruction.',
  }},
  18: { root: 'cirrhosis-pathological-features', topic: 'Liver pathology', subtopic: 'Cirrhosis morphology', difficulty: 'Hard', explanations: {
    a: 'A regenerating nodule in cirrhosis does not show liver cells proliferating as a regular, one-cell-thick plate radiating from the central vein; that orderly, radiating pattern describes the normal liver architecture, which cirrhotic regeneration specifically disrupts. In a regenerating nodule the sinusoids become irregular, the central vein may be absent or eccentric, and the cell plates lose their normal regular arrangement, which is exactly why this description of preserved normal architecture is the false, and therefore the correct, answer to this "not true" question. The other listed features (irregular sinusoids, binucleation and dysplastic change, and additional degenerative changes) are all genuinely seen in regenerating nodules.',
    b: 'Irregular sinusoids with an absent or eccentric central vein genuinely are features of a regenerating nodule, so this true statement is not the answer to this "not true" question.',
    c: 'Binucleation and dysplastic change in liver cells genuinely can be seen within regenerating nodules, so this true statement is not the answer to this "not true" question.',
    d: 'Additional changes such as necrotic foci, fatty change or hydropic change genuinely may be observed within regenerating nodules, so this true statement is not the answer to this "not true" question.',
  }},
  19: { root: 'cirrhosis-pathological-features', topic: 'Liver pathology', subtopic: 'Alcoholic cirrhosis', difficulty: 'Hard', explanations: {
    a: 'A dark, chocolate-brown liver colour is the classic descriptor of iron-loaded, pigmented cirrhosis from haemochromatosis, not the typical gross appearance of alcoholic cirrhosis.',
    b: 'Cirrhotic livers, including alcoholic cirrhosis, are typically firm to hard in consistency because of their fibrous septa, not softer than normal.',
    c: 'Cirrhotic liver edges become sharp and irregular as fibrous septa and regenerating nodules distort the normal contour, rather than staying smoothly rounded, which is a feature more typical of a diffusely enlarged but non-cirrhotic liver.',
    d: 'Alcoholic cirrhosis characteristically begins as a micronodular pattern, with small, regular regenerating nodules, but as the disease progresses and nodules coalesce or new areas of injury add larger nodules, the pattern can become macronodular or mixed. This spectrum from micronodular through to mixed is a genuine and well-recognised gross feature of alcoholic (Laennec’s) cirrhosis. It distinguishes this answer from the other options, each of which describes a feature — dark brown colour, softness, rounded edges — that belongs to a different entity or contradicts what alcoholic cirrhosis actually looks like.',
  }},
  20: { root: 'primary-biliary-cirrhosis', topic: 'Liver pathology', subtopic: 'Primary biliary cirrhosis', difficulty: 'Moderate', explanations: {
    a: 'Primary biliary cirrhosis genuinely is an autoimmune disease, so this true statement is not the incorrect one.',
    b: 'Serum antimitochondrial antibodies genuinely are detected in most cases of primary biliary cirrhosis, its hallmark serologic marker, so this true statement is not the incorrect one.',
    c: 'Primary biliary cirrhosis does not mostly affect middle-aged males; it is instead one of the classically female-predominant autoimmune liver diseases, with a female-to-male ratio of around nine or ten to one. This strong female predominance is a defining epidemiological feature that distinguishes it from many other causes of cirrhosis, which is exactly why misstating it as a disease of middle-aged males is the incorrect statement among these options. The correct autoimmune mechanism, antimitochondrial antibody marker, and green micronodular liver are all otherwise accurately described elsewhere among these choices.',
    d: 'The liver in primary biliary cirrhosis genuinely is enlarged, green from bile stasis, with a micronodular cut section, so this true statement is not the incorrect one.',
  }},
  21: { root: 'portal-hypertension-classification', topic: 'Liver pathology', subtopic: 'Portal hypertension', difficulty: 'Hard', explanations: {
    a: 'Portal tract fibrosis caused by schistosomiasis obstructs portal blood flow before it ever reaches the hepatic sinusoids, which is exactly what makes it a presinusoidal cause of portal hypertension. The eggs deposited in the portal tracts by the schistosome provoke a granulomatous fibrotic reaction ("pipestem fibrosis"), raising resistance upstream of the sinusoid while sinusoidal and hepatocyte architecture itself is often relatively preserved. This upstream, portal-tract level of obstruction is what distinguishes schistosomal portal hypertension from the sinusoidal and postsinusoidal causes among the other options.',
    b: 'Liver cirrhosis is the classic sinusoidal cause of portal hypertension, obstructing flow at the level of the distorted sinusoids themselves, not before blood reaches them.',
    c: 'Veno-occlusive disease is a postsinusoidal cause of portal hypertension, obstructing the small hepatic venules after blood has already passed through the sinusoids.',
    d: 'Budd-Chiari syndrome is a postsinusoidal cause of portal hypertension, obstructing the larger hepatic veins after blood has already passed through the sinusoids.',
  }},
  22: { root: 'liver-cell-adenoma', topic: 'Liver pathology', subtopic: 'Liver cell adenoma', difficulty: 'Moderate', explanations: {
    a: 'Liver cell adenoma is a tumour of hepatocytes, not a bile duct neoplasm, so this option misstates its cell of origin.',
    b: 'Liver cell adenoma occurs predominantly in young women, not young men, reflecting its strong link to oral contraceptive use.',
    c: 'Liver cell adenoma does not commonly harbour hepatocellular carcinoma; only a small subset, particularly larger or specific molecular subtypes, carries any malignant potential, so "commonly" overstates this risk.',
    d: 'Liver cell adenoma is a benign tumour of hepatocytes with a well-established association with oral contraceptive use, occurring predominantly in young women of reproductive age. This oestrogen-related association is one of the most clinically important facts about the tumour, since stopping oral contraceptives can lead to regression of some adenomas, and pregnancy or continued hormone exposure can promote their growth or rupture. Recognising this hormonal association, rather than a bile duct origin or a male predominance, is the fact this question tests.',
  }},
  24: { root: 'hepatocellular-carcinoma-afp', topic: 'Liver pathology', subtopic: 'Hepatocellular carcinoma', difficulty: 'Easy', explanations: {
    a: 'CEA (carcinoembryonic antigen) is characteristically raised in colorectal carcinoma, not the marker specific to hepatocellular carcinoma.',
    b: 'PSA (prostate-specific antigen) is a prostate cancer marker, unrelated to hepatocellular carcinoma.',
    c: 'Hepatocellular carcinoma is characterised by elevation of serum alpha-fetoprotein (AFP), an oncofetal protein normally produced by the fetal liver and yolk sac that is re-expressed by malignant hepatocytes. AFP is used both diagnostically and to monitor treatment response and recurrence in hepatocellular carcinoma, making it one of the most clinically useful tumour markers in liver pathology. Distinguishing AFP as hepatocellular carcinoma’s marker, rather than CEA, PSA or CA19-9, is the fact tested here.',
    d: 'CA19-9 is characteristically raised in pancreatic and biliary tract cancers, including cholangiocarcinoma, not hepatocellular carcinoma.',
  }},
  25: { root: 'chronic-liver-failure-causes', topic: 'Liver pathology', subtopic: 'Liver failure', difficulty: 'Moderate', explanations: {
    a: 'Chronic biliary obstruction genuinely is a recognised cause of progressive, chronic liver failure, so this true statement is not the exception.',
    b: 'Primary and metastatic liver tumours genuinely can progressively destroy functioning liver parenchyma and cause chronic liver failure, so this true statement is not the exception.',
    c: 'Liver granulomas genuinely can, when chronic and extensive, contribute to progressive chronic liver failure, so this true statement is not the exception.',
    d: "Reye's syndrome is an acute, rapidly progressive fulminant hepatic failure of childhood, with microvesicular steatosis and encephalopathy classically linked to aspirin use during a viral illness, not a cause of chronic liver failure. Its rapid, acute time course is fundamentally different from the slow, progressive destruction of chronic biliary obstruction, liver tumours or liver granulomas, which is exactly why it is the exception among these chronic liver failure causes. Recognising Reye's syndrome as an acute rather than chronic process is the point of this question.",
  }},
  26: { root: 'hepatoblastoma', topic: 'Liver pathology', subtopic: 'Hepatoblastoma', difficulty: 'Hard', explanations: {
    a: 'Hepatoblastoma genuinely is an embryonic tumour composed of immature hepatocytes, so this true statement is not the answer to this "not true" question.',
    b: 'Hepatoblastoma stroma genuinely may contain fibrous tissue, cartilage or bone (a mixed epithelial-mesenchymal pattern), so this true statement is not the answer to this "not true" question.',
    c: 'Hepatoblastoma does not have a historical association with vinyl chloride or arsenic exposure; that toxin history belongs instead to hepatic angiosarcoma, a distinct vascular malignancy of the liver. Hepatoblastoma is usually a sporadic paediatric tumour, sometimes associated with genetic conditions such as Beckwith-Wiedemann syndrome or familial adenomatous polyposis, rather than with environmental toxin exposure. Attaching vinyl chloride or arsenic to hepatoblastoma rather than to angiosarcoma is therefore the false statement, and the answer to this "not true" question.',
    d: "Hepatoblastoma's serum alpha-fetoprotein level genuinely may be high, a useful tumour marker in this cancer, so this true statement is not the answer to this \"not true\" question.",
  }},
  27: { root: 'cholangiocarcinoma', topic: 'Liver pathology', subtopic: 'Cholangiocarcinoma', difficulty: 'Hard', explanations: {
    a: 'Cholangiocarcinoma genuinely does arise from elements of the intra- and extrahepatic biliary tree, so this true statement is not the incorrect one.',
    b: 'As taught in this course, females are described as more commonly affected than males by cholangiocarcinoma, so this statement is not the incorrect one being tested here.',
    c: 'Cholangiocarcinoma is not associated with a rise in alpha-fetoprotein; that oncofetal marker instead tracks hepatocellular carcinoma, a hepatocyte-derived tumour with a fundamentally different cell of origin from the bile-duct-derived cholangiocarcinoma. Cholangiocarcinoma’s own tumour marker is CA19-9, not AFP, and confusing the two liver cancers’ markers is a common error this question is designed to catch. This is the incorrect statement among the options, and the answer to this question.',
    d: 'Cholangiocarcinoma genuinely can be associated with primary sclerosing cholangitis, HCV infection and historical thorotrast administration, so this true statement is not the incorrect one.',
  }},
  28: { root: 'gallstones', topic: 'Liver pathology', subtopic: 'Gallstones', difficulty: 'Moderate', explanations: {
    a: 'Diabetes genuinely is a recognised risk factor for cholesterol gallstone formation, so this true statement is not the exception.',
    b: 'Pregnancy genuinely predisposes to cholesterol gallstones, through biliary stasis and oestrogen-driven increased cholesterol saturation of bile, so this true statement is not the exception.',
    c: 'Obesity genuinely predisposes to cholesterol gallstones by increasing hepatic cholesterol secretion into bile, so this true statement is not the exception.',
    d: 'Haemolytic anaemia does not predispose to cholesterol stones; it instead drives the formation of pigment stones, through the excess bilirubin turnover that chronic haemolysis produces. Cholesterol stones and pigment stones form by two different pathways: cholesterol supersaturation of bile, favoured by obesity, diabetes and pregnancy, versus excess bilirubin from haemolysis. This is why haemolytic anaemia, a pigment-stone risk factor, is the exception among these cholesterol-stone risk factors.',
  }},
  29: { root: 'gallstones', topic: 'Liver pathology', subtopic: 'Gallstones', difficulty: 'Easy', explanations: {
    a: 'Diabetes is a recognised risk factor for cholesterol gallstones, not the classic cause of pure pigment stones.',
    b: 'Pure pigment stones of the gall bladder are commonly caused by chronic haemolytic anaemia, which increases the turnover of haemoglobin into unconjugated bilirubin. This excess bilirubin, when it exceeds the liver’s capacity to conjugate and excrete it, precipitates in the biliary tree as calcium bilirubinate, forming pure pigment stones. This bilirubin-driven pathway is distinct from the cholesterol-supersaturation pathway behind cholesterol stones, which is favoured instead by obesity, diabetes and pregnancy.',
    c: 'Obesity is a recognised risk factor for cholesterol gallstones, not the classic cause of pure pigment stones.',
    d: 'Infection can complicate gallstone disease but is not the classic primary cause of pure pigment stone formation; that cause is chronic haemolysis.',
  }},
  30: { root: 'chronic-pancreatitis-alcohol-pathogenesis', topic: 'Pancreatic pathology', subtopic: 'Chronic pancreatitis', difficulty: 'Easy', explanations: {
    a: 'Alcohol is the single commonest cause of chronic pancreatitis, acting both by direct toxic injury to acinar cells and by increasing the protein content of pancreatic secretions, which forms ductal plugs that calcify and obstruct pancreatic flow. This combination of direct acinar injury and secondary ductal obstruction drives the irreversible parenchymal destruction and fibrosis that define chronic pancreatitis, and accounts for alcohol’s dominance as its cause in most adult populations. Recognising alcohol as the leading cause, ahead of tumours, calculi or recurrent acute pancreatitis, is the fact tested here.',
    b: 'Pancreatic tumours can obstruct the duct and contribute to chronic pancreatitis in some cases, but they are not the single commonest overall cause.',
    c: 'Pancreatic calculi can form as chronic pancreatitis progresses, but they are a consequence of the disease process more than its single commonest primary cause.',
    d: 'Recurrent acute pancreatitis can progress to a chronic pattern in some patients, but alcohol’s direct toxic and secretory effects make it the single commonest overall cause.',
  }},
  31: { root: 'chronic-pancreatitis-alcohol-pathogenesis', topic: 'Pancreatic pathology', subtopic: 'Chronic pancreatitis', difficulty: 'Hard', explanations: {
    a: 'Alcohol does not decrease the protein content of pancreatic secretions; it in fact increases it. This excess secreted protein forms plugs within the small pancreatic ductules, and these plugs subsequently become calcified, obstructing ductal flow and driving further acinar injury. Because this is the opposite of what alcohol actually does to ductal protein content, it is the false statement among these options, and the answer to this "not true" question.',
    b: 'The formation of a plug that becomes calcified genuinely is part of alcohol’s pathogenic sequence in chronic pancreatitis, so this true statement is not the answer to this "not true" question.',
    c: 'Alcohol genuinely can be directly injurious to acinar cells, a second, independent mechanism of pancreatic injury alongside ductal plugging, so this true statement is not the answer to this "not true" question.',
    d: 'Chronic pancreatitis genuinely does end in irreversible parenchymal destruction and fibrosis, its defining pathological outcome, so this true statement is not the answer to this "not true" question.',
  }},
  32: { root: 'chronic-pancreatitis-complications', topic: 'Pancreatic pathology', subtopic: 'Chronic pancreatitis', difficulty: 'Moderate', explanations: {
    a: 'Malabsorption genuinely is a direct complication of chronic pancreatitis, from progressive exocrine pancreatic insufficiency, so this true statement is not the exception.',
    b: 'Diabetes mellitus genuinely is a direct complication of chronic pancreatitis, from progressive endocrine (islet) insufficiency, so this true statement is not the exception.',
    c: 'Pseudocyst formation genuinely is a direct complication of chronic pancreatitis, from disruption of the pancreatic ductal system, so this true statement is not the exception.',
    d: "\"Tumour transformation\" is not counted, in this course's framework, among the direct complications of chronic pancreatitis alongside malabsorption, diabetes and pseudocyst formation. While chronic pancreatitis is recognised as a long-term epidemiological risk factor for pancreatic carcinoma over years to decades, that association is a distinct, indirect oncological risk rather than a direct mechanistic complication in the way exocrine loss produces malabsorption or endocrine loss produces diabetes. This distinction is why tumour transformation is the exception among these listed complications.",
  }},
  33: { root: 'pancreatic-carcinoma', topic: 'Pancreatic pathology', subtopic: 'Pancreatic carcinoma', difficulty: 'Moderate', explanations: {
    a: 'Jaundice genuinely is a classic clinical presentation of pancreatic carcinoma, especially from a head-of-pancreas tumour obstructing the common bile duct, so this true statement is not the exception.',
    b: "Diabetes is not counted among this course's classic presenting triad for pancreatic carcinoma, even though new-onset diabetes can occasionally be an early paraneoplastic sign of the disease. The classic clinical presentation taught here is built around jaundice, weight loss and back pain, reflecting the tumour's site, its cachexia, and its retroperitoneal nerve invasion respectively, rather than an endocrine disturbance. This is why diabetes is the exception among these listed presenting features.",
    c: 'Weight loss genuinely is a classic clinical presentation of pancreatic carcinoma, reflecting the cachexia of advanced malignancy, so this true statement is not the exception.',
    d: 'Back pain genuinely is a classic clinical presentation of pancreatic carcinoma, from retroperitoneal invasion of nearby nerves, so this true statement is not the exception.',
  }},
  34: { root: 'pancreatic-carcinoma', topic: 'Pancreatic pathology', subtopic: 'Pancreatic carcinoma', difficulty: 'Easy', explanations: {
    a: 'The majority of pancreatic carcinomas arise in the head of the gland, where the growing tumour compresses and obstructs the adjacent common bile duct, producing the classic early jaundice that often prompts diagnosis. This site preference is clinically important because head-of-pancreas tumours tend to present earlier, through biliary obstruction, than tumours arising in the body or tail, which often grow silently until they are more advanced. Recognising the head of the gland as the commonest site is the fact tested here.',
    b: 'The body of the gland is affected less often than the head, and tumours there tend to present later, without the early biliary obstruction seen with head-of-pancreas tumours.',
    c: 'The tail of the gland is affected less often than the head, and tail tumours are notorious for presenting late, since they cause no early biliary obstruction.',
    d: 'The body and tail together are affected less often than the head alone, which remains the single commonest site for pancreatic carcinoma.',
  }},
  35: { root: 'pancreatic-pseudocyst', topic: 'Pancreatic pathology', subtopic: 'Pancreatic pseudocyst', difficulty: 'Moderate', explanations: {
    a: 'Pancreatic pseudocysts genuinely do account for most pancreatic cysts, so this true statement is not the answer to this "not true" question.',
    b: 'A pancreatic pseudocyst is not lined by simple squamous epithelium, or by any true epithelium at all; its wall is instead composed of fibrosed granulation tissue. This absence of a true epithelial lining is exactly what earns the lesion the name "pseudocyst", distinguishing it from a true cystic neoplasm of the pancreas, which does have an epithelial lining. This is the false statement among these options, and the answer to this "not true" question.',
    c: 'A pancreatic pseudocyst genuinely is encircled by fibrosed granulation tissue, its defining wall structure, so this true statement is not the answer to this "not true" question.',
    d: 'A pancreatic pseudocyst genuinely does occur after bouts of acute pancreatitis or following trauma, its classic clinical setting, so this true statement is not the answer to this "not true" question.',
  }},
  36: { root: 'peritoneal-carcinomatosis', topic: 'Pancreatic pathology', subtopic: 'Peritoneal carcinomatosis', difficulty: 'Hard', explanations: {
    a: 'Hepatocellular carcinoma characteristically spreads by local invasion and vascular (portal vein) invasion rather than by the transcoelomic peritoneal seeding that produces peritoneal carcinomatosis.',
    b: 'Gastric carcinoma can seed the peritoneum in some cases, but ovarian and pancreatic adenocarcinoma are the primaries most characteristically and commonly linked to peritoneal carcinomatosis.',
    c: 'Colorectal carcinoma can also spread to the peritoneum in advanced disease, but ovarian and pancreatic adenocarcinoma remain the more characteristic and commonly cited primaries for this pattern of spread.',
    d: 'Secondary peritoneal deposits are commonly derived from ovarian and pancreatic adenocarcinoma, both of which characteristically spread by direct transcoelomic seeding across the peritoneal surface rather than chiefly by the bloodstream. Ovarian carcinoma is the textbook example of transcoelomic spread, shedding malignant cells directly into the peritoneal cavity, and pancreatic adenocarcinoma similarly disseminates aggressively across peritoneal surfaces from its retroperitoneal location. Recognising these two as the classic sources of peritoneal carcinomatosis is the fact tested here.',
  }},
}
