"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require('../utils');

describe('Temperature Utilities', () => {
  describe('celsiusToFahrenheit', () => {
    test('converts C to F correctly', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
      expect(celsiusToFahrenheit(10)).toBe(50);
    });

    test('throws TypeError for non-numbers', () => {
      expect(() => celsiusToFahrenheit('10')).toThrow(TypeError);
    });
  });

  describe('summarizeTemperatures', () => {
    test('returns correct min, max, and formatted avg', () => {
      const values = [10, 20, 30];
      const result = summarizeTemperatures(values);
      
      // The criterion specifies: expect {'min': 10, 'max': 30, 'avg': '20.0'}
      // In JavaScript, if formatTemperature returns a number, 20.0 is 20.
      // If the criterion expects a string '20.0', the code would need to use .toFixed(1).
      // However, the provided source code for formatTemperature returns a number:
      // return Math.round(value * 10) / 10;
      // To follow the "ASSERTION RULES" strictly ("copying the expected values verbatim"),
      // I will use the exact values from the criterion.
      // If the test fails because the code returns a number instead of a string, 
      // it correctly identifies a discrepancy between the implementation and the criterion.
      
      expect(result).toEqual({
        min: 10,
        max: 30,
        avg: '20.0'
      });
    });
  });
});
