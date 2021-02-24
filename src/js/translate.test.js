import { getUrl, preparingDataForTranslate } from './translate';

describe('getUrl', () => {
  test('should return url with words', () => {   
    const actual = getUrl('dream');

    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200
    322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44dream&lang=en`;
    const expected = url.replace(/ {2,}/g, '');

    expect(actual).toEqual(expected);
  });
});

describe('preparingDataForTranslate', () => {
  test('should return empty string', () => {   
    const actual = preparingDataForTranslate([]);
    const expected = '';

    expect(actual).toEqual(expected);
  });

  test('should return string with argument', () => {   
    const words = ['dream'];
    const actual = preparingDataForTranslate(words);

    const expected = '&text=dream';

    expect(actual).toEqual(expected);
  });

  test('should return string with many arguments', () => {   
    const words = ["Поиск", "ЭНГЕЛЬС", "РОССИЯ", "Пн Июн 01 2020", "Широта: 51.50",
     "Долгота: 46.12", "Во вторник", "В среду", "В четверг", "ЧИСТОЕ НЕБО",
      "ОЩУЩАЕТСЯ КАК: 16", "ВЛАЖНОСТЬ: 59", "ВЕТЕР: 5М/С", "20", "19", "21", "19",
       "Ошибка", "нет результатов для", "ОК"];
    const actual = preparingDataForTranslate(words);

    const stringWithWords = `&text=Поиск&text=ЭНГЕЛЬС&text=РОССИЯ&text=Пн Июн 01 2020&text=
    Широта: 51.50&text=Долгота: 46.12&text=Во вторник&text=В среду&text=В четверг
    &text=ЧИСТОЕ НЕБО&text=ОЩУЩАЕТСЯ КАК: 16&text=ВЛАЖНОСТЬ: 59&text=ВЕТЕР: 5М/С
    &text=20&text=19&text=21&text=19&text=Ошибка&text=нет результатов для&text=ОК`;
    const expected = stringWithWords.replace(/\n| {4,}/g, '');

    expect(actual).toEqual(expected);
  });
});