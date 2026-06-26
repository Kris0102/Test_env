"use strict";

const { getWeather } = require("./weather");
const { getForecast } = require("./forecast");

try {
  const args = process.argv.slice(2);
  let city = "Munich";
  let unit = "C";
  let days = 1;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--unit" && args[i + 1]) {
      unit = args[i + 1];
      i++;
    } else if (arg === "--days" && args[i + 1]) {
      days = parseInt(args[i + 1], 10);
      i++;
    } else if (!arg.startsWith("--")) {
      city = arg;
    }
  }

  if (days > 1) {
    const result = getForecast(city, unit);
    console.log(`Forecast for ${result.city} (${result.unit}):`);
    result.days.forEach((d) => {
      console.log(`Day ${d.day}: ${d.temperature}°${result.unit}, ${d.condition}`);
    });
    const { min, max, avg } = result.summary;
    console.log(`Summary: Min ${min}°${result.unit}, Max ${max}°${result.unit}, Avg ${avg}°${result.unit}`);
  } else {
    const result = getWeather(city, unit);
    console.log(`Today in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
  }
} catch (err) {
  console.error(err.message);
}
