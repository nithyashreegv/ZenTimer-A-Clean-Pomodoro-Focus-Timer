let isRunning = false;
let timer;
let round = 0;
let isBreak = false;
let timeLeft = 1500;

const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');

function updateDisplay() {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `${mins}:${secs}`;
}

function animateTimer() {
  timerDisplay.classList.add('animate');
  setTimeout(() => timerDisplay.classList.remove('animate'), 200);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  statusDisplay.textContent = isBreak ? 'Break Time! ☕' : 'Focusing... 🧠';

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
      animateTimer();
    } else {
      clearInterval(timer);
      isRunning = false;
      new Audio('https://www.soundjay.com/button/beep-07.wav').play();
      round++;
      if (isBreak) {
        timeLeft = 1500;
        isBreak = false;
        statusDisplay.textContent = 'Back to focus! 🧠';
      } else {
        timeLeft = (round % 4 === 0) ? 900 : 300;
        isBreak = true;
        statusDisplay.textContent = (round % 4 === 0) ? 'Long Break! 💤' : 'Short Break! ☕';
      }
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  statusDisplay.textContent = 'Paused ⏸️';
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 1500;
  isBreak = false;
  round = 0;
  updateDisplay();
  statusDisplay.textContent = 'Ready to focus!';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const icon = document.querySelector('.toggle-mode');
  icon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

updateDisplay();

