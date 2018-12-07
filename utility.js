const isIE11orLower = browser => {
  var regex = /IE ([1-9]|10|11)\.x/g;
  return regexMatch(regex, browser);
};

const isFirefox1to37 = browser => {
  var regex = /FireFox ([1-9]|1[0-9]|2[0-9]|3[0-7])\.x/g;
  return regexMatch(regex, browser);
};

const isChrome1to33 = browser => {
  var regex = /FireFox ([1-9]|1[0-9]|2[0-9]|3[0-3])\.x/g;
  return regexMatch(regex, browser);
};

const isAndroidLessThan4 = browser => {
  var regex = /Android Browser [1-4]/g;
  return regexMatch(regex, browser);
};

const isOperaMini = browser => {
  var regex = /Opera Mini /g;
  return regexMatch(regex, browser);
};

const isOperaMobile = browser => {
  var regex = /Opera Mobile ([1-9]|10|11|12)/g;
  return regexMatch(regex, browser);
};

const isOperaLessThan20 = browser => {
  var regex = /Opera (1[0|9]|20)/g;
  return regexMatch(regex, browser);
};

const isBlackberryBrowser = browser => {
  var regex = /BlackBerry Browser/g;
  return regexMatch(regex, browser);
};

const isSafariLessThan7 = browser => {
  var regex = /Safari [3-7]/g;
  return regexMatch(regex, browser);
};

const isEdge12to15 = browser => {
  var regex = /Edge 1([2|3|4|5])/g;
  return regexMatch(regex, browser);
};

const regexMatch = (regex, browser) => {
  if (browser.match(regex)) {
    return true;
  }
  return false;
};

const validServices = [
  "news",
  "news-ws-afaanoromoo",
  "news-ws-afrique",
  "news-ws-amharic",
  "news-ws-arabic",
  "news-ws-azeri",
  "news-ws-bengali",
  "news-ws-burmese",
  "news-ws-cymrufyw",
  "news-ws-gahuza",
  "news-ws-gujarati",
  "news-ws-hausa",
  "news-ws-hindi",
  "news-ws-igbo",
  "news-ws-indonesia",
  "news-ws-japanese",
  "news-ws-korean",
  "news-ws-kyrgyz",
  "news-ws-marathi",
  "news-ws-mundo",
  "news-ws-naidheachdan",
  "news-ws-nepali",
  "news-ws-newyddion",
  "news-ws-pashto",
  "news-ws-persian",
  "news-ws-pidgin",
  "news-ws-portuguese",
  "news-ws-punjabi",
  "news-ws-russian",
  "news-ws-schoolreport",
  "news-ws-serbian",
  "news-ws-sinhala",
  "news-ws-somali",
  "news-ws-swahili",
  "news-ws-tajik",
  "news-ws-tamil",
  "news-ws-telugu",
  "news-ws-thai",
  "news-ws-tigrinya",
  "news-ws-turkce",
  "news-ws-ukchina",
  "news-ws-ukrainian",
  "news-ws-urdu",
  "news-ws-uzbek",
  "news-ws-vietnamese",
  "news-ws-yoruba",
  "news-ws-zhongwen"
];

module.exports.isValidBBCSiteValue = service => {
  if (validServices.includes(service)) {
    return true;
  }

  return false;
};

module.exports.doesNotSupportSrcSet = browser =>
  isIE11orLower(browser) ||
  isEdge12to15(browser) ||
  isFirefox1to37(browser) ||
  isChrome1to33(browser) ||
  isSafariLessThan7(browser) || // covers both desktop and ios
  isOperaLessThan20(browser) ||
  isOperaMini(browser) ||
  isAndroidLessThan4(browser) ||
  isBlackberryBrowser(browser) ||
  isOperaMobile(browser);
