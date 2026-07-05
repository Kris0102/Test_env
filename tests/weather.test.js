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

  test("throws TypeError if either argument is not a string", () => {
    expect(() => levenshteinDistance(null, "abc")).toThrow(TypeError);
    expect(() => levenshteinDistance("abc", 123)).toThrow(TypeError);
  });
});

describe("findCity", () => {
  test("returns exact match", () => {
    expect(findCity("Munich")).toEqual({ city: "Munich", corrected: false });
  });

  test("returns case-insensitive match", () => {
    expect(findCity("munich")).toEqual({ city: "Munich", corrected: true });
  });

  test("returns closest match within distance 2", () => {
    expect(findCity("Berlim")).toEqual({ city: "Berlin", corrected: true });
  });

  test("throws Error for far-off name", () => {
    expect(() => findCity("Tokyo")).toThrow("Unknown city: Tokyo");
  });

  test("throws Error with suggestion for near miss (distance 3)", () => {
    // "Berlin" vs "Brlin" is 1, "Berlin" vs "Brl" is 3.
    // Let's find a string that is distance 3 from any city in DB.
    // Berlin (6), Munich (6), Hamburg (7)
    // "Brlin" is dist 1. "Brl" is dist 3.
    // Let's use a specific case: "Berln" is dist 1. "Bln" is dist 2. "B" is dist 5.
    // "Berli" is dist 1.
    // Let's try "Berl" -> dist 2.
    // Let's try "Brl" -> dist 3.
    expect(() => findCity("Brl")).toThrow(/Unknown city: Brl\. Did you mean Berlin\?/);
  });
});

describe("getWeather", () => {
  test("returns canonical city name for case-insensitive input", () => {
    const result = getWeather("hamburg");
    expect(result.city).toBe("Hamburg");
    expect(result.corrected).toBe(true);
  });

  test("returns correct data for exact match", () => {
    const result = getWeather("Berlin");
    expect(result.city).toBe("Berlin");
    expect(result.corrected).toBe(false);
  });
});
