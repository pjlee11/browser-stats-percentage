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
