"use strict";

const { getWeather } = require("../weather.js");

describe("getWeather", () => {
  describe("existing behavior (single day, Celsius)", () => {
    test("getWeather('Munich') returns temperature 18 with unit 'C'", () => {
      const result = getWeather("Munich");
      expect(result.temperature).toBe(18);
      expect(result.unit).toBe("C");
    });

    test("getWeather('Berlin') returns temperature 22 with unit 'C'", () => {
      const result = getWeather("Berlin");
      expect(result.temperature).toBe(22);
      expect(result.unit).toBe("C");
    });

    test("getWeather('Hamburg') returns temperature 15 with unit 'C'", () => {
      const result = getWeather("Hamburg");
      expect(result.temperature).toBe(15);
      expect(result.unit).toBe("C");
    });
  });

  describe("getWeather with unit='F' conversion", () => {
    test("getWeather('Munich', 'F') returns converted temperature (64.4) with unit 'F'", () => {
      const result = getWeather("Munich", "F");
      expect(result.temperature).toBe(64.4);
      expect(result.unit).toBe("F");
    });

    test("getWeather('Berlin', 'F') returns converted temperature (71.6) with unit 'F'", () => {
      const result = getWeather("Berlin", "F");
      expect(result.temperature).toBe(71.6);
      expect(result.unit).toBe("F");
    });

    test("getWeather('Hamburg', 'F') returns converted temperature (59) with unit 'F'", () => {
      const result = getWeather("Hamburg", "F");
      expect(result.temperature).toBe(59);
      expect(result.unit).toBe("F");
    });
  });

  describe("unknown city error throwing", () => {
    test("getWeather('UnknownCity') throws Error('Unknown city: UnknownCity')", () => {
      expect(() => getWeather("UnknownCity")).toThrow("Unknown city: UnknownCity");
    });

    test("getWeather('Paris') throws Error('Unknown city: Paris')", () => {
      expect(() => getWeather("Paris")).toThrow("Unknown city: Paris");
    });
  });

  describe("all three cities work correctly with both C and F units", () => {
    test("Munich works with both C and F", () => {
      const cResult = getWeather("Munich", "C");
      const fResult = getWeather("Munich", "F");
      expect(cResult.temperature).toBe(18);
      expect(cResult.unit).toBe("C");
      expect(fResult.temperature).toBe(64.4);
      expect(fResult.unit).toBe("F");
    });

    test("Berlin works with both C and F", () => {
      const cResult = getWeather("Berlin", "C");
      const fResult = getWeather("Berlin", "F");
      expect(cResult.temperature).toBe(22);
      expect(cResult.unit).toBe("C");
      expect(fResult.temperature).toBe(71.6);
      expect(fResult.unit).toBe("F");
    });

    test("Hamburg works with both C and F", () => {
      const cResult = getWeather("Hamburg", "C");
      const fResult = getWeather("Hamburg", "F");
      expect(cResult.temperature).toBe(15);
      expect(cResult.unit).toBe("C");
      expect(fResult.temperature).toBe(59);
      expect(fResult.unit).toBe("F");
    });
  });
});
