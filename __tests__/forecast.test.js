"use strict";

const { getForecast } = require("../forecast");

describe("getForecast", () => {
  describe("happy-path tests", () => {
    describe("Munich", () => {
      test("returns correct forecast in Celsius", () => {
        const result = getForecast("Munich", "C");
        expect(result.city).toBe("Munich");
        expect(result.unit).toBe("C");
        expect(result.days).toHaveLength(3);
        expect(result.days[0].day).toBe("Day 1");
        expect(result.days[0].temperature).toBe(18);
        expect(result.days[0].condition).toBe("Partly Cloudy");
        expect(result.days[1].temperature).toBe(19);
        expect(result.days[2].temperature).toBe(17);
      });

      test("returns correct summary in Celsius", () => {
        const result = getForecast("Munich", "C");
        expect(result.summary.min).toBe(17);
        expect(result.summary.max).toBe(19);
        expect(result.summary.avg).toBe(18);
      });

      test("returns correct forecast in Fahrenheit", () => {
        const result = getForecast("Munich", "F");
        expect(result.city).toBe("Munich");
        expect(result.unit).toBe("F");
        expect(result.days).toHaveLength(3);
        expect(result.days[0].temperature).toBe(64.4);
        expect(result.days[1].temperature).toBe(66.2);
        expect(result.days[2].temperature).toBe(62.6);
      });

      test("returns correct summary in Fahrenheit", () => {
        const result = getForecast("Munich", "F");
        expect(result.summary.min).toBe(62.6);
        expect(result.summary.max).toBe(66.2);
        expect(result.summary.avg).toBe(64.4);
      });
    });

    describe("Berlin", () => {
      test("returns correct forecast in Celsius", () => {
        const result = getForecast("Berlin", "C");
        expect(result.city).toBe("Berlin");
        expect(result.unit).toBe("C");
        expect(result.days).toHaveLength(3);
        expect(result.days[0].temperature).toBe(22);
        expect(result.days[1].temperature).toBe(23);
        expect(result.days[2].temperature).toBe(21);
      });

      test("returns correct summary in Celsius", () => {
        const result = getForecast("Berlin", "C");
        expect(result.summary.min).toBe(21);
        expect(result.summary.max).toBe(23);
        expect(result.summary.avg).toBe(22);
      });

      test("returns correct forecast in Fahrenheit", () => {
        const result = getForecast("Berlin", "F");
        expect(result.unit).toBe("F");
        expect(result.days[0].temperature).toBe(71.6);
        expect(result.days[1].temperature).toBe(73.4);
        expect(result.days[2].temperature).toBe(69.8);
      });

      test("returns correct summary in Fahrenheit", () => {
        const result = getForecast("Berlin", "F");
        expect(result.summary.min).toBe(69.8);
        expect(result.summary.max).toBe(73.4);
        expect(result.summary.avg).toBe(71.6);
      });
    });

    describe("Hamburg", () => {
      test("returns correct forecast in Celsius", () => {
        const result = getForecast("Hamburg", "C");
        expect(result.city).toBe("Hamburg");
        expect(result.unit).toBe("C");
        expect(result.days).toHaveLength(3);
        expect(result.days[0].temperature).toBe(15);
        expect(result.days[1].temperature).toBe(16);
        expect(result.days[2].temperature).toBe(14);
      });

      test("returns correct summary in Celsius", () => {
        const result = getForecast("Hamburg", "C");
        expect(result.summary.min).toBe(14);
        expect(result.summary.max).toBe(16);
        expect(result.summary.avg).toBe(15);
      });

      test("returns correct forecast in Fahrenheit", () => {
        const result = getForecast("Hamburg", "F");
        expect(result.unit).toBe("F");
        expect(result.days[0].temperature).toBe(59);
        expect(result.days[1].temperature).toBe(60.8);
        expect(result.days[2].temperature).toBe(57.2);
      });

      test("returns correct summary in Fahrenheit", () => {
        const result = getForecast("Hamburg", "F");
        expect(result.summary.min).toBe(57.2);
        expect(result.summary.max).toBe(60.8);
        expect(result.summary.avg).toBe(59);
      });
    });
  });

  describe("unknown city error", () => {
    test("throws Error for unknown city", () => {
      expect(() => getForecast("Paris")).toThrow(Error);
      expect(() => getForecast("Paris")).toThrow("Unknown city: Paris");
    });

    test("throws Error for unknown city with F unit", () => {
      expect(() => getForecast("London", "F")).toThrow(Error);
      expect(() => getForecast("London", "F")).toThrow("Unknown city: London");
    });

    test("throws Error for empty string city", () => {
      expect(() => getForecast("")).toThrow(Error);
      expect(() => getForecast("")).toThrow("Unknown city: ");
    });
  });

  describe("default unit", () => {
    test("defaults to Celsius when unit not specified", () => {
      const result = getForecast("Munich");
      expect(result.unit).toBe("C");
    });
  });
});
