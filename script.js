var audio = document.getElementById('audio');
var playpause = document.getElementById("play");

var trackList = ["londoncalling.mp3", "letsmakeit.mp3"];
var trackListName = ["London Calling", "Lets Make It"];
var current = 0;

var timer;
var percent = 0;
var visFlag = true;

document.getElementById("audio");
audio.addEventListener("playing", function(_event) {
  var duration = _event.target.duration;
  advance(duration, audio);
});
audio.addEventListener("pause", function(_event) {
  clearTimeout(timer);
});
var advance = function(duration, element) {
  var progress = document.getElementById("progress");
  increment = 10/duration
  percent = Math.min(increment * element.currentTime * 10, 100);
  progress.style.width = percent+'%'
  startTimer(duration, element);
}
var startTimer = function(duration, element){ 
  if(percent < 100) {
    timer = setTimeout(function (){advance(duration, element)}, 100);
  }
}

function togglePlayPause() {
   if (audio.paused || audio.ended) {
      playpause.title = "Pause";
      audio.play();
   } else {
      playpause.title = "Play";
      audio.pause();
   }
}

function ShowHideProgress() {

	if (visFlag) {
		visFlag = false;
		document.getElementById("progress").style.visibility = "hidden";
	} else {
		visFlag = true;
		document.getElementById("progress").style.visibility = "visible";
	}
	
}

function nextSong() {
	
	current++;
	
	if (current > 1) {
		current = 0;
		audio.src = trackList[current];
		document.getElementById("trackTitle").innerHTML = trackListName[current];
		document.getElementById("trackTitle2").innerHTML = trackListName[current];
	} else {
		document.getElementById("trackTitle").innerHTML = trackListName[current];
		document.getElementById("trackTitle2").innerHTML = trackListName[current];
		audio.src = trackList[current];
	}
	
	playpause.title = "Play";
	audio.load();
	audio.play();
}

function playPrevious() {
	
	current--;
	
	if (current < 1) {
		current = 0;
		audio.src = trackList[current];
		document.getElementById("trackTitle").innerHTML = trackListName[current];
		document.getElementById("trackTitle2").innerHTML = trackListName[current];
	} else {
		document.getElementById("trackTitle").innerHTML = trackListName[current];
		document.getElementById("trackTitle2").innerHTML = trackListName[current];
		audio.src = trackList[current];
	}
	
	playpause.title = "Play";
	audio.load();
	audio.play();
}

function playPryda() {
	
	current = 1;
	document.getElementById("trackTitle").innerHTML = trackListName[current];
	document.getElementById("trackTitle2").innerHTML = trackListName[current];
	playpause.title = "Pause";
	audio.src="letsmakeit.mp3";
	audio.load();
	audio.play();
	
}

function playParkLife() {
	
	current = 0;
	document.getElementById("trackTitle").innerHTML = trackListName[current];
	document.getElementById("trackTitle2").innerHTML = trackListName[current];
	playpause.title = "Pause";
	audio.src="londoncalling.mp3";
	audio.load();
	audio.play();
	
}
	
