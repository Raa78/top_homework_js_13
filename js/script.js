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


let countdown;  // Инициализируем перменную для setInterval()

function timer(addTimerInHTML) {
    clearInterval(countdown);

    let elem = element.querySelector('.result');


    countdown = setInterval(() => {

        addTimerInHTML(elem, valueTimeCountdown.value());

        if (valueTimeCountdown.value() === 0) {
            clearInterval(countdown);
            return;
        }

        valueTimeCountdown.operation(-1);

    }, 250)
}


function addInHTML(elem, time) {

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60 - hours * 60);
    let seconds = time % 60;

    let display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    elem.innerHTML = display;
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
        timer(addInHTML);
    }

    if (button.id === 'btnReset') {
        console.log('click Reset');
        clearInterval(countdown);
        valueTimeCountdown = counter(0);

        let display = `00:00:00`;
        element.querySelector('.result').innerHTML = display;
    }


    if (button.id === 'btnPause') {
        console.log('click Pause');
        clearInterval(countdown);
    }

    if (button.id === 'btnPlay') {
        console.log('click Play');
        timer(addInHTML);
    }
})
);
