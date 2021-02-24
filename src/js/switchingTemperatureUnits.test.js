import { switchingToFahrenheit, switchingToCelsius } from './switchingTemperatureUnits';

describe('switchingToFahrenheit', () => {
  test('should return degress Fahrenheit', () => {    
    const expected = 48;
    const degress = 9;
    const actual = switchingToFahrenheit(degress);

    expect(actual).toEqual(expected);
  });
});

describe('switchingToCelsius', () => {
    test('should return degress Celsius', () => {    
      const expected = 9;
      const degress = 48;
      const actual = switchingToCelsius(degress);
      
      expect(actual).toEqual(expected);
    });
  });