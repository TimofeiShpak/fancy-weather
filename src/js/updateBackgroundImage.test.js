import { getHours, getTimeDay, getSeason } from './updateBackgroundImage';

describe('getTimeDay', () => {
  test('should return hours by timezone', () => {
    const actual = getHours();
    const hours = new Date().getHours();
    const date = new Date().setHours(hours);
    const currentDate = new Date(date);
    const expected = +currentDate.toUTCString().slice(17, 19);

    expect(actual).toEqual(expected);
  });
});

describe('getTimeDay', () => {
  test('should return night', () => {
    const actual = getTimeDay(2);
    const expected = 'night';

    expect(actual).toEqual(expected);
  });

  test('should return morning', () => {
    const actual = getTimeDay(8);
    const expected = 'morning';

    expect(actual).toEqual(expected);
  });

  test('should return afternoon', () => {
    const actual = getTimeDay(14);
    const expected = 'afternoon';

    expect(actual).toEqual(expected);
  });

  test('should return evening', () => {
    const actual = getTimeDay(20);
    const expected = 'evening';

    expect(actual).toEqual(expected);
  });
});

describe('getSeason', () => {
  test('should return month for northern hemisphere', () => {
    const seasonsNorth = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer',
        'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
    const expected = seasonsNorth[new Date().getMonth()];
    const actual = getSeason(10);
    
    expect(actual).toEqual(expected);
  });

  test('should return month for southern hemisphere', () => {
    const seasonsSouth = ['summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter',
        'winter', 'winter', 'spring', 'spring', 'spring', 'summer'];
    const expected = seasonsSouth[new Date().getMonth()];
    const actual = getSeason(-10);
    
    expect(actual).toEqual(expected);
  });
});
