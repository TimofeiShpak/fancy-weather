import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import {
  getDataCity, getData, updateTime, getDataCityForTranslate,
} from './js/searchCity';
import { getWeather, getWeatherValues, changeImagesWeather } from './js/getDataWeather';
import { getDataForImage } from './js/updateBackgroundImage';
import { switchingDegress, checkDegress } from './js/switchingTemperatureUnits';
import drawMap from './js/terrainMap';
import {
  MIN_NUMBER, input, loadingIndicator, NUMBER_OK_CODE, NUMBER_FOR_ROUND, degressDays,
} from './js/constants';

const buttonUpdate = document.querySelector('.update');
const buttonSearch = document.querySelector('.btn-outline-secondary');
const app = document.querySelector('.app-wrapper');
const loading = document.querySelector('.loading');
const image = document.createElement('img');
const weatherValues = document.querySelectorAll('.value');
const elementsValues = [].concat([...degressDays], [...weatherValues]);

const textElements = document.querySelectorAll('.text');
const namesDays = document.querySelectorAll('.next-day');
const weather = document.querySelector('.weather');

const staticElements = document.querySelectorAll('.static-text');
const keysStaticWords = ['Feels Like', 'Humidity', 'Wind', 'm/s',
  'latitude: ', 'longitude: ', 'ERROR', 'OK'];

const elements = [].concat([...textElements], [...namesDays], weather);

const URL_FOR_LOCATION = 'https://ipinfo.io/json?token=1e7bd10a2e45d7';
const NUMBER_WORDS_FOR_IMAGE = 1;

let initApp = true;

function firstLoading() {
  if (initApp) {
    initApp = false;
    app.classList.remove('hide');
    loading.classList.add('hide');
    drawMap();
  }
}

function showElementsValues(coordinates, dataWeather) {
  const latitude = coordinates.lat.toFixed(NUMBER_FOR_ROUND);
  const longitude = coordinates.lng.toFixed(NUMBER_FOR_ROUND);
  const values = getWeatherValues(dataWeather).concat(latitude, longitude);
  for (let i = MIN_NUMBER; i < values.length; i++) {
    elementsValues[i].innerText = values[i];
  }
}

function loadingApp(wordsForImage, dataWeather, coordinates) {
  firstLoading();
  console.log(wordsForImage);
  app.style.background = `linear-gradient(180deg, rgba(8, 15, 26, 0.59) 0%,
     rgba(17, 17, 46, 0.46) 100%),url(${image.src})`;
    changeImagesWeather(dataWeather.daily);
    showElementsValues(coordinates, dataWeather);
    drawMap(coordinates);
    loadingIndicator.classList.add('hide');
    checkDegress();
}

function loadImages(dataForImage) {
  let url = '';
  [url] = dataForImage;
  image.setAttribute('data-src', url);
  image.setAttribute('src', image.getAttribute('data-src'));
}

function changeInnerTextElements(translatedWords) {
  for (let i = MIN_NUMBER; i < elements.length; i++) {
    elements[i].innerText = translatedWords[i];
  }
}

function showText(dataCity, city, weatherDescription) {
  const dataCityForTranslate = getDataCityForTranslate(dataCity, city);
  const wordsForTranslate = dataCityForTranslate.concat(weatherDescription);
  for (let i = MIN_NUMBER; i < staticElements.length; i++) {
    staticElements[i].innerText = keysStaticWords[i];
  }
  changeInnerTextElements(wordsForTranslate);
}

// async function getTranslateData(dataCity, city, weatherDescription) {
//   const dataCityForTranslate = getDataCityForTranslate(dataCity, city);
//   const wordsForTranslate = dataCityForTranslate.concat(weatherDescription);
//   const translatedWords = await getTranslatedWord(wordsForTranslate);
//   let result;
//   if (translatedWords.code > NUMBER_OK_CODE) {
//     showWrongResult(translatedWords.message);
//   } else {
//     result = translatedWords.text;
//   }
//   return result;
// }

async function getWeatherData(coordinates) {
  const dataWeather = await getWeather(coordinates);
  let result;
  if (dataWeather.cod) {
    showWrongResult(dataWeather.message);
  } else {
    result = dataWeather;
  }
  return result;
}

async function searchCity(city) {
  const dataCity = await getDataCity(city);
  let result;
  if (dataCity.status.code > NUMBER_OK_CODE) {
    showWrongResult(dataCity.status.message);
  } else if (dataCity.results[MIN_NUMBER]) {
    result = dataCity;
  } else {
    showWrongResult(city);
  }
  return result;
}

async function search(city) {
  const dataCity = await searchCity(city);
  const coordinates = dataCity.results[MIN_NUMBER].geometry;
  const dataWeather = await getWeatherData(coordinates);
  const weatherDescription = dataWeather.current.weather[MIN_NUMBER].description;
  const dataForImage = await getDataForImage(dataCity.results[MIN_NUMBER]);
  const wordsForImage = dataForImage[NUMBER_WORDS_FOR_IMAGE];
  showText(dataCity, city, weatherDescription);
  loadImages(dataForImage);
  image.onload = () => loadingApp(wordsForImage, dataWeather, coordinates);
  updateTime();
}

window.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    buttonSearch.click();
  }
});

buttonSearch.addEventListener('click', async () => {
  loadingIndicator.classList.remove('hide');
  if (input.value) {
    await search(input.value);
  }
});

async function searchCityByLocation() {
  const result = await getData(URL_FOR_LOCATION);
  if (result.error) {
    showWrongResult(result.error.message);
  } else {
    search(result.city);
  }
}

buttonUpdate.addEventListener('click', async () => {
  const dataForImage = await getDataForImage();
  const wordsForImage = dataForImage[NUMBER_WORDS_FOR_IMAGE];
  loadImages(dataForImage);
  image.onload = () => loadingApp(wordsForImage);
});

searchCityByLocation();
switchingDegress();