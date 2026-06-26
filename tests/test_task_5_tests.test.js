"use strict";

const { celsiusToFahrenheit, summarizeTemperatures } = require('../utils');
const { getForecast } = require('../forecast');
const { getWeather } = require('../weather');

describe('Weather System Unit Tests', () => {
  describe('utils.js', () => {
    test('celsiusToFahrenheit should correctly convert Celsius to Fahrenheit', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
      expect(celsiusToFahrenheit(100)).toBe(212);
      expect(celsiusToFahrenheit(-40)).toBe(-40);
      expect(celsiusToFahrenheit(20)).toBe(68);
    });

    test('celsiusToFahrenheit should throw TypeError on non-number input', () => {
      expect(() => celsiusToFahrenheit('20')).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(null)).toThrow(TypeError);
      expect(() => celsiusToFahrenheit(undefined)).toThrow(TypeError);
    });

    test('summarizeTemperatures should return correct min, max, and avg', () => {
      const values = [10, 20, 30];
      const result = summarizeTemperatures(values);
      expect(result).toEqual({
        min: 10,
        max: 30,
        avg: 20
      });

      const values2 = [15.5, 20.2, 18.8];
      const result2 = summarizeTemperatures(values2);
      // (15.5 + 20.2 + 18.8) / 3 = 54.5 / 3 = 18.1666... -> rounded to 18.2
      expect(result2.min).toBe(15.5);
      expect(result2.max).toBe(20.2);
      expect(result2.avg).toBe(18.2);
    });
  });

  describe('forecast.js', () => {
    test('getForecast happy path (Celsius)', () => {
      const result = getForecast('Munich', 'C');
      expect(result.city).toBe('Munich');
      expect(result.unit).toBe('C');
      expect(result.days).toHaveLength(3);
      expect(result.days[0]).toEqual({ day: 1, temperature: 18, condition: 'Partly Cloudy' });
      expect(result.summary).toBeDefined();
      expect(result.summary.min).toBe(17);
      expect(result.summary.max).toBe(20);
      expect(result.summary.avg).toBe(18.3); // (18+20+17)/3 = 55/3 = 18.333...
    });

    test('getForecast Fahrenheit conversion', () => {
      const result = getForecast('Munich', 'F');
      expect(result.unit).toBe('F');
      // 18C -> 64.4F, 20C -> 68F, 17C -> 62.6F
      expect(result.days[0].temperature).toBe(64.4);
      expect(result.days[1].temperature).toBe(68);
      expect(result.days[2].temperature).toBe(62.6);
      
      // Summary should be based on Fahrenheit values
      // min: 62.6, max: 68, avg: (64.4 + 68 + 62.6) / 3 = 195 / 3 = 65
      expect(result.summary.min).toBe(62.6);
      expect(result.summary.max).toBe(68);
      expect(result.summary.avg).toBe(65);
    });

    test('getForecast should throw "Unknown city" error for unknown cities', () => {
      expect(() => getForecast('London')).toThrow('Unknown city: London');
    });
  });

  describe('weather.js', () => {
    test('getWeather Fahrenheit conversion', () => {
      const result = getWeather('Berlin', 'F');
      // Berlin is 22C. 22 * 9/5 + 32 = 39.6 + 32 = 71.6
      expect(result.city).toBe('Berlin');
      expect(result.unit).toBe('F');
      expect(result.temperature).toBe(71.6);
    });

    test('getWeather should throw "Unknown city" error for unknown cities', () => {
      expect(() => getWeather('London')).toThrow('Unknown city: London');
    });
  });
});
