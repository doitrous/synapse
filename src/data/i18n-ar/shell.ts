/**
 * Arabic for the shell: the nine nav destinations, the breadcrumb titles the
 * nav no longer carries, and the chrome every hub shares.
 *
 * Owned by the foundation package. `Learn` deliberately re-translates the key
 * the old dictionary had as the noun التعلّم: the sidebar item is now one of
 * four imperative hub names (تعلّم · تدرّب · مراجعة), and they only read as a
 * set if all four are verbs.
 */
export const AR_SHELL: Record<string, string> = {
  'Study': 'المذاكرة',
  'Test yourself': 'اختبر نفسك',
  'Breadcrumb': 'مسار التنقل',
  'Together': 'معًا',
  'You': 'أنت',
  'Learn how Nishany works': 'تعرّف على طريقة عمل نيشاني',
  'Short videos for every part of the app — what each page is for and how to use it.': 'مقاطع قصيرة لكل جزء من التطبيق — ما الغرض من كل صفحة وكيف تستخدمها.',
  'Watch the tutorial': 'شاهد الشرح',
  // ---- The nine destinations ------------------------------------------
  Tutorial: 'الشرح',
  Plan: 'الخطة',
  Learn: 'تعلّم',
  Practice: 'تدرّب',
  Revise: 'مراجعة',
  Minigames: 'ألعاب صغيرة',
  'Study Rooms': 'غرف المذاكرة',
  Account: 'الحساب',

  // ---- Hub chrome ------------------------------------------------------
  '01 · PLAN': '٠١ · الخطة',
  '02 · LEARN': '٠٢ · تعلّم',
  '03 · PRACTICE': '٠٣ · تدرّب',
  '04 · REVISE': '٠٤ · مراجعة',
  'Where your weeks are going.': 'إلى أين تذهب أسابيعك.',
  'Read, look it up, understand it.': 'اقرأ، وابحث عن المصطلح، وافهمه.',
  'Every format your exams throw at you.': 'كل صيغة قد يأتي بها الامتحان.',
  'Capture it, connect it, keep it.': 'دوّنه، واربطه، واحتفظ به.',
  'Coming soon': 'قريبًا',
  'Open the preview': 'افتح المعاينة',
  'Got it': 'فهمت',
  Loading: 'جارٍ التحميل',

  // ---- Titles for routes the nav no longer lists ------------------------
  // `Medical Taxonomy` stays: old links, old decks and the tutorial topic id
  // still carry it, and a dropped key falls back to English rather than to
  // nothing.
  'Medical Terminology': 'المصطلحات الطبية',
  'Question Bank': 'بنك الأسئلة',
  'Question of the Day': 'سؤال اليوم',
  'Question Notes': 'ملاحظات الأسئلة',
  'Adaptive Study': 'الدراسة التكيّفية',
  'Essay questions': 'الأسئلة المقالية',
  'Build Maristanas': 'ابنِ المارستانات',
  Whiteboard: 'السبورة',
  Notebook: 'دفتر الملاحظات',
  Flashcards: 'البطاقات',
  Performance: 'الأداء',
  Practical: 'العملي',
  Resources: 'المصادر',
  University: 'الجامعة',
  Calendar: 'التقويم',
  Library: 'المكتبة',
  'Term Grid': 'شبكة المصطلحات',
  Spotter: 'التعرّف على العيّنات',
  'Term Match': 'مطابقة المصطلحات',
  'Clinical Sequence': 'التسلسل السريري',
  'Mechanism Chain': 'سلسلة الآلية',
  'Red Flag Sort': 'فرز العلامات الخطرة',
  Billing: 'الفوترة',
  'Study Together': 'ذاكر مع زملائك',

  // ---- Chrome: navigation, search and session (WP15 Arabic sweep)
  'Navigation': 'التنقّل',
  'Show menus': 'إظهار القوائم',
  'Hide menus': 'إخفاء القوائم',
  'Search everything': 'ابحث في كل شيء',
  'Search resources': 'ابحث في المصادر',
  'Search the library': 'ابحث في المكتبة',
  'Keyboard shortcuts': 'اختصارات لوحة المفاتيح',
  'No shortcuts are available here.': 'لا توجد اختصارات متاحة هنا.',
  'then a key…': 'ثم مفتاح…',
  'Open in new tab': 'فتح في تبويب جديد',
  'Copy': 'نسخ',
  'Link': 'الرابط',
  'Send to notebook': 'أرسِل إلى دفتر الملاحظات',
  'Add a note': 'أضف ملاحظة',
  'Continue studying': 'تابع المذاكرة',
  'Start studying': 'ابدأ المذاكرة',
  'Sign in': 'تسجيل الدخول',
  'Sign out': 'تسجيل الخروج',
  'Sign in to make changes.': 'سجّل الدخول لإجراء تغييرات.',
  'Your session has expired. Sign in again to see this content.':
    'انتهت صلاحية جلستك. سجّل الدخول مرة أخرى لعرض هذا المحتوى.',
  '{count} open escalations': '{count} تصعيدات مفتوحة',
  'module': 'مقرر',
  'modules': 'مقررات',
  'categories': 'فئات',
  'terms known': 'مصطلحات معروفة',
  'Step': 'خطوة',
  'Increase': 'زيادة',
  'Decrease': 'إنقاص',
  'Try again': 'أعد المحاولة',
  'Reload this page': 'أعد تحميل هذه الصفحة',
  'Removing…': 'جارٍ الإزالة…',
  'Checking…': 'جارٍ التحقق…',
  'This could not be loaded': 'تعذّر تحميل هذا',

  // ---- Focus timer
  'Focus timer': 'مؤقّت التركيز',
  'Pomodoro timer': 'مؤقّت بومودورو',
  'Timer settings': 'إعدادات المؤقّت',
  'Start timer': 'ابدأ المؤقّت',
  'Pause timer': 'أوقف المؤقّت مؤقتًا',
  'Reset this block': 'أعد ضبط هذه الفترة',
  'Skip to the next block': 'تخطَّ إلى الفترة التالية',
  'Auto-start the next block': 'ابدأ الفترة التالية تلقائيًا',
  'Skip the tap between focus and breaks.': 'تجاوَز النقرة بين التركيز والاستراحة.',
  'Make the blocks fit how you study.': 'اجعل الفترات تناسب طريقتك في المذاكرة.',
  'Work in calm, deliberate blocks.': 'اعمل في فترات هادئة ومقصودة.',
  'focus blocks completed': 'فترات تركيز مكتملة',
  'Break time is ready.': 'حان وقت الاستراحة.',
  'Your next focus block is ready.': 'فترة التركيز التالية جاهزة.',
  'Turn sound on': 'تشغيل الصوت',
  'Turn sound off': 'كتم الصوت',
  'Notifications on': 'الإشعارات مفعّلة',
  'Notifications off': 'الإشعارات معطّلة',

  // ---- Onboarding: university, year, profile and plan
  'Where do you study?': 'أين تدرس؟',
  'Which year are you in?': 'في أي سنة دراسية أنت؟',
  'This decides which timetable and which content you see.': 'هذا يحدّد الجدول والمحتوى اللذين ستراهما.',
  'Your year decides the modules you are taught, and what your timetable shows.':
    'سنتك الدراسية تحدّد المقررات التي تُدرَّس لك، وما يعرضه جدولك.',
  'What you will study': 'ما الذي ستدرسه',
  'No universities are open for registration yet.': 'لا توجد جامعات مفتوحة للتسجيل بعد.',
  'Your university has not published this year’s modules yet.': 'لم تنشر جامعتك مقررات هذه السنة بعد.',
  'Choose your profile': 'اختر ملفك الشخصي',
  'Profile icon': 'أيقونة الملف الشخصي',
  'e.g. cardio-sara': 'مثال: cardio-sara',
  'Optional — your clinical or tutorial group, if you have one.':
    'اختياري — مجموعتك السريرية أو مجموعة السكاشن، إن كانت لديك.',
  'Discovery is off by default. This profile is private unless you later opt in from Account.':
    'الظهور في الدليل معطّل افتراضيًا. وهذا الملف خاص ما لم تختر تفعيله لاحقًا من الحساب.',
  'Choose your plan': 'اختر اشتراكك',
  'No plans are available for your year yet.': 'لا توجد اشتراكات متاحة لسنتك الدراسية بعد.',
  'Every new account starts with {days} days of full access.': 'كل حساب جديد يبدأ بوصول كامل لمدة {days} أيام.',

  // ---- Two-factor authentication
  'Two-factor authentication': 'المصادقة الثنائية',
  'On': 'مفعّلة',
  'Off': 'معطّلة',
  'Turn on': 'تفعيل',
  'Turn off': 'تعطيل',
  'Turn it off': 'عطّلها',
  'Keep it on': 'أبقِها مفعّلة',
  'Optional. A free authenticator app asks for a six-digit code when you sign in.':
    'اختيارية. يطلب منك تطبيق مصادقة مجاني رمزًا من ستة أرقام عند تسجيل الدخول.',
  'To turn this off, sign out and sign in again with your authenticator code, then come back here.':
    'لتعطيل ذلك، سجّل الخروج ثم سجّل الدخول مرة أخرى برمز المصادقة، ثم عُد إلى هنا.',
  'Your account will be protected by its password alone. You can turn this back on at any time.':
    'سيُحمى حسابك بكلمة المرور وحدها. ويمكنك إعادة تفعيل ذلك في أي وقت.',
  'Unavailable until this deployment is connected to its account service.':
    'غير متاح حتى يُربط هذا التثبيت بخدمة الحسابات.',

  // ---- Sharing, shared documents and permissions
  'Shared with you': 'مشارَك معك',
  'Shared from Maristana.': 'مشارَك من Maristana.',
  'Go to Maristana': 'اذهب إلى Maristana',
  'Sign in to open this shared item': 'سجّل الدخول لفتح هذا العنصر المشارَك',
  'This link is not available': 'هذا الرابط غير متاح',
  'It may be private, withdrawn, or shared from another cohort. Ask the owner to check the link and permission.':
    'قد يكون خاصًّا أو مسحوبًا أو مشارَكًا من دفعة أخرى. اطلب من صاحبه التحقق من الرابط والصلاحية.',
  'Delete the link': 'احذف الرابط',
  'The link could not be copied. Select it and copy it by hand.': 'تعذّر نسخ الرابط. حدّده وانسخه يدويًا.',
  'The link could not be withdrawn. Try again.': 'تعذّر سحب الرابط. حاول مرة أخرى.',
  'Read only for your university and year': 'للقراءة فقط لجامعتك وسنتك الدراسية',
  'Classmates in your university and year can edit': 'يستطيع زملاء جامعتك وسنتك الدراسية التعديل',
  'Shared notebooks and whiteboards are limited to classmates in the same university and year.':
    'تقتصر دفاتر الملاحظات واللوحات المشارَكة على زملاء الجامعة والسنة الدراسية نفسها.',
  'This live document keeps its revision history. Classmates can read it or collaborate according to the permission you choose, and changing it back to “Only me” stops their access.':
    'يحتفظ هذا المستند الحي بسجل مراجعاته. ويستطيع زملاؤك قراءته أو التعاون فيه بحسب الصلاحية التي تختارها، وإعادتها إلى «أنا فقط» توقف وصولهم.',
  'This note is open for editing.': 'هذه الملاحظة مفتوحة للتعديل.',
  'Live revision': 'مراجعة حيّة',
  'Publish current revision': 'انشر المراجعة الحالية',
  'Attached to this board': 'مرفق بهذه اللوحة',
  'A shared board is a copy taken when it was published. Files pinned to it stay in the owner’s own account, so they are named here rather than opened.':
    'اللوحة المشارَكة نسخة أُخذت وقت نشرها. والملفات المثبّتة عليها تبقى في حساب صاحبها، لذا تُذكر أسماؤها هنا بدل أن تُفتح.',
  'Whiteboard note text': 'نص ملاحظة اللوحة',
  'Everything you have written while answering Question Bank items, next to how each question has gone for you.':
    'كل ما كتبته أثناء الإجابة عن أسئلة بنك الأسئلة، إلى جانب أدائك في كل سؤال.',
  'Sharing needs the connected deployment: a link has to be readable by somebody else’s browser, and this preview keeps everything in yours.':
    'تحتاج المشاركة إلى تثبيت متصل: فالرابط يجب أن يكون قابلًا للقراءة من متصفح شخص آخر، وهذه النسخة التجريبية تُبقي كل شيء في متصفحك.',
  'Sharing needs the connected deployment. This preview keeps everything in the browser it was written in.':
    'تحتاج المشاركة إلى تثبيت متصل. وهذه النسخة التجريبية تُبقي كل شيء في المتصفح الذي كُتب فيه.',
  'That could not be shared. Check your connection and try again.':
    'تعذّرت المشاركة. تحقق من اتصالك وحاول مرة أخرى.',
  'Somebody else changed this while you were reading it. Reload to see their version.':
    'غيّر شخص آخر هذا أثناء قراءتك له. أعد التحميل لرؤية نسخته.',

  // ---- Reporting content, and server errors
  'Describe what you expected to see and what appears wrong. This helps reviewers reproduce the issue.':
    'اشرح ما توقّعت رؤيته وما يبدو خاطئًا. فهذا يساعد المراجعين على إعادة إنتاج المشكلة.',
  'For example: the explanation contradicts the linked guideline…': 'مثال: الشرح يناقض الدليل الإرشادي المرتبط به…',
  'The curriculum team will see your note together with the exact content you reported.':
    'سيرى فريق المناهج ملاحظتك مع المحتوى الذي أبلغت عنه بالضبط.',
  'Report sent for review': 'أُرسل البلاغ للمراجعة',
  'Sign in again to file this report.': 'سجّل الدخول مرة أخرى لتقديم هذا البلاغ.',
  'This account cannot file a report.': 'لا يستطيع هذا الحساب تقديم بلاغ.',
  'The server could not save this report. Try again.': 'تعذّر على الخادم حفظ هذا البلاغ. حاول مرة أخرى.',
  'That could not be saved. Check your connection and try again.': 'تعذّر الحفظ. تحقق من اتصالك وحاول مرة أخرى.',
  'That could not be saved. Check your connection and try again — nothing has been lost.':
    'تعذّر الحفظ. تحقق من اتصالك وحاول مرة أخرى — لم يضِع شيء.',
  'Could not reach the server. Check your connection and try again.':
    'تعذّر الوصول إلى الخادم. تحقق من اتصالك وحاول مرة أخرى.',
  'We could not reach the server. Check your connection — this page keeps retrying on its own.':
    'تعذّر علينا الوصول إلى الخادم. تحقق من اتصالك — وتواصل هذه الصفحة إعادة المحاولة تلقائيًا.',
  'Fetching the reviewed catalogue.': 'جارٍ جلب الكتالوج المراجَع.',
  'The catalogue could not be transferred.': 'تعذّر نقل الكتالوج.',
  'The catalogue is missing from the server.': 'الكتالوج غير موجود على الخادم.',
  'The server could not return the catalogue. This page keeps retrying on its own.':
    'تعذّر على الخادم إرجاع الكتالوج. وتواصل هذه الصفحة إعادة المحاولة تلقائيًا.',
  'This account is not allowed to read this catalogue.': 'هذا الحساب غير مصرَّح له بقراءة هذا الكتالوج.',
  'Not answered yet today': 'لم تُجب اليوم بعد',

  // ---- Tools popover: focus audio and screen
  'Pomodoro': 'بومودورو',
  'Focus audio': 'صوت التركيز',
  'Focus sounds': 'أصوات التركيز',
  'Generated on your device · no streaming': 'يُولَّد على جهازك · بلا بث',
  'Play': 'تشغيل',
  'Pause': 'إيقاف مؤقت',
  'Playing': 'قيد التشغيل',
  'Volume': 'مستوى الصوت',
  'Exit fullscreen': 'الخروج من ملء الشاشة',
  'Fullscreen': 'ملء الشاشة',
  'Study aids and how much of the screen the app keeps.': 'أدوات المذاكرة، ومقدار ما يحتفظ به التطبيق من الشاشة.',
  // ---- Focus sounds, named at last (WP16) ------------------------------
  'Lo-fi study': 'لو-فاي للمذاكرة',
  'Warm chords and soft tape texture': 'أوتار دافئة ونسيج شريط ناعم',
  'Soft keys': 'مفاتيح هادئة',
  'Sparse, gentle instrumental notes': 'نغمات آلية متباعدة ولطيفة',
  'Window rain': 'مطر على النافذة',
  'Steady rainfall with a distant hush': 'مطر منتظم مع همس بعيد',
  'Brown noise': 'ضجيج بنّي',
  'Deep, smooth focus noise': 'ضجيج عميق وناعم للتركيز',
  'White noise': 'ضجيج أبيض',
  'Even broadband sound': 'صوت متساوٍ عريض النطاق',
  // ---- Pomodoro block names, which the Tools button now shows (WP16) ----
  'Focus': 'تركيز',
  'Short break': 'استراحة قصيرة',
  'Long break': 'استراحة طويلة',
  'Focus block': 'فترة التركيز',
  'Blocks before a long break': 'الفترات قبل استراحة طويلة',

  // ---- Shared chrome, moved here from revise.ts: these keys are rendered by
  // ShareDialog, TopbarTools/Whiteboard and SharedDocument/Calendar, none of which
  // the Revise package owns (review B9).
  'Share': 'مشاركة',
  'Tools': 'الأدوات',
  'Save changes': 'احفظ التغييرات',
  // ---- WP16 fix round 1 -------------------------------------------------
  // The audio row reads "صوت التركيز · …", and صوت is masculine, so it cannot
  // borrow the shared 'Off' (feminine, and also used by the MFA control).
  'Not playing': 'غير مشغّل',
  // The focus-audio panel's own mute control. `rooms.ts` happens to define the
  // same two keys and is spread after this file, so those values win today —
  // these exist so the shell keeps its wording if Rooms ever drops or
  // re-scopes them.
  'Mute': 'كتم الصوت',
  'Unmute': 'إلغاء الكتم',

  // ---- Fix round 1 — the recovery screen (review A1). Read through
  // `ErrorBoundary`'s own `translate`, not `t()`: it is a class component
  // outside the provider.
  'Something went wrong': 'حدث خطأ ما',
  'The page hit an unexpected error. Reloading usually fixes it — your saved work is stored locally and will still be here.':
    'واجهت الصفحة خطأً غير متوقع. وإعادة التحميل تحلّ ذلك عادةً — وعملك المحفوظ مخزَّن محليًا وسيبقى كما هو.',
  'Reload the page': 'أعد تحميل الصفحة',
  'Go home': 'العودة إلى الرئيسية',
  // ---- WP16 round 2: the Tools menu now holds Search and Hide menus -----
  'Find anything, or give the page the whole screen.': 'ابحث عن أي شيء، أو امنح الصفحة الشاشة كاملةً.',
  // ---- Media attachments and the image lightbox (WP15b)
  'Open {name} image viewer': 'افتح عارض صورة {name}',
  '{name} image viewer': 'عارض صورة {name}',
  'Open & zoom': 'افتح وكبّر',
  'Remove {name}': 'إزالة {name}',
  'Reset zoom': 'أعد ضبط التكبير',
  'Close image viewer': 'إغلاق عارض الصور',
  'Loading media…': 'جارٍ تحميل الوسائط…',
  'Your browser does not support this audio.': 'متصفّحك لا يدعم هذا الملف الصوتي.',
  'Your browser does not support this video.': 'متصفّحك لا يدعم هذا الفيديو.',
  'Description / transcript:': 'الوصف / النصّ المكتوب:',
  'Open original media': 'افتح الوسائط الأصلية',
  'This audio could not be played. Use an MP3, M4A/AAC, or WAV file, or enter a direct audio-file URL.':
    'تعذّر تشغيل هذا الملف الصوتي. استخدم ملف MP3 أو M4A/AAC أو WAV، أو أدخل رابطًا مباشرًا لملف صوتي.',
  'This video could not be played. Use an MP4 file or enter a direct video-file URL.':
    'تعذّر تشغيل هذا الفيديو. استخدم ملف MP4 أو أدخل رابطًا مباشرًا لملف فيديو.',

  // ---- Shared primitives and the command palette (WP15b)
  'Scrollable data table': 'جدول بيانات قابل للتمرير',
  'Search Nishany': 'ابحث في نِشاني',
  'Close search': 'إغلاق البحث',
  'Search topics, questions, resources, admin…': 'ابحث في الموضوعات والأسئلة والمصادر ولوحة الإدارة…',

  // ---- Tutorial (WP15b). The topic catalogue itself is content, not chrome.
  'A short guide and a short video for every part of Synapse. Search for a function, or browse by section.':
    'شرح قصير ومقطع قصير لكل جزء من Synapse. ابحث عن وظيفة، أو تصفّح بحسب القسم.',
  'Search the tutorial…': 'ابحث في الشرح…',
  'Nothing matches that': 'لا شيء يطابق ذلك',
  'Try a different word, or clear the search to see every topic.':
    'جرّب كلمة أخرى، أو امسح البحث لترى كل الموضوعات.',
  'Video coming soon': 'الفيديو قريبًا',
  '{topic} tutorial video': 'فيديو شرح {topic}',

  // ---- Not found, placeholder routes and the shared-document header (WP15b)
  "This page isn't on the chart": 'هذه الصفحة ليست على الخريطة',
  "The page you're looking for doesn't exist or has moved.": 'الصفحة التي تبحث عنها غير موجودة أو نُقلت.',
  'Back to start': 'العودة إلى البداية',
  'On the build plan': 'ضمن خطة البناء',
  'Planned · {phase}': 'مخطّط لها · {phase}',
  'a later phase': 'مرحلة لاحقة',
  'Maristana home': 'الصفحة الرئيسية لـ Maristana',
  'Shared notebook attachment': 'مرفق ملاحظة مشتركة',

  // ---- `RouteBoundary`, reached through its own `translate` rather than `t()`
  // (a class component, like `ErrorBoundary`), and the authenticated-file popup
  // in `lib/api.ts`, which is a detached document with no React tree.
  'Maristana has been updated': 'جرى تحديث Maristana',
  'This screen could not be opened': 'تعذّر فتح هذه الشاشة',
  'This tab was open while a new version went out, and reloading did not pick it up. Your work is saved.':
    'كان هذا التبويب مفتوحًا حين صدرت نسخة جديدة، ولم تلتقطها إعادة التحميل. وعملك محفوظ.',
  'Something in this screen failed to start. Your work is saved — nothing here writes to your record.':
    'أخفق شيء في هذه الشاشة عن العمل. وعملك محفوظ — ولا شيء هنا يكتب في سجلّك.',
  'Opening source…': 'جارٍ فتح المصدر…',
  'Opening the cited source…': 'جارٍ فتح المصدر المُستشهد به…',
}
