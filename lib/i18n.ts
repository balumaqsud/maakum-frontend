export type UiLang = "en" | "ar";

const chrome = {
  en: {
    skip: "Skip to content",
    read: "Read",
    write: "Write",
    close: "Close",
    about: "About",
    privacy: "Privacy",
    care: "Every message and reply is reviewed before it appears. No politics, advertising or contact details.",
    navLabel: "Main",
    navHome: "Home",
    menu: "Menu",
    closeMenu: "Close menu",
    footerLine: "Across borders and distances, kindness still reaches you.",
    statsFallback: "The verified counts are not available yet.",
    translationLabel: "Translation",
    homeEyebrow: "MA'AKUM · WITH YOU",
    featuredTitle: "Messages from around the world",
    featuredLead: "Words of support, prayers, and hope for the people in Gaza.",
    viewAll: "View all messages",
    featuredEmpty: "No messages to show yet.",
    homeCloseTitle: "Whenever you are ready.",
    homeCloseLead: "Read a message, or leave a few kind words of your own.",
    homeTitle: "You are not alone.",
    homeLead:
      "Kind words from people all over the world, written for people in Gaza. Read them, answer them, or leave a few of your own.",
    readMessages: "Read messages",
    writeMessage: "Write a message",
    howTitle: "How it works",
    how1Title: "Someone writes",
    how1Body: "No account. A few kind words, and a country if you like.",
    how2Title: "Someone reads",
    how2Body: "A person in Gaza opens it and sees they were thought of.",
    how3Title: "An answer comes back",
    how3Body: "Short and sincere, from one person to another.",
    careTitle: "A gentle space",
    careBody:
      "Every message and reply is reviewed before it appears. No politics, no advertising, no contact details — only kindness.",
    messagesTitle: "Messages",
    messagesLead: "Words written for people in Gaza. Take your time.",
    readIn: "Read in",
    readOriginal: "Original",
    readArabic: "Arabic",
    readEnglish: "English",
    filterAll: "All",
    filterWithReplies: "With replies",
    showMore: "Show more",
    openConversation: "Read this conversation",
    translationMissing: "This translation is not available yet.",
    noMatchesTitle: "Nothing matches these choices.",
    noMatchesBody: "You can clear them and read every message.",
    clearFilters: "Clear filters",
    writeTitle: "Write a few kind words.",
    writeLead: "No account needed. Someone in Gaza may read your words today.",
    writeRules:
      "Please keep it kind: no politics, links, advertising or contact details. Every message is reviewed before it appears.",
    writeField: "Your message",
    writeHelp: "A few words are enough.",
    writeEmpty: "Please write a few words first.",
    writeName: "Your name",
    writeOptional: "(optional)",
    writeCountry: "Where are you writing from?",
    writeChoose: "Choose a country",
    writeLong: "Please keep it within 2,000 characters.",
    writeNameLong: "Please use a shorter name.",
    writeCountryInvalid: "Please choose a country from the list.",
    writeRate: "Please wait a moment, then try again.",
    writeBlocked: "This could not be sent from here.",
    writeFailed: "Something went wrong. Your words are still here.",
    writeOkTitle: "Your words are on their way.",
    writeOkBody: "Your message will be reviewed before it appears. Thank you for writing.",
    writeAgain: "Write another",
    replyField: "Your reply",
    replySend: "Send reply",
    replyOk: "Thank you. Your reply is waiting for a short review.",
    replyPending: "Waiting for review",
    replyClosed: "A reply cannot be added there.",
    replyMissing: "That message is no longer available.",
    replyTo: "Reply",
    replyingTo: "Replying to {name}",
    cancel: "Cancel",
    reached: "This reached me",
    repliesError: "The replies could not be loaded. The message above is still here.",
    send: "Send message",
    loading: "One moment",
    hopeTitle: "A little hope, one note at a time.",
    hopeLead: "Take a breath. Someone wrote this for you.",
    aboutTitle: "About Ma'akum",
    aboutLead:
      "Ma'akum is a quiet place for kind words written for people in Gaza. There is no account.",
    privacyTitle: "Privacy",
    privacyBody:
      "A message or reply you send is uploaded for review and appears only after it is approved. Your name and country are optional and are not checked. A reaction is remembered for this browser. Language and reading language stay in this browser under maakum.lang and maakum.read. There is no account.",
    notFoundTitle: "We couldn’t find that page",
    notFoundBody: "You can return home and read messages from there.",
    backHome: "Back home",
    missingTitle: "We couldn’t find that message",
    missingBody: "It may have been removed. You can read other messages instead.",
    backMessages: "Back to messages",
    errorTitle: "Something went wrong",
    retry: "Try again",
    anonymous: "Anonymous",
    noReplies: "No replies yet.",
    repliesTitle: "Replies",
    statsMessages: "messages",
    statsCountries: "countries",
    statsReplies: "replies",
    featuredLabel: "A small exchange",
  },
  ar: {
    skip: "انتقل إلى المحتوى",
    read: "اقرأ",
    write: "اكتب",
    close: "إغلاق",
    about: "عن معكم",
    privacy: "الخصوصية",
    care: "تُراجَع كل رسالة وكل ردّ قبل أن يظهر. لا سياسة ولا إعلانات ولا بيانات تواصل.",
    navLabel: "التنقل",
    navHome: "الرئيسية",
    menu: "القائمة",
    closeMenu: "إغلاق القائمة",
    footerLine: "عبر الحدود والمسافات، ما زال اللطف يصل إليكم.",
    statsFallback: "الأعداد الموثّقة غير متاحة بعد.",
    translationLabel: "الترجمة",
    homeEyebrow: "معكم · معك",
    featuredTitle: "رسائل من أنحاء العالم",
    featuredLead: "كلمات دعم ودعاء وأمل لأهل غزة.",
    viewAll: "كل الرسائل",
    featuredEmpty: "لا توجد رسائل لعرضها بعد.",
    homeCloseTitle: "حين تكون مستعدًا.",
    homeCloseLead: "اقرأ رسالة، أو اترك بضع كلمات طيبة من عندك.",
    homeTitle: "لستم وحدكم.",
    homeLead:
      "كلماتٌ طيبة من أناس في كل أنحاء العالم، كُتبت لأهل غزة. اقرؤوها، وردّوا عليها، أو اتركوا بضع كلمات من عندكم.",
    readMessages: "اقرأ الرسائل",
    writeMessage: "اكتب رسالة",
    howTitle: "كيف يعمل",
    how1Title: "شخصٌ يكتب",
    how1Body: "بلا حساب. بضع كلمات طيبة، ودولتك إن أحببت.",
    how2Title: "شخصٌ يقرأ",
    how2Body: "يفتحها أحدٌ في غزة فيرى أن هناك من فكّر فيه.",
    how3Title: "ويأتي الرد",
    how3Body: "قصيرٌ وصادق، من إنسان إلى إنسان.",
    careTitle: "مساحة هادئة",
    careBody:
      "تُراجَع كل رسالة وكل ردّ قبل أن يظهر. لا سياسة ولا إعلانات ولا بيانات تواصل، اللطف فقط.",
    messagesTitle: "الرسائل",
    messagesLead: "كلماتٌ كُتبت لأهل غزة. خذ وقتك.",
    readIn: "اقرأها",
    readOriginal: "الأصل",
    readArabic: "العربية",
    readEnglish: "الإنجليزية",
    filterAll: "الكل",
    filterWithReplies: "ذات ردود",
    showMore: "أظهر المزيد",
    openConversation: "اقرأ هذا الحوار",
    translationMissing: "هذه الترجمة غير متاحة بعد.",
    noMatchesTitle: "لا شيء يطابق هذا الاختيار.",
    noMatchesBody: "يمكنك إلغاء الاختيار وقراءة كل الرسائل.",
    clearFilters: "إلغاء الاختيار",
    writeTitle: "اكتب بضع كلمات طيبة.",
    writeLead: "لا حاجة إلى حساب. قد يقرأ أحدٌ في غزة كلماتك اليوم.",
    writeRules:
      "من فضلك اجعلها لطيفة: بلا سياسة أو روابط أو إعلانات أو بيانات تواصل. تُراجَع كل رسالة قبل أن تظهر.",
    writeField: "رسالتك",
    writeHelp: "بضع كلمات تكفي.",
    writeEmpty: "من فضلك اكتب بضع كلمات أولًا.",
    writeName: "اسمك",
    writeOptional: "(اختياري)",
    writeCountry: "من أين تكتب؟",
    writeChoose: "اختر الدولة",
    writeLong: "من فضلك اجعلها في حدود ألفَي حرف.",
    writeNameLong: "من فضلك استخدم اسمًا أقصر.",
    writeCountryInvalid: "من فضلك اختر دولة من القائمة.",
    writeRate: "من فضلك انتظر لحظة، ثم حاول مرة أخرى.",
    writeBlocked: "تعذّر الإرسال من هنا.",
    writeFailed: "حدث خطأ. كلماتك ما زالت هنا.",
    writeOkTitle: "كلماتك في طريقها.",
    writeOkBody: "ستُراجَع رسالتك قبل أن تظهر. شكرًا لأنك كتبت.",
    writeAgain: "اكتب رسالة أخرى",
    replyField: "ردّك",
    replySend: "أرسل الرد",
    replyOk: "شكرًا لك. ردّك بانتظار مراجعة قصيرة.",
    replyPending: "بانتظار المراجعة",
    replyClosed: "لا يمكن إضافة رد هنا.",
    replyMissing: "هذه الرسالة لم تعد متاحة.",
    replyTo: "رد",
    replyingTo: "رد على {name}",
    cancel: "إلغاء",
    reached: "وصلتني",
    repliesError: "تعذّر تحميل الردود. الرسالة أعلاه ما زالت هنا.",
    send: "أرسل الرسالة",
    loading: "لحظة",
    hopeTitle: "قليل من الأمل، رسالة بعد رسالة.",
    hopeLead: "خذ نفسًا عميقًا. شخصٌ كتب هذا من أجلك.",
    aboutTitle: "عن معكم",
    aboutLead: "معكم مكان هادئ لكلمات طيبة كُتبت لأهل غزة. لا يوجد حساب.",
    privacyTitle: "الخصوصية",
    privacyBody:
      "الرسالة أو الرد الذي ترسله يُرفع للمراجعة، ولا يظهر إلا بعد الموافقة عليه. اسمك ودولتك اختياريان ولا يتم التحقق منهما. يُحفظ تفاعلك في هذا المتصفح. تبقى اللغة ولغة القراءة في هذا المتصفح تحت المفاتيح maakum.lang و maakum.read. لا يوجد حساب.",
    notFoundTitle: "تعذّر العثور على هذه الصفحة",
    notFoundBody: "يمكنك العودة إلى البداية وقراءة الرسائل من هناك.",
    backHome: "العودة إلى البداية",
    missingTitle: "تعذّر العثور على هذه الرسالة",
    missingBody: "ربما أُزيلت. يمكنك قراءة رسائل أخرى.",
    backMessages: "العودة إلى الرسائل",
    errorTitle: "حدث خطأ",
    retry: "حاول مرة أخرى",
    anonymous: "مجهول",
    noReplies: "لا توجد ردود بعد.",
    repliesTitle: "الردود",
    statsMessages: "رسالة",
    statsCountries: "دولة",
    statsReplies: "ردًّا",
    featuredLabel: "حوار صغير",
  },
} as const;

