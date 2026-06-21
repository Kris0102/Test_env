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
 * @property {{ min: number, max: number, avg: number }} summary
 */

/**
 * 3-day weather forecast database with seed values consistent with weather.js.
 * Munich base 18, Berlin base 22, Hamburg base 15, with slight variations per day.
 */
const FORECAST_DB = {
  Munich: [
    { temperature: 18, condition: "Partly Cloudy" },
    { temperature: 19, condition: "Sunny" },
    { temperature: 17, condition: "Cloudy" },
  ],
  Berlin: [
    { temperature: 22, condition: "Sunny" },
    { temperature: 23, condition: "Clear" },
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
 * @param {string} city - The city name (Munich, Berlin, or Hamburg)
 * @param {string} [unit='C'] - Temperature unit ('C' or 'F')
 * @returns {ForecastResult}
 * @throws {Error} if city is not found
 */
function getForecast(city, unit = "C") {
  const daysData = FORECAST_DB[city];
  if (!daysData) {
    throw new Error(`Unknown city: ${city}`);
  }

  const days = daysData.map((dayData, index) => {
    const dayName = `Day ${index + 1}`;
    let temperature = dayData.temperature;
    if (unit === "F") {
      temperature = celsiusToFahrenheit(temperature);
    }
    return {
      day: dayName,
      temperature,
      condition: dayData.condition,
    };
  });

  const dayTemperatures = days.map((day) => day.temperature);
  const summary = summarizeTemperatures(dayTemperatures);

  return {
    city,
    unit,
    days,
    summary,
  };
}

module.exports = { getForecast, FORECAST_DB };
