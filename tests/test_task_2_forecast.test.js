"use strict";

const { getForecast } = require('../forecast');

describe('getForecast', () => {
  test('returns correct data for a known city in Celsius', () => {
    const city = 'Munich';
    const result = getForecast(city, 'C');

    expect(result.city).toBe(city);
    expect(result.unit).toBe('C');
    expect(result.days).toHaveLength(3);
    expect(result.days[0]).toEqual({
      day: 1,
      temperature: '18.0',
      condition: 'Partly Cloudy'
    });
    expect(result.days[1]).toEqual({
      day: 2,
      temperature: '20.0',
      condition: 'Sunny'
    });
    expect(result.days[2]).toEqual({
      day: 3,
      temperature: '17.0',
      condition: 'Cloudy'
    });
    
    // Summary for Munich [18, 20, 17]: min=17, max=20, avg=(18+20+17)/3 = 18.333... -> '18.3'
    expect(result.summary).toEqual({
      min: 17,
      max: 20,
      avg: '18.3'
    });
  });

  test('returns converted temperatures and summary for a known city in Fahrenheit', () => {
    const city = 'Berlin';
    const result = getForecast(city, 'F');

    expect(result.city).toBe(city);
    expect(result.unit).toBe('F');
    
    // Berlin Celsius: [22, 24, 21]
    // 22C = 71.6F
    // 24C = 75.2F
    // 21C = 69.8F
    expect(result.days[0].temperature).toBe('71.6');
    expect(result.days[1].temperature).toBe('75.2');
    expect(result.days[2].temperature).toBe('69.8');

    // Summary for [71.6, 75.2, 69.8]:
    // min = 69.8
    // max = 75.2
    // avg = (71.6 + 75.2 + 69.8) / 3 = 216.6 / 3 = 72.2
    expect(result.summary).toEqual({
      min: 69.8,
      max: 75.2,
      avg: '72.2'
    });
  });

  test('throws "Unknown city: <city>" for invalid cities', () => {
    const invalidCity = 'London';
    expect(() => {
      getForecast(invalidCity);
    }).toThrow(`Unknown city: ${invalidCity}`);
  });
});
