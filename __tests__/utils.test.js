"use strict";

const { celsiusToFahrenheit, summarizeTemperatures, formatTemperature } = require("../utils");

describe("celsiusToFahrenheit", () => {
  test("converts 0°C to 32°F", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  test("converts 100°C to 212°F", () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  test("converts -40°C to -40°F", () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  test("converts 18°C to 64.4°F", () => {
    expect(celsiusToFahrenheit(18)).toBe(64.4);
  });

  test("throws TypeError for string input", () => {
    expect(() => celsiusToFahrenheit("18")).toThrow(TypeError);
    expect(() => celsiusToFahrenheit("18")).toThrow("Expected number, got string");
  });

  test("throws TypeError for null input", () => {
    expect(() => celsiusToFahrenheit(null)).toThrow(TypeError);
    expect(() => celsiusToFahrenheit(null)).toThrow("Expected number, got object");
  });

  test("throws TypeError for undefined input", () => {
    expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
    expect(() => celsiusToFahrenheit(undefined)).toThrow("Expected number, got undefined");
  });

  test("throws TypeError for object input", () => {
    expect(() => celsiusToFahrenheit({})).toThrow(TypeError);
  });
});

describe("summarizeTemperatures", () => {
  test("calculates min, max, avg for simple array", () => {
    const result = summarizeTemperatures([10, 20, 30]);
    expect(result.min).toBe(10);
    expect(result.max).toBe(30);
    expect(result.avg).toBe(20);
  });

  test("calculates avg rounded to 1 decimal place", () => {
    const result = summarizeTemperatures([10, 20, 21]);
    expect(result.avg).toBe(17);
  });

  test("handles negative temperatures", () => {
    const result = summarizeTemperatures([-10, 0, 10]);
    expect(result.min).toBe(-10);
    expect(result.max).toBe(10);
    expect(result.avg).toBe(0);
  });

  test("handles single value array", () => {
    const result = summarizeTemperatures([15]);
    expect(result.min).toBe(15);
    expect(result.max).toBe(15);
    expect(result.avg).toBe(15);
  });

  test("handles decimal temperatures", () => {
    const result = summarizeTemperatures([18.5, 19.5, 17.5]);
    expect(result.min).toBe(17.5);
    expect(result.max).toBe(19.5);
    expect(result.avg).toBe(18.5);
  });

  test("throws TypeError for non-array input", () => {
    expect(() => summarizeTemperatures(123)).toThrow(TypeError);
  });

  test("throws TypeError for array with non-number elements", () => {
    expect(() => summarizeTemperatures([1, 2, "3"])).toThrow(TypeError);
  });

  test("throws TypeError for empty array", () => {
    expect(() => summarizeTemperatures([])).toThrow(TypeError);
  });
});

describe("formatTemperature", () => {
  test("rounds to 1 decimal place", () => {
    expect(formatTemperature(18.123, "C")).toBe(18.1);
    expect(formatTemperature(18.15, "C")).toBe(18.2);
  });

  test("throws TypeError for non-number input", () => {
    expect(() => formatTemperature("18", "C")).toThrow(TypeError);
  });
});
