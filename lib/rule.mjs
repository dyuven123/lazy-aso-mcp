// electron/gen/door-rule.mjs
function verdict(r, _top1, headTaken, inspected) {
  if (r.n === null || r.n === void 0 || inspected < Math.min(r.n, 10)) return "\u043D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E";
  if (headTaken === 0) return "\u0414\u0412\u0415\u0420\u042C";
  return "\u0441\u0442\u0435\u043D\u0430";
}
var norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\p{L}\p{N} ]/gu, " ").replace(/\s+/g, " ").trim();
var singular = (w) => {
  if (!/^[a-z0-9]+$/.test(w)) return w;
  if (/(ss|x|z|ch|sh)es$/.test(w)) return w.slice(0, -2);
  if (/ies$/.test(w) && w.length > 4) return w.slice(0, -3) + "y";
  if (/s$/.test(w) && !/ss$/.test(w) && w.length > 3) return w.slice(0, -1);
  return w;
};
var loose = (s) => norm(s).split(" ").map(singular).join(" ");
var squash = (s) => norm(s).replace(/ /g, "");
var FILLER_WORDS = {
  free: [
    "free",
    "gratis",
    "gr\xE1tis",
    "kostenlos",
    "kostenlose",
    "kostenloser",
    "kostenloses",
    "umsonst",
    "gratuit",
    "gratuite",
    "gratuits",
    "gratuites",
    "gratuito",
    "gratuita",
    "gratuitos",
    "gratuitas",
    "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E",
    "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439",
    "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F",
    "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0435",
    "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0435",
    "\u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u043E",
    "\u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u0438\u0439",
    "\u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u0430",
    "\u0431\u0435\u0437\u043F\u043B\u0430\u0442\u043D\u043E",
    "\u0431\u0435\u0437\u043F\u043B\u0430\u0442\u0435\u043D",
    "besplatno",
    "besplatna",
    "besplatni",
    "brezpla\u010Dno",
    "\xFCcretsiz",
    "bedava",
    "darmowy",
    "darmowa",
    "darmowe",
    "za darmo",
    "zdarma",
    "zadarmo",
    "ingyenes",
    "ingyen",
    "ilmainen",
    "ilmaiseksi",
    "tasuta",
    "nemokamai",
    "nemokama",
    "bezmaksas",
    "\u03B4\u03C9\u03C1\u03B5\u03AC\u03BD",
    "\u05D7\u05D9\u05E0\u05DD",
    "\u05D1\u05D7\u05D9\u05E0\u05DD",
    "\u514D\u8D39",
    "\u514D\u8CBB",
    "\u7121\u6599",
    "\uBB34\uB8CC",
    "\u0645\u062C\u0627\u0646\u064A",
    "\u0645\u062C\u0627\u0646\u0627",
    "\u0645\u062C\u0627\u0646\u064A\u0629",
    "\u0645\u062C\u0627\u0646\u0649",
    "\u0631\u0627\u06CC\u06AF\u0627\u0646",
    "\u0645\u0641\u062A",
    "mi\u1EC5n ph\xED",
    "\u0E1F\u0E23\u0E35",
    "percuma",
    "pulsuz",
    "bepul",
    "\u0442\u0435\u0433\u0456\u043D",
    "\u0430\u049B\u044B\u0441\u044B\u0437",
    "\xF3keypis",
    "libreng"
  ],
  app: [
    "app",
    "apps",
    "application",
    "applications",
    "appli",
    "aplicacion",
    "aplicaci\xF3n",
    "aplicaciones",
    "aplicativo",
    "aplicativos",
    "aplica\xE7\xE3o",
    "aplicacao",
    "applicazione",
    "applicazioni",
    "applikation",
    "aplikacja",
    "aplikace",
    "aplik\xE1cia",
    "aplikasi",
    "aplikacija",
    "aplica\u021Bie",
    "aplicatie",
    "alkalmaz\xE1s",
    "sovellus",
    "rakendus",
    "uygulama",
    "uygulamas\u0131",
    "\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
    "\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F",
    "\u0437\u0430\u0441\u0442\u043E\u0441\u0443\u043D\u043E\u043A",
    "\u0434\u043E\u0434\u0430\u0442\u043E\u043A",
    "\u0430\u043F\u043F",
    "\uC571",
    "\uC5B4\uD50C",
    "\u30A2\u30D7\u30EA",
    "\u5E94\u7528",
    "\u61C9\u7528",
    "\u8F6F\u4EF6",
    "\u8EDF\u9AD4",
    "\u062A\u0637\u0628\u064A\u0642",
    "\u0628\u0631\u0646\u0627\u0645\u062C",
    "\u1EE9ng d\u1EE5ng",
    "\u0E41\u0E2D\u0E1B",
    "\u0E41\u0E2D\u0E1E"
  ],
  /// Платформа — как app, только В КОНЦЕ (04.11.2026): «qr code scanner for iphone» = «qr code scanner».
  /// НЕ ipad (приложения для iPad бывают другим поиском) и НЕ годы. «iphone» один или в начале
  /// («iphone wallpaper») не трогается.
  platform: [
    "for iphone",
    "iphone",
    "for ios",
    "ios",
    "\u0434\u043B\u044F \u0430\u0439\u0444\u043E\u043D\u0430",
    "\u0434\u043B\u044F iphone",
    "\u043D\u0430 \u0430\u0439\u0444\u043E\u043D",
    "\u0434\u043B\u044F ios",
    "para iphone",
    "para ios",
    "f\xFCr iphone",
    "f\xFCr ios",
    "pour iphone",
    "pour ios",
    "per iphone",
    "voor iphone",
    "na iphone",
    "iphone i\xE7in",
    "iphone icin",
    "untuk iphone"
  ]
};
var FREE_COMPOUNDS = [
  "duty",
  "tax",
  "gluten",
  "sugar",
  "smoke",
  "stress",
  "hands",
  "ad",
  "ads",
  "alcohol",
  "caffeine",
  "dairy",
  "lactose",
  "fat",
  "carb",
  "debt",
  "hassle",
  "royalty",
  "copyright",
  "scent",
  "cruelty",
  "nut",
  "meat",
  "porn",
  "drug",
  "nicotine",
  "crash",
  "risk",
  "worry",
  "pain",
  "commission",
  "fee",
  "wheat",
  "allergy"
];
var COMPOUND_RE = new RegExp(`(^| )(${FREE_COMPOUNDS.join("|")}) free(?= |$)`, "g");
var esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var NOSPACE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Thai}]/u;
var fillerRes = (words, where) => [...new Set(words.map(norm).filter(Boolean))].sort((a, b) => b.length - a.length).map((w) => NOSPACE.test(w.normalize("NFC")) ? new RegExp(where === "any" ? esc(w) : `${esc(w)}$`, "gu") : new RegExp(where === "any" ? `(^| )${esc(w)}(?= |$)` : `(^| )${esc(w)}$`, "gu"));
var FREE_RE = fillerRes(FILLER_WORDS.free, "any");
var APP_RE = fillerRes([...FILLER_WORDS.app, ...FILLER_WORDS.platform], "end");
var bareMemo = /* @__PURE__ */ new Map();
var bare = (s) => {
  const hit = bareMemo.get(s);
  if (hit !== void 0) return hit;
  const n = norm(s);
  let t = n.replace(COMPOUND_RE, "$1$2");
  for (let prev = ""; prev !== t; ) {
    prev = t;
    for (const re of FREE_RE) t = t.replace(re, " ").replace(/\s+/g, " ").trim();
    for (const re of APP_RE) t = t.replace(re, " ").replace(/\s+/g, " ").trim();
  }
  const out = t.replace(/\u0001/g, " free") || n;
  if (bareMemo.size > 2e5) bareMemo.clear();
  bareMemo.set(s, out);
  return out;
};
var spaced = (t) => !NOSPACE.test(t.normalize("NFC"));
var wordHead = (n, t) => n.startsWith(t) && (!spaced(t) || n.length === t.length || n[t.length] === " ");
var looseMemo = /* @__PURE__ */ new Map();
var looseBare = (s) => {
  const b = bare(s);
  let v = looseMemo.get(b);
  if (v === void 0) {
    if (looseMemo.size > 2e5) looseMemo.clear();
    looseMemo.set(b, v = b.split(" ").map(singular).join(" "));
  }
  return v;
};
var headNamedPlain = (name, term) => norm(name).startsWith(norm(term)) || loose(name).startsWith(loose(term)) || squash(term).length >= 6 && squash(name).startsWith(squash(term));
var headBare = (name, term) => wordHead(bare(name), bare(term)) || wordHead(looseBare(name), looseBare(term));
var headNamed = (name, term) => headNamedPlain(name, term) || headBare(name, term) || squash(bare(term)).length >= 6 && squash(bare(name)).startsWith(squash(bare(term)));

