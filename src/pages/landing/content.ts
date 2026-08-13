/**
 * Bilingual copy for the marketing landing page. Arabic is the primary language
 * (the site is Arabic-first); English mirrors it. Both render through the same
 * LandingShell so the two never drift.
 */

export interface Feature {
  /** Icon key resolved in LandingShell so copy stays free of imports. */
  icon: 'library' | 'qbank' | 'practical' | 'calendar' | 'performance' | 'resources' | 'whiteboard' | 'together'
  label: string
  line: string
}

export interface LandingContent {
  lang: 'ar' | 'en'
  dir: 'rtl' | 'ltr'
  documentTitle: string
  otherHref: string
  otherLabel: string
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
    items: { name: string; price: string; period: string; alt: string; entitlement: string; featured?: boolean; badge?: string; cta: string }[]
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
  }
  footer: string
}

export const AR_CONTENT: LandingContent = {
  lang: 'ar',
  dir: 'rtl',
  documentTitle: 'Synapse · مذاكرة الطب، في مكان واحد',
  otherHref: '/en',
  otherLabel: 'English',
  signIn: 'تسجيل الدخول',
  nav: { start: 'ابدأ المذاكرة' },
  hero: {
    h1: 'اعرف بالضبط ما تذاكره تاليًا',
    sub: 'يجمع Synapse مكتبتك وبنك الأسئلة والتدريب العملي وجدولك في مساحة سريرية واحدة هادئة — ثم يخبرك بما يستحق انتباهك اليوم. بالعربية أولًا، وبالإنجليزية كاملة.',
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
  featuresSub: 'ثماني مساحات مترابطة تعمل معًا — لا أدوات متفرقة.',
  features: [
    { icon: 'library', label: 'المكتبة', line: 'كل موضوع وموضوع فرعي، بأقسام واضحة' },
    { icon: 'qbank', label: 'بنك الأسئلة', line: 'إجابات مشروحة، مرتبطة بالمكتبة' },
    { icon: 'practical', label: 'العملي', line: 'محطات OSCE وحالات ومهارات وأشعة' },
    { icon: 'calendar', label: 'التقويم', line: 'المنهج وخطتك في عرض واحد' },
    { icon: 'performance', label: 'الأداء', line: 'حسب المادة ونوع السؤال وعبر الزمن' },
    { icon: 'resources', label: 'المصادر', line: 'كتب وفيديوهات وإرشادات، مُصفّاة' },
    { icon: 'whiteboard', label: 'السبورة', line: 'لوحة لا نهائية لربط الأفكار' },
    { icon: 'together', label: 'الدراسة الجماعية', line: 'حُلّ اختبارًا مشتركًا عبر رابط' },
  ],
  how: {
    title: 'كيف يقرّر Synapse ما تذاكره',
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
    sub: 'اختر ما يناسبك — يمكن الترقية في أي وقت.',
    refund: 'نافذة استرداد ١٤ يومًا، وفق سياسة الاسترداد المنشورة وضوابط الاستخدام.',
    items: [
      { name: 'مجاني', price: '٠ ج.م', period: '', alt: 'تشخيص + ١٠ أسئلة يوميًا بعد تجربة Adaptive كاملة ٧ أيام — دون بطاقة', entitlement: 'وصول محدود للتقدّم والمكتبة', cta: 'ابدأ مجانًا' },
      { name: 'بنك الأسئلة', price: '٩٩ ج.م', period: '/ شهر', alt: '٢٤٩ / ٣ أشهر · ٧٩٩ / سنة', entitlement: 'بنك الأسئلة المعتمد كاملًا، كتل مخصّصة، شروح، إشارات وملاحظات، وتقدّم أساسي', cta: 'اشترك' },
      { name: 'Adaptive', price: '١٩٩ ج.م', period: '/ شهر', alt: '٤٩٩ / ٣ أشهر · ١٬٤٩٩ / سنة', entitlement: 'بنك الأسئلة + كتل تكيّفية، خطة دراسة، مراجعة متباعدة، تقييمات جاهزية، مصادر مستهدفة، وتحليلات أغنى', featured: true, badge: 'الأكثر قيمة', cta: 'اشترك' },
      { name: 'إضافة Adaptive', price: '٧٩ ج.م', period: '/ شهر', alt: 'أو ١٩٩ / فصل دراسي', entitlement: 'أضِف ميزة Adaptive إلى اشتراك حالي مؤهّل دون دفع مرتين عن المحتوى المتداخل', cta: 'أضِف' },
      { name: 'Exam Sprint', price: '٢٤٩ ج.م', period: '/ ٣٠ يومًا', alt: 'نطاق امتحان واحد محدّد', entitlement: 'خطة مكثّفة، اختبارات محاكاة وجاهزية، إصلاح تكيّفي، وتحليلات السبرنت', cta: 'ابدأ سبرنت' },
      { name: 'المؤسسات / الدفعات', price: 'حسب الطلب', period: '', alt: 'تسعير لكل طالب', entitlement: 'وصول وتحليلات على مستوى الجامعة أو الدفعة', cta: 'تواصل معنا' },
    ],
  },
  cta: {
    title: 'ابدأ رحلتك مع Synapse اليوم',
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
  },
  footer: 'نسخة عرض توضيحية. المحتوى توضيحي لتعليم الطب الجامعي، وليس إرشادًا سريريًا.',
}

export const EN_CONTENT: LandingContent = {
  lang: 'en',
  dir: 'ltr',
  documentTitle: 'Synapse · Clinical study, in one place',
  otherHref: '/ar',
  otherLabel: 'العربية',
  signIn: 'Sign in',
  nav: { start: 'Start studying' },
  hero: {
    h1: 'See exactly what to study next',
    sub: 'Synapse brings your library, question bank, practicals, and schedule into one calm clinical workspace — then tells you what deserves attention today. Arabic-first, fully English.',
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
  featuresSub: 'Eight connected surfaces that work together — not scattered tools.',
  features: [
    { icon: 'library', label: 'Library', line: 'Every topic and subtopic, in clear sections' },
    { icon: 'qbank', label: 'Question Bank', line: 'Explained answers, linked to the library' },
    { icon: 'practical', label: 'Practical', line: 'OSCE stations, cases, skills, lab & imaging' },
    { icon: 'calendar', label: 'Calendar', line: 'Curriculum and your plan, one view' },
    { icon: 'performance', label: 'Performance', line: 'By subject, by question type, over time' },
    { icon: 'resources', label: 'Resources', line: 'Books, videos and guidelines, filtered' },
    { icon: 'whiteboard', label: 'Whiteboard', line: 'An infinite canvas to connect ideas' },
    { icon: 'together', label: 'Study Together', line: 'Solve a shared test from a link' },
  ],
  how: {
    title: 'How Synapse decides what you study',
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
    sub: 'Pick what fits — upgrade any time.',
    refund: '14-day refund window, subject to the published refund policy and abuse controls.',
    items: [
      { name: 'Free', price: 'EGP 0', period: '', alt: 'Diagnostic + 10 questions/day after a 7-day full Adaptive trial — no card required', entitlement: 'Limited progress and library access', cta: 'Start free' },
      { name: 'QBank', price: 'EGP 99', period: '/ month', alt: 'EGP 249 / 3 months · EGP 799 / year', entitlement: 'Full approved question bank, custom blocks, explanations, bookmarks & notes, basic progress', cta: 'Subscribe' },
      { name: 'Adaptive', price: 'EGP 199', period: '/ month', alt: 'EGP 499 / 3 months · EGP 1,499 / year', entitlement: 'QBank plus adaptive blocks, study plan, spaced review, readiness assessments, targeted resources, richer analytics', featured: true, badge: 'Best value', cta: 'Subscribe' },
      { name: 'Adaptive add-on', price: 'EGP 79', period: '/ month', alt: 'or EGP 199 / term', entitlement: 'Adds Adaptive to an eligible current course without paying twice for overlapping content', cta: 'Add on' },
      { name: 'Exam Sprint', price: 'EGP 249', period: '/ 30 days', alt: 'One defined exam scope', entitlement: 'Compressed plan, mocks & readiness, adaptive repair, and sprint analytics', cta: 'Start a sprint' },
      { name: 'Campus / cohort', price: 'Quoted', period: '', alt: 'per student', entitlement: 'Institution-wide access and analytics', cta: 'Contact us' },
    ],
  },
  cta: {
    title: 'Start your journey with Synapse today',
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
  },
  footer: 'A demonstration build. Content is illustrative for undergraduate medical education, not clinical guidance.',
}
