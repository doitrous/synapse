/**
 * Copy for the standalone pricing page.
 *
 * Kept out of `content.ts` because it answers a different question. The landing
 * page argues that Connect Cortex is worth using; this page is read by somebody who
 * has already decided that and is now deciding what to pay — so it is mostly
 * objections, in the order people raise them.
 *
 * Every answer here is grounded in something the product actually does. Where a
 * fact is not yet settled — the payment processor, a compliance certification,
 * a named institution — there is no question about it rather than a vague
 * answer, because a pricing page that hedges reads worse than one that is short.
 * `docs/pricing-page.md` lists the questions to add once those facts exist.
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
  /** This page's path, and the other language's, for canonical + hreflang. */
  path: string
  otherPath: string
  documentTitle: string
  /** `{from}` is replaced with the cheapest monthly-equivalent on offer. */
  metaDescription: string
  breadcrumb: string
  /** The header link to this page, shown on every marketing page. */
  navLabel: string
  /** The compact block on the landing page that links here. */
  teaser: { title: string; sub: string; from: string; link: string }
  h1: string
  sub: string
  /** Short risk-reducers under the heading, before any price is shown. */
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
  documentTitle: 'Pricing — Connect Cortex · Plans for undergraduate medical study',
  metaDescription:
    'One workspace for the library, question bank, practicals and your schedule, priced per student from {from} a month. Start free with a 7-day full trial, no card.',
  breadcrumb: 'Home',
  navLabel: 'Pricing',
  teaser: {
    title: 'Plans & pricing',
    sub: 'Start free with a 7-day full trial, no card. Upgrade when choosing what to revise starts costing more time than the revision.',
    from: 'from',
    link: 'See what each plan includes',
  },
  h1: 'Plans for the whole degree, not just exam week',
  sub:
    'Every plan opens the library, the verified sources behind it and the PDF reader. What changes higher up is how much of your revision Connect Cortex plans for you.',
  assurances: [
    '7-day full trial, no card',
    'Upgrade or cancel any time',
    '14-day refund window',
  ],

  faqTitle: 'Questions people ask before subscribing',
  faqSub: 'If yours is not here, ask before you pay rather than after.',
  faq: [
    {
      q: 'Can I cancel any time?',
      a: 'Yes. You can cancel from Billing in your account, and you keep access until the end of the period you have already paid for. There is no cancellation fee and no notice period.',
    },
    {
      q: 'Do I need a card to start?',
      a: 'No. The free plan starts with a 7-day trial of the full Adaptive plan and asks for no card. When the trial ends you drop to the free plan — a diagnostic and 10 questions a day — rather than being charged.',
    },
    {
      q: 'What happens when I run out of questions on the free plan?',
      a: 'The free plan gives you 10 questions a day. When you reach that, the question bank waits until the next day; nothing you have already written, bookmarked or annotated is taken away, and the library, reader and notebook keep working.',
    },
    {
      q: "What is the difference between QBank and Adaptive?",
      a: 'QBank gives you the whole approved question bank and lets you build your own blocks by system and topic. Adaptive adds the part that decides for you: blocks aimed at your weak points, a generated study plan, spaced review, and exam readiness assessments. Most people move up when choosing what to revise starts costing more time than the revision.',
    },
    {
      q: 'Can I change plan or billing period later?',
      a: 'Yes, in either direction. Moving up takes effect immediately and is charged pro rata for the rest of the period; moving down takes effect at the next renewal so you do not lose access you have paid for.',
    },
    {
      q: 'How does the yearly price work out against monthly?',
      a: 'A longer commitment is charged once and works out lower per month. Switch the billing control above and each plan shows its own price for that period and what it saves against paying monthly. A period that is announced but not yet open is marked, and you can still see what it will cost.',
    },
    {
      q: 'Is Connect Cortex aligned with my university\'s curriculum?',
      a: 'Content is organised by organ system across Years 1–5, which is how most MBBS-style curricula are taught, and every fact carries the book and page it came from so you can check it against your own reading list. It is not a substitute for your faculty\'s material, and it does not claim to cover a specific university\'s syllabus.',
    },
    {
      q: 'Is any of this clinical guidance?',
      a: 'No. Connect Cortex is a study tool for undergraduate medical education. Nothing in the library, question bank or practicals is clinical guidance, and none of it should be used to make a decision about a patient.',
    },
    {
      q: 'What happens to my notes and documents if I stop paying?',
      a: 'They stay in your account. Notes, whiteboards, bookmarks, annotations and files you uploaded remain yours and remain readable on the free plan; you can also request an export or deletion of your data at any point.',
    },
    {
      q: 'Do you price for a whole year group or institution?',
      a: 'Yes — Campus is priced per student for institution-wide access and analytics, and is quoted rather than listed because it depends on cohort size and how much of the curriculum you want mapped. Start on a normal plan and tell us the cohort; nothing is lost by starting individually first.',
    },
    {
      q: 'What currency are prices in, and how am I billed?',
      a: 'Prices are in Egyptian pounds (EGP) and are the full amount — there is no separate setup, per-question or per-download fee. You choose monthly, every 3 months, or yearly, and the plan renews on that cycle until you cancel.',
    },
    {
      q: 'Is there a version for the exam period only?',
      a: 'Exam Sprint covers one defined exam scope for 30 days: a compressed plan, mocks, adaptive repair and sprint analytics. It is a fixed 30-day scope rather than a subscription, so it does not renew.',
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

  closingTitle: 'Start on the free plan',
  closingSub: 'Seven days of the full Adaptive plan, no card. Decide after you have used it.',
  closingPrimary: 'Start free',
  closingSecondary: 'Sign in',
}

export const AR_PRICING: PricingContent = {
  path: '/ar/pricing',
  otherPath: '/pricing',
  documentTitle: 'الأسعار — Connect Cortex · خطط لدراسة الطب الجامعية',
  metaDescription:
    'مساحة واحدة للمكتبة وبنك الأسئلة والعملي وجدولك، بسعر لكل طالب يبدأ من {from} شهريًا. ابدأ مجانًا بتجربة كاملة ٧ أيام، دون بطاقة.',
  breadcrumb: 'الرئيسية',
  navLabel: 'الأسعار',
  teaser: {
    title: 'خطط وأسعار',
    sub: 'ابدأ مجانًا بتجربة كاملة ٧ أيام دون بطاقة. ورقِّ خطتك حين يبدأ اختيار ما تُذاكره في استهلاك وقت أطول من المذاكرة نفسها.',
    from: 'من',
    link: 'اطّلع على ما تتضمّنه كل خطة',
  },
  h1: 'خطط تكفي سنوات الدراسة، لا أسبوع الامتحان فقط',
  sub:
    'كل خطة تفتح المكتبة والمصادر الموثّقة خلفها وقارئ الـ PDF. ما يتغيّر في الخطط الأعلى هو مقدار ما يخطّطه Connect Cortex لمذاكرتك بدلًا عنك.',
  assurances: [
    'تجربة كاملة ٧ أيام دون بطاقة',
    'رقِّ خطتك أو ألغِ في أي وقت',
    'نافذة استرداد ١٤ يومًا',
  ],

  faqTitle: 'أسئلة تُطرح قبل الاشتراك',
  faqSub: 'إن لم يكن سؤالك هنا، اسأل قبل الدفع لا بعده.',
  faq: [
    {
      q: 'هل يمكنني الإلغاء في أي وقت؟',
      a: 'نعم. يمكنك الإلغاء من صفحة الفوترة في حسابك، ويبقى وصولك حتى نهاية المدة التي دفعتها بالفعل. لا توجد رسوم إلغاء ولا مدة إخطار.',
    },
    {
      q: 'هل أحتاج بطاقة للبدء؟',
      a: 'لا. تبدأ الخطة المجانية بتجربة ٧ أيام لخطة Adaptive كاملة دون طلب بطاقة. وعند انتهاء التجربة تنتقل إلى الخطة المجانية — تشخيص و١٠ أسئلة يوميًا — بدلًا من أن تُحصَّل منك أي مبالغ.',
    },
    {
      q: 'ماذا يحدث حين تنتهي أسئلة اليوم في الخطة المجانية؟',
      a: 'تمنحك الخطة المجانية ١٠ أسئلة يوميًا. عند بلوغها ينتظر بنك الأسئلة حتى اليوم التالي؛ ولا يُسحب منك شيء مما كتبته أو أشّرت عليه أو علّقت به، وتظل المكتبة والقارئ ودفتر الملاحظات تعمل.',
    },
    {
      q: 'ما الفرق بين بنك الأسئلة وAdaptive؟',
      a: 'بنك الأسئلة يمنحك البنك المعتمد كاملًا ويتيح لك بناء كتلك الخاصة حسب الجهاز والموضوع. أما Adaptive فيضيف الجزء الذي يقرّر بدلًا عنك: كتل موجّهة لنقاط ضعفك، وخطة دراسة مولّدة، ومراجعة متباعدة، وتقييمات جاهزية للامتحان. وينتقل معظم الناس للأعلى حين يبدأ اختيار ما يُذاكَر في استهلاك وقت أطول من المذاكرة نفسها.',
    },
    {
      q: 'هل أستطيع تغيير الخطة أو مدة الفوترة لاحقًا؟',
      a: 'نعم، في الاتجاهين. الترقية تسري فورًا وتُحتسب بالتناسب لبقية المدة؛ والتخفيض يسري عند التجديد التالي حتى لا تفقد وصولًا دفعت ثمنه.',
    },
    {
      q: 'كيف يقارن السعر السنوي بالشهري؟',
      a: 'الالتزام الأطول يُحصَّل مرة واحدة وما يعادله شهريًا أقل. حوّل زر الفوترة أعلاه لترى سعر كل خطة لتلك المدة ومقدار ما توفّره مقارنة بالدفع الشهري. وأي مدة أُعلنت ولم تُفتح بعد تكون مُعلَّمة، ويظل بإمكانك رؤية تكلفتها.',
    },
    {
      q: 'هل يتوافق Connect Cortex مع منهج جامعتي؟',
      a: 'المحتوى مرتّب حسب أجهزة الجسم عبر السنوات من الأولى إلى الخامسة، وهي طريقة تدريس معظم مناهج الطب، وكل حقيقة تحمل الكتاب والصفحة التي جاءت منها لتقارنها بقائمة قراءتك. وهو ليس بديلًا عن مادة كليتك، ولا يدّعي تغطية منهج جامعة بعينها.',
    },
    {
      q: 'هل أي من هذا إرشاد سريري؟',
      a: 'لا. Connect Cortex أداة مذاكرة للتعليم الطبي الجامعي. لا شيء في المكتبة أو بنك الأسئلة أو العملي يُعدّ إرشادًا سريريًا، ولا يصحّ الاعتماد على أي منه في قرار يخص مريضًا.',
    },
    {
      q: 'ماذا يحدث لملاحظاتي ومستنداتي إن توقفت عن الدفع؟',
      a: 'تبقى في حسابك. الملاحظات والسبورات والإشارات والتعليقات والملفات التي رفعتها تظل ملكك وتظل قابلة للقراءة في الخطة المجانية؛ ويمكنك أيضًا طلب تصدير بياناتك أو حذفها في أي وقت.',
    },
    {
      q: 'هل لديكم تسعير لدفعة كاملة أو لمؤسسة؟',
      a: 'نعم — خطة Campus تُسعَّر لكل طالب لوصول وتحليلات على مستوى المؤسسة، وتُعرض بعرض سعر لا بسعر مُدرَج لأنها تعتمد على حجم الدفعة وقدر المنهج المطلوب ربطه. ابدأ بخطة عادية وأخبرنا بحجم الدفعة؛ لا شيء يضيع بالبدء فرديًا أولًا.',
    },
    {
      q: 'بأي عملة الأسعار، وكيف تتم الفوترة؟',
      a: 'الأسعار بالجنيه المصري (ج.م) وهي المبلغ الكامل — لا توجد رسوم تأسيس أو رسوم لكل سؤال أو لكل تنزيل. تختار شهريًا أو كل ٣ أشهر أو سنويًا، وتتجدّد الخطة على تلك الدورة حتى تلغيها.',
    },
    {
      q: 'هل توجد نسخة لفترة الامتحانات فقط؟',
      a: 'خطة Exam Sprint تغطي نطاق امتحان واحد محدّد لمدة ٣٠ يومًا: خطة مضغوطة، واختبارات محاكاة، وإصلاح تكيّفي، وتحليلات للسبرنت. وهي نطاق ثابت لثلاثين يومًا لا اشتراك، فلا تتجدّد.',
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

  closingTitle: 'ابدأ بالخطة المجانية',
  closingSub: 'سبعة أيام من خطة Adaptive كاملة، دون بطاقة. قرّر بعد أن تكون قد استخدمتها.',
  closingPrimary: 'ابدأ مجانًا',
  closingSecondary: 'تسجيل الدخول',
}

/** The pricing copy for a language, so the shared chrome can link to it. */
export function pricingFor(lang: 'ar' | 'en'): PricingContent {
  return lang === 'ar' ? AR_PRICING : EN_PRICING
}
