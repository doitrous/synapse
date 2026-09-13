/**
 * Arabic for Account with Billing merged in (WP6).
 *
 * Owned by that package alone — every package writes only its own file, so two
 * agents adding strings on the same day cannot collide in `i18n-ar.ts`.
 */
export const AR_ACCOUNT: Record<string, string> = {
  // ---- The four tabs --------------------------------------------------------
  Profile: 'الملف الشخصي',
  Preferences: 'التفضيلات',
  Security: 'الأمان',

  // ---- Page header ----------------------------------------------------------
  'Your profile, study preferences, billing, security, and data.':
    'ملفك الشخصي، وتفضيلات دراستك، والاشتراك، والأمان، وبياناتك.',

  // The export block, now a panel of its own on the Security tab rather than a
  // block at the foot of "Privacy and data".
  'Your data': 'بياناتك',

  // ---- Profile and study context (WP15 Arabic sweep)
  'Profile and study context': 'الملف الشخصي وبيانات الدراسة',
  'Full name': 'الاسم الكامل',
  'Email address': 'البريد الإلكتروني',
  'Username': 'اسم المستخدم',
  'username': 'اسم المستخدم',
  'Unique across all universities, compared case-insensitively by the server.':
    'فريد على مستوى جميع الجامعات، ويقارنه الخادم دون تمييز بين الحروف الكبيرة والصغيرة.',
  'Usernames are unique across all universities. The server rechecks this before approval.':
    'أسماء المستخدمين فريدة على مستوى جميع الجامعات. ويعيد الخادم التحقق من ذلك قبل الموافقة.',
  'Your username and icon are what classmates see if you opt in to discovery later.':
    'اسم المستخدم والأيقونة هما ما يراه زملاؤك إن اخترت لاحقًا الظهور في الدليل.',
  'Choose your university': 'اختر جامعتك',
  'Choose your year': 'اختر سنتك الدراسية',
  'Year of study': 'السنة الدراسية',
  'Locked after onboarding': 'مُقفَل بعد إعداد الحساب',
  'Timezone': 'المنطقة الزمنية',
  'Used for calendar blocks and reminders': 'تُستخدم لفترات التقويم والتذكيرات',
  'Used for targeted vouchers and notices': 'يُستخدم للقسائم والإشعارات الموجَّهة',
  'Save profile': 'حفظ الملف الشخصي',
  'Save group': 'حفظ المجموعة',
  'e.g. Group 4': 'مثال: مجموعة 4',
  'Not recorded': 'غير مُسجَّل',
  'Signed in': 'مسجَّل الدخول',
  'Theme': 'المظهر',
  'Light, warm, or dark. Kept on this device.': 'فاتح أو دافئ أو داكن. ويُحفظ على هذا الجهاز.',
  'That profile could not be saved. The server may have refused the username or be temporarily unavailable.':
    'تعذّر حفظ الملف الشخصي. ربما رفض الخادم اسم المستخدم أو يكون غير متاح مؤقتًا.',

  // ---- University and year change requests
  'Request a university or year change': 'طلب تغيير الجامعة أو السنة الدراسية',
  'Submit change request': 'إرسال طلب التغيير',
  'Target university': 'الجامعة المطلوبة',
  'Target year': 'السنة الدراسية المطلوبة',
  'Required for the admin audit trail': 'مطلوب لسجل مراجعة الإدارة',
  'e.g. I transferred to another university this term.': 'مثال: انتقلت إلى جامعة أخرى هذا الفصل الدراسي.',
  'Request sent for admin review.': 'أُرسل الطلب لمراجعة الإدارة.',
  'University and year changes need administrator approval and notes.':
    'يحتاج تغيير الجامعة أو السنة الدراسية إلى موافقة المسؤول وإلى ملاحظات.',
  'Your university has you recorded as': 'جامعتك مُسجِّلة بياناتك بوصفك',
  'Your request could not be sent. Try again, or contact support if it keeps happening.':
    'تعذّر إرسال طلبك. حاول مرة أخرى، أو تواصل مع الدعم إن تكرّر ذلك.',

  // ---- Privacy, security and data
  'Privacy and data': 'الخصوصية والبيانات',
  'Let classmates find me': 'اسمح لزملائي بالعثور عليّ',
  'Off by default. Turn this on only if you want to appear in and browse the same-university-and-year classmate directory. Turning it off does not remove friends you already have.':
    'مُعطَّل افتراضيًا. فعّله فقط إن أردت الظهور في دليل زملاء الجامعة والسنة نفسها وتصفُّحه. وتعطيله لا يحذف أصدقاءك الحاليين.',
  'Password': 'كلمة المرور',
  'Change password': 'تغيير كلمة المرور',
  'Reset through a time-limited email link.': 'تُعاد عبر رابط بريدي محدود المدة.',
  'This browser': 'هذا المتصفح',
  'This session': 'هذه الجلسة',
  'Signing out here ends your session on every device where you are signed in.':
    'لا تُعرض الأجهزة الأخرى هنا. وتسجيل الخروج من هنا يمسح هذا المتصفح وحده.',
  'Download my data': 'تنزيل بياناتي',
  'Includes every document your account owns — notes, whiteboards, bookmarks, calendar blocks and progress.':
    'يشمل كل مستند يملكه حسابك — الملاحظات واللوحات والعلامات المرجعية وفترات التقويم والتقدّم.',
  'Without a backend connected this exports your preferences only; the rest of your work is in this browser.':
    'من دون اتصال بالخادم يصدّر هذا تفضيلاتك فقط؛ أما بقية عملك فموجودة في هذا المتصفح.',
  'Your data could not be exported right now. Try again in a moment.': 'تعذّر تصدير بياناتك الآن. حاول بعد قليل.',

  // ---- Plan, vouchers and support
  'Payments': 'المدفوعات',
  'Support': 'الدعم',
  'Contact support': 'تواصل مع الدعم',
  'Contact support about your plan': 'تواصل مع الدعم بخصوص اشتراكك',
  'Email the Nishany team': 'راسل فريق Maristana',
  'Email preferences are not configurable yet. Maristana only emails you about your account.':
    'لا يمكن ضبط تفضيلات البريد بعد. ولا يراسلك Maristana إلا بخصوص حسابك.',
  'Nishany does not take card payments in the app, and stores no card details. Your plan is arranged with the Nishany team directly.':
    'لا يقبل Maristana مدفوعات البطاقات داخل التطبيق، ولا يحفظ أي بيانات بطاقة. ويُرتَّب اشتراكك مع فريق Maristana مباشرة.',
  'Subscriptions are managed by the Nishany team. To change or end your plan, get in touch and someone will action it on your account.':
    'يدير فريق Maristana الاشتراكات. ولتغيير اشتراكك أو إنهائه، تواصل معهم وسيتولى أحدهم تنفيذ ذلك على حسابك.',
  'No subscription yet': 'لا يوجد اشتراك بعد',
  'No plan has been granted to your account yet. Contact the Nishany team to arrange one.':
    'لم يُمنح حسابك أي اشتراك بعد. تواصل مع فريق Maristana لترتيب واحد.',
  'Your university hasn\'t set up your student profile yet. Once it has, any plan granted to you appears here.':
    'لم تُنشئ جامعتك ملفك الطلابي بعد. وبمجرد إنشائه يظهر هنا أي اشتراك يُمنح لك.',
  'This plan is not in the current catalogue, so no price is shown for it.':
    'هذا الاشتراك غير مدرج في الكتالوج الحالي، لذا لا يُعرض له سعر.',
  'Free': 'مجاني',
  'In-app only': 'داخل التطبيق فقط',
  'Open-ended · no expiry recorded': 'مفتوح المدة · لا تاريخ انتهاء مُسجَّل',
  'Runs until': 'يستمر حتى',
  'renewal': 'التجديد',
  'day left': 'يوم متبقٍّ',
  'days left': 'أيام متبقية',
  'You save': 'توفّر',
  'Student voucher': 'قسيمة الطلاب',
  'Voucher code': 'رمز القسيمة',
  'Enter voucher code': 'أدخل رمز القسيمة',
  'Apply voucher': 'تطبيق القسيمة',
  'Remove voucher': 'إزالة القسيمة',
  'Voucher removed.': 'أُزيلت القسيمة.',
  'Applied': 'مُطبَّقة',
  'Applied to your account': 'مُطبَّقة على حسابك',
  'Apply a discount to your next renewal': 'طبّق خصمًا على تجديدك القادم',
  'has been applied to your next renewal.': 'طُبِّقت على تجديدك القادم.',
  'Eligibility is checked on the server against your university, year, group, the voucher dates, and the remaining redemption limit. Timed promotions and vouchers never stack; the valid option that produces the lowest price wins.':
    'يتحقق الخادم من الأهلية مقابل جامعتك وسنتك الدراسية ومجموعتك وتواريخ القسيمة وحد الاستخدام المتبقي. ولا تُجمع العروض الموقوتة مع القسائم؛ بل يُعتمد الخيار الصالح الذي يعطي أقل سعر.',
  'That voucher code was not found. Check the spelling and try again.':
    'لم يُعثر على رمز القسيمة. تحقق من كتابته وحاول مرة أخرى.',
  'That voucher could not be applied.': 'تعذّر تطبيق هذه القسيمة.',
  'That voucher could not be applied. Check your connection and try again.':
    'تعذّر تطبيق هذه القسيمة. تحقق من اتصالك وحاول مرة أخرى.',
  'That voucher could not be removed. Try again.': 'تعذّر إزالة هذه القسيمة. حاول مرة أخرى.',
  'This code is valid. Connect the backend to apply it.': 'هذا الرمز صالح. اربط الخادم لتطبيقه.',
  'This code is valid and opens full access for {days} days. Connect the backend to apply it.':
    'هذا الرمز صالح ويفتح وصولًا كاملًا لمدة {days} أيام. اربط الخادم لتطبيقه.',
  'Student ID discount': 'خصم بطاقة الطالب',
  'Upload your student ID to claim {percent}% off. It is checked by the Nishany team, and the discount applies from your next invoice once it is accepted.':
    'ارفع بطاقتك الطلابية للحصول على خصم {percent}%. يراجعها فريق Maristana، ويُطبَّق الخصم من فاتورتك التالية بمجرد قبولها.',
}
