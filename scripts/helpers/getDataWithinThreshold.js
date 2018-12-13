let dataWithinThreshold = {};

const isWithinThreshold = (views, totalBrowsersForService) => {
  const percentage = ((views / totalBrowsersForService) * 100).toFixed(3);

  if (percentage > 0.05) {
    return true;
  }

  return false;
};

const addToDataObject = (service, browserName, browserViews) => {
  // if the array doesn't have the service name as a key
  if (!dataWithinThreshold.hasOwnProperty(service)) {
    dataWithinThreshold[service] = {};
  }

  dataWithinThreshold[service][browserName] = browserViews;
};

module.exports.getDataWithinThreshold = (data, totalBrowsersPerService) => {
  data.forEach(entry => {
    const browserName = entry["Web browser"];
    const browserViews = entry["Browsers"];
    const service = entry["bbc_site"];
    const serviceTotalViews = totalBrowsersPerService[service];

    if (isWithinThreshold(browserViews, serviceTotalViews)) {
      addToDataObject(service, browserName, browserViews);
    } else {
      // debug mode flag needed
      // console.log(
      // `The ${browserName} has been removed as it did not meet the 0.05% threshold for ${service}.`
      // );
    }
  });

  return dataWithinThreshold;
};
