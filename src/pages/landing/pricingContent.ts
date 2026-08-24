/**
 * Copy for the standalone pricing page.
 *
 * The platform now sells one all-access plan, with trial access kept as a
 * non-purchasable onboarding state.
 */

export interface FaqItem {
  q: string
  a: string
}

export interface TrustPoint {
  icon: 'lock' | 'shield' | 'export' | 'globe'
  label: string
  line: string
}

export interface PricingContent {
  path: string
  otherPath: string
  documentTitle: string
  metaDescription: string
  breadcrumb: string
  navLabel: string
  teaser: { title: string; sub: string; from: string; link: string }
  h1: string
  sub: string
  assurances: string[]
  faqTitle: string
  faqSub: string
  faq: FaqItem[]
  trustTitle: string
  trustSub: string
  trust: TrustPoint[]
  closingTitle: string
  closingSub: string
  closingPrimary: string
  closingSecondary: string
}

export const EN_PRICING: PricingContent = {
  path: '/pricing',
  otherPath: '/ar/pricing',
  documentTitle: 'Pricing — Connect Cortex · One all-access medical study plan',
  metaDescription:
    'One all-access medical study workspace for 400 EGP monthly or 1,000 EGP per term. Trial access is available during onboarding without buying a separate tier.',
  breadcrumb: 'Home',
  navLabel: 'Pricing',
  teaser: {
    title: 'One plan, two periods',
    sub: 'All-access study tools for 400 EGP monthly or 1,000 EGP per term. Promotions and vouchers never stack; the lowest valid price wins.',
    from: 'from',
    link: 'See what all access includes',
  },
  h1: 'One all-access plan',
  sub:
    'Library, verified sources, QBank, practicals, calendar, notebook, whiteboard, analytics and adaptive study tools are included. Choose one month or one term.',
  assurances: [
    '400 EGP monthly',
    '1,000 EGP per term',
    'Trial access is not a purchasable tier',
  ],

  faqTitle: 'Questions people ask before subscribing',
  faqSub: 'If yours is not here, ask before you pay rather than after.',
  faq: [
    {
      q: 'What does the plan include?',
      a: 'All-access means the study surfaces available to your university and year: library, verified sources, question bank, explanations, practical learning, calendar, notebook, whiteboard, resources, analytics and adaptive review.',
    },
    {
      q: 'How much does it cost?',
      a: 'One month costs 400 EGP. One term costs 1,000 EGP. Prices are the listed platform price before any valid administrator promotion or voucher.',
    },
    {
      q: 'Do promotions and vouchers stack?',
      a: 'No. A timed admin promotion and a voucher can both be valid, but they are compared independently. The server applies the valid option that produces the lowest price.',
    },
    {
      q: 'Do I buy a trial?',
      a: 'No. Trial access is an onboarding state, not a plan in the catalogue and not something sold at checkout. When a trial is available, you start there and choose what to buy later.',
    },
    {
      q: 'Can I cancel any time?',
      a: 'Yes. You keep access until the end of the period you have already paid for. There is no cancellation fee and no notice period.',
    },
    {
      q: 'Is Connect Cortex aligned with my university’s curriculum?',
      a: 'The app scopes content by the university and year recorded on your account. Source-backed medical content remains a study aid, not a replacement for your faculty material.',
    },
    {
      q: 'Is any of this clinical guidance?',
      a: 'No. Connect Cortex is a study tool for undergraduate medical education. Nothing in the library, question bank or practicals is clinical guidance.',
    },
    {
      q: 'What happens to my notes and documents if I stop paying?',
      a: 'They stay in your account. Notes, whiteboards, bookmarks, annotations and uploaded files remain yours, and you can request an export or deletion from Account.',
    },
  ],

  trustTitle: 'Your account, and your data',
  trustSub: 'What is true of the platform today — not a roadmap.',
  trust: [
    { icon: 'lock', label: 'Two-factor sign-in', line: 'Available on any account, from the security section of your profile.' },
    { icon: 'export', label: 'Export or delete', line: 'Request a copy of your data, or its deletion, from Privacy in your account.' },
    { icon: 'shield', label: 'An audit trail', line: 'Administrative access to institutional content is logged and immutable.' },
    { icon: 'globe', label: 'Arabic and English', line: 'The whole interface, right-to-left included — not a translated shell.' },
  ],

  closingTitle: 'Start with all access',
  closingSub: 'Choose monthly or term access after onboarding. Any valid promotion or voucher is quoted by the server before payment.',
  closingPrimary: 'Start studying',
  closingSecondary: 'Sign in',
}

