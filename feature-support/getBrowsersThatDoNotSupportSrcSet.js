const { doesNotSupportSrcSet } = require("./utility");
const fs = require("fs");

const data = fs.readFileSync("./browser-stats.json");

let nonSrcsetBrowserCount = {};
let serviceTotalBrowsers = {};

const getPercentagePerBrowser = (views, service) =>
  ((views / serviceTotalBrowsers[service]) * 100).toFixed(3);

const countNonSrcsetBrowsers = data => {
  data.forEach(item => {
    countAllViews(item["bbc_site"], item["Browsers"], serviceTotalBrowsers);

    if (doesNotSupportSrcSet(item["Web browser"])) {
      addToDynamicallyKeyedArray(
        item["bbc_site"],
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
      service != "Total" &&
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
        console.log(serviceTotalBrowsers["news"]);
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

const stripBrowserVersion = name => {
  let strippedName = name;

  strippedName = strippedName.replace(".x", "");
  strippedName = strippedName.replace(/[0-9]/, "");
  strippedName = strippedName.replace(/[0-9]/, "");
  strippedName = strippedName.replace(/[0-9]/, "");
  return strippedName;
};

/*
  This method allows an empty array to be populated with values that have matching keys.
  It does this by checking if the key exists and either creating it or cumulatively adding to the key's value
*/
const addToDynamicallyKeyedArray = (
  service,
  browserName,
  browserViews,
  fullArray
) => {
  const browserNameWithoutVersion = stripBrowserVersion(browserName);

  // if the array doesn't have the service name as a key
  if (!fullArray.hasOwnProperty(service)) {
    fullArray[service] = {};
  }

  if (!fullArray[service].hasOwnProperty(browserNameWithoutVersion)) {
    fullArray[service][browserNameWithoutVersion] = browserViews;
  }

  fullArray[service][browserNameWithoutVersion] += browserViews;
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

countNonSrcsetBrowsers(JSON.parse(data));
