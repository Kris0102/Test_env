"use strict";

const { getForecast } = require('../forecast');

describe('forecast.js', () => {
  test('getForecast returns correct structure for known city', () => {
    const result = getForecast('Munich', 'C');
    
    expect(result).toHaveProperty('city', 'Munich');
    expect(result).toHaveProperty('unit', 'C');
    expect(Array.isArray(result.days)).toBe(true);
    expect(result.days).toHaveLength(3);
    expect(result.days[0]).toHaveProperty('day');
    expect(result.days[0]).toHaveProperty('temperature');
    expect(result.days[0]).toHaveProperty('condition');
    expect(result).toHaveProperty('summary');
    expect(result.summary).toHaveProperty('min');
    expect(result.summary).toHaveProperty('max');
    expect(result.summary).toHaveProperty('avg');
  });

  test('getForecast throws "Unknown city: <city>" for unknown cities', () => {
    expect(() => {
      getForecast('London');
    }).toThrow('Unknown city: London');
  });

  test('getForecast converts temperatures to Fahrenheit when unit is "F"', () => {
    const resultC = getForecast('Munich', 'C');
    const resultF = getForecast('Munich', 'F');
    
    expect(resultF.unit).toBe('F');
    
    // Verify that temperatures are different and converted
    // We don't assert exact values as per rules, but we check that they are not the same as Celsius
    resultC.days.forEach((dayC, index) => {
      const dayF = resultF.days[index];
      expect(dayF.temperature).not.toBe(dayC.temperature);
      // Basic sanity check: F should be higher than C for these values
      expect(dayF.temperature).toBeGreaterThan(dayC.temperature);
    });
    
    // Also check that summary values are converted/updated
    expect(resultF.summary.min).not.toBe(resultC.summary.min);
    expect(resultF.summary.max).not.toBe(resultC.summary.max);
  });
});
