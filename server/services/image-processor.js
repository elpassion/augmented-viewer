const cv = require('opencv');

const camWidth = 640;
const camHeight = 480;
const fps = 10;
const camInterval = 1000 / fps;

const scaleAlgorithm = 1;
const minDistance = 30;
const accThreshold = 40;

const camera = new cv.VideoCapture(0);
camera.setWidth(camWidth);
camera.setHeight(camHeight);

function detectCircles(input) {
  const circles = input.houghCircles(scaleAlgorithm, minDistance, accThreshold);

  return (circles) ? circles[0] || [] : [];
}

function readCamStream(onStream) {
  camera.read((err, img) => {
    if (err) throw err;

    const out = img.copy();

    img.convertGrayscale();
    img.medianBlur(15);

    const [x, y, radius] = detectCircles(img) || [];

    onStream(out.toBuffer(), { x, y, radius });
  });
}

module.exports = (callback) => {
  setInterval(() => readCamStream(callback), camInterval);
};
