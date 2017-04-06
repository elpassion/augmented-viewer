export default class Viewer {
  constructor() {
    this.canvas = document.getElementById('viewer');
    this.ctx = this.canvas.getContext('2d');
    this.image = new Image();

    this.canvas.width = 640;
    this.canvas.height = 480;
  }

  update = ({ buffer, coords }) => {
    const uint8Arr = new Uint8Array(buffer);
    const str = String.fromCharCode.apply(null, uint8Arr);
    const base64String = btoa(str);

    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'red';
      this.ctx.strokeWidth = 1;
      this.ctx.arc(coords.x, coords.y, coords.radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    };

    this.image.src = `data:image/png;base64,${base64String}`;
  };
}
