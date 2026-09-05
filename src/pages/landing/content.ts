
/**
 * Bilingual copy for the marketing landing page.
 *
 * English is what `/` serves — most of the people who land here arrive from an
 * English link, and a page that redirects on `navigator.language` breaks shared
 * links and crawler parity. `/ar` and `/en` are both explicit, and the Arabic
 * page is offered rather than forced. Both render through the same LandingShell
 * so the two never drift.
 */

export interface Feature {
  /** Icon key resolved in LandingShell so copy stays free of imports. */
  icon:
    | 'library' | 'qbank' | 'practical' | 'calendar' | 'performance' | 'resources'
    | 'whiteboard' | 'together' | 'notebook' | 'taxonomy' | 'reader' | 'sources'
  label: string
  line: string
}

/** A rendered product screen, named so the shell can pick the right one. */
export type SpecimenKey =
  | 'today' | 'library' | 'question' | 'reader' | 'practical' | 'performance'

export interface WalkthroughStep {
  specimen: SpecimenKey
  eyebrow: string
  title: string
  line: string
}

export interface LandingContent {
  lang: 'ar' | 'en'
  dir: 'rtl' | 'ltr'
  documentTitle: string
  otherHref: string
  otherLabel: string
  /** The strip offering the other language, shown once and dismissible. */
  otherOffer: { line: string; accept: string; dismiss: string }
  signIn: string
  nav: { start: string }
  hero: {
    h1: string
    sub: string
    primary: string
    secondary: string
    trust: string
  }
  /** A reference-values strip; `unit` is the small clinical qualifier. */
  stats: { value: string; label: string }[]
  featuresTitle: string
  featuresSub: string
  features: Feature[]
  walkthrough: {
    title: string
    sub: string
    steps: WalkthroughStep[]
  }
  how: {
    title: string
    sub: string
    steps: { k: string; title: string; line: string }[]
  }
  bilingual: {
    title: string
    sub: string
    points: string[]
  }
  plans: {
    title: string
    sub: string
    refund: string
    perMonth: string
    save: string
    currency: string
    free: string
    moreTitle: string
    compareTitle: string
    /** Stamped on a plan or a period that is announced but not yet purchasable. */
    comingSoon: string
  }
  cta: { title: string; sub: string; button: string; secondary: string }
  specimen: {
    title: string
    date: string
    session: string
    lecture: string
    readiness: string
    attention: string
    acs: string
    overdue: string
    diuretics: string
    dueToday: string
    /** Copy for the other rendered screens in the walkthrough. */
    libraryTitle: string
    librarySource: string
    libraryFact: string
    librarySources: string
    questionStem: string
    questionChoice: string
    questionWrong: string
    questionWhy: string
    readerTitle: string
    readerNote: string
    readerTape: string
    practicalTitle: string
    practicalCandidate: string
    practicalExaminer: string
    practicalMark: string
    performanceTitle: string
    performanceSubjects: { name: string; value: number }[]
  }
  footer: string
}

