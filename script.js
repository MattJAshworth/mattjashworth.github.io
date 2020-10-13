// PRESS THE MENU BUTTON TO TRIGGER ANIMATION
// PRESS PLAY BUTTON TO LISTEN THE DEMO SONG

// As seen on: "https://dribbble.com/shots/2144866-Day-5-Music-Player-Rebound/"

// THANK YOU!

var audio = document.getElementById('audio');
var playpause = document.getElementById("play");

var trackList = ["londoncalling.mp3", "letsmakeit.mp3"];
var trackListName = ["London Calling", "Lets Make It"];
var current = 0;

function togglePlayPause() {
   if (audio.paused || audio.ended) {
      playpause.title = "Pause";
      audio.play();
   } else {
      playpause.title = "Play";
      audio.pause();
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
	