"use strict";

const { formatTemperature } = require("./utils");

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
 * @returns {WeatherData}
 * @throws {Error} if city is not found
 */
function getWeather(city) {
  const data = WEATHER_DB[city];
  if (!data) {
    throw new Error(`Unknown city: ${city}`);
  }
  return {
    city,
    temperature: formatTemperature(data.temperature, "C"),
    condition: data.condition,
    unit: "C",
  };
}

module.exports = { getWeather };
