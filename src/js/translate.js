// import 'babel-polyfill';
// import { getData } from './searchCity';
// import {
//   MIN_NUMBER, input, loadingIndicator, NUMBER_OK_CODE,
// } from './constants';
// import * as en from './localization/en-en';
// import * as ru from './localization/ru-ru';
// import * as be from './localization/be-be';

// const textElements = document.querySelectorAll('.text');
// const namesDays = document.querySelectorAll('.next-day');
// const weather = document.querySelector('.weather');
// const buttonChangeLanguage = document.querySelector('.custom-select');
// const errorText = document.querySelector('.error');
// const buttonError = document.querySelector('.button-error');

// const staticElements = document.querySelectorAll('.static-text');
// const keysStaticWords = ['BUTTON_SEARCH', 'FEELS_LIKE', 'HUMIDITY', 'WIND', 'UNIT_WIND',
//   'LATITUDE', 'LONGITUDE', 'ERROR', 'OK'];
// const KEY_INPUT = 'INPUT_SEARCH';

// const languages = ['en', 'ru', 'be'];
// const elements = [].concat([...textElements], [...namesDays], weather);

// const saveLanguage = JSON.parse(localStorage.getItem('myLanguage'));
// const ONE_WORD = 1;

// let language = 'en';
// let copyLanguage = 'en';
// if (saveLanguage) {
//   language = saveLanguage;
//   buttonChangeLanguage.selectedIndex = languages.indexOf(language);
// }

// export function getUrl(textForTranslate) {
//   const text = textForTranslate;
//   let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200
//   322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44${text}&lang=`;
//   if (copyLanguage === 'be' && language === 'ru' && !input.value) {
//     url += `${copyLanguage}-${language}`;
//   } else {
//     url += `${language}`;
//   }
//   url = url.replace(/ {2,}/g, '');
//   return url;
// }

// export function preparingDataForTranslate(words) {
//   let wordsForTranslate = '';
//   for (let i = MIN_NUMBER; i < words.length; i++) {
//     wordsForTranslate += `&text=${words[i]}`;
//   }
//   return wordsForTranslate;
// }

// export async function getTranslatedWord(words) {
//   const textForTranslate = preparingDataForTranslate(words);
//   const url = getUrl(textForTranslate);
//   const data = await getData(url);
//   return data;
// }

// function changeInnerTextElements(translatedWords) {
//   for (let i = MIN_NUMBER; i < elements.length; i++) {
//     elements[i].innerText = translatedWords[i];
//   }
// }

// export function showWrongResult(word) {
//   let errorMessage = word;
//   input.value = '';
//   loadingIndicator.classList.add('hide');
//   if (errorMessage.split(' ').length === ONE_WORD) {
//     const phrases = ['no results for', 'нет результатов для', 'ніякіх вынікаў для'];
//     errorMessage = `${phrases[languages.indexOf(language)]} ${word}`;
//   }
//   errorText.innerText = errorMessage;
//   buttonError.click();
// }

// function translate(wordKey) {
//   let languageFile;
//   switch (language) {
//     case 'ru': languageFile = ru.default;
//       break;
//     case 'en': languageFile = en.default;
//       break;
//     default: languageFile = be.default;
//       break;
//   }
//   return `${languageFile[wordKey]}`;
// }

// function translateStaticWords() {
//   for (let i = MIN_NUMBER; i < staticElements.length; i++) {
//     staticElements[i].innerText = translate(keysStaticWords[i]);
//   }
//   input.placeholder = translate(KEY_INPUT);
// }

// export function showTranslatedWord(words) {
//   const translatedWords = words;
//   if (translatedWords.code > NUMBER_OK_CODE) {
//     showWrongResult(translatedWords.message);
//   } else {
//     changeInnerTextElements(translatedWords);
//   }
//   translateStaticWords();
// }

// async function changeLanguage() {
//   if (language !== languages[buttonChangeLanguage.selectedIndex]) {
//     input.value = '';
//     copyLanguage = language;
//     language = languages[buttonChangeLanguage.selectedIndex];
//     const save = JSON.stringify(language);
//     localStorage.setItem('myLanguage', save);
//     const words = [...elements].map((element) => element.innerText);
//     const translatedWords = await getTranslatedWord(words);
//     showTranslatedWord(translatedWords.text);
//   }
// }

// export function changeLanguageByButton() {
//   buttonChangeLanguage.addEventListener('click', () => {
//     changeLanguage();
//   });
// }
