"use strict";

const { getWeather } = require("./weather");
const { getForecast } = require("./forecast");

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  let city = "Munich";
  let unit = "C";
  let days = 1;

  let i = 0;
  while (i < args.length) {
    if (args[i] === "--unit") {
      unit = args[i + 1] || "C";
      i += 2;
    } else if (args[i] === "--days") {
      days = parseInt(args[i + 1], 10) || 1;
      i += 2;
    } else if (!args[i].startsWith("--")) {
      city = args[i];
      i++;
    } else {
      i++;
    }
  }

  return { city, unit, days };
}

try {
  const { city, unit, days } = parseArgs();

  if (days > 1) {
    const forecast = getForecast(city, unit);
    for (const day of forecast.days) {
      console.log(`${day.day}: ${day.temperature}°${forecast.unit}, ${day.condition}`);
    }
    console.log(`Summary: min=${forecast.summary.min}°${forecast.unit}, max=${forecast.summary.max}°${forecast.unit}, avg=${forecast.summary.avg}°${forecast.unit}`);
  } else {
    const result = getWeather(city, unit);
    console.log(`Weather in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
  }
} catch (err) {
  console.error(err.message);
}
