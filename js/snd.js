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
const dataArray = new Uint8Array(bufferLength);

const dataArray = new Uint8Array(analyser.frequencyBinCount);
var canvas = document.getElementById('canvas');
const canvasCtx = canvas.getContext('2d');
canvasCtx.fillStyle = 'firebrick';

const drawWave = () => { 
  // this gets called via requestAnimationFrame, so runs roughly every 16ms
  /* analyser.getByteTimeDomainData(dataArray);

  let lastPos = 0;
  dataArray.forEach((item, i) => {
    if (item > 128 && lastItem <= 128) { // we have crossed below the mid point
      const elapsedSteps = i - lastPos; // how far since the last time we did this
      lastPos = i;

      const hertz = 1 / (elapsedSteps / 44100);
      pitchSamples.push(hertz); // an array of every pitch encountered
    }

    canvasContext.fillRect(i, item, 1, 1); // point in the wave

    lastItem = item;
  }); */

  analyser.getByteTimeDomainData(dataArray);

  let lastPos = 0;
  dataArray.forEach((item, i) => {
    if (item > 128 && lastItem <= 128) { // we have crossed below the mid point
      const elapsedSteps = i - lastPos; // how far since the last time we did this
      lastPos = i;

      const hertz = 1 / (elapsedSteps / 44100);
      pitchSamples.push(hertz); // an array of every pitch encountered
    }

    canvasContext.fillRect(i, item, 1, 1); // point in the wave

    lastItem = item;
  });

  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, 300, 300);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  const sliceWidth = 200 * 1.0 / bufferLength;
  let x = 0;

  canvasCtx.beginPath();
  for(var i = 0; i < bufferLength; i++) {
    const v = dataArray[i]/128.0;
    const y = v * 300/2;

    if(i === 0)
      canvasCtx.moveTo(x, y);
    else
      canvasCtx.lineTo(x, y);

    x += sliceWidth;
  }

  canvasCtx.lineTo(200, 200/2);
  canvasCtx.stroke();

 

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