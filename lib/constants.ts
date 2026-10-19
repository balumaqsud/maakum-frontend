export const STORAGE_KEYS = {
  lang: "maakum.lang",
  read: "maakum.read",
  react: "maakum.react",
  theme: "maakum.theme",
} as const;

/** Runs in the document head so Arabic does not paint left-to-right. */
export const langBootScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(STORAGE_KEYS.lang)});var nav=(navigator.language||"").toLowerCase().indexOf("ar")===0;if(s==="ar"||(s!=="en"&&nav)){var el=document.documentElement;el.lang="ar";el.dir="rtl";}}catch(e){}})();`;
