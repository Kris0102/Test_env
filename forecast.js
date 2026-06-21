"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("./utils");

/**
 * @typedef {Object} ForecastDay
 * @property {string} day
 * @property {number} temperature
 * @property {string} condition
 */

/**
 * @typedef {Object} Summary
 * @property {number} min
 * @property {number} max
 * @property {number} avg
 */

/**
 * @typedef {Object} Forecast
 * @property {string} city
 * @property {string} unit
 * @property {ForecastDay[]} days
 * @property {Summary} summary
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
 * @returns {Forecast}
 * @throws {Error} if city is not found
 */
function getForecast(city, unit = "C") {
  const data = FORECAST_DB[city];
  if (!data) {
    throw new Error(`Unknown city: ${city}`);
  }

  const dayNames = ["Day 1", "Day 2", "Day 3"];
  const days = data.map((dayData, index) => {
    let temperature = dayData.temperature;
    if (unit === "F") {
      temperature = celsiusToFahrenheit(temperature);
    }
    return {
      day: dayNames[index],
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
