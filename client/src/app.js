/* global io */

const socket = io('http://localhost:3000');

const canvas = document.getElementById('viewer');
const ctx = canvas.getContext('2d');
const image = new Image();

canvas.width = 640;
canvas.height = 480;

socket.on('frame', (data) => {
  const { buffer, coords } = data;
  const uint8Arr = new Uint8Array(buffer);
  const str = String.fromCharCode.apply(null, uint8Arr);
  const base64String = btoa(str);

  image.onload = function () {
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.strokeWidth = 1;
    ctx.arc(coords.x, coords.y, coords.radius, 0, 2 * Math.PI);
    ctx.stroke();
  };

  image.src = `data:image/png;base64,${base64String}`;
});
