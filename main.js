"use strict";

const { getWeather } = require("./weather");

const inputCity = "Munich";

try {
  const result = getWeather(inputCity, 'F');
  console.log(`Weather in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
  if (result.corrected) {
    console.log(`corrected "${inputCity}" -> "${result.city}"`);
  }
} catch (err) {
  console.error(err.message);
}
