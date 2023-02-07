import { declOfNum, formatNum } from "./help.js";

const createTimer = (app) => {
  const title = document.createElement('p');
  title.classList.add('main__text', 'main__text-promo');
  title.innerText = 'До конца акции:';

  const timer = document.createElement('p');
  timer.classList.add('main__text', 'main__text-timer');

  const timerBlockDay = document.createElement('span');
  timerBlockDay.classList.add('main__text', 'main__text-number', 'main__text-numDay');
  timerBlockDay.innerText = '00';
  const textBlockDay = document.createElement('span');
  textBlockDay.classList.add('main__text', 'main__text-textDay');
  textBlockDay.innerText = 'дней';

  const timerBlockHour = document.createElement('span');
  timerBlockHour.classList.add('main__text', 'main__text-number', 'main__text-numHour');
  timerBlockHour.innerText = '00';
  const textBlockHour = document.createElement('span');
  textBlockHour.classList.add('main__text', 'main__text-textHour');
  textBlockHour.innerText = 'часов';

  const timerBlockMin = document.createElement('span');
  timerBlockMin.classList.add('main__text', 'main__text-number', 'main__text-numMinute');
  timerBlockMin.innerText = '00';
  const textBlockMin = document.createElement('span');
  textBlockMin.classList.add('main__text', 'main__text-textMin');
  textBlockMin.innerText = 'минут';

  timer.append(timerBlockDay, textBlockDay, timerBlockHour, textBlockHour, timerBlockMin, textBlockMin);
  app.append(title, timer);

  return {timerBlockDay, textBlockDay, timerBlockHour, textBlockHour, timerBlockMin, textBlockMin}
}

const timer = (deadline, app, timerDeadline) => {
  // const timerBlockDay = document.querySelector('.main__text-numDay');
  // const timerBlockHour = document.querySelector('.main__text-numHour');
  // const timerBlockMin = document.querySelector('.main__text-numMinute');
  //
  // const textBlockDay = document.querySelector('.main__text-textDay');
  // const textBlockHour = document.querySelector('.main__text-textHour');
  // const textBlockMin = document.querySelector('.main__text-textMin');

  const getTimeRemaining = () => {
    const dateStop = (new Date(deadline + ' GMT+0300')).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const seconds = Math.floor(timeRemaining / 1000 % 60);

    return {timeRemaining, days, hours, minutes, seconds};
  };


  const start = () => {
    const timer = getTimeRemaining();

    timerDeadline.timerBlockDay.textContent = timer.days;
    timerDeadline.timerBlockHour.textContent = formatNum(timer.hours);
    timerDeadline.timerBlockMin.textContent = formatNum(timer.minutes);

    timerDeadline.textBlockDay.textContent = declOfNum(timer.days, ['день', 'дня', 'дней']);
    timerDeadline.textBlockHour.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']);
    timerDeadline.textBlockMin.textContent = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);

    const intervalDays = setTimeout(start, 60000);

    if (timer.days === 0 && timer) {
      clearTimeout(intervalDays)
      timerDeadline.timerBlockDay.textContent = formatNum(timer.hours);
      timerDeadline.timerBlockHour.textContent = formatNum(timer.minutes);
      timerDeadline.timerBlockMin.textContent = formatNum(timer.seconds);

      timerDeadline.textBlockDay.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']);
      timerDeadline.textBlockHour.textContent = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);
      timerDeadline.textBlockMin.textContent = declOfNum(timer.seconds, ['секунда', 'секунды', 'секунд']);

      const intervalHours = setTimeout(start, 1000);
      if (timer.timeRemaining <= 0) {
        clearTimeout(intervalHours);
      }
    }

    if (timer.timeRemaining <= 0) {
      app.classList.add('main__not-visible');
    }
  };

  start();
};


const init = () => {
  const app = document.querySelector('[data-timer-deadline]');
  const deadline = app.dataset.timerDeadline;
  app.innerText = '';
  const timerDeadline = createTimer(app);
  timer(deadline, app, timerDeadline);
};

init();
