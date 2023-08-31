// let startValueCountdown = {
//     hour: 0,
//     minutes: 0,
//     seconds: 30,
// }

let hour = 0;
let minutes = 5;
let seconds = 5;

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

let secondsCount = counter(seconds);
// let secondsCount = counter.call(startValueCountdown.seconds);


let countdown = setInterval(() => {
    console.log(minutes);

    // secondsCount.operation(-1);
    seconds--;


    // console.log(secondsCount.value());
    console.log(seconds);

    if (
        hour === 0 &&
        minutes === 0 &&
        // secondsCount.value() === 0
        seconds === 0
        ) {
        clearInterval(countdown);
    }

    // if (secondsCount.value() === 0) {
    if (seconds === 0) {
        minutes--;
        // secondsCount = counter(10);
        seconds = 10;
    }
}, 1000)
