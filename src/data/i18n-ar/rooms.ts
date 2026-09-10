/**
 * Arabic for Study Rooms (WP5).
 *
 * Owned by that package alone — every package writes only its own file, so two
 * agents adding strings on the same day cannot collide in `i18n-ar.ts`.
 *
 * Keys the old Study Together page already translated (the shared-test runner's
 * whole vocabulary, the friends panel) are deliberately absent: they are still
 * in `i18n-ar.ts`, and restating them here would fork one sentence into two
 * places that drift.
 */
export const AR_ROOMS: Record<string, string> = {
  'Voice not connected yet': 'الصوت غير متصل بعد',
  // ---- The page ----------------------------------------------------------
  'STUDY ROOMS': 'غرف المذاكرة',
  'Sit with your cohort. Up to 20 to a room.': 'اجلس مع دفعتك. حتى 20 في الغرفة.',
  'Seats to a room': 'مقاعد الغرفة',
  'four rows of five': 'أربعة صفوف من خمسة',
  Voice: 'الصوت',

  // ---- Lobby -------------------------------------------------------------
  'Your rooms': 'غرفك',
  'You are not in a room yet': 'لست في أي غرفة بعد',
  'Open one for your cohort, or join with a code someone sent you.':
    'افتح غرفة لدفعتك، أو انضم بكود أرسله لك أحدهم.',
  'Open rooms': 'الغرف المفتوحة',
  'Open to your university and year': 'مفتوحة لجامعتك وسنتك',
  'No open rooms in your year right now.': 'لا توجد غرف مفتوحة في سنتك الآن.',
  'Room code or link': 'كود الغرفة أو رابطها',
  'e.g. KTP0R2': 'مثال: KTP0R2',
  'Create a room': 'أنشئ غرفة',
  'Study room': 'غرفة مذاكرة',
  'e.g. Cardiology evening sprint': 'مثال: جلسة القلب المسائية',
  'A room holds up to 20 desks and stays open to your university and year until you archive it.':
    'تتسع الغرفة حتى 20 مكتبًا وتبقى مفتوحة لجامعتك وسنتك حتى تؤرشفها.',
  'Preview only — opening a room for other students requires the connected server.':
    'عرض تجريبي فقط — فتح غرفة لطلاب آخرين يحتاج إلى الخادم المتصل.',
  'That did not work. Try again.': 'لم ينجح ذلك. حاول مرة أخرى.',
  'No room has that code.': 'لا توجد غرفة بهذا الكود.',
  'Loading the room…': 'جارٍ تحميل الغرفة…',

  // ---- Room card ---------------------------------------------------------
  Occupancy: 'الإشغال',
  Enter: 'ادخل',
  'Join and enter': 'انضم وادخل',
  'Room is full': 'الغرفة ممتلئة',
  Full: 'ممتلئة',
  speaking: 'يتحدث',

  // ---- The hall ----------------------------------------------------------
  'Back to Study Rooms': 'العودة إلى غرف المذاكرة',
  'Demo room': 'غرفة تجريبية',
  'Copy link': 'انسخ الرابط',
  seated: 'جالسين',
  'Empty desk': 'مكتب فارغ',
  studying: 'يذاكر',
  Studying: 'يذاكر',
  Speaking: 'يتحدث',
  Idle: 'ساكن',
  you: 'أنت',
  You: 'أنت',
  'person in the room': 'شخص في الغرفة',
  'people in the room': 'أشخاص في الغرفة',
  'A seeded room, so the scene has someone in it. Your own desk is the one with the crimson cushion — click it to change your furniture.':
    'غرفة معدّة مسبقًا حتى يظهر المشهد بأشخاص. مكتبك هو صاحب الوسادة القرمزية — اضغط عليه لتغيير أثاثك.',
  'Your seat and your own activity are live. Everyone else appears at a plain desk until the server carries their seat and their study activity.':
    'مقعدك ونشاطك أنت مباشران. أما البقية فيظهرون على مكتب عادي حتى ينقل الخادم مقاعدهم ونشاط مذاكرتهم.',

  // ---- Controls and voice ------------------------------------------------
  'Room controls': 'أدوات الغرفة',
  'in voice': 'في الصوت',
  'Speaking…': 'يتحدّث…',
  'Collapse': 'طي',
  'Expand': 'توسيع',
  'Open the room': 'فتح الغرفة',
  'Leave': 'مغادرة',
  'Join voice': 'انضم بالصوت',
  Mute: 'كتم',
  Unmute: 'إلغاء الكتم',
  'Stop microphone': 'إيقاف الميكروفون',
  'Leave room': 'غادر الغرفة',
  'Speaking now': 'يتحدث الآن',
  'Nobody is speaking.': 'لا أحد يتحدث.',
  'In the room': 'في الغرفة',
  // ---- Voice (WP13) ------------------------------------------------------
  // The room can carry a real call now, so these say which of the three cases
  // this room is in rather than one standing apology.
  'Voice is unavailable right now.': 'الصوت غير متاح حاليًا.',
  'Voice needs the connected server.': 'الصوت يحتاج إلى الخادم المتصل.',
  'Voice could not connect, so nobody can hear you in this room.':
    'تعذّر الاتصال بالصوت، فلا أحد يسمعك في هذه الغرفة.',
  'Voice could not reach the media server, so nobody can hear you in this room.':
    'تعذّر على الصوت الوصول إلى خادم الوسائط، فلا أحد يسمعك في هذه الغرفة.',
  'You are in the room\u2019s voice. Everyone here can hear you unless you mute.':
    'أنت داخل صوت الغرفة. كل من هنا يسمعك ما لم تكتم الميكروفون.',
  'Everyone here is live: their desk, their furniture and whether they are working. Your own desk is the one with the crimson cushion — click it to change your furniture.':
    'كل من هنا مباشر: مكتبه وأثاثه وما إذا كان يذاكر. مكتبك أنت هو صاحب الوسادة القرمزية — اضغط عليه لتغيير أثاثك.',
  'Reconnecting to the room. Seats and activity are the last thing the room said.':
    'جارٍ إعادة الاتصال بالغرفة. المقاعد والنشاط هي آخر ما قالته الغرفة.',
  'Live updates are not available here, so the room is re-read every few seconds instead.':
    'التحديث المباشر غير متاح هنا، لذا تُقرأ الغرفة من جديد كل بضع ثوانٍ.',
  'Reconnecting voice…': 'جارٍ إعادة توصيل الصوت…',
  'Voice could not reconnect, so nobody can hear you in this room.':
    'تعذّرت إعادة توصيل الصوت، فلا أحد يسمعك في هذه الغرفة.',
  // Kept: a browser still on the pre-WP13 bundle asks for this sentence.
  'Voice transport is not connected yet.': 'قناة الصوت غير موصولة بعد.',
  'Joining voice opens your own microphone so you can see your level and test your mute button. Nobody else can hear you, and you cannot hear anyone in this room.':
    'الانضمام بالصوت يفتح ميكروفونك أنت فقط لترى مستواه وتجرّب زر الكتم. لا أحد غيرك يسمعك، ولا تسمع أحدًا في هذه الغرفة.',
  'A microphone can only be opened over a secure (https) connection.':
    'لا يمكن فتح الميكروفون إلا عبر اتصال آمن (https).',
  'This browser does not offer microphone access.': 'هذا المتصفح لا يتيح الوصول إلى الميكروفون.',
  'This browser cannot measure microphone level.': 'هذا المتصفح لا يستطيع قياس مستوى الميكروفون.',
  'Microphone access was refused, so nothing is being captured.':
    'رُفض الوصول إلى الميكروفون، فلا يُسجَّل أي شيء.',
  'That microphone could not be opened.': 'تعذّر فتح هذا الميكروفون.',
  'That microphone could not be measured.': 'تعذّر قياس هذا الميكروفون.',

  // ---- Seat customiser ---------------------------------------------------
  'Customise your seat': 'خصّص مقعدك',
  'Open member options': 'افتح خيارات العضو',
  'Everyone in the room sees the desk you choose.': 'كل من في الغرفة يرى المكتب الذي تختاره.',
  'Your seat': 'مقعدك',
  'Save seat': 'احفظ المقعد',
  Desk: 'المكتب',
  Device: 'الجهاز',
  Chair: 'الكرسي',
  Plain: 'عادي',
  'With a drawer': 'بدرج',
  Corner: 'ركني',
  Laptop: 'حاسوب محمول',
  'Desktop PC': 'حاسوب مكتبي',
  Tablet: 'جهاز لوحي',
  iPhone: 'آيفون',
  'Android phone': 'هاتف أندرويد',
  Stool: 'كرسي بلا ظهر',
  'Office chair': 'كرسي مكتب',

  // ---- The demoted sections ---------------------------------------------
  'One paper, sat together': 'ورقة واحدة، تُحل معًا',
  'Classmates and challenges': 'الزملاء والتحديات',
  'Study together starts a shared test of 10 questions from every topic, with your friend already seated in it.':
    'المذاكرة معًا تبدأ اختبارًا مشتركًا من 10 أسئلة من كل المواضيع، وصديقك جالس فيه بالفعل.',

  // ---- Friends, invites and the classmate directory (WP15 Arabic sweep)
  'Your friends': 'أصدقاؤك',
  'Find friends': 'ابحث عن أصدقاء',
  'No friends yet': 'لا يوجد أصدقاء بعد',
  'Search your year by name': 'ابحث في سنتك الدراسية بالاسم',
  'Set your university and year in Account to search for classmates.':
    'حدّد جامعتك وسنتك الدراسية من الحساب للبحث عن زملائك.',
  'Share your invite link, or find someone from your year below.':
    'شارك رابط دعوتك، أو ابحث عن أحد زملاء سنتك أدناه.',
  'Create invite link': 'أنشئ رابط دعوة',
  'Link copied': 'نُسخ الرابط',
  'That link could not be created. Try again.': 'تعذّر إنشاء الرابط. حاول مرة أخرى.',
  'No shared university, no directory, no problem. Send this link on any channel — opening it asks to be your friend.':
    'لا جامعة مشتركة ولا دليل، ولا مشكلة. أرسل هذا الرابط على أي قناة — وفتحه يرسل طلب صداقة إليك.',
  'Connect Facebook': 'اربط فيسبوك',
  '1 Facebook friend is already here': 'صديق واحد من فيسبوك موجود هنا بالفعل',
  'Facebook friends are already here': 'أصدقاء من فيسبوك موجودون هنا بالفعل',
  'None of your Facebook friends are here yet. Share your invite link to bring them in.':
    'لا أحد من أصدقائك على فيسبوك هنا بعد. شارك رابط دعوتك لتضمّهم.',
  'Finding friends through Facebook is waiting on Facebook’s own review. Use your invite link in the meantime.':
    'العثور على الأصدقاء عبر فيسبوك ينتظر مراجعة فيسبوك نفسها. استخدم رابط دعوتك في هذه الأثناء.',
  'Asked': 'طُلِب',
  'Asked to be friends': 'طلب الصداقة',
  'Waiting for your friend to accept.': 'في انتظار قبول صديقك.',
  'Waiting for them to accept': 'في انتظار قبوله',
  'Accept': 'قبول',
  'Decline': 'رفض',
  'Declined': 'مرفوض',
  'Sent': 'أُرسل',

  // ---- Challenges
  'Challenge': 'تحدٍّ',
  'Send challenge': 'أرسل التحدي',
  'Back to challenges': 'العودة إلى التحديات',
  'That challenge could not be sent.': 'تعذّر إرسال هذا التحدي.',
  'This challenge was declined.': 'رُفض هذا التحدي.',
  'You have not responded to this challenge yet.': 'لم تردّ على هذا التحدي بعد.',
  'Loading the challenge…': 'جارٍ تحميل التحدي…',
  'The same questions, sat separately. Results open once you have both finished.':
    'الأسئلة نفسها، يجيب عنها كلٌّ على حدة. وتُفتح النتائج بمجرد أن تنتهيا معًا.',
  'The comparison opens once your opponent finishes.': 'تُفتح المقارنة بمجرد أن ينتهي منافسك.',
  'Your opponent has finished too. Comparing results…': 'انتهى منافسك أيضًا. جارٍ مقارنة النتائج…',
  'Waiting for an answer': 'في انتظار إجابة',
  'Waiting for your answer': 'في انتظار إجابتك',
  'Your turn': 'دورك',
  'Them': 'المنافس',
  'Result': 'النتيجة',
  'View result': 'عرض النتيجة',
  'Finish': 'إنهاء',

  // ---- Study parties: lobby, schedule and members
  'Study party': 'جلسة مذاكرة جماعية',
  'Study together': 'ذاكروا معًا',
  'Back to parties': 'العودة إلى الجلسات',
  'Back to party': 'العودة إلى الجلسة',
  'Loading the party…': 'جارٍ تحميل الجلسة…',
  'Loading the session…': 'جارٍ تحميل الجلسة…',
  'Lobby is ready': 'الردهة جاهزة',
  'Host': 'المُضيف',
  'Host only': 'المُضيف فقط',
  'Open to your year': 'متاحة لسنتك الدراسية',
  'Invite only': 'بالدعوة فقط',
  'Anyone in your university and year can find this party and join it.':
    'يستطيع أي شخص في جامعتك وسنتك الدراسية أن يجد هذه الجلسة وينضم إليها.',
  'It appears in no list. Anyone with the link can still join.':
    'لا تظهر في أي قائمة. ومع ذلك يستطيع من لديه الرابط الانضمام.',
  'Share this party code so others can join': 'شارك رمز الجلسة ليتمكن الآخرون من الانضمام',
  'Name': 'الاسم',
  'Optional': 'اختياري',
  'e.g. Sunday cardiology review': 'مثال: مراجعة القلب يوم الأحد',
  'Date and time': 'التاريخ والوقت',
  'Schedule activity': 'جدولة نشاط',
  'Schedule for this party': 'جدول هذه الجلسة',
  'Add to my calendar': 'أضِف إلى تقويمي',
  'Scheduled': 'مجدول',
  'Opens': 'يُفتح',
  'Closed': 'مغلق',
  'Running now': 'يعمل الآن',
  'In progress': 'قيد التنفيذ',
  'Completed': 'مكتمل',
  'Not started yet': 'لم يبدأ بعد',
  'This session has not started yet.': 'لم تبدأ هذه الجلسة بعد.',
  'Nothing running right now.': 'لا شيء يعمل الآن.',
  'Activity': 'النشاط',
  'Connected': 'متصل',
  'Away': 'بعيد',
  'Reconnecting': 'جارٍ إعادة الاتصال',
  'Live': 'مباشر',

  // ---- Party games and rounds
  'Party games': 'ألعاب الجلسة',
  'Create party game': 'أنشئ لعبة جلسة',
  'Start party game': 'ابدأ لعبة الجلسة',
  'Complete game': 'أكمل اللعبة',
  'Party game complete': 'اكتملت لعبة الجلسة',
  'Party game answer': 'إجابة لعبة الجلسة',
  'No party games yet.': 'لا توجد ألعاب جلسة بعد.',
  'Party game will appear here when the host creates it.': 'تظهر لعبة الجلسة هنا عندما ينشئها المُضيف.',
  'Game': 'اللعبة',
  'Choose published content': 'اختر محتوى منشورًا',
  'All topics': 'كل الموضوعات',
  'One topic': 'موضوع واحد',
  'Round': 'الجولة',
  'Next round': 'الجولة التالية',
  'No active round': 'لا توجد جولة نشطة',
  'Round recorded': 'سُجّلت الجولة',
  'Answer submitted. Waiting for the next round.': 'أُرسلت الإجابة. في انتظار الجولة التالية.',
  'Scoreboard': 'لوحة النتائج',
  'Scores are server-calculated. The host can continue when ready.':
    'تُحتسب النتائج على الخادم. ويستطيع المُضيف المتابعة متى استعدّ.',
  'Final scores are ready for the lobby summary.': 'النتائج النهائية جاهزة لملخّص الردهة.',
  'The host starts the server-authoritative game when everyone is in.':
    'يبدأ المُضيف اللعبة التي يديرها الخادم عندما ينضم الجميع.',
  'Submit': 'إرسال',
  'Submit order': 'إرسال الترتيب',
  'Clear order': 'مسح الترتيب',
  'Your order': 'ترتيبك',
  'Choose the first step to begin.': 'اختر الخطوة الأولى للبدء.',
  'Type your answer…': 'اكتب إجابتك…',

  // ---- Shared sittings and self-checked items
  'Essay question': 'سؤال مقالي',
  'Key points': 'النقاط الأساسية',
  'Reveal key points': 'أظهر النقاط الأساسية',
  'I\'ve done this': 'أنجزت هذا',
  'self-checked': 'مُراجَع ذاتيًا',
  'item self-checked': 'عنصر مُراجَع ذاتيًا',
  'items self-checked': 'عناصر مُراجَعة ذاتيًا',
  'Self-checked items are marked by the person who did them, not the server — they are not scored.':
    'العناصر المُراجَعة ذاتيًا يصحّحها من أدّاها، لا الخادم — ولا تدخل في التقييم.',
  'Not marked yet': 'لم يُصحَّح بعد',
  'No questions were marked in this session.': 'لم تُصحَّح أي أسئلة في هذه الجلسة.',
  'No instructions authored yet.': 'لم تُؤلَّف تعليمات بعد.',
  'This item has no content authored yet.': 'لا يوجد محتوى مؤلَّف لهذا العنصر بعد.',
  'This item is no longer available.': 'لم يعد هذا العنصر متاحًا.',
  'This essay question is no longer available.': 'لم يعد هذا السؤال المقالي متاحًا.',

  // ---- Fix round 1 — the demo shared-tests, party and friends previews (review A1)
  'Demo': 'تجريبي',
  'Demo preview': 'معاينة تجريبية',
  'Name it': 'سمِّه',
  'Timed · pace recorded': 'موقوت · تُسجَّل السرعة',
  'Preview only — creating a multi-student room requires the connected server.':
    'معاينة فقط — إنشاء غرفة متعددة الطلاب يتطلب خادمًا متصلًا.',
  'Join with a code': 'انضم برمز',
  'Your shared tests': 'اختباراتك المشتركة',
  'You host': 'أنت المُضيف',
  'Party code': 'رمز الجلسة',
  'Party schedule': 'جدول الجلسة',
  'Add party activity': 'أضف نشاطًا للجلسة',
  'Start a party game': 'ابدأ لعبة جلسة',
  'Creates one synchronized game instance': 'يُنشئ نسخة لعبة واحدة متزامنة',
  'Party members': 'أعضاء الجلسة',
  'Classmates in your year': 'زملاء سنتك الدراسية',
  'Discoverability': 'الظهور في الدليل',
  'Off by default': 'معطّل افتراضيًا',
  'Students opt in before they can appear here or browse classmates in the same university and year.':
    'يوافق الطلاب صراحةً قبل أن يظهروا هنا أو يتصفّحوا زملاء الجامعة والسنة نفسها.',

  // ---- Room chat -----------------------------------------------------------
  'Chat': 'الدردشة',
  'To': 'إلى',
  'From': 'من',
  'Private': 'خاصة',
  'Message everyone instead': 'راسل الجميع بدلاً من ذلك',
  'No messages yet. Say hello.': 'لا رسائل بعد. قل مرحبًا.',
  'Message privately…': 'راسل بشكل خاص…',
  'Message the room…': 'راسل الغرفة…',
  'Message privately': 'راسل بشكل خاص',
}
