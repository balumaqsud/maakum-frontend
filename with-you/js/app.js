/* Ma'akum prototype — interaction layer.
   Plain ES2015, no dependencies. Everything is simulated locally (no backend).
   Sections: strings · helpers · rendering · global events · pages. */
(function () {
  'use strict';

  var D = window.MAAKUM;
  var page = document.body.getAttribute('data-page') || (document.querySelector('meta[name="maakum-page"]') || {}).content;

  /* ---------- strings (UI language: en / ar) ---------- */
  var I = {
    en: {
      skip: 'Skip to content', theme_aria: 'Switch light or dark', nav_read: 'Read', nav_write: 'Write', lang_aria: 'Language of this message',
      title_home: "Ma'akum — You are not alone", title_messages: "Messages — Ma'akum", title_message: "A message — Ma'akum",
      title_send: "Write a message — Ma'akum", title_hope: "A little hope — Ma'akum",
      home_kicker: "Ma'akum · With you", home_title: 'You are not alone.',
      home_lead: 'Kind words from people all over the world, written for people in Gaza. Read them, answer them, or leave a few of your own.',
      btn_read: 'Read messages', btn_write: 'Write a message',
      ex_title: 'A small exchange', ex_open: 'Read the whole conversation',
      hope_cta_t: 'Need some hope today?', hope_cta_d: 'We’ll show you one message at a time, gently.', hope_cta_b: 'Show me one',
      how_title: 'How it works',
      how1_t: 'Someone writes', how1_d: 'No account. A few kind words, and a country if you like.',
      how2_t: 'Someone reads', how2_d: 'A person in Gaza opens it and sees they were thought of.',
      how3_t: 'An answer comes back', how3_d: 'Short and sincere, from one person to another.',
      care_t: 'A gentle space', care_d: 'Every message and reply is reviewed before it appears. No politics, no advertising, no contact details — only kindness.',
      st_messages: 'messages', st_countries: 'countries', st_replies: 'replies',
      foot_rules: 'Every message and reply is reviewed before it appears. No politics, advertising or contact details.',
      foot_proto: "Ma'akum is a design prototype. The messages shown are examples.",
      msgs_kicker: 'From around the world', msgs_title: 'Messages', msgs_lead: 'Words written for people in Gaza. Take your time.',
      read_in: 'Read in', show_lbl: 'Show', read_orig: 'Original', f_all: 'All', f_replies: 'With replies',
      show_more: 'Show more notes', msgs_end_t: 'That’s all for now.', msgs_end_d: 'New messages arrive through the day.',
      hope_link: 'Read one at a time', back: 'Back to messages',
      reached: 'This reached me', reply_btn: 'Reply', anonymous: 'Anonymous',
      written_in: 'Written in {l}', translated_from: 'Translated from {l}',
      replies_title: 'Replies', no_replies_t: 'No replies yet.', no_replies_d: 'If these words reached you, you can answer them.',
      reply_ph: 'Write a few words back…', rf_name: 'Your name (optional)', rf_country: 'Country (optional)',
      rf_send: 'Send reply', rf_cancel: 'Cancel', replying_to: 'Replying to {n}', in_reply_to: 'In reply to {n}',
      reply_wait: 'Waiting for review — it will appear after a short check.',
      reply_sent: 'Thank you. Your reply is waiting for a short review.',
      reply_err: 'Please write a few words first.', rf_label: 'Your reply', t_now: 'just now',
      nf_title: 'We couldn’t find that message', nf_d: 'It may have been removed. You can read other messages instead.',
      send_kicker: 'Write', send_title: 'Write a few kind words.',
      send_lead: 'No account needed. Someone in Gaza may read your words today.',
      send_rules: 'Please keep it kind: no politics, links, advertising or contact details. Every message is reviewed before it appears.',
      send_translate: 'We’ll make it readable in Arabic and English.',
      f_msg: 'Your message', starters: 'Not sure how to begin?',
      s1: 'Thinking of you.', s2: 'You are not forgotten.', s3: 'I’m praying for you.',
      f_name: 'Your name', f_opt: '(optional)', f_country: 'Where are you writing from?', choose: 'Choose a country',
      send_btn: 'Send message',
      err_short: 'Just a little more — a few words are enough.',
      err_contact: 'Please remove links or contact details, to keep everyone safe.',
      ok_title: 'Your words are on their way.',
      ok_body: 'Your message will be reviewed before it appears. Thank you for reminding someone that they are not alone.',
      ok_label: 'What you wrote', ok_again: 'Write another', ok_read: 'Read messages',
      ph1: 'Say hello. Say you’re thinking of them. A few words are enough.',
      ph2: 'Write as you would to someone you care about.',
      ph3: 'You don’t need the right words. Honest ones are enough.',
      hope_kicker: 'I need some hope today', hope_title: 'A little hope, one note at a time.',
      hope_intro: 'Take a breath. Someone wrote this for you.', hope_go: 'Show me a message', hope_next: 'Another message',
      hope_done_t: 'That’s all for now.', hope_done_d: 'More arrive through the day. Come back later, or leave a few words of your own.',
      hope_close: 'Close'
    },
    ar: {
      skip: 'انتقل إلى المحتوى', theme_aria: 'تبديل الوضع الفاتح أو الداكن', nav_read: 'اقرأ', nav_write: 'اكتب', lang_aria: 'لغة هذه الرسالة',
      title_home: 'معكم — لستم وحدكم', title_messages: 'الرسائل — معكم', title_message: 'رسالة — معكم',
      title_send: 'اكتب رسالة — معكم', title_hope: 'قليل من الأمل — معكم',
      home_kicker: 'معكم · رسائل من القلب', home_title: 'لستم وحدكم.',
      home_lead: 'كلماتٌ طيبة من أناس في كل أنحاء العالم، كُتبت لأهل غزة. اقرؤوها، وردّوا عليها، أو اتركوا بضع كلمات من عندكم.',
      btn_read: 'اقرأ الرسائل', btn_write: 'اكتب رسالة',
      ex_title: 'حوار صغير', ex_open: 'اقرأ المحادثة كاملة',
      hope_cta_t: 'تحتاج بعض الأمل اليوم؟', hope_cta_d: 'سنعرض لك رسالة واحدة في كل مرة، بهدوء.', hope_cta_b: 'أرني رسالة',
      how_title: 'كيف يعمل',
      how1_t: 'شخصٌ يكتب', how1_d: 'بلا حساب. بضع كلمات طيبة، ودولتك إن أحببت.',
      how2_t: 'شخصٌ يقرأ', how2_d: 'يفتحها أحدٌ في غزة فيرى أن هناك من فكّر فيه.',
      how3_t: 'ويأتي الرد', how3_d: 'قصيرٌ وصادق، من إنسان إلى إنسان.',
      care_t: 'مساحة هادئة', care_d: 'تُراجَع كل رسالة وكل ردّ قبل أن يظهر. لا سياسة ولا إعلانات ولا بيانات تواصل، اللطف فقط.',
      st_messages: 'رسالة', st_countries: 'دولة', st_replies: 'ردًّا',
      foot_rules: 'تُراجَع كل رسالة وكل ردّ قبل أن يظهر. لا سياسة ولا إعلانات ولا بيانات تواصل.',
      foot_proto: 'معكم نموذج تصميمي أوّلي. الرسائل المعروضة أمثلة.',
      msgs_kicker: 'من أنحاء العالم', msgs_title: 'الرسائل', msgs_lead: 'كلماتٌ كُتبت لأهل غزة. خذ وقتك.',
      read_in: 'القراءة بـ', show_lbl: 'عرض', read_orig: 'الأصلية', f_all: 'الكل', f_replies: 'التي لها ردود',
      show_more: 'اعرض المزيد', msgs_end_t: 'هذا كل شيء الآن.', msgs_end_d: 'تصل رسائل جديدة على مدار اليوم.',
      hope_link: 'اقرأ رسالة واحدة كل مرة', back: 'العودة إلى الرسائل',
      reached: 'وصلتني', reply_btn: 'رد', anonymous: 'مجهول',
      written_in: 'اللغة الأصلية: {l}', translated_from: 'مترجمة من {l}',
      replies_title: 'الردود', no_replies_t: 'لا توجد ردود بعد.', no_replies_d: 'إن وصلتكم هذه الكلمات، يمكنكم الرد عليها.',
      reply_ph: 'اكتب بضع كلمات في الرد…', rf_name: 'اسمك (اختياري)', rf_country: 'الدولة (اختياري)',
      rf_send: 'أرسل الرد', rf_cancel: 'إلغاء', replying_to: 'رد على {n}', in_reply_to: 'ردًا على {n}',
      reply_wait: 'بانتظار المراجعة — سيظهر بعد فحص قصير.',
      reply_sent: 'شكرًا لك. ردّك بانتظار مراجعة قصيرة.',
      reply_err: 'من فضلك اكتب بضع كلمات أولًا.', rf_label: 'ردّك', t_now: 'الآن',
      nf_title: 'تعذّر العثور على هذه الرسالة', nf_d: 'ربما أُزيلت. يمكنك قراءة رسائل أخرى.',
      send_kicker: 'اكتب', send_title: 'اكتب بضع كلمات طيبة.',
      send_lead: 'لا حاجة إلى حساب. قد يقرأ أحدٌ في غزة كلماتك اليوم.',
      send_rules: 'من فضلك اجعلها لطيفة: بلا سياسة أو روابط أو إعلانات أو بيانات تواصل. تُراجَع كل رسالة قبل أن تظهر.',
      send_translate: 'سنجعلها مقروءة بالعربية والإنجليزية.',
      f_msg: 'رسالتك', starters: 'لا تعرف كيف تبدأ؟',
      s1: 'أفكر فيكم.', s2: 'لستم منسيين.', s3: 'أدعو لكم.',
      f_name: 'اسمك', f_opt: '(اختياري)', f_country: 'من أين تكتب؟', choose: 'اختر الدولة',
      send_btn: 'أرسل الرسالة',
      err_short: 'بضع كلمات أخرى فقط — القليل يكفي.',
      err_contact: 'من فضلك احذف الروابط وبيانات التواصل حفاظًا على سلامة الجميع.',
      ok_title: 'كلماتك في طريقها.',
      ok_body: 'ستُراجَع رسالتك قبل أن تظهر. شكرًا لأنك ذكّرت أحدهم بأنه ليس وحده.',
      ok_label: 'ما كتبته', ok_again: 'اكتب رسالة أخرى', ok_read: 'اقرأ الرسائل',
      ph1: 'قل مرحبًا. قل إنك تفكر فيهم. بضع كلمات تكفي.',
      ph2: 'اكتب كما تكتب لشخص تحبه.',
      ph3: 'لا تحتاج إلى كلمات مثالية. يكفي أن تكون صادقة.',
      hope_kicker: 'أحتاج بعض الأمل اليوم', hope_title: 'قليل من الأمل، رسالة بعد رسالة.',
      hope_intro: 'خذ نفسًا عميقًا. شخصٌ كتب هذا من أجلك.', hope_go: 'أرني رسالة', hope_next: 'رسالة أخرى',
      hope_done_t: 'هذا كل شيء الآن.', hope_done_d: 'تصل رسائل جديدة على مدار اليوم. عُد لاحقًا، أو اترك بضع كلمات من عندك.',
      hope_close: 'إغلاق'
    }
  };

  /* ---------- state ---------- */
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage may be blocked */ } }
  var ui = (function () {
    var s = load('maakum.lang');
    if (s === 'ar' || s === 'en') return s;
    return (navigator.language || '').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
  })();
  var readPref = (function () { var s = load('maakum.read'); return (s === 'orig' || s === 'ar' || s === 'en') ? s : ui; })();
  var view = {};                                        // per-item language override
  var reacted = (function () { try { return JSON.parse(load('maakum.react') || '[]'); } catch (e) { return []; } })();
  var render = function () {};                          // set by each page

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function t(key, vars) {
    var s = (I[ui] && I[ui][key]) || I.en[key] || key;
    if (vars) for (var k in vars) s = s.replace('{' + k + '}', vars[k]);
    return s;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function countryName(id) {
    for (var i = 0; i < D.countries.length; i++) if (D.countries[i].id === id) return D.countries[i][ui];
    return '';
  }
  function langName(l) { return D.langs[l] ? D.langs[l][ui] : l; }
  function ago(min) {
    if (min < 1) return t('t_now');
    var n, u;
    if (min < 60) { n = Math.round(min); u = 'm'; }
    else if (min < 1440) { n = Math.round(min / 60); u = 'h'; }
    else { n = Math.round(min / 1440); u = 'd'; }
    if (ui === 'ar') {
      var w = { m: ['دقيقة', 'دقيقتين', 'دقائق', 'دقيقة'], h: ['ساعة', 'ساعتين', 'ساعات', 'ساعة'], d: ['يوم', 'يومين', 'أيام', 'يومًا'] }[u];
      if (n === 1) return 'منذ ' + w[0];
      if (n === 2) return 'منذ ' + w[1];
      return 'منذ ' + n + ' ' + (n <= 10 ? w[2] : w[3]);
    }
    var word = { m: 'minute', h: 'hour', d: 'day' }[u];
    return n + ' ' + word + (n === 1 ? '' : 's') + ' ago';
  }
  function fmt(n) { try { return new Intl.NumberFormat('en').format(n); } catch (e) { return String(n); } }
  function detectLang(s) { return /[؀-ۿ]/.test(s) ? 'ar' : 'en'; }
  var CONTACT = /(https?:\/\/|www\.|\S+@\S+\.\S+|(^|\s)@\w{3,}|\+?\d[\d\s().-]{7,}\d)/i;

  function findMessage(id) { for (var i = 0; i < D.messages.length; i++) if (D.messages[i].id === id) return D.messages[i]; return null; }
  function ctx(list, id, parent) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return { node: list[i], parent: parent };
      if (list[i].children) { var c = ctx(list[i].children, id, list[i]); if (c) return c; }
    }
    return null;
  }
  function findItem(id) {
    var m = findMessage(id); if (m) return m;
    for (var i = 0; i < D.messages.length; i++) { var c = ctx(D.messages[i].replies, id, null); if (c) return c.node; }
    return null;
  }
  function countReplies(list) {
    var n = 0;
    (list || []).forEach(function (r) { n += 1 + countReplies(r.children); });
    return n;
  }
  function curLang(it) {
    var v = view[it.id];
    if (v && it.text[v]) return v;
    if (readPref === 'orig') return it.orig;
    return it.text[readPref] ? readPref : it.orig;
  }

  /* ---------- rendering ---------- */
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg>';

  function zoneHTML(it) {
    var cur = curLang(it);
    var txt = it.text[cur] || it.text[it.orig];
    var p = '<p class="t" lang="' + cur + '" dir="' + (cur === 'ar' ? 'rtl' : 'ltr') + '">' + esc(txt) + '</p>';
    if (it.pending) return p + '<p class="pending-tag">' + t('reply_wait') + '</p>';
    var langs = (it.orig === 'ar' || it.orig === 'en') ? ['ar', 'en'] : [it.orig, 'ar', 'en'];
    var tabs = langs.map(function (l) {
      var label = (l === it.orig && l !== 'ar' && l !== 'en') ? t('read_orig') : (l === 'ar' ? 'العربية' : 'English');
      var attr = (l === 'ar') ? ' lang="ar"' : '';
      return '<button type="button" class="tab" data-note="' + it.id + '" data-lang="' + l + '" aria-pressed="' + (l === cur) + '"' + attr + '>' + label + '</button>';
    }).join('');
    var note = cur === it.orig ? t('written_in', { l: langName(it.orig) }) : t('translated_from', { l: langName(it.orig) });
    return p + '<div class="tools"><div class="tabs" role="group" aria-label="' + t('lang_aria') + '">' + tabs + '</div><p class="lang-note">' + esc(note) + '</p></div>';
  }

  function reachBtn(m) {
    var on = reacted.indexOf(m.id) > -1;
    return '<button type="button" class="reach" data-react="' + m.id + '" aria-pressed="' + on + '">' + HEART +
      '<span>' + t('reached') + '</span><span class="count">' + (m.reactions + (on ? 1 : 0)) + '</span></button>';
  }

  function metaHTML(it) {
    return '<header class="meta"><span class="who">' + esc(it.name || t('anonymous')) + '</span>' +
      (countryName(it.country) ? '<span class="place">' + esc(countryName(it.country)) + '</span>' : '') +
      '<time>' + ago(it.ago) + '</time></header>';
  }

  function noteHTML(m, o) {
    o = o || {};
    var rc = countReplies(m.replies);
    var actions = '';
    if (!o.bare) {
      actions = '<div class="note-actions">' + reachBtn(m) + (o.detail
        ? '<button type="button" class="link" data-action="reply-top">' + t('reply_btn') + '</button>'
        : '<a class="link" href="message.html?id=' + m.id + '">' + t('reply_btn') + (rc ? ' <span class="count">· ' + rc + '</span>' : '') + '</a>') + '</div>';
    }
    return '<article class="note' + (o.hero ? ' note--hero' : '') + (o.enter ? ' enter' : '') + '" data-id="' + m.id + '">' +
      metaHTML(m) + '<div class="zone">' + zoneHTML(m) + '</div>' + actions + '</article>';
  }

  /* Depth is capped at 3 levels: message > reply > reply.
     Anything deeper stays on the third level and says "In reply to …". */
  function collect(list, level, parent, out) {
    (list || []).forEach(function (c) {
      out.push({ node: c, to: c.to || (level > 1 ? (parent.name || t('anonymous')) : '') });
      collect(c.children, level + 1, c, out);
    });
  }

  function replyHTML(r, depth, o, toName) {
    o = o || {};
    var kids = '';
    if (depth === 0) {
      var flat = [];
      collect(r.children, 1, r, flat);
      kids = flat.map(function (f) { return replyHTML(f.node, 1, o, f.to); }).join('');
    }
    var to = toName || r.to;
    return '<li class="reply' + (r.pending ? ' pending' : '') + '" id="' + r.id + '" data-id="' + r.id + '" data-name="' + esc(r.name || t('anonymous')) + '">' +
      metaHTML(r) +
      (to ? '<p class="to">' + esc(t('in_reply_to', { n: to })) + '</p>' : '') +
      '<div class="zone">' + zoneHTML(r) + '</div>' +
      (o.bare ? '' : '<div class="reply-actions"><button type="button" class="link reply-to" data-target="' + r.id + '">' + t('reply_btn') + '</button></div><div class="form-host" data-host="' + r.id + '"></div>') +
      (kids ? '<ul class="replies">' + kids + '</ul>' : '') + '</li>';
  }

  function fillCountries(sel, placeholder) {
    var cur = sel.value;
    sel.innerHTML = (placeholder ? '<option value="">' + esc(t('choose')) + '</option>' : '<option value=""></option>') +
      D.countries.map(function (c) { return '<option value="' + c.id + '">' + esc(c[ui]) + '</option>'; }).join('');
    if (cur) sel.value = cur;
  }

  function seg(el, options, current, onPick) {
    el.innerHTML = options.map(function (o) {
      return '<button type="button" data-k="' + o.k + '" aria-pressed="' + (o.k === current) + '"' + (o.lang ? ' lang="' + o.lang + '"' : '') + '>' + esc(o.label) + '</button>';
    }).join('');
    $$('button', el).forEach(function (b) { b.addEventListener('click', function () { onPick(b.getAttribute('data-k')); }); });
  }

  /* ---------- i18n application ---------- */
  function applyI18n() {
    document.documentElement.lang = ui;
    document.documentElement.dir = ui === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.title = t('title_' + page);
    var lt = $('#langToggle');
    if (lt) { lt.textContent = ui === 'ar' ? 'English' : 'العربية'; lt.setAttribute('lang', ui === 'ar' ? 'en' : 'ar'); }
    $$('.nav a[data-page]').forEach(function (a) {
      var on = a.getAttribute('data-page') === page || (page === 'message' && a.getAttribute('data-page') === 'messages');
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  function setLang(l) {
    ui = l; save('maakum.lang', l);
    readPref = l; save('maakum.read', l);
    view = {};
    applyI18n(); render();
  }

  /* ---------- global events (delegated) ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b) return;

    if (b.id === 'langToggle') { setLang(ui === 'ar' ? 'en' : 'ar'); return; }
    if (b.id === 'themeToggle') { setTheme(effectiveTheme() === 'dark' ? 'light' : 'dark'); return; }

    if (b.hasAttribute('data-react')) {
      var id = b.getAttribute('data-react'), m = findMessage(id), i = reacted.indexOf(id), on = i < 0;
      if (on) reacted.push(id); else reacted.splice(i, 1);
      save('maakum.react', JSON.stringify(reacted));
      b.setAttribute('aria-pressed', on);
      b.querySelector('.count').textContent = m.reactions + (on ? 1 : 0);
      b.classList.remove('pop'); void b.offsetWidth; if (on) b.classList.add('pop');
      return;
    }

    if (b.classList.contains('tab') && b.hasAttribute('data-note')) {
      var item = findItem(b.getAttribute('data-note')), lang = b.getAttribute('data-lang');
      if (!item) return;
      view[item.id] = lang;
      var zone = b.closest('.zone');
      zone.innerHTML = zoneHTML(item);
      var nb = zone.querySelector('[data-lang="' + lang + '"]'); if (nb) nb.focus();
    }
  });

  /* ---------- pages ---------- */
  function homePage() {
    render = function () {
      var m = findMessage('m1');
      var first = Object.assign({}, m.replies[0], { children: [] });
      $('#featured').innerHTML = noteHTML(m, { bare: true }) + '<ul class="replies">' + replyHTML(first, 0, { bare: true }) + '</ul>';
      $('#stats').innerHTML =
        '<span><strong>' + fmt(D.stats.messages) + '</strong> ' + t('st_messages') + '</span>' +
        '<span><strong>' + fmt(D.stats.countries) + '</strong> ' + t('st_countries') + '</span>' +
        '<span><strong>' + fmt(D.stats.replies) + '</strong> ' + t('st_replies') + '</span>';
    };
    render();
  }

  function messagesPage() {
    var filter = 'all', shown = 4, step = 4;
    render = function (from) {
      var from0 = typeof from === 'number' ? from : 99;
      seg($('#readSeg'), [{ k: 'orig', label: t('read_orig') }, { k: 'ar', label: 'العربية', lang: 'ar' }, { k: 'en', label: 'English' }], readPref, function (k) {
        readPref = k; save('maakum.read', k); view = {}; render();
      });
      seg($('#filterSeg'), [{ k: 'all', label: t('f_all') }, { k: 'replies', label: t('f_replies') }], filter, function (k) {
        filter = k; shown = step; render();
      });
      var list = D.messages.filter(function (m) { return filter === 'all' || m.replies.length; });
      var slice = list.slice(0, shown);
      $('#noteList').innerHTML = slice.map(function (m, i) { return noteHTML(m, { enter: i >= from0 }); }).join('');
      var more = $('#more');
      if (shown < list.length) {
        more.innerHTML = '<button type="button" class="btn btn-ghost" id="moreBtn">' + t('show_more') + '</button>';
        $('#moreBtn').addEventListener('click', function () {
          var prev = shown; shown += step; render(prev);
          var target = $('#noteList').children[prev]; if (target) { var h = target.querySelector('.tab, .reach'); if (h) h.focus({ preventScroll: true }); }
        });
      } else {
        more.innerHTML = '<div class="orn" aria-hidden="true"><i></i><i></i><i></i></div><div class="end"><h3>' + t('msgs_end_t') + '</h3><p>' + t('msgs_end_d') + '</p>' +
          '<a class="link" href="hope.html">' + t('hope_link') + '</a></div>';
      }
    };
    render();
  }

  function messagePage() {
    var m = (function () {
      var q = /[?&]id=([^&]+)/.exec(location.search);
      return findMessage(q ? decodeURIComponent(q[1]) : 'm1');
    })();
    var form = $('#replyForm'), slot = $('#replySlot'), ta = $('#rf-text'), nm = $('#rf-name'), cs = $('#rf-country');
    var err = $('#rf-err'), live = $('#rf-live');
    if (!m) {
      $('#original').innerHTML = '<div class="empty"><p class="empty-t">' + t('nf_title') + '</p><p>' + t('nf_d') + '</p></div>';
      form.hidden = true; $('#threadWrap').hidden = true;
      render = function () { $('#original').innerHTML = '<div class="empty"><p class="empty-t">' + t('nf_title') + '</p><p>' + t('nf_d') + '</p></div>'; };
      return;
    }

    function resetForm() {
      slot.appendChild(form);
      form.setAttribute('data-target', '');
      $('#rf-to').textContent = ''; $('#rf-to').hidden = true; $('#rf-cancel').hidden = true;
    }
    function moveForm(host, name, targetId) {
      host.appendChild(form);
      form.setAttribute('data-target', targetId || '');
      $('#rf-to').textContent = name ? t('replying_to', { n: name }) : '';
      $('#rf-to').hidden = !name; $('#rf-cancel').hidden = !name;
      form.classList.add('expanded'); ta.focus();
    }

    render = function () {
      resetForm();
      fillCountries(cs, false);
      $('#original').innerHTML = noteHTML(m, { hero: true, detail: true });
      var n = countReplies(m.replies);
      $('#thTitle').textContent = t('replies_title') + (n ? ' · ' + n : '');
      $('#thread').innerHTML = n
        ? '<ul class="replies root">' + m.replies.map(function (r) { return replyHTML(r, 0); }).join('') + '</ul>'
        : '<div class="empty"><p class="empty-t">' + t('no_replies_t') + '</p><p>' + t('no_replies_d') + '</p></div>';
      document.title = t('title_message').replace('A message', (m.name || t('anonymous')) + ' —').replace(' — — ', ' — ');
    };
    render();

    form.addEventListener('focusin', function () { form.classList.add('expanded'); });
    $('#rf-cancel').addEventListener('click', function () { resetForm(); });
    ta.addEventListener('input', function () { err.textContent = ''; ta.removeAttribute('aria-invalid'); });

    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('button') : null;
      if (!b) return;
      if (b.getAttribute('data-action') === 'reply-top') {
        resetForm(); form.classList.add('expanded');
        form.scrollIntoView({ behavior: 'smooth', block: 'center' }); ta.focus({ preventScroll: true });
      }
      if (b.classList.contains('reply-to')) {
        var li = b.closest('.reply');
        moveForm($('[data-host="' + b.getAttribute('data-target') + '"]', li), li.getAttribute('data-name'), b.getAttribute('data-target'));
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = ta.value.replace(/^\s+|\s+$/g, '');
      if (text.length < 2) { err.textContent = t('reply_err'); ta.setAttribute('aria-invalid', 'true'); ta.focus(); return; }
      if (CONTACT.test(text)) { err.textContent = t('err_contact'); ta.setAttribute('aria-invalid', 'true'); ta.focus(); return; }
      var lang = detectLang(text), ob = { id: 'u' + Date.now(), name: nm.value.replace(/^\s+|\s+$/g, '') || null, country: cs.value || '', orig: lang, ago: 0, pending: true, text: {} };
      ob.text[lang] = text;
      var tid = form.getAttribute('data-target');
      if (!tid) m.replies.push(ob);
      else {
        var c = ctx(m.replies, tid, null);
        if (c.parent) { ob.to = c.node.name || t('anonymous'); c.parent.children.push(ob); }
        else { c.node.children = c.node.children || []; c.node.children.push(ob); }
      }
      ta.value = ''; err.textContent = '';
      render();
      live.textContent = t('reply_sent');
      var el = document.getElementById(ob.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function sendPage() {
    var form = $('#sendForm'), msg = $('#msg'), nm = $('#sname'), cs = $('#scountry'), err = $('#serr');
    var counter = $('#counter'), done = $('#sendDone'), MAX = 500;
    var ph = 1 + Math.floor(Math.random() * 3);

    function count() { counter.textContent = msg.value.length + ' / ' + MAX; }
    render = function () {
      fillCountries(cs, true);
      msg.setAttribute('placeholder', t('ph' + ph));
      $('#starterBtns').innerHTML = ['s1', 's2', 's3'].map(function (k) { return '<button type="button" class="chip" data-s="' + k + '">' + t(k) + '</button>'; }).join('');
      $$('#starterBtns .chip').forEach(function (c) {
        c.addEventListener('click', function () {
          var s = t(c.getAttribute('data-s'));
          msg.value = msg.value ? msg.value.replace(/\s+$/, '') + ' ' + s : s;
          msg.focus(); count();
        });
      });
      count();
    };
    render();
    msg.addEventListener('input', function () { count(); err.textContent = ''; msg.removeAttribute('aria-invalid'); cs.removeAttribute('aria-invalid'); });
    cs.addEventListener('change', function () { err.textContent = ''; cs.removeAttribute('aria-invalid'); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = msg.value.replace(/^\s+|\s+$/g, '');
      var problem = null, field = null;
      if (text.length < 8) { problem = 'err_short'; field = msg; }
      else if (CONTACT.test(text)) { problem = 'err_contact'; field = msg; }
      if (problem) { err.textContent = t(problem); field.setAttribute('aria-invalid', 'true'); field.focus(); return; }
      var who = nm.value.replace(/^\s+|\s+$/g, '') || t('anonymous');
      var p = $('#preview');
      p.textContent = text; p.setAttribute('dir', 'auto'); p.setAttribute('lang', detectLang(text));
      $('#previewMeta').textContent = cs.value ? who + ' · ' + countryName(cs.value) : who;
      form.hidden = true; done.hidden = false; done.focus();
      window.scrollTo(0, 0);
    });
    $('#again').addEventListener('click', function () {
      msg.value = ''; nm.value = ''; cs.value = ''; ph = 1 + Math.floor(Math.random() * 3);
      done.hidden = true; form.hidden = false; render(); msg.focus();
    });
  }

  function hopePage() {
    var order = D.messages.map(function (m) { return m.id; });
    for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = order[i]; order[i] = order[j]; order[j] = x; }
    var pos = -1, stage = $('#stage');

    render = function () {
      if (pos < 0) {
        stage.innerHTML = '<div class="hope-intro"><p class="kicker">' + t('hope_kicker') + '</p><h1 class="display sm">' + t('hope_title') + '</h1>' +
          '<p class="lead">' + t('hope_intro') + '</p><button type="button" class="btn btn-primary" id="hopeGo">' + t('hope_go') + '</button></div>';
        $('#hopeGo').addEventListener('click', next);
      } else if (pos >= order.length) {
        stage.innerHTML = '<div class="end hope-intro"><div class="orn" aria-hidden="true"><i></i><i></i><i></i></div><h2 class="h2">' + t('hope_done_t') + '</h2>' +
          '<p class="lead" style="margin-inline:auto">' + t('hope_done_d') + '</p><div class="cta-row" style="justify-content:center">' +
          '<a class="btn btn-primary" href="send.html">' + t('btn_write') + '</a><a class="btn btn-ghost" href="messages.html">' + t('btn_read') + '</a></div></div>';
      } else {
        var m = findMessage(order[pos]);
        stage.innerHTML = noteHTML(m, { hero: true }) + '<div class="hope-actions"><button type="button" class="btn btn-primary" id="hopeNext">' + t('hope_next') + '</button></div>';
        $('#hopeNext').addEventListener('click', next);
        $('#hopeNext').focus({ preventScroll: true });
      }
    };
    function next() { pos += 1; view = {}; render(); }
    render();
  }

  /* ---------- theme (light / dark; follows the device until the reader chooses) ---------- */
  function effectiveTheme() {
    var a = document.documentElement.getAttribute('data-theme');
    if (a === 'light' || a === 'dark') return a;
    return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function setTheme(v) { document.documentElement.setAttribute('data-theme', v); save('maakum.theme', v); }
  (function () {
    var s = load('maakum.theme');
    if (s === 'light' || s === 'dark') document.documentElement.setAttribute('data-theme', s);
    var nav = $('.nav'), lt = $('#langToggle');
    if (nav && lt) {
      var b = document.createElement('button');
      b.type = 'button'; b.id = 'themeToggle'; b.className = 'theme-toggle'; b.setAttribute('data-i18n-aria', 'theme_aria');
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17" /><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/></svg>';
      nav.insertBefore(b, lt);
    }
  })();

  /* ---------- boot ---------- */
  applyI18n();
  var start = { home: homePage, messages: messagesPage, message: messagePage, send: sendPage, hope: hopePage }[page];
  if (start) start();
  applyI18n(); // re-run so page-rendered nodes with data-i18n are translated
})();
