"use strict";

const { getWeather } = require("../weather");
const { celsiusToFahrenheit, formatTemperature } = require("../utils");

describe("getWeather", () => {
  describe("default unit (Celsius)", () => {
    it("returns weather for Munich in Celsius", () => {
      const result = getWeather("Munich");
      expect(result.city).toBe("Munich");
      expect(result.unit).toBe("C");
      expect(result.temperature).toBe(18);
      expect(result.condition).toBe("Partly Cloudy");
    });

    it("returns weather for Berlin in Celsius", () => {
      const result = getWeather("Berlin");
      expect(result.city).toBe("Berlin");
      expect(result.unit).toBe("C");
      expect(result.temperature).toBe(22);
      expect(result.condition).toBe("Sunny");
    });

    it("returns weather for Hamburg in Celsius", () => {
      const result = getWeather("Hamburg");
      expect(result.city).toBe("Hamburg");
      expect(result.unit).toBe("C");
      expect(result.temperature).toBe(15);
      expect(result.condition).toBe("Rainy");
    });
  });

  describe("explicit Celsius unit", () => {
    it("returns weather for Munich with unit='C'", () => {
      const result = getWeather("Munich", "C");
      expect(result.unit).toBe("C");
      expect(result.temperature).toBe(18);
    });

    it("returns weather for Berlin with unit='C'", () => {
      const result = getWeather("Berlin", "C");
      expect(result.unit).toBe("C");
      expect(result.temperature).toBe(22);
    });

    it("returns weather for Hamburg with unit='C'", () => {
      const result = getWeather("Hamburg", "C");
      expect(result.unit).toBe("C");
      expect(result.temperature).toBe(15);
    });
  });

  describe("Fahrenheit conversion", () => {
    it("converts Munich temperature to Fahrenheit", () => {
      const result = getWeather("Munich", "F");
      expect(result.unit).toBe("F");
      const expectedTemp = celsiusToFahrenheit(18);
      expect(result.temperature).toBe(formatTemperature(expectedTemp, "F"));
    });

    it("converts Berlin temperature to Fahrenheit", () => {
      const result = getWeather("Berlin", "F");
      expect(result.unit).toBe("F");
      const expectedTemp = celsiusToFahrenheit(22);
      expect(result.temperature).toBe(formatTemperature(expectedTemp, "F"));
    });

    it("converts Hamburg temperature to Fahrenheit", () => {
      const result = getWeather("Hamburg", "F");
      expect(result.unit).toBe("F");
      const expectedTemp = celsiusToFahrenheit(15);
      expect(result.temperature).toBe(formatTemperature(expectedTemp, "F"));
    });

    it("correctly calculates Fahrenheit values", () => {
      const munichResult = getWeather("Munich", "F");
      expect(munichResult.temperature).toBe(64.4);

      const berlinResult = getWeather("Berlin", "F");
      expect(berlinResult.temperature).toBe(71.6);

      const hamburgResult = getWeather("Hamburg", "F");
      expect(hamburgResult.temperature).toBe(59);
    });
  });

  describe("unknown city error", () => {
    it("throws Error for unknown city", () => {
      expect(() => getWeather("Paris")).toThrow(Error);
      expect(() => getWeather("Paris")).toThrow("Unknown city: Paris");
    });

    it("throws Error for empty string city", () => {
      expect(() => getWeather("")).toThrow(Error);
      expect(() => getWeather("")).toThrow("Unknown city: ");
    });

    it("throws Error for random string", () => {
      expect(() => getWeather("RandomCity123")).toThrow("Unknown city: RandomCity123");
    });
  });
});
