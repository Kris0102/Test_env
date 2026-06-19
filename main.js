"use strict";

const { getWeather } = require("./weather");
const { getForecast } = require("./forecast");

try {
  const args = process.argv.slice(2);
  const city = args[0] || "Munich";
  
  let unit = "C";
  const unitIdx = args.indexOf("--unit");
  if (unitIdx !== -1 && args[unitIdx + 1]) {
    unit = args[unitIdx + 1];
  }

  let days = 1;
  const daysIdx = args.indexOf("--days");
  if (daysIdx !== -1 && args[daysIdx + 1]) {
    days = parseInt(args[daysIdx + 1], 10);
  }

  if (days > 1) {
    const result = getForecast(city, unit);
    console.log(`Forecast for ${result.city} (${result.unit}):`);
    result.days.forEach((d) => {
      console.log(`Day ${d.day}: ${d.temperature}°${result.unit}, ${d.condition}`);
    });
    console.log(`Summary: Min ${result.summary.min}°${result.unit}, Max ${result.summary.max}°${result.unit}, Avg ${result.summary.avg}°${result.unit}`);
  } else {
    const result = getWeather(city, unit);
    console.log(`Today in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
  }
} catch (err) {
  console.error(err.message);
}
