"use strict";

const { getForecast, FORECAST_DB } = require("../forecast");
const { celsiusToFahrenheit } = require("../utils");

describe("getForecast", () => {
  describe("happy-path for all cities", () => {
    it("returns forecast for Munich", () => {
      const result = getForecast("Munich");
      expect(result.city).toBe("Munich");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0].day).toBe("Day 1");
      expect(result.days[0].temperature).toBe(18);
      expect(result.days[0].condition).toBe("Partly Cloudy");
      expect(result.days[1].temperature).toBe(19);
      expect(result.days[2].temperature).toBe(17);
    });

    it("returns forecast for Berlin", () => {
      const result = getForecast("Berlin");
      expect(result.city).toBe("Berlin");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0].temperature).toBe(22);
      expect(result.days[1].temperature).toBe(23);
      expect(result.days[2].temperature).toBe(21);
    });

    it("returns forecast for Hamburg", () => {
      const result = getForecast("Hamburg");
      expect(result.city).toBe("Hamburg");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0].temperature).toBe(15);
      expect(result.days[1].temperature).toBe(16);
      expect(result.days[2].temperature).toBe(14);
    });
  });

  describe("summary calculation", () => {
    it("calculates correct summary for Munich", () => {
      const result = getForecast("Munich");
      expect(result.summary.min).toBe(17);
      expect(result.summary.max).toBe(19);
      expect(result.summary.avg).toBe(18);
    });

    it("calculates correct summary for Berlin", () => {
      const result = getForecast("Berlin");
      expect(result.summary.min).toBe(21);
      expect(result.summary.max).toBe(23);
      expect(result.summary.avg).toBe(22);
    });

    it("calculates correct summary for Hamburg", () => {
      const result = getForecast("Hamburg");
      expect(result.summary.min).toBe(14);
      expect(result.summary.max).toBe(16);
      expect(result.summary.avg).toBe(15);
    });
  });

  describe("Fahrenheit conversion", () => {
    it("converts Munich temperatures to Fahrenheit", () => {
      const result = getForecast("Munich", "F");
      expect(result.unit).toBe("F");
      expect(result.days[0].temperature).toBe(celsiusToFahrenheit(18));
      expect(result.days[1].temperature).toBe(celsiusToFahrenheit(19));
      expect(result.days[2].temperature).toBe(celsiusToFahrenheit(17));
    });

    it("converts Berlin temperatures to Fahrenheit", () => {
      const result = getForecast("Berlin", "F");
      expect(result.unit).toBe("F");
      expect(result.days[0].temperature).toBe(celsiusToFahrenheit(22));
      expect(result.days[1].temperature).toBe(celsiusToFahrenheit(23));
      expect(result.days[2].temperature).toBe(celsiusToFahrenheit(21));
    });

    it("converts Hamburg temperatures to Fahrenheit", () => {
      const result = getForecast("Hamburg", "F");
      expect(result.unit).toBe("F");
      expect(result.days[0].temperature).toBe(celsiusToFahrenheit(15));
      expect(result.days[1].temperature).toBe(celsiusToFahrenheit(16));
      expect(result.days[2].temperature).toBe(celsiusToFahrenheit(14));
    });

    it("calculates correct summary in Fahrenheit", () => {
      const result = getForecast("Munich", "F");
      const expectedMin = celsiusToFahrenheit(17);
      const expectedMax = celsiusToFahrenheit(19);
      const expectedAvg = celsiusToFahrenheit(18);
      expect(result.summary.min).toBe(expectedMin);
      expect(result.summary.max).toBe(expectedMax);
      expect(result.summary.avg).toBe(expectedAvg);
    });
  });

  describe("unknown city error", () => {
    it("throws Error for unknown city", () => {
      expect(() => getForecast("Paris")).toThrow(Error);
      expect(() => getForecast("Paris")).toThrow("Unknown city: Paris");
    });

    it("throws Error for empty string city", () => {
      expect(() => getForecast("")).toThrow(Error);
      expect(() => getForecast("")).toThrow("Unknown city: ");
    });

    it("throws Error for random string", () => {
      expect(() => getForecast("RandomCity123")).toThrow("Unknown city: RandomCity123");
    });
  });
});
