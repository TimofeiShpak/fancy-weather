import { buttonSwitchToCelsius, degressDays } from './constants';

const buttonSwitchToFahrenheit = document.querySelector('.degressF');
const COEFFICIENT = 1.8;
const VALUE_FOR_SWITCH = 32;

let saveDegress = JSON.parse(localStorage.getItem('degress'));
let typeDegrees = 'celsius';

export function checkDegress() {
  if (saveDegress === 'fahrenheit') {
    typeDegrees = 'celsius';
    buttonSwitchToFahrenheit.click();
  }
}

export function switchingToFahrenheit(value) {
  return Math.round(value * COEFFICIENT + VALUE_FOR_SWITCH);
}

export function switchingToCelsius(value) {
  return Math.round((value - VALUE_FOR_SWITCH) / COEFFICIENT);
}

function savingDegress() {
  saveDegress = JSON.stringify(typeDegrees);
  localStorage.setItem('degress', saveDegress);
}

function switchAllElementsDegress(functionSwitching) {
  const switching = functionSwitching;
  degressDays.forEach((item) => {
    const element = item;
    element.innerText = switching(element.innerText);
  });
}

export function switchingDegress() {
  buttonSwitchToCelsius.addEventListener('click', () => {
    if (typeDegrees === 'fahrenheit') {
      typeDegrees = 'celsius';
      switchAllElementsDegress(switchingToCelsius);
      savingDegress();
      buttonSwitchToCelsius.classList.add('active-degress');
      buttonSwitchToFahrenheit.classList.remove('active-degress');
    }
  });

  buttonSwitchToFahrenheit.addEventListener('click', () => {
    if (typeDegrees === 'celsius') {
      typeDegrees = 'fahrenheit';
      switchAllElementsDegress(switchingToFahrenheit);
      savingDegress();
      buttonSwitchToFahrenheit.classList.add('active-degress');
      buttonSwitchToCelsius.classList.remove('active-degress');
    }
  });
}
