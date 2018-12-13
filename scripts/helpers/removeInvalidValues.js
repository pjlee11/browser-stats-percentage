const validServices = [
  "news",
  "news-ws-afaanoromoo",
  "news-ws-afrique",
  "news-ws-amharic",
  "news-ws-arabic",
  "news-ws-azeri",
  "news-ws-bengali",
  "news-ws-burmese",
  "news-ws-cymrufyw",
  "news-ws-gahuza",
  "news-ws-gujarati",
  "news-ws-hausa",
  "news-ws-hindi",
  "news-ws-igbo",
  "news-ws-indonesia",
  "news-ws-japanese",
  "news-ws-korean",
  "news-ws-kyrgyz",
  "news-ws-marathi",
  "news-ws-mundo",
  "news-ws-naidheachdan",
  "news-ws-nepali",
  "news-ws-newyddion",
  "news-ws-pashto",
  "news-ws-persian",
  "news-ws-pidgin",
  "news-ws-portuguese",
  "news-ws-punjabi",
  "news-ws-russian",
  "news-ws-schoolreport",
  "news-ws-serbian",
  "news-ws-sinhala",
  "news-ws-somali",
  "news-ws-swahili",
  "news-ws-tajik",
  "news-ws-tamil",
  "news-ws-telugu",
  "news-ws-thai",
  "news-ws-tigrinya",
  "news-ws-turkce",
  "news-ws-ukchina",
  "news-ws-ukrainian",
  "news-ws-urdu",
  "news-ws-uzbek",
  "news-ws-vietnamese",
  "news-ws-yoruba",
  "news-ws-zhongwen"
];

const isValidBBCSiteValue = service => {
  if (validServices.includes(service)) {
    return true;
  }

  // console.log(`Removing entry with the bbc_site value: ${service}`); // debug mode flag needed
  return false;
};

module.exports.removeInvalidValues = data => {
  let validData = data.map(entry => {
    return isValidBBCSiteValue(entry["bbc_site"]) ? entry : undefined;
  });

  return validData.filter(undefined => undefined);
};
