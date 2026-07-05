"use strict";

const { formatTemperature, levenshteinDistance } = require("./utils");

/**
 * @typedef {Object} WeatherData
 * @property {string} city
 * @property {number} temperature
 * @property {string} condition  - e.g. "Sunny", "Rainy"
 * @property {string} unit       - "C" or "F"
 * @property {boolean} corrected
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
 * Resolve a user-typed city name against the weather database.
 * @param {string} query
 * @returns {CityResolution}
 * @throws {Error} if city is not found or only a suggestion is available
 */
function findCity(query) {
  // 1. Exact match
  if (WEATHER_DB[query]) {
    return { city: query, corrected: false };
  }

  const cities = Object.keys(WEATHER_DB);
  const lowerQuery = query.toLowerCase();

  // 2. Case-insensitive match
  for (const city of cities) {
    if (city.toLowerCase() === lowerQuery) {
      return { city, corrected: true };
    }
  }

  // 3. Fuzzy match and Suggestion tracking
  let minDistance = Infinity;
  let closestCity = null;

  for (const city of cities) {
    const distance = levenshteinDistance(lowerQuery, city.toLowerCase());
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  if (minDistance <= 2) {
    return { city: closestCity, corrected: true };
  }

  if (minDistance <= 3) {
    throw new Error(`Unknown city: ${query}. Did you mean ${closestCity}?`);
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
  const { city: canonicalCity, corrected } = findCity(city);
  const data = WEATHER_DB[canonicalCity];

  return {
    city: canonicalCity,
    temperature: data.temperature,
    condition: data.condition,
    unit: "C",
    corrected: corrected,
  };
}

module.exports = { getWeather, findCity };
