"use strict";

const { getWeather } = require("./weather");
const { loadConfig } = require("./config");

/**
 * Parse CLI arguments into city tokens and an optional unit flag.
 * @param {string[]} argv - process.argv.slice(2)
 * @returns {{ cities: string[], unit: string|null }}
 */
function parseArgs(argv) {
  const cities = [];
  let unit = null;

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--unit") {
      unit = argv[i + 1];
      i++;
    } else {
      cities.push(argv[i]);
    }
  }

  return { cities, unit };
}

function main() {
  const { cities, unit: cliUnit } = parseArgs(process.argv.slice(2));

  let config;
  try {
    config = loadConfig(process.cwd());
  } catch (err) {
    console.error(err.message);
    process.exit(1);
    return;
  }

  const effectiveUnit = cliUnit || config.defaultUnit || "C";

  if (cities.length === 0) {
    console.error("Usage: node main.js <city> [<city> ...] [--unit C|F]");
    process.exit(1);
    return;
  }

  let anyFailed = false;

  for (const cityToken of cities) {
    try {
      let result;
      if (Object.prototype.hasOwnProperty.call(config.aliases, cityToken)) {
        const canonical = config.aliases[cityToken];
        result = getWeather(canonical, effectiveUnit);
        result.corrected = false;
      } else {
        result = getWeather(cityToken, effectiveUnit);
      }

      console.log(
        `Weather in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`
      );
      if (result.corrected) {
        console.log(`corrected "${cityToken}" -> "${result.city}"`);
      }
    } catch (err) {
      console.error(err.message);
      anyFailed = true;
    }
  }

  process.exit(anyFailed ? 1 : 0);
}

main();
