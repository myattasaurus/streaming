let playButton, pauseButton, timeInput;
let timer = {};

function onLoad() {
    playButton = document.getElementById('timer-play-button');
    pauseButton = document.getElementById('timer-pause-button');
    timeInput = document.getElementById('timer-time');

    timeInput.value = format(new Date());
    setPlaying(false);
}

function play() {
    setPlaying(true);
}

function pause() {
    timeInput.value = format(new Date(Math.max(Date.now(), timer.target)));
    setPlaying(false);
}

function setPlaying(isPlaying) {
    timer.playing = isPlaying;
    timer.target = Date.parse(timeInput.value);

    playButton.disabled = isPlaying;
    pauseButton.disabled = !isPlaying;
    timeInput.disabled = isPlaying;
    save();
}

function save() {
    localStorage.setItem('timer', JSON.stringify(timer));
}

function format(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    return year + "-" + pad(month) + "-" + pad(day) + "T" + pad(hour) + ":" + pad(minute);
}

function pad(num) {
    return num < 10 ? '0' + num.toString() : num;
}