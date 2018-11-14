const fs = require("fs");

const data = fs.readFileSync("./browser-stats.json");

let nonSrcsetBrowserCount = [];
let serviceTotalBrowsers = [];

const countNonSrcsetBrowsers = data => {
  data.forEach(item => {
    addToDynamicallyKeyedArray(
      item["bbc_site"],
      item["Browsers"],
      serviceTotalBrowsers
    );

    if (passesRequirements(item["Web browser"])) {
      addToDynamicallyKeyedArray(
        item["bbc_site"],
        item["Browsers"],
        nonSrcsetBrowserCount
      );
    }
  });

  console.log("| Service                     | Percentage |");
  console.log("| --------------------------- | ---------- |");
  Object.keys(nonSrcsetBrowserCount).forEach(function(service) {
    const percentageOfNonSrcsetBrowsers =
      (nonSrcsetBrowserCount[service] / serviceTotalBrowsers[service]) * 100;

    // if the percentage value is above our support threshold
    if (percentageOfNonSrcsetBrowsers.toFixed(3) > "0.05") {
      console.log(
        `| ${service}              | ${percentageOfNonSrcsetBrowsers.toFixed(
          3
        )}     |`
      );
    }
  });
};

/*
  This method allows an empty array to be populated with values that have matching keys.
  It does this by checking if the key exists and either creating it or cumulatively adding to the key's value
*/
const addToDynamicallyKeyedArray = (key, value, array) => {
  // if the array doesn't have the service name as a key
  if (!array.hasOwnProperty(key)) {
    // add a new array key with the value
    array[key] = value;
  } else {
    // if the service is already a key in the array just add the value
    array[key] += value;
  }
};

const passesRequirements = browser =>
  isIE11orLower(browser) ||
  isAndroidLessThan4(browser) ||
  isOperaMini(browser) ||
  isOperaMobile(browser) ||
  isBlackberryBrowser(browser) ||
  isSafariLessThan7(browser) ||
  isOperaLessThan20(browser);

const isIE11orLower = browser => {
  var regex = /IE ([1-9]|10|11)\.x/g;
  if (browser.match(regex)) {
    return true;
  }
};

const isAndroidLessThan4 = browser => {
  var regex = /Android Browser [1-4]/g;
  if (browser.match(regex)) {
    return true;
  }
};

const isOperaMini = browser => {
  var regex = /Opera Mini /g;
  if (browser.match(regex)) {
    return true;
  }
};

const isOperaMobile = browser => {
  var regex = /Opera Mobile ([1-9]|10|11|12)/g;
  if (browser.match(regex)) {
    return true;
  }
};

const isOperaLessThan20 = browser => {
  var regex = /Opera (1[0|9]|20)/g;
  if (browser.match(regex)) {
    return true;
  }
};

const isBlackberryBrowser = browser => {
  var regex = /BlackBerry Browser/g;
  if (browser.match(regex)) {
    return true;
  }
};

const isSafariLessThan7 = browser => {
  var regex = /Safari [3-7]/g;
  if (browser.match(regex)) {
    return true;
  }
};

countNonSrcsetBrowsers(JSON.parse(data));
