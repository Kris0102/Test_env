"use strict";

const { compareTemperatures } = require("../utils");
const { compareCities } = require("../weather");

describe("Comparison Features", () => {
  describe("compareTemperatures", () => {
    test("should return 1 when a > b", () => {
      expect(compareTemperatures(25, 20)).toBe(1);
    });

    test("should return -1 when a < b", () => {
      expect(compareTemperatures(15, 20)).toBe(-1);
    });

    test("should return 0 when a === b", () => {
      expect(compareTemperatures(20, 20)).toBe(0);
    });

    test("should throw TypeError when first argument is not a number", () => {
      expect(() => compareTemperatures("25", 20)).toThrow(TypeError);
      expect(() => compareTemperatures("25", 20)).toThrow("Expected number, got string");
    });

    test("should throw TypeError when second argument is not a number", () => {
      expect(() => compareTemperatures(25, null)).toThrow(TypeError);
      expect(() => compareTemperatures(25, null)).toThrow("Expected number, got object");
    });
  });

  describe("compareCities", () => {
    test("should return correct warmer, cooler, and difference for happy path", () => {
      // Berlin: 22, Munich: 18
      const result = compareCities("Berlin", "Munich");
      expect(result).toEqual({
        warmer: "Berlin",
        cooler: "Munich",
        difference: 4,
        tie: false,
      });
    });

    test("should return correct warmer, cooler, and difference when order is swapped", () => {
      // Munich: 18, Berlin: 22
      const result = compareCities("Munich", "Berlin");
      expect(result).toEqual({
        warmer: "Berlin",
        cooler: "Munich",
        difference: 4,
        tie: false,
      });
    });

    test("should handle tie case correctly", () => {
      // To test a tie, we need two cities with same temp. 
      // Since WEATHER_DB is static, we can't easily add one without modifying source.
      // However, comparing a city with itself is a valid tie case.
      const result = compareCities("Berlin", "Berlin");
      expect(result).toEqual({
        warmer: null,
        cooler: null,
        difference: 0,
        tie: true,
      });
    });

    test("should throw Error when cityA is unknown", () => {
      expect(() => compareCities("Atlantis", "Berlin")).toThrow("Unknown city: Atlantis");
    });

    test("should throw Error when cityB is unknown", () => {
      expect(() => compareCities("Berlin", "Atlantis")).toThrow("Unknown city: Atlantis");
    });

    test("should check cityA before cityB for unknown city error", () => {
      // Both unknown, should throw for cityA first
      expect(() => compareCities("Atlantis", "Gotham")).toThrow("Unknown city: Atlantis");
    });
  });
});
