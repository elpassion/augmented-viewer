/* global io */

import Viewer from './viewer';
import ModelPresenter from './model-presenter';
import Streamer from './streamer';

const camFps = 16;

const socket = io('http://localhost:3000');
const viewer = new Viewer({ fps: camFps });

const sceneEl = document.getElementById('scene');
const modelPresenter = new ModelPresenter(sceneEl, 640, 480);
const streamer = new Streamer();

modelPresenter.render();

streamer.run();

viewer.run(streamer.videoEl, (data) => {
  socket.emit('frame', { data });
});

socket.on('frame', (data) => {
  const { x, y, width, height } = data.coords;

  const posX = x + (width / 2);
  const posY = y + (height / 2);

  viewer.updateRectCoords(data.coords);

  modelPresenter.updateModelPos(posX, posY);
  modelPresenter.updateModelRotation(width, height);
});
