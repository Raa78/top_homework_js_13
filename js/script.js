let hour = 1;
let minutes = 5;
let seconds = 5;


let countdown = setInterval(() => {

    seconds--;

    console.log('hour=', hour);
    console.log('minutes=', minutes);
    console.log('seconds=', seconds);

    if (hour === 0 && minutes === 0 && seconds === 0) {
        clearInterval(countdown);
    }

    if (seconds === 0) {
        minutes--;
        seconds = 10;
    }

    if (hour > 0 && minutes === 0) {
        hour --;
        minutes = 5;
    }

}, 1000)
