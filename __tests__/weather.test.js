"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require("../utils");
const { getForecast } = require("../forecast");

describe("utils.js", () => {
  describe("celsiusToFahrenheit", () => {
    test("should correctly convert Celsius to Fahrenheit", () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
      expect(celsiusToFahrenheit(100)).toBe(212);
      expect(celsiusToFahrenheit(-40)).toBe(-40);
      expect(celsiusToFahrenheit(20)).toBe(68);
    });

    test("should throw TypeError for non-number inputs", () => {
      expect(() => celsiusToFahrenheit("20")).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(null)).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
      expect(() => celsiusToFahrenheit({})).toThrow(TypeError);
    });
  });

  describe("summarizeTemperatures", () => {
    test("should calculate min, max, and rounded average", () => {
      const values = [10, 20, 30];
      const result = summarizeTemperatures(values);
      expect(result).toEqual({
        min: 10,
        max: 30,
        avg: 20,
      });
    });

    test("should round average to one decimal place", () => {
      const values = [10, 11, 12, 13]; // sum 46, avg 11.5
      const result = summarizeTemperatures(values);
      expect(result.avg).toBe(11.5);

      const values2 = [10, 10, 11]; // sum 31, avg 10.333...
      const result2 = summarizeTemperatures(values2);
      expect(result2.avg).toBe(10.3);
    });
  });
});

describe("forecast.js", () => {
  describe("getForecast", () => {
    test("should return correct forecast structure for a known city (Celsius)", () => {
      const result = getForecast("Munich", "C");
      expect(result).toHaveProperty("city", "Munich");
      expect(result).toHaveProperty("unit", "C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0]).toEqual({
        day: 1,
        temperature: 18,
        condition: "Partly Cloudy",
      });
      expect(result.summary).toEqual({
        min: 17,
        max: 20,
        avg: 18.3,
      });
    });

    test("should return correct forecast structure for a known city (Fahrenheit)", () => {
      const result = getForecast("Munich", "F");
      expect(result).toHaveProperty("city", "Munich");
      expect(result).toHaveProperty("unit", "F");
      
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

    test("should throw 'Unknown city' error for unsupported cities", () => {
      expect(() => getForecast("London")).toThrow("Unknown city: London");
    });
  });
});
