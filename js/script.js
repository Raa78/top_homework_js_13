// let hour = 2;
// let minutes = 0;
// let seconds = 0;

let element = document.querySelector('.container');

let startValueCountdown = {
    hour: 0,
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
