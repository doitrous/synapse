/**
 * Arabic for Build Maristanas (WP15b).
 *
 * The page, the 3D/blueprint model, the achievement rail, the progress notice
 * and the onboarding dialog. The construction vocabulary is kept architectural
 * and concrete in Arabic too — the roadmap names the part being built, not an
 * abstract level.
 *
 * `Maristana` itself stays in Latin script inside Arabic sentences, as the rest
 * of the dictionaries already treat the account/legal name.
 */
export const AR_MARISTANAS: Record<string, string> = {

  /* ---- Page frame ------------------------------------------------------ */
  'Knowledge becomes a place of healing.': 'المعرفة تصير مكانًا للشفاء.',
  'Focused study and scored performance place every part. Build carefully; every hospital is a record of work you actually completed.':
    'المذاكرة المركّزة والأداء المُصحَّح هما ما يضع كل جزء. ابنِ بعناية؛ فكل مستشفى سجلّ لعمل أنجزته فعلًا.',
  'How it works': 'كيف يعمل',
  'hospitals completed': 'مستشفى مكتملًا',
  'Loading Build Maristanas': 'جارٍ تحميل «ابنِ المارستانات»',
  'Construction ledger unavailable': 'سجلّ البناء غير متاح',
  'Your progress could not be loaded. No construction credit has been changed.':
    'تعذّر تحميل تقدّمك. ولم يُغيَّر أيّ رصيد بناء.',
  'Build Maristanas is resting': '«ابنِ المارستانات» في راحة',
  'Your administrators have temporarily paused the construction experience. Your learning evidence is still safe.':
    'أوقف مسؤولوك تجربة البناء مؤقتًا. وأدلة تعلّمك ما زالت محفوظة.',
  'Hospital': 'مستشفى',
  'Hospital name': 'اسم المستشفى',
  'Ready to serve': 'جاهز للخدمة',
  'Construction in progress': 'البناء جارٍ',
  'Complete': 'مكتمل',
  '{n} of 25': '{n} من ٢٥',

  /* ---- The build ledger ------------------------------------------------ */
  'Current build': 'البناء الحالي',
  'Hospital complete': 'اكتمل المستشفى',
  'Step {n} of {total}': 'الخطوة {n} من {total}',
  'Step {n}': 'الخطوة {n}',
  'Step {n} complete': 'اكتملت الخطوة {n}',
  '{done} of {total} construction steps complete': 'اكتمل {done} من {total} خطوة بناء',
  'Foundation': 'الأساس',
  'Courtyard': 'الصحن',
  'To place the next part': 'لوضع الجزء التالي',
  'credits': 'رصيد',
  'credits left': 'رصيد متبقٍّ',
  'Each part requires {n} construction credits.': 'يتطلّب كل جزء {n} من رصيد البناء.',
  'active study': 'مذاكرة نشطة',

  /* ---- The construction ledger panel ----------------------------------- */
  'Construction ledger': 'سجلّ البناء',
  'Focused study': 'المذاكرة المركّزة',
  'Questions answered': 'الأسئلة المُجاب عنها',
  'Correct-answer credit': 'رصيد الإجابات الصحيحة',
  '{n}% accuracy': 'دقة {n}%',
  'Assessment scores': 'درجات التقييمات',
  'No assessment session yet': 'لا توجد جلسة تقييم بعد',
  '{sessions} sessions · {score}% avg': '{sessions} جلسة · متوسط {score}%',

  /* ---- The collection --------------------------------------------------- */
  'Your collection': 'مجموعتك',
  'The healing quarter': 'حيّ الشفاء',
  'Select a hospital to inspect or rename it.': 'اختر مستشفى لتفحّصه أو إعادة تسميته.',
  'Built · 25/25': 'مبنيّ · ٢٥/٢٥',
  '{n}/25 parts placed': 'وُضع {n}/٢٥ جزءًا',
  'Recent construction credit': 'رصيد البناء الأخير',
  'Every credit has a source': 'لكل رصيد مصدر',
  'The site is ready': 'الموقع جاهز',
  'Open a study surface or answer scored questions to place the first part.':
    'افتح صفحة مذاكرة أو أجب عن أسئلة مُصحَّحة لوضع الجزء الأول.',
  'Build the next part': 'ابنِ الجزء التالي',
  'Study pages count while you are actively using them. Scored questions add credit for the attempt and a larger credit when correct; assessment-length sessions also add their final score.':
    'تُحتسب صفحات المذاكرة ما دمت تستعملها فعليًّا. والأسئلة المُصحَّحة تضيف رصيدًا للمحاولة ورصيدًا أكبر عند الإجابة الصحيحة؛ كما تضيف الجلسات بطول تقييم درجتها النهائية.',

  /* ---- The model and its build roadmap --------------------------------- */
  'Schematic hospital at construction stage {n} of 25': 'مستشفى تخطيطي في مرحلة البناء {n} من ٢٥',
  'SITE 01 · READY': 'الموقع ٠١ · جاهز',
  'Maristana construction roadmap': 'خارطة بناء المارستان',
  'Build roadmap': 'خارطة البناء',
  'placed': 'مُوضَعة',
  'Stage': 'المرحلة',
  '{name}, construction stage {n} of 25': '{name}، مرحلة البناء {n} من ٢٥',
  'Blueprint preview · 3D asset pending': 'معاينة تخطيطية · النموذج ثلاثي الأبعاد قيد الإعداد',

  // The 25 visible construction steps (`MARISTANA_BUILD_STEPS`).
  'Perimeter set': 'ضبط المحيط',
  'Foundation bed': 'مهاد الأساس',
  'Courtyard traced': 'تخطيط الصحن',
  'Main axis laid': 'مدّ المحور الرئيسي',
  'Entry steps formed': 'تشكيل درجات المدخل',
  'West wing begun': 'بدء الجناح الغربي',
  'West arcade raised': 'رفع رواق الغرب',
  'Front wall enclosed': 'إغلاق الجدار الأمامي',
  'East wing framed': 'تأطير الجناح الشرقي',
  'Twin arcades joined': 'وصل الرواقين',
  'Courtyard wings opened': 'فتح أجنحة الصحن',
  'Central hall planned': 'تخطيط القاعة الوسطى',
  'Healing hall raised': 'رفع قاعة الشفاء',
  'Main portal framed': 'تأطير البوّابة الرئيسية',
  'Grand portal finished': 'إتمام البوّابة الكبرى',
  'Rooflines secured': 'تثبيت خطوط السقف',
  'Entrance masonry set': 'ضبط حجارة المدخل',
  'Dome ribs assembled': 'تركيب أضلاع القبّة',
  'Dome crowned': 'تتويج القبّة',
  'Main doors fitted': 'تركيب الأبواب الرئيسية',
  'Fountain opened': 'افتتاح النافورة',
  'Gardens planted': 'غرس الحدائق',
  'Cypress court completed': 'إتمام صحن السرو',
  'Tilework finished': 'إتمام القيشاني',
  'Maristana complete': 'اكتمل المارستان',

  /* ---- Achievements ----------------------------------------------------- */
  'Visible progress': 'تقدّم مرئي',
  'Construction achievements': 'إنجازات البناء',
  'earned': 'مُحرَز',
  'unlocks at stage {n}': 'يُفتح عند المرحلة {n}',
  'Achievement earned': 'أُحرِز إنجاز',
  'Site prepared': 'تهيئة الموقع',
  'The perimeter and first foundation are in place.': 'المحيط والأساس الأول في موضعهما.',
  'Courtyard planned': 'تخطيط الصحن',
  'The central court and its paths have been set out.': 'خُطّط الصحن الأوسط ومماشيه.',
  'Arcades raised': 'رفع الأروقة',
  'The first clinical wings now enclose the court.': 'صارت الأجنحة الإكلينيكية الأولى تحيط بالصحن.',
  'Healing hall opened': 'افتتاح قاعة الشفاء',
  'The central hall joins both sides of the Maristana.': 'تصل القاعة الوسطى بين جانبَي المارستان.',
  'The hospital has received its defining crown.': 'نال المستشفى تاجه المميّز.',
  'The hospital and its gardens are ready to serve.': 'المستشفى وحدائقه جاهزان للخدمة.',

  /* ---- The progress notice ---------------------------------------------- */
  'Maristana progress': 'تقدّم المارستان',
  'A Maristana is complete': 'اكتمل مارستان',
  'new part placed': 'جزء جديد وُضع',
  'new parts placed': 'أجزاء جديدة وُضعت',
  'Your Maristana is taking shape': 'مارستانك يتشكّل',
  '{n}% toward the next construction part': '{n}% نحو جزء البناء التالي',
  'Next part': 'الجزء التالي',

  /* ---- Onboarding -------------------------------------------------------- */
  'Construction study': 'دراسة البناء',
  'One hospital · 25 visible stages': 'مستشفى واحد · ٢٥ مرحلة مرئية',
  'Replay build animation': 'أعد تشغيل حركة البناء',
  'Building from your learning': 'يُبنى من تعلّمك',
  'Preparing the construction study': 'جارٍ تحضير دراسة البناء',
  'An illustration shows a Maristana being built from stage {n} to stage 25.':
    'يعرض رسم توضيحي مارستانًا يُبنى من المرحلة {n} إلى المرحلة ٢٥.',
  'Study actively': 'ذاكر بنشاط',
  'Focused minutes count while you are using study pages. Time in an idle tab does not.':
    'تُحتسب الدقائق المركّزة ما دمت تستعمل صفحات المذاكرة. أما الوقت في تبويب خامل فلا يُحتسب.',
  'Answer scored questions': 'أجب عن أسئلة مُصحَّحة',
  'Each marked attempt adds construction credit, with a larger contribution for a correct answer.':
    'كل محاولة مصحّحة تضيف رصيد بناء، وتكون المساهمة أكبر عند الإجابة الصحيحة.',
  'Complete assessments': 'أكمل التقييمات',
  'Assessment-length sessions add credit from the final score, so careful performance matters.':
    'الجلسات بطول تقييم تضيف رصيدًا من الدرجة النهائية، فالأداء المتأنّي له وزن.',
  'Then it builds itself': 'ثم يبني نفسه',
  'Credit places the next part automatically. A finished Maristana contains 25 parts, and your school can tune the balance without changing what counts as real learning.':
    'يضع الرصيد الجزء التالي تلقائيًّا. ويحتوي المارستان المكتمل على ٢٥ جزءًا، ويمكن لكليتك ضبط التوازن دون تغيير ما يُعدّ تعلّمًا حقيقيًّا.',
  'Welcome to Build Maristanas': 'مرحبًا بك في «ابنِ المارستانات»',
  'Build a place of healing.': 'ابنِ مكانًا للشفاء.',
  'Your focused study becomes a Maristana—a hospital built one part at a time. Every finished building is a record of work you actually completed.':
    'تصير مذاكرتك المركّزة مارستانًا — مستشفى يُبنى جزءًا في كل مرة. وكل مبنى مكتمل سجلّ لعمل أنجزته فعلًا.',
  'visible stages': 'مرحلة مرئية',
  'learning signals': 'إشارات تعلّم',
  'Auto': 'تلقائي',
  'construction': 'بناء',
  'Learning is the building material.': 'التعلّم هو مادة البناء.',
  'There is nothing extra to log and no arbitrary daily claim. The construction ledger reads the study work you already do.':
    'لا شيء إضافي تسجّله ولا مطالبة يومية اعتباطية. فسجلّ البناء يقرأ عمل المذاكرة الذي تؤدّيه أصلًا.',
  'Start building': 'ابدأ البناء',
  'Progress is based on active study and server-scored performance.':
    'يقوم التقدّم على المذاكرة النشطة والأداء المُصحَّح على الخادم.',
  'How Build Maristanas works': 'كيف يعمل «ابنِ المارستانات»',
  'How construction works': 'كيف يجري البناء',
  'Your existing study activity moves the build forward automatically.':
    'يدفع نشاط مذاكرتك القائم البناءَ إلى الأمام تلقائيًّا.',
  'Close how it works': 'إغلاق شرح طريقة العمل',
  'I understand': 'فهمت',
}
