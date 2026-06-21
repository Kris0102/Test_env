"use strict";

const { celsiusToFahrenheit, summarizeTemperatures, formatTemperature } = require("../utils");

describe("celsiusToFahrenheit", () => {
  describe("valid number inputs", () => {
    it("converts 0°C to 32°F", () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    it("converts 18°C to 64.4°F", () => {
      expect(celsiusToFahrenheit(18)).toBe(64.4);
    });

    it("converts 22°C to 71.6°F", () => {
      expect(celsiusToFahrenheit(22)).toBe(71.6);
    });
  });

  describe("invalid inputs", () => {
    it("throws TypeError for string input", () => {
      expect(() => celsiusToFahrenheit("invalid")).toThrow(TypeError);
    });

    it("throws TypeError for null input", () => {
      expect(() => celsiusToFahrenheit(null)).toThrow(TypeError);
    });

    it("throws TypeError for undefined input", () => {
      expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
    });
  });
});

describe("summarizeTemperatures", () => {
  it("calculates min, max, and avg for [10, 20, 30]", () => {
    const result = summarizeTemperatures([10, 20, 30]);
    expect(result.min).toBe(10);
    expect(result.max).toBe(30);
    expect(result.avg).toBe(20);
  });

  it("handles single value array", () => {
    const result = summarizeTemperatures([25]);
    expect(result.min).toBe(25);
    expect(result.max).toBe(25);
    expect(result.avg).toBe(25);
  });

  it("handles negative temperatures", () => {
    const result = summarizeTemperatures([-10, 0, 10]);
    expect(result.min).toBe(-10);
    expect(result.max).toBe(10);
    expect(result.avg).toBe(0);
  });

  it("rounds avg to one decimal place", () => {
    const result = summarizeTemperatures([10, 20, 21]);
    expect(result.avg).toBe(17);
  });
});

describe("formatTemperature", () => {
  it("rounds to one decimal place", () => {
    expect(formatTemperature(25.123, "C")).toBe(25.1);
  });

  it("handles whole numbers", () => {
    expect(formatTemperature(25, "C")).toBe(25);
  });

  it("throws TypeError for non-number input", () => {
    expect(() => formatTemperature("invalid", "C")).toThrow(TypeError);
  });
});