export type ChromeKey = keyof typeof chrome.en;

export function translate(lang: UiLang, key: ChromeKey): string {
  return chrome[lang][key] || chrome.en[key];
}

export const PAGE_TITLES: Record<string, { en: string; ar: string }> = {
  "/": { en: "Ma'akum — You are not alone", ar: "معكم — لستم وحدكم." },
  "/messages": { en: "Messages — Ma'akum", ar: "الرسائل — معكم" },
  "/write": { en: "Write — Ma'akum", ar: "اكتب — معكم" },
  "/about": { en: "About — Ma'akum", ar: "عن معكم — معكم" },
  "/privacy": { en: "Privacy — Ma'akum", ar: "الخصوصية — معكم" },
  "/hope": { en: "A little hope — Ma'akum", ar: "قليل من الأمل — معكم" },
};

const BRAND = { en: "Ma'akum", ar: "معكم" } as const;

export function documentTitle(lang: UiLang, pathname: string, current = ""): string {
  const exact = PAGE_TITLES[pathname];
  if (exact) return exact[lang];

  if (pathname.startsWith("/messages/")) {
    const stem = current.split(" — ")[0]?.trim() ?? "";
    if (!stem || stem === "Ma'akum" || stem === "معكم" || stem === "Messages" || stem === "الرسائل") {
      return current || PAGE_TITLES["/messages"][lang];
    }
    if (stem === "Anonymous" || stem === "مجهول") return `${translate(lang, "anonymous")} — ${BRAND[lang]}`;
    if (stem === "Message" || stem === "رسالة") return `${lang === "ar" ? "رسالة" : "Message"} — ${BRAND[lang]}`;
    return `${stem} — ${BRAND[lang]}`;
  }

  return PAGE_TITLES["/"][lang];
}

