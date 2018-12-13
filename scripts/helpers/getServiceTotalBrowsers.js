let serviceTotalBrowsers = [];

const countAllViews = (service, browserViews) => {
  // if the array doesn't have the service name as a key
  if (!serviceTotalBrowsers.hasOwnProperty(service)) {
    // add a new array key with the value
    serviceTotalBrowsers[service] = parseInt(browserViews);
  } else {
    // if the service is already a key in the array just add the value
    serviceTotalBrowsers[service] += parseInt(browserViews);
  }
};

module.exports.getServiceTotalBrowsers = data => {
  data.forEach(entry => {
    countAllViews(entry["bbc_site"], entry["Browsers"]);
  });

  return serviceTotalBrowsers;
};
