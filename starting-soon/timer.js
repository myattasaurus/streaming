let SECONDS = 1000;
let MINUTES = 60 * SECONDS;
let HOURS = 60 * MINUTES;
let DAYS = 24 * HOURS;

let timerElement;
let targetTimestamp;

function onLoad() {
    timerElement = document.getElementById('timer');

    requestAnimationFrame(timerAnimationTick);
}

function timerAnimationTick() {
    let timer = JSON.parse(localStorage.getItem('timer'));
    if (timer?.playing) {
        let timerTime = timer.target - Date.now();
        if (timerTime % SECONDS > 0) {
            timerTime += SECONDS;
        }
        let minusSign = timerTime < -SECONDS ? '-' : '';

        if (timerTime < 0) {
            timerTime = -timerTime;
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
    } else {
        timerElement.innerHTML = '';
    }
    requestAnimationFrame(timerAnimationTick);
}

function pad(timeUnit) {
    if (timeUnit < 10) {
        return '0' + timeUnit;
    }
    return timeUnit;
}