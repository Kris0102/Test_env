"use strict";

const { getWeather, findCity } = require("./weather");

try {
  const input = "Munich";
  const { city: canonical, corrected } = findCity(input);
  const result = getWeather(canonical);
  console.log(`Weather in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
  if (corrected) {
    console.log(`corrected "${input}" -> "${canonical}"`);
  }
} catch (err) {
  console.error(err.message);
}
