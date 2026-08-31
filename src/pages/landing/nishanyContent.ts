export type LandingLanguage = 'en' | 'ar'

export type FeaturePreviewKind =
  | 'calendar'
  | 'practice'
  | 'osce'
  | 'microscope'
  | 'game'
  | 'mastery'
  | 'ranking'
  | 'reader'
  | 'notes'
  | 'whiteboard'
  | 'timer'
  | 'people'
  | 'room'
  | 'grow'

export interface FeaturePreview {
  id: string
  label: string
  description: string
  kind: FeaturePreviewKind
  eyebrow: string
}

export interface FeatureSuite {
  id: string
  label: string
  intro: string
  items: FeaturePreview[]
}

export interface NishanyLandingCopy {
  lang: LandingLanguage
  nav: { why: string; practice: string; together: string; pricing: string; menu: string; close: string; start: string }
  hero: { title: string; body: string; primary: string; secondary: string; trust: string }
  today: {
    title: string
    university: string
    date: string
    institution: string
    personal: string
    next: string
    module: string
    institutionTime: string
    personalTime: string
    nextTime: string
  }
  provenance: {
    eyebrow: string
    title: string
    body: string
    startTitle: string
    startBody: string
    nowTitle: string
    nowBody: string
  }
  curriculum: {
    eyebrow: string
    title: string
    body: string
    university: string
    year: string
    module: string
    exam: string
    personal: string
    plan: string
    ready: string
  }
  showcase: {
    eyebrow: string
    title: string
    body: string
    play: string
    pause: string
    replay: string
    stages: { label: string; title: string; detail: string }[]
  }
  suites: { eyebrow: string; title: string; body: string; open: string; itemsLabel: string }
  featureSuites: FeatureSuite[]
  close: {
    eyebrow: string
    title: string
    body: string
    scholarshipTitle: string
    scholarshipBody: string
    price: string
    priceNote: string
    pricing: string
    primary: string
  }
  footer: string
}

