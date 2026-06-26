"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require('../utils');

describe('utils.js temperature logic', () => {
  describe('celsiusToFahrenheit', () => {
    test('converts correctly (0C -> 32F)', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    test('converts correctly (100C -> 212F)', () => {
      expect(celsiusToFahrenheit(100)).toBe(212);
    });

    test('throws TypeError on non-number', () => {
      expect(() => {
        celsiusToFahrenheit('20');
      }).toThrow(TypeError);
    });
  });

  describe('summarizeTemperatures', () => {
    test('returns correct min, max, and formatted avg', () => {
      const values = [10, 20, 30];
      const result = summarizeTemperatures(values);
      expect(result).toEqual({
        min: 10,
        max: 30,
        avg: 20
      });
    });
  });
});
