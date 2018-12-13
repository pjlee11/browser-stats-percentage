/* 
  This node process takes the JSON and creates an object that is keyed per service. 
  Then for each service it contains each differing browser and version as a keyed string. 
  
  From this object each service is validated to be a correct 'bbc_site' value.
  Then each browser & version entry is checked to ensure it's above the 0.05% support threshold. 

  Following this it creates an array of versions for each browser.
  Finally it logs out the lowest supported version for each browser per service. 
*/

const fs = require("fs");
const dataAsJSON = fs.readFileSync("./browser-stats.json", "utf8");
const { removeInvalidValues } = require("./helpers/removeInvalidValues");
const {
  getServiceTotalBrowsers
} = require("./helpers/getServiceTotalBrowsers");
const { getDataWithinThreshold } = require("./helpers/getDataWithinThreshold");
const {
  seperateBrowserNameAndVersion
} = require("./helpers/seperateBrowserNameAndVersion");

const data = JSON.parse(dataAsJSON);

// pass over data removing all invalid enteries
const validData = removeInvalidValues(data);

// get the total per each service
const totalBrowsersPerService = getServiceTotalBrowsers(validData);

// remove enteries not in threshold
const dataWithSupportThreshold = getDataWithinThreshold(
  validData,
  totalBrowsersPerService
);

const getDataWithBrowsersAndVersionArray = seperateBrowserNameAndVersion(
  dataWithSupportThreshold
);

const getBrowserWithLowestSupportVersions = () => {
  const data = getDataWithBrowsersAndVersionArray;

  console.log(
    "| Service                     | Browser           | Lowest version    |"
  );
  console.log(
    "| --------------------------- | ----------------- | ---------- |"
  );

  const services = Object.keys(data);

  services.forEach(service => {
    const browsers = Object.keys(data[service]);

    browsers.forEach(browser => {
      const browserVersions = data[service][browser];
      const lowestVersion = Math.min.apply(null, browserVersions);

      console.log(
        `| ${service}        | ${browser}           | ${lowestVersion}    |`
      );
    });
  });
};

getBrowserWithLowestSupportVersions();
