import { 
  getWeatherToday, getWeatherOtherDays, getWeatherValues, getUrl, 
} from './getDataWeather';

const coordinates = {
  lat: 51.5013775,
  lng: 46.1233093
};

const current = {
  feels_like: 15.36,
  humidity: 37,
  wind_speed: 3.13,
  weather: [
    {
      description: 'few clouds',
    }
  ],
};

const daily = [
  {
    temp: {
      day: 18.89
    }
  },
  {
    temp: {
        day: 19.8
      }
  },
  {
    temp: {
      day: 19.18
    }
  },
  {
    temp: {
        day: 20.29
      }
  },      
];

const dataFourDays = { current, daily };

describe('getUrl', () => {
  test('should return url with coordinates', () => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=51.5013775&lon=46.1233093
    &exclude=minutely,hourly&lang=en&units=metric&appid=b940ddb44a10590924b195caa5d36bd5`;
    
    const expected = url.replace(/\n| /g, '');
    const actual = getUrl(coordinates);

    expect(actual).toEqual(expected);
  });
});

describe('getWeatherOtherDays', () => {
  test('should return array with degress', () => {    
    const expected = [19, 20, 19, 20];
    const actual = getWeatherOtherDays(daily);

    expect(actual).toEqual(expected);
  });
});

describe('getWeatherToday', () => {
  test('should return array with data weather', () => {
    const actual = getWeatherToday(current);
    const expected = ['15', '37', '3'];

    expect(actual).toEqual(expected);
  });
});

describe('getWeatherValues', () => {
  test('should return array with weather data for four days', () => {    
    const expected = [19, 20, 19, 20, '15', '37', '3'];
    const actual = getWeatherValues(dataFourDays);

    expect(actual).toEqual(expected);
  });
});