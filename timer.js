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

  const declOfNum = (n, text_forms) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 === 1) { return text_forms[0]; }
    return text_forms[2];
  };

  const start = () => {
    const timer = getTimeRemaining();

    timerDeadline.timerBlockDay.textContent = timer.days;
    timerDeadline.timerBlockHour.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
    timerDeadline.timerBlockMin.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;

    timerDeadline.textBlockDay.textContent = declOfNum(timer.days, ['день', 'дня', 'дней']);
    timerDeadline.textBlockHour.textContent = declOfNum(timer.hours, ['час', 'часа', 'часов']);
    timerDeadline.textBlockMin.textContent = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);

    const intervalDays = setTimeout(start, 60000);

    if (timer.days === 0 && timer) {
      clearTimeout(intervalDays)
      timerDeadline.timerBlockDay.textContent = timer.hours < 10 ? '0' + timer.hours : timer.hours;
      timerDeadline.timerBlockHour.textContent = timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
      timerDeadline.timerBlockMin.textContent = timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;

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
