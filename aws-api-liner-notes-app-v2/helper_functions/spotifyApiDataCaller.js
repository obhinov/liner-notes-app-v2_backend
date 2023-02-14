// ----- Imports -----
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

// Gets any data from spotify using an access token (specific case: get current song user is playing)
async function spotifyApiDataCaller(access_token_input) {
    spotifyApi.setAccessToken(access_token_input);
    const function2_response = spotifyApi.getMyCurrentPlayingTrack();
    return function2_response;
}

module.exports = spotifyApiDataCaller;