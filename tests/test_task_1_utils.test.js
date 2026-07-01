"use strict";

const { compareTemperatures } = require('../utils');

describe('compareTemperatures', () => {
  test('returns 1 when a > b', () => {
    // Given {'a': 25, 'b': 20} → expect 1
    expect(compareTemperatures(25, 20)).toBe(1);
  });

  test('returns -1 when a < b', () => {
    // Given {'a': 10, 'b': 15} → expect -1
    expect(compareTemperatures(10, 15)).toBe(-1);
  });

  test('returns 0 when a == b', () => {
    // Given {'a': 20, 'b': 20} → expect 0
    expect(compareTemperatures(20, 20)).toBe(0);
  });

  test('throws TypeError if either argument is not a number', () => {
    // Given {'a': '20', 'b': 20} → expect 'TypeError'
    expect(() => compareTemperatures('20', 20)).toThrow(TypeError);
    expect(() => compareTemperatures(20, '20')).toThrow(TypeError);
    expect(() => compareTemperatures(null, 20)).toThrow(TypeError);
    expect(() => compareTemperatures(20, undefined)).toThrow(TypeError);
  });
});
