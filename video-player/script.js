// get DOM elements we need
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play & pause video
function toggleVideoStatus() { //creating a function to toggle play/pause status
  if (video.paused) { //if video is paused - using property video.paused
    video.play(); //show the play icon with play() method
  } else { //otherwise if video is playing
    video.pause(); //show pause icon with pause() method
  }
}

// update play/pause icon
function updatePlayIcon() { //function to update visual elements for play/pause
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update progress & timestamp
function updateProgress() { //this moves the time dial as percentage from 1% to 100%
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60); //
  if (mins < 10) { //if minutes are less than 10..
    mins = '0' + String(mins); //then mins = 0 plus mins
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) { //if seconds are less than 10..
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`; //template string to show seconds and minutes
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() { //we have to use a trick to stop video as there is no stop method
  video.currentTime = 0; //when we run stopVideo function we set current time to 0 (start)
  video.pause(); //then we pause it.. just like stop, right?
}

// Event listeners
video.addEventListener('click', toggleVideoStatus); //on click run togglevideostatus
video.addEventListener('pause', updatePlayIcon); //changes play icon to pause icon
video.addEventListener('play', updatePlayIcon); // changes pause icon to play icon
video.addEventListener('timeupdate', updateProgress); //updates time as video plays

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo); //runs stopvideo function

progress.addEventListener('change', setVideoProgress);