// name-check-worker/src/check.js
var WINDOW = 25;
var FEW = 5;
var SHOW = 3;
var BRAND_MIN_RATINGS = 1e5;
var row = (a, name = a.name) => [a.place, name, a.ratings];
function judge(term, apps) {
  const top = apps.slice(0, WINDOW);
  const n = top.length;
  const heads = [];
  for (const a of top) {
    const hit = a.names.find((nm) => headNamed(nm, term));
    if (hit) heads.push(row(a, hit));
  }
  if (n < FEW) return { v: "few", n, head: heads.length, top: top.slice(0, SHOW).map((a) => row(a)) };
  const v = verdict({ n }, null, heads.length, Math.min(n, 10)) === "\u0414\u0412\u0415\u0420\u042C" ? "free" : "taken";
  return { v, n, head: heads.length, top: v === "taken" ? heads.slice(0, SHOW) : top.slice(0, SHOW).map((a) => row(a)) };
}
function fromItunes(term, base, langLists = []) {
  const local = /* @__PURE__ */ new Map();
  for (const list of langLists) for (const r of list) {
    if (r.trackId && r.trackName) local.set(r.trackId, [...local.get(r.trackId) ?? [], r.trackName]);
  }
  const apps = base.filter((r) => r.trackName).slice(0, WINDOW).map((r, i) => ({
    place: i + 1,
    name: r.trackName,
    ratings: r.userRatingCount ?? 0,
    names: [r.trackName, ...local.get(r.trackId) ?? []]
  }));
  return { ...judge(term, apps), brand: looksLikeBrand(term, apps) };
}
var core = (name) => name.split(/\s*[:|–—]\s*|\s-\s/)[0];
function looksLikeBrand(term, apps) {
  const first = apps[0];
  return !!first && first.ratings >= BRAND_MIN_RATINGS && (bare(core(first.name)) === bare(term) || norm(core(first.name)) === norm(term));
}

