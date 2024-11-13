let SECONDS = 1000;
let MINUTES = 60 * SECONDS;
let HOURS = 60 * MINUTES;
let DAYS = 24 * HOURS;

let timerElement;
let targetTimestamp;

function onLoad() {
    timerElement = document.getElementById('timer');
    requestAnimationFrame(firstTimerAnimationTick);
}

function firstTimerAnimationTick(timestamp) {
    targetTimestamp = 1 * HOURS + 10 * SECONDS + timestamp;
    requestAnimationFrame(timerAnimationTick);
}

function timerAnimationTick(timestamp) {
    let timerTime = targetTimestamp - timestamp;
    let minusSign = '';

    if (timerTime < 0) {
        timerTime = -timerTime + 1000;
        minusSign = '-';
    }

    let days = Math.floor(timerTime / DAYS);
    let hours = Math.floor(timerTime / HOURS % 24);
    let minutes = Math.floor(timerTime / MINUTES % 60);
    let seconds = Math.floor(timerTime / SECONDS % 60);

    let displayTime = minusSign;
    if (days > 0) {
        displayTime += days + ':' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    } else if (hours > 0) {
        displayTime += hours + ':' + pad(minutes) + ':' + pad(seconds);
    } else {
        displayTime += minutes + ':' + pad(seconds);
    }

    if (timerElement.innerHTML !== displayTime) {
        timerElement.innerHTML = displayTime;
    }
    requestAnimationFrame(timerAnimationTick);
}

function pad(timeUnit) {
    if (timeUnit < 10) {
        return '0' + timeUnit;
    }
    return timeUnit;
}