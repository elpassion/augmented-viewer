export default class Viewer {
  constructor({ fps, strokeColor = 'rgba(0, 0, 255, 1)' }) {
    this.canvas = document.getElementById('viewer');
    this.ctx = this.canvas.getContext('2d');

    this.fps = fps;
    this.strokeColor = strokeColor;

    this.canvas.width = 640;
    this.canvas.height = 480;

    this.boundRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }

  run(video, onUpdate) {
    setInterval(() => {
      this.ctx.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
      this.updateRect();

      onUpdate(this.canvas.toDataURL('image/jpeg'));
    }, 1000 / this.fps);
  }

  updateRect() {
    const { x, y, width, height } = this.boundRect;

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.strokeWidth = 1;
    this.ctx.rect(x, y, width, height);
    this.ctx.stroke();
  }

  updateRectCoords(coords) {
    this.boundRect = coords;
  }
}
