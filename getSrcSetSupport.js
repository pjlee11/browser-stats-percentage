const fs = require("fs");

const data = fs.readFileSync("./browser-stats.json");

let nonSrcsetBrowserCount = {};
let serviceTotalBrowsers = {};

const getPercentagePerBrowser = (views, service) =>
  ((views / serviceTotalBrowsers[service]) * 100).toFixed(3);

const countNonSrcsetBrowsers = data => {
  data.forEach(item => {
    countAllViews(item["bbc_site"], item["Browsers"], serviceTotalBrowsers);

    if (passesRequirements(item["Web browser"])) {
      addToDynamicallyKeyedArray(
        item["bbc_site"],
        item["Operating system"],
        item["Web browser"],
        item["Browsers"],
        nonSrcsetBrowserCount
      );
    }
  });

  console.log(
    "| Service                     | Browser           | Percentage |"
  );
  console.log(
    "| --------------------------- | ----------------- | ---------- |"
  );
  Object.keys(nonSrcsetBrowserCount).forEach(function(service) {
    /* 
      ignore the `bbc_site` values
      NB: korean/downloads bug, should report as `news-ws-korean` therefore ignore the results
    */
    if (
      service != "korean" &&
      service != "invalid-data" &&
      service != "aboutthebbc" &&
      service != "new" &&
      service != "news-w" &&
      service != "news-ws-ar" &&
      service != "news-ws-ara" &&
      service != "schoolreport"
    ) {
      // For each browser entry per service
      Object.keys(nonSrcsetBrowserCount[service]).forEach(function(browser) {
        const percentageOfNonSrcsetBrowsers = getPercentagePerBrowser(
          nonSrcsetBrowserCount[service][browser],
          service
        );

        if (percentageOfNonSrcsetBrowsers > "0.05") {
          console.log(
            `| ${service}                  | ${browser}        | ${percentageOfNonSrcsetBrowsers} |`
          );
        }
      });
    }
  });
};

/*
  This method allows an empty array to be populated with values that have matching keys.
  It does this by checking if the key exists and either creating it or cumulatively adding to the key's value
*/
const addToDynamicallyKeyedArray = (
  service,
  operatingSystem,
  browserName,
  browserViews,
  fullArray
) => {
  // if the array doesn't have the service name as a key
  if (!fullArray.hasOwnProperty(service)) {
    fullArray[service] = {};
  }
  const details = `${operatingSystem} - ${browserName}`;

  fullArray[service][details] = browserViews;
};

const countAllViews = (service, browserViews, countArray) => {
  // if the array doesn't have the service name as a key
  if (!countArray.hasOwnProperty(service)) {
    // add a new array key with the value
    countArray[service] = browserViews;
  } else {
    // if the service is already a key in the array just add the value
    countArray[service] += browserViews;
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
