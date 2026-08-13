/**
 * The bilingual medical glossary — English ⇄ Arabic.
 *
 * Real reference content, not demo data: these are the terms and word-parts a
 * first-year student meets first. What changed is that it is no longer a source
 * literal only a redeploy could correct. The list below is a *starter set* an
 * admin loads once; after that the glossary lives in a shared document that
 * Glossary Setup edits and every student reads.
 */

export interface MedicalTerm {
  id: string
  term: string
  /** Arabic translation of the term. */
  ar: string
  category: MedTermCategory
  /** Plain English explanation. */
  def: string
  /** Plain Arabic explanation. */
  defAr: string
  /** Optional example usage. */
  example?: string
}

export type MedTermCategory =
  | 'Directional & anatomy'
  | 'Word parts'
  | 'Signs & symptoms'
  | 'Examination'
  | 'Investigations'
  | 'Common conditions'
  | 'Pharmacology'

export const MED_CATEGORIES: { key: MedTermCategory; ar: string }[] = [
  { key: 'Directional & anatomy', ar: 'الاتجاهات والتشريح' },
  { key: 'Word parts', ar: 'مكوّنات الكلمة' },
  { key: 'Signs & symptoms', ar: 'العلامات والأعراض' },
  { key: 'Examination', ar: 'الفحص السريري' },
  { key: 'Investigations', ar: 'الفحوصات' },
  { key: 'Common conditions', ar: 'حالات شائعة' },
  { key: 'Pharmacology', ar: 'علم الأدوية' },
]

