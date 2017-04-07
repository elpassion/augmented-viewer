export default class Streamer {
  constraints = {
    audio: false,
    video: {
      width: { min: 480, ideal: 640, max: 640 },
      height: { min: 480, ideal: 640, max: 480 }
    }
  };

  constructor() {
    this.videoEl = document.createElement('video');

    this.provider = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    ).bind(navigator);
  }

  run() {
    this.provider(this.constraints, (stream) => {
      this.videoEl.src = URL.createObjectURL(stream);
      this.videoEl.onloadedmetadata = () => this.videoEl.play();
    }, (error) => {
      console.log(error);
    });
  }
}
