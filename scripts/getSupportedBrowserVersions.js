/* 
  This node process takes the JSON and creates an object that is keyed per service. 
  Then for each service each differing browser and version as a string is keyed. 
  
  From this object each service is validated to be a correct bbc_site value.
  Then each browser & version entry is checked to ensure it's above the 0.05% support threshold. 
  
    // TODO: The above section should be generic for each node process and should be re-usable/extendable code. 

  Following this it splits the browser name and version into seperate fields.
  It then creates a new object with the browser keyed and the versions as entries. 
  Finally it logs out the lowest supported version for each browser. 

  TL;DR - it outputs the browsers we should aim support as they are within our threshold of support.
*/

const fs = require("fs");
const data = fs.readFileSync("./browser-stats.json");
const { isValidBBCSiteValue } = require("../utility");

let dataKeyedPerService = {};
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
  This method allows an empty object to be populated with values that have matching keys.
  It does this by checking if the key exists and either creating it or cumulatively adding to the key's value
*/
const addToDynamicallyKeyedObject = (firstKey, secondKey, value, object) => {
  // if the array doesn't have the service name as a key
  if (!object.hasOwnProperty(firstKey)) {
    object[firstKey] = {};
  }

  object[firstKey][secondKey] = value;
};

const generatorBrowserPercentagesObject = data => {
  data.forEach(item => {
    if (isValidBBCSiteValue(item["bbc_site"])) {
      countAllViews(item["bbc_site"], item["Browsers"], serviceTotalBrowsers);

      addToDynamicallyKeyedObject(
        item["bbc_site"],
        item["Web browser"],
        item["Browsers"],
        dataKeyedPerService
      );
    }
  });
};

const splitVersionFromBrowser = browserNameWithVersion => {
  // get the version numbers from the current browserDataWithVersion entry
  const versionRegex = / ([0-9]+)(\.x)/;

  // return the full value for things like `Nokia 6280` and `MAUI WAP Browser`
  let version = browserNameWithVersion;
  let browserName = browserNameWithVersion;

  const matches = browserNameWithVersion.match(versionRegex);

  if (matches) {
    browserName = browserNameWithVersion.replace(matches[0], "");
    version = parseInt(matches[1]);
  }

  return { version, browserName };
};

const checkBrowserStatsMeetSupportCriteria = (
  browserDataWithVersion,
  service
) => {
  const percentageBrowsers = getPercentagePerBrowser(
    browserDataWithVersion,
    service
  );

  // if the percentage value is above our support threshold
  if (percentageBrowsers > 0.05) {
    return browserDataWithVersion;
  }
};

const updateBrowserKeysAndAddLowestVersionValues = (
  service,
  browserNameWithVersion,
  browserName,
  version
) => {
  // if the browser key doesn't yet exist create it
  if (!dataKeyedPerService[service].hasOwnProperty(browserName)) {
    dataKeyedPerService[service][browserName] = version;
  }
  // set the value to the lowest version
  if (version < dataKeyedPerService[service][browserName]) {
    dataKeyedPerService[service][browserName] = version;
  }

  delete dataKeyedPerService[service][browserNameWithVersion];

  if (browserNameWithVersion === "Unknown") {
    delete dataKeyedPerService[service][browserNameWithVersion];
  }
};

const handleDataPerService = service => {
  const browserKeys = Object.keys(dataKeyedPerService[service]);

  const browsers = browserKeys.map(browserNameWithVersion => {
    const browserDataWithVersion =
      dataKeyedPerService[service][browserNameWithVersion];
    if (checkBrowserStatsMeetSupportCriteria(browserDataWithVersion, service)) {
      const { browserName, version } = splitVersionFromBrowser(
        browserNameWithVersion
      );

      updateBrowserKeysAndAddLowestVersionValues(
        service,
        browserNameWithVersion,
        browserName,
        version
      );
    }
  });

  browsers.forEach(browser => {
    const lowestVersion = dataKeyedPerService[service][browser];
    console.log(
      `| ${service}                     | ${browser}           | ${lowestVersion}    |`
    );
  });
};

// const consoleLogSupportedBrowserVersions = () => {
//   const services = Object.keys(dataKeyedPerService);

//   console.log(
//     "| Service                     | Browser           | Lowest version    |"
//   );
//   console.log(
//     "| --------------------------- | ----------------- | ---------- |"
//   );

//   services.forEach(service => {
//     const browsers = Object.keys(dataKeyedPerService[service]);

//     browsers.forEach(browser => {
//       const lowestVersion = dataKeyedPerService[service][browser];
//       console.log(
//         `| ${service}                     | ${browser}           | ${lowestVersion}    |`
//       );
//     });
//   });
// };

const getManipulatedData = () => {
  const services = Object.keys(dataKeyedPerService);

  services.forEach(service => {
    handleDataPerService(service);
  });
};

const getLowestBrowserVersionPercentages = data => {
  generatorBrowserPercentagesObject(data);

  console.log(
    "| Service                     | Browser           | Lowest version    |"
  );
  console.log(
    "| --------------------------- | ----------------- | ---------- |"
  );

  getManipulatedData();
};

getLowestBrowserVersionPercentages(JSON.parse(data));
