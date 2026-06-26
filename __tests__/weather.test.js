"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("../utils");
const { getWeather } = require("../weather");
const { getForecast } = require("../forecast");

describe("utils.js", () => {
  describe("celsiusToFahrenheit", () => {
    it("should correctly convert Celsius to Fahrenheit", () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
      expect(celsiusToFahrenheit(100)).toBe(212);
      expect(celsiusToFahrenheit(-40)).toBe(-40);
      expect(celsiusToFahrenheit(20)).toBe(68);
    });

    it("should throw TypeError if input is not a number", () => {
      expect(() => celsiusToFahrenheit("20")).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(null)).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
    });
  });

  describe("summarizeTemperatures", () => {
    it("should correctly calculate min, max, and avg", () => {
      const values = [10, 20, 30];
      const result = summarizeTemperatures(values);
      expect(result).toEqual({
        min: 10,
        max: 30,
        avg: 20,
      });
    });

    it("should handle floating point numbers and round average", () => {
      const values = [10.1, 20.2, 30.3];
      const result = summarizeTemperatures(values);
      expect(result.min).toBe(10.1);
      expect(result.max).toBe(30.3);
      expect(result.avg).toBe(20.2);
    });
  });
});

describe("weather.js", () => {
  describe("getWeather", () => {
    it("should return weather in Celsius by default", () => {
      const result = getWeather("Munich");
      expect(result).toEqual({
        city: "Munich",
        temperature: 18,
        condition: "Partly Cloudy",
        unit: "C",
      });
    });

    it("should return weather in Fahrenheit when requested", () => {
      const result = getWeather("Munich", "F");
      expect(result.unit).toBe("F");
      expect(result.temperature).toBe(64.4); // (18 * 9/5) + 32 = 64.4
    });

    it("should throw an error for unknown cities", () => {
      expect(() => getWeather("London")).toThrow("Unknown city: London");
    });
  });
});

describe("forecast.js", () => {
  describe("getForecast", () => {
    it("should return a 3-day forecast for a valid city in Celsius", () => {
      const result = getForecast("Munich", "C");
      expect(result.city).toBe("Munich");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0]).toEqual({ day: 1, temperature: 18, condition: "Partly Cloudy" });
      expect(result.summary).toEqual({
        min: 17,
        max: 20,
        avg: 18.3, // (18+20+17)/3 = 18.333...
      });
    });

    it("should return a 3-day forecast in Fahrenheit", () => {
      const result = getForecast("Munich", "F");
      expect(result.unit).toBe("F");
      // Munich C: [18, 20, 17] -> F: [64.4, 68, 62.6]
      expect(result.days[0].temperature).toBe(64.4);
      expect(result.days[1].temperature).toBe(68);
      expect(result.days[2].temperature).toBe(62.6);
      
      // Summary for [64.4, 68, 62.6]
      // min: 62.6, max: 68, avg: (64.4+68+62.6)/3 = 195/3 = 65
      expect(result.summary).toEqual({
        min: 62.6,
        max: 68,
        avg: 65,
      });
    });

    it("should throw an error for unknown cities", () => {
      expect(() => getForecast("London")).toThrow("Unknown city: London");
    });
  });
});
