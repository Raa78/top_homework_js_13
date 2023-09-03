let hour = 0;
let minutes = 5;
let seconds = 5;


let secondsCount = counter(seconds);


let countdown = setInterval(() => {
    console.log(minutes);

    seconds--;


    console.log(seconds);

    if (
        hour === 0 &&
        minutes === 0 &&
        seconds === 0
    ) {
        clearInterval(countdown);
    }

    if (seconds === 0) {
        minutes--;
        seconds = 10;
    }
}, 1000)
