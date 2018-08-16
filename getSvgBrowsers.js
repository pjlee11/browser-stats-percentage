const fs = require('fs');

const data = fs.readFileSync('./browser-stats.json');

let nonSvgBrowserCount = [];
let serviceTotalBrowsers = [];

const countNonSvgBrowsers = data => {
  data.forEach(
    item => {
      addToDynamicallyKeyedArray(
        item['app_name'],
        item['Browsers'],
        serviceTotalBrowsers
      );

      if (
        isIE8orLower(item['Web browser']) ||
        isAndroid2(item['Web browser'])
      ) {
        addToDynamicallyKeyedArray(
          item['app_name'],
          item['Browsers'],
          nonSvgBrowserCount
        );
      }
    }
  );

  Object.keys(nonSvgBrowserCount).forEach(
    function(service) {
      const percentageOfNonSvgBrowsers = (nonSvgBrowserCount[service] / serviceTotalBrowsers[service]) * 100;

      // if the percentage value is above our support threshold
      if (percentageOfNonSvgBrowsers.toFixed(3) > '0.05') {
        console.log(`Service: ${service}`);
        console.log(`  Total Browsers: ${serviceTotalBrowsers[service]}`);
        console.log(`  Non Svg Browsers: ${nonSvgBrowserCount[service]}`);
        console.log(`  Percentage: ${percentageOfNonSvgBrowsers.toFixed(3)}`);
      }
    }
  );
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
    array[key] += value
  }
};

const isIE8orLower = browser => {
  var regex = /IE [0-8]\.x/g;
  if (browser.match(regex)) {
    return true;
  }
};

const isAndroid2 = browser => {
  var regex = /Android Browser 2\.x/g;
  if (browser.match(regex)) {
    return true;
  }
};

countNonSvgBrowsers(JSON.parse(data));
