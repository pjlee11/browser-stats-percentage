const fs = require("fs");
const csvtojson = require("csvtojson");
const csvFilePath = "./browser-stats.csv";

csvtojson()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    const json = JSON.stringify(jsonObj, null, 4);

    fs.writeFile("browser-stats.json", json, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log(
        "Conversion succesful! The file `browser-stats.json` has been created for you."
      );
    });
  });