export function relativeTime(minutes: number): { en: string; ar: string } {
  const count =
    minutes < 60 ? Math.max(1, minutes) : minutes < 1440 ? Math.max(1, Math.round(minutes / 60)) : Math.max(1, Math.round(minutes / 1440));
  const unit = minutes < 60 ? "minute" : minutes < 1440 ? "hour" : "day";
  const nouns = {
    minute: ["minute", "minutes"],
    hour: ["hour", "hours"],
    day: ["day", "days"],
  } as const;
  const arabic = {
    minute: ["دقيقة", "دقيقتين", "دقائق", "دقيقة"],
    hour: ["ساعة", "ساعتين", "ساعات", "ساعة"],
    day: ["يوم", "يومين", "أيام", "يوم"],
  } as const;
  const [one, two, few, many] = arabic[unit];
  const ar =
    count === 1 ? `قبل ${one}` : count === 2 ? `قبل ${two}` : count <= 10 ? `قبل ${count} ${few}` : `قبل ${count} ${many}`;

  return {
    en: `${count} ${nouns[unit][count === 1 ? 0 : 1]} ago`,
    ar,
  };
}

export function replyCount(count: number): { en: string; ar: string } {
  if (count <= 0) {
    return { en: translate("en", "noReplies"), ar: translate("ar", "noReplies") };
  }
  const ar =
    count === 1 ? "ردّ واحد" : count === 2 ? "ردّان" : count <= 10 ? `${count} ردود` : `${count} ردًّا`;
  return { en: count === 1 ? "1 reply" : `${count} replies`, ar };
}
