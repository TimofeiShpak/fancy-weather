import 'babel-polyfill';
import { MIN_NUMBER } from './constants';

const timeElement = document.querySelector('.time');

const NUMBER_DAYS = 3;
const NUMBER_FOR_RECIEVED_HOURS = 3;
const END_STRING_DATE = 16;
const NUMBER_MILLISECONDS = 1000;
const END_STRING_TIME = 25;
const START_STRING_TIME = 17;

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let receivedHours = 0;

export function getData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
}

export function getDateByTimeZone(start, end, data) {
  if (data) {
    receivedHours = Number(data.annotations.timezone.offset_string
      .slice(MIN_NUMBER, NUMBER_FOR_RECIEVED_HOURS));
  }
  const hours = new Date().getHours() + receivedHours;
  const date = new Date().setHours(hours);
  let currentDate = new Date(date);
  currentDate = currentDate.toUTCString().slice(start, end).replace(',', '');
  return currentDate;
}

export function getOtherDays() {
  const index = +new Date(new Date().setHours(new Date().getHours() + receivedHours)).getUTCDay();
  const result = weekdays.slice(index, index + NUMBER_DAYS);
  return result;
}

export async function getDataCity(city) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}
  &key=6888aefe473b4cdd8eb9974574e4c281&pretty=1&language=en`;
  const data = await getData(url);
  return data;
}

export function getDataCityForTranslate(data, city) {
  const dataCity = data.results[MIN_NUMBER];
  const date = getDateByTimeZone(MIN_NUMBER, END_STRING_DATE, dataCity);
  const titlesDays = getOtherDays();
  const nameCity = `${city}`;
  const nameCountry = ` ${dataCity.components.country}`;
  return [nameCity, nameCountry, date].concat(titlesDays);
}

export function updateTime() {
  setInterval(() => {
    timeElement.innerText = getDateByTimeZone(START_STRING_TIME, END_STRING_TIME);
  }, NUMBER_MILLISECONDS);
}
