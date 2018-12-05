const fs = require("fs");
const data = fs.readFileSync("./browser-stats.json");

let browserCount = {};
let serviceTotalBrowsers = {};

const getPercentagePerBrowser = (views, service) =>
  ((views / serviceTotalBrowsers[service]) * 100).toFixed(3);

const countAllViews = (service, browserViews, countArray) => {
  // if the array doesn't have the service name as a key
  if (!countArray.hasOwnProperty(service)) {
    // add a new array key with the value
    countArray[service] = parseInt(browserViews);
  } else {
    // if the service is already a key in the array just add the value
    countArray[service] += parseInt(browserViews);
  }
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
  // if the array doesn't have the service name as a key
  if (!fullArray.hasOwnProperty(service)) {
    fullArray[service] = {};
  }

  fullArray[service][browserName] = browserViews;
};

const getBrowserPercentages = data => {
  data.forEach(item => {
    countAllViews(item["bbc_site"], item["Browsers"], serviceTotalBrowsers);

    addToDynamicallyKeyedArray(
      item["bbc_site"],
      item["Web browser"],
      item["Browsers"],
      browserCount
    );
  });

  console.log(
    "| Service                     | Browser & Version    | Percentage |"
  );
  console.log(
    "| --------------------------- | ----------------- | ---------- |"
  );
  Object.keys(browserCount).forEach(function(service) {
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
      Object.keys(browserCount[service]).forEach(function(browser) {
        const percentageBrowsers = getPercentagePerBrowser(
          browserCount[service][browser],
          service
        );

        console.log(
          `| ${service}                  | ${browser}        | ${percentageBrowsers} |`
        );
      });
    }
  });
};

getBrowserPercentages(JSON.parse(data));