export const AR_CONTENT: LandingContent = {
  lang: 'ar',
  dir: 'rtl',
  documentTitle: 'نيشاني · مذاكرة الطب، في مكان واحد',
  otherHref: '/en',
  otherLabel: 'English',
  otherOffer: {
    line: 'This page is also available in English.',
    accept: 'Read in English',
    dismiss: 'Dismiss',
  },
  signIn: 'تسجيل الدخول',
  nav: { start: 'ابدأ المذاكرة' },
  hero: {
    h1: 'اعرف بالضبط ما تذاكره تاليًا',
    sub: 'يجمع نيشاني مكتبتك وبنك الأسئلة والتدريب العملي وجدولك في مساحة سريرية واحدة هادئة — ثم يخبرك بما يستحق انتباهك اليوم. بالعربية أولًا، وبالإنجليزية كاملة.',
    primary: 'ابدأ المذاكرة',
    secondary: 'تسجيل الدخول',
    trust: 'مبني على التكرار المتباعد ومنهج أجهزة الجسم.',
  },
  stats: [
    { value: '٨', label: 'أنظمة أعضاء' },
    { value: '+٣٬٢٠٠', label: 'سؤال مشروح' },
    { value: '٪١٠٠', label: 'إجابات مربوطة بالمكتبة' },
    { value: 'AR · EN', label: 'واجهة ثنائية اللغة' },
  ],
  featuresTitle: 'كل شيء في مكان واحد',
  featuresSub: 'مساحات مترابطة تعمل معًا — لا أدوات متفرقة.',
  features: [
    { icon: 'library', label: 'المكتبة', line: 'كل موضوع وموضوع فرعي، بأقسام واضحة' },
    { icon: 'sources', label: 'مصادر موثّقة', line: 'كل حقيقة تحمل مرجعها وصفحته' },
    { icon: 'qbank', label: 'بنك الأسئلة', line: 'إجابات مشروحة، ومراجعة بعد التسليم' },
    { icon: 'practical', label: 'العملي', line: 'محطات OSCE وحالات ومهارات وأشعة، مرتّبة حسب الجهاز' },
    { icon: 'reader', label: 'قارئ ومحرّر PDF', line: 'اكتب وظلّل وغطِّ للاختبار الذاتي — محفوظ في حسابك' },
    { icon: 'resources', label: 'المصادر', line: 'كتب وفيديوهات وإرشادات، ومستنداتك أنت' },
    { icon: 'calendar', label: 'التقويم', line: 'المنهج وخطتك في عرض واحد، من السبت' },
    { icon: 'performance', label: 'الأداء', line: 'حسب المادة ونوع السؤال وعبر الزمن' },
    { icon: 'taxonomy', label: 'القاموس الطبي', line: 'المفاهيم وعلاقاتها، مربوطة بكل ما تقرأه' },
    { icon: 'notebook', label: 'دفتر الملاحظات', line: 'تنسيق مباشر أثناء الكتابة، ومراجع لمستنداتك' },
    { icon: 'whiteboard', label: 'السبورة', line: 'لوحة محدودة تربط فيها الأفكار بروابط قابلة للثني' },
    { icon: 'together', label: 'الدراسة الجماعية', line: 'حُلّ اختبارًا مشتركًا عبر رابط، ثم راجعوه معًا' },
  ],
  walkthrough: {
    title: 'كيف يبدو الأمر فعلًا',
    sub: 'ليست لقطات شاشة — هذه واجهات المنتج نفسها.',
    steps: [
      { specimen: 'today', eyebrow: 'كل صباح', title: 'خطوة واحدة واضحة', line: 'ما يستحق انتباهك اليوم، مرتّبًا حسب الإلحاح ومستوى التثبيت — لا قائمة مهام تكبر بلا نهاية.' },
      { specimen: 'library', eyebrow: 'المكتبة', title: 'كل حقيقة تحمل مصدرها', line: 'اقرأ الموضوع، ثم افتح المصدر الذي يقف خلف كل عبارة — بالكتاب والصفحة.' },
      { specimen: 'question', eyebrow: 'بنك الأسئلة', title: 'اعرف لماذا كانت خطأ', line: 'شرح لكل خيار، ومفاهيم تصبح قابلة للنقر بعد كشف الإجابة، ومراجعة كاملة بعد التسليم.' },
      { specimen: 'reader', eyebrow: 'القارئ', title: 'ذاكِر داخل الملف نفسه', line: 'قلم وتظليل وملاحظات لاصقة وشريط ساتر يغطي ما تريد اختبار نفسك فيه — وكل ذلك محفوظ في حسابك.' },
      { specimen: 'practical', eyebrow: 'العملي', title: 'تدرّب كما تُمتحن', line: 'محطة كاملة: دور المرشّح، وورقة الممتحن، وجدول التقييم — ثم اقرأ حولها.' },
      { specimen: 'performance', eyebrow: 'الأداء', title: 'اعرف أين تقف', line: 'دقة أول محاولة حسب الجهاز، لا نسبة واحدة تخفي كل شيء.' },
    ],
  },
  how: {
    title: 'كيف يقرّر نيشاني ما تذاكره',
    sub: 'ثلاث خطوات تحوّل الكمّ الهائل إلى خطوة واحدة واضحة كل صباح.',
    steps: [
      { k: '١', title: 'ذاكِر وحُلّ', line: 'اقرأ من المكتبة ثم اختبر نفسك بأسئلة مشروحة مرتبطة مباشرة بما قرأته.' },
      { k: '٢', title: 'نتتبّع تذكّرك', line: 'يحسب التكرار المتباعد متى تبدأ في نسيان كل موضوع قبل أن ينساك الامتحان.' },
      { k: '٣', title: 'نخبرك بالتالي', line: 'كل صباح ترى ما يستحق انتباهك مرتّبًا حسب الإلحاح ومستوى التثبيت.' },
    ],
  },
  bilingual: {
    title: 'مصمَّم للعربية، وكامل بالإنجليزية',
    sub: 'واجهة تدعم الكتابة من اليمين إلى اليسار بالكامل — تخطيط معكوس، أرقام عربية، ومصطلحات طبية دقيقة — مع تبديل فوري بين اللغتين دون أن تفقد مكانك.',
    points: ['دعم RTL كامل عبر كل صفحة', 'تبديل بين اللغتين بنقرة واحدة', 'مصطلحات سريرية مُراجَعة'],
  },
  plans: {
    title: 'خطط وأسعار',
    sub: 'خطط تناسب طريقة مذاكرتك. يمكن الترقية أو الإلغاء في أي وقت.',
    refund: 'تُراجَع طلبات الاسترداد حالة بحالة — راجع سياسة الاسترداد.',
    perMonth: 'ما يعادل شهريًا',
    save: 'وفّر',
    currency: 'ج.م',
    free: 'مجانًا',
    moreTitle: 'وخيارات أخرى',
    compareTitle: 'ما الذي تشمله كل خطة',
    comingSoon: 'قريبًا',
  },
  cta: {
    title: 'ابدأ رحلتك مع نيشاني اليوم',
    sub: 'مساحة واحدة هادئة لكل مذاكرتك السريرية — من أول محاضرة إلى ليلة الامتحان.',
    button: 'ادخل كطالب',
    secondary: 'تسجيل الدخول',
  },
  specimen: {
    title: 'اليوم · تركيزك',
    date: '٧ أغسطس',
    session: 'قصور القلب: الفيزيولوجيا المرضية',
    lecture: 'محاضرة',
    readiness: 'الجاهزية للامتحان',
    attention: 'يستحق الانتباه',
    acs: 'المتلازمات التاجية الحادة',
    overdue: 'متأخّر',
    diuretics: 'مدرّات البول: مواقع التأثير',
    dueToday: 'مستحق اليوم',
    libraryTitle: 'قصور القلب بقذف منخفض',
    librarySource: 'كومار وكلارك · الفصل ٢٣ · ص ٧٩١',
    libraryFact: 'يُعرَّف القذف المنخفض بجزء قذف أقل من ٤٠٪.',
    librarySources: 'المصادر',
    questionStem: 'رجل ٦٢ عامًا، ضيق نفس عند الجهد وتورّم الكاحلين.',
    questionChoice: 'قصور قلب بجزء قذف منخفض',
    questionWrong: 'مرض رئوي مزمن',
    questionWhy: 'التورّم الثنائي وارتفاع الوريد الوداجي يوجّهان إلى القلب لا الرئة.',
    readerTitle: 'مذكرة القلب · ص ١٤',
    readerNote: 'راجِع هذا قبل الامتحان',
    readerTape: 'مغطّى — انقر للكشف',
    practicalTitle: 'محطة: فحص القلب',
    practicalCandidate: 'المرشّح',
    practicalExaminer: 'الممتحن والممثّل',
    practicalMark: 'جدول التقييم',
    performanceTitle: 'دقة أول محاولة',
    performanceSubjects: [
      { name: 'القلب والأوعية', value: 74 },
      { name: 'التنفسي', value: 61 },
      { name: 'الكلى والمسالك', value: 52 },
      { name: 'الغدد', value: 68 },
    ],
  },
  footer: 'نسخة عرض توضيحية. المحتوى توضيحي لتعليم الطب الجامعي، وليس إرشادًا سريريًا.',
}

