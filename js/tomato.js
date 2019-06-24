const workTime = 10;
const restTime = 5;
const longRestTime = 10;
var roundsComplete = 0;
var countdown;
var pauseActive = false;
var intervalID;
var countdownNumberEl = document.getElementById("countdown-number");
var stepsArray = ['Round 1', 'Round 2', 'Round 3', 'Round 4', ];

jQuery(document).ready(function ($) {
  progressBar();
});

function progressBar() {
  $('#steps').progressbar({
    steps: stepsArray
  });
}

function triggerProgress(step) {
  $('#steps').html("");
  //Remove the marker from the previous step
  if (step > 0) {
    stepsArray[step-1] = stepsArray[step-1].replace('@', '');
  } else if (roundsComplete > 0 && step == 0) {
    stepsArray[3] = stepsArray[3].replace('@', '');
  }

  if (step < 4) {
    stepsArray[step] += '@';
  }
  else {
    step = 0;
    stepsArray[step] += '@';
  }

  progressBar();
}

$('.full-tomato').click((event) => {
  if ($('.full-tomato').hasClass('split')) {
    timeLeft = (countdownNumberEl.textContent).split(':');
    countdown = Number(timeLeft[0] * 60) + Number(timeLeft[1]);
    pauseTimer();
  } else {
    pauseActive ? restartTimer() : startTimer();
  }
})

function startTimer() {
  window.clearInterval(intervalID);
  pauseActive = false;
  triggerProgress(roundsComplete%4);
  $('.full-tomato').addClass('split');

  //Set timer to 25 mins if not in the middle of a pause
  if (!pauseActive) { var countdown = workTime; }

  countdownNumberEl.textContent = toTime(countdown);

  intervalID = setInterval(function() {
    --countdown;
    if (countdown <= 0) {
      countdown = 0;
      restBreak();
    }
    countdownNumberEl.textContent = toTime(countdown);
  }, 1000);
  alert('Start working!');
}

//Pauses the timer
function pauseTimer() {
  $('.full-tomato').removeClass('split');
  pauseActive = true;
  window.clearInterval(intervalID);
}

//Restarts the timer after a pause
function restartTimer() {
  pauseActive = false;
  $('.full-tomato').addClass('split');
  intervalID = setInterval(function() {
    --countdown;
    if (countdown <= 0) {
      countdown = 0;
      restBreak();
    }
    countdownNumberEl.textContent = toTime(countdown);
  }, 1000);
}

function restBreak() {
  //End the current work interval
  window.clearInterval(intervalID);
  ++roundsComplete;

  if (roundsComplete%4 == 0) { //Long break every 4th round
    countdown = longRestTime;
    intervalID = setInterval(function() {
      --countdown;
      if (countdown <= 0) {
        countdown = 0;
        startTimer();
      }
      countdownNumberEl.textContent = toTime(countdown);
    }, 1000);
    alert('Take an extra long break! You\'ve earned it!');
  } else { //Short break
    countdown = restTime;
    intervalID = setInterval(function() {
      --countdown;
      if (countdown <= 0) {
        countdown = 0;
        startTimer();
      }
      countdownNumberEl.textContent = toTime(countdown);
    }, 1000);
    alert('Take a break!');
  }
}

//Convert seconds to minutes and seconds with colon
function toTime (val) {
  return Math.floor(val/60).toString().padStart(2, '0') + ':' + (val%60).toString().padStart(2, '0');
}
