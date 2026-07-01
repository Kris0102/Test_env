"use strict";

const { formatTemperature, celsiusToFahrenheit, summarizeTemperatures } = require("./utils");

/**
 * Mock database for 3-day forecasts.
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
 * Retrieve a 3-day forecast for a city.
 * @param {string} city
 * @param {string} [unit="C"] - "C" or "F"
 * @returns {{city: string, unit: string, days: Array<{day: number, temperature: string, condition: string}>, summary: {min: number, max: number, avg: string}}}
 * @throws {Error} if city is not found
 */
function getForecast(city, unit = "C") {
  const forecastData = FORECAST_DB[city];
  if (!forecastData) {
    throw new Error(`Unknown city: ${city}`);
  }

  const temperatures = forecastData.map((day) => {
    return unit === "F" ? celsiusToFahrenheit(day.temperature) : day.temperature;
  });

  const days = forecastData.map((day, index) => {
    return {
      day: index + 1,
      temperature: formatTemperature(temperatures[index], unit),
      condition: day.condition,
    };
  });

  const summary = summarizeTemperatures(temperatures);

  return {
    city,
    unit,
    days,
    summary,
  };
}

module.exports = { getForecast };
