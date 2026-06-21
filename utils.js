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
 */
function celsiusToFahrenheit(celsius) {
  if (typeof celsius !== "number") {
    throw new TypeError(`Expected number, got ${typeof celsius}`);
  }
  return (celsius * 9 / 5) + 32;
}

/**
 * Summarize an array of temperature values.
 * @param {number[]} values
 * @returns {{ min: number, max: number, avg: number }}
 */
function summarizeTemperatures(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = formatTemperature(values.reduce((a, b) => a + b, 0) / values.length, "C");
  return { min, max, avg };
}

module.exports = { formatTemperature, celsiusToFahrenheit, summarizeTemperatures };