// name-check-worker/src/storefronts.js
var STOREFRONTS = [["AL", "Albania"], ["DZ", "Algeria"], ["AR", "Argentina"], ["AM", "Armenia"], ["AU", "Australia"], ["AT", "Austria"], ["AZ", "Azerbaijan"], ["BH", "Bahrain"], ["BE", "Belgium"], ["BO", "Bolivia"], ["BR", "Brazil"], ["BG", "Bulgaria"], ["KH", "Cambodia"], ["CA", "Canada"], ["CL", "Chile"], ["CO", "Colombia"], ["CR", "Costa Rica"], ["HR", "Croatia"], ["CY", "Cyprus"], ["CZ", "Czechia"], ["DK", "Denmark"], ["DO", "Dominican Republic"], ["EC", "Ecuador"], ["EG", "Egypt"], ["SV", "El Salvador"], ["EE", "Estonia"], ["FI", "Finland"], ["FR", "France"], ["DE", "Germany"], ["GH", "Ghana"], ["GR", "Greece"], ["GT", "Guatemala"], ["HN", "Honduras"], ["HK", "Hong Kong"], ["HU", "Hungary"], ["IS", "Iceland"], ["IN", "India"], ["ID", "Indonesia"], ["IE", "Ireland"], ["IL", "Israel"], ["IT", "Italy"], ["JP", "Japan"], ["JO", "Jordan"], ["KZ", "Kazakhstan"], ["KE", "Kenya"], ["KW", "Kuwait"], ["KG", "Kyrgyzstan"], ["LV", "Latvia"], ["LB", "Lebanon"], ["LU", "Luxembourg"], ["MO", "Macau"], ["MY", "Malaysia"], ["MX", "Mexico"], ["MN", "Mongolia"], ["MA", "Morocco"], ["NL", "Netherlands"], ["NZ", "New Zealand"], ["NO", "Norway"], ["OM", "Oman"], ["PK", "Pakistan"], ["PA", "Panama"], ["PY", "Paraguay"], ["PE", "Peru"], ["PH", "Philippines"], ["PL", "Poland"], ["PT", "Portugal"], ["QA", "Qatar"], ["KR", "Republic of Korea"], ["RO", "Romania"], ["SA", "Saudi Arabia"], ["SG", "Singapore"], ["SK", "Slovakia"], ["SI", "Slovenia"], ["ZA", "South Africa"], ["ES", "Spain"], ["LK", "Sri Lanka"], ["SE", "Sweden"], ["CH", "Switzerland"], ["TW", "Taiwan"], ["TH", "Thailand"], ["TR", "T\xFCrkiye"], ["UA", "Ukraine"], ["AE", "United Arab Emirates"], ["GB", "United Kingdom"], ["US", "United States"], ["UZ", "Uzbekistan"], ["VN", "Vietnam"]];
var NAME_LANGS = { "CA": "fr_ca", "IN": "hi_in", "ID": "id_id", "SA": "ar_sa", "TR": "tr_tr", "VN": "vi_vn", "TH": "th_th", "MY": "ms_my,zh_cn", "PL": "pl_pl", "UA": "uk_ua,ru_ru", "DK": "da_dk", "PK": "ur_pk", "CZ": "cs_cz", "RO": "ro_ro", "HU": "hu_hu", "NO": "nb_no", "GR": "el_gr", "FI": "fi_fi", "HR": "hr_hr", "SK": "sk_sk", "SI": "sl_si", "IL": "he", "AE": "ar_sa", "EG": "ar_sa", "JO": "ar_sa", "KW": "ar_sa", "OM": "ar_sa", "QA": "ar_sa", "BH": "ar_sa", "LB": "ar_sa,fr_fr", "DZ": "ar_sa,fr_fr", "MA": "ar_sa,fr_fr", "KZ": "ru_ru,kk", "KG": "ru_ru", "UZ": "ru_ru", "AM": "ru_ru", "AZ": "ru_ru", "CO": "es_mx", "AR": "es_mx", "CL": "es_mx", "PE": "es_mx", "EC": "es_mx", "DO": "es_mx", "CR": "es_mx", "GT": "es_mx", "HN": "es_mx", "PA": "es_mx", "PY": "es_mx", "BO": "es_mx", "SV": "es_mx", "CH": "de_ch,fr_fr,it_it", "BE": "nl_nl,fr_fr", "AT": "de_de", "LU": "fr_fr,de_de", "CY": "el_gr", "MO": "zh_hk", "SG": "zh_cn" };
var CODES = new Set(STOREFRONTS.map(([c]) => c));
var DEFAULT_LIVE = ["US", "GB", "CA", "AU", "DE", "FR", "JP", "KR", "TW", "BR", "MX", "IT", "ES", "NL", "SE"];
export {
  DEFAULT_LIVE,
  NAME_LANGS,
  STOREFRONTS,
  fromItunes
};
