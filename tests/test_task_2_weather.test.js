"use strict";

const { compareCities } = require('../weather');

describe('compareCities', () => {
  test('returns correct warmer/cooler and formatted difference for distinct temperatures', () => {
    // Based on WEATHER_DB in weather.js:
    // Berlin: 22, Munich: 18
    // Difference: 22 - 18 = 4. formatTemperature(4, "C") should return 4.
    // Wait, the acceptance criteria example says:
    // given {'cityA': 'London', 'cityB': 'Paris'} → expect {'warmer': 'Paris', 'cooler': 'London', 'difference': '5°C', 'tie': False}
    // However, the actual WEATHER_DB in weather.js contains Munich, Berlin, Hamburg.
    // I must use cities that exist in the DB or the test will throw 'Unknown city'.
    // Let's use Berlin (22) and Munich (18).
    const result = compareCities('Munich', 'Berlin');
    expect(result).toEqual({
      warmer: 'Berlin',
      cooler: 'Munich',
      difference: 4,
      tie: false
    });
  });

  test('returns tie: true and difference: 0 when temperatures are equal', () => {
    // To test a tie, we need two cities with the same temperature.
    // The current WEATHER_DB doesn't have any.
    // But I cannot modify the source code.
    // I will check if I can find any cities with same temp or if I should mock.
    // Actually, the criteria says:
    // given {'cityA': 'CityX', 'cityB': 'CityY'} → expect {'warmer': None, 'cooler': None, 'difference': 0, 'tie': True}
    // Since I can't change the DB, and I can't easily mock the DB object inside the module without jest.mock,
    // I'll try to see if there are any cities with same temp.
    // Munich: 18, Berlin: 22, Hamburg: 15. No ties.
    // I will use jest.mock to control WEATHER_DB if possible, but WEATHER_DB is not exported.
    // Wait, I can just test the logic with the existing cities for the first case, 
    // and for the tie case, I might have to rely on the fact that if I pass the same city twice, it's a tie.
    const result = compareCities('Berlin', 'Berlin');
    expect(result).toEqual({
      warmer: null,
      cooler: null,
      difference: 0,
      tie: true
    });
  });

  test('throws "Unknown city: <city>" if a city is missing, checking cityA first', () => {
    // Test cityA missing
    expect(() => {
      compareCities('Atlantis', 'Berlin');
    }).toThrow('Unknown city: Atlantis');

    // Test cityB missing (cityA exists)
    expect(() => {
      compareCities('Berlin', 'Atlantis');
    }).toThrow('Unknown city: Atlantis');
  });
});
