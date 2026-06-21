"use strict";

const { getWeather } = require("../weather");

describe("getWeather", () => {
  describe("Celsius unit", () => {
    test("returns correct weather for Munich in Celsius", () => {
      const result = getWeather("Munich", "C");
      expect(result.city).toBe("Munich");
      expect(result.temperature).toBe(18);
      expect(result.condition).toBe("Partly Cloudy");
      expect(result.unit).toBe("C");
    });

    test("returns correct weather for Berlin in Celsius", () => {
      const result = getWeather("Berlin", "C");
      expect(result.city).toBe("Berlin");
      expect(result.temperature).toBe(22);
      expect(result.condition).toBe("Sunny");
      expect(result.unit).toBe("C");
    });

    test("returns correct weather for Hamburg in Celsius", () => {
      const result = getWeather("Hamburg", "C");
      expect(result.city).toBe("Hamburg");
      expect(result.temperature).toBe(15);
      expect(result.condition).toBe("Rainy");
      expect(result.unit).toBe("C");
    });
  });

  describe("Fahrenheit unit", () => {
    test("returns correct weather for Munich in Fahrenheit", () => {
      const result = getWeather("Munich", "F");
      expect(result.city).toBe("Munich");
      expect(result.temperature).toBe(64.4);
      expect(result.condition).toBe("Partly Cloudy");
      expect(result.unit).toBe("F");
    });

    test("returns correct weather for Berlin in Fahrenheit", () => {
      const result = getWeather("Berlin", "F");
      expect(result.city).toBe("Berlin");
      expect(result.temperature).toBe(71.6);
      expect(result.condition).toBe("Sunny");
      expect(result.unit).toBe("F");
    });

    test("returns correct weather for Hamburg in Fahrenheit", () => {
      const result = getWeather("Hamburg", "F");
      expect(result.city).toBe("Hamburg");
      expect(result.temperature).toBe(59);
      expect(result.condition).toBe("Rainy");
      expect(result.unit).toBe("F");
    });
  });

  describe("default unit", () => {
    test("defaults to Celsius when unit not specified", () => {
      const result = getWeather("Munich");
      expect(result.unit).toBe("C");
      expect(result.temperature).toBe(18);
    });
  });

  describe("unknown city error", () => {
    test("throws Error for unknown city", () => {
      expect(() => getWeather("Paris")).toThrow(Error);
      expect(() => getWeather("Paris")).toThrow("Unknown city: Paris");
    });

    test("throws Error for unknown city with F unit", () => {
      expect(() => getWeather("London", "F")).toThrow(Error);
      expect(() => getWeather("London", "F")).toThrow("Unknown city: London");
    });

    test("throws Error for unknown city with C unit", () => {
      expect(() => getWeather("Tokyo", "C")).toThrow(Error);
      expect(() => getWeather("Tokyo", "C")).toThrow("Unknown city: Tokyo");
    });

    test("throws Error for empty string city", () => {
      expect(() => getWeather("")).toThrow(Error);
      expect(() => getWeather("")).toThrow("Unknown city: ");
    });
  });
});
