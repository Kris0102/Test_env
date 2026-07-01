"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("../utils");
const { getWeather } = require("../weather");
const { getForecast } = require("../forecast");

describe("utils.js", () => {
  describe("celsiusToFahrenheit", () => {
    test("should correctly convert Celsius to Fahrenheit", () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
      expect(celsiusToFahrenheit(100)).toBe(212);
      expect(celsiusToFahrenheit(-40)).toBe(-40);
      expect(celsiusToFahrenheit(20)).toBe(68);
    });

    test("should throw TypeError if input is not a number", () => {
      expect(() => celsiusToFahrenheit("20")).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(null)).toThrow("Temperature must be a number");
      expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
    });
  });

  describe("summarizeTemperatures", () => {
    test("should calculate min, max, and rounded average", () => {
      const values = [10, 20, 30];
      const result = summarizeTemperatures(values);
      expect(result).toEqual({
        min: 10,
        max: 30,
        avg: "20.0",
      });
    });

    test("should handle floating point numbers and round average", () => {
      const values = [10.1, 20.2, 30.3];
      const result = summarizeTemperatures(values);
      expect(result.min).toBe(10.1);
      expect(result.max).toBe(30.3);
      expect(result.avg).toBe("20.2");
    });
  });
});

describe("weather.js", () => {
  test("should return weather in Celsius by default", () => {
    const result = getWeather("Munich");
    expect(result).toEqual({
      city: "Munich",
      temperature: "18.0",
      condition: "Partly Cloudy",
      unit: "C",
    });
  });

  test("should return weather in Fahrenheit when requested", () => {
    const result = getWeather("Munich", "F");
    expect(result).toEqual({
      city: "Munich",
      temperature: "64.4",
      condition: "Partly Cloudy",
      unit: "F",
    });
  });

  test("should throw error for unknown city", () => {
    expect(() => getWeather("London")).toThrow("Unknown city: London");
  });
});

describe("forecast.js", () => {
  test("should return a 3-day forecast in Celsius", () => {
    const result = getForecast("Berlin", "C");
    expect(result.city).toBe("Berlin");
    expect(result.unit).toBe("C");
    expect(result.days).toHaveLength(3);
    expect(result.days[0]).toEqual({
      day: 1,
      temperature: "22.0",
      condition: "Sunny",
    });
    expect(result.summary).toEqual({
      min: 21,
      max: 24,
      avg: "22.3",
    });
  });

  test("should return a 3-day forecast in Fahrenheit", () => {
    const result = getForecast("Berlin", "F");
    expect(result.unit).toBe("F");
    // Berlin C: [22, 24, 21] -> F: [71.6, 75.2, 69.8]
    expect(result.days[0].temperature).toBe("71.6");
    expect(result.days[1].temperature).toBe("75.2");
    expect(result.days[2].temperature).toBe("69.8");
    expect(result.summary).toEqual({
      min: 69.8,
      max: 75.2,
      avg: "72.2",
    });
  });

  test("should throw error for unknown city", () => {
    expect(() => getForecast("London")).toThrow("Unknown city: London");
  });
});
