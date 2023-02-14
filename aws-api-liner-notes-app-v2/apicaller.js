// ----- Imports -----
const spotifyApiTokenCaller = require('./helper_functions/spotifyApiTokenCaller');
const spotifyApiDataCaller = require('./helper_functions/spotifyApiDataCaller');
const geniusApiCaller = require('./helper_functions/geniusApiCaller');

const apiFunction = {};

// ----- Main handler function -----
apiFunction.handler = async (event) => {
  console.log('Event input:', event);

  let main_response = {};

  const spotify_auth_code = event.queryStringParameters.spotify_auth_code;
  const spotify_redirect_uri = event.queryStringParameters.spotify_redirect_uri;
  const spotify_id = event.queryStringParameters.spotify_id;
  const spotify_secret = event.queryStringParameters.spotify_secret;

  const genius_client_access_token = event.queryStringParameters.genius_client_access_token; 

  try {
    // Get spotify token
    const spotify_token_response = await spotifyApiTokenCaller(spotify_auth_code, spotify_redirect_uri, spotify_id, spotify_secret);
    console.log('Token response received!:', spotify_token_response.data.access_token);

    // Get spotify data of current playing track
    const spotify_data_response = await spotifyApiDataCaller(spotify_token_response.data.access_token);
    console.log('Spotify data received!:', spotify_data_response);
    
    // Get genius search data using spotify data
    const spotify_song_name = spotify_data_response.body.item.name;
    const spotify_song_name_cleaned = spotify_song_name.replace(/ *\([^)]*\) */g, "");
    const spotify_song_artist = spotify_data_response.body.item.artists[0].name;
    const genius_api_url = "https://api.genius.com/search?" + new URLSearchParams({
      q: spotify_song_name_cleaned + ' ' + spotify_song_artist
    });
    const genius_search_response = await geniusApiCaller(genius_api_url, genius_client_access_token);
    console.log('Genius search received!:', genius_search_response);

    // Get genius song data using genius search data
    const genius_api_path = genius_search_response.data.response.hits[0].result.api_path;
    const genius_api_for_song = "https://api.genius.com" + genius_api_path;
    const genius_song_data_response = await geniusApiCaller(genius_api_for_song, genius_client_access_token);
    console.log('Genius song data received!:', genius_song_data_response);

    main_response.body = JSON.stringify(genius_song_data_response.data);
    main_response.statusCode = 200;

  } catch(e) {
    main_response.body = JSON.stringify(e);
    main_response.statusCode = 500;

    console.log("Oops, an error occured!:", e);
  }

  main_response.headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }

  return main_response;
}
module.exports = apiFunction