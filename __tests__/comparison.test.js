"use strict";

const { compareTemperatures } = require("../utils");
const { compareCities } = require("../weather");

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

  test("should throw TypeError if first argument is not a number", () => {
    expect(() => compareTemperatures("20", 20)).toThrow(TypeError);
    expect(() => compareTemperatures("20", 20)).toThrow("Expected number, got string");
  });

  test("should throw TypeError if second argument is not a number", () => {
    expect(() => compareTemperatures(20, null)).toThrow(TypeError);
    expect(() => compareTemperatures(20, null)).toThrow("Expected number, got object");
  });
});

describe("compareCities", () => {
  test("should return correct warmer and cooler cities (happy path)", () => {
    // Berlin (22) vs Hamburg (15)
    const result = compareCities("Berlin", "Hamburg");
    expect(result).toEqual({
      warmer: "Berlin",
      cooler: "Hamburg",
      difference: 7,
      tie: false,
    });
  });

  test("should return correct warmer and cooler cities when order is reversed", () => {
    // Hamburg (15) vs Berlin (22)
    const result = compareCities("Hamburg", "Berlin");
    expect(result).toEqual({
      warmer: "Berlin",
      cooler: "Hamburg",
      difference: 7,
      tie: false,
    });
  });

  test("should handle tie case correctly", () => {
    // To test a tie, we need two cities with same temp. 
    // Since WEATHER_DB is static and doesn't have ties, we can't easily test 
    // without mocking or adding a city. However, the prompt asks for the tie case.
    // Given the current DB: Munich: 18, Berlin: 22, Hamburg: 15.
    // I will test comparing a city with itself.
    const result = compareCities("Munich", "Munich");
    expect(result).toEqual({
      warmer: null,
      cooler: null,
      difference: 0,
      tie: true,
    });
  });

  test("should throw Error for unknown cityA", () => {
    expect(() => compareCities("London", "Berlin")).toThrow("Unknown city: London");
  });

  test("should throw Error for unknown cityB", () => {
    expect(() => compareCities("Berlin", "London")).toThrow("Unknown city: London");
  });

  test("should check cityA before cityB", () => {
    expect(() => compareCities("London", "Paris")).toThrow("Unknown city: London");
  });
});