export const EN_CONTENT: LandingContent = {
  lang: 'en',
  dir: 'ltr',
  documentTitle: 'Nishany · Clinical study, in one place',
  otherHref: '/ar',
  otherLabel: 'العربية',
  otherOffer: {
    line: 'هذه الصفحة متاحة بالعربية أيضًا.',
    accept: 'اقرأها بالعربية',
    dismiss: 'إخفاء',
  },
  signIn: 'Sign in',
  nav: { start: 'Start studying' },
  hero: {
    h1: 'See exactly what to study next',
    sub: 'Nishany brings your library, question bank, practicals, and schedule into one calm clinical workspace — then tells you what deserves attention today. Arabic-first, fully English.',
    primary: 'Start studying',
    secondary: 'Sign in',
    trust: 'Built around spaced repetition and the organ-system curriculum.',
  },
  stats: [
    { value: '8', label: 'Organ systems' },
    { value: '3,200+', label: 'Explained questions' },
    { value: '100%', label: 'Answers linked to the library' },
    { value: 'AR · EN', label: 'Bilingual interface' },
  ],
  featuresTitle: 'Everything in one place',
  featuresSub: 'Connected surfaces that work together — not scattered tools.',
  features: [
    { icon: 'library', label: 'Library', line: 'Every topic and subtopic, in clear sections' },
    { icon: 'sources', label: 'Verified sources', line: 'Every fact carries the book and page behind it' },
    { icon: 'qbank', label: 'Question Bank', line: 'Explained answers, and a full review after you submit' },
    { icon: 'practical', label: 'Practical', line: 'OSCE stations, cases, skills, lab & imaging, by system' },
    { icon: 'reader', label: 'PDF reader & editor', line: 'Write, highlight and tape over what you are testing — saved to your account' },
    { icon: 'resources', label: 'Resources', line: 'Books, videos and guidelines — and your own uploads' },
    { icon: 'calendar', label: 'Calendar', line: 'Curriculum and your plan in one view, from Saturday' },
    { icon: 'performance', label: 'Performance', line: 'By subject, by question type, over time' },
    { icon: 'taxonomy', label: 'Medical dictionary', line: 'Concepts and how they relate, linked to everything you read' },
    { icon: 'notebook', label: 'Notebook', line: 'Formatting that renders as you write, with references to your documents' },
    { icon: 'whiteboard', label: 'Whiteboard', line: 'A bounded board where connectors bend to follow your thinking' },
    { icon: 'together', label: 'Study Together', line: 'Solve a shared test from a link, then review it together' },
  ],
  walkthrough: {
    title: 'What it actually looks like',
    sub: 'Not screenshots — these are the product’s own surfaces.',
    steps: [
      { specimen: 'today', eyebrow: 'Every morning', title: 'One clear move', line: 'What deserves attention today, ordered by urgency and retention — not a to-do list that only grows.' },
      { specimen: 'library', eyebrow: 'Library', title: 'Every fact carries its source', line: 'Read the topic, then open the source standing behind any sentence — down to the book and the page.' },
      { specimen: 'question', eyebrow: 'Question Bank', title: 'Know why it was wrong', line: 'A rationale for every option, concepts that turn clickable once the answer is revealed, and a full review after you submit.' },
      { specimen: 'reader', eyebrow: 'Reader', title: 'Study inside the document', line: 'Pen, highlighter, sticky notes, and tape that covers what you want to test yourself on — all saved to your account.' },
      { specimen: 'practical', eyebrow: 'Practical', title: 'Practise the way you are examined', line: 'A whole station: the candidate’s role, the examiner and actor brief, and the mark scheme — then read around it.' },
      { specimen: 'performance', eyebrow: 'Performance', title: 'Know where you stand', line: 'First-attempt accuracy by system, not one number that hides everything.' },
    ],
  },
  how: {
    title: 'How Nishany decides what you study',
    sub: 'Three steps that turn an overwhelming syllabus into one clear move each morning.',
    steps: [
      { k: '1', title: 'Read and answer', line: 'Read from the library, then test yourself with explained questions tied to exactly what you read.' },
      { k: '2', title: 'We track your recall', line: 'Spaced repetition works out when you are about to forget each topic — before the exam does.' },
      { k: '3', title: 'We tell you what is next', line: 'Every morning you see what deserves attention, ordered by urgency and retention.' },
    ],
  },
  bilingual: {
    title: 'Designed for Arabic, complete in English',
    sub: 'A fully right-to-left interface — mirrored layout, Arabic numerals, and precise medical terminology — with instant switching between languages without losing your place.',
    points: ['Full RTL support on every page', 'Switch languages in one click', 'Reviewed clinical terminology'],
  },
  plans: {
    title: 'Plans & pricing',
    sub: 'Plans that fit how you study. Upgrade or cancel any time.',
    refund: 'Refund requests are reviewed case by case — see the refund policy.',
    perMonth: 'a month, equivalent',
    save: 'Save',
    currency: 'EGP',
    free: 'Free',
    moreTitle: 'And a few other ways in',
    compareTitle: 'What each plan includes',
    comingSoon: 'Coming soon',
  },
  cta: {
    title: 'Start your journey with Nishany today',
    sub: 'One calm workspace for all your clinical study — from the first lecture to exam night.',
    button: 'Enter as a student',
    secondary: 'Sign in',
  },
  specimen: {
    title: 'Today · your focus',
    date: '7 Aug',
    session: 'Heart failure: pathophysiology',
    lecture: 'Lecture',
    readiness: 'Exam readiness',
    attention: 'Deserves attention',
    acs: 'Acute coronary syndromes',
    overdue: 'Overdue',
    diuretics: 'Diuretics: sites of action',
    dueToday: 'Due today',
    libraryTitle: 'Heart failure with reduced ejection fraction',
    librarySource: 'Kumar & Clark · Ch. 23 · p. 791',
    libraryFact: 'Reduced ejection fraction is defined as an EF below 40%.',
    librarySources: 'Sources',
    questionStem: 'A 62-year-old man with exertional breathlessness and ankle swelling.',
    questionChoice: 'Heart failure with reduced ejection fraction',
    questionWrong: 'Chronic lung disease',
    questionWhy: 'Bilateral oedema with a raised JVP points at the heart, not the lung.',
    readerTitle: 'Cardiology handout · p. 14',
    readerNote: 'Come back to this before the exam',
    readerTape: 'Covered — tap to reveal',
    practicalTitle: 'Station: cardiovascular examination',
    practicalCandidate: 'Candidate',
    practicalExaminer: 'Examiner & actor',
    practicalMark: 'Mark scheme',
    performanceTitle: 'First-attempt accuracy',
    performanceSubjects: [
      { name: 'Cardiovascular', value: 74 },
      { name: 'Respiratory', value: 61 },
      { name: 'Renal & urinary', value: 52 },
      { name: 'Endocrine', value: 68 },
    ],
  },
  footer: 'A demonstration build. Content is illustrative for undergraduate medical education, not clinical guidance.',
}
