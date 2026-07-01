"use strict";

const { getWeather, compareCities } = require("./weather");

try {
  const args = process.argv.slice(2);

  if (args[0] === "compare") {
    const cityA = args[1];
    const cityB = args[2];
    const result = compareCities(cityA, cityB);

    if (result.tie) {
      console.log("same temperature");
    } else {
      console.log(`${result.warmer} is warmer than ${result.cooler} by ${result.difference}`);
    }
  } else {
    const city = args[0] || "Munich";
    const result = getWeather(city);
    console.log(`Weather in ${result.city}: ${result.temperature}°${result.unit}, ${result.condition}`);
  }
} catch (err) {
  console.error(err.message);
}
