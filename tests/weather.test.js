"use strict";

const { levenshteinDistance } = require("../utils");
const { findCity, getWeather } = require("../weather");

describe("levenshteinDistance", () => {
  test("calculates distance between kitten and sitting as 3", () => {
    expect(levenshteinDistance("kitten", "sitting")).toBe(3);
  });

  test("calculates distance between berlin and berlin as 0", () => {
    expect(levenshteinDistance("berlin", "berlin")).toBe(0);
  });

  test("calculates distance between empty string and abc as 3", () => {
    expect(levenshteinDistance("", "abc")).toBe(3);
  });

  test("throws TypeError if arguments are not strings", () => {
    expect(() => levenshteinDistance(null, "abc")).toThrow(TypeError);
    expect(() => levenshteinDistance("abc", 123)).toThrow(TypeError);
  });
});

describe("findCity", () => {
  test("returns exact match with corrected: false", () => {
    expect(findCity("Munich")).toEqual({ city: "Munich", corrected: false });
  });

  test("returns case-insensitive match with corrected: true", () => {
    expect(findCity("munich")).toEqual({ city: "Munich", corrected: true });
  });

  test("returns closest match within distance 2 with corrected: true", () => {
    expect(findCity("Berlim")).toEqual({ city: "Berlin", corrected: true });
  });

  test("throws Error with suggestion if distance is between 3 and 2", () => {
    // "Berlin" vs "Brl" is distance 3 (e, i, n removed)
    // Let's find a string that is distance 3 from a DB key.
    // Berlin (6) -> Ber (3) is distance 3.
    expect(() => findCity("Ber")).toThrow("Unknown city: Ber. Did you mean Berlin?");
  });

  test("throws plain Error if distance is greater than 3", () => {
    expect(() => findCity("Tokyo")).toThrow("Unknown city: Tokyo");
  });
});

describe("getWeather", () => {
  test("returns canonical city name for case-insensitive input", () => {
    const result = getWeather("hamburg");
    expect(result.city).toBe("Hamburg");
    expect(result).toHaveProperty("temperature");
    expect(result).toHaveProperty("condition");
  });
});