export const AR_PRICING: PricingContent = {
  path: '/ar/pricing',
  otherPath: '/pricing',
  documentTitle: 'الأسعار — Connect Cortex · خطة وصول كامل واحدة',
  metaDescription:
    'مساحة مذاكرة طبية كاملة بسعر ٤٠٠ جنيه شهريًا أو ١٠٠٠ جنيه للفصل. الوصول التجريبي حالة بدء وليس خطة منفصلة للشراء.',
  breadcrumb: 'الرئيسية',
  navLabel: 'الأسعار',
  teaser: {
    title: 'خطة واحدة، ومدتان',
    sub: 'وصول كامل مقابل ٤٠٠ جنيه شهريًا أو ١٠٠٠ جنيه للفصل. العروض والقسائم لا تتراكم؛ أقل سعر صالح هو الذي يُطبَّق.',
    from: 'من',
    link: 'اطّلع على ما يتضمّنه الوصول الكامل',
  },
  h1: 'خطة وصول كامل واحدة',
  sub:
    'المكتبة، المصادر الموثّقة، بنك الأسئلة، العملي، التقويم، دفتر الملاحظات، السبورة، الموارد، التحليلات وأدوات المذاكرة التكيّفية مشمولة. اختر شهرًا واحدًا أو فصلًا واحدًا.',
  assurances: [
    '٤٠٠ جنيه شهريًا',
    '١٠٠٠ جنيه للفصل',
    'التجربة ليست خطة تُشترى',
  ],

  faqTitle: 'أسئلة تُطرح قبل الاشتراك',
  faqSub: 'إن لم يكن سؤالك هنا، اسأل قبل الدفع لا بعده.',
  faq: [
    {
      q: 'ماذا تتضمن الخطة؟',
      a: 'الوصول الكامل يعني مساحات المذاكرة المتاحة لجامعتك وسنتك: المكتبة، المصادر، بنك الأسئلة، الشروح، العملي، التقويم، الملاحظات، السبورة، الموارد، التحليلات والمراجعة التكيّفية.',
    },
    {
      q: 'كم السعر؟',
      a: 'الشهر الواحد ٤٠٠ جنيه. الفصل الواحد ١٠٠٠ جنيه. هذه أسعار المنصة قبل أي عرض إداري أو قسيمة صالحة.',
    },
    {
      q: 'هل تتراكم العروض والقسائم؟',
      a: 'لا. قد يكون العرض والقسيمة صالحين في الوقت نفسه، لكنهما يُقارنان مستقلين. يطبّق الخادم الخيار الصالح الذي يعطي أقل سعر.',
    },
    {
      q: 'هل أشتري التجربة؟',
      a: 'لا. الوصول التجريبي حالة بدء، وليس خطة في الكتالوج ولا شيئًا يُباع عند الدفع. عند إتاحته تبدأ به ثم تختار ما تشتريه لاحقًا.',
    },
    {
      q: 'هل يمكنني الإلغاء في أي وقت؟',
      a: 'نعم. يبقى وصولك حتى نهاية المدة المدفوعة بالفعل. لا توجد رسوم إلغاء ولا مدة إخطار.',
    },
    {
      q: 'هل يتوافق Connect Cortex مع منهج جامعتي؟',
      a: 'يرتبط المحتوى بالجامعة والسنة المسجلتين في حسابك. يظل المحتوى الطبي المدعوم بالمصادر أداة مذاكرة، لا بديلًا عن مادة كليتك.',
    },
    {
      q: 'هل أي من هذا إرشاد سريري؟',
      a: 'لا. Connect Cortex أداة مذاكرة للتعليم الطبي الجامعي. لا شيء في المكتبة أو بنك الأسئلة أو العملي يُعدّ إرشادًا سريريًا.',
    },
    {
      q: 'ماذا يحدث لملاحظاتي ومستنداتي إن توقفت عن الدفع؟',
      a: 'تبقى في حسابك. الملاحظات والسبورات والإشارات والتعليقات والملفات التي رفعتها تظل ملكك، ويمكنك طلب تصدير بياناتك أو حذفها من الحساب.',
    },
  ],

  trustTitle: 'حسابك، وبياناتك',
  trustSub: 'ما هو قائم في المنصة اليوم — لا خطة مستقبلية.',
  trust: [
    { icon: 'lock', label: 'تسجيل دخول بخطوتين', line: 'متاح لأي حساب، من قسم الأمان في ملفك الشخصي.' },
    { icon: 'export', label: 'تصدير أو حذف', line: 'اطلب نسخة من بياناتك، أو حذفها، من قسم الخصوصية في حسابك.' },
    { icon: 'shield', label: 'سجل تدقيق', line: 'الوصول الإداري لمحتوى المؤسسة مُسجَّل وغير قابل للتعديل.' },
    { icon: 'globe', label: 'بالعربية والإنجليزية', line: 'الواجهة كاملة، بما فيها الاتجاه من اليمين لليسار — لا قشرة مترجمة.' },
  ],

  closingTitle: 'ابدأ بالوصول الكامل',
  closingSub: 'اختر شهرًا أو فصلًا بعد بدء الحساب. أي عرض أو قسيمة صالحة تُسعَّر من الخادم قبل الدفع.',
  closingPrimary: 'ابدأ المذاكرة',
  closingSecondary: 'تسجيل الدخول',
}

export function pricingFor(lang: 'ar' | 'en'): PricingContent {
  return lang === 'ar' ? AR_PRICING : EN_PRICING
}
