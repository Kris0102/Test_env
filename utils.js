"use strict";

/**
 * Round a temperature value to one decimal place, converting units as needed.
 * @param {number} value - Temperature in Celsius.
 * @param {string} unit - "C" or "F"
 * @returns {number}
 * @throws {TypeError} If value is not a number.
 * @throws {Error} If unit is not "C" or "F".
 */
function formatTemperature(value, unit) {
  if (typeof value !== "number") {
    throw new TypeError(`Expected number, got ${typeof value}`);
  }

  if (unit === "C") {
    return Math.round(value * 10) / 10;
  }

  if (unit === "F") {
    const fahrenheit = (value * 9) / 5 + 32;
    return Math.round(fahrenheit * 10) / 10;
  }

  throw new Error(`Unsupported unit: ${unit}`);
}

/**
 * Calculate the Levenshtein distance between two strings.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 * @throws {TypeError} If either argument is not a string.
 */
function levenshteinDistance(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    throw new TypeError("Both arguments must be strings");
  }

  const n = a.length;
  const m = b.length;
  const matrix = [];

  for (let i = 0; i <= n; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= m; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[n][m];
}

module.exports = { formatTemperature, levenshteinDistance };
