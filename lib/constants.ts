import { PAGE_TITLES } from "@/lib/i18n";

export const STORAGE_KEYS = {
  lang: "maakum.lang",
  read: "maakum.read",
  react: "maakum.react",
  theme: "maakum.theme",
} as const;

/** Runs in the document head so Arabic does not paint left-to-right. */
export const langBootScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(STORAGE_KEYS.lang)});var nav=(navigator.language||"").toLowerCase().indexOf("ar")===0;var lang=(s==="ar"||(s!=="en"&&nav))?"ar":"en";var el=document.documentElement;el.lang=lang;el.dir=lang==="ar"?"rtl":"ltr";var routes=${JSON.stringify(PAGE_TITLES)};var path=location.pathname;var table=routes[path];if(table){document.title=table[lang];return;}if(path.indexOf("/messages/")===0&&document.title.indexOf(" — ")!==-1){var stem=document.title.split(" — ")[0];if(stem==="Messages"||stem==="الرسائل"||stem==="Ma'akum"||stem==="معكم")return;var name=stem;if(stem==="Anonymous"||stem==="مجهول")name=lang==="ar"?"مجهول":"Anonymous";else if(stem==="Message"||stem==="رسالة")name=lang==="ar"?"رسالة":"Message";document.title=name+" — "+(lang==="ar"?"معكم":"Ma'akum");}}catch(e){}})();`;
