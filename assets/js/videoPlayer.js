import getBlobDuration from "get-blob-duration";
const videoContainer = document.querySelector(".video__container");
let videoPlayer, playBtn, volumeBtn, currentTime, timerInterval, totalTime;

const PLAY_ICON = `<i class="fas fa-play"></i>`;
const PAUSE_ICON = `<i class="fas fa-pause"></i>`;
const VOLUME_MEDIUM = `<i class="fas fa-volume-down"></i>`;
const VOLUME_MUTED = `<i class="fas fa-volume-off"></i>`;

const formatDate = seconds => {
  var sec_num = parseInt(seconds, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

const handlePlayBtn = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playerPauseIcon();
    startTimerInterval();
  } else {
    playerPlayIcon();
    videoPlayer.pause();
    stopTimerInterval();
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeMediumIcon();
  } else {
    videoPlayer.muted = true;
    volumeMuteIcon();
  }
};

const handleEnded = () => {
  videoPlayer.currentTime = 0;
  stopTimerInterval();
  playerPlayIcon();
  setTime();
};

const setTime = () => {
  currentTime.innerHTML = formatDate(Math.ceil(videoPlayer.currentTime));
};

const startTimerInterval = () => {
  timerInterval = setInterval(setTime, 1000);
};

const stopTimerInterval = () => {
  clearInterval(timerInterval);
};

const getDuration = async () => {
  const blob = await fetch(videoPlayer.src).then(r => r.blob());
  const duration = await getBlobDuration(blob);
  totalTime.innerHTML = formatDate(Math.floor(duration));
};

const volumeMuteIcon = () => (volumeBtn.innerHTML = VOLUME_MUTED);
const volumeMediumIcon = () => (volumeBtn.innerHTML = VOLUME_MEDIUM);

const playerPlayIcon = () => (playBtn.innerHTML = PLAY_ICON);
const playerPauseIcon = () => (playBtn.innerHTML = PAUSE_ICON);

const initVideoPlayer = () => {
  videoPlayer = videoContainer.querySelector(".video__player");
  playBtn = videoContainer.querySelector("#js-play");
  volumeBtn = videoContainer.querySelector("#js-volume");
  currentTime = videoContainer.querySelector("#video__current-time");
  totalTime = videoContainer.querySelector("#video__total-time");
  getDuration();
  playBtn.addEventListener("click", handlePlayBtn);
  volumeBtn.addEventListener("click", handleVolumeClick);
  videoPlayer.addEventListener("ended", handleEnded);
  videoPlayer.volume = 0.5;
};

if (videoContainer) {
  initVideoPlayer();
}
