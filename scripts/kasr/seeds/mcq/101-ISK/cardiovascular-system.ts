/**
 * `101 ISK > Anatomy > Basis of Anatomy > Cardiovascular system` — the question books' MCQs.
 *
 * Eighty-five rows carry this leaf tag and eight are about this chapter. The
 * other seventy-seven are upper limb — the anastomosis around the scapula and
 * the elbow, the brachial, radial and ulnar arteries, the breast — filed here
 * because they name a vessel. They belong to the Upper Limb leaves and are left
 * to their authors.
 *
 * What is genuinely left is smaller than the chapter deserves, and the shape of
 * the gap is worth recording. The chapter is eight pages: chambers and valves,
 * the three circulations, three named types of arterial anastomosis, the five
 * end arteries, the five factors helping venous return from the lower limb, and
 * the arteriovenous shunt with its sites and functions. **The question books ask
 * about none of the second half.** A search of the whole 2704-row bank for "end
 * artery", "arteriovenous shunt", "venous return", "muscle pump", "varicose"
 * and "anastomosis by conversion" returns nothing outside the upper limb. Every
 * surviving row asks the same two things: which blood is in which chamber, and
 * which vessel belongs to which circulation.
 *
 * Four rows are sittable and four are not. Two of the four exclusions are the
 * more interesting kind. `which-chamber-of-the-heart-pumps-deoxygenated-blood`
 * lost its fourth option to bleed-through from a lymphatic question on the same
 * page, so the printed item contains an option about lymph vessels; and
 * `which-of-the-following-vessels-is-part-of-the-systemic-circulation` prints
 * both the aorta and the coronary arteries, which are branches of the aorta —
 * two true answers and no key to say which the examiner wanted.
 */
import type { McqLeafSeed } from '../mcq.ts'