export const GLOSSARY_SEED: MedicalTerm[] = [
  // ---- Directional & anatomy ----
  { id: 'anterior', term: 'Anterior', ar: 'أمامي', category: 'Directional & anatomy', def: 'Toward the front of the body.', defAr: 'باتجاه مقدمة الجسم.', example: 'The sternum is anterior to the heart.' },
  { id: 'posterior', term: 'Posterior', ar: 'خلفي', category: 'Directional & anatomy', def: 'Toward the back of the body.', defAr: 'باتجاه مؤخرة الجسم.' },
  { id: 'superior', term: 'Superior', ar: 'علوي', category: 'Directional & anatomy', def: 'Above, toward the head.', defAr: 'أعلى، باتجاه الرأس.' },
  { id: 'inferior', term: 'Inferior', ar: 'سفلي', category: 'Directional & anatomy', def: 'Below, toward the feet.', defAr: 'أسفل، باتجاه القدمين.' },
  { id: 'medial', term: 'Medial', ar: 'إنسي', category: 'Directional & anatomy', def: 'Closer to the midline of the body.', defAr: 'أقرب إلى خط منتصف الجسم.' },
  { id: 'lateral', term: 'Lateral', ar: 'وحشي', category: 'Directional & anatomy', def: 'Farther from the midline, toward the side.', defAr: 'أبعد عن خط المنتصف، باتجاه الجانب.' },
  { id: 'proximal', term: 'Proximal', ar: 'قريب', category: 'Directional & anatomy', def: 'Closer to the point of attachment or trunk.', defAr: 'أقرب إلى نقطة الاتصال أو الجذع.' },
  { id: 'distal', term: 'Distal', ar: 'بعيد', category: 'Directional & anatomy', def: 'Farther from the point of attachment.', defAr: 'أبعد عن نقطة الاتصال.' },
  { id: 'superficial', term: 'Superficial', ar: 'سطحي', category: 'Directional & anatomy', def: 'Near the surface of the body.', defAr: 'قريب من سطح الجسم.' },
  { id: 'deep', term: 'Deep', ar: 'عميق', category: 'Directional & anatomy', def: 'Farther from the surface.', defAr: 'أبعد عن السطح.' },
  { id: 'bilateral', term: 'Bilateral', ar: 'ثنائي الجانب', category: 'Directional & anatomy', def: 'Affecting both sides.', defAr: 'يصيب الجانبين معًا.' },
  { id: 'supine', term: 'Supine', ar: 'مستلقٍ على الظهر', category: 'Directional & anatomy', def: 'Lying face up.', defAr: 'الاستلقاء على الظهر مع اتجاه الوجه لأعلى.' },
  { id: 'prone', term: 'Prone', ar: 'منبطح', category: 'Directional & anatomy', def: 'Lying face down.', defAr: 'الاستلقاء على البطن مع اتجاه الوجه لأسفل.' },

  // ---- Word parts (prefixes / suffixes) ----
  { id: 's-itis', term: '-itis', ar: 'لاحقة: التهاب', category: 'Word parts', def: 'Inflammation of a part.', defAr: 'لاحقة تعني التهاب العضو.', example: 'Hepatitis = inflammation of the liver.' },
  { id: 's-ectomy', term: '-ectomy', ar: 'لاحقة: استئصال', category: 'Word parts', def: 'Surgical removal of a part.', defAr: 'لاحقة تعني الاستئصال الجراحي.', example: 'Appendectomy = removal of the appendix.' },
  { id: 's-otomy', term: '-otomy', ar: 'لاحقة: بضع/شق', category: 'Word parts', def: 'Cutting into, an incision.', defAr: 'لاحقة تعني إحداث شق أو فتح.' },
  { id: 's-ostomy', term: '-ostomy', ar: 'لاحقة: فغر', category: 'Word parts', def: 'Creating a permanent opening.', defAr: 'لاحقة تعني إنشاء فتحة دائمة.' },
  { id: 's-pathy', term: '-pathy', ar: 'لاحقة: اعتلال', category: 'Word parts', def: 'Disease of a part.', defAr: 'لاحقة تعني مرض العضو.', example: 'Neuropathy = disease of the nerves.' },
  { id: 's-emia', term: '-aemia / -emia', ar: 'لاحقة: في الدم', category: 'Word parts', def: 'A condition of the blood.', defAr: 'لاحقة تشير إلى حالة تخص الدم.', example: 'Anaemia = low blood (haemoglobin).' },
  { id: 's-uria', term: '-uria', ar: 'لاحقة: في البول', category: 'Word parts', def: 'A condition of the urine.', defAr: 'لاحقة تشير إلى حالة تخص البول.' },
  { id: 'p-hyper', term: 'Hyper-', ar: 'بادئة: فرط/زيادة', category: 'Word parts', def: 'Excessive, above normal.', defAr: 'بادئة تعني الزيادة أو التجاوز عن الطبيعي.', example: 'Hypertension = high blood pressure.' },
  { id: 'p-hypo', term: 'Hypo-', ar: 'بادئة: نقص/قلة', category: 'Word parts', def: 'Deficient, below normal.', defAr: 'بادئة تعني النقص أو أقل من الطبيعي.' },
  { id: 'p-tachy', term: 'Tachy-', ar: 'بادئة: تسرّع', category: 'Word parts', def: 'Fast, rapid.', defAr: 'بادئة تعني السرعة أو التسارع.', example: 'Tachycardia = fast heart rate.' },
  { id: 'p-brady', term: 'Brady-', ar: 'بادئة: تبطّؤ', category: 'Word parts', def: 'Slow.', defAr: 'بادئة تعني البطء.' },
  { id: 'p-dys', term: 'Dys-', ar: 'بادئة: صعوبة/اضطراب', category: 'Word parts', def: 'Difficult, painful, or abnormal.', defAr: 'بادئة تعني الصعوبة أو الاضطراب.', example: 'Dyspnoea = difficult breathing.' },

  // ---- Signs & symptoms ----
  { id: 'dyspnoea', term: 'Dyspnoea', ar: 'ضيق النفس', category: 'Signs & symptoms', def: 'Difficulty or discomfort in breathing.', defAr: 'صعوبة أو انزعاج في التنفس.' },
  { id: 'oedema', term: 'Oedema', ar: 'وذمة (تورّم)', category: 'Signs & symptoms', def: 'Swelling from fluid in the tissues.', defAr: 'تورّم بسبب تجمّع السوائل في الأنسجة.' },
  { id: 'syncope', term: 'Syncope', ar: 'إغماء', category: 'Signs & symptoms', def: 'Temporary loss of consciousness (fainting).', defAr: 'فقدان الوعي المؤقت (الإغماء).' },
  { id: 'cyanosis', term: 'Cyanosis', ar: 'ازرقاق', category: 'Signs & symptoms', def: 'Bluish skin from low oxygen.', defAr: 'ازرقاق الجلد بسبب نقص الأكسجين.' },
  { id: 'pallor', term: 'Pallor', ar: 'شحوب', category: 'Signs & symptoms', def: 'Paleness of the skin.', defAr: 'شحوب لون الجلد.' },
  { id: 'pyrexia', term: 'Pyrexia', ar: 'حُمّى', category: 'Signs & symptoms', def: 'Fever, raised body temperature.', defAr: 'ارتفاع درجة حرارة الجسم (الحمّى).' },
  { id: 'malaise', term: 'Malaise', ar: 'توعّك', category: 'Signs & symptoms', def: 'A general feeling of being unwell.', defAr: 'شعور عام بالإعياء أو عدم الارتياح.' },
  { id: 'lethargy', term: 'Lethargy', ar: 'خمول', category: 'Signs & symptoms', def: 'Tiredness and lack of energy.', defAr: 'تعب وقلة نشاط.' },
  { id: 'nausea', term: 'Nausea', ar: 'غثيان', category: 'Signs & symptoms', def: 'The feeling of wanting to vomit.', defAr: 'الشعور بالرغبة في التقيؤ.' },

  // ---- Examination ----
  { id: 'auscultation', term: 'Auscultation', ar: 'الإصغاء (التسمّع)', category: 'Examination', def: 'Listening to body sounds, usually with a stethoscope.', defAr: 'الاستماع إلى أصوات الجسم، عادةً بالسماعة الطبية.' },
  { id: 'palpation', term: 'Palpation', ar: 'الجس', category: 'Examination', def: 'Examining by feeling with the hands.', defAr: 'الفحص باللمس باستخدام اليدين.' },
  { id: 'percussion', term: 'Percussion', ar: 'القرع', category: 'Examination', def: 'Tapping the body to judge underlying structures by sound.', defAr: 'النقر على الجسم لتقييم ما تحته من خلال الصوت.' },
  { id: 'inspection', term: 'Inspection', ar: 'المعاينة (النظر)', category: 'Examination', def: 'Looking carefully as part of examination.', defAr: 'النظر بعناية كجزء من الفحص.' },

  // ---- Investigations ----
  { id: 'biopsy', term: 'Biopsy', ar: 'خزعة', category: 'Investigations', def: 'Taking a small tissue sample to examine.', defAr: 'أخذ عينة نسيجية صغيرة لفحصها.' },
  { id: 'endoscopy', term: 'Endoscopy', ar: 'تنظير', category: 'Investigations', def: 'Looking inside the body with a camera on a tube.', defAr: 'النظر داخل الجسم بكاميرا مثبّتة على أنبوب.' },
  { id: 'ecg', term: 'ECG', ar: 'تخطيط القلب الكهربائي', category: 'Investigations', def: 'A recording of the heart\'s electrical activity.', defAr: 'تسجيل للنشاط الكهربائي للقلب.' },
  { id: 'abg', term: 'ABG', ar: 'غازات الدم الشرياني', category: 'Investigations', def: 'A blood test of oxygen, CO₂, and acid–base status.', defAr: 'تحليل دم لقياس الأكسجين وثاني أكسيد الكربون والتوازن الحمضي القاعدي.' },

  // ---- Common conditions ----
  { id: 'hypertension', term: 'Hypertension', ar: 'ارتفاع ضغط الدم', category: 'Common conditions', def: 'Persistently high blood pressure.', defAr: 'ارتفاع مستمر في ضغط الدم.' },
  { id: 'ischaemia', term: 'Ischaemia', ar: 'إقفار (نقص التروية)', category: 'Common conditions', def: 'Reduced blood supply to a tissue.', defAr: 'نقص وصول الدم إلى نسيج معيّن.' },
  { id: 'infarction', term: 'Infarction', ar: 'احتشاء', category: 'Common conditions', def: 'Tissue death from loss of blood supply.', defAr: 'موت النسيج نتيجة انقطاع التروية الدموية.' },
  { id: 'thrombosis', term: 'Thrombosis', ar: 'تخثّر (جلطة)', category: 'Common conditions', def: 'A blood clot forming inside a vessel.', defAr: 'تكوّن جلطة دموية داخل الوعاء.' },
  { id: 'embolism', term: 'Embolism', ar: 'انصمام', category: 'Common conditions', def: 'A clot or material that travels and blocks a vessel.', defAr: 'جلطة أو مادة تنتقل وتسدّ وعاءً دمويًا.' },
  { id: 'sepsis', term: 'Sepsis', ar: 'إنتان', category: 'Common conditions', def: 'A dangerous whole-body response to infection.', defAr: 'استجابة خطيرة للجسم كله تجاه العدوى.' },
  { id: 'oedema-c', term: 'Hypoxia', ar: 'نقص الأكسجة', category: 'Common conditions', def: 'Low oxygen levels in the tissues.', defAr: 'انخفاض مستوى الأكسجين في الأنسجة.' },

  // ---- Pharmacology ----
  { id: 'analgesic', term: 'Analgesic', ar: 'مسكّن للألم', category: 'Pharmacology', def: 'A medicine that relieves pain.', defAr: 'دواء يخفّف الألم.' },
  { id: 'antipyretic', term: 'Antipyretic', ar: 'خافض للحرارة', category: 'Pharmacology', def: 'A medicine that reduces fever.', defAr: 'دواء يخفّض الحمّى.' },
  { id: 'prophylaxis', term: 'Prophylaxis', ar: 'وقاية', category: 'Pharmacology', def: 'Treatment given to prevent disease.', defAr: 'علاج يُعطى للوقاية من المرض.' },
  { id: 'contraindication', term: 'Contraindication', ar: 'مضاد استطباب (مانع)', category: 'Pharmacology', def: 'A reason a treatment should not be used.', defAr: 'سبب يمنع استخدام علاج معيّن.' },
  { id: 'indication', term: 'Indication', ar: 'استطباب (دواعي الاستعمال)', category: 'Pharmacology', def: 'A valid reason to use a treatment.', defAr: 'سبب مناسب لاستخدام علاج معيّن.' },
]

/** The whole glossary as one stored document. */
export interface GlossaryDoc {
  version: 1
  categories: { key: MedTermCategory; ar: string }[]
  terms: MedicalTerm[]
}

export const GLOSSARY_STORAGE_KEY = 'synapse-medical-glossary-v1'

export const EMPTY_GLOSSARY: GlossaryDoc = { version: 1, categories: [], terms: [] }

/** The starter document an admin can load, once, from Glossary Setup. */
export function starterGlossary(): GlossaryDoc {
  return { version: 1, categories: MED_CATEGORIES.map((category) => ({ ...category })), terms: GLOSSARY_SEED.map((term) => ({ ...term })) }
}
