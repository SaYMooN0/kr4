let timerId = null;
let remainingSeconds = 0;
let totalSeconds = 0;

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");

const ring = document.querySelector(".ring");
const radius = 80;
const len = 2 * Math.PI * radius;
ring.style.strokeDasharray = len;

function setRingProgress(frac) {
    ring.style.strokeDashoffset = len * (1 - frac);
}

function showStartState() {
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    resumeBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
}

function showRunningState() {
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    resumeBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
}

function showPausedState() {
    startBtn.classList.add("hidden");
    stopBtn.classList.add("hidden");
    resumeBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
}

function format(sec) {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

function updateUI() {
    display.textContent = format(remainingSeconds);
    setRingProgress(remainingSeconds / totalSeconds);
}

function startTimer() {
    showRunningState();
    timerId = setInterval(() => {
        remainingSeconds--;
        updateUI();

        if (remainingSeconds <= 0) {
            clearInterval(timerId);
            timerId = null;
            showStartState();
            display.textContent = "00:00:00";
            setRingProgress(0);
        }
    }, 1000);

    updateUI();
}

startBtn.addEventListener("click", () => {
    const h = Number(document.getElementById("hours").value) || 0;
    const m = Number(document.getElementById("minutes").value) || 0;
    const s = Number(document.getElementById("seconds").value) || 0;

    totalSeconds = remainingSeconds = h * 3600 + m * 60 + s;

    if (totalSeconds <= 0) {
        alert("Введите корректное время");
        return;
    }

    startTimer();
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;
    showPausedState();
});

resumeBtn.addEventListener("click", () => {
    startTimer();
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;

    remainingSeconds = 0;
    totalSeconds = 1;

    showStartState();
    display.textContent = "00:00:00";
    setRingProgress(0);
});
