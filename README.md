# Installing

`git clone git@github.com:pjlee11/browser-stats-percentage.git`
`cd browser-stats-percentage`
`npm install`

## Running against real data sets

The `browser-stats.json` data is frivolous as this is a public repo. For actual use cases we should retrieve the data from our analytics reports. These reports are often supplied as a .xlsx format.

We need to tidy the data so it is in the following format:

| Row Name 1 | Row Name 2 | Row Name 3 |
| ---------- | ---------- | ---------- |
| data 1A    | data 1B    | data 1C    |
| data 2A    | data 2B    | data 2C    |
| data 3A    | data 3B    | data 3C    |
| data 4A    | data 4B    | data 4C    |
| data 5A    | data 5B    | data 5C    |

This can then be saved/exported as a .csv format. See `browser-stats-example.csv` for a detailed example of the desired format.

Once the data is in a .csv format we can add it to our local copy of this repo saving it with the filename `browser-stats.csv`. Then we can run the command `npm run csvtojson` to convert the file into JSON.

Following this we can now run the commands to get browser and OS percentages per service.

## Commands

### `npm run getBrowserPercentages`

This logs the percentage each browser makes up of the total viewership per service.

### `npm run getOSPercentages`

This logs the percentage each operating system makes up of the total viewership per service.

### `npm run getBrowserAndOSPercentages`

This logs the percentage each browser and operating system makes up of the total viewership per service.

## I really don't get this repo

1. Copy and paste the following into a new local file called `browser-stats.csv`.

```
bbc_site,Operating system,Web browser,Browsers,Visits,Page views
news,iOS 12,Safari 12.x,200,200,200
news,iOS 12,Chrome for iOS 68.x,500,500,500
news,iOS 12,Facebook for iPhone 63.x,300,300,300
news-ws-yoruba,Android 5,hrome for iOS 68.x,100,100,100
news-ws-yoruba,Android 5,Facebook for Android 73.x,300,300,300
news-ws-igbo,BlackBerry OS Touch,BlackBerry Browser 10.x,500,500,500
news-ws-igbo,Windows XP,Firefox 52.x,700,700,700
schoolreport,Android 6,Chrome 68.x,100,100,100
schoolreport,Android 5,Chrome 69.x,100,100,100
```

2. `npm run csvtojson`

3. `npm run getBrowserPercentages`

4. Copy the console output and paste into a Github comment and preview the table.

It should look something like this:

| Service        | Browser & Version         | Percentage |
| -------------- | ------------------------- | ---------- |
| news           | Safari 12.x               | 20.000     |
| news           | Chrome for iOS 68.x       | 50.000     |
| news           | Facebook for iPhone 63.x  | 30.000     |
| news-ws-yoruba | Chrome for iOS 68.x       | 25.000     |
| news-ws-yoruba | Facebook for Android 73.x | 75.000     |
| news-ws-igbo   | BlackBerry Browser 10.x   | 41.667     |
| news-ws-igbo   | Firefox 52.x              | 58.333     |
