import 'babel-polyfill';
import { getData } from './searchCity';
import { buttonSwitchToCelsius, MIN_NUMBER } from './constants';

const NUMBER_DAYS = 4;
const imgs = document.querySelectorAll('.img-weather');

export function getWeatherToday(data) {
  const feels = `${Math.round(data.feels_like)}`;
  const humidity = `${Math.round(data.humidity)}`;
  const wind = `${Math.round(data.wind_speed)}`;
  return [feels, humidity, wind];
}

export function changeImagesWeather(data) {
  for (let i = MIN_NUMBER; i < imgs.length; i++) {
    imgs[i].src = `./img/${data[i].weather[MIN_NUMBER].main}.svg`;
  }
}

export function getWeatherOtherDays(data) {
  const degressOtherDays = [];
  for (let i = MIN_NUMBER; i < NUMBER_DAYS; i++) {
    degressOtherDays[i] = Math.round(data[i].temp.day);
  }
  return degressOtherDays;
}

export function getWeatherValues(data) {
  const dataForTranslate = [...getWeatherOtherDays(data.daily),
    ...getWeatherToday(data.current)];
  return dataForTranslate;
}

export function getUrl(coordinates) {
  const latitude = coordinates.lat;
  const longitude = coordinates.lng;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}
  &exclude=minutely,hourly&lang=en&units=metric&appid=b940ddb44a10590924b195caa5d36bd5`;
  url = url.replace(/\n| /g, '');
  return url;
}

export async function getWeather(coordinates) {
  const url = getUrl(coordinates);
  const data = await getData(url);
  if (buttonSwitchToCelsius) {
    buttonSwitchToCelsius.click();
  }
  return data;
}
