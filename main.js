"use strict";

const { getWeather } = require("./weather");

try {
  const result = getWeather("Munich");
  console.log(`Weather in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
} catch (err) {
  console.error(err.message);
}
