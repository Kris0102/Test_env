"use strict";

const { getWeather } = require("./weather");
const { getForecast } = require("./forecast");

/**
 * Parse command line arguments.
 * @returns {{ city: string, unit: string, days: number }}
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

try {
  const { city, unit, days } = parseArgs();

  if (days > 1) {
    const forecast = getForecast(city, unit);
    forecast.days.forEach((day) => {
      console.log(`Forecast for ${day.day}: ${day.temperature}°${unit}, ${day.condition}`);
    });
    console.log(
      `Summary: min=${forecast.summary.min}°${unit}, max=${forecast.summary.max}°${unit}, avg=${forecast.summary.avg}°${unit}`
    );
  } else {
    const result = getWeather(city, unit);
    console.log(`Weather in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
  }
} catch (err) {
  console.error(err.message);
}
