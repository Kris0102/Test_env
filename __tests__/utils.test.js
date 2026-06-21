"use strict";

const { celsiusToFahrenheit, summarizeTemperatures, formatTemperature } = require("../utils");

describe("celsiusToFahrenheit", () => {
  it("converts 0°C to 32°F", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
  });

  it("converts 18°C to 64.4°F", () => {
    expect(celsiusToFahrenheit(18)).toBe(64.4);
  });

  it("converts -10°C to 14°F", () => {
    expect(celsiusToFahrenheit(-10)).toBe(14);
  });

  it("converts 100°C to 212°F", () => {
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it("throws TypeError on non-number input (string)", () => {
    expect(() => celsiusToFahrenheit("18")).toThrow(TypeError);
    expect(() => celsiusToFahrenheit("18")).toThrow("Expected number, got string");
  });

  it("throws TypeError on non-number input (null)", () => {
    expect(() => celsiusToFahrenheit(null)).toThrow(TypeError);
    expect(() => celsiusToFahrenheit(null)).toThrow("Expected number, got object");
  });

  it("throws TypeError on non-number input (undefined)", () => {
    expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
    expect(() => celsiusToFahrenheit(undefined)).toThrow("Expected number, got undefined");
  });

  it("throws TypeError on non-number input (object)", () => {
    expect(() => celsiusToFahrenheit({})).toThrow(TypeError);
  });
});

describe("summarizeTemperatures", () => {
  it("calculates min, max, avg for positive values", () => {
    const result = summarizeTemperatures([10, 20, 30]);
    expect(result.min).toBe(10);
    expect(result.max).toBe(30);
    expect(result.avg).toBe(20);
  });

  it("calculates min, max, avg for mixed values", () => {
    const result = summarizeTemperatures([-10, 0, 10]);
    expect(result.min).toBe(-10);
    expect(result.max).toBe(10);
    expect(result.avg).toBe(0);
  });

  it("rounds avg to one decimal place", () => {
    const result = summarizeTemperatures([10, 11, 12]);
    expect(result.avg).toBe(11);
  });

  it("handles single value array", () => {
    const result = summarizeTemperatures([18]);
    expect(result.min).toBe(18);
    expect(result.max).toBe(18);
    expect(result.avg).toBe(18);
  });

  it("handles decimal values correctly", () => {
    const result = summarizeTemperatures([18.5, 19.5, 20.5]);
    expect(result.min).toBe(18.5);
    expect(result.max).toBe(20.5);
    expect(result.avg).toBe(19.5);
  });
});

describe("formatTemperature", () => {
  it("rounds to one decimal place", () => {
    expect(formatTemperature(18.123, "C")).toBe(18.1);
    expect(formatTemperature(18.178, "C")).toBe(18.2);
  });

  it("throws TypeError on non-number input", () => {
    expect(() => formatTemperature("18", "C")).toThrow(TypeError);
  });
});
