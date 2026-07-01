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
 * Compare two temperature values.
 * @param {number} a
 * @param {number} b
 * @returns {number} - 1 if a > b, -1 if a < b, 0 if a === b
 * @throws {TypeError} if either argument is not a number
 */
function compareTemperatures(a, b) {
  if (typeof a !== "number") {
    throw new TypeError(`Expected number, got ${typeof a}`);
  }
  if (typeof b !== "number") {
    throw new TypeError(`Expected number, got ${typeof b}`);
  }
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

module.exports = { formatTemperature, compareTemperatures };
