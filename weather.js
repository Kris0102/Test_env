"use strict";

const { formatTemperature, levenshteinDistance } = require("./utils");

/**
 * @typedef {Object} WeatherData
 * @property {string} city
 * @property {number} temperature
 * @property {string} condition  - e.g. "Sunny", "Rainy"
 * @property {string} unit       - "C" or "F"
 */

/**
 * @typedef {Object} CityResolution
 * @property {string} city
 * @property {boolean} corrected
 */

const WEATHER_DB = {
  Munich: { temperature: 18, condition: "Partly Cloudy" },
  Berlin: { temperature: 22, condition: "Sunny" },
  Hamburg: { temperature: 15, condition: "Rainy" },
};

/**
 * Resolve a user-typed city name against the WEATHER_DB keys.
 * @param {string} query
 * @returns {CityResolution}
 * @throws {Error} if no suitable city is found
 */
function findCity(query) {
  if (WEATHER_DB[query]) {
    return { city: query, corrected: false };
  }

  const keys = Object.keys(WEATHER_DB);
  const lowerQuery = query.toLowerCase();

  for (const key of keys) {
    if (key.toLowerCase() === lowerQuery) {
      return { city: key, corrected: true };
    }
  }

  let minDistance = Infinity;
  let bestKey = null;

  for (const key of keys) {
    const distance = levenshteinDistance(key.toLowerCase(), lowerQuery);
    if (distance < minDistance) {
      minDistance = distance;
      bestKey = key;
    }
  }

  if (minDistance <= 2) {
    return { city: bestKey, corrected: true };
  }

  if (minDistance <= 3) {
    throw new Error(`Unknown city: ${query}. Did you mean ${bestKey}?`);
  }

  throw new Error(`Unknown city: ${query}`);
}

/**
 * Retrieve current weather for a city.
 * @param {string} city
 * @returns {WeatherData}
 * @throws {Error} if city is not found
 */
function getWeather(city) {
  const resolution = findCity(city);
  const canonicalCity = resolution.city;
  const data = WEATHER_DB[canonicalCity];

  return {
    city: canonicalCity,
    temperature: formatTemperature(data.temperature, "C"),
    condition: data.condition,
    unit: "C",
  };
}

module.exports = { getWeather, findCity };
