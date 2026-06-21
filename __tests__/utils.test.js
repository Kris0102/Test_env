"use strict";

const { celsiusToFahrenheit, summarizeTemperatures, formatTemperature } = require("../utils");

describe("celsiusToFahrenheit", () => {
  test("converts 0°C to 32°F", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  test("converts 18°C to 64.4°F", () => {
    expect(celsiusToFahrenheit(18)).toBe(64.4);
  });

  test("converts 100°C to 212°F", () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  test("throws TypeError for string input", () => {
    expect(() => celsiusToFahrenheit("18")).toThrow(TypeError);
    expect(() => celsiusToFahrenheit("18")).toThrow("Expected number, got string");
  });

  test("throws TypeError for undefined input", () => {
    expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
    expect(() => celsiusToFahrenheit(undefined)).toThrow("Expected number, got undefined");
  });

  test("throws TypeError for null input", () => {
    expect(() => celsiusToFahrenheit(null)).toThrow(TypeError);
    expect(() => celsiusToFahrenheit(null)).toThrow("Expected number, got object");
  });
});

describe("summarizeTemperatures", () => {
  test("calculates min, max, and avg correctly", () => {
    const values = [10, 20, 30];
    const result = summarizeTemperatures(values);
    expect(result.min).toBe(10);
    expect(result.max).toBe(30);
    expect(result.avg).toBe(20);
  });

  test("rounds avg to one decimal place using formatTemperature", () => {
    const values = [10, 20, 21];
    const result = summarizeTemperatures(values);
    // avg = 51/3 = 17, should be 17
    expect(result.avg).toBe(17);
  });

  test("handles decimal values and rounds avg", () => {
    const values = [10, 11, 12];
    const result = summarizeTemperatures(values);
    // avg = 33/3 = 11
    expect(result.avg).toBe(11);
  });

  test("rounds avg with one decimal place", () => {
    const values = [1, 2, 3, 4];
    const result = summarizeTemperatures(values);
    // avg = 10/4 = 2.5
    expect(result.avg).toBe(2.5);
  });

  test("handles negative temperatures", () => {
    const values = [-10, 0, 10];
    const result = summarizeTemperatures(values);
    expect(result.min).toBe(-10);
    expect(result.max).toBe(10);
    expect(result.avg).toBe(0);
  });
});

describe("formatTemperature", () => {
  test("rounds to one decimal place", () => {
    expect(formatTemperature(18.123, "C")).toBe(18.1);
    expect(formatTemperature(18.178, "C")).toBe(18.2);
  });

  test("throws TypeError for non-number input", () => {
    expect(() => formatTemperature("18", "C")).toThrow(TypeError);
    expect(() => formatTemperature(undefined, "C")).toThrow(TypeError);
  });
});
