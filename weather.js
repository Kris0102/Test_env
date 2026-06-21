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
 * @param {string} [unit='C'] - Temperature unit, 'C' for Celsius or 'F' for Fahrenheit
 * @returns {WeatherData}
 * @throws {Error} if city is not found
 */
function getWeather(city, unit = 'C') {
  const data = WEATHER_DB[city];
  if (!data) {
    throw new Error(`Unknown city: ${city}`);
  }
  
  // Default to 'C' if unit is not 'F'
  const effectiveUnit = unit === 'F' ? 'F' : 'C';
  
  // Convert temperature if unit is Fahrenheit
  const temperature = effectiveUnit === 'F'
    ? celsiusToFahrenheit(data.temperature)
    : formatTemperature(data.temperature, 'C');
  
  return {
    city,
    temperature,
    condition: data.condition,
    unit: effectiveUnit,
  };
}

module.exports = { getWeather };
