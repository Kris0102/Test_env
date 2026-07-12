"use strict";

const fs = require("fs");
const path = require("path");

/**
 * @typedef {Object} WeatherConfig
 * @property {string} defaultUnit - "C" or "F"
 * @property {Object.<string, string>} aliases
 */

/**
 * Load and validate the optional .weatherrc.json config file from a directory.
 * @param {string} cwd - Directory to look for .weatherrc.json in.
 * @returns {WeatherConfig}
 * @throws {Error} if the config file exists but is invalid
 */
function loadConfig(cwd) {
  const filePath = path.join(cwd, ".weatherrc.json");

  if (!fs.existsSync(filePath)) {
    return { defaultUnit: "C", aliases: {} };
  }

  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch (e) {
    throw new Error("Invalid config: invalid JSON");
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error("Invalid config: invalid JSON");
  }

  if (
    Object.prototype.hasOwnProperty.call(parsed, "defaultUnit") &&
    parsed.defaultUnit !== "C" &&
    parsed.defaultUnit !== "F"
  ) {
    throw new Error('Invalid config: defaultUnit must be "C" or "F"');
  }

  if (Object.prototype.hasOwnProperty.call(parsed, "aliases")) {
    const aliases = parsed.aliases;
    const isPlainObject =
      aliases !== null && typeof aliases === "object" && !Array.isArray(aliases);
    const allStrings =
      isPlainObject && Object.values(aliases).every((v) => typeof v === "string");

    if (!isPlainObject || !allStrings) {
      throw new Error("Invalid config: aliases must be an object of string to string");
    }
  }

  return {
    defaultUnit: parsed.defaultUnit || "C",
    aliases: parsed.aliases || {},
  };
}

module.exports = { loadConfig };
