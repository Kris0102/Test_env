"use strict";

const { getWeather } = require("../weather");
const { getForecast } = require("../forecast");

describe("main.js CLI", () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let originalArgv;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    originalArgv = process.argv;
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    process.argv = originalArgv;
    jest.resetModules();
  });

  const runMain = () => {
    // We require main.js inside the test to trigger its execution
    require("../main.js");
  };

  test("CLI defaults to Munich, C, 1 when no args provided", () => {
    process.argv = ["node", "main.js"];
    
    // Mock getWeather to return a predictable value
    const weatherMock = jest.spyOn(require("../weather"), "getWeather").mockReturnValue({
      city: "Munich",
      temperature: "10",
      unit: "C",
      condition: "Sunny"
    });

    runMain();

    expect(weatherMock).toHaveBeenCalledWith("Munich", "C");
    expect(consoleLogSpy).toHaveBeenCalledWith("Today in Munich: 10°C, Sunny");
    weatherMock.mockRestore();
  });

  test("CLI prints single-day 'Today' line when --days is 1", () => {
    process.argv = ["node", "main.js", "Berlin", "--unit", "F", "--days", "1"];
    
    const weatherMock = jest.spyOn(require("../weather"), "getWeather").mockReturnValue({
      city: "Berlin",
      temperature: "50",
      unit: "F",
      condition: "Cloudy"
    });

    runMain();

    expect(weatherMock).toHaveBeenCalledWith("Berlin", "F");
    expect(consoleLogSpy).toHaveBeenCalledWith("Today in Berlin: 50°F, Cloudy");
    weatherMock.mockRestore();
  });

  test("CLI prints multi-day forecast and summary when --days > 1", () => {
    process.argv = ["node", "main.js", "Hamburg", "--unit", "C", "--days", "3"];
    
    const forecastMock = jest.spyOn(require("../forecast"), "getForecast").mockReturnValue({
      city: "Hamburg",
      unit: "C",
      days: [
        { day: 1, temperature: "12", condition: "Rain" },
        { day: 2, temperature: "15", condition: "Cloudy" },
        { day: 3, temperature: "10", condition: "Sunny" },
      ],
      summary: { min: "10", max: "15", avg: "12" }
    });

    runMain();

    expect(forecastMock).toHaveBeenCalledWith("Hamburg", "C");
    expect(consoleLogSpy).toHaveBeenCalledWith("Forecast for Hamburg (C):");
    expect(consoleLogSpy).toHaveBeenCalledWith("Day 1: 12°C, Rain");
    expect(consoleLogSpy).toHaveBeenCalledWith("Day 2: 15°C, Cloudy");
    expect(consoleLogSpy).toHaveBeenCalledWith("Day 3: 10°C, Sunny");
    expect(consoleLogSpy).toHaveBeenCalledWith("Summary: Min 10°C, Max 15°C, Avg 12°C");
    forecastMock.mockRestore();
  });

  test("CLI prints error message on failure", () => {
    process.argv = ["node", "main.js", "UnknownCity"];
    
    const weatherMock = jest.spyOn(require("../weather"), "getWeather").mockImplementation(() => {
      throw new Error("Unknown city: UnknownCity");
    });

    runMain();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Unknown city: UnknownCity");
    weatherMock.mockRestore();
  });
});
