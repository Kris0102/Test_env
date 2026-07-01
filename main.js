"use strict";

const { getWeather } = require("./weather");
const { getForecast } = require("./forecast");

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

try {
  if (days > 1) {
    const result = getForecast(city, unit);
    console.log(`Forecast for ${result.city}:`);
    result.days.forEach((day) => {
      console.log(`Day ${day.day}: ${day.temperature}°${result.unit}, ${day.condition}`);
    });
    console.log(`Summary: Min: ${result.summary.min}°${result.unit}, Max: ${result.summary.max}°${result.unit}, Avg: ${result.summary.avg}°${result.unit}`);
  } else {
    const result = getWeather(city, unit);
    console.log(`Weather in ${result.city} today: ${result.temperature}°${result.unit}, ${result.condition}`);
  }
} catch (err) {
  console.error(err.message);
}
