'use strict'

const element = document.querySelector('.timerCountdown');


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

    let elem2 = element.querySelector('.progressLine');


    countdown = setInterval(() => {

        addTimerInHTML(elem, elem2, timeCountdown.value());


        if (timeCountdown.value() === 0) {
            clearInterval(countdown);
            return;
        }

        timeCountdown.operation(-1);

    }, 250)
}


function addInHTML(elem, elem2, time) {

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60 % 60);
    let seconds = time % 60;

    let display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    elem.innerHTML = display;

    let progressLine = (startCountdown - time) * (360 / startCountdown);

    elem2.style.setProperty('background', `conic-gradient(#fff ${progressLine}deg, #ffffff00 0deg)`);

    // let x = startCountdown - time;
    // let y = 360 / startCountdown;

    // console.log(
    //     'tartCountdown - time =', x,
    //     '360 / startCountdown=', y,
    //     'progressLine=', progressLine,
    // );
}


const btn = element.querySelectorAll('.btn');

btn.forEach((button) => button.addEventListener('click', () => {

    if (button.id === 'btnCountdown') {
        console.log('click Countdown');

        let hours = parseInt(document.querySelector('#hours').value);
        let minutes = parseInt(document.querySelector('#minutes').value);
        let seconds = parseInt(document.querySelector('#seconds').value);

        let timeCountdowninSeconds = hours * 3600 + minutes * 60 + seconds;

        valueTimeCountdown = counter(timeCountdowninSeconds);

        startCountdown = valueTimeCountdown.value();

        timer(valueTimeCountdown, addInHTML);
    }

    if (button.id === 'btnReset') {
        console.log('click Reset');
        clearInterval(countdown);
        valueTimeCountdown = counter(0);

        let display = '00:00:00';
        element.querySelector('.result span').innerHTML = display;
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
