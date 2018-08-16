# Calculating the non-svg browser support

To run clone this repo and run `node getSvgBrowsers.js`.

## Running against real data sets

The `browser-stats.json` data is frivolous as this is a public repo. For actual use cases we should retrieve the data from our analytics reports. These reports are often supplied as a .xlsx format.

We need to tidy the data so it is in the following format:

| Row Name 1 | Row Name 2 | Row Name 3 |
| -----------|----------|----------|
| data 1A | data 1B | data 1C |
| data 2A | data 2B | data 2C |
| data 3A | data 3B | data 3C |
| data 4A | data 4B | data 4C |
| data 5A | data 5B | data 5C |

This can then be saved/exported as a .csv format.

Once the data is in a .csv format we can convert it to JSON using a tool such as https://shancarter.github.io/mr-data-converter/. I then also suggest to run the data through a linter such as https://jsonlint.com/.

We can now copy the valid JSON formatted data and save it as `browser-stats.json`.

Now from terminal the command `node getSvgBrowsers.js` should run against the real data set.