export const NISHANY_EN: NishanyLandingCopy = {
  lang: 'en',
  nav: {
    why: 'Why Nishany',
    practice: 'Practice Suite',
    together: 'Study together',
    pricing: 'Pricing',
    menu: 'Open menu',
    close: 'Close menu',
    start: 'Start 3 days free',
  },
  hero: {
    title: 'Learn medicine the way you’ll practise it.',
    body: 'Nishany is Connect’s undergraduate platform: built around your Egyptian university curriculum, then taught through the international methods that shape excellent doctors and researchers.',
    primary: 'Start 3 days free',
    secondary: 'See Nishany in action',
    trust: 'Full access for 3 days. No card.',
  },
  today: {
    title: 'Today in Nishany',
    university: 'Kasr Al Ainy · Year 2',
    date: 'Monday · 21 October',
    institution: 'University session',
    personal: 'Your study block',
    next: 'Recommended next',
    module: 'Cardiovascular block · Heart failure',
    institutionTime: '10:00–11:30',
    personalTime: '18:30–19:15',
    nextTime: '12 min',
  },
  provenance: {
    eyebrow: 'Experience brought forward',
    title: 'Built beside doctors. Now built for your first step.',
    body: 'Medical students should not have to relearn how knowledge connects when postgraduate training begins. Nishany brings that perspective into the undergraduate years from day one.',
    startTitle: 'Connect Academy begins',
    startBody: 'Founded in 2011 by Dr. Ahmed Ghait, consultant interventional radiologist, Connect Academy has worked beside postgraduate doctors for more than a decade.',
    nowTitle: 'Nishany opens that experience earlier',
    nowBody: 'Your university scope, serious practice, and an honest picture of what you understand—connected from the start.',
  },
  curriculum: {
    eyebrow: 'Your university is already here',
    title: 'Begin inside your actual year—not another search box.',
    body: 'Choose your university and year once. Nishany brings in the published curriculum, modules, sessions, exams and finals, then makes room for your own study blocks in the same plan.',
    university: 'Kasr Al Ainy',
    year: 'Year 2',
    module: 'Cardiovascular module',
    exam: 'Module final · 12 Nov',
    personal: 'Add personal study block',
    plan: 'Today’s plan',
    ready: 'Scope ready',
  },
  showcase: {
    eyebrow: 'A day in Nishany',
    title: 'Watch one study session become understanding.',
    body: 'The interface moves through the same chain you will: today’s schedule, a clinical problem, the explanation behind it, the concept record, then a room with friends.',
    play: 'Play',
    pause: 'Pause',
    replay: 'Replay',
    stages: [
      { label: 'Plan', title: 'The right session is already waiting', detail: 'Your university schedule and personal plan meet in one focused next step.' },
      { label: 'Case', title: 'Answer in clinical context', detail: 'A short case asks you to connect the finding, mechanism and decision—not recognise a loose fact.' },
      { label: 'Explain', title: 'Read why every option behaves that way', detail: 'The explanation turns an answer into reusable knowledge and links back to its source.' },
      { label: 'Mastery', title: 'The concept record updates', detail: 'Accuracy is one signal. Recall, evidence and repeated performance show what is actually settling.' },
      { label: 'Together', title: 'Carry the question into a shared room', detail: 'Invite a friend, compare reasoning, and keep the session on the same scope.' },
    ],
  },
  suites: {
    eyebrow: 'Explore the platform',
    title: 'One place for the whole way you study.',
    body: 'Open each suite, then choose a feature. Every preview is a small working specimen—not a promise hidden behind a list.',
    open: 'Open suite',
    itemsLabel: 'Choose a feature to preview',
  },
  featureSuites: [
    {
      id: 'curriculum',
      label: 'Your curriculum',
      intro: 'Institutional scope and your own time, arranged together.',
      items: [
        { id: 'published-schedule', label: 'Published schedule', description: 'Sessions arrive in the order your university teaches them.', kind: 'calendar', eyebrow: 'University schedule' },
        { id: 'finals', label: 'Exams & finals', description: 'See the assessment window and practise only inside its scope.', kind: 'calendar', eyebrow: 'Assessment scope' },
        { id: 'personal-blocks', label: 'Personal blocks', description: 'Place your own study time alongside university commitments.', kind: 'calendar', eyebrow: 'Your calendar' },
        { id: 'daily-plan', label: 'Daily plan', description: 'Begin with one useful next action instead of rebuilding a to-do list.', kind: 'mastery', eyebrow: 'Today' },
      ],
    },
    {
      id: 'practice',
      label: 'Practice Suite',
      intro: 'The formats medicine asks of you, connected by concepts.',
      items: [
        { id: 'mcq', label: 'Clinical questions', description: 'Answer, commit, then learn from every option and its evidence.', kind: 'practice', eyebrow: 'Single best answer' },
        { id: 'targeted', label: 'Targeted retests', description: 'Build tests from flagged, missed or still-unsettled concepts.', kind: 'practice', eyebrow: 'Adaptive block' },
        { id: 'osce', label: 'OSCE stations', description: 'Separate candidate and examiner/actor briefs make practice feel real.', kind: 'osce', eyebrow: 'Cardiovascular station' },
        { id: 'cases', label: 'Clinical cases', description: 'Follow a case from presentation through investigation and reasoning.', kind: 'practice', eyebrow: 'Progressive case' },
        { id: 'labs-imaging', label: 'Labs & imaging', description: 'Interpret results and images inside their clinical context.', kind: 'practice', eyebrow: 'Interpretation' },
        { id: 'essays', label: 'Essay practice', description: 'Plan structured answers against a clear marking frame.', kind: 'notes', eyebrow: 'Written answer' },
        { id: 'microscope', label: 'Virtual microscope', description: 'Move through histology and pathology slides at your own bench.', kind: 'microscope', eyebrow: 'Histology lab' },
        { id: 'terminology', label: 'Medical terminology', description: 'Learn the roots that make unfamiliar clinical language readable.', kind: 'notes', eyebrow: 'Word anatomy' },
        { id: 'minigames', label: 'Minigames', description: 'Short, deliberate recall rounds turn spare minutes into useful reps.', kind: 'game', eyebrow: 'Two-minute round' },
      ],
    },
    {
      id: 'understanding',
      label: 'What you actually know',
      intro: 'A model of understanding that goes beyond right and wrong.',
      items: [
        { id: 'concept-mastery', label: 'Concept mastery', description: 'Track what is stable, emerging or due for another check.', kind: 'mastery', eyebrow: 'Concept record' },
        { id: 'adaptive-review', label: 'Adaptive review', description: 'Revisit the right concept because of evidence—not a generic streak.', kind: 'mastery', eyebrow: 'Next review' },
        { id: 'evidence', label: 'Evidence behind reading', description: 'Follow explanations to the book, guideline or source behind them.', kind: 'reader', eyebrow: 'Source trail' },
        { id: 'deep-reports', label: 'Deep reports', description: 'See recall, calibration and concept coverage alongside accuracy.', kind: 'mastery', eyebrow: 'Performance report' },
        { id: 'anonymous-rank', label: 'Anonymous comparison', description: 'Compare accuracy and concepts mastered without exposing identity.', kind: 'ranking', eyebrow: 'Cohort position' },
      ],
    },
    {
      id: 'workspace',
      label: 'Your study workspace',
      intro: 'Your documents, thinking and time remain connected.',
      items: [
        { id: 'uploads', label: 'Your resources', description: 'Upload the sources you already trust and keep them in your scope.', kind: 'reader', eyebrow: 'Resource shelf' },
        { id: 'pdf', label: 'Synced PDF reader', description: 'Highlight, annotate and continue on web, phone or iPad.', kind: 'reader', eyebrow: 'PDF workspace' },
        { id: 'question-notes', label: 'Question notes', description: 'Write the insight at the exact moment the question reveals it.', kind: 'notes', eyebrow: 'Attached note' },
        { id: 'notebook', label: 'Notebook', description: 'Collect durable notes with links back to their source.', kind: 'notes', eyebrow: 'Study notebook' },
        { id: 'whiteboard', label: 'Whiteboard & mind maps', description: 'Draw connections, place images and reorganise your thinking.', kind: 'whiteboard', eyebrow: 'Concept map' },
        { id: 'shared-work', label: 'Shared notes & boards', description: 'Learn from work colleagues have chosen to share with the community.', kind: 'whiteboard', eyebrow: 'Community copy' },
        { id: 'pomodoro', label: 'Study timer', description: 'Keep a focused interval and let it count toward your study record.', kind: 'timer', eyebrow: 'Focus session' },
      ],
    },
    {
      id: 'people',
      label: 'Study with people',
      intro: 'Find the right people and create a shared rhythm.',
      items: [
        { id: 'buddies', label: 'Study buddies', description: 'Connect by username, Facebook or discovery in your university and year.', kind: 'people', eyebrow: 'Discover classmates' },
        { id: 'shared-tests', label: 'Shared tests', description: 'Solve the same scoped set together, wherever each person is.', kind: 'people', eyebrow: 'Live practice' },
        { id: 'study-parties', label: 'Study parties', description: 'Give a group its own schedule, challenge and visible progress.', kind: 'room', eyebrow: 'Study party' },
        { id: 'virtual-room', label: 'Virtual study room', description: 'A calm top-down room shows who is focused, resting or ready to discuss.', kind: 'room', eyebrow: 'Room 04' },
        { id: 'grow', label: 'Grow your maristana', description: 'Study time adds a ward, teaching hall, library and garden to your courtyard.', kind: 'grow', eyebrow: 'Grow' },
      ],
    },
  ],
  close: {
    eyebrow: 'One complete membership',
    title: 'Everything you need to move from syllabus to understanding.',
    body: 'Curriculum, practice, adaptive understanding, your workspace and your people—without the daily search for what belongs together.',
    scholarshipTitle: 'Full access can be 100% covered.',
    scholarshipBody: 'Up to 200 private scholarships per year, per university, are available through your year representative or Student Union. Scholarship status never appears in profiles, rankings or social spaces.',
    price: 'EGP 1,000',
    priceNote: 'one academic term · save EGP 200',
    pricing: 'See pricing',
    primary: 'Start your first 3 days',
  },
  footer: 'Nishany by Connect · Undergraduate medical learning, built in Egypt.',
}

