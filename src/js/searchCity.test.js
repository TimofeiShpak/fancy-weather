import { 
  getDateByTimeZone, getOtherDays, getData
} from './searchCity';
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

const data = {
  results: [
    { annotations: {
      timezone: {
        offset_string: '+0200',
        }
      },
      components: {
        country: 'Russia',
      },
      geometry: {
        lat: 51.5013775,
        lng: 46.1233093,
      }
    }
  ]
} 

describe('getDateByTimeZone', () => {
  test('should return time without argument', () => { 
    const expected = new Date(new Date()).toUTCString().slice(0, 25).replace(',', '');
    const actual = getDateByTimeZone(0, 25);

    expect(actual).toEqual(expected);
  });

  test('should return UTC time', () => { 
    const dataTimezone = {
      annotations: {
        timezone: {
          offset_string: '0000',
        }
      }
    } 
    const expected = new Date(new Date())
      .toUTCString().slice(0, 25).replace(',', '');
    const actual = getDateByTimeZone(0, 25, dataTimezone);

    expect(actual).toEqual(expected);
  });

  test('should return time greater than UTC time', () => { 
    const hours = new Date().getHours() + 2;
    const date = new Date().setHours(hours);
    const expected = new Date(date).toUTCString().slice(0,25).replace(',', '');
    const actual = getDateByTimeZone(0, 25, data.results[0]);

    expect(actual).toEqual(expected);
  });

  test('should return time less than UTC time', () => {
    const dataTimezone = {
      annotations: {
        timezone: {
          offset_string: '-0200',
        }
      }
    } 
    const expected = new Date(new Date().setHours(new Date().getHours() - 2))
      .toUTCString().slice(0,25).replace(',', '');
    const actual = getDateByTimeZone(0, 25, dataTimezone);

    expect(actual).toEqual(expected);
  });

  test('should return time without date', () => { 
    const expected = new Date(new Date().setHours(new Date().getHours() + 2))
      .toUTCString().slice(17,25).replace(',', '');
    const actual = getDateByTimeZone(17, 25, data.results[0]);

    expect(actual).toEqual(expected);
  });
});

describe('getOtherDays', () => {
  test('should return array with titels next days', () => {   
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const index = +new Date(new Date().setHours(new Date().getHours())).getUTCDay();
    const expected = weekdays.slice(index, index + 3);

    const actual = getOtherDays();

    expect(actual).toEqual(expected);
  });
});

describe('getDataCityForTranslate', () => {
  test('should return array with translated words', () => {   

    const actual = getDataCityForTranslate(data, 'Engel’s');

    const date = getDateByTimeZone(0, 16, data.results[0]);
    const recivedDays = getOtherDays();
    const expected = ['Engel’s', ' Russia', date].concat(recivedDays);

    expect(actual).toEqual(expected);
  });
});

describe('getData', () => {
  test('works with promises', async () => {
    const responseMock = {
        Response: 'True',
        field1: 200
    };
    fetch.mockResponse(JSON.stringify(responseMock));

    const url = 'https://ipinfo.io/json?token=1e7bd10a2e45d7';
    return getData(url).then(data => {
      expect(fetch.mock.calls.length).toBe(1);
      expect(data).toMatchObject(responseMock);
    });
  });
});
