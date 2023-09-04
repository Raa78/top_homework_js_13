'use strict'

// const element = document.querySelector('.timerCountdown');
const element = document.querySelector('.timers');


function counter(arg) { // путем замыкания делаем независисимые счетчики
    let privateCounter = arg;

    return {
        operation(val) {
            privateCounter += val;
        },
        value() {
            return privateCounter;
        },
    }
};


let valueTimeCountdown = counter();  // Инициализируем счетчик через функцию с замыканимем
let valueTimeCountdown1 = counter(18000); // тестовое значение, проврека можно ли перадть другой счетчик

let countdown;  // Инициализируем перменную для setInterval()

let startCountdown = 0;

function timer(timeCountdown, addTimerInHTML) {
    clearInterval(countdown);

    let elem = element.querySelector('.result span');

    countdown = setInterval(() => {

        addTimerInHTML(elem, timeCountdown.value());


        if (timeCountdown.value() === 0) {
            clearInterval(countdown);
            return;
        }

        timeCountdown.operation(-1);

    }, 1000)
}


function addInHTML(elem, time) {

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60 % 60);
    let seconds = time % 60;

    let display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    elem.innerHTML = display;

    let progressLine = startCountdown === 0 ? 0 : (startCountdown - time) * (360 / startCountdown);

    document.documentElement.style.setProperty('--marker', `${progressLine}deg`);
}


const btn = element.querySelectorAll('.btn');

btn.forEach((button) => button.addEventListener('click', () => {

    if (button.id === 'btnCountdown') {
        console.log('click Countdown');

        let hours = document.querySelector('#hours').value == '' ? 0 : parseInt(document.querySelector('#hours').value);
        let minutes = document.querySelector('#minutes').value == '' ? 0 : parseInt(document.querySelector('#minutes').value);
        let seconds = document.querySelector('#seconds').value == '' ? 0 : parseInt(document.querySelector('#seconds').value);

        let timeCountdowninSeconds = hours * 3600 + minutes * 60 + seconds;

        valueTimeCountdown = counter(timeCountdowninSeconds);

        startCountdown = valueTimeCountdown.value();
        console.log(startCountdown);

        if (startCountdown > 0) {
            element.querySelector('.timerCountdown_time-entry').classList.toggle('section_hide');
            element.querySelector('.timerCountdown__display-result').classList.toggle('section_hide');

            timer(valueTimeCountdown, addInHTML);
        }

    }

    if (button.id === 'btnReset') {
        console.log('click Reset');

        clearInterval(countdown);
        valueTimeCountdown = counter(0);

        let display = '00:00:00';
        element.querySelector('.result span').innerHTML = display;

        document.documentElement.style.setProperty('--marker', '0deg');

        element.querySelector('.timerCountdown_time-entry').classList.toggle('section_hide');
        element.querySelector('.timerCountdown__display-result').classList.toggle('section_hide');
    }

    if (button.id === 'btnPause') {
        console.log('click Pause');

        if (valueTimeCountdown.value() > 0) {  // делаем проверку тймеры > 0, что бы просто так не менять кнопку
            clearInterval(countdown);

            element.querySelectorAll('.btnPausePlay .btn').forEach((button) => {
                button.classList.toggle('btn_hide');
            });

        }

    }

    if (button.id === 'btnPlay') {
        console.log('click Play');

        if (valueTimeCountdown.value() > 0) {  // делаем проверку тймеры > 0, что бы просто так не менять кнопку
            timer(valueTimeCountdown, addInHTML);

            element.querySelectorAll('.btnPausePlay .btn').forEach((button) => {
                button.classList.toggle('btn_hide');
            });

        }
    }

})
);


element.querySelectorAll('.timers__tabs .tab').forEach((tab) => tab.addEventListener('click', () => {
    console.log(tab);

    element.querySelectorAll('.timers__tabs .tab').forEach((tab1) =>  {
        tab1.classList.remove('active');
    });
    tab.classList.toggle('active');

})
);
