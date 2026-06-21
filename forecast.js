"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("./utils");

/**
 * @typedef {Object} ForecastDay
 * @property {string} day
 * @property {number} temperature
 * @property {string} condition
 */

/**
 * @typedef {Object} TemperatureSummary
 * @property {number} min
 * @property {number} max
 * @property {number} avg
 */

/**
 * @typedef {Object} ForecastResult
 * @property {string} city
 * @property {string} unit
 * @property {ForecastDay[]} days
 * @property {TemperatureSummary} summary
 */

/**
 * Multi-day forecast database with 3-day arrays per city.
 * Temperatures are in Celsius.
 */
const FORECAST_DB = {
  Munich: [
    { temperature: 18, condition: "Partly Cloudy" },
    { temperature: 19, condition: "Sunny" },
    { temperature: 17, condition: "Cloudy" },
  ],
  Berlin: [
    { temperature: 22, condition: "Sunny" },
    { temperature: 23, condition: "Sunny" },
    { temperature: 21, condition: "Partly Cloudy" },
  ],
  Hamburg: [
    { temperature: 15, condition: "Rainy" },
    { temperature: 16, condition: "Cloudy" },
    { temperature: 14, condition: "Rainy" },
  ],
};

/**
 * Get a multi-day weather forecast for a city.
 * @param {string} city
 * @param {string} [unit='C'] - "C" or "F"
 * @returns {ForecastResult}
 * @throws {Error} if city is not found
 */
function getForecast(city, unit = "C") {
  const data = FORECAST_DB[city];
  if (!data) {
    throw new Error(`Unknown city: ${city}`);
  }

  const days = data.map((dayData, index) => {
    let temperature = dayData.temperature;
    if (unit === "F") {
      temperature = celsiusToFahrenheit(temperature);
    }
    return {
      day: `Day ${index + 1}`,
      temperature,
      condition: dayData.condition,
    };
  });

  const temperatures = days.map((day) => day.temperature);
  const summary = summarizeTemperatures(temperatures);

  return {
    city,
    unit,
    days,
    summary,
  };
}

module.exports = { getForecast };
