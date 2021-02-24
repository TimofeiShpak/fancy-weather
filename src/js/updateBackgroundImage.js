import 'babel-polyfill';
import { getData, getDateByTimeZone } from './searchCity';
import { MIN_NUMBER, NUMBER_FOR_ROUND } from './constants';

const seasonsNorth = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer',
  'summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter'];
const seasonsSouth = ['summer', 'summer', 'autumn', 'autumn', 'autumn', 'winter',
  'winter', 'winter', 'spring', 'spring', 'spring', 'summer'];

const END_STRING_HOURS = 19;
const START_STRING_HOURS = 17;


let valueTimeDay = '';
let valueSeason = '';

export function getHours() {
  const hours = +getDateByTimeZone(START_STRING_HOURS, END_STRING_HOURS);
  return hours;
}

export function getTimeDay(hours) {
  let timeDay = '';
  switch (true) {
    case (hours >= 5) && (hours < 11): timeDay = 'morning';
      break;
    case (hours >= 11) && (hours < 16): timeDay = 'afternoon';
      break;
    case (hours >= 16) && (hours <= 23): timeDay = 'evening';
      break;
    default: timeDay = 'night';
      break;
  }
  return timeDay;
}

export function getSeason(valueLatitudes) {
  const latitudes = valueLatitudes.toFixed(NUMBER_FOR_ROUND);
  let season = '';
  if (latitudes > MIN_NUMBER) {
    season = seasonsNorth[new Date().getMonth()];
  } else {
    season = seasonsSouth[new Date().getMonth()];
  }
  return season;
}

async function getImage(season, timeDay) {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=
  ${season} ${timeDay}&client_id=kt2n-jRZPlVWLvtuGe2vJqDRKL0kiH3ZZ-Kb5Cy3ayM`;
  let result = await getData(url);
  if (result.errors) {
    showWrongResult(result.errors[MIN_NUMBER]);
    result = `./img/bg${Math.round(Math.random() * 2)}.png`;
  } else {
    result = result.urls.full;
  }
  return result;
}

function getValuesForImage(data) {
  if (data) {
    const valueLatitudes = data.geometry.lat;
    const hours = getHours();
    valueTimeDay = getTimeDay(hours);
    valueSeason = getSeason(valueLatitudes);
  }
}

export async function getDataForImage(data) {
  getValuesForImage(data);
  const imageSrc = await getImage(valueSeason, valueTimeDay);
  const result = `words for search image: '${valueSeason} ${valueTimeDay}'`;
  return [imageSrc, result];
}
