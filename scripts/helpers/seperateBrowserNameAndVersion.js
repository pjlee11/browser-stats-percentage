const modifiedData = {};
let browsersWithVersionSeperated = {};

const splitVersionFromBrowser = browserNameWithVersion => {
  // get the version numbers from the current browserDataWithVersion entry. Most enteries are similar to "Chrome 45.x"
  const versionRegexWithTrailingDotX = / ([0-9]+)(\.x)/;
  // This is needed for enteries that do not have a trailing '.x' such as 'Nokia 2860'
  const versionRegex = / ([0-9]+)/;

  // default the version to empty string for things like "Safari" or "Chrome"
  let version = "";
  // return the full values for things that don't have a number version like "Safari" or "MAUI WAP Browser"
  let browserName = browserNameWithVersion;

  // DotX === '.x'
  const matchesWithTrailingDotX = browserNameWithVersion.match(
    versionRegexWithTrailingDotX
  );
  const matches = browserNameWithVersion.match(versionRegex);

  if (matchesWithTrailingDotX) {
    browserName = browserNameWithVersion.replace(
      matchesWithTrailingDotX[0],
      ""
    );
    version = parseInt(matchesWithTrailingDotX[1]);
  } else if (matches) {
    browserName = browserNameWithVersion.replace(matches[0], "");
    version = parseInt(matches[1]);
  } else {
    // debug mode flag needed
    // console.log(
    // `Could not extract version from the Browser name: ${browserNameWithVersion}`
    // );
  }

  return { version, browserName };
};

const createBrowserObjectWithAnArrayOfVersions = (browserName, version) => {
  // remove unknown browser count
  if (browserName !== "Unknown" && browserName !== undefined) {
    // if the browser has already been keyed add the next version
    if (browsersWithVersionSeperated.hasOwnProperty(browserName)) {
      browsersWithVersionSeperated[browserName].push(version);
    } else {
      // the browser is not yet keyed in the object, create an array populated with the first version
      browsersWithVersionSeperated[browserName] = [version];
    }
  }
};

module.exports.seperateBrowserNameAndVersion = data => {
  const services = Object.keys(data);

  services.forEach(service => {
    const browserNameWithConcatVersion = Object.keys(data[service]);

    browserNameWithConcatVersion.forEach(browserNameAndVersion => {
      const { browserName, version } = splitVersionFromBrowser(
        browserNameAndVersion
      );

      createBrowserObjectWithAnArrayOfVersions(browserName, version);
    });

    modifiedData[service] = browsersWithVersionSeperated;

    browsersWithVersionSeperated = {};
  });

  return modifiedData;
};
