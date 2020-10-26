const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const pitchSamples = [];
let audioReady = false;

navigator.mediaDevices.getUserMedia(
  {audio: true},
  stream => {
    audioContext.createMediaStreamSource(stream).connect(analyser);
    audioReady = true;
  },
  err => console.log(err)
);

analyser.fftSize = 2048;
const bufferLength = analyser.fftSize;

const dataArray = new Uint8Array(analyser.frequencyBinCount);
var canvas = document.getElementById('canvas');
const canvasCtx = canvas.getContext('2d');
canvasCtx.fillStyle = 'firebrick';

const drawWave = () => { 
  

  analyser.getByteTimeDomainData(dataArray);

  let lastPos = 0;
  dataArray.forEach((item, i) => {
    if (item > 128 && lastItem <= 128) { // we have crossed below the mid point
      const elapsedSteps = i - lastPos; // how far since the last time we did this
      lastPos = i;

      const hertz = 1 / (elapsedSteps / 44100);
      pitchSamples.push(hertz); // an array of every pitch encountered
    }

    canvasCtx.fillRect(i, item, 1, hertz); // point in the wave

    lastItem = item;
  });

};

const renderAudio = () => {
  requestAnimationFrame(renderAudio);
  //if (!audioReady) return;
  canvasCtx.clearRect(0, 0, 1024, 300);
  drawWave();
};

renderAudio(); // kick the whole thing off

setInterval(() => {
   // defined elsewhere, will get the average pitch and render a key
}, 250);