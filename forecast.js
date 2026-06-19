"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("./utils");

/**
 * Database of 3-day forecasts for supported cities.
 * Temperatures are stored in Celsius.
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
 * Retrieve a multi-day weather forecast for a city.
 * @param {string} city
 * @param {string} [unit="C"] - "C" or "F"
 * @returns {{city: string, unit: string, days: Array<{day: number, temperature: number, condition: string}>, summary: {min: number, max: number, avg: number}}}
 * @throws {Error} if city is not found
 */
function getForecast(city, unit = "C") {
  const daysData = FORECAST_DB[city];
  if (!daysData) {
    throw new Error(`Unknown city: ${city}`);
  }

  const days = daysData.map((data, index) => {
    let temperature = data.temperature;
    if (unit === "F") {
      temperature = celsiusToFahrenheit(temperature);
    }
    return {
      day: index + 1,
      temperature,
      condition: data.condition,
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
