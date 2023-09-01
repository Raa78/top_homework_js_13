'use strict'


let element = document.querySelector('.container');

let startValueCountdown = {
    hour: 1,
    minutes: 0,
    seconds: 0,
};

let countdown;

function timer() {

    clearInterval(countdown);

    countdown = setInterval(() => {

        console.log('timer =', `${this.hour}:${this.minutes < 10 ? '0' : ''}${this.minutes}:${this.seconds < 10 ? '0' : ''}${this.seconds}`);

        if (this.hour === 0 && this.minutes === 0 && this.seconds === 0) {
            clearInterval(countdown);
        }

        if (this.seconds === 0) {
            this.minutes == 0 ? 0 : this.minutes--;
            this.seconds = 60;
        }

        this.seconds--;

        if (this.hour > 0 && this.minutes === 0) {
            this.hour--;
            this.minutes = 59;
        }

    }, 250)
}


// timer.call(startValueCountdown);

element.addEventListener('click', (event) => {
    if (event.target.dataset.num == '1') {
        startValueCountdown.minutes = parseInt(document.querySelector('#minutes').value);

        timer.call(startValueCountdown);
        console.log(startValueCountdown)
    };
    // console.log(event.target.dataset.num == '1');
});



// Вариант 2
let testStartValueCountdown = {
    hour: 0,
    minutes: 1,
    seconds: 30,
    timeCountdowninSeconds: null,
    timerTotal: function () {
        this.timeCountdowninSeconds = this.hour * 3600 + this.minutes * 60 + this.seconds
    },
};

// let timeCountdowninSeconds = testStartValueCountdown.hour * 3_600 + testStartValueCountdown.minutes * 60 + testStartValueCountdown.seconds;


function timerTetst2() {
    this.timerTotal();
    console.log(this);

    countdown = setInterval(() => {

        let hour = Math.floor(this. timeCountdowninSeconds / 3600);
        let minutes = Math.floor(this. timeCountdowninSeconds / 60 - hour * 60);
        let seconds = this. timeCountdowninSeconds % 60;

        console.log('timer = ' + `${hour}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

        if (this. timeCountdowninSeconds === 0) {
            clearInterval(countdown);
        }

        this.timeCountdowninSeconds--;

    }, 250)
}


// timerTetst2.call(testStartValueCountdown);

element.addEventListener('click', (event) => {
    if (event.target.dataset.num == '1') {
        startValueCountdown.minutes = parseInt(document.querySelector('#minutes').value);

        timer.call(startValueCountdown);
        console.log(startValueCountdown)
    };
    // console.log(event.target.dataset.num == '1');
});
