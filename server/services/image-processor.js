const cv = require('opencv');

const camWidth = 640;
const camHeight = 480;
const fps = 10;
const camInterval = 1000 / fps;

const lowThresh = 0;
const highThresh = 100;
const nIters = 2;
const minArea = 2000;

const camera = new cv.VideoCapture(0);
camera.setWidth(camWidth);
camera.setHeight(camHeight);

let rectProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

function readCamStream(onStream) {
  camera.read((err, img) => {
    if (err) throw err;

    const out = img.copy();

    img.convertGrayscale();

    const imgCanny = img.copy();
    imgCanny.canny(lowThresh, highThresh);
    imgCanny.dilate(nIters);

    const contours = imgCanny.findContours();

    for (let i = 0; i < contours.size(); i += 1) {
      if (contours.area(i) < minArea) continue;

      const arcLength = contours.arcLength(i, true);
      contours.approxPolyDP(i, 0.01 * arcLength, true);

      if (contours.cornerCount(i) === 4) {
        rectProps = contours.boundingRect(i);
      }
    }

    onStream(out.toBuffer(), rectProps);
  });
}

module.exports = (callback) => {
  setInterval(() => readCamStream(callback), camInterval);
};
