"use strict";

const { formatTemperature, compareTemperatures } = require("./utils");

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

/**
 * Compare temperatures of two cities.
 * @param {string} cityA
 * @param {string} cityB
 * @returns {{warmer: string|null, cooler: string|null, difference: string|number, tie: boolean}}
 * @throws {Error} if either city is not found
 */
function compareCities(cityA, cityB) {
  if (!WEATHER_DB[cityA]) {
    throw new Error(`Unknown city: ${cityA}`);
  }
  if (!WEATHER_DB[cityB]) {
    throw new Error(`Unknown city: ${cityB}`);
  }

  const tempA = WEATHER_DB[cityA].temperature;
  const tempB = WEATHER_DB[cityB].temperature;
  const comparison = compareTemperatures(tempA, tempB);

  if (comparison === 0) {
    return {
      warmer: null,
      cooler: null,
      difference: 0,
      tie: true,
    };
  }

  const warmer = comparison === 1 ? cityA : cityB;
  const cooler = comparison === 1 ? cityB : cityA;
  const difference = formatTemperature(Math.abs(tempA - tempB), "C");

  return {
    warmer,
    cooler,
    difference,
    tie: false,
  };
}

module.exports = { getWeather, compareCities };
