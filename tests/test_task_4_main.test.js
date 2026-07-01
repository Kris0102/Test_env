"use strict";

const { getWeather } = require("../weather");
const { getForecast } = require("../forecast");

// We need to mock process.argv and console.log/error because main.js 
// executes its logic immediately upon being required if it's not wrapped in a function.
// However, main.js is written as a script. To test it, we can use jest.isolateModules 
// and mock process.argv.

describe("main.js CLI", () => {
  let logSpy, errorSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    jest.resetModules();
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  const runMain = (args = []) => {
    process.argv = ["node", "main.js", ...args];
    require("../main.js");
  };

  test("CLI prints single day weather for default arguments", () => {
    runMain([]);
    // Default: Munich, C, 1
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Weather in Munich today:"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("°C"));
  });

  test("CLI prints multi-day forecast and summary when --days > 1", () => {
    runMain(["--days", "3"]);
    // Default city Munich, unit C
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Forecast for Munich:"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Day 1:"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Day 2:"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Day 3:"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Summary: Min:"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Max:"));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Avg:"));
  });

  test("CLI respects --unit flag for both weather and forecast", () => {
    // Test single day Fahrenheit
    runMain(["--unit", "F"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("°F"));
    
    logSpy.mockClear();
    jest.resetModules();

    // Test multi-day Fahrenheit
    runMain(["--unit", "F", "--days", "3"]);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("°F"));
  });

  test("CLI prints error message for unknown city", () => {
    runMain(["UnknownCity"]);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Unknown city: UnknownCity"));
  });
});
