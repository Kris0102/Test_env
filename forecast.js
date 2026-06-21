"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("./utils");

/**
 * @typedef {Object} ForecastDay
 * @property {string} day
 * @property {number} temperature
 * @property {string} condition
 */

/**
 * @typedef {Object} ForecastResult
 * @property {string} city
 * @property {string} unit
 * @property {ForecastDay[]} days
 * @property {{min: number, max: number, avg: number}} summary
 */

/**
 * 3-day weather forecast database.
 * @type {{[city: string]: ForecastDay[]}}
 */
const FORECAST_DB = {
  Munich: [
    { day: "Day 1", temperature: 18, condition: "Partly Cloudy" },
    { day: "Day 2", temperature: 19, condition: "Sunny" },
    { day: "Day 3", temperature: 17, condition: "Cloudy" },
  ],
  Berlin: [
    { day: "Day 1", temperature: 22, condition: "Sunny" },
    { day: "Day 2", temperature: 23, condition: "Sunny" },
    { day: "Day 3", temperature: 21, condition: "Partly Cloudy" },
  ],
  Hamburg: [
    { day: "Day 1", temperature: 15, condition: "Rainy" },
    { day: "Day 2", temperature: 16, condition: "Cloudy" },
    { day: "Day 3", temperature: 14, condition: "Rainy" },
  ],
};

/**
 * Get a multi-day weather forecast for a city.
 * @param {string} city - The city name.
 * @param {string} [unit='C'] - Temperature unit, "C" or "F".
 * @returns {ForecastResult}
 * @throws {Error} if city is not found in FORECAST_DB
 */
function getForecast(city, unit = "C") {
  const daysData = FORECAST_DB[city];
  if (!daysData) {
    throw new Error(`Unknown city: ${city}`);
  }

  const days = daysData.map((dayData) => {
    let temperature = dayData.temperature;
    if (unit === "F") {
      temperature = celsiusToFahrenheit(temperature);
    }
    return {
      day: dayData.day,
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
