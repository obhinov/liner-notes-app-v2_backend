// ----- Imports -----
const axios = require('axios');

// Gets an access token from the spotify web api
// TO FIX: make consistent with spotifyApiDataCaller, use the SpotifyWebApi module instead of using axios
async function spotifyApiTokenCaller(code_input, redirect_uri_input, id_input, secret_input) {

    const headers = {
      headers: {
        "Authorization": "Basic " + Buffer.from(id_input + ":" + secret_input).toString('base64'),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const data = new URLSearchParams({
      grant_type: "authorization_code",
      code: code_input,
      redirect_uri: redirect_uri_input
    });

    const function1_response = axios.post("https://accounts.spotify.com/api/token", data, headers);
    return function1_response;
}

module.exports = spotifyApiTokenCaller;