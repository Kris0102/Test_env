"use strict";

const { getWeather } = require('../weather');

describe('getWeather unit support', () => {
  test('getWeather returns temperature in Fahrenheit when unit is "F"', () => {
    // Munich is 18C. (18 * 9/5) + 32 = 32.4 + 32 = 64.4
    const result = getWeather('Munich', 'F');
    expect(result.unit).toBe('F');
    expect(result.temperature).toBe(64.4);
  });

  test('getWeather maintains existing "Unknown city" error behavior', () => {
    const unknownCity = 'London';
    expect(() => {
      getWeather(unknownCity);
    }).toThrow(`Unknown city: ${unknownCity}`);
  });

  test('getWeather returns temperature in Celsius by default', () => {
    // Munich is 18C
    const result = getWeather('Munich');
    expect(result.unit).toBe('C');
    expect(result.temperature).toBe(18);
  });

  test('getWeather returns temperature in Celsius when unit is "C"', () => {
    // Berlin is 22C
    const result = getWeather('Berlin', 'C');
    expect(result.unit).toBe('C');
    expect(result.temperature).toBe(22);
  });
});
