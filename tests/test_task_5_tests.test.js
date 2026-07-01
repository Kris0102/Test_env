"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("../utils");
const { getForecast } = require("../forecast");
const { getWeather } = require("../weather");

describe("utils.js", () => {
  describe("celsiusToFahrenheit", () => {
    test("should correctly convert Celsius to Fahrenheit", () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
      expect(celsiusToFahrenheit(100)).toBe(212);
      expect(celsiusToFahrenheit(-40)).toBe(-40);
      expect(celsiusToFahrenheit(20)).toBe(68);
    });

    test("should throw TypeError when input is not a number", () => {
      expect(() => celsiusToFahrenheit("20")).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(null)).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
      expect(() => celsiusToFahrenheit({})).toThrow(TypeError);
    });
  });

  describe("summarizeTemperatures", () => {
    test("should return correct min, max, and rounded avg", () => {
      const values = [10, 20, 30];
      const result = summarizeTemperatures(values);
      expect(result).toEqual({
        min: 10,
        max: 30,
        avg: "20.0",
      });
    });

    test("should handle floating point values and round avg", () => {
      const values = [10.5, 20.2, 30.8];
      const result = summarizeTemperatures(values);
      // (10.5 + 20.2 + 30.8) / 3 = 61.5 / 3 = 20.5
      expect(result.avg).toBe("20.5");
    });
  });
});

describe("forecast.js", () => {
  describe("getForecast", () => {
    test("should return forecast in Celsius (happy path)", () => {
      const result = getForecast("Munich", "C");
      expect(result.city).toBe("Munich");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0]).toHaveProperty("day", 1);
      expect(result.days[0]).toHaveProperty("temperature");
      expect(result.days[0]).toHaveProperty("condition");
      expect(result.summary).toHaveProperty("min");
      expect(result.summary).toHaveProperty("max");
      expect(result.summary).toHaveProperty("avg");
    });

    test("should return forecast in Fahrenheit and convert temperatures", () => {
      const result = getForecast("Munich", "F");
      expect(result.unit).toBe("F");
      // Munich C: [18, 20, 17] -> F: [64.4, 68.0, 62.6]
      expect(result.days[0].temperature).toBe("64.4");
      expect(result.days[1].temperature).toBe("68.0");
      expect(result.days[2].temperature).toBe("62.6");
      expect(result.summary.min).toBe(62.6);
      expect(result.summary.max).toBe(68.0);
    });

    test("should throw 'Unknown city: <city>' for unknown cities", () => {
      expect(() => getForecast("London")).toThrow("Unknown city: London");
    });
  });
});

describe("weather.js", () => {
  describe("getWeather", () => {
    test("should return weather in Fahrenheit when requested", () => {
      const result = getWeather("Berlin", "F");
      expect(result.unit).toBe("F");
      // Berlin C: 22 -> F: (22 * 9/5) + 32 = 39.6 + 32 = 71.6
      expect(result.temperature).toBe("71.6");
    });

    test("should throw 'Unknown city: <city>' for unknown cities", () => {
      expect(() => getWeather("Paris")).toThrow("Unknown city: Paris");
    });
  });
});
