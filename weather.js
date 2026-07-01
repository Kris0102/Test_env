"use strict";

const { formatTemperature, celsiusToFahrenheit } = require("./utils");

/**
 * @typedef {Object} WeatherData
 * @property {string} city
 * @property {number} temperature
 * @property {string} condition  - e.g. "Sunny", "Rainy"
 * @property {string} unit       - "C" or "F"
 */

const WEATHER_DB = {
  Munich: { temperature: 18, condition: "Partly Cloudy" },
  Berlin: { temperature: 22, condition: "Sunny" },
  Hamburg: { temperature: 15, condition: "Rainy" },
};

/**
 * Retrieve current weather for a city.
 * @param {string} city
 * @param {string} [unit="C"] - "C" or "F"
 * @returns {WeatherData}
 * @throws {Error} if city is not found
 */
function getWeather(city, unit = "C") {
  const data = WEATHER_DB[city];
  if (!data) {
    throw new Error(`Unknown city: ${city}`);
  }

  let temp = data.temperature;
  if (unit === "F") {
    temp = celsiusToFahrenheit(temp);
  }

  return {
    city,
    temperature: formatTemperature(temp, unit),
    condition: data.condition,
    unit: unit,
  };
}

module.exports = { getWeather };
