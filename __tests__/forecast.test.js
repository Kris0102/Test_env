"use strict";

const { getForecast } = require("../forecast");

describe("getForecast", () => {
  describe("happy-path for known cities", () => {
    test("getForecast('Munich') returns 3-day array with correct structure", () => {
      const result = getForecast("Munich");

      expect(result.city).toBe("Munich");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0]).toEqual({
        day: "Day 1",
        temperature: 18,
        condition: "Partly Cloudy",
      });
      expect(result.days[1]).toEqual({
        day: "Day 2",
        temperature: 19,
        condition: "Sunny",
      });
      expect(result.days[2]).toEqual({
        day: "Day 3",
        temperature: 17,
        condition: "Cloudy",
      });
    });

    test("getForecast('Berlin') returns 3-day array with correct structure", () => {
      const result = getForecast("Berlin");

      expect(result.city).toBe("Berlin");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0]).toEqual({
        day: "Day 1",
        temperature: 22,
        condition: "Sunny",
      });
      expect(result.days[1]).toEqual({
        day: "Day 2",
        temperature: 23,
        condition: "Sunny",
      });
      expect(result.days[2]).toEqual({
        day: "Day 3",
        temperature: 21,
        condition: "Partly Cloudy",
      });
    });

    test("getForecast('Hamburg') returns 3-day array with correct structure", () => {
      const result = getForecast("Hamburg");

      expect(result.city).toBe("Hamburg");
      expect(result.unit).toBe("C");
      expect(result.days).toHaveLength(3);
      expect(result.days[0]).toEqual({
        day: "Day 1",
        temperature: 15,
        condition: "Rainy",
      });
      expect(result.days[1]).toEqual({
        day: "Day 2",
        temperature: 16,
        condition: "Cloudy",
      });
      expect(result.days[2]).toEqual({
        day: "Day 3",
        temperature: 14,
        condition: "Rainy",
      });
    });
  });

  describe("unknown city throws Error", () => {
    test("getForecast('UnknownCity') throws Error with exact message", () => {
      expect(() => getForecast("UnknownCity")).toThrow(
        new Error("Unknown city: UnknownCity")
      );
    });

    test("getForecast('Paris') throws Error with exact message", () => {
      expect(() => getForecast("Paris")).toThrow(
        new Error("Unknown city: Paris")
      );
    });
  });

  describe("Fahrenheit conversion", () => {
    test("getForecast('Munich', 'F') returns converted temperatures", () => {
      const result = getForecast("Munich", "F");

      expect(result.city).toBe("Munich");
      expect(result.unit).toBe("F");
      expect(result.days).toHaveLength(3);

      // 18°C = 64.4°F, 19°C = 66.2°F, 17°C = 62.6°F
      expect(result.days[0].temperature).toBe(64.4);
      expect(result.days[1].temperature).toBe(66.2);
      expect(result.days[2].temperature).toBe(62.6);
    });

    test("getForecast('Berlin', 'F') returns converted temperatures", () => {
      const result = getForecast("Berlin", "F");

      expect(result.unit).toBe("F");
      // 22°C = 71.6°F, 23°C = 73.4°F, 21°C = 69.8°F
      expect(result.days[0].temperature).toBe(71.6);
      expect(result.days[1].temperature).toBe(73.4);
      expect(result.days[2].temperature).toBe(69.8);
    });

    test("getForecast('Hamburg', 'F') returns converted temperatures", () => {
      const result = getForecast("Hamburg", "F");

      expect(result.unit).toBe("F");
      // 15°C = 59°F, 16°C = 60.8°F, 14°C = 57.2°F
      expect(result.days[0].temperature).toBe(59);
      expect(result.days[1].temperature).toBe(60.8);
      expect(result.days[2].temperature).toBe(57.2);
    });
  });

  describe("summary calculations", () => {
    test("summary contains min, max, avg with correct values for Munich (Celsius)", () => {
      const result = getForecast("Munich");

      // Temperatures: 18, 19, 17
      // min = 17, max = 19, avg = (18 + 19 + 17) / 3 = 18
      expect(result.summary.min).toBe(17);
      expect(result.summary.max).toBe(19);
      expect(result.summary.avg).toBe(18);
    });

    test("summary contains min, max, avg with correct values for Berlin (Celsius)", () => {
      const result = getForecast("Berlin");

      // Temperatures: 22, 23, 21
      // min = 21, max = 23, avg = (22 + 23 + 21) / 3 = 22
      expect(result.summary.min).toBe(21);
      expect(result.summary.max).toBe(23);
      expect(result.summary.avg).toBe(22);
    });

    test("summary contains min, max, avg with correct values for Hamburg (Celsius)", () => {
      const result = getForecast("Hamburg");

      // Temperatures: 15, 16, 14
      // min = 14, max = 16, avg = (15 + 16 + 14) / 3 = 15
      expect(result.summary.min).toBe(14);
      expect(result.summary.max).toBe(16);
      expect(result.summary.avg).toBe(15);
    });

    test("summary contains min, max, avg with correct values for Munich (Fahrenheit)", () => {
      const result = getForecast("Munich", "F");

      // Temperatures: 64.4, 66.2, 62.6
      // min = 62.6, max = 66.2, avg = (64.4 + 66.2 + 62.6) / 3 = 64.4
      expect(result.summary.min).toBe(62.6);
      expect(result.summary.max).toBe(66.2);
      expect(result.summary.avg).toBe(64.4);
    });

    test("summary.avg is rounded to one decimal place", () => {
      // Berlin in F: 71.6, 73.4, 69.8
      // avg = (71.6 + 73.4 + 69.8) / 3 = 214.8 / 3 = 71.6
      const result = getForecast("Berlin", "F");
      expect(result.summary.avg).toBe(71.6);
    });
  });

  describe("day array structure", () => {
    test("each day object has day, temperature, and condition properties", () => {
      const result = getForecast("Munich");

      result.days.forEach((day) => {
        expect(day).toHaveProperty("day");
        expect(day).toHaveProperty("temperature");
        expect(day).toHaveProperty("condition");
        expect(typeof day.day).toBe("string");
        expect(typeof day.temperature).toBe("number");
        expect(typeof day.condition).toBe("string");
      });
    });
  });
});
