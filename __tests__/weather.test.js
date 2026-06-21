"use strict";

const { getWeather } = require("../weather");

describe("getWeather", () => {
  describe("default unit (Celsius)", () => {
    test("returns weather for Munich with default unit", () => {
      const result = getWeather("Munich");
      expect(result.city).toBe("Munich");
      expect(result.temperature).toBe(18);
      expect(result.condition).toBe("Partly Cloudy");
      expect(result.unit).toBe("C");
    });

    test("returns weather for Berlin with default unit", () => {
      const result = getWeather("Berlin");
      expect(result.city).toBe("Berlin");
      expect(result.temperature).toBe(22);
      expect(result.condition).toBe("Sunny");
      expect(result.unit).toBe("C");
    });

    test("returns weather for Hamburg with default unit", () => {
      const result = getWeather("Hamburg");
      expect(result.city).toBe("Hamburg");
      expect(result.temperature).toBe(15);
      expect(result.condition).toBe("Rainy");
      expect(result.unit).toBe("C");
    });
  });

  describe("Fahrenheit conversion", () => {
    test("returns Munich weather in Fahrenheit", () => {
      const result = getWeather("Munich", "F");
      expect(result.city).toBe("Munich");
      expect(result.temperature).toBe(64.4);
      expect(result.condition).toBe("Partly Cloudy");
      expect(result.unit).toBe("F");
    });

    test("returns Berlin weather in Fahrenheit", () => {
      const result = getWeather("Berlin", "F");
      expect(result.city).toBe("Berlin");
      expect(result.temperature).toBe(71.6);
      expect(result.condition).toBe("Sunny");
      expect(result.unit).toBe("F");
    });

    test("returns Hamburg weather in Fahrenheit", () => {
      const result = getWeather("Hamburg", "F");
      expect(result.city).toBe("Hamburg");
      expect(result.temperature).toBe(59);
      expect(result.condition).toBe("Rainy");
      expect(result.unit).toBe("F");
    });
  });

  describe("unknown city throw", () => {
    test("throws Error for unknown city", () => {
      expect(() => getWeather("UnknownCity")).toThrow(Error);
      expect(() => getWeather("UnknownCity")).toThrow("Unknown city: UnknownCity");
    });

    test("throws Error for non-existent city", () => {
      expect(() => getWeather("Paris")).toThrow("Unknown city: Paris");
    });

    test("throws Error for unknown city with Fahrenheit unit", () => {
      expect(() => getWeather("UnknownCity", "F")).toThrow("Unknown city: UnknownCity");
    });
  });
});
