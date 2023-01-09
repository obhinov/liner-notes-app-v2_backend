"use strict";

const api_function = {};

api_function.handler = async (event) => {
  console.log(event);

  let response = {};

  const body = JSON.stringify({
    message: "hello my good friends!",
    eventInput: event
  });
  response.body = body;
  response.statusCode = 200;
  response.headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  return response;
};

module.exports = api_function;