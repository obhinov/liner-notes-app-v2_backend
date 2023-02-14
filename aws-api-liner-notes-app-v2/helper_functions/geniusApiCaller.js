// ----- Imports ------
const axios = require('axios');

// Gets anything from the genius web api
async function geniusApiCaller(url, token) {
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
      "User-Agent": "CompuServe Classic/1.22",
      Accept: "application/json",
      Host: "api.genius.com",
    },
  };
  const function3_response = await axios.get(url, headers);
  return function3_response;
}

module.exports = geniusApiCaller;