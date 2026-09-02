/**
 * Arabic for Adaptive Study — Today, Plan, Practice, Concepts, Readiness (WP15b).
 *
 * The tab's own surfaces had no package file: `HowItWorks.tsx` was translated
 * through the shared constants in `i18n-ar.ts`, and everything else on the tab
 * was never wrapped. One more file per the split's own rule, so the sweep never
 * writes into the shared object.
 *
 * Counted nouns follow the convention fix round 1 set: the plural key carries
 * the sound or broken plural, because one Arabic form has to serve every n ≠ 1.
 */
export const AR_ADAPTIVE: Record<string, string> = {

  /* ---- Today: the recommendation ------------------------------------- */
  'Recommended next': 'الخطوة التالية المقترحة',
  'Nothing on your blueprint yet': 'لا شيء على مخطّطك بعد',
  'No concepts are in scope for your university and year, so there is nothing to select from. This is a content gap, not a gap in your work.':
    'لا توجد مفاهيم ضمن نطاق جامعتك وسنتك، فليس ثمّة ما يُختار منه. وهذه فجوة في المحتوى لا في عملك.',
  'No approved questions in scope': 'لا توجد أسئلة معتمدة في النطاق',
  'Your blueprint exists, but no published questions match your university, year and modules yet.':
    'مخطّطك موجود، لكن لا توجد أسئلة منشورة تطابق جامعتك وسنتك ومقرراتك بعد.',
  'concept due for review': 'مفهوم مستحقّ للمراجعة',
  'concepts due for review': 'مفاهيم مستحقّة للمراجعة',
  'These were secure, and enough time has passed that they are worth checking before they fade.':
    'كانت راسخة، وقد مضى من الوقت ما يجعل مراجعتها قبل أن تتلاشى أمرًا يستحقّ.',
  'weak concept to repair': 'مفهوم ضعيف يحتاج إصلاحًا',
  'weak concepts to repair': 'مفاهيم ضعيفة تحتاج إصلاحًا',
  'Repeated evidence across different questions points to real gaps here. The next block will oversample them while still covering your blueprint.':
    'تشير أدلة متكرّرة عبر أسئلة مختلفة إلى فجوات حقيقية هنا. وستُكثر المجموعة القادمة من أسئلتها مع الحفاظ على تغطية مخطّطك.',
  'Time for a readiness assessment': 'حان وقت تقييم الجاهزية',
  'You have enough practice behind you to measure where you stand. Practice accuracy will not tell you — adaptive blocks deliberately oversample your weak areas.':
    'لديك من التدريب ما يكفي لقياس موقعك. ودقّة التدريب لن تخبرك به — فالمجموعات التكيّفية تُكثر عمدًا من أسئلة مواضع ضعفك.',
  'of your blueprint is unpractised': 'من مخطّطك لم يُتدرَّب عليه',
  'The next block will weight coverage more heavily so the untouched areas start being measured.':
    'ستمنح المجموعة القادمة التغطية وزنًا أكبر ليبدأ قياس المواضع التي لم تُمَسّ.',
  'Start a block': 'ابدأ مجموعة',
  'Nothing is overdue and no confirmed weakness is outstanding. The next block will balance review with the parts of your blueprint that have the least evidence behind them.':
    'لا شيء متأخّر ولا ضعف مؤكَّد معلَّق. وستوازن المجموعة القادمة بين المراجعة وأجزاء مخطّطك الأقلّ دليلًا.',
  'Build a block': 'كوّن مجموعة',
  'Start assessment': 'ابدأ التقييم',
  'days to': 'يومًا حتى',
  'your next exam': 'امتحانك القادم',
  '. Selection is weighting blueprint coverage at': '. ويمنح الاختيار تغطية المخطّط وزنًا قدره',
  'of each block.': 'من كل مجموعة.',

  /* ---- Today: the readings -------------------------------------------- */
  'Measured separately from practice, on blueprint-balanced questions held back from your blocks.':
    'يُقاس بمعزل عن التدريب، على أسئلة متوازنة مع المخطّط محجوزة خارج مجموعاتك.',
  'From {n} held-out questions': 'من {n} سؤالًا محجوزًا',
  'Blueprint covered': 'المخطّط المُغطّى',
  'No concepts are in scope for your university and year yet.': 'لا توجد مفاهيم ضمن نطاق جامعتك وسنتك بعد.',
  'concept untouched': 'مفهوم لم يُمَسّ',
  'concepts untouched': 'مفاهيم لم تُمَسّ',
  'Weak concepts': 'المفاهيم الضعيفة',
  'wrong answer recorded': 'إجابة خاطئة مسجَّلة',
  'wrong answers recorded': 'إجابات خاطئة مسجَّلة',
  'Due for review': 'مستحقّ للمراجعة',
  'concept measured': 'مفهوم مقيس',
  'concepts measured': 'مفاهيم مقيسة',
  'Blueprint v{version}': 'المخطّط، الإصدار {version}',
  'Derived weights': 'أوزان مشتقّة',
  'No blueprint in scope': 'لا مخطّط في النطاق',
  'No concepts are scoped to your university and year, so coverage cannot be measured. An administrator sets this up.':
    'لا توجد مفاهيم مُسنَدة إلى جامعتك وسنتك، فلا يمكن قياس التغطية. ويتولّى إعداد ذلك مسؤول النظام.',
  'Recent blocks under-served blueprint coverage by about': 'قصّرت المجموعات الأخيرة في تغطية المخطّط بنحو',
  'questions. That shortfall is being repaid across the next few blocks rather than all at once.':
    'سؤالًا. ويُعوَّض هذا النقص عبر المجموعات القليلة القادمة لا دفعةً واحدة.',
  'What your next block will contain': 'ما ستحتويه مجموعتك القادمة',
  'Allocation targets': 'أهداف التوزيع',
  'These are allocation targets, not separate pools. One question often satisfies several of them at once and takes a single slot.':
    'هذه أهداف توزيع لا مجموعات منفصلة. وكثيرًا ما يحقّق سؤال واحد عدّة أهداف منها في آنٍ واحد ويشغل خانة واحدة.',
  'How your readiness is measured': 'كيف تُقاس جاهزيتك',

  /* ---- The small display pieces (`parts.tsx`) -------------------------- */
  'Between {lower} and {upper} percent': 'بين {lower} و{upper} في المئة',

  /* ---- Concepts -------------------------------------------------------- */
  'No concepts in scope': 'لا توجد مفاهيم في النطاق',
  'Nothing is scoped to your university and year yet, so there is nothing to measure. An administrator sets the blueprint up.':
    'لا شيء مُسنَد إلى جامعتك وسنتك بعد، فليس ثمّة ما يُقاس. ويتولّى إعداد المخطّط مسؤول النظام.',
  'Search concepts…': 'ابحث في المفاهيم…',
  'Nothing matches': 'لا شيء يطابق',
  'No concept matches this filter and search.': 'لا يطابق أيّ مفهوم هذا المرشِّح وهذا البحث.',
  'overdue {n}d': 'أيام التأخير: {n}',
  'due today': 'مستحقّ اليوم',
  'of blueprint': 'من المخطّط',
  'misconception': 'مفهوم خاطئ',
  'misconceptions': 'مفاهيم خاطئة',
  'Not enough evidence — will be drawn into your next block.':
    'الأدلة لا تكفي — سيُسحب هذا المفهوم إلى مجموعتك القادمة.',
  'wrong': 'خطأ',
  'Scope for {concept}': 'نطاق {concept}',
  'Marker = best estimate · band = uncertainty · snooze or scope out any concept from its card':
    'العلامة = أفضل تقدير · النطاق = عدم اليقين · أجّل أيّ مفهوم أو أخرجه من النطاق من بطاقته',
  'What your overrides do': 'ما الذي تفعله تجاوزاتك',
  'keeps the concept measured and keeps its evidence, but stops selection offering it for two weeks. Use it when you have decided to come back to something later.':
    'يُبقي المفهوم مقيسًا ويحفظ أدلته، لكنه يوقف عرضه في الاختيار لمدة أسبوعين. استخدمه حين تقرّر العودة إلى شيء لاحقًا.',
  'removes the concept from your blueprint entirely, so it stops counting toward coverage and stops being selected. Use it when a concept genuinely is not on your exam.':
    'يزيل المفهوم من مخطّطك كليًّا، فيتوقّف احتسابه في التغطية ويتوقّف اختياره. استخدمه حين لا يكون المفهوم فعلًا ضمن امتحانك.',
  'Neither deletes anything. Your answers stay in the record, and setting a concept back to Normal restores its state exactly as it was.':
    'ولا واحد منهما يحذف شيئًا. تبقى إجاباتك في السجل، وإعادة أيّ مفهوم إلى «عادي» تستعيد حالته كما كانت تمامًا.',
  'Status meanings': 'معاني الحالات',

  /* ---- Practice: building a block -------------------------------------- */
  'Adaptive practice reads the same published question bank as everything else. Nothing yet matches your university, year and modules.':
    'يقرأ التدريب التكيّفي بنك الأسئلة المنشور نفسه الذي تقرؤه بقية الصفحات. ولا شيء يطابق جامعتك وسنتك ومقرراتك حتى الآن.',
  'Build an adaptive block': 'كوّن مجموعة تكيّفية',
  'The answer and explanation appear as soon as you respond to each question.':
    'تظهر الإجابة والشرح فور ردّك على كل سؤال.',
  'Feedback is withheld until you submit the whole block. The questions themselves are identical.':
    'تُحجب التغذية الراجعة حتى تسلّم المجموعة كاملة. أما الأسئلة نفسها فمتطابقة.',
  'Build the block': 'كوّن المجموعة',
  'The bank could not supply a single question that satisfies your scope and the selection rules. This is a content shortage and has been recorded.':
    'لم يستطع البنك تقديم سؤال واحد يستوفي نطاقك وقواعد الاختيار. وهذا نقص في المحتوى وقد سُجِّل.',
  'What it will contain': 'ما ستحتويه',
  'slots': 'خانات',
  'This block could not be restored': 'تعذّرت استعادة هذه المجموعة',
  'The questions it referred to are no longer in your scope, so it cannot be shown.':
    'لم تعد الأسئلة التي أشارت إليها ضمن نطاقك، فلا يمكن عرضها.',
  'Start again': 'ابدأ من جديد',
  'Question {index} of {total}': 'السؤال {index} من {total}',
  'Tutor — feedback now': 'شرح — تغذية راجعة فورية',
  'Exam — feedback on submit': 'امتحان — تغذية راجعة عند التسليم',
  'Submitted': 'سُلِّمت',
  'How sure are you?': 'ما مدى ثقتك؟',
  'Submit block': 'سلّم المجموعة',
  'How this block was built': 'كيف بُنيت هذه المجموعة',

  /* ---- Practice: the block's own diagnostics ---------------------------- */
  'Slots filled': 'الخانات المشغولة',
  'new to you': 'جديد عليك',
  'demanding': 'صعب',
  'Config v{version}': 'الإعدادات، الإصدار {version}',
  'Nothing in the bank could serve {need} right now, so its': 'لا شيء في البنك يخدم {need} الآن، لذا انتقلت',
  'slots went to the needs that could.': 'من خاناتها إلى الاحتياجات التي أمكن خدمتها.',
  'Relaxed, in order:': 'ما خُفِّف، بالترتيب:',
  'Why this question': 'لماذا هذا السؤال',
  'It is also being prioritised after a recent error.': 'كما رُفعت أولويته بعد خطأ حديث.',
  'Included to complete the block once every other target was met.':
    'أُدرج لإكمال المجموعة بعد استيفاء كل هدف آخر.',
  '{n} on concepts you have struggled with': '{n} على مفاهيم تعثّرت فيها',
  '{n} covering exam blueprint areas': '{n} تغطّي مجالات من مخطّط الامتحان',
  '{n} due for review': '{n} مستحقّة للمراجعة',
  '{n} on concepts not yet measured': '{n} على مفاهيم لم تُقَس بعد',
  '{list} and {last}': '{list} و{last}',
  '{n} questions.': '{n} سؤالًا.',
  '{n} questions: {parts}.': '{n} سؤالًا: {parts}.',
  'The question bank could not fill this block completely. The shortage has been reported.':
    'لم يستطع بنك الأسئلة ملء هذه المجموعة كاملة. وقد جرى الإبلاغ عن النقص.',
  'selection rule': 'قاعدة اختيار',
  'selection rules': 'قواعد اختيار',
  'The question bank could not fill this block completely. {rules} had to be relaxed, and the shortage has been reported.':
    'لم يستطع بنك الأسئلة ملء هذه المجموعة كاملة. وتعيّن تخفيف {rules}، وقد جرى الإبلاغ عن النقص.',
  'The question bank was tight here, so {rules} had to be relaxed. The shortage has been reported.':
    'كان بنك الأسئلة ضيّقًا هنا، فتعيّن تخفيف {rules}. وقد جرى الإبلاغ عن النقص.',
  'extra slot is going to blueprint coverage to repay a shortfall from earlier blocks.':
    'خانة إضافية تذهب إلى تغطية المخطّط لتعويض نقص من مجموعات سابقة.',
  'extra slots are going to blueprint coverage to repay a shortfall from earlier blocks.':
    'خانات إضافية تذهب إلى تغطية المخطّط لتعويض نقص من مجموعات سابقة.',

  /* ---- Readiness -------------------------------------------------------- */
  'Your readiness range over time': 'نطاق جاهزيتك عبر الزمن',
  'This assessment could not be restored': 'تعذّرت استعادة هذا التقييم',
  'The questions it referred to are no longer in scope.': 'لم تعد الأسئلة التي أشار إليها ضمن النطاق.',
  'Discard it': 'تجاهله',
  'Feedback comes at the end — this is a measurement, not practice':
    'تأتي التغذية الراجعة في النهاية — فهذا قياس لا تدريب',
  'Submit assessment': 'سلّم التقييم',
  'Anything you leave blank is recorded as an omission, not as a wrong answer. It is reported separately rather than dragging the range down.':
    'كل ما تتركه فارغًا يُسجَّل تركًا لا إجابةً خاطئة. ويُذكر على حدة بدلًا من أن يخفض النطاق.',
  'Held-out questions only — feedback at the end, never during':
    'أسئلة محجوزة فقط — التغذية الراجعة في النهاية، لا أثناءه أبدًا',
  'estimate': 'التقدير',
  'uncertainty band — it narrows as you answer more': 'نطاق عدم اليقين — يضيق كلما أجبت أكثر',
  'Not enough assessments yet': 'التقييمات لا تكفي بعد',
  'Your range appears here as a trend once you have taken at least two readiness assessments.':
    'يظهر نطاقك هنا اتّجاهًا بعد أن تؤدّي تقييمَي جاهزية على الأقل.',
  'By blueprint area': 'بحسب مجال المخطّط',
  'Most recent assessment': 'أحدث تقييم',
  'Blueprint area': 'مجال المخطّط',
  'Range': 'النطاق',
  'Too few questions to report': 'الأسئلة أقلّ من أن يُبنى عليها تقرير',
  'blueprint area could not be fully represented:': 'مجال من المخطّط تعذّر تمثيله تمثيلًا كاملًا:',
  'blueprint areas could not be fully represented:': 'مجالات من المخطّط تعذّر تمثيلها تمثيلًا كاملًا:',
  '. Treat this result as provisional.': '. عامِل هذه النتيجة على أنها مبدئية.',
  'Readiness assessment': 'تقييم الجاهزية',
  '{n} held-out questions, marked at the end': '{n} سؤالًا محجوزًا، تُصحَّح في النهاية',
  "No questions are reserved for measurement yet, so a readiness assessment cannot be assembled. Reserving items is an administrator's decision — practice accuracy is not offered as a substitute.":
    'لا توجد أسئلة محجوزة للقياس بعد، فلا يمكن تجميع تقييم جاهزية. وحجز العناصر قرار يخصّ مسؤول النظام — ودقّة التدريب لا تُقدَّم بديلًا عنه.',
  'Only': 'فقط',
  'questions could be drawn while keeping the assessment balanced against your blueprint. The result will say which areas are under-represented rather than filling the gap from elsewhere.':
    'سؤالًا أمكن سحبها مع إبقاء التقييم متوازنًا مع مخطّطك. وستذكر النتيجة المجالات ناقصة التمثيل بدل سدّ الفجوة من مكان آخر.',
  'assessment': 'تقييم',
  'assessments': 'تقييمات',
  'No assessments yet': 'لا تقييمات بعد',
  'Your practice accuracy is deliberately not shown here as a stand-in. Adaptive blocks oversample your weak areas, so it would read lower than your real standing.':
    'لا تُعرض دقّة تدريبك هنا بديلًا، وذلك عن قصد. فالمجموعات التكيّفية تُكثر من أسئلة مواضع ضعفك، فتظهر أدنى من موقعك الحقيقي.',
  'Model': 'النموذج',
  'Why a range, not a number?': 'لماذا نطاق لا رقم؟',
  'A single percentage implies a precision the evidence does not have. The band narrows as you answer more held-out questions — watching it narrow, and rise, is the goal.':
    'النسبة الواحدة توحي بدقّة لا تملكها الأدلة. ويضيق النطاق كلما أجبت عن مزيد من الأسئلة المحجوزة — ومراقبته وهو يضيق ويرتفع هي الهدف.',
  'No readiness assessment yet. Practice accuracy is not a substitute — adaptive blocks deliberately oversample your weak areas.':
    'لا تقييم جاهزية بعد. ودقّة التدريب ليست بديلًا — فالمجموعات التكيّفية تُكثر عمدًا من أسئلة مواضع ضعفك.',
  'On blueprint-balanced questions held back from your practice, your performance is between {lower}% and {upper}%.':
    'على أسئلة متوازنة مع المخطّط محجوزة عن تدريبك، يقع أداؤك بين {lower}% و{upper}%.',

  /* ---- Plan: the week --------------------------------------------------- */
  '{hours}h planned': 'المخطّط له: {hours} ساعة',
  'Minutes per day': 'الدقائق في اليوم',
  'left unscheduled': 'متروكة دون جدولة',
  'session could not be placed in this week:': 'جلسة تعذّرت جدولتها في هذا الأسبوع:',
  'sessions could not be placed in this week:': 'جلسات تعذّرت جدولتها في هذا الأسبوع:',
  '. Your stated hours cannot hold everything the plan wanted, and the shortfall is shown rather than dropped.':
    '. لا تتّسع الساعات التي ذكرتها لكل ما أرادته الخطة، والنقص معروض لا محذوف.',
  "Where the week's time goes": 'إلى أين يذهب وقت الأسبوع',
  'Minimum': 'الحدّ الأدنى',
  'Stretch': 'الطموح',
  'Weak concept repair': 'إصلاح المفاهيم الضعيفة',
  'Measuring what is unknown': 'قياس ما هو مجهول',

  /* ---- Plan: the crash programme ---------------------------------------- */
  '{days}-day programme': 'برنامج من {days} يومًا',
  'No approved questions exist for': 'لا توجد أسئلة معتمدة لـ',
  'of your blueprint by weight:': 'من مخطّطك بحسب الوزن:',
  '. These are listed rather than left out silently.': '. وهي مذكورة هنا بدل أن تُترك بصمت.',
  'study days have nothing to schedule — the question bank ran out before the programme did.':
    'أيام دراسة لا شيء فيها ليُجدوَل — نفد بنك الأسئلة قبل أن ينتهي البرنامج.',
  'First two weeks': 'الأسبوعان الأولان',
  'Day': 'اليوم',
  'Mock': 'محاكاة',
  'Review day': 'يوم مراجعة',
  'Catch-up': 'استدراك',
  'Rest': 'راحة',
  'Crash programme': 'البرنامج المكثّف',
  'No exam close enough for a compressed programme': 'لا امتحان قريب بما يكفي لبرنامج مضغوط',
  'No exam is published on your timetable, so nothing here is going to invent a countdown.':
    'لا امتحان منشور على جدولك، فلن يخترع هذا المكان عدًّا تنازليًّا.',
  'Your exam is far enough away that an ordinary weekly plan serves you better.':
    'امتحانك بعيد بما يكفي ليخدمك خطة أسبوعية عادية أفضل.',
  'Capacity': 'الطاقة',
  'Capacity reading': 'القراءة',
  'Minutes': 'الدقائق',
  'You said you have': 'قلت إنّ لديك',
  'Planned': 'المخطّط له',
  'Deliberately left free': 'مُتروك حرًّا عن قصد',

  /* ---- The planner's own sentences (`schedule.ts`, `crashCourse.ts`) -----
   * Rendered through `t()` at their call sites in `Plan.tsx`. The generators
   * that interpolate a count — `reasonFor`, the unplaced-task reason and the
   * crash programme's `claim` — compose their sentence from parts and are
   * recorded in the WP15b report as a named residual, not translated here.
   */
  'Far enough before your exam that a poor result can still be repaired. This measures where you stand; it is not practice.':
    'قبل امتحانك بما يكفي ليظلّ إصلاح نتيجة ضعيفة ممكنًا. وهذا يقيس موقعك، وليس تدريبًا.',
  'Practical station preparation': 'التحضير لمحطة عملية',
  'Your programme assesses these concepts at a practical station, which needs separate preparation from written questions.':
    'يقيس برنامجك هذه المفاهيم في محطة عملية، وهي تحتاج تحضيرًا مستقلًّا عن الأسئلة المكتوبة.',
  'Deliberately unscheduled. Consolidation needs gaps, and a plan with no slack is one a single bad day destroys.':
    'غير مجدول عن قصد. فالترسيخ يحتاج فجوات، والخطة بلا فسحة يهدمها يوم سيّئ واحد.',
  'Completing this plan does not by itself mean you are ready. Readiness is measured separately, on blueprint-balanced questions held back from your practice.':
    'إتمام هذه الخطة لا يعني بذاته أنك جاهز. فالجاهزية تُقاس على حدة، على أسئلة متوازنة مع المخطّط محجوزة عن تدريبك.',
  'A timed, blueprint-balanced assessment. Placed with enough time left to act on what it finds.':
    'تقييم موقوت متوازن مع المخطّط. يوضع مع بقاء وقت يكفي للعمل بما يكشفه.',
  'Revisiting earlier days. Spacing is what makes compressed study hold.':
    'عودة إلى أيام سابقة. فالتباعد هو ما يجعل الدراسة المضغوطة تثبت.',
  'Deliberately empty. Something will slip, and a programme with no slack breaks the first time it does.':
    'فارغ عن قصد. فشيء ما سيتأخّر، والبرنامج بلا فسحة ينكسر أول مرة يحدث فيها ذلك.',
  'Rest. Consolidation happens in the gaps.': 'راحة. فالترسيخ يحدث في الفجوات.',
  'Selected by blueprint weight and current evidence, with prerequisites placed before the concepts that depend on them.':
    'مُختار بحسب وزن المخطّط والأدلة الحالية، مع وضع المتطلّبات السابقة قبل المفاهيم التي تعتمد عليها.',
  'Nothing outstanding for this day — use it for consolidation.':
    'لا شيء معلّق لهذا اليوم — استعمله للترسيخ.',
  'This programme compresses your blueprint; it does not shorten it. Completing it is not a score prediction, and no part of it is a guarantee. Anything your question bank cannot yet cover is listed above rather than left out silently.':
    'يضغط هذا البرنامج مخطّطك ولا يختصره. وإتمامه ليس تنبّؤًا بدرجة، ولا جزء منه ضمان. وكل ما لا يستطيع بنك أسئلتك تغطيته بعد مذكور أعلاه بدل أن يُترك بصمت.',
  'Foundation, breadth and spacing': 'التأسيس والاتّساع والتباعد',
  'Baseline, then every 2–3 weeks': 'قياس أساس، ثم كل ٢–٣ أسابيع',
  'Breadth and weak repair': 'الاتّساع وإصلاح الضعف',
  'Baseline, then fortnightly': 'قياس أساس، ثم كل أسبوعين',
  'Blueprint coverage and mixed timed practice': 'تغطية المخطّط وتدريب موقوت مختلط',
  // 'Weekly' is already `revise.ts`'s, with the same meaning — not restated here.
  'Exam simulation and highest-impact gaps': 'محاكاة الامتحان والفجوات الأشدّ أثرًا',
  'Baseline and 1–2 final mocks': 'قياس أساس ومحاكاة أو محاكاتان ختاميتان',
}
