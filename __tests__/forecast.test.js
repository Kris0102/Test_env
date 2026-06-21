"use strict";

const { getForecast } = require("../forecast");

describe("getForecast", () => {
  describe("happy-path for all three cities", () => {
    test("returns forecast for Munich", () => {
      const result = getForecast("Munich");
      expect(result.city).toBe("Munich");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0].day).toBe("Day 1");
      expect(result.days[0].temperature).toBe(18);
      expect(result.days[0].condition).toBe("Partly Cloudy");
      expect(result.days[1].temperature).toBe(19);
      expect(result.days[2].temperature).toBe(17);
      expect(result.summary).toBeDefined();
      expect(result.summary.min).toBe(17);
      expect(result.summary.max).toBe(19);
      expect(result.summary.avg).toBe(18);
    });

    test("returns forecast for Berlin", () => {
      const result = getForecast("Berlin");
      expect(result.city).toBe("Berlin");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0].temperature).toBe(22);
      expect(result.days[0].condition).toBe("Sunny");
      expect(result.days[1].temperature).toBe(23);
      expect(result.days[2].temperature).toBe(21);
      expect(result.summary.min).toBe(21);
      expect(result.summary.max).toBe(23);
      expect(result.summary.avg).toBe(22);
    });

    test("returns forecast for Hamburg", () => {
      const result = getForecast("Hamburg");
      expect(result.city).toBe("Hamburg");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0].temperature).toBe(15);
      expect(result.days[0].condition).toBe("Rainy");
      expect(result.days[1].temperature).toBe(16);
      expect(result.days[2].temperature).toBe(14);
      expect(result.summary.min).toBe(14);
      expect(result.summary.max).toBe(16);
      expect(result.summary.avg).toBe(15);
    });
  });

  describe("unknown city throw", () => {
    test("throws Error for unknown city", () => {
      expect(() => getForecast("UnknownCity")).toThrow(Error);
      expect(() => getForecast("UnknownCity")).toThrow("Unknown city: UnknownCity");
    });

    test("throws Error for non-existent city", () => {
      expect(() => getForecast("Paris")).toThrow("Unknown city: Paris");
    });
  });

  describe("Fahrenheit conversion", () => {
    test("converts Munich temperatures to Fahrenheit", () => {
      const result = getForecast("Munich", "F");
      expect(result.city).toBe("Munich");
      expect(result.unit).toBe("F");
      expect(result.days).toHaveLength(3);
      // 18°C = 64.4°F, 19°C = 66.2°F, 17°C = 62.6°F
      expect(result.days[0].temperature).toBe(64.4);
      expect(result.days[1].temperature).toBe(66.2);
      expect(result.days[2].temperature).toBe(62.6);
      expect(result.summary.min).toBe(62.6);
      expect(result.summary.max).toBe(66.2);
      expect(result.summary.avg).toBe(64.4);
    });

    test("converts Berlin temperatures to Fahrenheit", () => {
      const result = getForecast("Berlin", "F");
      expect(result.unit).toBe("F");
      // 22°C = 71.6°F, 23°C = 73.4°F, 21°C = 69.8°F
      expect(result.days[0].temperature).toBe(71.6);
      expect(result.days[1].temperature).toBe(73.4);
      expect(result.days[2].temperature).toBe(69.8);
      expect(result.summary.min).toBe(69.8);
      expect(result.summary.max).toBe(73.4);
      expect(result.summary.avg).toBe(71.6);
    });

    test("converts Hamburg temperatures to Fahrenheit", () => {
      const result = getForecast("Hamburg", "F");
      expect(result.unit).toBe("F");
      // 15°C = 59°F, 16°C = 60.8°F, 14°C = 57.2°F
      expect(result.days[0].temperature).toBe(59);
      expect(result.days[1].temperature).toBe(60.8);
      expect(result.days[2].temperature).toBe(57.2);
      expect(result.summary.min).toBe(57.2);
      expect(result.summary.max).toBe(60.8);
      expect(result.summary.avg).toBe(59);
    });
  });
});
