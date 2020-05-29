const recorderContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordBtn');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObj = {};

const handleVideoData = (event) => {
  console.log(event);
};
const startRecording = () => {
  const videoRecorder = new MediaRecorder(streamObj);
  videoRecorder.start();
  //console.log(videoRecorder);
  videoRecorder.addEventListener('dataavailabe', handleVideoData);
};
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = 'Stop Recording';
    streamObj = stream;
    startRecording(stream);
  } catch (err) {
    recordBtn.innerHTML = "Can't Record";
  } finally {
    recordBtn.removeEventListener('click', getVideo);
  }
};

function init() {
  recordBtn.addEventListener('click', getVideo);
}

if (recorderContainer) {
  init();
}
