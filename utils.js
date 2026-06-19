"use strict";

/**
 * Round a temperature value to one decimal place.
 * @param {number} value
 * @param {string} unit - "C" or "F"
 * @returns {number}
 */
function formatTemperature(value, unit) {
  if (typeof value !== "number") {
    throw new TypeError(`Expected number, got ${typeof value}`);
  }
  return Math.round(value * 10) / 10;
}

/**
 * Convert Celsius to Fahrenheit.
 * @param {number} celsius
 * @returns {number}
 * @throws {TypeError} If input is not a number.
 */
function celsiusToFahrenheit(celsius) {
  if (typeof celsius !== "number") {
    throw new TypeError(`Expected number, got ${typeof celsius}`);
  }
  return (celsius * 9) / 5 + 32;
}

/**
 * Calculate min, max, and average of temperature values.
 * @param {number[]} values
 * @returns {{min: number, max: number, avg: number}}
 */
function summarizeTemperatures(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = formatTemperature(sum / values.length);

  return { min, max, avg };
}

module.exports = {
  formatTemperature,
  celsiusToFahrenheit,
  summarizeTemperatures,
};