export const LEAF: McqLeafSeed = {
  leaf: 'Cardiovascular system',
  modulePath: '101 ISK > Anatomy > Basis of Anatomy > Cardiovascular system',
  articleId: 'ART-101-ANA-CARDIOVASCULAR-SYSTEM',

  concepts: [
    {
      key: 'heart-chambers-and-the-blood-each-carries',
      label: 'The right half of the heart carries deoxygenated blood and the left half oxygenated, and each chamber has one way in and one way out',
      definition: 'The heart lies behind the sternum and costal cartilages, about two-thirds of it to the left of the median plane, and has four chambers. The right atrium receives deoxygenated blood from the whole body by the superior and inferior venae cavae and passes it through the tricuspid valve to the right ventricle. The right ventricle sends it through the pulmonary valve into the pulmonary trunk and so to both lungs. The left atrium receives oxygenated blood from the lungs by four pulmonary veins and passes it through the mitral valve to the left ventricle, which pumps it through the aortic valve into the aorta. So the right half of the heart holds venous blood and the left half arterial blood, and the two never mix.',
      objective: 'Name what each chamber of the heart receives, where it sends it, and through which valve.',
      pitfall: 'Reading "artery" as "oxygenated". The pulmonary artery carries deoxygenated blood and the pulmonary veins carry oxygenated blood; the name records the direction of flow, not the content.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-CVS-T01-S01-M01'],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Cardiovascular system',
      type: 'structural_description',
      aliases: ['Chambers of the heart'],
    },
    {
      key: 'systemic-pulmonary-and-portal-circulations',
      label: 'There are three circulations, and each is defined by where its blood starts, what happens to it and where it comes back',
      definition: 'The systemic circulation carries oxygenated blood from the left ventricle through the aorta and its branches to all the tissues, where gases and materials are exchanged; the deoxygenated blood is collected by small then large veins and finally the venae cavae into the right atrium. The pulmonary circulation carries deoxygenated blood from the right ventricle through the pulmonary artery and its two branches to both lungs, where gas exchange occurs, and the oxygenated blood returns by the four pulmonary veins to the left atrium. The portal circulation carries venous blood from the stomach, spleen, pancreas and intestine in the portal vein, which enters the liver at the porta hepatis and divides into branches ending in the liver sinusoids; the blood leaves by the hepatic veins into the inferior vena cava. Its purpose is to bring absorbed nutrients to the liver to be metabolised and the blood to be detoxified.',
      objective: 'Trace each of the three circulations from its starting chamber or organ to where its blood is returned, naming the vessels.',
      pitfall: 'Making the portal vein carry blood away from the liver. It is the vein that brings blood *to* the liver from the gut; the hepatic veins take it away. The one syllable between "portal" and "hepatic" is the whole answer to several of these questions.',
      subject: 'msk', primary: 'DIS-ANA-T01', secondary: ['SYS-CVS-T01-S02-M02'],
      modulePath: '101 ISK > Anatomy > Basis of Anatomy > Cardiovascular system',
      type: 'functional_relationship',
      aliases: ['Systemic circulation', 'Pulmonary circulation', 'Portal circulation'],
      gaps: [
        'The chapter also teaches arterial anastomosis in three named types, the five end arteries, the five factors helping venous return from the lower limb, and the arteriovenous shunt with its sites and functions. No row in the 2704-question bank asks about any of them outside the regional context of the upper limb, so this leaf carries no exam signal for half of its own chapter.',
      ],
    },
  ],

  questions: [
    {
      key: 'the-right-atrium-receives-blood-from-ab87972a',
      conceptKey: 'heart-chambers-and-the-blood-each-carries',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Name the vessels that empty into the right atrium.',
      explanations: {
        A: 'Correct. The right atrium receives deoxygenated blood from all parts of the body through the superior and inferior venae cavae.',
        B: 'The pulmonary artery leaves the right ventricle for the lungs. Naming it here would reverse the direction of flow through the right heart.',
        C: 'The aorta leaves the left ventricle. It is the outflow of the other side of the heart entirely.',
        D: 'The four pulmonary veins are the trap, and a good one: they carry blood back to the heart, so a student thinking only "veins return blood" takes them. They return it to the *left* atrium, and the blood in them is oxygenated.',
      },
    },
    {
      key: 'which-chamber-of-the-heart-pumps-deoxygenated-blood-to-the-l-c9700c1d',
      conceptKey: 'heart-chambers-and-the-blood-each-carries',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The option block is contaminated. Option D reads "Absent in brain, spinal cord, bone marrow and avascular structures", which is a statement about lymph vessels bled through from a lymphatic-system question on the same page — it appears verbatim as an option of `concerning-the-lymph-vessels-of-body-choose-the-correct-answ-2f07a5ad`. The other three options are intact and the answer would be C, the right ventricle, but a row that has demonstrably taken an option from a different question cannot be trusted to have kept the rest of its own, and it cannot be shown to a student as printed. Recoverable by rescanning the page.',
    },
    {
      key: 'regarding-the-systemic-circulation-which-of-the-following-st-d6fe5e52',
      conceptKey: 'systemic-pulmonary-and-portal-circulations',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the true statement about the systemic circulation.',
      explanations: {
        A: 'Backwards through the right heart. Blood passes from the right atrium to the right ventricle, and in any case that is the start of the pulmonary circuit, not the systemic one.',
        B: 'Half right, which is why it is printed. The veins do collect blood into the right atrium, but what they collect is deoxygenated blood — the oxygen was given up in the tissues, which is the point of the circuit.',
        C: 'The right vessel with the wrong blood. The aorta does carry blood to all the tissues, but it leaves the left ventricle and the blood in it is oxygenated.',
        D: 'Correct. Oxygenated blood leaves the left ventricle through the aorta and its branches and reaches all the tissues of the body — the definition of the systemic circulation.',
      },
    },
    {
      key: 'regarding-the-systemic-circulation-which-of-the-following-st-3134443f',
      conceptKey: 'systemic-pulmonary-and-portal-circulations',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A "(DEP BOOK)" reprint of `regarding-the-systemic-circulation-which-of-the-following-st-d6fe5e52` with the same four options and no key. The keyed copy, asked twice, is imported.',
    },
    {
      key: 'regarding-the-pulmonary-circulation-which-of-the-following-s-e4641068',
      conceptKey: 'systemic-pulmonary-and-portal-circulations',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Identify the true statement about the pulmonary circulation.',
      answerOverride: 'C',
      answerOverrideReason: 'The "(DEP BOOK)" copy printed no key, and the only other printing of this question is too damaged to import. C is the department chapter\'s own account of the pulmonary circulation: oxygenated blood returns from both lungs to the left atrium by the four pulmonary veins. The other three options describe flows the chapter denies.',
      explanations: {
        A: 'Backwards. Blood passes from the right atrium to the right ventricle and out through the pulmonary valve; a ventricle never fills the atrium above it.',
        B: 'A description of the systemic circulation with the wrong blood in it. Veins do collect into the right atrium, but the blood they bring is deoxygenated.',
        C: 'Correct, and the override. After gas exchange in the lungs the oxygenated blood returns to the left atrium through the four pulmonary veins — the only vessels named "vein" in the body that carry arterial blood.',
        D: 'The aorta carries oxygenated blood, and it belongs to the systemic circulation. This option and B are the same swap made in opposite directions.',
      },
    },
    {
      key: 'regarding-the-pulmonary-circulation-which-of-the-following-s-749c0aa5',
      conceptKey: 'systemic-pulmonary-and-portal-circulations',
      difficulty: 'Easy', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'A second printing of the pulmonary-circulation question, badly scanned and contaminated: the stem is broken ("froin the right ventricle to the. right atrium", "to ail tissues"), and option B has been replaced by "The venous blood leaves the liver through the portal vein", which belongs to the portal-circulation question printed beside it. The clean copy `regarding-the-pulmonary-circulation-which-of-the-following-s-e4641068` is imported.',
    },
    {
      key: 'regarding-the-portal-circulation-which-of-the-following-stat-1deb4653',
      conceptKey: 'systemic-pulmonary-and-portal-circulations',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Say which vessel brings blood to the liver and which takes it away.',
      answerOverride: 'A',
      answerOverrideReason: 'This copy printed no key. Its twin `regarding-the-portal-circulation-which-of-the-following-stat-02876c54` is keyed A, and A is what the department chapter states: venous blood from the stomach, spleen, pancreas and intestine is collected into the portal vein, which enters the liver through the porta hepatis. This is the only copy in which options A and C are printed in full, so it is the only one in which that key can be acted on.',
      explanations: {
        A: 'Correct. The portal vein collects venous blood from the digestive organs and the spleen and delivers it to the liver, where it is metabolised and detoxified before rejoining the general circulation.',
        B: 'The right vein, the wrong direction, and the commonest error in the leaf. The portal vein brings blood in; the hepatic veins take it out to the inferior vena cava.',
        C: 'The two names swapped. The hepatic vein is the exit, not the entrance, and this option differs from the answer by one word.',
        D: 'The inferior vena cava is where portal blood ends up *after* the liver, by way of the hepatic veins. Nothing enters the liver from it.',
      },
    },
    {
      key: 'regarding-the-portal-circulation-which-of-the-following-stat-02876c54',
      conceptKey: 'systemic-pulmonary-and-portal-circulations',
      difficulty: 'Moderate', questionType: 'Structure and function',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'The keyed copy, and unusable because of where the page was cut. Options A and C are both truncated to "The venous blood from the digestive system enters the liver through the", so as extracted they are word for word identical and the discrimination — portal vein against hepatic vein — is off the page. Its twin `regarding-the-portal-circulation-which-of-the-following-stat-1deb4653` prints both in full and is imported carrying this row\'s key.',
    },
    {
      key: 'which-of-the-following-vessels-is-part-of-the-systemic-circu-ed64e379',
      conceptKey: 'systemic-pulmonary-and-portal-circulations',
      difficulty: 'Moderate', questionType: 'Classification',
      learningObjective: 'Not sittable as extracted.',
      explanations: {},
      exclude: true,
      excludeReason: 'Two of the four options are true and no key was printed to say which the examiner wanted. The chapter defines the systemic circulation as the blood leaving the left ventricle through the aorta and its branches, which makes the aorta a member — and the coronary arteries, being the first branches of the aorta, members too. An item with two defensible answers should not be sat, and nothing on the page resolves it. A faculty reviewer could rescue this one by dropping an option.',
    },
  ],
}
