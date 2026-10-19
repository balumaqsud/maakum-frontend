/* Ma'akum prototype — example content.
   Every message/reply has `orig` (language it was written in) and `text` keyed by language code.
   In the real product `text.ar` / `text.en` would come from machine translation + review.
   `ago` is minutes since posting. Replies from Gaza use country "ps". */
window.MAAKUM = {
  stats: { messages: 12480, countries: 94, replies: 3206 },

  langs: {
    ar: { en: 'Arabic', ar: 'العربية' },
    en: { en: 'English', ar: 'الإنجليزية' },
    uz: { en: 'Uzbek', ar: 'الأوزبكية' },
    es: { en: 'Spanish', ar: 'الإسبانية' },
    ko: { en: 'Korean', ar: 'الكورية' },
    tr: { en: 'Turkish', ar: 'التركية' },
    fr: { en: 'French', ar: 'الفرنسية' }
  },

  countries: [
    { id: 'au', en: 'Australia', ar: 'أستراليا' },
    { id: 'ca', en: 'Canada', ar: 'كندا' },
    { id: 'eg', en: 'Egypt', ar: 'مصر' },
    { id: 'fr', en: 'France', ar: 'فرنسا' },
    { id: 'de', en: 'Germany', ar: 'ألمانيا' },
    { id: 'id', en: 'Indonesia', ar: 'إندونيسيا' },
    { id: 'it', en: 'Italy', ar: 'إيطاليا' },
    { id: 'jp', en: 'Japan', ar: 'اليابان' },
    { id: 'jo', en: 'Jordan', ar: 'الأردن' },
    { id: 'my', en: 'Malaysia', ar: 'ماليزيا' },
    { id: 'ma', en: 'Morocco', ar: 'المغرب' },
    { id: 'ps', en: 'Gaza, Palestine', ar: 'غزة، فلسطين' },
    { id: 'pk', en: 'Pakistan', ar: 'باكستان' },
    { id: 'sa', en: 'Saudi Arabia', ar: 'السعودية' },
    { id: 'kr', en: 'South Korea', ar: 'كوريا الجنوبية' },
    { id: 'es', en: 'Spain', ar: 'إسبانيا' },
    { id: 'tr', en: 'Türkiye', ar: 'تركيا' },
    { id: 'gb', en: 'United Kingdom', ar: 'المملكة المتحدة' },
    { id: 'us', en: 'United States', ar: 'الولايات المتحدة' },
    { id: 'uz', en: 'Uzbekistan', ar: 'أوزبكستان' },
    { id: 'other', en: 'Somewhere else', ar: 'مكان آخر' }
  ],

  messages: [
    {
      id: 'm1', name: 'Madina', country: 'uz', orig: 'uz', ago: 130, reactions: 48,
      text: {
        uz: 'Sizni unutganimiz yo‘q. Umid qilamanki, siz va oilangiz xavfsizsiz.',
        en: 'We have not forgotten you. I hope you and your family are safe.',
        ar: 'لم ننسكم. أتمنى أن تكونوا أنتم وعائلتكم بخير.'
      },
      replies: [
        {
          id: 'r1', name: 'Amal', country: 'ps', orig: 'ar', ago: 95,
          text: {
            ar: 'شكرًا لأنكم تذكروننا. كلماتكم تعني لنا أكثر مما تتصورون.',
            en: 'Thank you for remembering us. Your words mean more than you know.'
          },
          children: [
            {
              id: 'r2', name: 'Madina', country: 'uz', orig: 'uz', ago: 70,
              text: {
                uz: 'Har kuni sizlar uchun duo qilaman.',
                en: 'I make dua for you every day.',
                ar: 'أدعو لكم كل يوم.'
              }
            },
            {
              id: 'r3', name: 'Amal', country: 'ps', orig: 'ar', ago: 40, to: 'Madina',
              text: {
                ar: 'جزاكِ الله خيرًا. سلامي لأهلك في أوزبكستان.',
                en: 'May God reward you with goodness. My greetings to your family in Uzbekistan.'
              }
            }
          ]
        },
        {
          id: 'r4', name: 'Mahmoud', country: 'ps', orig: 'ar', ago: 60,
          text: {
            ar: 'وصلتني رسالتك اليوم، وكنت أحتاج إليها.',
            en: 'Your message reached me today, and I needed it.'
          }
        }
      ]
    },
    {
      id: 'm2', name: 'Daniel', country: 'es', orig: 'es', ago: 300, reactions: 31,
      text: {
        es: 'Hoy pensé en ustedes mientras tomaba mi café de la mañana. Quiero que sepan que hay gente al otro lado del mundo que los lleva en el corazón.',
        en: 'I thought of you this morning over my coffee. I want you to know that there are people on the other side of the world who carry you in their hearts.',
        ar: 'فكرت فيكم هذا الصباح وأنا أشرب قهوتي. أريدكم أن تعلموا أن هناك أناسًا في الطرف الآخر من العالم يحملونكم في قلوبهم.'
      },
      replies: [
        {
          id: 'r5', name: 'Huda', country: 'ps', orig: 'ar', ago: 210,
          text: {
            ar: 'قهوتك ورسالتك… شكرًا يا دانيال. قرأتها وأنا جالسة مع أمي، وابتسمنا معًا.',
            en: 'Your coffee and your message… thank you, Daniel. I read it sitting with my mother, and we smiled together.'
          },
          children: [
            {
              id: 'r6', name: 'Daniel', country: 'es', orig: 'es', ago: 150,
              text: {
                es: 'Me alegra tanto. Abrázala de mi parte.',
                en: 'That makes me so glad. Give her a hug from me.',
                ar: 'هذا يسعدني كثيرًا. احتضنيها نيابةً عني.'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'm3', name: null, country: 'kr', orig: 'ko', ago: 480, reactions: 22,
      text: {
        ko: '멀리 있지만 마음은 늘 함께 있어요. 오늘 하루도 무사하길 기도합니다.',
        en: 'Far away, but my heart is always with you. I pray you get through today safely.',
        ar: 'نحن بعيدون، لكن قلبي دائمًا معكم. أدعو أن يمر يومكم بسلام.'
      },
      replies: []
    },
    {
      id: 'm4', name: 'Yusuf', country: 'tr', orig: 'tr', ago: 720, reactions: 37,
      text: {
        tr: 'Çocuklarınızın kahkahasını yeniden duyabileceğiniz günler yakın olsun. Dualarımız sizinle.',
        en: 'May the days come soon when you hear your children laughing again. Our prayers are with you.',
        ar: 'عسى أن تأتي قريبًا أيام تسمعون فيها ضحكات أطفالكم من جديد. دعواتنا معكم.'
      },
      replies: [
        {
          id: 'r7', name: 'Rawan', country: 'ps', orig: 'ar', ago: 600,
          text: {
            ar: 'آمين يا يوسف. نحن نتمسك بهذا الأمل كل يوم.',
            en: 'Ameen, Yusuf. We hold on to that hope every day.'
          }
        }
      ]
    },
    {
      id: 'm5', name: 'Sarah', country: 'ca', orig: 'en', ago: 1000, reactions: 64,
      text: {
        en: "I don't know you, and I can't fix anything. But I wanted to say: you matter, and someone in Toronto is thinking of you tonight.",
        ar: 'لا أعرفكم، ولا أستطيع أن أُصلح شيئًا. لكنني أردت أن أقول: أنتم مهمّون، وهناك من يفكر فيكم الليلة في تورنتو.'
      },
      replies: [
        {
          id: 'r8', name: 'Rana', country: 'ps', orig: 'ar', ago: 800,
          text: {
            ar: 'قرأتُ رسالتك على ضوء شمعة صغيرة. بكيتُ قليلًا، وابتسمتُ. شكرًا يا سارة.',
            en: 'I read your message by the light of a small candle. I cried a little, and smiled. Thank you, Sarah.'
          },
          children: [
            {
              id: 'r9', name: 'Sarah', country: 'ca', orig: 'en', ago: 700,
              text: {
                en: "I'm so glad it found you. I'll keep thinking of you.",
                ar: 'يسعدني أنها وصلتك. سأظل أفكر فيكم.'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'm6', name: 'Amina', country: 'ma', orig: 'ar', ago: 1500, reactions: 29,
      text: {
        ar: 'اللهم اربط على قلوبهم وثبّت أقدامهم وارزقهم الأمان. أنتم في دعائنا كل ليلة.',
        en: 'O God, steady their hearts, keep them firm, and grant them safety. You are in our prayers every night.'
      },
      replies: []
    },
    {
      id: 'm7', name: 'Lucas', country: 'fr', orig: 'fr', ago: 2200, reactions: 18,
      text: {
        fr: 'Je ne sais pas quoi dire, alors je dis simplement : vous êtes dans mes pensées. Prenez soin de vous.',
        en: "I don't know what to say, so I'll simply say: you are in my thoughts. Take care of yourselves.",
        ar: 'لا أعرف ماذا أقول، فأقول ببساطة: أنتم في أفكاري. اعتنوا بأنفسكم.'
      },
      replies: [
        {
          id: 'r10', name: 'Layla', country: 'ps', orig: 'ar', ago: 1900,
          text: {
            ar: 'هذه الجملة البسيطة كانت كافية. شكرًا لك.',
            en: 'That simple sentence was enough. Thank you.'
          }
        }
      ]
    },
    {
      id: 'm8', name: 'Hana', country: 'jp', orig: 'en', ago: 3000, reactions: 26,
      text: {
        en: 'Wishing you a quiet night and a peaceful morning. Even a small piece of calm is worth wishing for.',
        ar: 'أتمنى لكم ليلة هادئة وصباحًا مطمئنًا. حتى قدرٌ صغير من الهدوء يستحق أن نتمناه.'
      },
      replies: []
    }
  ]
};
