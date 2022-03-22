const videoElement = document.querySelector("#video");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const snapshotButton = document.querySelector("#snapshot");
// 화면캡쳐(video)를 시작하는 함수
async function startCapture() {
  try {
    const displayMediaOptions = { audio: false, video: { cursor: "always" } };
    const captureStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    videoElement.srcObject = captureStream;
    startButton.disabled = true;
    stopButton.disabled = false;
    snapshotButton.disabled = false;
  } catch (err) {
    console.error(err);
  }
}
// 화면캡쳐를 중지하는 함수
function stopCapture() {
  const tracks = videoElement.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
  videoElement.srcObject = null;
  startButton.disabled = false;
  stopButton.disabled = true;
  snapshotButton.disabled = true;
}
// 스냅샷을 찍는 함수
async function takeSnapshot() {
  const track = videoElement.srcObject.getVideoTracks()[0];
  const imageCapture = new ImageCapture(track);
  const image = await imageCapture.grabFrame();
  // ...
}
startButton.addEventListener("click", startCapture);
stopButton.addEventListener("click", stopCapture);
snapshotButton.addEventListener("click", takeSnapshot);
