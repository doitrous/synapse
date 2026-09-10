/**
 * Arabic for the Tutorial guide (WP20).
 *
 * Owned by that package alone — every package writes only its own file, so two
 * agents adding strings on the same day cannot collide in `i18n-ar.ts`.
 *
 * The twenty-seven `instructions` paragraphs from `src/data/tutorials.ts` are
 * here too, at the end: a later content pass translated them in one go, so an
 * Arabic student now reads an entirely Arabic page rather than a translated
 * chrome around English prose. `matchesTutorialQuery` searches these strings as
 * well as their English sources, so typing what is on screen finds it.
 */
export const AR_TUTORIAL: Record<string, string> = {
  // page chrome
  'Learn how Nishany works': 'تعرّف على طريقة عمل نيشاني',
  'A short guide and a short video for every part of the app. Pick a section, then a topic — or search for what you are trying to do.':
    'دليل قصير ومقطع قصير لكل جزء من التطبيق. اختر قسمًا ثم موضوعًا — أو ابحث عمّا تحاول فعله.',
  'Search the guide…': 'ابحث في الدليل…',
  'Sections': 'الأقسام',
  'Getting started': 'البداية',
  '{k} of {n} have a video · {r} read': '{k} من {n} بها مقطع · {r} مقروء',
  'Has a video': 'به مقطع',
  'Marked as read': 'مُعلَّم كمقروء',
  'Open {page}': 'افتح {page}',
  // fix round 1: the hub boxes say what their number counts, and the index
  // needs a name of its own while a search owns it instead of a section.
  'matches': 'نتيجة مطابقة',
  'Search results': 'نتائج البحث',

  // topic labels the older dictionaries never carried
  'Question Bank split view & highlighting': 'العرض المنقسم والتظليل في بنك الأسئلة',
  'Notebook Word-style editor': 'محرر المفكرة بنمط وورد',
  'Fullscreen button': 'زر ملء الشاشة',

  // step cards — Plan
  'Open the calendar': 'افتح التقويم',
  'Exams, module deadlines and the to-do list you keep beside them.': 'الامتحانات ومواعيد الوحدات وقائمة المهام التي تحتفظ بها بجانبها.',
  'Read the performance page': 'اقرأ صفحة الأداء',
  'Accuracy and coverage per subject, so the week aims at the weak ones.': 'الدقة والتغطية لكل مادة، حتى يستهدف الأسبوع أضعفها.',
  'Confirm the scope': 'تأكّد من النطاق',
  'The University page states the year and curriculum everything else is filtered by.': 'صفحة الجامعة تحدد السنة والمنهج اللذين يُرشَّح بهما كل شيء آخر.',

  // step cards — Learn
  'Pick what you are reading': 'اختر ما تقرأه',
  'Terminology, Resources and the Library sit as cards on the hub.': 'المصطلحات والمصادر والمكتبة موجودة كبطاقات في الصفحة.',
  'Watch the ring': 'راقب الحلقة',
  'Each card carries how far through that material you already are.': 'كل بطاقة تحمل مقدار ما أنجزته من تلك المادة.',
  'Come back for help': 'عُد إلى المساعدة',
  'This Tutorial is a card on the same hub, so the guide is never far.': 'هذا الشرح بطاقة في الصفحة نفسها، فالدليل ليس بعيدًا أبدًا.',

  // step cards — Practice
  'Choose the format': 'اختر الصيغة',
  'Question Bank, Practical stations or Essay — the three formats the exams use.': 'بنك الأسئلة أو المحطات العملية أو المقالي — الصيغ الثلاث التي تستخدمها الامتحانات.',
  'Work through a card': 'ابدأ من بطاقة',
  'Each card opens its bank with the scope you last used.': 'كل بطاقة تفتح بنكها بالنطاق الذي استخدمته آخر مرة.',
  'Watch the coverage': 'راقب التغطية',
  'The ring on every card is how much of that bank you have already answered.': 'الحلقة في كل بطاقة هي مقدار ما أجبته من ذلك البنك.',

  // step cards — Revise
  'Write it down': 'اكتبه',
  'Notebook holds your own notes, including the ones you attach to questions.': 'المفكرة تحفظ ملاحظاتك، بما فيها التي تُرفقها بالأسئلة.',
  'Draw it out': 'ارسمه',
  'Whiteboard is a free canvas that saves itself as you work.': 'السبورة لوح حر يحفظ نفسه أثناء عملك.',
  'Sit what is due': 'ذاكر المستحق اليوم',
  'Flashcards shows the cards spaced repetition has scheduled for today.': 'البطاقات تعرض ما جدوله التكرار المتباعد لهذا اليوم.',

  // step cards — Question Bank
  'Choose the bank': 'اختر البنك',
  'The four boxes at the top of the page. Mixed draws from all three.': 'المربعات الأربعة أعلى الصفحة. «مختلط» يسحب من الثلاثة جميعًا.',
  'Set the scope': 'حدّد النطاق',
  'Draw from everything, from what you flagged, from what you missed, or open the topic chooser.': 'اسحب من كل شيء، أو مما علّمته، أو مما أخطأت فيه، أو افتح مُنتقي الموضوعات.',
  'Start, then review': 'ابدأ ثم راجع',
  'Timed or tutor mode. The sitting lands in Previous tests when you finish.': 'وضع موقوت أو وضع الشرح. تُحفظ الجلسة في «الاختبارات السابقة» عند انتهائك.',

  // step cards — Flashcards
  'Pick a deck': 'اختر حزمة',
  'Your own decks and the ones shared with your year sit side by side.': 'حزمك الخاصة والحزم المشتركة مع دفعتك جنبًا إلى جنب.',
  'Grade every card': 'قيّم كل بطاقة',
  'Again, hard, good or easy — the grade decides when the card comes back.': 'مرة أخرى أو صعبة أو جيدة أو سهلة — التقييم يحدد موعد عودتها.',
  'Study what is due': 'ذاكر المستحق',
  'The deck list carries today’s due count, so a short session is always defined.': 'قائمة الحزم تحمل عدد المستحق اليوم، فالجلسة القصيرة محددة دائمًا.',

  // step cards — Study Rooms
  'Join or open a room': 'انضم إلى غرفة أو افتح واحدة',
  'Use a room code, or open a room for your university and year.': 'استخدم رمز الغرفة، أو افتح غرفة لجامعتك وسنتك.',
  'Take a desk': 'اجلس على مكتب',
  'Pick your seat and device; the room shows who is working and who is speaking.': 'اختر مقعدك وجهازك؛ تُظهر الغرفة من يعمل ومن يتحدث.',
  'Sit a paper together': 'اجلسوا لورقة واحدة معًا',
  'A shared test runs for everyone at the desks at once.': 'يعمل الاختبار المشترك للجميع على المكاتب في وقت واحد.',

  // instructions paragraphs (content pass — WP20)
  'Your Dashboard is the first thing you see when you sign in. It shows what to study next, your recent scores, and any reminders your university has posted. Tap a suggested card to jump straight into a question set, a review, or an upcoming deadline. Check back here whenever you are not sure what to do next — it is built to answer exactly that.':
    'صفحتك الرئيسية هي أول ما تراه عند تسجيل الدخول. تعرض ما ينبغي مذاكرته تاليًا، ودرجاتك الأخيرة، وأي تذكيرات نشرتها جامعتك. اضغط على بطاقة مقترحة للانتقال مباشرة إلى مجموعة أسئلة، أو مراجعة، أو موعد نهائي قادم. عُد إليها كلما لم تكن متأكدًا مما تفعله تاليًا — فهي مصمَّمة لتجيب عن هذا بالضبط.',
  'The University page shows your enrolled university, year, and curriculum, along with the modules and subjects scheduled for your term. Use it to confirm you are seeing content for the right year and to understand how your course is structured. If your enrolment looks wrong, this is also where you can request a change.':
    'صفحة الجامعة تعرض جامعتك وسنتك الدراسية ومنهجك المسجَّلين، إلى جانب الوحدات والمواد المقررة لفصلك الدراسي. استخدمها للتأكد من أنك ترى محتوى سنتك الصحيحة، ولفهم كيفية بناء مقررك. وإذا بدا تسجيلك خاطئًا، فهذه أيضًا الصفحة التي تطلب منها تعديله.',
  'Calendar lays out your exams, module deadlines, and study events in one place. Switch between month and list views, and tap any entry for details. Events your university has scheduled appear automatically — add your own personal reminders alongside them to keep everything in one view.':
    'التقويم يرتّب امتحاناتك ومواعيد تسليم الوحدات وفعاليات المذاكرة في مكان واحد. بدّل بين عرض الشهر وعرض القائمة، واضغط على أي مدخل لتفاصيله. تظهر الفعاليات التي جدولتها جامعتك تلقائيًا — أضف تذكيراتك الشخصية بجانبها لتبقى كل الأمور في نظرة واحدة.',
  'This page is the tutorial itself — a short written guide plus a short video for every part of the platform. Use the search box to jump straight to the function you have a question about, or scroll through by section. New to Nishany? Start at the top and work down.':
    'هذه الصفحة هي الشرح نفسه — دليل مكتوب قصير مع مقطع قصير لكل جزء من المنصة. استخدم مربع البحث للانتقال مباشرة إلى الوظيفة التي لديك سؤال عنها، أو تصفَّح حسب القسم. جديد على نيشاني؟ ابدأ من الأعلى وانزل تدريجيًا.',
  'Plan gathers everything about your time: the Calendar with its to-do list, your Performance, and — when it opens — your University page. Open it when you want to decide what the week looks like rather than what to study next.':
    '«الخطة» تجمع كل ما يخص وقتك: التقويم بقائمة مهامه، والأداء، وصفحة الجامعة عندما تُفتح. افتحها حين تريد تحديد شكل الأسبوع لا ما تذاكره تاليًا.',
  'Performance tracks your accuracy, speed, and coverage across every subject and question type you have attempted. Use the breakdowns to see exactly which subjects need more attention before your next exam, and watch your trend over time rather than just your latest score.':
    'الأداء يتتبَّع دقتك وسرعتك وتغطيتك عبر كل مادة ونوع أسئلة خضته. استخدم التفصيلات لترى بالضبط أي المواد تحتاج مزيدًا من الاهتمام قبل امتحانك القادم، وراقب اتجاهك عبر الوقت لا درجتك الأخيرة وحدها.',
  'Build Maristanas lets you assemble a custom study block — choosing subjects, question counts, and formats — tailored to how you want to prepare for a specific exam or block. Save a configuration once and reuse it, or build a fresh one each time your priorities change.':
    '«ابنِ المارستانات» يتيح لك تجميع فترة مذاكرة مخصَّصة — باختيار المواد وعدد الأسئلة والصيغ — مصمَّمة على مقاس استعدادك لامتحان أو وحدة بعينها. احفظ إعدادًا مرة واحدة وأعد استخدامه، أو ابنِ إعدادًا جديدًا كلما تغيّرت أولوياتك.',
  'Learn holds the material you read and look things up in: Medical Terminology, Resources, and this Tutorial, with the Library to come. Each card shows how far you have got, so you can see at a glance what is still untouched.':
    '«تعلّم» يضم المادة التي تقرأها وتبحث فيها: المصطلحات الطبية، والمصادر، وهذا الشرح، والمكتبة القادمة قريبًا. كل بطاقة تُظهر مقدار ما أنجزته منها، فترى بنظرة واحدة ما لم تلمسه بعد.',
  'The Library holds every book, guideline, deck, and video for your course, organised by subject or module. Filter by type, subject, university, or year, and bookmark anything you want to find again quickly. Opening a document takes you straight to the reader at the right page when one is recorded.':
    'المكتبة تضم كل كتاب ودليل إرشادي ومجموعة بطاقات ومقطع فيديو لمقررك، مرتَّبة حسب المادة أو الوحدة. صفِّ حسب النوع أو المادة أو الجامعة أو السنة، وأضف إشارة مرجعية لأي شيء تريد الرجوع إليه بسرعة. فتح مستند ينقلك مباشرة إلى القارئ عند الصفحة الصحيحة متى كانت مسجَّلة.',
  'Resources is your combined view of everything to read or watch: the shared Library, videos, and your own uploads, in one place. Switch between Files, Videos, and My uploads at the top, and organise the list by system or by module — whichever matches how you study.':
    'المصادر هي عرضك الموحَّد لكل ما يمكن قراءته أو مشاهدته: المكتبة المشتركة، والفيديوهات، وما رفعته أنت، في مكان واحد. بدّل بين «الملفات» و«الفيديوهات» و«ما رفعته» أعلى الصفحة، ورتّب القائمة حسب الجهاز أو الوحدة — أيهما يناسب طريقة مذاكرتك.',
  'Medical Terminology is the bilingual dictionary of the terms you meet first: each card carries the English term, its Arabic, a plain explanation and an example. Browse by category, flip a card to check yourself, mark the ones you know, and send the rest to flashcards, the Term Grid crossword or Term Match.':
    'المصطلحات الطبية قاموس ثنائي اللغة للمصطلحات التي تقابلها أولًا: كل بطاقة تحمل المصطلح الإنجليزي، ومقابله العربي، وشرحًا مبسَّطًا، ومثالًا. تصفَّح حسب الفئة، واقلب البطاقة لاختبار نفسك، وعلِّم ما تعرفه، وأرسل الباقي إلى البطاقات، أو شبكة المصطلحات، أو مطابقة المصطلحات.',
  'Practice is every format your exams use: the Question Bank, Practical (OSCE stations, clinical cases, lab and imaging), Oral questions, Skills, Essay and Histology. Start from a card, and its ring tells you how much of that bank you have already worked through.':
    '«التدريب» يضم كل صيغة تستخدمها امتحاناتك: بنك الأسئلة، والعملي (محطات OSCE، والحالات الإكلينيكية، والمعمل والأشعة)، والأسئلة الشفوية، والمهارات، والمقالي، والأنسجة. ابدأ من بطاقة، وتخبرك حلقتها بمقدار ما أنجزته من ذلك البنك.',
  'Question Bank is where you practise exam-style questions by subject, topic, or past paper. Answer a question, check the explanation, and your result feeds your Performance stats automatically. Use the filters to focus on a weak topic, or start a mixed set to simulate exam conditions.':
    'بنك الأسئلة هو حيث تتدرَّب على أسئلة بنمط الامتحان حسب المادة أو الموضوع أو ورقة سابقة. أجب عن سؤال، وراجع الشرح، وتُغذّي نتيجتك إحصاءات الأداء تلقائيًا. استخدم عوامل التصفية للتركيز على موضوع ضعيف، أو ابدأ مجموعة مختلطة لمحاكاة ظروف الامتحان.',
  'While answering a question with a source passage attached, open split view to read the passage and the question side by side instead of switching screens. Select any text in the passage to highlight it — your highlights are saved and reappear the next time you open that source, so you can build up your own markup as you study.':
    'أثناء إجابتك عن سؤال مرفق به مقطع من مصدر، افتح العرض المنقسم لتقرأ المقطع والسؤال جنبًا إلى جنب بدل التنقل بين الشاشات. حدِّد أي نص في المقطع لتظليله — تُحفظ تظليلاتك وتظهر من جديد في المرة القادمة التي تفتح فيها هذا المصدر، فتبني تعليماتك الخاصة عليه أثناء مذاكرتك.',
  'Adaptive Study builds a personalised question set based on what you have gotten right, wrong, or not yet tried. The more you use it, the better it targets your weak spots instead of repeating what you already know. Start a session whenever you want focused practice without picking topics yourself.':
    'الدراسة التكيّفية تبني مجموعة أسئلة مخصَّصة لك بناءً على ما أجبته صحيحًا أو خاطئًا أو لم تجرّبه بعد. كلما استخدمتها أكثر، ازدادت دقتها في استهداف نقاط ضعفك بدل تكرار ما تعرفه بالفعل. ابدأ جلسة كلما أردت تدريبًا مركَّزًا دون اختيار المواضيع بنفسك.',
  'Essay questions let you write a full, structured answer rather than pick from options — the format used in written exams. Draft your answer, save it, and compare it against the model answer and marking points once you are done. Your drafts are saved automatically as you type.':
    'الأسئلة المقالية تتيح لك كتابة إجابة كاملة ومنظَّمة بدل الاختيار من خيارات — وهي الصيغة المستخدمة في الامتحانات التحريرية. اكتب مسودة إجابتك واحفظها، وقارنها بالإجابة النموذجية ونقاط التصحيح بعد انتهائك. تُحفظ مسوداتك تلقائيًا أثناء الكتابة.',
  'Revise is where what you learned gets consolidated: your Notebook (including the notes you attach to questions), the Whiteboard, and Flashcards with what is due today.':
    '«مراجعة» هي حيث يترسَّخ ما تعلمته: مفكرتك (بما فيها الملاحظات التي تُرفقها بالأسئلة)، والسبورة، والبطاقات بما هو مستحق اليوم.',
  'Notebook is where you write and organise your own notes, with a full word-processor-style editor: headings, lists, bold and italic text, images, and links to your sources. Create a note from scratch, or capture a quote straight from a Library document into a new note. Notes are searchable and grouped by subject.':
    'المفكرة هي حيث تكتب ملاحظاتك وتنظّمها، بمحرر كامل بنمط معالج النصوص: عناوين وقوائم ونص عريض ومائل وصور وروابط إلى مصادرك. أنشئ ملاحظة من الصفر، أو التقط اقتباسًا مباشرة من مستند في المكتبة إلى ملاحظة جديدة. الملاحظات قابلة للبحث ومجمَّعة حسب المادة.',
  'The Notebook editor works like a familiar word processor: use the toolbar to format headings, bold, italics, and lists, drop in images, and insert links to Library sources without leaving the page. Formatting is saved as part of the note, so your notes look the same every time you reopen them.':
    'محرر المفكرة يعمل مثل معالج نصوص مألوف: استخدم شريط الأدوات لتنسيق العناوين والنص العريض والمائل والقوائم، وأضف صورًا، وأدرج روابط إلى مصادر المكتبة دون مغادرة الصفحة. يُحفظ التنسيق كجزء من الملاحظة، فتبدو ملاحظاتك بالشكل نفسه في كل مرة تفتحها فيها.',
  'Whiteboard is a free drawing canvas for sketching diagrams, annotating images, or working through a problem visually. Add images and files directly onto the board, and everything you draw is saved automatically so you can return to it later.':
    'السبورة لوح رسم حر لتخطيط المخططات، والتعليق على الصور، أو حل مسألة بصريًا. أضف صورًا وملفات مباشرة على اللوح، ويُحفظ كل ما ترسمه تلقائيًا لتعود إليه لاحقًا.',
  'Flashcards uses spaced repetition to help you memorise facts efficiently. Study a deck, mark each card as easy, good, or hard, and the app schedules when to show it to you again. Build your own decks, or study ones shared by your university.':
    'البطاقات تستخدم المراجعة المتباعدة لمساعدتك على حفظ المعلومات بكفاءة. ذاكر حزمة، وقيّم كل بطاقة بسهلة أو جيدة أو صعبة، ويُجدول التطبيق موعد عرضها عليك من جديد. ابنِ حزمك الخاصة، أو ذاكر ما تشاركه جامعتك.',
  'Minigames turns revision into quick, focused challenges — matching, timed recall, and other formats that make repetition less tedious. Pick a subject and a game mode for a few minutes of active practice between longer study sessions.':
    'الألعاب الصغيرة تحوّل المراجعة إلى تحديات سريعة ومركَّزة — مطابقة، واستدعاء موقوت، وصيغ أخرى تجعل التكرار أقل رتابة. اختر مادة ونمط لعبة لدقائق من التدريب النشط بين جلسات المذاكرة الأطول.',
  'Study Rooms put you at a desk with up to twenty classmates from your university and year. Join a room with its code or open one of your own, pick your desk and device, and study alongside the others — the room shows who is working and who is speaking. Shared tests sit in the same place, so a room can sit one paper together.':
    'غرف المذاكرة تضعك على مكتب مع ما يصل إلى عشرين زميلًا من جامعتك وسنتك. انضم إلى غرفة برمزها أو افتح غرفة خاصة بك، واختر مكتبك وجهازك، وذاكر إلى جانب الآخرين — تُظهر الغرفة من يعمل ومن يتحدث. الاختبارات المشتركة موجودة في المكان نفسه، فيمكن لغرفة أن تجلس لورقة واحدة معًا.',
  'Account is where you update your profile details, change your password, control notification preferences, and manage your plan under its Billing tab. Keep your enrolment details accurate here so the content you see always matches your university and year.':
    'الحساب هو حيث تحدّث بيانات ملفك الشخصي، وتغيّر كلمة المرور، وتتحكم في تفضيلات الإشعارات، وتدير خطتك من تبويب الفوترة فيه. حافظ على دقة بيانات تسجيلك هنا حتى يطابق المحتوى الذي تراه جامعتك وسنتك دائمًا.',
  'Billing is a tab on the Account page. It shows your current plan, payment history, and any available vouchers or discounts. Upgrade, renew, or apply a voucher code there — everything about your subscription is managed from that one tab.':
    'الفوترة تبويب في صفحة الحساب. يعرض خطتك الحالية، وسجل مدفوعاتك، وأي قسائم أو خصومات متاحة. رقِّ خطتك، أو جدّدها، أو طبِّق رمز قسيمة من هناك — كل ما يخص اشتراكك يُدار من ذلك التبويب وحده.',
  'The fullscreen button, near the top of the app, expands the current page to fill your whole screen and hides browser chrome — useful when reading a long document, working on the Whiteboard, or focusing during a timed practice set. Press it again, or press Escape, to return to the normal view.':
    'زر ملء الشاشة، بالقرب من أعلى التطبيق، يوسّع الصفحة الحالية لتملأ شاشتك كاملة ويخفي عناصر المتصفح — مفيد عند قراءة مستند طويل، أو العمل على السبورة، أو التركيز أثناء مجموعة تدريب موقوتة. اضغطه من جديد، أو اضغط Escape، للعودة إلى العرض العادي.',
  // ---- WP22: Practical lost three tabs; the three new topics and the
  // rewritten Practical paragraph. Appended, nothing above was touched.
  'Practical is the three formats that are run as a station: OSCE stations, clinical cases, and lab and imaging films. Work through one at your own pace — each shows the clinical context first, then asks you to respond before revealing the answer and explanation. Oral questions, Skills and Histology used to be tabs here and are now their own entries on Practice.':
    'العملي هو الصيغ الثلاث التي تُؤدّى كمحطة: محطات OSCE، والحالات الإكلينيكية، وأفلام المعمل والأشعة. اعمل خلال الواحدة بالسرعة التي تناسبك — تعرض كل منها السياق الإكلينيكي أولًا، ثم تطلب منك الاستجابة قبل كشف الإجابة والشرح. أما الأسئلة الشفوية والمهارات والأنسجة فكانت تبويبات هنا، وصارت الآن مداخل مستقلة في التدريب.',
  'Oral questions is the viva, rehearsed one question at a time. Read what the examiner asks, answer it out loud before you reveal anything, then mark yourself got it, partly, or missed it. The marks are your own record and never count toward your accuracy; the queue beside the question shows how far through the night you are.':
    'الأسئلة الشفوية هي الامتحان الشفوي، تتدرّب عليه سؤالًا واحدًا في كل مرة. اقرأ ما يسأله المصحّح، وأجب بصوت مسموع قبل أن تكشف شيئًا، ثم صحّح لنفسك: فهمتها، أو جزئيًا، أو فاتتني. هذه العلامات سجلّك أنت ولا تُحتسب أبدًا في دقتك؛ ويوضّح الطابور بجانب السؤال كم قطعت من ليلتك.',
  'Skills is the year’s checklist of procedures you are expected to perform. Tap a skill to cycle it: not started, then practised, then ready. It is your own record for planning revision rather than a formal sign-off — an assessor gives that, and it is not recorded here.':
    'المهارات هي قائمة السنة للإجراءات المتوقَّع منك أداؤها. انقر مهارة لتتنقّل بين حالاتها: لم تبدأ، ثم تدرّبت، ثم جاهزة. وهي سجلّك أنت لتخطيط المراجعة لا اعتماد رسمي — فالاعتماد يمنحه مقيّم، ولا يُسجَّل هنا.',
  'Histology is the slide box and the microscope. Pick a slide, then pan and zoom through 4×, 10× and 40× and name what is under the lens. It is marked coming soon because what you name is not scored or carried into your record yet — the bench itself works, and every published slide is on it.':
    'الأنسجة هي صندوق الشرائح والميكروسكوب. اختر شريحة، ثم حرّك وكبّر عبر ٤× و١٠× و٤٠×، وسمِّ ما تحت العدسة. وهي موسومة بـ«قريبًا» لأن ما تسمّيه لا يُصحَّح ولا يُنقل إلى سجلّك بعد — أما المنضدة نفسها فتعمل، وكل شريحة منشورة موجودة عليها.',
  "Start on Dashboard for your daily study target, upcoming exam, and recent activity. Plan opens your calendar, Bank opens the question bank, and Tools holds your study materials. The calendar-with-a-question-mark icon in the top bar opens Question of the Day.": "ابدأ من الرئيسية لمتابعة هدفك الدراسي اليومي والامتحان القادم ونشاطك الأخير. يفتح التخطيط التقويم، ويفتح البنك بنك الأسئلة، وتجمع الأدوات مواد دراستك. تفتح أيقونة التقويم بعلامة الاستفهام في الشريط العلوي سؤال اليوم.",
  "Plan opens Calendar directly. Use Month or Week to organise your study blocks, and switch between Calendar and Tasks on smaller screens. University is a coming-soon control in the calendar toolbar.": "يفتح التخطيط التقويم مباشرة. استخدم عرض الشهر أو الأسبوع لتنظيم فترات الدراسة، وانتقل بين التقويم والمهام على الشاشات الصغيرة. يظهر زر الجامعة في شريط التقويم بوصفه ميزة قادمة قريبًا.",
  "View your timetable and personal study blocks by month or week. Add a block, select a day for its details, and keep your task list alongside the calendar. On a phone, use Calendar and Tasks to choose the view.": "اعرض جدولك وفترات دراستك الشخصية حسب الشهر أو الأسبوع. أضف فترة دراسة، واختر يومًا لعرض تفاصيله، وتابع قائمة مهامك بجانب التقويم. على الهاتف، استخدم زري التقويم والمهام لاختيار العرض.",
  "University is coming soon. Its button sits inside Plan beside the calendar controls. For an enrolment correction, open Account and press Request a university or year change to reveal the request form.": "صفحة الجامعة قادمة قريبًا. يوجد زرها داخل التخطيط بجانب أدوات التقويم. لتصحيح بيانات القيد، افتح الحساب واضغط طلب تغيير الجامعة أو السنة الدراسية لإظهار نموذج الطلب.",
  "The sidebar now calls this section Library. It is marked Coming soon and cannot be opened from the sidebar yet. Medical Terminology, Anatomy Atlas, Whiteboard, Flashcards, Notebook, and Resources are all under Tools.": "أصبح اسم هذا القسم في القائمة الجانبية المكتبة. يظهر بوصفه قادمًا قريبًا ولا يمكن فتحه من القائمة بعد. ستجد المصطلحات الطبية وأطلس التشريح والسبورة والبطاقات ودفتر الملاحظات والمصادر ضمن الأدوات.",
  "Library is coming soon: a place for curriculum-linked articles and reading. Until it opens, use Tools for terminology, reference resources, notes, flashcards, and the Anatomy Atlas demo.": "المكتبة قادمة قريبًا لتضم مقالات وقراءات مرتبطة بمنهجك. إلى أن تُتاح، استخدم الأدوات للوصول إلى المصطلحات والمصادر المرجعية والملاحظات والبطاقات والنسخة التجريبية من أطلس التشريح.",
  "Tools sits below Library. Its cards are ordered Medical Terminology, Anatomy Atlas, Whiteboard, Flashcards, Notebook, then Resources. Open a card to use the tool; choose Demo on Anatomy Atlas to explore the available anatomy models.": "توجد الأدوات أسفل المكتبة. ترتيب البطاقات هو المصطلحات الطبية، ثم أطلس التشريح، فالسبورة، فالبطاقات، ثم دفتر الملاحظات والمصادر. افتح بطاقة لاستخدام الأداة، أو اختر تجريبي في أطلس التشريح لاستكشاف النماذج المتاحة.",
  "Open Tools, then Resources, for shared reading materials, videos, and your own uploads. Switch between Files, Videos, and My uploads, and organise the list by system or module. Bookmarks and recently opened items help you return to useful references.": "افتح الأدوات ثم المصادر للوصول إلى مواد القراءة المشتركة والفيديوهات وملفاتك المرفوعة. انتقل بين الملفات والفيديوهات وملفاتي، ورتّب القائمة حسب الجهاز أو المقرر. تساعدك العلامات المرجعية والعناصر المفتوحة مؤخرًا على العودة إلى المراجع المفيدة.",
  "Practice sits below Bank and brings together Performance, Oral questions, Skills, Adaptive Study, and Histology Lab. Oral questions and Skills are available now. Performance, Adaptive Study, and Histology Lab are marked Coming soon.": "يوجد التدريب أسفل البنك ويجمع الأداء والأسئلة الشفوية والمهارات والدراسة التكيّفية ومختبر الأنسجة. الأسئلة الشفوية والمهارات متاحتان الآن، بينما يظهر الأداء والدراسة التكيّفية ومختبر الأنسجة بوصفها ميزات قادمة قريبًا.",
  "Bank in the sidebar opens Question Bank directly. Build a test from the bank, revisit flagged or missed questions, and choose tutor or timed mode. After answering, read the explanation and return to previous tests to review your work.": "يفتح البنك في القائمة الجانبية بنك الأسئلة مباشرة. أنشئ اختبارًا من البنك، وراجع الأسئلة المعلّمة أو التي أخطأت فيها، واختر وضع التعلم أو الاختبار المؤقت. بعد الإجابة، اقرأ الشرح وارجع إلى الاختبارات السابقة لمراجعة عملك.",
  "Performance is a coming-soon card inside Practice. It will bring your study record and progress together. Your existing question-bank test history and the progress shown on available tools remain accessible.": "الأداء بطاقة قادمة قريبًا داخل التدريب، وستجمع سجل دراستك وتقدّمك. يظل سجل اختبارات بنك الأسئلة والتقدّم المعروض في الأدوات المتاحة قابلين للوصول.",
  "Adaptive Study is coming soon inside Practice. It is intended to organise sessions around the concepts that need more review. For now, choose a focused question-bank test or review the flashcards due today.": "الدراسة التكيّفية قادمة قريبًا داخل التدريب لتنظيم الجلسات حول المفاهيم التي تحتاج مزيدًا من المراجعة. حاليًا، اختر اختبارًا مركّزًا من بنك الأسئلة أو راجع البطاقات المستحقة اليوم.",
  "Histology Lab is coming soon inside Practice. It will provide slide-based anatomy and tissue study. The card marks its availability; oral rehearsal and skills tracking are the currently available practice tools.": "مختبر الأنسجة قادم قريبًا داخل التدريب لدراسة الأنسجة باستخدام الشرائح. توضّح البطاقة حالة إتاحته، ويمكنك حاليًا التدرب على الأسئلة الشفوية ومتابعة المهارات.",
  "Build Maristanas is reached from Minigames. Open it to view your study hospital and the progress you build as you use Nishany.": "يمكن الوصول إلى بناء المارستان من الألعاب المصغرة. افتحه لعرض مستشفاك الدراسي والتقدّم الذي تحققه مع استخدام نيشاني.",
  "Account holds your profile, preferences, billing, security, and data. University and year are recorded after onboarding. Press Request a university or year change to expand the correction form, choose the requested details, and submit a reason for administrator review.": "يجمع الحساب ملفك الشخصي وتفضيلاتك والفوترة والأمان والبيانات. تُسجّل الجامعة والسنة بعد الإعداد الأولي. اضغط طلب تغيير الجامعة أو السنة الدراسية لتوسيع نموذج التصحيح، ثم اختر البيانات المطلوبة وأرسل سبب الطلب لمراجعة الإدارة.",
  "Open the Tools dropdown to the right of Question of the Day in the top bar, then choose Fullscreen. Choose Exit fullscreen from the same menu, or press Escape, to return. The menu also contains Search and Hide menus; on phones it includes the focus timer and audio controls.": "افتح قائمة الأدوات بجوار سؤال اليوم في الشريط العلوي، ثم اختر ملء الشاشة. اختر الخروج من ملء الشاشة من القائمة نفسها أو اضغط Escape للعودة. تضم القائمة أيضًا البحث وإخفاء القوائم، وعلى الهاتف تضم مؤقت التركيز والتحكم في الصوت.",
  "Use the calendar-with-a-question-mark icon in the top bar to open Question of the Day. Answer the daily question there, or review your answer. The icon stays compact on phones.": "استخدم أيقونة التقويم بعلامة الاستفهام في الشريط العلوي لفتح سؤال اليوم. أجب عن السؤال اليومي أو راجع إجابتك. تظل الأيقونة صغيرة على الهاتف.",
  "Open Tools, then press Demo on Anatomy Atlas. Choose the male or female model, search for a structure, and use the system controls to explore the anatomy. Use the Tools button in the viewer to return.": "افتح الأدوات ثم اضغط تجريبي في أطلس التشريح. اختر النموذج الذكري أو الأنثوي، وابحث عن تركيب، واستخدم أدوات الأجهزة لاستكشاف التشريح. استخدم زر الأدوات داخل العارض للعودة.",
  "The Appearance and Language buttons sit side by side at the bottom of the sidebar. Press either to open its selector, then choose a theme or language. In the collapsed sidebar, the same controls appear as icons.": "يوجد زرا المظهر واللغة بجانب بعضهما أسفل القائمة الجانبية. اضغط أحدهما لفتح خياراته، ثم اختر المظهر أو اللغة. عند طي القائمة الجانبية، يظهر الزران كأيقونتين.",
  "Library availability": "إتاحة المكتبة",
  "Fullscreen and the top bar": "ملء الشاشة والشريط العلوي",
  "Videos coming soon": "الفيديوهات قادمة قريبًا",
  "Video walkthroughs of Plan, Tools, Bank, Practice, and the rest of Nishany.": "شروحات فيديو للتخطيط والأدوات والبنك والتدريب وباقي أقسام نيشاني.",
}
