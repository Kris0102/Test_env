"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("./utils");

/**
 * @typedef {Object} ForecastDay
 * @property {number} day
 * @property {number} temperature
 * @property {string} condition
 * 
 * @typedef {Object} ForecastResult
 * @property {string} city
 * @property {string} unit
 * @property {ForecastDay[]} days
 * @property {Object} summary
 * @property {number} summary.min
 * @property {number} summary.max
 * @property {string} summary.avg
 */

const FORECAST_DB = {
  Munich: [
    { temperature: 18, condition: "Partly Cloudy" },
    { temperature: 20, condition: "Sunny" },
    { temperature: 17, condition: "Cloudy" },
  ],
  Berlin: [
    { temperature: 22, condition: "Sunny" },
    { temperature: 24, condition: "Sunny" },
    { temperature: 21, condition: "Partly Cloudy" },
  ],
  Hamburg: [
    { temperature: 15, condition: "Rainy" },
    { temperature: 14, condition: "Rainy" },
    { temperature: 16, condition: "Cloudy" },
  ],
};

/**
 * Retrieve a 3-day weather forecast for a city.
 * @param {string} city
 * @param {string} [unit="C"] - "C" or "F"
 * @returns {ForecastResult}
 * @throws {Error} if city is not found
 */
function getForecast(city, unit = "C") {
  const data = FORECAST_DB[city];
  if (!data) {
    throw new Error(`Unknown city: ${city}`);
  }

  const days = data.map((dayData, index) => {
    const temperature = unit === "F" 
      ? celsiusToFahrenheit(dayData.temperature) 
      : dayData.temperature;
    
    return {
      day: index + 1,
      temperature,
      condition: dayData.condition,
    };
  });

  const temperatures = days.map((d) => d.temperature);
  const summary = summarizeTemperatures(temperatures);

  return {
    city,
    unit,
    days,
    summary,
  };
}

module.exports = { getForecast };
