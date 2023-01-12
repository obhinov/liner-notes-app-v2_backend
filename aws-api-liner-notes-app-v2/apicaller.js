// "use strict";

// const axios = require('axios');


// const api_function = {};

// api_function.handler = async (event) => {
  
//   let response = {};

//   const spotify_auth_code = event.queryStringParameters.spotify_auth_code;
//   const spotify_redirect_uri = event.queryStringParameters.spotify_redirect_uri;
//   const spotify_id = event.queryStringParameters.spotify_id;
//   const spotify_secret = event.queryStringParameters.spotify_secret;

//   const genius_client_access_token = event.queryStringParameters.genius_client_access_token;

//   spotify_api_token_caller(spotify_auth_code, spotify_redirect_uri, spotify_id, spotify_secret)
//   .then(res_token => {
//     console.log('Token Received!: ', res_token.data.access_token);
//     return spotify_api_data_caller(res_token.data.access_token);
//   })

//   .then(res_data => {
//     console.log('Spotify Data Received!: ', res_data);
//     // Now the spotify data is received, get the genius search results!
//     const spotify_song_name = res_data.item.name;
//     const spotify_song_name_cleaned = spotify_song_name.replace(/ *\([^)]*\) */g, "");
//     const spotify_song_artist = res_data.item.artists[0].name;
//     const genius_api_url = "https://api.genius.com/search?" + new URLSearchParams({
//       q: spotify_song_name_cleaned + ' ' + spotify_song_artist
//     });
//     return genius_api_caller(genius_api_url, genius_client_access_token)
//   })

//   .then(res_genius_search => {
//     console.log('Genius Search Results Received!: ', res_genius_search);
//     // Get the first song result from the search
//     const genius_api_path = res_genius_search.data.response.hits[0].result.api_path;
//     const genius_api_for_song = "https://api.genius.com" + genius_api_path;
//     return genius_api_caller(genius_api_for_song, genius_client_access_token);
//   })

//   .then(res_genius_song_data => {
//     console.log('Genius Song Data Received!: ', res_genius_song_data);
//     response.body = JSON.stringify(res_genius_song_data);
//     response.statusCode = 200;
//   })

//   .catch(err => {
//     console.log("Oops, an error occured!:", err);
//     response.body = JSON.stringify(err);
//     response.statusCode = 500;
//   })

//   response.headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json'
//   };

//   return response;
// };


// // ----- Side Functions -----
// // Function 1: Gets an access token from the spotify web api
// async function spotify_api_token_caller(code_input, redirect_uri_input, id_input, secret_input) {

//   const headers = {
//     headers: {
//       "Authorization": "Basic " + window.btoa(id_input + ":" + secret_input),
//       "Content-Type": "application/x-www-form-urlencoded"
//     }
//   };
  
//   const data = new URLSearchParams({
//     grant_type: "authorization_code",
//     code: code_input,
//     redirect_uri: redirect_uri_input
//   });

//   const response = axios.post("https://accounts.spotify.com/api/token", data, headers);
//   return response;
// }

// // Function 2: Gets any data from spotify using an access token (specific case: get current song user is playing)
// async function spotify_api_data_caller(access_token_input) {

//   spotifyApiFunction.setAccessToken(access_token_input);
//   const response = spotifyApiFunction.getMyCurrentPlayingTrack();
//   return response;

// }

// // Function 3: Gets anything from the genius web api
// async function genius_api_caller(url,token) {
//   const headers = {
//     headers: {
//       "Authorization": "Bearer " + token,
//       "User-Agent": "CompuServe Classic/1.22",
//       "Accept": "application/json",
//       "Host": "api.genius.com"
//     }
//   }
//   const response = await axios.get(url, headers);
//   return response;
// }

// module.exports = api_function;


// TESTING IF API+LAMBDA WORKS AT ALL (WORKS!)
// const api_function = {};
// api_function.handler = async (event) => {
//   console.log(event);
//   const response = {
//     body: JSON.stringify({
//       'thingy': 'wingy'
//     }),
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json'
//     }
//   };
//   return response;
// }
// module.exports = api_function



// ----- Testing if genius web api works in node ----- ( WORKS!!!)

const axios = require('axios');

const api_function = {};

api_function.handler = async (event) => {
  console.log(event);

  let main_response = {};

  const spotify_song_name_cleaned = "Headlines";
  const spotify_song_artist = "Drake";

  const genius_api_url = "https://api.genius.com/search?" + new URLSearchParams({
    q: spotify_song_name_cleaned + ' ' + spotify_song_artist
  });

  const genius_client_access_token_main = event.queryStringParameters.genius_client_access_token;

  try {
    const genius_song_data = await genius_api_caller(genius_api_url, genius_client_access_token_main);
    console.log(genius_song_data);
    main_response.body = JSON.stringify(genius_song_data.data);
    main_response.statusCode = 200;

    console.log("Response received:", genius_song_data);
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
module.exports = api_function

// Function 3: Gets anything from the genius web api
async function genius_api_caller(url,token) {
  const headers = {
    headers: {
      "Authorization": "Bearer " + token,
      "User-Agent": "CompuServe Classic/1.22",
      "Accept": "application/json",
      "Host": "api.genius.com"
    }
  }
  const genius_response = await axios.get(url, headers);
  return genius_response;
}

module.exports = api_function;