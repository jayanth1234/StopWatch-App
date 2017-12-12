"use strict";

var timer = null;
var time = 0;
var isStopped = true;
var lastRecordedTime = null;

function startTimer() {
  if (isStopped) {
    timer = setInterval(function() {
      time++;
      displayTimer();
    }, 10);
    isStopped = false;
  } else {
    isStopped = true;
    clearInterval(timer);
  }
}

function resetTime() {
  time = 0.0;
  lastRecordedTime = null;
  displayTimer();
  clearPastTimes();
}

function displayTimer() {
  document.querySelector("#counter").innerHTML = time / 100 + "";
}

function clearPastTimes() {
  document.querySelector("#pastTimes").innerHTML = "";
}

function recordTime() {
  if (time != 0) {
    if (lastRecordedTime == time) {
      alert("Recording duplicate times");
    } else {
      lastRecordedTime = time;
      document.querySelector("#pastTimes").innerHTML +=
        document.querySelector("#counter").innerHTML + "<br/>";
    }
  } else {
    alert("Timer not yet started to record");
  }
}

function addEventListeners() {
  var clickMap = {
    startStop: startTimer,
    reset: resetTime,
    record: recordTime
  };

  for (var x in clickMap) {
    document.querySelector("#" + x).addEventListener("click", clickMap[x]);
  }

  document.addEventListener("keypress", function() {
    var key = event.key.toLowerCase();
    switch (key) {
      case "s":
        startTimer();
        break;
      case "r":
        resetTime();
        break;
      case "t":
        recordTime();
        break;
    }
  });
}

function onLoad() {
  addEventListeners();
}