export const NISHANY_AR: NishanyLandingCopy = {
  ...NISHANY_EN,
  lang: 'ar',
  nav: {
    why: 'لماذا نيشاني',
    practice: 'مجموعة التدريب',
    together: 'ذاكروا معًا',
    pricing: 'الأسعار',
    menu: 'افتح القائمة',
    close: 'أغلق القائمة',
    start: 'ابدأ ٣ أيام مجانًا',
  },
  hero: {
    title: 'تعلّم الطب بالطريقة التي ستمارسه بها.',
    body: 'نيشاني هي منصة Connect لطلاب الطب الجامعي: مبنية حول منهج جامعتك المصرية، وتقدّمه بأساليب التعلّم الدولية التي تصنع أطباء وباحثين متميزين.',
    primary: 'ابدأ ٣ أيام مجانًا',
    secondary: 'شاهد نيشاني وهي تعمل',
    trust: 'وصول كامل لمدة ٣ أيام. من دون بطاقة.',
  },
  today: {
    title: 'اليوم في نيشاني', university: 'قصر العيني · السنة الثانية', date: 'الاثنين · ٢١ أكتوبر',
    institution: 'جلسة الجامعة', personal: 'وقت مذاكرتك', next: 'المقترح التالي',
    module: 'وحدة القلب والأوعية · فشل القلب', institutionTime: '١٠:٠٠–١١:٣٠', personalTime: '١٨:٣٠–١٩:١٥', nextTime: '١٢ دقيقة',
  },
  provenance: {
    eyebrow: 'خبرة تصل إليك مبكرًا',
    title: 'بُنيت بجوار الأطباء. والآن تبدأ معك من خطوتك الأولى.',
    body: 'لا ينبغي لطالب الطب أن يعيد تعلّم طريقة ترابط المعرفة حين يبدأ الدراسات العليا. تحمل نيشاني هذه الرؤية إلى سنوات الجامعة منذ اليوم الأول.',
    startTitle: 'بداية Connect Academy',
    startBody: 'أسسها عام ٢٠١١ د. أحمد غيط، استشاري الأشعة التداخلية، وعملت Connect Academy إلى جوار أطباء الدراسات العليا لأكثر من عقد.',
    nowTitle: 'نيشاني تفتح هذه الخبرة مبكرًا',
    nowBody: 'نطاق جامعتك، وتدريب جاد، وصورة صادقة لما تفهمه—مترابطة منذ البداية.',
  },
  curriculum: {
    eyebrow: 'جامعتك موجودة بالفعل', title: 'ابدأ من سنتك الفعلية—لا من مربع بحث جديد.',
    body: 'اختر جامعتك وسنتك مرة واحدة. تستحضر نيشاني المنهج والوحدات والجلسات والامتحانات والنهائيات، ثم تضع خطتك الشخصية بجانبها.',
    university: 'قصر العيني', year: 'السنة الثانية', module: 'وحدة القلب والأوعية', exam: 'نهائي الوحدة · ١٢ نوفمبر', personal: 'أضف وقت مذاكرة', plan: 'خطة اليوم', ready: 'النطاق جاهز',
  },
  showcase: {
    eyebrow: 'يوم داخل نيشاني', title: 'شاهد جلسة مذاكرة تتحول إلى فهم.',
    body: 'تتحرك الواجهة في المسار نفسه الذي ستسلكه: جدول اليوم، ثم مشكلة سريرية، والشرح خلفها، وسجل المفهوم، ثم غرفة مع أصدقائك.',
    play: 'تشغيل', pause: 'إيقاف مؤقت', replay: 'إعادة',
    stages: [
      { label: 'الخطة', title: 'الجلسة المناسبة في انتظارك', detail: 'يلتقي جدول الجامعة بخطتك الشخصية في خطوة تالية واضحة.' },
      { label: 'الحالة', title: 'أجب داخل سياق سريري', detail: 'تربط الحالة بين العلامة والآلية والقرار، بدل التعرف على معلومة منفصلة.' },
      { label: 'الشرح', title: 'اعرف لماذا يتصرف كل اختيار هكذا', detail: 'يحوّل الشرح الإجابة إلى معرفة قابلة للاستخدام ويربطها بمصدرها.' },
      { label: 'الإتقان', title: 'يتحدّث سجل المفهوم', detail: 'الدقة إشارة واحدة؛ الاستدعاء والأدلة والأداء المتكرر تكشف ما يثبت فعلًا.' },
      { label: 'معًا', title: 'خذ السؤال إلى غرفة مشتركة', detail: 'ادعُ صديقًا، وقارنا التفكير، وابقيا داخل النطاق نفسه.' },
    ],
  },
  suites: { eyebrow: 'استكشف المنصة', title: 'مكان واحد لكل طريقتك في المذاكرة.', body: 'افتح كل مجموعة ثم اختر ميزة. كل معاينة نموذج حقيقي صغير—وليست وعدًا مختبئًا خلف قائمة.', open: 'افتح المجموعة', itemsLabel: 'اختر ميزة لمعاينتها' },
  featureSuites: [
    {
      id: 'curriculum', label: 'منهجك', intro: 'نطاق الجامعة ووقتك الشخصي في خطة واحدة.',
      items: [
        { id: 'published-schedule', label: 'الجدول المنشور', description: 'تصل الجلسات بالترتيب الذي تدرّسه جامعتك.', kind: 'calendar', eyebrow: 'جدول الجامعة' },
        { id: 'finals', label: 'الامتحانات والنهائيات', description: 'اعرف نافذة التقييم وتدرّب داخل نطاقها فقط.', kind: 'calendar', eyebrow: 'نطاق الامتحان' },
        { id: 'personal-blocks', label: 'أوقاتك الشخصية', description: 'ضع مذاكرتك بجوار التزامات الجامعة.', kind: 'calendar', eyebrow: 'تقويمك' },
        { id: 'daily-plan', label: 'خطة اليوم', description: 'ابدأ بخطوة مفيدة بدل إعادة بناء قائمة مهام.', kind: 'mastery', eyebrow: 'اليوم' },
      ],
    },
    {
      id: 'practice', label: 'مجموعة التدريب', intro: 'صيغ امتحانات الطب مترابطة بالمفاهيم.',
      items: [
        { id: 'mcq', label: 'أسئلة سريرية', description: 'أجب ثم تعلّم من كل اختيار ومن الدليل خلفه.', kind: 'practice', eyebrow: 'أفضل إجابة واحدة' },
        { id: 'targeted', label: 'اختبارات موجّهة', description: 'ابنِ اختبارًا من المفاهيم المعلّمة أو الخاطئة أو غير المستقرة.', kind: 'practice', eyebrow: 'مجموعة تكيفية' },
        { id: 'osce', label: 'محطات OSCE', description: 'تعليمات منفصلة للطالب والممتحن أو الممثل تجعل التدريب واقعيًا.', kind: 'osce', eyebrow: 'محطة قلب وأوعية' },
        { id: 'cases', label: 'حالات سريرية', description: 'تابع الحالة من العرض إلى الفحوص والتفكير.', kind: 'practice', eyebrow: 'حالة متدرجة' },
        { id: 'labs-imaging', label: 'المعامل والأشعة', description: 'فسّر النتائج والصور داخل سياقها السريري.', kind: 'practice', eyebrow: 'تفسير' },
        { id: 'essays', label: 'تدريب المقالات', description: 'خطط لإجابة منظّمة مقابل إطار تصحيح واضح.', kind: 'notes', eyebrow: 'إجابة كتابية' },
        { id: 'microscope', label: 'الميكروسكوب الافتراضي', description: 'تحرك داخل شرائح الهستولوجي والباثولوجي في معملك الخاص.', kind: 'microscope', eyebrow: 'معمل الهستولوجي' },
        { id: 'terminology', label: 'المصطلحات الطبية', description: 'تعلّم جذور الكلمات لتقرأ المصطلح غير المألوف.', kind: 'notes', eyebrow: 'بناء الكلمة' },
        { id: 'minigames', label: 'ألعاب قصيرة', description: 'جولات استدعاء مقصودة تحول الدقائق إلى مراجعة مفيدة.', kind: 'game', eyebrow: 'جولة دقيقتين' },
      ],
    },
    {
      id: 'understanding', label: 'ما تعرفه فعلًا', intro: 'صورة للفهم تتجاوز الصحيح والخاطئ.',
      items: [
        { id: 'concept-mastery', label: 'إتقان المفاهيم', description: 'اعرف ما ثبت وما ينمو وما يحتاج مراجعة.', kind: 'mastery', eyebrow: 'سجل المفهوم' },
        { id: 'adaptive-review', label: 'المراجعة التكيفية', description: 'ارجع إلى المفهوم المناسب بناءً على الدليل لا على سلسلة عامة.', kind: 'mastery', eyebrow: 'المراجعة التالية' },
        { id: 'evidence', label: 'الدليل خلف القراءة', description: 'اتبع الشرح إلى الكتاب أو الإرشاد أو المصدر.', kind: 'reader', eyebrow: 'مسار المصدر' },
        { id: 'deep-reports', label: 'تقارير عميقة', description: 'شاهد الاستدعاء والمعايرة وتغطية المفاهيم بجوار الدقة.', kind: 'mastery', eyebrow: 'تقرير الأداء' },
        { id: 'anonymous-rank', label: 'مقارنة مجهولة', description: 'قارن الدقة والمفاهيم المتقنة دون كشف الهوية.', kind: 'ranking', eyebrow: 'موضعك بين الدفعة' },
      ],
    },
    {
      id: 'workspace', label: 'مساحة مذاكرتك', intro: 'ملفاتك وأفكارك ووقتك تظل مترابطة.',
      items: [
        { id: 'uploads', label: 'مصادرك', description: 'ارفع المصادر التي تثق بها واحتفظ بها في نطاقك.', kind: 'reader', eyebrow: 'رف المصادر' },
        { id: 'pdf', label: 'قارئ PDF متزامن', description: 'ظلّل واكتب وأكمل على الويب أو الهاتف أو iPad.', kind: 'reader', eyebrow: 'مساحة PDF' },
        { id: 'question-notes', label: 'ملاحظات السؤال', description: 'اكتب الفكرة لحظة أن يكشفها السؤال.', kind: 'notes', eyebrow: 'ملاحظة مرتبطة' },
        { id: 'notebook', label: 'دفتر الملاحظات', description: 'اجمع ملاحظات دائمة وروابط إلى مصادرها.', kind: 'notes', eyebrow: 'دفتر المذاكرة' },
        { id: 'whiteboard', label: 'سبورة وخرائط ذهنية', description: 'ارسم الروابط وضع الصور وأعد تنظيم أفكارك.', kind: 'whiteboard', eyebrow: 'خريطة مفاهيم' },
        { id: 'shared-work', label: 'ملاحظات وسبورات مشتركة', description: 'تعلّم من عمل اختار زملاؤك مشاركته مع المجتمع.', kind: 'whiteboard', eyebrow: 'نسخة مجتمعية' },
        { id: 'pomodoro', label: 'مؤقت المذاكرة', description: 'حافظ على جلسة تركيز ودعها تُحتسب في سجل مذاكرتك.', kind: 'timer', eyebrow: 'جلسة تركيز' },
      ],
    },
    {
      id: 'people', label: 'ذاكر مع الآخرين', intro: 'اعثر على الأشخاص المناسبين واصنعوا إيقاعًا مشتركًا.',
      items: [
        { id: 'buddies', label: 'زملاء المذاكرة', description: 'اتصل باسم المستخدم أو Facebook أو اكتشف زملاء جامعتك وسنتك.', kind: 'people', eyebrow: 'اكتشف زملاءك' },
        { id: 'shared-tests', label: 'اختبارات مشتركة', description: 'حلّوا النطاق نفسه معًا مهما اختلف المكان.', kind: 'people', eyebrow: 'تدريب مباشر' },
        { id: 'study-parties', label: 'مجموعات المذاكرة', description: 'امنح المجموعة جدولًا وتحديًا وتقدمًا واضحًا.', kind: 'room', eyebrow: 'مجموعة مذاكرة' },
        { id: 'virtual-room', label: 'غرفة مذاكرة افتراضية', description: 'توضح الغرفة الهادئة من يركز أو يستريح أو يستعد للنقاش.', kind: 'room', eyebrow: 'الغرفة ٠٤' },
        { id: 'grow', label: 'نمِّ المارستان', description: 'يضيف وقت المذاكرة جناحًا وقاعة تعليم ومكتبة وحديقة إلى فناءك.', kind: 'grow', eyebrow: 'نمِّ' },
      ],
    },
  ],
  close: {
    eyebrow: 'عضوية واحدة كاملة', title: 'كل ما تحتاجه للانتقال من المنهج إلى الفهم.',
    body: 'المنهج والتدريب والفهم التكيفي ومساحتك وزملاؤك—من دون البحث اليومي عما ينتمي إلى بعضه.',
    scholarshipTitle: 'يمكن تغطية الوصول الكامل بنسبة ١٠٠٪.',
    scholarshipBody: 'تتوفر حتى ٢٠٠ منحة خاصة سنويًا لكل جامعة عبر ممثل دفعتك أو اتحاد الطلاب. لا تظهر حالة المنحة في الملف أو الترتيب أو المساحات الاجتماعية.',
    price: '١٬٠٠٠ ج.م', priceNote: 'فصل دراسي واحد · وفّر ٢٠٠ ج.م', pricing: 'شاهد الأسعار', primary: 'ابدأ أول ٣ أيام',
  },
  footer: 'نيشاني من Connect · تعلّم طبي جامعي، مبني في مصر.',
}

export function nishanyCopy(lang: LandingLanguage): NishanyLandingCopy {
  return lang === 'ar' ? NISHANY_AR : NISHANY_EN
}
