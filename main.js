"use strict";

/**
 * Parse CLI arguments
 * @returns {{city: string, unit: string, days: number}}
 */
function parseArgs() {
  const args = process.argv.slice(2);
  let city = "Munich";
  let unit = "C";
  let days = 1;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--unit" && args[i + 1]) {
      unit = args[i + 1];
      i++;
    } else if (args[i] === "--days" && args[i + 1]) {
      days = parseInt(args[i + 1], 10);
      i++;
    } else if (!args[i].startsWith("--")) {
      city = args[i];
    }
  }

  return { city, unit, days };
}

const { city, unit, days } = parseArgs();

try {
  if (days === 1) {
    const { getWeather } = require("./weather");
    const result = getWeather(city, unit);
    console.log(`Weather in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
  } else {
    const { getForecast } = require("./forecast");
    const result = getForecast(city, unit);
    result.days.forEach((day) => {
      console.log(`${day.day}: ${day.temperature}°${result.unit}, ${day.condition}`);
    });
    console.log(
      `Summary: min=${result.summary.min}°${result.unit}, max=${result.summary.max}°${result.unit}, avg=${result.summary.avg}°${result.unit}`
    );
  }
} catch (err) {
  console.error(err.message);
}
