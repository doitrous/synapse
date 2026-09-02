/**
 * Arabic for Question Bank direction 1 (WP3).
 *
 * Owned by that package alone — every package writes only its own file, so two
 * agents adding strings on the same day cannot collide in `i18n-ar.ts`.
 */
export const AR_QBANK: Record<string, string> = {
  /* ---- Hub frame ----------------------------------------------------- */
  'Build a test out of any part of the bank, or go back to what you flagged and missed.':
    'كوّن اختبارًا من أي جزء من البنك، أو ارجع إلى ما علّمته وما أخطأت فيه.',
  'Question of the Day': 'سؤال اليوم',
  'not answered yet': 'لم تُجب عنه بعد',
  'Build a test': 'كوّن اختبارًا',
  'Flagged & missed': 'المعلَّم والفائت',
  'Previous tests': 'الاختبارات السابقة',

  /* ---- Composer ------------------------------------------------------ */
  'No questions match this yet': 'لا أسئلة تطابق هذا بعد',
  'Draw from': 'اسحب من',
  'All questions': 'كل الأسئلة',
  'Flagged': 'المعلَّم',
  'Got wrong': 'ما أخطأت فيه',
  'Omitted': 'ما تركته',
  'Every published question you have access to.': 'كل سؤال منشور متاح لك.',
  'Narrowed to one of your lists — combine it with a topic below.':
    'مضيَّق إلى إحدى قوائمك — اجمعه مع موضوع بالأسفل.',
  'Question source': 'مصدر الأسئلة',
  'Coming soon': 'قريبًا',
  'Source filtering arrives with the next content release.':
    'تصفية المصدر تصل مع إصدار المحتوى القادم.',
  'none yet': 'لا شيء بعد',
  'questions': 'سؤالًا',
  'Scope': 'النطاق',
  'Clear': 'مسح',
  'Nothing selected — questions are drawn from the whole bank.':
    'لا شيء محدَّد — تُسحب الأسئلة من البنك كله.',
  'Pick a whole chapter, or expand it to choose individual subtopics.':
    'اختر فصلًا كاملًا، أو وسّعه لاختيار مواضيع فرعية بعينها.',
  'Session': 'الجلسة',
  'Name this test': 'سمِّ هذا الاختبار',
  'Optional. Left blank, it is named for what it covers.':
    'اختياري. إن تركته فارغًا، يُسمّى بما يغطيه.',
  'Mode': 'الوضع',
  'Tutor': 'شرح',
  'Timed': 'موقوت',
  'Custom': 'مخصّص',

  /* ---- Summary ------------------------------------------------------- */
  'This test': 'هذا الاختبار',
  'share of the bank this test can draw from': 'نسبة البنك التي يمكن لهذا الاختبار السحب منها',
  'Nothing matches yet': 'لا شيء يطابق بعد',
  'questions ready to serve': 'سؤالًا جاهزًا للعرض',
  'Start test': 'ابدأ الاختبار',
  'questions match': 'سؤالًا مطابقًا',
  'questions ready': 'سؤالًا جاهزًا',
  'the whole bank': 'البنك كله',
  'your flagged questions': 'أسئلتك المعلَّمة',
  'questions you got wrong': 'أسئلة أخطأت فيها',
  'questions you left unanswered': 'أسئلة تركتها بلا إجابة',
  'every topic': 'كل المواضيع',
  '1 topic selected': 'موضوع واحد محدَّد',
  'topics selected': 'موضوعًا محدَّدًا',
  'Tutor mode': 'وضع الشرح',
  'Timed mode': 'الوضع الموقوت',
  'sources': 'مصادر',

  /* ---- The other two tabs -------------------------------------------- */
  'Nothing has collected here yet — flag a question mid-test, or get one wrong, and it waits for you.':
    'لم يتجمّع هنا شيء بعد — علّم سؤالًا أثناء الاختبار، أو أخطئ في واحد، وسينتظرك هنا.',
  'The questions your own sittings singled out. Retest a whole list, or the topics it came from.':
    'الأسئلة التي أفرزتها جلساتك أنت. أعد اختبار قائمة كاملة، أو المواضيع التي جاءت منها.',
  'Every test you sit is kept here with its full report.':
    'كل اختبار تجلس له يُحفظ هنا بتقريره الكامل.',
  'Open a report, review the answers, or sit the same questions again.':
    'افتح تقريرًا، أو راجع الإجابات، أو اجلس للأسئلة نفسها من جديد.',

  /* ---- Unified builder — direction 2 (WP7) ---------------------------- */
  // 'Custom', 'Session' and 'Draw from' are above; 'Practical', 'OSCE stations'
  // and 'Clinical cases' come from the practice package and are not restated
  // here, because a key repeated in this file would silently override it.
  'Which bank?': 'أي بنك؟',
  'MCQ': 'الاختياري',
  'Essay': 'مقالي',
  'Mixed': 'مختلط',
  'Single-best-answer questions, marked against their key.':
    'أسئلة اختيار الإجابة الأفضل، تُصحَّح بمفتاح إجاباتها.',
  'OSCE stations, clinical cases and interpretation sets, run one after another.':
    'محطات OSCE والحالات الإكلينيكية ومجموعات التفسير، تُعرض واحدة بعد الأخرى.',
  'Written questions: write, reveal, then mark yourself against the key points.':
    'أسئلة مقالية: اكتب، ثم اكشف، ثم صحّح لنفسك مقابل النقاط الأساسية.',
  'One queue drawn from all three banks, in whatever proportions you set.':
    'طابور واحد مسحوب من البنوك الثلاثة، بالنسب التي تحدّدها أنت.',

  /* ---- Practical bank ------------------------------------------------- */
  'Kind of item': 'نوع العنصر',
  'Everything': 'كل شيء',
  'Lab & imaging': 'المعمل والأشعة',
  'Stations are timed against a mark scheme; cases and interpretation sets run step by step.':
    'المحطات موقوتة مقابل جدول درجات؛ أما الحالات ومجموعات التفسير فتُعرض خطوة بخطوة.',
  'Systems': 'الأجهزة',
  'Nothing selected — items are drawn from every system.':
    'لا شيء محدَّد — تُسحب العناصر من كل الأجهزة.',
  'Only the systems you picked are drawn from.': 'يُسحب فقط من الأجهزة التي اخترتها.',
  'Nothing has been published for this bank yet.': 'لم يُنشر شيء لهذا البنك بعد.',
  'Number of items': 'عدد العناصر',
  'every practical item': 'كل عنصر عملي',
  'OSCE stations and checklists': 'محطات OSCE وقوائم المهارات',
  'clinical cases': 'الحالات الإكلينيكية',
  'lab and imaging sets': 'مجموعات المعمل والأشعة',
  'every system': 'كل الأجهزة',
  '1 system selected': 'جهاز واحد محدَّد',
  'systems selected': 'جهازًا محدَّدًا',
  'about {n} minutes': 'نحو {n} دقيقة',

  /* ---- Essay bank ----------------------------------------------------- */
  'Each essay is written, then revealed, then marked against its key points by you.':
    'كل سؤال مقالي يُكتب، ثم يُكشف، ثم تصحّحه أنت مقابل نقاطه الأساسية.',
  'All essays': 'كل الأسئلة المقالية',
  'Not written yet': 'لم تُكتب بعد',
  'Nothing selected — essays are drawn from every system.':
    'لا شيء محدَّد — تُسحب الأسئلة المقالية من كل الأجهزة.',
  'Number of essays': 'عدد الأسئلة المقالية',
  'every essay': 'كل الأسئلة المقالية',
  'essays you have not written yet': 'أسئلة مقالية لم تكتبها بعد',

  /* ---- Mixed bank ----------------------------------------------------- */
  'How long': 'الطول',
  'One queue, run in order. Each item opens in the runner its own bank uses.':
    'طابور واحد يُعرض بالترتيب. كل عنصر يُفتح في مشغّل بنكه هو.',
  'Split between the banks': 'التوزيع بين البنوك',
  'Balance': 'وازِن',
  'MCQ questions': 'أسئلة اختيار من متعدد',
  'Practical items': 'عناصر عملية',
  'Essays': 'أسئلة مقالية',
  'of {n} available': 'من {n} متاح',
  'The three add up to {chosen} — the sitting is {total}.':
    'مجموع الثلاثة {chosen} — والجلسة {total}.',
  'items chosen': 'عنصرًا مختارًا',
  'items chosen — adjust or press Balance': 'عنصرًا مختارًا — عدّل أو اضغط وازِن',
  'Nothing chosen yet': 'لم يُختر شيء بعد',

  /* ---- Mixed runner --------------------------------------------------- */
  'Mixed test': 'اختبار مختلط',
  'Item {n} of {total}': 'العنصر {n} من {total}',
  'MCQ question': 'سؤال اختيار من متعدد',
  'Practical item': 'عنصر عملي',
  'End test': 'أنهِ الاختبار',
  'Next item': 'العنصر التالي',
  'See results': 'اعرض النتائج',
  'Explanation': 'الشرح',
  'This item is no longer published': 'لم يعد هذا العنصر منشورًا',
  'Loading this item…': 'جارٍ تحميل هذا العنصر…',
  'Its bank has not finished loading. Give it a moment, or skip ahead.':
    'لم ينتهِ بنكه من التحميل. امهله لحظة، أو تخطَّ إلى التالي.',
  'It was withdrawn after this test was built. The rest of the sitting is unaffected.':
    'سُحب بعد بناء هذا الاختبار. بقية الجلسة لم تتأثر.',

  /* ---- Mixed report --------------------------------------------------- */
  'Mixed test report': 'تقرير الاختبار المختلط',
  'One sitting, three banks. Each is reported in the terms it is actually marked in — only the MCQ line is an accuracy.':
    'جلسة واحدة، ثلاثة بنوك. كل بنك يُقاس بما يُصحَّح به فعلًا — وسطر الاختيار من متعدد وحده نسبة دقة.',
  'What you worked through': 'ما مررت به',
  'This sitting': 'هذه الجلسة',
  'items reached': 'عنصرًا وصلت إليه',
  'Marked against a key': 'مصحَّح بمفتاح إجابات',
  'Correct': 'صحيح',
  'Time': 'الوقت',
  'Back to the bank': 'العودة إلى البنك',
  'none answered': 'لم تُجب عن شيء',
  '{correct} of {marked} correct': '{correct} صحيحة من {marked}',
  'nothing recorded — practical items are ticked against their own mark scheme':
    'لم يُسجَّل شيء — العناصر العملية تُؤشَّر مقابل جدول درجاتها',
  '{n} recorded against their mark scheme': '{n} مسجَّلة مقابل جدول درجاتها',
  'self-marked — no key points ticked': 'تصحيح ذاتي — لم تُؤشَّر نقاط أساسية',
  '{covered} of {total} key points ticked': '{covered} من {total} نقطة أساسية مؤشَّرة',
  '{n} min': '{n} دقيقة',
  '{n} sec': '{n} ثانية',

  /* ---- Bank-first hub, draw-from pools, typed sittings (WP10) ---------- */
  'All items': 'كل العناصر',
  'All banks': 'كل البنوك',
  'Missed': 'الفائت',
  'Flag': 'علّم',
  'Remove the flag from': 'أزل العلامة عن',
  'What it can draw from': 'ما يمكن السحب منه',
  'Every practical item published for you.': 'كل عنصر عملي منشور لك.',
  'Narrowed to one of your own lists — the systems and length below still apply.':
    'محصور في إحدى قوائمك — وتظل الأجهزة والعدد أدناه سارية.',
  'Every bank, everything published in it.': 'كل بنك، وكل ما نُشر فيه.',
  'Each bank contributes only what you flagged or missed in it.':
    'كل بنك يساهم بما علّمته أو فاتك فيه فقط.',
  'the whole practical bank': 'البنك العملي كله',
  'what you flagged': 'ما علّمته',
  'what you missed': 'ما فاتك',
  'Nothing flagged in the practical bank yet. Flag an item while sitting it, or from this list.':
    'لا شيء معلَّم في البنك العملي بعد. علّم عنصرًا أثناء أدائه، أو من هذه القائمة.',
  'Nothing flagged in the essay bank yet. Flag a question while writing it, or from this list.':
    'لا شيء معلَّم في بنك المقالي بعد. علّم سؤالًا أثناء كتابته، أو من هذه القائمة.',
  'Nothing has collected here yet. Sit a practical item and whatever did not go well waits for you.':
    'لم يتجمع هنا شيء بعد. أدِّ عنصرًا عمليًا وسينتظرك هنا ما لم يسر على ما يرام.',
  'Nothing has collected here yet. Mark an essay, and anything short of half the key points waits for you.':
    'لم يتجمع هنا شيء بعد. صحّح مقالًا، وسينتظرك هنا كل ما قلّ عن نصف النقاط الأساسية.',
  'Nothing matches this yet. Widen the kind or the systems above.':
    'لا شيء يطابق هذا بعد. وسّع نوع العنصر أو الأجهزة أعلاه.',
  'Nothing matches this yet. Widen the systems above, or draw from every essay.':
    'لا شيء يطابق هذا بعد. وسّع الأجهزة أعلاه، أو اسحب من كل المقالات.',

  /* ---- Quick start deck ------------------------------------------------ */
  'Start this': 'ابدأ هذا',
  'Previous quick start': 'البداية السريعة السابقة',
  'Next quick start': 'البداية السريعة التالية',

  /* ---- Leaving a mixed sitting ----------------------------------------- */
  'Leave this test?': 'مغادرة هذا الاختبار؟',
  'The sitting is kept where it is — everything you have already done is recorded, and coming back opens the same item.':
    'تبقى الجلسة كما هي — كل ما أنجزته مسجَّل، والعودة تفتح العنصر نفسه.',
  'Stay in the test': 'ابقَ في الاختبار',
  'Leave, and keep it': 'غادر مع الاحتفاظ به',
  'End the test and see the report': 'أنهِ الاختبار واعرض التقرير',

  /* ---- Previous tests, of every kind ----------------------------------- */
  'Every test you sit is kept here with its full report, whichever bank it came from.':
    'كل اختبار تؤديه محفوظ هنا بتقريره الكامل، من أي بنك جاء.',
  'No tests of this kind yet': 'لا اختبارات من هذا النوع بعد',
  'Build one above and it will be kept here, with what it was made of.':
    'كوّن واحدًا أعلاه وسيُحفظ هنا، بما تكوّن منه.',
  'No longer published': 'لم يعد منشورًا',
  'Show': 'إظهار',
  'Hide': 'إخفاء',
  'not marked': 'غير مصحَّح',
  'not marked yet': 'لم يُصحَّح بعد',
  'key points': 'نقاط أساسية',
  'recorded': 'مسجَّل',
  'reached': 'وصلت إليه',
  'passed': 'ناجح',
  'correct': 'صحيحة',
  'practical': 'عملي',
  'essay': 'مقالي',
  'essays': 'مقالات',
  'practical item': 'عنصر عملي',
  'practical items': 'عناصر عملية',

  /* ---- Mixed report, corrected ----------------------------------------- */
  'One sitting, three banks. Each is reported in the terms it is actually marked in — an accuracy for MCQs, a pass for practicals, key points for essays.':
    'جلسة واحدة، ثلاثة بنوك. كل بنك يُقاس بما يُصحَّح به فعلًا — نسبة دقة للاختيار من متعدد، ونجاح للعملي، ونقاط أساسية للمقالي.',
  'Items with a result': 'عناصر لها نتيجة',
  'Correct or passed': 'صحيح أو ناجح',
  '{correct} of {marked} passed': '{correct} ناجحة من {marked}',

  /* ---- Topic chooser, redesigned (WP12) -------------------------------- */
  'Search chapters…': 'ابحث في الفصول…',
  'Search chapters': 'البحث في الفصول',
  'Select all': 'حدد الكل',
  '{n} chapter': 'فصل واحد',
  '{n} chapters': '{n} فصلًا',
  '{n} question': 'سؤال واحد',
  '{n} questions': '{n} سؤالًا',
  '{n} of {m}': '{n} من {m}',
  '{k} selected · {q}': '{k} محدد · {q}',
  'Nothing selected': 'لم تحدد شيئًا',
  'nothing published yet': 'لا شيء منشور بعد',
  'No chapters match that search.': 'لا فصول تطابق هذا البحث.',
  '{chapters} in scope · {questions}. Nothing selected draws from the whole bank.':
    '{chapters} ضمن النطاق · {questions}. إن لم تحدد شيئًا فالسحب من البنك كله.',

  // ---- Scope tree and bank presets (WP15 Arabic sweep)
  'By module': 'حسب المقرر',
  'By system': 'حسب الجهاز',
  'By subject': 'حسب المادة',
  'Browse by system instead': 'تصفَّح حسب الجهاز بدلًا من ذلك',
  'Loading modules…': 'جارٍ تحميل المقررات…',
  'No modules are mapped for this year yet.': 'لم تُربط مقررات بهذه السنة الدراسية بعد.',
  'Every question available to your university and year, mixed into a new random order.':
    'كل سؤال متاح لجامعتك وسنتك الدراسية، ممزوجًا في ترتيب عشوائي جديد.',
  'Questions authored as moderate, hard, or challenging for focused reasoning practice.':
    'أسئلة مؤلَّفة بمستوى متوسط أو صعب أو تحدٍّ، لتدريب مركَّز على الاستدلال.',
  'Questions from subjects where your marked answers show the lowest accuracy, once there is enough evidence.':
    'أسئلة من المواد التي تُظهر إجاباتك المصحّحة فيها أقل دقة، متى توفّرت أدلة كافية.',
  'Acute and emergency-care questions selected from their authored topics and tags.':
    'أسئلة الحالات الحادة والطوارئ، مختارة من موضوعاتها ووسومها المؤلَّفة.',
  'No questions have been published yet': 'لم تُنشر أي أسئلة بعد',
  'Questions appear here once they are published. Nothing is lost — your progress and saved sessions are kept.':
    'تظهر الأسئلة هنا بمجرد نشرها. ولا يضيع شيء — يبقى تقدّمك وجلساتك المحفوظة كما هي.',
  'None of these questions are published any more': 'لم يعد أي من هذه الأسئلة منشورًا',

  // ---- Running a test
  'Question navigator': 'مُتصفِّح الأسئلة',
  'Jump to question': 'الانتقال إلى سؤال',
  'Choose answer': 'اختر الإجابة',
  'Rule out': 'استبعاد',
  'Rule back in': 'إعادة الترشيح',
  'Exclude this answer': 'استبعاد هذه الإجابة',
  'Include this answer again': 'إعادة تضمين هذه الإجابة',
  'Marked for review': 'مُعلَّم للمراجعة',
  'marked for review': 'مُعلَّم للمراجعة',
  'not yet answered': 'لم تُجَب بعد',
  'Time remaining': 'الوقت المتبقي',
  'Elapsed time': 'الوقت المنقضي',
  'Total time': 'إجمالي الوقت',
  'in': 'في',
  'End': 'إنهاء',
  'End this test': 'إنهاء هذا الاختبار',
  'End this test?': 'إنهاء هذا الاختبار؟',
  'End and submit': 'إنهاء وتسليم',
  'Leave for now': 'اتركه الآن',
  'Marks your answers and opens your results.': 'يُصحِّح إجاباتك ويفتح نتائجك.',
  'Marks what you answered and opens your results. Anything left is counted as omitted.':
    'يُصحِّح ما أجبت عنه ويفتح نتائجك. وكل ما تُرك يُحسب متروكًا.',
  'The test stays where it is. Pick it up from the Question Bank whenever you like.':
    'يبقى الاختبار كما هو. أكمله من بنك الأسئلة متى شئت.',
  'Your test is paused. Choose whether to keep it for later or end and submit it before continuing.':
    'اختبارك متوقف مؤقتًا. اختر إبقاءه لوقت لاحق أو إنهاءه وتسليمه قبل المتابعة.',
  'Saving…': 'جارٍ الحفظ…',
  'Split view': 'عرض مقسوم',
  'Single column': 'عمود واحد',
  'Study tools': 'أدوات المذاكرة',

  // ---- Explanation, notes and highlighting
  'After you answer': 'بعد أن تجيب',
  'The concepts this question tests, what a correct answer proves, and the article that teaches it all open once you commit to an option.':
    'المفاهيم التي يختبرها هذا السؤال، وما تُثبته الإجابة الصحيحة، والمقال الذي يشرحه — كلها تُفتح بمجرد تثبيت اختيارك.',
  'Answer explanations': 'شرح الإجابات',
  'Answer review': 'مراجعة الإجابات',
  'Review the question explanation': 'راجع شرح السؤال',
  'Correct answer': 'الإجابة الصحيحة',
  'Why the right answer is right': 'لماذا الإجابة الصحيحة صحيحة',
  'Why this is wrong': 'لماذا هذه خاطئة',
  'What this proves': 'ما تُثبته هذه الإجابة',
  'Where this is taught': 'أين يُدرَّس هذا',
  'Concepts tested': 'المفاهيم المُختبَرة',
  'No concept is tagged on this question yet.': 'لا يوجد مفهوم موسوم على هذا السؤال بعد.',
  'No article is linked to this question yet.': 'لا يوجد مقال مرتبط بهذا السؤال بعد.',
  'No learning objective was recorded.': 'لم يُسجَّل هدف تعليمي.',
  'Back to question': 'العودة إلى السؤال',
  'Reviewing': 'مراجعة',
  'Your notes': 'ملاحظاتك',
  'Notes for this question': 'ملاحظات هذا السؤال',
  'Only you can see this.': 'أنت وحدك من يرى هذا.',
  'What did you think, and what caught you out?': 'بمَ فكّرت، وما الذي أوقعك؟',
  'Make card': 'إنشاء بطاقة',
  'Remove highlight': 'إزالة التظليل',
  'Click to remove this highlight': 'انقر لإزالة هذا التظليل',

  // ---- Results, pace bands and previous tests
  'Full test report': 'تقرير الاختبار الكامل',
  'Accuracy, pace, weak areas, and every marked answer': 'الدقة والسرعة ومواطن الضعف وكل إجابة مصحّحة',
  'Pace distribution': 'توزيع السرعة',
  'Good · 45s or less': 'جيد · 45 ثانية أو أقل',
  'Target · 46–60s': 'المستهدف · 46–60 ثانية',
  'Slower · 61–90s': 'أبطأ · 61–90 ثانية',
  'Overtime · over 90s': 'وقت إضافي · أكثر من 90 ثانية',
  'overtime': 'وقت إضافي',
  'Weakest here': 'الأضعف هنا',
  'This activity was not marked against a key.': 'لم يُصحَّح هذا النشاط مقابل نموذج إجابة.',
  'Not retained for this legacy attempt': 'غير محفوظ لهذه المحاولة القديمة',
  'Revisit the missed answers below, then retake the same scope with fresh questions.':
    'راجع الإجابات الخاطئة أدناه، ثم أعد النطاق نفسه بأسئلة جديدة.',
  'Review the missed answers below, then retake the same scope with fresh questions.':
    'راجع الإجابات الخاطئة أدناه، ثم أعد النطاق نفسه بأسئلة جديدة.',
  'and retest it while the reasoning is still fresh.': 'وأعد اختبارها والاستدلال ما زال طازجًا.',
  'before your next block; these topics have cost marks more than once.':
    'قبل فترتك التالية؛ فهذه الموضوعات كلّفتك درجات أكثر من مرة.',
  'This block is secure. Keep the spacing effect by revisiting it later rather than repeating it immediately.':
    'هذه الفترة راسخة. حافظ على أثر التباعد بمراجعتها لاحقًا بدل تكرارها فورًا.',
  'Your next gain is pace: use a short timed block and aim to commit each answer by 60 seconds.':
    'مكسبك التالي هو السرعة: استخدم فترة موقوتة قصيرة واستهدف تثبيت كل إجابة خلال 60 ثانية.',
  'Retake these questions': 'أعد هذه الأسئلة',
  'retake': 'إعادة',
  'New test, same scope': 'اختبار جديد بالنطاق نفسه',
  'No tests yet': 'لا توجد اختبارات بعد',
  'Start a session and it will be kept here, with what you scored.': 'ابدأ جلسة وستُحفظ هنا مع ما أحرزته.',
  'Still open': 'ما زال مفتوحًا',
  'Resume this test': 'استئناف هذا الاختبار',
  'Go back to the open test': 'العودة إلى الاختبار المفتوح',
  'Replace the open test?': 'استبدال الاختبار المفتوح؟',
  'Replace it and start': 'استبدله وابدأ',
  'You have a test still open. Starting a new one replaces it, and anything you have not had marked is lost.':
    'لديك اختبار ما زال مفتوحًا. بدء اختبار جديد يستبدله، ويضيع كل ما لم يُصحَّح.',
  'Delete this test': 'حذف هذا الاختبار',
  'This removes every answer from that sitting. Your overall accuracy and progress will be recalculated without them, and it cannot be undone.':
    'يزيل هذا كل إجابة من تلك الجلسة. وسيُعاد حساب دقتك الإجمالية وتقدّمك بدونها، ولا يمكن التراجع عن ذلك.',
  'Test actions': 'إجراءات الاختبار',
  'Selection actions': 'إجراءات التحديد',
  'Actions for': 'إجراءات',
  // ---- Sitting runner (WP15b)
  'Finish review': 'أنهِ المراجعة',
}
