"use strict";

const { getWeather } = require('../weather');

describe('getWeather unit tests', () => {
  test('getWeather maintains existing behavior for Celsius (default)', () => {
    // Munich is 18C in WEATHER_DB. formatTemperature(18, 'C') -> "18.0"
    const result = getWeather('Munich');
    expect(result).toEqual({
      city: 'Munich',
      temperature: '18.0',
      condition: 'Partly Cloudy',
      unit: 'C'
    });
  });

  test('getWeather returns temperature in Fahrenheit when unit is "F"', () => {
    // Munich is 18C. 18 * 9/5 + 32 = 32.4 + 32 = 64.4
    // formatTemperature(64.4, 'F') -> "64.4"
    const result = getWeather('Munich', 'F');
    expect(result).toEqual({
      city: 'Munich',
      temperature: '64.4',
      condition: 'Partly Cloudy',
      unit: 'F'
    });
  });

  test('getWeather returns correct Fahrenheit value for Berlin', () => {
    // Berlin is 22C. 22 * 9/5 + 32 = 39.6 + 32 = 71.6
    const result = getWeather('Berlin', 'F');
    expect(result.temperature).toBe('71.6');
    expect(result.unit).toBe('F');
  });

  test('getWeather returns correct Fahrenheit value for Hamburg', () => {
    // Hamburg is 15C. 15 * 9/5 + 32 = 27 + 32 = 59.0
    const result = getWeather('Hamburg', 'F');
    expect(result.temperature).toBe('59.0');
    expect(result.unit).toBe('F');
  });
});
